# -*- coding: utf-8 -*-
"""
    Coinkit
    ~~~~~

    :copyright: (c) 2014 by Halfmoon Labs
    :license: MIT, see LICENSE for more details.
"""

from .entropy import get_entropy
from .words import TOP_ENGLISH_WORDS
from math import pow, ceil, log

def random_passphrase_from_wordlist(phrase_length, wordlist):
    """ An extremely entropy efficient passphrase generator.

        This function:
        -Pulls entropy from the safer alternative to /dev/urandom: /dev/random
        -Doesn't rely on random.seed (words are selected right from the entropy)
        -Only requires 2 entropy bytes/word for word lists of up to 65536 words
    """

    passphrase_words = []
    
    numbytes_of_entropy = phrase_length * 2
    entropy = list(get_entropy(numbytes_of_entropy))

    bytes_per_word = int(ceil(log(len(wordlist), 2) / 8))

    if (phrase_length * bytes_per_word > 64):
        raise Exception("Error! This operation requires too much entropy. \
            Try a shorter phrase length or word list.")

    for i in range(phrase_length):
        current_entropy = entropy[i*bytes_per_word:(i+1)*bytes_per_word]
        index = int(''.join(current_entropy).encode('hex'), 16) % len(wordlist)
        word = wordlist[index]
        passphrase_words.append(word)

    return " ".join(passphrase_words)

def random_160bit_passphrase():
    return random_passphrase_from_wordlist(12, TOP_ENGLISH_WORDS[0:10500])

def random_256bit_passphrase():
    return random_passphrase_from_wordlist(16, TOP_ENGLISH_WORDS[0:65536])
