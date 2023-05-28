"use strict";
(() => {
    var J = Object.defineProperty;
    var i = (M, C) => J(M, "name", {value: C, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["app_assets_modules_github_diffs_blob-lines_ts-app_assets_modules_github_diffs_linkable-line-n-f314c3"], {
        63621: (M, C, f) => {
            f.d(C, {H: () => u, v: () => h});
            var b = f(59753);

            function h() {
                const m = document.getElementById("ajax-error-message");
                m && (m.hidden = !1)
            }

            i(h, "showGlobalError");

            function u() {
                const m = document.getElementById("ajax-error-message");
                m && (m.hidden = !0)
            }

            i(u, "hideGlobalError"), (0, b.on)("deprecatedAjaxError", "[data-remote]", function (m) {
                const g = m.detail, {error: E, text: j} = g;
                m.currentTarget === m.target && (E === "abort" || E === "canceled" || (/<html/.test(j) ? (h(), m.stopImmediatePropagation()) : setTimeout(function () {
                    m.defaultPrevented || h()
                }, 0)))
            }), (0, b.on)("deprecatedAjaxSend", "[data-remote]", function () {
                u()
            }), (0, b.on)("click", ".js-ajax-error-dismiss", function () {
                u()
            })
        }, 47458: (M, C, f) => {
            f.d(C, {Z: () => m});
            var b = f(75488);
            const h = [];
            let u = 0;

            function m(c) {
                (async function () {
                    h.push(c), await b.x, g()
                })()
            }

            i(m, "hashChange"), m.clear = () => {
                h.length = u = 0
            };

            function g() {
                const c = u;
                u = h.length, E(h.slice(c), null, window.location.href)
            }

            i(g, "runRemainingHandlers");

            function E(c, p, A) {
                const l = window.location.hash.slice(1), s = l ? document.getElementById(l) : null,
                    a = {oldURL: p, newURL: A, target: s};
                for (const v of c) v.call(null, a)
            }

            i(E, "runHandlers");
            let j = window.location.href;
            window.addEventListener("popstate", function () {
                j = window.location.href
            }), window.addEventListener("hashchange", function (c) {
                const p = window.location.href;
                try {
                    E(h, c.oldURL || j, p)
                } finally {
                    j = p
                }
            });
            let T = null;
            document.addEventListener("pjax:start", function () {
                T = window.location.href
            }), document.addEventListener("pjax:end", function () {
                E(h, T, window.location.href)
            })
        }, 6760: (M, C, f) => {
            f.d(C, {Dw: () => g, G5: () => b, M9: () => j, n6: () => m});

            function b(l) {
                const s = l.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);
                if (s) if (s.length === 1) {
                    const a = E(s[0]);
                    return a ? Object.freeze({start: a, end: a}) : void 0
                } else if (s.length === 2) {
                    const a = E(s[0]), v = E(s[1]);
                    return !a || !v ? void 0 : p(Object.freeze({start: a, end: v}))
                } else else
            }

            i(b, "parseBlobRange");

            function h(l) {
                const {start: s, end: a} = p(l);
                return s.column != null && a.column != null ? `L${s.line}C${s.column}-L${a.line}C${a.column}` : s.line === a.line ? `L${s.line}` : `L${s.line}-L${a.line}`
            }

            i(h, "formatBlobRange");

            function u(l) {
                const s = l.match(/(file-.+?-)L\d+?/i);
                return s ? s[1] : ""
            }

            i(u, "parseAnchorPrefix");

            function m(l) {
                const s = b(l), a = u(l);
                return {blobRange: s, anchorPrefix: a}
            }

            i(m, "parseFileAnchor");

            function g({anchorPrefix: l, blobRange: s}) {
                return s ? `#${l}${h(s)}` : "#"
            }

            i(g, "formatBlobRangeAnchor");

            function E(l) {
                const s = l.match(/L(\d+)/), a = l.match(/C(\d+)/);
                return s ? Object.freeze({line: parseInt(s[1]), column: a ? parseInt(a[1]) : null}) : null
            }

            i(E, "parseBlobOffset");

            function j(l, s) {
                const [a, v] = T(l.start, !0, s), [S, x] = T(l.end, !1, s);
                if (!a || !S) return;
                let D = v, k = x;
                if (D === -1 && (D = 0), k === -1 && (k = S.childNodes.length), !a.ownerDocument) throw new Error("DOMRange needs to be inside document");
                const P = a.ownerDocument.createRange();
                return P.setStart(a, D), P.setEnd(S, k), P
            }

            i(j, "DOMRangeFromBlob");

            function T(l, s, a) {
                const v = [null, 0], S = a(l.line);
                if (!S) return v;
                if (l.column == null) return [S, -1];
                let x = l.column - 1;
                const D = c(S);
                for (let k = 0; k < D.length; k++) {
                    const P = D[k], B = x - (P.textContent || "").length;
                    if (B === 0) {
                        const N = D[k + 1];
                        return s && N ? [N, 0] : [P, x]
                    } else if (B < 0) return [P, x];
                    x = B
                }
                return v
            }

            i(T, "findRangeOffset");

            function c(l) {
                if (l.nodeType === Node.TEXT_NODE) return [l];
                if (!l.childNodes || !l.childNodes.length) return [];
                let s = [];
                for (const a of l.childNodes) s = s.concat(c(a));
                return s
            }

            i(c, "getAllTextNodes");

            function p(l) {
                const s = [l.start, l.end];
                return s.sort(A), s[0] === l.start && s[1] === l.end ? l : Object.freeze({start: s[0], end: s[1]})
            }

            i(p, "ascendingBlobRange");

            function A(l, s) {
                return l.line === s.line && l.column === s.column ? 0 : l.line === s.line && typeof l.column == "number" && typeof s.column == "number" ? l.column - s.column : l.line - s.line
            }

            i(A, "compareBlobOffsets")
        }, 34669: (M, C, f) => {
            var b = f(6760), h = f(76745), u = f(69567), m = f(47458), g = f(64463), E = f(59753), j = f(54412),
                T = f(66703);
            let c = !1;

            function p(o, e) {
                return document.querySelector(`#${o}LC${e}`)
            }

            i(p, "queryLineElement");

            function A({blobRange: o, anchorPrefix: e}) {
                if (document.querySelectorAll(".js-file-line").length !== 0 && (l(), !!o)) {
                    if (o.start.column === null || o.end.column === null) for (let n = o.start.line; n <= o.end.line; n += 1) {
                        const r = p(e, n);
                        r && r.classList.add("highlighted")
                    } else if (o.start.line === o.end.line && o.start.column != null && o.end.column != null) {
                        const n = (0, b.M9)(o, r => p(e, r));
                        if (n) {
                            const r = document.createElement("span");
                            r.classList.add("highlighted"), (0, T.v)(n, r)
                        }
                    }
                }
            }

            i(A, "highlightLines");

            function l() {
                for (const o of document.querySelectorAll(".js-file-line.highlighted")) o.classList.remove("highlighted");
                for (const o of document.querySelectorAll(".js-file-line .highlighted")) {
                    const e = o.closest(".js-file-line");
                    o.replaceWith(...o.childNodes), e.normalize()
                }
            }

            i(l, "clearHighlights");

            function s() {
                const o = (0, b.n6)(window.location.hash);
                A(o), k();
                const {blobRange: e, anchorPrefix: t} = o, n = e && p(t, e.start.line);
                if (!c && n) {
                    n.scrollIntoView();
                    const r = n.closest(".blob-wrapper, .js-blob-wrapper");
                    r.scrollLeft = 0
                }
                c = !1
            }

            i(s, "scrollLinesIntoView"), (0, m.Z)(function () {
                if (document.querySelector(".js-file-line-container")) {
                    setTimeout(s, 0);
                    const o = window.location.hash;
                    for (const e of document.querySelectorAll(".js-update-url-with-hash")) if (e instanceof HTMLAnchorElement) e.hash = o; else if (e instanceof HTMLFormElement) {
                        const t = new URL(e.action, window.location.origin);
                        t.hash = o, e.action = t.toString()
                    }
                }
            });

            function a(o) {
                const e = [];
                for (const n of o) e.push(n.textContent);
                const t = document.getElementById("js-copy-lines");
                if (t instanceof h.Z) {
                    t.textContent = `Copy ${o.length === 1 ? "line" : "lines"}`, t.value = e.join(`
`);
                    const n = `Blob, copyLines, numLines:${o.length.toString()}`;
                    t.setAttribute("data-ga-click", n)
                }
            }

            i(a, "setCopyLines");

            function v(o) {
                const e = document.querySelector(".js-permalink-shortcut");
                if (e instanceof HTMLAnchorElement) {
                    const t = `${e.href}${window.location.hash}`, n = document.getElementById("js-copy-permalink");
                    if (n instanceof h.Z) {
                        n.value = t;
                        const r = `Blob, copyPermalink, numLines:${o.toString()}`;
                        n.setAttribute("data-ga-click", r)
                    }
                    return t
                }
            }

            i(v, "setPermalink");

            function S(o, e) {
                const t = document.getElementById("js-new-issue");
                if (t instanceof HTMLAnchorElement) {
                    if (!t.href) return;
                    const n = new URL(t.href, window.location.origin), r = new URLSearchParams(n.search);
                    r.set("permalink", o), n.search = r.toString(), t.href = n.toString(), t.setAttribute("data-ga-click", `Blob, newIssue, numLines:${e.toString()}`)
                }
            }

            i(S, "setOpenIssueLink");

            function x(o, e) {
                const t = document.getElementById("js-new-discussion");
                if (!(t instanceof HTMLAnchorElement) || !(t == null ? void 0 : t.href)) return;
                const n = new URL(t.href, window.location.origin), r = new URLSearchParams(n.search);
                r.set("permalink", o), n.search = r.toString(), t.href = n.toString(), t.setAttribute("data-ga-click", `Blob, newDiscussion, numLines:${e.toString()}`)
            }

            i(x, "setOpenDiscussionLink");

            function D(o) {
                const e = document.getElementById("js-view-git-blame");
                !e || e.setAttribute("data-ga-click", `Blob, viewGitBlame, numLines:${o.toString()}`)
            }

            i(D, "setViewGitBlame");

            function k() {
                const o = document.querySelector(".js-file-line-actions");
                if (!o) return;
                const e = document.querySelectorAll(".js-file-line.highlighted"), t = e[0];
                if (t) {
                    a(e), D(e.length);
                    const n = v(e.length);
                    n && S(n, e.length), n && x(n, e.length), o.style.top = `${t.offsetTop - 2}px`, o.classList.remove("d-none")
                } else o.classList.add("d-none")
            }

            i(k, "showOrHideLineActions");

            function P(o) {
                const e = window.scrollY;
                c = !0, o(), window.scrollTo(0, e)
            }

            i(P, "preserveLineNumberScrollPosition"), (0, E.on)("click", ".js-line-number", function (o) {
                const e = (0, b.n6)(o.currentTarget.id), {blobRange: t} = e, n = (0, b.G5)(window.location.hash);
                n && o.shiftKey && (e.blobRange = {start: n.start, end: t.end}), P(() => {
                    window.location.hash = (0, b.Dw)(e)
                })
            }), (0, E.on)("submit", ".js-jump-to-line-form", function (o) {
                const n = o.currentTarget.querySelector(".js-jump-to-line-field").value.replace(/[^\d-]/g, "").split("-").map(r => parseInt(r, 10)).filter(r => r > 0).sort((r, _) => r - _);
                n.length && (window.location.hash = `L${n.join("-L")}`), o.preventDefault()
            }), (0, g.N7)(".js-check-bidi", K);
            const B = /[\u202A-\u202E]|[\u2066-\u2069]/, N = {
                "\u202A": "U+202A",
                "\u202B": "U+202B",
                "\u202C": "U+202C",
                "\u202D": "U+202D",
                "\u202E": "U+202E",
                "\u2066": "U+2066",
                "\u2067": "U+2067",
                "\u2068": "U+2068",
                "\u2069": "U+2069"
            };

            function $(o, e) {
                if (o.nodeType === Node.TEXT_NODE) return F(o, e);
                if (!o.childNodes || !o.childNodes.length) return !1;
                let t = !1;
                for (const n of o.childNodes) if (t || (t = $(n, e)), t && !e) break;
                return t
            }

            i($, "checkNodeForBidiCharacters");

            function F(o, e) {
                let t = !1;
                if (o.nodeValue) for (let n = o.nodeValue.length - 1; n >= 0; n--) {
                    const r = o.nodeValue.charAt(n);
                    if (N[r]) {
                        if (t = !0, !e) break;
                        const _ = new u.R(e, {revealedCharacter: N[r]}), d = new Range;
                        d.setStart(o, n), d.setEnd(o, n + 1), d.deleteContents(), d.insertNode(_)
                    }
                }
                return t
            }

            i(F, "checkTextNodeForBidiCharacters");

            function K(o) {
                let e = !1;
                const t = performance.now(), n = o.textContent || "";
                if (B.test(n)) {
                    const d = o.querySelectorAll(".diff-table .blob-code-inner, .js-file-line-container .js-file-line, .js-suggested-changes-blob .blob-code-inner"),
                        L = document.querySelector(".js-line-alert-template"),
                        w = document.querySelector(".js-revealed-character-template");
                    for (const y of d) if ($(y, w) && (e = !0, L)) {
                        const O = new u.R(L, {});
                        o.getAttribute("data-line-alert") === "before" ? y.before(O) : y.after(O)
                    }
                }
                const _ = {durationMs: (performance.now() - t).toString(), result: e.toString()};
                if ((0, j.q)("blob_js_check_bidi_character", _), e) {
                    const d = document.querySelector(".js-file-alert-template");
                    if (d) {
                        const L = new URL(window.location.href, window.location.origin);
                        L.searchParams.get("h") === "1" ? L.searchParams.delete("h") : L.searchParams.set("h", "1");
                        const w = new u.R(d, {revealButtonHref: L.href});
                        o.prepend(w)
                    }
                }
                o.classList.remove("js-check-bidi")
            }

            i(K, "alertOnBidiCharacter");

            class H {
                constructor(e, t) {
                    this.lineElement = e, this.numberElement = t
                }

                range(e, t) {
                    e = isNaN(e) ? 0 : e, t = isNaN(t) ? 0 : t;
                    let n = null, r = 0, _ = 0;
                    for (const [L, w] of this.lineElement.childNodes.entries()) {
                        const y = (w.textContent || "").length;
                        if (y > e && !n && (n = w, r = L), y >= t) {
                            _ = L;
                            break
                        }
                        e -= y, t -= y
                    }
                    const d = document.createRange();
                    if (r === _) {
                        for (; n && n.nodeName !== "#text";) n = n.childNodes[0];
                        if (!n) return null;
                        d.setStart(n, e), d.setEnd(n, t)
                    } else d.setStart(this.lineElement, r), d.setEnd(this.lineElement, _ + 1);
                    return d
                }
            }

            i(H, "CodeListingLine");

            class W {
                constructor(e) {
                    this.container = e
                }

                findLine(e) {
                    if (!e) return null;
                    const t = this.container.querySelector(`.js-blob-rnum[data-line-number='${e}']`);
                    if (!t) return null;
                    let n = t.nextElementSibling;
                    return !n || !n.classList.contains("js-file-line") ? null : (n = n.querySelector(".js-code-nav-pass") || n, new H(n, t))
                }
            }

            i(W, "CodeListing");
            const V = new WeakMap;

            function I(o) {
                const e = o.closest(".js-blob-code-container, .js-file-content"),
                    t = o.querySelector(".js-codeowners-error-tooltip-template"),
                    n = o.querySelector(".js-codeowners-error-line-alert-template");
                if (!e || !t || !n) return;
                const r = o.querySelectorAll(".js-codeowners-error"), _ = new W(e);
                for (const d of r) {
                    if (V.get(d)) continue;
                    const L = d.getAttribute("data-line"), w = d.getAttribute("data-kind"),
                        y = d.getAttribute("data-suggestion"),
                        O = parseInt(d.getAttribute("data-start-offset") || "", 10),
                        U = parseInt(d.getAttribute("data-end-offset") || "", 10), R = _.findLine(L),
                        q = R == null ? void 0 : R.range(O, U);
                    if (!R || !q) continue;
                    let z = w;
                    y && (z += `: ${y}`);
                    const G = document.createElement("SPAN");
                    G.className = "error-highlight", q.surroundContents(G);
                    const Z = new u.R(t, {message: z}).firstElementChild;
                    q.surroundContents(Z);
                    const X = new u.R(n, {});
                    R.numberElement.appendChild(X), V.set(d, !0)
                }
            }

            i(I, "annotateCodeownersErrors"), (0, g.N7)(".js-codeowners-errors", I), (0, E.on)("expander:expanded", ".js-file", function (o) {
                if (!o.target || !(o.target instanceof HTMLElement)) return;
                const e = o.target.querySelector(".js-codeowners-errors");
                !e || I(e)
            })
        }, 1816: (M, C, f) => {
            f.d(C, {s: () => b});

            function b(h) {
                const u = h.match(/^#?(diff-[a-f0-9]+)(L|R)(\d+)(?:-(L|R)(\d+))?$/i);
                if (u != null && u.length === 6) return u;
                const m = h.match(/^#?(discussion-diff-[0-9]+)(L|R)(\d+)(?:-(L|R)(\d+))?$/i);
                return m != null && m.length === 6 ? m : null
            }

            i(b, "matchHash")
        }, 60798: (M, C, f) => {
            f.d(C, {MO: () => x, vu: () => s, Oz: () => v});
            var b = f(51847);

            class h {
                constructor(t, n, r) {
                    this.diffId = t, this.side = n, this.lineNumber = r, this.element = (0, b.Q)(document, this.anchor())
                }

                sideForCommenting() {
                    return this.element && this.element.classList.contains("blob-num-context") ? "right" : {
                        R: "right",
                        L: "left"
                    }[this.side]
                }

                isContext() {
                    return this.element ? this.element.classList.contains("blob-num-context") : !1
                }

                anchor() {
                    return `${this.diffId}${this.anchorSuffix()}`
                }

                anchorSuffix() {
                    return `${this.side}${this.lineNumber}`
                }

                is(t) {
                    return this.diffId === t.diffId && this.side === t.side && this.lineNumber === t.lineNumber
                }
            }

            i(h, "DiffPosition");

            class u {
                constructor(t, n, r, _, d) {
                    this.elements = new Set, this.isParsed = !1, this.isSplit = !1, this._rows = new Set, this._isAcrossHunks = !1, this._isContextOnly = !0, this._includesExpandedLine = !1, this._commentOutsideTheDiff = !1, this.diffId = t, this.diffTable = document.querySelector(`.js-diff-table[data-diff-anchor="${t}"]`), this.diffTable && (this.isSplit = this.diffTable.classList.contains("js-file-diff-split")), this.start = new h(t, n, r), this.end = new h(t, _, d), this.lineCount = 0, this.parse()
                }

                anchor() {
                    const t = [];
                    return t.push(this.start.anchor()), this.start.is(this.end) || t.push(this.end.anchorSuffix()), t.join("-")
                }

                parse() {
                    if (!this.diffTable) return;
                    let t = this.unify(this.diffTable.querySelectorAll(".js-linkable-line-number"));
                    t = this.filterInRange(t), this.lineCount = t.length, this.elements = this.expandRelatedElements(t), this._commentOutsideTheDiff = this.diffTable.classList.contains("js-comment-outside-the-diff"), this.isParsed = !0
                }

                unify(t) {
                    if (!this.isSplit) return Array.from(t);
                    const n = [];
                    let r = [], _ = [];
                    for (const d of t) d.classList.contains("blob-num-addition") ? r.push(d) : d.classList.contains("blob-num-deletion") ? _.push(d) : (n.push(..._, ...r, d), r = [], _ = []);
                    return n.push(..._, ...r), n
                }

                filterInRange(t) {
                    if (!this.start.element || !this.end.element) return [];
                    let n = t.indexOf(this.start.element), r = t.indexOf(this.end.element);
                    if (n > r) {
                        [n, r] = [r, n];
                        const [_, d] = [this.end, this.start];
                        this.start = _, this.end = d
                    }
                    return t.slice(n, r + 1)
                }

                isContextOnly() {
                    return this.isParsed || this.parse(), this._isContextOnly
                }

                isAcrossHunks() {
                    return this.isParsed || this.parse(), this._isAcrossHunks
                }

                includesExpandedLine() {
                    return this.isParsed || this.parse(), this._includesExpandedLine
                }

                commentOutsideTheDiffEnabled() {
                    return this.isParsed || this.parse(), this._commentOutsideTheDiff
                }

                rows() {
                    return this.isParsed || this.parse(), this._rows
                }

                expandRelatedElements(t) {
                    const n = this.isSplit, r = t[0], _ = t[t.length - 1];
                    if (r && _) {
                        const L = r.closest("[data-hunk]"), w = _.closest("[data-hunk]");
                        if (L && w) {
                            const y = L.getAttribute("data-hunk"), O = w.getAttribute("data-hunk");
                            y !== O && (this._isAcrossHunks = !0)
                        }
                    }
                    const d = i((L, w) => {
                        !this._includesExpandedLine && w.closest(".blob-expanded") && (this._includesExpandedLine = !0);
                        const y = w.parentElement;
                        y instanceof HTMLElement && this._rows.add(y);
                        const O = w.classList.contains("blob-num-deletion") || w.classList.contains("blob-num-addition");
                        if (O && (this._isContextOnly = !1), !y) return L;
                        if (n && O) return Array.from(y.children).indexOf(w) < 2 ? L.add(y.children[0]).add(y.children[1]) : L.add(y.children[2]).add(y.children[3]);
                        for (const U of Array.from(y.children)) L.add(U);
                        return L
                    }, "expander");
                    return t.reduce(d, new Set)
                }
            }

            i(u, "DiffRange");
            var m = f(47458), g = f(1816), E = f(64463), j = f(59753), T = f(91385);
            let c = null, p = null, A = !1, l = null;

            function s() {
                return c
            }

            i(s, "getCurrentRange");

            function a(e) {
                return !!e.closest(".js-multi-line-comments-enabled")
            }

            i(a, "isMultiLineCommentingEnabled");

            function v(e, t) {
                if (!a(e)) return !1;
                const {start: {lineNumber: n}, end: {lineNumber: r}} = t;
                return !(n === r && t.isContextOnly() || !t.commentOutsideTheDiffEnabled() && (t.isAcrossHunks() || t.includesExpandedLine()))
            }

            i(v, "isMultiLineCommentAllowed");

            function S(e) {
                return e.closest(".js-diff-table").classList.contains("is-selecting")
            }

            i(S, "isSelecting");

            function x() {
                window.history.replaceState(null, "", "#"), I()
            }

            i(x, "clearSelection");

            function D(e, t) {
                let n = e.id;
                if (t) {
                    const r = (0, g.s)(n);
                    if (!r) return;
                    const _ = r[1], d = r[2], L = r[3];
                    if (c && c.diffId === _) {
                        if (d === c.start.side && L < c.start.lineNumber) return;
                        const w = new u(_, c.start.side, c.start.lineNumber, d, +L);
                        n = w.anchor();
                        const y = e.closest(".js-file-content[data-hydro-view]");
                        y instanceof HTMLElement && o(y, w), A && S(e) && e.closest(".js-diff-table").classList.toggle("is-commenting", v(e, w)), p = i(function () {
                            if (v(e, w)) {
                                const U = `.js-add-line-comment[data-side="${w.end.sideForCommenting()}"]`,
                                    R = e.closest("tr").querySelector(U);
                                R && w && R.click()
                            }
                        }, "showMultiLineCommentForm")
                    }
                }
                window.history.replaceState(null, "", `#${n}`), I()
            }

            i(D, "setSelection");

            function k(e) {
                if (!(e instanceof HTMLElement)) return null;
                if (e.classList.contains("js-linkable-line-number")) return e;
                const t = e.previousElementSibling;
                return t ? k(t) : null
            }

            i(k, "nearestLinkableLineNumber");

            function P(e) {
                !c || e.target.closest(".js-diff-table") || (window.history.replaceState(null, "", "#"), I())
            }

            i(P, "handleClick");

            function B() {
                if (!l) return;
                D(l, !1);
                const e = l.closest(".js-diff-table");
                l = null, e.classList.add("is-selecting"), e.classList.add("is-commenting"), document.addEventListener("mouseup", function (t) {
                    e.classList.remove("is-selecting"), e.classList.remove("is-selecting", "is-commenting"), p && p(), p = null, H(e), t.preventDefault()
                }, {once: !0})
            }

            i(B, "beginDrag");

            function N(e) {
                const t = k(e);
                !t || !S(t) || D(t, !0)
            }

            i(N, "commentSelectionMouseverToCode");

            function $(e) {
                !S(e) || D(e, !0)
            }

            i($, "commentSelectionMouseverToLineNumbers");

            function F(e) {
                const t = e.target;
                if (!(t instanceof Element)) return;
                l && B();
                const n = t.closest(".blob-code, .js-linkable-line-number");
                if (!!n) {
                    if (n.classList.contains("blob-code")) return N(n);
                    n.classList.contains("js-linkable-line-number") && $(n)
                }
            }

            i(F, "handleDragMouseEvent");

            function K(e) {
                e.addEventListener("mouseenter", F, {capture: !0})
            }

            i(K, "addCommentSelectionEvents");

            function H(e) {
                A = !1, e.removeEventListener("mouseenter", F, {capture: !0}), setTimeout(() => {
                    document.addEventListener("click", P, {once: !0})
                }, 0)
            }

            i(H, "removeCommentSelectionEvents"), (0, j.on)("mousedown", ".js-add-line-comment", function (e) {
                if (!(e instanceof MouseEvent) || e.button !== 0) return;
                const t = e.target.parentElement;
                if (!t || !a(e.target)) return;
                const n = k(t);
                if (!n) return;
                const r = e.target.closest(".js-diff-table");
                K(r), l = n, A = !0, e.target.addEventListener("mouseup", function () {
                    H(r), l = null, A = !1
                }, {once: !0}), c && c.lineCount > 1 && e.preventDefault()
            }), (0, j.on)("mousedown", ".js-linkable-line-number", function (e) {
                if (!(e instanceof MouseEvent) || e.button !== 0) return;
                const t = e.target;
                if (!(t instanceof Element)) return;
                const n = t.closest(".js-diff-table");
                n.classList.add("is-selecting"), K(n), document.addEventListener("mouseup", function () {
                    t.closest(".js-diff-table").classList.remove("is-selecting"), H(n)
                }, {once: !0}), D(t, e instanceof MouseEvent && e.shiftKey), e.preventDefault()
            });

            function W() {
                if (!c) return;
                for (const d of c.elements) d.classList.add("selected-line");
                const e = [], t = [], n = [], r = [];
                for (const d of c.rows()) {
                    const [L, w, y, O] = d.children;
                    e.push(L), t.push(w), n.push(y), r.push(O)
                }

                function _(d) {
                    for (const [L, w] of d.entries()) {
                        if (w.classList.contains("empty-cell")) continue;
                        const y = d[L - 1];
                        (!y || !y.classList.contains("selected-line")) && w.classList.add("selected-line-top");
                        const O = d[L + 1];
                        (!O || !O.classList.contains("selected-line")) && w.classList.add("selected-line-bottom")
                    }
                }

                i(_, "doBorder"), _(e), _(t), _(n), _(r);
                for (const [d, L] of t.entries()) r[d].classList.contains("selected-line") || L.classList.add("selected-line-right");
                for (const [d, L] of n.entries()) t[d].classList.contains("selected-line") || L.classList.add("selected-line-left")
            }

            i(W, "drawBorderForSplit");

            function V() {
                if (!c) return;
                for (const r of c.elements) r.classList.add("selected-line");
                const e = Array.from(c.rows()), t = e[0];
                for (const r of t.children) r.classList.add("selected-line-top");
                const n = e[e.length - 1];
                for (const r of n.children) r.classList.add("selected-line-bottom")
            }

            i(V, "drawBorderForUnified");

            function I() {
                if (c) {
                    for (const y of c.elements) y.classList.remove("selected-line", "selected-line-top", "selected-line-bottom", "selected-line-left", "selected-line-right");
                    c = null
                }
                const e = (0, g.s)(window.location.hash);
                if (!e) return;
                const t = e[1], n = e[2], r = e[3], _ = e[4] || n, d = e[5] || r;
                c = new u(t, n, +r, _, +d);
                const w = Array.from(c.elements)[0];
                !w || (w.closest(".js-diff-table").classList.contains("file-diff-split") ? W() : V())
            }

            i(I, "showHighlight");

            function o(e, t) {
                const n = {
                    starting_diff_position: t.start.side + t.start.lineNumber,
                    ending_diff_position: t.end.side + t.end.lineNumber,
                    line_count: t.lineCount
                };
                e.setAttribute("data-hydro-client-context", JSON.stringify(n)), (0, T.Fk)(e)
            }

            i(o, "sendHydroEvent"), (0, m.Z)(I), (0, E.N7)(".blob-expanded", I), (0, E.N7)(".js-diff-progressive-loader", function (e) {
                e.addEventListener("load", I)
            }), (0, E.N7)(".js-diff-entry-loader", function (e) {
                e.addEventListener("load", I)
            })
        }, 65461: (M, C, f) => {
            var b = f(59753);
            (0, b.on)("click", ".js-rich-diff.collapsed .js-expandable", function (h) {
                if (!(h.target instanceof Element)) return;
                h.preventDefault(), h.target.closest(".js-rich-diff").classList.remove("collapsed")
            }), (0, b.on)("click", ".js-show-rich-diff", function (h) {
                const u = h.currentTarget.closest(".js-warn-no-visible-changes");
                if (!u) return;
                u.classList.add("d-none");
                const g = u.parentElement.querySelector(".js-no-rich-changes");
                g && g.classList.remove("d-none")
            })
        }, 57654: (M, C, f) => {
            f.d(C, {Bt: () => g, DN: () => T, KL: () => A, Se: () => j, qC: () => l, sw: () => c});
            var b = f(59753), h = f(2077), u = f(63621);
            (0, b.on)("click", ".js-remote-submit-button", async function (s) {
                const v = s.currentTarget.form;
                s.preventDefault();
                let S;
                try {
                    S = await fetch(v.action, {
                        method: v.method,
                        body: new FormData(v),
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    })
                } catch {
                }
                S && !S.ok && (0, u.v)()
            });

            function m(s, a, v) {
                return s.dispatchEvent(new CustomEvent(a, {bubbles: !0, cancelable: v}))
            }

            i(m, "fire");

            function g(s, a) {
                a && (E(s, a), (0, h.j)(a)), m(s, "submit", !0) && s.submit()
            }

            i(g, "requestSubmit");

            function E(s, a) {
                if (!(s instanceof HTMLFormElement)) throw new TypeError("The specified element is not of type HTMLFormElement.");
                if (!(a instanceof HTMLElement)) throw new TypeError("The specified element is not of type HTMLElement.");
                if (a.type !== "submit") throw new TypeError("The specified element is not a submit button.");
                if (!s || s !== a.form) throw new Error("The specified element is not owned by the form element.")
            }

            i(E, "checkButtonValidity");

            function j(s, a) {
                if (typeof a == "boolean") if (s instanceof HTMLInputElement) s.checked = a; else throw new TypeError("only checkboxes can be set to boolean value"); else {
                    if (s.type === "checkbox") throw new TypeError("checkbox can't be set to string value");
                    s.value = a
                }
                m(s, "change", !1)
            }

            i(j, "changeValue");

            function T(s, a) {
                for (const v in a) {
                    const S = a[v], x = s.elements.namedItem(v);
                    (x instanceof HTMLInputElement || x instanceof HTMLTextAreaElement) && (x.value = S)
                }
            }

            i(T, "fillFormValues");

            function c(s) {
                if (!(s instanceof HTMLElement)) return !1;
                const a = s.nodeName.toLowerCase(), v = (s.getAttribute("type") || "").toLowerCase();
                return a === "select" || a === "textarea" || a === "input" && v !== "submit" && v !== "reset" || s.isContentEditable
            }

            i(c, "isFormField");

            function p(s) {
                return new URLSearchParams(s)
            }

            i(p, "searchParamsFromFormData");

            function A(s, a) {
                const v = new URLSearchParams(s.search), S = p(a);
                for (const [x, D] of S) v.append(x, D);
                return v.toString()
            }

            i(A, "combineGetFormSearchParams");

            function l(s) {
                return p(new FormData(s)).toString()
            }

            i(l, "serialize")
        }, 54412: (M, C, f) => {
            f.d(C, {Y: () => j, q: () => T});
            var b = f(88149), h = f(86058);
            const u = "dimension_";
            let m;
            const g = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "scid"];
            try {
                const c = (0, b.n)("octolytics");
                delete c.baseContext, m = new h.R(c)
            } catch {
            }

            function E(c) {
                const p = (0, b.n)("octolytics").baseContext || {};
                if (p) {
                    delete p.app_id, delete p.event_url, delete p.host;
                    for (const s in p) s.startsWith(u) && (p[s.replace(u, "")] = p[s], delete p[s])
                }
                const A = document.querySelector("meta[name=visitor-payload]");
                if (A) {
                    const s = JSON.parse(atob(A.content));
                    Object.assign(p, s)
                }
                const l = new URLSearchParams(window.location.search);
                for (const [s, a] of l) g.includes(s.toLowerCase()) && (p[s] = a);
                return Object.assign(p, c)
            }

            i(E, "extendBaseContext");

            function j(c) {
                m == null || m.sendPageView(E(c))
            }

            i(j, "sendPageView");

            function T(c, p) {
                var A, l;
                const s = (l = (A = document.head) == null ? void 0 : A.querySelector('meta[name="current-catalog-service"]')) == null ? void 0 : l.content,
                    a = s ? {service: s} : {};
                for (const [v, S] of Object.entries(p)) S != null && (a[v] = `${S}`);
                m == null || m.sendEvent(c || "unknown", E(a))
            }

            i(T, "sendEvent")
        }, 91385: (M, C, f) => {
            f.d(C, {$S: () => h, Fk: () => u, sz: () => m});
            var b = f(77552);

            function h(g, E, j) {
                const T = {
                    hydroEventPayload: g,
                    hydroEventHmac: E,
                    visitorPayload: "",
                    visitorHmac: "",
                    hydroClientContext: j
                }, c = document.querySelector("meta[name=visitor-payload]");
                c instanceof HTMLMetaElement && (T.visitorPayload = c.content);
                const p = document.querySelector("meta[name=visitor-hmac]") || "";
                p instanceof HTMLMetaElement && (T.visitorHmac = p.content), (0, b.b)(T, !0)
            }

            i(h, "sendData");

            function u(g) {
                const E = g.getAttribute("data-hydro-view") || "", j = g.getAttribute("data-hydro-view-hmac") || "",
                    T = g.getAttribute("data-hydro-client-context") || "";
                h(E, j, T)
            }

            i(u, "trackView");

            function m(g) {
                const E = g.getAttribute("data-hydro-click-payload") || "",
                    j = g.getAttribute("data-hydro-click-hmac") || "",
                    T = g.getAttribute("data-hydro-client-context") || "";
                h(E, j, T)
            }

            i(m, "sendHydroEvent")
        }, 43721: (M, C, f) => {
            f.d(C, {ZG: () => g, q6: () => j, w4: () => E});
            var b = f(8439);
            let h = !1;
            const u = new b.Z;

            function m(T) {
                const c = T.target;
                if (c instanceof HTMLElement && c.nodeType !== Node.DOCUMENT_NODE) for (const p of u.matches(c)) p.data.call(null, c)
            }

            i(m, "handleFocus");

            function g(T, c) {
                h || (h = !0, document.addEventListener("focus", m, !0)), u.add(T, c), document.activeElement instanceof HTMLElement && document.activeElement.matches(T) && c(document.activeElement)
            }

            i(g, "onFocus");

            function E(T, c, p) {
                function A(l) {
                    const s = l.currentTarget;
                    !s || (s.removeEventListener(T, p), s.removeEventListener("blur", A))
                }

                i(A, "blurHandler"), g(c, function (l) {
                    l.addEventListener(T, p), l.addEventListener("blur", A)
                })
            }

            i(E, "onKey");

            function j(T, c) {
                function p(A) {
                    const {currentTarget: l} = A;
                    !l || (l.removeEventListener("input", c), l.removeEventListener("blur", p))
                }

                i(p, "blurHandler"), g(T, function (A) {
                    A.addEventListener("input", c), A.addEventListener("blur", p)
                })
            }

            i(j, "onInput")
        }, 66703: (M, C, f) => {
            f.d(C, {v: () => b});

            function b(h, u) {
                u.appendChild(h.extractContents()), h.insertNode(u)
            }

            i(b, "surroundContents")
        }, 2077: (M, C, f) => {
            f.d(C, {j: () => b, u: () => h});

            function b(u) {
                const m = u.closest("form");
                if (!(m instanceof HTMLFormElement)) return;
                let g = h(m);
                if (u.name) {
                    const E = u.matches("input[type=submit]") ? "Submit" : "", j = u.value || E;
                    g || (g = document.createElement("input"), g.type = "hidden", g.classList.add("is-submit-button-value"), m.prepend(g)), g.name = u.name, g.value = j
                } else g && g.remove()
            }

            i(b, "persistSubmitButtonValue");

            function h(u) {
                const m = u.querySelector("input.is-submit-button-value");
                return m instanceof HTMLInputElement ? m : null
            }

            i(h, "findPersistedSubmitButtonValue")
        }, 16246: (M, C, f) => {
            f.d(C, {RB: () => h, qC: () => u, w0: () => b});

            class b {
                constructor(g) {
                    this.closed = !1, this.unsubscribe = () => {
                        g(), this.closed = !0
                    }
                }
            }

            i(b, "Subscription");

            function h(m, g, E, j = {capture: !1}) {
                return m.addEventListener(g, E, j), new b(() => {
                    m.removeEventListener(g, E, j)
                })
            }

            i(h, "fromEvent");

            function u(...m) {
                return new b(() => {
                    for (const g of m) g.unsubscribe()
                })
            }

            i(u, "compose")
        }, 75343: (M, C, f) => {
            f.d(C, {Z: () => h});

            function b(u) {
                return u.offsetWidth <= 0 && u.offsetHeight <= 0
            }

            i(b, "hidden");

            function h(u) {
                return !b(u)
            }

            i(h, "visible")
        }
    }]);
})();

//# sourceMappingURL=app_assets_modules_github_diffs_blob-lines_ts-app_assets_modules_github_diffs_linkable-line-n-f314c3-3ffcaef6ff84.js.map