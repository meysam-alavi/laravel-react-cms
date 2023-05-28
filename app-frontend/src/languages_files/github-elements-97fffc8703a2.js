"use strict";
(() => {
    var se = Object.defineProperty;
    var a = (B, P) => se(B, "name", {value: P, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["github-elements"], {
        15825: (B, P, m) => {
            var b = m(71544), L = m(38257), y = m(14840), p = m(57260), E = m(13002), I = m(73921), D = m(27034),
                _ = m(51941), d = m(88309), o = m(40987), h = m(57852), f = m(88823);
            window.IncludeFragmentElement.prototype.fetch = s => (s.headers.append("X-Requested-With", "XMLHttpRequest"), window.fetch(s));
            var c = m(70462), l = m(90420), w = Object.defineProperty, C = Object.getOwnPropertyDescriptor,
                A = a((s, t, e, n) => {
                    for (var i = n > 1 ? void 0 : n ? C(t, e) : t, r = s.length - 1, u; r >= 0; r--) (u = s[r]) && (i = (n ? u(t, e, i) : u(i)) || i);
                    return n && i && w(t, e, i), i
                }, "__decorateClass");
            let W = a(class extends HTMLElement {
                updateURL(s) {
                    const t = s.currentTarget, e = t.getAttribute("data-url") || "";
                    if (this.helpField.value = e, t.matches(".js-git-protocol-clone-url")) for (const n of this.helpTexts) n.textContent = e;
                    for (const n of this.cloneURLButtons) n.classList.remove("selected");
                    t.classList.add("selected")
                }
            }, "GitCloneHelpElement");
            A([l.fA], W.prototype, "helpField", 2), A([l.GO], W.prototype, "helpTexts", 2), A([l.GO], W.prototype, "cloneURLButtons", 2), W = A([l.Ih], W);
            var q = a((s, t, e) => {
                    if (!t.has(s)) throw TypeError("Cannot " + e)
                }, "__accessCheck"),
                z = a((s, t, e) => (q(s, t, "read from private field"), e ? e.call(s) : t.get(s)), "__privateGet"),
                U = a((s, t, e) => {
                    if (t.has(s)) throw TypeError("Cannot add the same private member more than once");
                    t instanceof WeakSet ? t.add(s) : t.set(s, e)
                }, "__privateAdd"),
                k = a((s, t, e, n) => (q(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), "__privateSet"),
                M, S, H, G;

            function dt(s, t) {
                const e = [];
                let n = 0;
                for (let i = 0; i < s.length; i++) {
                    const r = s[i], u = t.indexOf(r, n);
                    if (u === -1) return e;
                    n = u + 1, e.push(u)
                }
                return e
            }

            a(dt, "defaultPositions");

            class Y extends HTMLElement {
                constructor() {
                    super(...arguments);
                    U(this, M, ""), U(this, S, ""), U(this, H, void 0), U(this, G, void 0)
                }

                get query() {
                    return this.ownerInput ? this.ownerInput.value : this.getAttribute("query") || ""
                }

                set query(t) {
                    this.setAttribute("query", t)
                }

                get ownerInput() {
                    const t = this.ownerDocument.getElementById(this.getAttribute("data-owner-input") || "");
                    return t instanceof HTMLInputElement ? t : null
                }

                connectedCallback() {
                    var t;
                    this.handleEvent(), (t = this.ownerInput) == null || t.addEventListener("input", this), k(this, H, new MutationObserver(() => this.handleEvent()))
                }

                handleEvent() {
                    z(this, G) && cancelAnimationFrame(z(this, G)), k(this, G, requestAnimationFrame(() => this.mark()))
                }

                disconnectedCallback() {
                    var t;
                    (t = this.ownerInput) == null || t.removeEventListener("input", this), z(this, H).disconnect()
                }

                mark() {
                    const t = this.textContent || "", e = this.query;
                    if (t === z(this, M) && e === z(this, S)) return;
                    k(this, M, t), k(this, S, e), z(this, H).disconnect();
                    let n = 0;
                    const i = document.createDocumentFragment();
                    for (const r of (this.positions || dt)(e, t)) {
                        if (Number(r) !== r || r < n || r > t.length) continue;
                        t.slice(n, r) !== "" && i.appendChild(document.createTextNode(t.slice(n, r))), n = r + 1;
                        const g = document.createElement("mark");
                        g.textContent = t[r], i.appendChild(g)
                    }
                    i.appendChild(document.createTextNode(t.slice(n))), this.replaceChildren(i), z(this, H).observe(this, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0
                    })
                }
            }

            a(Y, "MarkedTextElement"), M = new WeakMap, S = new WeakMap, H = new WeakMap, G = new WeakMap, Y.observedAttributes = ["query", "data-owner-input"];
            const j = null;
            window.customElements.get("marked-text") || (window.MarkedTextElement = Y, window.customElements.define("marked-text", Y));
            var tt = m(40669);

            class N extends HTMLElement {
                connectedCallback() {
                    this.addEventListener("input", bt)
                }

                disconnectedCallback() {
                    this.removeEventListener("input", bt)
                }
            }

            a(N, "PasswordStrengthElement"), window.customElements.get("password-strength") || (window.PasswordStrengthElement = N, window.customElements.define("password-strength", N));

            function bt(s) {
                const t = s.currentTarget;
                if (!(t instanceof N)) return;
                const e = s.target;
                if (!(e instanceof HTMLInputElement)) return;
                const n = e.form;
                if (!(n instanceof HTMLFormElement)) return;
                const i = ht(e.value, {
                    minimumCharacterCount: Number(t.getAttribute("minimum-character-count")),
                    passphraseLength: Number(t.getAttribute("passphrase-length"))
                });
                if (i.valid) {
                    e.setCustomValidity("");
                    const r = t.querySelector("dl.form-group");
                    r && (r.classList.remove("errored"), r.classList.add("successed"))
                } else e.setCustomValidity(t.getAttribute("invalid-message") || "Invalid");
                Nt(t, i), (0, tt.G)(n)
            }

            a(bt, "onInput");

            function ht(s, t) {
                const e = {
                    valid: !1,
                    hasMinimumCharacterCount: s.length >= t.minimumCharacterCount,
                    hasMinimumPassphraseLength: t.passphraseLength !== 0 && s.length >= t.passphraseLength,
                    hasLowerCase: /[a-z]/.test(s),
                    hasNumber: /\d/.test(s)
                };
                return e.valid = e.hasMinimumPassphraseLength || e.hasMinimumCharacterCount && e.hasLowerCase && e.hasNumber, e
            }

            a(ht, "validatePassword");

            function Nt(s, t) {
                var e, n;
                const i = s.querySelector("[data-more-than-n-chars]"), r = s.querySelector("[data-min-chars]"),
                    u = s.querySelector("[data-number-requirement]"), g = s.querySelector("[data-letter-requirement]"),
                    T = ((e = s.getAttribute("error-class")) == null ? void 0 : e.split(" ").filter(O => O.length > 0)) || [],
                    x = ((n = s.getAttribute("pass-class")) == null ? void 0 : n.split(" ").filter(O => O.length > 0)) || [];
                for (const O of [i, r, u, g]) O == null || O.classList.remove(...T, ...x);
                if (t.hasMinimumPassphraseLength && i) i.classList.add(...x); else if (t.valid) r.classList.add(...x), u.classList.add(...x), g.classList.add(...x); else {
                    const O = t.hasMinimumCharacterCount ? x : T, J = t.hasNumber ? x : T, It = t.hasLowerCase ? x : T;
                    i == null || i.classList.add(...T), r.classList.add(...O), u.classList.add(...J), g.classList.add(...It)
                }
            }

            a(Nt, "highlightPasswordStrengthExplainer");
            var ie = m(97957);

            class xt extends D.Z {
                async fetch(t, e = 1e3) {
                    const n = await super.fetch(t);
                    return n.status === 202 ? (await new Promise(i => setTimeout(i, e)), this.fetch(t, e * 1.5)) : n
                }
            }

            a(xt, "PollIncludeFragmentElement"), window.customElements.get("poll-include-fragment") || (window.PollIncludeFragmentElement = xt, window.customElements.define("poll-include-fragment", xt));
            var Ft = m(75329);

            class Lt extends Ft.nJ {
                connectedCallback() {
                    mt.push(this), yt || (St(), yt = window.setInterval(St, 1e3))
                }

                disconnectedCallback() {
                    const t = mt.indexOf(this);
                    t !== -1 && mt.splice(t, 1), mt.length || (window.clearInterval(yt), yt = void 0)
                }

                getFormattedDate() {
                    const t = this.date;
                    if (!t) return;
                    const e = new Date().getTime() - t.getTime(), n = Math.floor(e / 1e3), i = Math.floor(n / 60),
                        r = Math.floor(i / 60), u = Math.floor(r / 24), g = n - i * 60, T = i - r * 60, x = r - u * 24;
                    return i < 1 ? this.applyPrecision([`${n}s`]) : r < 1 ? this.applyPrecision([`${i}m`, `${g}s`]) : u < 1 ? this.applyPrecision([`${r}h`, `${T}m`, `${g}s`]) : this.applyPrecision([`${u}d`, `${x}h`, `${T}m`, `${g}s`])
                }

                applyPrecision(t) {
                    const e = Number(this.getAttribute("data-precision") || t.length);
                    return t.slice(0, e).join(" ")
                }
            }

            a(Lt, "PreciseTimeAgoElement");
            const mt = [];
            let yt;

            function St() {
                for (const s of mt) s.textContent = s.getFormattedDate() || ""
            }

            a(St, "updateNowElements"), window.customElements.get("precise-time-ago") || (window.PreciseTimeAgoElement = Lt, window.customElements.define("precise-time-ago", Lt));
            var Rt = m(5638), Vt = m(57654), zt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor,
                ft = a((s, t, e, n) => {
                    for (var i = n > 1 ? void 0 : n ? qt(t, e) : t, r = s.length - 1, u; r >= 0; r--) (u = s[r]) && (i = (n ? u(t, e, i) : u(i)) || i);
                    return n && i && zt(t, e, i), i
                }, "remote_pagination_element_decorateClass");
            let rt = a(class extends HTMLElement {
                constructor() {
                    super(...arguments);
                    this.loaderWasFocused = !1
                }

                get hasNextPage() {
                    return !this.form.hidden
                }

                get disabled() {
                    return this.submitButton.hasAttribute("aria-disabled")
                }

                set disabled(s) {
                    s ? this.submitButton.setAttribute("aria-disabled", "true") : this.submitButton.removeAttribute("aria-disabled"), this.submitButton.classList.toggle("disabled", s)
                }

                connectedCallback() {
                    this.setPaginationUrl(this.list)
                }

                loadNextPage() {
                    !this.hasNextPage || (0, Vt.Bt)(this.form)
                }

                loadstart(s) {
                    s.target.addEventListener("focus", () => {
                        this.loaderWasFocused = !0
                    }, {once: !0}), s.target.addEventListener("include-fragment-replaced", () => {
                        var t;
                        this.setPaginationUrl(this.list), this.loaderWasFocused && ((t = this.focusMarkers.pop()) == null || t.focus()), this.loaderWasFocused = !1
                    }, {once: !0})
                }

                async submit(s) {
                    var t;
                    if (s.preventDefault(), this.disabled) return;
                    this.disabled = !0;
                    let e;
                    try {
                        const i = await fetch(this.form.action);
                        if (!i.ok) return;
                        e = await i.text()
                    } catch {
                        return
                    }
                    const n = (0, Rt.r)(document, e);
                    this.setPaginationUrl(n), this.list.append(n), (t = this.focusMarkers.pop()) == null || t.focus(), this.disabled = !1, this.dispatchEvent(new CustomEvent("remote-pagination-load"))
                }

                setPaginationUrl(s) {
                    const t = s.querySelector("[data-pagination-src]");
                    if (!t) return;
                    const e = t.getAttribute("data-pagination-src");
                    e ? (this.form.action = e, this.form.hidden = !1) : this.form.hidden = !0
                }
            }, "RemotePaginationElement");
            ft([l.fA], rt.prototype, "form", 2), ft([l.fA], rt.prototype, "list", 2), ft([l.GO], rt.prototype, "focusMarkers", 2), ft([l.fA], rt.prototype, "submitButton", 2), rt = ft([l.Ih], rt);
            var kt = m(10160);
            const jt = /\s|\(|\[/;

            function $t(s, t, e) {
                const n = s.lastIndexOf(t, e - 1);
                if (n === -1 || s.lastIndexOf(" ", e - 1) > n) return;
                const r = s[n - 1];
                return r && !jt.test(r) ? void 0 : {
                    word: s.substring(n + t.length, e),
                    position: n + t.length,
                    beginningOfLine: Ut(r)
                }
            }

            a($t, "keyword");
            const Ut = a(s => s === void 0 || /\n/.test(s), "isBeginningOfLine"),
                Gt = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"],
                Ht = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"],
                Ot = new WeakMap;

            function Kt(s, t) {
                const e = s.nodeName.toLowerCase();
                if (e !== "textarea" && e !== "input") throw new Error("expected textField to a textarea or input");
                let n = Ot.get(s);
                if (n && n.parentElement === s.parentElement) n.innerHTML = ""; else {
                    n = document.createElement("div"), Ot.set(s, n);
                    const g = window.getComputedStyle(s), T = Gt.slice(0);
                    e === "textarea" ? T.push("white-space:pre-wrap;") : T.push("white-space:nowrap;");
                    for (let x = 0, O = Ht.length; x < O; x++) {
                        const J = Ht[x];
                        T.push(`${J}:${g.getPropertyValue(J)};`)
                    }
                    n.style.cssText = T.join(" ")
                }
                const i = document.createElement("span");
                i.style.cssText = "position: absolute;", i.innerHTML = "&nbsp;";
                let r, u;
                if (typeof t == "number") {
                    let g = s.value.substring(0, t);
                    g && (r = document.createTextNode(g)), g = s.value.substring(t), g && (u = document.createTextNode(g))
                } else {
                    const g = s.value;
                    g && (r = document.createTextNode(g))
                }
                if (r && n.appendChild(r), n.appendChild(i), u && n.appendChild(u), !n.parentElement) {
                    if (!s.parentElement) throw new Error("textField must have a parentElement to mirror");
                    s.parentElement.insertBefore(n, s)
                }
                return n.scrollTop = s.scrollTop, n.scrollLeft = s.scrollLeft, {mirror: n, marker: i}
            }

            a(Kt, "textFieldMirror");

            function Zt(s, t = s.selectionEnd) {
                const {mirror: e, marker: n} = Kt(s, t), i = e.getBoundingClientRect(), r = n.getBoundingClientRect();
                return setTimeout(() => {
                    e.remove()
                }, 5e3), {top: r.top - i.top, left: r.left - i.left}
            }

            a(Zt, "textFieldSelectionPosition");
            const at = new WeakMap;

            class Bt {
                constructor(t, e) {
                    this.expander = t, this.input = e, this.combobox = null, this.menu = null, this.match = null, this.justPasted = !1, this.oninput = this.onInput.bind(this), this.onpaste = this.onPaste.bind(this), this.onkeydown = this.onKeydown.bind(this), this.oncommit = this.onCommit.bind(this), this.onmousedown = this.onMousedown.bind(this), this.onblur = this.onBlur.bind(this), this.interactingWithMenu = !1, e.addEventListener("paste", this.onpaste), e.addEventListener("input", this.oninput), e.addEventListener("keydown", this.onkeydown), e.addEventListener("blur", this.onblur)
                }

                destroy() {
                    this.input.removeEventListener("paste", this.onpaste), this.input.removeEventListener("input", this.oninput), this.input.removeEventListener("keydown", this.onkeydown), this.input.removeEventListener("blur", this.onblur)
                }

                activate(t, e) {
                    this.input === document.activeElement && this.setMenu(t, e)
                }

                deactivate() {
                    const t = this.menu, e = this.combobox;
                    return !t || !e ? !1 : (this.menu = null, this.combobox = null, t.removeEventListener("combobox-commit", this.oncommit), t.removeEventListener("mousedown", this.onmousedown), e.destroy(), t.remove(), !0)
                }

                setMenu(t, e) {
                    this.deactivate(), this.menu = e, e.id || (e.id = `text-expander-${Math.floor(Math.random() * 1e5).toString()}`), this.expander.append(e);
                    const n = e.querySelector(".js-slash-command-menu-items");
                    n ? this.combobox = new kt.Z(this.input, n) : this.combobox = new kt.Z(this.input, e);
                    const {top: i, left: r} = Zt(this.input, t.position),
                        u = parseInt(window.getComputedStyle(this.input).fontSize);
                    e.style.top = `${i + u}px`, e.style.left = `${r}px`, this.combobox.start(), e.addEventListener("combobox-commit", this.oncommit), e.addEventListener("mousedown", this.onmousedown), this.combobox.navigate(1)
                }

                setValue(t) {
                    if (t == null) return;
                    const e = this.match;
                    if (!e) return;
                    const n = this.input.value.substring(0, e.position - e.key.length),
                        i = this.input.value.substring(e.position + e.text.length);
                    let {cursor: r, value: u} = this.replaceCursorMark(t);
                    u = (u == null ? void 0 : u.length) === 0 ? u : `${u} `, this.input.value = n + u + i, this.deactivate(), this.input.focus(), r = n.length + (r || u.length), this.input.selectionStart = r, this.input.selectionEnd = r
                }

                replaceCursorMark(t) {
                    const e = /%cursor%/gm, n = e.exec(t);
                    return n ? {cursor: n.index, value: t.replace(e, "")} : {cursor: null, value: t}
                }

                async onCommit({target: t}) {
                    const e = t;
                    if (!(e instanceof HTMLElement) || !this.combobox) return;
                    const n = this.match;
                    if (!n) return;
                    const i = {item: e, key: n.key, value: null},
                        r = new CustomEvent("text-expander-value", {cancelable: !0, detail: i}),
                        u = !this.expander.dispatchEvent(r), {onValue: g} = await m.e("app_assets_modules_github_slash-command-expander-element_slash-command-suggester_ts").then(m.bind(m, 23800));
                    await g(this.expander, n.key, e), !u && i.value && this.setValue(i.value)
                }

                onBlur() {
                    if (this.interactingWithMenu) {
                        this.interactingWithMenu = !1;
                        return
                    }
                    this.deactivate()
                }

                onPaste() {
                    this.justPasted = !0
                }

                async delay(t) {
                    return new Promise(e => setTimeout(e, t))
                }

                async onInput() {
                    if (this.justPasted) {
                        this.justPasted = !1;
                        return
                    }
                    const t = this.findMatch();
                    if (t) {
                        if (this.match = t, await this.delay(this.appropriateDelay(this.match)), this.match !== t) return;
                        const e = await this.notifyProviders(t);
                        if (!this.match) return;
                        e ? this.activate(t, e) : this.deactivate()
                    } else this.match = null, this.deactivate()
                }

                appropriateDelay(t) {
                    return t.beginningOfLine || t.text !== "" ? 0 : 250
                }

                findMatch() {
                    const t = this.input.selectionEnd, e = this.input.value;
                    for (const n of this.expander.keys) {
                        const i = $t(e, n, t);
                        if (i) return {text: i.word, key: n, position: i.position, beginningOfLine: i.beginningOfLine}
                    }
                }

                async notifyProviders(t) {
                    const e = [], n = a(x => e.push(x), "provide"), i = new CustomEvent("text-expander-change", {
                        cancelable: !0,
                        detail: {provide: n, text: t.text, key: t.key}
                    });
                    if (!this.expander.dispatchEvent(i)) return;
                    const {onChange: u} = await m.e("app_assets_modules_github_slash-command-expander-element_slash-command-suggester_ts").then(m.bind(m, 23800));
                    return u(this.expander, t.key, n, t.text), (await Promise.all(e)).filter(x => x.matched).map(x => x.fragment)[0]
                }

                onMousedown() {
                    this.interactingWithMenu = !0
                }

                onKeydown(t) {
                    t.key === "Escape" && this.deactivate() && (t.stopImmediatePropagation(), t.preventDefault())
                }
            }

            a(Bt, "SlashCommandExpander");

            class Mt extends HTMLElement {
                get keys() {
                    const t = this.getAttribute("keys");
                    return t ? t.split(" ") : []
                }

                connectedCallback() {
                    const t = this.querySelector('input[type="text"], textarea');
                    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
                    const e = new Bt(this, t);
                    at.set(this, e)
                }

                disconnectedCallback() {
                    const t = at.get(this);
                    !t || (t.destroy(), at.delete(this))
                }

                setValue(t) {
                    const e = at.get(this);
                    !e || e.setValue(t)
                }

                setMenu(t, e = !1) {
                    const n = at.get(this);
                    !n || !n.match || (e && (n.interactingWithMenu = !0), n.setMenu(n.match, t))
                }

                closeMenu() {
                    const t = at.get(this);
                    !t || t.setValue("")
                }

                isLoading() {
                    const t = this.getElementsByClassName("js-slash-command-expander-loading")[0];
                    if (t) {
                        const e = t.cloneNode(!0);
                        e.classList.remove("d-none"), this.setMenu(e)
                    }
                }

                showError() {
                    const t = this.getElementsByClassName("js-slash-command-expander-error")[0];
                    if (t) {
                        const e = t.cloneNode(!0);
                        e.classList.remove("d-none"), this.setMenu(e)
                    }
                }
            }

            a(Mt, "SlashCommandExpanderElement"), window.customElements.get("slash-command-expander") || (window.SlashCommandExpanderElement = Mt, window.customElements.define("slash-command-expander", Mt));
            var Xt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, _t = a((s, t, e, n) => {
                for (var i = n > 1 ? void 0 : n ? Qt(t, e) : t, r = s.length - 1, u; r >= 0; r--) (u = s[r]) && (i = (n ? u(t, e, i) : u(i)) || i);
                return n && i && Xt(t, e, i), i
            }, "text_suggester_element_decorateClass");
            let pt = a(class extends HTMLElement {
                acceptSuggestion() {
                    var s;
                    ((s = this.suggestion) == null ? void 0 : s.textContent) && (this.input.value = this.suggestion.textContent, this.input.dispatchEvent(new Event("input")), this.suggestionContainer && (this.suggestionContainer.hidden = !0), this.input.focus())
                }
            }, "TextSuggesterElement");
            _t([l.fA], pt.prototype, "input", 2), _t([l.fA], pt.prototype, "suggestionContainer", 2), _t([l.fA], pt.prototype, "suggestion", 2), pt = _t([l.Ih], pt);
            var Dt = a((s, t, e) => {
                    if (!t.has(s)) throw TypeError("Cannot " + e)
                }, "virtual_filter_input_element_accessCheck"),
                R = a((s, t, e) => (Dt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), "virtual_filter_input_element_privateGet"),
                ot = a((s, t, e) => {
                    if (t.has(s)) throw TypeError("Cannot add the same private member more than once");
                    t instanceof WeakSet ? t.add(s) : t.set(s, e)
                }, "virtual_filter_input_element_privateAdd"),
                V = a((s, t, e, n) => (Dt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), "virtual_filter_input_element_privateSet"),
                gt, lt, ut, et, vt, K;

            function Jt(s) {
                return Boolean(s instanceof Set || s && typeof s == "object" && "size" in s && "add" in s && "delete" in s && "clear" in s)
            }

            a(Jt, "isSetAlike");

            class Tt extends HTMLElement {
                constructor() {
                    super(...arguments);
                    ot(this, gt, void 0), ot(this, lt, 0), ot(this, ut, null), ot(this, et, void 0), ot(this, vt, new Set), ot(this, K, null), this.filter = (t, e) => String(t).includes(e)
                }

                static get observedAttributes() {
                    return ["src", "loading", "data-property", "aria-owns"]
                }

                get filtered() {
                    if (R(this, K)) return R(this, K);
                    if (this.hasAttribute("aria-owns")) {
                        const t = this.ownerDocument.getElementById(this.getAttribute("aria-owns") || "");
                        t && Jt(t) && V(this, K, t)
                    }
                    return R(this, K) || V(this, K, new Set)
                }

                set filtered(t) {
                    V(this, K, t)
                }

                get input() {
                    return this.querySelector("input, textarea")
                }

                get src() {
                    return this.getAttribute("src") || ""
                }

                set src(t) {
                    this.setAttribute("src", t)
                }

                get loading() {
                    return this.getAttribute("loading") === "lazy" ? "lazy" : "eager"
                }

                set loading(t) {
                    this.setAttribute("loading", t)
                }

                get accept() {
                    return this.getAttribute("accept") || ""
                }

                set accept(t) {
                    this.setAttribute("accept", t)
                }

                get property() {
                    return this.getAttribute("data-property") || ""
                }

                set property(t) {
                    this.setAttribute("data-property", t)
                }

                reset() {
                    this.filtered.clear(), V(this, vt, new Set)
                }

                clear() {
                    !this.input || (this.input.value = "", this.input.dispatchEvent(new Event("input")))
                }

                attributeChangedCallback(t, e, n) {
                    const i = this.isConnected && this.src, r = this.loading === "eager",
                        u = t === "src" || t === "loading" || t === "accept" || t === "data-property",
                        g = t === "src" || t === "data-property", T = e !== n;
                    g && T && (V(this, ut, null), R(this, et) && clearTimeout(R(this, et))), i && r && u && T ? (cancelAnimationFrame(R(this, lt)), V(this, lt, requestAnimationFrame(() => this.load()))) : t === "aria-owns" && V(this, K, null)
                }

                connectedCallback() {
                    this.src && this.loading === "eager" && (cancelAnimationFrame(R(this, lt)), V(this, lt, requestAnimationFrame(() => this.load())));
                    const t = this.input;
                    if (!t) return;
                    const e = this.getAttribute("aria-owns");
                    e !== null && this.attributeChangedCallback("aria-owns", "", e), t.setAttribute("autocomplete", "off"), t.setAttribute("spellcheck", "false"), this.src && this.loading === "lazy" && (document.activeElement === t ? this.load() : t.addEventListener("focus", () => {
                        this.load()
                    }, {once: !0})), t.addEventListener("input", this)
                }

                disconnectedCallback() {
                    var t;
                    (t = this.input) == null || t.removeEventListener("input", this)
                }

                handleEvent(t) {
                    var e, n;
                    t.type === "input" && (R(this, et) && clearTimeout(R(this, et)), V(this, et, window.setTimeout(() => this.filterItems(), ((n = (e = this.input) == null ? void 0 : e.value) == null ? void 0 : n.length) || 0 < 3 ? 300 : 0)))
                }

                async load() {
                    var t;
                    (t = R(this, gt)) == null || t.abort(), V(this, gt, new AbortController);
                    const {signal: e} = R(this, gt);
                    if (!this.src) throw new Error("missing src");
                    if (await new Promise(n => setTimeout(n, 0)), !e.aborted) {
                        this.dispatchEvent(new Event("loadstart"));
                        try {
                            const n = await this.fetch(this.request(), {signal: e});
                            if (location.origin + this.src !== n.url) return;
                            if (!n.ok) throw new Error(`Failed to load resource: the server responded with a status of ${n.status}`);
                            V(this, vt, new Set((await n.json())[this.property])), V(this, ut, null), this.dispatchEvent(new Event("loadend"))
                        } catch (n) {
                            if (e.aborted) {
                                this.dispatchEvent(new Event("loadend"));
                                return
                            }
                            throw(async () => (this.dispatchEvent(new Event("error")), this.dispatchEvent(new Event("loadend"))))(), n
                        }
                        this.filtered.clear(), this.filterItems()
                    }
                }

                request() {
                    return new Request(this.src, {
                        method: "GET",
                        credentials: "same-origin",
                        headers: {Accept: this.accept || "application/json"}
                    })
                }

                fetch(t, e) {
                    return fetch(t, e)
                }

                filterItems() {
                    var t, e;
                    const n = (e = (t = this.input) == null ? void 0 : t.value.trim()) != null ? e : "",
                        i = R(this, ut);
                    if (V(this, ut, n), n === i) return;
                    this.dispatchEvent(new CustomEvent("virtual-filter-input-filter"));
                    let r;
                    i && n.includes(i) ? r = this.filtered : (r = R(this, vt), this.filtered.clear());
                    for (const u of r) this.filter(u, n) ? this.filtered.add(u) : this.filtered.delete(u);
                    this.dispatchEvent(new CustomEvent("virtual-filter-input-filtered"))
                }
            }

            a(Tt, "VirtualFilterInputElement"), gt = new WeakMap, lt = new WeakMap, ut = new WeakMap, et = new WeakMap, vt = new WeakMap, K = new WeakMap;
            const re = null;
            window.customElements.get("virtual-filter-input") || (window.VirtualFilterInputElement = Tt, window.customElements.define("virtual-filter-input", Tt));
            var Wt = a((s, t, e) => {
                    if (!t.has(s)) throw TypeError("Cannot " + e)
                }, "virtual_list_element_accessCheck"),
                v = a((s, t, e) => (Wt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), "virtual_list_element_privateGet"),
                nt = a((s, t, e) => {
                    if (t.has(s)) throw TypeError("Cannot add the same private member more than once");
                    t instanceof WeakSet ? t.add(s) : t.set(s, e)
                }, "virtual_list_element_privateAdd"),
                Z = a((s, t, e, n) => (Wt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), "virtual_list_element_privateSet"),
                st, F, Q, $, Et, At, ct;

            class Pt extends HTMLElement {
                constructor() {
                    super(...arguments);
                    nt(this, st, !1), nt(this, F, new Set), nt(this, Q, new Map), nt(this, $, 1 / 0), nt(this, Et, new Map), nt(this, At, new Map), nt(this, ct, 0)
                }

                static get observedAttributes() {
                    return ["data-updating"]
                }

                get updating() {
                    return this.getAttribute("data-updating") === "lazy" ? "lazy" : "eager"
                }

                set updating(t) {
                    this.setAttribute("data-updating", t)
                }

                get size() {
                    return v(this, F).size
                }

                get range() {
                    const t = this.getBoundingClientRect().height, {scrollTop: e} = this, n = `${e}-${t}`;
                    if (v(this, Et).has(n)) return v(this, Et).get(n);
                    let i = 0, r = 0, u = 0, g = 0;
                    const T = v(this, Q);
                    for (const x of v(this, F)) {
                        const O = T.get(x) || v(this, $);
                        if (u + O < e) u += O, i += 1, r += 1; else if (g - O < t) g += O, r += 1; else if (g >= t) break
                    }
                    return [i, r]
                }

                attributeChangedCallback(t, e, n) {
                    if (e === n || !this.isConnected) return;
                    const i = t === "data-updating" && n === "eager",
                        r = t === "data-sorted" && this.hasAttribute("data-sorted");
                    (i || r) && this.update()
                }

                connectedCallback() {
                    this.addEventListener("scroll", () => this.update()), this.updateSync = this.updateSync.bind(this)
                }

                update() {
                    v(this, ct) && cancelAnimationFrame(v(this, ct)), !v(this, st) && this.hasAttribute("data-sorted") ? Z(this, ct, requestAnimationFrame(() => {
                        this.dispatchEvent(new CustomEvent("virtual-list-sort", {cancelable: !0})) && this.sort()
                    })) : Z(this, ct, requestAnimationFrame(this.updateSync))
                }

                renderItem(t) {
                    const e = {item: t, fragment: document.createDocumentFragment()};
                    return this.dispatchEvent(new CustomEvent("virtual-list-render-item", {detail: e})), e.fragment.children[0]
                }

                recalculateHeights(t) {
                    const e = this.querySelector("ul, ol, tbody");
                    e && (e.append(this.renderItem(t)), Z(this, $, e.children[0].getBoundingClientRect().height), v(this, Q).set(t, v(this, $)), e.replaceChildren())
                }

                updateSync() {
                    const t = this.querySelector("ul, ol");
                    if (!t) return;
                    const [e, n] = this.range;
                    if (n < e || !this.dispatchEvent(new CustomEvent("virtual-list-update", {cancelable: !0}))) return;
                    const r = new Map, u = v(this, At);
                    let g = -1, T = !0, x = 0;
                    for (const X of v(this, F)) {
                        if (g === -1 && (!Number.isFinite(v(this, $)) || v(this, $) === 0) && this.recalculateHeights(X), g += 1, g < e) {
                            x += v(this, Q).get(X) || v(this, $);
                            continue
                        }
                        if (g > n) {
                            T = !1;
                            break
                        }
                        let it = null;
                        if (u.has(X)) it = u.get(X); else {
                            if (it = this.renderItem(X), !it) continue;
                            u.set(X, it)
                        }
                        r.set(X, it)
                    }
                    t.replaceChildren(...r.values()), t.style.paddingTop = `${x}px`;
                    const O = this.size * v(this, $);
                    t.style.height = `${O || 0}px`;
                    let J = !1;
                    const It = this.getBoundingClientRect().bottom;
                    for (const [X, it] of r) {
                        const {height: ee, bottom: ne} = it.getBoundingClientRect();
                        J = J || ne >= It, v(this, Q).set(X, ee)
                    }
                    if (!T && this.size > r.size && !J) return v(this, Et).delete(`${this.scrollTop}-${this.getBoundingClientRect().height}`), this.update();
                    this.dispatchEvent(new CustomEvent("virtual-list-updated"))
                }

                has(t) {
                    return v(this, F).has(t)
                }

                add(t) {
                    return v(this, F).add(t), Z(this, st, !1), Number.isFinite(v(this, $)) || this.recalculateHeights(t), this.updating === "eager" && this.update(), this
                }

                delete(t) {
                    const e = v(this, F).delete(t);
                    return Z(this, st, !1), v(this, Q).delete(t), this.updating === "eager" && this.update(), e
                }

                clear() {
                    v(this, F).clear(), v(this, Q).clear(), Z(this, $, 1 / 0), Z(this, st, !0), this.updating === "eager" && this.update()
                }

                forEach(t, e) {
                    for (const n of this) t.call(e, n, n, this)
                }

                entries() {
                    return v(this, F).entries()
                }

                values() {
                    return v(this, F).values()
                }

                keys() {
                    return v(this, F).keys()
                }

                [Symbol.iterator]() {
                    return v(this, F)[Symbol.iterator]()
                }

                sort(t) {
                    return Z(this, F, new Set(Array.from(this).sort(t))), Z(this, st, !0), this.updating === "eager" && this.update(), this
                }
            }

            a(Pt, "VirtualListElement"), st = new WeakMap, F = new WeakMap, Q = new WeakMap, $ = new WeakMap, Et = new WeakMap, At = new WeakMap, ct = new WeakMap;
            const ae = null;
            window.customElements.get("virtual-list") || (window.VirtualListElement = Pt, window.customElements.define("virtual-list", Pt));
            var Yt = Object.defineProperty, te = Object.getOwnPropertyDescriptor, Ct = a((s, t, e, n) => {
                for (var i = n > 1 ? void 0 : n ? te(t, e) : t, r = s.length - 1, u; r >= 0; r--) (u = s[r]) && (i = (n ? u(t, e, i) : u(i)) || i);
                return n && i && Yt(t, e, i), i
            }, "visible_password_element_decorateClass");
            let wt = a(class extends HTMLElement {
                show() {
                    this.input.type = "text", this.input.focus(), this.showButton.hidden = !0, this.hideButton.hidden = !1
                }

                hide() {
                    this.input.type = "password", this.input.focus(), this.hideButton.hidden = !0, this.showButton.hidden = !1
                }
            }, "VisiblePasswordElement");
            Ct([l.fA], wt.prototype, "input", 2), Ct([l.fA], wt.prototype, "showButton", 2), Ct([l.fA], wt.prototype, "hideButton", 2), wt = Ct([l.Ih], wt)
        }, 63621: (B, P, m) => {
            m.d(P, {H: () => y, v: () => L});
            var b = m(59753);

            function L() {
                const p = document.getElementById("ajax-error-message");
                p && (p.hidden = !1)
            }

            a(L, "showGlobalError");

            function y() {
                const p = document.getElementById("ajax-error-message");
                p && (p.hidden = !0)
            }

            a(y, "hideGlobalError"), (0, b.on)("deprecatedAjaxError", "[data-remote]", function (p) {
                const E = p.detail, {error: I, text: D} = E;
                p.currentTarget === p.target && (I === "abort" || I === "canceled" || (/<html/.test(D) ? (L(), p.stopImmediatePropagation()) : setTimeout(function () {
                    p.defaultPrevented || L()
                }, 0)))
            }), (0, b.on)("deprecatedAjaxSend", "[data-remote]", function () {
                y()
            }), (0, b.on)("click", ".js-ajax-error-dismiss", function () {
                y()
            })
        }, 40669: (B, P, m) => {
            m.d(P, {G: () => _});
            var b = m(43721), L = m(64463), y = m(59753);
            const p = ["input[pattern]", "input[required]", "textarea[required]", "input[data-required-change]", "textarea[data-required-change]", "input[data-required-value]", "textarea[data-required-value]"].join(",");

            function E(d) {
                const o = d.getAttribute("data-required-value"), h = d.getAttribute("data-required-value-prefix");
                if (d.value === o) d.setCustomValidity(""); else {
                    let f = o;
                    h && (f = h + f), d.setCustomValidity(f)
                }
            }

            a(E, "checkValidityForRequiredValueField"), (0, b.q6)("[data-required-value]", function (d) {
                const o = d.currentTarget;
                E(o)
            }), (0, y.on)("change", "[data-required-value]", function (d) {
                const o = d.currentTarget;
                E(o), _(o.form)
            }), (0, b.q6)("[data-required-trimmed]", function (d) {
                const o = d.currentTarget;
                o.value.trim() === "" ? o.setCustomValidity(o.getAttribute("data-required-trimmed")) : o.setCustomValidity("")
            }), (0, y.on)("change", "[data-required-trimmed]", function (d) {
                const o = d.currentTarget;
                o.value.trim() === "" ? o.setCustomValidity(o.getAttribute("data-required-trimmed")) : o.setCustomValidity(""), _(o.form)
            }), (0, b.ZG)(p, d => {
                let o = d.checkValidity();

                function h() {
                    const f = d.checkValidity();
                    f !== o && d.form && _(d.form), o = f
                }

                a(h, "inputHandler"), d.addEventListener("input", h), d.addEventListener("blur", a(function f() {
                    d.removeEventListener("input", h), d.removeEventListener("blur", f)
                }, "blurHandler"))
            });
            const I = new WeakMap;

            function D(d) {
                I.get(d) || (d.addEventListener("change", () => _(d)), I.set(d, !0))
            }

            a(D, "installHandlers");

            function _(d) {
                const o = d.checkValidity();
                for (const h of d.querySelectorAll("button[data-disable-invalid]")) h.disabled = !o
            }

            a(_, "validate"), (0, L.N7)("button[data-disable-invalid]", {
                constructor: HTMLButtonElement, initialize(d) {
                    const o = d.form;
                    o && (D(o), d.disabled = !o.checkValidity())
                }
            }), (0, L.N7)("input[data-required-change], textarea[data-required-change]", function (d) {
                const o = d, h = o.type === "radio" && o.form ? o.form.elements.namedItem(o.name).value : null;

                function f(c) {
                    const l = o.form;
                    if (c && o.type === "radio" && l && h) for (const w of l.elements.namedItem(o.name)) w instanceof HTMLInputElement && w.setCustomValidity(o.value === h ? "unchanged" : ""); else o.setCustomValidity(o.value === (h || o.defaultValue) ? "unchanged" : "")
                }

                a(f, "customValidity"), o.addEventListener("input", f), o.addEventListener("change", f), f(), o.form && _(o.form)
            }), document.addEventListener("reset", function (d) {
                if (d.target instanceof HTMLFormElement) {
                    const o = d.target;
                    setTimeout(() => _(o))
                }
            })
        }, 57654: (B, P, m) => {
            m.d(P, {Bt: () => E, DN: () => _, KL: () => h, Se: () => D, qC: () => f, sw: () => d});
            var b = m(59753), L = m(2077), y = m(63621);
            (0, b.on)("click", ".js-remote-submit-button", async function (c) {
                const w = c.currentTarget.form;
                c.preventDefault();
                let C;
                try {
                    C = await fetch(w.action, {
                        method: w.method,
                        body: new FormData(w),
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    })
                } catch {
                }
                C && !C.ok && (0, y.v)()
            });

            function p(c, l, w) {
                return c.dispatchEvent(new CustomEvent(l, {bubbles: !0, cancelable: w}))
            }

            a(p, "fire");

            function E(c, l) {
                l && (I(c, l), (0, L.j)(l)), p(c, "submit", !0) && c.submit()
            }

            a(E, "requestSubmit");

            function I(c, l) {
                if (!(c instanceof HTMLFormElement)) throw new TypeError("The specified element is not of type HTMLFormElement.");
                if (!(l instanceof HTMLElement)) throw new TypeError("The specified element is not of type HTMLElement.");
                if (l.type !== "submit") throw new TypeError("The specified element is not a submit button.");
                if (!c || c !== l.form) throw new Error("The specified element is not owned by the form element.")
            }

            a(I, "checkButtonValidity");

            function D(c, l) {
                if (typeof l == "boolean") if (c instanceof HTMLInputElement) c.checked = l; else throw new TypeError("only checkboxes can be set to boolean value"); else {
                    if (c.type === "checkbox") throw new TypeError("checkbox can't be set to string value");
                    c.value = l
                }
                p(c, "change", !1)
            }

            a(D, "changeValue");

            function _(c, l) {
                for (const w in l) {
                    const C = l[w], A = c.elements.namedItem(w);
                    (A instanceof HTMLInputElement || A instanceof HTMLTextAreaElement) && (A.value = C)
                }
            }

            a(_, "fillFormValues");

            function d(c) {
                if (!(c instanceof HTMLElement)) return !1;
                const l = c.nodeName.toLowerCase(), w = (c.getAttribute("type") || "").toLowerCase();
                return l === "select" || l === "textarea" || l === "input" && w !== "submit" && w !== "reset" || c.isContentEditable
            }

            a(d, "isFormField");

            function o(c) {
                return new URLSearchParams(c)
            }

            a(o, "searchParamsFromFormData");

            function h(c, l) {
                const w = new URLSearchParams(c.search), C = o(l);
                for (const [A, W] of C) w.append(A, W);
                return w.toString()
            }

            a(h, "combineGetFormSearchParams");

            function f(c) {
                return o(new FormData(c)).toString()
            }

            a(f, "serialize")
        }, 70462: (B, P, m) => {
            m.d(P, {Z: () => d});
            var b = m(47142);
            const L = a((o, h, f) => {
                if (!(0, b.CD)(o, h)) return -1 / 0;
                const c = (0, b.Gs)(o, h);
                return c < f ? -1 / 0 : c
            }, "getScore"), y = a((o, h, f) => {
                o.innerHTML = "";
                let c = 0;
                for (const l of (0, b.m7)(h, f)) {
                    f.slice(c, l) !== "" && o.appendChild(document.createTextNode(f.slice(c, l))), c = l + 1;
                    const C = document.createElement("mark");
                    C.textContent = f[l], o.appendChild(C)
                }
                o.appendChild(document.createTextNode(f.slice(c)))
            }, "highlightElement"), p = new WeakMap, E = new WeakMap, I = new WeakMap, D = a(o => {
                if (!I.has(o) && o instanceof HTMLElement) {
                    const h = (o.getAttribute("data-value") || o.textContent || "").trim();
                    return I.set(o, h), h
                }
                return I.get(o) || ""
            }, "getTextCache");

            class _ extends HTMLElement {
                static get observedAttributes() {
                    return ["value", "mark-selector", "min-score", "max-matches"]
                }

                get value() {
                    return this.getAttribute("value") || ""
                }

                set value(h) {
                    this.setAttribute("value", h)
                }

                get markSelector() {
                    return this.getAttribute("mark-selector") || ""
                }

                set markSelector(h) {
                    h ? this.setAttribute("mark-selector", h) : this.removeAttribute("mark-selector")
                }

                get minScore() {
                    return Number(this.getAttribute("min-score") || 0)
                }

                set minScore(h) {
                    Number.isNaN(h) || this.setAttribute("min-score", String(h))
                }

                get maxMatches() {
                    return Number(this.getAttribute("max-matches") || 1 / 0)
                }

                set maxMatches(h) {
                    Number.isNaN(h) || this.setAttribute("max-matches", String(h))
                }

                connectedCallback() {
                    const h = this.querySelector("ul");
                    if (!h) return;
                    const f = new Set(h.querySelectorAll("li")), c = this.querySelector("input");
                    c instanceof HTMLInputElement && c.addEventListener("input", () => {
                        this.value = c.value
                    });
                    const l = new MutationObserver(C => {
                        let A = !1;
                        for (const W of C) if (W.type === "childList" && W.addedNodes.length) {
                            for (const q of W.addedNodes) if (q instanceof HTMLLIElement && !f.has(q)) {
                                const z = D(q);
                                A = A || (0, b.CD)(this.value, z), f.add(q)
                            }
                        }
                        A && this.sort()
                    });
                    l.observe(h, {childList: !0});
                    const w = {handler: l, items: f, lazyItems: new Map, timer: null};
                    E.set(this, w)
                }

                disconnectedCallback() {
                    const h = E.get(this);
                    h && (h.handler.disconnect(), E.delete(this))
                }

                addLazyItems(h, f) {
                    const c = E.get(this);
                    if (!c) return;
                    const {lazyItems: l} = c, {value: w} = this;
                    let C = !1;
                    for (const A of h) l.set(A, f), C = C || Boolean(w) && (0, b.CD)(w, A);
                    C && this.sort()
                }

                sort() {
                    const h = p.get(this);
                    h && (h.aborted = !0);
                    const f = {aborted: !1};
                    p.set(this, f);
                    const {minScore: c, markSelector: l, maxMatches: w, value: C} = this, A = E.get(this);
                    if (!A || !this.dispatchEvent(new CustomEvent("fuzzy-list-will-sort", {
                        cancelable: !0,
                        detail: C
                    }))) return;
                    const {items: W, lazyItems: q} = A, z = this.hasAttribute("mark-selector"),
                        U = this.querySelector("ul");
                    if (!U) return;
                    const k = [];
                    if (C) {
                        for (const M of W) {
                            const S = D(M), H = L(C, S, c);
                            H !== -1 / 0 && k.push({item: M, score: H})
                        }
                        for (const [M, S] of q) {
                            const H = L(C, M, c);
                            H !== -1 / 0 && k.push({text: M, render: S, score: H})
                        }
                        k.sort((M, S) => S.score - M.score).splice(w)
                    } else {
                        let M = k.length;
                        for (const S of W) {
                            if (M >= w) break;
                            k.push({item: S, score: 1}), M += 1
                        }
                        for (const [S, H] of q) {
                            if (M >= w) break;
                            k.push({text: S, render: H, score: 1}), M += 1
                        }
                    }
                    requestAnimationFrame(() => {
                        if (f.aborted) return;
                        const M = U.querySelector('input[type="radio"]:checked');
                        U.innerHTML = "";
                        let S = 0;
                        const H = a(() => {
                            if (f.aborted) return;
                            const G = Math.min(k.length, S + 100), dt = document.createDocumentFragment();
                            for (let j = S; j < G; j += 1) {
                                const tt = k[j];
                                let N = null;
                                if ("render" in tt && "text" in tt) {
                                    const {render: bt, text: ht} = tt;
                                    N = bt(ht), W.add(N), I.set(N, ht), q.delete(ht)
                                } else "item" in tt && (N = tt.item);
                                N instanceof HTMLElement && (z && y(l && N.querySelector(l) || N, z ? C : "", D(N)), dt.appendChild(N))
                            }
                            S = G;
                            let Y = !1;
                            if (M instanceof HTMLInputElement) for (const j of dt.querySelectorAll('input[type="radio"]:checked')) j instanceof HTMLInputElement && j.value !== M.value && (j.checked = !1, Y = !0);
                            if (U.appendChild(dt), M && Y && M.dispatchEvent(new Event("change", {bubbles: !0})), G < k.length) requestAnimationFrame(H); else {
                                U.hidden = k.length === 0;
                                const j = this.querySelector("[data-fuzzy-list-show-on-empty]");
                                j && (j.hidden = k.length > 0), this.dispatchEvent(new CustomEvent("fuzzy-list-sorted", {detail: k.length}))
                            }
                        }, "nextBatch");
                        H()
                    })
                }

                attributeChangedCallback(h, f, c) {
                    if (f === c) return;
                    const l = E.get(this);
                    !l || (l.timer && window.clearTimeout(l.timer), l.timer = window.setTimeout(() => this.sort(), 100))
                }
            }

            a(_, "FuzzyListElement");
            const d = _;
            window.customElements.get("fuzzy-list") || (window.FuzzyListElement = _, window.customElements.define("fuzzy-list", _))
        }, 43721: (B, P, m) => {
            m.d(P, {ZG: () => E, q6: () => D, w4: () => I});
            var b = m(8439);
            let L = !1;
            const y = new b.Z;

            function p(_) {
                const d = _.target;
                if (d instanceof HTMLElement && d.nodeType !== Node.DOCUMENT_NODE) for (const o of y.matches(d)) o.data.call(null, d)
            }

            a(p, "handleFocus");

            function E(_, d) {
                L || (L = !0, document.addEventListener("focus", p, !0)), y.add(_, d), document.activeElement instanceof HTMLElement && document.activeElement.matches(_) && d(document.activeElement)
            }

            a(E, "onFocus");

            function I(_, d, o) {
                function h(f) {
                    const c = f.currentTarget;
                    !c || (c.removeEventListener(_, o), c.removeEventListener("blur", h))
                }

                a(h, "blurHandler"), E(d, function (f) {
                    f.addEventListener(_, o), f.addEventListener("blur", h)
                })
            }

            a(I, "onKey");

            function D(_, d) {
                function o(h) {
                    const {currentTarget: f} = h;
                    !f || (f.removeEventListener("input", d), f.removeEventListener("blur", o))
                }

                a(o, "blurHandler"), E(_, function (h) {
                    h.addEventListener("input", d), h.addEventListener("blur", o)
                })
            }

            a(D, "onInput")
        }, 5638: (B, P, m) => {
            m.d(P, {r: () => b});

            function b(L, y) {
                const p = L.createElement("template");
                return p.innerHTML = y, L.importNode(p.content, !0)
            }

            a(b, "parseHTML")
        }, 97957: (B, P, m) => {
            m.d(P, {X: () => L});
            var b = m(64463);

            function L() {
                return /Windows/.test(navigator.userAgent) ? "windows" : /Macintosh/.test(navigator.userAgent) ? "mac" : null
            }

            a(L, "getPlatform");

            function y(p) {
                const E = (p.getAttribute("data-platforms") || "").split(","), I = L();
                return Boolean(I && E.includes(I))
            }

            a(y, "runningOnPlatform"), (0, b.N7)(".js-remove-unless-platform", function (p) {
                y(p) || p.remove()
            })
        }, 2077: (B, P, m) => {
            m.d(P, {j: () => b, u: () => L});

            function b(y) {
                const p = y.closest("form");
                if (!(p instanceof HTMLFormElement)) return;
                let E = L(p);
                if (y.name) {
                    const I = y.matches("input[type=submit]") ? "Submit" : "", D = y.value || I;
                    E || (E = document.createElement("input"), E.type = "hidden", E.classList.add("is-submit-button-value"), p.prepend(E)), E.name = y.name, E.value = D
                } else E && E.remove()
            }

            a(b, "persistSubmitButtonValue");

            function L(y) {
                const p = y.querySelector("input.is-submit-button-value");
                return p instanceof HTMLInputElement ? p : null
            }

            a(L, "findPersistedSubmitButtonValue")
        }
    }, B => {
        var P = a(b => B(B.s = b), "__webpack_exec__");
        B.O(0, ["vendors-node_modules_selector-observer_dist_index_esm_js", "vendors-node_modules_delegated-events_dist_index_js-node_modules_github_details-dialog-elemen-63debe", "vendors-node_modules_github_filter-input-element_dist_index_js-node_modules_github_remote-inp-c7e9ed", "vendors-node_modules_github_catalyst_lib_index_js-node_modules_github_time-elements_dist_index_js", "vendors-node_modules_github_file-attachment-element_dist_index_js-node_modules_primer_view-co-52e104"], () => P(15825));
        var m = B.O()
    }]);
})();

//# sourceMappingURL=github-elements-b0c5fffab18c.js.map