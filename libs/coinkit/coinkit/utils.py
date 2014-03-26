# -*- coding: utf-8 -*-
"""
    Coinkit
    ~~~~~
    
    :copyright: (c) 2014 by Halfmoon Labs
    :license: MIT, see LICENSE for more details.
"""

import os
import re
import random
import binascii

""" Format checking """

from characters.hex import is_hex

from .b58check import is_b58check, b58check_decode

def is_secret_exponent(val, curve_order):
    return (isinstance(val, (int, long)) and val >= 1 and val < curve_order)

def is_256bit_hex_string(val):
    return (isinstance(val, str) and len(val) == 64 and is_hex(val))

def is_wif_pk(val):
    return (len(val) >= 51 and len(val) <= 51 and is_b58check(val))

def is_b58check_address(val):
    return is_b58check(val)
    #return (len(val) >= 27 and len(val) <= 34 and is_b58check(val))

def extract_pk_as_int(pk, curve_order):
    if isinstance(pk, int):
        secret_exponent = pk
    elif is_256bit_hex_string(pk):
        secret_exponent = int(pk, 16)
    elif is_wif_pk(pk):
        secret_exponent = int(binascii.hexlify(b58check_decode(pk)), 16)
    else:
        raise ValueError("Private key is not in a valid format (int, wif, or hex).")

    # make sure that: 1 <= secret_exponent < curve_order
    if is_secret_exponent(secret_exponent, curve_order):
        return secret_exponent
    else:
        raise IndexError("Secret exponent is outside of the valid range. Must be >= 1 and < the curve order.")

