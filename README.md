#This documentation is outdated.
You must be a Senior Python Developer in order to understand what is going on. Don't try to run an exchange without an expert.

BlinkTrade
=====

BlinkTrade - Open Source Exchange Platform

[How to install on Google Compute Engine](https://github.com/blinktrade/bitex/wiki/HOW-TO-DEPLOY-BLINKTRADE-ON-GOOGLE-COMPUTE-ENGINE) 

[![Build Status](https://travis-ci.org/blinktrade/bitex.svg?branch=master)](https://travis-ci.org/blinktrade/bitex)

#Get Started

```
$ pip install -r requirements.txt
```

#Build and Run

Download and install the pyblinktrade package from https://github.com/blinktrade/pyblinktrade

```
cd ~
cd pyblinktrade
chmod +x setup.py
sudo ./setup.py install
```

Download and install the frontend project from https://github.com/blinktrade/frontend.git

```
$ cd ./jsdev
$ ./build_release.sh  # Or ./build_release.bat [Windows]

$ ./apps/trade/main.py
$ ./apps/ws_gateway/main.py
$ ./apps/mailer/main.py
```

# Applications - Trade
Matching engine and the core of the BitEx platform

# Applications - Ws Gateway
The HTTP/WebSocket gateway is based on Tornado.  It relays HTTP or websocket API
requests to the trade engine in order to place orders or fetching market data.

# Applications - Mailer
The mailing application... sends mail. To that end, 
it uses Mailchimp's transaction email solution, Mandrill.

E-mail templates are stored under the templates/ dir,
and which template to use (and the data to fill it out)
are supplied by listening on the zeromq socket.

# Translating

```
cd ./jsdev/tools
$ python extract_messages.py  > /tmp/file_to_be_translated.xml

# translate the xml
$ cp /tmp/file_to_be_translated.xml  ./jsdev/translations/pt_BR.xtb

# edit the build_release.sh to include the translated version.
$ vi ./jsdev/build_release.sh

$ ./jsdev/build_release.sh  # recompile the application using the translated file

# translated the html static page
# vi ./static/statoshi_square.html
```

#Why the name of the folder is Bitex ?

Bitex stands for Bitcoin EXchange and it was the first that we came up it name of our platform, by mid 2014 a company called bitex.la was formed in Argentina and we were forced to change our name, this source code it is not related in any form to bitex.la.

## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

#License

**Code released under [the GNU GPL license](https://github.com/pinhopro/bitex/blob/master/LICENSE).**

Copyright 2014 BitEx, LTDA. BitEx is a trademark maintained by BitEx, LTDA.

**VIOLATORS OF THE GNU GPL LICENSE WILL BE PROSECUTED TO THE FULL EXTENT OF THE LAW**
**FREE SOFTWARE FOR FREE PEOPLE**
