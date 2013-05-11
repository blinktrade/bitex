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
    !$parts$$.length && $opt_object$$ !== $JSCompiler_alias_VOID$$ ? $cur$$[$part$$] = $opt_object$$ : $cur$$ = $cur$$[$part$$] ? $cur$$[$part$$] : $cur$$[$part$$] = {}
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
function $goog$string$regExpEscape$$($s$$12$$) {
  return String($s$$12$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
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
// Input 2
var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_38$$;
if($ua$$inline_38$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_39$$ = $goog$global$$.navigator;
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_38$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_38$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_38$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_39$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_41$$ = $goog$global$$.navigator, $goog$userAgent$MAC$$ = -1 != ($navigator$$inline_41$$ && $navigator$$inline_41$$.platform || "").indexOf("Mac");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_44$$ = "", $re$$inline_45$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_46$$ = $goog$global$$.opera.version, $version$$inline_44$$ = "function" == typeof $operaVersion$$inline_46$$ ? $operaVersion$$inline_46$$() : $operaVersion$$inline_46$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_45$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_45$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_45$$ = /WebKit\/(\S+)/), $re$$inline_45$$) {
      var $arr$$inline_47$$ = $re$$inline_45$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_44$$ = $arr$$inline_47$$ ? $arr$$inline_47$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_48$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_48$$ > parseFloat($version$$inline_44$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_48$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_44$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$34_order$$inline_52$$;
  if(!($JSCompiler_temp$$34_order$$inline_52$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$34_order$$inline_52$$ = 0;
    for(var $v1Subs$$inline_53$$ = String($goog$userAgent$VERSION$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $v2Subs$$inline_54$$ = String($version$$8$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $subCount$$inline_55$$ = Math.max($v1Subs$$inline_53$$.length, $v2Subs$$inline_54$$.length), $subIdx$$inline_56$$ = 0;0 == $JSCompiler_temp$$34_order$$inline_52$$ && $subIdx$$inline_56$$ < $subCount$$inline_55$$;$subIdx$$inline_56$$++) {
      var $v1Sub$$inline_57$$ = $v1Subs$$inline_53$$[$subIdx$$inline_56$$] || "", $v2Sub$$inline_58$$ = $v2Subs$$inline_54$$[$subIdx$$inline_56$$] || "", $v1CompParser$$inline_59$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_60$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_61$$ = $v1CompParser$$inline_59$$.exec($v1Sub$$inline_57$$) || ["", "", ""], $v2Comp$$inline_62$$ = $v2CompParser$$inline_60$$.exec($v2Sub$$inline_58$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_61$$[0].length && 0 == $v2Comp$$inline_62$$[0].length) {
          break
        }
        $JSCompiler_temp$$34_order$$inline_52$$ = ((0 == $v1Comp$$inline_61$$[1].length ? 0 : parseInt($v1Comp$$inline_61$$[1], 10)) < (0 == $v2Comp$$inline_62$$[1].length ? 0 : parseInt($v2Comp$$inline_62$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_61$$[1].length ? 0 : parseInt($v1Comp$$inline_61$$[1], 10)) > (0 == $v2Comp$$inline_62$$[1].length ? 0 : parseInt($v2Comp$$inline_62$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_61$$[2].length) < (0 == $v2Comp$$inline_62$$[2].length) ? -1 : (0 == $v1Comp$$inline_61$$[2].length) > 
        (0 == $v2Comp$$inline_62$$[2].length) ? 1 : 0) || ($v1Comp$$inline_61$$[2] < $v2Comp$$inline_62$$[2] ? -1 : $v1Comp$$inline_61$$[2] > $v2Comp$$inline_62$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$34_order$$inline_52$$)
    }
    $JSCompiler_temp$$34_order$$inline_52$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$34_order$$inline_52$$
  }
  return $JSCompiler_temp$$34_order$$inline_52$$
}
var $doc$$inline_64$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_64$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_64$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
// Input 3
function $goog$object$forEach$$($obj$$40$$, $f$$, $opt_obj$$1$$) {
  for(var $key$$18$$ in $obj$$40$$) {
    $f$$.call($opt_obj$$1$$, $obj$$40$$[$key$$18$$], $key$$18$$, $obj$$40$$)
  }
}
function $goog$object$getValues$$($obj$$49$$) {
  var $res$$2$$ = [], $i$$12$$ = 0, $key$$26$$;
  for($key$$26$$ in $obj$$49$$) {
    $res$$2$$[$i$$12$$++] = $obj$$49$$[$key$$26$$]
  }
  return $res$$2$$
}
function $goog$object$getKeys$$($obj$$50$$) {
  var $res$$3$$ = [], $i$$13$$ = 0, $key$$27$$;
  for($key$$27$$ in $obj$$50$$) {
    $res$$3$$[$i$$13$$++] = $key$$27$$
  }
  return $res$$3$$
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$47$$, $var_args$$45$$) {
  for(var $key$$41$$, $source$$2$$, $i$$16$$ = 1;$i$$16$$ < arguments.length;$i$$16$$++) {
    $source$$2$$ = arguments[$i$$16$$];
    for($key$$41$$ in $source$$2$$) {
      $target$$47$$[$key$$41$$] = $source$$2$$[$key$$41$$]
    }
    for(var $j$$1$$ = 0;$j$$1$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$1$$++) {
      $key$$41$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$1$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$41$$) && ($target$$47$$[$key$$41$$] = $source$$2$$[$key$$41$$])
    }
  }
}
;
// Input 4
// Input 5
// Input 6
var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$17$$, $obj$$68$$, $opt_fromIndex$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$17$$, $obj$$68$$, $opt_fromIndex$$6$$)
} : function($arr$$18$$, $obj$$69$$, $fromIndex$$2_i$$19_opt_fromIndex$$7$$) {
  $fromIndex$$2_i$$19_opt_fromIndex$$7$$ = $fromIndex$$2_i$$19_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex$$2_i$$19_opt_fromIndex$$7$$ ? Math.max(0, $arr$$18$$.length + $fromIndex$$2_i$$19_opt_fromIndex$$7$$) : $fromIndex$$2_i$$19_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$18$$)) {
    return!$goog$isString$$($obj$$69$$) || 1 != $obj$$69$$.length ? -1 : $arr$$18$$.indexOf($obj$$69$$, $fromIndex$$2_i$$19_opt_fromIndex$$7$$)
  }
  for(;$fromIndex$$2_i$$19_opt_fromIndex$$7$$ < $arr$$18$$.length;$fromIndex$$2_i$$19_opt_fromIndex$$7$$++) {
    if($fromIndex$$2_i$$19_opt_fromIndex$$7$$ in $arr$$18$$ && $arr$$18$$[$fromIndex$$2_i$$19_opt_fromIndex$$7$$] === $obj$$69$$) {
      return $fromIndex$$2_i$$19_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$21$$, $f$$7$$, $opt_obj$$6$$) {
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$21$$, $f$$7$$, $opt_obj$$6$$)
} : function($arr$$22$$, $f$$8$$, $opt_obj$$7$$) {
  for(var $l$$2$$ = $arr$$22$$.length, $arr2$$ = $goog$isString$$($arr$$22$$) ? $arr$$22$$.split("") : $arr$$22$$, $i$$21$$ = 0;$i$$21$$ < $l$$2$$;$i$$21$$++) {
    $i$$21$$ in $arr2$$ && $f$$8$$.call($opt_obj$$7$$, $arr2$$[$i$$21$$], $i$$21$$, $arr$$22$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$24$$, $f$$10$$, $opt_obj$$9$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$24$$, $f$$10$$, $opt_obj$$9$$)
} : function($arr$$25$$, $f$$11$$, $opt_obj$$10$$) {
  for(var $l$$4$$ = $arr$$25$$.length, $res$$5$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$25$$) ? $arr$$25$$.split("") : $arr$$25$$, $i$$23$$ = 0;$i$$23$$ < $l$$4$$;$i$$23$$++) {
    if($i$$23$$ in $arr2$$2$$) {
      var $val$$14$$ = $arr2$$2$$[$i$$23$$];
      $f$$11$$.call($opt_obj$$10$$, $val$$14$$, $i$$23$$, $arr$$25$$) && ($res$$5$$[$resLength$$++] = $val$$14$$)
    }
  }
  return $res$$5$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$26$$, $f$$12$$, $opt_obj$$11$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$26$$, $f$$12$$, $opt_obj$$11$$)
} : function($arr$$27$$, $f$$13$$, $opt_obj$$12$$) {
  for(var $l$$5$$ = $arr$$27$$.length, $res$$6$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$27$$) ? $arr$$27$$.split("") : $arr$$27$$, $i$$24$$ = 0;$i$$24$$ < $l$$5$$;$i$$24$$++) {
    $i$$24$$ in $arr2$$3$$ && ($res$$6$$[$i$$24$$] = $f$$13$$.call($opt_obj$$12$$, $arr2$$3$$[$i$$24$$], $i$$24$$, $arr$$27$$))
  }
  return $res$$6$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$32$$, $f$$18$$, $opt_obj$$17$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$32$$, $f$$18$$, $opt_obj$$17$$)
} : function($arr$$33$$, $f$$19$$, $opt_obj$$18$$) {
  for(var $l$$7$$ = $arr$$33$$.length, $arr2$$5$$ = $goog$isString$$($arr$$33$$) ? $arr$$33$$.split("") : $arr$$33$$, $i$$26$$ = 0;$i$$26$$ < $l$$7$$;$i$$26$$++) {
    if($i$$26$$ in $arr2$$5$$ && !$f$$19$$.call($opt_obj$$18$$, $arr2$$5$$[$i$$26$$], $i$$26$$, $arr$$33$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$findIndex$$($arr$$37$$, $f$$22$$) {
  for(var $l$$8$$ = $arr$$37$$.length, $arr2$$6$$ = $goog$isString$$($arr$$37$$) ? $arr$$37$$.split("") : $arr$$37$$, $i$$28$$ = 0;$i$$28$$ < $l$$8$$;$i$$28$$++) {
    if($i$$28$$ in $arr2$$6$$ && $f$$22$$.call($JSCompiler_alias_VOID$$, $arr2$$6$$[$i$$28$$], $i$$28$$, $arr$$37$$)) {
      return $i$$28$$
    }
  }
  return-1
}
function $goog$array$contains$$($arr$$40$$, $obj$$72$$) {
  return 0 <= $goog$array$indexOf$$($arr$$40$$, $obj$$72$$)
}
function $goog$array$remove$$($arr$$47$$, $obj$$76$$) {
  var $i$$33$$ = $goog$array$indexOf$$($arr$$47$$, $obj$$76$$);
  0 <= $i$$33$$ && $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$47$$, $i$$33$$, 1)
}
function $goog$array$toArray$$($object$$2$$) {
  var $length$$15$$ = $object$$2$$.length;
  if(0 < $length$$15$$) {
    for(var $rv$$7$$ = Array($length$$15$$), $i$$36$$ = 0;$i$$36$$ < $length$$15$$;$i$$36$$++) {
      $rv$$7$$[$i$$36$$] = $object$$2$$[$i$$36$$]
    }
    return $rv$$7$$
  }
  return[]
}
function $goog$array$slice$$($arr$$51$$, $start$$6$$, $opt_end$$13$$) {
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$51$$, $start$$6$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$51$$, $start$$6$$, $opt_end$$13$$)
}
;
// Input 7
// Input 8
// Input 9
// Input 10
function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
$goog$math$Size$$.prototype.round = function $$goog$math$Size$$$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
// Input 11
// Input 12
var $goog$dom$defaultDomHelper_$$;
// Input 13
function $goog$dom$classes$get$$($className$$5_element$$9$$) {
  $className$$5_element$$9$$ = $className$$5_element$$9$$.className;
  return $goog$isString$$($className$$5_element$$9$$) && $className$$5_element$$9$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$10$$, $var_args$$66$$) {
  var $classes$$ = $goog$dom$classes$get$$($element$$10$$), $args$$6$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$6$$.length;
  $goog$dom$classes$add_$$($classes$$, $args$$6$$);
  $element$$10$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$11$$, $var_args$$67$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$11$$), $args$$7$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$7$$);
  $element$$11$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$7$$.length
}
function $goog$dom$classes$add_$$($classes$$2$$, $args$$8$$) {
  for(var $i$$50$$ = 0;$i$$50$$ < $args$$8$$.length;$i$$50$$++) {
    $goog$array$contains$$($classes$$2$$, $args$$8$$[$i$$50$$]) || $classes$$2$$.push($args$$8$$[$i$$50$$])
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
function $goog$dom$classes$has$$() {
  return $goog$array$contains$$($goog$dom$classes$get$$(document.body), "ws-not-connected")
}
;
// Input 14
// Input 15
var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
// Input 16
function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElement$$($element$$17$$) {
  return $goog$isString$$($element$$17$$) ? document.getElementById($element$$17$$) : $element$$17$$
}
function $goog$dom$getElementByClass$$($className$$10$$, $opt_el$$2$$) {
  var $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$ = $opt_el$$2$$ || document;
  $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelectorAll && $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelector ? $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$ = $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelector("." + $className$$10$$) : ($JSCompiler_temp$$9_parent$$3_parent$$inline_84$$ = $opt_el$$2$$ || document, $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$ = ($JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelectorAll && $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelector ? 
  $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.querySelectorAll("." + $className$$10$$) : $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.getElementsByClassName ? $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$.getElementsByClassName($className$$10$$) : $goog$dom$getElementsByTagNameAndClass_$$(document, "*", $className$$10$$, $opt_el$$2$$))[0]);
  return $JSCompiler_temp$$9_parent$$3_parent$$inline_84$$ || $JSCompiler_alias_NULL$$
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
      for(var $len$$ = 0, $i$$52$$ = 0, $el$$1$$;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$52$$];$i$$52$$++) {
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
    for($i$$52$$ = $len$$ = 0;$el$$1$$ = $doc$$6_els_parent$$5$$[$i$$52$$];$i$$52$$++) {
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
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$68$$) {
  return $goog$dom$createDom_$$(document, arguments)
}
function $goog$dom$createDom_$$($doc$$12$$, $args$$9$$) {
  var $element$$19_tagName$$3_tagNameArr$$ = $args$$9$$[0], $attributes$$ = $args$$9$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$19_tagName$$3_tagNameArr$$ = ["<", $element$$19_tagName$$3_tagNameArr$$];
    $attributes$$.name && $element$$19_tagName$$3_tagNameArr$$.push(' name="', $goog$string$htmlEscape$$($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$19_tagName$$3_tagNameArr$$.push(' type="', $goog$string$htmlEscape$$($attributes$$.type), '"');
      var $clone$$3$$ = {};
      $goog$object$extend$$($clone$$3$$, $attributes$$);
      delete $clone$$3$$.type;
      $attributes$$ = $clone$$3$$
    }
    $element$$19_tagName$$3_tagNameArr$$.push(">");
    $element$$19_tagName$$3_tagNameArr$$ = $element$$19_tagName$$3_tagNameArr$$.join("")
  }
  $element$$19_tagName$$3_tagNameArr$$ = $doc$$12$$.createElement($element$$19_tagName$$3_tagNameArr$$);
  $attributes$$ && ($goog$isString$$($attributes$$) ? $element$$19_tagName$$3_tagNameArr$$.className = $attributes$$ : $goog$isArray$$($attributes$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$19_tagName$$3_tagNameArr$$].concat($attributes$$)) : $goog$dom$setProperties$$($element$$19_tagName$$3_tagNameArr$$, $attributes$$));
  2 < $args$$9$$.length && $goog$dom$append_$$($doc$$12$$, $element$$19_tagName$$3_tagNameArr$$, $args$$9$$);
  return $element$$19_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$13$$, $parent$$6$$, $args$$10$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$6$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$13$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(var $i$$53$$ = 2;$i$$53$$ < $args$$10$$.length;$i$$53$$++) {
    var $arg$$5$$ = $args$$10$$[$i$$53$$];
    if($goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType)) {
      var $JSCompiler_inline_result$$1$$;
      a: {
        if($arg$$5$$ && "number" == typeof $arg$$5$$.length) {
          if($goog$isObject$$($arg$$5$$)) {
            $JSCompiler_inline_result$$1$$ = "function" == typeof $arg$$5$$.item || "string" == typeof $arg$$5$$.item;
            break a
          }
          if($goog$isFunction$$($arg$$5$$)) {
            $JSCompiler_inline_result$$1$$ = "function" == typeof $arg$$5$$.item;
            break a
          }
        }
        $JSCompiler_inline_result$$1$$ = $JSCompiler_alias_FALSE$$
      }
      $goog$array$forEach$$($JSCompiler_inline_result$$1$$ ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$)
    }else {
      $childHandler$$($arg$$5$$)
    }
  }
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
  return $attrNode$$ && $attrNode$$.specified ? ($element$$25_index$$55$$ = $element$$25_index$$55$$.tabIndex, "number" == typeof $element$$25_index$$55$$ && 0 <= $element$$25_index$$55$$ && 32768 > $element$$25_index$$55$$) : $JSCompiler_alias_FALSE$$
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
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$30$$) {
  return $goog$isString$$($element$$30$$) ? this.$document_$.getElementById($element$$30$$) : $element$$30$$
};
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$14$$, $opt_el$$6$$) {
  return $goog$dom$getElementByClass$$($className$$14$$, $opt_el$$6$$ || this.$document_$)
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
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.$insertChildAt$ = $goog$dom$insertChildAt$$;
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
$JSCompiler_prototypeAlias$$.$getChildren$ = $goog$dom$getChildren$$;
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$setTextContent$ = $goog$dom$setTextContent$$;
// Input 17
function $goog$style$setStyle_$$($element$$32$$, $value$$67$$, $prefixedStyle$$inline_91_style$$1$$) {
  var $camelStyle$$inline_90_propertyName$$8$$;
  a: {
    if($camelStyle$$inline_90_propertyName$$8$$ = $goog$string$toCamelCase$$($prefixedStyle$$inline_91_style$$1$$), $element$$32$$.style[$camelStyle$$inline_90_propertyName$$8$$] === $JSCompiler_alias_VOID$$ && ($prefixedStyle$$inline_91_style$$1$$ = ($goog$userAgent$WEBKIT$$ ? "Webkit" : $goog$userAgent$GECKO$$ ? "Moz" : $goog$userAgent$IE$$ ? "ms" : $goog$userAgent$OPERA$$ ? "O" : $JSCompiler_alias_NULL$$) + $goog$string$toTitleCase$$($prefixedStyle$$inline_91_style$$1$$), $element$$32$$.style[$prefixedStyle$$inline_91_style$$1$$] !== 
    $JSCompiler_alias_VOID$$)) {
      $camelStyle$$inline_90_propertyName$$8$$ = $prefixedStyle$$inline_91_style$$1$$;
      break a
    }
  }
  $camelStyle$$inline_90_propertyName$$8$$ && ($element$$32$$.style[$camelStyle$$inline_90_propertyName$$8$$] = $value$$67$$)
}
function $goog$style$getComputedStyle$$($element$$36$$, $property$$4$$) {
  var $doc$$24_styles$$ = $goog$dom$getOwnerDocument$$($element$$36$$);
  return $doc$$24_styles$$.defaultView && $doc$$24_styles$$.defaultView.getComputedStyle && ($doc$$24_styles$$ = $doc$$24_styles$$.defaultView.getComputedStyle($element$$36$$, $JSCompiler_alias_NULL$$)) ? $doc$$24_styles$$[$property$$4$$] || $doc$$24_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getPixelStyleValue_$$($value$$68$$) {
  "number" == typeof $value$$68$$ && ($value$$68$$ = Math.round($value$$68$$) + "px");
  return $value$$68$$
}
function $goog$style$getSizeWithDisplay_$$($doc$$inline_95_element$$55$$) {
  var $offsetWidth_rect$$inline_94$$ = $doc$$inline_95_element$$55$$.offsetWidth, $offsetHeight$$ = $doc$$inline_95_element$$55$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_94$$ && !$offsetHeight$$;
  return($offsetWidth_rect$$inline_94$$ === $JSCompiler_alias_VOID$$ || $webkitOffsetsZero$$) && $doc$$inline_95_element$$55$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_94$$ = $doc$$inline_95_element$$55$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_95_element$$55$$ = $doc$$inline_95_element$$55$$.ownerDocument, $offsetWidth_rect$$inline_94$$.left -= $doc$$inline_95_element$$55$$.documentElement.clientLeft + $doc$$inline_95_element$$55$$.body.clientLeft, $offsetWidth_rect$$inline_94$$.top -= 
  $doc$$inline_95_element$$55$$.documentElement.clientTop + $doc$$inline_95_element$$55$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_94$$.right - $offsetWidth_rect$$inline_94$$.left, $offsetWidth_rect$$inline_94$$.bottom - $offsetWidth_rect$$inline_94$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_94$$, $offsetHeight$$)
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$;
// Input 18
// Input 19
// Input 20
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
// Input 21
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
// Input 22
var $goog$events$ListenableKey$counter_$$ = 0;
// Input 23
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
// Input 24
var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
// Input 25
// Input 26
// Input 27
// Input 28
function $goog$reflect$sinkValue$$($x$$62$$) {
  $goog$reflect$sinkValue$$[" "]($x$$62$$);
  return $x$$62$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
// Input 29
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
      var $JSCompiler_inline_result$$29$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$29$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_99$$) {
        }
        $JSCompiler_inline_result$$29$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$29$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
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
  this.$platformModifierKey$ = $goog$userAgent$MAC$$ ? $e$$17$$.metaKey : $e$$17$$.ctrlKey;
  this.state = $e$$17$$.state;
  this.$event_$ = $e$$17$$;
  $e$$17$$.defaultPrevented && this.preventDefault();
  delete this.$propagationStopped_$
};
function $JSCompiler_StaticMethods_isButton$$($JSCompiler_StaticMethods_isButton$self$$) {
  return $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ ? 0 == $JSCompiler_StaticMethods_isButton$self$$.$event_$.button : "click" == $JSCompiler_StaticMethods_isButton$self$$.type ? $JSCompiler_alias_TRUE$$ : !!($JSCompiler_StaticMethods_isButton$self$$.$event_$.button & $goog$events$BrowserEvent$IEButtonMap$$[0])
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
// Input 30
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
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_part$$inline_105_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$;
    if(!($JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$ = ["window", "event"];
        for(var $cur$$inline_104_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_105_retval$$1$$ = $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$.shift();) {
          if($cur$$inline_104_hasBubble$$1$$[$ieEvent_part$$inline_105_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_104_hasBubble$$1$$ = $cur$$inline_104_hasBubble$$1$$[$ieEvent_part$$inline_105_retval$$1$$]
          }else {
            $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$ = $cur$$inline_104_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_105_retval$$1$$ = $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$;
    $JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_104_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$) {
      if(0 > $ieEvent_part$$inline_105_retval$$1$$.keyCode || $ieEvent_part$$inline_105_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_108$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_105_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_105_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_109$$) {
            $evt$$16_useReturnValue$$inline_108$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_108$$ || $ieEvent_part$$inline_105_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_105_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_108$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_108$$.init($ieEvent_part$$inline_105_retval$$1$$, this);
    $ieEvent_part$$inline_105_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$14_hasCapture$$2_parts$$inline_103$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_108$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$70$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_108$$.$propagationStopped_$ && 0 <= $i$$70$$ && $targetsMap$$1$$.$remaining_$;$i$$70$$--) {
          $evt$$16_useReturnValue$$inline_108$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_105_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_108$$)
        }
        if($cur$$inline_104_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$70$$ = 0;!$evt$$16_useReturnValue$$inline_108$$.$propagationStopped_$ && $i$$70$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$70$$++) {
            $evt$$16_useReturnValue$$inline_108$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_105_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_108$$)
          }
        }
      }else {
        $ieEvent_part$$inline_105_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_108$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_105_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_105_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
}
;
// Input 31
function $goog$events$EventHandler$$($opt_handler$$8$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$8$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$17$$, $type$$75$$, $opt_fn$$4$$) {
  $goog$isArray$$($type$$75$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$75$$, $type$$75$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$71$$ = 0;$i$$71$$ < $type$$75$$.length;$i$$71$$++) {
    var $key$$52$$ = $goog$events$listen$$($src$$17$$, $type$$75$$[$i$$71$$], $opt_fn$$4$$ || $JSCompiler_StaticMethods_listen$self$$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$52$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$, $i$$inline_119_type$$77$$, $listener$$inline_114_opt_fn$$6$$, $capture$$inline_117_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_116$$) {
  if($goog$isArray$$($i$$inline_119_type$$77$$)) {
    for(var $i$$73$$ = 0;$i$$73$$ < $i$$inline_119_type$$77$$.length;$i$$73$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$, $i$$inline_119_type$$77$$[$i$$73$$], $listener$$inline_114_opt_fn$$6$$, $capture$$inline_117_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_116$$)
    }
  }else {
    a: {
      $listener$$inline_114_opt_fn$$6$$ = $listener$$inline_114_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_116$$ = $opt_handler$$12_opt_handler$$inline_116$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_117_opt_capture$$3$$ = !!$capture$$inline_117_opt_capture$$3$$;
      if($key$$54_listener$$51_listenerArray$$inline_118_src$$20$$ = $goog$events$getListeners_$$($key$$54_listener$$51_listenerArray$$inline_118_src$$20$$, $i$$inline_119_type$$77$$, $capture$$inline_117_opt_capture$$3$$)) {
        for($i$$inline_119_type$$77$$ = 0;$i$$inline_119_type$$77$$ < $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$.length;$i$$inline_119_type$$77$$++) {
          if(!$key$$54_listener$$51_listenerArray$$inline_118_src$$20$$[$i$$inline_119_type$$77$$].$removed$ && $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$[$i$$inline_119_type$$77$$].$listener$ == $listener$$inline_114_opt_fn$$6$$ && $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$[$i$$inline_119_type$$77$$].capture == $capture$$inline_117_opt_capture$$3$$ && $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$[$i$$inline_119_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_116$$) {
            $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$[$i$$inline_119_type$$77$$];
            break a
          }
        }
      }
      $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$ && ($key$$54_listener$$51_listenerArray$$inline_118_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$.key, $goog$events$unlistenByKey$$($key$$54_listener$$51_listenerArray$$inline_118_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$54_listener$$51_listenerArray$$inline_118_src$$20$$))
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
// Input 32
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
// Input 33
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
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$19_e$$24_e$$inline_122$$) {
  var $hasCapture$$inline_128_type$$inline_123$$ = $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.type || $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$, $map$$inline_124$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_128_type$$inline_123$$ in $map$$inline_124$$) {
    if($goog$isString$$($JSCompiler_inline_result$$19_e$$24_e$$inline_122$$)) {
      $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$ = new $goog$events$Event$$($JSCompiler_inline_result$$19_e$$24_e$$inline_122$$, this)
    }else {
      if($JSCompiler_inline_result$$19_e$$24_e$$inline_122$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.target = $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.target || this
      }else {
        var $oldEvent$$inline_125_rv$$inline_126$$ = $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$;
        $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$ = new $goog$events$Event$$($hasCapture$$inline_128_type$$inline_123$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$19_e$$24_e$$inline_122$$, $oldEvent$$inline_125_rv$$inline_126$$)
      }
    }
    var $oldEvent$$inline_125_rv$$inline_126$$ = 1, $ancestors$$inline_127_current$$inline_132$$, $map$$inline_124$$ = $map$$inline_124$$[$hasCapture$$inline_128_type$$inline_123$$], $hasCapture$$inline_128_type$$inline_123$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_124$$, $parent$$inline_130_targetsMap$$inline_129$$;
    if($hasCapture$$inline_128_type$$inline_123$$) {
      $ancestors$$inline_127_current$$inline_132$$ = [];
      for($parent$$inline_130_targetsMap$$inline_129$$ = this;$parent$$inline_130_targetsMap$$inline_129$$;$parent$$inline_130_targetsMap$$inline_129$$ = $parent$$inline_130_targetsMap$$inline_129$$.$parentEventTarget_$) {
        $ancestors$$inline_127_current$$inline_132$$.push($parent$$inline_130_targetsMap$$inline_129$$)
      }
      $parent$$inline_130_targetsMap$$inline_129$$ = $map$$inline_124$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_130_targetsMap$$inline_129$$.$remaining_$ = $parent$$inline_130_targetsMap$$inline_129$$.$count_$;
      for(var $i$$inline_131$$ = $ancestors$$inline_127_current$$inline_132$$.length - 1;!$JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$propagationStopped_$ && 0 <= $i$$inline_131$$ && $parent$$inline_130_targetsMap$$inline_129$$.$remaining_$;$i$$inline_131$$--) {
        $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.currentTarget = $ancestors$$inline_127_current$$inline_132$$[$i$$inline_131$$], $oldEvent$$inline_125_rv$$inline_126$$ &= $goog$events$fireListeners_$$($parent$$inline_130_targetsMap$$inline_129$$, $ancestors$$inline_127_current$$inline_132$$[$i$$inline_131$$], $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$) && $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_124$$) {
      if($parent$$inline_130_targetsMap$$inline_129$$ = $map$$inline_124$$[$JSCompiler_alias_FALSE$$], $parent$$inline_130_targetsMap$$inline_129$$.$remaining_$ = $parent$$inline_130_targetsMap$$inline_129$$.$count_$, $hasCapture$$inline_128_type$$inline_123$$) {
        for($i$$inline_131$$ = 0;!$JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$propagationStopped_$ && $i$$inline_131$$ < $ancestors$$inline_127_current$$inline_132$$.length && $parent$$inline_130_targetsMap$$inline_129$$.$remaining_$;$i$$inline_131$$++) {
          $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.currentTarget = $ancestors$$inline_127_current$$inline_132$$[$i$$inline_131$$], $oldEvent$$inline_125_rv$$inline_126$$ &= $goog$events$fireListeners_$$($parent$$inline_130_targetsMap$$inline_129$$, $ancestors$$inline_127_current$$inline_132$$[$i$$inline_131$$], $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$) && $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_127_current$$inline_132$$ = this;!$JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$propagationStopped_$ && $ancestors$$inline_127_current$$inline_132$$ && $parent$$inline_130_targetsMap$$inline_129$$.$remaining_$;$ancestors$$inline_127_current$$inline_132$$ = $ancestors$$inline_127_current$$inline_132$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.currentTarget = $ancestors$$inline_127_current$$inline_132$$, $oldEvent$$inline_125_rv$$inline_126$$ &= $goog$events$fireListeners_$$($parent$$inline_130_targetsMap$$inline_129$$, $ancestors$$inline_127_current$$inline_132$$, $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$) && $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$ = Boolean($oldEvent$$inline_125_rv$$inline_126$$)
  }else {
    $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$19_e$$24_e$$inline_122$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
// Input 34
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
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$3$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_135_obj$$inline_354$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_355$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_355$$ in $obj$$inline_135_obj$$inline_354$$ && delete $obj$$inline_135_obj$$inline_354$$[$key$$inline_355$$];
    $obj$$inline_135_obj$$inline_354$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$;
    $id$$3$$ in $obj$$inline_135_obj$$inline_354$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $id$$3$$ + '"'));
    $obj$$inline_135_obj$$inline_354$$[$id$$3$$] = $JSCompiler_StaticMethods_setId$self$$
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$3$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getElementByClass$ = function $$JSCompiler_prototypeAlias$$$$getElementByClass$$($className$$16$$) {
  return this.$element_$ ? this.$dom_$.$getElementByClass$($className$$16$$, this.$element_$) : $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_getHandler$$($JSCompiler_StaticMethods_getHandler$self$$) {
  return $JSCompiler_StaticMethods_getHandler$self$$.$googUiComponentHandler_$ || ($JSCompiler_StaticMethods_getHandler$self$$.$googUiComponentHandler_$ = new $goog$events$EventHandler$$($JSCompiler_StaticMethods_getHandler$self$$))
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
$JSCompiler_prototypeAlias$$.$render_$ = function $$JSCompiler_prototypeAlias$$$$render_$$($opt_parentElement$$1$$, $opt_beforeNode$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$element_$ || this.$createDom$();
  $opt_parentElement$$1$$ ? $opt_parentElement$$1$$.insertBefore(this.$element_$, $opt_beforeNode$$ || $JSCompiler_alias_NULL$$) : this.$dom_$.$document_$.body.appendChild(this.$element_$);
  (!this.$parent_$ || this.$parent_$.$inDocument_$) && this.$enterDocument$()
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$72$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$72$$ && this.$canDecorate$($element$$72$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$72$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$72$$)
    }
    this.$decorateInternal$($element$$72$$);
    this.$enterDocument$()
  }else {
    $JSCompiler_alias_THROW$$(Error("Invalid element to decorate"))
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$74$$) {
  this.$element_$ = $element$$74$$
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
    var $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $child$$15$$.$id_$ || ($child$$15$$.$id_$ = ":" + ($child$$15$$.$idGenerator_$.$nextId_$++).toString(36)), $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$;
    this.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ ? ($JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ = this.$childIndex_$, $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ = ($JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ in $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ ? $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$[$JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$] : $JSCompiler_alias_VOID$$) || 
    $JSCompiler_alias_NULL$$) : $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ = $JSCompiler_alias_NULL$$;
    $child$$15$$ = $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$;
    $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ && $child$$15$$ && ($JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ = this.$childIndex_$, $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ in $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$ && delete $JSCompiler_temp$$inline_363_obj$$inline_364_obj$$inline_367$$[$JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$], $goog$array$remove$$(this.$children_$, $child$$15$$), $opt_unrender$$ && 
    ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$)), $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ = $child$$15$$, $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$ == $JSCompiler_alias_NULL$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component")), $JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$.$parent_$ = $JSCompiler_alias_NULL$$, $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$inline_143_id$$6$$, 
    $JSCompiler_alias_NULL$$))
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
// Input 35
function $bitex$ui$BalanceInfo$$($opt_blinkDelay$$, $opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$);
  this.$blink_delay_$ = $opt_blinkDelay$$ || 700
}
$goog$inherits$$($bitex$ui$BalanceInfo$$, $goog$ui$Component$$);
$bitex$ui$BalanceInfo$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("balance-info");
$bitex$ui$BalanceInfo$$.prototype.$decorateInternal$ = function $$bitex$ui$BalanceInfo$$$$$decorateInternal$$($element$$75$$) {
  this.$element_$ = $element$$75$$
};
function $JSCompiler_StaticMethods_updateBalanceBRL$$($JSCompiler_StaticMethods_updateBalanceBRL$self$$, $value$$76$$) {
  var $el$$30$$ = $goog$dom$getElementByClass$$($JSCompiler_StaticMethods_updateBalanceBRL$self$$.$getBaseCssClass$() + "-brl"), $formatted_value$$ = ($value$$76$$ / 1E5).toFixed(2), $blink_class$$ = $JSCompiler_StaticMethods_updateBalanceBRL$self$$.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($el$$30$$, $blink_class$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($el$$30$$, $blink_class$$)
  }, $JSCompiler_StaticMethods_updateBalanceBRL$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateBalanceBRL$self$$);
  $goog$dom$setTextContent$$($el$$30$$, $formatted_value$$)
}
function $JSCompiler_StaticMethods_updateBalanceBTC$$($JSCompiler_StaticMethods_updateBalanceBTC$self$$, $value$$77$$) {
  var $el$$31$$ = $goog$dom$getElementByClass$$($JSCompiler_StaticMethods_updateBalanceBTC$self$$.$getBaseCssClass$() + "-btc"), $formatted_value$$1$$ = ($value$$77$$ / 1E8).toFixed(8), $blink_class$$1$$ = $JSCompiler_StaticMethods_updateBalanceBTC$self$$.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($el$$31$$, $blink_class$$1$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($el$$31$$, $blink_class$$1$$)
  }, $JSCompiler_StaticMethods_updateBalanceBTC$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateBalanceBTC$self$$);
  $goog$dom$setTextContent$$($el$$31$$, $formatted_value$$1$$)
}
;
// Input 36
// Input 37
// Input 38
// Input 39
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$84$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$84$$);
  return $element$$84$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$85$$) {
  return $element$$85$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$86$$, $className$$17$$, $enable$$1$$) {
  if($control$$1_element$$86$$ = $control$$1_element$$86$$.$getElement$ ? $control$$1_element$$86$$.$getElement$() : $control$$1_element$$86$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$86$$), $className$$17$$);
      $combinedClasses$$.push($className$$17$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$86$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$1_element$$86$$, $className$$17$$) : $goog$dom$classes$remove$$($control$$1_element$$86$$, $className$$17$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$88$$) {
  $element$$88$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$88$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$88$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$1$$ = $goog$dom$classes$get$$($element$$88$$);
  $goog$array$forEach$$($classNames$$1$$, function($className$$19_state$$inline_158$$) {
    if(!$hasRendererClassName$$ && $className$$19_state$$inline_158$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$19_state$$inline_158$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$22$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_412$$ = this.$classByState_$, $transposed$$inline_413$$ = {}, $key$$inline_414$$;
          for($key$$inline_414$$ in $obj$$inline_412$$) {
            $transposed$$inline_413$$[$obj$$inline_412$$[$key$$inline_414$$]] = $key$$inline_414$$
          }
          this.$stateByClass_$ = $transposed$$inline_413$$
        }
        $className$$19_state$$inline_158$$ = parseInt(this.$stateByClass_$[$className$$19_state$$inline_158$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$22$$ | (isNaN($className$$19_state$$inline_158$$) ? 0 : $className$$19_state$$inline_158$$)
      }
    }
  }, this);
  $control$$3$$.$state_$ = $state$$2$$;
  $hasRendererClassName$$ || ($classNames$$1$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$1$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$3$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$1$$.push.apply($classNames$$1$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$1$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$1$$.push.apply($classNames$$1$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$88$$.className = $classNames$$1$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$88$$);
  return $element$$88$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = "rtl" == ($goog$style$getComputedStyle$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body, "direction") || (($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body).currentStyle ? ($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body).currentStyle.direction : $JSCompiler_alias_NULL$$) || 
  ($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body).style && ($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body).style.direction));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$90$$) {
  $control$$5$$.$visible_$ || $element$$90$$.setAttribute("aria-hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$90$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$90$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$90$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$90$$, 64, !!($control$$5$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$91$$, $allow$$) {
  var $unselectable$$inline_173_value$$inline_176$$ = !$allow$$, $descendants$$inline_175$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$91$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_173_value$$inline_176$$ = $unselectable$$inline_173_value$$inline_176$$ ? "none" : "", $element$$91$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_173_value$$inline_176$$, $descendants$$inline_175$$) {
      for(var $i$$inline_177$$ = 0, $descendant$$inline_178$$;$descendant$$inline_178$$ = $descendants$$inline_175$$[$i$$inline_177$$];$i$$inline_177$$++) {
        $descendant$$inline_178$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_173_value$$inline_176$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_173_value$$inline_176$$ = $unselectable$$inline_173_value$$inline_176$$ ? "on" : "", $element$$91$$.setAttribute("unselectable", $unselectable$$inline_173_value$$inline_176$$), $descendants$$inline_175$$) {
        for($i$$inline_177$$ = 0;$descendant$$inline_178$$ = $descendants$$inline_175$$[$i$$inline_177$$];$i$$inline_177$$++) {
          $descendant$$inline_178$$.setAttribute("unselectable", $unselectable$$inline_173_value$$inline_176$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$92$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$92$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
};
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($control$$6$$) {
  var $keyTarget$$;
  return $control$$6$$.$supportedStates_$ & 32 && ($keyTarget$$ = $control$$6$$.$getKeyEventTarget$()) ? $goog$dom$isFocusableTabIndex$$($keyTarget$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = function $$JSCompiler_prototypeAlias$$$$setFocusable$$($control$$7$$, $focusable$$) {
  var $element$$inline_180_keyTarget$$1$$;
  if($control$$7$$.$supportedStates_$ & 32 && ($element$$inline_180_keyTarget$$1$$ = $control$$7$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$7$$.$state_$ & 32) {
      try {
        $element$$inline_180_keyTarget$$1$$.blur()
      }catch($e$$26$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($element$$inline_180_keyTarget$$1$$) != $focusable$$ && ($focusable$$ ? $element$$inline_180_keyTarget$$1$$.tabIndex = 0 : ($element$$inline_180_keyTarget$$1$$.tabIndex = -1, $element$$inline_180_keyTarget$$1$$.removeAttribute("tabIndex")))
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$93$$, $visible$$) {
  $element$$93$$.style.display = $visible$$ ? "" : "none";
  $element$$93$$ && $element$$93$$.setAttribute("aria-hidden", !$visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$3$$) {
  var $element$$94$$ = $control$$8$$.$getElement$();
  if($element$$94$$) {
    var $className$$20$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$20$$ && this.$enableClassName$($control$$8$$, $className$$20$$, $enable$$3$$);
    this.$updateAriaState$($element$$94$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$95$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $element$$95$$.setAttribute("aria-" + $ariaState_state$$4$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_195$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$2$$ = [$cssClass_extraClassNames$$1_state$$inline_195$$], $classNames$$inline_196_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_196_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_195$$ && $classNames$$2$$.push($classNames$$inline_196_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_195$$ = $control$$10$$.$state_$;
  for($classNames$$inline_196_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_195$$;) {
    var $mask$$inline_197$$ = $cssClass_extraClassNames$$1_state$$inline_195$$ & -$cssClass_extraClassNames$$1_state$$inline_195$$;
    $classNames$$inline_196_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_197$$));
    $cssClass_extraClassNames$$1_state$$inline_195$$ &= ~$mask$$inline_197$$
  }
  $classNames$$2$$.push.apply($classNames$$2$$, $classNames$$inline_196_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_195$$ = $control$$10$$.$extraClassNames_$) && $classNames$$2$$.push.apply($classNames$$2$$, $cssClass_extraClassNames$$1_state$$inline_195$$);
  $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7") && $classNames$$2$$.push.apply($classNames$$2$$, $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$));
  return $classNames$$2$$
}
function $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classes$$5$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$5$$ = $classes$$5$$.concat([$opt_includedClass$$]));
  $goog$array$forEach$$([], function($combo$$) {
    $goog$array$every$$($combo$$, $goog$partial$$($goog$array$contains$$, $classes$$5$$)) && (!$opt_includedClass$$ || $goog$array$contains$$($combo$$, $opt_includedClass$$)) && $toAdd$$.push($combo$$.join("_"))
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
// Input 40
function $goog$ui$registry$setDecoratorByClassName$$($className$$23$$, $decoratorFn$$) {
  $className$$23$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$23$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
// Input 41
// Input 42
// Input 43
function $goog$events$KeyCodes$firesKeyPressEvent$$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!$goog$userAgent$IE$$ && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$isVersion$$("525"))) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$userAgent$MAC$$ && $opt_altKey$$) {
    return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && (17 == $opt_heldKeyCode$$ || 18 == $opt_heldKeyCode$$ || $goog$userAgent$MAC$$ && 91 == $opt_heldKeyCode$$)) {
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
// Input 44
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
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$MAC$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$28$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$28$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$28$$.altKey || $goog$userAgent$MAC$$ && 91 == this.$lastKey_$ && !$e$$28$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$28$$.ctrlKey && 17 != $e$$28$$.keyCode ? this.$lastKey_$ = 17 : $e$$28$$.altKey && 18 != $e$$28$$.keyCode ? this.$lastKey_$ = 18 : $e$$28$$.metaKey && 91 != $e$$28$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$28$$.keyCode, this.$lastKey_$, $e$$28$$.shiftKey, $e$$28$$.ctrlKey, $e$$28$$.altKey) ? this.handleEvent($e$$28$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$28$$.keyCode) : $e$$28$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$28$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$29$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$29$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$30_repeat$$) {
  var $be$$2_event$$3$$ = $e$$30_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$2_event$$3$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$30_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$2_event$$3$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$30_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$2_event$$3$$.charCode && 63232 > $be$$2_event$$3$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$3$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$3$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$MAC$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$59$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$3$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$59$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$30_repeat$$.shiftKey && ($key$$59$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$59$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$30_repeat$$ = $key$$59$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$59$$;
  $be$$2_event$$3$$ = new $goog$events$KeyEvent$$($key$$59$$, $charCode$$, $e$$30_repeat$$, $be$$2_event$$3$$);
  $be$$2_event$$3$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$2_event$$3$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$99$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$99$$;
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
// Input 45
function $goog$ui$Control$$($content$$7$$, $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$, $opt_domHelper$$2$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$2$$);
  if(!$JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$) {
    $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$ = this.constructor;
    for(var $key$$inline_206_rendererCtor$$inline_207$$;$JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$;) {
      $key$$inline_206_rendererCtor$$inline_207$$ = $goog$getUid$$($JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$);
      if($key$$inline_206_rendererCtor$$inline_207$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_206_rendererCtor$$inline_207$$]) {
        break
      }
      $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$ = $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$ = $key$$inline_206_rendererCtor$$inline_207$$ ? $goog$isFunction$$($key$$inline_206_rendererCtor$$inline_207$$.$getInstance$) ? $key$$inline_206_rendererCtor$$inline_207$$.$getInstance$() : new $key$$inline_206_rendererCtor$$inline_207$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$17_componentCtor$$inline_205_opt_renderer$$;
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
  var $element$$100$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$100$$;
  var $ariaRole$$inline_234$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_234$$ && $element$$100$$.setAttribute("role", $ariaRole$$inline_234$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$100$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$100$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$101$$) {
  return this.$renderer_$.$canDecorate$($element$$101$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$102$$) {
  this.$element_$ = $element$$102$$ = this.$renderer_$.$decorate$(this, $element$$102$$);
  var $ariaRole$$inline_242$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_242$$ && $element$$102$$.setAttribute("role", $ariaRole$$inline_242$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$102$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$102$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  this.$renderer_$.$initializeDom$(this);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32)) {
    var $keyTarget$$2$$ = this.$getKeyEventTarget$();
    if($keyTarget$$2$$) {
      var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
      $JSCompiler_StaticMethods_attach$$($keyHandler$$, $keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), $keyHandler$$, "key", this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$42$$ = $JSCompiler_StaticMethods_getHandler$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$), $element$$103$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$103$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$103$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$103$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$103$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$103$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$103$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$103$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$103$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$103$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$103$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$103$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$103$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
  var $element$$104$$ = this.$getElement$();
  $element$$104$$ && this.$renderer_$.$setRightToLeft$($element$$104$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$105$$ = this.$getElement$();
  $element$$105$$ && this.$renderer_$.$setAllowTextSelection$($element$$105$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$106$$ = this.$getElement$();
    $element$$106$$ && this.$renderer_$.$setVisible$($element$$106$$, $visible$$1$$);
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
  var $parent$$inline_245$$ = this.getParent();
  if((!$parent$$inline_245$$ || "function" != typeof $parent$$inline_245$$.isEnabled || $parent$$inline_245$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$8$$)) {
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
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$31$$) {
  (!$e$$31$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$31$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$32$$) {
  if((!$e$$32$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$32$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$34$$) {
  if(this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isButton$$($e$$34$$) && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$MAC$$ || !$e$$34$$.ctrlKey))) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()
  }
  !this.$allowTextSelection_$ && ($JSCompiler_StaticMethods_isButton$$($e$$34$$) && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$MAC$$ || !$e$$34$$.ctrlKey)) && $e$$34$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$35$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$35$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$36$$) {
  this.isEnabled() && this.$performActionInternal$($e$$36$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$37$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_248_open$$inline_254$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_248_open$$inline_254$$) && this.$setState$(16, $actionEvent_check$$inline_248_open$$inline_254$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_248_open$$inline_254$$ = !(this.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_248_open$$inline_254$$) && this.$setState$(64, $actionEvent_check$$inline_248_open$$inline_254$$));
  $actionEvent_check$$inline_248_open$$inline_254$$ = new $goog$events$Event$$("action", this);
  $e$$37$$ && ($actionEvent_check$$inline_248_open$$inline_254$$.altKey = $e$$37$$.altKey, $actionEvent_check$$inline_248_open$$inline_254$$.ctrlKey = $e$$37$$.ctrlKey, $actionEvent_check$$inline_248_open$$inline_254$$.metaKey = $e$$37$$.metaKey, $actionEvent_check$$inline_248_open$$inline_254$$.shiftKey = $e$$37$$.shiftKey, $actionEvent_check$$inline_248_open$$inline_254$$.$platformModifierKey$ = $e$$37$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_248_open$$inline_254$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$40$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$40$$) ? ($e$$40$$.preventDefault(), $e$$40$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$41$$) {
  return 13 == $e$$41$$.keyCode && this.$performActionInternal$($e$$41$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_264$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_264$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 46
// Input 47
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$107$$, $state$$16$$, $enable$$13$$) {
  16 == $state$$16$$ ? $element$$107$$.setAttribute("aria-pressed", $enable$$13$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$107$$, $state$$16$$, $enable$$13$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$108$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$79$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$79$$ && this.$setTooltip$($element$$108$$, $tooltip_value$$79$$);
  ($tooltip_value$$79$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$108$$, $tooltip_value$$79$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$108$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$108$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$109$$) {
  $element$$109$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$109$$);
  var $value$$inline_271$$ = this.$getValue$($element$$109$$);
  $button$$2$$.$value_$ = $value$$inline_271$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$109$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$109$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$109$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$110$$) {
  return $element$$110$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$111$$, $tooltip$$1$$) {
  $element$$111$$ && ($element$$111$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 48
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$112$$) {
  return"BUTTON" == $element$$112$$.tagName || "INPUT" == $element$$112$$.tagName && ("button" == $element$$112$$.type || "submit" == $element$$112$$.type || "reset" == $element$$112$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$113$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$5$$);
  $button$$5$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$5$$);
  $element$$113$$.disabled && $goog$dom$classes$add$$($element$$113$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$113$$)
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($button$$6$$) {
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$($button$$6$$), $button$$6$$.$getElement$(), "click", $button$$6$$.$performActionInternal$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($button$$7$$) {
  return $button$$7$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$114$$, $state$$17$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$114$$, $state$$17$$, $enable$$14$$);
  if(($button$$8_element$$114$$ = $button$$8_element$$114$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$8_element$$114$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$115$$) {
  return $element$$115$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$116$$, $value$$80$$) {
  $element$$116$$ && ($element$$116$$.value = $value$$80$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 49
function $goog$ui$Button$$($content$$11$$, $opt_renderer$$1$$, $opt_domHelper$$3$$) {
  $goog$ui$Control$$.call(this, $content$$11$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$3$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$81$$) {
  this.$value_$ = $value$$81$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$81$$)
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
    $keyTarget$$3$$ && $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), $keyTarget$$3$$, "keyup", this.$handleKeyEventInternal$)
  }
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$42$$) {
  return 13 == $e$$42$$.keyCode && "key" == $e$$42$$.type || 32 == $e$$42$$.keyCode && "keyup" == $e$$42$$.type ? this.$performActionInternal$($e$$42$$) : 32 == $e$$42$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 50
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  2147483647 < $opt_delay$$ || $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 51
function $bitex$ui$OrderBook$$($username$$, $side$$, $opt_blinkDelay$$1$$, $opt_domHelper$$4$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$4$$);
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700;
  this.$username_$ = $username$$;
  this.$side_$ = $side$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$117$$) {
  this.$element_$ = $element$$117$$;
  var $JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_283$$ = this.$getDomHelper$();
  this.$bodyEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$inline_283$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $element$$117$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($buttonEl_e$$43_orderId$$) {
  $buttonEl_e$$43_orderId$$ = $buttonEl_e$$43_orderId$$.target;
  "BUTTON" == $buttonEl_e$$43_orderId$$.tagName && ($buttonEl_e$$43_orderId$$ = $buttonEl_e$$43_orderId$$.getAttribute("data-order-id"), $buttonEl_e$$43_orderId$$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$ui$OrderBookEvent$$("cancel", $buttonEl_e$$43_orderId$$)))
};
function $bitex$ui$OrderBookEvent$$($type$$91$$, $orderId$$1$$) {
  $goog$events$Event$$.call(this, $type$$91$$);
  this.$order_id$ = $orderId$$1$$
}
$goog$inherits$$($bitex$ui$OrderBookEvent$$, $goog$events$Event$$);
$bitex$ui$OrderBook$$.prototype.clear = function $$bitex$ui$OrderBook$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_deleteOrderThru$$($JSCompiler_StaticMethods_deleteOrderThru$self$$, $index$$61$$) {
  $JSCompiler_StaticMethods_deleteOrderThru$self$$.$getDomHelper$();
  for(var $child$$17$$;($child$$17$$ = $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.firstChild) && 0 < $index$$61$$;) {
    $JSCompiler_StaticMethods_deleteOrderThru$self$$.$bodyEl_$.removeChild($child$$17$$), $index$$61$$--
  }
}
function $JSCompiler_StaticMethods_deleteOrder$$($JSCompiler_StaticMethods_deleteOrder$self$$, $index$$62$$) {
  var $dom$$4$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $dom$$4$$.$getChildren$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$62$$];
  $dom$$4$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$63_trEl$$1$$, $qty$$) {
  var $dom$$5$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $index$$63_trEl$$1$$ = $dom$$5$$.$getChildren$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$63_trEl$$1$$];
  var $tdQtyEl$$ = $dom$$5$$.$getChildren$($index$$63_trEl$$1$$)[1];
  $dom$$5$$.$setTextContent$($tdQtyEl$$, $qty$$);
  var $blink_class$$2$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($tdQtyEl$$, $blink_class$$2$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, $blink_class$$2$$)
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
$bitex$ui$OrderBook$$.prototype.$insertOrder$ = function $$bitex$ui$OrderBook$$$$$insertOrder$$($index$$64$$, $id$$8$$, $price_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$) {
  var $dom$$6$$ = this.$getDomHelper$();
  $price_priceEl$$ = $dom$$6$$.$createDom$("td", this.$getBaseCssClass$() + "-price", $price_priceEl$$);
  $qty$$1_qtyEl$$ = $dom$$6$$.$createDom$("td", this.$getBaseCssClass$() + "-qty", $qty$$1_qtyEl$$);
  $td_list_userNameEl_username$$1$$ = $td_list_userNameEl_username$$1$$ === this.$username_$ ? $dom$$6$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$6$$.$createDom$("button", {"data-order-id":$id$$8$$, "class":"btn btn-mini btn-danger btn-cancel-order"}, "Cancelar")) : $dom$$6$$.$createDom$("td", this.$getBaseCssClass$() + "-username", $td_list_userNameEl_username$$1$$);
  "0" == this.$side_$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price_priceEl$$, this.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$1$$ = [$td_list_userNameEl_username$$1$$, $qty$$1_qtyEl$$, $price_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, this.$getBaseCssClass$() + "-right"), $goog$dom$classes$add$$($price_priceEl$$, this.$getBaseCssClass$() + "-left"), $td_list_userNameEl_username$$1$$ = 
  [$price_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$]);
  var $rowEl$$ = $dom$$6$$.$createDom$("tr", {"data-order-id":$id$$8$$, "class":this.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$1$$);
  $dom$$6$$.$insertChildAt$(this.$bodyEl_$, $rowEl$$, $index$$64$$);
  var $blink_class$$3$$ = this.$getBaseCssClass$() + "-blink";
  $goog$dom$classes$add$$($rowEl$$, $blink_class$$3$$);
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, $blink_class$$3$$)
  }, this.$blink_delay_$, this)
};
// Input 52
function $bitex$ui$OrderEntry$$($opt_blinkDelay$$2$$, $opt_domHelper$$5$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$5$$);
  this.$blink_delay_$ = $opt_blinkDelay$$2$$ || 700
}
$goog$inherits$$($bitex$ui$OrderEntry$$, $goog$ui$Component$$);
$bitex$ui$OrderEntry$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-entry");
$bitex$ui$OrderEntry$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderEntry$$$$$decorateInternal$$($element$$118$$) {
  this.$element_$ = $element$$118$$
};
$bitex$ui$OrderEntry$$.prototype.$enterDocument$ = function $$bitex$ui$OrderEntry$$$$$enterDocument$$() {
  var $handler$$43$$ = $JSCompiler_StaticMethods_getHandler$$(this), $dom$$7_sellBtn$$ = this.$getDomHelper$(), $buyBtn$$ = $dom$$7_sellBtn$$.$getElementByClass$(this.$getBaseCssClass$() + "-buy", this.$getElement$()), $dom$$7_sellBtn$$ = $dom$$7_sellBtn$$.$getElementByClass$(this.$getBaseCssClass$() + "-sell", this.$getElement$());
  $JSCompiler_StaticMethods_listen$$($handler$$43$$, $buyBtn$$, "click", $goog$partial$$(this.$onAction_$, "buy_limited"));
  $JSCompiler_StaticMethods_listen$$($handler$$43$$, $dom$$7_sellBtn$$, "click", $goog$partial$$(this.$onAction_$, "sell_limited"))
};
$bitex$ui$OrderEntry$$.prototype.$onAction_$ = function $$bitex$ui$OrderEntry$$$$$onAction_$$($eventType$$7$$) {
  var $symbol$$1_symbol_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-symbol"), $qty$$2_qty_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-qty"), $price$$1_price_el$$ = $goog$dom$getElementByClass$$(this.$getBaseCssClass$() + "-price"), $symbol$$1_symbol_el$$ = $goog$dom$forms$getValue$$($symbol$$1_symbol_el$$), $qty$$2_qty_el$$ = $goog$dom$forms$getValue$$($qty$$2_qty_el$$), $price$$1_price_el$$ = $goog$dom$forms$getValue$$($price$$1_price_el$$);
  $goog$string$isEmpty$$($symbol$$1_symbol_el$$) ? alert("Instrumento n\u00e3o selecionado") : $goog$string$isEmpty$$($qty$$2_qty_el$$) || 0 >= parseFloat($qty$$2_qty_el$$) ? alert("Quantidade inv\u00e1lida") : $goog$string$isEmpty$$($price$$1_price_el$$) || 0 >= parseFloat($price$$1_price_el$$) ? alert("Pre\u00e7o inv\u00e1lido") : this.dispatchEvent(new $bitex$ui$OrderEntryEvent$$($eventType$$7$$, $symbol$$1_symbol_el$$, parseFloat($qty$$2_qty_el$$), parseFloat($price$$1_price_el$$)))
};
function $bitex$ui$OrderEntryEvent$$($type$$92$$, $symbol$$2$$, $qty$$3$$, $price$$2$$) {
  $goog$events$Event$$.call(this, $type$$92$$);
  this.$symbol$ = $symbol$$2$$;
  this.$qty$ = $qty$$3$$;
  this.$price$ = $price$$2$$
}
$goog$inherits$$($bitex$ui$OrderEntryEvent$$, $goog$events$Event$$);
// Input 53
// Input 54
function $goog$history$Event$$($token$$4$$, $isNavigation$$) {
  $goog$events$Event$$.call(this, "navigate");
  this.$token$ = $token$$4$$;
  this.$isNavigation$ = $isNavigation$$
}
$goog$inherits$$($goog$history$Event$$, $goog$events$Event$$);
// Input 55
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
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$15$$) {
  $enable$$15$$ != this.$enabled_$ && (this.$enabled_$ = $enable$$15$$) && this.dispatchEvent(new $goog$history$Event$$($JSCompiler_StaticMethods_getToken$$(this), $JSCompiler_alias_FALSE$$))
};
function $JSCompiler_StaticMethods_getToken$$($JSCompiler_StaticMethods_getToken$self_loc$$) {
  if($JSCompiler_StaticMethods_getToken$self_loc$$.$useFragment_$) {
    $JSCompiler_StaticMethods_getToken$self_loc$$ = $JSCompiler_StaticMethods_getToken$self_loc$$.$window_$.location.href;
    var $index$$65$$ = $JSCompiler_StaticMethods_getToken$self_loc$$.indexOf("#");
    return 0 > $index$$65$$ ? "" : $JSCompiler_StaticMethods_getToken$self_loc$$.substring($index$$65$$ + 1)
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
// Input 56
function $bitex$app$UrlRouter$$($baseUrl$$, $defaultView$$) {
  var $JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$ = this.$history_$ = new $goog$history$Html5History$$;
  $JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$.$useFragment_$ != $JSCompiler_alias_FALSE$$ && ($goog$events$unlisten$$($JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$.$window_$, "hashchange", $JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$.$onHistoryEvent_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$), $JSCompiler_StaticMethods_setUseFragment$self$$inline_292$$.$useFragment_$ = $JSCompiler_alias_FALSE$$);
  this.$base_url_$ = $baseUrl$$;
  this.$default_view_$ = $defaultView$$;
  $JSCompiler_StaticMethods_setViewInternal$$(this, $defaultView$$);
  this.$history_$.addEventListener("navigate", this.$onNavigate_$, $JSCompiler_alias_VOID$$, this);
  this.$history_$.$setEnabled$($JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($bitex$app$UrlRouter$$, $goog$events$EventTarget$$);
function $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setViewInternal$self$$, $view_name$$) {
  var $JSCompiler_inline_result$$16_re$$inline_297$$;
  $JSCompiler_inline_result$$16_re$$inline_297$$ = RegExp($goog$string$regExpEscape$$($JSCompiler_StaticMethods_setViewInternal$self$$.$base_url_$), "");
  $JSCompiler_inline_result$$16_re$$inline_297$$ = $view_name$$.replace($JSCompiler_inline_result$$16_re$$inline_297$$, "");
  $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_inline_result$$16_re$$inline_297$$;
  "" === $JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ && ($JSCompiler_StaticMethods_setViewInternal$self$$.$current_view_$ = $JSCompiler_StaticMethods_setViewInternal$self$$.$default_view_$)
}
function $JSCompiler_StaticMethods_setView$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$) {
  $JSCompiler_StaticMethods_setViewInternal$$($JSCompiler_StaticMethods_setView$self$$, $view_name$$1$$);
  var $JSCompiler_StaticMethods_setToken$self$$inline_299$$ = $JSCompiler_StaticMethods_setView$self$$.$history_$, $token$$inline_300$$ = $JSCompiler_StaticMethods_setView$self$$.$base_url_$ + $view_name$$1$$;
  $token$$inline_300$$ != $JSCompiler_StaticMethods_getToken$$($JSCompiler_StaticMethods_setToken$self$$inline_299$$) && ($JSCompiler_StaticMethods_setToken$self$$inline_299$$.$window_$.history.pushState($JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$window_$.document.title || "", $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$useFragment_$ ? "#" + $token$$inline_300$$ : $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$transformer_$ ? $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$transformer_$.$createUrl$($token$$inline_300$$, 
  $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$pathPrefix_$, $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$window_$.location) : $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$pathPrefix_$ + $token$$inline_300$$ + $JSCompiler_StaticMethods_setToken$self$$inline_299$$.$window_$.location.search), $JSCompiler_StaticMethods_setToken$self$$inline_299$$.dispatchEvent(new $goog$history$Event$$($token$$inline_300$$, $JSCompiler_alias_FALSE$$)));
  $JSCompiler_StaticMethods_setView$self$$.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", $JSCompiler_StaticMethods_setView$self$$.$current_view_$))
}
$bitex$app$UrlRouter$$.prototype.$onNavigate_$ = function $$bitex$app$UrlRouter$$$$$onNavigate_$$($e$$46$$) {
  $e$$46$$.$isNavigation$ && ($JSCompiler_StaticMethods_setViewInternal$$(this, $e$$46$$.$token$), this.dispatchEvent(new $bitex$app$UrlRouterEvent$$("set_view", this.$current_view_$)))
};
function $bitex$app$UrlRouterEvent$$($type$$93$$, $view$$3$$) {
  $goog$events$Event$$.call(this, $type$$93$$);
  this.view = $view$$3$$
}
$goog$inherits$$($bitex$app$UrlRouterEvent$$, $goog$events$Event$$);
// Input 57
function $bitex$api$BitEx$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($bitex$api$BitEx$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $bitex$api$BitEx$$.prototype;
$JSCompiler_prototypeAlias$$.$ws_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($url$$29$$) {
  "WebSocket" in window ? this.$ws_$ = new WebSocket($url$$29$$) : "MozWebSocket" in window ? this.$ws_$ = new MozWebSocket($url$$29$$) : $JSCompiler_alias_THROW$$("WebSockets are not available");
  this.$ws_$.onopen = $goog$bind$$(this.$onOpen_$, this);
  this.$ws_$.onclose = $goog$bind$$(this.$onClose_$, this);
  this.$ws_$.onmessage = $goog$bind$$(this.$onMessage_$, this);
  this.$ws_$.onerror = $goog$bind$$(this.$onError_$, this)
};
$JSCompiler_prototypeAlias$$.$onOpen_$ = function $$JSCompiler_prototypeAlias$$$$onOpen_$$() {
  this.dispatchEvent("opened")
};
$JSCompiler_prototypeAlias$$.$onClose_$ = function $$JSCompiler_prototypeAlias$$$$onClose_$$() {
  this.dispatchEvent("closed")
};
$JSCompiler_prototypeAlias$$.$onError_$ = function $$JSCompiler_prototypeAlias$$$$onError_$$() {
  this.dispatchEvent("error")
};
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$47_msg$$) {
  $e$$47_msg$$ = JSON.parse($e$$47_msg$$.data);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$47_msg$$));
  switch($e$$47_msg$$.MsgType) {
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $e$$47_msg$$));
      break;
    case "BF":
      1 == $e$$47_msg$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $e$$47_msg$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $e$$47_msg$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $e$$47_msg$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("order_list_response", $e$$47_msg$$));
      break;
    case "W":
      if(1 != $e$$47_msg$$.MarketDepth) {
        this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_clear"));
        this.dispatchEvent(new $bitex$api$BitExEvent$$("trade_clear"));
        for(var $x$$63$$ in $e$$47_msg$$.MDFullGrp) {
          var $entry$$ = $e$$47_msg$$.MDFullGrp[$x$$63$$];
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
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $e$$47_msg$$));
      break;
    case "X":
      if("3" == $e$$47_msg$$.MDBkTyp) {
        for($x$$63$$ in $e$$47_msg$$.MDIncGrp) {
          switch($entry$$ = $e$$47_msg$$.MDIncGrp[$x$$63$$], $entry$$.MDEntryType) {
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
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $e$$47_msg$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $e$$47_msg$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $e$$47_msg$$))
  }
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  this.$ws_$.close();
  this.$ws_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.login = function $$JSCompiler_prototypeAlias$$$login$($username$$2$$, $password$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"BE", UserReqID:"1", Username:$username$$2$$, Password:$password$$, UserReqTyp:"1"}))
};
$JSCompiler_prototypeAlias$$.$changePassword$ = function $$JSCompiler_prototypeAlias$$$$changePassword$$($password$$1$$, $new_password$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"BE", UserReqID:"3", Password:$password$$1$$, NewPassword:$new_password$$}))
};
$JSCompiler_prototypeAlias$$.$subscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$subscribeMarketData$$($market_depth$$, $symbols$$, $entries$$) {
  var $reqId$$ = parseInt(1E6 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$reqId$$, SubscriptionRequestType:"1", MarketDepth:$market_depth$$, MDUpdateType:"1", MDEntryTypes:$entries$$, Instruments:$symbols$$}));
  return $reqId$$
};
$JSCompiler_prototypeAlias$$.$unSubscribeMarketData$ = function $$JSCompiler_prototypeAlias$$$$unSubscribeMarketData$$($market_data_id$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"V", MDReqID:$market_data_id$$, SubscriptionRequestType:"2"}))
};
$JSCompiler_prototypeAlias$$.$signUp$ = function $$JSCompiler_prototypeAlias$$$$signUp$$($username$$3$$, $password$$2$$, $first_name$$, $last_name$$, $email$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U0", Username:$username$$3$$, Password:$password$$2$$, FirstName:$first_name$$, LastName:$last_name$$, Email:$email$$}))
};
$JSCompiler_prototypeAlias$$.$requestOpenOrders$ = function $$JSCompiler_prototypeAlias$$$$requestOpenOrders$$($opt_requestId_requestId$$, $opt_page$$, $opt_limit$$1$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  this.$ws_$.send(JSON.stringify({MsgType:"U4", OpenOrdersReqID:$opt_requestId_requestId$$, Page:$opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:["0", "1"]}));
  return $opt_requestId_requestId$$
};
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $symbol$$3$$, $qty$$4$$, $price$$3$$, $side$$1$$, $clientOrderId_opt_clientOrderId$$) {
  $clientOrderId_opt_clientOrderId$$ = $clientOrderId_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$3$$ = parseInt(1E5 * $price$$3$$, 10);
  $qty$$4$$ = parseInt(1E8 * $qty$$4$$, 10);
  $JSCompiler_StaticMethods_sendOrder_$self$$.$ws_$.send(JSON.stringify({MsgType:"D", ClOrdID:"" + $clientOrderId_opt_clientOrderId$$, Symbol:$symbol$$3$$, Side:$side$$1$$, OrdType:"2", Price:$price$$3$$, OrderQty:$qty$$4$$}));
  return $clientOrderId_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$8$$ = {MsgType:"F"};
  $opt_clientOrderId$$1$$ ? $msg$$8$$.OrigClOrdID = $opt_clientOrderId$$1$$ : $opt_OrderId$$ && ($msg$$8$$.OrderID = $opt_OrderId$$);
  this.$ws_$.send(JSON.stringify($msg$$8$$))
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$9$$) {
  this.$ws_$.send(JSON.stringify($msg$$9$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$4$$, $qty$$5$$, $price$$4$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$4$$, $qty$$5$$, $price$$4$$, "1", $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$5$$, $qty$$6$$, $price$$5$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$5$$, $qty$$6$$, $price$$5$$, "2", $opt_clientOrderId$$3$$)
};
$JSCompiler_prototypeAlias$$.$testRequest$ = function $$JSCompiler_prototypeAlias$$$$testRequest$$() {
  this.$ws_$.send(JSON.stringify({MsgType:"1", TestReqID:Math.random()}))
};
function $bitex$api$BitExEvent$$($type$$94$$, $opt_data$$2$$) {
  $goog$events$Event$$.call(this, $type$$94$$);
  this.data = $opt_data$$2$$
}
$goog$inherits$$($bitex$api$BitExEvent$$, $goog$events$Event$$);
$goog$exportPath_$$("BitEx", $bitex$api$BitEx$$);
$goog$exportProperty$$("open", $bitex$api$BitEx$$.prototype.open);
$goog$exportProperty$$("close", $bitex$api$BitEx$$.prototype.close);
$goog$exportProperty$$("login", $bitex$api$BitEx$$.prototype.login);
$goog$exportProperty$$("changePassword", $bitex$api$BitEx$$.prototype.$changePassword$);
$goog$exportProperty$$("subscribeMarketData", $bitex$api$BitEx$$.prototype.$subscribeMarketData$);
$goog$exportProperty$$("unSubscribeMarketData", $bitex$api$BitEx$$.prototype.$unSubscribeMarketData$);
$goog$exportProperty$$("signUp", $bitex$api$BitEx$$.prototype.$signUp$);
$goog$exportProperty$$("requestOpenOrders", $bitex$api$BitEx$$.prototype.$requestOpenOrders$);
$goog$exportProperty$$("cancelOrder", $bitex$api$BitEx$$.prototype.$cancelOrder$);
$goog$exportProperty$$("sendRawMessage", $bitex$api$BitEx$$.prototype.$sendRawMessage$);
$goog$exportProperty$$("sendBuyLimitedOrder", $bitex$api$BitEx$$.prototype.$sendBuyLimitedOrder$);
$goog$exportProperty$$("sendSellLimitedOrder", $bitex$api$BitEx$$.prototype.$sendSellLimitedOrder$);
$goog$exportProperty$$("testRequest", $bitex$api$BitEx$$.prototype.$testRequest$);
$goog$exportProperty$$("addEventListener", $bitex$api$BitEx$$.prototype.addEventListener);
$goog$exportProperty$$("removeEventListener", $bitex$api$BitEx$$.prototype.removeEventListener);
// Input 58
function $bitex$ui$DataGrid$$($options$$5$$, $opt_domHelper$$6$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$6$$);
  this.$columns_$ = $options$$5$$.columns;
  this.$row_class_fn_$ = $options$$5$$.rowClassFn || $goog$nullFunction$$;
  this.$current_page_$ = $options$$5$$.currentPage || 0;
  this.$limit_$ = $options$$5$$.limit || 100;
  this.$loading_data_$ = $goog$dom$createDom$$("div", ["progress", "progress-striped", "active"], $goog$dom$createDom$$("div", "bar"));
  this.$loading_data_$.style.width = $goog$style$getPixelStyleValue_$$("50%");
  var $element$$inline_308$$ = this.$loading_data_$;
  $goog$isString$$("margin") ? $goog$style$setStyle_$$($element$$inline_308$$, "auto", "margin") : $goog$object$forEach$$("margin", $goog$partial$$($goog$style$setStyle_$$, $element$$inline_308$$));
  $goog$dom$getFirstElementChild$$(this.$loading_data_$).style.width = $goog$style$getPixelStyleValue_$$("100%")
}
$goog$inherits$$($bitex$ui$DataGrid$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $bitex$ui$DataGrid$$.prototype;
$JSCompiler_prototypeAlias$$.$getBaseCssClass$ = $JSCompiler_returnArg$$("datagrid");
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$119$$) {
  this.$element_$ = $element$$119$$;
  var $table_header_element$$ = $goog$dom$getFirstElementChild$$($element$$119$$);
  $goog$dom$classes$add$$($table_header_element$$, this.$getBaseCssClass$());
  var $thead_element$$ = $goog$dom$getFirstElementChild$$($table_header_element$$);
  $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($thead_element$$)).setAttribute("colspan", this.$columns_$.length);
  this.$th_sizing_el_$ = $goog$dom$createDom$$("tr");
  this.$tr_columns_el_$ = $goog$dom$createDom$$("tr");
  $goog$array$forEach$$(this.$columns_$, function($child$$inline_316_column$$) {
    var $th_column_properties$$ = {"data-property":$child$$inline_316_column$$.property};
    $child$$inline_316_column$$.sortable && ($th_column_properties$$["class"] = "sortable");
    var $child$$inline_313$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_316_column$$.label);
    this.$tr_columns_el_$.appendChild($child$$inline_313$$);
    $child$$inline_316_column$$ = $goog$dom$createDom$$("th", $th_column_properties$$, $child$$inline_316_column$$.label);
    this.$th_sizing_el_$.appendChild($child$$inline_316_column$$)
  }, this);
  $thead_element$$.appendChild(this.$tr_columns_el_$);
  this.$table_data_body_el_$ = $goog$dom$getFirstElementChild$$($goog$dom$getFirstElementChild$$($goog$dom$getNextElementSibling$$($table_header_element$$)));
  this.$element_start_counter_$ = $goog$dom$getElementByClass$$("grid-start", $element$$119$$);
  this.$element_end_counter_$ = $goog$dom$getElementByClass$$("grid-end", $element$$119$$);
  this.$element_prev_button_$ = $goog$dom$getElementByClass$$("grid-prevpage", $element$$119$$);
  this.$element_next_button_$ = $goog$dom$getElementByClass$$("grid-nextpage", $element$$119$$)
};
$JSCompiler_prototypeAlias$$.$handlePreviousPage_$ = function $$JSCompiler_prototypeAlias$$$$handlePreviousPage_$$() {
  0 >= this.$current_page_$ || (this.$current_page_$ -= 1, this.$render_$())
};
$JSCompiler_prototypeAlias$$.$handleNextPage_$ = function $$JSCompiler_prototypeAlias$$$$handleNextPage_$$() {
  this.$current_page_$ += 1;
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.$render_$ = function $$JSCompiler_prototypeAlias$$$$render_$$() {
  $goog$dom$setTextContent$$(this.$element_start_counter_$, this.$current_page_$ * this.$limit_$ + 1);
  $goog$dom$setTextContent$$(this.$element_end_counter_$, this.$current_page_$ * this.$limit_$ + this.$limit_$);
  var $options$$6$$ = {Page:this.$current_page_$, Limit:this.$limit_$}, $cols$$ = [];
  $goog$array$forEach$$(this.$columns_$, function($column$$1_property$$6$$) {
    $column$$1_property$$6$$ = $column$$1_property$$6$$.property;
    $column$$1_property$$6$$ != $JSCompiler_alias_NULL$$ && $cols$$.push($column$$1_property$$6$$)
  }, this);
  $options$$6$$.Columns = $cols$$;
  this.dispatchEvent(new $bitex$ui$DataGridEvent$$("request_data", $options$$6$$));
  $goog$dom$removeChildren$$(this.$table_data_body_el_$);
  this.$table_data_body_el_$.appendChild(this.$loading_data_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $bitex$ui$DataGrid$$.$superClass_$.$enterDocument$.call(this);
  var $handler$$44$$ = $JSCompiler_StaticMethods_getHandler$$(this);
  $JSCompiler_StaticMethods_listen$$($handler$$44$$, this.$element_prev_button_$, "click", this.$handlePreviousPage_$);
  $JSCompiler_StaticMethods_listen$$($handler$$44$$, this.$element_next_button_$, "click", this.$handleNextPage_$);
  this.$render_$()
};
$JSCompiler_prototypeAlias$$.reload = function $$JSCompiler_prototypeAlias$$$reload$() {
  this.$render_$()
};
function $JSCompiler_StaticMethods_setColumnValue$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$, $row_element_td_element$$, $column$$2_index$$66$$, $value$$83$$) {
  var $result_set_col_index$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$.$columns_$, function($this_col$$, $index_row_set$$) {
    $result_set_col_index$$[$this_col$$.property] = $index_row_set$$
  });
  $column$$2_index$$66$$ = $result_set_col_index$$[$column$$2_index$$66$$];
  if($column$$2_index$$66$$ != $JSCompiler_alias_NULL$$) {
    $row_element_td_element$$ = $goog$dom$getChildren$$($row_element_td_element$$)[$column$$2_index$$66$$];
    var $currentValue$$ = $goog$dom$getTextContent$$($row_element_td_element$$);
    $JSCompiler_StaticMethods_setColumnValue$self_new_value$$ = ($JSCompiler_StaticMethods_setColumnValue$self_new_value$$.$columns_$[$column$$2_index$$66$$].formatter || function() {
      return"" + $value$$83$$
    })($value$$83$$);
    if($currentValue$$ !== $JSCompiler_StaticMethods_setColumnValue$self_new_value$$ && $goog$isString$$($JSCompiler_StaticMethods_setColumnValue$self_new_value$$)) {
      return $goog$dom$setTextContent$$($row_element_td_element$$, $JSCompiler_StaticMethods_setColumnValue$self_new_value$$), $row_element_td_element$$
    }
  }
}
function $JSCompiler_StaticMethods_resultSetToElements$$($JSCompiler_StaticMethods_resultSetToElements$self$$, $resultSet$$, $columns$$3$$) {
  var $elements$$1$$ = [], $result_set_col_index$$1$$ = {};
  $goog$array$forEach$$($JSCompiler_StaticMethods_resultSetToElements$self$$.$columns_$, function($this_col$$1$$, $index_row_set$$1$$) {
    var $index$$67$$ = $goog$array$findIndex$$($columns$$3$$, function($col$$) {
      return $col$$ == $this_col$$1$$.property
    });
    $result_set_col_index$$1$$[$index$$67$$] = $index_row_set$$1$$
  });
  $goog$array$forEach$$($resultSet$$, function($row_set$$) {
    var $row_set_obj$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$84$$, $result_set_index$$) {
      var $index$$68$$ = $result_set_col_index$$1$$[$result_set_index$$];
      $index$$68$$ != $JSCompiler_alias_NULL$$ && ($row_set_obj$$[this.$columns_$[$index$$68$$].property] = $value$$84$$)
    }, this);
    var $tr$$ = $goog$dom$createDom$$("tr", this.$row_class_fn_$($row_set_obj$$)), $td_elements$$ = {};
    $goog$array$forEach$$($row_set$$, function($value$$85$$, $result_set_index$$1$$) {
      var $index$$69$$ = $result_set_col_index$$1$$[$result_set_index$$1$$];
      if($index$$69$$ != $JSCompiler_alias_NULL$$) {
        var $formatter$$1_td$$ = this.$columns_$[$index$$69$$].formatter || function() {
          return"" + $value$$85$$
        }, $formatter$$1_td$$ = $goog$dom$createDom$$("td", (this.$columns_$[$index$$69$$].classes || $goog$nullFunction$$)($value$$85$$), $formatter$$1_td$$($value$$85$$));
        $td_elements$$[this.$columns_$[$index$$69$$].property] = $formatter$$1_td$$
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
  var $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$ = $JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$, $work_col_1$$inline_336$$ = $goog$dom$getFirstElementChild$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$tr_columns_el_$), $work_col_2$$inline_337$$ = $goog$dom$getFirstElementChild$$($first_row$$1$$), $sizing_col$$inline_338$$ = $goog$dom$getFirstElementChild$$($el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$);
  for($goog$dom$getChildren$$($el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$);$sizing_col$$inline_338$$ != $JSCompiler_alias_NULL$$;) {
    var $element$$inline_398_size$$inline_403$$ = $sizing_col$$inline_338$$;
    if("none" != ($goog$style$getComputedStyle$$($element$$inline_398_size$$inline_403$$, "display") || ($element$$inline_398_size$$inline_403$$.currentStyle ? $element$$inline_398_size$$inline_403$$.currentStyle.display : $JSCompiler_alias_NULL$$) || $element$$inline_398_size$$inline_403$$.style && $element$$inline_398_size$$inline_403$$.style.display)) {
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$ = $goog$style$getSizeWithDisplay_$$($element$$inline_398_size$$inline_403$$)
    }else {
      var $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$ = $element$$inline_398_size$$inline_403$$.style, $originalDisplay$$inline_400$$ = $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.display, $originalVisibility$$inline_401$$ = $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.visibility, $originalPosition$$inline_402$$ = $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.position;
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.visibility = "hidden";
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.position = "absolute";
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.display = "inline";
      $element$$inline_398_size$$inline_403$$ = $goog$style$getSizeWithDisplay_$$($element$$inline_398_size$$inline_403$$);
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.display = $originalDisplay$$inline_400$$;
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.position = $originalPosition$$inline_402$$;
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.visibility = $originalVisibility$$inline_401$$;
      $el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$ = $element$$inline_398_size$$inline_403$$
    }
    $work_col_1$$inline_336$$.style.width = $goog$style$getPixelStyleValue_$$($el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.width);
    $work_col_2$$inline_337$$.style.width = $goog$style$getPixelStyleValue_$$($el_size$$inline_339_sizing_row$$inline_335_style$$inline_399$$.width);
    $work_col_1$$inline_336$$ = $goog$dom$getNextElementSibling$$($work_col_1$$inline_336$$);
    $work_col_2$$inline_337$$ = $goog$dom$getNextElementSibling$$($work_col_2$$inline_337$$);
    $sizing_col$$inline_338$$ = $goog$dom$getNextElementSibling$$($sizing_col$$inline_338$$)
  }
  $goog$dom$removeNode$$($JSCompiler_StaticMethods_adjustSizes_$self$$.$th_sizing_el_$)
}
function $bitex$ui$DataGridEvent$$($type$$95$$, $options$$7$$) {
  $goog$events$Event$$.call(this, $type$$95$$);
  this.options = $options$$7$$
}
$goog$inherits$$($bitex$ui$DataGridEvent$$, $goog$events$Event$$);
// Input 59
function $bitex$ui$OrderManager$$($opt_blinkDelay$$3$$, $opt_domHelper$$7$$) {
  this.$blink_delay_$ = $opt_blinkDelay$$3$$ || 700;
  $bitex$ui$DataGrid$$.call(this, {rowClassFn:this.$getRowClass$, columns:[{property:"OrderID", label:"ID", sortable:$JSCompiler_alias_FALSE$$, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-id"
  }}, {property:"OrdStatus", label:"Status", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$17$$) {
    return $bitex$ui$OrderManager$Status$$[$s$$17$$]
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-status"
  }}, {property:"Side", label:"C/V", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$18$$) {
    switch($s$$18$$) {
      case "1":
        return"C";
      case "2":
        return"V"
    }
    return""
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-side"
  }}, {property:"OrderQty", label:"Vol. BTC", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$19$$) {
    return($s$$19$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-order-qty"
  }}, {property:"Price", label:"Pre\u00e7o R$", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$20$$) {
    return($s$$20$$ / 1E5).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-price"
  }}, {property:"LeavesQty", label:"BTC em aberto", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$21$$) {
    return($s$$21$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-leaves_qty"
  }}, {property:"CumQty", label:"BTC executado", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$22$$) {
    return($s$$22$$ / 1E8).toFixed(8)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-cum-qty"
  }}, {property:"AvgPx", label:"Pre\u00e7o m\u00e9dio", sortable:$JSCompiler_alias_FALSE$$, formatter:function($s$$23$$) {
    return($s$$23$$ / 1E5).toFixed(5)
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-avg-price"
  }}, {property:"ClOrdID", label:"A\u00e7\u00f5es", sortable:$JSCompiler_alias_FALSE$$, formatter:function($id$$9$$) {
    return $goog$dom$createDom$$("button", {"class":"btn btn-mini btn-danger", "data-client-order-id":$id$$9$$}, "Cancelar")
  }, classes:function() {
    return $bitex$ui$OrderManager$CSS_CLASS$$ + "-actions"
  }}]}, $opt_domHelper$$7$$)
}
$goog$inherits$$($bitex$ui$OrderManager$$, $bitex$ui$DataGrid$$);
var $bitex$ui$OrderManager$Status$$ = {"-":"pendente", 0:"nova", 1:"exec. parcial", 2:"executada", 4:"cancelada"}, $bitex$ui$OrderManager$CSS_CLASS$$ = "order-manager";
$bitex$ui$OrderManager$$.prototype.$getCssClass$ = function $$bitex$ui$OrderManager$$$$$getCssClass$$() {
  return $bitex$ui$OrderManager$CSS_CLASS$$
};
$bitex$ui$OrderManager$$.prototype.$getRowClass$ = function $$bitex$ui$OrderManager$$$$$getRowClass$$($row_set$$1$$) {
  var $class_id$$ = "client-order-id-" + $row_set$$1$$.ClOrdID, $class_status$$;
  switch($row_set$$1$$.OrdStatus) {
    case "-":
      $class_status$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-pending";
      break;
    case "0":
      $class_status$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-new";
      break;
    case "1":
      $class_status$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-partial";
      break;
    case "2":
      $class_status$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-fill";
      break;
    case "4":
      $class_status$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-cancel"
  }
  return[$class_id$$, $class_status$$]
};
function $JSCompiler_StaticMethods_processExecutionReport$$($JSCompiler_StaticMethods_processExecutionReport$self$$, $execution_report_msg$$) {
  var $tr_element$$ = $goog$dom$getElementByClass$$("client-order-id-" + $execution_report_msg$$.ClOrdID, $JSCompiler_StaticMethods_processExecutionReport$self$$.$getElement$());
  if(0 === $execution_report_msg$$.LeavesQty) {
    $tr_element$$ != $JSCompiler_alias_NULL$$ && $goog$dom$removeNode$$($tr_element$$)
  }else {
    if($tr_element$$ != $JSCompiler_alias_NULL$$) {
      $goog$object$forEach$$($execution_report_msg$$, function($value$$86$$, $column$$3$$) {
        var $td_element$$1$$ = $JSCompiler_StaticMethods_setColumnValue$$(this, $tr_element$$, $column$$3$$, $value$$86$$);
        if($td_element$$1$$ != $JSCompiler_alias_NULL$$) {
          var $blink_class$$4$$ = $bitex$ui$OrderManager$CSS_CLASS$$ + "-blink";
          $goog$dom$classes$add$$($td_element$$1$$, $blink_class$$4$$);
          $goog$Timer$callOnce$$(function() {
            $goog$dom$classes$remove$$($td_element$$1$$, $blink_class$$4$$)
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
$bitex$ui$OrderManager$$.prototype.$insertOrder$ = function $$bitex$ui$OrderManager$$$$$insertOrder$$($clientOrderId$$1_tr_attributes$$, $dom$$8_status$$1$$, $side$$2_tr$$2$$, $orderQty$$, $price$$6$$, $leavesQty$$, $cumQty_opt_cumQty$$, $avgPx_opt_avgPrice$$, $opt_orderId_orderId$$2$$) {
  var $status_class_status_desc$$;
  switch($dom$$8_status$$1$$) {
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
  $clientOrderId$$1_tr_attributes$$ = {id:"client_order_id_" + $clientOrderId$$1_tr_attributes$$, "class":$status_class_status_desc$$};
  $orderQty$$ = ($orderQty$$ / 1E8).toFixed(8);
  $price$$6$$ = ($price$$6$$ / 1E5).toFixed(5);
  $leavesQty$$ = ($leavesQty$$ / 1E8).toFixed(8);
  $cumQty_opt_cumQty$$ = ($cumQty_opt_cumQty$$ | 0).toFixed(8);
  $avgPx_opt_avgPrice$$ = ($avgPx_opt_avgPrice$$ | 0).toFixed(5);
  $opt_orderId_orderId$$2$$ |= 0;
  $status_class_status_desc$$ = $bitex$ui$OrderManager$Status$$[$dom$$8_status$$1$$];
  $dom$$8_status$$1$$ = this.$getDomHelper$();
  $side$$2_tr$$2$$ = $dom$$8_status$$1$$.$createDom$("tr", $clientOrderId$$1_tr_attributes$$, $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-id", "" + $opt_orderId_orderId$$2$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-status", "" + $status_class_status_desc$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-side", "" + $side$$2_tr$$2$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-order-qty", "" + $orderQty$$), $dom$$8_status$$1$$.$createDom$("td", 
  this.$getCssClass$() + "-price", "" + $price$$6$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-leaves-qty", "" + $leavesQty$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-cum-qty", "" + $cumQty_opt_cumQty$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-avg-px", "" + $avgPx_opt_avgPrice$$), $dom$$8_status$$1$$.$createDom$("td", this.$getCssClass$() + "-actions", $dom$$8_status$$1$$.$createDom$("button", ["btn", "btn-mini", "btn-danger"], 
  "Cancelar")));
  $dom$$8_status$$1$$.appendChild(this.$tbody_$, $side$$2_tr$$2$$)
};
$bitex$ui$OrderManager$$.prototype.$enterDocument$ = function $$bitex$ui$OrderManager$$$$$enterDocument$$() {
  $bitex$ui$OrderManager$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$getElement$(), "click", function($client_order_id_e$$50$$) {
    $client_order_id_e$$50$$ = $client_order_id_e$$50$$.target.getAttribute("data-client-order-id");
    $client_order_id_e$$50$$ != $JSCompiler_alias_NULL$$ && this.dispatchEvent(new $bitex$ui$OrderManagerEvent$$("cancel", $client_order_id_e$$50$$))
  })
};
function $bitex$ui$OrderManagerEvent$$($type$$96$$, $client_order_id$$1$$) {
  $goog$events$Event$$.call(this, $type$$96$$);
  this.$client_order_id$ = $client_order_id$$1$$
}
$goog$inherits$$($bitex$ui$OrderManagerEvent$$, $goog$events$Event$$);
$goog$ui$registry$setDecoratorByClassName$$($bitex$ui$OrderManager$CSS_CLASS$$, function() {
  return new $bitex$ui$OrderManager$$
});
// Input 60
// Input 61
// Input 62
// Input 63
function $goog$dom$forms$getValue$$($el$$37$$) {
  var $selectedIndex$$inline_342_type$$97_values$$inline_345$$ = $el$$37$$.type;
  if($selectedIndex$$inline_342_type$$97_values$$inline_345$$ === $JSCompiler_alias_VOID$$) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_342_type$$97_values$$inline_345$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$37$$.checked ? $el$$37$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_342_type$$97_values$$inline_345$$ = $el$$37$$.selectedIndex, 0 <= $selectedIndex$$inline_342_type$$97_values$$inline_345$$ ? $el$$37$$.options[$selectedIndex$$inline_342_type$$97_values$$inline_345$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_342_type$$97_values$$inline_345$$ = [], $option$$inline_346$$, $i$$inline_347$$ = 0;$option$$inline_346$$ = $el$$37$$.options[$i$$inline_347$$];$i$$inline_347$$++) {
        $option$$inline_346$$.selected && $selectedIndex$$inline_342_type$$97_values$$inline_345$$.push($option$$inline_346$$.value)
      }
      return $selectedIndex$$inline_342_type$$97_values$$inline_345$$.length ? $selectedIndex$$inline_342_type$$97_values$$inline_345$$ : $JSCompiler_alias_NULL$$;
    default:
      return $el$$37$$.value !== $JSCompiler_alias_VOID$$ ? $el$$37$$.value : $JSCompiler_alias_NULL$$
  }
}
;
// Input 64
$goog$exportPath_$$("bitex.app.bitex", function($url$$30$$) {
  function $login$$($username$$6$$, $password$$4$$) {
    if($goog$string$isEmpty$$($username$$6$$) || /[^a-zA-Z0-9]/.test($username$$6$$)) {
      alert("Nome de usu\u00e1rio inv\u00e1lido")
    }else {
      if($goog$string$isEmpty$$($password$$4$$) || 6 > $password$$4$$.length) {
        alert("Senha deve ter no m\u00ednimo 6 letras")
      }else {
        if($goog$dom$classes$has$$()) {
          try {
            $bitEx$$.open($url$$30$$)
          }catch($e$$74$$) {
            alert("Erro se conectando ao servidor...");
            return
          }
          $goog$events$listenOnce$$($bitEx$$, "opened", function() {
            $bitEx$$.login($username$$6$$, $password$$4$$)
          })
        }else {
          $bitEx$$.close()
        }
      }
    }
  }
  function $onCancelOrder_$$($e$$57$$) {
    $bitEx$$.$cancelOrder$($JSCompiler_alias_VOID$$, $e$$57$$.$order_id$)
  }
  var $router$$ = new $bitex$app$UrlRouter$$("", "start");
  $router$$.addEventListener("set_view", function($e$$53_view_name$$2$$) {
    $e$$53_view_name$$2$$ = $e$$53_view_name$$2$$.view;
    var $classes$$8$$ = $goog$dom$classes$get$$(document.body), $classes_to_remove$$ = [];
    $goog$array$forEach$$($classes$$8$$, function($cls$$1$$) {
      0 == $cls$$1$$.lastIndexOf("active-view-", 0) && $classes_to_remove$$.push($cls$$1$$)
    });
    $goog$array$forEach$$($classes_to_remove$$, function($cls$$2$$) {
      $goog$dom$classes$remove$$(document.body, $cls$$2$$)
    });
    document.body.scrollTop = 0;
    $goog$dom$classes$add$$(document.body, "active-view-" + $e$$53_view_name$$2$$)
  });
  $goog$events$listen$$(document.body, "click", function($e$$54$$) {
    var $view_name$$3$$ = $e$$54$$.target.getAttribute("data-switch-view");
    $view_name$$3$$ != $JSCompiler_alias_NULL$$ && ($e$$54$$.preventDefault(), $e$$54$$.stopPropagation(), $JSCompiler_StaticMethods_setView$$($router$$, $view_name$$3$$))
  });
  var $bitEx$$ = new $bitex$api$BitEx$$, $currentUsername$$ = $JSCompiler_alias_NULL$$, $order_book_bid$$ = $JSCompiler_alias_NULL$$, $order_book_offer$$ = $JSCompiler_alias_NULL$$, $balance_info$$ = new $bitex$ui$BalanceInfo$$;
  $balance_info$$.$decorate$($goog$dom$getElement$$("account_overview"));
  var $order_entry$$ = new $bitex$ui$OrderEntry$$;
  $order_entry$$.$decorate$($goog$dom$getElement$$("id_order_entry"));
  var $order_manager$$ = new $bitex$ui$OrderManager$$;
  $order_entry$$.addEventListener("buy_limited", function($e$$55_pendingOrderMessage$$) {
    $e$$55_pendingOrderMessage$$ = {OrderID:"-", ClOrdID:"" + $bitEx$$.$sendBuyLimitedOrder$($e$$55_pendingOrderMessage$$.$symbol$, $e$$55_pendingOrderMessage$$.$qty$, $e$$55_pendingOrderMessage$$.$price$), OrdStatus:"-", Symbol:$e$$55_pendingOrderMessage$$.$symbol$, Side:"1", OrderQty:1E8 * $e$$55_pendingOrderMessage$$.$qty$, Price:1E5 * $e$$55_pendingOrderMessage$$.$price$};
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$55_pendingOrderMessage$$)
  });
  $order_entry$$.addEventListener("sell_limited", function($e$$56_pendingOrderMessage$$1$$) {
    $e$$56_pendingOrderMessage$$1$$ = {OrderID:"-", ClOrdID:"" + $bitEx$$.$sendSellLimitedOrder$($e$$56_pendingOrderMessage$$1$$.$symbol$, $e$$56_pendingOrderMessage$$1$$.$qty$, $e$$56_pendingOrderMessage$$1$$.$price$), OrdStatus:"-", Symbol:$e$$56_pendingOrderMessage$$1$$.$symbol$, Side:"2", OrderQty:1E8 * $e$$56_pendingOrderMessage$$1$$.$qty$, Price:1E5 * $e$$56_pendingOrderMessage$$1$$.$price$};
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$56_pendingOrderMessage$$1$$)
  });
  $bitEx$$.addEventListener("login_ok", function($e$$58_msg$$11$$) {
    $e$$58_msg$$11$$ = $e$$58_msg$$11$$.data;
    $goog$dom$classes$add$$(document.body, "bitex-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-not-logged");
    $currentUsername$$ = $e$$58_msg$$11$$.Username;
    $order_book_bid$$ != $JSCompiler_alias_NULL$$ && ($order_book_bid$$.$dispose$(), $order_book_offer$$.$dispose$());
    $order_book_bid$$ = new $bitex$ui$OrderBook$$($currentUsername$$, "0");
    $order_book_offer$$ = new $bitex$ui$OrderBook$$($currentUsername$$, "1");
    $order_book_bid$$.$decorate$($goog$dom$getElement$$("order_book_bid"));
    $order_book_offer$$.$decorate$($goog$dom$getElement$$("order_book_offer"));
    $order_book_bid$$.addEventListener("cancel", $onCancelOrder_$$);
    $order_book_offer$$.addEventListener("cancel", $onCancelOrder_$$);
    $order_manager$$.$wasDecorated_$ ? $order_manager$$.reload() : $order_manager$$.$decorate$($goog$dom$getElement$$("id_orders_table"));
    $bitEx$$.$subscribeMarketData$(0, ["BRLBTC"], ["0", "1", "2"]);
    $JSCompiler_StaticMethods_setView$$($router$$, "trading")
  });
  $order_manager$$.addEventListener("cancel", function($e$$59$$) {
    $bitEx$$.$cancelOrder$($e$$59$$.$client_order_id$)
  });
  $bitEx$$.addEventListener("login_error", function($e$$60$$) {
    $goog$dom$classes$add$$(document.body, "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "bitex-logged");
    alert($e$$60$$.data.UserStatusText)
  });
  $bitEx$$.addEventListener("ob_clear", function() {
    $order_book_bid$$.clear();
    $order_book_offer$$.clear()
  });
  $bitEx$$.addEventListener("ob_delete_orders_thru", function($e$$62_index$$70$$) {
    var $msg$$13_side$$3$$ = $e$$62_index$$70$$.data;
    $e$$62_index$$70$$ = $msg$$13_side$$3$$.MDEntryPositionNo;
    $msg$$13_side$$3$$ = $msg$$13_side$$3$$.MDEntryType;
    "0" == $msg$$13_side$$3$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_bid$$, $e$$62_index$$70$$) : "1" == $msg$$13_side$$3$$ && $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_offer$$, $e$$62_index$$70$$)
  });
  $bitEx$$.addEventListener("ob_delete_order", function($e$$63_index$$71$$) {
    var $msg$$14_side$$4$$ = $e$$63_index$$71$$.data;
    $e$$63_index$$71$$ = $msg$$14_side$$4$$.MDEntryPositionNo - 1;
    $msg$$14_side$$4$$ = $msg$$14_side$$4$$.MDEntryType;
    "0" == $msg$$14_side$$4$$ ? $JSCompiler_StaticMethods_deleteOrder$$($order_book_bid$$, $e$$63_index$$71$$) : "1" == $msg$$14_side$$4$$ && $JSCompiler_StaticMethods_deleteOrder$$($order_book_offer$$, $e$$63_index$$71$$)
  });
  $bitEx$$.addEventListener("ob_update_order", function($e$$64_index$$72$$) {
    var $msg$$15_side$$5$$ = $e$$64_index$$72$$.data;
    $e$$64_index$$72$$ = $msg$$15_side$$5$$.MDEntryPositionNo - 1;
    var $qty$$7$$ = ($msg$$15_side$$5$$.MDEntrySize / 1E8).toFixed(8), $msg$$15_side$$5$$ = $msg$$15_side$$5$$.MDEntryType;
    "0" == $msg$$15_side$$5$$ ? $JSCompiler_StaticMethods_updateOrder$$($order_book_bid$$, $e$$64_index$$72$$, $qty$$7$$) : "1" == $msg$$15_side$$5$$ && $JSCompiler_StaticMethods_updateOrder$$($order_book_offer$$, $e$$64_index$$72$$, $qty$$7$$)
  });
  $bitEx$$.addEventListener("ob_new_order", function($e$$65_index$$73$$) {
    var $msg$$16_side$$6$$ = $e$$65_index$$73$$.data;
    $e$$65_index$$73$$ = $msg$$16_side$$6$$.MDEntryPositionNo - 1;
    var $price$$7$$ = ($msg$$16_side$$6$$.MDEntryPx / 1E5).toFixed(5), $qty$$8$$ = ($msg$$16_side$$6$$.MDEntrySize / 1E8).toFixed(8), $username$$4$$ = $msg$$16_side$$6$$.Username, $orderId$$3$$ = $msg$$16_side$$6$$.OrderID, $msg$$16_side$$6$$ = $msg$$16_side$$6$$.MDEntryType;
    "0" == $msg$$16_side$$6$$ ? $order_book_bid$$.$insertOrder$($e$$65_index$$73$$, $orderId$$3$$, $price$$7$$, $qty$$8$$, $username$$4$$) : "1" == $msg$$16_side$$6$$ && $order_book_offer$$.$insertOrder$($e$$65_index$$73$$, $orderId$$3$$, $price$$7$$, $qty$$8$$, $username$$4$$)
  });
  $bitEx$$.addEventListener("balance_response", function($e$$66_msg$$17$$) {
    $e$$66_msg$$17$$ = $e$$66_msg$$17$$.data;
    $JSCompiler_StaticMethods_updateBalanceBRL$$($balance_info$$, $e$$66_msg$$17$$.balance_brl);
    $JSCompiler_StaticMethods_updateBalanceBTC$$($balance_info$$, $e$$66_msg$$17$$.balance_btc)
  });
  $bitEx$$.addEventListener("execution_report", function($e$$67$$) {
    $JSCompiler_StaticMethods_processExecutionReport$$($order_manager$$, $e$$67$$.data)
  });
  $order_manager$$.addEventListener("request_data", function($e$$68$$) {
    $bitEx$$.$requestOpenOrders$("open_orders", $e$$68$$.options.Page, $e$$68$$.options.Limit)
  });
  $bitEx$$.addEventListener("order_list_response", function($e$$69_msg$$18$$) {
    $e$$69_msg$$18$$ = $e$$69_msg$$18$$.data;
    $JSCompiler_StaticMethods_setResultSet$$($order_manager$$, $e$$69_msg$$18$$.OrdListGrp, $e$$69_msg$$18$$.Columns)
  });
  var $button_signup$$ = new $goog$ui$Button$$;
  $button_signup$$.$decorate$($goog$dom$getElement$$("id_btn_signup"));
  $goog$events$listen$$($goog$dom$getElement$$("user_agreed_tos"), "click", function($e$$70$$) {
    $button_signup$$.$setEnabled$($e$$70$$.target.checked)
  });
  $button_signup$$.addEventListener("action", function($e$$71_password2$$) {
    $e$$71_password2$$.stopPropagation();
    $e$$71_password2$$.preventDefault();
    var $first_name$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_first_name")), $last_name$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_last_name")), $username$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_username")), $email$$1$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_email")), $password$$3$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password"));
    $e$$71_password2$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_signup_password2"));
    if($goog$string$isEmpty$$($first_name$$1$$)) {
      alert("Primeiro nome \u00e9 de preenchimento obrigat\u00f3rio")
    }else {
      if($goog$string$isEmpty$$($last_name$$1$$)) {
        alert("Ultimo nome \u00e9 de preenchimento obrigat\u00f3rio")
      }else {
        if($goog$string$isEmpty$$($username$$5$$) || /[^a-zA-Z0-9]/.test($username$$5$$)) {
          alert("Nome de usu\u00e1rio inv\u00e1lido")
        }else {
          if($email$$1$$.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            if($goog$string$isEmpty$$($password$$3$$) || 6 > $password$$3$$.length) {
              alert("Senha deve ter no m\u00ednimo 6 letras")
            }else {
              if($password$$3$$ !== $e$$71_password2$$) {
                alert("Senhas n\u00e3o conferem")
              }else {
                if($goog$dom$classes$has$$()) {
                  try {
                    $bitEx$$.open($url$$30$$)
                  }catch($e$$72$$) {
                    alert("Erro se conectando ao servidor...");
                    return
                  }
                  $goog$events$listenOnce$$($bitEx$$, "opened", function() {
                    $bitEx$$.$signUp$($username$$5$$, $password$$3$$, $first_name$$1$$, $last_name$$1$$, $email$$1$$)
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
      }
    }
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_landing_signin"), "click", function($e$$76_username$$7$$) {
    $e$$76_username$$7$$.stopPropagation();
    $e$$76_username$$7$$.preventDefault();
    $e$$76_username$$7$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_username"));
    var $password$$5$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_landing_password"));
    $login$$($e$$76_username$$7$$, $password$$5$$)
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_btn_login"), "click", function($e$$77_username$$8$$) {
    $e$$77_username$$8$$.stopPropagation();
    $e$$77_username$$8$$.preventDefault();
    $e$$77_username$$8$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_username"));
    var $password$$6$$ = $goog$dom$forms$getValue$$($goog$dom$getElement$$("id_password"));
    $login$$($e$$77_username$$8$$, $password$$6$$)
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
    $JSCompiler_StaticMethods_setView$$($router$$, "start")
  })
});

