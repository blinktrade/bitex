// Input 0
function $JSCompiler_alias_THROW$$($jscomp_throw_param$$) {
  throw $jscomp_throw_param$$;
}
var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
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
var $ua$$inline_66$$;
if($ua$$inline_66$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_67$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_66$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_66$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_66$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_67$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_69$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_69$$ && $navigator$$inline_69$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_72$$ = "", $re$$inline_73$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_74$$ = $goog$global$$.opera.version, $version$$inline_72$$ = "function" == typeof $operaVersion$$inline_74$$ ? $operaVersion$$inline_74$$() : $operaVersion$$inline_74$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_73$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_73$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_73$$ = /WebKit\/(\S+)/), $re$$inline_73$$) {
      var $arr$$inline_75$$ = $re$$inline_73$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_72$$ = $arr$$inline_75$$ ? $arr$$inline_75$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_76$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_76$$ > parseFloat($version$$inline_72$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_76$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_72$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$46_order$$inline_80$$;
  if(!($JSCompiler_temp$$46_order$$inline_80$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$46_order$$inline_80$$ = 0;
    for(var $v1Subs$$inline_81$$ = String($goog$userAgent$VERSION$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $v2Subs$$inline_82$$ = String($version$$8$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $subCount$$inline_83$$ = Math.max($v1Subs$$inline_81$$.length, $v2Subs$$inline_82$$.length), $subIdx$$inline_84$$ = 0;0 == $JSCompiler_temp$$46_order$$inline_80$$ && $subIdx$$inline_84$$ < $subCount$$inline_83$$;$subIdx$$inline_84$$++) {
      var $v1Sub$$inline_85$$ = $v1Subs$$inline_81$$[$subIdx$$inline_84$$] || "", $v2Sub$$inline_86$$ = $v2Subs$$inline_82$$[$subIdx$$inline_84$$] || "", $v1CompParser$$inline_87$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_88$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_89$$ = $v1CompParser$$inline_87$$.exec($v1Sub$$inline_85$$) || ["", "", ""], $v2Comp$$inline_90$$ = $v2CompParser$$inline_88$$.exec($v2Sub$$inline_86$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_89$$[0].length && 0 == $v2Comp$$inline_90$$[0].length) {
          break
        }
        $JSCompiler_temp$$46_order$$inline_80$$ = ((0 == $v1Comp$$inline_89$$[1].length ? 0 : parseInt($v1Comp$$inline_89$$[1], 10)) < (0 == $v2Comp$$inline_90$$[1].length ? 0 : parseInt($v2Comp$$inline_90$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_89$$[1].length ? 0 : parseInt($v1Comp$$inline_89$$[1], 10)) > (0 == $v2Comp$$inline_90$$[1].length ? 0 : parseInt($v2Comp$$inline_90$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_89$$[2].length) < (0 == $v2Comp$$inline_90$$[2].length) ? -1 : (0 == $v1Comp$$inline_89$$[2].length) > 
        (0 == $v2Comp$$inline_90$$[2].length) ? 1 : 0) || ($v1Comp$$inline_89$$[2] < $v2Comp$$inline_90$$[2] ? -1 : $v1Comp$$inline_89$$[2] > $v2Comp$$inline_90$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$46_order$$inline_80$$)
    }
    $JSCompiler_temp$$46_order$$inline_80$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$46_order$$inline_80$$
  }
  return $JSCompiler_temp$$46_order$$inline_80$$
}
var $doc$$inline_92$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_92$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_92$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
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
var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
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
      var $JSCompiler_inline_result$$19$$;
      a: {
        if($arg$$5$$ && "number" == typeof $arg$$5$$.length) {
          if($goog$isObject$$($arg$$5$$)) {
            $JSCompiler_inline_result$$19$$ = "function" == typeof $arg$$5$$.item || "string" == typeof $arg$$5$$.item;
            break a
          }
          if($goog$isFunction$$($arg$$5$$)) {
            $JSCompiler_inline_result$$19$$ = "function" == typeof $arg$$5$$.item;
            break a
          }
        }
        $JSCompiler_inline_result$$19$$ = $JSCompiler_alias_FALSE$$
      }
      $goog$array$forEach$$($JSCompiler_inline_result$$19$$ ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$)
    }else {
      $childHandler$$($arg$$5$$)
    }
  }
}
function $goog$dom$append$$($parent$$8$$, $var_args$$68$$) {
  $goog$dom$append_$$($goog$dom$getOwnerDocument$$($parent$$8$$), $parent$$8$$, arguments, 1)
}
function $goog$dom$removeChildren$$($node$$6$$) {
  for(var $child$$3$$;$child$$3$$ = $node$$6$$.firstChild;) {
    $node$$6$$.removeChild($child$$3$$)
  }
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
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_97$$) {
  var $doc$$inline_96_win$$inline_98$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_97$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_97$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_96_win$$inline_98$$.compatMode ? $doc$$inline_96_win$$inline_98$$.documentElement : $doc$$inline_96_win$$inline_98$$.body;
  $doc$$inline_96_win$$inline_98$$ = $goog$dom$getWindow_$$($doc$$inline_96_win$$inline_98$$);
  return new $goog$math$Coordinate$$($doc$$inline_96_win$$inline_98$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_97$$.scrollLeft, $doc$$inline_96_win$$inline_98$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_97$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.$removeChildren$ = $goog$dom$removeChildren$$;
function $JSCompiler_StaticMethods_insertChildAt$$($parent$$9$$, $child$$4$$, $index$$54$$) {
  $parent$$9$$.insertBefore($child$$4$$, $parent$$9$$.childNodes[$index$$54$$] || $JSCompiler_alias_NULL$$)
}
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
// Input 17
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
// Input 18
// Input 19
function $goog$style$setStyle_$$($element$$33$$, $value$$67$$, $prefixedStyle$$inline_103_style$$1$$) {
  var $camelStyle$$inline_102_propertyName$$8$$;
  a: {
    if($camelStyle$$inline_102_propertyName$$8$$ = $goog$string$toCamelCase$$($prefixedStyle$$inline_103_style$$1$$), $element$$33$$.style[$camelStyle$$inline_102_propertyName$$8$$] === $JSCompiler_alias_VOID$$ && ($prefixedStyle$$inline_103_style$$1$$ = ($goog$userAgent$WEBKIT$$ ? "Webkit" : $goog$userAgent$GECKO$$ ? "Moz" : $goog$userAgent$IE$$ ? "ms" : $goog$userAgent$OPERA$$ ? "O" : $JSCompiler_alias_NULL$$) + $goog$string$toTitleCase$$($prefixedStyle$$inline_103_style$$1$$), $element$$33$$.style[$prefixedStyle$$inline_103_style$$1$$] !== 
    $JSCompiler_alias_VOID$$)) {
      $camelStyle$$inline_102_propertyName$$8$$ = $prefixedStyle$$inline_103_style$$1$$;
      break a
    }
  }
  $camelStyle$$inline_102_propertyName$$8$$ && ($element$$33$$.style[$camelStyle$$inline_102_propertyName$$8$$] = $value$$67$$)
}
function $goog$style$getComputedStyle$$($element$$37$$, $property$$4$$) {
  var $doc$$24_styles$$ = $goog$dom$getOwnerDocument$$($element$$37$$);
  return $doc$$24_styles$$.defaultView && $doc$$24_styles$$.defaultView.getComputedStyle && ($doc$$24_styles$$ = $doc$$24_styles$$.defaultView.getComputedStyle($element$$37$$, $JSCompiler_alias_NULL$$)) ? $doc$$24_styles$$[$property$$4$$] || $doc$$24_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getStyle_$$($element$$39$$, $style$$5$$) {
  return $goog$style$getComputedStyle$$($element$$39$$, $style$$5$$) || ($element$$39$$.currentStyle ? $element$$39$$.currentStyle[$style$$5$$] : $JSCompiler_alias_NULL$$) || $element$$39$$.style && $element$$39$$.style[$style$$5$$]
}
function $goog$style$setPosition$$($el$$4$$, $arg1$$76_y$$38$$, $opt_arg2$$) {
  var $x$$60$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1$$76_y$$38$$ instanceof $goog$math$Coordinate$$ ? ($x$$60$$ = $arg1$$76_y$$38$$.x, $arg1$$76_y$$38$$ = $arg1$$76_y$$38$$.y) : ($x$$60$$ = $arg1$$76_y$$38$$, $arg1$$76_y$$38$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$60$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1$$76_y$$38$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$setSize$$($element$$52$$, $w$$6$$, $h$$5_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$5_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$5_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $goog$style$setWidth$$($element$$52$$, $w$$6$$);
  $element$$52$$.style.height = $goog$style$getPixelStyleValue_$$($h$$5_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$68$$, $round$$) {
  "number" == typeof $value$$68$$ && ($value$$68$$ = ($round$$ ? Math.round($value$$68$$) : $value$$68$$) + "px");
  return $value$$68$$
}
function $goog$style$setWidth$$($element$$54$$, $width$$13$$) {
  $element$$54$$.style.width = $goog$style$getPixelStyleValue_$$($width$$13$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getSize$$($element$$55_size$$10$$) {
  if("none" != $goog$style$getStyle_$$($element$$55_size$$10$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$55_size$$10$$)
  }
  var $style$$6$$ = $element$$55_size$$10$$.style, $originalDisplay$$ = $style$$6$$.display, $originalVisibility$$ = $style$$6$$.visibility, $originalPosition$$ = $style$$6$$.position;
  $style$$6$$.visibility = "hidden";
  $style$$6$$.position = "absolute";
  $style$$6$$.display = "inline";
  $element$$55_size$$10$$ = $goog$style$getSizeWithDisplay_$$($element$$55_size$$10$$);
  $style$$6$$.display = $originalDisplay$$;
  $style$$6$$.position = $originalPosition$$;
  $style$$6$$.visibility = $originalVisibility$$;
  return $element$$55_size$$10$$
}
function $goog$style$getSizeWithDisplay_$$($doc$$inline_110_element$$56$$) {
  var $offsetWidth_rect$$inline_109$$ = $doc$$inline_110_element$$56$$.offsetWidth, $offsetHeight$$ = $doc$$inline_110_element$$56$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_109$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth_rect$$inline_109$$) || $webkitOffsetsZero$$) && $doc$$inline_110_element$$56$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_109$$ = $doc$$inline_110_element$$56$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_110_element$$56$$ = $doc$$inline_110_element$$56$$.ownerDocument, $offsetWidth_rect$$inline_109$$.left -= $doc$$inline_110_element$$56$$.documentElement.clientLeft + $doc$$inline_110_element$$56$$.body.clientLeft, $offsetWidth_rect$$inline_109$$.top -= 
  $doc$$inline_110_element$$56$$.documentElement.clientTop + $doc$$inline_110_element$$56$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_109$$.right - $offsetWidth_rect$$inline_109$$.left, $offsetWidth_rect$$inline_109$$.bottom - $offsetWidth_rect$$inline_109$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_109$$, $offsetHeight$$)
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
function $goog$style$getIePixelBorder_$$($element$$69$$, $prop$$4$$) {
  if("none" == ($element$$69$$.currentStyle ? $element$$69$$.currentStyle[$prop$$4$$ + "Style"] : $JSCompiler_alias_NULL$$)) {
    return 0
  }
  var $pixelValue$$inline_118_width$$15$$ = $element$$69$$.currentStyle ? $element$$69$$.currentStyle[$prop$$4$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$13_oldStyleValue$$inline_116$$;
  if($pixelValue$$inline_118_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$13_oldStyleValue$$inline_116$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_118_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_118_width$$15$$)) {
      $JSCompiler_temp$$13_oldStyleValue$$inline_116$$ = parseInt($pixelValue$$inline_118_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$13_oldStyleValue$$inline_116$$ = $element$$69$$.style.left;
      var $oldRuntimeValue$$inline_117$$ = $element$$69$$.runtimeStyle.left;
      $element$$69$$.runtimeStyle.left = $element$$69$$.currentStyle.left;
      $element$$69$$.style.left = $pixelValue$$inline_118_width$$15$$;
      $pixelValue$$inline_118_width$$15$$ = $element$$69$$.style.pixelLeft;
      $element$$69$$.style.left = $JSCompiler_temp$$13_oldStyleValue$$inline_116$$;
      $element$$69$$.runtimeStyle.left = $oldRuntimeValue$$inline_117$$;
      $JSCompiler_temp$$13_oldStyleValue$$inline_116$$ = $pixelValue$$inline_118_width$$15$$
    }
  }
  return $JSCompiler_temp$$13_oldStyleValue$$inline_116$$
}
function $goog$style$getBorderBox$$($bottom$$5_element$$70$$) {
  if($goog$userAgent$IE$$) {
    var $left$$8$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$70$$, "borderLeft"), $right$$9$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$70$$, "borderRight"), $top$$6$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$70$$, "borderTop");
    $bottom$$5_element$$70$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$70$$, "borderBottom");
    return new $goog$math$Box$$($top$$6$$, $right$$9$$, $bottom$$5_element$$70$$, $left$$8$$)
  }
  $left$$8$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$70$$, "borderLeftWidth");
  $right$$9$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$70$$, "borderRightWidth");
  $top$$6$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$70$$, "borderTopWidth");
  $bottom$$5_element$$70$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$70$$, "borderBottomWidth");
  return new $goog$math$Box$$(parseFloat($top$$6$$), parseFloat($right$$9$$), parseFloat($bottom$$5_element$$70$$), parseFloat($left$$8$$))
}
;
// Input 20
// Input 21
// Input 22
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
// Input 23
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
// Input 24
var $goog$events$ListenableKey$counter_$$ = 0;
// Input 25
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
// Input 26
var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
// Input 27
// Input 28
// Input 29
// Input 30
function $goog$reflect$sinkValue$$($x$$62$$) {
  $goog$reflect$sinkValue$$[" "]($x$$62$$);
  return $x$$62$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
// Input 31
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
      var $JSCompiler_inline_result$$16$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$16$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_122$$) {
        }
        $JSCompiler_inline_result$$16$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$16$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
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
// Input 32
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($listenableKey_src$$8$$, $key$$47_type$$61$$, $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$) {
  if($goog$isArray$$($key$$47_type$$61$$)) {
    for(var $i$$62$$ = 0;$i$$62$$ < $key$$47_type$$61$$.length;$i$$62$$++) {
      $goog$events$listen$$($listenableKey_src$$8$$, $key$$47_type$$61$$[$i$$62$$], $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$)
    }
    return $JSCompiler_alias_NULL$$
  }
  $listenableKey_src$$8$$ = $goog$events$listen_$$($listenableKey_src$$8$$, $key$$47_type$$61$$, $listener$$35$$, $JSCompiler_alias_FALSE$$, $opt_capt$$2$$, $opt_handler$$1$$);
  $key$$47_type$$61$$ = $listenableKey_src$$8$$.key;
  $goog$events$listeners_$$[$key$$47_type$$61$$] = $listenableKey_src$$8$$;
  return $key$$47_type$$61$$
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
    for(var $i$$63_proxy$$1$$ = 0;$i$$63_proxy$$1$$ < $listenerArray$$.length;$i$$63_proxy$$1$$++) {
      if($listenerObj_map$$ = $listenerArray$$[$i$$63_proxy$$1$$], $listenerObj_map$$.$listener$ == $listener$$36$$ && $listenerObj_map$$.$handler$ == $opt_handler$$2$$) {
        if($listenerObj_map$$.$removed$) {
          break
        }
        $callOnce$$ || ($listenerArray$$[$i$$63_proxy$$1$$].$callOnce$ = $JSCompiler_alias_FALSE$$);
        return $listenerArray$$[$i$$63_proxy$$1$$]
      }
    }
  }else {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
  }
  $i$$63_proxy$$1$$ = $goog$events$getProxy$$();
  $listenerObj_map$$ = new $goog$events$Listener$$;
  $listenerObj_map$$.init($listener$$36$$, $i$$63_proxy$$1$$, $src$$9$$, $type$$62$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$);
  $listenerObj_map$$.$callOnce$ = $callOnce$$;
  $i$$63_proxy$$1$$.src = $src$$9$$;
  $i$$63_proxy$$1$$.$listener$ = $listenerObj_map$$;
  $listenerArray$$.push($listenerObj_map$$);
  $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
  $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
  $src$$9$$.addEventListener ? ($src$$9$$ == $goog$global$$ || !$src$$9$$.$customEvent_$) && $src$$9$$.addEventListener($type$$62$$, $i$$63_proxy$$1$$, $capture$$1_opt_capt$$3$$) : $src$$9$$.attachEvent($type$$62$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$62$$] : $goog$events$onStringMap_$$[$type$$62$$] = "on" + $type$$62$$, $i$$63_proxy$$1$$);
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
function $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $key$$48_type$$63$$, $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$) {
  if($goog$isArray$$($key$$48_type$$63$$)) {
    for(var $i$$64$$ = 0;$i$$64$$ < $key$$48_type$$63$$.length;$i$$64$$++) {
      $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $key$$48_type$$63$$[$i$$64$$], $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$)
    }
    return $JSCompiler_alias_NULL$$
  }
  $listenableKey$$1_src$$10$$ = $goog$events$listen_$$($listenableKey$$1_src$$10$$, $key$$48_type$$63$$, $listener$$37$$, $JSCompiler_alias_TRUE$$, $opt_capt$$4$$, $opt_handler$$3$$);
  $key$$48_type$$63$$ = $listenableKey$$1_src$$10$$.key;
  $goog$events$listeners_$$[$key$$48_type$$63$$] = $listenableKey$$1_src$$10$$;
  return $key$$48_type$$63$$
}
function $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$, $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$) {
  if($goog$isArray$$($type$$64$$)) {
    for(var $i$$65$$ = 0;$i$$65$$ < $type$$64$$.length;$i$$65$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$[$i$$65$$], $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$)
    }
  }else {
    if($capture$$2_opt_capt$$6$$ = !!$capture$$2_opt_capt$$6$$, $listenerArray$$1_src$$12$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$12$$, $type$$64$$, $capture$$2_opt_capt$$6$$)) {
      for($i$$65$$ = 0;$i$$65$$ < $listenerArray$$1_src$$12$$.length;$i$$65$$++) {
        if($listenerArray$$1_src$$12$$[$i$$65$$].$listener$ == $listener$$39$$ && $listenerArray$$1_src$$12$$[$i$$65$$].capture == $capture$$2_opt_capt$$6$$ && $listenerArray$$1_src$$12$$[$i$$65$$].$handler$ == $opt_handler$$5$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$12$$[$i$$65$$].key);
          break
        }
      }
    }
  }
}
function $goog$events$unlistenByKey$$($key$$49$$) {
  var $listener$$40_listenerArray$$2$$ = $goog$events$listeners_$$[$key$$49$$];
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
  delete $goog$events$listeners_$$[$key$$49$$];
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
      for(var $i$$66$$ = $opt_obj$$27_sourcesArray$$1_srcUid$$3$$.length - 1;0 <= $i$$66$$;$i$$66$$--) {
        $goog$events$unlistenByKey$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$[$i$$66$$].key), $count$$9$$++
      }
    }
  }else {
    $goog$object$forEach$$($goog$events$listeners_$$, function($listener$$43$$, $key$$50$$) {
      $goog$events$unlistenByKey$$($key$$50$$);
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
      for(var $length$$16$$ = $listenerArray$$5$$.length, $i$$68$$ = 0;$i$$68$$ < $length$$16$$;$i$$68$$++) {
        var $listener$$46$$ = $listenerArray$$5$$[$i$$68$$];
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
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_part$$inline_131_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$;
    if(!($JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$ = ["window", "event"];
        for(var $cur$$inline_130_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_131_retval$$1$$ = $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$.shift();) {
          if($cur$$inline_130_hasBubble$$1$$[$ieEvent_part$$inline_131_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_130_hasBubble$$1$$ = $cur$$inline_130_hasBubble$$1$$[$ieEvent_part$$inline_131_retval$$1$$]
          }else {
            $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$ = $cur$$inline_130_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_131_retval$$1$$ = $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$;
    $JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_130_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$) {
      if(0 > $ieEvent_part$$inline_131_retval$$1$$.keyCode || $ieEvent_part$$inline_131_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_134$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_131_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_131_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_135$$) {
            $evt$$16_useReturnValue$$inline_134$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_134$$ || $ieEvent_part$$inline_131_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_131_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_134$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_134$$.init($ieEvent_part$$inline_131_retval$$1$$, this);
    $ieEvent_part$$inline_131_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$7_hasCapture$$2_parts$$inline_129$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_134$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$70$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_134$$.$propagationStopped_$ && 0 <= $i$$70$$ && $targetsMap$$1$$.$remaining_$;$i$$70$$--) {
          $evt$$16_useReturnValue$$inline_134$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_131_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_134$$)
        }
        if($cur$$inline_130_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$70$$ = 0;!$evt$$16_useReturnValue$$inline_134$$.$propagationStopped_$ && $i$$70$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$70$$++) {
            $evt$$16_useReturnValue$$inline_134$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_131_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_134$$)
          }
        }
      }else {
        $ieEvent_part$$inline_131_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_134$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_131_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_131_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
}
;
// Input 33
function $goog$events$EventHandler$$($opt_handler$$8$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$8$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$17$$, $type$$75$$, $opt_fn$$4$$, $opt_capture$$1$$) {
  $goog$isArray$$($type$$75$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$75$$, $type$$75$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$71$$ = 0;$i$$71$$ < $type$$75$$.length;$i$$71$$++) {
    var $key$$52$$ = $goog$events$listen$$($src$$17$$, $type$$75$$[$i$$71$$], $opt_fn$$4$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$52$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_listenOnce$$($JSCompiler_StaticMethods_listenOnce$self$$, $key$$53_src$$18$$, $type$$76$$, $opt_fn$$5$$, $opt_capture$$2$$, $opt_handler$$10$$) {
  if($goog$isArray$$($type$$76$$)) {
    for(var $i$$72$$ = 0;$i$$72$$ < $type$$76$$.length;$i$$72$$++) {
      $JSCompiler_StaticMethods_listenOnce$$($JSCompiler_StaticMethods_listenOnce$self$$, $key$$53_src$$18$$, $type$$76$$[$i$$72$$], $opt_fn$$5$$, $opt_capture$$2$$, $opt_handler$$10$$)
    }
  }else {
    $key$$53_src$$18$$ = $goog$events$listenOnce$$($key$$53_src$$18$$, $type$$76$$, $opt_fn$$5$$ || $JSCompiler_StaticMethods_listenOnce$self$$, $opt_capture$$2$$, $opt_handler$$10$$ || $JSCompiler_StaticMethods_listenOnce$self$$.$handler_$ || $JSCompiler_StaticMethods_listenOnce$self$$), $JSCompiler_StaticMethods_listenOnce$self$$.$keys_$.push($key$$53_src$$18$$)
  }
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$, $i$$inline_145_type$$77$$, $listener$$inline_140_opt_fn$$6$$, $capture$$inline_143_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_142$$) {
  if($goog$isArray$$($i$$inline_145_type$$77$$)) {
    for(var $i$$73$$ = 0;$i$$73$$ < $i$$inline_145_type$$77$$.length;$i$$73$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$, $i$$inline_145_type$$77$$[$i$$73$$], $listener$$inline_140_opt_fn$$6$$, $capture$$inline_143_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_142$$)
    }
  }else {
    a: {
      $listener$$inline_140_opt_fn$$6$$ = $listener$$inline_140_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_142$$ = $opt_handler$$12_opt_handler$$inline_142$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_143_opt_capture$$3$$ = !!$capture$$inline_143_opt_capture$$3$$;
      if($key$$54_listener$$51_listenerArray$$inline_144_src$$20$$ = $goog$events$getListeners_$$($key$$54_listener$$51_listenerArray$$inline_144_src$$20$$, $i$$inline_145_type$$77$$, $capture$$inline_143_opt_capture$$3$$)) {
        for($i$$inline_145_type$$77$$ = 0;$i$$inline_145_type$$77$$ < $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$.length;$i$$inline_145_type$$77$$++) {
          if(!$key$$54_listener$$51_listenerArray$$inline_144_src$$20$$[$i$$inline_145_type$$77$$].$removed$ && $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$[$i$$inline_145_type$$77$$].$listener$ == $listener$$inline_140_opt_fn$$6$$ && $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$[$i$$inline_145_type$$77$$].capture == $capture$$inline_143_opt_capture$$3$$ && $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$[$i$$inline_145_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_142$$) {
            $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$[$i$$inline_145_type$$77$$];
            break a
          }
        }
      }
      $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$ && ($key$$54_listener$$51_listenerArray$$inline_144_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$.key, $goog$events$unlistenByKey$$($key$$54_listener$$51_listenerArray$$inline_144_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$54_listener$$51_listenerArray$$inline_144_src$$20$$))
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
// Input 34
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
// Input 35
function $goog$events$EventTarget$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($goog$events$EventTarget$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$EventTarget$$.prototype;
$JSCompiler_prototypeAlias$$.$customEvent_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$parentEventTarget_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$20$$) {
  this.$parentEventTarget_$ = $parent$$20$$
};
$JSCompiler_prototypeAlias$$.addEventListener = function $$JSCompiler_prototypeAlias$$$addEventListener$($type$$78$$, $handler$$40$$, $opt_capture$$4$$, $opt_handlerScope$$) {
  $goog$events$listen$$(this, $type$$78$$, $handler$$40$$, $opt_capture$$4$$, $opt_handlerScope$$)
};
$JSCompiler_prototypeAlias$$.removeEventListener = function $$JSCompiler_prototypeAlias$$$removeEventListener$($type$$79$$, $handler$$41$$, $opt_capture$$5$$, $opt_handlerScope$$1$$) {
  $goog$events$unlisten$$(this, $type$$79$$, $handler$$41$$, $opt_capture$$5$$, $opt_handlerScope$$1$$)
};
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$34_e$$24_e$$inline_148$$) {
  var $hasCapture$$inline_154_type$$inline_149$$ = $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.type || $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$, $map$$inline_150$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_154_type$$inline_149$$ in $map$$inline_150$$) {
    if($goog$isString$$($JSCompiler_inline_result$$34_e$$24_e$$inline_148$$)) {
      $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$ = new $goog$events$Event$$($JSCompiler_inline_result$$34_e$$24_e$$inline_148$$, this)
    }else {
      if($JSCompiler_inline_result$$34_e$$24_e$$inline_148$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.target = $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.target || this
      }else {
        var $oldEvent$$inline_151_rv$$inline_152$$ = $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$;
        $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$ = new $goog$events$Event$$($hasCapture$$inline_154_type$$inline_149$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$34_e$$24_e$$inline_148$$, $oldEvent$$inline_151_rv$$inline_152$$)
      }
    }
    var $oldEvent$$inline_151_rv$$inline_152$$ = 1, $ancestors$$inline_153_current$$inline_158$$, $map$$inline_150$$ = $map$$inline_150$$[$hasCapture$$inline_154_type$$inline_149$$], $hasCapture$$inline_154_type$$inline_149$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_150$$, $parent$$inline_156_targetsMap$$inline_155$$;
    if($hasCapture$$inline_154_type$$inline_149$$) {
      $ancestors$$inline_153_current$$inline_158$$ = [];
      for($parent$$inline_156_targetsMap$$inline_155$$ = this;$parent$$inline_156_targetsMap$$inline_155$$;$parent$$inline_156_targetsMap$$inline_155$$ = $parent$$inline_156_targetsMap$$inline_155$$.$parentEventTarget_$) {
        $ancestors$$inline_153_current$$inline_158$$.push($parent$$inline_156_targetsMap$$inline_155$$)
      }
      $parent$$inline_156_targetsMap$$inline_155$$ = $map$$inline_150$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_156_targetsMap$$inline_155$$.$remaining_$ = $parent$$inline_156_targetsMap$$inline_155$$.$count_$;
      for(var $i$$inline_157$$ = $ancestors$$inline_153_current$$inline_158$$.length - 1;!$JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$propagationStopped_$ && 0 <= $i$$inline_157$$ && $parent$$inline_156_targetsMap$$inline_155$$.$remaining_$;$i$$inline_157$$--) {
        $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.currentTarget = $ancestors$$inline_153_current$$inline_158$$[$i$$inline_157$$], $oldEvent$$inline_151_rv$$inline_152$$ &= $goog$events$fireListeners_$$($parent$$inline_156_targetsMap$$inline_155$$, $ancestors$$inline_153_current$$inline_158$$[$i$$inline_157$$], $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$) && $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_150$$) {
      if($parent$$inline_156_targetsMap$$inline_155$$ = $map$$inline_150$$[$JSCompiler_alias_FALSE$$], $parent$$inline_156_targetsMap$$inline_155$$.$remaining_$ = $parent$$inline_156_targetsMap$$inline_155$$.$count_$, $hasCapture$$inline_154_type$$inline_149$$) {
        for($i$$inline_157$$ = 0;!$JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$propagationStopped_$ && $i$$inline_157$$ < $ancestors$$inline_153_current$$inline_158$$.length && $parent$$inline_156_targetsMap$$inline_155$$.$remaining_$;$i$$inline_157$$++) {
          $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.currentTarget = $ancestors$$inline_153_current$$inline_158$$[$i$$inline_157$$], $oldEvent$$inline_151_rv$$inline_152$$ &= $goog$events$fireListeners_$$($parent$$inline_156_targetsMap$$inline_155$$, $ancestors$$inline_153_current$$inline_158$$[$i$$inline_157$$], $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$) && $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_153_current$$inline_158$$ = this;!$JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$propagationStopped_$ && $ancestors$$inline_153_current$$inline_158$$ && $parent$$inline_156_targetsMap$$inline_155$$.$remaining_$;$ancestors$$inline_153_current$$inline_158$$ = $ancestors$$inline_153_current$$inline_158$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.currentTarget = $ancestors$$inline_153_current$$inline_158$$, $oldEvent$$inline_151_rv$$inline_152$$ &= $goog$events$fireListeners_$$($parent$$inline_156_targetsMap$$inline_155$$, $ancestors$$inline_153_current$$inline_158$$, $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$) && $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$ = Boolean($oldEvent$$inline_151_rv$$inline_152$$)
  }else {
    $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$34_e$$24_e$$inline_148$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
// Input 36
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
$JSCompiler_prototypeAlias$$.$getId$ = function $$JSCompiler_prototypeAlias$$$$getId$$() {
  return this.$id_$ || (this.$id_$ = ":" + (this.$idGenerator_$.$nextId_$++).toString(36))
};
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$3$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_661$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_662$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_662$$ in $obj$$inline_661$$ && delete $obj$$inline_661$$[$key$$inline_662$$];
    $goog$object$add$$($JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $id$$3$$, $JSCompiler_StaticMethods_setId$self$$)
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$3$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getElementsByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementsByClass$$($className$$15$$) {
  return this.$element_$ ? this.$dom_$.$getElementsByClass$($className$$15$$, this.$element_$) : []
};
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$16$$) {
  return this.$element_$ ? this.$dom_$.$getElementByClass$($className$$16$$, this.$element_$) : $JSCompiler_alias_NULL$$
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
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$73$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$73$$ && this.$canDecorate$($element$$73$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$73$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$73$$)
    }
    this.$decorateInternal$($element$$73$$);
    this.$enterDocument$()
  }else {
    $JSCompiler_alias_THROW$$(Error("Invalid element to decorate"))
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$75$$) {
  this.$element_$ = $element$$75$$
};
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
$JSCompiler_prototypeAlias$$.$makeId$ = function $$JSCompiler_prototypeAlias$$$$makeId$$($idFragment$$) {
  return this.$getId$() + "." + $idFragment$$
};
function $JSCompiler_StaticMethods_getElementByFragment$$($JSCompiler_StaticMethods_getElementByFragment$self$$, $idFragment$$1$$) {
  $JSCompiler_StaticMethods_getElementByFragment$self$$.$inDocument_$ || $JSCompiler_alias_THROW$$(Error("Operation not supported while component is not in document"));
  return $JSCompiler_StaticMethods_getElementByFragment$self$$.$dom_$.$getElement$($JSCompiler_StaticMethods_getElementByFragment$self$$.$makeId$($idFragment$$1$$))
}
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$, $child$$11$$, $opt_render$$) {
  var $index$$inline_163_sibling$$inline_166$$ = $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && ($opt_render$$ || !$JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$inDocument_$) && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_163_sibling$$inline_166$$ || $index$$inline_163_sibling$$inline_166$$ > ($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$) {
    var $key$$inline_665$$ = $child$$11$$.$getId$();
    $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$childIndex_$[$key$$inline_665$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$childIndex_$, $child$$11$$.$getId$(), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$children_$, $index$$inline_163_sibling$$inline_166$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$ ? ($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$ = $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$getContentElement$(), $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.insertBefore($child$$11$$.$getElement$(), $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.childNodes[$index$$inline_163_sibling$$inline_166$$] || 
  $JSCompiler_alias_NULL$$)) : $opt_render$$ ? ($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$element_$ || $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$createDom$(), $index$$inline_163_sibling$$inline_166$$ = $JSCompiler_StaticMethods_getChildAt$$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$, $index$$inline_163_sibling$$inline_166$$ + 1), $child$$11$$.$render_$($JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$getContentElement$(), 
  $index$$inline_163_sibling$$inline_166$$ ? $index$$inline_163_sibling$$inline_166$$.$element_$ : $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self_contentElement$$inline_165$$.$inDocument_$ && (!$child$$11$$.$inDocument_$ && $child$$11$$.$element_$ && $child$$11$$.$element_$.parentNode && 1 == $child$$11$$.$element_$.parentNode.nodeType) && $child$$11$$.$enterDocument$()
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
function $JSCompiler_StaticMethods_getChildAt$$($JSCompiler_StaticMethods_getChildAt$self$$, $index$$59$$) {
  return $JSCompiler_StaticMethods_getChildAt$self$$.$children_$ ? $JSCompiler_StaticMethods_getChildAt$self$$.$children_$[$index$$59$$] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$
}
function $JSCompiler_StaticMethods_forEachChild$$($JSCompiler_StaticMethods_forEachChild$self$$, $f$$27$$) {
  $JSCompiler_StaticMethods_forEachChild$self$$.$children_$ && $goog$array$forEach$$($JSCompiler_StaticMethods_forEachChild$self$$.$children_$, $f$$27$$, $JSCompiler_alias_VOID$$)
}
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $child$$15$$.$getId$();
    $child$$15$$ = this.$childIndex_$ && $id$$6$$ ? ($id$$6$$ in this.$childIndex_$ ? this.$childIndex_$[$id$$6$$] : $JSCompiler_alias_VOID$$) || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    if($id$$6$$ && $child$$15$$) {
      var $obj$$inline_672$$ = this.$childIndex_$;
      $id$$6$$ in $obj$$inline_672$$ && delete $obj$$inline_672$$[$id$$6$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
$JSCompiler_prototypeAlias$$.$removeChildren$ = function $$JSCompiler_prototypeAlias$$$$removeChildren$$($opt_unrender$$2$$) {
  for(var $removedChildren$$ = [];this.$children_$ && 0 != this.$children_$.length;) {
    $removedChildren$$.push(this.removeChild($JSCompiler_StaticMethods_getChildAt$$(this, 0), $opt_unrender$$2$$))
  }
  return $removedChildren$$
};
// Input 37
// Input 38
function $goog$ui$registry$setDecoratorByClassName$$($className$$18$$, $decoratorFn$$) {
  $className$$18$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$18$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
// Input 39
// Input 40
function $goog$structs$getValues$$($col$$1$$) {
  if("function" == typeof $col$$1$$.$getValues$) {
    return $col$$1$$.$getValues$()
  }
  if($goog$isString$$($col$$1$$)) {
    return $col$$1$$.split("")
  }
  if($goog$isArrayLike$$($col$$1$$)) {
    for(var $rv$$15$$ = [], $l$$12$$ = $col$$1$$.length, $i$$82$$ = 0;$i$$82$$ < $l$$12$$;$i$$82$$++) {
      $rv$$15$$.push($col$$1$$[$i$$82$$])
    }
    return $rv$$15$$
  }
  return $goog$object$getValues$$($col$$1$$)
}
function $goog$structs$forEach$$($col$$6$$, $f$$28$$, $opt_obj$$29$$) {
  if("function" == typeof $col$$6$$.forEach) {
    $col$$6$$.forEach($f$$28$$, $opt_obj$$29$$)
  }else {
    if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
      $goog$array$forEach$$($col$$6$$, $f$$28$$, $opt_obj$$29$$)
    }else {
      var $keys$$1_rv$$inline_173$$;
      if("function" == typeof $col$$6$$.$getKeys$) {
        $keys$$1_rv$$inline_173$$ = $col$$6$$.$getKeys$()
      }else {
        if("function" != typeof $col$$6$$.$getValues$) {
          if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
            $keys$$1_rv$$inline_173$$ = [];
            for(var $l$$inline_174_values$$5$$ = $col$$6$$.length, $i$$inline_175_l$$14$$ = 0;$i$$inline_175_l$$14$$ < $l$$inline_174_values$$5$$;$i$$inline_175_l$$14$$++) {
              $keys$$1_rv$$inline_173$$.push($i$$inline_175_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_173$$ = $goog$object$getKeys$$($col$$6$$)
          }
        }else {
          $keys$$1_rv$$inline_173$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_174_values$$5$$ = $goog$structs$getValues$$($col$$6$$), $i$$inline_175_l$$14$$ = $l$$inline_174_values$$5$$.length, $i$$84$$ = 0;$i$$84$$ < $i$$inline_175_l$$14$$;$i$$84$$++) {
        $f$$28$$.call($opt_obj$$29$$, $l$$inline_174_values$$5$$[$i$$84$$], $keys$$1_rv$$inline_173$$ && $keys$$1_rv$$inline_173$$[$i$$84$$], $col$$6$$)
      }
    }
  }
}
;
// Input 41
// Input 42
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
// Input 43
function $goog$structs$Set$$($opt_values$$1$$) {
  this.$map_$ = new $goog$structs$Map$$;
  $opt_values$$1$$ && this.$addAll$($opt_values$$1$$)
}
function $goog$structs$Set$getKey_$$($val$$31$$) {
  var $type$$91$$ = typeof $val$$31$$;
  return"object" == $type$$91$$ && $val$$31$$ || "function" == $type$$91$$ ? "o" + $goog$getUid$$($val$$31$$) : $type$$91$$.substr(0, 1) + $val$$31$$
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Set$$.prototype;
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($element$$77$$) {
  this.$map_$.set($goog$structs$Set$getKey_$$($element$$77$$), $element$$77$$)
};
$JSCompiler_prototypeAlias$$.$addAll$ = function $$JSCompiler_prototypeAlias$$$$addAll$$($col$$11_values$$11$$) {
  $col$$11_values$$11$$ = $goog$structs$getValues$$($col$$11_values$$11$$);
  for(var $l$$19$$ = $col$$11_values$$11$$.length, $i$$100$$ = 0;$i$$100$$ < $l$$19$$;$i$$100$$++) {
    this.add($col$$11_values$$11$$[$i$$100$$])
  }
};
$JSCompiler_prototypeAlias$$.$removeAll$ = function $$JSCompiler_prototypeAlias$$$$removeAll$$($col$$12_values$$12$$) {
  $col$$12_values$$12$$ = $goog$structs$getValues$$($col$$12_values$$12$$);
  for(var $l$$20$$ = $col$$12_values$$12$$.length, $i$$101$$ = 0;$i$$101$$ < $l$$20$$;$i$$101$$++) {
    this.remove($col$$12_values$$12$$[$i$$101$$])
  }
};
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($element$$78$$) {
  return this.$map_$.remove($goog$structs$Set$getKey_$$($element$$78$$))
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$.clear()
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($element$$79_key$$inline_178$$) {
  $element$$79_key$$inline_178$$ = $goog$structs$Set$getKey_$$($element$$79_key$$inline_178$$);
  return $goog$structs$Map$hasKey_$$(this.$map_$.$map_$, $element$$79_key$$inline_178$$)
};
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  return this.$map_$.$getValues$()
};
// Input 44
function $goog$debug$deepExpose$$($obj$$94$$) {
  function $helper$$($obj$$95$$, $space$$) {
    var $nestspace$$ = $space$$ + "  ";
    try {
      if($goog$isDef$$($obj$$95$$)) {
        if($obj$$95$$ === $JSCompiler_alias_NULL$$) {
          $str$$49$$.push("NULL")
        }else {
          if($goog$isString$$($obj$$95$$)) {
            $str$$49$$.push('"' + $obj$$95$$.replace(/\n/g, "\n" + $space$$) + '"')
          }else {
            if($goog$isFunction$$($obj$$95$$)) {
              $str$$49$$.push(String($obj$$95$$).replace(/\n/g, "\n" + $space$$))
            }else {
              if($goog$isObject$$($obj$$95$$)) {
                if($previous$$.contains($obj$$95$$)) {
                  $str$$49$$.push("*** reference loop detected ***")
                }else {
                  $previous$$.add($obj$$95$$);
                  $str$$49$$.push("{");
                  for(var $x$$64$$ in $obj$$95$$) {
                    $goog$isFunction$$($obj$$95$$[$x$$64$$]) || ($str$$49$$.push("\n"), $str$$49$$.push($nestspace$$), $str$$49$$.push($x$$64$$ + " = "), $helper$$($obj$$95$$[$x$$64$$], $nestspace$$))
                  }
                  $str$$49$$.push("\n" + $space$$ + "}")
                }
              }else {
                $str$$49$$.push($obj$$95$$)
              }
            }
          }
        }
      }else {
        $str$$49$$.push("undefined")
      }
    }catch($e$$29$$) {
      $str$$49$$.push("*** " + $e$$29$$ + " ***")
    }
  }
  var $previous$$ = new $goog$structs$Set$$, $str$$49$$ = [];
  $helper$$($obj$$94$$, "");
  return $str$$49$$.join("")
}
;
// Input 45
// Input 46
// Input 47
// Input 48
function $goog$dom$forms$getValue$$($el$$35$$) {
  var $selectedIndex$$inline_181_type$$92_values$$inline_184$$ = $el$$35$$.type;
  if(!$goog$isDef$$($selectedIndex$$inline_181_type$$92_values$$inline_184$$)) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_181_type$$92_values$$inline_184$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$35$$.checked ? $el$$35$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_181_type$$92_values$$inline_184$$ = $el$$35$$.selectedIndex, 0 <= $selectedIndex$$inline_181_type$$92_values$$inline_184$$ ? $el$$35$$.options[$selectedIndex$$inline_181_type$$92_values$$inline_184$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_181_type$$92_values$$inline_184$$ = [], $option$$inline_185$$, $i$$inline_186$$ = 0;$option$$inline_185$$ = $el$$35$$.options[$i$$inline_186$$];$i$$inline_186$$++) {
        $option$$inline_185$$.selected && $selectedIndex$$inline_181_type$$92_values$$inline_184$$.push($option$$inline_185$$.value)
      }
      return $selectedIndex$$inline_181_type$$92_values$$inline_184$$.length ? $selectedIndex$$inline_181_type$$92_values$$inline_184$$ : $JSCompiler_alias_NULL$$;
    default:
      return $goog$isDef$$($el$$35$$.value) ? $el$$35$$.value : $JSCompiler_alias_NULL$$
  }
}
function $goog$dom$forms$setValue$$($el$$39$$, $opt_value$$6$$) {
  var $opt_value$$inline_197_option$$inline_193_type$$93$$ = $el$$39$$.type;
  if($goog$isDef$$($opt_value$$inline_197_option$$inline_193_type$$93$$)) {
    switch($opt_value$$inline_197_option$$inline_193_type$$93$$.toLowerCase()) {
      case "checkbox":
      ;
      case "radio":
        $el$$39$$.checked = $opt_value$$6$$ ? "checked" : $JSCompiler_alias_NULL$$;
        break;
      case "select-one":
        $el$$39$$.selectedIndex = -1;
        if($goog$isString$$($opt_value$$6$$)) {
          for(var $i$$inline_194_option$$inline_198$$ = 0;$opt_value$$inline_197_option$$inline_193_type$$93$$ = $el$$39$$.options[$i$$inline_194_option$$inline_198$$];$i$$inline_194_option$$inline_198$$++) {
            if($opt_value$$inline_197_option$$inline_193_type$$93$$.value == $opt_value$$6$$) {
              $opt_value$$inline_197_option$$inline_193_type$$93$$.selected = $JSCompiler_alias_TRUE$$;
              break
            }
          }
        }
        break;
      case "select-multiple":
        $opt_value$$inline_197_option$$inline_193_type$$93$$ = $opt_value$$6$$;
        $goog$isString$$($opt_value$$inline_197_option$$inline_193_type$$93$$) && ($opt_value$$inline_197_option$$inline_193_type$$93$$ = [$opt_value$$inline_197_option$$inline_193_type$$93$$]);
        for(var $i$$inline_199$$ = 0;$i$$inline_194_option$$inline_198$$ = $el$$39$$.options[$i$$inline_199$$];$i$$inline_199$$++) {
          if($i$$inline_194_option$$inline_198$$.selected = $JSCompiler_alias_FALSE$$, $opt_value$$inline_197_option$$inline_193_type$$93$$) {
            for(var $value$$inline_200$$, $j$$inline_201$$ = 0;$value$$inline_200$$ = $opt_value$$inline_197_option$$inline_193_type$$93$$[$j$$inline_201$$];$j$$inline_201$$++) {
              $i$$inline_194_option$$inline_198$$.value == $value$$inline_200$$ && ($i$$inline_194_option$$inline_198$$.selected = $JSCompiler_alias_TRUE$$)
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
// Input 49
function $bitex$ui$Withdraw$$($opt_model$$, $opt_domHelper$$3$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$3$$);
  this.$model_$ = $opt_model$$
}
$goog$inherits$$($bitex$ui$Withdraw$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$Withdraw$$.prototype;
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("bitex-withdraw");
$JSCompiler_prototypeAlias$$.$makeId$ = function $$JSCompiler_prototypeAlias$$$$makeId$$($idFragment$$2$$) {
  return this.$getId$() + "_" + $idFragment$$2$$
};
$JSCompiler_prototypeAlias$$.$getId$ = function $$JSCompiler_prototypeAlias$$$$getId$$() {
  return this.$id_$ || (this.$id_$ = (":" + (this.$idGenerator_$.$nextId_$++).toString(36)).substring(1))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $dom$$3$$ = this.$getDomHelper$(), $controlsEls$$ = [];
  $goog$array$forEach$$(this.$model_$.controls, function($control_controlsEl$$) {
    var $prepend$$ = $control_controlsEl$$[3];
    $control_controlsEl$$ = $prepend$$ != $JSCompiler_alias_NULL$$ ? $dom$$3$$.$createDom$("div", "control-group", $dom$$3$$.$createDom$("label", "control-label", $control_controlsEl$$[1]), $dom$$3$$.$createDom$("div", "controls", $dom$$3$$.$createDom$("div", "input-prepend", $dom$$3$$.$createDom$("span", "add-on", $prepend$$), $dom$$3$$.$createDom$("input", {type:"text", id:this.$makeId$("id_" + $control_controlsEl$$[0]), name:$control_controlsEl$$[0], "class":"input-xlarge", placeholder:$control_controlsEl$$["2"]})))) : 
    $dom$$3$$.$createDom$("div", "control-group", $dom$$3$$.$createDom$("label", "control-label", $control_controlsEl$$[1]), $dom$$3$$.$createDom$("div", "controls", $dom$$3$$.$createDom$("input", {type:"text", id:this.$makeId$("id_" + $control_controlsEl$$[0]), name:$control_controlsEl$$[0], "class":"input-xlarge", placeholder:$control_controlsEl$$["2"]})));
    $controlsEls$$.push($control_controlsEl$$)
  }, this);
  this.$element_$ = $dom$$3$$.$createDom$("div", [this.$getCssClass$(), "accordion-group"], $dom$$3$$.$createDom$("div", "accordion-heading", $dom$$3$$.$createDom$("a", {"class":"accordion-toggle collapsed", "data-toggle":"collapse", "data-parent":"#" + this.$model_$.$parent_id$, href:"#" + this.$makeId$("body")}, this.$model_$.title)), $dom$$3$$.$createDom$("div", {"class":"accordion-body collapse", id:this.$makeId$("body"), style:"height: 0;"}, $dom$$3$$.$createDom$("div", "accordion-inner", $dom$$3$$.$createDom$("p", 
  $JSCompiler_alias_VOID$$, this.$model_$.description), $dom$$3$$.$createDom$("div", "well", $controlsEls$$, $dom$$3$$.$createDom$("div", "input", $dom$$3$$.$createDom$("input", {type:"submit", "class":"btn btn-primary", id:this.$makeId$("btn"), value:this.$model_$.$button_label$}))))))
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_FALSE$$);
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$Withdraw$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$46$$ = this.$getHandler$(), $submitBtn$$ = $JSCompiler_StaticMethods_getElementByFragment$$(this, "btn");
  $JSCompiler_StaticMethods_listen$$($handler$$46$$, $submitBtn$$, "click", this.$onAction_$)
};
$JSCompiler_prototypeAlias$$.$onAction_$ = function $$JSCompiler_prototypeAlias$$$$onAction_$$() {
  var $data$$32$$ = {};
  $goog$array$forEach$$(this.$model_$.controls, function($control$$1$$) {
    $data$$32$$[$control$$1$$[0]] = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getElementByFragment$$(this, "id_" + $control$$1$$[0]))
  }, this);
  $data$$32$$.Type = this.$model_$.type;
  $data$$32$$.Currency = this.$model_$.$currency$;
  this.$model_$.data = $data$$32$$;
  this.dispatchEvent("withdraw_event")
};
$goog$ui$registry$setDecoratorByClassName$$("bitex-withdraw", function() {
  return new $bitex$ui$Withdraw$$
});
// Input 50
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  return 2147483647 < $opt_delay$$ ? -1 : $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 51
function $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$36$$) {
  if($e$$36$$.altKey && !$e$$36$$.ctrlKey || $e$$36$$.metaKey || 112 <= $e$$36$$.keyCode && 123 >= $e$$36$$.keyCode) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($e$$36$$.keyCode) {
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
      return 166 > $e$$36$$.keyCode || 183 < $e$$36$$.keyCode
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
// Input 52
function $goog$events$InputHandler$$($element$$80_emulateInputEvents$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$80_emulateInputEvents$$;
  $element$$80_emulateInputEvents$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && !$goog$userAgent$isVersion$$("531") && "TEXTAREA" == $element$$80_emulateInputEvents$$.tagName;
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$element_$, $element$$80_emulateInputEvents$$ ? ["keydown", "paste", "cut", "drop", "input"] : "input", this)
}
$goog$inherits$$($goog$events$InputHandler$$, $goog$events$EventTarget$$);
$goog$events$InputHandler$$.prototype.$timer_$ = $JSCompiler_alias_NULL$$;
$goog$events$InputHandler$$.prototype.handleEvent = function $$goog$events$InputHandler$$$$handleEvent$($e$$37$$) {
  if("input" == $e$$37$$.type) {
    $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this), (!$goog$userAgent$OPERA$$ || this.$element_$ == $goog$dom$getOwnerDocument$$(this.$element_$).activeElement) && this.dispatchEvent($JSCompiler_StaticMethods_createInputEvent_$$($e$$37$$))
  }else {
    if("keydown" != $e$$37$$.type || $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$37$$)) {
      var $valueBeforeKey$$ = "keydown" == $e$$37$$.type ? this.$element_$.value : $JSCompiler_alias_NULL$$;
      $goog$userAgent$IE$$ && 229 == $e$$37$$.keyCode && ($valueBeforeKey$$ = $JSCompiler_alias_NULL$$);
      var $inputEvent$$ = $JSCompiler_StaticMethods_createInputEvent_$$($e$$37$$);
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
function $JSCompiler_StaticMethods_createInputEvent_$$($be$$2_e$$38$$) {
  $be$$2_e$$38$$ = new $goog$events$BrowserEvent$$($be$$2_e$$38$$.$event_$);
  $be$$2_e$$38$$.type = "input";
  return $be$$2_e$$38$$
}
$goog$events$InputHandler$$.prototype.$disposeInternal$ = function $$goog$events$InputHandler$$$$$disposeInternal$$() {
  $goog$events$InputHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.$eventHandler_$.$dispose$();
  $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this);
  delete this.$element_$
};
// Input 53
function $bitex$ui$DataGrid$$($options$$6$$, $opt_domHelper$$4$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$4$$);
  this.$columns_$ = $options$$6$$.columns;
  this.$row_class_fn_$ = $options$$6$$.rowClassFn || $goog$nullFunction$$;
  this.$current_page_$ = $options$$6$$.currentPage || 0;
  this.$limit_$ = $options$$6$$.limit || 100;
  this.$sort_column_$ = "";
  this.$sort_direction_$ = "up";
  this.$filter_$ = $JSCompiler_alias_NULL$$;
  this.$loading_data_$ = $goog$dom$createDom$$("div", ["progress", "progress-striped", "active"], $goog$dom$createDom$$("div", "bar"));
  $goog$style$setWidth$$(this.$loading_data_$, "50%");
  var $element$$inline_212$$ = this.$loading_data_$;
  $goog$isString$$("margin") ? $goog$style$setStyle_$$($element$$inline_212$$, "auto", "margin") : $goog$object$forEach$$("margin", $goog$partial$$($goog$style$setStyle_$$, $element$$inline_212$$));
  $goog$style$setWidth$$($goog$dom$getFirstElementChild$$(this.$loading_data_$), "100%")
}
$goog$inherits$$($bitex$ui$DataGrid$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$DataGrid$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("datagrid");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$81_search_div$$) {
  this.$element_$ = $element$$81_search_div$$;
  var $table_header_element$$ = $goog$dom$getFirstElementChild$$($element$$81_search_div$$);
  $goog$dom$classes$add$$($table_header_element$$, this.$getBaseCssClass$());
  var $thead_element$$ = $goog$dom$getFirstElementChild$$($table_header_element$$);
  $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($thead_element$$)).setAttribute("colspan", this.$columns_$.length);
  var $column_header_el$$ = $goog$dom$getNextElementSibling$$($goog$dom$getFirstElementChild$$($thead_element$$));
  $column_header_el$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($column_header_el$$);
  this.$th_sizing_el_$ = $goog$dom$createDom$$("tr");
  this.$tr_columns_el_$ = $goog$dom$createDom$$("tr");
  $goog$array$forEach$$(this.$columns_$, function($child$$inline_220_column$$) {
    var $th_column_properties$$ = {"data-property":$child$$inline_220_column$$.property};
    $child$$inline_220_column$$.sortable && ($th_column_properties$$["class"] = "sortable");
    var $child$$inline_217$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_220_column$$.label);
    this.$tr_columns_el_$.appendChild($child$$inline_217$$);
    $child$$inline_220_column$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_220_column$$.label);
    this.$th_sizing_el_$.appendChild($child$$inline_220_column$$)
  }, this);
  $thead_element$$.appendChild(this.$tr_columns_el_$);
  this.$table_data_body_el_$ = $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($goog$dom$getNextElementSibling$$($table_header_element$$)));
  this.$element_start_counter_$ = $goog$dom$getElementByClass$$("grid-start", $element$$81_search_div$$);
  this.$element_end_counter_$ = $goog$dom$getElementByClass$$("grid-end", $element$$81_search_div$$);
  this.$element_prev_button_$ = $goog$dom$getElementByClass$$("grid-prevpage", $element$$81_search_div$$);
  this.$element_next_button_$ = $goog$dom$getElementByClass$$("grid-nextpage", $element$$81_search_div$$);
  $element$$81_search_div$$ = $goog$dom$getElementByClass$$("datagrid-search", $element$$81_search_div$$);
  this.$search_input_$ = $goog$dom$getFirstElementChild$$($element$$81_search_div$$);
  this.$search_btn_$ = $goog$dom$getNextElementSibling$$(this.$search_input_$)
};
$JSCompiler_prototypeAlias$$.$handlePreviousPage_$ = function $$JSCompiler_prototypeAlias$$$$handlePreviousPage_$$() {
  0 >= this.$current_page_$ || (this.$current_page_$ -= 1, this.$render_$())
};
$JSCompiler_prototypeAlias$$.$handleNextPage_$ = function $$JSCompiler_prototypeAlias$$$$handleNextPage_$$() {
  this.$current_page_$ += 1;
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$handleColumnClick_$ = function $$JSCompiler_prototypeAlias$$$$handleColumnClick_$$($e$$41_other_sorted_column_elements_sort_indicator_element$$) {
  var $classToRemove_element$$82$$ = $e$$41_other_sorted_column_elements_sort_indicator_element$$.target;
  if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$82$$), "sortable")) {
    this.$sort_column_$ = $classToRemove_element$$82$$.getAttribute("data-property");
    if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$82$$), "sorted")) {
      $e$$41_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $classToRemove_element$$82$$);
      var $classToAdd$$;
      $goog$array$contains$$($goog$dom$classes$get$$($e$$41_other_sorted_column_elements_sort_indicator_element$$), "icon-chevron-up") ? ($classToRemove_element$$82$$ = "icon-chevron-up", $classToAdd$$ = "icon-chevron-down", this.$sort_direction_$ = "ASC") : ($classToRemove_element$$82$$ = "icon-chevron-down", $classToAdd$$ = "icon-chevron-up", this.$sort_direction_$ = "DESC");
      $goog$dom$classes$addRemove$$($e$$41_other_sorted_column_elements_sort_indicator_element$$, $classToRemove_element$$82$$, $classToAdd$$)
    }else {
      $e$$41_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementsByClass$$("sorted", this.$tr_columns_el_$), $goog$array$forEach$$($e$$41_other_sorted_column_elements_sort_indicator_element$$, function($other_sort_indicator_element_other_sorted_column_element$$) {
        $goog$dom$classes$remove$$($other_sort_indicator_element_other_sorted_column_element$$, "sorted");
        $other_sort_indicator_element_other_sorted_column_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $other_sort_indicator_element_other_sorted_column_element$$);
        $other_sort_indicator_element_other_sorted_column_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($other_sort_indicator_element_other_sorted_column_element$$)
      }, this), $e$$41_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$createDom$$("i", ["icon-chevron-up", "datagrid-sort"]), $classToRemove_element$$82$$.appendChild($e$$41_other_sorted_column_elements_sort_indicator_element$$), this.$sort_direction_$ = "DESC", $goog$dom$classes$add$$($classToRemove_element$$82$$, "sorted")
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
  var $handler$$47$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$47$$, this.$element_prev_button_$, "click", this.$handlePreviousPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$47$$, this.$element_next_button_$, "click", this.$handleNextPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$47$$, this.$tr_columns_el_$, "click", this.$handleColumnClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$47$$, this.$search_btn_$, "click", this.$handleSearchBtnClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$47$$, new $goog$events$InputHandler$$(this.$search_input_$), "input", this.$onChangeFilter_$);
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
function $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_resultSetToElements$self$$, $resultSet$$, $columns$$3$$) {
  var $elements$$1$$ = [], $result_set_col_index$$2$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_resultSetToElements$self$$.$columns_$, function($this_col$$2$$, $index_row_set$$2$$) {
    var $index$$63$$ = $goog$array$findIndex$$($columns$$3$$, function($col$$18$$) {
      return $col$$18$$ == $this_col$$2$$.property
    });
    $result_set_col_index$$2$$[$index$$63$$] = $index_row_set$$2$$
  });
  $goog$array$forEach$$($resultSet$$, function($row_set$$) {
    var $row_set_obj$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$89$$, $result_set_index$$) {
      var $index$$64$$ = $result_set_col_index$$2$$[$result_set_index$$];
      $index$$64$$ != $JSCompiler_alias_NULL$$ && ($row_set_obj$$[this.$columns_$[$index$$64$$].property] = $value$$89$$)
    }, this);
    var $tr$$ = $goog$dom$createDom$$("tr", this.$row_class_fn_$($row_set_obj$$)), $td_elements$$ = {}, $rowSetObj$$ = {}, $x$$66$$;
    for($x$$66$$ in $columns$$3$$) {
      $rowSetObj$$[$columns$$3$$[$x$$66$$]] = $row_set$$[$x$$66$$]
    }
    $goog$array$forEach$$($row_set$$, function($value$$90$$, $result_set_index$$1$$) {
      var $index$$65$$ = $result_set_col_index$$2$$[$result_set_index$$1$$];
      if($index$$65$$ != $JSCompiler_alias_NULL$$) {
        var $formatter$$2_td$$ = this.$columns_$[$index$$65$$].formatter || function() {
          return"" + $value$$90$$
        }, $formatter$$2_td$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$65$$].classes || $goog$nullFunction$$)($value$$90$$), $formatter$$2_td$$($value$$90$$, $rowSetObj$$));
        $td_elements$$[this.$columns_$[$index$$65$$].property] = $formatter$$2_td$$
      }
    }, this);
    $goog$array$forEach$$(this.$columns_$, function($col$$19_td$$1$$) {
      $col$$19_td$$1$$ = $td_elements$$[$col$$19_td$$1$$.property];
      $col$$19_td$$1$$ != $JSCompiler_alias_NULL$$ || ($col$$19_td$$1$$ = $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, ""));
      $tr$$.appendChild($col$$19_td$$1$$)
    });
    $elements$$1$$.push($tr$$)
  }, $JSCompiler_StaticMethods_resultSetToElements$self$$);
  return $elements$$1$$
}
function $JSCompiler_StaticMethods_setResultSet$$($JSCompiler_StaticMethods_setResultSet$self$$, $elements$$2_resultSet$$1$$, $columns$$4_first_row$$) {
  $goog$dom$removeChildren$$($JSCompiler_StaticMethods_setResultSet$self$$.$table_data_body_el_$);
  $elements$$2_resultSet$$1$$ = $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_setResultSet$self$$, $elements$$2_resultSet$$1$$, $columns$$4_first_row$$);
  $columns$$4_first_row$$ = $elements$$2_resultSet$$1$$[0];
  $goog$array$forEach$$($elements$$2_resultSet$$1$$, function($tr$$1$$) {
    this.$table_data_body_el_$.appendChild($tr$$1$$)
  }, $JSCompiler_StaticMethods_setResultSet$self$$);
  $columns$$4_first_row$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_adjustSizes_$$($JSCompiler_StaticMethods_setResultSet$self$$, $columns$$4_first_row$$)
}
function $JSCompiler_StaticMethods_adjustSizes_$$($JSCompiler_StaticMethods_adjustSizes_$self$$, $first_row$$1$$) {
  $first_row$$1$$.parentNode && $first_row$$1$$.parentNode.insertBefore($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $first_row$$1$$);
  var $el_size$$inline_243_sizing_row$$inline_239$$ = $JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $work_col_1$$inline_240$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$tr_columns_el_$), $work_col_2$$inline_241$$ = $goog$dom$getFirstElementChild$$($first_row$$1$$), $sizing_col$$inline_242$$ = $goog$dom$getFirstElementChild$$($el_size$$inline_243_sizing_row$$inline_239$$);
  for($goog$dom$getChildren$$($el_size$$inline_243_sizing_row$$inline_239$$);$sizing_col$$inline_242$$ != $JSCompiler_alias_NULL$$;) {
    $el_size$$inline_243_sizing_row$$inline_239$$ = $goog$style$getSize$$($sizing_col$$inline_242$$), $goog$style$setWidth$$($work_col_1$$inline_240$$, $el_size$$inline_243_sizing_row$$inline_239$$.width), $goog$style$setWidth$$($work_col_2$$inline_241$$, $el_size$$inline_243_sizing_row$$inline_239$$.width), $work_col_1$$inline_240$$ = $goog$dom$getNextElementSibling$$($work_col_1$$inline_240$$), $work_col_2$$inline_241$$ = $goog$dom$getNextElementSibling$$($work_col_2$$inline_241$$), $sizing_col$$inline_242$$ = 
    $goog$dom$getNextElementSibling$$($sizing_col$$inline_242$$)
  }
  $goog$dom$removeNode$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$)
}
function $bitex$ui$DataGridEvent$$($type$$94$$, $options$$8$$) {
  $goog$events$Event$$.call(this, $type$$94$$);
  this.options = $options$$8$$
}
$goog$inherits$$($bitex$ui$DataGridEvent$$, $goog$events$Event$$);
// Input 54
function $bitex$ui$AccountActivity$$($opt_domHelper$$5$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-order-id"
  }}, {property:"Side", label:"Side", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$18$$) {
    switch($s$$18$$) {
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
  }}]}, $opt_domHelper$$5$$)
}
$goog$inherits$$($bitex$ui$AccountActivity$$, $bitex$ui$DataGrid$$);
var $bitex$ui$AccountActivity$CSS_CLASS$$ = "account-activity";
$bitex$ui$AccountActivity$$.prototype.$getCssClass$ = function $$bitex$ui$AccountActivity$$$$$getCssClass$$() {
  return $bitex$ui$AccountActivity$CSS_CLASS$$
};
$bitex$ui$AccountActivity$$.prototype.$getRowClass$ = function $$bitex$ui$AccountActivity$$$$$getRowClass$$($row_set$$1$$) {
  var $class_status$$;
  switch($row_set$$1$$.Side) {
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
// Input 55
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
// Input 56
// Input 57
// Input 58
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
// Input 59
// Input 60
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
$goog$fx$TransitionBase$$.prototype.$dispatchAnimationEvent$ = function $$goog$fx$TransitionBase$$$$$dispatchAnimationEvent$$($type$$95$$) {
  this.dispatchEvent($type$$95$$)
};
// Input 61
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
  var $uid$$inline_259$$ = $goog$getUid$$(this);
  $uid$$inline_259$$ in $goog$fx$anim$activeAnimations_$$ || ($goog$fx$anim$activeAnimations_$$[$uid$$inline_259$$] = this);
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
  for(var $i$$121$$ = 0;$i$$121$$ < $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$.length;$i$$121$$++) {
    $JSCompiler_StaticMethods_updateCoords_$self$$.coords[$i$$121$$] = ($JSCompiler_StaticMethods_updateCoords_$self$$.$endPoint$[$i$$121$$] - $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$[$i$$121$$]) * $t$$ + $JSCompiler_StaticMethods_updateCoords_$self$$.$startPoint$[$i$$121$$]
  }
}
$JSCompiler_prototypeAlias$$.$onAnimate$ = function $$JSCompiler_prototypeAlias$$$$onAnimate$$() {
  this.$dispatchAnimationEvent$("animate")
};
$JSCompiler_prototypeAlias$$.$dispatchAnimationEvent$ = function $$JSCompiler_prototypeAlias$$$$dispatchAnimationEvent$$($type$$96$$) {
  this.dispatchEvent(new $goog$fx$AnimationEvent$$($type$$96$$, this))
};
function $goog$fx$AnimationEvent$$($type$$97$$, $anim$$1$$) {
  $goog$events$Event$$.call(this, $type$$97$$);
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
// Input 62
// Input 63
// Input 64
// Input 65
function $goog$fx$dom$PredefinedEffect$$($element$$86$$, $start$$10$$, $end$$5$$, $time$$1$$, $opt_acc$$1$$) {
  $goog$fx$Animation$$.call(this, $start$$10$$, $end$$5$$, $time$$1$$, $opt_acc$$1$$);
  this.element = $element$$86$$
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
function $goog$fx$dom$Fade$$($element$$94$$, $start$$18$$, $end$$13$$, $time$$9$$, $opt_acc$$9$$) {
  $goog$isNumber$$($start$$18$$) && ($start$$18$$ = [$start$$18$$]);
  $goog$isNumber$$($end$$13$$) && ($end$$13$$ = [$end$$13$$]);
  $goog$fx$dom$PredefinedEffect$$.call(this, $element$$94$$, $start$$18$$, $end$$13$$, $time$$9$$, $opt_acc$$9$$);
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
function $goog$fx$dom$FadeOutAndHide$$($element$$97$$, $time$$12$$, $opt_acc$$12$$) {
  $goog$fx$dom$Fade$$.call(this, $element$$97$$, 1, 0, $time$$12$$, $opt_acc$$12$$)
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
// Input 66
function $bitex$model$Model$$($element$$102$$, $opt_map$$1$$, $var_args$$82$$) {
  this.$element_$ = $element$$102$$;
  this.$map_$ = new $goog$structs$Map$$($opt_map$$1$$, $var_args$$82$$)
}
$goog$inherits$$($bitex$model$Model$$, $goog$events$EventTarget$$);
$bitex$model$Model$$.prototype.get = function $$bitex$model$Model$$$$get$($key$$71$$, $opt_val$$2$$) {
  return this.$map_$.get($key$$71$$, $opt_val$$2$$)
};
$bitex$model$Model$$.prototype.set = function $$bitex$model$Model$$$$set$($key$$72$$, $value$$92$$) {
  this.$map_$.set($key$$72$$, $value$$92$$);
  var $elements$$3$$ = $goog$dom$getElementsByClass$$("bitex-model", this.$element_$);
  $goog$array$forEach$$($elements$$3$$, function($el$$43$$) {
    if($el$$43$$.getAttribute("data-model-key") === $key$$72$$ && $goog$dom$getTextContent$$($el$$43$$) !== $value$$92$$) {
      $goog$dom$setTextContent$$($el$$43$$, $value$$92$$);
      var $blink_class$$ = $el$$43$$.getAttribute("data-blink-class");
      if($blink_class$$ != $JSCompiler_alias_NULL$$) {
        var $blink_delay$$ = $el$$43$$.getAttribute("data-blink-delay") || 700, $blink_delay$$ = parseInt($blink_delay$$, 10);
        $goog$dom$classes$add$$($el$$43$$, $blink_class$$);
        $goog$Timer$callOnce$$(function() {
          $goog$dom$classes$remove$$($el$$43$$, $blink_class$$)
        }, $blink_delay$$, this)
      }
    }
  });
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set" + $key$$72$$, $key$$72$$, $value$$92$$));
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set", $key$$72$$, $value$$92$$))
};
function $bitex$model$ModelEvent$$($type$$98$$, $key$$73$$, $data$$33$$) {
  $goog$events$Event$$.call(this, $type$$98$$);
  this.key = $key$$73$$;
  this.data = $data$$33$$
}
$goog$inherits$$($bitex$model$ModelEvent$$, $goog$events$Event$$);
// Input 67
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
// Input 68
function $bitex$view$View$$($app$$, $opt_domHelper$$6$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$6$$);
  this.$app_$ = $app$$
}
$goog$inherits$$($bitex$view$View$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$View$$.prototype;
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("bitex-view");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  return this.$getDomHelper$().$createDom$("div", this.$getCssClass$())
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$103$$) {
  $bitex$view$View$$.$superClass_$.$decorateInternal$.call(this, $element$$103$$);
  this.$getDomHelper$();
  return $element$$103$$
};
$JSCompiler_prototypeAlias$$.$enterView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$exitView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$View$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$goog$ui$registry$setDecoratorByClassName$$("bitex-view", function() {
  return new $bitex$view$View$$
});
// Input 69
function $bitex$view$SignupView$$($app$$1$$, $opt_domHelper$$7$$) {
  $bitex$view$View$$.call(this, $app$$1$$, $opt_domHelper$$7$$)
}
$goog$inherits$$($bitex$view$SignupView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$SignupView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$SignupView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$49$$ = this.$getHandler$(), $signup_country_el$$ = $goog$dom$getElement$$("id_signup_country"), $signup_state_el$$ = $goog$dom$getElement$$("id_signup_state");
  $goog$object$forEach$$($bitex$util$getCountries$$(), function($country_info$$, $country_code$$) {
    var $country_el$$44$$ = $country_info$$;
    $goog$isArrayLike$$($country_el$$44$$) && ($country_el$$44$$ = $country_el$$44$$[0]);
    $country_el$$44$$ = $goog$dom$createDom$$("option", {value:$country_code$$}, $country_el$$44$$);
    $signup_country_el$$.appendChild($country_el$$44$$)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $signup_country_el$$, "change", this.$onChangeCountry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $signup_state_el$$, "change", this.$onChangeState_$);
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, this.$app_$.$model_$, "model_setBrokerList", this.$onBrokerList_$);
  var $button_signup$$ = new $goog$ui$Button$$;
  $button_signup$$.$decorate$($goog$dom$getElement$$("id_btn_signup"));
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$44$$) {
    $button_signup$$.$setEnabled$($e$$44$$.target.checked)
  });
  this.$onBrokerList_$();
  $JSCompiler_StaticMethods_listen$$($handler$$49$$, $button_signup$$, "action", this.$onSignupButtonClick_$)
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
  $goog$string$isEmpty$$($e$$45_username$$) || /[^a-zA-Z0-9]/.test($e$$45_username$$) ? this.$app_$.$showErrorDialog$("Invalid username") : $email$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? $goog$string$isEmpty$$($password$$) || 8 > $password$$.length ? this.$app_$.$showErrorDialog$("Password must have at least 8 characters") : $password$$ !== $password2$$ ? this.$app_$.$showErrorDialog$("Passwords does not match") : this.dispatchEvent("signup_click") : this.$app_$.$showErrorDialog$("Invalid email")
};
$JSCompiler_prototypeAlias$$.$onBrokerList_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerList_$$() {
  var $broker_list$$ = this.$app_$.$model_$.get("BrokerList");
  if($broker_list$$ != $JSCompiler_alias_NULL$$) {
    var $last_country_code$$ = "", $number_of_countries$$ = 0, $brokers_by_country$$ = {};
    $goog$array$forEach$$($broker_list$$.BrokerListGrp, function($broker_array$$) {
      var $broker_info$$ = {};
      $goog$array$forEach$$($broker_list$$.Columns, function($column$$4$$, $index$$66$$) {
        $broker_info$$[$column$$4$$] = $broker_array$$[$index$$66$$]
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
  console.log("selected country:" + $selected_country$$2$$);
  var $countries$$1_country_info$$1$$ = $bitex$util$getCountries$$();
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_state"));
  $countries$$1_country_info$$1$$ = $countries$$1_country_info$$1$$[$selected_country$$2$$];
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_state_group"), $goog$isArrayLike$$($countries$$1_country_info$$1$$));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_broker"));
  if($JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$brokers_by_country_$[""][0] != $JSCompiler_alias_NULL$$) {
    var $broker_info$$1_el$$45$$ = $JSCompiler_StaticMethods_onSelectCountry_$self$$.$app_$.$brokers_by_country_$[""][0], $broker_info$$1_el$$45$$ = $goog$dom$createDom$$("option", {value:$broker_info$$1_el$$45$$.BrokerID}, $broker_info$$1_el$$45$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$1_el$$45$$)
  }
  if($goog$isArrayLike$$($countries$$1_country_info$$1$$)) {
    var $states_name_array$$ = $countries$$1_country_info$$1$$[2].split("|"), $number_of_states_with_brokers$$ = 0, $last_state_with_broker$$ = "";
    $goog$array$forEach$$($countries$$1_country_info$$1$$[1].split("|"), function($state_code$$, $index$$67$$) {
      var $el$$46$$ = $goog$dom$createDom$$("option", {value:$state_code$$}, $states_name_array$$[$index$$67$$]);
      $goog$dom$getElement$$("id_signup_state").appendChild($el$$46$$);
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
      var $el$$47$$ = $goog$dom$createDom$$("option", {value:$broker_info$$3$$.BrokerID}, $broker_info$$3$$.BusinessName);
      $goog$dom$getElement$$("id_signup_broker").appendChild($el$$47$$);
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
    var $broker_info$$4_el$$48$$ = $JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$brokers_by_country_$[""][0], $broker_info$$4_el$$48$$ = $goog$dom$createDom$$("option", {value:$broker_info$$4_el$$48$$.BrokerID}, $broker_info$$4_el$$48$$.BusinessName);
    $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$4_el$$48$$)
  }
  var $number_of_available_brokers$$1$$ = 0, $last_available_broker$$1$$ = "";
  $goog$array$forEach$$($JSCompiler_StaticMethods_onSelectState_$self$$.$app_$.$brokers_by_country_$[$selected_country$$3$$], function($broker_info$$5_el$$49$$) {
    $broker_info$$5_el$$49$$.State === $selected_state$$1$$ && (++$number_of_available_brokers$$1$$, $last_available_broker$$1$$ = $broker_info$$5_el$$49$$.BrokerID, $broker_info$$5_el$$49$$ = $goog$dom$createDom$$("option", {value:$broker_info$$5_el$$49$$.BrokerID}, $broker_info$$5_el$$49$$.BusinessName), $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$5_el$$49$$))
  }, $JSCompiler_StaticMethods_onSelectState_$self$$);
  1 == $number_of_available_brokers$$1$$ ? $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "" + $last_available_broker$$1$$) : $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "0");
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker"), 1 <= $number_of_available_brokers$$1$$);
  $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker_warning"), 0 == $number_of_available_brokers$$1$$)
}
;
// Input 70
function $bitex$view$LoginView$$($app$$2$$, $opt_domHelper$$8$$) {
  $bitex$view$View$$.call(this, $app$$2$$, $opt_domHelper$$8$$);
  this.$password_el_$ = this.$username_el_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$LoginView$$, $bitex$view$View$$);
$bitex$view$LoginView$$.prototype.$enterDocument$ = function $$bitex$view$LoginView$$$$$enterDocument$$() {
  $bitex$view$LoginView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$50$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, $goog$dom$getElement$$("id_landing_signin"), "click", function($e$$49$$) {
    $e$$49$$.stopPropagation();
    $e$$49$$.preventDefault();
    $JSCompiler_StaticMethods_onLoginClick_$$(this, $goog$dom$getElement$$("id_landing_username"), $goog$dom$getElement$$("id_landing_password"))
  });
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, $goog$dom$getElement$$("id_btn_login"), "click", function($e$$50$$) {
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
  $goog$string$isEmpty$$($username$$1_username_el$$) ? (alert(MSG_LOGIN_VIEW_INVALID_USERNAME), $JSCompiler_StaticMethods_onLoginClick_$self$$.$username_el_$.focus()) : $goog$string$isEmpty$$($password$$1_password_el$$) || 8 > $password$$1_password_el$$.length ? (alert("Password must have at least 8 characters"), $JSCompiler_StaticMethods_onLoginClick_$self$$.$password_el_$.focus()) : $JSCompiler_StaticMethods_onLoginClick_$self$$.dispatchEvent("login_click")
}
$bitex$view$LoginView$$.prototype.clear = function $$bitex$view$LoginView$$$$clear$() {
  this.$username_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$username_el_$, "");
  this.$password_el_$ != $JSCompiler_alias_NULL$$ && $goog$dom$forms$setValue$$(this.$password_el_$, "")
};
// Input 71
function $bitex$ui$WithdrawList$$($opt_domHelper$$9$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"WithdrawID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-withdraw-id"
  }}, {property:"Status", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$24$$) {
    switch($s$$24$$) {
      case "0":
        return"Unconfirmed";
      case "1":
        return"Pending";
      case "2":
        return"Completed"
    }
    return""
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-status"
  }}, {property:"Created", label:"Date/Time", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-created"
  }}, {property:"Currency", label:"Currency", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-currency"
  }}, {property:"Amount", label:"Amount", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-amount"
  }}, {property:"Wallet", label:"Details", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$25$$, $row_set_obj$$1$$) {
    delete $row_set_obj$$1$$.WithdrawID;
    delete $row_set_obj$$1$$.Status;
    delete $row_set_obj$$1$$.Amount;
    delete $row_set_obj$$1$$.Currency;
    delete $row_set_obj$$1$$.Created;
    delete $row_set_obj$$1$$.Type;
    delete $row_set_obj$$1$$.WithdrawID;
    var $detail_obj$$ = {}, $key$$74$$;
    for($key$$74$$ in $row_set_obj$$1$$) {
      $row_set_obj$$1$$[$key$$74$$] != $JSCompiler_alias_NULL$$ && ($detail_obj$$[$key$$74$$] = $row_set_obj$$1$$[$key$$74$$])
    }
    return JSON.stringify($detail_obj$$)
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details"
  }}]}, $opt_domHelper$$9$$)
}
$goog$inherits$$($bitex$ui$WithdrawList$$, $bitex$ui$DataGrid$$);
var $bitex$ui$WithdrawList$CSS_CLASS$$ = "withdraw-list";
$bitex$ui$WithdrawList$$.prototype.$getCssClass$ = function $$bitex$ui$WithdrawList$$$$$getCssClass$$() {
  return $bitex$ui$WithdrawList$CSS_CLASS$$
};
$bitex$ui$WithdrawList$$.prototype.$getRowClass$ = function $$bitex$ui$WithdrawList$$$$$getRowClass$$($row_set$$2$$) {
  var $class_status$$1$$;
  switch($row_set$$2$$.Status) {
    case "1":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-pending";
      break;
    case "2":
      $class_status$$1$$ = $bitex$ui$WithdrawList$CSS_CLASS$$ + "-complete"
  }
  return $class_status$$1$$
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$WithdrawList$CSS_CLASS$$, function() {
  return new $bitex$ui$WithdrawList$$
});
// Input 72
function $bitex$ui$OrderEntryX$$($opt_blinkDelay$$, $opt_domHelper$$10$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$10$$);
  this.$marketPrice_$ = 0;
  this.$lastChangedField_$ = "amount"
}
$goog$inherits$$($bitex$ui$OrderEntryX$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$OrderEntryX$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($dom$$6_element$$104$$) {
  this.$element_$ = $dom$$6_element$$104$$;
  $dom$$6_element$$104$$ = this.$getDomHelper$();
  this.$symbolEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-symbol", this.$getElement$());
  this.$sideEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-side", this.$getElement$());
  this.$typeEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-type", this.$getElement$());
  this.$actionButtonEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-action", this.$getElement$());
  this.$amountEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-amount", this.$getElement$());
  this.$priceEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-price", this.$getElement$());
  this.$totalEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-total", this.$getElement$());
  this.$feeEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-fee", this.$getElement$());
  this.$clientIdEl_$ = $dom$$6_element$$104$$.$getElementByClass$(this.$getBaseCssClass$() + "-client-id", this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$OrderEntryX$$.$superClass_$.$enterDocument$.call(this);
  console.log("bitex.ui.OrderEntryX.prototype.enterDocument");
  var $handler$$51$$ = this.$getHandler$();
  this.$getDomHelper$();
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$KeyHandler$$(this.$amountEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$KeyHandler$$(this.$priceEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$KeyHandler$$(this.$totalEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$KeyHandler$$(this.$feeEl_$), $goog$events$KeyHandler$EventType$KEY$$, this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$InputHandler$$(this.$amountEl_$), "input", this.$onChangeAmount_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$InputHandler$$(this.$priceEl_$), "input", this.$onChangePrice_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$InputHandler$$(this.$totalEl_$), "input", this.$onChangeTotal_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, new $goog$events$InputHandler$$(this.$feeEl_$), "input", this.$onChangeFee_$);
  $JSCompiler_StaticMethods_listen$$($handler$$51$$, this.$actionButtonEl_$, "click", this.$onAction_$)
};
$JSCompiler_prototypeAlias$$.$onBlockNonNumberKeys_$ = function $$JSCompiler_prototypeAlias$$$$onBlockNonNumberKeys_$$($e$$51$$) {
  console.log("bitex.ui.OrderEntryX.prototype.onBlockNonNumberKeys_");
  var $inputEl$$ = $e$$51$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$);
  if(!$goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$51$$) && (38 == $e$$51$$.keyCode || 40 == $e$$51$$.keyCode)) {
    var $new_value$$1_startPos_value_to_change$$;
    $new_value$$1_startPos_value_to_change$$ = $inputEl$$.selectionStart;
    var $endPos$$1_originalStartPos$$ = $inputEl$$.selectionEnd;
    $new_value$$1_startPos_value_to_change$$ === $endPos$$1_originalStartPos$$ && 0 === $new_value$$1_startPos_value_to_change$$ ? ($new_value$$1_startPos_value_to_change$$ = $inputValue$$, $endPos$$1_originalStartPos$$ = $inputValue$$.length) : ("." === $inputValue$$.substr($new_value$$1_startPos_value_to_change$$ - 1, 1) && --$endPos$$1_originalStartPos$$, $new_value$$1_startPos_value_to_change$$ = $inputValue$$.substr(0, $endPos$$1_originalStartPos$$));
    var $match$$inline_293_number_of_decimal_places_originalEndPos$$;
    $match$$inline_293_number_of_decimal_places_originalEndPos$$ = ("" + $new_value$$1_startPos_value_to_change$$).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    $match$$inline_293_number_of_decimal_places_originalEndPos$$ = !$match$$inline_293_number_of_decimal_places_originalEndPos$$ ? 0 : Math.max(0, ($match$$inline_293_number_of_decimal_places_originalEndPos$$[1] ? $match$$inline_293_number_of_decimal_places_originalEndPos$$[1].length : 0) - ($match$$inline_293_number_of_decimal_places_originalEndPos$$[2] ? +$match$$inline_293_number_of_decimal_places_originalEndPos$$[2] : 0));
    var $value_to_add$$ = 1 / Math.pow(10, $match$$inline_293_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$);
    if(isNaN($new_value$$1_startPos_value_to_change$$)) {
      return
    }
    $new_value$$1_startPos_value_to_change$$ = 38 == $e$$51$$.keyCode ? $new_value$$1_startPos_value_to_change$$ + $value_to_add$$ : $new_value$$1_startPos_value_to_change$$ - $value_to_add$$;
    $new_value$$1_startPos_value_to_change$$ = (Math.round($new_value$$1_startPos_value_to_change$$ * Math.pow(10, $match$$inline_293_number_of_decimal_places_originalEndPos$$)) / Math.pow(10, $match$$inline_293_number_of_decimal_places_originalEndPos$$)).toFixed($match$$inline_293_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = "" + $new_value$$1_startPos_value_to_change$$ + $inputValue$$.substr($endPos$$1_originalStartPos$$);
    0 > $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$) && ($new_value$$1_startPos_value_to_change$$ = (0).toFixed($match$$inline_293_number_of_decimal_places_originalEndPos$$));
    $endPos$$1_originalStartPos$$ = $inputEl$$.selectionStart;
    $match$$inline_293_number_of_decimal_places_originalEndPos$$ = $inputEl$$.selectionEnd;
    $goog$dom$forms$setValue$$($inputEl$$, $new_value$$1_startPos_value_to_change$$);
    $inputValue$$.length == $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$, $inputEl$$.selectionEnd = $match$$inline_293_number_of_decimal_places_originalEndPos$$) : $inputValue$$.length > $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ - 1, $inputEl$$.selectionEnd = $match$$inline_293_number_of_decimal_places_originalEndPos$$ - 1) : ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ + 
    1, $inputEl$$.selectionEnd = $match$$inline_293_number_of_decimal_places_originalEndPos$$ + 1);
    switch($e$$51$$.target) {
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
    $e$$51$$.preventDefault()
  }
  if(!$e$$51$$.ctrlKey && ($e$$51$$.shiftKey || !(48 <= $e$$51$$.keyCode && 57 >= $e$$51$$.keyCode)) && $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$51$$)) {
    switch($e$$51$$.keyCode) {
      case 46:
      ;
      case 8:
      ;
      case 9:
        return;
      case 110:
      ;
      case 190:
        if($inputEl$$ = $e$$51$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$), 0 > $inputValue$$.indexOf(".")) {
          return
        }
    }
    $e$$51$$.preventDefault()
  }
};
$JSCompiler_prototypeAlias$$.$getSymbol$ = function $$JSCompiler_prototypeAlias$$$$getSymbol$$() {
  return $goog$dom$forms$getValue$$(this.$symbolEl_$)
};
function $JSCompiler_StaticMethods_setAmountCurrencySign$$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$, $value$$94$$) {
  var $elements$$4$$ = $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getBaseCssClass$() + "-amount-sign", $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$4$$, function($el$$50$$) {
    $goog$dom$setTextContent$$($el$$50$$, $value$$94$$)
  })
}
function $JSCompiler_StaticMethods_setPriceCurrencySign$$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$, $value$$95$$) {
  var $elements$$5$$ = $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getBaseCssClass$() + "-price-sign", $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$5$$, function($el$$51$$) {
    $goog$dom$setTextContent$$($el$$51$$, $value$$95$$)
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
// Input 73
function $bitex$view$OfferBookView$$($app$$3$$, $opt_domHelper$$11$$) {
  $bitex$view$View$$.call(this, $app$$3$$, $opt_domHelper$$11$$);
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
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($buy_order_entry_element$$105$$) {
  this.$element_$ = $buy_order_entry_element$$105$$;
  $buy_order_entry_element$$105$$ = new $bitex$ui$OrderEntryX$$;
  var $sell_order_entry$$ = new $bitex$ui$OrderEntryX$$;
  $JSCompiler_StaticMethods_addChild$$(this, $buy_order_entry_element$$105$$);
  $JSCompiler_StaticMethods_addChild$$(this, $sell_order_entry$$);
  $buy_order_entry_element$$105$$.$decorate$($goog$dom$getElement$$("id_order_entry_buy"));
  $sell_order_entry$$.$decorate$($goog$dom$getElement$$("id_order_entry_sell"))
};
function $JSCompiler_StaticMethods_destroyOrderBookComponents_$$($JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$) {
  var $handler$$52$$ = $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$getHandler$();
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$.$dispose$());
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$.$dispose$());
  if($JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$ != $JSCompiler_alias_NULL$$) {
    var $conn$$ = $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$app_$.$conn_$;
    $JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBClear_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBDeleteOrdersThru_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBDeleteOrder_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBUpdateOrder_$);
    $JSCompiler_StaticMethods_unlisten$$($handler$$52$$, $conn$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$onOBNewOrder_$);
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.dispatchEvent("md_unsubscribe");
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_id_$ = $JSCompiler_alias_NULL$$;
    $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$market_data_subscription_symbol_$ = $JSCompiler_alias_NULL$$
  }
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_bid_$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$self$$.$order_book_offer_$ = $JSCompiler_alias_NULL$$
}
function $JSCompiler_StaticMethods_recreateOrderBookComponents_$$($JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$, $selected_symbol$$1$$) {
  var $handler$$53$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$getHandler$(), $conn$$1_model$$1$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$app_$.$model_$;
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_symbol_$ !== $selected_symbol$$1$$.$symbol$ && ($JSCompiler_StaticMethods_destroyOrderBookComponents_$$($JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$ = new $bitex$ui$OrderBook$$($conn$$1_model$$1$$.get("Username"), $bitex$ui$OrderBook$Side$BUY$$, $selected_symbol$$1$$.$qty_currency$, $selected_symbol$$1$$.$price_currency$), 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$ = new $bitex$ui$OrderBook$$($conn$$1_model$$1$$.get("Username"), $bitex$ui$OrderBook$Side$SELL$$, $selected_symbol$$1$$.$qty_currency$, $selected_symbol$$1$$.$price_currency$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$.$decorate$($goog$dom$getElement$$("order_book_bid")), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$.$decorate$($goog$dom$getElement$$("order_book_offer")), 
  $JSCompiler_StaticMethods_listen$$($handler$$53$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_bid_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onCancelOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$53$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$order_book_offer_$, $bitex$ui$OrderBook$EventType$CANCEL$$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onCancelOrder_$), 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$ = parseInt(1E7 * Math.random(), 10), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_symbol_$ = $selected_symbol$$1$$.$symbol$, $conn$$1_model$$1$$ = $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$app_$.$conn_$, $JSCompiler_StaticMethods_listen$$($handler$$53$$, $conn$$1_model$$1$$, $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, 
  $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBClear_$), $JSCompiler_StaticMethods_listen$$($handler$$53$$, $conn$$1_model$$1$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBDeleteOrdersThru_$), $JSCompiler_StaticMethods_listen$$($handler$$53$$, $conn$$1_model$$1$$, $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + 
  "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBDeleteOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$53$$, $conn$$1_model$$1$$, $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBUpdateOrder_$), $JSCompiler_StaticMethods_listen$$($handler$$53$$, 
  $conn$$1_model$$1$$, $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$market_data_subscription_id_$, $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.$onOBNewOrder_$), $JSCompiler_StaticMethods_recreateOrderBookComponents_$self$$.dispatchEvent("md_subscribe"))
}
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$OfferBookView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$54$$ = this.$getHandler$(), $model$$2$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$54$$, $model$$2$$, "model_setSelectedSymbol", function() {
    var $selected_symbol$$2$$ = $model$$2$$.get("SelectedSymbol"), $symbol$$2_value$$inline_325$$ = $selected_symbol$$2$$.$symbol$, $buy_order_entry$$1_value$$inline_328$$ = $JSCompiler_StaticMethods_getChildAt$$(this, 0), $sell_order_entry$$1$$ = $JSCompiler_StaticMethods_getChildAt$$(this, 1);
    $goog$dom$forms$setValue$$($buy_order_entry$$1_value$$inline_328$$.$symbolEl_$, $symbol$$2_value$$inline_325$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($buy_order_entry$$1_value$$inline_328$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($buy_order_entry$$1_value$$inline_328$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    $goog$dom$forms$setValue$$($sell_order_entry$$1$$.$symbolEl_$, $symbol$$2_value$$inline_325$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$qty_currency$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($sell_order_entry$$1$$, $selected_symbol$$2$$.$price_currency$.$sign$);
    var $market$$ = $JSCompiler_alias_NULL$$;
    $model$$2$$.get("AllowedMarkets") != $JSCompiler_alias_NULL$$ && ($market$$ = $model$$2$$.get("AllowedMarkets")[$symbol$$2_value$$inline_325$$]);
    $goog$style$showElement$$($sell_order_entry$$1$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_328$$.$getElement$(), $market$$ != $JSCompiler_alias_NULL$$);
    $symbol$$2_value$$inline_325$$ = $model$$2$$.get("IsBroker");
    $goog$style$showElement$$($buy_order_entry$$1_value$$inline_328$$.$clientIdEl_$, $symbol$$2_value$$inline_325$$);
    $buy_order_entry$$1_value$$inline_328$$ = $model$$2$$.get("IsBroker");
    $goog$style$showElement$$($sell_order_entry$$1$$.$clientIdEl_$, $buy_order_entry$$1_value$$inline_328$$);
    $JSCompiler_StaticMethods_recreateOrderBookComponents_$$(this, $selected_symbol$$2$$)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onOBClear_$ = function $$JSCompiler_prototypeAlias$$$$onOBClear_$$() {
  this.$order_book_offer_$ != $JSCompiler_alias_NULL$$ && (this.$order_book_bid_$.clear(), this.$order_book_offer_$.clear())
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrdersThru_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrdersThru_$$($e$$59_index$$68$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$15_side$$2$$ = $e$$59_index$$68$$.data;
    $e$$59_index$$68$$ = $msg$$15_side$$2$$.MDEntryPositionNo;
    $msg$$15_side$$2$$ = $msg$$15_side$$2$$.MDEntryType;
    "0" == $msg$$15_side$$2$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_bid_$, $e$$59_index$$68$$) : "1" == $msg$$15_side$$2$$ && $JSCompiler_StaticMethods_deleteOrderThru$$(this.$order_book_offer_$, $e$$59_index$$68$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBDeleteOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBDeleteOrder_$$($e$$60_index$$69$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$16_side$$3$$ = $e$$60_index$$69$$.data;
    $e$$60_index$$69$$ = $msg$$16_side$$3$$.MDEntryPositionNo - 1;
    $msg$$16_side$$3$$ = $msg$$16_side$$3$$.MDEntryType;
    "0" == $msg$$16_side$$3$$ ? $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_bid_$, $e$$60_index$$69$$) : "1" == $msg$$16_side$$3$$ && $JSCompiler_StaticMethods_deleteOrder$$(this.$order_book_offer_$, $e$$60_index$$69$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBUpdateOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBUpdateOrder_$$($e$$61_index$$70$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$17_side$$4$$ = $e$$61_index$$70$$.data;
    $e$$61_index$$70$$ = $msg$$17_side$$4$$.MDEntryPositionNo - 1;
    var $qty$$1$$ = $msg$$17_side$$4$$.MDEntrySize / 1E8, $msg$$17_side$$4$$ = $msg$$17_side$$4$$.MDEntryType;
    "0" == $msg$$17_side$$4$$ ? $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_bid_$, $e$$61_index$$70$$, $qty$$1$$) : "1" == $msg$$17_side$$4$$ && $JSCompiler_StaticMethods_updateOrder$$(this.$order_book_offer_$, $e$$61_index$$70$$, $qty$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onOBNewOrder_$ = function $$JSCompiler_prototypeAlias$$$$onOBNewOrder_$$($e$$62_index$$71$$) {
  if(this.$order_book_offer_$ != $JSCompiler_alias_NULL$$) {
    var $msg$$18_side$$5$$ = $e$$62_index$$71$$.data;
    $e$$62_index$$71$$ = $msg$$18_side$$5$$.MDEntryPositionNo - 1;
    var $price$$1$$ = $msg$$18_side$$5$$.MDEntryPx / 1E8, $qty$$2$$ = $msg$$18_side$$5$$.MDEntrySize / 1E8, $username$$2$$ = $msg$$18_side$$5$$.Username, $broker$$1$$ = $msg$$18_side$$5$$.Broker, $orderId$$ = $msg$$18_side$$5$$.OrderID, $msg$$18_side$$5$$ = $msg$$18_side$$5$$.MDEntryType;
    "0" == $msg$$18_side$$5$$ ? this.$order_book_bid_$.$insertOrder$($e$$62_index$$71$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$) : "1" == $msg$$18_side$$5$$ && this.$order_book_offer_$.$insertOrder$($e$$62_index$$71$$, $orderId$$, $price$$1$$, $qty$$2$$, $username$$2$$, $broker$$1$$)
  }
};
$JSCompiler_prototypeAlias$$.$onCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onCancelOrder_$$($e$$63$$) {
  this.$order_id_$ = $e$$63$$.$order_id$;
  this.$client_order_id_$ = $e$$63$$.$client_order_id$;
  this.dispatchEvent("cancel_order")
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $bitex$view$OfferBookView$$.$superClass_$.$exitDocument$.call(this);
  $JSCompiler_StaticMethods_destroyOrderBookComponents_$$(this)
};
// Input 74
function $bitex$ui$OrderManager$$($opt_blinkDelay$$1$$, $opt_domHelper$$12$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-id"
  }}, {property:"OrdStatus", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$26$$) {
    return $bitex$ui$OrderManager$Status$$[$s$$26$$]
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-status"
  }}, {property:"Side", label:"Side", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$27$$) {
    switch($s$$27$$) {
      case "1":
        return"Buy";
      case "2":
        return"Sell"
    }
    return""
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-side"
  }}, {property:"OrderQty", label:"Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$28$$) {
    return($s$$28$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-qty"
  }}, {property:"Price", label:"Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$29$$) {
    return($s$$29$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-price"
  }}, {property:"LeavesQty", label:"Leaves Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$30$$) {
    return($s$$30$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-leaves_qty"
  }}, {property:"CumQty", label:"Cum Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$31$$) {
    return($s$$31$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Average Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$32$$) {
    return($s$$32$$ / 1E8).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-avg-price"
  }}, {property:"ClOrdID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, formatter:function($id$$7$$, $row_set_obj$$2$$) {
    var $attributes$$1_i$$125$$ = {"class":"icon-remove", "data-client-order-id":$id$$7$$};
    $row_set_obj$$2$$ != $JSCompiler_alias_NULL$$ && ($attributes$$1_i$$125$$["data-order-id"] = $row_set_obj$$2$$.OrderID);
    $attributes$$1_i$$125$$ = $goog$dom$createDom$$("i", $attributes$$1_i$$125$$);
    return $goog$dom$createDom$$("a", {"class":"text-error", href:"#"}, $attributes$$1_i$$125$$)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$12$$)
}
$goog$inherits$$($bitex$ui$OrderManager$$, $bitex$ui$DataGrid$$);
var $bitex$ui$OrderManager$Status$$ = {"-":"Pending", 0:"New", 1:"Partially filled", 2:"Filled", 4:"Cancelled"}, $bitex$ui$OrderManager$CSS_CLASS$$ = "order-manager";
$bitex$ui$OrderManager$$.prototype.$getCssClass$ = function $$bitex$ui$OrderManager$$$$$getCssClass$$() {
  return $bitex$ui$OrderManager$CSS_CLASS$$
};
$bitex$ui$OrderManager$$.prototype.$getRowClass$ = function $$bitex$ui$OrderManager$$$$$getRowClass$$($row_set$$3$$) {
  var $class_id$$ = "client-order-id-" + $row_set$$3$$.ClOrdID, $class_status$$2$$;
  switch($row_set$$3$$.OrdStatus) {
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
$bitex$ui$OrderManager$$.prototype.$insertOrder$ = function $$bitex$ui$OrderManager$$$$$insertOrder$$($clientOrderId_tr_attributes$$, $dom$$10_status$$1$$, $side$$6_tr$$2$$, $orderQty$$, $price$$2$$, $leavesQty$$, $cumQty_opt_cumQty$$, $avgPx_opt_avgPrice$$, $opt_orderId_orderId$$1$$) {
  var $status_class_status_desc$$;
  switch($dom$$10_status$$1$$) {
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
  $status_class_status_desc$$ = $bitex$ui$OrderManager$Status$$[$dom$$10_status$$1$$];
  $dom$$10_status$$1$$ = this.$getDomHelper$();
  $side$$6_tr$$2$$ = $dom$$10_status$$1$$.$createDom$("tr", $clientOrderId_tr_attributes$$, $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-id", "" + $opt_orderId_orderId$$1$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-status", "" + $status_class_status_desc$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-side", "" + $side$$6_tr$$2$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-order-qty", "" + $orderQty$$), $dom$$10_status$$1$$.$createDom$("td", 
  this.$getCssClass$() + "-price", "" + $price$$2$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-leaves-qty", "" + $leavesQty$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-cum-qty", "" + $cumQty_opt_cumQty$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-avg-px", "" + $avgPx_opt_avgPrice$$), $dom$$10_status$$1$$.$createDom$("td", this.$getCssClass$() + "-actions", $dom$$10_status$$1$$.$createDom$("a", {"class":"text-error", href:""}, $dom$$10_status$$1$$.$createDom$("i", 
  {"class":"icon-remove"}))));
  $dom$$10_status$$1$$.appendChild(this.$tbody_$, $side$$6_tr$$2$$)
};
$bitex$ui$OrderManager$$.prototype.$enterDocument$ = function $$bitex$ui$OrderManager$$$$$enterDocument$$() {
  $bitex$ui$OrderManager$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($client_order_id_e$$64$$) {
    var $order_id$$ = $client_order_id_e$$64$$.target.getAttribute("data-order-id");
    $order_id$$ != $JSCompiler_alias_NULL$$ ? this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $order_id$$)) : ($client_order_id_e$$64$$ = $client_order_id_e$$64$$.target.getAttribute("data-client-order-id"), this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $JSCompiler_alias_VOID$$, $client_order_id_e$$64$$)))
  })
};
function $bitex$ui$OrderManagerEvent$$($type$$100$$, $opt_order_id$$, $opt_client_order_id$$) {
  $goog$events$Event$$.call(this, $type$$100$$);
  this.$order_id$ = $opt_order_id$$;
  this.$client_order_id$ = $opt_client_order_id$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$OrderManager$CSS_CLASS$$, function() {
  return new $bitex$ui$OrderManager$$
});
// Input 75
// Input 76
// Input 77
function $goog$a11y$aria$setState$$($element$$108$$, $state$$2$$, $value$$104$$) {
  $element$$108$$.setAttribute("aria-" + $state$$2$$, $value$$104$$)
}
;
// Input 78
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$2$$) {
  var $element$$114$$ = $control$$2$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$2$$).join(" "), $control$$2$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$2$$, $element$$114$$);
  return $element$$114$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$115$$) {
  return $element$$115$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$3_element$$116$$, $className$$19$$, $enable$$1$$) {
  if($control$$3_element$$116$$ = $control$$3_element$$116$$.$getElement$ ? $control$$3_element$$116$$.$getElement$() : $control$$3_element$$116$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$3_element$$116$$), $className$$19$$);
      $combinedClasses$$.push($className$$19$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$3_element$$116$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$3_element$$116$$, $className$$19$$) : $goog$dom$classes$remove$$($control$$3_element$$116$$, $className$$19$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$5$$, $element$$118$$) {
  $element$$118$$.id && $JSCompiler_StaticMethods_setId$$($control$$5$$, $element$$118$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$118$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$5$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$5$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$3$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$2$$ = $goog$dom$classes$get$$($element$$118$$);
  $goog$array$forEach$$($classNames$$2$$, function($className$$21_state$$inline_339$$) {
    if(!$hasRendererClassName$$ && $className$$21_state$$inline_339$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$21_state$$inline_339$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$11$$ = $state$$3$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_752$$ = this.$classByState_$, $transposed$$inline_753$$ = {}, $key$$inline_754$$;
          for($key$$inline_754$$ in $obj$$inline_752$$) {
            $transposed$$inline_753$$[$obj$$inline_752$$[$key$$inline_754$$]] = $key$$inline_754$$
          }
          this.$stateByClass_$ = $transposed$$inline_753$$
        }
        $className$$21_state$$inline_339$$ = parseInt(this.$stateByClass_$[$className$$21_state$$inline_339$$], 10);
        $state$$3$$ = $JSCompiler_temp_const$$11$$ | (isNaN($className$$21_state$$inline_339$$) ? 0 : $className$$21_state$$inline_339$$)
      }
    }
  }, this);
  $control$$5$$.$state_$ = $state$$3$$;
  $hasRendererClassName$$ || ($classNames$$2$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$2$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$5$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$2$$.push.apply($classNames$$2$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$2$$.push.apply($classNames$$2$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$118$$.className = $classNames$$2$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$5$$, $element$$118$$);
  return $element$$118$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$6$$) {
  $control$$6$$.$isRightToLeft$() && this.$setRightToLeft$($control$$6$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$6$$.isEnabled() && this.$setFocusable$($control$$6$$, $control$$6$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$7$$, $element$$120$$) {
  $control$$7$$.$visible_$ || $goog$a11y$aria$setState$$($element$$120$$, "hidden", !$control$$7$$.$visible_$);
  $control$$7$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$120$$, 1, !$control$$7$$.isEnabled());
  $control$$7$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$120$$, 8, !!($control$$7$$.$state_$ & 8));
  $control$$7$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$120$$, 16, !!($control$$7$$.$state_$ & 16));
  $control$$7$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$120$$, 64, !!($control$$7$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$121$$, $allow$$) {
  var $unselectable$$inline_348_value$$inline_351$$ = !$allow$$, $descendants$$inline_350$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$121$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_348_value$$inline_351$$ = $unselectable$$inline_348_value$$inline_351$$ ? "none" : "", $element$$121$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_348_value$$inline_351$$, $descendants$$inline_350$$) {
      for(var $i$$inline_352$$ = 0, $descendant$$inline_353$$;$descendant$$inline_353$$ = $descendants$$inline_350$$[$i$$inline_352$$];$i$$inline_352$$++) {
        $descendant$$inline_353$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_348_value$$inline_351$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_348_value$$inline_351$$ = $unselectable$$inline_348_value$$inline_351$$ ? "on" : "", $element$$121$$.setAttribute("unselectable", $unselectable$$inline_348_value$$inline_351$$), $descendants$$inline_350$$) {
        for($i$$inline_352$$ = 0;$descendant$$inline_353$$ = $descendants$$inline_350$$[$i$$inline_352$$];$i$$inline_352$$++) {
          $descendant$$inline_353$$.setAttribute("unselectable", $unselectable$$inline_348_value$$inline_351$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$122$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$122$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
};
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($control$$8$$) {
  var $keyTarget$$;
  return $control$$8$$.$supportedStates_$ & 32 && ($keyTarget$$ = $control$$8$$.$getKeyEventTarget$()) ? $goog$dom$isFocusableTabIndex$$($keyTarget$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = function $$JSCompiler_prototypeAlias$$$$setFocusable$$($control$$9$$, $focusable$$) {
  var $keyTarget$$1$$;
  if($control$$9$$.$supportedStates_$ & 32 && ($keyTarget$$1$$ = $control$$9$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$9$$.$state_$ & 32) {
      try {
        $keyTarget$$1$$.blur()
      }catch($e$$65$$) {
      }
      $control$$9$$.$state_$ & 32 && $control$$9$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$123$$, $visible$$) {
  $goog$style$showElement$$($element$$123$$, $visible$$);
  $element$$123$$ && $goog$a11y$aria$setState$$($element$$123$$, "hidden", !$visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$10$$, $state$$4$$, $enable$$3$$) {
  var $element$$124$$ = $control$$10$$.$getElement$();
  if($element$$124$$) {
    var $className$$22$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$4$$);
    $className$$22$$ && this.$enableClassName$($control$$10$$, $className$$22$$, $enable$$3$$);
    this.$updateAriaState$($element$$124$$, $state$$4$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$125$$, $ariaState_state$$5$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$5$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$5$$]) && $goog$a11y$aria$setState$$($element$$125$$, $ariaState_state$$5$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$126$$, $content$$6$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$126$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$6$$)) {
    if($goog$isString$$($content$$6$$)) {
      $goog$dom$setTextContent$$($contentElem$$1$$, $content$$6$$)
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$16$$) {
        if($child$$16$$) {
          var $doc$$34$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$16$$) ? $doc$$34$$.createTextNode($child$$16$$) : $child$$16$$)
        }
      };
      $goog$isArray$$($content$$6$$) ? $goog$array$forEach$$($content$$6$$, $childHandler$$1$$) : $goog$isArrayLike$$($content$$6$$) && !("nodeType" in $content$$6$$) ? $goog$array$forEach$$($goog$array$toArray$$($content$$6$$), $childHandler$$1$$) : $childHandler$$1$$($content$$6$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$11$$) {
  return $control$$11$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$12$$) {
  var $cssClass_extraClassNames$$1_state$$inline_356$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$3$$ = [$cssClass_extraClassNames$$1_state$$inline_356$$], $classNames$$inline_357_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_357_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_356$$ && $classNames$$3$$.push($classNames$$inline_357_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_356$$ = $control$$12$$.$getState$();
  for($classNames$$inline_357_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_356$$;) {
    var $mask$$inline_358$$ = $cssClass_extraClassNames$$1_state$$inline_356$$ & -$cssClass_extraClassNames$$1_state$$inline_356$$;
    $classNames$$inline_357_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_358$$));
    $cssClass_extraClassNames$$1_state$$inline_356$$ &= ~$mask$$inline_358$$
  }
  $classNames$$3$$.push.apply($classNames$$3$$, $classNames$$inline_357_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_356$$ = $control$$12$$.$extraClassNames_$) && $classNames$$3$$.push.apply($classNames$$3$$, $cssClass_extraClassNames$$1_state$$inline_356$$);
  $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7") && $classNames$$3$$.push.apply($classNames$$3$$, $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$3$$));
  return $classNames$$3$$
}
function $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classes$$7$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$7$$ = $classes$$7$$.concat([$opt_includedClass$$]));
  $goog$array$forEach$$([], function($combo$$) {
    $goog$array$every$$($combo$$, $goog$partial$$($goog$array$contains$$, $classes$$7$$)) && (!$opt_includedClass$$ || $goog$array$contains$$($combo$$, $opt_includedClass$$)) && $toAdd$$.push($combo$$.join("_"))
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
// Input 79
// Input 80
// Input 81
function $goog$events$KeyHandler$$($opt_element$$11$$, $opt_capture$$8$$) {
  $goog$Disposable$$.call(this);
  $opt_element$$11$$ && $JSCompiler_StaticMethods_attach$$(this, $opt_element$$11$$, $opt_capture$$8$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$66$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$66$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$66$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$66$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$66$$.ctrlKey && 17 != $e$$66$$.keyCode ? this.$lastKey_$ = 17 : $e$$66$$.altKey && 18 != $e$$66$$.keyCode ? this.$lastKey_$ = 18 : $e$$66$$.metaKey && 91 != $e$$66$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$66$$.keyCode, this.$lastKey_$, $e$$66$$.shiftKey, $e$$66$$.ctrlKey, $e$$66$$.altKey) ? this.handleEvent($e$$66$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$66$$.keyCode) : $e$$66$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$66$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$67$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$67$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$68_repeat$$) {
  var $be$$3_event$$3$$ = $e$$68_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$3_event$$3$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$68_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$3_event$$3$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$68_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$3_event$$3$$.charCode && 63232 > $be$$3_event$$3$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$3_event$$3$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$3_event$$3$$.keyCode : 0) : ($keyCode$$3$$ = $be$$3_event$$3$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$3_event$$3$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$75$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$3_event$$3$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$75$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$68_repeat$$.shiftKey && ($key$$75$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$75$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$68_repeat$$ = $key$$75$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$75$$;
  $be$$3_event$$3$$ = new $goog$events$KeyEvent$$($key$$75$$, $charCode$$, $e$$68_repeat$$, $be$$3_event$$3$$);
  $be$$3_event$$3$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$3_event$$3$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$128$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$128$$;
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
function $goog$events$KeyEvent$$($keyCode$$4$$, $charCode$$1$$, $repeat$$1$$, $browserEvent$$) {
  $browserEvent$$ && this.init($browserEvent$$, $JSCompiler_alias_VOID$$);
  this.type = $goog$events$KeyHandler$EventType$KEY$$;
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
// Input 82
function $goog$ui$Control$$($content$$7$$, $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$, $opt_domHelper$$13$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$13$$);
  if(!$JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$) {
    $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$ = this.constructor;
    for(var $key$$inline_367_rendererCtor$$inline_368$$;$JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$;) {
      $key$$inline_367_rendererCtor$$inline_368$$ = $goog$getUid$$($JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$);
      if($key$$inline_367_rendererCtor$$inline_368$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_367_rendererCtor$$inline_368$$]) {
        break
      }
      $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$ = $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$ = $key$$inline_367_rendererCtor$$inline_368$$ ? $goog$isFunction$$($key$$inline_367_rendererCtor$$inline_368$$.$getInstance$) ? $key$$inline_367_rendererCtor$$inline_368$$.$getInstance$() : new $key$$inline_367_rendererCtor$$inline_368$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$32_componentCtor$$inline_366_opt_renderer$$;
  this.$content_$ = $content$$7$$
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
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$26$$, $enable$$6$$) {
  $enable$$6$$ ? $className$$26$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$26$$) || this.$extraClassNames_$.push($className$$26$$) : this.$extraClassNames_$ = [$className$$26$$], this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_TRUE$$)) : $className$$26$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$26$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $element$$129$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$129$$;
  var $ariaRole$$inline_395$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_395$$ && $element$$129$$.setAttribute("role", $ariaRole$$inline_395$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$129$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$129$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$130$$) {
  return this.$renderer_$.$canDecorate$($element$$130$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$131$$) {
  this.$element_$ = $element$$131$$ = this.$renderer_$.$decorate$(this, $element$$131$$);
  var $ariaRole$$inline_403$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_403$$ && $element$$131$$.setAttribute("role", $ariaRole$$inline_403$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$131$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$131$$.style.display
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
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$56$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$132$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$56$$, $element$$132$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$132$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$132$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$132$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$56$$, $element$$132$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$56$$, $element$$132$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$56$$, $element$$132$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$132$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$132$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$132$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$56$$, $element$$132$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$56$$, $element$$132$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($content$$8$$) {
  this.$renderer_$.$setContent$(this.$getElement$(), $content$$8$$);
  this.$content_$ = $content$$8$$
};
function $JSCompiler_StaticMethods_setContentInternal$$($JSCompiler_StaticMethods_setContentInternal$self$$, $content$$9$$) {
  $JSCompiler_StaticMethods_setContentInternal$self$$.$content_$ = $content$$9$$
}
function $JSCompiler_StaticMethods_getCaption$$($JSCompiler_StaticMethods_getCaption$self_content$$10$$) {
  $JSCompiler_StaticMethods_getCaption$self_content$$10$$ = $JSCompiler_StaticMethods_getCaption$self_content$$10$$.$content_$;
  return!$JSCompiler_StaticMethods_getCaption$self_content$$10$$ ? "" : ($goog$isString$$($JSCompiler_StaticMethods_getCaption$self_content$$10$$) ? $JSCompiler_StaticMethods_getCaption$self_content$$10$$ : $goog$isArray$$($JSCompiler_StaticMethods_getCaption$self_content$$10$$) ? $goog$array$map$$($JSCompiler_StaticMethods_getCaption$self_content$$10$$, $goog$dom$getRawTextContent$$).join("") : $goog$dom$getTextContent$$($JSCompiler_StaticMethods_getCaption$self_content$$10$$)).replace(/[\t\r\n ]+/g, 
  " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$3$$) {
  $goog$ui$Control$$.$superClass_$.$setRightToLeft$.call(this, $rightToLeft$$3$$);
  var $element$$133$$ = this.$getElement$();
  $element$$133$$ && this.$renderer_$.$setRightToLeft$($element$$133$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$134$$ = this.$getElement$();
  $element$$134$$ && this.$renderer_$.$setAllowTextSelection$($element$$134$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$135$$ = this.$getElement$();
    $element$$135$$ && this.$renderer_$.$setVisible$($element$$135$$, $visible$$1$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$1$$);
    this.$visible_$ = $visible$$1$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$8$$) {
  var $parent$$inline_409$$ = this.getParent();
  if((!$parent$$inline_409$$ || "function" != typeof $parent$$inline_409$$.isEnabled || $parent$$inline_409$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$8$$)) {
    $enable$$8$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$8$$), this.$setState$(1, !$enable$$8$$)
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
$JSCompiler_prototypeAlias$$.$getState$ = $JSCompiler_get$$("$state_$");
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$10$$, $enable$$9$$) {
  this.$supportedStates_$ & $state$$10$$ && $enable$$9$$ != !!(this.$state_$ & $state$$10$$) && (this.$renderer_$.$setState$(this, $state$$10$$, $enable$$9$$), this.$state_$ = $enable$$9$$ ? this.$state_$ | $state$$10$$ : this.$state_$ & ~$state$$10$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$(32, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ &= -33
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$14$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$14$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$14$$)
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$16$$, $enable$$12$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$16$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$16$$) != $enable$$12$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$16$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$16$$, $enable$$12$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$69$$) {
  (!$e$$69$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$69$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$70$$) {
  if((!$e$$70$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$70$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$72$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$72$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$72$$) && $e$$72$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$73$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$isActive$() && (this.$performActionInternal$($e$$73$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$74$$) {
  this.isEnabled() && this.$performActionInternal$($e$$74$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$75$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_412_open$$inline_418$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_412_open$$inline_418$$) && this.$setState$(16, $actionEvent_check$$inline_412_open$$inline_418$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_412_open$$inline_418$$ = !(this.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_412_open$$inline_418$$) && this.$setState$(64, $actionEvent_check$$inline_412_open$$inline_418$$));
  $actionEvent_check$$inline_412_open$$inline_418$$ = new $goog$events$Event$$("action", this);
  $e$$75$$ && ($actionEvent_check$$inline_412_open$$inline_418$$.altKey = $e$$75$$.altKey, $actionEvent_check$$inline_412_open$$inline_418$$.ctrlKey = $e$$75$$.ctrlKey, $actionEvent_check$$inline_412_open$$inline_418$$.metaKey = $e$$75$$.metaKey, $actionEvent_check$$inline_412_open$$inline_418$$.shiftKey = $e$$75$$.shiftKey, $actionEvent_check$$inline_412_open$$inline_418$$.$platformModifierKey$ = $e$$75$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_412_open$$inline_418$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$78$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$78$$) ? ($e$$78$$.preventDefault(), $e$$78$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$79$$) {
  return 13 == $e$$79$$.keyCode && this.$performActionInternal$($e$$79$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_428$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_428$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 83
// Input 84
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$136$$, $state$$17$$, $enable$$13$$) {
  16 == $state$$17$$ ? $goog$a11y$aria$setState$$($element$$136$$, "pressed", $enable$$13$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$136$$, $state$$17$$, $enable$$13$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$137$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$105$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$105$$ && this.$setTooltip$($element$$137$$, $tooltip_value$$105$$);
  ($tooltip_value$$105$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$137$$, $tooltip_value$$105$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$137$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$137$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$138$$) {
  $element$$138$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$138$$);
  var $value$$inline_431$$ = this.$getValue$($element$$138$$);
  $button$$2$$.$value_$ = $value$$inline_431$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$138$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$138$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$138$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$139$$) {
  return $element$$139$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$140$$, $tooltip$$1$$) {
  $element$$140$$ && ($element$$140$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 85
function $goog$ui$NativeButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$NativeButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$NativeButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$NativeButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$4$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$4$$);
  $button$$4$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$4$$);
  return $button$$4$$.$getDomHelper$().$createDom$("button", {"class":$JSCompiler_StaticMethods_getClassNames$$(this, $button$$4$$).join(" "), disabled:!$button$$4$$.isEnabled(), title:$button$$4$$.$getTooltip$() || "", value:$button$$4$$.$getValue$() || ""}, $JSCompiler_StaticMethods_getCaption$$($button$$4$$) || "")
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$141$$) {
  return"BUTTON" == $element$$141$$.tagName || "INPUT" == $element$$141$$.tagName && ("button" == $element$$141$$.type || "submit" == $element$$141$$.type || "reset" == $element$$141$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$142$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$5$$);
  $button$$5$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$5$$);
  $element$$142$$.disabled && $goog$dom$classes$add$$($element$$142$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$142$$)
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($button$$6$$) {
  $JSCompiler_StaticMethods_listen$$($button$$6$$.$getHandler$(), $button$$6$$.$getElement$(), "click", $button$$6$$.$performActionInternal$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($button$$7$$) {
  return $button$$7$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$143$$, $state$$18$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$143$$, $state$$18$$, $enable$$14$$);
  if(($button$$8_element$$143$$ = $button$$8_element$$143$$.$getElement$()) && 1 == $state$$18$$) {
    $button$$8_element$$143$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$144$$) {
  return $element$$144$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$145$$, $value$$106$$) {
  $element$$145$$ && ($element$$145$$.value = $value$$106$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 86
function $goog$ui$Button$$($content$$11$$, $opt_renderer$$1$$, $opt_domHelper$$14$$) {
  $goog$ui$Control$$.call(this, $content$$11$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$14$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$107$$) {
  this.$value_$ = $value$$107$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$107$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$80$$) {
  return 13 == $e$$80$$.keyCode && $e$$80$$.type == $goog$events$KeyHandler$EventType$KEY$$ || 32 == $e$$80$$.keyCode && "keyup" == $e$$80$$.type ? this.$performActionInternal$($e$$80$$) : 32 == $e$$80$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 87
function $bitex$view$NullView$$($app$$4$$, $opt_domHelper$$15$$) {
  $bitex$view$View$$.call(this, $app$$4$$, $opt_domHelper$$15$$)
}
$goog$inherits$$($bitex$view$NullView$$, $bitex$view$View$$);
$bitex$view$NullView$$.prototype.$enterView$ = function $$bitex$view$NullView$$$$$enterView$$() {
  console.log("enterView:" + this.$getId$())
};
$bitex$view$NullView$$.prototype.$exitView$ = function $$bitex$view$NullView$$$$$exitView$$() {
  console.log("exitView:" + this.$getId$())
};
// Input 88
function $goog$json$parse$$($o$$1_s$$34$$) {
  $o$$1_s$$34$$ = String($o$$1_s$$34$$);
  if(/^\s*$/.test($o$$1_s$$34$$) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test($o$$1_s$$34$$.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + $o$$1_s$$34$$ + ")")
    }catch($ex$$9$$) {
    }
  }
  $JSCompiler_alias_THROW$$(Error("Invalid JSON string: " + $o$$1_s$$34$$))
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
      var $sep$$inline_446$$ = "", $key$$inline_447$$;
      for($key$$inline_447$$ in $object$$7$$) {
        if(Object.prototype.hasOwnProperty.call($object$$7$$, $key$$inline_447$$)) {
          var $value$$inline_448$$ = $object$$7$$[$key$$inline_447$$];
          "function" != typeof $value$$inline_448$$ && ($sb$$7$$.push($sep$$inline_446$$), $JSCompiler_StaticMethods_serializeString_$$($key$$inline_447$$, $sb$$7$$), $sb$$7$$.push(":"), $JSCompiler_StaticMethods_serialize_$$($JSCompiler_StaticMethods_serialize_$self$$, $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$ ? $JSCompiler_StaticMethods_serialize_$self$$.$replacer_$.call($object$$7$$, $key$$inline_447$$, $value$$inline_448$$) : $value$$inline_448$$, $sb$$7$$), $sep$$inline_446$$ = 
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
function $JSCompiler_StaticMethods_serializeString_$$($s$$36$$, $sb$$8$$) {
  $sb$$8$$.push('"', $s$$36$$.replace($goog$json$Serializer$charsToReplace_$$, function($c$$1$$) {
    if($c$$1$$ in $goog$json$Serializer$charToJsonCharCache_$$) {
      return $goog$json$Serializer$charToJsonCharCache_$$[$c$$1$$]
    }
    var $cc$$2$$ = $c$$1$$.charCodeAt(0), $rv$$21$$ = "\\u";
    16 > $cc$$2$$ ? $rv$$21$$ += "000" : 256 > $cc$$2$$ ? $rv$$21$$ += "00" : 4096 > $cc$$2$$ && ($rv$$21$$ += "0");
    return $goog$json$Serializer$charToJsonCharCache_$$[$c$$1$$] = $rv$$21$$ + $cc$$2$$.toString(16)
  }), '"')
}
$goog$json$Serializer$$.prototype.serializeArray = function $$goog$json$Serializer$$$$serializeArray$($arr$$66$$, $sb$$10$$) {
  var $l$$24$$ = $arr$$66$$.length;
  $sb$$10$$.push("[");
  for(var $sep_value$$109$$ = "", $i$$126$$ = 0;$i$$126$$ < $l$$24$$;$i$$126$$++) {
    $sb$$10$$.push($sep_value$$109$$), $sep_value$$109$$ = $arr$$66$$[$i$$126$$], $JSCompiler_StaticMethods_serialize_$$(this, this.$replacer_$ ? this.$replacer_$.call($arr$$66$$, String($i$$126$$), $sep_value$$109$$) : $sep_value$$109$$, $sb$$10$$), $sep_value$$109$$ = ","
  }
  $sb$$10$$.push("]")
};
// Input 89
function $bitex$ui$Customers$$($opt_domHelper$$16$$) {
  this.$selected_customer_$ = $JSCompiler_alias_NULL$$;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-username"
  }}, {property:"Email", label:"Email", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-email"
  }}, {property:"Verified", label:"Verified", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$37$$) {
    return $s$$37$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-verified"
  }}, {property:"TwoFactorEnabled", label:"Two step", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$38$$) {
    return $s$$38$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-two-steps"
  }}, {property:"LastLogin", label:"Last seen", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}, {property:"ID", label:"Actions", sortable:$JSCompiler_alias_TRUE$$, formatter:function($id$$9$$, $row_set_obj$$3$$) {
    var $data_row$$1$$;
    $data_row$$1$$ = (new $goog$json$Serializer$$($JSCompiler_alias_VOID$$)).serialize($row_set_obj$$3$$);
    return $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-deposit", "data-row":$data_row$$1$$}, "Details")
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}]}, $opt_domHelper$$16$$)
}
$goog$inherits$$($bitex$ui$Customers$$, $bitex$ui$DataGrid$$);
var $bitex$ui$Customers$CSS_CLASS$$ = "customers";
$bitex$ui$Customers$$.prototype.$getCssClass$ = function $$bitex$ui$Customers$$$$$getCssClass$$() {
  return $bitex$ui$Customers$CSS_CLASS$$
};
$bitex$ui$Customers$$.prototype.$getRowClass$ = function $$bitex$ui$Customers$$$$$getRowClass$$($row_set$$4$$) {
  return $row_set$$4$$.Verified ? $bitex$ui$Customers$CSS_CLASS$$ + "-verified" : $bitex$ui$Customers$CSS_CLASS$$ + "-non-verified"
};
$bitex$ui$Customers$$.prototype.$enterDocument$ = function $$bitex$ui$Customers$$$$$enterDocument$$() {
  $bitex$ui$Customers$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($e$$81$$) {
    this.$selected_customer_$ = $goog$json$parse$$($e$$81$$.target.getAttribute("data-row"));
    this.$selected_customer_$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent("detail")
  })
};
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$Customers$CSS_CLASS$$, function() {
  return new $bitex$ui$Customers$$
});
// Input 90
var $goog$i18n$NumberFormatSymbols_en$$ = {$DECIMAL_SEP$:".", $GROUP_SEP$:",", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", $MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"USD"}, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$;
// Input 91
var $goog$i18n$currency$CurrencyInfo$$ = {AED:[2, "dh", "\u062f.\u0625.", "DH"], AUD:[2, "$", "AU$"], BDT:[2, "\u09f3", "Tk"], BRL:[2, "R$", "R$"], CAD:[2, "$", "C$"], CHF:[2, "CHF", "CHF"], CLP:[0, "$", "CL$"], CNY:[2, "\u00a5", "RMB\u00a5"], COP:[0, "$", "COL$"], CRC:[0, "\u20a1", "CR\u20a1"], CZK:[2, "K\u010d", "K\u010d"], DKK:[18, "kr", "kr"], DOP:[2, "$", "RD$"], EGP:[2, "\u00a3", "LE"], EUR:[18, "\u20ac", "\u20ac"], GBP:[2, "\u00a3", "GB\u00a3"], HKD:[2, "$", "HK$"], ILS:[2, "\u20aa", "IL\u20aa"], 
INR:[2, "\u20b9", "Rs"], ISK:[0, "kr", "kr"], JMD:[2, "$", "JA$"], JPY:[0, "\u00a5", "JP\u00a5"], KRW:[0, "\u20a9", "KR\u20a9"], LKR:[2, "Rs", "SLRs"], MNT:[0, "\u20ae", "MN\u20ae"], MXN:[2, "$", "Mex$"], MYR:[2, "RM", "RM"], NOK:[18, "kr", "NOkr"], PAB:[2, "B/.", "B/."], PEN:[2, "S/.", "S/."], PHP:[2, "\u20b1", "Php"], PKR:[0, "Rs", "PKRs."], RUB:[42, "\u0440\u0443\u0431.", "\u0440\u0443\u0431."], SAR:[2, "Rial", "Rial"], SEK:[2, "kr", "kr"], SGD:[2, "$", "S$"], THB:[2, "\u0e3f", "THB"], TRY:[2, 
"TL", "YTL"], TWD:[2, "NT$", "NT$"], USD:[2, "$", "US$"], UYU:[2, "$", "UY$"], VND:[0, "\u20ab", "VN\u20ab"], YER:[0, "Rial", "Rial"], ZAR:[2, "R", "ZAR"]};
// Input 92
function $goog$i18n$NumberFormat$$($JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$, $opt_currency_strParts$$inline_699$$, $opt_currencyStyle_precision$$inline_700$$) {
  this.$intlCurrencyCode_$ = $opt_currency_strParts$$inline_699$$ || $goog$i18n$NumberFormatSymbols$$.$DEF_CURRENCY_CODE$;
  this.$currencyStyle_$ = $opt_currencyStyle_precision$$inline_700$$ || $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$;
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
  if("number" == typeof $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$) {
    switch($JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$) {
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
        $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$ = $goog$i18n$NumberFormatSymbols$$.$CURRENCY_PATTERN$;
        $opt_currency_strParts$$inline_699$$ = ["0"];
        $opt_currencyStyle_precision$$inline_700$$ = $goog$i18n$currency$CurrencyInfo$$[this.$intlCurrencyCode_$][0] & 7;
        if(0 < $opt_currencyStyle_precision$$inline_700$$) {
          $opt_currency_strParts$$inline_699$$.push(".");
          for(var $i$$inline_701$$ = 0;$i$$inline_701$$ < $opt_currencyStyle_precision$$inline_700$$;$i$$inline_701$$++) {
            $opt_currency_strParts$$inline_699$$.push("0")
          }
        }
        $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$ = $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$.replace(/0.00/g, $opt_currency_strParts$$inline_699$$.join(""));
        $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$);
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("Unsupported pattern type."))
    }
  }else {
    $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$660_pattern$$2_pattern$$inline_698$$)
  }
}
var $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$ = 0;
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$) {
  $JSCompiler_StaticMethods_applyPattern_$self$$.$pattern_$ = $pattern$$3$$.replace(/ /g, "\u00a0");
  var $pos$$6$$ = [0];
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$6$$);
  for(var $trunkLen_trunkStart$$ = $pos$$6$$[0], $decimalPos$$inline_459$$ = -1, $digitLeftCount$$inline_460$$ = 0, $n$$inline_466_zeroDigitCount$$inline_461$$ = 0, $digitRightCount$$inline_462_totalDigits$$inline_467$$ = 0, $groupingCount$$inline_463$$ = -1, $len$$inline_464$$ = $pattern$$3$$.length, $loop$$inline_465$$ = $JSCompiler_alias_TRUE$$;$pos$$6$$[0] < $len$$inline_464$$ && $loop$$inline_465$$;$pos$$6$$[0]++) {
    switch($pattern$$3$$.charAt($pos$$6$$[0])) {
      case "#":
        0 < $n$$inline_466_zeroDigitCount$$inline_461$$ ? $digitRightCount$$inline_462_totalDigits$$inline_467$$++ : $digitLeftCount$$inline_460$$++;
        0 <= $groupingCount$$inline_463$$ && 0 > $decimalPos$$inline_459$$ && $groupingCount$$inline_463$$++;
        break;
      case "0":
        0 < $digitRightCount$$inline_462_totalDigits$$inline_467$$ && $JSCompiler_alias_THROW$$(Error('Unexpected "0" in pattern "' + $pattern$$3$$ + '"'));
        $n$$inline_466_zeroDigitCount$$inline_461$$++;
        0 <= $groupingCount$$inline_463$$ && 0 > $decimalPos$$inline_459$$ && $groupingCount$$inline_463$$++;
        break;
      case ",":
        $groupingCount$$inline_463$$ = 0;
        break;
      case ".":
        0 <= $decimalPos$$inline_459$$ && $JSCompiler_alias_THROW$$(Error('Multiple decimal separators in pattern "' + $pattern$$3$$ + '"'));
        $decimalPos$$inline_459$$ = $digitLeftCount$$inline_460$$ + $n$$inline_466_zeroDigitCount$$inline_461$$ + $digitRightCount$$inline_462_totalDigits$$inline_467$$;
        break;
      case "E":
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && $JSCompiler_alias_THROW$$(Error('Multiple exponential symbols in pattern "' + $pattern$$3$$ + '"'));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ = $JSCompiler_alias_TRUE$$;
        $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$ = 0;
        $pos$$6$$[0] + 1 < $len$$inline_464$$ && "+" == $pattern$$3$$.charAt($pos$$6$$[0] + 1) && ($pos$$6$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$useSignForPositiveExponent_$ = $JSCompiler_alias_TRUE$$);
        for(;$pos$$6$$[0] + 1 < $len$$inline_464$$ && "0" == $pattern$$3$$.charAt($pos$$6$$[0] + 1);) {
          $pos$$6$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$++
        }
        (1 > $digitLeftCount$$inline_460$$ + $n$$inline_466_zeroDigitCount$$inline_461$$ || 1 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$) && $JSCompiler_alias_THROW$$(Error('Malformed exponential pattern "' + $pattern$$3$$ + '"'));
        $loop$$inline_465$$ = $JSCompiler_alias_FALSE$$;
        break;
      default:
        $pos$$6$$[0]--, $loop$$inline_465$$ = $JSCompiler_alias_FALSE$$
    }
  }
  0 == $n$$inline_466_zeroDigitCount$$inline_461$$ && (0 < $digitLeftCount$$inline_460$$ && 0 <= $decimalPos$$inline_459$$) && ($n$$inline_466_zeroDigitCount$$inline_461$$ = $decimalPos$$inline_459$$, 0 == $n$$inline_466_zeroDigitCount$$inline_461$$ && $n$$inline_466_zeroDigitCount$$inline_461$$++, $digitRightCount$$inline_462_totalDigits$$inline_467$$ = $digitLeftCount$$inline_460$$ - $n$$inline_466_zeroDigitCount$$inline_461$$, $digitLeftCount$$inline_460$$ = $n$$inline_466_zeroDigitCount$$inline_461$$ - 
  1, $n$$inline_466_zeroDigitCount$$inline_461$$ = 1);
  (0 > $decimalPos$$inline_459$$ && 0 < $digitRightCount$$inline_462_totalDigits$$inline_467$$ || 0 <= $decimalPos$$inline_459$$ && ($decimalPos$$inline_459$$ < $digitLeftCount$$inline_460$$ || $decimalPos$$inline_459$$ > $digitLeftCount$$inline_460$$ + $n$$inline_466_zeroDigitCount$$inline_461$$) || 0 == $groupingCount$$inline_463$$) && $JSCompiler_alias_THROW$$(Error('Malformed pattern "' + $pattern$$3$$ + '"'));
  $digitRightCount$$inline_462_totalDigits$$inline_467$$ = $digitLeftCount$$inline_460$$ + $n$$inline_466_zeroDigitCount$$inline_461$$ + $digitRightCount$$inline_462_totalDigits$$inline_467$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ = 0 <= $decimalPos$$inline_459$$ ? $digitRightCount$$inline_462_totalDigits$$inline_467$$ - $decimalPos$$inline_459$$ : 0;
  0 <= $decimalPos$$inline_459$$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = $digitLeftCount$$inline_460$$ + $n$$inline_466_zeroDigitCount$$inline_461$$ - $decimalPos$$inline_459$$, 0 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = 0));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = (0 <= $decimalPos$$inline_459$$ ? $decimalPos$$inline_459$$ : $digitRightCount$$inline_462_totalDigits$$inline_467$$) - $digitLeftCount$$inline_460$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$maximumIntegerDigits_$ = $digitLeftCount$$inline_460$$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$, 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ && 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = 1));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$groupingSize_$ = Math.max(0, $groupingCount$$inline_463$$);
  $JSCompiler_StaticMethods_applyPattern_$self$$.$decimalSeparatorAlwaysShown_$ = 0 == $decimalPos$$inline_459$$ || $decimalPos$$inline_459$$ == $digitRightCount$$inline_462_totalDigits$$inline_467$$;
  $trunkLen_trunkStart$$ = $pos$$6$$[0] - $trunkLen_trunkStart$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$6$$);
  $pos$$6$$[0] < $pattern$$3$$.length && $pattern$$3$$.charAt($pos$$6$$[0]) == $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ ? ($pos$$6$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$6$$), $pos$$6$$[0] += $trunkLen_trunkStart$$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, 
  $pattern$$3$$, $pos$$6$$)) : ($JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ += $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$)
}
$goog$i18n$NumberFormat$$.prototype.parse = function $$goog$i18n$NumberFormat$$$$parse$($text$$10$$, $opt_pos$$) {
  var $pos$$7$$ = $opt_pos$$ || [0], $ret$$4_text$$inline_470$$ = NaN;
  $text$$10$$ = $text$$10$$.replace(/ /g, "\u00a0");
  var $gotPositive$$ = $text$$10$$.indexOf(this.$positivePrefix_$, $pos$$7$$[0]) == $pos$$7$$[0], $gotNegative$$ = $text$$10$$.indexOf(this.$negativePrefix_$, $pos$$7$$[0]) == $pos$$7$$[0];
  $gotPositive$$ && $gotNegative$$ && (this.$positivePrefix_$.length > this.$negativePrefix_$.length ? $gotNegative$$ = $JSCompiler_alias_FALSE$$ : this.$positivePrefix_$.length < this.$negativePrefix_$.length && ($gotPositive$$ = $JSCompiler_alias_FALSE$$));
  $gotPositive$$ ? $pos$$7$$[0] += this.$positivePrefix_$.length : $gotNegative$$ && ($pos$$7$$[0] += this.$negativePrefix_$.length);
  if($text$$10$$.indexOf($goog$i18n$NumberFormatSymbols$$.$INFINITY$, $pos$$7$$[0]) == $pos$$7$$[0]) {
    $pos$$7$$[0] += $goog$i18n$NumberFormatSymbols$$.$INFINITY$.length, $ret$$4_text$$inline_470$$ = Infinity
  }else {
    for(var $ret$$4_text$$inline_470$$ = $text$$10$$, $sawDecimal$$inline_472$$ = $JSCompiler_alias_FALSE$$, $sawExponent$$inline_473$$ = $JSCompiler_alias_FALSE$$, $sawDigit$$inline_474$$ = $JSCompiler_alias_FALSE$$, $scale$$inline_475$$ = 1, $decimal$$inline_476$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$inline_477$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $exponentChar$$inline_478$$ = $goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$, $normalizedText$$inline_479$$ = "";$pos$$7$$[0] < 
    $ret$$4_text$$inline_470$$.length;$pos$$7$$[0]++) {
      var $ch$$inline_480$$ = $ret$$4_text$$inline_470$$.charAt($pos$$7$$[0]), $digit$$inline_481$$ = $JSCompiler_StaticMethods_getDigit_$$($ch$$inline_480$$);
      if(0 <= $digit$$inline_481$$ && 9 >= $digit$$inline_481$$) {
        $normalizedText$$inline_479$$ += $digit$$inline_481$$, $sawDigit$$inline_474$$ = $JSCompiler_alias_TRUE$$
      }else {
        if($ch$$inline_480$$ == $decimal$$inline_476$$.charAt(0)) {
          if($sawDecimal$$inline_472$$ || $sawExponent$$inline_473$$) {
            break
          }
          $normalizedText$$inline_479$$ += ".";
          $sawDecimal$$inline_472$$ = $JSCompiler_alias_TRUE$$
        }else {
          if($ch$$inline_480$$ == $grouping$$inline_477$$.charAt(0) && ("\u00a0" != $grouping$$inline_477$$.charAt(0) || $pos$$7$$[0] + 1 < $ret$$4_text$$inline_470$$.length && 0 <= $JSCompiler_StaticMethods_getDigit_$$($ret$$4_text$$inline_470$$.charAt($pos$$7$$[0] + 1)))) {
            if($sawDecimal$$inline_472$$ || $sawExponent$$inline_473$$) {
              break
            }
          }else {
            if($ch$$inline_480$$ == $exponentChar$$inline_478$$.charAt(0)) {
              if($sawExponent$$inline_473$$) {
                break
              }
              $normalizedText$$inline_479$$ += "E";
              $sawExponent$$inline_473$$ = $JSCompiler_alias_TRUE$$
            }else {
              if("+" == $ch$$inline_480$$ || "-" == $ch$$inline_480$$) {
                $normalizedText$$inline_479$$ += $ch$$inline_480$$
              }else {
                if($ch$$inline_480$$ == $goog$i18n$NumberFormatSymbols$$.$PERCENT$.charAt(0)) {
                  if(1 != $scale$$inline_475$$) {
                    break
                  }
                  $scale$$inline_475$$ = 100;
                  if($sawDigit$$inline_474$$) {
                    $pos$$7$$[0]++;
                    break
                  }
                }else {
                  if($ch$$inline_480$$ == $goog$i18n$NumberFormatSymbols$$.$PERMILL$.charAt(0)) {
                    if(1 != $scale$$inline_475$$) {
                      break
                    }
                    $scale$$inline_475$$ = 1E3;
                    if($sawDigit$$inline_474$$) {
                      $pos$$7$$[0]++;
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
    $ret$$4_text$$inline_470$$ = parseFloat($normalizedText$$inline_479$$) / $scale$$inline_475$$
  }
  if($gotPositive$$) {
    if($text$$10$$.indexOf(this.$positiveSuffix_$, $pos$$7$$[0]) != $pos$$7$$[0]) {
      return NaN
    }
    $pos$$7$$[0] += this.$positiveSuffix_$.length
  }else {
    if($gotNegative$$) {
      if($text$$10$$.indexOf(this.$negativeSuffix_$, $pos$$7$$[0]) != $pos$$7$$[0]) {
        return NaN
      }
      $pos$$7$$[0] += this.$negativeSuffix_$.length
    }
  }
  return $gotNegative$$ ? -$ret$$4_text$$inline_470$$ : $ret$$4_text$$inline_470$$
};
$goog$i18n$NumberFormat$$.prototype.$format$ = function $$goog$i18n$NumberFormat$$$$$format$$($number_number$$inline_484$$) {
  if(isNaN($number_number$$inline_484$$)) {
    return $goog$i18n$NumberFormatSymbols$$.$NAN$
  }
  var $parts$$3$$ = [], $isNegative$$ = 0 > $number_number$$inline_484$$ || 0 == $number_number$$inline_484$$ && 0 > 1 / $number_number$$inline_484$$;
  $parts$$3$$.push($isNegative$$ ? this.$negativePrefix_$ : this.$positivePrefix_$);
  if(isFinite($number_number$$inline_484$$)) {
    if($number_number$$inline_484$$ = $number_number$$inline_484$$ * ($isNegative$$ ? -1 : 1) * this.$multiplier_$, this.$useExponentialNotation_$) {
      if(0 == $number_number$$inline_484$$) {
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_484$$, this.$minimumIntegerDigits_$, $parts$$3$$), $JSCompiler_StaticMethods_addExponentPart_$$(this, 0, $parts$$3$$)
      }else {
        var $exponent$$inline_486$$ = Math.floor(Math.log($number_number$$inline_484$$) / Math.log(10));
        $number_number$$inline_484$$ /= Math.pow(10, $exponent$$inline_486$$);
        var $minIntDigits$$inline_487$$ = this.$minimumIntegerDigits_$;
        if(1 < this.$maximumIntegerDigits_$ && this.$maximumIntegerDigits_$ > this.$minimumIntegerDigits_$) {
          for(;0 != $exponent$$inline_486$$ % this.$maximumIntegerDigits_$;) {
            $number_number$$inline_484$$ *= 10, $exponent$$inline_486$$--
          }
          $minIntDigits$$inline_487$$ = 1
        }else {
          1 > this.$minimumIntegerDigits_$ ? ($exponent$$inline_486$$++, $number_number$$inline_484$$ /= 10) : ($exponent$$inline_486$$ -= this.$minimumIntegerDigits_$ - 1, $number_number$$inline_484$$ *= Math.pow(10, this.$minimumIntegerDigits_$ - 1))
        }
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_484$$, $minIntDigits$$inline_487$$, $parts$$3$$);
        $JSCompiler_StaticMethods_addExponentPart_$$(this, $exponent$$inline_486$$, $parts$$3$$)
      }
    }else {
      $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_484$$, this.$minimumIntegerDigits_$, $parts$$3$$)
    }
  }else {
    $parts$$3$$.push($goog$i18n$NumberFormatSymbols$$.$INFINITY$)
  }
  $parts$$3$$.push($isNegative$$ ? this.$negativeSuffix_$ : this.$positiveSuffix_$);
  return $parts$$3$$.join("")
};
function $JSCompiler_StaticMethods_subformatFixed_$$($JSCompiler_StaticMethods_subformatFixed_$self$$, $i$$129_intValue_number$$1$$, $fracPart_minIntDigits$$, $parts$$4$$) {
  var $fracLen_power$$ = Math.pow(10, $JSCompiler_StaticMethods_subformatFixed_$self$$.$maximumFractionDigits_$), $shiftedNumber_translatableInt_zeroCode$$ = Math.round($i$$129_intValue_number$$1$$ * $fracLen_power$$), $fracValue$$;
  isFinite($shiftedNumber_translatableInt_zeroCode$$) ? ($i$$129_intValue_number$$1$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ / $fracLen_power$$), $fracValue$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ - $i$$129_intValue_number$$1$$ * $fracLen_power$$)) : $fracValue$$ = 0;
  for(var $fractionPresent$$ = 0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ || 0 < $fracValue$$, $intPart$$ = "", $shiftedNumber_translatableInt_zeroCode$$ = $i$$129_intValue_number$$1$$;1E20 < $shiftedNumber_translatableInt_zeroCode$$;) {
    $intPart$$ = "0" + $intPart$$, $shiftedNumber_translatableInt_zeroCode$$ = Math.round($shiftedNumber_translatableInt_zeroCode$$ / 10)
  }
  var $intPart$$ = $shiftedNumber_translatableInt_zeroCode$$ + $intPart$$, $decimal$$1$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$1$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $shiftedNumber_translatableInt_zeroCode$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$.charCodeAt(0), $digitLen$$ = $intPart$$.length;
  if(0 < $i$$129_intValue_number$$1$$ || 0 < $fracPart_minIntDigits$$) {
    for($i$$129_intValue_number$$1$$ = $digitLen$$;$i$$129_intValue_number$$1$$ < $fracPart_minIntDigits$$;$i$$129_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
    }
    for($i$$129_intValue_number$$1$$ = 0;$i$$129_intValue_number$$1$$ < $digitLen$$;$i$$129_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $intPart$$.charAt($i$$129_intValue_number$$1$$))), 1 < $digitLen$$ - $i$$129_intValue_number$$1$$ && (0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$ && 1 == ($digitLen$$ - $i$$129_intValue_number$$1$$) % $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$) && $parts$$4$$.push($grouping$$1$$)
    }
  }else {
    $fractionPresent$$ || $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
  }
  ($JSCompiler_StaticMethods_subformatFixed_$self$$.$decimalSeparatorAlwaysShown_$ || $fractionPresent$$) && $parts$$4$$.push($decimal$$1$$);
  $fracPart_minIntDigits$$ = "" + ($fracValue$$ + $fracLen_power$$);
  for($fracLen_power$$ = $fracPart_minIntDigits$$.length;"0" == $fracPart_minIntDigits$$.charAt($fracLen_power$$ - 1) && $fracLen_power$$ > $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ + 1;) {
    $fracLen_power$$--
  }
  for($i$$129_intValue_number$$1$$ = 1;$i$$129_intValue_number$$1$$ < $fracLen_power$$;$i$$129_intValue_number$$1$$++) {
    $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $fracPart_minIntDigits$$.charAt($i$$129_intValue_number$$1$$)))
  }
}
function $JSCompiler_StaticMethods_addExponentPart_$$($JSCompiler_StaticMethods_addExponentPart_$self$$, $exponent_exponentDigits$$, $parts$$5$$) {
  $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$);
  0 > $exponent_exponentDigits$$ ? ($exponent_exponentDigits$$ = -$exponent_exponentDigits$$, $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$MINUS_SIGN$)) : $JSCompiler_StaticMethods_addExponentPart_$self$$.$useSignForPositiveExponent_$ && $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$PLUS_SIGN$);
  $exponent_exponentDigits$$ = "" + $exponent_exponentDigits$$;
  for(var $zeroChar$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$, $i$$130$$ = $exponent_exponentDigits$$.length;$i$$130$$ < $JSCompiler_StaticMethods_addExponentPart_$self$$.$minExponentDigits_$;$i$$130$$++) {
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
function $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_parseAffix_$self$$, $pattern$$4$$, $pos$$9$$) {
  for(var $affix$$ = "", $inQuote$$ = $JSCompiler_alias_FALSE$$, $len$$3$$ = $pattern$$4$$.length;$pos$$9$$[0] < $len$$3$$;$pos$$9$$[0]++) {
    var $ch$$5_currencyCode$$inline_489$$ = $pattern$$4$$.charAt($pos$$9$$[0]);
    if("'" == $ch$$5_currencyCode$$inline_489$$) {
      $pos$$9$$[0] + 1 < $len$$3$$ && "'" == $pattern$$4$$.charAt($pos$$9$$[0] + 1) ? ($pos$$9$$[0]++, $affix$$ += "'") : $inQuote$$ = !$inQuote$$
    }else {
      if($inQuote$$) {
        $affix$$ += $ch$$5_currencyCode$$inline_489$$
      }else {
        switch($ch$$5_currencyCode$$inline_489$$) {
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
            if($pos$$9$$[0] + 1 < $len$$3$$ && "\u00a4" == $pattern$$4$$.charAt($pos$$9$$[0] + 1)) {
              $pos$$9$$[0]++, $affix$$ += $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$
            }else {
              switch($JSCompiler_StaticMethods_parseAffix_$self$$.$currencyStyle_$) {
                case $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$:
                  $affix$$ += $goog$i18n$currency$CurrencyInfo$$[$JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$][1];
                  break;
                case 2:
                  var $ch$$5_currencyCode$$inline_489$$ = $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$, $info$$inline_490$$ = $goog$i18n$currency$CurrencyInfo$$[$ch$$5_currencyCode$$inline_489$$], $affix$$ = $affix$$ + ($ch$$5_currencyCode$$inline_489$$ == $info$$inline_490$$[1] ? $ch$$5_currencyCode$$inline_489$$ : $ch$$5_currencyCode$$inline_489$$ + " " + $info$$inline_490$$[1]);
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
            $affix$$ += $ch$$5_currencyCode$$inline_489$$
        }
      }
    }
  }
  return $affix$$
}
;
// Input 93
function $bitex$ui$OrderBook$$($username$$3$$, $side$$7$$, $qtyCurrencyDef$$, $priceCurrencyDef$$, $opt_blinkDelay$$2$$, $opt_domHelper$$17$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$17$$);
  this.$blink_delay_$ = $opt_blinkDelay$$2$$ || 700;
  this.$qtyCurrencyDef_$ = $qtyCurrencyDef$$;
  this.$priceCurrencyDef_$ = $priceCurrencyDef$$;
  this.$username_$ = $username$$3$$;
  this.$side_$ = $side$$7$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
var $bitex$ui$OrderBook$Side$BUY$$ = "0", $bitex$ui$OrderBook$Side$SELL$$ = "1", $bitex$ui$OrderBook$EventType$CANCEL$$ = "cancel";
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$146$$) {
  this.$element_$ = $element$$146$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_495$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_495$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$146$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$82$$) {
  var $cxlEl_orderId$$2$$ = $e$$82$$.target;
  if("A" == $cxlEl_orderId$$2$$.tagName || "I" == $cxlEl_orderId$$2$$.tagName) {
    $cxlEl_orderId$$2$$ = $cxlEl_orderId$$2$$.getAttribute("data-order-id"), $cxlEl_orderId$$2$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$($bitex$ui$OrderBook$EventType$CANCEL$$, $cxlEl_orderId$$2$$)), $e$$82$$.preventDefault(), $e$$82$$.stopPropagation())
  }
};
function $bitex$ui$OrderBookEvent$$($type$$101$$, $orderId$$3$$) {
  $goog$events$Event$$.call(this, $type$$101$$);
  this.$order_id$ = $orderId$$3$$
}
$goog$inherits$$($bitex$ui$OrderBookEvent$$, $goog$events$Event$$);
$bitex$ui$OrderBook$$.prototype.clear = function $$bitex$ui$OrderBook$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_deleteOrderThru$$($JSCompiler_StaticMethods_deleteOrderThru$self$$, $index$$72$$) {
  $JSCompiler_StaticMethods_deleteOrderThru$self$$.$getDomHelper$();
  for(var $child$$17$$;($child$$17$$ = $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.firstChild) && 0 < $index$$72$$;) {
    $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.removeChild($child$$17$$), $index$$72$$--
  }
}
function $JSCompiler_StaticMethods_deleteOrder$$($JSCompiler_StaticMethods_deleteOrder$self$$, $index$$73$$) {
  var $dom$$14$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $dom$$14$$.$getChildren$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$73$$];
  $dom$$14$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$74_trEl$$1$$, $qty$$3$$) {
  var $dom$$15$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $qty$$3$$ = (new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.$format$, $JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.code)).$format$($qty$$3$$);
  $index$$74_trEl$$1$$ = $dom$$15$$.$getChildren$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$74_trEl$$1$$];
  var $tdQtyEl$$ = $dom$$15$$.$getChildren$($index$$74_trEl$$1$$)[1];
  $dom$$15$$.$setTextContent$($tdQtyEl$$, $qty$$3$$);
  $goog$dom$classes$add$$($tdQtyEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, "warning")
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
$bitex$ui$OrderBook$$.prototype.$insertOrder$ = function $$bitex$ui$OrderBook$$$$$insertOrder$$($index$$75$$, $id$$10$$, $price$$3_priceEl$$, $qty$$4_qtyEl$$, $td_list_userNameEl_username$$4$$, $broker$$2$$) {
  var $dom$$16$$ = this.$getDomHelper$(), $formatter$$4$$ = new $goog$i18n$NumberFormat$$(this.$qtyCurrencyDef_$.$format$, this.$qtyCurrencyDef_$.code);
  $qty$$4_qtyEl$$ = $formatter$$4$$.$format$($qty$$4_qtyEl$$);
  $formatter$$4$$ = new $goog$i18n$NumberFormat$$(this.$priceCurrencyDef_$.$format$, this.$priceCurrencyDef_$.code);
  $price$$3_priceEl$$ = $formatter$$4$$.$format$($price$$3_priceEl$$);
  $price$$3_priceEl$$ = $dom$$16$$.$createDom$("td", this.$getBaseCssClass$() + "-price", $price$$3_priceEl$$);
  $qty$$4_qtyEl$$ = $dom$$16$$.$createDom$("td", this.$getBaseCssClass$() + "-qty", $qty$$4_qtyEl$$);
  $td_list_userNameEl_username$$4$$ = $td_list_userNameEl_username$$4$$ === this.$username_$ || $broker$$2$$ === this.$username_$ ? $dom$$16$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$16$$.$createDom$("a", {"class":"btn-cancel-order text-error", href:"", "data-order-id":$id$$10$$}, $dom$$16$$.$createDom$("i", {"class":"icon-remove", style:"line-height: 2px;", "data-order-id":$id$$10$$}, "  " + $td_list_userNameEl_username$$4$$))) : $dom$$16$$.$createDom$("td", this.$getBaseCssClass$() + 
  "-username", $td_list_userNameEl_username$$4$$);
  this.$side_$ == $bitex$ui$OrderBook$Side$BUY$$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$4$$, this.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price$$3_priceEl$$, this.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$4$$ = [$td_list_userNameEl_username$$4$$, $qty$$4_qtyEl$$, $price$$3_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$4$$, this.$getBaseCssClass$() + "-right"), $goog$dom$classes$add$$($price$$3_priceEl$$, this.$getBaseCssClass$() + 
  "-left"), $td_list_userNameEl_username$$4$$ = [$price$$3_priceEl$$, $qty$$4_qtyEl$$, $td_list_userNameEl_username$$4$$]);
  var $rowEl$$ = $dom$$16$$.$createDom$("tr", {"data-order-id":$id$$10$$, "class":this.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$4$$);
  $JSCompiler_StaticMethods_insertChildAt$$(this.$bodyEl_$, $rowEl$$, $index$$75$$);
  $goog$dom$classes$add$$($rowEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, "warning")
  }, this.$blink_delay_$, this)
};
// Input 94
function $bitex$view$AccountActivityView$$($app$$5$$, $opt_domHelper$$18$$) {
  $bitex$view$View$$.call(this, $app$$5$$, $opt_domHelper$$18$$);
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
  var $handler$$58$$ = this.$getHandler$();
  this.$account_activity_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$58$$, this.$account_activity_table_$, "request_data", this.$onAccountActivityTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$58$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, this.$onOrderListResponse_$), this.$account_activity_table_$.$dispose$());
  this.$request_order_id_$ = this.$account_activity_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$59$$ = this.$getHandler$();
  this.$destroyComponents_$();
  this.$request_order_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$52$$ = $goog$dom$getElement$$("id_trade_history_table");
  this.$account_activity_table_$ = new $bitex$ui$AccountActivity$$;
  $JSCompiler_StaticMethods_listen$$($handler$$59$$, this.$account_activity_table_$, "request_data", this.$onAccountActivityTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$59$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ + "." + this.$request_order_id_$, this.$onOrderListResponse_$);
  this.$account_activity_table_$.$decorate$($el$$52$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "Price", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "AvgPx", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "Volume", this.$priceFormatter_$, this);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$account_activity_table_$, "CumQty", this.$qtyFormatter_$, this)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$111$$, $rowSet$$) {
  return this.$app_$.$formatCurrency$($value$$111$$ / 1E8, $rowSet$$.Symbol.substr(3))
};
$JSCompiler_prototypeAlias$$.$qtyFormatter_$ = function $$JSCompiler_prototypeAlias$$$$qtyFormatter_$$($value$$112$$, $rowSet$$1$$) {
  return this.$app_$.$formatCurrency$($value$$112$$ / 1E8, $rowSet$$1$$.Symbol.substr(0, 3))
};
$JSCompiler_prototypeAlias$$.$onAccountActivityTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onAccountActivityTableRequestData_$$($e$$83$$) {
  this.$app_$.$conn_$.$requestOrderList$(this.$request_order_id_$, $e$$83$$.options.Page, $e$$83$$.options.Limit, ["1", "2"])
};
$JSCompiler_prototypeAlias$$.$onOrderListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onOrderListResponse_$$($e$$84_msg$$19$$) {
  this.$account_activity_table_$ != $JSCompiler_alias_NULL$$ && ($e$$84_msg$$19$$ = $e$$84_msg$$19$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$account_activity_table_$, $e$$84_msg$$19$$.OrdListGrp, $e$$84_msg$$19$$.Columns))
};
// Input 95
// Input 96
// Input 97
// Input 98
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$(8);
// Input 99
// Input 100
// Input 101
function $soy$$0$0escapeHtml$$($value$$113$$) {
  return"object" === typeof $value$$113$$ && $value$$113$$ && 0 === $value$$113$$.$contentKind$ ? $value$$113$$.content : String($value$$113$$).replace($soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$, $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$)
}
var $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
function $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$($ch$$10$$) {
  return $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$[$ch$$10$$]
}
var $soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$ = /[\x00\x22\x26\x27\x3c\x3e]/g;
// Input 102
function $bitex$templates$GoogleAuthenticationCodeDialogContent$$() {
  var $output$$2$$;
  return $output$$2$$ = "" + ('Google Authenticator code: <input id="' + $soy$$0$0escapeHtml$$("id_second_factor") + '" placeholder="eg. 555555" size="10">')
}
function $bitex$templates$WithdrawConfirmationDialogContent$$() {
  var $output$$3$$;
  return $output$$3$$ = "" + ('<p>We just sent a confirmation code to your email.</p><input id="' + $soy$$0$0escapeHtml$$("id_withdraw_confirmation") + '" placeholder="Confirmation code" class="input-block-level"><p><i>This is security measure to improve your account security</i></p>')
}
function $bitex$templates$YourAccountSummary$$($currencyList47_opt_data$$7$$) {
  var $output$$5$$;
  $output$$5$$ = '<h6>Your account</h6><table class="data"><tbody>';
  $currencyList47_opt_data$$7$$ = $currencyList47_opt_data$$7$$.$currencies$;
  for(var $currencyListLen47$$ = $currencyList47_opt_data$$7$$.length, $currencyIndex47$$ = 0;$currencyIndex47$$ < $currencyListLen47$$;$currencyIndex47$$++) {
    $output$$5$$ += '<tr><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyList47_opt_data$$7$$[$currencyIndex47$$]) + '" data-blink-class="balance-info-blink"></span></td></tr>'
  }
  return $output$$5$$ + "</tbody></table>"
}
function $bitex$templates$YourAccountBalances$$($currencyList55_opt_data$$8$$) {
  var $output$$6$$ = '<table class="table table-striped" style="width: 300px"><tbody>';
  $currencyList55_opt_data$$8$$ = $currencyList55_opt_data$$8$$.$currencies$;
  for(var $currencyListLen55$$ = $currencyList55_opt_data$$8$$.length, $currencyIndex55$$ = 0;$currencyIndex55$$ < $currencyListLen55$$;$currencyIndex55$$++) {
    var $currencyData55$$ = $currencyList55_opt_data$$8$$[$currencyIndex55$$], $MSG_UNNAMED_253$$ = "Available " + $soy$$0$0escapeHtml$$($currencyData55$$.code), $output$$6$$ = $output$$6$$ + ("<tr><td><strong>" + $MSG_UNNAMED_253$$ + '</strong></td><td><span class="bitex-model" data-model-key="formatted_balance_' + $soy$$0$0escapeHtml$$($currencyData55$$.$code_lower$) + '" data-blink-class="balance-info-blink"></span></td></tr>')
  }
  return $output$$6$$ + "</tbody></table>"
}
function $bitex$templates$AccountOverviewHeader$$($opt_data$$9_output$$7$$) {
  return $opt_data$$9_output$$7$$ = "" + ('<div class="row-fluid"><div class="span5 account-overview-label"> <span>ID:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.ID) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Username:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.Username) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Email:</span></div><div class="span7 account-overview-value">' + 
  $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.Email) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>State:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.State) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Country:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.CountryCode) + 
  '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Last login:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.LastLogin) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Is verified:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.Verified) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Has two step authentication:</span></div><div class="span7 account-overview-value">' + 
  $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.TwoFactorEnabled) + '</div></div><div class="row-fluid"><div class="span5 account-overview-label"> <span>Registration date:</span></div><div class="span7 account-overview-value">' + $soy$$0$0escapeHtml$$($opt_data$$9_output$$7$$.$msg_customer_detail$.Created) + "</div></div>")
}
function $bitex$templates$OrderBook$$($columnList119_opt_data$$10$$) {
  var $output$$8$$ = '<div class="text-center"><h4>' + $soy$$0$0escapeHtml$$($columnList119_opt_data$$10$$.title) + '</h4></div><table id="' + $soy$$0$0escapeHtml$$($columnList119_opt_data$$10$$.id) + '"  class="table"><thead><tr>';
  $columnList119_opt_data$$10$$ = $columnList119_opt_data$$10$$.$columns$;
  for(var $columnListLen119$$ = $columnList119_opt_data$$10$$.length, $columnIndex119$$ = 0;$columnIndex119$$ < $columnListLen119$$;$columnIndex119$$++) {
    $output$$8$$ += "<th>" + $soy$$0$0escapeHtml$$($columnList119_opt_data$$10$$[$columnIndex119$$]) + "</th>"
  }
  return $output$$8$$ + "</tr></thead><tbody></tbody></table>"
}
function $bitex$templates$OrderEntry$$($opt_data$$11$$) {
  var $output$$9$$;
  $output$$9$$ = "" + ('<div id="' + $soy$$0$0escapeHtml$$($opt_data$$11$$.id) + '" class="well span6 order-entry"><input type="hidden" name="symbol" class="order-entry-symbol" value="' + $soy$$0$0escapeHtml$$($opt_data$$11$$.$symbol$) + '"><input type="hidden" name="side" class="order-entry-side" value="' + $soy$$0$0escapeHtml$$($opt_data$$11$$.$side$) + '"><input type="hidden" name="type" class="order-entry-type" value="' + $soy$$0$0escapeHtml$$($opt_data$$11$$.type) + '"><div class="row-fluid"><div class="span5 order-entry-label"> <span>Amount:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-amount" type="text" value="" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"> <span>Price per <span class="order-entry-amount-sign">\u0e3f</span>:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-price" type="text" required/></div></div></div><div class="row-fluid"><div class="span5 order-entry-label"><span>Total:</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-price-sign">$</span><input class="input-block-level order-entry-total" type="text" required/></div></div></div><div class="row-fluid" ' + 
  ($opt_data$$11$$.$hide_fee$ ? 'style="display: none;"' : "") + ' ><div class="span5 order-entry-label"> <span>Fee (optional):</span></div><div class="span6"><div class="input-prepend input-block-level order-entry-data"><span class="add-on order-entry-amount-sign">\u0e3f</span><input class="input-block-level order-entry-fee" type="text" value="0" /></div></div></div><div class="row-fluid"><div class="span5"><input class="input-block-level order-entry-client-id" placeholder="Client ID" ' + ($opt_data$$11$$.$hide_client_id$ ? 
  'style="display:none"' : "") + ' /></div><div class="span5"><button class="btn ' + (1 == $opt_data$$11$$.$side$ ? "btn-success" : "btn-danger") + ' btn-execution order-entry-action">');
  $output$$9$$ = 1 == $opt_data$$11$$.$side$ ? $output$$9$$ + "BUY" : $output$$9$$ + "SELL";
  return $output$$9$$ + "</button></div></div></div>"
}
function $bitex$templates$DataGrid$$($opt_data$$12$$) {
  return"<div " + ($opt_data$$12$$.id ? 'id="' + $soy$$0$0escapeHtml$$($opt_data$$12$$.id) + '"' : "") + '  class="fuelux ' + ($opt_data$$12$$.$base_class$ ? $soy$$0$0escapeHtml$$($opt_data$$12$$.$base_class$) : "") + '" style="width:100%;"><table class="table table-bordered datagrid datagrid-stretch-header"><thead><tr><th colspan="4" ' + (!$opt_data$$12$$.title && !$opt_data$$12$$.$show_search$ ? 'style="display: none;"' : "") + '><span class="datagrid-header-title"  ' + (!$opt_data$$12$$.title ? 
  'style="display: none;"' : "") + " ><strong>" + $soy$$0$0escapeHtml$$($opt_data$$12$$.title) + '</strong></span><div class="datagrid-header-left" ' + (!$opt_data$$12$$.$show_search$ ? 'style="display: none;"' : "") + '><div class="input-append search datagrid-search"><input type="text" class="input-medium" placeholder="' + $soy$$0$0escapeHtml$$($opt_data$$12$$.$search_placeholder$) + '"><button type="button" class="btn"><i class="icon-search"></i></button></div></div><div class="datagrid-header-right"></div></th></tr></thead></table><div class="datagrid-stretch-wrapper" style="height:' + 
  ($opt_data$$12$$.$wrapper_height$ ? $soy$$0$0escapeHtml$$($opt_data$$12$$.$wrapper_height$) : "360") + 'px;"><table class="table table-bordered datagrid"><tbody></tbody></table></div><table class="table table-bordered datagrid datagrid-stretch-footer"><tfoot><tr><th colspan="4"><div class="datagrid-footer-left" style="visibility: visible;"><div class="grid-controls"><span><span class="grid-start"></span> -<span class="grid-end"></span></span></div></div><div class="datagrid-footer-right" style="visibility: visible;"><div class="grid-pager"><button type="button" class="btn grid-prevpage"><i class="icon-chevron-left"></i></button><button type="button" class="btn grid-nextpage"><i class="icon-chevron-right"></i></button></div></div></th></tr></tfoot></table></div>'
}
;
// Input 103
function $bitex$view$CustomersView$$($app$$6$$, $opt_domHelper$$19$$) {
  $bitex$view$View$$.call(this, $app$$6$$, $opt_domHelper$$19$$);
  this.$confirmation_token_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$CustomersView$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$CustomersView$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$() {
  this.$recreateComponents_$()
};
$JSCompiler_prototypeAlias$$.$exitView$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$148$$) {
  this.$element_$ = $element$$148$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$CustomersView$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$destroyComponents_$();
  $bitex$view$CustomersView$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$61$$ = this.$getHandler$();
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$61$$, this.$customers_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$61$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$), this.$customers_table_$.$dispose$());
  this.$request_id_$ = this.$customers_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$62$$ = this.$getHandler$();
  this.$customers_table_$ == $JSCompiler_alias_NULL$$ && (this.$request_id_$ = parseInt(1E7 * Math.random(), 10), this.$customers_table_$ = new $bitex$ui$Customers$$, $JSCompiler_StaticMethods_listen$$($handler$$62$$, this.$customers_table_$, "request_data", this.$onCustomerListTableRequestData_$), $JSCompiler_StaticMethods_listen$$($handler$$62$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onCustomerListReponse_$), $JSCompiler_StaticMethods_listen$$($handler$$62$$, 
  this.$customers_table_$, "detail", this.$onUserDetailsClick_$), this.$customers_table_$.$decorate$($goog$dom$getElement$$("id_customer_table")))
};
$JSCompiler_prototypeAlias$$.$onUserDetailsClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserDetailsClick_$$($data$$34_e$$85$$) {
  $data$$34_e$$85$$ = $data$$34_e$$85$$.target.$selected_customer_$;
  console.log("onUserDetailsClick_ " + $goog$debug$deepExpose$$($data$$34_e$$85$$));
  this.$app_$.$model_$.set("SelectedCustomer", $data$$34_e$$85$$);
  this.$app_$.$setView$("account_overview/" + $data$$34_e$$85$$.Username + "/")
};
$JSCompiler_prototypeAlias$$.$onCustomerListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListTableRequestData_$$($e$$86$$) {
  this.$app_$.$conn_$.$requestCustomerList$(this.$request_id_$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $e$$86$$.options.Filter, $e$$86$$.options.Page, $e$$86$$.options.Limit, [0, 1])
};
$JSCompiler_prototypeAlias$$.$onCustomerListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListReponse_$$($e$$87_msg$$20$$) {
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($e$$87_msg$$20$$ = $e$$87_msg$$20$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$customers_table_$, $e$$87_msg$$20$$.CustomerListGrp, $e$$87_msg$$20$$.Columns))
};
// Input 104
function $bitex$view$DepositView$$($app$$7$$, $opt_domHelper$$20$$) {
  $bitex$view$View$$.call(this, $app$$7$$, $opt_domHelper$$20$$)
}
$goog$inherits$$($bitex$view$DepositView$$, $bitex$view$View$$);
$bitex$view$DepositView$$.prototype.$getAmount$ = $JSCompiler_get$$("$amount_$");
$bitex$view$DepositView$$.prototype.$enterDocument$ = function $$bitex$view$DepositView$$$$$enterDocument$$() {
  $bitex$view$DepositView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$63$$ = this.$getHandler$(), $model$$4$$ = this.$app_$.$model_$, $boleto_buttons$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
  $goog$array$forEach$$($boleto_buttons$$, function($boleto_button$$) {
    $JSCompiler_StaticMethods_listen$$($handler$$63$$, $model$$4$$, "model_setBoletoOptions", function() {
      var $boleto_options$$ = $model$$4$$.get("BoletoOptions");
      $goog$array$forEach$$($boleto_options$$, function($boleto_option_buttonElement$$) {
        $boleto_option_buttonElement$$ = $goog$dom$createDom$$("BUTTON", {"data-boleto-id":$boleto_option_buttonElement$$.id, "class":"btn btn-primary btn-boleto"}, $boleto_option_buttonElement$$.description);
        $boleto_button$$.appendChild($boleto_option_buttonElement$$)
      }, this)
    }, this)
  }, this);
  $goog$array$forEach$$($boleto_buttons$$, function($boleto_button$$1$$) {
    $JSCompiler_StaticMethods_listen$$($handler$$63$$, $boleto_button$$1$$, "click", function($e$$89_value$$141$$) {
      $e$$89_value$$141$$.stopPropagation();
      $e$$89_value$$141$$.preventDefault();
      var $boleto_id_element$$149$$ = $e$$89_value$$141$$.target;
      $e$$89_value$$141$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_boleto_value"));
      $boleto_id_element$$149$$ = $boleto_id_element$$149$$.getAttribute("data-boleto-id");
      $boleto_id_element$$149$$ != $JSCompiler_alias_NULL$$ && ($goog$string$isEmpty$$($e$$89_value$$141$$) || /[^0-9]/.test($e$$89_value$$141$$) || 0 >= parseInt($e$$89_value$$141$$, 10) ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Por favor, preencha o valor do boleto a ser gerado") : (this.$amount_$ = parseInt($e$$89_value$$141$$, 10), this.$boleto_id_$ = $boleto_id_element$$149$$, this.dispatchEvent("gen_boleto")))
    }, this)
  }, this)
};
// Input 105
function $bitex$api$BitEx$$() {
  $goog$Disposable$$.call(this);
  this.$all_markets_$ = this.$currency_info_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$api$BitEx$$, $goog$events$EventTarget$$);
$bitex$api$BitEx$$.prototype.$ws_$ = $JSCompiler_alias_NULL$$;
$bitex$api$BitEx$$.prototype.$connected_$ = $JSCompiler_alias_FALSE$$;
$bitex$api$BitEx$$.prototype.$logged_$ = $JSCompiler_alias_FALSE$$;
var $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ = "withdraw_list_response", $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ = "order_list_response", $bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ = "customer_list", $bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ = "ob_clear", $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ = "ob_delete_orders_thru", $bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ = "ob_delete_order", $bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ = 
"ob_new_order", $bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ = "ob_update_order";
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$30$$) {
  "WebSocket" in window ? this.$ws_$ = new WebSocket($url$$30$$) : "MozWebSocket" in window ? this.$ws_$ = new MozWebSocket($url$$30$$) : $JSCompiler_alias_THROW$$("WebSockets are not available");
  this.$ws_$.onopen = $goog$bind$$(this.$onOpen_$, this);
  this.$ws_$.onclose = $goog$bind$$(this.$onClose_$, this);
  this.$ws_$.onmessage = $goog$bind$$(this.$onMessage_$, this);
  this.$ws_$.onerror = $goog$bind$$(this.$onError_$, this)
};
$JSCompiler_prototypeAlias$$.$isConnected$ = $JSCompiler_get$$("$connected_$");
$JSCompiler_prototypeAlias$$.$isLogged$ = $JSCompiler_get$$("$logged_$");
$JSCompiler_prototypeAlias$$.$formatCurrency$ = function $$JSCompiler_prototypeAlias$$$$formatCurrency$$($amount$$3$$, $currency_code$$) {
  if(this.$currency_info_$ == $JSCompiler_alias_NULL$$) {
    return $amount$$3$$
  }
  var $currency_def$$ = this.$currency_info_$[$currency_code$$];
  return(new $goog$i18n$NumberFormat$$($currency_def$$.$format$, $currency_def$$.code)).$format$($amount$$3$$)
};
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($msg$$21$$) {
  this.$currency_info_$ = {};
  this.$all_markets_$ = {};
  $goog$array$forEach$$($msg$$21$$.Currencies, function($currency$$) {
    this.$currency_info_$[$currency$$.Code] = {code:$currency$$.Code, $format$:$currency$$.FormatJS, description:$currency$$.Description, $sign$:$currency$$.Sign, $pip$:$currency$$.Pip, $is_crypto$:$currency$$.IsCrypto}
  }, this);
  var $symbols$$ = [];
  $goog$array$forEach$$($msg$$21$$.Instruments, function($instrument$$) {
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
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$90_msg$$22$$) {
  $e$$90_msg$$22$$ = JSON.parse($e$$90_msg$$22$$.data);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$90_msg$$22$$));
  switch($e$$90_msg$$22$$.MsgType) {
    case "ERROR":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", $e$$90_msg$$22$$));
      break;
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $e$$90_msg$$22$$));
      break;
    case "BF":
      1 == $e$$90_msg$$22$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $e$$90_msg$$22$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $e$$90_msg$$22$$)));
      break;
    case "y":
      this.$onSecurityList_$($e$$90_msg$$22$$);
      this.dispatchEvent(new $bitex$api$BitExEvent$$("security_list", $e$$90_msg$$22$$));
      break;
    case "U13":
      1 == $e$$90_msg$$22$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $e$$90_msg$$22$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $e$$90_msg$$22$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("generate_boleto_response", $e$$90_msg$$22$$));
      break;
    case "U7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response." + $e$$90_msg$$22$$.WithdrawReqID, $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response", $e$$90_msg$$22$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $e$$90_msg$$22$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$ + "." + $e$$90_msg$$22$$.OrdersReqID, $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, $e$$90_msg$$22$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $e$$90_msg$$22$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("boleto_options_response", $e$$90_msg$$22$$));
      break;
    case "U27":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + $e$$90_msg$$22$$.WithdrawListReqID, $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$, $e$$90_msg$$22$$));
      break;
    case "U29":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("broker_list", $e$$90_msg$$22$$));
      break;
    case "B3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$ + "." + $e$$90_msg$$22$$.CustomerListReqID, $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$CUSTOMER_LIST_RESPONSE$$, $e$$90_msg$$22$$));
      break;
    case "B5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_detail", $e$$90_msg$$22$$));
      break;
    case "W":
      if(1 != $e$$90_msg$$22$$.MarketDepth) {
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$));
        this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_CLEAR$$ + "." + $e$$90_msg$$22$$.MDReqID));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear"));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear." + $e$$90_msg$$22$$.MDReqID));
        for(var $x$$69$$ in $e$$90_msg$$22$$.MDFullGrp) {
          var $entry$$ = $e$$90_msg$$22$$.MDFullGrp[$x$$69$$];
          $entry$$.MDReqID = $e$$90_msg$$22$$.MDReqID;
          switch($entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              $entry$$.Symbol = $e$$90_msg$$22$$.Symbol;
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $e$$90_msg$$22$$.MDReqID, $entry$$));
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade." + $e$$90_msg$$22$$.MDReqID, $entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status." + $e$$90_msg$$22$$.MDReqID, $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh." + $e$$90_msg$$22$$.MDReqID, $e$$90_msg$$22$$));
      break;
    case "X":
      if("3" == $e$$90_msg$$22$$.MDBkTyp) {
        for($x$$69$$ in $e$$90_msg$$22$$.MDIncGrp) {
          switch($entry$$ = $e$$90_msg$$22$$.MDIncGrp[$x$$69$$], $entry$$.MDReqID = $e$$90_msg$$22$$.MDReqID, $entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              switch($entry$$.MDUpdateAction) {
                case "0":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$, $entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_NEW_ORDER$$ + "." + $e$$90_msg$$22$$.MDReqID, $entry$$));
                  break;
                case "1":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$, $entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_UPDATE_ORDER$$ + "." + $e$$90_msg$$22$$.MDReqID, $entry$$));
                  break;
                case "2":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$, $entry$$));
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDER$$ + "." + $e$$90_msg$$22$$.MDReqID, $entry$$));
                  break;
                case "3":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$, $entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$($bitex$api$BitEx$EventType$ORDER_BOOK_DELETE_ORDERS_THRU$$ + "." + $e$$90_msg$$22$$.MDReqID, $entry$$))
              }
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$));
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade." + $e$$90_msg$$22$$.MDReqID, $entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $entry$$)), this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status." + $e$$90_msg$$22$$.MDReqID, $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh." + $e$$90_msg$$22$$.MDReqID, $e$$90_msg$$22$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $e$$90_msg$$22$$));
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject." + $e$$90_msg$$22$$.MDReqID, $e$$90_msg$$22$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $e$$90_msg$$22$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$;
  this.$ws_$.close();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($msg$$23_username$$5$$, $password$$2$$, $opt_second_factor$$) {
  $msg$$23_username$$5$$ = {MsgType:"BE", UserReqID:"1", Username:$msg$$23_username$$5$$, Password:$password$$2$$, UserReqTyp:"1"};
  $opt_second_factor$$ != $JSCompiler_alias_NULL$$ && ($msg$$23_username$$5$$.SecondFactor = $opt_second_factor$$);
  this.$ws_$.send(JSON.stringify($msg$$23_username$$5$$))
};
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$15_msg$$24$$, $opt_secret$$, $opt_code$$, $opt_clientID$$) {
  $enable$$15_msg$$24$$ = {MsgType:"U16", Enable:$enable$$15_msg$$24$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_secret$$) && ($enable$$15_msg$$24$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_code$$) && ($enable$$15_msg$$24$$.Code = $opt_code$$);
  $opt_clientID$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$) && ($enable$$15_msg$$24$$.ClientID = $opt_clientID$$);
  this.$ws_$.send(JSON.stringify($enable$$15_msg$$24$$))
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U10", Email:$email$$1$$}))
};
$JSCompiler_prototypeAlias$$.$requestBalances$ = function $$JSCompiler_prototypeAlias$$$$requestBalances$$($opt_clientID$$1$$) {
  var $msg$$26$$ = {MsgType:"U2", BalanceReqID:parseInt(1E6 * Math.random(), 10)};
  $opt_clientID$$1$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$1$$) && ($msg$$26$$.ClientID = $opt_clientID$$1$$);
  this.$ws_$.send(JSON.stringify($msg$$26$$))
};
$JSCompiler_prototypeAlias$$.$requestWithdraw$ = function $$JSCompiler_prototypeAlias$$$$requestWithdraw$$($opt_request_id_reqId$$1$$, $amount$$4_msg$$27$$, $type$$102$$, $currency$$1$$, $data$$35$$) {
  $opt_request_id_reqId$$1$$ = $opt_request_id_reqId$$1$$ || parseInt(1E6 * Math.random(), 10);
  $amount$$4_msg$$27$$ = {MsgType:"U6", WithdrawReqID:$opt_request_id_reqId$$1$$, Currency:$currency$$1$$, Amount:parseInt(1E8 * $amount$$4_msg$$27$$, 10), Type:$type$$102$$};
  $goog$object$extend$$($amount$$4_msg$$27$$, $data$$35$$);
  this.$ws_$.send(JSON.stringify($amount$$4_msg$$27$$));
  return $opt_request_id_reqId$$1$$
};
$JSCompiler_prototypeAlias$$.$confirmWithdraw$ = function $$JSCompiler_prototypeAlias$$$$confirmWithdraw$$($confirmation_token$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U24", WithdrawReqID:parseInt(1E6 * Math.random(), 10), ConfirmationToken:$confirmation_token$$}))
};
$JSCompiler_prototypeAlias$$.$requestWithdrawList$ = function $$JSCompiler_prototypeAlias$$$$requestWithdrawList$$($opt_requestId_requestId$$, $msg$$29_opt_page$$, $opt_limit$$1$$, $opt_status$$, $opt_clientID$$2$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$29_opt_page$$ = {MsgType:"U26", WithdrawListReqID:$opt_requestId_requestId$$, Page:$msg$$29_opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["1", "2"]};
  $opt_clientID$$2$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$2$$) && ($msg$$29_opt_page$$.ClientID = $opt_clientID$$2$$);
  this.$ws_$.send(JSON.stringify($msg$$29_opt_page$$));
  return $opt_requestId_requestId$$
};
$JSCompiler_prototypeAlias$$.$requestBrokerList$ = function $$JSCompiler_prototypeAlias$$$$requestBrokerList$$($opt_requestId$$1_requestId$$1$$, $opt_country$$, $msg$$30_opt_page$$1$$, $opt_limit$$2$$, $opt_status$$1$$) {
  $opt_requestId$$1_requestId$$1$$ = $opt_requestId$$1_requestId$$1$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$30_opt_page$$1$$ = {MsgType:"U28", BrokerListReqID:$opt_requestId$$1_requestId$$1$$, Page:$msg$$30_opt_page$$1$$ || 0, PageSize:$opt_limit$$2$$ || 100, StatusList:$opt_status$$1$$ || ["1"]};
  $opt_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$30_opt_page$$1$$.Country = $opt_country$$);
  this.$ws_$.send(JSON.stringify($msg$$30_opt_page$$1$$));
  return $opt_requestId$$1_requestId$$1$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerList$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerList$$($opt_requestId$$2_requestId$$2$$, $opt_filter_country$$, $opt_filter_state$$, $opt_filter_username_or_email$$, $msg$$31_opt_page$$2$$, $opt_limit$$3$$, $opt_status$$2$$, $opt_sort_column$$, $opt_sort_direction$$) {
  $opt_requestId$$2_requestId$$2$$ = $opt_requestId$$2_requestId$$2$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$31_opt_page$$2$$ = {MsgType:"B2", CustomerListReqID:$opt_requestId$$2_requestId$$2$$, Page:$msg$$31_opt_page$$2$$ || 0, PageSize:$opt_limit$$3$$ || 100, StatusList:$opt_status$$2$$ || [0, 1]};
  $opt_filter_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_opt_page$$2$$.Country = $opt_filter_country$$);
  $opt_filter_state$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_opt_page$$2$$.State = $opt_filter_state$$);
  $opt_filter_username_or_email$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_opt_page$$2$$.ClientID = $opt_filter_username_or_email$$);
  $opt_sort_column$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_opt_page$$2$$.Sort = $opt_sort_column$$);
  $opt_sort_direction$$ != $JSCompiler_alias_NULL$$ && ($msg$$31_opt_page$$2$$.SortOrder = $opt_sort_direction$$);
  this.$ws_$.send(JSON.stringify($msg$$31_opt_page$$2$$));
  return $opt_requestId$$2_requestId$$2$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerDetails$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerDetails$$($clientId$$) {
  var $requestId$$3$$ = parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"B4", CustomerReqID:$requestId$$3$$, ClientID:$clientId$$}));
  return $requestId$$3$$
};
$JSCompiler_prototypeAlias$$.$resetPassword$ = function $$JSCompiler_prototypeAlias$$$$resetPassword$$($token$$5$$, $new_password$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U12", Token:$token$$5$$, NewPassword:$new_password$$}))
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$3$$, $new_password$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"BE", UserReqID:"3", Password:$password$$3$$, NewPassword:$new_password$$1$$}))
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$1$$, $entries$$, $opt_requestId$$3_requestId$$4$$) {
  $opt_requestId$$3_requestId$$4$$ = $opt_requestId$$3_requestId$$4$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$opt_requestId$$3_requestId$$4$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$1$$}));
  return $opt_requestId$$3_requestId$$4$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$market_data_id$$, MarketDepth:0, SubscriptionRequestType:"2"}))
};
$JSCompiler_prototypeAlias$$.$requestSecurityList$ = function $$JSCompiler_prototypeAlias$$$$requestSecurityList$$($opt_requestId$$4$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"x", SecurityReqID:$opt_requestId$$4$$ || parseInt(1E7 * Math.random(), 10), SecurityListRequestType:0, SecurityRequestResult:0}))
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$6$$, $password$$4$$, $email$$2$$, $state$$19$$, $country_code$$2$$, $broker$$3$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U0", Username:$username$$6$$, Password:$password$$4$$, Email:$email$$2$$, State:$state$$19$$, CountryCode:$country_code$$2$$, BrokerID:$broker$$3$$}))
};
$JSCompiler_prototypeAlias$$.$requestOrderList$ = function $$JSCompiler_prototypeAlias$$$$requestOrderList$$($opt_requestId$$5_requestId$$6$$, $opt_page$$3$$, $opt_limit$$4$$, $opt_status$$3$$) {
  $opt_requestId$$5_requestId$$6$$ = $opt_requestId$$5_requestId$$6$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"U4", OrdersReqID:$opt_requestId$$5_requestId$$6$$, Page:$opt_page$$3$$ || 0, PageSize:$opt_limit$$4$$ || 100, StatusList:$opt_status$$3$$ || ["0", "1"]}));
  return $opt_requestId$$5_requestId$$6$$
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $msg$$42_symbol$$5$$, $qty$$5$$, $price$$4$$, $side$$8$$, $opt_client_id$$, $clientOrderId$$1_opt_clientOrderId$$) {
  $clientOrderId$$1_opt_clientOrderId$$ = $clientOrderId$$1_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$4$$ = parseInt(1E8 * $price$$4$$, 10);
  $qty$$5$$ = parseInt(1E8 * $qty$$5$$, 10);
  $msg$$42_symbol$$5$$ = {MsgType:"D", ClOrdID:"" + $clientOrderId$$1_opt_clientOrderId$$, Symbol:$msg$$42_symbol$$5$$, Side:$side$$8$$, OrdType:"2", Price:$price$$4$$, OrderQty:$qty$$5$$};
  $opt_client_id$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_client_id$$) && ($msg$$42_symbol$$5$$.ClientID = $opt_client_id$$);
  $JSCompiler_StaticMethods_sendOrder_$self$$.$ws_$.send(JSON.stringify($msg$$42_symbol$$5$$));
  return $clientOrderId$$1_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$43$$ = {MsgType:"F"};
  $opt_OrderId$$ ? $msg$$43$$.OrderID = $opt_OrderId$$ : $opt_clientOrderId$$1$$ && ($msg$$43$$.OrigClOrdID = $opt_clientOrderId$$1$$);
  this.$ws_$.send(JSON.stringify($msg$$43$$))
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$44$$) {
  this.$ws_$.send(JSON.stringify($msg$$44$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$6$$, $qty$$6$$, $price$$5$$, $opt_client_id$$1$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$6$$, $qty$$6$$, $price$$5$$, "1", $opt_client_id$$1$$, $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$7$$, $qty$$7$$, $price$$6$$, $opt_client_id$$2$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$7$$, $qty$$7$$, $price$$6$$, "2", $opt_client_id$$2$$, $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.$ws_$.send(JSON.stringify({MsgType:"1", TestReqID:Math.random()}))
};
function $bitex$api$BitExEvent$$($type$$103$$, $opt_data$$13$$) {
  $goog$events$Event$$.call(this, $type$$103$$);
  this.data = $opt_data$$13$$
}
$goog$inherits$$($bitex$api$BitExEvent$$, $goog$events$Event$$);
$goog$exportPath_$$("BitEx", $bitex$api$BitEx$$);
$goog$exportProperty$$("open", $bitex$api$BitEx$$.prototype.open);
$goog$exportProperty$$("close", $bitex$api$BitEx$$.prototype.close);
$goog$exportProperty$$("login", $bitex$api$BitEx$$.prototype.login);
$goog$exportProperty$$("isLogged", $bitex$api$BitEx$$.prototype.$isLogged$);
$goog$exportProperty$$("isConnected", $bitex$api$BitEx$$.prototype.$isConnected$);
$goog$exportProperty$$("requestSecurityList", $bitex$api$BitEx$$.prototype.$requestSecurityList$);
$goog$exportProperty$$("changePassword", $bitex$api$BitEx$$.prototype.$changePassword$);
$goog$exportProperty$$("subscribeMarketData", $bitex$api$BitEx$$.prototype.$subscribeMarketData$);
$goog$exportProperty$$("unSubscribeMarketData", $bitex$api$BitEx$$.prototype.$unSubscribeMarketData$);
$goog$exportProperty$$("signUp", $bitex$api$BitEx$$.prototype.$signUp$);
$goog$exportProperty$$("forgotPassword", $bitex$api$BitEx$$.prototype.$forgotPassword$);
$goog$exportProperty$$("requestBalances", $bitex$api$BitEx$$.prototype.$requestBalances$);
$goog$exportProperty$$("requestWithdraw", $bitex$api$BitEx$$.prototype.$requestWithdraw$);
$goog$exportProperty$$("requestWithdrawList", $bitex$api$BitEx$$.prototype.$requestWithdrawList$);
$goog$exportProperty$$("requestCustomerList", $bitex$api$BitEx$$.prototype.$requestCustomerList$);
$goog$exportProperty$$("requestCustomerDetails", $bitex$api$BitEx$$.prototype.$requestCustomerDetails$);
$goog$exportProperty$$("requestBrokerList", $bitex$api$BitEx$$.prototype.$requestBrokerList$);
$goog$exportProperty$$("confirmWithdraw", $bitex$api$BitEx$$.prototype.$confirmWithdraw$);
$goog$exportProperty$$("enableTwoFactor", $bitex$api$BitEx$$.prototype.$enableTwoFactor$);
$goog$exportProperty$$("resetPassword", $bitex$api$BitEx$$.prototype.$resetPassword$);
$goog$exportProperty$$("requestOrderList", $bitex$api$BitEx$$.prototype.$requestOrderList$);
$goog$exportProperty$$("cancelOrder", $bitex$api$BitEx$$.prototype.$cancelOrder$);
$goog$exportProperty$$("sendRawMessage", $bitex$api$BitEx$$.prototype.$sendRawMessage$);
$goog$exportProperty$$("sendBuyLimitedOrder", $bitex$api$BitEx$$.prototype.$sendBuyLimitedOrder$);
$goog$exportProperty$$("sendSellLimitedOrder", $bitex$api$BitEx$$.prototype.$sendSellLimitedOrder$);
$goog$exportProperty$$("testRequest", $bitex$api$BitEx$$.prototype.$testRequest$);
$goog$exportProperty$$("addEventListener", $bitex$api$BitEx$$.prototype.addEventListener);
$goog$exportProperty$$("removeEventListener", $bitex$api$BitEx$$.prototype.removeEventListener);
// Input 106
function $bitex$view$TwoFactorView$$($app$$8$$, $opt_domHelper$$21$$) {
  $bitex$view$View$$.call(this, $app$$8$$, $opt_domHelper$$21$$)
}
$goog$inherits$$($bitex$view$TwoFactorView$$, $bitex$view$View$$);
$bitex$view$TwoFactorView$$.prototype.$enterDocument$ = function $$bitex$view$TwoFactorView$$$$$enterDocument$$() {
  $bitex$view$TwoFactorView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$64$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$64$$, this.$app_$.$model_$, "model_setTwoFactorSecret", function($e$$91_secret$$) {
    $e$$91_secret$$ = $e$$91_secret$$.data;
    $e$$91_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($e$$91_secret$$) && $goog$dom$getElement$$("id_secret_qr").setAttribute("src", "https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=" + $e$$91_secret$$)
  });
  $JSCompiler_StaticMethods_listen$$($handler$$64$$, this.$app_$.$model_$, "model_setTwoFactorEnabled", function($e$$92_enabled$$1$$) {
    $e$$92_enabled$$1$$ = $e$$92_enabled$$1$$.data;
    var $has_secret$$1_secret$$1$$ = this.$app_$.$model_$.get("TwoFactorSecret"), $has_secret$$1_secret$$1$$ = $has_secret$$1_secret$$1$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($has_secret$$1_secret$$1$$), $divEl$$ = $goog$dom$getElement$$("id_enable_two_factor_div"), $btnDisableEl$$ = $goog$dom$getElement$$("id_btn_disable_two_factor");
    $goog$style$showElement$$($goog$dom$getElement$$("id_btn_enable_two_factor"), !$e$$92_enabled$$1$$);
    $goog$style$showElement$$($btnDisableEl$$, $e$$92_enabled$$1$$);
    $goog$style$showElement$$($divEl$$, $has_secret$$1_secret$$1$$)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$64$$, $goog$dom$getElement$$("id_btn_enable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_enable")
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$64$$, $goog$dom$getElement$$("id_btn_disable_two_factor"), "click", function() {
    this.dispatchEvent("two_factor_disable")
  }, this)
};
// Input 107
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
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enabled$$2$$) {
  this.$enabled_$ = $enabled$$2$$
};
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
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$45_e$$95_element$$inline_519$$) {
  var $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ = "mousedown" == $JSCompiler_temp$$45_e$$95_element$$inline_519$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$45_e$$95_element$$inline_519$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$45_e$$95_element$$inline_519$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$45_e$$95_element$$inline_519$$.clientX, $JSCompiler_temp$$45_e$$95_element$$inline_519$$.clientY, $JSCompiler_temp$$45_e$$95_element$$inline_519$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$45_e$$95_element$$inline_519$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$45_e$$95_element$$inline_519$$.preventDefault()
    }
    var $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ = this.$document_$, $bestParent$$inline_521_docEl$$inline_516$$ = $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$.documentElement, $borderWidths$$inline_522_useCapture$$inline_517$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_522_useCapture$$inline_517$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_522_useCapture$$inline_517$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_521_docEl$$inline_516$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_521_docEl$$inline_516$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ ? $goog$dom$getWindow_$$($doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_522_useCapture$$inline_517$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.clientY;
    this.screenX = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.screenX;
    this.screenY = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$45_e$$95_element$$inline_519$$ = this.target, $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.offsetLeft, $bestParent$$inline_521_docEl$$inline_516$$ = $JSCompiler_temp$$45_e$$95_element$$inline_519$$.offsetParent, !$bestParent$$inline_521_docEl$$inline_516$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$45_e$$95_element$$inline_519$$, "position") && ($bestParent$$inline_521_docEl$$inline_516$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$45_e$$95_element$$inline_519$$).documentElement), $bestParent$$inline_521_docEl$$inline_516$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_522_useCapture$$inline_517$$ = $goog$style$getBorderBox$$($bestParent$$inline_521_docEl$$inline_516$$), $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ += $borderWidths$$inline_522_useCapture$$inline_517$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_522_useCapture$$inline_517$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_521_docEl$$inline_516$$), $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ -= $borderWidths$$inline_522_useCapture$$inline_517$$.left), $JSCompiler_temp$$45_e$$95_element$$inline_519$$ = $goog$style$isRightToLeft$$($bestParent$$inline_521_docEl$$inline_516$$) ? $bestParent$$inline_521_docEl$$inline_516$$.clientWidth - ($doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$ + $JSCompiler_temp$$45_e$$95_element$$inline_519$$.offsetWidth) : 
    $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$) : $JSCompiler_temp$$45_e$$95_element$$inline_519$$ = $doc$$inline_515_isMouseDown_offsetLeftForReal$$inline_520$$) : $JSCompiler_temp$$45_e$$95_element$$inline_519$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$45_e$$95_element$$inline_519$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$97$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$97$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$70$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$41$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$97$$.clientX, $e$$97$$.clientY, $e$$97$$, $x$$70$$, $y$$41$$, $opt_dragCanceled$$ || "touchcancel" == $e$$97$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$97$$.type || "touchcancel" == $e$$97$$.type) && $e$$97$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$99$$) {
  var $type$$104$$ = $e$$99$$.type;
  "touchstart" == $type$$104$$ || "touchmove" == $type$$104$$ ? $e$$99$$.init($e$$99$$.$event_$.targetTouches[0], $e$$99$$.currentTarget) : ("touchend" == $type$$104$$ || "touchcancel" == $type$$104$$) && $e$$99$$.init($e$$99$$.$event_$.changedTouches[0], $e$$99$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$100$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$100$$);
    var $dx$$7_x$$71$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$100$$.clientX - this.clientX), $dy$$7_pos$$11_y$$42$$ = $e$$100$$.clientY - this.clientY;
    this.clientX = $e$$100$$.clientX;
    this.clientY = $e$$100$$.clientY;
    this.screenX = $e$$100$$.screenX;
    this.screenY = $e$$100$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$100$$.clientX, $e$$100$$.clientY, $e$$100$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$100$$);
          return
        }
      }
    }
    $dy$$7_pos$$11_y$$42$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$71$$, $dy$$7_pos$$11_y$$42$$);
    $dx$$7_x$$71$$ = $dy$$7_pos$$11_y$$42$$.x;
    $dy$$7_pos$$11_y$$42$$ = $dy$$7_pos$$11_y$$42$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$100$$.clientX, $e$$100$$.clientY, $e$$100$$, $dx$$7_x$$71$$, $dy$$7_pos$$11_y$$42$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$100$$, $dx$$7_x$$71$$, $dy$$7_pos$$11_y$$42$$), $e$$100$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $dx$$8_x$$72$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$document_$));
  $dx$$8_x$$72$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaX$ += $dx$$8_x$$72$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$72$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$72$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$43$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$101$$) {
  var $pos$$12$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$101$$.clientX = this.clientX;
  $e$$101$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$101$$, $pos$$12$$.x, $pos$$12$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$102$$, $x$$73$$, $y$$44$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$73$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$73$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$44$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$102$$.clientX, $e$$102$$.clientY, $e$$102$$, $x$$73$$, $y$$44$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$74$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$74$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$45$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$45$$))
}
function $goog$fx$DragEvent$$($type$$105$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$1$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$105$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$1$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
// Input 108
// Input 109
function $goog$events$FocusHandler$$($element$$151_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$151_typeOut$$;
  $element$$151_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$151_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$108$$) {
  var $event$$4$$ = new $goog$events$BrowserEvent$$($e$$108$$.$event_$);
  $event$$4$$.type = "focusin" == $e$$108$$.type || "focus" == $e$$108$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$4$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
// Input 110
// Input 111
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$22$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$22$$);
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
  var $element$$152$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$152$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$152$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$152$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$31$$;
    $JSCompiler_inline_result$$31$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$31$$;
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$153$$) {
  return!!$element$$153$$ && "DIV" == $element$$153$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$154$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$154$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$ = this.$getElement$();
    $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode && $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$)
  }
  $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$ = this.$getElement$();
  $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode && $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$ = this.$getElement$();
  $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode && $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_537_refNode$$inline_757_refNode$$inline_760$$.nextSibling);
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
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$) {
  if($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_710_win$$inline_705$$ = (($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_716_popupSize$$inline_709$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_710_win$$inline_705$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_710_win$$inline_705$$ || window);
        $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = Math.max($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ + $viewSize$$inline_710_win$$inline_705$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_716_popupSize$$inline_709$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ + $viewSize$$inline_710_win$$inline_705$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_716_popupSize$$inline_709$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$, $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$, $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$);
        $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_716_popupSize$$inline_709$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$651_JSCompiler_temp_const$$654_doc$$inline_704_left$$inline_711_visible$$3_x$$inline_706$$($JSCompiler_StaticMethods_getWindow$self$$inline_714_JSCompiler_temp_const$$653_scroll$$inline_708_top$$inline_712_y$$inline_707$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_716_popupSize$$inline_709$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
    }
  }
};
function $JSCompiler_StaticMethods_showPopupElement_$$($JSCompiler_StaticMethods_showPopupElement_$self$$, $visible$$4$$) {
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$, $visible$$4$$);
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$, $visible$$4$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$getElement$(), $visible$$4$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$tabCatcherElement_$, $visible$$4$$)
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
  var $doc$$39_h$$12$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$(($doc$$39_h$$12$$ ? $goog$dom$getWindow_$$($doc$$39_h$$12$$) : window) || window || window), $w$$8$$ = Math.max($viewSize$$.width, Math.max($doc$$39_h$$12$$.body.scrollWidth, $doc$$39_h$$12$$.documentElement.scrollWidth)), $doc$$39_h$$12$$ = Math.max($viewSize$$.height, Math.max($doc$$39_h$$12$$.body.scrollHeight, $doc$$39_h$$12$$.documentElement.scrollHeight));
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$8$$, $doc$$39_h$$12$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$8$$, $doc$$39_h$$12$$))
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$110$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$110$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$111$$) {
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
// Input 112
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$23$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$23$$);
  this.$class_$ = $opt_class$$4$$ || "modal-dialog";
  this.$buttons_$ = $goog$ui$Dialog$ButtonSet$createOkCancel$$()
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
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($html$$2$$) {
  this.$content_$ = $html$$2$$;
  this.$contentEl_$ && (this.$contentEl_$.innerHTML = $html$$2$$)
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
function $JSCompiler_StaticMethods_setDraggingEnabled_$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$, $enabled$$3$$) {
  if($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$()) {
    var $element$$inline_547$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_548$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$3$$ ? $goog$dom$classes$add$$($element$$inline_547$$, $className$$inline_548$$) : $goog$dom$classes$remove$$($element$$inline_547$$, $className$$inline_548$$)
  }
  $enabled$$3$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$3$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$ = this.$getElement$(), $dom$$18$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$18$$.$createDom$("div", {className:this.$class_$ + "-title", id:this.$getId$()}, this.$titleTextEl_$ = $dom$$18$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$18$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$, this.$titleEl_$, this.$contentEl_$ = $dom$$18$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$18$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_721_element$$155$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = this.$getId$())) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:this.$getId$()}), $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_724_dialogElement_element$$156$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_553_element$$157$$ = this.$getElement$();
  $dom$$inline_553_element$$157$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_553_element$$157$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_553_element$$157$$ = this.$getDomHelper$(), $bg$$inline_554$$ = this.$getBackgroundElement$();
    $dom$$inline_553_element$$157$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_553_element$$157$$.removeNode($bg$$inline_554$$)
  }
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$visible_$ && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, $JSCompiler_alias_FALSE$$);
  $goog$ui$Dialog$$.$superClass_$.$exitDocument$.call(this)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$) {
  $visible$$5$$ != this.$visible_$ && (this.$inDocument_$ || this.render(), $goog$ui$Dialog$$.$superClass_$.$setVisible$.call(this, $visible$$5$$))
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
      for(var $doc$$41$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$136$$ = 0, $button$$10$$;$button$$10$$ = $buttons$$[$i$$136$$];$i$$136$$++) {
        if($button$$10$$.name == $defaultButton$$ && !$button$$10$$.disabled) {
          try {
            if($goog$userAgent$WEBKIT$$ || $goog$userAgent$OPERA$$) {
              var $temp$$1$$ = $doc$$41$$.createElement("input");
              $temp$$1$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.$getElement$().appendChild($temp$$1$$);
              $temp$$1$$.focus();
              this.$getElement$().removeChild($temp$$1$$)
            }
            $button$$10$$.focus()
          }catch($e$$112$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$42_h$$13$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_558_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$42_h$$13$$ ? $goog$dom$getWindow_$$($doc$$42_h$$13$$) : window) || window || window), $w$$9$$ = Math.max($doc$$42_h$$13$$.body.scrollWidth, $limits$$inline_558_viewSize$$2$$.width), $doc$$42_h$$13$$ = Math.max($doc$$42_h$$13$$.body.scrollHeight, $limits$$inline_558_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_558_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_558_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_558_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_558_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$9$$ - $dialogSize$$.width, $doc$$42_h$$13$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$2$$ = this.$buttons_$, $key$$80$$ = $bs_caption$$2$$ && $bs_caption$$2$$.$cancelButton_$;
    $key$$80$$ ? ($bs_caption$$2$$ = $bs_caption$$2$$.get($key$$80$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$80$$, $bs_caption$$2$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$buttonEl_$ = this.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Dialog$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$11_e$$115_el$$inline_565_key$$81$$) {
  a: {
    for($button$$11_e$$115_el$$inline_565_key$$81$$ = $button$$11_e$$115_el$$inline_565_key$$81$$.target;$button$$11_e$$115_el$$inline_565_key$$81$$ != $JSCompiler_alias_NULL$$ && $button$$11_e$$115_el$$inline_565_key$$81$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$11_e$$115_el$$inline_565_key$$81$$.tagName) {
        break a
      }
      $button$$11_e$$115_el$$inline_565_key$$81$$ = $button$$11_e$$115_el$$inline_565_key$$81$$.parentNode
    }
    $button$$11_e$$115_el$$inline_565_key$$81$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$11_e$$115_el$$inline_565_key$$81$$ && !$button$$11_e$$115_el$$inline_565_key$$81$$.disabled) {
    $button$$11_e$$115_el$$inline_565_key$$81$$ = $button$$11_e$$115_el$$inline_565_key$$81$$.name;
    var $caption$$3$$ = this.$buttons_$.get($button$$11_e$$115_el$$inline_565_key$$81$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$11_e$$115_el$$inline_565_key$$81$$, $caption$$3$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$116$$) {
  var $caption$$4_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$57$$ = $e$$116$$.target;
  if("keydown" == $e$$116$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$116$$.keyCode) {
      var $cancel_key$$82$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$57$$ = "SELECT" == $isSpecialFormElement_target$$57$$.tagName && !$isSpecialFormElement_target$$57$$.disabled;
      $cancel_key$$82$$ && !$isSpecialFormElement_target$$57$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = $buttonSet$$.get($cancel_key$$82$$), $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$82$$, $caption$$4_close$$))) : $isSpecialFormElement_target$$57$$ || ($caption$$4_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$116$$.keyCode && $e$$116$$.shiftKey && $isSpecialFormElement_target$$57$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_568$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$116$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$57$$.tagName) {
        $cancel_key$$82$$ = $isSpecialFormElement_target$$57$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$;
          if($JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_573$$ = 0, $nextButton$$inline_574$$;$nextButton$$inline_574$$ = $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$[$i$$inline_573$$];$i$$inline_573$$++) {
                if($nextButton$$inline_574$$.name == $defaultKey$$ || $nextButton$$inline_574$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$ = $nextButton$$inline_574$$;
                  break a
                }
              }
              $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$57$$ = ("TEXTAREA" == $isSpecialFormElement_target$$57$$.tagName || "SELECT" == $isSpecialFormElement_target$$57$$.tagName || "A" == $isSpecialFormElement_target$$57$$.tagName) && !$isSpecialFormElement_target$$57$$.disabled;
          $JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$ && (!$JSCompiler_temp$$27_buttons$$inline_572_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$57$$) && ($cancel_key$$82$$ = $defaultKey$$)
        }
      }
      $cancel_key$$82$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$82$$, String($buttonSet$$.get($cancel_key$$82$$)))))
    }
  }
  if($caption$$4_close$$ || $hasHandler$$) {
    $e$$116$$.stopPropagation(), $e$$116$$.preventDefault()
  }
  $caption$$4_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$83$$, $caption$$5$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$83$$;
  this.caption = $caption$$5$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$24$$) {
  this.$dom_$ = $opt_domHelper$$24$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$84$$, $caption$$6$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$84$$, $caption$$6$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$84$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$84$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$12$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$12$$.key, $button$$12$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$2$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$7$$, $key$$85$$) {
      var $button$$13$$ = $domHelper$$2$$.$createDom$("button", {name:$key$$85$$}, $caption$$7$$);
      $key$$85$$ == this.$defaultButton_$ && ($button$$13$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$13$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$159$$) {
  if($buttons$$2_element$$159$$ && 1 == $buttons$$2_element$$159$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$159$$;
    $buttons$$2_element$$159$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$137$$ = 0, $button$$14$$, $key$$86$$, $caption$$8$$;$button$$14$$ = $buttons$$2_element$$159$$[$i$$137$$];$i$$137$$++) {
      if($key$$86$$ = $button$$14$$.name || $button$$14$$.id, $caption$$8$$ = $goog$dom$getTextContent$$($button$$14$$) || $button$$14$$.value, $key$$86$$) {
        var $isDefault$$ = 0 == $i$$137$$;
        this.set($key$$86$$, $caption$$8$$, $isDefault$$, $button$$14$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$14$$, this.$class_$ + "-default")
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
var $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$ = "cancel", $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$ = {key:"ok", caption:"OK"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$ = {key:$goog$ui$Dialog$DefaultButtonKeys$CANCEL$$, caption:"Cancel"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$ = {key:"yes", caption:"Yes"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$ = {key:"no", caption:"No"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$ = {key:"save", caption:"Save"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$ = 
{key:"continue", caption:"Continue"};
function $goog$ui$Dialog$ButtonSet$createOkCancel$$() {
  return $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
"undefined" != typeof document && ($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$createOkCancel$$(), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_FALSE$$, 
$JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, 
$goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$));
// Input 113
function $bootstrap$Dialog$$() {
  $goog$ui$Dialog$$.call(this, "modal")
}
$goog$inherits$$($bootstrap$Dialog$$, $goog$ui$Dialog$$);
$bootstrap$Dialog$$.prototype.$createDom$ = function $$bootstrap$Dialog$$$$$createDom$$() {
  $goog$ui$ModalPopup$$.prototype.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$ = this.$getElement$(), $dom$$19_i$$140$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$19_i$$140$$.$createDom$("div", {className:"modal-header", id:this.$getId$()}, this.$titleCloseEl_$ = $dom$$19_i$$140$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$19_i$$140$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$, this.$titleEl_$, this.$contentEl_$ = $dom$$19_i$$140$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$19_i$$140$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$19_i$$140$$ = 0;$dom$$19_i$$140$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$.length;$dom$$19_i$$140$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_736_buttons$$4_element$$160$$[$dom$$19_i$$140$$], "btn")
    }
  }
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$bootstrap$Dialog$$.prototype.$setBackgroundElementOpacity$ = function $$bootstrap$Dialog$$$$$setBackgroundElementOpacity$$($bgEl$$1_opacity$$2$$) {
  this.$backgroundElementOpacity_$ = $bgEl$$1_opacity$$2$$;
  this.$getElement$() && ($bgEl$$1_opacity$$2$$ = this.$getBackgroundElement$(), $goog$dom$classes$add$$($bgEl$$1_opacity$$2$$, "modal-dialog-bg"), $bgEl$$1_opacity$$2$$ && $goog$style$setOpacity$$($bgEl$$1_opacity$$2$$, this.$backgroundElementOpacity_$))
};
// Input 114
function $bitex$view$SetNewPasswordView$$($app$$9$$, $opt_domHelper$$25$$) {
  $bitex$view$View$$.call(this, $app$$9$$, $opt_domHelper$$25$$)
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
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_set_new_password"), "click", function($e$$117$$) {
    $e$$117$$.stopPropagation();
    $e$$117$$.preventDefault();
    $goog$string$isEmpty$$(this.$getToken$()) ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Invalid confirmation code") : $goog$string$isEmpty$$(this.$getPassword$()) || 8 > this.$getPassword$().length ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Password must have at least 8 characters") : this.$getPassword$() !== $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password2")) ? $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Passwords does not match") : 
    this.dispatchEvent("set_new_pwd")
  }, this)
};
// Input 115
function $bitex$view$ForgotPasswordView$$($app$$10$$, $opt_domHelper$$26$$) {
  $bitex$view$View$$.call(this, $app$$10$$, $opt_domHelper$$26$$)
}
$goog$inherits$$($bitex$view$ForgotPasswordView$$, $bitex$view$View$$);
$bitex$view$ForgotPasswordView$$.prototype.$enterDocument$ = function $$bitex$view$ForgotPasswordView$$$$$enterDocument$$() {
  $bitex$view$ForgotPasswordView$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $goog$dom$getElement$$("id_btn_forgot_password"), "click", function($e$$118$$) {
    $e$$118$$.stopPropagation();
    $e$$118$$.preventDefault();
    $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email")).match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? this.dispatchEvent("recover_pwd") : ($goog$dom$getElement$$("id_forgot_password_email").focus(), $JSCompiler_StaticMethods_showDialog$$(this.$app_$, "Invalid email address"))
  }, this)
};
$bitex$view$ForgotPasswordView$$.prototype.$getEmail$ = function $$bitex$view$ForgotPasswordView$$$$$getEmail$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email"))
};
// Input 116
function $bitex$view$WithdrawView$$($app$$11$$, $opt_domHelper$$27$$) {
  $bitex$view$View$$.call(this, $app$$11$$, $opt_domHelper$$27$$);
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
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$161_withdraws_component$$) {
  this.$element_$ = $element$$161_withdraws_component$$;
  $element$$161_withdraws_component$$ = new $goog$ui$Component$$;
  $JSCompiler_StaticMethods_addChild$$(this, $element$$161_withdraws_component$$);
  $element$$161_withdraws_component$$.$decorate$($goog$dom$getElement$$("withdraw_accordion"))
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$WithdrawView$$.$superClass_$.$enterDocument$.call(this);
  var $model$$5$$ = this.$app_$.$model_$, $handler$$67$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, $model$$5$$, "model_setBroker", this.$onModelSetBroker_$);
  $JSCompiler_StaticMethods_listen$$($handler$$67$$, this.$app_$.$conn_$, "withdraw_response", this.$onBitexWithdrawResponse_$)
};
$JSCompiler_prototypeAlias$$.$onBitexWithdrawResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexWithdrawResponse_$$() {
  var $dlg_content_withdrawConfirmationDialog$$ = $bitex$templates$WithdrawConfirmationDialogContent$$(), $dlg_content_withdrawConfirmationDialog$$ = $JSCompiler_StaticMethods_showDialog$$(this.$app_$, $dlg_content_withdrawConfirmationDialog$$, "Confirm", $goog$ui$Dialog$ButtonSet$createOkCancel$$());
  $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg_content_withdrawConfirmationDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$120$$) {
    "ok" == $e$$120$$.key && (this.$confirmation_token_$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_withdraw_confirmation")), this.dispatchEvent("confirm_withdraw"))
  }, this)
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$69$$ = this.$getHandler$();
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$69$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$69$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$ORDER_LIST_RESPONSE$$, this.$onWithdrawListReponse_$), this.$withdraw_list_table_$.$dispose$());
  this.$request_id_$ = this.$withdraw_list_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$onModelSetBroker_$ = function $$JSCompiler_prototypeAlias$$$$onModelSetBroker_$$($broker$$4_e$$121$$) {
  $broker$$4_e$$121$$ = $broker$$4_e$$121$$.data;
  var $security_list$$ = this.$app_$.$model_$.get("SecurityList"), $broker_government_currencies_codes$$ = $broker$$4_e$$121$$.Currencies.split(","), $government_currencies$$ = [], $crypto_currencies$$ = [], $currency_balances_template_params$$ = [];
  $goog$array$forEach$$($security_list$$.Currencies, function($currency$$2$$) {
    $currency$$2$$.IsCrypto && ($crypto_currencies$$.push($currency$$2$$), $currency_balances_template_params$$.push({code:$currency$$2$$.Code, $code_lower$:$currency$$2$$.Code.toLowerCase()}));
    $goog$array$contains$$($broker_government_currencies_codes$$, $currency$$2$$.Code) && ($government_currencies$$.push($currency$$2$$), $currency_balances_template_params$$.push({code:$currency$$2$$.Code, $code_lower$:$currency$$2$$.Code.toLowerCase()}))
  }, this);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_user_balances_well"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_user_balances_well"), $bitex$templates$YourAccountBalances$$, {$currencies$:$currency_balances_template_params$$});
  var $withdraws_component$$1$$ = $JSCompiler_StaticMethods_getChildAt$$(this, 0);
  $withdraws_component$$1$$.$removeChildren$($JSCompiler_alias_TRUE$$);
  $goog$array$forEach$$($crypto_currencies$$, function($crypto_currency_withdraw_currency$$3$$) {
    $crypto_currency_withdraw_currency$$3$$ = new $bitex$ui$Withdraw$$({type:"CRY", $currency$:$crypto_currency_withdraw_currency$$3$$.Code, $parent_id$:"withdraw_accordion", $button_label$:"Withdraw", title:$crypto_currency_withdraw_currency$$3$$.Description + " withdrawal", description:"Fill up the form.", controls:[["Amount", "Amount", "eg. 0.44550000", $crypto_currency_withdraw_currency$$3$$.Sign], ["Wallet", "Wallet", "Your " + ($crypto_currency_withdraw_currency$$3$$.Description + " wallet here.")]]});
    $JSCompiler_StaticMethods_addChild$$($withdraws_component$$1$$, $crypto_currency_withdraw_currency$$3$$, $JSCompiler_alias_TRUE$$)
  }, this);
  $goog$array$forEach$$($government_currencies$$, function($currency$$4_government_currency_withdraw$$) {
    $currency$$4_government_currency_withdraw$$ = new $bitex$ui$Withdraw$$({$parent_id$:"withdraw_accordion", type:"BBT", $currency$:$currency$$4_government_currency_withdraw$$.Code, $button_label$:"Withdraw", title:$currency$$4_government_currency_withdraw$$.Description + " withdrawal", description:"Fill up the form.", controls:[["Amount", "Amount", "eg. 2300.00", $currency$$4_government_currency_withdraw$$.Sign], ["BankNumber", "Bank number", "eg. 2331"], ["BankName", "Bank name", "eg. Bank of America"], 
    ["AccountBranch", "Account Branch", "eg. 88888"], ["AccountName", "Account name", "eg. John Doe"], ["AccountNumber", "Account number", "eg. 88888"], ["CPFCNPJ", "ID", "eg. A34455"]]});
    $JSCompiler_StaticMethods_addChild$$($withdraws_component$$1$$, $currency$$4_government_currency_withdraw$$, $JSCompiler_alias_TRUE$$)
  }, this);
  console.log($goog$debug$deepExpose$$($government_currencies$$))
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$() {
  var $handler$$70$$ = this.$getHandler$();
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  var $el$$55$$ = $goog$dom$getElement$$("id_withdraw_list_table");
  this.$withdraw_list_table_$ = new $bitex$ui$WithdrawList$$;
  $JSCompiler_StaticMethods_listen$$($handler$$70$$, this.$withdraw_list_table_$, "request_data", this.$onWithdrawListTableRequestData_$);
  $JSCompiler_StaticMethods_listen$$($handler$$70$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$);
  this.$withdraw_list_table_$.$decorate$($el$$55$$);
  $JSCompiler_StaticMethods_setColumnFormatter$$(this.$withdraw_list_table_$, "Amount", this.$priceFormatter_$, this)
};
$JSCompiler_prototypeAlias$$.$priceFormatter_$ = function $$JSCompiler_prototypeAlias$$$$priceFormatter_$$($value$$143$$, $rowSet$$2$$) {
  return this.$app_$.$formatCurrency$($value$$143$$ / 1E8, $rowSet$$2$$.Currency)
};
$JSCompiler_prototypeAlias$$.$onWithdrawListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListTableRequestData_$$($e$$122$$) {
  this.$app_$.$conn_$.$requestWithdrawList$(this.$request_id_$, $e$$122$$.options.Page, $e$$122$$.options.Limit, ["1", "2"])
};
$JSCompiler_prototypeAlias$$.$onWithdrawListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onWithdrawListReponse_$$($e$$123_msg$$46$$) {
  this.$withdraw_list_table_$ != $JSCompiler_alias_NULL$$ && ($e$$123_msg$$46$$ = $e$$123_msg$$46$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$withdraw_list_table_$, $e$$123_msg$$46$$.WithdrawListGrp, $e$$123_msg$$46$$.Columns))
};
// Input 117
// Input 118
function $goog$history$Event$$($token$$6$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$6$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 119
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
    var $loc$$ = this.$window_$.location.href, $index$$77$$ = $loc$$.indexOf("#");
    return 0 > $index$$77$$ ? "" : $loc$$.substring($index$$77$$ + 1)
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
// Input 120
function $bitex$app$UrlRouter$$($app$$12$$, $baseUrl$$, $defaultView$$) {
  this.$urls_$ = [];
  this.$app_$ = $app$$12$$;
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
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_585$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
};
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$125_view_name$$3$$) {
  $e$$125_view_name$$3$$.$isNavigation$ && ($e$$125_view_name$$3$$ = $e$$125_view_name$$3$$.$token$, this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $e$$125_view_name$$3$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $e$$125_view_name$$3$$))
};
function $bitex$app$UrlRouterEvent$$($type$$107$$, $view_id$$2$$, $view_args$$1$$, $view_url$$2$$) {
  $goog$events$Event$$.call(this, $type$$107$$);
  this.$view_id$ = $view_id$$2$$;
  this.$view_args$ = $view_args$$1$$;
  this.$view_url$ = $view_url$$2$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 121
function $bitex$view$VerificationView$$($app$$13$$, $opt_domHelper$$28$$) {
  $bitex$view$View$$.call(this, $app$$13$$, $opt_domHelper$$28$$);
  this.$loaded_jot_form_$ = $JSCompiler_alias_FALSE$$
}
$goog$inherits$$($bitex$view$VerificationView$$, $bitex$view$View$$);
$bitex$view$VerificationView$$.prototype.$enterView$ = function $$bitex$view$VerificationView$$$$$enterView$$() {
  if(!this.$loaded_jot_form_$) {
    var $form_src_model$$7$$ = this.$app_$.$model_$, $broker$$5_verificationIFrameForm$$ = $form_src_model$$7$$.get("Broker");
    $broker$$5_verificationIFrameForm$$ != $JSCompiler_alias_NULL$$ && ($form_src_model$$7$$ = $goog$string$subs$$($broker$$5_verificationIFrameForm$$.VerificationForm, $form_src_model$$7$$.get("UserID"), $form_src_model$$7$$.get("Username"), $form_src_model$$7$$.get("Email")), $broker$$5_verificationIFrameForm$$ = $goog$dom$getElement$$("JotFormIFrame"), $broker$$5_verificationIFrameForm$$.src !== $form_src_model$$7$$ && ($broker$$5_verificationIFrameForm$$.src = $form_src_model$$7$$, this.$loaded_jot_form_$ = 
    $JSCompiler_alias_TRUE$$))
  }
};
$bitex$view$VerificationView$$.prototype.$enterDocument$ = function $$bitex$view$VerificationView$$$$$enterDocument$$() {
  $bitex$view$VerificationView$$.$superClass_$.$enterDocument$.call(this)
};
// Input 122
function $bitex$view$SideBarView$$($app$$14$$, $opt_domHelper$$29$$) {
  $bitex$view$View$$.call(this, $app$$14$$, $opt_domHelper$$29$$)
}
$goog$inherits$$($bitex$view$SideBarView$$, $bitex$view$View$$);
$bitex$view$SideBarView$$.prototype.$enterDocument$ = function $$bitex$view$SideBarView$$$$$enterDocument$$() {
  $bitex$view$SideBarView$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$71$$ = this.$getHandler$(), $model$$8$$ = this.$app_$.$model_$;
  $JSCompiler_StaticMethods_listen$$($handler$$71$$, $model$$8$$, "model_setSecurityList", function() {
    var $msg$$47$$ = $model$$8$$.get("SecurityList");
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_instrument_1"));
    $goog$array$forEach$$($msg$$47$$.Instruments, function($el$$56_instrument$$1$$) {
      $el$$56_instrument$$1$$ = $goog$dom$createDom$$("option", {value:$el$$56_instrument$$1$$.Symbol}, $el$$56_instrument$$1$$.Description);
      $goog$dom$getElement$$("id_instrument_1").appendChild($el$$56_instrument$$1$$)
    }, this)
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$71$$, $model$$8$$, "model_setAllowedMarkets", function() {
    var $allowed_markets_allowed_markets_array$$ = $model$$8$$.get("AllowedMarkets"), $allowed_markets_allowed_markets_array$$ = $goog$object$getKeys$$($allowed_markets_allowed_markets_array$$);
    0 < $allowed_markets_allowed_markets_array$$.length && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_instrument_1"), $allowed_markets_allowed_markets_array$$[0]), this.dispatchEvent("changed_market"))
  }, this);
  $JSCompiler_StaticMethods_listen$$($handler$$71$$, $goog$dom$getElement$$("id_instrument_1"), "change", function() {
    this.dispatchEvent("changed_market")
  }, this)
};
$bitex$view$SideBarView$$.prototype.$getSymbol$ = function $$bitex$view$SideBarView$$$$$getSymbol$$() {
  return $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_instrument_1"))
};
// Input 123
// Input 124
// Input 125
function $bootstrap$Alert$$($opt_type$$11$$, $opt_content$$, $opt_close$$, $opt_domHelper$$30$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$30$$);
  this.$type_$ = $opt_type$$11$$;
  this.$content_$ = $opt_content$$;
  this.$has_close_$ = $JSCompiler_alias_TRUE$$;
  $opt_close$$ != $JSCompiler_alias_NULL$$ && $opt_close$$ === $JSCompiler_alias_FALSE$$ && (this.$has_close_$ = $JSCompiler_alias_FALSE$$)
}
$goog$inherits$$($bootstrap$Alert$$, $goog$ui$Component$$);
$bootstrap$Alert$$.prototype.$getCssClass$ = $JSCompiler_returnArg$$("alert");
$bootstrap$Alert$$.prototype.$createDom$ = function $$bootstrap$Alert$$$$$createDom$$() {
  var $dom$$20_element$$162$$ = this.$getDomHelper$();
  return this.$element_$ = $dom$$20_element$$162$$ = this.$has_close_$ ? $dom$$20_element$$162$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], $dom$$20_element$$162$$.$createDom$("button", ["close", "pull-right"], "\u00d7"), this.$content_$) : $dom$$20_element$$162$$.$createDom$("div", [this.$getCssClass$(), this.$getCssClass$() + "-" + this.$type_$], this.$content_$)
};
$bootstrap$Alert$$.prototype.$enterDocument$ = function $$bootstrap$Alert$$$$$enterDocument$$() {
  $bootstrap$Alert$$.$superClass_$.$enterDocument$.call(this);
  var $closeBtn_dom$$21$$ = this.$getDomHelper$(), $handler$$72$$ = this.$getHandler$(), $closeBtn_dom$$21$$ = $closeBtn_dom$$21$$.$getElementByClass$("close", this.$getElement$());
  $closeBtn_dom$$21$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_listenOnce$$($handler$$72$$, $closeBtn_dom$$21$$, "click", function() {
    this.$dispose$()
  })
};
// Input 126
function $bitex$view$AccountOverview$$($app$$15$$, $opt_domHelper$$31$$) {
  $bitex$view$View$$.call(this, $app$$15$$, $opt_domHelper$$31$$);
  this.$confirmation_token_$ = this.$request_id_$ = $JSCompiler_alias_NULL$$
}
$goog$inherits$$($bitex$view$AccountOverview$$, $bitex$view$View$$);
$JSCompiler_prototypeAlias$$ = $bitex$view$AccountOverview$$.prototype;
$JSCompiler_prototypeAlias$$.$enterView$ = function $$JSCompiler_prototypeAlias$$$$enterView$$($username$$7$$) {
  console.log("AccountOverview:" + $username$$7$$);
  var $selectedCustomer$$ = this.$app_$.$model_$.get("SelectedCustomer");
  $selectedCustomer$$ != $JSCompiler_alias_NULL$$ && $selectedCustomer$$.Username == $username$$7$$ && this.$recreateComponents_$($selectedCustomer$$)
};
$JSCompiler_prototypeAlias$$.$exitView$ = function $$JSCompiler_prototypeAlias$$$$exitView$$() {
  this.$destroyComponents_$()
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$163$$) {
  this.$element_$ = $element$$163$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$view$AccountOverview$$.$superClass_$.$enterDocument$.call(this);
  this.$getHandler$()
};
$JSCompiler_prototypeAlias$$.$destroyComponents_$ = function $$JSCompiler_prototypeAlias$$$$destroyComponents_$$() {
  var $handler$$74$$ = this.$getHandler$();
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_unlisten$$($handler$$74$$, this.$customers_table_$, "request_data", this.$onWithdrawListTableRequestData_$), $JSCompiler_StaticMethods_unlisten$$($handler$$74$$, this.$app_$.$conn_$, $bitex$api$BitEx$EventType$WITHDRAW_LIST_RESPONSE$$ + "." + this.$request_id_$, this.$onWithdrawListReponse_$), this.$customers_table_$.$dispose$());
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_header_id"));
  this.$request_id_$ = this.$customers_table_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$recreateComponents_$ = function $$JSCompiler_prototypeAlias$$$$recreateComponents_$$($customer$$) {
  this.$getHandler$();
  this.$destroyComponents_$();
  this.$request_id_$ = parseInt(1E7 * Math.random(), 10);
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_header_id"), $bitex$templates$AccountOverviewHeader$$, {$msg_customer_detail$:$customer$$})
};
$JSCompiler_prototypeAlias$$.$onCustomerListTableRequestData_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListTableRequestData_$$($e$$130$$) {
  this.$app_$.$conn_$.$requestCustomerList$(this.$request_id_$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $e$$130$$.options.Filter, $e$$130$$.options.Page, $e$$130$$.options.Limit, [0, 1])
};
$JSCompiler_prototypeAlias$$.$onCustomerListReponse_$ = function $$JSCompiler_prototypeAlias$$$$onCustomerListReponse_$$($e$$131_msg$$48$$) {
  this.$customers_table_$ != $JSCompiler_alias_NULL$$ && ($e$$131_msg$$48$$ = $e$$131_msg$$48$$.data, $JSCompiler_StaticMethods_setResultSet$$(this.$customers_table_$, $e$$131_msg$$48$$.CustomerListGrp, $e$$131_msg$$48$$.Columns))
};
// Input 127
function $bitex$app$SatoshiSquare$$() {
  $goog$Disposable$$.call(this);
  this.$dialog_$ = $JSCompiler_alias_NULL$$;
  this.$router_$ = new $bitex$app$UrlRouter$$(this, "", "start");
  this.$model_$ = new $bitex$model$Model$$(document.body);
  this.$conn_$ = new $bitex$api$BitEx$$;
  this.$views_$ = new $goog$ui$Component$$;
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
$JSCompiler_prototypeAlias$$.$setView$ = function $$JSCompiler_prototypeAlias$$$$setView$$($view_id$$3$$) {
  this.$router_$.$setView$($view_id$$3$$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataSubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataSubscribe_$$($e$$133$$) {
  console.log("onUserMarketDataSubscribe: " + $e$$133$$.target.$market_data_subscription_id_$ + "," + [$e$$133$$.target.$market_data_subscription_symbol_$]);
  this.$conn_$.$subscribeMarketData$(0, [$e$$133$$.target.$market_data_subscription_symbol_$], ["0", "1"], $e$$133$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserMarketDataUnsubscribe_$ = function $$JSCompiler_prototypeAlias$$$$onUserMarketDataUnsubscribe_$$($e$$134$$) {
  console.log("onUserMarketDataUnsubscribe " + $e$$134$$.target.$market_data_subscription_id_$ + "," + [$e$$134$$.target.$market_data_subscription_symbol_$]);
  this.$conn_$.$unSubscribeMarketData$($e$$134$$.target.$market_data_subscription_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserChangeMarket_$ = function $$JSCompiler_prototypeAlias$$$$onUserChangeMarket_$$($e$$135_symbol$$11$$) {
  $e$$135_symbol$$11$$ = $e$$135_symbol$$11$$.target.$getSymbol$();
  this.$model_$.set("SelectedSymbol", {$symbol$:$e$$135_symbol$$11$$, $qty_currency$:this.$currency_info_$[$e$$135_symbol$$11$$.substr(0, 3)], $price_currency$:this.$currency_info_$[$e$$135_symbol$$11$$.substr(3)]})
};
$JSCompiler_prototypeAlias$$.$onBitexBoletoOptionsResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexBoletoOptionsResponse_$$($boleto_options_group_elements_e$$136$$) {
  var $msg$$49$$ = $boleto_options_group_elements_e$$136$$.data, $boleto_options$$1$$ = [];
  $boleto_options_group_elements_e$$136$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
  $goog$array$forEach$$($boleto_options_group_elements_e$$136$$, function($boleto_options_group_element$$) {
    $goog$dom$removeChildren$$($boleto_options_group_element$$);
    $goog$array$forEach$$($msg$$49$$.BoletoOptionGrp, function($boleto_option$$1$$) {
      $boleto_options$$1$$.push({id:$boleto_option$$1$$.BoletoId, description:$boleto_option$$1$$.Description})
    })
  });
  this.$model_$.set("BoletoOptions", $boleto_options$$1$$)
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedOk_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedOk_$$() {
  $JSCompiler_StaticMethods_showDialog$$(this, "Password Changed", "Success");
  this.$router_$.$setView$("signin")
};
$JSCompiler_prototypeAlias$$.$onBitexPasswordChangedError_$ = function $$JSCompiler_prototypeAlias$$$$onBitexPasswordChangedError_$$() {
  $JSCompiler_StaticMethods_showDialog$$(this, "There was an error changing the password", "Error")
};
$JSCompiler_prototypeAlias$$.$onBitexGenerateBoletoResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexGenerateBoletoResponse_$$($JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$) {
  $JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$ = $JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$.data.BoletoId;
  $JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$ = "" + ('<a  target="_blank" href="/print_boleto?boleto_id=' + $soy$$0$0escapeHtml$$($JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$) + '" class="btn btn-primary">Print</a> or <a href="/print_boleto?download=1&boleto_id=' + $soy$$0$0escapeHtml$$($JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$) + '">Download</a>');
  $JSCompiler_StaticMethods_showDialog$$(this, $JSCompiler_object_inline_boleto_id_650_e$$139_output$$inline_605$$, "Boleto")
};
$JSCompiler_prototypeAlias$$.$onBitexExecutionReport_$ = function $$JSCompiler_prototypeAlias$$$$onBitexExecutionReport_$$($e$$140_msg$$51$$) {
  $e$$140_msg$$51$$ = $e$$140_msg$$51$$.data;
  var $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$ = "Order " + ($e$$140_msg$$51$$.OrderID + " ");
  switch($e$$140_msg$$51$$.ExecType) {
    case "1":
      $JSCompiler_StaticMethods_showNotification$$(this, $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "partially filled");
      break;
    case "2":
      $.sticky("Order " + $e$$140_msg$$51$$.OrderID + " filled");
      $JSCompiler_StaticMethods_showNotification$$(this, $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "filled");
      break;
    case "4":
      $JSCompiler_StaticMethods_showNotification$$(this, $MSG_ORDER_EXECUTION_TITLE_NOTIFICATION$$, "cancelled")
  }
};
$JSCompiler_prototypeAlias$$.$onBitexTwoFactorSecretResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexTwoFactorSecretResponse_$$($e$$141_msg$$52$$) {
  $e$$141_msg$$52$$ = $e$$141_msg$$52$$.data;
  this.$model_$.set("TwoFactorSecret", $e$$141_msg$$52$$.TwoFactorSecret);
  this.$model_$.set("TwoFactorEnabled", $e$$141_msg$$52$$.TwoFactorEnabled)
};
$JSCompiler_prototypeAlias$$.$onBitexBalanceResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBitexBalanceResponse_$$($e$$142_msg$$53$$) {
  $e$$142_msg$$53$$ = $e$$142_msg$$53$$.data;
  delete $e$$142_msg$$53$$.MsgType;
  delete $e$$142_msg$$53$$.BalanceReqID;
  $goog$object$forEach$$($e$$142_msg$$53$$, function($balances$$) {
    $goog$object$forEach$$($balances$$, function($balance$$, $currency$$5$$) {
      $balance$$ /= 1E8;
      var $balance_key$$ = "balance_" + $currency$$5$$.toLowerCase();
      this.$model_$.set($balance_key$$, $balance$$);
      this.$model_$.set("formatted_" + $balance_key$$, this.$formatCurrency$($balance$$, $currency$$5$$))
    }, this)
  }, this)
};
$JSCompiler_prototypeAlias$$.$onUserWithdrawRequest_$ = function $$JSCompiler_prototypeAlias$$$$onUserWithdrawRequest_$$($data$$36_e$$143$$) {
  $data$$36_e$$143$$ = $data$$36_e$$143$$.target.$model_$.data;
  var $reqId$$3$$ = parseInt(1E6 * Math.random(), 10), $amount$$5$$ = $goog$string$toNumber$$($data$$36_e$$143$$.Amount), $type$$108$$ = $data$$36_e$$143$$.Type, $currency$$6$$ = $data$$36_e$$143$$.Currency;
  delete $data$$36_e$$143$$.Amount;
  delete $data$$36_e$$143$$.Type;
  delete $data$$36_e$$143$$.Currency;
  this.$conn_$.$requestWithdraw$($reqId$$3$$, $amount$$5$$, $type$$108$$, $currency$$6$$, $data$$36_e$$143$$)
};
$JSCompiler_prototypeAlias$$.$onUserConfirmWithdraw_$ = function $$JSCompiler_prototypeAlias$$$$onUserConfirmWithdraw_$$($e$$144$$) {
  this.$conn_$.$confirmWithdraw$($e$$144$$.target.$confirmation_token_$)
};
$JSCompiler_prototypeAlias$$.$onUserOrderEntry_$ = function $$JSCompiler_prototypeAlias$$$$onUserOrderEntry_$$($e$$145_opt_client_id$$inline_612$$) {
  var $symbol$$inline_608$$ = $e$$145_opt_client_id$$inline_612$$.target.$getSymbol$(), $qty$$inline_609$$ = $e$$145_opt_client_id$$inline_612$$.target.$getAmount$(), $price$$inline_610$$ = $JSCompiler_StaticMethods_getPrice$$($e$$145_opt_client_id$$inline_612$$.target), $side$$inline_611$$ = $goog$dom$forms$getValue$$($e$$145_opt_client_id$$inline_612$$.target.$sideEl_$);
  $e$$145_opt_client_id$$inline_612$$ = $goog$dom$forms$getValue$$($e$$145_opt_client_id$$inline_612$$.target.$clientIdEl_$);
  $JSCompiler_StaticMethods_sendOrder_$$(this.$conn_$, $symbol$$inline_608$$, $qty$$inline_609$$, $price$$inline_610$$, $side$$inline_611$$, $e$$145_opt_client_id$$inline_612$$, $JSCompiler_alias_VOID$$)
};
$JSCompiler_prototypeAlias$$.$onUserCancelOrder_$ = function $$JSCompiler_prototypeAlias$$$$onUserCancelOrder_$$($e$$146$$) {
  console.log("cancelling order ...");
  this.$conn_$.$cancelOrder$($e$$146$$.target.$client_order_id_$, $e$$146$$.target.$order_id_$)
};
$JSCompiler_prototypeAlias$$.$onUserGenerateBoleto_$ = function $$JSCompiler_prototypeAlias$$$$onUserGenerateBoleto_$$($e$$147$$) {
  var $value$$inline_617$$ = $e$$147$$.target.$getAmount$();
  this.$conn_$.$ws_$.send(JSON.stringify({MsgType:"U18", BoletoId:$e$$147$$.target.$boleto_id_$, Value:$value$$inline_617$$}))
};
$JSCompiler_prototypeAlias$$.$onUserForgotPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserForgotPassword_$$($e$$148$$) {
  this.$conn_$.$forgotPassword$($e$$148$$.target.$getEmail$());
  this.$router_$.$setView$("set_new_password")
};
$JSCompiler_prototypeAlias$$.$onUserSetNewPassword_$ = function $$JSCompiler_prototypeAlias$$$$onUserSetNewPassword_$$($e$$149$$) {
  this.$conn_$.$resetPassword$($e$$149$$.target.$getToken$(), $e$$149$$.target.$getPassword$())
};
$JSCompiler_prototypeAlias$$.$onUserEnableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserEnableTwoFactor_$$() {
  var $code$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_step_verification")), $secret$$2$$ = "";
  $goog$string$isEmpty$$($code$$5$$) || ($secret$$2$$ = this.$model_$.get("TwoFactorSecret"));
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_TRUE$$, $secret$$2$$, $code$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserDisableTwoFactor_$ = function $$JSCompiler_prototypeAlias$$$$onUserDisableTwoFactor_$$() {
  this.$conn_$.$enableTwoFactor$($JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$onBodyClick_$ = function $$JSCompiler_prototypeAlias$$$$onBodyClick_$$($e$$152$$) {
  var $view_name$$4$$ = $e$$152$$.target.getAttribute("data-switch-view");
  $view_name$$4$$ != $JSCompiler_alias_NULL$$ && ($e$$152$$.preventDefault(), $e$$152$$.stopPropagation(), this.$router_$.$setView$($view_name$$4$$))
};
$JSCompiler_prototypeAlias$$.$onUserLoginButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginButtonClick_$$($e$$153_password$$5$$) {
  var $username$$8$$ = $e$$153_password$$5$$.target.$getUsername$();
  $e$$153_password$$5$$ = $e$$153_password$$5$$.target.$getPassword$();
  this.$conn_$.login($username$$8$$, $e$$153_password$$5$$)
};
$JSCompiler_prototypeAlias$$.$onUserLoginOk_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginOk_$$($e$$154_msg$$54$$) {
  $e$$154_msg$$54$$ = $e$$154_msg$$54$$.data;
  $goog$dom$classes$add$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
  this.$model_$.set("UserID", $e$$154_msg$$54$$.UserID);
  this.$model_$.set("Username", $e$$154_msg$$54$$.Username);
  this.$model_$.set("TwoFactorEnabled", $e$$154_msg$$54$$.TwoFactorEnabled);
  this.$model_$.set("IsBroker", $e$$154_msg$$54$$.IsBroker);
  this.$model_$.set("Broker", $e$$154_msg$$54$$.Broker);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_account_summary_content"));
  if($e$$154_msg$$54$$.IsBroker) {
    $goog$dom$classes$add$$(document.body, "bitex-broker")
  }else {
    $goog$dom$classes$add$$(document.body, "bitex-non-broker");
    var $balance_currencies$$ = $e$$154_msg$$54$$.Broker.Currencies.toLocaleLowerCase().split(",");
    $goog$object$forEach$$(this.$currency_info_$, function($currency_obj$$, $currency_code$$1$$) {
      $currency_obj$$.$is_crypto$ && $balance_currencies$$.push($currency_code$$1$$.toLocaleLowerCase())
    });
    $goog$soy$renderElement$$($goog$dom$getElement$$("id_account_summary_content"), $bitex$templates$YourAccountSummary$$, {$currencies$:$balance_currencies$$})
  }
  this.$conn_$.$requestBalances$();
  this.$conn_$.$ws_$.send(JSON.stringify({MsgType:"U20", BoletoOptionReqId:parseInt(1E7 * Math.random(), 10)}));
  this.$router_$.$setView$("offerbook")
};
$JSCompiler_prototypeAlias$$.$onUserLoginError_$ = function $$JSCompiler_prototypeAlias$$$$onUserLoginError_$$($dlg__e$$155_msg$$55$$) {
  $goog$dom$classes$add$$(document.body, "bitex-not-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-logged");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  $dlg__e$$155_msg$$55$$ = $dlg__e$$155_msg$$55$$.data;
  this.$model_$.set("UserID", "");
  this.$model_$.set("Username", "");
  $dlg__e$$155_msg$$55$$.NeedSecondFactor ? ($dlg__e$$155_msg$$55$$ = $JSCompiler_StaticMethods_showDialog$$(this, "2 steps authentication", $bitex$templates$GoogleAuthenticationCodeDialogContent$$(), $goog$ui$Dialog$ButtonSet$createOkCancel$$()), $JSCompiler_StaticMethods_listenOnce$$(this.$getHandler$(), $dlg__e$$155_msg$$55$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$156_second_factor$$) {
    "ok" == $e$$156_second_factor$$.key && ($e$$156_second_factor$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_factor")), this.$conn_$.login(this.$loginView_$.$getUsername$(), this.$loginView_$.$getPassword$(), $e$$156_second_factor$$))
  })) : $JSCompiler_StaticMethods_showDialog$$(this, $dlg__e$$155_msg$$55$$.UserStatusText)
};
$JSCompiler_prototypeAlias$$.$onUserSignupButton_$ = function $$JSCompiler_prototypeAlias$$$$onUserSignupButton_$$($e$$157$$) {
  this.$conn_$.$signUp$($e$$157$$.target.$getUsername$(), $e$$157$$.target.$getPassword$(), $e$$157$$.target.$getEmail$(), $e$$157$$.target.$getState$(), $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker")))
};
$JSCompiler_prototypeAlias$$.$onBeforeSetView_$ = function $$JSCompiler_prototypeAlias$$$$onBeforeSetView_$$($e$$158_view_id$$4$$) {
  $e$$158_view_id$$4$$ = $e$$158_view_id$$4$$.$view_id$;
  if(!this.$conn_$.$logged_$) {
    switch($e$$158_view_id$$4$$) {
      case "start":
      ;
      case "signin":
      ;
      case "signup":
      ;
      case "forgot_password":
      ;
      case "set_new_password":
        break;
      default:
        return this.$router_$.$setView$("start"), $JSCompiler_alias_FALSE$$
    }
  }
  var $classes$$9$$ = $goog$dom$classes$get$$(document.body), $classes_to_remove$$ = [];
  $goog$array$forEach$$($classes$$9$$, function($cls$$1$$) {
    0 == $cls$$1$$.lastIndexOf("active-view-", 0) && $classes_to_remove$$.push($cls$$1$$)
  });
  $goog$array$forEach$$($classes_to_remove$$, function($cls$$2$$) {
    $goog$dom$classes$remove$$(document.body, $cls$$2$$)
  });
  document.body.scrollTop = 0;
  $goog$dom$classes$add$$(document.body, "active-view-" + $e$$158_view_id$$4$$)
};
$JSCompiler_prototypeAlias$$.$formatCurrency$ = function $$JSCompiler_prototypeAlias$$$$formatCurrency$$($amount$$6$$, $currency_code$$2$$) {
  var $currency_def$$1$$ = this.$currency_info_$[$currency_code$$2$$];
  return(new $goog$i18n$NumberFormat$$($currency_def$$1$$.$format$, $currency_def$$1$$.code)).$format$($amount$$6$$)
};
$JSCompiler_prototypeAlias$$.$onSecurityList_$ = function $$JSCompiler_prototypeAlias$$$$onSecurityList_$$($e$$159_msg$$56$$) {
  $e$$159_msg$$56$$ = $e$$159_msg$$56$$.data;
  $goog$array$forEach$$($e$$159_msg$$56$$.Currencies, function($currency$$7$$) {
    this.$currency_info_$[$currency$$7$$.Code] = {code:$currency$$7$$.Code, $format$:$currency$$7$$.FormatJS, description:$currency$$7$$.Description, $sign$:$currency$$7$$.Sign, $pip$:$currency$$7$$.Pip, $is_crypto$:$currency$$7$$.IsCrypto};
    var $balance_key$$1$$ = "balance_" + $currency$$7$$.Code.toLowerCase();
    this.$model_$.set($balance_key$$1$$, 0);
    this.$model_$.set("formatted_" + $balance_key$$1$$, this.$formatCurrency$(0, $currency$$7$$.Code))
  }, this);
  var $symbols$$2$$ = [];
  $goog$array$forEach$$($e$$159_msg$$56$$.Instruments, function($instrument$$2$$) {
    var $symbol$$12$$ = $instrument$$2$$.Symbol;
    this.$all_markets_$[$symbol$$12$$] = {$symbol$:$symbol$$12$$, description:$instrument$$2$$.Description};
    $symbols$$2$$.push($symbol$$12$$)
  }, this);
  this.$model_$.set("SecurityList", $e$$159_msg$$56$$)
};
$JSCompiler_prototypeAlias$$.$onModelSetBroker_$ = function $$JSCompiler_prototypeAlias$$$$onModelSetBroker_$$($broker$$7_e$$160$$) {
  $broker$$7_e$$160$$ = $broker$$7_e$$160$$.data;
  console.log($goog$debug$deepExpose$$($broker$$7_e$$160$$));
  var $allowed_markets$$1$$ = {};
  $goog$array$forEach$$($broker$$7_e$$160$$.Currencies.split(","), function($currency$$8$$) {
    var $market$$1$$ = $goog$object$findKey$$(this.$all_markets_$, function($market_info$$, $symbol$$13$$) {
      if(0 <= $symbol$$13$$.indexOf($currency$$8$$)) {
        return $JSCompiler_alias_TRUE$$
      }
    });
    $market$$1$$ != $JSCompiler_alias_NULL$$ && ($allowed_markets$$1$$[$market$$1$$] = this.$all_markets_$[$market$$1$$])
  }, this);
  console.log($goog$debug$deepExpose$$($allowed_markets$$1$$));
  this.$model_$.set("AllowedMarkets", $allowed_markets$$1$$)
};
$JSCompiler_prototypeAlias$$.$onBrokerListResponse_$ = function $$JSCompiler_prototypeAlias$$$$onBrokerListResponse_$$($e$$161$$) {
  var $msg$$57$$ = $e$$161$$.data;
  $goog$array$forEach$$($msg$$57$$.BrokerListGrp, function($broker_array$$1$$) {
    var $broker_info$$6$$ = {};
    $goog$array$forEach$$($msg$$57$$.Columns, function($column$$6$$, $index$$78$$) {
      $broker_info$$6$$[$column$$6$$] = $broker_array$$1$$[$index$$78$$]
    }, this);
    $broker_info$$6$$.CountryCode in this.$brokers_by_country_$ ? this.$brokers_by_country_$[$broker_info$$6$$.CountryCode].push($broker_info$$6$$) : this.$brokers_by_country_$[$broker_info$$6$$.CountryCode] = [$broker_info$$6$$]
  }, this);
  this.$model_$.set("BrokerList", $msg$$57$$)
};
$JSCompiler_prototypeAlias$$.$onConnectionOpen_$ = function $$JSCompiler_prototypeAlias$$$$onConnectionOpen_$$() {
  $goog$dom$classes$remove$$(document.body, "ws-not-connected");
  $goog$dom$classes$add$$(document.body, "ws-connected");
  $goog$dom$classes$remove$$(document.body, "bitex-broker");
  $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
  this.$conn_$.$requestSecurityList$();
  this.$conn_$.$requestBrokerList$()
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
  $JSCompiler_StaticMethods_showDialog$$(this, "Error connecting to the server. Your browser MUST SUPPORT WebSockets.");
  this.$router_$.$setView$("start")
};
function $JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_showDialog$self$$, $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$, $buttonSet$$1_opt_button_set$$) {
  $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$ = $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$ || "Error";
  $buttonSet$$1_opt_button_set$$ = $buttonSet$$1_opt_button_set$$ || $JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ != $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$dispose$(), $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ = $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$ = new $bootstrap$Dialog$$;
  var $JSCompiler_StaticMethods_setTitle$self$$inline_619$$ = $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_619$$.$title_$ = $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$;
  $JSCompiler_StaticMethods_setTitle$self$$inline_619$$.$titleTextEl_$ && $goog$dom$setTextContent$$($JSCompiler_StaticMethods_setTitle$self$$inline_619$$.$titleTextEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$);
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$setContent$($JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$);
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$ = $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$;
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttons_$ = $buttonSet$$1_opt_button_set$$;
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttonEl_$ && ($JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttons_$ ? ($JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$ = $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttonEl_$, 
  $JSCompiler_StaticMethods_attachToElement$self$$inline_741_opt_title$$3_title$$8$$.render()) : $JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttonEl_$.innerHTML = "", $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$inline_622_content$$18$$.$buttons_$));
  $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$.$setVisible$($JSCompiler_alias_TRUE$$);
  return $JSCompiler_StaticMethods_showDialog$self$$.$dialog_$
}
function $JSCompiler_StaticMethods_showNotification$$($JSCompiler_StaticMethods_showNotification$self$$, $alert_content_title$$9$$, $content$$19$$) {
  var $display_time$$ = 2E3;
  $goog$isNumber$$($JSCompiler_alias_VOID$$) && ($display_time$$ = $JSCompiler_alias_VOID$$);
  $alert_content_title$$9$$ = $goog$dom$createDom$$("span", $JSCompiler_alias_VOID$$, [$goog$dom$createDom$$("strong", $JSCompiler_alias_VOID$$, $alert_content_title$$9$$), " ", $content$$19$$]);
  var $notification$$ = new $bootstrap$Alert$$("success", $alert_content_title$$9$$, $JSCompiler_alias_TRUE$$);
  $notification$$.render($goog$dom$getElement$$("id_notifications"));
  if(0 < $display_time$$) {
    var $handler$$78$$ = $JSCompiler_StaticMethods_showNotification$self$$.$getHandler$();
    $goog$Timer$callOnce$$(function() {
      var $anim$$3$$ = new $goog$fx$dom$FadeOutAndHide$$($notification$$.$getElement$(), 200);
      $JSCompiler_StaticMethods_listenOnce$$($handler$$78$$, $anim$$3$$, "end", function() {
        $notification$$.$dispose$();
        $anim$$3$$.$dispose$()
      });
      $anim$$3$$.play()
    }, $display_time$$, $JSCompiler_StaticMethods_showNotification$self$$)
  }
}
$goog$exportPath_$$("bitex.app.satoshi_square", function($setNewPasswordView$$inline_628_url$$32$$) {
  var $JSCompiler_StaticMethods_run$self$$inline_625$$ = new $bitex$app$SatoshiSquare$$;
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_withdraw_list"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_customers_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_trade_history_well"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_balances_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_trades_id"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("account_overview_printed_boletos_id"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_withdraw_list"), $bitex$templates$DataGrid$$, {id:"id_withdraw_list_table", title:"Withdrawal history"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_customers_well"), $bitex$templates$DataGrid$$, {id:"id_customer_table", title:"Customers", $show_search$:$JSCompiler_alias_TRUE$$, $search_placeholder$:"Username or email..."});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_trade_history_well"), $bitex$templates$DataGrid$$, {id:"id_trade_history_table"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_balances_id"), $bitex$templates$DataGrid$$, {id:"account_overview_balances_table_id"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_withdraw_requests_id"), $bitex$templates$DataGrid$$, {id:"account_overview_withdraw_requests_table_id"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_trades_id"), $bitex$templates$DataGrid$$, {id:"account_overview_trades_table_id"});
  $goog$soy$renderElement$$($goog$dom$getElement$$("account_overview_printed_boletos_id"), $bitex$templates$DataGrid$$, {id:"account_overview_printed_boletos_table_id"});
  $goog$dom$removeChildren$$($goog$dom$getElement$$("offer_book_order_entry_content"));
  var $buy_order_entry_el$$inline_744_loginView$$inline_629$$ = $goog$soy$renderAsElement$$({id:"id_order_entry_buy", $symbol$:"", $side$:1, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$}), $sell_order_entry_el$$inline_745_signUpView$$inline_630$$ = $goog$soy$renderAsElement$$({id:"id_order_entry_sell", $symbol$:"", $side$:2, type:2, $hide_fee$:$JSCompiler_alias_TRUE$$, $hide_client_id$:$JSCompiler_alias_TRUE$$});
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($buy_order_entry_el$$inline_744_loginView$$inline_629$$);
  $goog$dom$getElement$$("offer_book_order_entry_content").appendChild($sell_order_entry_el$$inline_745_signUpView$$inline_630$$);
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_bid_content"));
  $goog$dom$removeChildren$$($goog$dom$getElement$$("id_order_book_ask_content"));
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_bid_content"), $bitex$templates$OrderBook$$, {id:"order_book_bid", title:"BID", $columns$:["Buyer", "Amount", "Price"]});
  $goog$soy$renderElement$$($goog$dom$getElement$$("id_order_book_ask_content"), $bitex$templates$OrderBook$$, {id:"order_book_offer", title:"ASK", $columns$:["Price", "Amount", "Seller"]});
  $JSCompiler_StaticMethods_run$self$$inline_625$$.$url_$ = $setNewPasswordView$$inline_628_url$$32$$;
  var $handler$$inline_643_startView$$inline_627$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_625$$);
  $setNewPasswordView$$inline_628_url$$32$$ = new $bitex$view$SetNewPasswordView$$($JSCompiler_StaticMethods_run$self$$inline_625$$);
  var $buy_order_entry_el$$inline_744_loginView$$inline_629$$ = new $bitex$view$LoginView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $sell_order_entry_el$$inline_745_signUpView$$inline_630$$ = new $bitex$view$SignupView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $forgotPasswordView$$inline_631$$ = new $bitex$view$ForgotPasswordView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $tosView$$inline_632$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), 
  $depositView$$inline_633$$ = new $bitex$view$DepositView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $verificationView$$inline_634$$ = new $bitex$view$VerificationView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $enableTwoFactorView$$inline_635$$ = new $bitex$view$TwoFactorView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $offerBookView$$inline_636$$ = new $bitex$view$OfferBookView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $accountActivityView$$inline_637$$ = 
  new $bitex$view$AccountActivityView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $tradingView$$inline_638$$ = new $bitex$view$NullView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $withdrawView$$inline_639$$ = new $bitex$view$WithdrawView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $customersView$$inline_640$$ = new $bitex$view$CustomersView$$($JSCompiler_StaticMethods_run$self$$inline_625$$), $accountOverviewView$$inline_641$$ = new $bitex$view$AccountOverview$$($JSCompiler_StaticMethods_run$self$$inline_625$$), 
  $sideBarView$$inline_642$$ = new $bitex$view$SideBarView$$($JSCompiler_StaticMethods_run$self$$inline_625$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $sideBarView$$inline_642$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $handler$$inline_643_startView$$inline_627$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $setNewPasswordView$$inline_628_url$$32$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $buy_order_entry_el$$inline_744_loginView$$inline_629$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $sell_order_entry_el$$inline_745_signUpView$$inline_630$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $forgotPasswordView$$inline_631$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $tosView$$inline_632$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $tradingView$$inline_638$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $offerBookView$$inline_636$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $depositView$$inline_633$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $withdrawView$$inline_639$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $accountActivityView$$inline_637$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $customersView$$inline_640$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $accountOverviewView$$inline_641$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $verificationView$$inline_634$$);
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, $enableTwoFactorView$$inline_635$$);
  $handler$$inline_643_startView$$inline_627$$.$decorate$($goog$dom$getElement$$("start"));
  $setNewPasswordView$$inline_628_url$$32$$.$decorate$($goog$dom$getElement$$("set_new_password"));
  $buy_order_entry_el$$inline_744_loginView$$inline_629$$.$decorate$($goog$dom$getElement$$("signin"));
  $sell_order_entry_el$$inline_745_signUpView$$inline_630$$.$decorate$($goog$dom$getElement$$("signup"));
  $forgotPasswordView$$inline_631$$.$decorate$($goog$dom$getElement$$("forgot_password"));
  $tosView$$inline_632$$.$decorate$($goog$dom$getElement$$("tos"));
  $tradingView$$inline_638$$.$decorate$($goog$dom$getElement$$("trading"));
  $offerBookView$$inline_636$$.$decorate$($goog$dom$getElement$$("offerbook"));
  $depositView$$inline_633$$.$decorate$($goog$dom$getElement$$("deposit"));
  $withdrawView$$inline_639$$.$decorate$($goog$dom$getElement$$("withdraw"));
  $accountActivityView$$inline_637$$.$decorate$($goog$dom$getElement$$("account_activity"));
  $customersView$$inline_640$$.$decorate$($goog$dom$getElement$$("customers"));
  $accountOverviewView$$inline_641$$.$decorate$($goog$dom$getElement$$("account_overview"));
  $verificationView$$inline_634$$.$decorate$($goog$dom$getElement$$("verification"));
  $enableTwoFactorView$$inline_635$$.$decorate$($goog$dom$getElement$$("enable_two_factor"));
  $sideBarView$$inline_642$$.$decorate$($goog$dom$getElement$$("id_sidebar"));
  $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$.$decorate$(document.body);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(start)", $handler$$inline_643_startView$$inline_627$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(set_new_password)", $setNewPasswordView$$inline_628_url$$32$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(signin)", $buy_order_entry_el$$inline_744_loginView$$inline_629$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(signup)", $sell_order_entry_el$$inline_745_signUpView$$inline_630$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(forgot_password)", $forgotPasswordView$$inline_631$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(tos)", $tosView$$inline_632$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(trading)", $tradingView$$inline_638$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(offerbook)", $offerBookView$$inline_636$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(deposit)", $depositView$$inline_633$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(withdraw)", $withdrawView$$inline_639$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(account_activity)", $accountActivityView$$inline_637$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(customers)", $customersView$$inline_640$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(account_overview)/(\\w+)/$", $accountOverviewView$$inline_641$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(verification)", $verificationView$$inline_634$$);
  $JSCompiler_StaticMethods_addView$$($JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "(enable_two_factor)", $enableTwoFactorView$$inline_635$$);
  $JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$.$setView$("start");
  $JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$.init();
  $JSCompiler_StaticMethods_run$self$$inline_625$$.$loginView_$ = $buy_order_entry_el$$inline_744_loginView$$inline_629$$;
  $handler$$inline_643_startView$$inline_627$$ = $JSCompiler_StaticMethods_run$self$$inline_625$$.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$router_$, "set_view", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBeforeSetView_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "opened", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onConnectionOpen_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "closed", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onConnectionClose_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "error", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onConnectionError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "broker_list", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBrokerListResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "security_list", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onSecurityList_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "login_ok", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserLoginOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "login_error", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserLoginError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "two_factor_secret", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexTwoFactorSecretResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "balance_response", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexBalanceResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "pwd_changed_ok", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexPasswordChangedOk_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "pwd_changed_error", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexPasswordChangedError_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "boleto_options_response", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexBoletoOptionsResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "generate_boleto_response", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexGenerateBoletoResponse_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$, "execution_report", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBitexExecutionReport_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, document.body, "click", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onBodyClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $sell_order_entry_el$$inline_745_signUpView$$inline_630$$, "signup_click", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserSignupButton_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $buy_order_entry_el$$inline_744_loginView$$inline_629$$, "login_click", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserLoginButtonClick_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $enableTwoFactorView$$inline_635$$, "two_factor_enable", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserEnableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $enableTwoFactorView$$inline_635$$, "two_factor_disable", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserDisableTwoFactor_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $forgotPasswordView$$inline_631$$, "recover_pwd", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserForgotPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $setNewPasswordView$$inline_628_url$$32$$, "set_new_pwd", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserSetNewPassword_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $depositView$$inline_633$$, "gen_boleto", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserGenerateBoleto_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $sideBarView$$inline_642$$, "changed_market", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserChangeMarket_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "order_entry_submitted", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "cancel_order", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserCancelOrder_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "md_subscribe", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserMarketDataSubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "md_unsubscribe", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserMarketDataUnsubscribe_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "order_entry_submitted", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserOrderEntry_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "withdraw_event", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserWithdrawRequest_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$views_$, "confirm_withdraw", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onUserConfirmWithdraw_$);
  $JSCompiler_StaticMethods_listen$$($handler$$inline_643_startView$$inline_627$$, $JSCompiler_StaticMethods_run$self$$inline_625$$.$model_$, "model_setBroker", $JSCompiler_StaticMethods_run$self$$inline_625$$.$onModelSetBroker_$);
  try {
    $JSCompiler_StaticMethods_run$self$$inline_625$$.$conn_$.open($JSCompiler_StaticMethods_run$self$$inline_625$$.$url_$)
  }catch($e$$inline_644$$) {
    $JSCompiler_StaticMethods_showDialog$$($JSCompiler_StaticMethods_run$self$$inline_625$$, "Error connecting to the server. Your browser MUST SUPPORT WebSockets.")
  }
});

