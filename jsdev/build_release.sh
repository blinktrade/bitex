#!/bin/bash

#############################################
# compile soy templates
#############################################
java -jar ./tools/SoyToJsSrcCompiler.jar --bidiGlobalDir 1 --shouldGenerateGoogMsgDefs \
  --shouldProvideRequireSoyNamespaces --codeStyle concat --cssHandlingScheme GOOG  \
  --outputPathFormat  './bitex/templates/{INPUT_FILE_NAME_NO_EXT}.soy.js' \
  ./bitex/templates/templates.soy

java -jar ./tools/SoyToJsSrcCompiler.jar --bidiGlobalDir 1 --shouldGenerateGoogMsgDefs \
  --shouldProvideRequireSoyNamespaces --codeStyle concat --cssHandlingScheme GOOG  \
  --outputPathFormat  './bitex/ui/{INPUT_FILE_NAME_NO_EXT}.soy.js' \
  ./bitex/ui/withdraw_methods.soy

java -jar ./tools/SoyToJsSrcCompiler.jar --bidiGlobalDir 1 --shouldGenerateGoogMsgDefs \
  --shouldProvideRequireSoyNamespaces --codeStyle concat --cssHandlingScheme GOOG  \
  --outputPathFormat  './bitex/ui/{INPUT_FILE_NAME_NO_EXT}.soy.js' \
  ./bitex/ui/withdraw_method_editor.soy


java -jar ./tools/SoyToJsSrcCompiler.jar --bidiGlobalDir 1 --shouldGenerateGoogMsgDefs \
  --shouldProvideRequireSoyNamespaces --codeStyle concat --cssHandlingScheme GOOG  \
  --outputPathFormat  './bitex/ui/{INPUT_FILE_NAME_NO_EXT}.soy.js' \
  ./bitex/ui/market_view_table.soy


# compile all applications

# enable those flags to debug the compiled code.
#  --compiler_flags="--debug=TRUE" \
#  --compiler_flags="--formatting=PRETTY_PRINT" \
#  --compiler_flags="--formatting=PRINT_INPUT_DELIMITER" \

## BitEx API
#python ./closure-library/closure/bin/build/closurebuilder.py  \
#  --root=./closure-library/ \
#  --root=./bitex \
#  --root=./closure-bootstrap/javascript/ \
#  --namespace=bitex.api.BitEx \
#  --output_mode=compiled \
#  --compiler_jar=./tools/compiler.jar \
#  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
#  --compiler_flags="--define=goog.DEBUG=0" \
#  --compiler_flags="--define=goog.LOCALE='pt_BR'" \
#  --compiler_flags="--externs=./externs/google.js" \
#  --compiler_flags="--externs=./externs/plusone.js" \
#  --compiler_flags="--externs=./externs/jquery-1.9.js" \
#  --compiler_flags="--externs=./externs/twitter-bootstrap.js" \
#  --compiler_flags="--externs=./externs/parsley.js" \
#  --compiler_flags="--externs=./externs/sticky.js" \
#  --compiler_flags="--externs=./externs/facebook_javascript_sdk.js" \
#  --compiler_flags="--translations_project='bitex'" \
#   > ../static/js/bitex.compiled.pt_BR.js
#


# BlinkTrade Application - enUS
python ./closure-library/closure/bin/build/closurebuilder.py  \
  --root=./closure-library/ \
  --root=./closure-bootstrap/javascript/ \
  --root=./bitex \
  --namespace=bitex.app.BlinkTrade \
  --output_mode=compiled \
  --compiler_jar=./tools/compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  --compiler_flags="--define=goog.DEBUG=0" \
  --compiler_flags="--define=goog.LOCALE='en_US'" \
  --compiler_flags="--externs=./externs/google.js" \
  --compiler_flags="--externs=./externs/plusone.js" \
  --compiler_flags="--externs=./externs/jquery-1.9.js" \
  --compiler_flags="--externs=./externs/twitter-bootstrap.js" \
  --compiler_flags="--externs=./externs/parsley.js" \
  --compiler_flags="--externs=./externs/sticky.js" \
  --compiler_flags="--debug=TRUE" \
  --compiler_flags="--formatting=PRETTY_PRINT" \
  --compiler_flags="--formatting=PRINT_INPUT_DELIMITER" \
  --compiler_flags="--externs=./externs/facebook_javascript_sdk.js" \
  --compiler_flags="--translations_project='bitex'" \
  --compiler_flags="--translations_file=./translations/en.xtb.xml" \
   > ../static/js/bitex_app_blink_trade.compiled.en_US.js

#  --compiler_flags="--debug=TRUE" \
#  --compiler_flags="--formatting=PRETTY_PRINT" \
#  --compiler_flags="--formatting=PRINT_INPUT_DELIMITER" \


# BlinkTrade Application - ptBR
#python ./closure-library/closure/bin/build/closurebuilder.py  \
#  --root=./closure-library/ \
#  --root=./closure-bootstrap/javascript/ \
#  --root=./bitex \
#  --namespace=bitex.app.BlinkTrade \
#  --output_mode=compiled \
#  --compiler_jar=./tools/compiler.jar \
#  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
#  --compiler_flags="--define=goog.DEBUG=0" \
#  --compiler_flags="--define=goog.LOCALE='pt_BR'" \
#  --compiler_flags="--externs=./externs/google.js" \
#  --compiler_flags="--externs=./externs/plusone.js" \
#  --compiler_flags="--externs=./externs/jquery-1.9.js" \
#  --compiler_flags="--externs=./externs/twitter-bootstrap.js" \
#  --compiler_flags="--externs=./externs/parsley.js" \
#  --compiler_flags="--externs=./externs/sticky.js" \
#  --compiler_flags="--externs=./externs/facebook_javascript_sdk.js" \
#  --compiler_flags="--translations_project='bitex'" \
#  --compiler_flags="--translations_file=./translations/pt_BR.xtb.xml" \
#  --compiler_flags="--debug=TRUE" \
#  --compiler_flags="--formatting=PRETTY_PRINT" \
#  --compiler_flags="--formatting=PRINT_INPUT_DELIMITER" \
#   > ../static/js/bitex_app_blink_trade.compiled.pt_BR.js
