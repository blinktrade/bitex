// Input 0
function $JSCompiler_alias_THROW$$($jscomp_throw_param$$) {
  throw $jscomp_throw_param$$;
}
var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
  }
}
function $JSCompiler_set$$($JSCompiler_set_name$$) {
  return function($JSCompiler_set_value$$) {
    this[$JSCompiler_set_name$$] = $JSCompiler_set_value$$
  }
}
function $JSCompiler_get$$($JSCompiler_get_name$$) {
  return function() {
    return this[$JSCompiler_get_name$$]
  }
}
function $JSCompiler_returnArg$$($JSCompiler_returnArg_value$$) {
  return function() {
    return $JSCompiler_returnArg_value$$
  }
}
var $JSCompiler_prototypeAlias$$, $goog$global$$ = this;
function $goog$exportPath_$$($name$$60$$, $opt_object$$) {
  var $parts$$ = $name$$60$$.split("."), $cur$$ = $goog$global$$;
  !($parts$$[0] in $cur$$) && $cur$$.execScript && $cur$$.execScript("var " + $parts$$[0]);
  for(var $part$$;$parts$$.length && ($part$$ = $parts$$.shift());) {
    !$parts$$.length && $goog$isDef$$($opt_object$$) ? $cur$$[$part$$] = $opt_object$$ : $cur$$ = $cur$$[$part$$] ? $cur$$[$part$$] : $cur$$[$part$$] = {}
  }
}
function $goog$getObjectByName$$($name$$61_parts$$1$$) {
  $name$$61_parts$$1$$ = $name$$61_parts$$1$$.split(".");
  for(var $cur$$1$$ = $goog$global$$, $part$$1$$;$part$$1$$ = $name$$61_parts$$1$$.shift();) {
    if($cur$$1$$[$part$$1$$] != $JSCompiler_alias_NULL$$) {
      $cur$$1$$ = $cur$$1$$[$part$$1$$]
    }else {
      return $JSCompiler_alias_NULL$$
    }
  }
  return $cur$$1$$
}
function $goog$nullFunction$$() {
}
function $goog$addSingletonGetter$$($ctor$$) {
  $ctor$$.$getInstance$ = function $$ctor$$$$getInstance$$() {
    return $ctor$$.$instance_$ ? $ctor$$.$instance_$ : $ctor$$.$instance_$ = new $ctor$$
  }
}
function $goog$typeOf$$($value$$47$$) {
  var $s$$2$$ = typeof $value$$47$$;
  if("object" == $s$$2$$) {
    if($value$$47$$) {
      if($value$$47$$ instanceof Array) {
        return"array"
      }
      if($value$$47$$ instanceof Object) {
        return $s$$2$$
      }
      var $className$$2$$ = Object.prototype.toString.call($value$$47$$);
      if("[object Window]" == $className$$2$$) {
        return"object"
      }
      if("[object Array]" == $className$$2$$ || "number" == typeof $value$$47$$.length && "undefined" != typeof $value$$47$$.splice && "undefined" != typeof $value$$47$$.propertyIsEnumerable && !$value$$47$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$2$$ || "undefined" != typeof $value$$47$$.call && "undefined" != typeof $value$$47$$.propertyIsEnumerable && !$value$$47$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$2$$ && "undefined" == typeof $value$$47$$.call) {
      return"object"
    }
  }
  return $s$$2$$
}
function $goog$isDef$$($val$$) {
  return $val$$ !== $JSCompiler_alias_VOID$$
}
function $goog$isArray$$($val$$3$$) {
  return"array" == $goog$typeOf$$($val$$3$$)
}
function $goog$isArrayLike$$($val$$4$$) {
  var $type$$52$$ = $goog$typeOf$$($val$$4$$);
  return"array" == $type$$52$$ || "object" == $type$$52$$ && "number" == typeof $val$$4$$.length
}
function $goog$isString$$($val$$6$$) {
  return"string" == typeof $val$$6$$
}
function $goog$isNumber$$($val$$8$$) {
  return"number" == typeof $val$$8$$
}
function $goog$isFunction$$($val$$9$$) {
  return"function" == $goog$typeOf$$($val$$9$$)
}
function $goog$isObject$$($val$$10$$) {
  var $type$$53$$ = typeof $val$$10$$;
  return"object" == $type$$53$$ && $val$$10$$ != $JSCompiler_alias_NULL$$ || "function" == $type$$53$$
}
function $goog$getUid$$($obj$$36$$) {
  return $obj$$36$$[$goog$UID_PROPERTY_$$] || ($obj$$36$$[$goog$UID_PROPERTY_$$] = ++$goog$uidCounter_$$)
}
var $goog$UID_PROPERTY_$$ = "closure_uid_" + (1E9 * Math.random() >>> 0), $goog$uidCounter_$$ = 0;
function $goog$bindNative_$$($fn$$, $selfObj$$1$$, $var_args$$37$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
}
function $goog$bindJs_$$($fn$$1$$, $selfObj$$2$$, $var_args$$38$$) {
  $fn$$1$$ || $JSCompiler_alias_THROW$$(Error());
  if(2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$1$$.apply($selfObj$$2$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$1$$.apply($selfObj$$2$$, arguments)
  }
}
function $goog$bind$$($fn$$2$$, $selfObj$$3$$, $var_args$$39$$) {
  $goog$bind$$ = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? $goog$bindNative_$$ : $goog$bindJs_$$;
  return $goog$bind$$.apply($JSCompiler_alias_NULL$$, arguments)
}
function $goog$partial$$($fn$$3$$, $var_args$$40$$) {
  var $args$$3$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$1$$ = Array.prototype.slice.call(arguments);
    $newArgs$$1$$.unshift.apply($newArgs$$1$$, $args$$3$$);
    return $fn$$3$$.apply(this, $newArgs$$1$$)
  }
}
var $goog$now$$ = Date.now || function() {
  return+new Date
};
function $goog$inherits$$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.$superClass_$ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
}
;
// Input 1
// Input 2
// Input 3
function $goog$string$subs$$($str$$14$$, $var_args$$42$$) {
  for(var $i$$5$$ = 1;$i$$5$$ < arguments.length;$i$$5$$++) {
    var $replacement$$ = String(arguments[$i$$5$$]).replace(/\$/g, "$$$$");
    $str$$14$$ = $str$$14$$.replace(/\%s/, $replacement$$)
  }
  return $str$$14$$
}
function $goog$string$isEmpty$$($str$$16$$) {
  return/^[\s\xa0]*$/.test($str$$16$$)
}
function $goog$string$trim$$($str$$27$$) {
  return $str$$27$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function $goog$string$htmlEscape$$($str$$33$$) {
  if(!$goog$string$allRe_$$.test($str$$33$$)) {
    return $str$$33$$
  }
  -1 != $str$$33$$.indexOf("&") && ($str$$33$$ = $str$$33$$.replace($goog$string$amperRe_$$, "&amp;"));
  -1 != $str$$33$$.indexOf("<") && ($str$$33$$ = $str$$33$$.replace($goog$string$ltRe_$$, "&lt;"));
  -1 != $str$$33$$.indexOf(">") && ($str$$33$$ = $str$$33$$.replace($goog$string$gtRe_$$, "&gt;"));
  -1 != $str$$33$$.indexOf('"') && ($str$$33$$ = $str$$33$$.replace($goog$string$quotRe_$$, "&quot;"));
  return $str$$33$$
}
var $goog$string$amperRe_$$ = /&/g, $goog$string$ltRe_$$ = /</g, $goog$string$gtRe_$$ = />/g, $goog$string$quotRe_$$ = /\"/g, $goog$string$allRe_$$ = /[&<>\"]/;
function $goog$string$remove$$($s$$10$$, $ss$$2$$) {
  var $re$$ = RegExp($goog$string$regExpEscape$$($ss$$2$$), "");
  return $s$$10$$.replace($re$$, "")
}
function $goog$string$regExpEscape$$($s$$12$$) {
  return String($s$$12$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
}
function $goog$string$getRandomString$$() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ $goog$now$$()).toString(36)
}
function $goog$string$toNumber$$($str$$43$$) {
  var $num$$5$$ = Number($str$$43$$);
  return 0 == $num$$5$$ && $goog$string$isEmpty$$($str$$43$$) ? NaN : $num$$5$$
}
function $goog$string$toCamelCase$$($str$$44$$) {
  return String($str$$44$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  })
}
function $goog$string$toTitleCase$$($str$$46$$) {
  var $delimiters$$ = $goog$isString$$($JSCompiler_alias_VOID$$) ? $goog$string$regExpEscape$$($JSCompiler_alias_VOID$$) : "\\s";
  return $str$$46$$.replace(RegExp("(^" + ($delimiters$$ ? "|[" + $delimiters$$ + "]+" : "") + ")([a-z])", "g"), function($all$$1$$, $p1$$, $p2$$) {
    return $p1$$ + $p2$$.toUpperCase()
  })
}
;
// Input 4
// Input 5
var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$16$$, $obj$$40$$, $opt_fromIndex$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$16$$, $obj$$40$$, $opt_fromIndex$$6$$)
} : function($arr$$17$$, $obj$$41$$, $fromIndex$$2_i$$12_opt_fromIndex$$7$$) {
  $fromIndex$$2_i$$12_opt_fromIndex$$7$$ = $fromIndex$$2_i$$12_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex$$2_i$$12_opt_fromIndex$$7$$ ? Math.max(0, $arr$$17$$.length + $fromIndex$$2_i$$12_opt_fromIndex$$7$$) : $fromIndex$$2_i$$12_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$17$$)) {
    return!$goog$isString$$($obj$$41$$) || 1 != $obj$$41$$.length ? -1 : $arr$$17$$.indexOf($obj$$41$$, $fromIndex$$2_i$$12_opt_fromIndex$$7$$)
  }
  for(;$fromIndex$$2_i$$12_opt_fromIndex$$7$$ < $arr$$17$$.length;$fromIndex$$2_i$$12_opt_fromIndex$$7$$++) {
    if($fromIndex$$2_i$$12_opt_fromIndex$$7$$ in $arr$$17$$ && $arr$$17$$[$fromIndex$$2_i$$12_opt_fromIndex$$7$$] === $obj$$41$$) {
      return $fromIndex$$2_i$$12_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$20$$, $f$$, $opt_obj$$1$$) {
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$20$$, $f$$, $opt_obj$$1$$)
} : function($arr$$21$$, $f$$1$$, $opt_obj$$2$$) {
  for(var $l$$2$$ = $arr$$21$$.length, $arr2$$ = $goog$isString$$($arr$$21$$) ? $arr$$21$$.split("") : $arr$$21$$, $i$$14$$ = 0;$i$$14$$ < $l$$2$$;$i$$14$$++) {
    $i$$14$$ in $arr2$$ && $f$$1$$.call($opt_obj$$2$$, $arr2$$[$i$$14$$], $i$$14$$, $arr$$21$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$23$$, $f$$3$$, $opt_obj$$4$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$23$$, $f$$3$$, $opt_obj$$4$$)
} : function($arr$$24$$, $f$$4$$, $opt_obj$$5$$) {
  for(var $l$$4$$ = $arr$$24$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$24$$) ? $arr$$24$$.split("") : $arr$$24$$, $i$$16$$ = 0;$i$$16$$ < $l$$4$$;$i$$16$$++) {
    if($i$$16$$ in $arr2$$2$$) {
      var $val$$11$$ = $arr2$$2$$[$i$$16$$];
      $f$$4$$.call($opt_obj$$5$$, $val$$11$$, $i$$16$$, $arr$$24$$) && ($res$$[$resLength$$++] = $val$$11$$)
    }
  }
  return $res$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$25$$, $f$$5$$, $opt_obj$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$25$$, $f$$5$$, $opt_obj$$6$$)
} : function($arr$$26$$, $f$$6$$, $opt_obj$$7$$) {
  for(var $l$$5$$ = $arr$$26$$.length, $res$$1$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$26$$) ? $arr$$26$$.split("") : $arr$$26$$, $i$$17$$ = 0;$i$$17$$ < $l$$5$$;$i$$17$$++) {
    $i$$17$$ in $arr2$$3$$ && ($res$$1$$[$i$$17$$] = $f$$6$$.call($opt_obj$$7$$, $arr2$$3$$[$i$$17$$], $i$$17$$, $arr$$26$$))
  }
  return $res$$1$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$31$$, $f$$11$$, $opt_obj$$12$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$31$$, $f$$11$$, $opt_obj$$12$$)
} : function($arr$$32$$, $f$$12$$, $opt_obj$$13$$) {
  for(var $l$$7$$ = $arr$$32$$.length, $arr2$$5$$ = $goog$isString$$($arr$$32$$) ? $arr$$32$$.split("") : $arr$$32$$, $i$$19$$ = 0;$i$$19$$ < $l$$7$$;$i$$19$$++) {
    if($i$$19$$ in $arr2$$5$$ && !$f$$12$$.call($opt_obj$$13$$, $arr2$$5$$[$i$$19$$], $i$$19$$, $arr$$32$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$find$$($arr$$35$$, $f$$14$$) {
  var $i$$20$$ = $goog$array$findIndex$$($arr$$35$$, $f$$14$$, $JSCompiler_alias_VOID$$);
  return 0 > $i$$20$$ ? $JSCompiler_alias_NULL$$ : $goog$isString$$($arr$$35$$) ? $arr$$35$$.charAt($i$$20$$) : $arr$$35$$[$i$$20$$]
}
function $goog$array$findIndex$$($arr$$36$$, $f$$15$$, $opt_obj$$16$$) {
  for(var $l$$8$$ = $arr$$36$$.length, $arr2$$6$$ = $goog$isString$$($arr$$36$$) ? $arr$$36$$.split("") : $arr$$36$$, $i$$21$$ = 0;$i$$21$$ < $l$$8$$;$i$$21$$++) {
    if($i$$21$$ in $arr2$$6$$ && $f$$15$$.call($opt_obj$$16$$, $arr2$$6$$[$i$$21$$], $i$$21$$, $arr$$36$$)) {
      return $i$$21$$
    }
  }
  return-1
}
function $goog$array$contains$$($arr$$39$$, $obj$$44$$) {
  return 0 <= $goog$array$indexOf$$($arr$$39$$, $obj$$44$$)
}
function $goog$array$remove$$($arr$$46$$, $obj$$48$$) {
  var $i$$26$$ = $goog$array$indexOf$$($arr$$46$$, $obj$$48$$);
  0 <= $i$$26$$ && $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$46$$, $i$$26$$, 1)
}
function $goog$array$toArray$$($object$$2$$) {
  var $length$$15$$ = $object$$2$$.length;
  if(0 < $length$$15$$) {
    for(var $rv$$3$$ = Array($length$$15$$), $i$$29$$ = 0;$i$$29$$ < $length$$15$$;$i$$29$$++) {
      $rv$$3$$[$i$$29$$] = $object$$2$$[$i$$29$$]
    }
    return $rv$$3$$
  }
  return[]
}
function $goog$array$splice$$($arr$$49$$, $index$$50$$, $howMany$$, $var_args$$55$$) {
  $goog$array$ARRAY_PROTOTYPE_$$.splice.apply($arr$$49$$, $goog$array$slice$$(arguments, 1))
}
function $goog$array$slice$$($arr$$50$$, $start$$6$$, $opt_end$$13$$) {
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$50$$, $start$$6$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$50$$, $start$$6$$, $opt_end$$13$$)
}
;
// Input 6
var $goog$dom$defaultDomHelper_$$;
function $goog$dom$classes$get$$($className$$5_element$$9$$) {
  $className$$5_element$$9$$ = $className$$5_element$$9$$.className;
  return $goog$isString$$($className$$5_element$$9$$) && $className$$5_element$$9$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$10$$, $var_args$$58$$) {
  var $classes$$ = $goog$dom$classes$get$$($element$$10$$), $args$$6$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$6$$.length;
  $goog$dom$classes$add_$$($classes$$, $args$$6$$);
  $element$$10$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$11$$, $var_args$$59$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$11$$), $args$$7$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$7$$);
  $element$$11$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$7$$.length
}
function $goog$dom$classes$add_$$($classes$$2$$, $args$$8$$) {
  for(var $i$$41$$ = 0;$i$$41$$ < $args$$8$$.length;$i$$41$$++) {
    $goog$array$contains$$($classes$$2$$, $args$$8$$[$i$$41$$]) || $classes$$2$$.push($args$$8$$[$i$$41$$])
  }
}
function $goog$dom$classes$getDifference_$$($arr1$$4$$, $arr2$$12$$) {
  return $goog$array$filter$$($arr1$$4$$, function($item$$) {
    return!$goog$array$contains$$($arr2$$12$$, $item$$)
  })
}
function $goog$dom$classes$addRemove$$($element$$13$$, $classesToRemove$$, $classesToAdd$$) {
  var $classes$$4$$ = $goog$dom$classes$get$$($element$$13$$);
  $goog$isString$$($classesToRemove$$) ? $goog$array$remove$$($classes$$4$$, $classesToRemove$$) : $goog$isArray$$($classesToRemove$$) && ($classes$$4$$ = $goog$dom$classes$getDifference_$$($classes$$4$$, $classesToRemove$$));
  $goog$isString$$($classesToAdd$$) && !$goog$array$contains$$($classes$$4$$, $classesToAdd$$) ? $classes$$4$$.push($classesToAdd$$) : $goog$isArray$$($classesToAdd$$) && $goog$dom$classes$add_$$($classes$$4$$, $classesToAdd$$);
  $element$$13$$.className = $classes$$4$$.join(" ")
}
function $goog$dom$classes$has$$($element$$14$$, $className$$6$$) {
  return $goog$array$contains$$($goog$dom$classes$get$$($element$$14$$), $className$$6$$)
}
;
// Input 7
function $goog$object$forEach$$($obj$$49$$, $f$$19$$, $opt_obj$$22$$) {
  for(var $key$$21$$ in $obj$$49$$) {
    $f$$19$$.call($opt_obj$$22$$, $obj$$49$$[$key$$21$$], $key$$21$$, $obj$$49$$)
  }
}
function $goog$object$getValues$$($obj$$58$$) {
  var $res$$4$$ = [], $i$$43$$ = 0, $key$$29$$;
  for($key$$29$$ in $obj$$58$$) {
    $res$$4$$[$i$$43$$++] = $obj$$58$$[$key$$29$$]
  }
  return $res$$4$$
}
function $goog$object$getKeys$$($obj$$59$$) {
  var $res$$5$$ = [], $i$$44$$ = 0, $key$$30$$;
  for($key$$30$$ in $obj$$59$$) {
    $res$$5$$[$i$$44$$++] = $key$$30$$
  }
  return $res$$5$$
}
function $goog$object$findKey$$($obj$$63$$, $f$$24$$) {
  for(var $key$$33$$ in $obj$$63$$) {
    if($f$$24$$.call($JSCompiler_alias_VOID$$, $obj$$63$$[$key$$33$$], $key$$33$$, $obj$$63$$)) {
      return $key$$33$$
    }
  }
}
function $goog$object$isEmpty$$() {
  var $obj$$65$$ = $goog$fx$anim$activeAnimations_$$, $key$$35$$;
  for($key$$35$$ in $obj$$65$$) {
    return $JSCompiler_alias_FALSE$$
  }
  return $JSCompiler_alias_TRUE$$
}
function $goog$object$add$$($obj$$68$$, $key$$37$$, $val$$18$$) {
  $key$$37$$ in $obj$$68$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $key$$37$$ + '"'));
  $obj$$68$$[$key$$37$$] = $val$$18$$
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$48$$, $var_args$$61$$) {
  for(var $key$$44$$, $source$$2$$, $i$$47$$ = 1;$i$$47$$ < arguments.length;$i$$47$$++) {
    $source$$2$$ = arguments[$i$$47$$];
    for($key$$44$$ in $source$$2$$) {
      $target$$48$$[$key$$44$$] = $source$$2$$[$key$$44$$]
    }
    for(var $j$$4$$ = 0;$j$$4$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$4$$++) {
      $key$$44$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$4$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$44$$) && ($target$$48$$[$key$$44$$] = $source$$2$$[$key$$44$$])
    }
  }
}
;
// Input 8
// Input 9
var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_76$$;
if($ua$$inline_76$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_77$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_76$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_76$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_76$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_77$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_79$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_79$$ && $navigator$$inline_79$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_82$$ = "", $re$$inline_83$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_84$$ = $goog$global$$.opera.version, $version$$inline_82$$ = "function" == typeof $operaVersion$$inline_84$$ ? $operaVersion$$inline_84$$() : $operaVersion$$inline_84$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_83$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_83$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_83$$ = /WebKit\/(\S+)/), $re$$inline_83$$) {
      var $arr$$inline_85$$ = $re$$inline_83$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_82$$ = $arr$$inline_85$$ ? $arr$$inline_85$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_86$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_86$$ > parseFloat($version$$inline_82$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_86$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_82$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$55_order$$inline_90$$;
  if(!($JSCompiler_temp$$55_order$$inline_90$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$55_order$$inline_90$$ = 0;
    for(var $v1Subs$$inline_91$$ = $goog$string$trim$$(String($goog$userAgent$VERSION$$)).split("."), $v2Subs$$inline_92$$ = $goog$string$trim$$(String($version$$8$$)).split("."), $subCount$$inline_93$$ = Math.max($v1Subs$$inline_91$$.length, $v2Subs$$inline_92$$.length), $subIdx$$inline_94$$ = 0;0 == $JSCompiler_temp$$55_order$$inline_90$$ && $subIdx$$inline_94$$ < $subCount$$inline_93$$;$subIdx$$inline_94$$++) {
      var $v1Sub$$inline_95$$ = $v1Subs$$inline_91$$[$subIdx$$inline_94$$] || "", $v2Sub$$inline_96$$ = $v2Subs$$inline_92$$[$subIdx$$inline_94$$] || "", $v1CompParser$$inline_97$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_98$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_99$$ = $v1CompParser$$inline_97$$.exec($v1Sub$$inline_95$$) || ["", "", ""], $v2Comp$$inline_100$$ = $v2CompParser$$inline_98$$.exec($v2Sub$$inline_96$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_99$$[0].length && 0 == $v2Comp$$inline_100$$[0].length) {
          break
        }
        $JSCompiler_temp$$55_order$$inline_90$$ = ((0 == $v1Comp$$inline_99$$[1].length ? 0 : parseInt($v1Comp$$inline_99$$[1], 10)) < (0 == $v2Comp$$inline_100$$[1].length ? 0 : parseInt($v2Comp$$inline_100$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_99$$[1].length ? 0 : parseInt($v1Comp$$inline_99$$[1], 10)) > (0 == $v2Comp$$inline_100$$[1].length ? 0 : parseInt($v2Comp$$inline_100$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_99$$[2].length) < (0 == $v2Comp$$inline_100$$[2].length) ? -1 : (0 == $v1Comp$$inline_99$$[2].length) > 
        (0 == $v2Comp$$inline_100$$[2].length) ? 1 : 0) || ($v1Comp$$inline_99$$[2] < $v2Comp$$inline_100$$[2] ? -1 : $v1Comp$$inline_99$$[2] > $v2Comp$$inline_100$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$55_order$$inline_90$$)
    }
    $JSCompiler_temp$$55_order$$inline_90$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$55_order$$inline_90$$
  }
  return $JSCompiler_temp$$55_order$$inline_90$$
}
var $doc$$inline_102$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_102$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_102$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
// Input 10
function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
$goog$math$Size$$.prototype.floor = function $$goog$math$Size$$$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
$goog$math$Size$$.prototype.round = function $$goog$math$Size$$$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
// Input 11
var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9"), 
$goog$dom$BrowserFeature$CAN_USE_PARENT_ELEMENT_PROPERTY$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$;
// Input 12
// Input 13
function $goog$math$Coordinate$$($opt_x$$, $opt_y$$) {
  this.x = $goog$isDef$$($opt_x$$) ? $opt_x$$ : 0;
  this.y = $goog$isDef$$($opt_y$$) ? $opt_y$$ : 0
}
$goog$math$Coordinate$$.prototype.floor = function $$goog$math$Coordinate$$$$floor$() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this
};
$goog$math$Coordinate$$.prototype.round = function $$goog$math$Coordinate$$$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
// Input 14
function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElement$$($element$$17$$) {
  return $goog$isString$$($element$$17$$) ? document.getElementById($element$$17$$) : $element$$17$$
}
function $goog$dom$getElementsByClass$$($className$$9$$, $opt_el$$1$$) {
  var $parent$$2$$ = $opt_el$$1$$ || document;
  return $parent$$2$$.querySelectorAll && $parent$$2$$.querySelector ? $parent$$2$$.querySelectorAll("." + $className$$9$$) : $parent$$2$$.getElementsByClassName ? $parent$$2$$.getElementsByClassName($className$$9$$) : $goog$dom$getElementsByTagNameAndClass_$$(document, "*", $className$$9$$, $opt_el$$1$$)
}
function $goog$dom$getElementByClass$$($className$$10$$, $opt_el$$2$$) {
  var $parent$$3$$ = $opt_el$$2$$ || document, $retVal$$ = $JSCompiler_alias_NULL$$;
  return($retVal$$ = $parent$$3$$.querySelectorAll && $parent$$3$$.querySelector ? $parent$$3$$.querySelector("." + $className$$10$$) : $goog$dom$getElementsByClass$$($className$$10$$, $opt_el$$2$$)[0]) || $JSCompiler_alias_NULL$$
}
function $goog$dom$getElementsByTagNameAndClass_$$($doc$$6_els_parent$$5$$, $className$$11_opt_tag$$1_tagName$$1$$, $opt_class$$1$$, $arrayLike_opt_el$$3$$) {
  $doc$$6_els_parent$$5$$ = $arrayLike_opt_el$$3$$ || $doc$$6_els_parent$$5$$;
  $className$$11_opt_tag$$1_tagName$$1$$ = $className$$11_opt_tag$$1_tagName$$1$$ && "*" != $className$$11_opt_tag$$1_tagName$$1$$ ? $className$$11_opt_tag$$1_tagName$$1$$.toUpperCase() : "";
  if($doc$$6_els_parent$$5$$.querySelectorAll && $doc$$6_els_parent$$5$$.querySelector && ($className$$11_opt_tag$$1_tagName$$1$$ || $opt_class$$1$$)) {
    return $doc$$6_els_parent$$5$$.querySelectorAll($className$$11_opt_tag$$1_tagName$$1$$ + ($opt_class$$1$$ ? "." + $opt_class$$1$$ : ""))
  }
  if($opt_class$$1$$ && $doc$$6_els_parent$$5$$.getElementsByClassName) {
    $doc$$6_els_parent$$5$$ = $doc$$6_els_parent$$5$$.getElementsByClassName($opt_class$$1$$);
    if($className$$11_opt_tag$$1_tagName$$1$$) {
      $arrayLike_opt_el$$3$$ = {};
      for(var $len$$ = 0, $i$$51$$ = 0, $el$$1$$;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$51$$];$i$$51$$++) {
        $className$$11_opt_tag$$1_tagName$$1$$ == $el$$1$$.nodeName && ($arrayLike_opt_el$$3$$[$len$$++] = $el$$1$$)
      }
      $arrayLike_opt_el$$3$$.length = $len$$;
      return $arrayLike_opt_el$$3$$
    }
    return $doc$$6_els_parent$$5$$
  }
  $doc$$6_els_parent$$5$$ = $doc$$6_els_parent$$5$$.getElementsByTagName($className$$11_opt_tag$$1_tagName$$1$$ || "*");
  if($opt_class$$1$$) {
    $arrayLike_opt_el$$3$$ = {};
    for($i$$51$$ = $len$$ = 0;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$51$$];$i$$51$$++) {
      $className$$11_opt_tag$$1_tagName$$1$$ = $el$$1$$.className, "function" == typeof $className$$11_opt_tag$$1_tagName$$1$$.split && $goog$array$contains$$($className$$11_opt_tag$$1_tagName$$1$$.split(/\s+/), $opt_class$$1$$) && ($arrayLike_opt_el$$3$$[$len$$++] = $el$$1$$)
    }
    $arrayLike_opt_el$$3$$.length = $len$$;
    return $arrayLike_opt_el$$3$$
  }
  return $doc$$6_els_parent$$5$$
}
function $goog$dom$setProperties$$($element$$18$$, $properties$$3$$) {
  $goog$object$forEach$$($properties$$3$$, function($val$$20$$, $key$$45$$) {
    "style" == $key$$45$$ ? $element$$18$$.style.cssText = $val$$20$$ : "class" == $key$$45$$ ? $element$$18$$.className = $val$$20$$ : "for" == $key$$45$$ ? $element$$18$$.htmlFor = $val$$20$$ : $key$$45$$ in $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ ? $element$$18$$.setAttribute($goog$dom$DIRECT_ATTRIBUTE_MAP_$$[$key$$45$$], $val$$20$$) : 0 == $key$$45$$.lastIndexOf("aria-", 0) || 0 == $key$$45$$.lastIndexOf("data-", 0) ? $element$$18$$.setAttribute($key$$45$$, $val$$20$$) : $element$$18$$[$key$$45$$] = 
    $val$$20$$
  })
}
var $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function $goog$dom$getViewportSize_$$($doc$$7_el$$2_win$$) {
  $doc$$7_el$$2_win$$ = $doc$$7_el$$2_win$$.document;
  $doc$$7_el$$2_win$$ = "CSS1Compat" == $doc$$7_el$$2_win$$.compatMode ? $doc$$7_el$$2_win$$.documentElement : $doc$$7_el$$2_win$$.body;
  return new $goog$math$Size$$($doc$$7_el$$2_win$$.clientWidth, $doc$$7_el$$2_win$$.clientHeight)
}
function $goog$dom$getWindow_$$($doc$$11$$) {
  return $doc$$11$$.parentWindow || $doc$$11$$.defaultView
}
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$67$$) {
  return $goog$dom$createDom_$$(document, arguments)
}
function $goog$dom$createDom_$$($doc$$12$$, $args$$9$$) {
  var $element$$19_tagName$$3_tagNameArr$$ = $args$$9$$[0], $attributes$$ = $args$$9$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$19_tagName$$3_tagNameArr$$ = ["<", $element$$19_tagName$$3_tagNameArr$$];
    $attributes$$.name && $element$$19_tagName$$3_tagNameArr$$.push(' name="', $goog$string$htmlEscape$$($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$19_tagName$$3_tagNameArr$$.push(' type="', $goog$string$htmlEscape$$($attributes$$.type), '"');
      var $clone$$2$$ = {};
      $goog$object$extend$$($clone$$2$$, $attributes$$);
      delete $clone$$2$$.type;
      $attributes$$ = $clone$$2$$
    }
    $element$$19_tagName$$3_tagNameArr$$.push(">");
    $element$$19_tagName$$3_tagNameArr$$ = $element$$19_tagName$$3_tagNameArr$$.join("")
  }
  $element$$19_tagName$$3_tagNameArr$$ = $doc$$12$$.createElement($element$$19_tagName$$3_tagNameArr$$);
  $attributes$$ && ($goog$isString$$($attributes$$) ? $element$$19_tagName$$3_tagNameArr$$.className = $attributes$$ : $goog$isArray$$($attributes$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$19_tagName$$3_tagNameArr$$].concat($attributes$$)) : $goog$dom$setProperties$$($element$$19_tagName$$3_tagNameArr$$, $attributes$$));
  2 < $args$$9$$.length && $goog$dom$append_$$($doc$$12$$, $element$$19_tagName$$3_tagNameArr$$, $args$$9$$, 2);
  return $element$$19_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$13$$, $parent$$6$$, $args$$10$$, $i$$52_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$6$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$13$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$52_startIndex$$ < $args$$10$$.length;$i$$52_startIndex$$++) {
    var $arg$$5$$ = $args$$10$$[$i$$52_startIndex$$];
    if($goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType)) {
      var $JSCompiler_inline_result$$22$$;
      a: {
        if($arg$$5$$ && "number" == typeof $arg$$5$$.length) {
          if($goog$isObject$$($arg$$5$$)) {
            $JSCompiler_inline_result$$22$$ = "function" == typeof $arg$$5$$.item || "string" == typeof $arg$$5$$.item;
            break a
          }
          if($goog$isFunction$$($arg$$5$$)) {
            $JSCompiler_inline_result$$22$$ = "function" == typeof $arg$$5$$.item;
            break a
          }
        }
        $JSCompiler_inline_result$$22$$ = $JSCompiler_alias_FALSE$$
      }
      $goog$array$forEach$$($JSCompiler_inline_result$$22$$ ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$)
    }else {
      $childHandler$$($arg$$5$$)
    }
  }
}
function $goog$dom$appendChild$$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
}
function $goog$dom$append$$($parent$$8$$, $var_args$$68$$) {
  $goog$dom$append_$$($goog$dom$getOwnerDocument$$($parent$$8$$), $parent$$8$$, arguments, 1)
}
function $goog$dom$removeChildren$$($node$$6$$) {
  for(var $child$$3$$;$child$$3$$ = $node$$6$$.firstChild;) {
    $node$$6$$.removeChild($child$$3$$)
  }
}
function $goog$dom$insertChildAt$$($parent$$9$$, $child$$4$$, $index$$54$$) {
  $parent$$9$$.insertBefore($child$$4$$, $parent$$9$$.childNodes[$index$$54$$] || $JSCompiler_alias_NULL$$)
}
function $goog$dom$removeNode$$($node$$7$$) {
  return $node$$7$$ && $node$$7$$.parentNode ? $node$$7$$.parentNode.removeChild($node$$7$$) : $JSCompiler_alias_NULL$$
}
function $goog$dom$getChildren$$($element$$21$$) {
  return $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ && $element$$21$$.children != $JSCompiler_alias_VOID$$ ? $element$$21$$.children : $goog$array$filter$$($element$$21$$.childNodes, function($node$$8$$) {
    return 1 == $node$$8$$.nodeType
  })
}
function $goog$dom$getFirstElementChild$$($node$$9$$) {
  return $node$$9$$.firstElementChild != $JSCompiler_alias_VOID$$ ? $node$$9$$.firstElementChild : $goog$dom$getNextElementNode_$$($node$$9$$.firstChild)
}
function $goog$dom$getNextElementSibling$$($node$$11$$) {
  return $node$$11$$.nextElementSibling != $JSCompiler_alias_VOID$$ ? $node$$11$$.nextElementSibling : $goog$dom$getNextElementNode_$$($node$$11$$.nextSibling)
}
function $goog$dom$getNextElementNode_$$($node$$13$$) {
  for(;$node$$13$$ && 1 != $node$$13$$.nodeType;) {
    $node$$13$$ = $node$$13$$.nextSibling
  }
  return $node$$13$$
}
function $goog$dom$getParentElement$$($element$$22_parent$$12$$) {
  if($goog$dom$BrowserFeature$CAN_USE_PARENT_ELEMENT_PROPERTY$$) {
    return $element$$22_parent$$12$$.parentElement
  }
  $element$$22_parent$$12$$ = $element$$22_parent$$12$$.parentNode;
  return $goog$isObject$$($element$$22_parent$$12$$) && 1 == $element$$22_parent$$12$$.nodeType ? $element$$22_parent$$12$$ : $JSCompiler_alias_NULL$$
}
function $goog$dom$contains$$($parent$$13$$, $descendant$$) {
  if($parent$$13$$.contains && 1 == $descendant$$.nodeType) {
    return $parent$$13$$ == $descendant$$ || $parent$$13$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$13$$.compareDocumentPosition) {
    return $parent$$13$$ == $descendant$$ || Boolean($parent$$13$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$13$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$13$$
}
function $goog$dom$getOwnerDocument$$($node$$18$$) {
  return 9 == $node$$18$$.nodeType ? $node$$18$$ : $node$$18$$.ownerDocument || $node$$18$$.document
}
function $goog$dom$setTextContent$$($element$$23$$, $text$$7$$) {
  if("textContent" in $element$$23$$) {
    $element$$23$$.textContent = $text$$7$$
  }else {
    if($element$$23$$.firstChild && 3 == $element$$23$$.firstChild.nodeType) {
      for(;$element$$23$$.lastChild != $element$$23$$.firstChild;) {
        $element$$23$$.removeChild($element$$23$$.lastChild)
      }
      $element$$23$$.firstChild.data = $text$$7$$
    }else {
      $goog$dom$removeChildren$$($element$$23$$), $element$$23$$.appendChild($goog$dom$getOwnerDocument$$($element$$23$$).createTextNode(String($text$$7$$)))
    }
  }
}
var $goog$dom$TAGS_TO_IGNORE_$$ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, $goog$dom$PREDEFINED_TAG_VALUES_$$ = {IMG:" ", BR:"\n"};
function $goog$dom$isFocusableTabIndex$$($element$$25_index$$55$$) {
  var $attrNode$$ = $element$$25_index$$55$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$25_index$$55$$ = $element$$25_index$$55$$.tabIndex, $goog$isNumber$$($element$$25_index$$55$$) && 0 <= $element$$25_index$$55$$ && 32768 > $element$$25_index$$55$$) : $JSCompiler_alias_FALSE$$
}
function $goog$dom$setFocusableTabIndex$$($element$$26$$, $enable$$) {
  $enable$$ ? $element$$26$$.tabIndex = 0 : ($element$$26$$.tabIndex = -1, $element$$26$$.removeAttribute("tabIndex"))
}
function $goog$dom$getTextContent$$($node$$19_textContent$$) {
  if($goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ && "innerText" in $node$$19_textContent$$) {
    $node$$19_textContent$$ = $node$$19_textContent$$.innerText.replace(/(\r\n|\r|\n)/g, "\n")
  }else {
    var $buf$$ = [];
    $goog$dom$getTextContent_$$($node$$19_textContent$$, $buf$$, $JSCompiler_alias_TRUE$$);
    $node$$19_textContent$$ = $buf$$.join("")
  }
  $node$$19_textContent$$ = $node$$19_textContent$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  $node$$19_textContent$$ = $node$$19_textContent$$.replace(/\u200B/g, "");
  $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ || ($node$$19_textContent$$ = $node$$19_textContent$$.replace(/ +/g, " "));
  " " != $node$$19_textContent$$ && ($node$$19_textContent$$ = $node$$19_textContent$$.replace(/^\s*/, ""));
  return $node$$19_textContent$$
}
function $goog$dom$getRawTextContent$$($node$$20$$) {
  var $buf$$1$$ = [];
  $goog$dom$getTextContent_$$($node$$20$$, $buf$$1$$, $JSCompiler_alias_FALSE$$);
  return $buf$$1$$.join("")
}
function $goog$dom$getTextContent_$$($child$$7_node$$21$$, $buf$$2$$, $normalizeWhitespace$$) {
  if(!($child$$7_node$$21$$.nodeName in $goog$dom$TAGS_TO_IGNORE_$$)) {
    if(3 == $child$$7_node$$21$$.nodeType) {
      $normalizeWhitespace$$ ? $buf$$2$$.push(String($child$$7_node$$21$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$2$$.push($child$$7_node$$21$$.nodeValue)
    }else {
      if($child$$7_node$$21$$.nodeName in $goog$dom$PREDEFINED_TAG_VALUES_$$) {
        $buf$$2$$.push($goog$dom$PREDEFINED_TAG_VALUES_$$[$child$$7_node$$21$$.nodeName])
      }else {
        for($child$$7_node$$21$$ = $child$$7_node$$21$$.firstChild;$child$$7_node$$21$$;) {
          $goog$dom$getTextContent_$$($child$$7_node$$21$$, $buf$$2$$, $normalizeWhitespace$$), $child$$7_node$$21$$ = $child$$7_node$$21$$.nextSibling
        }
      }
    }
  }
}
function $goog$dom$getAncestorByTagNameAndClass$$($element$$27$$, $opt_class$$2$$) {
  return!$opt_class$$2$$ ? $JSCompiler_alias_NULL$$ : $goog$dom$getAncestor$$($element$$27$$, function($node$$24$$) {
    return!$opt_class$$2$$ || $goog$dom$classes$has$$($node$$24$$, $opt_class$$2$$)
  })
}
function $goog$dom$getAncestor$$($element$$29$$, $matcher$$) {
  for(var $steps$$ = 0;$element$$29$$;) {
    if($matcher$$($element$$29$$)) {
      return $element$$29$$
    }
    $element$$29$$ = $element$$29$$.parentNode;
    $steps$$++
  }
  return $JSCompiler_alias_NULL$$
}
function $goog$dom$DomHelper$$($opt_document$$) {
  this.$document_$ = $opt_document$$ || $goog$global$$.document || document
}
$JSCompiler_prototypeAlias$$ = $goog$dom$DomHelper$$.prototype;
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $goog$dom$getDomHelper$$;
function $JSCompiler_StaticMethods_getDocument$$($JSCompiler_StaticMethods_getDocument$self$$) {
  return $JSCompiler_StaticMethods_getDocument$self$$.$document_$
}
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$30$$) {
  return $goog$isString$$($element$$30$$) ? this.$document_$.getElementById($element$$30$$) : $element$$30$$
};
$JSCompiler_prototypeAlias$$.$getElementsByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementsByClass$$($className$$13$$, $opt_el$$5$$) {
  return $goog$dom$getElementsByClass$$($className$$13$$, $opt_el$$5$$ || this.$document_$)
};
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$14$$, $opt_el$$6$$) {
  return $goog$dom$getElementByClass$$($className$$14$$, $opt_el$$6$$ || this.$document_$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($tagName$$5$$, $opt_attributes$$1$$, $var_args$$70$$) {
  return $goog$dom$createDom_$$(this.$document_$, arguments)
};
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$64$$) {
  return this.$document_$.createElement($name$$64$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$5$$) {
  return this.$document_$.createTextNode(String($content$$5$$))
};
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_107$$) {
  var $doc$$inline_106_win$$inline_108$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_107$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_107$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_106_win$$inline_108$$.compatMode ? $doc$$inline_106_win$$inline_108$$.documentElement : $doc$$inline_106_win$$inline_108$$.body;
  $doc$$inline_106_win$$inline_108$$ = $goog$dom$getWindow_$$($doc$$inline_106_win$$inline_108$$);
  return new $goog$math$Coordinate$$($doc$$inline_106_win$$inline_108$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_107$$.scrollLeft, $doc$$inline_106_win$$inline_108$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_107$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = $goog$dom$appendChild$$;
$JSCompiler_prototypeAlias$$.$insertChildAt$ = $goog$dom$insertChildAt$$;
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
$JSCompiler_prototypeAlias$$.$getChildren$ = $goog$dom$getChildren$$;
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$setTextContent$ = $goog$dom$setTextContent$$;
// Input 15
function $goog$soy$renderElement$$($element$$31$$, $template$$1$$, $opt_templateData$$) {
  $element$$31$$.innerHTML = $goog$soy$verifyTemplateOutputSafe_$$($template$$1$$($opt_templateData$$ || $goog$soy$defaultTemplateData_$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$))
}
function $goog$soy$renderAsElement$$($firstChild_template$$3$$, $opt_templateData$$2$$, $opt_injectedData$$2$$, $opt_domHelper$$1_wrapper$$) {
  $opt_domHelper$$1_wrapper$$ = ($opt_domHelper$$1_wrapper$$ || $goog$dom$getDomHelper$$()).createElement("DIV");
  $opt_domHelper$$1_wrapper$$.innerHTML = $goog$soy$verifyTemplateOutputSafe_$$($firstChild_template$$3$$($opt_templateData$$2$$ || $goog$soy$defaultTemplateData_$$, $JSCompiler_alias_VOID$$, $opt_injectedData$$2$$));
  return 1 == $opt_domHelper$$1_wrapper$$.childNodes.length && ($firstChild_template$$3$$ = $opt_domHelper$$1_wrapper$$.firstChild, 1 == $firstChild_template$$3$$.nodeType) ? $firstChild_template$$3$$ : $opt_domHelper$$1_wrapper$$
}
function $goog$soy$verifyTemplateOutputSafe_$$($templateResult$$) {
  return!$goog$isObject$$($templateResult$$) ? String($templateResult$$) : "zSoyz"
}
var $goog$soy$defaultTemplateData_$$ = {};
// Input 16
function $goog$ui$registry$setDecoratorByClassName$$($className$$16$$, $decoratorFn$$) {
  $className$$16$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$16$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
// Input 17
function $goog$math$Box$$($top$$2$$, $right$$5$$, $bottom$$1$$, $left$$5$$) {
  this.top = $top$$2$$;
  this.right = $right$$5$$;
  this.bottom = $bottom$$1$$;
  this.left = $left$$5$$
}
$goog$math$Box$$.prototype.contains = function $$goog$math$Box$$$$contains$($other$$4$$) {
  return!this || !$other$$4$$ ? $JSCompiler_alias_FALSE$$ : $other$$4$$ instanceof $goog$math$Box$$ ? $other$$4$$.left >= this.left && $other$$4$$.right <= this.right && $other$$4$$.top >= this.top && $other$$4$$.bottom <= this.bottom : $other$$4$$.x >= this.left && $other$$4$$.x <= this.right && $other$$4$$.y >= this.top && $other$$4$$.y <= this.bottom
};
$goog$math$Box$$.prototype.floor = function $$goog$math$Box$$$$floor$() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this
};
$goog$math$Box$$.prototype.round = function $$goog$math$Box$$$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this
};
// Input 18
function $goog$math$Rect$$($x$$59$$, $y$$37$$, $w$$5$$, $h$$4$$) {
  this.left = $x$$59$$;
  this.top = $y$$37$$;
  this.width = $w$$5$$;
  this.height = $h$$4$$
}
$goog$math$Rect$$.prototype.contains = function $$goog$math$Rect$$$$contains$($another$$) {
  return $another$$ instanceof $goog$math$Rect$$ ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
$goog$math$Rect$$.prototype.floor = function $$goog$math$Rect$$$$floor$() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
$goog$math$Rect$$.prototype.round = function $$goog$math$Rect$$$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
// Input 19
// Input 20
function $goog$style$setStyle$$($element$$33$$, $style$$, $opt_value$$5$$) {
  $goog$isString$$($style$$) ? $goog$style$setStyle_$$($element$$33$$, $opt_value$$5$$, $style$$) : $goog$object$forEach$$($style$$, $goog$partial$$($goog$style$setStyle_$$, $element$$33$$))
}
function $goog$style$setStyle_$$($element$$34$$, $value$$67$$, $prefixedStyle$$inline_113_style$$1$$) {
  var $camelStyle$$inline_112_propertyName$$8$$;
  a: {
    if($camelStyle$$inline_112_propertyName$$8$$ = $goog$string$toCamelCase$$($prefixedStyle$$inline_113_style$$1$$), $element$$34$$.style[$camelStyle$$inline_112_propertyName$$8$$] === $JSCompiler_alias_VOID$$ && ($prefixedStyle$$inline_113_style$$1$$ = ($goog$userAgent$WEBKIT$$ ? "Webkit" : $goog$userAgent$GECKO$$ ? "Moz" : $goog$userAgent$IE$$ ? "ms" : $goog$userAgent$OPERA$$ ? "O" : $JSCompiler_alias_NULL$$) + $goog$string$toTitleCase$$($prefixedStyle$$inline_113_style$$1$$), $element$$34$$.style[$prefixedStyle$$inline_113_style$$1$$] !== 
    $JSCompiler_alias_VOID$$)) {
      $camelStyle$$inline_112_propertyName$$8$$ = $prefixedStyle$$inline_113_style$$1$$;
      break a
    }
  }
  $camelStyle$$inline_112_propertyName$$8$$ && ($element$$34$$.style[$camelStyle$$inline_112_propertyName$$8$$] = $value$$67$$)
}
function $goog$style$getComputedStyle$$($element$$38$$, $property$$4$$) {
  var $doc$$24_styles$$ = $goog$dom$getOwnerDocument$$($element$$38$$);
  return $doc$$24_styles$$.defaultView && $doc$$24_styles$$.defaultView.getComputedStyle && ($doc$$24_styles$$ = $doc$$24_styles$$.defaultView.getComputedStyle($element$$38$$, $JSCompiler_alias_NULL$$)) ? $doc$$24_styles$$[$property$$4$$] || $doc$$24_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getStyle_$$($element$$40$$, $style$$5$$) {
  return $goog$style$getComputedStyle$$($element$$40$$, $style$$5$$) || ($element$$40$$.currentStyle ? $element$$40$$.currentStyle[$style$$5$$] : $JSCompiler_alias_NULL$$) || $element$$40$$.style && $element$$40$$.style[$style$$5$$]
}
function $goog$style$setPosition$$($el$$4$$, $arg1$$76_y$$38$$, $opt_arg2$$) {
  var $x$$60$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1$$76_y$$38$$ instanceof $goog$math$Coordinate$$ ? ($x$$60$$ = $arg1$$76_y$$38$$.x, $arg1$$76_y$$38$$ = $arg1$$76_y$$38$$.y) : ($x$$60$$ = $arg1$$76_y$$38$$, $arg1$$76_y$$38$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$60$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1$$76_y$$38$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$setSize$$($element$$53$$, $w$$6$$, $h$$5_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$5_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$5_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $goog$style$setWidth$$($element$$53$$, $w$$6$$);
  $element$$53$$.style.height = $goog$style$getPixelStyleValue_$$($h$$5_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$68$$, $round$$) {
  "number" == typeof $value$$68$$ && ($value$$68$$ = ($round$$ ? Math.round($value$$68$$) : $value$$68$$) + "px");
  return $value$$68$$
}
function $goog$style$setWidth$$($element$$55$$, $width$$13$$) {
  $element$$55$$.style.width = $goog$style$getPixelStyleValue_$$($width$$13$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getSize$$($element$$56_size$$10$$) {
  if("none" != $goog$style$getStyle_$$($element$$56_size$$10$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$56_size$$10$$)
  }
  var $style$$6$$ = $element$$56_size$$10$$.style, $originalDisplay$$ = $style$$6$$.display, $originalVisibility$$ = $style$$6$$.visibility, $originalPosition$$ = $style$$6$$.position;
  $style$$6$$.visibility = "hidden";
  $style$$6$$.position = "absolute";
  $style$$6$$.display = "inline";
  $element$$56_size$$10$$ = $goog$style$getSizeWithDisplay_$$($element$$56_size$$10$$);
  $style$$6$$.display = $originalDisplay$$;
  $style$$6$$.position = $originalPosition$$;
  $style$$6$$.visibility = $originalVisibility$$;
  return $element$$56_size$$10$$
}
function $goog$style$getSizeWithDisplay_$$($doc$$inline_120_element$$57$$) {
  var $offsetWidth_rect$$inline_119$$ = $doc$$inline_120_element$$57$$.offsetWidth, $offsetHeight$$ = $doc$$inline_120_element$$57$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_119$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth_rect$$inline_119$$) || $webkitOffsetsZero$$) && $doc$$inline_120_element$$57$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_119$$ = $doc$$inline_120_element$$57$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_120_element$$57$$ = $doc$$inline_120_element$$57$$.ownerDocument, $offsetWidth_rect$$inline_119$$.left -= $doc$$inline_120_element$$57$$.documentElement.clientLeft + $doc$$inline_120_element$$57$$.body.clientLeft, $offsetWidth_rect$$inline_119$$.top -= 
  $doc$$inline_120_element$$57$$.documentElement.clientTop + $doc$$inline_120_element$$57$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_119$$.right - $offsetWidth_rect$$inline_119$$.left, $offsetWidth_rect$$inline_119$$.bottom - $offsetWidth_rect$$inline_119$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_119$$, $offsetHeight$$)
}
function $goog$style$setOpacity$$($el$$15$$, $alpha$$3$$) {
  var $style$$8$$ = $el$$15$$.style;
  "opacity" in $style$$8$$ ? $style$$8$$.opacity = $alpha$$3$$ : "MozOpacity" in $style$$8$$ ? $style$$8$$.MozOpacity = $alpha$$3$$ : "filter" in $style$$8$$ && ($style$$8$$.filter = "" === $alpha$$3$$ ? "" : "alpha(opacity=" + 100 * $alpha$$3$$ + ")")
}
function $goog$style$showElement$$($el$$18$$, $display$$) {
  $el$$18$$.style.display = $display$$ ? "" : "none"
}
function $goog$style$isRightToLeft$$($el$$22$$) {
  return"rtl" == $goog$style$getStyle_$$($el$$22$$, "direction")
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$, $goog$style$ieBorderWidthKeywords_$$ = {thin:2, medium:4, thick:6};
function $goog$style$getIePixelBorder_$$($element$$70$$, $prop$$4$$) {
  if("none" == ($element$$70$$.currentStyle ? $element$$70$$.currentStyle[$prop$$4$$ + "Style"] : $JSCompiler_alias_NULL$$)) {
    return 0
  }
  var $pixelValue$$inline_128_width$$15$$ = $element$$70$$.currentStyle ? $element$$70$$.currentStyle[$prop$$4$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$14_oldStyleValue$$inline_126$$;
  if($pixelValue$$inline_128_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$14_oldStyleValue$$inline_126$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_128_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_128_width$$15$$)) {
      $JSCompiler_temp$$14_oldStyleValue$$inline_126$$ = parseInt($pixelValue$$inline_128_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$14_oldStyleValue$$inline_126$$ = $element$$70$$.style.left;
      var $oldRuntimeValue$$inline_127$$ = $element$$70$$.runtimeStyle.left;
      $element$$70$$.runtimeStyle.left = $element$$70$$.currentStyle.left;
      $element$$70$$.style.left = $pixelValue$$inline_128_width$$15$$;
      $pixelValue$$inline_128_width$$15$$ = $element$$70$$.style.pixelLeft;
      $element$$70$$.style.left = $JSCompiler_temp$$14_oldStyleValue$$inline_126$$;
      $element$$70$$.runtimeStyle.left = $oldRuntimeValue$$inline_127$$;
      $JSCompiler_temp$$14_oldStyleValue$$inline_126$$ = $pixelValue$$inline_128_width$$15$$
    }
  }
  return $JSCompiler_temp$$14_oldStyleValue$$inline_126$$
}
function $goog$style$getBorderBox$$($bottom$$5_element$$71$$) {
  if($goog$userAgent$IE$$) {
    var $left$$8$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$71$$, "borderLeft"), $right$$9$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$71$$, "borderRight"), $top$$6$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$71$$, "borderTop");
    $bottom$$5_element$$71$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$71$$, "borderBottom");
    return new $goog$math$Box$$($top$$6$$, $right$$9$$, $bottom$$5_element$$71$$, $left$$8$$)
  }
  $left$$8$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$71$$, "borderLeftWidth");
  $right$$9$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$71$$, "borderRightWidth");
  $top$$6$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$71$$, "borderTopWidth");
  $bottom$$5_element$$71$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$71$$, "borderBottomWidth");
  return new $goog$math$Box$$(parseFloat($top$$6$$), parseFloat($right$$9$$), parseFloat($bottom$$5_element$$71$$), parseFloat($left$$8$$))
}
;
// Input 21
// Input 22
// Input 23
function $goog$Disposable$$() {
  0 != $goog$Disposable$MonitoringMode$OFF$$ && (this.$creationStack$ = Error().stack, $goog$Disposable$instances_$$[$goog$getUid$$(this)] = this)
}
var $goog$Disposable$MonitoringMode$OFF$$ = 0, $goog$Disposable$instances_$$ = {};
$goog$Disposable$$.prototype.$disposed_$ = $JSCompiler_alias_FALSE$$;
$goog$Disposable$$.prototype.$dispose$ = function $$goog$Disposable$$$$$dispose$$() {
  if(!this.$disposed_$ && (this.$disposed_$ = $JSCompiler_alias_TRUE$$, this.$disposeInternal$(), 0 != $goog$Disposable$MonitoringMode$OFF$$)) {
    var $uid$$ = $goog$getUid$$(this);
    delete $goog$Disposable$instances_$$[$uid$$]
  }
};
$goog$Disposable$$.prototype.$disposeInternal$ = function $$goog$Disposable$$$$$disposeInternal$$() {
  if(this.$onDisposeCallbacks_$) {
    for(;this.$onDisposeCallbacks_$.length;) {
      this.$onDisposeCallbacks_$.shift()()
    }
  }
};
function $goog$dispose$$($obj$$82$$) {
  $obj$$82$$ && "function" == typeof $obj$$82$$.$dispose$ && $obj$$82$$.$dispose$()
}
;
// Input 24
function $goog$events$Event$$($type$$57$$, $opt_target$$1$$) {
  this.type = $type$$57$$;
  this.currentTarget = this.target = $opt_target$$1$$
}
$JSCompiler_prototypeAlias$$ = $goog$events$Event$$.prototype;
$JSCompiler_prototypeAlias$$.$disposeInternal$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$dispose$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$propagationStopped_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.defaultPrevented = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$returnValue_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  this.$propagationStopped_$ = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  this.defaultPrevented = $JSCompiler_alias_TRUE$$;
  this.$returnValue_$ = $JSCompiler_alias_FALSE$$
};
function $goog$events$Event$preventDefault$$($e$$15$$) {
  $e$$15$$.preventDefault()
}
;
// Input 25
var $goog$events$ListenableKey$counter_$$ = 0;
// Input 26
function $goog$events$Listener$$() {
}
$JSCompiler_prototypeAlias$$ = $goog$events$Listener$$.prototype;
$JSCompiler_prototypeAlias$$.key = 0;
$JSCompiler_prototypeAlias$$.$removed$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$callOnce$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$($listener$$32$$, $proxy$$, $src$$5$$, $type$$58$$, $capture$$, $opt_handler$$) {
  $goog$isFunction$$($listener$$32$$) ? this.$isFunctionListener_$ = $JSCompiler_alias_TRUE$$ : $listener$$32$$ && $listener$$32$$.handleEvent && $goog$isFunction$$($listener$$32$$.handleEvent) ? this.$isFunctionListener_$ = $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  this.$listener$ = $listener$$32$$;
  this.proxy = $proxy$$;
  this.src = $src$$5$$;
  this.type = $type$$58$$;
  this.capture = !!$capture$$;
  this.$handler$ = $opt_handler$$;
  this.$callOnce$ = $JSCompiler_alias_FALSE$$;
  this.key = ++$goog$events$ListenableKey$counter_$$;
  this.$removed$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($eventObject$$) {
  return this.$isFunctionListener_$ ? this.$listener$.call(this.$handler$ || this.src, $eventObject$$) : this.$listener$.handleEvent.call(this.$listener$, $eventObject$$)
};
// Input 27
var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
// Input 28
// Input 29
// Input 30
// Input 31
function $goog$reflect$sinkValue$$($x$$62$$) {
  $goog$reflect$sinkValue$$[" "]($x$$62$$);
  return $x$$62$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
// Input 32
function $goog$events$BrowserEvent$$($opt_e$$, $opt_currentTarget$$) {
  $opt_e$$ && this.init($opt_e$$, $opt_currentTarget$$)
}
$goog$inherits$$($goog$events$BrowserEvent$$, $goog$events$Event$$);
var $goog$events$BrowserEvent$IEButtonMap$$ = [1, 4, 2];
$JSCompiler_prototypeAlias$$ = $goog$events$BrowserEvent$$.prototype;
$JSCompiler_prototypeAlias$$.target = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.relatedTarget = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.offsetX = 0;
$JSCompiler_prototypeAlias$$.offsetY = 0;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.button = 0;
$JSCompiler_prototypeAlias$$.keyCode = 0;
$JSCompiler_prototypeAlias$$.charCode = 0;
$JSCompiler_prototypeAlias$$.ctrlKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.altKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.shiftKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.metaKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$platformModifierKey$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$event_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$($e$$17$$, $opt_currentTarget$$1$$) {
  var $type$$60$$ = this.type = $e$$17$$.type;
  $goog$events$Event$$.call(this, $type$$60$$);
  this.target = $e$$17$$.target || $e$$17$$.srcElement;
  this.currentTarget = $opt_currentTarget$$1$$;
  var $relatedTarget$$ = $e$$17$$.relatedTarget;
  if($relatedTarget$$) {
    if($goog$userAgent$GECKO$$) {
      var $JSCompiler_inline_result$$19$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$19$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_132$$) {
        }
        $JSCompiler_inline_result$$19$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$19$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
    }
  }else {
    "mouseover" == $type$$60$$ ? $relatedTarget$$ = $e$$17$$.fromElement : "mouseout" == $type$$60$$ && ($relatedTarget$$ = $e$$17$$.toElement)
  }
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = $goog$userAgent$WEBKIT$$ || $e$$17$$.offsetX !== $JSCompiler_alias_VOID$$ ? $e$$17$$.offsetX : $e$$17$$.layerX;
  this.offsetY = $goog$userAgent$WEBKIT$$ || $e$$17$$.offsetY !== $JSCompiler_alias_VOID$$ ? $e$$17$$.offsetY : $e$$17$$.layerY;
  this.clientX = $e$$17$$.clientX !== $JSCompiler_alias_VOID$$ ? $e$$17$$.clientX : $e$$17$$.pageX;
  this.clientY = $e$$17$$.clientY !== $JSCompiler_alias_VOID$$ ? $e$$17$$.clientY : $e$$17$$.pageY;
  this.screenX = $e$$17$$.screenX || 0;
  this.screenY = $e$$17$$.screenY || 0;
  this.button = $e$$17$$.button;
  this.keyCode = $e$$17$$.keyCode || 0;
  this.charCode = $e$$17$$.charCode || ("keypress" == $type$$60$$ ? $e$$17$$.keyCode : 0);
  this.ctrlKey = $e$$17$$.ctrlKey;
  this.altKey = $e$$17$$.altKey;
  this.shiftKey = $e$$17$$.shiftKey;
  this.metaKey = $e$$17$$.metaKey;
  this.$platformModifierKey$ = $goog$userAgent$detectedMac_$$ ? $e$$17$$.metaKey : $e$$17$$.ctrlKey;
  this.state = $e$$17$$.state;
  this.$event_$ = $e$$17$$;
  $e$$17$$.defaultPrevented && this.preventDefault();
  delete this.$propagationStopped_$
};
function $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_StaticMethods_isMouseActionButton$self$$) {
  return($goog$events$BrowserFeature$HAS_W3C_BUTTON$$ ? 0 == $JSCompiler_StaticMethods_isMouseActionButton$self$$.$event_$.button : "click" == $JSCompiler_StaticMethods_isMouseActionButton$self$$.type ? $JSCompiler_alias_TRUE$$ : !!($JSCompiler_StaticMethods_isMouseActionButton$self$$.$event_$.button & $goog$events$BrowserEvent$IEButtonMap$$[0])) && !($goog$userAgent$WEBKIT$$ && $goog$userAgent$detectedMac_$$ && $JSCompiler_StaticMethods_isMouseActionButton$self$$.ctrlKey)
}
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  $goog$events$BrowserEvent$$.$superClass_$.stopPropagation.call(this);
  this.$event_$.stopPropagation ? this.$event_$.stopPropagation() : this.$event_$.cancelBubble = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  $goog$events$BrowserEvent$$.$superClass_$.preventDefault.call(this);
  var $be$$ = this.$event_$;
  if($be$$.preventDefault) {
    $be$$.preventDefault()
  }else {
    if($be$$.returnValue = $JSCompiler_alias_FALSE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$) {
      try {
        if($be$$.ctrlKey || 112 <= $be$$.keyCode && 123 >= $be$$.keyCode) {
          $be$$.keyCode = -1
        }
      }catch($ex$$1$$) {
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = $JSCompiler_emptyFn$$();
// Input 33
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($listenableKey_src$$8$$, $key$$49_type$$61$$, $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$) {
  if($goog$isArray$$($key$$49_type$$61$$)) {
    for(var $i$$63$$ = 0;$i$$63$$ < $key$$49_type$$61$$.length;$i$$63$$++) {
      $goog$events$listen$$($listenableKey_src$$8$$, $key$$49_type$$61$$[$i$$63$$], $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$)
    }
    return $JSCompiler_alias_NULL$$
  }
  $listenableKey_src$$8$$ = $goog$events$listen_$$($listenableKey_src$$8$$, $key$$49_type$$61$$, $listener$$35$$, $JSCompiler_alias_FALSE$$, $opt_capt$$2$$, $opt_handler$$1$$);
  $key$$49_type$$61$$ = $listenableKey_src$$8$$.key;
  $goog$events$listeners_$$[$key$$49_type$$61$$] = $listenableKey_src$$8$$;
  return $key$$49_type$$61$$
}
function $goog$events$listen_$$($src$$9$$, $type$$62$$, $listener$$36$$, $callOnce$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$) {
  $type$$62$$ || $JSCompiler_alias_THROW$$(Error("Invalid event type"));
  $capture$$1_opt_capt$$3$$ = !!$capture$$1_opt_capt$$3$$;
  var $listenerObj_map$$ = $goog$events$listenerTree_$$;
  $type$$62$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$62$$] = {$count_$:0, $remaining_$:0});
  $listenerObj_map$$ = $listenerObj_map$$[$type$$62$$];
  $capture$$1_opt_capt$$3$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$3$$] = {$count_$:0, $remaining_$:0}, $listenerObj_map$$.$count_$++);
  var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$3$$], $srcUid$$ = $goog$getUid$$($src$$9$$), $listenerArray$$;
  $listenerObj_map$$.$remaining_$++;
  if($listenerObj_map$$[$srcUid$$]) {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
    for(var $i$$64_proxy$$1$$ = 0;$i$$64_proxy$$1$$ < $listenerArray$$.length;$i$$64_proxy$$1$$++) {
      if($listenerObj_map$$ = $listenerArray$$[$i$$64_proxy$$1$$], $listenerObj_map$$.$listener$ == $listener$$36$$ && $listenerObj_map$$.$handler$ == $opt_handler$$2$$) {
        if($listenerObj_map$$.$removed$) {
          break
        }
        $callOnce$$ || ($listenerArray$$[$i$$64_proxy$$1$$].$callOnce$ = $JSCompiler_alias_FALSE$$);
        return $listenerArray$$[$i$$64_proxy$$1$$]
      }
    }
  }else {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
  }
  $i$$64_proxy$$1$$ = $goog$events$getProxy$$();
  $listenerObj_map$$ = new $goog$events$Listener$$;
  $listenerObj_map$$.init($listener$$36$$, $i$$64_proxy$$1$$, $src$$9$$, $type$$62$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$);
  $listenerObj_map$$.$callOnce$ = $callOnce$$;
  $i$$64_proxy$$1$$.src = $src$$9$$;
  $i$$64_proxy$$1$$.$listener$ = $listenerObj_map$$;
  $listenerArray$$.push($listenerObj_map$$);
  $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
  $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
  $src$$9$$.addEventListener ? ($src$$9$$ == $goog$global$$ || !$src$$9$$.$customEvent_$) && $src$$9$$.addEventListener($type$$62$$, $i$$64_proxy$$1$$, $capture$$1_opt_capt$$3$$) : $src$$9$$.attachEvent($type$$62$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$62$$] : $goog$events$onStringMap_$$[$type$$62$$] = "on" + $type$$62$$, $i$$64_proxy$$1$$);
  return $listenerObj_map$$
}
function $goog$events$getProxy$$() {
  var $proxyCallbackFunction$$ = $goog$events$handleBrowserEvent_$$, $f$$26$$ = $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ ? function($eventObject$$1$$) {
    return $proxyCallbackFunction$$.call($f$$26$$.src, $f$$26$$.$listener$, $eventObject$$1$$)
  } : function($eventObject$$2_v$$) {
    $eventObject$$2_v$$ = $proxyCallbackFunction$$.call($f$$26$$.src, $f$$26$$.$listener$, $eventObject$$2_v$$);
    if(!$eventObject$$2_v$$) {
      return $eventObject$$2_v$$
    }
  };
  return $f$$26$$
}
function $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $key$$50_type$$63$$, $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$) {
  if($goog$isArray$$($key$$50_type$$63$$)) {
    for(var $i$$65$$ = 0;$i$$65$$ < $key$$50_type$$63$$.length;$i$$65$$++) {
      $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $key$$50_type$$63$$[$i$$65$$], $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$)
    }
    return $JSCompiler_alias_NULL$$
  }
  $listenableKey$$1_src$$10$$ = $goog$events$listen_$$($listenableKey$$1_src$$10$$, $key$$50_type$$63$$, $listener$$37$$, $JSCompiler_alias_TRUE$$, $opt_capt$$4$$, $opt_handler$$3$$);
  $key$$50_type$$63$$ = $listenableKey$$1_src$$10$$.key;
  $goog$events$listeners_$$[$key$$50_type$$63$$] = $listenableKey$$1_src$$10$$;
  return $key$$50_type$$63$$
}
function $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$, $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$) {
  if($goog$isArray$$($type$$64$$)) {
    for(var $i$$66$$ = 0;$i$$66$$ < $type$$64$$.length;$i$$66$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$[$i$$66$$], $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$)
    }
  }else {
    if($capture$$2_opt_capt$$6$$ = !!$capture$$2_opt_capt$$6$$, $listenerArray$$1_src$$12$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$12$$, $type$$64$$, $capture$$2_opt_capt$$6$$)) {
      for($i$$66$$ = 0;$i$$66$$ < $listenerArray$$1_src$$12$$.length;$i$$66$$++) {
        if($listenerArray$$1_src$$12$$[$i$$66$$].$listener$ == $listener$$39$$ && $listenerArray$$1_src$$12$$[$i$$66$$].capture == $capture$$2_opt_capt$$6$$ && $listenerArray$$1_src$$12$$[$i$$66$$].$handler$ == $opt_handler$$5$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$12$$[$i$$66$$].key);
          break
        }
      }
    }
  }
}
function $goog$events$unlistenByKey$$($key$$51$$) {
  var $listener$$40_listenerArray$$2$$ = $goog$events$listeners_$$[$key$$51$$];
  if(!$listener$$40_listenerArray$$2$$ || $listener$$40_listenerArray$$2$$.$removed$) {
    return $JSCompiler_alias_FALSE$$
  }
  var $src$$13_srcUid$$1$$ = $listener$$40_listenerArray$$2$$.src, $type$$65$$ = $listener$$40_listenerArray$$2$$.type, $proxy$$2_sourcesArray$$ = $listener$$40_listenerArray$$2$$.proxy, $capture$$3$$ = $listener$$40_listenerArray$$2$$.capture;
  $src$$13_srcUid$$1$$.removeEventListener ? ($src$$13_srcUid$$1$$ == $goog$global$$ || !$src$$13_srcUid$$1$$.$customEvent_$) && $src$$13_srcUid$$1$$.removeEventListener($type$$65$$, $proxy$$2_sourcesArray$$, $capture$$3$$) : $src$$13_srcUid$$1$$.detachEvent && $src$$13_srcUid$$1$$.detachEvent($type$$65$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$65$$] : $goog$events$onStringMap_$$[$type$$65$$] = "on" + $type$$65$$, $proxy$$2_sourcesArray$$);
  $src$$13_srcUid$$1$$ = $goog$getUid$$($src$$13_srcUid$$1$$);
  $goog$events$sources_$$[$src$$13_srcUid$$1$$] && ($proxy$$2_sourcesArray$$ = $goog$events$sources_$$[$src$$13_srcUid$$1$$], $goog$array$remove$$($proxy$$2_sourcesArray$$, $listener$$40_listenerArray$$2$$), 0 == $proxy$$2_sourcesArray$$.length && delete $goog$events$sources_$$[$src$$13_srcUid$$1$$]);
  $listener$$40_listenerArray$$2$$.$removed$ = $JSCompiler_alias_TRUE$$;
  if($listener$$40_listenerArray$$2$$ = $goog$events$listenerTree_$$[$type$$65$$][$capture$$3$$][$src$$13_srcUid$$1$$]) {
    $listener$$40_listenerArray$$2$$.$needsCleanup_$ = $JSCompiler_alias_TRUE$$, $goog$events$cleanUp_$$($type$$65$$, $capture$$3$$, $src$$13_srcUid$$1$$, $listener$$40_listenerArray$$2$$)
  }
  delete $goog$events$listeners_$$[$key$$51$$];
  return $JSCompiler_alias_TRUE$$
}
function $goog$events$cleanUp_$$($type$$66$$, $capture$$4$$, $srcUid$$2$$, $listenerArray$$3$$) {
  if(!$listenerArray$$3$$.$locked_$ && $listenerArray$$3$$.$needsCleanup_$) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$3$$.length;$oldIndex$$++) {
      $listenerArray$$3$$[$oldIndex$$].$removed$ ? $listenerArray$$3$$[$oldIndex$$].proxy.src = $JSCompiler_alias_NULL$$ : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$3$$[$newIndex$$] = $listenerArray$$3$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$3$$.length = $newIndex$$;
    $listenerArray$$3$$.$needsCleanup_$ = $JSCompiler_alias_FALSE$$;
    0 == $newIndex$$ && (delete $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$][$srcUid$$2$$], $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$].$count_$--, 0 == $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$].$count_$ && (delete $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$], $goog$events$listenerTree_$$[$type$$66$$].$count_$--), 0 == $goog$events$listenerTree_$$[$type$$66$$].$count_$ && delete $goog$events$listenerTree_$$[$type$$66$$])
  }
}
function $goog$events$removeAll$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$) {
  var $count$$9$$ = 0;
  if($opt_obj$$27_sourcesArray$$1_srcUid$$3$$ != $JSCompiler_alias_NULL$$) {
    if($opt_obj$$27_sourcesArray$$1_srcUid$$3$$ = $goog$getUid$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$), $goog$events$sources_$$[$opt_obj$$27_sourcesArray$$1_srcUid$$3$$]) {
      $opt_obj$$27_sourcesArray$$1_srcUid$$3$$ = $goog$events$sources_$$[$opt_obj$$27_sourcesArray$$1_srcUid$$3$$];
      for(var $i$$67$$ = $opt_obj$$27_sourcesArray$$1_srcUid$$3$$.length - 1;0 <= $i$$67$$;$i$$67$$--) {
        $goog$events$unlistenByKey$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$[$i$$67$$].key), $count$$9$$++
      }
    }
  }else {
    $goog$object$forEach$$($goog$events$listeners_$$, function($listener$$43$$, $key$$52$$) {
      $goog$events$unlistenByKey$$($key$$52$$);
      $count$$9$$++
    })
  }
}
function $goog$events$getListeners_$$($obj$$86_objUid$$, $type$$68$$, $capture$$6$$) {
  var $map$$1$$ = $goog$events$listenerTree_$$;
  return $type$$68$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$type$$68$$], $capture$$6$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$capture$$6$$], $obj$$86_objUid$$ = $goog$getUid$$($obj$$86_objUid$$), $map$$1$$[$obj$$86_objUid$$])) ? $map$$1$$[$obj$$86_objUid$$] : $JSCompiler_alias_NULL$$
}
function $goog$events$fireListeners_$$($map$$4$$, $obj$$89_objUid$$2$$, $type$$72$$, $capture$$9$$, $eventObject$$4$$) {
  var $retval$$ = 1;
  $obj$$89_objUid$$2$$ = $goog$getUid$$($obj$$89_objUid$$2$$);
  if($map$$4$$[$obj$$89_objUid$$2$$]) {
    var $remaining$$ = --$map$$4$$.$remaining_$, $listenerArray$$5$$ = $map$$4$$[$obj$$89_objUid$$2$$];
    $listenerArray$$5$$.$locked_$ ? $listenerArray$$5$$.$locked_$++ : $listenerArray$$5$$.$locked_$ = 1;
    try {
      for(var $length$$16$$ = $listenerArray$$5$$.length, $i$$69$$ = 0;$i$$69$$ < $length$$16$$;$i$$69$$++) {
        var $listener$$46$$ = $listenerArray$$5$$[$i$$69$$];
        $listener$$46$$ && !$listener$$46$$.$removed$ && ($retval$$ &= $goog$events$fireListener$$($listener$$46$$, $eventObject$$4$$) !== $JSCompiler_alias_FALSE$$)
      }
    }finally {
      $map$$4$$.$remaining_$ = Math.max($remaining$$, $map$$4$$.$remaining_$), $listenerArray$$5$$.$locked_$--, $goog$events$cleanUp_$$($type$$72$$, $capture$$9$$, $obj$$89_objUid$$2$$, $listenerArray$$5$$)
    }
  }
  return Boolean($retval$$)
}
function $goog$events$fireListener$$($listener$$47$$, $eventObject$$5$$) {
  $listener$$47$$.$callOnce$ && $goog$events$unlistenByKey$$($listener$$47$$.key);
  return $listener$$47$$.handleEvent($eventObject$$5$$)
}
function $goog$events$handleBrowserEvent_$$($listener$$48$$, $opt_evt$$) {
  if($listener$$48$$.$removed$) {
    return $JSCompiler_alias_TRUE$$
  }
  var $be$$1_type$$74$$ = $listener$$48$$.type, $map$$6$$ = $goog$events$listenerTree_$$;
  if(!($be$$1_type$$74$$ in $map$$6$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    $ieEvent_retval$$1$$ = $opt_evt$$ || $goog$getObjectByName$$("window.event");
    var $hasCapture$$2$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$, $hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($hasCapture$$2$$) {
      if(0 > $ieEvent_retval$$1$$.keyCode || $ieEvent_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_138$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_retval$$1$$.keyCode) {
          try {
            $ieEvent_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_139$$) {
            $evt$$16_useReturnValue$$inline_138$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_138$$ || $ieEvent_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_138$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_138$$.init($ieEvent_retval$$1$$, this);
    $ieEvent_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($hasCapture$$2$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_138$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$71$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_138$$.$propagationStopped_$ && 0 <= $i$$71$$ && $targetsMap$$1$$.$remaining_$;$i$$71$$--) {
          $evt$$16_useReturnValue$$inline_138$$.currentTarget = $ancestors$$2$$[$i$$71$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$71$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_138$$)
        }
        if($hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$71$$ = 0;!$evt$$16_useReturnValue$$inline_138$$.$propagationStopped_$ && $i$$71$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$71$$++) {
            $evt$$16_useReturnValue$$inline_138$$.currentTarget = $ancestors$$2$$[$i$$71$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$71$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_138$$)
          }
        }
      }else {
        $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_138$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
}
var $goog$events$uniqueIdCounter_$$ = 0;
// Input 34
function $goog$events$EventHandler$$($opt_handler$$8$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$8$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$17$$, $type$$75$$, $opt_fn$$4$$, $opt_capture$$1$$) {
  $goog$isArray$$($type$$75$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$75$$, $type$$75$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$72$$ = 0;$i$$72$$ < $type$$75$$.length;$i$$72$$++) {
    var $key$$54$$ = $goog$events$listen$$($src$$17$$, $type$$75$$[$i$$72$$], $opt_fn$$4$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$54$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_listenOnce$$($JSCompiler_StaticMethods_listenOnce$self$$, $key$$55_src$$18$$, $type$$76$$, $opt_fn$$5$$, $opt_capture$$2$$, $opt_handler$$10$$) {
  if($goog$isArray$$($type$$76$$)) {
    for(var $i$$73$$ = 0;$i$$73$$ < $type$$76$$.length;$i$$73$$++) {
      $JSCompiler_StaticMethods_listenOnce$$($JSCompiler_StaticMethods_listenOnce$self$$, $key$$55_src$$18$$, $type$$76$$[$i$$73$$], $opt_fn$$5$$, $opt_capture$$2$$, $opt_handler$$10$$)
    }
  }else {
    $key$$55_src$$18$$ = $goog$events$listenOnce$$($key$$55_src$$18$$, $type$$76$$, $opt_fn$$5$$ || $JSCompiler_StaticMethods_listenOnce$self$$, $opt_capture$$2$$, $opt_handler$$10$$ || $JSCompiler_StaticMethods_listenOnce$self$$.$handler_$ || $JSCompiler_StaticMethods_listenOnce$self$$), $JSCompiler_StaticMethods_listenOnce$self$$.$keys_$.push($key$$55_src$$18$$)
  }
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$, $i$$inline_148_type$$77$$, $listener$$inline_143_opt_fn$$6$$, $capture$$inline_146_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_145$$) {
  if($goog$isArray$$($i$$inline_148_type$$77$$)) {
    for(var $i$$74$$ = 0;$i$$74$$ < $i$$inline_148_type$$77$$.length;$i$$74$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$, $i$$inline_148_type$$77$$[$i$$74$$], $listener$$inline_143_opt_fn$$6$$, $capture$$inline_146_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_145$$)
    }
  }else {
    a: {
      $listener$$inline_143_opt_fn$$6$$ = $listener$$inline_143_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_145$$ = $opt_handler$$12_opt_handler$$inline_145$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_146_opt_capture$$3$$ = !!$capture$$inline_146_opt_capture$$3$$;
      if($key$$56_listener$$51_listenerArray$$inline_147_src$$20$$ = $goog$events$getListeners_$$($key$$56_listener$$51_listenerArray$$inline_147_src$$20$$, $i$$inline_148_type$$77$$, $capture$$inline_146_opt_capture$$3$$)) {
        for($i$$inline_148_type$$77$$ = 0;$i$$inline_148_type$$77$$ < $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$.length;$i$$inline_148_type$$77$$++) {
          if(!$key$$56_listener$$51_listenerArray$$inline_147_src$$20$$[$i$$inline_148_type$$77$$].$removed$ && $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$[$i$$inline_148_type$$77$$].$listener$ == $listener$$inline_143_opt_fn$$6$$ && $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$[$i$$inline_148_type$$77$$].capture == $capture$$inline_146_opt_capture$$3$$ && $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$[$i$$inline_148_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_145$$) {
            $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$ = $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$[$i$$inline_148_type$$77$$];
            break a
          }
        }
      }
      $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$ && ($key$$56_listener$$51_listenerArray$$inline_147_src$$20$$ = $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$.key, $goog$events$unlistenByKey$$($key$$56_listener$$51_listenerArray$$inline_147_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$56_listener$$51_listenerArray$$inline_147_src$$20$$))
  }
  return $JSCompiler_StaticMethods_unlisten$self$$
}
$goog$events$EventHandler$$.prototype.$removeAll$ = function $$goog$events$EventHandler$$$$$removeAll$$() {
  $goog$array$forEach$$(this.$keys_$, $goog$events$unlistenByKey$$);
  this.$keys_$.length = 0
};
$goog$events$EventHandler$$.prototype.$disposeInternal$ = function $$goog$events$EventHandler$$$$$disposeInternal$$() {
  $goog$events$EventHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.$removeAll$()
};
$goog$events$EventHandler$$.prototype.handleEvent = function $$goog$events$EventHandler$$$$handleEvent$() {
  $JSCompiler_alias_THROW$$(Error("EventHandler.handleEvent not implemented"))
};
// Input 35
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
// Input 36
function $goog$events$EventTarget$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($goog$events$EventTarget$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$EventTarget$$.prototype;
$JSCompiler_prototypeAlias$$.$customEvent_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$parentEventTarget_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = $JSCompiler_set$$("$parentEventTarget_$");
$JSCompiler_prototypeAlias$$.addEventListener = function $$JSCompiler_prototypeAlias$$$addEventListener$($type$$78$$, $handler$$40$$, $opt_capture$$4$$, $opt_handlerScope$$) {
  $goog$events$listen$$(this, $type$$78$$, $handler$$40$$, $opt_capture$$4$$, $opt_handlerScope$$)
};
$JSCompiler_prototypeAlias$$.removeEventListener = function $$JSCompiler_prototypeAlias$$$removeEventListener$($type$$79$$, $handler$$41$$, $opt_capture$$5$$, $opt_handlerScope$$1$$) {
  $goog$events$unlisten$$(this, $type$$79$$, $handler$$41$$, $opt_capture$$5$$, $opt_handlerScope$$1$$)
};
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$39_e$$24_e$$inline_151$$) {
  var $hasCapture$$inline_157_type$$inline_152$$ = $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.type || $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$, $map$$inline_153$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_157_type$$inline_152$$ in $map$$inline_153$$) {
    if($goog$isString$$($JSCompiler_inline_result$$39_e$$24_e$$inline_151$$)) {
      $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$ = new $goog$events$Event$$($JSCompiler_inline_result$$39_e$$24_e$$inline_151$$, this)
    }else {
      if($JSCompiler_inline_result$$39_e$$24_e$$inline_151$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.target = $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.target || this
      }else {
        var $oldEvent$$inline_154_rv$$inline_155$$ = $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$;
        $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$ = new $goog$events$Event$$($hasCapture$$inline_157_type$$inline_152$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$39_e$$24_e$$inline_151$$, $oldEvent$$inline_154_rv$$inline_155$$)
      }
    }
    var $oldEvent$$inline_154_rv$$inline_155$$ = 1, $ancestors$$inline_156_current$$inline_161$$, $map$$inline_153$$ = $map$$inline_153$$[$hasCapture$$inline_157_type$$inline_152$$], $hasCapture$$inline_157_type$$inline_152$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_153$$, $parent$$inline_159_targetsMap$$inline_158$$;
    if($hasCapture$$inline_157_type$$inline_152$$) {
      $ancestors$$inline_156_current$$inline_161$$ = [];
      for($parent$$inline_159_targetsMap$$inline_158$$ = this;$parent$$inline_159_targetsMap$$inline_158$$;$parent$$inline_159_targetsMap$$inline_158$$ = $parent$$inline_159_targetsMap$$inline_158$$.$parentEventTarget_$) {
        $ancestors$$inline_156_current$$inline_161$$.push($parent$$inline_159_targetsMap$$inline_158$$)
      }
      $parent$$inline_159_targetsMap$$inline_158$$ = $map$$inline_153$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_159_targetsMap$$inline_158$$.$remaining_$ = $parent$$inline_159_targetsMap$$inline_158$$.$count_$;
      for(var $i$$inline_160$$ = $ancestors$$inline_156_current$$inline_161$$.length - 1;!$JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$propagationStopped_$ && 0 <= $i$$inline_160$$ && $parent$$inline_159_targetsMap$$inline_158$$.$remaining_$;$i$$inline_160$$--) {
        $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.currentTarget = $ancestors$$inline_156_current$$inline_161$$[$i$$inline_160$$], $oldEvent$$inline_154_rv$$inline_155$$ &= $goog$events$fireListeners_$$($parent$$inline_159_targetsMap$$inline_158$$, $ancestors$$inline_156_current$$inline_161$$[$i$$inline_160$$], $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$) && $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_153$$) {
      if($parent$$inline_159_targetsMap$$inline_158$$ = $map$$inline_153$$[$JSCompiler_alias_FALSE$$], $parent$$inline_159_targetsMap$$inline_158$$.$remaining_$ = $parent$$inline_159_targetsMap$$inline_158$$.$count_$, $hasCapture$$inline_157_type$$inline_152$$) {
        for($i$$inline_160$$ = 0;!$JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$propagationStopped_$ && $i$$inline_160$$ < $ancestors$$inline_156_current$$inline_161$$.length && $parent$$inline_159_targetsMap$$inline_158$$.$remaining_$;$i$$inline_160$$++) {
          $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.currentTarget = $ancestors$$inline_156_current$$inline_161$$[$i$$inline_160$$], $oldEvent$$inline_154_rv$$inline_155$$ &= $goog$events$fireListeners_$$($parent$$inline_159_targetsMap$$inline_158$$, $ancestors$$inline_156_current$$inline_161$$[$i$$inline_160$$], $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$) && $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_156_current$$inline_161$$ = this;!$JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$propagationStopped_$ && $ancestors$$inline_156_current$$inline_161$$ && $parent$$inline_159_targetsMap$$inline_158$$.$remaining_$;$ancestors$$inline_156_current$$inline_161$$ = $ancestors$$inline_156_current$$inline_161$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.currentTarget = $ancestors$$inline_156_current$$inline_161$$, $oldEvent$$inline_154_rv$$inline_155$$ &= $goog$events$fireListeners_$$($parent$$inline_159_targetsMap$$inline_158$$, $ancestors$$inline_156_current$$inline_161$$, $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$) && $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$ = Boolean($oldEvent$$inline_154_rv$$inline_155$$)
  }else {
    $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$39_e$$24_e$$inline_151$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
// Input 37
function $goog$ui$Component$$($opt_domHelper$$2$$) {
  $goog$Disposable$$.call(this);
  this.$dom_$ = $opt_domHelper$$2$$ || $goog$dom$getDomHelper$$();
  this.$rightToLeft_$ = $goog$ui$Component$defaultRightToLeft_$$
}
$goog$inherits$$($goog$ui$Component$$, $goog$events$EventTarget$$);
$goog$ui$Component$$.prototype.$idGenerator_$ = $goog$ui$IdGenerator$$.$getInstance$();
var $goog$ui$Component$defaultRightToLeft_$$ = $JSCompiler_alias_NULL$$;
function $goog$ui$Component$getStateTransitionEvent$$($state$$, $isEntering$$) {
  switch($state$$) {
    case 1:
      return $isEntering$$ ? "disable" : "enable";
    case 2:
      return $isEntering$$ ? "highlight" : "unhighlight";
    case 4:
      return $isEntering$$ ? "activate" : "deactivate";
    case 8:
      return $isEntering$$ ? "select" : "unselect";
    case 16:
      return $isEntering$$ ? "check" : "uncheck";
    case 32:
      return $isEntering$$ ? "focus" : "blur";
    case 64:
      return $isEntering$$ ? "open" : "close"
  }
  $JSCompiler_alias_THROW$$(Error("Invalid component state"))
}
$JSCompiler_prototypeAlias$$ = $goog$ui$Component$$.prototype;
$JSCompiler_prototypeAlias$$.$id_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$inDocument_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$rightToLeft_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$model_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$parent_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$children_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$childIndex_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$wasDecorated_$ = $JSCompiler_alias_FALSE$$;
function $JSCompiler_StaticMethods_getId$$($JSCompiler_StaticMethods_getId$self$$) {
  return $JSCompiler_StaticMethods_getId$self$$.$id_$ || ($JSCompiler_StaticMethods_getId$self$$.$id_$ = ":" + ($JSCompiler_StaticMethods_getId$self$$.$idGenerator_$.$nextId_$++).toString(36))
}
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$3$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_933$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_934$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_934$$ in $obj$$inline_933$$ && delete $obj$$inline_933$$[$key$$inline_934$$];
    $goog$object$add$$($JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $id$$3$$, $JSCompiler_StaticMethods_setId$self$$)
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$3$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getElementsByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementsByClass$$($className$$17$$) {
  return this.$element_$ ? this.$dom_$.$getElementsByClass$($className$$17$$, this.$element_$) : []
};
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$18$$) {
  return this.$element_$ ? this.$dom_$.$getElementByClass$($className$$18$$, this.$element_$) : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$googUiComponentHandler_$ || (this.$googUiComponentHandler_$ = new $goog$events$EventHandler$$(this))
};
function $JSCompiler_StaticMethods_setParent$$($JSCompiler_StaticMethods_setParent$self$$, $parent$$21$$) {
  $JSCompiler_StaticMethods_setParent$self$$ == $parent$$21$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component"));
  $parent$$21$$ && ($JSCompiler_StaticMethods_setParent$self$$.$parent_$ && $JSCompiler_StaticMethods_setParent$self$$.$id_$ && $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$.$id_$ && ($JSCompiler_StaticMethods_setParent$self$$.$id_$ in $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$[$JSCompiler_StaticMethods_setParent$self$$.$id_$]) && $JSCompiler_StaticMethods_setParent$self$$.$parent_$ != 
  $parent$$21$$) && $JSCompiler_alias_THROW$$(Error("Unable to set parent component"));
  $JSCompiler_StaticMethods_setParent$self$$.$parent_$ = $parent$$21$$;
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$, $parent$$21$$)
}
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$parent_$");
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$22$$) {
  this.$parent_$ && this.$parent_$ != $parent$$22$$ && $JSCompiler_alias_THROW$$(Error("Method not supported"));
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call(this, $parent$$22$$)
};
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$element_$ = this.$dom_$.createElement("div")
};
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$($opt_parentElement$$) {
  this.$render_$($opt_parentElement$$)
};
$JSCompiler_prototypeAlias$$.$render_$ = function $$JSCompiler_prototypeAlias$$$$render_$$($opt_parentElement$$1$$, $opt_beforeNode$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$element_$ || this.$createDom$();
  $opt_parentElement$$1$$ ? $opt_parentElement$$1$$.insertBefore(this.$element_$, $opt_beforeNode$$ || $JSCompiler_alias_NULL$$) : this.$dom_$.$document_$.body.appendChild(this.$element_$);
  (!this.$parent_$ || this.$parent_$.$inDocument_$) && this.$enterDocument$()
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$74$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$74$$ && this.$canDecorate$($element$$74$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$74$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$74$$)
    }
    this.$decorateInternal$($element$$74$$);
    this.$enterDocument$()
  }else {
    $JSCompiler_alias_THROW$$(Error("Invalid element to decorate"))
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorateInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  this.$inDocument_$ = $JSCompiler_alias_TRUE$$;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$8$$) {
    !$child$$8$$.$inDocument_$ && $child$$8$$.$getElement$() && $child$$8$$.$enterDocument$()
  })
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$9$$) {
    $child$$9$$.$inDocument_$ && $child$$9$$.$exitDocument$()
  });
  this.$googUiComponentHandler_$ && this.$googUiComponentHandler_$.$removeAll$();
  this.$inDocument_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$inDocument_$ && this.$exitDocument$();
  this.$googUiComponentHandler_$ && (this.$googUiComponentHandler_$.$dispose$(), delete this.$googUiComponentHandler_$);
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$10$$) {
    $child$$10$$.$dispose$()
  });
  !this.$wasDecorated_$ && this.$element_$ && $goog$dom$removeNode$$(this.$element_$);
  this.$parent_$ = this.$model_$ = this.$element_$ = this.$childIndex_$ = this.$children_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Component$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$getModel$ = $JSCompiler_get$$("$model_$");
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $child$$11$$) {
  var $index$$inline_166$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && !$JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_166$$ || $index$$inline_166$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_168_key$$inline_937$$ = $JSCompiler_StaticMethods_getId$$($child$$11$$);
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_168_key$$inline_937$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $JSCompiler_StaticMethods_getId$$($child$$11$$), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_166$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_168_key$$inline_937$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_168_key$$inline_937$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_168_key$$inline_937$$.childNodes[$index$$inline_166$$] || $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && 
  (!$child$$11$$.$inDocument_$ && $child$$11$$.$element_$ && $child$$11$$.$element_$.parentNode && 1 == $child$$11$$.$element_$.parentNode.nodeType) && $child$$11$$.$enterDocument$()
}
$JSCompiler_prototypeAlias$$.$getContentElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$isRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$isRightToLeft$$() {
  this.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && (this.$rightToLeft_$ = $goog$style$isRightToLeft$$(this.$inDocument_$ ? this.$element_$ : this.$dom_$.$document_$.body));
  return this.$rightToLeft_$
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$1$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$rightToLeft_$ = $rightToLeft$$1$$
};
function $JSCompiler_StaticMethods_forEachChild$$($JSCompiler_StaticMethods_forEachChild$self$$, $f$$27$$) {
  $JSCompiler_StaticMethods_forEachChild$self$$.$children_$ && $goog$array$forEach$$($JSCompiler_StaticMethods_forEachChild$self$$.$children_$, $f$$27$$, $JSCompiler_alias_VOID$$)
}
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $JSCompiler_StaticMethods_getId$$($child$$15$$);
    $child$$15$$ = this.$childIndex_$ && $id$$6$$ ? ($id$$6$$ in this.$childIndex_$ ? this.$childIndex_$[$id$$6$$] : $JSCompiler_alias_VOID$$) || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    if($id$$6$$ && $child$$15$$) {
      var $obj$$inline_944$$ = this.$childIndex_$;
      $id$$6$$ in $obj$$inline_944$$ && delete $obj$$inline_944$$[$id$$6$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
// Input 38
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  return 2147483647 < $opt_delay$$ ? -1 : $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 39
function $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$26$$) {
  if($e$$26$$.altKey && !$e$$26$$.ctrlKey || $e$$26$$.metaKey || 112 <= $e$$26$$.keyCode && 123 >= $e$$26$$.keyCode) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($e$$26$$.keyCode) {
    case 18:
    ;
    case 20:
    ;
    case 93:
    ;
    case 17:
    ;
    case 40:
    ;
    case 35:
    ;
    case 27:
    ;
    case 36:
    ;
    case 45:
    ;
    case 37:
    ;
    case 224:
    ;
    case 91:
    ;
    case 144:
    ;
    case 12:
    ;
    case 34:
    ;
    case 33:
    ;
    case 19:
    ;
    case 255:
    ;
    case 44:
    ;
    case 39:
    ;
    case 145:
    ;
    case 16:
    ;
    case 38:
    ;
    case 224:
    ;
    case 92:
      return $JSCompiler_alias_FALSE$$;
    case 0:
      return!$goog$userAgent$GECKO$$;
    default:
      return 166 > $e$$26$$.keyCode || 183 < $e$$26$$.keyCode
  }
}
function $goog$events$KeyCodes$firesKeyPressEvent$$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!$goog$userAgent$IE$$ && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$isVersion$$("525"))) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$userAgent$detectedMac_$$ && $opt_altKey$$) {
    return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && (17 == $opt_heldKeyCode$$ || 18 == $opt_heldKeyCode$$ || $goog$userAgent$detectedMac_$$ && 91 == $opt_heldKeyCode$$)) {
    return $JSCompiler_alias_FALSE$$
  }
  if($goog$userAgent$WEBKIT$$ && $opt_ctrlKey$$ && $opt_shiftKey$$) {
    switch($keyCode$$) {
      case 220:
      ;
      case 219:
      ;
      case 221:
      ;
      case 192:
      ;
      case 186:
      ;
      case 189:
      ;
      case 187:
      ;
      case 188:
      ;
      case 190:
      ;
      case 191:
      ;
      case 192:
      ;
      case 222:
        return $JSCompiler_alias_FALSE$$
    }
  }
  if($goog$userAgent$IE$$ && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($keyCode$$) {
    case 13:
      return!($goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$);
    case 27:
      return!$goog$userAgent$WEBKIT$$
  }
  return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
}
function $goog$events$KeyCodes$isCharacterKey$$($keyCode$$1$$) {
  if(48 <= $keyCode$$1$$ && 57 >= $keyCode$$1$$ || 96 <= $keyCode$$1$$ && 106 >= $keyCode$$1$$ || 65 <= $keyCode$$1$$ && 90 >= $keyCode$$1$$ || $goog$userAgent$WEBKIT$$ && 0 == $keyCode$$1$$) {
    return $JSCompiler_alias_TRUE$$
  }
  switch($keyCode$$1$$) {
    case 32:
    ;
    case 63:
    ;
    case 107:
    ;
    case 109:
    ;
    case 110:
    ;
    case 111:
    ;
    case 186:
    ;
    case 59:
    ;
    case 189:
    ;
    case 187:
    ;
    case 61:
    ;
    case 188:
    ;
    case 190:
    ;
    case 191:
    ;
    case 192:
    ;
    case 222:
    ;
    case 219:
    ;
    case 220:
    ;
    case 221:
      return $JSCompiler_alias_TRUE$$;
    default:
      return $JSCompiler_alias_FALSE$$
  }
}
function $goog$events$KeyCodes$normalizeGeckoKeyCode$$($keyCode$$2$$) {
  switch($keyCode$$2$$) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return $keyCode$$2$$
  }
}
;
// Input 40
function $goog$events$InputHandler$$($element$$77_emulateInputEvents$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$77_emulateInputEvents$$;
  $element$$77_emulateInputEvents$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && !$goog$userAgent$isVersion$$("531") && "TEXTAREA" == $element$$77_emulateInputEvents$$.tagName;
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$element_$, $element$$77_emulateInputEvents$$ ? ["keydown", "paste", "cut", "drop", "input"] : "input", this)
}
$goog$inherits$$($goog$events$InputHandler$$, $goog$events$EventTarget$$);
$goog$events$InputHandler$$.prototype.$timer_$ = $JSCompiler_alias_NULL$$;
$goog$events$InputHandler$$.prototype.handleEvent = function $$goog$events$InputHandler$$$$handleEvent$($e$$27$$) {
  if("input" == $e$$27$$.type) {
    $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this), (!$goog$userAgent$OPERA$$ || this.$element_$ == $goog$dom$getOwnerDocument$$(this.$element_$).activeElement) && this.dispatchEvent($JSCompiler_StaticMethods_createInputEvent_$$($e$$27$$))
  }else {
    if("keydown" != $e$$27$$.type || $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$27$$)) {
      var $valueBeforeKey$$ = "keydown" == $e$$27$$.type ? this.$element_$.value : $JSCompiler_alias_NULL$$;
      $goog$userAgent$IE$$ && 229 == $e$$27$$.keyCode && ($valueBeforeKey$$ = $JSCompiler_alias_NULL$$);
      var $inputEvent$$ = $JSCompiler_StaticMethods_createInputEvent_$$($e$$27$$);
      $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this);
      this.$timer_$ = $goog$Timer$callOnce$$(function() {
        this.$timer_$ = $JSCompiler_alias_NULL$$;
        this.$element_$.value != $valueBeforeKey$$ && this.dispatchEvent($inputEvent$$)
      }, 0, this)
    }
  }
};
function $JSCompiler_StaticMethods_cancelTimerIfSet_$$($JSCompiler_StaticMethods_cancelTimerIfSet_$self$$) {
  $JSCompiler_StaticMethods_cancelTimerIfSet_$self$$.$timer_$ != $JSCompiler_alias_NULL$$ && ($goog$global$$.clearTimeout($JSCompiler_StaticMethods_cancelTimerIfSet_$self$$.$timer_$), $JSCompiler_StaticMethods_cancelTimerIfSet_$self$$.$timer_$ = $JSCompiler_alias_NULL$$)
}
function $JSCompiler_StaticMethods_createInputEvent_$$($be$$2_e$$28$$) {
  $be$$2_e$$28$$ = new $goog$events$BrowserEvent$$($be$$2_e$$28$$.$event_$);
  $be$$2_e$$28$$.type = "input";
  return $be$$2_e$$28$$
}
$goog$events$InputHandler$$.prototype.$disposeInternal$ = function $$goog$events$InputHandler$$$$$disposeInternal$$() {
  $goog$events$InputHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.$eventHandler_$.$dispose$();
  $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this);
  delete this.$element_$
};
// Input 41
// Input 42
function $goog$structs$getValues$$($col$$1$$) {
  if("function" == typeof $col$$1$$.$getValues$) {
    return $col$$1$$.$getValues$()
  }
  if($goog$isString$$($col$$1$$)) {
    return $col$$1$$.split("")
  }
  if($goog$isArrayLike$$($col$$1$$)) {
    for(var $rv$$16$$ = [], $l$$12$$ = $col$$1$$.length, $i$$85$$ = 0;$i$$85$$ < $l$$12$$;$i$$85$$++) {
      $rv$$16$$.push($col$$1$$[$i$$85$$])
    }
    return $rv$$16$$
  }
  return $goog$object$getValues$$($col$$1$$)
}
function $goog$structs$forEach$$($col$$6$$, $f$$36$$, $opt_obj$$37$$) {
  if("function" == typeof $col$$6$$.forEach) {
    $col$$6$$.forEach($f$$36$$, $opt_obj$$37$$)
  }else {
    if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
      $goog$array$forEach$$($col$$6$$, $f$$36$$, $opt_obj$$37$$)
    }else {
      var $keys$$1_rv$$inline_177$$;
      if("function" == typeof $col$$6$$.$getKeys$) {
        $keys$$1_rv$$inline_177$$ = $col$$6$$.$getKeys$()
      }else {
        if("function" != typeof $col$$6$$.$getValues$) {
          if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
            $keys$$1_rv$$inline_177$$ = [];
            for(var $l$$inline_178_values$$5$$ = $col$$6$$.length, $i$$inline_179_l$$14$$ = 0;$i$$inline_179_l$$14$$ < $l$$inline_178_values$$5$$;$i$$inline_179_l$$14$$++) {
              $keys$$1_rv$$inline_177$$.push($i$$inline_179_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_177$$ = $goog$object$getKeys$$($col$$6$$)
          }
        }else {
          $keys$$1_rv$$inline_177$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_178_values$$5$$ = $goog$structs$getValues$$($col$$6$$), $i$$inline_179_l$$14$$ = $l$$inline_178_values$$5$$.length, $i$$87$$ = 0;$i$$87$$ < $i$$inline_179_l$$14$$;$i$$87$$++) {
        $f$$36$$.call($opt_obj$$37$$, $l$$inline_178_values$$5$$[$i$$87$$], $keys$$1_rv$$inline_177$$ && $keys$$1_rv$$inline_177$$[$i$$87$$], $col$$6$$)
      }
    }
  }
}
;
// Input 43
function $goog$structs$Map$$($opt_map$$, $var_args$$75$$) {
  this.$map_$ = {};
  this.$keys_$ = [];
  var $argLength$$2$$ = arguments.length;
  if(1 < $argLength$$2$$) {
    $argLength$$2$$ % 2 && $JSCompiler_alias_THROW$$(Error("Uneven number of arguments"));
    for(var $i$$92$$ = 0;$i$$92$$ < $argLength$$2$$;$i$$92$$ += 2) {
      this.set(arguments[$i$$92$$], arguments[$i$$92$$ + 1])
    }
  }else {
    $opt_map$$ && this.$addAll$($opt_map$$)
  }
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Map$$.prototype;
$JSCompiler_prototypeAlias$$.$count_$ = 0;
$JSCompiler_prototypeAlias$$.$version_$ = 0;
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  for(var $rv$$20$$ = [], $i$$93$$ = 0;$i$$93$$ < this.$keys_$.length;$i$$93$$++) {
    $rv$$20$$.push(this.$map_$[this.$keys_$[$i$$93$$]])
  }
  return $rv$$20$$
};
$JSCompiler_prototypeAlias$$.$getKeys$ = function $$JSCompiler_prototypeAlias$$$$getKeys$$() {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  return this.$keys_$.concat()
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$ = {};
  this.$version_$ = this.$count_$ = this.$keys_$.length = 0
};
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($key$$63$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$63$$) ? (delete this.$map_$[$key$$63$$], this.$count_$--, this.$version_$++, this.$keys_$.length > 2 * this.$count_$ && $JSCompiler_StaticMethods_cleanupKeysArray_$$(this), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$) {
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      var $key$$64$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$];
      $goog$structs$Map$hasKey_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$map_$, $key$$64$$) && ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$64$$);
      $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $seen$$2$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      $key$$64$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$], $goog$structs$Map$hasKey_$$($seen$$2$$, $key$$64$$) || ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$64$$, $seen$$2$$[$key$$64$$] = 1), $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
}
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($key$$65$$, $opt_val$$1$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$65$$) ? this.$map_$[$key$$65$$] : $opt_val$$1$$
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$66$$, $value$$76$$) {
  $goog$structs$Map$hasKey_$$(this.$map_$, $key$$66$$) || (this.$count_$++, this.$keys_$.push($key$$66$$), this.$version_$++);
  this.$map_$[$key$$66$$] = $value$$76$$
};
$JSCompiler_prototypeAlias$$.$addAll$ = function $$JSCompiler_prototypeAlias$$$$addAll$$($map$$7_values$$10$$) {
  var $keys$$6$$;
  $map$$7_values$$10$$ instanceof $goog$structs$Map$$ ? ($keys$$6$$ = $map$$7_values$$10$$.$getKeys$(), $map$$7_values$$10$$ = $map$$7_values$$10$$.$getValues$()) : ($keys$$6$$ = $goog$object$getKeys$$($map$$7_values$$10$$), $map$$7_values$$10$$ = $goog$object$getValues$$($map$$7_values$$10$$));
  for(var $i$$96$$ = 0;$i$$96$$ < $keys$$6$$.length;$i$$96$$++) {
    this.set($keys$$6$$[$i$$96$$], $map$$7_values$$10$$[$i$$96$$])
  }
};
function $goog$structs$Map$hasKey_$$($obj$$92$$, $key$$70$$) {
  return Object.prototype.hasOwnProperty.call($obj$$92$$, $key$$70$$)
}
;
// Input 44
function $goog$dom$forms$getValue$$($el$$35$$) {
  var $selectedIndex$$inline_182_type$$91_values$$inline_185$$ = $el$$35$$.type;
  if(!$goog$isDef$$($selectedIndex$$inline_182_type$$91_values$$inline_185$$)) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_182_type$$91_values$$inline_185$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$35$$.checked ? $el$$35$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_182_type$$91_values$$inline_185$$ = $el$$35$$.selectedIndex, 0 <= $selectedIndex$$inline_182_type$$91_values$$inline_185$$ ? $el$$35$$.options[$selectedIndex$$inline_182_type$$91_values$$inline_185$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_182_type$$91_values$$inline_185$$ = [], $option$$inline_186$$, $i$$inline_187$$ = 0;$option$$inline_186$$ = $el$$35$$.options[$i$$inline_187$$];$i$$inline_187$$++) {
        $option$$inline_186$$.selected && $selectedIndex$$inline_182_type$$91_values$$inline_185$$.push($option$$inline_186$$.value)
      }
      return $selectedIndex$$inline_182_type$$91_values$$inline_185$$.length ? $selectedIndex$$inline_182_type$$91_values$$inline_185$$ : $JSCompiler_alias_NULL$$;
    default:
      return $goog$isDef$$($el$$35$$.value) ? $el$$35$$.value : $JSCompiler_alias_NULL$$
  }
}
function $goog$dom$forms$setValue$$($el$$39$$, $opt_value$$6$$) {
  var $opt_value$$inline_198_option$$inline_194_type$$92$$ = $el$$39$$.type;
  if($goog$isDef$$($opt_value$$inline_198_option$$inline_194_type$$92$$)) {
    switch($opt_value$$inline_198_option$$inline_194_type$$92$$.toLowerCase()) {
      case "checkbox":
      ;
      case "radio":
        $el$$39$$.checked = $opt_value$$6$$ ? "checked" : $JSCompiler_alias_NULL$$;
        break;
      case "select-one":
        $el$$39$$.selectedIndex = -1;
        if($goog$isString$$($opt_value$$6$$)) {
          for(var $i$$inline_195_option$$inline_199$$ = 0;$opt_value$$inline_198_option$$inline_194_type$$92$$ = $el$$39$$.options[$i$$inline_195_option$$inline_199$$];$i$$inline_195_option$$inline_199$$++) {
            if($opt_value$$inline_198_option$$inline_194_type$$92$$.value == $opt_value$$6$$) {
              $opt_value$$inline_198_option$$inline_194_type$$92$$.selected = $JSCompiler_alias_TRUE$$;
              break
            }
          }
        }
        break;
      case "select-multiple":
        $opt_value$$inline_198_option$$inline_194_type$$92$$ = $opt_value$$6$$;
        $goog$isString$$($opt_value$$inline_198_option$$inline_194_type$$92$$) && ($opt_value$$inline_198_option$$inline_194_type$$92$$ = [$opt_value$$inline_198_option$$inline_194_type$$92$$]);
        for(var $i$$inline_200$$ = 0;$i$$inline_195_option$$inline_199$$ = $el$$39$$.options[$i$$inline_200$$];$i$$inline_200$$++) {
          if($i$$inline_195_option$$inline_199$$.selected = $JSCompiler_alias_FALSE$$, $opt_value$$inline_198_option$$inline_194_type$$92$$) {
            for(var $value$$inline_201$$, $j$$inline_202$$ = 0;$value$$inline_201$$ = $opt_value$$inline_198_option$$inline_194_type$$92$$[$j$$inline_202$$];$j$$inline_202$$++) {
              $i$$inline_195_option$$inline_199$$.value == $value$$inline_201$$ && ($i$$inline_195_option$$inline_199$$.selected = $JSCompiler_alias_TRUE$$)
            }
          }
        }
        break;
      default:
        $el$$39$$.value = $opt_value$$6$$ != $JSCompiler_alias_NULL$$ ? $opt_value$$6$$ : ""
    }
  }
}
;
// Input 45
function $bitex$ui$DataGrid$$($options$$6$$, $opt_domHelper$$3$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$3$$);
  this.$columns_$ = $options$$6$$.columns;
  this.$row_id_fn_$ = $options$$6$$.rowIDFn || $goog$nullFunction$$;
  this.$row_class_fn_$ = $options$$6$$.rowClassFn || $goog$nullFunction$$;
  this.$current_page_$ = $options$$6$$.currentPage || 0;
  this.$limit_$ = $options$$6$$.limit || 100;
  this.$blink_delay_$ = $options$$6$$.blinkDelay || 700;
  this.$sort_column_$ = "";
  this.$sort_direction_$ = "up";
  this.$select_filter_$ = this.$filter_$ = $JSCompiler_alias_NULL$$;
  this.$loading_data_$ = $goog$dom$createDom$$("div", ["progress", "progress-striped", "active"], $goog$dom$createDom$$("div", "bar"));
  $goog$style$setWidth$$(this.$loading_data_$, "50%");
  $goog$style$setStyle$$(this.$loading_data_$, "margin", "auto");
  $goog$style$setWidth$$($goog$dom$getFirstElementChild$$(this.$loading_data_$), "100%")
}
$goog$inherits$$($bitex$ui$DataGrid$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$DataGrid$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("datagrid");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$78_search_div$$) {
  this.$element_$ = $element$$78_search_div$$;
  var $table_header_element$$ = $goog$dom$getFirstElementChild$$($element$$78_search_div$$);
  $goog$dom$classes$add$$($table_header_element$$, this.$getBaseCssClass$());
  var $thead_element$$ = $goog$dom$getFirstElementChild$$($table_header_element$$);
  $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($thead_element$$)).setAttribute("colspan", this.$columns_$.length);
  var $column_header_el$$ = $goog$dom$getNextElementSibling$$($goog$dom$getFirstElementChild$$($thead_element$$));
  $column_header_el$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($column_header_el$$);
  this.$th_sizing_el_$ = $goog$dom$createDom$$("tr");
  this.$tr_columns_el_$ = $goog$dom$createDom$$("tr");
  $goog$array$forEach$$(this.$columns_$, function($child$$inline_208_column$$) {
    var $th_column_properties$$ = {"data-property":$child$$inline_208_column$$.property};
    $child$$inline_208_column$$.sortable && ($th_column_properties$$["class"] = "sortable");
    var $child$$inline_205$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_208_column$$.label);
    this.$tr_columns_el_$.appendChild($child$$inline_205$$);
    $child$$inline_208_column$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_208_column$$.label);
    this.$th_sizing_el_$.appendChild($child$$inline_208_column$$)
  }, this);
  $thead_element$$.appendChild(this.$tr_columns_el_$);
  this.$table_data_body_el_$ = $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($goog$dom$getNextElementSibling$$($table_header_element$$)));
  this.$element_start_counter_$ = $goog$dom$getElementByClass$$("grid-start", $element$$78_search_div$$);
  this.$element_end_counter_$ = $goog$dom$getElementByClass$$("grid-end", $element$$78_search_div$$);
  this.$element_prev_button_$ = $goog$dom$getElementByClass$$("grid-prevpage", $element$$78_search_div$$);
  this.$element_next_button_$ = $goog$dom$getElementByClass$$("grid-nextpage", $element$$78_search_div$$);
  $element$$78_search_div$$ = $goog$dom$getElementByClass$$("datagrid-search", $element$$78_search_div$$);
  this.$search_input_$ = $goog$dom$getFirstElementChild$$($element$$78_search_div$$);
  this.$search_btn_$ = $goog$dom$getNextElementSibling$$(this.$search_input_$)
};
$JSCompiler_prototypeAlias$$.$handlePreviousPage_$ = function $$JSCompiler_prototypeAlias$$$$handlePreviousPage_$$() {
  0 >= this.$current_page_$ || (this.$current_page_$ -= 1, this.$render_$())
};
$JSCompiler_prototypeAlias$$.$handleNextPage_$ = function $$JSCompiler_prototypeAlias$$$$handleNextPage_$$() {
  this.$current_page_$ += 1;
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$handleColumnClick_$ = function $$JSCompiler_prototypeAlias$$$$handleColumnClick_$$($e$$33_other_sorted_column_elements_sort_indicator_element$$) {
  var $classToRemove_element$$79$$ = $e$$33_other_sorted_column_elements_sort_indicator_element$$.target;
  if($goog$dom$classes$has$$($classToRemove_element$$79$$, "sortable")) {
    this.$sort_column_$ = $classToRemove_element$$79$$.getAttribute("data-property");
    if($goog$dom$classes$has$$($classToRemove_element$$79$$, "sorted")) {
      $e$$33_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $classToRemove_element$$79$$);
      var $classToAdd$$;
      $goog$dom$classes$has$$($e$$33_other_sorted_column_elements_sort_indicator_element$$, "icon-chevron-up") ? ($classToRemove_element$$79$$ = "icon-chevron-up", $classToAdd$$ = "icon-chevron-down", this.$sort_direction_$ = "ASC") : ($classToRemove_element$$79$$ = "icon-chevron-down", $classToAdd$$ = "icon-chevron-up", this.$sort_direction_$ = "DESC");
      $goog$dom$classes$addRemove$$($e$$33_other_sorted_column_elements_sort_indicator_element$$, $classToRemove_element$$79$$, $classToAdd$$)
    }else {
      $e$$33_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementsByClass$$("sorted", this.$tr_columns_el_$), $goog$array$forEach$$($e$$33_other_sorted_column_elements_sort_indicator_element$$, function($other_sort_indicator_element_other_sorted_column_element$$) {
        $goog$dom$classes$remove$$($other_sort_indicator_element_other_sorted_column_element$$, "sorted");
        $other_sort_indicator_element_other_sorted_column_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $other_sort_indicator_element_other_sorted_column_element$$);
        $other_sort_indicator_element_other_sorted_column_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($other_sort_indicator_element_other_sorted_column_element$$)
      }, this), $e$$33_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$createDom$$("i", ["icon-chevron-up", "datagrid-sort"]), $classToRemove_element$$79$$.appendChild($e$$33_other_sorted_column_elements_sort_indicator_element$$), this.$sort_direction_$ = "DESC", $goog$dom$classes$add$$($classToRemove_element$$79$$, "sorted")
    }
    this.$render_$()
  }
};
$JSCompiler_prototypeAlias$$.$render_$ = function $$JSCompiler_prototypeAlias$$$$render_$$() {
  $goog$dom$setTextContent$$(this.$element_start_counter_$, this.$current_page_$ * this.$limit_$ + 1);
  $goog$dom$setTextContent$$(this.$element_end_counter_$, this.$current_page_$ * this.$limit_$ + this.$limit_$);
  var $options$$7$$ = {Page:this.$current_page_$, Limit:this.$limit_$}, $cols$$ = [];
  $goog$array$forEach$$(this.$columns_$, function($column$$1_property$$6$$) {
    $column$$1_property$$6$$ = $column$$1_property$$6$$.property;
    $column$$1_property$$6$$ != $JSCompiler_alias_NULL$$ && $cols$$.push($column$$1_property$$6$$)
  }, this);
  $options$$7$$.Columns = $cols$$;
  if(!$goog$string$isEmpty$$(this.$sort_column_$ == $JSCompiler_alias_NULL$$ ? "" : String(this.$sort_column_$))) {
    $options$$7$$.Sort = this.$sort_column_$, $options$$7$$.SortOrder = this.$sort_direction_$
  }
  var $filter$$3$$ = $JSCompiler_StaticMethods_getFilter$$(this);
  $filter$$3$$ != $JSCompiler_alias_NULL$$ && 0 < $filter$$3$$.length && ($options$$7$$.Filter = $filter$$3$$);
  this.dispatchEvent(new $bitex$ui$DataGridEvent$$("request_data", $options$$7$$));
  $goog$dom$removeChildren$$(this.$table_data_body_el_$);
  this.$table_data_body_el_$.appendChild(this.$loading_data_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$DataGrid$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$42$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$element_prev_button_$, "click", this.$handlePreviousPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$element_next_button_$, "click", this.$handleNextPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$tr_columns_el_$, "click", this.$handleColumnClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$search_btn_$, "click", this.$handleSearchBtnClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$getElement$(), "click", this.$handleDataGridClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, new $goog$events$InputHandler$$(this.$search_input_$), "input", this.$onChangeFilter_$);
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$handleDataGridClick_$ = function $$JSCompiler_prototypeAlias$$$$handleDataGridClick_$$($e$$34_element$$80$$) {
  $e$$34_element$$80$$ = $e$$34_element$$80$$.target;
  var $is_filter_click$$ = $JSCompiler_alias_FALSE$$, $data_value$$ = $JSCompiler_alias_NULL$$;
  "A" === $e$$34_element$$80$$.tagName && ($e$$34_element$$80$$ = $goog$dom$getParentElement$$($e$$34_element$$80$$));
  "LI" === $e$$34_element$$80$$.tagName && ($data_value$$ = $e$$34_element$$80$$.getAttribute("data-value"));
  $data_value$$ != $JSCompiler_alias_NULL$$ && ($goog$dom$getAncestorByTagNameAndClass$$($e$$34_element$$80$$, "filter") != $JSCompiler_alias_NULL$$ && ($is_filter_click$$ = $JSCompiler_alias_TRUE$$), $is_filter_click$$ && ("all" === $data_value$$ ? this.$select_filter_$ != $JSCompiler_alias_NULL$$ && (this.$select_filter_$ = $JSCompiler_alias_NULL$$, this.$current_page_$ = 0, this.$render_$()) : this.$select_filter_$ !== $data_value$$ && (this.$select_filter_$ = $data_value$$, this.$current_page_$ = 
  0, this.$render_$())))
};
function $JSCompiler_StaticMethods_getFilter$$($JSCompiler_StaticMethods_getFilter$self$$) {
  var $res$$7$$ = [];
  $JSCompiler_StaticMethods_getFilter$self$$.$filter_$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($JSCompiler_StaticMethods_getFilter$self$$.$filter_$) && $res$$7$$.push($JSCompiler_StaticMethods_getFilter$self$$.$filter_$);
  $JSCompiler_StaticMethods_getFilter$self$$.$select_filter_$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($JSCompiler_StaticMethods_getFilter$self$$.$filter_$) && $res$$7$$.push($JSCompiler_StaticMethods_getFilter$self$$.$select_filter_$);
  return $res$$7$$
}
$JSCompiler_prototypeAlias$$.$onChangeFilter_$ = function $$JSCompiler_prototypeAlias$$$$onChangeFilter_$$() {
  var $filter$$4$$ = $goog$dom$forms$getValue$$(this.$search_input_$);
  $goog$string$isEmpty$$($filter$$4$$) && this.$filter_$ === $JSCompiler_alias_NULL$$ ? $goog$dom$classes$addRemove$$($goog$dom$getFirstElementChild$$(this.$search_btn_$), "icon-remove", "icon-search") : $filter$$4$$ === this.$filter_$ && this.$filter_$ != $JSCompiler_alias_NULL$$ ? $goog$dom$classes$addRemove$$($goog$dom$getFirstElementChild$$(this.$search_btn_$), "icon-search", "icon-remove") : $goog$dom$classes$addRemove$$($goog$dom$getFirstElementChild$$(this.$search_btn_$), "icon-remove", "icon-search")
};
$JSCompiler_prototypeAlias$$.$handleSearchBtnClick_$ = function $$JSCompiler_prototypeAlias$$$$handleSearchBtnClick_$$() {
  var $filter$$5$$ = $goog$dom$forms$getValue$$(this.$search_input_$);
  if(!$goog$string$isEmpty$$($filter$$5$$) || this.$filter_$ !== $JSCompiler_alias_NULL$$) {
    $filter$$5$$ === this.$filter_$ && this.$filter_$ != $JSCompiler_alias_NULL$$ ? (this.$filter_$ = $JSCompiler_alias_NULL$$, $goog$dom$forms$setValue$$(this.$search_input_$, ""), $goog$dom$classes$addRemove$$($goog$dom$getFirstElementChild$$(this.$search_btn_$), "icon-remove", "icon-search")) : (this.$filter_$ = $filter$$5$$, $goog$dom$classes$addRemove$$($goog$dom$getFirstElementChild$$(this.$search_btn_$), "icon-search", "icon-remove")), this.$current_page_$ = 0, this.$render_$()
  }
};
function $JSCompiler_StaticMethods_setColumnFormatter$$($JSCompiler_StaticMethods_setColumnFormatter$self$$, $column$$3_index$$62$$, $formatter$$1$$, $opt_handler$$15$$) {
  var $result_set_col_index$$1$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_setColumnFormatter$self$$.$columns_$, function($this_col$$1$$, $index_row_set$$1$$) {
    $result_set_col_index$$1$$[$this_col$$1$$.property] = $index_row_set$$1$$
  });
  $column$$3_index$$62$$ = $result_set_col_index$$1$$[$column$$3_index$$62$$];
  $column$$3_index$$62$$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_setColumnFormatter$self$$.$columns_$[$column$$3_index$$62$$].formatter = $opt_handler$$15$$ != $JSCompiler_alias_NULL$$ ? $goog$bind$$($formatter$$1$$, $opt_handler$$15$$) : $formatter$$1$$)
}
function $JSCompiler_StaticMethods_insertOrUpdateRecord$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$, $record$$) {
  var $result_set_col_index$$2$$ = {}, $columns$$3$$ = $goog$object$getKeys$$($record$$), $first_row_row_set$$ = $goog$object$getValues$$($record$$);
  $goog$array$forEach$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$columns_$, function($this_col$$2$$, $index_row_set$$2$$) {
    var $index$$63$$ = $goog$array$findIndex$$($columns$$3$$, function($col$$11$$) {
      return $col$$11$$ == $this_col$$2$$.property
    });
    $result_set_col_index$$2$$[$index$$63$$] = $index_row_set$$2$$
  });
  var $row_id$$ = $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$row_id_fn_$($record$$), $tr$$ = $JSCompiler_alias_NULL$$, $is_new_record$$ = $JSCompiler_alias_FALSE$$;
  $row_id$$ != $JSCompiler_alias_NULL$$ && ($tr$$ = $goog$dom$getElement$$($row_id$$));
  $tr$$ != $JSCompiler_alias_NULL$$ ? $tr$$.className = $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$row_class_fn_$($record$$) : ($tr$$ = $goog$dom$createDom$$("tr", $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$row_class_fn_$($record$$)), $tr$$.id = $row_id$$, $is_new_record$$ = $JSCompiler_alias_TRUE$$);
  var $td_elements$$ = {};
  $goog$array$forEach$$($first_row_row_set$$, function($value$$85$$, $result_set_index$$) {
    var $index$$64$$ = $result_set_col_index$$2$$[$result_set_index$$];
    if($index$$64$$ != $JSCompiler_alias_NULL$$) {
      var $formatter$$2_td$$ = this.$columns_$[$index$$64$$].formatter || function() {
        return"" + $value$$85$$
      }, $formatter$$2_td$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$64$$].classes || $goog$nullFunction$$)($value$$85$$), $formatter$$2_td$$($value$$85$$, $record$$));
      $td_elements$$[this.$columns_$[$index$$64$$].property] = $formatter$$2_td$$
    }
  }, $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$);
  $is_new_record$$ || $goog$dom$removeChildren$$($tr$$);
  $goog$array$forEach$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$columns_$, function($col$$12_td$$1$$) {
    $col$$12_td$$1$$ = $td_elements$$[$col$$12_td$$1$$.property];
    $col$$12_td$$1$$ != $JSCompiler_alias_NULL$$ || ($col$$12_td$$1$$ = $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, ""));
    $tr$$.appendChild($col$$12_td$$1$$)
  });
  $is_new_record$$ && ($goog$isNumber$$(0) ? $goog$dom$insertChildAt$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$table_data_body_el_$, $tr$$, 0) : $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$table_data_body_el_$.appendChild($tr$$));
  $first_row_row_set$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$table_data_body_el_$);
  $first_row_row_set$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_adjustSizes_$$($JSCompiler_StaticMethods_insertOrUpdateRecord$self$$, $first_row_row_set$$);
  $goog$dom$classes$add$$($tr$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tr$$, "warning")
  }, $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$.$blink_delay_$, $JSCompiler_StaticMethods_insertOrUpdateRecord$self$$)
}
function $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_resultSetToElements$self$$, $resultSet$$, $columns$$4$$) {
  var $elements$$1$$ = [], $result_set_col_index$$3$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_resultSetToElements$self$$.$columns_$, function($this_col$$3$$, $index_row_set$$3$$) {
    var $index$$65$$ = $goog$array$findIndex$$($columns$$4$$, function($col$$13$$) {
      return $col$$13$$ == $this_col$$3$$.property
    });
    $result_set_col_index$$3$$[$index$$65$$] = $index_row_set$$3$$
  });
  $goog$array$forEach$$($resultSet$$, function($row_set$$1$$) {
    $goog$array$forEach$$($row_set$$1$$, $JSCompiler_emptyFn$$(), this);
    var $rowSetObj$$ = {}, $row_id$$1_x$$63$$;
    for($row_id$$1_x$$63$$ in $columns$$4$$) {
      $rowSetObj$$[$columns$$4$$[$row_id$$1_x$$63$$]] = $row_set$$1$$[$row_id$$1_x$$63$$]
    }
    var $tr$$1$$ = $goog$dom$createDom$$("tr", this.$row_class_fn_$($rowSetObj$$));
    $row_id$$1_x$$63$$ = this.$row_id_fn_$($rowSetObj$$);
    $row_id$$1_x$$63$$ != $JSCompiler_alias_NULL$$ && ($tr$$1$$.id = $row_id$$1_x$$63$$);
    var $td_elements$$1$$ = {};
    $goog$array$forEach$$($row_set$$1$$, function($value$$87$$, $result_set_index$$2$$) {
      var $index$$67$$ = $result_set_col_index$$3$$[$result_set_index$$2$$];
      if($index$$67$$ != $JSCompiler_alias_NULL$$) {
        var $formatter$$3_td$$2$$ = this.$columns_$[$index$$67$$].formatter || function() {
          return"" + $value$$87$$
        }, $formatter$$3_td$$2$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$67$$].classes || $goog$nullFunction$$)($value$$87$$), $formatter$$3_td$$2$$($value$$87$$, $rowSetObj$$));
        $td_elements$$1$$[this.$columns_$[$index$$67$$].property] = $formatter$$3_td$$2$$
      }
    }, this);
    $goog$array$forEach$$(this.$columns_$, function($col$$14_td$$3$$) {
      $col$$14_td$$3$$ = $td_elements$$1$$[$col$$14_td$$3$$.property];
      $col$$14_td$$3$$ != $JSCompiler_alias_NULL$$ || ($col$$14_td$$3$$ = $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, ""));
      $tr$$1$$.appendChild($col$$14_td$$3$$)
    });
    $elements$$1$$.push($tr$$1$$)
  }, $JSCompiler_StaticMethods_resultSetToElements$self$$);
  return $elements$$1$$
}
function $JSCompiler_StaticMethods_setResultSet$$($JSCompiler_StaticMethods_setResultSet$self$$, $elements$$2_resultSet$$1$$, $columns$$5_first_row$$1$$) {
  $goog$dom$removeChildren$$($JSCompiler_StaticMethods_setResultSet$self$$.$table_data_body_el_$);
  $elements$$2_resultSet$$1$$ = $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_setResultSet$self$$, $elements$$2_resultSet$$1$$, $columns$$5_first_row$$1$$);
  $columns$$5_first_row$$1$$ = $elements$$2_resultSet$$1$$[0];
  $goog$array$forEach$$($elements$$2_resultSet$$1$$, function($tr$$2$$) {
    this.$table_data_body_el_$.appendChild($tr$$2$$)
  }, $JSCompiler_StaticMethods_setResultSet$self$$);
  $columns$$5_first_row$$1$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_adjustSizes_$$($JSCompiler_StaticMethods_setResultSet$self$$, $columns$$5_first_row$$1$$)
}
function $JSCompiler_StaticMethods_adjustSizes_$$($JSCompiler_StaticMethods_adjustSizes_$self$$, $first_row$$2$$) {
  $first_row$$2$$.parentNode && $first_row$$2$$.parentNode.insertBefore($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $first_row$$2$$);
  var $el_size$$inline_237_sizing_row$$inline_233$$ = $JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $work_col_1$$inline_234$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$tr_columns_el_$), $work_col_2$$inline_235$$ = $goog$dom$getFirstElementChild$$($first_row$$2$$), $sizing_col$$inline_236$$ = $goog$dom$getFirstElementChild$$($el_size$$inline_237_sizing_row$$inline_233$$);
  for($goog$dom$getChildren$$($el_size$$inline_237_sizing_row$$inline_233$$);$sizing_col$$inline_236$$ != $JSCompiler_alias_NULL$$;) {
    $el_size$$inline_237_sizing_row$$inline_233$$ = $goog$style$getSize$$($sizing_col$$inline_236$$), $goog$style$setWidth$$($work_col_1$$inline_234$$, $el_size$$inline_237_sizing_row$$inline_233$$.width), $goog$style$setWidth$$($work_col_2$$inline_235$$, $el_size$$inline_237_sizing_row$$inline_233$$.width), $work_col_1$$inline_234$$ = $goog$dom$getNextElementSibling$$($work_col_1$$inline_234$$), $work_col_2$$inline_235$$ = $goog$dom$getNextElementSibling$$($work_col_2$$inline_235$$), $sizing_col$$inline_236$$ = 
    $goog$dom$getNextElementSibling$$($sizing_col$$inline_236$$)
  }
  $goog$dom$removeNode$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$)
}
function $bitex$ui$DataGridEvent$$($type$$93$$, $options$$8$$) {
  $goog$events$Event$$.call(this, $type$$93$$);
  this.options = $options$$8$$
}
$goog$inherits$$($bitex$ui$DataGridEvent$$, $goog$events$Event$$);
// Input 46
function $bitex$ui$AccountActivity$$($opt_domHelper$$4$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-order-id"
  }}, {property:"Side", label:"Compra/Venda", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$17$$) {
    switch($s$$17$$) {
      case "1":
        return"C";
      case "2":
        return"V"
    }
    return""
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-side"
  }}, {property:"OrderDate", label:"Data/Hora", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-order-date"
  }}, {property:"Price", label:"Pre\u00e7o", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-price"
  }}, {property:"CumQty", label:"Qtd", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Pre\u00e7o m\u00e9dio", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-avg-price"
  }}, {property:"Volume", label:"Total", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-vol"
  }}]}, $opt_domHelper$$4$$)
}
$goog$inherits$$($bitex$ui$AccountActivity$$, $bitex$ui$DataGrid$$);
var $bitex$ui$AccountActivity$CSS_CLASS$$ = "account-activity";
$bitex$ui$AccountActivity$$.prototype.$getCssClass$ = function $$bitex$ui$AccountActivity$$$$$getCssClass$$() {
  return $bitex$ui$AccountActivity$CSS_CLASS$$
};
$bitex$ui$AccountActivity$$.prototype.$getRowClass$ = function $$bitex$ui$AccountActivity$$$$$getRowClass$$($row_set$$2$$) {
  var $class_status$$;
  switch($row_set$$2$$.Side) {
    case "1":
      $class_status$$ = $bitex$ui$AccountActivity$CSS_CLASS$$ + "-buy";
      break;
    case "2":
      $class_status$$ = $bitex$ui$AccountActivity$CSS_CLASS$$ + "-sell"
  }
  return $class_status$$
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$AccountActivity$CSS_CLASS$$, function() {
  return new $bitex$ui$AccountActivity$$
});
// Input 47
function $goog$async$Delay$$($listener$$61$$, $opt_interval$$1$$, $opt_handler$$16$$) {
  $goog$Disposable$$.call(this);
  this.$listener_$ = $listener$$61$$;
  this.$interval_$ = $opt_interval$$1$$ || 0;
  this.$handler_$ = $opt_handler$$16$$;
  this.$callback_$ = $goog$bind$$(this.$doAction_$, this)
}
$goog$inherits$$($goog$async$Delay$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$async$Delay$$.prototype;
$JSCompiler_prototypeAlias$$.$id_$ = 0;
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$async$Delay$$.$superClass_$.$disposeInternal$.call(this);
  this.stop();
  delete this.$listener_$;
  delete this.$handler_$
};
$JSCompiler_prototypeAlias$$.start = function $$JSCompiler_prototypeAlias$$$start$($opt_interval$$2$$) {
  this.stop();
  this.$id_$ = $goog$Timer$callOnce$$(this.$callback_$, $goog$isDef$$($opt_interval$$2$$) ? $opt_interval$$2$$ : this.$interval_$)
};
$JSCompiler_prototypeAlias$$.stop = function $$JSCompiler_prototypeAlias$$$stop$() {
  this.$isActive$() && $goog$global$$.clearTimeout(this.$id_$);
  this.$id_$ = 0
};
$JSCompiler_prototypeAlias$$.$isActive$ = function $$JSCompiler_prototypeAlias$$$$isActive$$() {
  return 0 != this.$id_$
};
$JSCompiler_prototypeAlias$$.$doAction_$ = function $$JSCompiler_prototypeAlias$$$$doAction_$$() {
  this.$id_$ = 0;
  this.$listener_$ && this.$listener_$.call(this.$handler_$)
};
// Input 48
// Input 49
// Input 50
var $goog$fx$anim$activeAnimations_$$ = {}, $goog$fx$anim$animationDelay_$$ = $JSCompiler_alias_NULL$$;
function $goog$fx$anim$unregisterAnimation$$($animation$$1_uid$$2$$) {
  $animation$$1_uid$$2$$ = $goog$getUid$$($animation$$1_uid$$2$$);
  delete $goog$fx$anim$activeAnimations_$$[$animation$$1_uid$$2$$];
  $goog$object$isEmpty$$() && $goog$fx$anim$animationDelay_$$ && $goog$fx$anim$animationDelay_$$.stop()
}
function $goog$fx$anim$requestAnimationFrame_$$() {
  $goog$fx$anim$animationDelay_$$ || ($goog$fx$anim$animationDelay_$$ = new $goog$async$Delay$$(function() {
    $goog$fx$anim$cycleAnimations_$$()
  }, 20));
  var $delay$$3$$ = $goog$fx$anim$animationDelay_$$;
  $delay$$3$$.$isActive$() || $delay$$3$$.start()
}
function $goog$fx$anim$cycleAnimations_$$() {
  var $now$$1$$ = $goog$now$$();
  $goog$object$forEach$$($goog$fx$anim$activeAnimations_$$, function($anim$$) {
    $JSCompiler_StaticMethods_cycle$$($anim$$, $now$$1$$)
  });
  $goog$object$isEmpty$$() || $goog$fx$anim$requestAnimationFrame_$$()
}
;
// Input 51
// Input 52
function $goog$fx$TransitionBase$$() {
  $goog$Disposable$$.call(this);
  this.$state_$ = $goog$fx$TransitionBase$State$STOPPED$$;
  this.$endTime$ = this.startTime = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($goog$fx$TransitionBase$$, $goog$events$EventTarget$$);
var $goog$fx$TransitionBase$State$STOPPED$$ = 0;
$goog$fx$TransitionBase$$.prototype.$onBegin$ = function $$goog$fx$TransitionBase$$$$$onBegin$$() {
  this.$dispatchAnimationEvent$("begin")
};
$goog$fx$TransitionBase$$.prototype.$onEnd$ = function $$goog$fx$TransitionBase$$$$$onEnd$$() {
  this.$dispatchAnimationEvent$("end")
};
$goog$fx$TransitionBase$$.prototype.$dispatchAnimationEvent$ = function $$goog$fx$TransitionBase$$$$$dispatchAnimationEvent$$($type$$94$$) {
  this.dispatchEvent($type$$94$$)
};
// Input 53
function $goog$fx$Animation$$($start$$9$$, $end$$4$$, $duration$$10$$, $opt_acc$$) {
  $goog$fx$TransitionBase$$.call(this);
  (!$goog$isArray$$($start$$9$$) || !$goog$isArray$$($end$$4$$)) && $JSCompiler_alias_THROW$$(Error("Start and end parameters must be arrays"));
  $start$$9$$.length != $end$$4$$.length && $JSCompiler_alias_THROW$$(Error("Start and end points must be the same length"));
  this.$startPoint$ = $start$$9$$;
  this.$endPoint$ = $end$$4$$;
  this.duration = $duration$$10$$;
  this.$accel_$ = $opt_acc$$;
  this.coords = [];
  this.$useRightPositioningForRtl_$ = $JSCompiler_alias_FALSE$$
}
$goog$inherits$$($goog$fx$Animation$$, $goog$fx$TransitionBase$$);
$JSCompiler_prototypeAlias$$ = $goog$fx$Animation$$.prototype;
$JSCompiler_prototypeAlias$$.$fps_$ = 0;
$JSCompiler_prototypeAlias$$.progress = 0;
$JSCompiler_prototypeAlias$$.$lastFrame$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.play = function $$JSCompiler_prototypeAlias$$$play$($now$$2_opt_restart$$) {
  if($now$$2_opt_restart$$ || this.$state_$ == $goog$fx$TransitionBase$State$STOPPED$$) {
    this.progress = 0, this.coords = this.$startPoint$
  }else {
    if(1 == this.$state_$) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  $goog$fx$anim$unregisterAnimation$$(this);
  this.startTime = $now$$2_opt_restart$$ = $goog$now$$();
  -1 == this.$state_$ && (this.startTime -= this.duration * this.progress);
  this.$endTime$ = this.startTime + this.duration;
  this.$lastFrame$ = this.startTime;
  this.progress || this.$onBegin$();
  this.$dispatchAnimationEvent$("play");
  -1 == this.$state_$ && this.$dispatchAnimationEvent$("resume");
  this.$state_$ = 1;
  var $uid$$inline_251$$ = $goog$getUid$$(this);
  $uid$$inline_251$$ in $goog$fx$anim$activeAnimations_$$ || ($goog$fx$anim$activeAnimations_$$[$uid$$inline_251$$] = this);
  $goog$fx$anim$requestAnimationFrame_$$();
  $JSCompiler_StaticMethods_cycle$$(this, $now$$2_opt_restart$$);
  return $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.stop = function $$JSCompiler_prototypeAlias$$$stop$($opt_gotoEnd$$) {
  $goog$fx$anim$unregisterAnimation$$(this);
  this.$state_$ = $goog$fx$TransitionBase$State$STOPPED$$;
  $opt_gotoEnd$$ && (this.progress = 1);
  $JSCompiler_StaticMethods_updateCoords_$$(this, this.progress);
  this.$dispatchAnimationEvent$("stop");
  this.$onEnd$()
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$state_$ == $goog$fx$TransitionBase$State$STOPPED$$ || this.stop($JSCompiler_alias_FALSE$$);
  this.$dispatchAnimationEvent$("destroy");
  $goog$fx$Animation$$.$superClass_$.$disposeInternal$.call(this)
};
function $JSCompiler_StaticMethods_cycle$$($JSCompiler_StaticMethods_cycle$self$$, $now$$5$$) {
  $JSCompiler_StaticMethods_cycle$self$$.progress = ($now$$5$$ - $JSCompiler_StaticMethods_cycle$self$$.startTime) / ($JSCompiler_StaticMethods_cycle$self$$.$endTime$ - $JSCompiler_StaticMethods_cycle$self$$.startTime);
  1 <= $JSCompiler_StaticMethods_cycle$self$$.progress && ($JSCompiler_StaticMethods_cycle$self$$.progress = 1);
  $JSCompiler_StaticMethods_cycle$self$$.$fps_$ = 1E3 / ($now$$5$$ - $JSCompiler_StaticMethods_cycle$self$$.$lastFrame$);
  $JSCompiler_StaticMethods_cycle$self$$.$lastFrame$ = $now$$5$$;
  $JSCompiler_StaticMethods_updateCoords_$$($JSCompiler_StaticMethods_cycle$self$$, $JSCompiler_StaticMethods_cycle$self$$.progress);
  1 == $JSCompiler_StaticMethods_cycle$self$$.progress ? ($JSCompiler_StaticMethods_cycle$self$$.$state_$ = $goog$fx$TransitionBase$State$STOPPED$$, $goog$fx$anim$unregisterAnimation$$($JSCompiler_StaticMethods_cycle$self$$), $JSCompiler_StaticMethods_cycle$self$$.$dispatchAnimationEvent$("finish"), $JSCompiler_StaticMethods_cycle$self$$.$onEnd$()) : 1 == $JSCompiler_StaticMethods_cycle$self$$.$state_$ && $JSCompiler_StaticMethods_cycle$self$$.$onAnimate$()
}
function $JSCompiler_StaticMethods_updateCoords_$$($JSCompiler_StaticMethods_updateCoords_$self$$, $t$$) {
  $goog$isFunction$$($JSCompiler_StaticMethods_updateCoords_$self$$.$accel_$) && ($t$$ = $JSCompiler_StaticMethods_updateCoords_$self$$.$accel_$($t$$));
  $JSCompiler_StaticMethods_updateCoords_$self$$.coords = Array($JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$.length);
  for(var $i$$111$$ = 0;$i$$111$$ < $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$.length;$i$$111$$++) {
    $JSCompiler_StaticMethods_updateCoords_$self$$.coords[$i$$111$$] = ($JSCompiler_StaticMethods_updateCoords_$self$$.$endPoint$[$i$$111$$] - $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$[$i$$111$$]) * $t$$ + $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$[$i$$111$$]
  }
}
$JSCompiler_prototypeAlias$$.$onAnimate$ = function $$JSCompiler_prototypeAlias$$$$onAnimate$$() {
  this.$dispatchAnimationEvent$("animate")
};
$JSCompiler_prototypeAlias$$.$dispatchAnimationEvent$ = function $$JSCompiler_prototypeAlias$$$$dispatchAnimationEvent$$($type$$95$$) {
  this.dispatchEvent(new $goog$fx$AnimationEvent$$($type$$95$$, this))
};
function $goog$fx$AnimationEvent$$($type$$96$$, $anim$$1$$) {
  $goog$events$Event$$.call(this, $type$$96$$);
  this.coords = $anim$$1$$.coords;
  this.x = $anim$$1$$.coords[0];
  this.y = $anim$$1$$.coords[1];
  this.$z$ = $anim$$1$$.coords[2];
  this.duration = $anim$$1$$.duration;
  this.progress = $anim$$1$$.progress;
  this.$fps$ = $anim$$1$$.$fps_$;
  this.state = $anim$$1$$.$state_$;
  this.$anim$ = $anim$$1$$
}
$goog$inherits$$($goog$fx$AnimationEvent$$, $goog$events$Event$$);
// Input 54
// Input 55
// Input 56
// Input 57
function $goog$fx$dom$PredefinedEffect$$($element$$84$$, $start$$10$$, $end$$5$$, $time$$, $opt_acc$$1$$) {
  $goog$fx$Animation$$.call(this, $start$$10$$, $end$$5$$, $time$$, $opt_acc$$1$$);
  this.element = $element$$84$$
}
$goog$inherits$$($goog$fx$dom$PredefinedEffect$$, $goog$fx$Animation$$);
$JSCompiler_prototypeAlias$$ = $goog$fx$dom$PredefinedEffect$$.prototype;
$JSCompiler_prototypeAlias$$.$updateStyle$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$isRightToLeft$$() {
  $goog$isDef$$(this.$rightToLeft_$) || (this.$rightToLeft_$ = $goog$style$isRightToLeft$$(this.element));
  return this.$rightToLeft_$
};
$JSCompiler_prototypeAlias$$.$onAnimate$ = function $$JSCompiler_prototypeAlias$$$$onAnimate$$() {
  this.$updateStyle$();
  $goog$fx$dom$PredefinedEffect$$.$superClass_$.$onAnimate$.call(this)
};
$JSCompiler_prototypeAlias$$.$onEnd$ = function $$JSCompiler_prototypeAlias$$$$onEnd$$() {
  this.$updateStyle$();
  $goog$fx$dom$PredefinedEffect$$.$superClass_$.$onEnd$.call(this)
};
$JSCompiler_prototypeAlias$$.$onBegin$ = function $$JSCompiler_prototypeAlias$$$$onBegin$$() {
  this.$updateStyle$();
  $goog$fx$dom$PredefinedEffect$$.$superClass_$.$onBegin$.call(this)
};
function $goog$fx$dom$Fade$$($element$$92$$, $start$$18$$, $end$$13$$, $time$$8$$, $opt_acc$$9$$) {
  $goog$isNumber$$($start$$18$$) && ($start$$18$$ = [$start$$18$$]);
  $goog$isNumber$$($end$$13$$) && ($end$$13$$ = [$end$$13$$]);
  $goog$fx$dom$PredefinedEffect$$.call(this, $element$$92$$, $start$$18$$, $end$$13$$, $time$$8$$, $opt_acc$$9$$);
  (1 != $start$$18$$.length || 1 != $end$$13$$.length) && $JSCompiler_alias_THROW$$(Error("Start and end points must be 1D"))
}
$goog$inherits$$($goog$fx$dom$Fade$$, $goog$fx$dom$PredefinedEffect$$);
$goog$fx$dom$Fade$$.prototype.$updateStyle$ = function $$goog$fx$dom$Fade$$$$$updateStyle$$() {
  $goog$style$setOpacity$$(this.element, this.coords[0])
};
$goog$fx$dom$Fade$$.prototype.show = function $$goog$fx$dom$Fade$$$$show$() {
  this.element.style.display = ""
};
$goog$fx$dom$Fade$$.prototype.hide = function $$goog$fx$dom$Fade$$$$hide$() {
  this.element.style.display = "none"
};
function $goog$fx$dom$FadeOutAndHide$$($element$$95$$, $time$$11$$, $opt_acc$$12$$) {
  $goog$fx$dom$Fade$$.call(this, $element$$95$$, 1, 0, $time$$11$$, $opt_acc$$12$$)
}
$goog$inherits$$($goog$fx$dom$FadeOutAndHide$$, $goog$fx$dom$Fade$$);
$goog$fx$dom$FadeOutAndHide$$.prototype.$onBegin$ = function $$goog$fx$dom$FadeOutAndHide$$$$$onBegin$$() {
  this.show();
  $goog$fx$dom$FadeOutAndHide$$.$superClass_$.$onBegin$.call(this)
};
$goog$fx$dom$FadeOutAndHide$$.prototype.$onEnd$ = function $$goog$fx$dom$FadeOutAndHide$$$$$onEnd$$() {
  this.hide();
  $goog$fx$dom$FadeOutAndHide$$.$superClass_$.$onEnd$.call(this)
};
// Input 58
function $bitex$model$Model$$($element$$100$$, $opt_map$$1$$, $var_args$$82$$) {
  this.$element_$ = $element$$100$$;
  this.$map_$ = new $goog$structs$Map$$($opt_map$$1$$, $var_args$$82$$)
}
$goog$inherits$$($bitex$model$Model$$, $goog$events$EventTarget$$);
$bitex$model$Model$$.prototype.get = function $$bitex$model$Model$$$$get$($key$$71$$, $opt_val$$2$$) {
  return this.$map_$.get($key$$71$$, $opt_val$$2$$)
};
function $JSCompiler_StaticMethods_updateDom$$($JSCompiler_StaticMethods_updateDom$self_elements$$3$$) {
  $JSCompiler_StaticMethods_updateDom$self_elements$$3$$ = $goog$dom$getElementsByClass$$("bitex-model", $JSCompiler_StaticMethods_updateDom$self_elements$$3$$.$element_$);
  $goog$array$forEach$$($JSCompiler_StaticMethods_updateDom$self_elements$$3$$, function($el$$43$$) {
    if($el$$43$$.getAttribute("data-model-key") != $JSCompiler_alias_NULL$$) {
      var $current_value$$ = $goog$dom$getTextContent$$($el$$43$$);
      $goog$dom$setTextContent$$($el$$43$$, $current_value$$)
    }
  })
}
$bitex$model$Model$$.prototype.set = function $$bitex$model$Model$$$$set$($key$$72$$, $value$$89$$) {
  this.$map_$.set($key$$72$$, $value$$89$$);
  var $elements$$4$$ = $goog$dom$getElementsByClass$$("bitex-model", this.$element_$);
  $goog$array$forEach$$($elements$$4$$, function($el$$44$$) {
    if($el$$44$$.getAttribute("data-model-key") === $key$$72$$ && $goog$dom$getTextContent$$($el$$44$$) !== $value$$89$$) {
      $goog$dom$setTextContent$$($el$$44$$, $value$$89$$);
      var $blink_class$$1$$ = $el$$44$$.getAttribute("data-blink-class");
      if($blink_class$$1$$ != $JSCompiler_alias_NULL$$) {
        var $blink_delay$$ = $el$$44$$.getAttribute("data-blink-delay") || 700, $blink_delay$$ = parseInt($blink_delay$$, 10);
        $goog$dom$classes$add$$($el$$44$$, $blink_class$$1$$);
        $goog$Timer$callOnce$$(function() {
          $goog$dom$classes$remove$$($el$$44$$, $blink_class$$1$$)
        }, $blink_delay$$, this)
      }
    }
  });
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set" + $key$$72$$, $key$$72$$, $value$$89$$));
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set", $key$$72$$, $value$$89$$))
};
function $bitex$model$ModelEvent$$($type$$97$$, $key$$73$$, $data$$32$$) {
  $goog$events$Event$$.call(this, $type$$97$$);
  this.key = $key$$73$$;
  this.data = $data$$32$$
}
$goog$inherits$$($bitex$model$ModelEvent$$, $goog$events$Event$$);
// Input 59
function $bitex$util$getFormAsJSON$$($element$$101$$) {
  for(var $json_res$$ = {}, $el$$45_form_value_values$$13$$, $i$$115$$ = 0;$el$$45_form_value_values$$13$$ = $element$$101$$.elements[$i$$115$$];$i$$115$$++) {
    if(!($el$$45_form_value_values$$13$$.disabled || "fieldset" == $el$$45_form_value_values$$13$$.tagName.toLowerCase())) {
      var $name$$72$$ = $el$$45_form_value_values$$13$$.name;
      if(!$goog$string$isEmpty$$($name$$72$$)) {
        switch($el$$45_form_value_values$$13$$.type.toLowerCase()) {
          case "file":
          ;
          case "submit":
          ;
          case "reset":
          ;
          case "button":
            break;
          case "select-multiple":
            $el$$45_form_value_values$$13$$ = $goog$dom$forms$getValue$$($el$$45_form_value_values$$13$$);
            if($el$$45_form_value_values$$13$$ != $JSCompiler_alias_NULL$$) {
              $json_res$$[$name$$72$$] = [];
              for(var $value$$90$$, $j$$9$$ = 0;$value$$90$$ = $el$$45_form_value_values$$13$$[$j$$9$$];$j$$9$$++) {
                $json_res$$[$name$$72$$].push($value$$90$$)
              }
            }
            break;
          default:
            $el$$45_form_value_values$$13$$ = $goog$dom$forms$getValue$$($el$$45_form_value_values$$13$$), $el$$45_form_value_values$$13$$ != $JSCompiler_alias_NULL$$ && ($json_res$$[$name$$72$$] = $el$$45_form_value_values$$13$$)
        }
      }
    }
  }
  return $json_res$$
}
function $bitex$util$getCountries$$() {
  return{AF:"Afghanistan", AX:"\u00c5land Islands", AL:"Albania", DZ:"Algeria", AS:"American Samoa", AD:"Andorra", AO:"Angola", AI:"Anguilla", AQ:"Antarctica", AG:"Antigua and Barbuda", AR:"Argentina", AM:"Armenia", AW:"Aruba", AC:"Ascension Island", AU:"Australia", AT:"Austria", AZ:"Azerbaijan", BS:"Bahamas", BH:"Bahrain", BD:"Bangladesh", BB:"Barbados", BY:"Belarus", BE:"Belgium", BZ:"Belize", BJ:"Benin", BM:"Bermuda", BT:"Bhutan", BO:"Bolivia", BQ:"Bonaire, Sint Eustatius, and Saba", BA:"Bosnia and Herzegovina", 
  BW:"Botswana", BV:"Bouvet Island", BR:"Brazil", IO:"British Indian Ocean Territory", VG:"British Virgin Islands", BN:"Brunei", BG:"Bulgaria", BF:"Burkina Faso", BI:"Burundi", KH:"Cambodia", CM:"Cameroon", CA:"Canada", IC:"Canary Islands", CV:"Cape Verde", KY:"Cayman Islands", CF:"Central African Republic", EA:"Ceuta and Melilla", TD:"Chad", CL:"Chile", CN:"China", CX:"Christmas Island", CP:"Clipperton Island", CC:"Cocos [Keeling] Islands", CO:"Colombia", KM:"Comoros", CG:"Congo - Brazzaville", 
  CD:"Congo - Kinshasa", CK:"Cook Islands", CR:"Costa Rica", CI:"C\u00f4te d\u2019Ivoire", HR:"Croatia", CU:"Cuba", CW:"Cura\u00e7ao", CY:"Cyprus", CZ:"Czech Republic", DK:"Denmark", DG:"Diego Garcia", DJ:"Djibouti", DM:"Dominica", DO:"Dominican Republic", EC:"Ecuador", EG:"Egypt", SV:"El Salvador", GQ:"Equatorial Guinea", ER:"Eritrea", EE:"Estonia", ET:"Ethiopia", EU:"European Union", FK:"Falkland Islands", FO:"Faroe Islands", FJ:"Fiji", FI:"Finland", FR:"France", GF:"French Guiana", PF:"French Polynesia", 
  TF:"French Southern Territories", GA:"Gabon", GM:"Gambia", GE:"Georgia", DE:"Germany", GH:"Ghana", GI:"Gibraltar", GR:"Greece", GL:"Greenland", GD:"Grenada", GP:"Guadeloupe", GU:"Guam", GT:"Guatemala", GG:"Guernsey", GN:"Guinea", GW:"Guinea-Bissau", GY:"Guyana", HT:"Haiti", HM:"Heard Island and McDonald Islands", HN:"Honduras", HK:"Hong Kong SAR China", HU:"Hungary", IS:"Iceland", IN:"India", ID:"Indonesia", IR:"Iran", IQ:"Iraq", IE:"Ireland", IM:"Isle of Man", IL:"Israel", IT:"Italy", JM:"Jamaica", 
  JP:"Japan", JE:"Jersey", JO:"Jordan", KZ:"Kazakhstan", KE:"Kenya", KI:"Kiribati", KW:"Kuwait", KG:"Kyrgyzstan", LA:"Laos", LV:"Latvia", LB:"Lebanon", LS:"Lesotho", LR:"Liberia", LY:"Libya", LI:"Liechtenstein", LT:"Lithuania", LU:"Luxembourg", MO:"Macau SAR China", MK:"Macedonia", MG:"Madagascar", MW:"Malawi", MY:"Malaysia", MV:"Maldives", ML:"Mali", MT:"Malta", MH:"Marshall Islands", MQ:"Martinique", MR:"Mauritania", MU:"Mauritius", YT:"Mayotte", MX:"Mexico", FM:"Micronesia", MD:"Moldova", MC:"Monaco", 
  MN:"Mongolia", ME:"Montenegro", MS:"Montserrat", MA:"Morocco", MZ:"Mozambique", MM:"Myanmar [Burma]", NA:"Namibia", NR:"Nauru", NP:"Nepal", NL:"Netherlands", AN:"Netherlands Antilles", NC:"New Caledonia", NZ:"New Zealand", NI:"Nicaragua", NE:"Niger", NG:"Nigeria", NU:"Niue", NF:"Norfolk Island", KP:"North Korea", MP:"Northern Mariana Islands", NO:"Norway", OM:"Oman", QO:"Outlying Oceania", PK:"Pakistan", PW:"Palau", PS:"Palestinian Territories", PA:"Panama", PG:"Papua New Guinea", PY:"Paraguay", 
  PE:"Peru", PH:"Philippines", PN:"Pitcairn Islands", PL:"Poland", PT:"Portugal", PR:"Puerto Rico", QA:"Qatar", RE:"R\u00e9union", RO:"Romania", RU:"Russia", RW:"Rwanda", BL:"Saint Barth\u00e9lemy", SH:"Saint Helena", KN:"Saint Kitts and Nevis", LC:"Saint Lucia", MF:"Saint Martin", PM:"Saint Pierre and Miquelon", VC:"Saint Vincent and the Grenadines", WS:"Samoa", SM:"San Marino", ST:"S\u00e3o Tom\u00e9 and Pr\u00edncipe", SA:"Saudi Arabia", SN:"Senegal", RS:"Serbia", CS:"Serbia and Montenegro", SC:"Seychelles", 
  SL:"Sierra Leone", SG:"Singapore", SX:"Sint Maarten", SK:"Slovakia", SI:"Slovenia", SB:"Solomon Islands", SO:"Somalia", ZA:"South Africa", GS:"South Georgia and the South Sandwich Islands", KR:"South Korea", SS:"South Sudan", ES:"Spain", LK:"Sri Lanka", SD:"Sudan", SR:"Suriname", SJ:"Svalbard and Jan Mayen", SZ:"Swaziland", SE:"Sweden", CH:"Switzerland", SY:"Syria", TW:"Taiwan", TJ:"Tajikistan", TZ:"Tanzania", TH:"Thailand", TL:"Timor-Leste", TG:"Togo", TK:"Tokelau", TO:"Tonga", TT:"Trinidad and Tobago", 
  TA:"Tristan da Cunha", TN:"Tunisia", TR:"Turkey", TM:"Turkmenistan", TC:"Turks and Caicos Islands", TV:"Tuvalu", UM:"U.S. Minor Outlying Islands", VI:"U.S. Virgin Islands", UG:"Uganda", UA:"Ukraine", AE:"United Arab Emirates", GB:"United Kingdom", US:["United States", "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VE|VA|WA|WV|WI|WY", "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming"], 
  UY:"Uruguay", UZ:"Uzbekistan", VU:"Vanuatu", VA:"Vatican City", VE:"Venezuela", VN:"Vietnam", WF:"Wallis and Futuna", EH:"Western Sahara", YE:"Yemen", ZM:"Zambia", ZW:"Zimbabwe"}
}
;
// Input 60
// Input 61
// Input 62
function $goog$structs$Set$$($opt_values$$1$$) {
  this.$map_$ = new $goog$structs$Map$$;
  $opt_values$$1$$ && this.$addAll$($opt_values$$1$$)
}
function $goog$structs$Set$getKey_$$($val$$32$$) {
  var $type$$99$$ = typeof $val$$32$$;
  return"object" == $type$$99$$ && $val$$32$$ || "function" == $type$$99$$ ? "o" + $goog$getUid$$($val$$32$$) : $type$$99$$.substr(0, 1) + $val$$32$$
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Set$$.prototype;
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($element$$102$$) {
  this.$map_$.set($goog$structs$Set$getKey_$$($element$$102$$), $element$$102$$)
};
$JSCompiler_prototypeAlias$$.$addAll$ = function $$JSCompiler_prototypeAlias$$$$addAll$$($col$$15_values$$14$$) {
  $col$$15_values$$14$$ = $goog$structs$getValues$$($col$$15_values$$14$$);
  for(var $l$$22$$ = $col$$15_values$$14$$.length, $i$$116$$ = 0;$i$$116$$ < $l$$22$$;$i$$116$$++) {
    this.add($col$$15_values$$14$$[$i$$116$$])
  }
};
$JSCompiler_prototypeAlias$$.$removeAll$ = function $$JSCompiler_prototypeAlias$$$$removeAll$$($col$$16_values$$15$$) {
  $col$$16_values$$15$$ = $goog$structs$getValues$$($col$$16_values$$15$$);
  for(var $l$$23$$ = $col$$16_values$$15$$.length, $i$$117$$ = 0;$i$$117$$ < $l$$23$$;$i$$117$$++) {
    this.remove($col$$16_values$$15$$[$i$$117$$])
  }
};
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($element$$103$$) {
  return this.$map_$.remove($goog$structs$Set$getKey_$$($element$$103$$))
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$.clear()
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($element$$104_key$$inline_264$$) {
  $element$$104_key$$inline_264$$ = $goog$structs$Set$getKey_$$($element$$104_key$$inline_264$$);
  return $goog$structs$Map$hasKey_$$(this.$map_$.$map_$, $element$$104_key$$inline_264$$)
};
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  return this.$map_$.$getValues$()
};
// Input 63
function $goog$debug$deepExpose$$($obj$$95$$) {
  function $helper$$($obj$$96$$, $space$$) {
    var $nestspace$$ = $space$$ + "  ";
    try {
      if($goog$isDef$$($obj$$96$$)) {
        if($obj$$96$$ === $JSCompiler_alias_NULL$$) {
          $str$$56$$.push("NULL")
        }else {
          if($goog$isString$$($obj$$96$$)) {
            $str$$56$$.push('"' + $obj$$96$$.replace(/\n/g, "\n" + $space$$) + '"')
          }else {
            if($goog$isFunction$$($obj$$96$$)) {
              $str$$56$$.push(String($obj$$96$$).replace(/\n/g, "\n" + $space$$))
            }else {
              if($goog$isObject$$($obj$$96$$)) {
                if($previous$$.contains($obj$$96$$)) {
                  $str$$56$$.push("*** reference loop detected ***")
                }else {
                  $previous$$.add($obj$$96$$);
                  $str$$56$$.push("{");
                  for(var $x$$67$$ in $obj$$96$$) {
                    $goog$isFunction$$($obj$$96$$[$x$$67$$]) || ($str$$56$$.push("\n"), $str$$56$$.push($nestspace$$), $str$$56$$.push($x$$67$$ + " = "), $helper$$($obj$$96$$[$x$$67$$], $nestspace$$))
                  }
                  $str$$56$$.push("\n" + $space$$ + "}")
                }
              }else {
                $str$$56$$.push($obj$$96$$)
              }
            }
          }
        }
      }else {
        $str$$56$$.push("undefined")
      }
    }catch($e$$38$$) {
      $str$$56$$.push("*** " + $e$$38$$ + " ***")
    }
  }
  var $previous$$ = new $goog$structs$Set$$, $str$$56$$ = [];
  $helper$$($obj$$95$$, "");
  return $str$$56$$.join("")
}
function $goog$debug$getStacktrace$$($opt_fn$$8$$) {
  return $goog$debug$getStacktraceHelper_$$($opt_fn$$8$$ || arguments.callee.caller, [])
}
function $goog$debug$getStacktraceHelper_$$($fn$$8$$, $visited$$) {
  var $sb$$5$$ = [];
  if($goog$array$contains$$($visited$$, $fn$$8$$)) {
    $sb$$5$$.push("[...circular reference...]")
  }else {
    if($fn$$8$$ && 50 > $visited$$.length) {
      $sb$$5$$.push($goog$debug$getFunctionName$$($fn$$8$$) + "(");
      for(var $args$$12$$ = $fn$$8$$.arguments, $i$$120$$ = 0;$i$$120$$ < $args$$12$$.length;$i$$120$$++) {
        0 < $i$$120$$ && $sb$$5$$.push(", ");
        var $arg$$6_argDesc$$;
        $arg$$6_argDesc$$ = $args$$12$$[$i$$120$$];
        switch(typeof $arg$$6_argDesc$$) {
          case "object":
            $arg$$6_argDesc$$ = $arg$$6_argDesc$$ ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            $arg$$6_argDesc$$ = String($arg$$6_argDesc$$);
            break;
          case "boolean":
            $arg$$6_argDesc$$ = $arg$$6_argDesc$$ ? "true" : "false";
            break;
          case "function":
            $arg$$6_argDesc$$ = ($arg$$6_argDesc$$ = $goog$debug$getFunctionName$$($arg$$6_argDesc$$)) ? $arg$$6_argDesc$$ : "[fn]";
            break;
          default:
            $arg$$6_argDesc$$ = typeof $arg$$6_argDesc$$
        }
        40 < $arg$$6_argDesc$$.length && ($arg$$6_argDesc$$ = $arg$$6_argDesc$$.substr(0, 40) + "...");
        $sb$$5$$.push($arg$$6_argDesc$$)
      }
      $visited$$.push($fn$$8$$);
      $sb$$5$$.push(")\n");
      try {
        $sb$$5$$.push($goog$debug$getStacktraceHelper_$$($fn$$8$$.caller, $visited$$))
      }catch($e$$43$$) {
        $sb$$5$$.push("[exception trying to get caller]\n")
      }
    }else {
      $fn$$8$$ ? $sb$$5$$.push("[...long stack...]") : $sb$$5$$.push("[end]")
    }
  }
  return $sb$$5$$.join("")
}
function $goog$debug$getFunctionName$$($fn$$9_functionSource$$) {
  if($goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]) {
    return $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]
  }
  $fn$$9_functionSource$$ = String($fn$$9_functionSource$$);
  if(!$goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]) {
    var $matches$$1$$ = /function ([^\(]+)/.exec($fn$$9_functionSource$$);
    $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$] = $matches$$1$$ ? $matches$$1$$[1] : "[Anonymous]"
  }
  return $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]
}
var $goog$debug$fnNameCache_$$ = {};
// Input 64
function $goog$debug$LogRecord$$($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  this.reset($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$)
}
$goog$debug$LogRecord$$.prototype.$sequenceNumber_$ = 0;
$goog$debug$LogRecord$$.prototype.$exception_$ = $JSCompiler_alias_NULL$$;
$goog$debug$LogRecord$$.prototype.$exceptionText_$ = $JSCompiler_alias_NULL$$;
var $goog$debug$LogRecord$nextSequenceNumber_$$ = 0;
$goog$debug$LogRecord$$.prototype.reset = function $$goog$debug$LogRecord$$$$reset$($level$$8$$, $msg$$1$$, $loggerName$$1$$, $opt_time$$1$$, $opt_sequenceNumber$$1$$) {
  this.$sequenceNumber_$ = "number" == typeof $opt_sequenceNumber$$1$$ ? $opt_sequenceNumber$$1$$ : $goog$debug$LogRecord$nextSequenceNumber_$$++;
  this.$time_$ = $opt_time$$1$$ || $goog$now$$();
  this.$level_$ = $level$$8$$;
  this.$msg_$ = $msg$$1$$;
  this.$loggerName_$ = $loggerName$$1$$;
  delete this.$exception_$;
  delete this.$exceptionText_$
};
$goog$debug$LogRecord$$.prototype.$setLevel$ = $JSCompiler_set$$("$level_$");
// Input 65
// Input 66
function $goog$debug$Logger$$($name$$74$$) {
  this.$name_$ = $name$$74$$
}
$goog$debug$Logger$$.prototype.$parent_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$level_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$children_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$handlers_$ = $JSCompiler_alias_NULL$$;
function $goog$debug$Logger$Level$$($name$$75$$, $value$$93$$) {
  this.name = $name$$75$$;
  this.value = $value$$93$$
}
$goog$debug$Logger$Level$$.prototype.toString = $JSCompiler_get$$("name");
var $goog$debug$Logger$Level$SEVERE$$ = new $goog$debug$Logger$Level$$("SEVERE", 1E3), $goog$debug$Logger$Level$INFO$$ = new $goog$debug$Logger$Level$$("INFO", 800), $goog$debug$Logger$Level$CONFIG$$ = new $goog$debug$Logger$Level$$("CONFIG", 700);
$JSCompiler_prototypeAlias$$ = $goog$debug$Logger$$.prototype;
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$parent_$");
$JSCompiler_prototypeAlias$$.$getChildren$ = function $$JSCompiler_prototypeAlias$$$$getChildren$$() {
  this.$children_$ || (this.$children_$ = {});
  return this.$children_$
};
$JSCompiler_prototypeAlias$$.$setLevel$ = $JSCompiler_set$$("$level_$");
function $JSCompiler_StaticMethods_getEffectiveLevel$$($JSCompiler_StaticMethods_getEffectiveLevel$self$$) {
  return $JSCompiler_StaticMethods_getEffectiveLevel$self$$.$level_$ ? $JSCompiler_StaticMethods_getEffectiveLevel$self$$.$level_$ : $JSCompiler_StaticMethods_getEffectiveLevel$self$$.$parent_$ ? $JSCompiler_StaticMethods_getEffectiveLevel$$($JSCompiler_StaticMethods_getEffectiveLevel$self$$.$parent_$) : $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.log = function $$JSCompiler_prototypeAlias$$$log$($level$$15_logRecord$$inline_267$$, $msg$$5_msg$$inline_951_target$$inline_268$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_953_opt_exception$$) {
  if($level$$15_logRecord$$inline_267$$.value >= $JSCompiler_StaticMethods_getEffectiveLevel$$(this).value) {
    $level$$15_logRecord$$inline_267$$ = this.$getLogRecord$($level$$15_logRecord$$inline_267$$, $msg$$5_msg$$inline_951_target$$inline_268$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_953_opt_exception$$);
    $msg$$5_msg$$inline_951_target$$inline_268$$ = "log:" + $level$$15_logRecord$$inline_267$$.$msg_$;
    $goog$global$$.console && ($goog$global$$.console.timeStamp ? $goog$global$$.console.timeStamp($msg$$5_msg$$inline_951_target$$inline_268$$) : $goog$global$$.console.markTimeline && $goog$global$$.console.markTimeline($msg$$5_msg$$inline_951_target$$inline_268$$));
    $goog$global$$.msWriteProfilerMark && $goog$global$$.msWriteProfilerMark($msg$$5_msg$$inline_951_target$$inline_268$$);
    for($msg$$5_msg$$inline_951_target$$inline_268$$ = this;$msg$$5_msg$$inline_951_target$$inline_268$$;) {
      $JSCompiler_StaticMethods_callPublish_$self$$inline_953_opt_exception$$ = $msg$$5_msg$$inline_951_target$$inline_268$$;
      var $logRecord$$inline_954$$ = $level$$15_logRecord$$inline_267$$;
      if($JSCompiler_StaticMethods_callPublish_$self$$inline_953_opt_exception$$.$handlers_$) {
        for(var $i$$inline_955$$ = 0, $handler$$inline_956$$ = $JSCompiler_alias_VOID$$;$handler$$inline_956$$ = $JSCompiler_StaticMethods_callPublish_$self$$inline_953_opt_exception$$.$handlers_$[$i$$inline_955$$];$i$$inline_955$$++) {
          $handler$$inline_956$$($logRecord$$inline_954$$)
        }
      }
      $msg$$5_msg$$inline_951_target$$inline_268$$ = $msg$$5_msg$$inline_951_target$$inline_268$$.getParent()
    }
  }
};
$JSCompiler_prototypeAlias$$.$getLogRecord$ = function $$JSCompiler_prototypeAlias$$$$getLogRecord$$($level$$16$$, $msg$$6$$, $opt_exception$$1$$) {
  var $logRecord$$ = new $goog$debug$LogRecord$$($level$$16$$, String($msg$$6$$), this.$name_$);
  if($opt_exception$$1$$) {
    $logRecord$$.$exception_$ = $opt_exception$$1$$;
    var $JSCompiler_inline_result$$16$$;
    var $opt_fn$$inline_282$$ = arguments.callee.caller;
    try {
      var $e$$inline_283$$;
      var $href$$inline_959$$ = $goog$getObjectByName$$("window.location.href");
      if($goog$isString$$($opt_exception$$1$$)) {
        $e$$inline_283$$ = {message:$opt_exception$$1$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$inline_959$$, stack:"Not available"}
      }else {
        var $lineNumber$$inline_960$$, $fileName$$inline_961$$, $threwError$$inline_962$$ = $JSCompiler_alias_FALSE$$;
        try {
          $lineNumber$$inline_960$$ = $opt_exception$$1$$.lineNumber || $opt_exception$$1$$.$line$ || "Not available"
        }catch($e$$inline_963$$) {
          $lineNumber$$inline_960$$ = "Not available", $threwError$$inline_962$$ = $JSCompiler_alias_TRUE$$
        }
        try {
          $fileName$$inline_961$$ = $opt_exception$$1$$.fileName || $opt_exception$$1$$.filename || $opt_exception$$1$$.sourceURL || $goog$global$$.$googDebugFname || $href$$inline_959$$
        }catch($e$$inline_964$$) {
          $fileName$$inline_961$$ = "Not available", $threwError$$inline_962$$ = $JSCompiler_alias_TRUE$$
        }
        $e$$inline_283$$ = $threwError$$inline_962$$ || !$opt_exception$$1$$.lineNumber || !$opt_exception$$1$$.fileName || !$opt_exception$$1$$.stack ? {message:$opt_exception$$1$$.message, name:$opt_exception$$1$$.name, lineNumber:$lineNumber$$inline_960$$, fileName:$fileName$$inline_961$$, stack:$opt_exception$$1$$.stack || "Not available"} : $opt_exception$$1$$
      }
      $JSCompiler_inline_result$$16$$ = "Message: " + $goog$string$htmlEscape$$($e$$inline_283$$.message) + '\nUrl: <a href="view-source:' + $e$$inline_283$$.fileName + '" target="_new">' + $e$$inline_283$$.fileName + "</a>\nLine: " + $e$$inline_283$$.lineNumber + "\n\nBrowser stack:\n" + $goog$string$htmlEscape$$($e$$inline_283$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + $goog$string$htmlEscape$$($goog$debug$getStacktrace$$($opt_fn$$inline_282$$) + "-> ")
    }catch($e2$$inline_284$$) {
      $JSCompiler_inline_result$$16$$ = "Exception trying to expose exception! You win, we lose. " + $e2$$inline_284$$
    }
    $logRecord$$.$exceptionText_$ = $JSCompiler_inline_result$$16$$
  }
  return $logRecord$$
};
$JSCompiler_prototypeAlias$$.info = function $$JSCompiler_prototypeAlias$$$info$($msg$$10$$, $opt_exception$$5$$) {
  this.log($goog$debug$Logger$Level$INFO$$, $msg$$10$$, $opt_exception$$5$$)
};
var $goog$debug$LogManager$loggers_$$ = {}, $goog$debug$LogManager$rootLogger_$$ = $JSCompiler_alias_NULL$$;
function $goog$debug$LogManager$getLogger$$($name$$79$$) {
  $goog$debug$LogManager$rootLogger_$$ || ($goog$debug$LogManager$rootLogger_$$ = new $goog$debug$Logger$$(""), $goog$debug$LogManager$loggers_$$[""] = $goog$debug$LogManager$rootLogger_$$, $goog$debug$LogManager$rootLogger_$$.$setLevel$($goog$debug$Logger$Level$CONFIG$$));
  var $JSCompiler_temp$$2_logger$$inline_291$$;
  if(!($JSCompiler_temp$$2_logger$$inline_291$$ = $goog$debug$LogManager$loggers_$$[$name$$79$$])) {
    $JSCompiler_temp$$2_logger$$inline_291$$ = new $goog$debug$Logger$$($name$$79$$);
    var $lastDotIndex$$inline_292_parentLogger$$inline_294$$ = $name$$79$$.lastIndexOf("."), $leafName$$inline_293$$ = $name$$79$$.substr($lastDotIndex$$inline_292_parentLogger$$inline_294$$ + 1), $lastDotIndex$$inline_292_parentLogger$$inline_294$$ = $goog$debug$LogManager$getLogger$$($name$$79$$.substr(0, $lastDotIndex$$inline_292_parentLogger$$inline_294$$));
    $lastDotIndex$$inline_292_parentLogger$$inline_294$$.$getChildren$()[$leafName$$inline_293$$] = $JSCompiler_temp$$2_logger$$inline_291$$;
    $JSCompiler_temp$$2_logger$$inline_291$$.$parent_$ = $lastDotIndex$$inline_292_parentLogger$$inline_294$$;
    $goog$debug$LogManager$loggers_$$[$name$$79$$] = $JSCompiler_temp$$2_logger$$inline_291$$
  }
  return $JSCompiler_temp$$2_logger$$inline_291$$
}
;
// Input 67
function $bitex$view$View$$($app$$, $opt_domHelper$$5$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$5$$);
  this.$app_$ = $app$$
}
$goog$inherits$$($bitex$view$View$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$View$$.prototype;
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("bitex-view");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  return this.$getDomHelper$().$createDom$("div", this.$getCssClass$())
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$105$$) {
  $bitex$view$View$$.$superClass_$.$decorateInternal$.call(this, $element$$105$$);
  this.$getDomHelper$();
  return $element$$105$$
};
$JSCompiler_prototypeAlias$$.$enterView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$exitView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$logger_$ = $goog$debug$LogManager$getLogger$$("bitex.view.View");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$View$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$goog$ui$registry$setDecoratorByClassName$$("bitex-view", function() {
  return new $bitex$view$View$$
});
// Input 68
function $bitex$view$SignupView$$($app$$1$$, $opt_domHelper$$6$$) {
  $bitex$view$View$$.call(this, $app$$1$$, $opt_domHelper$$6$$)
}
$goog$inherits$$($bitex$view$SignupView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$SignupView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$SignupView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$48$$ = this.$getHandler$(), $signup_country_el$$ = $goog$dom$getElement$$("id_signup_country"), $signup_state_el$$ = $goog$dom$getElement$$("id_signup_state");
  $goog$object$forEach$$($bitex$util$getCountries$$(), function($country_info$$, $country_code$$) {
    var $country_el$$46$$ = $country_info$$;
    $goog$isArrayLike$$($country_el$$46$$) && ($country_el$$46$$ = $country_el$$46$$[0]);
    $country_el$$46$$ = $goog$dom$createDom$$("option", {value:$country_code$$}, $country_el$$46$$);
    $signup_country_el$$.appendChild($country_el$$46$$)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, $signup_country_el$$, "change", this.$onChangeCountry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, $signup_state_el$$, "change", this.$onChangeState_$);
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, this.$app_$.$model_$, "model_setBrokerList", this.$onBrokerList_$);
  var $button_signup$$ = new $goog$ui$Button$$;
  $button_signup$$.$decorate$($goog$dom$getElement$$("id_btn_signup"));
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, $goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$44$$) {
    $button_signup$$.$setEnabled$($e$$44$$.target.checked)
  });
  this.$onBrokerList_$();
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, $button_signup$$, "action", this.$onSignupButtonClick_$)
};
$JSCompiler_prototypeAlias$$.$getUsername$ = function $$JSCompiler_prototypeAlias$$$$getUsername$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username"))
};
$JSCompiler_prototypeAlias$$.$getEmail$ = function $$JSCompiler_prototypeAlias$$$$getEmail$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email"))
};
$JSCompiler_prototypeAlias$$.$getPassword$ = function $$JSCompiler_prototypeAlias$$$$getPassword$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password"))
};
$JSCompiler_prototypeAlias$$.$getState$ = function $$JSCompiler_prototypeAlias$$$$getState$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state"))
};
$JSCompiler_prototypeAlias$$.$onSignupButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onSignupButtonClick_$$($e$$45_username$$) {
  $e$$45_username$$.stopPropagation();
  $e$$45_username$$.preventDefault();
  $e$$45_username$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username"));
  var $email$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email")), $password$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password")), $password2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password2"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker"));
  $goog$string$isEmpty$$($e$$45_username$$) || /[^a-zA-Z0-9]/.test($e$$45_username$$) ? this.$app_$.$showErrorDialog$("Nome de usu\u00e1rio inv\u00e1lido") : $email$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? $goog$string$isEmpty$$($password$$) || 8 > $password$$.length ? this.$app_$.$showErrorDialog$("A senha precisa ter no m\u00ednimo 8 letras") : $password$$ !== $password2$$ ? this.$app_$.$showErrorDialog$("As senhas n\u00e3o conferem") : this.dispatchEvent("signup_click") : 
  this.$app_$.$showErrorDialog$("Email inv\u00e1lido")
};
$JSCompiler_prototypeAlias$$.$onBrokerList_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerList_$$() {
  var $broker_list$$ = this.$app_$.$model_$.get("BrokerList");
  if($broker_list$$ != $JSCompiler_alias_NULL$$) {
    var $last_country_code$$ = "", $number_of_countries$$ = 0, $brokers_by_country$$ = {};
    $goog$array$forEach$$($broker_list$$.BrokerListGrp, function($broker_array$$) {
      var $broker_info$$ = {};
      $goog$array$forEach$$($broker_list$$.Columns, function($column$$4$$, $index$$68$$) {
        $broker_info$$[$column$$4$$] = $broker_array$$[$index$$68$$]
      }, this);
      $broker_info$$.CountryCode in $brokers_by_country$$ ? $brokers_by_country$$[$broker_info$$.CountryCode].push($broker_info$$) : ($brokers_by_country$$[$broker_info$$.CountryCode] = [$broker_info$$], 0 < $broker_info$$.CountryCode.length && ($last_country_code$$ = $broker_info$$.CountryCode, ++$number_of_countries$$))
    }, this);
    1 === $number_of_countries$$ && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_country"), $last_country_code$$), $JSCompiler_StaticMethods_onSelectCountry_$$(this, $last_country_code$$))
  }
};
$JSCompiler_prototypeAlias$$.$onChangeCountry_$ = function $$JSCompiler_prototypeAlias$$$$onChangeCountry_$$($e$$47_selected_country$$) {
  $e$$47_selected_country$$ = $goog$dom$forms$getValue$$($e$$47_selected_country$$.target);
  $JSCompiler_StaticMethods_onSelectCountry_$$(this, $e$$47_selected_country$$)
};
$JSCompiler_prototypeAlias$$.$onChangeState_$ = function $$JSCompiler_prototypeAlias$$$$onChangeState_$$() {
  var $selected_country$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $selected_state$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state"));
  $JSCompiler_StaticMethods_onSelectState_$$(this, $selected_country$$1$$, $selected_state$$)
};
function $JSCompiler_StaticMethods_onSelectCountry_$$($JSCompiler_StaticMethods_onSelectCountry_$self$$, $selected_country$$2$$) {
  var $countries$$1_country_info$$1$$ = $bitex$util$getCountries$$();
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_state"));
  $countries$$1_country_info$$1$$ = $countries$$1_country_info$$1$$[$selected_country$$2$$];
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_state_group"), $goog$isArrayLike$$($countries$$1_country_info$$1$$));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_broker"));
  if($JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$getBrokerByCountry$("")[0] != $JSCompiler_alias_NULL$$) {
    var $broker_info$$1_el$$47$$ = $JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$getBrokerByCountry$("")[0], $broker_info$$1_el$$47$$ = $goog$dom$createDom$$("option", {value:$broker_info$$1_el$$47$$.BrokerID}, $broker_info$$1_el$$47$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$1_el$$47$$)
  }
  if($goog$isArrayLike$$($countries$$1_country_info$$1$$)) {
    var $states_name_array$$ = $countries$$1_country_info$$1$$[2].split("|"), $number_of_states_with_brokers$$ = 0, $last_state_with_broker$$ = "";
    $goog$array$forEach$$($countries$$1_country_info$$1$$[1].split("|"), function($state_code$$, $index$$69$$) {
      var $el$$48$$ = $goog$dom$createDom$$("option", {value:$state_code$$}, $states_name_array$$[$index$$69$$]);
      $goog$dom$getElement$$("id_signup_state").appendChild($el$$48$$);
      0 <= $goog$array$findIndex$$(this.$app_$.$getBrokerByCountry$($selected_country$$2$$), function($broker_info$$2$$) {
        if($broker_info$$2$$.State === $state_code$$) {
          return $JSCompiler_alias_TRUE$$
        }
      }) && (++$number_of_states_with_brokers$$, $last_state_with_broker$$ = $state_code$$)
    }, $JSCompiler_StaticMethods_onSelectCountry_$self$$);
    1 == $number_of_states_with_brokers$$ && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_state"), $last_state_with_broker$$), $JSCompiler_StaticMethods_onSelectState_$$($JSCompiler_StaticMethods_onSelectCountry_$self$$, $selected_country$$2$$, $last_state_with_broker$$))
  }else {
    var $number_of_available_brokers$$ = 0, $last_available_broker$$ = "";
    $goog$object$forEach$$($JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$getBrokerByCountry$($selected_country$$2$$), function($broker_info$$3$$) {
      var $el$$49$$ = $goog$dom$createDom$$("option", {value:$broker_info$$3$$.BrokerID}, $broker_info$$3$$.BusinessName);
      $goog$dom$getElement$$("id_signup_broker").appendChild($el$$49$$);
      ++$number_of_available_brokers$$;
      $last_available_broker$$ = $broker_info$$3$$.BrokerID
    }, $JSCompiler_StaticMethods_onSelectCountry_$self$$);
    1 == $number_of_available_brokers$$ ? $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "" + $last_available_broker$$) : $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "0");
    $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker"), 1 <= $number_of_available_brokers$$);
    $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker_warning"), 0 == $number_of_available_brokers$$)
  }
}
function $JSCompiler_StaticMethods_onSelectState_$$($JSCompiler_StaticMethods_onSelectState_$self$$, $selected_country$$3$$, $selected_state$$1$$) {
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_broker"));
  if($JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$getBrokerByCountry$("")[0] != $JSCompiler_alias_NULL$$) {
    var $broker_info$$4_el$$50$$ = $JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$getBrokerByCountry$("")[0], $broker_info$$4_el$$50$$ = $goog$dom$createDom$$("option", {value:$broker_info$$4_el$$50$$.BrokerID}, $broker_info$$4_el$$50$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$4_el$$50$$)
  }
  var $number_of_available_brokers$$1$$ = 0, $last_available_broker$$1$$ = "";
  $goog$array$forEach$$($JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$getBrokerByCountry$($selected_country$$3$$), function($broker_info$$5_el$$51$$) {
    $broker_info$$5_el$$51$$.State === $selected_state$$1$$ && (++$number_of_available_brokers$$1$$, $last_available_broker$$1$$ = $broker_info$$5_el$$51$$.BrokerID, $broker_info$$5_el$$51$$ = $goog$dom$createDom$$("option", {value:$broker_info$$5_el$$51$$.BrokerID}, $broker_info$$5_el$$51$$.BusinessName), $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$5_el$$51$$))
  }, $JSCompiler_StaticMethods_onSelectState_$self$$);
  1 == $number_of_available_brokers$$1$$ ? $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "" + $last_available_broker$$1$$) : $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "0");
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker"), 1 <= $number_of_available_brokers$$1$$);
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker_warning"), 0 == $number_of_available_brokers$$1$$)
}
;
// Input 69
function $bitex$view$LoginView$$($app$$2$$, $opt_domHelper$$7$$) {
  $bitex$view$View$$.call(this, $app$$2$$, $opt_domHelper$$7$$);
  this.$password_el_$ = this.$username_el_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$LoginView$$, $bitex$view$View$$);
$bitex$view$LoginView$$.prototype.$enterDocument$ = function $$bitex$view$LoginView$$$$$enterDocument$$() {
  $bitex$view$LoginView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$49$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $goog$dom$getElement$$("id_landing_signin"), "click", function($e$$49$$) {
    $e$$49$$.stopPropagation();
    $e$$49$$.preventDefault();
    $JSCompiler_StaticMethods_onLoginClick_$$(this, $goog$dom$getElement$$("id_landing_username"), $goog$dom$getElement$$("id_landing_password"))
  });
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $goog$dom$getElement$$("id_btn_login"), "click", function($e$$50$$) {
    $e$$50$$.stopPropagation();
    $e$$50$$.preventDefault();
    $JSCompiler_StaticMethods_onLoginClick_$$(this, $goog$dom$getElement$$("id_username"), $goog$dom$getElement$$("id_password"))
  })
};
$bitex$view$LoginView$$.prototype.$getUsername$ = function $$bitex$view$LoginView$$$$$getUsername$$() {
  return $goog$dom$forms$getValue$$(this.$username_el_$)
};
$bitex$view$LoginView$$.prototype.$getPassword$ = function $$bitex$view$LoginView$$$$$getPassword$$() {
  return $goog$dom$forms$getValue$$(this.$password_el_$)
};
function $JSCompiler_StaticMethods_onLoginClick_$$($JSCompiler_StaticMethods_onLoginClick_$self$$, $username$$1_username_el$$, $password$$1_password_el$$) {
  $JSCompiler_StaticMethods_onLoginClick_$self$$.$username_el_$ = $username$$1_username_el$$;
  $JSCompiler_StaticMethods_onLoginClick_$self$$.$password_el_$ = $password$$1_password_el$$;
  $username$$1_username_el$$ = $JSCompiler_StaticMethods_onLoginClick_$self$$.$getUsername$();
  $password$$1_password_el$$ = $JSCompiler_StaticMethods_onLoginClick_$self$$.$getPassword$();
  $goog$string$isEmpty$$($username$$1_username_el$$) ? ($JSCompiler_StaticMethods_onLoginClick_$self$$.$app_$.$showDialog$("Nome de usu\u00e1rio inv\u00e1lido"), $JSCompiler_StaticMethods_onLoginClick_$self$$.$username_el_$.focus()) : $goog$string$isEmpty$$($password$$1_password_el$$) || 8 > $password$$1_password_el$$.length ? ($JSCompiler_StaticMethods_onLoginClick_$self$$.$app_$.$showDialog$("A senha precisa ter no m\u00ednimo 8 letras"), $JSCompiler_StaticMethods_onLoginClick_$self$$.$password_el_$.focus()) : 
  $JSCompiler_StaticMethods_onLoginClick_$self$$.dispatchEvent("login_click")
}
$bitex$view$LoginView$$.prototype.clear = function $$bitex$view$LoginView$$$$clear$() {
  this.$username_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$username_el_$, "");
  this.$password_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$password_el_$, "")
};
// Input 70
function $bitex$ui$WithdrawList$$($methodDescriptionObj$$, $opt_broker_mode_show_customers$$, $grid_columns$$1_opt_show_customers$$, $opt_domHelper$$8$$) {
  var $broker_mode$$ = $JSCompiler_alias_FALSE$$;
  $opt_broker_mode_show_customers$$ === $JSCompiler_alias_TRUE$$ && ($broker_mode$$ = $opt_broker_mode_show_customers$$);
  $opt_broker_mode_show_customers$$ = $JSCompiler_alias_FALSE$$;
  $grid_columns$$1_opt_show_customers$$ === $JSCompiler_alias_TRUE$$ && ($opt_broker_mode_show_customers$$ = $grid_columns$$1_opt_show_customers$$);
  $grid_columns$$1_opt_show_customers$$ = [{property:"Created", label:"Data/Hora", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-created"
  }}, {property:"Status", label:"Situa\u00e7\u00e3o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$24$$, $rowSet$$) {
    var $label_class_text_reason_el$$ = function($s$$25$$) {
      switch($s$$25$$) {
        case "0":
          return["", "N\u00e3o confirmado"];
        case "1":
          return["warning", "Pendente"];
        case "2":
          return["info", "Em andamento..."];
        case "4":
          return["success", "Completo"];
        case "8":
          return["important", "Cancelado"]
      }
      return["", ""]
    }($s$$24$$), $reason_id$$ = $rowSet$$.ReasonID, $reason$$ = $rowSet$$.Reason;
    if($reason_id$$ != $JSCompiler_alias_NULL$$) {
      var $status_el$$ = $goog$dom$createDom$$("span", ["label", "label-" + $label_class_text_reason_el$$[0]]);
      switch($reason_id$$) {
        case 0:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:$reason$$}, $label_class_text_reason_el$$[1]);
          break;
        case -1:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Saldo insuficiente"}, $label_class_text_reason_el$$[1]);
          break;
        case -2:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Conta n\u00e3o \u00e9 verificada"}, $label_class_text_reason_el$$[1]);
          break;
        case -3:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Suspeita de fraude"}, $label_class_text_reason_el$$[1]);
          break;
        case -4:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Pedindo o saque para uma conta diferente da sua"}, $label_class_text_reason_el$$[1]);
          break;
        case -5:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Carteira inv\u00e1lida"}, $label_class_text_reason_el$$[1]);
          break;
        case -6:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Dados banc\u00e1rios inv\u00e1lidos"}, $label_class_text_reason_el$$[1]);
          break;
        case -7:
          $label_class_text_reason_el$$ = $goog$dom$createDom$$("abbr", {title:"Ultrapassou o limite di\u00e1rio de saque"}, $label_class_text_reason_el$$[1]);
          break;
        default:
          return $goog$dom$createDom$$("span", ["label", "label-" + $label_class_text_reason_el$$[0]], $label_class_text_reason_el$$[1])
      }
      $status_el$$.appendChild($label_class_text_reason_el$$);
      return $status_el$$
    }
    return $goog$dom$createDom$$("span", ["label", "label-" + $label_class_text_reason_el$$[0]], $label_class_text_reason_el$$[1])
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-status"
  }}, {property:"Amount", label:"Valor", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-amount"
  }}, {property:"Data", label:"Detalhes", sortable:$JSCompiler_alias_FALSE$$, formatter:function($data$$33$$, $rowSet$$1$$) {
    var $element$$106$$ = $goog$dom$createDom$$("table"), $method$$4$$ = $methodDescriptionObj$$[$rowSet$$1$$.Currency][$rowSet$$1$$.Method];
    $goog$dom$appendChild$$($element$$106$$, $goog$dom$createDom$$("tr", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-tr", $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-key", "M\u00e9todo"), $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-value", $method$$4$$)));
    $data$$33$$.Link != $JSCompiler_alias_NULL$$ && ($goog$string$isEmpty$$($data$$33$$.Link) || $goog$dom$appendChild$$($element$$106$$, $goog$dom$createDom$$("tr", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-tr", $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-key", "Recibo da corretora"), $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-value", $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-primary", target:"_blank", href:$data$$33$$.Link}, 
    "ver", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-eye-open"]))))));
    $goog$object$forEach$$($data$$33$$, function($value$$95$$, $key$$74$$) {
      if("Link" != $key$$74$$ && "Currency" != $key$$74$$ && $value$$95$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($value$$95$$)) {
        if("Wallet" == $key$$74$$) {
          var $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-withdraw-list-qr", href:"#", "data-action":"SHOW_QR", "data-row":$goog$json$serialize$$($rowSet$$1$$)}, "QR", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-qrcode"])), $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $goog$dom$createDom$$("tr", $bitex$ui$WithdrawList$CSS_CLASS$$ + 
          "-details-tr", $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-key", "Carteira"), $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-value", $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$))
        }else {
          if("TransactionID" == $key$$74$$ && "BTC" == $data$$33$$.Currency) {
            $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-btc-blockchain", href:"https://blockchain.info/tx/" + $value$$95$$, target:"_blank"}, "blockchain", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-share-alt"])), $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $goog$dom$createDom$$("tr", $bitex$ui$WithdrawList$CSS_CLASS$$ + 
            "-details-tr", $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-key", "ID da transa\u00e7\u00e3o"), $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-value", $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$))
          }else {
            $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $key$$74$$;
            switch($key$$74$$) {
              case "AccountNumber":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "N\u00famero da conta";
                break;
              case "BankName":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "Nome do banco";
                break;
              case "BankNumber":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "N\u00famero do banco";
                break;
              case "CPF_CNPJ":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "CPF or CNPJ";
                break;
              case "AccountBranch":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "Ag\u00eancia";
                break;
              case "AccountName":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "T\u00edtular da conta";
                break;
              case "RoutingNumber":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "Routing number";
                break;
              case "BankSwift":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "Bank Swift";
                break;
              case "Email":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "Email";
                break;
              case "TransactionID":
                $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = "ID da transa\u00e7\u00e3o"
            }
            $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$ = $goog$dom$createDom$$("tr", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-tr", $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-key", $btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$), $goog$dom$createDom$$("td", $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details-td-value", $value$$95$$))
          }
        }
        $element$$106$$.appendChild($btn_blockchain_btn_qr_child$$inline_321_child$$inline_324_child$$inline_327_key_description$$)
      }
    }, this);
    return $element$$106$$
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details"
  }}];
  $opt_broker_mode_show_customers$$ && $grid_columns$$1_opt_show_customers$$.push({property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-username"
  }});
  $broker_mode$$ && $grid_columns$$1_opt_show_customers$$.push({property:"WithdrawID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-actions"
  }, formatter:function($s$$26$$, $row_set_obj$$1$$) {
    var $btn_complete_data_row$$1$$ = $goog$json$serialize$$($row_set_obj$$1$$), $btn_cancel$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-danger btn-withdraw-cancel", "data-row":$btn_complete_data_row$$1$$}, "Cancelar"), $btn_progress$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-withdraw-progress", "data-row":$btn_complete_data_row$$1$$}, "Em andamento"), $btn_complete_data_row$$1$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-success btn-withdraw-complete", 
    "data-row":$btn_complete_data_row$$1$$}, "Completar");
    switch($row_set_obj$$1$$.Status) {
      case "0":
        return $btn_cancel$$;
      case "1":
        return $goog$dom$createDom$$("div", "btn-group", [$btn_cancel$$, $btn_progress$$]);
      case "2":
        return $goog$dom$createDom$$("div", "btn-group", [$btn_cancel$$, $btn_complete_data_row$$1$$]);
      case "4":
        return"";
      case "8":
        return""
    }
  }});
  this.$selected_withdraw_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowIDFn:this.$getRowId$, rowClassFn:this.$getRowClass$, columns:$grid_columns$$1_opt_show_customers$$}, $opt_domHelper$$8$$)
}
$goog$inherits$$($bitex$ui$WithdrawList$$, $bitex$ui$DataGrid$$);
var $bitex$ui$WithdrawList$CSS_CLASS$$ = "withdraw-list";
$JSCompiler_prototypeAlias$$ = $bitex$ui$WithdrawList$$.prototype;
$JSCompiler_prototypeAlias$$.$getCssClass$ = function $$JSCompiler_prototypeAlias$$$$getCssClass$$() {
  return $bitex$ui$WithdrawList$CSS_CLASS$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$WithdrawList$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$handleClick_$)
};
$JSCompiler_prototypeAlias$$.$getWithdrawData$ = $JSCompiler_get$$("$selected_withdraw_$");
$JSCompiler_prototypeAlias$$.$handleClick_$ = function $$JSCompiler_prototypeAlias$$$$handleClick_$$($e$$51$$) {
  this.$selected_withdraw_$ = $goog$json$parse$$($e$$51$$.target.getAttribute("data-row"));
  this.$selected_withdraw_$ != $JSCompiler_alias_NULL$$ && ($goog$dom$classes$has$$($e$$51$$.target, "btn-withdraw-complete") ? this.dispatchEvent("withdraw_complete") : $goog$dom$classes$has$$($e$$51$$.target, "btn-withdraw-progress") ? this.dispatchEvent("withdraw_progress") : $goog$dom$classes$has$$($e$$51$$.target, "btn-withdraw-cancel") && this.dispatchEvent("withdraw_cancel"), this.$selected_withdraw_$ = $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$getRowId$ = function $$JSCompiler_prototypeAlias$$$$getRowId$$($row_set$$3$$) {
  return $JSCompiler_StaticMethods_getId$$(this) + "." + $row_set$$3$$.WithdrawID
};
$JSCompiler_prototypeAlias$$.$getRowClass$ = function $$JSCompiler_prototypeAlias$$$$getRowClass$$($row_set$$4$$) {
  var $class_status$$1$$;
  switch($row_set$$4$$.Status) {
    case "0":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-unconfirmed";
      break;
    case "1":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-pending";
      break;
    case "2":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-processing";
      break;
    case "4":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-complete";
      break;
    case "8":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-cancelled"
  }
  return $class_status$$1$$
};
// Input 71
function $goog$fx$Dragger$$($target$$55$$, $opt_handle$$, $opt_limits$$) {
  $goog$Disposable$$.call(this);
  this.target = $target$$55$$;
  this.handle = $opt_handle$$ || $target$$55$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$55$$);
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $goog$events$listen$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this)
}
$goog$inherits$$($goog$fx$Dragger$$, $goog$events$EventTarget$$);
var $goog$fx$Dragger$HAS_SET_CAPTURE_$$ = $goog$userAgent$IE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.3");
$JSCompiler_prototypeAlias$$ = $goog$fx$Dragger$$.prototype;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.$startX$ = 0;
$JSCompiler_prototypeAlias$$.$startY$ = 0;
$JSCompiler_prototypeAlias$$.$deltaX$ = 0;
$JSCompiler_prototypeAlias$$.$deltaY$ = 0;
$JSCompiler_prototypeAlias$$.$enabled_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$dragging_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$hysteresisDistanceSquared_$ = 0;
$JSCompiler_prototypeAlias$$.$mouseDownTime_$ = 0;
$JSCompiler_prototypeAlias$$.$ieDragStartCancellingOn_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$useRightPositioningForRtl_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getHandler$ = $JSCompiler_get$$("$eventHandler_$");
$JSCompiler_prototypeAlias$$.$setEnabled$ = $JSCompiler_set$$("$enabled_$");
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$fx$Dragger$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlisten$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this);
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  this.$eventHandler_$ = this.handle = this.target = $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_isRightToLeft_$self$$) {
  $goog$isDef$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$) || ($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.target));
  return $JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$
}
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$54_e$$52_element$$inline_337$$) {
  var $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ = "mousedown" == $JSCompiler_temp$$54_e$$52_element$$inline_337$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$54_e$$52_element$$inline_337$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$54_e$$52_element$$inline_337$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$54_e$$52_element$$inline_337$$.clientX, $JSCompiler_temp$$54_e$$52_element$$inline_337$$.clientY, $JSCompiler_temp$$54_e$$52_element$$inline_337$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$54_e$$52_element$$inline_337$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$54_e$$52_element$$inline_337$$.preventDefault()
    }
    var $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ = this.$document_$, $bestParent$$inline_339_docEl$$inline_334$$ = $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$.documentElement, $borderWidths$$inline_340_useCapture$$inline_335$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_340_useCapture$$inline_335$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_340_useCapture$$inline_335$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_339_docEl$$inline_334$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_339_docEl$$inline_334$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ ? $goog$dom$getWindow_$$($doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_340_useCapture$$inline_335$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.clientY;
    this.screenX = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.screenX;
    this.screenY = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$54_e$$52_element$$inline_337$$ = this.target, $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.offsetLeft, $bestParent$$inline_339_docEl$$inline_334$$ = $JSCompiler_temp$$54_e$$52_element$$inline_337$$.offsetParent, !$bestParent$$inline_339_docEl$$inline_334$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$54_e$$52_element$$inline_337$$, "position") && ($bestParent$$inline_339_docEl$$inline_334$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$54_e$$52_element$$inline_337$$).documentElement), $bestParent$$inline_339_docEl$$inline_334$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_340_useCapture$$inline_335$$ = $goog$style$getBorderBox$$($bestParent$$inline_339_docEl$$inline_334$$), $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ += $borderWidths$$inline_340_useCapture$$inline_335$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_340_useCapture$$inline_335$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_339_docEl$$inline_334$$), $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ -= $borderWidths$$inline_340_useCapture$$inline_335$$.left), $JSCompiler_temp$$54_e$$52_element$$inline_337$$ = $goog$style$isRightToLeft$$($bestParent$$inline_339_docEl$$inline_334$$) ? $bestParent$$inline_339_docEl$$inline_334$$.clientWidth - ($doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$ + $JSCompiler_temp$$54_e$$52_element$$inline_337$$.offsetWidth) : 
    $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$) : $JSCompiler_temp$$54_e$$52_element$$inline_337$$ = $doc$$inline_333_isMouseDown_offsetLeftForReal$$inline_338$$) : $JSCompiler_temp$$54_e$$52_element$$inline_337$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$54_e$$52_element$$inline_337$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$54$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$54$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$69$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$41$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$54$$.clientX, $e$$54$$.clientY, $e$$54$$, $x$$69$$, $y$$41$$, $opt_dragCanceled$$ || "touchcancel" == $e$$54$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$54$$.type || "touchcancel" == $e$$54$$.type) && $e$$54$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$56$$) {
  var $type$$100$$ = $e$$56$$.type;
  "touchstart" == $type$$100$$ || "touchmove" == $type$$100$$ ? $e$$56$$.init($e$$56$$.$event_$.targetTouches[0], $e$$56$$.currentTarget) : ("touchend" == $type$$100$$ || "touchcancel" == $type$$100$$) && $e$$56$$.init($e$$56$$.$event_$.changedTouches[0], $e$$56$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$57$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$57$$);
    var $dx$$7_x$$70$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$57$$.clientX - this.clientX), $dy$$7_pos$$7_y$$42$$ = $e$$57$$.clientY - this.clientY;
    this.clientX = $e$$57$$.clientX;
    this.clientY = $e$$57$$.clientY;
    this.screenX = $e$$57$$.screenX;
    this.screenY = $e$$57$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$57$$.clientX, $e$$57$$.clientY, $e$$57$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$57$$);
          return
        }
      }
    }
    $dy$$7_pos$$7_y$$42$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$70$$, $dy$$7_pos$$7_y$$42$$);
    $dx$$7_x$$70$$ = $dy$$7_pos$$7_y$$42$$.x;
    $dy$$7_pos$$7_y$$42$$ = $dy$$7_pos$$7_y$$42$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$57$$.clientX, $e$$57$$.clientY, $e$$57$$, $dx$$7_x$$70$$, $dy$$7_pos$$7_y$$42$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$57$$, $dx$$7_x$$70$$, $dy$$7_pos$$7_y$$42$$), $e$$57$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $dx$$8_x$$71$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$document_$));
  $dx$$8_x$$71$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaX$ += $dx$$8_x$$71$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$71$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$71$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$58$$) {
  var $pos$$8$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$58$$.clientX = this.clientX;
  $e$$58$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$58$$, $pos$$8$$.x, $pos$$8$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$59$$, $x$$72$$, $y$$44$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$72$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$72$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$44$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$59$$.clientX, $e$$59$$.clientY, $e$$59$$, $x$$72$$, $y$$44$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$73$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$73$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$45$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$45$$))
}
function $goog$fx$DragEvent$$($type$$101$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$101$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
// Input 72
// Input 73
function $goog$events$FocusHandler$$($element$$108_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$108_typeOut$$;
  $element$$108_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$108_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$65$$) {
  var $event$$3$$ = new $goog$events$BrowserEvent$$($e$$65$$.$event_$);
  $event$$3$$.type = "focusin" == $e$$65$$.type || "focus" == $e$$65$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$3$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
// Input 74
// Input 75
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$9$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$9$$);
  this.$useIframeMask_$ = !!$opt_useIframeMask$$
}
$goog$inherits$$($goog$ui$ModalPopup$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ModalPopup$$.prototype;
$JSCompiler_prototypeAlias$$.$focusHandler_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$visible_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$bgEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$bgIframeEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$tabCatcherElement_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$backwardTabWrapInProgress_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-modalpopup");
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = $JSCompiler_get$$("$bgEl_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$ModalPopup$$.$superClass_$.$createDom$.call(this);
  var $element$$109$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$109$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$109$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$109$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$36$$;
    $JSCompiler_inline_result$$36$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$36$$;
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$.className = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getCssClass$() + "-bg";
    $goog$style$showElement$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$, $JSCompiler_alias_FALSE$$);
    $goog$style$setOpacity$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$, 0)
  }
  $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$ || ($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getCssClass$() + "-bg"), $goog$style$showElement$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$, $JSCompiler_alias_FALSE$$))
}
function $JSCompiler_StaticMethods_createTabCatcher_$$($JSCompiler_StaticMethods_createTabCatcher_$self$$) {
  $JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$ || ($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$ = $JSCompiler_StaticMethods_createTabCatcher_$self$$.$getDomHelper$().createElement("span"), $goog$style$showElement$$($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$, $JSCompiler_alias_FALSE$$), $goog$dom$setFocusableTabIndex$$($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$, $JSCompiler_alias_TRUE$$), 
  $JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$.style.position = "absolute")
}
$JSCompiler_prototypeAlias$$.$resetBackwardTabWrap_$ = function $$JSCompiler_prototypeAlias$$$$resetBackwardTabWrap_$$() {
  this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$110$$) {
  return!!$element$$110$$ && "DIV" == $element$$110$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$111$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$111$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$ = this.$getElement$();
    $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode && $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$)
  }
  $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$ = this.$getElement$();
  $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode && $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$ = this.$getElement$();
  $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode && $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_1045_refNode$$inline_1048_refNode$$inline_355$$.nextSibling);
  this.$focusHandler_$ = new $goog$events$FocusHandler$$($JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()));
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$focusHandler_$, "focusin", this.$onFocus_$)
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$visible_$ && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $goog$dispose$$(this.$focusHandler_$);
  $goog$ui$ModalPopup$$.$superClass_$.$exitDocument$.call(this);
  $goog$dom$removeNode$$(this.$bgIframeEl_$);
  $goog$dom$removeNode$$(this.$bgEl_$);
  $goog$dom$removeNode$$(this.$tabCatcherElement_$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$) {
  if($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_980_win$$inline_975$$ = (($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_986_popupSize$$inline_979$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_980_win$$inline_975$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_980_win$$inline_975$$ || window);
        $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = Math.max($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ + $viewSize$$inline_980_win$$inline_975$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_986_popupSize$$inline_979$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ + $viewSize$$inline_980_win$$inline_975$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_986_popupSize$$inline_979$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$, $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$, $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$);
        $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_986_popupSize$$inline_979$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$926_JSCompiler_temp_const$$929_doc$$inline_974_left$$inline_981_visible$$1_x$$inline_976$$($JSCompiler_StaticMethods_getWindow$self$$inline_984_JSCompiler_temp_const$$928_scroll$$inline_978_top$$inline_982_y$$inline_977$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_986_popupSize$$inline_979$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
    }
  }
};
function $JSCompiler_StaticMethods_showPopupElement_$$($JSCompiler_StaticMethods_showPopupElement_$self$$, $visible$$2$$) {
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$, $visible$$2$$);
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$, $visible$$2$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$getElement$(), $visible$$2$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$tabCatcherElement_$, $visible$$2$$)
}
$JSCompiler_prototypeAlias$$.$onShow$ = function $$JSCompiler_prototypeAlias$$$$onShow$$() {
  this.dispatchEvent("show")
};
$JSCompiler_prototypeAlias$$.$onHide$ = function $$JSCompiler_prototypeAlias$$$$onHide$$() {
  $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_FALSE$$);
  this.dispatchEvent("hide")
};
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  this.$focusElement_$()
};
$JSCompiler_prototypeAlias$$.$resizeBackground_$ = function $$JSCompiler_prototypeAlias$$$$resizeBackground_$$() {
  this.$bgIframeEl_$ && $goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_FALSE$$);
  this.$bgEl_$ && $goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_FALSE$$);
  var $doc$$38_h$$12$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$(($doc$$38_h$$12$$ ? $goog$dom$getWindow_$$($doc$$38_h$$12$$) : window) || window || window), $w$$8$$ = Math.max($viewSize$$.width, Math.max($doc$$38_h$$12$$.body.scrollWidth, $doc$$38_h$$12$$.documentElement.scrollWidth)), $doc$$38_h$$12$$ = Math.max($viewSize$$.height, Math.max($doc$$38_h$$12$$.body.scrollHeight, $doc$$38_h$$12$$.documentElement.scrollHeight));
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$8$$, $doc$$38_h$$12$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$8$$, $doc$$38_h$$12$$))
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$67$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$67$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$68$$) {
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$dispose$$(this.$popupShowTransition_$);
  this.$popupShowTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$popupHideTransition_$);
  this.$popupHideTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$bgShowTransition_$);
  this.$bgShowTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$bgHideTransition_$);
  this.$bgHideTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$ModalPopup$$.$superClass_$.$disposeInternal$.call(this)
};
// Input 76
// Input 77
// Input 78
function $goog$a11y$aria$setState$$($element$$114$$, $state$$2$$, $value$$96$$) {
  $element$$114$$.setAttribute("aria-" + $state$$2$$, $value$$96$$)
}
;
// Input 79
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$10$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$10$$);
  this.$class_$ = $opt_class$$4$$ || "modal-dialog";
  this.$buttons_$ = $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($goog$ui$Dialog$$, $goog$ui$ModalPopup$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$$.prototype;
$JSCompiler_prototypeAlias$$.$escapeToCancel_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$hasTitleCloseButton_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$modal_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$draggable_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$backgroundElementOpacity_$ = 0.5;
$JSCompiler_prototypeAlias$$.$title_$ = "";
$JSCompiler_prototypeAlias$$.$content_$ = "";
$JSCompiler_prototypeAlias$$.$dragger_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$disposeOnHide_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$titleEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleTextEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleId_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$contentEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$buttonEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$preferredAriaRole_$ = "dialog";
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_get$$("$class_$");
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($html$$) {
  this.$content_$ = $html$$;
  this.$contentEl_$ && (this.$contentEl_$.innerHTML = $html$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  this.$getElement$() || this.render();
  return this.$contentEl_$
};
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = function $$JSCompiler_prototypeAlias$$$$getBackgroundElement$$() {
  this.$getElement$() || this.render();
  return $goog$ui$Dialog$$.$superClass_$.$getBackgroundElement$.call(this)
};
$JSCompiler_prototypeAlias$$.$setBackgroundElementOpacity$ = function $$JSCompiler_prototypeAlias$$$$setBackgroundElementOpacity$$($bgEl_opacity$$1$$) {
  this.$backgroundElementOpacity_$ = $bgEl_opacity$$1$$;
  this.$getElement$() && ($bgEl_opacity$$1$$ = this.$getBackgroundElement$()) && $goog$style$setOpacity$$($bgEl_opacity$$1$$, this.$backgroundElementOpacity_$)
};
function $JSCompiler_StaticMethods_setDraggingEnabled_$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$, $enabled$$2$$) {
  if($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$()) {
    var $element$$inline_365$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_366$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_365$$, $className$$inline_366$$) : $goog$dom$classes$remove$$($element$$inline_365$$, $className$$inline_366$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$ = this.$getElement$(), $dom$$6$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$6$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$6$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$6$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$, this.$titleEl_$, this.$contentEl_$ = $dom$$6$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$6$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_369_element$$120$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:$JSCompiler_StaticMethods_getId$$(this)}), $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_372_dialogElement_element$$121$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_377_element$$122$$ = this.$getElement$();
  $dom$$inline_377_element$$122$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_377_element$$122$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_377_element$$122$$ = this.$getDomHelper$(), $bg$$inline_378$$ = this.$getBackgroundElement$();
    $dom$$inline_377_element$$122$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_377_element$$122$$.removeNode($bg$$inline_378$$)
  }
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$visible_$ && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, $JSCompiler_alias_FALSE$$);
  $goog$ui$Dialog$$.$superClass_$.$exitDocument$.call(this)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$3$$) {
  $visible$$3$$ != this.$visible_$ && (this.$inDocument_$ || this.render(), $goog$ui$Dialog$$.$superClass_$.$setVisible$.call(this, $visible$$3$$))
};
$JSCompiler_prototypeAlias$$.$onShow$ = function $$JSCompiler_prototypeAlias$$$$onShow$$() {
  $goog$ui$Dialog$$.$superClass_$.$onShow$.call(this);
  this.dispatchEvent($goog$ui$Dialog$EventType$AFTER_SHOW$$)
};
$JSCompiler_prototypeAlias$$.$onHide$ = function $$JSCompiler_prototypeAlias$$$$onHide$$() {
  $goog$ui$Dialog$$.$superClass_$.$onHide$.call(this);
  this.dispatchEvent($goog$ui$Dialog$EventType$AFTER_HIDE$$);
  this.$disposeOnHide_$ && this.$dispose$()
};
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  $goog$ui$Dialog$$.$superClass_$.focus.call(this);
  if(this.$buttons_$) {
    var $defaultButton$$ = this.$buttons_$.$defaultButton_$;
    if($defaultButton$$) {
      for(var $doc$$40$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$126$$ = 0, $button$$1$$;$button$$1$$ = $buttons$$[$i$$126$$];$i$$126$$++) {
        if($button$$1$$.name == $defaultButton$$ && !$button$$1$$.disabled) {
          try {
            if($goog$userAgent$WEBKIT$$ || $goog$userAgent$OPERA$$) {
              var $temp$$1$$ = $doc$$40$$.createElement("input");
              $temp$$1$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.$getElement$().appendChild($temp$$1$$);
              $temp$$1$$.focus();
              this.$getElement$().removeChild($temp$$1$$)
            }
            $button$$1$$.focus()
          }catch($e$$69$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$41_h$$13$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_382_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$41_h$$13$$ ? $goog$dom$getWindow_$$($doc$$41_h$$13$$) : window) || window || window), $w$$9$$ = Math.max($doc$$41_h$$13$$.body.scrollWidth, $limits$$inline_382_viewSize$$2$$.width), $doc$$41_h$$13$$ = Math.max($doc$$41_h$$13$$.body.scrollHeight, $limits$$inline_382_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_382_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_382_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_382_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_382_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$9$$ - $dialogSize$$.width, $doc$$41_h$$13$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$ = this.$buttons_$, $key$$75$$ = $bs_caption$$ && $bs_caption$$.$cancelButton_$;
    $key$$75$$ ? ($bs_caption$$ = $bs_caption$$.get($key$$75$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$75$$, $bs_caption$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$buttonEl_$ = this.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Dialog$$.$superClass_$.$disposeInternal$.call(this)
};
function $JSCompiler_StaticMethods_setButtonSet$$($JSCompiler_StaticMethods_setButtonSet$self$$, $buttons$$1$$) {
  $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$ = $buttons$$1$$;
  if($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$) {
    if($JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$) {
      var $JSCompiler_StaticMethods_attachToElement$self$$inline_387$$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_387$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_387$$.render()
    }else {
      $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$.innerHTML = ""
    }
    $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$)
  }
}
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$2_e$$72_el$$inline_392_key$$76$$) {
  a: {
    for($button$$2_e$$72_el$$inline_392_key$$76$$ = $button$$2_e$$72_el$$inline_392_key$$76$$.target;$button$$2_e$$72_el$$inline_392_key$$76$$ != $JSCompiler_alias_NULL$$ && $button$$2_e$$72_el$$inline_392_key$$76$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$2_e$$72_el$$inline_392_key$$76$$.tagName) {
        break a
      }
      $button$$2_e$$72_el$$inline_392_key$$76$$ = $button$$2_e$$72_el$$inline_392_key$$76$$.parentNode
    }
    $button$$2_e$$72_el$$inline_392_key$$76$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$2_e$$72_el$$inline_392_key$$76$$ && !$button$$2_e$$72_el$$inline_392_key$$76$$.disabled) {
    $button$$2_e$$72_el$$inline_392_key$$76$$ = $button$$2_e$$72_el$$inline_392_key$$76$$.name;
    var $caption$$1$$ = this.$buttons_$.get($button$$2_e$$72_el$$inline_392_key$$76$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$2_e$$72_el$$inline_392_key$$76$$, $caption$$1$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$73$$) {
  var $caption$$2_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$57$$ = $e$$73$$.target;
  if("keydown" == $e$$73$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$73$$.keyCode) {
      var $cancel_key$$77$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$57$$ = "SELECT" == $isSpecialFormElement_target$$57$$.tagName && !$isSpecialFormElement_target$$57$$.disabled;
      $cancel_key$$77$$ && !$isSpecialFormElement_target$$57$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = $buttonSet$$.get($cancel_key$$77$$), $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$77$$, $caption$$2_close$$))) : $isSpecialFormElement_target$$57$$ || ($caption$$2_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$73$$.keyCode && $e$$73$$.shiftKey && $isSpecialFormElement_target$$57$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_395$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$73$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$57$$.tagName) {
        $cancel_key$$77$$ = $isSpecialFormElement_target$$57$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$;
          if($JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_400$$ = 0, $nextButton$$inline_401$$;$nextButton$$inline_401$$ = $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$[$i$$inline_400$$];$i$$inline_400$$++) {
                if($nextButton$$inline_401$$.name == $defaultKey$$ || $nextButton$$inline_401$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$ = $nextButton$$inline_401$$;
                  break a
                }
              }
              $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$57$$ = ("TEXTAREA" == $isSpecialFormElement_target$$57$$.tagName || "SELECT" == $isSpecialFormElement_target$$57$$.tagName || "A" == $isSpecialFormElement_target$$57$$.tagName) && !$isSpecialFormElement_target$$57$$.disabled;
          $JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$ && (!$JSCompiler_temp$$33_buttons$$inline_399_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$57$$) && ($cancel_key$$77$$ = $defaultKey$$)
        }
      }
      $cancel_key$$77$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$77$$, String($buttonSet$$.get($cancel_key$$77$$)))))
    }
  }
  if($caption$$2_close$$ || $hasHandler$$) {
    $e$$73$$.stopPropagation(), $e$$73$$.preventDefault()
  }
  $caption$$2_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$78$$, $caption$$3$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$78$$;
  this.caption = $caption$$3$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$11$$) {
  this.$dom_$ = $opt_domHelper$$11$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$79$$, $caption$$4$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$79$$, $caption$$4$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$79$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$79$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$3$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$3$$.key, $button$$3$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$2$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$5$$, $key$$80$$) {
      var $button$$4$$ = $domHelper$$2$$.$createDom$("button", {name:$key$$80$$}, $caption$$5$$);
      $key$$80$$ == this.$defaultButton_$ && ($button$$4$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$4$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$124$$) {
  if($buttons$$2_element$$124$$ && 1 == $buttons$$2_element$$124$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$124$$;
    $buttons$$2_element$$124$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$127$$ = 0, $button$$5$$, $key$$81$$, $caption$$6$$;$button$$5$$ = $buttons$$2_element$$124$$[$i$$127$$];$i$$127$$++) {
      if($key$$81$$ = $button$$5$$.name || $button$$5$$.id, $caption$$6$$ = $goog$dom$getTextContent$$($button$$5$$) || $button$$5$$.value, $key$$81$$) {
        var $isDefault$$ = 0 == $i$$127$$;
        this.set($key$$81$$, $caption$$6$$, $isDefault$$, $button$$5$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$5$$, this.$class_$ + "-default")
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
var $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$ = "cancel", $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$ = {key:"ok", caption:"OK"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$ = {key:$goog$ui$Dialog$DefaultButtonKeys$CANCEL$$, caption:"Cancel"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$ = {key:"yes", caption:"Yes"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$ = {key:"no", caption:"No"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$ = {key:"save", caption:"Save"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$ = 
{key:"continue", caption:"Continue"};
"undefined" != typeof document && ($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, 
$goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, 
$JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$));
// Input 80
function $bootstrap$Dialog$$() {
  $goog$ui$Dialog$$.call(this, "modal")
}
$goog$inherits$$($bootstrap$Dialog$$, $goog$ui$Dialog$$);
$bootstrap$Dialog$$.prototype.$createDom$ = function $$bootstrap$Dialog$$$$$createDom$$() {
  $goog$ui$ModalPopup$$.prototype.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$ = this.$getElement$(), $dom$$7_i$$130$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$7_i$$130$$.$createDom$("div", {className:"modal-header", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleCloseEl_$ = $dom$$7_i$$130$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$7_i$$130$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$, this.$titleEl_$, this.$contentEl_$ = $dom$$7_i$$130$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$7_i$$130$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$7_i$$130$$ = 0;$dom$$7_i$$130$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$.length;$dom$$7_i$$130$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_404_buttons$$4_element$$125$$[$dom$$7_i$$130$$], "btn")
    }
  }
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$bootstrap$Dialog$$.prototype.$setBackgroundElementOpacity$ = function $$bootstrap$Dialog$$$$$setBackgroundElementOpacity$$($bgEl$$1_opacity$$2$$) {
  this.$backgroundElementOpacity_$ = $bgEl$$1_opacity$$2$$;
  this.$getElement$() && ($bgEl$$1_opacity$$2$$ = this.$getBackgroundElement$(), $goog$dom$classes$add$$($bgEl$$1_opacity$$2$$, "modal-dialog-bg"), $bgEl$$1_opacity$$2$$ && $goog$style$setOpacity$$($bgEl$$1_opacity$$2$$, this.$backgroundElementOpacity_$))
};
function $bootstrap$Dialog$ButtonSet$$($opt_domHelper$$12$$) {
  $goog$ui$Dialog$ButtonSet$$.call(this, $opt_domHelper$$12$$)
}
$goog$inherits$$($bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$$);
$bootstrap$Dialog$ButtonSet$$.prototype.render = function $$bootstrap$Dialog$ButtonSet$$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$3$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$7$$, $key$$86$$) {
      var $button$$8$$ = $domHelper$$3$$.$createDom$("button", {name:$key$$86$$}, $caption$$7$$);
      $button$$8$$.className = $key$$86$$ == this.$defaultButton_$ ? "btn btn-primary" : "btn";
      this.$element_$.appendChild($button$$8$$)
    }, this)
  }
};
function $bootstrap$Dialog$ButtonSet$createOkCancel$$() {
  return $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
function $bootstrap$Dialog$ButtonSet$createYesNoCancel$$() {
  return $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
;
// Input 81
function $bootstrap$Dropdown$closeAll$$() {
  var $dropdown_elements$$ = $goog$dom$getElementsByClass$$("dropdown-toggle", document.body);
  $goog$array$forEach$$($dropdown_elements$$, function($dropdown_element$$) {
    $goog$dom$classes$remove$$($goog$dom$getParentElement$$($dropdown_element$$), "open")
  })
}
function $bootstrap$Dropdown$install$$() {
  $goog$events$listen$$(document.body, "click", function($dropdown_element_parent$$1_e$$74$$) {
    var $element$$126$$ = $dropdown_element_parent$$1_e$$74$$.target, $is_dropdown_toogle$$ = $JSCompiler_alias_FALSE$$;
    $goog$dom$classes$has$$($element$$126$$, "dropdown-toggle") ? $is_dropdown_toogle$$ = $JSCompiler_alias_TRUE$$ : ($element$$126$$ = $goog$dom$getAncestorByTagNameAndClass$$($element$$126$$, "dropdown-toggle"), $element$$126$$ != $JSCompiler_alias_NULL$$ && ($is_dropdown_toogle$$ = $JSCompiler_alias_TRUE$$));
    $is_dropdown_toogle$$ ? ($dropdown_element_parent$$1_e$$74$$.preventDefault(), $dropdown_element_parent$$1_e$$74$$.stopPropagation(), $dropdown_element_parent$$1_e$$74$$ = $goog$dom$getParentElement$$($element$$126$$), $goog$dom$classes$has$$($dropdown_element_parent$$1_e$$74$$, "open") ? $bootstrap$Dropdown$closeAll$$() : ($bootstrap$Dropdown$closeAll$$(), $goog$dom$classes$add$$($dropdown_element_parent$$1_e$$74$$, "open"))) : $bootstrap$Dropdown$closeAll$$()
  });
  $goog$events$listen$$(document.body, "click", function($e$$75_label_element$$) {
    var $element$$127$$ = $e$$75_label_element$$.target, $data_value$$1$$ = $JSCompiler_alias_NULL$$, $data_caption$$ = $JSCompiler_alias_NULL$$;
    "A" === $element$$127$$.tagName && ($data_caption$$ = $goog$dom$getTextContent$$($element$$127$$), $element$$127$$ = $goog$dom$getParentElement$$($element$$127$$));
    "LI" === $element$$127$$.tagName && ($data_value$$1$$ = $element$$127$$.getAttribute("data-value"), $data_caption$$ = $goog$dom$getTextContent$$($goog$dom$getFirstElementChild$$($element$$127$$)));
    $data_value$$1$$ != $JSCompiler_alias_NULL$$ && ($element$$127$$ = $goog$dom$getParentElement$$($element$$127$$), "UL" === $element$$127$$.tagName && $goog$dom$classes$has$$($element$$127$$, "dropdown-menu") && ($e$$75_label_element$$.preventDefault(), $e$$75_label_element$$.stopPropagation(), console.log("click on:  " + $data_caption$$ + " [" + $data_value$$1$$ + "]"), $e$$75_label_element$$ = $goog$dom$getElementByClass$$("dropdown-label", $goog$dom$getParentElement$$($element$$127$$)), $e$$75_label_element$$ != 
    $JSCompiler_alias_NULL$$ && $goog$dom$setTextContent$$($e$$75_label_element$$, $data_caption$$), $bootstrap$Dropdown$closeAll$$()))
  })
}
;
// Input 82
function $bitex$view$ToolBarView$$($app$$3$$, $opt_domHelper$$13$$) {
  $bitex$view$View$$.call(this, $app$$3$$, $opt_domHelper$$13$$)
}
$goog$inherits$$($bitex$view$ToolBarView$$, $bitex$view$View$$);
$bitex$view$ToolBarView$$.prototype.$enterDocument$ = function $$bitex$view$ToolBarView$$$$$enterDocument$$() {
  $bitex$view$ToolBarView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$51$$ = this.$getHandler$(), $model$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, $model$$, "model_setBrokerCurrencies", function() {
    $model$$.get("IsBroker") || $model$$.get("BrokerCurrencies")
  });
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, $model$$, "model_setSecurityList", function() {
    $model$$.get("SecurityList")
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, $model$$, "model_setAllowedMarkets", function() {
    $model$$.get("AllowedMarkets")
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, $goog$dom$getElement$$("id_button_connect_ws"), "click", function() {
    this.dispatchEvent("connect_bitex")
  })
};
// Input 83
function $bitex$ui$OrderEntryX$$($opt_blinkDelay$$, $opt_domHelper$$14$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$14$$);
  this.$marketPrice_$ = 0;
  this.$lastChangedField_$ = "amount"
}
$goog$inherits$$($bitex$ui$OrderEntryX$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$OrderEntryX$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($dom$$8_element$$128$$) {
  this.$element_$ = $dom$$8_element$$128$$;
  $dom$$8_element$$128$$ = this.$getDomHelper$();
  this.$symbolEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-symbol", this.$getElement$());
  this.$sideEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-side", this.$getElement$());
  this.$typeEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-type", this.$getElement$());
  this.$actionButtonEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-action", this.$getElement$());
  this.$amountEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-amount", this.$getElement$());
  this.$priceEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-price", this.$getElement$());
  this.$totalEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-total", this.$getElement$());
  this.$feeEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-fee", this.$getElement$());
  this.$clientIdEl_$ = $dom$$8_element$$128$$.$getElementByClass$(this.$getBaseCssClass$() + "-client-id", this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$OrderEntryX$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$52$$ = this.$getHandler$();
  this.$getDomHelper$();
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$KeyHandler$$(this.$amountEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$KeyHandler$$(this.$priceEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$KeyHandler$$(this.$totalEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$KeyHandler$$(this.$feeEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$InputHandler$$(this.$amountEl_$), "input", this.$onChangeAmount_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$InputHandler$$(this.$priceEl_$), "input", this.$onChangePrice_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$InputHandler$$(this.$totalEl_$), "input", this.$onChangeTotal_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, new $goog$events$InputHandler$$(this.$feeEl_$), "input", this.$onChangeFee_$);
  $JSCompiler_StaticMethods_listen$$($handler$$52$$, this.$actionButtonEl_$, "click", this.$onAction_$)
};
$JSCompiler_prototypeAlias$$.$onBlockNonNumberKeys_$ = function $$JSCompiler_prototypeAlias$$$$onBlockNonNumberKeys_$$($e$$80$$) {
  var $inputEl$$ = $e$$80$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$);
  if(!$goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$80$$) && (38 == $e$$80$$.keyCode || 40 == $e$$80$$.keyCode)) {
    var $new_value$$1_startPos_value_to_change$$;
    $new_value$$1_startPos_value_to_change$$ = $inputEl$$.selectionStart;
    var $endPos$$1_originalStartPos$$ = $inputEl$$.selectionEnd;
    $new_value$$1_startPos_value_to_change$$ === $endPos$$1_originalStartPos$$ && 0 === $new_value$$1_startPos_value_to_change$$ ? ($new_value$$1_startPos_value_to_change$$ = $inputValue$$, $endPos$$1_originalStartPos$$ = $inputValue$$.length) : ("." === $inputValue$$.substr($new_value$$1_startPos_value_to_change$$ - 1, 1) && --$endPos$$1_originalStartPos$$, $new_value$$1_startPos_value_to_change$$ = $inputValue$$.substr(0, $endPos$$1_originalStartPos$$));
    var $match$$inline_411_number_of_decimal_places_originalEndPos$$;
    $match$$inline_411_number_of_decimal_places_originalEndPos$$ = ("" + $new_value$$1_startPos_value_to_change$$).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    $match$$inline_411_number_of_decimal_places_originalEndPos$$ = !$match$$inline_411_number_of_decimal_places_originalEndPos$$ ? 0 : Math.max(0, ($match$$inline_411_number_of_decimal_places_originalEndPos$$[1] ? $match$$inline_411_number_of_decimal_places_originalEndPos$$[1].length : 0) - ($match$$inline_411_number_of_decimal_places_originalEndPos$$[2] ? +$match$$inline_411_number_of_decimal_places_originalEndPos$$[2] : 0));
    var $value_to_add$$ = 1 / Math.pow(10, $match$$inline_411_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$);
    if(isNaN($new_value$$1_startPos_value_to_change$$)) {
      return
    }
    $new_value$$1_startPos_value_to_change$$ = 38 == $e$$80$$.keyCode ? $new_value$$1_startPos_value_to_change$$ + $value_to_add$$ : $new_value$$1_startPos_value_to_change$$ - $value_to_add$$;
    $new_value$$1_startPos_value_to_change$$ = (Math.round($new_value$$1_startPos_value_to_change$$ * Math.pow(10, $match$$inline_411_number_of_decimal_places_originalEndPos$$)) / Math.pow(10, $match$$inline_411_number_of_decimal_places_originalEndPos$$)).toFixed($match$$inline_411_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = "" + $new_value$$1_startPos_value_to_change$$ + $inputValue$$.substr($endPos$$1_originalStartPos$$);
    0 > $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$) && ($new_value$$1_startPos_value_to_change$$ = (0).toFixed($match$$inline_411_number_of_decimal_places_originalEndPos$$));
    $endPos$$1_originalStartPos$$ = $inputEl$$.selectionStart;
    $match$$inline_411_number_of_decimal_places_originalEndPos$$ = $inputEl$$.selectionEnd;
    $goog$dom$forms$setValue$$($inputEl$$, $new_value$$1_startPos_value_to_change$$);
    $inputValue$$.length == $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$, $inputEl$$.selectionEnd = $match$$inline_411_number_of_decimal_places_originalEndPos$$) : $inputValue$$.length > $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ - 1, $inputEl$$.selectionEnd = $match$$inline_411_number_of_decimal_places_originalEndPos$$ - 1) : ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ + 
    1, $inputEl$$.selectionEnd = $match$$inline_411_number_of_decimal_places_originalEndPos$$ + 1);
    switch($e$$80$$.target) {
      case this.$amountEl_$:
        this.$onChangeAmount_$();
        break;
      case this.$priceEl_$:
        this.$onChangePrice_$();
        break;
      case this.$totalEl_$:
        this.$onChangeTotal_$();
        break;
      case this.$feeEl_$:
        this.$onChangeFee_$()
    }
    $e$$80$$.preventDefault()
  }
  if(!$e$$80$$.ctrlKey && ($e$$80$$.shiftKey || !(48 <= $e$$80$$.keyCode && 57 >= $e$$80$$.keyCode || 96 <= $e$$80$$.keyCode && 105 >= $e$$80$$.keyCode)) && $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$80$$)) {
    switch($e$$80$$.keyCode) {
      case 46:
      ;
      case 8:
      ;
      case 9:
        return;
      case 110:
      ;
      case 190:
        if($inputEl$$ = $e$$80$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$), 0 > $inputValue$$.indexOf(".")) {
          return
        }
    }
    $e$$80$$.preventDefault()
  }
};
$JSCompiler_prototypeAlias$$.$getSymbol$ = function $$JSCompiler_prototypeAlias$$$$getSymbol$$() {
  return $goog$dom$forms$getValue$$(this.$symbolEl_$)
};
function $JSCompiler_StaticMethods_setAmountCurrencySign$$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$, $value$$98$$) {
  var $elements$$5$$ = $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getBaseCssClass$() + "-amount-sign", $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$5$$, function($el$$54$$) {
    $goog$dom$setTextContent$$($el$$54$$, $value$$98$$)
  })
}
function $JSCompiler_StaticMethods_setPriceCurrencySign$$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$, $value$$99$$) {
  var $elements$$6$$ = $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getBaseCssClass$() + "-price-sign", $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$6$$, function($el$$55$$) {
    $goog$dom$setTextContent$$($el$$55$$, $value$$99$$)
  })
}
$JSCompiler_prototypeAlias$$.$getClientID$ = function $$JSCompiler_prototypeAlias$$$$getClientID$$() {
  return $goog$dom$forms$getValue$$(this.$clientIdEl_$)
};
$JSCompiler_prototypeAlias$$.$getAmount$ = function $$JSCompiler_prototypeAlias$$$$getAmount$$() {
  var $inputValue$$1_res$$8$$ = $goog$dom$forms$getValue$$(this.$amountEl_$), $inputValue$$1_res$$8$$ = $goog$string$toNumber$$($inputValue$$1_res$$8$$);
  isNaN($inputValue$$1_res$$8$$) && ($inputValue$$1_res$$8$$ = 0);
  return $inputValue$$1_res$$8$$
};
function $JSCompiler_StaticMethods_getPrice$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$) {
  $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$.$priceEl_$);
  $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$);
  isNaN($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$) && ($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$ = 0);
  return $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$9$$
}
function $JSCompiler_StaticMethods_getTotal$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$) {
  $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$.$totalEl_$);
  $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$);
  isNaN($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$) && ($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$ = 0);
  return $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$10$$
}
function $JSCompiler_StaticMethods_getFee$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$) {
  $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$.$feeEl_$);
  $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$);
  isNaN($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$) && ($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$ = 0);
  return $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$11$$
}
$JSCompiler_prototypeAlias$$.$onChangeAmount_$ = function $$JSCompiler_prototypeAlias$$$$onChangeAmount_$$() {
  var $total$$ = $JSCompiler_StaticMethods_getPrice$$(this) * (this.$getAmount$() + $JSCompiler_StaticMethods_getFee$$(this));
  $goog$isNumber$$($total$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $total$$);
  this.$lastChangedField_$ = "amount";
  this.$actionButtonEl_$.disabled = 0 >= $JSCompiler_StaticMethods_getTotal$$(this)
};
$JSCompiler_prototypeAlias$$.$onChangePrice_$ = function $$JSCompiler_prototypeAlias$$$$onChangePrice_$$() {
  if("amount" === this.$lastChangedField_$) {
    var $amount_total$$1$$ = $JSCompiler_StaticMethods_getPrice$$(this) * (this.$getAmount$() + $JSCompiler_StaticMethods_getFee$$(this));
    $goog$isNumber$$($amount_total$$1$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $amount_total$$1$$)
  }else {
    0 < $JSCompiler_StaticMethods_getPrice$$(this) && ($amount_total$$1$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this), $goog$isNumber$$($amount_total$$1$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount_total$$1$$))
  }
  this.$actionButtonEl_$.disabled = 0 >= $JSCompiler_StaticMethods_getTotal$$(this)
};
$JSCompiler_prototypeAlias$$.$onChangeTotal_$ = function $$JSCompiler_prototypeAlias$$$$onChangeTotal_$$() {
  var $amount$$1$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this);
  $goog$isNumber$$($amount$$1$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount$$1$$);
  this.$lastChangedField_$ = "total";
  this.$actionButtonEl_$.disabled = 0 >= $JSCompiler_StaticMethods_getTotal$$(this)
};
$JSCompiler_prototypeAlias$$.$onChangeFee_$ = function $$JSCompiler_prototypeAlias$$$$onChangeFee_$$() {
  if("amount" === this.$lastChangedField_$) {
    var $amount$$2_total$$2$$ = $JSCompiler_StaticMethods_getPrice$$(this) * (this.$getAmount$() + $JSCompiler_StaticMethods_getFee$$(this));
    $goog$isNumber$$($amount$$2_total$$2$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $amount$$2_total$$2$$)
  }else {
    0 < $JSCompiler_StaticMethods_getPrice$$(this) && ($amount$$2_total$$2$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this), $goog$isNumber$$($amount$$2_total$$2$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount$$2_total$$2$$))
  }
  this.$actionButtonEl_$.disabled = 0 >= $JSCompiler_StaticMethods_getTotal$$(this)
};
$JSCompiler_prototypeAlias$$.$onAction_$ = function $$JSCompiler_prototypeAlias$$$$onAction_$$() {
  0 < $JSCompiler_StaticMethods_getTotal$$(this) && this.dispatchEvent("order_entry_submitted")
};
// Input 84
function $bitex$view$OfferBookView$$($app$$4$$, $opt_domHelper$$15$$) {
  $bitex$view$View$$.call(this, $app$$4$$, $opt_domHelper$$15$$);
  this.$client_order_id$ = this.$order_id_$ = this.$market_data_subscription_symbol_$ = this.$market_data_subscription_id_$ = this.$order_book_offer_$ = this.$order_book_bid_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$OfferBookView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$OfferBookView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  var $selected_symbol$$ = this.$app_$.$model_$.get("SelectedSymbol");
  $selected_symbol$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_recreateOrderBookComponents_$$(this, $selected_symbol$$)
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$$(this)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($buy_order_entry_element$$129$$) {
  this.$element_$ = $buy_order_entry_element$$129$$;
  $buy_order_entry_element$$129$$ = new $bitex$ui$OrderEntryX$$;
  var $sell_order_entry$$ = new $bitex$ui$OrderEntryX$$;
  $JSCompiler_StaticMethods_addChild$$(this, $buy_order_entry_element$$129$$);
  $JSCompiler_StaticMethods_addChild$$(this, $sell_order_entry$$);
  $buy_order_entry_element$$129$$.$decorate$($goog$dom$getElement$$("id_order_entry_buy"));
  $sell_order_entry$$.$decorate$($goog$dom$getElement$$("id_order_entry_sell"))
};
function $JSCompiler_StaticMethods_destroyOrderBookComponents_$$($JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$) {
  var $handler$$53$$ = $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$getHandler$();
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$.$dispose$());
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$.$dispose$());
  if($JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$ != $JSCompiler_alias_NULL$$) {
    var $conn$$ = $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$app_$.$conn_$;
    $JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBClear_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBDeleteOrdersThru_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBDeleteOrder_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBUpdateOrder_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$53$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBNewOrder_$);
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.dispatchEvent("md_unsubscribe");
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$ = $JSCompiler_alias_NULL$$;
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_symbol_$ = $JSCompiler_alias_NULL$$
  }
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$ = $JSCompiler_alias_NULL$$
}
function $JSCompiler_StaticMethods_recreateOrderBookComponents_$$($JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$, $selected_symbol$$1$$) {
  var $handler$$54$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$getHandler$(), $conn$$1_model$$2$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$app_$.$model_$;
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_symbol_$ !== $selected_symbol$$1$$.$symbol$ && ($JSCompiler_StaticMethods_destroyOrderBookComponents_$$($JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$ = new $bitex$ui$OrderBook$$($conn$$1_model$$2$$.get("Username"), $bitex$ui$OrderBook$Side$BUY$$, $selected_symbol$$1$$.$qty_currency$, $selected_symbol$$1$$.$price_currency$), 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$ = new $bitex$ui$OrderBook$$($conn$$1_model$$2$$.get("Username"), $bitex$ui$OrderBook$Side$SELL$$, $selected_symbol$$1$$.$qty_currency$, $selected_symbol$$1$$.$price_currency$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$.$decorate$($goog$dom$getElement$$("order_book_bid")), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$.$decorate$($goog$dom$getElement$$("order_book_offer")), 
  $JSCompiler_StaticMethods_listen$$($handler$$54$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$54$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onCancelOrder_$), 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$ = parseInt(1E7 * Math.random(), 10), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_symbol_$ = $selected_symbol$$1$$.$symbol$, $conn$$1_model$$2$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$app_$.$conn_$, $JSCompiler_StaticMethods_listen$$($handler$$54$$, $conn$$1_model$$2$$, $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBClear_$), $JSCompiler_StaticMethods_listen$$($handler$$54$$, $conn$$1_model$$2$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBDeleteOrdersThru_$), $JSCompiler_StaticMethods_listen$$($handler$$54$$, $conn$$1_model$$2$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + 
  "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBDeleteOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$54$$, $conn$$1_model$$2$$, $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBUpdateOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$54$$, 
  $conn$$1_model$$2$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBNewOrder_$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.dispatchEvent("md_subscribe"))
}
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$OfferBookView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$55$$ = this.$getHandler$(), $model$$3$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$55$$, $model$$3$$, "model_setSelectedSymbol", function() {
    var $selected_symbol$$2$$ = $model$$3$$.get("SelectedSymbol"), $symbol$$2_value$$inline_443$$ = $selected_symbol$$2$$.$symbol$, $buy_order_entry$$1_value$$inline_446$$ = this.$children_$ ? this.$children_$[0] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$, $sell_order_entry$$1$$ = this.$children_$ ? this.$children_$[1] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    $goog$dom$forms$setValue$$($buy_order_entry$$1_value$$inline_446$$.$symbolEl_$, $symbol$$2_value$$inline_443$$);
    $selected_symbol$$2$$.$qty_currency$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setAmountCurrencySign$$($buy_order_entry$$1_value$$inline_446$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $selected_symbol$$2$$.$price_currency$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setPriceCurrencySign$$($buy_order_entry$$1_value$$inline_446$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    $goog$dom$forms$setValue$$($sell_order_entry$$1$$.$symbolEl_$, $symbol$$2_value$$inline_443$$);
    $selected_symbol$$2$$.$qty_currency$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setAmountCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $selected_symbol$$2$$.$price_currency$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setPriceCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    var $market$$ = $JSCompiler_alias_NULL$$;
    $model$$3$$.get("AllowedMarkets") != $JSCompiler_alias_NULL$$ && ($market$$ = $model$$3$$.get("AllowedMarkets")[$symbol$$2_value$$inline_443$$]);
    $goog$style$showElement$$($sell_order_entry$$1$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_446$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $symbol$$2_value$$inline_443$$ = $model$$3$$.get("IsBroker");
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_446$$.$clientIdEl_$, $symbol$$2_value$$inline_443$$);
    $buy_order_entry$$1_value$$inline_446$$ = $model$$3$$.get("IsBroker");
    $goog$style$showElement$$($sell_order_entry$$1$$.$clientIdEl_$, $buy_order_entry$$1_value$$inline_446$$);
    $JSCompiler_StaticMethods_recreateOrderBookComponents_$$(this, $selected_symbol$$2$$)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onOBClear_$ = function $$JSCompiler_prototypeAlias$$$$onOBClear_$$() {
  this.$order_book_offer_$ != $JSCompiler_alias_NULL$$ && (this.$order_book_bid_$.clear(), this.$order_book_offer_$.clear())
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrdersThru_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrdersThru_$$($e$$88_index$$70$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$16_side$$2$$ = $e$$88_index$$70$$.data;
    $e$$88_index$$70$$ = $msg$$16_side$$2$$.MDEntryPositionNo;
    $msg$$16_side$$2$$ = $msg$$16_side$$2$$.MDEntryType;
    "0" == $msg$$16_side$$2$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_bid_$, $e$$88_index$$70$$) : "1" == $msg$$16_side$$2$$ && $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_offer_$, $e$$88_index$$70$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrder_$$($e$$89_index$$71$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$17_side$$3$$ = $e$$89_index$$71$$.data;
    $e$$89_index$$71$$ = $msg$$17_side$$3$$.MDEntryPositionNo - 1;
    $msg$$17_side$$3$$ = $msg$$17_side$$3$$.MDEntryType;
    "0" == $msg$$17_side$$3$$ ? $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_bid_$, $e$$89_index$$71$$) : "1" == $msg$$17_side$$3$$ && $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_offer_$, $e$$89_index$$71$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBUpdateOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBUpdateOrder_$$($e$$90_index$$72$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$18_side$$4$$ = $e$$90_index$$72$$.data;
    $e$$90_index$$72$$ = $msg$$18_side$$4$$.MDEntryPositionNo - 1;
    var $qty$$1$$ = $msg$$18_side$$4$$.MDEntrySize / 1E8, $msg$$18_side$$4$$ = $msg$$18_side$$4$$.MDEntryType;
    "0" == $msg$$18_side$$4$$ ? $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_bid_$, $e$$90_index$$72$$, $qty$$1$$) : "1" == $msg$$18_side$$4$$ && $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_offer_$, $e$$90_index$$72$$, $qty$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBNewOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBNewOrder_$$($e$$91_index$$73$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$19_side$$5$$ = $e$$91_index$$73$$.data;
    $e$$91_index$$73$$ = $msg$$19_side$$5$$.MDEntryPositionNo - 1;
    var $price$$1$$ = $msg$$19_side$$5$$.MDEntryPx / 1E8, $qty$$2$$ = $msg$$19_side$$5$$.MDEntrySize / 1E8, $username$$2$$ = $msg$$19_side$$5$$.Username, $broker$$1$$ = $msg$$19_side$$5$$.Broker, $orderId$$ = $msg$$19_side$$5$$.OrderID, $msg$$19_side$$5$$ = $msg$$19_side$$5$$.MDEntryType;
    "0" == $msg$$19_side$$5$$ ? this.$order_book_bid_$.$insertOrder$($e$$91_index$$73$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$) : "1" == $msg$$19_side$$5$$ && this.$order_book_offer_$.$insertOrder$($e$$91_index$$73$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$getMDInstruments$ = function $$JSCompiler_prototypeAlias$$$$getMDInstruments$$() {
  return[this.$market_data_subscription_symbol_$]
};
$JSCompiler_prototypeAlias$$.$getMDMarketDepth$ = $JSCompiler_returnArg$$(0);
$JSCompiler_prototypeAlias$$.$getMDEntries$ = function $$JSCompiler_prototypeAlias$$$$getMDEntries$$() {
  return["0", "1"]
};
$JSCompiler_prototypeAlias$$.$onCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onCancelOrder_$$($e$$92$$) {
  this.$order_id_$ = $e$$92$$.$order_id$;
  this.$client_order_id_$ = $e$$92$$.$client_order_id$;
  this.dispatchEvent("cancel_order")
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $bitex$view$OfferBookView$$.$superClass_$.$exitDocument$.call(this);
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$$(this)
};
// Input 85
function $bitex$ui$OrderManager$$($opt_blinkDelay$$1$$, $opt_domHelper$$16$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-id"
  }}, {property:"OrdStatus", label:"Situa\u00e7\u00e3o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$27$$) {
    return $bitex$ui$OrderManager$Status$$[$s$$27$$]
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-status"
  }}, {property:"Side", label:"C/V", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$28$$) {
    switch($s$$28$$) {
      case "1":
        return"Compra";
      case "2":
        return"Venda"
    }
    return""
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-side"
  }}, {property:"OrderQty", label:"Quantidade", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$29$$) {
    return($s$$29$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-qty"
  }}, {property:"Price", label:"Pre\u00e7o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$30$$) {
    return($s$$30$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-price"
  }}, {property:"LeavesQty", label:"Qty. Pendente", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$31$$) {
    return($s$$31$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-leaves_qty"
  }}, {property:"CumQty", label:"Qtc. Executada", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$32$$) {
    return($s$$32$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Pre\u00e7o M\u00e9dio", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$33$$) {
    return($s$$33$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-avg-price"
  }}, {property:"ClOrdID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, formatter:function($id$$8$$, $row_set_obj$$2$$) {
    var $attributes$$1_i$$131$$ = {"class":"icon-remove", "data-client-order-id":$id$$8$$};
    $row_set_obj$$2$$ != $JSCompiler_alias_NULL$$ && ($attributes$$1_i$$131$$["data-order-id"] = $row_set_obj$$2$$.OrderID);
    $attributes$$1_i$$131$$ = $goog$dom$createDom$$("i", $attributes$$1_i$$131$$);
    return $goog$dom$createDom$$("a", {"class":"text-error", href:"#"}, $attributes$$1_i$$131$$)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$16$$)
}
$goog$inherits$$($bitex$ui$OrderManager$$, $bitex$ui$DataGrid$$);
var $bitex$ui$OrderManager$Status$$ = {"-":"Pendente", 0:"Nova", 1:"Excec. Parcial", 2:"Excecutada", 4:"Cancelada"}, $bitex$ui$OrderManager$CSS_CLASS$$ = "order-manager";
$bitex$ui$OrderManager$$.prototype.$getCssClass$ = function $$bitex$ui$OrderManager$$$$$getCssClass$$() {
  return $bitex$ui$OrderManager$CSS_CLASS$$
};
$bitex$ui$OrderManager$$.prototype.$getRowClass$ = function $$bitex$ui$OrderManager$$$$$getRowClass$$($row_set$$5$$) {
  var $class_id$$ = "client-order-id-" + $row_set$$5$$.ClOrdID, $class_status$$2$$;
  switch($row_set$$5$$.OrdStatus) {
    case "-":
      $class_status$$2$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-pending";
      break;
    case "0":
      $class_status$$2$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-new";
      break;
    case "1":
      $class_status$$2$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-partial";
      break;
    case "2":
      $class_status$$2$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-fill";
      break;
    case "4":
      $class_status$$2$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-cancel"
  }
  return[$class_id$$, $class_status$$2$$]
};
$bitex$ui$OrderManager$$.prototype.$insertOrder$ = function $$bitex$ui$OrderManager$$$$$insertOrder$$($clientOrderId_tr_attributes$$, $dom$$12_status$$2$$, $side$$6_tr$$3$$, $orderQty$$, $price$$2$$, $leavesQty$$, $cumQty_opt_cumQty$$, $avgPx_opt_avgPrice$$, $opt_orderId_orderId$$1$$) {
  var $status_class_status_desc$$;
  switch($dom$$12_status$$2$$) {
    case "-":
      $status_class_status_desc$$ = this.$getCssClass$() + "-pending";
      break;
    case "0":
      $status_class_status_desc$$ = this.$getCssClass$() + "-new";
      break;
    case "1":
      $status_class_status_desc$$ = this.$getCssClass$() + "-partial";
      break;
    case "2":
      $status_class_status_desc$$ = this.$getCssClass$() + "-fill";
      break;
    case "4":
      $status_class_status_desc$$ = this.$getCssClass$() + "-cancel"
  }
  $clientOrderId_tr_attributes$$ = {id:"client_order_id_" + $clientOrderId_tr_attributes$$, "class":$status_class_status_desc$$};
  $orderQty$$ = ($orderQty$$ / 1E8).toFixed(8);
  $price$$2$$ = ($price$$2$$ / 1E8).toFixed(5);
  $leavesQty$$ = ($leavesQty$$ / 1E8).toFixed(8);
  $cumQty_opt_cumQty$$ = ($cumQty_opt_cumQty$$ | 0).toFixed(8);
  $avgPx_opt_avgPrice$$ = ($avgPx_opt_avgPrice$$ | 0).toFixed(5);
  $opt_orderId_orderId$$1$$ |= 0;
  $status_class_status_desc$$ = $bitex$ui$OrderManager$Status$$[$dom$$12_status$$2$$];
  $dom$$12_status$$2$$ = this.$getDomHelper$();
  $side$$6_tr$$3$$ = $dom$$12_status$$2$$.$createDom$("tr", $clientOrderId_tr_attributes$$, $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-id", "" + $opt_orderId_orderId$$1$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-status", "" + $status_class_status_desc$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-side", "" + $side$$6_tr$$3$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-order-qty", "" + $orderQty$$), $dom$$12_status$$2$$.$createDom$("td", 
  this.$getCssClass$() + "-price", "" + $price$$2$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-leaves-qty", "" + $leavesQty$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-cum-qty", "" + $cumQty_opt_cumQty$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-avg-px", "" + $avgPx_opt_avgPrice$$), $dom$$12_status$$2$$.$createDom$("td", this.$getCssClass$() + "-actions", $dom$$12_status$$2$$.$createDom$("a", {"class":"text-error", href:""}, $dom$$12_status$$2$$.$createDom$("i", 
  {"class":"icon-remove"}))));
  $dom$$12_status$$2$$.appendChild(this.$tbody_$, $side$$6_tr$$3$$)
};
$bitex$ui$OrderManager$$.prototype.$enterDocument$ = function $$bitex$ui$OrderManager$$$$$enterDocument$$() {
  $bitex$ui$OrderManager$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($client_order_id_e$$93$$) {
    var $order_id$$ = $client_order_id_e$$93$$.target.getAttribute("data-order-id");
    $order_id$$ != $JSCompiler_alias_NULL$$ ? this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $order_id$$)) : ($client_order_id_e$$93$$ = $client_order_id_e$$93$$.target.getAttribute("data-client-order-id"), this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $JSCompiler_alias_VOID$$, $client_order_id_e$$93$$)))
  })
};
function $bitex$ui$OrderManagerEvent$$($type$$104$$, $opt_order_id$$, $opt_client_order_id$$) {
  $goog$events$Event$$.call(this, $type$$104$$);
  this.$order_id$ = $opt_order_id$$;
  this.$client_order_id$ = $opt_client_order_id$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$OrderManager$CSS_CLASS$$, function() {
  return new $bitex$ui$OrderManager$$
});
// Input 86
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$130$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$130$$);
  return $element$$130$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$131$$) {
  return $element$$131$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$132$$, $className$$19$$, $enable$$2$$) {
  if($control$$1_element$$132$$ = $control$$1_element$$132$$.$getElement$ ? $control$$1_element$$132$$.$getElement$() : $control$$1_element$$132$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$132$$), $className$$19$$);
      $combinedClasses$$.push($className$$19$$);
      $goog$partial$$($enable$$2$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$132$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$2$$ ? $goog$dom$classes$add$$($control$$1_element$$132$$, $className$$19$$) : $goog$dom$classes$remove$$($control$$1_element$$132$$, $className$$19$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$134$$) {
  $element$$134$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$134$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$134$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$3$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$2$$ = $goog$dom$classes$get$$($element$$134$$);
  $goog$array$forEach$$($classNames$$2$$, function($className$$21_state$$inline_457$$) {
    if(!$hasRendererClassName$$ && $className$$21_state$$inline_457$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$21_state$$inline_457$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$12$$ = $state$$3$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_1050$$ = this.$classByState_$, $transposed$$inline_1051$$ = {}, $key$$inline_1052$$;
          for($key$$inline_1052$$ in $obj$$inline_1050$$) {
            $transposed$$inline_1051$$[$obj$$inline_1050$$[$key$$inline_1052$$]] = $key$$inline_1052$$
          }
          this.$stateByClass_$ = $transposed$$inline_1051$$
        }
        $className$$21_state$$inline_457$$ = parseInt(this.$stateByClass_$[$className$$21_state$$inline_457$$], 10);
        $state$$3$$ = $JSCompiler_temp_const$$12$$ | (isNaN($className$$21_state$$inline_457$$) ? 0 : $className$$21_state$$inline_457$$)
      }
    }
  }, this);
  $control$$3$$.$state_$ = $state$$3$$;
  $hasRendererClassName$$ || ($classNames$$2$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$2$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$3$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$2$$.push.apply($classNames$$2$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$2$$.push.apply($classNames$$2$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$134$$.className = $classNames$$2$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$134$$);
  return $element$$134$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$isRightToLeft$() && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$136$$) {
  $control$$5$$.$visible_$ || $goog$a11y$aria$setState$$($element$$136$$, "hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$136$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$136$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$136$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$136$$, 64, $control$$5$$.$isOpen$())
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$137$$, $allow$$) {
  var $unselectable$$inline_466_value$$inline_469$$ = !$allow$$, $descendants$$inline_468$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$137$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_466_value$$inline_469$$ = $unselectable$$inline_466_value$$inline_469$$ ? "none" : "", $element$$137$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_466_value$$inline_469$$, $descendants$$inline_468$$) {
      for(var $i$$inline_470$$ = 0, $descendant$$inline_471$$;$descendant$$inline_471$$ = $descendants$$inline_468$$[$i$$inline_470$$];$i$$inline_470$$++) {
        $descendant$$inline_471$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_466_value$$inline_469$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_466_value$$inline_469$$ = $unselectable$$inline_466_value$$inline_469$$ ? "on" : "", $element$$137$$.setAttribute("unselectable", $unselectable$$inline_466_value$$inline_469$$), $descendants$$inline_468$$) {
        for($i$$inline_470$$ = 0;$descendant$$inline_471$$ = $descendants$$inline_468$$[$i$$inline_470$$];$i$$inline_470$$++) {
          $descendant$$inline_471$$.setAttribute("unselectable", $unselectable$$inline_466_value$$inline_469$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$138$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$138$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
};
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($control$$6$$) {
  var $keyTarget$$;
  return $control$$6$$.$supportedStates_$ & 32 && ($keyTarget$$ = $control$$6$$.$getKeyEventTarget$()) ? $goog$dom$isFocusableTabIndex$$($keyTarget$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = function $$JSCompiler_prototypeAlias$$$$setFocusable$$($control$$7$$, $focusable$$) {
  var $keyTarget$$1$$;
  if($control$$7$$.$supportedStates_$ & 32 && ($keyTarget$$1$$ = $control$$7$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$7$$.$state_$ & 32) {
      try {
        $keyTarget$$1$$.blur()
      }catch($e$$94$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$139$$, $visible$$4$$) {
  $goog$style$showElement$$($element$$139$$, $visible$$4$$);
  $element$$139$$ && $goog$a11y$aria$setState$$($element$$139$$, "hidden", !$visible$$4$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$4$$, $enable$$4$$) {
  var $element$$140$$ = $control$$8$$.$getElement$();
  if($element$$140$$) {
    var $className$$22$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$4$$);
    $className$$22$$ && this.$enableClassName$($control$$8$$, $className$$22$$, $enable$$4$$);
    this.$updateAriaState$($element$$140$$, $state$$4$$, $enable$$4$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$141$$, $ariaState_state$$5$$, $enable$$5$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$5$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$5$$]) && $goog$a11y$aria$setState$$($element$$141$$, $ariaState_state$$5$$, $enable$$5$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$142$$, $content$$7$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$142$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$7$$)) {
    if($goog$isString$$($content$$7$$)) {
      $goog$dom$setTextContent$$($contentElem$$1$$, $content$$7$$)
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$16$$) {
        if($child$$16$$) {
          var $doc$$42$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$16$$) ? $doc$$42$$.createTextNode($child$$16$$) : $child$$16$$)
        }
      };
      $goog$isArray$$($content$$7$$) ? $goog$array$forEach$$($content$$7$$, $childHandler$$1$$) : $goog$isArrayLike$$($content$$7$$) && !("nodeType" in $content$$7$$) ? $goog$array$forEach$$($goog$array$toArray$$($content$$7$$), $childHandler$$1$$) : $childHandler$$1$$($content$$7$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_474$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$3$$ = [$cssClass_extraClassNames$$1_state$$inline_474$$], $classNames$$inline_475_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_475_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_474$$ && $classNames$$3$$.push($classNames$$inline_475_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_474$$ = $control$$10$$.$getState$();
  for($classNames$$inline_475_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_474$$;) {
    var $mask$$inline_476$$ = $cssClass_extraClassNames$$1_state$$inline_474$$ & -$cssClass_extraClassNames$$1_state$$inline_474$$;
    $classNames$$inline_475_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_476$$));
    $cssClass_extraClassNames$$1_state$$inline_474$$ &= ~$mask$$inline_476$$
  }
  $classNames$$3$$.push.apply($classNames$$3$$, $classNames$$inline_475_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_474$$ = $control$$10$$.$extraClassNames_$) && $classNames$$3$$.push.apply($classNames$$3$$, $cssClass_extraClassNames$$1_state$$inline_474$$);
  $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7") && $classNames$$3$$.push.apply($classNames$$3$$, $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$3$$));
  return $classNames$$3$$
}
function $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classes$$8$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$8$$ = $classes$$8$$.concat([$opt_includedClass$$]));
  $goog$array$forEach$$([], function($combo$$) {
    $goog$array$every$$($combo$$, $goog$partial$$($goog$array$contains$$, $classes$$8$$)) && (!$opt_includedClass$$ || $goog$array$contains$$($combo$$, $opt_includedClass$$)) && $toAdd$$.push($combo$$.join("_"))
  });
  return $toAdd$$
}
function $JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassForState$self$$, $state$$7$$) {
  $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_getClassForState$self$$);
  return $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$[$state$$7$$]
}
function $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_createClassByStateMap_$self$$) {
  var $baseClass$$ = $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$getCssClass$();
  $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$classByState_$ = {1:$baseClass$$ + "-disabled", 2:$baseClass$$ + "-hover", 4:$baseClass$$ + "-active", 8:$baseClass$$ + "-selected", 16:$baseClass$$ + "-checked", 32:$baseClass$$ + "-focused", 64:$baseClass$$ + "-open"}
}
;
// Input 87
// Input 88
// Input 89
function $goog$events$KeyHandler$$($opt_element$$12$$, $opt_capture$$8$$) {
  $goog$Disposable$$.call(this);
  $opt_element$$12$$ && $JSCompiler_StaticMethods_attach$$(this, $opt_element$$12$$, $opt_capture$$8$$)
}
$goog$inherits$$($goog$events$KeyHandler$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyPressKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyDownKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyUpKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$lastKey_$ = -1;
$JSCompiler_prototypeAlias$$.$keyCode_$ = -1;
$JSCompiler_prototypeAlias$$.$altKey_$ = $JSCompiler_alias_FALSE$$;
var $goog$events$KeyHandler$EventType$KEY$$ = "key", $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, 
F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$detectedMac_$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$95$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$95$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$95$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$95$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$95$$.ctrlKey && 17 != $e$$95$$.keyCode ? this.$lastKey_$ = 17 : $e$$95$$.altKey && 18 != $e$$95$$.keyCode ? this.$lastKey_$ = 18 : $e$$95$$.metaKey && 91 != $e$$95$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$95$$.keyCode, this.$lastKey_$, $e$$95$$.shiftKey, $e$$95$$.ctrlKey, $e$$95$$.altKey) ? this.handleEvent($e$$95$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$95$$.keyCode) : $e$$95$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$95$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$96$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$96$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$97_repeat$$) {
  var $be$$4_event$$4$$ = $e$$97_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$4_event$$4$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$97_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$4_event$$4$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$97_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$4_event$$4$$.charCode && 63232 > $be$$4_event$$4$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$4_event$$4$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$4_event$$4$$.keyCode : 0) : ($keyCode$$3$$ = $be$$4_event$$4$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$4_event$$4$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$87$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$4_event$$4$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$87$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$97_repeat$$.shiftKey && ($key$$87$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$87$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$97_repeat$$ = $key$$87$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$87$$;
  $be$$4_event$$4$$ = new $goog$events$KeyEvent$$($key$$87$$, $charCode$$, $e$$97_repeat$$, $be$$4_event$$4$$);
  $be$$4_event$$4$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$4_event$$4$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$144$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$144$$;
  $JSCompiler_StaticMethods_attach$self$$.$keyPressKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keypress", $JSCompiler_StaticMethods_attach$self$$, $opt_capture$$9$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyDownKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keydown", $JSCompiler_StaticMethods_attach$self$$.$handleKeyDown_$, $opt_capture$$9$$, $JSCompiler_StaticMethods_attach$self$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keyup", $JSCompiler_StaticMethods_attach$self$$.$handleKeyup_$, $opt_capture$$9$$, $JSCompiler_StaticMethods_attach$self$$)
}
$JSCompiler_prototypeAlias$$.detach = function $$JSCompiler_prototypeAlias$$$detach$() {
  this.$keyPressKey_$ && ($goog$events$unlistenByKey$$(this.$keyPressKey_$), $goog$events$unlistenByKey$$(this.$keyDownKey_$), $goog$events$unlistenByKey$$(this.$keyUpKey_$), this.$keyUpKey_$ = this.$keyDownKey_$ = this.$keyPressKey_$ = $JSCompiler_alias_NULL$$);
  this.$element_$ = $JSCompiler_alias_NULL$$;
  this.$keyCode_$ = this.$lastKey_$ = -1
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$KeyHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.detach()
};
function $goog$events$KeyEvent$$($keyCode$$4$$, $charCode$$1$$, $repeat$$1$$, $browserEvent$$1$$) {
  $browserEvent$$1$$ && this.init($browserEvent$$1$$, $JSCompiler_alias_VOID$$);
  this.type = $goog$events$KeyHandler$EventType$KEY$$;
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
// Input 90
function $goog$ui$Control$$($content$$8$$, $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$, $opt_domHelper$$17$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$17$$);
  if(!$JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$) {
    $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$ = this.constructor;
    for(var $key$$inline_485_rendererCtor$$inline_486$$;$JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$;) {
      $key$$inline_485_rendererCtor$$inline_486$$ = $goog$getUid$$($JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$);
      if($key$$inline_485_rendererCtor$$inline_486$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_485_rendererCtor$$inline_486$$]) {
        break
      }
      $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$ = $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$ = $key$$inline_485_rendererCtor$$inline_486$$ ? $goog$isFunction$$($key$$inline_485_rendererCtor$$inline_486$$.$getInstance$) ? $key$$inline_485_rendererCtor$$inline_486$$.$getInstance$() : new $key$$inline_485_rendererCtor$$inline_486$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$37_componentCtor$$inline_484_opt_renderer$$;
  this.$content_$ = $content$$8$$
}
$goog$inherits$$($goog$ui$Control$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Control$$.prototype;
$JSCompiler_prototypeAlias$$.$content_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$state_$ = 0;
$JSCompiler_prototypeAlias$$.$supportedStates_$ = 39;
$JSCompiler_prototypeAlias$$.$autoStates_$ = 255;
$JSCompiler_prototypeAlias$$.$statesWithTransitionEvents_$ = 0;
$JSCompiler_prototypeAlias$$.$visible_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$extraClassNames_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$handleMouseEvents_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$allowTextSelection_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$preferredAriaRole_$ = $JSCompiler_alias_NULL$$;
function $JSCompiler_StaticMethods_setHandleMouseEvents$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$inDocument_$ && $JSCompiler_alias_FALSE$$ != $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$() {
  return this.$renderer_$.$getKeyEventTarget$(this)
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$26$$, $enable$$7$$) {
  $enable$$7$$ ? $className$$26$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$26$$) || this.$extraClassNames_$.push($className$$26$$) : this.$extraClassNames_$ = [$className$$26$$], this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_TRUE$$)) : $className$$26$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$26$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $element$$145$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$145$$;
  var $ariaRole$$inline_513$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_513$$ && $element$$145$$.setAttribute("role", $ariaRole$$inline_513$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$145$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$145$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$146$$) {
  return this.$renderer_$.$canDecorate$($element$$146$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$147$$) {
  this.$element_$ = $element$$147$$ = this.$renderer_$.$decorate$(this, $element$$147$$);
  var $ariaRole$$inline_521$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_521$$ && $element$$147$$.setAttribute("role", $ariaRole$$inline_521$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$147$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$147$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  this.$renderer_$.$initializeDom$(this);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32)) {
    var $keyTarget$$2$$ = this.$getKeyEventTarget$();
    if($keyTarget$$2$$) {
      var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
      $JSCompiler_StaticMethods_attach$$($keyHandler$$, $keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyHandler$$, $goog$events$KeyHandler$EventType$KEY$$, this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$8$$) {
  var $handler$$57$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$148$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$8$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$148$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$148$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$148$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$148$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$148$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$148$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$148$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$148$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$148$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$148$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$148$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$148$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
}
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $goog$ui$Control$$.$superClass_$.$exitDocument$.call(this);
  this.$keyHandler_$ && this.$keyHandler_$.detach();
  this.$visible_$ && this.isEnabled() && this.$renderer_$.$setFocusable$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$ui$Control$$.$superClass_$.$disposeInternal$.call(this);
  this.$keyHandler_$ && (this.$keyHandler_$.$dispose$(), delete this.$keyHandler_$);
  delete this.$renderer_$;
  this.$extraClassNames_$ = this.$content_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($content$$9$$) {
  this.$renderer_$.$setContent$(this.$getElement$(), $content$$9$$);
  this.$content_$ = $content$$9$$
};
function $JSCompiler_StaticMethods_setContentInternal$$($JSCompiler_StaticMethods_setContentInternal$self$$, $content$$10$$) {
  $JSCompiler_StaticMethods_setContentInternal$self$$.$content_$ = $content$$10$$
}
function $JSCompiler_StaticMethods_getCaption$$($JSCompiler_StaticMethods_getCaption$self_content$$11$$) {
  $JSCompiler_StaticMethods_getCaption$self_content$$11$$ = $JSCompiler_StaticMethods_getCaption$self_content$$11$$.$content_$;
  return!$JSCompiler_StaticMethods_getCaption$self_content$$11$$ ? "" : ($goog$isString$$($JSCompiler_StaticMethods_getCaption$self_content$$11$$) ? $JSCompiler_StaticMethods_getCaption$self_content$$11$$ : $goog$isArray$$($JSCompiler_StaticMethods_getCaption$self_content$$11$$) ? $goog$array$map$$($JSCompiler_StaticMethods_getCaption$self_content$$11$$, $goog$dom$getRawTextContent$$).join("") : $goog$dom$getTextContent$$($JSCompiler_StaticMethods_getCaption$self_content$$11$$)).replace(/[\t\r\n ]+/g, 
  " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$3$$) {
  $goog$ui$Control$$.$superClass_$.$setRightToLeft$.call(this, $rightToLeft$$3$$);
  var $element$$149$$ = this.$getElement$();
  $element$$149$$ && this.$renderer_$.$setRightToLeft$($element$$149$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$150$$ = this.$getElement$();
  $element$$150$$ && this.$renderer_$.$setAllowTextSelection$($element$$150$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$5$$ && this.dispatchEvent($visible$$5$$ ? "show" : "hide")) {
    var $element$$151$$ = this.$getElement$();
    $element$$151$$ && this.$renderer_$.$setVisible$($element$$151$$, $visible$$5$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$5$$);
    this.$visible_$ = $visible$$5$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$9$$) {
  var $parent$$inline_527$$ = this.getParent();
  if((!$parent$$inline_527$$ || "function" != typeof $parent$$inline_527$$.isEnabled || $parent$$inline_527$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$9$$)) {
    $enable$$9$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$9$$), this.$setState$(1, !$enable$$9$$)
  }
};
function $JSCompiler_StaticMethods_setHighlighted$$($JSCompiler_StaticMethods_setHighlighted$self$$, $highlight$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setHighlighted$self$$, 2, $highlight$$) && $JSCompiler_StaticMethods_setHighlighted$self$$.$setState$(2, $highlight$$)
}
$JSCompiler_prototypeAlias$$.$isActive$ = function $$JSCompiler_prototypeAlias$$$$isActive$$() {
  return!!(this.$state_$ & 4)
};
$JSCompiler_prototypeAlias$$.setActive = function $$JSCompiler_prototypeAlias$$$setActive$($active$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 4, $active$$) && this.$setState$(4, $active$$)
};
$JSCompiler_prototypeAlias$$.$isOpen$ = function $$JSCompiler_prototypeAlias$$$$isOpen$$() {
  return!!(this.$state_$ & 64)
};
$JSCompiler_prototypeAlias$$.$getState$ = $JSCompiler_get$$("$state_$");
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$10$$, $enable$$10$$) {
  this.$supportedStates_$ & $state$$10$$ && $enable$$10$$ != !!(this.$state_$ & $state$$10$$) && (this.$renderer_$.$setState$(this, $state$$10$$, $enable$$10$$), this.$state_$ = $enable$$10$$ ? this.$state_$ | $state$$10$$ : this.$state_$ & ~$state$$10$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$(32, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ &= -33
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$14$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$14$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$14$$)
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$16$$, $enable$$13$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$16$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$16$$) != $enable$$13$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$16$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$16$$, $enable$$13$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$98$$) {
  (!$e$$98$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$98$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$99$$) {
  if((!$e$$99$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$99$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$101$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$101$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$101$$) && $e$$101$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$102$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$isActive$() && (this.$performActionInternal$($e$$102$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$103$$) {
  this.isEnabled() && this.$performActionInternal$($e$$103$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$104$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_530_open$$inline_536$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_530_open$$inline_536$$) && this.$setState$(16, $actionEvent_check$$inline_530_open$$inline_536$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_530_open$$inline_536$$ = !this.$isOpen$(), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_530_open$$inline_536$$) && this.$setState$(64, $actionEvent_check$$inline_530_open$$inline_536$$));
  $actionEvent_check$$inline_530_open$$inline_536$$ = new $goog$events$Event$$("action", this);
  $e$$104$$ && ($actionEvent_check$$inline_530_open$$inline_536$$.altKey = $e$$104$$.altKey, $actionEvent_check$$inline_530_open$$inline_536$$.ctrlKey = $e$$104$$.ctrlKey, $actionEvent_check$$inline_530_open$$inline_536$$.metaKey = $e$$104$$.metaKey, $actionEvent_check$$inline_530_open$$inline_536$$.shiftKey = $e$$104$$.shiftKey, $actionEvent_check$$inline_530_open$$inline_536$$.$platformModifierKey$ = $e$$104$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_530_open$$inline_536$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$107$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$107$$) ? ($e$$107$$.preventDefault(), $e$$107$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$108$$) {
  return 13 == $e$$108$$.keyCode && this.$performActionInternal$($e$$108$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_546$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_546$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 91
// Input 92
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$152$$, $state$$17$$, $enable$$14$$) {
  16 == $state$$17$$ ? $goog$a11y$aria$setState$$($element$$152$$, "pressed", $enable$$14$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$152$$, $state$$17$$, $enable$$14$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$9$$) {
  var $element$$153$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$9$$), $tooltip_value$$108$$ = $button$$9$$.$getTooltip$();
  $tooltip_value$$108$$ && this.$setTooltip$($element$$153$$, $tooltip_value$$108$$);
  ($tooltip_value$$108$$ = $button$$9$$.$getValue$()) && this.$setValue$($element$$153$$, $tooltip_value$$108$$);
  $button$$9$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$153$$, 16, !!($button$$9$$.$state_$ & 16));
  return $element$$153$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$10$$, $element$$154$$) {
  $element$$154$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$10$$, $element$$154$$);
  var $value$$inline_549$$ = this.$getValue$($element$$154$$);
  $button$$10$$.$value_$ = $value$$inline_549$$;
  $button$$10$$.$tooltip_$ = this.$getTooltip$($element$$154$$);
  $button$$10$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$154$$, 16, !!($button$$10$$.$state_$ & 16));
  return $element$$154$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$155$$) {
  return $element$$155$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$156$$, $tooltip$$1$$) {
  $element$$156$$ && ($element$$156$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 93
function $goog$ui$NativeButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$NativeButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$NativeButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$NativeButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$12$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$12$$);
  $button$$12$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$12$$);
  return $button$$12$$.$getDomHelper$().$createDom$("button", {"class":$JSCompiler_StaticMethods_getClassNames$$(this, $button$$12$$).join(" "), disabled:!$button$$12$$.isEnabled(), title:$button$$12$$.$getTooltip$() || "", value:$button$$12$$.$getValue$() || ""}, $JSCompiler_StaticMethods_getCaption$$($button$$12$$) || "")
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$157$$) {
  return"BUTTON" == $element$$157$$.tagName || "INPUT" == $element$$157$$.tagName && ("button" == $element$$157$$.type || "submit" == $element$$157$$.type || "reset" == $element$$157$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$13$$, $element$$158$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$13$$);
  $button$$13$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$13$$);
  $element$$158$$.disabled && $goog$dom$classes$add$$($element$$158$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$13$$, $element$$158$$)
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($button$$14$$) {
  $JSCompiler_StaticMethods_listen$$($button$$14$$.$getHandler$(), $button$$14$$.$getElement$(), "click", $button$$14$$.$performActionInternal$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($button$$15$$) {
  return $button$$15$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$16_element$$159$$, $state$$18$$, $enable$$15$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$16_element$$159$$, $state$$18$$, $enable$$15$$);
  if(($button$$16_element$$159$$ = $button$$16_element$$159$$.$getElement$()) && 1 == $state$$18$$) {
    $button$$16_element$$159$$.disabled = $enable$$15$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$160$$) {
  return $element$$160$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$161$$, $value$$109$$) {
  $element$$161$$ && ($element$$161$$.value = $value$$109$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 94
function $goog$ui$Button$$($content$$12$$, $opt_renderer$$1$$, $opt_domHelper$$18$$) {
  $goog$ui$Control$$.call(this, $content$$12$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$18$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$110$$) {
  this.$value_$ = $value$$110$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$110$$)
};
$JSCompiler_prototypeAlias$$.$getTooltip$ = $JSCompiler_get$$("$tooltip_$");
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($tooltip$$2$$) {
  this.$tooltip_$ = $tooltip$$2$$;
  this.$renderer_$.$setTooltip$(this.$getElement$(), $tooltip$$2$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$ui$Button$$.$superClass_$.$disposeInternal$.call(this);
  delete this.$value_$;
  delete this.$tooltip_$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Button$$.$superClass_$.$enterDocument$.call(this);
  if(this.$supportedStates_$ & 32) {
    var $keyTarget$$3$$ = this.$getKeyEventTarget$();
    $keyTarget$$3$$ && $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyTarget$$3$$, "keyup", this.$handleKeyEventInternal$)
  }
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$109$$) {
  return 13 == $e$$109$$.keyCode && $e$$109$$.type == $goog$events$KeyHandler$EventType$KEY$$ || 32 == $e$$109$$.keyCode && "keyup" == $e$$109$$.type ? this.$performActionInternal$($e$$109$$) : 32 == $e$$109$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 95
function $bitex$view$NullView$$($app$$5$$, $opt_domHelper$$19$$) {
  $bitex$view$View$$.call(this, $app$$5$$, $opt_domHelper$$19$$)
}
$goog$inherits$$($bitex$view$NullView$$, $bitex$view$View$$);
$bitex$view$NullView$$.prototype.$enterView$ = $JSCompiler_emptyFn$$();
$bitex$view$NullView$$.prototype.$exitView$ = $JSCompiler_emptyFn$$();
// Input 96
function $goog$json$parse$$($o$$1_s$$35$$) {
  $o$$1_s$$35$$ = String($o$$1_s$$35$$);
  if(/^\s*$/.test($o$$1_s$$35$$) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test($o$$1_s$$35$$.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + $o$$1_s$$35$$ + ")")
    }catch($ex$$9$$) {
    }
  }
  $JSCompiler_alias_THROW$$(Error("Invalid JSON string: " + $o$$1_s$$35$$))
}
function $goog$json$serialize$$($object$$5$$) {
  return(new $goog$json$Serializer$$($JSCompiler_alias_VOID$$)).serialize($object$$5$$)
}
function $goog$json$Serializer$$($opt_replacer$$2$$) {
  this.$replacer_$ = $opt_replacer$$2$$
}
$goog$json$Serializer$$.prototype.serialize = function $$goog$json$Serializer$$$$serialize$($object$$6$$) {
  var $sb$$6$$ = [];
  $JSCompiler_StaticMethods_serialize_$$(this, $object$$6$$, $sb$$6$$);
  return $sb$$6$$.join("")
};
function $JSCompiler_StaticMethods_serialize_$$($JSCompiler_StaticMethods_serialize_$self$$, $object$$7$$, $sb$$7$$) {
  switch(typeof $object$$7$$) {
    case "string":
      $JSCompiler_StaticMethods_serializeString_$$($object$$7$$, $sb$$7$$);
      break;
    case "number":
      $sb$$7$$.push(isFinite($object$$7$$) && !isNaN($object$$7$$) ? $object$$7$$ : "null");
      break;
    case "boolean":
      $sb$$7$$.push($object$$7$$);
      break;
    case "undefined":
      $sb$$7$$.push("null");
      break;
    case "object":
      if($object$$7$$ == $JSCompiler_alias_NULL$$) {
        $sb$$7$$.push("null");
        break
      }
      if($goog$isArray$$($object$$7$$)) {
        $JSCompiler_StaticMethods_serialize_$self$$.serializeArray($object$$7$$, $sb$$7$$);
        break
      }
      $sb$$7$$.push("{");
      var $sep$$inline_564$$ = "", $key$$inline_565$$;
      for($key$$inline_565$$ in $object$$7$$) {
        if(Object.prototype.hasOwnProperty.call($object$$7$$, $key$$inline_565$$)) {
          var $value$$inline_566$$ = $object$$7$$[$key$$inline_565$$];
          "function" != typeof $value$$inline_566$$ && ($sb$$7$$.push($sep$$inline_564$$), $JSCompiler_StaticMethods_serializeString_$$($key$$inline_565$$, $sb$$7$$), $sb$$7$$.push(":"), $JSCompiler_StaticMethods_serialize_$$($JSCompiler_StaticMethods_serialize_$self$$, $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$ ? $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$.call($object$$7$$, $key$$inline_565$$, $value$$inline_566$$) : $value$$inline_566$$, $sb$$7$$), $sep$$inline_564$$ = 
          ",")
        }
      }
      $sb$$7$$.push("}");
      break;
    case "function":
      break;
    default:
      $JSCompiler_alias_THROW$$(Error("Unknown type: " + typeof $object$$7$$))
  }
}
var $goog$json$Serializer$charToJsonCharCache_$$ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, $goog$json$Serializer$charsToReplace_$$ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function $JSCompiler_StaticMethods_serializeString_$$($s$$37$$, $sb$$8$$) {
  $sb$$8$$.push('"', $s$$37$$.replace($goog$json$Serializer$charsToReplace_$$, function($c$$1$$) {
    if($c$$1$$ in $goog$json$Serializer$charToJsonCharCache_$$) {
      return $goog$json$Serializer$charToJsonCharCache_$$[$c$$1$$]
    }
    var $cc$$2$$ = $c$$1$$.charCodeAt(0), $rv$$22$$ = "\\u";
    16 > $cc$$2$$ ? $rv$$22$$ += "000" : 256 > $cc$$2$$ ? $rv$$22$$ += "00" : 4096 > $cc$$2$$ && ($rv$$22$$ += "0");
    return $goog$json$Serializer$charToJsonCharCache_$$[$c$$1$$] = $rv$$22$$ + $cc$$2$$.toString(16)
  }), '"')
}
$goog$json$Serializer$$.prototype.serializeArray = function $$goog$json$Serializer$$$$serializeArray$($arr$$66$$, $sb$$10$$) {
  var $l$$24$$ = $arr$$66$$.length;
  $sb$$10$$.push("[");
  for(var $sep_value$$112$$ = "", $i$$132$$ = 0;$i$$132$$ < $l$$24$$;$i$$132$$++) {
    $sb$$10$$.push($sep_value$$112$$), $sep_value$$112$$ = $arr$$66$$[$i$$132$$], $JSCompiler_StaticMethods_serialize_$$(this, this.$replacer_$ ? this.$replacer_$.call($arr$$66$$, String($i$$132$$), $sep_value$$112$$) : $sep_value$$112$$, $sb$$10$$), $sep_value$$112$$ = ","
  }
  $sb$$10$$.push("]")
};
// Input 97
function $bitex$ui$Customers$$($opt_domHelper$$20$$) {
  this.$selected_customer_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-username"
  }}, {property:"Email", label:"Email", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-email"
  }}, {property:"Verified", label:"Verificado", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$38$$) {
    return $s$$38$$ ? "Sim" : "N\u00e3o"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-verified"
  }}, {property:"TwoFactorEnabled", label:"2 passos", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$39$$) {
    return $s$$39$$ ? "Sim" : "N\u00e3o"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-two-steps"
  }}, {property:"LastLogin", label:"\u00daltimo acesso", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}, {property:"ID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_TRUE$$, formatter:function($id$$9$$, $row_set_obj$$3$$) {
    var $data_row$$2$$ = $goog$json$serialize$$($row_set_obj$$3$$);
    return $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-deposit", "data-row":$data_row$$2$$}, "detalhes")
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}]}, $opt_domHelper$$20$$)
}
$goog$inherits$$($bitex$ui$Customers$$, $bitex$ui$DataGrid$$);
var $bitex$ui$Customers$CSS_CLASS$$ = "customers";
$bitex$ui$Customers$$.prototype.$getCssClass$ = function $$bitex$ui$Customers$$$$$getCssClass$$() {
  return $bitex$ui$Customers$CSS_CLASS$$
};
$bitex$ui$Customers$$.prototype.$getRowClass$ = function $$bitex$ui$Customers$$$$$getRowClass$$($row_set$$6$$) {
  return $row_set$$6$$.Verified ? $bitex$ui$Customers$CSS_CLASS$$ + "-verified" : $bitex$ui$Customers$CSS_CLASS$$ + "-non-verified"
};
$bitex$ui$Customers$$.prototype.$enterDocument$ = function $$bitex$ui$Customers$$$$$enterDocument$$() {
  $bitex$ui$Customers$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($e$$110$$) {
    this.$selected_customer_$ = $goog$json$parse$$($e$$110$$.target.getAttribute("data-row"));
    this.$selected_customer_$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent("detail")
  })
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$Customers$CSS_CLASS$$, function() {
  return new $bitex$ui$Customers$$
});
// Input 98
var $goog$i18n$NumberFormatSymbols$$ = {$DECIMAL_SEP$:".", $GROUP_SEP$:",", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", $MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"USD"}, $goog$i18n$NumberFormatSymbols$$ = {$DECIMAL_SEP$:",", $GROUP_SEP$:".", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", 
$MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"BRL"};
// Input 99
var $goog$i18n$currency$CurrencyInfo$$ = {AED:[2, "dh", "\u062f.\u0625.", "DH"], AUD:[2, "$", "AU$"], BDT:[2, "\u09f3", "Tk"], BRL:[2, "R$", "R$"], CAD:[2, "$", "C$"], CHF:[2, "CHF", "CHF"], CLP:[0, "$", "CL$"], CNY:[2, "\u00a5", "RMB\u00a5"], COP:[0, "$", "COL$"], CRC:[0, "\u20a1", "CR\u20a1"], CZK:[2, "K\u010d", "K\u010d"], DKK:[18, "kr", "kr"], DOP:[2, "$", "RD$"], EGP:[2, "\u00a3", "LE"], EUR:[18, "\u20ac", "\u20ac"], GBP:[2, "\u00a3", "GB\u00a3"], HKD:[2, "$", "HK$"], ILS:[2, "\u20aa", "IL\u20aa"], 
INR:[2, "\u20b9", "Rs"], ISK:[0, "kr", "kr"], JMD:[2, "$", "JA$"], JPY:[0, "\u00a5", "JP\u00a5"], KRW:[0, "\u20a9", "KR\u20a9"], LKR:[2, "Rs", "SLRs"], MNT:[0, "\u20ae", "MN\u20ae"], MXN:[2, "$", "Mex$"], MYR:[2, "RM", "RM"], NOK:[18, "kr", "NOkr"], PAB:[2, "B/.", "B/."], PEN:[2, "S/.", "S/."], PHP:[2, "\u20b1", "Php"], PKR:[0, "Rs", "PKRs."], RUB:[42, "\u0440\u0443\u0431.", "\u0440\u0443\u0431."], SAR:[2, "Rial", "Rial"], SEK:[2, "kr", "kr"], SGD:[2, "$", "S$"], THB:[2, "\u0e3f", "THB"], TRY:[2, 
"TL", "YTL"], TWD:[2, "NT$", "NT$"], USD:[2, "$", "US$"], UYU:[2, "$", "UY$"], VND:[0, "\u20ab", "VN\u20ab"], YER:[0, "Rial", "Rial"], ZAR:[2, "R", "ZAR"]};
// Input 100
function $goog$i18n$NumberFormat$$($JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$, $opt_currency_strParts$$inline_1025$$, $opt_currencyStyle_precision$$inline_1026$$) {
  this.$intlCurrencyCode_$ = $opt_currency_strParts$$inline_1025$$ || $goog$i18n$NumberFormatSymbols$$.$DEF_CURRENCY_CODE$;
  this.$currencyStyle_$ = $opt_currencyStyle_precision$$inline_1026$$ || $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$;
  this.$maximumIntegerDigits_$ = 40;
  this.$minimumIntegerDigits_$ = 1;
  this.$maximumFractionDigits_$ = 3;
  this.$minExponentDigits_$ = this.$minimumFractionDigits_$ = 0;
  this.$useSignForPositiveExponent_$ = $JSCompiler_alias_FALSE$$;
  this.$positiveSuffix_$ = this.$positivePrefix_$ = "";
  this.$negativePrefix_$ = "-";
  this.$negativeSuffix_$ = "";
  this.$multiplier_$ = 1;
  this.$groupingSize_$ = 3;
  this.$useExponentialNotation_$ = this.$decimalSeparatorAlwaysShown_$ = $JSCompiler_alias_FALSE$$;
  if("number" == typeof $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$) {
    switch($JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$) {
      case 1:
        $JSCompiler_StaticMethods_applyPattern_$$(this, $goog$i18n$NumberFormatSymbols$$.$DECIMAL_PATTERN$);
        break;
      case 2:
        $JSCompiler_StaticMethods_applyPattern_$$(this, $goog$i18n$NumberFormatSymbols$$.$SCIENTIFIC_PATTERN$);
        break;
      case 3:
        $JSCompiler_StaticMethods_applyPattern_$$(this, $goog$i18n$NumberFormatSymbols$$.$PERCENT_PATTERN$);
        break;
      case 4:
        $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$ = $goog$i18n$NumberFormatSymbols$$.$CURRENCY_PATTERN$;
        $opt_currency_strParts$$inline_1025$$ = ["0"];
        $opt_currencyStyle_precision$$inline_1026$$ = $goog$i18n$currency$CurrencyInfo$$[this.$intlCurrencyCode_$][0] & 7;
        if(0 < $opt_currencyStyle_precision$$inline_1026$$) {
          $opt_currency_strParts$$inline_1025$$.push(".");
          for(var $i$$inline_1027$$ = 0;$i$$inline_1027$$ < $opt_currencyStyle_precision$$inline_1026$$;$i$$inline_1027$$++) {
            $opt_currency_strParts$$inline_1025$$.push("0")
          }
        }
        $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$ = $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$.replace(/0.00/g, $opt_currency_strParts$$inline_1025$$.join(""));
        $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$);
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("Unsupported pattern type."))
    }
  }else {
    $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$932_pattern$$2_pattern$$inline_1024$$)
  }
}
var $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$ = 0;
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$) {
  $JSCompiler_StaticMethods_applyPattern_$self$$.$pattern_$ = $pattern$$3$$.replace(/ /g, "\u00a0");
  var $pos$$9$$ = [0];
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$9$$);
  for(var $trunkLen_trunkStart$$ = $pos$$9$$[0], $decimalPos$$inline_574$$ = -1, $digitLeftCount$$inline_575$$ = 0, $n$$inline_581_zeroDigitCount$$inline_576$$ = 0, $digitRightCount$$inline_577_totalDigits$$inline_582$$ = 0, $groupingCount$$inline_578$$ = -1, $len$$inline_579$$ = $pattern$$3$$.length, $loop$$inline_580$$ = $JSCompiler_alias_TRUE$$;$pos$$9$$[0] < $len$$inline_579$$ && $loop$$inline_580$$;$pos$$9$$[0]++) {
    switch($pattern$$3$$.charAt($pos$$9$$[0])) {
      case "#":
        0 < $n$$inline_581_zeroDigitCount$$inline_576$$ ? $digitRightCount$$inline_577_totalDigits$$inline_582$$++ : $digitLeftCount$$inline_575$$++;
        0 <= $groupingCount$$inline_578$$ && 0 > $decimalPos$$inline_574$$ && $groupingCount$$inline_578$$++;
        break;
      case "0":
        0 < $digitRightCount$$inline_577_totalDigits$$inline_582$$ && $JSCompiler_alias_THROW$$(Error('Unexpected "0" in pattern "' + $pattern$$3$$ + '"'));
        $n$$inline_581_zeroDigitCount$$inline_576$$++;
        0 <= $groupingCount$$inline_578$$ && 0 > $decimalPos$$inline_574$$ && $groupingCount$$inline_578$$++;
        break;
      case ",":
        $groupingCount$$inline_578$$ = 0;
        break;
      case ".":
        0 <= $decimalPos$$inline_574$$ && $JSCompiler_alias_THROW$$(Error('Multiple decimal separators in pattern "' + $pattern$$3$$ + '"'));
        $decimalPos$$inline_574$$ = $digitLeftCount$$inline_575$$ + $n$$inline_581_zeroDigitCount$$inline_576$$ + $digitRightCount$$inline_577_totalDigits$$inline_582$$;
        break;
      case "E":
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && $JSCompiler_alias_THROW$$(Error('Multiple exponential symbols in pattern "' + $pattern$$3$$ + '"'));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ = $JSCompiler_alias_TRUE$$;
        $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$ = 0;
        $pos$$9$$[0] + 1 < $len$$inline_579$$ && "+" == $pattern$$3$$.charAt($pos$$9$$[0] + 1) && ($pos$$9$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$useSignForPositiveExponent_$ = $JSCompiler_alias_TRUE$$);
        for(;$pos$$9$$[0] + 1 < $len$$inline_579$$ && "0" == $pattern$$3$$.charAt($pos$$9$$[0] + 1);) {
          $pos$$9$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$++
        }
        (1 > $digitLeftCount$$inline_575$$ + $n$$inline_581_zeroDigitCount$$inline_576$$ || 1 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$) && $JSCompiler_alias_THROW$$(Error('Malformed exponential pattern "' + $pattern$$3$$ + '"'));
        $loop$$inline_580$$ = $JSCompiler_alias_FALSE$$;
        break;
      default:
        $pos$$9$$[0]--, $loop$$inline_580$$ = $JSCompiler_alias_FALSE$$
    }
  }
  0 == $n$$inline_581_zeroDigitCount$$inline_576$$ && (0 < $digitLeftCount$$inline_575$$ && 0 <= $decimalPos$$inline_574$$) && ($n$$inline_581_zeroDigitCount$$inline_576$$ = $decimalPos$$inline_574$$, 0 == $n$$inline_581_zeroDigitCount$$inline_576$$ && $n$$inline_581_zeroDigitCount$$inline_576$$++, $digitRightCount$$inline_577_totalDigits$$inline_582$$ = $digitLeftCount$$inline_575$$ - $n$$inline_581_zeroDigitCount$$inline_576$$, $digitLeftCount$$inline_575$$ = $n$$inline_581_zeroDigitCount$$inline_576$$ - 
  1, $n$$inline_581_zeroDigitCount$$inline_576$$ = 1);
  (0 > $decimalPos$$inline_574$$ && 0 < $digitRightCount$$inline_577_totalDigits$$inline_582$$ || 0 <= $decimalPos$$inline_574$$ && ($decimalPos$$inline_574$$ < $digitLeftCount$$inline_575$$ || $decimalPos$$inline_574$$ > $digitLeftCount$$inline_575$$ + $n$$inline_581_zeroDigitCount$$inline_576$$) || 0 == $groupingCount$$inline_578$$) && $JSCompiler_alias_THROW$$(Error('Malformed pattern "' + $pattern$$3$$ + '"'));
  $digitRightCount$$inline_577_totalDigits$$inline_582$$ = $digitLeftCount$$inline_575$$ + $n$$inline_581_zeroDigitCount$$inline_576$$ + $digitRightCount$$inline_577_totalDigits$$inline_582$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ = 0 <= $decimalPos$$inline_574$$ ? $digitRightCount$$inline_577_totalDigits$$inline_582$$ - $decimalPos$$inline_574$$ : 0;
  0 <= $decimalPos$$inline_574$$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = $digitLeftCount$$inline_575$$ + $n$$inline_581_zeroDigitCount$$inline_576$$ - $decimalPos$$inline_574$$, 0 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = 0));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = (0 <= $decimalPos$$inline_574$$ ? $decimalPos$$inline_574$$ : $digitRightCount$$inline_577_totalDigits$$inline_582$$) - $digitLeftCount$$inline_575$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$maximumIntegerDigits_$ = $digitLeftCount$$inline_575$$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$, 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ && 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = 1));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$groupingSize_$ = Math.max(0, $groupingCount$$inline_578$$);
  $JSCompiler_StaticMethods_applyPattern_$self$$.$decimalSeparatorAlwaysShown_$ = 0 == $decimalPos$$inline_574$$ || $decimalPos$$inline_574$$ == $digitRightCount$$inline_577_totalDigits$$inline_582$$;
  $trunkLen_trunkStart$$ = $pos$$9$$[0] - $trunkLen_trunkStart$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$9$$);
  $pos$$9$$[0] < $pattern$$3$$.length && $pattern$$3$$.charAt($pos$$9$$[0]) == $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ ? ($pos$$9$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$9$$), $pos$$9$$[0] += $trunkLen_trunkStart$$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, 
  $pattern$$3$$, $pos$$9$$)) : ($JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ += $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$)
}
$goog$i18n$NumberFormat$$.prototype.parse = function $$goog$i18n$NumberFormat$$$$parse$($text$$10$$, $opt_pos$$) {
  var $pos$$10$$ = $opt_pos$$ || [0], $ret$$4_text$$inline_585$$ = NaN;
  $text$$10$$ = $text$$10$$.replace(/ /g, "\u00a0");
  var $gotPositive$$ = $text$$10$$.indexOf(this.$positivePrefix_$, $pos$$10$$[0]) == $pos$$10$$[0], $gotNegative$$ = $text$$10$$.indexOf(this.$negativePrefix_$, $pos$$10$$[0]) == $pos$$10$$[0];
  $gotPositive$$ && $gotNegative$$ && (this.$positivePrefix_$.length > this.$negativePrefix_$.length ? $gotNegative$$ = $JSCompiler_alias_FALSE$$ : this.$positivePrefix_$.length < this.$negativePrefix_$.length && ($gotPositive$$ = $JSCompiler_alias_FALSE$$));
  $gotPositive$$ ? $pos$$10$$[0] += this.$positivePrefix_$.length : $gotNegative$$ && ($pos$$10$$[0] += this.$negativePrefix_$.length);
  if($text$$10$$.indexOf($goog$i18n$NumberFormatSymbols$$.$INFINITY$, $pos$$10$$[0]) == $pos$$10$$[0]) {
    $pos$$10$$[0] += $goog$i18n$NumberFormatSymbols$$.$INFINITY$.length, $ret$$4_text$$inline_585$$ = Infinity
  }else {
    for(var $ret$$4_text$$inline_585$$ = $text$$10$$, $sawDecimal$$inline_587$$ = $JSCompiler_alias_FALSE$$, $sawExponent$$inline_588$$ = $JSCompiler_alias_FALSE$$, $sawDigit$$inline_589$$ = $JSCompiler_alias_FALSE$$, $scale$$inline_590$$ = 1, $decimal$$inline_591$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$inline_592$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $exponentChar$$inline_593$$ = $goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$, $normalizedText$$inline_594$$ = "";$pos$$10$$[0] < 
    $ret$$4_text$$inline_585$$.length;$pos$$10$$[0]++) {
      var $ch$$inline_595$$ = $ret$$4_text$$inline_585$$.charAt($pos$$10$$[0]), $digit$$inline_596$$ = $JSCompiler_StaticMethods_getDigit_$$($ch$$inline_595$$);
      if(0 <= $digit$$inline_596$$ && 9 >= $digit$$inline_596$$) {
        $normalizedText$$inline_594$$ += $digit$$inline_596$$, $sawDigit$$inline_589$$ = $JSCompiler_alias_TRUE$$
      }else {
        if($ch$$inline_595$$ == $decimal$$inline_591$$.charAt(0)) {
          if($sawDecimal$$inline_587$$ || $sawExponent$$inline_588$$) {
            break
          }
          $normalizedText$$inline_594$$ += ".";
          $sawDecimal$$inline_587$$ = $JSCompiler_alias_TRUE$$
        }else {
          if($ch$$inline_595$$ == $grouping$$inline_592$$.charAt(0) && ("\u00a0" != $grouping$$inline_592$$.charAt(0) || $pos$$10$$[0] + 1 < $ret$$4_text$$inline_585$$.length && 0 <= $JSCompiler_StaticMethods_getDigit_$$($ret$$4_text$$inline_585$$.charAt($pos$$10$$[0] + 1)))) {
            if($sawDecimal$$inline_587$$ || $sawExponent$$inline_588$$) {
              break
            }
          }else {
            if($ch$$inline_595$$ == $exponentChar$$inline_593$$.charAt(0)) {
              if($sawExponent$$inline_588$$) {
                break
              }
              $normalizedText$$inline_594$$ += "E";
              $sawExponent$$inline_588$$ = $JSCompiler_alias_TRUE$$
            }else {
              if("+" == $ch$$inline_595$$ || "-" == $ch$$inline_595$$) {
                $normalizedText$$inline_594$$ += $ch$$inline_595$$
              }else {
                if($ch$$inline_595$$ == $goog$i18n$NumberFormatSymbols$$.$PERCENT$.charAt(0)) {
                  if(1 != $scale$$inline_590$$) {
                    break
                  }
                  $scale$$inline_590$$ = 100;
                  if($sawDigit$$inline_589$$) {
                    $pos$$10$$[0]++;
                    break
                  }
                }else {
                  if($ch$$inline_595$$ == $goog$i18n$NumberFormatSymbols$$.$PERMILL$.charAt(0)) {
                    if(1 != $scale$$inline_590$$) {
                      break
                    }
                    $scale$$inline_590$$ = 1E3;
                    if($sawDigit$$inline_589$$) {
                      $pos$$10$$[0]++;
                      break
                    }
                  }else {
                    break
                  }
                }
              }
            }
          }
        }
      }
    }
    $ret$$4_text$$inline_585$$ = parseFloat($normalizedText$$inline_594$$) / $scale$$inline_590$$
  }
  if($gotPositive$$) {
    if($text$$10$$.indexOf(this.$positiveSuffix_$, $pos$$10$$[0]) != $pos$$10$$[0]) {
      return NaN
    }
    $pos$$10$$[0] += this.$positiveSuffix_$.length
  }else {
    if($gotNegative$$) {
      if($text$$10$$.indexOf(this.$negativeSuffix_$, $pos$$10$$[0]) != $pos$$10$$[0]) {
        return NaN
      }
      $pos$$10$$[0] += this.$negativeSuffix_$.length
    }
  }
  return $gotNegative$$ ? -$ret$$4_text$$inline_585$$ : $ret$$4_text$$inline_585$$
};
$goog$i18n$NumberFormat$$.prototype.$format$ = function $$goog$i18n$NumberFormat$$$$$format$$($number_number$$inline_599$$) {
  if(isNaN($number_number$$inline_599$$)) {
    return $goog$i18n$NumberFormatSymbols$$.$NAN$
  }
  var $parts$$3$$ = [], $isNegative$$ = 0 > $number_number$$inline_599$$ || 0 == $number_number$$inline_599$$ && 0 > 1 / $number_number$$inline_599$$;
  $parts$$3$$.push($isNegative$$ ? this.$negativePrefix_$ : this.$positivePrefix_$);
  if(isFinite($number_number$$inline_599$$)) {
    if($number_number$$inline_599$$ = $number_number$$inline_599$$ * ($isNegative$$ ? -1 : 1) * this.$multiplier_$, this.$useExponentialNotation_$) {
      if(0 == $number_number$$inline_599$$) {
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_599$$, this.$minimumIntegerDigits_$, $parts$$3$$), $JSCompiler_StaticMethods_addExponentPart_$$(this, 0, $parts$$3$$)
      }else {
        var $exponent$$inline_601$$ = Math.floor(Math.log($number_number$$inline_599$$) / Math.log(10));
        $number_number$$inline_599$$ /= Math.pow(10, $exponent$$inline_601$$);
        var $minIntDigits$$inline_602$$ = this.$minimumIntegerDigits_$;
        if(1 < this.$maximumIntegerDigits_$ && this.$maximumIntegerDigits_$ > this.$minimumIntegerDigits_$) {
          for(;0 != $exponent$$inline_601$$ % this.$maximumIntegerDigits_$;) {
            $number_number$$inline_599$$ *= 10, $exponent$$inline_601$$--
          }
          $minIntDigits$$inline_602$$ = 1
        }else {
          1 > this.$minimumIntegerDigits_$ ? ($exponent$$inline_601$$++, $number_number$$inline_599$$ /= 10) : ($exponent$$inline_601$$ -= this.$minimumIntegerDigits_$ - 1, $number_number$$inline_599$$ *= Math.pow(10, this.$minimumIntegerDigits_$ - 1))
        }
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_599$$, $minIntDigits$$inline_602$$, $parts$$3$$);
        $JSCompiler_StaticMethods_addExponentPart_$$(this, $exponent$$inline_601$$, $parts$$3$$)
      }
    }else {
      $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_599$$, this.$minimumIntegerDigits_$, $parts$$3$$)
    }
  }else {
    $parts$$3$$.push($goog$i18n$NumberFormatSymbols$$.$INFINITY$)
  }
  $parts$$3$$.push($isNegative$$ ? this.$negativeSuffix_$ : this.$positiveSuffix_$);
  return $parts$$3$$.join("")
};
function $JSCompiler_StaticMethods_subformatFixed_$$($JSCompiler_StaticMethods_subformatFixed_$self$$, $i$$135_intValue_number$$1$$, $fracPart_minIntDigits$$, $parts$$4$$) {
  var $fracLen_power$$ = Math.pow(10, $JSCompiler_StaticMethods_subformatFixed_$self$$.$maximumFractionDigits_$), $shiftedNumber_translatableInt_zeroCode$$ = Math.round($i$$135_intValue_number$$1$$ * $fracLen_power$$), $fracValue$$;
  isFinite($shiftedNumber_translatableInt_zeroCode$$) ? ($i$$135_intValue_number$$1$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ / $fracLen_power$$), $fracValue$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ - $i$$135_intValue_number$$1$$ * $fracLen_power$$)) : $fracValue$$ = 0;
  for(var $fractionPresent$$ = 0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ || 0 < $fracValue$$, $intPart$$ = "", $shiftedNumber_translatableInt_zeroCode$$ = $i$$135_intValue_number$$1$$;1E20 < $shiftedNumber_translatableInt_zeroCode$$;) {
    $intPart$$ = "0" + $intPart$$, $shiftedNumber_translatableInt_zeroCode$$ = Math.round($shiftedNumber_translatableInt_zeroCode$$ / 10)
  }
  var $intPart$$ = $shiftedNumber_translatableInt_zeroCode$$ + $intPart$$, $decimal$$1$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$1$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $shiftedNumber_translatableInt_zeroCode$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$.charCodeAt(0), $digitLen$$ = $intPart$$.length;
  if(0 < $i$$135_intValue_number$$1$$ || 0 < $fracPart_minIntDigits$$) {
    for($i$$135_intValue_number$$1$$ = $digitLen$$;$i$$135_intValue_number$$1$$ < $fracPart_minIntDigits$$;$i$$135_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
    }
    for($i$$135_intValue_number$$1$$ = 0;$i$$135_intValue_number$$1$$ < $digitLen$$;$i$$135_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $intPart$$.charAt($i$$135_intValue_number$$1$$))), 1 < $digitLen$$ - $i$$135_intValue_number$$1$$ && (0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$ && 1 == ($digitLen$$ - $i$$135_intValue_number$$1$$) % $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$) && $parts$$4$$.push($grouping$$1$$)
    }
  }else {
    $fractionPresent$$ || $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
  }
  ($JSCompiler_StaticMethods_subformatFixed_$self$$.$decimalSeparatorAlwaysShown_$ || $fractionPresent$$) && $parts$$4$$.push($decimal$$1$$);
  $fracPart_minIntDigits$$ = "" + ($fracValue$$ + $fracLen_power$$);
  for($fracLen_power$$ = $fracPart_minIntDigits$$.length;"0" == $fracPart_minIntDigits$$.charAt($fracLen_power$$ - 1) && $fracLen_power$$ > $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ + 1;) {
    $fracLen_power$$--
  }
  for($i$$135_intValue_number$$1$$ = 1;$i$$135_intValue_number$$1$$ < $fracLen_power$$;$i$$135_intValue_number$$1$$++) {
    $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $fracPart_minIntDigits$$.charAt($i$$135_intValue_number$$1$$)))
  }
}
function $JSCompiler_StaticMethods_addExponentPart_$$($JSCompiler_StaticMethods_addExponentPart_$self$$, $exponent_exponentDigits$$, $parts$$5$$) {
  $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$);
  0 > $exponent_exponentDigits$$ ? ($exponent_exponentDigits$$ = -$exponent_exponentDigits$$, $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$MINUS_SIGN$)) : $JSCompiler_StaticMethods_addExponentPart_$self$$.$useSignForPositiveExponent_$ && $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$PLUS_SIGN$);
  $exponent_exponentDigits$$ = "" + $exponent_exponentDigits$$;
  for(var $zeroChar$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$, $i$$136$$ = $exponent_exponentDigits$$.length;$i$$136$$ < $JSCompiler_StaticMethods_addExponentPart_$self$$.$minExponentDigits_$;$i$$136$$++) {
    $parts$$5$$.push($zeroChar$$)
  }
  $parts$$5$$.push($exponent_exponentDigits$$)
}
function $JSCompiler_StaticMethods_getDigit_$$($ch$$4_code$$4$$) {
  $ch$$4_code$$4$$ = $ch$$4_code$$4$$.charCodeAt(0);
  if(48 <= $ch$$4_code$$4$$ && 58 > $ch$$4_code$$4$$) {
    return $ch$$4_code$$4$$ - 48
  }
  var $zeroCode$$1$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$.charCodeAt(0);
  return $zeroCode$$1$$ <= $ch$$4_code$$4$$ && $ch$$4_code$$4$$ < $zeroCode$$1$$ + 10 ? $ch$$4_code$$4$$ - $zeroCode$$1$$ : -1
}
var $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ = ";";
function $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_parseAffix_$self$$, $pattern$$4$$, $pos$$12$$) {
  for(var $affix$$ = "", $inQuote$$ = $JSCompiler_alias_FALSE$$, $len$$3$$ = $pattern$$4$$.length;$pos$$12$$[0] < $len$$3$$;$pos$$12$$[0]++) {
    var $ch$$5_currencyCode$$inline_604$$ = $pattern$$4$$.charAt($pos$$12$$[0]);
    if("'" == $ch$$5_currencyCode$$inline_604$$) {
      $pos$$12$$[0] + 1 < $len$$3$$ && "'" == $pattern$$4$$.charAt($pos$$12$$[0] + 1) ? ($pos$$12$$[0]++, $affix$$ += "'") : $inQuote$$ = !$inQuote$$
    }else {
      if($inQuote$$) {
        $affix$$ += $ch$$5_currencyCode$$inline_604$$
      }else {
        switch($ch$$5_currencyCode$$inline_604$$) {
          case "#":
          ;
          case "0":
          ;
          case ",":
          ;
          case ".":
          ;
          case $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$:
            return $affix$$;
          case "\u00a4":
            if($pos$$12$$[0] + 1 < $len$$3$$ && "\u00a4" == $pattern$$4$$.charAt($pos$$12$$[0] + 1)) {
              $pos$$12$$[0]++, $affix$$ += $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$
            }else {
              switch($JSCompiler_StaticMethods_parseAffix_$self$$.$currencyStyle_$) {
                case $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$:
                  $affix$$ += $goog$i18n$currency$CurrencyInfo$$[$JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$][1];
                  break;
                case 2:
                  var $ch$$5_currencyCode$$inline_604$$ = $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$, $info$$inline_605$$ = $goog$i18n$currency$CurrencyInfo$$[$ch$$5_currencyCode$$inline_604$$], $affix$$ = $affix$$ + ($ch$$5_currencyCode$$inline_604$$ == $info$$inline_605$$[1] ? $ch$$5_currencyCode$$inline_604$$ : $ch$$5_currencyCode$$inline_604$$ + " " + $info$$inline_605$$[1]);
                  break;
                case 1:
                  $affix$$ += $goog$i18n$currency$CurrencyInfo$$[$JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$][2]
              }
            }
            break;
          case "%":
            1 != $JSCompiler_StaticMethods_parseAffix_$self$$.$multiplier_$ && $JSCompiler_alias_THROW$$(Error("Too many percent/permill"));
            $JSCompiler_StaticMethods_parseAffix_$self$$.$multiplier_$ = 100;
            $affix$$ += $goog$i18n$NumberFormatSymbols$$.$PERCENT$;
            break;
          case "\u2030":
            1 != $JSCompiler_StaticMethods_parseAffix_$self$$.$multiplier_$ && $JSCompiler_alias_THROW$$(Error("Too many percent/permill"));
            $JSCompiler_StaticMethods_parseAffix_$self$$.$multiplier_$ = 1E3;
            $affix$$ += $goog$i18n$NumberFormatSymbols$$.$PERMILL$;
            break;
          default:
            $affix$$ += $ch$$5_currencyCode$$inline_604$$
        }
      }
    }
  }
  return $affix$$
}
;
// Input 101
function $bitex$ui$OrderBook$$($username$$3$$, $side$$7$$, $qtyCurrencyDef$$, $priceCurrencyDef$$, $opt_blinkDelay$$2$$, $opt_domHelper$$21$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$21$$);
  this.$blink_delay_$ = $opt_blinkDelay$$2$$ || 700;
  this.$qtyCurrencyDef_$ = $qtyCurrencyDef$$;
  this.$priceCurrencyDef_$ = $priceCurrencyDef$$;
  this.$username_$ = $username$$3$$;
  this.$side_$ = $side$$7$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
var $bitex$ui$OrderBook$Side$BUY$$ = "0", $bitex$ui$OrderBook$Side$SELL$$ = "1", $bitex$ui$OrderBook$EventType$CANCEL$$ = "cancel";
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$162$$) {
  this.$element_$ = $element$$162$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_610$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_610$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$162$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$111$$) {
  var $cxlEl_orderId$$2$$ = $e$$111$$.target;
  if("A" == $cxlEl_orderId$$2$$.tagName || "I" == $cxlEl_orderId$$2$$.tagName) {
    $cxlEl_orderId$$2$$ = $cxlEl_orderId$$2$$.getAttribute("data-order-id"), $cxlEl_orderId$$2$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$($bitex$ui$OrderBook$EventType$CANCEL$$, $cxlEl_orderId$$2$$)), $e$$111$$.preventDefault(), $e$$111$$.stopPropagation())
  }
};
function $bitex$ui$OrderBookEvent$$($type$$105$$, $orderId$$3$$) {
  $goog$events$Event$$.call(this, $type$$105$$);
  this.$order_id$ = $orderId$$3$$
}
$goog$inherits$$($bitex$ui$OrderBookEvent$$, $goog$events$Event$$);
$bitex$ui$OrderBook$$.prototype.clear = function $$bitex$ui$OrderBook$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_deleteOrderThru$$($JSCompiler_StaticMethods_deleteOrderThru$self$$, $index$$74$$) {
  $JSCompiler_StaticMethods_deleteOrderThru$self$$.$getDomHelper$();
  for(var $child$$17$$;($child$$17$$ = $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.firstChild) && 0 < $index$$74$$;) {
    $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.removeChild($child$$17$$), $index$$74$$--
  }
}
function $JSCompiler_StaticMethods_deleteOrder$$($JSCompiler_StaticMethods_deleteOrder$self$$, $index$$75$$) {
  var $dom$$16$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $dom$$16$$.$getChildren$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$75$$];
  $dom$$16$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$76_trEl$$1$$, $qty$$3$$) {
  var $dom$$17$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $qty$$3$$ = (new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.$format$, $JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.code)).$format$($qty$$3$$);
  $index$$76_trEl$$1$$ = $dom$$17$$.$getChildren$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$76_trEl$$1$$];
  var $tdQtyEl$$ = $dom$$17$$.$getChildren$($index$$76_trEl$$1$$)[1];
  $dom$$17$$.$setTextContent$($tdQtyEl$$, $qty$$3$$);
  $goog$dom$classes$add$$($tdQtyEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, "warning")
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
$bitex$ui$OrderBook$$.prototype.$insertOrder$ = function $$bitex$ui$OrderBook$$$$$insertOrder$$($index$$77$$, $id$$10$$, $price$$3_priceEl$$, $qty$$4_qtyEl$$, $td_list_userNameEl_username$$4$$, $broker$$2$$) {
  var $dom$$18$$ = this.$getDomHelper$(), $formatter$$5$$ = new $goog$i18n$NumberFormat$$(this.$qtyCurrencyDef_$.$format$, this.$qtyCurrencyDef_$.code);
  $qty$$4_qtyEl$$ = $formatter$$5$$.$format$($qty$$4_qtyEl$$);
  $formatter$$5$$ = new $goog$i18n$NumberFormat$$(this.$priceCurrencyDef_$.$format$, this.$priceCurrencyDef_$.code);
  $price$$3_priceEl$$ = $formatter$$5$$.$format$($price$$3_priceEl$$);
  $price$$3_priceEl$$ = $dom$$18$$.$createDom$("td", this.$getBaseCssClass$() + "-price", $price$$3_priceEl$$);
  $qty$$4_qtyEl$$ = $dom$$18$$.$createDom$("td", this.$getBaseCssClass$() + "-qty", $qty$$4_qtyEl$$);
  $td_list_userNameEl_username$$4$$ = $td_list_userNameEl_username$$4$$ === this.$username_$ || $broker$$2$$ === this.$username_$ ? $dom$$18$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$18$$.$createDom$("a", {"class":"btn-cancel-order text-error", href:"", "data-order-id":$id$$10$$}, $dom$$18$$.$createDom$("i", {"class":"icon-remove", style:"line-height: 2px;", "data-order-id":$id$$10$$}, "  " + $td_list_userNameEl_username$$4$$))) : $dom$$18$$.$createDom$("td", this.$getBaseCssClass$() + 
  "-username", $td_list_userNameEl_username$$4$$);
  this.$side_$ == $bitex$ui$OrderBook$Side$BUY$$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$4$$, this.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price$$3_priceEl$$, this.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$4$$ = [$td_list_userNameEl_username$$4$$, $qty$$4_qtyEl$$, $price$$3_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$4$$, this.$getBaseCssClass$() + "-right"), $goog$dom$classes$add$$($price$$3_priceEl$$, this.$getBaseCssClass$() + 
  "-left"), $td_list_userNameEl_username$$4$$ = [$price$$3_priceEl$$, $qty$$4_qtyEl$$, $td_list_userNameEl_username$$4$$]);
  var $rowEl$$ = $dom$$18$$.$createDom$("tr", {"data-order-id":$id$$10$$, "class":this.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$4$$);
  $dom$$18$$.$insertChildAt$(this.$bodyEl_$, $rowEl$$, $index$$77$$);
  $goog$dom$classes$add$$($rowEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, "warning")
  }, this.$blink_delay_$, this)
};
// Input 102
function $bitex$view$AccountActivityView$$($app$$6$$, $opt_domHelper$$22$$) {
  $bitex$view$View$$.call(this, $app$$6$$, $opt_domHelper$$22$$);
  this.$request_order_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$AccountActivityView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$AccountActivityView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  this.$destroyComponents_$()
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$59$$ = this.$getHandler$();
  this.$account_activity_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$59$$, this.$account_activity_table_$, "request_data", this.$onAccountActivityTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$59$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, this.$onOrderListResponse_$), this.$account_activity_table_$.$dispose$());
  this.$request_order_id_$ = this.$account_activity_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$60$$ = this.$getHandler$();
  this.$destroyComponents_$();
  this.$request_order_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$56$$ = $goog$dom$getElement$$("id_trade_history_table");
  this.$account_activity_table_$ = new $bitex$ui$AccountActivity$$;
  $JSCompiler_StaticMethods_listen$$($handler$$60$$, this.$account_activity_table_$, "request_data", this.$onAccountActivityTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$60$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ + "." + this.$request_order_id_$, this.$onOrderListResponse_$);
  this.$account_activity_table_$.$decorate$($el$$56$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "Price", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "AvgPx", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "Volume", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "CumQty", this.$qtyFormatter_$, this)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$114$$, $rowSet$$2$$) {
  return this.$app_$.$formatCurrency$($value$$114$$ / 1E8, this.$app_$.$getPriceCurrencyFromSymbol$($rowSet$$2$$.Symbol))
};
$JSCompiler_prototypeAlias$$.$qtyFormatter_$ = function $$JSCompiler_prototypeAlias$$$$qtyFormatter_$$($value$$115$$, $rowSet$$3$$) {
  return this.$app_$.$formatCurrency$($value$$115$$ / 1E8, this.$app_$.$getQtyCurrencyFromSymbol$($rowSet$$3$$.Symbol))
};
$JSCompiler_prototypeAlias$$.$onAccountActivityTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onAccountActivityTableRequestData_$$($e$$112$$) {
  this.$app_$.$conn_$.$requestOrderList$(this.$request_order_id_$, $e$$112$$.options.Page, $e$$112$$.options.Limit, ["1", "2"])
};
$JSCompiler_prototypeAlias$$.$onOrderListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onOrderListResponse_$$($e$$113_msg$$20$$) {
  this.$account_activity_table_$ != $JSCompiler_alias_NULL$$ && ($e$$113_msg$$20$$ = $e$$113_msg$$20$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$account_activity_table_$, $e$$113_msg$$20$$.OrdListGrp, $e$$113_msg$$20$$.Columns))
};
// Input 103
// Input 104
// Input 105
// Input 106
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$(8);
// Input 107
// Input 108
// Input 109
function $soy$$0$0escapeHtml$$($value$$116$$) {
  return"object" === typeof $value$$116$$ && $value$$116$$ && 0 === $value$$116$$.$contentKind$ ? $value$$116$$.content : String($value$$116$$).replace($soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$, $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$)
}
var $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
function $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$($ch$$10$$) {
  return $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$[$ch$$10$$]
}
var $soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$ = /[\x00\x22\x26\x27\x3c\x3e]/g;
// Input 110
function $bitex$templates$BrokerConfirmDepositContent$$($opt_data$$5_output$$3$$) {
  return $opt_data$$5_output$$3$$ = "" + ('<form class="form-horizontal broker-confirm-deposit"><div class="control-group"><label class="control-label">N\u00famero de controle</label><div class="controls"><label class="control-label" style="text-align: left;">' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$controlNumber$) + '</label></div></div><div class="control-group"><label class="control-label">Valor pago</label><div class="controls"><div class="input-prepend"><span class="add-on">' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$currencySign$) + 
  '</span><input id="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$id_value$) + '" type="text" class="input-small" size="16" name="PaidValue" value="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.value) + '"></div></div></div><div class="control-group"><label class="control-label">Taxas:</label><div class="controls"><div class="row-fluid"><div class="span4"><div class="input-append"><input id="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$percentFeeID$) + '" type="text" class="input-mini" size="16" name="Fee" value="' + 
  $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$percentFee$) + '"><span class="add-on">%</span></div></div><div class="span4"><div class="input-prepend"><span class="add-on">' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$currencySign$) + '</span><input id="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$fixedFeeID$) + '" type="text" class="input-mini" size="16" name="Fee" value="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$fixedFee$) + '"></div></div><div class="span4"><label id="' + 
  $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$totalFeesID$) + '" class="control-label broker-confirm-deposit-fee" style="text-align: left;"></label></div></div></div></div><div class="control-group"><label class="control-label">Valor l\u00edquido</label><div class="controls"><label id="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$netValueID$) + '" class="control-label broker-confirm-deposit-net-amount" style="text-align: left;"></label></div></div></form>')
}
function $bitex$templates$BrokerView$$($opt_data$$6$$) {
  var $output$$4$$;
  $output$$4$$ = "" + ('<div class="section-title"><h3>Meu corretor</h3></div><div class="content"><address><strong>' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.BusinessName) + "</strong><br/>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Address) + "<br/>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.City) + ", " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.State) + " " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.ZipCode) + " - " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Country) + 
  '<br/><abbr title="Telefone">Tel:</abbr>' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.PhoneNumber1) + " " + ($opt_data$$6$$.$msg_broker$.PhoneNumber2 ? ", $msg_broker['PhoneNumber2']" : "") + "<br/>Skype: " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Skype) + '<br/><a href="mailto:' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Email) + '" target="_blank">' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Email) + '</a></address><h4>Taxas</h4><table class="table table-bordered"><thead><tr><th>Opera\u00e7\u00e3o</th><th>Taxa</th><th>Termos</th></tr></thead><tbody>');
  $output$$4$$ = $opt_data$$6$$.$msg_broker$.TransactionFeeBuy == $opt_data$$6$$.$msg_broker$.TransactionFeeSell ? $output$$4$$ + ("<tr><td>Taxa de trade</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeBuy) + "</td><td></td></tr>") : $output$$4$$ + ("<tr><td>Taxa de trade - compra</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeBuy) + "</td><td></td></tr><tr><td>Taxa de trade - venda</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeSell) + 
  " %</td><td></td></tr>");
  for(var $crypto_currenciesList148_feeList120$$ = $opt_data$$6$$.$msg_broker$.FeeStructure, $crypto_currenciesListLen148_feeListLen120$$ = $crypto_currenciesList148_feeList120$$.length, $crypto_currenciesIndex148_feeIndex120$$ = 0;$crypto_currenciesIndex148_feeIndex120$$ < $crypto_currenciesListLen148_feeListLen120$$;$crypto_currenciesIndex148_feeIndex120$$++) {
    var $crypto_currenciesData148_feeData120$$ = $crypto_currenciesList148_feeList120$$[$crypto_currenciesIndex148_feeIndex120$$];
    $output$$4$$ += "<tr><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData148_feeData120$$.Operation) + "</td><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData148_feeData120$$.Fee) + "</td><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData148_feeData120$$.Terms) + "</td></tr>"
  }
  $output$$4$$ += '</tbody></table><h4>Carteiras</h4><table class="table table-bordered"><thead><tr><th>Moeda</th><th>Tipo</th><th>Endere\u00e7o</th><th>Multi-assinatura</th><th>Ger\u00eanciada por</th></tr></thead><tbody>';
  $crypto_currenciesList148_feeList120$$ = $opt_data$$6$$.$msg_broker$.CryptoCurrencies;
  $crypto_currenciesListLen148_feeListLen120$$ = $crypto_currenciesList148_feeList120$$.length;
  for($crypto_currenciesIndex148_feeIndex120$$ = 0;$crypto_currenciesIndex148_feeIndex120$$ < $crypto_currenciesListLen148_feeListLen120$$;$crypto_currenciesIndex148_feeIndex120$$++) {
    for(var $crypto_currenciesData148_feeData120$$ = $crypto_currenciesList148_feeList120$$[$crypto_currenciesIndex148_feeIndex120$$], $walletsList149$$ = $crypto_currenciesData148_feeData120$$.Wallets, $walletsListLen149$$ = $walletsList149$$.length, $walletsIndex149$$ = 0;$walletsIndex149$$ < $walletsListLen149$$;$walletsIndex149$$++) {
      var $walletsData149$$ = $walletsList149$$[$walletsIndex149$$];
      $output$$4$$ += "<tr><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData148_feeData120$$.CurrencyDescription) + "</td><td>" + $soy$$0$0escapeHtml$$($walletsData149$$.type) + "</td><td>" + ("BTC" == $crypto_currenciesData148_feeData120$$.CurrencyCode ? '<a href="https://blockchain.info/address/' + $soy$$0$0escapeHtml$$($walletsData149$$.address) + '/" target="_blank">' + $soy$$0$0escapeHtml$$($walletsData149$$.address) + "</a>" : $soy$$0$0escapeHtml$$($walletsData149$$.address)) + "</td><td>";
      $output$$4$$ = $walletsData149$$.multisig ? $output$$4$$ + "Sim" : $output$$4$$ + "N\u00e3o";
      $output$$4$$ += "</td><td>" + $soy$$0$0escapeHtml$$($walletsData149$$.managed_by) + "</td></tr>"
    }
  }
  return $output$$4$$ += '</tbody></table><h4>Termos de servi\u00e7o</h4><iframe style="width:100%;height:400px;" src="' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TosUrl) + '"></iframe></div>'
}
function $bitex$templates$CancelDepositDialogContent$$() {
  var $output$$5$$;
  return $output$$5$$ = "" + ('<p>Informe a raz\u00e3o do cancelamento do dep\u00f3sito</p><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="' + $soy$$0$0escapeHtml$$("id_select_reason") + '" >Raz\u00e3o:</label><div class="controls"><select id="' + $soy$$0$0escapeHtml$$("id_select_reason") + '"><option value=0 selected>Outro</option></select></div></div><div class="control-group"><div class="controls"><textarea id="' + $soy$$0$0escapeHtml$$("id_custom_reason_text") + 
  '" rows="2" style=""></textarea></div></div></fieldset></form>')
}
function $bitex$templates$CancelWithdrawDialogContent$$() {
  var $output$$6$$;
  return $output$$6$$ = "" + ('<p>Informe a raz\u00e3o do cancelamento do pedido de saque</p><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="' + $soy$$0$0escapeHtml$$("id_select_reason") + '" >Raz\u00e3o:</label><div class="controls"><select id="' + $soy$$0$0escapeHtml$$("id_select_reason") + '"><option value=0>Outro</option><option value=-1 selected>Saldo insuficiente</option><option value=-2>Conta n\u00e3o \u00e9 verificada</option><option value=-3>Suspeita de fraude</option><option value=-4>Pedindo o saque para uma conta diferente da sua</option><option value=-5>Carteira inv\u00e1lida</option><option value=-6>Dados banc\u00e1rios inv\u00e1lidos</option><option value=-7>Ultrapassou o limite di\u00e1rio de saque</option></select></div></div><div class="control-group"><div class="controls"><textarea id="' + 
  $soy$$0$0escapeHtml$$("id_custom_reason_text") + '" rows="2" style="display:none;"></textarea></div></div></fieldset></form>')
}
function $bitex$templates$GoogleAuthenticationCodeDialogContent$$() {
  var $output$$7$$;
  return $output$$7$$ = "" + ('C\u00f3digo do Google Authenticator: <input id="' + $soy$$0$0escapeHtml$$("id_second_factor") + '" placeholder="ex. 555555" size="10">')
}
function $bitex$templates$WithdrawConfirmationDialogContent$$() {
  var $output$$8$$;
  return $output$$8$$ = "" + ('<p>N\u00f3s enviamos um c\u00f3digo de confirma\u00e7\u00e3o para o seu email.</p><input id="' + $soy$$0$0escapeHtml$$("id_withdraw_confirmation") + '" placeholder="C\u00f3digo de confirma\u00e7\u00e3o" class="input-block-level"><p><i>Esta \u00e9 uma medida para aumentar a seguran\u00e7a de sua conta</i></p>')
}
function $bitex$templates$YourAccountSummary$$($currencyList265_opt_data$$11$$) {
  var $output$$9$$;
  $output$$9$$ = '<h6>Sua conta</h6><table class="data"><tbody>';
  $currencyList265_opt_data$$11$$ = $currencyList265_opt_data$$11$$.$currencies$;
  for(var $currencyListLen265$$ = $currencyList265_opt_data$$11$$.length, $currencyIndex265$$ = 0;$currencyIndex265$$ < $currencyListLen265$$;$currencyIndex265$$++) {
    $output$$9$$ += '<tr><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyList265_opt_data$$11$$[$currencyIndex265$$]) + '" data-blink-class="balance-info-blink"></span></td></tr>'
  }
  return $output$$9$$ + "</tbody></table>"
}
function $bitex$templates$AccountBalances$$($opt_data$$12$$) {
  for(var $output$$10$$ = '<table class="table table-striped" style="width: 350px"><tbody>', $currencyList273$$ = $opt_data$$12$$.$currencies$, $currencyListLen273$$ = $currencyList273$$.length, $currencyIndex273$$ = 0;$currencyIndex273$$ < $currencyListLen273$$;$currencyIndex273$$++) {
    var $currencyData273$$ = $currencyList273$$[$currencyIndex273$$], $MSG_UNNAMED_1062$$ = $soy$$0$0escapeHtml$$($currencyData273$$) + " dispon\u00edvel", $output$$10$$ = $output$$10$$ + ("<tr><td><strong>" + $MSG_UNNAMED_1062$$ + '</strong></td><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyData273$$) + '" data-blink-class="balance-info-blink"></span></td>');
    "deposit" == $opt_data$$12$$.action && ($output$$10$$ += '<td><button class="btn btn-mini" data-action="deposit"  data-currency="' + $soy$$0$0escapeHtml$$($currencyData273$$) + '"><i data-action="deposit"  data-currency="' + $soy$$0$0escapeHtml$$($currencyData273$$) + '" class="icon-plus"/> Depositar</button></td>');
    "withdraw" == $opt_data$$12$$.action && ($output$$10$$ += '<td><button class="btn btn-mini" data-action="withdraw" data-currency="' + $soy$$0$0escapeHtml$$($currencyData273$$) + '"><i data-action="withdraw" data-currency="' + $soy$$0$0escapeHtml$$($currencyData273$$) + '" class="icon-minus"/> Sacar</button></td>');
    $output$$10$$ += "</tr>"
  }
  return $output$$10$$ + "</tbody></table>"
}
function $bitex$templates$WaitingForDepositResponseDialogContent$$() {
  return'<div class="row-fluid" data-deposit-status="processing"><h5 class="text-center">Processando o dep\u00f3sito...</h5></div><div class="row-fluid"><div class="span6 offset3"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>'
}
function $bitex$templates$DepositCryptoCurrencyContentDialog$$($opt_data$$14_output$$12$$) {
  return $opt_data$$14_output$$12$$ = "" + ('<div class="row-fluid" data-deposit-status="prepare"><h4 class="text-center">' + $soy$$0$0escapeHtml$$($opt_data$$14_output$$12$$.$deposit_message$.Data.InputAddress) + '</h4><div class="text-center"><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=' + $soy$$0$0escapeHtml$$($opt_data$$14_output$$12$$.$deposit_message$.Data.InputAddress) + '"/></div><p class="text-center"> Powered by <a href="https://blockchain.info/api/api_receive/" target="_blank">https://blockchain.info/api/api_receive</a></p></div>')
}
function $bitex$templates$CryptoCurrencyQRContentDialog$$($opt_data$$15_output$$13$$) {
  return $opt_data$$15_output$$13$$ = "" + ('<div class="row-fluid" data-deposit-status="prepare"><h4 class="text-center">' + $soy$$0$0escapeHtml$$($opt_data$$15_output$$13$$.data.Wallet) + '</h4><div class="text-center"><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=$data[\'Wallet\']"/></div><p class="text-center"> Powered by <a href="https://blockchain.info/api/api_receive/" target="_blank">https://blockchain.info/api/api_receive</a></p></div>')
}
function $bitex$templates$ConfirmDepositCryptoCurrencyContentDialog$$($MSG_UNNAMED_1076_opt_data$$16$$) {
  var $output$$14$$ = "";
  $MSG_UNNAMED_1076_opt_data$$16$$ = "Ser\u00e1 criado um endere\u00e7o de " + ($soy$$0$0escapeHtml$$($MSG_UNNAMED_1076_opt_data$$16$$.$currencydescription$) + " \u00fanico e exclusivo que ser\u00e1 v\u00e1lido somente para este dep\u00f3sito.");
  return $output$$14$$ + ('<div class="row-fluid" data-deposit-status="confirm"><h3 class="text-center"> IMPORTANTE! </h3><h4 class="text-center">' + $MSG_UNNAMED_1076_opt_data$$16$$ + '</h4><h3 class="text-center"> Voc\u00ea entendeu? </h3><br/><br/></div>')
}
function $bitex$templates$DepositSlipContentDialog$$($opt_data$$17_output$$15$$) {
  return $opt_data$$17_output$$15$$ = "" + ('<div class="row-fluid" data-deposit-status="done"></div><div class="row-fluid"><div class="span12 text-center">Voc\u00ea pode <a  target="_blank" href="/get_deposit?deposit_id=' + $soy$$0$0escapeHtml$$($opt_data$$17_output$$15$$.$deposit_id$) + '" class="btn btn-primary"> Imprimir </a> ou <a href="/get_deposit?download=1&deposit_id=' + $soy$$0$0escapeHtml$$($opt_data$$17_output$$15$$.$deposit_id$) + '"> Baixar </a> o boleto com as instru\u00e7\u00f5es para dep\u00f3sito</div></div>')
}
function $bitex$templates$FeesFormControls$$($opt_data$$18_output$$16$$) {
  return $opt_data$$18_output$$16$$ = "" + ('<div class="control-group"><label class="control-label">Taxas:</label><div class="controls"><div class="row-fluid"><div class="span3"><div class="input-append"><input id="' + $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$percentFeeID$) + '" type="text" class="input-mini" size="16"  style="width: 40px;" name="PercentFee" value="' + $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$percentFee$ / 100) + '"><span class="add-on">%</span></div><span style="font-style: italic;">percentual</span></div><div class="span1" style="margin-top: 4px;margin-bottom: -4px;"><span style="font-weight: bold;">+</span></div><div class="span3"><div class="input-prepend"><span class="add-on">' + 
  $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$currencySign$) + '</span><input id="' + $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$fixedFeeID$) + '" type="text" class="input-mini" size="16" style="width: 40px;" name="FixedFee" value="' + $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$fixedFee$ / 1E8) + '"></div><span style="font-style: italic;">fixo</span></div><div class="span1" style="margin-top: 4px;margin-bottom: -4px;"><span style="font-weight: bold;">=</span></div><div class="span4"><label id="' + 
  $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$totalFeesID$) + '" class="control-label" style="text-align: left;"></label></div></div></div></div><div class="control-group"><label class="control-label">Valor l\u00edquido</label><div class="controls"><label id="' + $soy$$0$0escapeHtml$$($opt_data$$18_output$$16$$.$netValueID$) + '" class="control-label" style="text-align: left;"></label></div></div>')
}
function $bitex$templates$FeesForm$$($opt_data$$19_output$$17$$) {
  return $opt_data$$19_output$$17$$ = "" + ('<form class="form-horizontal" data-deposit-status="prepare"><input type="hidden" name="Currency" value="' + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$currency$) + '"><input id="' + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$amountID$) + '" type="hidden" name="Amount" value="' + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$amount$ / 1E8) + '"><div class="control-group"><label class="control-label">Valor solicitado</label><div class="controls"><label class="control-label" style="text-align: left;">' + 
  $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$formattedAmount$) + "</label></div></div>" + $bitex$templates$FeesFormControls$$($opt_data$$19_output$$17$$))
}
function $bitex$templates$DepositWithdrawDialogContent$$($opt_data$$20$$) {
  var $output$$18$$ = '<form class="form-horizontal" data-deposit-status="prepare"><input type="hidden" name="Currency" value="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$currency$) + '">' + ("client" == $opt_data$$20$$.$side$ ? '<div class="control-group"><label class="control-label">Amount</label><div class="controls"><div class="input-prepend"><span class="add-on">' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$currencySign$) + '</span><input id="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$amountID$) + 
  '" type="text" class="input-small" size="16" name="Amount"></div></div></div>' : '<input id="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$amountID$) + '" type="hidden" name="Amount" value="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$amount$ / 1E8) + '">');
  if(!$opt_data$$20$$.$force_method$) {
    if(1 < $opt_data$$20$$.$methods$.length) {
      for(var $output$$18$$ = $output$$18$$ + ('<div class="control-group"><label class="control-label">Method</label><div class="controls"><select id="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$methodID$) + '" name="Method" class="withdraw-method-selector">'), $methodList434_methodList459_methodList479$$ = $opt_data$$20$$.$methods$, $methodListLen434_methodListLen459_methodListLen479$$ = $methodList434_methodList459_methodList479$$.length, $methodIndex434_methodIndex459_methodIndex479$$ = 0;$methodIndex434_methodIndex459_methodIndex479$$ < 
      $methodListLen434_methodListLen459_methodListLen479$$;$methodIndex434_methodIndex459_methodIndex479$$++) {
        var $fieldList590_methodData434_methodData459_methodData479$$ = $methodList434_methodList459_methodList479$$[$methodIndex434_methodIndex459_methodIndex479$$], $output$$18$$ = $output$$18$$ + ("<option " + (0 == $methodIndex434_methodIndex459_methodIndex479$$ ? "selected" : "") + ' value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + '" data-net-value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + 
        "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$netValueID$) + '" data-percent-fee="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$percentFeeID$) + '" data-fixed-fee="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$fixedFeeID$) + '">' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.description) + 
        "</option>")
      }
      $output$$18$$ += "</select></div></div>"
    }else {
      $methodList434_methodList459_methodList479$$ = $opt_data$$20$$.$methods$;
      $methodListLen434_methodListLen459_methodListLen479$$ = $methodList434_methodList459_methodList479$$.length;
      for($methodIndex434_methodIndex459_methodIndex479$$ = 0;$methodIndex434_methodIndex459_methodIndex479$$ < $methodListLen434_methodListLen459_methodListLen479$$;$methodIndex434_methodIndex459_methodIndex479$$++) {
        $fieldList590_methodData434_methodData459_methodData479$$ = $methodList434_methodList459_methodList479$$[$methodIndex434_methodIndex459_methodIndex479$$], $output$$18$$ += '<input  id="' + $soy$$0$0escapeHtml$$($opt_data$$20$$.$methodID$) + '" type="hidden" name="Method"  value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + '" data-net-value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + 
        $soy$$0$0escapeHtml$$($opt_data$$20$$.$netValueID$) + '" data-percent-fee="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$percentFeeID$) + '" data-fixed-fee="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$fixedFeeID$) + '">'
      }
    }
  }
  $output$$18$$ += '<div class="withdraw-methods">';
  $methodList434_methodList459_methodList479$$ = $opt_data$$20$$.$methods$;
  $methodListLen434_methodListLen459_methodListLen479$$ = $methodList434_methodList459_methodList479$$.length;
  for($methodIndex434_methodIndex459_methodIndex479$$ = 0;$methodIndex434_methodIndex459_methodIndex479$$ < $methodListLen434_methodListLen459_methodListLen479$$;$methodIndex434_methodIndex459_methodIndex479$$++) {
    if($fieldList590_methodData434_methodData459_methodData479$$ = $methodList434_methodList459_methodList479$$[$methodIndex434_methodIndex459_methodIndex479$$], $opt_data$$20$$.$force_method$) {
      if($fieldList590_methodData434_methodData459_methodData479$$.method == $opt_data$$20$$.$force_method$) {
        for(var $fieldList484_fieldListLen590$$ = $fieldList590_methodData434_methodData459_methodData479$$.fields, $fieldIndex590_fieldListLen484$$ = $fieldList484_fieldListLen590$$.length, $fieldData590_fieldIndex484$$ = 0;$fieldData590_fieldIndex484$$ < $fieldIndex590_fieldListLen484$$;$fieldData590_fieldIndex484$$++) {
          var $fieldData484$$ = $fieldList484_fieldListLen590$$[$fieldData590_fieldIndex484$$], $output$$18$$ = $output$$18$$ + ($fieldData484$$.side == $opt_data$$20$$.$side$ ? '<div class="control-group"><label class="control-label">' + $soy$$0$0escapeHtml$$($fieldData484$$.label) + '</label><div class="controls"><input class="withdraw-field" type="' + $soy$$0$0escapeHtml$$($fieldData484$$.type) + '" name="' + $soy$$0$0escapeHtml$$($fieldData484$$.name) + '" placeholder="' + $soy$$0$0escapeHtml$$($fieldData484$$.placeholder) + 
          '" value="' + $soy$$0$0escapeHtml$$($fieldData484$$.value) + '"/></div></div>' : "")
        }
        $output$$18$$ = "client" == $opt_data$$20$$.$side$ ? $output$$18$$ + ('<div class="control-group" style="margin-bottom: 5px;"><div class="controls"><label>' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.disclaimer) + '</label><input id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$percentFeeID$) + '" type="hidden" value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.percent_fee / 
        100) + '"><input id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$fixedFeeID$) + '" type="hidden" value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.fixed_fee / 1E8) + '"></div></div><div class="control-group"><label class="control-label">Taxas:</label><div class="controls"><label id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + 
        "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$totalFeesID$) + '" class="control-label" style="text-align: left;"></label></div></div><div class="control-group" ' + ($opt_data$$20$$.$hideNetAmount$ ? ' style="display:none;" ' : "") + ' ><label class="control-label">Valor l\u00edquido</label><div class="controls"><label id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$netValueID$) + '" class="control-label" style="text-align: left;"></label></div></div>') : 
        $output$$18$$ + ("broker" == $opt_data$$20$$.$side$ ? '<div class="control-group" style="margin-bottom: 5px;"><div class="controls"><label>' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.disclaimer) + "</label></div></div>" + ($opt_data$$20$$.$showFeeDataEntry$ ? $bitex$templates$FeesFormControls$$({$currencySign$:$opt_data$$20$$.$currencySign$, $percentFeeID$:$fieldList590_methodData434_methodData459_methodData479$$.method + "_" + $opt_data$$20$$.$percentFeeID$, 
        $percentFee$:$fieldList590_methodData434_methodData459_methodData479$$.percent_fee, $fixedFeeID$:$fieldList590_methodData434_methodData459_methodData479$$.method + "_" + $opt_data$$20$$.$fixedFeeID$, $fixedFee$:$fieldList590_methodData434_methodData459_methodData479$$.fixed_fee, $totalFeesID$:$fieldList590_methodData434_methodData459_methodData479$$.method + "_" + $opt_data$$20$$.$totalFeesID$, $netValueID$:$fieldList590_methodData434_methodData459_methodData479$$.method + "_" + $opt_data$$20$$.$netValueID$}) : 
        "") : "")
      }
    }else {
      $output$$18$$ += '<div class="withdraw-method" data-withdraw-method="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + '" style="' + (0 != $methodIndex434_methodIndex459_methodIndex479$$ ? "display:none;" : "") + '" ><div class="control-group" style="margin-bottom: 5px;"><div class="controls"><label>' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.disclaimer) + '</label><input id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + 
      "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$percentFeeID$) + '" type="hidden" value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.percent_fee / 100) + '"><input id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$fixedFeeID$) + '" type="hidden" value="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.fixed_fee / 1E8) + '"></div></div><div class="control-group"><label class="control-label">Taxas:</label><div class="controls"><label id="' + 
      $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$totalFeesID$) + '" class="control-label" style="text-align: left;"></label></div></div><div class="control-group" ' + ($opt_data$$20$$.$hideNetAmount$ ? ' style="display:none;" ' : "") + '><label class="control-label">Valor l\u00edquido</label><div class="controls"><label id="' + $soy$$0$0escapeHtml$$($fieldList590_methodData434_methodData459_methodData479$$.method) + 
      "_" + $soy$$0$0escapeHtml$$($opt_data$$20$$.$netValueID$) + '" class="control-label broker-confirm-deposit-net-amount" style="text-align: left;"></label></div></div>';
      $fieldList590_methodData434_methodData459_methodData479$$ = $fieldList590_methodData434_methodData459_methodData479$$.fields;
      $fieldList484_fieldListLen590$$ = $fieldList590_methodData434_methodData459_methodData479$$.length;
      for($fieldIndex590_fieldListLen484$$ = 0;$fieldIndex590_fieldListLen484$$ < $fieldList484_fieldListLen590$$;$fieldIndex590_fieldListLen484$$++) {
        $fieldData590_fieldIndex484$$ = $fieldList590_methodData434_methodData459_methodData479$$[$fieldIndex590_fieldListLen484$$], $output$$18$$ += $fieldData590_fieldIndex484$$.side == $opt_data$$20$$.$side$ ? '<div class="control-group"><label class="control-label">' + $soy$$0$0escapeHtml$$($fieldData590_fieldIndex484$$.label) + '</label><div class="controls"><input class="withdraw-field" type="' + $soy$$0$0escapeHtml$$($fieldData590_fieldIndex484$$.type) + '" name="' + $soy$$0$0escapeHtml$$($fieldData590_fieldIndex484$$.name) + 
        '" placeholder="' + $soy$$0$0escapeHtml$$($fieldData590_fieldIndex484$$.placeholder) + '" value="' + $soy$$0$0escapeHtml$$($fieldData590_fieldIndex484$$.value) + '" ' + (0 != $methodIndex434_methodIndex459_methodIndex479$$ ? "disabled" : "") + " /></div></div>" : ""
      }
      $output$$18$$ += "</div>"
    }
  }
  return $output$$18$$ + '</div><div class="control-group dlg-response-group"><label class="control-label dlg-response-group-label"></label><div class="controls" class="dlg-response-group-value" ></div></div></form>'
}
function $bitex$templates$YourAccountBalances$$($currencyList614_opt_data$$21$$) {
  var $output$$19$$ = '<table class="table table-striped" style="width: 350px"><tbody>';
  $currencyList614_opt_data$$21$$ = $currencyList614_opt_data$$21$$.$currencies$;
  for(var $currencyListLen614$$ = $currencyList614_opt_data$$21$$.length, $currencyIndex614$$ = 0;$currencyIndex614$$ < $currencyListLen614$$;$currencyIndex614$$++) {
    var $currencyData614$$ = $currencyList614_opt_data$$21$$[$currencyIndex614$$], $MSG_UNNAMED_1108$$ = $soy$$0$0escapeHtml$$($currencyData614$$.code) + " dispon\u00edveis", $output$$19$$ = $output$$19$$ + ("<tr><td><strong>" + $MSG_UNNAMED_1108$$ + '</strong></td><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyData614$$.$model_key$) + '" data-blink-class="balance-info-blink">' + ($currencyData614$$.$balance$ ? $soy$$0$0escapeHtml$$($currencyData614$$.$balance$) : 
    "-") + "</span></td></tr>")
  }
  return $output$$19$$ + "</tbody></table>"
}
function $bitex$templates$AccountOverviewHeaderVerifiedData$$($opt_data$$22$$) {
  var $output$$20$$ = "";
  return $output$$20$$ = $opt_data$$22$$.$msg_customer_detail$.Verified ? $output$$20$$ + ('<span class="label label-success">Sim</span> ' + $soy$$0$0escapeHtml$$($opt_data$$22$$.$msg_customer_detail$.VerificationData)) : $output$$20$$ + ('<span class="label label-important">N\u00e3o</span> <a href="#" class="btn btn-primary btn-mini" data-action="SET_VERIFIED" data-row="' + $soy$$0$0escapeHtml$$($opt_data$$22$$.$msg_customer_detail$.ID) + '">Marcar como verificado<i class="icon-white icon-ok"></i></a>')
}
function $bitex$templates$AccountOverviewHeader$$($opt_data$$23_output$$21$$) {
  return $opt_data$$23_output$$21$$ = "" + ('<h4>Detalhes</h4><table class="table table-striped account-overview-table" style="width: 350px"><tbody><tr><td><strong>ID</strong></td><td>' + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.ID) + "</td></tr><tr><td><strong>Username</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.Username) + "</td></tr><tr><td><strong>Email</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.Email) + 
  "</td></tr><tr><td><strong>Estado</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.State) + "</td></tr><tr><td><strong>Pa\u00eds</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.CountryCode) + "</td></tr><tr><td><strong>\u00daltimo acesso</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.LastLogin) + '</td></tr><tr><td><strong>\u00c9 verificado</strong></td><td class="account-overview-val account-overview-verified">' + 
  $bitex$templates$AccountOverviewHeaderVerifiedData$$($opt_data$$23_output$$21$$) + "</td></tr><tr><td><strong>Habilitou autentica\u00e7\u00e3o em 2 passos</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.TwoFactorEnabled) + "</td></tr><tr><td><strong>Data de registro</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$23_output$$21$$.$msg_customer_detail$.Created) + "</td></tr></tbody></table>")
}
function $bitex$templates$EnterVerificationDataDialogContent$$($opt_data$$24_output$$22$$) {
  return $opt_data$$24_output$$22$$ = "" + ('<form class="form-horizontal" data-deposit-status="prepare"><input type="hidden" name="ClientID" value="' + $soy$$0$0escapeHtml$$($opt_data$$24_output$$22$$.$clientID$) + '"><div class="control-group"><label class="control-label"> Dados da verifica\u00e7\u00e3o </label><div class="controls"><input type="text" class="input-xlarge" size="16" name="VerificationData"></div></div></form>')
}
function $bitex$templates$OrderBook$$($columnList713_opt_data$$25$$) {
  var $output$$23$$ = '<div class="text-center"><h4>' + $soy$$0$0escapeHtml$$($columnList713_opt_data$$25$$.title) + '</h4></div><table id="' + $soy$$0$0escapeHtml$$($columnList713_opt_data$$25$$.id) + '"  class="table"><thead><tr>';
  $columnList713_opt_data$$25$$ = $columnList713_opt_data$$25$$.$columns$;
  for(var $columnListLen713$$ = $columnList713_opt_data$$25$$.length, $columnIndex713$$ = 0;$columnIndex713$$ < $columnListLen713$$;$columnIndex713$$++) {
    $output$$23$$ += "<th>" + $soy$$0$0escapeHtml$$($columnList713_opt_data$$25$$[$columnIndex713$$]) + "</th>"
  }
  return $output$$23$$ + "</tr></thead><tbody></tbody></table>"
}
function $bitex$templates$OrderEntry$$($opt_data$$26$$) {
  var $output$$24$$;
  $output$$24$$ = "" + ('<div id="' + $soy$$0$0escapeHtml$$($opt_data$$26$$.id) + '" class="well span6 order-entry"><input type="hidden" name="symbol" class="order-entry-symbol" value="' + $soy$$0$0escapeHtml$$($opt_data$$26$$.$symbol$) + '"><input type="hidden" name="side" class="order-entry-side" value="' + $soy$$0$0escapeHtml$$($opt_data$$26$$.$side$) + '"><input type="hidden" name="type" class="order-entry-type" value="' + $soy$$0$0escapeHtml$$($opt_data$$26$$.type) + '"><div class="row-fluid"><div class="span5 order-entry-label"> <span>Quantidade:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-amount" type="number" value="" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"> <span>Pre\u00e7o por <span class="order-entry-amount-sign">\u0e3f</span>:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-price" type="number" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"><span>Total:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-total" type="number" required/></div></div></div><div class="row-fluid" ' + 
  ($opt_data$$26$$.$hide_fee$ ? 'style="display: none;"' : "") + ' ><div class="span5 order-entry-label"> <span>Taxa (opicional):</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-fee" type="text" value="0" /></div></div></div><div class="row-fluid"><div class="span5"><input class="input-block-level order-entry-client-id" placeholder="C\u00f3d. do Cliente" ' + 
  ($opt_data$$26$$.$hide_client_id$ ? 'style="display:none"' : "") + ' /></div><div class="span5"><button class="btn ' + (1 == $opt_data$$26$$.$side$ ? "btn-success" : "btn-danger") + ' btn-execution order-entry-action">');
  $output$$24$$ = 1 == $opt_data$$26$$.$side$ ? $output$$24$$ + "COMPRAR" : $output$$24$$ + "VENDER";
  return $output$$24$$ + "</button></div></div></div>"
}
function $bitex$templates$DataGrid$$($opt_data$$27$$) {
  var $output$$25$$ = "<div " + ($opt_data$$27$$.id ? 'id="' + $soy$$0$0escapeHtml$$($opt_data$$27$$.id) + '"' : "") + '  class="fuelux ' + ($opt_data$$27$$.$base_class$ ? $soy$$0$0escapeHtml$$($opt_data$$27$$.$base_class$) : "") + '" style="width:100%;"><table class="table table-bordered datagrid datagrid-stretch-header"><thead><tr><th colspan="4" ' + (!$opt_data$$27$$.title && !$opt_data$$27$$.$show_search$ ? 'style="display: none;"' : "") + '><span class="datagrid-header-title"  ' + (!$opt_data$$27$$.title ? 
  'style="display: none;"' : "") + " ><strong>" + $soy$$0$0escapeHtml$$($opt_data$$27$$.title) + '</strong></span><div class="datagrid-header-left" ' + (!$opt_data$$27$$.$show_search$ ? 'style="display: none;"' : "") + '><div class="input-append search datagrid-search"><input type="text" class="input-medium" placeholder="' + $soy$$0$0escapeHtml$$($opt_data$$27$$.$search_placeholder$) + '"><button type="button" class="btn"><i class="icon-search"></i></button></div></div><div class="datagrid-header-right">';
  if($opt_data$$27$$.$button_filters$) {
    for(var $output$$25$$ = $output$$25$$ + '<div class="select filter" data-resize="auto"><button type="button" data-toggle="dropdown" class="btn dropdown-toggle">', $buttonList797_buttonList805$$ = $opt_data$$27$$.$button_filters$, $buttonListLen797_buttonListLen805$$ = $buttonList797_buttonList805$$.length, $buttonIndex797_buttonIndex805$$ = 0;$buttonIndex797_buttonIndex805$$ < $buttonListLen797_buttonListLen805$$;$buttonIndex797_buttonIndex805$$++) {
      var $buttonData797_buttonData805$$ = $buttonList797_buttonList805$$[$buttonIndex797_buttonIndex805$$], $output$$25$$ = $output$$25$$ + (0 == $buttonIndex797_buttonIndex805$$ ? '<span class="dropdown-label" style="width: 111px;">' + $soy$$0$0escapeHtml$$($buttonData797_buttonData805$$.label) + "</span>" : "")
    }
    $output$$25$$ += '<span class="caret"></span></button><ul class="dropdown-menu">';
    $buttonList797_buttonList805$$ = $opt_data$$27$$.$button_filters$;
    $buttonListLen797_buttonListLen805$$ = $buttonList797_buttonList805$$.length;
    for($buttonIndex797_buttonIndex805$$ = 0;$buttonIndex797_buttonIndex805$$ < $buttonListLen797_buttonListLen805$$;$buttonIndex797_buttonIndex805$$++) {
      $buttonData797_buttonData805$$ = $buttonList797_buttonList805$$[$buttonIndex797_buttonIndex805$$], $output$$25$$ += '<li data-value="' + $soy$$0$0escapeHtml$$($buttonData797_buttonData805$$.value) + '"><a href="#">' + $soy$$0$0escapeHtml$$($buttonData797_buttonData805$$.label) + "</a></li>"
    }
    $output$$25$$ += "</ul></div>"
  }
  return $output$$25$$ += '</div></th></tr></thead></table><div class="datagrid-stretch-wrapper" style="height:' + ($opt_data$$27$$.$wrapper_height$ ? $soy$$0$0escapeHtml$$($opt_data$$27$$.$wrapper_height$) : "360") + 'px;"><table class="table table-bordered datagrid"><tbody></tbody></table></div><table class="table table-bordered datagrid datagrid-stretch-footer"><tfoot><tr><th colspan="4"><div class="datagrid-footer-left" style="visibility: visible;"><div class="grid-controls"><span><span class="grid-start"></span> -<span class="grid-end"></span></span></div></div><div class="datagrid-footer-right" style="visibility: visible;"><div class="grid-pager"><button type="button" class="btn grid-prevpage"><i class="icon-chevron-left"></i></button><button type="button" class="btn grid-nextpage"><i class="icon-chevron-right"></i></button></div></div></th></tr></tfoot></table></div>'
}
;
// Input 111
function $bitex$view$CustomersView$$($app$$7$$, $opt_domHelper$$23$$) {
  $bitex$view$View$$.call(this, $app$$7$$, $opt_domHelper$$23$$);
  this.$confirmation_token_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$CustomersView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$CustomersView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$decorateInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$CustomersView$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$destroyComponents_$();
  $bitex$view$CustomersView$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$62$$ = this.$getHandler$();
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$62$$, this.$customers_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$62$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$), this.$customers_table_$.$dispose$());
  this.$request_id_$ = this.$customers_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$63$$ = this.$getHandler$();
  this.$customers_table_$ == $JSCompiler_alias_NULL$$ && (this.$request_id_$ = parseInt(1E7 * Math.random(), 10), this.$customers_table_$ = new $bitex$ui$Customers$$, $JSCompiler_StaticMethods_listen$$($handler$$63$$, this.$customers_table_$, "request_data", this.$onCustomerListTableRequestData_$), $JSCompiler_StaticMethods_listen$$($handler$$63$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onCustomerListReponse_$), $JSCompiler_StaticMethods_listen$$($handler$$63$$, 
  this.$customers_table_$, "detail", this.$onUserDetailsClick_$), this.$customers_table_$.$decorate$($goog$dom$getElement$$("id_customer_table")))
};
$JSCompiler_prototypeAlias$$.$onUserDetailsClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserDetailsClick_$$($data$$34_e$$114$$) {
  $data$$34_e$$114$$ = $data$$34_e$$114$$.target.$selected_customer_$;
  this.$app_$.$model_$.set("SelectedCustomer", $data$$34_e$$114$$);
  this.$app_$.$setView$("account_overview/" + $data$$34_e$$114$$.Username + "/")
};
$JSCompiler_prototypeAlias$$.$onCustomerListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListTableRequestData_$$($e$$115$$) {
  this.$app_$.$conn_$.$requestCustomerList$(this.$request_id_$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $e$$115$$.options.Filter, $e$$115$$.options.Page, $e$$115$$.options.Limit, [0, 1])
};
$JSCompiler_prototypeAlias$$.$onCustomerListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListReponse_$$($e$$116_msg$$21$$) {
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($e$$116_msg$$21$$ = $e$$116_msg$$21$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$customers_table_$, $e$$116_msg$$21$$.CustomerListGrp, $e$$116_msg$$21$$.Columns))
};
// Input 112
function $bitex$ui$DepositList$$($crypto_currencies_def$$, $opt_broker_mode$$1_show_customers$$1$$, $grid_columns$$4_opt_show_customers$$1$$, $opt_domHelper$$24$$) {
  var $broker_mode$$1$$ = $JSCompiler_alias_FALSE$$;
  $opt_broker_mode$$1_show_customers$$1$$ === $JSCompiler_alias_TRUE$$ && ($broker_mode$$1$$ = $opt_broker_mode$$1_show_customers$$1$$);
  $opt_broker_mode$$1_show_customers$$1$$ = $JSCompiler_alias_FALSE$$;
  $grid_columns$$4_opt_show_customers$$1$$ === $JSCompiler_alias_TRUE$$ && ($opt_broker_mode$$1_show_customers$$1$$ = $grid_columns$$4_opt_show_customers$$1$$);
  $grid_columns$$4_opt_show_customers$$1$$ = [{property:"Created", label:"Data/Hora", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-created"
  }}, {property:"Status", label:"Situa\u00e7\u00e3o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$43$$, $rowSet$$4$$) {
    var $progress_message$$ = "Em andamento...", $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $JSCompiler_alias_NULL$$;
    if("CRY" == $rowSet$$4$$.Type && ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $goog$array$find$$($crypto_currencies_def$$, function($c$$2$$) {
      if($c$$2$$.CurrencyCode == $rowSet$$4$$.Currency) {
        return $JSCompiler_alias_TRUE$$
      }
    }), console.log($goog$debug$deepExpose$$($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$)), $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ != $JSCompiler_alias_NULL$$)) {
      if($rowSet$$4$$.PaidValue != $JSCompiler_alias_NULL$$ && 0 < $rowSet$$4$$.PaidValue) {
        var $confirmation_info_array_number_of_confirmations$$ = $goog$array$find$$($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$.Confirmations, function($conf_info$$) {
          if($rowSet$$4$$.PaidValue >= $conf_info$$[0] && $rowSet$$4$$.PaidValue < $conf_info$$[1]) {
            return $JSCompiler_alias_TRUE$$
          }
        })
      }
      $confirmation_info_array_number_of_confirmations$$ != $JSCompiler_alias_NULL$$ && ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $confirmation_info_array_number_of_confirmations$$[2], $confirmation_info_array_number_of_confirmations$$ = 0, $goog$isDef$$($rowSet$$4$$.Data) && $goog$isDef$$($rowSet$$4$$.Data.Confirmations) && ($confirmation_info_array_number_of_confirmations$$ = $rowSet$$4$$.Data.Confirmations), $progress_message$$ = $confirmation_info_array_number_of_confirmations$$ + 
      (" of " + ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ + " confirmations")))
    }
    $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = function($s$$44$$) {
      switch($s$$44$$) {
        case "0":
          return["", "N\u00e3o confirmado"];
        case "1":
          return["warning", "Pendente"];
        case "2":
          return["info", $progress_message$$];
        case "4":
          return["success", "Completo"];
        case "8":
          return["important", "Cancelado"]
      }
      return["", ""]
    }($s$$43$$);
    return $goog$dom$createDom$$("span", ["label", "label-" + $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$[0]], $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$[1])
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-status"
  }}, {property:"Value", label:"Valor", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-value"
  }}, {property:"ControlNumber", label:"N\u00famero de controle", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$144$$, $rowSet$$5$$) {
    switch($rowSet$$5$$.Type) {
      case "CRY":
        var $top_el$$ = $goog$dom$createDom$$("div");
        $goog$style$setStyle$$($top_el$$, "position", "relative");
        $goog$style$setWidth$$($top_el$$, 120);
        var $inner_el$$ = $goog$dom$createDom$$("div", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("span", $JSCompiler_alias_VOID$$, $rowSet$$5$$.Data.InputAddress));
        "BTC" == $rowSet$$5$$.Currency && ($inner_el$$ = $goog$dom$createDom$$("div", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("a", {href:"https://blockchain.info/address/" + $rowSet$$5$$.Data.InputAddress, target:"blank_"}, $rowSet$$5$$.Data.InputAddress)));
        $inner_el$$.style[$goog$userAgent$IE$$ ? "styleFloat" : "cssFloat"] = "left";
        $goog$style$setStyle$$($inner_el$$, "max-width", "110px");
        $goog$style$setStyle$$($inner_el$$, "overflow", "hidden");
        $goog$style$setStyle$$($inner_el$$, "text-overflow", "ellipsis");
        $goog$style$setStyle$$($inner_el$$, "white-space", "nowrap");
        $top_el$$.appendChild($inner_el$$);
        return $top_el$$;
      default:
        return"" + $value$$144$$
    }
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-method"
  }}, {property:"Data", label:"Detalhes", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$145$$, $rowSet$$6$$) {
    var $btn_qr$$1_data_row$$3$$ = $goog$json$serialize$$($rowSet$$6$$), $btn_view$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-view", href:"/get_deposit?deposit_id=" + $rowSet$$6$$.DepositID, target:"_blank"}, "ver", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-eye-open"])), $btn_qr$$1_data_row$$3$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-view-qr", href:"#", "data-action":"SHOW_QR", "data-row":$btn_qr$$1_data_row$$3$$}, "QR", 
    " ", $goog$dom$createDom$$("i", ["icon-white", "icon-qrcode"]));
    switch($rowSet$$6$$.Type) {
      case "CRY":
        switch($rowSet$$6$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_qr$$1_data_row$$3$$]);
          case "2":
          ;
          case "4":
          ;
          case "8":
            return""
        }
        break;
      case "BBS":
      ;
      case "BTI":
        switch($rowSet$$6$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_view$$]);
          case "2":
          ;
          case "4":
          ;
          case "8":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_view$$])
        }
    }
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-details"
  }}];
  $opt_broker_mode$$1_show_customers$$1$$ && $grid_columns$$4_opt_show_customers$$1$$.push({property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-username"
  }});
  $broker_mode$$1$$ ? $grid_columns$$4_opt_show_customers$$1$$.push({property:"DepositID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$146$$, $rowSet$$7$$) {
    var $btn_complete$$1_data_row$$4$$ = $goog$json$serialize$$($rowSet$$7$$), $btn_cancel$$1$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-danger btn-deposit-cancel", href:"#", "data-action":"CANCEL", "data-row":$btn_complete$$1_data_row$$4$$}, "cancelar", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-remove"])), $btn_progress$$1$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-progress", href:"#", "data-action":"PROGRESS", "data-row":$btn_complete$$1_data_row$$4$$}, 
    "Em andamento", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-refresh"])), $btn_complete$$1_data_row$$4$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-success btn-deposit-complete", href:"#", "data-action":"COMPLETE", "data-row":$btn_complete$$1_data_row$$4$$}, "Completar", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-ok"]));
    switch($rowSet$$7$$.Type) {
      case "CRY":
        switch($rowSet$$7$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_progress$$1$$]);
          case "2":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_complete$$1_data_row$$4$$]);
          case "4":
            return"";
          case "8":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_progress$$1$$])
        }
        break;
      default:
        switch($rowSet$$7$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_cancel$$1$$, $btn_progress$$1$$]);
          case "2":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_cancel$$1$$, $btn_complete$$1_data_row$$4$$]);
          case "4":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_cancel$$1$$]);
          case "8":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_progress$$1$$])
        }
    }
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-actions"
  }}) : $grid_columns$$4_opt_show_customers$$1$$.push({property:"DepositID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$147$$, $rowSet$$8$$) {
    var $btn_upload_data_row$$5$$ = $goog$json$serialize$$($rowSet$$8$$), $btn_upload_data_row$$5$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-success btn-deposit-upload", "data-action":"UPLOAD", "data-row":$btn_upload_data_row$$5$$}, "enviar recibo", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-file"]));
    switch($rowSet$$8$$.Type) {
      case "CRY":
        switch($rowSet$$8$$.Status) {
          case "0":
          ;
          case "1":
          ;
          case "2":
          ;
          case "4":
          ;
          case "8":
            return""
        }
        break;
      default:
        switch($rowSet$$8$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_upload_data_row$$5$$]);
          case "2":
          ;
          case "4":
          ;
          case "8":
            return""
        }
    }
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-actions"
  }});
  this.$selected_deposit_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowIDFn:this.$getRowId$, rowClassFn:this.$getRowClass$, columns:$grid_columns$$4_opt_show_customers$$1$$}, $opt_domHelper$$24$$)
}
$goog$inherits$$($bitex$ui$DepositList$$, $bitex$ui$DataGrid$$);
var $bitex$ui$DepositList$CSS_CLASS$$ = "deposit-list";
$JSCompiler_prototypeAlias$$ = $bitex$ui$DepositList$$.prototype;
$JSCompiler_prototypeAlias$$.$getCssClass$ = function $$JSCompiler_prototypeAlias$$$$getCssClass$$() {
  return $bitex$ui$DepositList$CSS_CLASS$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$DepositList$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$handleClick_$)
};
$JSCompiler_prototypeAlias$$.$getDepositData$ = $JSCompiler_get$$("$selected_deposit_$");
$JSCompiler_prototypeAlias$$.$handleClick_$ = function $$JSCompiler_prototypeAlias$$$$handleClick_$$($e$$117$$) {
  this.$selected_deposit_$ = $goog$json$parse$$($e$$117$$.target.getAttribute("data-row"));
  this.$selected_deposit_$ != $JSCompiler_alias_NULL$$ && ($goog$dom$classes$has$$($e$$117$$.target, "btn-deposit-complete") ? this.dispatchEvent("deposit_complete") : $goog$dom$classes$has$$($e$$117$$.target, "btn-deposit-progress") ? this.dispatchEvent("deposit_progress") : $goog$dom$classes$has$$($e$$117$$.target, "btn-deposit-cancel") && this.dispatchEvent("deposit_cancel"), this.$selected_deposit_$ = $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$getRowId$ = function $$JSCompiler_prototypeAlias$$$$getRowId$$($row_set$$7$$) {
  return $JSCompiler_StaticMethods_getId$$(this) + "." + $row_set$$7$$.DepositID
};
$JSCompiler_prototypeAlias$$.$getRowClass$ = function $$JSCompiler_prototypeAlias$$$$getRowClass$$($row_set$$8$$) {
  var $class_status$$4$$;
  switch($row_set$$8$$.Status) {
    case "0":
      $class_status$$4$$ = $bitex$ui$DepositList$CSS_CLASS$$ + "-unconfirmed";
      break;
    case "1":
      $class_status$$4$$ = $bitex$ui$DepositList$CSS_CLASS$$ + "-pending";
      break;
    case "2":
      $class_status$$4$$ = $bitex$ui$DepositList$CSS_CLASS$$ + "-processing";
      break;
    case "4":
      $class_status$$4$$ = $bitex$ui$DepositList$CSS_CLASS$$ + "-complete";
      break;
    case "8":
      $class_status$$4$$ = $bitex$ui$DepositList$CSS_CLASS$$ + "-cancelled"
  }
  return $class_status$$4$$
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$DepositList$CSS_CLASS$$, function() {
  return new $bitex$ui$DepositList$$
});
// Input 113
function $bitex$view$DepositView$$($app$$8$$, $opt_domHelper$$25$$) {
  $bitex$view$View$$.call(this, $app$$8$$, $opt_domHelper$$25$$);
  this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$DepositView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$DepositView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  this.$destroyComponents_$()
};
$JSCompiler_prototypeAlias$$.$getAmount$ = $JSCompiler_get$$("$amount_$");
$JSCompiler_prototypeAlias$$.$getDepositAction$ = $JSCompiler_get$$("$action_$");
$JSCompiler_prototypeAlias$$.$getDepositData$ = $JSCompiler_get$$("$data_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$DepositView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$65$$ = this.$getHandler$(), $model$$5$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$65$$, $model$$5$$, "model_setBrokerCurrencies", function() {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_deposit_balances_container"));
    var $broker_currencies$$1$$ = $model$$5$$.get("BrokerCurrencies");
    $goog$soy$renderElement$$($goog$dom$getElement$$("id_deposit_balances_container"), $bitex$templates$AccountBalances$$, {$currencies$:$broker_currencies$$1$$, action:"deposit"});
    $JSCompiler_StaticMethods_updateDom$$($model$$5$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$65$$, this.$getElement$(), "click", function($e$$119$$) {
    "deposit" === $e$$119$$.target.getAttribute("data-action") && (this.$currency_$ = $e$$119$$.target.getAttribute("data-currency"), this.dispatchEvent("request_deposit"))
  }, this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$66$$ = this.$getHandler$(), $model$$6$$ = this.$app_$.$model_$;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + 
  "." + $model$$6$$.get("UserID"), this.$onDepositRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$), this.$deposit_list_table_$.$dispose$());
  this.$request_id_$ = this.$deposit_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$67$$ = this.$getHandler$(), $model$$7$$ = this.$app_$.$model_$;
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$57$$ = $goog$dom$getElement$$("id_deposit_list_table"), $broker$$3$$ = $model$$7$$.get("Broker");
  this.$deposit_list_table_$ = new $bitex$ui$DepositList$$($broker$$3$$.CryptoCurrencies, $model$$7$$.get("IsBroker"), $model$$7$$.get("IsBroker"));
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $model$$7$$.get("UserID"), this.$onDepositRefresh_$);
  this.$deposit_list_table_$.$decorate$($el$$57$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$deposit_list_table_$, "Value", this.$valuePriceFormatter_$, this);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$)
};
$JSCompiler_prototypeAlias$$.$onDepositListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableClick_$$($e$$120$$) {
  var $element$$165$$ = $e$$120$$.target;
  "I" === $element$$165$$.tagName && ($element$$165$$ = $goog$dom$getParentElement$$($element$$165$$));
  var $data_action$$ = $element$$165$$.getAttribute("data-action");
  if($data_action$$ != $JSCompiler_alias_NULL$$) {
    switch($e$$120$$.preventDefault(), $e$$120$$.stopPropagation(), this.$action_$ = $data_action$$, this.$data_$ = $goog$json$parse$$($element$$165$$.getAttribute("data-row")), $data_action$$) {
      case "SHOW_QR":
        this.$qr_data_$ = {Wallet:this.$data_$.Data.InputAddress, Currency:this.$data_$.Currency};
        this.$qr_data_verb_$ = "DEPOSIT";
        this.dispatchEvent("show_qr");
        break;
      case "UPLOAD":
        this.dispatchEvent("upload_receipt");
        break;
      case "CANCEL":
      ;
      case "PROGRESS":
      ;
      case "COMPLETE":
        this.dispatchEvent("process_deposit")
    }
  }
};
$JSCompiler_prototypeAlias$$.$valuePriceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$valuePriceFormatter_$$($value$$148$$, $rowSet$$9$$) {
  var $formatted_paid_value_paid_value$$ = $rowSet$$9$$.PaidValue, $priceCurrency$$2$$ = $rowSet$$9$$.Currency, $currency_description$$ = this.$app_$.$getCurrencyDescription$($priceCurrency$$2$$), $formatted_value$$ = this.$app_$.$formatCurrency$($value$$148$$ / 1E8, $priceCurrency$$2$$);
  return 0 === $value$$148$$ ? 0 === $formatted_paid_value_paid_value$$ ? "-" : $goog$dom$createDom$$("abbr", {title:$currency_description$$}, this.$app_$.$formatCurrency$($formatted_paid_value_paid_value$$ / 1E8, $priceCurrency$$2$$)) : 0 < $formatted_paid_value_paid_value$$ && $formatted_paid_value_paid_value$$ != $value$$148$$ ? ($formatted_paid_value_paid_value$$ = this.$app_$.$formatCurrency$($formatted_paid_value_paid_value$$ / 1E8, $priceCurrency$$2$$), $goog$dom$createDom$$("abbr", {title:"declarado / pago em " + 
  $currency_description$$}, $formatted_value$$ + " / " + $formatted_paid_value_paid_value$$)) : $goog$dom$createDom$$("abbr", {title:$currency_description$$}, $formatted_value$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableRequestData_$$($e$$121$$) {
  this.$app_$.$conn_$.$requestDepositList$(this.$request_id_$, $e$$121$$.options.Page, $e$$121$$.options.Limit, ["0", "1", "2", "4", "8"], $JSCompiler_alias_VOID$$, $e$$121$$.options.Filter)
};
$JSCompiler_prototypeAlias$$.$onDepositRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onDepositRefresh_$$($e$$122_msg$$22$$) {
  $e$$122_msg$$22$$ = $e$$122_msg$$22$$.data;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$deposit_list_table_$, $e$$122_msg$$22$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListReponse_$$($e$$123_msg$$23$$) {
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$123_msg$$23$$ = $e$$123_msg$$23$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$deposit_list_table_$, $e$$123_msg$$23$$.DepositListGrp, $e$$123_msg$$23$$.Columns))
};
// Input 114
function $bitex$ui$TradeHistory$$($opt_domHelper$$26$$) {
  this.$selected_trade_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowIDFn:this.$getRowId$, rowClassFn:this.$getRowClass$, columns:[{property:"Market", label:"Mercado", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$45$$) {
    size_currency = $s$$45$$.substring(0, 3);
    price_currency = $s$$45$$.substring(3);
    return size_currency + " / " + price_currency
  }, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-market"
  }}, {property:"Side", label:"Compra/Venda", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$46$$) {
    switch($s$$46$$) {
      case "1":
        return"C";
      case "2":
        return"V"
    }
    return""
  }, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-side"
  }}, {property:"Price", label:"Pre\u00e7o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$149$$) {
    return($value$$149$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-price"
  }}, {property:"Size", label:"Quantidade", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$150$$) {
    return($value$$150$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-size"
  }}, {property:"Buyer", label:"Comprador", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-buyer"
  }}, {property:"Seller", label:"Vendedor", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-seller"
  }}, {property:"Created", label:"Data/Hora", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$TradeHistory$CSS_CLASS$$ + "-created"
  }}]}, $opt_domHelper$$26$$)
}
$goog$inherits$$($bitex$ui$TradeHistory$$, $bitex$ui$DataGrid$$);
var $bitex$ui$TradeHistory$CSS_CLASS$$ = "trade-history";
$bitex$ui$TradeHistory$$.prototype.$getRowId$ = function $$bitex$ui$TradeHistory$$$$$getRowId$$($row_set$$9$$) {
  return $JSCompiler_StaticMethods_getId$$(this) + "." + $row_set$$9$$.TradeID
};
$bitex$ui$TradeHistory$$.prototype.$getRowClass$ = function $$bitex$ui$TradeHistory$$$$$getRowClass$$($row_set$$10$$) {
  var $class_status$$5$$;
  switch($row_set$$10$$.Status) {
    case "0":
      $class_status$$5$$ = $bitex$ui$TradeHistory$CSS_CLASS$$ + "-unconfirmed";
      break;
    case "1":
      $class_status$$5$$ = $bitex$ui$TradeHistory$CSS_CLASS$$ + "-pending";
      break;
    case "2":
      $class_status$$5$$ = $bitex$ui$TradeHistory$CSS_CLASS$$ + "-processing";
      break;
    case "4":
      $class_status$$5$$ = $bitex$ui$TradeHistory$CSS_CLASS$$ + "-complete";
      break;
    case "8":
      $class_status$$5$$ = $bitex$ui$TradeHistory$CSS_CLASS$$ + "-cancelled"
  }
  return $class_status$$5$$
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$TradeHistory$CSS_CLASS$$, function() {
  return new $bitex$ui$TradeHistory$$
});
// Input 115
function $bitex$view$MarketView$$($app$$9$$, $opt_domHelper$$27$$) {
  $bitex$view$View$$.call(this, $app$$9$$, $opt_domHelper$$27$$);
  this.$market_data_subscription_symbol_$ = this.$market_data_subscription_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$MarketView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$MarketView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  var $handler$$68$$ = this.$getHandler$(), $el$$58$$ = $goog$dom$getElement$$("id_trade_list_table");
  this.$last_trades_table_$ = new $bitex$ui$TradeHistory$$;
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$last_trades_table_$, "request_data", this.$onTradeHistoryTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$TRADE_HISTORY_RESPONSE$$ + "." + this.$market_data_subscription_id_$, this.$onTradeHistoryReponse_$);
  this.$last_trades_table_$.$decorate$($el$$58$$)
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  if(this.$last_trades_table_$ != $JSCompiler_alias_NULL$$) {
    var $handler$$69$$ = this.$getHandler$();
    $JSCompiler_StaticMethods_unlisten$$($handler$$69$$, this.$last_trades_table_$, "request_data", this.$onTradeHistoryTableRequestData_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$69$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$TRADE_HISTORY_RESPONSE$$ + "." + this.$market_data_subscription_id_$, this.$onTradeHistoryReponse_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$69$$, this.$last_trades_table_$.$getElement$(), "click", this.$onTradeHistoryTableClick_$);
    this.$last_trades_table_$.$dispose$()
  }
  this.$last_trades_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$MarketView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$70$$ = this.$getHandler$(), $model$$8$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$70$$, $model$$8$$, "model_setSecurityList", function() {
    var $instrument_msg$$24$$ = $model$$8$$.get("SecurityList"), $instrument_msg$$24$$ = $instrument_msg$$24$$.Instruments[$instrument_msg$$24$$.Instruments.length - 1];
    $instrument_msg$$24$$ != $JSCompiler_alias_NULL$$ && this.$recreateComponents_$($instrument_msg$$24$$.Symbol)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$70$$, $model$$8$$, "model_setSelectedSymbol", function() {
    var $symbol$$4$$ = $model$$8$$.get("SelectedSymbol").$symbol$;
    this.$recreateComponents_$($symbol$$4$$)
  }, this)
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$($conn$$5_symbol$$5$$) {
  var $handler$$71$$ = this.$getHandler$();
  this.$market_data_subscription_symbol_$ !== $conn$$5_symbol$$5$$ && (this.$destroyComponents_$(), this.$market_data_subscription_id_$ = parseInt(1E7 * Math.random(), 10), this.$market_data_subscription_symbol_$ = $conn$$5_symbol$$5$$, $conn$$5_symbol$$5$$ = this.$app_$.$conn_$, $JSCompiler_StaticMethods_listen$$($handler$$71$$, $conn$$5_symbol$$5$$, $bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ + "." + this.$market_data_subscription_id_$, this.$onBitexTradingSessionStatus_$), $JSCompiler_StaticMethods_listen$$($handler$$71$$, 
  $conn$$5_symbol$$5$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + this.$market_data_subscription_id_$, this.$onBitexOrderBookNewOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$71$$, $conn$$5_symbol$$5$$, $bitex$api$BitEx$EventType$TRADE$$ + "." + this.$market_data_subscription_id_$, this.$onBitexTrade_$), this.dispatchEvent("md_subscribe"))
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$72$$ = this.$getHandler$();
  this.$last_trades_table_$ != $JSCompiler_alias_NULL$$ && this.$last_trades_table_$.$dispose$();
  if(this.$market_data_subscription_id_$ != $JSCompiler_alias_NULL$$) {
    var $conn$$6$$ = this.$app_$.$conn_$;
    $JSCompiler_StaticMethods_unlisten$$($handler$$72$$, $conn$$6$$, $bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ + "." + this.$market_data_subscription_id_$, this.$onBitexTradingSessionStatus_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$72$$, $conn$$6$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + this.$market_data_subscription_id_$, this.$onBitexOrderBookNewOrder_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$72$$, $conn$$6$$, $bitex$api$BitEx$EventType$TRADE$$ + "." + this.$market_data_subscription_id_$, this.$onBitexTrade_$);
    this.dispatchEvent("md_unsubscribe");
    this.$market_data_subscription_symbol_$ = this.$market_data_subscription_id_$ = $JSCompiler_alias_NULL$$
  }
};
$JSCompiler_prototypeAlias$$.$onTradeHistoryTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onTradeHistoryTableRequestData_$$($e$$126_msg$$inline_631$$) {
  var $JSCompiler_StaticMethods_requestTradeHistory$self$$inline_624$$ = this.$app_$.$conn_$, $opt_filter$$inline_628$$ = $e$$126_msg$$inline_631$$.options.Filter;
  $e$$126_msg$$inline_631$$ = {MsgType:"U32", TradeHistoryReqID:this.$market_data_subscription_id_$ || parseInt(1E7 * Math.random(), 10), Page:$e$$126_msg$$inline_631$$.options.Page || 0, PageSize:$e$$126_msg$$inline_631$$.options.Limit || 100};
  $opt_filter$$inline_628$$ != $JSCompiler_alias_NULL$$ && 0 < $opt_filter$$inline_628$$.length && ($e$$126_msg$$inline_631$$.Filter = $opt_filter$$inline_628$$);
  $JSCompiler_StaticMethods_requestTradeHistory$self$$inline_624$$.sendMessage($e$$126_msg$$inline_631$$)
};
$JSCompiler_prototypeAlias$$.$onBitexTrade_$ = function $$JSCompiler_prototypeAlias$$$$onBitexTrade_$$($e$$127_msg$$25$$) {
  if(this.$last_trades_table_$ != $JSCompiler_alias_NULL$$) {
    $e$$127_msg$$25$$ = $e$$127_msg$$25$$.data;
    var $record$$1$$ = [];
    $record$$1$$.TradeID = $e$$127_msg$$25$$.TradeID;
    $record$$1$$.Market = $e$$127_msg$$25$$.Symbol;
    $record$$1$$.Size = $e$$127_msg$$25$$.MDEntrySize;
    $record$$1$$.Price = $e$$127_msg$$25$$.MDEntryPx;
    $record$$1$$.Side = $e$$127_msg$$25$$.Side;
    $record$$1$$.Buyer = $e$$127_msg$$25$$.MDEntryBuyer;
    $record$$1$$.Seller = $e$$127_msg$$25$$.MDEntrySeller;
    $record$$1$$.Created = "-";
    $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$last_trades_table_$, $record$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onTradeHistoryReponse_$ = function $$JSCompiler_prototypeAlias$$$$onTradeHistoryReponse_$$($e$$128_msg$$26$$) {
  this.$last_trades_table_$ != $JSCompiler_alias_NULL$$ && ($e$$128_msg$$26$$ = $e$$128_msg$$26$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$last_trades_table_$, $e$$128_msg$$26$$.TradeHistoryGrp, $e$$128_msg$$26$$.Columns))
};
$JSCompiler_prototypeAlias$$.$onBitexOrderBookNewOrder_$ = function $$JSCompiler_prototypeAlias$$$$onBitexOrderBookNewOrder_$$($e$$129_index$$79$$) {
  var $currency_msg$$27$$ = $e$$129_index$$79$$.data;
  $e$$129_index$$79$$ = $currency_msg$$27$$.MDEntryPositionNo - 1;
  var $price$$4$$ = $currency_msg$$27$$.MDEntryPx / 1E8, $side$$10$$ = $currency_msg$$27$$.MDEntryType, $currency_msg$$27$$ = $currency_msg$$27$$.Symbol.substr(3, 3);
  "0" == $side$$10$$ ? 0 === $e$$129_index$$79$$ && this.$app_$.$model_$.set("formatted_best_bid_" + $currency_msg$$27$$.toLowerCase(), this.$app_$.$formatCurrency$($price$$4$$, $currency_msg$$27$$)) : "1" == $side$$10$$ && 0 === $e$$129_index$$79$$ && this.$app_$.$model_$.set("formatted_best_offer_" + $currency_msg$$27$$.toLowerCase(), this.$app_$.$formatCurrency$($price$$4$$, $currency_msg$$27$$))
};
$JSCompiler_prototypeAlias$$.$onBitexTradingSessionStatus_$ = function $$JSCompiler_prototypeAlias$$$$onBitexTradingSessionStatus_$$($e$$130$$) {
  try {
    var $msg$$28$$ = $e$$130$$.data;
    delete $msg$$28$$.MDEntryType;
    delete $msg$$28$$.MDReqID;
    var $app$$10$$ = this.$app_$;
    $goog$object$forEach$$($msg$$28$$, function($volume$$, $currency$$1$$) {
      $volume$$ /= 1E8;
      var $volume_key$$ = "volume_" + $currency$$1$$.toLowerCase();
      $app$$10$$.$model_$.set($volume_key$$, $volume$$);
      $app$$10$$.$model_$.set("formatted_" + $volume_key$$, $app$$10$$.$formatCurrency$($volume$$, $currency$$1$$))
    })
  }catch($str$$101$$) {
  }
};
$JSCompiler_prototypeAlias$$.$onTradeHistoryTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onTradeHistoryTableClick_$$($e$$131$$) {
  var $element$$166$$ = $e$$131$$.target;
  "I" === $element$$166$$.tagName && ($element$$166$$ = $goog$dom$getParentElement$$($element$$166$$));
  var $data_action$$1$$ = $element$$166$$.getAttribute("data-action");
  $data_action$$1$$ != $JSCompiler_alias_NULL$$ && ($e$$131$$.preventDefault(), $e$$131$$.stopPropagation(), this.$action_$ = $data_action$$1$$, this.$data_$ = $goog$json$parse$$($element$$166$$.getAttribute("data-row")))
};
$JSCompiler_prototypeAlias$$.$getMDInstruments$ = function $$JSCompiler_prototypeAlias$$$$getMDInstruments$$() {
  return[this.$market_data_subscription_symbol_$]
};
$JSCompiler_prototypeAlias$$.$getMDMarketDepth$ = $JSCompiler_returnArg$$(1);
$JSCompiler_prototypeAlias$$.$getMDEntries$ = function $$JSCompiler_prototypeAlias$$$$getMDEntries$$() {
  return["0", "1", "2", "4"]
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $bitex$view$MarketView$$.$superClass_$.$exitDocument$.call(this);
  this.$destroyComponents_$()
};
// Input 116
function $goog$net$WebSocket$$($opt_autoReconnect$$, $opt_getNextReconnect$$) {
  $goog$Disposable$$.call(this);
  this.$autoReconnect_$ = $goog$isDef$$($opt_autoReconnect$$) ? $opt_autoReconnect$$ : $JSCompiler_alias_TRUE$$;
  this.$getNextReconnect_$ = $opt_getNextReconnect$$ || $goog$net$WebSocket$EXPONENTIAL_BACKOFF_$$;
  this.$nextReconnect_$ = this.$getNextReconnect_$(this.$reconnectAttempt_$)
}
$goog$inherits$$($goog$net$WebSocket$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$net$WebSocket$$.prototype;
$JSCompiler_prototypeAlias$$.$webSocket_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$url_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$protocol_$ = $JSCompiler_alias_VOID$$;
$JSCompiler_prototypeAlias$$.$closeExpected_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$reconnectAttempt_$ = 0;
$JSCompiler_prototypeAlias$$.$logger_$ = $goog$debug$LogManager$getLogger$$("goog.net.WebSocket");
var $goog$net$WebSocket$EventType$CLOSED$$ = "closed_" + $goog$events$uniqueIdCounter_$$++, $goog$net$WebSocket$EventType$ERROR$$ = "error_" + $goog$events$uniqueIdCounter_$$++, $goog$net$WebSocket$EventType$MESSAGE$$ = "message_" + $goog$events$uniqueIdCounter_$$++, $goog$net$WebSocket$EventType$OPENED$$ = "opened_" + $goog$events$uniqueIdCounter_$$++;
function $goog$net$WebSocket$EXPONENTIAL_BACKOFF_$$($attempt$$) {
  return Math.min(1E3 * Math.pow(2, $attempt$$), 6E4)
}
$JSCompiler_prototypeAlias$$ = $goog$net$WebSocket$$.prototype;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$30$$, $opt_protocol$$1$$) {
  this.$reconnectTimer_$ != $JSCompiler_alias_NULL$$ && $goog$global$$.clearTimeout(this.$reconnectTimer_$);
  this.$reconnectTimer_$ = $JSCompiler_alias_NULL$$;
  this.$url_$ = $url$$30$$;
  (this.$protocol_$ = $opt_protocol$$1$$) ? (this.$logger_$.info("Opening the WebSocket on " + this.$url_$ + " with protocol " + this.$protocol_$), this.$webSocket_$ = new WebSocket(this.$url_$, this.$protocol_$)) : (this.$logger_$.info("Opening the WebSocket on " + this.$url_$), this.$webSocket_$ = new WebSocket(this.$url_$));
  this.$webSocket_$.onopen = $goog$bind$$(this.$onOpen_$, this);
  this.$webSocket_$.onclose = $goog$bind$$(this.$onClose_$, this);
  this.$webSocket_$.onmessage = $goog$bind$$(this.$onMessage_$, this);
  this.$webSocket_$.onerror = $goog$bind$$(this.$onError_$, this)
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$reconnectTimer_$ != $JSCompiler_alias_NULL$$ && $goog$global$$.clearTimeout(this.$reconnectTimer_$);
  this.$reconnectTimer_$ = $JSCompiler_alias_NULL$$;
  this.$webSocket_$ && (this.$logger_$.info("Closing the WebSocket."), this.$closeExpected_$ = $JSCompiler_alias_TRUE$$, this.$webSocket_$.close(), this.$webSocket_$ = $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.send = function $$JSCompiler_prototypeAlias$$$send$($message$$22$$) {
  this.$webSocket_$.send($message$$22$$)
};
$JSCompiler_prototypeAlias$$.$isOpen$ = function $$JSCompiler_prototypeAlias$$$$isOpen$$() {
  return!!this.$webSocket_$ && 1 == this.$webSocket_$.readyState
};
$JSCompiler_prototypeAlias$$.$onOpen_$ = function $$JSCompiler_prototypeAlias$$$$onOpen_$$() {
  this.$logger_$.info("WebSocket opened on " + this.$url_$);
  this.dispatchEvent($goog$net$WebSocket$EventType$OPENED$$);
  this.$reconnectAttempt_$ = 0;
  this.$nextReconnect_$ = this.$getNextReconnect_$(this.$reconnectAttempt_$)
};
$JSCompiler_prototypeAlias$$.$onClose_$ = function $$JSCompiler_prototypeAlias$$$$onClose_$$($event$$5$$) {
  this.$logger_$.info("The WebSocket on " + this.$url_$ + " closed.");
  this.dispatchEvent($goog$net$WebSocket$EventType$CLOSED$$);
  this.$webSocket_$ = $JSCompiler_alias_NULL$$;
  this.$closeExpected_$ ? (this.$logger_$.info("The WebSocket closed normally."), this.$url_$ = $JSCompiler_alias_NULL$$, this.$protocol_$ = $JSCompiler_alias_VOID$$) : (this.$logger_$.log($goog$debug$Logger$Level$SEVERE$$, "The WebSocket disconnected unexpectedly: " + $event$$5$$.data, $JSCompiler_alias_VOID$$), this.$autoReconnect_$ && (this.$logger_$.info("Seconds until next reconnect attempt: " + Math.floor(this.$nextReconnect_$ / 1E3)), this.$reconnectTimer_$ = $goog$Timer$callOnce$$($goog$bind$$(this.open, 
  this, this.$url_$, this.$protocol_$), this.$nextReconnect_$, this), this.$reconnectAttempt_$++, this.$nextReconnect_$ = this.$getNextReconnect_$(this.$reconnectAttempt_$)));
  this.$closeExpected_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($event$$6$$) {
  this.dispatchEvent(new $goog$net$WebSocket$MessageEvent$$($event$$6$$.data))
};
$JSCompiler_prototypeAlias$$.$onError_$ = function $$JSCompiler_prototypeAlias$$$$onError_$$($data$$35_event$$7$$) {
  $data$$35_event$$7$$ = $data$$35_event$$7$$.data;
  this.$logger_$.log($goog$debug$Logger$Level$SEVERE$$, "An error occurred: " + $data$$35_event$$7$$, $JSCompiler_alias_VOID$$);
  this.dispatchEvent(new $goog$net$WebSocket$ErrorEvent$$($data$$35_event$$7$$))
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$net$WebSocket$$.$superClass_$.$disposeInternal$.call(this);
  this.close()
};
function $goog$net$WebSocket$MessageEvent$$($message$$24$$) {
  $goog$events$Event$$.call(this, $goog$net$WebSocket$EventType$MESSAGE$$);
  this.message = $message$$24$$
}
$goog$inherits$$($goog$net$WebSocket$MessageEvent$$, $goog$events$Event$$);
function $goog$net$WebSocket$ErrorEvent$$($data$$36$$) {
  $goog$events$Event$$.call(this, $goog$net$WebSocket$EventType$ERROR$$);
  this.data = $data$$36$$
}
$goog$inherits$$($goog$net$WebSocket$ErrorEvent$$, $goog$events$Event$$);
// Input 117
function $bitex$api$BitEx$$() {
  $goog$Disposable$$.call(this);
  this.$all_markets_$ = this.$currency_info_$ = $JSCompiler_alias_NULL$$;
  this.$ws_$ = new $goog$net$WebSocket$$($JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($bitex$api$BitEx$$, $goog$events$EventTarget$$);
$bitex$api$BitEx$$.prototype.$ws_$ = $JSCompiler_alias_NULL$$;
$bitex$api$BitEx$$.prototype.$url_$ = $JSCompiler_alias_NULL$$;
$bitex$api$BitEx$$.prototype.$connected_$ = $JSCompiler_alias_FALSE$$;
$bitex$api$BitEx$$.prototype.$logged_$ = $JSCompiler_alias_FALSE$$;
var $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ = "deposit_refresh", $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ = "deposit_list", $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ = "withdraw_list_response", $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ = "order_list_response", $bitex$api$BitEx$EventType$TRADE_HISTORY_RESPONSE$$ = "trade_history_response", $bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ = "customer_list", $bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ = "md_status", 
$bitex$api$BitEx$EventType$TRADE$$ = "trade", $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ = "ob_clear", $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ = "ob_delete_orders_thru", $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ = "ob_delete_order", $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ = "ob_new_order", $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ = "ob_update_order";
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$31$$, $opt_protocol$$2$$) {
  this.$url_$ = $url$$31$$;
  var $handler$$73$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$ws_$, $goog$net$WebSocket$EventType$CLOSED$$, this.$onClose_$);
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$ws_$, $goog$net$WebSocket$EventType$MESSAGE$$, this.$onMessage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$ws_$, $goog$net$WebSocket$EventType$ERROR$$, this.$onError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$ws_$, $goog$net$WebSocket$EventType$OPENED$$, this.$onOpen_$);
  this.$ws_$.open($url$$31$$, $opt_protocol$$2$$)
};
$JSCompiler_prototypeAlias$$.$isConnected$ = $JSCompiler_get$$("$connected_$");
$JSCompiler_prototypeAlias$$.$isLogged$ = $JSCompiler_get$$("$logged_$");
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$handler_$ || (this.$handler_$ = new $goog$events$EventHandler$$(this))
};
$JSCompiler_prototypeAlias$$.$formatCurrency$ = function $$JSCompiler_prototypeAlias$$$$formatCurrency$$($amount$$3$$, $currency_code$$) {
  if(this.$currency_info_$ == $JSCompiler_alias_NULL$$) {
    return $amount$$3$$
  }
  var $currency_def$$ = this.$currency_info_$[$currency_code$$];
  return(new $goog$i18n$NumberFormat$$($currency_def$$.$format$, $currency_def$$.code)).$format$($amount$$3$$)
};
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($msg$$29$$) {
  this.$currency_info_$ = {};
  this.$all_markets_$ = {};
  $goog$array$forEach$$($msg$$29$$.Currencies, function($currency$$2$$) {
    this.$currency_info_$[$currency$$2$$.Code] = {code:$currency$$2$$.Code, $format$:$currency$$2$$.FormatJS, description:$currency$$2$$.Description, $sign$:$currency$$2$$.Sign, $pip$:$currency$$2$$.Pip, $is_crypto$:$currency$$2$$.IsCrypto}
  }, this);
  var $symbols$$ = [];
  $goog$array$forEach$$($msg$$29$$.Instruments, function($instrument$$1$$) {
    var $symbol$$7$$ = $instrument$$1$$.Symbol;
    this.$all_markets_$[$symbol$$7$$] = {$symbol$:$symbol$$7$$, description:$instrument$$1$$.Description};
    $symbols$$.push($symbol$$7$$)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onOpen_$ = function $$JSCompiler_prototypeAlias$$$$onOpen_$$() {
  this.dispatchEvent("opened");
  this.$connected_$ = $JSCompiler_alias_TRUE$$;
  this.$logged_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$onClose_$ = function $$JSCompiler_prototypeAlias$$$$onClose_$$() {
  this.dispatchEvent("closed");
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$onError_$ = function $$JSCompiler_prototypeAlias$$$$onError_$$() {
  this.dispatchEvent("error");
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$134_entry$$) {
  var $msg$$30$$ = JSON.parse($e$$134_entry$$.message);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$134_entry$$.message));
  switch($msg$$30$$.MsgType) {
    case "ERROR":
      $msg$$30$$.ReqID != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message." + $msg$$30$$.ReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", $msg$$30$$));
      break;
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $msg$$30$$));
      break;
    case "B":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("news", $msg$$30$$));
      break;
    case "BF":
      1 == $msg$$30$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $msg$$30$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $msg$$30$$)));
      break;
    case "y":
      this.$onSecurityList_$($msg$$30$$);
      this.dispatchEvent(new $bitex$api$BitExEvent$$("security_list", $msg$$30$$));
      break;
    case "U13":
      1 == $msg$$30$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $msg$$30$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $msg$$30$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_response." + $msg$$30$$.DepositReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_response", $msg$$30$$));
      break;
    case "U23":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $msg$$30$$.UserID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $msg$$30$$.BrokerID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$, $msg$$30$$));
      break;
    case "U7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response." + $msg$$30$$.WithdrawReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response", $msg$$30$$));
      break;
    case "U9":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh." + $msg$$30$$.UserID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh." + $msg$$30$$.BrokerID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh", $msg$$30$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $msg$$30$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ + "." + $msg$$30$$.OrdersReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, $msg$$30$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $msg$$30$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_methods_response", $msg$$30$$));
      break;
    case "U27":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + $msg$$30$$.WithdrawListReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$, $msg$$30$$));
      break;
    case "U29":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("broker_list", $msg$$30$$));
      break;
    case "U31":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + $msg$$30$$.DepositListReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$, $msg$$30$$));
      break;
    case "U33":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE_HISTORY_RESPONSE$$ + "." + $msg$$30$$.TradeHistoryReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE_HISTORY_RESPONSE$$, $msg$$30$$));
      break;
    case "U35":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("ledger_list." + $msg$$30$$.LedgerListReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("ledger_list", $msg$$30$$));
      break;
    case "B1":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_deposit." + $msg$$30$$.ProcessDepositReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_deposit", $msg$$30$$));
      break;
    case "B3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ + "." + $msg$$30$$.CustomerListReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$, $msg$$30$$));
      break;
    case "B5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_detail", $msg$$30$$));
      break;
    case "B7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_withdraw." + $msg$$30$$.ProcessWithdrawReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_withdraw", $msg$$30$$));
      break;
    case "B9":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("verify_customer_response." + $msg$$30$$.VerifyCustomerReqID, $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("verify_customer_response", $msg$$30$$));
      break;
    case "W":
      if(1 != $msg$$30$$.MarketDepth) {
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$));
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $msg$$30$$.MDReqID));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear"));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear." + $msg$$30$$.MDReqID));
        for(var $x$$76$$ in $msg$$30$$.MDFullGrp) {
          switch($e$$134_entry$$ = $msg$$30$$.MDFullGrp[$x$$76$$], $e$$134_entry$$.MDReqID = $msg$$30$$.MDReqID, $e$$134_entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              $e$$134_entry$$.Symbol = $msg$$30$$.Symbol;
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $e$$134_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE$$, $e$$134_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$, $e$$134_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh." + $msg$$30$$.MDReqID, $msg$$30$$));
      break;
    case "X":
      if("3" == $msg$$30$$.MDBkTyp) {
        for($x$$76$$ in $msg$$30$$.MDIncGrp) {
          switch($e$$134_entry$$ = $msg$$30$$.MDIncGrp[$x$$76$$], $e$$134_entry$$.MDReqID = $msg$$30$$.MDReqID, $e$$134_entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              switch($e$$134_entry$$.MDUpdateAction) {
                case "0":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $e$$134_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
                  break;
                case "1":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$, $e$$134_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
                  break;
                case "2":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$, $e$$134_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
                  break;
                case "3":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$, $e$$134_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
                  break;
                case "4":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$, $e$$134_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$))
              }
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE$$, $e$$134_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADE$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$, $e$$134_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$TRADING_SESSION_STATUS$$ + "." + $msg$$30$$.MDReqID, $e$$134_entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh." + $msg$$30$$.MDReqID, $msg$$30$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $msg$$30$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject." + $msg$$30$$.MDReqID, $msg$$30$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $msg$$30$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$;
  this.$ws_$.close();
  this.$ws_$.$dispose$();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($msg$$31_username$$6$$, $password$$2$$, $opt_second_factor$$) {
  $msg$$31_username$$6$$ = {MsgType:"BE", UserReqID:"1", Username:$msg$$31_username$$6$$, Password:$password$$2$$, UserReqTyp:"1"};
  $opt_second_factor$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_username$$6$$.SecondFactor = $opt_second_factor$$);
  this.sendMessage($msg$$31_username$$6$$)
};
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$16_msg$$32$$, $opt_secret$$, $opt_code$$, $opt_clientID$$) {
  $enable$$16_msg$$32$$ = {MsgType:"U16", Enable:$enable$$16_msg$$32$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_secret$$) && ($enable$$16_msg$$32$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_code$$) && ($enable$$16_msg$$32$$.Code = $opt_code$$);
  $opt_clientID$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$) && ($enable$$16_msg$$32$$.ClientID = $opt_clientID$$);
  this.sendMessage($enable$$16_msg$$32$$)
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$1$$) {
  this.sendMessage({MsgType:"U10", Email:$email$$1$$})
};
$JSCompiler_prototypeAlias$$.$requestBalances$ = function $$JSCompiler_prototypeAlias$$$$requestBalances$$($opt_clientID$$1$$) {
  var $msg$$34$$ = {MsgType:"U2", BalanceReqID:parseInt(1E6 * Math.random(), 10)};
  $opt_clientID$$1$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$1$$) && ($msg$$34$$.ClientID = $opt_clientID$$1$$);
  this.sendMessage($msg$$34$$)
};
$JSCompiler_prototypeAlias$$.$requestWithdraw$ = function $$JSCompiler_prototypeAlias$$$$requestWithdraw$$($opt_request_id_reqId$$1$$, $amount$$4_msg$$35$$, $method$$5$$, $currency$$3$$, $data$$37$$) {
  $opt_request_id_reqId$$1$$ = $opt_request_id_reqId$$1$$ || parseInt(1E6 * Math.random(), 10);
  $amount$$4_msg$$35$$ = {MsgType:"U6", WithdrawReqID:$opt_request_id_reqId$$1$$, Currency:$currency$$3$$, Amount:parseInt(1E8 * $amount$$4_msg$$35$$, 10), Method:$method$$5$$, Data:$goog$json$serialize$$($data$$37$$)};
  this.sendMessage($amount$$4_msg$$35$$);
  return $opt_request_id_reqId$$1$$
};
$JSCompiler_prototypeAlias$$.$confirmWithdraw$ = function $$JSCompiler_prototypeAlias$$$$confirmWithdraw$$($confirmation_token$$) {
  this.sendMessage({MsgType:"U24", WithdrawReqID:parseInt(1E6 * Math.random(), 10), ConfirmationToken:$confirmation_token$$})
};
$JSCompiler_prototypeAlias$$.$requestWithdrawList$ = function $$JSCompiler_prototypeAlias$$$$requestWithdrawList$$($opt_requestId_requestId$$, $msg$$37_opt_page$$, $opt_limit$$1$$, $opt_status$$, $opt_clientID$$2$$, $opt_filter$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$37_opt_page$$ = {MsgType:"U26", WithdrawListReqID:$opt_requestId_requestId$$, Page:$msg$$37_opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["1", "2"]};
  $opt_clientID$$2$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$2$$) && ($msg$$37_opt_page$$.ClientID = $opt_clientID$$2$$);
  $opt_filter$$ != $JSCompiler_alias_NULL$$ && 0 < $opt_filter$$.length && ($msg$$37_opt_page$$.Filter = $opt_filter$$);
  this.sendMessage($msg$$37_opt_page$$);
  return $opt_requestId_requestId$$
};
$JSCompiler_prototypeAlias$$.$requestDepositList$ = function $$JSCompiler_prototypeAlias$$$$requestDepositList$$($opt_requestId$$1_requestId$$1$$, $msg$$38_opt_page$$1$$, $opt_limit$$2$$, $opt_status$$1$$, $opt_clientID$$3$$, $opt_filter$$1$$) {
  $opt_requestId$$1_requestId$$1$$ = $opt_requestId$$1_requestId$$1$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$38_opt_page$$1$$ = {MsgType:"U30", DepositListReqID:$opt_requestId$$1_requestId$$1$$, Page:$msg$$38_opt_page$$1$$ || 0, PageSize:$opt_limit$$2$$ || 100, StatusList:$opt_status$$1$$ || ["1", "2"]};
  $opt_clientID$$3$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$3$$) && ($msg$$38_opt_page$$1$$.ClientID = $opt_clientID$$3$$);
  $opt_filter$$1$$ != $JSCompiler_alias_NULL$$ && 0 < $opt_filter$$1$$.length && ($msg$$38_opt_page$$1$$.Filter = $opt_filter$$1$$);
  this.sendMessage($msg$$38_opt_page$$1$$);
  return $opt_requestId$$1_requestId$$1$$
};
$JSCompiler_prototypeAlias$$.$requestLedgerList$ = function $$JSCompiler_prototypeAlias$$$$requestLedgerList$$($opt_requestId$$3_requestId$$3$$, $msg$$40_opt_page$$3$$, $opt_limit$$4$$, $opt_clientID$$5$$, $opt_currency$$1$$, $opt_filter$$3$$) {
  $opt_requestId$$3_requestId$$3$$ = $opt_requestId$$3_requestId$$3$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$40_opt_page$$3$$ = {MsgType:"U34", LedgerListReqID:$opt_requestId$$3_requestId$$3$$, OperationList:["C", "D"], Page:$msg$$40_opt_page$$3$$ || 0, PageSize:$opt_limit$$4$$ || 100};
  $opt_clientID$$5$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$5$$) && ($msg$$40_opt_page$$3$$.ClientID = $opt_clientID$$5$$);
  $opt_currency$$1$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_currency$$1$$) && ($msg$$40_opt_page$$3$$.Currency = $opt_currency$$1$$);
  $opt_filter$$3$$ != $JSCompiler_alias_NULL$$ && 0 < $opt_filter$$3$$.length && ($msg$$40_opt_page$$3$$.Filter = $opt_filter$$3$$);
  this.sendMessage($msg$$40_opt_page$$3$$);
  return $opt_requestId$$3_requestId$$3$$
};
$JSCompiler_prototypeAlias$$.$requestBrokerList$ = function $$JSCompiler_prototypeAlias$$$$requestBrokerList$$($opt_requestId$$4_requestId$$4$$, $opt_country$$, $msg$$41_opt_page$$4$$, $opt_limit$$5$$, $opt_status$$2$$) {
  $opt_requestId$$4_requestId$$4$$ = $opt_requestId$$4_requestId$$4$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$41_opt_page$$4$$ = {MsgType:"U28", BrokerListReqID:$opt_requestId$$4_requestId$$4$$, Page:$msg$$41_opt_page$$4$$ || 0, PageSize:$opt_limit$$5$$ || 100, StatusList:$opt_status$$2$$ || ["1"]};
  $opt_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$41_opt_page$$4$$.Country = $opt_country$$);
  this.sendMessage($msg$$41_opt_page$$4$$);
  return $opt_requestId$$4_requestId$$4$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerList$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerList$$($opt_requestId$$5_requestId$$5$$, $opt_filter_country$$, $opt_filter_state$$, $opt_filter_username_or_email$$, $msg$$42_opt_page$$5$$, $opt_limit$$6$$, $opt_status$$3$$, $opt_sort_column$$, $opt_sort_direction$$) {
  $opt_requestId$$5_requestId$$5$$ = $opt_requestId$$5_requestId$$5$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$42_opt_page$$5$$ = {MsgType:"B2", CustomerListReqID:$opt_requestId$$5_requestId$$5$$, Page:$msg$$42_opt_page$$5$$ || 0, PageSize:$opt_limit$$6$$ || 100, StatusList:$opt_status$$3$$ || [0, 1]};
  $opt_filter_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$42_opt_page$$5$$.Country = $opt_filter_country$$);
  $opt_filter_state$$ != $JSCompiler_alias_NULL$$ && ($msg$$42_opt_page$$5$$.State = $opt_filter_state$$);
  $opt_filter_username_or_email$$ != $JSCompiler_alias_NULL$$ && ($msg$$42_opt_page$$5$$.ClientID = $opt_filter_username_or_email$$);
  $opt_sort_column$$ != $JSCompiler_alias_NULL$$ && ($msg$$42_opt_page$$5$$.Sort = $opt_sort_column$$);
  $opt_sort_direction$$ != $JSCompiler_alias_NULL$$ && ($msg$$42_opt_page$$5$$.SortOrder = $opt_sort_direction$$);
  this.sendMessage($msg$$42_opt_page$$5$$);
  return $opt_requestId$$5_requestId$$5$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerDetails$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerDetails$$($opt_requestId$$6$$, $clientId$$) {
  var $requestId$$6$$ = $opt_requestId$$6$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"B4", CustomerReqID:$requestId$$6$$, ClientID:$clientId$$});
  return $requestId$$6$$
};
$JSCompiler_prototypeAlias$$.$verifyCustomer$ = function $$JSCompiler_prototypeAlias$$$$verifyCustomer$$($opt_requestId$$7_requestId$$7$$, $clientId$$1$$, $verify$$, $verificationData$$) {
  $opt_requestId$$7_requestId$$7$$ = $opt_requestId$$7_requestId$$7$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"B8", VerifyCustomerReqID:$opt_requestId$$7_requestId$$7$$, ClientID:$clientId$$1$$, Verify:$verify$$ ? 1 : 0, VerificationData:$verificationData$$});
  return $opt_requestId$$7_requestId$$7$$
};
$JSCompiler_prototypeAlias$$.$processWithdraw$ = function $$JSCompiler_prototypeAlias$$$$processWithdraw$$($opt_requestId$$8_requestId$$8$$, $action_msg$$45$$, $withdrawId$$, $opt_reasonId$$, $opt_reason$$, $opt_data$$28$$, $opt_percent_fee$$, $opt_fixed_fee$$) {
  $opt_requestId$$8_requestId$$8$$ = $opt_requestId$$8_requestId$$8$$ || parseInt(1E7 * Math.random(), 10);
  $action_msg$$45$$ = {MsgType:"B6", ProcessWithdrawReqID:$opt_requestId$$8_requestId$$8$$, WithdrawID:$withdrawId$$, Action:$action_msg$$45$$};
  $opt_reasonId$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$45$$.ReasonID = $opt_reasonId$$);
  $opt_reason$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$45$$.Reason = $opt_reason$$);
  $opt_data$$28$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$45$$.Data = $opt_data$$28$$);
  $opt_percent_fee$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$45$$.PercentFee = $opt_percent_fee$$);
  $opt_fixed_fee$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$45$$.FixedFee = $opt_fixed_fee$$);
  this.sendMessage($action_msg$$45$$);
  return $opt_requestId$$8_requestId$$8$$
};
$JSCompiler_prototypeAlias$$.$processDeposit$ = function $$JSCompiler_prototypeAlias$$$$processDeposit$$($opt_requestId$$9_requestId$$9$$, $action$$1_msg$$46$$, $opt_secret$$1$$, $opt_depositId$$, $opt_reasonId$$1$$, $opt_reason$$1$$, $opt_amount$$, $opt_percent_fee$$1$$, $opt_fixed_fee$$1$$) {
  $opt_requestId$$9_requestId$$9$$ = $opt_requestId$$9_requestId$$9$$ || parseInt(1E7 * Math.random(), 10);
  $action$$1_msg$$46$$ = {MsgType:"B0", ProcessDepositReqID:$opt_requestId$$9_requestId$$9$$, Action:$action$$1_msg$$46$$};
  $opt_secret$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.Secret = $opt_secret$$1$$);
  $opt_depositId$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.DepositID = $opt_depositId$$);
  $opt_reasonId$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.ReasonID = $opt_reasonId$$1$$);
  $opt_reason$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.Reason = $opt_reason$$1$$);
  $opt_amount$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.Amount = $opt_amount$$);
  $opt_percent_fee$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.PercentFee = $opt_percent_fee$$1$$);
  $opt_fixed_fee$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$46$$.FixedFee = $opt_fixed_fee$$1$$);
  this.sendMessage($action$$1_msg$$46$$);
  return $opt_requestId$$9_requestId$$9$$
};
$JSCompiler_prototypeAlias$$.$resetPassword$ = function $$JSCompiler_prototypeAlias$$$$resetPassword$$($token$$5$$, $new_password$$) {
  this.sendMessage({MsgType:"U12", Token:$token$$5$$, NewPassword:$new_password$$})
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$3$$, $new_password$$1$$) {
  this.sendMessage({MsgType:"BE", UserReqID:"3", Password:$password$$3$$, NewPassword:$new_password$$1$$})
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$1$$, $entries$$, $opt_requestId$$10_requestId$$10$$) {
  $opt_requestId$$10_requestId$$10$$ = $opt_requestId$$10_requestId$$10$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"V", MDReqID:$opt_requestId$$10_requestId$$10$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$1$$});
  return $opt_requestId$$10_requestId$$10$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.sendMessage({MsgType:"V", MDReqID:$market_data_id$$, MarketDepth:0, SubscriptionRequestType:"2"})
};
$JSCompiler_prototypeAlias$$.$requestSecurityList$ = function $$JSCompiler_prototypeAlias$$$$requestSecurityList$$($opt_requestId$$11$$) {
  this.sendMessage({MsgType:"x", SecurityReqID:$opt_requestId$$11$$ || parseInt(1E7 * Math.random(), 10), SecurityListRequestType:0, SecurityRequestResult:0})
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$7$$, $password$$4$$, $email$$2$$, $state$$19$$, $country_code$$2$$, $broker$$5$$) {
  this.sendMessage({MsgType:"U0", Username:$username$$7$$, Password:$password$$4$$, Email:$email$$2$$, State:$state$$19$$, CountryCode:$country_code$$2$$, BrokerID:$broker$$5$$})
};
$JSCompiler_prototypeAlias$$.$requestOrderList$ = function $$JSCompiler_prototypeAlias$$$$requestOrderList$$($opt_requestId$$12_requestId$$12$$, $opt_page$$6$$, $opt_limit$$7$$, $opt_status$$4$$) {
  $opt_requestId$$12_requestId$$12$$ = $opt_requestId$$12_requestId$$12$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"U4", OrdersReqID:$opt_requestId$$12_requestId$$12$$, Page:$opt_page$$6$$ || 0, PageSize:$opt_limit$$7$$ || 100, StatusList:$opt_status$$4$$ || ["0", "1"]});
  return $opt_requestId$$12_requestId$$12$$
};
$JSCompiler_prototypeAlias$$.$requestDeposit$ = function $$JSCompiler_prototypeAlias$$$$requestDeposit$$($msg$$54_opt_requestId$$13$$, $opt_depositOptionId$$, $opt_value$$10$$, $opt_depositID$$, $opt_currency$$2$$) {
  $msg$$54_opt_requestId$$13$$ = {MsgType:"U18", DepositReqID:$msg$$54_opt_requestId$$13$$ || parseInt(1E7 * Math.random(), 10)};
  $opt_depositOptionId$$ != $JSCompiler_alias_NULL$$ && ($msg$$54_opt_requestId$$13$$.DepositMethodID = $opt_depositOptionId$$);
  $opt_value$$10$$ != $JSCompiler_alias_NULL$$ && ($msg$$54_opt_requestId$$13$$.Value = parseInt(1E8 * $opt_value$$10$$, 10));
  $opt_depositID$$ != $JSCompiler_alias_NULL$$ && ($msg$$54_opt_requestId$$13$$.DepositID = $opt_depositID$$);
  $opt_currency$$2$$ != $JSCompiler_alias_NULL$$ && ($msg$$54_opt_requestId$$13$$.Currency = $opt_currency$$2$$);
  this.sendMessage($msg$$54_opt_requestId$$13$$)
};
$JSCompiler_prototypeAlias$$.$requestDepositMethods$ = function $$JSCompiler_prototypeAlias$$$$requestDepositMethods$$($opt_requestId$$14$$) {
  this.sendMessage({MsgType:"U20", DepositMethodReqID:$opt_requestId$$14$$ || parseInt(1E7 * Math.random(), 10)})
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $msg$$56_symbol$$8$$, $qty$$6$$, $price$$5$$, $side$$11$$, $opt_client_id$$, $clientOrderId$$1_opt_clientOrderId$$) {
  $clientOrderId$$1_opt_clientOrderId$$ = $clientOrderId$$1_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$5$$ = parseInt(1E8 * $price$$5$$, 10);
  $qty$$6$$ = parseInt(1E8 * $qty$$6$$, 10);
  $msg$$56_symbol$$8$$ = {MsgType:"D", ClOrdID:"" + $clientOrderId$$1_opt_clientOrderId$$, Symbol:$msg$$56_symbol$$8$$, Side:$side$$11$$, OrdType:"2", Price:$price$$5$$, OrderQty:$qty$$6$$};
  $opt_client_id$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_client_id$$) && ($msg$$56_symbol$$8$$.ClientID = $opt_client_id$$);
  $JSCompiler_StaticMethods_sendOrder_$self$$.sendMessage($msg$$56_symbol$$8$$);
  return $clientOrderId$$1_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$57$$ = {MsgType:"F"};
  $opt_OrderId$$ ? $msg$$57$$.OrderID = $opt_OrderId$$ : $opt_clientOrderId$$1$$ && ($msg$$57$$.OrigClOrdID = $opt_clientOrderId$$1$$);
  this.sendMessage($msg$$57$$)
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$58$$) {
  if(this.$ws_$.$isOpen$()) {
    try {
      this.$ws_$.send($msg$$58$$), this.dispatchEvent(new $bitex$api$BitExEvent$$("sent_raw_message", $msg$$58$$))
    }catch($s$$47$$) {
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", {MsgType:"ERROR", Description:"Erro grave", Detail:$s$$47$$.toLocaleString()}))
    }
  }else {
    this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", {MsgType:"ERROR", Description:"Erro", Detail:"Perda de conex\u00e3o com o servidor"}))
  }
};
$JSCompiler_prototypeAlias$$.sendMessage = function $$JSCompiler_prototypeAlias$$$sendMessage$($msg$$59$$) {
  this.$sendRawMessage$(JSON.stringify($msg$$59$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$9$$, $qty$$7$$, $price$$6$$, $opt_client_id$$1$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$9$$, $qty$$7$$, $price$$6$$, "1", $opt_client_id$$1$$, $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$10$$, $qty$$8$$, $price$$7$$, $opt_client_id$$2$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$10$$, $qty$$8$$, $price$$7$$, "2", $opt_client_id$$2$$, $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.sendMessage({MsgType:"1", TestReqID:Math.random()})
};
function $bitex$api$BitExEvent$$($type$$106$$, $opt_data$$29$$) {
  $goog$events$Event$$.call(this, $type$$106$$);
  this.data = $opt_data$$29$$
}
$goog$inherits$$($bitex$api$BitExEvent$$, $goog$events$Event$$);
$goog$exportPath_$$("BitEx", $bitex$api$BitEx$$);
BitEx.prototype.open = $bitex$api$BitEx$$.prototype.open;
BitEx.prototype.close = $bitex$api$BitEx$$.prototype.close;
BitEx.prototype.login = $bitex$api$BitEx$$.prototype.login;
BitEx.prototype.isLogged = $bitex$api$BitEx$$.prototype.$isLogged$;
BitEx.prototype.isConnected = $bitex$api$BitEx$$.prototype.$isConnected$;
BitEx.prototype.changePassword = $bitex$api$BitEx$$.prototype.$changePassword$;
BitEx.prototype.enableTwoFactor = $bitex$api$BitEx$$.prototype.$enableTwoFactor$;
BitEx.prototype.resetPassword = $bitex$api$BitEx$$.prototype.$resetPassword$;
BitEx.prototype.subscribeMarketData = $bitex$api$BitEx$$.prototype.$subscribeMarketData$;
BitEx.prototype.unSubscribeMarketData = $bitex$api$BitEx$$.prototype.$unSubscribeMarketData$;
BitEx.prototype.signUp = $bitex$api$BitEx$$.prototype.$signUp$;
BitEx.prototype.forgotPassword = $bitex$api$BitEx$$.prototype.$forgotPassword$;
BitEx.prototype.requestBalances = $bitex$api$BitEx$$.prototype.$requestBalances$;
BitEx.prototype.requestSecurityList = $bitex$api$BitEx$$.prototype.$requestSecurityList$;
BitEx.prototype.requestDepositMethods = $bitex$api$BitEx$$.prototype.$requestDepositMethods$;
BitEx.prototype.requestLedgerList = $bitex$api$BitEx$$.prototype.$requestLedgerList$;
BitEx.prototype.requestDeposit = $bitex$api$BitEx$$.prototype.$requestDeposit$;
BitEx.prototype.processDeposit = $bitex$api$BitEx$$.prototype.$processDeposit$;
BitEx.prototype.requestDepositList = $bitex$api$BitEx$$.prototype.$requestDepositList$;
BitEx.prototype.requestWithdraw = $bitex$api$BitEx$$.prototype.$requestWithdraw$;
BitEx.prototype.processWithdraw = $bitex$api$BitEx$$.prototype.$processWithdraw$;
BitEx.prototype.requestWithdrawList = $bitex$api$BitEx$$.prototype.$requestWithdrawList$;
BitEx.prototype.confirmWithdraw = $bitex$api$BitEx$$.prototype.$confirmWithdraw$;
BitEx.prototype.requestCustomerList = $bitex$api$BitEx$$.prototype.$requestCustomerList$;
BitEx.prototype.requestCustomerDetails = $bitex$api$BitEx$$.prototype.$requestCustomerDetails$;
BitEx.prototype.verifyCustomer = $bitex$api$BitEx$$.prototype.$verifyCustomer$;
BitEx.prototype.requestBrokerList = $bitex$api$BitEx$$.prototype.$requestBrokerList$;
BitEx.prototype.requestOrderList = $bitex$api$BitEx$$.prototype.$requestOrderList$;
BitEx.prototype.cancelOrder = $bitex$api$BitEx$$.prototype.$cancelOrder$;
BitEx.prototype.sendRawMessage = $bitex$api$BitEx$$.prototype.$sendRawMessage$;
BitEx.prototype.sendBuyLimitedOrder = $bitex$api$BitEx$$.prototype.$sendBuyLimitedOrder$;
BitEx.prototype.sendSellLimitedOrder = $bitex$api$BitEx$$.prototype.$sendSellLimitedOrder$;
BitEx.prototype.testRequest = $bitex$api$BitEx$$.prototype.$testRequest$;
BitEx.prototype.addEventListener = $bitex$api$BitEx$$.prototype.addEventListener;
BitEx.prototype.removeEventListener = $bitex$api$BitEx$$.prototype.removeEventListener;
// Input 118
function $bitex$view$TwoFactorView$$($app$$11$$, $opt_domHelper$$28$$) {
  $bitex$view$View$$.call(this, $app$$11$$, $opt_domHelper$$28$$)
}
$goog$inherits$$($bitex$view$TwoFactorView$$, $bitex$view$View$$);
$bitex$view$TwoFactorView$$.prototype.$enterDocument$ = function $$bitex$view$TwoFactorView$$$$$enterDocument$$() {
  $bitex$view$TwoFactorView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$74$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$74$$, this.$app_$.$model_$, "model_setTwoFactorSecret", function($e$$135_secret$$) {
    $e$$135_secret$$ = $e$$135_secret$$.data;
    $e$$135_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($e$$135_secret$$) && $goog$dom$getElement$$("id_secret_qr").setAttribute("src", "https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=" + $e$$135_secret$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$74$$, this.$app_$.$model_$, "model_setTwoFactorEnabled", function($e$$136_enabled$$5$$) {
    $e$$136_enabled$$5$$ = $e$$136_enabled$$5$$.data;
    var $has_secret$$1_secret$$1$$ = this.$app_$.$model_$.get("TwoFactorSecret"), $has_secret$$1_secret$$1$$ = $has_secret$$1_secret$$1$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($has_secret$$1_secret$$1$$), $divEl$$ = $goog$dom$getElement$$("id_enable_two_factor_div"), $btnDisableEl$$ = $goog$dom$getElement$$("id_btn_disable_two_factor");
    $goog$style$showElement$$($goog$dom$getElement$$("id_btn_enable_two_factor"), !$e$$136_enabled$$5$$);
    $goog$style$showElement$$($btnDisableEl$$, $e$$136_enabled$$5$$);
    $goog$style$showElement$$($divEl$$, $has_secret$$1_secret$$1$$)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$74$$, $goog$dom$getElement$$("id_btn_enable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_enable")
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$74$$, $goog$dom$getElement$$("id_btn_disable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_disable")
  }, this)
};
// Input 119
function $bitex$view$SetNewPasswordView$$($app$$12$$, $opt_domHelper$$29$$) {
  $bitex$view$View$$.call(this, $app$$12$$, $opt_domHelper$$29$$)
}
$goog$inherits$$($bitex$view$SetNewPasswordView$$, $bitex$view$View$$);
$bitex$view$SetNewPasswordView$$.prototype.$getToken$ = function $$bitex$view$SetNewPasswordView$$$$$getToken$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_token"))
};
$bitex$view$SetNewPasswordView$$.prototype.$getPassword$ = function $$bitex$view$SetNewPasswordView$$$$$getPassword$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password"))
};
$bitex$view$SetNewPasswordView$$.prototype.$enterDocument$ = function $$bitex$view$SetNewPasswordView$$$$$enterDocument$$() {
  $bitex$view$SetNewPasswordView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_set_new_password"), "click", function($e$$139$$) {
    $e$$139$$.stopPropagation();
    $e$$139$$.preventDefault();
    $goog$string$isEmpty$$(this.$getToken$()) ? this.$app_$.$showDialog$("C\u00f3digo de confirma\u00e7\u00e3o inv\u00e1lido") : $goog$string$isEmpty$$(this.$getPassword$()) || 8 > this.$getPassword$().length ? this.$app_$.$showDialog$("A senha precisa ter no m\u00ednimo 8 letras") : this.$getPassword$() !== $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password2")) ? this.$app_$.$showDialog$("As senhas n\u00e3o conferem") : this.dispatchEvent("set_new_pwd")
  }, this)
};
// Input 120
function $bitex$view$ForgotPasswordView$$($app$$13$$, $opt_domHelper$$30$$) {
  $bitex$view$View$$.call(this, $app$$13$$, $opt_domHelper$$30$$)
}
$goog$inherits$$($bitex$view$ForgotPasswordView$$, $bitex$view$View$$);
$bitex$view$ForgotPasswordView$$.prototype.$enterDocument$ = function $$bitex$view$ForgotPasswordView$$$$$enterDocument$$() {
  $bitex$view$ForgotPasswordView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_forgot_password"), "click", function($e$$140$$) {
    $e$$140$$.stopPropagation();
    $e$$140$$.preventDefault();
    $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email")).match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? this.dispatchEvent("recover_pwd") : ($goog$dom$getElement$$("id_forgot_password_email").focus(), this.$app_$.$showDialog$("Email inv\u00e1lido"))
  }, this)
};
$bitex$view$ForgotPasswordView$$.prototype.$getEmail$ = function $$bitex$view$ForgotPasswordView$$$$$getEmail$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email"))
};
// Input 121
function $bitex$view$BrokerView$$($app$$14$$, $opt_domHelper$$31$$) {
  $bitex$view$View$$.call(this, $app$$14$$, $opt_domHelper$$31$$)
}
$goog$inherits$$($bitex$view$BrokerView$$, $bitex$view$View$$);
$bitex$view$BrokerView$$.prototype.$enterDocument$ = function $$bitex$view$BrokerView$$$$$enterDocument$$() {
  $bitex$view$BrokerView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$app_$.$model_$, "model_setBroker", this.$onModelSetBroker_$)
};
$bitex$view$BrokerView$$.prototype.$onModelSetBroker_$ = function $$bitex$view$BrokerView$$$$$onModelSetBroker_$$($broker$$6_e$$141$$) {
  $broker$$6_e$$141$$ = $broker$$6_e$$141$$.data;
  var $fmt$$ = new $goog$i18n$NumberFormat$$(3);
  2 < $fmt$$.$minimumFractionDigits_$ && $JSCompiler_alias_THROW$$(Error("Min value must be less than max value"));
  $fmt$$.$maximumFractionDigits_$ = 2;
  2 > $fmt$$.$maximumFractionDigits_$ && $JSCompiler_alias_THROW$$(Error("Min value must be less than max value"));
  $fmt$$.$minimumFractionDigits_$ = 2;
  $broker$$6_e$$141$$.TransactionFeeBuy = $fmt$$.$format$($broker$$6_e$$141$$.TransactionFeeBuy / 1E4);
  $broker$$6_e$$141$$.TransactionFeeSell = $fmt$$.$format$($broker$$6_e$$141$$.TransactionFeeSell / 1E4);
  $goog$soy$renderElement$$($goog$dom$getElement$$("my_broker"), $bitex$templates$BrokerView$$, {$msg_broker$:$broker$$6_e$$141$$})
};
// Input 122
function $bitex$view$WithdrawView$$($app$$15$$, $opt_domHelper$$32$$) {
  $bitex$view$View$$.call(this, $app$$15$$, $opt_domHelper$$32$$);
  this.$qr_data_verb_$ = this.$qr_data_$ = this.$withdraw_action_$ = this.$confirmation_token_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$WithdrawView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$WithdrawView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  this.$destroyComponents_$()
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$WithdrawView$$.$superClass_$.$enterDocument$.call(this);
  var $model$$11$$ = this.$app_$.$model_$, $handler$$78$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, this.$app_$.$conn_$, "withdraw_response", this.$onBitexWithdrawResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, $model$$11$$, "model_setBrokerCurrencies", function() {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_user_balances_well"));
    var $broker_currencies$$2$$ = $model$$11$$.get("BrokerCurrencies");
    $goog$soy$renderElement$$($goog$dom$getElement$$("id_user_balances_well"), $bitex$templates$AccountBalances$$, {$currencies$:$broker_currencies$$2$$, action:"withdraw"});
    $JSCompiler_StaticMethods_updateDom$$($model$$11$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, this.$getElement$(), "click", function($e$$143_user_currency$$) {
    "withdraw" === $e$$143_user_currency$$.target.getAttribute("data-action") && ($e$$143_user_currency$$ = $e$$143_user_currency$$.target.getAttribute("data-currency"), $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$$(this, $e$$143_user_currency$$))
  }, this)
};
$JSCompiler_prototypeAlias$$.$getAmount$ = $JSCompiler_get$$("$amount_$");
$JSCompiler_prototypeAlias$$.$getWithdrawData$ = $JSCompiler_get$$("$data_$");
function $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$$($JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$, $currency$$4$$) {
  var $dialogContent_handler$$79_withdraw_methods$$ = $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$model_$.get("Broker").WithdrawStructure[$currency$$4$$], $method_element_id$$ = $goog$string$getRandomString$$(), $withdraw_amount_element_id$$ = $goog$string$getRandomString$$(), $fixed_fee_element_id$$ = $goog$string$getRandomString$$(), $percent_fee_element_id$$ = $goog$string$getRandomString$$(), $total_fees_element_id$$ = $goog$string$getRandomString$$(), $net_value_element_id$$ = 
  $goog$string$getRandomString$$(), $dialogContent_handler$$79_withdraw_methods$$ = $bitex$templates$DepositWithdrawDialogContent$$({$side$:"client", $currency$:$currency$$4$$, $currencySign$:$JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$getCurrencySign$($currency$$4$$), $methods$:$dialogContent_handler$$79_withdraw_methods$$, $methodID$:$method_element_id$$, $showFeeDataEntry$:$JSCompiler_alias_FALSE$$, $amountID$:$withdraw_amount_element_id$$, $fixedFeeID$:$fixed_fee_element_id$$, 
  $percentFeeID$:$percent_fee_element_id$$, $totalFeesID$:$total_fees_element_id$$, $netValueID$:$net_value_element_id$$, $hideNetAmount$:$JSCompiler_alias_TRUE$$}), $dlg$$ = $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$showDialog$($dialogContent_handler$$79_withdraw_methods$$, "Saque em " + $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$getCurrencyDescription$($currency$$4$$), $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $dialogContent_handler$$79_withdraw_methods$$ = 
  $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$getHandler$();
  $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$doCalculateFees_$($withdraw_amount_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $fixed_fee_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $percent_fee_element_id$$, $currency$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $total_fees_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + 
  "_" + $net_value_element_id$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_listen$$($dialogContent_handler$$79_withdraw_methods$$, $goog$dom$getElement$$($method_element_id$$), "change", function() {
    this.$app_$.$doCalculateFees_$($withdraw_amount_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $fixed_fee_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $percent_fee_element_id$$, $currency$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $total_fees_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $net_value_element_id$$, 
    $JSCompiler_alias_TRUE$$)
  });
  $JSCompiler_StaticMethods_listen$$($dialogContent_handler$$79_withdraw_methods$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($withdraw_amount_element_id$$)), "input", function() {
    this.$app_$.$doCalculateFees_$($withdraw_amount_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $fixed_fee_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $percent_fee_element_id$$, $currency$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $total_fees_element_id$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$)) + "_" + $net_value_element_id$$, 
    $JSCompiler_alias_TRUE$$)
  });
  $JSCompiler_StaticMethods_listenOnce$$($dialogContent_handler$$79_withdraw_methods$$, $dlg$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$146_withdraw_data$$) {
    "ok" == $e$$146_withdraw_data$$.key && ($e$$146_withdraw_data$$ = $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($dlg$$.$getContentElement$())), this.$amount_$ = $goog$string$toNumber$$($e$$146_withdraw_data$$.Amount), delete $e$$146_withdraw_data$$.Amount, this.$method_$ = $e$$146_withdraw_data$$.Method, delete $e$$146_withdraw_data$$.Method, this.$currency_$ = $e$$146_withdraw_data$$.Currency, delete $e$$146_withdraw_data$$.Currency, this.$data_$ = $e$$146_withdraw_data$$, this.dispatchEvent("request_withdraw"))
  }, $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$)
}
$JSCompiler_prototypeAlias$$.$onWithdrawListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableClick_$$($data$$38_e$$147$$) {
  var $element$$168$$ = $data$$38_e$$147$$.target;
  "I" === $element$$168$$.tagName && ($element$$168$$ = $goog$dom$getParentElement$$($element$$168$$));
  var $data_action$$2$$ = $element$$168$$.getAttribute("data-action");
  if($data_action$$2$$ != $JSCompiler_alias_NULL$$) {
    switch($data$$38_e$$147$$.preventDefault(), $data$$38_e$$147$$.stopPropagation(), $data$$38_e$$147$$ = $goog$json$parse$$($element$$168$$.getAttribute("data-row")), $data_action$$2$$) {
      case "SHOW_QR":
        this.$qr_data_$ = {Wallet:$data$$38_e$$147$$.Data.Wallet, Currency:$data$$38_e$$147$$.Currency}, this.$qr_data_verb_$ = "WITHDRAW", this.dispatchEvent("show_qr")
    }
  }
};
$JSCompiler_prototypeAlias$$.$onBitexWithdrawResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexWithdrawResponse_$$() {
  var $dlg_content_withdrawConfirmationDialog$$ = $bitex$templates$WithdrawConfirmationDialogContent$$(), $dlg_content_withdrawConfirmationDialog$$ = this.$app_$.$showDialog$($dlg_content_withdrawConfirmationDialog$$, "Confirmar", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
  $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg_content_withdrawConfirmationDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$149$$) {
    "ok" == $e$$149$$.key && (this.$confirmation_token_$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_withdraw_confirmation")), this.dispatchEvent("confirm_withdraw"))
  }, this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$81$$ = this.$getHandler$(), $model$$13$$ = this.$app_$.$model_$;
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$, this.$onWithdrawListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, "withdraw_refresh." + $model$$13$$.get("UserID"), this.$onWithdrawRefresh_$), 
  $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$.$getElement$(), "click", this.$onWithdrawListTableClick_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_complete", 
  this.$onUserSetWithdrawComplete_$), this.$withdraw_list_table_$.$dispose$());
  this.$request_id_$ = this.$withdraw_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$82$$ = this.$getHandler$(), $model$$14$$ = this.$app_$.$model_$;
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$59$$ = $goog$dom$getElement$$("id_withdraw_list_table"), $currency_method_description_obj$$ = {};
  $goog$object$forEach$$($model$$14$$.get("Broker").WithdrawStructure, function($method_list$$, $currency$$5$$) {
    $currency_method_description_obj$$[$currency$$5$$] = {};
    $goog$array$forEach$$($method_list$$, function($method$$6$$) {
      $currency_method_description_obj$$[$currency$$5$$][$method$$6$$.method] = $method$$6$$.description
    })
  });
  this.$withdraw_list_table_$ = new $bitex$ui$WithdrawList$$($currency_method_description_obj$$, $model$$14$$.get("IsBroker"), $model$$14$$.get("IsBroker"));
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, "withdraw_refresh." + $model$$14$$.get("UserID"), this.$onWithdrawRefresh_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_complete", this.$onUserSetWithdrawComplete_$);
  this.$withdraw_list_table_$.$decorate$($el$$59$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$withdraw_list_table_$, "Amount", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$.$getElement$(), "click", this.$onWithdrawListTableClick_$)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$151$$, $rowSet$$10$$) {
  var $priceCurrency$$3$$ = $rowSet$$10$$.Currency;
  return 0 === $value$$151$$ ? "-" : $goog$dom$createDom$$("abbr", {title:this.$app_$.$getCurrencyDescription$($priceCurrency$$3$$)}, this.$app_$.$formatCurrency$($value$$151$$ / 1E8, $priceCurrency$$3$$))
};
$JSCompiler_prototypeAlias$$.$onWithdrawListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableRequestData_$$($e$$150$$) {
  this.$app_$.$conn_$.$requestWithdrawList$(this.$request_id_$, $e$$150$$.options.Page, $e$$150$$.options.Limit, ["1", "2", "4", "8"], $JSCompiler_alias_VOID$$, $e$$150$$.options.Filter)
};
$JSCompiler_prototypeAlias$$.$onUserCancelWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onUserCancelWithdraw_$$() {
  this.$withdraw_action_$ = "CANCEL";
  this.$data_$ = this.$withdraw_list_table_$.$getWithdrawData$();
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onUserSetWithdrawInProgress_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetWithdrawInProgress_$$() {
  this.$withdraw_action_$ = "PROGRESS";
  this.$data_$ = this.$withdraw_list_table_$.$getWithdrawData$();
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onUserSetWithdrawComplete_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetWithdrawComplete_$$() {
  this.$withdraw_action_$ = "COMPLETE";
  this.$data_$ = this.$withdraw_list_table_$.$getWithdrawData$();
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onWithdrawRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawRefresh_$$($e$$154_msg$$61$$) {
  $e$$154_msg$$61$$ = $e$$154_msg$$61$$.data;
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$withdraw_list_table_$, $e$$154_msg$$61$$)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListReponse_$$($e$$155_msg$$62$$) {
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$155_msg$$62$$ = $e$$155_msg$$62$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$withdraw_list_table_$, $e$$155_msg$$62$$.WithdrawListGrp, $e$$155_msg$$62$$.Columns))
};
// Input 123
function $bitex$ui$LedgerActivity$$($opt_domHelper$$33$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"Created", label:"Data/Hora", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-date-time"
  }}, {property:"Currency", label:"Moeda", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-currency"
  }}, {property:"Description", label:"Descri\u00e7\u00e3o", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$48$$, $rowSet$$11$$) {
    var $MSG_LEDGER_TRADE_DESCRIPTION$$ = "Neg\u00f3cio com " + $rowSet$$11$$.PayeeName;
    switch($s$$48$$) {
      case "D":
        return"Dep\u00f3sito";
      case "DF":
        return"Taxa de dep\u00f3sito";
      case "W":
        return"Saque";
      case "WF":
        return"Taxa de saque";
      case "T":
        return $MSG_LEDGER_TRADE_DESCRIPTION$$;
      case "TF":
        return"Comiss\u00e3o sobre neg\u00f3cio"
    }
  }, classes:function() {
    return $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-description"
  }}, {property:"Amount", label:"Valor", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-amount"
  }}, {property:"Balance", label:"Saldo", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-balance"
  }}]}, $opt_domHelper$$33$$)
}
$goog$inherits$$($bitex$ui$LedgerActivity$$, $bitex$ui$DataGrid$$);
var $bitex$ui$LedgerActivity$CSS_CLASS$$ = "ledger-activity";
$bitex$ui$LedgerActivity$$.prototype.$getCssClass$ = function $$bitex$ui$LedgerActivity$$$$$getCssClass$$() {
  return $bitex$ui$LedgerActivity$CSS_CLASS$$
};
$bitex$ui$LedgerActivity$$.prototype.$getRowClass$ = function $$bitex$ui$LedgerActivity$$$$$getRowClass$$($row_set$$11$$) {
  var $class_status$$6$$;
  switch($row_set$$11$$.Operation) {
    case "D":
      $class_status$$6$$ = $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-debit";
      break;
    case "C":
      $class_status$$6$$ = $bitex$ui$LedgerActivity$CSS_CLASS$$ + "-credit"
  }
  return $class_status$$6$$
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$LedgerActivity$CSS_CLASS$$, function() {
  return new $bitex$ui$LedgerActivity$$
});
// Input 124
function $bitex$view$LedgerView$$($app$$16$$, $opt_domHelper$$34$$) {
  $bitex$view$View$$.call(this, $app$$16$$, $opt_domHelper$$34$$);
  this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$LedgerView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$LedgerView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  this.$destroyComponents_$()
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$83$$ = this.$getHandler$();
  this.$ledger_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$83$$, this.$ledger_table_$, "request_data", this.$onLedgerTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$83$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, this.$onLedgerListResponse_$), this.$ledger_table_$.$dispose$());
  this.$request_id_$ = this.$ledger_table_$ = $JSCompiler_alias_NULL$$;
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_ledger_list"))
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$84$$ = this.$getHandler$(), $broker_currencies$$3_el$$60_model$$15$$ = this.$app_$.$model_$;
  this.$destroyComponents_$();
  var $broker_currencies$$3_el$$60_model$$15$$ = $broker_currencies$$3_el$$60_model$$15$$.get("BrokerCurrencies"), $button_filters$$ = [{label:"Todas as moedas", value:"all"}];
  $goog$array$forEach$$($broker_currencies$$3_el$$60_model$$15$$, function($currency_code$$1$$) {
    $button_filters$$.push({label:this.$app_$.$getCurrencyDescription$($currency_code$$1$$), value:"CURRENCY=" + $currency_code$$1$$})
  }, this);
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_ledger_list"), $bitex$templates$DataGrid$$, {id:"id_ledger_list_table", title:"Livro cont\u00e1bil", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Pesquisar ...", $button_filters$:$button_filters$$});
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  $broker_currencies$$3_el$$60_model$$15$$ = $goog$dom$getElement$$("id_ledger_list_table");
  this.$ledger_table_$ = new $bitex$ui$LedgerActivity$$;
  $JSCompiler_StaticMethods_listen$$($handler$$84$$, this.$ledger_table_$, "request_data", this.$onLedgerTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$84$$, this.$app_$.$conn_$, "ledger_list." + this.$request_id_$, this.$onLedgerListResponse_$);
  this.$ledger_table_$.$decorate$($broker_currencies$$3_el$$60_model$$15$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$ledger_table_$, "Amount", this.$amountFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$ledger_table_$, "Balance", this.$balanceFormatter_$, this)
};
$JSCompiler_prototypeAlias$$.$amountFormatter_$ = function $$JSCompiler_prototypeAlias$$$$amountFormatter_$$($value$$152$$, $rowSet$$12$$) {
  "D" == $rowSet$$12$$.Operation && ($value$$152$$ *= -1);
  return this.$app_$.$formatCurrency$($value$$152$$ / 1E8, $rowSet$$12$$.Currency)
};
$JSCompiler_prototypeAlias$$.$balanceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$balanceFormatter_$$($value$$153$$, $rowSet$$13$$) {
  return this.$app_$.$formatCurrency$($value$$153$$ / 1E8, $rowSet$$13$$.Currency)
};
$JSCompiler_prototypeAlias$$.$onLedgerTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onLedgerTableRequestData_$$($e$$156_filters_param$$) {
  var $page$$12$$ = $e$$156_filters_param$$.options.Page, $limit$$12$$ = $e$$156_filters_param$$.options.Limit;
  $e$$156_filters_param$$ = $e$$156_filters_param$$.options.Filter;
  var $currency$$6$$, $filters$$ = [];
  $goog$isArrayLike$$($e$$156_filters_param$$) && $goog$array$forEach$$($e$$156_filters_param$$, function($filter$$10$$) {
    "CURRENCY=" == $filter$$10$$.substr(0, 9) ? $currency$$6$$ = $filter$$10$$.substr(9) : $filters$$.push($filter$$10$$)
  }, this);
  this.$app_$.$conn_$.$requestLedgerList$(this.$request_id_$, $page$$12$$, $limit$$12$$, $JSCompiler_alias_VOID$$, $currency$$6$$, $filters$$)
};
$JSCompiler_prototypeAlias$$.$onLedgerListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onLedgerListResponse_$$($e$$157_msg$$63$$) {
  this.$ledger_table_$ != $JSCompiler_alias_NULL$$ && ($e$$157_msg$$63$$ = $e$$157_msg$$63$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$ledger_table_$, $e$$157_msg$$63$$.LedgerListGrp, $e$$157_msg$$63$$.Columns))
};
// Input 125
// Input 126
function $goog$history$Event$$($token$$6$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$6$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 127
function $goog$history$Html5History$$($opt_win$$, $opt_transformer$$) {
  $goog$Disposable$$.call(this);
  this.$window_$ = $opt_win$$ || window;
  this.$transformer_$ = $opt_transformer$$ || $JSCompiler_alias_NULL$$;
  $goog$events$listen$$(this.$window_$, "popstate", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this);
  $goog$events$listen$$(this.$window_$, "hashchange", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this)
}
$goog$inherits$$($goog$history$Html5History$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$history$Html5History$$.prototype;
$JSCompiler_prototypeAlias$$.$enabled_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$useFragment_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$pathPrefix_$ = "/";
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$17$$) {
  $enable$$17$$ != this.$enabled_$ && (this.$enabled_$ = $enable$$17$$) && this.dispatchEvent(new $goog$history$Event$$(this.$getToken$(), $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$getToken$ = function $$JSCompiler_prototypeAlias$$$$getToken$$() {
  if(this.$useFragment_$) {
    var $loc$$ = this.$window_$.location.href, $index$$80$$ = $loc$$.indexOf("#");
    return 0 > $index$$80$$ ? "" : $loc$$.substring($index$$80$$ + 1)
  }
  return this.$transformer_$ ? this.$transformer_$.$retrieveToken$(this.$pathPrefix_$, this.$window_$.location) : this.$window_$.location.pathname.substr(this.$pathPrefix_$.length)
};
function $JSCompiler_StaticMethods_setToken$$($JSCompiler_StaticMethods_setToken$self$$, $token$$7$$) {
  $token$$7$$ != $JSCompiler_StaticMethods_setToken$self$$.$getToken$() && ($JSCompiler_StaticMethods_setToken$self$$.$window_$.history.pushState($JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_setToken$self$$.$window_$.document.title || "", $JSCompiler_StaticMethods_setToken$self$$.$useFragment_$ ? "#" + $token$$7$$ : $JSCompiler_StaticMethods_setToken$self$$.$transformer_$ ? $JSCompiler_StaticMethods_setToken$self$$.$transformer_$.$createUrl$($token$$7$$, $JSCompiler_StaticMethods_setToken$self$$.$pathPrefix_$, 
  $JSCompiler_StaticMethods_setToken$self$$.$window_$.location) : $JSCompiler_StaticMethods_setToken$self$$.$pathPrefix_$ + $token$$7$$ + $JSCompiler_StaticMethods_setToken$self$$.$window_$.location.search), $JSCompiler_StaticMethods_setToken$self$$.dispatchEvent(new $goog$history$Event$$($token$$7$$, $JSCompiler_alias_FALSE$$)))
}
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$unlisten$$(this.$window_$, "popstate", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this);
  this.$useFragment_$ && $goog$events$unlisten$$(this.$window_$, "hashchange", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this)
};
$JSCompiler_prototypeAlias$$.$onHistoryEvent_$ = function $$JSCompiler_prototypeAlias$$$$onHistoryEvent_$$() {
  this.$enabled_$ && this.dispatchEvent(new $goog$history$Event$$(this.$getToken$(), $JSCompiler_alias_TRUE$$))
};
// Input 128
function $bitex$app$UrlRouter$$($app$$17$$, $baseUrl$$, $defaultView$$) {
  this.$urls_$ = [];
  this.$app_$ = $app$$17$$;
  this.$history_$ = $JSCompiler_alias_NULL$$;
  this.$base_url_$ = $baseUrl$$;
  this.$default_view_$ = $defaultView$$
}
$goog$inherits$$($bitex$app$UrlRouter$$, $goog$events$EventTarget$$);
function $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_addView$self$$, $view_name$$, $viewObject$$) {
  $JSCompiler_StaticMethods_addView$self$$.$urls_$.push({$re$:$view_name$$, view:$viewObject$$})
}
function $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setViewInternal$self$$, $view_name$$1$$) {
  var $actual_view_name$$ = $goog$string$remove$$($view_name$$1$$, $JSCompiler_StaticMethods_setViewInternal$self$$.$base_url_$);
  "" === $actual_view_name$$ && ($actual_view_name$$ = $JSCompiler_StaticMethods_setViewInternal$self$$.$default_view_$);
  var $urlMapping$$ = $goog$array$find$$($JSCompiler_StaticMethods_setViewInternal$self$$.$urls_$, function($url_object$$) {
    if(RegExp($url_object$$.$re$, "g").exec($actual_view_name$$) != $JSCompiler_alias_NULL$$) {
      return $JSCompiler_alias_TRUE$$
    }
  });
  if($urlMapping$$ == $JSCompiler_alias_NULL$$ || $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ === $actual_view_name$$) {
    return $JSCompiler_alias_FALSE$$
  }
  $JSCompiler_StaticMethods_setViewInternal$self$$.$activeViewInfo_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setViewInternal$self$$.$activeViewInfo_$.view.$exitView$();
  var $args$$13$$ = RegExp($urlMapping$$.$re$, "g").exec($actual_view_name$$).splice(2);
  $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $actual_view_name$$;
  $JSCompiler_StaticMethods_setViewInternal$self$$.$activeViewInfo_$ = $urlMapping$$;
  $JSCompiler_StaticMethods_setViewInternal$self$$.$activeViewInfo_$.view.$enterView$($args$$13$$);
  return $JSCompiler_alias_TRUE$$
}
$bitex$app$UrlRouter$$.prototype.$setView$ = function $$bitex$app$UrlRouter$$$$$setView$$($view_name$$2$$) {
  var $urlMapping$$1_view_url$$1$$ = $goog$array$find$$(this.$urls_$, function($url_object$$1$$) {
    if(RegExp($url_object$$1$$.$re$, "g").exec($view_name$$2$$) != $JSCompiler_alias_NULL$$) {
      return $JSCompiler_alias_TRUE$$
    }
  });
  if("/" === $view_name$$2$$[0] && $urlMapping$$1_view_url$$1$$ == $JSCompiler_alias_NULL$$) {
    this.$setView$($view_name$$2$$.substr(1))
  }else {
    var $actual_view_name$$1_view_id$$1$$ = $goog$string$remove$$($view_name$$2$$, this.$base_url_$), $view_args_view_data$$1$$ = RegExp($urlMapping$$1_view_url$$1$$.$re$, "g").exec($actual_view_name$$1_view_id$$1$$), $urlMapping$$1_view_url$$1$$ = $view_args_view_data$$1$$[0], $actual_view_name$$1_view_id$$1$$ = $view_args_view_data$$1$$[1], $view_args_view_data$$1$$ = $view_args_view_data$$1$$.splice(2);
    this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $actual_view_name$$1_view_id$$1$$, $view_args_view_data$$1$$, $urlMapping$$1_view_url$$1$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $view_name$$2$$) && this.$history_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setToken$$(this.$history_$, this.$base_url_$ + $view_name$$2$$)
  }
};
$bitex$app$UrlRouter$$.prototype.init = function $$bitex$app$UrlRouter$$$$init$() {
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_805$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
};
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$159_view_name$$3$$) {
  $e$$159_view_name$$3$$.$isNavigation$ && ($e$$159_view_name$$3$$ = $e$$159_view_name$$3$$.$token$, this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $e$$159_view_name$$3$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $e$$159_view_name$$3$$))
};
function $bitex$app$UrlRouterEvent$$($type$$107$$, $view_id$$2$$, $view_args$$1$$, $view_url$$2$$) {
  $goog$events$Event$$.call(this, $type$$107$$);
  this.$view_id$ = $view_id$$2$$;
  this.$view_args$ = $view_args$$1$$;
  this.$view_url$ = $view_url$$2$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 129
function $bitex$view$VerificationView$$($app$$18$$, $opt_domHelper$$35$$) {
  $bitex$view$View$$.call(this, $app$$18$$, $opt_domHelper$$35$$);
  this.$loaded_jot_form_$ = $JSCompiler_alias_FALSE$$
}
$goog$inherits$$($bitex$view$VerificationView$$, $bitex$view$View$$);
$bitex$view$VerificationView$$.prototype.$enterView$ = function $$bitex$view$VerificationView$$$$$enterView$$() {
  if(!this.$loaded_jot_form_$) {
    var $form_src_model$$16$$ = this.$app_$.$model_$, $broker$$7_verificationIFrameForm$$ = $form_src_model$$16$$.get("Broker");
    $broker$$7_verificationIFrameForm$$ != $JSCompiler_alias_NULL$$ && ($form_src_model$$16$$ = $goog$string$subs$$($broker$$7_verificationIFrameForm$$.VerificationForm, $form_src_model$$16$$.get("UserID"), $form_src_model$$16$$.get("Username"), $form_src_model$$16$$.get("Email")), $broker$$7_verificationIFrameForm$$ = $goog$dom$getElement$$("JotFormIFrame"), $broker$$7_verificationIFrameForm$$.src !== $form_src_model$$16$$ && ($broker$$7_verificationIFrameForm$$.src = $form_src_model$$16$$, this.$loaded_jot_form_$ = 
    $JSCompiler_alias_TRUE$$))
  }
};
$bitex$view$VerificationView$$.prototype.$enterDocument$ = function $$bitex$view$VerificationView$$$$$enterDocument$$() {
  $bitex$view$VerificationView$$.$superClass_$.$enterDocument$.call(this)
};
// Input 130
function $bitex$view$SideBarView$$($app$$19$$, $opt_domHelper$$36$$) {
  $bitex$view$View$$.call(this, $app$$19$$, $opt_domHelper$$36$$)
}
$goog$inherits$$($bitex$view$SideBarView$$, $bitex$view$View$$);
$bitex$view$SideBarView$$.prototype.$enterDocument$ = function $$bitex$view$SideBarView$$$$$enterDocument$$() {
  $bitex$view$SideBarView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$85$$ = this.$getHandler$(), $model$$17$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$85$$, $model$$17$$, "model_setBrokerCurrencies", function() {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_account_summary_content"));
    if(!$model$$17$$.get("IsBroker")) {
      var $broker_currencies$$4$$ = $model$$17$$.get("BrokerCurrencies");
      $goog$soy$renderElement$$($goog$dom$getElement$$("id_account_summary_content"), $bitex$templates$YourAccountSummary$$, {$currencies$:$broker_currencies$$4$$})
    }
  });
  $JSCompiler_StaticMethods_listen$$($handler$$85$$, $model$$17$$, "model_setSecurityList", function() {
    var $msg$$64$$ = $model$$17$$.get("SecurityList");
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_instrument_1"));
    $goog$array$forEach$$($msg$$64$$.Instruments, function($el$$61_instrument$$2$$) {
      $el$$61_instrument$$2$$ = $goog$dom$createDom$$("option", {value:$el$$61_instrument$$2$$.Symbol}, $el$$61_instrument$$2$$.Description);
      $goog$dom$getElement$$("id_instrument_1").appendChild($el$$61_instrument$$2$$)
    }, this)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$85$$, $model$$17$$, "model_setAllowedMarkets", function() {
    var $allowed_markets$$1_allowed_markets_array$$ = $model$$17$$.get("AllowedMarkets"), $allowed_markets$$1_allowed_markets_array$$ = $goog$object$getKeys$$($allowed_markets$$1_allowed_markets_array$$);
    0 < $allowed_markets$$1_allowed_markets_array$$.length && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_instrument_1"), $allowed_markets$$1_allowed_markets_array$$[0]), this.dispatchEvent("changed_market"))
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$85$$, $goog$dom$getElement$$("id_instrument_1"), "change", function() {
    this.dispatchEvent("changed_market")
  }, this)
};
$bitex$view$SideBarView$$.prototype.$getSymbol$ = function $$bitex$view$SideBarView$$$$$getSymbol$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_instrument_1"))
};
// Input 131
// Input 132
// Input 133
function $bootstrap$Alert$$($opt_type$$11$$, $opt_content$$, $opt_close$$, $opt_domHelper$$37$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$37$$);
  this.$type_$ = $opt_type$$11$$;
  this.$content_$ = $opt_content$$;
  this.$has_close_$ = $JSCompiler_alias_TRUE$$;
  $opt_close$$ != $JSCompiler_alias_NULL$$ && $opt_close$$ === $JSCompiler_alias_FALSE$$ && (this.$has_close_$ = $JSCompiler_alias_FALSE$$)
}
$goog$inherits$$($bootstrap$Alert$$, $goog$ui$Component$$);
$bootstrap$Alert$$.prototype.$getCssClass$ = $JSCompiler_returnArg$$("alert");
$bootstrap$Alert$$.prototype.$createDom$ = function $$bootstrap$Alert$$$$$createDom$$() {
  var $dom$$19_element$$169$$ = this.$getDomHelper$();
  return this.$element_$ = $dom$$19_element$$169$$ = this.$has_close_$ ? $dom$$19_element$$169$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], $dom$$19_element$$169$$.$createDom$("button", ["close", "pull-right"], "\u00d7"), this.$content_$) : $dom$$19_element$$169$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], this.$content_$)
};
$bootstrap$Alert$$.prototype.$logger_$ = $goog$debug$LogManager$getLogger$$("bootstrap.Alert");
$bootstrap$Alert$$.prototype.$enterDocument$ = function $$bootstrap$Alert$$$$$enterDocument$$() {
  $bootstrap$Alert$$.$superClass_$.$enterDocument$.call(this);
  var $closeBtn_dom$$20$$ = this.$getDomHelper$(), $handler$$86$$ = this.$getHandler$(), $closeBtn_dom$$20$$ = $closeBtn_dom$$20$$.$getElementByClass$("close", this.$getElement$());
  $closeBtn_dom$$20$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_listenOnce$$($handler$$86$$, $closeBtn_dom$$20$$, "click", function() {
    this.$dispose$()
  })
};
// Input 134
function $bitex$view$AccountOverview$$($app$$20$$, $opt_domHelper$$38$$) {
  $bitex$view$View$$.call(this, $app$$20$$, $opt_domHelper$$38$$);
  this.$qr_data_verb_$ = this.$qr_data_$ = this.$deposit_data_$ = this.$deposit_action_$ = this.$withdraw_action_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$AccountOverview$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$AccountOverview$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$($username$$8$$) {
  var $selectedCustomer$$ = this.$app_$.$model_$.get("SelectedCustomer");
  $selectedCustomer$$ != $JSCompiler_alias_NULL$$ && $selectedCustomer$$.Username == $username$$8$$ && this.$recreateComponents_$($selectedCustomer$$)
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  var $selectedCustomer$$1$$ = this.$app_$.$model_$.get("SelectedCustomer");
  this.$destroyComponents_$($selectedCustomer$$1$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$AccountOverview$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$($account_overview_header_el_customer$$) {
  var $handler$$88$$ = this.$getHandler$();
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListResponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, "process_deposit." + this.$request_id_$, this.$onDepositProcessResponse_$), 
  $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $account_overview_header_el_customer$$.ID, this.$onDepositRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$), this.$deposit_list_table_$.$dispose$());
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$), 
  $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$withdraw_list_table_$, "withdraw_complete", this.$onUserSetWithdrawComplete_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, "process_withdraw." + this.$request_id_$, this.$onWithdrawProcessResponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, 
  "withdraw_refresh." + $account_overview_header_el_customer$$.ID, this.$onWithdrawRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, "balance_response", this.$onBalanceResponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$withdraw_list_table_$.$getElement$(), "click", this.$onWithdrawListTableClick_$), this.$withdraw_list_table_$.$dispose$());
  $account_overview_header_el_customer$$ = $goog$dom$getElement$$("account_overview_header_id");
  $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, $account_overview_header_el_customer$$, "click", this.$onAccountOverviewHeaderClick_$);
  $JSCompiler_StaticMethods_unlisten$$($handler$$88$$, this.$app_$.$conn_$, "verify_customer_response." + this.$request_id_$, this.$onVerifyCustomerResponse_$);
  $goog$dom$removeChildren$$($account_overview_header_el_customer$$);
  this.$request_id_$ = this.$deposit_list_table_$ = this.$withdraw_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$($customer$$1$$) {
  var $handler$$89$$ = this.$getHandler$(), $broker$$8_model$$19$$ = this.$app_$.$model_$;
  this.$destroyComponents_$($customer$$1$$);
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $account_overview_header_el$$1$$ = $goog$dom$getElement$$("account_overview_header_id");
  $goog$soy$renderElement$$($account_overview_header_el$$1$$, $bitex$templates$AccountOverviewHeader$$, {$msg_customer_detail$:$customer$$1$$});
  $broker$$8_model$$19$$ = $broker$$8_model$$19$$.get("Broker");
  this.$deposit_list_table_$ = new $bitex$ui$DepositList$$($broker$$8_model$$19$$.CryptoCurrencies, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, "process_deposit." + this.$request_id_$, this.$onDepositProcessResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $customer$$1$$.ID, this.$onDepositRefresh_$);
  var $currency_method_description_obj$$1$$ = {};
  $goog$object$forEach$$($broker$$8_model$$19$$.WithdrawStructure, function($method_list$$1$$, $currency$$7$$) {
    $currency_method_description_obj$$1$$[$currency$$7$$] = {};
    $goog$array$forEach$$($method_list$$1$$, function($method$$7$$) {
      $currency_method_description_obj$$1$$[$currency$$7$$][$method$$7$$.method] = $method$$7$$.description
    })
  });
  this.$withdraw_list_table_$ = new $bitex$ui$WithdrawList$$($currency_method_description_obj$$1$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$withdraw_list_table_$, "withdraw_complete", this.$onUserSetWithdrawComplete_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, "process_withdraw." + this.$request_id_$, this.$onWithdrawProcessResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, "withdraw_refresh." + $customer$$1$$.ID, this.$onWithdrawRefresh_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, "balance_response", this.$onBalanceResponse_$);
  this.$deposit_list_table_$.$decorate$($goog$dom$getElement$$("account_overview_deposits_table_id"));
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$deposit_list_table_$, "Value", this.$valuePriceFormatter_$, this);
  this.$withdraw_list_table_$.$decorate$($goog$dom$getElement$$("account_overview_withdraw_requests_table_id"));
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$withdraw_list_table_$, "Amount", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$withdraw_list_table_$.$getElement$(), "click", this.$onWithdrawListTableClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, $account_overview_header_el$$1$$, "click", this.$onAccountOverviewHeaderClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$89$$, this.$app_$.$conn_$, "verify_customer_response." + this.$request_id_$, this.$onVerifyCustomerResponse_$);
  this.$app_$.$conn_$.$requestBalances$($customer$$1$$.ID)
};
$JSCompiler_prototypeAlias$$.$getWithdrawData$ = function $$JSCompiler_prototypeAlias$$$$getWithdrawData$$() {
  return this.$withdraw_list_table_$.$getWithdrawData$()
};
$JSCompiler_prototypeAlias$$.$getClientID$ = $JSCompiler_get$$("$client_id_$");
$JSCompiler_prototypeAlias$$.$getDepositData$ = $JSCompiler_get$$("$deposit_data_$");
$JSCompiler_prototypeAlias$$.$getDepositAction$ = $JSCompiler_get$$("$deposit_action_$");
$JSCompiler_prototypeAlias$$.$onDepositListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableRequestData_$$($e$$165_filter$$11$$) {
  var $page$$13$$ = $e$$165_filter$$11$$.options.Page, $limit$$13$$ = $e$$165_filter$$11$$.options.Limit;
  $e$$165_filter$$11$$ = $e$$165_filter$$11$$.options.Filter;
  var $selectedCustomer$$2$$ = this.$app_$.$model_$.get("SelectedCustomer");
  this.$app_$.$conn_$.$requestDepositList$(this.$request_id_$, $page$$13$$, $limit$$13$$, ["0", "1", "2", "4", "8"], $selectedCustomer$$2$$.ID, $e$$165_filter$$11$$)
};
$JSCompiler_prototypeAlias$$.$onDepositRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onDepositRefresh_$$($e$$166_msg$$65$$) {
  $e$$166_msg$$65$$ = $e$$166_msg$$65$$.data;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$deposit_list_table_$, $e$$166_msg$$65$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListResponse_$$($e$$167_msg$$66$$) {
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$167_msg$$66$$ = $e$$167_msg$$66$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$deposit_list_table_$, $e$$167_msg$$66$$.DepositListGrp, $e$$167_msg$$66$$.Columns))
};
$JSCompiler_prototypeAlias$$.$onVerifyCustomerResponse_$ = function $$JSCompiler_prototypeAlias$$$$onVerifyCustomerResponse_$$($e$$168_new_verified_data_el$$) {
  $e$$168_new_verified_data_el$$ = $goog$soy$renderAsElement$$($bitex$templates$AccountOverviewHeaderVerifiedData$$, {$msg_customer_detail$:$e$$168_new_verified_data_el$$.data}, $JSCompiler_alias_VOID$$, new $goog$dom$DomHelper$$($JSCompiler_alias_VOID$$));
  var $verified_data_el$$ = $goog$dom$getElementByClass$$("account-overview-verified", $goog$dom$getElement$$("account_overview_header_id"));
  $goog$dom$removeChildren$$($verified_data_el$$);
  $verified_data_el$$.appendChild($e$$168_new_verified_data_el$$)
};
$JSCompiler_prototypeAlias$$.$onAccountOverviewHeaderClick_$ = function $$JSCompiler_prototypeAlias$$$$onAccountOverviewHeaderClick_$$($e$$169_handler$$90$$) {
  var $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ = $e$$169_handler$$90$$.target;
  "I" === $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$.tagName && ($data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ = $goog$dom$getParentElement$$($data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$));
  $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ = $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$.getAttribute("data-action");
  if($data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ != $JSCompiler_alias_NULL$$) {
    switch($e$$169_handler$$90$$.preventDefault(), $e$$169_handler$$90$$.stopPropagation(), $e$$169_handler$$90$$ = this.$getHandler$(), $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$) {
      case "SET_VERIFIED":
        var $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ = this.$app_$.$model_$.get("SelectedCustomer"), $data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$ = $bitex$templates$EnterVerificationDataDialogContent$$({$clientID$:$data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$.ID}), $dlg$$1$$ = this.$app_$.$showDialog$($data_action$$3_dlg_content$$1_element$$171_selectedCustomer$$3$$, "Link para onde est\u00e3o os documentos de verifica\u00e7\u00e3o desta conta", 
        $bootstrap$Dialog$ButtonSet$createOkCancel$$());
        $JSCompiler_StaticMethods_listen$$($e$$169_handler$$90$$, $dlg$$1$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$170_verification_data$$) {
          "ok" == $e$$170_verification_data$$.key && ($e$$170_verification_data$$.preventDefault(), $e$$170_verification_data$$.stopPropagation(), $e$$170_verification_data$$ = $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($dlg$$1$$.$getContentElement$())), console.log($goog$debug$deepExpose$$($e$$170_verification_data$$)), $e$$170_verification_data$$.VerificationData != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($e$$170_verification_data$$.VerificationData) && (this.$client_id_$ = 
          $goog$string$toNumber$$($e$$170_verification_data$$.ClientID), this.$verification_data_$ = $e$$170_verification_data$$.VerificationData, this.dispatchEvent("set_verified"), $dlg$$1$$.$dispose$()))
        })
    }
  }
};
$JSCompiler_prototypeAlias$$.$onWithdrawListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableClick_$$($data$$39_e$$171$$) {
  var $element$$172$$ = $data$$39_e$$171$$.target;
  "I" === $element$$172$$.tagName && ($element$$172$$ = $goog$dom$getParentElement$$($element$$172$$));
  var $data_action$$4$$ = $element$$172$$.getAttribute("data-action");
  if($data_action$$4$$ != $JSCompiler_alias_NULL$$) {
    switch($data$$39_e$$171$$.preventDefault(), $data$$39_e$$171$$.stopPropagation(), $data$$39_e$$171$$ = $goog$json$parse$$($element$$172$$.getAttribute("data-row")), $data_action$$4$$) {
      case "SHOW_QR":
        this.$qr_data_$ = {Wallet:$data$$39_e$$171$$.Data.Wallet, Currency:$data$$39_e$$171$$.Currency}, this.$qr_data_verb_$ = "WITHDRAW", this.dispatchEvent("show_qr")
    }
  }
};
$JSCompiler_prototypeAlias$$.$onDepositListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableClick_$$($e$$172$$) {
  var $element$$173$$ = $e$$172$$.target;
  "I" === $element$$173$$.tagName && ($element$$173$$ = $goog$dom$getParentElement$$($element$$173$$));
  var $data_action$$5$$ = $element$$173$$.getAttribute("data-action");
  if($data_action$$5$$ != $JSCompiler_alias_NULL$$) {
    switch($e$$172$$.preventDefault(), $e$$172$$.stopPropagation(), this.$deposit_action_$ = $data_action$$5$$, this.$deposit_data_$ = $goog$json$parse$$($element$$173$$.getAttribute("data-row")), $data_action$$5$$) {
      case "SHOW_QR":
        this.$qr_data_$ = {Wallet:this.$deposit_data_$.Data.InputAddress, Currency:this.$deposit_data_$.Currency};
        this.$qr_data_verb_$ = "DEPOSIT";
        this.dispatchEvent("show_qr");
        break;
      case "UPLOAD":
        this.dispatchEvent("upload_receipt");
        break;
      case "CANCEL":
      ;
      case "PROGRESS":
      ;
      case "COMPLETE":
        this.dispatchEvent("process_deposit")
    }
  }
};
$JSCompiler_prototypeAlias$$.$onUserCancelWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onUserCancelWithdraw_$$() {
  this.$withdraw_action_$ = "CANCEL";
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onUserSetWithdrawInProgress_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetWithdrawInProgress_$$() {
  this.$withdraw_action_$ = "PROGRESS";
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onUserSetWithdrawComplete_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetWithdrawComplete_$$() {
  this.$withdraw_action_$ = "COMPLETE";
  this.dispatchEvent("process_withdraw")
};
$JSCompiler_prototypeAlias$$.$onWithdrawListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableRequestData_$$($e$$176_filter$$12$$) {
  var $page$$14$$ = $e$$176_filter$$12$$.options.Page, $limit$$14$$ = $e$$176_filter$$12$$.options.Limit;
  $e$$176_filter$$12$$ = $e$$176_filter$$12$$.options.Filter;
  var $selectedCustomer$$4$$ = this.$app_$.$model_$.get("SelectedCustomer");
  this.$app_$.$conn_$.$requestWithdrawList$(this.$request_id_$, $page$$14$$, $limit$$14$$, ["1", "2", "4", "8"], $selectedCustomer$$4$$.ID, $e$$176_filter$$12$$)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$154$$, $rowSet$$14$$) {
  var $priceCurrency$$4$$ = $rowSet$$14$$.Currency;
  return 0 === $value$$154$$ ? "-" : $goog$dom$createDom$$("abbr", {title:this.$app_$.$getCurrencyDescription$($priceCurrency$$4$$)}, this.$app_$.$formatCurrency$($value$$154$$ / 1E8, $priceCurrency$$4$$))
};
$JSCompiler_prototypeAlias$$.$valuePriceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$valuePriceFormatter_$$($value$$155$$, $rowSet$$15$$) {
  var $formatted_paid_value$$1_paid_value$$1$$ = $rowSet$$15$$.PaidValue, $priceCurrency$$5$$ = $rowSet$$15$$.Currency, $currency_description$$3$$ = this.$app_$.$getCurrencyDescription$($priceCurrency$$5$$), $formatted_value$$1$$ = this.$app_$.$formatCurrency$($value$$155$$ / 1E8, $priceCurrency$$5$$);
  return 0 === $value$$155$$ ? 0 === $formatted_paid_value$$1_paid_value$$1$$ ? "-" : $goog$dom$createDom$$("abbr", {title:$currency_description$$3$$}, this.$app_$.$formatCurrency$($formatted_paid_value$$1_paid_value$$1$$ / 1E8, $priceCurrency$$5$$)) : 0 < $formatted_paid_value$$1_paid_value$$1$$ && $formatted_paid_value$$1_paid_value$$1$$ != $value$$155$$ ? ($formatted_paid_value$$1_paid_value$$1$$ = this.$app_$.$formatCurrency$($formatted_paid_value$$1_paid_value$$1$$ / 1E8, $priceCurrency$$5$$), 
  $goog$dom$createDom$$("abbr", {title:"declarado / pago em " + $currency_description$$3$$}, $formatted_value$$1$$ + " / " + $formatted_paid_value$$1_paid_value$$1$$)) : $goog$dom$createDom$$("abbr", {title:$currency_description$$3$$}, $formatted_value$$1$$)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListReponse_$$($e$$177_msg$$68$$) {
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$177_msg$$68$$ = $e$$177_msg$$68$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$withdraw_list_table_$, $e$$177_msg$$68$$.WithdrawListGrp, $e$$177_msg$$68$$.Columns))
};
$JSCompiler_prototypeAlias$$.$onWithdrawProcessResponse_$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$onDepositProcessResponse_$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$onBalanceResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBalanceResponse_$$($e$$180_user_balances$$) {
  var $msg$$71$$ = $e$$180_user_balances$$.data, $model$$20$$ = this.$app_$.$model_$;
  delete $msg$$71$$.MsgType;
  delete $msg$$71$$.BalanceReqID;
  $e$$180_user_balances$$ = $msg$$71$$[$model$$20$$.get("UserID")];
  var $currencies$$ = [];
  $goog$object$forEach$$($e$$180_user_balances$$, function($balance$$, $currency$$8$$) {
    $balance$$ /= 1E8;
    var $formatted_balance$$ = this.$app_$.$formatCurrency$($balance$$, $currency$$8$$);
    $currencies$$.push({code:$currency$$8$$, $model_key$:$currency$$8$$ + "." + $msg$$71$$.ClientID, $balance$:$formatted_balance$$});
    var $balance_key$$ = "balance_" + $currency$$8$$ + "." + $msg$$71$$.ClientID;
    $model$$20$$.set($balance_key$$, $balance$$);
    $model$$20$$.set("formatted_" + $balance_key$$, $formatted_balance$$)
  }, this);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_balances_id"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_balances_id"), $bitex$templates$YourAccountBalances$$, {$currencies$:$currencies$$})
};
$JSCompiler_prototypeAlias$$.$onWithdrawRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawRefresh_$$($e$$181$$) {
  $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$withdraw_list_table_$, $e$$181$$.data)
};
// Input 135
function $bitex$app$SatoshiSquare$$() {
  $goog$Disposable$$.call(this);
  $bootstrap$Dropdown$install$$();
  this.$dialog_$ = $JSCompiler_alias_NULL$$;
  this.$error_message_alert_timeout_$ = 5E3;
  try {
    this.$router_$ = new $bitex$app$UrlRouter$$(this, "", "start"), this.$model_$ = new $bitex$model$Model$$(document.body), this.$conn_$ = new $bitex$api$BitEx$$, this.$views_$ = new $goog$ui$Component$$, this.$pricemax_$ = this.$pricemin_$ = 0
  }catch($error$$5$$) {
    this.$showDialog$($error$$5$$)
  }
  this.$currency_info_$ = {};
  this.$all_markets_$ = {};
  this.$brokers_by_country_$ = {}
}
$goog$inherits$$($bitex$app$SatoshiSquare$$, $goog$events$EventTarget$$);
$goog$addSingletonGetter$$($bitex$app$SatoshiSquare$$);
$JSCompiler_prototypeAlias$$ = $bitex$app$SatoshiSquare$$.prototype;
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$handler_$ || (this.$handler_$ = new $goog$events$EventHandler$$(this))
};
$JSCompiler_prototypeAlias$$.$run$ = function $$JSCompiler_prototypeAlias$$$$run$$($setNewPasswordView_url$$32$$) {
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_withdraw_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_deposit_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_ledger_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_trade_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_customers_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_trade_history_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_balances_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_trades_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_deposits_id"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_withdraw_list"), $bitex$templates$DataGrid$$, {id:"id_withdraw_list_table", title:"Withdrawal history", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Pesquisar ..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_deposit_list"), $bitex$templates$DataGrid$$, {id:"id_deposit_list_table", title:"Dep\u00f3sitos", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Pesquisar ..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_trade_list"), $bitex$templates$DataGrid$$, {id:"id_trade_list_table", title:"\u00daltimos neg\u00f3cios", $show_search$:$JSCompiler_alias_FALSE$$});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_customers_well"), $bitex$templates$DataGrid$$, {id:"id_customer_table", title:"Clientes", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Username ou email..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_trade_history_well"), $bitex$templates$DataGrid$$, {id:"id_trade_history_table"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"), $bitex$templates$DataGrid$$, {id:"account_overview_withdraw_requests_table_id", title:"Pedidos de saque...", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Pesquisar ..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_trades_id"), $bitex$templates$DataGrid$$, {id:"account_overview_trades_table_id", title:"Neg\u00f3cios"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_deposits_id"), $bitex$templates$DataGrid$$, {id:"account_overview_deposits_table_id", title:"Dep\u00f3sitos", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Pesquisar ..."});
  $goog$dom$removeChildren$$($goog$dom$getElement$$("offer_book_order_entry_content"));
  var $buy_order_entry_el$$inline_832_loginView$$ = $goog$soy$renderAsElement$$($bitex$templates$OrderEntry$$, {id:"id_order_entry_buy", $symbol$:"", $side$:1, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$}), $sell_order_entry_el$$inline_833_signUpView$$ = $goog$soy$renderAsElement$$($bitex$templates$OrderEntry$$, {id:"id_order_entry_sell", $symbol$:"", $side$:2, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$});
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($buy_order_entry_el$$inline_832_loginView$$);
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($sell_order_entry_el$$inline_833_signUpView$$);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_bid_content"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_ask_content"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_bid_content"), $bitex$templates$OrderBook$$, {id:"order_book_bid", title:"COMPRA", $columns$:["Comprador", "Quantidade", "Pre\u00e7o"]});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_ask_content"), $bitex$templates$OrderBook$$, {id:"order_book_offer", title:"VENDA", $columns$:["Pre\u00e7o", "Quantidade", "Vendedor"]});
  this.$url_$ = $setNewPasswordView_url$$32$$;
  var $handler$$91_startView$$ = new $bitex$view$NullView$$(this);
  $setNewPasswordView_url$$32$$ = new $bitex$view$SetNewPasswordView$$(this);
  var $buy_order_entry_el$$inline_832_loginView$$ = new $bitex$view$LoginView$$(this), $sell_order_entry_el$$inline_833_signUpView$$ = new $bitex$view$SignupView$$(this), $forgotPasswordView$$ = new $bitex$view$ForgotPasswordView$$(this), $tosView$$ = new $bitex$view$NullView$$(this), $depositView$$ = new $bitex$view$DepositView$$(this), $verificationView$$ = new $bitex$view$VerificationView$$(this), $enableTwoFactorView$$ = new $bitex$view$TwoFactorView$$(this), $offerBookView$$ = new $bitex$view$OfferBookView$$(this), 
  $accountActivityView$$ = new $bitex$view$AccountActivityView$$(this), $withdrawView$$ = new $bitex$view$WithdrawView$$(this), $customersView$$ = new $bitex$view$CustomersView$$(this), $accountOverviewView$$ = new $bitex$view$AccountOverview$$(this), $brokerView$$ = new $bitex$view$BrokerView$$(this), $marketView$$ = new $bitex$view$MarketView$$(this), $tradingView$$ = new $bitex$view$NullView$$(this), $toolBarView$$ = new $bitex$view$ToolBarView$$(this), $sideBarView$$ = new $bitex$view$SideBarView$$(this), 
  $ledgerView$$ = new $bitex$view$LedgerView$$(this), $brokerApplicationView$$ = new $bitex$view$NullView$$(this);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $toolBarView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $sideBarView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $handler$$91_startView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $setNewPasswordView_url$$32$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $buy_order_entry_el$$inline_832_loginView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $sell_order_entry_el$$inline_833_signUpView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $forgotPasswordView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $tosView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $tradingView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $offerBookView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $depositView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $withdrawView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $accountActivityView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $customersView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $accountOverviewView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $verificationView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $enableTwoFactorView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $brokerView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $marketView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $ledgerView$$);
  $JSCompiler_StaticMethods_addChild$$(this.$views_$, $brokerApplicationView$$);
  $handler$$91_startView$$.$decorate$($goog$dom$getElement$$("start"));
  $setNewPasswordView_url$$32$$.$decorate$($goog$dom$getElement$$("set_new_password"));
  $buy_order_entry_el$$inline_832_loginView$$.$decorate$($goog$dom$getElement$$("signin"));
  $sell_order_entry_el$$inline_833_signUpView$$.$decorate$($goog$dom$getElement$$("signup"));
  $forgotPasswordView$$.$decorate$($goog$dom$getElement$$("forgot_password"));
  $tosView$$.$decorate$($goog$dom$getElement$$("tos"));
  $tradingView$$.$decorate$($goog$dom$getElement$$("trading"));
  $offerBookView$$.$decorate$($goog$dom$getElement$$("offerbook"));
  $depositView$$.$decorate$($goog$dom$getElement$$("deposit"));
  $withdrawView$$.$decorate$($goog$dom$getElement$$("withdraw"));
  $accountActivityView$$.$decorate$($goog$dom$getElement$$("account_activity"));
  $customersView$$.$decorate$($goog$dom$getElement$$("customers"));
  $accountOverviewView$$.$decorate$($goog$dom$getElement$$("account_overview"));
  $verificationView$$.$decorate$($goog$dom$getElement$$("verification"));
  $enableTwoFactorView$$.$decorate$($goog$dom$getElement$$("enable_two_factor"));
  $sideBarView$$.$decorate$($goog$dom$getElement$$("id_sidebar"));
  $toolBarView$$.$decorate$($goog$dom$getElement$$("id_toolbar"));
  $brokerView$$.$decorate$($goog$dom$getElement$$("my_broker"));
  $marketView$$.$decorate$($goog$dom$getElement$$("market"));
  $ledgerView$$.$decorate$($goog$dom$getElement$$("ledger"));
  $brokerApplicationView$$.$decorate$($goog$dom$getElement$$("broker_application"));
  this.$views_$.$decorate$(document.body);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(start)", $handler$$91_startView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(set_new_password)", $setNewPasswordView_url$$32$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(signin)", $buy_order_entry_el$$inline_832_loginView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(signup)", $sell_order_entry_el$$inline_833_signUpView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(forgot_password)", $forgotPasswordView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(tos)", $tosView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(trading)", $tradingView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(offerbook)", $offerBookView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(deposit)", $depositView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(withdraw)", $withdrawView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(account_activity)", $accountActivityView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(customers)", $customersView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(account_overview)/(\\w+)/$", $accountOverviewView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(verification)", $verificationView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(enable_two_factor)", $enableTwoFactorView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(my_broker)", $brokerView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(market)", $marketView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(ledger)", $ledgerView$$);
  $JSCompiler_StaticMethods_addView$$(this.$router_$, "(broker_application)", $brokerApplicationView$$);
  this.$router_$.$setView$("start");
  this.$router_$.init();
  this.$loginView_$ = $buy_order_entry_el$$inline_832_loginView$$;
  $handler$$91_startView$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$router_$, "set_view", this.$onBeforeSetView_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "opened", this.$onConnectionOpen_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "closed", this.$onConnectionClose_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "error", this.$onConnectionError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "error_message", this.$onConnectionErrorMessage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "broker_list", this.$onBrokerListResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "security_list", this.$onSecurityList_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "login_ok", this.$onUserLoginOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "login_error", this.$onUserLoginError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "two_factor_secret", this.$onBitexTwoFactorSecretResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "balance_response", this.$onBitexBalanceResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "pwd_changed_ok", this.$onBitexPasswordChangedOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "pwd_changed_error", this.$onBitexPasswordChangedError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "deposit_methods_response", this.$onBitexDepositMethodsResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "withdraw_refresh", this.$onBitexWithdrawIncrementalUpdate_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "execution_report", this.$onBitexExecutionReport_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "raw_message", $goog$bind$$(this.$onBitexRawMessageLogger_$, this, "rx: "));
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$conn_$, "sent_raw_message", $goog$bind$$(this.$onBitexRawMessageLogger_$, this, "tx: "));
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, document.body, "click", this.$onBodyClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, document.body, "change", this.$onBodyChange_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $sell_order_entry_el$$inline_833_signUpView$$, "signup_click", this.$onUserSignupButton_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $buy_order_entry_el$$inline_832_loginView$$, "login_click", this.$onUserLoginButtonClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $enableTwoFactorView$$, "two_factor_enable", this.$onUserEnableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $enableTwoFactorView$$, "two_factor_disable", this.$onUserDisableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $forgotPasswordView$$, "recover_pwd", this.$onUserForgotPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $setNewPasswordView_url$$32$$, "set_new_pwd", this.$onUserSetNewPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, $sideBarView$$, "changed_market", this.$onUserChangeMarket_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "order_entry_submitted", this.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "cancel_order", this.$onUserCancelOrder_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "md_subscribe", this.$onUserMarketDataSubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "md_unsubscribe", this.$onUserMarketDataUnsubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "order_entry_submitted", this.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "request_withdraw", this.$onUserWithdrawRequest_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "confirm_withdraw", this.$onUserConfirmWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "process_withdraw", this.$onBrokerProcessWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "request_deposit", this.$onUserDepositRequest_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "process_deposit", this.$onProcessDeposit_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$model_$, "model_setBroker", this.$onModelSetBroker_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "connect_bitex", this.$onUserConnectBitEx_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "show_qr", this.$onUserShowQr_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "upload_receipt", this.$onUserUploadReceipt_$);
  $JSCompiler_StaticMethods_listen$$($handler$$91_startView$$, this.$views_$, "set_verified", this.$onBrokerSetUserAsVerified_$);
  this.$connectBitEx$()
};
$JSCompiler_prototypeAlias$$.$onBitexRawMessageLogger_$ = function $$JSCompiler_prototypeAlias$$$$onBitexRawMessageLogger_$$($action$$2$$, $e$$182$$) {
  var $raw_msg$$ = $e$$182$$.data;
  try {
    console.log($action$$2$$ + ":" + $raw_msg$$)
  }catch($e$$183$$) {
  }
};
$JSCompiler_prototypeAlias$$.$connectBitEx$ = function $$JSCompiler_prototypeAlias$$$$connectBitEx$$() {
  try {
    this.$conn_$.open(this.$url_$)
  }catch($e$$184$$) {
    var $JSCompiler_object_inline_error_code_922_output$$inline_836$$ = "WebSocket: " + $e$$184$$, $JSCompiler_object_inline_error_code_922_output$$inline_836$$ = "" + ('<p class="lead">' + $soy$$0$0escapeHtml$$("Erro ao se conectar ao servidor. Voc\u00ea precisa de um Browser com suporte a WebSockets.") + '</p><dl class="dl-horizontal"><dt>C\u00f3d. do Erro</dt><dd>' + $soy$$0$0escapeHtml$$($JSCompiler_object_inline_error_code_922_output$$inline_836$$) + "</dd></dl>");
    this.$showDialog$($JSCompiler_object_inline_error_code_922_output$$inline_836$$, $JSCompiler_alias_VOID$$, $bootstrap$Dialog$ButtonSet$createYesNoCancel$$())
  }
};
$JSCompiler_prototypeAlias$$.$getBitexConnection$ = $JSCompiler_get$$("$conn_$");
$JSCompiler_prototypeAlias$$.$setView$ = function $$JSCompiler_prototypeAlias$$$$setView$$($view_id$$3$$) {
  this.$router_$.$setView$($view_id$$3$$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataSubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataSubscribe_$$($e$$185$$) {
  this.$conn_$.$subscribeMarketData$($e$$185$$.target.$getMDMarketDepth$(), $e$$185$$.target.$getMDInstruments$(), $e$$185$$.target.$getMDEntries$(), $e$$185$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataUnsubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataUnsubscribe_$$($e$$186$$) {
  this.$conn_$.$unSubscribeMarketData$($e$$186$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$getPriceCurrencyFromSymbol$ = function $$JSCompiler_prototypeAlias$$$$getPriceCurrencyFromSymbol$$($symbol$$12$$) {
  return $symbol$$12$$.substr(3)
};
$JSCompiler_prototypeAlias$$.$getQtyCurrencyFromSymbol$ = function $$JSCompiler_prototypeAlias$$$$getQtyCurrencyFromSymbol$$($symbol$$13$$) {
  return $symbol$$13$$.substr(0, 3)
};
$JSCompiler_prototypeAlias$$.$onUserChangeMarket_$ = function $$JSCompiler_prototypeAlias$$$$onUserChangeMarket_$$($e$$187_symbol$$14$$) {
  $e$$187_symbol$$14$$ = $e$$187_symbol$$14$$.target.$getSymbol$();
  this.$model_$.set("SelectedSymbol", {$symbol$:$e$$187_symbol$$14$$, $qty_currency$:this.$currency_info_$[this.$getQtyCurrencyFromSymbol$($e$$187_symbol$$14$$)], $price_currency$:this.$currency_info_$[this.$getPriceCurrencyFromSymbol$($e$$187_symbol$$14$$)]})
};
$JSCompiler_prototypeAlias$$.$onBitexDepositMethodsResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexDepositMethodsResponse_$$($e$$188$$) {
  var $deposit_methods$$ = [];
  $goog$array$forEach$$($e$$188$$.data.DepositMethodGrp, function($deposit_method$$) {
    $deposit_methods$$.push({id:$deposit_method$$.DepositMethodID, description:$deposit_method$$.Description, $disclaimer$:$deposit_method$$.Disclaimer, type:$deposit_method$$.Type, $currency$:$deposit_method$$.Currency, $percent_fee$:$deposit_method$$.PercentFee, $fixed_fee$:$deposit_method$$.FixedFee})
  });
  this.$model_$.set("DepositMethods", $deposit_methods$$)
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedOk_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedOk_$$() {
  this.$showDialog$("Senha alterada", "Sucesso");
  this.$router_$.$setView$("signin")
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedError_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedError_$$() {
  this.$showDialog$("Houve um erro durante a altera\u00e7\u00e3o da sua senha", "Erro")
};
$JSCompiler_prototypeAlias$$.$onBitexWithdrawIncrementalUpdate_$ = function $$JSCompiler_prototypeAlias$$$$onBitexWithdrawIncrementalUpdate_$$($e$$191_msg$$74$$) {
  $e$$191_msg$$74$$ = $e$$191_msg$$74$$.data;
  var $MSG_WITHDRAW_NOTIFICATION_USER_UNCONFIRMED_TITLE$$ = "Criado solicita\u00e7\u00e3o de saque [" + ($e$$191_msg$$74$$.WithdrawID + "]"), $MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE$$ = "Pedido de saque [" + ($e$$191_msg$$74$$.WithdrawID + "] confirmado"), $MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE$$ = "Pedido de saque [" + ($e$$191_msg$$74$$.WithdrawID + "] em andamento"), $MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE$$ = "Pedido de saque [" + ($e$$191_msg$$74$$.WithdrawID + "] completo"), 
  $MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE$$ = "Pedido de saque [" + ($e$$191_msg$$74$$.WithdrawID + "] cancelado"), $formatted_value$$2$$ = this.$formatCurrency$($e$$191_msg$$74$$.Amount / 1E8, $e$$191_msg$$74$$.Currency), $notification_type_title$$;
  switch($e$$191_msg$$74$$.Status) {
    case "0":
      $notification_type_title$$ = ["warning", $MSG_WITHDRAW_NOTIFICATION_USER_UNCONFIRMED_TITLE$$];
      break;
    case "1":
      $notification_type_title$$ = ["info", $MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE$$];
      break;
    case "2":
      $notification_type_title$$ = ["info", $MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE$$];
      break;
    case "4":
      $notification_type_title$$ = ["success", $MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE$$];
      break;
    case "8":
      $notification_type_title$$ = ["danger", $MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE$$]
  }
  $notification_type_title$$ != $JSCompiler_alias_NULL$$ && this.$showNotification$($notification_type_title$$[0], $notification_type_title$$[1], $formatted_value$$2$$)
};
$JSCompiler_prototypeAlias$$.$onBitexExecutionReport_$ = function $$JSCompiler_prototypeAlias$$$$onBitexExecutionReport_$$($e$$192_msg$$75$$) {
  $e$$192_msg$$75$$ = $e$$192_msg$$75$$.data;
  var $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$ = "Ordem " + $e$$192_msg$$75$$.OrderID;
  switch($e$$192_msg$$75$$.ExecType) {
    case "1":
      this.$showNotification$("success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "Parcialmente executada");
      break;
    case "2":
      this.$showNotification$("success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "Executada");
      break;
    case "4":
      this.$showNotification$("success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "Cancelada")
  }
};
$JSCompiler_prototypeAlias$$.$onBitexTwoFactorSecretResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexTwoFactorSecretResponse_$$($e$$193_msg$$76$$) {
  $e$$193_msg$$76$$ = $e$$193_msg$$76$$.data;
  this.$model_$.set("TwoFactorSecret", $e$$193_msg$$76$$.TwoFactorSecret);
  this.$model_$.set("TwoFactorEnabled", $e$$193_msg$$76$$.TwoFactorEnabled)
};
$JSCompiler_prototypeAlias$$.$onBitexBalanceResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexBalanceResponse_$$($e$$194_msg$$77$$) {
  $e$$194_msg$$77$$ = $e$$194_msg$$77$$.data;
  delete $e$$194_msg$$77$$.MsgType;
  delete $e$$194_msg$$77$$.BalanceReqID;
  $goog$object$forEach$$($e$$194_msg$$77$$, function($balances$$) {
    $goog$object$forEach$$($balances$$, function($balance$$1$$, $currency$$10$$) {
      $balance$$1$$ /= 1E8;
      var $balance_key$$1$$ = "balance_" + $currency$$10$$;
      this.$model_$.set($balance_key$$1$$, $balance$$1$$);
      this.$model_$.set("formatted_" + $balance_key$$1$$, this.$formatCurrency$($balance$$1$$, $currency$$10$$))
    }, this)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onUserWithdrawRequest_$ = function $$JSCompiler_prototypeAlias$$$$onUserWithdrawRequest_$$($e$$195$$) {
  this.$conn_$.$requestWithdraw$($e$$195$$.target.$request_id_$, $e$$195$$.target.$getAmount$(), $e$$195$$.target.$method_$, $e$$195$$.target.$currency_$, $e$$195$$.target.$getWithdrawData$())
};
$JSCompiler_prototypeAlias$$.$onUserConfirmWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onUserConfirmWithdraw_$$($e$$196$$) {
  this.$conn_$.$confirmWithdraw$($e$$196$$.target.$confirmation_token_$)
};
$JSCompiler_prototypeAlias$$.$onBrokerSetUserAsVerified_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerSetUserAsVerified_$$($e$$197$$) {
  var $request_id$$ = $e$$197$$.target.$request_id_$, $client_id$$ = $e$$197$$.target.$getClientID$();
  this.$conn_$.$verifyCustomer$($request_id$$, $client_id$$, $JSCompiler_alias_TRUE$$, $e$$197$$.target.$verification_data_$)
};
$JSCompiler_prototypeAlias$$.$onBrokerProcessWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerProcessWithdraw_$$($e$$198_handler$$92$$) {
  var $withdraw_data$$1$$ = $e$$198_handler$$92$$.target.$getWithdrawData$(), $request_id$$1$$ = $e$$198_handler$$92$$.target.$request_id_$, $action$$3$$ = $e$$198_handler$$92$$.target.$withdraw_action_$;
  $e$$198_handler$$92$$ = this.$getHandler$();
  var $feeDialogContent_formatted_amount_model$$21$$ = this.$model_$, $method_element_id$$1$$ = $goog$string$getRandomString$$(), $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$ = $goog$string$getRandomString$$(), $fixed_fee_element_id$$1$$ = $goog$string$getRandomString$$(), $percent_fee_element_id$$1$$ = $goog$string$getRandomString$$(), $total_fees_element_id$$1$$ = $goog$string$getRandomString$$(), $net_value_element_id$$1$$ = $goog$string$getRandomString$$();
  console.log("onBrokerProcessWithdraw_:" + $action$$3$$);
  if("CANCEL" === $action$$3$$) {
    var $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$ = $bitex$templates$CancelWithdrawDialogContent$$(), $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$ = this.$showDialog$($cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, "Cancelar saque", $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $select_reason_el$$ = $goog$dom$getElement$$("id_select_reason"), 
    $reason_el$$1$$ = $goog$dom$getElement$$("id_custom_reason_text");
    $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, $select_reason_el$$, "change", function() {
      var $reason_id$$1$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$));
      $goog$style$showElement$$($reason_el$$1$$, 0 === $reason_id$$1$$)
    });
    $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$200$$) {
      if("ok" == $e$$200$$.key) {
        var $reason_id$$2$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$)), $reason$$1$$;
        if(0 === $reason_id$$2$$ && ($reason$$1$$ = $goog$string$trim$$($goog$dom$forms$getValue$$($reason_el$$1$$)), $goog$string$isEmpty$$($reason$$1$$))) {
          $e$$200$$.stopPropagation();
          $e$$200$$.preventDefault();
          $goog$dom$getElement$$("id_custom_reason_text").focus();
          return
        }
        this.$conn_$.$processWithdraw$($request_id$$1$$, $action$$3$$, $withdraw_data$$1$$.WithdrawID, $reason_id$$2$$, $reason$$1$$)
      }
    }, this)
  }else {
    if("PROGRESS" === $action$$3$$) {
      var $feeDialogContent_formatted_amount_model$$21$$ = this.$formatCurrency$($withdraw_data$$1$$.Amount / 1E8, $withdraw_data$$1$$.Currency), $feeDialogContent_formatted_amount_model$$21$$ = $bitex$templates$FeesForm$$({$amount$:$withdraw_data$$1$$.Amount, $formattedAmount$:$feeDialogContent_formatted_amount_model$$21$$, $currency$:$withdraw_data$$1$$.Currency, $currencySign$:this.$getCurrencySign$($withdraw_data$$1$$.Currency), $amountID$:$cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, 
      $fixedFeeID$:$fixed_fee_element_id$$1$$, $percentFeeID$:$percent_fee_element_id$$1$$, $totalFeesID$:$total_fees_element_id$$1$$, $netValueID$:$net_value_element_id$$1$$, $fixedFee$:$withdraw_data$$1$$.FixedFee, $percentFee$:$withdraw_data$$1$$.PercentFee}), $feeDlg$$ = this.$showDialog$($feeDialogContent_formatted_amount_model$$21$$, "Marcar saque de " + (this.$getCurrencyDescription$($withdraw_data$$1$$.Currency) + " em andamento"), $bootstrap$Dialog$ButtonSet$createOkCancel$$());
      this.$doCalculateFees_$($cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $fixed_fee_element_id$$1$$, $percent_fee_element_id$$1$$, $withdraw_data$$1$$.Currency, $total_fees_element_id$$1$$, $net_value_element_id$$1$$, $JSCompiler_alias_TRUE$$);
      $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $fixed_fee_element_id$$1$$, $percent_fee_element_id$$1$$, $withdraw_data$$1$$.Currency, $total_fees_element_id$$1$$, $net_value_element_id$$1$$, 
      $JSCompiler_alias_TRUE$$));
      $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($percent_fee_element_id$$1$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $fixed_fee_element_id$$1$$, $percent_fee_element_id$$1$$, $withdraw_data$$1$$.Currency, $total_fees_element_id$$1$$, $net_value_element_id$$1$$, $JSCompiler_alias_TRUE$$));
      $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($fixed_fee_element_id$$1$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $fixed_fee_element_id$$1$$, $percent_fee_element_id$$1$$, $withdraw_data$$1$$.Currency, $total_fees_element_id$$1$$, $net_value_element_id$$1$$, $JSCompiler_alias_TRUE$$));
      $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, $feeDlg$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$201$$) {
        if("ok" == $e$$201$$.key) {
          var $form_data$$ = $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($feeDlg$$.$getContentElement$())), $fixed_fee_value_valueFormatter$$ = new $goog$i18n$NumberFormat$$(1), $fixed_fee$$1_percent_fee$$1$$ = $form_data$$.PercentFee;
          pos = [0];
          var $percent_fee_value$$ = $fixed_fee_value_valueFormatter$$.parse($fixed_fee$$1_percent_fee$$1$$, pos);
          isNaN($percent_fee_value$$) && ($percent_fee_value$$ = 0);
          pos[0] != $fixed_fee$$1_percent_fee$$1$$.length || isNaN($percent_fee_value$$) || 0 > $percent_fee_value$$ ? ($e$$201$$.stopPropagation(), $e$$201$$.preventDefault()) : ($percent_fee_value$$ *= 100, $fixed_fee$$1_percent_fee$$1$$ = $form_data$$.FixedFee, pos = [0], $fixed_fee_value_valueFormatter$$ = $fixed_fee_value_valueFormatter$$.parse($fixed_fee$$1_percent_fee$$1$$, pos), isNaN($fixed_fee_value_valueFormatter$$) && ($fixed_fee_value_valueFormatter$$ = 0), pos[0] != $fixed_fee$$1_percent_fee$$1$$.length || 
          isNaN($fixed_fee_value_valueFormatter$$) || 0 > $fixed_fee_value_valueFormatter$$ ? ($e$$201$$.stopPropagation(), $e$$201$$.preventDefault()) : this.$conn_$.$processWithdraw$($request_id$$1$$, $action$$3$$, $withdraw_data$$1$$.WithdrawID, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $form_data$$, $percent_fee_value$$, 1E8 * $fixed_fee_value_valueFormatter$$))
        }
      })
    }else {
      if("COMPLETE" === $action$$3$$) {
        var $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$ = $bitex$templates$DepositWithdrawDialogContent$$({$side$:"broker", $currency$:$withdraw_data$$1$$.Currency, $currencySign$:this.$getCurrencySign$($withdraw_data$$1$$.Currency), $force_method$:$withdraw_data$$1$$.Method, $amount$:$withdraw_data$$1$$.Amount, $methods$:$feeDialogContent_formatted_amount_model$$21$$.get("Broker").WithdrawStructure[$withdraw_data$$1$$.Currency], $methodID$:$method_element_id$$1$$, 
        $showFeeDataEntry$:$JSCompiler_alias_FALSE$$, $amountID$:$cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, $fixedFeeID$:$fixed_fee_element_id$$1$$, $percentFeeID$:$percent_fee_element_id$$1$$, $totalFeesID$:$total_fees_element_id$$1$$, $netValueID$:$net_value_element_id$$1$$, $hideNetAmount$:$JSCompiler_alias_FALSE$$}), $dlg$$3$$ = this.$showDialog$($cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_amount_element_id$$1$$, 
        "Confirmar saque em " + this.$getCurrencyDescription$($withdraw_data$$1$$.Currency), $bootstrap$Dialog$ButtonSet$createOkCancel$$());
        $JSCompiler_StaticMethods_listen$$($e$$198_handler$$92$$, $dlg$$3$$, $goog$ui$Dialog$EventType$SELECT$$, function($broker_withdraw_data_e$$202$$) {
          "ok" == $broker_withdraw_data_e$$202$$.key && ($broker_withdraw_data_e$$202$$ = $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($dlg$$3$$.$getContentElement$())), this.$conn_$.$processWithdraw$($request_id$$1$$, $action$$3$$, $withdraw_data$$1$$.WithdrawID, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $broker_withdraw_data_e$$202$$))
        }, this)
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$onUserOrderEntry_$ = function $$JSCompiler_prototypeAlias$$$$onUserOrderEntry_$$($e$$203_opt_client_id$$inline_843$$) {
  var $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$ = "COMPRAR";
  "2" == $goog$dom$forms$getValue$$($e$$203_opt_client_id$$inline_843$$.target.$sideEl_$) && ($MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$ = "VENDER");
  $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$ += " " + ($e$$203_opt_client_id$$inline_843$$.target.$getAmount$() + (" " + ($e$$203_opt_client_id$$inline_843$$.target.$getSymbol$() + (" em " + $JSCompiler_StaticMethods_getPrice$$($e$$203_opt_client_id$$inline_843$$.target)))));
  this.$showNotification$("info", "Enviando ordem...", $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$);
  var $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$ = $e$$203_opt_client_id$$inline_843$$.target.$getSymbol$(), $qty$$inline_840$$ = $e$$203_opt_client_id$$inline_843$$.target.$getAmount$(), $price$$inline_841$$ = $JSCompiler_StaticMethods_getPrice$$($e$$203_opt_client_id$$inline_843$$.target), $side$$inline_842$$ = $goog$dom$forms$getValue$$($e$$203_opt_client_id$$inline_843$$.target.$sideEl_$);
  $e$$203_opt_client_id$$inline_843$$ = $e$$203_opt_client_id$$inline_843$$.target.$getClientID$();
  $JSCompiler_StaticMethods_sendOrder_$$(this.$conn_$, $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_839$$, $qty$$inline_840$$, $price$$inline_841$$, $side$$inline_842$$, $e$$203_opt_client_id$$inline_843$$, $JSCompiler_alias_VOID$$)
};
$JSCompiler_prototypeAlias$$.$onUserCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onUserCancelOrder_$$($e$$204$$) {
  $e$$204$$.target.$client_order_id_$ != $JSCompiler_alias_NULL$$ ? this.$showNotification$("info", "Cancelando ordem...", ":" + $e$$204$$.target.$client_order_id_$) : this.$showNotification$("info", "Cancelando ordem...", ":" + $e$$204$$.target.$order_id_$);
  this.$conn_$.$cancelOrder$($e$$204$$.target.$client_order_id_$, $e$$204$$.target.$order_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserShowQr_$ = function $$JSCompiler_prototypeAlias$$$$onUserShowQr_$$($e$$205$$) {
  var $qrData$$ = $e$$205$$.target.$qr_data_$, $MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE$$ = "Depositar " + this.$getCurrencyDescription$($qrData$$.Currency), $dialog_title$$ = "Sacar " + this.$getCurrencyDescription$($qrData$$.Currency);
  "DEPOSIT" === $e$$205$$.target.$qr_data_verb_$ && ($dialog_title$$ = $MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE$$);
  this.$showDialog$($bitex$templates$CryptoCurrencyQRContentDialog$$({data:$qrData$$}), $dialog_title$$, $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$))
};
$JSCompiler_prototypeAlias$$.$onUserUploadReceipt_$ = function $$JSCompiler_prototypeAlias$$$$onUserUploadReceipt_$$($deposit_data_e$$206$$) {
  var $form_src$$1_model$$22$$ = this.$model_$;
  $deposit_data_e$$206$$ = $deposit_data_e$$206$$.target.$getDepositData$();
  var $broker$$10$$ = $form_src$$1_model$$22$$.get("Broker");
  $broker$$10$$ != $JSCompiler_alias_NULL$$ && ($form_src$$1_model$$22$$ = $goog$string$subs$$($broker$$10$$.UploadForm, $form_src$$1_model$$22$$.get("UserID"), $form_src$$1_model$$22$$.get("Username"), $deposit_data_e$$206$$.DepositMethodName, $deposit_data_e$$206$$.ControlNumber), window.open($form_src$$1_model$$22$$, "blank", "scrollbars=yes,toolbar=no,width=700,height=500"))
};
$JSCompiler_prototypeAlias$$.$doCalculateFees_$ = function $$JSCompiler_prototypeAlias$$$$doCalculateFees_$$($amount$$5_amount_element_id$$, $fixed_fee$$2_fixed_fee_element_id$$2$$, $percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$, $currency$$11_formatted_net_amount$$, $opt_fee_value_element_id$$, $opt_net_amount_element_id$$, $net_amount_opt_add_fees_valueFormatter$$1$$) {
  var $add_fees_formatted_total_fee$$ = $JSCompiler_alias_TRUE$$;
  $net_amount_opt_add_fees_valueFormatter$$1$$ === $JSCompiler_alias_FALSE$$ && ($add_fees_formatted_total_fee$$ = $net_amount_opt_add_fees_valueFormatter$$1$$);
  $net_amount_opt_add_fees_valueFormatter$$1$$ = new $goog$i18n$NumberFormat$$(1);
  var $fixed_fee_value$$1_pos$$14$$ = [0], $raw_amount_total_percent_fee_value$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($amount$$5_amount_element_id$$));
  $amount$$5_amount_element_id$$ = $net_amount_opt_add_fees_valueFormatter$$1$$.parse($raw_amount_total_percent_fee_value$$, $fixed_fee_value$$1_pos$$14$$);
  if(!($fixed_fee_value$$1_pos$$14$$[0] != $raw_amount_total_percent_fee_value$$.length || isNaN($amount$$5_amount_element_id$$) || 0 >= $amount$$5_amount_element_id$$)) {
    $amount$$5_amount_element_id$$ *= 1E8;
    $percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$));
    $fixed_fee_value$$1_pos$$14$$ = [0];
    $percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$ = $net_amount_opt_add_fees_valueFormatter$$1$$.parse($percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$, $fixed_fee_value$$1_pos$$14$$);
    isNaN($percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$) && ($percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$ = 0);
    $fixed_fee$$2_fixed_fee_element_id$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($fixed_fee$$2_fixed_fee_element_id$$2$$));
    $fixed_fee_value$$1_pos$$14$$ = [0];
    $fixed_fee_value$$1_pos$$14$$ = $net_amount_opt_add_fees_valueFormatter$$1$$.parse($fixed_fee$$2_fixed_fee_element_id$$2$$, $fixed_fee_value$$1_pos$$14$$);
    isNaN($fixed_fee_value$$1_pos$$14$$) && ($fixed_fee_value$$1_pos$$14$$ = 0);
    $fixed_fee$$2_fixed_fee_element_id$$2$$ *= 1E8;
    var $raw_amount_total_percent_fee_value$$ = ($amount$$5_amount_element_id$$ - $fixed_fee$$2_fixed_fee_element_id$$2$$) * ($percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$ / 100), $total_fees$$ = $raw_amount_total_percent_fee_value$$ + $fixed_fee$$2_fixed_fee_element_id$$2$$;
    $net_amount_opt_add_fees_valueFormatter$$1$$ = $amount$$5_amount_element_id$$ - $total_fees$$;
    $add_fees_formatted_total_fee$$ && ($net_amount_opt_add_fees_valueFormatter$$1$$ = $amount$$5_amount_element_id$$ + $total_fees$$);
    console.log("net_amount: " + $net_amount_opt_add_fees_valueFormatter$$1$$ + " - amount: " + $amount$$5_amount_element_id$$ + " - fixed_fee_value:" + $fixed_fee_value$$1_pos$$14$$ + " - percent_fee_value:" + $percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$ + " - total_percent_fee_value: " + $raw_amount_total_percent_fee_value$$ + " - total_fees:" + $total_fees$$);
    $opt_fee_value_element_id$$ != $JSCompiler_alias_NULL$$ && ($add_fees_formatted_total_fee$$ = this.$formatCurrency$($total_fees$$ / 1E8, $currency$$11_formatted_net_amount$$), $goog$dom$setTextContent$$($goog$dom$getElement$$($opt_fee_value_element_id$$), $add_fees_formatted_total_fee$$));
    $opt_net_amount_element_id$$ != $JSCompiler_alias_NULL$$ && ($currency$$11_formatted_net_amount$$ = this.$formatCurrency$($net_amount_opt_add_fees_valueFormatter$$1$$ / 1E8, $currency$$11_formatted_net_amount$$), $goog$dom$setTextContent$$($goog$dom$getElement$$($opt_net_amount_element_id$$), $currency$$11_formatted_net_amount$$));
    return[$amount$$5_amount_element_id$$, $percent_fee$$2_percent_fee_element_id$$2_percent_fee_value$$1$$, $fixed_fee$$2_fixed_fee_element_id$$2$$, $net_amount_opt_add_fees_valueFormatter$$1$$]
  }
};
$JSCompiler_prototypeAlias$$.$onProcessDeposit_$ = function $$JSCompiler_prototypeAlias$$$$onProcessDeposit_$$($e$$207_handler$$93$$) {
  var $deposit_data$$1$$ = $e$$207_handler$$93$$.target.$getDepositData$(), $request_id$$2$$ = $e$$207_handler$$93$$.target.$request_id_$, $action$$4$$ = $e$$207_handler$$93$$.target.$getDepositAction$();
  $e$$207_handler$$93$$ = this.$getHandler$();
  if("CANCEL" === $action$$4$$) {
    var $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$ = $bitex$templates$CancelDepositDialogContent$$(), $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$ = this.$showDialog$($cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, "Cancelar dep\u00f3sito", $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $select_reason_el$$1$$ = $goog$dom$getElement$$("id_select_reason"), $reason_el$$2$$ = $goog$dom$getElement$$("id_custom_reason_text");
    $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, $select_reason_el$$1$$, "change", function() {
      var $reason_id$$3$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$1$$));
      $goog$style$showElement$$($reason_el$$2$$, 0 === $reason_id$$3$$)
    });
    $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$209$$) {
      if("ok" == $e$$209$$.key) {
        var $reason_id$$4$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$1$$)), $reason$$2$$;
        if(0 === $reason_id$$4$$ && ($reason$$2$$ = $goog$string$trim$$($goog$dom$forms$getValue$$($reason_el$$2$$)), $goog$string$isEmpty$$($reason$$2$$))) {
          $e$$209$$.stopPropagation();
          $e$$209$$.preventDefault();
          $goog$dom$getElement$$("id_custom_reason_text").focus();
          return
        }
        this.$conn_$.$processDeposit$($request_id$$2$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID, $reason_id$$4$$, $reason$$2$$)
      }
    }, this)
  }else {
    if("PROGRESS" === $action$$4$$) {
      this.$conn_$.$processDeposit$($request_id$$2$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID)
    }else {
      if("COMPLETE" === $action$$4$$) {
        var $valueFormatter$$2$$ = new $goog$i18n$NumberFormat$$(1), $paid_value_element_id$$ = $goog$string$getRandomString$$(), $fixed_fee_element_id$$3$$ = $goog$string$getRandomString$$(), $percent_fee_element_id$$3$$ = $goog$string$getRandomString$$(), $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$ = $goog$string$getRandomString$$(), $net_value_element_id$$2$$ = $goog$string$getRandomString$$(), $confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = 
        $deposit_data$$1$$.ControlNumber;
        "CRY" == $deposit_data$$1$$.Type && ($confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $deposit_data$$1$$.Data.InputAddress);
        $confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $bitex$templates$BrokerConfirmDepositContent$$({$id_value$:$paid_value_element_id$$, $fixedFeeID$:$fixed_fee_element_id$$3$$, $percentFeeID$:$percent_fee_element_id$$3$$, $totalFeesID$:$cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $netValueID$:$net_value_element_id$$2$$, $controlNumber$:$confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, $currencySign$:this.$getCurrencySign$($deposit_data$$1$$.Currency), 
        value:$valueFormatter$$2$$.$format$($deposit_data$$1$$.Value / 1E8), $percentFee$:$valueFormatter$$2$$.$format$($deposit_data$$1$$.PercentFee / 100), $fixedFee$:$valueFormatter$$2$$.$format$($deposit_data$$1$$.FixedFee / 1E8)});
        $confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = this.$showDialog$($confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, "Confirmar dep\u00f3sito", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
        this.$doCalculateFees_$($paid_value_element_id$$, $fixed_fee_element_id$$3$$, $percent_fee_element_id$$3$$, $deposit_data$$1$$.Currency, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $net_value_element_id$$2$$, $JSCompiler_alias_FALSE$$);
        $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($paid_value_element_id$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $paid_value_element_id$$, $fixed_fee_element_id$$3$$, $percent_fee_element_id$$3$$, $deposit_data$$1$$.Currency, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $net_value_element_id$$2$$, $JSCompiler_alias_FALSE$$));
        $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($percent_fee_element_id$$3$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $paid_value_element_id$$, $fixed_fee_element_id$$3$$, $percent_fee_element_id$$3$$, $deposit_data$$1$$.Currency, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $net_value_element_id$$2$$, $JSCompiler_alias_FALSE$$));
        $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($fixed_fee_element_id$$3$$)), "input", $goog$bind$$(this.$doCalculateFees_$, this, $paid_value_element_id$$, $fixed_fee_element_id$$3$$, $percent_fee_element_id$$3$$, $deposit_data$$1$$.Currency, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_total_fees_element_id$$2$$, $net_value_element_id$$2$$, $JSCompiler_alias_FALSE$$));
        $JSCompiler_StaticMethods_listen$$($e$$207_handler$$93$$, $confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$210$$) {
          if("ok" == $e$$210$$.key) {
            var $pos$$15$$ = [0], $percent_fee_value$$2_raw_paid_value$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($paid_value_element_id$$)), $paid_value$$2$$ = $valueFormatter$$2$$.parse($percent_fee_value$$2_raw_paid_value$$, $pos$$15$$);
            if($pos$$15$$[0] != $percent_fee_value$$2_raw_paid_value$$.length || isNaN($paid_value$$2$$) || 0 >= $paid_value$$2$$) {
              $e$$210$$.stopPropagation(), $e$$210$$.preventDefault(), $goog$dom$getElement$$($paid_value_element_id$$).focus()
            }else {
              var $paid_value$$2$$ = 1E8 * $paid_value$$2$$, $fixed_fee$$3_percent_fee$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($percent_fee_element_id$$3$$)), $pos$$15$$ = [0], $percent_fee_value$$2_raw_paid_value$$ = $valueFormatter$$2$$.parse($fixed_fee$$3_percent_fee$$3$$, $pos$$15$$);
              isNaN($percent_fee_value$$2_raw_paid_value$$) && ($percent_fee_value$$2_raw_paid_value$$ = 0);
              if($pos$$15$$[0] != $fixed_fee$$3_percent_fee$$3$$.length || isNaN($percent_fee_value$$2_raw_paid_value$$) || 0 > $percent_fee_value$$2_raw_paid_value$$) {
                $e$$210$$.stopPropagation(), $e$$210$$.preventDefault(), $goog$dom$getElement$$($percent_fee_element_id$$3$$).focus()
              }else {
                var $percent_fee_value$$2_raw_paid_value$$ = 100 * $percent_fee_value$$2_raw_paid_value$$, $fixed_fee$$3_percent_fee$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($fixed_fee_element_id$$3$$)), $pos$$15$$ = [0], $fixed_fee_value$$2$$ = $valueFormatter$$2$$.parse($fixed_fee$$3_percent_fee$$3$$, $pos$$15$$);
                isNaN($fixed_fee_value$$2$$) && ($fixed_fee_value$$2$$ = 0);
                $pos$$15$$[0] != $fixed_fee$$3_percent_fee$$3$$.length || isNaN($fixed_fee_value$$2$$) || 0 > $fixed_fee_value$$2$$ ? ($e$$210$$.stopPropagation(), $e$$210$$.preventDefault(), $goog$dom$getElement$$($fixed_fee_element_id$$3$$).focus()) : this.$conn_$.$processDeposit$($request_id$$2$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $paid_value$$2$$, $percent_fee_value$$2_raw_paid_value$$, 1E8 * $fixed_fee_value$$2$$)
              }
            }
          }
        }, this)
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$onUserDepositRequest_$ = function $$JSCompiler_prototypeAlias$$$$onUserDepositRequest_$$($MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$211$$) {
  var $currency$$12$$ = $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$211$$.target.$currency_$, $handler$$94$$ = this.$getHandler$();
  $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$211$$ = "Depositar " + this.$getCurrencyDescription$($currency$$12$$);
  if(this.$isCryptoCurrency$($currency$$12$$)) {
    var $confirmDialogContent_dialogContent$$2$$ = $bitex$templates$ConfirmDepositCryptoCurrencyContentDialog$$({$currencydescription$:this.$getCurrencyDescription$($currency$$12$$)}), $dlgConfirm$$ = this.$showDialog$($confirmDialogContent_dialogContent$$2$$, $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$211$$, $bootstrap$Dialog$ButtonSet$createYesNoCancel$$());
    $JSCompiler_StaticMethods_listen$$($handler$$94$$, $dlgConfirm$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$212_request_id$$3$$) {
      "yes" == $e$$212_request_id$$3$$.key && ($e$$212_request_id$$3$$.preventDefault(), $e$$212_request_id$$3$$.stopPropagation(), $e$$212_request_id$$3$$ = parseInt(1E7 * Math.random(), 10), this.$conn_$.$requestDeposit$($e$$212_request_id$$3$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $currency$$12$$), $goog$soy$renderElement$$($goog$dom$getFirstElementChild$$($dlgConfirm$$.$getContentElement$()), $bitex$templates$WaitingForDepositResponseDialogContent$$), 
      $JSCompiler_StaticMethods_setButtonSet$$($dlgConfirm$$, $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)), $JSCompiler_StaticMethods_listenOnce$$($handler$$94$$, this.$conn_$, "error_message." + $e$$212_request_id$$3$$, function() {
        $dlgConfirm$$.$dispose$()
      }), $JSCompiler_StaticMethods_listenOnce$$($handler$$94$$, this.$conn_$, "deposit_response." + $e$$212_request_id$$3$$, function($e$$214_msg$$78$$) {
        $e$$214_msg$$78$$ = $e$$214_msg$$78$$.data;
        $goog$soy$renderElement$$($goog$dom$getFirstElementChild$$($dlgConfirm$$.$getContentElement$()), $bitex$templates$DepositCryptoCurrencyContentDialog$$, {$deposit_message$:$e$$214_msg$$78$$})
      }))
    })
  }else {
    var $deposit_methods$$1$$ = [];
    $goog$array$forEach$$(this.$model_$.get("DepositMethods"), function($deposit_method$$1$$) {
      $deposit_method$$1$$.$currency$ == $currency$$12$$ && $deposit_methods$$1$$.push({method:$deposit_method$$1$$.id, description:$deposit_method$$1$$.description, disclaimer:$deposit_method$$1$$.$disclaimer$, percent_fee:$deposit_method$$1$$.$percent_fee$, fixed_fee:$deposit_method$$1$$.$fixed_fee$, fields:[]})
    }, this);
    var $method_element_id$$2$$ = $goog$string$getRandomString$$(), $withdraw_amount_element_id$$2$$ = $goog$string$getRandomString$$(), $fixed_fee_element_id$$4$$ = $goog$string$getRandomString$$(), $percent_fee_element_id$$4$$ = $goog$string$getRandomString$$(), $total_fees_element_id$$3$$ = $goog$string$getRandomString$$(), $net_value_element_id$$3$$ = $goog$string$getRandomString$$(), $confirmDialogContent_dialogContent$$2$$ = $bitex$templates$DepositWithdrawDialogContent$$({$side$:"client", 
    $currency$:$currency$$12$$, $currencySign$:this.$getCurrencySign$($currency$$12$$), $methods$:$deposit_methods$$1$$, $methodID$:$method_element_id$$2$$, $amountID$:$withdraw_amount_element_id$$2$$, $showFeeDataEntry$:$JSCompiler_alias_FALSE$$, $fixedFeeID$:$fixed_fee_element_id$$4$$, $percentFeeID$:$percent_fee_element_id$$4$$, $totalFeesID$:$total_fees_element_id$$3$$, $netValueID$:$net_value_element_id$$3$$, $hideNetAmount$:$JSCompiler_alias_FALSE$$}), $dlg$$5$$ = this.$showDialog$($confirmDialogContent_dialogContent$$2$$, 
    $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$211$$, $bootstrap$Dialog$ButtonSet$createOkCancel$$());
    this.$doCalculateFees_$($withdraw_amount_element_id$$2$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $fixed_fee_element_id$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $percent_fee_element_id$$4$$, $currency$$12$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $total_fees_element_id$$3$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + 
    $net_value_element_id$$3$$, $JSCompiler_alias_FALSE$$);
    $JSCompiler_StaticMethods_listen$$($handler$$94$$, $goog$dom$getElement$$($method_element_id$$2$$), "change", function() {
      this.$doCalculateFees_$($withdraw_amount_element_id$$2$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $fixed_fee_element_id$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $percent_fee_element_id$$4$$, $currency$$12$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $total_fees_element_id$$3$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + 
      $net_value_element_id$$3$$, $JSCompiler_alias_FALSE$$)
    });
    $JSCompiler_StaticMethods_listen$$($handler$$94$$, new $goog$events$InputHandler$$($goog$dom$getElement$$($withdraw_amount_element_id$$2$$)), "input", function() {
      this.$doCalculateFees_$($withdraw_amount_element_id$$2$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $fixed_fee_element_id$$4$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $percent_fee_element_id$$4$$, $currency$$12$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + $total_fees_element_id$$3$$, $goog$dom$forms$getValue$$($goog$dom$getElement$$($method_element_id$$2$$)) + "_" + 
      $net_value_element_id$$3$$, $JSCompiler_alias_FALSE$$)
    });
    $JSCompiler_StaticMethods_listenOnce$$($handler$$94$$, $dlg$$5$$, $goog$ui$Dialog$EventType$SELECT$$, function($amount$$6_e$$217$$) {
      if("ok" == $amount$$6_e$$217$$.key) {
        $amount$$6_e$$217$$.preventDefault();
        $amount$$6_e$$217$$.stopPropagation();
        var $deposit_form_el$$ = $goog$dom$getFirstElementChild$$($dlg$$5$$.$getContentElement$()), $deposit_data$$2_deposit_method_id$$1$$ = $bitex$util$getFormAsJSON$$($deposit_form_el$$);
        $amount$$6_e$$217$$ = $goog$string$toNumber$$($deposit_data$$2_deposit_method_id$$1$$.Amount);
        $deposit_data$$2_deposit_method_id$$1$$ = $goog$string$toNumber$$($deposit_data$$2_deposit_method_id$$1$$.Method);
        if($goog$isNumber$$($amount$$6_e$$217$$) && !isNaN($amount$$6_e$$217$$)) {
          if("prepare" != $deposit_form_el$$.getAttribute("data-deposit-status")) {
            $dlg$$5$$.$dispose$()
          }else {
            var $request_id$$4$$ = parseInt(1E7 * Math.random(), 10);
            this.$conn_$.$requestDeposit$($request_id$$4$$, $deposit_data$$2_deposit_method_id$$1$$, $amount$$6_e$$217$$);
            $goog$soy$renderElement$$($deposit_form_el$$, $bitex$templates$WaitingForDepositResponseDialogContent$$);
            $JSCompiler_StaticMethods_listenOnce$$($handler$$94$$, this.$conn_$, "deposit_response." + $request_id$$4$$, function($e$$218$$) {
              $goog$soy$renderElement$$($deposit_form_el$$, $bitex$templates$DepositSlipContentDialog$$, {$deposit_id$:$e$$218$$.data.DepositID});
              $JSCompiler_StaticMethods_setButtonSet$$($dlg$$5$$, $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$))
            })
          }
        }
      }
    })
  }
};
$JSCompiler_prototypeAlias$$.$onUserForgotPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserForgotPassword_$$($e$$219$$) {
  this.$conn_$.$forgotPassword$($e$$219$$.target.$getEmail$());
  this.$router_$.$setView$("set_new_password")
};
$JSCompiler_prototypeAlias$$.$onUserSetNewPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetNewPassword_$$($e$$220$$) {
  this.$conn_$.$resetPassword$($e$$220$$.target.$getToken$(), $e$$220$$.target.$getPassword$())
};
$JSCompiler_prototypeAlias$$.$onUserEnableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserEnableTwoFactor_$$() {
  var $code$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_step_verification")), $secret$$2$$ = "";
  $goog$string$isEmpty$$($code$$5$$) || ($secret$$2$$ = this.$model_$.get("TwoFactorSecret"));
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_TRUE$$, $secret$$2$$, $code$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserDisableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserDisableTwoFactor_$$() {
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$onBodyClick_$ = function $$JSCompiler_prototypeAlias$$$$onBodyClick_$$($e$$223$$) {
  var $view_name$$4$$ = $e$$223$$.target.getAttribute("data-switch-view");
  $view_name$$4$$ != $JSCompiler_alias_NULL$$ && ($e$$223$$.preventDefault(), $e$$223$$.stopPropagation(), this.$router_$.$setView$($view_name$$4$$))
};
$JSCompiler_prototypeAlias$$.$onBodyChange_$ = function $$JSCompiler_prototypeAlias$$$$onBodyChange_$$($e$$224_elements$$7$$) {
  if($goog$dom$classes$has$$($e$$224_elements$$7$$.target, "withdraw-method-selector")) {
    var $selected_method$$ = $goog$dom$forms$getValue$$($e$$224_elements$$7$$.target);
    $e$$224_elements$$7$$ = $goog$dom$getElementsByClass$$("withdraw-method");
    $goog$array$forEach$$($e$$224_elements$$7$$, function($element$$175_field_elements$$) {
      var $method$$8$$ = $element$$175_field_elements$$.getAttribute("data-withdraw-method");
      $goog$style$showElement$$($element$$175_field_elements$$, $method$$8$$ == $selected_method$$);
      $element$$175_field_elements$$ = $goog$dom$getElementsByClass$$("withdraw-field", $element$$175_field_elements$$);
      $goog$array$forEach$$($element$$175_field_elements$$, function($element$$176$$) {
        $element$$176$$.disabled = $method$$8$$ != $selected_method$$
      })
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$onUserLoginButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginButtonClick_$$($e$$225$$) {
  var $username$$9$$ = $e$$225$$.target.$getUsername$(), $password$$5$$ = $e$$225$$.target.$getPassword$();
  this.$model_$.set("Password", $e$$225$$.target.$getPassword$());
  this.$conn_$.login($username$$9$$, $password$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserLoginOk_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginOk_$$($e$$226_msg$$80$$) {
  $e$$226_msg$$80$$ = $e$$226_msg$$80$$.data;
  $goog$dom$classes$add$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
  this.$model_$.set("UserID", $e$$226_msg$$80$$.UserID);
  this.$model_$.set("Username", $e$$226_msg$$80$$.Username);
  this.$model_$.set("TwoFactorEnabled", $e$$226_msg$$80$$.TwoFactorEnabled);
  this.$model_$.set("IsBroker", $e$$226_msg$$80$$.IsBroker);
  this.$model_$.set("Broker", $e$$226_msg$$80$$.Broker);
  $e$$226_msg$$80$$.IsBroker ? $goog$dom$classes$add$$(document.body, "bitex-broker") : $goog$dom$classes$add$$(document.body, "bitex-non-broker");
  this.$conn_$.$requestBalances$();
  this.$conn_$.$requestDepositMethods$();
  this.$router_$.$setView$("offerbook")
};
$JSCompiler_prototypeAlias$$.$onUserLoginError_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginError_$$($dlg__e$$227_msg$$81$$) {
  $goog$dom$classes$add$$(document.body, "bitex-not-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  $dlg__e$$227_msg$$81$$ = $dlg__e$$227_msg$$81$$.data;
  this.$model_$.set("UserID", "");
  this.$model_$.set("Username", "");
  $dlg__e$$227_msg$$81$$.NeedSecondFactor ? ($dlg__e$$227_msg$$81$$ = this.$showDialog$("Autentica\u00e7\u00e3o em 2 passos", $bitex$templates$GoogleAuthenticationCodeDialogContent$$(), $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg__e$$227_msg$$81$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$228_second_factor$$) {
    "ok" == $e$$228_second_factor$$.key && ($e$$228_second_factor$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_factor")), this.$conn_$.login(this.$loginView_$.$getUsername$(), this.$loginView_$.$getPassword$(), $e$$228_second_factor$$))
  })) : this.$showDialog$($dlg__e$$227_msg$$81$$.UserStatusText)
};
$JSCompiler_prototypeAlias$$.$onUserSignupButton_$ = function $$JSCompiler_prototypeAlias$$$$onUserSignupButton_$$($e$$229$$) {
  this.$model_$.set("Password", $e$$229$$.target.$getPassword$());
  this.$conn_$.$signUp$($e$$229$$.target.$getUsername$(), $e$$229$$.target.$getPassword$(), $e$$229$$.target.$getEmail$(), $e$$229$$.target.$getState$(), $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $goog$string$toNumber$$($goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker"))))
};
$JSCompiler_prototypeAlias$$.$getModel$ = $JSCompiler_get$$("$model_$");
$JSCompiler_prototypeAlias$$.$onBeforeSetView_$ = function $$JSCompiler_prototypeAlias$$$$onBeforeSetView_$$($e$$230_view_id$$4$$) {
  $e$$230_view_id$$4$$ = $e$$230_view_id$$4$$.$view_id$;
  if(!this.$conn_$.$logged_$) {
    switch($e$$230_view_id$$4$$) {
      case "start":
      ;
      case "signin":
      ;
      case "signup":
      ;
      case "tos":
      ;
      case "forgot_password":
      ;
      case "set_new_password":
      ;
      case "broker_application":
        break;
      case "market":
        this.$conn_$.$connected_$ || this.$router_$.$setView$("start");
        break;
      default:
        return this.$router_$.$setView$("start"), $JSCompiler_alias_FALSE$$
    }
  }
  var $classes$$10$$ = $goog$dom$classes$get$$(document.body), $classes_to_remove$$ = [];
  $goog$array$forEach$$($classes$$10$$, function($cls$$1$$) {
    0 == $cls$$1$$.lastIndexOf("active-view-", 0) && $classes_to_remove$$.push($cls$$1$$)
  });
  $goog$array$forEach$$($classes_to_remove$$, function($cls$$2$$) {
    $goog$dom$classes$remove$$(document.body, $cls$$2$$)
  });
  document.body.scrollTop = 0;
  $goog$dom$classes$add$$(document.body, "active-view-" + $e$$230_view_id$$4$$)
};
$JSCompiler_prototypeAlias$$.$getBrokerByCountry$ = function $$JSCompiler_prototypeAlias$$$$getBrokerByCountry$$($country$$1$$) {
  return this.$brokers_by_country_$[$country$$1$$]
};
$JSCompiler_prototypeAlias$$.$formatCurrency$ = function $$JSCompiler_prototypeAlias$$$$formatCurrency$$($amount$$7$$, $currency_code$$2$$) {
  var $currency_def$$1$$ = this.$currency_info_$[$currency_code$$2$$];
  return(new $goog$i18n$NumberFormat$$($currency_def$$1$$.$format$, $currency_def$$1$$.code)).$format$($amount$$7$$)
};
$JSCompiler_prototypeAlias$$.$isCryptoCurrency$ = function $$JSCompiler_prototypeAlias$$$$isCryptoCurrency$$($currency_code$$3$$) {
  return this.$currency_info_$[$currency_code$$3$$].$is_crypto$
};
$JSCompiler_prototypeAlias$$.$getCurrencySign$ = function $$JSCompiler_prototypeAlias$$$$getCurrencySign$$($currency_code$$4$$) {
  return this.$currency_info_$[$currency_code$$4$$].$sign$
};
$JSCompiler_prototypeAlias$$.$getCurrencyDescription$ = function $$JSCompiler_prototypeAlias$$$$getCurrencyDescription$$($currency_code$$5$$) {
  return this.$currency_info_$[$currency_code$$5$$].description
};
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($e$$231_msg$$82$$) {
  $e$$231_msg$$82$$ = $e$$231_msg$$82$$.data;
  $goog$array$forEach$$($e$$231_msg$$82$$.Currencies, function($currency$$13$$) {
    this.$currency_info_$[$currency$$13$$.Code] = {code:$currency$$13$$.Code, $format$:$currency$$13$$.FormatJS, description:$currency$$13$$.Description, $sign$:$currency$$13$$.Sign, $pip$:$currency$$13$$.Pip, $is_crypto$:$currency$$13$$.IsCrypto};
    var $balance_key$$2_currency_key$$ = "balance_" + $currency$$13$$.Code;
    this.$model_$.set($balance_key$$2_currency_key$$, 0);
    this.$model_$.set("formatted_" + $balance_key$$2_currency_key$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    var $balance_key$$2_currency_key$$ = $currency$$13$$.Code.toLowerCase(), $min_key$$ = "min_" + $balance_key$$2_currency_key$$, $max_key$$ = "max_" + $balance_key$$2_currency_key$$, $avg_key$$ = "avg_" + $balance_key$$2_currency_key$$, $bid_key$$1$$ = "best_bid_" + $balance_key$$2_currency_key$$, $offer_key$$1$$ = "best_offer_" + $balance_key$$2_currency_key$$, $last_price$$ = "last_price_" + $balance_key$$2_currency_key$$;
    this.$model_$.set("formatted_volume_" + $balance_key$$2_currency_key$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $min_key$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $max_key$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $avg_key$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $bid_key$$1$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $offer_key$$1$$, this.$formatCurrency$(0, $currency$$13$$.Code));
    this.$model_$.set("formatted_" + $last_price$$, this.$formatCurrency$(0, $currency$$13$$.Code))
  }, this);
  var $symbols$$2$$ = [];
  $goog$array$forEach$$($e$$231_msg$$82$$.Instruments, function($instrument$$3$$) {
    var $symbol$$15$$ = $instrument$$3$$.Symbol;
    this.$all_markets_$[$symbol$$15$$] = {$symbol$:$symbol$$15$$, description:$instrument$$3$$.Description};
    $symbols$$2$$.push($symbol$$15$$)
  }, this);
  this.$model_$.set("SecurityList", $e$$231_msg$$82$$)
};
$JSCompiler_prototypeAlias$$.$onModelSetBroker_$ = function $$JSCompiler_prototypeAlias$$$$onModelSetBroker_$$($e$$232$$) {
  var $broker$$11$$ = $e$$232$$.data, $allowed_markets$$2$$ = {}, $broker_currencies$$5$$ = $broker$$11$$.Currencies.split(",");
  $goog$array$forEach$$($broker$$11$$.CryptoCurrencies, function($crypto_currency$$) {
    $broker_currencies$$5$$.push($crypto_currency$$.CurrencyCode);
    $goog$object$findKey$$(this.$all_markets_$, function($market_info$$, $symbol$$16$$) {
      if(0 <= $symbol$$16$$.indexOf($crypto_currency$$.CurrencyCode)) {
        return $JSCompiler_alias_TRUE$$
      }
    }) != $JSCompiler_alias_NULL$$ && $goog$array$forEach$$($broker$$11$$.Currencies.split(","), function($currency$$14$$) {
      var $market_currency$$ = $goog$object$findKey$$(this.$all_markets_$, function($market_info$$1$$, $symbol$$17$$) {
        if(0 <= $symbol$$17$$.indexOf($currency$$14$$)) {
          return $JSCompiler_alias_TRUE$$
        }
      });
      $market_currency$$ != $JSCompiler_alias_NULL$$ && ($allowed_markets$$2$$[$market_currency$$] = this.$all_markets_$[$market_currency$$])
    }, this)
  }, this);
  this.$model_$.set("BrokerCurrencies", $broker_currencies$$5$$);
  this.$model_$.set("AllowedMarkets", $allowed_markets$$2$$)
};
$JSCompiler_prototypeAlias$$.$onBrokerListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerListResponse_$$($e$$233$$) {
  var $msg$$83$$ = $e$$233$$.data;
  $goog$array$forEach$$($msg$$83$$.BrokerListGrp, function($broker_array$$1$$) {
    var $broker_info$$6$$ = {};
    $goog$array$forEach$$($msg$$83$$.Columns, function($column$$6$$, $index$$81$$) {
      $broker_info$$6$$[$column$$6$$] = $broker_array$$1$$[$index$$81$$]
    }, this);
    $broker_info$$6$$.CountryCode in this.$brokers_by_country_$ ? this.$brokers_by_country_$[$broker_info$$6$$.CountryCode].push($broker_info$$6$$) : this.$brokers_by_country_$[$broker_info$$6$$.CountryCode] = [$broker_info$$6$$]
  }, this);
  this.$model_$.set("BrokerList", $msg$$83$$)
};
$JSCompiler_prototypeAlias$$.$onUserConnectBitEx_$ = function $$JSCompiler_prototypeAlias$$$$onUserConnectBitEx_$$() {
  this.$connectBitEx$()
};
$JSCompiler_prototypeAlias$$.$onConnectionOpen_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionOpen_$$() {
  $goog$dom$classes$remove$$(document.body, "ws-not-connected");
  $goog$dom$classes$add$$(document.body, "ws-connected");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  this.$model_$.get("SecurityList") != $JSCompiler_alias_NULL$$ || this.$conn_$.$requestSecurityList$();
  this.$model_$.get("BrokerList") != $JSCompiler_alias_NULL$$ || this.$conn_$.$requestBrokerList$();
  var $username$$10$$ = this.$model_$.get("Username"), $password$$6$$ = this.$model_$.get("Password");
  $username$$10$$ != $JSCompiler_alias_NULL$$ && $password$$6$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($username$$10$$) && !$goog$string$isEmpty$$($password$$6$$) && 8 <= $password$$6$$.length && this.$conn_$.login($username$$10$$, $password$$6$$)
};
$JSCompiler_prototypeAlias$$.$onConnectionClose_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionClose_$$() {
  $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
  $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  this.$router_$.$setView$("start")
};
$JSCompiler_prototypeAlias$$.$onConnectionError_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionError_$$() {
  $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
  $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  this.$showNotification$("error", "Erro", "Problema com a conex\u00e3o com o servidor.");
  this.$router_$.$setView$("start")
};
$JSCompiler_prototypeAlias$$.$onConnectionErrorMessage_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionErrorMessage_$$($e$$238_msg$$84$$) {
  $e$$238_msg$$84$$ = $e$$238_msg$$84$$.data;
  this.$showNotification$("error", "Mensagem do servidor:", $e$$238_msg$$84$$.Description + " - " + $e$$238_msg$$84$$.Detail, this.$error_message_alert_timeout_$)
};
$JSCompiler_prototypeAlias$$.$showDialog$ = function $$JSCompiler_prototypeAlias$$$$showDialog$$($content$$18$$, $opt_title$$3_title$$8$$, $buttonSet$$1_opt_button_set$$) {
  $opt_title$$3_title$$8$$ = $opt_title$$3_title$$8$$ || "Erro";
  $buttonSet$$1_opt_button_set$$ = $buttonSet$$1_opt_button_set$$ || $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$);
  this.$dialog_$ != $JSCompiler_alias_NULL$$ && (this.$dialog_$.$dispose$(), this.$dialog_$ = $JSCompiler_alias_NULL$$);
  var $JSCompiler_StaticMethods_setTitle$self$$inline_850$$ = this.$dialog_$ = new $bootstrap$Dialog$$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_850$$.$title_$ = $opt_title$$3_title$$8$$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_850$$.$titleTextEl_$ && $goog$dom$setTextContent$$($JSCompiler_StaticMethods_setTitle$self$$inline_850$$.$titleTextEl_$, $opt_title$$3_title$$8$$);
  this.$dialog_$.$setContent$($content$$18$$);
  $JSCompiler_StaticMethods_setButtonSet$$(this.$dialog_$, $buttonSet$$1_opt_button_set$$);
  this.$dialog_$.$setVisible$($JSCompiler_alias_TRUE$$);
  return this.$dialog_$
};
$JSCompiler_prototypeAlias$$.$showNotification$ = function $$JSCompiler_prototypeAlias$$$$showNotification$$($type$$109$$, $alert_content_title$$9$$, $content$$19$$, $opt_display_time$$) {
  var $display_time$$ = 3E3;
  $goog$isNumber$$($opt_display_time$$) && ($display_time$$ = $opt_display_time$$);
  $alert_content_title$$9$$ = $goog$dom$createDom$$("span", $JSCompiler_alias_VOID$$, [$goog$dom$createDom$$("strong", $JSCompiler_alias_VOID$$, $alert_content_title$$9$$), " ", $content$$19$$]);
  var $notification$$ = new $bootstrap$Alert$$($type$$109$$, $alert_content_title$$9$$, $JSCompiler_alias_TRUE$$);
  $notification$$.render($goog$dom$getElement$$("id_notifications"));
  if(0 < $display_time$$) {
    var $handler$$96$$ = this.$getHandler$();
    $goog$Timer$callOnce$$(function() {
      var $anim$$3$$ = new $goog$fx$dom$FadeOutAndHide$$($notification$$.$getElement$(), 200);
      $JSCompiler_StaticMethods_listenOnce$$($handler$$96$$, $anim$$3$$, "end", function() {
        $notification$$.$dispose$();
        $anim$$3$$.$dispose$()
      });
      $anim$$3$$.play()
    }, $display_time$$, this)
  }
};
$goog$exportPath_$$("App", $bitex$app$SatoshiSquare$$);
App.prototype.showNotification = $bitex$app$SatoshiSquare$$.prototype.$showNotification$;
App.prototype.showDialog = $bitex$app$SatoshiSquare$$.prototype.$showDialog$;
App.prototype.getHandler = $bitex$app$SatoshiSquare$$.prototype.$getHandler$;
App.prototype.getCurrencyDescription = $bitex$app$SatoshiSquare$$.prototype.$getCurrencyDescription$;
App.prototype.getCurrencySign = $bitex$app$SatoshiSquare$$.prototype.$getCurrencySign$;
App.prototype.isCryptoCurrency = $bitex$app$SatoshiSquare$$.prototype.$isCryptoCurrency$;
App.prototype.formatCurrency = $bitex$app$SatoshiSquare$$.prototype.$formatCurrency$;
App.prototype.getBrokerByCountry = $bitex$app$SatoshiSquare$$.prototype.$getBrokerByCountry$;
App.prototype.getModel = $bitex$app$SatoshiSquare$$.prototype.$getModel$;
App.prototype.getQtyCurrencyFromSymbol = $bitex$app$SatoshiSquare$$.prototype.$getQtyCurrencyFromSymbol$;
App.prototype.getPriceCurrencyFromSymbol = $bitex$app$SatoshiSquare$$.prototype.$getPriceCurrencyFromSymbol$;
App.prototype.setView = $bitex$app$SatoshiSquare$$.prototype.$setView$;
App.prototype.getBitexConnection = $bitex$app$SatoshiSquare$$.prototype.$getBitexConnection$;
App.prototype.connectBitEx = $bitex$app$SatoshiSquare$$.prototype.$connectBitEx$;
App.prototype.run = $bitex$app$SatoshiSquare$$.prototype.$run$;

