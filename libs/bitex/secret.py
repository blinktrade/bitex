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

    _DEFAULTS = [["bitcoiner", "bitcoind_user", ""]
                ,["bitcoiner", "bitcoind_secret", ""]
                ,["bitcoiner", "bitcoind_host", "127.0.0.1"]
                ,["bitcoiner", "bitcoind_port", 8332]
                ,["bitcoiner", "bitcoind_prot", "https"]
                ,["bitcoiner", "om_host", "127.0.0.1"]
                ,["bitcoiner", "om_port", 8443]
                ,["bitcoiner", "om_user", ""]
                ,["bitcoiner", "om_pwd", ""]
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

    def __init__(self, config_file):
        """initialize the instance"""
        self.config = GoxConfig( config_file )
        self.bitcoind_key = ""
        self.bitcoind_secret = ""
        self.bitcoind_host = self.config.get_string("bitcoiner", "bitcoind_host")
        self.bitcoind_port = self.config.get_int("bitcoiner", "bitcoind_port")
        self.bitcoind_protocol = self.config.get_string("bitcoiner", "bitcoind_prot")
        self.om_host = self.config.get_string("bitcoiner", "om_host")
        self.om_port = self.config.get_int("bitcoiner", "om_port")
        self.om_user = ""
        self.om_pwd = ""

        # pylint: disable=C0103
        self.password_from_commandline_option = None

    def decrypt(self, password):
        """decrypt all protected data from the ini file with the given password."""

        bitcoind_key = self.config.get_string("bitcoiner", "bitcoind_user")
        bitcoind_sec = self.config.get_string("bitcoiner", "bitcoind_secret")
        om_user      = self.config.get_string("bitcoiner", "om_user")
        om_pwd       = self.config.get_string("bitcoiner", "om_pwd")

        if bitcoind_sec == "" or bitcoind_key == "":
            return self.S_NO_SECRET

        # pylint: disable=E1101
        hashed_pass = hashlib.sha512(password.encode("utf-8")).digest()
        crypt_key = hashed_pass[:32]
        crypt_ini = hashed_pass[-16:]
        aes = AES.new(crypt_key, AES.MODE_OFB, crypt_ini)
        try:
            encrypted_bitcoind_key = base64.b64decode(bitcoind_key.strip().encode("ascii"))
            encrypted_bitcoind_secret = base64.b64decode(bitcoind_sec.strip().encode("ascii"))
            encrypted_om_user = base64.b64decode(om_user.strip().encode("ascii"))
            encrypted_om_pwd = base64.b64decode(om_pwd.strip().encode("ascii"))

            self.bitcoind_key = aes.decrypt(encrypted_bitcoind_key).strip()
            self.bitcoind_secret = aes.decrypt(encrypted_bitcoind_secret).strip()
            self.om_user = aes.decrypt(encrypted_om_user).strip()
            self.om_pwd = aes.decrypt(encrypted_om_pwd).strip()
        except ValueError:
            return self.S_FAIL

        # now test if we now have something plausible
        try:
            dummy = self.bitcoind_key.decode("ascii")
            self.bitcoind_key = dummy

            dummy = self.bitcoind_secret.decode("ascii")
            self.bitcoind_secret = dummy

            dummy = self.om_user.decode("ascii")
            self.om_user = dummy

            dummy = self.om_pwd.decode("ascii")
            self.om_pwd = dummy

            return self.S_OK

        except Exception as exc:
            # this key and secret do not work :-(
            self.bitcoind_secret = ""
            self.bitcoind_key = ""
            return self.S_FAIL

    def prompt_decrypt(self):
        """ask the user for password on the command line
        and then try to decrypt the secret."""

        key = self.config.get_string("bitcoiner", "bitcoind_user")
        sec = self.config.get_string("bitcoiner", "bitcoind_secret")
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
        print("Please enter your bitcoind user/password  and order matcher user/password")
        print("then provide a password to encrypt them.")
        print("")

        bitcoind_key =    raw_input("  bitcoind rpc user: ").strip()
        bitcoind_secret = raw_input("bitcoind rpc secret: ").strip()
        om_user =         raw_input(" order_matcher user: ").strip()
        om_pwd  =         raw_input("  order_matcher pwd: ").strip()
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
        bitcoind_key += " " * (16 - len(bitcoind_key) % 16)
        bitcoind_key = base64.b64encode(aes.encrypt(bitcoind_key)).decode("ascii")

        bitcoind_secret += " " * (16 - len(bitcoind_secret) % 16)
        bitcoind_secret = base64.b64encode(aes.encrypt(bitcoind_secret)).decode("ascii")

        om_user += " " * (16 - len(om_user) % 16)
        om_user = base64.b64encode(aes.encrypt(om_user)).decode("ascii")

        om_pwd += " " * (16 - len(om_pwd) % 16)
        om_pwd = base64.b64encode(aes.encrypt(om_pwd)).decode("ascii")


        self.config.set("bitcoiner", "bitcoind_user",   bitcoind_key)
        self.config.set("bitcoiner", "bitcoind_secret", bitcoind_secret)
        self.config.set("bitcoiner", "om_user",   om_user)
        self.config.set("bitcoiner", "om_pwd",    om_pwd)
        self.config.save()

        print("encrypted secret has been saved in %s" % self.config.filename)


if __name__ == "__main__":
    secret = Secret()
    #secret.prompt_encrypt()
    if secret.prompt_decrypt() != secret.S_FAIL_FATAL:
        pass
    else:
        print 'esqueceu a senha truta ?'
