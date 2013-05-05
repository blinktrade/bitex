function e(a) {
  throw a;
}
var j = void 0, k = !0, l = null, p = !1;
function aa() {
  return function(a) {
    return a
  }
}
function r(a) {
  return function() {
    return this[a]
  }
}
function ba(a) {
  return function() {
    return a
  }
}
var s, t = this;
function u() {
}
function ca(a) {
  a.P = function() {
    return a.Ma ? a.Ma : a.Ma = new a
  }
}
function da(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function x(a) {
  return"array" == da(a)
}
function ea(a) {
  var b = da(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function y(a) {
  return"string" == typeof a
}
function z(a) {
  return"function" == da(a)
}
function fa(a) {
  var b = typeof a;
  return"object" == b && a != l || "function" == b
}
function A(a) {
  return a[ga] || (a[ga] = ++ha)
}
var ga = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ha = 0;
function ia(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function ja(a, b, c) {
  a || e(Error());
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
}
function ka(a, b, c) {
  ka = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
  return ka.apply(l, arguments)
}
function la(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
}
function B(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.e = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
}
;function ma(a) {
  if(!na.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(oa, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(pa, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(qa, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(ra, "&quot;"));
  return a
}
var oa = /&/g, pa = /</g, qa = />/g, ra = /\"/g, na = /[&<>\"]/;
var C = Array.prototype, sa = C.indexOf ? function(a, b, c) {
  return C.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == l ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(y(a)) {
    return!y(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, D = C.forEach ? function(a, b, c) {
  C.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = y(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in g && b.call(c, g[f], f, a)
  }
}, ta = C.filter ? function(a, b, c) {
  return C.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = [], f = 0, h = y(a) ? a.split("") : a, m = 0;m < d;m++) {
    if(m in h) {
      var n = h[m];
      b.call(c, n, m, a) && (g[f++] = n)
    }
  }
  return g
}, ua = C.map ? function(a, b, c) {
  return C.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = Array(d), f = y(a) ? a.split("") : a, h = 0;h < d;h++) {
    h in f && (g[h] = b.call(c, f[h], h, a))
  }
  return g
}, va = C.every ? function(a, b, c) {
  return C.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = y(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && !b.call(c, g[f], f, a)) {
      return p
    }
  }
  return k
};
function E(a, b) {
  return 0 <= sa(a, b)
}
function wa(a, b) {
  var c = sa(a, b);
  0 <= c && C.splice.call(a, c, 1)
}
function xa(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
function ya(a, b, c) {
  return 2 >= arguments.length ? C.slice.call(a, b) : C.slice.call(a, b, c)
}
;var za, Aa, Ba, Ca;
function Da() {
  return t.navigator ? t.navigator.userAgent : l
}
Ca = Ba = Aa = za = p;
var Ea;
if(Ea = Da()) {
  var Fa = t.navigator;
  za = 0 == Ea.indexOf("Opera");
  Aa = !za && -1 != Ea.indexOf("MSIE");
  Ba = !za && -1 != Ea.indexOf("WebKit");
  Ca = !za && !Ba && "Gecko" == Fa.product
}
var Ga = za, F = Aa, G = Ca, H = Ba, Ha = t.navigator, I = -1 != (Ha && Ha.platform || "").indexOf("Mac");
function Ia() {
  var a = t.document;
  return a ? a.documentMode : j
}
var Ja;
a: {
  var Ka = "", Ma;
  if(Ga && t.opera) {
    var Na = t.opera.version, Ka = "function" == typeof Na ? Na() : Na
  }else {
    if(G ? Ma = /rv\:([^\);]+)(\)|;)/ : F ? Ma = /MSIE\s+([^\);]+)(\)|;)/ : H && (Ma = /WebKit\/(\S+)/), Ma) {
      var Oa = Ma.exec(Da()), Ka = Oa ? Oa[1] : ""
    }
  }
  if(F) {
    var Pa = Ia();
    if(Pa > parseFloat(Ka)) {
      Ja = String(Pa);
      break a
    }
  }
  Ja = Ka
}
var Qa = {};
function J(a) {
  var b;
  if(!(b = Qa[a])) {
    b = 0;
    for(var c = String(Ja).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), g = Math.max(c.length, d.length), f = 0;0 == b && f < g;f++) {
      var h = c[f] || "", m = d[f] || "", n = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
      do {
        var v = n.exec(h) || ["", "", ""], w = q.exec(m) || ["", "", ""];
        if(0 == v[0].length && 0 == w[0].length) {
          break
        }
        b = ((0 == v[1].length ? 0 : parseInt(v[1], 10)) < (0 == w[1].length ? 0 : parseInt(w[1], 10)) ? -1 : (0 == v[1].length ? 0 : parseInt(v[1], 10)) > (0 == w[1].length ? 0 : parseInt(w[1], 10)) ? 1 : 0) || ((0 == v[2].length) < (0 == w[2].length) ? -1 : (0 == v[2].length) > (0 == w[2].length) ? 1 : 0) || (v[2] < w[2] ? -1 : v[2] > w[2] ? 1 : 0)
      }while(0 == b)
    }
    b = Qa[a] = 0 <= b
  }
  return b
}
var Ra = t.document, Sa = !Ra || !F ? j : Ia() || ("CSS1Compat" == Ra.compatMode ? parseInt(Ja, 10) : 5);
var Ta = !F || F && 9 <= Sa, Ua = !F || F && 9 <= Sa, Va = F && !J("9");
!H || J("528");
G && J("1.9b") || F && J("8") || Ga && J("9.5") || H && J("528");
G && !J("8") || F && J("9");
function K() {
  0 != Wa && (this.bd = Error().stack, A(this))
}
var Wa = 0;
K.prototype.$a = p;
function L(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
s = L.prototype;
s.C = p;
s.defaultPrevented = p;
s.ma = k;
s.stopPropagation = function() {
  this.C = k
};
s.preventDefault = function() {
  this.defaultPrevented = k;
  this.ma = p
};
function Xa(a) {
  Xa[" "](a);
  return a
}
Xa[" "] = u;
function M(a, b) {
  a && this.R(a, b)
}
B(M, L);
var Ya = [1, 4, 2];
s = M.prototype;
s.target = l;
s.relatedTarget = l;
s.offsetX = 0;
s.offsetY = 0;
s.clientX = 0;
s.clientY = 0;
s.screenX = 0;
s.screenY = 0;
s.button = 0;
s.keyCode = 0;
s.charCode = 0;
s.ctrlKey = p;
s.altKey = p;
s.shiftKey = p;
s.metaKey = p;
s.ya = p;
s.v = l;
s.R = function(a, b) {
  var c = this.type = a.type;
  L.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(G) {
      var g;
      a: {
        try {
          Xa(d.nodeName);
          g = k;
          break a
        }catch(f) {
        }
        g = p
      }
      g || (d = l)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = H || a.offsetX !== j ? a.offsetX : a.layerX;
  this.offsetY = H || a.offsetY !== j ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== j ? a.clientX : a.pageX;
  this.clientY = a.clientY !== j ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.ya = I ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.v = a;
  a.defaultPrevented && this.preventDefault();
  delete this.C
};
function Za(a) {
  return Ta ? 0 == a.v.button : "click" == a.type ? k : !!(a.v.button & Ya[0])
}
s.stopPropagation = function() {
  M.e.stopPropagation.call(this);
  this.v.stopPropagation ? this.v.stopPropagation() : this.v.cancelBubble = k
};
s.preventDefault = function() {
  M.e.preventDefault.call(this);
  var a = this.v;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = p, Va) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
function $a() {
}
var ab = 0;
s = $a.prototype;
s.key = 0;
s.D = p;
s.Y = p;
s.R = function(a, b, c, d, g, f) {
  z(a) ? this.Oa = k : a && a.handleEvent && z(a.handleEvent) ? this.Oa = p : e(Error("Invalid listener argument"));
  this.I = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!g;
  this.ea = f;
  this.Y = p;
  this.key = ++ab;
  this.D = p
};
s.handleEvent = function(a) {
  return this.Oa ? this.I.call(this.ea || this.src, a) : this.I.handleEvent.call(this.I, a)
};
function bb(a, b) {
  for(var c in a) {
    b.call(j, a[c], c, a)
  }
}
var cb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function db(a, b) {
  for(var c, d, g = 1;g < arguments.length;g++) {
    d = arguments[g];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < cb.length;f++) {
      c = cb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var eb = {}, O = {}, fb = {}, gb = {};
function hb(a, b, c, d, g) {
  if(x(b)) {
    for(var f = 0;f < b.length;f++) {
      hb(a, b[f], c, d, g)
    }
    return l
  }
  a: {
    b || e(Error("Invalid event type"));
    d = !!d;
    var h = O;
    b in h || (h[b] = {k:0, j:0});
    h = h[b];
    d in h || (h[d] = {k:0, j:0}, h.k++);
    var h = h[d], f = A(a), m;
    h.j++;
    if(h[f]) {
      m = h[f];
      for(var n = 0;n < m.length;n++) {
        if(h = m[n], h.I == c && h.ea == g) {
          if(h.D) {
            break
          }
          m[n].Y = p;
          a = m[n].key;
          break a
        }
      }
    }else {
      m = h[f] = [], h.k++
    }
    var q = ib, v = Ua ? function(a) {
      return q.call(v.src, v.key, a)
    } : function(a) {
      a = q.call(v.src, v.key, a);
      if(!a) {
        return a
      }
    }, n = v;
    n.src = a;
    h = new $a;
    h.R(c, n, a, b, d, g);
    h.Y = p;
    c = h.key;
    n.key = c;
    m.push(h);
    eb[c] = h;
    fb[f] || (fb[f] = []);
    fb[f].push(h);
    a.addEventListener ? (a == t || !a.Da) && a.addEventListener(b, n, d) : a.attachEvent(b in gb ? gb[b] : gb[b] = "on" + b, n);
    a = c
  }
  return a
}
function jb(a, b, c, d, g) {
  if(x(b)) {
    for(var f = 0;f < b.length;f++) {
      jb(a, b[f], c, d, g)
    }
  }else {
    if(d = !!d, a = kb(a, b, d)) {
      for(f = 0;f < a.length;f++) {
        if(a[f].I == c && a[f].capture == d && a[f].ea == g) {
          lb(a[f].key);
          break
        }
      }
    }
  }
}
function lb(a) {
  if(!eb[a]) {
    return p
  }
  var b = eb[a];
  if(b.D) {
    return p
  }
  var c = b.src, d = b.type, g = b.proxy, f = b.capture;
  c.removeEventListener ? (c == t || !c.Da) && c.removeEventListener(d, g, f) : c.detachEvent && c.detachEvent(d in gb ? gb[d] : gb[d] = "on" + d, g);
  c = A(c);
  fb[c] && (g = fb[c], wa(g, b), 0 == g.length && delete fb[c]);
  b.D = k;
  if(b = O[d][f][c]) {
    b.Pa = k, mb(d, f, c, b)
  }
  delete eb[a];
  return k
}
function mb(a, b, c, d) {
  if(!d.la && d.Pa) {
    for(var g = 0, f = 0;g < d.length;g++) {
      d[g].D ? d[g].proxy.src = l : (g != f && (d[f] = d[g]), f++)
    }
    d.length = f;
    d.Pa = p;
    0 == f && (delete O[a][b][c], O[a][b].k--, 0 == O[a][b].k && (delete O[a][b], O[a].k--), 0 == O[a].k && delete O[a])
  }
}
function kb(a, b, c) {
  var d = O;
  return b in d && (d = d[b], c in d && (d = d[c], a = A(a), d[a])) ? d[a] : l
}
function nb(a, b, c, d, g) {
  var f = 1;
  b = A(b);
  if(a[b]) {
    a.j--;
    a = a[b];
    a.la ? a.la++ : a.la = 1;
    try {
      for(var h = a.length, m = 0;m < h;m++) {
        var n = a[m];
        n && !n.D && (f &= ob(n, g) !== p)
      }
    }finally {
      a.la--, mb(c, d, b, a)
    }
  }
  return Boolean(f)
}
function ob(a, b) {
  a.Y && lb(a.key);
  return a.handleEvent(b)
}
function ib(a, b) {
  if(!eb[a]) {
    return k
  }
  var c = eb[a], d = c.type, g = O;
  if(!(d in g)) {
    return k
  }
  var g = g[d], f, h;
  if(!Ua) {
    var m;
    if(!(m = b)) {
      a: {
        m = ["window", "event"];
        for(var n = t;f = m.shift();) {
          if(n[f] != l) {
            n = n[f]
          }else {
            m = l;
            break a
          }
        }
        m = n
      }
    }
    f = m;
    m = k in g;
    n = p in g;
    if(m) {
      if(0 > f.keyCode || f.returnValue != j) {
        return k
      }
      a: {
        var q = p;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(v) {
            q = k
          }
        }
        if(q || f.returnValue == j) {
          f.returnValue = k
        }
      }
    }
    q = new M;
    q.R(f, this);
    f = k;
    try {
      if(m) {
        for(var w = [], La = q.currentTarget;La;La = La.parentNode) {
          w.push(La)
        }
        h = g[k];
        h.j = h.k;
        for(var N = w.length - 1;!q.C && 0 <= N && h.j;N--) {
          q.currentTarget = w[N], f &= nb(h, w[N], d, k, q)
        }
        if(n) {
          h = g[p];
          h.j = h.k;
          for(N = 0;!q.C && N < w.length && h.j;N++) {
            q.currentTarget = w[N], f &= nb(h, w[N], d, p, q)
          }
        }
      }else {
        f = ob(c, q)
      }
    }finally {
      w && (w.length = 0)
    }
    return f
  }
  d = new M(b, this);
  return f = ob(c, d)
}
;function pb() {
  K.call(this)
}
B(pb, K);
s = pb.prototype;
s.Da = k;
s.xa = l;
s.za = function(a) {
  this.xa = a
};
s.addEventListener = function(a, b, c, d) {
  hb(this, a, b, c, d)
};
s.removeEventListener = function(a, b, c, d) {
  jb(this, a, b, c, d)
};
s.dispatchEvent = function(a) {
  var b = a.type || a, c = O;
  if(b in c) {
    if(y(a)) {
      a = new L(a, this)
    }else {
      if(a instanceof L) {
        a.target = a.target || this
      }else {
        var d = a;
        a = new L(b, this);
        db(a, d)
      }
    }
    var d = 1, g, c = c[b], b = k in c, f;
    if(b) {
      g = [];
      for(f = this;f;f = f.xa) {
        g.push(f)
      }
      f = c[k];
      f.j = f.k;
      for(var h = g.length - 1;!a.C && 0 <= h && f.j;h--) {
        a.currentTarget = g[h], d &= nb(f, g[h], a.type, k, a) && a.ma != p
      }
    }
    if(p in c) {
      if(f = c[p], f.j = f.k, b) {
        for(h = 0;!a.C && h < g.length && f.j;h++) {
          a.currentTarget = g[h], d &= nb(f, g[h], a.type, p, a) && a.ma != p
        }
      }else {
        for(g = this;!a.C && g && f.j;g = g.xa) {
          a.currentTarget = g, d &= nb(f, g, a.type, p, a) && a.ma != p
        }
      }
    }
    a = Boolean(d)
  }else {
    a = k
  }
  return a
};
var qb, rb = !F || F && 9 <= Sa;
!G && !F || F && F && 9 <= Sa || G && J("1.9.1");
var sb = F && !J("9");
function tb(a) {
  a = a.className;
  return y(a) && a.match(/\S+/g) || []
}
function P(a, b) {
  for(var c = tb(a), d = ya(arguments, 1), g = c.length + d.length, f = c, h = 0;h < d.length;h++) {
    E(f, d[h]) || f.push(d[h])
  }
  a.className = c.join(" ");
  return c.length == g
}
function ub(a, b) {
  var c = tb(a), d = ya(arguments, 1), g, f = d;
  g = ta(c, function(a) {
    return!E(f, a)
  });
  a.className = g.join(" ");
  return g.length == c.length - d.length
}
;function vb(a, b) {
  this.width = a;
  this.height = b
}
vb.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
vb.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
vb.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
function wb(a) {
  return a ? new xb(yb(a)) : qb || (qb = new xb)
}
function Q(a) {
  return y(a) ? document.getElementById(a) : a
}
function zb(a, b) {
  var c = b || document;
  c.querySelectorAll && c.querySelector ? c = c.querySelector("." + a) : (c = b || document, c = (c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : c.getElementsByClassName ? c.getElementsByClassName(a) : Ab(a, b))[0]);
  return c || l
}
function Ab(a, b) {
  var c, d, g, f;
  c = document;
  c = b || c;
  if(c.querySelectorAll && c.querySelector && a) {
    return c.querySelectorAll("" + (a ? "." + a : ""))
  }
  if(a && c.getElementsByClassName) {
    var h = c.getElementsByClassName(a);
    return h
  }
  h = c.getElementsByTagName("*");
  if(a) {
    f = {};
    for(d = g = 0;c = h[d];d++) {
      var m = c.className;
      "function" == typeof m.split && E(m.split(/\s+/), a) && (f[g++] = c)
    }
    f.length = g;
    return f
  }
  return h
}
var Bb = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function Cb(a, b, c) {
  return Db(document, arguments)
}
function Db(a, b) {
  var c = b[0], d = b[1];
  if(!rb && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', ma(d.name), '"');
    if(d.type) {
      c.push(' type="', ma(d.type), '"');
      var g = {};
      db(g, d);
      delete g.type;
      d = g
    }
    c.push(">");
    c = c.join("")
  }
  var f = a.createElement(c);
  d && (y(d) ? f.className = d : x(d) ? P.apply(l, [f].concat(d)) : bb(d, function(a, b) {
    "style" == b ? f.style.cssText = a : "class" == b ? f.className = a : "for" == b ? f.htmlFor = a : b in Bb ? f.setAttribute(Bb[b], a) : 0 == b.lastIndexOf("aria-", 0) || 0 == b.lastIndexOf("data-", 0) ? f.setAttribute(b, a) : f[b] = a
  }));
  if(2 < b.length) {
    d = function(b) {
      b && f.appendChild(y(b) ? a.createTextNode(b) : b)
    };
    for(c = 2;c < b.length;c++) {
      if(g = b[c], ea(g) && !(fa(g) && 0 < g.nodeType)) {
        var h;
        a: {
          if(g && "number" == typeof g.length) {
            if(fa(g)) {
              h = "function" == typeof g.item || "string" == typeof g.item;
              break a
            }
            if(z(g)) {
              h = "function" == typeof g.item;
              break a
            }
          }
          h = p
        }
        D(h ? xa(g) : g, d)
      }else {
        d(g)
      }
    }
  }
  return f
}
function Eb(a) {
  for(var b;b = a.firstChild;) {
    a.removeChild(b)
  }
}
function R(a) {
  return a.firstElementChild != j ? a.firstElementChild : Fb(a.firstChild)
}
function Gb(a) {
  return a.nextElementSibling != j ? a.nextElementSibling : Fb(a.nextSibling)
}
function Fb(a) {
  for(;a && 1 != a.nodeType;) {
    a = a.nextSibling
  }
  return a
}
function Hb(a, b) {
  if(a.contains && 1 == b.nodeType) {
    return a == b || a.contains(b)
  }
  if("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
}
function yb(a) {
  return 9 == a.nodeType ? a : a.ownerDocument || a.document
}
function Ib(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && 3 == a.firstChild.nodeType) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      Eb(a), a.appendChild(yb(a).createTextNode(b))
    }
  }
}
var Jb = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, Kb = {IMG:" ", BR:"\n"};
function Lb(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, "number" == typeof a && 0 <= a && 32768 > a) : p
}
function Mb(a) {
  var b = [];
  Nb(a, b, p);
  return b.join("")
}
function Nb(a, b, c) {
  if(!(a.nodeName in Jb)) {
    if(3 == a.nodeType) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in Kb) {
        b.push(Kb[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          Nb(a, b, c), a = a.nextSibling
        }
      }
    }
  }
}
function xb(a) {
  this.l = a || t.document || document
}
s = xb.prototype;
s.ra = wb;
s.c = function(a) {
  return y(a) ? this.l.getElementById(a) : a
};
s.o = function(a, b, c) {
  return Db(this.l, arguments)
};
s.createElement = function(a) {
  return this.l.createElement(a)
};
s.createTextNode = function(a) {
  return this.l.createTextNode(a)
};
s.appendChild = function(a, b) {
  a.appendChild(b)
};
s.contains = Hb;
function Ob(a) {
  K.call(this);
  this.Ka = a;
  this.ia = []
}
B(Ob, K);
var Pb = [];
function S(a, b, c, d) {
  x(c) || (Pb[0] = c, c = Pb);
  for(var g = 0;g < c.length;g++) {
    var f = hb(b, c[g], d || a, p, a.Ka || a);
    a.ia.push(f)
  }
  return a
}
function Qb(a, b, c, d, g, f) {
  if(x(c)) {
    for(var h = 0;h < c.length;h++) {
      Qb(a, b, c[h], d, g, f)
    }
  }else {
    a: {
      d = d || a;
      f = f || a.Ka || a;
      g = !!g;
      if(b = kb(b, c, g)) {
        for(c = 0;c < b.length;c++) {
          if(!b[c].D && b[c].I == d && b[c].capture == g && b[c].ea == f) {
            b = b[c];
            break a
          }
        }
      }
      b = l
    }
    b && (b = b.key, lb(b), wa(a.ia, b))
  }
  return a
}
Ob.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
function Rb(a, b, c) {
  var d;
  a: {
    if(d = String(c).replace(/\-([a-z])/g, function(a, b) {
      return b.toUpperCase()
    }), a.style[d] === j) {
      var g = H ? "Webkit" : G ? "Moz" : F ? "ms" : Ga ? "O" : l, f = y(j) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
      c = c.replace(RegExp("(^" + (f ? "|[" + f + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase()
      });
      g += c;
      if(a.style[g] !== j) {
        d = g;
        break a
      }
    }
  }
  d && (a.style[d] = b)
}
function Sb(a, b) {
  var c = yb(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || "" : ""
}
function Tb(a, b) {
  var c = a.style, d = b;
  "number" == typeof d && (d = Math.round(d) + "px");
  c.width = d
}
function Ub(a) {
  if("none" != (Sb(a, "display") || (a.currentStyle ? a.currentStyle.display : l) || a.style && a.style.display)) {
    return Vb(a)
  }
  var b = a.style, c = b.display, d = b.visibility, g = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = Vb(a);
  b.display = c;
  b.position = g;
  b.visibility = d;
  return a
}
function Vb(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = H && !b && !c;
  return(b === j || d) && a.getBoundingClientRect ? (b = a.getBoundingClientRect(), F && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop), new vb(b.right - b.left, b.bottom - b.top)) : new vb(b, c)
}
var Wb = G ? "MozUserSelect" : H ? "WebkitUserSelect" : l;
function Xb() {
}
ca(Xb);
Xb.prototype.mb = 0;
Xb.P();
function T(a) {
  K.call(this);
  this.m = a || wb();
  this.U = Yb
}
B(T, pb);
T.prototype.lb = Xb.P();
var Yb = l;
function Zb(a, b) {
  switch(a) {
    case 1:
      return b ? "disable" : "enable";
    case 2:
      return b ? "highlight" : "unhighlight";
    case 4:
      return b ? "activate" : "deactivate";
    case 8:
      return b ? "select" : "unselect";
    case 16:
      return b ? "check" : "uncheck";
    case 32:
      return b ? "focus" : "blur";
    case 64:
      return b ? "open" : "close"
  }
  e(Error("Invalid component state"))
}
s = T.prototype;
s.fa = l;
s.f = p;
s.a = l;
s.U = l;
s.r = l;
s.M = l;
s.G = l;
s.sb = p;
s.c = r("a");
function $b(a) {
  return a.sa || (a.sa = new Ob(a))
}
s.getParent = r("r");
s.za = function(a) {
  this.r && this.r != a && e(Error("Method not supported"));
  T.e.za.call(this, a)
};
s.ra = r("m");
s.o = function() {
  this.a = this.m.createElement("div")
};
s.T = function(a, b) {
  this.f && e(Error("Component already rendered"));
  this.a || this.o();
  a ? a.insertBefore(this.a, b || l) : this.m.l.body.appendChild(this.a);
  (!this.r || this.r.f) && this.t()
};
s.p = function(a) {
  this.f && e(Error("Component already rendered"));
  if(a && this.L(a)) {
    this.sb = k;
    if(!this.m || this.m.l != yb(a)) {
      this.m = wb(a)
    }
    this.qa(a);
    this.t()
  }else {
    e(Error("Invalid element to decorate"))
  }
};
s.L = ba(k);
s.qa = function(a) {
  this.a = a
};
s.t = function() {
  function a(a) {
    !a.f && a.c() && a.t()
  }
  this.f = k;
  this.M && D(this.M, a, j)
};
s.aa = function() {
  function a(a) {
    a.f && a.aa()
  }
  this.M && D(this.M, a, j);
  if(this.sa) {
    var b = this.sa;
    D(b.ia, lb);
    b.ia.length = 0
  }
  this.f = p
};
s.O = r("a");
s.J = function(a) {
  this.f && e(Error("Component already rendered"));
  this.U = a
};
s.removeChild = function(a, b) {
  if(a) {
    var c = y(a) ? a : a.fa || (a.fa = ":" + (a.lb.mb++).toString(36)), d;
    this.G && c ? (d = this.G, d = (c in d ? d[c] : j) || l) : d = l;
    a = d;
    c && a && (d = this.G, c in d && delete d[c], wa(this.M, a), b && (a.aa(), a.a && (c = a.a) && c.parentNode && c.parentNode.removeChild(c)), c = a, c == l && e(Error("Unable to set parent component")), c.r = l, T.e.za.call(c, l))
  }
  a || e(Error("Child is not in parent component"));
  return a
};
function ac(a) {
  var b = a.type;
  if(b === j) {
    return l
  }
  switch(b.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return a.checked ? a.value : l;
    case "select-one":
      return b = a.selectedIndex, 0 <= b ? a.options[b].value : l;
    case "select-multiple":
      for(var b = [], c, d = 0;c = a.options[d];d++) {
        c.selected && b.push(c.value)
      }
      return b.length ? b : l;
    default:
      return a.value !== j ? a.value : l
  }
}
;function bc(a, b, c, d, g) {
  if(!F && (!H || !J("525"))) {
    return k
  }
  if(I && g) {
    return cc(a)
  }
  if(g && !d || !c && (17 == b || 18 == b || I && 91 == b)) {
    return p
  }
  if(H && d && c) {
    switch(a) {
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
        return p
    }
  }
  if(F && d && b == a) {
    return p
  }
  switch(a) {
    case 13:
      return!(F && F && 9 <= Sa);
    case 27:
      return!H
  }
  return cc(a)
}
function cc(a) {
  if(48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || H && 0 == a) {
    return k
  }
  switch(a) {
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
      return k;
    default:
      return p
  }
}
function dc(a) {
  switch(a) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return a
  }
}
;var ec = {tb:"activedescendant", yb:"atomic", zb:"autocomplete", Bb:"busy", Va:"checked", Gb:"controls", Hb:"describedby", Wa:"disabled", Lb:"dropeffect", Xa:"expanded", Mb:"flowto", Ob:"grabbed", Sb:"haspopup", Ub:"hidden", Wb:"invalid", Xb:"label", Yb:"labelledby", Zb:"level", dc:"live", nc:"multiline", oc:"multiselectable", sc:"orientation", tc:"owns", uc:"posinset", Ya:"pressed", zc:"readonly", Bc:"relevant", Cc:"required", Za:"selected", Jc:"setsize", Lc:"sort", Yc:"valuemax", Zc:"valuemin", 
$c:"valuenow", ad:"valuetext"}, fc = {ub:"alert", vb:"alertdialog", wb:"application", xb:"article", Ab:"banner", Ua:"button", Cb:"checkbox", Db:"columnheader", Eb:"combobox", Fb:"complementary", Ib:"dialog", Jb:"directory", Kb:"document", Nb:"form", Pb:"grid", Qb:"gridcell", Rb:"group", Tb:"heading", Vb:"img", $b:"link", ac:"list", bc:"listbox", cc:"listitem", ec:"log", fc:"main", gc:"marquee", hc:"math", ic:"menu", jc:"menubar", kc:"menuitem", lc:"menuitemcheckbox", mc:"menuitemradio", pc:"navigation", 
qc:"note", rc:"option", vc:"presentation", wc:"progressbar", xc:"radio", yc:"radiogroup", Ac:"region", Dc:"row", Ec:"rowgroup", Fc:"rowheader", Gc:"scrollbar", Hc:"search", Ic:"separator", Kc:"slider", Mc:"spinbutton", Nc:"status", Oc:"tab", Pc:"tablist", Qc:"tabpanel", Rc:"textbox", Sc:"timer", Tc:"toolbar", Uc:"tooltip", Vc:"tree", Wc:"treegrid", Xc:"treeitem"};
function gc() {
}
var hc;
ca(gc);
s = gc.prototype;
s.ba = function() {
};
s.o = function(a) {
  var b = a.ra().o("div", ic(this, a).join(" "), a.H);
  jc(this, a, b);
  return b
};
s.O = aa();
s.N = function(a, b, c) {
  if(a = a.c ? a.c() : a) {
    if(F && !J("7")) {
      var d = kc(tb(a), b);
      d.push(b);
      la(c ? P : ub, a).apply(l, d)
    }else {
      c ? P(a, b) : ub(a, b)
    }
  }
};
s.L = ba(k);
s.p = function(a, b) {
  if(b.id) {
    var c = b.id;
    if(a.r && a.r.G) {
      var d = a.r.G, g = a.fa;
      g in d && delete d[g];
      d = a.r.G;
      c in d && e(Error('The object already contains the key "' + c + '"'));
      d[c] = a
    }
    a.fa = c
  }
  (c = this.O(b)) && c.firstChild ? (c = c.firstChild.nextSibling ? xa(c.childNodes) : c.firstChild, a.H = c) : a.H = l;
  var f = 0, h = this.A(), m = this.A(), n = p, q = p, c = p, d = tb(b);
  D(d, function(a) {
    if(!n && a == h) {
      n = k, m == h && (q = k)
    }else {
      if(!q && a == m) {
        q = k
      }else {
        var b = f;
        if(!this.Ra) {
          this.Z || lc(this);
          var c = this.Z, d = {}, g;
          for(g in c) {
            d[c[g]] = g
          }
          this.Ra = d
        }
        a = parseInt(this.Ra[a], 10);
        f = b | (isNaN(a) ? 0 : a)
      }
    }
  }, this);
  a.d = f;
  n || (d.push(h), m == h && (q = k));
  q || d.push(m);
  (g = a.q) && d.push.apply(d, g);
  if(F && !J("7")) {
    var v = kc(d);
    0 < v.length && (d.push.apply(d, v), c = k)
  }
  if(!n || !q || g || c) {
    b.className = d.join(" ")
  }
  jc(this, a, b);
  return b
};
s.La = function(a) {
  a.U == l && (a.U = "rtl" == (Sb(a.f ? a.a : a.m.l.body, "direction") || ((a.f ? a.a : a.m.l.body).currentStyle ? (a.f ? a.a : a.m.l.body).currentStyle.direction : l) || (a.f ? a.a : a.m.l.body).style && (a.f ? a.a : a.m.l.body).style.direction));
  a.U && this.J(a.c(), k);
  a.isEnabled() && this.W(a, a.z)
};
function jc(a, b, c) {
  b.isEnabled() || a.s(c, 1, k);
  b.d & 8 && a.s(c, 8, k);
  b.g & 16 && a.s(c, 16, !!(b.d & 16));
  b.g & 64 && a.s(c, 64, !!(b.d & 64))
}
s.V = function(a, b) {
  var c = !b, d = F || Ga ? a.getElementsByTagName("*") : l;
  if(Wb) {
    if(c = c ? "none" : "", a.style[Wb] = c, d) {
      for(var g = 0, f;f = d[g];g++) {
        f.style[Wb] = c
      }
    }
  }else {
    if(F || Ga) {
      if(c = c ? "on" : "", a.setAttribute("unselectable", c), d) {
        for(g = 0;f = d[g];g++) {
          f.setAttribute("unselectable", c)
        }
      }
    }
  }
};
s.J = function(a, b) {
  this.N(a, this.A() + "-rtl", b)
};
s.Na = function(a) {
  var b;
  return a.g & 32 && (b = a.B()) ? Lb(b) : p
};
s.W = function(a, b) {
  var c;
  if(a.g & 32 && (c = a.B())) {
    if(!b && a.d & 32) {
      try {
        c.blur()
      }catch(d) {
      }
      a.d & 32 && a.Ea()
    }
    Lb(c) != b && (b ? c.tabIndex = 0 : (c.tabIndex = -1, c.removeAttribute("tabIndex")))
  }
};
s.Ba = function(a, b) {
  a.style.display = b ? "" : "none"
};
s.i = function(a, b, c) {
  var d = a.c();
  if(d) {
    var g = mc(this, b);
    g && this.N(a, g, c);
    this.s(d, b, c)
  }
};
s.s = function(a, b, c) {
  hc || (hc = {1:ec.Wa, 8:ec.Za, 16:ec.Va, 64:ec.Xa});
  (b = hc[b]) && a.setAttribute("aria-" + b, c)
};
s.F = function(a, b) {
  var c = this.O(a);
  if(c && (Eb(c), b)) {
    if(y(b)) {
      Ib(c, b)
    }else {
      var d = function(a) {
        if(a) {
          var b = yb(c);
          c.appendChild(y(a) ? b.createTextNode(a) : a)
        }
      };
      x(b) ? D(b, d) : ea(b) && !("nodeType" in b) ? D(xa(b), d) : d(b)
    }
  }
};
s.B = function(a) {
  return a.c()
};
s.A = ba("goog-control");
function ic(a, b) {
  var c = a.A(), d = [c], g = a.A();
  g != c && d.push(g);
  c = b.d;
  for(g = [];c;) {
    var f = c & -c;
    g.push(mc(a, f));
    c &= ~f
  }
  d.push.apply(d, g);
  (c = b.q) && d.push.apply(d, c);
  F && !J("7") && d.push.apply(d, kc(d));
  return d
}
function kc(a, b) {
  var c = [];
  b && (a = a.concat([b]));
  D([], function(d) {
    va(d, la(E, a)) && (!b || E(d, b)) && c.push(d.join("_"))
  });
  return c
}
function mc(a, b) {
  a.Z || lc(a);
  return a.Z[b]
}
function lc(a) {
  var b = a.A();
  a.Z = {1:b + "-disabled", 2:b + "-hover", 4:b + "-active", 8:b + "-selected", 16:b + "-checked", 32:b + "-focused", 64:b + "-open"}
}
;function nc() {
}
B(nc, gc);
ca(nc);
s = nc.prototype;
s.ba = function() {
  return fc.Ua
};
s.s = function(a, b, c) {
  16 == b ? a.setAttribute("aria-" + ec.Ya, c) : nc.e.s.call(this, a, b, c)
};
s.o = function(a) {
  var b = nc.e.o.call(this, a), c = a.ca();
  c && this.Aa(b, c);
  (c = a.Q()) && this.na(b, c);
  a.g & 16 && this.s(b, 16, !!(a.d & 16));
  return b
};
s.p = function(a, b) {
  b = nc.e.p.call(this, a, b);
  var c = this.Q(b);
  a.Ta = c;
  a.Sa = this.ca(b);
  a.g & 16 && this.s(b, 16, !!(a.d & 16));
  return b
};
s.Q = u;
s.na = u;
s.ca = function(a) {
  return a.title
};
s.Aa = function(a, b) {
  a && (a.title = b || "")
};
s.A = ba("goog-button");
function oc(a, b) {
  K.call(this);
  a && pc(this, a, b)
}
B(oc, pb);
s = oc.prototype;
s.a = l;
s.ga = l;
s.va = l;
s.ha = l;
s.h = -1;
s.w = -1;
s.pa = p;
var qc = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, rc = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, sc = F || 
H && J("525"), tc = I && G;
s = oc.prototype;
s.gb = function(a) {
  if(H && (17 == this.h && !a.ctrlKey || 18 == this.h && !a.altKey || I && 91 == this.h && !a.metaKey)) {
    this.w = this.h = -1
  }
  -1 == this.h && (a.ctrlKey && 17 != a.keyCode ? this.h = 17 : a.altKey && 18 != a.keyCode ? this.h = 18 : a.metaKey && 91 != a.keyCode && (this.h = 91));
  sc && !bc(a.keyCode, this.h, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.w = G ? dc(a.keyCode) : a.keyCode, tc && (this.pa = a.altKey))
};
s.ib = function(a) {
  this.w = this.h = -1;
  this.pa = a.altKey
};
s.handleEvent = function(a) {
  var b = a.v, c, d, g = b.altKey;
  F && "keypress" == a.type ? (c = this.w, d = 13 != c && 27 != c ? b.keyCode : 0) : H && "keypress" == a.type ? (c = this.w, d = 0 <= b.charCode && 63232 > b.charCode && cc(c) ? b.charCode : 0) : Ga ? (c = this.w, d = cc(c) ? b.keyCode : 0) : (c = b.keyCode || this.w, d = b.charCode || 0, tc && (g = this.pa), I && (63 == d && 224 == c) && (c = 191));
  var f = c, h = b.keyIdentifier;
  c ? 63232 <= c && c in qc ? f = qc[c] : 25 == c && a.shiftKey && (f = 9) : h && h in rc && (f = rc[h]);
  a = f == this.h;
  this.h = f;
  b = new uc(f, d, a, b);
  b.altKey = g;
  this.dispatchEvent(b)
};
s.c = r("a");
function pc(a, b, c) {
  a.ha && a.detach();
  a.a = b;
  a.ga = hb(a.a, "keypress", a, c);
  a.va = hb(a.a, "keydown", a.gb, c, a);
  a.ha = hb(a.a, "keyup", a.ib, c, a)
}
s.detach = function() {
  this.ga && (lb(this.ga), lb(this.va), lb(this.ha), this.ha = this.va = this.ga = l);
  this.a = l;
  this.w = this.h = -1
};
function uc(a, b, c, d) {
  d && this.R(d, j);
  this.type = "key";
  this.keyCode = a;
  this.charCode = b;
  this.repeat = c
}
B(uc, M);
function vc(a, b) {
  a || e(Error("Invalid class name " + a));
  z(b) || e(Error("Invalid decorator function " + b))
}
var wc = {};
function U(a, b, c) {
  T.call(this, c);
  if(!b) {
    b = this.constructor;
    for(var d;b;) {
      d = A(b);
      if(d = wc[d]) {
        break
      }
      b = b.e ? b.e.constructor : l
    }
    b = d ? z(d.P) ? d.P() : new d : l
  }
  this.b = b;
  this.H = a
}
B(U, T);
s = U.prototype;
s.H = l;
s.d = 0;
s.g = 39;
s.K = 255;
s.rb = 0;
s.z = k;
s.q = l;
s.ua = k;
s.X = p;
s.Qa = l;
function xc(a) {
  a.f && p != a.ua && yc(a, p);
  a.ua = p
}
s.B = function() {
  return this.b.B(this)
};
s.N = function(a, b) {
  b ? a && (this.q ? E(this.q, a) || this.q.push(a) : this.q = [a], this.b.N(this, a, k)) : a && this.q && (wa(this.q, a), 0 == this.q.length && (this.q = l), this.b.N(this, a, p))
};
s.o = function() {
  var a = this.b.o(this);
  this.a = a;
  var b = this.Qa || this.b.ba();
  b && a.setAttribute("role", b);
  this.X || this.b.V(a, p);
  this.z || this.b.Ba(a, p)
};
s.O = function() {
  return this.b.O(this.c())
};
s.L = function(a) {
  return this.b.L(a)
};
s.qa = function(a) {
  this.a = a = this.b.p(this, a);
  var b = this.Qa || this.b.ba();
  b && a.setAttribute("role", b);
  this.X || this.b.V(a, p);
  this.z = "none" != a.style.display
};
s.t = function() {
  U.e.t.call(this);
  this.b.La(this);
  if(this.g & -2 && (this.ua && yc(this, k), this.g & 32)) {
    var a = this.B();
    if(a) {
      var b = this.wa || (this.wa = new oc);
      pc(b, a);
      S(S(S($b(this), b, "key", this.hb), a, "focus", this.fb), a, "blur", this.Ea)
    }
  }
};
function yc(a, b) {
  var c = $b(a), d = a.c();
  b ? (S(S(S(S(c, d, "mouseover", a.Ia), d, "mousedown", a.Ga), d, "mouseup", a.Ja), d, "mouseout", a.Ha), a.da != u && S(c, d, "contextmenu", a.da), F && S(c, d, "dblclick", a.Fa)) : (Qb(Qb(Qb(Qb(c, d, "mouseover", a.Ia), d, "mousedown", a.Ga), d, "mouseup", a.Ja), d, "mouseout", a.Ha), a.da != u && Qb(c, d, "contextmenu", a.da), F && Qb(c, d, "dblclick", a.Fa))
}
s.aa = function() {
  U.e.aa.call(this);
  this.wa && this.wa.detach();
  this.z && this.isEnabled() && this.b.W(this, p)
};
s.F = function(a) {
  this.b.F(this.c(), a);
  this.H = a
};
function zc(a) {
  a = a.H;
  if(!a) {
    return""
  }
  if(!y(a)) {
    if(x(a)) {
      a = ua(a, Mb).join("")
    }else {
      if(sb && "innerText" in a) {
        a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n")
      }else {
        var b = [];
        Nb(a, b, k);
        a = b.join("")
      }
      a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
      a = a.replace(/\u200B/g, "");
      sb || (a = a.replace(/ +/g, " "));
      " " != a && (a = a.replace(/^\s*/, ""))
    }
  }
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
s.J = function(a) {
  U.e.J.call(this, a);
  var b = this.c();
  b && this.b.J(b, a)
};
s.V = function(a) {
  this.X = a;
  var b = this.c();
  b && this.b.V(b, a)
};
s.Ba = function(a, b) {
  if(b || this.z != a && this.dispatchEvent(a ? "show" : "hide")) {
    var c = this.c();
    c && this.b.Ba(c, a);
    this.isEnabled() && this.b.W(this, a);
    this.z = a;
    return k
  }
  return p
};
s.isEnabled = function() {
  return!(this.d & 1)
};
function Ac(a) {
  var b = V, c = b.getParent();
  if((!c || "function" != typeof c.isEnabled || c.isEnabled()) && W(b, 1, !a)) {
    a || (b.setActive(p), Bc(b, p)), b.z && b.b.W(b, a), b.i(1, !a)
  }
}
function Bc(a, b) {
  W(a, 2, b) && a.i(2, b)
}
s.setActive = function(a) {
  W(this, 4, a) && this.i(4, a)
};
s.i = function(a, b) {
  this.g & a && b != !!(this.d & a) && (this.b.i(this, a, b), this.d = b ? this.d | a : this.d & ~a)
};
function Cc(a) {
  a.f && a.d & 32 && e(Error("Component already rendered"));
  a.d & 32 && a.i(32, p);
  a.g &= -33
}
function X(a, b) {
  return!!(a.K & b) && !!(a.g & b)
}
function W(a, b, c) {
  return!!(a.g & b) && !!(a.d & b) != c && (!(a.rb & b) || a.dispatchEvent(Zb(b, c))) && !a.$a
}
s.Ia = function(a) {
  (!a.relatedTarget || !Hb(this.c(), a.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && X(this, 2)) && Bc(this, k)
};
s.Ha = function(a) {
  if((!a.relatedTarget || !Hb(this.c(), a.relatedTarget)) && this.dispatchEvent("leave")) {
    X(this, 4) && this.setActive(p), X(this, 2) && Bc(this, p)
  }
};
s.da = u;
s.Ga = function(a) {
  if(this.isEnabled() && (X(this, 2) && Bc(this, k), Za(a) && (!H || !I || !a.ctrlKey))) {
    X(this, 4) && this.setActive(k), this.b.Na(this) && this.B().focus()
  }
  !this.X && (Za(a) && (!H || !I || !a.ctrlKey)) && a.preventDefault()
};
s.Ja = function(a) {
  this.isEnabled() && (X(this, 2) && Bc(this, k), this.d & 4 && (this.S(a) && X(this, 4)) && this.setActive(p))
};
s.Fa = function(a) {
  this.isEnabled() && this.S(a)
};
s.S = function(a) {
  if(X(this, 16)) {
    var b = !(this.d & 16);
    W(this, 16, b) && this.i(16, b)
  }
  X(this, 8) && W(this, 8, k) && this.i(8, k);
  X(this, 64) && (b = !(this.d & 64), W(this, 64, b) && this.i(64, b));
  b = new L("action", this);
  a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.ya = a.ya);
  return this.dispatchEvent(b)
};
s.fb = function() {
  X(this, 32) && W(this, 32, k) && this.i(32, k)
};
s.Ea = function() {
  X(this, 4) && this.setActive(p);
  X(this, 32) && W(this, 32, p) && this.i(32, p)
};
s.hb = function(a) {
  return this.z && this.isEnabled() && this.ta(a) ? (a.preventDefault(), a.stopPropagation(), k) : p
};
s.ta = function(a) {
  return 13 == a.keyCode && this.S(a)
};
z(U) || e(Error("Invalid component class " + U));
z(gc) || e(Error("Invalid renderer class " + gc));
var Dc = A(U);
wc[Dc] = gc;
vc("goog-control", function() {
  return new U(l)
});
function Ec() {
}
B(Ec, nc);
ca(Ec);
s = Ec.prototype;
s.ba = function() {
};
s.o = function(a) {
  xc(a);
  a.K &= -256;
  Cc(a);
  return a.ra().o("button", {"class":ic(this, a).join(" "), disabled:!a.isEnabled(), title:a.ca() || "", value:a.Q() || ""}, zc(a) || "")
};
s.L = function(a) {
  return"BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
};
s.p = function(a, b) {
  xc(a);
  a.K &= -256;
  Cc(a);
  b.disabled && P(b, mc(this, 1));
  return Ec.e.p.call(this, a, b)
};
s.La = function(a) {
  S($b(a), a.c(), "click", a.S)
};
s.V = u;
s.J = u;
s.Na = function(a) {
  return a.isEnabled()
};
s.W = u;
s.i = function(a, b, c) {
  Ec.e.i.call(this, a, b, c);
  if((a = a.c()) && 1 == b) {
    a.disabled = c
  }
};
s.Q = function(a) {
  return a.value
};
s.na = function(a, b) {
  a && (a.value = b)
};
s.s = u;
function Fc(a, b, c) {
  U.call(this, a, b || Ec.P(), c)
}
B(Fc, U);
s = Fc.prototype;
s.Q = r("Ta");
s.na = function(a) {
  this.Ta = a;
  this.b.na(this.c(), a)
};
s.ca = r("Sa");
s.Aa = function(a) {
  this.Sa = a;
  this.b.Aa(this.c(), a)
};
s.t = function() {
  Fc.e.t.call(this);
  if(this.g & 32) {
    var a = this.B();
    a && S($b(this), a, "keyup", this.ta)
  }
};
s.ta = function(a) {
  return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.S(a) : 32 == a.keyCode
};
vc("goog-button", function() {
  return new Fc(l)
});
function Gc() {
  K.call(this)
}
B(Gc, pb);
s = Gc.prototype;
s.n = l;
s.open = function(a) {
  "WebSocket" in window ? this.n = new WebSocket(a) : "MozWebSocket" in window ? this.n = new MozWebSocket(a) : e("WebSockets are not available");
  this.n.onopen = ka(this.qb, this);
  this.n.onclose = ka(this.nb, this);
  this.n.onmessage = ka(this.pb, this);
  this.n.onerror = ka(this.ob, this)
};
s.qb = function() {
  this.dispatchEvent("opened")
};
s.nb = function() {
  this.dispatchEvent("closed")
};
s.ob = function() {
  this.dispatchEvent("error")
};
s.pb = function(a) {
  a = JSON.parse(a.data);
  this.dispatchEvent(new Y("raw_message", a));
  switch(a.MsgType) {
    case "0":
      this.dispatchEvent(new Y("heartbeat", a));
      break;
    case "BF":
      1 == a.UserStatus ? this.dispatchEvent(new Y("login_ok", a)) : this.dispatchEvent(new Y("login_error", a));
      break;
    case "U3":
      this.dispatchEvent(new Y("balance_response", a));
      break;
    case "U5":
      this.dispatchEvent(new Y("order_list_response", a));
      break;
    case "W":
      if(1 != a.MarketDepth) {
        this.dispatchEvent(new Y("ob_clear"));
        this.dispatchEvent(new Y("trade_clear"));
        for(var b in a.MDFullGrp) {
          var c = a.MDFullGrp[b];
          switch(c.MDEntryType) {
            case "0":
            ;
            case "1":
              this.dispatchEvent(new Y("ob_new_order", c));
              break;
            case "2":
              this.dispatchEvent(new Y("trade", c))
          }
        }
      }
      this.dispatchEvent(new Y("md_full_refresh", a));
      break;
    case "X":
      if("3" == a.MDBkTyp) {
        for(b in a.MDIncGrp) {
          switch(c = a.MDIncGrp[b], c.MDEntryType) {
            case "0":
            ;
            case "1":
              switch(c.MDUpdateAction) {
                case "0":
                  this.dispatchEvent(new Y("ob_new_order", c));
                  break;
                case "1":
                  this.dispatchEvent(new Y("ob_update_order", c));
                  break;
                case "2":
                  this.dispatchEvent(new Y("ob_delete_order", c));
                  break;
                case "3":
                  this.dispatchEvent(new Y("ob_delete_orders_thru", c))
              }
              break;
            case "2":
              this.dispatchEvent(new Y("trade", c))
          }
        }
      }
      this.dispatchEvent(new Y("md_incremental_refresh", a));
      break;
    case "Y":
      this.dispatchEvent(new Y("md_request_reject", a));
      break;
    case "8":
      this.dispatchEvent(new Y("execution_report", a))
  }
};
s.close = function() {
  this.n.close();
  this.n = l
};
function Y(a, b) {
  L.call(this, a);
  this.data = b
}
B(Y, L);
function Hc(a, b) {
  T.call(this, b);
  this.$ = a;
  this.u = 0;
  this.ja = 100;
  this.ka = Cb("div", ["progress", "progress-striped", "active"], Cb("div", "bar"));
  Tb(this.ka, "50%");
  var c = this.ka;
  y("margin") ? Rb(c, "auto", "margin") : bb("margin", la(Rb, c));
  Tb(R(this.ka), "100%")
}
B(Hc, T);
s = Hc.prototype;
s.qa = function(a) {
  this.a = a;
  var b = R(a);
  P(b, "datagrid");
  var c = R(b);
  R(R(c)).setAttribute("colspan", this.$.length);
  this.Ca = Cb("tr");
  D(this.$, function(a) {
    var b = {"data-property":a.property};
    a.sortable && (b["class"] = "sortable");
    a = Cb("th", b, a.label);
    this.Ca.appendChild(a)
  }, this);
  c.appendChild(this.Ca);
  this.oa = R(R(Gb(b)));
  this.eb = zb("grid-start", a);
  this.ab = zb("grid-end", a);
  this.cb = zb("grid-prevpage", a);
  this.bb = zb("grid-nextpage", a)
};
s.kb = function() {
  0 >= this.u || (this.u -= 1, this.T())
};
s.jb = function() {
  this.u += 1;
  this.T()
};
s.T = function() {
  Ib(this.eb, this.u * this.ja + 1);
  Ib(this.ab, this.u * this.ja + this.ja);
  var a = {Page:this.u, Limit:this.ja}, b = [];
  D(this.$, function(a) {
    a = a.property;
    a != l && b.push(a)
  }, this);
  a.Columns = b;
  this.dispatchEvent(new Ic("request_data", a));
  Eb(this.oa);
  this.oa.appendChild(this.ka)
};
s.t = function() {
  Hc.e.t.call(this);
  var a = $b(this);
  S(a, this.cb, "click", this.kb);
  S(a, this.bb, "click", this.jb);
  this.T()
};
s.reload = function() {
  this.T()
};
function Ic(a, b) {
  L.call(this, a);
  this.options = b
}
B(Ic, L);
var Z = new Gc, Jc = new Fc;
Jc.p(Q("id_btn_login"));
var V = new Fc;
V.p(Q("btn_ws_connect"));
var Kc = new Fc;
Kc.p(Q("id_deposit"));
var Lc = new Hc([{property:"first_name", label:"First Name", sortable:k, formatter:aa()}, {property:"last_name", label:"Last Name", sortable:k, formatter:aa()}, {property:"email", label:"Email", sortable:k, formatter:aa()}, {property:"balance_btc", label:"BTC", sortable:k, formatter:function(a) {
  return(a / 1E8).toFixed(8)
}}, {property:"balance_brl", label:"R$", sortable:k, formatter:function(a) {
  return(a / 1E5).toFixed(5)
}}, {property:"verified", label:"Verified", sortable:k, formatter:function(a) {
  return a ? "Y" : "N"
}}, {property:"id", label:"Actions", sortable:k, formatter:function(a) {
  return Cb("button", {"class":"btn btn-mini btn-primary btn-deposit", "data-user-id":a}, "deposit")
}}]);
Z.addEventListener("opened", function() {
  V.F("Desconectar");
  Ac(k);
  ub(document.body, "ws-not-connected");
  P(document.body, "ws-connected")
});
Z.addEventListener("closed", function() {
  V.F("Connectar");
  Ac(k);
  P(document.body, "ws-not-connected", "bitex-not-logged");
  ub(document.body, "ws-connected", "bitex-logged")
});
Z.addEventListener("error", function() {
  P(document.body, "ws-not-connected", "bitex-not-logged");
  ub(document.body, "ws-connected", "bitex-logged");
  V.F("Connectar");
  Ac(k);
  Ib(Q("websocket_error_msg"), "Erro se conectando c/ o servidor");
  $("#error_websocket_modal").modal()
});
Lc.addEventListener("request_data", la(function(a, b) {
  var c = b.options;
  c.MsgType = "ADMIN_SELECT";
  c.Table = a;
  Z.n.send(JSON.stringify(c))
}, "users"));
Z.addEventListener("raw_message", function(a) {
  a = a.data;
  if("ADMIN_SELECT_RESPONSE" == a.MsgType) {
    switch(a.Table) {
      case "users":
        a = a.ResultSet;
        Eb(Lc.oa);
        var b = l;
        D(a, function(a) {
          var c = Cb("tr");
          D(a, function(a, b) {
            var d = Cb("td", j, (0,this.$[b].formatter)(a));
            c.appendChild(d)
          }, this);
          this.oa.appendChild(c);
          b != l || (b = c)
        }, Lc);
        if(b != l) {
          a = R(Lc.Ca);
          for(var c = R(b);c != l;) {
            var d = Ub(c);
            Tb(a, d.width);
            d = Ub(a);
            Tb(c, d.width);
            a = Gb(a);
            c = Gb(c)
          }
        }
    }
  }
});
Z.addEventListener("login_ok", function() {
  P(document.body, "bitex-logged");
  ub(document.body, "bitex-not-logged");
  Lc.p(Q("user_list_data_grid"));
  hb(Lc.c(), "click", function(a) {
    if(E(tb(a.target), "btn-deposit")) {
      var b = a.target.getAttribute("data-user-id");
      a = Q("id_deposit_user_id");
      var c = a.type;
      if(c !== j) {
        switch(c.toLowerCase()) {
          case "checkbox":
          ;
          case "radio":
            a.checked = b ? "checked" : l;
            break;
          case "select-one":
            a.selectedIndex = -1;
            if(y(b)) {
              for(var d = 0;c = a.options[d];d++) {
                if(c.value == b) {
                  c.selected = k;
                  break
                }
              }
            }
            break;
          case "select-multiple":
            y(b) && (b = [b]);
            for(d = 0;c = a.options[d];d++) {
              if(c.selected = p, b) {
                for(var g, f = 0;g = b[f];f++) {
                  c.value == g && (c.selected = k)
                }
              }
            }
            break;
          default:
            a.value = b != l ? b : ""
        }
      }
      $("#deposit_modal").modal()
    }
  })
});
Z.addEventListener("login_error", function(a) {
  a = a.data;
  P(document.body, "bitex-not-logged");
  ub(document.body, "bitex-logged");
  alert(a.UserStatusText)
});
Kc.addEventListener("action", function(a) {
  if($("#deposit-form").parsley("validate")) {
    var b = ac(Q("id_deposit_currency")), c = ac(Q("id_deposit_amount")), d = ac(Q("id_deposit_user_id")), g = ac(Q("id_deposit_origin"));
    if("BRL" == b || "USD" == b) {
      c = parseInt(1E5 * c, 10)
    }else {
      if("BTC" == b || "LTC" == b) {
        c = parseInt(1E8 * c, 10)
      }else {
        alert("invalid currency code");
        a.stopPropagation();
        return
      }
    }
    0 === c ? (alert("invalid amount"), a.stopPropagation()) : (Z.n.send(JSON.stringify({MsgType:"DEPOSIT", UserID:d, Origin:g, Amount:c, Currency:b})), Lc.reload())
  }else {
    a.stopPropagation()
  }
});
Jc.addEventListener("action", function() {
  var a = ac(Q("id_username")), b = ac(Q("id_password"));
  Z.n.send(JSON.stringify({MsgType:"BE", UserReqID:"1", Username:a, Password:b, UserReqTyp:"1"}))
});
V.addEventListener("action", function() {
  var a = ac(Q("ws_url"));
  if(E(tb(document.body), "ws-not-connected")) {
    V.F("Loading ...");
    Ac(p);
    try {
      Z.open(a)
    }catch(b) {
      $("#no_websockets_modal").modal()
    }
  }else {
    V.F("Loading ..."), Ac(p), Z.close()
  }
});

