Coinkit
=====

Tools for Bitcoin and other cryptocurrencies.

## Sample Usage

### Keypairs

#### Random keypairs

    >>> from coinkit import BitcoinKeypair
    >>> keypair = BitcoinKeypair()
    >>> keypair.private_key()
    '91149ee24f1ee9a6f42c3dd64c2287781c8c57a6e8e929c80976e586d5322a3d'
    >>> keypair.public_key()
    '042c6b7e6da7633c8f226891cc7fa8e5ec84f8eacc792a46786efc869a408d29539a5e6f8de3f71c0014e8ea71691c7b41f45c083a074fef7ab5c321753ba2b3fe'
    >>> keypair.wif_pk()
    '5JvBUBPzU42Y7BHD7thTnySXQXMk8XEJGGQGcyBw7CCkw8RAH7m'
    >>> keypair.address()
    '13mtgVARiB1HiRyCHnKTi6rEwyje5TYKBW'

#### Custom keypairs

    >>> hex_private_key = '91149ee24f1ee9a6f42c3dd64c2287781c8c57a6e8e929c80976e586d5322a3d'
    >>> keypair = BitcoinKeypair(hex_private_key)

#### Random brain wallet keypairs

    >>> keypair = BitcoinKeypair.from_passphrase()
    >>> keypair.passphrase()
    'shepherd mais pack rate enamel horace diva filesize maximum really roar mall'
    >>> keypair.address()
    '13mtgVARiB1HiRyCHnKTi6rEwyje5TYKBW'

#### Custom brain wallet keypairs

    >>> passphrase = 'shepherd mais pack rate enamel horace diva filesize maximum really roar mall'
    >>> keypair = BitcoinKeypair.from_passphrase(passphrase)

#### Altcoin keypairs

    >>> from coinkit import LitecoinKeypair
    >>> litecoin_keypair = LitecoinKeypair()
    >>> litecoin_keypair.address()
    'LMzqwhUFnqFLyEfMTvJkz7v1AC6v8N9Qcd'

### Wallets

#### Sequential Deterministic Wallets

    >>> from coinkit import SDWallet, BitcoinKeypair
    >>> passphrase = 'shepherd mais pack rate enamel horace diva filesize maximum really roar mall'
    >>> wallet = SDWallet(passphrase)
    >>> bitcoin_keypair_1 = wallet.keypair(1, BitcoinKeypair)
    >>> bitcoin_keypair_1.passphrase()
    'shepherd mais pack rate enamel horace diva filesize maximum really roar mall bitcoin1'
    >>> bitcoin_keypair_1.address()
    '1DS2vmsqTwtXp1DfmDHi55Aqc6w4LBUC9k'

### Utilities

#### Random passphrases

    >>> from coinkit import random_160bit_passphrase
    >>> random_160bit_passphrase()
    'shepherd mais pack rate enamel horace diva filesize maximum really roar mall'

## Supported currencies

- Litecoin
- Namecoin
- Peercoin
- Primecoin
- Testnet
- Worldcoin
- Megacoin
- Feathercoin
- Terracoin
- Novacoin
- Dogecoin
- Anoncoin
- Protoshares
- Ixcoin
- Memorycoin
- Infinitecoin
- Cryptogenic Bullion
- Quarkcoin
- Netcoin
- Earthcoin

## Developers

**Q:** Can I contribute to Coinkit?

**A:** Of course! Any and all are encouraged to contribute. Just fork a copy of the repo and get started on something that you think would improve the current offering.

**Q:** What should I work on?

**A:** That's up to you! For a quick project, consider adding support for a new cryptocurrency (should only require two lines of code, not including the unit tests).

Meanwhile, for something a bit more ambitious, check the issues section for outstanding feature requests.

## Notice

Coinkit is still in Alpha. It's developers will not be held responsible for loss of bitcoins resulting from the use of this software.

Developers using Coinkit are encouraged to inspect the code for themselves and perform their own tests.

That said, we are committed to ensuring that this library behaves exactly as it is supposed to under all conditions, and have plans to ramp up our testing efforts going forward.
