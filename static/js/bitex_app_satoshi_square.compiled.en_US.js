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
function $goog$exportProperty$$($publicName$$, $symbol$$) {
  BitEx.prototype[$publicName$$] = $symbol$$
}
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
function $goog$soy$renderAsElement$$($firstChild_opt_templateData$$2$$) {
  var $template$$3$$ = $bitex$templates$OrderEntry$$, $wrapper$$ = $goog$dom$getDomHelper$$().createElement("DIV");
  $wrapper$$.innerHTML = $goog$soy$verifyTemplateOutputSafe_$$($template$$3$$($firstChild_opt_templateData$$2$$ || $goog$soy$defaultTemplateData_$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$));
  return 1 == $wrapper$$.childNodes.length && ($firstChild_opt_templateData$$2$$ = $wrapper$$.firstChild, 1 == $firstChild_opt_templateData$$2$$.nodeType) ? $firstChild_opt_templateData$$2$$ : $wrapper$$
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
    var $obj$$inline_720$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_721$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_721$$ in $obj$$inline_720$$ && delete $obj$$inline_720$$[$key$$inline_721$$];
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
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $child$$11$$) {
  var $index$$inline_166$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && !$JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_166$$ || $index$$inline_166$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_168_key$$inline_724$$ = $JSCompiler_StaticMethods_getId$$($child$$11$$);
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_168_key$$inline_724$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $JSCompiler_StaticMethods_getId$$($child$$11$$), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_166$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_168_key$$inline_724$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_168_key$$inline_724$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_168_key$$inline_724$$.childNodes[$index$$inline_166$$] || $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && 
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
      var $obj$$inline_731$$ = this.$childIndex_$;
      $id$$6$$ in $obj$$inline_731$$ && delete $obj$$inline_731$$[$id$$6$$];
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
  this.$filter_$ = $JSCompiler_alias_NULL$$;
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
  if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$79$$), "sortable")) {
    this.$sort_column_$ = $classToRemove_element$$79$$.getAttribute("data-property");
    if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$79$$), "sorted")) {
      $e$$33_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $classToRemove_element$$79$$);
      var $classToAdd$$;
      $goog$array$contains$$($goog$dom$classes$get$$($e$$33_other_sorted_column_elements_sort_indicator_element$$), "icon-chevron-up") ? ($classToRemove_element$$79$$ = "icon-chevron-up", $classToAdd$$ = "icon-chevron-down", this.$sort_direction_$ = "ASC") : ($classToRemove_element$$79$$ = "icon-chevron-down", $classToAdd$$ = "icon-chevron-up", this.$sort_direction_$ = "DESC");
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
  var $filter$$3$$ = this.$filter_$;
  $filter$$3$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($filter$$3$$) && ($options$$7$$.Filter = $filter$$3$$);
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
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, new $goog$events$InputHandler$$(this.$search_input_$), "input", this.$onChangeFilter_$);
  this.$render_$()
};
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
  }}, {property:"Side", label:"Side", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$17$$) {
    switch($s$$17$$) {
      case "1":
        return"C";
      case "2":
        return"V"
    }
    return""
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-side"
  }}, {property:"OrderDate", label:"Date/Time", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-order-date"
  }}, {property:"Price", label:"Price", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-price"
  }}, {property:"CumQty", label:"Qty", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Avg. Price", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
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
function $goog$fx$dom$PredefinedEffect$$($element$$83$$, $start$$10$$, $end$$5$$, $time$$, $opt_acc$$1$$) {
  $goog$fx$Animation$$.call(this, $start$$10$$, $end$$5$$, $time$$, $opt_acc$$1$$);
  this.element = $element$$83$$
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
function $goog$fx$dom$Fade$$($element$$91$$, $start$$18$$, $end$$13$$, $time$$8$$, $opt_acc$$9$$) {
  $goog$isNumber$$($start$$18$$) && ($start$$18$$ = [$start$$18$$]);
  $goog$isNumber$$($end$$13$$) && ($end$$13$$ = [$end$$13$$]);
  $goog$fx$dom$PredefinedEffect$$.call(this, $element$$91$$, $start$$18$$, $end$$13$$, $time$$8$$, $opt_acc$$9$$);
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
function $goog$fx$dom$FadeOutAndHide$$($element$$94$$, $time$$11$$, $opt_acc$$12$$) {
  $goog$fx$dom$Fade$$.call(this, $element$$94$$, 1, 0, $time$$11$$, $opt_acc$$12$$)
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
function $bitex$model$Model$$($element$$99$$, $opt_map$$1$$, $var_args$$82$$) {
  this.$element_$ = $element$$99$$;
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
function $bitex$util$getFormAsJSON$$($element$$100$$) {
  for(var $json_res$$ = {}, $el$$45_form_value_values$$13$$, $i$$115$$ = 0;$el$$45_form_value_values$$13$$ = $element$$100$$.elements[$i$$115$$];$i$$115$$++) {
    if(!($el$$45_form_value_values$$13$$.disabled || "fieldset" == $el$$45_form_value_values$$13$$.tagName.toLowerCase())) {
      var $name$$72$$ = $el$$45_form_value_values$$13$$.name;
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
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($element$$101$$) {
  this.$map_$.set($goog$structs$Set$getKey_$$($element$$101$$), $element$$101$$)
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
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($element$$102$$) {
  return this.$map_$.remove($goog$structs$Set$getKey_$$($element$$102$$))
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$.clear()
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($element$$103_key$$inline_264$$) {
  $element$$103_key$$inline_264$$ = $goog$structs$Set$getKey_$$($element$$103_key$$inline_264$$);
  return $goog$structs$Map$hasKey_$$(this.$map_$.$map_$, $element$$103_key$$inline_264$$)
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
    }catch($e$$37$$) {
      $str$$56$$.push("*** " + $e$$37$$ + " ***")
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
      }catch($e$$42$$) {
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
$JSCompiler_prototypeAlias$$.log = function $$JSCompiler_prototypeAlias$$$log$($level$$15_logRecord$$inline_267$$, $msg$$5_msg$$inline_738_target$$inline_268$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_740_opt_exception$$) {
  if($level$$15_logRecord$$inline_267$$.value >= $JSCompiler_StaticMethods_getEffectiveLevel$$(this).value) {
    $level$$15_logRecord$$inline_267$$ = this.$getLogRecord$($level$$15_logRecord$$inline_267$$, $msg$$5_msg$$inline_738_target$$inline_268$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_740_opt_exception$$);
    $msg$$5_msg$$inline_738_target$$inline_268$$ = "log:" + $level$$15_logRecord$$inline_267$$.$msg_$;
    $goog$global$$.console && ($goog$global$$.console.timeStamp ? $goog$global$$.console.timeStamp($msg$$5_msg$$inline_738_target$$inline_268$$) : $goog$global$$.console.markTimeline && $goog$global$$.console.markTimeline($msg$$5_msg$$inline_738_target$$inline_268$$));
    $goog$global$$.msWriteProfilerMark && $goog$global$$.msWriteProfilerMark($msg$$5_msg$$inline_738_target$$inline_268$$);
    for($msg$$5_msg$$inline_738_target$$inline_268$$ = this;$msg$$5_msg$$inline_738_target$$inline_268$$;) {
      $JSCompiler_StaticMethods_callPublish_$self$$inline_740_opt_exception$$ = $msg$$5_msg$$inline_738_target$$inline_268$$;
      var $logRecord$$inline_741$$ = $level$$15_logRecord$$inline_267$$;
      if($JSCompiler_StaticMethods_callPublish_$self$$inline_740_opt_exception$$.$handlers_$) {
        for(var $i$$inline_742$$ = 0, $handler$$inline_743$$ = $JSCompiler_alias_VOID$$;$handler$$inline_743$$ = $JSCompiler_StaticMethods_callPublish_$self$$inline_740_opt_exception$$.$handlers_$[$i$$inline_742$$];$i$$inline_742$$++) {
          $handler$$inline_743$$($logRecord$$inline_741$$)
        }
      }
      $msg$$5_msg$$inline_738_target$$inline_268$$ = $msg$$5_msg$$inline_738_target$$inline_268$$.getParent()
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
      var $href$$inline_746$$ = $goog$getObjectByName$$("window.location.href");
      if($goog$isString$$($opt_exception$$1$$)) {
        $e$$inline_283$$ = {message:$opt_exception$$1$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$inline_746$$, stack:"Not available"}
      }else {
        var $lineNumber$$inline_747$$, $fileName$$inline_748$$, $threwError$$inline_749$$ = $JSCompiler_alias_FALSE$$;
        try {
          $lineNumber$$inline_747$$ = $opt_exception$$1$$.lineNumber || $opt_exception$$1$$.$line$ || "Not available"
        }catch($e$$inline_750$$) {
          $lineNumber$$inline_747$$ = "Not available", $threwError$$inline_749$$ = $JSCompiler_alias_TRUE$$
        }
        try {
          $fileName$$inline_748$$ = $opt_exception$$1$$.fileName || $opt_exception$$1$$.filename || $opt_exception$$1$$.sourceURL || $goog$global$$.$googDebugFname || $href$$inline_746$$
        }catch($e$$inline_751$$) {
          $fileName$$inline_748$$ = "Not available", $threwError$$inline_749$$ = $JSCompiler_alias_TRUE$$
        }
        $e$$inline_283$$ = $threwError$$inline_749$$ || !$opt_exception$$1$$.lineNumber || !$opt_exception$$1$$.fileName || !$opt_exception$$1$$.stack ? {message:$opt_exception$$1$$.message, name:$opt_exception$$1$$.name, lineNumber:$lineNumber$$inline_747$$, fileName:$fileName$$inline_748$$, stack:$opt_exception$$1$$.stack || "Not available"} : $opt_exception$$1$$
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
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$104$$) {
  $bitex$view$View$$.$superClass_$.$decorateInternal$.call(this, $element$$104$$);
  this.$getDomHelper$();
  return $element$$104$$
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
  $JSCompiler_StaticMethods_listen$$($handler$$48$$, $goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$43$$) {
    $button_signup$$.$setEnabled$($e$$43$$.target.checked)
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
$JSCompiler_prototypeAlias$$.$onSignupButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onSignupButtonClick_$$($e$$44_username$$) {
  $e$$44_username$$.stopPropagation();
  $e$$44_username$$.preventDefault();
  $e$$44_username$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username"));
  var $email$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email")), $password$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password")), $password2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password2"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country"));
  $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker"));
  $goog$string$isEmpty$$($e$$44_username$$) || /[^a-zA-Z0-9]/.test($e$$44_username$$) ? this.$app_$.$showErrorDialog$("Invalid username") : $email$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? $goog$string$isEmpty$$($password$$) || 8 > $password$$.length ? this.$app_$.$showErrorDialog$("Password must have at least 8 characters") : $password$$ !== $password2$$ ? this.$app_$.$showErrorDialog$("Passwords does not match") : this.dispatchEvent("signup_click") : this.$app_$.$showErrorDialog$("Invalid email")
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
$JSCompiler_prototypeAlias$$.$onChangeCountry_$ = function $$JSCompiler_prototypeAlias$$$$onChangeCountry_$$($e$$46_selected_country$$) {
  $e$$46_selected_country$$ = $goog$dom$forms$getValue$$($e$$46_selected_country$$.target);
  $JSCompiler_StaticMethods_onSelectCountry_$$(this, $e$$46_selected_country$$)
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
  if($JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$brokers_by_country_$[""][0] != $JSCompiler_alias_NULL$$) {
    var $broker_info$$1_el$$47$$ = $JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$brokers_by_country_$[""][0], $broker_info$$1_el$$47$$ = $goog$dom$createDom$$("option", {value:$broker_info$$1_el$$47$$.BrokerID}, $broker_info$$1_el$$47$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$1_el$$47$$)
  }
  if($goog$isArrayLike$$($countries$$1_country_info$$1$$)) {
    var $states_name_array$$ = $countries$$1_country_info$$1$$[2].split("|"), $number_of_states_with_brokers$$ = 0, $last_state_with_broker$$ = "";
    $goog$array$forEach$$($countries$$1_country_info$$1$$[1].split("|"), function($state_code$$, $index$$69$$) {
      var $el$$48$$ = $goog$dom$createDom$$("option", {value:$state_code$$}, $states_name_array$$[$index$$69$$]);
      $goog$dom$getElement$$("id_signup_state").appendChild($el$$48$$);
      0 <= $goog$array$findIndex$$(this.$app_$.$brokers_by_country_$[$selected_country$$2$$], function($broker_info$$2$$) {
        if($broker_info$$2$$.State === $state_code$$) {
          return $JSCompiler_alias_TRUE$$
        }
      }) && (++$number_of_states_with_brokers$$, $last_state_with_broker$$ = $state_code$$)
    }, $JSCompiler_StaticMethods_onSelectCountry_$self$$);
    1 == $number_of_states_with_brokers$$ && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_state"), $last_state_with_broker$$), $JSCompiler_StaticMethods_onSelectState_$$($JSCompiler_StaticMethods_onSelectCountry_$self$$, $selected_country$$2$$, $last_state_with_broker$$))
  }else {
    var $number_of_available_brokers$$ = 0, $last_available_broker$$ = "";
    $goog$object$forEach$$($JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$brokers_by_country_$[$selected_country$$2$$], function($broker_info$$3$$) {
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
  if($JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$brokers_by_country_$[""][0] != $JSCompiler_alias_NULL$$) {
    var $broker_info$$4_el$$50$$ = $JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$brokers_by_country_$[""][0], $broker_info$$4_el$$50$$ = $goog$dom$createDom$$("option", {value:$broker_info$$4_el$$50$$.BrokerID}, $broker_info$$4_el$$50$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$4_el$$50$$)
  }
  var $number_of_available_brokers$$1$$ = 0, $last_available_broker$$1$$ = "";
  $goog$array$forEach$$($JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$brokers_by_country_$[$selected_country$$3$$], function($broker_info$$5_el$$51$$) {
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
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $goog$dom$getElement$$("id_landing_signin"), "click", function($e$$48$$) {
    $e$$48$$.stopPropagation();
    $e$$48$$.preventDefault();
    $JSCompiler_StaticMethods_onLoginClick_$$(this, $goog$dom$getElement$$("id_landing_username"), $goog$dom$getElement$$("id_landing_password"))
  });
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $goog$dom$getElement$$("id_btn_login"), "click", function($e$$49$$) {
    $e$$49$$.stopPropagation();
    $e$$49$$.preventDefault();
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
  $goog$string$isEmpty$$($username$$1_username_el$$) ? ($JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_onLoginClick_$self$$.$app_$, "Invalid username"), $JSCompiler_StaticMethods_onLoginClick_$self$$.$username_el_$.focus()) : $goog$string$isEmpty$$($password$$1_password_el$$) || 8 > $password$$1_password_el$$.length ? ($JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_onLoginClick_$self$$.$app_$, "Password must have at least 8 characters"), $JSCompiler_StaticMethods_onLoginClick_$self$$.$password_el_$.focus()) : 
  $JSCompiler_StaticMethods_onLoginClick_$self$$.dispatchEvent("login_click")
}
$bitex$view$LoginView$$.prototype.clear = function $$bitex$view$LoginView$$$$clear$() {
  this.$username_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$username_el_$, "");
  this.$password_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$password_el_$, "")
};
// Input 70
function $bitex$ui$WithdrawList$$($opt_broker_mode$$, $opt_domHelper$$8$$) {
  var $broker_mode$$ = $JSCompiler_alias_FALSE$$;
  $opt_broker_mode$$ === $JSCompiler_alias_TRUE$$ && ($broker_mode$$ = $JSCompiler_alias_TRUE$$);
  var $grid_columns$$1$$ = [{property:"Created", label:"Date/Time", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-created"
  }}, {property:"Status", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($label_class_text_s$$24$$) {
    $label_class_text_s$$24$$ = function($s$$25$$) {
      switch($s$$25$$) {
        case "0":
          return["", "Unconfirmed"];
        case "1":
          return["warning", "Pending"];
        case "2":
          return["info", "In progress..."];
        case "4":
          return["sucess", "Completed"];
        case "8":
          return["important", "Cancelled"]
      }
      return["", ""]
    }($label_class_text_s$$24$$);
    return $goog$dom$createDom$$("span", ["label", "label-" + $label_class_text_s$$24$$[0]], $label_class_text_s$$24$$[1])
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-status"
  }}, {property:"Currency", label:"Currency", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-currency"
  }}, {property:"Amount", label:"Amount", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-amount"
  }}, {property:"Method", label:"Method", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-method"
  }}, {property:"Data", label:"Details", sortable:$JSCompiler_alias_FALSE$$, formatter:function($data$$33$$, $rowSet$$) {
    var $element$$105$$ = $goog$dom$createDom$$("table"), $reason_id$$ = $rowSet$$.ReasonID, $reason$$ = $rowSet$$.Reason;
    if($reason_id$$ != $JSCompiler_alias_NULL$$) {
      switch($reason_id$$) {
        case 0:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, $reason$$)));
          break;
        case -1:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Insufficient funds")));
          break;
        case -2:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Account not verified")));
          break;
        case -3:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Suspicion of fraud")));
          break;
        case -4:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Withdrawing to a different account than yours")));
          break;
        case -5:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Invalid wallet")));
          break;
        case -6:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Invalid bank account")));
          break;
        case -7:
          $goog$dom$appendChild$$($element$$105$$, $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", {colspan:2}, "Amount exceeded your daily withdraw limit")))
      }
    }
    $goog$object$forEach$$($data$$33$$, function($value$$95$$, $key$$74$$) {
      var $row_element$$1$$ = $goog$dom$createDom$$("tr", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, $key$$74$$), $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, $value$$95$$));
      $element$$105$$.appendChild($row_element$$1$$)
    }, this);
    return $element$$105$$
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details"
  }}];
  $broker_mode$$ && $grid_columns$$1$$.push({property:"WithdrawID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-actions"
  }, formatter:function($s$$26$$, $row_set_obj$$1$$) {
    var $btn_complete_data_row$$1$$ = $goog$json$serialize$$($row_set_obj$$1$$), $btn_cancel$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-danger btn-withdraw-cancel", "data-row":$btn_complete_data_row$$1$$}, "Cancel"), $btn_progress$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-withdraw-progress", "data-row":$btn_complete_data_row$$1$$}, "Set in progress"), $btn_complete_data_row$$1$$ = $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-success btn-withdraw-complete", 
    "data-row":$btn_complete_data_row$$1$$}, "Set as complete");
    switch($row_set_obj$$1$$.Status) {
      case "0":
        return $btn_cancel$$;
      case "1":
        return[$btn_cancel$$, $btn_progress$$];
      case "2":
        return[$btn_cancel$$, $btn_complete_data_row$$1$$];
      case "4":
        return"";
      case "8":
        return""
    }
  }});
  this.$selected_withdraw_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowIDFn:this.$getRowId$, rowClassFn:this.$getRowClass$, columns:$grid_columns$$1$$}, $opt_domHelper$$8$$)
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
$JSCompiler_prototypeAlias$$.$handleClick_$ = function $$JSCompiler_prototypeAlias$$$$handleClick_$$($e$$50$$) {
  this.$selected_withdraw_$ = $goog$json$parse$$($e$$50$$.target.getAttribute("data-row"));
  this.$selected_withdraw_$ != $JSCompiler_alias_NULL$$ && ($goog$array$contains$$($goog$dom$classes$get$$($e$$50$$.target), "btn-withdraw-complete") ? this.dispatchEvent("withdraw_complete") : $goog$array$contains$$($goog$dom$classes$get$$($e$$50$$.target), "btn-withdraw-progress") ? this.dispatchEvent("withdraw_progress") : $goog$array$contains$$($goog$dom$classes$get$$($e$$50$$.target), "btn-withdraw-cancel") && this.dispatchEvent("withdraw_cancel"), this.$selected_withdraw_$ = $JSCompiler_alias_NULL$$)
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
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$WithdrawList$CSS_CLASS$$, function() {
  return new $bitex$ui$WithdrawList$$
});
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
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$54_e$$51_element$$inline_328$$) {
  var $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ = "mousedown" == $JSCompiler_temp$$54_e$$51_element$$inline_328$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$54_e$$51_element$$inline_328$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$54_e$$51_element$$inline_328$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$54_e$$51_element$$inline_328$$.clientX, $JSCompiler_temp$$54_e$$51_element$$inline_328$$.clientY, $JSCompiler_temp$$54_e$$51_element$$inline_328$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$54_e$$51_element$$inline_328$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$54_e$$51_element$$inline_328$$.preventDefault()
    }
    var $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ = this.$document_$, $bestParent$$inline_330_docEl$$inline_325$$ = $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$.documentElement, $borderWidths$$inline_331_useCapture$$inline_326$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_331_useCapture$$inline_326$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_331_useCapture$$inline_326$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_330_docEl$$inline_325$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_330_docEl$$inline_325$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ ? $goog$dom$getWindow_$$($doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_331_useCapture$$inline_326$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.clientY;
    this.screenX = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.screenX;
    this.screenY = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$54_e$$51_element$$inline_328$$ = this.target, $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.offsetLeft, $bestParent$$inline_330_docEl$$inline_325$$ = $JSCompiler_temp$$54_e$$51_element$$inline_328$$.offsetParent, !$bestParent$$inline_330_docEl$$inline_325$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$54_e$$51_element$$inline_328$$, "position") && ($bestParent$$inline_330_docEl$$inline_325$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$54_e$$51_element$$inline_328$$).documentElement), $bestParent$$inline_330_docEl$$inline_325$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_331_useCapture$$inline_326$$ = $goog$style$getBorderBox$$($bestParent$$inline_330_docEl$$inline_325$$), $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ += $borderWidths$$inline_331_useCapture$$inline_326$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_331_useCapture$$inline_326$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_330_docEl$$inline_325$$), $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ -= $borderWidths$$inline_331_useCapture$$inline_326$$.left), $JSCompiler_temp$$54_e$$51_element$$inline_328$$ = $goog$style$isRightToLeft$$($bestParent$$inline_330_docEl$$inline_325$$) ? $bestParent$$inline_330_docEl$$inline_325$$.clientWidth - ($doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$ + $JSCompiler_temp$$54_e$$51_element$$inline_328$$.offsetWidth) : 
    $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$) : $JSCompiler_temp$$54_e$$51_element$$inline_328$$ = $doc$$inline_324_isMouseDown_offsetLeftForReal$$inline_329$$) : $JSCompiler_temp$$54_e$$51_element$$inline_328$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$54_e$$51_element$$inline_328$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$53$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$53$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$69$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$41$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$53$$.clientX, $e$$53$$.clientY, $e$$53$$, $x$$69$$, $y$$41$$, $opt_dragCanceled$$ || "touchcancel" == $e$$53$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$53$$.type || "touchcancel" == $e$$53$$.type) && $e$$53$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$55$$) {
  var $type$$100$$ = $e$$55$$.type;
  "touchstart" == $type$$100$$ || "touchmove" == $type$$100$$ ? $e$$55$$.init($e$$55$$.$event_$.targetTouches[0], $e$$55$$.currentTarget) : ("touchend" == $type$$100$$ || "touchcancel" == $type$$100$$) && $e$$55$$.init($e$$55$$.$event_$.changedTouches[0], $e$$55$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$56$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$56$$);
    var $dx$$7_x$$70$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$56$$.clientX - this.clientX), $dy$$7_pos$$6_y$$42$$ = $e$$56$$.clientY - this.clientY;
    this.clientX = $e$$56$$.clientX;
    this.clientY = $e$$56$$.clientY;
    this.screenX = $e$$56$$.screenX;
    this.screenY = $e$$56$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$56$$.clientX, $e$$56$$.clientY, $e$$56$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$56$$);
          return
        }
      }
    }
    $dy$$7_pos$$6_y$$42$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$70$$, $dy$$7_pos$$6_y$$42$$);
    $dx$$7_x$$70$$ = $dy$$7_pos$$6_y$$42$$.x;
    $dy$$7_pos$$6_y$$42$$ = $dy$$7_pos$$6_y$$42$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$56$$.clientX, $e$$56$$.clientY, $e$$56$$, $dx$$7_x$$70$$, $dy$$7_pos$$6_y$$42$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$56$$, $dx$$7_x$$70$$, $dy$$7_pos$$6_y$$42$$), $e$$56$$.preventDefault())
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
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$57$$) {
  var $pos$$7$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$57$$.clientX = this.clientX;
  $e$$57$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$57$$, $pos$$7$$.x, $pos$$7$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$58$$, $x$$72$$, $y$$44$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$72$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$72$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$44$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$58$$.clientX, $e$$58$$.clientY, $e$$58$$, $x$$72$$, $y$$44$$))
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
function $goog$events$FocusHandler$$($element$$107_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$107_typeOut$$;
  $element$$107_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$107_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$64$$) {
  var $event$$3$$ = new $goog$events$BrowserEvent$$($e$$64$$.$event_$);
  $event$$3$$.type = "focusin" == $e$$64$$.type || "focus" == $e$$64$$.type ? "focusin" : "focusout";
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
  var $element$$108$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$108$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$108$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$108$$, $JSCompiler_alias_FALSE$$);
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$109$$) {
  return!!$element$$109$$ && "DIV" == $element$$109$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$110$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$110$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$ = this.$getElement$();
    $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode && $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$)
  }
  $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$ = this.$getElement$();
  $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode && $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$ = this.$getElement$();
  $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode && $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_346_refNode$$inline_829_refNode$$inline_832$$.nextSibling);
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
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$) {
  if($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_767_win$$inline_762$$ = (($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_773_popupSize$$inline_766$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_767_win$$inline_762$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_767_win$$inline_762$$ || window);
        $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = Math.max($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ + $viewSize$$inline_767_win$$inline_762$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_773_popupSize$$inline_766$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ + $viewSize$$inline_767_win$$inline_762$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_773_popupSize$$inline_766$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$, $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$, $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$);
        $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_773_popupSize$$inline_766$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$713_JSCompiler_temp_const$$716_doc$$inline_761_left$$inline_768_visible$$1_x$$inline_763$$($JSCompiler_StaticMethods_getWindow$self$$inline_771_JSCompiler_temp_const$$715_scroll$$inline_765_top$$inline_769_y$$inline_764$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_773_popupSize$$inline_766$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
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
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$66$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$66$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$67$$) {
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
function $goog$a11y$aria$setState$$($element$$113$$, $state$$2$$, $value$$96$$) {
  $element$$113$$.setAttribute("aria-" + $state$$2$$, $value$$96$$)
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
    var $element$$inline_356$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_357$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_356$$, $className$$inline_357$$) : $goog$dom$classes$remove$$($element$$inline_356$$, $className$$inline_357$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$ = this.$getElement$(), $dom$$6$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$6$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$6$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$6$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$, this.$titleEl_$, this.$contentEl_$ = $dom$$6$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$6$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_360_element$$119$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:$JSCompiler_StaticMethods_getId$$(this)}), $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_363_dialogElement_element$$120$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_368_element$$121$$ = this.$getElement$();
  $dom$$inline_368_element$$121$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_368_element$$121$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_368_element$$121$$ = this.$getDomHelper$(), $bg$$inline_369$$ = this.$getBackgroundElement$();
    $dom$$inline_368_element$$121$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_368_element$$121$$.removeNode($bg$$inline_369$$)
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
          }catch($e$$68$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$41_h$$13$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_373_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$41_h$$13$$ ? $goog$dom$getWindow_$$($doc$$41_h$$13$$) : window) || window || window), $w$$9$$ = Math.max($doc$$41_h$$13$$.body.scrollWidth, $limits$$inline_373_viewSize$$2$$.width), $doc$$41_h$$13$$ = Math.max($doc$$41_h$$13$$.body.scrollHeight, $limits$$inline_373_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_373_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_373_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_373_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_373_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$9$$ - $dialogSize$$.width, $doc$$41_h$$13$$ - 
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
      var $JSCompiler_StaticMethods_attachToElement$self$$inline_378$$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_378$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_378$$.render()
    }else {
      $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$.innerHTML = ""
    }
    $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$)
  }
}
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$2_e$$71_el$$inline_383_key$$76$$) {
  a: {
    for($button$$2_e$$71_el$$inline_383_key$$76$$ = $button$$2_e$$71_el$$inline_383_key$$76$$.target;$button$$2_e$$71_el$$inline_383_key$$76$$ != $JSCompiler_alias_NULL$$ && $button$$2_e$$71_el$$inline_383_key$$76$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$2_e$$71_el$$inline_383_key$$76$$.tagName) {
        break a
      }
      $button$$2_e$$71_el$$inline_383_key$$76$$ = $button$$2_e$$71_el$$inline_383_key$$76$$.parentNode
    }
    $button$$2_e$$71_el$$inline_383_key$$76$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$2_e$$71_el$$inline_383_key$$76$$ && !$button$$2_e$$71_el$$inline_383_key$$76$$.disabled) {
    $button$$2_e$$71_el$$inline_383_key$$76$$ = $button$$2_e$$71_el$$inline_383_key$$76$$.name;
    var $caption$$1$$ = this.$buttons_$.get($button$$2_e$$71_el$$inline_383_key$$76$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$2_e$$71_el$$inline_383_key$$76$$, $caption$$1$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$72$$) {
  var $caption$$2_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$57$$ = $e$$72$$.target;
  if("keydown" == $e$$72$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$72$$.keyCode) {
      var $cancel_key$$77$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$57$$ = "SELECT" == $isSpecialFormElement_target$$57$$.tagName && !$isSpecialFormElement_target$$57$$.disabled;
      $cancel_key$$77$$ && !$isSpecialFormElement_target$$57$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = $buttonSet$$.get($cancel_key$$77$$), $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$77$$, $caption$$2_close$$))) : $isSpecialFormElement_target$$57$$ || ($caption$$2_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$72$$.keyCode && $e$$72$$.shiftKey && $isSpecialFormElement_target$$57$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_386$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$72$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$57$$.tagName) {
        $cancel_key$$77$$ = $isSpecialFormElement_target$$57$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$;
          if($JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_391$$ = 0, $nextButton$$inline_392$$;$nextButton$$inline_392$$ = $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$[$i$$inline_391$$];$i$$inline_391$$++) {
                if($nextButton$$inline_392$$.name == $defaultKey$$ || $nextButton$$inline_392$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$ = $nextButton$$inline_392$$;
                  break a
                }
              }
              $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$57$$ = ("TEXTAREA" == $isSpecialFormElement_target$$57$$.tagName || "SELECT" == $isSpecialFormElement_target$$57$$.tagName || "A" == $isSpecialFormElement_target$$57$$.tagName) && !$isSpecialFormElement_target$$57$$.disabled;
          $JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$ && (!$JSCompiler_temp$$33_buttons$$inline_390_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$57$$) && ($cancel_key$$77$$ = $defaultKey$$)
        }
      }
      $cancel_key$$77$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$77$$, String($buttonSet$$.get($cancel_key$$77$$)))))
    }
  }
  if($caption$$2_close$$ || $hasHandler$$) {
    $e$$72$$.stopPropagation(), $e$$72$$.preventDefault()
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
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$123$$) {
  if($buttons$$2_element$$123$$ && 1 == $buttons$$2_element$$123$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$123$$;
    $buttons$$2_element$$123$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$127$$ = 0, $button$$5$$, $key$$81$$, $caption$$6$$;$button$$5$$ = $buttons$$2_element$$123$$[$i$$127$$];$i$$127$$++) {
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
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$ = this.$getElement$(), $dom$$7_i$$130$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$7_i$$130$$.$createDom$("div", {className:"modal-header", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleCloseEl_$ = $dom$$7_i$$130$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$7_i$$130$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$, this.$titleEl_$, this.$contentEl_$ = $dom$$7_i$$130$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$7_i$$130$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$7_i$$130$$ = 0;$dom$$7_i$$130$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$.length;$dom$$7_i$$130$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_395_buttons$$4_element$$124$$[$dom$$7_i$$130$$], "btn")
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
// Input 82
function $bitex$ui$OrderEntryX$$($opt_blinkDelay$$, $opt_domHelper$$14$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$14$$);
  this.$marketPrice_$ = 0;
  this.$lastChangedField_$ = "amount"
}
$goog$inherits$$($bitex$ui$OrderEntryX$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$OrderEntryX$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($dom$$8_element$$125$$) {
  this.$element_$ = $dom$$8_element$$125$$;
  $dom$$8_element$$125$$ = this.$getDomHelper$();
  this.$symbolEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-symbol", this.$getElement$());
  this.$sideEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-side", this.$getElement$());
  this.$typeEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-type", this.$getElement$());
  this.$actionButtonEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-action", this.$getElement$());
  this.$amountEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-amount", this.$getElement$());
  this.$priceEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-price", this.$getElement$());
  this.$totalEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-total", this.$getElement$());
  this.$feeEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-fee", this.$getElement$());
  this.$clientIdEl_$ = $dom$$8_element$$125$$.$getElementByClass$(this.$getBaseCssClass$() + "-client-id", this.$getElement$())
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
$JSCompiler_prototypeAlias$$.$onBlockNonNumberKeys_$ = function $$JSCompiler_prototypeAlias$$$$onBlockNonNumberKeys_$$($e$$77$$) {
  var $inputEl$$ = $e$$77$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$);
  if(!$goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$77$$) && (38 == $e$$77$$.keyCode || 40 == $e$$77$$.keyCode)) {
    var $new_value$$1_startPos_value_to_change$$;
    $new_value$$1_startPos_value_to_change$$ = $inputEl$$.selectionStart;
    var $endPos$$1_originalStartPos$$ = $inputEl$$.selectionEnd;
    $new_value$$1_startPos_value_to_change$$ === $endPos$$1_originalStartPos$$ && 0 === $new_value$$1_startPos_value_to_change$$ ? ($new_value$$1_startPos_value_to_change$$ = $inputValue$$, $endPos$$1_originalStartPos$$ = $inputValue$$.length) : ("." === $inputValue$$.substr($new_value$$1_startPos_value_to_change$$ - 1, 1) && --$endPos$$1_originalStartPos$$, $new_value$$1_startPos_value_to_change$$ = $inputValue$$.substr(0, $endPos$$1_originalStartPos$$));
    var $match$$inline_402_number_of_decimal_places_originalEndPos$$;
    $match$$inline_402_number_of_decimal_places_originalEndPos$$ = ("" + $new_value$$1_startPos_value_to_change$$).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    $match$$inline_402_number_of_decimal_places_originalEndPos$$ = !$match$$inline_402_number_of_decimal_places_originalEndPos$$ ? 0 : Math.max(0, ($match$$inline_402_number_of_decimal_places_originalEndPos$$[1] ? $match$$inline_402_number_of_decimal_places_originalEndPos$$[1].length : 0) - ($match$$inline_402_number_of_decimal_places_originalEndPos$$[2] ? +$match$$inline_402_number_of_decimal_places_originalEndPos$$[2] : 0));
    var $value_to_add$$ = 1 / Math.pow(10, $match$$inline_402_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$);
    if(isNaN($new_value$$1_startPos_value_to_change$$)) {
      return
    }
    $new_value$$1_startPos_value_to_change$$ = 38 == $e$$77$$.keyCode ? $new_value$$1_startPos_value_to_change$$ + $value_to_add$$ : $new_value$$1_startPos_value_to_change$$ - $value_to_add$$;
    $new_value$$1_startPos_value_to_change$$ = (Math.round($new_value$$1_startPos_value_to_change$$ * Math.pow(10, $match$$inline_402_number_of_decimal_places_originalEndPos$$)) / Math.pow(10, $match$$inline_402_number_of_decimal_places_originalEndPos$$)).toFixed($match$$inline_402_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = "" + $new_value$$1_startPos_value_to_change$$ + $inputValue$$.substr($endPos$$1_originalStartPos$$);
    0 > $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$) && ($new_value$$1_startPos_value_to_change$$ = (0).toFixed($match$$inline_402_number_of_decimal_places_originalEndPos$$));
    $endPos$$1_originalStartPos$$ = $inputEl$$.selectionStart;
    $match$$inline_402_number_of_decimal_places_originalEndPos$$ = $inputEl$$.selectionEnd;
    $goog$dom$forms$setValue$$($inputEl$$, $new_value$$1_startPos_value_to_change$$);
    $inputValue$$.length == $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$, $inputEl$$.selectionEnd = $match$$inline_402_number_of_decimal_places_originalEndPos$$) : $inputValue$$.length > $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ - 1, $inputEl$$.selectionEnd = $match$$inline_402_number_of_decimal_places_originalEndPos$$ - 1) : ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ + 
    1, $inputEl$$.selectionEnd = $match$$inline_402_number_of_decimal_places_originalEndPos$$ + 1);
    switch($e$$77$$.target) {
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
    $e$$77$$.preventDefault()
  }
  if(!$e$$77$$.ctrlKey && ($e$$77$$.shiftKey || !(48 <= $e$$77$$.keyCode && 57 >= $e$$77$$.keyCode)) && $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$77$$)) {
    switch($e$$77$$.keyCode) {
      case 46:
      ;
      case 8:
      ;
      case 9:
        return;
      case 110:
      ;
      case 190:
        if($inputEl$$ = $e$$77$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$), 0 > $inputValue$$.indexOf(".")) {
          return
        }
    }
    $e$$77$$.preventDefault()
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
$JSCompiler_prototypeAlias$$.$getAmount$ = function $$JSCompiler_prototypeAlias$$$$getAmount$$() {
  var $inputValue$$1_res$$7$$ = $goog$dom$forms$getValue$$(this.$amountEl_$), $inputValue$$1_res$$7$$ = $goog$string$toNumber$$($inputValue$$1_res$$7$$);
  isNaN($inputValue$$1_res$$7$$) && ($inputValue$$1_res$$7$$ = 0);
  return $inputValue$$1_res$$7$$
};
function $JSCompiler_StaticMethods_getPrice$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$) {
  $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$.$priceEl_$);
  $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$);
  isNaN($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$) && ($JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$ = 0);
  return $JSCompiler_StaticMethods_getPrice$self_inputValue$$2_res$$8$$
}
function $JSCompiler_StaticMethods_getTotal$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$) {
  $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$.$totalEl_$);
  $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$);
  isNaN($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$) && ($JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$ = 0);
  return $JSCompiler_StaticMethods_getTotal$self_inputValue$$3_res$$9$$
}
function $JSCompiler_StaticMethods_getFee$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$) {
  $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$.$feeEl_$);
  $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$);
  isNaN($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$) && ($JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$ = 0);
  return $JSCompiler_StaticMethods_getFee$self_inputValue$$4_res$$10$$
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
// Input 83
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
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($buy_order_entry_element$$126$$) {
  this.$element_$ = $buy_order_entry_element$$126$$;
  $buy_order_entry_element$$126$$ = new $bitex$ui$OrderEntryX$$;
  var $sell_order_entry$$ = new $bitex$ui$OrderEntryX$$;
  $JSCompiler_StaticMethods_addChild$$(this, $buy_order_entry_element$$126$$);
  $JSCompiler_StaticMethods_addChild$$(this, $sell_order_entry$$);
  $buy_order_entry_element$$126$$.$decorate$($goog$dom$getElement$$("id_order_entry_buy"));
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
    var $selected_symbol$$2$$ = $model$$3$$.get("SelectedSymbol"), $symbol$$2_value$$inline_434$$ = $selected_symbol$$2$$.$symbol$, $buy_order_entry$$1_value$$inline_437$$ = this.$children_$ ? this.$children_$[0] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$, $sell_order_entry$$1$$ = this.$children_$ ? this.$children_$[1] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    $goog$dom$forms$setValue$$($buy_order_entry$$1_value$$inline_437$$.$symbolEl_$, $symbol$$2_value$$inline_434$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($buy_order_entry$$1_value$$inline_437$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($buy_order_entry$$1_value$$inline_437$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    $goog$dom$forms$setValue$$($sell_order_entry$$1$$.$symbolEl_$, $symbol$$2_value$$inline_434$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    var $market$$ = $JSCompiler_alias_NULL$$;
    $model$$3$$.get("AllowedMarkets") != $JSCompiler_alias_NULL$$ && ($market$$ = $model$$3$$.get("AllowedMarkets")[$symbol$$2_value$$inline_434$$]);
    $goog$style$showElement$$($sell_order_entry$$1$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_437$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $symbol$$2_value$$inline_434$$ = $model$$3$$.get("IsBroker");
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_437$$.$clientIdEl_$, $symbol$$2_value$$inline_434$$);
    $buy_order_entry$$1_value$$inline_437$$ = $model$$3$$.get("IsBroker");
    $goog$style$showElement$$($sell_order_entry$$1$$.$clientIdEl_$, $buy_order_entry$$1_value$$inline_437$$);
    $JSCompiler_StaticMethods_recreateOrderBookComponents_$$(this, $selected_symbol$$2$$)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onOBClear_$ = function $$JSCompiler_prototypeAlias$$$$onOBClear_$$() {
  this.$order_book_offer_$ != $JSCompiler_alias_NULL$$ && (this.$order_book_bid_$.clear(), this.$order_book_offer_$.clear())
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrdersThru_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrdersThru_$$($e$$85_index$$70$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$16_side$$2$$ = $e$$85_index$$70$$.data;
    $e$$85_index$$70$$ = $msg$$16_side$$2$$.MDEntryPositionNo;
    $msg$$16_side$$2$$ = $msg$$16_side$$2$$.MDEntryType;
    "0" == $msg$$16_side$$2$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_bid_$, $e$$85_index$$70$$) : "1" == $msg$$16_side$$2$$ && $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_offer_$, $e$$85_index$$70$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrder_$$($e$$86_index$$71$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$17_side$$3$$ = $e$$86_index$$71$$.data;
    $e$$86_index$$71$$ = $msg$$17_side$$3$$.MDEntryPositionNo - 1;
    $msg$$17_side$$3$$ = $msg$$17_side$$3$$.MDEntryType;
    "0" == $msg$$17_side$$3$$ ? $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_bid_$, $e$$86_index$$71$$) : "1" == $msg$$17_side$$3$$ && $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_offer_$, $e$$86_index$$71$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBUpdateOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBUpdateOrder_$$($e$$87_index$$72$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$18_side$$4$$ = $e$$87_index$$72$$.data;
    $e$$87_index$$72$$ = $msg$$18_side$$4$$.MDEntryPositionNo - 1;
    var $qty$$1$$ = $msg$$18_side$$4$$.MDEntrySize / 1E8, $msg$$18_side$$4$$ = $msg$$18_side$$4$$.MDEntryType;
    "0" == $msg$$18_side$$4$$ ? $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_bid_$, $e$$87_index$$72$$, $qty$$1$$) : "1" == $msg$$18_side$$4$$ && $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_offer_$, $e$$87_index$$72$$, $qty$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBNewOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBNewOrder_$$($e$$88_index$$73$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$19_side$$5$$ = $e$$88_index$$73$$.data;
    $e$$88_index$$73$$ = $msg$$19_side$$5$$.MDEntryPositionNo - 1;
    var $price$$1$$ = $msg$$19_side$$5$$.MDEntryPx / 1E8, $qty$$2$$ = $msg$$19_side$$5$$.MDEntrySize / 1E8, $username$$2$$ = $msg$$19_side$$5$$.Username, $broker$$1$$ = $msg$$19_side$$5$$.Broker, $orderId$$ = $msg$$19_side$$5$$.OrderID, $msg$$19_side$$5$$ = $msg$$19_side$$5$$.MDEntryType;
    "0" == $msg$$19_side$$5$$ ? this.$order_book_bid_$.$insertOrder$($e$$88_index$$73$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$) : "1" == $msg$$19_side$$5$$ && this.$order_book_offer_$.$insertOrder$($e$$88_index$$73$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onCancelOrder_$$($e$$89$$) {
  this.$order_id_$ = $e$$89$$.$order_id$;
  this.$client_order_id_$ = $e$$89$$.$client_order_id$;
  this.dispatchEvent("cancel_order")
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $bitex$view$OfferBookView$$.$superClass_$.$exitDocument$.call(this);
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$$(this)
};
// Input 84
function $bitex$ui$OrderManager$$($opt_blinkDelay$$1$$, $opt_domHelper$$16$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-id"
  }}, {property:"OrdStatus", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$27$$) {
    return $bitex$ui$OrderManager$Status$$[$s$$27$$]
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-status"
  }}, {property:"Side", label:"Side", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$28$$) {
    switch($s$$28$$) {
      case "1":
        return"Buy";
      case "2":
        return"Sell"
    }
    return""
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-side"
  }}, {property:"OrderQty", label:"Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$29$$) {
    return($s$$29$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-qty"
  }}, {property:"Price", label:"Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$30$$) {
    return($s$$30$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-price"
  }}, {property:"LeavesQty", label:"Leaves Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$31$$) {
    return($s$$31$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-leaves_qty"
  }}, {property:"CumQty", label:"Cum Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$32$$) {
    return($s$$32$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Average Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$33$$) {
    return($s$$33$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-avg-price"
  }}, {property:"ClOrdID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, formatter:function($id$$8$$, $row_set_obj$$2$$) {
    var $attributes$$1_i$$131$$ = {"class":"icon-remove", "data-client-order-id":$id$$8$$};
    $row_set_obj$$2$$ != $JSCompiler_alias_NULL$$ && ($attributes$$1_i$$131$$["data-order-id"] = $row_set_obj$$2$$.OrderID);
    $attributes$$1_i$$131$$ = $goog$dom$createDom$$("i", $attributes$$1_i$$131$$);
    return $goog$dom$createDom$$("a", {"class":"text-error", href:"#"}, $attributes$$1_i$$131$$)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$16$$)
}
$goog$inherits$$($bitex$ui$OrderManager$$, $bitex$ui$DataGrid$$);
var $bitex$ui$OrderManager$Status$$ = {"-":"Pending", 0:"New", 1:"Partially filled", 2:"Filled", 4:"Cancelled"}, $bitex$ui$OrderManager$CSS_CLASS$$ = "order-manager";
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
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($client_order_id_e$$90$$) {
    var $order_id$$ = $client_order_id_e$$90$$.target.getAttribute("data-order-id");
    $order_id$$ != $JSCompiler_alias_NULL$$ ? this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $order_id$$)) : ($client_order_id_e$$90$$ = $client_order_id_e$$90$$.target.getAttribute("data-client-order-id"), this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $JSCompiler_alias_VOID$$, $client_order_id_e$$90$$)))
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
// Input 85
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$127$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$127$$);
  return $element$$127$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$128$$) {
  return $element$$128$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$129$$, $className$$19$$, $enable$$2$$) {
  if($control$$1_element$$129$$ = $control$$1_element$$129$$.$getElement$ ? $control$$1_element$$129$$.$getElement$() : $control$$1_element$$129$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$129$$), $className$$19$$);
      $combinedClasses$$.push($className$$19$$);
      $goog$partial$$($enable$$2$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$129$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$2$$ ? $goog$dom$classes$add$$($control$$1_element$$129$$, $className$$19$$) : $goog$dom$classes$remove$$($control$$1_element$$129$$, $className$$19$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$131$$) {
  $element$$131$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$131$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$131$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$3$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$2$$ = $goog$dom$classes$get$$($element$$131$$);
  $goog$array$forEach$$($classNames$$2$$, function($className$$21_state$$inline_448$$) {
    if(!$hasRendererClassName$$ && $className$$21_state$$inline_448$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$21_state$$inline_448$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$12$$ = $state$$3$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_834$$ = this.$classByState_$, $transposed$$inline_835$$ = {}, $key$$inline_836$$;
          for($key$$inline_836$$ in $obj$$inline_834$$) {
            $transposed$$inline_835$$[$obj$$inline_834$$[$key$$inline_836$$]] = $key$$inline_836$$
          }
          this.$stateByClass_$ = $transposed$$inline_835$$
        }
        $className$$21_state$$inline_448$$ = parseInt(this.$stateByClass_$[$className$$21_state$$inline_448$$], 10);
        $state$$3$$ = $JSCompiler_temp_const$$12$$ | (isNaN($className$$21_state$$inline_448$$) ? 0 : $className$$21_state$$inline_448$$)
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
    $element$$131$$.className = $classNames$$2$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$131$$);
  return $element$$131$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$isRightToLeft$() && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$133$$) {
  $control$$5$$.$visible_$ || $goog$a11y$aria$setState$$($element$$133$$, "hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$133$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$133$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$133$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$133$$, 64, $control$$5$$.$isOpen$())
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$134$$, $allow$$) {
  var $unselectable$$inline_457_value$$inline_460$$ = !$allow$$, $descendants$$inline_459$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$134$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_457_value$$inline_460$$ = $unselectable$$inline_457_value$$inline_460$$ ? "none" : "", $element$$134$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_457_value$$inline_460$$, $descendants$$inline_459$$) {
      for(var $i$$inline_461$$ = 0, $descendant$$inline_462$$;$descendant$$inline_462$$ = $descendants$$inline_459$$[$i$$inline_461$$];$i$$inline_461$$++) {
        $descendant$$inline_462$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_457_value$$inline_460$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_457_value$$inline_460$$ = $unselectable$$inline_457_value$$inline_460$$ ? "on" : "", $element$$134$$.setAttribute("unselectable", $unselectable$$inline_457_value$$inline_460$$), $descendants$$inline_459$$) {
        for($i$$inline_461$$ = 0;$descendant$$inline_462$$ = $descendants$$inline_459$$[$i$$inline_461$$];$i$$inline_461$$++) {
          $descendant$$inline_462$$.setAttribute("unselectable", $unselectable$$inline_457_value$$inline_460$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$135$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$135$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
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
      }catch($e$$91$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$136$$, $visible$$4$$) {
  $goog$style$showElement$$($element$$136$$, $visible$$4$$);
  $element$$136$$ && $goog$a11y$aria$setState$$($element$$136$$, "hidden", !$visible$$4$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$4$$, $enable$$4$$) {
  var $element$$137$$ = $control$$8$$.$getElement$();
  if($element$$137$$) {
    var $className$$22$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$4$$);
    $className$$22$$ && this.$enableClassName$($control$$8$$, $className$$22$$, $enable$$4$$);
    this.$updateAriaState$($element$$137$$, $state$$4$$, $enable$$4$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$138$$, $ariaState_state$$5$$, $enable$$5$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$5$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$5$$]) && $goog$a11y$aria$setState$$($element$$138$$, $ariaState_state$$5$$, $enable$$5$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$139$$, $content$$7$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$139$$);
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
  var $cssClass_extraClassNames$$1_state$$inline_465$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$3$$ = [$cssClass_extraClassNames$$1_state$$inline_465$$], $classNames$$inline_466_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_466_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_465$$ && $classNames$$3$$.push($classNames$$inline_466_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_465$$ = $control$$10$$.$getState$();
  for($classNames$$inline_466_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_465$$;) {
    var $mask$$inline_467$$ = $cssClass_extraClassNames$$1_state$$inline_465$$ & -$cssClass_extraClassNames$$1_state$$inline_465$$;
    $classNames$$inline_466_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_467$$));
    $cssClass_extraClassNames$$1_state$$inline_465$$ &= ~$mask$$inline_467$$
  }
  $classNames$$3$$.push.apply($classNames$$3$$, $classNames$$inline_466_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_465$$ = $control$$10$$.$extraClassNames_$) && $classNames$$3$$.push.apply($classNames$$3$$, $cssClass_extraClassNames$$1_state$$inline_465$$);
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
// Input 86
// Input 87
// Input 88
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
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$92$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$92$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$92$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$92$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$92$$.ctrlKey && 17 != $e$$92$$.keyCode ? this.$lastKey_$ = 17 : $e$$92$$.altKey && 18 != $e$$92$$.keyCode ? this.$lastKey_$ = 18 : $e$$92$$.metaKey && 91 != $e$$92$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$92$$.keyCode, this.$lastKey_$, $e$$92$$.shiftKey, $e$$92$$.ctrlKey, $e$$92$$.altKey) ? this.handleEvent($e$$92$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$92$$.keyCode) : $e$$92$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$92$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$93$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$93$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$94_repeat$$) {
  var $be$$4_event$$4$$ = $e$$94_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$4_event$$4$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$94_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$4_event$$4$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$94_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$4_event$$4$$.charCode && 63232 > $be$$4_event$$4$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$4_event$$4$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$4_event$$4$$.keyCode : 0) : ($keyCode$$3$$ = $be$$4_event$$4$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$4_event$$4$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$87$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$4_event$$4$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$87$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$94_repeat$$.shiftKey && ($key$$87$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$87$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$94_repeat$$ = $key$$87$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$87$$;
  $be$$4_event$$4$$ = new $goog$events$KeyEvent$$($key$$87$$, $charCode$$, $e$$94_repeat$$, $be$$4_event$$4$$);
  $be$$4_event$$4$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$4_event$$4$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$141$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$141$$;
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
// Input 89
function $goog$ui$Control$$($content$$8$$, $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$, $opt_domHelper$$17$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$17$$);
  if(!$JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$) {
    $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$ = this.constructor;
    for(var $key$$inline_476_rendererCtor$$inline_477$$;$JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$;) {
      $key$$inline_476_rendererCtor$$inline_477$$ = $goog$getUid$$($JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$);
      if($key$$inline_476_rendererCtor$$inline_477$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_476_rendererCtor$$inline_477$$]) {
        break
      }
      $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$ = $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$ = $key$$inline_476_rendererCtor$$inline_477$$ ? $goog$isFunction$$($key$$inline_476_rendererCtor$$inline_477$$.$getInstance$) ? $key$$inline_476_rendererCtor$$inline_477$$.$getInstance$() : new $key$$inline_476_rendererCtor$$inline_477$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$37_componentCtor$$inline_475_opt_renderer$$;
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
  var $element$$142$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$142$$;
  var $ariaRole$$inline_504$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_504$$ && $element$$142$$.setAttribute("role", $ariaRole$$inline_504$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$142$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$142$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$143$$) {
  return this.$renderer_$.$canDecorate$($element$$143$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$144$$) {
  this.$element_$ = $element$$144$$ = this.$renderer_$.$decorate$(this, $element$$144$$);
  var $ariaRole$$inline_512$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_512$$ && $element$$144$$.setAttribute("role", $ariaRole$$inline_512$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$144$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$144$$.style.display
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
  var $handler$$57$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$145$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$8$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$145$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$145$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$145$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$145$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$145$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$57$$, $element$$145$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$145$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$145$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$145$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$145$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$145$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$57$$, $element$$145$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
  var $element$$146$$ = this.$getElement$();
  $element$$146$$ && this.$renderer_$.$setRightToLeft$($element$$146$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$147$$ = this.$getElement$();
  $element$$147$$ && this.$renderer_$.$setAllowTextSelection$($element$$147$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$5$$ && this.dispatchEvent($visible$$5$$ ? "show" : "hide")) {
    var $element$$148$$ = this.$getElement$();
    $element$$148$$ && this.$renderer_$.$setVisible$($element$$148$$, $visible$$5$$);
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
  var $parent$$inline_518$$ = this.getParent();
  if((!$parent$$inline_518$$ || "function" != typeof $parent$$inline_518$$.isEnabled || $parent$$inline_518$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$9$$)) {
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
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$95$$) {
  (!$e$$95$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$95$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$96$$) {
  if((!$e$$96$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$96$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$98$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$98$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$98$$) && $e$$98$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$99$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$isActive$() && (this.$performActionInternal$($e$$99$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$100$$) {
  this.isEnabled() && this.$performActionInternal$($e$$100$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$101$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_521_open$$inline_527$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_521_open$$inline_527$$) && this.$setState$(16, $actionEvent_check$$inline_521_open$$inline_527$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_521_open$$inline_527$$ = !this.$isOpen$(), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_521_open$$inline_527$$) && this.$setState$(64, $actionEvent_check$$inline_521_open$$inline_527$$));
  $actionEvent_check$$inline_521_open$$inline_527$$ = new $goog$events$Event$$("action", this);
  $e$$101$$ && ($actionEvent_check$$inline_521_open$$inline_527$$.altKey = $e$$101$$.altKey, $actionEvent_check$$inline_521_open$$inline_527$$.ctrlKey = $e$$101$$.ctrlKey, $actionEvent_check$$inline_521_open$$inline_527$$.metaKey = $e$$101$$.metaKey, $actionEvent_check$$inline_521_open$$inline_527$$.shiftKey = $e$$101$$.shiftKey, $actionEvent_check$$inline_521_open$$inline_527$$.$platformModifierKey$ = $e$$101$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_521_open$$inline_527$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$104$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$104$$) ? ($e$$104$$.preventDefault(), $e$$104$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$105$$) {
  return 13 == $e$$105$$.keyCode && this.$performActionInternal$($e$$105$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_537$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_537$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 90
// Input 91
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$149$$, $state$$17$$, $enable$$14$$) {
  16 == $state$$17$$ ? $goog$a11y$aria$setState$$($element$$149$$, "pressed", $enable$$14$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$149$$, $state$$17$$, $enable$$14$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$9$$) {
  var $element$$150$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$9$$), $tooltip_value$$108$$ = $button$$9$$.$getTooltip$();
  $tooltip_value$$108$$ && this.$setTooltip$($element$$150$$, $tooltip_value$$108$$);
  ($tooltip_value$$108$$ = $button$$9$$.$getValue$()) && this.$setValue$($element$$150$$, $tooltip_value$$108$$);
  $button$$9$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$150$$, 16, !!($button$$9$$.$state_$ & 16));
  return $element$$150$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$10$$, $element$$151$$) {
  $element$$151$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$10$$, $element$$151$$);
  var $value$$inline_540$$ = this.$getValue$($element$$151$$);
  $button$$10$$.$value_$ = $value$$inline_540$$;
  $button$$10$$.$tooltip_$ = this.$getTooltip$($element$$151$$);
  $button$$10$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$151$$, 16, !!($button$$10$$.$state_$ & 16));
  return $element$$151$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$152$$) {
  return $element$$152$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$153$$, $tooltip$$1$$) {
  $element$$153$$ && ($element$$153$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 92
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$154$$) {
  return"BUTTON" == $element$$154$$.tagName || "INPUT" == $element$$154$$.tagName && ("button" == $element$$154$$.type || "submit" == $element$$154$$.type || "reset" == $element$$154$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$13$$, $element$$155$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$13$$);
  $button$$13$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$13$$);
  $element$$155$$.disabled && $goog$dom$classes$add$$($element$$155$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$13$$, $element$$155$$)
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
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$16_element$$156$$, $state$$18$$, $enable$$15$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$16_element$$156$$, $state$$18$$, $enable$$15$$);
  if(($button$$16_element$$156$$ = $button$$16_element$$156$$.$getElement$()) && 1 == $state$$18$$) {
    $button$$16_element$$156$$.disabled = $enable$$15$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$157$$) {
  return $element$$157$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$158$$, $value$$109$$) {
  $element$$158$$ && ($element$$158$$.value = $value$$109$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 93
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$106$$) {
  return 13 == $e$$106$$.keyCode && $e$$106$$.type == $goog$events$KeyHandler$EventType$KEY$$ || 32 == $e$$106$$.keyCode && "keyup" == $e$$106$$.type ? this.$performActionInternal$($e$$106$$) : 32 == $e$$106$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 94
function $bitex$view$NullView$$($app$$5$$, $opt_domHelper$$19$$) {
  $bitex$view$View$$.call(this, $app$$5$$, $opt_domHelper$$19$$)
}
$goog$inherits$$($bitex$view$NullView$$, $bitex$view$View$$);
$bitex$view$NullView$$.prototype.$enterView$ = $JSCompiler_emptyFn$$();
$bitex$view$NullView$$.prototype.$exitView$ = $JSCompiler_emptyFn$$();
// Input 95
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
      var $sep$$inline_555$$ = "", $key$$inline_556$$;
      for($key$$inline_556$$ in $object$$7$$) {
        if(Object.prototype.hasOwnProperty.call($object$$7$$, $key$$inline_556$$)) {
          var $value$$inline_557$$ = $object$$7$$[$key$$inline_556$$];
          "function" != typeof $value$$inline_557$$ && ($sb$$7$$.push($sep$$inline_555$$), $JSCompiler_StaticMethods_serializeString_$$($key$$inline_556$$, $sb$$7$$), $sb$$7$$.push(":"), $JSCompiler_StaticMethods_serialize_$$($JSCompiler_StaticMethods_serialize_$self$$, $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$ ? $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$.call($object$$7$$, $key$$inline_556$$, $value$$inline_557$$) : $value$$inline_557$$, $sb$$7$$), $sep$$inline_555$$ = 
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
// Input 96
function $bitex$ui$Customers$$($opt_domHelper$$20$$) {
  this.$selected_customer_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-username"
  }}, {property:"Email", label:"Email", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-email"
  }}, {property:"Verified", label:"Verified", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$38$$) {
    return $s$$38$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-verified"
  }}, {property:"TwoFactorEnabled", label:"Two step", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$39$$) {
    return $s$$39$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-two-steps"
  }}, {property:"LastLogin", label:"Last seen", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}, {property:"ID", label:"Actions", sortable:$JSCompiler_alias_TRUE$$, formatter:function($id$$9$$, $row_set_obj$$3$$) {
    var $data_row$$2$$ = $goog$json$serialize$$($row_set_obj$$3$$);
    return $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-deposit", "data-row":$data_row$$2$$}, "Details")
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
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($e$$107$$) {
    this.$selected_customer_$ = $goog$json$parse$$($e$$107$$.target.getAttribute("data-row"));
    this.$selected_customer_$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent("detail")
  })
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$Customers$CSS_CLASS$$, function() {
  return new $bitex$ui$Customers$$
});
// Input 97
var $goog$i18n$NumberFormatSymbols_en$$ = {$DECIMAL_SEP$:".", $GROUP_SEP$:",", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", $MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"USD"}, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$;
// Input 98
var $goog$i18n$currency$CurrencyInfo$$ = {AED:[2, "dh", "\u062f.\u0625.", "DH"], AUD:[2, "$", "AU$"], BDT:[2, "\u09f3", "Tk"], BRL:[2, "R$", "R$"], CAD:[2, "$", "C$"], CHF:[2, "CHF", "CHF"], CLP:[0, "$", "CL$"], CNY:[2, "\u00a5", "RMB\u00a5"], COP:[0, "$", "COL$"], CRC:[0, "\u20a1", "CR\u20a1"], CZK:[2, "K\u010d", "K\u010d"], DKK:[18, "kr", "kr"], DOP:[2, "$", "RD$"], EGP:[2, "\u00a3", "LE"], EUR:[18, "\u20ac", "\u20ac"], GBP:[2, "\u00a3", "GB\u00a3"], HKD:[2, "$", "HK$"], ILS:[2, "\u20aa", "IL\u20aa"], 
INR:[2, "\u20b9", "Rs"], ISK:[0, "kr", "kr"], JMD:[2, "$", "JA$"], JPY:[0, "\u00a5", "JP\u00a5"], KRW:[0, "\u20a9", "KR\u20a9"], LKR:[2, "Rs", "SLRs"], MNT:[0, "\u20ae", "MN\u20ae"], MXN:[2, "$", "Mex$"], MYR:[2, "RM", "RM"], NOK:[18, "kr", "NOkr"], PAB:[2, "B/.", "B/."], PEN:[2, "S/.", "S/."], PHP:[2, "\u20b1", "Php"], PKR:[0, "Rs", "PKRs."], RUB:[42, "\u0440\u0443\u0431.", "\u0440\u0443\u0431."], SAR:[2, "Rial", "Rial"], SEK:[2, "kr", "kr"], SGD:[2, "$", "S$"], THB:[2, "\u0e3f", "THB"], TRY:[2, 
"TL", "YTL"], TWD:[2, "NT$", "NT$"], USD:[2, "$", "US$"], UYU:[2, "$", "UY$"], VND:[0, "\u20ab", "VN\u20ab"], YER:[0, "Rial", "Rial"], ZAR:[2, "R", "ZAR"]};
// Input 99
function $goog$i18n$NumberFormat$$($JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$, $opt_currency_strParts$$inline_812$$, $opt_currencyStyle_precision$$inline_813$$) {
  this.$intlCurrencyCode_$ = $opt_currency_strParts$$inline_812$$ || $goog$i18n$NumberFormatSymbols$$.$DEF_CURRENCY_CODE$;
  this.$currencyStyle_$ = $opt_currencyStyle_precision$$inline_813$$ || $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$;
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
  if("number" == typeof $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$) {
    switch($JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$) {
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
        $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$ = $goog$i18n$NumberFormatSymbols$$.$CURRENCY_PATTERN$;
        $opt_currency_strParts$$inline_812$$ = ["0"];
        $opt_currencyStyle_precision$$inline_813$$ = $goog$i18n$currency$CurrencyInfo$$[this.$intlCurrencyCode_$][0] & 7;
        if(0 < $opt_currencyStyle_precision$$inline_813$$) {
          $opt_currency_strParts$$inline_812$$.push(".");
          for(var $i$$inline_814$$ = 0;$i$$inline_814$$ < $opt_currencyStyle_precision$$inline_813$$;$i$$inline_814$$++) {
            $opt_currency_strParts$$inline_812$$.push("0")
          }
        }
        $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$ = $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$.replace(/0.00/g, $opt_currency_strParts$$inline_812$$.join(""));
        $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$);
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("Unsupported pattern type."))
    }
  }else {
    $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$719_pattern$$2_pattern$$inline_811$$)
  }
}
var $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$ = 0;
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$) {
  $JSCompiler_StaticMethods_applyPattern_$self$$.$pattern_$ = $pattern$$3$$.replace(/ /g, "\u00a0");
  var $pos$$8$$ = [0];
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$8$$);
  for(var $trunkLen_trunkStart$$ = $pos$$8$$[0], $decimalPos$$inline_565$$ = -1, $digitLeftCount$$inline_566$$ = 0, $n$$inline_572_zeroDigitCount$$inline_567$$ = 0, $digitRightCount$$inline_568_totalDigits$$inline_573$$ = 0, $groupingCount$$inline_569$$ = -1, $len$$inline_570$$ = $pattern$$3$$.length, $loop$$inline_571$$ = $JSCompiler_alias_TRUE$$;$pos$$8$$[0] < $len$$inline_570$$ && $loop$$inline_571$$;$pos$$8$$[0]++) {
    switch($pattern$$3$$.charAt($pos$$8$$[0])) {
      case "#":
        0 < $n$$inline_572_zeroDigitCount$$inline_567$$ ? $digitRightCount$$inline_568_totalDigits$$inline_573$$++ : $digitLeftCount$$inline_566$$++;
        0 <= $groupingCount$$inline_569$$ && 0 > $decimalPos$$inline_565$$ && $groupingCount$$inline_569$$++;
        break;
      case "0":
        0 < $digitRightCount$$inline_568_totalDigits$$inline_573$$ && $JSCompiler_alias_THROW$$(Error('Unexpected "0" in pattern "' + $pattern$$3$$ + '"'));
        $n$$inline_572_zeroDigitCount$$inline_567$$++;
        0 <= $groupingCount$$inline_569$$ && 0 > $decimalPos$$inline_565$$ && $groupingCount$$inline_569$$++;
        break;
      case ",":
        $groupingCount$$inline_569$$ = 0;
        break;
      case ".":
        0 <= $decimalPos$$inline_565$$ && $JSCompiler_alias_THROW$$(Error('Multiple decimal separators in pattern "' + $pattern$$3$$ + '"'));
        $decimalPos$$inline_565$$ = $digitLeftCount$$inline_566$$ + $n$$inline_572_zeroDigitCount$$inline_567$$ + $digitRightCount$$inline_568_totalDigits$$inline_573$$;
        break;
      case "E":
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && $JSCompiler_alias_THROW$$(Error('Multiple exponential symbols in pattern "' + $pattern$$3$$ + '"'));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ = $JSCompiler_alias_TRUE$$;
        $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$ = 0;
        $pos$$8$$[0] + 1 < $len$$inline_570$$ && "+" == $pattern$$3$$.charAt($pos$$8$$[0] + 1) && ($pos$$8$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$useSignForPositiveExponent_$ = $JSCompiler_alias_TRUE$$);
        for(;$pos$$8$$[0] + 1 < $len$$inline_570$$ && "0" == $pattern$$3$$.charAt($pos$$8$$[0] + 1);) {
          $pos$$8$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$++
        }
        (1 > $digitLeftCount$$inline_566$$ + $n$$inline_572_zeroDigitCount$$inline_567$$ || 1 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$) && $JSCompiler_alias_THROW$$(Error('Malformed exponential pattern "' + $pattern$$3$$ + '"'));
        $loop$$inline_571$$ = $JSCompiler_alias_FALSE$$;
        break;
      default:
        $pos$$8$$[0]--, $loop$$inline_571$$ = $JSCompiler_alias_FALSE$$
    }
  }
  0 == $n$$inline_572_zeroDigitCount$$inline_567$$ && (0 < $digitLeftCount$$inline_566$$ && 0 <= $decimalPos$$inline_565$$) && ($n$$inline_572_zeroDigitCount$$inline_567$$ = $decimalPos$$inline_565$$, 0 == $n$$inline_572_zeroDigitCount$$inline_567$$ && $n$$inline_572_zeroDigitCount$$inline_567$$++, $digitRightCount$$inline_568_totalDigits$$inline_573$$ = $digitLeftCount$$inline_566$$ - $n$$inline_572_zeroDigitCount$$inline_567$$, $digitLeftCount$$inline_566$$ = $n$$inline_572_zeroDigitCount$$inline_567$$ - 
  1, $n$$inline_572_zeroDigitCount$$inline_567$$ = 1);
  (0 > $decimalPos$$inline_565$$ && 0 < $digitRightCount$$inline_568_totalDigits$$inline_573$$ || 0 <= $decimalPos$$inline_565$$ && ($decimalPos$$inline_565$$ < $digitLeftCount$$inline_566$$ || $decimalPos$$inline_565$$ > $digitLeftCount$$inline_566$$ + $n$$inline_572_zeroDigitCount$$inline_567$$) || 0 == $groupingCount$$inline_569$$) && $JSCompiler_alias_THROW$$(Error('Malformed pattern "' + $pattern$$3$$ + '"'));
  $digitRightCount$$inline_568_totalDigits$$inline_573$$ = $digitLeftCount$$inline_566$$ + $n$$inline_572_zeroDigitCount$$inline_567$$ + $digitRightCount$$inline_568_totalDigits$$inline_573$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ = 0 <= $decimalPos$$inline_565$$ ? $digitRightCount$$inline_568_totalDigits$$inline_573$$ - $decimalPos$$inline_565$$ : 0;
  0 <= $decimalPos$$inline_565$$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = $digitLeftCount$$inline_566$$ + $n$$inline_572_zeroDigitCount$$inline_567$$ - $decimalPos$$inline_565$$, 0 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = 0));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = (0 <= $decimalPos$$inline_565$$ ? $decimalPos$$inline_565$$ : $digitRightCount$$inline_568_totalDigits$$inline_573$$) - $digitLeftCount$$inline_566$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$maximumIntegerDigits_$ = $digitLeftCount$$inline_566$$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$, 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ && 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = 1));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$groupingSize_$ = Math.max(0, $groupingCount$$inline_569$$);
  $JSCompiler_StaticMethods_applyPattern_$self$$.$decimalSeparatorAlwaysShown_$ = 0 == $decimalPos$$inline_565$$ || $decimalPos$$inline_565$$ == $digitRightCount$$inline_568_totalDigits$$inline_573$$;
  $trunkLen_trunkStart$$ = $pos$$8$$[0] - $trunkLen_trunkStart$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$8$$);
  $pos$$8$$[0] < $pattern$$3$$.length && $pattern$$3$$.charAt($pos$$8$$[0]) == $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ ? ($pos$$8$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$8$$), $pos$$8$$[0] += $trunkLen_trunkStart$$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, 
  $pattern$$3$$, $pos$$8$$)) : ($JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ += $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$)
}
$goog$i18n$NumberFormat$$.prototype.parse = function $$goog$i18n$NumberFormat$$$$parse$($text$$10$$, $opt_pos$$) {
  var $pos$$9$$ = $opt_pos$$ || [0], $ret$$4_text$$inline_576$$ = NaN;
  $text$$10$$ = $text$$10$$.replace(/ /g, "\u00a0");
  var $gotPositive$$ = $text$$10$$.indexOf(this.$positivePrefix_$, $pos$$9$$[0]) == $pos$$9$$[0], $gotNegative$$ = $text$$10$$.indexOf(this.$negativePrefix_$, $pos$$9$$[0]) == $pos$$9$$[0];
  $gotPositive$$ && $gotNegative$$ && (this.$positivePrefix_$.length > this.$negativePrefix_$.length ? $gotNegative$$ = $JSCompiler_alias_FALSE$$ : this.$positivePrefix_$.length < this.$negativePrefix_$.length && ($gotPositive$$ = $JSCompiler_alias_FALSE$$));
  $gotPositive$$ ? $pos$$9$$[0] += this.$positivePrefix_$.length : $gotNegative$$ && ($pos$$9$$[0] += this.$negativePrefix_$.length);
  if($text$$10$$.indexOf($goog$i18n$NumberFormatSymbols$$.$INFINITY$, $pos$$9$$[0]) == $pos$$9$$[0]) {
    $pos$$9$$[0] += $goog$i18n$NumberFormatSymbols$$.$INFINITY$.length, $ret$$4_text$$inline_576$$ = Infinity
  }else {
    for(var $ret$$4_text$$inline_576$$ = $text$$10$$, $sawDecimal$$inline_578$$ = $JSCompiler_alias_FALSE$$, $sawExponent$$inline_579$$ = $JSCompiler_alias_FALSE$$, $sawDigit$$inline_580$$ = $JSCompiler_alias_FALSE$$, $scale$$inline_581$$ = 1, $decimal$$inline_582$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$inline_583$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $exponentChar$$inline_584$$ = $goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$, $normalizedText$$inline_585$$ = "";$pos$$9$$[0] < 
    $ret$$4_text$$inline_576$$.length;$pos$$9$$[0]++) {
      var $ch$$inline_586$$ = $ret$$4_text$$inline_576$$.charAt($pos$$9$$[0]), $digit$$inline_587$$ = $JSCompiler_StaticMethods_getDigit_$$($ch$$inline_586$$);
      if(0 <= $digit$$inline_587$$ && 9 >= $digit$$inline_587$$) {
        $normalizedText$$inline_585$$ += $digit$$inline_587$$, $sawDigit$$inline_580$$ = $JSCompiler_alias_TRUE$$
      }else {
        if($ch$$inline_586$$ == $decimal$$inline_582$$.charAt(0)) {
          if($sawDecimal$$inline_578$$ || $sawExponent$$inline_579$$) {
            break
          }
          $normalizedText$$inline_585$$ += ".";
          $sawDecimal$$inline_578$$ = $JSCompiler_alias_TRUE$$
        }else {
          if($ch$$inline_586$$ == $grouping$$inline_583$$.charAt(0) && ("\u00a0" != $grouping$$inline_583$$.charAt(0) || $pos$$9$$[0] + 1 < $ret$$4_text$$inline_576$$.length && 0 <= $JSCompiler_StaticMethods_getDigit_$$($ret$$4_text$$inline_576$$.charAt($pos$$9$$[0] + 1)))) {
            if($sawDecimal$$inline_578$$ || $sawExponent$$inline_579$$) {
              break
            }
          }else {
            if($ch$$inline_586$$ == $exponentChar$$inline_584$$.charAt(0)) {
              if($sawExponent$$inline_579$$) {
                break
              }
              $normalizedText$$inline_585$$ += "E";
              $sawExponent$$inline_579$$ = $JSCompiler_alias_TRUE$$
            }else {
              if("+" == $ch$$inline_586$$ || "-" == $ch$$inline_586$$) {
                $normalizedText$$inline_585$$ += $ch$$inline_586$$
              }else {
                if($ch$$inline_586$$ == $goog$i18n$NumberFormatSymbols$$.$PERCENT$.charAt(0)) {
                  if(1 != $scale$$inline_581$$) {
                    break
                  }
                  $scale$$inline_581$$ = 100;
                  if($sawDigit$$inline_580$$) {
                    $pos$$9$$[0]++;
                    break
                  }
                }else {
                  if($ch$$inline_586$$ == $goog$i18n$NumberFormatSymbols$$.$PERMILL$.charAt(0)) {
                    if(1 != $scale$$inline_581$$) {
                      break
                    }
                    $scale$$inline_581$$ = 1E3;
                    if($sawDigit$$inline_580$$) {
                      $pos$$9$$[0]++;
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
    $ret$$4_text$$inline_576$$ = parseFloat($normalizedText$$inline_585$$) / $scale$$inline_581$$
  }
  if($gotPositive$$) {
    if($text$$10$$.indexOf(this.$positiveSuffix_$, $pos$$9$$[0]) != $pos$$9$$[0]) {
      return NaN
    }
    $pos$$9$$[0] += this.$positiveSuffix_$.length
  }else {
    if($gotNegative$$) {
      if($text$$10$$.indexOf(this.$negativeSuffix_$, $pos$$9$$[0]) != $pos$$9$$[0]) {
        return NaN
      }
      $pos$$9$$[0] += this.$negativeSuffix_$.length
    }
  }
  return $gotNegative$$ ? -$ret$$4_text$$inline_576$$ : $ret$$4_text$$inline_576$$
};
$goog$i18n$NumberFormat$$.prototype.$format$ = function $$goog$i18n$NumberFormat$$$$$format$$($number_number$$inline_590$$) {
  if(isNaN($number_number$$inline_590$$)) {
    return $goog$i18n$NumberFormatSymbols$$.$NAN$
  }
  var $parts$$3$$ = [], $isNegative$$ = 0 > $number_number$$inline_590$$ || 0 == $number_number$$inline_590$$ && 0 > 1 / $number_number$$inline_590$$;
  $parts$$3$$.push($isNegative$$ ? this.$negativePrefix_$ : this.$positivePrefix_$);
  if(isFinite($number_number$$inline_590$$)) {
    if($number_number$$inline_590$$ = $number_number$$inline_590$$ * ($isNegative$$ ? -1 : 1) * this.$multiplier_$, this.$useExponentialNotation_$) {
      if(0 == $number_number$$inline_590$$) {
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_590$$, this.$minimumIntegerDigits_$, $parts$$3$$), $JSCompiler_StaticMethods_addExponentPart_$$(this, 0, $parts$$3$$)
      }else {
        var $exponent$$inline_592$$ = Math.floor(Math.log($number_number$$inline_590$$) / Math.log(10));
        $number_number$$inline_590$$ /= Math.pow(10, $exponent$$inline_592$$);
        var $minIntDigits$$inline_593$$ = this.$minimumIntegerDigits_$;
        if(1 < this.$maximumIntegerDigits_$ && this.$maximumIntegerDigits_$ > this.$minimumIntegerDigits_$) {
          for(;0 != $exponent$$inline_592$$ % this.$maximumIntegerDigits_$;) {
            $number_number$$inline_590$$ *= 10, $exponent$$inline_592$$--
          }
          $minIntDigits$$inline_593$$ = 1
        }else {
          1 > this.$minimumIntegerDigits_$ ? ($exponent$$inline_592$$++, $number_number$$inline_590$$ /= 10) : ($exponent$$inline_592$$ -= this.$minimumIntegerDigits_$ - 1, $number_number$$inline_590$$ *= Math.pow(10, this.$minimumIntegerDigits_$ - 1))
        }
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_590$$, $minIntDigits$$inline_593$$, $parts$$3$$);
        $JSCompiler_StaticMethods_addExponentPart_$$(this, $exponent$$inline_592$$, $parts$$3$$)
      }
    }else {
      $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_590$$, this.$minimumIntegerDigits_$, $parts$$3$$)
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
function $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_parseAffix_$self$$, $pattern$$4$$, $pos$$11$$) {
  for(var $affix$$ = "", $inQuote$$ = $JSCompiler_alias_FALSE$$, $len$$3$$ = $pattern$$4$$.length;$pos$$11$$[0] < $len$$3$$;$pos$$11$$[0]++) {
    var $ch$$5_currencyCode$$inline_595$$ = $pattern$$4$$.charAt($pos$$11$$[0]);
    if("'" == $ch$$5_currencyCode$$inline_595$$) {
      $pos$$11$$[0] + 1 < $len$$3$$ && "'" == $pattern$$4$$.charAt($pos$$11$$[0] + 1) ? ($pos$$11$$[0]++, $affix$$ += "'") : $inQuote$$ = !$inQuote$$
    }else {
      if($inQuote$$) {
        $affix$$ += $ch$$5_currencyCode$$inline_595$$
      }else {
        switch($ch$$5_currencyCode$$inline_595$$) {
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
            if($pos$$11$$[0] + 1 < $len$$3$$ && "\u00a4" == $pattern$$4$$.charAt($pos$$11$$[0] + 1)) {
              $pos$$11$$[0]++, $affix$$ += $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$
            }else {
              switch($JSCompiler_StaticMethods_parseAffix_$self$$.$currencyStyle_$) {
                case $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$:
                  $affix$$ += $goog$i18n$currency$CurrencyInfo$$[$JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$][1];
                  break;
                case 2:
                  var $ch$$5_currencyCode$$inline_595$$ = $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$, $info$$inline_596$$ = $goog$i18n$currency$CurrencyInfo$$[$ch$$5_currencyCode$$inline_595$$], $affix$$ = $affix$$ + ($ch$$5_currencyCode$$inline_595$$ == $info$$inline_596$$[1] ? $ch$$5_currencyCode$$inline_595$$ : $ch$$5_currencyCode$$inline_595$$ + " " + $info$$inline_596$$[1]);
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
            $affix$$ += $ch$$5_currencyCode$$inline_595$$
        }
      }
    }
  }
  return $affix$$
}
;
// Input 100
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
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$159$$) {
  this.$element_$ = $element$$159$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_601$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_601$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$159$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$108$$) {
  var $cxlEl_orderId$$2$$ = $e$$108$$.target;
  if("A" == $cxlEl_orderId$$2$$.tagName || "I" == $cxlEl_orderId$$2$$.tagName) {
    $cxlEl_orderId$$2$$ = $cxlEl_orderId$$2$$.getAttribute("data-order-id"), $cxlEl_orderId$$2$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$($bitex$ui$OrderBook$EventType$CANCEL$$, $cxlEl_orderId$$2$$)), $e$$108$$.preventDefault(), $e$$108$$.stopPropagation())
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
// Input 101
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
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$114$$, $rowSet$$1$$) {
  return this.$app_$.$formatCurrency$($value$$114$$ / 1E8, $rowSet$$1$$.Symbol.substr(3))
};
$JSCompiler_prototypeAlias$$.$qtyFormatter_$ = function $$JSCompiler_prototypeAlias$$$$qtyFormatter_$$($value$$115$$, $rowSet$$2$$) {
  return this.$app_$.$formatCurrency$($value$$115$$ / 1E8, $rowSet$$2$$.Symbol.substr(0, 3))
};
$JSCompiler_prototypeAlias$$.$onAccountActivityTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onAccountActivityTableRequestData_$$($e$$109$$) {
  this.$app_$.$conn_$.$requestOrderList$(this.$request_order_id_$, $e$$109$$.options.Page, $e$$109$$.options.Limit, ["1", "2"])
};
$JSCompiler_prototypeAlias$$.$onOrderListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onOrderListResponse_$$($e$$110_msg$$20$$) {
  this.$account_activity_table_$ != $JSCompiler_alias_NULL$$ && ($e$$110_msg$$20$$ = $e$$110_msg$$20$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$account_activity_table_$, $e$$110_msg$$20$$.OrdListGrp, $e$$110_msg$$20$$.Columns))
};
// Input 102
// Input 103
// Input 104
// Input 105
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$(8);
// Input 106
// Input 107
// Input 108
function $soy$$0$0escapeHtml$$($value$$116$$) {
  return"object" === typeof $value$$116$$ && $value$$116$$ && 0 === $value$$116$$.$contentKind$ ? $value$$116$$.content : String($value$$116$$).replace($soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$, $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$)
}
var $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
function $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$($ch$$10$$) {
  return $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$[$ch$$10$$]
}
var $soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$ = /[\x00\x22\x26\x27\x3c\x3e]/g;
// Input 109
function $bitex$templates$BrokerConfirmDepositContent$$($opt_data$$5_output$$3$$) {
  return $opt_data$$5_output$$3$$ = "" + ('<form class="form-horizontal"><div class="control-group"><label class="control-label">Control number</label><div class="controls"><label class="control-label" style="text-align: left;">' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$controlNumber$) + '</label></div></div><div class="control-group"><label class="control-label">Amount paid</label><div class="controls"><div class="input-prepend"><span class="add-on">' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$currencySign$) + 
  '</span><input id="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.$id_value$) + '" type="text" class="input-small" size="16" name="PaidValue" value="' + $soy$$0$0escapeHtml$$($opt_data$$5_output$$3$$.value) + '"></div></div></div></form>')
}
function $bitex$templates$BrokerView$$($opt_data$$6$$) {
  var $output$$4$$;
  $output$$4$$ = "" + ('<div class="section-title"><h3>My broker</h3></div><div class="content"><address><strong>' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.BusinessName) + "</strong><br/>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Address) + "<br/>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.City) + ", " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.State) + " " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.ZipCode) + " - " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Country) + 
  '<br/><abbr title="Phone">P:</abbr>' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.PhoneNumber1) + " " + ($opt_data$$6$$.$msg_broker$.PhoneNumber2 ? ", $msg_broker['PhoneNumber2']" : "") + "<br/>Skype: " + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Skype) + '<br/><a href="mailto:' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Email) + '" target="_blank">' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.Email) + '</a></address><h4>Fees</h4><table class="table table-bordered"><thead><tr><th>Operation</th><th>Fee</th><th>Terms</th></tr></thead><tbody>');
  $output$$4$$ = $opt_data$$6$$.$msg_broker$.TransactionFeeBuy == $opt_data$$6$$.$msg_broker$.TransactionFeeSell ? $output$$4$$ + ("<tr><td>Trade fee</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeBuy) + "</td><td>Instantaneous</td></tr>") : $output$$4$$ + ("<tr><td>Trade fee - Buy side</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeBuy) + "</td><td>Instantaneous</td></tr><tr><td>Trade fee - Sell side</td><td>" + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TransactionFeeSell) + 
  "</td><td>Instantaneous</td></tr>");
  for(var $crypto_currenciesList137_feeList109$$ = $opt_data$$6$$.$msg_broker$.FeeStructure, $crypto_currenciesListLen137_feeListLen109$$ = $crypto_currenciesList137_feeList109$$.length, $crypto_currenciesIndex137_feeIndex109$$ = 0;$crypto_currenciesIndex137_feeIndex109$$ < $crypto_currenciesListLen137_feeListLen109$$;$crypto_currenciesIndex137_feeIndex109$$++) {
    var $crypto_currenciesData137_feeData109$$ = $crypto_currenciesList137_feeList109$$[$crypto_currenciesIndex137_feeIndex109$$];
    $output$$4$$ += "<tr><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData137_feeData109$$.Operation) + "</td><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData137_feeData109$$.Fee) + "</td><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData137_feeData109$$.Terms) + "</td></tr>"
  }
  $output$$4$$ += '</tbody></table><h4>Wallets</h4><table class="table table-bordered"><thead><tr><th>Coin</th><th>Type</th><th>Address</th><th>Multi signature</th><th>Managed by</th></tr></thead><tbody>';
  $crypto_currenciesList137_feeList109$$ = $opt_data$$6$$.$msg_broker$.CryptoCurrencies;
  $crypto_currenciesListLen137_feeListLen109$$ = $crypto_currenciesList137_feeList109$$.length;
  for($crypto_currenciesIndex137_feeIndex109$$ = 0;$crypto_currenciesIndex137_feeIndex109$$ < $crypto_currenciesListLen137_feeListLen109$$;$crypto_currenciesIndex137_feeIndex109$$++) {
    for(var $crypto_currenciesData137_feeData109$$ = $crypto_currenciesList137_feeList109$$[$crypto_currenciesIndex137_feeIndex109$$], $walletsList138$$ = $crypto_currenciesData137_feeData109$$.Wallets, $walletsListLen138$$ = $walletsList138$$.length, $walletsIndex138$$ = 0;$walletsIndex138$$ < $walletsListLen138$$;$walletsIndex138$$++) {
      var $walletsData138$$ = $walletsList138$$[$walletsIndex138$$];
      $output$$4$$ += "<tr><td>" + $soy$$0$0escapeHtml$$($crypto_currenciesData137_feeData109$$.CurrencyDescription) + "</td><td>" + $soy$$0$0escapeHtml$$($walletsData138$$.type) + "</td><td>" + ("BTC" == $crypto_currenciesData137_feeData109$$.CurrencyCode ? '<a href="https://blockchain.info/address/' + $soy$$0$0escapeHtml$$($walletsData138$$.address) + '/" target="_blank">' + $soy$$0$0escapeHtml$$($walletsData138$$.address) + "</a>" : $soy$$0$0escapeHtml$$($walletsData138$$.address)) + "</td><td>";
      $output$$4$$ = $walletsData138$$.multisig ? $output$$4$$ + "Yes" : $output$$4$$ + "No";
      $output$$4$$ += "</td><td>" + $soy$$0$0escapeHtml$$($walletsData138$$.managed_by) + "</td></tr>"
    }
  }
  return $output$$4$$ += '</tbody></table><h4>Terms of service</h4><iframe style="width:100%;height:400px;" src="' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg_broker$.TosUrl) + '"></iframe></div>'
}
function $bitex$templates$CancelDepositDialogContent$$() {
  var $output$$5$$;
  return $output$$5$$ = "" + ('<p>Enter a reason for cancelling the deposit</p><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="' + $soy$$0$0escapeHtml$$("id_select_reason") + '" >Reason:</label><div class="controls"><select id="' + $soy$$0$0escapeHtml$$("id_select_reason") + '"><option value=0 selected>Other</option></select></div></div><div class="control-group"><div class="controls"><textarea id="' + $soy$$0$0escapeHtml$$("id_custom_reason_text") + 
  '" rows="2" style=""></textarea></div></div></fieldset></form>')
}
function $bitex$templates$CancelWithdrawDialogContent$$() {
  var $output$$6$$;
  return $output$$6$$ = "" + ('<p>Enter a reason for cancelling the user withdraw</p><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="' + $soy$$0$0escapeHtml$$("id_select_reason") + '" >Reason:</label><div class="controls"><select id="' + $soy$$0$0escapeHtml$$("id_select_reason") + '"><option value=0>Other</option><option value=-1 selected>Insufficient funds</option><option value=-2>Account not verified</option><option value=-3>Suspicion of fraud</option><option value=-4>Withdrawing to a different account than yours</option><option value=-5>Invalid wallet</option><option value=-6>Invalid bank account</option><option value=-7>Amount exceeded your daily withdraw limit</option></select></div></div><div class="control-group"><div class="controls"><textarea id="' + 
  $soy$$0$0escapeHtml$$("id_custom_reason_text") + '" rows="2" style="display:none;"></textarea></div></div></fieldset></form>')
}
function $bitex$templates$GoogleAuthenticationCodeDialogContent$$() {
  var $output$$7$$;
  return $output$$7$$ = "" + ('Google Authenticator code: <input id="' + $soy$$0$0escapeHtml$$("id_second_factor") + '" placeholder="eg. 555555" size="10">')
}
function $bitex$templates$WithdrawConfirmationDialogContent$$() {
  var $output$$8$$;
  return $output$$8$$ = "" + ('<p>We just sent a confirmation code to your email.</p><input id="' + $soy$$0$0escapeHtml$$("id_withdraw_confirmation") + '" placeholder="Confirmation code" class="input-block-level"><p><i>This is security measure to improve your account security</i></p>')
}
function $bitex$templates$YourAccountSummary$$($currencyList254_opt_data$$11$$) {
  var $output$$9$$;
  $output$$9$$ = '<h6>Your account</h6><table class="data"><tbody>';
  $currencyList254_opt_data$$11$$ = $currencyList254_opt_data$$11$$.$currencies$;
  for(var $currencyListLen254$$ = $currencyList254_opt_data$$11$$.length, $currencyIndex254$$ = 0;$currencyIndex254$$ < $currencyListLen254$$;$currencyIndex254$$++) {
    $output$$9$$ += '<tr><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyList254_opt_data$$11$$[$currencyIndex254$$]) + '" data-blink-class="balance-info-blink"></span></td></tr>'
  }
  return $output$$9$$ + "</tbody></table>"
}
function $bitex$templates$AccountBalances$$($opt_data$$12$$) {
  for(var $output$$10$$ = '<table class="table table-striped" style="width: 350px"><tbody>', $currencyList262$$ = $opt_data$$12$$.$currencies$, $currencyListLen262$$ = $currencyList262$$.length, $currencyIndex262$$ = 0;$currencyIndex262$$ < $currencyListLen262$$;$currencyIndex262$$++) {
    var $currencyData262$$ = $currencyList262$$[$currencyIndex262$$], $MSG_UNNAMED_735$$ = "Available " + $soy$$0$0escapeHtml$$($currencyData262$$), $output$$10$$ = $output$$10$$ + ("<tr><td><strong>" + $MSG_UNNAMED_735$$ + '</strong></td><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyData262$$) + '" data-blink-class="balance-info-blink"></span></td>');
    "deposit" == $opt_data$$12$$.action && ($output$$10$$ += '<td><button class="btn btn-mini" data-action="deposit"  data-currency="' + $soy$$0$0escapeHtml$$($currencyData262$$) + '"><i data-action="deposit"  data-currency="' + $soy$$0$0escapeHtml$$($currencyData262$$) + '" class="icon-plus"/> Deposit</button></td>');
    "withdraw" == $opt_data$$12$$.action && ($output$$10$$ += '<td><button class="btn btn-mini" data-action="withdraw" data-currency="' + $soy$$0$0escapeHtml$$($currencyData262$$) + '"><i data-action="withdraw" data-currency="' + $soy$$0$0escapeHtml$$($currencyData262$$) + '" class="icon-minus"/> Withdraw</button></td>');
    $output$$10$$ += "</tr>"
  }
  return $output$$10$$ + "</tbody></table>"
}
function $bitex$templates$WaitingForDepositResponseDialogContent$$() {
  return'<div class="row-fluid" data-deposit-status="processing"><h5 class="text-center">Processing deposit request...</h5></div><div class="row-fluid"><div class="span6 offset3"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>'
}
function $bitex$templates$DepositCryptoCurrencyContentDialog$$($opt_data$$14_output$$12$$) {
  return $opt_data$$14_output$$12$$ = "" + ('<div class="row-fluid" data-deposit-status="prepare"><h4 class="text-center">' + $soy$$0$0escapeHtml$$($opt_data$$14_output$$12$$.$deposit_message$.Data.InputAddress) + '</h4><div class="text-center"><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=' + $soy$$0$0escapeHtml$$($opt_data$$14_output$$12$$.$deposit_message$.Data.InputAddress) + '"/></div><p class="text-center"> Powered by <a href="https://blockchain.info/api/api_receive/" target="_blank">https://blockchain.info/api/api_receive</a></p></div>')
}
function $bitex$templates$ConfirmDepositCryptoCurrencyContentDialog$$($MSG_UNNAMED_747_opt_data$$15$$) {
  var $output$$13$$ = "";
  $MSG_UNNAMED_747_opt_data$$15$$ = " We will generate a unique " + ($soy$$0$0escapeHtml$$($MSG_UNNAMED_747_opt_data$$15$$.$currency_description$) + " address that will be valid only for this transaction.");
  return $output$$13$$ + ('<div class="row-fluid" data-deposit-status="confirm"><h3 class="text-center"> IMPORTANT! </h3><h4 class="text-center">' + $MSG_UNNAMED_747_opt_data$$15$$ + '</h4><h3 class="text-center"> Did you understand? </h3><br/><br/></div>')
}
function $bitex$templates$DepositSlipContentDialog$$($opt_data$$16_output$$14$$) {
  return $opt_data$$16_output$$14$$ = "" + ('<div class="row-fluid" data-deposit-status="done"><h5 class="text-center">done</h5></div><div class="row-fluid"><div class="span6 offset3"><a  target="_blank" href="/get_deposit?deposit_id=' + $soy$$0$0escapeHtml$$($opt_data$$16_output$$14$$.$deposit_id$) + '" class="btn btn-primary">Print</a>  or  <a href="/get_deposit?download=1&deposit_id=' + $soy$$0$0escapeHtml$$($opt_data$$16_output$$14$$.$deposit_id$) + '">Download</a></div></div>')
}
function $bitex$templates$DepositWithdrawDialogContent$$($opt_data$$17$$) {
  var $output$$15$$ = '<form class="form-horizontal" data-deposit-status="prepare"><input type="hidden" name="Currency" value="' + $soy$$0$0escapeHtml$$($opt_data$$17$$.$currency$) + '"><div class="control-group"><label class="control-label">Amount</label><div class="controls"><div class="input-prepend"><span class="add-on">' + $soy$$0$0escapeHtml$$($opt_data$$17$$.$currency_sign$) + '</span><input type="text" class="input-small" size="16" name="Amount"></div></div></div>';
  if(1 < $opt_data$$17$$.$methods$.length) {
    for(var $output$$15$$ = $output$$15$$ + '<div class="control-group"><label class="control-label">Method</label><div class="controls"><select name="Method" class="withdraw-method-selector">', $methodList346_methodList359_methodList365$$ = $opt_data$$17$$.$methods$, $methodListLen346_methodListLen359_methodListLen365$$ = $methodList346_methodList359_methodList365$$.length, $methodIndex346_methodIndex359_methodIndex365$$ = 0;$methodIndex346_methodIndex359_methodIndex365$$ < $methodListLen346_methodListLen359_methodListLen365$$;$methodIndex346_methodIndex359_methodIndex365$$++) {
      var $fieldList375_methodData346_methodData365$$ = $methodList346_methodList359_methodList365$$[$methodIndex346_methodIndex359_methodIndex365$$], $output$$15$$ = $output$$15$$ + ("<option " + (0 == $methodIndex346_methodIndex359_methodIndex365$$ ? "selected" : "") + ' value="' + $soy$$0$0escapeHtml$$($fieldList375_methodData346_methodData365$$.method) + '" >' + $soy$$0$0escapeHtml$$($fieldList375_methodData346_methodData365$$.description) + "</option>")
    }
    $output$$15$$ += "</select></div></div>"
  }else {
    $methodList346_methodList359_methodList365$$ = $opt_data$$17$$.$methods$;
    $methodListLen346_methodListLen359_methodListLen365$$ = $methodList346_methodList359_methodList365$$.length;
    for($methodIndex346_methodIndex359_methodIndex365$$ = 0;$methodIndex346_methodIndex359_methodIndex365$$ < $methodListLen346_methodListLen359_methodListLen365$$;$methodIndex346_methodIndex359_methodIndex365$$++) {
      $output$$15$$ += '<input type="hidden" name="Method" value="' + $soy$$0$0escapeHtml$$($methodList346_methodList359_methodList365$$[$methodIndex346_methodIndex359_methodIndex365$$].method) + '">'
    }
  }
  $output$$15$$ += '<div class="withdraw-methods">';
  $methodList346_methodList359_methodList365$$ = $opt_data$$17$$.$methods$;
  $methodListLen346_methodListLen359_methodListLen365$$ = $methodList346_methodList359_methodList365$$.length;
  for($methodIndex346_methodIndex359_methodIndex365$$ = 0;$methodIndex346_methodIndex359_methodIndex365$$ < $methodListLen346_methodListLen359_methodListLen365$$;$methodIndex346_methodIndex359_methodIndex365$$++) {
    for(var $fieldList375_methodData346_methodData365$$ = $methodList346_methodList359_methodList365$$[$methodIndex346_methodIndex359_methodIndex365$$], $output$$15$$ = $output$$15$$ + ('<div class="withdraw-method" data-withdraw-method="' + $soy$$0$0escapeHtml$$($fieldList375_methodData346_methodData365$$.method) + '" style="' + (0 != $methodIndex346_methodIndex359_methodIndex365$$ ? "display:none;" : "") + '" ><div class="control-group" style="margin-bottom: 5px;"><div class="controls"><label>' + 
    $soy$$0$0escapeHtml$$($fieldList375_methodData346_methodData365$$.disclaimer) + "</label></div></div>"), $fieldList375_methodData346_methodData365$$ = $fieldList375_methodData346_methodData365$$.fields, $fieldListLen375$$ = $fieldList375_methodData346_methodData365$$.length, $fieldIndex375$$ = 0;$fieldIndex375$$ < $fieldListLen375$$;$fieldIndex375$$++) {
      var $fieldData375$$ = $fieldList375_methodData346_methodData365$$[$fieldIndex375$$], $output$$15$$ = $output$$15$$ + ($fieldData375$$.side == $opt_data$$17$$.$side$ ? '<div class="control-group"><label class="control-label">' + $soy$$0$0escapeHtml$$($fieldData375$$.label) + '</label><div class="controls"><input class="withdraw-field" type="' + $soy$$0$0escapeHtml$$($fieldData375$$.type) + '" name="' + $soy$$0$0escapeHtml$$($fieldData375$$.name) + '" placeholder="' + $soy$$0$0escapeHtml$$($fieldData375$$.placeholder) + 
      '" value="' + $soy$$0$0escapeHtml$$($fieldData375$$.value) + '" ' + (0 != $methodIndex346_methodIndex359_methodIndex365$$ ? "disabled" : "") + " /></div></div>" : "")
    }
    $output$$15$$ += "</div>"
  }
  return $output$$15$$ + '</div><div class="control-group dlg-response-group"><label class="control-label dlg-response-group-label"></label><div class="controls" class="dlg-response-group-value" ></div></div></form>'
}
function $bitex$templates$YourAccountBalances$$($currencyList399_opt_data$$18$$) {
  var $output$$16$$ = '<table class="table table-striped" style="width: 350px"><tbody>';
  $currencyList399_opt_data$$18$$ = $currencyList399_opt_data$$18$$.$currencies$;
  for(var $currencyListLen399$$ = $currencyList399_opt_data$$18$$.length, $currencyIndex399$$ = 0;$currencyIndex399$$ < $currencyListLen399$$;$currencyIndex399$$++) {
    var $currencyData399$$ = $currencyList399_opt_data$$18$$[$currencyIndex399$$], $MSG_UNNAMED_757$$ = "Available " + $soy$$0$0escapeHtml$$($currencyData399$$.code), $output$$16$$ = $output$$16$$ + ("<tr><td><strong>" + $MSG_UNNAMED_757$$ + '</strong></td><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyData399$$.$model_key$) + '" data-blink-class="balance-info-blink">' + ($currencyData399$$.$balance$ ? $soy$$0$0escapeHtml$$($currencyData399$$.$balance$) : 
    "-") + "</span></td></tr>")
  }
  return $output$$16$$ + "</tbody></table>"
}
function $bitex$templates$AccountOverviewHeader$$($opt_data$$19_output$$17$$) {
  return $opt_data$$19_output$$17$$ = "" + ('<h4>Details</h4><table class="table table-striped" style="width: 350px"><tbody><tr><td><strong>ID</strong></td><td>' + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.ID) + "</td></tr><tr><td><strong>Username</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.Username) + "</td></tr><tr><td><strong>Email</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.Email) + 
  "</td></tr><tr><td><strong>State</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.State) + "</td></tr><tr><td><strong>Country</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.CountryCode) + "</td></tr><tr><td><strong>Last login</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.LastLogin) + "</td></tr><tr><td><strong>Is verified</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.Verified) + 
  "</td></tr><tr><td><strong>Has two step authentication</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.TwoFactorEnabled) + "</td></tr><tr><td><strong>Registration date</strong></td><td>" + $soy$$0$0escapeHtml$$($opt_data$$19_output$$17$$.$msg_customer_detail$.Created) + "</td></tr></tbody></table>")
}
function $bitex$templates$OrderBook$$($columnList472_opt_data$$20$$) {
  var $output$$18$$ = '<div class="text-center"><h4>' + $soy$$0$0escapeHtml$$($columnList472_opt_data$$20$$.title) + '</h4></div><table id="' + $soy$$0$0escapeHtml$$($columnList472_opt_data$$20$$.id) + '"  class="table"><thead><tr>';
  $columnList472_opt_data$$20$$ = $columnList472_opt_data$$20$$.$columns$;
  for(var $columnListLen472$$ = $columnList472_opt_data$$20$$.length, $columnIndex472$$ = 0;$columnIndex472$$ < $columnListLen472$$;$columnIndex472$$++) {
    $output$$18$$ += "<th>" + $soy$$0$0escapeHtml$$($columnList472_opt_data$$20$$[$columnIndex472$$]) + "</th>"
  }
  return $output$$18$$ + "</tr></thead><tbody></tbody></table>"
}
function $bitex$templates$OrderEntry$$($opt_data$$21$$) {
  var $output$$19$$;
  $output$$19$$ = "" + ('<div id="' + $soy$$0$0escapeHtml$$($opt_data$$21$$.id) + '" class="well span6 order-entry"><input type="hidden" name="symbol" class="order-entry-symbol" value="' + $soy$$0$0escapeHtml$$($opt_data$$21$$.$symbol$) + '"><input type="hidden" name="side" class="order-entry-side" value="' + $soy$$0$0escapeHtml$$($opt_data$$21$$.$side$) + '"><input type="hidden" name="type" class="order-entry-type" value="' + $soy$$0$0escapeHtml$$($opt_data$$21$$.type) + '"><div class="row-fluid"><div class="span5 order-entry-label"> <span>Amount:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-amount" type="text" value="" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"> <span>Price per <span class="order-entry-amount-sign">\u0e3f</span>:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-price" type="text" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"><span>Total:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-total" type="text" required/></div></div></div><div class="row-fluid" ' + 
  ($opt_data$$21$$.$hide_fee$ ? 'style="display: none;"' : "") + ' ><div class="span5 order-entry-label"> <span>Fee (optional):</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-fee" type="text" value="0" /></div></div></div><div class="row-fluid"><div class="span5"><input class="input-block-level order-entry-client-id" placeholder="Client ID" ' + ($opt_data$$21$$.$hide_client_id$ ? 
  'style="display:none"' : "") + ' /></div><div class="span5"><button class="btn ' + (1 == $opt_data$$21$$.$side$ ? "btn-success" : "btn-danger") + ' btn-execution order-entry-action">');
  $output$$19$$ = 1 == $opt_data$$21$$.$side$ ? $output$$19$$ + "BUY" : $output$$19$$ + "SELL";
  return $output$$19$$ + "</button></div></div></div>"
}
function $bitex$templates$DataGrid$$($opt_data$$22$$) {
  return"<div " + ($opt_data$$22$$.id ? 'id="' + $soy$$0$0escapeHtml$$($opt_data$$22$$.id) + '"' : "") + '  class="fuelux ' + ($opt_data$$22$$.$base_class$ ? $soy$$0$0escapeHtml$$($opt_data$$22$$.$base_class$) : "") + '" style="width:100%;"><table class="table table-bordered datagrid datagrid-stretch-header"><thead><tr><th colspan="4" ' + (!$opt_data$$22$$.title && !$opt_data$$22$$.$show_search$ ? 'style="display: none;"' : "") + '><span class="datagrid-header-title"  ' + (!$opt_data$$22$$.title ? 
  'style="display: none;"' : "") + " ><strong>" + $soy$$0$0escapeHtml$$($opt_data$$22$$.title) + '</strong></span><div class="datagrid-header-left" ' + (!$opt_data$$22$$.$show_search$ ? 'style="display: none;"' : "") + '><div class="input-append search datagrid-search"><input type="text" class="input-medium" placeholder="' + $soy$$0$0escapeHtml$$($opt_data$$22$$.$search_placeholder$) + '"><button type="button" class="btn"><i class="icon-search"></i></button></div></div><div class="datagrid-header-right"></div></th></tr></thead></table><div class="datagrid-stretch-wrapper" style="height:' + 
  ($opt_data$$22$$.$wrapper_height$ ? $soy$$0$0escapeHtml$$($opt_data$$22$$.$wrapper_height$) : "360") + 'px;"><table class="table table-bordered datagrid"><tbody></tbody></table></div><table class="table table-bordered datagrid datagrid-stretch-footer"><tfoot><tr><th colspan="4"><div class="datagrid-footer-left" style="visibility: visible;"><div class="grid-controls"><span><span class="grid-start"></span> -<span class="grid-end"></span></span></div></div><div class="datagrid-footer-right" style="visibility: visible;"><div class="grid-pager"><button type="button" class="btn grid-prevpage"><i class="icon-chevron-left"></i></button><button type="button" class="btn grid-nextpage"><i class="icon-chevron-right"></i></button></div></div></th></tr></tfoot></table></div>'
}
;
// Input 110
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
$JSCompiler_prototypeAlias$$.$onUserDetailsClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserDetailsClick_$$($data$$34_e$$111$$) {
  $data$$34_e$$111$$ = $data$$34_e$$111$$.target.$selected_customer_$;
  this.$app_$.$model_$.set("SelectedCustomer", $data$$34_e$$111$$);
  this.$app_$.$setView$("account_overview/" + $data$$34_e$$111$$.Username + "/")
};
$JSCompiler_prototypeAlias$$.$onCustomerListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListTableRequestData_$$($e$$112$$) {
  this.$app_$.$conn_$.$requestCustomerList$(this.$request_id_$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $e$$112$$.options.Filter, $e$$112$$.options.Page, $e$$112$$.options.Limit, [0, 1])
};
$JSCompiler_prototypeAlias$$.$onCustomerListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListReponse_$$($e$$113_msg$$21$$) {
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($e$$113_msg$$21$$ = $e$$113_msg$$21$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$customers_table_$, $e$$113_msg$$21$$.CustomerListGrp, $e$$113_msg$$21$$.Columns))
};
// Input 111
function $bitex$ui$DepositList$$($crypto_currencies_def$$, $grid_columns$$4_opt_broker_mode$$1$$, $opt_domHelper$$24$$) {
  var $broker_mode$$1$$ = $JSCompiler_alias_FALSE$$;
  $grid_columns$$4_opt_broker_mode$$1$$ === $JSCompiler_alias_TRUE$$ && ($broker_mode$$1$$ = $JSCompiler_alias_TRUE$$);
  $grid_columns$$4_opt_broker_mode$$1$$ = [{property:"Created", label:"Date/Hour", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-created"
  }}, {property:"Status", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$43$$, $rowSet$$3$$) {
    var $progress_message$$ = "In progress...", $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $JSCompiler_alias_NULL$$;
    if("CRY" == $rowSet$$3$$.Type && ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $goog$array$find$$($crypto_currencies_def$$, function($c$$2$$) {
      if($c$$2$$.CurrencyCode == $rowSet$$3$$.Currency) {
        return $JSCompiler_alias_TRUE$$
      }
    }), console.log($goog$debug$deepExpose$$($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$)), $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ != $JSCompiler_alias_NULL$$)) {
      if($rowSet$$3$$.PaidValue != $JSCompiler_alias_NULL$$ && 0 < $rowSet$$3$$.PaidValue) {
        var $confirmation_info_array_number_of_confirmations$$ = $goog$array$find$$($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$.Confirmations, function($conf_info$$) {
          if($rowSet$$3$$.PaidValue >= $conf_info$$[0] && $rowSet$$3$$.PaidValue < $conf_info$$[1]) {
            return $JSCompiler_alias_TRUE$$
          }
        })
      }
      $confirmation_info_array_number_of_confirmations$$ != $JSCompiler_alias_NULL$$ && ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = $confirmation_info_array_number_of_confirmations$$[2], $confirmation_info_array_number_of_confirmations$$ = 0, $goog$isDef$$($rowSet$$3$$.Data) && $goog$isDef$$($rowSet$$3$$.Data.Confirmations) && ($confirmation_info_array_number_of_confirmations$$ = $rowSet$$3$$.Data.Confirmations), $progress_message$$ = $confirmation_info_array_number_of_confirmations$$ + 
      (" of " + ($crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ + " confirmations")))
    }
    $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$ = function($s$$44$$) {
      switch($s$$44$$) {
        case "0":
          return["", "Unconfirmed"];
        case "1":
          return["warning", "Pending"];
        case "2":
          return["info", $progress_message$$];
        case "4":
          return["success", "Completed"];
        case "8":
          return["important", "Cancelled"]
      }
      return["", ""]
    }($s$$43$$);
    return $goog$dom$createDom$$("span", ["label", "label-" + $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$[0]], $crypto_currency_def_label_class_text$$1_number_of_necessary_confirmations$$[1])
  }, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-status"
  }}, {property:"Value", label:"Value", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$DepositList$CSS_CLASS$$ + "-value"
  }}, {property:"ControlNumber", label:"Control Number", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$144$$, $rowSet$$4$$) {
    switch($rowSet$$4$$.Type) {
      case "CRY":
        var $top_el$$ = $goog$dom$createDom$$("div");
        $goog$style$setStyle$$($top_el$$, "position", "relative");
        $goog$style$setWidth$$($top_el$$, 120);
        var $inner_el$$ = $goog$dom$createDom$$("div", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("span", $JSCompiler_alias_VOID$$, $rowSet$$4$$.Data.InputAddress));
        "BTC" == $rowSet$$4$$.Currency && ($inner_el$$ = $goog$dom$createDom$$("div", $JSCompiler_alias_VOID$$, $goog$dom$createDom$$("a", {href:"https://blockchain.info/address/" + $rowSet$$4$$.Data.InputAddress, target:"blank_"}, $rowSet$$4$$.Data.InputAddress)));
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
  }}, {property:"Data", label:"Details", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$145$$, $rowSet$$5$$) {
    var $btn_qr_data_row$$3$$ = $goog$json$serialize$$($rowSet$$5$$), $btn_view$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-view", href:"/get_deposit?deposit_id=" + $rowSet$$5$$.DepositID, target:"_blank"}, "view", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-eye-open"])), $btn_qr_data_row$$3$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-view-qr", href:"#", "data-action":"SHOW_QR", "data-row":$btn_qr_data_row$$3$$}, "qr", " ", $goog$dom$createDom$$("i", 
    ["icon-white", "icon-qrcode"]));
    switch($rowSet$$5$$.Type) {
      case "CRY":
        switch($rowSet$$5$$.Status) {
          case "0":
          ;
          case "1":
            return $goog$dom$createDom$$("div", "btn-group", [$btn_qr_data_row$$3$$]);
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
        switch($rowSet$$5$$.Status) {
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
  $broker_mode$$1$$ ? $grid_columns$$4_opt_broker_mode$$1$$.push({property:"DepositID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$146$$, $rowSet$$6$$) {
    var $btn_complete$$1_data_row$$4$$ = $goog$json$serialize$$($rowSet$$6$$), $btn_cancel$$1$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-danger btn-deposit-view-qr", href:"#", "data-action":"CANCEL", "data-row":$btn_complete$$1_data_row$$4$$}, "cancel", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-remove"])), $btn_progress$$1$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-info btn-deposit-progress", href:"#", "data-action":"PROGRESS", "data-row":$btn_complete$$1_data_row$$4$$}, 
    "Set in progress", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-refresh"])), $btn_complete$$1_data_row$$4$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-success btn-deposit-complete", href:"#", "data-action":"COMPLETE", "data-row":$btn_complete$$1_data_row$$4$$}, "Set as complete", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-ok"]));
    switch($rowSet$$6$$.Type) {
      case "CRY":
        switch($rowSet$$6$$.Status) {
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
        switch($rowSet$$6$$.Status) {
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
  }}) : $grid_columns$$4_opt_broker_mode$$1$$.push({property:"DepositID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, formatter:function($value$$147$$, $rowSet$$7$$) {
    var $btn_upload_data_row$$5$$ = $goog$json$serialize$$($rowSet$$7$$), $btn_upload_data_row$$5$$ = $goog$dom$createDom$$("a", {"class":"btn btn-mini btn-success btn-deposit-upload", "data-action":"UPLOAD", "data-row":$btn_upload_data_row$$5$$}, "send receipt", " ", $goog$dom$createDom$$("i", ["icon-white", "icon-file"]));
    switch($rowSet$$7$$.Type) {
      case "CRY":
        switch($rowSet$$7$$.Status) {
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
        switch($rowSet$$7$$.Status) {
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
  $bitex$ui$DataGrid$$.call(this, {rowIDFn:this.$getRowId$, rowClassFn:this.$getRowClass$, columns:$grid_columns$$4_opt_broker_mode$$1$$}, $opt_domHelper$$24$$)
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
$JSCompiler_prototypeAlias$$.$handleClick_$ = function $$JSCompiler_prototypeAlias$$$$handleClick_$$($e$$114$$) {
  this.$selected_deposit_$ = $goog$json$parse$$($e$$114$$.target.getAttribute("data-row"));
  this.$selected_deposit_$ != $JSCompiler_alias_NULL$$ && ($goog$array$contains$$($goog$dom$classes$get$$($e$$114$$.target), "btn-deposit-complete") ? this.dispatchEvent("deposit_complete") : $goog$array$contains$$($goog$dom$classes$get$$($e$$114$$.target), "btn-deposit-progress") ? this.dispatchEvent("deposit_progress") : $goog$array$contains$$($goog$dom$classes$get$$($e$$114$$.target), "btn-deposit-cancel") && this.dispatchEvent("deposit_cancel"), this.$selected_deposit_$ = $JSCompiler_alias_NULL$$)
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
// Input 112
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
  $JSCompiler_StaticMethods_listen$$($handler$$65$$, this.$getElement$(), "click", function($e$$116$$) {
    "deposit" === $e$$116$$.target.getAttribute("data-action") && (this.$currency_$ = $e$$116$$.target.getAttribute("data-currency"), this.dispatchEvent("request_deposit"))
  }, this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$66$$ = this.$getHandler$(), $model$$6$$ = this.$app_$.$model_$;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$, this.$onDepositListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $model$$6$$.get("UserID"), 
  this.$onDepositRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$66$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$), this.$deposit_list_table_$.$dispose$());
  this.$request_id_$ = this.$deposit_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$67$$ = this.$getHandler$(), $model$$7$$ = this.$app_$.$model_$;
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$57$$ = $goog$dom$getElement$$("id_deposit_list_table"), $broker$$3$$ = $model$$7$$.get("Broker");
  this.$deposit_list_table_$ = new $bitex$ui$DepositList$$($broker$$3$$.CryptoCurrencies);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $model$$7$$.get("UserID"), this.$onDepositRefresh_$);
  this.$deposit_list_table_$.$decorate$($el$$57$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$deposit_list_table_$, "Value", this.$valuePriceFormatter_$, this);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$)
};
$JSCompiler_prototypeAlias$$.$onDepositListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableClick_$$($e$$117$$) {
  var $element$$162$$ = $e$$117$$.target;
  "I" === $element$$162$$.tagName && ($element$$162$$ = $goog$dom$getParentElement$$($element$$162$$));
  var $data_action$$ = $element$$162$$.getAttribute("data-action");
  if($data_action$$ != $JSCompiler_alias_NULL$$) {
    switch($e$$117$$.preventDefault(), $e$$117$$.stopPropagation(), this.$action_$ = $data_action$$, this.$data_$ = $goog$json$parse$$($element$$162$$.getAttribute("data-row")), $data_action$$) {
      case "SHOW_QR":
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
$JSCompiler_prototypeAlias$$.$valuePriceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$valuePriceFormatter_$$($value$$148$$, $rowSet$$8$$) {
  var $formatted_paid_value_paid_value$$ = $rowSet$$8$$.PaidValue, $priceCurrency$$2$$ = $rowSet$$8$$.Currency, $currency_description$$ = this.$app_$.$currency_info_$[$priceCurrency$$2$$].description, $formatted_value$$ = this.$app_$.$formatCurrency$($value$$148$$ / 1E8, $priceCurrency$$2$$);
  return 0 === $value$$148$$ ? 0 === $formatted_paid_value_paid_value$$ ? "-" : $goog$dom$createDom$$("abbr", {title:$currency_description$$}, this.$app_$.$formatCurrency$($formatted_paid_value_paid_value$$ / 1E8, $priceCurrency$$2$$)) : 0 < $formatted_paid_value_paid_value$$ && $formatted_paid_value_paid_value$$ != $value$$148$$ ? ($formatted_paid_value_paid_value$$ = this.$app_$.$formatCurrency$($formatted_paid_value_paid_value$$ / 1E8, $priceCurrency$$2$$), $goog$dom$createDom$$("abbr", {title:"declared / paid in " + 
  $currency_description$$}, $formatted_value$$ + " / " + $formatted_paid_value_paid_value$$)) : $goog$dom$createDom$$("abbr", {title:$currency_description$$}, $formatted_value$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableRequestData_$$($e$$118$$) {
  this.$app_$.$conn_$.$requestDepositList$(this.$request_id_$, $e$$118$$.options.Page, $e$$118$$.options.Limit, ["0", "1", "2", "4", "8"], $JSCompiler_alias_VOID$$, $e$$118$$.options.Filter)
};
$JSCompiler_prototypeAlias$$.$onDepositRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onDepositRefresh_$$($e$$119_msg$$22$$) {
  $e$$119_msg$$22$$ = $e$$119_msg$$22$$.data;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$deposit_list_table_$, $e$$119_msg$$22$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListReponse_$$($e$$120_msg$$23$$) {
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$120_msg$$23$$ = $e$$120_msg$$23$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$deposit_list_table_$, $e$$120_msg$$23$$.DepositListGrp, $e$$120_msg$$23$$.Columns))
};
// Input 113
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
// Input 114
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
var $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ = "deposit_refresh", $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ = "deposit_list", $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ = "withdraw_list_response", $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ = "order_list_response", $bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ = "customer_list", $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ = "ob_clear", $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ = "ob_delete_orders_thru", 
$bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ = "ob_delete_order", $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ = "ob_new_order", $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ = "ob_update_order";
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$31$$, $opt_protocol$$2$$) {
  this.$url_$ = $url$$31$$;
  var $handler$$68$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$ws_$, $goog$net$WebSocket$EventType$CLOSED$$, this.$onClose_$);
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$ws_$, $goog$net$WebSocket$EventType$MESSAGE$$, this.$onMessage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$ws_$, $goog$net$WebSocket$EventType$ERROR$$, this.$onError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$68$$, this.$ws_$, $goog$net$WebSocket$EventType$OPENED$$, this.$onOpen_$);
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
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($msg$$24$$) {
  this.$currency_info_$ = {};
  this.$all_markets_$ = {};
  $goog$array$forEach$$($msg$$24$$.Currencies, function($currency$$) {
    this.$currency_info_$[$currency$$.Code] = {code:$currency$$.Code, $format$:$currency$$.FormatJS, description:$currency$$.Description, $sign$:$currency$$.Sign, $pip$:$currency$$.Pip, $is_crypto$:$currency$$.IsCrypto}
  }, this);
  var $symbols$$ = [];
  $goog$array$forEach$$($msg$$24$$.Instruments, function($instrument$$) {
    var $symbol$$4$$ = $instrument$$.Symbol;
    this.$all_markets_$[$symbol$$4$$] = {$symbol$:$symbol$$4$$, description:$instrument$$.Description};
    $symbols$$.push($symbol$$4$$)
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
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$123_entry$$) {
  var $msg$$25$$ = JSON.parse($e$$123_entry$$.message);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$123_entry$$.message));
  switch($msg$$25$$.MsgType) {
    case "ERROR":
      $msg$$25$$.ReqID != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message." + $msg$$25$$.ReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", $msg$$25$$));
      break;
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $msg$$25$$));
      break;
    case "B":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("news", $msg$$25$$));
      break;
    case "BF":
      1 == $msg$$25$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $msg$$25$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $msg$$25$$)));
      break;
    case "y":
      this.$onSecurityList_$($msg$$25$$);
      this.dispatchEvent(new $bitex$api$BitExEvent$$("security_list", $msg$$25$$));
      break;
    case "U13":
      1 == $msg$$25$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $msg$$25$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $msg$$25$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_response." + $msg$$25$$.DepositReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_response", $msg$$25$$));
      break;
    case "U23":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $msg$$25$$.UserID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $msg$$25$$.BrokerID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$, $msg$$25$$));
      break;
    case "U7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response." + $msg$$25$$.WithdrawReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response", $msg$$25$$));
      break;
    case "U9":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh." + $msg$$25$$.UserID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh." + $msg$$25$$.BrokerID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_refresh", $msg$$25$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $msg$$25$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ + "." + $msg$$25$$.OrdersReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, $msg$$25$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $msg$$25$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("deposit_methods_response", $msg$$25$$));
      break;
    case "U27":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + $msg$$25$$.WithdrawListReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$, $msg$$25$$));
      break;
    case "U29":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("broker_list", $msg$$25$$));
      break;
    case "U31":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + $msg$$25$$.DepositListReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$, $msg$$25$$));
      break;
    case "B1":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_deposit." + $msg$$25$$.ProcessDepositReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_deposit", $msg$$25$$));
      break;
    case "B3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ + "." + $msg$$25$$.CustomerListReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$, $msg$$25$$));
      break;
    case "B5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_detail", $msg$$25$$));
      break;
    case "B7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_withdraw." + $msg$$25$$.ProcessWithdrawReqID, $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("process_withdraw", $msg$$25$$));
      break;
    case "W":
      if(1 != $msg$$25$$.MarketDepth) {
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$));
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $msg$$25$$.MDReqID));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear"));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear." + $msg$$25$$.MDReqID));
        for(var $x$$76$$ in $msg$$25$$.MDFullGrp) {
          switch($e$$123_entry$$ = $msg$$25$$.MDFullGrp[$x$$76$$], $e$$123_entry$$.MDReqID = $msg$$25$$.MDReqID, $e$$123_entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              $e$$123_entry$$.Symbol = $msg$$25$$.Symbol;
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $e$$123_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $msg$$25$$.MDReqID, $e$$123_entry$$));
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $e$$123_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade." + $msg$$25$$.MDReqID, $e$$123_entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $e$$123_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status." + $msg$$25$$.MDReqID, $e$$123_entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh." + $msg$$25$$.MDReqID, $msg$$25$$));
      break;
    case "X":
      if("3" == $msg$$25$$.MDBkTyp) {
        for($x$$76$$ in $msg$$25$$.MDIncGrp) {
          switch($e$$123_entry$$ = $msg$$25$$.MDIncGrp[$x$$76$$], $e$$123_entry$$.MDReqID = $msg$$25$$.MDReqID, $e$$123_entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              switch($e$$123_entry$$.MDUpdateAction) {
                case "0":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $e$$123_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $msg$$25$$.MDReqID, $e$$123_entry$$));
                  break;
                case "1":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$, $e$$123_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $msg$$25$$.MDReqID, $e$$123_entry$$));
                  break;
                case "2":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$, $e$$123_entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + "." + $msg$$25$$.MDReqID, $e$$123_entry$$));
                  break;
                case "3":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$, $e$$123_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $msg$$25$$.MDReqID, $e$$123_entry$$))
              }
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $e$$123_entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade." + $msg$$25$$.MDReqID, $e$$123_entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $e$$123_entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status." + $msg$$25$$.MDReqID, $e$$123_entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh." + $msg$$25$$.MDReqID, $msg$$25$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $msg$$25$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject." + $msg$$25$$.MDReqID, $msg$$25$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $msg$$25$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$;
  this.$ws_$.close();
  this.$ws_$.$dispose$();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($msg$$26_username$$5$$, $password$$2$$, $opt_second_factor$$) {
  $msg$$26_username$$5$$ = {MsgType:"BE", UserReqID:"1", Username:$msg$$26_username$$5$$, Password:$password$$2$$, UserReqTyp:"1"};
  $opt_second_factor$$ != $JSCompiler_alias_NULL$$ && ($msg$$26_username$$5$$.SecondFactor = $opt_second_factor$$);
  this.sendMessage($msg$$26_username$$5$$)
};
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$16_msg$$27$$, $opt_secret$$, $opt_code$$, $opt_clientID$$) {
  $enable$$16_msg$$27$$ = {MsgType:"U16", Enable:$enable$$16_msg$$27$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_secret$$) && ($enable$$16_msg$$27$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_code$$) && ($enable$$16_msg$$27$$.Code = $opt_code$$);
  $opt_clientID$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$) && ($enable$$16_msg$$27$$.ClientID = $opt_clientID$$);
  this.sendMessage($enable$$16_msg$$27$$)
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$1$$) {
  this.sendMessage({MsgType:"U10", Email:$email$$1$$})
};
$JSCompiler_prototypeAlias$$.$requestBalances$ = function $$JSCompiler_prototypeAlias$$$$requestBalances$$($opt_clientID$$1$$) {
  var $msg$$29$$ = {MsgType:"U2", BalanceReqID:parseInt(1E6 * Math.random(), 10)};
  $opt_clientID$$1$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$1$$) && ($msg$$29$$.ClientID = $opt_clientID$$1$$);
  this.sendMessage($msg$$29$$)
};
$JSCompiler_prototypeAlias$$.$requestWithdraw$ = function $$JSCompiler_prototypeAlias$$$$requestWithdraw$$($opt_request_id_reqId$$1$$, $amount$$4_msg$$30$$, $method$$4$$, $currency$$1$$, $data$$37$$) {
  $opt_request_id_reqId$$1$$ = $opt_request_id_reqId$$1$$ || parseInt(1E6 * Math.random(), 10);
  $amount$$4_msg$$30$$ = {MsgType:"U6", WithdrawReqID:$opt_request_id_reqId$$1$$, Currency:$currency$$1$$, Amount:parseInt(1E8 * $amount$$4_msg$$30$$, 10), Method:$method$$4$$, Data:$goog$json$serialize$$($data$$37$$)};
  this.sendMessage($amount$$4_msg$$30$$);
  return $opt_request_id_reqId$$1$$
};
$JSCompiler_prototypeAlias$$.$confirmWithdraw$ = function $$JSCompiler_prototypeAlias$$$$confirmWithdraw$$($confirmation_token$$) {
  this.sendMessage({MsgType:"U24", WithdrawReqID:parseInt(1E6 * Math.random(), 10), ConfirmationToken:$confirmation_token$$})
};
$JSCompiler_prototypeAlias$$.$requestWithdrawList$ = function $$JSCompiler_prototypeAlias$$$$requestWithdrawList$$($opt_requestId_requestId$$, $msg$$32_opt_page$$, $opt_limit$$1$$, $opt_status$$, $opt_clientID$$2$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$32_opt_page$$ = {MsgType:"U26", WithdrawListReqID:$opt_requestId_requestId$$, Page:$msg$$32_opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["1", "2"]};
  $opt_clientID$$2$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$2$$) && ($msg$$32_opt_page$$.ClientID = $opt_clientID$$2$$);
  this.sendMessage($msg$$32_opt_page$$);
  return $opt_requestId_requestId$$
};
$JSCompiler_prototypeAlias$$.$requestDepositList$ = function $$JSCompiler_prototypeAlias$$$$requestDepositList$$($opt_requestId$$1_requestId$$1$$, $msg$$33_opt_page$$1$$, $opt_limit$$2$$, $opt_status$$1$$, $opt_clientID$$3$$, $opt_filter$$) {
  $opt_requestId$$1_requestId$$1$$ = $opt_requestId$$1_requestId$$1$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$33_opt_page$$1$$ = {MsgType:"U30", DepositListReqID:$opt_requestId$$1_requestId$$1$$, Page:$msg$$33_opt_page$$1$$ || 0, PageSize:$opt_limit$$2$$ || 100, StatusList:$opt_status$$1$$ || ["1", "2"]};
  $opt_clientID$$3$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$3$$) && ($msg$$33_opt_page$$1$$.ClientID = $opt_clientID$$3$$);
  $opt_filter$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_filter$$) && ($msg$$33_opt_page$$1$$.Filter = $opt_filter$$);
  this.sendMessage($msg$$33_opt_page$$1$$);
  return $opt_requestId$$1_requestId$$1$$
};
$JSCompiler_prototypeAlias$$.$requestBrokerList$ = function $$JSCompiler_prototypeAlias$$$$requestBrokerList$$($opt_requestId$$2_requestId$$2$$, $opt_country$$, $msg$$34_opt_page$$2$$, $opt_limit$$3$$, $opt_status$$2$$) {
  $opt_requestId$$2_requestId$$2$$ = $opt_requestId$$2_requestId$$2$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$34_opt_page$$2$$ = {MsgType:"U28", BrokerListReqID:$opt_requestId$$2_requestId$$2$$, Page:$msg$$34_opt_page$$2$$ || 0, PageSize:$opt_limit$$3$$ || 100, StatusList:$opt_status$$2$$ || ["1"]};
  $opt_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$34_opt_page$$2$$.Country = $opt_country$$);
  this.sendMessage($msg$$34_opt_page$$2$$);
  return $opt_requestId$$2_requestId$$2$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerList$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerList$$($opt_requestId$$3_requestId$$3$$, $opt_filter_country$$, $opt_filter_state$$, $opt_filter_username_or_email$$, $msg$$35_opt_page$$3$$, $opt_limit$$4$$, $opt_status$$3$$, $opt_sort_column$$, $opt_sort_direction$$) {
  $opt_requestId$$3_requestId$$3$$ = $opt_requestId$$3_requestId$$3$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$35_opt_page$$3$$ = {MsgType:"B2", CustomerListReqID:$opt_requestId$$3_requestId$$3$$, Page:$msg$$35_opt_page$$3$$ || 0, PageSize:$opt_limit$$4$$ || 100, StatusList:$opt_status$$3$$ || [0, 1]};
  $opt_filter_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$35_opt_page$$3$$.Country = $opt_filter_country$$);
  $opt_filter_state$$ != $JSCompiler_alias_NULL$$ && ($msg$$35_opt_page$$3$$.State = $opt_filter_state$$);
  $opt_filter_username_or_email$$ != $JSCompiler_alias_NULL$$ && ($msg$$35_opt_page$$3$$.ClientID = $opt_filter_username_or_email$$);
  $opt_sort_column$$ != $JSCompiler_alias_NULL$$ && ($msg$$35_opt_page$$3$$.Sort = $opt_sort_column$$);
  $opt_sort_direction$$ != $JSCompiler_alias_NULL$$ && ($msg$$35_opt_page$$3$$.SortOrder = $opt_sort_direction$$);
  this.sendMessage($msg$$35_opt_page$$3$$);
  return $opt_requestId$$3_requestId$$3$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerDetails$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerDetails$$($opt_requestId$$4$$, $clientId$$) {
  var $requestId$$4$$ = $opt_requestId$$4$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"B4", CustomerReqID:$requestId$$4$$, ClientID:$clientId$$});
  return $requestId$$4$$
};
$JSCompiler_prototypeAlias$$.$processWithdraw$ = function $$JSCompiler_prototypeAlias$$$$processWithdraw$$($opt_requestId$$5_requestId$$5$$, $action_msg$$37$$, $withdrawId$$, $opt_reasonId$$, $opt_reason$$, $opt_data$$23$$) {
  $opt_requestId$$5_requestId$$5$$ = $opt_requestId$$5_requestId$$5$$ || parseInt(1E7 * Math.random(), 10);
  $action_msg$$37$$ = {MsgType:"B6", ProcessWithdrawReqID:$opt_requestId$$5_requestId$$5$$, WithdrawID:$withdrawId$$, Action:$action_msg$$37$$};
  $opt_reasonId$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$37$$.ReasonID = $opt_reasonId$$);
  $opt_reason$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$37$$.Reason = $opt_reason$$);
  $opt_data$$23$$ != $JSCompiler_alias_NULL$$ && ($action_msg$$37$$.Data = $opt_data$$23$$);
  this.sendMessage($action_msg$$37$$);
  return $opt_requestId$$5_requestId$$5$$
};
$JSCompiler_prototypeAlias$$.$processDeposit$ = function $$JSCompiler_prototypeAlias$$$$processDeposit$$($opt_requestId$$6_requestId$$6$$, $action$$1_msg$$38$$, $opt_secret$$1$$, $opt_depositId$$, $opt_reasonId$$1$$, $opt_reason$$1$$, $opt_amount$$) {
  $opt_requestId$$6_requestId$$6$$ = $opt_requestId$$6_requestId$$6$$ || parseInt(1E7 * Math.random(), 10);
  $action$$1_msg$$38$$ = {MsgType:"B0", ProcessDepositReqID:$opt_requestId$$6_requestId$$6$$, Action:$action$$1_msg$$38$$};
  $opt_secret$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$38$$.Secret = $opt_secret$$1$$);
  $opt_depositId$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$38$$.DepositID = $opt_depositId$$);
  $opt_reasonId$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$38$$.ReasonID = $opt_reasonId$$1$$);
  $opt_reason$$1$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$38$$.Reason = $opt_reason$$1$$);
  $opt_amount$$ != $JSCompiler_alias_NULL$$ && ($action$$1_msg$$38$$.Amount = $opt_amount$$);
  this.sendMessage($action$$1_msg$$38$$);
  return $opt_requestId$$6_requestId$$6$$
};
$JSCompiler_prototypeAlias$$.$resetPassword$ = function $$JSCompiler_prototypeAlias$$$$resetPassword$$($token$$5$$, $new_password$$) {
  this.sendMessage({MsgType:"U12", Token:$token$$5$$, NewPassword:$new_password$$})
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$3$$, $new_password$$1$$) {
  this.sendMessage({MsgType:"BE", UserReqID:"3", Password:$password$$3$$, NewPassword:$new_password$$1$$})
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$1$$, $entries$$, $opt_requestId$$7_requestId$$7$$) {
  $opt_requestId$$7_requestId$$7$$ = $opt_requestId$$7_requestId$$7$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"V", MDReqID:$opt_requestId$$7_requestId$$7$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$1$$});
  return $opt_requestId$$7_requestId$$7$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.sendMessage({MsgType:"V", MDReqID:$market_data_id$$, MarketDepth:0, SubscriptionRequestType:"2"})
};
$JSCompiler_prototypeAlias$$.$requestSecurityList$ = function $$JSCompiler_prototypeAlias$$$$requestSecurityList$$($opt_requestId$$8$$) {
  this.sendMessage({MsgType:"x", SecurityReqID:$opt_requestId$$8$$ || parseInt(1E7 * Math.random(), 10), SecurityListRequestType:0, SecurityRequestResult:0})
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$6$$, $password$$4$$, $email$$2$$, $state$$19$$, $country_code$$2$$, $broker$$4$$) {
  this.sendMessage({MsgType:"U0", Username:$username$$6$$, Password:$password$$4$$, Email:$email$$2$$, State:$state$$19$$, CountryCode:$country_code$$2$$, BrokerID:$broker$$4$$})
};
$JSCompiler_prototypeAlias$$.$requestOrderList$ = function $$JSCompiler_prototypeAlias$$$$requestOrderList$$($opt_requestId$$9_requestId$$9$$, $opt_page$$4$$, $opt_limit$$5$$, $opt_status$$4$$) {
  $opt_requestId$$9_requestId$$9$$ = $opt_requestId$$9_requestId$$9$$ || parseInt(1E7 * Math.random(), 10);
  this.sendMessage({MsgType:"U4", OrdersReqID:$opt_requestId$$9_requestId$$9$$, Page:$opt_page$$4$$ || 0, PageSize:$opt_limit$$5$$ || 100, StatusList:$opt_status$$4$$ || ["0", "1"]});
  return $opt_requestId$$9_requestId$$9$$
};
$JSCompiler_prototypeAlias$$.$requestDeposit$ = function $$JSCompiler_prototypeAlias$$$$requestDeposit$$($msg$$46_opt_requestId$$10$$, $opt_depositOptionId$$, $opt_value$$10$$, $opt_depositID$$, $opt_currency$$1$$) {
  $msg$$46_opt_requestId$$10$$ = {MsgType:"U18", DepositReqID:$msg$$46_opt_requestId$$10$$ || parseInt(1E7 * Math.random(), 10)};
  $opt_depositOptionId$$ != $JSCompiler_alias_NULL$$ && ($msg$$46_opt_requestId$$10$$.DepositMethodID = $opt_depositOptionId$$);
  $opt_value$$10$$ != $JSCompiler_alias_NULL$$ && ($msg$$46_opt_requestId$$10$$.Value = parseInt(1E8 * $opt_value$$10$$, 10));
  $opt_depositID$$ != $JSCompiler_alias_NULL$$ && ($msg$$46_opt_requestId$$10$$.DepositID = $opt_depositID$$);
  $opt_currency$$1$$ != $JSCompiler_alias_NULL$$ && ($msg$$46_opt_requestId$$10$$.Currency = $opt_currency$$1$$);
  this.sendMessage($msg$$46_opt_requestId$$10$$)
};
$JSCompiler_prototypeAlias$$.$requestDepositMethods$ = function $$JSCompiler_prototypeAlias$$$$requestDepositMethods$$($opt_requestId$$11$$) {
  this.sendMessage({MsgType:"U20", DepositMethodReqID:$opt_requestId$$11$$ || parseInt(1E7 * Math.random(), 10)})
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $msg$$48_symbol$$5$$, $qty$$5$$, $price$$4$$, $side$$9$$, $opt_client_id$$, $clientOrderId$$1_opt_clientOrderId$$) {
  $clientOrderId$$1_opt_clientOrderId$$ = $clientOrderId$$1_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$4$$ = parseInt(1E8 * $price$$4$$, 10);
  $qty$$5$$ = parseInt(1E8 * $qty$$5$$, 10);
  $msg$$48_symbol$$5$$ = {MsgType:"D", ClOrdID:"" + $clientOrderId$$1_opt_clientOrderId$$, Symbol:$msg$$48_symbol$$5$$, Side:$side$$9$$, OrdType:"2", Price:$price$$4$$, OrderQty:$qty$$5$$};
  $opt_client_id$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_client_id$$) && ($msg$$48_symbol$$5$$.ClientID = $opt_client_id$$);
  $JSCompiler_StaticMethods_sendOrder_$self$$.sendMessage($msg$$48_symbol$$5$$);
  return $clientOrderId$$1_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$49$$ = {MsgType:"F"};
  $opt_OrderId$$ ? $msg$$49$$.OrderID = $opt_OrderId$$ : $opt_clientOrderId$$1$$ && ($msg$$49$$.OrigClOrdID = $opt_clientOrderId$$1$$);
  this.sendMessage($msg$$49$$)
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$50$$) {
  if(this.$ws_$.$isOpen$()) {
    try {
      this.$ws_$.send($msg$$50$$), this.dispatchEvent(new $bitex$api$BitExEvent$$("sent_raw_message", $msg$$50$$))
    }catch($s$$45$$) {
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", {MsgType:"ERROR", Description:"Exception", Detail:$s$$45$$.toLocaleString()}))
    }
  }else {
    this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", {MsgType:"ERROR", Description:"Error", Detail:"Not connected to the server"}))
  }
};
$JSCompiler_prototypeAlias$$.sendMessage = function $$JSCompiler_prototypeAlias$$$sendMessage$($msg$$51$$) {
  this.$sendRawMessage$(JSON.stringify($msg$$51$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$6$$, $qty$$6$$, $price$$5$$, $opt_client_id$$1$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$6$$, $qty$$6$$, $price$$5$$, "1", $opt_client_id$$1$$, $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$7$$, $qty$$7$$, $price$$6$$, $opt_client_id$$2$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$7$$, $qty$$7$$, $price$$6$$, "2", $opt_client_id$$2$$, $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.sendMessage({MsgType:"1", TestReqID:Math.random()})
};
function $bitex$api$BitExEvent$$($type$$106$$, $opt_data$$24$$) {
  $goog$events$Event$$.call(this, $type$$106$$);
  this.data = $opt_data$$24$$
}
$goog$inherits$$($bitex$api$BitExEvent$$, $goog$events$Event$$);
$goog$exportPath_$$("BitEx", $bitex$api$BitEx$$);
$goog$exportProperty$$("open", $bitex$api$BitEx$$.prototype.open);
$goog$exportProperty$$("close", $bitex$api$BitEx$$.prototype.close);
$goog$exportProperty$$("login", $bitex$api$BitEx$$.prototype.login);
$goog$exportProperty$$("isLogged", $bitex$api$BitEx$$.prototype.$isLogged$);
$goog$exportProperty$$("isConnected", $bitex$api$BitEx$$.prototype.$isConnected$);
$goog$exportProperty$$("changePassword", $bitex$api$BitEx$$.prototype.$changePassword$);
$goog$exportProperty$$("enableTwoFactor", $bitex$api$BitEx$$.prototype.$enableTwoFactor$);
$goog$exportProperty$$("resetPassword", $bitex$api$BitEx$$.prototype.$resetPassword$);
$goog$exportProperty$$("subscribeMarketData", $bitex$api$BitEx$$.prototype.$subscribeMarketData$);
$goog$exportProperty$$("unSubscribeMarketData", $bitex$api$BitEx$$.prototype.$unSubscribeMarketData$);
$goog$exportProperty$$("signUp", $bitex$api$BitEx$$.prototype.$signUp$);
$goog$exportProperty$$("forgotPassword", $bitex$api$BitEx$$.prototype.$forgotPassword$);
$goog$exportProperty$$("requestBalances", $bitex$api$BitEx$$.prototype.$requestBalances$);
$goog$exportProperty$$("requestSecurityList", $bitex$api$BitEx$$.prototype.$requestSecurityList$);
$goog$exportProperty$$("requestDepositMethods", $bitex$api$BitEx$$.prototype.$requestDepositMethods$);
$goog$exportProperty$$("requestDeposit", $bitex$api$BitEx$$.prototype.$requestDeposit$);
$goog$exportProperty$$("processDeposit", $bitex$api$BitEx$$.prototype.$processDeposit$);
$goog$exportProperty$$("requestDepositList", $bitex$api$BitEx$$.prototype.$requestDepositList$);
$goog$exportProperty$$("requestWithdraw", $bitex$api$BitEx$$.prototype.$requestWithdraw$);
$goog$exportProperty$$("processWithdraw", $bitex$api$BitEx$$.prototype.$processWithdraw$);
$goog$exportProperty$$("requestWithdrawList", $bitex$api$BitEx$$.prototype.$requestWithdrawList$);
$goog$exportProperty$$("confirmWithdraw", $bitex$api$BitEx$$.prototype.$confirmWithdraw$);
$goog$exportProperty$$("requestCustomerList", $bitex$api$BitEx$$.prototype.$requestCustomerList$);
$goog$exportProperty$$("requestCustomerDetails", $bitex$api$BitEx$$.prototype.$requestCustomerDetails$);
$goog$exportProperty$$("requestBrokerList", $bitex$api$BitEx$$.prototype.$requestBrokerList$);
$goog$exportProperty$$("requestOrderList", $bitex$api$BitEx$$.prototype.$requestOrderList$);
$goog$exportProperty$$("cancelOrder", $bitex$api$BitEx$$.prototype.$cancelOrder$);
$goog$exportProperty$$("sendRawMessage", $bitex$api$BitEx$$.prototype.$sendRawMessage$);
$goog$exportProperty$$("sendBuyLimitedOrder", $bitex$api$BitEx$$.prototype.$sendBuyLimitedOrder$);
$goog$exportProperty$$("sendSellLimitedOrder", $bitex$api$BitEx$$.prototype.$sendSellLimitedOrder$);
$goog$exportProperty$$("testRequest", $bitex$api$BitEx$$.prototype.$testRequest$);
$goog$exportProperty$$("addEventListener", $bitex$api$BitEx$$.prototype.addEventListener);
$goog$exportProperty$$("removeEventListener", $bitex$api$BitEx$$.prototype.removeEventListener);
// Input 115
function $bitex$view$TwoFactorView$$($app$$9$$, $opt_domHelper$$26$$) {
  $bitex$view$View$$.call(this, $app$$9$$, $opt_domHelper$$26$$)
}
$goog$inherits$$($bitex$view$TwoFactorView$$, $bitex$view$View$$);
$bitex$view$TwoFactorView$$.prototype.$enterDocument$ = function $$bitex$view$TwoFactorView$$$$$enterDocument$$() {
  $bitex$view$TwoFactorView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$69$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$69$$, this.$app_$.$model_$, "model_setTwoFactorSecret", function($e$$124_secret$$) {
    $e$$124_secret$$ = $e$$124_secret$$.data;
    $e$$124_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($e$$124_secret$$) && $goog$dom$getElement$$("id_secret_qr").setAttribute("src", "https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=" + $e$$124_secret$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$69$$, this.$app_$.$model_$, "model_setTwoFactorEnabled", function($e$$125_enabled$$5$$) {
    $e$$125_enabled$$5$$ = $e$$125_enabled$$5$$.data;
    var $has_secret$$1_secret$$1$$ = this.$app_$.$model_$.get("TwoFactorSecret"), $has_secret$$1_secret$$1$$ = $has_secret$$1_secret$$1$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($has_secret$$1_secret$$1$$), $divEl$$ = $goog$dom$getElement$$("id_enable_two_factor_div"), $btnDisableEl$$ = $goog$dom$getElement$$("id_btn_disable_two_factor");
    $goog$style$showElement$$($goog$dom$getElement$$("id_btn_enable_two_factor"), !$e$$125_enabled$$5$$);
    $goog$style$showElement$$($btnDisableEl$$, $e$$125_enabled$$5$$);
    $goog$style$showElement$$($divEl$$, $has_secret$$1_secret$$1$$)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$69$$, $goog$dom$getElement$$("id_btn_enable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_enable")
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$69$$, $goog$dom$getElement$$("id_btn_disable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_disable")
  }, this)
};
// Input 116
function $bitex$view$SetNewPasswordView$$($app$$10$$, $opt_domHelper$$27$$) {
  $bitex$view$View$$.call(this, $app$$10$$, $opt_domHelper$$27$$)
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
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_set_new_password"), "click", function($e$$128$$) {
    $e$$128$$.stopPropagation();
    $e$$128$$.preventDefault();
    $goog$string$isEmpty$$(this.$getToken$()) ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Invalid confirmation code") : $goog$string$isEmpty$$(this.$getPassword$()) || 8 > this.$getPassword$().length ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Password must have at least 8 characters") : this.$getPassword$() !== $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password2")) ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Passwords does not match") : 
    this.dispatchEvent("set_new_pwd")
  }, this)
};
// Input 117
function $bitex$view$ForgotPasswordView$$($app$$11$$, $opt_domHelper$$28$$) {
  $bitex$view$View$$.call(this, $app$$11$$, $opt_domHelper$$28$$)
}
$goog$inherits$$($bitex$view$ForgotPasswordView$$, $bitex$view$View$$);
$bitex$view$ForgotPasswordView$$.prototype.$enterDocument$ = function $$bitex$view$ForgotPasswordView$$$$$enterDocument$$() {
  $bitex$view$ForgotPasswordView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_forgot_password"), "click", function($e$$129$$) {
    $e$$129$$.stopPropagation();
    $e$$129$$.preventDefault();
    $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email")).match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? this.dispatchEvent("recover_pwd") : ($goog$dom$getElement$$("id_forgot_password_email").focus(), $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Invalid email address"))
  }, this)
};
$bitex$view$ForgotPasswordView$$.prototype.$getEmail$ = function $$bitex$view$ForgotPasswordView$$$$$getEmail$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email"))
};
// Input 118
function $bitex$view$BrokerView$$($app$$12$$, $opt_domHelper$$29$$) {
  $bitex$view$View$$.call(this, $app$$12$$, $opt_domHelper$$29$$)
}
$goog$inherits$$($bitex$view$BrokerView$$, $bitex$view$View$$);
$bitex$view$BrokerView$$.prototype.$enterDocument$ = function $$bitex$view$BrokerView$$$$$enterDocument$$() {
  $bitex$view$BrokerView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$app_$.$model_$, "model_setBroker", this.$onModelSetBroker_$)
};
$bitex$view$BrokerView$$.prototype.$onModelSetBroker_$ = function $$bitex$view$BrokerView$$$$$onModelSetBroker_$$($e$$130$$) {
  $goog$soy$renderElement$$($goog$dom$getElement$$("my_broker"), $bitex$templates$BrokerView$$, {$msg_broker$:$e$$130$$.data})
};
// Input 119
function $bitex$view$WithdrawView$$($app$$13$$, $opt_domHelper$$30$$) {
  $bitex$view$View$$.call(this, $app$$13$$, $opt_domHelper$$30$$);
  this.$confirmation_token_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
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
  var $model$$9$$ = this.$app_$.$model_$, $handler$$73$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$app_$.$conn_$, "withdraw_response", this.$onBitexWithdrawResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, $model$$9$$, "model_setBrokerCurrencies", function() {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_user_balances_well"));
    var $broker_currencies$$2$$ = $model$$9$$.get("BrokerCurrencies");
    $goog$soy$renderElement$$($goog$dom$getElement$$("id_user_balances_well"), $bitex$templates$AccountBalances$$, {$currencies$:$broker_currencies$$2$$, action:"withdraw"});
    $JSCompiler_StaticMethods_updateDom$$($model$$9$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$73$$, this.$getElement$(), "click", function($e$$132_user_currency$$) {
    "withdraw" === $e$$132_user_currency$$.target.getAttribute("data-action") && ($e$$132_user_currency$$ = $e$$132_user_currency$$.target.getAttribute("data-currency"), $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$$(this, $e$$132_user_currency$$))
  }, this)
};
$JSCompiler_prototypeAlias$$.$getAmount$ = $JSCompiler_get$$("$amount_$");
$JSCompiler_prototypeAlias$$.$getWithdrawData$ = $JSCompiler_get$$("$data_$");
function $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$$($JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$, $currency$$2$$) {
  var $dialogContent_withdraw_methods$$ = $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$model_$.get("Broker").WithdrawStructure[$currency$$2$$], $dialogContent_withdraw_methods$$ = $bitex$templates$DepositWithdrawDialogContent$$({$side$:"client", $currency$:$currency$$2$$, $currency_sign$:$JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$currency_info_$[$currency$$2$$].$sign$, $methods$:$dialogContent_withdraw_methods$$}), $dlg$$ = $JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$, 
  $dialogContent_withdraw_methods$$, $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$app_$.$currency_info_$[$currency$$2$$].description + " withdrawal", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
  $JSCompiler_StaticMethods_listenOnce$$($JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$.$getHandler$(), $dlg$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$133_withdraw_data$$) {
    "ok" == $e$$133_withdraw_data$$.key && ($e$$133_withdraw_data$$ = $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($dlg$$.$getContentElement$())), this.$amount_$ = $goog$string$toNumber$$($e$$133_withdraw_data$$.Amount), delete $e$$133_withdraw_data$$.Amount, this.$method_$ = $e$$133_withdraw_data$$.Method, delete $e$$133_withdraw_data$$.Method, this.$currency_$ = $e$$133_withdraw_data$$.Currency, delete $e$$133_withdraw_data$$.Currency, this.$data_$ = $e$$133_withdraw_data$$, this.dispatchEvent("request_withdraw"))
  }, $JSCompiler_StaticMethods_showCurrencyWithdrawDialog$self$$)
}
$JSCompiler_prototypeAlias$$.$onBitexWithdrawResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexWithdrawResponse_$$() {
  var $dlg_content_withdrawConfirmationDialog$$ = $bitex$templates$WithdrawConfirmationDialogContent$$(), $dlg_content_withdrawConfirmationDialog$$ = $JSCompiler_StaticMethods_showDialog$$(this.$app_$, $dlg_content_withdrawConfirmationDialog$$, "Confirm", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
  $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg_content_withdrawConfirmationDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$135$$) {
    "ok" == $e$$135$$.key && (this.$confirmation_token_$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_withdraw_confirmation")), this.dispatchEvent("confirm_withdraw"))
  }, this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$76$$ = this.$getHandler$(), $model$$11$$ = this.$app_$.$model_$;
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$76$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$76$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$, this.$onWithdrawListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$76$$, this.$app_$.$conn_$, "withdraw_refresh." + $model$$11$$.get("UserID"), this.$onWithdrawRefresh_$), 
  this.$withdraw_list_table_$.$dispose$());
  this.$request_id_$ = this.$withdraw_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$77$$ = this.$getHandler$(), $model$$12$$ = this.$app_$.$model_$;
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$58$$ = $goog$dom$getElement$$("id_withdraw_list_table");
  this.$withdraw_list_table_$ = new $bitex$ui$WithdrawList$$;
  $JSCompiler_StaticMethods_listen$$($handler$$77$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$77$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$77$$, this.$app_$.$conn_$, "withdraw_refresh." + $model$$12$$.get("UserID"), this.$onWithdrawRefresh_$);
  this.$withdraw_list_table_$.$decorate$($el$$58$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$withdraw_list_table_$, "Amount", this.$priceFormatter_$, this)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$149$$, $rowSet$$9$$) {
  return this.$app_$.$formatCurrency$($value$$149$$ / 1E8, $rowSet$$9$$.Currency)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableRequestData_$$($e$$136$$) {
  this.$app_$.$conn_$.$requestWithdrawList$(this.$request_id_$, $e$$136$$.options.Page, $e$$136$$.options.Limit, ["1", "2", "4", "8"])
};
$JSCompiler_prototypeAlias$$.$onWithdrawRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawRefresh_$$($e$$137_msg$$53$$) {
  $e$$137_msg$$53$$ = $e$$137_msg$$53$$.data;
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$withdraw_list_table_$, $e$$137_msg$$53$$)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListReponse_$$($e$$138_msg$$54$$) {
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$138_msg$$54$$ = $e$$138_msg$$54$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$withdraw_list_table_$, $e$$138_msg$$54$$.WithdrawListGrp, $e$$138_msg$$54$$.Columns))
};
// Input 120
// Input 121
function $goog$history$Event$$($token$$6$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$6$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 122
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
    var $loc$$ = this.$window_$.location.href, $index$$79$$ = $loc$$.indexOf("#");
    return 0 > $index$$79$$ ? "" : $loc$$.substring($index$$79$$ + 1)
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
// Input 123
function $bitex$app$UrlRouter$$($app$$14$$, $baseUrl$$, $defaultView$$) {
  this.$urls_$ = [];
  this.$app_$ = $app$$14$$;
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
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_641$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
};
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$140_view_name$$3$$) {
  $e$$140_view_name$$3$$.$isNavigation$ && ($e$$140_view_name$$3$$ = $e$$140_view_name$$3$$.$token$, this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $e$$140_view_name$$3$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $e$$140_view_name$$3$$))
};
function $bitex$app$UrlRouterEvent$$($type$$107$$, $view_id$$2$$, $view_args$$1$$, $view_url$$2$$) {
  $goog$events$Event$$.call(this, $type$$107$$);
  this.$view_id$ = $view_id$$2$$;
  this.$view_args$ = $view_args$$1$$;
  this.$view_url$ = $view_url$$2$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 124
function $bitex$view$VerificationView$$($app$$15$$, $opt_domHelper$$31$$) {
  $bitex$view$View$$.call(this, $app$$15$$, $opt_domHelper$$31$$);
  this.$loaded_jot_form_$ = $JSCompiler_alias_FALSE$$
}
$goog$inherits$$($bitex$view$VerificationView$$, $bitex$view$View$$);
$bitex$view$VerificationView$$.prototype.$enterView$ = function $$bitex$view$VerificationView$$$$$enterView$$() {
  if(!this.$loaded_jot_form_$) {
    var $form_src_model$$13$$ = this.$app_$.$model_$, $broker$$6_verificationIFrameForm$$ = $form_src_model$$13$$.get("Broker");
    $broker$$6_verificationIFrameForm$$ != $JSCompiler_alias_NULL$$ && ($form_src_model$$13$$ = $goog$string$subs$$($broker$$6_verificationIFrameForm$$.VerificationForm, $form_src_model$$13$$.get("UserID"), $form_src_model$$13$$.get("Username"), $form_src_model$$13$$.get("Email")), $broker$$6_verificationIFrameForm$$ = $goog$dom$getElement$$("JotFormIFrame"), $broker$$6_verificationIFrameForm$$.src !== $form_src_model$$13$$ && ($broker$$6_verificationIFrameForm$$.src = $form_src_model$$13$$, this.$loaded_jot_form_$ = 
    $JSCompiler_alias_TRUE$$))
  }
};
$bitex$view$VerificationView$$.prototype.$enterDocument$ = function $$bitex$view$VerificationView$$$$$enterDocument$$() {
  $bitex$view$VerificationView$$.$superClass_$.$enterDocument$.call(this)
};
// Input 125
function $bitex$view$SideBarView$$($app$$16$$, $opt_domHelper$$32$$) {
  $bitex$view$View$$.call(this, $app$$16$$, $opt_domHelper$$32$$)
}
$goog$inherits$$($bitex$view$SideBarView$$, $bitex$view$View$$);
$bitex$view$SideBarView$$.prototype.$enterDocument$ = function $$bitex$view$SideBarView$$$$$enterDocument$$() {
  $bitex$view$SideBarView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$78$$ = this.$getHandler$(), $model$$14$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, $model$$14$$, "model_setBrokerCurrencies", function() {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_account_summary_content"));
    if(!$model$$14$$.get("IsBroker")) {
      var $broker_currencies$$3$$ = $model$$14$$.get("BrokerCurrencies");
      $goog$soy$renderElement$$($goog$dom$getElement$$("id_account_summary_content"), $bitex$templates$YourAccountSummary$$, {$currencies$:$broker_currencies$$3$$})
    }
  });
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, $model$$14$$, "model_setSecurityList", function() {
    var $msg$$55$$ = $model$$14$$.get("SecurityList");
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_instrument_1"));
    $goog$array$forEach$$($msg$$55$$.Instruments, function($el$$59_instrument$$1$$) {
      $el$$59_instrument$$1$$ = $goog$dom$createDom$$("option", {value:$el$$59_instrument$$1$$.Symbol}, $el$$59_instrument$$1$$.Description);
      $goog$dom$getElement$$("id_instrument_1").appendChild($el$$59_instrument$$1$$)
    }, this)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, $model$$14$$, "model_setAllowedMarkets", function() {
    var $allowed_markets$$1_allowed_markets_array$$ = $model$$14$$.get("AllowedMarkets"), $allowed_markets$$1_allowed_markets_array$$ = $goog$object$getKeys$$($allowed_markets$$1_allowed_markets_array$$);
    0 < $allowed_markets$$1_allowed_markets_array$$.length && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_instrument_1"), $allowed_markets$$1_allowed_markets_array$$[0]), this.dispatchEvent("changed_market"))
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$78$$, $goog$dom$getElement$$("id_instrument_1"), "change", function() {
    this.dispatchEvent("changed_market")
  }, this)
};
$bitex$view$SideBarView$$.prototype.$getSymbol$ = function $$bitex$view$SideBarView$$$$$getSymbol$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_instrument_1"))
};
// Input 126
// Input 127
// Input 128
function $bootstrap$Alert$$($opt_type$$11$$, $opt_content$$, $opt_close$$, $opt_domHelper$$33$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$33$$);
  this.$type_$ = $opt_type$$11$$;
  this.$content_$ = $opt_content$$;
  this.$has_close_$ = $JSCompiler_alias_TRUE$$;
  $opt_close$$ != $JSCompiler_alias_NULL$$ && $opt_close$$ === $JSCompiler_alias_FALSE$$ && (this.$has_close_$ = $JSCompiler_alias_FALSE$$)
}
$goog$inherits$$($bootstrap$Alert$$, $goog$ui$Component$$);
$bootstrap$Alert$$.prototype.$getCssClass$ = $JSCompiler_returnArg$$("alert");
$bootstrap$Alert$$.prototype.$createDom$ = function $$bootstrap$Alert$$$$$createDom$$() {
  var $dom$$19_element$$164$$ = this.$getDomHelper$();
  return this.$element_$ = $dom$$19_element$$164$$ = this.$has_close_$ ? $dom$$19_element$$164$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], $dom$$19_element$$164$$.$createDom$("button", ["close", "pull-right"], "\u00d7"), this.$content_$) : $dom$$19_element$$164$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], this.$content_$)
};
$bootstrap$Alert$$.prototype.$logger_$ = $goog$debug$LogManager$getLogger$$("bootstrap.Alert");
$bootstrap$Alert$$.prototype.$enterDocument$ = function $$bootstrap$Alert$$$$$enterDocument$$() {
  $bootstrap$Alert$$.$superClass_$.$enterDocument$.call(this);
  var $closeBtn_dom$$20$$ = this.$getDomHelper$(), $handler$$79$$ = this.$getHandler$(), $closeBtn_dom$$20$$ = $closeBtn_dom$$20$$.$getElementByClass$("close", this.$getElement$());
  $closeBtn_dom$$20$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_listenOnce$$($handler$$79$$, $closeBtn_dom$$20$$, "click", function() {
    this.$dispose$()
  })
};
// Input 129
function $bitex$view$AccountOverview$$($app$$17$$, $opt_domHelper$$34$$) {
  $bitex$view$View$$.call(this, $app$$17$$, $opt_domHelper$$34$$);
  this.$deposit_data_$ = this.$deposit_action_$ = this.$withdraw_action_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$AccountOverview$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$AccountOverview$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$($username$$7$$) {
  var $selectedCustomer$$ = this.$app_$.$model_$.get("SelectedCustomer");
  $selectedCustomer$$ != $JSCompiler_alias_NULL$$ && $selectedCustomer$$.Username == $username$$7$$ && this.$recreateComponents_$($selectedCustomer$$)
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
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$($customer$$) {
  var $handler$$81$$ = this.$getHandler$();
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListResponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, "process_deposit." + this.$request_id_$, this.$onDepositProcessResponse_$), 
  $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $customer$$.ID, this.$onDepositRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$), this.$deposit_list_table_$.$dispose$());
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$), 
  $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$withdraw_list_table_$, "withdraw_complete", this.$onUserSetWithdrawComplete_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, "process_withdraw." + this.$request_id_$, this.$onWithdrawProcessResponse_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, 
  "withdraw_refresh." + $customer$$.ID, this.$onWithdrawRefresh_$), $JSCompiler_StaticMethods_unlisten$$($handler$$81$$, this.$app_$.$conn_$, "balance_response", this.$onBalanceResponse_$), this.$withdraw_list_table_$.$dispose$());
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_header_id"));
  this.$request_id_$ = this.$deposit_list_table_$ = this.$withdraw_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$($customer$$1$$) {
  var $handler$$82$$ = this.$getHandler$(), $broker$$7_model$$16$$ = this.$app_$.$model_$;
  this.$destroyComponents_$($customer$$1$$);
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_header_id"), $bitex$templates$AccountOverviewHeader$$, {$msg_customer_detail$:$customer$$1$$});
  $broker$$7_model$$16$$ = $broker$$7_model$$16$$.get("Broker");
  this.$deposit_list_table_$ = new $bitex$ui$DepositList$$($broker$$7_model$$16$$.CryptoCurrencies, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$deposit_list_table_$, "request_data", this.$onDepositListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onDepositListResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, "process_deposit." + this.$request_id_$, this.$onDepositProcessResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$DEPOSIT_REFRESH$$ + "." + $customer$$1$$.ID, this.$onDepositRefresh_$);
  this.$withdraw_list_table_$ = new $bitex$ui$WithdrawList$$($JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_cancel", this.$onUserCancelWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_progress", this.$onUserSetWithdrawInProgress_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$withdraw_list_table_$, "withdraw_complete", this.$onUserSetWithdrawComplete_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, "process_withdraw." + this.$request_id_$, this.$onWithdrawProcessResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, "withdraw_refresh." + $customer$$1$$.ID, this.$onWithdrawRefresh_$);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$app_$.$conn_$, "balance_response", this.$onBalanceResponse_$);
  this.$deposit_list_table_$.$decorate$($goog$dom$getElement$$("account_overview_deposits_table_id"));
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$deposit_list_table_$, "Value", this.$valuePriceFormatter_$, this);
  this.$withdraw_list_table_$.$decorate$($goog$dom$getElement$$("account_overview_withdraw_requests_table_id"));
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$withdraw_list_table_$, "Amount", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_listen$$($handler$$82$$, this.$deposit_list_table_$.$getElement$(), "click", this.$onDepositListTableClick_$);
  this.$app_$.$conn_$.$requestBalances$($customer$$1$$.ID)
};
$JSCompiler_prototypeAlias$$.$getWithdrawData$ = function $$JSCompiler_prototypeAlias$$$$getWithdrawData$$() {
  return this.$withdraw_list_table_$.$getWithdrawData$()
};
$JSCompiler_prototypeAlias$$.$getDepositData$ = $JSCompiler_get$$("$deposit_data_$");
$JSCompiler_prototypeAlias$$.$getDepositAction$ = $JSCompiler_get$$("$deposit_action_$");
$JSCompiler_prototypeAlias$$.$onDepositListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableRequestData_$$($e$$146_filter$$8$$) {
  var $page$$9$$ = $e$$146_filter$$8$$.options.Page, $limit$$9$$ = $e$$146_filter$$8$$.options.Limit;
  $e$$146_filter$$8$$ = $e$$146_filter$$8$$.options.Filter;
  var $selectedCustomer$$2$$ = this.$app_$.$model_$.get("SelectedCustomer");
  this.$app_$.$conn_$.$requestDepositList$(this.$request_id_$, $page$$9$$, $limit$$9$$, ["0", "1", "2", "4", "8"], $selectedCustomer$$2$$.ID, $e$$146_filter$$8$$)
};
$JSCompiler_prototypeAlias$$.$onDepositRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onDepositRefresh_$$($e$$147_msg$$56$$) {
  $e$$147_msg$$56$$ = $e$$147_msg$$56$$.data;
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$deposit_list_table_$, $e$$147_msg$$56$$)
};
$JSCompiler_prototypeAlias$$.$onDepositListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListResponse_$$($e$$148_msg$$57$$) {
  this.$deposit_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$148_msg$$57$$ = $e$$148_msg$$57$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$deposit_list_table_$, $e$$148_msg$$57$$.DepositListGrp, $e$$148_msg$$57$$.Columns))
};
$JSCompiler_prototypeAlias$$.$onDepositListTableClick_$ = function $$JSCompiler_prototypeAlias$$$$onDepositListTableClick_$$($e$$149$$) {
  var $element$$166$$ = $e$$149$$.target;
  "I" === $element$$166$$.tagName && ($element$$166$$ = $goog$dom$getParentElement$$($element$$166$$));
  var $data_action$$1$$ = $element$$166$$.getAttribute("data-action");
  if($data_action$$1$$ != $JSCompiler_alias_NULL$$) {
    switch($e$$149$$.preventDefault(), $e$$149$$.stopPropagation(), this.$deposit_action_$ = $data_action$$1$$, this.$deposit_data_$ = $goog$json$parse$$($element$$166$$.getAttribute("data-row")), $data_action$$1$$) {
      case "SHOW_QR":
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
$JSCompiler_prototypeAlias$$.$onWithdrawListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableRequestData_$$($e$$153_limit$$10$$) {
  var $page$$10$$ = $e$$153_limit$$10$$.options.Page;
  $e$$153_limit$$10$$ = $e$$153_limit$$10$$.options.Limit;
  var $selectedCustomer$$3$$ = this.$app_$.$model_$.get("SelectedCustomer");
  this.$app_$.$conn_$.$requestWithdrawList$(this.$request_id_$, $page$$10$$, $e$$153_limit$$10$$, ["1", "2", "4", "8"], $selectedCustomer$$3$$.ID)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$150$$, $rowSet$$10$$) {
  return this.$app_$.$formatCurrency$($value$$150$$ / 1E8, $rowSet$$10$$.Currency)
};
$JSCompiler_prototypeAlias$$.$valuePriceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$valuePriceFormatter_$$($value$$151$$, $rowSet$$11$$) {
  var $formatted_paid_value$$1_paid_value$$1$$ = $rowSet$$11$$.PaidValue, $priceCurrency$$5$$ = $rowSet$$11$$.Currency, $currency_description$$1$$ = this.$app_$.$currency_info_$[$priceCurrency$$5$$].description, $formatted_value$$1$$ = this.$app_$.$formatCurrency$($value$$151$$ / 1E8, $priceCurrency$$5$$);
  return 0 === $value$$151$$ ? 0 === $formatted_paid_value$$1_paid_value$$1$$ ? "-" : $goog$dom$createDom$$("abbr", {title:$currency_description$$1$$}, this.$app_$.$formatCurrency$($formatted_paid_value$$1_paid_value$$1$$ / 1E8, $priceCurrency$$5$$)) : 0 < $formatted_paid_value$$1_paid_value$$1$$ && $formatted_paid_value$$1_paid_value$$1$$ != $value$$151$$ ? ($formatted_paid_value$$1_paid_value$$1$$ = this.$app_$.$formatCurrency$($formatted_paid_value$$1_paid_value$$1$$ / 1E8, $priceCurrency$$5$$), 
  $goog$dom$createDom$$("abbr", {title:"declared / paid in " + $currency_description$$1$$}, $formatted_value$$1$$ + " / " + $formatted_paid_value$$1_paid_value$$1$$)) : $goog$dom$createDom$$("abbr", {title:$currency_description$$1$$}, $formatted_value$$1$$)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListReponse_$$($e$$154_msg$$58$$) {
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$154_msg$$58$$ = $e$$154_msg$$58$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$withdraw_list_table_$, $e$$154_msg$$58$$.WithdrawListGrp, $e$$154_msg$$58$$.Columns))
};
$JSCompiler_prototypeAlias$$.$onWithdrawProcessResponse_$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$onDepositProcessResponse_$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$onBalanceResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBalanceResponse_$$($e$$157_user_balances$$) {
  var $msg$$61$$ = $e$$157_user_balances$$.data, $model$$17$$ = this.$app_$.$model_$;
  delete $msg$$61$$.MsgType;
  delete $msg$$61$$.BalanceReqID;
  $e$$157_user_balances$$ = $msg$$61$$[$model$$17$$.get("UserID")];
  var $currencies$$ = [];
  $goog$object$forEach$$($e$$157_user_balances$$, function($balance$$, $currency$$3$$) {
    $balance$$ /= 1E8;
    var $formatted_balance$$ = this.$app_$.$formatCurrency$($balance$$, $currency$$3$$);
    $currencies$$.push({code:$currency$$3$$, $model_key$:$currency$$3$$ + "." + $msg$$61$$.ClientID, $balance$:$formatted_balance$$});
    var $balance_key$$ = "balance_" + $currency$$3$$ + "." + $msg$$61$$.ClientID;
    $model$$17$$.set($balance_key$$, $balance$$);
    $model$$17$$.set("formatted_" + $balance_key$$, $formatted_balance$$)
  }, this);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_balances_id"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_balances_id"), $bitex$templates$YourAccountBalances$$, {$currencies$:$currencies$$})
};
$JSCompiler_prototypeAlias$$.$onWithdrawRefresh_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawRefresh_$$($e$$158$$) {
  $JSCompiler_StaticMethods_insertOrUpdateRecord$$(this.$withdraw_list_table_$, $e$$158$$.data)
};
// Input 130
function $bitex$app$SatoshiSquare$$() {
  $goog$Disposable$$.call(this);
  this.$dialog_$ = $JSCompiler_alias_NULL$$;
  this.$error_message_alert_timeout_$ = 5E3;
  try {
    this.$router_$ = new $bitex$app$UrlRouter$$(this, "", "start"), this.$model_$ = new $bitex$model$Model$$(document.body), this.$conn_$ = new $bitex$api$BitEx$$, this.$views_$ = new $goog$ui$Component$$
  }catch($error$$5$$) {
    $JSCompiler_StaticMethods_showDialog$$(this, $error$$5$$)
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
$JSCompiler_prototypeAlias$$.$onBitexRawMessageLogger_$ = function $$JSCompiler_prototypeAlias$$$$onBitexRawMessageLogger_$$($action$$2$$, $e$$159$$) {
  var $raw_msg$$ = $e$$159$$.data;
  try {
    console.log($action$$2$$ + ":" + $raw_msg$$)
  }catch($e$$160$$) {
  }
};
function $JSCompiler_StaticMethods_connectBitEx$$($JSCompiler_StaticMethods_connectBitEx$self$$) {
  try {
    $JSCompiler_StaticMethods_connectBitEx$self$$.$conn_$.open($JSCompiler_StaticMethods_connectBitEx$self$$.$url_$)
  }catch($e$$161$$) {
    var $JSCompiler_object_inline_error_code_709_output$$inline_661$$ = "WebSocket: " + $e$$161$$, $JSCompiler_object_inline_error_code_709_output$$inline_661$$ = "" + ('<p class="lead">' + $soy$$0$0escapeHtml$$("Error connecting to the server. Your browser MUST SUPPORT WebSockets.") + '</p><dl class="dl-horizontal"><dt>Error code</dt><dd>' + $soy$$0$0escapeHtml$$($JSCompiler_object_inline_error_code_709_output$$inline_661$$) + "</dd></dl>");
    $JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_connectBitEx$self$$, $JSCompiler_object_inline_error_code_709_output$$inline_661$$, $JSCompiler_alias_VOID$$, $bootstrap$Dialog$ButtonSet$createYesNoCancel$$())
  }
}
$JSCompiler_prototypeAlias$$.$setView$ = function $$JSCompiler_prototypeAlias$$$$setView$$($view_id$$3$$) {
  this.$router_$.$setView$($view_id$$3$$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataSubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataSubscribe_$$($e$$162$$) {
  this.$conn_$.$subscribeMarketData$(0, [$e$$162$$.target.$market_data_subscription_symbol_$], ["0", "1"], $e$$162$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataUnsubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataUnsubscribe_$$($e$$163$$) {
  this.$conn_$.$unSubscribeMarketData$($e$$163$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserChangeMarket_$ = function $$JSCompiler_prototypeAlias$$$$onUserChangeMarket_$$($e$$164_symbol$$11$$) {
  $e$$164_symbol$$11$$ = $e$$164_symbol$$11$$.target.$getSymbol$();
  this.$model_$.set("SelectedSymbol", {$symbol$:$e$$164_symbol$$11$$, $qty_currency$:this.$currency_info_$[$e$$164_symbol$$11$$.substr(0, 3)], $price_currency$:this.$currency_info_$[$e$$164_symbol$$11$$.substr(3)]})
};
$JSCompiler_prototypeAlias$$.$onBitexDepositMethodsResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexDepositMethodsResponse_$$($e$$165$$) {
  var $deposit_methods$$ = [];
  $goog$array$forEach$$($e$$165$$.data.DepositMethodGrp, function($deposit_method$$) {
    $deposit_methods$$.push({id:$deposit_method$$.DepositMethodID, description:$deposit_method$$.Description, $disclaimer$:$deposit_method$$.Disclaimer, type:$deposit_method$$.Type, $currency$:$deposit_method$$.Currency})
  });
  this.$model_$.set("DepositMethods", $deposit_methods$$)
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedOk_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedOk_$$() {
  $JSCompiler_StaticMethods_showDialog$$(this, "Password Changed", "Success");
  this.$router_$.$setView$("signin")
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedError_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedError_$$() {
  $JSCompiler_StaticMethods_showDialog$$(this, "There was an error changing the password", "Error")
};
$JSCompiler_prototypeAlias$$.$onBitexWithdrawIncrementalUpdate_$ = function $$JSCompiler_prototypeAlias$$$$onBitexWithdrawIncrementalUpdate_$$($e$$168_msg$$64$$) {
  $e$$168_msg$$64$$ = $e$$168_msg$$64$$.data;
  var $MSG_WITHDRAW_NOTIFICATION_USER_UNCONFIRMED_TITLE$$ = "Created withdraw [" + ($e$$168_msg$$64$$.WithdrawID + "] "), $MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE$$ = "Withdraw [" + ($e$$168_msg$$64$$.WithdrawID + "] confirmed"), $MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE$$ = "Withdraw [" + ($e$$168_msg$$64$$.WithdrawID + "] in progress"), $MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE$$ = "Withdraw [" + ($e$$168_msg$$64$$.WithdrawID + "] completed"), $MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE$$ = 
  "withdraw [" + ($e$$168_msg$$64$$.WithdrawID + "] cancelled"), $formatted_value$$2$$ = this.$formatCurrency$($e$$168_msg$$64$$.Amount / 1E8, $e$$168_msg$$64$$.Currency), $notification_type_title$$;
  switch($e$$168_msg$$64$$.Status) {
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
  $notification_type_title$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_showNotification$$(this, $notification_type_title$$[0], $notification_type_title$$[1], $formatted_value$$2$$)
};
$JSCompiler_prototypeAlias$$.$onBitexExecutionReport_$ = function $$JSCompiler_prototypeAlias$$$$onBitexExecutionReport_$$($e$$169_msg$$65$$) {
  $e$$169_msg$$65$$ = $e$$169_msg$$65$$.data;
  var $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$ = "Order " + ($e$$169_msg$$65$$.OrderID + " ");
  switch($e$$169_msg$$65$$.ExecType) {
    case "1":
      $JSCompiler_StaticMethods_showNotification$$(this, "success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "partially filled");
      break;
    case "2":
      $JSCompiler_StaticMethods_showNotification$$(this, "success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "filled");
      break;
    case "4":
      $JSCompiler_StaticMethods_showNotification$$(this, "success", $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "cancelled")
  }
};
$JSCompiler_prototypeAlias$$.$onBitexTwoFactorSecretResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexTwoFactorSecretResponse_$$($e$$170_msg$$66$$) {
  $e$$170_msg$$66$$ = $e$$170_msg$$66$$.data;
  this.$model_$.set("TwoFactorSecret", $e$$170_msg$$66$$.TwoFactorSecret);
  this.$model_$.set("TwoFactorEnabled", $e$$170_msg$$66$$.TwoFactorEnabled)
};
$JSCompiler_prototypeAlias$$.$onBitexBalanceResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexBalanceResponse_$$($e$$171_msg$$67$$) {
  $e$$171_msg$$67$$ = $e$$171_msg$$67$$.data;
  delete $e$$171_msg$$67$$.MsgType;
  delete $e$$171_msg$$67$$.BalanceReqID;
  $goog$object$forEach$$($e$$171_msg$$67$$, function($balances$$) {
    $goog$object$forEach$$($balances$$, function($balance$$1$$, $currency$$5$$) {
      $balance$$1$$ /= 1E8;
      var $balance_key$$1$$ = "balance_" + $currency$$5$$;
      this.$model_$.set($balance_key$$1$$, $balance$$1$$);
      this.$model_$.set("formatted_" + $balance_key$$1$$, this.$formatCurrency$($balance$$1$$, $currency$$5$$))
    }, this)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onUserWithdrawRequest_$ = function $$JSCompiler_prototypeAlias$$$$onUserWithdrawRequest_$$($e$$172$$) {
  this.$conn_$.$requestWithdraw$($e$$172$$.target.$request_id_$, $e$$172$$.target.$getAmount$(), $e$$172$$.target.$method_$, $e$$172$$.target.$currency_$, $e$$172$$.target.$getWithdrawData$())
};
$JSCompiler_prototypeAlias$$.$onUserConfirmWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onUserConfirmWithdraw_$$($e$$173$$) {
  this.$conn_$.$confirmWithdraw$($e$$173$$.target.$confirmation_token_$)
};
$JSCompiler_prototypeAlias$$.$onBrokerProcessWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerProcessWithdraw_$$($e$$174_handler$$84$$) {
  var $withdraw_data$$1$$ = $e$$174_handler$$84$$.target.$getWithdrawData$(), $request_id$$ = $e$$174_handler$$84$$.target.$request_id_$, $action$$3$$ = $e$$174_handler$$84$$.target.$withdraw_action_$;
  $e$$174_handler$$84$$ = this.$getHandler$();
  console.log("onBrokerProcessWithdraw_:" + $action$$3$$);
  if("CANCEL" === $action$$3$$) {
    var $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$ = $bitex$templates$CancelWithdrawDialogContent$$(), $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$ = $JSCompiler_StaticMethods_showDialog$$(this, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$, "Cancel withdraw", $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $select_reason_el$$ = $goog$dom$getElement$$("id_select_reason"), 
    $reason_el$$ = $goog$dom$getElement$$("id_custom_reason_text");
    $JSCompiler_StaticMethods_listen$$($e$$174_handler$$84$$, $select_reason_el$$, "change", function() {
      var $reason_id$$1$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$));
      $goog$style$showElement$$($reason_el$$, 0 === $reason_id$$1$$)
    });
    $JSCompiler_StaticMethods_listen$$($e$$174_handler$$84$$, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$176$$) {
      if("ok" == $e$$176$$.key) {
        var $reason_id$$2$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$)), $reason$$1$$;
        if(0 === $reason_id$$2$$ && ($reason$$1$$ = $goog$string$trim$$($goog$dom$forms$getValue$$($reason_el$$)), $goog$string$isEmpty$$($reason$$1$$))) {
          $e$$176$$.stopPropagation();
          $e$$176$$.preventDefault();
          $goog$dom$getElement$$("id_custom_reason_text").focus();
          return
        }
        this.$conn_$.$processWithdraw$($request_id$$, $action$$3$$, $withdraw_data$$1$$.WithdrawID, $reason_id$$2$$, $reason$$1$$)
      }
    }, this)
  }else {
    if("PROGRESS" === $action$$3$$) {
      this.$conn_$.$processWithdraw$($request_id$$, $action$$3$$, $withdraw_data$$1$$.WithdrawID)
    }else {
      if("COMPLETE" === $action$$3$$) {
        var $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$ = this.$model_$.get("Broker").WithdrawStructure[$withdraw_data$$1$$.Currency], $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$ = $bitex$templates$DepositWithdrawDialogContent$$({$side$:"broker", $currency$:$withdraw_data$$1$$.Currency, $currency_sign$:this.$currency_info_$[$withdraw_data$$1$$.Currency].$sign$, $methods$:$cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$}), 
        $dlg$$2$$ = $JSCompiler_StaticMethods_showDialog$$(this, $cancelWithdrawDlg_cancel_reason_dialog_content_dialogContent$$1_withdraw_methods$$1$$, this.$currency_info_$[$withdraw_data$$1$$.Currency].description + " withdrawal", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
        $JSCompiler_StaticMethods_listenOnce$$($e$$174_handler$$84$$, $dlg$$2$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$177$$) {
          "ok" == $e$$177$$.key && $bitex$util$getFormAsJSON$$($goog$dom$getFirstElementChild$$($dlg$$2$$.$getContentElement$()))
        }, this)
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$onUserOrderEntry_$ = function $$JSCompiler_prototypeAlias$$$$onUserOrderEntry_$$($e$$178_opt_client_id$$inline_668$$) {
  var $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$ = "BUY";
  "2" == $goog$dom$forms$getValue$$($e$$178_opt_client_id$$inline_668$$.target.$sideEl_$) && ($MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$ = "SELL");
  $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$ += " " + ($e$$178_opt_client_id$$inline_668$$.target.$getAmount$() + (" " + ($e$$178_opt_client_id$$inline_668$$.target.$getSymbol$() + ("  @ " + $JSCompiler_StaticMethods_getPrice$$($e$$178_opt_client_id$$inline_668$$.target)))));
  $JSCompiler_StaticMethods_showNotification$$(this, "info", "Sending order...", $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$);
  var $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$ = $e$$178_opt_client_id$$inline_668$$.target.$getSymbol$(), $qty$$inline_665$$ = $e$$178_opt_client_id$$inline_668$$.target.$getAmount$(), $price$$inline_666$$ = $JSCompiler_StaticMethods_getPrice$$($e$$178_opt_client_id$$inline_668$$.target), $side$$inline_667$$ = $goog$dom$forms$getValue$$($e$$178_opt_client_id$$inline_668$$.target.$sideEl_$);
  $e$$178_opt_client_id$$inline_668$$ = $goog$dom$forms$getValue$$($e$$178_opt_client_id$$inline_668$$.target.$clientIdEl_$);
  $JSCompiler_StaticMethods_sendOrder_$$(this.$conn_$, $MSG_SEND_ORDER_NOTIFICATION_CONTENT_side_msg_symbol$$inline_664$$, $qty$$inline_665$$, $price$$inline_666$$, $side$$inline_667$$, $e$$178_opt_client_id$$inline_668$$, $JSCompiler_alias_VOID$$)
};
$JSCompiler_prototypeAlias$$.$onUserCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onUserCancelOrder_$$($e$$179$$) {
  $e$$179$$.target.$client_order_id_$ != $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods_showNotification$$(this, "info", "Cancelling order...", ":" + $e$$179$$.target.$client_order_id_$) : $JSCompiler_StaticMethods_showNotification$$(this, "info", "Cancelling order...", ":" + $e$$179$$.target.$order_id_$);
  this.$conn_$.$cancelOrder$($e$$179$$.target.$client_order_id_$, $e$$179$$.target.$order_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserShowQr_$ = function $$JSCompiler_prototypeAlias$$$$onUserShowQr_$$($depositData_e$$180$$) {
  $depositData_e$$180$$ = $depositData_e$$180$$.target.$getDepositData$();
  var $MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE$$ = this.$currency_info_$[$depositData_e$$180$$.Currency].description + " deposit";
  $JSCompiler_StaticMethods_showDialog$$(this, $bitex$templates$DepositCryptoCurrencyContentDialog$$({$deposit_message$:$depositData_e$$180$$}), $MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE$$, $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$))
};
$JSCompiler_prototypeAlias$$.$onUserUploadReceipt_$ = function $$JSCompiler_prototypeAlias$$$$onUserUploadReceipt_$$($deposit_data_e$$181$$) {
  var $form_src$$1_model$$19$$ = this.$model_$;
  $deposit_data_e$$181$$ = $deposit_data_e$$181$$.target.$getDepositData$();
  var $broker$$9$$ = $form_src$$1_model$$19$$.get("Broker");
  $broker$$9$$ != $JSCompiler_alias_NULL$$ && ($form_src$$1_model$$19$$ = $goog$string$subs$$($broker$$9$$.UploadForm, $form_src$$1_model$$19$$.get("UserID"), $form_src$$1_model$$19$$.get("Username"), $deposit_data_e$$181$$.DepositMethodName, $deposit_data_e$$181$$.ControlNumber), window.open($form_src$$1_model$$19$$, "blank", "scrollbars=yes,toolbar=no,width=700,height=500"))
};
$JSCompiler_prototypeAlias$$.$onProcessDeposit_$ = function $$JSCompiler_prototypeAlias$$$$onProcessDeposit_$$($e$$182_handler$$85$$) {
  var $deposit_data$$1$$ = $e$$182_handler$$85$$.target.$getDepositData$(), $request_id$$1$$ = $e$$182_handler$$85$$.target.$request_id_$, $action$$4$$ = $e$$182_handler$$85$$.target.$getDepositAction$();
  $e$$182_handler$$85$$ = this.$getHandler$();
  if("CANCEL" === $action$$4$$) {
    var $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $bitex$templates$CancelDepositDialogContent$$(), $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $JSCompiler_StaticMethods_showDialog$$(this, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, "Cancel deposit", $bootstrap$Dialog$ButtonSet$createOkCancel$$()), 
    $select_reason_el$$1$$ = $goog$dom$getElement$$("id_select_reason"), $reason_el$$1$$ = $goog$dom$getElement$$("id_custom_reason_text");
    $JSCompiler_StaticMethods_listen$$($e$$182_handler$$85$$, $select_reason_el$$1$$, "change", function() {
      var $reason_id$$3$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$1$$));
      $goog$style$showElement$$($reason_el$$1$$, 0 === $reason_id$$3$$)
    });
    $JSCompiler_StaticMethods_listen$$($e$$182_handler$$85$$, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$184$$) {
      if("ok" == $e$$184$$.key) {
        var $reason_id$$4$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($select_reason_el$$1$$)), $reason$$2$$;
        if(0 === $reason_id$$4$$ && ($reason$$2$$ = $goog$string$trim$$($goog$dom$forms$getValue$$($reason_el$$1$$)), $goog$string$isEmpty$$($reason$$2$$))) {
          $e$$184$$.stopPropagation();
          $e$$184$$.preventDefault();
          $goog$dom$getElement$$("id_custom_reason_text").focus();
          return
        }
        this.$conn_$.$processDeposit$($request_id$$1$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID, $reason_id$$4$$, $reason$$2$$)
      }
    }, this)
  }else {
    if("PROGRESS" === $action$$4$$) {
      this.$conn_$.$processDeposit$($request_id$$1$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID)
    }else {
      if("COMPLETE" === $action$$4$$) {
        var $valueFormatter$$ = new $goog$i18n$NumberFormat$$(1), $paid_value_element_id$$ = Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ $goog$now$$()).toString(36), $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $deposit_data$$1$$.ControlNumber;
        "CRY" == $deposit_data$$1$$.Type && ($cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $deposit_data$$1$$.Data.InputAddress);
        $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $bitex$templates$BrokerConfirmDepositContent$$({$id_value$:$paid_value_element_id$$, $controlNumber$:$cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, $currencySign$:this.$currency_info_$[$deposit_data$$1$$.Currency].$sign$, value:$valueFormatter$$.$format$($deposit_data$$1$$.Value / 1E8)});
        $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$ = $JSCompiler_StaticMethods_showDialog$$(this, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, "Confirm deposit", $bootstrap$Dialog$ButtonSet$createOkCancel$$());
        $JSCompiler_StaticMethods_listen$$($e$$182_handler$$85$$, $cancelWithdrawDlg$$1_cancel_reason_dialog_content$$1_confirmDepositDlg_confirm_deposit_dialog_content_control_number$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$185$$) {
          if("ok" == $e$$185$$.key) {
            var $pos$$13$$ = [0], $raw_paid_value$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$($paid_value_element_id$$)), $paid_value$$2$$ = $valueFormatter$$.parse($raw_paid_value$$, $pos$$13$$);
            $pos$$13$$[0] != $raw_paid_value$$.length || isNaN($paid_value$$2$$) || 0 >= $paid_value$$2$$ ? ($e$$185$$.stopPropagation(), $e$$185$$.preventDefault(), $goog$dom$getElement$$($paid_value_element_id$$).focus()) : this.$conn_$.$processDeposit$($request_id$$1$$, $action$$4$$, $JSCompiler_alias_VOID$$, $deposit_data$$1$$.DepositID, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, 1E8 * $paid_value$$2$$)
          }
        }, this)
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$onUserDepositRequest_$ = function $$JSCompiler_prototypeAlias$$$$onUserDepositRequest_$$($MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$186$$) {
  var $currency$$6$$ = $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$186$$.target.$currency_$, $handler$$86$$ = this.$getHandler$();
  $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$186$$ = this.$currency_info_$[$currency$$6$$].description + " deposit";
  if(this.$currency_info_$[$currency$$6$$].$is_crypto$) {
    var $confirmDialogContent_dialogContent$$2$$ = $bitex$templates$ConfirmDepositCryptoCurrencyContentDialog$$({$currency_description$:this.$currency_info_$[$currency$$6$$].description}), $dlgConfirm$$ = $JSCompiler_StaticMethods_showDialog$$(this, $confirmDialogContent_dialogContent$$2$$, $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$186$$, $bootstrap$Dialog$ButtonSet$createYesNoCancel$$());
    $JSCompiler_StaticMethods_listen$$($handler$$86$$, $dlgConfirm$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$187_request_id$$2$$) {
      "yes" == $e$$187_request_id$$2$$.key && ($e$$187_request_id$$2$$.preventDefault(), $e$$187_request_id$$2$$.stopPropagation(), $e$$187_request_id$$2$$ = parseInt(1E7 * Math.random(), 10), this.$conn_$.$requestDeposit$($e$$187_request_id$$2$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $currency$$6$$), $goog$soy$renderElement$$($goog$dom$getFirstElementChild$$($dlgConfirm$$.$getContentElement$()), $bitex$templates$WaitingForDepositResponseDialogContent$$), $JSCompiler_StaticMethods_setButtonSet$$($dlgConfirm$$, 
      $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)), $JSCompiler_StaticMethods_listenOnce$$($handler$$86$$, this.$conn_$, "error_message." + $e$$187_request_id$$2$$, function() {
        $dlgConfirm$$.$dispose$()
      }), $JSCompiler_StaticMethods_listenOnce$$($handler$$86$$, this.$conn_$, "deposit_response." + $e$$187_request_id$$2$$, function($e$$189_msg$$68$$) {
        $e$$189_msg$$68$$ = $e$$189_msg$$68$$.data;
        $goog$soy$renderElement$$($goog$dom$getFirstElementChild$$($dlgConfirm$$.$getContentElement$()), $bitex$templates$DepositCryptoCurrencyContentDialog$$, {$deposit_message$:$e$$189_msg$$68$$})
      }))
    })
  }else {
    var $deposit_methods$$1$$ = [];
    $goog$array$forEach$$(this.$model_$.get("DepositMethods"), function($deposit_method$$1$$) {
      $deposit_method$$1$$.$currency$ == $currency$$6$$ && $deposit_methods$$1$$.push({method:$deposit_method$$1$$.id, description:$deposit_method$$1$$.description, disclaimer:$deposit_method$$1$$.$disclaimer$, fields:[]})
    }, this);
    var $confirmDialogContent_dialogContent$$2$$ = $bitex$templates$DepositWithdrawDialogContent$$({$currency$:$currency$$6$$, $currency_sign$:this.$currency_info_$[$currency$$6$$].$sign$, $methods$:$deposit_methods$$1$$}), $dlg$$4$$ = $JSCompiler_StaticMethods_showDialog$$(this, $confirmDialogContent_dialogContent$$2$$, $MSG_CURRENCY_DEPOSIT_DIALOG_TITLE_e$$186$$, $bootstrap$Dialog$ButtonSet$createOkCancel$$());
    $JSCompiler_StaticMethods_listen$$($handler$$86$$, $dlg$$4$$, $goog$ui$Dialog$EventType$SELECT$$, function($amount$$5_e$$190$$) {
      if("ok" == $amount$$5_e$$190$$.key) {
        $amount$$5_e$$190$$.preventDefault();
        $amount$$5_e$$190$$.stopPropagation();
        var $deposit_form_el$$ = $goog$dom$getFirstElementChild$$($dlg$$4$$.$getContentElement$()), $deposit_data$$2_deposit_method_id$$1$$ = $bitex$util$getFormAsJSON$$($deposit_form_el$$);
        $amount$$5_e$$190$$ = $goog$string$toNumber$$($deposit_data$$2_deposit_method_id$$1$$.Amount);
        $deposit_data$$2_deposit_method_id$$1$$ = $goog$string$toNumber$$($deposit_data$$2_deposit_method_id$$1$$.Method);
        if($goog$isNumber$$($amount$$5_e$$190$$) && !isNaN($amount$$5_e$$190$$)) {
          if("prepare" != $deposit_form_el$$.getAttribute("data-deposit-status")) {
            $dlg$$4$$.$dispose$()
          }else {
            var $request_id$$3$$ = parseInt(1E7 * Math.random(), 10);
            this.$conn_$.$requestDeposit$($request_id$$3$$, $deposit_data$$2_deposit_method_id$$1$$, $amount$$5_e$$190$$);
            $goog$soy$renderElement$$($deposit_form_el$$, $bitex$templates$WaitingForDepositResponseDialogContent$$);
            $JSCompiler_StaticMethods_listenOnce$$($handler$$86$$, this.$conn_$, "deposit_response." + $request_id$$3$$, function($e$$191$$) {
              $goog$soy$renderElement$$($deposit_form_el$$, $bitex$templates$DepositSlipContentDialog$$, {$deposit_id$:$e$$191$$.data.DepositID})
            })
          }
        }
      }
    })
  }
};
$JSCompiler_prototypeAlias$$.$onUserForgotPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserForgotPassword_$$($e$$192$$) {
  this.$conn_$.$forgotPassword$($e$$192$$.target.$getEmail$());
  this.$router_$.$setView$("set_new_password")
};
$JSCompiler_prototypeAlias$$.$onUserSetNewPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetNewPassword_$$($e$$193$$) {
  this.$conn_$.$resetPassword$($e$$193$$.target.$getToken$(), $e$$193$$.target.$getPassword$())
};
$JSCompiler_prototypeAlias$$.$onUserEnableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserEnableTwoFactor_$$() {
  var $code$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_step_verification")), $secret$$2$$ = "";
  $goog$string$isEmpty$$($code$$5$$) || ($secret$$2$$ = this.$model_$.get("TwoFactorSecret"));
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_TRUE$$, $secret$$2$$, $code$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserDisableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserDisableTwoFactor_$$() {
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$onBodyClick_$ = function $$JSCompiler_prototypeAlias$$$$onBodyClick_$$($e$$196$$) {
  var $view_name$$4$$ = $e$$196$$.target.getAttribute("data-switch-view");
  $view_name$$4$$ != $JSCompiler_alias_NULL$$ && ($e$$196$$.preventDefault(), $e$$196$$.stopPropagation(), this.$router_$.$setView$($view_name$$4$$))
};
$JSCompiler_prototypeAlias$$.$onBodyChange_$ = function $$JSCompiler_prototypeAlias$$$$onBodyChange_$$($e$$197_elements$$7$$) {
  if($goog$array$contains$$($goog$dom$classes$get$$($e$$197_elements$$7$$.target), "withdraw-method-selector")) {
    var $selected_method$$ = $goog$dom$forms$getValue$$($e$$197_elements$$7$$.target);
    $e$$197_elements$$7$$ = $goog$dom$getElementsByClass$$("withdraw-method");
    $goog$array$forEach$$($e$$197_elements$$7$$, function($element$$168_field_elements$$) {
      var $method$$5$$ = $element$$168_field_elements$$.getAttribute("data-withdraw-method");
      $goog$style$showElement$$($element$$168_field_elements$$, $method$$5$$ == $selected_method$$);
      $element$$168_field_elements$$ = $goog$dom$getElementsByClass$$("withdraw-field", $element$$168_field_elements$$);
      $goog$array$forEach$$($element$$168_field_elements$$, function($element$$169$$) {
        $element$$169$$.disabled = $method$$5$$ != $selected_method$$
      })
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$onUserLoginButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginButtonClick_$$($e$$198$$) {
  var $username$$8$$ = $e$$198$$.target.$getUsername$(), $password$$5$$ = $e$$198$$.target.$getPassword$();
  this.$model_$.set("Password", $e$$198$$.target.$getPassword$());
  this.$conn_$.login($username$$8$$, $password$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserLoginOk_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginOk_$$($e$$199_msg$$70$$) {
  $e$$199_msg$$70$$ = $e$$199_msg$$70$$.data;
  $goog$dom$classes$add$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
  this.$model_$.set("UserID", $e$$199_msg$$70$$.UserID);
  this.$model_$.set("Username", $e$$199_msg$$70$$.Username);
  this.$model_$.set("TwoFactorEnabled", $e$$199_msg$$70$$.TwoFactorEnabled);
  this.$model_$.set("IsBroker", $e$$199_msg$$70$$.IsBroker);
  this.$model_$.set("Broker", $e$$199_msg$$70$$.Broker);
  $e$$199_msg$$70$$.IsBroker ? $goog$dom$classes$add$$(document.body, "bitex-broker") : $goog$dom$classes$add$$(document.body, "bitex-non-broker");
  this.$conn_$.$requestBalances$();
  this.$conn_$.$requestDepositMethods$();
  this.$router_$.$setView$("offerbook")
};
$JSCompiler_prototypeAlias$$.$onUserLoginError_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginError_$$($dlg__e$$200_msg$$71$$) {
  $goog$dom$classes$add$$(document.body, "bitex-not-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  $dlg__e$$200_msg$$71$$ = $dlg__e$$200_msg$$71$$.data;
  this.$model_$.set("UserID", "");
  this.$model_$.set("Username", "");
  $dlg__e$$200_msg$$71$$.NeedSecondFactor ? ($dlg__e$$200_msg$$71$$ = $JSCompiler_StaticMethods_showDialog$$(this, "2 steps authentication", $bitex$templates$GoogleAuthenticationCodeDialogContent$$(), $bootstrap$Dialog$ButtonSet$createOkCancel$$()), $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg__e$$200_msg$$71$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$201_second_factor$$) {
    "ok" == $e$$201_second_factor$$.key && ($e$$201_second_factor$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_factor")), this.$conn_$.login(this.$loginView_$.$getUsername$(), this.$loginView_$.$getPassword$(), $e$$201_second_factor$$))
  })) : $JSCompiler_StaticMethods_showDialog$$(this, $dlg__e$$200_msg$$71$$.UserStatusText)
};
$JSCompiler_prototypeAlias$$.$onUserSignupButton_$ = function $$JSCompiler_prototypeAlias$$$$onUserSignupButton_$$($e$$202$$) {
  this.$model_$.set("Password", $e$$202$$.target.$getPassword$());
  this.$conn_$.$signUp$($e$$202$$.target.$getUsername$(), $e$$202$$.target.$getPassword$(), $e$$202$$.target.$getEmail$(), $e$$202$$.target.$getState$(), $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $goog$string$toNumber$$($goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker"))))
};
$JSCompiler_prototypeAlias$$.$onBeforeSetView_$ = function $$JSCompiler_prototypeAlias$$$$onBeforeSetView_$$($e$$203_view_id$$4$$) {
  $e$$203_view_id$$4$$ = $e$$203_view_id$$4$$.$view_id$;
  if(!this.$conn_$.$logged_$) {
    switch($e$$203_view_id$$4$$) {
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
  $goog$dom$classes$add$$(document.body, "active-view-" + $e$$203_view_id$$4$$)
};
$JSCompiler_prototypeAlias$$.$formatCurrency$ = function $$JSCompiler_prototypeAlias$$$$formatCurrency$$($amount$$6$$, $currency_code$$1$$) {
  var $currency_def$$1$$ = this.$currency_info_$[$currency_code$$1$$];
  return(new $goog$i18n$NumberFormat$$($currency_def$$1$$.$format$, $currency_def$$1$$.code)).$format$($amount$$6$$)
};
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($e$$204_msg$$72$$) {
  $e$$204_msg$$72$$ = $e$$204_msg$$72$$.data;
  $goog$array$forEach$$($e$$204_msg$$72$$.Currencies, function($currency$$7$$) {
    this.$currency_info_$[$currency$$7$$.Code] = {code:$currency$$7$$.Code, $format$:$currency$$7$$.FormatJS, description:$currency$$7$$.Description, $sign$:$currency$$7$$.Sign, $pip$:$currency$$7$$.Pip, $is_crypto$:$currency$$7$$.IsCrypto};
    var $balance_key$$2$$ = "balance_" + $currency$$7$$.Code;
    this.$model_$.set($balance_key$$2$$, 0);
    this.$model_$.set("formatted_" + $balance_key$$2$$, this.$formatCurrency$(0, $currency$$7$$.Code))
  }, this);
  var $symbols$$2$$ = [];
  $goog$array$forEach$$($e$$204_msg$$72$$.Instruments, function($instrument$$2$$) {
    var $symbol$$12$$ = $instrument$$2$$.Symbol;
    this.$all_markets_$[$symbol$$12$$] = {$symbol$:$symbol$$12$$, description:$instrument$$2$$.Description};
    $symbols$$2$$.push($symbol$$12$$)
  }, this);
  this.$model_$.set("SecurityList", $e$$204_msg$$72$$)
};
$JSCompiler_prototypeAlias$$.$onModelSetBroker_$ = function $$JSCompiler_prototypeAlias$$$$onModelSetBroker_$$($e$$205$$) {
  var $broker$$10$$ = $e$$205$$.data, $allowed_markets$$2$$ = {}, $broker_currencies$$4$$ = $broker$$10$$.Currencies.split(",");
  $goog$array$forEach$$($broker$$10$$.CryptoCurrencies, function($crypto_currency$$) {
    $broker_currencies$$4$$.push($crypto_currency$$.CurrencyCode);
    $goog$object$findKey$$(this.$all_markets_$, function($market_info$$, $symbol$$13$$) {
      if(0 <= $symbol$$13$$.indexOf($crypto_currency$$.CurrencyCode)) {
        return $JSCompiler_alias_TRUE$$
      }
    }) != $JSCompiler_alias_NULL$$ && $goog$array$forEach$$($broker$$10$$.Currencies.split(","), function($currency$$8$$) {
      var $market_currency$$ = $goog$object$findKey$$(this.$all_markets_$, function($market_info$$1$$, $symbol$$14$$) {
        if(0 <= $symbol$$14$$.indexOf($currency$$8$$)) {
          return $JSCompiler_alias_TRUE$$
        }
      });
      $market_currency$$ != $JSCompiler_alias_NULL$$ && ($allowed_markets$$2$$[$market_currency$$] = this.$all_markets_$[$market_currency$$])
    }, this)
  }, this);
  this.$model_$.set("BrokerCurrencies", $broker_currencies$$4$$);
  this.$model_$.set("AllowedMarkets", $allowed_markets$$2$$)
};
$JSCompiler_prototypeAlias$$.$onBrokerListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerListResponse_$$($e$$206$$) {
  var $msg$$73$$ = $e$$206$$.data;
  $goog$array$forEach$$($msg$$73$$.BrokerListGrp, function($broker_array$$1$$) {
    var $broker_info$$6$$ = {};
    $goog$array$forEach$$($msg$$73$$.Columns, function($column$$6$$, $index$$80$$) {
      $broker_info$$6$$[$column$$6$$] = $broker_array$$1$$[$index$$80$$]
    }, this);
    $broker_info$$6$$.CountryCode in this.$brokers_by_country_$ ? this.$brokers_by_country_$[$broker_info$$6$$.CountryCode].push($broker_info$$6$$) : this.$brokers_by_country_$[$broker_info$$6$$.CountryCode] = [$broker_info$$6$$]
  }, this);
  this.$model_$.set("BrokerList", $msg$$73$$)
};
$JSCompiler_prototypeAlias$$.$onUserConnectBitEx_$ = function $$JSCompiler_prototypeAlias$$$$onUserConnectBitEx_$$() {
  $JSCompiler_StaticMethods_connectBitEx$$(this)
};
$JSCompiler_prototypeAlias$$.$onConnectionOpen_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionOpen_$$() {
  $goog$dom$classes$remove$$(document.body, "ws-not-connected");
  $goog$dom$classes$add$$(document.body, "ws-connected");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  this.$model_$.get("SecurityList") != $JSCompiler_alias_NULL$$ || this.$conn_$.$requestSecurityList$();
  this.$model_$.get("BrokerList") != $JSCompiler_alias_NULL$$ || this.$conn_$.$requestBrokerList$();
  var $username$$9$$ = this.$model_$.get("Username"), $password$$6$$ = this.$model_$.get("Password");
  $username$$9$$ != $JSCompiler_alias_NULL$$ && $password$$6$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($username$$9$$) && !$goog$string$isEmpty$$($password$$6$$) && 8 <= $password$$6$$.length && this.$conn_$.login($username$$9$$, $password$$6$$)
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
  $JSCompiler_StaticMethods_showNotification$$(this, "error", "Error", "detected with the connection.");
  this.$router_$.$setView$("start")
};
$JSCompiler_prototypeAlias$$.$onConnectionErrorMessage_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionErrorMessage_$$($e$$211_msg$$74$$) {
  $e$$211_msg$$74$$ = $e$$211_msg$$74$$.data;
  $JSCompiler_StaticMethods_showNotification$$(this, "error", "Message from server:", $e$$211_msg$$74$$.Description + " - " + $e$$211_msg$$74$$.Detail, this.$error_message_alert_timeout_$)
};
function $JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_showDialog$self$$, $content$$18$$, $opt_title$$3_title$$8$$, $buttonSet$$1_opt_button_set$$) {
  $opt_title$$3_title$$8$$ = $opt_title$$3_title$$8$$ || "Error";
  $buttonSet$$1_opt_button_set$$ = $buttonSet$$1_opt_button_set$$ || $JSCompiler_StaticMethods_addButton$$(new $bootstrap$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$dispose$(), $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ = $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ = new $bootstrap$Dialog$$;
  var $JSCompiler_StaticMethods_setTitle$self$$inline_675$$ = $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_675$$.$title_$ = $opt_title$$3_title$$8$$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_675$$.$titleTextEl_$ && $goog$dom$setTextContent$$($JSCompiler_StaticMethods_setTitle$self$$inline_675$$.$titleTextEl_$, $opt_title$$3_title$$8$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$setContent$($content$$18$$);
  $JSCompiler_StaticMethods_setButtonSet$$($JSCompiler_StaticMethods_showDialog$self$$.$dialog_$, $buttonSet$$1_opt_button_set$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$setVisible$($JSCompiler_alias_TRUE$$);
  return $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$
}
function $JSCompiler_StaticMethods_showNotification$$($JSCompiler_StaticMethods_showNotification$self$$, $type$$109$$, $alert_content_title$$9$$, $content$$19$$, $opt_display_time$$) {
  var $display_time$$ = 3E3;
  $goog$isNumber$$($opt_display_time$$) && ($display_time$$ = $opt_display_time$$);
  $alert_content_title$$9$$ = $goog$dom$createDom$$("span", $JSCompiler_alias_VOID$$, [$goog$dom$createDom$$("strong", $JSCompiler_alias_VOID$$, $alert_content_title$$9$$), " ", $content$$19$$]);
  var $notification$$ = new $bootstrap$Alert$$($type$$109$$, $alert_content_title$$9$$, $JSCompiler_alias_TRUE$$);
  $notification$$.render($goog$dom$getElement$$("id_notifications"));
  if(0 < $display_time$$) {
    var $handler$$88$$ = $JSCompiler_StaticMethods_showNotification$self$$.$getHandler$();
    $goog$Timer$callOnce$$(function() {
      var $anim$$3$$ = new $goog$fx$dom$FadeOutAndHide$$($notification$$.$getElement$(), 200);
      $JSCompiler_StaticMethods_listenOnce$$($handler$$88$$, $anim$$3$$, "end", function() {
        $notification$$.$dispose$();
        $anim$$3$$.$dispose$()
      });
      $anim$$3$$.play()
    }, $display_time$$, $JSCompiler_StaticMethods_showNotification$self$$)
  }
}
$goog$exportPath_$$("bitex.app.satoshi_square", function($setNewPasswordView$$inline_681_url$$33$$) {
  var $JSCompiler_StaticMethods_run$self$$inline_678$$ = new $bitex$app$SatoshiSquare$$;
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_withdraw_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_deposit_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_customers_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_trade_history_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_balances_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_trades_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_deposits_id"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_withdraw_list"), $bitex$templates$DataGrid$$, {id:"id_withdraw_list_table", title:"Withdrawal history"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_deposit_list"), $bitex$templates$DataGrid$$, {id:"id_deposit_list_table", title:"Deposits", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Search ..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_customers_well"), $bitex$templates$DataGrid$$, {id:"id_customer_table", title:"Customers", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Username or email..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_trade_history_well"), $bitex$templates$DataGrid$$, {id:"id_trade_history_table"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"), $bitex$templates$DataGrid$$, {id:"account_overview_withdraw_requests_table_id", title:"Withdraw requests..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_trades_id"), $bitex$templates$DataGrid$$, {id:"account_overview_trades_table_id", title:"Trades"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_deposits_id"), $bitex$templates$DataGrid$$, {id:"account_overview_deposits_table_id", title:"Deposits", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Search ..."});
  $goog$dom$removeChildren$$($goog$dom$getElement$$("offer_book_order_entry_content"));
  var $buy_order_entry_el$$inline_820_loginView$$inline_682$$ = $goog$soy$renderAsElement$$({id:"id_order_entry_buy", $symbol$:"", $side$:1, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$}), $sell_order_entry_el$$inline_821_signUpView$$inline_683$$ = $goog$soy$renderAsElement$$({id:"id_order_entry_sell", $symbol$:"", $side$:2, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$});
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($buy_order_entry_el$$inline_820_loginView$$inline_682$$);
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($sell_order_entry_el$$inline_821_signUpView$$inline_683$$);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_bid_content"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_ask_content"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_bid_content"), $bitex$templates$OrderBook$$, {id:"order_book_bid", title:"BID", $columns$:["Buyer", "Amount", "Price"]});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_ask_content"), $bitex$templates$OrderBook$$, {id:"order_book_offer", title:"ASK", $columns$:["Price", "Amount", "Seller"]});
  $JSCompiler_StaticMethods_run$self$$inline_678$$.$url_$ = $setNewPasswordView$$inline_681_url$$33$$;
  var $handler$$inline_698_startView$$inline_680$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_678$$);
  $setNewPasswordView$$inline_681_url$$33$$ = new $bitex$view$SetNewPasswordView$$($JSCompiler_StaticMethods_run$self$$inline_678$$);
  var $buy_order_entry_el$$inline_820_loginView$$inline_682$$ = new $bitex$view$LoginView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $sell_order_entry_el$$inline_821_signUpView$$inline_683$$ = new $bitex$view$SignupView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $forgotPasswordView$$inline_684$$ = new $bitex$view$ForgotPasswordView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $tosView$$inline_685$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), 
  $depositView$$inline_686$$ = new $bitex$view$DepositView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $verificationView$$inline_687$$ = new $bitex$view$VerificationView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $enableTwoFactorView$$inline_688$$ = new $bitex$view$TwoFactorView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $offerBookView$$inline_689$$ = new $bitex$view$OfferBookView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $accountActivityView$$inline_690$$ = 
  new $bitex$view$AccountActivityView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $withdrawView$$inline_691$$ = new $bitex$view$WithdrawView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $customersView$$inline_692$$ = new $bitex$view$CustomersView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $accountOverviewView$$inline_693$$ = new $bitex$view$AccountOverview$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $sideBarView$$inline_694$$ = new $bitex$view$SideBarView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), 
  $brokerView$$inline_695$$ = new $bitex$view$BrokerView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $tradingView$$inline_696$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_678$$), $toolBarView$$inline_697$$ = new $bitex$view$ToolBarView$$($JSCompiler_StaticMethods_run$self$$inline_678$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $toolBarView$$inline_697$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $sideBarView$$inline_694$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $handler$$inline_698_startView$$inline_680$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $setNewPasswordView$$inline_681_url$$33$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $buy_order_entry_el$$inline_820_loginView$$inline_682$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $sell_order_entry_el$$inline_821_signUpView$$inline_683$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $forgotPasswordView$$inline_684$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $tosView$$inline_685$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $tradingView$$inline_696$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $offerBookView$$inline_689$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $depositView$$inline_686$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $withdrawView$$inline_691$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $accountActivityView$$inline_690$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $customersView$$inline_692$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $accountOverviewView$$inline_693$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $verificationView$$inline_687$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $enableTwoFactorView$$inline_688$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, $brokerView$$inline_695$$);
  $handler$$inline_698_startView$$inline_680$$.$decorate$($goog$dom$getElement$$("start"));
  $setNewPasswordView$$inline_681_url$$33$$.$decorate$($goog$dom$getElement$$("set_new_password"));
  $buy_order_entry_el$$inline_820_loginView$$inline_682$$.$decorate$($goog$dom$getElement$$("signin"));
  $sell_order_entry_el$$inline_821_signUpView$$inline_683$$.$decorate$($goog$dom$getElement$$("signup"));
  $forgotPasswordView$$inline_684$$.$decorate$($goog$dom$getElement$$("forgot_password"));
  $tosView$$inline_685$$.$decorate$($goog$dom$getElement$$("tos"));
  $tradingView$$inline_696$$.$decorate$($goog$dom$getElement$$("trading"));
  $offerBookView$$inline_689$$.$decorate$($goog$dom$getElement$$("offerbook"));
  $depositView$$inline_686$$.$decorate$($goog$dom$getElement$$("deposit"));
  $withdrawView$$inline_691$$.$decorate$($goog$dom$getElement$$("withdraw"));
  $accountActivityView$$inline_690$$.$decorate$($goog$dom$getElement$$("account_activity"));
  $customersView$$inline_692$$.$decorate$($goog$dom$getElement$$("customers"));
  $accountOverviewView$$inline_693$$.$decorate$($goog$dom$getElement$$("account_overview"));
  $verificationView$$inline_687$$.$decorate$($goog$dom$getElement$$("verification"));
  $enableTwoFactorView$$inline_688$$.$decorate$($goog$dom$getElement$$("enable_two_factor"));
  $sideBarView$$inline_694$$.$decorate$($goog$dom$getElement$$("id_sidebar"));
  $toolBarView$$inline_697$$.$decorate$($goog$dom$getElement$$("id_toolbar"));
  $brokerView$$inline_695$$.$decorate$($goog$dom$getElement$$("my_broker"));
  $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$.$decorate$(document.body);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(start)", $handler$$inline_698_startView$$inline_680$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(set_new_password)", $setNewPasswordView$$inline_681_url$$33$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(signin)", $buy_order_entry_el$$inline_820_loginView$$inline_682$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(signup)", $sell_order_entry_el$$inline_821_signUpView$$inline_683$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(forgot_password)", $forgotPasswordView$$inline_684$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(tos)", $tosView$$inline_685$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(trading)", $tradingView$$inline_696$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(offerbook)", $offerBookView$$inline_689$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(deposit)", $depositView$$inline_686$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(withdraw)", $withdrawView$$inline_691$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(account_activity)", $accountActivityView$$inline_690$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(customers)", $customersView$$inline_692$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(account_overview)/(\\w+)/$", $accountOverviewView$$inline_693$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(verification)", $verificationView$$inline_687$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(enable_two_factor)", $enableTwoFactorView$$inline_688$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "(my_broker)", $brokerView$$inline_695$$);
  $JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$.$setView$("start");
  $JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$.init();
  $JSCompiler_StaticMethods_run$self$$inline_678$$.$loginView_$ = $buy_order_entry_el$$inline_820_loginView$$inline_682$$;
  $handler$$inline_698_startView$$inline_680$$ = $JSCompiler_StaticMethods_run$self$$inline_678$$.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$router_$, "set_view", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBeforeSetView_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "opened", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onConnectionOpen_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "closed", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onConnectionClose_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "error", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onConnectionError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "error_message", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onConnectionErrorMessage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "broker_list", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBrokerListResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "security_list", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onSecurityList_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "login_ok", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserLoginOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "login_error", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserLoginError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "two_factor_secret", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexTwoFactorSecretResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "balance_response", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexBalanceResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "pwd_changed_ok", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexPasswordChangedOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "pwd_changed_error", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexPasswordChangedError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "deposit_methods_response", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexDepositMethodsResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "withdraw_refresh", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexWithdrawIncrementalUpdate_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "execution_report", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexExecutionReport_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "raw_message", $goog$bind$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexRawMessageLogger_$, $JSCompiler_StaticMethods_run$self$$inline_678$$, "receive"));
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$conn_$, "sent_raw_message", $goog$bind$$($JSCompiler_StaticMethods_run$self$$inline_678$$.$onBitexRawMessageLogger_$, $JSCompiler_StaticMethods_run$self$$inline_678$$, "send"));
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, document.body, "click", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBodyClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, document.body, "change", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBodyChange_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $sell_order_entry_el$$inline_821_signUpView$$inline_683$$, "signup_click", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserSignupButton_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $buy_order_entry_el$$inline_820_loginView$$inline_682$$, "login_click", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserLoginButtonClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $enableTwoFactorView$$inline_688$$, "two_factor_enable", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserEnableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $enableTwoFactorView$$inline_688$$, "two_factor_disable", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserDisableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $forgotPasswordView$$inline_684$$, "recover_pwd", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserForgotPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $setNewPasswordView$$inline_681_url$$33$$, "set_new_pwd", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserSetNewPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $sideBarView$$inline_694$$, "changed_market", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserChangeMarket_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "order_entry_submitted", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "cancel_order", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserCancelOrder_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "md_subscribe", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserMarketDataSubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "md_unsubscribe", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserMarketDataUnsubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "order_entry_submitted", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "request_withdraw", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserWithdrawRequest_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "confirm_withdraw", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserConfirmWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "process_withdraw", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onBrokerProcessWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "request_deposit", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserDepositRequest_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "process_deposit", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onProcessDeposit_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$model_$, "model_setBroker", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onModelSetBroker_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "connect_bitex", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserConnectBitEx_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "show_qr", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserShowQr_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_698_startView$$inline_680$$, $JSCompiler_StaticMethods_run$self$$inline_678$$.$views_$, "upload_receipt", $JSCompiler_StaticMethods_run$self$$inline_678$$.$onUserUploadReceipt_$);
  $JSCompiler_StaticMethods_connectBitEx$$($JSCompiler_StaticMethods_run$self$$inline_678$$)
});

