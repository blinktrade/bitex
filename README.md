BlinkTrade
=====

BlinkTrade - Open Source Exchange Platform

[How to install on Google Compute Engine](https://github.com/blinktrade/bitex/wiki/HOW-TO-DEPLOY-BLINKTRADE-ON-GOOGLE-COMPUTE-ENGINE) 


#Get Started

```
$ easy_install pyzmq
$ easy_install tornado
$ easy_install crypto
$ easy_install sqlalchemy
$ easy_install requests

$ cd ./jsdev
$ ./build_release.sh  # Or ./build_release.bat [Windows]

$ ./apps/trade/main.py
$ ./apps/ws_gateway/main.py
$ ./apps/mailer/main.py
```

# Applications - Trade
Matching engine and the core of the BitEx platform

# Applications - Ws Gateway
HTTP and WebSocket gateways

# Applications - Mailer
Mailing application

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
Bitex stands for Bitcoin EXchnage and it was the first that we came up it name of our platform, by mid 2014 a company called bitex.la was formed in Argentina and we were forced to change our name, this source code it is not related in any form to bitex.la.

#License

**Code released under [the GNU GPL license](https://github.com/pinhopro/bitex/blob/master/LICENSE).**

Copyright 2014 BitEx, LTDA. BitEx is a trademark maintained by BitEx, LTDA.

**VIOLATORS OF THE GNU GPL LICENSE WILL BE PROSECUTED TO THE FULL EXTENT OF THE LAW**
**FREE SOFTWARE FOR FREE PEOPLE**
