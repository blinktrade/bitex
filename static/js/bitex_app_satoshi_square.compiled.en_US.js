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
function $goog$array$findIndex$$($arr$$36$$, $f$$15$$) {
  for(var $l$$8$$ = $arr$$36$$.length, $arr2$$6$$ = $goog$isString$$($arr$$36$$) ? $arr$$36$$.split("") : $arr$$36$$, $i$$21$$ = 0;$i$$21$$ < $l$$8$$;$i$$21$$++) {
    if($i$$21$$ in $arr2$$6$$ && $f$$15$$.call($JSCompiler_alias_VOID$$, $arr2$$6$$[$i$$21$$], $i$$21$$, $arr$$36$$)) {
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
function $goog$object$forEach$$($obj$$49$$, $f$$19$$) {
  for(var $key$$21$$ in $obj$$49$$) {
    $f$$19$$.call($JSCompiler_alias_VOID$$, $obj$$49$$[$key$$21$$], $key$$21$$, $obj$$49$$)
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
var $ua$$inline_75$$;
if($ua$$inline_75$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_76$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_75$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_75$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_75$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_76$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_78$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_78$$ && $navigator$$inline_78$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_81$$ = "", $re$$inline_82$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_83$$ = $goog$global$$.opera.version, $version$$inline_81$$ = "function" == typeof $operaVersion$$inline_83$$ ? $operaVersion$$inline_83$$() : $operaVersion$$inline_83$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_82$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_82$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_82$$ = /WebKit\/(\S+)/), $re$$inline_82$$) {
      var $arr$$inline_84$$ = $re$$inline_82$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_81$$ = $arr$$inline_84$$ ? $arr$$inline_84$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_85$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_85$$ > parseFloat($version$$inline_81$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_85$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_81$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$55_order$$inline_89$$;
  if(!($JSCompiler_temp$$55_order$$inline_89$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$55_order$$inline_89$$ = 0;
    for(var $v1Subs$$inline_90$$ = $goog$string$trim$$(String($goog$userAgent$VERSION$$)).split("."), $v2Subs$$inline_91$$ = $goog$string$trim$$(String($version$$8$$)).split("."), $subCount$$inline_92$$ = Math.max($v1Subs$$inline_90$$.length, $v2Subs$$inline_91$$.length), $subIdx$$inline_93$$ = 0;0 == $JSCompiler_temp$$55_order$$inline_89$$ && $subIdx$$inline_93$$ < $subCount$$inline_92$$;$subIdx$$inline_93$$++) {
      var $v1Sub$$inline_94$$ = $v1Subs$$inline_90$$[$subIdx$$inline_93$$] || "", $v2Sub$$inline_95$$ = $v2Subs$$inline_91$$[$subIdx$$inline_93$$] || "", $v1CompParser$$inline_96$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_97$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_98$$ = $v1CompParser$$inline_96$$.exec($v1Sub$$inline_94$$) || ["", "", ""], $v2Comp$$inline_99$$ = $v2CompParser$$inline_97$$.exec($v2Sub$$inline_95$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_98$$[0].length && 0 == $v2Comp$$inline_99$$[0].length) {
          break
        }
        $JSCompiler_temp$$55_order$$inline_89$$ = ((0 == $v1Comp$$inline_98$$[1].length ? 0 : parseInt($v1Comp$$inline_98$$[1], 10)) < (0 == $v2Comp$$inline_99$$[1].length ? 0 : parseInt($v2Comp$$inline_99$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_98$$[1].length ? 0 : parseInt($v1Comp$$inline_98$$[1], 10)) > (0 == $v2Comp$$inline_99$$[1].length ? 0 : parseInt($v2Comp$$inline_99$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_98$$[2].length) < (0 == $v2Comp$$inline_99$$[2].length) ? -1 : (0 == $v1Comp$$inline_98$$[2].length) > 
        (0 == $v2Comp$$inline_99$$[2].length) ? 1 : 0) || ($v1Comp$$inline_98$$[2] < $v2Comp$$inline_99$$[2] ? -1 : $v1Comp$$inline_98$$[2] > $v2Comp$$inline_99$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$55_order$$inline_89$$)
    }
    $JSCompiler_temp$$55_order$$inline_89$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$55_order$$inline_89$$
  }
  return $JSCompiler_temp$$55_order$$inline_89$$
}
var $doc$$inline_101$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_101$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_101$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
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
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_106$$) {
  var $doc$$inline_105_win$$inline_107$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_106$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_106$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_105_win$$inline_107$$.compatMode ? $doc$$inline_105_win$$inline_107$$.documentElement : $doc$$inline_105_win$$inline_107$$.body;
  $doc$$inline_105_win$$inline_107$$ = $goog$dom$getWindow_$$($doc$$inline_105_win$$inline_107$$);
  return new $goog$math$Coordinate$$($doc$$inline_105_win$$inline_107$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_106$$.scrollLeft, $doc$$inline_105_win$$inline_107$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_106$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
function $JSCompiler_StaticMethods_insertChildAt$$($parent$$9$$, $child$$4$$, $index$$54$$) {
  $parent$$9$$.insertBefore($child$$4$$, $parent$$9$$.childNodes[$index$$54$$] || $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
$JSCompiler_prototypeAlias$$.$getChildren$ = $goog$dom$getChildren$$;
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$setTextContent$ = $goog$dom$setTextContent$$;
// Input 15
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
function $goog$style$setStyle_$$($element$$33$$, $value$$67$$, $prefixedStyle$$inline_112_style$$1$$) {
  var $camelStyle$$inline_111_propertyName$$8$$;
  a: {
    if($camelStyle$$inline_111_propertyName$$8$$ = $goog$string$toCamelCase$$($prefixedStyle$$inline_112_style$$1$$), $element$$33$$.style[$camelStyle$$inline_111_propertyName$$8$$] === $JSCompiler_alias_VOID$$ && ($prefixedStyle$$inline_112_style$$1$$ = ($goog$userAgent$WEBKIT$$ ? "Webkit" : $goog$userAgent$GECKO$$ ? "Moz" : $goog$userAgent$IE$$ ? "ms" : $goog$userAgent$OPERA$$ ? "O" : $JSCompiler_alias_NULL$$) + $goog$string$toTitleCase$$($prefixedStyle$$inline_112_style$$1$$), $element$$33$$.style[$prefixedStyle$$inline_112_style$$1$$] !== 
    $JSCompiler_alias_VOID$$)) {
      $camelStyle$$inline_111_propertyName$$8$$ = $prefixedStyle$$inline_112_style$$1$$;
      break a
    }
  }
  $camelStyle$$inline_111_propertyName$$8$$ && ($element$$33$$.style[$camelStyle$$inline_111_propertyName$$8$$] = $value$$67$$)
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
function $goog$style$getSizeWithDisplay_$$($doc$$inline_119_element$$56$$) {
  var $offsetWidth_rect$$inline_118$$ = $doc$$inline_119_element$$56$$.offsetWidth, $offsetHeight$$ = $doc$$inline_119_element$$56$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_118$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth_rect$$inline_118$$) || $webkitOffsetsZero$$) && $doc$$inline_119_element$$56$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_118$$ = $doc$$inline_119_element$$56$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_119_element$$56$$ = $doc$$inline_119_element$$56$$.ownerDocument, $offsetWidth_rect$$inline_118$$.left -= $doc$$inline_119_element$$56$$.documentElement.clientLeft + $doc$$inline_119_element$$56$$.body.clientLeft, $offsetWidth_rect$$inline_118$$.top -= 
  $doc$$inline_119_element$$56$$.documentElement.clientTop + $doc$$inline_119_element$$56$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_118$$.right - $offsetWidth_rect$$inline_118$$.left, $offsetWidth_rect$$inline_118$$.bottom - $offsetWidth_rect$$inline_118$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_118$$, $offsetHeight$$)
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
  var $pixelValue$$inline_127_width$$15$$ = $element$$69$$.currentStyle ? $element$$69$$.currentStyle[$prop$$4$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$15_oldStyleValue$$inline_125$$;
  if($pixelValue$$inline_127_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$15_oldStyleValue$$inline_125$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_127_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_127_width$$15$$)) {
      $JSCompiler_temp$$15_oldStyleValue$$inline_125$$ = parseInt($pixelValue$$inline_127_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$15_oldStyleValue$$inline_125$$ = $element$$69$$.style.left;
      var $oldRuntimeValue$$inline_126$$ = $element$$69$$.runtimeStyle.left;
      $element$$69$$.runtimeStyle.left = $element$$69$$.currentStyle.left;
      $element$$69$$.style.left = $pixelValue$$inline_127_width$$15$$;
      $pixelValue$$inline_127_width$$15$$ = $element$$69$$.style.pixelLeft;
      $element$$69$$.style.left = $JSCompiler_temp$$15_oldStyleValue$$inline_125$$;
      $element$$69$$.runtimeStyle.left = $oldRuntimeValue$$inline_126$$;
      $JSCompiler_temp$$15_oldStyleValue$$inline_125$$ = $pixelValue$$inline_127_width$$15$$
    }
  }
  return $JSCompiler_temp$$15_oldStyleValue$$inline_125$$
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
      var $JSCompiler_inline_result$$19$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$19$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_131$$) {
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
function $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $type$$63$$, $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$) {
  if($goog$isArray$$($type$$63$$)) {
    for(var $i$$64$$ = 0;$i$$64$$ < $type$$63$$.length;$i$$64$$++) {
      $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $type$$63$$[$i$$64$$], $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$)
    }
  }else {
    $listenableKey$$1_src$$10$$ = $goog$events$listen_$$($listenableKey$$1_src$$10$$, $type$$63$$, $listener$$37$$, $JSCompiler_alias_TRUE$$, $opt_capt$$4$$, $opt_handler$$3$$), $goog$events$listeners_$$[$listenableKey$$1_src$$10$$.key] = $listenableKey$$1_src$$10$$
  }
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
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_part$$inline_140_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$;
    if(!($JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$ = ["window", "event"];
        for(var $cur$$inline_139_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_140_retval$$1$$ = $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$.shift();) {
          if($cur$$inline_139_hasBubble$$1$$[$ieEvent_part$$inline_140_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_139_hasBubble$$1$$ = $cur$$inline_139_hasBubble$$1$$[$ieEvent_part$$inline_140_retval$$1$$]
          }else {
            $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$ = $cur$$inline_139_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_140_retval$$1$$ = $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$;
    $JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_139_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$) {
      if(0 > $ieEvent_part$$inline_140_retval$$1$$.keyCode || $ieEvent_part$$inline_140_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_143$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_140_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_140_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_144$$) {
            $evt$$16_useReturnValue$$inline_143$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_143$$ || $ieEvent_part$$inline_140_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_140_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_143$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_143$$.init($ieEvent_part$$inline_140_retval$$1$$, this);
    $ieEvent_part$$inline_140_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$8_hasCapture$$2_parts$$inline_138$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_143$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$70$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_143$$.$propagationStopped_$ && 0 <= $i$$70$$ && $targetsMap$$1$$.$remaining_$;$i$$70$$--) {
          $evt$$16_useReturnValue$$inline_143$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_140_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_143$$)
        }
        if($cur$$inline_139_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$70$$ = 0;!$evt$$16_useReturnValue$$inline_143$$.$propagationStopped_$ && $i$$70$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$70$$++) {
            $evt$$16_useReturnValue$$inline_143$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_140_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_143$$)
          }
        }
      }else {
        $ieEvent_part$$inline_140_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_143$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_140_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_140_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
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
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$, $i$$inline_154_type$$77$$, $listener$$inline_149_opt_fn$$6$$, $capture$$inline_152_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_151$$) {
  if($goog$isArray$$($i$$inline_154_type$$77$$)) {
    for(var $i$$73$$ = 0;$i$$73$$ < $i$$inline_154_type$$77$$.length;$i$$73$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$, $i$$inline_154_type$$77$$[$i$$73$$], $listener$$inline_149_opt_fn$$6$$, $capture$$inline_152_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_151$$)
    }
  }else {
    a: {
      $listener$$inline_149_opt_fn$$6$$ = $listener$$inline_149_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_151$$ = $opt_handler$$12_opt_handler$$inline_151$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_152_opt_capture$$3$$ = !!$capture$$inline_152_opt_capture$$3$$;
      if($key$$54_listener$$51_listenerArray$$inline_153_src$$20$$ = $goog$events$getListeners_$$($key$$54_listener$$51_listenerArray$$inline_153_src$$20$$, $i$$inline_154_type$$77$$, $capture$$inline_152_opt_capture$$3$$)) {
        for($i$$inline_154_type$$77$$ = 0;$i$$inline_154_type$$77$$ < $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$.length;$i$$inline_154_type$$77$$++) {
          if(!$key$$54_listener$$51_listenerArray$$inline_153_src$$20$$[$i$$inline_154_type$$77$$].$removed$ && $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$[$i$$inline_154_type$$77$$].$listener$ == $listener$$inline_149_opt_fn$$6$$ && $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$[$i$$inline_154_type$$77$$].capture == $capture$$inline_152_opt_capture$$3$$ && $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$[$i$$inline_154_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_151$$) {
            $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$[$i$$inline_154_type$$77$$];
            break a
          }
        }
      }
      $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$ && ($key$$54_listener$$51_listenerArray$$inline_153_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$.key, $goog$events$unlistenByKey$$($key$$54_listener$$51_listenerArray$$inline_153_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$54_listener$$51_listenerArray$$inline_153_src$$20$$))
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
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$43_e$$24_e$$inline_157$$) {
  var $hasCapture$$inline_163_type$$inline_158$$ = $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.type || $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$, $map$$inline_159$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_163_type$$inline_158$$ in $map$$inline_159$$) {
    if($goog$isString$$($JSCompiler_inline_result$$43_e$$24_e$$inline_157$$)) {
      $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$ = new $goog$events$Event$$($JSCompiler_inline_result$$43_e$$24_e$$inline_157$$, this)
    }else {
      if($JSCompiler_inline_result$$43_e$$24_e$$inline_157$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.target = $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.target || this
      }else {
        var $oldEvent$$inline_160_rv$$inline_161$$ = $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$;
        $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$ = new $goog$events$Event$$($hasCapture$$inline_163_type$$inline_158$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$43_e$$24_e$$inline_157$$, $oldEvent$$inline_160_rv$$inline_161$$)
      }
    }
    var $oldEvent$$inline_160_rv$$inline_161$$ = 1, $ancestors$$inline_162_current$$inline_167$$, $map$$inline_159$$ = $map$$inline_159$$[$hasCapture$$inline_163_type$$inline_158$$], $hasCapture$$inline_163_type$$inline_158$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_159$$, $parent$$inline_165_targetsMap$$inline_164$$;
    if($hasCapture$$inline_163_type$$inline_158$$) {
      $ancestors$$inline_162_current$$inline_167$$ = [];
      for($parent$$inline_165_targetsMap$$inline_164$$ = this;$parent$$inline_165_targetsMap$$inline_164$$;$parent$$inline_165_targetsMap$$inline_164$$ = $parent$$inline_165_targetsMap$$inline_164$$.$parentEventTarget_$) {
        $ancestors$$inline_162_current$$inline_167$$.push($parent$$inline_165_targetsMap$$inline_164$$)
      }
      $parent$$inline_165_targetsMap$$inline_164$$ = $map$$inline_159$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_165_targetsMap$$inline_164$$.$remaining_$ = $parent$$inline_165_targetsMap$$inline_164$$.$count_$;
      for(var $i$$inline_166$$ = $ancestors$$inline_162_current$$inline_167$$.length - 1;!$JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$propagationStopped_$ && 0 <= $i$$inline_166$$ && $parent$$inline_165_targetsMap$$inline_164$$.$remaining_$;$i$$inline_166$$--) {
        $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.currentTarget = $ancestors$$inline_162_current$$inline_167$$[$i$$inline_166$$], $oldEvent$$inline_160_rv$$inline_161$$ &= $goog$events$fireListeners_$$($parent$$inline_165_targetsMap$$inline_164$$, $ancestors$$inline_162_current$$inline_167$$[$i$$inline_166$$], $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$) && $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_159$$) {
      if($parent$$inline_165_targetsMap$$inline_164$$ = $map$$inline_159$$[$JSCompiler_alias_FALSE$$], $parent$$inline_165_targetsMap$$inline_164$$.$remaining_$ = $parent$$inline_165_targetsMap$$inline_164$$.$count_$, $hasCapture$$inline_163_type$$inline_158$$) {
        for($i$$inline_166$$ = 0;!$JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$propagationStopped_$ && $i$$inline_166$$ < $ancestors$$inline_162_current$$inline_167$$.length && $parent$$inline_165_targetsMap$$inline_164$$.$remaining_$;$i$$inline_166$$++) {
          $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.currentTarget = $ancestors$$inline_162_current$$inline_167$$[$i$$inline_166$$], $oldEvent$$inline_160_rv$$inline_161$$ &= $goog$events$fireListeners_$$($parent$$inline_165_targetsMap$$inline_164$$, $ancestors$$inline_162_current$$inline_167$$[$i$$inline_166$$], $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$) && $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_162_current$$inline_167$$ = this;!$JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$propagationStopped_$ && $ancestors$$inline_162_current$$inline_167$$ && $parent$$inline_165_targetsMap$$inline_164$$.$remaining_$;$ancestors$$inline_162_current$$inline_167$$ = $ancestors$$inline_162_current$$inline_167$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.currentTarget = $ancestors$$inline_162_current$$inline_167$$, $oldEvent$$inline_160_rv$$inline_161$$ &= $goog$events$fireListeners_$$($parent$$inline_165_targetsMap$$inline_164$$, $ancestors$$inline_162_current$$inline_167$$, $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$) && $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$ = Boolean($oldEvent$$inline_160_rv$$inline_161$$)
  }else {
    $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$43_e$$24_e$$inline_157$$
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
    var $obj$$inline_614$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_615$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_615$$ in $obj$$inline_614$$ && delete $obj$$inline_614$$[$key$$inline_615$$];
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
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $child$$11$$) {
  var $index$$inline_172_sibling$$inline_175$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_172_sibling$$inline_175$$ || $index$$inline_172_sibling$$inline_175$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_174_key$$inline_618$$ = $child$$11$$.$getId$();
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_174_key$$inline_618$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $child$$11$$.$getId$(), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_172_sibling$$inline_175$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_174_key$$inline_618$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_174_key$$inline_618$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_174_key$$inline_618$$.childNodes[$index$$inline_172_sibling$$inline_175$$] || $JSCompiler_alias_NULL$$)) : ($JSCompiler_StaticMethods_addChild$self$$.$element_$ || 
  $JSCompiler_StaticMethods_addChild$self$$.$createDom$(), $index$$inline_172_sibling$$inline_175$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$[$index$$inline_172_sibling$$inline_175$$ + 1] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$, $child$$11$$.$render_$($JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $index$$inline_172_sibling$$inline_175$$ ? $index$$inline_172_sibling$$inline_175$$.$element_$ : $JSCompiler_alias_NULL$$))
}
$JSCompiler_prototypeAlias$$.$getContentElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$1$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$rightToLeft_$ = $rightToLeft$$1$$
};
function $JSCompiler_StaticMethods_forEachChild$$($JSCompiler_StaticMethods_forEachChild$self$$, $f$$27$$) {
  $JSCompiler_StaticMethods_forEachChild$self$$.$children_$ && $goog$array$forEach$$($JSCompiler_StaticMethods_forEachChild$self$$.$children_$, $f$$27$$, $JSCompiler_alias_VOID$$)
}
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $child$$15$$.$getId$();
    $child$$15$$ = this.$childIndex_$ && $id$$6$$ ? ($id$$6$$ in this.$childIndex_$ ? this.$childIndex_$[$id$$6$$] : $JSCompiler_alias_VOID$$) || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    if($id$$6$$ && $child$$15$$) {
      var $obj$$inline_625$$ = this.$childIndex_$;
      $id$$6$$ in $obj$$inline_625$$ && delete $obj$$inline_625$$[$id$$6$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
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
      var $keys$$1_rv$$inline_182$$;
      if("function" == typeof $col$$6$$.$getKeys$) {
        $keys$$1_rv$$inline_182$$ = $col$$6$$.$getKeys$()
      }else {
        if("function" != typeof $col$$6$$.$getValues$) {
          if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
            $keys$$1_rv$$inline_182$$ = [];
            for(var $l$$inline_183_values$$5$$ = $col$$6$$.length, $i$$inline_184_l$$14$$ = 0;$i$$inline_184_l$$14$$ < $l$$inline_183_values$$5$$;$i$$inline_184_l$$14$$++) {
              $keys$$1_rv$$inline_182$$.push($i$$inline_184_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_182$$ = $goog$object$getKeys$$($col$$6$$)
          }
        }else {
          $keys$$1_rv$$inline_182$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_183_values$$5$$ = $goog$structs$getValues$$($col$$6$$), $i$$inline_184_l$$14$$ = $l$$inline_183_values$$5$$.length, $i$$84$$ = 0;$i$$84$$ < $i$$inline_184_l$$14$$;$i$$84$$++) {
        $f$$28$$.call($opt_obj$$29$$, $l$$inline_183_values$$5$$[$i$$84$$], $keys$$1_rv$$inline_182$$ && $keys$$1_rv$$inline_182$$[$i$$84$$], $col$$6$$)
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
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($element$$79_key$$inline_187$$) {
  $element$$79_key$$inline_187$$ = $goog$structs$Set$getKey_$$($element$$79_key$$inline_187$$);
  return $goog$structs$Map$hasKey_$$(this.$map_$.$map_$, $element$$79_key$$inline_187$$)
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
  var $selectedIndex$$inline_190_type$$92_values$$inline_193$$ = $el$$35$$.type;
  if(!$goog$isDef$$($selectedIndex$$inline_190_type$$92_values$$inline_193$$)) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_190_type$$92_values$$inline_193$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$35$$.checked ? $el$$35$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_190_type$$92_values$$inline_193$$ = $el$$35$$.selectedIndex, 0 <= $selectedIndex$$inline_190_type$$92_values$$inline_193$$ ? $el$$35$$.options[$selectedIndex$$inline_190_type$$92_values$$inline_193$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_190_type$$92_values$$inline_193$$ = [], $option$$inline_194$$, $i$$inline_195$$ = 0;$option$$inline_194$$ = $el$$35$$.options[$i$$inline_195$$];$i$$inline_195$$++) {
        $option$$inline_194$$.selected && $selectedIndex$$inline_190_type$$92_values$$inline_193$$.push($option$$inline_194$$.value)
      }
      return $selectedIndex$$inline_190_type$$92_values$$inline_193$$.length ? $selectedIndex$$inline_190_type$$92_values$$inline_193$$ : $JSCompiler_alias_NULL$$;
    default:
      return $goog$isDef$$($el$$35$$.value) ? $el$$35$$.value : $JSCompiler_alias_NULL$$
  }
}
function $goog$dom$forms$setValue$$($el$$39$$, $opt_value$$6$$) {
  var $opt_value$$inline_206_option$$inline_202_type$$93$$ = $el$$39$$.type;
  if($goog$isDef$$($opt_value$$inline_206_option$$inline_202_type$$93$$)) {
    switch($opt_value$$inline_206_option$$inline_202_type$$93$$.toLowerCase()) {
      case "checkbox":
      ;
      case "radio":
        $el$$39$$.checked = $opt_value$$6$$ ? "checked" : $JSCompiler_alias_NULL$$;
        break;
      case "select-one":
        $el$$39$$.selectedIndex = -1;
        if($goog$isString$$($opt_value$$6$$)) {
          for(var $i$$inline_203_option$$inline_207$$ = 0;$opt_value$$inline_206_option$$inline_202_type$$93$$ = $el$$39$$.options[$i$$inline_203_option$$inline_207$$];$i$$inline_203_option$$inline_207$$++) {
            if($opt_value$$inline_206_option$$inline_202_type$$93$$.value == $opt_value$$6$$) {
              $opt_value$$inline_206_option$$inline_202_type$$93$$.selected = $JSCompiler_alias_TRUE$$;
              break
            }
          }
        }
        break;
      case "select-multiple":
        $opt_value$$inline_206_option$$inline_202_type$$93$$ = $opt_value$$6$$;
        $goog$isString$$($opt_value$$inline_206_option$$inline_202_type$$93$$) && ($opt_value$$inline_206_option$$inline_202_type$$93$$ = [$opt_value$$inline_206_option$$inline_202_type$$93$$]);
        for(var $i$$inline_208$$ = 0;$i$$inline_203_option$$inline_207$$ = $el$$39$$.options[$i$$inline_208$$];$i$$inline_208$$++) {
          if($i$$inline_203_option$$inline_207$$.selected = $JSCompiler_alias_FALSE$$, $opt_value$$inline_206_option$$inline_202_type$$93$$) {
            for(var $value$$inline_209$$, $j$$inline_210$$ = 0;$value$$inline_209$$ = $opt_value$$inline_206_option$$inline_202_type$$93$$[$j$$inline_210$$];$j$$inline_210$$++) {
              $i$$inline_203_option$$inline_207$$.value == $value$$inline_209$$ && ($i$$inline_203_option$$inline_207$$.selected = $JSCompiler_alias_TRUE$$)
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
  this.$model_$.data = $data$$32$$;
  this.dispatchEvent("withdraw_event")
};
$goog$ui$registry$setDecoratorByClassName$$("bitex-withdraw", function() {
  return new $bitex$ui$Withdraw$$
});
// Input 50
function $bitex$ui$DataGrid$$($options$$6$$, $opt_domHelper$$4$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$4$$);
  this.$columns_$ = $options$$6$$.columns;
  this.$row_class_fn_$ = $options$$6$$.rowClassFn || $goog$nullFunction$$;
  this.$current_page_$ = $options$$6$$.currentPage || 0;
  this.$limit_$ = $options$$6$$.limit || 100;
  this.$sort_column_$ = "";
  this.$sort_direction_$ = "up";
  this.$loading_data_$ = $goog$dom$createDom$$("div", ["progress", "progress-striped", "active"], $goog$dom$createDom$$("div", "bar"));
  $goog$style$setWidth$$(this.$loading_data_$, "50%");
  var $element$$inline_218$$ = this.$loading_data_$;
  $goog$isString$$("margin") ? $goog$style$setStyle_$$($element$$inline_218$$, "auto", "margin") : $goog$object$forEach$$("margin", $goog$partial$$($goog$style$setStyle_$$, $element$$inline_218$$));
  $goog$style$setWidth$$($goog$dom$getFirstElementChild$$(this.$loading_data_$), "100%")
}
$goog$inherits$$($bitex$ui$DataGrid$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$DataGrid$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("datagrid");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$80$$) {
  this.$element_$ = $element$$80$$;
  var $table_header_element$$ = $goog$dom$getFirstElementChild$$($element$$80$$);
  $goog$dom$classes$add$$($table_header_element$$, this.$getBaseCssClass$());
  var $thead_element$$ = $goog$dom$getFirstElementChild$$($table_header_element$$);
  $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($thead_element$$)).setAttribute("colspan", this.$columns_$.length);
  this.$th_sizing_el_$ = $goog$dom$createDom$$("tr");
  this.$tr_columns_el_$ = $goog$dom$createDom$$("tr");
  $goog$array$forEach$$(this.$columns_$, function($child$$inline_226_column$$) {
    var $th_column_properties$$ = {"data-property":$child$$inline_226_column$$.property};
    $child$$inline_226_column$$.sortable && ($th_column_properties$$["class"] = "sortable");
    var $child$$inline_223$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_226_column$$.label);
    this.$tr_columns_el_$.appendChild($child$$inline_223$$);
    $child$$inline_226_column$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_226_column$$.label);
    this.$th_sizing_el_$.appendChild($child$$inline_226_column$$)
  }, this);
  $thead_element$$.appendChild(this.$tr_columns_el_$);
  this.$table_data_body_el_$ = $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($goog$dom$getNextElementSibling$$($table_header_element$$)));
  this.$element_start_counter_$ = $goog$dom$getElementByClass$$("grid-start", $element$$80$$);
  this.$element_end_counter_$ = $goog$dom$getElementByClass$$("grid-end", $element$$80$$);
  this.$element_prev_button_$ = $goog$dom$getElementByClass$$("grid-prevpage", $element$$80$$);
  this.$element_next_button_$ = $goog$dom$getElementByClass$$("grid-nextpage", $element$$80$$)
};
$JSCompiler_prototypeAlias$$.$handlePreviousPage_$ = function $$JSCompiler_prototypeAlias$$$$handlePreviousPage_$$() {
  0 >= this.$current_page_$ || (this.$current_page_$ -= 1, this.$render_$())
};
$JSCompiler_prototypeAlias$$.$handleNextPage_$ = function $$JSCompiler_prototypeAlias$$$$handleNextPage_$$() {
  this.$current_page_$ += 1;
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$handleColumnClick_$ = function $$JSCompiler_prototypeAlias$$$$handleColumnClick_$$($e$$38_other_sorted_column_elements_sort_indicator_element$$) {
  var $classToRemove_element$$81$$ = $e$$38_other_sorted_column_elements_sort_indicator_element$$.target;
  if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$81$$), "sortable")) {
    this.$sort_column_$ = $classToRemove_element$$81$$.getAttribute("data-property");
    if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$81$$), "sorted")) {
      $e$$38_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $classToRemove_element$$81$$);
      var $classToAdd$$;
      $goog$array$contains$$($goog$dom$classes$get$$($e$$38_other_sorted_column_elements_sort_indicator_element$$), "icon-chevron-up") ? ($classToRemove_element$$81$$ = "icon-chevron-up", $classToAdd$$ = "icon-chevron-down", this.$sort_direction_$ = "ASC") : ($classToRemove_element$$81$$ = "icon-chevron-down", $classToAdd$$ = "icon-chevron-up", this.$sort_direction_$ = "DESC");
      $goog$dom$classes$addRemove$$($e$$38_other_sorted_column_elements_sort_indicator_element$$, $classToRemove_element$$81$$, $classToAdd$$)
    }else {
      $e$$38_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementsByClass$$("sorted", this.$tr_columns_el_$), $goog$array$forEach$$($e$$38_other_sorted_column_elements_sort_indicator_element$$, function($other_sort_indicator_element_other_sorted_column_element$$) {
        $goog$dom$classes$remove$$($other_sort_indicator_element_other_sorted_column_element$$, "sorted");
        $other_sort_indicator_element_other_sorted_column_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $other_sort_indicator_element_other_sorted_column_element$$);
        $other_sort_indicator_element_other_sorted_column_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($other_sort_indicator_element_other_sorted_column_element$$)
      }, this), $e$$38_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$createDom$$("i", ["icon-chevron-up", "datagrid-sort"]), $classToRemove_element$$81$$.appendChild($e$$38_other_sorted_column_elements_sort_indicator_element$$), this.$sort_direction_$ = "DESC", $goog$dom$classes$add$$($classToRemove_element$$81$$, "sorted")
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
  this.$render_$()
};
function $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_resultSetToElements$self$$, $resultSet$$, $columns$$3$$) {
  var $elements$$1$$ = [], $result_set_col_index$$1$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_resultSetToElements$self$$.$columns_$, function($this_col$$1$$, $index_row_set$$1$$) {
    var $index$$62$$ = $goog$array$findIndex$$($columns$$3$$, function($col$$18$$) {
      return $col$$18$$ == $this_col$$1$$.property
    });
    $result_set_col_index$$1$$[$index$$62$$] = $index_row_set$$1$$
  });
  $goog$array$forEach$$($resultSet$$, function($row_set$$) {
    var $row_set_obj$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$89$$, $result_set_index$$) {
      var $index$$63$$ = $result_set_col_index$$1$$[$result_set_index$$];
      $index$$63$$ != $JSCompiler_alias_NULL$$ && ($row_set_obj$$[this.$columns_$[$index$$63$$].property] = $value$$89$$)
    }, this);
    var $tr$$ = $goog$dom$createDom$$("tr", this.$row_class_fn_$($row_set_obj$$)), $td_elements$$ = {}, $rowSetObj$$ = {}, $x$$66$$;
    for($x$$66$$ in $columns$$3$$) {
      $rowSetObj$$[$columns$$3$$[$x$$66$$]] = $row_set$$[$x$$66$$]
    }
    $goog$array$forEach$$($row_set$$, function($value$$90$$, $result_set_index$$1$$) {
      var $index$$64$$ = $result_set_col_index$$1$$[$result_set_index$$1$$];
      if($index$$64$$ != $JSCompiler_alias_NULL$$) {
        var $formatter$$1_td$$ = this.$columns_$[$index$$64$$].formatter || function() {
          return"" + $value$$90$$
        }, $formatter$$1_td$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$64$$].classes || $goog$nullFunction$$)($value$$90$$), $formatter$$1_td$$($value$$90$$, $rowSetObj$$));
        $td_elements$$[this.$columns_$[$index$$64$$].property] = $formatter$$1_td$$
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
  var $el_size$$inline_249_sizing_row$$inline_245$$ = $JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $work_col_1$$inline_246$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$tr_columns_el_$), $work_col_2$$inline_247$$ = $goog$dom$getFirstElementChild$$($first_row$$1$$), $sizing_col$$inline_248$$ = $goog$dom$getFirstElementChild$$($el_size$$inline_249_sizing_row$$inline_245$$);
  for($goog$dom$getChildren$$($el_size$$inline_249_sizing_row$$inline_245$$);$sizing_col$$inline_248$$ != $JSCompiler_alias_NULL$$;) {
    $el_size$$inline_249_sizing_row$$inline_245$$ = $goog$style$getSize$$($sizing_col$$inline_248$$), $goog$style$setWidth$$($work_col_1$$inline_246$$, $el_size$$inline_249_sizing_row$$inline_245$$.width), $goog$style$setWidth$$($work_col_2$$inline_247$$, $el_size$$inline_249_sizing_row$$inline_245$$.width), $work_col_1$$inline_246$$ = $goog$dom$getNextElementSibling$$($work_col_1$$inline_246$$), $work_col_2$$inline_247$$ = $goog$dom$getNextElementSibling$$($work_col_2$$inline_247$$), $sizing_col$$inline_248$$ = 
    $goog$dom$getNextElementSibling$$($sizing_col$$inline_248$$)
  }
  $goog$dom$removeNode$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$)
}
function $bitex$ui$DataGridEvent$$($type$$94$$, $options$$8$$) {
  $goog$events$Event$$.call(this, $type$$94$$);
  this.options = $options$$8$$
}
$goog$inherits$$($bitex$ui$DataGridEvent$$, $goog$events$Event$$);
// Input 51
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
  }}, {property:"Price", label:"Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$19$$) {
    return($s$$19$$ / 1E8).toFixed(2)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-price"
  }}, {property:"CumQty", label:"Qty", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$20$$) {
    return($s$$20$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Avg. Price", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$21$$) {
    return($s$$21$$ / 1E8).toFixed(2)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-avg-price"
  }}, {property:"Volume", label:"Total", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$22$$) {
    return($s$$22$$ / 1E8).toFixed(2)
  }, classes:function() {
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
// Input 52
function $bitex$ui$WithdrawList$$($opt_domHelper$$6$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"WithdrawID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-withdraw-id"
  }}, {property:"Status", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$23$$) {
    switch($s$$23$$) {
      case "0":
        return"N\u00e3o confirmado";
      case "1":
        return"Pendente";
      case "2":
        return"Finalizado"
    }
    return""
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-status"
  }}, {property:"Created", label:"Date/Time", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-created"
  }}, {property:"Currency", label:"Currency", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-currency"
  }}, {property:"Amount", label:"Amount", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$24$$, $row_set_obj$$1$$) {
    return"CRY" == $row_set_obj$$1$$.Type ? ($s$$24$$ / 1E8).toFixed(8) : ($s$$24$$ / 1E8).toFixed(2)
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-amount"
  }}, {property:"Wallet", label:"Details", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$25$$, $row_set_obj$$2$$) {
    delete $row_set_obj$$2$$.WithdrawID;
    delete $row_set_obj$$2$$.Status;
    delete $row_set_obj$$2$$.Amount;
    delete $row_set_obj$$2$$.Currency;
    delete $row_set_obj$$2$$.Created;
    delete $row_set_obj$$2$$.Type;
    delete $row_set_obj$$2$$.WithdrawID;
    var $detail_obj$$ = {}, $key$$71$$;
    for($key$$71$$ in $row_set_obj$$2$$) {
      $row_set_obj$$2$$[$key$$71$$] != $JSCompiler_alias_NULL$$ && ($detail_obj$$[$key$$71$$] = $row_set_obj$$2$$[$key$$71$$])
    }
    return JSON.stringify($detail_obj$$)
  }, classes:function() {
    return $bitex$ui$WithdrawList$CSS_CLASS$$ + "-details"
  }}]}, $opt_domHelper$$6$$)
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
// Input 53
function $bitex$ui$OrderManager$$($opt_blinkDelay$$, $opt_domHelper$$7$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$ || 700;
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
  }}, {property:"ClOrdID", label:"Actions", sortable:$JSCompiler_alias_FALSE$$, formatter:function($id$$7$$, $row_set_obj$$3$$) {
    var $attributes$$1_i$$117$$ = {"class":"icon-remove", "data-client-order-id":$id$$7$$};
    $row_set_obj$$3$$ != $JSCompiler_alias_NULL$$ && ($attributes$$1_i$$117$$["data-order-id"] = $row_set_obj$$3$$.OrderID);
    $attributes$$1_i$$117$$ = $goog$dom$createDom$$("i", $attributes$$1_i$$117$$);
    return $goog$dom$createDom$$("a", {"class":"text-error", href:"#"}, $attributes$$1_i$$117$$)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$7$$)
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
$bitex$ui$OrderManager$$.prototype.$insertOrder$ = function $$bitex$ui$OrderManager$$$$$insertOrder$$($clientOrderId_tr_attributes$$, $dom$$4_status$$1$$, $side$$2_tr$$2$$, $orderQty$$, $price$$, $leavesQty$$, $cumQty_opt_cumQty$$, $avgPx_opt_avgPrice$$, $opt_orderId_orderId$$) {
  var $status_class_status_desc$$;
  switch($dom$$4_status$$1$$) {
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
  $price$$ = ($price$$ / 1E8).toFixed(5);
  $leavesQty$$ = ($leavesQty$$ / 1E8).toFixed(8);
  $cumQty_opt_cumQty$$ = ($cumQty_opt_cumQty$$ | 0).toFixed(8);
  $avgPx_opt_avgPrice$$ = ($avgPx_opt_avgPrice$$ | 0).toFixed(5);
  $opt_orderId_orderId$$ |= 0;
  $status_class_status_desc$$ = $bitex$ui$OrderManager$Status$$[$dom$$4_status$$1$$];
  $dom$$4_status$$1$$ = this.$getDomHelper$();
  $side$$2_tr$$2$$ = $dom$$4_status$$1$$.$createDom$("tr", $clientOrderId_tr_attributes$$, $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-id", "" + $opt_orderId_orderId$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-status", "" + $status_class_status_desc$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-side", "" + $side$$2_tr$$2$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-order-qty", "" + $orderQty$$), $dom$$4_status$$1$$.$createDom$("td", 
  this.$getCssClass$() + "-price", "" + $price$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-leaves-qty", "" + $leavesQty$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-cum-qty", "" + $cumQty_opt_cumQty$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-avg-px", "" + $avgPx_opt_avgPrice$$), $dom$$4_status$$1$$.$createDom$("td", this.$getCssClass$() + "-actions", $dom$$4_status$$1$$.$createDom$("a", {"class":"text-error", href:""}, $dom$$4_status$$1$$.$createDom$("i", 
  {"class":"icon-remove"}))));
  $dom$$4_status$$1$$.appendChild(this.$tbody_$, $side$$2_tr$$2$$)
};
$bitex$ui$OrderManager$$.prototype.$enterDocument$ = function $$bitex$ui$OrderManager$$$$$enterDocument$$() {
  $bitex$ui$OrderManager$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($client_order_id_e$$39$$) {
    var $order_id$$ = $client_order_id_e$$39$$.target.getAttribute("data-order-id");
    $order_id$$ != $JSCompiler_alias_NULL$$ ? this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $order_id$$)) : ($client_order_id_e$$39$$ = $client_order_id_e$$39$$.target.getAttribute("data-client-order-id"), this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $JSCompiler_alias_VOID$$, $client_order_id_e$$39$$)))
  })
};
function $bitex$ui$OrderManagerEvent$$($type$$95$$, $opt_order_id$$, $opt_client_order_id$$) {
  $goog$events$Event$$.call(this, $type$$95$$);
  this.$order_id$ = $opt_order_id$$;
  this.$client_order_id$ = $opt_client_order_id$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$OrderManager$CSS_CLASS$$, function() {
  return new $bitex$ui$OrderManager$$
});
// Input 54
// Input 55
// Input 56
function $goog$a11y$aria$setState$$($element$$84$$, $state$$1$$, $value$$92$$) {
  $element$$84$$.setAttribute("aria-" + $state$$1$$, $value$$92$$)
}
;
// Input 57
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$2$$) {
  var $element$$90$$ = $control$$2$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$2$$).join(" "), $control$$2$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$2$$, $element$$90$$);
  return $element$$90$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$91$$) {
  return $element$$91$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$3_element$$92$$, $className$$19$$, $enable$$1$$) {
  if($control$$3_element$$92$$ = $control$$3_element$$92$$.$getElement$ ? $control$$3_element$$92$$.$getElement$() : $control$$3_element$$92$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$3_element$$92$$), $className$$19$$);
      $combinedClasses$$.push($className$$19$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$3_element$$92$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$3_element$$92$$, $className$$19$$) : $goog$dom$classes$remove$$($control$$3_element$$92$$, $className$$19$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$5$$, $element$$94$$) {
  $element$$94$$.id && $JSCompiler_StaticMethods_setId$$($control$$5$$, $element$$94$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$94$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$5$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$5$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$2$$ = $goog$dom$classes$get$$($element$$94$$);
  $goog$array$forEach$$($classNames$$2$$, function($className$$21_state$$inline_260$$) {
    if(!$hasRendererClassName$$ && $className$$21_state$$inline_260$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$21_state$$inline_260$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$13$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_688$$ = this.$classByState_$, $transposed$$inline_689$$ = {}, $key$$inline_690$$;
          for($key$$inline_690$$ in $obj$$inline_688$$) {
            $transposed$$inline_689$$[$obj$$inline_688$$[$key$$inline_690$$]] = $key$$inline_690$$
          }
          this.$stateByClass_$ = $transposed$$inline_689$$
        }
        $className$$21_state$$inline_260$$ = parseInt(this.$stateByClass_$[$className$$21_state$$inline_260$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$13$$ | (isNaN($className$$21_state$$inline_260$$) ? 0 : $className$$21_state$$inline_260$$)
      }
    }
  }, this);
  $control$$5$$.$state_$ = $state$$2$$;
  $hasRendererClassName$$ || ($classNames$$2$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$2$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$5$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$2$$.push.apply($classNames$$2$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$2$$.push.apply($classNames$$2$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$94$$.className = $classNames$$2$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$5$$, $element$$94$$);
  return $element$$94$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$6$$) {
  $control$$6$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$6$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($control$$6$$.$inDocument_$ ? $control$$6$$.$element_$ : $control$$6$$.$dom_$.$document_$.body));
  $control$$6$$.$rightToLeft_$ && this.$setRightToLeft$($control$$6$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$6$$.isEnabled() && this.$setFocusable$($control$$6$$, $control$$6$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$7$$, $element$$96$$) {
  $control$$7$$.$visible_$ || $goog$a11y$aria$setState$$($element$$96$$, "hidden", !$control$$7$$.$visible_$);
  $control$$7$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$96$$, 1, !$control$$7$$.isEnabled());
  $control$$7$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$96$$, 8, !!($control$$7$$.$state_$ & 8));
  $control$$7$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$96$$, 16, !!($control$$7$$.$state_$ & 16));
  $control$$7$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$96$$, 64, !!($control$$7$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$97$$, $allow$$) {
  var $unselectable$$inline_271_value$$inline_274$$ = !$allow$$, $descendants$$inline_273$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$97$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_271_value$$inline_274$$ = $unselectable$$inline_271_value$$inline_274$$ ? "none" : "", $element$$97$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_271_value$$inline_274$$, $descendants$$inline_273$$) {
      for(var $i$$inline_275$$ = 0, $descendant$$inline_276$$;$descendant$$inline_276$$ = $descendants$$inline_273$$[$i$$inline_275$$];$i$$inline_275$$++) {
        $descendant$$inline_276$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_271_value$$inline_274$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_271_value$$inline_274$$ = $unselectable$$inline_271_value$$inline_274$$ ? "on" : "", $element$$97$$.setAttribute("unselectable", $unselectable$$inline_271_value$$inline_274$$), $descendants$$inline_273$$) {
        for($i$$inline_275$$ = 0;$descendant$$inline_276$$ = $descendants$$inline_273$$[$i$$inline_275$$];$i$$inline_275$$++) {
          $descendant$$inline_276$$.setAttribute("unselectable", $unselectable$$inline_271_value$$inline_274$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$98$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$98$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
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
      }catch($e$$40$$) {
      }
      $control$$9$$.$state_$ & 32 && $control$$9$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$99$$, $visible$$) {
  $goog$style$showElement$$($element$$99$$, $visible$$);
  $element$$99$$ && $goog$a11y$aria$setState$$($element$$99$$, "hidden", !$visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$10$$, $state$$3$$, $enable$$3$$) {
  var $element$$100$$ = $control$$10$$.$getElement$();
  if($element$$100$$) {
    var $className$$22$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$22$$ && this.$enableClassName$($control$$10$$, $className$$22$$, $enable$$3$$);
    this.$updateAriaState$($element$$100$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$101$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $goog$a11y$aria$setState$$($element$$101$$, $ariaState_state$$4$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$102$$, $content$$6$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$102$$);
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
  var $cssClass_extraClassNames$$1_state$$inline_279$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$3$$ = [$cssClass_extraClassNames$$1_state$$inline_279$$], $classNames$$inline_280_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_280_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_279$$ && $classNames$$3$$.push($classNames$$inline_280_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_279$$ = $control$$12$$.$state_$;
  for($classNames$$inline_280_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_279$$;) {
    var $mask$$inline_281$$ = $cssClass_extraClassNames$$1_state$$inline_279$$ & -$cssClass_extraClassNames$$1_state$$inline_279$$;
    $classNames$$inline_280_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_281$$));
    $cssClass_extraClassNames$$1_state$$inline_279$$ &= ~$mask$$inline_281$$
  }
  $classNames$$3$$.push.apply($classNames$$3$$, $classNames$$inline_280_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_279$$ = $control$$12$$.$extraClassNames_$) && $classNames$$3$$.push.apply($classNames$$3$$, $cssClass_extraClassNames$$1_state$$inline_279$$);
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
function $JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassForState$self$$, $state$$6$$) {
  $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_getClassForState$self$$);
  return $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$[$state$$6$$]
}
function $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_createClassByStateMap_$self$$) {
  var $baseClass$$ = $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$getCssClass$();
  $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$classByState_$ = {1:$baseClass$$ + "-disabled", 2:$baseClass$$ + "-hover", 4:$baseClass$$ + "-active", 8:$baseClass$$ + "-selected", 16:$baseClass$$ + "-checked", 32:$baseClass$$ + "-focused", 64:$baseClass$$ + "-open"}
}
;
// Input 58
// Input 59
// Input 60
function $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$41$$) {
  if($e$$41$$.altKey && !$e$$41$$.ctrlKey || $e$$41$$.metaKey || 112 <= $e$$41$$.keyCode && 123 >= $e$$41$$.keyCode) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($e$$41$$.keyCode) {
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
      return 166 > $e$$41$$.keyCode || 183 < $e$$41$$.keyCode
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
// Input 61
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
var $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, 
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$detectedMac_$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$42$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$42$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$42$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$42$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$42$$.ctrlKey && 17 != $e$$42$$.keyCode ? this.$lastKey_$ = 17 : $e$$42$$.altKey && 18 != $e$$42$$.keyCode ? this.$lastKey_$ = 18 : $e$$42$$.metaKey && 91 != $e$$42$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$42$$.keyCode, this.$lastKey_$, $e$$42$$.shiftKey, $e$$42$$.ctrlKey, $e$$42$$.altKey) ? this.handleEvent($e$$42$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$42$$.keyCode) : $e$$42$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$42$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$43$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$43$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$44_repeat$$) {
  var $be$$2_event$$3$$ = $e$$44_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$2_event$$3$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$44_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$2_event$$3$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$44_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$2_event$$3$$.charCode && 63232 > $be$$2_event$$3$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$3$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$3$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$72$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$3$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$72$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$44_repeat$$.shiftKey && ($key$$72$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$72$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$44_repeat$$ = $key$$72$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$72$$;
  $be$$2_event$$3$$ = new $goog$events$KeyEvent$$($key$$72$$, $charCode$$, $e$$44_repeat$$, $be$$2_event$$3$$);
  $be$$2_event$$3$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$2_event$$3$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$104$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$104$$;
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
  this.type = "key";
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
// Input 62
function $goog$ui$Control$$($content$$7$$, $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$, $opt_domHelper$$8$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$8$$);
  if(!$JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$) {
    $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$ = this.constructor;
    for(var $key$$inline_290_rendererCtor$$inline_291$$;$JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$;) {
      $key$$inline_290_rendererCtor$$inline_291$$ = $goog$getUid$$($JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$);
      if($key$$inline_290_rendererCtor$$inline_291$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_290_rendererCtor$$inline_291$$]) {
        break
      }
      $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$ = $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$ = $key$$inline_290_rendererCtor$$inline_291$$ ? $goog$isFunction$$($key$$inline_290_rendererCtor$$inline_291$$.$getInstance$) ? $key$$inline_290_rendererCtor$$inline_291$$.$getInstance$() : new $key$$inline_290_rendererCtor$$inline_291$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$41_componentCtor$$inline_289_opt_renderer$$;
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
  var $element$$105$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$105$$;
  var $ariaRole$$inline_318$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_318$$ && $element$$105$$.setAttribute("role", $ariaRole$$inline_318$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$105$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$105$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$106$$) {
  return this.$renderer_$.$canDecorate$($element$$106$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$107$$) {
  this.$element_$ = $element$$107$$ = this.$renderer_$.$decorate$(this, $element$$107$$);
  var $ariaRole$$inline_326$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_326$$ && $element$$107$$.setAttribute("role", $ariaRole$$inline_326$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$107$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$107$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  this.$renderer_$.$initializeDom$(this);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32)) {
    var $keyTarget$$2$$ = this.$getKeyEventTarget$();
    if($keyTarget$$2$$) {
      var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
      $JSCompiler_StaticMethods_attach$$($keyHandler$$, $keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyHandler$$, "key", this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$49$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$108$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$49$$, $element$$108$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$108$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$108$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$108$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$49$$, $element$$108$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$49$$, $element$$108$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$49$$, $element$$108$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$108$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$108$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$108$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$49$$, $element$$108$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$49$$, $element$$108$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
  var $element$$109$$ = this.$getElement$();
  $element$$109$$ && this.$renderer_$.$setRightToLeft$($element$$109$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$110$$ = this.$getElement$();
  $element$$110$$ && this.$renderer_$.$setAllowTextSelection$($element$$110$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$111$$ = this.$getElement$();
    $element$$111$$ && this.$renderer_$.$setVisible$($element$$111$$, $visible$$1$$);
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
  var $parent$$inline_332$$ = this.getParent();
  if((!$parent$$inline_332$$ || "function" != typeof $parent$$inline_332$$.isEnabled || $parent$$inline_332$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$8$$)) {
    $enable$$8$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$8$$), this.$setState$(1, !$enable$$8$$)
  }
};
function $JSCompiler_StaticMethods_setHighlighted$$($JSCompiler_StaticMethods_setHighlighted$self$$, $highlight$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setHighlighted$self$$, 2, $highlight$$) && $JSCompiler_StaticMethods_setHighlighted$self$$.$setState$(2, $highlight$$)
}
$JSCompiler_prototypeAlias$$.setActive = function $$JSCompiler_prototypeAlias$$$setActive$($active$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 4, $active$$) && this.$setState$(4, $active$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$9$$, $enable$$9$$) {
  this.$supportedStates_$ & $state$$9$$ && $enable$$9$$ != !!(this.$state_$ & $state$$9$$) && (this.$renderer_$.$setState$(this, $state$$9$$, $enable$$9$$), this.$state_$ = $enable$$9$$ ? this.$state_$ | $state$$9$$ : this.$state_$ & ~$state$$9$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$(32, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ &= -33
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$13$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$13$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$13$$)
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$15$$, $enable$$12$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$15$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$15$$) != $enable$$12$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$15$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$15$$, $enable$$12$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$45$$) {
  (!$e$$45$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$45$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$46$$) {
  if((!$e$$46$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$46$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$48$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$48$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$48$$) && $e$$48$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$49$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$49$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$50$$) {
  this.isEnabled() && this.$performActionInternal$($e$$50$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$51$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_335_open$$inline_341$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_335_open$$inline_341$$) && this.$setState$(16, $actionEvent_check$$inline_335_open$$inline_341$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_335_open$$inline_341$$ = !(this.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_335_open$$inline_341$$) && this.$setState$(64, $actionEvent_check$$inline_335_open$$inline_341$$));
  $actionEvent_check$$inline_335_open$$inline_341$$ = new $goog$events$Event$$("action", this);
  $e$$51$$ && ($actionEvent_check$$inline_335_open$$inline_341$$.altKey = $e$$51$$.altKey, $actionEvent_check$$inline_335_open$$inline_341$$.ctrlKey = $e$$51$$.ctrlKey, $actionEvent_check$$inline_335_open$$inline_341$$.metaKey = $e$$51$$.metaKey, $actionEvent_check$$inline_335_open$$inline_341$$.shiftKey = $e$$51$$.shiftKey, $actionEvent_check$$inline_335_open$$inline_341$$.$platformModifierKey$ = $e$$51$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_335_open$$inline_341$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$54$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$54$$) ? ($e$$54$$.preventDefault(), $e$$54$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$55$$) {
  return 13 == $e$$55$$.keyCode && this.$performActionInternal$($e$$55$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_351$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_351$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 63
// Input 64
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$112$$, $state$$16$$, $enable$$13$$) {
  16 == $state$$16$$ ? $goog$a11y$aria$setState$$($element$$112$$, "pressed", $enable$$13$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$112$$, $state$$16$$, $enable$$13$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$113$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$93$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$93$$ && this.$setTooltip$($element$$113$$, $tooltip_value$$93$$);
  ($tooltip_value$$93$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$113$$, $tooltip_value$$93$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$113$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$113$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$114$$) {
  $element$$114$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$114$$);
  var $value$$inline_354$$ = this.$getValue$($element$$114$$);
  $button$$2$$.$value_$ = $value$$inline_354$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$114$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$114$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$114$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$115$$) {
  return $element$$115$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$116$$, $tooltip$$1$$) {
  $element$$116$$ && ($element$$116$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 65
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$117$$) {
  return"BUTTON" == $element$$117$$.tagName || "INPUT" == $element$$117$$.tagName && ("button" == $element$$117$$.type || "submit" == $element$$117$$.type || "reset" == $element$$117$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$118$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$5$$);
  $button$$5$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$5$$);
  $element$$118$$.disabled && $goog$dom$classes$add$$($element$$118$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$118$$)
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
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$119$$, $state$$17$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$119$$, $state$$17$$, $enable$$14$$);
  if(($button$$8_element$$119$$ = $button$$8_element$$119$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$8_element$$119$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$120$$) {
  return $element$$120$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$121$$, $value$$94$$) {
  $element$$121$$ && ($element$$121$$.value = $value$$94$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 66
function $goog$ui$Button$$($content$$11$$, $opt_renderer$$1$$, $opt_domHelper$$9$$) {
  $goog$ui$Control$$.call(this, $content$$11$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$9$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$95$$) {
  this.$value_$ = $value$$95$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$95$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$56$$) {
  return 13 == $e$$56$$.keyCode && "key" == $e$$56$$.type || 32 == $e$$56$$.keyCode && "keyup" == $e$$56$$.type ? this.$performActionInternal$($e$$56$$) : 32 == $e$$56$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 67
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  return 2147483647 < $opt_delay$$ ? -1 : $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 68
function $goog$events$InputHandler$$($element$$122_emulateInputEvents$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$122_emulateInputEvents$$;
  $element$$122_emulateInputEvents$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && !$goog$userAgent$isVersion$$("531") && "TEXTAREA" == $element$$122_emulateInputEvents$$.tagName;
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$element_$, $element$$122_emulateInputEvents$$ ? ["keydown", "paste", "cut", "drop", "input"] : "input", this)
}
$goog$inherits$$($goog$events$InputHandler$$, $goog$events$EventTarget$$);
$goog$events$InputHandler$$.prototype.$timer_$ = $JSCompiler_alias_NULL$$;
$goog$events$InputHandler$$.prototype.handleEvent = function $$goog$events$InputHandler$$$$handleEvent$($e$$57$$) {
  if("input" == $e$$57$$.type) {
    $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this), (!$goog$userAgent$OPERA$$ || this.$element_$ == $goog$dom$getOwnerDocument$$(this.$element_$).activeElement) && this.dispatchEvent($JSCompiler_StaticMethods_createInputEvent_$$($e$$57$$))
  }else {
    if("keydown" != $e$$57$$.type || $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$57$$)) {
      var $valueBeforeKey$$ = "keydown" == $e$$57$$.type ? this.$element_$.value : $JSCompiler_alias_NULL$$;
      $goog$userAgent$IE$$ && 229 == $e$$57$$.keyCode && ($valueBeforeKey$$ = $JSCompiler_alias_NULL$$);
      var $inputEvent$$ = $JSCompiler_StaticMethods_createInputEvent_$$($e$$57$$);
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
function $JSCompiler_StaticMethods_createInputEvent_$$($be$$3_e$$58$$) {
  $be$$3_e$$58$$ = new $goog$events$BrowserEvent$$($be$$3_e$$58$$.$event_$);
  $be$$3_e$$58$$.type = "input";
  return $be$$3_e$$58$$
}
$goog$events$InputHandler$$.prototype.$disposeInternal$ = function $$goog$events$InputHandler$$$$$disposeInternal$$() {
  $goog$events$InputHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.$eventHandler_$.$dispose$();
  $JSCompiler_StaticMethods_cancelTimerIfSet_$$(this);
  delete this.$element_$
};
// Input 69
// Input 70
function $bitex$ui$OrderEntryX$$($opt_blinkDelay$$1$$, $opt_domHelper$$10$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$10$$);
  this.$marketPrice_$ = 0;
  this.$lastChangedField_$ = "amount"
}
$goog$inherits$$($bitex$ui$OrderEntryX$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$OrderEntryX$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($dom$$5_element$$123$$) {
  this.$element_$ = $dom$$5_element$$123$$;
  $dom$$5_element$$123$$ = this.$getDomHelper$();
  this.$symbolEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-symbol", this.$getElement$());
  this.$sideEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-side", this.$getElement$());
  this.$typeEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-type", this.$getElement$());
  this.$actionButtonEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-action", this.$getElement$());
  this.$amountEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-amount", this.$getElement$());
  this.$priceEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-price", this.$getElement$());
  this.$totalEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-total", this.$getElement$());
  this.$feeEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-fee", this.$getElement$());
  this.$clientIdEl_$ = $dom$$5_element$$123$$.$getElementByClass$(this.$getBaseCssClass$() + "-client-id", this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  var $handler$$50$$ = this.$getHandler$();
  this.$getDomHelper$();
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$KeyHandler$$(this.$amountEl_$), "key", this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$KeyHandler$$(this.$priceEl_$), "key", this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$KeyHandler$$(this.$totalEl_$), "key", this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$KeyHandler$$(this.$feeEl_$), "key", this.$onBlockNonNumberKeys_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$InputHandler$$(this.$amountEl_$), "input", this.$onChangeAmount_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$InputHandler$$(this.$priceEl_$), "input", this.$onChangePrice_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$InputHandler$$(this.$totalEl_$), "input", this.$onChangeTotal_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, new $goog$events$InputHandler$$(this.$feeEl_$), "input", this.$onChangeFee_$);
  $JSCompiler_StaticMethods_listen$$($handler$$50$$, this.$actionButtonEl_$, "click", this.$onAction_$)
};
$JSCompiler_prototypeAlias$$.$onBlockNonNumberKeys_$ = function $$JSCompiler_prototypeAlias$$$$onBlockNonNumberKeys_$$($e$$59$$) {
  console.log("onBlockNonNumberKeys_");
  var $inputEl$$ = $e$$59$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$);
  if(!$goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$59$$) && (38 == $e$$59$$.keyCode || 40 == $e$$59$$.keyCode)) {
    var $new_value$$1_startPos_value_to_change$$;
    $new_value$$1_startPos_value_to_change$$ = $inputEl$$.selectionStart;
    var $endPos$$1_originalStartPos$$ = $inputEl$$.selectionEnd;
    $new_value$$1_startPos_value_to_change$$ === $endPos$$1_originalStartPos$$ && 0 === $new_value$$1_startPos_value_to_change$$ ? ($new_value$$1_startPos_value_to_change$$ = $inputValue$$, $endPos$$1_originalStartPos$$ = $inputValue$$.length) : ("." === $inputValue$$.substr($new_value$$1_startPos_value_to_change$$ - 1, 1) && --$endPos$$1_originalStartPos$$, $new_value$$1_startPos_value_to_change$$ = $inputValue$$.substr(0, $endPos$$1_originalStartPos$$));
    var $match$$inline_370_number_of_decimal_places_originalEndPos$$;
    $match$$inline_370_number_of_decimal_places_originalEndPos$$ = ("" + $new_value$$1_startPos_value_to_change$$).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    $match$$inline_370_number_of_decimal_places_originalEndPos$$ = !$match$$inline_370_number_of_decimal_places_originalEndPos$$ ? 0 : Math.max(0, ($match$$inline_370_number_of_decimal_places_originalEndPos$$[1] ? $match$$inline_370_number_of_decimal_places_originalEndPos$$[1].length : 0) - ($match$$inline_370_number_of_decimal_places_originalEndPos$$[2] ? +$match$$inline_370_number_of_decimal_places_originalEndPos$$[2] : 0));
    var $value_to_add$$ = 1 / Math.pow(10, $match$$inline_370_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$);
    if(isNaN($new_value$$1_startPos_value_to_change$$)) {
      return
    }
    $new_value$$1_startPos_value_to_change$$ = 38 == $e$$59$$.keyCode ? $new_value$$1_startPos_value_to_change$$ + $value_to_add$$ : $new_value$$1_startPos_value_to_change$$ - $value_to_add$$;
    $new_value$$1_startPos_value_to_change$$ = (Math.round($new_value$$1_startPos_value_to_change$$ * Math.pow(10, $match$$inline_370_number_of_decimal_places_originalEndPos$$)) / Math.pow(10, $match$$inline_370_number_of_decimal_places_originalEndPos$$)).toFixed($match$$inline_370_number_of_decimal_places_originalEndPos$$);
    $new_value$$1_startPos_value_to_change$$ = "" + $new_value$$1_startPos_value_to_change$$ + $inputValue$$.substr($endPos$$1_originalStartPos$$);
    0 > $goog$string$toNumber$$($new_value$$1_startPos_value_to_change$$) && ($new_value$$1_startPos_value_to_change$$ = (0).toFixed($match$$inline_370_number_of_decimal_places_originalEndPos$$));
    $endPos$$1_originalStartPos$$ = $inputEl$$.selectionStart;
    $match$$inline_370_number_of_decimal_places_originalEndPos$$ = $inputEl$$.selectionEnd;
    $goog$dom$forms$setValue$$($inputEl$$, $new_value$$1_startPos_value_to_change$$);
    $inputValue$$.length == $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$, $inputEl$$.selectionEnd = $match$$inline_370_number_of_decimal_places_originalEndPos$$) : $inputValue$$.length > $new_value$$1_startPos_value_to_change$$.length ? ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ - 1, $inputEl$$.selectionEnd = $match$$inline_370_number_of_decimal_places_originalEndPos$$ - 1) : ($inputEl$$.selectionStart = $endPos$$1_originalStartPos$$ + 
    1, $inputEl$$.selectionEnd = $match$$inline_370_number_of_decimal_places_originalEndPos$$ + 1);
    switch($e$$59$$.target) {
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
    $e$$59$$.preventDefault()
  }
  if(!$e$$59$$.ctrlKey && ($e$$59$$.shiftKey || !(48 <= $e$$59$$.keyCode && 57 >= $e$$59$$.keyCode)) && $goog$events$KeyCodes$isTextModifyingKeyEvent$$($e$$59$$)) {
    switch($e$$59$$.keyCode) {
      case 46:
      ;
      case 8:
      ;
      case 9:
        return;
      case 110:
      ;
      case 190:
        if($inputEl$$ = $e$$59$$.target, $inputValue$$ = $goog$dom$forms$getValue$$($inputEl$$), 0 > $inputValue$$.indexOf(".")) {
          return
        }
    }
    $e$$59$$.preventDefault()
  }
};
function $JSCompiler_StaticMethods_setAmountCurrencySign$$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$, $value$$98$$) {
  var $elements$$3$$ = $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getBaseCssClass$() + "-amount-sign", $JSCompiler_StaticMethods_setAmountCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$3$$, function($el$$43$$) {
    $goog$dom$setTextContent$$($el$$43$$, $value$$98$$)
  })
}
function $JSCompiler_StaticMethods_setPriceCurrencySign$$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$, $value$$99$$) {
  var $elements$$4$$ = $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getDomHelper$().$getElementsByClass$($JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getBaseCssClass$() + "-price-sign", $JSCompiler_StaticMethods_setPriceCurrencySign$self$$.$getElement$());
  $goog$array$forEach$$($elements$$4$$, function($el$$44$$) {
    $goog$dom$setTextContent$$($el$$44$$, $value$$99$$)
  })
}
function $JSCompiler_StaticMethods_getAmount$$($JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$) {
  $JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$ = $goog$dom$forms$getValue$$($JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$.$amountEl_$);
  $JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$);
  isNaN($JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$) && ($JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$ = 0);
  return $JSCompiler_StaticMethods_getAmount$self_inputValue$$1_res$$7$$
}
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
function $JSCompiler_StaticMethods_setMarketPrice$$($JSCompiler_StaticMethods_setMarketPrice$self$$, $value$$105$$) {
  if($goog$isNumber$$($value$$105$$)) {
    var $res$$inline_373_value$$inline_376$$ = $goog$string$toNumber$$($JSCompiler_StaticMethods_setMarketPrice$self$$.$marketPrice_$);
    isNaN($res$$inline_373_value$$inline_376$$) && ($res$$inline_373_value$$inline_376$$ = 0);
    $res$$inline_373_value$$inline_376$$ === $JSCompiler_StaticMethods_getPrice$$($JSCompiler_StaticMethods_setMarketPrice$self$$) && ($res$$inline_373_value$$inline_376$$ = $JSCompiler_StaticMethods_setMarketPrice$self$$.$marketPrice_$, $goog$isNumber$$($res$$inline_373_value$$inline_376$$) && $goog$dom$forms$setValue$$($JSCompiler_StaticMethods_setMarketPrice$self$$.$priceEl_$, $res$$inline_373_value$$inline_376$$));
    $JSCompiler_StaticMethods_setMarketPrice$self$$.$marketPrice_$ = $value$$105$$
  }
}
$JSCompiler_prototypeAlias$$.$onChangeAmount_$ = function $$JSCompiler_prototypeAlias$$$$onChangeAmount_$$() {
  var $total$$ = $JSCompiler_StaticMethods_getPrice$$(this) * ($JSCompiler_StaticMethods_getAmount$$(this) + $JSCompiler_StaticMethods_getFee$$(this));
  $goog$isNumber$$($total$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $total$$);
  this.$lastChangedField_$ = "amount"
};
$JSCompiler_prototypeAlias$$.$onChangePrice_$ = function $$JSCompiler_prototypeAlias$$$$onChangePrice_$$() {
  if("amount" === this.$lastChangedField_$) {
    var $amount_total$$1$$ = $JSCompiler_StaticMethods_getPrice$$(this) * ($JSCompiler_StaticMethods_getAmount$$(this) + $JSCompiler_StaticMethods_getFee$$(this));
    $goog$isNumber$$($amount_total$$1$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $amount_total$$1$$)
  }else {
    0 < $JSCompiler_StaticMethods_getPrice$$(this) && ($amount_total$$1$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this), $goog$isNumber$$($amount_total$$1$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount_total$$1$$))
  }
};
$JSCompiler_prototypeAlias$$.$onChangeTotal_$ = function $$JSCompiler_prototypeAlias$$$$onChangeTotal_$$() {
  var $amount$$1$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this);
  $goog$isNumber$$($amount$$1$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount$$1$$);
  this.$lastChangedField_$ = "total"
};
$JSCompiler_prototypeAlias$$.$onChangeFee_$ = function $$JSCompiler_prototypeAlias$$$$onChangeFee_$$() {
  if("amount" === this.$lastChangedField_$) {
    var $amount$$2_total$$2$$ = $JSCompiler_StaticMethods_getPrice$$(this) * ($JSCompiler_StaticMethods_getAmount$$(this) + $JSCompiler_StaticMethods_getFee$$(this));
    $goog$isNumber$$($amount$$2_total$$2$$) && $goog$dom$forms$setValue$$(this.$totalEl_$, $amount$$2_total$$2$$)
  }else {
    0 < $JSCompiler_StaticMethods_getPrice$$(this) && ($amount$$2_total$$2$$ = $JSCompiler_StaticMethods_getTotal$$(this) / $JSCompiler_StaticMethods_getPrice$$(this) - $JSCompiler_StaticMethods_getFee$$(this), $goog$isNumber$$($amount$$2_total$$2$$) && $goog$dom$forms$setValue$$(this.$amountEl_$, $amount$$2_total$$2$$))
  }
};
$JSCompiler_prototypeAlias$$.$onAction_$ = function $$JSCompiler_prototypeAlias$$$$onAction_$$() {
  this.dispatchEvent("order_entry_submitted")
};
// Input 71
function $bitex$ui$Customers$$($opt_domHelper$$11$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"Username", label:"Username", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-username"
  }}, {property:"Email", label:"Email", sortable:$JSCompiler_alias_TRUE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-email"
  }}, {property:"Verified", label:"Verified", sortable:$JSCompiler_alias_TRUE$$, formatter:function($s$$33$$) {
    return $s$$33$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-verified"
  }}, {property:"TwoFactorEnabled", label:"Two step", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$34$$) {
    return $s$$34$$ ? "Yes" : "No"
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-two-steps"
  }}, {property:"LastLogin", label:"Last seen", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}, {property:"ID", label:"Actions", sortable:$JSCompiler_alias_TRUE$$, formatter:function($id$$9$$, $row_set_obj$$4$$) {
    return $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-primary btn-deposit", "data-user-id":$row_set_obj$$4$$.ID}, "Details")
  }, classes:function() {
    return $bitex$ui$Customers$CSS_CLASS$$ + "-last-login"
  }}]}, $opt_domHelper$$11$$)
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
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($e$$65_user_id$$) {
    $e$$65_user_id$$ = $e$$65_user_id$$.target.getAttribute("data-user-id");
    $e$$65_user_id$$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$ui$CustomersEvent$$($e$$65_user_id$$))
  })
};
function $bitex$ui$CustomersEvent$$($user_id$$1$$) {
  $goog$events$Event$$.call(this, "detail");
  this.$user_id$ = $user_id$$1$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$Customers$CSS_CLASS$$, function() {
  return new $bitex$ui$Customers$$
});
// Input 72
var $goog$i18n$NumberFormatSymbols_en$$ = {$DECIMAL_SEP$:".", $GROUP_SEP$:",", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", $MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"USD"}, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$;
// Input 73
var $goog$i18n$currency$CurrencyInfo$$ = {AED:[2, "dh", "\u062f.\u0625.", "DH"], AUD:[2, "$", "AU$"], BDT:[2, "\u09f3", "Tk"], BRL:[2, "R$", "R$"], CAD:[2, "$", "C$"], CHF:[2, "CHF", "CHF"], CLP:[0, "$", "CL$"], CNY:[2, "\u00a5", "RMB\u00a5"], COP:[0, "$", "COL$"], CRC:[0, "\u20a1", "CR\u20a1"], CZK:[2, "K\u010d", "K\u010d"], DKK:[18, "kr", "kr"], DOP:[2, "$", "RD$"], EGP:[2, "\u00a3", "LE"], EUR:[18, "\u20ac", "\u20ac"], GBP:[2, "\u00a3", "GB\u00a3"], HKD:[2, "$", "HK$"], ILS:[2, "\u20aa", "IL\u20aa"], 
INR:[2, "\u20b9", "Rs"], ISK:[0, "kr", "kr"], JMD:[2, "$", "JA$"], JPY:[0, "\u00a5", "JP\u00a5"], KRW:[0, "\u20a9", "KR\u20a9"], LKR:[2, "Rs", "SLRs"], MNT:[0, "\u20ae", "MN\u20ae"], MXN:[2, "$", "Mex$"], MYR:[2, "RM", "RM"], NOK:[18, "kr", "NOkr"], PAB:[2, "B/.", "B/."], PEN:[2, "S/.", "S/."], PHP:[2, "\u20b1", "Php"], PKR:[0, "Rs", "PKRs."], RUB:[42, "\u0440\u0443\u0431.", "\u0440\u0443\u0431."], SAR:[2, "Rial", "Rial"], SEK:[2, "kr", "kr"], SGD:[2, "$", "S$"], THB:[2, "\u0e3f", "THB"], TRY:[2, 
"TL", "YTL"], TWD:[2, "NT$", "NT$"], USD:[2, "$", "US$"], UYU:[2, "$", "UY$"], VND:[0, "\u20ab", "VN\u20ab"], YER:[0, "Rial", "Rial"], ZAR:[2, "R", "ZAR"]};
// Input 74
function $goog$i18n$NumberFormat$$($JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$, $opt_currency_strParts$$inline_652$$, $opt_currencyStyle_precision$$inline_653$$) {
  this.$intlCurrencyCode_$ = $opt_currency_strParts$$inline_652$$ || $goog$i18n$NumberFormatSymbols$$.$DEF_CURRENCY_CODE$;
  this.$currencyStyle_$ = $opt_currencyStyle_precision$$inline_653$$ || $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$;
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
  if("number" == typeof $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$) {
    switch($JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$) {
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
        $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$ = $goog$i18n$NumberFormatSymbols$$.$CURRENCY_PATTERN$;
        $opt_currency_strParts$$inline_652$$ = ["0"];
        $opt_currencyStyle_precision$$inline_653$$ = $goog$i18n$currency$CurrencyInfo$$[this.$intlCurrencyCode_$][0] & 7;
        if(0 < $opt_currencyStyle_precision$$inline_653$$) {
          $opt_currency_strParts$$inline_652$$.push(".");
          for(var $i$$inline_654$$ = 0;$i$$inline_654$$ < $opt_currencyStyle_precision$$inline_653$$;$i$$inline_654$$++) {
            $opt_currency_strParts$$inline_652$$.push("0")
          }
        }
        $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$ = $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$.replace(/0.00/g, $opt_currency_strParts$$inline_652$$.join(""));
        $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$);
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("Unsupported pattern type."))
    }
  }else {
    $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$613_pattern$$2_pattern$$inline_651$$)
  }
}
var $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$ = 0;
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$) {
  $JSCompiler_StaticMethods_applyPattern_$self$$.$pattern_$ = $pattern$$3$$.replace(/ /g, "\u00a0");
  var $pos$$5$$ = [0];
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$);
  for(var $trunkLen_trunkStart$$ = $pos$$5$$[0], $decimalPos$$inline_402$$ = -1, $digitLeftCount$$inline_403$$ = 0, $n$$inline_409_zeroDigitCount$$inline_404$$ = 0, $digitRightCount$$inline_405_totalDigits$$inline_410$$ = 0, $groupingCount$$inline_406$$ = -1, $len$$inline_407$$ = $pattern$$3$$.length, $loop$$inline_408$$ = $JSCompiler_alias_TRUE$$;$pos$$5$$[0] < $len$$inline_407$$ && $loop$$inline_408$$;$pos$$5$$[0]++) {
    switch($pattern$$3$$.charAt($pos$$5$$[0])) {
      case "#":
        0 < $n$$inline_409_zeroDigitCount$$inline_404$$ ? $digitRightCount$$inline_405_totalDigits$$inline_410$$++ : $digitLeftCount$$inline_403$$++;
        0 <= $groupingCount$$inline_406$$ && 0 > $decimalPos$$inline_402$$ && $groupingCount$$inline_406$$++;
        break;
      case "0":
        0 < $digitRightCount$$inline_405_totalDigits$$inline_410$$ && $JSCompiler_alias_THROW$$(Error('Unexpected "0" in pattern "' + $pattern$$3$$ + '"'));
        $n$$inline_409_zeroDigitCount$$inline_404$$++;
        0 <= $groupingCount$$inline_406$$ && 0 > $decimalPos$$inline_402$$ && $groupingCount$$inline_406$$++;
        break;
      case ",":
        $groupingCount$$inline_406$$ = 0;
        break;
      case ".":
        0 <= $decimalPos$$inline_402$$ && $JSCompiler_alias_THROW$$(Error('Multiple decimal separators in pattern "' + $pattern$$3$$ + '"'));
        $decimalPos$$inline_402$$ = $digitLeftCount$$inline_403$$ + $n$$inline_409_zeroDigitCount$$inline_404$$ + $digitRightCount$$inline_405_totalDigits$$inline_410$$;
        break;
      case "E":
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && $JSCompiler_alias_THROW$$(Error('Multiple exponential symbols in pattern "' + $pattern$$3$$ + '"'));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ = $JSCompiler_alias_TRUE$$;
        $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$ = 0;
        $pos$$5$$[0] + 1 < $len$$inline_407$$ && "+" == $pattern$$3$$.charAt($pos$$5$$[0] + 1) && ($pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$useSignForPositiveExponent_$ = $JSCompiler_alias_TRUE$$);
        for(;$pos$$5$$[0] + 1 < $len$$inline_407$$ && "0" == $pattern$$3$$.charAt($pos$$5$$[0] + 1);) {
          $pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$++
        }
        (1 > $digitLeftCount$$inline_403$$ + $n$$inline_409_zeroDigitCount$$inline_404$$ || 1 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$) && $JSCompiler_alias_THROW$$(Error('Malformed exponential pattern "' + $pattern$$3$$ + '"'));
        $loop$$inline_408$$ = $JSCompiler_alias_FALSE$$;
        break;
      default:
        $pos$$5$$[0]--, $loop$$inline_408$$ = $JSCompiler_alias_FALSE$$
    }
  }
  0 == $n$$inline_409_zeroDigitCount$$inline_404$$ && (0 < $digitLeftCount$$inline_403$$ && 0 <= $decimalPos$$inline_402$$) && ($n$$inline_409_zeroDigitCount$$inline_404$$ = $decimalPos$$inline_402$$, 0 == $n$$inline_409_zeroDigitCount$$inline_404$$ && $n$$inline_409_zeroDigitCount$$inline_404$$++, $digitRightCount$$inline_405_totalDigits$$inline_410$$ = $digitLeftCount$$inline_403$$ - $n$$inline_409_zeroDigitCount$$inline_404$$, $digitLeftCount$$inline_403$$ = $n$$inline_409_zeroDigitCount$$inline_404$$ - 
  1, $n$$inline_409_zeroDigitCount$$inline_404$$ = 1);
  (0 > $decimalPos$$inline_402$$ && 0 < $digitRightCount$$inline_405_totalDigits$$inline_410$$ || 0 <= $decimalPos$$inline_402$$ && ($decimalPos$$inline_402$$ < $digitLeftCount$$inline_403$$ || $decimalPos$$inline_402$$ > $digitLeftCount$$inline_403$$ + $n$$inline_409_zeroDigitCount$$inline_404$$) || 0 == $groupingCount$$inline_406$$) && $JSCompiler_alias_THROW$$(Error('Malformed pattern "' + $pattern$$3$$ + '"'));
  $digitRightCount$$inline_405_totalDigits$$inline_410$$ = $digitLeftCount$$inline_403$$ + $n$$inline_409_zeroDigitCount$$inline_404$$ + $digitRightCount$$inline_405_totalDigits$$inline_410$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ = 0 <= $decimalPos$$inline_402$$ ? $digitRightCount$$inline_405_totalDigits$$inline_410$$ - $decimalPos$$inline_402$$ : 0;
  0 <= $decimalPos$$inline_402$$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = $digitLeftCount$$inline_403$$ + $n$$inline_409_zeroDigitCount$$inline_404$$ - $decimalPos$$inline_402$$, 0 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = 0));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = (0 <= $decimalPos$$inline_402$$ ? $decimalPos$$inline_402$$ : $digitRightCount$$inline_405_totalDigits$$inline_410$$) - $digitLeftCount$$inline_403$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$maximumIntegerDigits_$ = $digitLeftCount$$inline_403$$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$, 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ && 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = 1));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$groupingSize_$ = Math.max(0, $groupingCount$$inline_406$$);
  $JSCompiler_StaticMethods_applyPattern_$self$$.$decimalSeparatorAlwaysShown_$ = 0 == $decimalPos$$inline_402$$ || $decimalPos$$inline_402$$ == $digitRightCount$$inline_405_totalDigits$$inline_410$$;
  $trunkLen_trunkStart$$ = $pos$$5$$[0] - $trunkLen_trunkStart$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$);
  $pos$$5$$[0] < $pattern$$3$$.length && $pattern$$3$$.charAt($pos$$5$$[0]) == $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ ? ($pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$), $pos$$5$$[0] += $trunkLen_trunkStart$$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, 
  $pattern$$3$$, $pos$$5$$)) : ($JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ += $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$)
}
$goog$i18n$NumberFormat$$.prototype.parse = function $$goog$i18n$NumberFormat$$$$parse$($text$$10$$, $opt_pos$$) {
  var $pos$$6$$ = $opt_pos$$ || [0], $ret$$4_text$$inline_413$$ = NaN;
  $text$$10$$ = $text$$10$$.replace(/ /g, "\u00a0");
  var $gotPositive$$ = $text$$10$$.indexOf(this.$positivePrefix_$, $pos$$6$$[0]) == $pos$$6$$[0], $gotNegative$$ = $text$$10$$.indexOf(this.$negativePrefix_$, $pos$$6$$[0]) == $pos$$6$$[0];
  $gotPositive$$ && $gotNegative$$ && (this.$positivePrefix_$.length > this.$negativePrefix_$.length ? $gotNegative$$ = $JSCompiler_alias_FALSE$$ : this.$positivePrefix_$.length < this.$negativePrefix_$.length && ($gotPositive$$ = $JSCompiler_alias_FALSE$$));
  $gotPositive$$ ? $pos$$6$$[0] += this.$positivePrefix_$.length : $gotNegative$$ && ($pos$$6$$[0] += this.$negativePrefix_$.length);
  if($text$$10$$.indexOf($goog$i18n$NumberFormatSymbols$$.$INFINITY$, $pos$$6$$[0]) == $pos$$6$$[0]) {
    $pos$$6$$[0] += $goog$i18n$NumberFormatSymbols$$.$INFINITY$.length, $ret$$4_text$$inline_413$$ = Infinity
  }else {
    for(var $ret$$4_text$$inline_413$$ = $text$$10$$, $sawDecimal$$inline_415$$ = $JSCompiler_alias_FALSE$$, $sawExponent$$inline_416$$ = $JSCompiler_alias_FALSE$$, $sawDigit$$inline_417$$ = $JSCompiler_alias_FALSE$$, $scale$$inline_418$$ = 1, $decimal$$inline_419$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$inline_420$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $exponentChar$$inline_421$$ = $goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$, $normalizedText$$inline_422$$ = "";$pos$$6$$[0] < 
    $ret$$4_text$$inline_413$$.length;$pos$$6$$[0]++) {
      var $ch$$inline_423$$ = $ret$$4_text$$inline_413$$.charAt($pos$$6$$[0]), $digit$$inline_424$$ = $JSCompiler_StaticMethods_getDigit_$$($ch$$inline_423$$);
      if(0 <= $digit$$inline_424$$ && 9 >= $digit$$inline_424$$) {
        $normalizedText$$inline_422$$ += $digit$$inline_424$$, $sawDigit$$inline_417$$ = $JSCompiler_alias_TRUE$$
      }else {
        if($ch$$inline_423$$ == $decimal$$inline_419$$.charAt(0)) {
          if($sawDecimal$$inline_415$$ || $sawExponent$$inline_416$$) {
            break
          }
          $normalizedText$$inline_422$$ += ".";
          $sawDecimal$$inline_415$$ = $JSCompiler_alias_TRUE$$
        }else {
          if($ch$$inline_423$$ == $grouping$$inline_420$$.charAt(0) && ("\u00a0" != $grouping$$inline_420$$.charAt(0) || $pos$$6$$[0] + 1 < $ret$$4_text$$inline_413$$.length && 0 <= $JSCompiler_StaticMethods_getDigit_$$($ret$$4_text$$inline_413$$.charAt($pos$$6$$[0] + 1)))) {
            if($sawDecimal$$inline_415$$ || $sawExponent$$inline_416$$) {
              break
            }
          }else {
            if($ch$$inline_423$$ == $exponentChar$$inline_421$$.charAt(0)) {
              if($sawExponent$$inline_416$$) {
                break
              }
              $normalizedText$$inline_422$$ += "E";
              $sawExponent$$inline_416$$ = $JSCompiler_alias_TRUE$$
            }else {
              if("+" == $ch$$inline_423$$ || "-" == $ch$$inline_423$$) {
                $normalizedText$$inline_422$$ += $ch$$inline_423$$
              }else {
                if($ch$$inline_423$$ == $goog$i18n$NumberFormatSymbols$$.$PERCENT$.charAt(0)) {
                  if(1 != $scale$$inline_418$$) {
                    break
                  }
                  $scale$$inline_418$$ = 100;
                  if($sawDigit$$inline_417$$) {
                    $pos$$6$$[0]++;
                    break
                  }
                }else {
                  if($ch$$inline_423$$ == $goog$i18n$NumberFormatSymbols$$.$PERMILL$.charAt(0)) {
                    if(1 != $scale$$inline_418$$) {
                      break
                    }
                    $scale$$inline_418$$ = 1E3;
                    if($sawDigit$$inline_417$$) {
                      $pos$$6$$[0]++;
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
    $ret$$4_text$$inline_413$$ = parseFloat($normalizedText$$inline_422$$) / $scale$$inline_418$$
  }
  if($gotPositive$$) {
    if($text$$10$$.indexOf(this.$positiveSuffix_$, $pos$$6$$[0]) != $pos$$6$$[0]) {
      return NaN
    }
    $pos$$6$$[0] += this.$positiveSuffix_$.length
  }else {
    if($gotNegative$$) {
      if($text$$10$$.indexOf(this.$negativeSuffix_$, $pos$$6$$[0]) != $pos$$6$$[0]) {
        return NaN
      }
      $pos$$6$$[0] += this.$negativeSuffix_$.length
    }
  }
  return $gotNegative$$ ? -$ret$$4_text$$inline_413$$ : $ret$$4_text$$inline_413$$
};
$goog$i18n$NumberFormat$$.prototype.$format$ = function $$goog$i18n$NumberFormat$$$$$format$$($number_number$$inline_427$$) {
  if(isNaN($number_number$$inline_427$$)) {
    return $goog$i18n$NumberFormatSymbols$$.$NAN$
  }
  var $parts$$3$$ = [], $isNegative$$ = 0 > $number_number$$inline_427$$ || 0 == $number_number$$inline_427$$ && 0 > 1 / $number_number$$inline_427$$;
  $parts$$3$$.push($isNegative$$ ? this.$negativePrefix_$ : this.$positivePrefix_$);
  if(isFinite($number_number$$inline_427$$)) {
    if($number_number$$inline_427$$ = $number_number$$inline_427$$ * ($isNegative$$ ? -1 : 1) * this.$multiplier_$, this.$useExponentialNotation_$) {
      if(0 == $number_number$$inline_427$$) {
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_427$$, this.$minimumIntegerDigits_$, $parts$$3$$), $JSCompiler_StaticMethods_addExponentPart_$$(this, 0, $parts$$3$$)
      }else {
        var $exponent$$inline_429$$ = Math.floor(Math.log($number_number$$inline_427$$) / Math.log(10));
        $number_number$$inline_427$$ /= Math.pow(10, $exponent$$inline_429$$);
        var $minIntDigits$$inline_430$$ = this.$minimumIntegerDigits_$;
        if(1 < this.$maximumIntegerDigits_$ && this.$maximumIntegerDigits_$ > this.$minimumIntegerDigits_$) {
          for(;0 != $exponent$$inline_429$$ % this.$maximumIntegerDigits_$;) {
            $number_number$$inline_427$$ *= 10, $exponent$$inline_429$$--
          }
          $minIntDigits$$inline_430$$ = 1
        }else {
          1 > this.$minimumIntegerDigits_$ ? ($exponent$$inline_429$$++, $number_number$$inline_427$$ /= 10) : ($exponent$$inline_429$$ -= this.$minimumIntegerDigits_$ - 1, $number_number$$inline_427$$ *= Math.pow(10, this.$minimumIntegerDigits_$ - 1))
        }
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_427$$, $minIntDigits$$inline_430$$, $parts$$3$$);
        $JSCompiler_StaticMethods_addExponentPart_$$(this, $exponent$$inline_429$$, $parts$$3$$)
      }
    }else {
      $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_427$$, this.$minimumIntegerDigits_$, $parts$$3$$)
    }
  }else {
    $parts$$3$$.push($goog$i18n$NumberFormatSymbols$$.$INFINITY$)
  }
  $parts$$3$$.push($isNegative$$ ? this.$negativeSuffix_$ : this.$positiveSuffix_$);
  return $parts$$3$$.join("")
};
function $JSCompiler_StaticMethods_subformatFixed_$$($JSCompiler_StaticMethods_subformatFixed_$self$$, $i$$120_intValue_number$$1$$, $fracPart_minIntDigits$$, $parts$$4$$) {
  var $fracLen_power$$ = Math.pow(10, $JSCompiler_StaticMethods_subformatFixed_$self$$.$maximumFractionDigits_$), $shiftedNumber_translatableInt_zeroCode$$ = Math.round($i$$120_intValue_number$$1$$ * $fracLen_power$$), $fracValue$$;
  isFinite($shiftedNumber_translatableInt_zeroCode$$) ? ($i$$120_intValue_number$$1$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ / $fracLen_power$$), $fracValue$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ - $i$$120_intValue_number$$1$$ * $fracLen_power$$)) : $fracValue$$ = 0;
  for(var $fractionPresent$$ = 0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ || 0 < $fracValue$$, $intPart$$ = "", $shiftedNumber_translatableInt_zeroCode$$ = $i$$120_intValue_number$$1$$;1E20 < $shiftedNumber_translatableInt_zeroCode$$;) {
    $intPart$$ = "0" + $intPart$$, $shiftedNumber_translatableInt_zeroCode$$ = Math.round($shiftedNumber_translatableInt_zeroCode$$ / 10)
  }
  var $intPart$$ = $shiftedNumber_translatableInt_zeroCode$$ + $intPart$$, $decimal$$1$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$1$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $shiftedNumber_translatableInt_zeroCode$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$.charCodeAt(0), $digitLen$$ = $intPart$$.length;
  if(0 < $i$$120_intValue_number$$1$$ || 0 < $fracPart_minIntDigits$$) {
    for($i$$120_intValue_number$$1$$ = $digitLen$$;$i$$120_intValue_number$$1$$ < $fracPart_minIntDigits$$;$i$$120_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
    }
    for($i$$120_intValue_number$$1$$ = 0;$i$$120_intValue_number$$1$$ < $digitLen$$;$i$$120_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $intPart$$.charAt($i$$120_intValue_number$$1$$))), 1 < $digitLen$$ - $i$$120_intValue_number$$1$$ && (0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$ && 1 == ($digitLen$$ - $i$$120_intValue_number$$1$$) % $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$) && $parts$$4$$.push($grouping$$1$$)
    }
  }else {
    $fractionPresent$$ || $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
  }
  ($JSCompiler_StaticMethods_subformatFixed_$self$$.$decimalSeparatorAlwaysShown_$ || $fractionPresent$$) && $parts$$4$$.push($decimal$$1$$);
  $fracPart_minIntDigits$$ = "" + ($fracValue$$ + $fracLen_power$$);
  for($fracLen_power$$ = $fracPart_minIntDigits$$.length;"0" == $fracPart_minIntDigits$$.charAt($fracLen_power$$ - 1) && $fracLen_power$$ > $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ + 1;) {
    $fracLen_power$$--
  }
  for($i$$120_intValue_number$$1$$ = 1;$i$$120_intValue_number$$1$$ < $fracLen_power$$;$i$$120_intValue_number$$1$$++) {
    $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $fracPart_minIntDigits$$.charAt($i$$120_intValue_number$$1$$)))
  }
}
function $JSCompiler_StaticMethods_addExponentPart_$$($JSCompiler_StaticMethods_addExponentPart_$self$$, $exponent_exponentDigits$$, $parts$$5$$) {
  $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$);
  0 > $exponent_exponentDigits$$ ? ($exponent_exponentDigits$$ = -$exponent_exponentDigits$$, $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$MINUS_SIGN$)) : $JSCompiler_StaticMethods_addExponentPart_$self$$.$useSignForPositiveExponent_$ && $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$PLUS_SIGN$);
  $exponent_exponentDigits$$ = "" + $exponent_exponentDigits$$;
  for(var $zeroChar$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$, $i$$121$$ = $exponent_exponentDigits$$.length;$i$$121$$ < $JSCompiler_StaticMethods_addExponentPart_$self$$.$minExponentDigits_$;$i$$121$$++) {
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
function $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_parseAffix_$self$$, $pattern$$4$$, $pos$$8$$) {
  for(var $affix$$ = "", $inQuote$$ = $JSCompiler_alias_FALSE$$, $len$$3$$ = $pattern$$4$$.length;$pos$$8$$[0] < $len$$3$$;$pos$$8$$[0]++) {
    var $ch$$5_currencyCode$$inline_432$$ = $pattern$$4$$.charAt($pos$$8$$[0]);
    if("'" == $ch$$5_currencyCode$$inline_432$$) {
      $pos$$8$$[0] + 1 < $len$$3$$ && "'" == $pattern$$4$$.charAt($pos$$8$$[0] + 1) ? ($pos$$8$$[0]++, $affix$$ += "'") : $inQuote$$ = !$inQuote$$
    }else {
      if($inQuote$$) {
        $affix$$ += $ch$$5_currencyCode$$inline_432$$
      }else {
        switch($ch$$5_currencyCode$$inline_432$$) {
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
            if($pos$$8$$[0] + 1 < $len$$3$$ && "\u00a4" == $pattern$$4$$.charAt($pos$$8$$[0] + 1)) {
              $pos$$8$$[0]++, $affix$$ += $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$
            }else {
              switch($JSCompiler_StaticMethods_parseAffix_$self$$.$currencyStyle_$) {
                case $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$:
                  $affix$$ += $goog$i18n$currency$CurrencyInfo$$[$JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$][1];
                  break;
                case 2:
                  var $ch$$5_currencyCode$$inline_432$$ = $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$, $info$$inline_433$$ = $goog$i18n$currency$CurrencyInfo$$[$ch$$5_currencyCode$$inline_432$$], $affix$$ = $affix$$ + ($ch$$5_currencyCode$$inline_432$$ == $info$$inline_433$$[1] ? $ch$$5_currencyCode$$inline_432$$ : $ch$$5_currencyCode$$inline_432$$ + " " + $info$$inline_433$$[1]);
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
            $affix$$ += $ch$$5_currencyCode$$inline_432$$
        }
      }
    }
  }
  return $affix$$
}
;
// Input 75
function $bitex$model$Model$$($element$$124$$, $opt_map$$1$$, $var_args$$76$$) {
  this.$element_$ = $element$$124$$;
  this.$map_$ = new $goog$structs$Map$$($opt_map$$1$$, $var_args$$76$$)
}
$goog$inherits$$($bitex$model$Model$$, $goog$events$EventTarget$$);
$bitex$model$Model$$.prototype.get = function $$bitex$model$Model$$$$get$($key$$74$$, $opt_val$$2$$) {
  return this.$map_$.get($key$$74$$, $opt_val$$2$$)
};
$bitex$model$Model$$.prototype.set = function $$bitex$model$Model$$$$set$($key$$75$$, $value$$107$$) {
  this.$map_$.set($key$$75$$, $value$$107$$);
  var $elements$$5$$ = $goog$dom$getElementsByClass$$("bitex-model", this.$element_$);
  $goog$array$forEach$$($elements$$5$$, function($el$$45$$) {
    if($el$$45$$.getAttribute("data-model-key") === $key$$75$$ && $goog$dom$getTextContent$$($el$$45$$) !== $value$$107$$) {
      $goog$dom$setTextContent$$($el$$45$$, $value$$107$$);
      var $blink_class$$1$$ = $el$$45$$.getAttribute("data-blink-class");
      if($blink_class$$1$$ != $JSCompiler_alias_NULL$$) {
        var $blink_delay$$ = $el$$45$$.getAttribute("data-blink-delay") || 700, $blink_delay$$ = parseInt($blink_delay$$, 10);
        $goog$dom$classes$add$$($el$$45$$, $blink_class$$1$$);
        $goog$Timer$callOnce$$(function() {
          $goog$dom$classes$remove$$($el$$45$$, $blink_class$$1$$)
        }, $blink_delay$$, this)
      }
    }
  });
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set" + $key$$75$$, $key$$75$$, $value$$107$$));
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set", $key$$75$$, $value$$107$$))
};
function $bitex$model$ModelEvent$$($type$$98$$, $key$$76$$, $data$$33$$) {
  $goog$events$Event$$.call(this, $type$$98$$);
  this.key = $key$$76$$;
  this.data = $data$$33$$
}
$goog$inherits$$($bitex$model$ModelEvent$$, $goog$events$Event$$);
// Input 76
function $bitex$ui$OrderBook$$($username$$, $side$$3$$, $qtyCurrencyDef$$, $priceCurrencyDef$$, $opt_blinkDelay$$2$$, $opt_domHelper$$12$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$12$$);
  this.$blink_delay_$ = $opt_blinkDelay$$2$$ || 700;
  this.$qtyCurrencyDef_$ = $qtyCurrencyDef$$;
  this.$priceCurrencyDef_$ = $priceCurrencyDef$$;
  this.$username_$ = $username$$;
  this.$side_$ = $side$$3$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$125$$) {
  this.$element_$ = $element$$125$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_438$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_438$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$125$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$66$$) {
  var $cxlEl_orderId$$1$$ = $e$$66$$.target;
  if("A" == $cxlEl_orderId$$1$$.tagName || "I" == $cxlEl_orderId$$1$$.tagName) {
    $cxlEl_orderId$$1$$ = $cxlEl_orderId$$1$$.getAttribute("data-order-id"), $cxlEl_orderId$$1$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$("cancel", $cxlEl_orderId$$1$$)), $e$$66$$.preventDefault(), $e$$66$$.stopPropagation())
  }
};
function $bitex$ui$OrderBookEvent$$($type$$99$$, $orderId$$2$$) {
  $goog$events$Event$$.call(this, $type$$99$$);
  this.$order_id$ = $orderId$$2$$
}
$goog$inherits$$($bitex$ui$OrderBookEvent$$, $goog$events$Event$$);
$bitex$ui$OrderBook$$.prototype.clear = function $$bitex$ui$OrderBook$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_deleteOrderThru$$($JSCompiler_StaticMethods_deleteOrderThru$self$$, $index$$65$$) {
  $JSCompiler_StaticMethods_deleteOrderThru$self$$.$getDomHelper$();
  for(var $child$$17$$;($child$$17$$ = $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.firstChild) && 0 < $index$$65$$;) {
    $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.removeChild($child$$17$$), $index$$65$$--
  }
}
function $JSCompiler_StaticMethods_deleteOrder$$($JSCompiler_StaticMethods_deleteOrder$self$$, $index$$66$$) {
  var $dom$$12$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $dom$$12$$.$getChildren$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$66$$];
  $dom$$12$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$67_trEl$$1$$, $qty$$1$$) {
  var $dom$$13$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $qty$$1$$ = (new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.$format$, $JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.code)).$format$($qty$$1$$);
  $index$$67_trEl$$1$$ = $dom$$13$$.$getChildren$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$67_trEl$$1$$];
  var $tdQtyEl$$ = $dom$$13$$.$getChildren$($index$$67_trEl$$1$$)[1];
  $dom$$13$$.$setTextContent$($tdQtyEl$$, $qty$$1$$);
  $goog$dom$classes$add$$($tdQtyEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, "warning")
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
$bitex$ui$OrderBook$$.prototype.$insertOrder$ = function $$bitex$ui$OrderBook$$$$$insertOrder$$($index$$68$$, $id$$10$$, $price$$2_priceEl$$, $qty$$2_qtyEl$$, $td_list_userNameEl_username$$1$$, $broker$$) {
  var $dom$$14$$ = this.$getDomHelper$(), $formatter$$3$$ = new $goog$i18n$NumberFormat$$(this.$qtyCurrencyDef_$.$format$, this.$qtyCurrencyDef_$.code);
  $qty$$2_qtyEl$$ = $formatter$$3$$.$format$($qty$$2_qtyEl$$);
  $formatter$$3$$ = new $goog$i18n$NumberFormat$$(this.$priceCurrencyDef_$.$format$, this.$priceCurrencyDef_$.code);
  $price$$2_priceEl$$ = $formatter$$3$$.$format$($price$$2_priceEl$$);
  $price$$2_priceEl$$ = $dom$$14$$.$createDom$("td", this.$getBaseCssClass$() + "-price", $price$$2_priceEl$$);
  $qty$$2_qtyEl$$ = $dom$$14$$.$createDom$("td", this.$getBaseCssClass$() + "-qty", $qty$$2_qtyEl$$);
  $td_list_userNameEl_username$$1$$ = $td_list_userNameEl_username$$1$$ === this.$username_$ || $broker$$ === this.$username_$ ? $dom$$14$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$14$$.$createDom$("a", {"class":"btn-cancel-order text-error", href:"", "data-order-id":$id$$10$$}, $dom$$14$$.$createDom$("i", {"class":"icon-remove", style:"line-height: 2px;", "data-order-id":$id$$10$$}, "  " + $td_list_userNameEl_username$$1$$))) : $dom$$14$$.$createDom$("td", this.$getBaseCssClass$() + "-username", 
  $td_list_userNameEl_username$$1$$);
  "0" == this.$side_$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price$$2_priceEl$$, this.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$1$$ = [$td_list_userNameEl_username$$1$$, $qty$$2_qtyEl$$, $price$$2_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-right"), $goog$dom$classes$add$$($price$$2_priceEl$$, this.$getBaseCssClass$() + "-left"), $td_list_userNameEl_username$$1$$ = 
  [$price$$2_priceEl$$, $qty$$2_qtyEl$$, $td_list_userNameEl_username$$1$$]);
  var $rowEl$$ = $dom$$14$$.$createDom$("tr", {"data-order-id":$id$$10$$, "class":this.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$1$$);
  $JSCompiler_StaticMethods_insertChildAt$$(this.$bodyEl_$, $rowEl$$, $index$$68$$);
  $goog$dom$classes$add$$($rowEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, "warning")
  }, this.$blink_delay_$, this)
};
// Input 77
function $bitex$api$BitEx$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($bitex$api$BitEx$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.$ws_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$connected_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$logged_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$30$$) {
  "WebSocket" in window ? this.$ws_$ = new WebSocket($url$$30$$) : "MozWebSocket" in window ? this.$ws_$ = new MozWebSocket($url$$30$$) : $JSCompiler_alias_THROW$$("WebSockets are not available");
  this.$ws_$.onopen = $goog$bind$$(this.$onOpen_$, this);
  this.$ws_$.onclose = $goog$bind$$(this.$onClose_$, this);
  this.$ws_$.onmessage = $goog$bind$$(this.$onMessage_$, this);
  this.$ws_$.onerror = $goog$bind$$(this.$onError_$, this)
};
$JSCompiler_prototypeAlias$$.$isConnected$ = $JSCompiler_get$$("$connected_$");
$JSCompiler_prototypeAlias$$.$isLogged$ = $JSCompiler_get$$("$logged_$");
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
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$67_msg$$15$$) {
  $e$$67_msg$$15$$ = JSON.parse($e$$67_msg$$15$$.data);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$67_msg$$15$$));
  switch($e$$67_msg$$15$$.MsgType) {
    case "ERROR":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", $e$$67_msg$$15$$));
      break;
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $e$$67_msg$$15$$));
      break;
    case "BF":
      1 == $e$$67_msg$$15$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $e$$67_msg$$15$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $e$$67_msg$$15$$)));
      break;
    case "y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("security_list", $e$$67_msg$$15$$));
      break;
    case "U13":
      1 == $e$$67_msg$$15$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $e$$67_msg$$15$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $e$$67_msg$$15$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("generate_boleto_response", $e$$67_msg$$15$$));
      break;
    case "U7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("crypto_coin_withdraw_response", $e$$67_msg$$15$$));
      break;
    case "U9":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("brl_bank_transfer_withdraw_response", $e$$67_msg$$15$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $e$$67_msg$$15$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("order_list_response", $e$$67_msg$$15$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $e$$67_msg$$15$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("boleto_options_response", $e$$67_msg$$15$$));
      break;
    case "U27":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_list_response", $e$$67_msg$$15$$));
      break;
    case "U29":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("broker_list", $e$$67_msg$$15$$));
      break;
    case "B3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_list", $e$$67_msg$$15$$));
      break;
    case "B5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_detail", $e$$67_msg$$15$$));
      break;
    case "W":
      if(1 != $e$$67_msg$$15$$.MarketDepth) {
        var $has_cleared_trade$$ = $JSCompiler_alias_FALSE$$, $has_cleared_book$$ = $JSCompiler_alias_FALSE$$, $x$$67$$;
        for($x$$67$$ in $e$$67_msg$$15$$.MDFullGrp) {
          var $entry$$ = $e$$67_msg$$15$$.MDFullGrp[$x$$67$$];
          switch($entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              $has_cleared_book$$ || ($has_cleared_book$$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_clear")));
              $entry$$.Symbol = $e$$67_msg$$15$$.Symbol;
              this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_new_order", $entry$$));
              break;
            case "2":
              $has_cleared_trade$$ || ($has_cleared_trade$$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear")));
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $e$$67_msg$$15$$));
      break;
    case "X":
      if("3" == $e$$67_msg$$15$$.MDBkTyp) {
        for($x$$67$$ in $e$$67_msg$$15$$.MDIncGrp) {
          switch($entry$$ = $e$$67_msg$$15$$.MDIncGrp[$x$$67$$], $entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              switch($entry$$.MDUpdateAction) {
                case "0":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_new_order", $entry$$));
                  break;
                case "1":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_update_order", $entry$$));
                  break;
                case "2":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_delete_order", $entry$$));
                  break;
                case "3":
                  this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_delete_orders_thru", $entry$$))
              }
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$));
              break;
            case "4":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("md_status", $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $e$$67_msg$$15$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $e$$67_msg$$15$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $e$$67_msg$$15$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$;
  this.$ws_$.close();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($msg$$16_username$$2$$, $password$$, $opt_second_factor$$) {
  $msg$$16_username$$2$$ = {MsgType:"BE", UserReqID:"1", Username:$msg$$16_username$$2$$, Password:$password$$, UserReqTyp:"1"};
  $opt_second_factor$$ != $JSCompiler_alias_NULL$$ && ($msg$$16_username$$2$$.SecondFactor = $opt_second_factor$$);
  this.$ws_$.send(JSON.stringify($msg$$16_username$$2$$))
};
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$15_msg$$17$$, $opt_secret$$, $opt_code$$) {
  $enable$$15_msg$$17$$ = {MsgType:"U16", Enable:$enable$$15_msg$$17$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_secret$$) && ($enable$$15_msg$$17$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_code$$) && ($enable$$15_msg$$17$$.Code = $opt_code$$);
  this.$ws_$.send(JSON.stringify($enable$$15_msg$$17$$))
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U10", Email:$email$$}))
};
$JSCompiler_prototypeAlias$$.$requestBalances$ = function $$JSCompiler_prototypeAlias$$$$requestBalances$$() {
  this.$ws_$.send(JSON.stringify({MsgType:"U2", BalanceReqID:parseInt(1E6 * Math.random(), 10)}))
};
$JSCompiler_prototypeAlias$$.$withdrawCryptoCoin$ = function $$JSCompiler_prototypeAlias$$$$withdrawCryptoCoin$$($amount$$3$$, $address$$, $currency$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U6", WithdrawReqID:parseInt(1E6 * Math.random(), 10), Currency:$currency$$, Amount:parseInt(1E8 * $amount$$3$$, 10), Wallet:$address$$}))
};
$JSCompiler_prototypeAlias$$.$confirmWithdraw$ = function $$JSCompiler_prototypeAlias$$$$confirmWithdraw$$($confirmation_token$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U24", WithdrawReqID:parseInt(1E6 * Math.random(), 10), ConfirmationToken:$confirmation_token$$}))
};
$JSCompiler_prototypeAlias$$.$requestWithdrawList$ = function $$JSCompiler_prototypeAlias$$$$requestWithdrawList$$($opt_requestId_requestId$$, $opt_page$$, $opt_limit$$1$$, $opt_status$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"U26", WithdrawListReqID:$opt_requestId_requestId$$, Page:$opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["1", "2"]}));
  return $opt_requestId_requestId$$
};
$JSCompiler_prototypeAlias$$.$requestBrokerList$ = function $$JSCompiler_prototypeAlias$$$$requestBrokerList$$($opt_requestId$$1_requestId$$1$$, $opt_country$$, $msg$$24_opt_page$$1$$, $opt_limit$$2$$, $opt_status$$1$$) {
  $opt_requestId$$1_requestId$$1$$ = $opt_requestId$$1_requestId$$1$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$24_opt_page$$1$$ = {MsgType:"U28", BrokerListReqID:$opt_requestId$$1_requestId$$1$$, Page:$msg$$24_opt_page$$1$$ || 0, PageSize:$opt_limit$$2$$ || 100, StatusList:$opt_status$$1$$ || ["1"]};
  $opt_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$24_opt_page$$1$$.Country = $opt_country$$);
  this.$ws_$.send(JSON.stringify($msg$$24_opt_page$$1$$));
  return $opt_requestId$$1_requestId$$1$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerList$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerList$$($opt_requestId$$2_requestId$$2$$, $opt_country$$1$$, $opt_state$$1$$, $msg$$25_opt_page$$2$$, $opt_limit$$3$$, $opt_status$$2$$, $opt_sort_column$$, $opt_sort_direction$$) {
  $opt_requestId$$2_requestId$$2$$ = $opt_requestId$$2_requestId$$2$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$25_opt_page$$2$$ = {MsgType:"B2", CustomerListReqID:$opt_requestId$$2_requestId$$2$$, Page:$msg$$25_opt_page$$2$$ || 0, PageSize:$opt_limit$$3$$ || 100, StatusList:$opt_status$$2$$ || [0, 1]};
  $opt_country$$1$$ != $JSCompiler_alias_NULL$$ && ($msg$$25_opt_page$$2$$.Country = $opt_country$$1$$);
  $opt_state$$1$$ != $JSCompiler_alias_NULL$$ && ($msg$$25_opt_page$$2$$.State = $opt_state$$1$$);
  $opt_sort_column$$ != $JSCompiler_alias_NULL$$ && ($msg$$25_opt_page$$2$$.Sort = $opt_sort_column$$);
  $opt_sort_direction$$ != $JSCompiler_alias_NULL$$ && ($msg$$25_opt_page$$2$$.SortOrder = $opt_sort_direction$$);
  this.$ws_$.send(JSON.stringify($msg$$25_opt_page$$2$$));
  return $opt_requestId$$2_requestId$$2$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerDetails$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerDetails$$($clientId$$) {
  var $requestId$$3$$ = parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"B4", CustomerReqID:$requestId$$3$$, ClientID:$clientId$$}));
  return $requestId$$3$$
};
$JSCompiler_prototypeAlias$$.$resetPassword$ = function $$JSCompiler_prototypeAlias$$$$resetPassword$$($token$$4$$, $new_password$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U12", Token:$token$$4$$, NewPassword:$new_password$$}))
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$1$$, $new_password$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"BE", UserReqID:"3", Password:$password$$1$$, NewPassword:$new_password$$1$$}))
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$, $entries$$) {
  var $reqId$$4$$ = parseInt(1E6 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$reqId$$4$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$}));
  return $reqId$$4$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$market_data_id$$, MarketDepth:0, SubscriptionRequestType:"2"}))
};
$JSCompiler_prototypeAlias$$.$requestSecurityList$ = function $$JSCompiler_prototypeAlias$$$$requestSecurityList$$($opt_requestId$$3$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"x", SecurityReqID:$opt_requestId$$3$$ || parseInt(1E7 * Math.random(), 10), SecurityListRequestType:0, SecurityRequestResult:0}))
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$3$$, $password$$2$$, $email$$1$$, $state$$18$$, $country_code$$, $broker$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U0", Username:$username$$3$$, Password:$password$$2$$, Email:$email$$1$$, State:$state$$18$$, CountryCode:$country_code$$, BrokerID:$broker$$1$$}))
};
$JSCompiler_prototypeAlias$$.$requestOrderList$ = function $$JSCompiler_prototypeAlias$$$$requestOrderList$$($opt_requestId$$4_requestId$$5$$, $opt_page$$3$$, $opt_limit$$4$$, $opt_status$$3$$) {
  $opt_requestId$$4_requestId$$5$$ = $opt_requestId$$4_requestId$$5$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"U4", OrdersReqID:$opt_requestId$$4_requestId$$5$$, Page:$opt_page$$3$$ || 0, PageSize:$opt_limit$$4$$ || 100, StatusList:$opt_status$$3$$ || ["0", "1"]}));
  return $opt_requestId$$4_requestId$$5$$
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $msg$$36_symbol$$2$$, $qty$$3$$, $price$$3$$, $side$$4$$, $opt_client_id$$, $clientOrderId$$1_opt_clientOrderId$$) {
  $clientOrderId$$1_opt_clientOrderId$$ = $clientOrderId$$1_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$3$$ = parseInt(1E8 * $price$$3$$, 10);
  $qty$$3$$ = parseInt(1E8 * $qty$$3$$, 10);
  $msg$$36_symbol$$2$$ = {MsgType:"D", ClOrdID:"" + $clientOrderId$$1_opt_clientOrderId$$, Symbol:$msg$$36_symbol$$2$$, Side:$side$$4$$, OrdType:"2", Price:$price$$3$$, OrderQty:$qty$$3$$};
  $opt_client_id$$ != $JSCompiler_alias_NULL$$ && ($msg$$36_symbol$$2$$.ClientID = $opt_client_id$$);
  $JSCompiler_StaticMethods_sendOrder_$self$$.$ws_$.send(JSON.stringify($msg$$36_symbol$$2$$));
  return $clientOrderId$$1_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$37$$ = {MsgType:"F"};
  $opt_OrderId$$ ? $msg$$37$$.OrderID = $opt_OrderId$$ : $opt_clientOrderId$$1$$ && ($msg$$37$$.OrigClOrdID = $opt_clientOrderId$$1$$);
  this.$ws_$.send(JSON.stringify($msg$$37$$))
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$38$$) {
  this.$ws_$.send(JSON.stringify($msg$$38$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$3$$, $qty$$4$$, $price$$4$$, $opt_client_id$$1$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$3$$, $qty$$4$$, $price$$4$$, "1", $opt_client_id$$1$$, $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$4$$, $qty$$5$$, $price$$5$$, $opt_client_id$$2$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$4$$, $qty$$5$$, $price$$5$$, "2", $opt_client_id$$2$$, $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.$ws_$.send(JSON.stringify({MsgType:"1", TestReqID:Math.random()}))
};
function $bitex$api$BitExEvent$$($type$$100$$, $opt_data$$2$$) {
  $goog$events$Event$$.call(this, $type$$100$$);
  this.data = $opt_data$$2$$
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
$goog$exportProperty$$("withdrawCryptoCoin", $bitex$api$BitEx$$.prototype.$withdrawCryptoCoin$);
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
// Input 78
// Input 79
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
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enabled$$1$$) {
  this.$enabled_$ = $enabled$$1$$
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
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$54_e$$68_element$$inline_456$$) {
  var $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ = "mousedown" == $JSCompiler_temp$$54_e$$68_element$$inline_456$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$54_e$$68_element$$inline_456$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$54_e$$68_element$$inline_456$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$54_e$$68_element$$inline_456$$.clientX, $JSCompiler_temp$$54_e$$68_element$$inline_456$$.clientY, $JSCompiler_temp$$54_e$$68_element$$inline_456$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$54_e$$68_element$$inline_456$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$54_e$$68_element$$inline_456$$.preventDefault()
    }
    var $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ = this.$document_$, $bestParent$$inline_458_docEl$$inline_453$$ = $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$.documentElement, $borderWidths$$inline_459_useCapture$$inline_454$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_459_useCapture$$inline_454$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_459_useCapture$$inline_454$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_458_docEl$$inline_453$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_458_docEl$$inline_453$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ ? $goog$dom$getWindow_$$($doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_459_useCapture$$inline_454$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.clientY;
    this.screenX = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.screenX;
    this.screenY = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$54_e$$68_element$$inline_456$$ = this.target, $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.offsetLeft, $bestParent$$inline_458_docEl$$inline_453$$ = $JSCompiler_temp$$54_e$$68_element$$inline_456$$.offsetParent, !$bestParent$$inline_458_docEl$$inline_453$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$54_e$$68_element$$inline_456$$, "position") && ($bestParent$$inline_458_docEl$$inline_453$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$54_e$$68_element$$inline_456$$).documentElement), $bestParent$$inline_458_docEl$$inline_453$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_459_useCapture$$inline_454$$ = $goog$style$getBorderBox$$($bestParent$$inline_458_docEl$$inline_453$$), $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ += $borderWidths$$inline_459_useCapture$$inline_454$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_459_useCapture$$inline_454$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_458_docEl$$inline_453$$), $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ -= $borderWidths$$inline_459_useCapture$$inline_454$$.left), $JSCompiler_temp$$54_e$$68_element$$inline_456$$ = $goog$style$isRightToLeft$$($bestParent$$inline_458_docEl$$inline_453$$) ? $bestParent$$inline_458_docEl$$inline_453$$.clientWidth - ($doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$ + $JSCompiler_temp$$54_e$$68_element$$inline_456$$.offsetWidth) : 
    $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$) : $JSCompiler_temp$$54_e$$68_element$$inline_456$$ = $doc$$inline_452_isMouseDown_offsetLeftForReal$$inline_457$$) : $JSCompiler_temp$$54_e$$68_element$$inline_456$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$54_e$$68_element$$inline_456$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$70$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$70$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$68$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$39$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$70$$.clientX, $e$$70$$.clientY, $e$$70$$, $x$$68$$, $y$$39$$, $opt_dragCanceled$$ || "touchcancel" == $e$$70$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$70$$.type || "touchcancel" == $e$$70$$.type) && $e$$70$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$72$$) {
  var $type$$101$$ = $e$$72$$.type;
  "touchstart" == $type$$101$$ || "touchmove" == $type$$101$$ ? $e$$72$$.init($e$$72$$.$event_$.targetTouches[0], $e$$72$$.currentTarget) : ("touchend" == $type$$101$$ || "touchcancel" == $type$$101$$) && $e$$72$$.init($e$$72$$.$event_$.changedTouches[0], $e$$72$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$73$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$73$$);
    var $dx$$7_x$$69$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$73$$.clientX - this.clientX), $dy$$7_pos$$10_y$$40$$ = $e$$73$$.clientY - this.clientY;
    this.clientX = $e$$73$$.clientX;
    this.clientY = $e$$73$$.clientY;
    this.screenX = $e$$73$$.screenX;
    this.screenY = $e$$73$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$73$$.clientX, $e$$73$$.clientY, $e$$73$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$73$$);
          return
        }
      }
    }
    $dy$$7_pos$$10_y$$40$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$69$$, $dy$$7_pos$$10_y$$40$$);
    $dx$$7_x$$69$$ = $dy$$7_pos$$10_y$$40$$.x;
    $dy$$7_pos$$10_y$$40$$ = $dy$$7_pos$$10_y$$40$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$73$$.clientX, $e$$73$$.clientY, $e$$73$$, $dx$$7_x$$69$$, $dy$$7_pos$$10_y$$40$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$73$$, $dx$$7_x$$69$$, $dy$$7_pos$$10_y$$40$$), $e$$73$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $dx$$8_x$$70$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$document_$));
  $dx$$8_x$$70$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$ += $dx$$8_x$$70$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$70$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$70$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$74$$) {
  var $pos$$11$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$74$$.clientX = this.clientX;
  $e$$74$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$74$$, $pos$$11$$.x, $pos$$11$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$75$$, $x$$71$$, $y$$42$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$71$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$71$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$42$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$75$$.clientX, $e$$75$$.clientY, $e$$75$$, $x$$71$$, $y$$42$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$72$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$72$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$43$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$43$$))
}
function $goog$fx$DragEvent$$($type$$102$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$1$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$102$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$1$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
// Input 80
// Input 81
// Input 82
function $goog$events$FocusHandler$$($element$$130_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$130_typeOut$$;
  $element$$130_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$130_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$81$$) {
  var $event$$4$$ = new $goog$events$BrowserEvent$$($e$$81$$.$event_$);
  $event$$4$$.type = "focusin" == $e$$81$$.type || "focus" == $e$$81$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$4$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
// Input 83
// Input 84
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$13$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$13$$);
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
  var $element$$131$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$131$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$131$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$131$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$40$$;
    $JSCompiler_inline_result$$40$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$40$$;
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$132$$) {
  return!!$element$$132$$ && "DIV" == $element$$132$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$133$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$133$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$ = this.$getElement$();
    $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode && $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$)
  }
  $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$ = this.$getElement$();
  $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode && $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$ = this.$getElement$();
  $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode && $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_474_refNode$$inline_693_refNode$$inline_696$$.nextSibling);
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
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$) {
  if($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_663_win$$inline_658$$ = (($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_669_popupSize$$inline_662$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_663_win$$inline_658$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_663_win$$inline_658$$ || window);
        $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = Math.max($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ + $viewSize$$inline_663_win$$inline_658$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_669_popupSize$$inline_662$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ + $viewSize$$inline_663_win$$inline_658$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_669_popupSize$$inline_662$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$, $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$, $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$);
        $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_669_popupSize$$inline_662$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$607_JSCompiler_temp_const$$610_doc$$inline_657_left$$inline_664_visible$$3_x$$inline_659$$($JSCompiler_StaticMethods_getWindow$self$$inline_667_JSCompiler_temp_const$$609_scroll$$inline_661_top$$inline_665_y$$inline_660$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_669_popupSize$$inline_662$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
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
  var $doc$$39_h$$6$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$(($doc$$39_h$$6$$ ? $goog$dom$getWindow_$$($doc$$39_h$$6$$) : window) || window || window), $w$$7$$ = Math.max($viewSize$$.width, Math.max($doc$$39_h$$6$$.body.scrollWidth, $doc$$39_h$$6$$.documentElement.scrollWidth)), $doc$$39_h$$6$$ = Math.max($viewSize$$.height, Math.max($doc$$39_h$$6$$.body.scrollHeight, $doc$$39_h$$6$$.documentElement.scrollHeight));
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$7$$, $doc$$39_h$$6$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$7$$, $doc$$39_h$$6$$))
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$83$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$83$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$84$$) {
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
// Input 85
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$14$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$14$$);
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
function $JSCompiler_StaticMethods_setTitle$$($JSCompiler_StaticMethods_setTitle$self$$, $title$$7$$) {
  $JSCompiler_StaticMethods_setTitle$self$$.$title_$ = $title$$7$$;
  $JSCompiler_StaticMethods_setTitle$self$$.$titleTextEl_$ && $goog$dom$setTextContent$$($JSCompiler_StaticMethods_setTitle$self$$.$titleTextEl_$, $title$$7$$)
}
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
    var $element$$inline_484$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_485$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_484$$, $className$$inline_485$$) : $goog$dom$classes$remove$$($element$$inline_484$$, $className$$inline_485$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$ = this.$getElement$(), $dom$$16$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$16$$.$createDom$("div", {className:this.$class_$ + "-title", id:this.$getId$()}, this.$titleTextEl_$ = $dom$$16$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$16$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$, this.$titleEl_$, this.$contentEl_$ = $dom$$16$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$16$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_488_element$$134$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = this.$getId$())) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:this.$getId$()}), $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_491_dialogElement_element$$135$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_496_element$$136$$ = this.$getElement$();
  $dom$$inline_496_element$$136$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_496_element$$136$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_496_element$$136$$ = this.$getDomHelper$(), $bg$$inline_497$$ = this.$getBackgroundElement$();
    $dom$$inline_496_element$$136$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_496_element$$136$$.removeNode($bg$$inline_497$$)
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
      for(var $doc$$41$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$122$$ = 0, $button$$10$$;$button$$10$$ = $buttons$$[$i$$122$$];$i$$122$$++) {
        if($button$$10$$.name == $defaultButton$$ && !$button$$10$$.disabled) {
          try {
            if($goog$userAgent$WEBKIT$$ || $goog$userAgent$OPERA$$) {
              var $temp$$ = $doc$$41$$.createElement("input");
              $temp$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.$getElement$().appendChild($temp$$);
              $temp$$.focus();
              this.$getElement$().removeChild($temp$$)
            }
            $button$$10$$.focus()
          }catch($e$$85$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$42_h$$7$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_501_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$42_h$$7$$ ? $goog$dom$getWindow_$$($doc$$42_h$$7$$) : window) || window || window), $w$$8$$ = Math.max($doc$$42_h$$7$$.body.scrollWidth, $limits$$inline_501_viewSize$$2$$.width), $doc$$42_h$$7$$ = Math.max($doc$$42_h$$7$$.body.scrollHeight, $limits$$inline_501_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_501_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_501_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_501_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_501_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$8$$ - $dialogSize$$.width, $doc$$42_h$$7$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$2$$ = this.$buttons_$, $key$$77$$ = $bs_caption$$2$$ && $bs_caption$$2$$.$cancelButton_$;
    $key$$77$$ ? ($bs_caption$$2$$ = $bs_caption$$2$$.get($key$$77$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$77$$, $bs_caption$$2$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
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
      var $JSCompiler_StaticMethods_attachToElement$self$$inline_506$$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_506$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_506$$.render()
    }else {
      $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$.innerHTML = ""
    }
    $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$)
  }
}
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$11_e$$88_el$$inline_511_key$$78$$) {
  a: {
    for($button$$11_e$$88_el$$inline_511_key$$78$$ = $button$$11_e$$88_el$$inline_511_key$$78$$.target;$button$$11_e$$88_el$$inline_511_key$$78$$ != $JSCompiler_alias_NULL$$ && $button$$11_e$$88_el$$inline_511_key$$78$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$11_e$$88_el$$inline_511_key$$78$$.tagName) {
        break a
      }
      $button$$11_e$$88_el$$inline_511_key$$78$$ = $button$$11_e$$88_el$$inline_511_key$$78$$.parentNode
    }
    $button$$11_e$$88_el$$inline_511_key$$78$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$11_e$$88_el$$inline_511_key$$78$$ && !$button$$11_e$$88_el$$inline_511_key$$78$$.disabled) {
    $button$$11_e$$88_el$$inline_511_key$$78$$ = $button$$11_e$$88_el$$inline_511_key$$78$$.name;
    var $caption$$3$$ = this.$buttons_$.get($button$$11_e$$88_el$$inline_511_key$$78$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$11_e$$88_el$$inline_511_key$$78$$, $caption$$3$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$89$$) {
  var $caption$$4_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$57$$ = $e$$89$$.target;
  if("keydown" == $e$$89$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$89$$.keyCode) {
      var $cancel_key$$79$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$57$$ = "SELECT" == $isSpecialFormElement_target$$57$$.tagName && !$isSpecialFormElement_target$$57$$.disabled;
      $cancel_key$$79$$ && !$isSpecialFormElement_target$$57$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = $buttonSet$$.get($cancel_key$$79$$), $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$79$$, $caption$$4_close$$))) : $isSpecialFormElement_target$$57$$ || ($caption$$4_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$89$$.keyCode && $e$$89$$.shiftKey && $isSpecialFormElement_target$$57$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_514$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$89$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$57$$.tagName) {
        $cancel_key$$79$$ = $isSpecialFormElement_target$$57$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$;
          if($JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_519$$ = 0, $nextButton$$inline_520$$;$nextButton$$inline_520$$ = $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$[$i$$inline_519$$];$i$$inline_519$$++) {
                if($nextButton$$inline_520$$.name == $defaultKey$$ || $nextButton$$inline_520$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$ = $nextButton$$inline_520$$;
                  break a
                }
              }
              $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$57$$ = ("TEXTAREA" == $isSpecialFormElement_target$$57$$.tagName || "SELECT" == $isSpecialFormElement_target$$57$$.tagName || "A" == $isSpecialFormElement_target$$57$$.tagName) && !$isSpecialFormElement_target$$57$$.disabled;
          $JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$ && (!$JSCompiler_temp$$35_buttons$$inline_518_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$57$$) && ($cancel_key$$79$$ = $defaultKey$$)
        }
      }
      $cancel_key$$79$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$79$$, String($buttonSet$$.get($cancel_key$$79$$)))))
    }
  }
  if($caption$$4_close$$ || $hasHandler$$) {
    $e$$89$$.stopPropagation(), $e$$89$$.preventDefault()
  }
  $caption$$4_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$80$$, $caption$$5$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$80$$;
  this.caption = $caption$$5$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$15$$) {
  this.$dom_$ = $opt_domHelper$$15$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$81$$, $caption$$6$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$81$$, $caption$$6$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$81$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$81$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$12$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$12$$.key, $button$$12$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$2$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$7$$, $key$$82$$) {
      var $button$$13$$ = $domHelper$$2$$.$createDom$("button", {name:$key$$82$$}, $caption$$7$$);
      $key$$82$$ == this.$defaultButton_$ && ($button$$13$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$13$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$138$$) {
  if($buttons$$2_element$$138$$ && 1 == $buttons$$2_element$$138$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$138$$;
    $buttons$$2_element$$138$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$123$$ = 0, $button$$14$$, $key$$83$$, $caption$$8$$;$button$$14$$ = $buttons$$2_element$$138$$[$i$$123$$];$i$$123$$++) {
      if($key$$83$$ = $button$$14$$.name || $button$$14$$.id, $caption$$8$$ = $goog$dom$getTextContent$$($button$$14$$) || $button$$14$$.value, $key$$83$$) {
        var $isDefault$$ = 0 == $i$$123$$;
        this.set($key$$83$$, $caption$$8$$, $isDefault$$, $button$$14$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$14$$, this.$class_$ + "-default")
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
var $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$ = "cancel", $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$ = {key:"ok", caption:"OK"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$ = {key:$goog$ui$Dialog$DefaultButtonKeys$CANCEL$$, caption:"Cancel"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$ = {key:"yes", caption:"Yes"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$ = {key:"no", caption:"No"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$ = {key:"save", caption:"Save"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$ = 
{key:"continue", caption:"Continue"};
function $goog$ui$Dialog$ButtonSet$createOk$$() {
  return $JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$)
}
function $goog$ui$Dialog$ButtonSet$createOkCancel$$() {
  return $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
"undefined" != typeof document && ($goog$ui$Dialog$ButtonSet$createOk$$(), $goog$ui$Dialog$ButtonSet$createOkCancel$$(), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, 
$goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, 
$JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$));
// Input 86
function $bootstrap$Dialog$$() {
  $goog$ui$Dialog$$.call(this, "modal")
}
$goog$inherits$$($bootstrap$Dialog$$, $goog$ui$Dialog$$);
$bootstrap$Dialog$$.prototype.$createDom$ = function $$bootstrap$Dialog$$$$$createDom$$() {
  $goog$ui$ModalPopup$$.prototype.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$ = this.$getElement$(), $dom$$17_i$$126$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$17_i$$126$$.$createDom$("div", {className:"modal-header", id:this.$getId$()}, this.$titleCloseEl_$ = $dom$$17_i$$126$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$17_i$$126$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$, this.$titleEl_$, this.$contentEl_$ = $dom$$17_i$$126$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$17_i$$126$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$17_i$$126$$ = 0;$dom$$17_i$$126$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$.length;$dom$$17_i$$126$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_523_buttons$$4_element$$139$$[$dom$$17_i$$126$$], "btn")
    }
  }
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$bootstrap$Dialog$$.prototype.$setBackgroundElementOpacity$ = function $$bootstrap$Dialog$$$$$setBackgroundElementOpacity$$($bgEl$$1_opacity$$2$$) {
  this.$backgroundElementOpacity_$ = $bgEl$$1_opacity$$2$$;
  this.$getElement$() && ($bgEl$$1_opacity$$2$$ = this.$getBackgroundElement$(), $goog$dom$classes$add$$($bgEl$$1_opacity$$2$$, "modal-dialog-bg"), $bgEl$$1_opacity$$2$$ && $goog$style$setOpacity$$($bgEl$$1_opacity$$2$$, this.$backgroundElementOpacity_$))
};
// Input 87
// Input 88
function $goog$history$Event$$($token$$5$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$5$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 89
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
  $enable$$17$$ != this.$enabled_$ && (this.$enabled_$ = $enable$$17$$) && this.dispatchEvent(new $goog$history$Event$$($JSCompiler_StaticMethods_getToken$$(this), $JSCompiler_alias_FALSE$$))
};
function $JSCompiler_StaticMethods_getToken$$($JSCompiler_StaticMethods_getToken$self_loc$$) {
  if($JSCompiler_StaticMethods_getToken$self_loc$$.$useFragment_$) {
    $JSCompiler_StaticMethods_getToken$self_loc$$ = $JSCompiler_StaticMethods_getToken$self_loc$$.$window_$.location.href;
    var $index$$69$$ = $JSCompiler_StaticMethods_getToken$self_loc$$.indexOf("#");
    return 0 > $index$$69$$ ? "" : $JSCompiler_StaticMethods_getToken$self_loc$$.substring($index$$69$$ + 1)
  }
  return $JSCompiler_StaticMethods_getToken$self_loc$$.$transformer_$ ? $JSCompiler_StaticMethods_getToken$self_loc$$.$transformer_$.$retrieveToken$($JSCompiler_StaticMethods_getToken$self_loc$$.$pathPrefix_$, $JSCompiler_StaticMethods_getToken$self_loc$$.$window_$.location) : $JSCompiler_StaticMethods_getToken$self_loc$$.$window_$.location.pathname.substr($JSCompiler_StaticMethods_getToken$self_loc$$.$pathPrefix_$.length)
}
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$unlisten$$(this.$window_$, "popstate", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this);
  this.$useFragment_$ && $goog$events$unlisten$$(this.$window_$, "hashchange", this.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, this)
};
$JSCompiler_prototypeAlias$$.$onHistoryEvent_$ = function $$JSCompiler_prototypeAlias$$$$onHistoryEvent_$$() {
  this.$enabled_$ && this.dispatchEvent(new $goog$history$Event$$($JSCompiler_StaticMethods_getToken$$(this), $JSCompiler_alias_TRUE$$))
};
// Input 90
function $bitex$app$UrlRouter$$($baseUrl$$, $defaultView$$) {
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_527$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$base_url_$ = $baseUrl$$;
  this.$default_view_$ = $defaultView$$;
  $JSCompiler_StaticMethods_setViewInternal$$(this, $defaultView$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($bitex$app$UrlRouter$$, $goog$events$EventTarget$$);
function $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setViewInternal$self$$, $view_name$$) {
  var $JSCompiler_inline_result$$38_re$$inline_532$$;
  $JSCompiler_inline_result$$38_re$$inline_532$$ = RegExp($goog$string$regExpEscape$$($JSCompiler_StaticMethods_setViewInternal$self$$.$base_url_$), "");
  $JSCompiler_inline_result$$38_re$$inline_532$$ = $view_name$$.replace($JSCompiler_inline_result$$38_re$$inline_532$$, "");
  $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_inline_result$$38_re$$inline_532$$;
  "" === $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ && ($JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_StaticMethods_setViewInternal$self$$.$default_view_$)
}
function $JSCompiler_StaticMethods_setView$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$) {
  if($JSCompiler_StaticMethods_setView$self$$.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $view_name$$1$$))) {
    $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$);
    var $JSCompiler_StaticMethods_setToken$self$$inline_534$$ = $JSCompiler_StaticMethods_setView$self$$.$history_$, $token$$inline_535$$ = $JSCompiler_StaticMethods_setView$self$$.$base_url_$ + $view_name$$1$$;
    $token$$inline_535$$ != $JSCompiler_StaticMethods_getToken$$($JSCompiler_StaticMethods_setToken$self$$inline_534$$) && ($JSCompiler_StaticMethods_setToken$self$$inline_534$$.$window_$.history.pushState($JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$window_$.document.title || "", $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$useFragment_$ ? "#" + $token$$inline_535$$ : $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$transformer_$ ? $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$transformer_$.$createUrl$($token$$inline_535$$, 
    $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$pathPrefix_$, $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$window_$.location) : $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$pathPrefix_$ + $token$$inline_535$$ + $JSCompiler_StaticMethods_setToken$self$$inline_534$$.$window_$.location.search), $JSCompiler_StaticMethods_setToken$self$$inline_534$$.dispatchEvent(new $goog$history$Event$$($token$$inline_535$$, $JSCompiler_alias_FALSE$$)))
  }
}
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$91_view_name$$2$$) {
  $e$$91_view_name$$2$$.$isNavigation$ && ($e$$91_view_name$$2$$ = $e$$91_view_name$$2$$.$token$, this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $e$$91_view_name$$2$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $e$$91_view_name$$2$$))
};
function $bitex$app$UrlRouterEvent$$($type$$104$$, $view$$3$$) {
  $goog$events$Event$$.call(this, $type$$104$$);
  this.view = $view$$3$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 91
// Input 92
// Input 93
// Input 94
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$(8);
// Input 95
// Input 96
// Input 97
var $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
function $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$($ch$$10$$) {
  return $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$[$ch$$10$$]
}
var $soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$ = /[\x00\x22\x26\x27\x3c\x3e]/g;
// Input 98
// Input 99
$goog$exportPath_$$("bitex.app.satoshi_square", function($url$$31$$) {
  function $login$$($username$$7$$, $password$$5$$, $opt_second_factor$$1$$) {
    $username$$7$$ = $goog$string$trim$$($username$$7$$);
    var $second_factor$$1$$ = $goog$string$trim$$($opt_second_factor$$1$$ || "");
    if($goog$string$isEmpty$$($username$$7$$)) {
      alert("Invalid username")
    }else {
      if($goog$string$isEmpty$$($password$$5$$) || 6 > $password$$5$$.length) {
        alert("Password must have at least 6 characters")
      }else {
        if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
          try {
            $bitEx$$.open($url$$31$$)
          }catch($e$$143$$) {
            alert("Error connecting to the server...");
            return
          }
          $goog$events$listenOnce$$($bitEx$$, "opened", function() {
            $goog$string$isEmpty$$($second_factor$$1$$) ? $bitEx$$.login($username$$7$$, $password$$5$$) : $bitEx$$.login($username$$7$$, $password$$5$$, $second_factor$$1$$)
          })
        }else {
          $goog$string$isEmpty$$($second_factor$$1$$) ? $bitEx$$.login($username$$7$$, $password$$5$$) : $bitEx$$.login($username$$7$$, $password$$5$$, $second_factor$$1$$)
        }
      }
    }
  }
  function $withdrawResponseFunction$$() {
    $withdrawConfirmationDialog$$ != $JSCompiler_alias_NULL$$ && $withdrawConfirmationDialog$$.$dispose$();
    $withdrawConfirmationDialog$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($withdrawConfirmationDialog$$, "Confirm the withdraw request");
    $withdrawConfirmationDialog$$.$setContent$('<p>We just sent a <strong>confirmation code</strong> to your email. </p> <input id="id_withdraw_confirmation" placeholder="C\u00f3digo de confirma\u00e7\u00e3o" class="input-block-level"><p><i>This is security measure to improve your account security</i></p>');
    $JSCompiler_StaticMethods_setButtonSet$$($withdrawConfirmationDialog$$, $goog$ui$Dialog$ButtonSet$createOkCancel$$());
    $withdrawConfirmationDialog$$.$setVisible$($JSCompiler_alias_TRUE$$);
    $goog$events$listenOnce$$($withdrawConfirmationDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$132_token$$11$$) {
      "ok" == $e$$132_token$$11$$.key && ($e$$132_token$$11$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_withdraw_confirmation")), $bitEx$$.$confirmWithdraw$($e$$132_token$$11$$));
      $withdrawConfirmationDialog$$.$dispose$()
    })
  }
  function $onCancelOrder_$$($e$$127$$) {
    $bitEx$$.$cancelOrder$($JSCompiler_alias_VOID$$, $e$$127$$.$order_id$)
  }
  function $switchSymbol$$($symbol$$7_val$$inline_570$$) {
    $subscription_1$$ && $bitEx$$.$unSubscribeMarketData$($subscription_1$$);
    $subscription_1$$ = $bitEx$$.$subscribeMarketData$(0, [$symbol$$7_val$$inline_570$$], ["0", "1"]);
    $order_book_bid$$ != $JSCompiler_alias_NULL$$ && ($order_book_bid$$.clear(), $order_book_offer$$.clear(), $order_book_bid$$.$dispose$(), $order_book_offer$$.$dispose$());
    var $qtyCurrencyDef$$1$$ = $currency_info$$[$symbol$$7_val$$inline_570$$.substr(0, 3)], $priceCurrencyDef$$1$$ = $currency_info$$[$symbol$$7_val$$inline_570$$.substr(3)];
    $goog$dom$forms$setValue$$($buy_order_entry$$.$symbolEl_$, $symbol$$7_val$$inline_570$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($buy_order_entry$$, $qtyCurrencyDef$$1$$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($buy_order_entry$$, $priceCurrencyDef$$1$$.$sign$);
    $goog$dom$forms$setValue$$($sell_order_entry$$.$symbolEl_$, $symbol$$7_val$$inline_570$$);
    $JSCompiler_StaticMethods_setAmountCurrencySign$$($sell_order_entry$$, $qtyCurrencyDef$$1$$.$sign$);
    $JSCompiler_StaticMethods_setPriceCurrencySign$$($sell_order_entry$$, $priceCurrencyDef$$1$$.$sign$);
    var $JSCompiler_temp_const$$49_JSCompiler_temp_const$$51$$ = $sell_order_entry$$.$getElement$(), $val$$inline_568$$ = $model$$.get("AllowedMarkets")[$symbol$$7_val$$inline_570$$];
    $goog$style$showElement$$($JSCompiler_temp_const$$49_JSCompiler_temp_const$$51$$, $val$$inline_568$$ != $JSCompiler_alias_NULL$$);
    $JSCompiler_temp_const$$49_JSCompiler_temp_const$$51$$ = $buy_order_entry$$.$getElement$();
    $symbol$$7_val$$inline_570$$ = $model$$.get("AllowedMarkets")[$symbol$$7_val$$inline_570$$];
    $goog$style$showElement$$($JSCompiler_temp_const$$49_JSCompiler_temp_const$$51$$, $symbol$$7_val$$inline_570$$ != $JSCompiler_alias_NULL$$);
    $order_book_bid$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "0", $qtyCurrencyDef$$1$$, $priceCurrencyDef$$1$$);
    $order_book_offer$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "1", $qtyCurrencyDef$$1$$, $priceCurrencyDef$$1$$);
    $order_book_bid$$.$decorate$($goog$dom$getElement$$("order_book_bid"));
    $order_book_offer$$.$decorate$($goog$dom$getElement$$("order_book_offer"));
    $order_book_bid$$.addEventListener("cancel", $onCancelOrder_$$);
    $order_book_offer$$.addEventListener("cancel", $onCancelOrder_$$)
  }
  function $onSelectState$$($selected_country$$1$$, $selected_state$$) {
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_broker"));
    if($brokers_by_country$$[""][0] != $JSCompiler_alias_NULL$$) {
      var $broker_info$$3_el$$52$$ = $brokers_by_country$$[""][0], $broker_info$$3_el$$52$$ = $goog$dom$createDom$$("option", {value:$broker_info$$3_el$$52$$.BrokerID}, $broker_info$$3_el$$52$$.BusinessName);
      $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$3_el$$52$$)
    }
    var $number_of_available_brokers$$1$$ = 0, $last_available_broker$$1$$ = "";
    $goog$array$forEach$$($brokers_by_country$$[$selected_country$$1$$], function($broker_info$$4_el$$53$$) {
      $broker_info$$4_el$$53$$.State === $selected_state$$ && (++$number_of_available_brokers$$1$$, $last_available_broker$$1$$ = $broker_info$$4_el$$53$$.BrokerID, $broker_info$$4_el$$53$$ = $goog$dom$createDom$$("option", {value:$broker_info$$4_el$$53$$.BrokerID}, $broker_info$$4_el$$53$$.BusinessName), $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info$$4_el$$53$$))
    });
    1 == $number_of_available_brokers$$1$$ ? $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "" + $last_available_broker$$1$$) : $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "0");
    $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker"), 1 <= $number_of_available_brokers$$1$$);
    $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker_warning"), 0 == $number_of_available_brokers$$1$$)
  }
  function $onSelectCountry$$($selected_country$$) {
    console.log("selected country:" + $selected_country$$);
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_state"));
    var $country_info$$1$$ = $countries$$[$selected_country$$];
    $goog$style$showElement$$($goog$dom$getElement$$("id_signup_state_group"), $goog$isArrayLike$$($country_info$$1$$));
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_signup_broker"));
    if($brokers_by_country$$[""][0] != $JSCompiler_alias_NULL$$) {
      var $broker_info_el$$49$$ = $brokers_by_country$$[""][0], $broker_info_el$$49$$ = $goog$dom$createDom$$("option", {value:$broker_info_el$$49$$.BrokerID}, $broker_info_el$$49$$.BusinessName);
      $goog$dom$getElement$$("id_signup_broker").appendChild($broker_info_el$$49$$)
    }
    if($goog$isArrayLike$$($country_info$$1$$)) {
      var $states_name_array$$ = $country_info$$1$$[2].split("|"), $number_of_states_with_brokers$$ = 0, $last_state_with_broker$$ = "";
      $goog$array$forEach$$($country_info$$1$$[1].split("|"), function($state_code$$, $index$$71$$) {
        var $el$$50$$ = $goog$dom$createDom$$("option", {value:$state_code$$}, $states_name_array$$[$index$$71$$]);
        $goog$dom$getElement$$("id_signup_state").appendChild($el$$50$$);
        0 <= $goog$array$findIndex$$($brokers_by_country$$[$selected_country$$], function($broker_info$$1$$) {
          if($broker_info$$1$$.State === $state_code$$) {
            return $JSCompiler_alias_TRUE$$
          }
        }) && (++$number_of_states_with_brokers$$, $last_state_with_broker$$ = $state_code$$)
      });
      1 == $number_of_states_with_brokers$$ && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_state"), $last_state_with_broker$$), $onSelectState$$($selected_country$$, $last_state_with_broker$$))
    }else {
      var $number_of_available_brokers$$ = 0, $last_available_broker$$ = "";
      $goog$object$forEach$$($brokers_by_country$$[$selected_country$$], function($broker_info$$2$$) {
        var $el$$51$$ = $goog$dom$createDom$$("option", {value:$broker_info$$2$$.BrokerID}, $broker_info$$2$$.BusinessName);
        $goog$dom$getElement$$("id_signup_broker").appendChild($el$$51$$);
        ++$number_of_available_brokers$$;
        $last_available_broker$$ = $broker_info$$2$$.BrokerID
      });
      1 == $number_of_available_brokers$$ ? $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "" + $last_available_broker$$) : $goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_broker"), "0");
      $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker"), 1 <= $number_of_available_brokers$$);
      $goog$style$showElement$$($goog$dom$getElement$$("id_signup_broker_warning"), 0 == $number_of_available_brokers$$)
    }
  }
  function $format_currency$$($value$$137$$, $currency$$1$$) {
    var $currency_def$$ = $currency_info$$[$currency$$1$$];
    return(new $goog$i18n$NumberFormat$$($currency_def$$.$format$, $currency_def$$.code)).$format$($value$$137$$)
  }
  var $router$$ = new $bitex$app$UrlRouter$$("", "start"), $bitEx$$ = new $bitex$api$BitEx$$, $model$$ = new $bitex$model$Model$$(document.body), $account_activity_table$$ = $JSCompiler_alias_NULL$$, $withdraw_list_table$$ = $JSCompiler_alias_NULL$$, $customers_table$$ = $JSCompiler_alias_NULL$$, $brokers_by_country$$ = {}, $currency_info$$ = {}, $all_markets$$ = [], $order_book_bid$$ = $JSCompiler_alias_NULL$$, $order_book_offer$$ = $JSCompiler_alias_NULL$$, $subscription_1$$ = $JSCompiler_alias_NULL$$, 
  $countries$$ = {AF:"Afghanistan", AX:"\u00c5land Islands", AL:"Albania", DZ:"Algeria", AS:"American Samoa", AD:"Andorra", AO:"Angola", AI:"Anguilla", AQ:"Antarctica", AG:"Antigua and Barbuda", AR:"Argentina", AM:"Armenia", AW:"Aruba", AC:"Ascension Island", AU:"Australia", AT:"Austria", AZ:"Azerbaijan", BS:"Bahamas", BH:"Bahrain", BD:"Bangladesh", BB:"Barbados", BY:"Belarus", BE:"Belgium", BZ:"Belize", BJ:"Benin", BM:"Bermuda", BT:"Bhutan", BO:"Bolivia", BQ:"Bonaire, Sint Eustatius, and Saba", 
  BA:"Bosnia and Herzegovina", BW:"Botswana", BV:"Bouvet Island", BR:"Brazil", IO:"British Indian Ocean Territory", VG:"British Virgin Islands", BN:"Brunei", BG:"Bulgaria", BF:"Burkina Faso", BI:"Burundi", KH:"Cambodia", CM:"Cameroon", CA:"Canada", IC:"Canary Islands", CV:"Cape Verde", KY:"Cayman Islands", CF:"Central African Republic", EA:"Ceuta and Melilla", TD:"Chad", CL:"Chile", CN:"China", CX:"Christmas Island", CP:"Clipperton Island", CC:"Cocos [Keeling] Islands", CO:"Colombia", KM:"Comoros", 
  CG:"Congo - Brazzaville", CD:"Congo - Kinshasa", CK:"Cook Islands", CR:"Costa Rica", CI:"C\u00f4te d\u2019Ivoire", HR:"Croatia", CU:"Cuba", CW:"Cura\u00e7ao", CY:"Cyprus", CZ:"Czech Republic", DK:"Denmark", DG:"Diego Garcia", DJ:"Djibouti", DM:"Dominica", DO:"Dominican Republic", EC:"Ecuador", EG:"Egypt", SV:"El Salvador", GQ:"Equatorial Guinea", ER:"Eritrea", EE:"Estonia", ET:"Ethiopia", EU:"European Union", FK:"Falkland Islands", FO:"Faroe Islands", FJ:"Fiji", FI:"Finland", FR:"France", GF:"French Guiana", 
  PF:"French Polynesia", TF:"French Southern Territories", GA:"Gabon", GM:"Gambia", GE:"Georgia", DE:"Germany", GH:"Ghana", GI:"Gibraltar", GR:"Greece", GL:"Greenland", GD:"Grenada", GP:"Guadeloupe", GU:"Guam", GT:"Guatemala", GG:"Guernsey", GN:"Guinea", GW:"Guinea-Bissau", GY:"Guyana", HT:"Haiti", HM:"Heard Island and McDonald Islands", HN:"Honduras", HK:"Hong Kong SAR China", HU:"Hungary", IS:"Iceland", IN:"India", ID:"Indonesia", IR:"Iran", IQ:"Iraq", IE:"Ireland", IM:"Isle of Man", IL:"Israel", 
  IT:"Italy", JM:"Jamaica", JP:"Japan", JE:"Jersey", JO:"Jordan", KZ:"Kazakhstan", KE:"Kenya", KI:"Kiribati", KW:"Kuwait", KG:"Kyrgyzstan", LA:"Laos", LV:"Latvia", LB:"Lebanon", LS:"Lesotho", LR:"Liberia", LY:"Libya", LI:"Liechtenstein", LT:"Lithuania", LU:"Luxembourg", MO:"Macau SAR China", MK:"Macedonia", MG:"Madagascar", MW:"Malawi", MY:"Malaysia", MV:"Maldives", ML:"Mali", MT:"Malta", MH:"Marshall Islands", MQ:"Martinique", MR:"Mauritania", MU:"Mauritius", YT:"Mayotte", MX:"Mexico", FM:"Micronesia", 
  MD:"Moldova", MC:"Monaco", MN:"Mongolia", ME:"Montenegro", MS:"Montserrat", MA:"Morocco", MZ:"Mozambique", MM:"Myanmar [Burma]", NA:"Namibia", NR:"Nauru", NP:"Nepal", NL:"Netherlands", AN:"Netherlands Antilles", NC:"New Caledonia", NZ:"New Zealand", NI:"Nicaragua", NE:"Niger", NG:"Nigeria", NU:"Niue", NF:"Norfolk Island", KP:"North Korea", MP:"Northern Mariana Islands", NO:"Norway", OM:"Oman", QO:"Outlying Oceania", PK:"Pakistan", PW:"Palau", PS:"Palestinian Territories", PA:"Panama", PG:"Papua New Guinea", 
  PY:"Paraguay", PE:"Peru", PH:"Philippines", PN:"Pitcairn Islands", PL:"Poland", PT:"Portugal", PR:"Puerto Rico", QA:"Qatar", RE:"R\u00e9union", RO:"Romania", RU:"Russia", RW:"Rwanda", BL:"Saint Barth\u00e9lemy", SH:"Saint Helena", KN:"Saint Kitts and Nevis", LC:"Saint Lucia", MF:"Saint Martin", PM:"Saint Pierre and Miquelon", VC:"Saint Vincent and the Grenadines", WS:"Samoa", SM:"San Marino", ST:"S\u00e3o Tom\u00e9 and Pr\u00edncipe", SA:"Saudi Arabia", SN:"Senegal", RS:"Serbia", CS:"Serbia and Montenegro", 
  SC:"Seychelles", SL:"Sierra Leone", SG:"Singapore", SX:"Sint Maarten", SK:"Slovakia", SI:"Slovenia", SB:"Solomon Islands", SO:"Somalia", ZA:"South Africa", GS:"South Georgia and the South Sandwich Islands", KR:"South Korea", SS:"South Sudan", ES:"Spain", LK:"Sri Lanka", SD:"Sudan", SR:"Suriname", SJ:"Svalbard and Jan Mayen", SZ:"Swaziland", SE:"Sweden", CH:"Switzerland", SY:"Syria", TW:"Taiwan", TJ:"Tajikistan", TZ:"Tanzania", TH:"Thailand", TL:"Timor-Leste", TG:"Togo", TK:"Tokelau", TO:"Tonga", 
  TT:"Trinidad and Tobago", TA:"Tristan da Cunha", TN:"Tunisia", TR:"Turkey", TM:"Turkmenistan", TC:"Turks and Caicos Islands", TV:"Tuvalu", UM:"U.S. Minor Outlying Islands", VI:"U.S. Virgin Islands", UG:"Uganda", UA:"Ukraine", AE:"United Arab Emirates", GB:"United Kingdom", US:["United States", "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VE|VA|WA|WV|WI|WY", "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming"], 
  UY:"Uruguay", UZ:"Uzbekistan", VU:"Vanuatu", VA:"Vatican City", VE:"Venezuela", VN:"Vietnam", WF:"Wallis and Futuna", EH:"Western Sahara", YE:"Yemen", ZM:"Zambia", ZW:"Zimbabwe"};
  $goog$object$forEach$$($countries$$, function($country_info$$, $country_code$$1$$) {
    var $country_el$$48$$ = $country_info$$;
    $goog$isArrayLike$$($country_el$$48$$) && ($country_el$$48$$ = $country_el$$48$$[0]);
    $country_el$$48$$ = $goog$dom$createDom$$("option", {value:$country_code$$1$$}, $country_el$$48$$);
    $goog$dom$getElement$$("id_signup_country").appendChild($country_el$$48$$)
  });
  var $buy_order_entry$$ = new $bitex$ui$OrderEntryX$$, $sell_order_entry$$ = new $bitex$ui$OrderEntryX$$;
  $buy_order_entry$$.$decorate$($goog$dom$getElement$$("id_order_entry_buy"));
  $sell_order_entry$$.$decorate$($goog$dom$getElement$$("id_order_entry_sell"));
  try {
    $bitEx$$.open($url$$31$$)
  }catch($e$$92$$) {
    alert("Error connecting to the server. Please try again");
    return
  }
  $buy_order_entry$$.addEventListener("order_entry_submitted", function($e$$93$$) {
    $bitEx$$.$sendBuyLimitedOrder$($goog$dom$forms$getValue$$($e$$93$$.target.$symbolEl_$), $JSCompiler_StaticMethods_getAmount$$($e$$93$$.target), $JSCompiler_StaticMethods_getPrice$$($e$$93$$.target), $goog$dom$forms$getValue$$($e$$93$$.target.$clientIdEl_$))
  });
  $sell_order_entry$$.addEventListener("order_entry_submitted", function($e$$94$$) {
    $bitEx$$.$sendSellLimitedOrder$($goog$dom$forms$getValue$$($e$$94$$.target.$symbolEl_$), $JSCompiler_StaticMethods_getAmount$$($e$$94$$.target), $JSCompiler_StaticMethods_getPrice$$($e$$94$$.target), $goog$dom$forms$getValue$$($e$$94$$.target.$clientIdEl_$))
  });
  $bitEx$$.addEventListener("opened", function() {
    $goog$dom$classes$remove$$(document.body, "ws-not-connected");
    $goog$dom$classes$add$$(document.body, "ws-connected");
    $goog$dom$classes$remove$$(document.body, "bitex-broker");
    $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
    $goog$dom$removeChildren$$($goog$dom$getElement$$("id_instrument_1"));
    $bitEx$$.$requestSecurityList$();
    $bitEx$$.$requestBrokerList$()
  });
  $bitEx$$.addEventListener("closed", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-broker");
    $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
    $JSCompiler_StaticMethods_setView$$($router$$, "start")
  });
  $bitEx$$.addEventListener("error", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-broker");
    $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
    var $dlg$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$, "Error");
    $dlg$$.$setContent$("Error connecting to the server. Your browser MUST SUPPORT WebSockets.");
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$.$setVisible$($JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_setView$$($router$$, "start")
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_signup_country"), "change", function() {
    var $selected_country$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country"));
    $onSelectCountry$$($selected_country$$2$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_signup_state"), "change", function() {
    var $selected_country$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $selected_state$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state"));
    $onSelectState$$($selected_country$$3$$, $selected_state$$1$$)
  });
  $bitEx$$.addEventListener("broker_list", function($e$$100$$) {
    var $msg$$40$$ = $e$$100$$.data;
    console.log($goog$debug$deepExpose$$($msg$$40$$));
    var $last_country_code$$ = "", $number_of_countries$$ = 0;
    $goog$array$forEach$$($msg$$40$$.BrokerListGrp, function($broker_array$$) {
      var $broker_info$$5$$ = {};
      $goog$array$forEach$$($msg$$40$$.Columns, function($column$$4$$, $index$$72$$) {
        $broker_info$$5$$[$column$$4$$] = $broker_array$$[$index$$72$$]
      });
      $broker_info$$5$$.CountryCode in $brokers_by_country$$ ? $brokers_by_country$$[$broker_info$$5$$.CountryCode].push($broker_info$$5$$) : ($brokers_by_country$$[$broker_info$$5$$.CountryCode] = [$broker_info$$5$$], 0 < $broker_info$$5$$.CountryCode.length && ($last_country_code$$ = $broker_info$$5$$.CountryCode, ++$number_of_countries$$))
    });
    1 == $number_of_countries$$ && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_signup_country"), $last_country_code$$), $onSelectCountry$$($last_country_code$$))
  });
  $bitEx$$.addEventListener("security_list", function($e$$101_msg$$41$$) {
    $e$$101_msg$$41$$ = $e$$101_msg$$41$$.data;
    $goog$array$forEach$$($e$$101_msg$$41$$.Currencies, function($currency$$2$$) {
      $currency_info$$[$currency$$2$$.Code] = {code:$currency$$2$$.Code, $format$:$currency$$2$$.FormatJS, description:$currency$$2$$.Description, $sign$:$currency$$2$$.Sign, $pip$:$currency$$2$$.Pip, $is_crypto$:$currency$$2$$.IsCrypto};
      var $balance_key$$ = "balance_" + $currency$$2$$.Code.toLowerCase();
      $model$$.set($balance_key$$, 0);
      $model$$.set("formatted_" + $balance_key$$, $format_currency$$(0, $currency$$2$$.Code))
    });
    var $symbols$$1$$ = [];
    $goog$array$forEach$$($e$$101_msg$$41$$.Instruments, function($el$$54_instrument$$) {
      var $symbol$$6$$ = $el$$54_instrument$$.Symbol;
      $all_markets$$[$symbol$$6$$] = {$symbol$:$symbol$$6$$, description:$el$$54_instrument$$.Description};
      $symbols$$1$$.push($symbol$$6$$);
      $el$$54_instrument$$ = $goog$dom$createDom$$("option", {value:$symbol$$6$$}, $el$$54_instrument$$.Description);
      $goog$dom$getElement$$("id_instrument_1").appendChild($el$$54_instrument$$)
    })
  });
  $router$$.addEventListener("set_view", function($e$$102_view_name$$3$$) {
    $e$$102_view_name$$3$$ = $e$$102_view_name$$3$$.view;
    if(!$bitEx$$.$logged_$) {
      switch($e$$102_view_name$$3$$) {
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
          return $JSCompiler_StaticMethods_setView$$($router$$, "start"), $JSCompiler_alias_FALSE$$
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
    $goog$dom$classes$add$$(document.body, "active-view-" + $e$$102_view_name$$3$$)
  });
  $router$$.addEventListener("set_view", function($e$$103_el$$55$$) {
    "withdraw" === $e$$103_el$$55$$.view && $bitEx$$.$logged_$ && $withdraw_list_table$$ == $JSCompiler_alias_NULL$$ && ($e$$103_el$$55$$ = $goog$dom$getElement$$("id_withdraw_list_table"), $withdraw_list_table$$ = new $bitex$ui$WithdrawList$$, $withdraw_list_table$$.addEventListener("request_data", function($e$$104$$) {
      $bitEx$$.$requestWithdrawList$("all_withdraws", $e$$104$$.options.Page, $e$$104$$.options.Limit, ["1", "2"])
    }), $withdraw_list_table$$.$decorate$($e$$103_el$$55$$), $bitEx$$.addEventListener("withdraw_list_response", function($e$$105_msg$$42$$) {
      $e$$105_msg$$42$$ = $e$$105_msg$$42$$.data;
      "all_withdraws" === $e$$105_msg$$42$$.WithdrawListReqID && $withdraw_list_table$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setResultSet$$($withdraw_list_table$$, $e$$105_msg$$42$$.WithdrawListGrp, $e$$105_msg$$42$$.Columns)
    }))
  });
  $router$$.addEventListener("set_view", function($e$$106_el$$56$$) {
    "account_activity" === $e$$106_el$$56$$.view && $bitEx$$.$logged_$ && $account_activity_table$$ == $JSCompiler_alias_NULL$$ && ($e$$106_el$$56$$ = $goog$dom$getElement$$("id_trade_history_table"), $account_activity_table$$ = new $bitex$ui$AccountActivity$$, $account_activity_table$$.addEventListener("request_data", function($e$$107$$) {
      $bitEx$$.$requestOrderList$("closed_orders", $e$$107$$.options.Page, $e$$107$$.options.Limit, ["1", "2"])
    }), $account_activity_table$$.$decorate$($e$$106_el$$56$$), $bitEx$$.addEventListener("order_list_response", function($e$$108_msg$$43$$) {
      $e$$108_msg$$43$$ = $e$$108_msg$$43$$.data;
      "closed_orders" === $e$$108_msg$$43$$.OrdersReqID && $account_activity_table$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setResultSet$$($account_activity_table$$, $e$$108_msg$$43$$.OrdListGrp, $e$$108_msg$$43$$.Columns)
    }))
  });
  $router$$.addEventListener("set_view", function($broker$$2_e$$109_form_src$$) {
    if("verification" === $broker$$2_e$$109_form_src$$.view && $bitEx$$.$logged_$ && ($broker$$2_e$$109_form_src$$ = $model$$.get("Broker"), $broker$$2_e$$109_form_src$$ != $JSCompiler_alias_NULL$$)) {
      $broker$$2_e$$109_form_src$$ = $goog$string$subs$$($broker$$2_e$$109_form_src$$.VerificationForm, $model$$.get("UserID"), $model$$.get("Username"), $model$$.get("Email"));
      var $verificationIFrameForm$$ = $goog$dom$getElement$$("JotFormIFrame");
      $verificationIFrameForm$$.src !== $broker$$2_e$$109_form_src$$ && ($verificationIFrameForm$$.src = $broker$$2_e$$109_form_src$$)
    }
  });
  $router$$.addEventListener("set_view", function($e$$110$$) {
    "customers" === $e$$110$$.view && $bitEx$$.$logged_$ && $customers_table$$ == $JSCompiler_alias_NULL$$ && ($customers_table$$ = new $bitex$ui$Customers$$, $customers_table$$.$decorate$($goog$dom$getElement$$("id_customer_table")), $customers_table$$.addEventListener("request_data", function($e$$111$$) {
      $bitEx$$.$requestCustomerList$("customers", $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $e$$111$$.options.Page, $e$$111$$.options.Limit, [0, 1])
    }), $bitEx$$.addEventListener("customer_list", function($e$$112_msg$$44$$) {
      $e$$112_msg$$44$$ = $e$$112_msg$$44$$.data;
      $JSCompiler_StaticMethods_setResultSet$$($customers_table$$, $e$$112_msg$$44$$.CustomerListGrp, $e$$112_msg$$44$$.Columns)
    }), $bitEx$$.$requestCustomerList$("customers", $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, 0, 100, [0, 1]), $customers_table$$.addEventListener("detail", function($e$$113$$) {
      $bitEx$$.$requestCustomerDetails$($e$$113$$.$user_id$)
    }))
  });
  var $customerDetailDialog$$;
  $bitEx$$.addEventListener("customer_detail", function($dlg_content_e$$114_msg$$45_output$$inline_560$$) {
    $dlg_content_e$$114_msg$$45_output$$inline_560$$ = $dlg_content_e$$114_msg$$45_output$$inline_560$$.data;
    $customerDetailDialog$$ != $JSCompiler_alias_NULL$$ && $customerDetailDialog$$.$dispose$();
    $dlg_content_e$$114_msg$$45_output$$inline_560$$ = "" + ('<div class="row"><div class="span6">Username:' + ("object" === typeof $dlg_content_e$$114_msg$$45_output$$inline_560$$.Username && $dlg_content_e$$114_msg$$45_output$$inline_560$$.Username && 0 === $dlg_content_e$$114_msg$$45_output$$inline_560$$.Username.$contentKind$ ? $dlg_content_e$$114_msg$$45_output$$inline_560$$.Username.content : String($dlg_content_e$$114_msg$$45_output$$inline_560$$.Username).replace($soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$, 
    $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$)) + "</div></div>");
    $customerDetailDialog$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($customerDetailDialog$$, "Customer details");
    $customerDetailDialog$$.$setContent$($dlg_content_e$$114_msg$$45_output$$inline_560$$);
    $JSCompiler_StaticMethods_setButtonSet$$($customerDetailDialog$$, $goog$ui$Dialog$ButtonSet$createOkCancel$$());
    $customerDetailDialog$$.$setVisible$($JSCompiler_alias_TRUE$$)
  });
  $router$$.addEventListener("set_view", function($e$$115$$) {
    if("offerbook" !== $e$$115$$.view || !$bitEx$$.$logged_$) {
      $subscription_1$$ && ($bitEx$$.$unSubscribeMarketData$($subscription_1$$), $subscription_1$$ = $JSCompiler_alias_NULL$$), $order_book_bid$$ != $JSCompiler_alias_NULL$$ && ($order_book_bid$$.clear(), $order_book_offer$$.clear(), $order_book_bid$$.$dispose$(), $order_book_offer$$.$dispose$(), $order_book_offer$$ = $order_book_bid$$ = $JSCompiler_alias_NULL$$)
    }else {
      var $symbol$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_instrument_1"));
      $symbol$$8$$ != $JSCompiler_alias_NULL$$ && $switchSymbol$$($symbol$$8$$);
      $goog$events$listen$$($goog$dom$getElement$$("id_instrument_1"), "change", function() {
        $symbol$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_instrument_1"));
        console.log("selected " + $symbol$$8$$);
        $switchSymbol$$($symbol$$8$$)
      })
    }
  });
  $bitEx$$.addEventListener("ob_clear", function() {
    $order_book_bid$$.clear();
    $order_book_offer$$.clear()
  });
  $bitEx$$.addEventListener("ob_delete_orders_thru", function($e$$118_index$$73$$) {
    var $msg$$46_side$$5$$ = $e$$118_index$$73$$.data;
    $e$$118_index$$73$$ = $msg$$46_side$$5$$.MDEntryPositionNo;
    $msg$$46_side$$5$$ = $msg$$46_side$$5$$.MDEntryType;
    "0" == $msg$$46_side$$5$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_bid$$, $e$$118_index$$73$$) : "1" == $msg$$46_side$$5$$ && $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_offer$$, $e$$118_index$$73$$)
  });
  $bitEx$$.addEventListener("ob_delete_order", function($e$$119_index$$74$$) {
    var $msg$$47_side$$6$$ = $e$$119_index$$74$$.data;
    $e$$119_index$$74$$ = $msg$$47_side$$6$$.MDEntryPositionNo - 1;
    $msg$$47_side$$6$$ = $msg$$47_side$$6$$.MDEntryType;
    "0" == $msg$$47_side$$6$$ ? $JSCompiler_StaticMethods_deleteOrder$$($order_book_bid$$, $e$$119_index$$74$$) : "1" == $msg$$47_side$$6$$ && $JSCompiler_StaticMethods_deleteOrder$$($order_book_offer$$, $e$$119_index$$74$$)
  });
  $bitEx$$.addEventListener("ob_update_order", function($e$$120_index$$75$$) {
    var $msg$$48_side$$7$$ = $e$$120_index$$75$$.data;
    $e$$120_index$$75$$ = $msg$$48_side$$7$$.MDEntryPositionNo - 1;
    var $qty$$6$$ = $msg$$48_side$$7$$.MDEntrySize / 1E8, $msg$$48_side$$7$$ = $msg$$48_side$$7$$.MDEntryType;
    "0" == $msg$$48_side$$7$$ ? $JSCompiler_StaticMethods_updateOrder$$($order_book_bid$$, $e$$120_index$$75$$, $qty$$6$$) : "1" == $msg$$48_side$$7$$ && $JSCompiler_StaticMethods_updateOrder$$($order_book_offer$$, $e$$120_index$$75$$, $qty$$6$$)
  });
  $bitEx$$.addEventListener("ob_new_order", function($e$$121_index$$76$$) {
    var $msg$$49_side$$8$$ = $e$$121_index$$76$$.data;
    $e$$121_index$$76$$ = $msg$$49_side$$8$$.MDEntryPositionNo - 1;
    var $price$$6$$ = $msg$$49_side$$8$$.MDEntryPx / 1E8, $qty$$7$$ = $msg$$49_side$$8$$.MDEntrySize / 1E8, $username$$4$$ = $msg$$49_side$$8$$.Username, $broker$$3$$ = $msg$$49_side$$8$$.Broker, $orderId$$3$$ = $msg$$49_side$$8$$.OrderID, $msg$$49_side$$8$$ = $msg$$49_side$$8$$.MDEntryType;
    "0" == $msg$$49_side$$8$$ ? (0 === $e$$121_index$$76$$ && $model$$.set("formatted_best_bid_brl", $price$$6$$), $order_book_bid$$.$insertOrder$($e$$121_index$$76$$, $orderId$$3$$, $price$$6$$, $qty$$7$$, $username$$4$$, $broker$$3$$)) : "1" == $msg$$49_side$$8$$ && (0 === $e$$121_index$$76$$ && $model$$.set("formatted_best_offer_brl", $price$$6$$), $order_book_offer$$.$insertOrder$($e$$121_index$$76$$, $orderId$$3$$, $price$$6$$, $qty$$7$$, $username$$4$$, $broker$$3$$))
  });
  $goog$events$listen$$(document.body, "click", function($e$$122$$) {
    var $view_name$$9$$ = $e$$122$$.target.getAttribute("data-switch-view");
    $view_name$$9$$ != $JSCompiler_alias_NULL$$ && ($e$$122$$.preventDefault(), $e$$122$$.stopPropagation(), $JSCompiler_StaticMethods_setView$$($router$$, $view_name$$9$$))
  });
  var $boleto_buttons_withdraws_component$$ = new $goog$ui$Component$$;
  $boleto_buttons_withdraws_component$$.$decorate$($goog$dom$getElement$$("withdraw_accordion"));
  var $withdraw_btc$$ = new $bitex$ui$Withdraw$$({$parent_id$:"withdraw_accordion", $button_label$:"Withdraw", title:"Bitcoin withdrawal", description:"Fill up the form.", controls:[["amount", "Amount", "eg. 0.44550000", "\u0e3f"], ["wallet", "Wallet", "eg. 1933phfhK3ZgFQNLGSDXvqCn32k2buXY8a"]]}), $withdraw_brl_bank_transfer$$ = new $bitex$ui$Withdraw$$({$parent_id$:"withdraw_accordion", $button_label$:"Withdraw", title:"Brazilian Bank Withdrawal", description:"R$ 10,00 fee for DOC and TED.", controls:[["amount", 
  "Amount", "eg. 2300", "R$"], ["bank_number", "Bank number", "eg. 341"], ["bank_name", "Bank name", "eg. Banco It\u00e1u"], ["account_branch", "Account Branch", "eg. 5555"], ["account_name", "Account name ", "eg. Jos\u00e9 da Silva"], ["account_number", "Account number", "ex. 888888"], ["CPFCNPJ", "CPF or CNPJ", "ex. 567.890.123-45"]]});
  $JSCompiler_StaticMethods_addChild$$($boleto_buttons_withdraws_component$$, $withdraw_btc$$);
  $JSCompiler_StaticMethods_addChild$$($boleto_buttons_withdraws_component$$, $withdraw_brl_bank_transfer$$);
  $withdraw_btc$$.addEventListener("withdraw_event", function($e$$123$$) {
    var $amount$$5$$ = $e$$123$$.target.$model_$.data.amount, $amount$$5$$ = $amount$$5$$.replace(",", ".");
    $amount$$5$$.lastIndexOf(".") != $amount$$5$$.indexOf(".") ? alert("Invalid value.") : $bitEx$$.$withdrawCryptoCoin$(parseFloat($amount$$5$$), $e$$123$$.target.$model_$.data.wallet, "BTC")
  });
  $withdraw_brl_bank_transfer$$.addEventListener("withdraw_event", function($e$$124$$) {
    var $amount$$6$$ = $e$$124$$.target.$model_$.data.amount, $amount$$6$$ = $amount$$6$$.replace(",", ".");
    $amount$$6$$.lastIndexOf(".") != $amount$$6$$.indexOf(".") ? alert("Invalid value.") : $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U8", WithdrawReqID:parseInt(1E6 * Math.random(), 10), Amount:parseInt(1E8 * parseFloat($amount$$6$$), 10), BankNumber:$e$$124$$.target.$model_$.data.bank_number, BankName:$e$$124$$.target.$model_$.data.bank_name, AccountName:$e$$124$$.target.$model_$.data.account_name, AccountNumber:$e$$124$$.target.$model_$.data.account_number, AccountBranch:$e$$124$$.target.$model_$.data.account_branch, 
    CPFCNPJ:$e$$124$$.target.$model_$.data.CPFCNPJ}))
  });
  $model$$.addEventListener("model_setbest_offer_brl", function($e$$125$$) {
    $JSCompiler_StaticMethods_setMarketPrice$$($buy_order_entry$$, $goog$string$toNumber$$($e$$125$$.data))
  });
  $model$$.addEventListener("model_setbest_bid_brl", function($e$$126$$) {
    $JSCompiler_StaticMethods_setMarketPrice$$($sell_order_entry$$, $goog$string$toNumber$$($e$$126$$.data))
  });
  $bitEx$$.addEventListener("error_message", function($e$$128$$) {
    console.log($goog$debug$deepExpose$$($e$$128$$.data))
  });
  $bitEx$$.addEventListener("login_ok", function($e$$129_msg$$51_value$$inline_588_value$$inline_591$$) {
    $e$$129_msg$$51_value$$inline_588_value$$inline_591$$ = $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.data;
    $goog$dom$classes$add$$(document.body, "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
    $model$$.set("UserID", $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.UserID);
    $model$$.set("Username", $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.Username);
    $model$$.set("TwoFactorEnabled", $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.TwoFactorEnabled);
    $model$$.set("IsBroker", $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.IsBroker);
    $model$$.set("Broker", $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.Broker);
    var $value$$inline_582_value$$inline_585$$ = $model$$.get("IsBroker");
    $goog$style$showElement$$($buy_order_entry$$.$clientIdEl_$, $value$$inline_582_value$$inline_585$$);
    $value$$inline_582_value$$inline_585$$ = $model$$.get("IsBroker");
    $goog$style$showElement$$($sell_order_entry$$.$clientIdEl_$, $value$$inline_582_value$$inline_585$$);
    $e$$129_msg$$51_value$$inline_588_value$$inline_591$$.IsBroker ? $goog$dom$classes$add$$(document.body, "bitex-broker") : ($goog$dom$classes$add$$(document.body, "bitex-non-broker"), $e$$129_msg$$51_value$$inline_588_value$$inline_591$$ = $model$$.get("UserID"), $goog$dom$forms$setValue$$($buy_order_entry$$.$clientIdEl_$, $e$$129_msg$$51_value$$inline_588_value$$inline_591$$), $e$$129_msg$$51_value$$inline_588_value$$inline_591$$ = $model$$.get("UserID"), $goog$dom$forms$setValue$$($sell_order_entry$$.$clientIdEl_$, 
    $e$$129_msg$$51_value$$inline_588_value$$inline_591$$));
    $bitEx$$.$requestBalances$();
    $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U20", BoletoOptionReqId:parseInt(1E7 * Math.random(), 10)}));
    $JSCompiler_StaticMethods_setView$$($router$$, "offerbook")
  });
  $bitEx$$.addEventListener("execution_report", function($e$$130_msg$$52$$) {
    $e$$130_msg$$52$$ = $e$$130_msg$$52$$.data;
    switch($e$$130_msg$$52$$.ExecType) {
      case "1":
        $.sticky("Order " + $e$$130_msg$$52$$.OrderID + " partially filled");
        break;
      case "2":
        $.sticky("Order " + $e$$130_msg$$52$$.OrderID + " filled");
        break;
      case "4":
        $.sticky("Order " + $e$$130_msg$$52$$.OrderID + " cancelled")
    }
  });
  var $withdrawConfirmationDialog$$;
  $bitEx$$.addEventListener("brl_bank_transfer_withdraw_response", $withdrawResponseFunction$$);
  $bitEx$$.addEventListener("crypto_coin_withdraw_response", $withdrawResponseFunction$$);
  $bitEx$$.addEventListener("pwd_changed_ok", function($e$$133_msg$$54$$) {
    $e$$133_msg$$54$$ = $e$$133_msg$$54$$.data;
    var $dlg$$1$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$1$$, "Success");
    $dlg$$1$$.$setContent$($e$$133_msg$$54$$.UserStatusText);
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$1$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$1$$.$setVisible$($JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_setView$$($router$$, "signin")
  });
  $bitEx$$.addEventListener("pwd_changed_error", function($e$$134_msg$$55$$) {
    $e$$134_msg$$55$$ = $e$$134_msg$$55$$.data;
    var $dlg$$2$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$2$$, "Error chaning password");
    $dlg$$2$$.$setContent$($e$$134_msg$$55$$.UserStatusText);
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$2$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$2$$.$setVisible$($JSCompiler_alias_TRUE$$)
  });
  var $secondFactorDialog$$;
  $bitEx$$.addEventListener("login_error", function($e$$135_msg$$56$$) {
    $goog$dom$classes$add$$(document.body, "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-broker");
    $goog$dom$classes$remove$$(document.body, "bitex-non-broker");
    $e$$135_msg$$56$$ = $e$$135_msg$$56$$.data;
    $model$$.set("UserID", "");
    $model$$.set("Username", "");
    if($e$$135_msg$$56$$.NeedSecondFactor) {
      $secondFactorDialog$$ != $JSCompiler_alias_NULL$$ && $secondFactorDialog$$.$dispose$(), $secondFactorDialog$$ = new $bootstrap$Dialog$$, $JSCompiler_StaticMethods_setTitle$$($secondFactorDialog$$, "Autentica\u00e7\u00e3o em 2 passos"), $secondFactorDialog$$.$setContent$('Google Authenticator code: <input id="id_second_factor" placeholder="eg. 555555" size="10">'), $JSCompiler_StaticMethods_setButtonSet$$($secondFactorDialog$$, $goog$ui$Dialog$ButtonSet$createOkCancel$$()), $secondFactorDialog$$.$setVisible$($JSCompiler_alias_TRUE$$), 
      $goog$events$listenOnce$$($secondFactorDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$136_username$$5$$) {
        if("ok" == $e$$136_username$$5$$.key) {
          $e$$136_username$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_username"));
          var $password$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_password")), $second_factor$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_factor"));
          $goog$string$isEmpty$$($e$$136_username$$5$$) && ($e$$136_username$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_username")), $password$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_password")));
          $login$$($e$$136_username$$5$$, $password$$3$$, $second_factor$$)
        }
        $secondFactorDialog$$.$dispose$()
      })
    }else {
      var $error_dialog$$ = new $bootstrap$Dialog$$;
      $JSCompiler_StaticMethods_setTitle$$($error_dialog$$, "Error");
      $error_dialog$$.$setContent$($e$$135_msg$$56$$.UserStatusText);
      $JSCompiler_StaticMethods_setButtonSet$$($error_dialog$$, $goog$ui$Dialog$ButtonSet$createOk$$());
      $error_dialog$$.$setVisible$($JSCompiler_alias_TRUE$$)
    }
  });
  $bitEx$$.addEventListener("trade", $JSCompiler_emptyFn$$());
  $bitEx$$.addEventListener("balance_response", function($e$$138_msg$$58$$) {
    $e$$138_msg$$58$$ = $e$$138_msg$$58$$.data;
    delete $e$$138_msg$$58$$.MsgType;
    delete $e$$138_msg$$58$$.BalanceReqID;
    $goog$object$forEach$$($e$$138_msg$$58$$, function($balances$$) {
      $goog$object$forEach$$($balances$$, function($balance$$, $currency$$3$$) {
        $balance$$ /= 1E8;
        var $balance_key$$1$$ = "balance_" + $currency$$3$$.toLowerCase();
        $model$$.set($balance_key$$1$$, $balance$$);
        $model$$.set("formatted_" + $balance_key$$1$$, $format_currency$$($balance$$, $currency$$3$$))
      })
    })
  });
  var $button_signup$$ = new $goog$ui$Button$$;
  $button_signup$$.$decorate$($goog$dom$getElement$$("id_btn_signup"));
  $goog$events$listen$$($goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$139$$) {
    $button_signup$$.$setEnabled$($e$$139$$.target.checked)
  });
  $button_signup$$.addEventListener("action", function($e$$140_password2$$) {
    $e$$140_password2$$.stopPropagation();
    $e$$140_password2$$.preventDefault();
    var $username$$6$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username")), $email$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email")), $password$$4$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password"));
    $e$$140_password2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password2"));
    var $state$$19$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_state")), $country_code$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_country")), $broker$$5$$ = $goog$string$toNumber$$($goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_broker")));
    if($goog$string$isEmpty$$($username$$6$$) || /[^a-zA-Z0-9]/.test($username$$6$$)) {
      alert("Invalid username")
    }else {
      if($email$$2$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        if($goog$string$isEmpty$$($password$$4$$) || 6 > $password$$4$$.length) {
          alert("Senha deve ter no m\u00ednimo 6 letras")
        }else {
          if($password$$4$$ !== $e$$140_password2$$) {
            alert("Passwords does not match")
          }else {
            if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
              try {
                $bitEx$$.open($url$$31$$)
              }catch($e$$141$$) {
                alert("Error connecting to the server...");
                return
              }
              $goog$events$listenOnce$$($bitEx$$, "opened", function() {
                $bitEx$$.$signUp$($username$$6$$, $password$$4$$, $email$$2$$, $state$$19$$, $country_code$$2$$, $broker$$5$$)
              })
            }else {
              $bitEx$$.close()
            }
          }
        }
      }else {
        alert("Invalid email")
      }
    }
  });
  $bitEx$$.addEventListener("two_factor_secret", function($e$$145_msg$$59$$) {
    $e$$145_msg$$59$$ = $e$$145_msg$$59$$.data;
    $model$$.set("TwoFactorSecret", $e$$145_msg$$59$$.TwoFactorSecret);
    $model$$.set("TwoFactorEnabled", $e$$145_msg$$59$$.TwoFactorEnabled);
    var $secret_qr_el$$ = $goog$dom$getElement$$("id_secret_qr"), $divEl$$ = $goog$dom$getElement$$("id_enable_two_factor_div");
    $goog$string$isEmpty$$($e$$145_msg$$59$$.TwoFactorSecret) ? $goog$style$showElement$$($divEl$$, $JSCompiler_alias_FALSE$$) : ($goog$style$showElement$$($divEl$$, $JSCompiler_alias_TRUE$$), $secret_qr_el$$.setAttribute("src", "https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=" + $e$$145_msg$$59$$.TwoFactorSecret))
  });
  $model$$.addEventListener("model_setBroker", function($allowed_markets_array_e$$146$$) {
    var $allowed_markets$$ = {};
    $goog$array$forEach$$($allowed_markets_array_e$$146$$.data.Currencies.split(","), function($currency$$4$$) {
      var $market$$ = $goog$object$findKey$$($all_markets$$, function($market_info$$, $symbol$$9$$) {
        if(0 <= $symbol$$9$$.indexOf($currency$$4$$)) {
          return $JSCompiler_alias_TRUE$$
        }
      });
      $market$$ != $JSCompiler_alias_NULL$$ && ($allowed_markets$$[$market$$] = $all_markets$$[$market$$])
    });
    $model$$.set("AllowedMarkets", $allowed_markets$$);
    $allowed_markets_array_e$$146$$ = $goog$object$getKeys$$($allowed_markets$$);
    1 === $allowed_markets_array_e$$146$$.length && ($goog$dom$forms$setValue$$($goog$dom$getElement$$("id_instrument_1"), $allowed_markets_array_e$$146$$[0]), $switchSymbol$$($allowed_markets_array_e$$146$$[0]))
  });
  $model$$.addEventListener("model_setBtcAddress", function($e$$147_qr_code$$1$$) {
    $e$$147_qr_code$$1$$ = "https://chart.googleapis.com/chart?chs=100x100&chld=M%7C0&cht=qr&chl=" + $e$$147_qr_code$$1$$.data;
    btc_adrress_el = $goog$dom$getElement$$("id_bitcoin_address_img");
    btc_adrress_el.setAttribute("src", $e$$147_qr_code$$1$$)
  });
  $model$$.addEventListener("model_setTwoFactorSecret", function($e$$148$$) {
    $goog$style$showElement$$($goog$dom$getElement$$("id_enable_two_factor_div"), $goog$string$isEmpty$$($e$$148$$.data))
  });
  $model$$.addEventListener("model_setTwoFactorEnabled", function($e$$149_enabled$$5$$) {
    $e$$149_enabled$$5$$ = $e$$149_enabled$$5$$.data;
    var $has_secret$$1_secret$$1$$ = $model$$.get("TwoFactorSecret"), $has_secret$$1_secret$$1$$ = $goog$string$isEmpty$$($has_secret$$1_secret$$1$$), $divEl$$2$$ = $goog$dom$getElement$$("id_enable_two_factor_div"), $btnDisableEl$$ = $goog$dom$getElement$$("id_btn_disable_two_factor");
    $goog$style$showElement$$($goog$dom$getElement$$("id_btn_enable_two_factor"), !$e$$149_enabled$$5$$);
    $goog$style$showElement$$($btnDisableEl$$, $e$$149_enabled$$5$$);
    $goog$style$showElement$$($divEl$$2$$, $has_secret$$1_secret$$1$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_enable_two_factor"), "click", function() {
    var $secret$$2$$ = $model$$.get("TwoFactorSecret"), $code$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_step_verification"));
    $bitEx$$.$enableTwoFactor$($JSCompiler_alias_TRUE$$, $secret$$2$$, $code$$5$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_disable_two_factor"), "click", function() {
    $bitEx$$.$enableTwoFactor$($JSCompiler_alias_FALSE$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_forgot_password"), "click", function($e$$152$$) {
    $e$$152$$.stopPropagation();
    $e$$152$$.preventDefault();
    var $email$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email"));
    if($email$$3$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
        try {
          $bitEx$$.open($url$$31$$)
        }catch($e$$153$$) {
          alert("Error connecting to the server...");
          return
        }
        $goog$events$listenOnce$$($bitEx$$, "opened", function() {
          $bitEx$$.$forgotPassword$($email$$3$$)
        })
      }else {
        $bitEx$$.$forgotPassword$($email$$3$$)
      }
      $JSCompiler_StaticMethods_setView$$($router$$, "set_new_password")
    }else {
      alert("Endere\u00e7o de email inv\u00e1lido")
    }
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_set_new_password"), "click", function($e$$155_password2$$1$$) {
    $e$$155_password2$$1$$.stopPropagation();
    $e$$155_password2$$1$$.preventDefault();
    var $token$$12$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_token")), $password$$6$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password"));
    $e$$155_password2$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password2"));
    if($goog$string$isEmpty$$($token$$12$$)) {
      alert("Invalid confirmation code")
    }else {
      if($goog$string$isEmpty$$($password$$6$$) || 6 > $password$$6$$.length) {
        alert("Password must have at least 6 characters")
      }else {
        if($password$$6$$ !== $e$$155_password2$$1$$) {
          alert("Passwords does not match")
        }else {
          if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
            try {
              $bitEx$$.open($url$$31$$)
            }catch($e$$156$$) {
              alert("Error connecting to the server...");
              return
            }
            $goog$events$listenOnce$$($bitEx$$, "opened", function() {
              $bitEx$$.$resetPassword$($token$$12$$, $password$$6$$)
            })
          }else {
            $bitEx$$.$resetPassword$($token$$12$$, $password$$6$$)
          }
        }
      }
    }
  });
  $boleto_buttons_withdraws_component$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
  $goog$array$forEach$$($boleto_buttons_withdraws_component$$, function($boleto_button$$) {
    $goog$events$listen$$($boleto_button$$, "click", function($e$$158_value$$138$$) {
      $e$$158_value$$138$$.stopPropagation();
      $e$$158_value$$138$$.preventDefault();
      var $boleto_id_element$$142$$ = $e$$158_value$$138$$.target;
      $e$$158_value$$138$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_boleto_value"));
      $boleto_id_element$$142$$ = $boleto_id_element$$142$$.getAttribute("data-boleto-id");
      $boleto_id_element$$142$$ != $JSCompiler_alias_NULL$$ && ($goog$string$isEmpty$$($e$$158_value$$138$$) || /[^0-9]/.test($e$$158_value$$138$$) || 0 >= parseInt($e$$158_value$$138$$, 10) ? alert("Por favor, preencha o valor do boleto a ser gerado") : $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U18", BoletoId:$boleto_id_element$$142$$, Value:$e$$158_value$$138$$})))
    })
  });
  $bitEx$$.addEventListener("boleto_options_response", function($boleto_options_group_elements_e$$159$$) {
    var $msg$$60$$ = $boleto_options_group_elements_e$$159$$.data;
    $boleto_options_group_elements_e$$159$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
    $goog$array$forEach$$($boleto_options_group_elements_e$$159$$, function($boleto_options_group_element$$) {
      $goog$dom$removeChildren$$($boleto_options_group_element$$);
      $goog$array$forEach$$($msg$$60$$.BoletoOptionGrp, function($boleto_option_buttonElement$$) {
        $boleto_option_buttonElement$$ = $goog$dom$createDom$$("BUTTON", {"data-boleto-id":$boleto_option_buttonElement$$.BoletoId, "class":"btn btn-primary btn-boleto"}, $boleto_option_buttonElement$$.Description);
        $boleto_options_group_element$$.appendChild($boleto_option_buttonElement$$)
      })
    })
  });
  $bitEx$$.addEventListener("generate_boleto_response", function($e$$160_msg$$61$$) {
    $e$$160_msg$$61$$ = $e$$160_msg$$61$$.data;
    var $dlg$$3$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$3$$, "Boleto");
    $dlg$$3$$.$setContent$('<a  target="_blank" href="/print_boleto?boleto_id=' + $e$$160_msg$$61$$.BoletoId + '" class="btn btn-primary">Print</a> or <a href="/print_boleto?download=1&boleto_id=' + $e$$160_msg$$61$$.BoletoId + '">Download</a>');
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$3$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$3$$.$setVisible$($JSCompiler_alias_TRUE$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_landing_signin"), "click", function($e$$161_username$$8$$) {
    $e$$161_username$$8$$.stopPropagation();
    $e$$161_username$$8$$.preventDefault();
    $e$$161_username$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_username"));
    var $password$$7$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_password"));
    $login$$($e$$161_username$$8$$, $password$$7$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_login"), "click", function($e$$162_username$$9$$) {
    $e$$162_username$$9$$.stopPropagation();
    $e$$162_username$$9$$.preventDefault();
    $e$$162_username$$9$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_username"));
    var $password$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_password"));
    $login$$($e$$162_username$$9$$, $password$$8$$)
  })
});

