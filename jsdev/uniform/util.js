goog.provide('uniform.util');
goog.provide('uniform.MetaFunction');

goog.require('goog.string');
/**
 * @type {function(Element, string, string)}
 * Validator function. It expects the element to be validate,
 * the caption label, and the necessary arguments to validate
 */
uniform.MetaFunction;


/**
 * Parses and interpret a token
 * @param {string} token
 * @return {string}
 */
uniform.util.interpretToken = function(token) {
  var result = token + ' ';
  if (goog.isDefAndNotNull(goog.dom.getElement(token))) {
    var inputValue = goog.dom.forms.getValue(goog.dom.getElement(token));
    if (goog.isDefAndNotNull(inputValue)) {
      result =  "'" + inputValue + "' ";
    } else {
      result = "null ";
    }
  } else if (token == 'and') {
     result = " && ";
  } else if (token == 'or') {
     result = " || ";
  }

  return result; 
};


/**
 * Parses and interpret a token
 * @param {string} metaInfo
 * @param {goog.structs.Map}
 * @return {Array.<Array.<string>>}
 */
uniform.util.compileMetaTags = function(metaInfo, metaMap) {
  var result = [];

  if (! goog.isDefAndNotNull(metaInfo)) {
    return result;
  }

  // tokeninze the meta information.
  var metaInfoCommandLineArray = metaInfo.split(';');

  goog.array.forEach(metaInfoCommandLineArray, function(commandLine) {
    // tokenize the command.
    var cmdArray =  goog.string.trim(commandLine).split(/\s+/);

    var command = cmdArray[0];

    var commandFunction = metaMap.get(command, goog.nullFunction);

    if (commandFunction !== goog.nullFunction ) {
      var parserState = 0;  // 0 => initial state
                            // 1 => reading 'condition'
                            // 2 => reading 'parameters'

      var conditionStatement = '';
      var parametersStatement = '';

      for (var x=1; x< cmdArray.length; ++x ) {
        var token = cmdArray[x];

        if (parserState === 0) {
          if (token === 'If') {
            parserState = 1;
            continue;
          } else {
            parserState = 2;
          }
        }


        if (parserState === 1 && token === 'then') {
          parserState = 2;
          continue;
        }

        if (parserState === 1) {
          conditionStatement +=
              uniform.util.interpretToken(token);
        } else {
          parametersStatement +=
              uniform.util.interpretToken(token);
        }
      }

      result.push([commandFunction, conditionStatement, parametersStatement]);
    }
  });

  return result;
};

/**
 * @param {Element} formElement
 * @param {string} metaTag
 * @param {goog.structs.Map}
 * @param {string} extraInfo
 */
uniform.util.executeElementMetaTags = function(el,
                                                             metaTag, 
                                                             metaMap,
                                                             extraInfo) {
  var metaInfo = el.getAttribute(metaTag);
  if (! goog.isDefAndNotNull(metaInfo)) {
    return;
  }

  var compiledMetaTags =
      uniform.util.compileMetaTags(metaInfo,metaMap);

  goog.array.forEach(compiledMetaTags, function(compiledMetaTag) {

    compiledMetaTag[0](el,
        compiledMetaTag[1],   // condition
        compiledMetaTag[2],   // parameters
        extraInfo);
  });
};


/**
 * @param {Element} formElement
 * @param {string} metaTag
 * @param {goog.structs.Map}
 * @param {string} extraInfo
 */
uniform.util.executeFormMetaTags = function(formElement,
                                                          metaTag, 
                                                          metaMap,
                                                          extraInfo) {
  var els = formElement.getElementsByTagName('*');
  for (var el, i = 0; el = els[i]; i++) {
    uniform.util.executeElementMetaTags(el,
                                                      metaTag, 
                                                      metaMap, 
                                                      extraInfo);
  }
};
