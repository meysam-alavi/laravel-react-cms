"use strict";
(() => {
    var Y = Object.defineProperty;
    var o = (C, b) => Y(C, "name", {value: b, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["gist"], {
        29116: (C, b, f) => {
            var w = f(34669), E = f(65461), g = f(60798), m = f(10174), h = f(68499), k = f(64463), c = f(59753),
                r = f(43721);

            function n(l) {
                const u = l.querySelector(".js-gist-files"),
                    y = document.getElementById("js-gist-file-template").content.cloneNode(!0);
                u.appendChild(y);
                const j = u.lastElementChild;
                for (const H of j.querySelectorAll("[id]")) H.id !== "blob-dragged-file-input" && H.removeAttribute("id");
                const A = j.querySelector(".js-code-textarea");
                return A !== null && A.setAttribute("id", `blob_contents_${Date.now()}`), j
            }

            o(n, "createEmptyFile");

            function i(l) {
                for (const u of l.querySelectorAll(".js-gist-file")) {
                    const v = u.querySelector(".js-gist-filename"), y = u.querySelector(".js-blob-contents");
                    if (!v.value && !y.value) return u
                }
                return n(l)
            }

            o(i, "withEmptyFile");

            function d(l) {
                return (0, h.g)(l.closest(".js-code-editor"))
            }

            o(d, "withEditor");

            async function L(l) {
                const u = l.getAttribute("data-language-detection-url");
                if (!u) return;
                const v = new URL(u, window.location.origin), y = new URLSearchParams(v.search.slice(1));
                y.append("filename", l.value), v.search = y.toString();
                const j = await fetch(v.toString(), {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json"
                    }
                });
                if (!j.ok) {
                    const q = new Error, W = j.statusText ? ` ${j.statusText}` : "";
                    throw q.message = `HTTP ${j.status}${W}`, q
                }
                const A = await j.json();
                (await d(l)).setMode(A.language)
            }

            o(L, "onFilenameChange"), (0, r.ZG)(".js-gist-filename", async l => {
                const u = l, v = l.closest(".js-code-editor");
                await d(v), (0, m.oq)(u, L), l.addEventListener("blur", () => (0, m.iU)(u, L), {once: !0})
            }), (0, c.on)("click", ".js-add-gist-file", function (l) {
                l.preventDefault();
                const u = l.currentTarget.closest(".js-blob-form");
                n(u).scrollIntoView()
            }), (0, c.on)("gist:filedrop", ".js-blob-form", async function (l) {
                const {file: u, data: v} = l.detail, y = i(l.currentTarget), j = y.querySelector(".js-gist-filename");
                j.value = u.name, L(j), (await d(j)).setCode(v), y.scrollIntoView()
            }), (0, c.on)("click", ".js-remove-gist-file", function (l) {
                l.preventDefault();
                const u = l.currentTarget.closest(".js-gist-file");
                for (const y of u.querySelectorAll(".js-gist-deleted input")) y.disabled = !1;
                let v = u.querySelector(".js-code-editor");
                v || (v = u.querySelector(".js-file")), v.remove()
            });

            function S(l) {
                const u = l.querySelectorAll(".js-remove-gist-file");
                for (const v of u) v.classList.toggle("d-none", u.length < 2)
            }

            o(S, "updateRemoveButtonVisibility"), (0, k.N7)(".js-remove-gist-file", function (l) {
                const u = l.closest(".js-gist-files");
                return {
                    add() {
                        S(u)
                    }, remove() {
                        S(u)
                    }
                }
            });
            var D = f(93875), V = f(57654);
            (0, r.ZG)(".js-quicksearch-field", _), (0, r.q6)(".js-quicksearch-field", K), (0, c.on)("navigation:keydown", ".js-quicksearch-results", O), (0, c.on)("submit", ".js-quicksearch-form", I), (0, c.on)("focusout:delay", ".js-quicksearch-field", function (l) {
                const v = l.currentTarget.closest("form").querySelector(".js-quicksearch-results");
                v && (v.classList.remove("active"), (0, D.Sw)(v))
            });

            function _(l) {
                (0, D.VF)(l.form.querySelector(".js-quicksearch-results"))
            }

            o(_, "bindQuickSearchEvents");

            function I(l) {
                const u = l.currentTarget.querySelector(".js-quicksearch-results");
                u && (u.classList.remove("active"), (0, D.Sw)(u))
            }

            o(I, "teardown");

            function O(l) {
                const u = l, v = u.target, y = v.closest("form");
                if (u.detail.hotkey === "Escape") {
                    const j = y.querySelector(".js-quicksearch-results");
                    j.classList.remove("active"), (0, D.ZH)(j)
                } else u.detail.hotkey === "Enter" && !v.classList.contains("js-navigation-item") && ((0, V.Bt)(y), u.preventDefault())
            }

            o(O, "onNavigationKeyDown");
            let P = null;

            async function K(l) {
                const u = l.target, v = u.value.replace(/^\s+|\s+$/g, ""), y = u.closest("form"),
                    j = y.querySelector(".js-quicksearch-results"), A = j.getAttribute("data-quicksearch-url");
                let H = "";
                P == null || P.abort();
                const {signal: q} = P = new AbortController;
                if (v.length) {
                    const W = new URL(A, window.location.origin), Z = new URLSearchParams(W.search.slice(1));
                    Z.append("q", v), W.search = Z.toString(), y.classList.add("is-sending");
                    try {
                        const M = await fetch(W.toString(), {signal: q});
                        M.ok && (H = await M.text())
                    } catch {
                    }
                }
                q.aborted || (H && (j.innerHTML = H), j.classList.toggle("active", v !== ""), y.classList.remove("is-sending"))
            }

            o(K, "fetchResults");
            var R = f(65935);
            (0, R.AC)(".js-gist-file-update-container .js-comment-update", async function (l, u) {
                let v;
                try {
                    v = await u.json()
                } catch {
                    return
                }
                if (l.action = v.json.url, v.json.authenticity_token) {
                    const y = l.querySelector("input[name=authenticity_token]");
                    y.value = v.json.authenticity_token
                }
            }), (0, k.N7)(".js-gist-comment-permalink", function (l) {
                const u = l.getAttribute("data-href");
                l.textContent = `${window.location.origin}${u}`
            }), (0, k.N7)(".js-gist-dropzone", () => {
                f.e("app_assets_modules_github_gist_drag-drop_ts").then(f.bind(f, 4946))
            })
        }, 46073: (C, b, f) => {
            f.d(b, {Ty: () => E, YE: () => g, Zf: () => m});
            var w = f(11793);
            const E = o(() => {
                    const h = document.querySelector("meta[name=keyboard-shortcuts-preference]");
                    return h ? h.content === "all" : !0
                }, "areCharacterKeyShortcutsEnabled"),
                g = o(h => /Enter|Arrow|Escape|Meta|Control|Esc/.test(h) || h.includes("Alt") && h.includes("Shift"), "isNonCharacterKeyShortcut"),
                m = o(h => {
                    const k = (0, w.EL)(h);
                    return E() ? !0 : g(k)
                }, "isShortcutAllowed")
        }, 68499: (C, b, f) => {
            f.d(b, {P: () => g, g: () => m});
            var w = f(59753);
            const E = new WeakMap;

            function g(c) {
                return E.get(c)
            }

            o(g, "getCodeEditor");

            async function m(c) {
                return E.get(c) || h(await k(c, "codeEditor:ready"))
            }

            o(m, "getAsyncCodeEditor");

            function h(c) {
                if (!(c instanceof CustomEvent)) throw new Error("assert: event is not a CustomEvent");
                const r = c.detail.editor;
                if (!c.target) throw new Error("assert: event.target is null");
                return E.set(c.target, r), r
            }

            o(h, "onEditorFromEvent"), (0, w.on)("codeEditor:ready", ".js-code-editor", h);

            function k(c, r) {
                return new Promise(n => {
                    c.addEventListener(r, n, {once: !0})
                })
            }

            o(k, "nextEvent")
        }, 36997: (C, b, f) => {
            f.d(b, {VZ: () => E, _C: () => g, cv: () => w, oE: () => m});

            function w(c) {
                const r = c.getBoundingClientRect();
                return {top: r.top + window.pageYOffset, left: r.left + window.pageXOffset}
            }

            o(w, "offset");

            function E(c) {
                let r = c;
                const n = r.ownerDocument;
                if (!n || !r.offsetParent) return;
                const i = n.defaultView.HTMLElement;
                if (r !== n.body) {
                    for (; r !== n.body;) {
                        if (r.parentElement instanceof i) r = r.parentElement; else return;
                        const {position: d, overflowY: L, overflowX: S} = getComputedStyle(r);
                        if (d === "fixed" || L === "auto" || S === "auto" || L === "scroll" || S === "scroll") break
                    }
                    return r instanceof Document ? null : r
                }
            }

            o(E, "overflowParent");

            function g(c, r) {
                let n = r;
                const i = c.ownerDocument;
                if (!i) return;
                const d = i.documentElement;
                if (!d || c === d) return;
                const L = m(c, n);
                if (!L) return;
                n = L._container;
                const S = n === i.documentElement && i.defaultView ? {
                        top: i.defaultView.pageYOffset,
                        left: i.defaultView.pageXOffset
                    } : {top: n.scrollTop, left: n.scrollLeft}, D = L.top - S.top, V = L.left - S.left, _ = n.clientHeight,
                    I = n.clientWidth, O = _ - (D + c.offsetHeight), P = I - (V + c.offsetWidth);
                return {top: D, left: V, bottom: O, right: P, height: _, width: I}
            }

            o(g, "overflowOffset");

            function m(c, r) {
                let n = c;
                const i = n.ownerDocument;
                if (!i) return;
                const d = i.documentElement;
                if (!d) return;
                const L = i.defaultView.HTMLElement;
                let S = 0, D = 0;
                const V = n.offsetHeight, _ = n.offsetWidth;
                for (; !(n === i.body || n === r);) if (S += n.offsetTop || 0, D += n.offsetLeft || 0, n.offsetParent instanceof L) n = n.offsetParent; else return;
                let I, O, P;
                if (!r || r === i || r === i.defaultView || r === i.documentElement || r === i.body) P = d, I = h(i.body, d), O = k(i.body, d); else if (r instanceof L) P = r, I = r.scrollHeight, O = r.scrollWidth; else return;
                const K = I - (S + V), R = O - (D + _);
                return {top: S, left: D, bottom: K, right: R, _container: P}
            }

            o(m, "positionedOffset");

            function h(c, r) {
                return Math.max(c.scrollHeight, r.scrollHeight, c.offsetHeight, r.offsetHeight, r.clientHeight)
            }

            o(h, "getDocumentHeight");

            function k(c, r) {
                return Math.max(c.scrollWidth, r.scrollWidth, c.offsetWidth, r.offsetWidth, r.clientWidth)
            }

            o(k, "getDocumentWidth")
        }, 75488: (C, b, f) => {
            f.d(b, {C: () => E, x: () => w});
            const w = function () {
                return document.readyState === "interactive" || document.readyState === "complete" ? Promise.resolve() : new Promise(g => {
                    document.addEventListener("DOMContentLoaded", () => {
                        g()
                    })
                })
            }(), E = function () {
                return document.readyState === "complete" ? Promise.resolve() : new Promise(g => {
                    window.addEventListener("load", g)
                })
            }()
        }, 51847: (C, b, f) => {
            f.d(b, {$z: () => g, Kt: () => w, Q: () => E});

            function w(m, h = location.hash) {
                return E(m, g(h))
            }

            o(w, "findFragmentTarget");

            function E(m, h) {
                return h === "" ? null : m.getElementById(h) || m.getElementsByName(h)[0]
            }

            o(E, "findElementByFragmentName");

            function g(m) {
                try {
                    return decodeURIComponent(m.slice(1))
                } catch {
                    return ""
                }
            }

            o(g, "decodeFragmentValue")
        }, 93875: (C, b, f) => {
            f.d(b, {QZ: () => P, ZH: () => y, jK: () => K, T_: () => v, Sw: () => u, VF: () => l, VH: () => j});
            var w = f(16246), E = f(59753), g = f(36997), m = f(11793), h = f(46073), k = f(64463);

            function c(e, t) {
                let a = e;
                const s = e.ownerDocument;
                (a === s || a === s.defaultView || a === s.documentElement || a === s.body) && (a = s);
                const p = s.defaultView.Document;
                if (a instanceof p) {
                    const x = t.top != null ? t.top : s.defaultView.pageYOffset,
                        N = t.left != null ? t.left : s.defaultView.pageXOffset;
                    s.defaultView.scrollTo(N, x);
                    return
                }
                const T = s.defaultView.HTMLElement;
                if (!(a instanceof T)) throw new Error("invariant");
                a.scrollTop = t.top, t.left != null && (a.scrollLeft = t.left)
            }

            o(c, "scrollTo");
            var r = f(75343);
            const n = navigator.userAgent.match(/Macintosh/), i = n ? "metaKey" : "ctrlKey", d = n ? "Meta" : "Control";
            let L = !1, S = {x: 0, y: 0};
            (0, k.N7)(".js-navigation-container:not(.js-navigation-container-no-mouse)", {subscribe: e => (0, w.qC)((0, w.RB)(e, "mouseover", D), (0, w.RB)(e, "mouseover", V))});

            function D(e) {
                e instanceof MouseEvent && ((S.x !== e.clientX || S.y !== e.clientY) && (L = !1), S = {
                    x: e.clientX,
                    y: e.clientY
                })
            }

            o(D, "onContainerMouseMove");

            function V(e) {
                if (L) return;
                const t = e.currentTarget, {target: a} = e;
                if (!(a instanceof Element) || !(t instanceof HTMLElement) || !t.closest(".js-active-navigation-container")) return;
                const s = a.closest(".js-navigation-item");
                s && M(s, t)
            }

            o(V, "onContainerMouseOver");
            let _ = 0;
            (0, k.N7)(".js-active-navigation-container", {
                add() {
                    _++, _ === 1 && document.addEventListener("keydown", I)
                }, remove() {
                    _--, _ === 0 && document.removeEventListener("keydown", I)
                }
            });

            function I(e) {
                if (e.target !== document.body && e.target instanceof HTMLElement && !e.target.classList.contains("js-navigation-enable")) return;
                L = !0;
                const t = $();
                let a = !1;
                if (t) {
                    const s = t.querySelector(".js-navigation-item.navigation-focus") || t;
                    a = (0, E.f)(s, "navigation:keydown", {
                        hotkey: (0, m.EL)(e),
                        originalEvent: e,
                        originalTarget: e.target
                    })
                }
                a || e.preventDefault()
            }

            o(I, "fireCustomKeydown"), (0, E.on)("navigation:keydown", ".js-active-navigation-container", function (e) {
                const t = e.currentTarget, a = e.detail.originalTarget.matches("input, textarea"), s = e.target;
                if (!!(0, h.Zf)(e.detail.originalEvent)) {
                    if (s.classList.contains("js-navigation-item")) if (a) {
                        if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"Control+n":
                                H(s, t);
                                break;
                            case"Control+p":
                                A(s, t)
                        }
                        switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"ArrowUp":
                                A(s, t);
                                break;
                            case"ArrowDown":
                                H(s, t);
                                break;
                            case"Enter":
                            case`${d}+Enter`:
                                Z(s, e.detail.originalEvent[i]);
                                break
                        }
                    } else {
                        if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"Control+n":
                                H(s, t);
                                break;
                            case"Control+p":
                                A(s, t);
                                break;
                            case"Alt+v":
                                q(s, t);
                                break;
                            case"Control+v":
                                W(s, t)
                        }
                        switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"j":
                            case"J":
                                H(s, t);
                                break;
                            case"k":
                            case"K":
                                A(s, t);
                                break;
                            case"o":
                            case"Enter":
                            case`${d}+Enter`:
                                Z(s, e.detail[i]);
                                break
                        }
                    } else {
                        const p = U(t)[0];
                        if (p) if (a) {
                            if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                                case"Control+n":
                                    M(p, t)
                            }
                            switch ((0, m.EL)(e.detail.originalEvent)) {
                                case"ArrowDown":
                                    M(p, t)
                            }
                        } else {
                            if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                                case"Control+n":
                                case"Control+v":
                                    M(p, t)
                            }
                            switch ((0, m.EL)(e.detail.originalEvent)) {
                                case"j":
                                    M(p, t)
                            }
                        }
                    }
                    if (a) {
                        if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"Control+n":
                            case"Control+p":
                                e.preventDefault()
                        }
                        switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"ArrowUp":
                            case"ArrowDown":
                                e.preventDefault();
                                break;
                            case"Enter":
                                e.preventDefault()
                        }
                    } else {
                        if (n) switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"Control+n":
                            case"Control+p":
                            case"Control+v":
                            case"Alt+v":
                                e.preventDefault()
                        }
                        switch ((0, m.EL)(e.detail.originalEvent)) {
                            case"j":
                            case"k":
                            case"o":
                                e.preventDefault();
                                break;
                            case"Enter":
                            case`${i}+Enter`:
                                e.preventDefault()
                        }
                    }
                }
            });

            function O(e) {
                const t = e.modifierKey || e.altKey || e.ctrlKey || e.metaKey;
                (0, E.f)(e.currentTarget, "navigation:open", {
                    modifierKey: t,
                    shiftKey: e.shiftKey
                }) || e.preventDefault()
            }

            o(O, "fireOpen"), (0, E.on)("click", ".js-active-navigation-container .js-navigation-item", function (e) {
                O(e)
            }), (0, E.on)("navigation:keyopen", ".js-active-navigation-container .js-navigation-item", function (e) {
                const t = e.currentTarget.classList.contains("js-navigation-open") ? e.currentTarget : e.currentTarget.querySelector(".js-navigation-open");
                t instanceof HTMLAnchorElement ? (e.detail.modifierKey ? (window.open(t.href, "_blank"), window.focus()) : t.dispatchEvent(new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0
                })) && t.click(), e.preventDefault()) : O(e)
            });

            function P(e) {
                const t = $();
                e !== t && (t !== null && K(t), e == null || e.classList.add("js-active-navigation-container"))
            }

            o(P, "activate");

            function K(e) {
                e.classList.remove("js-active-navigation-container")
            }

            o(K, "deactivate");
            const R = [];

            function l(e) {
                const t = $();
                t && R.push(t), P(e)
            }

            o(l, "push");

            function u(e) {
                K(e), y(e);
                const t = R.pop();
                t && P(t)
            }

            o(u, "pop");

            function v(e, t) {
                const a = t || e, s = U(e)[0], p = a.closest(".js-navigation-item") || s;
                if (P(e), p instanceof HTMLElement) {
                    if (M(p, e)) return;
                    const x = (0, g.VZ)(p);
                    F(x, p)
                }
            }

            o(v, "navigation_focus");

            function y(e) {
                const t = e.querySelectorAll(".js-navigation-item.navigation-focus");
                for (const a of t) a.classList.remove("navigation-focus")
            }

            o(y, "clear");

            function j(e, t) {
                y(e), v(e, t)
            }

            o(j, "refocus");

            function A(e, t) {
                const a = U(t), s = a.indexOf(e), p = a[s - 1];
                if (p) {
                    if (M(p, t)) return;
                    const x = (0, g.VZ)(p);
                    X(t) === "page" ? B(x, p) : F(x, p)
                }
            }

            o(A, "cursorUp");

            function H(e, t) {
                const a = U(t), s = a.indexOf(e), p = a[s + 1];
                if (p) {
                    if (M(p, t)) return;
                    const x = (0, g.VZ)(p);
                    X(t) === "page" ? B(x, p) : F(x, p)
                }
            }

            o(H, "cursorDown");

            function q(e, t) {
                const a = U(t);
                let s = a.indexOf(e);
                const p = (0, g.VZ)(e);
                if (p == null) return;
                let T, x;
                for (; (T = a[s - 1]) && (x = (0, g._C)(T, p)) && x.top >= 0;) s--;
                if (T) {
                    if (M(T, t)) return;
                    B(p, T)
                }
            }

            o(q, "pageUp");

            function W(e, t) {
                const a = U(t);
                let s = a.indexOf(e);
                const p = (0, g.VZ)(e);
                if (p == null) return;
                let T, x;
                for (; (T = a[s + 1]) && (x = (0, g._C)(T, p)) && x.bottom >= 0;) s++;
                if (T) {
                    if (M(T, t)) return;
                    B(p, T)
                }
            }

            o(W, "pageDown");

            function Z(e, t = !1) {
                (0, E.f)(e, "navigation:keyopen", {modifierKey: t})
            }

            o(Z, "keyOpen");

            function M(e, t) {
                return (0, E.f)(e, "navigation:focus") ? (y(t), e.classList.add("navigation-focus"), !1) : !0
            }

            o(M, "focusItem");

            function $() {
                return document.querySelector(".js-active-navigation-container")
            }

            o($, "getActiveContainer");

            function U(e) {
                const t = [];
                for (const a of e.querySelectorAll(".js-navigation-item")) a instanceof HTMLElement && (0, r.Z)(a) && t.push(a);
                return t
            }

            o(U, "getItems");

            function X(e) {
                return e.getAttribute("data-navigation-scroll") || "item"
            }

            o(X, "getScrollStyle");

            function B(e, t, a = "smooth") {
                const s = (0, g._C)(t, e);
                !s || (s.bottom <= 0 ? t.scrollIntoView({
                    behavior: a,
                    block: "start"
                }) : s.top <= 0 && t.scrollIntoView({behavior: a, block: "end"}))
            }

            o(B, "scrollPageTo");

            function F(e, t) {
                const a = (0, g.oE)(t, e), s = (0, g._C)(t, e);
                if (!(a == null || s == null)) if (s.bottom <= 0 && document.body) {
                    const T = (e.offsetParent != null ? e.scrollHeight : document.body.scrollHeight) - (a.bottom + s.height);
                    c(e, {top: T})
                } else s.top <= 0 && c(e, {top: a.top})
            }

            o(F, "scrollItemTo")
        }, 70290: (C, b, f) => {
            f.d(b, {Z: () => w});

            function w(E) {
                var g, m;
                const h = (m = (g = E.head) == null ? void 0 : g.querySelector('meta[name="expected-hostname"]')) == null ? void 0 : m.content;
                if (!h) return !1;
                const k = h.replace(/\.$/, "").split(".").slice(-2).join("."),
                    c = E.location.hostname.replace(/\.$/, "").split(".").slice(-2).join(".");
                return k !== c
            }

            o(w, "detectProxySite")
        }, 77552: (C, b, f) => {
            f.d(b, {b: () => m});
            var w = f(70290), E = f(75488);
            let g = [];

            function m(n, i = !1) {
                n.timestamp === void 0 && (n.timestamp = new Date().getTime()), n.loggedIn = r(), g.push(n), i ? c() : k()
            }

            o(m, "sendStats");
            let h = null;

            async function k() {
                await E.C, h == null && (h = window.requestIdleCallback(c))
            }

            o(k, "scheduleSendStats");

            function c() {
                var n, i;
                if (h = null, !g.length || (0, w.Z)(document)) return;
                const d = (i = (n = document.head) == null ? void 0 : n.querySelector('meta[name="browser-stats-url"]')) == null ? void 0 : i.content;
                if (!d) return;
                const L = JSON.stringify({stats: g});
                try {
                    navigator.sendBeacon && navigator.sendBeacon(d, L)
                } catch {
                }
                g = []
            }

            o(c, "flushStats");

            function r() {
                var n, i;
                return !!((i = (n = document.head) == null ? void 0 : n.querySelector('meta[name="user-login"]')) == null ? void 0 : i.content)
            }

            o(r, "isLoggedIn"), document.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c)
        }, 10174: (C, b, f) => {
            f.d(b, {dY: () => r, iU: () => c, oq: () => k});
            const w = new WeakMap;

            function E(n) {
                const i = w.get(n);
                !i || (i.timer != null && clearTimeout(i.timer), i.timer = window.setTimeout(() => {
                    i.timer != null && (i.timer = null), i.inputed = !1, i.listener.call(null, n)
                }, i.wait))
            }

            o(E, "schedule");

            function g(n) {
                const i = n.currentTarget, d = w.get(i);
                !d || (d.keypressed = !0, d.timer != null && clearTimeout(d.timer))
            }

            o(g, "onKeydownInput");

            function m(n) {
                const i = n.currentTarget, d = w.get(i);
                !d || (d.keypressed = !1, d.inputed && E(i))
            }

            o(m, "onKeyupInput");

            function h(n) {
                const i = n.currentTarget, d = w.get(i);
                !d || (d.inputed = !0, d.keypressed || E(i))
            }

            o(h, "onInputInput");

            function k(n, i, d = {wait: null}) {
                w.set(n, {
                    keypressed: !1,
                    inputed: !1,
                    timer: void 0,
                    listener: i,
                    wait: d.wait != null ? d.wait : 100
                }), n.addEventListener("keydown", g), n.addEventListener("keyup", m), n.addEventListener("input", h)
            }

            o(k, "addThrottledInputEventListener");

            function c(n, i) {
                n.removeEventListener("keydown", g), n.removeEventListener("keyup", m), n.removeEventListener("input", h);
                const d = w.get(n);
                d && (d.timer != null && d.listener === i && clearTimeout(d.timer), w.delete(n))
            }

            o(c, "removeThrottledInputEventListener");

            function r(n) {
                const i = w.get(n);
                i && i.listener.call(null, n)
            }

            o(r, "dispatchThrottledInputEvent")
        }
    }, C => {
        var b = o(w => C(C.s = w), "__webpack_exec__");
        C.O(0, ["vendors-node_modules_selector-observer_dist_index_esm_js", "vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_github_remo-9d7385", "app_assets_modules_github_diffs_blob-lines_ts-app_assets_modules_github_diffs_linkable-line-n-f314c3"], () => b(29116));
        var f = C.O()
    }]);
})();

//# sourceMappingURL=gist-b507988a87ae.js.map