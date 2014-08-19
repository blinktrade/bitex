import string
from .charset import charset_to_int, int_to_charset

def hex_to_int(s):
    return charset_to_int(s, string.hexdigits[0:16])

def int_to_hex(val):
    return int_to_charset(val, string.hexdigits[0:16])

def is_hex(s):
    try:
        int(s, 16)
    except ValueError:
        return False
    else:
        return True

