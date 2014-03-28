BitEx
=====

BitEx - Crypto Currency Exchange Platform
- TO BE COMPLETED -

#Get Started

```
easy_install pyzmq
easy_install tornado

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



#License

**Code released under [the GNU GPL license](https://github.com/pinhopro/bitex/blob/master/LICENSE).**

Copyright 2014 BitEx, LTDA. BitEx is a trademark maintained by BitEx, LTDA.

** VIOLATORS OF THE GNU GPL LICENSE WILL BE PROSECUTED TO THE FULL EXTENT OF THE LAW **
** FREE SOFTWARE FOR FREE PEOPLE **
