# -*- coding: utf-8 -*-
"""
    Characters
    ~~~~~

    :copyright: (c) 2014 by Halfmoon Labs
    :license: MIT, see LICENSE for more details.
"""

import re
import string

def int_to_charset(val, charset):
    """ Turn a non-negative integer into a string.
    """
    if not val >= 0:
        raise ValueError('"val" must be a non-negative integer.')
    if val == 0: return charset[0]
    output = ""
    while val > 0:
        val, digit = divmod(val, len(charset))
        output += charset[digit]
    # reverse the characters in the output and return
    return output[::-1]

def charset_to_int(s, charset):
    """ Turn a string into a non-negative integer.
    """
    output = 0
    for char in s:
        output = output * len(charset) + charset.index(char)
    return output

def change_charset(s, original_charset, target_charset):
    """ Convert a string from one charset to another.
    """
    if not isinstance(s, str):
        raise ValueError('"s" must be a string.')

    intermediate_integer = charset_to_int(s, original_charset)
    output_string = int_to_charset(intermediate_integer, target_charset)
    return output_string
