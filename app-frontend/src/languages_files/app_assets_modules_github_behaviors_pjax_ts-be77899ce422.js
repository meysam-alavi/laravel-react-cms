"use strict";
(() => {
    var me = Object.defineProperty;
    var t = (C, v) => me(C, "name", {value: v, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["app_assets_modules_github_behaviors_pjax_ts"], {
        18994: (C, v, d) => {
            d.d(v, {ZP: () => M, y0: () => le});
            var f = d(98016), c = d(45153), l = d(51847), m = d(46633), p = d(5638), E = d(77552);
            const u = 20;
            let a, h = null;

            function s(r, o, e) {
                return r.dispatchEvent(new CustomEvent(o, {bubbles: !0, cancelable: !0, detail: e}))
            }

            t(s, "dispatch");

            async function M(r) {
                var o, e, n, y;
                const i = {push: !0, replace: !1, type: "GET", dataType: "html", scrollTo: 0, ...r};
                i.requestUrl = i.url;
                const g = I(i.url).hash, S = i.container, T = N(S);
                a || (a = {
                    id: O(),
                    url: window.location.href,
                    title: document.title,
                    container: T,
                    fragment: i.fragment
                }, (0, f.lO)(a, a.title, a.url)), h == null || h.abort();
                const {signal: w} = h = new AbortController;
                i.push === !0 && i.replace !== !0 && (ae(a.id, j(S)), (0, f.qA)(null, "", i.requestUrl)), s(S, "pjax:start", {url: i.url}), s(S, "pjax:send");
                let x;
                const b = ce();
                try {
                    x = await fetch(i.url, {
                        signal: w,
                        method: i.type,
                        body: i.data,
                        headers: {
                            Accept: "text/html",
                            "X-PJAX": "true",
                            "X-PJAX-Container": T,
                            "X-Requested-With": "XMLHttpRequest",
                            "X-PJAX-VERSION": (o = b.pjax) != null ? o : "",
                            "X-PJAX-CSP-VERSION": (e = b.csp) != null ? e : "",
                            "X-PJAX-CSS-VERSION": (n = b.css) != null ? n : "",
                            "X-PJAX-JS-VERSION": (y = b.js) != null ? y : ""
                        }
                    })
                } catch {
                    x = void 0
                }
                if (!x || !x.ok) {
                    const D = s(S, "pjax:error");
                    if (i.type === "GET" && D) {
                        const Q = x && x.headers.get("X-PJAX-URL"), fe = Q ? I(Q).href : i.requestUrl;
                        (0, E.b)({pjaxFailureReason: "response_error", requestUrl: i.requestUrl}), U(fe)
                    }
                    s(S, "pjax:complete"), s(S, "pjax:end");
                    return
                }
                const K = a, ee = se(), te = x.headers.get("X-PJAX-Version"), ue = await x.text(),
                    A = Y(ue, x, i), {contents: $} = A, ne = I(A.url);
                if (g && (ne.hash = g, A.url = ne.href), ee && te && ee !== te) {
                    s(S, "pjax:hardLoad", {reason: "version_mismatch"}), (0, E.b)({
                        pjaxFailureReason: "version_mismatch",
                        requestUrl: i.requestUrl
                    }), U(A.url);
                    return
                }
                if (!$) {
                    s(S, "pjax:hardLoad", {reason: "missing_response_body"}), (0, E.b)({
                        pjaxFailureReason: "missing_response_body",
                        requestUrl: i.requestUrl
                    }), U(A.url);
                    return
                }
                a = {
                    id: i.id != null ? i.id : O(),
                    url: A.url,
                    title: A.title,
                    container: T,
                    fragment: i.fragment
                }, (i.push === !0 || i.replace === !0) && (0, f.lO)(a, A.title, A.url);
                const Z = document.activeElement, de = i.container != null && i.container.contains(Z);
                if (Z instanceof HTMLElement && de) try {
                    Z.blur()
                } catch {
                }
                A.title && (document.title = A.title), s(S, "pjax:beforeReplace", {
                    contents: $,
                    state: a,
                    previousState: K
                }), R(S, $), (0, c.b)(), (0, c.o)();
                const z = S.querySelector("input[autofocus], textarea[autofocus]");
                z && document.activeElement !== z && z.focus(), A.scripts && oe(A.scripts), A.stylesheets && re(A.stylesheets);
                let G = i.scrollTo;
                if (g) {
                    const D = (0, l.Kt)(document, g);
                    D && (G = D.getBoundingClientRect().top + window.pageYOffset)
                }
                typeof G == "number" && window.scrollTo(window.pageXOffset, G), s(S, "pjax:success"), s(S, "pjax:complete"), s(S, "pjax:end")
            }

            t(M, "pjaxRequest");

            function U(r) {
                a && (0, f.lO)(null, "", a.url), window.location.replace(r)
            }

            t(U, "locationReplace");
            let q = !0;
            const k = window.location.href, _ = window.history.state;
            _ && _.container && (a = _), "state" in window.history && (q = !1);

            function P(r) {
                if ((0, m.c)("TURBO")) return;
                q || h == null || h.abort();
                const o = a, e = r.state;
                let n = null;
                if (e && e.container) {
                    if (q && k === e.url) return;
                    if (o) {
                        if (o.id === e.id) return;
                        n = o.id < e.id ? "forward" : "back"
                    }
                    const [y, i, L] = B[e.id] || [], g = document.querySelector(y || e.container);
                    if (g instanceof HTMLElement) {
                        o && ie(n, o.id, j(g)), s(g, "pjax:popstate", {state: e, direction: n, cachedAt: L});
                        const S = {
                            id: e.id,
                            url: e.url,
                            container: g,
                            push: !1,
                            fragment: e.fragment || "",
                            scrollTo: !1
                        };
                        i ? (s(g, "pjax:start"), a = e, e.title && (document.title = e.title), s(g, "pjax:beforeReplace", {
                            contents: i,
                            state: e,
                            previousState: o
                        }), R(g, i), (0, c.b)(), (0, c.o)(), s(g, "pjax:end")) : M(S), g.offsetHeight
                    } else (0, E.b)({
                        pjaxFailureReason: "no_container",
                        requestUrl: o == null ? void 0 : o.url
                    }), U(location.href)
                }
                q = !1
            }

            t(P, "onPjaxPopstate");

            function O() {
                return new Date().getTime()
            }

            t(O, "uniqueId");

            function j(r) {
                const o = r.cloneNode(!0);
                return [N(r), Array.from(o.childNodes), Date.now()]
            }

            t(j, "cloneContents");

            function I(r) {
                const o = document.createElement("a");
                return o.href = r, o
            }

            t(I, "parseURL");

            function N(r) {
                if (r.id) return `#${r.id}`;
                throw new Error("pjax container has no id")
            }

            t(N, "getContainerSelector");

            function X(r, o, e) {
                let n = [];
                for (const y of r) y instanceof Element && (y instanceof e && y.matches(o) && n.push(y), n = n.concat(Array.from(y.querySelectorAll(o))));
                return n
            }

            t(X, "findAll");

            function R(r, o) {
                r.innerHTML = "";
                for (const e of o) e != null && r.appendChild(e)
            }

            t(R, "replaceWithNodes");

            function V(r, o) {
                const e = r.headers.get("X-PJAX-URL");
                return e ? I(e).href : o
            }

            t(V, "resolveUrl");

            function Y(r, o, e) {
                const n = {url: V(o, e.requestUrl), title: ""}, y = /<html/i.test(r);
                if ((o.headers.get("Content-Type") || "").split(";", 1)[0].trim() !== "text/html") return n;
                let L, g;
                if (y) {
                    const w = r.match(/<head[^>]*>([\s\S.]*)<\/head>/i), x = r.match(/<body[^>]*>([\s\S.]*)<\/body>/i);
                    L = w ? Array.from((0, p.r)(document, w[0]).childNodes) : [], g = x ? Array.from((0, p.r)(document, x[0]).childNodes) : []
                } else L = g = Array.from((0, p.r)(document, r).childNodes);
                if (g.length === 0) return n;
                const S = X(L, "title", HTMLTitleElement);
                n.title = S.length > 0 && S[S.length - 1].textContent || "";
                let T;
                if (e.fragment) {
                    if (e.fragment === "body") T = g; else {
                        const w = X(g, e.fragment, Element);
                        T = w.length > 0 ? [w[0]] : []
                    }
                    if (T.length && (e.fragment === "body" ? n.contents = T : n.contents = T.flatMap(w => Array.from(w.childNodes)), !n.title)) {
                        const w = T[0];
                        w instanceof Element && (n.title = w.getAttribute("title") || w.getAttribute("data-title") || "")
                    }
                } else y || (n.contents = g);
                if (n.contents) {
                    n.contents = n.contents.filter(function (b) {
                        return b instanceof Element ? !b.matches("title") : !0
                    });
                    for (const b of n.contents) if (b instanceof Element) for (const K of b.querySelectorAll("title")) K.remove();
                    const w = X(n.contents, "script[src]", HTMLScriptElement);
                    for (const b of w) b.remove();
                    n.scripts = w, n.contents = n.contents.filter(b => w.indexOf(b) === -1);
                    const x = X(n.contents, "link[rel=stylesheet]", HTMLLinkElement);
                    for (const b of x) b.remove();
                    n.stylesheets = x, n.contents = n.contents.filter(b => !x.includes(b))
                }
                return n.title && (n.title = n.title.trim()), n
            }

            t(Y, "extractContainer");

            function oe(r) {
                const o = document.querySelectorAll("script[src]");
                for (const e of r) {
                    const {src: n} = e;
                    if (Array.from(o).some(g => g.src === n)) continue;
                    const y = document.createElement("script"), i = e.getAttribute("type");
                    i && (y.type = i);
                    const L = e.getAttribute("integrity");
                    L && (y.integrity = L, y.crossOrigin = "anonymous"), y.src = n, document.head && document.head.appendChild(y)
                }
            }

            t(oe, "executeScriptTags");

            function re(r) {
                const o = document.querySelectorAll("link[rel=stylesheet]");
                for (const e of r) Array.from(o).some(n => n.href === e.href) || document.head && document.head.appendChild(e)
            }

            t(re, "injectStyleTags");
            const B = {}, F = [], J = [];

            function ae(r, o) {
                B[r] = o, J.push(r), W(F, 0), W(J, u)
            }

            t(ae, "cachePush");

            function ie(r, o, e) {
                let n, y;
                B[o] = e, r === "forward" ? (n = J, y = F) : (n = F, y = J), n.push(o);
                const i = y.pop();
                i && delete B[i], W(n, u)
            }

            t(ie, "cachePop");

            function W(r, o) {
                for (; r.length > o;) {
                    const e = r.shift();
                    if (e == null) return;
                    delete B[e]
                }
            }

            t(W, "trimCacheStack");

            function se() {
                for (const r of document.getElementsByTagName("meta")) {
                    const o = r.getAttribute("http-equiv");
                    if (o && o.toUpperCase() === "X-PJAX-VERSION") return r.content
                }
                return null
            }

            t(se, "findVersion");

            function H(r) {
                var o;
                const e = document.querySelector(`meta[http-equiv="${r}"]`);
                return (o = e == null ? void 0 : e.content) != null ? o : null
            }

            t(H, "pjaxMeta");

            function ce() {
                return {
                    pjax: H("X-PJAX-VERSION"),
                    csp: H("X-PJAX-CSP-VERSION"),
                    css: H("X-PJAX-CSS-VERSION"),
                    js: H("X-PJAX-JS-VERSION")
                }
            }

            t(ce, "findAllVersions");

            function le() {
                return a
            }

            t(le, "getState"), window.addEventListener("popstate", P)
        }, 45153: (C, v, d) => {
            d.d(v, {b: () => m, o: () => p});
            var f = d(75488);
            const c = {}, l = {};
            (async () => (await f.x, c[document.location.pathname] = Array.from(document.querySelectorAll("head [data-pjax-transient]")), l[document.location.pathname] = Array.from(document.querySelectorAll("[data-pjax-replace]"))))(), document.addEventListener("pjax:beforeReplace", function (E) {
                const u = E.detail.contents || [], a = E.target;
                for (let h = 0; h < u.length; h++) {
                    const s = u[h];
                    s instanceof Element && (s.id === "pjax-head" ? (c[document.location.pathname] = Array.from(s.children), u[h] = null) : s.hasAttribute("data-pjax-replace") && (l[document.location.pathname] || (l[document.location.pathname] = []), l[document.location.pathname].push(s), a.querySelector(`#${s.id}`) || (u[h] = null)))
                }
            });

            function m() {
                const E = l[document.location.pathname];
                if (!!E) for (const u of E) {
                    const a = document.querySelector(`#${u.id}`);
                    a && a.replaceWith(u)
                }
            }

            t(m, "replaceCachedElements");

            function p() {
                const E = c[document.location.pathname];
                if (!E) return;
                const u = document.head;
                for (const a of document.querySelectorAll("head [data-pjax-transient]")) a.remove();
                for (const a of E) a.matches("title, script, link[rel=stylesheet]") ? a.matches("link[rel=stylesheet]") && u.append(a) : (a.setAttribute("data-pjax-transient", ""), u.append(a))
            }

            t(p, "replaceTransientTags")
        }, 75488: (C, v, d) => {
            d.d(v, {C: () => c, x: () => f});
            const f = function () {
                return document.readyState === "interactive" || document.readyState === "complete" ? Promise.resolve() : new Promise(l => {
                    document.addEventListener("DOMContentLoaded", () => {
                        l()
                    })
                })
            }(), c = function () {
                return document.readyState === "complete" ? Promise.resolve() : new Promise(l => {
                    window.addEventListener("load", l)
                })
            }()
        }, 46633: (C, v, d) => {
            d.d(v, {$: () => E, c: () => m});
            var f = d(15205);
            const c = (0, f.Z)(l);

            function l() {
                var u, a;
                return (((a = (u = document.head) == null ? void 0 : u.querySelector('meta[name="enabled-features"]')) == null ? void 0 : a.content) || "").split(",")
            }

            t(l, "enabledFeatures");
            const m = (0, f.Z)(p);

            function p(u) {
                return c().indexOf(u) !== -1
            }

            t(p, "isEnabled");
            const E = {isFeatureEnabled: m}
        }, 51847: (C, v, d) => {
            d.d(v, {$z: () => l, Kt: () => f, Q: () => c});

            function f(m, p = location.hash) {
                return c(m, l(p))
            }

            t(f, "findFragmentTarget");

            function c(m, p) {
                return p === "" ? null : m.getElementById(p) || m.getElementsByName(p)[0]
            }

            t(c, "findElementByFragmentName");

            function l(m) {
                try {
                    return decodeURIComponent(m.slice(1))
                } catch {
                    return ""
                }
            }

            t(l, "decodeFragmentValue")
        }, 98016: (C, v, d) => {
            d.d(v, {Mw: () => q, _C: () => U, lO: () => M, qA: () => s, y0: () => m});
            const f = [];
            let c = 0, l;

            function m() {
                return l
            }

            t(m, "getState");

            function p() {
                try {
                    return Math.min(Math.max(0, history.length) || 0, 9007199254740991)
                } catch {
                    return 0
                }
            }

            t(p, "safeGetHistory");

            function E() {
                const _ = {_id: new Date().getTime(), ...history.state};
                return a(_), _
            }

            t(E, "initializeState");

            function u() {
                return p() - 1 + c
            }

            t(u, "position");

            function a(_) {
                l = _;
                const P = location.href;
                f[u()] = {
                    url: P,
                    state: l
                }, f.length = p(), window.dispatchEvent(new CustomEvent("statechange", {bubbles: !1, cancelable: !1}))
            }

            t(a, "setState");

            function h() {
                return new Date().getTime()
            }

            t(h, "uniqueId");

            function s(_, P, O) {
                c = 0;
                const j = {_id: h(), ..._};
                history.pushState(j, P, O), a(j)
            }

            t(s, "pushState");

            function M(_, P, O) {
                const j = {...m(), ..._};
                history.replaceState(j, P, O), a(j)
            }

            t(M, "replaceState");

            function U() {
                const _ = f[u() - 1];
                if (_) return _.url
            }

            t(U, "getBackURL");

            function q() {
                const _ = f[u() + 1];
                if (_) return _.url
            }

            t(q, "getForwardURL"), l = E(), window.addEventListener("popstate", t(function (P) {
                var O, j, I, N, X;
                const R = P.state;
                if (!(!R || !R._id && !((O = R.turbo) == null ? void 0 : O.restorationIdentifier))) {
                    if ((j = R.turbo) == null ? void 0 : j.restorationIdentifier) {
                        const V = R.turbo.restorationIdentifier;
                        ((X = (N = (I = f[u() - 1]) == null ? void 0 : I.state) == null ? void 0 : N.turbo) == null ? void 0 : X.restorationIdentifier) === V ? c-- : c++
                    } else R._id < (m()._id || NaN) ? c-- : c++;
                    a(R)
                }
            }, "onPopstate"), !0);
            let k;
            window.addEventListener("turbo:visit", _ => {
                _ instanceof CustomEvent && (k = _.detail.action)
            }), window.addEventListener("turbo:load", () => {
                k !== "restore" && (c = 0, M(history.state, "", ""))
            }), window.addEventListener("hashchange", t(function () {
                if (p() > f.length) {
                    const P = {_id: h()};
                    history.replaceState(P, "", location.href), a(P)
                }
            }, "onHashchange"), !0)
        }, 5638: (C, v, d) => {
            d.d(v, {r: () => f});

            function f(c, l) {
                const m = c.createElement("template");
                return m.innerHTML = l, c.importNode(m.content, !0)
            }

            t(f, "parseHTML")
        }, 70290: (C, v, d) => {
            d.d(v, {Z: () => f});

            function f(c) {
                var l, m;
                const p = (m = (l = c.head) == null ? void 0 : l.querySelector('meta[name="expected-hostname"]')) == null ? void 0 : m.content;
                if (!p) return !1;
                const E = p.replace(/\.$/, "").split(".").slice(-2).join("."),
                    u = c.location.hostname.replace(/\.$/, "").split(".").slice(-2).join(".");
                return E !== u
            }

            t(f, "detectProxySite")
        }, 77552: (C, v, d) => {
            d.d(v, {b: () => m});
            var f = d(70290), c = d(75488);
            let l = [];

            function m(h, s = !1) {
                h.timestamp === void 0 && (h.timestamp = new Date().getTime()), h.loggedIn = a(), l.push(h), s ? u() : E()
            }

            t(m, "sendStats");
            let p = null;

            async function E() {
                await c.C, p == null && (p = window.requestIdleCallback(u))
            }

            t(E, "scheduleSendStats");

            function u() {
                var h, s;
                if (p = null, !l.length || (0, f.Z)(document)) return;
                const M = (s = (h = document.head) == null ? void 0 : h.querySelector('meta[name="browser-stats-url"]')) == null ? void 0 : s.content;
                if (!M) return;
                const U = JSON.stringify({stats: l});
                try {
                    navigator.sendBeacon && navigator.sendBeacon(M, U)
                } catch {
                }
                l = []
            }

            t(u, "flushStats");

            function a() {
                var h, s;
                return !!((s = (h = document.head) == null ? void 0 : h.querySelector('meta[name="user-login"]')) == null ? void 0 : s.content)
            }

            t(a, "isLoggedIn"), document.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u)
        }
    }]);
})();

//# sourceMappingURL=app_assets_modules_github_behaviors_pjax_ts-e9a3e2f9585d.js.map