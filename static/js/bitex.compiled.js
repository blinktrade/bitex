var h = void 0, j = !0, m = null, n = !1, p, t = this;
function u(a) {
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
function v(a) {
  return a[aa] || (a[aa] = ++ba)
}
var aa = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ba = 0;
function ca(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function da(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, e);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
}
function w(a, b, c) {
  w = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
  return w.apply(m, arguments)
}
function x(a, b) {
  y.prototype[a] = b
}
function A(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.H = b.prototype;
  a.prototype = new c
}
;var B = Array.prototype, ea = B.indexOf ? function(a, b, c) {
  return B.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == m ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if("string" == typeof a) {
    return"string" != typeof b || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
var C, D, E, F;
function fa() {
  return t.navigator ? t.navigator.userAgent : m
}
F = E = D = C = n;
var G;
if(G = fa()) {
  var ga = t.navigator;
  C = 0 == G.indexOf("Opera");
  D = !C && -1 != G.indexOf("MSIE");
  E = !C && -1 != G.indexOf("WebKit");
  F = !C && !E && "Gecko" == ga.product
}
var ha = C, H = D, I = F, J = E, ia = t.navigator, ja = -1 != (ia && ia.platform || "").indexOf("Mac");
function ka() {
  var a = t.document;
  return a ? a.documentMode : h
}
var K;
a: {
  var L = "", M;
  if(ha && t.opera) {
    var la = t.opera.version, L = "function" == typeof la ? la() : la
  }else {
    if(I ? M = /rv\:([^\);]+)(\)|;)/ : H ? M = /MSIE\s+([^\);]+)(\)|;)/ : J && (M = /WebKit\/(\S+)/), M) {
      var ma = M.exec(fa()), L = ma ? ma[1] : ""
    }
  }
  if(H) {
    var na = ka();
    if(na > parseFloat(L)) {
      K = String(na);
      break a
    }
  }
  K = L
}
var oa = {};
function N(a) {
  var b;
  if(!(b = oa[a])) {
    b = 0;
    for(var c = String(K).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, e.length), d = 0;0 == b && d < f;d++) {
      var g = c[d] || "", l = e[d] || "", k = RegExp("(\\d*)(\\D*)", "g"), r = RegExp("(\\d*)(\\D*)", "g");
      do {
        var s = k.exec(g) || ["", "", ""], q = r.exec(l) || ["", "", ""];
        if(0 == s[0].length && 0 == q[0].length) {
          break
        }
        b = ((0 == s[1].length ? 0 : parseInt(s[1], 10)) < (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? -1 : (0 == s[1].length ? 0 : parseInt(s[1], 10)) > (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? 1 : 0) || ((0 == s[2].length) < (0 == q[2].length) ? -1 : (0 == s[2].length) > (0 == q[2].length) ? 1 : 0) || (s[2] < q[2] ? -1 : s[2] > q[2] ? 1 : 0)
      }while(0 == b)
    }
    b = oa[a] = 0 <= b
  }
  return b
}
var pa = t.document, qa = !pa || !H ? h : ka() || ("CSS1Compat" == pa.compatMode ? parseInt(K, 10) : 5);
var ra;
if(!(ra = !H)) {
  ra = H && 9 <= qa
}
var sa = ra, ta = H && !N("9");
!J || N("528");
I && N("1.9b") || H && N("8") || ha && N("9.5") || J && N("528");
I && !N("8") || H && N("9");
function ua() {
  0 != va && (this.K = Error().stack, v(this))
}
var va = 0;
function O(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
O.prototype.d = n;
O.prototype.defaultPrevented = n;
O.prototype.j = j;
O.prototype.preventDefault = function() {
  this.defaultPrevented = j;
  this.j = n
};
function wa(a) {
  wa[" "](a);
  return a
}
wa[" "] = function() {
};
function P(a, b) {
  a && this.h(a, b)
}
A(P, O);
p = P.prototype;
p.target = m;
p.relatedTarget = m;
p.offsetX = 0;
p.offsetY = 0;
p.clientX = 0;
p.clientY = 0;
p.screenX = 0;
p.screenY = 0;
p.button = 0;
p.keyCode = 0;
p.charCode = 0;
p.ctrlKey = n;
p.altKey = n;
p.shiftKey = n;
p.metaKey = n;
p.z = n;
p.m = m;
p.h = function(a, b) {
  var c = this.type = a.type;
  O.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var e = a.relatedTarget;
  if(e) {
    if(I) {
      var f;
      a: {
        try {
          wa(e.nodeName);
          f = j;
          break a
        }catch(d) {
        }
        f = n
      }
      f || (e = m)
    }
  }else {
    "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement)
  }
  this.relatedTarget = e;
  this.offsetX = J || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = J || a.offsetY !== h ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== h ? a.clientX : a.pageX;
  this.clientY = a.clientY !== h ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.z = ja ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.m = a;
  a.defaultPrevented && this.preventDefault();
  delete this.d
};
p.preventDefault = function() {
  P.H.preventDefault.call(this);
  var a = this.m;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = n, ta) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
function xa() {
}
var ya = 0;
p = xa.prototype;
p.key = 0;
p.e = n;
p.g = n;
p.h = function(a, b, c, e, f, d) {
  if("function" == u(a)) {
    this.n = j
  }else {
    if(a && a.handleEvent && "function" == u(a.handleEvent)) {
      this.n = n
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.f = a;
  this.proxy = b;
  this.src = c;
  this.type = e;
  this.capture = !!f;
  this.k = d;
  this.g = n;
  this.key = ++ya;
  this.e = n
};
p.handleEvent = function(a) {
  return this.n ? this.f.call(this.k || this.src, a) : this.f.handleEvent.call(this.f, a)
};
var za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Aa(a, b) {
  for(var c, e, f = 1;f < arguments.length;f++) {
    e = arguments[f];
    for(c in e) {
      a[c] = e[c]
    }
    for(var d = 0;d < za.length;d++) {
      c = za[d], Object.prototype.hasOwnProperty.call(e, c) && (a[c] = e[c])
    }
  }
}
;var Q = {}, R = {}, S = {}, T = {};
function Ba(a, b, c, e, f) {
  if("array" == u(b)) {
    for(var d = 0;d < b.length;d++) {
      Ba(a, b[d], c, e, f)
    }
  }else {
    a: {
      if(!b) {
        throw Error("Invalid event type");
      }
      e = !!e;
      var g = R;
      b in g || (g[b] = {c:0, b:0});
      g = g[b];
      e in g || (g[e] = {c:0, b:0}, g.c++);
      var g = g[e], d = v(a), l;
      g.b++;
      if(g[d]) {
        l = g[d];
        for(var k = 0;k < l.length;k++) {
          if(g = l[k], g.f == c && g.k == f) {
            if(g.e) {
              break
            }
            l[k].g = n;
            break a
          }
        }
      }else {
        l = g[d] = [], g.c++
      }
      var r = Ca, s = sa ? function(a) {
        return r.call(s.src, s.key, a)
      } : function(a) {
        a = r.call(s.src, s.key, a);
        if(!a) {
          return a
        }
      }, k = s;
      k.src = a;
      g = new xa;
      g.h(c, k, a, b, e, f);
      g.g = n;
      c = g.key;
      k.key = c;
      l.push(g);
      Q[c] = g;
      S[d] || (S[d] = []);
      S[d].push(g);
      a.addEventListener ? (a == t || !a.l) && a.addEventListener(b, k, e) : a.attachEvent(b in T ? T[b] : T[b] = "on" + b, k)
    }
  }
}
function Da(a, b, c, e, f) {
  if("array" == u(b)) {
    for(var d = 0;d < b.length;d++) {
      Da(a, b[d], c, e, f)
    }
  }else {
    e = !!e;
    a: {
      d = R;
      if(b in d && (d = d[b], e in d && (d = d[e], a = v(a), d[a]))) {
        a = d[a];
        break a
      }
      a = m
    }
    if(a) {
      for(d = 0;d < a.length;d++) {
        if(a[d].f == c && a[d].capture == e && a[d].k == f) {
          Ea(a[d].key);
          break
        }
      }
    }
  }
}
function Ea(a) {
  if(Q[a]) {
    var b = Q[a];
    if(!b.e) {
      var c = b.src, e = b.type, f = b.proxy, d = b.capture;
      c.removeEventListener ? (c == t || !c.l) && c.removeEventListener(e, f, d) : c.detachEvent && c.detachEvent(e in T ? T[e] : T[e] = "on" + e, f);
      c = v(c);
      if(S[c]) {
        var f = S[c], g = ea(f, b);
        0 <= g && B.splice.call(f, g, 1);
        0 == f.length && delete S[c]
      }
      b.e = j;
      if(b = R[e][d][c]) {
        b.o = j, Fa(e, d, c, b)
      }
      delete Q[a]
    }
  }
}
function Fa(a, b, c, e) {
  if(!e.i && e.o) {
    for(var f = 0, d = 0;f < e.length;f++) {
      e[f].e ? e[f].proxy.src = m : (f != d && (e[d] = e[f]), d++)
    }
    e.length = d;
    e.o = n;
    0 == d && (delete R[a][b][c], R[a][b].c--, 0 == R[a][b].c && (delete R[a][b], R[a].c--), 0 == R[a].c && delete R[a])
  }
}
function U(a, b, c, e, f) {
  var d = 1;
  b = v(b);
  if(a[b]) {
    a.b--;
    a = a[b];
    a.i ? a.i++ : a.i = 1;
    try {
      for(var g = a.length, l = 0;l < g;l++) {
        var k = a[l];
        k && !k.e && (d &= Ga(k, f) !== n)
      }
    }finally {
      a.i--, Fa(c, e, b, a)
    }
  }
  return Boolean(d)
}
function Ga(a, b) {
  a.g && Ea(a.key);
  return a.handleEvent(b)
}
function Ca(a, b) {
  if(!Q[a]) {
    return j
  }
  var c = Q[a], e = c.type, f = R;
  if(!(e in f)) {
    return j
  }
  var f = f[e], d, g;
  if(!sa) {
    var l;
    if(!(l = b)) {
      a: {
        l = ["window", "event"];
        for(var k = t;d = l.shift();) {
          if(k[d] != m) {
            k = k[d]
          }else {
            l = m;
            break a
          }
        }
        l = k
      }
    }
    d = l;
    l = j in f;
    k = n in f;
    if(l) {
      if(0 > d.keyCode || d.returnValue != h) {
        return j
      }
      a: {
        var r = n;
        if(0 == d.keyCode) {
          try {
            d.keyCode = -1;
            break a
          }catch(s) {
            r = j
          }
        }
        if(r || d.returnValue == h) {
          d.returnValue = j
        }
      }
    }
    r = new P;
    r.h(d, this);
    d = j;
    try {
      if(l) {
        for(var q = [], W = r.currentTarget;W;W = W.parentNode) {
          q.push(W)
        }
        g = f[j];
        g.b = g.c;
        for(var z = q.length - 1;!r.d && 0 <= z && g.b;z--) {
          r.currentTarget = q[z], d &= U(g, q[z], e, j, r)
        }
        if(k) {
          g = f[n];
          g.b = g.c;
          for(z = 0;!r.d && z < q.length && g.b;z++) {
            r.currentTarget = q[z], d &= U(g, q[z], e, n, r)
          }
        }
      }else {
        d = Ga(c, r)
      }
    }finally {
      q && (q.length = 0)
    }
    return d
  }
  e = new P(b, this);
  return d = Ga(c, e)
}
;function Ha() {
  ua.call(this)
}
A(Ha, ua);
p = Ha.prototype;
p.l = j;
p.p = m;
p.addEventListener = function(a, b, c, e) {
  Ba(this, a, b, c, e)
};
p.removeEventListener = function(a, b, c, e) {
  Da(this, a, b, c, e)
};
p.dispatchEvent = function(a) {
  var b = a.type || a, c = R;
  if(b in c) {
    if("string" == typeof a) {
      a = new O(a, this)
    }else {
      if(a instanceof O) {
        a.target = a.target || this
      }else {
        var e = a;
        a = new O(b, this);
        Aa(a, e)
      }
    }
    var e = 1, f, c = c[b], b = j in c, d;
    if(b) {
      f = [];
      for(d = this;d;d = d.p) {
        f.push(d)
      }
      d = c[j];
      d.b = d.c;
      for(var g = f.length - 1;!a.d && 0 <= g && d.b;g--) {
        a.currentTarget = f[g], e &= U(d, f[g], a.type, j, a) && a.j != n
      }
    }
    if(n in c) {
      if(d = c[n], d.b = d.c, b) {
        for(g = 0;!a.d && g < f.length && d.b;g++) {
          a.currentTarget = f[g], e &= U(d, f[g], a.type, n, a) && a.j != n
        }
      }else {
        for(f = this;!a.d && f && d.b;f = f.p) {
          a.currentTarget = f, e &= U(d, f, a.type, n, a) && a.j != n
        }
      }
    }
    a = Boolean(e)
  }else {
    a = j
  }
  return a
};
function y() {
  ua.call(this)
}
A(y, Ha);
p = y.prototype;
p.a = m;
p.open = function(a) {
  if("WebSocket" in window) {
    this.a = new WebSocket(a)
  }else {
    if("MozWebSocket" in window) {
      this.a = new MozWebSocket(a)
    }else {
      throw"WebSockets are not available";
    }
  }
  this.a.onopen = w(this.w, this);
  this.a.onclose = w(this.t, this);
  this.a.onmessage = w(this.v, this);
  this.a.onerror = w(this.u, this)
};
p.w = function() {
  this.dispatchEvent("opened")
};
p.t = function() {
  this.dispatchEvent("closed")
};
p.u = function() {
  this.dispatchEvent("error")
};
p.v = function(a) {
  a = JSON.parse(a.data);
  this.dispatchEvent(new V("raw_message", a));
  switch(a.MsgType) {
    case "0":
      this.dispatchEvent(new V("heartbeat", a));
      break;
    case "BF":
      1 == a.UserStatus ? this.dispatchEvent(new V("login_ok", a)) : this.dispatchEvent(new V("login_error", a));
      break;
    case "U3":
      this.dispatchEvent(new V("balance_response", a));
      break;
    case "U5":
      this.dispatchEvent(new V("order_list_response", a));
      break;
    case "W":
      if(1 != a.MarketDepth) {
        this.dispatchEvent(new V("ob_clear"));
        this.dispatchEvent(new V("trade_clear"));
        for(var b in a.MDFullGrp) {
          var c = a.MDFullGrp[b];
          switch(c.MDEntryType) {
            case "0":
            ;
            case "1":
              this.dispatchEvent(new V("ob_new_order", c));
              break;
            case "2":
              this.dispatchEvent(new V("trade", c))
          }
        }
      }
      this.dispatchEvent(new V("md_full_refresh", a));
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
                  this.dispatchEvent(new V("ob_new_order", c));
                  break;
                case "1":
                  this.dispatchEvent(new V("ob_update_order", c));
                  break;
                case "2":
                  this.dispatchEvent(new V("ob_delete_order", c));
                  break;
                case "3":
                  this.dispatchEvent(new V("ob_delete_orders_thru", c))
              }
              break;
            case "2":
              this.dispatchEvent(new V("trade", c))
          }
        }
      }
      this.dispatchEvent(new V("md_incremental_refresh", a));
      break;
    case "Y":
      this.dispatchEvent(new V("md_request_reject", a));
      break;
    case "8":
      this.dispatchEvent(new V("execution_report", a))
  }
};
p.close = function() {
  this.a.close();
  this.a = m
};
p.s = function(a, b) {
  this.a.send(JSON.stringify({MsgType:"BE", UserReqID:"1", Username:a, Password:b, UserReqTyp:"1"}))
};
p.r = function(a, b) {
  this.a.send(JSON.stringify({MsgType:"BE", UserReqID:"3", Password:a, NewPassword:b}))
};
p.G = function(a, b, c) {
  var e = parseInt(1E6 * Math.random(), 10);
  this.a.send(JSON.stringify({MsgType:"V", MDReqID:e, SubscriptionRequestType:"1", MarketDepth:a, MDUpdateType:"1", MDEntryTypes:c, Instruments:b}));
  return e
};
p.J = function(a) {
  this.a.send(JSON.stringify({MsgType:"V", MDReqID:a, SubscriptionRequestType:"2"}))
};
p.F = function(a, b, c, e, f) {
  this.a.send(JSON.stringify({MsgType:"U0", Username:a, Password:b, FirstName:c, LastName:e, Email:f}))
};
p.A = function(a) {
  a = a || parseInt(1E7 * Math.random(), 10);
  this.a.send(JSON.stringify({MsgType:"U4", OpenOrdersReqID:a}));
  return a
};
function Ia(a, b, c, e, f, d) {
  d = d || parseInt(1E7 * Math.random(), 10);
  e = parseInt(1E5 * e, 10);
  c = parseInt(1E8 * c, 10);
  a.a.send(JSON.stringify({MsgType:"D", ClOrdID:"" + d, Symbol:b, Side:f, OrdType:"2", Price:e, OrderQty:c}));
  return d
}
p.q = function(a, b) {
  var c = {MsgType:"F"};
  a ? c.OrigClOrdID = a : b && (c.OrderID = b);
  this.a.send(JSON.stringify(c))
};
p.C = function(a) {
  this.a.send(JSON.stringify(a))
};
p.B = function(a, b, c, e) {
  return Ia(this, a, b, c, "1", e)
};
p.D = function(a, b, c, e) {
  return Ia(this, a, b, c, "2", e)
};
p.I = function() {
  this.a.send(JSON.stringify({MsgType:"1", TestReqID:Math.random()}))
};
function V(a, b) {
  O.call(this, a);
  this.data = b
}
A(V, O);
var Ja = y, X = ["BitEx"], Y = t;
!(X[0] in Y) && Y.execScript && Y.execScript("var " + X[0]);
for(var Z;X.length && (Z = X.shift());) {
  var Ka;
  if(Ka = !X.length) {
    Ka = Ja !== h
  }
  Ka ? Y[Z] = Ja : Y = Y[Z] ? Y[Z] : Y[Z] = {}
}
x("open", y.prototype.open);
x("close", y.prototype.close);
x("login", y.prototype.s);
x("changePassword", y.prototype.r);
x("subscribeMarketData", y.prototype.G);
x("unSubscribeMarketData", y.prototype.J);
x("signUp", y.prototype.F);
x("requestOpenOrders", y.prototype.A);
x("cancelOrder", y.prototype.q);
x("sendRawMessage", y.prototype.C);
x("sendBuyLimitedOrder", y.prototype.B);
x("sendSellLimitedOrder", y.prototype.D);
x("testRequest", y.prototype.I);
x("addEventListener", y.prototype.addEventListener);
x("removeEventListener", y.prototype.removeEventListener);

