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
// Input 2
var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_45$$;
if($ua$$inline_45$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_46$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_45$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_45$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_45$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_46$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_48$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_48$$ && $navigator$$inline_48$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_51$$ = "", $re$$inline_52$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_53$$ = $goog$global$$.opera.version, $version$$inline_51$$ = "function" == typeof $operaVersion$$inline_53$$ ? $operaVersion$$inline_53$$() : $operaVersion$$inline_53$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_52$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_52$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_52$$ = /WebKit\/(\S+)/), $re$$inline_52$$) {
      var $arr$$inline_54$$ = $re$$inline_52$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_51$$ = $arr$$inline_54$$ ? $arr$$inline_54$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_55$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_55$$ > parseFloat($version$$inline_51$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_55$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_51$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$41_order$$inline_59$$;
  if(!($JSCompiler_temp$$41_order$$inline_59$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$41_order$$inline_59$$ = 0;
    for(var $v1Subs$$inline_60$$ = String($goog$userAgent$VERSION$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $v2Subs$$inline_61$$ = String($version$$8$$).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), $subCount$$inline_62$$ = Math.max($v1Subs$$inline_60$$.length, $v2Subs$$inline_61$$.length), $subIdx$$inline_63$$ = 0;0 == $JSCompiler_temp$$41_order$$inline_59$$ && $subIdx$$inline_63$$ < $subCount$$inline_62$$;$subIdx$$inline_63$$++) {
      var $v1Sub$$inline_64$$ = $v1Subs$$inline_60$$[$subIdx$$inline_63$$] || "", $v2Sub$$inline_65$$ = $v2Subs$$inline_61$$[$subIdx$$inline_63$$] || "", $v1CompParser$$inline_66$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_67$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_68$$ = $v1CompParser$$inline_66$$.exec($v1Sub$$inline_64$$) || ["", "", ""], $v2Comp$$inline_69$$ = $v2CompParser$$inline_67$$.exec($v2Sub$$inline_65$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_68$$[0].length && 0 == $v2Comp$$inline_69$$[0].length) {
          break
        }
        $JSCompiler_temp$$41_order$$inline_59$$ = ((0 == $v1Comp$$inline_68$$[1].length ? 0 : parseInt($v1Comp$$inline_68$$[1], 10)) < (0 == $v2Comp$$inline_69$$[1].length ? 0 : parseInt($v2Comp$$inline_69$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_68$$[1].length ? 0 : parseInt($v1Comp$$inline_68$$[1], 10)) > (0 == $v2Comp$$inline_69$$[1].length ? 0 : parseInt($v2Comp$$inline_69$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_68$$[2].length) < (0 == $v2Comp$$inline_69$$[2].length) ? -1 : (0 == $v1Comp$$inline_68$$[2].length) > 
        (0 == $v2Comp$$inline_69$$[2].length) ? 1 : 0) || ($v1Comp$$inline_68$$[2] < $v2Comp$$inline_69$$[2] ? -1 : $v1Comp$$inline_68$$[2] > $v2Comp$$inline_69$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$41_order$$inline_59$$)
    }
    $JSCompiler_temp$$41_order$$inline_59$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$41_order$$inline_59$$
  }
  return $JSCompiler_temp$$41_order$$inline_59$$
}
var $doc$$inline_71$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_71$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_71$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
// Input 3
function $goog$object$forEach$$($obj$$40$$, $f$$) {
  for(var $key$$18$$ in $obj$$40$$) {
    $f$$.call($JSCompiler_alias_VOID$$, $obj$$40$$[$key$$18$$], $key$$18$$, $obj$$40$$)
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
// Input 9
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
// Input 12
var $goog$dom$defaultDomHelper_$$;
// Input 13
function $goog$dom$classes$get$$($className$$5_element$$9$$) {
  $className$$5_element$$9$$ = $className$$5_element$$9$$.className;
  return $goog$isString$$($className$$5_element$$9$$) && $className$$5_element$$9$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$10$$, $var_args$$66$$) {
  for(var $classes$$ = $goog$dom$classes$get$$($element$$10$$), $args$$6_args$$inline_81$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$6_args$$inline_81$$.length, $classes$$inline_80$$ = $classes$$, $i$$inline_82$$ = 0;$i$$inline_82$$ < $args$$6_args$$inline_81$$.length;$i$$inline_82$$++) {
    $goog$array$contains$$($classes$$inline_80$$, $args$$6_args$$inline_81$$[$i$$inline_82$$]) || $classes$$inline_80$$.push($args$$6_args$$inline_81$$[$i$$inline_82$$])
  }
  $element$$10$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$11$$, $var_args$$67$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$11$$), $args$$7$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$7$$);
  $element$$11$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$7$$.length
}
function $goog$dom$classes$getDifference_$$($arr1$$4$$, $arr2$$12$$) {
  return $goog$array$filter$$($arr1$$4$$, function($item$$) {
    return!$goog$array$contains$$($arr2$$12$$, $item$$)
  })
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
function $goog$dom$getElementsByClass$$($opt_el$$1$$) {
  var $parent$$2$$ = $opt_el$$1$$ || document;
  return $parent$$2$$.querySelectorAll && $parent$$2$$.querySelector ? $parent$$2$$.querySelectorAll(".bitex-model") : $parent$$2$$.getElementsByClassName ? $parent$$2$$.getElementsByClassName("bitex-model") : $goog$dom$getElementsByTagNameAndClass_$$(document, "*", "bitex-model", $opt_el$$1$$)
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
  2 < $args$$9$$.length && $goog$dom$append_$$($doc$$12$$, $element$$19_tagName$$3_tagNameArr$$, $args$$9$$, 2);
  return $element$$19_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$13$$, $parent$$6$$, $args$$10$$, $i$$53_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$6$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$13$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$53_startIndex$$ < $args$$10$$.length;$i$$53_startIndex$$++) {
    var $arg$$5$$ = $args$$10$$[$i$$53_startIndex$$];
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
function $goog$dom$append$$($parent$$8$$, $var_args$$69$$) {
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
function $JSCompiler_StaticMethods_getElementsByTagNameAndClass$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$, $opt_el$$4$$) {
  return $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_getElementsByTagNameAndClass$self$$.$document_$, "tbody", $JSCompiler_alias_VOID$$, $opt_el$$4$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($tagName$$5$$, $opt_attributes$$1$$, $var_args$$71$$) {
  return $goog$dom$createDom_$$(this.$document_$, arguments)
};
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$64$$) {
  return this.$document_$.createElement($name$$64$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$5$$) {
  return this.$document_$.createTextNode(String($content$$5$$))
};
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_93$$) {
  var $doc$$inline_92_win$$inline_94$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_93$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_93$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_92_win$$inline_94$$.compatMode ? $doc$$inline_92_win$$inline_94$$.documentElement : $doc$$inline_92_win$$inline_94$$.body;
  $doc$$inline_92_win$$inline_94$$ = $goog$dom$getWindow_$$($doc$$inline_92_win$$inline_94$$);
  return new $goog$math$Coordinate$$($doc$$inline_92_win$$inline_94$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_93$$.scrollLeft, $doc$$inline_92_win$$inline_94$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_93$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
function $JSCompiler_StaticMethods_insertChildAt$$($parent$$9$$, $child$$4$$, $index$$54$$) {
  $parent$$9$$.insertBefore($child$$4$$, $parent$$9$$.childNodes[$index$$54$$] || $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
function $JSCompiler_StaticMethods_getChildren$$($element$$21$$) {
  return $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ && $element$$21$$.children != $JSCompiler_alias_VOID$$ ? $element$$21$$.children : $goog$array$filter$$($element$$21$$.childNodes, function($node$$8$$) {
    return 1 == $node$$8$$.nodeType
  })
}
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$setTextContent$ = $goog$dom$setTextContent$$;
// Input 17
function $goog$style$getComputedStyle$$($element$$36$$, $property$$4$$) {
  var $doc$$24_styles$$ = $goog$dom$getOwnerDocument$$($element$$36$$);
  return $doc$$24_styles$$.defaultView && $doc$$24_styles$$.defaultView.getComputedStyle && ($doc$$24_styles$$ = $doc$$24_styles$$.defaultView.getComputedStyle($element$$36$$, $JSCompiler_alias_NULL$$)) ? $doc$$24_styles$$[$property$$4$$] || $doc$$24_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getStyle_$$($element$$38$$, $style$$5$$) {
  return $goog$style$getComputedStyle$$($element$$38$$, $style$$5$$) || ($element$$38$$.currentStyle ? $element$$38$$.currentStyle[$style$$5$$] : $JSCompiler_alias_NULL$$) || $element$$38$$.style && $element$$38$$.style[$style$$5$$]
}
function $goog$style$setPosition$$($el$$4$$, $arg1$$76_y$$38$$, $opt_arg2$$) {
  var $x$$60$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1$$76_y$$38$$ instanceof $goog$math$Coordinate$$ ? ($x$$60$$ = $arg1$$76_y$$38$$.x, $arg1$$76_y$$38$$ = $arg1$$76_y$$38$$.y) : ($x$$60$$ = $arg1$$76_y$$38$$, $arg1$$76_y$$38$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$60$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1$$76_y$$38$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$setSize$$($element$$51$$, $w$$6$$, $h$$5_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$5_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$5_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $element$$51$$.style.width = $goog$style$getPixelStyleValue_$$($w$$6$$, $JSCompiler_alias_TRUE$$);
  $element$$51$$.style.height = $goog$style$getPixelStyleValue_$$($h$$5_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$68$$, $round$$) {
  "number" == typeof $value$$68$$ && ($value$$68$$ = ($round$$ ? Math.round($value$$68$$) : $value$$68$$) + "px");
  return $value$$68$$
}
function $goog$style$getSize$$($element$$54_size$$10$$) {
  if("none" != $goog$style$getStyle_$$($element$$54_size$$10$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$54_size$$10$$)
  }
  var $style$$6$$ = $element$$54_size$$10$$.style, $originalDisplay$$ = $style$$6$$.display, $originalVisibility$$ = $style$$6$$.visibility, $originalPosition$$ = $style$$6$$.position;
  $style$$6$$.visibility = "hidden";
  $style$$6$$.position = "absolute";
  $style$$6$$.display = "inline";
  $element$$54_size$$10$$ = $goog$style$getSizeWithDisplay_$$($element$$54_size$$10$$);
  $style$$6$$.display = $originalDisplay$$;
  $style$$6$$.position = $originalPosition$$;
  $style$$6$$.visibility = $originalVisibility$$;
  return $element$$54_size$$10$$
}
function $goog$style$getSizeWithDisplay_$$($doc$$inline_104_element$$55$$) {
  var $offsetWidth_rect$$inline_103$$ = $doc$$inline_104_element$$55$$.offsetWidth, $offsetHeight$$ = $doc$$inline_104_element$$55$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth_rect$$inline_103$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth_rect$$inline_103$$) || $webkitOffsetsZero$$) && $doc$$inline_104_element$$55$$.getBoundingClientRect ? ($offsetWidth_rect$$inline_103$$ = $doc$$inline_104_element$$55$$.getBoundingClientRect(), $goog$userAgent$IE$$ && ($doc$$inline_104_element$$55$$ = $doc$$inline_104_element$$55$$.ownerDocument, $offsetWidth_rect$$inline_103$$.left -= $doc$$inline_104_element$$55$$.documentElement.clientLeft + $doc$$inline_104_element$$55$$.body.clientLeft, $offsetWidth_rect$$inline_103$$.top -= 
  $doc$$inline_104_element$$55$$.documentElement.clientTop + $doc$$inline_104_element$$55$$.body.clientTop), new $goog$math$Size$$($offsetWidth_rect$$inline_103$$.right - $offsetWidth_rect$$inline_103$$.left, $offsetWidth_rect$$inline_103$$.bottom - $offsetWidth_rect$$inline_103$$.top)) : new $goog$math$Size$$($offsetWidth_rect$$inline_103$$, $offsetHeight$$)
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
function $goog$style$getIePixelBorder_$$($element$$68$$, $prop$$4$$) {
  if("none" == ($element$$68$$.currentStyle ? $element$$68$$.currentStyle[$prop$$4$$ + "Style"] : $JSCompiler_alias_NULL$$)) {
    return 0
  }
  var $pixelValue$$inline_112_width$$15$$ = $element$$68$$.currentStyle ? $element$$68$$.currentStyle[$prop$$4$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$30_oldStyleValue$$inline_110$$;
  if($pixelValue$$inline_112_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$30_oldStyleValue$$inline_110$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_112_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_112_width$$15$$)) {
      $JSCompiler_temp$$30_oldStyleValue$$inline_110$$ = parseInt($pixelValue$$inline_112_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$30_oldStyleValue$$inline_110$$ = $element$$68$$.style.left;
      var $oldRuntimeValue$$inline_111$$ = $element$$68$$.runtimeStyle.left;
      $element$$68$$.runtimeStyle.left = $element$$68$$.currentStyle.left;
      $element$$68$$.style.left = $pixelValue$$inline_112_width$$15$$;
      $pixelValue$$inline_112_width$$15$$ = $element$$68$$.style.pixelLeft;
      $element$$68$$.style.left = $JSCompiler_temp$$30_oldStyleValue$$inline_110$$;
      $element$$68$$.runtimeStyle.left = $oldRuntimeValue$$inline_111$$;
      $JSCompiler_temp$$30_oldStyleValue$$inline_110$$ = $pixelValue$$inline_112_width$$15$$
    }
  }
  return $JSCompiler_temp$$30_oldStyleValue$$inline_110$$
}
function $goog$style$getBorderBox$$($bottom$$5_element$$69$$) {
  if($goog$userAgent$IE$$) {
    var $left$$8$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$69$$, "borderLeft"), $right$$9$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$69$$, "borderRight"), $top$$6$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$69$$, "borderTop");
    $bottom$$5_element$$69$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$69$$, "borderBottom");
    return new $goog$math$Box$$($top$$6$$, $right$$9$$, $bottom$$5_element$$69$$, $left$$8$$)
  }
  $left$$8$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$69$$, "borderLeftWidth");
  $right$$9$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$69$$, "borderRightWidth");
  $top$$6$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$69$$, "borderTopWidth");
  $bottom$$5_element$$69$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$69$$, "borderBottomWidth");
  return new $goog$math$Box$$(parseFloat($top$$6$$), parseFloat($right$$9$$), parseFloat($bottom$$5_element$$69$$), parseFloat($left$$8$$))
}
;
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
function $goog$dispose$$($obj$$82$$) {
  $obj$$82$$ && "function" == typeof $obj$$82$$.$dispose$ && $obj$$82$$.$dispose$()
}
;
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
function $goog$events$Event$preventDefault$$($e$$15$$) {
  $e$$15$$.preventDefault()
}
;
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
      var $JSCompiler_inline_result$$35$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$35$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_116$$) {
        }
        $JSCompiler_inline_result$$35$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$35$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
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
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_part$$inline_125_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$;
    if(!($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$ = ["window", "event"];
        for(var $cur$$inline_124_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_125_retval$$1$$ = $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$.shift();) {
          if($cur$$inline_124_hasBubble$$1$$[$ieEvent_part$$inline_125_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_124_hasBubble$$1$$ = $cur$$inline_124_hasBubble$$1$$[$ieEvent_part$$inline_125_retval$$1$$]
          }else {
            $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$ = $cur$$inline_124_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_125_retval$$1$$ = $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$;
    $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_124_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$) {
      if(0 > $ieEvent_part$$inline_125_retval$$1$$.keyCode || $ieEvent_part$$inline_125_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_128$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_125_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_125_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_129$$) {
            $evt$$16_useReturnValue$$inline_128$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_128$$ || $ieEvent_part$$inline_125_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_125_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_128$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_128$$.init($ieEvent_part$$inline_125_retval$$1$$, this);
    $ieEvent_part$$inline_125_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_123$$) {
        for(var $ancestors$$2$$ = [], $parent$$19$$ = $evt$$16_useReturnValue$$inline_128$$.currentTarget;$parent$$19$$;$parent$$19$$ = $parent$$19$$.parentNode) {
          $ancestors$$2$$.push($parent$$19$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$70$$ = $ancestors$$2$$.length - 1;!$evt$$16_useReturnValue$$inline_128$$.$propagationStopped_$ && 0 <= $i$$70$$ && $targetsMap$$1$$.$remaining_$;$i$$70$$--) {
          $evt$$16_useReturnValue$$inline_128$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_125_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_128$$)
        }
        if($cur$$inline_124_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$70$$ = 0;!$evt$$16_useReturnValue$$inline_128$$.$propagationStopped_$ && $i$$70$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$70$$++) {
            $evt$$16_useReturnValue$$inline_128$$.currentTarget = $ancestors$$2$$[$i$$70$$], $ieEvent_part$$inline_125_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$70$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_128$$)
          }
        }
      }else {
        $ieEvent_part$$inline_125_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_128$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_125_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_125_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
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
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$17$$, $type$$75$$, $opt_fn$$4$$, $opt_capture$$1$$) {
  $goog$isArray$$($type$$75$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$75$$, $type$$75$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$71$$ = 0;$i$$71$$ < $type$$75$$.length;$i$$71$$++) {
    var $key$$52$$ = $goog$events$listen$$($src$$17$$, $type$$75$$[$i$$71$$], $opt_fn$$4$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$52$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$, $i$$inline_139_type$$77$$, $listener$$inline_134_opt_fn$$6$$, $capture$$inline_137_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_136$$) {
  if($goog$isArray$$($i$$inline_139_type$$77$$)) {
    for(var $i$$73$$ = 0;$i$$73$$ < $i$$inline_139_type$$77$$.length;$i$$73$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$, $i$$inline_139_type$$77$$[$i$$73$$], $listener$$inline_134_opt_fn$$6$$, $capture$$inline_137_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_136$$)
    }
  }else {
    a: {
      $listener$$inline_134_opt_fn$$6$$ = $listener$$inline_134_opt_fn$$6$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_136$$ = $opt_handler$$12_opt_handler$$inline_136$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_137_opt_capture$$3$$ = !!$capture$$inline_137_opt_capture$$3$$;
      if($key$$54_listener$$51_listenerArray$$inline_138_src$$20$$ = $goog$events$getListeners_$$($key$$54_listener$$51_listenerArray$$inline_138_src$$20$$, $i$$inline_139_type$$77$$, $capture$$inline_137_opt_capture$$3$$)) {
        for($i$$inline_139_type$$77$$ = 0;$i$$inline_139_type$$77$$ < $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$.length;$i$$inline_139_type$$77$$++) {
          if(!$key$$54_listener$$51_listenerArray$$inline_138_src$$20$$[$i$$inline_139_type$$77$$].$removed$ && $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$[$i$$inline_139_type$$77$$].$listener$ == $listener$$inline_134_opt_fn$$6$$ && $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$[$i$$inline_139_type$$77$$].capture == $capture$$inline_137_opt_capture$$3$$ && $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$[$i$$inline_139_type$$77$$].$handler$ == $opt_handler$$12_opt_handler$$inline_136$$) {
            $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$[$i$$inline_139_type$$77$$];
            break a
          }
        }
      }
      $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$ = $JSCompiler_alias_NULL$$
    }
    $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$ && ($key$$54_listener$$51_listenerArray$$inline_138_src$$20$$ = $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$.key, $goog$events$unlistenByKey$$($key$$54_listener$$51_listenerArray$$inline_138_src$$20$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$54_listener$$51_listenerArray$$inline_138_src$$20$$))
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
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$23_e$$24_e$$inline_142$$) {
  var $hasCapture$$inline_148_type$$inline_143$$ = $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.type || $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$, $map$$inline_144$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_148_type$$inline_143$$ in $map$$inline_144$$) {
    if($goog$isString$$($JSCompiler_inline_result$$23_e$$24_e$$inline_142$$)) {
      $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$ = new $goog$events$Event$$($JSCompiler_inline_result$$23_e$$24_e$$inline_142$$, this)
    }else {
      if($JSCompiler_inline_result$$23_e$$24_e$$inline_142$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.target = $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.target || this
      }else {
        var $oldEvent$$inline_145_rv$$inline_146$$ = $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$;
        $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$ = new $goog$events$Event$$($hasCapture$$inline_148_type$$inline_143$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$23_e$$24_e$$inline_142$$, $oldEvent$$inline_145_rv$$inline_146$$)
      }
    }
    var $oldEvent$$inline_145_rv$$inline_146$$ = 1, $ancestors$$inline_147_current$$inline_152$$, $map$$inline_144$$ = $map$$inline_144$$[$hasCapture$$inline_148_type$$inline_143$$], $hasCapture$$inline_148_type$$inline_143$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_144$$, $parent$$inline_150_targetsMap$$inline_149$$;
    if($hasCapture$$inline_148_type$$inline_143$$) {
      $ancestors$$inline_147_current$$inline_152$$ = [];
      for($parent$$inline_150_targetsMap$$inline_149$$ = this;$parent$$inline_150_targetsMap$$inline_149$$;$parent$$inline_150_targetsMap$$inline_149$$ = $parent$$inline_150_targetsMap$$inline_149$$.$parentEventTarget_$) {
        $ancestors$$inline_147_current$$inline_152$$.push($parent$$inline_150_targetsMap$$inline_149$$)
      }
      $parent$$inline_150_targetsMap$$inline_149$$ = $map$$inline_144$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_150_targetsMap$$inline_149$$.$remaining_$ = $parent$$inline_150_targetsMap$$inline_149$$.$count_$;
      for(var $i$$inline_151$$ = $ancestors$$inline_147_current$$inline_152$$.length - 1;!$JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$propagationStopped_$ && 0 <= $i$$inline_151$$ && $parent$$inline_150_targetsMap$$inline_149$$.$remaining_$;$i$$inline_151$$--) {
        $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.currentTarget = $ancestors$$inline_147_current$$inline_152$$[$i$$inline_151$$], $oldEvent$$inline_145_rv$$inline_146$$ &= $goog$events$fireListeners_$$($parent$$inline_150_targetsMap$$inline_149$$, $ancestors$$inline_147_current$$inline_152$$[$i$$inline_151$$], $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$) && $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_144$$) {
      if($parent$$inline_150_targetsMap$$inline_149$$ = $map$$inline_144$$[$JSCompiler_alias_FALSE$$], $parent$$inline_150_targetsMap$$inline_149$$.$remaining_$ = $parent$$inline_150_targetsMap$$inline_149$$.$count_$, $hasCapture$$inline_148_type$$inline_143$$) {
        for($i$$inline_151$$ = 0;!$JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$propagationStopped_$ && $i$$inline_151$$ < $ancestors$$inline_147_current$$inline_152$$.length && $parent$$inline_150_targetsMap$$inline_149$$.$remaining_$;$i$$inline_151$$++) {
          $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.currentTarget = $ancestors$$inline_147_current$$inline_152$$[$i$$inline_151$$], $oldEvent$$inline_145_rv$$inline_146$$ &= $goog$events$fireListeners_$$($parent$$inline_150_targetsMap$$inline_149$$, $ancestors$$inline_147_current$$inline_152$$[$i$$inline_151$$], $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$) && $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_147_current$$inline_152$$ = this;!$JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$propagationStopped_$ && $ancestors$$inline_147_current$$inline_152$$ && $parent$$inline_150_targetsMap$$inline_149$$.$remaining_$;$ancestors$$inline_147_current$$inline_152$$ = $ancestors$$inline_147_current$$inline_152$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.currentTarget = $ancestors$$inline_147_current$$inline_152$$, $oldEvent$$inline_145_rv$$inline_146$$ &= $goog$events$fireListeners_$$($parent$$inline_150_targetsMap$$inline_149$$, $ancestors$$inline_147_current$$inline_152$$, $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$) && $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$ = Boolean($oldEvent$$inline_145_rv$$inline_146$$)
  }else {
    $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$23_e$$24_e$$inline_142$$
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
function $JSCompiler_StaticMethods_getId$$($JSCompiler_StaticMethods_getId$self$$) {
  return $JSCompiler_StaticMethods_getId$self$$.$id_$ || ($JSCompiler_StaticMethods_getId$self$$.$id_$ = ":" + ($JSCompiler_StaticMethods_getId$self$$.$idGenerator_$.$nextId_$++).toString(36))
}
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$3$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_155_obj$$inline_434$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_435$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_435$$ in $obj$$inline_155_obj$$inline_434$$ && delete $obj$$inline_155_obj$$inline_434$$[$key$$inline_435$$];
    $obj$$inline_155_obj$$inline_434$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$;
    $id$$3$$ in $obj$$inline_155_obj$$inline_434$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $id$$3$$ + '"'));
    $obj$$inline_155_obj$$inline_434$$[$id$$3$$] = $JSCompiler_StaticMethods_setId$self$$
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$3$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$googUiComponentHandler_$ || (this.$googUiComponentHandler_$ = new $goog$events$EventHandler$$(this))
};
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$22$$) {
  this.$parent_$ && this.$parent_$ != $parent$$22$$ && $JSCompiler_alias_THROW$$(Error("Method not supported"));
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call(this, $parent$$22$$)
};
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$element_$ = this.$dom_$.createElement("div")
};
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$($opt_parentElement$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$element_$ || this.$createDom$();
  $opt_parentElement$$ ? $opt_parentElement$$.insertBefore(this.$element_$, $JSCompiler_alias_NULL$$) : this.$dom_$.$document_$.body.appendChild(this.$element_$);
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
    var $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $JSCompiler_StaticMethods_getId$$($child$$15$$), $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$;
    this.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ ? ($JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ = this.$childIndex_$, $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ = ($JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ in $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ ? $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$[$JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$] : $JSCompiler_alias_VOID$$) || 
    $JSCompiler_alias_NULL$$) : $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ = $JSCompiler_alias_NULL$$;
    $child$$15$$ = $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$;
    $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ && $child$$15$$ && ($JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ = this.$childIndex_$, $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ in $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$ && delete $JSCompiler_temp$$inline_443_obj$$inline_444_obj$$inline_447$$[$JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$], $goog$array$remove$$(this.$children_$, $child$$15$$), $opt_unrender$$ && 
    ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$)), $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ = $child$$15$$, $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$ == $JSCompiler_alias_NULL$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component")), $JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$.$parent_$ = $JSCompiler_alias_NULL$$, $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$inline_167_id$$6$$, 
    $JSCompiler_alias_NULL$$))
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
// Input 35
// Input 36
// Input 37
function $goog$a11y$aria$setState$$($element$$77$$, $state$$1$$, $value$$76$$) {
  $element$$77$$.setAttribute("aria-" + $state$$1$$, $value$$76$$)
}
;
// Input 38
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$83$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$83$$);
  return $element$$83$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$84$$) {
  return $element$$84$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$85$$, $className$$17$$, $enable$$1$$) {
  if($control$$1_element$$85$$ = $control$$1_element$$85$$.$getElement$ ? $control$$1_element$$85$$.$getElement$() : $control$$1_element$$85$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$85$$), $className$$17$$);
      $combinedClasses$$.push($className$$17$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$85$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$1_element$$85$$, $className$$17$$) : $goog$dom$classes$remove$$($control$$1_element$$85$$, $className$$17$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$87$$) {
  $element$$87$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$87$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$87$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$1$$ = $goog$dom$classes$get$$($element$$87$$);
  $goog$array$forEach$$($classNames$$1$$, function($className$$19_state$$inline_179$$) {
    if(!$hasRendererClassName$$ && $className$$19_state$$inline_179$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$19_state$$inline_179$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$27$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_519$$ = this.$classByState_$, $transposed$$inline_520$$ = {}, $key$$inline_521$$;
          for($key$$inline_521$$ in $obj$$inline_519$$) {
            $transposed$$inline_520$$[$obj$$inline_519$$[$key$$inline_521$$]] = $key$$inline_521$$
          }
          this.$stateByClass_$ = $transposed$$inline_520$$
        }
        $className$$19_state$$inline_179$$ = parseInt(this.$stateByClass_$[$className$$19_state$$inline_179$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$27$$ | (isNaN($className$$19_state$$inline_179$$) ? 0 : $className$$19_state$$inline_179$$)
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
    $element$$87$$.className = $classNames$$1$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$87$$);
  return $element$$87$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$89$$) {
  $control$$5$$.$visible_$ || $goog$a11y$aria$setState$$($element$$89$$, "hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$89$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$89$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$89$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$89$$, 64, !!($control$$5$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$90$$, $allow$$) {
  var $unselectable$$inline_190_value$$inline_193$$ = !$allow$$, $descendants$$inline_192$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$90$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_190_value$$inline_193$$ = $unselectable$$inline_190_value$$inline_193$$ ? "none" : "", $element$$90$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_190_value$$inline_193$$, $descendants$$inline_192$$) {
      for(var $i$$inline_194$$ = 0, $descendant$$inline_195$$;$descendant$$inline_195$$ = $descendants$$inline_192$$[$i$$inline_194$$];$i$$inline_194$$++) {
        $descendant$$inline_195$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_190_value$$inline_193$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_190_value$$inline_193$$ = $unselectable$$inline_190_value$$inline_193$$ ? "on" : "", $element$$90$$.setAttribute("unselectable", $unselectable$$inline_190_value$$inline_193$$), $descendants$$inline_192$$) {
        for($i$$inline_194$$ = 0;$descendant$$inline_195$$ = $descendants$$inline_192$$[$i$$inline_194$$];$i$$inline_194$$++) {
          $descendant$$inline_195$$.setAttribute("unselectable", $unselectable$$inline_190_value$$inline_193$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$91$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$91$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
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
      }catch($e$$26$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$92$$, $visible$$) {
  $goog$style$showElement$$($element$$92$$, $visible$$);
  $element$$92$$ && $goog$a11y$aria$setState$$($element$$92$$, "hidden", !$visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$3$$) {
  var $element$$93$$ = $control$$8$$.$getElement$();
  if($element$$93$$) {
    var $className$$20$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$20$$ && this.$enableClassName$($control$$8$$, $className$$20$$, $enable$$3$$);
    this.$updateAriaState$($element$$93$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$94$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $goog$a11y$aria$setState$$($element$$94$$, $ariaState_state$$4$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$95$$, $content$$6$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$95$$);
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
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_198$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$2$$ = [$cssClass_extraClassNames$$1_state$$inline_198$$], $classNames$$inline_199_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_199_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_198$$ && $classNames$$2$$.push($classNames$$inline_199_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_198$$ = $control$$10$$.$state_$;
  for($classNames$$inline_199_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_198$$;) {
    var $mask$$inline_200$$ = $cssClass_extraClassNames$$1_state$$inline_198$$ & -$cssClass_extraClassNames$$1_state$$inline_198$$;
    $classNames$$inline_199_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_200$$));
    $cssClass_extraClassNames$$1_state$$inline_198$$ &= ~$mask$$inline_200$$
  }
  $classNames$$2$$.push.apply($classNames$$2$$, $classNames$$inline_199_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_198$$ = $control$$10$$.$extraClassNames_$) && $classNames$$2$$.push.apply($classNames$$2$$, $cssClass_extraClassNames$$1_state$$inline_198$$);
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
// Input 39
function $goog$ui$registry$setDecoratorByClassName$$($className$$23$$, $decoratorFn$$) {
  $className$$23$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$23$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
// Input 40
// Input 41
// Input 42
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
// Input 43
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
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$28$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$28$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$28$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$28$$.metaKey)) {
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
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$3$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$3$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$59$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$3$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$59$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$30_repeat$$.shiftKey && ($key$$59$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$59$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$30_repeat$$ = $key$$59$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$59$$;
  $be$$2_event$$3$$ = new $goog$events$KeyEvent$$($key$$59$$, $charCode$$, $e$$30_repeat$$, $be$$2_event$$3$$);
  $be$$2_event$$3$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$2_event$$3$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$98$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$98$$;
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
// Input 44
function $goog$ui$Control$$($content$$7$$, $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$, $opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$);
  if(!$JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$) {
    $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$ = this.constructor;
    for(var $key$$inline_209_rendererCtor$$inline_210$$;$JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$;) {
      $key$$inline_209_rendererCtor$$inline_210$$ = $goog$getUid$$($JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$);
      if($key$$inline_209_rendererCtor$$inline_210$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_209_rendererCtor$$inline_210$$]) {
        break
      }
      $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$ = $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$ = $key$$inline_209_rendererCtor$$inline_210$$ ? $goog$isFunction$$($key$$inline_209_rendererCtor$$inline_210$$.$getInstance$) ? $key$$inline_209_rendererCtor$$inline_210$$.$getInstance$() : new $key$$inline_209_rendererCtor$$inline_210$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$21_componentCtor$$inline_208_opt_renderer$$;
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
  var $element$$99$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$99$$;
  var $ariaRole$$inline_237$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_237$$ && $element$$99$$.setAttribute("role", $ariaRole$$inline_237$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$99$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$99$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$100$$) {
  return this.$renderer_$.$canDecorate$($element$$100$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$101$$) {
  this.$element_$ = $element$$101$$ = this.$renderer_$.$decorate$(this, $element$$101$$);
  var $ariaRole$$inline_245$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_245$$ && $element$$101$$.setAttribute("role", $ariaRole$$inline_245$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$101$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$101$$.style.display
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
  var $handler$$42$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$102$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$102$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$102$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$102$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$102$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$102$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$42$$, $element$$102$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$102$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$102$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$102$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$102$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$102$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$42$$, $element$$102$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
  var $element$$103$$ = this.$getElement$();
  $element$$103$$ && this.$renderer_$.$setRightToLeft$($element$$103$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$104$$ = this.$getElement$();
  $element$$104$$ && this.$renderer_$.$setAllowTextSelection$($element$$104$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$105$$ = this.$getElement$();
    $element$$105$$ && this.$renderer_$.$setVisible$($element$$105$$, $visible$$1$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$1$$);
    this.$visible_$ = $visible$$1$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
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
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$34$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$34$$) && $e$$34$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$35$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$35$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$36$$) {
  this.isEnabled() && this.$performActionInternal$($e$$36$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$37$$) {
  if($JSCompiler_StaticMethods_isAutoState$$(this, 16)) {
    var $actionEvent_check$$inline_251_open$$inline_257$$ = !(this.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 16, $actionEvent_check$$inline_251_open$$inline_257$$) && this.$setState$(16, $actionEvent_check$$inline_251_open$$inline_257$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 64) && ($actionEvent_check$$inline_251_open$$inline_257$$ = !(this.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_check$$inline_251_open$$inline_257$$) && this.$setState$(64, $actionEvent_check$$inline_251_open$$inline_257$$));
  $actionEvent_check$$inline_251_open$$inline_257$$ = new $goog$events$Event$$("action", this);
  $e$$37$$ && ($actionEvent_check$$inline_251_open$$inline_257$$.altKey = $e$$37$$.altKey, $actionEvent_check$$inline_251_open$$inline_257$$.ctrlKey = $e$$37$$.ctrlKey, $actionEvent_check$$inline_251_open$$inline_257$$.metaKey = $e$$37$$.metaKey, $actionEvent_check$$inline_251_open$$inline_257$$.shiftKey = $e$$37$$.shiftKey, $actionEvent_check$$inline_251_open$$inline_257$$.$platformModifierKey$ = $e$$37$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_check$$inline_251_open$$inline_257$$)
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
var $key$$inline_267$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_267$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
// Input 45
// Input 46
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$106$$, $state$$16$$, $enable$$13$$) {
  16 == $state$$16$$ ? $goog$a11y$aria$setState$$($element$$106$$, "pressed", $enable$$13$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$106$$, $state$$16$$, $enable$$13$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$107$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$77$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$77$$ && this.$setTooltip$($element$$107$$, $tooltip_value$$77$$);
  ($tooltip_value$$77$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$107$$, $tooltip_value$$77$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$107$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$107$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$108$$) {
  $element$$108$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$108$$);
  var $value$$inline_270$$ = this.$getValue$($element$$108$$);
  $button$$2$$.$value_$ = $value$$inline_270$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$108$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$108$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$108$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$109$$) {
  return $element$$109$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$110$$, $tooltip$$1$$) {
  $element$$110$$ && ($element$$110$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
// Input 47
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$111$$) {
  return"BUTTON" == $element$$111$$.tagName || "INPUT" == $element$$111$$.tagName && ("button" == $element$$111$$.type || "submit" == $element$$111$$.type || "reset" == $element$$111$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$112$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$5$$);
  $button$$5$$.$autoStates_$ &= -256;
  $JSCompiler_StaticMethods_setSupportedState$$($button$$5$$);
  $element$$112$$.disabled && $goog$dom$classes$add$$($element$$112$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$112$$)
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
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$113$$, $state$$17$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$113$$, $state$$17$$, $enable$$14$$);
  if(($button$$8_element$$113$$ = $button$$8_element$$113$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$8_element$$113$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$114$$) {
  return $element$$114$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$115$$, $value$$78$$) {
  $element$$115$$ && ($element$$115$$.value = $value$$78$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
// Input 48
function $goog$ui$Button$$($content$$11$$, $opt_renderer$$1$$, $opt_domHelper$$2$$) {
  $goog$ui$Control$$.call(this, $content$$11$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$2$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$79$$) {
  this.$value_$ = $value$$79$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$79$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$42$$) {
  return 13 == $e$$42$$.keyCode && "key" == $e$$42$$.type || 32 == $e$$42$$.keyCode && "keyup" == $e$$42$$.type ? this.$performActionInternal$($e$$42$$) : 32 == $e$$42$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
// Input 49
function $goog$Timer$callOnce$$($listener$$60$$, $opt_delay$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  2147483647 < $opt_delay$$ || $goog$global$$.setTimeout($listener$$60$$, $opt_delay$$ || 0)
}
;
// Input 50
// Input 51
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
function $goog$structs$forEach$$($col$$6$$, $f$$37$$, $opt_obj$$37$$) {
  if("function" == typeof $col$$6$$.forEach) {
    $col$$6$$.forEach($f$$37$$, $opt_obj$$37$$)
  }else {
    if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
      $goog$array$forEach$$($col$$6$$, $f$$37$$, $opt_obj$$37$$)
    }else {
      var $keys$$1_rv$$inline_280$$;
      if("function" == typeof $col$$6$$.$getKeys$) {
        $keys$$1_rv$$inline_280$$ = $col$$6$$.$getKeys$()
      }else {
        if("function" != typeof $col$$6$$.$getValues$) {
          if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
            $keys$$1_rv$$inline_280$$ = [];
            for(var $l$$inline_281_values$$5$$ = $col$$6$$.length, $i$$inline_282_l$$14$$ = 0;$i$$inline_282_l$$14$$ < $l$$inline_281_values$$5$$;$i$$inline_282_l$$14$$++) {
              $keys$$1_rv$$inline_280$$.push($i$$inline_282_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_280$$ = $goog$object$getKeys$$($col$$6$$)
          }
        }else {
          $keys$$1_rv$$inline_280$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_281_values$$5$$ = $goog$structs$getValues$$($col$$6$$), $i$$inline_282_l$$14$$ = $l$$inline_281_values$$5$$.length, $i$$87$$ = 0;$i$$87$$ < $i$$inline_282_l$$14$$;$i$$87$$++) {
        $f$$37$$.call($opt_obj$$37$$, $l$$inline_281_values$$5$$[$i$$87$$], $keys$$1_rv$$inline_280$$ && $keys$$1_rv$$inline_280$$[$i$$87$$], $col$$6$$)
      }
    }
  }
}
;
// Input 52
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
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($key$$64$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$64$$) ? (delete this.$map_$[$key$$64$$], this.$count_$--, this.$version_$++, this.$keys_$.length > 2 * this.$count_$ && $JSCompiler_StaticMethods_cleanupKeysArray_$$(this), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$) {
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      var $key$$65$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$];
      $goog$structs$Map$hasKey_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$map_$, $key$$65$$) && ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$65$$);
      $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $seen$$2$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      $key$$65$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$], $goog$structs$Map$hasKey_$$($seen$$2$$, $key$$65$$) || ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$65$$, $seen$$2$$[$key$$65$$] = 1), $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
}
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($key$$66$$, $opt_val$$1$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$66$$) ? this.$map_$[$key$$66$$] : $opt_val$$1$$
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$67$$, $value$$81$$) {
  $goog$structs$Map$hasKey_$$(this.$map_$, $key$$67$$) || (this.$count_$++, this.$keys_$.push($key$$67$$), this.$version_$++);
  this.$map_$[$key$$67$$] = $value$$81$$
};
$JSCompiler_prototypeAlias$$.$addAll$ = function $$JSCompiler_prototypeAlias$$$$addAll$$($map$$7_values$$10$$) {
  var $keys$$6$$;
  $map$$7_values$$10$$ instanceof $goog$structs$Map$$ ? ($keys$$6$$ = $map$$7_values$$10$$.$getKeys$(), $map$$7_values$$10$$ = $map$$7_values$$10$$.$getValues$()) : ($keys$$6$$ = $goog$object$getKeys$$($map$$7_values$$10$$), $map$$7_values$$10$$ = $goog$object$getValues$$($map$$7_values$$10$$));
  for(var $i$$96$$ = 0;$i$$96$$ < $keys$$6$$.length;$i$$96$$++) {
    this.set($keys$$6$$[$i$$96$$], $map$$7_values$$10$$[$i$$96$$])
  }
};
function $goog$structs$Map$hasKey_$$($obj$$92$$, $key$$71$$) {
  return Object.prototype.hasOwnProperty.call($obj$$92$$, $key$$71$$)
}
;
// Input 53
function $bitex$model$Model$$($element$$116$$, $opt_map$$1$$, $var_args$$76$$) {
  this.$element_$ = $element$$116$$;
  this.$map_$ = new $goog$structs$Map$$($opt_map$$1$$, $var_args$$76$$)
}
$goog$inherits$$($bitex$model$Model$$, $goog$events$EventTarget$$);
$bitex$model$Model$$.prototype.get = function $$bitex$model$Model$$$$get$($key$$72$$, $opt_val$$2$$) {
  return this.$map_$.get($key$$72$$, $opt_val$$2$$)
};
$bitex$model$Model$$.prototype.set = function $$bitex$model$Model$$$$set$($key$$73$$, $value$$83$$) {
  this.$map_$.set($key$$73$$, $value$$83$$);
  var $elements$$1$$ = $goog$dom$getElementsByClass$$(this.$element_$);
  $goog$array$forEach$$($elements$$1$$, function($el$$30$$) {
    if($el$$30$$.getAttribute("data-model-key") === $key$$73$$ && $goog$dom$getTextContent$$($el$$30$$) !== $value$$83$$) {
      $goog$dom$setTextContent$$($el$$30$$, $value$$83$$);
      var $blink_class$$ = $el$$30$$.getAttribute("data-blink-class");
      if($blink_class$$ != $JSCompiler_alias_NULL$$) {
        var $blink_delay$$ = $el$$30$$.getAttribute("data-blink-delay") || 700, $blink_delay$$ = parseInt($blink_delay$$, 10);
        $goog$dom$classes$add$$($el$$30$$, $blink_class$$);
        $goog$Timer$callOnce$$(function() {
          $goog$dom$classes$remove$$($el$$30$$, $blink_class$$)
        }, $blink_delay$$, this)
      }
    }
  });
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set" + $key$$73$$, $key$$73$$, $value$$83$$));
  this.dispatchEvent(new $bitex$model$ModelEvent$$("model_set", $key$$73$$, $value$$83$$))
};
function $bitex$model$ModelEvent$$($type$$91$$, $key$$74$$, $data$$32$$) {
  $goog$events$Event$$.call(this, $type$$91$$);
  this.key = $key$$74$$;
  this.data = $data$$32$$
}
$goog$inherits$$($bitex$model$ModelEvent$$, $goog$events$Event$$);
// Input 54
var $goog$i18n$NumberFormatSymbols_en$$ = {$DECIMAL_SEP$:".", $GROUP_SEP$:",", $PERCENT$:"%", $ZERO_DIGIT$:"0", $PLUS_SIGN$:"+", $MINUS_SIGN$:"-", $EXP_SYMBOL$:"E", $PERMILL$:"\u2030", $INFINITY$:"\u221e", $NAN$:"NaN", $DECIMAL_PATTERN$:"#,##0.###", $SCIENTIFIC_PATTERN$:"#E0", $PERCENT_PATTERN$:"#,##0%", $CURRENCY_PATTERN$:"\u00a4#,##0.00;(\u00a4#,##0.00)", $DEF_CURRENCY_CODE$:"USD"}, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$, $goog$i18n$NumberFormatSymbols$$ = $goog$i18n$NumberFormatSymbols_en$$;
// Input 55
var $goog$i18n$currency$CurrencyInfo$$ = {AED:[2, "dh", "\u062f.\u0625.", "DH"], AUD:[2, "$", "AU$"], BDT:[2, "\u09f3", "Tk"], BRL:[2, "R$", "R$"], CAD:[2, "$", "C$"], CHF:[2, "CHF", "CHF"], CLP:[0, "$", "CL$"], CNY:[2, "\u00a5", "RMB\u00a5"], COP:[0, "$", "COL$"], CRC:[0, "\u20a1", "CR\u20a1"], CZK:[2, "K\u010d", "K\u010d"], DKK:[18, "kr", "kr"], DOP:[2, "$", "RD$"], EGP:[2, "\u00a3", "LE"], EUR:[18, "\u20ac", "\u20ac"], GBP:[2, "\u00a3", "GB\u00a3"], HKD:[2, "$", "HK$"], ILS:[2, "\u20aa", "IL\u20aa"], 
INR:[2, "\u20b9", "Rs"], ISK:[0, "kr", "kr"], JMD:[2, "$", "JA$"], JPY:[0, "\u00a5", "JP\u00a5"], KRW:[0, "\u20a9", "KR\u20a9"], LKR:[2, "Rs", "SLRs"], MNT:[0, "\u20ae", "MN\u20ae"], MXN:[2, "$", "Mex$"], MYR:[2, "RM", "RM"], NOK:[18, "kr", "NOkr"], PAB:[2, "B/.", "B/."], PEN:[2, "S/.", "S/."], PHP:[2, "\u20b1", "Php"], PKR:[0, "Rs", "PKRs."], RUB:[42, "\u0440\u0443\u0431.", "\u0440\u0443\u0431."], SAR:[2, "Rial", "Rial"], SEK:[2, "kr", "kr"], SGD:[2, "$", "S$"], THB:[2, "\u0e3f", "THB"], TRY:[2, 
"TL", "YTL"], TWD:[2, "NT$", "NT$"], USD:[2, "$", "US$"], UYU:[2, "$", "UY$"], VND:[0, "\u20ab", "VN\u20ab"], YER:[0, "Rial", "Rial"], ZAR:[2, "R", "ZAR"]};
// Input 56
function $goog$i18n$NumberFormat$$($JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$, $opt_currency_strParts$$inline_474$$, $opt_currencyStyle_precision$$inline_475$$) {
  this.$intlCurrencyCode_$ = $opt_currency_strParts$$inline_474$$ || $goog$i18n$NumberFormatSymbols$$.$DEF_CURRENCY_CODE$;
  this.$currencyStyle_$ = $opt_currencyStyle_precision$$inline_475$$ || $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$;
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
  if("number" == typeof $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$) {
    switch($JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$) {
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
        $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$ = $goog$i18n$NumberFormatSymbols$$.$CURRENCY_PATTERN$;
        $opt_currency_strParts$$inline_474$$ = ["0"];
        $opt_currencyStyle_precision$$inline_475$$ = $goog$i18n$currency$CurrencyInfo$$[this.$intlCurrencyCode_$][0] & 7;
        if(0 < $opt_currencyStyle_precision$$inline_475$$) {
          $opt_currency_strParts$$inline_474$$.push(".");
          for(var $i$$inline_476$$ = 0;$i$$inline_476$$ < $opt_currencyStyle_precision$$inline_475$$;$i$$inline_476$$++) {
            $opt_currency_strParts$$inline_474$$.push("0")
          }
        }
        $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$ = $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$.replace(/0.00/g, $opt_currency_strParts$$inline_474$$.join(""));
        $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$);
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("Unsupported pattern type."))
    }
  }else {
    $JSCompiler_StaticMethods_applyPattern_$$(this, $JSCompiler_inline_result$$433_pattern$$2_pattern$$inline_473$$)
  }
}
var $goog$i18n$NumberFormat$CurrencyStyle$LOCAL$$ = 0;
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$) {
  $JSCompiler_StaticMethods_applyPattern_$self$$.$pattern_$ = $pattern$$3$$.replace(/ /g, "\u00a0");
  var $pos$$5$$ = [0];
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$);
  for(var $trunkLen_trunkStart$$ = $pos$$5$$[0], $decimalPos$$inline_290$$ = -1, $digitLeftCount$$inline_291$$ = 0, $n$$inline_297_zeroDigitCount$$inline_292$$ = 0, $digitRightCount$$inline_293_totalDigits$$inline_298$$ = 0, $groupingCount$$inline_294$$ = -1, $len$$inline_295$$ = $pattern$$3$$.length, $loop$$inline_296$$ = $JSCompiler_alias_TRUE$$;$pos$$5$$[0] < $len$$inline_295$$ && $loop$$inline_296$$;$pos$$5$$[0]++) {
    switch($pattern$$3$$.charAt($pos$$5$$[0])) {
      case "#":
        0 < $n$$inline_297_zeroDigitCount$$inline_292$$ ? $digitRightCount$$inline_293_totalDigits$$inline_298$$++ : $digitLeftCount$$inline_291$$++;
        0 <= $groupingCount$$inline_294$$ && 0 > $decimalPos$$inline_290$$ && $groupingCount$$inline_294$$++;
        break;
      case "0":
        0 < $digitRightCount$$inline_293_totalDigits$$inline_298$$ && $JSCompiler_alias_THROW$$(Error('Unexpected "0" in pattern "' + $pattern$$3$$ + '"'));
        $n$$inline_297_zeroDigitCount$$inline_292$$++;
        0 <= $groupingCount$$inline_294$$ && 0 > $decimalPos$$inline_290$$ && $groupingCount$$inline_294$$++;
        break;
      case ",":
        $groupingCount$$inline_294$$ = 0;
        break;
      case ".":
        0 <= $decimalPos$$inline_290$$ && $JSCompiler_alias_THROW$$(Error('Multiple decimal separators in pattern "' + $pattern$$3$$ + '"'));
        $decimalPos$$inline_290$$ = $digitLeftCount$$inline_291$$ + $n$$inline_297_zeroDigitCount$$inline_292$$ + $digitRightCount$$inline_293_totalDigits$$inline_298$$;
        break;
      case "E":
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && $JSCompiler_alias_THROW$$(Error('Multiple exponential symbols in pattern "' + $pattern$$3$$ + '"'));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ = $JSCompiler_alias_TRUE$$;
        $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$ = 0;
        $pos$$5$$[0] + 1 < $len$$inline_295$$ && "+" == $pattern$$3$$.charAt($pos$$5$$[0] + 1) && ($pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$useSignForPositiveExponent_$ = $JSCompiler_alias_TRUE$$);
        for(;$pos$$5$$[0] + 1 < $len$$inline_295$$ && "0" == $pattern$$3$$.charAt($pos$$5$$[0] + 1);) {
          $pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$++
        }
        (1 > $digitLeftCount$$inline_291$$ + $n$$inline_297_zeroDigitCount$$inline_292$$ || 1 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minExponentDigits_$) && $JSCompiler_alias_THROW$$(Error('Malformed exponential pattern "' + $pattern$$3$$ + '"'));
        $loop$$inline_296$$ = $JSCompiler_alias_FALSE$$;
        break;
      default:
        $pos$$5$$[0]--, $loop$$inline_296$$ = $JSCompiler_alias_FALSE$$
    }
  }
  0 == $n$$inline_297_zeroDigitCount$$inline_292$$ && (0 < $digitLeftCount$$inline_291$$ && 0 <= $decimalPos$$inline_290$$) && ($n$$inline_297_zeroDigitCount$$inline_292$$ = $decimalPos$$inline_290$$, 0 == $n$$inline_297_zeroDigitCount$$inline_292$$ && $n$$inline_297_zeroDigitCount$$inline_292$$++, $digitRightCount$$inline_293_totalDigits$$inline_298$$ = $digitLeftCount$$inline_291$$ - $n$$inline_297_zeroDigitCount$$inline_292$$, $digitLeftCount$$inline_291$$ = $n$$inline_297_zeroDigitCount$$inline_292$$ - 
  1, $n$$inline_297_zeroDigitCount$$inline_292$$ = 1);
  (0 > $decimalPos$$inline_290$$ && 0 < $digitRightCount$$inline_293_totalDigits$$inline_298$$ || 0 <= $decimalPos$$inline_290$$ && ($decimalPos$$inline_290$$ < $digitLeftCount$$inline_291$$ || $decimalPos$$inline_290$$ > $digitLeftCount$$inline_291$$ + $n$$inline_297_zeroDigitCount$$inline_292$$) || 0 == $groupingCount$$inline_294$$) && $JSCompiler_alias_THROW$$(Error('Malformed pattern "' + $pattern$$3$$ + '"'));
  $digitRightCount$$inline_293_totalDigits$$inline_298$$ = $digitLeftCount$$inline_291$$ + $n$$inline_297_zeroDigitCount$$inline_292$$ + $digitRightCount$$inline_293_totalDigits$$inline_298$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ = 0 <= $decimalPos$$inline_290$$ ? $digitRightCount$$inline_293_totalDigits$$inline_298$$ - $decimalPos$$inline_290$$ : 0;
  0 <= $decimalPos$$inline_290$$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = $digitLeftCount$$inline_291$$ + $n$$inline_297_zeroDigitCount$$inline_292$$ - $decimalPos$$inline_290$$, 0 > $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumFractionDigits_$ = 0));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = (0 <= $decimalPos$$inline_290$$ ? $decimalPos$$inline_290$$ : $digitRightCount$$inline_293_totalDigits$$inline_298$$) - $digitLeftCount$$inline_291$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$useExponentialNotation_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$maximumIntegerDigits_$ = $digitLeftCount$$inline_291$$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$, 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$maximumFractionDigits_$ && 0 == $JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ && ($JSCompiler_StaticMethods_applyPattern_$self$$.$minimumIntegerDigits_$ = 1));
  $JSCompiler_StaticMethods_applyPattern_$self$$.$groupingSize_$ = Math.max(0, $groupingCount$$inline_294$$);
  $JSCompiler_StaticMethods_applyPattern_$self$$.$decimalSeparatorAlwaysShown_$ = 0 == $decimalPos$$inline_290$$ || $decimalPos$$inline_290$$ == $digitRightCount$$inline_293_totalDigits$$inline_298$$;
  $trunkLen_trunkStart$$ = $pos$$5$$[0] - $trunkLen_trunkStart$$;
  $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$);
  $pos$$5$$[0] < $pattern$$3$$.length && $pattern$$3$$.charAt($pos$$5$$[0]) == $goog$i18n$NumberFormat$PATTERN_SEPARATOR_$$ ? ($pos$$5$$[0]++, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$3$$, $pos$$5$$), $pos$$5$$[0] += $trunkLen_trunkStart$$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ = $JSCompiler_StaticMethods_parseAffix_$$($JSCompiler_StaticMethods_applyPattern_$self$$, 
  $pattern$$3$$, $pos$$5$$)) : ($JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$ = $JSCompiler_StaticMethods_applyPattern_$self$$.$positivePrefix_$ + $JSCompiler_StaticMethods_applyPattern_$self$$.$negativePrefix_$, $JSCompiler_StaticMethods_applyPattern_$self$$.$negativeSuffix_$ += $JSCompiler_StaticMethods_applyPattern_$self$$.$positiveSuffix_$)
}
$goog$i18n$NumberFormat$$.prototype.parse = function $$goog$i18n$NumberFormat$$$$parse$($text$$9$$, $opt_pos$$) {
  var $pos$$6$$ = $opt_pos$$ || [0], $ret$$2_text$$inline_301$$ = NaN;
  $text$$9$$ = $text$$9$$.replace(/ /g, "\u00a0");
  var $gotPositive$$ = $text$$9$$.indexOf(this.$positivePrefix_$, $pos$$6$$[0]) == $pos$$6$$[0], $gotNegative$$ = $text$$9$$.indexOf(this.$negativePrefix_$, $pos$$6$$[0]) == $pos$$6$$[0];
  $gotPositive$$ && $gotNegative$$ && (this.$positivePrefix_$.length > this.$negativePrefix_$.length ? $gotNegative$$ = $JSCompiler_alias_FALSE$$ : this.$positivePrefix_$.length < this.$negativePrefix_$.length && ($gotPositive$$ = $JSCompiler_alias_FALSE$$));
  $gotPositive$$ ? $pos$$6$$[0] += this.$positivePrefix_$.length : $gotNegative$$ && ($pos$$6$$[0] += this.$negativePrefix_$.length);
  if($text$$9$$.indexOf($goog$i18n$NumberFormatSymbols$$.$INFINITY$, $pos$$6$$[0]) == $pos$$6$$[0]) {
    $pos$$6$$[0] += $goog$i18n$NumberFormatSymbols$$.$INFINITY$.length, $ret$$2_text$$inline_301$$ = Infinity
  }else {
    for(var $ret$$2_text$$inline_301$$ = $text$$9$$, $sawDecimal$$inline_303$$ = $JSCompiler_alias_FALSE$$, $sawExponent$$inline_304$$ = $JSCompiler_alias_FALSE$$, $sawDigit$$inline_305$$ = $JSCompiler_alias_FALSE$$, $scale$$inline_306$$ = 1, $decimal$$inline_307$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$inline_308$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $exponentChar$$inline_309$$ = $goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$, $normalizedText$$inline_310$$ = "";$pos$$6$$[0] < 
    $ret$$2_text$$inline_301$$.length;$pos$$6$$[0]++) {
      var $ch$$inline_311$$ = $ret$$2_text$$inline_301$$.charAt($pos$$6$$[0]), $digit$$inline_312$$ = $JSCompiler_StaticMethods_getDigit_$$($ch$$inline_311$$);
      if(0 <= $digit$$inline_312$$ && 9 >= $digit$$inline_312$$) {
        $normalizedText$$inline_310$$ += $digit$$inline_312$$, $sawDigit$$inline_305$$ = $JSCompiler_alias_TRUE$$
      }else {
        if($ch$$inline_311$$ == $decimal$$inline_307$$.charAt(0)) {
          if($sawDecimal$$inline_303$$ || $sawExponent$$inline_304$$) {
            break
          }
          $normalizedText$$inline_310$$ += ".";
          $sawDecimal$$inline_303$$ = $JSCompiler_alias_TRUE$$
        }else {
          if($ch$$inline_311$$ == $grouping$$inline_308$$.charAt(0) && ("\u00a0" != $grouping$$inline_308$$.charAt(0) || $pos$$6$$[0] + 1 < $ret$$2_text$$inline_301$$.length && 0 <= $JSCompiler_StaticMethods_getDigit_$$($ret$$2_text$$inline_301$$.charAt($pos$$6$$[0] + 1)))) {
            if($sawDecimal$$inline_303$$ || $sawExponent$$inline_304$$) {
              break
            }
          }else {
            if($ch$$inline_311$$ == $exponentChar$$inline_309$$.charAt(0)) {
              if($sawExponent$$inline_304$$) {
                break
              }
              $normalizedText$$inline_310$$ += "E";
              $sawExponent$$inline_304$$ = $JSCompiler_alias_TRUE$$
            }else {
              if("+" == $ch$$inline_311$$ || "-" == $ch$$inline_311$$) {
                $normalizedText$$inline_310$$ += $ch$$inline_311$$
              }else {
                if($ch$$inline_311$$ == $goog$i18n$NumberFormatSymbols$$.$PERCENT$.charAt(0)) {
                  if(1 != $scale$$inline_306$$) {
                    break
                  }
                  $scale$$inline_306$$ = 100;
                  if($sawDigit$$inline_305$$) {
                    $pos$$6$$[0]++;
                    break
                  }
                }else {
                  if($ch$$inline_311$$ == $goog$i18n$NumberFormatSymbols$$.$PERMILL$.charAt(0)) {
                    if(1 != $scale$$inline_306$$) {
                      break
                    }
                    $scale$$inline_306$$ = 1E3;
                    if($sawDigit$$inline_305$$) {
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
    $ret$$2_text$$inline_301$$ = parseFloat($normalizedText$$inline_310$$) / $scale$$inline_306$$
  }
  if($gotPositive$$) {
    if($text$$9$$.indexOf(this.$positiveSuffix_$, $pos$$6$$[0]) != $pos$$6$$[0]) {
      return NaN
    }
    $pos$$6$$[0] += this.$positiveSuffix_$.length
  }else {
    if($gotNegative$$) {
      if($text$$9$$.indexOf(this.$negativeSuffix_$, $pos$$6$$[0]) != $pos$$6$$[0]) {
        return NaN
      }
      $pos$$6$$[0] += this.$negativeSuffix_$.length
    }
  }
  return $gotNegative$$ ? -$ret$$2_text$$inline_301$$ : $ret$$2_text$$inline_301$$
};
$goog$i18n$NumberFormat$$.prototype.$format$ = function $$goog$i18n$NumberFormat$$$$$format$$($number_number$$inline_315$$) {
  if(isNaN($number_number$$inline_315$$)) {
    return $goog$i18n$NumberFormatSymbols$$.$NAN$
  }
  var $parts$$3$$ = [], $isNegative$$ = 0 > $number_number$$inline_315$$ || 0 == $number_number$$inline_315$$ && 0 > 1 / $number_number$$inline_315$$;
  $parts$$3$$.push($isNegative$$ ? this.$negativePrefix_$ : this.$positivePrefix_$);
  if(isFinite($number_number$$inline_315$$)) {
    if($number_number$$inline_315$$ = $number_number$$inline_315$$ * ($isNegative$$ ? -1 : 1) * this.$multiplier_$, this.$useExponentialNotation_$) {
      if(0 == $number_number$$inline_315$$) {
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_315$$, this.$minimumIntegerDigits_$, $parts$$3$$), $JSCompiler_StaticMethods_addExponentPart_$$(this, 0, $parts$$3$$)
      }else {
        var $exponent$$inline_317$$ = Math.floor(Math.log($number_number$$inline_315$$) / Math.log(10));
        $number_number$$inline_315$$ /= Math.pow(10, $exponent$$inline_317$$);
        var $minIntDigits$$inline_318$$ = this.$minimumIntegerDigits_$;
        if(1 < this.$maximumIntegerDigits_$ && this.$maximumIntegerDigits_$ > this.$minimumIntegerDigits_$) {
          for(;0 != $exponent$$inline_317$$ % this.$maximumIntegerDigits_$;) {
            $number_number$$inline_315$$ *= 10, $exponent$$inline_317$$--
          }
          $minIntDigits$$inline_318$$ = 1
        }else {
          1 > this.$minimumIntegerDigits_$ ? ($exponent$$inline_317$$++, $number_number$$inline_315$$ /= 10) : ($exponent$$inline_317$$ -= this.$minimumIntegerDigits_$ - 1, $number_number$$inline_315$$ *= Math.pow(10, this.$minimumIntegerDigits_$ - 1))
        }
        $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_315$$, $minIntDigits$$inline_318$$, $parts$$3$$);
        $JSCompiler_StaticMethods_addExponentPart_$$(this, $exponent$$inline_317$$, $parts$$3$$)
      }
    }else {
      $JSCompiler_StaticMethods_subformatFixed_$$(this, $number_number$$inline_315$$, this.$minimumIntegerDigits_$, $parts$$3$$)
    }
  }else {
    $parts$$3$$.push($goog$i18n$NumberFormatSymbols$$.$INFINITY$)
  }
  $parts$$3$$.push($isNegative$$ ? this.$negativeSuffix_$ : this.$positiveSuffix_$);
  return $parts$$3$$.join("")
};
function $JSCompiler_StaticMethods_subformatFixed_$$($JSCompiler_StaticMethods_subformatFixed_$self$$, $i$$102_intValue_number$$1$$, $fracPart_minIntDigits$$, $parts$$4$$) {
  var $fracLen_power$$ = Math.pow(10, $JSCompiler_StaticMethods_subformatFixed_$self$$.$maximumFractionDigits_$), $shiftedNumber_translatableInt_zeroCode$$ = Math.round($i$$102_intValue_number$$1$$ * $fracLen_power$$), $fracValue$$;
  isFinite($shiftedNumber_translatableInt_zeroCode$$) ? ($i$$102_intValue_number$$1$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ / $fracLen_power$$), $fracValue$$ = Math.floor($shiftedNumber_translatableInt_zeroCode$$ - $i$$102_intValue_number$$1$$ * $fracLen_power$$)) : $fracValue$$ = 0;
  for(var $fractionPresent$$ = 0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ || 0 < $fracValue$$, $intPart$$ = "", $shiftedNumber_translatableInt_zeroCode$$ = $i$$102_intValue_number$$1$$;1E20 < $shiftedNumber_translatableInt_zeroCode$$;) {
    $intPart$$ = "0" + $intPart$$, $shiftedNumber_translatableInt_zeroCode$$ = Math.round($shiftedNumber_translatableInt_zeroCode$$ / 10)
  }
  var $intPart$$ = $shiftedNumber_translatableInt_zeroCode$$ + $intPart$$, $decimal$$1$$ = $goog$i18n$NumberFormatSymbols$$.$DECIMAL_SEP$, $grouping$$1$$ = $goog$i18n$NumberFormatSymbols$$.$GROUP_SEP$, $shiftedNumber_translatableInt_zeroCode$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$.charCodeAt(0), $digitLen$$ = $intPart$$.length;
  if(0 < $i$$102_intValue_number$$1$$ || 0 < $fracPart_minIntDigits$$) {
    for($i$$102_intValue_number$$1$$ = $digitLen$$;$i$$102_intValue_number$$1$$ < $fracPart_minIntDigits$$;$i$$102_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
    }
    for($i$$102_intValue_number$$1$$ = 0;$i$$102_intValue_number$$1$$ < $digitLen$$;$i$$102_intValue_number$$1$$++) {
      $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $intPart$$.charAt($i$$102_intValue_number$$1$$))), 1 < $digitLen$$ - $i$$102_intValue_number$$1$$ && (0 < $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$ && 1 == ($digitLen$$ - $i$$102_intValue_number$$1$$) % $JSCompiler_StaticMethods_subformatFixed_$self$$.$groupingSize_$) && $parts$$4$$.push($grouping$$1$$)
    }
  }else {
    $fractionPresent$$ || $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$))
  }
  ($JSCompiler_StaticMethods_subformatFixed_$self$$.$decimalSeparatorAlwaysShown_$ || $fractionPresent$$) && $parts$$4$$.push($decimal$$1$$);
  $fracPart_minIntDigits$$ = "" + ($fracValue$$ + $fracLen_power$$);
  for($fracLen_power$$ = $fracPart_minIntDigits$$.length;"0" == $fracPart_minIntDigits$$.charAt($fracLen_power$$ - 1) && $fracLen_power$$ > $JSCompiler_StaticMethods_subformatFixed_$self$$.$minimumFractionDigits_$ + 1;) {
    $fracLen_power$$--
  }
  for($i$$102_intValue_number$$1$$ = 1;$i$$102_intValue_number$$1$$ < $fracLen_power$$;$i$$102_intValue_number$$1$$++) {
    $parts$$4$$.push(String.fromCharCode($shiftedNumber_translatableInt_zeroCode$$ + 1 * $fracPart_minIntDigits$$.charAt($i$$102_intValue_number$$1$$)))
  }
}
function $JSCompiler_StaticMethods_addExponentPart_$$($JSCompiler_StaticMethods_addExponentPart_$self$$, $exponent_exponentDigits$$, $parts$$5$$) {
  $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$EXP_SYMBOL$);
  0 > $exponent_exponentDigits$$ ? ($exponent_exponentDigits$$ = -$exponent_exponentDigits$$, $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$MINUS_SIGN$)) : $JSCompiler_StaticMethods_addExponentPart_$self$$.$useSignForPositiveExponent_$ && $parts$$5$$.push($goog$i18n$NumberFormatSymbols$$.$PLUS_SIGN$);
  $exponent_exponentDigits$$ = "" + $exponent_exponentDigits$$;
  for(var $zeroChar$$ = $goog$i18n$NumberFormatSymbols$$.$ZERO_DIGIT$, $i$$103$$ = $exponent_exponentDigits$$.length;$i$$103$$ < $JSCompiler_StaticMethods_addExponentPart_$self$$.$minExponentDigits_$;$i$$103$$++) {
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
    var $ch$$5_currencyCode$$inline_320$$ = $pattern$$4$$.charAt($pos$$8$$[0]);
    if("'" == $ch$$5_currencyCode$$inline_320$$) {
      $pos$$8$$[0] + 1 < $len$$3$$ && "'" == $pattern$$4$$.charAt($pos$$8$$[0] + 1) ? ($pos$$8$$[0]++, $affix$$ += "'") : $inQuote$$ = !$inQuote$$
    }else {
      if($inQuote$$) {
        $affix$$ += $ch$$5_currencyCode$$inline_320$$
      }else {
        switch($ch$$5_currencyCode$$inline_320$$) {
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
                  var $ch$$5_currencyCode$$inline_320$$ = $JSCompiler_StaticMethods_parseAffix_$self$$.$intlCurrencyCode_$, $info$$inline_321$$ = $goog$i18n$currency$CurrencyInfo$$[$ch$$5_currencyCode$$inline_320$$], $affix$$ = $affix$$ + ($ch$$5_currencyCode$$inline_320$$ == $info$$inline_321$$[1] ? $ch$$5_currencyCode$$inline_320$$ : $ch$$5_currencyCode$$inline_320$$ + " " + $info$$inline_321$$[1]);
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
            $affix$$ += $ch$$5_currencyCode$$inline_320$$
        }
      }
    }
  }
  return $affix$$
}
;
// Input 57
function $bitex$ui$OrderBook$$($username$$, $side$$, $qtyCurrencyDef$$, $priceCurrencyDef$$, $opt_blinkDelay$$, $opt_domHelper$$3$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$3$$);
  this.$blink_delay_$ = $opt_blinkDelay$$ || 700;
  this.$qtyCurrencyDef_$ = $qtyCurrencyDef$$;
  this.$priceCurrencyDef_$ = $priceCurrencyDef$$;
  this.$username_$ = $username$$;
  this.$side_$ = $side$$
}
$goog$inherits$$($bitex$ui$OrderBook$$, $goog$ui$Component$$);
$bitex$ui$OrderBook$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("order-book");
$bitex$ui$OrderBook$$.prototype.$decorateInternal$ = function $$bitex$ui$OrderBook$$$$$decorateInternal$$($element$$117$$) {
  this.$element_$ = $element$$117$$;
  this.$bodyEl_$ = $JSCompiler_StaticMethods_getElementsByTagNameAndClass$$(this.$getDomHelper$(), $element$$117$$)[0]
};
$bitex$ui$OrderBook$$.prototype.$enterDocument$ = function $$bitex$ui$OrderBook$$$$$enterDocument$$() {
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$)
};
$bitex$ui$OrderBook$$.prototype.$onClick_$ = function $$bitex$ui$OrderBook$$$$$onClick_$$($e$$45$$) {
  var $cxlEl_orderId$$ = $e$$45$$.target;
  if("A" == $cxlEl_orderId$$.tagName || "I" == $cxlEl_orderId$$.tagName) {
    $cxlEl_orderId$$ = $cxlEl_orderId$$.getAttribute("data-order-id"), $cxlEl_orderId$$ != $JSCompiler_alias_NULL$$ && (this.dispatchEvent(new $bitex$ui$OrderBookEvent$$("cancel", $cxlEl_orderId$$)), $e$$45$$.preventDefault(), $e$$45$$.stopPropagation())
  }
};
function $bitex$ui$OrderBookEvent$$($type$$92$$, $orderId$$1$$) {
  $goog$events$Event$$.call(this, $type$$92$$);
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
  var $dom$$4$$ = $JSCompiler_StaticMethods_deleteOrder$self$$.$getDomHelper$(), $trEl$$ = $JSCompiler_StaticMethods_getChildren$$($JSCompiler_StaticMethods_deleteOrder$self$$.$bodyEl_$)[$index$$62$$];
  $dom$$4$$.removeNode($trEl$$)
}
function $JSCompiler_StaticMethods_updateOrder$$($JSCompiler_StaticMethods_updateOrder$self$$, $index$$63_trEl$$1$$, $qty$$) {
  var $dom$$5$$ = $JSCompiler_StaticMethods_updateOrder$self$$.$getDomHelper$();
  $qty$$ = (new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.$format$, $JSCompiler_StaticMethods_updateOrder$self$$.$qtyCurrencyDef_$.code)).$format$($qty$$);
  $index$$63_trEl$$1$$ = $JSCompiler_StaticMethods_getChildren$$($JSCompiler_StaticMethods_updateOrder$self$$.$bodyEl_$)[$index$$63_trEl$$1$$];
  var $tdQtyEl$$ = $JSCompiler_StaticMethods_getChildren$$($index$$63_trEl$$1$$)[1];
  $dom$$5$$.$setTextContent$($tdQtyEl$$, $qty$$);
  $goog$dom$classes$add$$($tdQtyEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($tdQtyEl$$, "warning")
  }, $JSCompiler_StaticMethods_updateOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_updateOrder$self$$)
}
function $JSCompiler_StaticMethods_insertOrder$$($JSCompiler_StaticMethods_insertOrder$self$$, $index$$64$$, $id$$8$$, $price_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$, $broker$$) {
  var $dom$$6$$ = $JSCompiler_StaticMethods_insertOrder$self$$.$getDomHelper$(), $formatter$$1$$ = new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_insertOrder$self$$.$qtyCurrencyDef_$.$format$, $JSCompiler_StaticMethods_insertOrder$self$$.$qtyCurrencyDef_$.code);
  $qty$$1_qtyEl$$ = $formatter$$1$$.$format$($qty$$1_qtyEl$$);
  $formatter$$1$$ = new $goog$i18n$NumberFormat$$($JSCompiler_StaticMethods_insertOrder$self$$.$priceCurrencyDef_$.$format$, $JSCompiler_StaticMethods_insertOrder$self$$.$priceCurrencyDef_$.code);
  $price_priceEl$$ = $formatter$$1$$.$format$($price_priceEl$$);
  $price_priceEl$$ = $dom$$6$$.$createDom$("td", $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-price", $price_priceEl$$);
  $qty$$1_qtyEl$$ = $dom$$6$$.$createDom$("td", $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-qty", $qty$$1_qtyEl$$);
  $td_list_userNameEl_username$$1$$ = $td_list_userNameEl_username$$1$$ === $JSCompiler_StaticMethods_insertOrder$self$$.$username_$ || $broker$$ === $JSCompiler_StaticMethods_insertOrder$self$$.$username_$ ? $dom$$6$$.$createDom$("td", $JSCompiler_alias_VOID$$, $dom$$6$$.$createDom$("a", {"class":"btn-cancel-order text-error", href:"", "data-order-id":$id$$8$$}, $dom$$6$$.$createDom$("i", {"class":"icon-remove", style:"line-height: 2px;", "data-order-id":$id$$8$$}, "  " + $td_list_userNameEl_username$$1$$))) : 
  $dom$$6$$.$createDom$("td", $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-username", $td_list_userNameEl_username$$1$$);
  "0" == $JSCompiler_StaticMethods_insertOrder$self$$.$side_$ ? ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-left"), $goog$dom$classes$add$$($price_priceEl$$, $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-right"), $td_list_userNameEl_username$$1$$ = [$td_list_userNameEl_username$$1$$, $qty$$1_qtyEl$$, $price_priceEl$$]) : ($goog$dom$classes$add$$($td_list_userNameEl_username$$1$$, $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + 
  "-right"), $goog$dom$classes$add$$($price_priceEl$$, $JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-left"), $td_list_userNameEl_username$$1$$ = [$price_priceEl$$, $qty$$1_qtyEl$$, $td_list_userNameEl_username$$1$$]);
  var $rowEl$$ = $dom$$6$$.$createDom$("tr", {"data-order-id":$id$$8$$, "class":$JSCompiler_StaticMethods_insertOrder$self$$.$getBaseCssClass$() + "-row"}, $td_list_userNameEl_username$$1$$);
  $JSCompiler_StaticMethods_insertChildAt$$($JSCompiler_StaticMethods_insertOrder$self$$.$bodyEl_$, $rowEl$$, $index$$64$$);
  $goog$dom$classes$add$$($rowEl$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$, "warning")
  }, $JSCompiler_StaticMethods_insertOrder$self$$.$blink_delay_$, $JSCompiler_StaticMethods_insertOrder$self$$)
}
;
// Input 58
// Input 59
function $goog$structs$Set$$($opt_values$$1$$) {
  this.$map_$ = new $goog$structs$Map$$;
  $opt_values$$1$$ && this.$addAll$($opt_values$$1$$)
}
function $goog$structs$Set$getKey_$$($val$$31$$) {
  var $type$$93$$ = typeof $val$$31$$;
  return"object" == $type$$93$$ && $val$$31$$ || "function" == $type$$93$$ ? "o" + $goog$getUid$$($val$$31$$) : $type$$93$$.substr(0, 1) + $val$$31$$
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Set$$.prototype;
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($element$$118$$) {
  this.$map_$.set($goog$structs$Set$getKey_$$($element$$118$$), $element$$118$$)
};
$JSCompiler_prototypeAlias$$.$addAll$ = function $$JSCompiler_prototypeAlias$$$$addAll$$($col$$11_values$$11$$) {
  $col$$11_values$$11$$ = $goog$structs$getValues$$($col$$11_values$$11$$);
  for(var $l$$19$$ = $col$$11_values$$11$$.length, $i$$104$$ = 0;$i$$104$$ < $l$$19$$;$i$$104$$++) {
    this.add($col$$11_values$$11$$[$i$$104$$])
  }
};
$JSCompiler_prototypeAlias$$.$removeAll$ = function $$JSCompiler_prototypeAlias$$$$removeAll$$($col$$12_values$$12$$) {
  $col$$12_values$$12$$ = $goog$structs$getValues$$($col$$12_values$$12$$);
  for(var $l$$20$$ = $col$$12_values$$12$$.length, $i$$105$$ = 0;$i$$105$$ < $l$$20$$;$i$$105$$++) {
    this.remove($col$$12_values$$12$$[$i$$105$$])
  }
};
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($element$$119$$) {
  return this.$map_$.remove($goog$structs$Set$getKey_$$($element$$119$$))
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$.clear()
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($element$$120_key$$inline_327$$) {
  $element$$120_key$$inline_327$$ = $goog$structs$Set$getKey_$$($element$$120_key$$inline_327$$);
  return $goog$structs$Map$hasKey_$$(this.$map_$.$map_$, $element$$120_key$$inline_327$$)
};
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  return this.$map_$.$getValues$()
};
// Input 60
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
    }catch($e$$47$$) {
      $str$$49$$.push("*** " + $e$$47$$ + " ***")
    }
  }
  var $previous$$ = new $goog$structs$Set$$, $str$$49$$ = [];
  $helper$$($obj$$94$$, "");
  return $str$$49$$.join("")
}
;
// Input 61
function $bitex$ui$LastTrades$$($opt_blinkDelay$$1$$, $opt_domHelper$$4$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$4$$);
  this.$blink_delay_$ = $opt_blinkDelay$$1$$ || 700
}
$goog$inherits$$($bitex$ui$LastTrades$$, $goog$ui$Component$$);
$bitex$ui$LastTrades$$.prototype.$getBaseCssClass$ = $JSCompiler_returnArg$$("last-trades");
$bitex$ui$LastTrades$$.prototype.$decorateInternal$ = function $$bitex$ui$LastTrades$$$$$decorateInternal$$($element$$121$$) {
  this.$element_$ = $element$$121$$;
  this.$bodyEl_$ = $JSCompiler_StaticMethods_getElementsByTagNameAndClass$$(this.$getDomHelper$(), $element$$121$$)[0]
};
$bitex$ui$LastTrades$$.prototype.clear = function $$bitex$ui$LastTrades$$$$clear$() {
  this.$getDomHelper$();
  $goog$dom$removeChildren$$(this.$bodyEl_$)
};
function $JSCompiler_StaticMethods_publishTrade$$($JSCompiler_StaticMethods_publishTrade$self$$, $date$$1_timeEl$$, $time$$, $side$$1_sideEl$$, $price$$1_priceEl$$1$$, $size$$14_sizeEl$$, $buyer_buyerEl$$, $seller_sellerEl$$) {
  var $dom$$9$$ = $JSCompiler_StaticMethods_publishTrade$self$$.$getDomHelper$();
  1 == $side$$1_sideEl$$ ? $side$$1_sideEl$$ = "Buy" : 2 == $side$$1_sideEl$$ && ($side$$1_sideEl$$ = "Sell");
  $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-date", $date$$1_timeEl$$);
  $date$$1_timeEl$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-time", $time$$);
  $side$$1_sideEl$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-side", $side$$1_sideEl$$);
  $price$$1_priceEl$$1$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-price", $price$$1_priceEl$$1$$);
  $size$$14_sizeEl$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-size", $size$$14_sizeEl$$);
  $buyer_buyerEl$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-buyer", $buyer_buyerEl$$);
  $seller_sellerEl$$ = $dom$$9$$.$createDom$("td", $JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-seller", $seller_sellerEl$$);
  var $rowEl$$1$$ = $dom$$9$$.$createDom$("tr", {"class":$JSCompiler_StaticMethods_publishTrade$self$$.$getBaseCssClass$() + "-row"}, [$date$$1_timeEl$$, $side$$1_sideEl$$, $price$$1_priceEl$$1$$, $size$$14_sizeEl$$, $buyer_buyerEl$$, $seller_sellerEl$$]);
  $JSCompiler_StaticMethods_insertChildAt$$($JSCompiler_StaticMethods_publishTrade$self$$.$bodyEl_$, $rowEl$$1$$, 0);
  $goog$dom$classes$add$$($rowEl$$1$$, "warning");
  $goog$Timer$callOnce$$(function() {
    $goog$dom$classes$remove$$($rowEl$$1$$, "warning")
  }, $JSCompiler_StaticMethods_publishTrade$self$$.$blink_delay_$, $JSCompiler_StaticMethods_publishTrade$self$$)
}
;
// Input 62
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
$JSCompiler_prototypeAlias$$.$onMessage_$ = function $$JSCompiler_prototypeAlias$$$$onMessage_$$($e$$53_msg$$) {
  $e$$53_msg$$ = JSON.parse($e$$53_msg$$.data);
  this.dispatchEvent(new $bitex$api$BitExEvent$$("raw_message", $e$$53_msg$$));
  switch($e$$53_msg$$.MsgType) {
    case "ERROR":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("error_message", $e$$53_msg$$));
      break;
    case "0":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("heartbeat", $e$$53_msg$$));
      break;
    case "BF":
      1 == $e$$53_msg$$.UserStatus ? (this.$logged_$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_ok", $e$$53_msg$$))) : (this.$logged_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("login_error", $e$$53_msg$$)));
      break;
    case "y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("security_list", $e$$53_msg$$));
      break;
    case "U13":
      1 == $e$$53_msg$$.UserStatus ? this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_ok", $e$$53_msg$$)) : this.dispatchEvent(new $bitex$api$BitExEvent$$("pwd_changed_error", $e$$53_msg$$));
      break;
    case "U19":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("generate_boleto_response", $e$$53_msg$$));
      break;
    case "U7":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("crypto_coin_withdraw_response", $e$$53_msg$$));
      break;
    case "U9":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("brl_bank_transfer_withdraw_response", $e$$53_msg$$));
      break;
    case "U3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("balance_response", $e$$53_msg$$));
      break;
    case "U5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("order_list_response", $e$$53_msg$$));
      break;
    case "U17":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("two_factor_secret", $e$$53_msg$$));
      break;
    case "U21":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("boleto_options_response", $e$$53_msg$$));
      break;
    case "U27":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("withdraw_list_response", $e$$53_msg$$));
      break;
    case "U29":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("broker_list", $e$$53_msg$$));
      break;
    case "B3":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_list", $e$$53_msg$$));
      break;
    case "B5":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("customer_detail", $e$$53_msg$$));
      break;
    case "W":
      if(1 != $e$$53_msg$$.MarketDepth) {
        var $has_cleared_trade$$ = $JSCompiler_alias_FALSE$$, $has_cleared_book$$ = $JSCompiler_alias_FALSE$$, $x$$66$$;
        for($x$$66$$ in $e$$53_msg$$.MDFullGrp) {
          var $entry$$ = $e$$53_msg$$.MDFullGrp[$x$$66$$];
          switch($entry$$.MDEntryType) {
            case "0":
            ;
            case "1":
              $has_cleared_book$$ || ($has_cleared_book$$ = $JSCompiler_alias_TRUE$$, this.dispatchEvent(new $bitex$api$BitExEvent$$("ob_clear")));
              $entry$$.Symbol = $e$$53_msg$$.Symbol;
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
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_full_refresh", $e$$53_msg$$));
      break;
    case "X":
      if("3" == $e$$53_msg$$.MDBkTyp) {
        for($x$$66$$ in $e$$53_msg$$.MDIncGrp) {
          switch($entry$$ = $e$$53_msg$$.MDIncGrp[$x$$66$$], $entry$$.MDEntryType) {
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
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_incremental_refresh", $e$$53_msg$$));
      break;
    case "Y":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("md_request_reject", $e$$53_msg$$));
      break;
    case "8":
      this.dispatchEvent(new $bitex$api$BitExEvent$$("execution_report", $e$$53_msg$$))
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
$JSCompiler_prototypeAlias$$.$enableTwoFactor$ = function $$JSCompiler_prototypeAlias$$$$enableTwoFactor$$($enable$$15_msg$$2$$, $opt_secret$$, $opt_code$$, $opt_clientID$$) {
  $enable$$15_msg$$2$$ = {MsgType:"U16", Enable:$enable$$15_msg$$2$$};
  $opt_secret$$ != $JSCompiler_alias_NULL$$ && !/^[\s\xa0]*$/.test($opt_secret$$) && ($enable$$15_msg$$2$$.Secret = $opt_secret$$);
  $opt_code$$ != $JSCompiler_alias_NULL$$ && !/^[\s\xa0]*$/.test($opt_code$$) && ($enable$$15_msg$$2$$.Code = $opt_code$$);
  $opt_clientID$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$) && ($enable$$15_msg$$2$$.ClientID = $opt_clientID$$);
  this.$ws_$.send(JSON.stringify($enable$$15_msg$$2$$))
};
$JSCompiler_prototypeAlias$$.$forgotPassword$ = function $$JSCompiler_prototypeAlias$$$$forgotPassword$$($email$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U10", Email:$email$$}))
};
$JSCompiler_prototypeAlias$$.$requestBalances$ = function $$JSCompiler_prototypeAlias$$$$requestBalances$$($opt_clientID$$1$$) {
  var $msg$$4$$ = {MsgType:"U2", BalanceReqID:parseInt(1E6 * Math.random(), 10)};
  $opt_clientID$$1$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$1$$) && ($msg$$4$$.ClientID = $opt_clientID$$1$$);
  this.$ws_$.send(JSON.stringify($msg$$4$$))
};
$JSCompiler_prototypeAlias$$.$withdrawCryptoCoin$ = function $$JSCompiler_prototypeAlias$$$$withdrawCryptoCoin$$($amount$$, $address$$, $currency$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U6", WithdrawReqID:parseInt(1E6 * Math.random(), 10), Currency:$currency$$, Amount:parseInt(1E8 * $amount$$, 10), Wallet:$address$$}))
};
$JSCompiler_prototypeAlias$$.$confirmWithdraw$ = function $$JSCompiler_prototypeAlias$$$$confirmWithdraw$$($confirmation_token$$) {
  this.$ws_$.send(JSON.stringify({MsgType:"U24", WithdrawReqID:parseInt(1E6 * Math.random(), 10), ConfirmationToken:$confirmation_token$$}))
};
$JSCompiler_prototypeAlias$$.$requestWithdrawList$ = function $$JSCompiler_prototypeAlias$$$$requestWithdrawList$$($opt_requestId_requestId$$, $msg$$8_opt_page$$, $opt_limit$$1$$, $opt_status$$, $opt_clientID$$2$$) {
  $opt_requestId_requestId$$ = $opt_requestId_requestId$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$8_opt_page$$ = {MsgType:"U26", WithdrawListReqID:$opt_requestId_requestId$$, Page:$msg$$8_opt_page$$ || 0, PageSize:$opt_limit$$1$$ || 100, StatusList:$opt_status$$ || ["1", "2"]};
  $opt_clientID$$2$$ != $JSCompiler_alias_NULL$$ && $goog$isNumber$$($opt_clientID$$2$$) && ($msg$$8_opt_page$$.ClientID = $opt_clientID$$2$$);
  this.$ws_$.send(JSON.stringify($msg$$8_opt_page$$));
  return $opt_requestId_requestId$$
};
$JSCompiler_prototypeAlias$$.$requestBrokerList$ = function $$JSCompiler_prototypeAlias$$$$requestBrokerList$$($opt_requestId$$1_requestId$$1$$, $opt_country$$, $msg$$9_opt_page$$1$$, $opt_limit$$2$$, $opt_status$$1$$) {
  $opt_requestId$$1_requestId$$1$$ = $opt_requestId$$1_requestId$$1$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$9_opt_page$$1$$ = {MsgType:"U28", BrokerListReqID:$opt_requestId$$1_requestId$$1$$, Page:$msg$$9_opt_page$$1$$ || 0, PageSize:$opt_limit$$2$$ || 100, StatusList:$opt_status$$1$$ || ["1"]};
  $opt_country$$ != $JSCompiler_alias_NULL$$ && ($msg$$9_opt_page$$1$$.Country = $opt_country$$);
  this.$ws_$.send(JSON.stringify($msg$$9_opt_page$$1$$));
  return $opt_requestId$$1_requestId$$1$$
};
$JSCompiler_prototypeAlias$$.$requestCustomerList$ = function $$JSCompiler_prototypeAlias$$$$requestCustomerList$$($opt_requestId$$2_requestId$$2$$, $opt_country$$1$$, $opt_state$$1$$, $msg$$10_opt_page$$2$$, $opt_limit$$3$$, $opt_status$$2$$, $opt_sort_column$$, $opt_sort_direction$$) {
  $opt_requestId$$2_requestId$$2$$ = $opt_requestId$$2_requestId$$2$$ || parseInt(1E7 * Math.random(), 10);
  $msg$$10_opt_page$$2$$ = {MsgType:"B2", CustomerListReqID:$opt_requestId$$2_requestId$$2$$, Page:$msg$$10_opt_page$$2$$ || 0, PageSize:$opt_limit$$3$$ || 100, StatusList:$opt_status$$2$$ || [0, 1]};
  $opt_country$$1$$ != $JSCompiler_alias_NULL$$ && ($msg$$10_opt_page$$2$$.Country = $opt_country$$1$$);
  $opt_state$$1$$ != $JSCompiler_alias_NULL$$ && ($msg$$10_opt_page$$2$$.State = $opt_state$$1$$);
  $opt_sort_column$$ != $JSCompiler_alias_NULL$$ && ($msg$$10_opt_page$$2$$.Sort = $opt_sort_column$$);
  $opt_sort_direction$$ != $JSCompiler_alias_NULL$$ && ($msg$$10_opt_page$$2$$.SortOrder = $opt_sort_direction$$);
  this.$ws_$.send(JSON.stringify($msg$$10_opt_page$$2$$));
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
function $JSCompiler_StaticMethods_sendOrder_$$($JSCompiler_StaticMethods_sendOrder_$self$$, $msg$$21_symbol$$2$$, $qty$$2$$, $price$$2$$, $side$$2$$, $opt_client_id$$, $clientOrderId_opt_clientOrderId$$) {
  $clientOrderId_opt_clientOrderId$$ = $clientOrderId_opt_clientOrderId$$ || parseInt(1E7 * Math.random(), 10);
  $price$$2$$ = parseInt(1E8 * $price$$2$$, 10);
  $qty$$2$$ = parseInt(1E8 * $qty$$2$$, 10);
  $msg$$21_symbol$$2$$ = {MsgType:"D", ClOrdID:"" + $clientOrderId_opt_clientOrderId$$, Symbol:$msg$$21_symbol$$2$$, Side:$side$$2$$, OrdType:"2", Price:$price$$2$$, OrderQty:$qty$$2$$};
  $opt_client_id$$ != $JSCompiler_alias_NULL$$ && ($msg$$21_symbol$$2$$.ClientID = $opt_client_id$$);
  $JSCompiler_StaticMethods_sendOrder_$self$$.$ws_$.send(JSON.stringify($msg$$21_symbol$$2$$));
  return $clientOrderId_opt_clientOrderId$$
}
$JSCompiler_prototypeAlias$$.$cancelOrder$ = function $$JSCompiler_prototypeAlias$$$$cancelOrder$$($opt_clientOrderId$$1$$, $opt_OrderId$$) {
  var $msg$$22$$ = {MsgType:"F"};
  $opt_OrderId$$ ? $msg$$22$$.OrderID = $opt_OrderId$$ : $opt_clientOrderId$$1$$ && ($msg$$22$$.OrigClOrdID = $opt_clientOrderId$$1$$);
  this.$ws_$.send(JSON.stringify($msg$$22$$))
};
$JSCompiler_prototypeAlias$$.$sendRawMessage$ = function $$JSCompiler_prototypeAlias$$$$sendRawMessage$$($msg$$23$$) {
  this.$ws_$.send(JSON.stringify($msg$$23$$))
};
$JSCompiler_prototypeAlias$$.$sendBuyLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendBuyLimitedOrder$$($symbol$$3$$, $qty$$3$$, $price$$3$$, $opt_client_id$$1$$, $opt_clientOrderId$$2$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$3$$, $qty$$3$$, $price$$3$$, "1", $opt_client_id$$1$$, $opt_clientOrderId$$2$$)
};
$JSCompiler_prototypeAlias$$.$sendSellLimitedOrder$ = function $$JSCompiler_prototypeAlias$$$$sendSellLimitedOrder$$($symbol$$4$$, $qty$$4$$, $price$$4$$, $opt_client_id$$2$$, $opt_clientOrderId$$3$$) {
  return $JSCompiler_StaticMethods_sendOrder_$$(this, $symbol$$4$$, $qty$$4$$, $price$$4$$, "2", $opt_client_id$$2$$, $opt_clientOrderId$$3$$)
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
// Input 63
// Input 64
function $goog$fx$Dragger$$($target$$54$$, $opt_handle$$, $opt_limits$$) {
  $goog$Disposable$$.call(this);
  this.target = $target$$54$$;
  this.handle = $opt_handle$$ || $target$$54$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$54$$);
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
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$38_e$$54_element$$inline_345$$) {
  var $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ = "mousedown" == $JSCompiler_temp$$38_e$$54_element$$inline_345$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$38_e$$54_element$$inline_345$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$38_e$$54_element$$inline_345$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$38_e$$54_element$$inline_345$$.clientX, $JSCompiler_temp$$38_e$$54_element$$inline_345$$.clientY, $JSCompiler_temp$$38_e$$54_element$$inline_345$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$38_e$$54_element$$inline_345$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$38_e$$54_element$$inline_345$$.preventDefault()
    }
    var $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ = this.$document_$, $bestParent$$inline_347_docEl$$inline_342$$ = $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$.documentElement, $borderWidths$$inline_348_useCapture$$inline_343$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_348_useCapture$$inline_343$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_348_useCapture$$inline_343$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_347_docEl$$inline_342$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_347_docEl$$inline_342$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ ? $goog$dom$getWindow_$$($doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_348_useCapture$$inline_343$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.clientY;
    this.screenX = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.screenX;
    this.screenY = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$38_e$$54_element$$inline_345$$ = this.target, $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.offsetLeft, $bestParent$$inline_347_docEl$$inline_342$$ = $JSCompiler_temp$$38_e$$54_element$$inline_345$$.offsetParent, !$bestParent$$inline_347_docEl$$inline_342$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$38_e$$54_element$$inline_345$$, "position") && ($bestParent$$inline_347_docEl$$inline_342$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$38_e$$54_element$$inline_345$$).documentElement), $bestParent$$inline_347_docEl$$inline_342$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_348_useCapture$$inline_343$$ = $goog$style$getBorderBox$$($bestParent$$inline_347_docEl$$inline_342$$), $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ += $borderWidths$$inline_348_useCapture$$inline_343$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_348_useCapture$$inline_343$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_347_docEl$$inline_342$$), $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ -= $borderWidths$$inline_348_useCapture$$inline_343$$.left), $JSCompiler_temp$$38_e$$54_element$$inline_345$$ = $goog$style$isRightToLeft$$($bestParent$$inline_347_docEl$$inline_342$$) ? $bestParent$$inline_347_docEl$$inline_342$$.clientWidth - ($doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$ + $JSCompiler_temp$$38_e$$54_element$$inline_345$$.offsetWidth) : 
    $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$) : $JSCompiler_temp$$38_e$$54_element$$inline_345$$ = $doc$$inline_341_isMouseDown_offsetLeftForReal$$inline_346$$) : $JSCompiler_temp$$38_e$$54_element$$inline_345$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$38_e$$54_element$$inline_345$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$56$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$56$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$67$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$39$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$56$$.clientX, $e$$56$$.clientY, $e$$56$$, $x$$67$$, $y$$39$$, $opt_dragCanceled$$ || "touchcancel" == $e$$56$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$56$$.type || "touchcancel" == $e$$56$$.type) && $e$$56$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$58$$) {
  var $type$$95$$ = $e$$58$$.type;
  "touchstart" == $type$$95$$ || "touchmove" == $type$$95$$ ? $e$$58$$.init($e$$58$$.$event_$.targetTouches[0], $e$$58$$.currentTarget) : ("touchend" == $type$$95$$ || "touchcancel" == $type$$95$$) && $e$$58$$.init($e$$58$$.$event_$.changedTouches[0], $e$$58$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$59$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$59$$);
    var $dx$$7_x$$68$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$59$$.clientX - this.clientX), $dy$$7_pos$$10_y$$40$$ = $e$$59$$.clientY - this.clientY;
    this.clientX = $e$$59$$.clientX;
    this.clientY = $e$$59$$.clientY;
    this.screenX = $e$$59$$.screenX;
    this.screenY = $e$$59$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$59$$.clientX, $e$$59$$.clientY, $e$$59$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$59$$);
          return
        }
      }
    }
    $dy$$7_pos$$10_y$$40$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$68$$, $dy$$7_pos$$10_y$$40$$);
    $dx$$7_x$$68$$ = $dy$$7_pos$$10_y$$40$$.x;
    $dy$$7_pos$$10_y$$40$$ = $dy$$7_pos$$10_y$$40$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$59$$.clientX, $e$$59$$.clientY, $e$$59$$, $dx$$7_x$$68$$, $dy$$7_pos$$10_y$$40$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$59$$, $dx$$7_x$$68$$, $dy$$7_pos$$10_y$$40$$), $e$$59$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $dx$$8_x$$69$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$document_$));
  $dx$$8_x$$69$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$ += $dx$$8_x$$69$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$69$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$69$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$60$$) {
  var $pos$$11$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$60$$.clientX = this.clientX;
  $e$$60$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$60$$, $pos$$11$$.x, $pos$$11$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$61$$, $x$$70$$, $y$$42$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$70$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$70$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$42$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$61$$.clientX, $e$$61$$.clientY, $e$$61$$, $x$$70$$, $y$$42$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$71$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$71$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$43$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$43$$))
}
function $goog$fx$DragEvent$$($type$$96$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$1$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$96$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$1$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
// Input 65
// Input 66
// Input 67
function $goog$events$FocusHandler$$($element$$126_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$126_typeOut$$;
  $element$$126_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$126_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$67$$) {
  var $event$$4$$ = new $goog$events$BrowserEvent$$($e$$67$$.$event_$);
  $event$$4$$.type = "focusin" == $e$$67$$.type || "focus" == $e$$67$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$4$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
// Input 68
// Input 69
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$5$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$5$$);
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
  var $element$$127$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$127$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$127$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$127$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$20$$;
    $JSCompiler_inline_result$$20$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$20$$;
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$128$$) {
  return!!$element$$128$$ && "DIV" == $element$$128$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$129$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$129$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$ = this.$getElement$();
    $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode && $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$)
  }
  $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$ = this.$getElement$();
  $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode && $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$ = this.$getElement$();
  $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode && $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_363_refNode$$inline_524_refNode$$inline_527$$.nextSibling);
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
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$) {
  if($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_485_win$$inline_480$$ = (($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$) : window) || window;
        if("fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position")) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_491_popupSize$$inline_484$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_485_win$$inline_480$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_485_win$$inline_480$$ || window);
        $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = Math.max($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ + $viewSize$$inline_485_win$$inline_480$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_491_popupSize$$inline_484$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ + $viewSize$$inline_485_win$$inline_480$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_491_popupSize$$inline_484$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$, $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$, $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$);
        $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_491_popupSize$$inline_484$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$424_JSCompiler_temp_const$$427_doc$$inline_479_left$$inline_486_visible$$3_x$$inline_481$$($JSCompiler_StaticMethods_getWindow$self$$inline_489_JSCompiler_temp_const$$426_scroll$$inline_483_top$$inline_487_y$$inline_482$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_491_popupSize$$inline_484$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
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
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$69$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$69$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$70$$) {
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
// Input 70
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$6$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$6$$);
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
    var $element$$inline_373$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_374$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_373$$, $className$$inline_374$$) : $goog$dom$classes$remove$$($element$$inline_373$$, $className$$inline_374$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$ = this.$getElement$(), $dom$$11$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$11$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$11$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$11$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$, this.$titleEl_$, this.$contentEl_$ = $dom$$11$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$11$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_496_element$$130$$.render());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$ = this.$getElement$();
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$.appendChild(this.$contentEl_$));
  var $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $titleCloseClass$$, this.$titleEl_$)[0], 
  this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$buttonsClass_contentClass_titleClass$$, id:$JSCompiler_StaticMethods_getId$$(this)}), $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $buttonsClass_contentClass_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(document, $JSCompiler_alias_NULL$$, $buttonsClass_contentClass_titleClass$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$)[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $buttonsClass_contentClass_titleClass$$), $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$.appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_499_dialogElement_element$$131$$.render()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $dom$$inline_379_element$$132$$ = this.$getElement$();
  $dom$$inline_379_element$$132$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($dom$$inline_379_element$$132$$, "labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_379_element$$132$$ = this.$getDomHelper$(), $bg$$inline_380$$ = this.$getBackgroundElement$();
    $dom$$inline_379_element$$132$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_379_element$$132$$.removeNode($bg$$inline_380$$)
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
      for(var $doc$$41$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$109$$ = 0, $button$$10$$;$button$$10$$ = $buttons$$[$i$$109$$];$i$$109$$++) {
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
          }catch($e$$71$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$42_h$$7$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_384_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$42_h$$7$$ ? $goog$dom$getWindow_$$($doc$$42_h$$7$$) : window) || window || window), $w$$8$$ = Math.max($doc$$42_h$$7$$.body.scrollWidth, $limits$$inline_384_viewSize$$2$$.width), $doc$$42_h$$7$$ = Math.max($doc$$42_h$$7$$.body.scrollHeight, $limits$$inline_384_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getStyle_$$(this.$getElement$(), "position") ? ($limits$$inline_384_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_384_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_384_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_384_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$8$$ - $dialogSize$$.width, $doc$$42_h$$7$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$2$$ = this.$buttons_$, $key$$76$$ = $bs_caption$$2$$ && $bs_caption$$2$$.$cancelButton_$;
    $key$$76$$ ? ($bs_caption$$2$$ = $bs_caption$$2$$.get($key$$76$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$76$$, $bs_caption$$2$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$buttonEl_$ = this.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Dialog$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$11_e$$74_el$$inline_391_key$$77$$) {
  a: {
    for($button$$11_e$$74_el$$inline_391_key$$77$$ = $button$$11_e$$74_el$$inline_391_key$$77$$.target;$button$$11_e$$74_el$$inline_391_key$$77$$ != $JSCompiler_alias_NULL$$ && $button$$11_e$$74_el$$inline_391_key$$77$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$11_e$$74_el$$inline_391_key$$77$$.tagName) {
        break a
      }
      $button$$11_e$$74_el$$inline_391_key$$77$$ = $button$$11_e$$74_el$$inline_391_key$$77$$.parentNode
    }
    $button$$11_e$$74_el$$inline_391_key$$77$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$11_e$$74_el$$inline_391_key$$77$$ && !$button$$11_e$$74_el$$inline_391_key$$77$$.disabled) {
    $button$$11_e$$74_el$$inline_391_key$$77$$ = $button$$11_e$$74_el$$inline_391_key$$77$$.name;
    var $caption$$3$$ = this.$buttons_$.get($button$$11_e$$74_el$$inline_391_key$$77$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$11_e$$74_el$$inline_391_key$$77$$, $caption$$3$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$75$$) {
  var $caption$$4_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$56$$ = $e$$75$$.target;
  if("keydown" == $e$$75$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$75$$.keyCode) {
      var $cancel_key$$78$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$56$$ = "SELECT" == $isSpecialFormElement_target$$56$$.tagName && !$isSpecialFormElement_target$$56$$.disabled;
      $cancel_key$$78$$ && !$isSpecialFormElement_target$$56$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = $buttonSet$$.get($cancel_key$$78$$), $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$78$$, $caption$$4_close$$))) : $isSpecialFormElement_target$$56$$ || ($caption$$4_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$75$$.keyCode && $e$$75$$.shiftKey && $isSpecialFormElement_target$$56$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_394$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, 0, this)
      }
    }
  }else {
    if(13 == $e$$75$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$56$$.tagName) {
        $cancel_key$$78$$ = $isSpecialFormElement_target$$56$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$;
          if($JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_399$$ = 0, $nextButton$$inline_400$$;$nextButton$$inline_400$$ = $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$[$i$$inline_399$$];$i$$inline_399$$++) {
                if($nextButton$$inline_400$$.name == $defaultKey$$ || $nextButton$$inline_400$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$ = $nextButton$$inline_400$$;
                  break a
                }
              }
              $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$56$$ = ("TEXTAREA" == $isSpecialFormElement_target$$56$$.tagName || "SELECT" == $isSpecialFormElement_target$$56$$.tagName || "A" == $isSpecialFormElement_target$$56$$.tagName) && !$isSpecialFormElement_target$$56$$.disabled;
          $JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$ && (!$JSCompiler_temp$$13_buttons$$inline_398_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$56$$) && ($cancel_key$$78$$ = $defaultKey$$)
        }
      }
      $cancel_key$$78$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$78$$, String($buttonSet$$.get($cancel_key$$78$$)))))
    }
  }
  if($caption$$4_close$$ || $hasHandler$$) {
    $e$$75$$.stopPropagation(), $e$$75$$.preventDefault()
  }
  $caption$$4_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$79$$, $caption$$5$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$79$$;
  this.caption = $caption$$5$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$7$$) {
  this.$dom_$ = $opt_domHelper$$7$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$80$$, $caption$$6$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$80$$, $caption$$6$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$80$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$80$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$12$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$12$$.key, $button$$12$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.render = function $$JSCompiler_prototypeAlias$$$render$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$2$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$7$$, $key$$81$$) {
      var $button$$13$$ = $domHelper$$2$$.$createDom$("button", {name:$key$$81$$}, $caption$$7$$);
      $key$$81$$ == this.$defaultButton_$ && ($button$$13$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$13$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$134$$) {
  if($buttons$$2_element$$134$$ && 1 == $buttons$$2_element$$134$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$134$$;
    $buttons$$2_element$$134$$ = this.$element_$.getElementsByTagName("button");
    for(var $i$$110$$ = 0, $button$$14$$, $key$$82$$, $caption$$8$$;$button$$14$$ = $buttons$$2_element$$134$$[$i$$110$$];$i$$110$$++) {
      if($key$$82$$ = $button$$14$$.name || $button$$14$$.id, $caption$$8$$ = $goog$dom$getTextContent$$($button$$14$$) || $button$$14$$.value, $key$$82$$) {
        var $isDefault$$ = 0 == $i$$110$$;
        this.set($key$$82$$, $caption$$8$$, $isDefault$$, $button$$14$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$14$$, this.$class_$ + "-default")
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
// Input 71
function $bootstrap$Dialog$$() {
  $goog$ui$Dialog$$.call(this, "modal")
}
$goog$inherits$$($bootstrap$Dialog$$, $goog$ui$Dialog$$);
$bootstrap$Dialog$$.prototype.$createDom$ = function $$bootstrap$Dialog$$$$$createDom$$() {
  $goog$ui$ModalPopup$$.prototype.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$ = this.$getElement$(), $dom$$12_i$$113$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$12_i$$113$$.$createDom$("div", {className:"modal-header", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleCloseEl_$ = $dom$$12_i$$113$$.$createDom$("a", {className:"close", href:"javascript:;"}, "\u00d7"), this.$titleTextEl_$ = $dom$$12_i$$113$$.$createDom$("h3", $JSCompiler_alias_VOID$$, this.$title_$));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$, this.$titleEl_$, this.$contentEl_$ = $dom$$12_i$$113$$.$createDom$("div", "modal-body"), this.$buttonEl_$ = $dom$$12_i$$113$$.$createDom$("div", "modal-footer"));
  this.$titleId_$ = this.$titleEl_$.id;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$.setAttribute("role", "dialog");
  $goog$a11y$aria$setState$$($JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  if(this.$buttons_$) {
    $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$ = this.$buttons_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$.$element_$ = this.$buttonEl_$;
    $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$.render();
    $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$ = this.$buttons_$.$element_$.getElementsByTagName("BUTTON");
    for($dom$$12_i$$113$$ = 0;$dom$$12_i$$113$$ < $JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$.length;$dom$$12_i$$113$$++) {
      $goog$dom$classes$add$$($JSCompiler_StaticMethods_attachToElement$self$$inline_511_buttons$$4_element$$135$$[$dom$$12_i$$113$$], "btn")
    }
  }
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  this.$setBackgroundElementOpacity$(this.$backgroundElementOpacity_$)
};
$bootstrap$Dialog$$.prototype.$setBackgroundElementOpacity$ = function $$bootstrap$Dialog$$$$$setBackgroundElementOpacity$$($bgEl$$1_opacity$$2$$) {
  this.$backgroundElementOpacity_$ = $bgEl$$1_opacity$$2$$;
  this.$getElement$() && ($bgEl$$1_opacity$$2$$ = this.$getBackgroundElement$(), $goog$dom$classes$add$$($bgEl$$1_opacity$$2$$, "modal-dialog-bg"), $bgEl$$1_opacity$$2$$ && $goog$style$setOpacity$$($bgEl$$1_opacity$$2$$, this.$backgroundElementOpacity_$))
};
// Input 72
function $goog$dom$forms$getValue$$() {
  var $el$$38$$ = $goog$dom$getElement$$("id_instrument_1"), $selectedIndex$$inline_404_type$$98_values$$inline_407$$ = $el$$38$$.type;
  if(!$goog$isDef$$($selectedIndex$$inline_404_type$$98_values$$inline_407$$)) {
    return $JSCompiler_alias_NULL$$
  }
  switch($selectedIndex$$inline_404_type$$98_values$$inline_407$$.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return $el$$38$$.checked ? $el$$38$$.value : $JSCompiler_alias_NULL$$;
    case "select-one":
      return $selectedIndex$$inline_404_type$$98_values$$inline_407$$ = $el$$38$$.selectedIndex, 0 <= $selectedIndex$$inline_404_type$$98_values$$inline_407$$ ? $el$$38$$.options[$selectedIndex$$inline_404_type$$98_values$$inline_407$$].value : $JSCompiler_alias_NULL$$;
    case "select-multiple":
      for(var $selectedIndex$$inline_404_type$$98_values$$inline_407$$ = [], $option$$inline_408$$, $i$$inline_409$$ = 0;$option$$inline_408$$ = $el$$38$$.options[$i$$inline_409$$];$i$$inline_409$$++) {
        $option$$inline_408$$.selected && $selectedIndex$$inline_404_type$$98_values$$inline_407$$.push($option$$inline_408$$.value)
      }
      return $selectedIndex$$inline_404_type$$98_values$$inline_407$$.length ? $selectedIndex$$inline_404_type$$98_values$$inline_407$$ : $JSCompiler_alias_NULL$$;
    default:
      return $goog$isDef$$($el$$38$$.value) ? $el$$38$$.value : $JSCompiler_alias_NULL$$
  }
}
;
// Input 73
$goog$exportPath_$$("bitex.app.markets", function($url$$31$$) {
  function $format_currency$$($value$$93$$, $currency$$1$$) {
    var $currency_def$$ = $currency_info$$[$currency$$1$$];
    return(new $goog$i18n$NumberFormat$$($currency_def$$.$format$, $currency_def$$.code)).$format$($value$$93$$)
  }
  var $bitEx$$ = new $bitex$api$BitEx$$, $model$$ = new $bitex$model$Model$$(document.body), $last_trades$$ = new $bitex$ui$LastTrades$$, $order_book_bid$$ = $JSCompiler_alias_NULL$$, $order_book_offer$$ = $JSCompiler_alias_NULL$$;
  $last_trades$$.$decorate$($goog$dom$getElement$$("last_trades_id"));
  var $subscription_1$$ = $JSCompiler_alias_NULL$$, $currency_info$$ = {};
  $bitEx$$.addEventListener("error_message", function($e$$76$$) {
    console.log($goog$debug$deepExpose$$($e$$76$$.data))
  });
  try {
    $bitEx$$.open($url$$31$$)
  }catch($e$$77$$) {
    alert("Error connecting to the server. Please try again");
    return
  }
  $bitEx$$.addEventListener("opened", function() {
    $goog$dom$classes$remove$$(document.body, "ws-not-connected");
    $goog$dom$classes$add$$(document.body, "ws-connected");
    $bitEx$$.$requestSecurityList$()
  });
  $bitEx$$.addEventListener("security_list", function($e$$79_msg$$26$$) {
    $e$$79_msg$$26$$ = $e$$79_msg$$26$$.data;
    $goog$array$forEach$$($e$$79_msg$$26$$.Currencies, function($currency$$2$$) {
      $currency_info$$[$currency$$2$$.Code] = {code:$currency$$2$$.Code, $format$:$currency$$2$$.FormatJS, description:$currency$$2$$.Description, $sign$:$currency$$2$$.Sign, $pip$:$currency$$2$$.Pip, $is_crypto$:$currency$$2$$.IsCrypto}
    });
    var $symbols$$1$$ = [];
    $goog$array$forEach$$($e$$79_msg$$26$$.Instruments, function($el$$46_instrument$$) {
      var $symbol$$5$$ = $el$$46_instrument$$.Symbol;
      $symbols$$1$$.push($symbol$$5$$);
      $el$$46_instrument$$ = $goog$dom$createDom$$("option", {value:$symbol$$5$$}, $el$$46_instrument$$.Description);
      $goog$dom$getElement$$("id_instrument_1").appendChild($el$$46_instrument$$)
    });
    $bitEx$$.$subscribeMarketData$(0, $symbols$$1$$, ["2"])
  });
  $goog$events$listen$$($goog$dom$getElement$$("id_instrument_1"), "change", function() {
    var $priceCurrencyDef$$1_symbol$$6$$ = $goog$dom$forms$getValue$$();
    console.log("selected " + $priceCurrencyDef$$1_symbol$$6$$);
    $subscription_1$$ && $bitEx$$.$unSubscribeMarketData$($subscription_1$$);
    $subscription_1$$ = $bitEx$$.$subscribeMarketData$(0, [$priceCurrencyDef$$1_symbol$$6$$], ["0", "1"]);
    $order_book_bid$$ != $JSCompiler_alias_NULL$$ && ($order_book_bid$$.clear(), $order_book_offer$$.clear(), $order_book_bid$$.$dispose$(), $order_book_offer$$.$dispose$());
    var $qtyCurrencyDef$$1$$ = $currency_info$$[$priceCurrencyDef$$1_symbol$$6$$.substr(0, 3)], $priceCurrencyDef$$1_symbol$$6$$ = $currency_info$$[$priceCurrencyDef$$1_symbol$$6$$.substr(3)];
    $order_book_bid$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "0", $qtyCurrencyDef$$1$$, $priceCurrencyDef$$1_symbol$$6$$);
    $order_book_offer$$ = new $bitex$ui$OrderBook$$($model$$.get("Username"), "1", $qtyCurrencyDef$$1$$, $priceCurrencyDef$$1_symbol$$6$$);
    $order_book_bid$$.$decorate$($goog$dom$getElement$$("order_book_bid"));
    $order_book_offer$$.$decorate$($goog$dom$getElement$$("order_book_offer"))
  });
  $bitEx$$.addEventListener("closed", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    alert("Connection closed by the server")
  });
  $bitEx$$.addEventListener("trade_clear", function() {
    $last_trades$$.clear()
  });
  $bitEx$$.addEventListener("trade", function($e$$83_msg$$27$$) {
    $e$$83_msg$$27$$ = $e$$83_msg$$27$$.data;
    var $size$$15$$ = $e$$83_msg$$27$$.MDEntrySize / 1E8, $symbol$$7$$ = $e$$83_msg$$27$$.Symbol, $size_currency$$ = $symbol$$7$$.substr(0, 3);
    $JSCompiler_StaticMethods_publishTrade$$($last_trades$$, $e$$83_msg$$27$$.MDEntryDate, $e$$83_msg$$27$$.MDEntryTime, $e$$83_msg$$27$$.Side, $format_currency$$($e$$83_msg$$27$$.MDEntryPx / 1E8, $symbol$$7$$.substr(3, 3)), $format_currency$$($size$$15$$, $size_currency$$), $e$$83_msg$$27$$.MDEntryBuyer, $e$$83_msg$$27$$.MDEntrySeller)
  });
  $bitEx$$.addEventListener("md_status", function($e$$84$$) {
    try {
      var $msg$$28$$ = $e$$84$$.data;
      delete $msg$$28$$.MDEntryType;
      $goog$object$forEach$$($msg$$28$$, function($volume$$, $currency$$3$$) {
        $volume$$ /= 1E8;
        var $volume_key$$ = "volume_" + $currency$$3$$.toLowerCase();
        $model$$.set($volume_key$$, $volume$$);
        $model$$.set("formatted_" + $volume_key$$, $format_currency$$($volume$$, $currency$$3$$))
      })
    }catch($str$$52$$) {
    }
  });
  $bitEx$$.addEventListener("ob_clear", function() {
    $order_book_bid$$.clear();
    $order_book_offer$$.clear()
  });
  $bitEx$$.addEventListener("ob_delete_orders_thru", function($e$$86_index$$65$$) {
    var $msg$$29_side$$3$$ = $e$$86_index$$65$$.data;
    $e$$86_index$$65$$ = $msg$$29_side$$3$$.MDEntryPositionNo;
    $msg$$29_side$$3$$ = $msg$$29_side$$3$$.MDEntryType;
    "0" == $msg$$29_side$$3$$ ? $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_bid$$, $e$$86_index$$65$$) : "1" == $msg$$29_side$$3$$ && $JSCompiler_StaticMethods_deleteOrderThru$$($order_book_offer$$, $e$$86_index$$65$$)
  });
  $bitEx$$.addEventListener("ob_delete_order", function($e$$87_index$$66$$) {
    var $msg$$30_side$$4$$ = $e$$87_index$$66$$.data;
    $e$$87_index$$66$$ = $msg$$30_side$$4$$.MDEntryPositionNo - 1;
    $msg$$30_side$$4$$ = $msg$$30_side$$4$$.MDEntryType;
    "0" == $msg$$30_side$$4$$ ? $JSCompiler_StaticMethods_deleteOrder$$($order_book_bid$$, $e$$87_index$$66$$) : "1" == $msg$$30_side$$4$$ && $JSCompiler_StaticMethods_deleteOrder$$($order_book_offer$$, $e$$87_index$$66$$)
  });
  $bitEx$$.addEventListener("ob_update_order", function($e$$88_index$$67$$) {
    var $msg$$31_side$$5$$ = $e$$88_index$$67$$.data;
    $e$$88_index$$67$$ = $msg$$31_side$$5$$.MDEntryPositionNo - 1;
    var $qty$$5$$ = $msg$$31_side$$5$$.MDEntrySize / 1E8, $msg$$31_side$$5$$ = $msg$$31_side$$5$$.MDEntryType;
    "0" == $msg$$31_side$$5$$ ? $JSCompiler_StaticMethods_updateOrder$$($order_book_bid$$, $e$$88_index$$67$$, $qty$$5$$) : "1" == $msg$$31_side$$5$$ && $JSCompiler_StaticMethods_updateOrder$$($order_book_offer$$, $e$$88_index$$67$$, $qty$$5$$)
  });
  $bitEx$$.addEventListener("ob_new_order", function($e$$89_symbol$$8$$) {
    var $msg$$32_side$$6$$ = $e$$89_symbol$$8$$.data;
    $e$$89_symbol$$8$$ = $msg$$32_side$$6$$.Symbol;
    var $index$$68$$ = $msg$$32_side$$6$$.MDEntryPositionNo - 1, $price$$6$$ = $msg$$32_side$$6$$.MDEntryPx / 1E8, $qty$$6$$ = $msg$$32_side$$6$$.MDEntrySize / 1E8, $username$$4$$ = $msg$$32_side$$6$$.Username, $broker$$2$$ = $msg$$32_side$$6$$.Broker, $orderId$$2$$ = $msg$$32_side$$6$$.OrderID, $msg$$32_side$$6$$ = $msg$$32_side$$6$$.MDEntryType;
    "0" == $msg$$32_side$$6$$ ? (0 === $index$$68$$ && $model$$.set("formatted_best_bid_brl", $format_currency$$($price$$6$$, $e$$89_symbol$$8$$.substr(3, 3))), $JSCompiler_StaticMethods_insertOrder$$($order_book_bid$$, $index$$68$$, $orderId$$2$$, $price$$6$$, $qty$$6$$, $username$$4$$, $broker$$2$$)) : "1" == $msg$$32_side$$6$$ && (0 === $index$$68$$ && $model$$.set("formatted_best_offer_brl", $format_currency$$($price$$6$$, $e$$89_symbol$$8$$.substr(3, 3))), $JSCompiler_StaticMethods_insertOrder$$($order_book_offer$$, 
    $index$$68$$, $orderId$$2$$, $price$$6$$, $qty$$6$$, $username$$4$$, $broker$$2$$))
  });
  $bitEx$$.addEventListener("error", function() {
    $goog$dom$classes$add$$(document.body, "ws-not-connected", "bitex-not-logged");
    $goog$dom$classes$remove$$(document.body, "ws-connected", "bitex-logged");
    var $dlg$$ = new $bootstrap$Dialog$$;
    $dlg$$.$title_$ = "Erro";
    $dlg$$.$titleTextEl_$ && $goog$dom$setTextContent$$($dlg$$.$titleTextEl_$, "Erro");
    $dlg$$.$setContent$("Your browser does not support WebSockets.");
    var $JSCompiler_StaticMethods_attachToElement$self$$inline_514_buttons$$inline_418$$ = $JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$);
    $dlg$$.$buttons_$ = $JSCompiler_StaticMethods_attachToElement$self$$inline_514_buttons$$inline_418$$;
    $dlg$$.$buttonEl_$ && ($dlg$$.$buttons_$ ? ($JSCompiler_StaticMethods_attachToElement$self$$inline_514_buttons$$inline_418$$ = $dlg$$.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_514_buttons$$inline_418$$.$element_$ = $dlg$$.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_514_buttons$$inline_418$$.render()) : $dlg$$.$buttonEl_$.innerHTML = "", $goog$style$showElement$$($dlg$$.$buttonEl_$, !!$dlg$$.$buttons_$));
    $dlg$$.$setVisible$($JSCompiler_alias_TRUE$$)
  })
});

