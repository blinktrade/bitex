import os
import getpass
import hashlib
import base64

from ConfigParser import SafeConfigParser
from Crypto.Cipher import AES

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))

class GoxConfig(SafeConfigParser):
    """return a config parser object with default values. If you need to run
    more Gox() objects at the same time you will also need to give each of them
    them a separate GoxConfig() object. For this reason it takes a filename
    in its constructor for the ini file, you can have separate configurations
    for separate Gox() instances"""

    _DEFAULTS = [["bitex", "btcrpc_user", ""]
                ,["bitex", "btcrpc_secret", ""]
                ]

    def __init__(self, filename):
        self.filename = filename
        SafeConfigParser.__init__(self)
        self.load()
        self.init_defaults(self._DEFAULTS)

    def init_defaults(self, defaults):
        """add the missing default values, default is a list of defaults"""
        for (sect, opt, default) in defaults:
            self._default(sect, opt, default)

    def save(self):
        """save the config to the .ini file"""
        with open(self.filename, 'wb') as configfile:
            self.write(configfile)

    def load(self):
        """(re)load the onfig from the .ini file"""
        self.read(self.filename)

    def get_safe(self, sect, opt):
        """get value without throwing exception."""
        try:
            return self.get(sect, opt)

        # pylint: disable=W0702
        except:
            for (dsect, dopt, default) in self._DEFAULTS:
                if dsect == sect and dopt == opt:
                    self._default(sect, opt, default)
                    return default
            return ""

    def get_bool(self, sect, opt):
        """get boolean value from config"""
        return self.get_safe(sect, opt) == "True"

    def get_string(self, sect, opt):
        """get string value from config"""
        return self.get_safe(sect, opt)

    def get_int(self, sect, opt):
        """get int value from config"""
        vstr = self.get_safe(sect, opt)
        try:
            return int(vstr)
        except ValueError:
            return 0

    def get_float(self, sect, opt):
        """get int value from config"""
        vstr = self.get_safe(sect, opt)
        try:
            return float(vstr)
        except ValueError:
            return 0.0

    def _default(self, section, option, default):
        """create a default option if it does not yet exist"""
        if not self.has_section(section):
            self.add_section(section)
        if not self.has_option(section, option):
            self.set(section, option, default)
            self.save()

class Secret:
    """Manage the MtGox API secret. This class has methods to decrypt the
    entries in the ini file and it also provides a method to create these
    entries. The methods encrypt() and decrypt() will block and ask
    questions on the command line, they are called outside the curses
    environment (yes, its a quick and dirty hack but it works for now)."""

    S_OK            = 0
    S_FAIL          = 1
    S_NO_SECRET     = 2
    S_FAIL_FATAL    = 3

    def __init__(self):
        """initialize the instance"""
        self.config = GoxConfig(os.path.join(ROOT_PATH, "config/", "bitcoin.conf"))
        self.key = ""
        self.secret = ""

        # pylint: disable=C0103
        self.password_from_commandline_option = None

    def decrypt(self, password):
        """decrypt "btcrpc_secret" from the ini file with the given password.
        This will return false if decryption did not seem to be successful.
        After this menthod succeeded the application can access the secret"""

        key = self.config.get_string("bitex", "btcrpc_user")
        sec = self.config.get_string("bitex", "btcrpc_secret")
        if sec == "" or key == "":
            return self.S_NO_SECRET

        # pylint: disable=E1101
        hashed_pass = hashlib.sha512(password.encode("utf-8")).digest()
        crypt_key = hashed_pass[:32]
        crypt_ini = hashed_pass[-16:]
        aes = AES.new(crypt_key, AES.MODE_OFB, crypt_ini)
        try:
            encrypted_secret = base64.b64decode(sec.strip().encode("ascii"))
            self.secret = aes.decrypt(encrypted_secret).strip()
            self.key = key.strip()
        except ValueError:
            return self.S_FAIL

        # now test if we now have something plausible
        try:
            dummy = self.secret.decode("ascii")
            self.secret = dummy
            return self.S_OK

        except Exception as exc:
            # this key and secret do not work :-(
            self.secret = ""
            self.key = ""
            return self.S_FAIL

    def prompt_decrypt(self):
        """ask the user for password on the command line
        and then try to decrypt the secret."""

        key = self.config.get_string("bitex", "btcrpc_user")
        sec = self.config.get_string("bitex", "btcrpc_secret")
        if sec == "" or key == "":
            return self.S_NO_SECRET

        if self.password_from_commandline_option:
            password = self.password_from_commandline_option
        else:
            password = getpass.getpass("enter passphrase for secret: ")

        result = self.decrypt(password)
        if result != self.S_OK:
            result = self.S_FAIL_FATAL

        return result

    # pylint: disable=R0201
    def prompt_encrypt(self):
        """ask for key, secret and password on the command line,
        then encrypt the secret and store it in the ini file."""
        #print("Please copy/paste key and secret from MtGox and")
        print("Please enter your bitcoind user and password")
        print("then provide a password to encrypt them.")
        print("")

        key =    raw_input("     btcrpc_user: ").strip()
        secret = raw_input("   btcrpc_secret: ").strip()
        while True:
            password1 = getpass.getpass("        password: ").strip()
            if password1 == "":
                print("aborting")
                return
            password2 = getpass.getpass("password (again): ").strip()
            if password1 != password2:
                print("you had a typo in the password. try again...")
            else:
                break

        # pylint: disable=E1101
        hashed_pass = hashlib.sha512(password1.encode("utf-8")).digest()
        crypt_key = hashed_pass[:32]
        crypt_ini = hashed_pass[-16:]
        aes = AES.new(crypt_key, AES.MODE_OFB, crypt_ini)

        # since the secret is a base64 string we can just just pad it with
        # spaces which can easily be stripped again after decryping
        print(len(secret))
        secret += " " * (16 - len(secret) % 16)
        print(len(secret))
        secret = base64.b64encode(aes.encrypt(secret)).decode("ascii")

        self.config.set("bitex", "btcrpc_user", key)
        self.config.set("bitex", "btcrpc_secret", secret)
        self.config.save()

        print("encrypted secret has been saved in %s" % self.config.filename)


if __name__ == "__main__":
    secret = Secret()
    #secret.prompt_encrypt()
    if secret.prompt_decrypt() != secret.S_FAIL_FATAL:
        pass
    else:
        print 'esqueceu a senha truta ?'
