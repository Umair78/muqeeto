/*!
 * TheJobs v1.0.0 (http://shamsoft.net/thejobs)
 * Copyright 2016 ShaMSofT
 * Licensed under the Themeforest Standard Licenses
 */
function ssc_init() {
    if (document.body) {
        var a = document.body,
            b = document.documentElement,
            c = window.innerHeight,
            d = a.scrollHeight;
        if (ssc_root = document.compatMode.indexOf("CSS") >= 0 ? b : a, ssc_activeElement = a, ssc_initdone = !0, top != self) ssc_frame = !0;
        else if (d > c && (a.offsetHeight <= c || b.offsetHeight <= c) && (ssc_root.style.height = "auto", ssc_root.offsetHeight <= c)) {
            var e = document.createElement("div");
            e.style.clear = "both", a.appendChild(e)
        }
        ssc_fixedback || (a.style.backgroundAttachment = "scroll", b.style.backgroundAttachment = "scroll"), ssc_keyboardsupport && ssc_addEvent("keydown", ssc_keydown)
    }
}

function ssc_scrollArray(a, b, c, d) {
    if (d || (d = 1e3), ssc_directionCheck(b, c), ssc_que.push({ x: b, y: c, lastX: 0 > b ? .99 : -.99, lastY: 0 > c ? .99 : -.99, start: +new Date }), !ssc_pending) {
        var e = function() {
            for (var f = +new Date, g = 0, h = 0, i = 0; i < ssc_que.length; i++) {
                var j = ssc_que[i],
                    k = f - j.start,
                    l = k >= ssc_animtime,
                    m = l ? 1 : k / ssc_animtime;
                ssc_pulseAlgorithm && (m = ssc_pulse(m));
                var n = j.x * m - j.lastX >> 0,
                    o = j.y * m - j.lastY >> 0;
                g += n, h += o, j.lastX += n, j.lastY += o, l && (ssc_que.splice(i, 1), i--)
            }
            if (b) {
                var p = a.scrollLeft;
                a.scrollLeft += g, g && a.scrollLeft === p && (b = 0)
            }
            if (c) {
                var q = a.scrollTop;
                a.scrollTop += h, h && a.scrollTop === q && (c = 0)
            }
            b || c || (ssc_que = []), ssc_que.length ? setTimeout(e, d / ssc_framerate + 1) : ssc_pending = !1
        };
        setTimeout(e, 0), ssc_pending = !0
    }
}

function ssc_wheel(a) {
    ssc_initdone || ssc_init();
    var b = a.target,
        c = ssc_overflowingAncestor(b);
    if (!c || a.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(b, "embed") && /\.pdf/i.test(b.src)) return !0;
    var d = a.wheelDeltaX || 0,
        e = a.wheelDeltaY || 0;
    d || e || (e = a.wheelDelta || 0), Math.abs(d) > 1.2 && (d *= ssc_stepsize / 120), Math.abs(e) > 1.2 && (e *= ssc_stepsize / 120), ssc_scrollArray(c, -d, -e), a.preventDefault()
}

function ssc_keydown(a) {
    var b = a.target,
        c = a.ctrlKey || a.altKey || a.metaKey;
    if (/input|textarea|embed/i.test(b.nodeName) || b.isContentEditable || a.defaultPrevented || c) return !0;
    if (ssc_isNodeName(b, "button") && a.keyCode === ssc_key.spacebar) return !0;
    var d, e = 0,
        f = 0,
        g = ssc_overflowingAncestor(ssc_activeElement),
        h = g.clientHeight;
    switch (g == document.body && (h = window.innerHeight), a.keyCode) {
        case ssc_key.up:
            f = -ssc_arrowscroll;
            break;
        case ssc_key.down:
            f = ssc_arrowscroll;
            break;
        case ssc_key.spacebar:
            d = a.shiftKey ? 1 : -1, f = -d * h * .9;
            break;
        case ssc_key.pageup:
            f = .9 * -h;
            break;
        case ssc_key.pagedown:
            f = .9 * h;
            break;
        case ssc_key.home:
            f = -g.scrollTop;
            break;
        case ssc_key.end:
            var i = g.scrollHeight - g.scrollTop - h;
            f = i > 0 ? i + 10 : 0;
            break;
        case ssc_key.left:
            e = -ssc_arrowscroll;
            break;
        case ssc_key.right:
            e = ssc_arrowscroll;
            break;
        default:
            return !0
    }
    ssc_scrollArray(g, e, f), a.preventDefault()
}

function ssc_mousedown(a) { ssc_activeElement = a.target }

function ssc_setCache(a, b) { for (var c = a.length; c--;) ssc_cache[ssc_uniqueID(a[c])] = b; return b }

function ssc_overflowingAncestor(a) {
    var b = [],
        c = ssc_root.scrollHeight;
    do { var d = ssc_cache[ssc_uniqueID(a)]; if (d) return ssc_setCache(b, d); if (b.push(a), c === a.scrollHeight) { if (!ssc_frame || ssc_root.clientHeight + 10 < c) return ssc_setCache(b, document.body) } else if (a.clientHeight + 10 < a.scrollHeight && (overflow = getComputedStyle(a, "").getPropertyValue("overflow"), "scroll" === overflow || "auto" === overflow)) return ssc_setCache(b, a) } while (a = a.parentNode)
}

function ssc_addEvent(a, b, c) { window.addEventListener(a, b, c || !1) }

function ssc_removeEvent(a, b, c) { window.removeEventListener(a, b, c || !1) }

function ssc_isNodeName(a, b) { return a.nodeName.toLowerCase() === b.toLowerCase() }

function ssc_directionCheck(a, b) { a = a > 0 ? 1 : -1, b = b > 0 ? 1 : -1, (ssc_direction.x !== a || ssc_direction.y !== b) && (ssc_direction.x = a, ssc_direction.y = b, ssc_que = []) }

function ssc_pulse_(a) { var b, c, d; return a *= ssc_pulseScale, 1 > a ? b = a - (1 - Math.exp(-a)) : (c = Math.exp(-1), a -= 1, d = 1 - Math.exp(-a), b = c + d * (1 - c)), b * ssc_pulseNormalize }

function ssc_pulse(a) { return a >= 1 ? 1 : 0 >= a ? 0 : (1 == ssc_pulseNormalize && (ssc_pulseNormalize /= ssc_pulse_(1)), ssc_pulse_(a)) }

function isScrolledIntoView(a) {
    var b = $(a),
        c = $(window),
        d = c.scrollTop(),
        e = d + c.height(),
        f = b.offset().top,
        g = f + b.height();
    return e >= g && f >= d
}
if (! function(a, b) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) { if (!a.document) throw new Error("jQuery requires a window with a document"); return b(a) } : b(a) }("undefined" != typeof window ? window : this, function(a, b) {
        "use strict";

        function c(a, b) {
            b = b || _;
            var c = b.createElement("script");
            c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
        }

        function d(a) {
            var b = !!a && "length" in a && a.length,
                c = ma.type(a);
            return "function" !== c && !ma.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }

        function e(a, b, c) {
            if (ma.isFunction(b)) return ma.grep(a, function(a, d) { return !!b.call(a, d, a) !== c });
            if (b.nodeType) return ma.grep(a, function(a) { return a === b !== c });
            if ("string" == typeof b) {
                if (wa.test(b)) return ma.filter(b, a, c);
                b = ma.filter(b, a)
            }
            return ma.grep(a, function(a) { return ea.call(b, a) > -1 !== c && 1 === a.nodeType })
        }

        function f(a, b) {
            for (;
                (a = a[b]) && 1 !== a.nodeType;);
            return a
        }

        function g(a) { var b = {}; return ma.each(a.match(Ca) || [], function(a, c) { b[c] = !0 }), b }

        function h(a) { return a }

        function i(a) { throw a }

        function j(a, b, c) { var d; try { a && ma.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && ma.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a) } catch (a) { c.call(void 0, a) } }

        function k() { _.removeEventListener("DOMContentLoaded", k), a.removeEventListener("load", k), ma.ready() }

        function l() { this.expando = ma.expando + l.uid++ }

        function m(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (d = "data-" + b.replace(Ka, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) { try { c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : Ja.test(c) ? JSON.parse(c) : c) } catch (e) {} Ia.set(a, b, c) } else c = void 0;
            return c
        }

        function n(a, b, c, d) {
            var e, f = 1,
                g = 20,
                h = d ? function() { return d.cur() } : function() { return ma.css(a, b, "") },
                i = h(),
                j = c && c[3] || (ma.cssNumber[b] ? "" : "px"),
                k = (ma.cssNumber[b] || "px" !== j && +i) && Ma.exec(ma.css(a, b));
            if (k && k[3] !== j) {
                j = j || k[3], c = c || [], k = +i || 1;
                do f = f || ".5", k /= f, ma.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
            }
            return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
        }

        function o(a) {
            var b, c = a.ownerDocument,
                d = a.nodeName,
                e = Qa[d];
            return e ? e : (b = c.body.appendChild(c.createElement(d)), e = ma.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), Qa[d] = e, e)
        }

        function p(a, b) { for (var c, d, e = [], f = 0, g = a.length; g > f; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = Ha.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && Oa(d) && (e[f] = o(d))) : "none" !== c && (e[f] = "none", Ha.set(d, "display", c))); for (f = 0; g > f; f++) null != e[f] && (a[f].style.display = e[f]); return a }

        function q(a, b) { var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : []; return void 0 === b || b && ma.nodeName(a, b) ? ma.merge([a], c) : c }

        function r(a, b) { for (var c = 0, d = a.length; d > c; c++) Ha.set(a[c], "globalEval", !b || Ha.get(b[c], "globalEval")) }

        function s(a, b, c, d, e) {
            for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; o > n; n++)
                if (f = a[n], f || 0 === f)
                    if ("object" === ma.type(f)) ma.merge(m, f.nodeType ? [f] : f);
                    else if (Va.test(f)) {
                for (g = g || l.appendChild(b.createElement("div")), h = (Sa.exec(f) || ["", ""])[1].toLowerCase(), i = Ua[h] || Ua._default, g.innerHTML = i[1] + ma.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                ma.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
            } else m.push(b.createTextNode(f));
            for (l.textContent = "", n = 0; f = m[n++];)
                if (d && ma.inArray(f, d) > -1) e && e.push(f);
                else if (j = ma.contains(f.ownerDocument, f), g = q(l.appendChild(f), "script"), j && r(g), c)
                for (k = 0; f = g[k++];) Ta.test(f.type || "") && c.push(f);
            return l
        }

        function t() { return !0 }

        function u() { return !1 }

        function v() { try { return _.activeElement } catch (a) {} }

        function w(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) { "string" != typeof c && (d = d || c, c = void 0); for (h in b) w(a, h, c, d, b[h], f); return a }
            if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = u;
            else if (!e) return a;
            return 1 === f && (g = e, e = function(a) { return ma().off(a), g.apply(this, arguments) }, e.guid = g.guid || (g.guid = ma.guid++)), a.each(function() { ma.event.add(this, b, e, d, c) })
        }

        function x(a, b) { return ma.nodeName(a, "table") && ma.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a }

        function y(a) { return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a }

        function z(a) { var b = bb.exec(a.type); return b ? a.type = b[1] : a.removeAttribute("type"), a }

        function A(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (Ha.hasData(a) && (f = Ha.access(a), g = Ha.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j)
                        for (c = 0, d = j[e].length; d > c; c++) ma.event.add(b, e, j[e][c])
                }
                Ia.hasData(a) && (h = Ia.access(a), i = ma.extend({}, h), Ia.set(b, i))
            }
        }

        function B(a, b) { var c = b.nodeName.toLowerCase(); "input" === c && Ra.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue) }

        function C(a, b, d, e) {
            b = ca.apply([], b);
            var f, g, h, i, j, k, l = 0,
                m = a.length,
                n = m - 1,
                o = b[0],
                p = ma.isFunction(o);
            if (p || m > 1 && "string" == typeof o && !ka.checkClone && ab.test(o)) return a.each(function(c) {
                var f = a.eq(c);
                p && (b[0] = o.call(this, c, f.html())), C(f, b, d, e)
            });
            if (m && (f = s(b, a[0].ownerDocument, !1, a, e), g = f.firstChild, 1 === f.childNodes.length && (f = g), g || e)) {
                for (h = ma.map(q(f, "script"), y), i = h.length; m > l; l++) j = f, l !== n && (j = ma.clone(j, !0, !0), i && ma.merge(h, q(j, "script"))), d.call(a[l], j, l);
                if (i)
                    for (k = h[h.length - 1].ownerDocument, ma.map(h, z), l = 0; i > l; l++) j = h[l], Ta.test(j.type || "") && !Ha.access(j, "globalEval") && ma.contains(k, j) && (j.src ? ma._evalUrl && ma._evalUrl(j.src) : c(j.textContent.replace(cb, ""), k))
            }
            return a
        }

        function D(a, b, c) { for (var d, e = b ? ma.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || ma.cleanData(q(d)), d.parentNode && (c && ma.contains(d.ownerDocument, d) && r(q(d, "script")), d.parentNode.removeChild(d)); return a }

        function E(a, b, c) { var d, e, f, g, h = a.style; return c = c || fb(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || ma.contains(a.ownerDocument, a) || (g = ma.style(a, b)), !ka.pixelMarginRight() && eb.test(g) && db.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g }

        function F(a, b) { return { get: function() { return a() ? void delete this.get : (this.get = b).apply(this, arguments) } } }

        function G(a) {
            if (a in kb) return a;
            for (var b = a[0].toUpperCase() + a.slice(1), c = jb.length; c--;)
                if (a = jb[c] + b, a in kb) return a
        }

        function H(a, b, c) { var d = Ma.exec(b); return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b }

        function I(a, b, c, d, e) { for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ma.css(a, c + Na[f], !0, e)), d ? ("content" === c && (g -= ma.css(a, "padding" + Na[f], !0, e)), "margin" !== c && (g -= ma.css(a, "border" + Na[f] + "Width", !0, e))) : (g += ma.css(a, "padding" + Na[f], !0, e), "padding" !== c && (g += ma.css(a, "border" + Na[f] + "Width", !0, e))); return g }

        function J(a, b, c) {
            var d, e = !0,
                f = fb(a),
                g = "border-box" === ma.css(a, "boxSizing", !1, f);
            if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), 0 >= d || null == d) {
                if (d = E(a, b, f), (0 > d || null == d) && (d = a.style[b]), eb.test(d)) return d;
                e = g && (ka.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0
            }
            return d + I(a, b, c || (g ? "border" : "content"), e, f) + "px"
        }

        function K(a, b, c, d, e) { return new K.prototype.init(a, b, c, d, e) }

        function L() { mb && (a.requestAnimationFrame(L), ma.fx.tick()) }

        function M() { return a.setTimeout(function() { lb = void 0 }), lb = ma.now() }

        function N(a, b) {
            var c, d = 0,
                e = { height: a };
            for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = Na[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }

        function O(a, b, c) {
            for (var d, e = (R.tweeners[b] || []).concat(R.tweeners["*"]), f = 0, g = e.length; g > f; f++)
                if (d = e[f].call(c, b, a)) return d
        }

        function P(a, b, c) {
            var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b,
                m = this,
                n = {},
                o = a.style,
                q = a.nodeType && Oa(a),
                r = Ha.get(a, "fxshow");
            c.queue || (g = ma._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function() { g.unqueued || h() }), g.unqueued++, m.always(function() { m.always(function() { g.unqueued--, ma.queue(a, "fx").length || g.empty.fire() }) }));
            for (d in b)
                if (e = b[d], nb.test(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                        if ("show" !== e || !r || void 0 === r[d]) continue;
                        q = !0
                    }
                    n[d] = r && r[d] || ma.style(a, d)
                } if (i = !ma.isEmptyObject(b), i || !ma.isEmptyObject(n)) { l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = r && r.display, null == j && (j = Ha.get(a, "display")), k = ma.css(a, "display"), "none" === k && (j ? k = j : (p([a], !0), j = a.style.display || j, k = ma.css(a, "display"), p([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === ma.css(a, "float") && (i || (m.done(function() { o.display = j }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function() { o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2] })), i = !1; for (d in n) i || (r ? "hidden" in r && (q = r.hidden) : r = Ha.access(a, "fxshow", { display: j }), f && (r.hidden = !q), q && p([a], !0), m.done(function() { q || p([a]), Ha.remove(a, "fxshow"); for (d in n) ma.style(a, d, n[d]) })), i = O(q ? r[d] : 0, d, m), d in r || (r[d] = i.start, q && (i.end = i.start, i.start = 0)) }
        }

        function Q(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = ma.camelCase(c), e = b[d], f = a[c], ma.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ma.cssHooks[d], g && "expand" in g) { f = g.expand(f), delete a[d]; for (c in f) c in a || (a[c] = f[c], b[c] = e) } else b[d] = e
        }

        function R(a, b, c) {
            var d, e, f = 0,
                g = R.prefilters.length,
                h = ma.Deferred().always(function() { delete i.elem }),
                i = function() { if (e) return !1; for (var b = lb || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f); return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1) },
                j = h.promise({
                    elem: a,
                    props: ma.extend({}, b),
                    opts: ma.extend(!0, { specialEasing: {}, easing: ma.easing._default }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: lb || M(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) { var d = ma.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(d), d },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; d > c; c++) j.tweens[c].run(1);
                        return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (Q(k, j.opts.specialEasing); g > f; f++)
                if (d = R.prefilters[f].call(j, a, k, j.opts)) return ma.isFunction(d.stop) && (ma._queueHooks(j.elem, j.opts.queue).stop = ma.proxy(d.stop, d)), d;
            return ma.map(k, O, j), ma.isFunction(j.opts.start) && j.opts.start.call(a, j), ma.fx.timer(ma.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function S(a) { return a.getAttribute && a.getAttribute("class") || "" }

        function T(a, b, c, d) {
            var e;
            if (ma.isArray(b)) ma.each(b, function(b, e) { c || Ab.test(a) ? d(a, e) : T(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d) });
            else if (c || "object" !== ma.type(b)) d(a, b);
            else
                for (e in b) T(a + "[" + e + "]", b[e], c, d)
        }

        function U(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(Ca) || [];
                if (ma.isFunction(c))
                    for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function V(a, b, c, d) {
            function e(h) { var i; return f[h] = !0, ma.each(a[h] || [], function(a, h) { var j = h(b, c, d); return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1) }), i }
            var f = {},
                g = a === Mb;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function W(a, b) { var c, d, e = ma.ajaxSettings.flatOptions || {}; for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]); return d && ma.extend(!0, a, d), a }

        function X(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) { i.unshift(e); break } if (i[0] in c) f = i[0];
            else { for (e in c) { if (!i[0] || a.converters[e + " " + i[0]]) { f = e; break } g || (g = e) } f = f || g }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }

        function Y(a, b, c, d) {
            var e, f, g, h, i, j = {},
                k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g)
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) { g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1])); break } if (g !== !0)
                    if (g && a["throws"]) b = g(b);
                    else try { b = g(b) } catch (l) { return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f } }
            }
            return { state: "success", data: b }
        }

        function Z(a) { return ma.isWindow(a) ? a : 9 === a.nodeType && a.defaultView }
        var $ = [],
            _ = a.document,
            aa = Object.getPrototypeOf,
            ba = $.slice,
            ca = $.concat,
            da = $.push,
            ea = $.indexOf,
            fa = {},
            ga = fa.toString,
            ha = fa.hasOwnProperty,
            ia = ha.toString,
            ja = ia.call(Object),
            ka = {},
            la = "3.1.0",
            ma = function(a, b) { return new ma.fn.init(a, b) },
            na = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            oa = /^-ms-/,
            pa = /-([a-z])/g,
            qa = function(a, b) { return b.toUpperCase() };
        ma.fn = ma.prototype = {
            jquery: la,
            constructor: ma,
            length: 0,
            toArray: function() { return ba.call(this) },
            get: function(a) { return null != a ? 0 > a ? this[a + this.length] : this[a] : ba.call(this) },
            pushStack: function(a) { var b = ma.merge(this.constructor(), a); return b.prevObject = this, b },
            each: function(a) { return ma.each(this, a) },
            map: function(a) { return this.pushStack(ma.map(this, function(b, c) { return a.call(b, c, b) })) },
            slice: function() { return this.pushStack(ba.apply(this, arguments)) },
            first: function() { return this.eq(0) },
            last: function() { return this.eq(-1) },
            eq: function(a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            },
            end: function() { return this.prevObject || this.constructor() },
            push: da,
            sort: $.sort,
            splice: $.splice
        }, ma.extend = ma.fn.extend = function() {
            var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ma.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                if (null != (a = arguments[h]))
                    for (b in a) c = g[b], d = a[b], g !== d && (j && d && (ma.isPlainObject(d) || (e = ma.isArray(d))) ? (e ? (e = !1, f = c && ma.isArray(c) ? c : []) : f = c && ma.isPlainObject(c) ? c : {}, g[b] = ma.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, ma.extend({
            expando: "jQuery" + (la + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(a) { throw new Error(a) },
            noop: function() {},
            isFunction: function(a) { return "function" === ma.type(a) },
            isArray: Array.isArray,
            isWindow: function(a) { return null != a && a === a.window },
            isNumeric: function(a) { var b = ma.type(a); return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a)) },
            isPlainObject: function(a) { var b, c; return !(!a || "[object Object]" !== ga.call(a) || (b = aa(a)) && (c = ha.call(b, "constructor") && b.constructor, "function" != typeof c || ia.call(c) !== ja)) },
            isEmptyObject: function(a) { var b; for (b in a) return !1; return !0 },
            type: function(a) { return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? fa[ga.call(a)] || "object" : typeof a },
            globalEval: function(a) { c(a) },
            camelCase: function(a) { return a.replace(oa, "ms-").replace(pa, qa) },
            nodeName: function(a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase() },
            each: function(a, b) {
                var c, e = 0;
                if (d(a))
                    for (c = a.length; c > e && b.call(a[e], e, a[e]) !== !1; e++);
                else
                    for (e in a)
                        if (b.call(a[e], e, a[e]) === !1) break;
                return a
            },
            trim: function(a) { return null == a ? "" : (a + "").replace(na, "") },
            makeArray: function(a, b) { var c = b || []; return null != a && (d(Object(a)) ? ma.merge(c, "string" == typeof a ? [a] : a) : da.call(c, a)), c },
            inArray: function(a, b, c) { return null == b ? -1 : ea.call(b, a, c) },
            merge: function(a, b) { for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d]; return a.length = e, a },
            grep: function(a, b, c) { for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]); return e },
            map: function(a, b, c) {
                var e, f, g = 0,
                    h = [];
                if (d(a))
                    for (e = a.length; e > g; g++) f = b(a[g], g, c), null != f && h.push(f);
                else
                    for (g in a) f = b(a[g], g, c), null != f && h.push(f);
                return ca.apply([], h)
            },
            guid: 1,
            proxy: function(a, b) { var c, d, e; return "string" == typeof b && (c = a[b], b = a, a = c), ma.isFunction(a) ? (d = ba.call(arguments, 2), e = function() { return a.apply(b || this, d.concat(ba.call(arguments))) }, e.guid = a.guid = a.guid || ma.guid++, e) : void 0 },
            now: Date.now,
            support: ka
        }), "function" == typeof Symbol && (ma.fn[Symbol.iterator] = $[Symbol.iterator]), ma.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) { fa["[object " + b + "]"] = b.toLowerCase() });
        var ra = function(a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, j, k, m = b && b.ownerDocument,
                    o = b ? b.nodeType : 9;
                if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
                if (!d && ((b ? b.ownerDocument || b : P) !== H && G(b), b = b || H, J)) {
                    if (11 !== o && (i = ra.exec(a)))
                        if (e = i[1]) { if (9 === o) { if (!(g = b.getElementById(e))) return c; if (g.id === e) return c.push(g), c } else if (m && (g = m.getElementById(e)) && N(b, g) && g.id === e) return c.push(g), c } else { if (i[2]) return $.apply(c, b.getElementsByTagName(a)), c; if ((e = i[3]) && w.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c } if (w.qsa && !U[a + " "] && (!K || !K.test(a))) {
                        if (1 !== o) m = b, k = a;
                        else if ("object" !== b.nodeName.toLowerCase()) {
                            for ((h = b.getAttribute("id")) ? h = h.replace(va, wa) : b.setAttribute("id", h = O), j = A(a), f = j.length; f--;) j[f] = "#" + h + " " + n(j[f]);
                            k = j.join(","), m = sa.test(a) && l(b.parentNode) || b
                        }
                        if (k) try { return $.apply(c, m.querySelectorAll(k)), c } catch (p) {} finally { h === O && b.removeAttribute("id") }
                    }
                }
                return C(a.replace(ha, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) { return b.push(c + " ") > x.cacheLength && delete a[b.shift()], a[c + " "] = d }
                var b = [];
                return a
            }

            function d(a) { return a[O] = !0, a }

            function e(a) { var b = H.createElement("fieldset"); try { return !!a(b) } catch (c) { return !1 } finally { b.parentNode && b.parentNode.removeChild(b), b = null } }

            function f(a, b) { for (var c = a.split("|"), d = c.length; d--;) x.attrHandle[c[d]] = b }

            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) { return function(b) { var c = b.nodeName.toLowerCase(); return "input" === c && b.type === a } }

            function i(a) { return function(b) { var c = b.nodeName.toLowerCase(); return ("input" === c || "button" === c) && b.type === a } }

            function j(a) { return function(b) { return "label" in b && b.disabled === a || "form" in b && b.disabled === a || "form" in b && b.disabled === !1 && (b.isDisabled === a || b.isDisabled !== !a && ("label" in b || !ya(b)) !== a) } }

            function k(a) { return d(function(b) { return b = +b, d(function(c, d) { for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e])) }) }) }

            function l(a) { return a && "undefined" != typeof a.getElementsByTagName && a }

            function m() {}

            function n(a) { for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value; return d }

            function o(a, b, c) {
                var d = b.dir,
                    e = b.next,
                    f = e || d,
                    g = c && "parentNode" === f,
                    h = R++;
                return b.first ? function(b, c, e) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || g) return a(b, c, e)
                } : function(b, c, i) {
                    var j, k, l, m = [Q, h];
                    if (i) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || g)
                                if (l = b[O] || (b[O] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;
                                else { if ((j = k[f]) && j[0] === Q && j[1] === h) return m[2] = j[2]; if (k[f] = m, m[2] = a(b, c, i)) return !0 }
                }
            }

            function p(a) {
                return a.length > 1 ? function(b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function q(a, c, d) { for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d); return d }

            function r(a, b, c, d, e) { for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h))); return g }

            function s(a, b, c, e, f, g) {
                return e && !e[O] && (e = s(e)), f && !f[O] && (f = s(f, g)), d(function(d, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        p = d || q(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? p : r(p, m, a, h, i),
                        t = c ? f || (d ? a : o || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e)
                        for (j = r(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = r(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
                })
            }

            function t(a) {
                for (var b, c, d, e = a.length, f = x.relative[a[0].type], g = f || x.relative[" "], h = f ? 1 : 0, i = o(function(a) { return a === b }, g, !0), j = o(function(a) { return aa(b, a) > -1 }, g, !0), k = [function(a, c, d) { var e = !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d)); return b = null, e }]; e > h; h++)
                    if (c = x.relative[a[h].type]) k = [o(p(k), c)];
                    else { if (c = x.filter[a[h].type].apply(null, a[h].matches), c[O]) { for (d = ++h; e > d && !x.relative[a[d].type]; d++); return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({ value: " " === a[h - 2].type ? "*" : "" })).replace(ha, "$1"), c, d > h && t(a.slice(h, d)), e > d && t(a = a.slice(d)), e > d && n(a)) } k.push(c) } return p(k)
            }

            function u(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function(d, g, h, i, j) {
                        var k, l, m, n = 0,
                            o = "0",
                            p = d && [],
                            q = [],
                            s = D,
                            t = d || f && x.find.TAG("*", j),
                            u = Q += null == s ? 1 : Math.random() || .1,
                            v = t.length;
                        for (j && (D = g === H || g || j); o !== v && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0, g || k.ownerDocument === H || (G(k), h = !J); m = a[l++];)
                                    if (m(k, g || H, h)) { i.push(k); break } j && (Q = u)
                            }
                            e && ((k = !m && k) && n--, d && p.push(k))
                        }
                        if (n += o, e && o !== n) {
                            for (l = 0; m = c[l++];) m(p, q, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;) p[o] || q[o] || (q[o] = Y.call(i));
                                q = r(q)
                            }
                            $.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (Q = u, D = s), p
                    };
                return e ? d(g) : g
            }
            var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = "sizzle" + 1 * new Date,
                P = a.document,
                Q = 0,
                R = 0,
                S = c(),
                T = c(),
                U = c(),
                V = function(a, b) { return a === b && (F = !0), 0 },
                W = {}.hasOwnProperty,
                X = [],
                Y = X.pop,
                Z = X.push,
                $ = X.push,
                _ = X.slice,
                aa = function(a, b) {
                    for (var c = 0, d = a.length; d > c; c++)
                        if (a[c] === b) return c;
                    return -1
                },
                ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ca = "[\\x20\\t\\r\\n\\f]",
                da = "(?:\\\\.|[\\w-]|[^\x00-\\xa0])+",
                ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
                fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
                ga = new RegExp(ca + "+", "g"),
                ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                ia = new RegExp("^" + ca + "*," + ca + "*"),
                ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
                la = new RegExp(fa),
                ma = new RegExp("^" + da + "$"),
                na = { ID: new RegExp("^#(" + da + ")"), CLASS: new RegExp("^\\.(" + da + ")"), TAG: new RegExp("^(" + da + "|[*])"), ATTR: new RegExp("^" + ea), PSEUDO: new RegExp("^" + fa), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"), bool: new RegExp("^(?:" + ba + ")$", "i"), needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i") },
                oa = /^(?:input|select|textarea|button)$/i,
                pa = /^h\d$/i,
                qa = /^[^{]+\{\s*\[native \w/,
                ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                sa = /[+~]/,
                ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
                ua = function(a, b, c) { var d = "0x" + b - 65536; return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320) },
                va = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
                wa = function(a, b) { return b ? "\x00" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a },
                xa = function() { G() },
                ya = o(function(a) { return a.disabled === !0 }, { dir: "parentNode", next: "legend" });
            try { $.apply(X = _.call(P.childNodes), P.childNodes), X[P.childNodes.length].nodeType } catch (za) {
                $ = {
                    apply: X.length ? function(a, b) { Z.apply(a, _.call(b)) } : function(a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            w = b.support = {}, z = b.isXML = function(a) { var b = a && (a.ownerDocument || a).documentElement; return !!b && "HTML" !== b.nodeName }, G = b.setDocument = function(a) {
                var b, c, d = a ? a.ownerDocument || a : P;
                return d !== H && 9 === d.nodeType && d.documentElement ? (H = d, I = H.documentElement, J = !z(H), P !== H && (c = H.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), w.attributes = e(function(a) { return a.className = "i", !a.getAttribute("className") }), w.getElementsByTagName = e(function(a) { return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length }), w.getElementsByClassName = qa.test(H.getElementsByClassName), w.getById = e(function(a) { return I.appendChild(a).id = O, !H.getElementsByName || !H.getElementsByName(O).length }), w.getById ? (x.find.ID = function(a, b) { if ("undefined" != typeof b.getElementById && J) { var c = b.getElementById(a); return c ? [c] : [] } }, x.filter.ID = function(a) { var b = a.replace(ta, ua); return function(a) { return a.getAttribute("id") === b } }) : (delete x.find.ID, x.filter.ID = function(a) { var b = a.replace(ta, ua); return function(a) { var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id"); return c && c.value === b } }), x.find.TAG = w.getElementsByTagName ? function(a, b) { return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : w.qsa ? b.querySelectorAll(a) : void 0 } : function(a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) { for (; c = f[e++];) 1 === c.nodeType && d.push(c); return d }
                    return f
                }, x.find.CLASS = w.getElementsByClassName && function(a, b) { return "undefined" != typeof b.getElementsByClassName && J ? b.getElementsByClassName(a) : void 0 }, L = [], K = [], (w.qsa = qa.test(H.querySelectorAll)) && (e(function(a) { I.appendChild(a).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && K.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || K.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + O + "-]").length || K.push("~="), a.querySelectorAll(":checked").length || K.push(":checked"), a.querySelectorAll("a#" + O + "+*").length || K.push(".#.+[+~]") }), e(function(a) {
                    a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var b = H.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && K.push("name" + ca + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && K.push(":enabled", ":disabled"), I.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && K.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), K.push(",.*:")
                })), (w.matchesSelector = qa.test(M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && e(function(a) { w.disconnectedMatch = M.call(a, "*"), M.call(a, "[s!='']:x"), L.push("!=", fa) }), K = K.length && new RegExp(K.join("|")), L = L.length && new RegExp(L.join("|")), b = qa.test(I.compareDocumentPosition), N = b || qa.test(I.contains) ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, V = b ? function(a, b) { if (a === b) return F = !0, 0; var c = !a.compareDocumentPosition - !b.compareDocumentPosition; return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !w.sortDetached && b.compareDocumentPosition(a) === c ? a === H || a.ownerDocument === P && N(P, a) ? -1 : b === H || b.ownerDocument === P && N(P, b) ? 1 : E ? aa(E, a) - aa(E, b) : 0 : 4 & c ? -1 : 1) } : function(a, b) {
                    if (a === b) return F = !0, 0;
                    var c, d = 0,
                        e = a.parentNode,
                        f = b.parentNode,
                        h = [a],
                        i = [b];
                    if (!e || !f) return a === H ? -1 : b === H ? 1 : e ? -1 : f ? 1 : E ? aa(E, a) - aa(E, b) : 0;
                    if (e === f) return g(a, b);
                    for (c = a; c = c.parentNode;) h.unshift(c);
                    for (c = b; c = c.parentNode;) i.unshift(c);
                    for (; h[d] === i[d];) d++;
                    return d ? g(h[d], i[d]) : h[d] === P ? -1 : i[d] === P ? 1 : 0
                }, H) : H
            }, b.matches = function(a, c) { return b(a, null, null, c) }, b.matchesSelector = function(a, c) {
                if ((a.ownerDocument || a) !== H && G(a), c = c.replace(ka, "='$1']"), w.matchesSelector && J && !U[c + " "] && (!L || !L.test(c)) && (!K || !K.test(c))) try { var d = M.call(a, c); if (d || w.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d } catch (e) {}
                return b(c, H, null, [a]).length > 0
            }, b.contains = function(a, b) { return (a.ownerDocument || a) !== H && G(a), N(a, b) }, b.attr = function(a, b) {
                (a.ownerDocument || a) !== H && G(a);
                var c = x.attrHandle[b.toLowerCase()],
                    d = c && W.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !J) : void 0;
                return void 0 !== d ? d : w.attributes || !J ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.escape = function(a) { return (a + "").replace(va, wa) }, b.error = function(a) { throw new Error("Syntax error, unrecognized expression: " + a) }, b.uniqueSort = function(a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (F = !w.detectDuplicates, E = !w.sortStable && a.slice(0), a.sort(V), F) { for (; b = a[e++];) b === a[e] && (d = c.push(e)); for (; d--;) a.splice(c[d], 1) }
                return E = null, a
            }, y = b.getText = function(a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) { if (1 === e || 9 === e || 11 === e) { if ("string" == typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a = a.nextSibling) c += y(a) } else if (3 === e || 4 === e) return a.nodeValue } else
                    for (; b = a[d++];) c += y(b);
                return c
            }, x = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: na,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: !0 },
                    "~": { dir: "previousSibling" }
                },
                preFilter: { ATTR: function(a) { return a[1] = a[1].replace(ta, ua), a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4) }, CHILD: function(a) { return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a }, PSEUDO: function(a) { var b, c = !a[6] && a[2]; return na.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && la.test(c) && (b = A(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3)) } },
                filter: {
                    TAG: function(a) { var b = a.replace(ta, ua).toLowerCase(); return "*" === a ? function() { return !0 } : function(a) { return a.nodeName && a.nodeName.toLowerCase() === b } },
                    CLASS: function(a) { var b = S[a + " "]; return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && S(a, function(a) { return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "") }) },
                    ATTR: function(a, c, d) { return function(e) { var f = b.attr(e, a); return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-")) } },
                    CHILD: function(a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function(a) { return !!a.parentNode } : function(b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h,
                                t = !1;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (m = b; m = m[p];)
                                            if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (m = q, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                        if (1 === m.nodeType && ++t && m === b) { k[a] = [Q, n, t]; break }
                                } else if (s && (m = b, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n), t === !1)
                                    for (;
                                        (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [Q, t]), m !== b)););
                                return t -= e, t === d || t % d === 0 && t / d >= 0
                            }
                        }
                    },
                    PSEUDO: function(a, c) { var e, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a); return f[O] ? f(c) : f.length > 1 ? (e = [a, a, "", c], x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) { for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g]) }) : function(a) { return f(a, 0, e) }) : f }
                },
                pseudos: {
                    not: d(function(a) {
                        var b = [],
                            c = [],
                            e = B(a.replace(ha, "$1"));
                        return e[O] ? d(function(a, b, c, d) { for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f)) }) : function(a, d, f) { return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop() }
                    }),
                    has: d(function(a) { return function(c) { return b(a, c).length > 0 } }),
                    contains: d(function(a) {
                        return a = a.replace(ta, ua),
                            function(b) { return (b.textContent || b.innerText || y(b)).indexOf(a) > -1 }
                    }),
                    lang: d(function(a) {
                        return ma.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ta, ua).toLowerCase(),
                            function(b) {
                                var c;
                                do
                                    if (c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function(b) { var c = a.location && a.location.hash; return c && c.slice(1) === b.id },
                    root: function(a) { return a === I },
                    focus: function(a) { return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex) },
                    enabled: j(!1),
                    disabled: j(!0),
                    checked: function(a) { var b = a.nodeName.toLowerCase(); return "input" === b && !!a.checked || "option" === b && !!a.selected },
                    selected: function(a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0 },
                    empty: function(a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(a) { return !x.pseudos.empty(a) },
                    header: function(a) { return pa.test(a.nodeName) },
                    input: function(a) { return oa.test(a.nodeName) },
                    button: function(a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b },
                    text: function(a) { var b; return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase()) },
                    first: k(function() { return [0] }),
                    last: k(function(a, b) { return [b - 1] }),
                    eq: k(function(a, b, c) { return [0 > c ? c + b : c] }),
                    even: k(function(a, b) { for (var c = 0; b > c; c += 2) a.push(c); return a }),
                    odd: k(function(a, b) { for (var c = 1; b > c; c += 2) a.push(c); return a }),
                    lt: k(function(a, b, c) { for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d); return a }),
                    gt: k(function(a, b, c) { for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d); return a })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (v in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) x.pseudos[v] = h(v);
            for (v in { submit: !0, reset: !0 }) x.pseudos[v] = i(v);
            return m.prototype = x.filters = x.pseudos, x.setFilters = new m, A = b.tokenize = function(a, c) { var d, e, f, g, h, i, j, k = T[a + " "]; if (k) return c ? 0 : k.slice(0); for (h = a, i = [], j = x.preFilter; h;) { d && !(e = ia.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ja.exec(h)) && (d = e.shift(), f.push({ value: d, type: e[0].replace(ha, " ") }), h = h.slice(d.length)); for (g in x.filter) !(e = na[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({ value: d, type: g, matches: e }), h = h.slice(d.length)); if (!d) break } return c ? h.length : h ? b.error(a) : T(a, i).slice(0) }, B = b.compile = function(a, b) {
                var c, d = [],
                    e = [],
                    f = U[a + " "];
                if (!f) {
                    for (b || (b = A(a)), c = b.length; c--;) f = t(b[c]), f[O] ? d.push(f) : e.push(f);
                    f = U(a, u(e, d)), f.selector = a
                }
                return f
            }, C = b.select = function(a, b, c, d) {
                var e, f, g, h, i, j = "function" == typeof a && a,
                    k = !d && A(a = j.selector || a);
                if (c = c || [], 1 === k.length) {
                    if (f = k[0] = k[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && w.getById && 9 === b.nodeType && J && x.relative[f[1].type]) {
                        if (b = (x.find.ID(g.matches[0].replace(ta, ua), b) || [])[0], !b) return c;
                        j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = na.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !x.relative[h = g.type]);)
                        if ((i = x.find[h]) && (d = i(g.matches[0].replace(ta, ua), sa.test(f[0].type) && l(b.parentNode) || b))) { if (f.splice(e, 1), a = d.length && n(f), !a) return $.apply(c, d), c; break }
                }
                return (j || B(a, k))(d, b, !J, c, !b || sa.test(a) && l(b.parentNode) || b), c
            }, w.sortStable = O.split("").sort(V).join("") === O, w.detectDuplicates = !!F, G(), w.sortDetached = e(function(a) { return 1 & a.compareDocumentPosition(H.createElement("fieldset")) }), e(function(a) { return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href") }) || f("type|href|height|width", function(a, b, c) { return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2) }), w.attributes && e(function(a) { return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value") }) || f("value", function(a, b, c) { return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue }), e(function(a) { return null == a.getAttribute("disabled") }) || f(ba, function(a, b, c) { var d; return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null }), b
        }(a);
        ma.find = ra, ma.expr = ra.selectors, ma.expr[":"] = ma.expr.pseudos, ma.uniqueSort = ma.unique = ra.uniqueSort, ma.text = ra.getText, ma.isXMLDoc = ra.isXML, ma.contains = ra.contains, ma.escapeSelector = ra.escape;
        var sa = function(a, b, c) {
                for (var d = [], e = void 0 !== c;
                    (a = a[b]) && 9 !== a.nodeType;)
                    if (1 === a.nodeType) {
                        if (e && ma(a).is(c)) break;
                        d.push(a)
                    } return d
            },
            ta = function(a, b) { for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a); return c },
            ua = ma.expr.match.needsContext,
            va = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            wa = /^.[^:#\[\.,]*$/;
        ma.filter = function(a, b, c) { var d = b[0]; return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ma.find.matchesSelector(d, a) ? [d] : [] : ma.find.matches(a, ma.grep(b, function(a) { return 1 === a.nodeType })) }, ma.fn.extend({
            find: function(a) {
                var b, c, d = this.length,
                    e = this;
                if ("string" != typeof a) return this.pushStack(ma(a).filter(function() {
                    for (b = 0; d > b; b++)
                        if (ma.contains(e[b], this)) return !0
                }));
                for (c = this.pushStack([]), b = 0; d > b; b++) ma.find(a, e[b], c);
                return d > 1 ? ma.uniqueSort(c) : c
            },
            filter: function(a) { return this.pushStack(e(this, a || [], !1)) },
            not: function(a) { return this.pushStack(e(this, a || [], !0)) },
            is: function(a) { return !!e(this, "string" == typeof a && ua.test(a) ? ma(a) : a || [], !1).length }
        });
        var xa, ya = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            za = ma.fn.init = function(a, b, c) {
                var d, e;
                if (!a) return this;
                if (c = c || xa, "string" == typeof a) {
                    if (d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ya.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                    if (d[1]) {
                        if (b = b instanceof ma ? b[0] : b, ma.merge(this, ma.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : _, !0)), va.test(d[1]) && ma.isPlainObject(b))
                            for (d in b) ma.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                        return this
                    }
                    return e = _.getElementById(d[2]), e && (this[0] = e, this.length = 1), this
                }
                return a.nodeType ? (this[0] = a, this.length = 1, this) : ma.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(ma) : ma.makeArray(a, this)
            };
        za.prototype = ma.fn, xa = ma(_);
        var Aa = /^(?:parents|prev(?:Until|All))/,
            Ba = { children: !0, contents: !0, next: !0, prev: !0 };
        ma.fn.extend({
            has: function(a) {
                var b = ma(a, this),
                    c = b.length;
                return this.filter(function() {
                    for (var a = 0; c > a; a++)
                        if (ma.contains(this, b[a])) return !0
                })
            },
            closest: function(a, b) {
                var c, d = 0,
                    e = this.length,
                    f = [],
                    g = "string" != typeof a && ma(a);
                if (!ua.test(a))
                    for (; e > d; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ma.find.matchesSelector(c, a))) { f.push(c); break } return this.pushStack(f.length > 1 ? ma.uniqueSort(f) : f)
            },
            index: function(a) { return a ? "string" == typeof a ? ea.call(ma(a), this[0]) : ea.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 },
            add: function(a, b) { return this.pushStack(ma.uniqueSort(ma.merge(this.get(), ma(a, b)))) },
            addBack: function(a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) }
        }), ma.each({ parent: function(a) { var b = a.parentNode; return b && 11 !== b.nodeType ? b : null }, parents: function(a) { return sa(a, "parentNode") }, parentsUntil: function(a, b, c) { return sa(a, "parentNode", c) }, next: function(a) { return f(a, "nextSibling") }, prev: function(a) { return f(a, "previousSibling") }, nextAll: function(a) { return sa(a, "nextSibling") }, prevAll: function(a) { return sa(a, "previousSibling") }, nextUntil: function(a, b, c) { return sa(a, "nextSibling", c) }, prevUntil: function(a, b, c) { return sa(a, "previousSibling", c) }, siblings: function(a) { return ta((a.parentNode || {}).firstChild, a) }, children: function(a) { return ta(a.firstChild) }, contents: function(a) { return a.contentDocument || ma.merge([], a.childNodes) } }, function(a, b) { ma.fn[a] = function(c, d) { var e = ma.map(this, b, c); return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ma.filter(d, e)), this.length > 1 && (Ba[a] || ma.uniqueSort(e), Aa.test(a) && e.reverse()), this.pushStack(e) } });
        var Ca = /\S+/g;
        ma.Callbacks = function(a) {
            a = "string" == typeof a ? g(a) : ma.extend({}, a);
            var b, c, d, e, f = [],
                h = [],
                i = -1,
                j = function() {
                    for (e = a.once, d = b = !0; h.length; i = -1)
                        for (c = h.shift(); ++i < f.length;) f[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = f.length, c = !1);
                    a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
                },
                k = {
                    add: function() { return f && (c && !b && (i = f.length - 1, h.push(c)), function d(b) { ma.each(b, function(b, c) { ma.isFunction(c) ? a.unique && k.has(c) || f.push(c) : c && c.length && "string" !== ma.type(c) && d(c) }) }(arguments), c && !b && j()), this },
                    remove: function() {
                        return ma.each(arguments, function(a, b) {
                            for (var c;
                                (c = ma.inArray(b, f, c)) > -1;) f.splice(c, 1), i >= c && i--
                        }), this
                    },
                    has: function(a) { return a ? ma.inArray(a, f) > -1 : f.length > 0 },
                    empty: function() { return f && (f = []), this },
                    disable: function() { return e = h = [], f = c = "", this },
                    disabled: function() { return !f },
                    lock: function() { return e = h = [], c || b || (f = c = ""), this },
                    locked: function() { return !!e },
                    fireWith: function(a, c) { return e || (c = c || [], c = [a, c.slice ? c.slice() : c], h.push(c), b || j()), this },
                    fire: function() { return k.fireWith(this, arguments), this },
                    fired: function() { return !!d }
                };
            return k
        }, ma.extend({
            Deferred: function(b) {
                var c = [
                        ["notify", "progress", ma.Callbacks("memory"), ma.Callbacks("memory"), 2],
                        ["resolve", "done", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 1, "rejected"]
                    ],
                    d = "pending",
                    e = {
                        state: function() { return d },
                        always: function() { return f.done(arguments).fail(arguments), this },
                        "catch": function(a) { return e.then(null, a) },
                        pipe: function() {
                            var a = arguments;
                            return ma.Deferred(function(b) {
                                ma.each(c, function(c, d) {
                                    var e = ma.isFunction(a[d[4]]) && a[d[4]];
                                    f[d[1]](function() {
                                        var a = e && e.apply(this, arguments);
                                        a && ma.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        then: function(b, d, e) {
                            function f(b, c, d, e) {
                                return function() {
                                    var j = this,
                                        k = arguments,
                                        l = function() {
                                            var a, l;
                                            if (!(g > b)) {
                                                if (a = d.apply(j, k), a === c.promise()) throw new TypeError("Thenable self-resolution");
                                                l = a && ("object" == typeof a || "function" == typeof a) && a.then, ma.isFunction(l) ? e ? l.call(a, f(g, c, h, e), f(g, c, i, e)) : (g++, l.call(a, f(g, c, h, e), f(g, c, i, e), f(g, c, h, c.notifyWith))) : (d !== h && (j = void 0, k = [a]), (e || c.resolveWith)(j, k))
                                            }
                                        },
                                        m = e ? l : function() { try { l() } catch (a) { ma.Deferred.exceptionHook && ma.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== i && (j = void 0, k = [a]), c.rejectWith(j, k)) } };
                                    b ? m() : (ma.Deferred.getStackHook && (m.stackTrace = ma.Deferred.getStackHook()), a.setTimeout(m))
                                }
                            }
                            var g = 0;
                            return ma.Deferred(function(a) { c[0][3].add(f(0, a, ma.isFunction(e) ? e : h, a.notifyWith)), c[1][3].add(f(0, a, ma.isFunction(b) ? b : h)), c[2][3].add(f(0, a, ma.isFunction(d) ? d : i)) }).promise()
                        },
                        promise: function(a) { return null != a ? ma.extend(a, e) : e }
                    },
                    f = {};
                return ma.each(c, function(a, b) {
                    var g = b[2],
                        h = b[5];
                    e[b[1]] = g.add, h && g.add(function() { d = h }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function() { return f[b[0] + "With"](this === f ? void 0 : this, arguments), this }, f[b[0] + "With"] = g.fireWith
                }), e.promise(f), b && b.call(f, f), f
            },
            when: function(a) {
                var b = arguments.length,
                    c = b,
                    d = Array(c),
                    e = ba.call(arguments),
                    f = ma.Deferred(),
                    g = function(a) { return function(c) { d[a] = this, e[a] = arguments.length > 1 ? ba.call(arguments) : c, --b || f.resolveWith(d, e) } };
                if (1 >= b && (j(a, f.done(g(c)).resolve, f.reject), "pending" === f.state() || ma.isFunction(e[c] && e[c].then))) return f.then();
                for (; c--;) j(e[c], g(c), f.reject);
                return f.promise()
            }
        });
        var Da = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        ma.Deferred.exceptionHook = function(b, c) { a.console && a.console.warn && b && Da.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c) }, ma.readyException = function(b) { a.setTimeout(function() { throw b }) };
        var Ea = ma.Deferred();
        ma.fn.ready = function(a) { return Ea.then(a)["catch"](function(a) { ma.readyException(a) }), this }, ma.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) { a ? ma.readyWait++ : ma.ready(!0) },
            ready: function(a) {
                (a === !0 ? --ma.readyWait : ma.isReady) || (ma.isReady = !0, a !== !0 && --ma.readyWait > 0 || Ea.resolveWith(_, [ma]))
            }
        }), ma.ready.then = Ea.then, "complete" === _.readyState || "loading" !== _.readyState && !_.documentElement.doScroll ? a.setTimeout(ma.ready) : (_.addEventListener("DOMContentLoaded", k), a.addEventListener("load", k));
        var Fa = function(a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === ma.type(c)) { e = !0; for (h in c) Fa(a, b, h, c[h], !0, f, g) } else if (void 0 !== d && (e = !0, ma.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) { return j.call(ma(a), c) })), b))
                    for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            },
            Ga = function(a) { return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType };
        l.uid = 1, l.prototype = {
            cache: function(a) { var b = a[this.expando]; return b || (b = {}, Ga(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b },
            set: function(a, b, c) {
                var d, e = this.cache(a);
                if ("string" == typeof b) e[ma.camelCase(b)] = c;
                else
                    for (d in b) e[ma.camelCase(d)] = b[d];
                return e
            },
            get: function(a, b) { return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][ma.camelCase(b)] },
            access: function(a, b, c) { return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b) },
            remove: function(a, b) { var c, d = a[this.expando]; if (void 0 !== d) { if (void 0 !== b) { ma.isArray(b) ? b = b.map(ma.camelCase) : (b = ma.camelCase(b), b = b in d ? [b] : b.match(Ca) || []), c = b.length; for (; c--;) delete d[b[c]] }(void 0 === b || ma.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]) } },
            hasData: function(a) { var b = a[this.expando]; return void 0 !== b && !ma.isEmptyObject(b) }
        };
        var Ha = new l,
            Ia = new l,
            Ja = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ka = /[A-Z]/g;
        ma.extend({ hasData: function(a) { return Ia.hasData(a) || Ha.hasData(a) }, data: function(a, b, c) { return Ia.access(a, b, c) }, removeData: function(a, b) { Ia.remove(a, b) }, _data: function(a, b, c) { return Ha.access(a, b, c) }, _removeData: function(a, b) { Ha.remove(a, b) } }), ma.fn.extend({
            data: function(a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = Ia.get(f), 1 === f.nodeType && !Ha.get(f, "hasDataAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ma.camelCase(d.slice(5)), m(f, d, e[d])));
                        Ha.set(f, "hasDataAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function() { Ia.set(this, a) }) : Fa(this, function(b) { var c; if (f && void 0 === b) { if (c = Ia.get(f, a), void 0 !== c) return c; if (c = m(f, a), void 0 !== c) return c } else this.each(function() { Ia.set(this, a, b) }) }, null, b, arguments.length > 1, null, !0)
            },
            removeData: function(a) { return this.each(function() { Ia.remove(this, a) }) }
        }), ma.extend({
            queue: function(a, b, c) { var d; return a ? (b = (b || "fx") + "queue", d = Ha.get(a, b), c && (!d || ma.isArray(c) ? d = Ha.access(a, b, ma.makeArray(c)) : d.push(c)), d || []) : void 0 },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = ma.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = ma._queueHooks(a, b),
                    g = function() { ma.dequeue(a, b) };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) { var c = b + "queueHooks"; return Ha.get(a, c) || Ha.access(a, c, { empty: ma.Callbacks("once memory").add(function() { Ha.remove(a, [b + "queue", c]) }) }) }
        }), ma.fn.extend({
            queue: function(a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ma.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                    var c = ma.queue(this, a, b);
                    ma._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ma.dequeue(this, a)
                })
            },
            dequeue: function(a) { return this.each(function() { ma.dequeue(this, a) }) },
            clearQueue: function(a) { return this.queue(a || "fx", []) },
            promise: function(a, b) {
                var c, d = 1,
                    e = ma.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {--d || e.resolveWith(f, [f]) };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = Ha.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var La = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ma = new RegExp("^(?:([+-])=|)(" + La + ")([a-z%]*)$", "i"),
            Na = ["Top", "Right", "Bottom", "Left"],
            Oa = function(a, b) { return a = b || a, "none" === a.style.display || "" === a.style.display && ma.contains(a.ownerDocument, a) && "none" === ma.css(a, "display") },
            Pa = function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            },
            Qa = {};
        ma.fn.extend({ show: function() { return p(this, !0) }, hide: function() { return p(this) }, toggle: function(a) { return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() { Oa(this) ? ma(this).show() : ma(this).hide() }) } });
        var Ra = /^(?:checkbox|radio)$/i,
            Sa = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Ta = /^$|\/(?:java|ecma)script/i,
            Ua = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
        Ua.optgroup = Ua.option, Ua.tbody = Ua.tfoot = Ua.colgroup = Ua.caption = Ua.thead, Ua.th = Ua.td;
        var Va = /<|&#?\w+;/;
        ! function() {
            var a = _.createDocumentFragment(),
                b = a.appendChild(_.createElement("div")),
                c = _.createElement("input");
            c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), ka.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", ka.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var Wa = _.documentElement,
            Xa = /^key/,
            Ya = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Za = /^([^.]*)(?:\.(.+)|)/;
        ma.event = {
            global: {},
            add: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ha.get(a);
                if (q)
                    for (c.handler && (f = c, c = f.handler, e = f.selector), e && ma.find.matchesSelector(Wa, e), c.guid || (c.guid = ma.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) { return "undefined" != typeof ma && ma.event.triggered !== b.type ? ma.event.dispatch.apply(a, arguments) : void 0 }), b = (b || "").match(Ca) || [""], j = b.length; j--;) h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = ma.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = ma.event.special[n] || {}, k = ma.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && ma.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), ma.event.global[n] = !0)
            },
            remove: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ha.hasData(a) && Ha.get(a);
                if (q && (i = q.events)) {
                    for (b = (b || "").match(Ca) || [""], j = b.length; j--;)
                        if (h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                            for (l = ma.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                            g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ma.removeEvent(a, n, q.handle), delete i[n])
                        } else
                            for (n in i) ma.event.remove(a, n + b[j], c, d, !0);
                    ma.isEmptyObject(i) && Ha.remove(a, "handle events")
                }
            },
            dispatch: function(a) {
                var b, c, d, e, f, g, h = ma.event.fix(a),
                    i = new Array(arguments.length),
                    j = (Ha.get(this, "events") || {})[h.type] || [],
                    k = ma.event.special[h.type] || {};
                for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
                if (h.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, h) !== !1) {
                    for (g = ma.event.handlers.call(this, h, j), b = 0;
                        (e = g[b++]) && !h.isPropagationStopped();)
                        for (h.currentTarget = e.elem, c = 0;
                            (f = e.handlers[c++]) && !h.isImmediatePropagationStopped();) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, h.data = f.data, d = ((ma.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i), void 0 !== d && (h.result = d) === !1 && (h.preventDefault(), h.stopPropagation()));
                    return k.postDispatch && k.postDispatch.call(this, h), h.result
                }
            },
            handlers: function(a, b) {
                var c, d, e, f, g = [],
                    h = b.delegateCount,
                    i = a.target;
                if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                    for (; i !== this; i = i.parentNode || this)
                        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                            for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? ma(e, this).index(i) > -1 : ma.find(e, this, null, [i]).length), d[e] && d.push(f);
                            d.length && g.push({ elem: i, handlers: d })
                        } return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g
            },
            addProp: function(a, b) { Object.defineProperty(ma.Event.prototype, a, { enumerable: !0, configurable: !0, get: ma.isFunction(b) ? function() { return this.originalEvent ? b(this.originalEvent) : void 0 } : function() { return this.originalEvent ? this.originalEvent[a] : void 0 }, set: function(b) { Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b }) } }) },
            fix: function(a) { return a[ma.expando] ? a : new ma.Event(a) },
            special: { load: { noBubble: !0 }, focus: { trigger: function() { return this !== v() && this.focus ? (this.focus(), !1) : void 0 }, delegateType: "focusin" }, blur: { trigger: function() { return this === v() && this.blur ? (this.blur(), !1) : void 0 }, delegateType: "focusout" }, click: { trigger: function() { return "checkbox" === this.type && this.click && ma.nodeName(this, "input") ? (this.click(), !1) : void 0 }, _default: function(a) { return ma.nodeName(a.target, "a") } }, beforeunload: { postDispatch: function(a) { void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result) } } }
        }, ma.removeEvent = function(a, b, c) { a.removeEventListener && a.removeEventListener(b, c) }, ma.Event = function(a, b) { return this instanceof ma.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? t : u, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && ma.extend(this, b), this.timeStamp = a && a.timeStamp || ma.now(), void(this[ma.expando] = !0)) : new ma.Event(a, b) }, ma.Event.prototype = {
            constructor: ma.Event,
            isDefaultPrevented: u,
            isPropagationStopped: u,
            isImmediatePropagationStopped: u,
            isSimulated: !1,
            preventDefault: function() {
                var a = this.originalEvent;
                this.isDefaultPrevented = t, a && !this.isSimulated && a.preventDefault()
            },
            stopPropagation: function() {
                var a = this.originalEvent;
                this.isPropagationStopped = t, a && !this.isSimulated && a.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = t, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ma.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function(a) { var b = a.button; return null == a.which && Xa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && Ya.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which } }, ma.event.addProp), ma.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(a, b) {
            ma.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function(a) {
                    var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return e && (e === d || ma.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), ma.fn.extend({ on: function(a, b, c, d) { return w(this, a, b, c, d) }, one: function(a, b, c, d) { return w(this, a, b, c, d, 1) }, off: function(a, b, c) { var d, e; if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ma(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this; if ("object" == typeof a) { for (e in a) this.off(e, b, a[e]); return this } return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = u), this.each(function() { ma.event.remove(this, a, c, b) }) } });
        var $a = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            _a = /<script|<style|<link/i,
            ab = /checked\s*(?:[^=]|=\s*.checked.)/i,
            bb = /^true\/(.*)/,
            cb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        ma.extend({
            htmlPrefilter: function(a) { return a.replace($a, "<$1></$2>") },
            clone: function(a, b, c) {
                var d, e, f, g, h = a.cloneNode(!0),
                    i = ma.contains(a.ownerDocument, a);
                if (!(ka.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ma.isXMLDoc(a)))
                    for (g = q(h), f = q(a), d = 0, e = f.length; e > d; d++) B(f[d], g[d]);
                if (b)
                    if (c)
                        for (f = f || q(a), g = g || q(h), d = 0, e = f.length; e > d; d++) A(f[d], g[d]);
                    else A(a, h);
                return g = q(h, "script"), g.length > 0 && r(g, !i && q(a, "script")), h
            },
            cleanData: function(a) {
                for (var b, c, d, e = ma.event.special, f = 0; void 0 !== (c = a[f]); f++)
                    if (Ga(c)) {
                        if (b = c[Ha.expando]) {
                            if (b.events)
                                for (d in b.events) e[d] ? ma.event.remove(c, d) : ma.removeEvent(c, d, b.handle);
                            c[Ha.expando] = void 0
                        }
                        c[Ia.expando] && (c[Ia.expando] = void 0)
                    }
            }
        }), ma.fn.extend({
            detach: function(a) { return D(this, a, !0) },
            remove: function(a) { return D(this, a) },
            text: function(a) { return Fa(this, function(a) { return void 0 === a ? ma.text(this) : this.empty().each(function() { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a) }) }, null, a, arguments.length) },
            append: function() {
                return C(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = x(this, a);
                        b.appendChild(a)
                    }
                })
            },
            prepend: function() {
                return C(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = x(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function() { return C(this, arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this) }) },
            after: function() { return C(this, arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this.nextSibling) }) },
            empty: function() { for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (ma.cleanData(q(a, !1)), a.textContent = ""); return this },
            clone: function(a, b) { return a = null != a && a, b = null == b ? a : b, this.map(function() { return ma.clone(this, a, b) }) },
            html: function(a) {
                return Fa(this, function(a) {
                    var b = this[0] || {},
                        c = 0,
                        d = this.length;
                    if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                    if ("string" == typeof a && !_a.test(a) && !Ua[(Sa.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = ma.htmlPrefilter(a);
                        try {
                            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ma.cleanData(q(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (e) {}
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function() {
                var a = [];
                return C(this, arguments, function(b) {
                    var c = this.parentNode;
                    ma.inArray(this, a) < 0 && (ma.cleanData(q(this)), c && c.replaceChild(b, this))
                }, a)
            }
        }), ma.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(a, b) { ma.fn[a] = function(a) { for (var c, d = [], e = ma(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), ma(e[g])[b](c), da.apply(d, c.get()); return this.pushStack(d) } });
        var db = /^margin/,
            eb = new RegExp("^(" + La + ")(?!px)[a-z%]+$", "i"),
            fb = function(b) { var c = b.ownerDocument.defaultView; return c && c.opener || (c = a), c.getComputedStyle(b) };
        ! function() {
            function b() {
                if (h) {
                    h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Wa.appendChild(g);
                    var b = a.getComputedStyle(h);
                    c = "1%" !== b.top, f = "2px" === b.marginLeft, d = "4px" === b.width, h.style.marginRight = "50%", e = "4px" === b.marginRight, Wa.removeChild(g), h = null
                }
            }
            var c, d, e, f, g = _.createElement("div"),
                h = _.createElement("div");
            h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ka.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), ma.extend(ka, { pixelPosition: function() { return b(), c }, boxSizingReliable: function() { return b(), d }, pixelMarginRight: function() { return b(), e }, reliableMarginLeft: function() { return b(), f } }))
        }();
        var gb = /^(none|table(?!-c[ea]).+)/,
            hb = { position: "absolute", visibility: "hidden", display: "block" },
            ib = { letterSpacing: "0", fontWeight: "400" },
            jb = ["Webkit", "Moz", "ms"],
            kb = _.createElement("div").style;
        ma.extend({
            cssHooks: { opacity: { get: function(a, b) { if (b) { var c = E(a, "opacity"); return "" === c ? "1" : c } } } },
            cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { "float": "cssFloat" },
            style: function(a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = ma.camelCase(b),
                        i = a.style;
                    return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ma.exec(c)) && e[1] && (c = n(a, b, e), f = "number"), void(null != c && c === c && ("number" === f && (c += e && e[3] || (ma.cssNumber[h] ? "" : "px")), ka.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))))
                }
            },
            css: function(a, b, c, d) { var e, f, g, h = ma.camelCase(b); return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = E(a, b, d)), "normal" === e && b in ib && (e = ib[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e }
        }), ma.each(["height", "width"], function(a, b) {
            ma.cssHooks[b] = {
                get: function(a, c, d) { return c ? !gb.test(ma.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? J(a, b, d) : Pa(a, hb, function() { return J(a, b, d) }) : void 0 },
                set: function(a, c, d) {
                    var e, f = d && fb(a),
                        g = d && I(a, b, d, "border-box" === ma.css(a, "boxSizing", !1, f), f);
                    return g && (e = Ma.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = ma.css(a, b)), H(a, c, g)
                }
            }
        }), ma.cssHooks.marginLeft = F(ka.reliableMarginLeft, function(a, b) {
            return b ? (parseFloat(E(a, "marginLeft")) || a.getBoundingClientRect().left - Pa(a, {
                marginLeft: 0
            }, function() { return a.getBoundingClientRect().left })) + "px" : void 0
        }), ma.each({ margin: "", padding: "", border: "Width" }, function(a, b) { ma.cssHooks[a + b] = { expand: function(c) { for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Na[d] + b] = f[d] || f[d - 2] || f[0]; return e } }, db.test(a) || (ma.cssHooks[a + b].set = H) }), ma.fn.extend({
            css: function(a, b) {
                return Fa(this, function(a, b, c) {
                    var d, e, f = {},
                        g = 0;
                    if (ma.isArray(b)) { for (d = fb(a), e = b.length; e > g; g++) f[b[g]] = ma.css(a, b[g], !1, d); return f }
                    return void 0 !== c ? ma.style(a, b, c) : ma.css(a, b)
                }, a, b, arguments.length > 1)
            }
        }), ma.Tween = K, K.prototype = { constructor: K, init: function(a, b, c, d, e, f) { this.elem = a, this.prop = c, this.easing = e || ma.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ma.cssNumber[c] ? "" : "px") }, cur: function() { var a = K.propHooks[this.prop]; return a && a.get ? a.get(this) : K.propHooks._default.get(this) }, run: function(a) { var b, c = K.propHooks[this.prop]; return this.options.duration ? this.pos = b = ma.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this } }, K.prototype.init.prototype = K.prototype, K.propHooks = { _default: { get: function(a) { var b; return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = ma.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) }, set: function(a) { ma.fx.step[a.prop] ? ma.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[ma.cssProps[a.prop]] && !ma.cssHooks[a.prop] ? a.elem[a.prop] = a.now : ma.style(a.elem, a.prop, a.now + a.unit) } } }, K.propHooks.scrollTop = K.propHooks.scrollLeft = { set: function(a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }, ma.easing = { linear: function(a) { return a }, swing: function(a) { return .5 - Math.cos(a * Math.PI) / 2 }, _default: "swing" }, ma.fx = K.prototype.init, ma.fx.step = {};
        var lb, mb, nb = /^(?:toggle|show|hide)$/,
            ob = /queueHooks$/;
        ma.Animation = ma.extend(R, { tweeners: { "*": [function(a, b) { var c = this.createTween(a, b); return n(c.elem, a, Ma.exec(b), c), c }] }, tweener: function(a, b) { ma.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Ca); for (var c, d = 0, e = a.length; e > d; d++) c = a[d], R.tweeners[c] = R.tweeners[c] || [], R.tweeners[c].unshift(b) }, prefilters: [P], prefilter: function(a, b) { b ? R.prefilters.unshift(a) : R.prefilters.push(a) } }), ma.speed = function(a, b, c) { var d = a && "object" == typeof a ? ma.extend({}, a) : { complete: c || !c && b || ma.isFunction(a) && a, duration: a, easing: c && b || b && !ma.isFunction(b) && b }; return ma.fx.off || _.hidden ? d.duration = 0 : d.duration = "number" == typeof d.duration ? d.duration : d.duration in ma.fx.speeds ? ma.fx.speeds[d.duration] : ma.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() { ma.isFunction(d.old) && d.old.call(this), d.queue && ma.dequeue(this, d.queue) }, d }, ma.fn.extend({
                fadeTo: function(a, b, c, d) { return this.filter(Oa).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) },
                animate: function(a, b, c, d) {
                    var e = ma.isEmptyObject(a),
                        f = ma.speed(b, c, d),
                        g = function() {
                            var b = R(this, ma.extend({}, a), f);
                            (e || Ha.get(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = ma.timers,
                            g = Ha.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && ob.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        !b && c || ma.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"), this.each(function() {
                        var b, c = Ha.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = ma.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, ma.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), ma.each(["toggle", "show", "hide"], function(a, b) {
                var c = ma.fn[b];
                ma.fn[b] = function(a, d, e) { return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e) }
            }), ma.each({ slideDown: N("show"), slideUp: N("hide"), slideToggle: N("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(a, b) { ma.fn[a] = function(a, c, d) { return this.animate(b, a, c, d) } }), ma.timers = [], ma.fx.tick = function() {
                var a, b = 0,
                    c = ma.timers;
                for (lb = ma.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
                c.length || ma.fx.stop(), lb = void 0
            }, ma.fx.timer = function(a) { ma.timers.push(a), a() ? ma.fx.start() : ma.timers.pop() }, ma.fx.interval = 13, ma.fx.start = function() { mb || (mb = a.requestAnimationFrame ? a.requestAnimationFrame(L) : a.setInterval(ma.fx.tick, ma.fx.interval)) }, ma.fx.stop = function() { a.cancelAnimationFrame ? a.cancelAnimationFrame(mb) : a.clearInterval(mb), mb = null }, ma.fx.speeds = { slow: 600, fast: 200, _default: 400 }, ma.fn.delay = function(b, c) {
                return b = ma.fx ? ma.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
                    var e = a.setTimeout(c, b);
                    d.stop = function() { a.clearTimeout(e) }
                })
            },
            function() {
                var a = _.createElement("input"),
                    b = _.createElement("select"),
                    c = b.appendChild(_.createElement("option"));
                a.type = "checkbox", ka.checkOn = "" !== a.value, ka.optSelected = c.selected, a = _.createElement("input"), a.value = "t", a.type = "radio", ka.radioValue = "t" === a.value
            }();
        var pb, qb = ma.expr.attrHandle;
        ma.fn.extend({ attr: function(a, b) { return Fa(this, ma.attr, a, b, arguments.length > 1) }, removeAttr: function(a) { return this.each(function() { ma.removeAttr(this, a) }) } }), ma.extend({
            attr: function(a, b, c) { var d, e, f = a.nodeType; return 3 !== f && 8 !== f && 2 !== f ? "undefined" == typeof a.getAttribute ? ma.prop(a, b, c) : (1 === f && ma.isXMLDoc(a) || (e = ma.attrHooks[b.toLowerCase()] || (ma.expr.match.bool.test(b) ? pb : void 0)), void 0 !== c ? null === c ? void ma.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = ma.find.attr(a, b), null == d ? void 0 : d)) : void 0 },
            attrHooks: { type: { set: function(a, b) { if (!ka.radioValue && "radio" === b && ma.nodeName(a, "input")) { var c = a.value; return a.setAttribute("type", b), c && (a.value = c), b } } } },
            removeAttr: function(a, b) {
                var c, d = 0,
                    e = b && b.match(Ca);
                if (e && 1 === a.nodeType)
                    for (; c = e[d++];) a.removeAttribute(c)
            }
        }), pb = { set: function(a, b, c) { return b === !1 ? ma.removeAttr(a, c) : a.setAttribute(c, c), c } }, ma.each(ma.expr.match.bool.source.match(/\w+/g), function(a, b) {
            var c = qb[b] || ma.find.attr;
            qb[b] = function(a, b, d) { var e, f, g = b.toLowerCase(); return d || (f = qb[g], qb[g] = e, e = null != c(a, b, d) ? g : null, qb[g] = f), e }
        });
        var rb = /^(?:input|select|textarea|button)$/i,
            sb = /^(?:a|area)$/i;
        ma.fn.extend({ prop: function(a, b) { return Fa(this, ma.prop, a, b, arguments.length > 1) }, removeProp: function(a) { return this.each(function() { delete this[ma.propFix[a] || a] }) } }), ma.extend({ prop: function(a, b, c) { var d, e, f = a.nodeType; return 3 !== f && 8 !== f && 2 !== f ? (1 === f && ma.isXMLDoc(a) || (b = ma.propFix[b] || b, e = ma.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0 }, propHooks: { tabIndex: { get: function(a) { var b = ma.find.attr(a, "tabindex"); return b ? parseInt(b, 10) : rb.test(a.nodeName) || sb.test(a.nodeName) && a.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), ka.optSelected || (ma.propHooks.selected = {
            get: function(a) { var b = a.parentNode; return b && b.parentNode && b.parentNode.selectedIndex, null },
            set: function(a) {
                var b = a.parentNode;
                b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
            }
        }), ma.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { ma.propFix[this.toLowerCase()] = this });
        var tb = /[\t\r\n\f]/g;
        ma.fn.extend({
            addClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (ma.isFunction(a)) return this.each(function(b) { ma(this).addClass(a.call(this, b, S(this))) });
                if ("string" == typeof a && a)
                    for (b = a.match(Ca) || []; c = this[i++];)
                        if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                            for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                            h = ma.trim(d), e !== h && c.setAttribute("class", h)
                        } return this
            },
            removeClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (ma.isFunction(a)) return this.each(function(b) { ma(this).removeClass(a.call(this, b, S(this))) });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof a && a)
                    for (b = a.match(Ca) || []; c = this[i++];)
                        if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                            for (g = 0; f = b[g++];)
                                for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                            h = ma.trim(d), e !== h && c.setAttribute("class", h)
                        } return this
            },
            toggleClass: function(a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ma.isFunction(a) ? this.each(function(c) { ma(this).toggleClass(a.call(this, c, S(this), b), b) }) : this.each(function() {
                    var b, d, e, f;
                    if ("string" === c)
                        for (d = 0, e = ma(this), f = a.match(Ca) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else void 0 !== a && "boolean" !== c || (b = S(this), b && Ha.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : Ha.get(this, "__className__") || ""))
                })
            },
            hasClass: function(a) {
                var b, c, d = 0;
                for (b = " " + a + " "; c = this[d++];)
                    if (1 === c.nodeType && (" " + S(c) + " ").replace(tb, " ").indexOf(b) > -1) return !0;
                return !1
            }
        });
        var ub = /\r/g,
            vb = /[\x20\t\r\n\f]+/g;
        ma.fn.extend({
            val: function(a) {
                var b, c, d, e = this[0];
                return arguments.length ? (d = ma.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, ma(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ma.isArray(e) && (e = ma.map(e, function(a) { return null == a ? "" : a + "" })), b = ma.valHooks[this.type] || ma.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                })) : e ? (b = ma.valHooks[e.type] || ma.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)) : void 0
            }
        }), ma.extend({
            valHooks: {
                option: { get: function(a) { var b = ma.find.attr(a, "value"); return null != b ? b : ma.trim(ma.text(a)).replace(vb, " ") } },
                select: {
                    get: function(a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                            if (c = d[i], (c.selected || i === e) && !c.disabled && (!c.parentNode.disabled || !ma.nodeName(c.parentNode, "optgroup"))) {
                                if (b = ma(c).val(), f) return b;
                                g.push(b)
                            } return g
                    },
                    set: function(a, b) { for (var c, d, e = a.options, f = ma.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ma.inArray(ma.valHooks.option.get(d), f) > -1) && (c = !0); return c || (a.selectedIndex = -1), f }
                }
            }
        }), ma.each(["radio", "checkbox"], function() { ma.valHooks[this] = { set: function(a, b) { return ma.isArray(b) ? a.checked = ma.inArray(ma(a).val(), b) > -1 : void 0 } }, ka.checkOn || (ma.valHooks[this].get = function(a) { return null === a.getAttribute("value") ? "on" : a.value }) });
        var wb = /^(?:focusinfocus|focusoutblur)$/;
        ma.extend(ma.event, {
            trigger: function(b, c, d, e) {
                var f, g, h, i, j, k, l, m = [d || _],
                    n = ha.call(b, "type") ? b.type : b,
                    o = ha.call(b, "namespace") ? b.namespace.split(".") : [];
                if (g = h = d = d || _, 3 !== d.nodeType && 8 !== d.nodeType && !wb.test(n + ma.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[ma.expando] ? b : new ma.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ma.makeArray(c, [b]), l = ma.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                    if (!e && !l.noBubble && !ma.isWindow(d)) {
                        for (i = l.delegateType || n, wb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                        h === (d.ownerDocument || _) && m.push(h.defaultView || h.parentWindow || a)
                    }
                    for (f = 0;
                        (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (Ha.get(g, "events") || {})[b.type] && Ha.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && Ga(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                    return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !Ga(d) || j && ma.isFunction(d[n]) && !ma.isWindow(d) && (h = d[j], h && (d[j] = null), ma.event.triggered = n, d[n](), ma.event.triggered = void 0, h && (d[j] = h)), b.result
                }
            },
            simulate: function(a, b, c) {
                var d = ma.extend(new ma.Event, c, { type: a, isSimulated: !0 });
                ma.event.trigger(d, null, b)
            }
        }), ma.fn.extend({ trigger: function(a, b) { return this.each(function() { ma.event.trigger(a, b, this) }) }, triggerHandler: function(a, b) { var c = this[0]; return c ? ma.event.trigger(a, b, c, !0) : void 0 } }), ma.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) { ma.fn[b] = function(a, c) { return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b) } }), ma.fn.extend({ hover: function(a, b) { return this.mouseenter(a).mouseleave(b || a) } }), ka.focusin = "onfocusin" in a, ka.focusin || ma.each({ focus: "focusin", blur: "focusout" }, function(a, b) {
            var c = function(a) { ma.event.simulate(b, a.target, ma.event.fix(a)) };
            ma.event.special[b] = {
                setup: function() {
                    var d = this.ownerDocument || this,
                        e = Ha.access(d, b);
                    e || d.addEventListener(a, c, !0), Ha.access(d, b, (e || 0) + 1)
                },
                teardown: function() {
                    var d = this.ownerDocument || this,
                        e = Ha.access(d, b) - 1;
                    e ? Ha.access(d, b, e) : (d.removeEventListener(a, c, !0), Ha.remove(d, b))
                }
            }
        });
        var xb = a.location,
            yb = ma.now(),
            zb = /\?/;
        ma.parseXML = function(b) { var c; if (!b || "string" != typeof b) return null; try { c = (new a.DOMParser).parseFromString(b, "text/xml") } catch (d) { c = void 0 } return c && !c.getElementsByTagName("parsererror").length || ma.error("Invalid XML: " + b), c };
        var Ab = /\[\]$/,
            Bb = /\r?\n/g,
            Cb = /^(?:submit|button|image|reset|file)$/i,
            Db = /^(?:input|select|textarea|keygen)/i;
        ma.param = function(a, b) {
            var c, d = [],
                e = function(a, b) {
                    var c = ma.isFunction(b) ? b() : b;
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
                };
            if (ma.isArray(a) || a.jquery && !ma.isPlainObject(a)) ma.each(a, function() { e(this.name, this.value) });
            else
                for (c in a) T(c, a[c], b, e);
            return d.join("&")
        }, ma.fn.extend({ serialize: function() { return ma.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var a = ma.prop(this, "elements"); return a ? ma.makeArray(a) : this }).filter(function() { var a = this.type; return this.name && !ma(this).is(":disabled") && Db.test(this.nodeName) && !Cb.test(a) && (this.checked || !Ra.test(a)) }).map(function(a, b) { var c = ma(this).val(); return null == c ? null : ma.isArray(c) ? ma.map(c, function(a) { return { name: b.name, value: a.replace(Bb, "\r\n") } }) : { name: b.name, value: c.replace(Bb, "\r\n") } }).get() } });
        var Eb = /%20/g,
            Fb = /#.*$/,
            Gb = /([?&])_=[^&]*/,
            Hb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ib = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Jb = /^(?:GET|HEAD)$/,
            Kb = /^\/\//,
            Lb = {},
            Mb = {},
            Nb = "*/".concat("*"),
            Ob = _.createElement("a");
        Ob.href = xb.href, ma.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: { url: xb.href, type: "GET", isLocal: Ib.test(xb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Nb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": ma.parseXML }, flatOptions: { url: !0, context: !0 } },
            ajaxSetup: function(a, b) { return b ? W(W(a, ma.ajaxSettings), b) : W(ma.ajaxSettings, a) },
            ajaxPrefilter: U(Lb),
            ajaxTransport: U(Mb),
            ajax: function(b, c) {
                function d(b, c, d, h) {
                    var j, m, n, u, v, w = c;
                    k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && 300 > b || 304 === b, d && (u = X(o, x, d)), u = Y(o, u, x, j), j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (ma.lastModified[f] = v), v = x.getResponseHeader("etag"), v && (ma.etag[f] = v)), 204 === b || "HEAD" === o.type ? w = "nocontent" : 304 === b ? w = "notmodified" : (w = u.state, m = u.data, n = u.error, j = !n)) : (n = w, !b && w || (w = "error", 0 > b && (b = 0))), x.status = b, x.statusText = (c || w) + "", j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]), x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]), s.fireWith(p, [x, w]), l && (q.trigger("ajaxComplete", [x, o]), --ma.active || ma.event.trigger("ajaxStop")))
                }
                "object" == typeof b && (c = b, b = void 0), c = c || {};
                var e, f, g, h, i, j, k, l, m, n, o = ma.ajaxSetup({}, c),
                    p = o.context || o,
                    q = o.context && (p.nodeType || p.jquery) ? ma(p) : ma.event,
                    r = ma.Deferred(),
                    s = ma.Callbacks("once memory"),
                    t = o.statusCode || {},
                    u = {},
                    v = {},
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (k) {
                                if (!h)
                                    for (h = {}; b = Hb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                b = h[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function() { return k ? g : null },
                        setRequestHeader: function(a, b) { return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), this },
                        overrideMimeType: function(a) { return null == k && (o.mimeType = a), this },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (k) x.always(a[x.status]);
                                else
                                    for (b in a) t[b] = [t[b], a[b]];
                            return this
                        },
                        abort: function(a) { var b = a || w; return e && e.abort(b), d(0, b), this }
                    };
                if (r.promise(x), o.url = ((b || o.url || xb.href) + "").replace(Kb, xb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Ca) || [""], null == o.crossDomain) { j = _.createElement("a"); try { j.href = o.url, j.href = j.href, o.crossDomain = Ob.protocol + "//" + Ob.host != j.protocol + "//" + j.host } catch (y) { o.crossDomain = !0 } }
                if (o.data && o.processData && "string" != typeof o.data && (o.data = ma.param(o.data, o.traditional)), V(Lb, o, c, x), k) return x;
                l = ma.event && o.global, l && 0 === ma.active++ && ma.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Jb.test(o.type), f = o.url.replace(Fb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Eb, "+")) : (n = o.url.slice(f.length), o.data && (f += (zb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Gb, ""), n = (zb.test(f) ? "&" : "?") + "_=" + yb++ + n), o.url = f + n), o.ifModified && (ma.lastModified[f] && x.setRequestHeader("If-Modified-Since", ma.lastModified[f]), ma.etag[f] && x.setRequestHeader("If-None-Match", ma.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", o.contentType), x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Nb + "; q=0.01" : "") : o.accepts["*"]);
                for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
                if (o.beforeSend && (o.beforeSend.call(p, x, o) === !1 || k)) return x.abort();
                if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = V(Mb, o, c, x)) {
                    if (x.readyState = 1, l && q.trigger("ajaxSend", [x, o]), k) return x;
                    o.async && o.timeout > 0 && (i = a.setTimeout(function() { x.abort("timeout") }, o.timeout));
                    try { k = !1, e.send(u, d) } catch (y) {
                        if (k) throw y;
                        d(-1, y)
                    }
                } else d(-1, "No Transport");
                return x
            },
            getJSON: function(a, b, c) { return ma.get(a, b, c, "json") },
            getScript: function(a, b) { return ma.get(a, void 0, b, "script") }
        }), ma.each(["get", "post"], function(a, b) { ma[b] = function(a, c, d, e) { return ma.isFunction(c) && (e = e || d, d = c, c = void 0), ma.ajax(ma.extend({ url: a, type: b, dataType: e, data: c, success: d }, ma.isPlainObject(a) && a)) } }), ma._evalUrl = function(a) { return ma.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 }) }, ma.fn.extend({
            wrapAll: function(a) { var b; return this[0] && (ma.isFunction(a) && (a = a.call(this[0])), b = ma(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() { for (var a = this; a.firstElementChild;) a = a.firstElementChild; return a }).append(this)), this },
            wrapInner: function(a) {
                return ma.isFunction(a) ? this.each(function(b) { ma(this).wrapInner(a.call(this, b)) }) : this.each(function() {
                    var b = ma(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) { var b = ma.isFunction(a); return this.each(function(c) { ma(this).wrapAll(b ? a.call(this, c) : a) }) },
            unwrap: function(a) { return this.parent(a).not("body").each(function() { ma(this).replaceWith(this.childNodes) }), this }
        }), ma.expr.pseudos.hidden = function(a) { return !ma.expr.pseudos.visible(a) }, ma.expr.pseudos.visible = function(a) { return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length) }, ma.ajaxSettings.xhr = function() { try { return new a.XMLHttpRequest } catch (b) {} };
        var Pb = { 0: 200, 1223: 204 },
            Qb = ma.ajaxSettings.xhr();
        ka.cors = !!Qb && "withCredentials" in Qb, ka.ajax = Qb = !!Qb, ma.ajaxTransport(function(b) {
            var c, d;
            return ka.cors || Qb && !b.crossDomain ? {
                send: function(e, f) {
                    var g, h = b.xhr();
                    if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                        for (g in b.xhrFields) h[g] = b.xhrFields[g];
                    b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    for (g in e) h.setRequestHeader(g, e[g]);
                    c = function(a) { return function() { c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Pb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders())) } }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() { 4 === h.readyState && a.setTimeout(function() { c && d() }) }, c = c("abort");
                    try { h.send(b.hasContent && b.data || null) } catch (i) { if (c) throw i }
                },
                abort: function() { c && c() }
            } : void 0
        }), ma.ajaxPrefilter(function(a) { a.crossDomain && (a.contents.script = !1) }), ma.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function(a) { return ma.globalEval(a), a } } }), ma.ajaxPrefilter("script", function(a) { void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET") }), ma.ajaxTransport("script", function(a) { if (a.crossDomain) { var b, c; return { send: function(d, e) { b = ma("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", c = function(a) { b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type) }), _.head.appendChild(b[0]) }, abort: function() { c && c() } } } });
        var Rb = [],
            Sb = /(=)\?(?=&|$)|\?\?/;
        ma.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var a = Rb.pop() || ma.expando + "_" + yb++; return this[a] = !0, a } }), ma.ajaxPrefilter("json jsonp", function(b, c, d) { var e, f, g, h = b.jsonp !== !1 && (Sb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Sb.test(b.data) && "data"); return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = ma.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Sb, "$1" + e) : b.jsonp !== !1 && (b.url += (zb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() { return g || ma.error(e + " was not called"), g[0] }, b.dataTypes[0] = "json", f = a[e], a[e] = function() { g = arguments }, d.always(function() { void 0 === f ? ma(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Rb.push(e)), g && ma.isFunction(f) && f(g[0]), g = f = void 0 }), "script") : void 0 }), ka.createHTMLDocument = function() { var a = _.implementation.createHTMLDocument("").body; return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length }(), ma.parseHTML = function(a, b, c) { if ("string" != typeof a) return []; "boolean" == typeof b && (c = b, b = !1); var d, e, f; return b || (ka.createHTMLDocument ? (b = _.implementation.createHTMLDocument(""), d = b.createElement("base"), d.href = _.location.href, b.head.appendChild(d)) : b = _), e = va.exec(a), f = !c && [], e ? [b.createElement(e[1])] : (e = s([a], b, f), f && f.length && ma(f).remove(), ma.merge([], e.childNodes)) }, ma.fn.load = function(a, b, c) {
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h > -1 && (d = ma.trim(a.slice(h)), a = a.slice(0, h)), ma.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && ma.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function(a) { f = arguments, g.html(d ? ma("<div>").append(ma.parseHTML(a)).find(d) : a) }).always(c && function(a, b) { g.each(function() { c.apply(this, f || [a.responseText, b, a]) }) }), this
        }, ma.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) { ma.fn[b] = function(a) { return this.on(b, a) } }), ma.expr.pseudos.animated = function(a) { return ma.grep(ma.timers, function(b) { return a === b.elem }).length }, ma.offset = {
            setOffset: function(a, b, c) {
                var d, e, f, g, h, i, j, k = ma.css(a, "position"),
                    l = ma(a),
                    m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = ma.css(a, "top"), i = ma.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ma.isFunction(b) && (b = b.call(a, c, ma.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, ma.fn.extend({
            offset: function(a) { if (arguments.length) return void 0 === a ? this : this.each(function(b) { ma.offset.setOffset(this, a, b) }); var b, c, d, e, f = this[0]; return f ? f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, c = Z(e), b = e.documentElement, { top: d.top + c.pageYOffset - b.clientTop, left: d.left + c.pageXOffset - b.clientLeft }) : d) : { top: 0, left: 0 } : void 0 },
            position: function() {
                if (this[0]) {
                    var a, b, c = this[0],
                        d = { top: 0, left: 0 };
                    return "fixed" === ma.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ma.nodeName(a[0], "html") || (d = a.offset()), d = { top: d.top + ma.css(a[0], "borderTopWidth", !0), left: d.left + ma.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - ma.css(c, "marginTop", !0), left: b.left - d.left - ma.css(c, "marginLeft", !0) }
                }
            },
            offsetParent: function() { return this.map(function() { for (var a = this.offsetParent; a && "static" === ma.css(a, "position");) a = a.offsetParent; return a || Wa }) }
        }), ma.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(a, b) {
            var c = "pageYOffset" === b;
            ma.fn[a] = function(d) { return Fa(this, function(a, d, e) { var f = Z(a); return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e) }, a, d, arguments.length) }
        }), ma.each(["top", "left"], function(a, b) { ma.cssHooks[b] = F(ka.pixelPosition, function(a, c) { return c ? (c = E(a, b), eb.test(c) ? ma(a).position()[b] + "px" : c) : void 0 }) }), ma.each({ Height: "height", Width: "width" }, function(a, b) {
            ma.each({ padding: "inner" + a, content: b, "": "outer" + a }, function(c, d) {
                ma.fn[d] = function(e, f) {
                    var g = arguments.length && (c || "boolean" != typeof e),
                        h = c || (e === !0 || f === !0 ? "margin" : "border");
                    return Fa(this, function(b, c, e) { var f; return ma.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? ma.css(b, c, h) : ma.style(b, c, e, h) }, b, g ? e : void 0, g)
                }
            })
        }), ma.fn.extend({ bind: function(a, b, c) { return this.on(a, null, b, c) }, unbind: function(a, b) { return this.off(a, null, b) }, delegate: function(a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function(a, b, c) { return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c) } }), ma.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() { return ma });
        var Tb = a.jQuery,
            Ub = a.$;
        return ma.noConflict = function(b) { return a.$ === ma && (a.$ = Ub), b && a.jQuery === ma && (a.jQuery = Tb), ma }, b || (a.jQuery = a.$ = ma), ma
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) { "use strict"; var b = a.fn.jquery.split(" ")[0].split("."); if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4") }(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var c in b)
            if (void 0 !== a.style[c]) return { end: b[c] };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() { c = !0 });
        var e = function() { c || a(d).trigger(a.support.transition.end) };
        return setTimeout(e, b), this
    }, a(function() { a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function(b) { return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0 } }) })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) { a(b).on("click", c, this.close) };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() { g.detach().trigger("closed.bs.alert").remove() }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() { return a.fn.alert = e, this }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) { this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1 };
    c.VERSION = "3.3.7", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() { d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1)) }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) { var c = this.$element.find("input"); "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change") } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() { return a.fn.button = d, this }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) { a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type)) })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) { this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this)) };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
    }, c.prototype.getItemIndex = function(a) { return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active) }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() { b.to(a) }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) { return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, c.prototype.next = function() { return this.sliding ? void 0 : this.slide("next") }, c.prototype.prev = function() { return this.sliding ? void 0 : this.slide("prev") }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() { f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() { i.$element.trigger(m) }, 0) }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() { return a.fn.carousel = d, this };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) { var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""); return a(d) }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) { this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle() };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function() { var a = this.$element.hasClass("width"); return a ? "width" : "height" }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() { this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() { this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse") };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() { this[this.$element.hasClass("in") ? "hide" : "show"]() }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() { return a.fn.collapse = e, this }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = { relatedTarget: this };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) { a(b).on("click.bs.dropdown", this.toggle) };
    g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = { relatedTarget: this };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() { return a.fn.dropdown = h, this }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) { a.stopPropagation() }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) { this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() { this.$element.trigger("loaded.bs.modal") }, this)) };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function(a) { return this.isShown ? this.hide() : this.show(a) }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", { relatedTarget: b });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() { d.$element.one("mouseup.dismiss.bs.modal", function(b) { a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0) }) }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", { relatedTarget: b });
            e ? d.$dialog.one("bsTransitionEnd", function() { d.$element.trigger("focus").trigger(f) }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) { b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal()) }, c.prototype.enforceFocus = function() { a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) { document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus") }, this)) }, c.prototype.escape = function() { this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) { 27 == a.which && this.hide() }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal") }, c.prototype.resize = function() { this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal") }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() { a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal") })
    }, c.prototype.removeBackdrop = function() { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) { return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())) }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() { d.removeBackdrop(), b && b() };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() { this.adjustDialog() }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" })
    }, c.prototype.resetAdjustments = function() { this.$element.css({ paddingLeft: "", paddingRight: "" }) }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() { this.$body.css("padding-right", this.originalBodyPad) }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() { return a.fn.modal = d, this }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) { a.isDefaultPrevented() || f.one("hidden.bs.modal", function() { d.is(":visible") && d.trigger("focus") }) }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b) };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle()
    }, c.prototype.getDefaults = function() { return c.DEFAULTS }, c.prototype.getOptions = function(b) { return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) { c[a] != d && (b[a] = d) }), b
    }, c.prototype.enter = function(b) { var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type); return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() { "in" == c.hoverState && c.show() }, c.options.delay.show)) : c.show()) }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) { var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type); return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() { "out" == c.hoverState && c.hide() }, c.options.delay.hide)) : c.hide()) }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function(a) { d.css({ top: Math.round(a.top), left: Math.round(a.left) }) } }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) { this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "") }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() { "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b() }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() { return this.getTitle() }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? { top: 0, left: 0 } : f ? null : b.offset(),
            h = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
            i = d ? { width: a(window).width(), height: a(window).height() } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) { return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width } }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = { top: 0, left: 0 };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) { do a += ~~(1e6 * Math.random()); while (document.getElementById(a)); return a }, c.prototype.tip = function() { if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!"); return this.$tip }, c.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, c.prototype.enable = function() { this.enabled = !0 }, c.prototype.disable = function() { this.enabled = !1 }, c.prototype.toggleEnabled = function() { this.enabled = !this.enabled }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() { a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() { return a.fn.tooltip = d, this }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) { this.init("popover", a, b) };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() { return c.DEFAULTS }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() { return this.getTitle() || this.getContent() }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".arrow") };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() { return a.fn.popover = d, this }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) { this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process() }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.7", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function() { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) { return a[0] - b[0] }).each(function() { b.offsets.push(this[0]), b.targets.push(this[1]) })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() { a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active") };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() { return a.fn.scrollspy = d, this }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) { this.element = a(b) };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
                g = a.Event("show.bs.tab", { relatedTarget: e[0] });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() { e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] }) })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() { g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e() }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() { return a.fn.tab = d, this };
    var e = function(c) { c.preventDefault(), b.call(a(this), "show") };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) { this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition() };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(a - d >= e + g) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() { setTimeout(a.proxy(this.checkPosition, this), 1) }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({ top: g - b - f })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() { return a.fn.affix = d, this }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery),
function() {
    function a(b) { var c = a.modules[b]; if (!c) throw new Error('failed to require "' + b + '"'); return "exports" in c || "function" != typeof c.definition || (c.client = c.component = !0, c.definition.call(this, c.exports = {}, c), delete c.definition), c.exports } a.loader = "component", a.helper = {}, a.helper.semVerSort = function(a, b) {
        for (var c = a.version.split("."), d = b.version.split("."), e = 0; e < c.length; ++e) {
            var f = parseInt(c[e], 10),
                g = parseInt(d[e], 10);
            if (f !== g) return f > g ? 1 : -1;
            var h = c[e].substr(("" + f).length),
                i = d[e].substr(("" + g).length);
            if ("" === h && "" !== i) return 1;
            if ("" !== h && "" === i) return -1;
            if ("" !== h && "" !== i) return h > i ? 1 : -1
        }
        return 0
    }, a.latest = function(b, c) {
        function d(a) { throw new Error('failed to find latest module of "' + a + '"') }
        var e = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/,
            f = /(.*)~(.*)/;
        f.test(b) || d(b);
        for (var g = Object.keys(a.modules), h = [], i = [], j = 0; j < g.length; j++) {
            var k = g[j];
            if (new RegExp(b + "@").test(k)) {
                var l = k.substr(b.length + 1),
                    m = e.exec(k);
                null != m ? h.push({ version: l, name: k }) : i.push({ version: l, name: k })
            }
        }
        if (0 === h.concat(i).length && d(b), h.length > 0) { var n = h.sort(a.helper.semVerSort).pop().name; return c === !0 ? n : a(n) }
        var n = i.sort(function(a, b) { return a.name > b.name })[0].name;
        return c === !0 ? n : a(n)
    }, a.modules = {}, a.register = function(b, c) { a.modules[b] = { definition: c } }, a.define = function(b, c) { a.modules[b] = { exports: c } }, a.register("abpetkov~transitionize@0.0.3", function(a, b) {
        function c(a, b) { return this instanceof c ? (this.element = a, this.props = b || {}, void this.init()) : new c(a, b) } b.exports = c, c.prototype.isSafari = function() { return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) }, c.prototype.init = function() {
            var a = [];
            for (var b in this.props) a.push(b + " " + this.props[b]);
            this.element.style.transition = a.join(", "), this.isSafari() && (this.element.style.webkitTransition = a.join(", "))
        }
    }), a.register("ftlabs~fastclick@v0.6.11", function(a, b) {
        function c(a) {
            "use strict";
            var b, d = this;
            if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = a, !a || !a.nodeType) throw new TypeError("Layer must be a document node");
            this.onClick = function() { return c.prototype.onClick.apply(d, arguments) }, this.onMouse = function() { return c.prototype.onMouse.apply(d, arguments) }, this.onTouchStart = function() { return c.prototype.onTouchStart.apply(d, arguments) }, this.onTouchMove = function() { return c.prototype.onTouchMove.apply(d, arguments) }, this.onTouchEnd = function() { return c.prototype.onTouchEnd.apply(d, arguments) }, this.onTouchCancel = function() { return c.prototype.onTouchCancel.apply(d, arguments) }, c.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, c, d) { var e = Node.prototype.removeEventListener; "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d) }, a.addEventListener = function(b, c, d) { var e = Node.prototype.addEventListener; "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function(a) { a.propagationStopped || c(a) }), d) : e.call(a, b, c, d) }), "function" == typeof a.onclick && (b = a.onclick, a.addEventListener("click", function(a) { b(a) }, !1), a.onclick = null))
        }
        c.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, c.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), c.prototype.deviceIsIOS4 = c.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), c.prototype.deviceIsIOSWithBadTarget = c.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), c.prototype.needsClick = function(a) {
            "use strict";
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled) return !0;
                    break;
                case "input":
                    if (this.deviceIsIOS && "file" === a.type || a.disabled) return !0;
                    break;
                case "label":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(a.className)
        }, c.prototype.needsFocus = function(a) {
            "use strict";
            switch (a.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !this.deviceIsAndroid;
                case "input":
                    switch (a.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !a.disabled && !a.readOnly;
                default:
                    return /\bneedsfocus\b/.test(a.className)
            }
        }, c.prototype.sendClick = function(a, b) {
            "use strict";
            var c, d;
            document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c)
        }, c.prototype.determineEventType = function(a) { "use strict"; return this.deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click" }, c.prototype.focus = function(a) {
            "use strict";
            var b;
            this.deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
        }, c.prototype.updateScrollParent = function(a) {
            "use strict";
            var b, c;
            if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
                c = a;
                do { if (c.scrollHeight > c.offsetHeight) { b = c, a.fastClickScrollParent = c; break } c = c.parentElement } while (c)
            }
            b && (b.fastClickLastScrollTop = b.scrollTop)
        }, c.prototype.getTargetElementFromEventTarget = function(a) { "use strict"; return a.nodeType === Node.TEXT_NODE ? a.parentNode : a }, c.prototype.onTouchStart = function(a) {
            "use strict";
            var b, c, d;
            if (a.targetTouches.length > 1) return !0;
            if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], this.deviceIsIOS) {
                if (d = window.getSelection(), d.rangeCount && !d.isCollapsed) return !0;
                if (!this.deviceIsIOS4) {
                    if (c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
                    this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < 200 && a.preventDefault(), !0
        }, c.prototype.touchHasMoved = function(a) {
            "use strict";
            var b = a.changedTouches[0],
                c = this.touchBoundary;
            return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
        }, c.prototype.onTouchMove = function(a) { "use strict"; return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0 }, c.prototype.findControl = function(a) { "use strict"; return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, c.prototype.onTouchEnd = function(a) {
            "use strict";
            var b, c, d, e, f, g = this.targetElement;
            if (!this.trackingClick) return !0;
            if (a.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, !0;
            if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (f = a.changedTouches[0], g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), "label" === d) {
                if (b = this.findControl(g)) {
                    if (this.focus(g), this.deviceIsAndroid) return !1;
                    g = b
                }
            } else if (this.needsFocus(g)) return a.timeStamp - c > 100 || this.deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, !1) : (this.focus(g), this.deviceIsIOS4 && "select" === d || (this.targetElement = null, a.preventDefault()), !1);
            return this.deviceIsIOS && !this.deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1)
        }, c.prototype.onTouchCancel = function() {
            "use strict";
            this.trackingClick = !1, this.targetElement = null
        }, c.prototype.onMouse = function(a) { "use strict"; return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0 }, c.prototype.onClick = function(a) { "use strict"; var b; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b) }, c.prototype.destroy = function() {
            "use strict";
            var a = this.layer;
            this.deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, c.notNeeded = function(a) { "use strict"; var b, d; if ("undefined" == typeof window.ontouchstart) return !0; if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!c.prototype.deviceIsAndroid) return !0; if (b = document.querySelector("meta[name=viewport]")) { if (-1 !== b.content.indexOf("user-scalable=no")) return !0; if (d > 31 && window.innerWidth <= window.screen.width) return !0 } } return "none" === a.style.msTouchAction ? !0 : !1 }, c.attach = function(a) { "use strict"; return new c(a) }, "undefined" != typeof define && define.amd ? define(function() { "use strict"; return c }) : "undefined" != typeof b && b.exports ? (b.exports = c.attach, b.exports.FastClick = c) : window.FastClick = c
    }), a.register("component~indexof@0.0.3", function(a, b) {
        b.exports = function(a, b) {
            if (a.indexOf) return a.indexOf(b);
            for (var c = 0; c < a.length; ++c)
                if (a[c] === b) return c;
            return -1
        }
    }), a.register("component~classes@1.2.1", function(b, c) {
        function d(a) {
            if (!a) throw new Error("A DOM element reference is required");
            this.el = a, this.list = a.classList
        }
        var e = a("component~indexof@0.0.3"),
            f = /\s+/,
            g = Object.prototype.toString;
        c.exports = function(a) { return new d(a) }, d.prototype.add = function(a) {
            if (this.list) return this.list.add(a), this;
            var b = this.array(),
                c = e(b, a);
            return ~c || b.push(a), this.el.className = b.join(" "), this
        }, d.prototype.remove = function(a) {
            if ("[object RegExp]" == g.call(a)) return this.removeMatching(a);
            if (this.list) return this.list.remove(a), this;
            var b = this.array(),
                c = e(b, a);
            return ~c && b.splice(c, 1), this.el.className = b.join(" "), this
        }, d.prototype.removeMatching = function(a) { for (var b = this.array(), c = 0; c < b.length; c++) a.test(b[c]) && this.remove(b[c]); return this }, d.prototype.toggle = function(a, b) { return this.list ? ("undefined" != typeof b ? b !== this.list.toggle(a, b) && this.list.toggle(a) : this.list.toggle(a), this) : ("undefined" != typeof b ? b ? this.add(a) : this.remove(a) : this.has(a) ? this.remove(a) : this.add(a), this) }, d.prototype.array = function() {
            var a = this.el.className.replace(/^\s+|\s+$/g, ""),
                b = a.split(f);
            return "" === b[0] && b.shift(), b
        }, d.prototype.has = d.prototype.contains = function(a) { return this.list ? this.list.contains(a) : !!~e(this.array(), a) }
    }), a.register("component~event@0.1.4", function(a, b) {
        var c = window.addEventListener ? "addEventListener" : "attachEvent",
            d = window.removeEventListener ? "removeEventListener" : "detachEvent",
            e = "addEventListener" !== c ? "on" : "";
        a.bind = function(a, b, d, f) { return a[c](e + b, d, f || !1), d }, a.unbind = function(a, b, c, f) { return a[d](e + b, c, f || !1), c }
    }), a.register("component~query@0.0.3", function(a, b) {
        function c(a, b) { return b.querySelector(a) } a = b.exports = function(a, b) { return b = b || document, c(a, b) }, a.all = function(a, b) { return b = b || document, b.querySelectorAll(a) }, a.engine = function(b) { if (!b.one) throw new Error(".one callback required"); if (!b.all) throw new Error(".all callback required"); return c = b.one, a.all = b.all, a }
    }), a.register("component~matches-selector@0.1.5", function(b, c) {
        function d(a, b) {
            if (!a || 1 !== a.nodeType) return !1;
            if (g) return g.call(a, b);
            for (var c = e.all(b, a.parentNode), d = 0; d < c.length; ++d)
                if (c[d] == a) return !0;
            return !1
        }
        var e = a("component~query@0.0.3"),
            f = Element.prototype,
            g = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.msMatchesSelector || f.oMatchesSelector;
        c.exports = d
    }), a.register("component~closest@0.1.4", function(b, c) {
        var d = a("component~matches-selector@0.1.5");
        c.exports = function(a, b, c, e) {
            for (a = c ? { parentNode: a } : a, e = e || document;
                (a = a.parentNode) && a !== document;) { if (d(a, b)) return a; if (a === e) return }
        }
    }), a.register("component~delegate@0.2.3", function(b, c) {
        var d = a("component~closest@0.1.4"),
            e = a("component~event@0.1.4");
        b.bind = function(a, b, c, f, g) {
            return e.bind(a, c, function(c) {
                var e = c.target || c.srcElement;
                c.delegateTarget = d(e, b, !0, a), c.delegateTarget && f.call(a, c)
            }, g)
        }, b.unbind = function(a, b, c, d) { e.unbind(a, b, c, d) }
    }), a.register("component~events@1.0.9", function(b, c) {
        function d(a, b) {
            if (!(this instanceof d)) return new d(a, b);
            if (!a) throw new Error("element required");
            if (!b) throw new Error("object required");
            this.el = a, this.obj = b, this._events = {}
        }

        function e(a) { var b = a.split(/ +/); return { name: b.shift(), selector: b.join(" ") } }
        var f = a("component~event@0.1.4"),
            g = a("component~delegate@0.2.3");
        c.exports = d, d.prototype.sub = function(a, b, c) { this._events[a] = this._events[a] || {}, this._events[a][b] = c }, d.prototype.bind = function(a, b) {
            function c() {
                var a = [].slice.call(arguments).concat(k);
                i[b].apply(i, a)
            }
            var d = e(a),
                h = this.el,
                i = this.obj,
                j = d.name,
                b = b || "on" + j,
                k = [].slice.call(arguments, 2);
            return d.selector ? c = g.bind(h, d.selector, j, c) : f.bind(h, j, c), this.sub(j, b, c), c
        }, d.prototype.unbind = function(a, b) {
            if (0 == arguments.length) return this.unbindAll();
            if (1 == arguments.length) return this.unbindAllOf(a);
            var c = this._events[a];
            if (c) {
                var d = c[b];
                d && f.unbind(this.el, a, d)
            }
        }, d.prototype.unbindAll = function() { for (var a in this._events) this.unbindAllOf(a) }, d.prototype.unbindAllOf = function(a) {
            var b = this._events[a];
            if (b)
                for (var c in b) this.unbind(a, c)
        }
    }), a.register("switchery", function(b, c) {
        function d(a, b) {
            if (!(this instanceof d)) return new d(a, b);
            this.element = a, this.options = b || {};
            for (var c in i) null == this.options[c] && (this.options[c] = i[c]);
            null != this.element && "checkbox" == this.element.type && this.init(), this.isDisabled() === !0 && this.disable()
        }
        var e = a("abpetkov~transitionize@0.0.3"),
            f = a("ftlabs~fastclick@v0.6.11"),
            g = a("component~classes@1.2.1"),
            h = a("component~events@1.0.9");
        c.exports = d;
        var i = { color: "#64bd63", secondaryColor: "#dfdfdf", jackColor: "#fff", jackSecondaryColor: null, className: "switchery", disabled: !1, disabledOpacity: .5, speed: "0.4s", size: "default" };
        d.prototype.hide = function() { this.element.style.display = "none" }, d.prototype.show = function() {
            var a = this.create();
            this.insertAfter(this.element, a)
        }, d.prototype.create = function() { return this.switcher = document.createElement("span"), this.jack = document.createElement("small"), this.switcher.appendChild(this.jack), this.switcher.className = this.options.className, this.events = h(this.switcher, this), this.switcher }, d.prototype.insertAfter = function(a, b) { a.parentNode.insertBefore(b, a.nextSibling) }, d.prototype.setPosition = function(a) {
            var b = this.isChecked(),
                c = this.switcher,
                d = this.jack;
            a && b ? b = !1 : a && !b && (b = !0), b === !0 ? (this.element.checked = !0, window.getComputedStyle ? d.style.left = parseInt(window.getComputedStyle(c).width) - parseInt(window.getComputedStyle(d).width) + "px" : d.style.left = parseInt(c.currentStyle.width) - parseInt(d.currentStyle.width) + "px", this.options.color && this.colorize(), this.setSpeed()) : (d.style.left = 0, this.element.checked = !1, this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor, this.switcher.style.borderColor = this.options.secondaryColor, this.switcher.style.backgroundColor = this.options.secondaryColor !== i.secondaryColor ? this.options.secondaryColor : "#fff", this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor, this.setSpeed())
        }, d.prototype.setSpeed = function() {
            var a = {},
                b = { "background-color": this.options.speed, left: this.options.speed.replace(/[a-z]/, "") / 2 + "s" };
            a = this.isChecked() ? { border: this.options.speed, "box-shadow": this.options.speed, "background-color": 3 * this.options.speed.replace(/[a-z]/, "") + "s" } : { border: this.options.speed, "box-shadow": this.options.speed }, e(this.switcher, a), e(this.jack, b)
        }, d.prototype.setSize = function() {
            var a = "switchery-small",
                b = "switchery-default",
                c = "switchery-large";
            switch (this.options.size) {
                case "small":
                    g(this.switcher).add(a);
                    break;
                case "large":
                    g(this.switcher).add(c);
                    break;
                default:
                    g(this.switcher).add(b)
            }
        }, d.prototype.colorize = function() {
            var a = this.switcher.offsetHeight / 2;
            this.switcher.style.backgroundColor = this.options.color, this.switcher.style.borderColor = this.options.color, this.switcher.style.boxShadow = "inset 0 0 0 " + a + "px " + this.options.color, this.jack.style.backgroundColor = this.options.jackColor
        }, d.prototype.handleOnchange = function(a) {
            if (document.dispatchEvent) {
                var b = document.createEvent("HTMLEvents");
                b.initEvent("change", !0, !0), this.element.dispatchEvent(b)
            } else this.element.fireEvent("onchange")
        }, d.prototype.handleChange = function() {
            var a = this,
                b = this.element;
            b.addEventListener ? b.addEventListener("change", function() { a.setPosition() }) : b.attachEvent("onchange", function() { a.setPosition() })
        }, d.prototype.handleClick = function() {
            var a = this.switcher;
            f(a), this.events.bind("click", "bindClick")
        }, d.prototype.bindClick = function() {
            var a = this.element.parentNode.tagName.toLowerCase(),
                b = "label" === a ? !1 : !0;
            this.setPosition(b), this.handleOnchange(this.element.checked)
        }, d.prototype.markAsSwitched = function() { this.element.setAttribute("data-switchery", !0) }, d.prototype.markedAsSwitched = function() { return this.element.getAttribute("data-switchery") }, d.prototype.init = function() { this.hide(), this.show(), this.setSize(), this.setPosition(), this.markAsSwitched(), this.handleChange(), this.handleClick() }, d.prototype.isChecked = function() { return this.element.checked }, d.prototype.isDisabled = function() { return this.options.disabled || this.element.disabled || this.element.readOnly }, d.prototype.destroy = function() { this.events.unbind() }, d.prototype.enable = function() { this.options.disabled && (this.options.disabled = !1), this.element.disabled && (this.element.disabled = !1), this.element.readOnly && (this.element.readOnly = !1), this.switcher.style.opacity = 1, this.events.bind("click", "bindClick") }, d.prototype.disable = function() { this.options.disabled || (this.options.disabled = !0), this.element.disabled || (this.element.disabled = !0), this.element.readOnly || (this.element.readOnly = !0), this.switcher.style.opacity = this.options.disabledOpacity, this.destroy() }
    }), "object" == typeof exports ? module.exports = a("switchery") : "function" == typeof define && define.amd ? define("Switchery", [], function() { return a("switchery") }) : (this || window).Switchery = a("switchery")
}(), ! function(a, b) { "function" == typeof define && define.amd ? define(["jquery"], function(c) { return b(a, c) }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = b(a, require("jquery")) : a.lity = b(a, a.jQuery || a.Zepto) }("undefined" != typeof window ? window : this, function(a, b) {
    "use strict";

    function c() { p[q > 0 ? "addClass" : "removeClass"]("lity-active") }

    function d(a) { var c = b.Deferred(); return x ? (a.one(x, c.resolve), setTimeout(c.resolve, 500)) : c.resolve(), c.promise() }

    function e(a, c, d) {
        if (1 === arguments.length) return b.extend({}, a);
        if ("string" == typeof c) {
            if ("undefined" == typeof d) return "undefined" == typeof a[c] ? null : a[c];
            a[c] = d
        } else b.extend(a, c);
        return this
    }

    function f() { return "file:" === a.location.protocol ? "http:" : "" }

    function g(a) { for (var b, c = decodeURI(a).split("&"), d = {}, e = 0, f = c.length; f > e; e++) c[e] && (b = c[e].split("="), d[b[0]] = b[1]); return d }

    function h(a, c) { return a + (a.indexOf("?") > -1 ? "&" : "?") + b.param(c) }

    function i(a) { return b('<span class="lity-error"/>').append(a) }

    function j(a) {
        if (!r.test(a)) return !1;
        var c = b('<img src="' + a + '">'),
            d = b.Deferred(),
            e = function() { d.reject(i("Failed loading image")) };
        return c.on("load", function() { return 0 === this.naturalWidth ? e() : void d.resolve(c) }).on("error", e), d.promise()
    }

    function k(a) { var c; try { c = b(a) } catch (d) { return !1 } if (!c.length) return !1; var e = b('<span style="display:none !important" class="lity-inline-placeholder"/>'); return c.after(e).on("lity:ready", function(a, b) { b.one("lity:remove", function() { e.before(c.addClass("lity-hide")).remove() }) }) }

    function l(a) { var c, d = a; return c = s.exec(a), c && (d = h(f() + "//www.youtube" + (c[2] || "") + ".com/embed/" + c[4], b.extend({ autoplay: 1 }, g(c[5] || "")))), c = t.exec(a), c && (d = h(f() + "//player.vimeo.com/video/" + c[3], b.extend({ autoplay: 1 }, g(c[4] || "")))), c = u.exec(a), c && (d = h(f() + "//www.google." + c[3] + "/maps?" + c[6], { output: c[6].indexOf("layer=c") > 0 ? "svembed" : "embed" })), '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + d + '"></iframe></div>' }

    function m(a) {
        function f(a) { 27 === a.keyCode && k() }

        function g() {
            var a = n.documentElement.clientHeight ? n.documentElement.clientHeight : Math.round(o.height());
            p.css("max-height", Math.floor(a) + "px").trigger("lity:resize", [m, l])
        }

        function h(a) {
            m && (p = b(a), o.on("resize", g), g(), m.find(".lity-loader").each(function() {
                var a = b(this);
                d(a).always(function() { a.remove() })
            }), m.removeClass("lity-loading").find(".lity-content").empty().append(p), p.removeClass("lity-hide").trigger("lity:ready", [m, l]), t.resolve())
        }

        function i(a, d, e) { q++, c(), m = b(e.template).addClass("lity-loading").appendTo("body"), e.esc && o.one("keyup", f), setTimeout(function() { m.addClass("lity-opened lity-" + a).on("click", "[data-lity-close]", function(a) { b(a.target).is("[data-lity-close]") && k() }).trigger("lity:open", [m, l]), b.when(d).always(h) }, 0) }

        function j(a, c) {
            var d, e, f = b.extend({}, v, s);
            if (c.handler && f[c.handler]) e = f[c.handler](a, l), d = c.handler;
            else {
                var g = {};
                b.each(["inline", "iframe"], function(a, b) { f[b] && (g[b] = f[b]), delete f[b] });
                var h = function(b, c) { return c ? (e = c(a, l), e ? (d = b, !1) : void 0) : !0 };
                b.each(f, h), d || b.each(g, h)
            }
            return e && (t = b.Deferred(), b.when(k()).done(b.proxy(i, null, d, e, c))), !!e
        }

        function k() {
            if (m) {
                var a = b.Deferred();
                return t.done(function() {
                    q--, c(), o.off("resize", g).off("keyup", f), p.trigger("lity:close", [m, l]), m.removeClass("lity-opened").addClass("lity-closed");
                    var b = m,
                        e = p;
                    m = null, p = null, d(e.add(b)).always(function() { e.trigger("lity:remove", [b, l]), b.remove(), a.resolve() })
                }), a.promise()
            }
        }

        function l(a) {
            if (!a.preventDefault) return l.open(a);
            var c = b(this),
                d = c.data("lity-target") || c.attr("href") || c.attr("src");
            if (d) {
                var e = b.extend({}, w, r, c.data("lity-options") || c.data("lity"));
                j(d, e) && a.preventDefault()
            }
        }
        var m, p, r = {},
            s = {},
            t = b.Deferred().resolve();
        return l.handlers = b.proxy(e, l, s), l.options = b.proxy(e, l, r), l.open = function(a) { return j(a, b.extend({}, w, r)), l }, l.close = function() { return k(), l }, l.options(a)
    }
    var n = a.document,
        o = b(a),
        p = b("html"),
        q = 0,
        r = /\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$/i,
        s = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        t = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        u = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        v = { image: j, inline: k, iframe: l },
        w = { esc: !0, handler: null, template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>' },
        x = function() {
            var a = n.createElement("div"),
                b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
            for (var c in b)
                if (void 0 !== a.style[c]) return b[c];
            return !1
        }();
    return m.version = "1.5.1", m.handlers = b.proxy(e, m, v), m.options = b.proxy(e, m, w), b(n).on("click", "[data-lity]", m()), m
}), ! function(a, b) { "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.Dropify = b(a.jQuery) }(this, function(a) {
    function b(b, c) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var d = { defaultFile: "", maxFileSize: 0, minWidth: 0, maxWidth: 0, minHeight: 0, maxHeight: 0, showRemove: !0, showLoader: !0, showErrors: !0, errorsPosition: "overlay", allowedFormats: ["portrait", "square", "landscape"], messages: { "default": "Drag and drop a file here or click", replace: "Drag and drop or click to replace", remove: "Remove", error: "Ooops, something wrong appended." }, error: { fileSize: "The file size is too big ({{ value }} max).", minWidth: "The image width is too small ({{ value }}}px min).", maxWidth: "The image width is too big ({{ value }}}px max).", minHeight: "The image height is too small ({{ value }}}px min).", maxHeight: "The image height is too big ({{ value }}px max).", imageFormat: "The image format is not allowed ({{ value }} only)." }, tpl: { wrap: '<div class="dropify-wrapper"></div>', loader: '<div class="dropify-loader"></div>', message: '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>', preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>', filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>', clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>', errorLine: '<p class="dropify-error">{{ error }}</p>', errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>' } };
            this.element = b, this.input = a(this.element), this.wrapper = null, this.preview = null, this.filenameWrapper = null, this.settings = a.extend(!0, d, c, this.input.data()), this.imgFileExtensions = ["png", "jpg", "jpeg", "gif", "bmp"], this.errorsEvent = a.Event("dropify.errors"), this.isDisabled = !1, this.isInit = !1, this.file = { object: null, name: null, size: null, width: null, height: null, type: null }, Array.isArray(this.settings.allowedFormats) || (this.settings.allowedFormats = this.settings.allowedFormats.split(" ")), this.onChange = this.onChange.bind(this), this.clearElement = this.clearElement.bind(this), this.onFileReady = this.onFileReady.bind(this), this.translateMessages(), this.createElements(), this.setContainerSize(), this.errorsEvent.errors = [], this.input.on("change", this.onChange)
        }
    }
    var c = "dropify";
    return b.prototype.onChange = function() { this.resetPreview(), this.readFile(this.element) }, b.prototype.createElements = function() {
        this.isInit = !0, this.input.wrap(a(this.settings.tpl.wrap)), this.wrapper = this.input.parent();
        var b = a(this.settings.tpl.message).insertBefore(this.input);
        a(this.settings.tpl.errorLine).appendTo(b), this.isTouchDevice() === !0 && this.wrapper.addClass("touch-fallback"), this.input.attr("disabled") && (this.isDisabled = !0, this.wrapper.addClass("disabled")), this.settings.showLoader === !0 && (this.loader = a(this.settings.tpl.loader), this.loader.insertBefore(this.input)), this.preview = a(this.settings.tpl.preview), this.preview.insertAfter(this.input), this.isDisabled === !1 && this.settings.showRemove === !0 && (this.clearButton = a(this.settings.tpl.clearButton), this.clearButton.insertAfter(this.input), this.clearButton.on("click", this.clearElement)), this.filenameWrapper = a(this.settings.tpl.filename), this.filenameWrapper.prependTo(this.preview.find(".dropify-infos-inner")), this.settings.showErrors === !0 && (this.errorsContainer = a(this.settings.tpl.errorsContainer), "outside" === this.settings.errorsPosition ? this.errorsContainer.insertAfter(this.wrapper) : this.errorsContainer.insertBefore(this.input));
        var c = this.settings.defaultFile || "";
        "" != c.trim() && (this.file.name = this.cleanFilename(c), this.setPreview(c))
    }, b.prototype.readFile = function(b) {
        if (b.files && b.files[0]) {
            var c = new FileReader,
                d = new Image,
                e = b.files[0],
                f = null,
                g = this,
                h = a.Event("dropify.fileReady");
            this.clearErrors(), this.showLoader(), this.setFileInformations(e), c.readAsDataURL(e), this.errorsEvent.errors = [], this.checkFileSize(), c.onload = function(a) { f = a.target.result, this.isImage() ? (d.src = a.target.result, d.onload = function() { g.setFileDimensions(this.width, this.height), g.validateImage(), g.input.trigger(h, [f]) }) : this.input.trigger(h, [f]) }.bind(this), this.input.on("dropify.fileReady", this.onFileReady)
        }
    }, b.prototype.onFileReady = function(a, b) {
        if (this.input.off("dropify.fileReady", this.onFileReady), 0 === this.errorsEvent.errors.length) this.setPreview(b, this.file.name);
        else {
            this.input.trigger(this.errorsEvent, [this]);
            for (var c = this.errorsEvent.errors.length - 1; c >= 0; c--) {
                var d = this.errorsEvent.errors[c].namespace,
                    e = d.split(".").pop();
                this.showError(e)
            }
            if ("undefined" != typeof this.errorsContainer) {
                this.errorsContainer.addClass("visible");
                var f = this.errorsContainer;
                setTimeout(function() { f.removeClass("visible") }, 1e3)
            }
            this.wrapper.addClass("has-error"), this.resetPreview(), this.clearElement()
        }
    }, b.prototype.setFileInformations = function(a) { this.file.object = a, this.file.name = a.name, this.file.size = a.size, this.file.type = a.type, this.file.width = null, this.file.height = null }, b.prototype.setFileDimensions = function(a, b) { this.file.width = a, this.file.height = b }, b.prototype.setPreview = function(b) {
        this.wrapper.removeClass("has-error").addClass("has-preview"), this.filenameWrapper.children(".dropify-filename-inner").html(this.file.name);
        var c = this.preview.children(".dropify-render");
        if (this.hideLoader(), this.isImage() === !0) {
            var d = a("<img />").attr("src", b);
            this.settings.height && d.css("max-height", this.settings.height), d.appendTo(c)
        } else a("<i />").attr("class", "dropify-font-file").appendTo(c), a('<span class="dropify-extension" />').html(this.getFileType()).appendTo(c);
        this.preview.fadeIn()
    }, b.prototype.resetPreview = function() {
        this.wrapper.removeClass("has-preview");
        var a = this.preview.children(".dropify-render");
        a.find(".dropify-extension").remove(), a.find("i").remove(), a.find("img").remove(), this.preview.hide(), this.hideLoader()
    }, b.prototype.cleanFilename = function(a) { var b = a.split("\\").pop(); return b == a && (b = a.split("/").pop()), "" != a ? b : "" }, b.prototype.clearElement = function() {
        if (0 === this.errorsEvent.errors.length) {
            var b = a.Event("dropify.beforeClear");
            this.input.trigger(b, [this]), b.result !== !1 && (this.resetFile(), this.input.val(""), this.resetPreview(), this.input.trigger(a.Event("dropify.afterClear"), [this]))
        } else this.resetFile(), this.input.val(""), this.resetPreview()
    }, b.prototype.resetFile = function() { this.file.object = null, this.file.name = null, this.file.size = null, this.file.type = null, this.file.width = null, this.file.height = null }, b.prototype.setContainerSize = function() { this.settings.height && this.wrapper.height(this.settings.height) }, b.prototype.isTouchDevice = function() { return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 }, b.prototype.getFileType = function() { return this.file.name.split(".").pop().toLowerCase() }, b.prototype.isImage = function() { return "-1" != this.imgFileExtensions.indexOf(this.getFileType()) ? !0 : !1 }, b.prototype.translateMessages = function() {
        for (var a in this.settings.tpl)
            for (var b in this.settings.messages) this.settings.tpl[a] = this.settings.tpl[a].replace("{{ " + b + " }}", this.settings.messages[b])
    }, b.prototype.checkFileSize = function() { 0 !== this.maxFileSizeToByte() && this.file.size > this.maxFileSizeToByte() && this.pushError("fileSize") }, b.prototype.maxFileSizeToByte = function() {
        var a = 0;
        if (0 !== this.settings.maxFileSize) {
            var b = this.settings.maxFileSize.slice(-1).toUpperCase(),
                c = 1024,
                d = 1024 * c,
                e = 1024 * d;
            "K" === b ? a = parseFloat(this.settings.maxFileSize) * c : "M" === b ? a = parseFloat(this.settings.maxFileSize) * d : "G" === b && (a = parseFloat(this.settings.maxFileSize) * e)
        }
        return a
    }, b.prototype.validateImage = function() { 0 !== this.settings.minWidth && this.settings.minWidth >= this.file.width && this.pushError("minWidth"), 0 !== this.settings.maxWidth && this.settings.maxWidth <= this.file.width && this.pushError("maxWidth"), 0 !== this.settings.minHeight && this.settings.minHeight >= this.file.height && this.pushError("minHeight"), 0 !== this.settings.maxHeight && this.settings.maxHeight <= this.file.height && this.pushError("maxHeight"), "-1" == this.settings.allowedFormats.indexOf(this.getImageFormat()) && this.pushError("imageFormat") }, b.prototype.getImageFormat = function() { return this.file.width == this.file.height ? "square" : this.file.width < this.file.height ? "portrait" : this.file.width > this.file.height ? "landscape" : void 0 }, b.prototype.pushError = function(b) {
        var c = a.Event("dropify.error." + b);
        this.errorsEvent.errors.push(c), this.input.trigger(c, [this])
    }, b.prototype.clearErrors = function() { "undefined" != typeof this.errorsContainer && this.errorsContainer.children("ul").html("") }, b.prototype.showError = function(a) { "undefined" != typeof this.errorsContainer && this.errorsContainer.children("ul").append("<li>" + this.getError(a) + "</li>") }, b.prototype.getError = function(a) {
        var b = this.settings.error[a],
            c = "";
        return "fileSize" === a ? c = this.settings.maxFileSize : "minWidth" === a ? c = this.settings.minWidth : "maxWidth" === a ? c = this.settings.maxWidth : "minHeight" === a ? c = this.settings.minHeight : "maxHeight" === a ? c = this.settings.maxHeight : "imageFormat" === a && (c = this.settings.allowedFormats.join(" ")),
            "" !== c ? b.replace("{{ value }}", c) : b
    }, b.prototype.showLoader = function() { "undefined" != typeof this.loader && this.loader.show() }, b.prototype.hideLoader = function() { "undefined" != typeof this.loader && this.loader.hide() }, b.prototype.destroy = function() { this.input.siblings().remove(), this.input.unwrap(), this.isInit = !1 }, b.prototype.init = function() { this.createElements() }, b.prototype.isDropified = function() { return this.isInit }, a.fn[c] = function(d) { return this.each(function() { a.data(this, c) || a.data(this, c, new b(this, d)) }), this }, b
}), ! function(a, b) { "function" == typeof define && define.amd ? define(["jquery"], function(a) { return b(a) }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery) }(this, function(a) {
    ! function(a) {
        "use strict";

        function b(b) { var c = [{ re: /[\xC0-\xC6]/g, ch: "A" }, { re: /[\xE0-\xE6]/g, ch: "a" }, { re: /[\xC8-\xCB]/g, ch: "E" }, { re: /[\xE8-\xEB]/g, ch: "e" }, { re: /[\xCC-\xCF]/g, ch: "I" }, { re: /[\xEC-\xEF]/g, ch: "i" }, { re: /[\xD2-\xD6]/g, ch: "O" }, { re: /[\xF2-\xF6]/g, ch: "o" }, { re: /[\xD9-\xDC]/g, ch: "U" }, { re: /[\xF9-\xFC]/g, ch: "u" }, { re: /[\xC7-\xE7]/g, ch: "c" }, { re: /[\xD1]/g, ch: "N" }, { re: /[\xF1]/g, ch: "n" }]; return a.each(c, function() { b = b.replace(this.re, this.ch) }), b }

        function c(a) {
            var b = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
                c = "(?:" + Object.keys(b).join("|") + ")",
                d = new RegExp(c),
                e = new RegExp(c, "g"),
                f = null == a ? "" : "" + a;
            return d.test(f) ? f.replace(e, function(a) { return b[a] }) : f
        }

        function d(b, c) {
            var d = arguments,
                f = b,
                g = c;
            [].shift.apply(d);
            var h, i = this.each(function() {
                var b = a(this);
                if (b.is("select")) {
                    var c = b.data("selectpicker"),
                        i = "object" == typeof f && f;
                    if (c) {
                        if (i)
                            for (var j in i) i.hasOwnProperty(j) && (c.options[j] = i[j])
                    } else {
                        var k = a.extend({}, e.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), i);
                        k.template = a.extend({}, e.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, i.template), b.data("selectpicker", c = new e(this, k, g))
                    }
                    "string" == typeof f && (h = c[f] instanceof Function ? c[f].apply(c, d) : c.options[f])
                }
            });
            return "undefined" != typeof h ? h : i
        }
        String.prototype.includes || ! function() {
            var a = {}.toString,
                b = function() {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b
                    } catch (d) {}
                    return c
                }(),
                c = "".indexOf,
                d = function(b) {
                    if (null == this) throw new TypeError;
                    var d = String(this);
                    if (b && "[object RegExp]" == a.call(b)) throw new TypeError;
                    var e = d.length,
                        f = String(b),
                        g = f.length,
                        h = arguments.length > 1 ? arguments[1] : void 0,
                        i = h ? Number(h) : 0;
                    i != i && (i = 0);
                    var j = Math.min(Math.max(i, 0), e);
                    return g + j > e ? !1 : -1 != c.call(d, f, i)
                };
            b ? b(String.prototype, "includes", { value: d, configurable: !0, writable: !0 }) : String.prototype.includes = d
        }(), String.prototype.startsWith || ! function() {
            var a = function() {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b
                    } catch (d) {}
                    return c
                }(),
                b = {}.toString,
                c = function(a) {
                    if (null == this) throw new TypeError;
                    var c = String(this);
                    if (a && "[object RegExp]" == b.call(a)) throw new TypeError;
                    var d = c.length,
                        e = String(a),
                        f = e.length,
                        g = arguments.length > 1 ? arguments[1] : void 0,
                        h = g ? Number(g) : 0;
                    h != h && (h = 0);
                    var i = Math.min(Math.max(h, 0), d);
                    if (f + i > d) return !1;
                    for (var j = -1; ++j < f;)
                        if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
                    return !0
                };
            a ? a(String.prototype, "startsWith", { value: c, configurable: !0, writable: !0 }) : String.prototype.startsWith = c
        }(), Object.keys || (Object.keys = function(a, b, c) { c = []; for (b in a) c.hasOwnProperty.call(a, b) && c.push(b); return c }), a.fn.triggerNative = function(a) {
            var b, c = this[0];
            c.dispatchEvent ? ("function" == typeof Event ? b = new Event(a, { bubbles: !0 }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : (c.fireEvent && (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)), this.trigger(a))
        }, a.expr[":"].icontains = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].ibegins = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        }, a.expr[":"].aicontains = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].aibegins = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        };
        var e = function(b, c, d) { d && (d.stopPropagation(), d.preventDefault()), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = e.prototype.val, this.render = e.prototype.render, this.refresh = e.prototype.refresh, this.setStyle = e.prototype.setStyle, this.selectAll = e.prototype.selectAll, this.deselectAll = e.prototype.deselectAll, this.destroy = e.prototype.destroy, this.remove = e.prototype.remove, this.show = e.prototype.show, this.hide = e.prototype.hide, this.init() };
        e.VERSION = "1.10.0", e.DEFAULTS = { noneSelectedText: "Nothing selected", noneResultsText: "No results matched {0}", countSelectedText: function(a, b) { return 1 == a ? "{0} item selected" : "{0} items selected" }, maxOptionsText: function(a, b) { return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"] }, selectAllText: "Select All", deselectAllText: "Deselect All", doneButton: !1, doneButtonText: "Close", multipleSeparator: ", ", styleBase: "btn", style: "btn-default", size: "auto", title: null, selectedTextFormat: "values", width: !1, container: !1, hideDisabled: !1, showSubtext: !1, showIcon: !0, showContent: !0, dropupAuto: !0, header: !1, liveSearch: !1, liveSearchPlaceholder: null, liveSearchNormalize: !1, liveSearchStyle: "contains", actionsBox: !1, iconBase: "fa", tickIcon: "fa-check", showTick: !1, template: { caret: '<span class="caret"></span>' }, maxOptions: !1, mobile: !1, selectOnTab: !1, dropdownAlignRight: !1 }, e.prototype = {
            constructor: e,
            init: function() {
                var b = this,
                    c = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function(a) { a.preventDefault(), b.$button.focus() })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({ "hide.bs.dropdown": function(a) { b.$element.trigger("hide.bs.select", a) }, "hidden.bs.dropdown": function(a) { b.$element.trigger("hidden.bs.select", a) }, "show.bs.dropdown": function(a) { b.$element.trigger("show.bs.select", a) }, "shown.bs.dropdown": function(a) { b.$element.trigger("shown.bs.select", a) } }), b.$element[0].hasAttribute("required") && this.$element.on("invalid", function() { b.$button.addClass("bs-invalid").focus(), b.$element.on({ "focus.bs.select": function() { b.$button.focus(), b.$element.off("focus.bs.select") }, "shown.bs.select": function() { b.$element.val(b.$element.val()).off("shown.bs.select") }, "rendered.bs.select": function() { this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select") } }) }), setTimeout(function() { b.$element.trigger("loaded.bs.select") })
            },
            createDropdown: function() {
                var b = this.multiple || this.options.showTick ? " show-tick" : "",
                    d = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    e = this.autofocus ? " autofocus" : "",
                    f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    g = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + c(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                    h = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    i = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    j = '<div class="btn-group bootstrap-select' + b + d + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + e + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + f + g + h + '<ul class="dropdown-menu inner" role="menu"></ul>' + i + "</div></div>";
                return a(j)
            },
            createView: function() {
                var a = this.createDropdown(),
                    b = this.createLi();
                return a.find("ul")[0].innerHTML = b, a
            },
            reloadLi: function() {
                this.destroyLi();
                var a = this.createLi();
                this.$menuInner[0].innerHTML = a
            },
            destroyLi: function() { this.$menu.find("li").remove() },
            createLi: function() {
                var d = this,
                    e = [],
                    f = 0,
                    g = document.createElement("option"),
                    h = -1,
                    i = function(a, b, c, d) { return "<li" + ("undefined" != typeof c & "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b & null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d & null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>" },
                    j = function(a, e, f, g) { return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + ("undefined" != typeof f ? ' style="' + f + '"' : "") + (d.options.liveSearchNormalize ? ' data-normalized-text="' + b(c(a)) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ">" + a + '<span class="' + d.options.iconBase + " " + d.options.tickIcon + ' check-mark"></span></a>' };
                if (this.options.title && !this.multiple && (h--, !this.$element.find(".bs-title-option").length)) {
                    var k = this.$element[0];
                    g.className = "bs-title-option", g.appendChild(document.createTextNode(this.options.title)), g.value = "", k.insertBefore(g, k.firstChild), void 0 === a(k.options[k.selectedIndex]).attr("selected") && (g.selected = !0)
                }
                return this.$element.find("option").each(function(b) {
                    var c = a(this);
                    if (h++, !c.hasClass("bs-title-option")) {
                        var g = this.className || "",
                            k = this.style.cssText,
                            l = c.data("content") ? c.data("content") : c.html(),
                            m = c.data("tokens") ? c.data("tokens") : null,
                            n = "undefined" != typeof c.data("subtext") ? '<small class="text-muted">' + c.data("subtext") + "</small>" : "",
                            o = "undefined" != typeof c.data("icon") ? '<span class="' + d.options.iconBase + " " + c.data("icon") + '"></span> ' : "",
                            p = "OPTGROUP" === this.parentNode.tagName,
                            q = this.disabled || p && this.parentNode.disabled;
                        if ("" !== o && q && (o = "<span>" + o + "</span>"), d.options.hideDisabled && q && !p) return void h--;
                        if (c.data("content") || (l = o + '<span class="text">' + l + n + "</span>"), p && c.data("divider") !== !0) {
                            var r = " " + this.parentNode.className || "";
                            if (0 === c.index()) {
                                f += 1;
                                var s = this.parentNode.label,
                                    t = "undefined" != typeof c.parent().data("subtext") ? '<small class="text-muted">' + c.parent().data("subtext") + "</small>" : "",
                                    u = c.parent().data("icon") ? '<span class="' + d.options.iconBase + " " + c.parent().data("icon") + '"></span> ' : "";
                                s = u + '<span class="text">' + s + t + "</span>", 0 !== b && e.length > 0 && (h++, e.push(i("", null, "divider", f + "div"))), h++, e.push(i(s, null, "dropdown-header" + r, f))
                            }
                            if (d.options.hideDisabled && q) return void h--;
                            e.push(i(j(l, "opt " + g + r, k, m), b, "", f))
                        } else c.data("divider") === !0 ? e.push(i("", b, "divider")) : c.data("hidden") === !0 ? e.push(i(j(l, g, k, m), b, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (h++, e.push(i("", null, "divider", f + "div"))), e.push(i(j(l, g, k, m), b)));
                        d.liObj[b] = h
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), e.join("")
            },
            findLis: function() { return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis },
            render: function(b) {
                var c, d = this;
                b !== !1 && this.$element.find("option").each(function(a) {
                    var b = d.findLis().eq(d.liObj[a]);
                    d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, b), d.setSelected(a, this.selected, b)
                }), this.tabIndex();
                var e = this.$element.find("option").map(function() {
                        if (this.selected) {
                            if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                            var b, c = a(this),
                                e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
                            return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content") : e + c.html() + b
                        }
                    }).toArray(),
                    f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var g = this.options.selectedTextFormat.split(">");
                    if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
                        c = this.options.hideDisabled ? ", [disabled]" : "";
                        var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + c).length,
                            i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
                        f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", a.trim(f.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(f), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function(a, b) { this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, "")); var c = a ? a : this.options.style; "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c)) },
            liHeight: function(b) {
                if (b || this.options.size !== !1 && !this.sizeInfo) {
                    var c = document.createElement("div"),
                        d = document.createElement("div"),
                        e = document.createElement("ul"),
                        f = document.createElement("li"),
                        g = document.createElement("li"),
                        h = document.createElement("a"),
                        i = document.createElement("span"),
                        j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        k = this.options.liveSearch ? document.createElement("div") : null,
                        l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
                        var n = document.createElement("span");
                        k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
                    }
                    l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
                    var o = h.offsetHeight,
                        p = j ? j.offsetHeight : 0,
                        q = k ? k.offsetHeight : 0,
                        r = l ? l.offsetHeight : 0,
                        s = m ? m.offsetHeight : 0,
                        t = a(f).outerHeight(!0),
                        u = "function" == typeof getComputedStyle ? getComputedStyle(d) : !1,
                        v = u ? null : a(d),
                        w = parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
                        x = w + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2;
                    document.body.removeChild(c), this.sizeInfo = { liHeight: o, headerHeight: p, searchHeight: q, actionsHeight: r, doneButtonHeight: s, dividerHeight: t, menuPadding: w, menuExtras: x }
                }
            },
            setSize: function() {
                if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
                    var b, c, d, e, f = this,
                        g = this.$menu,
                        h = this.$menuInner,
                        i = a(window),
                        j = this.$newElement[0].offsetHeight,
                        k = this.sizeInfo.liHeight,
                        l = this.sizeInfo.headerHeight,
                        m = this.sizeInfo.searchHeight,
                        n = this.sizeInfo.actionsHeight,
                        o = this.sizeInfo.doneButtonHeight,
                        p = this.sizeInfo.dividerHeight,
                        q = this.sizeInfo.menuPadding,
                        r = this.sizeInfo.menuExtras,
                        s = this.options.hideDisabled ? ".disabled" : "",
                        t = function() { d = f.$newElement.offset().top - i.scrollTop(), e = i.height() - d - j };
                    if (t(), "auto" === this.options.size) {
                        var u = function() {
                            var i, j = function(b, c) { return function(d) { return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b)) } },
                                p = f.$menuInner[0].getElementsByTagName("li"),
                                s = Array.prototype.filter ? Array.prototype.filter.call(p, j("hidden", !1)) : f.$lis.not(".hidden"),
                                u = Array.prototype.filter ? Array.prototype.filter.call(s, j("dropdown-header", !0)) : s.filter(".dropdown-header");
                            t(), b = e - r, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && f.$newElement.toggleClass("dropup", d > e && c > b - r), f.$newElement.hasClass("dropup") && (b = d - r), i = s.length + u.length > 3 ? 3 * k + r - 2 : 0, g.css({ "max-height": b + "px", overflow: "hidden", "min-height": i + l + m + n + o + "px" }), h.css({ "max-height": b - l - m - n - o - q + "px", "overflow-y": "auto", "min-height": Math.max(i - q, 0) + "px" })
                        };
                        u(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", u), i.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", u)
                    } else if (this.options.size && "auto" != this.options.size && this.$lis.not(s).length > this.options.size) {
                        var v = this.$lis.not(".divider").not(s).children().slice(0, this.options.size).last().parent().index(),
                            w = this.$lis.slice(0, v + 1).filter(".divider").length;
                        b = k * this.options.size + w * p + q, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && this.$newElement.toggleClass("dropup", d > e && c > b - r), g.css({ "max-height": b + l + m + n + o + "px", overflow: "hidden", "min-height": "" }), h.css({ "max-height": b - q + "px", "overflow-y": "auto", "min-height": "" })
                    }
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var a = this.$menu.parent().clone().appendTo("body"),
                        b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
                        c = a.children(".dropdown-menu").outerWidth(),
                        d = b.css("width", "auto").children("button").outerWidth();
                    a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function() {
                this.$bsContainer = a('<div class="bs-container" />');
                var b, c, d = this,
                    e = function(a) { d.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), c = a.hasClass("dropup") ? 0 : a[0].offsetHeight, d.$bsContainer.css({ top: b.top + c, left: b.left, width: a[0].offsetWidth }) };
                this.$button.on("click", function() {
                    var b = a(this);
                    d.isDisabled() || (e(d.$newElement), d.$bsContainer.appendTo(d.options.container).toggleClass("open", !b.hasClass("open")).append(d.$menu))
                }), a(window).on("resize scroll", function() { e(d.$newElement) }), this.$element.on("hide.bs.select", function() { d.$menu.data("height", d.$menu.height()), d.$bsContainer.detach() })
            },
            setSelected: function(a, b, c) { c || (c = this.findLis().eq(this.liObj[a])), c.toggleClass("selected", b) },
            setDisabled: function(a, b, c) { c || (c = this.findLis().eq(this.liObj[a])), b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0) },
            isDisabled: function() { return this.$element[0].disabled },
            checkDisabled: function() {
                var a = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() { return !a.isDisabled() })
            },
            tabIndex: function() { this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98) },
            clickListener: function() {
                var b = this,
                    c = a(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(a) { a.stopPropagation() }), c.data("spaceSelect", !1), this.$button.on("keyup", function(a) { /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1)) }), this.$button.on("click", function() { b.setSize() }), this.$element.on("shown.bs.select", function() {
                    if (b.options.liveSearch || b.multiple) {
                        if (!b.multiple) {
                            var a = b.liObj[b.$element[0].selectedIndex];
                            if ("number" != typeof a || b.options.size === !1) return;
                            var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
                            c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
                        }
                    } else b.$menuInner.find(".selected a").focus()
                }), this.$menuInner.on("click", "li a", function(c) {
                    var d = a(this),
                        e = d.parent().data("originalIndex"),
                        f = b.$element.val(),
                        g = b.$element.prop("selectedIndex");
                    if (b.multiple && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
                        var h = b.$element.find("option"),
                            i = h.eq(e),
                            j = i.prop("selected"),
                            k = i.parent("optgroup"),
                            l = b.options.maxOptions,
                            m = k.data("maxOptions") || !1;
                        if (b.multiple) {
                            if (i.prop("selected", !j), b.setSelected(e, !j), d.blur(), l !== !1 || m !== !1) {
                                var n = l < h.filter(":selected").length,
                                    o = m < k.find("option:selected").length;
                                if (l && n || m && o)
                                    if (l && 1 == l) h.prop("selected", !1), i.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                                    else if (m && 1 == m) {
                                    k.find("option:selected").prop("selected", !1), i.prop("selected", !0);
                                    var p = d.parent().data("optgroup");
                                    b.$menuInner.find('[data-optgroup="' + p + '"]').removeClass("selected"), b.setSelected(e, !0)
                                } else {
                                    var q = "function" == typeof b.options.maxOptionsText ? b.options.maxOptionsText(l, m) : b.options.maxOptionsText,
                                        r = q[0].replace("{n}", l),
                                        s = q[1].replace("{n}", m),
                                        t = a('<div class="notify"></div>');
                                    q[2] && (r = r.replace("{var}", q[2][l > 1 ? 0 : 1]), s = s.replace("{var}", q[2][m > 1 ? 0 : 1])), i.prop("selected", !1), b.$menu.append(t), l && n && (t.append(a("<div>" + r + "</div>")), b.$element.trigger("maxReached.bs.select")), m && o && (t.append(a("<div>" + s + "</div>")), b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() { b.setSelected(e, !1) }, 10), t.delay(750).fadeOut(300, function() { a(this).remove() })
                                }
                            }
                        } else h.prop("selected", !1), i.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                        b.multiple ? b.options.liveSearch && b.$searchbox.focus() : b.$button.focus(), (f != b.$element.val() && b.multiple || g != b.$element.prop("selectedIndex") && !b.multiple) && b.$element.trigger("changed.bs.select", [e, i.prop("selected"), j]).triggerNative("change")
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(c) { c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus()) }), this.$menuInner.on("click", ".divider, .dropdown-header", function(a) { a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus() }), this.$menu.on("click", ".popover-title .close", function() { b.$button.click() }), this.$searchbox.on("click", function(a) { a.stopPropagation() }), this.$menu.on("click", ".actions-btn", function(c) { b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll() }), this.$element.change(function() { b.render(!1) })
            },
            liveSearchListener: function() {
                var d = this,
                    e = a('<li class="no-results"></li>');
                this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", function() { d.$menuInner.find(".active").removeClass("active"), d.$searchbox.val() && (d.$searchbox.val(""), d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove()), d.multiple || d.$menuInner.find(".selected").addClass("active"), setTimeout(function() { d.$searchbox.focus() }, 10) }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(a) { a.stopPropagation() }), this.$searchbox.on("input propertychange", function() {
                    if (d.$searchbox.val()) {
                        var f = d.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        f = d.options.liveSearchNormalize ? f.not(":a" + d._searchStyle() + '("' + b(d.$searchbox.val()) + '")') : f.not(":" + d._searchStyle() + '("' + d.$searchbox.val() + '")'), f.parent().addClass("hidden"), d.$lis.filter(".dropdown-header").each(function() {
                            var b = a(this),
                                c = b.data("optgroup");
                            0 === d.$lis.filter("[data-optgroup=" + c + "]").not(b).not(".hidden").length && (b.addClass("hidden"), d.$lis.filter("[data-optgroup=" + c + "div]").addClass("hidden"))
                        });
                        var g = d.$lis.not(".hidden");
                        g.each(function(b) {
                            var c = a(this);
                            c.hasClass("divider") && (c.index() === g.first().index() || c.index() === g.last().index() || g.eq(b + 1).hasClass("divider")) && c.addClass("hidden")
                        }), d.$lis.not(".hidden, .no-results").length ? e.parent().length && e.remove() : (e.parent().length && e.remove(), e.html(d.options.noneResultsText.replace("{0}", '"' + c(d.$searchbox.val()) + '"')).show(), d.$menuInner.append(e))
                    } else d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove();
                    d.$lis.filter(".active").removeClass("active"), d.$searchbox.val() && d.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), a(this).focus()
                })
            },
            _searchStyle: function() { var a = { begins: "ibegins", startsWith: "ibegins" }; return a[this.options.liveSearchStyle] || "icontains" },
            val: function(a) { return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val() },
            changeAll: function(b) {
                "undefined" == typeof b && (b = !0), this.findLis();
                for (var c = this.$element.find("option"), d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", b), e = d.length, f = [], g = 0; e > g; g++) {
                    var h = d[g].getAttribute("data-original-index");
                    f[f.length] = c.eq(h)[0]
                }
                a(f).prop("selected", b), this.render(!1), this.$element.trigger("changed.bs.select").triggerNative("change")
            },
            selectAll: function() { return this.changeAll(!0) },
            deselectAll: function() { return this.changeAll(!1) },
            toggle: function(a) { a = a || window.event, a && a.stopPropagation(), this.$button.trigger("click") },
            keydown: function(c) {
                var d, e, f, g, h, i, j, k, l, m = a(this),
                    n = m.is("input") ? m.parent().parent() : m.parent(),
                    o = n.data("this"),
                    p = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    q = { 32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9" };
                if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a("[role=menu] li", n), l = o.$newElement.hasClass("open"), !l && (c.keyCode >= 48 && c.keyCode <= 57 || c.keyCode >= 96 && c.keyCode <= 105 || c.keyCode >= 65 && c.keyCode <= 90) && (o.options.container ? o.$button.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), o.$searchbox.focus()), o.options.liveSearch && (/(^9$|27)/.test(c.keyCode.toString(10)) && l && 0 === o.$menu.find(".active").length && (c.preventDefault(), o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus()), d = a("[role=menu] li" + p, n), m.val() || /(38|40)/.test(c.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$menuInner.find("li"), d = o.options.liveSearchNormalize ? d.filter(":a" + o._searchStyle() + "(" + b(q[c.keyCode]) + ")") : d.filter(":" + o._searchStyle() + "(" + q[c.keyCode] + ")"))), d.length) {
                    if (/(38|40)/.test(c.keyCode.toString(10))) e = d.index(d.find("a").filter(":focus").parent()), g = d.filter(p).first().index(), h = d.filter(p).last().index(), f = d.eq(e).nextAll(p).eq(0).index(), i = d.eq(e).prevAll(p).eq(0).index(), j = d.eq(f).prevAll(p).eq(0).index(), o.options.liveSearch && (d.each(function(b) { a(this).hasClass("disabled") || a(this).data("index", b) }), e = d.index(d.filter(".active")), g = d.first().data("index"), h = d.last().data("index"), f = d.eq(e).nextAll().eq(0).data("index"), i = d.eq(e).prevAll().eq(0).data("index"), j = d.eq(f).prevAll().eq(0).data("index")), k = m.data("prevIndex"), 38 == c.keyCode ? (o.options.liveSearch && e--, e != j && e > i && (e = i), g > e && (e = g), e == k && (e = h)) : 40 == c.keyCode && (o.options.liveSearch && e++, -1 == e && (e = 0), e != j && f > e && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (c.preventDefault(), m.hasClass("dropdown-toggle") || (d.removeClass("active").eq(e).addClass("active").children("a").focus(), m.focus())) : d.eq(e).children("a").focus();
                    else if (!m.is("input")) {
                        var r, s, t = [];
                        d.each(function() { a(this).hasClass("disabled") || a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == q[c.keyCode] && t.push(a(this).index()) }), r = a(document).data("keycount"), r++, a(document).data("keycount", r), s = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), s != q[c.keyCode] ? (r = 1, a(document).data("keycount", r)) : r >= t.length && (a(document).data("keycount", 0), r > t.length && (r = 1)), d.eq(t[r - 1]).children("a").focus()
                    }
                    if ((/(13|32)/.test(c.keyCode.toString(10)) || /(^9$)/.test(c.keyCode.toString(10)) && o.options.selectOnTab) && l) {
                        if (/(32)/.test(c.keyCode.toString(10)) || c.preventDefault(), o.options.liveSearch) /(32)/.test(c.keyCode.toString(10)) || (o.$menuInner.find(".active a").click(), m.focus());
                        else {
                            var u = a(":focus");
                            u.click(), u.focus(), c.preventDefault(), a(document).data("spaceSelect", !0)
                        }
                        a(document).data("keycount", 0)
                    }(/(^9$|27)/.test(c.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(c.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus())
                }
            },
            mobile: function() { this.$element.addClass("mobile-device") },
            refresh: function() { this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select") },
            hide: function() { this.$newElement.hide() },
            show: function() { this.$newElement.show() },
            remove: function() { this.$newElement.remove(), this.$element.remove() },
            destroy: function() { this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker") }
        };
        var f = a.fn.selectpicker;
        a.fn.selectpicker = d, a.fn.selectpicker.Constructor = e, a.fn.selectpicker.noConflict = function() { return a.fn.selectpicker = f, this }, a(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', e.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(a) { a.stopPropagation() }), a(window).on("load.bs.select.data-api", function() {
            a(".selectpicker").each(function() {
                var b = a(this);
                d.call(b, b.data())
            })
        })
    }(a)
});
var ssc_framerate = 150,
    ssc_animtime = 500,
    ssc_stepsize = 150,
    ssc_pulseAlgorithm = !0,
    ssc_pulseScale = 6,
    ssc_pulseNormalize = 1,
    ssc_keyboardsupport = !0,
    ssc_arrowscroll = 50,
    ssc_frame = !1,
    ssc_direction = {
        x: 0,
        y: 0
    },
    ssc_initdone = !1,
    ssc_fixedback = !0,
    ssc_root = document.documentElement,
    ssc_activeElement, ssc_key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
    ssc_que = [],
    ssc_pending = !1,
    ssc_cache = {};
setInterval(function() { ssc_cache = {} }, 1e4);
var ssc_uniqueID = function() { var a = 0; return function(b) { return b.ssc_uniqueID || (b.ssc_uniqueID = a++) } }(),
    ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
ischrome && (ssc_addEvent("mousedown", ssc_mousedown), ssc_addEvent("mousewheel", ssc_wheel), ssc_addEvent("load", ssc_init)), ! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery) }(function(a) {
        function b(b) {
            var g = b || window.event,
                h = i.call(arguments, 1),
                j = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
            if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                if (1 === g.deltaMode) {
                    var q = a.data(this, "mousewheel-line-height");
                    j *= q, m *= q, l *= q
                } else if (2 === g.deltaMode) {
                    var r = a.data(this, "mousewheel-page-height");
                    j *= r, m *= r, l *= r
                }
                if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                    var s = this.getBoundingClientRect();
                    o = b.clientX - s.left, p = b.clientY - s.top
                }
                return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
            }
        }

        function c() { f = null }

        function d(a, b) { return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0 }
        var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            i = Array.prototype.slice;
        if (a.event.fixHooks)
            for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
        var k = a.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                else this.onmousewheel = b;
                a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                else this.onmousewheel = null;
                a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(b) {
                var c = a(b),
                    d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
            },
            getPageHeight: function(b) { return a(b).height() },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
        };
        a.fn.extend({ mousewheel: function(a) { return a ? this.bind("mousewheel", a) : this.trigger("mousewheel") }, unmousewheel: function(a) { return this.unbind("mousewheel", a) } })
    }),
    function(a) {
        var b = -1,
            c = -1,
            d = function(a) { return parseFloat(a) || 0 },
            e = function(b) {
                var c = null,
                    e = [];
                return a(b).each(function() {
                    var b = a(this),
                        f = b.offset().top - d(b.css("margin-top")),
                        g = 0 < e.length ? e[e.length - 1] : null;
                    null === g ? e.push(b) : 1 >= Math.floor(Math.abs(c - f)) ? e[e.length - 1] = g.add(b) : e.push(b), c = f
                }), e
            },
            f = function(b) { var c = { byRow: !0, property: "height", target: null, remove: !1 }; return "object" == typeof b ? a.extend(c, b) : ("boolean" == typeof b ? c.byRow = b : "remove" === b && (c.remove = !0), c) },
            g = a.fn.matchHeight = function(b) { if (b = f(b), b.remove) { var c = this; return this.css(b.property, ""), a.each(g._groups, function(a, b) { b.elements = b.elements.not(c) }), this } return 1 >= this.length && !b.target ? this : (g._groups.push({ elements: this, options: b }), g._apply(this, b), this) };
        g._groups = [], g._throttle = 80, g._maintainScroll = !1, g._beforeUpdate = null, g._afterUpdate = null, g._apply = function(b, c) {
            var h = f(c),
                i = a(b),
                j = [i],
                k = a(window).scrollTop(),
                l = a("html").outerHeight(!0),
                m = i.parents().filter(":hidden");
            return m.each(function() {
                var b = a(this);
                b.data("style-cache", b.attr("style"))
            }), m.css("display", "block"), h.byRow && !h.target && (i.each(function() {
                var b = a(this),
                    c = b.css("display");
                "inline-block" !== c && "inline-flex" !== c && (c = "block"), b.data("style-cache", b.attr("style")), b.css({ display: c, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px" })
            }), j = e(i), i.each(function() {
                var b = a(this);
                b.attr("style", b.data("style-cache") || "")
            })), a.each(j, function(b, c) {
                var e = a(c),
                    f = 0;
                if (h.target) f = h.target.outerHeight(!1);
                else {
                    if (h.byRow && 1 >= e.length) return void e.css(h.property, "");
                    e.each(function() {
                        var b = a(this),
                            c = b.css("display");
                        "inline-block" !== c && "inline-flex" !== c && (c = "block"), c = { display: c }, c[h.property] = "", b.css(c), b.outerHeight(!1) > f && (f = b.outerHeight(!1)), b.css("display", "")
                    })
                }
                e.each(function() {
                    var b = a(this),
                        c = 0;
                    h.target && b.is(h.target) || ("border-box" !== b.css("box-sizing") && (c += d(b.css("border-top-width")) + d(b.css("border-bottom-width")), c += d(b.css("padding-top")) + d(b.css("padding-bottom"))), b.css(h.property, f - c + "px"))
                })
            }), m.each(function() {
                var b = a(this);
                b.attr("style", b.data("style-cache") || null)
            }), g._maintainScroll && a(window).scrollTop(k / l * a("html").outerHeight(!0)), this
        }, g._applyDataApi = function() {
            var b = {};
            a("[data-match-height], [data-mh]").each(function() {
                var c = a(this),
                    d = c.attr("data-mh") || c.attr("data-match-height");
                b[d] = d in b ? b[d].add(c) : c
            }), a.each(b, function() { this.matchHeight(!0) })
        };
        var h = function(b) { g._beforeUpdate && g._beforeUpdate(b, g._groups), a.each(g._groups, function() { g._apply(this.elements, this.options) }), g._afterUpdate && g._afterUpdate(b, g._groups) };
        g._update = function(d, e) {
            if (e && "resize" === e.type) {
                var f = a(window).width();
                if (f === b) return;
                b = f
            }
            d ? -1 === c && (c = setTimeout(function() { h(e), c = -1 }, g._throttle)) : h(e)
        }, a(g._applyDataApi), a(window).bind("load", function(a) { g._update(!1, a) }), a(window).bind("resize orientationchange", function(a) { g._update(!0, a) })
    }(jQuery),
    function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function(a) {
        function b(a, b) { return a.toFixed(b.decimals) }
        var c = function(b, d) { this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, this.dataOptions(), d), this.init() };
        c.DEFAULTS = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: b, onUpdate: null, onComplete: null }, c.prototype.init = function() { this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops }, c.prototype.dataOptions = function() {
            var a = { from: this.$element.data("from"), to: this.$element.data("to"), speed: this.$element.data("speed"), refreshInterval: this.$element.data("refresh-interval"), decimals: this.$element.data("decimals") },
                b = Object.keys(a);
            for (var c in b) { var d = b[c]; "undefined" == typeof a[d] && delete a[d] }
            return a
        }, c.prototype.update = function() { this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value)) }, c.prototype.render = function() {
            var a = this.options.formatter.call(this.$element, this.value, this.options);
            this.$element.text(a)
        }, c.prototype.restart = function() { this.stop(), this.init(), this.start() }, c.prototype.start = function() { this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval) }, c.prototype.stop = function() { this.interval && clearInterval(this.interval) }, c.prototype.toggle = function() { this.interval ? this.stop() : this.start() }, a.fn.countTo = function(b) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("countTo"),
                    f = !e || "object" == typeof b,
                    g = "object" == typeof b ? b : {},
                    h = "string" == typeof b ? b : "start";
                f && (e && e.stop(), d.data("countTo", e = new c(this, g))), e[h].call(e)
            })
        }
    }), jQuery.extend({
        highlight: function(a, b, c, d) {
            if (3 === a.nodeType) {
                var e = a.data.match(b);
                if (e) {
                    var f = document.createElement(c || "span");
                    f.className = d || "highlight";
                    var g = a.splitText(e.index);
                    g.splitText(e[0].length);
                    var h = g.cloneNode(!0);
                    return f.appendChild(h), g.parentNode.replaceChild(f, g), 1
                }
            } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName) && (a.tagName !== c.toUpperCase() || a.className !== d))
                for (var i = 0; i < a.childNodes.length; i++) i += jQuery.highlight(a.childNodes[i], b, c, d);
            return 0
        }
    }), jQuery.fn.unhighlight = function(a) {
        var b = { className: "highlight", element: "span" };
        return jQuery.extend(b, a), this.find(b.element + "." + b.className).each(function() {
            var a = this.parentNode;
            a.replaceChild(this.firstChild, this), a.normalize()
        }).end()
    }, jQuery.fn.highlight = function(a, b) {
        var c = { className: "highlight", element: "span", caseSensitive: !1, wordsOnly: !1 };
        if (jQuery.extend(c, b), a.constructor === String && (a = [a]), a = jQuery.grep(a, function(a, b) { return "" != a }), a = jQuery.map(a, function(a, b) { return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") }), 0 == a.length) return this;
        var d = c.caseSensitive ? "" : "i",
            e = "(" + a.join("|") + ")";
        c.wordsOnly && (e = "\\b" + e + "\\b");
        var f = new RegExp(e, d);
        return this.each(function() { jQuery.highlight(this, f, c.element, c.className) })
    }, ! function(a) {
        "use strict";

        function b(b, c) { this.isInit = !0, this.itemsArray = [], this.$element = a(b), this.$element.hide(), this.isSelect = "SELECT" === b.tagName, this.multiple = this.isSelect && b.hasAttribute("multiple"), this.objectItems = c && c.itemValue, this.placeholderText = b.hasAttribute("placeholder") ? this.$element.attr("placeholder") : "", this.inputSize = Math.max(1, this.placeholderText.length), this.$container = a('<div class="bootstrap-tagsinput"></div>'), this.$input = a('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container), this.$element.before(this.$container), this.build(c), this.isInit = !1 }

        function c(a, b) {
            if ("function" != typeof a[b]) {
                var c = a[b];
                a[b] = function(a) { return a[c] }
            }
        }

        function d(a, b) {
            if ("function" != typeof a[b]) {
                var c = a[b];
                a[b] = function() { return c }
            }
        }

        function e(a) { return a ? i.text(a).html() : "" }

        function f(a) {
            var b = 0;
            if (document.selection) {
                a.focus();
                var c = document.selection.createRange();
                c.moveStart("character", -a.value.length), b = c.text.length
            } else(a.selectionStart || "0" == a.selectionStart) && (b = a.selectionStart);
            return b
        }

        function g(b, c) {
            var d = !1;
            return a.each(c, function(a, c) {
                if ("number" == typeof c && b.which === c) return d = !0, !1;
                if (b.which === c.which) {
                    var e = !c.hasOwnProperty("altKey") || b.altKey === c.altKey,
                        f = !c.hasOwnProperty("shiftKey") || b.shiftKey === c.shiftKey,
                        g = !c.hasOwnProperty("ctrlKey") || b.ctrlKey === c.ctrlKey;
                    if (e && f && g) return d = !0, !1
                }
            }), d
        }
        var h = { tagClass: function(a) { return "label label-info" }, focusClass: "focus", itemValue: function(a) { return a ? a.toString() : a }, itemText: function(a) { return this.itemValue(a) }, itemTitle: function(a) { return null }, freeInput: !0, addOnBlur: !0, maxTags: void 0, maxChars: void 0, confirmKeys: [13, 44], delimiter: ",", delimiterRegex: null, cancelConfirmKeysOnEmpty: !1, onTagExists: function(a, b) { b.hide().fadeIn() }, trimValue: !1, allowDuplicates: !1, triggerChange: !0 };
        b.prototype = {
            constructor: b,
            add: function(b, c, d) {
                var f = this;
                if (!(f.options.maxTags && f.itemsArray.length >= f.options.maxTags) && (b === !1 || b)) {
                    if ("string" == typeof b && f.options.trimValue && (b = a.trim(b)), "object" == typeof b && !f.objectItems) throw "Can't add objects when itemValue option is not set";
                    if (!b.toString().match(/^\s*$/)) {
                        if (f.isSelect && !f.multiple && f.itemsArray.length > 0 && f.remove(f.itemsArray[0]), "string" == typeof b && "INPUT" === this.$element[0].tagName) {
                            var g = f.options.delimiterRegex ? f.options.delimiterRegex : f.options.delimiter,
                                h = b.split(g);
                            if (h.length > 1) { for (var i = 0; i < h.length; i++) this.add(h[i], !0); return void(c || f.pushVal(f.options.triggerChange)) }
                        }
                        var j = f.options.itemValue(b),
                            k = f.options.itemText(b),
                            l = f.options.tagClass(b),
                            m = f.options.itemTitle(b),
                            n = a.grep(f.itemsArray, function(a) { return f.options.itemValue(a) === j })[0];
                        if (!n || f.options.allowDuplicates) {
                            if (!(f.items().toString().length + b.length + 1 > f.options.maxInputLength)) {
                                var o = a.Event("beforeItemAdd", { item: b, cancel: !1, options: d });
                                if (f.$element.trigger(o), !o.cancel) {
                                    f.itemsArray.push(b);
                                    var p = a('<span class="tag ' + e(l) + (null !== m ? '" title="' + m : "") + '">' + e(k) + '<span data-role="remove"></span></span>');
                                    p.data("item", b), f.findInputWrapper().before(p), p.after(" ");
                                    var q = a('option[value="' + encodeURIComponent(j) + '"]', f.$element).length || a('option[value="' + e(j) + '"]', f.$element).length;
                                    if (f.isSelect && !q) {
                                        var r = a("<option selected>" + e(k) + "</option>");
                                        r.data("item", b), r.attr("value", j), f.$element.append(r)
                                    }
                                    c || f.pushVal(f.options.triggerChange), (f.options.maxTags === f.itemsArray.length || f.items().toString().length === f.options.maxInputLength) && f.$container.addClass("bootstrap-tagsinput-max"), a(".typeahead, .twitter-typeahead", f.$container).length && f.$input.typeahead("val", ""), this.isInit ? f.$element.trigger(a.Event("itemAddedOnInit", { item: b, options: d })) : f.$element.trigger(a.Event("itemAdded", { item: b, options: d }))
                                }
                            }
                        } else if (f.options.onTagExists) {
                            var s = a(".tag", f.$container).filter(function() { return a(this).data("item") === n });
                            f.options.onTagExists(b, s)
                        }
                    }
                }
            },
            remove: function(b, c, d) {
                var e = this;
                if (e.objectItems && (b = "object" == typeof b ? a.grep(e.itemsArray, function(a) { return e.options.itemValue(a) == e.options.itemValue(b) }) : a.grep(e.itemsArray, function(a) { return e.options.itemValue(a) == b }), b = b[b.length - 1]), b) {
                    var f = a.Event("beforeItemRemove", { item: b, cancel: !1, options: d });
                    if (e.$element.trigger(f), f.cancel) return;
                    a(".tag", e.$container).filter(function() { return a(this).data("item") === b }).remove(), a("option", e.$element).filter(function() { return a(this).data("item") === b }).remove(), -1 !== a.inArray(b, e.itemsArray) && e.itemsArray.splice(a.inArray(b, e.itemsArray), 1)
                }
                c || e.pushVal(e.options.triggerChange), e.options.maxTags > e.itemsArray.length && e.$container.removeClass("bootstrap-tagsinput-max"), e.$element.trigger(a.Event("itemRemoved", { item: b, options: d }))
            },
            removeAll: function() {
                var b = this;
                for (a(".tag", b.$container).remove(), a("option", b.$element).remove(); b.itemsArray.length > 0;) b.itemsArray.pop();
                b.pushVal(b.options.triggerChange)
            },
            refresh: function() {
                var b = this;
                a(".tag", b.$container).each(function() {
                    var c = a(this),
                        d = c.data("item"),
                        f = b.options.itemValue(d),
                        g = b.options.itemText(d),
                        h = b.options.tagClass(d);
                    if (c.attr("class", null), c.addClass("tag " + e(h)), c.contents().filter(function() { return 3 == this.nodeType })[0].nodeValue = e(g), b.isSelect) {
                        var i = a("option", b.$element).filter(function() { return a(this).data("item") === d });
                        i.attr("value", f)
                    }
                })
            },
            items: function() { return this.itemsArray },
            pushVal: function() {
                var b = this,
                    c = a.map(b.items(), function(a) { return b.options.itemValue(a).toString() });
                b.$element.val(c, !0), b.options.triggerChange && b.$element.trigger("change")
            },
            build: function(b) {
                var e = this;
                if (e.options = a.extend({}, h, b), e.objectItems && (e.options.freeInput = !1), c(e.options, "itemValue"), c(e.options, "itemText"), d(e.options, "tagClass"), e.options.typeahead) {
                    var i = e.options.typeahead || {};
                    d(i, "source"), e.$input.typeahead(a.extend({}, i, {
                        source: function(b, c) {
                            function d(a) {
                                for (var b = [], d = 0; d < a.length; d++) {
                                    var g = e.options.itemText(a[d]);
                                    f[g] = a[d], b.push(g)
                                }
                                c(b)
                            }
                            this.map = {};
                            var f = this.map,
                                g = i.source(b);
                            a.isFunction(g.success) ? g.success(d) : a.isFunction(g.then) ? g.then(d) : a.when(g).then(d)
                        },
                        updater: function(a) { return e.add(this.map[a]), this.map[a] },
                        matcher: function(a) { return -1 !== a.toLowerCase().indexOf(this.query.trim().toLowerCase()) },
                        sorter: function(a) { return a.sort() },
                        highlighter: function(a) { var b = new RegExp("(" + this.query + ")", "gi"); return a.replace(b, "<strong>$1</strong>") }
                    }))
                }
                if (e.options.typeaheadjs) {
                    var j = null,
                        k = {},
                        l = e.options.typeaheadjs;
                    a.isArray(l) ? (j = l[0], k = l[1]) : k = l, e.$input.typeahead(j, k).on("typeahead:selected", a.proxy(function(a, b) { k.valueKey ? e.add(b[k.valueKey]) : e.add(b), e.$input.typeahead("val", "") }, e))
                }
                e.$container.on("click", a.proxy(function(a) { e.$element.attr("disabled") || e.$input.removeAttr("disabled"), e.$input.focus() }, e)), e.options.addOnBlur && e.options.freeInput && e.$input.on("focusout", a.proxy(function(b) { 0 === a(".typeahead, .twitter-typeahead", e.$container).length && (e.add(e.$input.val()), e.$input.val("")) }, e)), e.$container.on({ focusin: function() { e.$container.addClass(e.options.focusClass) }, focusout: function() { e.$container.removeClass(e.options.focusClass) } }), e.$container.on("keydown", "input", a.proxy(function(b) {
                    var c = a(b.target),
                        d = e.findInputWrapper();
                    if (e.$element.attr("disabled")) return void e.$input.attr("disabled", "disabled");
                    switch (b.which) {
                        case 8:
                            if (0 === f(c[0])) {
                                var g = d.prev();
                                g.length && e.remove(g.data("item"))
                            }
                            break;
                        case 46:
                            if (0 === f(c[0])) {
                                var h = d.next();
                                h.length && e.remove(h.data("item"))
                            }
                            break;
                        case 37:
                            var i = d.prev();
                            0 === c.val().length && i[0] && (i.before(d), c.focus());
                            break;
                        case 39:
                            var j = d.next();
                            0 === c.val().length && j[0] && (j.after(d), c.focus())
                    }
                    var k = c.val().length;
                    Math.ceil(k / 5), c.attr("size", Math.max(this.inputSize, c.val().length))
                }, e)), e.$container.on("keypress", "input", a.proxy(function(b) {
                    var c = a(b.target);
                    if (e.$element.attr("disabled")) return void e.$input.attr("disabled", "disabled");
                    var d = c.val(),
                        f = e.options.maxChars && d.length >= e.options.maxChars;
                    e.options.freeInput && (g(b, e.options.confirmKeys) || f) && (0 !== d.length && (e.add(f ? d.substr(0, e.options.maxChars) : d), c.val("")), e.options.cancelConfirmKeysOnEmpty === !1 && b.preventDefault());
                    var h = c.val().length;
                    Math.ceil(h / 5), c.attr("size", Math.max(this.inputSize, c.val().length))
                }, e)), e.$container.on("click", "[data-role=remove]", a.proxy(function(b) { e.$element.attr("disabled") || e.remove(a(b.target).closest(".tag").data("item")) }, e)), e.options.itemValue === h.itemValue && ("INPUT" === e.$element[0].tagName ? e.add(e.$element.val()) : a("option", e.$element).each(function() { e.add(a(this).attr("value"), !0) }))
            },
            destroy: function() {
                var a = this;
                a.$container.off("keypress", "input"), a.$container.off("click", "[role=remove]"), a.$container.remove(), a.$element.removeData("tagsinput"), a.$element.show()
            },
            focus: function() { this.$input.focus() },
            input: function() { return this.$input },
            findInputWrapper: function() { for (var b = this.$input[0], c = this.$container[0]; b && b.parentNode !== c;) b = b.parentNode; return a(b) }
        }, a.fn.tagsinput = function(c, d, e) {
            var f = [];
            return this.each(function() {
                var g = a(this).data("tagsinput");
                if (g)
                    if (c || d) {
                        if (void 0 !== g[c]) {
                            if (3 === g[c].length && void 0 !== e) var h = g[c](d, null, e);
                            else var h = g[c](d);
                            void 0 !== h && f.push(h)
                        }
                    } else f.push(g);
                else g = new b(this, c), a(this).data("tagsinput", g), f.push(g), "SELECT" === this.tagName && a("option", a(this)).attr("selected", "selected"), a(this).val(a(this).val())
            }), "string" == typeof c ? f.length > 1 ? f : f[0] : f
        }, a.fn.tagsinput.Constructor = b;
        var i = a("<div />");
        a(function() { a("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput() })
    }(window.jQuery), $(function() {
        "use strict";
        $('a[href="#"]').on("click", function(a) { a.preventDefault() }), $("#scroll-up").on("click", function() { return $("html, body").animate({ scrollTop: 0 }, 600), !1 }), $('a[href^="#"]:not([href="#"])').on("click", function() { var a = $(this).attr("href"); return $(a).size() > 0 && $("html, body").animate({ scrollTop: $(a).offset().top }, 600), !1 });
        var a = location.hash.replace("#", "");
        if ("" != a && $("#" + a).size() > 0 && $("html, body").animate({ scrollTop: $("#" + a).offset().top - 100 }, 600), $(".js-switch").length) {
            var b = Array.prototype.slice.call(document.querySelectorAll(".js-switch"));
            b.forEach(function(a) { new Switchery(a, { size: "small" }) })
        }
        if ($(".js-switch-big").length) {
            var b = Array.prototype.slice.call(document.querySelectorAll(".js-switch-big"));
            b.forEach(function(a) { new Switchery(a) })
        }
        $(".checkall-group input").on("change", function() {
            var a = $(this).parents(".checkall-group").find("input"),
                b = a.index(this);
            0 == b ? a.eq(0).is(":checked") && a.slice(1).prop("checked", !1) : a.eq(0).prop("checked", !1)
        }), $(".dropify").dropify(), $('.upload-group input[type="file"]').on("change", function() { $(this).parents(".upload-group").children(".form-control").val($(this).val().replace(/^.*\\/, "")) }), $("#cover_img_file").on("change", function() {
            if ($(this)[0].files.length > 0) {
                var a = new FileReader;
                a.onload = function(a) {
                    var b = $(".page-header");
                    b.css("background-image", "url(" + a.target.result + ")"), b.hasClass("bg-img") || b.addClass("bg-img")
                }, a.readAsDataURL($(this)[0].files[0])
            }
        }), jQuery().summernote && $(".summernote-editor").summernote({ dialogsInBody: !0, height: 300 }), $(".category-grid > a, .equal-team-members .team-member").matchHeight();
        var c, d = 0;
        $(window).on("scroll", function() {
            clearTimeout(c);
            var a = $(this).scrollTop(),
                b = $(".smart-nav.body-scrolled .navbar");
            return a > 20 ? ($("body").addClass("body-scrolled"), void($("body").hasClass("offcanvas-show") || b.find(".user-account.open").length || (a >= d ? b.css("top", "-70px") : (b.css("top", "0"), c = setTimeout(function() { b.css("top", "-70px") }, 5e3)), d = a))) : ($("body").removeClass("body-scrolled"), void b.css("top", ""))
        }), $(".user-account").on("show.bs.dropdown", function() { clearTimeout(c) }), $(".navbar").on("mouseenter", function() { clearTimeout(c) }), $(window).on("scroll", function() { $(".counter span:not(.counted-before)").each(function(a, b) { isScrolledIntoView(this) && $(this).countTo().addClass("counted-before") }) }), jQuery.expr[":"].icontains = function(a, b, c) { return jQuery(a).text().toUpperCase().indexOf(c[3].toUpperCase()) >= 0 }, $("#faq-search input").on("keyup", function(a) {
            var b = $(this).val().trim(),
                c = $("#faq-result .faq-items li");
            $("#faq-result section").show(), "" === b ? c.show() : (c.not(":icontains(" + b + ")").hide(), c.filter(":icontains(" + b + ")").show()), $(".faq-items").each(function() { 0 == $(this).find("li:visible").size() ? $(this).parents("section").hide() : $(this).parents("section").show() }), $(".faq-items").unhighlight().highlight(b)
        }), $('[data-toggle="offcanvas"]').on("click", function(a) { a.preventDefault(), clearTimeout(c), $("body").addClass("offcanvas-show"), $(".navbar").prepend('<div class="offcanvas-backdrop"></div>'), $("html").css("overflow", "hidden") }), $(document).on("click", ".offcanvas-backdrop", function() { $("body").removeClass("offcanvas-show"), $("html").css("overflow", "visible"), $(".offcanvas-backdrop").remove() }), $(window).on("resize", function() { $(window).width() > 991 && ($("body").removeClass("offcanvas-show"), $("html").css("overflow", "visible")) }), $(".item-block .btn-remove").on("click", function(a) {
            a.preventDefault();
            var b = $(this).parents(".item-block").parent("div");
            b.fadeOut(600, function() { b.remove() })
        }), $(".btn-duplicator").on("click", function(a) {
            a.preventDefault();
            var b = $(this).parent().siblings(".duplicateable-content"),
                c = $("<div>").append(b.clone()).html();
            $(c).insertBefore(b);
            var d = b.prev(".duplicateable-content");
            d.fadeIn(600).removeClass("duplicateable-content"), d.find(".btn-remove").on("click", function(a) {
                a.preventDefault();
                var b = $(this).parents(".item-block").parent("div");
                b.fadeOut(600, function() { b.remove() })
            })
        })
    });