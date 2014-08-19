# -*- coding: utf-8 -*-
"""
    Coinkit
    ~~~~~
    
    :copyright: (c) 2014 by Halfmoon Labs
    :license: MIT, see LICENSE for more details.
"""

from inspect import isclass
from .keypair import *
from .passphrase import random_256bit_passphrase, random_160bit_passphrase

def is_cryptocurrency_keypair_class(cls):
    if not isclass(cls):
        return False
    if cls.__name__ == 'BitcoinKeypair':
        return True
    if len(cls.__bases__) > 0 and cls.__bases__[0].__name__ == 'BitcoinKeypair':
        return True

_messages = {
    "SHORT_PASSPHRASE": "Warning! Passphrase must be at least %s characters.",
    "INVALID_KEYPAIR_CLASS": "Class must be a valid currency keypair class.",
}

class SDWallet():
    """ A sequential deterministic wallet.
    """

    def __init__(self, passphrase=None):
        """ Create wallet from a passphrase input. """
        if not passphrase:
            passphrase = random_160bit_passphrase()

        self._passphrase = passphrase
    
    def passphrase(self):
        return self._passphrase

    def keypair(self, i, keypair_class):
        """ Return the keypair that corresponds to the provided sequence number
            and keypair class (BitcoinKeypair, etc.).
        """

        # Make sure keypair_class is a valid cryptocurrency keypair
        if not is_cryptocurrency_keypair_class(keypair_class):
            raise Exception(_messages["INVALID_KEYPAIR_CLASS"])

        currency_name = keypair_class.__name__.lower().replace('keypair', '')

        k = keypair_class.from_passphrase(
            self._passphrase + " " + currency_name + str(i))

        return k

class HDWallet():
    """ A hierarchical deterministic wallet in accordance with BIP 32.
    """

    def __init__(self):
        raise NotImplementedError()


