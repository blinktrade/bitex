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
function $goog$string$isEmpty$$($str$$17$$) {
  return/^[\s\xa0]*$/.test($str$$17$$)
}
function $goog$string$trim$$($str$$28$$) {
  return $str$$28$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function $goog$string$htmlEscape$$($str$$34$$) {
  if(!$goog$string$allRe_$$.test($str$$34$$)) {
    return $str$$34$$
  }
  -1 != $str$$34$$.indexOf("&") && ($str$$34$$ = $str$$34$$.replace($goog$string$amperRe_$$, "&amp;"));
  -1 != $str$$34$$.indexOf("<") && ($str$$34$$ = $str$$34$$.replace($goog$string$ltRe_$$, "&lt;"));
  -1 != $str$$34$$.indexOf(">") && ($str$$34$$ = $str$$34$$.replace($goog$string$gtRe_$$, "&gt;"));
  -1 != $str$$34$$.indexOf('"') && ($str$$34$$ = $str$$34$$.replace($goog$string$quotRe_$$, "&quot;"));
  return $str$$34$$
}
var $goog$string$amperRe_$$ = /&/g, $goog$string$ltRe_$$ = /</g, $goog$string$gtRe_$$ = />/g, $goog$string$quotRe_$$ = /\"/g, $goog$string$allRe_$$ = /[&<>\"]/;
function $goog$string$regExpEscape$$($s$$12$$) {
  return String($s$$12$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
}
function $goog$string$toCamelCase$$($str$$45$$) {
  return String($str$$45$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  })
}
function $goog$string$toTitleCase$$($str$$47$$) {
  var $delimiters$$ = $goog$isString$$($JSCompiler_alias_VOID$$) ? $goog$string$regExpEscape$$($JSCompiler_alias_VOID$$) : "\\s";
  return $str$$47$$.replace(RegExp("(^" + ($delimiters$$ ? "|[" + $delimiters$$ + "]+" : "") + ")([a-z])", "g"), function($all$$1$$, $p1$$, $p2$$) {
    return $p1$$ + $p2$$.toUpperCase()
  })
}
;
// Input 3
// Input 4
var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$16$$, $obj$$40$$, $opt_fromIndex$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$16$$, $obj$$40$$, $opt_fromIndex$$6$$)
} : function($arr$$17$$, $obj$$41$$, $fromIndex$$2_i$$13_opt_fromIndex$$7$$) {
  $fromIndex$$2_i$$13_opt_fromIndex$$7$$ = $fromIndex$$2_i$$13_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex$$2_i$$13_opt_fromIndex$$7$$ ? Math.max(0, $arr$$17$$.length + $fromIndex$$2_i$$13_opt_fromIndex$$7$$) : $fromIndex$$2_i$$13_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$17$$)) {
    return!$goog$isString$$($obj$$41$$) || 1 != $obj$$41$$.length ? -1 : $arr$$17$$.indexOf($obj$$41$$, $fromIndex$$2_i$$13_opt_fromIndex$$7$$)
  }
  for(;$fromIndex$$2_i$$13_opt_fromIndex$$7$$ < $arr$$17$$.length;$fromIndex$$2_i$$13_opt_fromIndex$$7$$++) {
    if($fromIndex$$2_i$$13_opt_fromIndex$$7$$ in $arr$$17$$ && $arr$$17$$[$fromIndex$$2_i$$13_opt_fromIndex$$7$$] === $obj$$41$$) {
      return $fromIndex$$2_i$$13_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$20$$, $f$$, $opt_obj$$1$$) {
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$20$$, $f$$, $opt_obj$$1$$)
} : function($arr$$21$$, $f$$1$$, $opt_obj$$2$$) {
  for(var $l$$2$$ = $arr$$21$$.length, $arr2$$ = $goog$isString$$($arr$$21$$) ? $arr$$21$$.split("") : $arr$$21$$, $i$$15$$ = 0;$i$$15$$ < $l$$2$$;$i$$15$$++) {
    $i$$15$$ in $arr2$$ && $f$$1$$.call($opt_obj$$2$$, $arr2$$[$i$$15$$], $i$$15$$, $arr$$21$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$23$$, $f$$3$$, $opt_obj$$4$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$23$$, $f$$3$$, $opt_obj$$4$$)
} : function($arr$$24$$, $f$$4$$, $opt_obj$$5$$) {
  for(var $l$$4$$ = $arr$$24$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$24$$) ? $arr$$24$$.split("") : $arr$$24$$, $i$$17$$ = 0;$i$$17$$ < $l$$4$$;$i$$17$$++) {
    if($i$$17$$ in $arr2$$2$$) {
      var $val$$11$$ = $arr2$$2$$[$i$$17$$];
      $f$$4$$.call($opt_obj$$5$$, $val$$11$$, $i$$17$$, $arr$$24$$) && ($res$$[$resLength$$++] = $val$$11$$)
    }
  }
  return $res$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$25$$, $f$$5$$, $opt_obj$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$25$$, $f$$5$$, $opt_obj$$6$$)
} : function($arr$$26$$, $f$$6$$, $opt_obj$$7$$) {
  for(var $l$$5$$ = $arr$$26$$.length, $res$$1$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$26$$) ? $arr$$26$$.split("") : $arr$$26$$, $i$$18$$ = 0;$i$$18$$ < $l$$5$$;$i$$18$$++) {
    $i$$18$$ in $arr2$$3$$ && ($res$$1$$[$i$$18$$] = $f$$6$$.call($opt_obj$$7$$, $arr2$$3$$[$i$$18$$], $i$$18$$, $arr$$26$$))
  }
  return $res$$1$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$31$$, $f$$11$$, $opt_obj$$12$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$31$$, $f$$11$$, $opt_obj$$12$$)
} : function($arr$$32$$, $f$$12$$, $opt_obj$$13$$) {
  for(var $l$$7$$ = $arr$$32$$.length, $arr2$$5$$ = $goog$isString$$($arr$$32$$) ? $arr$$32$$.split("") : $arr$$32$$, $i$$20$$ = 0;$i$$20$$ < $l$$7$$;$i$$20$$++) {
    if($i$$20$$ in $arr2$$5$$ && !$f$$12$$.call($opt_obj$$13$$, $arr2$$5$$[$i$$20$$], $i$$20$$, $arr$$32$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$findIndex$$($arr$$36$$, $f$$15$$) {
  for(var $l$$8$$ = $arr$$36$$.length, $arr2$$6$$ = $goog$isString$$($arr$$36$$) ? $arr$$36$$.split("") : $arr$$36$$, $i$$22$$ = 0;$i$$22$$ < $l$$8$$;$i$$22$$++) {
    if($i$$22$$ in $arr2$$6$$ && $f$$15$$.call($JSCompiler_alias_VOID$$, $arr2$$6$$[$i$$22$$], $i$$22$$, $arr$$36$$)) {
      return $i$$22$$
    }
  }
  return-1
}
function $goog$array$contains$$($arr$$39$$, $obj$$44$$) {
  return 0 <= $goog$array$indexOf$$($arr$$39$$, $obj$$44$$)
}
function $goog$array$remove$$($arr$$46$$, $obj$$48$$) {
  var $i$$27$$ = $goog$array$indexOf$$($arr$$46$$, $obj$$48$$);
  0 <= $i$$27$$ && $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$46$$, $i$$27$$, 1)
}
function $goog$array$toArray$$($object$$2$$) {
  var $length$$15$$ = $object$$2$$.length;
  if(0 < $length$$15$$) {
    for(var $rv$$3$$ = Array($length$$15$$), $i$$30$$ = 0;$i$$30$$ < $length$$15$$;$i$$30$$++) {
      $rv$$3$$[$i$$30$$] = $object$$2$$[$i$$30$$]
    }
    return $rv$$3$$
  }
  return[]
}
function $goog$array$slice$$($arr$$50$$, $start$$6$$, $opt_end$$13$$) {
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$50$$, $start$$6$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$50$$, $start$$6$$, $opt_end$$13$$)
}
;
// Input 5
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
  for(var $i$$42$$ = 0;$i$$42$$ < $args$$8$$.length;$i$$42$$++) {
    $goog$array$contains$$($classes$$2$$, $args$$8$$[$i$$42$$]) || $classes$$2$$.push($args$$8$$[$i$$42$$])
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
// Input 6
function $goog$ui$registry$setDecoratorByClassName$$($className$$10$$, $decoratorFn$$) {
  $className$$10$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$10$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
// Input 7
function $goog$object$forEach$$($obj$$49$$, $f$$19$$, $opt_obj$$22$$) {
  for(var $key$$23$$ in $obj$$49$$) {
    $f$$19$$.call($opt_obj$$22$$, $obj$$49$$[$key$$23$$], $key$$23$$, $obj$$49$$)
  }
}
function $goog$object$getValues$$($obj$$58$$) {
  var $res$$4$$ = [], $i$$45$$ = 0, $key$$31$$;
  for($key$$31$$ in $obj$$58$$) {
    $res$$4$$[$i$$45$$++] = $obj$$58$$[$key$$31$$]
  }
  return $res$$4$$
}
function $goog$object$getKeys$$($obj$$59$$) {
  var $res$$5$$ = [], $i$$46$$ = 0, $key$$32$$;
  for($key$$32$$ in $obj$$59$$) {
    $res$$5$$[$i$$46$$++] = $key$$32$$
  }
  return $res$$5$$
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$48$$, $var_args$$61$$) {
  for(var $key$$46$$, $source$$2$$, $i$$49$$ = 1;$i$$49$$ < arguments.length;$i$$49$$++) {
    $source$$2$$ = arguments[$i$$49$$];
    for($key$$46$$ in $source$$2$$) {
      $target$$48$$[$key$$46$$] = $source$$2$$[$key$$46$$]
    }
    for(var $j$$4$$ = 0;$j$$4$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$4$$++) {
      $key$$46$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$4$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$46$$) && ($target$$48$$[$key$$46$$] = $source$$2$$[$key$$46$$])
    }
  }
}
;
// Input 8
var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_67$$;
if($ua$$inline_67$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_68$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_67$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_67$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_67$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_68$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_70$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_70$$ && $navigator$$inline_70$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_73$$ = "", $re$$inline_74$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_75$$ = $goog$global$$.opera.version, $version$$inline_73$$ = "function" == typeof $operaVersion$$inline_75$$ ? $operaVersion$$inline_75$$() : $operaVersion$$inline_75$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_74$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_74$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_74$$ = /WebKit\/(\S+)/), $re$$inline_74$$) {
      var $arr$$inline_76$$ = $re$$inline_74$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_73$$ = $arr$$inline_76$$ ? $arr$$inline_76$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_77$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_77$$ > parseFloat($version$$inline_73$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_77$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_73$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$47_order$$inline_81$$;
  if(!($JSCompiler_temp$$47_order$$inline_81$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$47_order$$inline_81$$ = 0;
    for(var $v1Subs$$inline_82$$ = $goog$string$trim$$(String($goog$userAgent$VERSION$$)).split("."), $v2Subs$$inline_83$$ = $goog$string$trim$$(String($version$$8$$)).split("."), $subCount$$inline_84$$ = Math.max($v1Subs$$inline_82$$.length, $v2Subs$$inline_83$$.length), $subIdx$$inline_85$$ = 0;0 == $JSCompiler_temp$$47_order$$inline_81$$ && $subIdx$$inline_85$$ < $subCount$$inline_84$$;$subIdx$$inline_85$$++) {
      var $v1Sub$$inline_86$$ = $v1Subs$$inline_82$$[$subIdx$$inline_85$$] || "", $v2Sub$$inline_87$$ = $v2Subs$$inline_83$$[$subIdx$$inline_85$$] || "", $v1CompParser$$inline_88$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_89$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_90$$ = $v1CompParser$$inline_88$$.exec($v1Sub$$inline_86$$) || ["", "", ""], $v2Comp$$inline_91$$ = $v2CompParser$$inline_89$$.exec($v2Sub$$inline_87$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_90$$[0].length && 0 == $v2Comp$$inline_91$$[0].length) {
          break
        }
        $JSCompiler_temp$$47_order$$inline_81$$ = ((0 == $v1Comp$$inline_90$$[1].length ? 0 : parseInt($v1Comp$$inline_90$$[1], 10)) < (0 == $v2Comp$$inline_91$$[1].length ? 0 : parseInt($v2Comp$$inline_91$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_90$$[1].length ? 0 : parseInt($v1Comp$$inline_90$$[1], 10)) > (0 == $v2Comp$$inline_91$$[1].length ? 0 : parseInt($v2Comp$$inline_91$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_90$$[2].length) < (0 == $v2Comp$$inline_91$$[2].length) ? -1 : (0 == $v1Comp$$inline_90$$[2].length) > 
        (0 == $v2Comp$$inline_91$$[2].length) ? 1 : 0) || ($v1Comp$$inline_90$$[2] < $v2Comp$$inline_91$$[2] ? -1 : $v1Comp$$inline_90$$[2] > $v2Comp$$inline_91$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$47_order$$inline_81$$)
    }
    $JSCompiler_temp$$47_order$$inline_81$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$47_order$$inline_81$$
  }
  return $JSCompiler_temp$$47_order$$inline_81$$
}
var $doc$$inline_93$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_93$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_93$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
// Input 9
// Input 10
function $goog$math$Coordinate$$($opt_x$$, $opt_y$$) {
  this.x = $goog$isDef$$($opt_x$$) ? $opt_x$$ : 0;
  this.y = $goog$isDef$$($opt_y$$) ? $opt_y$$ : 0
}
$goog$math$Coordinate$$.prototype.round = function $$goog$math$Coordinate$$$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
// Input 11
function $goog$math$Box$$($top$$2$$, $right$$5$$, $bottom$$1$$, $left$$5$$) {
  this.top = $top$$2$$;
  this.right = $right$$5$$;
  this.bottom = $bottom$$1$$;
  this.left = $left$$5$$
}
$goog$math$Box$$.prototype.contains = function $$goog$math$Box$$$$contains$($other$$4$$) {
  return!this || !$other$$4$$ ? $JSCompiler_alias_FALSE$$ : $other$$4$$ instanceof $goog$math$Box$$ ? $other$$4$$.left >= this.left && $other$$4$$.right <= this.right && $other$$4$$.top >= this.top && $other$$4$$.bottom <= this.bottom : $other$$4$$.x >= this.left && $other$$4$$.x <= this.right && $other$$4$$.y >= this.top && $other$$4$$.y <= this.bottom
};
$goog$math$Box$$.prototype.round = function $$goog$math$Box$$$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this
};
// Input 12
function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
$goog$math$Size$$.prototype.round = function $$goog$math$Size$$$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
// Input 13
function $goog$math$Rect$$($x$$59$$, $y$$37$$, $w$$5$$, $h$$4$$) {
  this.left = $x$$59$$;
  this.top = $y$$37$$;
  this.width = $w$$5$$;
  this.height = $h$$4$$
}
$goog$math$Rect$$.prototype.contains = function $$goog$math$Rect$$$$contains$($another$$) {
  return $another$$ instanceof $goog$math$Rect$$ ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
$goog$math$Rect$$.prototype.round = function $$goog$math$Rect$$$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
// Input 14
// Input 15
// Input 16
var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
// Input 17
function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElement$$($element$$18$$) {
  return $goog$isString$$($element$$18$$) ? document.getElementById($element$$18$$) : $element$$18$$
}
function $goog$dom$getElementsByClass$$($className$$11$$, $opt_el$$1$$) {
  var $parent$$2$$ = $opt_el$$1$$ || document;
  return $parent$$2$$.querySelectorAll && $parent$$2$$.querySelector ? $parent$$2$$.querySelectorAll("." + $className$$11$$) : $parent$$2$$.getElementsByClassName ? $parent$$2$$.getElementsByClassName($className$$11$$) : $goog$dom$getElementsByTagNameAndClass_$$(document, "*", $className$$11$$, $opt_el$$1$$)
}
function $goog$dom$getElementByClass$$($className$$12$$, $opt_el$$2$$) {
  var $parent$$3$$ = $opt_el$$2$$ || document, $retVal$$ = $JSCompiler_alias_NULL$$;
  return($retVal$$ = $parent$$3$$.querySelectorAll && $parent$$3$$.querySelector ? $parent$$3$$.querySelector("." + $className$$12$$) : $goog$dom$getElementsByClass$$($className$$12$$, $opt_el$$2$$)[0]) || $JSCompiler_alias_NULL$$
}
function $goog$dom$getElementsByTagNameAndClass_$$($doc$$6_els_parent$$5$$, $className$$13_opt_tag$$1_tagName$$1$$, $opt_class$$1$$, $arrayLike_opt_el$$3$$) {
  $doc$$6_els_parent$$5$$ = $arrayLike_opt_el$$3$$ || $doc$$6_els_parent$$5$$;
  $className$$13_opt_tag$$1_tagName$$1$$ = $className$$13_opt_tag$$1_tagName$$1$$ && "*" != $className$$13_opt_tag$$1_tagName$$1$$ ? $className$$13_opt_tag$$1_tagName$$1$$.toUpperCase() : "";
  if($doc$$6_els_parent$$5$$.querySelectorAll && $doc$$6_els_parent$$5$$.querySelector && ($className$$13_opt_tag$$1_tagName$$1$$ || $opt_class$$1$$)) {
    return $doc$$6_els_parent$$5$$.querySelectorAll($className$$13_opt_tag$$1_tagName$$1$$ + ($opt_class$$1$$ ? "." + $opt_class$$1$$ : ""))
  }
  if($opt_class$$1$$ && $doc$$6_els_parent$$5$$.getElementsByClassName) {
    $doc$$6_els_parent$$5$$ = $doc$$6_els_parent$$5$$.getElementsByClassName($opt_class$$1$$);
    if($className$$13_opt_tag$$1_tagName$$1$$) {
      $arrayLike_opt_el$$3$$ = {};
      for(var $len$$2$$ = 0, $i$$54$$ = 0, $el$$1$$;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$54$$];$i$$54$$++) {
        $className$$13_opt_tag$$1_tagName$$1$$ == $el$$1$$.nodeName && ($arrayLike_opt_el$$3$$[$len$$2$$++] = $el$$1$$)
      }
      $arrayLike_opt_el$$3$$.length = $len$$2$$;
      return $arrayLike_opt_el$$3$$
    }
    return $doc$$6_els_parent$$5$$
  }
  $doc$$6_els_parent$$5$$ = $doc$$6_els_parent$$5$$.getElementsByTagName($className$$13_opt_tag$$1_tagName$$1$$ || "*");
  if($opt_class$$1$$) {
    $arrayLike_opt_el$$3$$ = {};
    for($i$$54$$ = $len$$2$$ = 0;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$54$$];$i$$54$$++) {
      $className$$13_opt_tag$$1_tagName$$1$$ = $el$$1$$.className, "function" == typeof $className$$13_opt_tag$$1_tagName$$1$$.split && $goog$array$contains$$($className$$13_opt_tag$$1_tagName$$1$$.split(/\s+/), $opt_class$$1$$) && ($arrayLike_opt_el$$3$$[$len$$2$$++] = $el$$1$$)
    }
    $arrayLike_opt_el$$3$$.length = $len$$2$$;
    return $arrayLike_opt_el$$3$$
  }
  return $doc$$6_els_parent$$5$$
}
function $goog$dom$setProperties$$($element$$19$$, $properties$$3$$) {
  $goog$object$forEach$$($properties$$3$$, function($val$$20$$, $key$$47$$) {
    "style" == $key$$47$$ ? $element$$19$$.style.cssText = $val$$20$$ : "class" == $key$$47$$ ? $element$$19$$.className = $val$$20$$ : "for" == $key$$47$$ ? $element$$19$$.htmlFor = $val$$20$$ : $key$$47$$ in $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ ? $element$$19$$.setAttribute($goog$dom$DIRECT_ATTRIBUTE_MAP_$$[$key$$47$$], $val$$20$$) : 0 == $key$$47$$.lastIndexOf("aria-", 0) || 0 == $key$$47$$.lastIndexOf("data-", 0) ? $element$$19$$.setAttribute($key$$47$$, $val$$20$$) : $element$$19$$[$key$$47$$] = 
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
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$68$$) {
  return $goog$dom$createDom_$$(document, arguments)
}
function $goog$dom$createDom_$$($doc$$12$$, $args$$9$$) {
  var $element$$20_tagName$$3_tagNameArr$$ = $args$$9$$[0], $attributes$$ = $args$$9$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$20_tagName$$3_tagNameArr$$ = ["<", $element$$20_tagName$$3_tagNameArr$$];
    $attributes$$.name && $element$$20_tagName$$3_tagNameArr$$.push(' name="', $goog$string$htmlEscape$$($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$20_tagName$$3_tagNameArr$$.push(' type="', $goog$string$htmlEscape$$($attributes$$.type), '"');
      var $clone$$3$$ = {};
      $goog$object$extend$$($clone$$3$$, $attributes$$);
      delete $clone$$3$$.type;
      $attributes$$ = $clone$$3$$
    }
    $element$$20_tagName$$3_tagNameArr$$.push(">");
    $element$$20_tagName$$3_tagNameArr$$ = $element$$20_tagName$$3_tagNameArr$$.join("")
  }
  $element$$20_tagName$$3_tagNameArr$$ = $doc$$12$$.createElement($element$$20_tagName$$3_tagNameArr$$);
  $attributes$$ && ($goog$isString$$($attributes$$) ? $element$$20_tagName$$3_tagNameArr$$.className = $attributes$$ : $goog$isArray$$($attributes$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$20_tagName$$3_tagNameArr$$].concat($attributes$$)) : $goog$dom$setProperties$$($element$$20_tagName$$3_tagNameArr$$, $attributes$$));
  2 < $args$$9$$.length && $goog$dom$append_$$($doc$$12$$, $element$$20_tagName$$3_tagNameArr$$, $args$$9$$, 2);
  return $element$$20_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$13$$, $parent$$6$$, $args$$10$$, $i$$55_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$6$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$13$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$55_startIndex$$ < $args$$10$$.length;$i$$55_startIndex$$++) {
    var $arg$$5$$ = $args$$10$$[$i$$55_startIndex$$];
    if($goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType)) {
      var $JSCompiler_inline_result$$3$$;
      a: {
        if($arg$$5$$ && "number" == typeof $arg$$5$$.length) {
          if($goog$isObject$$($arg$$5$$)) {
            $JSCompiler_inline_result$$3$$ = "function" == typeof $arg$$5$$.item || "string" == typeof $arg$$5$$.item;
            break a
          }
          if($goog$isFunction$$($arg$$5$$)) {
            $JSCompiler_inline_result$$3$$ = "function" == typeof $arg$$5$$.item;
            break a
          }
        }
        $JSCompiler_inline_result$$3$$ = $JSCompiler_alias_FALSE$$
      }
      $goog$array$forEach$$($JSCompiler_inline_result$$3$$ ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$)
    }else {
      $childHandler$$($arg$$5$$)
    }
  }
}
function $goog$dom$append$$($parent$$8$$, $var_args$$69$$) {
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
function $goog$dom$getChildren$$($element$$22$$) {
  return $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ && $element$$22$$.children != $JSCompiler_alias_VOID$$ ? $element$$22$$.children : $goog$array$filter$$($element$$22$$.childNodes, function($node$$8$$) {
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
function $goog$dom$setTextContent$$($element$$24$$, $text$$7$$) {
  if("textContent" in $element$$24$$) {
    $element$$24$$.textContent = $text$$7$$
  }else {
    if($element$$24$$.firstChild && 3 == $element$$24$$.firstChild.nodeType) {
      for(;$element$$24$$.lastChild != $element$$24$$.firstChild;) {
        $element$$24$$.removeChild($element$$24$$.lastChild)
      }
      $element$$24$$.firstChild.data = $text$$7$$
    }else {
      $goog$dom$removeChildren$$($element$$24$$), $element$$24$$.appendChild($goog$dom$getOwnerDocument$$($element$$24$$).createTextNode(String($text$$7$$)))
    }
  }
}
var $goog$dom$TAGS_TO_IGNORE_$$ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, $goog$dom$PREDEFINED_TAG_VALUES_$$ = {IMG:" ", BR:"\n"};
function $goog$dom$isFocusableTabIndex$$($element$$26_index$$55$$) {
  var $attrNode$$ = $element$$26_index$$55$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$26_index$$55$$ = $element$$26_index$$55$$.tabIndex, "number" == typeof $element$$26_index$$55$$ && 0 <= $element$$26_index$$55$$ && 32768 > $element$$26_index$$55$$) : $JSCompiler_alias_FALSE$$
}
function $goog$dom$setFocusableTabIndex$$($element$$27$$, $enable$$) {
  $enable$$ ? $element$$27$$.tabIndex = 0 : ($element$$27$$.tabIndex = -1, $element$$27$$.removeAttribute("tabIndex"))
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
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$31$$) {
  return $goog$isString$$($element$$31$$) ? this.$document_$.getElementById($element$$31$$) : $element$$31$$
};
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$16$$, $opt_el$$6$$) {
  return $goog$dom$getElementByClass$$($className$$16$$, $opt_el$$6$$ || this.$document_$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($tagName$$5$$, $opt_attributes$$1$$, $var_args$$71$$) {
  return $goog$dom$createDom_$$(this.$document_$, arguments)
};
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$64$$) {
  return this.$document_$.createElement($name$$64$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$5$$) {
  return this.$document_$.createTextNode(String($content$$5$$))
};
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_98$$) {
  var $doc$$inline_97_win$$inline_99$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_98$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_98$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_97_win$$inline_99$$.compatMode ? $doc$$inline_97_win$$inline_99$$.documentElement : $doc$$inline_97_win$$inline_99$$.body;
  $doc$$inline_97_win$$inline_99$$ = $goog$dom$getWindow_$$($doc$$inline_97_win$$inline_99$$);
  return new $goog$math$Coordinate$$($doc$$inline_97_win$$inline_99$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_98$$.scrollLeft, $doc$$inline_97_win$$inline_99$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_98$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.$insertChildAt$ = $goog$dom$insertChildAt$$;
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
$JSCompiler_prototypeAlias$$.$getChildren$ = $goog$dom$getChildren$$;
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$setTextContent$ = $goog$dom$setTextContent$$;
// Input 18
function $goog$style$setStyle_$$($element$$33$$, $value$$67$$, $prefixedStyle$$inline_104_style$$1$$) {
  var $camelStyle$$inline_103_propertyName$$8$$;
  a: {
    if($camelStyle$$inline_103_propertyName$$8$$ = $goog$string$toCamelCase$$($prefixedStyle$$inline_104_style$$1$$), $element$$33$$.style[$camelStyle$$inline_103_propertyName$$8$$] === $JSCompiler_alias_VOID$$ && ($prefixedStyle$$inline_104_style$$1$$ = ($goog$userAgent$WEBKIT$$ ? "Webkit" : $goog$userAgent$GECKO$$ ? "Moz" : $goog$userAgent$IE$$ ? "ms" : $goog$userAgent$OPERA$$ ? "O" : $JSCompiler_alias_NULL$$) + $goog$string$toTitleCase$$($prefixedStyle$$inline_104_style$$1$$), $element$$33$$.style[$prefixedStyle$$inline_104_style$$1$$] !== 
    $JSCompiler_alias_VOID$$)) {
      $camelStyle$$inline_103_propertyName$$8$$ = $prefixedStyle$$inline_104_style$$1$$;
      break a
    }
  }
  $camelStyle$$inline_103_propertyName$$8$$ && ($element$$33$$.style[$camelStyle$$inline_103_propertyName$$8$$] = $value$$67$$)
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
function $goog$style$getSizeWithDisplay_$$($doc$$inline_111_element$$56$$) {
  var $offsetWidth_rect$$inline_110$$ = $doc$$inline_111_element$$56$$.offsetWidth, $offsetHeight$$ = $doc$$inline_111_element$$56$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_110$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth_rect$$inline_110$$) || $webkitOffsetsZero$$) && $doc$$inline_111_element$$56$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_110$$ = $doc$$inline_111_element$$56$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_111_element$$56$$ = $doc$$inline_111_element$$56$$.ownerDocument, $offsetWidth_rect$$inline_110$$.left -= $doc$$inline_111_element$$56$$.documentElement.clientLeft + $doc$$inline_111_element$$56$$.body.clientLeft, $offsetWidth_rect$$inline_110$$.top -= 
  $doc$$inline_111_element$$56$$.documentElement.clientTop + $doc$$inline_111_element$$56$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_110$$.right - $offsetWidth_rect$$inline_110$$.left, $offsetWidth_rect$$inline_110$$.bottom - $offsetWidth_rect$$inline_110$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_110$$, $offsetHeight$$)
}
function $goog$style$setOpacity$$($el$$15$$, $alpha$$3$$) {
  var $style$$8$$ = $el$$15$$.style;
  "opacity" in $style$$8$$ ? $style$$8$$.opacity = $alpha$$3$$ : "MozOpacity" in $style$$8$$ ? $style$$8$$.MozOpacity = $alpha$$3$$ : "filter" in $style$$8$$ && ($style$$8$$.filter = "" === $alpha$$3$$ ? "" : "alpha(opacity=" + 100 * $alpha$$3$$ + ")")
}
function $goog$style$showElement$$($el$$18$$, $display$$1$$) {
  $el$$18$$.style.display = $display$$1$$ ? "" : "none"
}
function $goog$style$isRightToLeft$$($el$$22$$) {
  return"rtl" == $goog$style$getStyle_$$($el$$22$$, "direction")
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$, $goog$style$ieBorderWidthKeywords_$$ = {thin:2, medium:4, thick:6};
function $goog$style$getIePixelBorder_$$($element$$69$$, $prop$$4$$) {
  if("none" == ($element$$69$$.currentStyle ? $element$$69$$.currentStyle[$prop$$4$$ + "Style"] : $JSCompiler_alias_NULL$$)) {
    return 0
  }
  var $pixelValue$$inline_119_width$$15$$ = $element$$69$$.currentStyle ? $element$$69$$.currentStyle[$prop$$4$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$36_oldStyleValue$$inline_117$$;
  if($pixelValue$$inline_119_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$36_oldStyleValue$$inline_117$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_119_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_119_width$$15$$)) {
      $JSCompiler_temp$$36_oldStyleValue$$inline_117$$ = parseInt($pixelValue$$inline_119_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$36_oldStyleValue$$inline_117$$ = $element$$69$$.style.left;
      var $oldRuntimeValue$$inline_118$$ = $element$$69$$.runtimeStyle.left;
      $element$$69$$.runtimeStyle.left = $element$$69$$.currentStyle.left;
      $element$$69$$.style.left = $pixelValue$$inline_119_width$$15$$;
      $pixelValue$$inline_119_width$$15$$ = $element$$69$$.style.pixelLeft;
      $element$$69$$.style.left = $JSCompiler_temp$$36_oldStyleValue$$inline_117$$;
      $element$$69$$.runtimeStyle.left = $oldRuntimeValue$$inline_118$$;
      $JSCompiler_temp$$36_oldStyleValue$$inline_117$$ = $pixelValue$$inline_119_width$$15$$
    }
  }
  return $JSCompiler_temp$$36_oldStyleValue$$inline_117$$
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
// Input 19
// Input 20
// Input 21
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
// Input 22
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
// Input 23
var $goog$events$ListenableKey$counter_$$ = 0;
// Input 24
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
// Input 25
var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
// Input 26
// Input 27
// Input 28
// Input 29
function $goog$reflect$sinkValue$$($x$$62$$) {
  $goog$reflect$sinkValue$$[" "]($x$$62$$);
  return $x$$62$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
// Input 30
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
      var $JSCompiler_inline_result$$41$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$41$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_123$$) {
        }
        $JSCompiler_inline_result$$41$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$41$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
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
// Input 31
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($listenableKey_src$$8$$, $key$$49_type$$61$$, $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$) {
  if($goog$isArray$$($key$$49_type$$61$$)) {
    for(var $i$$64$$ = 0;$i$$64$$ < $key$$49_type$$61$$.length;$i$$64$$++) {
      $goog$events$listen$$($listenableKey_src$$8$$, $key$$49_type$$61$$[$i$$64$$], $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$)
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
    for(var $i$$65_proxy$$1$$ = 0;$i$$65_proxy$$1$$ < $listenerArray$$.length;$i$$65_proxy$$1$$++) {
      if($listenerObj_map$$ = $listenerArray$$[$i$$65_proxy$$1$$], $listenerObj_map$$.$listener$ == $listener$$36$$ && $listenerObj_map$$.$handler$ == $opt_handler$$2$$) {
        if($listenerObj_map$$.$removed$) {
          break
        }
        $callOnce$$ || ($listenerArray$$[$i$$65_proxy$$1$$].$callOnce$ = $JSCompiler_alias_FALSE$$);
        return $listenerArray$$[$i$$65_proxy$$1$$]
      }
    }
  }else {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
  }
  $i$$65_proxy$$1$$ = $goog$events$getProxy$$();
  $listenerObj_map$$ = new $goog$events$Listener$$;
  $listenerObj_map$$.init($listener$$36$$, $i$$65_proxy$$1$$, $src$$9$$, $type$$62$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$);
  $listenerObj_map$$.$callOnce$ = $callOnce$$;
  $i$$65_proxy$$1$$.src = $src$$9$$;
  $i$$65_proxy$$1$$.$listener$ = $listenerObj_map$$;
  $listenerArray$$.push($listenerObj_map$$);
  $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
  $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
  $src$$9$$.addEventListener ? ($src$$9$$ == $goog$global$$ || !$src$$9$$.$customEvent_$) && $src$$9$$.addEventListener($type$$62$$, $i$$65_proxy$$1$$, $capture$$1_opt_capt$$3$$) : $src$$9$$.attachEvent($type$$62$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$62$$] : $goog$events$onStringMap_$$[$type$$62$$] = "on" + $type$$62$$, $i$$65_proxy$$1$$);
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
    for(var $i$$66$$ = 0;$i$$66$$ < $type$$63$$.length;$i$$66$$++) {
      $goog$events$listenOnce$$($listenableKey$$1_src$$10$$, $type$$63$$[$i$$66$$], $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$)
    }
  }else {
    $listenableKey$$1_src$$10$$ = $goog$events$listen_$$($listenableKey$$1_src$$10$$, $type$$63$$, $listener$$37$$, $JSCompiler_alias_TRUE$$, $opt_capt$$4$$, $opt_handler$$3$$), $goog$events$listeners_$$[$listenableKey$$1_src$$10$$.key] = $listenableKey$$1_src$$10$$
  }
}
function $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$, $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$) {
  if($goog$isArray$$($type$$64$$)) {
    for(var $i$$67$$ = 0;$i$$67$$ < $type$$64$$.length;$i$$67$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$12$$, $type$$64$$[$i$$67$$], $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$)
    }
  }else {
    if($capture$$2_opt_capt$$6$$ = !!$capture$$2_opt_capt$$6$$, $listenerArray$$1_src$$12$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$12$$, $type$$64$$, $capture$$2_opt_capt$$6$$)) {
      for($i$$67$$ = 0;$i$$67$$ < $listenerArray$$1_src$$12$$.length;$i$$67$$++) {
        if($listenerArray$$1_src$$12$$[$i$$67$$].$listener$ == $listener$$39$$ && $listenerArray$$1_src$$12$$[$i$$67$$].capture == $capture$$2_opt_capt$$6$$ && $listenerArray$$1_src$$12$$[$i$$67$$].$handler$ == $opt_handler$$5$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$12$$[$i$$67$$].key);
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
      for(var $i$$68$$ = $opt_obj$$27_sourcesArray$$1_srcUid$$3$$.length - 1;0 <= $i$$68$$;$i$$68$$--) {
        $goog$events$unlistenByKey$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$[$i$$68$$].key), $count$$9$$++
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
      for(var $length$$16$$ = $listenerArray$$5$$.length, $i$$70$$ = 0;$i$$70$$ < $length$$16$$;$i$$70$$++) {
        var $listener$$46$$ = $listenerArray$$5$$[$i$$70$$];
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
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_part$$inline_132_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$;
    if(!($JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$ = ["window", "event"];
        for(var $cur$$inline_131_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_132_retval$$1$$ = $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$.shift();) {
          if($cur$$inline_131_hasBubble$$1$$[$ieEvent_part$$inline_132_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_131_hasBubble$$1$$ = $cur$$inline_131_hasBubble$$1$$[$ieEvent_part$$inline_132_retval$$1$$]
          }else {
            $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$ = $cur$$inline_131_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_132_retval$$1$$ = $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$;
    $JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_131_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$) {
      if(0 > $ieEvent_part$$inline_132_retval$$1$$.keyCode || $ieEvent_part$$inline_132_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_135$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_132_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_132_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_136$$) {
            $evt$$16_useReturnValue$$inline_135$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_135$$ || $ieEvent_part$$inline_132_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_132_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_135$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_135$$.init($ieEvent_part$$inline_132_retval$$1$$, this);
    $ieEvent_part$$inline_132_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$23_hasCapture$$2_parts$$inline_130$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_135$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$72$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_135$$.$propagationStopped_$ && 0 <= $i$$72$$ && $targetsMap$$1$$.$remaining_$;$i$$72$$--) {
          $evt$$16_useReturnValue$$inline_135$$.currentTarget = $ancestors$$2$$[$i$$72$$], $ieEvent_part$$inline_132_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$72$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_135$$)
        }
        if($cur$$inline_131_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$72$$ = 0;!$evt$$16_useReturnValue$$inline_135$$.$propagationStopped_$ && $i$$72$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$72$$++) {
            $evt$$16_useReturnValue$$inline_135$$.currentTarget = $ancestors$$2$$[$i$$72$$], $ieEvent_part$$inline_132_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$72$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_135$$)
          }
        }
      }else {
        $ieEvent_part$$inline_132_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_135$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_132_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_132_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
}
;
// Input 32
function $goog$events$EventHandler$$($opt_handler$$8$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$8$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$17$$, $type$$75$$, $opt_fn$$4$$, $opt_capture$$1$$) {
  $goog$isArray$$($type$$75$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$75$$, $type$$75$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$73$$ = 0;$i$$73$$ < $type$$75$$.length;$i$$73$$++) {
    var $key$$54$$ = $goog$events$listen$$($src$$17$$, $type$$75$$[$i$$73$$], $opt_fn$$4$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$54$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$, $i$$inline_146_type$$77$$, $listener$$inline_141_opt_fn$$6$$, $capture$$inline_144_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_143$$) {
  if($goog$isArray$$($i$$inline_146_type$$77$$)) {
    for(var $i$$75$$ = 0;$i$$75$$ < $i$$inline_146_type$$77$$.length;$i$$75$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$, $i$$inline_146_type$$77$$[$i$$75$$], $listener$$inline_141_opt_fn$$6$$, $capture$$inline_144_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_143$$)
    }
  }else {
    a: {
      $listener$$inline_141_opt_fn$$6$$ = $listener$$inline_141_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_143$$ = $opt_handler$$12_opt_handler$$inline_143$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_144_opt_capture$$3$$ = !!$capture$$inline_144_opt_capture$$3$$;
      if($key$$56_listener$$51_listenerArray$$inline_145_src$$20$$ = $goog$events$getListeners_$$($key$$56_listener$$51_listenerArray$$inline_145_src$$20$$, $i$$inline_146_type$$77$$, $capture$$inline_144_opt_capture$$3$$)) {
        for($i$$inline_146_type$$77$$ = 0;$i$$inline_146_type$$77$$ < $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$.length;$i$$inline_146_type$$77$$++) {
          if(!$key$$56_listener$$51_listenerArray$$inline_145_src$$20$$[$i$$inline_146_type$$77$$].$removed$ && $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$[$i$$inline_146_type$$77$$].$listener$ == $listener$$inline_141_opt_fn$$6$$ && $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$[$i$$inline_146_type$$77$$].capture == $capture$$inline_144_opt_capture$$3$$ && $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$[$i$$inline_146_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_143$$) {
            $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$ = $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$[$i$$inline_146_type$$77$$];
            break a
          }
        }
      }
      $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$ && ($key$$56_listener$$51_listenerArray$$inline_145_src$$20$$ = $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$.key, $goog$events$unlistenByKey$$($key$$56_listener$$51_listenerArray$$inline_145_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$56_listener$$51_listenerArray$$inline_145_src$$20$$))
  }
  return $JSCompiler_StaticMethods_unlisten$self$$
}
function $JSCompiler_StaticMethods_removeAll$$($JSCompiler_StaticMethods_removeAll$self$$) {
  $goog$array$forEach$$($JSCompiler_StaticMethods_removeAll$self$$.$keys_$, $goog$events$unlistenByKey$$);
  $JSCompiler_StaticMethods_removeAll$self$$.$keys_$.length = 0
}
$goog$events$EventHandler$$.prototype.$disposeInternal$ = function $$goog$events$EventHandler$$$$$disposeInternal$$() {
  $goog$events$EventHandler$$.$superClass_$.$disposeInternal$.call(this);
  $JSCompiler_StaticMethods_removeAll$$(this)
};
$goog$events$EventHandler$$.prototype.handleEvent = function $$goog$events$EventHandler$$$$handleEvent$() {
  $JSCompiler_alias_THROW$$(Error("EventHandler.handleEvent not implemented"))
};
// Input 33
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
// Input 34
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
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$30_e$$24_e$$inline_149$$) {
  var $hasCapture$$inline_155_type$$inline_150$$ = $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.type || $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$, $map$$inline_151$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_155_type$$inline_150$$ in $map$$inline_151$$) {
    if($goog$isString$$($JSCompiler_inline_result$$30_e$$24_e$$inline_149$$)) {
      $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$ = new $goog$events$Event$$($JSCompiler_inline_result$$30_e$$24_e$$inline_149$$, this)
    }else {
      if($JSCompiler_inline_result$$30_e$$24_e$$inline_149$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.target = $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.target || this
      }else {
        var $oldEvent$$inline_152_rv$$inline_153$$ = $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$;
        $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$ = new $goog$events$Event$$($hasCapture$$inline_155_type$$inline_150$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$30_e$$24_e$$inline_149$$, $oldEvent$$inline_152_rv$$inline_153$$)
      }
    }
    var $oldEvent$$inline_152_rv$$inline_153$$ = 1, $ancestors$$inline_154_current$$inline_159$$, $map$$inline_151$$ = $map$$inline_151$$[$hasCapture$$inline_155_type$$inline_150$$], $hasCapture$$inline_155_type$$inline_150$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_151$$, $parent$$inline_157_targetsMap$$inline_156$$;
    if($hasCapture$$inline_155_type$$inline_150$$) {
      $ancestors$$inline_154_current$$inline_159$$ = [];
      for($parent$$inline_157_targetsMap$$inline_156$$ = this;$parent$$inline_157_targetsMap$$inline_156$$;$parent$$inline_157_targetsMap$$inline_156$$ = $parent$$inline_157_targetsMap$$inline_156$$.$parentEventTarget_$) {
        $ancestors$$inline_154_current$$inline_159$$.push($parent$$inline_157_targetsMap$$inline_156$$)
      }
      $parent$$inline_157_targetsMap$$inline_156$$ = $map$$inline_151$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_157_targetsMap$$inline_156$$.$remaining_$ = $parent$$inline_157_targetsMap$$inline_156$$.$count_$;
      for(var $i$$inline_158$$ = $ancestors$$inline_154_current$$inline_159$$.length - 1;!$JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$propagationStopped_$ && 0 <= $i$$inline_158$$ && $parent$$inline_157_targetsMap$$inline_156$$.$remaining_$;$i$$inline_158$$--) {
        $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.currentTarget = $ancestors$$inline_154_current$$inline_159$$[$i$$inline_158$$], $oldEvent$$inline_152_rv$$inline_153$$ &= $goog$events$fireListeners_$$($parent$$inline_157_targetsMap$$inline_156$$, $ancestors$$inline_154_current$$inline_159$$[$i$$inline_158$$], $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$) && $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_151$$) {
      if($parent$$inline_157_targetsMap$$inline_156$$ = $map$$inline_151$$[$JSCompiler_alias_FALSE$$], $parent$$inline_157_targetsMap$$inline_156$$.$remaining_$ = $parent$$inline_157_targetsMap$$inline_156$$.$count_$, $hasCapture$$inline_155_type$$inline_150$$) {
        for($i$$inline_158$$ = 0;!$JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$propagationStopped_$ && $i$$inline_158$$ < $ancestors$$inline_154_current$$inline_159$$.length && $parent$$inline_157_targetsMap$$inline_156$$.$remaining_$;$i$$inline_158$$++) {
          $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.currentTarget = $ancestors$$inline_154_current$$inline_159$$[$i$$inline_158$$], $oldEvent$$inline_152_rv$$inline_153$$ &= $goog$events$fireListeners_$$($parent$$inline_157_targetsMap$$inline_156$$, $ancestors$$inline_154_current$$inline_159$$[$i$$inline_158$$], $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$) && $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_154_current$$inline_159$$ = this;!$JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$propagationStopped_$ && $ancestors$$inline_154_current$$inline_159$$ && $parent$$inline_157_targetsMap$$inline_156$$.$remaining_$;$ancestors$$inline_154_current$$inline_159$$ = $ancestors$$inline_154_current$$inline_159$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.currentTarget = $ancestors$$inline_154_current$$inline_159$$, $oldEvent$$inline_152_rv$$inline_153$$ &= $goog$events$fireListeners_$$($parent$$inline_157_targetsMap$$inline_156$$, $ancestors$$inline_154_current$$inline_159$$, $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$) && $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$ = Boolean($oldEvent$$inline_152_rv$$inline_153$$)
  }else {
    $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$30_e$$24_e$$inline_149$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
// Input 35
function $goog$ui$Component$$($opt_domHelper$$) {
  $goog$Disposable$$.call(this);
  this.$dom_$ = $opt_domHelper$$ || $goog$dom$getDomHelper$$();
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
    var $obj$$inline_162_obj$$inline_474$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_475$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_475$$ in $obj$$inline_162_obj$$inline_474$$ && delete $obj$$inline_162_obj$$inline_474$$[$key$$inline_475$$];
    $obj$$inline_162_obj$$inline_474$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$;
    $id$$3$$ in $obj$$inline_162_obj$$inline_474$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $id$$3$$ + '"'));
    $obj$$inline_162_obj$$inline_474$$[$id$$3$$] = $JSCompiler_StaticMethods_setId$self$$
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$3$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$18$$) {
  return this.$element_$ ? this.$dom_$.$getElementByClass$($className$$18$$, this.$element_$) : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$googUiComponentHandler_$ || (this.$googUiComponentHandler_$ = new $goog$events$EventHandler$$(this))
};
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
  this.$googUiComponentHandler_$ && $JSCompiler_StaticMethods_removeAll$$(this.$googUiComponentHandler_$);
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
    var $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $JSCompiler_StaticMethods_getId$$($child$$15$$), $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$;
    this.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ ? ($JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ = this.$childIndex_$, $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ = ($JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ in $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ ? $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$[$JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$] : $JSCompiler_alias_VOID$$) || 
    $JSCompiler_alias_NULL$$) : $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ = $JSCompiler_alias_NULL$$;
    $child$$15$$ = $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$;
    $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ && $child$$15$$ && ($JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ = this.$childIndex_$, $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ in $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$ && delete $JSCompiler_temp$$inline_483_obj$$inline_484_obj$$inline_487$$[$JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$], $goog$array$remove$$(this.$children_$, $child$$15$$), $opt_unrender$$ && 
    ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$)), $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ = $child$$15$$, $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$ == $JSCompiler_alias_NULL$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component")), $JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$.$parent_$ = $JSCompiler_alias_NULL$$, $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$inline_170_id$$6$$, 
    $JSCompiler_alias_NULL$$))
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
// Input 36
function $bitex$ui$DataGrid$$($options$$6$$, $opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$);
  this.$columns_$ = $options$$6$$.columns;
  this.$row_class_fn_$ = $options$$6$$.rowClassFn || $goog$nullFunction$$;
  this.$current_page_$ = $options$$6$$.currentPage || 0;
  this.$limit_$ = $options$$6$$.limit || 100;
  this.$sort_column_$ = "";
  this.$sort_direction_$ = "up";
  this.$loading_data_$ = $goog$dom$createDom$$("div", ["progress", "progress-striped", "active"], $goog$dom$createDom$$("div", "bar"));
  $goog$style$setWidth$$(this.$loading_data_$, "50%");
  var $element$$inline_173$$ = this.$loading_data_$;
  $goog$isString$$("margin") ? $goog$style$setStyle_$$($element$$inline_173$$, "auto", "margin") : $goog$object$forEach$$("margin", $goog$partial$$($goog$style$setStyle_$$, $element$$inline_173$$));
  $goog$style$setWidth$$($goog$dom$getFirstElementChild$$(this.$loading_data_$), "100%")
}
$goog$inherits$$($bitex$ui$DataGrid$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$DataGrid$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("datagrid");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$76$$) {
  this.$element_$ = $element$$76$$;
  var $table_header_element$$ = $goog$dom$getFirstElementChild$$($element$$76$$);
  $goog$dom$classes$add$$($table_header_element$$, this.$getBaseCssClass$());
  var $thead_element$$ = $goog$dom$getFirstElementChild$$($table_header_element$$);
  $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($thead_element$$)).setAttribute("colspan", this.$columns_$.length);
  this.$th_sizing_el_$ = $goog$dom$createDom$$("tr");
  this.$tr_columns_el_$ = $goog$dom$createDom$$("tr");
  $goog$array$forEach$$(this.$columns_$, function($child$$inline_181_column$$) {
    var $th_column_properties$$ = {"data-property":$child$$inline_181_column$$.property};
    $child$$inline_181_column$$.sortable && ($th_column_properties$$["class"] = "sortable");
    var $child$$inline_178$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_181_column$$.label);
    this.$tr_columns_el_$.appendChild($child$$inline_178$$);
    $child$$inline_181_column$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_181_column$$.label);
    this.$th_sizing_el_$.appendChild($child$$inline_181_column$$)
  }, this);
  $thead_element$$.appendChild(this.$tr_columns_el_$);
  this.$table_data_body_el_$ = $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($goog$dom$getNextElementSibling$$($table_header_element$$)));
  this.$element_start_counter_$ = $goog$dom$getElementByClass$$("grid-start", $element$$76$$);
  this.$element_end_counter_$ = $goog$dom$getElementByClass$$("grid-end", $element$$76$$);
  this.$element_prev_button_$ = $goog$dom$getElementByClass$$("grid-prevpage", $element$$76$$);
  this.$element_next_button_$ = $goog$dom$getElementByClass$$("grid-nextpage", $element$$76$$)
};
$JSCompiler_prototypeAlias$$.$handlePreviousPage_$ = function $$JSCompiler_prototypeAlias$$$$handlePreviousPage_$$() {
  0 >= this.$current_page_$ || (this.$current_page_$ -= 1, this.$render_$())
};
$JSCompiler_prototypeAlias$$.$handleNextPage_$ = function $$JSCompiler_prototypeAlias$$$$handleNextPage_$$() {
  this.$current_page_$ += 1;
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$handleColumnClick_$ = function $$JSCompiler_prototypeAlias$$$$handleColumnClick_$$($e$$28_other_sorted_column_elements_sort_indicator_element$$) {
  var $classToRemove_element$$77$$ = $e$$28_other_sorted_column_elements_sort_indicator_element$$.target;
  if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$77$$), "sortable")) {
    this.$sort_column_$ = $classToRemove_element$$77$$.getAttribute("data-property");
    if($goog$array$contains$$($goog$dom$classes$get$$($classToRemove_element$$77$$), "sorted")) {
      $e$$28_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $classToRemove_element$$77$$);
      var $classToAdd$$;
      $goog$array$contains$$($goog$dom$classes$get$$($e$$28_other_sorted_column_elements_sort_indicator_element$$), "icon-chevron-up") ? ($classToRemove_element$$77$$ = "icon-chevron-up", $classToAdd$$ = "icon-chevron-down", this.$sort_direction_$ = "ASC") : ($classToRemove_element$$77$$ = "icon-chevron-down", $classToAdd$$ = "icon-chevron-up", this.$sort_direction_$ = "DESC");
      $goog$dom$classes$addRemove$$($e$$28_other_sorted_column_elements_sort_indicator_element$$, $classToRemove_element$$77$$, $classToAdd$$)
    }else {
      $e$$28_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$getElementsByClass$$("sorted", this.$tr_columns_el_$), $goog$array$forEach$$($e$$28_other_sorted_column_elements_sort_indicator_element$$, function($other_sort_indicator_element_other_sorted_column_element$$) {
        $goog$dom$classes$remove$$($other_sort_indicator_element_other_sorted_column_element$$, "sorted");
        $other_sort_indicator_element_other_sorted_column_element$$ = $goog$dom$getElementByClass$$("datagrid-sort", $other_sort_indicator_element_other_sorted_column_element$$);
        $other_sort_indicator_element_other_sorted_column_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($other_sort_indicator_element_other_sorted_column_element$$)
      }, this), $e$$28_other_sorted_column_elements_sort_indicator_element$$ = $goog$dom$createDom$$("i", ["icon-chevron-up", "datagrid-sort"]), $classToRemove_element$$77$$.appendChild($e$$28_other_sorted_column_elements_sort_indicator_element$$), this.$sort_direction_$ = "DESC", $goog$dom$classes$add$$($classToRemove_element$$77$$, "sorted")
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
  var $handler$$42$$ = this.$getHandler$();
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$element_prev_button_$, "click", this.$handlePreviousPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$element_next_button_$, "click", this.$handleNextPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$42$$, this.$tr_columns_el_$, "click", this.$handleColumnClick_$);
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.reload = function $$JSCompiler_prototypeAlias$$$reload$() {
  this.$render_$()
};
function $JSCompiler_StaticMethods_setColumnValue$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$, $row_element_td_element$$, $column$$2_index$$61$$, $value$$76$$) {
  var $result_set_col_index$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$.$columns_$, function($this_col$$, $index_row_set$$) {
    $result_set_col_index$$[$this_col$$.property] = $index_row_set$$
  });
  $column$$2_index$$61$$ = $result_set_col_index$$[$column$$2_index$$61$$];
  if($column$$2_index$$61$$ != $JSCompiler_alias_NULL$$) {
    $row_element_td_element$$ = $goog$dom$getChildren$$($row_element_td_element$$)[$column$$2_index$$61$$];
    var $currentValue$$ = $goog$dom$getTextContent$$($row_element_td_element$$);
    $JSCompiler_StaticMethods_setColumnValue$self_new_value$$ = ($JSCompiler_StaticMethods_setColumnValue$self_new_value$$.$columns_$[$column$$2_index$$61$$].formatter || function() {
      return"" + $value$$76$$
    })($value$$76$$);
    if($currentValue$$ !== $JSCompiler_StaticMethods_setColumnValue$self_new_value$$ && $goog$isString$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$)) {
      return $goog$dom$setTextContent$$($row_element_td_element$$, $JSCompiler_StaticMethods_setColumnValue$self_new_value$$), $row_element_td_element$$
    }
  }
}
function $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_resultSetToElements$self$$, $resultSet$$, $columns$$3$$) {
  var $elements$$1$$ = [], $result_set_col_index$$1$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_resultSetToElements$self$$.$columns_$, function($this_col$$1$$, $index_row_set$$1$$) {
    var $index$$62$$ = $goog$array$findIndex$$($columns$$3$$, function($col$$) {
      return $col$$ == $this_col$$1$$.property
    });
    $result_set_col_index$$1$$[$index$$62$$] = $index_row_set$$1$$
  });
  $goog$array$forEach$$($resultSet$$, function($row_set$$) {
    var $row_set_obj$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$77$$, $result_set_index$$) {
      var $index$$63$$ = $result_set_col_index$$1$$[$result_set_index$$];
      $index$$63$$ != $JSCompiler_alias_NULL$$ && ($row_set_obj$$[this.$columns_$[$index$$63$$].property] = $value$$77$$)
    }, this);
    var $tr$$ = $goog$dom$createDom$$("tr", this.$row_class_fn_$($row_set_obj$$)), $td_elements$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$78$$, $result_set_index$$1$$) {
      var $index$$64$$ = $result_set_col_index$$1$$[$result_set_index$$1$$];
      if($index$$64$$ != $JSCompiler_alias_NULL$$) {
        var $formatter$$1_td$$ = this.$columns_$[$index$$64$$].formatter || function() {
          return"" + $value$$78$$
        }, $formatter$$1_td$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$64$$].classes || $goog$nullFunction$$)($value$$78$$), $formatter$$1_td$$($value$$78$$));
        $td_elements$$[this.$columns_$[$index$$64$$].property] = $formatter$$1_td$$
      }
    }, this);
    $goog$array$forEach$$(this.$columns_$, function($col$$1_td$$1$$) {
      $col$$1_td$$1$$ = $td_elements$$[$col$$1_td$$1$$.property];
      $col$$1_td$$1$$ != $JSCompiler_alias_NULL$$ || ($col$$1_td$$1$$ = $goog$dom$createDom$$("td", $JSCompiler_alias_VOID$$, ""));
      $tr$$.appendChild($col$$1_td$$1$$)
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
  var $el_size$$inline_204_sizing_row$$inline_200$$ = $JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $work_col_1$$inline_201$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$tr_columns_el_$), $work_col_2$$inline_202$$ = $goog$dom$getFirstElementChild$$($first_row$$1$$), $sizing_col$$inline_203$$ = $goog$dom$getFirstElementChild$$($el_size$$inline_204_sizing_row$$inline_200$$);
  for($goog$dom$getChildren$$($el_size$$inline_204_sizing_row$$inline_200$$);$sizing_col$$inline_203$$ != $JSCompiler_alias_NULL$$;) {
    $el_size$$inline_204_sizing_row$$inline_200$$ = $goog$style$getSize$$($sizing_col$$inline_203$$), $goog$style$setWidth$$($work_col_1$$inline_201$$, $el_size$$inline_204_sizing_row$$inline_200$$.width), $goog$style$setWidth$$($work_col_2$$inline_202$$, $el_size$$inline_204_sizing_row$$inline_200$$.width), $work_col_1$$inline_201$$ = $goog$dom$getNextElementSibling$$($work_col_1$$inline_201$$), $work_col_2$$inline_202$$ = $goog$dom$getNextElementSibling$$($work_col_2$$inline_202$$), $sizing_col$$inline_203$$ = 
    $goog$dom$getNextElementSibling$$($sizing_col$$inline_203$$)
  }
  $goog$dom$removeNode$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$)
}
function $bitex$ui$DataGridEvent$$($type$$91$$, $options$$8$$) {
  $goog$events$Event$$.call(this, $type$$91$$);
  this.options = $options$$8$$
}
$goog$inherits$$($bitex$ui$DataGridEvent$$, $goog$events$Event$$);
// Input 37
function $bitex$ui$AccountActivity$$($opt_domHelper$$2$$) {
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-order-id"
  }}, {property:"Side", label:"C/V", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$17$$) {
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
  }}, {property:"Price", label:"Pre\u00e7o R$", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$18$$) {
    return($s$$18$$ / 1E5).toFixed(5)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-price"
  }}, {property:"CumQty", label:"Volume BTC", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$19$$) {
    return($s$$19$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Pre\u00e7o m\u00e9dio R$", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$20$$) {
    return($s$$20$$ / 1E5).toFixed(2)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-avg-price"
  }}, {property:"Volume", label:"Valor R$", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$21$$) {
    return($s$$21$$ / 1E5).toFixed(2)
  }, classes:function() {
    return $bitex$ui$AccountActivity$CSS_CLASS$$ + "-vol"
  }}]}, $opt_domHelper$$2$$)
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
// Input 38
function $bitex$ui$OrderManager$$($opt_blinkDelay$$, $opt_domHelper$$3$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$ || 700;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-id"
  }}, {property:"OrdStatus", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$22$$) {
    return $bitex$ui$OrderManager$Status$$[$s$$22$$]
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-status"
  }}, {property:"Side", label:"C/V", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$23$$) {
    switch($s$$23$$) {
      case "1":
        return"C";
      case "2":
        return"V"
    }
    return""
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-side"
  }}, {property:"OrderQty", label:"Vol. BTC", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$24$$) {
    return($s$$24$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-qty"
  }}, {property:"Price", label:"Pre\u00e7o R$", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$25$$) {
    return($s$$25$$ / 1E5).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-price"
  }}, {property:"LeavesQty", label:"BTC em aberto", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$26$$) {
    return($s$$26$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-leaves_qty"
  }}, {property:"CumQty", label:"BTC executado", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$27$$) {
    return($s$$27$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Pre\u00e7o m\u00e9dio", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$28$$) {
    return($s$$28$$ / 1E5).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-avg-price"
  }}, {property:"ClOrdID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, formatter:function($i$$83_id$$7$$) {
    $i$$83_id$$7$$ = $goog$dom$createDom$$("i", {"class":"icon-remove", "data-client-order-id":$i$$83_id$$7$$});
    return $goog$dom$createDom$$("a", {"class":"text-error", href:"#"}, $i$$83_id$$7$$)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$3$$)
}
$goog$inherits$$($bitex$ui$OrderManager$$, $bitex$ui$DataGrid$$);
var $bitex$ui$OrderManager$Status$$ = {"-":"pendente", 0:"nova", 1:"exec. parcial", 2:"executada", 4:"cancelada"}, $bitex$ui$OrderManager$CSS_CLASS$$ = "order-manager";
$bitex$ui$OrderManager$$.prototype.$getCssClass$ = function $$bitex$ui$OrderManager$$$$$getCssClass$$() {
  return $bitex$ui$OrderManager$CSS_CLASS$$
};
$bitex$ui$OrderManager$$.prototype.$getRowClass$ = function $$bitex$ui$OrderManager$$$$$getRowClass$$($row_set$$2$$) {
  var $class_id$$ = "client-order-id-" + $row_set$$2$$.ClOrdID, $class_status$$1$$;
  switch($row_set$$2$$.OrdStatus) {
    case "-":
      $class_status$$1$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-pending";
      break;
    case "0":
      $class_status$$1$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-new";
      break;
    case "1":
      $class_status$$1$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-partial";
      break;
    case "2":
      $class_status$$1$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-fill";
      break;
    case "4":
      $class_status$$1$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-cancel"
  }
  return[$class_id$$, $class_status$$1$$]
};
function $JSCompiler_StaticMethods_processExecutionReport$$($JSCompiler_StaticMethods_processExecutionReport$self$$, $execution_report_msg$$) {
  var $tr_element$$ = $goog$dom$getElementByClass$$("client-order-id-" + $execution_report_msg$$.ClOrdID, $JSCompiler_StaticMethods_processExecutionReport$self$$.$getElement$());
  if(0 === $execution_report_msg$$.LeavesQty) {
    $tr_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($tr_element$$)
  }else {
    if($tr_element$$ != $JSCompiler_alias_NULL$$) {
      $goog$object$forEach$$($execution_report_msg$$, function($value$$79$$, $column$$3$$) {
        var $td_element$$1$$ = $JSCompiler_StaticMethods_setColumnValue$$(this, $tr_element$$, $column$$3$$, $value$$79$$);
        if($td_element$$1$$ != $JSCompiler_alias_NULL$$) {
          var $blink_class$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-blink";
          $goog$dom$classes$add$$($td_element$$1$$, $blink_class$$);
          $goog$Timer$callOnce$$(function() {
            $goog$dom$classes$remove$$($td_element$$1$$, $blink_class$$)
          }, this.$blink_delay_$, this)
        }
      }, $JSCompiler_StaticMethods_processExecutionReport$self$$);
      var $current_classes_tr_elements$$ = $goog$dom$classes$get$$($tr_element$$);
      $goog$dom$classes$addRemove$$($tr_element$$, $current_classes_tr_elements$$, $JSCompiler_StaticMethods_processExecutionReport$self$$.$getRowClass$($execution_report_msg$$))
    }else {
      $current_classes_tr_elements$$ = $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_processExecutionReport$self$$, [$goog$object$getValues$$($execution_report_msg$$)], $goog$object$getKeys$$($execution_report_msg$$)), $goog$dom$insertChildAt$$($JSCompiler_StaticMethods_processExecutionReport$self$$.$table_data_body_el_$, $current_classes_tr_elements$$[0], 0)
    }
  }
}
$bitex$ui$OrderManager$$.prototype.$insertOrder$ = function $$bitex$ui$OrderManager$$$$$insertOrder$$($clientOrderId_tr_attributes$$, $dom$$1_status$$1$$, $side$$1_tr$$2$$, $orderQty$$, $price$$, $leavesQty$$, $cumQty_opt_cumQty$$, $avgPx_opt_avgPrice$$, $opt_orderId_orderId$$) {
  var $status_class_status_desc$$;
  switch($dom$$1_status$$1$$) {
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
  $price$$ = ($price$$ / 1E5).toFixed(5);
  $leavesQty$$ = ($leavesQty$$ / 1E8).toFixed(8);
  $cumQty_opt_cumQty$$ = ($cumQty_opt_cumQty$$ | 0).toFixed(8);
  $avgPx_opt_avgPrice$$ = ($avgPx_opt_avgPrice$$ | 0).toFixed(5);
  $opt_orderId_orderId$$ |= 0;
  $status_class_status_desc$$ = $bitex$ui$OrderManager$Status$$[$dom$$1_status$$1$$];
  $dom$$1_status$$1$$ = this.$getDomHelper$();
  $side$$1_tr$$2$$ = $dom$$1_status$$1$$.$createDom$("tr", $clientOrderId_tr_attributes$$, $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-id", "" + $opt_orderId_orderId$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-status", "" + $status_class_status_desc$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-side", "" + $side$$1_tr$$2$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-order-qty", "" + $orderQty$$), $dom$$1_status$$1$$.$createDom$("td", 
  this.$getCssClass$() + "-price", "" + $price$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-leaves-qty", "" + $leavesQty$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-cum-qty", "" + $cumQty_opt_cumQty$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-avg-px", "" + $avgPx_opt_avgPrice$$), $dom$$1_status$$1$$.$createDom$("td", this.$getCssClass$() + "-actions", $dom$$1_status$$1$$.$createDom$("a", {"class":"text-error", href:""}, $dom$$1_status$$1$$.$createDom$("i", 
  {"class":"icon-remove"}))));
  $dom$$1_status$$1$$.appendChild(this.$tbody_$, $side$$1_tr$$2$$)
};
$bitex$ui$OrderManager$$.prototype.$enterDocument$ = function $$bitex$ui$OrderManager$$$$$enterDocument$$() {
  $bitex$ui$OrderManager$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", function($client_order_id_e$$29$$) {
    $client_order_id_e$$29$$ = $client_order_id_e$$29$$.target.getAttribute("data-client-order-id");
    $client_order_id_e$$29$$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $client_order_id_e$$29$$))
  })
};
function $bitex$ui$OrderManagerEvent$$($type$$92$$, $client_order_id$$1$$) {
  $goog$events$Event$$.call(this, $type$$92$$);
  this.$client_order_id$ = $client_order_id$$1$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$OrderManager$CSS_CLASS$$, function() {
  return new $bitex$ui$OrderManager$$
});
// Input 39
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  2147483647 < $opt_delay$$ || $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 40
function $bitex$ui$OrderBook$$($username$$, $side$$2$$, $opt_blinkDelay$$1$$, $opt_domHelper$$4$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$4$$);
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700;
  this.$username_$ = $username$$;
  this.$side_$ = $side$$2$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$78$$) {
  this.$element_$ = $element$$78$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_209$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_209$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$78$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$30$$) {
  var $cxlEl_orderId$$1$$ = $e$$30$$.target;
  if("A" == $cxlEl_orderId$$1$$.tagName || "I" == $cxlEl_orderId$$1$$.tagName) {
    $cxlEl_orderId$$1$$ = $cxlEl_orderId$$1$$.getAttribute("data-order-id"), $cxlEl_orderId$$1$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$("cancel", $cxlEl_orderId$$1$$)), $e$$30$$.preventDefault(), $e$$30$$.stopPropagation())
  }
};
function $bitex$ui$OrderBookEvent$$($type$$93$$, $orderId$$2$$) {
  $goog$events$Event$$.call(this, $type$$93$$);
  this.$order_id$ = $orderId$$2$$
}
$goog$inherits$$($bitex$ui$OrderBookEvent$$, $goog$events$Event$$);
$bitex$ui$OrderBook$$.prototype.clear = function $$bitex$ui$OrderBook$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_deleteOrderThru$$($JSCompiler_StaticMethods_deleteOrderThru$self$$, $index$$65$$) {
  $JSCompiler_StaticMethods_deleteOrderThru$self$$.$getDomHelper$();
  for(var $child$$16$$;($child$$16$$ = $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.firstChild) && 0 < $index$$65$$;) {
    $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.removeChild($child$$16$$), $index$$65$$--
  }
}
function $JSCompiler_StaticMethods_deleteOrder$$($JSCompiler_StaticMethods_deleteOrder$self$$, $index$$66$$) {
  var $dom$$5$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $dom$$5$$.$getChildren$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$66$$];
  $dom$$5$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$67_trEl$$1$$, $qty$$) {
  var $dom$$6$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $index$$67_trEl$$1$$ = $dom$$6$$.$getChildren$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$67_trEl$$1$$];
  var $tdQtyEl$$ = $dom$$6$$.$getChildren$($index$$67_trEl$$1$$)[1];
  $dom$$6$$.$setTextContent$($tdQtyEl$$, $qty$$);
  var $blink_class$$1$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($tdQtyEl$$, $blink_class$$1$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, $blink_class$$1$$)
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
$bitex$ui$OrderBook$$.prototype.$insertOrder$ = function $$bitex$ui$OrderBook$$$$$insertOrder$$($index$$68$$, $id$$8$$, $price$$1_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$) {
  var $dom$$7$$ = this.$getDomHelper$();
  $price$$1_priceEl$$ = $dom$$7$$.$createDom$("td", this.$getBaseCssClass$() + "-price", $price$$1_priceEl$$);
  $qty$$1_qtyEl$$ = $dom$$7$$.$createDom$("td", this.$getBaseCssClass$() + "-qty", $qty$$1_qtyEl$$);
  $td_list_userNameEl_username$$1$$ = $td_list_userNameEl_username$$1$$ === this.$username_$ ? $dom$$7$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$7$$.$createDom$("a", {"class":"btn-cancel-order text-error", href:"", "data-order-id":$id$$8$$}, $dom$$7$$.$createDom$("i", {"class":"icon-remove", style:"line-height: 2px;", "data-order-id":$id$$8$$}, "  Cancelar"))) : $dom$$7$$.$createDom$("td", this.$getBaseCssClass$() + "-username", $td_list_userNameEl_username$$1$$);
  "0" == this.$side_$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price$$1_priceEl$$, this.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$1$$ = [$td_list_userNameEl_username$$1$$, $qty$$1_qtyEl$$, $price$$1_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-right"), $goog$dom$classes$add$$($price$$1_priceEl$$, this.$getBaseCssClass$() + "-left"), $td_list_userNameEl_username$$1$$ = 
  [$price$$1_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$]);
  var $rowEl$$ = $dom$$7$$.$createDom$("tr", {"data-order-id":$id$$8$$, "class":this.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$1$$);
  $dom$$7$$.$insertChildAt$(this.$bodyEl_$, $rowEl$$, $index$$68$$);
  var $blink_class$$2$$ = this.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($rowEl$$, $blink_class$$2$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, $blink_class$$2$$)
  }, this.$blink_delay_$, this)
};
// Input 41
// Input 42
function $goog$structs$getValues$$($col$$3$$) {
  if("function" == typeof $col$$3$$.$getValues$) {
    return $col$$3$$.$getValues$()
  }
  if($goog$isString$$($col$$3$$)) {
    return $col$$3$$.split("")
  }
  if($goog$isArrayLike$$($col$$3$$)) {
    for(var $rv$$16$$ = [], $l$$12$$ = $col$$3$$.length, $i$$87$$ = 0;$i$$87$$ < $l$$12$$;$i$$87$$++) {
      $rv$$16$$.push($col$$3$$[$i$$87$$])
    }
    return $rv$$16$$
  }
  return $goog$object$getValues$$($col$$3$$)
}
function $goog$structs$forEach$$($col$$8$$, $f$$36$$, $opt_obj$$37$$) {
  if("function" == typeof $col$$8$$.forEach) {
    $col$$8$$.forEach($f$$36$$, $opt_obj$$37$$)
  }else {
    if($goog$isArrayLike$$($col$$8$$) || $goog$isString$$($col$$8$$)) {
      $goog$array$forEach$$($col$$8$$, $f$$36$$, $opt_obj$$37$$)
    }else {
      var $keys$$1_rv$$inline_215$$;
      if("function" == typeof $col$$8$$.$getKeys$) {
        $keys$$1_rv$$inline_215$$ = $col$$8$$.$getKeys$()
      }else {
        if("function" != typeof $col$$8$$.$getValues$) {
          if($goog$isArrayLike$$($col$$8$$) || $goog$isString$$($col$$8$$)) {
            $keys$$1_rv$$inline_215$$ = [];
            for(var $l$$inline_216_values$$6$$ = $col$$8$$.length, $i$$inline_217_l$$14$$ = 0;$i$$inline_217_l$$14$$ < $l$$inline_216_values$$6$$;$i$$inline_217_l$$14$$++) {
              $keys$$1_rv$$inline_215$$.push($i$$inline_217_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_215$$ = $goog$object$getKeys$$($col$$8$$)
          }
        }else {
          $keys$$1_rv$$inline_215$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_216_values$$6$$ = $goog$structs$getValues$$($col$$8$$), $i$$inline_217_l$$14$$ = $l$$inline_216_values$$6$$.length, $i$$89$$ = 0;$i$$89$$ < $i$$inline_217_l$$14$$;$i$$89$$++) {
        $f$$36$$.call($opt_obj$$37$$, $l$$inline_216_values$$6$$[$i$$89$$], $keys$$1_rv$$inline_215$$ && $keys$$1_rv$$inline_215$$[$i$$89$$], $col$$8$$)
      }
    }
  }
}
;
// Input 43
function $goog$structs$Map$$($opt_map$$, $var_args$$75$$) {
  this.$map_$ = {};
  this.$keys_$ = [];
  var $argLength$$2_keys$$inline_221$$ = arguments.length;
  if(1 < $argLength$$2_keys$$inline_221$$) {
    $argLength$$2_keys$$inline_221$$ % 2 && $JSCompiler_alias_THROW$$(Error("Uneven number of arguments"));
    for(var $i$$94_values$$inline_222$$ = 0;$i$$94_values$$inline_222$$ < $argLength$$2_keys$$inline_221$$;$i$$94_values$$inline_222$$ += 2) {
      this.set(arguments[$i$$94_values$$inline_222$$], arguments[$i$$94_values$$inline_222$$ + 1])
    }
  }else {
    if($opt_map$$) {
      $opt_map$$ instanceof $goog$structs$Map$$ ? ($argLength$$2_keys$$inline_221$$ = $opt_map$$.$getKeys$(), $i$$94_values$$inline_222$$ = $opt_map$$.$getValues$()) : ($argLength$$2_keys$$inline_221$$ = $goog$object$getKeys$$($opt_map$$), $i$$94_values$$inline_222$$ = $goog$object$getValues$$($opt_map$$));
      for(var $i$$inline_223$$ = 0;$i$$inline_223$$ < $argLength$$2_keys$$inline_221$$.length;$i$$inline_223$$++) {
        this.set($argLength$$2_keys$$inline_221$$[$i$$inline_223$$], $i$$94_values$$inline_222$$[$i$$inline_223$$])
      }
    }
  }
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Map$$.prototype;
$JSCompiler_prototypeAlias$$.$count_$ = 0;
$JSCompiler_prototypeAlias$$.$version_$ = 0;
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  for(var $rv$$20$$ = [], $i$$95$$ = 0;$i$$95$$ < this.$keys_$.length;$i$$95$$++) {
    $rv$$20$$.push(this.$map_$[this.$keys_$[$i$$95$$]])
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
function $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$) {
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      var $key$$64$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$];
      Object.prototype.hasOwnProperty.call($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$map_$, $key$$64$$) && ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$64$$);
      $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $seen$$2$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      $key$$64$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$], Object.prototype.hasOwnProperty.call($seen$$2$$, $key$$64$$) || ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$64$$, $seen$$2$$[$key$$64$$] = 1), $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
}
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($key$$65$$, $opt_val$$1$$) {
  return Object.prototype.hasOwnProperty.call(this.$map_$, $key$$65$$) ? this.$map_$[$key$$65$$] : $opt_val$$1$$
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$66$$, $value$$80$$) {
  Object.prototype.hasOwnProperty.call(this.$map_$, $key$$66$$) || (this.$count_$++, this.$keys_$.push($key$$66$$), this.$version_$++);
  this.$map_$[$key$$66$$] = $value$$80$$
};
// Input 44
function $bitex$model$Model$$($element$$79$$, $opt_map$$1$$, $var_args$$76$$) {
  this.$element_$ = $element$$79$$;
  this.$map_$ = new $goog$structs$Map$$($opt_map$$1$$, $var_args$$76$$)
}
$goog$inherits$$($bitex$model$Model$$, $goog$events$EventTarget$$);
$bitex$model$Model$$.prototype.get = function $$bitex$model$Model$$$$get$($key$$71$$, $opt_val$$2$$) {
  return this.$map_$.get($key$$71$$, $opt_val$$2$$)
};
$bitex$model$Model$$.prototype.set = function $$bitex$model$Model$$$$set$($key$$72$$, $value$$82$$) {
  this.$map_$.set($key$$72$$, $value$$82$$);
  var $elements$$3$$ = $goog$dom$getElementsByClass$$("bitex-model", this.$element_$);
  $goog$array$forEach$$($elements$$3$$, function($el$$30$$) {
    if($el$$30$$.getAttribute("data-model-key") === $key$$72$$ && $goog$dom$getTextContent$$($el$$30$$) !== $value$$82$$) {
      $goog$dom$setTextContent$$($el$$30$$, $value$$82$$);
      var $blink_class$$3$$ = $el$$30$$.getAttribute("data-blink-class");
      if($blink_class$$3$$ != $JSCompiler_alias_NULL$$) {
        var $blink_delay$$ = $el$$30$$.getAttribute("data-blink-delay") || 700, $blink_delay$$ = parseInt($blink_delay$$, 10);
        $goog$dom$classes$add$$($el$$30$$, $blink_class$$3$$);
        $goog$Timer$callOnce$$(function() {
          $goog$dom$classes$remove$$($el$$30$$, $blink_class$$3$$)
        }, $blink_delay$$, this)
      }
    }
  });
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set" + $key$$72$$, $key$$72$$, $value$$82$$));
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set", $key$$72$$, $value$$82$$))
};
function $bitex$model$ModelEvent$$($type$$94$$, $key$$73$$, $data$$32$$) {
  $goog$events$Event$$.call(this, $type$$94$$);
  this.key = $key$$73$$;
  this.data = $data$$32$$
}
$goog$inherits$$($bitex$model$ModelEvent$$, $goog$events$Event$$);
// Input 45
// Input 46
function $goog$history$Event$$($token$$4$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$4$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 47
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
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$1$$) {
  $enable$$1$$ != this.$enabled_$ && (this.$enabled_$ = $enable$$1$$) && this.dispatchEvent(new $goog$history$Event$$($JSCompiler_StaticMethods_getToken$$(this), $JSCompiler_alias_FALSE$$))
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
// Input 48
function $bitex$app$UrlRouter$$($baseUrl$$, $defaultView$$) {
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_226$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$base_url_$ = $baseUrl$$;
  this.$default_view_$ = $defaultView$$;
  $JSCompiler_StaticMethods_setViewInternal$$(this, $defaultView$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($bitex$app$UrlRouter$$, $goog$events$EventTarget$$);
function $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setViewInternal$self$$, $view_name$$) {
  var $JSCompiler_inline_result$$25_re$$inline_231$$;
  $JSCompiler_inline_result$$25_re$$inline_231$$ = RegExp($goog$string$regExpEscape$$($JSCompiler_StaticMethods_setViewInternal$self$$.$base_url_$), "");
  $JSCompiler_inline_result$$25_re$$inline_231$$ = $view_name$$.replace($JSCompiler_inline_result$$25_re$$inline_231$$, "");
  $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_inline_result$$25_re$$inline_231$$;
  "" === $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ && ($JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_StaticMethods_setViewInternal$self$$.$default_view_$)
}
function $JSCompiler_StaticMethods_setView$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$) {
  if($JSCompiler_StaticMethods_setView$self$$.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $view_name$$1$$))) {
    $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$);
    var $JSCompiler_StaticMethods_setToken$self$$inline_233$$ = $JSCompiler_StaticMethods_setView$self$$.$history_$, $token$$inline_234$$ = $JSCompiler_StaticMethods_setView$self$$.$base_url_$ + $view_name$$1$$;
    $token$$inline_234$$ != $JSCompiler_StaticMethods_getToken$$($JSCompiler_StaticMethods_setToken$self$$inline_233$$) && ($JSCompiler_StaticMethods_setToken$self$$inline_233$$.$window_$.history.pushState($JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$window_$.document.title || "", $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$useFragment_$ ? "#" + $token$$inline_234$$ : $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$transformer_$ ? $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$transformer_$.$createUrl$($token$$inline_234$$, 
    $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$pathPrefix_$, $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$window_$.location) : $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$pathPrefix_$ + $token$$inline_234$$ + $JSCompiler_StaticMethods_setToken$self$$inline_233$$.$window_$.location.search), $JSCompiler_StaticMethods_setToken$self$$inline_233$$.dispatchEvent(new $goog$history$Event$$($token$$inline_234$$, $JSCompiler_alias_FALSE$$)))
  }
}
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$34_view_name$$2$$) {
  $e$$34_view_name$$2$$.$isNavigation$ && ($e$$34_view_name$$2$$ = $e$$34_view_name$$2$$.$token$, this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $e$$34_view_name$$2$$)) && $JSCompiler_StaticMethods_setViewInternal$$(this, $e$$34_view_name$$2$$))
};
function $bitex$app$UrlRouterEvent$$($type$$95$$, $view$$3$$) {
  $goog$events$Event$$.call(this, $type$$95$$);
  this.view = $view$$3$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 49
function $goog$dom$forms$getValue$$($el$$36$$) {
  var $selectedIndex$$inline_238_type$$96_values$$inline_241$$ = $el$$36$$.type;
  if(!$goog$isDef$$($selectedIndex$$inline_238_type$$96_values$$inline_241$$)) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_238_type$$96_values$$inline_241$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$36$$.checked ? $el$$36$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_238_type$$96_values$$inline_241$$ = $el$$36$$.selectedIndex, 0 <= $selectedIndex$$inline_238_type$$96_values$$inline_241$$ ? $el$$36$$.options[$selectedIndex$$inline_238_type$$96_values$$inline_241$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_238_type$$96_values$$inline_241$$ = [], $option$$inline_242$$, $i$$inline_243$$ = 0;$option$$inline_242$$ = $el$$36$$.options[$i$$inline_243$$];$i$$inline_243$$++) {
        $option$$inline_242$$.selected && $selectedIndex$$inline_238_type$$96_values$$inline_241$$.push($option$$inline_242$$.value)
      }
      return $selectedIndex$$inline_238_type$$96_values$$inline_241$$.length ? $selectedIndex$$inline_238_type$$96_values$$inline_241$$ : $JSCompiler_alias_NULL$$;
    default:
      return $goog$isDef$$($el$$36$$.value) ? $el$$36$$.value : $JSCompiler_alias_NULL$$
  }
}
;
// Input 50
function $bitex$ui$WithdrawBTC$$($opt_blinkDelay$$2$$, $opt_domHelper$$5$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$5$$);
  this.$blink_delay_$ = $opt_blinkDelay$$2$$ || 700
}
$goog$inherits$$($bitex$ui$WithdrawBTC$$, $goog$ui$Component$$);
$bitex$ui$WithdrawBTC$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("btc-withdraw");
$bitex$ui$WithdrawBTC$$.prototype.$decorateInternal$ = function $$bitex$ui$WithdrawBTC$$$$$decorateInternal$$($element$$80$$) {
  this.$element_$ = $element$$80$$
};
$bitex$ui$WithdrawBTC$$.prototype.$enterDocument$ = function $$bitex$ui$WithdrawBTC$$$$$enterDocument$$() {
  var $handler$$44$$ = this.$getHandler$(), $buyBtn$$ = this.$getDomHelper$().$getElementByClass$(this.$getBaseCssClass$() + "-submit", this.$getElement$());
  $JSCompiler_StaticMethods_listen$$($handler$$44$$, $buyBtn$$, "click", $goog$partial$$(this.$onAction_$, "withdraw_btc"))
};
$bitex$ui$WithdrawBTC$$.prototype.$onAction_$ = function $$bitex$ui$WithdrawBTC$$$$$onAction_$$($eventType$$7$$) {
  var $address_address_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-address"), $qty$$2_qty_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-qty"), $address_address_el$$ = $goog$dom$forms$getValue$$($address_address_el$$), $qty$$2_qty_el$$ = $goog$dom$forms$getValue$$($qty$$2_qty_el$$);
  $goog$string$isEmpty$$($address_address_el$$) ? alert("Endere\u00e7o n\u00e3o selecionado") : $goog$string$isEmpty$$($qty$$2_qty_el$$) || 0 >= parseFloat($qty$$2_qty_el$$) || isNaN(parseFloat($qty$$2_qty_el$$)) ? alert("Quantidade inv\u00e1lida") : this.dispatchEvent(new $bitex$ui$WithdrawBTCEvent$$($eventType$$7$$, $address_address_el$$, parseFloat($qty$$2_qty_el$$)))
};
function $bitex$ui$WithdrawBTCEvent$$($type$$98$$, $address$$1$$, $qty$$3$$) {
  $goog$events$Event$$.call(this, $type$$98$$);
  this.$address$ = $address$$1$$;
  this.$qty$ = $qty$$3$$
}
$goog$inherits$$($bitex$ui$WithdrawBTCEvent$$, $goog$events$Event$$);
// Input 51
// Input 52
function $goog$fx$Dragger$$($target$$53$$, $opt_handle$$, $opt_limits$$) {
  $goog$Disposable$$.call(this);
  this.target = $target$$53$$;
  this.handle = $opt_handle$$ || $target$$53$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$53$$);
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
  $JSCompiler_StaticMethods_removeAll$$(this.$eventHandler_$);
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  this.$eventHandler_$ = this.handle = this.target = $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_isRightToLeft_$self$$) {
  $goog$isDef$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$) || ($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.target));
  return $JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$
}
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$44_e$$36_element$$inline_256$$) {
  var $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ = "mousedown" == $JSCompiler_temp$$44_e$$36_element$$inline_256$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$44_e$$36_element$$inline_256$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$44_e$$36_element$$inline_256$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$44_e$$36_element$$inline_256$$.clientX, $JSCompiler_temp$$44_e$$36_element$$inline_256$$.clientY, $JSCompiler_temp$$44_e$$36_element$$inline_256$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$44_e$$36_element$$inline_256$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$44_e$$36_element$$inline_256$$.preventDefault()
    }
    var $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ = this.$document_$, $bestParent$$inline_258_docEl$$inline_253$$ = $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$.documentElement, $borderWidths$$inline_259_useCapture$$inline_254$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_259_useCapture$$inline_254$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_259_useCapture$$inline_254$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_258_docEl$$inline_253$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_258_docEl$$inline_253$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ ? $goog$dom$getWindow_$$($doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_259_useCapture$$inline_254$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.clientY;
    this.screenX = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.screenX;
    this.screenY = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$44_e$$36_element$$inline_256$$ = this.target, $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.offsetLeft, $bestParent$$inline_258_docEl$$inline_253$$ = $JSCompiler_temp$$44_e$$36_element$$inline_256$$.offsetParent, !$bestParent$$inline_258_docEl$$inline_253$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$44_e$$36_element$$inline_256$$, "position") && ($bestParent$$inline_258_docEl$$inline_253$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$44_e$$36_element$$inline_256$$).documentElement), $bestParent$$inline_258_docEl$$inline_253$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_259_useCapture$$inline_254$$ = $goog$style$getBorderBox$$($bestParent$$inline_258_docEl$$inline_253$$), $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ += $borderWidths$$inline_259_useCapture$$inline_254$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_259_useCapture$$inline_254$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_258_docEl$$inline_253$$), $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ -= $borderWidths$$inline_259_useCapture$$inline_254$$.left), $JSCompiler_temp$$44_e$$36_element$$inline_256$$ = $goog$style$isRightToLeft$$($bestParent$$inline_258_docEl$$inline_253$$) ? $bestParent$$inline_258_docEl$$inline_253$$.clientWidth - ($doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$ + $JSCompiler_temp$$44_e$$36_element$$inline_256$$.offsetWidth) : 
    $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$) : $JSCompiler_temp$$44_e$$36_element$$inline_256$$ = $doc$$inline_252_isMouseDown_offsetLeftForReal$$inline_257$$) : $JSCompiler_temp$$44_e$$36_element$$inline_256$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$44_e$$36_element$$inline_256$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$38$$, $opt_dragCanceled$$) {
  $JSCompiler_StaticMethods_removeAll$$(this.$eventHandler_$);
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$38$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$63$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$39$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$38$$.clientX, $e$$38$$.clientY, $e$$38$$, $x$$63$$, $y$$39$$, $opt_dragCanceled$$ || "touchcancel" == $e$$38$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$38$$.type || "touchcancel" == $e$$38$$.type) && $e$$38$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$40$$) {
  var $type$$99$$ = $e$$40$$.type;
  "touchstart" == $type$$99$$ || "touchmove" == $type$$99$$ ? $e$$40$$.init($e$$40$$.$event_$.targetTouches[0], $e$$40$$.currentTarget) : ("touchend" == $type$$99$$ || "touchcancel" == $type$$99$$) && $e$$40$$.init($e$$40$$.$event_$.changedTouches[0], $e$$40$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$41$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$41$$);
    var $dx$$7_x$$64$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$41$$.clientX - this.clientX), $dy$$7_pos$$5_y$$40$$ = $e$$41$$.clientY - this.clientY;
    this.clientX = $e$$41$$.clientX;
    this.clientY = $e$$41$$.clientY;
    this.screenX = $e$$41$$.screenX;
    this.screenY = $e$$41$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$41$$.clientX, $e$$41$$.clientY, $e$$41$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$41$$);
          return
        }
      }
    }
    $dy$$7_pos$$5_y$$40$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$);
    $dx$$7_x$$64$$ = $dy$$7_pos$$5_y$$40$$.x;
    $dy$$7_pos$$5_y$$40$$ = $dy$$7_pos$$5_y$$40$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$41$$.clientX, $e$$41$$.clientY, $e$$41$$, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$41$$, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$), $e$$41$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $dx$$8_x$$65$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$document_$));
  $dx$$8_x$$65$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$ += $dx$$8_x$$65$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$65$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$65$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$42$$) {
  var $pos$$6$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$42$$.clientX = this.clientX;
  $e$$42$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$42$$, $pos$$6$$.x, $pos$$6$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$43$$, $x$$66$$, $y$$42$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$66$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$66$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$42$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$43$$.clientX, $e$$43$$.clientY, $e$$43$$, $x$$66$$, $y$$42$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$67$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$67$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$43$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$43$$))
}
function $goog$fx$DragEvent$$($type$$100$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$100$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
// Input 53
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
// Input 54
// Input 55
// Input 56
function $goog$events$FocusHandler$$($element$$85_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$85_typeOut$$;
  $element$$85_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$85_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$50$$) {
  var $event$$3$$ = new $goog$events$BrowserEvent$$($e$$50$$.$event_$);
  $event$$3$$.type = "focusin" == $e$$50$$.type || "focus" == $e$$50$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$3$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
// Input 57
// Input 58
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$6$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$6$$);
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
  var $element$$86$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$86$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$86$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$86$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$27$$;
    $JSCompiler_inline_result$$27$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$27$$;
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$87$$) {
  return!!$element$$87$$ && "DIV" == $element$$87$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$88$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$88$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$ = this.$getElement$();
    $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode && $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$)
  }
  $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$ = this.$getElement$();
  $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode && $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$ = this.$getElement$();
  $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode && $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_274_refNode$$inline_560_refNode$$inline_563$$.nextSibling);
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
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$) {
  if($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_497_win$$inline_492$$ = (($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_503_popupSize$$inline_496$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_497_win$$inline_492$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_497_win$$inline_492$$ || window);
        $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = Math.max($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ + $viewSize$$inline_497_win$$inline_492$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_503_popupSize$$inline_496$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ + $viewSize$$inline_497_win$$inline_492$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_503_popupSize$$inline_496$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$, $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$, $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$);
        $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_503_popupSize$$inline_496$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$468_JSCompiler_temp_const$$471_doc$$inline_491_left$$inline_498_visible$$1_x$$inline_493$$($JSCompiler_StaticMethods_getWindow$self$$inline_501_JSCompiler_temp_const$$470_scroll$$inline_495_top$$inline_499_y$$inline_494$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_503_popupSize$$inline_496$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
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
  var $doc$$38_h$$6$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$(($doc$$38_h$$6$$ ? $goog$dom$getWindow_$$($doc$$38_h$$6$$) : window) || window || window), $w$$7$$ = Math.max($viewSize$$.width, Math.max($doc$$38_h$$6$$.body.scrollWidth, $doc$$38_h$$6$$.documentElement.scrollWidth)), $doc$$38_h$$6$$ = Math.max($viewSize$$.height, Math.max($doc$$38_h$$6$$.body.scrollHeight, $doc$$38_h$$6$$.documentElement.scrollHeight));
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$7$$, $doc$$38_h$$6$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$7$$, $doc$$38_h$$6$$))
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$52$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$52$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$53$$) {
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
// Input 59
// Input 60
// Input 61
function $goog$a11y$aria$setState$$($element$$91$$, $state$$1$$, $value$$89$$) {
  $element$$91$$.setAttribute("aria-" + $state$$1$$, $value$$89$$)
}
;
// Input 62
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$7$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$7$$);
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
    var $element$$inline_284$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_285$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_284$$, $className$$inline_285$$) : $goog$dom$classes$remove$$($element$$inline_284$$, $className$$inline_285$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$ = this.$getElement$(), $dom$$10$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$10$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$10$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$10$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$, this.$titleEl_$, this.$contentEl_$ = $dom$$10$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$10$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_288_element$$97$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:$JSCompiler_StaticMethods_getId$$(this)}), $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_291_dialogElement_element$$98$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_296_element$$99$$ = this.$getElement$();
  $dom$$inline_296_element$$99$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_296_element$$99$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_296_element$$99$$ = this.$getDomHelper$(), $bg$$inline_297$$ = this.$getBackgroundElement$();
    $dom$$inline_296_element$$99$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_296_element$$99$$.removeNode($bg$$inline_297$$)
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
      for(var $doc$$40$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$109$$ = 0, $button$$1$$;$button$$1$$ = $buttons$$[$i$$109$$];$i$$109$$++) {
        if($button$$1$$.name == $defaultButton$$ && !$button$$1$$.disabled) {
          try {
            if($goog$userAgent$WEBKIT$$ || $goog$userAgent$OPERA$$) {
              var $temp$$ = $doc$$40$$.createElement("input");
              $temp$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.$getElement$().appendChild($temp$$);
              $temp$$.focus();
              this.$getElement$().removeChild($temp$$)
            }
            $button$$1$$.focus()
          }catch($e$$54$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$41_h$$7$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_301_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$41_h$$7$$ ? $goog$dom$getWindow_$$($doc$$41_h$$7$$) : window) || window || window), $w$$8$$ = Math.max($doc$$41_h$$7$$.body.scrollWidth, $limits$$inline_301_viewSize$$2$$.width), $doc$$41_h$$7$$ = Math.max($doc$$41_h$$7$$.body.scrollHeight, $limits$$inline_301_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_301_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_301_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_301_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_301_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$8$$ - $dialogSize$$.width, $doc$$41_h$$7$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$ = this.$buttons_$, $key$$74$$ = $bs_caption$$ && $bs_caption$$.$cancelButton_$;
    $key$$74$$ ? ($bs_caption$$ = $bs_caption$$.get($key$$74$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$74$$, $bs_caption$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
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
      var $JSCompiler_StaticMethods_attachToElement$self$$inline_306$$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_306$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$;
      $JSCompiler_StaticMethods_attachToElement$self$$inline_306$$.render()
    }else {
      $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$.innerHTML = ""
    }
    $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$)
  }
}
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$2_e$$57_el$$inline_311_key$$75$$) {
  a: {
    for($button$$2_e$$57_el$$inline_311_key$$75$$ = $button$$2_e$$57_el$$inline_311_key$$75$$.target;$button$$2_e$$57_el$$inline_311_key$$75$$ != $JSCompiler_alias_NULL$$ && $button$$2_e$$57_el$$inline_311_key$$75$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$2_e$$57_el$$inline_311_key$$75$$.tagName) {
        break a
      }
      $button$$2_e$$57_el$$inline_311_key$$75$$ = $button$$2_e$$57_el$$inline_311_key$$75$$.parentNode
    }
    $button$$2_e$$57_el$$inline_311_key$$75$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$2_e$$57_el$$inline_311_key$$75$$ && !$button$$2_e$$57_el$$inline_311_key$$75$$.disabled) {
    $button$$2_e$$57_el$$inline_311_key$$75$$ = $button$$2_e$$57_el$$inline_311_key$$75$$.name;
    var $caption$$1$$ = this.$buttons_$.get($button$$2_e$$57_el$$inline_311_key$$75$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$2_e$$57_el$$inline_311_key$$75$$, $caption$$1$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$58$$) {
  var $caption$$2_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$55$$ = $e$$58$$.target;
  if("keydown" == $e$$58$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$58$$.keyCode) {
      var $cancel_key$$76$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$55$$ = "SELECT" == $isSpecialFormElement_target$$55$$.tagName && !$isSpecialFormElement_target$$55$$.disabled;
      $cancel_key$$76$$ && !$isSpecialFormElement_target$$55$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = $buttonSet$$.get($cancel_key$$76$$), $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$76$$, $caption$$2_close$$))) : $isSpecialFormElement_target$$55$$ || ($caption$$2_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$58$$.keyCode && $e$$58$$.shiftKey && $isSpecialFormElement_target$$55$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_314$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$58$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$55$$.tagName) {
        $cancel_key$$76$$ = $isSpecialFormElement_target$$55$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$;
          if($JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_319$$ = 0, $nextButton$$inline_320$$;$nextButton$$inline_320$$ = $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$[$i$$inline_319$$];$i$$inline_319$$++) {
                if($nextButton$$inline_320$$.name == $defaultKey$$ || $nextButton$$inline_320$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$ = $nextButton$$inline_320$$;
                  break a
                }
              }
              $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$55$$ = ("TEXTAREA" == $isSpecialFormElement_target$$55$$.tagName || "SELECT" == $isSpecialFormElement_target$$55$$.tagName || "A" == $isSpecialFormElement_target$$55$$.tagName) && !$isSpecialFormElement_target$$55$$.disabled;
          $JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$ && (!$JSCompiler_temp$$19_buttons$$inline_318_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$55$$) && ($cancel_key$$76$$ = $defaultKey$$)
        }
      }
      $cancel_key$$76$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$2_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$76$$, String($buttonSet$$.get($cancel_key$$76$$)))))
    }
  }
  if($caption$$2_close$$ || $hasHandler$$) {
    $e$$58$$.stopPropagation(), $e$$58$$.preventDefault()
  }
  $caption$$2_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$77$$, $caption$$3$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$77$$;
  this.caption = $caption$$3$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$8$$) {
  this.$dom_$ = $opt_domHelper$$8$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$78$$, $caption$$4$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$78$$, $caption$$4$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$78$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$78$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$3$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$3$$.key, $button$$3$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$2$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$5$$, $key$$79$$) {
      var $button$$4$$ = $domHelper$$2$$.$createDom$("button", {name:$key$$79$$}, $caption$$5$$);
      $key$$79$$ == this.$defaultButton_$ && ($button$$4$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$4$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$101$$) {
  if($buttons$$2_element$$101$$ && 1 == $buttons$$2_element$$101$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$101$$;
    $buttons$$2_element$$101$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$110$$ = 0, $button$$5$$, $key$$80$$, $caption$$6$$;$button$$5$$ = $buttons$$2_element$$101$$[$i$$110$$];$i$$110$$++) {
      if($key$$80$$ = $button$$5$$.name || $button$$5$$.id, $caption$$6$$ = $goog$dom$getTextContent$$($button$$5$$) || $button$$5$$.value, $key$$80$$) {
        var $isDefault$$ = 0 == $i$$110$$;
        this.set($key$$80$$, $caption$$6$$, $isDefault$$, $button$$5$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$5$$, this.$class_$ + "-default")
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
// Input 63
function $bootstrap$Dialog$$() {
  $goog$ui$Dialog$$.call(this, "modal")
}
$goog$inherits$$($bootstrap$Dialog$$, $goog$ui$Dialog$$);
$bootstrap$Dialog$$.prototype.$createDom$ = function $$bootstrap$Dialog$$$$$createDom$$() {
  $goog$ui$ModalPopup$$.prototype.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$ = this.$getElement$(), $dom$$11_i$$113$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$11_i$$113$$.$createDom$("div", {className:"modal-header", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleCloseEl_$ = $dom$$11_i$$113$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$11_i$$113$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$, this.$titleEl_$, this.$contentEl_$ = $dom$$11_i$$113$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$11_i$$113$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$11_i$$113$$ = 0;$dom$$11_i$$113$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$.length;$dom$$11_i$$113$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_323_buttons$$4_element$$102$$[$dom$$11_i$$113$$], "btn")
    }
  }
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$bootstrap$Dialog$$.prototype.$setBackgroundElementOpacity$ = function $$bootstrap$Dialog$$$$$setBackgroundElementOpacity$$($bgEl$$1_opacity$$2$$) {
  this.$backgroundElementOpacity_$ = $bgEl$$1_opacity$$2$$;
  this.$getElement$() && ($bgEl$$1_opacity$$2$$ = this.$getBackgroundElement$(), $goog$dom$classes$add$$($bgEl$$1_opacity$$2$$, "modal-dialog-bg"), $bgEl$$1_opacity$$2$$ && $goog$style$setOpacity$$($bgEl$$1_opacity$$2$$, this.$backgroundElementOpacity_$))
};
// Input 64
function $bitex$api$BitEx$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($bitex$api$BitEx$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.$ws_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$connected_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$logged_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$29$$) {
  "WebSocket" in window ? this.$ws_$ = new WebSocket($url$$29$$) : "MozWebSocket" in window ? this.$ws_$ = new MozWebSocket($url$$29$$) : $JSCompiler_alias_THROW$$("WebSockets are not available");
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
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$59_msg$$) {
  $e$$59_msg$$ = JSON.parse($e$$59_msg$$.data);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$59_msg$$));
  switch($e$$59_msg$$.MsgType) {
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $e$$59_msg$$));
      break;
    case "BF":
      1 == $e$$59_msg$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $e$$59_msg$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $e$$59_msg$$)));
      break;
    case "U13":
      1 == $e$$59_msg$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $e$$59_msg$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $e$$59_msg$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("generate_boleto_response", $e$$59_msg$$));
      break;
    case "U10":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_response", $e$$59_msg$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $e$$59_msg$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("order_list_response", $e$$59_msg$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $e$$59_msg$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("boleto_options_response", $e$$59_msg$$));
      break;
    case "W":
      if(1 != $e$$59_msg$$.MarketDepth) {
        this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_clear"));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear"));
        for(var $x$$70$$ in $e$$59_msg$$.MDFullGrp) {
          var $entry$$ = $e$$59_msg$$.MDFullGrp[$x$$70$$];
          switch($entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_new_order", $entry$$));
              break;
            case "2":
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $e$$59_msg$$));
      break;
    case "X":
      if("3" == $e$$59_msg$$.MDBkTyp) {
        for($x$$70$$ in $e$$59_msg$$.MDIncGrp) {
          switch($entry$$ = $e$$59_msg$$.MDIncGrp[$x$$70$$], $entry$$.MDEntryType) {
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
              this.dispatchEvent(new $bitex$api$BitExEvent$$("trade", $entry$$))
          }
        }
      }
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $e$$59_msg$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $e$$59_msg$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $e$$59_msg$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$logged_$ = this.$connected_$ = $JSCompiler_alias_FALSE$$;
  this.$ws_$.close();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($msg$$1_username$$2$$, $password$$, $opt_second_factor$$) {
  $msg$$1_username$$2$$ = {MsgType:"BE", UserReqID:"1", Username:$msg$$1_username$$2$$, Password:$password$$, UserReqTyp:"1"};
  $opt_second_factor$$ != $JSCompiler_alias_NULL$$ && ($msg$$1_username$$2$$.SecondFactor = $opt_second_factor$$);
  this.$ws_$.send(JSON.stringify($msg$$1_username$$2$$))
};
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$3_msg$$2$$, $opt_secret$$, $opt_code$$) {
  $enable$$3_msg$$2$$ = {MsgType:"U16", Enable:$enable$$3_msg$$2$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_secret$$) && ($enable$$3_msg$$2$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !$goog$string$isEmpty$$($opt_code$$) && ($enable$$3_msg$$2$$.Code = $opt_code$$);
  this.$ws_$.send(JSON.stringify($enable$$3_msg$$2$$))
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U10", Email:$email$$}))
};
$JSCompiler_prototypeAlias$$.$resetPassword$ = function $$JSCompiler_prototypeAlias$$$$resetPassword$$($token$$9$$, $new_password$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U12", Token:$token$$9$$, NewPassword:$new_password$$}))
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$1$$, $new_password$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"BE", UserReqID:"3", Password:$password$$1$$, NewPassword:$new_password$$1$$}))
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$, $entries$$) {
  var $reqId$$1$$ = parseInt(1E6 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$reqId$$1$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$}));
  return $reqId$$1$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$market_data_id$$, SubscriptionRequestType:"2"}))
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$3$$, $password$$2$$, $email$$1$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U0", Username:$username$$3$$, Password:$password$$2$$, Email:$email$$1$$}))
};
$JSCompiler_prototypeAlias$$.$requestOrderList$ = function $$JSCompiler_prototypeAlias$$$$requestOrderList$$($opt_requestId_requestId$$, $opt_page$$, $opt_limit$$1$$, $opt_status$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"U4", OrdersReqID:$opt_requestId_requestId$$, Page:$opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["0", "1"]}));
  return $opt_requestId_requestId$$
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $symbol$$1$$, $qty$$4$$, $price$$2$$, $side$$3$$, $clientOrderId$$1_opt_clientOrderId$$) {
  $clientOrderId$$1_opt_clientOrderId$$ = $clientOrderId$$1_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$2$$ = parseInt(1E5 * $price$$2$$, 10);
  $qty$$4$$ = parseInt(1E8 * $qty$$4$$, 10);
  $JSCompiler_StaticMethods_sendOrder_$self$$.$ws_$.send(JSON.stringify({MsgType:"D", ClOrdID:"" + $clientOrderId$$1_opt_clientOrderId$$, Symbol:$symbol$$1$$, Side:$side$$3$$, OrdType:"2", Price:$price$$2$$, OrderQty:$qty$$4$$}));
  return $clientOrderId$$1_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$14$$ = {MsgType:"F"};
  $opt_clientOrderId$$1$$ ? $msg$$14$$.OrigClOrdID = $opt_clientOrderId$$1$$ : $opt_OrderId$$ && ($msg$$14$$.OrderID = $opt_OrderId$$);
  this.$ws_$.send(JSON.stringify($msg$$14$$))
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$15$$) {
  this.$ws_$.send(JSON.stringify($msg$$15$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$2$$, $qty$$5$$, $price$$3$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$2$$, $qty$$5$$, $price$$3$$, "1", $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$3$$, $qty$$6$$, $price$$4$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$3$$, $qty$$6$$, $price$$4$$, "2", $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.$ws_$.send(JSON.stringify({MsgType:"1", TestReqID:Math.random()}))
};
function $bitex$api$BitExEvent$$($type$$102$$, $opt_data$$2$$) {
  $goog$events$Event$$.call(this, $type$$102$$);
  this.data = $opt_data$$2$$
}
$goog$inherits$$($bitex$api$BitExEvent$$, $goog$events$Event$$);
$goog$exportPath_$$("BitEx", $bitex$api$BitEx$$);
$goog$exportProperty$$("open", $bitex$api$BitEx$$.prototype.open);
$goog$exportProperty$$("close", $bitex$api$BitEx$$.prototype.close);
$goog$exportProperty$$("login", $bitex$api$BitEx$$.prototype.login);
$goog$exportProperty$$("isLogged", $bitex$api$BitEx$$.prototype.$isLogged$);
$goog$exportProperty$$("isConnected", $bitex$api$BitEx$$.prototype.$isConnected$);
$goog$exportProperty$$("changePassword", $bitex$api$BitEx$$.prototype.$changePassword$);
$goog$exportProperty$$("subscribeMarketData", $bitex$api$BitEx$$.prototype.$subscribeMarketData$);
$goog$exportProperty$$("unSubscribeMarketData", $bitex$api$BitEx$$.prototype.$unSubscribeMarketData$);
$goog$exportProperty$$("signUp", $bitex$api$BitEx$$.prototype.$signUp$);
$goog$exportProperty$$("forgotPassword", $bitex$api$BitEx$$.prototype.$forgotPassword$);
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
// Input 65
function $bitex$ui$OrderEntry$$($opt_blinkDelay$$3$$, $opt_domHelper$$9$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$9$$);
  this.$blink_delay_$ = $opt_blinkDelay$$3$$ || 700
}
$goog$inherits$$($bitex$ui$OrderEntry$$, $goog$ui$Component$$);
$bitex$ui$OrderEntry$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$bitex$ui$OrderEntry$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderEntry$$$$$decorateInternal$$($element$$103$$) {
  this.$element_$ = $element$$103$$
};
$bitex$ui$OrderEntry$$.prototype.$enterDocument$ = function $$bitex$ui$OrderEntry$$$$$enterDocument$$() {
  var $handler$$45$$ = this.$getHandler$(), $dom$$12_sellBtn$$ = this.$getDomHelper$(), $buyBtn$$1$$ = $dom$$12_sellBtn$$.$getElementByClass$(this.$getBaseCssClass$() + "-buy", this.$getElement$()), $dom$$12_sellBtn$$ = $dom$$12_sellBtn$$.$getElementByClass$(this.$getBaseCssClass$() + "-sell", this.$getElement$());
  $JSCompiler_StaticMethods_listen$$($handler$$45$$, $buyBtn$$1$$, "click", $goog$partial$$(this.$onAction_$, "buy_limited"));
  $JSCompiler_StaticMethods_listen$$($handler$$45$$, $dom$$12_sellBtn$$, "click", $goog$partial$$(this.$onAction_$, "sell_limited"))
};
$bitex$ui$OrderEntry$$.prototype.$onAction_$ = function $$bitex$ui$OrderEntry$$$$$onAction_$$($eventType$$8$$) {
  var $symbol$$4_symbol_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-symbol"), $qty$$7_qty_el$$1$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-qty"), $price$$5_price_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-price"), $symbol$$4_symbol_el$$ = $goog$dom$forms$getValue$$($symbol$$4_symbol_el$$), $qty$$7_qty_el$$1$$ = $goog$dom$forms$getValue$$($qty$$7_qty_el$$1$$), $price$$5_price_el$$ = $goog$dom$forms$getValue$$($price$$5_price_el$$);
  $goog$string$isEmpty$$($symbol$$4_symbol_el$$) ? alert("Instrumento n\u00e3o selecionado") : $goog$string$isEmpty$$($qty$$7_qty_el$$1$$) || 0 >= parseFloat($qty$$7_qty_el$$1$$) ? alert("Quantidade inv\u00e1lida") : $goog$string$isEmpty$$($price$$5_price_el$$) || 0 >= parseFloat($price$$5_price_el$$) ? alert("Pre\u00e7o inv\u00e1lido") : this.dispatchEvent(new $bitex$ui$OrderEntryEvent$$($eventType$$8$$, $symbol$$4_symbol_el$$, parseFloat($qty$$7_qty_el$$1$$), parseFloat($price$$5_price_el$$)))
};
function $bitex$ui$OrderEntryEvent$$($type$$103$$, $symbol$$5$$, $qty$$8$$, $price$$6$$) {
  $goog$events$Event$$.call(this, $type$$103$$);
  this.$symbol$ = $symbol$$5$$;
  this.$qty$ = $qty$$8$$;
  this.$price$ = $price$$6$$
}
$goog$inherits$$($bitex$ui$OrderEntryEvent$$, $goog$events$Event$$);
// Input 66
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$104$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$104$$);
  return $element$$104$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$105$$) {
  return $element$$105$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$106$$, $className$$19$$, $enable$$4$$) {
  if($control$$1_element$$106$$ = $control$$1_element$$106$$.$getElement$ ? $control$$1_element$$106$$.$getElement$() : $control$$1_element$$106$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$106$$), $className$$19$$);
      $combinedClasses$$.push($className$$19$$);
      $goog$partial$$($enable$$4$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$106$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$4$$ ? $goog$dom$classes$add$$($control$$1_element$$106$$, $className$$19$$) : $goog$dom$classes$remove$$($control$$1_element$$106$$, $className$$19$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$108$$) {
  $element$$108$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$108$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$108$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$2$$ = $goog$dom$classes$get$$($element$$108$$);
  $goog$array$forEach$$($classNames$$2$$, function($className$$21_state$$inline_343$$) {
    if(!$hasRendererClassName$$ && $className$$21_state$$inline_343$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$21_state$$inline_343$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$33$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_565$$ = this.$classByState_$, $transposed$$inline_566$$ = {}, $key$$inline_567$$;
          for($key$$inline_567$$ in $obj$$inline_565$$) {
            $transposed$$inline_566$$[$obj$$inline_565$$[$key$$inline_567$$]] = $key$$inline_567$$
          }
          this.$stateByClass_$ = $transposed$$inline_566$$
        }
        $className$$21_state$$inline_343$$ = parseInt(this.$stateByClass_$[$className$$21_state$$inline_343$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$33$$ | (isNaN($className$$21_state$$inline_343$$) ? 0 : $className$$21_state$$inline_343$$)
      }
    }
  }, this);
  $control$$3$$.$state_$ = $state$$2$$;
  $hasRendererClassName$$ || ($classNames$$2$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$2$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$3$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$2$$.push.apply($classNames$$2$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$2$$.push.apply($classNames$$2$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$108$$.className = $classNames$$2$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$108$$);
  return $element$$108$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$110$$) {
  $control$$5$$.$visible_$ || $goog$a11y$aria$setState$$($element$$110$$, "hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$110$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$110$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$110$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$110$$, 64, !!($control$$5$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$111$$, $allow$$) {
  var $unselectable$$inline_354_value$$inline_357$$ = !$allow$$, $descendants$$inline_356$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$111$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_354_value$$inline_357$$ = $unselectable$$inline_354_value$$inline_357$$ ? "none" : "", $element$$111$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_354_value$$inline_357$$, $descendants$$inline_356$$) {
      for(var $i$$inline_358$$ = 0, $descendant$$inline_359$$;$descendant$$inline_359$$ = $descendants$$inline_356$$[$i$$inline_358$$];$i$$inline_358$$++) {
        $descendant$$inline_359$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_354_value$$inline_357$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_354_value$$inline_357$$ = $unselectable$$inline_354_value$$inline_357$$ ? "on" : "", $element$$111$$.setAttribute("unselectable", $unselectable$$inline_354_value$$inline_357$$), $descendants$$inline_356$$) {
        for($i$$inline_358$$ = 0;$descendant$$inline_359$$ = $descendants$$inline_356$$[$i$$inline_358$$];$i$$inline_358$$++) {
          $descendant$$inline_359$$.setAttribute("unselectable", $unselectable$$inline_354_value$$inline_357$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$112$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$112$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
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
      }catch($e$$61$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$113$$, $visible$$4$$) {
  $goog$style$showElement$$($element$$113$$, $visible$$4$$);
  $element$$113$$ && $goog$a11y$aria$setState$$($element$$113$$, "hidden", !$visible$$4$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$6$$) {
  var $element$$114$$ = $control$$8$$.$getElement$();
  if($element$$114$$) {
    var $className$$22$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$22$$ && this.$enableClassName$($control$$8$$, $className$$22$$, $enable$$6$$);
    this.$updateAriaState$($element$$114$$, $state$$3$$, $enable$$6$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$115$$, $ariaState_state$$4$$, $enable$$7$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $goog$a11y$aria$setState$$($element$$115$$, $ariaState_state$$4$$, $enable$$7$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$116$$, $content$$7$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$116$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$7$$)) {
    if($goog$isString$$($content$$7$$)) {
      $goog$dom$setTextContent$$($contentElem$$1$$, $content$$7$$)
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$17$$) {
        if($child$$17$$) {
          var $doc$$42$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$17$$) ? $doc$$42$$.createTextNode($child$$17$$) : $child$$17$$)
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
  var $cssClass_extraClassNames$$1_state$$inline_362$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$3$$ = [$cssClass_extraClassNames$$1_state$$inline_362$$], $classNames$$inline_363_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_363_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_362$$ && $classNames$$3$$.push($classNames$$inline_363_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_362$$ = $control$$10$$.$state_$;
  for($classNames$$inline_363_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_362$$;) {
    var $mask$$inline_364$$ = $cssClass_extraClassNames$$1_state$$inline_362$$ & -$cssClass_extraClassNames$$1_state$$inline_362$$;
    $classNames$$inline_363_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_364$$));
    $cssClass_extraClassNames$$1_state$$inline_362$$ &= ~$mask$$inline_364$$
  }
  $classNames$$3$$.push.apply($classNames$$3$$, $classNames$$inline_363_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_362$$ = $control$$10$$.$extraClassNames_$) && $classNames$$3$$.push.apply($classNames$$3$$, $cssClass_extraClassNames$$1_state$$inline_362$$);
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
// Input 67
// Input 68
// Input 69
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
var $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, 
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$detectedMac_$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$62$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$62$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$62$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$62$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$62$$.ctrlKey && 17 != $e$$62$$.keyCode ? this.$lastKey_$ = 17 : $e$$62$$.altKey && 18 != $e$$62$$.keyCode ? this.$lastKey_$ = 18 : $e$$62$$.metaKey && 91 != $e$$62$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$62$$.keyCode, this.$lastKey_$, $e$$62$$.shiftKey, $e$$62$$.ctrlKey, $e$$62$$.altKey) ? this.handleEvent($e$$62$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$62$$.keyCode) : $e$$62$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$62$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$63$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$63$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$64_repeat$$) {
  var $be$$3_event$$4$$ = $e$$64_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$3_event$$4$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$64_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$3_event$$4$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$64_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$3_event$$4$$.charCode && 63232 > $be$$3_event$$4$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$3_event$$4$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$3_event$$4$$.keyCode : 0) : ($keyCode$$3$$ = $be$$3_event$$4$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$3_event$$4$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$85$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$3_event$$4$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$85$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$64_repeat$$.shiftKey && ($key$$85$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$85$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$64_repeat$$ = $key$$85$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$85$$;
  $be$$3_event$$4$$ = new $goog$events$KeyEvent$$($key$$85$$, $charCode$$, $e$$64_repeat$$, $be$$3_event$$4$$);
  $be$$3_event$$4$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$3_event$$4$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$118$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$118$$;
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
  this.type = "key";
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
// Input 70
function $goog$ui$Control$$($content$$8$$, $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$, $opt_domHelper$$10$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$10$$);
  if(!$JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$) {
    $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$ = this.constructor;
    for(var $key$$inline_373_rendererCtor$$inline_374$$;$JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$;) {
      $key$$inline_373_rendererCtor$$inline_374$$ = $goog$getUid$$($JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$);
      if($key$$inline_373_rendererCtor$$inline_374$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_373_rendererCtor$$inline_374$$]) {
        break
      }
      $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$ = $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$ = $key$$inline_373_rendererCtor$$inline_374$$ ? $goog$isFunction$$($key$$inline_373_rendererCtor$$inline_374$$.$getInstance$) ? $key$$inline_373_rendererCtor$$inline_374$$.$getInstance$() : new $key$$inline_373_rendererCtor$$inline_374$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$28_componentCtor$$inline_372_opt_renderer$$;
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
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$26$$, $enable$$9$$) {
  $enable$$9$$ ? $className$$26$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$26$$) || this.$extraClassNames_$.push($className$$26$$) : this.$extraClassNames_$ = [$className$$26$$], this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_TRUE$$)) : $className$$26$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$26$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$26$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $element$$119$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$119$$;
  var $ariaRole$$inline_401$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_401$$ && $element$$119$$.setAttribute("role", $ariaRole$$inline_401$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$119$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$119$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$120$$) {
  return this.$renderer_$.$canDecorate$($element$$120$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$121$$) {
  this.$element_$ = $element$$121$$ = this.$renderer_$.$decorate$(this, $element$$121$$);
  var $ariaRole$$inline_409$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_409$$ && $element$$121$$.setAttribute("role", $ariaRole$$inline_409$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$121$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$121$$.style.display
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
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$10$$) {
  var $handler$$46$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$122$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$10$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$46$$, $element$$122$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$122$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$122$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$122$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$46$$, $element$$122$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$46$$, $element$$122$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$46$$, $element$$122$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$122$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$122$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$122$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$46$$, $element$$122$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$46$$, $element$$122$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
  var $element$$123$$ = this.$getElement$();
  $element$$123$$ && this.$renderer_$.$setRightToLeft$($element$$123$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$124$$ = this.$getElement$();
  $element$$124$$ && this.$renderer_$.$setAllowTextSelection$($element$$124$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$5$$ && this.dispatchEvent($visible$$5$$ ? "show" : "hide")) {
    var $element$$125$$ = this.$getElement$();
    $element$$125$$ && this.$renderer_$.$setVisible$($element$$125$$, $visible$$5$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$5$$);
    this.$visible_$ = $visible$$5$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$11$$) {
  var $parent$$inline_415$$ = this.getParent();
  if((!$parent$$inline_415$$ || "function" != typeof $parent$$inline_415$$.isEnabled || $parent$$inline_415$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$11$$)) {
    $enable$$11$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$11$$), this.$setState$(1, !$enable$$11$$)
  }
};
function $JSCompiler_StaticMethods_setHighlighted$$($JSCompiler_StaticMethods_setHighlighted$self$$, $highlight$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setHighlighted$self$$, 2, $highlight$$) && $JSCompiler_StaticMethods_setHighlighted$self$$.$setState$(2, $highlight$$)
}
$JSCompiler_prototypeAlias$$.setActive = function $$JSCompiler_prototypeAlias$$$setActive$($active$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 4, $active$$) && this.$setState$(4, $active$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$9$$, $enable$$12$$) {
  this.$supportedStates_$ & $state$$9$$ && $enable$$12$$ != !!(this.$state_$ & $state$$9$$) && (this.$renderer_$.$setState$(this, $state$$9$$, $enable$$12$$), this.$state_$ = $enable$$12$$ ? this.$state_$ | $state$$9$$ : this.$state_$ & ~$state$$9$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & 32 && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$(32, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ &= -33
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$13$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$13$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$13$$)
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$15$$, $enable$$15$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$15$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$15$$) != $enable$$15$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$15$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$15$$, $enable$$15$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$65$$) {
  (!$e$$65$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$65$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$66$$) {
  if((!$e$$66$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$66$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$68$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$68$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$68$$) && $e$$68$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$69$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$69$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$70$$) {
  this.isEnabled() && this.$performActionInternal$($e$$70$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$71$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_418_open$$inline_424$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_418_open$$inline_424$$) && this.$setState$(16, $actionEvent_check$$inline_418_open$$inline_424$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_418_open$$inline_424$$ = !(this.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_418_open$$inline_424$$) && this.$setState$(64, $actionEvent_check$$inline_418_open$$inline_424$$));
  $actionEvent_check$$inline_418_open$$inline_424$$ = new $goog$events$Event$$("action", this);
  $e$$71$$ && ($actionEvent_check$$inline_418_open$$inline_424$$.altKey = $e$$71$$.altKey, $actionEvent_check$$inline_418_open$$inline_424$$.ctrlKey = $e$$71$$.ctrlKey, $actionEvent_check$$inline_418_open$$inline_424$$.metaKey = $e$$71$$.metaKey, $actionEvent_check$$inline_418_open$$inline_424$$.shiftKey = $e$$71$$.shiftKey, $actionEvent_check$$inline_418_open$$inline_424$$.$platformModifierKey$ = $e$$71$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_418_open$$inline_424$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$74$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$74$$) ? ($e$$74$$.preventDefault(), $e$$74$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$75$$) {
  return 13 == $e$$75$$.keyCode && this.$performActionInternal$($e$$75$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_434$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_434$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 71
// Input 72
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$126$$, $state$$16$$, $enable$$16$$) {
  16 == $state$$16$$ ? $goog$a11y$aria$setState$$($element$$126$$, "pressed", $enable$$16$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$126$$, $state$$16$$, $enable$$16$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$8$$) {
  var $element$$127$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$8$$), $tooltip_value$$91$$ = $button$$8$$.$getTooltip$();
  $tooltip_value$$91$$ && this.$setTooltip$($element$$127$$, $tooltip_value$$91$$);
  ($tooltip_value$$91$$ = $button$$8$$.$getValue$()) && this.$setValue$($element$$127$$, $tooltip_value$$91$$);
  $button$$8$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$127$$, 16, !!($button$$8$$.$state_$ & 16));
  return $element$$127$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$9$$, $element$$128$$) {
  $element$$128$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$9$$, $element$$128$$);
  var $value$$inline_437$$ = this.$getValue$($element$$128$$);
  $button$$9$$.$value_$ = $value$$inline_437$$;
  $button$$9$$.$tooltip_$ = this.$getTooltip$($element$$128$$);
  $button$$9$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$128$$, 16, !!($button$$9$$.$state_$ & 16));
  return $element$$128$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$129$$) {
  return $element$$129$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$130$$, $tooltip$$1$$) {
  $element$$130$$ && ($element$$130$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 73
function $goog$ui$NativeButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$NativeButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$NativeButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$NativeButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$11$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$11$$);
  $button$$11$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$11$$);
  return $button$$11$$.$getDomHelper$().$createDom$("button", {"class":$JSCompiler_StaticMethods_getClassNames$$(this, $button$$11$$).join(" "), disabled:!$button$$11$$.isEnabled(), title:$button$$11$$.$getTooltip$() || "", value:$button$$11$$.$getValue$() || ""}, $JSCompiler_StaticMethods_getCaption$$($button$$11$$) || "")
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$131$$) {
  return"BUTTON" == $element$$131$$.tagName || "INPUT" == $element$$131$$.tagName && ("button" == $element$$131$$.type || "submit" == $element$$131$$.type || "reset" == $element$$131$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$12$$, $element$$132$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$12$$);
  $button$$12$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$12$$);
  $element$$132$$.disabled && $goog$dom$classes$add$$($element$$132$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$12$$, $element$$132$$)
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($button$$13$$) {
  $JSCompiler_StaticMethods_listen$$($button$$13$$.$getHandler$(), $button$$13$$.$getElement$(), "click", $button$$13$$.$performActionInternal$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($button$$14$$) {
  return $button$$14$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$15_element$$133$$, $state$$17$$, $enable$$17$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$15_element$$133$$, $state$$17$$, $enable$$17$$);
  if(($button$$15_element$$133$$ = $button$$15_element$$133$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$15_element$$133$$.disabled = $enable$$17$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$134$$) {
  return $element$$134$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$135$$, $value$$92$$) {
  $element$$135$$ && ($element$$135$$.value = $value$$92$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 74
function $goog$ui$Button$$($content$$12$$, $opt_renderer$$1$$, $opt_domHelper$$11$$) {
  $goog$ui$Control$$.call(this, $content$$12$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$11$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$93$$) {
  this.$value_$ = $value$$93$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$93$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$76$$) {
  return 13 == $e$$76$$.keyCode && "key" == $e$$76$$.type || 32 == $e$$76$$.keyCode && "keyup" == $e$$76$$.type ? this.$performActionInternal$($e$$76$$) : 32 == $e$$76$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 75
$goog$exportPath_$$("bitex.app.bitex", function($url$$30$$) {
  function $login$$($username$$7$$, $password$$5$$, $opt_second_factor$$1$$) {
    $username$$7$$ = $goog$string$trim$$($username$$7$$);
    var $second_factor$$1$$ = $goog$string$trim$$($opt_second_factor$$1$$ || "");
    if($goog$string$isEmpty$$($username$$7$$)) {
      alert("Nome de usu\u00e1rio inv\u00e1lido")
    }else {
      if($goog$string$isEmpty$$($password$$5$$) || 6 > $password$$5$$.length) {
        alert("Senha deve ter no m\u00ednimo 6 letras")
      }else {
        if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
          try {
            $bitEx$$.open($url$$30$$)
          }catch($e$$111$$) {
            alert("Erro se conectando ao servidor...");
            return
          }
          $goog$events$listenOnce$$($bitEx$$, "opened", function() {
            $goog$string$isEmpty$$($second_factor$$1$$) ? $bitEx$$.login($username$$7$$, $password$$5$$) : $bitEx$$.login($username$$7$$, $password$$5$$, $second_factor$$1$$)
          })
        }else {
          $bitEx$$.close()
        }
      }
    }
  }
  function $onCancelOrder_$$($e$$86$$) {
    $bitEx$$.$cancelOrder$($JSCompiler_alias_VOID$$, $e$$86$$.$order_id$)
  }
  function $price_changed$$($old_px_price$$7_qty$$9$$) {
    var $new_px_suggested_price$$ = $old_px_price$$7_qty$$9$$.toString().trim();
    $old_px_price$$7_qty$$9$$ = $goog$dom$getTextContent$$($goog$dom$getElement$$("formatted_quote_brl"));
    $old_px_price$$7_qty$$9$$ = $old_px_price$$7_qty$$9$$.substring(1).trim();
    $new_px_suggested_price$$ = $new_px_suggested_price$$.substring(0, $new_px_suggested_price$$.length - 3).trim();
    $new_px_suggested_price$$ > $old_px_price$$7_qty$$9$$ && ($goog$dom$getElement$$("formatted_quote_brl").innerHTML = "&#9650;" + $new_px_suggested_price$$);
    $new_px_suggested_price$$ < $old_px_price$$7_qty$$9$$ && ($goog$dom$getElement$$("formatted_quote_brl").innerHTML = "&#9660;" + $new_px_suggested_price$$);
    $old_px_price$$7_qty$$9$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_order_qty"));
    if(!isNaN($old_px_price$$7_qty$$9$$)) {
      var $new_px_suggested_price$$ = ($new_px_suggested_price$$ - 0.1).toFixed(2), $el$$inline_447$$ = $goog$dom$getElement$$("id_price"), $opt_value$$inline_548_option$$inline_544_type$$inline_448$$ = $el$$inline_447$$.type;
      if($goog$isDef$$($opt_value$$inline_548_option$$inline_544_type$$inline_448$$)) {
        switch($opt_value$$inline_548_option$$inline_544_type$$inline_448$$.toLowerCase()) {
          case "checkbox":
          ;
          case "radio":
            $el$$inline_447$$.checked = $new_px_suggested_price$$ ? "checked" : $JSCompiler_alias_NULL$$;
            break;
          case "select-one":
            $el$$inline_447$$.selectedIndex = -1;
            if($goog$isString$$($new_px_suggested_price$$)) {
              for(var $i$$inline_545_option$$inline_549$$ = 0;$opt_value$$inline_548_option$$inline_544_type$$inline_448$$ = $el$$inline_447$$.options[$i$$inline_545_option$$inline_549$$];$i$$inline_545_option$$inline_549$$++) {
                if($opt_value$$inline_548_option$$inline_544_type$$inline_448$$.value == $new_px_suggested_price$$) {
                  $opt_value$$inline_548_option$$inline_544_type$$inline_448$$.selected = $JSCompiler_alias_TRUE$$;
                  break
                }
              }
            }
            break;
          case "select-multiple":
            $opt_value$$inline_548_option$$inline_544_type$$inline_448$$ = $new_px_suggested_price$$;
            $goog$isString$$($opt_value$$inline_548_option$$inline_544_type$$inline_448$$) && ($opt_value$$inline_548_option$$inline_544_type$$inline_448$$ = [$opt_value$$inline_548_option$$inline_544_type$$inline_448$$]);
            for(var $i$$inline_550$$ = 0;$i$$inline_545_option$$inline_549$$ = $el$$inline_447$$.options[$i$$inline_550$$];$i$$inline_550$$++) {
              if($i$$inline_545_option$$inline_549$$.selected = $JSCompiler_alias_FALSE$$, $opt_value$$inline_548_option$$inline_544_type$$inline_448$$) {
                for(var $value$$inline_551$$, $j$$inline_552$$ = 0;$value$$inline_551$$ = $opt_value$$inline_548_option$$inline_544_type$$inline_448$$[$j$$inline_552$$];$j$$inline_552$$++) {
                  $i$$inline_545_option$$inline_549$$.value == $value$$inline_551$$ && ($i$$inline_545_option$$inline_549$$.selected = $JSCompiler_alias_TRUE$$)
                }
              }
            }
            break;
          default:
            $el$$inline_447$$.value = $new_px_suggested_price$$ != $JSCompiler_alias_NULL$$ ? $new_px_suggested_price$$ : ""
        }
      }
      $goog$dom$setTextContent$$($goog$dom$getElement$$("formatted_order_total"), $old_px_price$$7_qty$$9$$ * $new_px_suggested_price$$)
    }
  }
  var $router$$ = new $bitex$app$UrlRouter$$("", "start"), $bitEx$$ = new $bitex$api$BitEx$$, $model$$ = new $bitex$model$Model$$(document.body), $order_book_bid$$ = $JSCompiler_alias_NULL$$, $order_book_offer$$ = $JSCompiler_alias_NULL$$, $account_activity_table$$ = $JSCompiler_alias_NULL$$;
  $router$$.addEventListener("set_view", function($e$$77_view_name$$3$$) {
    $e$$77_view_name$$3$$ = $e$$77_view_name$$3$$.view;
    if(!$bitEx$$.$logged_$) {
      switch($e$$77_view_name$$3$$) {
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
    var $classes$$8$$ = $goog$dom$classes$get$$(document.body), $classes_to_remove$$ = [];
    $goog$array$forEach$$($classes$$8$$, function($cls$$1$$) {
      0 == $cls$$1$$.lastIndexOf("active-view-", 0) && $classes_to_remove$$.push($cls$$1$$)
    });
    $goog$array$forEach$$($classes_to_remove$$, function($cls$$2$$) {
      $goog$dom$classes$remove$$(document.body, $cls$$2$$)
    });
    document.body.scrollTop = 0;
    $goog$dom$classes$add$$(document.body, "active-view-" + $e$$77_view_name$$3$$)
  });
  $router$$.addEventListener("set_view", function($e$$78_el$$46$$) {
    "account_activity" === $e$$78_el$$46$$.view && $bitEx$$.$logged_$ && $account_activity_table$$ == $JSCompiler_alias_NULL$$ && ($e$$78_el$$46$$ = $goog$dom$getElement$$("id_trade_history_table"), $account_activity_table$$ = new $bitex$ui$AccountActivity$$, $account_activity_table$$.addEventListener("request_data", function($e$$79$$) {
      $bitEx$$.$requestOrderList$("closed_orders", $e$$79$$.options.Page, $e$$79$$.options.Limit, ["1", "2"])
    }), $account_activity_table$$.$decorate$($e$$78_el$$46$$), $bitEx$$.addEventListener("order_list_response", function($e$$80_msg$$17$$) {
      $e$$80_msg$$17$$ = $e$$80_msg$$17$$.data;
      "closed_orders" === $e$$80_msg$$17$$.OrdersReqID && $account_activity_table$$ != $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_setResultSet$$($account_activity_table$$, $e$$80_msg$$17$$.OrdListGrp, $e$$80_msg$$17$$.Columns)
    }))
  });
  $router$$.addEventListener("set_view", function($e$$81_form_src$$) {
    if("verification" === $e$$81_form_src$$.view && $bitEx$$.$logged_$) {
      $e$$81_form_src$$ = "/account_verification/?user_id=" + $model$$.get("UserID") + "&username=" + $model$$.get("Username");
      var $verificationIFrameForm$$ = $goog$dom$getElement$$("JotFormIFrame");
      $verificationIFrameForm$$.src !== $e$$81_form_src$$ && ($verificationIFrameForm$$.src = $e$$81_form_src$$)
    }
  });
  $goog$events$listen$$(document.body, "click", function($e$$82$$) {
    var $view_name$$6$$ = $e$$82$$.target.getAttribute("data-switch-view");
    $view_name$$6$$ != $JSCompiler_alias_NULL$$ && ($e$$82$$.preventDefault(), $e$$82$$.stopPropagation(), $JSCompiler_StaticMethods_setView$$($router$$, $view_name$$6$$))
  });
  var $boleto_buttons_order_entry_withdraw_btc$$ = new $bitex$ui$WithdrawBTC$$;
  $boleto_buttons_order_entry_withdraw_btc$$.$decorate$($goog$dom$getElement$$("id_btc_withdraw"));
  $boleto_buttons_order_entry_withdraw_btc$$.addEventListener("withdraw_btc", function($e$$83$$) {
    $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U6", WithdrawReqID:parseInt(1E6 * Math.random(), 10), Amount:$e$$83$$.$qty$, Wallet:$e$$83$$.$address$}))
  });
  $boleto_buttons_order_entry_withdraw_btc$$ = new $bitex$ui$OrderEntry$$;
  $boleto_buttons_order_entry_withdraw_btc$$.$decorate$($goog$dom$getElement$$("id_order_entry"));
  var $order_manager$$ = new $bitex$ui$OrderManager$$;
  $boleto_buttons_order_entry_withdraw_btc$$.addEventListener("buy_limited", function($e$$84_pendingOrderMessage$$) {
    $e$$84_pendingOrderMessage$$ = {OrderID:"-", ClOrdID:"" + $bitEx$$.$sendBuyLimitedOrder$($e$$84_pendingOrderMessage$$.$symbol$, $e$$84_pendingOrderMessage$$.$qty$, $e$$84_pendingOrderMessage$$.$price$), OrdStatus:"-", Symbol:$e$$84_pendingOrderMessage$$.$symbol$, Side:"1", OrderQty:1E8 * $e$$84_pendingOrderMessage$$.$qty$, Price:1E5 * $e$$84_pendingOrderMessage$$.$price$};
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$84_pendingOrderMessage$$)
  });
  $boleto_buttons_order_entry_withdraw_btc$$.addEventListener("sell_limited", function($e$$85_pendingOrderMessage$$1$$) {
    $e$$85_pendingOrderMessage$$1$$ = {OrderID:"-", ClOrdID:"" + $bitEx$$.$sendSellLimitedOrder$($e$$85_pendingOrderMessage$$1$$.$symbol$, $e$$85_pendingOrderMessage$$1$$.$qty$, $e$$85_pendingOrderMessage$$1$$.$price$), OrdStatus:"-", Symbol:$e$$85_pendingOrderMessage$$1$$.$symbol$, Side:"2", OrderQty:1E8 * $e$$85_pendingOrderMessage$$1$$.$qty$, Price:1E5 * $e$$85_pendingOrderMessage$$1$$.$price$};
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$85_pendingOrderMessage$$1$$)
  });
  $bitEx$$.addEventListener("login_ok", function($e$$87_msg$$18$$) {
    $e$$87_msg$$18$$ = $e$$87_msg$$18$$.data;
    $goog$dom$classes$add$$(document.body, "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
    $model$$.set("UserID", $e$$87_msg$$18$$.UserID);
    $model$$.set("Username", $e$$87_msg$$18$$.Username);
    $model$$.set("TwoFactorEnabled", $e$$87_msg$$18$$.TwoFactorEnabled);
    $model$$.set("BtcAddress", $e$$87_msg$$18$$.BtcAddress);
    $order_book_bid$$ != $JSCompiler_alias_NULL$$ && ($order_book_bid$$.$dispose$(), $order_book_offer$$.$dispose$());
    $order_book_bid$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "0");
    $order_book_offer$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "1");
    $order_book_bid$$.$decorate$($goog$dom$getElement$$("order_book_bid"));
    $order_book_offer$$.$decorate$($goog$dom$getElement$$("order_book_offer"));
    $order_book_bid$$.addEventListener("cancel", $onCancelOrder_$$);
    $order_book_offer$$.addEventListener("cancel", $onCancelOrder_$$);
    $order_manager$$.$wasDecorated_$ ? $order_manager$$.reload() : $order_manager$$.$decorate$($goog$dom$getElement$$("id_orders_table"));
    $bitEx$$.$subscribeMarketData$(0, ["BTCBRL"], ["0", "1", "2"]);
    $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U20", BoletoOptionReqId:parseInt(1E7 * Math.random(), 10)}));
    $JSCompiler_StaticMethods_setView$$($router$$, "trading")
  });
  $order_manager$$.addEventListener("cancel", function($e$$88$$) {
    $bitEx$$.$cancelOrder$($e$$88$$.$client_order_id$)
  });
  $bitEx$$.addEventListener("execution_report", function($e$$89_msg$$19$$) {
    $e$$89_msg$$19$$ = $e$$89_msg$$19$$.data;
    switch($e$$89_msg$$19$$.ExecType) {
      case "1":
        $.sticky("Oferta numero: " + $e$$89_msg$$19$$.OrderID + " foi parcialmente executada");
        break;
      case "4":
        $.sticky("Oferta numero: " + $e$$89_msg$$19$$.OrderID + " foi cancelada")
    }
  });
  $bitEx$$.addEventListener("withdraw_response", function($e$$90$$) {
    console.log($e$$90$$.data);
    console.log("====>")
  });
  $bitEx$$.addEventListener("pwd_changed_ok", function($e$$91_msg$$21$$) {
    $e$$91_msg$$21$$ = $e$$91_msg$$21$$.data;
    var $dlg$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$, "Sucesso");
    $dlg$$.$setContent$($e$$91_msg$$21$$.UserStatusText);
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$.$setVisible$($JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_setView$$($router$$, "signin")
  });
  $bitEx$$.addEventListener("pwd_changed_error", function($e$$92_msg$$22$$) {
    $e$$92_msg$$22$$ = $e$$92_msg$$22$$.data;
    var $dlg$$1$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$1$$, "Erro");
    $dlg$$1$$.$setContent$($e$$92_msg$$22$$.UserStatusText);
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$1$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$1$$.$setVisible$($JSCompiler_alias_TRUE$$)
  });
  var $secondFactorDialog$$;
  $bitEx$$.addEventListener("login_error", function($e$$93_msg$$23$$) {
    $goog$dom$classes$add$$(document.body, "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-logged");
    $e$$93_msg$$23$$ = $e$$93_msg$$23$$.data;
    $model$$.set("UserID", "");
    $model$$.set("Username", "");
    if($e$$93_msg$$23$$.NeedSecondFactor) {
      $secondFactorDialog$$ != $JSCompiler_alias_NULL$$ && $secondFactorDialog$$.$dispose$(), $secondFactorDialog$$ = new $bootstrap$Dialog$$, $JSCompiler_StaticMethods_setTitle$$($secondFactorDialog$$, "Autentica\u00e7\u00e3o em 2 passos"), $secondFactorDialog$$.$setContent$('C\u00f3digo de autentica\u00e7\u00e3o do Google Authenticator: <input id="id_second_factor" placeholder="ex. 555555" size="10">'), $JSCompiler_StaticMethods_setButtonSet$$($secondFactorDialog$$, $goog$ui$Dialog$ButtonSet$createOkCancel$$()), 
      $secondFactorDialog$$.$setVisible$($JSCompiler_alias_TRUE$$), $goog$events$listenOnce$$($secondFactorDialog$$, $goog$ui$Dialog$EventType$SELECT$$, function($e$$94_username$$4$$) {
        if("ok" == $e$$94_username$$4$$.key) {
          $e$$94_username$$4$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_username"));
          var $password$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_password")), $second_factor$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_factor"));
          $goog$string$isEmpty$$($e$$94_username$$4$$) && ($e$$94_username$$4$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_username")), $password$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_password")));
          $login$$($e$$94_username$$4$$, $password$$3$$, $second_factor$$)
        }
        $secondFactorDialog$$.$dispose$()
      })
    }else {
      var $error_dialog$$ = new $bootstrap$Dialog$$;
      $JSCompiler_StaticMethods_setTitle$$($error_dialog$$, "Erro");
      $error_dialog$$.$setContent$($e$$93_msg$$23$$.UserStatusText);
      $JSCompiler_StaticMethods_setButtonSet$$($error_dialog$$, $goog$ui$Dialog$ButtonSet$createOk$$());
      $error_dialog$$.$setVisible$($JSCompiler_alias_TRUE$$)
    }
  });
  $bitEx$$.addEventListener("ob_clear", function() {
    $order_book_bid$$.clear();
    $order_book_offer$$.clear()
  });
  $bitEx$$.addEventListener("ob_delete_orders_thru", function($e$$96_index$$70$$) {
    var $msg$$24_side$$4$$ = $e$$96_index$$70$$.data;
    $e$$96_index$$70$$ = $msg$$24_side$$4$$.MDEntryPositionNo;
    $msg$$24_side$$4$$ = $msg$$24_side$$4$$.MDEntryType;
    "0" == $msg$$24_side$$4$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_bid$$, $e$$96_index$$70$$) : "1" == $msg$$24_side$$4$$ && $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_offer$$, $e$$96_index$$70$$)
  });
  $bitEx$$.addEventListener("ob_delete_order", function($e$$97_index$$71$$) {
    var $msg$$25_side$$5$$ = $e$$97_index$$71$$.data;
    $e$$97_index$$71$$ = $msg$$25_side$$5$$.MDEntryPositionNo - 1;
    $msg$$25_side$$5$$ = $msg$$25_side$$5$$.MDEntryType;
    "0" == $msg$$25_side$$5$$ ? $JSCompiler_StaticMethods_deleteOrder$$($order_book_bid$$, $e$$97_index$$71$$) : "1" == $msg$$25_side$$5$$ && $JSCompiler_StaticMethods_deleteOrder$$($order_book_offer$$, $e$$97_index$$71$$)
  });
  $bitEx$$.addEventListener("ob_update_order", function($e$$98_index$$72$$) {
    var $msg$$26_side$$6$$ = $e$$98_index$$72$$.data;
    $e$$98_index$$72$$ = $msg$$26_side$$6$$.MDEntryPositionNo - 1;
    var $qty$$10$$ = ($msg$$26_side$$6$$.MDEntrySize / 1E8).toFixed(8), $msg$$26_side$$6$$ = $msg$$26_side$$6$$.MDEntryType;
    "0" == $msg$$26_side$$6$$ ? $JSCompiler_StaticMethods_updateOrder$$($order_book_bid$$, $e$$98_index$$72$$, $qty$$10$$) : "1" == $msg$$26_side$$6$$ && $JSCompiler_StaticMethods_updateOrder$$($order_book_offer$$, $e$$98_index$$72$$, $qty$$10$$)
  });
  $bitEx$$.addEventListener("ob_new_order", function($e$$99_index$$73$$) {
    var $msg$$27_side$$7$$ = $e$$99_index$$73$$.data;
    $e$$99_index$$73$$ = $msg$$27_side$$7$$.MDEntryPositionNo - 1;
    var $price$$8$$ = ($msg$$27_side$$7$$.MDEntryPx / 1E5).toFixed(5), $qty$$11$$ = ($msg$$27_side$$7$$.MDEntrySize / 1E8).toFixed(8), $username$$5$$ = $msg$$27_side$$7$$.Username, $orderId$$3$$ = $msg$$27_side$$7$$.OrderID, $msg$$27_side$$7$$ = $msg$$27_side$$7$$.MDEntryType;
    "0" == $msg$$27_side$$7$$ ? (0 === $e$$99_index$$73$$ && ($model$$.set("formatted_best_bid_brl", $price$$8$$), $price_changed$$($price$$8$$)), $order_book_bid$$.$insertOrder$($e$$99_index$$73$$, $orderId$$3$$, $price$$8$$, $qty$$11$$, $username$$5$$)) : "1" == $msg$$27_side$$7$$ && (0 === $e$$99_index$$73$$ && ($model$$.set("formatted_best_offer_brl", $price$$8$$), $price_changed$$($price$$8$$)), $order_book_offer$$.$insertOrder$($e$$99_index$$73$$, $orderId$$3$$, $price$$8$$, $qty$$11$$, $username$$5$$))
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_order_qty"), "blur", function() {
    var $new_px$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_price")), $qty$$12$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_order_qty"));
    !isNaN($new_px$$1$$) && !isNaN($qty$$12$$) && $goog$dom$setTextContent$$($goog$dom$getElement$$("formatted_order_total"), $qty$$12$$ * $new_px$$1$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_price"), "blur", function() {
    var $new_px$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_price")), $qty$$13$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_order_qty"));
    !isNaN($new_px$$2$$) && !isNaN($qty$$13$$) && $goog$dom$setTextContent$$($goog$dom$getElement$$("formatted_order_total"), $qty$$13$$ * $new_px$$2$$)
  });
  $bitEx$$.addEventListener("trade", function($e$$102$$) {
    $price_changed$$(($e$$102$$.data.MDEntryPx / 1E5).toFixed(5))
  });
  $bitEx$$.addEventListener("balance_response", function($e$$103_msg$$29$$) {
    $e$$103_msg$$29$$ = $e$$103_msg$$29$$.data;
    $model$$.set("balance_brl", $e$$103_msg$$29$$.balance_brl);
    $model$$.set("balance_btc", $e$$103_msg$$29$$.balance_btc);
    var $formatted_btc$$ = ($e$$103_msg$$29$$.balance_btc / 1E8).toFixed(8);
    $model$$.set("formatted_balance_brl", ($e$$103_msg$$29$$.balance_brl / 1E5).toFixed(2));
    $model$$.set("formatted_balance_btc", $formatted_btc$$)
  });
  $bitEx$$.addEventListener("execution_report", function($e$$104$$) {
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$104$$.data)
  });
  $order_manager$$.addEventListener("request_data", function($e$$105$$) {
    $bitEx$$.$requestOrderList$("open_orders", $e$$105$$.options.Page, $e$$105$$.options.Limit, ["0", "1"])
  });
  $bitEx$$.addEventListener("order_list_response", function($e$$106_msg$$30$$) {
    $e$$106_msg$$30$$ = $e$$106_msg$$30$$.data;
    "open_orders" === $e$$106_msg$$30$$.OrdersReqID && $JSCompiler_StaticMethods_setResultSet$$($order_manager$$, $e$$106_msg$$30$$.OrdListGrp, $e$$106_msg$$30$$.Columns)
  });
  var $button_signup$$ = new $goog$ui$Button$$;
  $button_signup$$.$decorate$($goog$dom$getElement$$("id_btn_signup"));
  $goog$events$listen$$($goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$107$$) {
    $button_signup$$.$setEnabled$($e$$107$$.target.checked)
  });
  $button_signup$$.addEventListener("action", function($e$$108_password2$$) {
    $e$$108_password2$$.stopPropagation();
    $e$$108_password2$$.preventDefault();
    var $username$$6$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username")), $email$$2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email")), $password$$4$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password"));
    $e$$108_password2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password2"));
    if($goog$string$isEmpty$$($username$$6$$) || /[^a-zA-Z0-9]/.test($username$$6$$)) {
      alert("Nome de usu\u00e1rio inv\u00e1lido")
    }else {
      if($email$$2$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        if($goog$string$isEmpty$$($password$$4$$) || 6 > $password$$4$$.length) {
          alert("Senha deve ter no m\u00ednimo 6 letras")
        }else {
          if($password$$4$$ !== $e$$108_password2$$) {
            alert("Senhas n\u00e3o conferem")
          }else {
            if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
              try {
                $bitEx$$.open($url$$30$$)
              }catch($e$$109$$) {
                alert("Erro se conectando ao servidor...");
                return
              }
              $goog$events$listenOnce$$($bitEx$$, "opened", function() {
                $bitEx$$.$signUp$($username$$6$$, $password$$4$$, $email$$2$$)
              })
            }else {
              $bitEx$$.close()
            }
          }
        }
      }else {
        alert("Endere\u00e7o de email inv\u00e1lido")
      }
    }
  });
  $bitEx$$.addEventListener("two_factor_secret", function($e$$113_msg$$31$$) {
    $e$$113_msg$$31$$ = $e$$113_msg$$31$$.data;
    $model$$.set("TwoFactorSecret", $e$$113_msg$$31$$.TwoFactorSecret);
    $model$$.set("TwoFactorEnabled", $e$$113_msg$$31$$.TwoFactorEnabled);
    var $secret_qr_el$$ = $goog$dom$getElement$$("id_secret_qr"), $divEl$$ = $goog$dom$getElement$$("id_enable_two_factor_div");
    $goog$string$isEmpty$$($e$$113_msg$$31$$.TwoFactorSecret) ? $goog$style$showElement$$($divEl$$, $JSCompiler_alias_FALSE$$) : ($goog$style$showElement$$($divEl$$, $JSCompiler_alias_TRUE$$), $secret_qr_el$$.setAttribute("src", "https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=" + $e$$113_msg$$31$$.TwoFactorSecret))
  });
  $model$$.addEventListener("model_setBtcAddress", function($e$$114_qr_code$$1$$) {
    $e$$114_qr_code$$1$$ = "https://chart.googleapis.com/chart?chs=100x100&chld=M%7C0&cht=qr&chl=" + $e$$114_qr_code$$1$$.data;
    btc_adrress_el = $goog$dom$getElement$$("id_bitcoin_address_img");
    btc_adrress_el.setAttribute("src", $e$$114_qr_code$$1$$)
  });
  $model$$.addEventListener("model_setTwoFactorSecret", function($e$$115$$) {
    $goog$style$showElement$$($goog$dom$getElement$$("id_enable_two_factor_div"), $goog$string$isEmpty$$($e$$115$$.data))
  });
  $model$$.addEventListener("model_setTwoFactorEnabled", function($e$$116_enabled$$5$$) {
    $e$$116_enabled$$5$$ = $e$$116_enabled$$5$$.data;
    var $has_secret$$1_secret$$1$$ = $model$$.get("TwoFactorSecret"), $has_secret$$1_secret$$1$$ = $goog$string$isEmpty$$($has_secret$$1_secret$$1$$), $divEl$$2$$ = $goog$dom$getElement$$("id_enable_two_factor_div"), $btnDisableEl$$ = $goog$dom$getElement$$("id_btn_disable_two_factor");
    $goog$style$showElement$$($goog$dom$getElement$$("id_btn_enable_two_factor"), !$e$$116_enabled$$5$$);
    $goog$style$showElement$$($btnDisableEl$$, $e$$116_enabled$$5$$);
    $goog$style$showElement$$($divEl$$2$$, $has_secret$$1_secret$$1$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_enable_two_factor"), "click", function() {
    var $secret$$2$$ = $model$$.get("TwoFactorSecret"), $code$$4$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_second_step_verification"));
    $bitEx$$.$enableTwoFactor$($JSCompiler_alias_TRUE$$, $secret$$2$$, $code$$4$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_disable_two_factor"), "click", function() {
    $bitEx$$.$enableTwoFactor$($JSCompiler_alias_FALSE$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_forgot_password"), "click", function($e$$119$$) {
    $e$$119$$.stopPropagation();
    $e$$119$$.preventDefault();
    var $email$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_forgot_password_email"));
    if($email$$3$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
        try {
          $bitEx$$.open($url$$30$$)
        }catch($e$$120$$) {
          alert("Erro se conectando ao servidor...");
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
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_set_new_password"), "click", function($e$$122_password2$$1$$) {
    $e$$122_password2$$1$$.stopPropagation();
    $e$$122_password2$$1$$.preventDefault();
    var $token$$10$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_token")), $password$$6$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password"));
    $e$$122_password2$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_set_new_password_password2"));
    if($goog$string$isEmpty$$($token$$10$$)) {
      alert("Por favor, informe um c\u00f3digo de confirma\u00e7\u00e3o")
    }else {
      if($goog$string$isEmpty$$($password$$6$$) || 6 > $password$$6$$.length) {
        alert("Senha deve ter no m\u00ednimo 6 letras")
      }else {
        if($password$$6$$ !== $e$$122_password2$$1$$) {
          alert("Senhas n\u00e3o conferem")
        }else {
          if($goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")) {
            try {
              $bitEx$$.open($url$$30$$)
            }catch($e$$123$$) {
              alert("Erro se conectando ao servidor...");
              return
            }
            $goog$events$listenOnce$$($bitEx$$, "opened", function() {
              $bitEx$$.$resetPassword$($token$$10$$, $password$$6$$)
            })
          }else {
            $bitEx$$.$resetPassword$($token$$10$$, $password$$6$$)
          }
        }
      }
    }
  });
  $boleto_buttons_order_entry_withdraw_btc$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
  $goog$array$forEach$$($boleto_buttons_order_entry_withdraw_btc$$, function($boleto_button$$) {
    $goog$events$listen$$($boleto_button$$, "click", function($e$$125_value$$95$$) {
      $e$$125_value$$95$$.stopPropagation();
      $e$$125_value$$95$$.preventDefault();
      var $boleto_id_element$$137$$ = $e$$125_value$$95$$.target;
      $e$$125_value$$95$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_boleto_value"));
      $boleto_id_element$$137$$ = $boleto_id_element$$137$$.getAttribute("data-boleto-id");
      $boleto_id_element$$137$$ != $JSCompiler_alias_NULL$$ && ($goog$string$isEmpty$$($e$$125_value$$95$$) || /[^0-9]/.test($e$$125_value$$95$$) || 0 >= parseInt($e$$125_value$$95$$, 10) ? alert("Por favor, preencha o valor do boleto a ser gerado") : $bitEx$$.$ws_$.send(JSON.stringify({MsgType:"U18", BoletoId:$boleto_id_element$$137$$, Value:$e$$125_value$$95$$})))
    })
  });
  $bitEx$$.addEventListener("boleto_options_response", function($boleto_options_group_elements_e$$126$$) {
    var $msg$$32$$ = $boleto_options_group_elements_e$$126$$.data;
    $boleto_options_group_elements_e$$126$$ = $goog$dom$getElementsByClass$$("boleto-options-group");
    $goog$array$forEach$$($boleto_options_group_elements_e$$126$$, function($boleto_options_group_element$$) {
      $goog$dom$removeChildren$$($boleto_options_group_element$$);
      $goog$array$forEach$$($msg$$32$$.BoletoOptionGrp, function($boleto_option_buttonElement$$) {
        $boleto_option_buttonElement$$ = $goog$dom$createDom$$("BUTTON", {"data-boleto-id":$boleto_option_buttonElement$$.BoletoId, "class":"btn btn-primary btn-boleto"}, $boleto_option_buttonElement$$.Description);
        $boleto_options_group_element$$.appendChild($boleto_option_buttonElement$$)
      })
    })
  });
  $bitEx$$.addEventListener("generate_boleto_response", function($e$$127_msg$$33$$) {
    $e$$127_msg$$33$$ = $e$$127_msg$$33$$.data;
    var $dlg$$2$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$2$$, "Boleto");
    $dlg$$2$$.$setContent$('<a  target="_blank" href="/print_boleto?boleto_id=' + $e$$127_msg$$33$$.BoletoId + '" class="btn btn-primary">Imprimir boleto</a> ou fazer <a href="/print_boleto?download=1&boleto_id=' + $e$$127_msg$$33$$.BoletoId + '">download do boleto</a> em seu computador');
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$2$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$2$$.$setVisible$($JSCompiler_alias_TRUE$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_landing_signin"), "click", function($e$$128_username$$8$$) {
    $e$$128_username$$8$$.stopPropagation();
    $e$$128_username$$8$$.preventDefault();
    $e$$128_username$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_username"));
    var $password$$7$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_password"));
    $login$$($e$$128_username$$8$$, $password$$7$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_login"), "click", function($e$$129_username$$9$$) {
    $e$$129_username$$9$$.stopPropagation();
    $e$$129_username$$9$$.preventDefault();
    $e$$129_username$$9$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_username"));
    var $password$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_password"));
    $login$$($e$$129_username$$9$$, $password$$8$$)
  });
  $bitEx$$.addEventListener("opened", function() {
    $goog$dom$classes$remove$$(document.body, "ws-not-connected");
    $goog$dom$classes$add$$(document.body, "ws-connected")
  });
  $bitEx$$.addEventListener("closed", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    $JSCompiler_StaticMethods_setView$$($router$$, "start")
  });
  $bitEx$$.addEventListener("error", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    var $dlg$$3$$ = new $bootstrap$Dialog$$;
    $JSCompiler_StaticMethods_setTitle$$($dlg$$3$$, "Erro");
    $dlg$$3$$.$setContent$("Ocorreu um erro ao se conectar com a BitEx. Por favor, verifique se voc\u00ea possui um Browser de \u00faltima gera\u00e7\u00e3o.");
    $JSCompiler_StaticMethods_setButtonSet$$($dlg$$3$$, $goog$ui$Dialog$ButtonSet$createOk$$());
    $dlg$$3$$.$setVisible$($JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_setView$$($router$$, "start")
  })
});

