(() => {
    var tu = Object.defineProperty;
    var s = (F, I) => tu(F, "name", {value: I, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["behaviors"], {
        92476: (F, I, u) => {
            "use strict";
            var T = u(63621), c = u(59753);
            (0, c.on)("deprecatedAjaxSend", "[data-remote]", function (e) {
                e.currentTarget === e.target && (e.defaultPrevented || e.currentTarget.classList.add("loading"))
            }), (0, c.on)("deprecatedAjaxComplete", "[data-remote]", function (e) {
                e.currentTarget === e.target && e.currentTarget.classList.remove("loading")
            });
            var C = u(65935);
            (0, C.AC)("form.js-ajax-pagination, .js-ajax-pagination form", async function (e, t) {
                const n = e.closest(".js-ajax-pagination");
                let o;
                try {
                    o = await t.html()
                } catch (r) {
                    if (r.response && r.response.status === 404) {
                        n.remove();
                        return
                    } else throw r
                }
                n.replaceWith(o.html), (0, c.f)(e, "page:loaded")
            });
            var R = u(54412);
            const k = "analytics.click";
            (0, c.on)("click", "[data-analytics-event]", e => {
                const n = e.currentTarget.getAttribute("data-analytics-event");
                if (!n) return;
                const o = JSON.parse(n);
                (0, R.q)(k, o)
            });
            var d = u(64463);
            const b = ["system", "disabled"].map(e => `html[data-a11y-animated-images="${e}"] img[data-animated-image]`).join(", ");
            (0, d.N7)(b, e => {
                if (!(e instanceof HTMLImageElement) || e.closest("a") && !(e.parentElement instanceof HTMLAnchorElement)) return;
                let t = e.parentElement, n = null;
                if (t instanceof HTMLAnchorElement) {
                    if (t.childElementCount > 1) return;
                    n = t, n.setAttribute("data-target", "animated-image.originalLink"), t = n.parentElement
                }
                e.removeAttribute("data-animated-image"), e.setAttribute("data-target", "animated-image.originalImage");
                const o = n ? n.cloneNode(!0) : e.cloneNode(!0), r = document.createElement("animated-image");
                r.appendChild(o), t == null || t.replaceChild(r, n || e)
            });
            var h = u(73301);
            document.addEventListener("pjax:start", function () {
                (0, h.x)("Loading page")
            }), document.addEventListener("pjax:error", function () {
                (0, h.x)("Loading failed")
            }), document.addEventListener("pjax:end", function () {
                (0, h.x)("Loading complete")
            });
            var m = u(40669);
            const f = new WeakMap;
            (0, d.N7)("auto-check", function (e) {
                if (e.classList.contains("js-prevent-default-behavior")) return;
                const t = e.querySelector("input");
                if (!t) return;
                const n = t.closest(".form-group") || e, o = t.form;
                let r;

                function i() {
                    return r || (r = `input-check-${(Math.random() * 1e4).toFixed(0)}`), r
                }

                s(i, "generateId");
                const a = t.getAttribute("aria-describedby");
                t.addEventListener("focusout:delay", () => {
                    t.setAttribute("aria-describedby", [r, a].join(" "))
                });
                const l = n.querySelector("p.note");
                l && (l.id || (l.id = i()), f.set(l, l.innerHTML)), e.addEventListener("loadstart", () => {
                    p(t, n), n.classList.add("is-loading"), t.classList.add("is-autocheck-loading"), (0, m.G)(o)
                }), e.addEventListener("loadend", () => {
                    n.classList.remove("is-loading"), t.classList.remove("is-autocheck-loading")
                }), t.addEventListener("auto-check-success", async y => {
                    t.classList.add("is-autocheck-successful"), n.classList.add("successed"), (0, m.G)(o);
                    const {response: w} = y.detail;
                    if (!w) return;
                    const S = await w.text();
                    if (!!S) {
                        if (l instanceof HTMLElement) l.innerHTML = S, (0, h.N)(l); else {
                            const q = w.status === 200, H = n.tagName === "DL" ? "dd" : "div",
                                $ = document.createElement(H);
                            $.id = i(), $.classList.add(q ? "success" : "warning"), $.innerHTML = S, n.append($), n.classList.add(q ? "successed" : "warn"), (0, h.N)($), q && ($.hidden = document.activeElement !== t)
                        }
                        (0, c.f)(t, "auto-check-message-updated")
                    }
                }), t.addEventListener("auto-check-error", async y => {
                    t.classList.add("is-autocheck-errored"), n.classList.add("errored"), (0, m.G)(o);
                    const {response: w} = y.detail;
                    if (!w) return;
                    const S = await w.text();
                    if (l instanceof HTMLElement) l.innerHTML = S || "Something went wrong", (0, h.N)(l); else {
                        const q = n.tagName === "DL" ? "dd" : "div", H = document.createElement(q);
                        H.id = i(), H.classList.add("error"), H.innerHTML = S || "Something went wrong", n.append(H), (0, h.N)(H)
                    }
                }), t.addEventListener("input", () => {
                    t.removeAttribute("aria-describedby"), t.value || p(t, n)
                }), t.addEventListener("blur", () => {
                    const y = n.querySelector(".success");
                    y && (y.hidden = !0)
                }), t.addEventListener("focus", () => {
                    const y = n.querySelector(".success");
                    y && (y.hidden = !1)
                }), o.addEventListener("reset", () => {
                    p(t, n)
                })
            });

            function p(e, t) {
                var n, o, r, i, a, l;
                t.classList.remove("is-loading", "successed", "errored", "warn"), e.classList.remove("is-autocheck-loading", "is-autocheck-successful", "is-autocheck-errored");
                const y = t.querySelector("p.note");
                if (y) {
                    const w = f.get(y);
                    w && (y.innerHTML = w)
                }
                t.tagName === "DL" ? ((n = t.querySelector("dd.error")) == null || n.remove(), (o = t.querySelector("dd.warning")) == null || o.remove(), (r = t.querySelector("dd.success")) == null || r.remove()) : ((i = t.querySelector("div.error")) == null || i.remove(), (a = t.querySelector("div.warning")) == null || a.remove(), (l = t.querySelector("div.success")) == null || l.remove())
            }

            s(p, "autocheck_reset");
            var g = u(46481);
            (0, d.N7)("auto-complete", function (e) {
                e.addEventListener("loadstart", () => e.classList.add("is-auto-complete-loading")), e.addEventListener("loadend", () => e.classList.remove("is-auto-complete-loading"))
            }), (0, d.N7)("auto-complete", {
                constructor: g.Z,
                initialize: v
            }), (0, c.on)("auto-complete-change", "auto-complete", function (e) {
                v(e.currentTarget)
            });

            function v(e) {
                const t = e.closest("form");
                if (!t) return;
                const n = t.querySelector(".js-auto-complete-button");
                n instanceof HTMLButtonElement && (n.disabled = !e.value)
            }

            s(v, "toggleSubmitButton");
            var L = u(57654), P = u(5638), E = u(98016);
            let M = null;
            (0, c.on)("submit", "[data-autosearch-results-container]", async function (e) {
                const t = e.currentTarget;
                if (!(t instanceof HTMLFormElement)) return;
                e.preventDefault(), M == null || M.abort(), t.classList.add("is-sending");
                const n = new URL(t.action, window.location.origin), o = t.method, r = new FormData(t),
                    i = (0, L.KL)(n, r);
                let a = null;
                o === "get" ? n.search = i : a = r;
                const {signal: l} = M = new AbortController, y = new Request(n.toString(), {
                    method: o,
                    body: a,
                    signal: l,
                    headers: {Accept: "text/html", "X-Requested-With": "XMLHttpRequest"}
                });
                let w;
                try {
                    w = await fetch(y)
                } catch {
                }
                if (t.classList.remove("is-sending"), !w || !w.ok || l.aborted) return;
                const S = t.getAttribute("data-autosearch-results-container"),
                    q = S ? document.getElementById(S) : null;
                q && (q.innerHTML = "", q.appendChild((0, P.r)(document, await w.text()))), (0, E.lO)(null, "", `?${i}`)
            });
            var x = u(81302), j = u(43721);
            (0, j.ZG)("input[data-autoselect], textarea[data-autoselect]", async function (e) {
                await (0, x.gJ)(), e.select()
            });
            var _ = u(46263), A = u(16246);
            (0, c.on)("change", "form[data-autosubmit]", function (e) {
                const t = e.currentTarget;
                (0, L.Bt)(t)
            }), (0, c.on)("change", "input[data-autosubmit], select[data-autosubmit]", N);

            function N(e) {
                const t = e.target;
                if (!(t instanceof HTMLInputElement) && !(t instanceof HTMLSelectElement)) return;
                const n = t.form;
                (0, L.Bt)(n)
            }

            s(N, "autosubmit_submit");
            const X = (0, _.D)(N, 300);
            (0, d.N7)("input[data-throttled-autosubmit]", {subscribe: e => (0, A.RB)(e, "input", X)});

            async function D(e) {
                const t = e.getAttribute("data-url") || "";
                if (await O(t)) {
                    const o = e.getAttribute("data-gravatar-text");
                    o != null && (e.textContent = o)
                }
            }

            s(D, "detectGravatar"), (0, d.N7)(".js-detect-gravatar", function (e) {
                D(e)
            });

            async function O(e) {
                const t = e;
                if (!t) return !1;
                try {
                    const n = await fetch(t, {headers: {Accept: "application/json"}});
                    return n.ok ? (await n.json()).has_gravatar : !1
                } catch {
                    return !1
                }
            }

            s(O, "fetchGravatarInfo");
            var K = u(6007), W = u(18994), U = u(46633), ne = u(10174), de = u(75343);
            const ce = [".unstyled-additional-seats-price-obj", ".unstyled-base-price-obj", ".unstyled-final-price-obj"];

            function we(e) {
                return typeof e == "string" || typeof e == "number" ? !1 : "default_currency" in e && "local_currency" in e
            }

            s(we, "isAPriceStruct");
            let fe = null;
            (0, c.on)("click", ".js-org-signup-duration-change", e => {
                e.preventDefault();
                const n = e.currentTarget.getAttribute("data-plan-duration");
                Qr(n), ts(n);
                for (const o of document.querySelectorAll(".js-seat-field")) Be(o);
                Yr()
            }), (0, c.on)("change", ".js-org-signup-duration-toggle", async function ({currentTarget: e}) {
                const t = new URL(e.getAttribute("data-url"), window.location.origin);
                if ((0, U.c)("TURBO")) {
                    const {visit: n} = await u.e("vendors-node_modules_manuelpuyol_turbo_dist_turbo_es2017-esm_js").then(u.bind(u, 74395));
                    n(t)
                } else {
                    const n = document.getElementById("js-pjax-container");
                    (0, W.ZP)({url: t.toString(), container: n})
                }
            });

            async function Be(e) {
                const t = e.getAttribute("data-item-name") || "items", n = e.value,
                    o = new URL(e.getAttribute("data-url"), window.location.origin),
                    r = new URLSearchParams(o.search.slice(1)), i = parseInt(e.getAttribute("data-item-minimum")) || 0,
                    a = parseInt(e.getAttribute("data-item-maximum")) || 300,
                    l = parseInt(e.getAttribute("data-item-count")) || 0, y = Math.max(i, parseInt(n) || 0), w = y > a,
                    S = document.querySelector(".js-downgrade-button"),
                    q = document.getElementById("downgrade-disabled-message");
                S instanceof HTMLButtonElement && (S.disabled = y === l), q instanceof HTMLElement && S instanceof HTMLButtonElement && (q.hidden = !S.disabled), r.append(t, y.toString()), document.querySelector(".js-transform-user") && r.append("transform_user", "1"), o.search = r.toString(), fe == null || fe.abort();
                const {signal: $} = fe = new AbortController;
                let V = null;
                try {
                    const Z = await fetch(o.toString(), {signal: $, headers: {Accept: "application/json"}});
                    if (!Z.ok) return;
                    V = await Z.json()
                } catch {
                }
                if ($.aborted || !V) return;
                const Q = document.querySelector(".js-contact-us");
                Q && Q.classList.toggle("d-none", !w);
                const Y = document.querySelector(".js-cost-info");
                Y && (Y.hidden = w);
                const oe = document.querySelector(".js-payment-summary");
                oe && oe.classList.toggle("d-none", w);
                const le = document.querySelector(".js-submit-billing");
                le instanceof HTMLElement && (le.hidden = w);
                const ue = document.querySelector(".js-billing-section");
                ue && ue.classList.toggle("has-removed-contents", V.free || V.is_enterprise_cloud_trial);
                const ee = document.querySelector(".js-upgrade-info");
                ee && ee.classList.toggle("d-none", y <= 0);
                const He = document.querySelector(".js-downgrade-info");
                He && He.classList.toggle("d-none", y >= 0);
                const B = document.querySelector(".js-extra-seats-line-item");
                B && B.classList.toggle("d-none", V.no_additional_seats), document.querySelector(".js-seat-field") && es(n);
                const z = document.querySelector(".js-minimum-seats-disclaimer");
                z && (z.classList.toggle("tooltipped", V.seats === 5), z.classList.toggle("tooltipped-nw", V.seats === 5));
                const te = V.selectors;
                for (const Z in te) for (const ae of document.querySelectorAll(Z)) Jr(Z) && we(te[Z]) ? (ae.textContent = "", ae.appendChild(Bn("default-currency", te[Z].default_currency)), ae.appendChild(Bn("local-currency", te[Z].local_currency))) : ae.textContent = te[Z];
                (0, E.lO)((0, W.y0)(), "", V.url)
            }

            s(Be, "updateTotals");

            function Jr(e) {
                return ce.includes(e)
            }

            s(Jr, "isPriceSelector");

            function Bn(e, t) {
                const n = document.createElement("span");
                return n.classList.add(e), n.textContent = t, n
            }

            s(Bn, "priceCurrencyTag");

            function Yr() {
                for (const e of document.querySelectorAll(".js-unit-price")) e.hidden = !e.hidden
            }

            s(Yr, "toggleDurationUnitPrices");

            function Qr(e) {
                const t = e === "year" ? "month" : "year";
                for (const o of document.querySelectorAll(".js-plan-duration-text")) o.textContent = e;
                for (const o of document.querySelectorAll(".unstyled-available-plan-duration-adjective")) o.textContent = `${e}ly`;
                for (const o of document.querySelectorAll(".js-org-signup-duration-change")) o.setAttribute("data-plan-duration", t);
                const n = document.getElementById("signup-plan-duration");
                n && (n.value = e)
            }

            s(Qr, "updateDurationFields");

            function es(e) {
                var t;
                for (const n of document.querySelectorAll(".js-seat-field")) {
                    const o = n.getAttribute("data-item-max-seats"),
                        r = (t = n == null ? void 0 : n.parentNode) == null ? void 0 : t.querySelector(".Popover");
                    o && o.length && (parseInt(e, 10) > parseInt(o, 10) ? (n.classList.add("color-border-danger-emphasis"), r == null || r.removeAttribute("hidden")) : (n.classList.remove("color-border-danger-emphasis"), r == null || r.setAttribute("hidden", "true")))
                }
            }

            s(es, "updateSeatFields");

            function ts(e) {
                for (const t of document.querySelectorAll(".js-seat-field")) {
                    const n = new URL(t.getAttribute("data-url"), window.location.origin),
                        o = new URLSearchParams(n.search.slice(1));
                    o.delete("plan_duration"), o.append("plan_duration", e), n.search = o.toString(), t.setAttribute("data-url", n.toString())
                }
            }

            s(ts, "updateSeatFieldURLs"), (0, d.N7)(".js-addon-purchase-field", {
                constructor: HTMLInputElement, add(e) {
                    (0, de.Z)(e) && Be(e), (0, ne.oq)(e, function () {
                        Be(e)
                    })
                }
            }), (0, d.N7)(".js-addon-downgrade-field", {
                constructor: HTMLSelectElement, add(e) {
                    (0, de.Z)(e) && Be(e), e.addEventListener("change", function () {
                        Be(e)
                    })
                }
            });

            function ns(e) {
                const t = document.querySelector(".js-addon-purchase-field"),
                    n = e.target.querySelector("input:checked");
                if (t instanceof HTMLInputElement && n instanceof HTMLInputElement) {
                    const o = n.getAttribute("data-upgrade-url");
                    o && (t.setAttribute("data-url", o), t.value = "0", Be(t))
                }
            }

            s(ns, "handleOrgChange"), (0, c.on)("details-menu-selected", ".js-organization-container", ns, {capture: !0}), (0, j.q6)(".js-csv-filter-field", function (e) {
                const t = e.target.value.toLowerCase();
                for (const n of document.querySelectorAll(".js-csv-data tbody tr")) n instanceof HTMLElement && (!n.textContent || (n.hidden = !!t && !n.textContent.toLowerCase().includes(t)))
            }), (0, d.N7)(".js-blob-header.is-stuck", {
                add(e) {
                    $n(e)
                }, remove(e) {
                    $n(e, !0)
                }
            });

            function $n(e, t = !1) {
                const n = {
                    "tooltipped-nw": "tooltipped-sw",
                    "tooltipped-n": "tooltipped-s",
                    "tooltipped-ne": "tooltipped-se"
                };
                for (const [o, r] of Object.entries(n)) {
                    const i = t ? r : o, a = t ? o : r;
                    for (const l of e.querySelectorAll(`.${i}`)) l.classList.replace(i, a)
                }
            }

            s($n, "flipTooltip");

            function os(e) {
                const t = e.target, n = t == null ? void 0 : t.closest(".js-branch-protection-integration-select"),
                    o = n == null ? void 0 : n.querySelector(".js-branch-protection-integration-select-current"),
                    r = t == null ? void 0 : t.closest(".js-branch-protection-integration-select-item"),
                    i = r == null ? void 0 : r.querySelector(".js-branch-protection-integration-select-label");
                o && i && n && (o.innerHTML = i.innerHTML, n.open = !1)
            }

            s(os, "changeSelection"), (0, c.on)("change", ".js-branch-protection-integration-select-input", os);

            function rs(e) {
                const t = new URL(e.getAttribute("data-bulk-actions-url"), window.location.origin),
                    n = new URLSearchParams(t.search.slice(1)), o = e.getAttribute("data-bulk-actions-parameter"),
                    r = Array.from(e.querySelectorAll(".js-bulk-actions-toggle:checked"));
                if (o) {
                    const i = r.map(a => a.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")).sort();
                    for (const a of i) n.append(`${o}[]`, a)
                } else for (const i of r.sort((a, l) => a.value > l.value ? 1 : -1)) n.append(i.name, i.value);
                return t.search = n.toString(), t.toString()
            }

            s(rs, "bulkUrl");
            let Ot = null;

            async function ss(e) {
                const t = e.target;
                if (!(t instanceof HTMLElement)) return;
                const n = t.querySelector(".js-bulk-actions"), o = !!t.querySelector(".js-bulk-actions-toggle:checked");
                Ot == null || Ot.abort();
                const {signal: r} = Ot = new AbortController;
                let i = "";
                try {
                    const a = await fetch(rs(t), {signal: r, headers: {"X-Requested-With": "XMLHttpRequest"}});
                    if (!a.ok) return;
                    i = await a.text()
                } catch {
                }
                r.aborted || !i || (o ? (Fn(t), n.innerHTML = i) : (n.innerHTML = i, Fn(t)), (0, c.f)(t, "bulk-actions:updated"))
            }

            s(ss, "updateBulkActions");

            function Fn(e) {
                const t = document.querySelector(".js-membership-tabs");
                if (t) {
                    const n = e.querySelectorAll(".js-bulk-actions-toggle:checked");
                    t.classList.toggle("d-none", n.length > 0)
                }
            }

            s(Fn, "toggleMembershipTabs"), (0, c.on)("change", ".js-bulk-actions-toggle", function (e) {
                const n = e.currentTarget.closest(".js-bulk-actions-container");
                (0, c.f)(n, "bulk-actions:update")
            }), (0, c.on)("bulk-actions:update", ".js-bulk-actions-container", (0, _.D)(ss, 100));
            var ye = u(75488), he = u(77552);

            function is(e) {
                try {
                    const t = window.localStorage.getItem(e);
                    return {kind: "ok", value: t ? JSON.parse(t) : null}
                } catch (t) {
                    return {kind: "err", value: t}
                }
            }

            s(is, "getLocalJSON");

            function Un(e, t) {
                try {
                    return window.localStorage.setItem(e, JSON.stringify(t)), {kind: "ok", value: null}
                } catch (n) {
                    return {kind: "err", value: n}
                }
            }

            s(Un, "setLocalJSON");

            function as() {
                const e = {};
                for (const t of document.getElementsByTagName("script")) {
                    const n = t.src.match(/\/([\w-]+)-[0-9a-f]{8,}\.js$/);
                    n && (e[`${n[1]}.js`] = t.src)
                }
                for (const t of document.getElementsByTagName("link")) {
                    const n = t.href.match(/\/([\w-]+)-[0-9a-f]{8,}\.css$/);
                    n && (e[`${n[1]}.css`] = t.href)
                }
                return e
            }

            s(as, "gatherBundleURLs");

            function cs() {
                const e = as(), t = is("bundle-urls");
                if (t.kind === "err") {
                    Un("bundle-urls", e);
                    return
                }
                const n = t.value || {}, o = Object.keys(e).filter(r => n[r] !== e[r]);
                o.length && Un("bundle-urls", {...n, ...e}).kind === "ok" && (0, he.b)({downloadedBundles: o})
            }

            s(cs, "report"), (async () => (await ye.C, window.requestIdleCallback(cs)))();
            var nu = u(71771);

            function ls(e) {
                e.preventDefault(), e.stopPropagation()
            }

            s(ls, "cancelEvent"), (0, d.N7)("a.btn.disabled", {subscribe: e => (0, A.RB)(e, "click", ls)});
            var Nt = u(24247), us = u(58797);
            (0, d.N7)(".js-check-all-container", {constructor: HTMLElement, subscribe: us.Z});
            var Ve = u(20215);
            const Wn = "logout-was-successful";

            function ds() {
                for (const e of [sessionStorage, localStorage]) try {
                    e.clear()
                } catch {
                }
            }

            s(ds, "clearData");

            function fs() {
                (0, Ve.$1)(Wn).length > 0 && (ds(), (0, Ve.kT)(Wn))
            }

            s(fs, "clearDataIfJustLoggedOut"), fs();
            const zn = 2e3;
            (0, c.on)("clipboard-copy", "[data-copy-feedback]", e => {
                const t = e.currentTarget, n = t.getAttribute("data-copy-feedback"), o = t.getAttribute("aria-label"),
                    r = t.getAttribute("data-tooltip-direction") || "s";
                t.setAttribute("aria-label", n), t.classList.add("tooltipped", `tooltipped-${r}`), t instanceof HTMLElement && ((0, h.N)(t), setTimeout(() => {
                    o ? t.setAttribute("aria-label", o) : t.removeAttribute("aria-label"), t.classList.remove("tooltipped", `tooltipped-${r}`)
                }, zn))
            });

            function ms(e) {
                Bt.delete(e), Kn(e)
            }

            s(ms, "timerCallback");

            function Kn(e) {
                const t = e.querySelector(".js-clipboard-copy-icon"), n = e.querySelector(".js-clipboard-check-icon");
                e.classList.toggle("ClipboardButton--success"), t && t.classList.toggle("d-none"), n && (n.classList.contains("d-sm-none") ? n.classList.toggle("d-sm-none") : n.classList.toggle("d-none"))
            }

            s(Kn, "toggleCopyButton");
            const Bt = new WeakMap;
            (0, c.on)("clipboard-copy", ".js-clipboard-copy:not([data-view-component])", function ({currentTarget: e}) {
                if (!(e instanceof HTMLElement)) return;
                const t = Bt.get(e);
                t ? clearTimeout(t) : Kn(e), Bt.set(e, window.setTimeout(ms, zn, e))
            }), (0, c.on)("click", ".js-code-nav-retry", async function (e) {
                if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
                const t = document.querySelector(".js-tagsearch-popover");
                if (!t) return;
                const n = t.querySelector(".js-tagsearch-popover-content");
                if (!n) return;
                let o;
                const r = e.currentTarget;
                if (r.getAttribute("data-code-nav-kind") === "definitions" ? o = t.querySelector(".js-tagsearch-popover-content") : o = t.querySelector(".js-code-nav-references"), !o) return;
                const a = r.getAttribute("data-code-nav-url");
                if (!a) return;
                const l = new URL(a, window.location.origin);
                try {
                    const y = await fetch(l.toString(), {headers: {"X-Requested-With": "XMLHttpRequest"}});
                    if (!y.ok) return;
                    const w = await y.text();
                    if (!w) return;
                    o.innerHTML = w
                } catch {
                    return
                }
                n.scrollTop = 0
            }), (0, d.N7)(".js-code-nav-container", {
                constructor: HTMLElement, subscribe(e) {
                    const t = e, n = document.querySelector(".js-tagsearch-popover");
                    if (!(n instanceof HTMLElement)) return {
                        unsubscribe() {
                        }
                    };
                    const o = n.querySelector(".js-tagsearch-popover-content"), r = new WeakMap, i = new WeakMap;
                    let a;
                    l();

                    function l() {
                        le();
                        for (const B of document.getElementsByClassName("pl-token")) B.classList.remove("pl-token", "active")
                    }

                    s(l, "initialize");

                    async function y(B) {
                        const G = $t(/\w+[!?]?/g, B.clientX, B.clientY, 0);
                        if (!G) return;
                        const z = G.commonAncestorContainer.parentElement;
                        if (!z) return;
                        for (const eu of z.classList) if (["pl-token", "pl-c", "pl-s", "pl-k"].includes(eu)) return;
                        if (z.closest(".js-skip-tagsearch")) return;
                        const te = G.toString();
                        if (!te || te.match(/\n|\s|[();&.=",]/)) return;
                        let Z = i.get(z);
                        if (Z || (Z = new Set, i.set(z, Z)), Z.has(te)) return;
                        Z.add(te);
                        const ae = z.closest(".js-tagsearch-file");
                        if (!ae) return;
                        const On = ae.getAttribute("data-tagsearch-path") || "";
                        let Oe = ae.getAttribute("data-tagsearch-lang") || "";
                        if (Oe === "HTML+ERB") if (z.closest(".pl-sre")) Oe = "Ruby"; else return;
                        if (e.classList.contains("js-code-block-container") && (Oe = ps(z) || "", !Oe)) return;
                        const Nn = Xn(G), Ne = document.createElement("span");
                        Ne.classList.add("pl-token"), Ne.addEventListener("click", S);
                        let Ht;
                        if (!(0, U.c)("BLACKBIRD_MONOLITH")) {
                            if (Ht = await Vn(n, te, Oe, Nn, On), !Ht) return;
                            q(Ne, Ht), r.set(Ne, Ht)
                        }
                        G.surroundContents(Ne)
                    }

                    s(y, "onMouseMove");

                    function w() {
                        o.scrollTop = 0
                    }

                    s(w, "resetScrollTop");

                    async function S(B) {
                        if (B.altKey || B.ctrlKey || B.metaKey || B.shiftKey) return;
                        const G = B.currentTarget;
                        if (G === a) le(); else if (V(G), (0, U.c)("BLACKBIRD_MONOLITH")) {
                            const z = n.querySelector(".js-loading-code-definitions");
                            z && (o.hidden = !0, z.hidden = !1, Y(G), oe()), await $(B), Q(G), z && !z.hidden && (z.hidden = !0), o.hidden = !1
                        } else Q(G), oe();
                        B.preventDefault()
                    }

                    s(S, "onClick");

                    function q(B, G) {
                        const z = document.createElement("span");
                        z.innerHTML = G;
                        const te = z.firstElementChild;
                        if (!te) return;
                        const Z = te.getAttribute("data-hydro-click"), ae = te.getAttribute("data-hydro-click-hmac");
                        ae && Z && (B.setAttribute("data-hydro-click", Z), B.setAttribute("data-hydro-click-hmac", ae))
                    }

                    s(q, "addPopoverElement");

                    async function H(B, G) {
                        const z = $t(/\w+[!?]?/g, B.clientX, B.clientY, 2);
                        if (!z) return;
                        const te = z.commonAncestorContainer.parentElement;
                        if (!te) return;
                        for (const Ne of te.classList) if (G.includes(Ne)) return;
                        const Z = z.toString(), ae = te.closest(".js-tagsearch-file");
                        if (!ae) return;
                        const On = ae.getAttribute("data-tagsearch-path") || "",
                            Oe = ae.getAttribute("data-tagsearch-lang") || "", Nn = Xn(z);
                        return await Vn(n, Z, Oe, Nn, On)
                    }

                    s(H, "getPopoverHtml");

                    async function $(B) {
                        const G = await H(B, ["data-hydro-click"]);
                        if (!G) return;
                        const z = document.getElementsByClassName("active")[0];
                        !z || (q(z, G), r.set(z, G))
                    }

                    s($, "fetchPopover");

                    function V(B) {
                        a && a.classList.remove("active"), a = B, a.classList.add("active")
                    }

                    s(V, "setActivePopover");

                    function Q(B) {
                        o.innerHTML = r.get(B) || "", Y(B)
                    }

                    s(Q, "populatePopover");

                    function Y(B) {
                        const G = t.getClientRects()[0], z = B.getClientRects()[0];
                        n.style.position = "absolute", n.style.zIndex = "2", t.classList.contains("position-relative") ? (n.style.top = `${z.bottom - G.top + 7}px`, n.style.left = `${z.left - G.left - 10}px`) : (n.style.top = `${window.scrollY + z.bottom}px`, n.style.left = `${window.scrollX + z.left}px`)
                    }

                    s(Y, "positionPopover");

                    function oe() {
                        if (!n.hidden) {
                            w();
                            return
                        }
                        n.hidden = !1, w(), document.addEventListener("click", ee), document.addEventListener("keyup", He), window.addEventListener("resize", ue)
                    }

                    s(oe, "showPopover");

                    function le() {
                        n.hidden || (n.hidden = !0, a && a.classList.remove("active"), a = void 0, document.removeEventListener("click", ee), document.removeEventListener("keyup", He), window.removeEventListener("resize", ue))
                    }

                    s(le, "hidePopover");

                    function ue() {
                        a instanceof HTMLElement && Y(a)
                    }

                    s(ue, "onResize");

                    function ee(B) {
                        const {target: G} = B;
                        G instanceof Node && !n.contains(G) && !a.contains(G) && le()
                    }

                    s(ee, "onDocumentClick");

                    function He(B) {
                        switch (B.key) {
                            case"Escape":
                                le();
                                break
                        }
                    }

                    return s(He, "onKeyup"), e.addEventListener("mousemove", y), {
                        unsubscribe() {
                            e.removeEventListener("mousemove", y)
                        }
                    }
                }
            });

            async function Vn(e, t, n, o, r) {
                const i = e.getAttribute("data-tagsearch-url");
                if (!i) return "";
                const a = e.getAttribute("data-tagsearch-ref");
                if (!a) return "";
                let l = e.getAttribute("data-tagsearch-code-nav-context");
                l || (l = "UNKNOWN_VIEW");
                const y = new URL(i, window.location.origin), w = new URLSearchParams;
                w.set("q", t), w.set("blob_path", r), w.set("ref", a), w.set("language", n), w.set("row", o[0].toString()), w.set("col", o[1].toString()), w.set("code_nav_context", l), y.search = w.toString();
                try {
                    const S = await fetch(y.toString(), {headers: {"X-Requested-With": "XMLHttpRequest"}});
                    if (!S.ok) return "";
                    const q = await S.text();
                    return /js-tagsearch-no-definitions/.test(q) ? "" : q
                } catch {
                    return ""
                }
            }

            s(Vn, "fetchPopoverContents");

            function $t(e, t, n, o) {
                let r, i;
                if (document.caretPositionFromPoint) {
                    const S = document.caretPositionFromPoint(t, n);
                    S && (r = S.offsetNode, i = S.offset)
                } else if (document.caretRangeFromPoint) {
                    const S = document.caretRangeFromPoint(t, n);
                    S && (r = S.startContainer, i = S.startOffset)
                }
                if (!r || typeof i != "number" || !(0, U.c)("BLACKBIRD_MONOLITH") && r.nodeType !== Node.TEXT_NODE) return;
                const a = r.textContent, l = (a == null ? void 0 : a.replaceAll(`
`, "").trim()) === "";
                if (!a || l || r.nodeType !== Node.TEXT_NODE) {
                    if (o <= 0 || !(0, U.c)("BLACKBIRD_MONOLITH")) return null;
                    {
                        const S = r.nodeType !== Node.TEXT_NODE ? 1 : 10;
                        return $t(e, t - S, n - S, o - 1)
                    }
                }
                const y = hs(a, e, i);
                if (!y) return null;
                const w = document.createRange();
                return w.setStart(r, y[1]), w.setEnd(r, y[2]), w
            }

            s($t, "matchFromPoint");

            function hs(e, t, n) {
                let o;
                for (; o = t.exec(e);) {
                    const r = o.index + o[0].length;
                    if (o.index <= n && n <= r) return [o[0], o.index, r]
                }
                return null
            }

            s(hs, "findNearestMatch");

            function ps(e) {
                const t = e.closest(".highlight");
                if (t) for (const n of t.classList) switch (n) {
                    case"highlight-source-go":
                        return "Go";
                    case"highlight-source-js":
                        return "JavaScript";
                    case"highlight-source-python":
                        return "Python";
                    case"highlight-source-ruby":
                        return "Ruby";
                    case"highlight-source-ts":
                        return "TypeScript"
                }
                return null
            }

            s(ps, "getCodeBlockLanguage");

            function Xn(e) {
                let t = e.startContainer, n = e.startOffset, o = !1;
                for (; ;) {
                    let r = t.previousSibling;
                    for (; !o && r;) ["#comment", "BUTTON"].includes(r.nodeName) || (n += (r.textContent || "").length), r = r.previousSibling;
                    const i = t.parentElement;
                    if (i) {
                        if (i.classList.contains("js-code-nav-pass")) o = !0; else if (i.classList.contains("js-file-line")) {
                            const a = i.previousElementSibling;
                            if (!a.classList.contains("js-code-nav-line-number")) throw new Error("invariant");
                            return [parseInt(a.getAttribute("data-line-number") || "1", 10) - 1, n]
                        }
                        t = i
                    } else return [0, 0]
                }
            }

            s(Xn, "getRowAndColumn");
            var Me = u(34692);

            function gs(e) {
                const t = e.querySelector(".js-comment-form-error");
                t instanceof HTMLElement && (t.hidden = !0)
            }

            s(gs, "clearFormError"), (0, c.on)("click", ".errored.js-remove-error-state-on-click", function ({currentTarget: e}) {
                e.classList.remove("errored")
            }), (0, C.AC)(".js-new-comment-form", async function (e, t) {
                let n;
                gs(e);
                try {
                    n = await t.json()
                } catch (i) {
                    bs(e, i)
                }
                if (!n) return;
                e.reset();
                for (const i of e.querySelectorAll(".js-resettable-field")) (0, L.Se)(i, i.getAttribute("data-reset-value") || "");
                const o = e.querySelector(".js-write-tab");
                o instanceof HTMLElement && o.click();
                const r = n.json.updateContent;
                for (const i in r) {
                    const a = r[i], l = document.querySelector(i);
                    l instanceof HTMLElement ? (0, Me.Of)(l, a) : console.warn(`couldn't find ${i} for immediate update`)
                }
                (0, c.f)(e, "comment:success")
            });

            function bs(e, t) {
                let n = "You can't comment at this time";
                if (t.response && t.response.status === 422) {
                    const r = t.response.json;
                    r.errors && (Array.isArray(r.errors) ? n += ` \u2014 your comment ${r.errors.join(", ")}` : n = r.errors)
                }
                n += ". ";
                const o = e.querySelector(".js-comment-form-error");
                if (o instanceof HTMLElement) {
                    o.textContent = n, o.hidden = !1;
                    const r = o.closest("div.form-group.js-remove-error-state-on-click");
                    r && r.classList.add("errored")
                }
            }

            s(bs, "handleFormError");
            const ys = s((e, t) => {
                const n = e.querySelector(".js-form-action-text"), o = n || e;
                o.textContent = t ? e.getAttribute("data-comment-text") : o.getAttribute("data-default-action-text")
            }, "setButtonText"), vs = s(e => {
                let t;
                return n => {
                    const r = n.currentTarget.value.trim();
                    r !== t && (t = r, ys(e, Boolean(r)))
                }
            }, "createInputHandler");
            (0, d.N7)(".js-comment-and-button", {
                constructor: HTMLButtonElement, initialize(e) {
                    const t = e.form.querySelector(".js-comment-field"), n = vs(e);
                    return {
                        add() {
                            t.addEventListener("input", n), t.addEventListener("change", n)
                        }, remove() {
                            t.removeEventListener("input", n), t.removeEventListener("change", n)
                        }
                    }
                }
            });
            var ou = u(37542);

            function Gn(e, t) {
                const n = e.closest(".js-write-bucket");
                n && n.classList.toggle("focused", t)
            }

            s(Gn, "toggleFocus");

            function ws(e) {
                const t = e.currentTarget;
                t instanceof Element && Gn(t, !1)
            }

            s(ws, "blurred"), (0, j.ZG)(".js-comment-field", function (e) {
                Gn(e, !0), e.addEventListener("blur", ws, {once: !0})
            });
            var Ee = u(50320), Es = u(52769), Ft = u(68499);
            const Ls = 2303741511, js = 4;

            class ot {
                constructor(t) {
                    this.dataview = new DataView(t), this.pos = 0
                }

                static fromFile(t) {
                    return new Promise(function (n, o) {
                        const r = new FileReader;
                        r.onload = function () {
                            n(new ot(r.result))
                        }, r.onerror = function () {
                            o(r.error)
                        }, r.readAsArrayBuffer(t)
                    })
                }

                advance(t) {
                    this.pos += t
                }

                readInt(t) {
                    const n = this, o = function () {
                        switch (t) {
                            case 1:
                                return n.dataview.getUint8(n.pos);
                            case 2:
                                return n.dataview.getUint16(n.pos);
                            case 4:
                                return n.dataview.getUint32(n.pos);
                            default:
                                throw new Error("bytes parameter must be 1, 2 or 4")
                        }
                    }();
                    return this.advance(t), o
                }

                readChar() {
                    return this.readInt(1)
                }

                readShort() {
                    return this.readInt(2)
                }

                readLong() {
                    return this.readInt(4)
                }

                readString(t) {
                    const n = [];
                    for (let o = 0; o < t; o++) n.push(String.fromCharCode(this.readChar()));
                    return n.join("")
                }

                scan(t) {
                    if (this.readLong() !== Ls) throw new Error("invalid PNG");
                    for (this.advance(4); ;) {
                        const n = this.readLong(), o = this.readString(4), r = this.pos + n + js;
                        if (t.call(this, o, n) === !1 || o === "IEND") break;
                        this.pos = r
                    }
                }
            }

            s(ot, "PNGScanner");
            const Ss = .0254;

            async function Ts(e) {
                if (e.type !== "image/png") return null;
                const t = e.slice(0, 10240, e.type), n = await ot.fromFile(t), o = {width: 0, height: 0, ppi: 1};
                return n.scan(function (r) {
                    switch (r) {
                        case"IHDR":
                            return o.width = this.readLong(), o.height = this.readLong(), !0;
                        case"pHYs": {
                            const i = this.readLong(), a = this.readLong(), l = this.readChar();
                            let y;
                            return l === 1 && (y = Ss), y && (o.ppi = Math.round((i + a) / 2 * y)), !1
                        }
                        case"IDAT":
                            return !1
                    }
                    return !0
                }), o
            }

            s(Ts, "imageDimensions");
            var As = u(89900);
            const rt = new WeakMap;

            class Zn {
                constructor(t, n, o) {
                    this.index = t, this.coords = n, this.textArea = o
                }

                get top() {
                    return this.coords.top
                }

                get left() {
                    return this.coords.left
                }

                get height() {
                    return this.coords.height
                }

                currentChar(t = 1) {
                    return this.textArea.value.substring(this.index - t, this.index)
                }

                checkLine(t) {
                    return t < this.coords.top ? -1 : t > this.coords.top + this.coords.height ? 1 : 0
                }

                xDistance(t) {
                    return Math.abs(this.left - t)
                }
            }

            s(Zn, "CaretPosition");

            function Le(e, t) {
                let n;
                if (rt.has(e) ? n = rt.get(e) : (n = new Map, rt.set(e, n)), n.has(t)) return n.get(t);
                {
                    const o = new Zn(t, (0, As.Z)(e, t), e);
                    return n.set(t, o), o
                }
            }

            s(Le, "fetchCaretCoords");
            const Xe = s((e, t, n, o, r, i) => {
                if (n === t) return n;
                const a = s(S => {
                    const q = S.filter(H => H.checkLine(r) === 0).sort((H, $) => H.xDistance(o) > $.xDistance(o) ? 1 : -1);
                    return q.length === 0 ? n : q[0].index
                }, "bestPosition");
                if (n - t === 1) {
                    const S = Le(e, t), q = Le(e, n);
                    return a([S, q])
                }
                if (n - t === 2) {
                    const S = Le(e, t), q = Le(e, n - 1), H = Le(e, n);
                    return a([S, q, H])
                }
                const l = Math.floor((n + t) / 2);
                if (l === t || l === n) return l;
                const y = Le(e, l);
                if (r > y.top + y.height) return Xe(e, l + 1, n, o, r, i + 1);
                if (r < y.top) return Xe(e, t, l - 1, o, r, i + 1);
                const w = 3;
                return y.xDistance(o) < w ? l : y.left < o ? Le(e, l + 1).checkLine(r) !== 0 ? l : Xe(e, l + 1, n, o, r, i + 1) : y.left > o ? Le(e, l - 1).checkLine(r) !== 0 ? l : Xe(e, t, l - 1, o, r, i + 1) : l
            }, "binaryCursorSearch"), Cs = s((e, t, n) => {
                const r = e.value.length - 1;
                return Xe(e, 0, r, t, n, 0)
            }, "findCursorPosition");

            function ks(e, t, n) {
                const o = Cs(e, t, n);
                e.setSelectionRange(o, o)
            }

            s(ks, "setCursorPosition");

            function xs(e, t) {
                const n = e.getBoundingClientRect();
                t.type === "dragenter" && rt.delete(e);
                const o = t.clientX - n.left, r = t.clientY - n.top + e.scrollTop;
                ks(e, o, r)
            }

            s(xs, "caret_placement_updateCaret"), (0, d.N7)(".js-paste-markdown", {
                initialize(e) {
                    let t;
                    return {
                        add() {
                            t = (0, Es.Ld)(e).unsubscribe
                        }, remove() {
                            t()
                        }
                    }
                }
            });
            const Ut = new WeakMap;

            function ru(e, t) {
                Ut.set(e, t)
            }

            s(ru, "cachePlaceholder");

            function Ms(e) {
                return Ut.get(e) || Yn(e)
            }

            s(Ms, "getPlaceholder");

            function Wt(e) {
                return ["video/mp4", "video/quicktime"].includes(e.file.type)
            }

            s(Wt, "isVideo");

            function qs(e) {
                return e.replace(/[[\]\\"<>&]/g, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
            }

            s(qs, "parameterizeName");

            function Jn(e) {
                return Wt(e) ? `
Uploading ${e.file.name}\u2026
` : `${e.isImage() ? "!" : ""}[Uploading ${e.file.name}\u2026]()`
            }

            s(Jn, "placeholderText");

            function Rs(e) {
                return qs(e).replace(/\.[^.]+$/, "").replace(/\./g, " ")
            }

            s(Rs, "altText");
            const Ps = 72 * 2;

            function st(e) {
                const n = e.target.closest("form").querySelector(".btn-primary");
                n.disabled = !0
            }

            s(st, "disableSubmit");

            function it(e) {
                const n = e.target.closest("form").querySelector(".btn-primary");
                n.disabled = !1
            }

            s(it, "enableSubmit");

            async function _s(e) {
                const {attachment: t} = e.detail, n = e.currentTarget;
                let o;
                t.isImage() ? o = await Hs(t) : Wt(t) ? o = Ds(t) : o = Is(t), eo("", o, e, n)
            }

            s(_s, "onUploadCompleted");

            function Is(e) {
                return `[${e.file.name}](${e.href})`
            }

            s(Is, "mdLink");

            function Ds(e) {
                return `
${e.href}
`
            }

            s(Ds, "videoMarkdown");

            async function Hs(e) {
                const t = await Os(e.file), n = Rs(e.file.name), o = e.href;
                return t.ppi === Ps ? `<img width="${Math.round(t.width / 2)}" alt="${n}" src="${o}">` : `![${n}](${o})`
            }

            s(Hs, "imageTag");

            async function Os(e) {
                var t;
                const n = {width: 0, height: 0, ppi: 0};
                try {
                    return (t = await Ts(e)) != null ? t : n
                } catch {
                    return n
                }
            }

            s(Os, "imageSize");

            function Yn(e) {
                const t = Jn(e);
                return Wt(e) ? `
${t}
` : `${t}
`
            }

            s(Yn, "replacementText");

            function Qn(e) {
                const t = e.currentTarget.querySelector(".js-comment-field"), n = Ms(e.detail.attachment);
                if (t) t.setCustomValidity(""), (0, Ee.lp)(t, n, ""); else {
                    const r = (0, Ft.P)(e.currentTarget.querySelector(".js-code-editor")).editor.getSearchCursor(n);
                    r.findNext(), r.replace("")
                }
            }

            s(Qn, "removeFailedUpload");

            function eo(e, t, n, o) {
                const r = (o || n.currentTarget).querySelector(".js-comment-field"),
                    i = (o || n.currentTarget).querySelector(".js-file-upload-loading-text"),
                    a = Jn(n.detail.attachment), {batch: l} = n.detail;
                if (r) {
                    const y = r.value.substring(r.selectionStart, r.selectionEnd);
                    if (e === "uploading") {
                        let w;
                        y.length ? w = (0, Ee.t4)(r, y, a) : w = (0, Ee.Om)(r, a, {appendNewline: !0}), Ut.set(n.detail.attachment, w)
                    } else (0, Ee.lp)(r, a, t);
                    l.isFinished() ? it(n) : st(n)
                } else {
                    const y = (0, Ft.P)((o || n.currentTarget).querySelector(".js-code-editor")).editor;
                    if (e === "uploading") if (y.getSelection().length) y.replaceSelection(a); else {
                        const w = y.getCursor(), S = Yn(n.detail.attachment);
                        y.replaceRange(S, w)
                    } else {
                        const w = y.getSearchCursor(a);
                        w.findNext(), w.replace(t)
                    }
                    l.isFinished() ? it(n) : st(n)
                }
                if (i) {
                    const y = i.getAttribute("data-file-upload-message");
                    i.textContent = `${y} (${l.uploaded() + 1}/${l.size})`
                }
            }

            s(eo, "setValidityAndLinkText"), (0, c.on)("upload:setup", ".js-upload-markdown-image", function (e) {
                eo("uploading", "", e)
            }), (0, c.on)("upload:complete", ".js-upload-markdown-image", _s), (0, c.on)("upload:error", ".js-upload-markdown-image", function (e) {
                Qn(e);
                const {batch: t} = e.detail;
                t.isFinished() ? it(e) : st(e)
            });

            function to(e) {
                var t;
                e.stopPropagation();
                const n = e.currentTarget;
                if (!n) return;
                const o = n.querySelector(".js-comment-field");
                if (o) xs(o, e); else {
                    const r = (t = (0, Ft.P)(n.querySelector(".js-code-editor"))) == null ? void 0 : t.editor;
                    if (r) {
                        const i = r.coordsChar({left: e.pageX, top: e.pageY});
                        r.setCursor(i)
                    }
                }
            }

            s(to, "updateCursor");
            const su = s(e => {
                const t = e.currentTarget, n = t.getBoundingClientRect(), o = e.clientX - n.left,
                    r = e.clientY - n.top + t.scrollTop;
                console.log({
                    x: o,
                    y: r,
                    cursor: t.selectionStart,
                    t: t.value.substring(t.selectionStart - 10, t.selectionStart)
                });
                const i = new DragEvent("dragenter", {clientX: e.clientX, clientY: e.clientY});
                updateCaret(t, i)
            }, "debugUpdateCaret");
            (0, c.on)("dragenter", "file-attachment", to), (0, c.on)("dragover", "file-attachment", to), (0, c.on)("upload:invalid", ".js-upload-markdown-image", function (e) {
                Qn(e);
                const {batch: t} = e.detail;
                t.isFinished() ? it(e) : st(e)
            });
            var zt = u(29501), qe = u(15205);

            function Ns(e) {
                const t = e.querySelector(".js-data-preview-url-csrf"),
                    n = e.closest("form").elements.namedItem("authenticity_token");
                if (t instanceof HTMLInputElement) return t.value;
                if (n instanceof HTMLInputElement) return n.value;
                throw new Error("Comment preview authenticity token not found")
            }

            s(Ns, "token");

            function Kt(e) {
                const t = e.closest(".js-previewable-comment-form"), n = e.classList.contains("js-preview-tab");
                if (n) {
                    const i = t.querySelector(".js-write-bucket"), a = t.querySelector(".js-preview-body");
                    i.clientHeight > 0 && (a.style.minHeight = `${i.clientHeight}px`)
                }
                t.classList.toggle("preview-selected", n), t.classList.toggle("write-selected", !n);
                const o = t.querySelector('.tabnav-tab.selected, .tabnav-tab[aria-selected="true"]');
                o.setAttribute("aria-selected", "false"), o.classList.remove("selected"), e.classList.add("selected"), e.setAttribute("aria-selected", "true");
                const r = t.querySelector(".js-write-tab");
                return n ? r.setAttribute("data-hotkey", "Control+P,Meta+Shift+p") : r.removeAttribute("data-hotkey"), t
            }

            s(Kt, "activateTab"), (0, c.on)("click", ".js-write-tab", function (e) {
                const t = e.currentTarget, n = t.closest(".js-previewable-comment-form");
                if (n instanceof zt.Z) {
                    setTimeout(() => {
                        n.querySelector(".js-comment-field").focus()
                    });
                    return
                }
                const o = Kt(t);
                (0, c.f)(n, "preview:toggle:off");
                const r = n.querySelector(".js-discussion-poll-form-component");
                r && (0, c.f)(r, "poll-preview:toggle:off"), setTimeout(() => {
                    o.querySelector(".js-comment-field").focus()
                });
                const i = n.querySelector("markdown-toolbar");
                i instanceof HTMLElement && (i.hidden = !1)
            }), (0, c.on)("click", ".js-preview-tab", function (e) {
                const t = e.currentTarget, n = t.closest(".js-previewable-comment-form");
                if (n instanceof zt.Z) return;
                const o = Kt(t);
                (0, c.f)(n, "preview:toggle:on"), setTimeout(() => {
                    Xt(o)
                });
                const r = n.querySelector("markdown-toolbar");
                r instanceof HTMLElement && (r.hidden = !0), e.stopPropagation(), e.preventDefault()
            }), (0, c.on)("tab-container-change", ".js-previewable-comment-form", function (e) {
                const t = e.detail.relatedTarget, n = t && t.classList.contains("js-preview-panel"),
                    o = e.currentTarget, r = o.querySelector(".js-write-tab");
                if (n) {
                    const i = o.querySelector(".js-write-bucket"), a = o.querySelector(".js-preview-body");
                    !a.hasAttribute("data-skip-sizing") && i.clientHeight > 0 && (a.style.minHeight = `${i.clientHeight}px`), r.setAttribute("data-hotkey", "Control+P,Meta+Shift+p"), Xt(o);
                    const y = o.querySelector("markdown-toolbar");
                    y instanceof HTMLElement && (y.hidden = !0)
                } else {
                    r.removeAttribute("data-hotkey");
                    const i = o.querySelector("markdown-toolbar");
                    i instanceof HTMLElement && (i.hidden = !1);
                    const a = document.querySelector(".js-discussion-poll-form-component");
                    a && (0, c.f)(a, "poll-preview:toggle:off")
                }
                o.classList.toggle("preview-selected", n), o.classList.toggle("write-selected", !n)
            }), (0, c.on)("preview:render", ".js-previewable-comment-form", function (e) {
                const t = e.target.querySelector(".js-preview-tab"), n = Kt(t);
                setTimeout(() => {
                    Xt(n);
                    const o = n.querySelector("markdown-toolbar");
                    o instanceof HTMLElement && (o.hidden = !0)
                })
            });

            function Bs(e) {
                var t, n, o, r, i, a, l, y, w;
                const S = e.querySelector(".js-comment-field").value,
                    q = (t = e.querySelector(".js-path")) == null ? void 0 : t.value,
                    H = (n = e.querySelector(".js-line-number")) == null ? void 0 : n.value,
                    $ = (o = e.querySelector(".js-start-line-number")) == null ? void 0 : o.value,
                    V = (r = e.querySelector(".js-side")) == null ? void 0 : r.value,
                    Q = (i = e.querySelector(".js-start-side")) == null ? void 0 : i.value,
                    Y = (a = e.querySelector(".js-start-commit-oid")) == null ? void 0 : a.value,
                    oe = (l = e.querySelector(".js-end-commit-oid")) == null ? void 0 : l.value,
                    le = (y = e.querySelector(".js-base-commit-oid")) == null ? void 0 : y.value,
                    ue = (w = e.querySelector(".js-comment-id")) == null ? void 0 : w.value, ee = new FormData;
                return ee.append("text", S), ee.append("authenticity_token", Ns(e)), q && ee.append("path", q), H && ee.append("line_number", H), $ && ee.append("start_line_number", $), V && ee.append("side", V), Q && ee.append("start_side", Q), Y && ee.append("start_commit_oid", Y), oe && ee.append("end_commit_oid", oe), le && ee.append("base_commit_oid", le), ue && ee.append("comment_id", ue), ee
            }

            s(Bs, "previewForm");

            function no(e) {
                const t = e.getAttribute("data-preview-url"), n = Bs(e);
                return (0, c.f)(e, "preview:setup", {data: n}), $s(t, n)
            }

            s(no, "fetchPreview");
            const $s = (0, qe.Z)(Fs, {hash: Us});
            let Vt = null;

            async function Fs(e, t) {
                Vt == null || Vt.abort();
                const {signal: n} = Vt = new AbortController, o = await fetch(e, {method: "post", body: t, signal: n});
                if (!o.ok) throw new Error("something went wrong");
                return o.text()
            }

            s(Fs, "uncachedFetch");

            function Us(e, t) {
                const n = [...t.entries()].toString();
                return `${e}:${n}`
            }

            s(Us, "hash");

            async function Xt(e) {
                const t = e.querySelector(".comment-body");
                t.innerHTML = "<p>Loading preview&hellip;</p>";
                try {
                    const n = await no(e);
                    t.innerHTML = n || "<p>Nothing to preview</p>", (0, c.f)(e, "preview:rendered")
                } catch (n) {
                    n.name !== "AbortError" && (t.innerHTML = "<p>Error rendering preview</p>")
                }
            }

            s(Xt, "renderPreview"), (0, d.N7)(".js-preview-tab", function (e) {
                e.addEventListener("mouseenter", async () => {
                    const t = e.closest(".js-previewable-comment-form");
                    try {
                        await no(t)
                    } catch {
                    }
                })
            }), (0, j.w4)("keydown", ".js-comment-field", function (e) {
                const t = e.target;
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toUpperCase() === "P") {
                    const n = t.closest(".js-previewable-comment-form");
                    n.classList.contains("write-selected") && (n instanceof zt.Z ? n.querySelector(".js-preview-tab").click() : (t.blur(), n.dispatchEvent(new CustomEvent("preview:render", {
                        bubbles: !0,
                        cancelable: !1
                    }))), e.preventDefault(), e.stopImmediatePropagation())
                }
            });
            const oo = /^(\+1|-1|:\+1?|:-1?)$/, Ws = s(e => {
                let t = !1;
                for (const n of e.split(`
`)) {
                    const o = n.trim();
                    if (!(!o || o.startsWith(">"))) {
                        if (t && oo.test(o) === !1) return !1;
                        !t && oo.test(o) && (t = !0)
                    }
                }
                return t
            }, "isReactionLikeComment");
            (0, c.on)("focusout", "#new_comment_field", function (e) {
                const n = e.currentTarget.closest(".js-reaction-suggestion");
                n && so(n)
            }), (0, c.on)("focusin", "#new_comment_field", function (e) {
                ro(e)
            }), (0, j.w4)("keyup", "#new_comment_field", function (e) {
                ro(e)
            });

            function ro(e) {
                const t = e.target, n = t.value, o = t.closest(".js-reaction-suggestion");
                if (!!o) if (Ws(n)) {
                    o.classList.remove("hide-reaction-suggestion"), o.classList.add("reaction-suggestion");
                    const r = o.getAttribute("data-reaction-markup");
                    o.setAttribute("data-reaction-suggestion-message", r)
                } else so(o)
            }

            s(ro, "toggleReactionSuggestion");

            function so(e) {
                e.classList.remove("reaction-suggestion"), e.classList.add("hide-reaction-suggestion"), e.removeAttribute("data-reaction-suggestion-message")
            }

            s(so, "clearReactionSuggestion");
            var at = u(46073);
            (0, c.on)("navigation:keydown", ".js-commits-list-item", function (e) {
                !(0, at.Zf)(e.detail.originalEvent) || e.target instanceof Element && e.detail.hotkey === "c" && e.target.querySelector(".js-navigation-open").click()
            });
            var iu = u(40332);
            (0, j.q6)(".js-company-name-input", function (e) {
                const t = e.target, n = t.form, o = n.querySelector(".js-corp-tos-link"),
                    r = n.querySelector(".js-tos-link");
                r && (r.classList.add("d-none"), r.setAttribute("aria-hidden", "true"), o && (o.classList.remove("d-none"), o.setAttribute("aria-hidden", "false")));
                const i = n.querySelectorAll(".js-company-name-text");
                if (i.length !== 0) for (const a of i) if (t.value) if (a.hasAttribute("data-wording")) {
                    const y = a.getAttribute("data-wording");
                    a.textContent = ` ${y} ${t.value}`
                } else a.textContent = t.value; else a.textContent = ""
            }), (0, d.N7)(".js-company-owned:not(:checked)", {
                constructor: HTMLInputElement, add(e) {
                    const n = e.form.querySelector(".js-company-name-input"),
                        o = document.querySelector(".js-company-name-text"),
                        r = document.querySelector(".js-corp-tos-link"), i = document.querySelector(".js-tos-link");
                    n && (e.getAttribute("data-optional") && n.removeAttribute("required"), (0, L.Se)(n, "")), i.classList.remove("d-none"), i.setAttribute("aria-hidden", "false"), r.classList.add("d-none"), r.setAttribute("aria-hidden", "true"), o && (o.textContent = "")
                }
            }), (0, d.N7)(".js-company-owned:checked", {
                constructor: HTMLInputElement, add(e) {
                    const n = e.form.querySelector(".js-company-name-input");
                    n && (n.setAttribute("required", ""), (0, c.f)(n, "focus"), (0, c.f)(n, "input"))
                }
            }), (0, d.N7)(".js-company-owned-autoselect", {
                constructor: HTMLInputElement, add(e) {
                    const t = e;

                    function n() {
                        if (t.checked && t.form) {
                            const o = t.form.querySelector(".js-company-owned");
                            (0, L.Se)(o, !0)
                        }
                    }

                    s(n, "autoselect"), t.addEventListener("change", n), n()
                }
            });
            var Gt = u(78784), Zt = u(47458), Jt = u(54294);
            let je = null;
            document.addEventListener("keydown", function (e) {
                !e.defaultPrevented && e.key === "Escape" && je && je.removeAttribute("open")
            }), (0, d.N7)(".js-dropdown-details", {subscribe: e => (0, A.qC)((0, A.RB)(e, "toggle", Ks), (0, A.RB)(e, "toggle", zs))});

            function zs({currentTarget: e}) {
                const t = e;
                if (t.hasAttribute("open")) {
                    const n = t.querySelector("[autofocus]");
                    n && n.focus()
                } else {
                    const n = t.querySelector("summary");
                    n && n.focus()
                }
            }

            s(zs, "autofocus");

            function Ks({currentTarget: e}) {
                const t = e;
                t.hasAttribute("open") ? (je && je !== t && je.removeAttribute("open"), je = t) : t === je && (je = null)
            }

            s(Ks, "closeCurrentDetailsDropdown"), (0, d.N7)("[data-deferred-details-content-url]:not([data-details-no-preload-on-hover])", {
                subscribe: e => {
                    const t = e.querySelector("summary");
                    return (0, A.RB)(t, "mouseenter", Jt.G)
                }
            }), (0, d.N7)("[data-deferred-details-content-url]", {subscribe: e => (0, A.RB)(e, "toggle", Jt.G)}), (0, c.on)("click", "[data-toggle-for]", function (e) {
                const t = e.currentTarget.getAttribute("data-toggle-for") || "", n = document.getElementById(t);
                !n || (n.hasAttribute("open") ? n.removeAttribute("open") : n.setAttribute("open", "open"))
            }), (0, Zt.Z)(function ({target: e}) {
                if (!e || e.closest("summary")) return;
                let t = e.parentElement;
                for (; t;) t = t.closest("details"), t && (t.hasAttribute("open") || t.setAttribute("open", ""), t = t.parentElement)
            }), (0, c.on)("details-dialog-close", "[data-disable-dialog-dismiss]", function (e) {
                e.preventDefault()
            });
            var Vs = u(88309);
            (0, d.N7)("details.select-menu details-menu include-fragment", function (e) {
                const t = e.closest("details");
                !t || (e.addEventListener("loadstart", function () {
                    t.classList.add("is-loading"), t.classList.remove("has-error")
                }), e.addEventListener("error", function () {
                    t.classList.add("has-error")
                }), e.addEventListener("loadend", function () {
                    t.classList.remove("is-loading");
                    const n = t.querySelector(".js-filterable-field");
                    n && (0, c.f)(n, "filterable:change")
                }))
            }), (0, d.N7)("details details-menu .js-filterable-field", {
                constructor: HTMLInputElement, add(e) {
                    const t = e.closest("details");
                    t.addEventListener("toggle", function () {
                        t.hasAttribute("open") || (e.value = "", (0, c.f)(e, "filterable:change"))
                    })
                }
            }), (0, d.N7)("details-menu[role=menu] [role=menu]", e => {
                const t = e.closest("details-menu[role]");
                t && t !== e && t.removeAttribute("role")
            }), (0, d.N7)("details details-menu remote-input input", {
                constructor: HTMLInputElement, add(e) {
                    const t = e.closest("details");
                    t.addEventListener("toggle", function () {
                        t.hasAttribute("open") || (e.value = "")
                    })
                }
            }), (0, d.N7)("form details-menu", e => {
                const t = e.closest("form");
                t.addEventListener("reset", () => {
                    setTimeout(() => Xs(t), 0)
                })
            });

            function Xs(e) {
                const t = e.querySelectorAll("details-menu [role=menuitemradio] input[type=radio]:checked");
                for (const n of t) (0, c.f)(n, "change")
            }

            s(Xs, "resetMenus"), (0, j.w4)("keypress", "details-menu .js-filterable-field, details-menu filter-input input", e => {
                if (e.key === "Enter") {
                    const o = e.currentTarget.closest("details-menu").querySelector('[role^="menuitem"]:not([hidden])');
                    o instanceof HTMLElement && o.click(), e.preventDefault()
                }
            }), (0, c.on)("details-menu-selected", "details-menu", e => {
                const n = e.currentTarget.querySelector(".js-filterable-field");
                n instanceof HTMLInputElement && n.value && n.focus()
            }, {capture: !0}), (0, c.on)("details-menu-selected", "[data-menu-input]", e => {
                if (!(e.target instanceof Element)) return;
                const t = e.target.getAttribute("data-menu-input"), n = document.getElementById(t);
                (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && (n.value = e.detail.relatedTarget.value)
            }, {capture: !0}), (0, d.N7)("details-menu remote-input", {
                constructor: Vs.Z, initialize(e) {
                    const t = document.getElementById(e.getAttribute("aria-owns") || "");
                    if (!t) return;
                    let n = null;
                    e.addEventListener("load", () => {
                        document.activeElement && t.contains(document.activeElement) && document.activeElement.id ? n = document.activeElement.id : n = null
                    }), e.addEventListener("loadend", () => {
                        if (n) {
                            const o = t.querySelector(`#${n}`) || t.querySelector('[role^="menu"]');
                            o instanceof HTMLElement ? o.focus() : e.input && e.input.focus()
                        }
                    })
                }
            }), (0, c.on)("details-menu-selected", "details-menu[data-menu-max-options]", e => {
                const t = +e.currentTarget.getAttribute("data-menu-max-options"),
                    n = e.currentTarget.querySelectorAll('[role="menuitemcheckbox"][aria-checked="true"]'),
                    o = t === n.length;
                e.currentTarget.querySelector("[data-menu-max-options-warning]").hidden = !o;
                for (const r of e.currentTarget.querySelectorAll('[role="menuitemcheckbox"] input')) r.disabled = o && !r.checked
            }, {capture: !0}), (0, d.N7)("details > details-menu", {
                subscribe(e) {
                    const t = e.closest("details");
                    return (0, A.RB)(t, "toggle", Gs)
                }
            });

            async function Gs({currentTarget: e}) {
                const t = e, n = t.hasAttribute("open");
                (0, c.f)(t, n ? "menu:activate" : "menu:deactivate"), await (0, x.gJ)(), (0, c.f)(t, n ? "menu:activated" : "menu:deactivated")
            }

            s(Gs, "fireMenuToggleEvent"), (0, d.N7)("details > details-menu[preload]:not([src])", {
                subscribe(e) {
                    return (0, A.RB)(e.parentElement, "mouseover", function (t) {
                        const o = t.currentTarget.querySelector("include-fragment[src]");
                        o == null || o.load()
                    })
                }
            });
            const Yt = new WeakMap,
                io = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");

            function Zs(e) {
                return e instanceof HTMLInputElement ? e.value || "Submit" : e.innerHTML || ""
            }

            s(Zs, "getButtonText");

            function ao(e, t) {
                e instanceof HTMLInputElement ? e.value = t : e.innerHTML = t
            }

            s(ao, "disable_with_setButtonText"), (0, c.on)("submit", "form", function (e) {
                for (const t of e.currentTarget.querySelectorAll(io)) {
                    Yt.set(t, Zs(t));
                    const n = t.getAttribute("data-disable-with");
                    n && ao(t, n), t.disabled = !0
                }
            }, {capture: !0});

            function co(e) {
                for (const t of e.querySelectorAll(io)) {
                    const n = Yt.get(t);
                    n != null && (ao(t, n), (!t.hasAttribute("data-disable-invalid") || e.checkValidity()) && (t.disabled = !1), Yt.delete(t))
                }
            }

            s(co, "revert"), (0, c.on)("deprecatedAjaxComplete", "form", function ({currentTarget: e, target: t}) {
                e === t && co(e)
            }), (0, C.uT)(co), (0, d.N7)(".js-document-dropzone", {
                constructor: HTMLElement, add(e) {
                    document.body.addEventListener("dragstart", mo), document.body.addEventListener("dragend", ho), document.body.addEventListener("dragenter", ct), document.body.addEventListener("dragover", ct), document.body.addEventListener("dragleave", uo), e.addEventListener("drop", fo)
                }, remove(e) {
                    document.body.removeEventListener("dragstart", mo), document.body.removeEventListener("dragend", ho), document.body.removeEventListener("dragenter", ct), document.body.removeEventListener("dragover", ct), document.body.removeEventListener("dragleave", uo), e.removeEventListener("drop", fo)
                }
            });

            function lo(e) {
                return Array.from(e.types).indexOf("Files") >= 0
            }

            s(lo, "hasFile");
            let Qt = null;

            function ct(e) {
                if (en) return;
                const t = e.currentTarget;
                Qt && window.clearTimeout(Qt), Qt = window.setTimeout(() => t.classList.remove("dragover"), 200);
                const n = e.dataTransfer;
                !n || !lo(n) || (n.dropEffect = "copy", t.classList.add("dragover"), e.stopPropagation(), e.preventDefault())
            }

            s(ct, "onDragenter");

            function uo(e) {
                e.target instanceof Element && e.target.classList.contains("js-document-dropzone") && e.currentTarget.classList.remove("dragover")
            }

            s(uo, "onBodyDragleave");

            function fo(e) {
                const t = e.currentTarget;
                t.classList.remove("dragover"), document.body.classList.remove("dragover");
                const n = e.dataTransfer;
                !n || !lo(n) || ((0, c.f)(t, "document:drop", {transfer: n}), e.stopPropagation(), e.preventDefault())
            }

            s(fo, "onDrop");
            let en = !1;

            function mo() {
                en = !0
            }

            s(mo, "onDragstart");

            function ho() {
                en = !1
            }

            s(ho, "onDragend");
            var lt = u(69567);

            async function po(e, t) {
                const o = new TextEncoder().encode(t), {seal: r} = await Promise.all([u.e("vendors-node_modules_blakejs_index_js-node_modules_tweetnacl_nacl-fast_js"), u.e("_empty-file_js-app_assets_modules_github_tweetsodium_ts")]).then(u.bind(u, 42533));
                return r(o, e)
            }

            s(po, "encrypt");

            function go(e) {
                const t = atob(e).split("").map(n => n.charCodeAt(0));
                return Uint8Array.from(t)
            }

            s(go, "decode");

            function bo(e) {
                let t = "";
                for (const n of e) t += String.fromCharCode(n);
                return btoa(t)
            }

            s(bo, "encode"), (0, c.on)("submit", "form.js-encrypt-submit", async function (e) {
                const t = e.currentTarget;
                if (e.defaultPrevented || !t.checkValidity()) return;
                const n = t.elements.namedItem("secret_value");
                if (n.disabled = !0, !n.value) return;
                e.preventDefault();
                const o = go(t.getAttribute("data-public-key"));
                t.elements.namedItem("encrypted_value").value = bo(await po(o, n.value)), t.submit()
            }), (0, c.on)("submit", "form.js-encrypt-bulk-submit", yo(!0)), (0, c.on)("submit", "form.js-encrypt-bulk-submit-enable-empty", yo(!1));

            function yo(e) {
                return async function (t) {
                    const n = t.currentTarget;
                    if (t.defaultPrevented || !n.checkValidity()) return;
                    const o = go(n.getAttribute("data-public-key"));
                    t.preventDefault();
                    for (const r of n.elements) {
                        const i = r;
                        if (i.id.endsWith("secret")) {
                            if (i.disabled = !0, i.required && !i.value) {
                                const l = `${i.name} is invalid!`,
                                    y = document.querySelector("template.js-flash-template");
                                y.after(new lt.R(y, {className: "flash-error", message: l}));
                                return
                            }
                            const a = `${i.name}_encrypted_value`;
                            if (!i.value) {
                                n.elements.namedItem(a).disabled = e;
                                continue
                            }
                            n.elements.namedItem(a).value = bo(await po(o, i.value))
                        }
                    }
                    n.submit()
                }
            }

            s(yo, "submitBulk");
            var ie = u(71692);
            let ut;

            function dt(e, t) {
                const n = document.querySelector('.js-site-favicon[type="image/svg+xml"]'),
                    o = document.querySelector('.js-site-favicon[type="image/png"]');
                t || (t = "light");
                const r = t === "light" ? "" : "-dark";
                if (n && o) if (ut == null && (ut = n.href), e) {
                    e = e.substr(0, e.lastIndexOf(".")), e = `${e}${r}.svg`, n.href = e;
                    const i = n.href.substr(0, n.href.lastIndexOf("."));
                    o.href = `${i}.png`
                } else {
                    const i = n.href.indexOf("-dark.svg"), a = n.href.substr(0, i !== -1 ? i : n.href.lastIndexOf("."));
                    n.href = `${a}${r}.svg`, o.href = `${a}${r}.png`
                }
            }

            s(dt, "updateFavicon");

            function ft() {
                return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            }

            s(ft, "prefersDarkColorScheme");

            function Js() {
                ut != null && dt(ut, ft() ? "dark" : "light")
            }

            s(Js, "resetIcon");

            function vo() {
                ft() && dt(void 0, "dark")
            }

            s(vo, "updateDarkFavicon"), (0, d.N7)("[data-favicon-override]", {
                add(e) {
                    const t = e.getAttribute("data-favicon-override");
                    setTimeout(() => dt(t, ft() ? "dark" : "light"))
                }, remove() {
                    Js()
                }
            }), vo(), document.addEventListener(ie.QE.SUCCESS, vo), window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
                dt(void 0, ft() ? "dark" : "light")
            }), (0, d.N7)(".js-feature-preview-indicator-container", e => {
                Ys(e)
            });

            async function Ys(e) {
                const t = e.getAttribute("data-feature-preview-indicator-src"), n = await Qs(t),
                    o = e.querySelectorAll(".js-feature-preview-indicator");
                for (const r of o) r.hidden = !n
            }

            s(Ys, "fetchFeaturePreviewIndicator");

            async function Qs(e) {
                try {
                    const t = await fetch(e, {headers: {Accept: "application/json"}});
                    return t.ok ? (await t.json()).show_indicator : !1
                } catch {
                    return !1
                }
            }

            s(Qs, "fetchIndicator");
            var Se = u(7732), pe = u(66963);
            (0, c.on)("click", "[data-feature-preview-trigger-url]", async e => {
                const t = e.currentTarget, n = t.getAttribute("data-feature-preview-trigger-url"),
                    o = await (0, Se.W)({content: (0, pe.a)(document, n), dialogClass: "feature-preview-dialog"}),
                    r = t.getAttribute("data-feature-preview-close-details"),
                    i = t.getAttribute("data-feature-preview-close-hmac");
                o.addEventListener("dialog:remove", () => {
                    (0, he.b)({hydroEventPayload: r, hydroEventHmac: i}, !0)
                });
                const a = document.querySelectorAll(".js-feature-preview-indicator");
                for (const l of a) l.hidden = !0
            }), (0, C.AC)(".js-feature-preview-unenroll", async (e, t) => {
                await t.text();
                const n = e.querySelector(".js-feature-preview-slug").value;
                (0, c.f)(e, `feature-preview-unenroll:${n}`)
            }), (0, C.AC)(".js-feature-preview-enroll", async (e, t) => {
                await t.text();
                const n = e.querySelector(".js-feature-preview-slug").value;
                (0, c.f)(e, `feature-preview-enroll:${n}`)
            });

            class wo {
                constructor(t, n) {
                    this.attachment = t, this.policy = n
                }

                async process(t) {
                    var n, o, r, i;
                    const a = window.performance.now(), l = new Headers(this.policy.header || {}),
                        y = new XMLHttpRequest;
                    y.open("POST", this.policy.upload_url, !0);
                    for (const [H, $] of l) y.setRequestHeader(H, $);
                    y.onloadstart = () => {
                        t.attachmentUploadDidStart(this.attachment, this.policy)
                    }, y.upload.onprogress = H => {
                        if (H.lengthComputable) {
                            const $ = Math.round(H.loaded / H.total * 100);
                            t.attachmentUploadDidProgress(this.attachment, $)
                        }
                    }, await ei(y, ti(this.attachment, this.policy)), y.status === 204 ? (Eo(this.policy), t.attachmentUploadDidComplete(this.attachment, this.policy, {})) : y.status === 201 ? (Eo(this.policy), t.attachmentUploadDidComplete(this.attachment, this.policy, JSON.parse(y.responseText))) : t.attachmentUploadDidError(this.attachment, {
                        status: y.status,
                        body: y.responseText
                    });
                    const q = {
                        duration: window.performance.now() - a,
                        size: (o = (n = this.attachment) == null ? void 0 : n.file) == null ? void 0 : o.size,
                        fileType: (i = (r = this.attachment) == null ? void 0 : r.file) == null ? void 0 : i.type,
                        success: y.status === 204 || y.status === 201
                    };
                    (0, he.b)({uploadTiming: q}, !0)
                }
            }

            s(wo, "AttachmentUpload");

            function ei(e, t) {
                return new Promise((n, o) => {
                    e.onload = () => n(e), e.onerror = o, e.send(t)
                })
            }

            s(ei, "send");

            function ti(e, t) {
                const n = new FormData;
                t.same_origin && n.append("authenticity_token", t.upload_authenticity_token);
                for (const o in t.form) n.append(o, t.form[o]);
                return n.append("file", e.file), n
            }

            s(ti, "uploadForm");

            function Eo(e) {
                const t = typeof e.asset_upload_url == "string" ? e.asset_upload_url : null,
                    n = typeof e.asset_upload_authenticity_token == "string" ? e.asset_upload_authenticity_token : null;
                if (!(t && n)) return;
                const o = new FormData;
                o.append("authenticity_token", n), fetch(t, {
                    method: "PUT",
                    body: o,
                    credentials: "same-origin",
                    headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                })
            }

            s(Eo, "markComplete");

            async function ni(e, t) {
                const n = ii(e, t);
                for (const o of e.attachments) {
                    const r = await oi(e, o, t);
                    if (!r) return;
                    try {
                        await new wo(o, r).process(n)
                    } catch {
                        (0, c.f)(t, "upload:error", {batch: e, attachment: o}), Te(t, "is-failed");
                        return
                    }
                }
            }

            s(ni, "upload");

            async function oi(e, t, n) {
                const o = ri(t, n), r = [];
                (0, c.f)(n, "upload:setup", {batch: e, attachment: t, form: o, preprocess: r});
                try {
                    await Promise.all(r);
                    const i = await fetch(si(o, n));
                    if (i.ok) return await i.json();
                    (0, c.f)(n, "upload:invalid", {batch: e, attachment: t});
                    const a = await i.text(), l = i.status, {state: y, messaging: w} = Lo({status: l, body: a}, t.file);
                    Te(n, y, w)
                } catch {
                    (0, c.f)(n, "upload:invalid", {batch: e, attachment: t}), Te(n, "is-failed")
                }
                return null
            }

            s(oi, "validate");

            function ri(e, t) {
                const n = t.querySelector(".js-data-upload-policy-url-csrf").value,
                    o = t.getAttribute("data-upload-repository-id"), r = t.getAttribute("data-subject-type"),
                    i = t.getAttribute("data-subject-param"), a = e.file, l = new FormData;
                return l.append("name", a.name), l.append("size", String(a.size)), l.append("content_type", a.type), l.append("authenticity_token", n), r && l.append("subject_type", r), i && l.append("subject", i), o && l.append("repository_id", o), e.directory && l.append("directory", e.directory), l
            }

            s(ri, "policyForm");

            function si(e, t) {
                return new Request(t.getAttribute("data-upload-policy-url"), {
                    method: "POST",
                    body: e,
                    credentials: "same-origin",
                    headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                })
            }

            s(si, "policyRequest");

            function ii(e, t) {
                return {
                    attachmentUploadDidStart(n, o) {
                        n.saving(0), Te(t, "is-uploading"), (0, c.f)(t, "upload:start", {
                            batch: e,
                            attachment: n,
                            policy: o
                        })
                    }, attachmentUploadDidProgress(n, o) {
                        n.saving(o), (0, c.f)(t, "upload:progress", {batch: e, attachment: n})
                    }, attachmentUploadDidComplete(n, o, r) {
                        n.saved(ai(r, o)), (0, c.f)(t, "upload:complete", {
                            batch: e,
                            attachment: n
                        }), e.isFinished() && Te(t, "is-default")
                    }, attachmentUploadDidError(n, o) {
                        (0, c.f)(t, "upload:error", {batch: e, attachment: n});
                        const {state: r} = Lo(o);
                        Te(t, r)
                    }
                }
            }

            s(ii, "createDelegate");

            function ai(e, t) {
                const n = (e.id == null ? null : String(e.id)) || (t.asset.id == null ? null : String(t.asset.id)),
                    o = (typeof e.href == "string" ? e.href : null) || (typeof t.asset.href == "string" ? t.asset.href : null);
                return {id: n, href: o, name: t.asset.name}
            }

            s(ai, "savedAttributes");

            function Lo(e, t) {
                if (e.status === 400) return {state: "is-bad-file"};
                if (e.status !== 422) return {state: "is-failed"};
                const n = JSON.parse(e.body);
                if (!n || !n.errors) return {state: "is-failed"};
                for (const o of n.errors) switch (o.field) {
                    case"size": {
                        const r = t ? t.size : null;
                        return r != null && r === 0 ? {state: "is-empty"} : {
                            state: "is-too-big",
                            messaging: {message: ci(o.message), target: ".js-upload-too-big"}
                        }
                    }
                    case"file_count":
                        return {state: "is-too-many"};
                    case"width":
                    case"height":
                        return {state: "is-bad-dimensions"};
                    case"name":
                        return o.code === "already_exists" ? {state: "is-duplicate-filename"} : {state: "is-bad-file"};
                    case"content_type":
                        return {state: "is-bad-file"};
                    case"uploader_id":
                        return {state: "is-bad-permissions"};
                    case"repository_id":
                        return {state: "is-repository-required"};
                    case"format":
                        return {state: "is-bad-format"}
                }
                return {state: "is-failed"}
            }

            s(Lo, "policyErrorState");
            const ci = s(e => e.startsWith("size") ? e.substring(5) : e, "trimSizeErrorMessage"),
                li = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required", "is-bad-format"];

            function Te(e, t, n) {
                if (n) {
                    const {message: o, target: r} = n, i = e.querySelector(r);
                    i && (i.innerHTML = o)
                }
                e.classList.remove(...li), e.classList.add(t)
            }

            s(Te, "resetState");

            class jo {
                constructor(t) {
                    this.attachments = t, this.size = this.attachments.length, this.total = tn(this.attachments, n => n.file.size)
                }

                percent() {
                    const t = s(o => o.file.size * o.percent / 100, "bytes"), n = tn(this.attachments, t);
                    return Math.round(n / this.total * 100)
                }

                uploaded() {
                    const t = s(n => n.isSaved() ? 1 : 0, "value");
                    return tn(this.attachments, t)
                }

                isFinished() {
                    return this.attachments.every(t => t.isSaved())
                }
            }

            s(jo, "Batch");

            function tn(e, t) {
                return e.reduce((n, o) => n + t(o), 0)
            }

            s(tn, "sum"), (0, d.N7)("file-attachment[hover]", {
                add(e) {
                    e.classList.add("dragover")
                }, remove(e) {
                    e.classList.remove("dragover")
                }
            }), (0, c.on)("file-attachment-accept", "file-attachment", function (e) {
                const {attachments: t} = e.detail;
                t.length === 0 && (Te(e.currentTarget, "is-hidden-file"), e.preventDefault())
            }), (0, c.on)("file-attachment-accepted", "file-attachment", function (e) {
                const t = e.currentTarget.querySelector(".drag-and-drop");
                if (t && t.hidden) return;
                const {attachments: n} = e.detail;
                ni(new jo(n), e.currentTarget)
            });
            let So = 0;
            (0, d.N7)("file-attachment", {
                add(e) {
                    So++ === 0 && (document.addEventListener("drop", Ao), document.addEventListener("dragover", Co));
                    const t = e.closest("form");
                    t && t.addEventListener("reset", ko)
                }, remove(e) {
                    --So === 0 && (document.removeEventListener("drop", Ao), document.removeEventListener("dragover", Co));
                    const t = e.closest("form");
                    t && t.removeEventListener("reset", ko)
                }
            });

            function To(e) {
                return Array.from(e.types).indexOf("Files") >= 0
            }

            s(To, "file_attachment_hasFile");

            function Ao(e) {
                const t = e.dataTransfer;
                t && To(t) && e.preventDefault()
            }

            s(Ao, "onDocumentDrop");

            function Co(e) {
                const t = e.dataTransfer;
                t && To(t) && e.preventDefault()
            }

            s(Co, "onDocumentDragover");

            function ko({currentTarget: e}) {
                const t = e.querySelector("file-attachment");
                Te(t, "is-default")
            }

            s(ko, "onFormReset");
            var ui = u(13002);
            (0, c.on)("filter-input-updated", "filter-input", e => {
                const t = e.currentTarget.input;
                if (!(document.activeElement && document.activeElement === t)) return;
                const {count: n, total: o} = e.detail;
                (0, h.x)(`Found ${n} out of ${o} ${o === 1 ? "item" : "items"}`)
            }), (0, c.on)("toggle", "details", e => {
                setTimeout(() => di(e.target), 0)
            }, {capture: !0}), (0, c.on)("tab-container-changed", "tab-container", e => {
                if (!(e.target instanceof HTMLElement)) return;
                const {relatedTarget: t} = e.detail, n = e.target.querySelector("filter-input");
                n instanceof ui.Z && n.setAttribute("aria-owns", t.id)
            }, {capture: !0});

            function di(e) {
                const t = e.querySelector("filter-input");
                t && !e.hasAttribute("open") && t.reset()
            }

            s(di, "resetFilter");

            function xo(e, t, n, o = {}) {
                var r;
                const i = (r = o.limit) != null ? r : 1 / 0;
                let a = 0;
                for (const l of e.children) {
                    const y = n(l, t);
                    y == null || (y && a < i ? (a++, Mo(l, !0)) : Mo(l, !1))
                }
                return a
            }

            s(xo, "filterList");

            function Mo(e, t) {
                e.style.display = t ? "" : "none", e.hidden = !t
            }

            s(Mo, "toggle");
            var Ae = u(18943), Ge = u(18654);
            const qo = new WeakMap;

            function fi(e, t, n) {
                const o = t.toLowerCase(), r = n.limit;
                let i = qo.get(e);
                const a = e.querySelector('input[type="radio"]:checked'), l = Array.from(e.children);
                i || (i = Array.from(e.children), qo.set(e, i));
                for (const V of l) e.removeChild(V), V instanceof HTMLElement && (V.style.display = "");
                const y = o ? (0, Ge.W)(i, n.sortKey, Ae.qu) : i, w = r == null ? y : y.slice(0, r), S = w.length,
                    q = document.createDocumentFragment();
                for (const V of w) q.appendChild(V);
                let H = !1;
                if (a instanceof HTMLInputElement) for (const V of q.querySelectorAll('input[type="radio"]:checked')) V instanceof HTMLInputElement && V.value !== a.value && (V.checked = !1, H = !0);
                e.appendChild(q), a && H && a.dispatchEvent(new Event("change", {bubbles: !0}));
                const $ = e.querySelectorAll(".js-divider");
                for (const V of $) V.classList.toggle("d-none", Boolean(o && o.trim().length > 0));
                return S
            }

            s(fi, "filterSortList");
            var nn = u(96867);
            let on = new AbortController;
            const Ze = new WeakMap, Ro = new WeakMap, Po = new WeakMap;

            async function mi(e, t, n, o) {
                n && !Ze.has(e) && gi(e);
                const r = await hi(e, t, n, o);
                return e.hasAttribute("data-filterable-data-pre-rendered") && (r.suggestions = pi(e, n)), r
            }

            s(mi, "getData");

            async function hi(e, t, n, o) {
                const r = new URL(e.getAttribute("data-filterable-src") || "", window.location.origin);
                if (r.pathname === "/") throw new Error("could not get data-filterable-src");
                if (n) {
                    const i = Ze.get(e), a = t.trim();
                    if (i.lastSearchText === a) return i.lastSearchResult;
                    const l = i.lastSearchText === void 0;
                    i.lastSearchText = a;
                    const y = e.getAttribute("data-filterable-for") || "", w = document.getElementById(y);
                    if (on.abort(), a === "" && !o) i.lastSearchResult = {suggestions: [], users: []}; else {
                        on = new AbortController;
                        const S = {
                            headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"},
                            signal: on.signal
                        }, q = r.searchParams || new URLSearchParams;
                        q.set("q", t), q.set("typeAhead", "true"), r.search = q.toString(), l || w == null || w.classList.add("is-loading");
                        const H = await fetch(r.toString(), S);
                        i.lastSearchResult = await H.json()
                    }
                    return w == null || w.classList.remove("is-loading"), i.lastSearchResult
                } else {
                    const i = {headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}};
                    return await (await fetch(r.toString(), i)).json()
                }
            }

            s(hi, "fetchQueryIfNeeded");

            function pi(e, t) {
                const n = [], o = e.querySelectorAll(".js-filterable-suggested-user");
                if (o.length > 0) for (const r of e.querySelectorAll(".js-filterable-suggested-user")) r.classList.remove("js-filterable-suggested-user"), n.push({
                    name: r.querySelector(".js-description").textContent,
                    login: r.querySelector(".js-username").textContent,
                    selected: r.getAttribute("aria-checked") === "true",
                    element: r,
                    suggestion: !0
                });
                if (t) {
                    const r = Ze.get(e);
                    return o.length > 0 && (r.cachedSuggestions = n, r.userResultCache.clear()), r.cachedSuggestions
                }
                return n
            }

            s(pi, "getPreRenderedUsers");

            function gi(e) {
                Ze.set(e, {
                    lastSearchResult: {suggestions: [], users: []},
                    cachedSuggestions: [],
                    userResultCache: new Map
                })
            }

            s(gi, "initializeTypeAheadCache");

            async function bi(e, t, n) {
                var o, r;
                Po.set(e, t), await (0, nn.Z)();
                const i = e.hasAttribute("data-filterable-show-suggestion-header"),
                    a = e.hasAttribute("data-filterable-type-ahead"),
                    l = e.hasAttribute("data-filterable-type-ahead-query-on-empty");
                let y = Ro.get(e);
                if (!y) try {
                    y = await mi(e, t, a, l), a || Ro.set(e, y)
                } catch (B) {
                    if (B.name === "AbortError") return -1;
                    throw B
                }
                if (!a && Po.get(e) !== t) return -1;
                const w = n.limit, S = e.querySelector("template"), q = {};
                for (const B of e.querySelectorAll("input[type=hidden]")) q[`${B.name}${B.value}`] = B;
                let H = S.nextElementSibling;
                for (; H;) {
                    const B = H;
                    H = B.nextElementSibling, B instanceof HTMLElement && (a || B.getAttribute("aria-checked") === "true" || B.classList.contains("select-menu-divider")) ? B.hidden = !0 : B.remove()
                }
                let $ = 0;
                const V = t.trim() === "", Q = document.createDocumentFragment(),
                    Y = e.querySelector(".js-divider-suggestions"), oe = e.querySelector(".js-divider-rest"),
                    le = Ze.get(e);

                function ue(B) {
                    const G = `${B.login} ${B.name}`.toLowerCase().trim().includes(t), z = !(w != null && $ >= w) && G;
                    if (z || B.selected || B.suggestion) {
                        const Z = yi(B, S, q, le);
                        Z.hidden = !z, z && $++, Q.appendChild(Z)
                    }
                }

                s(ue, "addItem");
                let ee = !1;
                if (Y && (((o = y.suggestions) == null ? void 0 : o.length) > 0 || i && y.users.length > 0)) {
                    const B = (r = y.suggestions) != null ? r : [], G = B.filter(Z => Z.selected),
                        z = B.filter(Z => !Z.selected);
                    for (const Z of G) ue(Z);
                    Q.appendChild(Y);
                    const te = $;
                    for (const Z of z) ue(Z);
                    ee = $ > te, Y.hidden = !ee || a && !V, i && y.users.length > 0 && (Y.hidden = !V)
                }
                oe && Q.appendChild(oe);
                const He = $;
                for (const B of y.users) ue(B);
                return oe && (oe.hidden = He === $ || !ee), e.append(Q), $
            }

            s(bi, "substringMemoryFilterList");

            function yi(e, t, n, o) {
                if (e.element != null) return e.element;
                if (o == null ? void 0 : o.userResultCache.has(e.id)) return o.userResultCache.get(e.id);
                const r = t.content.cloneNode(!0), i = r.querySelector("input[type=checkbox], input[type=radio]");
                e.type && (i.name = `reviewer_${e.type}_ids[]`), i.value = e.id;
                const a = `${i.name}${e.id}`;
                let l = e.selected;
                n[a] && (l = !0, n[a].remove(), delete n[a]);
                const y = r.querySelector("[role^=menuitem]");
                l && (y.setAttribute("aria-checked", "true"), i.checked = !0), e.disabled && y.setAttribute("aria-disabled", "true");
                const w = r.querySelector(".js-username");
                w && (w.textContent = e.login);
                const S = r.querySelector(".js-description");
                S && (S.textContent = e.name);
                const q = r.querySelector(".js-extended-description");
                q && (e.description ? q.textContent = e.description : q.remove());
                const H = r.querySelector(".js-avatar");
                return H.className = `${H.className} ${e.class}`, H.src = e.avatar, e.element = y, o == null || o.userResultCache.set(e.id, y), e.element
            }

            s(yi, "createReviewerItem"), (0, d.N7)(".js-filterable-field", {
                constructor: HTMLInputElement,
                initialize(e) {
                    e.autocomplete || (e.autocomplete = "off");
                    const t = e.hasAttribute("type-ahead") ? 200 : null;
                    let n = e.value;

                    async function o(i) {
                        n !== i.value && (n = i.value, await (0, x.gJ)(), (0, c.f)(i, "filterable:change"))
                    }

                    s(o, "onInputChange");

                    async function r() {
                        n = e.value, await (0, x.gJ)(), (0, c.f)(e, "filterable:change")
                    }

                    return s(r, "onFocus"), {
                        add(i) {
                            i.addEventListener("focus", r), (0, ne.oq)(i, o, {wait: t}), document.activeElement === i && r()
                        }, remove(i) {
                            i.removeEventListener("focus", r), (0, ne.iU)(i, o)
                        }
                    }
                }
            }), (0, c.on)("filterable:change", ".js-filterable-field", async function (e) {
                const t = e.currentTarget, n = t.value.trim().toLowerCase(),
                    o = document.querySelectorAll(`[data-filterable-for="${t.id}"]`);
                for (const r of o) {
                    const i = await wi(r, n);
                    if (i === -1) return;
                    document.activeElement && t === document.activeElement && (0, h.x)(`${i} results found.`), r.dispatchEvent(new CustomEvent("filterable:change", {
                        bubbles: !0,
                        cancelable: !1,
                        detail: {inputField: t}
                    }))
                }
            });

            function vi(e) {
                return e.hasAttribute("data-filter-value") ? e.getAttribute("data-filter-value").toLowerCase().trim() : e.textContent.toLowerCase().trim()
            }

            s(vi, "defaultText");

            async function wi(e, t) {
                const n = parseInt(e.getAttribute("data-filterable-limit"), 10) || null;
                let o = 0;
                switch (e.getAttribute("data-filterable-type")) {
                    case"fuzzy": {
                        const r = t.toLowerCase();
                        o = fi(e, t, {
                            limit: n, sortKey: s(a => {
                                const l = vi(a), y = (0, Ae.EW)(l, r);
                                return y > 0 ? {score: y, text: l} : null
                            }, "sortKey")
                        });
                        break
                    }
                    case"substring":
                        o = xo(e, t.toLowerCase(), Li, {limit: n});
                        break;
                    case"substring-memory":
                        o = await bi(e, t, {limit: n});
                        break;
                    default:
                        o = xo(e, t.toLowerCase(), Ei, {limit: n});
                        break
                }
                return e.classList.toggle("filterable-active", t.length > 0), e.classList.toggle("filterable-empty", o === 0), o
            }

            s(wi, "filter");

            function Ei(e, t) {
                return e.textContent.toLowerCase().trim().startsWith(t)
            }

            s(Ei, "prefix");

            function Li(e, t) {
                return e.hasAttribute("data-skip-substring-filter") || e.classList.contains("select-menu-no-results") ? null : (e.querySelector("[data-filterable-item-text]") || e).textContent.toLowerCase().trim().includes(t)
            }

            s(Li, "substring"), (0, c.on)("filterable:change", "details-menu .select-menu-list", function (e) {
                const t = e.currentTarget, n = t.querySelector(".js-new-item-form");
                n && ji(t, n, e.detail.inputField.value)
            });

            function ji(e, t, n) {
                const o = n.length > 0 && !Si(e, n);
                if (e.classList.toggle("is-showing-new-item-form", o), !o) return;
                t.querySelector(".js-new-item-name").textContent = n;
                const r = t.querySelector(".js-new-item-value");
                (r instanceof HTMLInputElement || r instanceof HTMLButtonElement) && (r.value = n)
            }

            s(ji, "toggleForm");

            function Si(e, t) {
                for (const n of e.querySelectorAll("[data-menu-button-text]")) if (n.textContent.toLowerCase().trim() === t.toLowerCase()) return !0;
                return !1
            }

            s(Si, "itemExists"), (0, d.N7)("tab-container .select-menu-list .filterable-empty, details-menu .select-menu-list .filterable-empty", {
                add(e) {
                    e.closest(".select-menu-list").classList.add("filterable-empty")
                }, remove(e) {
                    e.closest(".select-menu-list").classList.remove("filterable-empty")
                }
            });
            const _o = navigator.userAgent.match(/Firefox\/(\d+)/);
            _o && Number(_o[1]) < 76 && ((0, d.N7)('details-menu label[tabindex][role^="menuitem"]', e => {
                const t = e.querySelector("input");
                if (!t) return;
                const n = e.classList.contains("select-menu-item"), o = t.classList.contains("d-none"),
                    r = n || o || t.hidden;
                n && t.classList.add("d-block"), o && t.classList.remove("d-none"), r && (t.classList.add("sr-only"), t.hidden = !1), e.removeAttribute("tabindex")
            }), (0, c.on)("focus", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', e => {
                const t = e.currentTarget.closest("label");
                t.classList.contains("select-menu-item") && t.classList.add("navigation-focus"), t.classList.contains("SelectMenu-item") && t.classList.add("hx_menuitem--focus"), t.classList.contains("dropdown-item") && t.classList.add("hx_menuitem--focus"), e.currentTarget.addEventListener("blur", () => {
                    t.classList.contains("select-menu-item") && t.classList.remove("navigation-focus"), t.classList.contains("SelectMenu-item") && t.classList.remove("hx_menuitem--focus"), t.classList.contains("dropdown-item") && t.classList.remove("hx_menuitem--focus")
                }, {once: !0})
            }, {capture: !0}), (0, j.w4)("keydown", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', async function (e) {
                if (Io(e)) e.currentTarget instanceof Element && Ti(e.currentTarget); else if (e.key === "Enter") {
                    const t = e.currentTarget;
                    e.preventDefault(), await (0, x.gJ)(), t instanceof HTMLInputElement && t.click()
                }
            }), (0, c.on)("blur", 'details-menu label input[role="menuitemradio"], details-menu label input[role="menuitemcheckbox"]', e => {
                Do(e.currentTarget)
            }, {capture: !0}), (0, j.w4)("keyup", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', e => {
                !Io(e) || e.currentTarget instanceof Element && Do(e.currentTarget)
            }));

            function Io(e) {
                return e.key === "ArrowDown" || e.key === "ArrowUp"
            }

            s(Io, "isArrowKeys");

            function Ti(e) {
                const t = e.closest("label");
                t.hasAttribute("data-role") || t.setAttribute("data-role", t.getAttribute("role")), e.setAttribute("role", t.getAttribute("data-role")), t.removeAttribute("role")
            }

            s(Ti, "switchRoleToInputForNavigation");

            function Do(e) {
                const t = e.closest("label");
                t.hasAttribute("data-role") || t.setAttribute("data-role", t.getAttribute("role")), t.setAttribute("role", t.getAttribute("data-role")), e.removeAttribute("role")
            }

            s(Do, "switchRoleBackToOriginalState");
            var rn = u(83151);

            function Ho() {
                document.firstElementChild.classList.contains("js-skip-scroll-target-into-view") || (0, rn.lA)(document) && (0, rn.kc)(document)
            }

            s(Ho, "scrollTargetIntoViewIfNeeded"), (0, Zt.Z)(Ho), (0, c.on)("click", 'a[href^="#"]', function (e) {
                const {currentTarget: t} = e;
                t instanceof HTMLAnchorElement && setTimeout(Ho, 0)
            }), (0, c.on)("click", ".js-flash-close", function (e) {
                const t = e.currentTarget.closest(".flash-messages");
                e.currentTarget.closest(".flash").remove(), t && !t.querySelector(".flash") && t.remove()
            });
            const Ai = ["flash-notice", "flash-error", "flash-message", "flash-warn"];

            function Ci(e) {
                for (const {key: t, value: n} of Ai.flatMap(Ve.$1)) {
                    (0, Ve.kT)(t);
                    let o;
                    try {
                        o = atob(decodeURIComponent(n))
                    } catch {
                        continue
                    }
                    e.after(new lt.R(e, {className: t, message: o}))
                }
            }

            s(Ci, "displayFlash"), (0, d.N7)("template.js-flash-template", {
                constructor: HTMLTemplateElement, add(e) {
                    Ci(e)
                }
            });
            const sn = new WeakMap;
            document.addEventListener("focus", function (e) {
                const t = e.target;
                t instanceof Element && !sn.get(t) && ((0, c.f)(t, "focusin:delay"), sn.set(t, !0))
            }, {capture: !0}), document.addEventListener("blur", function (e) {
                setTimeout(function () {
                    const t = e.target;
                    t instanceof Element && t !== document.activeElement && ((0, c.f)(t, "focusout:delay"), sn.delete(t))
                }, 200)
            }, {capture: !0}), (0, C.AC)(".js-form-toggle-target", async function (e, t) {
                try {
                    await t.text()
                } catch {
                    return
                }
                const n = e.closest(".js-form-toggle-container");
                n.querySelector(".js-form-toggle-target[hidden]").hidden = !1, e.hidden = !0
            });
            var ki = u(70462);

            function xi(e) {
                e instanceof CustomEvent && (0, h.x)(`${e.detail} results found.`)
            }

            s(xi, "noticeHandler"), (0, d.N7)("fuzzy-list", {
                constructor: ki.Z,
                subscribe: e => (0, A.RB)(e, "fuzzy-list-sorted", xi)
            }), (0, c.on)("click", ".email-hidden-toggle", function (e) {
                const t = e.currentTarget.nextElementSibling;
                t instanceof HTMLElement && (t.style.display = "", t.classList.toggle("expanded"), e.preventDefault())
            });
            var au = u(52694);
            (0, d.N7)(".js-hook-url-field", {
                constructor: HTMLInputElement, add(e) {
                    function t() {
                        const n = e.form;
                        if (!n) return;
                        let o;
                        try {
                            o = new URL(e.value)
                        } catch {
                        }
                        const r = n.querySelector(".js-invalid-url-notice");
                        r instanceof HTMLElement && (r.hidden = !!(e.value === "" || o && /^https?:/.test(o.protocol)));
                        const i = n.querySelector(".js-insecure-url-notice");
                        i instanceof HTMLElement && o && e.value && (i.hidden = /^https:$/.test(o.protocol));
                        const a = n.querySelector(".js-ssl-hook-fields");
                        a instanceof HTMLElement && (a.hidden = !(o && o.protocol === "https:"))
                    }

                    s(t, "checkUrl"), (0, ne.oq)(e, t), t()
                }
            });

            function Oo(e) {
                const t = document.querySelectorAll(".js-hook-event-checkbox");
                for (const n of t) n.checked = n.matches(e)
            }

            s(Oo, "chooseEvents"), (0, c.on)("change", ".js-hook-event-choice", function (e) {
                const t = e.currentTarget, n = t.checked && t.value === "custom",
                    o = t.closest(".js-hook-events-field");
                if (o && o.classList.toggle("is-custom", n), t.checked) if (n) {
                    const r = document.querySelector(".js-hook-wildcard-event");
                    r.checked = !1
                } else t.value === "push" ? Oo('[value="push"]') : t.value === "all" && Oo(".js-hook-wildcard-event")
            }), (0, c.on)("click", ".js-hook-deliveries-pagination-button", async function (e) {
                const t = e.currentTarget;
                t.disabled = !0;
                const n = t.parentElement, o = t.getAttribute("data-url");
                n.before(await (0, pe.a)(document, o)), n.remove()
            }), (0, C.AC)(".js-redeliver-hook-form", async function (e, t) {
                let n;
                try {
                    n = await t.html()
                } catch {
                    e.classList.add("failed");
                    return
                }
                document.querySelector(".js-hook-deliveries-container").replaceWith(n.html)
            });
            var $e = u(11793);
            (0, d.N7)("[data-hotkey]", {
                constructor: HTMLElement, add(e) {
                    if ((0, at.Ty)()) (0, $e.N9)(e); else {
                        const t = e.getAttribute("data-hotkey");
                        if (t) {
                            const n = Mi(t);
                            n.length > 0 && (e.setAttribute("data-hotkey", n), (0, $e.N9)(e))
                        }
                    }
                }, remove(e) {
                    (0, $e.Tz)(e)
                }
            });

            function Mi(e) {
                return e.split(",").filter(n => (0, at.YE)(n)).join(",")
            }

            s(Mi, "filterOutCharacterKeyShortcuts");
            var an = u(91385);
            let re = document.querySelector(".js-hovercard-content");
            (0, d.N7)(".js-hovercard-content", e => {
                re = e
            });
            const qi = (0, qe.Z)(pe.a);
            let Ce, mt = null, cn, ln = 0;
            const un = 12, dn = 24, No = dn - 7, Bo = 16, Ri = 100, Pi = 250;

            function Re(e) {
                return "Popover-message--" + e
            }

            s(Re, "contentClass");

            function _i(e) {
                setTimeout(() => {
                    if (document.body && document.body.contains(e)) {
                        const t = e.querySelector("[data-hovercard-tracking]");
                        if (t) {
                            const o = t.getAttribute("data-hovercard-tracking");
                            o && (0, R.q)("user-hovercard-load", JSON.parse(o))
                        }
                        const n = e.querySelector("[data-hydro-view]");
                        n instanceof HTMLElement && (0, an.Fk)(n)
                    }
                }, 500)
            }

            s(_i, "trackLoad");

            function Fe() {
                re instanceof HTMLElement && (re.style.display = "none", re.children[0].innerHTML = "", mt = null, Ce = null)
            }

            s(Fe, "hideCard");

            function Ii(e) {
                const t = e.getClientRects();
                let n = t[0] || e.getBoundingClientRect() || {top: 0, left: 0, height: 0, width: 0};
                if (t.length > 0) {
                    for (const o of t) if (o.left < ln && o.right > ln) {
                        n = o;
                        break
                    }
                }
                return n
            }

            s(Ii, "selectRectNearestMouse");

            function Di(e) {
                const {width: t, height: n} = re.getBoundingClientRect(), {
                    left: o,
                    top: r,
                    height: i,
                    width: a
                } = Ii(e), l = r > n;
                if (e.classList.contains("js-hovercard-left")) {
                    const w = o - t - un, S = r + i / 2;
                    return {
                        containerTop: l ? S - n + No + Bo / 2 : S - No - Bo / 2,
                        containerLeft: w,
                        contentClassSuffix: l ? "right-bottom" : "right-top"
                    }
                } else {
                    const w = window.innerWidth - o > t, S = o + a / 2, q = w ? S - dn : S - t + dn;
                    return {
                        containerTop: l ? r - n - un : r + i + un,
                        containerLeft: q,
                        contentClassSuffix: l ? w ? "bottom-left" : "bottom-right" : w ? "top-left" : "top-right"
                    }
                }
            }

            s(Di, "calculatePositions");

            function Hi(e, t) {
                if (!(re instanceof HTMLElement)) return;
                re.style.visibility = "hidden", re.style.display = "block", t.classList.remove(Re("bottom-left"), Re("bottom-right"), Re("right-top"), Re("right-bottom"), Re("top-left"), Re("top-right"));
                const {containerTop: n, containerLeft: o, contentClassSuffix: r} = Di(e);
                t.classList.add(Re(r)), re.style.top = `${n + window.pageYOffset}px`, re.style.left = `${o + window.pageXOffset}px`, Ki(e, re), re.style.visibility = ""
            }

            s(Hi, "positionCard");

            function Oi(e, t) {
                if (!(re instanceof HTMLElement)) return;
                const n = re.children[0];
                n.innerHTML = "";
                const o = document.createElement("div");
                for (const r of e.children) o.appendChild(r.cloneNode(!0));
                n.appendChild(o), Hi(t, n), _i(o), re.style.display = "block"
            }

            s(Oi, "showCard");

            function Ni(e) {
                const t = e.closest("[data-hovercard-subject-tag]");
                if (t) return t.getAttribute("data-hovercard-subject-tag");
                const n = document.head && document.head.querySelector('meta[name="hovercard-subject-tag"]');
                return n ? n.getAttribute("content") : null
            }

            s(Ni, "determineEnclosingSubject");

            function Bi(e) {
                const t = e.getAttribute("data-hovercard-url");
                if (t) {
                    const n = Ni(e);
                    if (n) {
                        const o = new URL(t, window.location.origin), r = new URLSearchParams(o.search.slice(1));
                        return r.append("subject", n), r.append("current_path", window.location.pathname + window.location.search), o.search = r.toString(), o.toString()
                    }
                    return t
                }
                return ""
            }

            s(Bi, "hovercardUrlFromTarget");

            function $i(e) {
                const t = e.getAttribute("data-hovercard-type");
                return t === "pull_request" || t === "issue" ? !!e.closest("[data-issue-and-pr-hovercards-enabled]") : t === "team" ? !!e.closest("[data-team-hovercards-enabled]") : t === "repository" ? !!e.closest("[data-repository-hovercards-enabled]") : t === "commit" ? !!e.closest("[data-commit-hovercards-enabled]") : t === "project" ? !!e.closest("[data-project-hovercards-enabled]") : t === "discussion" ? !!e.closest("[data-discussion-hovercards-enabled]") : t === "acv_badge" ? !!e.closest("[data-acv-badge-hovercards-enabled]") : t === "sponsors_listing" ? !!e.closest("[data-sponsors-listing-hovercards-enabled]") : !0
            }

            s($i, "hovercardsAreEnabledForType");

            async function Fi(e, t) {
                if ("ontouchstart" in document) return;
                const o = e.currentTarget;
                if (e instanceof MouseEvent && (ln = e.clientX), !(o instanceof Element) || Ce === o || o.closest(".js-hovercard-content") || !$i(o)) return;
                Fe(), Ce = o, mt = document.activeElement;
                const r = Bi(o);
                let i;
                try {
                    const a = new Promise(l => window.setTimeout(l, t, 0));
                    i = await qi(document, r), await a
                } catch (a) {
                    const l = a.response;
                    if (l && l.status === 404) {
                        const y = "Hovercard is unavailable";
                        o.setAttribute("aria-label", y), o.classList.add("tooltipped", "tooltipped-ne")
                    } else if (l && l.status === 410) {
                        const y = await l.clone().json();
                        o.setAttribute("aria-label", y.message), o.classList.add("tooltipped", "tooltipped-ne")
                    }
                    return
                }
                o === Ce && (Oi(i, o), e instanceof KeyboardEvent && re instanceof HTMLElement && re.focus())
            }

            s(Fi, "activateFn");

            function Ui(e) {
                Fi(e, Pi)
            }

            s(Ui, "activateWithTimeoutFn");

            function fn(e) {
                if (!!Ce) {
                    if (e instanceof MouseEvent && e.relatedTarget instanceof HTMLElement) {
                        const t = e.relatedTarget;
                        if (t.closest(".js-hovercard-content") || t.closest("[data-hovercard-url]")) return
                    } else e instanceof KeyboardEvent && mt instanceof HTMLElement && mt.focus();
                    Fe()
                }
            }

            s(fn, "deactivateFn");

            function Wi(e) {
                const t = Ce;
                cn = window.setTimeout(() => {
                    Ce === t && fn(e)
                }, Ri)
            }

            s(Wi, "deactivateWithTimeoutFn");

            function $o(e) {
                if (e instanceof KeyboardEvent) switch (e.key) {
                    case"Escape":
                        fn(e)
                }
            }

            s($o, "keyupFn");

            function zi() {
                cn && clearTimeout(cn)
            }

            s(zi, "cancelDeactivation"), re && ((0, d.N7)("[data-hovercard-url]", {subscribe: e => (0, A.qC)((0, A.RB)(e, "mouseover", Ui), (0, A.RB)(e, "mouseleave", Wi), (0, A.RB)(e, "keyup", $o))}), (0, d.N7)("[data-hovercard-url]", {
                remove(e) {
                    Ce === e && Fe()
                }
            }), (0, d.N7)(".js-hovercard-content", {subscribe: e => (0, A.qC)((0, A.RB)(e, "mouseover", zi), (0, A.RB)(e, "mouseleave", fn), (0, A.RB)(e, "keyup", $o))}), (0, c.on)("menu:activated", "details", Fe), window.addEventListener("turbo:load", Fe), window.addEventListener("statechange", Fe));

            function Ki(e, t) {
                const n = e.getAttribute("data-hovercard-z-index-override");
                n ? t.style.zIndex = n : t.style.zIndex = "100"
            }

            s(Ki, "setZIndexOverride"), async function () {
                document.addEventListener("pjax:complete", () => (0, R.Y)({pjax: "true"})), document.addEventListener("soft-nav:success", () => (0, R.Y)({turbo: "true"})), await ye.C, (0, R.Y)()
            }(), (0, c.on)("click", "[data-octo-click]", function (e) {
                const t = e.currentTarget;
                if (!(t instanceof HTMLElement)) return;
                const n = t.getAttribute("data-octo-click") || "", o = {};
                if (t.hasAttribute("data-ga-click")) {
                    const i = t.getAttribute("data-ga-click").split(",");
                    o.category = i[0].trim(), o.action = i[1].trim()
                }
                if (t.hasAttribute("data-octo-dimensions")) {
                    const r = t.getAttribute("data-octo-dimensions").split(",");
                    for (const i of r) {
                        const [a, l] = i.split(/:(.+)/);
                        a && (o[a] = l || "")
                    }
                }
                (0, R.q)(n, o)
            });
            var Fo = u(31579);
            const {getItem: lu} = (0, Fo.Z)("localStorage");

            function Uo(e, t) {
                var n, o
            }

            s(Uo, "debugPayload"), (0, c.on)("click", "[data-hydro-click]", function (e) {
                const t = e.currentTarget, n = t.getAttribute("data-hydro-click") || "",
                    o = t.getAttribute("data-hydro-click-hmac") || "",
                    r = t.getAttribute("data-hydro-client-context") || "";
                Uo("hydro-debug.click", n), (0, an.$S)(n, o, r)
            }), (0, c.on)("click", "[data-optimizely-hydro-click]", function (e) {
                const t = e.currentTarget, n = t.getAttribute("data-optimizely-hydro-click") || "",
                    o = t.getAttribute("data-optimizely-hydro-click-hmac") || "";
                Uo("hydro-debug.optimizely", n), (0, an.$S)(n, o, "")
            }), (0, C.AC)(".js-immediate-updates", async function (e, t) {
                let n;
                try {
                    n = (await t.json()).json.updateContent
                } catch (o) {
                    o.response.json && (n = o.response.json.updateContent)
                }
                if (n) for (const o in n) {
                    const r = n[o], i = document.querySelector(o);
                    i instanceof HTMLElement && (0, Me.Of)(i, r)
                }
            }), document.addEventListener("DOMContentLoaded", Vi);

            async function Vi() {
                if ((0, U.c)("IMAGE_METRIC_TRACKING") === !1) return;
                const e = Array.from(document.querySelectorAll("img.js-img-time")).slice(0, 5), t = Date.now(), n = [];
                await Promise.all(e.map(o => Xi(o, t, n))), n.length > 0 && (0, he.b)({transparentRedirectTimings: n})
            }

            s(Vi, "onDOMContentLoaded");

            async function Xi(e, t, n) {
                const o = /\/assets\/storage\/user\/([0-9]+)\/files\/([{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?)/,
                    r = /assets\/([0-9]+)\/([{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?)/,
                    i = e.getAttribute("src");
                if (!i) return;
                const a = new URL(i, window.location.origin),
                    l = o.test(a.pathname) ? o : r, [, y, w] = a.pathname.match(l) || [];
                if (!y || !w) return;
                await fetch(`/assets/measure/${y}/${w}`);
                const q = {duration: Date.now() - t, fileGUID: w, userID: y};
                n.push(q)
            }

            s(Xi, "measureRedirectTiming"), (0, d.N7)("[data-indeterminate]", {
                constructor: HTMLInputElement,
                initialize(e) {
                    e.indeterminate = !0
                }
            });
            var Gi = u(86124);

            function Zi() {
                u.e("app_assets_modules_github_jump-to_ts").then(u.bind(u, 18665))
            }

            s(Zi, "load"), (0, d.N7)(".js-jump-to-field", {
                constructor: HTMLInputElement, add(e) {
                    e.addEventListener("focusin", Zi, {once: !0}), (0, Gi.Nc)(window.location.pathname)
                }
            });
            let mn = !1;

            async function Wo() {
                if (mn) return;
                mn = !0;
                const t = {contexts: document.querySelector("meta[name=github-keyboard-shortcuts]").content},
                    n = `/site/keyboard_shortcuts?${new URLSearchParams(t).toString()}`,
                    o = await (0, Se.W)({content: (0, pe.a)(document, n), labelledBy: "keyboard-shortcuts-heading"});
                o.style.width = "800px", o.addEventListener("dialog:remove", function () {
                    mn = !1
                }, {once: !0})
            }

            s(Wo, "showKeyboardShortcuts"), (0, c.on)("click", ".js-keyboard-shortcuts", Wo), document.addEventListener("keydown", e => {
                e instanceof KeyboardEvent && (!(0, at.Zf)(e) || e.target instanceof Node && (0, L.sw)(e.target) || (0, $e.EL)(e) === "Shift+?" && Wo())
            }), (0, d.N7)(".js-modifier-key", {
                constructor: HTMLElement, add(e) {
                    if (/Macintosh/.test(navigator.userAgent)) {
                        let t = e.textContent;
                        t && (t = t.replace(/ctrl/, "\u2318"), t = t.replace(/alt/, "\u2325"), e.textContent = t)
                    }
                }
            }), (0, d.N7)(".js-modifier-label-key", {
                add(e) {
                    var t;
                    let n = (t = e.textContent) == null ? void 0 : t.replace(/ctrl/i, "Ctrl");
                    !n || (/Macintosh/.test(navigator.userAgent) && (n = n.replace(/ctrl/i, "Cmd"), n = n.replace(/alt/i, "Option")), e.textContent = n)
                }
            });

            function ht(e) {
                const t = e.currentTarget;
                if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
                const n = parseInt(t.getAttribute("data-input-max-length") || "", 10),
                    o = parseInt(t.getAttribute("data-warning-length") || "", 10) || 5,
                    i = t.value.replace(/(\r\n|\n|\r)/g, `\r
`);
                let a = n - i.length;
                if (a <= 0) {
                    let S = i.substr(0, n);
                    S.endsWith("\r") ? (S = S.substr(0, n - 1), a = 1) : a = 0, t.value = S
                }
                const l = t.getAttribute("data-warning-text"),
                    w = t.closest(".js-length-limited-input-container").querySelector(".js-length-limited-input-warning");
                a <= o ? (w.textContent = l.replace(new RegExp("{{remaining}}", "g"), `${a}`), w.classList.remove("d-none")) : (w.textContent = "", w.classList.add("d-none"))
            }

            s(ht, "displayLengthWarning"), (0, d.N7)(".js-length-limited-input", {
                add(e) {
                    e.addEventListener("input", ht), e.addEventListener("change", ht)
                }, remove(e) {
                    e.removeEventListener("input", ht), e.removeEventListener("change", ht)
                }
            }), (0, c.on)("click", ".js-member-search-filter", function (e) {
                e.preventDefault();
                const t = e.currentTarget.getAttribute("data-filter"),
                    o = e.currentTarget.closest("[data-filter-on]").getAttribute("data-filter-on"),
                    r = document.querySelector(".js-member-filter-field"), i = r.value,
                    a = new RegExp(`${o}:(?:[a-z]|_|((').*(')))+`), l = i.toString().trim().replace(a, "");
                r.value = `${l} ${t}`.replace(/\s\s/, " ").trim(), r.focus(), (0, c.f)(r, "input")
            }), (0, c.on)("auto-check-success", ".js-new-organization-name", function (e) {
                const t = e.target, o = t.closest("dd").querySelector(".js-field-hint-name");
                !o || (o.textContent = t.value)
            }), (0, C.AC)(".js-notice-dismiss", async function (e, t) {
                await t.text(), e.closest(".js-notice").remove()
            }), (0, c.on)("submit", ".js-notice-dismiss-remote", async function (e) {
                const t = e.currentTarget;
                e.preventDefault();
                let n;
                try {
                    n = await fetch(t.action, {
                        method: t.method,
                        body: new FormData(t),
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    })
                } catch {
                    (0, T.v)();
                    return
                }
                n && !n.ok ? (0, T.v)() : t.closest(".js-notice").remove()
            });

            function Ji(e) {
                try {
                    const t = e.getBoundingClientRect();
                    if (t.height === 0 && t.width === 0 || e.style.opacity === "0" || e.style.visibility === "hidden") return !1
                } catch {
                }
                return !0
            }

            s(Ji, "isVisible"), (0, c.on)("click", ".js-github-dev-shortcut", function (e) {
                e.preventDefault();
                for (const n of document.querySelectorAll("textarea.js-comment-field")) if (n.value && Ji(n) && !confirm("Are you sure you want to open github.dev?")) return;
                const t = e.currentTarget;
                t.pathname = window.location.pathname, t.hash = window.location.hash, window.location.href = t.href
            }), (0, c.on)("click", ".js-github-dev-new-tab-shortcut", function (e) {
                const t = e.currentTarget;
                t.pathname = window.location.pathname, t.hash = window.location.hash
            });

            function Yi(e, t, n) {
                const o = new URL("", window.location.origin), r = t.pathname.split("/");
                o.pathname = r.slice(1, 3).join("/"), o.hash = t.hash, n && (o.search = `?q=${encodeURIComponent(n)}`);
                const a = new URLSearchParams(t.search).get("q");
                return a ? o.search = `?q=${encodeURIComponent(a)}` : r.length >= 6 && (r[3] === "blob" || r[3] === "tree") && (o.pathname = t.pathname), o.host = e.host, o.protocol = e.protocol, o.port = e.port, o
            }

            s(Yi, "getBlackbirdURL"), (0, c.on)("click", ".js-blackbird-shortcut", function (e) {
                var t;
                const n = e.currentTarget,
                    o = Yi(n, new URL(window.location.href, window.location.origin), (t = window.getSelection()) == null ? void 0 : t.toString());
                n.href = o.href
            }), (0, c.on)("click", ".js-permalink-shortcut", function (e) {
                const t = e.currentTarget;
                try {
                    (0, E.lO)(null, "", t.href + window.location.hash)
                } catch {
                    window.location.href = t.href + window.location.hash
                }
                for (const n of document.querySelectorAll(".js-permalink-replaceable-link")) n instanceof HTMLAnchorElement && (n.href = n.getAttribute("data-permalink-href"));
                e.preventDefault()
            }), (0, C.AC)(".js-permission-menu-form", async function (e, t) {
                const n = e.querySelector(".js-permission-success"), o = e.querySelector(".js-permission-error");
                n.hidden = !0, o.hidden = !0, e.classList.add("is-loading");
                let r;
                try {
                    r = await t.json()
                } catch {
                    e.classList.remove("is-loading"), o.hidden = !1;
                    return
                }
                e.classList.remove("is-loading"), n.hidden = !1;
                const i = e.closest(".js-org-repo");
                if (i) {
                    const a = r.json;
                    i.classList.toggle("with-higher-access", a.members_with_higher_access)
                }
            }), async function () {
                await ye.x;
                const e = document.querySelector(".js-pjax-loader-bar");
                if (!e) return;
                const t = e.firstElementChild;
                if (!(t instanceof HTMLElement)) return;
                let n = 0, o = null, r = null;

                function i() {
                    a(0), e && e.classList.add("is-loading"), o = window.setTimeout(l, 0)
                }

                s(i, "initiateLoader");

                function a(w) {
                    t instanceof HTMLElement && (w === 0 && (r == null && (r = getComputedStyle(t).transition), t.style.transition = "none"), n = w, t.style.width = `${n}%`, w === 0 && (t.clientWidth, t.style.transition = r || ""))
                }

                s(a, "setWidth");

                function l() {
                    n === 0 && (n = 12), a(Math.min(n + 3, 95)), o = window.setTimeout(l, 500)
                }

                s(l, "increment");

                function y() {
                    o && clearTimeout(o), a(100), e && e.classList.remove("is-loading")
                }

                s(y, "finishLoader"), document.addEventListener("pjax:start", i), document.addEventListener("pjax:end", y)
            }();
            let hn = null;
            const pn = "last_pjax_request", pt = "pjax_start", gn = "pjax_end";

            function Qi(e) {
                e instanceof CustomEvent && e.detail && e.detail.url && (window.performance.mark(pt), hn = e.detail.url)
            }

            s(Qi, "markPjaxStart");

            async function ea() {
                if (await (0, x.gJ)(), !window.performance.getEntriesByName(pt).length) return;
                window.performance.mark(gn), window.performance.measure(pn, pt, gn);
                const t = window.performance.getEntriesByName(pn).pop(), n = t ? t.duration : null;
                !n || (hn && (0, he.b)({requestUrl: hn, pjaxDuration: Math.round(n)}), ta())
            }

            s(ea, "trackPjaxTiming");

            function ta() {
                window.performance.clearMarks(pt), window.performance.clearMarks(gn), window.performance.clearMeasures(pn)
            }

            s(ta, "clearPjaxMarks"), "getEntriesByName" in window.performance && (document.addEventListener("pjax:start", Qi), document.addEventListener("pjax:end", ea));
            let bn = null;
            const yn = "last_turbo_request", gt = "turbo_start", vn = "turbo_end";

            function na(e) {
                var t;
                e instanceof CustomEvent && (!((t = e.detail) == null ? void 0 : t.url) || (window.performance.mark(gt), bn = e.detail.url))
            }

            s(na, "markTurboStart");

            async function oa() {
                if (await (0, x.gJ)(), !window.performance.getEntriesByName(gt).length) return;
                window.performance.mark(vn), window.performance.measure(yn, gt, vn);
                const t = window.performance.getEntriesByName(yn).pop(), n = t ? t.duration : null;
                !n || (bn && (0, he.b)({requestUrl: bn, turboDuration: Math.round(n)}), ra())
            }

            s(oa, "trackTurboTiming");

            function ra() {
                window.performance.clearMarks(gt), window.performance.clearMarks(vn), window.performance.clearMeasures(yn)
            }

            s(ra, "clearTurboMarks"), "getEntriesByName" in window.performance && (document.addEventListener("turbo:before-fetch-request", na), document.addEventListener("turbo:render", oa));
            var uu = u(55199);

            function sa(e, t) {
                const n = e.split("/", 3).join("/"), o = t.split("/", 3).join("/");
                return n === o
            }

            s(sa, "isSameRepo"), (0, c.on)("pjax:click", "#js-repo-pjax-container a[href]", function (e) {
                const t = e.currentTarget.pathname;
                sa(t, location.pathname) || e.preventDefault()
            }), (0, c.on)("pjax:click", ".js-comment-body", function (e) {
                const t = e.target;
                t instanceof HTMLAnchorElement && t.pathname.split("/")[3] === "files" && e.preventDefault()
            });
            var du = u(45153);
            (0, U.c)("TURBO") ? (async () => (0, c.on)("click", ".js-turbo-history-navigate", function (e) {
                const t = e;
                t.currentTarget instanceof HTMLAnchorElement && (t.shiftKey || t.metaKey || t.ctrlKey || t.altKey || (t.currentTarget.href === (0, E._C)() ? (t.preventDefault(), history.back()) : t.currentTarget.href === (0, E.Mw)() && (t.preventDefault(), history.forward())))
            }))() : (0, c.on)("pjax:click", ".js-pjax-history-navigate", function (e) {
                e.currentTarget instanceof HTMLAnchorElement && (e.currentTarget.href === (0, E._C)() ? (history.back(), e.detail.relatedEvent.preventDefault(), e.preventDefault()) : e.currentTarget.href === (0, E.Mw)() && (history.forward(), e.detail.relatedEvent.preventDefault(), e.preventDefault()))
            });

            function zo(e) {
                return e.getAttribute("data-pjax-preserve-scroll") != null ? !1 : 0
            }

            s(zo, "preserveScrollTo");

            function wn(e) {
                let t = e;
                for (; t;) {
                    const n = t.getAttribute("data-pjax");
                    if (n && n !== "true") return document.querySelector(n);
                    t = t.parentElement && t.parentElement.closest("[data-pjax]")
                }
                return e.closest("[data-pjax-container]")
            }

            s(wn, "detectContainer"), (0, c.on)("click", "[data-pjax] a, a[data-pjax]", function (e) {
                const t = e.currentTarget;
                if (t instanceof HTMLAnchorElement) {
                    if (t.getAttribute("data-skip-pjax") != null || t.getAttribute("data-remote") != null) return;
                    const n = wn(t);
                    n && ia(e, {container: n, scrollTo: zo(t)})
                }
            }), (0, c.on)("change", "select[data-pjax]", function (e) {
                if ((0, U.c)("TURBO")) return;
                const t = e.currentTarget, n = wn(t);
                n && (0, W.ZP)({url: t.value, container: n})
            });

            function ia(e, t) {
                if ((0, U.c)("TURBO")) return;
                const n = e.currentTarget;
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== n.protocol || location.hostname !== n.hostname || n.href.indexOf("#") > -1 && Ko(n) === Ko(location) || e.defaultPrevented) return;
                const o = {url: n.href, target: n, ...t}, r = new CustomEvent("pjax:click", {
                    bubbles: !0,
                    cancelable: !0,
                    detail: {options: o, relatedEvent: e}
                });
                n.dispatchEvent(r) && ((0, W.ZP)(o), e.preventDefault(), n.dispatchEvent(new CustomEvent("pjax:clicked", {
                    bubbles: !0,
                    cancelable: !0,
                    detail: {options: o}
                })))
            }

            s(ia, "click");

            function Ko(e) {
                return e.href.replace(/#.*/, "")
            }

            s(Ko, "stripHash"), (0, c.on)("submit", "form[data-pjax]", function (e) {
                if ((0, U.c)("TURBO")) return;
                const t = e.currentTarget, n = wn(t);
                if (!n) return;
                const o = zo(t),
                    r = {type: (t.method || "GET").toUpperCase(), url: t.action, target: t, scrollTo: o, container: n};
                if (r.type === "GET") {
                    if (t.querySelector("input[type=file]")) return;
                    const i = aa(r.url);
                    i.search += (i.search ? "&" : "") + (0, L.qC)(t), r.url = i.toString()
                } else r.data = new FormData(t);
                (0, W.ZP)(r), e.preventDefault()
            });

            function aa(e) {
                const t = document.createElement("a");
                return t.href = e, t
            }

            s(aa, "parseURL"), (0, d.N7)("body.js-print-popup", () => {
                window.print(), setTimeout(window.close, 1e3)
            }), (0, d.N7)("poll-include-fragment[data-redirect-url]", function (e) {
                const t = e.getAttribute("data-redirect-url");
                e.addEventListener("load", function () {
                    window.location.href = t
                })
            }), (0, d.N7)("poll-include-fragment[data-reload]", function (e) {
                e.addEventListener("load", function () {
                    window.location.reload()
                })
            });
            var ca = u(70290), la = u(51012);
            const ua = "$__", Vo = document.querySelector("meta[name=js-proxy-site-detection-payload]"),
                Xo = document.querySelector("meta[name=expected-hostname]");
            if (Vo instanceof HTMLMetaElement && Xo instanceof HTMLMetaElement && (0, ca.Z)(document)) {
                const e = {
                    url: window.location.href,
                    expectedHostname: Xo.content,
                    documentHostname: document.location.hostname,
                    proxyPayload: Vo.content
                }, t = new Error, n = {};
                n[`${ua}`] = btoa(JSON.stringify(e)), (0, la.eK)(t, n)
            }
            (0, j.w4)("keydown", ".js-quick-submit", function (e) {
                da(e)
            });

            function da(e) {
                const t = e.target;
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    const n = t.form, o = n.querySelector("input[type=submit], button[type=submit]");
                    if (e.shiftKey) {
                        const r = n.querySelector(".js-quick-submit-alternative");
                        (r instanceof HTMLInputElement || r instanceof HTMLButtonElement) && !r.disabled && (0, L.Bt)(n, r)
                    } else (o instanceof HTMLInputElement || o instanceof HTMLButtonElement) && o.disabled || (0, L.Bt)(n);
                    e.preventDefault()
                }
            }

            s(da, "quickSubmit");
            var Go = u(55498);
            let bt;
            (0, d.N7)(".js-comment-quote-reply", function (e) {
                var t;
                e.hidden = ((t = e.closest(".js-quote-selection-container")) == null ? void 0 : t.querySelector(".js-inline-comment-form-container textarea, .js-new-comment-form textarea")) == null
            });

            function Zo(e) {
                return e.nodeName === "DIV" && e.classList.contains("highlight")
            }

            s(Zo, "isHighlightContainer");

            function fa(e) {
                return e.nodeName === "IMG" || e.firstChild != null
            }

            s(fa, "hasContent");
            const Jo = {
                PRE(e) {
                    const t = e.parentElement;
                    if (t && Zo(t)) {
                        const n = t.className.match(/highlight-source-(\S+)/), o = n ? n[1] : "",
                            r = (e.textContent || "").replace(/\n+$/, "");
                        e.textContent = `\`\`\`${o}
${r}
\`\`\``, e.append(`

`)
                    }
                    return e
                }, A(e) {
                    const t = e.textContent || "";
                    return e.classList.contains("user-mention") || e.classList.contains("team-mention") || e.classList.contains("issue-link") && /^#\d+$/.test(t) ? t : e
                }, IMG(e) {
                    const t = e.getAttribute("alt");
                    return t && e.classList.contains("emoji") ? t : e
                }, DIV(e) {
                    if (e.classList.contains("js-suggested-changes-blob")) e.remove(); else if (e.classList.contains("blob-wrapper-embedded")) {
                        const t = e.parentElement, n = t.querySelector("a[href]"), o = document.createElement("p");
                        o.textContent = n.href, t.replaceWith(o)
                    }
                    return e
                }
            };

            function ma(e) {
                const t = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT, {
                    acceptNode(r) {
                        return r.nodeName in Jo && fa(r) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                    }
                }), n = [];
                let o = t.nextNode();
                for (; o;) o instanceof HTMLElement && n.push(o), o = t.nextNode();
                n.reverse();
                for (const r of n) r.replaceWith(Jo[r.nodeName](r))
            }

            s(ma, "insertMarkdownSyntax"), (0, c.on)("click", ".js-comment-quote-reply", function ({
                                                                                                       isTrusted: e,
                                                                                                       currentTarget: t
                                                                                                   }) {
                const n = t.closest(".js-comment"), o = n.querySelector(".js-comment-body"),
                    r = n.querySelector(".js-comment-body").cloneNode(!0),
                    i = n.closest(".js-quote-selection-container"),
                    a = o.querySelectorAll("button.js-convert-to-issue-button, span.js-clear");
                for (const w of a) w.remove();
                let l = new Go.p;
                if (!e && l.range.collapsed || (i.hasAttribute("data-quote-markdown") && (l = new Go.I(i.getAttribute("data-quote-markdown") || "", w => {
                    const S = l.range.startContainer.parentElement, q = S && S.closest("pre");
                    if (q instanceof HTMLElement) {
                        const H = q.parentElement;
                        if (H && Zo(H)) {
                            const $ = document.createElement("div");
                            $.className = H.className, $.appendChild(w), w.appendChild($)
                        }
                    }
                    ma(w)
                })), bt && o.contains(bt.anchorNode) ? l.range = bt.range : l.range.collapsed && l.select(o), l.closest(".js-quote-selection-container") !== i)) return;
                const y = l.range;
                i.dispatchEvent(new CustomEvent("quote-selection", {bubbles: !0, detail: l})), l.range = y;
                for (const w of i.querySelectorAll("textarea")) if ((0, de.Z)(w)) {
                    l.insert(w);
                    break
                }
                n.querySelector(".js-comment-body").replaceWith(r)
            });
            let En;
            document.addEventListener("selectionchange", (0, _.D)(function () {
                const e = window.getSelection();
                let t;
                try {
                    t = e.getRangeAt(0)
                } catch {
                    En = null;
                    return
                }
                En = {anchorNode: e.anchorNode, range: t}
            }, 100)), document.addEventListener("toggle", () => {
                bt = En
            }, {capture: !0});
            const ha = new ResizeObserver(e => {
                for (const t of e) t.contentRect.height > 26 && pa(t.target)
            });
            (0, d.N7)(".js-reactions-container", function (e) {
                ha.observe(e)
            });

            function pa(e) {
                const t = e.offsetWidth * .8, n = e.querySelectorAll(".js-reaction-group-button"),
                    o = e.querySelector(".js-all-reactions-popover");
                let r = 0;
                for (const i of n) r += i.clientWidth;
                if (r += (o == null ? void 0 : o.clientWidth) || 0, t < r) {
                    let i = t;
                    o && (o.removeAttribute("hidden"), i -= o.offsetWidth);
                    for (const a of n) {
                        const l = a.offsetWidth;
                        l > i ? a.setAttribute("hidden", "hidden") : a.removeAttribute("hidden"), i -= l
                    }
                }
            }

            s(pa, "hideReactionOverflow"), (0, C.AC)(".js-pick-reaction", async function (e, t) {
                const n = await t.json(), o = e.closest(".js-comment"), r = o.querySelector(".js-reactions-container"),
                    i = o.querySelector(".js-comment-header-reaction-button"),
                    a = (0, P.r)(document, n.json.reactions_container.trim()),
                    l = (0, P.r)(document, n.json.comment_header_reaction_button.trim());
                r.replaceWith(a), i.replaceWith(l)
            });

            function Yo(e) {
                const t = e.target, n = t.getAttribute("data-reaction-label"),
                    r = t.closest(".js-add-reaction-popover").querySelector(".js-reaction-description");
                r.hasAttribute("data-default-text") || r.setAttribute("data-default-text", r.textContent || ""), r.textContent = n
            }

            s(Yo, "showReactionContent");

            function Qo(e) {
                const n = e.target.closest(".js-add-reaction-popover").querySelector(".js-reaction-description"),
                    o = n.getAttribute("data-default-text");
                o && (n.textContent = o)
            }

            s(Qo, "hideReactionContent"), (0, c.on)("toggle", ".js-reaction-popover-container", function (e) {
                const t = e.currentTarget.hasAttribute("open");
                for (const n of e.target.querySelectorAll(".js-reaction-option-item")) t ? (n.addEventListener("mouseenter", Yo), n.addEventListener("mouseleave", Qo)) : (n.removeEventListener("mouseenter", Yo), n.removeEventListener("mouseleave", Qo))
            }, {capture: !0});
            var Ln = u(2077);

            function ga(e, t, n) {
                e.getAttribute("data-type") === "json" && n.headers.set("Accept", "application/json"), (0, c.f)(e, "deprecatedAjaxSend", {request: n}), t.text().catch(r => {
                    if (r.response) return r.response;
                    throw r
                }).then(r => {
                    r.status < 300 ? (0, c.f)(e, "deprecatedAjaxSuccess") : (0, c.f)(e, "deprecatedAjaxError", {
                        error: r.statusText,
                        status: r.status,
                        text: r.text
                    })
                }, r => {
                    (0, c.f)(e, "deprecatedAjaxError", {error: r.message, status: 0, text: null})
                }).then(() => {
                    (0, c.f)(e, "deprecatedAjaxComplete")
                })
            }

            s(ga, "submitWithLegacyEvents"), (0, c.on)("click", ["form button:not([type])", "form button[type=submit]", "form input[type=submit]"].join(", "), function (e) {
                const t = e.currentTarget;
                t.form && !e.defaultPrevented && (0, Ln.j)(t)
            }), (0, C.AC)("form[data-remote]", ga), (0, c.on)("deprecatedAjaxComplete", "form", function ({currentTarget: e}) {
                const t = (0, Ln.u)(e);
                t && t.remove()
            }), (0, C.uT)(e => {
                const t = (0, Ln.u)(e);
                t && t.remove()
            }), (0, C.rK)(nn.Z), (0, d.N7)(".has-removed-contents", function () {
                let e;
                return {
                    add(t) {
                        e = Array.from(t.childNodes);
                        for (const o of e) t.removeChild(o);
                        const n = t.closest("form");
                        n && (0, c.f)(n, "change")
                    }, remove(t) {
                        for (const o of e) t.appendChild(o);
                        const n = t.closest("form");
                        n && (0, c.f)(n, "change")
                    }
                }
            });
            var me = u(36162), ba = (e => (e.Auto = "auto", e.Light = "light", e.Dark = "dark", e))(ba || {});

            function ya() {
                return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            }

            s(ya, "getUserSystemColorMode");
            const jn = ".js-render-plaintext";

            function va(e) {
                const t = e.closest(".js-render-needs-enrichment");
                if (!t) return;
                t.querySelector(jn) && Sn(t, !1)
            }

            s(va, "markdownEnrichmentSuccess");

            function wa(e, t) {
                Sn(e, !1), er(e, !0), e.classList.add("render-error");
                const n = e.querySelector(jn);
                if (!n) return;
                n.classList.remove("render-plaintext-hidden");
                const o = n.querySelector("pre");
                (0, me.sY)(me.dy`${t} ${o}`, n)
            }

            s(wa, "showMarkdownRenderError");

            function Sn(e, t) {
                const n = e.getElementsByClassName("js-render-enrichment-loader")[0],
                    o = e.getElementsByClassName("render-expand")[0];
                n && (n.hidden = !t), o && (o.hidden = t)
            }

            s(Sn, "setCodeBlockLoaderVisibility");

            function er(e, t) {
                const n = e.querySelector(jn);
                t ? n.classList.remove("render-plaintext-hidden") : n.classList.add("render-plaintext-hidden")
            }

            s(er, "setRawCodeBlockVisibility");

            class tr {
                constructor(t) {
                    this.el = t, this.enrichmentTarget = t.getElementsByClassName("js-render-enrichment-target")[0], this.iframeUrl = this.getIframeUrl(), this.identifier = this.el.getAttribute("data-identity"), this.iframeContentType = this.el.getAttribute("data-type"), this.iframeOrigin = new URL(this.iframeUrl, window.location.origin).origin, this.iframeContent = this.el.getAttribute("data-content"), Sn(this.el, !0)
                }

                enrich() {
                    const t = this.createDialog();
                    (0, me.sY)(t, this.enrichmentTarget), this.setupModal()
                }

                getIframeUrl() {
                    const t = this.el.getAttribute("data-src"), n = {...this.colorMode()},
                        o = Object.entries(n).map(([r, i]) => `${r}=${i}`).join("&");
                    return `${t}?${o}`
                }

                colorMode() {
                    var t;
                    let n = (t = document.querySelector("html")) == null ? void 0 : t.getAttribute("data-color-mode");
                    return (n === "auto" || !n) && (n = ya()), {color_mode: n}
                }

                setupModal() {
                    const t = this.generateIframeCode("-fullscreen"), n = this.el.querySelector(".Box-body");
                    this.el.querySelector(".js-full-screen-render").addEventListener("click", () => {
                        (0, me.sY)(t, n)
                    })
                }

                createDialog() {
                    const t = this.generateIframeCode();
                    return me.dy` <div class="d-flex flex-column flex-auto js-render-box">
      <details class="details-reset details-overlay details-overlay-dark">
        <summary class="btn-sm btn position-absolute js-full-screen-render render-expand" aria-haspopup="dialog" hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="octicon"
            style="display:inline-block;vertical-align:text-bottom"
          >
            <path
              fill-rule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"
            ></path>
          </svg>
        </summary>
        <details-dialog class="Box Box--overlay render-full-screen d-flex flex-column anim-fade-in fast">
          <div>
            <button
              aria-label="Close dialog"
              data-close-dialog=""
              type="button"
              data-view-component="true"
              class="Link--muted btn-link position-absolute render-full-screen-close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="display:inline-block;vertical-align:text-bottom"
                class="octicon octicon-x"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
            <div class="Box-body"></div>
          </div>
        </details-dialog>
      </details>
      ${t}
    </div>`
                }

                generateIframeCode(t = "") {
                    const n = this.identifier + t, o = `${this.iframeUrl}#${n}`;
                    return me.dy`
      <div
        class="render-container js-render-target p-0"
        data-identity="${n}"
        data-host="${this.iframeOrigin}"
        data-type="${this.iframeContentType}"
      >
        <iframe
          class="render-viewer"
          src="${o}"
          name="${n}"
          data-content="${this.iframeContent}"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        >
        </iframe>
      </div>
    `
                }
            }

            s(tr, "EnrichableMarkdownRenderer"), (0, d.N7)(".js-render-needs-enrichment", function (e) {
                const t = e;
                new tr(t).enrich()
            }), (0, c.on)("preview:toggle:off", ".js-previewable-comment-form", function (e) {
                const n = e.currentTarget.querySelector(".js-render-needs-enrichment"),
                    o = n == null ? void 0 : n.querySelector(".js-render-enrichment-target");
                !o || (o.innerHTML = "")
            }), (0, c.on)("preview:rendered", ".js-previewable-comment-form", function (e) {
                const n = e.currentTarget.querySelector(".js-render-needs-enrichment");
                n && er(n, !1)
            });
            const fu = null, yt = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"],
                Ea = ["is-render-ready", "is-render-loading", "is-render-loaded", "is-render-failed", "is-render-failed-fatally"],
                Ue = new WeakMap;

            function nr(e) {
                const t = Ue.get(e);
                t != null && (t.load = t.hello = null, t.helloTimer && (clearTimeout(t.helloTimer), t.helloTimer = null), t.loadTimer && (clearTimeout(t.loadTimer), t.loadTimer = null))
            }

            s(nr, "resetTiming");

            function Je(e, t = "") {
                var n;
                e.classList.remove(...yt), e.classList.add("is-render-failed");
                const o = ja(t), r = (n = e.parentElement) == null ? void 0 : n.closest(".js-render-needs-enrichment");
                r ? wa(r, o) : La(e, o), nr(e)
            }

            s(Je, "renderFailed");

            function La(e, t) {
                const n = e.querySelector(".render-viewer-error");
                n && (n.remove(), e.classList.remove("render-container"), (0, me.sY)(t, e))
            }

            s(La, "fileRenderError");

            function ja(e) {
                let t = me.dy`<p>Unable to render code block</p>`;
                if (e !== "") {
                    const n = e.split(`
`);
                    t = me.dy`<p><b>Error rendering embedded code</b></p>
      <p>${n.map(o => me.dy`${o}<br />`)}</p>`
                }
                return me.dy`<div class="flash flash-error">${t}</div>`
            }

            s(ja, "renderError");

            function or(e, t = !1) {
                var n;
                !(0, de.Z)(e) || e.classList.contains("is-render-ready") || e.classList.contains("is-render-failed") || e.classList.contains("is-render-failed-fatally") || t && !((n = Ue.get(e)) == null ? void 0 : n.hello) || Je(e)
            }

            s(or, "timeoutWatchdog"), (0, d.N7)(".js-render-target", function (e) {
                var t;
                const n = e;
                n.classList.remove(...Ea), n.style.height = "auto", !((t = Ue.get(e)) == null ? void 0 : t.load) && (nr(e), !Ue.get(e) && (Ue.set(e, {
                    load: Date.now(),
                    hello: null,
                    helloTimer: window.setTimeout(or, 1e4, e, !0),
                    loadTimer: window.setTimeout(or, 45e3, e)
                }), e.classList.add("is-render-automatic", "is-render-requested")))
            });

            function vt(e, t) {
                e && e.postMessage && e.postMessage(JSON.stringify(t), "*")
            }

            s(vt, "postAsJson");

            function Sa(e) {
                let t = e.data;
                if (!t) return;
                if (typeof t == "string") try {
                    t = JSON.parse(t)
                } catch {
                    return
                }
                if (t.type !== "render" || typeof t.identity != "string") return;
                const n = t.identity;
                if (typeof t.body != "string") return;
                const o = t.body;
                let r = null;
                for (const w of document.querySelectorAll(".js-render-target")) if (w.getAttribute("data-identity") === n) {
                    r = w;
                    break
                }
                if (!r || e.origin !== r.getAttribute("data-host")) return;
                const i = t.payload != null ? t.payload : void 0, a = r.querySelector("iframe"),
                    l = a == null ? void 0 : a.contentWindow;

                function y() {
                    const w = a == null ? void 0 : a.getAttribute("data-content");
                    if (!w) return;
                    const S = {
                        type: "render:cmd",
                        body: {
                            cmd: "code_rendering_service:data:ready",
                            "code_rendering_service:data:ready": {
                                data: JSON.parse(w).data,
                                width: r == null ? void 0 : r.getBoundingClientRect().width
                            }
                        }
                    };
                    vt(l, S)
                }

                switch (s(y, "postData"), o) {
                    case"hello": {
                        const w = Ue.get(r) || {untimed: !0};
                        w.hello = Date.now();
                        const S = {type: "render:cmd", body: {cmd: "ack", ack: !0}},
                            q = {type: "render:cmd", body: {cmd: "branding", branding: !1}};
                        if (!l) return;
                        vt(l, S), vt(l, q)
                    }
                        break;
                    case"error":
                        i ? Je(r, i.error) : Je(r);
                        break;
                    case"error:fatal": {
                        Je(r), r.classList.add("is-render-failed-fatal");
                        break
                    }
                    case"error:invalid":
                        Je(r), r.classList.add("is-render-failed-invalid");
                        break;
                    case"loading":
                        r.classList.remove(...yt), r.classList.add("is-render-loading");
                        break;
                    case"loaded":
                        r.classList.remove(...yt), r.classList.add("is-render-loaded");
                        break;
                    case"ready":
                        va(r), r.classList.remove(...yt), r.classList.add("is-render-ready"), i && typeof i.height == "number" && (r.style.height = `${i.height}px`, location.hash !== "" && window.dispatchEvent(new HashChangeEvent("hashchange")));
                        break;
                    case"resize":
                        i && typeof i.height == "number" && (r.style.height = `${i.height}px`);
                        break;
                    case"code_rendering_service:container:get_size":
                        vt(l, {
                            type: "render:cmd",
                            body: {
                                cmd: "code_rendering_service:container:size",
                                "code_rendering_service:container:size": {width: r == null ? void 0 : r.getBoundingClientRect().width}
                            }
                        });
                        break;
                    case"code_rendering_service:markdown:get_data":
                        if (!l) return;
                        y();
                        break;
                    default:
                        break
                }
            }

            s(Sa, "handleMessage"), window.addEventListener("message", Sa), (0, C.AC)("form[data-replace-remote-form]", async function (e, t) {
                e.classList.remove("is-error"), e.classList.add("is-loading");
                try {
                    let n = e;
                    const o = await t.html(), r = e.closest("[data-replace-remote-form-target]");
                    if (r) {
                        const i = r.getAttribute("data-replace-remote-form-target");
                        n = i ? document.getElementById(i) : r
                    }
                    n.replaceWith(o.html)
                } catch {
                    e.classList.remove("is-loading"), e.classList.add("is-error")
                }
            }), PerformanceObserver && (PerformanceObserver.supportedEntryTypes || []).includes("longtask") && new PerformanceObserver(function (t) {
                const n = t.getEntries().map(({name: o, duration: r}) => ({
                    name: o,
                    duration: r,
                    url: window.location.href
                }));
                (0, he.b)({longTasks: n})
            }).observe({entryTypes: ["longtask"]});
            const rr = new WeakMap;

            function Ta(e) {
                return e.closest("markdown-toolbar").field
            }

            s(Ta, "getTextarea"), (0, c.on)("click", ".js-markdown-link-button", async function ({currentTarget: e}) {
                const n = document.querySelector(".js-markdown-link-dialog").content.cloneNode(!0);
                if (!(n instanceof DocumentFragment)) return;
                const o = await (0, Se.W)({content: n, labelledBy: "box-title"});
                e instanceof HTMLElement && rr.set(o, Ta(e).selectionEnd)
            }), (0, c.on)("click", ".js-markdown-link-insert", ({currentTarget: e}) => {
                const t = e.closest("details-dialog"),
                    n = document.querySelector(`#${e.getAttribute("data-for-textarea")}`), o = rr.get(t) || 0,
                    r = t.querySelector("#js-dialog-link-href").value,
                    a = `[${t.querySelector("#js-dialog-link-text").value}](${r}) `, l = n.value.slice(0, o),
                    y = n.value.slice(o);
                n.value = l + a + y, n.focus(), n.selectionStart = n.selectionEnd = o + a.length
            });
            var mu = u(97605);
            (0, c.on)("details-menu-select", ".js-saved-reply-menu", function (e) {
                if (!(e.target instanceof Element)) return;
                const t = e.detail.relatedTarget.querySelector(".js-saved-reply-body");
                if (!t) return;
                const n = (t.textContent || "").trim(),
                    r = e.target.closest(".js-previewable-comment-form").querySelector("textarea.js-comment-field");
                (0, Ee.Om)(r, n), setTimeout(() => r.focus(), 0)
            }, {capture: !0}), (0, j.w4)("keydown", ".js-saved-reply-shortcut-comment-field", function (e) {
                (0, $e.EL)(e) === "Control+." && (e.target.closest(".js-previewable-comment-form").querySelector(".js-saved-reply-container").setAttribute("open", ""), e.preventDefault())
            }), (0, j.w4)("keydown", ".js-saved-reply-filter-input", function (e) {
                if (/^Control\+[1-9]$/.test((0, $e.EL)(e))) {
                    const n = e.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]'),
                        o = Number(e.key), r = n[o - 1];
                    r instanceof HTMLElement && (r.click(), e.preventDefault())
                } else if (e.key === "Enter") {
                    const n = e.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]');
                    n.length > 0 && n[0] instanceof HTMLButtonElement && n[0].click(), e.preventDefault()
                }
            });
            var Aa = u(6760), Ca = u(66703);

            function ka(e, t) {
                return e.querySelector(`#LC${t}`)
            }

            s(ka, "queryLineElement");

            function wt(e, t, n, o) {
                const r = (0, Aa.M9)(e, l => ka(t, l));
                if (!r) return;
                if (n) {
                    const l = (0, Ee.yb)(r.startContainer.textContent, r.startOffset);
                    if (l === -1) return;
                    r.setStart(r.startContainer, l)
                }
                if (o) {
                    const l = (0, Ee.yb)(r.endContainer.textContent, r.endOffset);
                    if (l === -1) return;
                    r.setEnd(r.endContainer, l)
                }
                const i = document.createElement("span"),
                    a = ["text-bold", "hx_keyword-hl", "rounded-2", "d-inline-block"];
                i.classList.add(...a), (0, Ca.v)(r, i)
            }

            s(wt, "highlightRange");

            function xa(e, t) {
                if (e.start.line !== e.end.line) {
                    const n = {
                        start: {line: e.start.line, column: e.start.column},
                        end: {line: e.start.line, column: null}
                    };
                    wt(n, t, !0, !1);
                    for (let r = e.start.line + 1; r < e.end.line; r += 1) wt({
                        start: {line: r, column: 0},
                        end: {line: r, column: null}
                    }, t, !1, !1);
                    const o = {start: {line: e.end.line, column: 0}, end: {line: e.end.line, column: e.end.column}};
                    wt(o, t, !1, !0)
                } else wt(e, t, !0, !0)
            }

            s(xa, "highlightColumns");

            function Ma(e) {
                const t = parseInt(e.getAttribute("data-start-line")), n = parseInt(e.getAttribute("data-end-line")),
                    o = parseInt(e.getAttribute("data-start-column")), r = parseInt(e.getAttribute("data-end-column"));
                return t === n && o === r ? null : {
                    start: {line: t, column: o},
                    end: {line: n, column: r !== 0 ? r : null}
                }
            }

            s(Ma, "parseColumnHighlightRange"), (0, d.N7)(".js-highlight-code-snippet-columns", function (e) {
                const t = Ma(e);
                t !== null && xa(t, e)
            }), (0, c.on)("click", ".js-segmented-nav-button", function (e) {
                e.preventDefault();
                const t = e.currentTarget, n = t.getAttribute("data-selected-tab"), o = t.closest(".js-segmented-nav"),
                    r = o.parentElement;
                for (const i of o.querySelectorAll(".js-segmented-nav-button")) i.classList.remove("selected");
                t.classList.add("selected");
                for (const i of r.querySelectorAll(".js-selected-nav-tab")) i.parentElement === r && i.classList.remove("active");
                document.querySelector(`.${n}`).classList.add("active")
            });
            var ke = u(407), xe = u(14982);
            const qa = (0, _.D)(function () {
                (0, ke.e6)((0, xe.e)())
            }, 50);

            function Ra() {
                var e, t;
                return (t = (e = document.querySelector("html")) == null ? void 0 : e.hasAttribute("data-turbo-preview")) != null ? t : !1
            }

            s(Ra, "isTurboRenderingCachePreview"), window.addEventListener("submit", ke.iO, {capture: !0}), window.addEventListener("pageshow", function () {
                (0, ke.e6)((0, xe.e)())
            }), window.addEventListener("pjax:end", function () {
                (0, ke.e6)((0, xe.e)())
            }), (0, d.N7)(".js-session-resumable", function () {
                Ra() || qa()
            }), window.addEventListener("pagehide", function () {
                (0, ke.Xm)((0, xe.e)(), {selector: ".js-session-resumable"})
            }), window.addEventListener("pjax:beforeReplace", function (e) {
                const t = e.detail.previousState, n = t ? t.url : null;
                if (n) (0, ke.Xm)((0, xe.e)(new URL(n, window.location.origin)), {selector: ".js-session-resumable"}); else {
                    const o = new Error("pjax:beforeReplace event.detail.previousState.url is undefined");
                    setTimeout(function () {
                        throw o
                    })
                }
            }), window.addEventListener("turbo:before-visit", function () {
                (0, ke.Xm)((0, xe.e)(), {selector: ".js-session-resumable"})
            }), window.addEventListener("turbo:load", function () {
                (0, ke.e6)((0, xe.e)())
            });
            var hu = u(88014), Et = u(30855);
            const Tn = ["notification_referrer_id", "notifications_before", "notifications_after", "notifications_query"],
                Lt = "notification_shelf";

            function Pa(e, t = null) {
                return e.has("notification_referrer_id") ? (_a(e, t), Ia(e)) : null
            }

            s(Pa, "storeAndStripShelfParams");

            function sr(e = null) {
                const t = ir(e);
                if (!t) return (0, Et.cl)(Lt), null;
                try {
                    const n = (0, Et.rV)(Lt);
                    if (!n) return null;
                    const o = JSON.parse(n);
                    if (!o || !o.pathname) throw new Error("Must have a pathname");
                    if (o.pathname !== t) throw new Error("Stored pathname does not match current pathname.");
                    const r = {};
                    for (const i of Tn) r[i] = o[i];
                    return r
                } catch {
                    return (0, Et.cl)(Lt), null
                }
            }

            s(sr, "getStoredShelfParamsForCurrentPage");

            function _a(e, t) {
                const n = ir(t);
                if (!n) return;
                const o = {pathname: n};
                for (const r of Tn) {
                    const i = e.get(r);
                    i && (o[r] = i)
                }
                (0, Et.LS)(Lt, JSON.stringify(o))
            }

            s(_a, "storeShelfParams");

            function Ia(e) {
                for (const t of Tn) e.delete(t);
                return e
            }

            s(Ia, "deleteShelfParams");

            function ir(e) {
                e = e || window.location.pathname;
                const t = /^(\/[^/]+\/[^/]+\/pull\/[^/]+)/, n = e.match(t);
                return n ? n[0] : null
            }

            s(ir, "getCurrentPullRequestPathname");
            var Da = u(27034), Ha = u(12451);

            async function Oa() {
                return (0, C.AC)(".js-notification-shelf .js-notification-action form", async function (e, t) {
                    if (e.hasAttribute("data-redirect-to-inbox-on-submit")) {
                        await ar(t);
                        const o = document.querySelector(".js-notifications-back-to-inbox");
                        o && o.click();
                        return
                    }
                    (0, Ha.a)(e, e), await ar(t)
                })
            }

            s(Oa, "remoteShelfActionForm");

            function Na() {
                const e = new URLSearchParams(window.location.search), t = Pa(e);
                if (t) {
                    const n = new URL(window.location.href, window.location.origin);
                    return n.search = t.toString(), n.toString()
                }
            }

            s(Na, "urlWithoutNotificationParameters");

            function Ba(e) {
                if (!(e instanceof Da.Z)) return;
                const t = sr();
                if (!t) return;
                const n = e.getAttribute("data-base-src");
                if (!n) return;
                const o = new URL(n, window.location.origin), r = new URLSearchParams(o.search);
                for (const [i, a] of Object.entries(t)) typeof a == "string" && r.set(i, a);
                o.search = r.toString(), e.setAttribute("src", o.toString())
            }

            s(Ba, "loadShelfFromStoredParams");

            async function ar(e) {
                try {
                    await e.text()
                } catch {
                }
            }

            s(ar, "performRequest"), Oa();

            function cr() {
                const e = Na();
                e && (0, E.lO)(null, "", e)
            }

            s(cr, "removeNotificationParams"), cr(), document.addEventListener(ie.QE.SUCCESS, cr), (0, d.N7)(".js-notification-shelf-include-fragment", Ba), (0, c.on)("submit", ".js-mark-notification-form", async function (e) {
                const t = e.currentTarget;
                e.preventDefault();
                try {
                    await fetch(t.action, {
                        method: t.method,
                        body: new FormData(t),
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    })
                } catch {
                }
            });

            async function lr() {
                await ye.C;
                const e = document.querySelector(".js-mark-notification-form");
                e instanceof HTMLFormElement && (0, L.Bt)(e)
            }

            s(lr, "markNotificationAsRead"), document.addEventListener(ie.QE.SUCCESS, lr), lr();

            function $a(e) {
                return !!e.closest(".js-jump-to-field")
            }

            s($a, "isJumpToAvailable");

            function An(e, t) {
                if ($a(e)) return;
                const n = document.querySelector(".js-site-search-form");
                document.querySelector(".js-site-search").classList.toggle("scoped-search", t);
                let o, r;
                t ? (o = n.getAttribute("data-scoped-search-url"), r = e.getAttribute("data-scoped-placeholder")) : (o = n.getAttribute("data-unscoped-search-url"), r = e.getAttribute("data-unscoped-placeholder")), n.setAttribute("action", o), e.setAttribute("placeholder", r)
            }

            s(An, "toggleSearchScope"), (0, j.w4)("keyup", ".js-site-search-field", function (e) {
                const t = e.target, n = t.value.length === 0;
                n && e.key === "Backspace" && t.classList.contains("is-clearable") && An(t, !1), n && e.key === "Escape" && An(t, !0), t.classList.toggle("is-clearable", n)
            }), (0, j.ZG)(".js-site-search-focus", function (e) {
                const t = e.closest(".js-chromeless-input-container");
                t.classList.add("focus");

                function n() {
                    t.classList.remove("focus"), e.value.length === 0 && e.classList.contains("js-site-search-field") && An(e, !0), e.removeEventListener("blur", n)
                }

                s(n, "blurHandler"), e.addEventListener("blur", n)
            }), (0, c.on)("submit", ".js-site-search-form", function (e) {
                if (!(e.target instanceof Element)) return;
                const t = e.target.querySelector(".js-site-search-type-field");
                t.value = new URLSearchParams(window.location.search).get("type") || ""
            });
            var Fa = u(54430);
            (0, d.N7)("textarea.js-size-to-fit", {constructor: HTMLTextAreaElement, subscribe: Fa.Z});
            var Cn = u(51847);
            (0, c.on)("click", ".js-smoothscroll-anchor", function (e) {
                const t = e.currentTarget;
                if (!(t instanceof HTMLAnchorElement)) return;
                const n = (0, Cn.Kt)(document, t.hash);
                !n || (n.focus(), n.scrollIntoView({behavior: "smooth"}), e.preventDefault())
            });
            const Ua = 1e3, ur = new WeakMap, dr = document.querySelector("#snippet-clipboard-copy-button");

            async function Wa(e, t) {
                const n = e.getAttribute("data-snippet-clipboard-copy-content");
                if (n === null || (e.removeAttribute("data-snippet-clipboard-copy-content"), !(dr instanceof HTMLTemplateElement))) return;
                const r = dr.content.cloneNode(!0).children[0];
                if (!(r instanceof HTMLElement)) return;
                const i = r.children[0];
                if (!(i instanceof HTMLElement)) return;
                i.setAttribute("value", n), document.addEventListener("selectionchange", () => {
                    const l = document.getSelection();
                    if (l && e.contains(l.anchorNode)) {
                        const y = l == null ? void 0 : l.toString();
                        i.style.display = y.trim() === "" ? "inherit" : "none"
                    }
                }, {signal: t});
                const a = e.querySelector("pre");
                if (a !== null) {
                    let l;
                    a.addEventListener("scroll", () => {
                        l && clearTimeout(l), i.style.display = "none", l = setTimeout(() => {
                            i.style.display = "inherit"
                        }, Ua)
                    }, {signal: t})
                }
                e.appendChild(r)
            }

            s(Wa, "insertSnippetClipboardCopyButton"), (0, d.N7)("[data-snippet-clipboard-copy-content]", {
                constructor: HTMLElement,
                add(e) {
                    if (e.parentElement && e.parentElement.classList.contains("js-no-snippet-clipboard-copy")) return;
                    const t = new AbortController;
                    ur.set(e, t), Wa(e, t.signal)
                }
            }), (0, d.N7)(".snippet-clipboard-content clipboard-copy", {
                constructor: HTMLElement, remove(e) {
                    const t = ur.get(e);
                    t && t.abort()
                }
            });

            function fr(e, t, n) {
                mr(e, t), n && e.classList.toggle("on");
                const o = Array.from(e.querySelectorAll(".js-social-updatable"), Me.x0);
                return Promise.all(o)
            }

            s(fr, "handleSocialResponse"), (0, C.AC)(".js-social-form", async function (e, t) {
                var n, o;
                let r;
                const i = e.closest(".js-social-container"), a = e.classList.contains("js-deferred-toggler-target");
                try {
                    r = await t.json(), i && await fr(i, r.json.count, a)
                } catch (l) {
                    if (((n = l.response) == null ? void 0 : n.status) === 409 && l.response.json.confirmationDialog) {
                        const y = l.response.json.confirmationDialog, w = document.querySelector(y.templateSelector),
                            S = (o = e.querySelector(".js-confirm-csrf-token")) == null ? void 0 : o.value;
                        if (w instanceof HTMLTemplateElement && S) {
                            const q = new lt.R(w, {confirmUrl: e.action, confirmCsrfToken: S, ...y.inputs || {}}),
                                H = await (0, Se.W)({content: q});
                            H.addEventListener("social-confirmation-form:success", async $ => {
                                $ instanceof CustomEvent && i && await fr(i, $.detail.count, a)
                            }), H.addEventListener("social-confirmation-form:error", () => {
                                (0, T.v)()
                            })
                        }
                    } else i && !a && i.classList.toggle("on"), (0, T.v)()
                }
            }), (0, C.AC)(".js-social-confirmation-form", async function (e, t) {
                try {
                    const n = await t.json();
                    (0, c.f)(e, "social-confirmation-form:success", n.json)
                } catch {
                    (0, c.f)(e, "social-confirmation-form:error")
                }
            });

            function mr(e, t) {
                for (const n of e.querySelectorAll(".js-social-count")) {
                    n.textContent = t;
                    const o = n.getAttribute("data-singular-suffix"), r = n.getAttribute("data-plural-suffix"),
                        i = t === "1" ? o : r;
                    i && n.setAttribute("aria-label", `${t} ${i}`)
                }
            }

            s(mr, "updateSocialCounts");
            var Pe = u(21461);

            class hr extends Pe.a2 {
                constructor(t, n, o, r) {
                    super(t, () => this.getUrlFromRefreshUrl(), o, r);
                    this.refreshUrl = n
                }

                getUrlFromRefreshUrl() {
                    return za(this.refreshUrl)
                }
            }

            s(hr, "AliveSession");

            async function za(e) {
                const t = await Ka(e);
                return t && t.url && t.token ? Va(t.url, t.token) : null
            }

            s(za, "fetchRefreshUrl");

            async function Ka(e) {
                const t = await fetch(e, {headers: {Accept: "application/json"}});
                if (t.ok) return t.json();
                if (t.status === 404) return null;
                throw new Error("fetch error")
            }

            s(Ka, "fetchJSON");

            async function Va(e, t) {
                const n = await fetch(e, {method: "POST", mode: "same-origin", headers: {"Scoped-CSRF-Token": t}});
                if (n.ok) return n.text();
                throw new Error("fetch error")
            }

            s(Va, "post");
            const jt = [], Xa = 3e4, Ga = 0;
            let St = document.hidden, Tt;

            function Za(e) {
                return e(St), jt.push(e), new A.w0(() => {
                    const t = jt.indexOf(e);
                    t !== -1 && jt.splice(t, 1)
                })
            }

            s(Za, "addIdleStateListener"), document.addEventListener("visibilitychange", () => {
                const e = document.hidden;
                Tt !== void 0 && clearTimeout(Tt), Tt = setTimeout(() => {
                    if (e !== St) {
                        St = e, Tt = void 0;
                        for (const n of jt) n(St)
                    }
                }, e ? Xa : Ga)
            });

            function Ja() {
                return "SharedWorker" in window && (0, Fo.Z)("localStorage").getItem("bypassSharedWorker") !== "true"
            }

            s(Ja, "isSharedWorkerSupported");

            function Ya() {
                var e, t;
                return (t = (e = document.head.querySelector("link[rel=shared-web-socket-src]")) == null ? void 0 : e.href) != null ? t : null
            }

            s(Ya, "workerSrc");

            function Qa() {
                var e, t;
                return (t = (e = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : e.href) != null ? t : null
            }

            s(Qa, "socketUrl");

            function ec() {
                var e, t;
                return (t = (e = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : e.getAttribute("data-refresh-url")) != null ? t : null
            }

            s(ec, "socketRefreshUrl");

            function tc() {
                var e, t;
                return (t = (e = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : e.getAttribute("data-session-id")) != null ? t : null
            }

            s(tc, "sessionIdentifier");

            function nc(e) {
                return pr(e).map(t => ({subscriber: e, topic: t}))
            }

            s(nc, "subscriptions");

            function pr(e) {
                return (e.getAttribute("data-channel") || "").trim().split(/\s+/).map(Pe.Zf.parse).filter(oc)
            }

            s(pr, "channels");

            function oc(e) {
                return e != null
            }

            s(oc, "isPresent");

            function gr(e, {channel: t, type: n, data: o}) {
                for (const r of e) r.dispatchEvent(new CustomEvent(`socket:${n}`, {
                    bubbles: !1,
                    cancelable: !1,
                    detail: {name: t, data: o}
                }))
            }

            s(gr, "notify");

            class br {
                constructor(t, n, o, r, i) {
                    this.subscriptions = new Pe.vk, this.presenceMetadata = new Pe.ah, this.notifyPresenceDebouncedByChannel = new Map, this.notify = i, this.worker = new SharedWorker(t, `github-socket-worker-v2-${r}`), this.worker.port.onmessage = ({data: a}) => this.receive(a), this.worker.port.postMessage({
                        connect: {
                            url: n,
                            refreshUrl: o
                        }
                    })
                }

                subscribe(t) {
                    const n = this.subscriptions.add(...t);
                    n.length && this.worker.port.postMessage({subscribe: n});
                    const o = new Set(n.map(i => i.name)), r = t.reduce((i, a) => {
                        const l = a.topic.name;
                        return (0, Pe.A)(l) && !o.has(l) && i.add(l), i
                    }, new Set);
                    r.size && this.worker.port.postMessage({requestPresence: Array.from(r)})
                }

                unsubscribeAll(...t) {
                    const n = this.subscriptions.drain(...t);
                    n.length && this.worker.port.postMessage({unsubscribe: n});
                    const o = this.presenceMetadata.removeSubscribers(t);
                    this.sendPresenceMetadataUpdate(o)
                }

                updatePresenceMetadata(t) {
                    const n = new Set;
                    for (const o of t) this.presenceMetadata.setMetadata(o), n.add(o.channelName);
                    this.sendPresenceMetadataUpdate(n)
                }

                sendPresenceMetadataUpdate(t) {
                    if (!t.size) return;
                    const n = [];
                    for (const o of t) n.push({channelName: o, metadata: this.presenceMetadata.getChannelMetadata(o)});
                    this.worker.port.postMessage({updatePresenceMetadata: n})
                }

                online() {
                    this.worker.port.postMessage({online: !0})
                }

                offline() {
                    this.worker.port.postMessage({online: !1})
                }

                hangup() {
                    this.worker.port.postMessage({hangup: !0})
                }

                receive(t) {
                    const {channel: n} = t;
                    if (t.type === "presence") {
                        let o = this.notifyPresenceDebouncedByChannel.get(n);
                        o || (o = (0, _.D)((r, i) => {
                            this.notify(r, i), this.notifyPresenceDebouncedByChannel.delete(n)
                        }, 100), this.notifyPresenceDebouncedByChannel.set(n, o)), o(this.subscriptions.subscribers(n), t);
                        return
                    }
                    this.notify(this.subscriptions.subscribers(n), t)
                }
            }

            s(br, "AliveSessionProxy");

            function rc() {
                const e = Ya();
                if (!e) return;
                const t = Qa();
                if (!t) return;
                const n = ec();
                if (!n) return;
                const o = tc();
                if (!o) return;
                const i = s(() => {
                        if (Ja()) try {
                            return new br(e, t, n, o, gr)
                        } catch {
                        }
                        return new hr(t, n, !1, gr)
                    }, "createSession")(), a = (0, x.g)(w => i.subscribe(w.flat())),
                    l = (0, x.g)(w => i.unsubscribeAll(...w)), y = (0, x.g)(w => i.updatePresenceMetadata(w));
                (0, d.N7)(".js-socket-channel[data-channel]", {
                    subscribe: w => {
                        const S = nc(w), q = S.map($ => $.topic.name).filter($ => (0, Pe.A)($));
                        let H = {
                            unsubscribe() {
                            }
                        };
                        if (q.length) {
                            let $, V;
                            const Q = s(() => {
                                const Y = [];
                                $ && Y.push($), V !== void 0 && Y.push({[Pe.ZE]: V ? 1 : 0});
                                for (const oe of q) y({subscriber: w, channelName: oe, metadata: Y})
                            }, "queueMetadataOrIdleChange");
                            H = (0, A.qC)((0, A.RB)(w, "socket:set-presence-metadata", Y => {
                                const {detail: oe} = Y;
                                $ = oe, Q()
                            }), Za(Y => {
                                !(0, U.c)("PRESENCE_IDLE") || (V = Y, Q())
                            }))
                        }
                        return a(S), H
                    }, remove: w => l(w)
                }), window.addEventListener("online", () => i.online()), window.addEventListener("offline", () => i.offline()), window.addEventListener("pagehide", () => {
                    "hangup" in i && i.hangup()
                })
            }

            s(rc, "connect"), (async () => (await ye.x, rc()))();
            const yr = new Map;

            function sc(e, t) {
                const n = [];
                for (const o of e) {
                    const r = yr.get(o.name);
                    r && r.arrived > t && n.push(r)
                }
                return n
            }

            s(sc, "stale");

            function ic(e, t) {
                for (const n of e.querySelectorAll(".js-socket-channel[data-channel]")) for (const o of sc(pr(n), t)) n.dispatchEvent(new CustomEvent("socket:message", {
                    bubbles: !1,
                    cancelable: !1,
                    detail: {name: o.name, data: o.data, cached: !0}
                }))
            }

            s(ic, "dispatch");

            function ac(e) {
                const {name: t, data: n, cached: o} = e.detail;
                if (o) return;
                const r = {name: t, data: {...n}, arrived: Date.now()};
                r.data.wait = 0, yr.set(t, r)
            }

            s(ac, "store"), document.addEventListener("socket:message", ac, {capture: !0}), document.addEventListener("pjax:popstate", function (e) {
                const t = e.target, n = e.detail.cachedAt;
                n && setTimeout(() => ic(t, n))
            }), (0, d.N7)("form.js-auto-replay-enforced-sso-request", {
                constructor: HTMLFormElement, initialize(e) {
                    (0, L.Bt)(e)
                }
            });
            var pu = u(18883);

            function vr(e, t, n) {
                const o = e.getBoundingClientRect().height, r = t.getBoundingClientRect(),
                    i = n.getBoundingClientRect();
                let a = i.top;
                a + r.height + 10 >= o && (a = Math.max(o - r.height - 10, 0));
                let l = i.right;
                n.closest(".js-build-status-to-the-left") != null && (l = Math.max(i.left - r.width - 10, 0)), t.style.top = `${a}px`, t.style.left = `${l}px`, t.style.right = "auto"
            }

            s(vr, "updateStatusPosition"), (0, c.on)("toggle", ".js-build-status .js-dropdown-details", function (e) {
                const t = e.currentTarget, n = t.querySelector(".js-status-dropdown-menu");
                if (!n) return;

                function o() {
                    t.hasAttribute("open") || i()
                }

                s(o, "closeOnToggle");

                function r(a) {
                    n.contains(a.target) || i()
                }

                s(r, "closeOnScroll");

                function i() {
                    t.removeAttribute("open"), n.classList.add("d-none"), t.appendChild(n), t.removeEventListener("toggle", o), window.removeEventListener("scroll", r)
                }

                s(i, "closeStatusPopover"), t.addEventListener("toggle", o), n.classList.contains("js-close-menu-on-scroll") && window.addEventListener("scroll", r, {capture: !0}), n.classList.remove("d-none"), n.querySelector(".js-details-container").classList.add("open"), n.classList.contains("js-append-menu-to-body") && (document.body.appendChild(n), vr(document.body, n, t))
            }, {capture: !0});

            async function wr(e) {
                const t = e.querySelector(".js-dropdown-details"),
                    n = e.querySelector(".js-status-dropdown-menu") || e.closest(".js-status-dropdown-menu");
                if (!(n instanceof HTMLElement)) return;
                const o = n.querySelector(".js-status-loader");
                if (!o) return;
                const r = n.querySelector(".js-status-loading"), i = n.querySelector(".js-status-error"),
                    a = o.getAttribute("data-contents-url");
                r.classList.remove("d-none"), i.classList.add("d-none");
                let l;
                try {
                    await (0, nn.Z)(), l = await (0, pe.a)(document, a)
                } catch {
                    r.classList.add("d-none"), i.classList.remove("d-none")
                }
                l && (o.replaceWith(l), n.querySelector(".js-details-container").classList.add("open"), t && n.classList.contains("js-append-menu-to-body") && vr(document.body, n, t))
            }

            s(wr, "loadStatus"), (0, c.on)("click", ".js-status-retry", ({currentTarget: e}) => {
                wr(e)
            });

            function Er(e) {
                const t = e.currentTarget;
                wr(t)
            }

            s(Er, "onMouseEnter"), (0, d.N7)(".js-build-status", {
                add(e) {
                    e.addEventListener("mouseenter", Er, {once: !0})
                }, remove(e) {
                    e.removeEventListener("mouseenter", Er)
                }
            });
            var gu = u(8777), cc = u(92929);
            (0, c.on)("click", "button[data-sudo-required], summary[data-sudo-required]", Lr), (0, d.N7)("form[data-sudo-required]", {
                constructor: HTMLFormElement,
                subscribe: e => (0, A.RB)(e, "submit", Lr)
            });

            async function Lr(e) {
                const t = e.currentTarget;
                if (!(t instanceof HTMLElement)) return;
                e.stopPropagation(), e.preventDefault(), await (0, cc.Z)() && (t.removeAttribute("data-sudo-required"), t instanceof HTMLFormElement ? (0, L.Bt)(t) : t.click())
            }

            s(Lr, "checkSudo");
            const jr = {
                "actor:": "ul.js-user-suggestions",
                "user:": "ul.js-user-suggestions",
                "operation:": "ul.js-operation-suggestions",
                "org:": "ul.js-org-suggestions",
                "action:": "ul.js-action-suggestions",
                "repo:": "ul.js-repo-suggestions",
                "country:": "ul.js-country-suggestions"
            };
            (0, d.N7)("text-expander[data-audit-url]", {subscribe: e => (0, A.qC)((0, A.RB)(e, "text-expander-change", uc), (0, A.RB)(e, "text-expander-value", lc))});

            function lc(e) {
                const t = e.detail;
                if (!Sr(t.key)) return;
                const n = t.item.getAttribute("data-value");
                t.value = `${t.key}${n}`
            }

            s(lc, "onvalue");

            function uc(e) {
                const {key: t, provide: n, text: o} = e.detail;
                if (!Sr(t)) return;
                const i = e.target.getAttribute("data-audit-url");
                n(mc(i, t, o))
            }

            s(uc, "onchange");

            function dc(e, t) {
                const n = t.toLowerCase(), o = s(r => {
                    const i = r.textContent.toLowerCase().trim(), a = (0, Ae.EW)(i, n);
                    return a > 0 ? {score: a, text: i} : null
                }, "key");
                return n ? (0, Ge.W)(e, o, Ae.qu) : e
            }

            s(dc, "search");
            const fc = (0, qe.Z)(e => [...e.children], {hash: e => e.className});

            async function mc(e, t, n) {
                const r = (await gc(e)).querySelector(hc(t));
                if (!r) return {matched: !1};
                const i = dc(fc(r), n).slice(0, 5), a = r.cloneNode(!1);
                a.innerHTML = "";
                for (const l of i) a.append(l);
                return {fragment: a, matched: i.length > 0}
            }

            s(mc, "auditMenu");

            function Sr(e) {
                return Object.getOwnPropertyNames(jr).includes(e)
            }

            s(Sr, "isActivationKey");

            function hc(e) {
                const t = jr[e];
                if (!t) throw new Error(`Unknown audit log expander key: ${e}`);
                return t
            }

            s(hc, "audit_log_suggester_selector");

            async function pc(e) {
                const t = await (0, pe.a)(document, e), n = document.createElement("div");
                return n.append(t), n
            }

            s(pc, "fetchMenu");
            const gc = (0, qe.Z)(pc);

            function bc(e) {
                if (e.hasAttribute("data-use-colon-emoji")) return e.getAttribute("data-value");
                const t = e.firstElementChild;
                return t && t.tagName === "G-EMOJI" && !t.firstElementChild ? t.textContent : e.getAttribute("data-value")
            }

            s(bc, "getValue");

            function yc(e, t) {
                const n = ` ${t.toLowerCase().replace(/_/g, " ")}`, o = s(r => {
                    const i = r.getAttribute("data-emoji-name"), a = wc(vc(r), n);
                    return a > 0 ? {score: a, text: i} : null
                }, "key");
                return (0, Ge.W)(e, o, Ae.qu)
            }

            s(yc, "emoji_suggester_search");

            function vc(e) {
                return ` ${e.getAttribute("data-text").trim().toLowerCase().replace(/_/g, " ")}`
            }

            s(vc, "emojiText");

            function wc(e, t) {
                const n = e.indexOf(t);
                return n > -1 ? 1e3 - n : 0
            }

            s(wc, "emojiScore"), (0, d.N7)("text-expander[data-emoji-url]", {subscribe: e => (0, A.qC)((0, A.RB)(e, "text-expander-change", Lc), (0, A.RB)(e, "text-expander-value", Ec))});

            function Ec(e) {
                const t = e.detail;
                t.key === ":" && (t.value = bc(t.item))
            }

            s(Ec, "emoji_suggester_onvalue");

            function Lc(e) {
                const {key: t, provide: n, text: o} = e.detail;
                if (t !== ":") return;
                const i = e.target.getAttribute("data-emoji-url");
                n(jc(i, o))
            }

            s(Lc, "emoji_suggester_onchange");

            async function jc(e, t) {
                const [n, o] = await Tc(e), r = yc(o, t).slice(0, 5);
                n.innerHTML = "";
                for (const i of r) n.append(i);
                return {fragment: n, matched: r.length > 0}
            }

            s(jc, "emojiMenu");

            async function Sc(e) {
                const n = (await (0, pe.a)(document, e)).firstElementChild;
                return [n, [...n.children]]
            }

            s(Sc, "fetchEmoji");
            const Tc = (0, qe.Z)(Sc);
            var _e = u(38772);

            function Ac(e) {
                return `${e.number} ${e.title.trim().toLowerCase()}`
            }

            s(Ac, "asText");

            function Cc(e, t) {
                if (!t) return e;
                const n = new RegExp(`\\b${kc(t)}`), o = /^\d+$/.test(t) ? i => xc(i, n) : i => (0, Ae.EW)(i, t),
                    r = s(i => {
                        const a = Ac(i), l = o(a);
                        return l > 0 ? {score: l, text: a} : null
                    }, "key");
                return (0, Ge.W)(e, r, Ae.qu)
            }

            s(Cc, "issue_suggester_search");

            function kc(e) {
                return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            }

            s(kc, "escapeRegExp");

            function xc(e, t) {
                const n = e.search(t);
                return n > -1 ? 1e3 - n : 0
            }

            s(xc, "issueNumberScore");

            function Mc(e, t, n) {
                const o = s(i => _e.dy`
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${i.map(r)}
    </ul>
  `, "itemsTemplate"), r = s(i => {
                    const a = i.type in n ? (0, P.r)(document, n[i.type]) : "";
                    return _e.dy`
      <li class="markdown-title" role="option" id="suggester-issue-${i.id}" data-value="${i.number}">
        <span class="d-inline-block mr-1">${a}</span>
        <small>#${i.number}</small> ${(0, _e.Au)(i.title)}
      </li>
    `
                }, "itemTemplate");
                (0, _e.sY)(o(e), t)
            }

            s(Mc, "renderResults"), (0, d.N7)("text-expander[data-issue-url]", {
                subscribe: e => {
                    const t = [(0, A.RB)(e, "text-expander-change", Rc), (0, A.RB)(e, "text-expander-value", qc), (0, A.RB)(e, "keydown", _c), (0, A.RB)(e, "click", Pc)];
                    return (0, A.qC)(...t)
                }
            });

            function qc(e) {
                const t = e.detail;
                if (t.key !== "#") return;
                const n = t.item.getAttribute("data-value");
                t.value = `#${n}`
            }

            s(qc, "issue_suggester_onvalue");

            function Rc(e) {
                const {key: t, provide: n, text: o} = e.detail;
                if (t !== "#") return;
                if (o === "#") {
                    kn(e.target);
                    return
                }
                const i = e.target.getAttribute("data-issue-url");
                n(Ic(i, o))
            }

            s(Rc, "issue_suggester_onchange");

            function kn(e) {
                if (!e) return;
                const t = e.closest("text-expander");
                t && t.dismiss()
            }

            s(kn, "hideSuggestions");

            function Pc(e) {
                kn(e.target)
            }

            s(Pc, "issue_suggester_onclick");

            function _c(e) {
                const t = ["ArrowRight", "ArrowLeft"], {key: n} = e;
                t.indexOf(n) < 0 || kn(e.target)
            }

            s(_c, "issue_suggester_onkeydown");

            async function Ic(e, t) {
                const n = await Dc(e), o = document.createElement("div"), r = Cc(n.suggestions, t).slice(0, 5);
                return Mc(r, o, n.icons), {fragment: o.firstElementChild, matched: r.length > 0}
            }

            s(Ic, "issueMenu");
            const Dc = (0, qe.Z)(async function (e) {
                const t = await self.fetch(e, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json"
                    }
                });
                if (!t.ok) {
                    const n = new Error, o = t.statusText ? ` ${t.statusText}` : "";
                    throw n.message = `HTTP ${t.status}${o}`, n
                }
                return t.json()
            });

            function Hc(e) {
                return e.description ? `${e.name} ${e.description}`.trim().toLowerCase() : `${e.login} ${e.name}`.trim().toLowerCase()
            }

            s(Hc, "mention_suggester_asText");

            function Oc(e, t) {
                if (!t) return e;
                const n = Bc(t), o = s(r => {
                    const i = Hc(r), a = n(i, r.participant);
                    return a > 0 ? {score: a, text: i} : null
                }, "key");
                return (0, Ge.W)(e, o, Ae.qu)
            }

            s(Oc, "mention_suggester_search");

            function Nc(e, t) {
                const n = s(r => _e.dy`
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${r.map(o)}
    </ul>
  `, "itemsTemplate"), o = s(r => {
                    const i = r.type === "user" ? r.login : r.name, a = r.type === "user" ? r.name : r.description;
                    return _e.dy`
      <li role="option" id="suggester-${r.id}-${r.type}-${i}" data-value="${i}">
        <span>${i}</span>
        <small>${a}</small>
      </li>
    `
                }, "itemTemplate");
                (0, _e.sY)(n(e), t)
            }

            s(Nc, "mention_suggester_renderResults");

            function Bc(e) {
                if (!e) return () => 2;
                const t = e.toLowerCase().split("");
                return (n, o) => {
                    if (!n) return 0;
                    const r = $c(n, t);
                    if (!r) return 0;
                    const a = e.length / r[1] / (r[0] / 2 + 1);
                    return o ? a + 1 : a
                }
            }

            s(Bc, "fuzzyScorer");

            function $c(e, t) {
                let n, o, r, i;
                const a = Fc(e, t[0]);
                if (a.length === 0) return null;
                if (t.length === 1) return [a[0], 1, []];
                for (i = null, o = 0, r = a.length; o < r; o++) {
                    const l = a[o];
                    if (!(n = Uc(e, t, l + 1))) continue;
                    const y = n[n.length - 1] - l;
                    (!i || y < i[1]) && (i = [l, y, n])
                }
                return i
            }

            s($c, "shortestMatch");

            function Fc(e, t) {
                let n = 0;
                const o = [];
                for (; (n = e.indexOf(t, n)) > -1;) o.push(n++);
                return o
            }

            s(Fc, "allIndexesOf");

            function Uc(e, t, n) {
                let o = n;
                const r = [];
                for (let i = 1; i < t.length; i += 1) {
                    if (o = e.indexOf(t[i], o), o === -1) return;
                    r.push(o++)
                }
                return r
            }

            s(Uc, "indexesOfChars"), (0, d.N7)("text-expander[data-mention-url]", {subscribe: e => (0, A.qC)((0, A.RB)(e, "text-expander-change", zc), (0, A.RB)(e, "text-expander-value", Wc))});

            function Wc(e) {
                const t = e.detail;
                if (t.key !== "@") return;
                const n = t.item.getAttribute("data-value");
                t.value = `@${n}`
            }

            s(Wc, "mention_suggester_onvalue");

            function zc(e) {
                const {key: t, provide: n, text: o} = e.detail;
                if (t !== "@" || (o == null ? void 0 : o.split(" ").length) > 1) return;
                const i = e.target.getAttribute("data-mention-url");
                n(Kc(i, o))
            }

            s(zc, "mention_suggester_onchange");

            async function Kc(e, t) {
                const n = await Vc(e), o = document.createElement("div"), r = Oc(n, t).slice(0, 5);
                return Nc(r, o), {fragment: o.firstElementChild, matched: r.length > 0}
            }

            s(Kc, "mentionMenu");
            const Vc = (0, qe.Z)(async function (e) {
                const t = await self.fetch(e, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json"
                    }
                });
                if (!t.ok) {
                    const n = new Error, o = t.statusText ? ` ${t.statusText}` : "";
                    throw n.message = `HTTP ${t.status}${o}`, n
                }
                return t.json()
            });

            function Xc(e, t) {
                const n = e.closest(".js-survey-question-form"), o = n.querySelector("input.js-survey-other-text"),
                    r = t && !n.classList.contains("is-other-selected");
                n.classList.toggle("is-other-selected", r), o.hidden = !t, r ? (o.required = !0, o.focus()) : o.required = !1, (0, c.f)(o, "change")
            }

            s(Xc, "handleOther"), (0, c.on)("change", "input.js-survey-radio", function ({currentTarget: e}) {
                Xc(e, e.classList.contains("js-survey-radio-other"))
            }), (0, c.on)("change", "input.js-survey-checkbox-enable-submit", function ({currentTarget: e}) {
                var t;
                const n = e.checked,
                    o = (t = e.closest("form")) == null ? void 0 : t.querySelector("button[type=submit]");
                o.disabled = !n
            }), (0, c.on)("change", "input.js-survey-contact-checkbox", function (e) {
                const t = e.currentTarget,
                    o = t.closest(".js-survey-question-form").querySelector(".js-survey-contact-checkbox-hidden");
                t.checked ? o.setAttribute("disabled", "true") : o.removeAttribute("disabled")
            }), (0, c.on)("details-menu-selected", ".js-sync-select-menu-text", function (e) {
                const t = document.querySelector(".js-sync-select-menu-button"),
                    n = e.detail.relatedTarget.querySelector("span[data-menu-button-text]").textContent;
                t.textContent = n, t.focus()
            }, {capture: !0}), (0, c.on)("click", 'tab-container [role="tab"]', function (e) {
                const {currentTarget: t} = e,
                    o = t.closest("tab-container").querySelector(".js-filterable-field, [data-filter-placeholder-input]");
                if (o instanceof HTMLInputElement) {
                    const r = t.getAttribute("data-filter-placeholder");
                    r && o.setAttribute("placeholder", r), o.focus()
                }
            }), (0, c.on)("tab-container-changed", "tab-container", function (e) {
                const t = e.detail.relatedTarget, n = t.getAttribute("data-fragment-url"),
                    o = t.querySelector("include-fragment");
                n && o && !o.hasAttribute("src") && (o.src = n)
            });
            var bu = u(29935), Tr = u(96776);
            document.addEventListener("keydown", e => {
                if (e.key !== "Escape" || e.target !== document.body) return;
                const t = document.querySelector(".js-targetable-element:target");
                !t || (0, Tr.uQ)(t, () => {
                    window.location.hash = "", (0, E.lO)(window.history.state, "", window.location.pathname + window.location.search)
                })
            }), document.addEventListener("click", e => {
                const t = document.querySelector(".js-targetable-element:target");
                !t || e.target instanceof HTMLAnchorElement || e.target instanceof HTMLElement && (t.contains(e.target) || (0, Tr.uQ)(t, () => {
                    window.location.hash = "", (0, E.lO)(window.history.state, "", window.location.pathname + window.location.search)
                }))
            });
            var yu = u(86248);

            async function Gc(e) {
                const t = e.currentTarget;
                if (Jc(t)) {
                    t.classList.remove("tooltipped");
                    return
                }
                const n = t.getAttribute("data-url");
                if (!n) return;
                const o = await fetch(n, {headers: {Accept: "application/json"}});
                if (!o.ok) return;
                const r = await o.json(), i = t.getAttribute("data-id"),
                    a = document.querySelectorAll(`.js-team-mention[data-id='${i}']`);
                for (const l of a) l.removeAttribute("data-url");
                try {
                    r.total === 0 ? r.members.push("This team has no members") : r.total > r.members.length && r.members.push(`${r.total - r.members.length} more`), Ar(a, Zc(r.members))
                } catch (l) {
                    const y = l.response ? l.response.status : 500,
                        w = t.getAttribute(y === 404 ? "data-permission-text" : "data-error-text");
                    Ar(a, w)
                }
            }

            s(Gc, "members");

            function Ar(e, t) {
                for (const n of e) n instanceof HTMLElement && (n.setAttribute("aria-label", t), n.classList.add("tooltipped", "tooltipped-s", "tooltipped-multiline"))
            }

            s(Ar, "tip");

            function Zc(e) {
                if ("ListFormat" in Intl) return new Intl.ListFormat().format(e);
                if (e.length === 0) return "";
                if (e.length === 1) return e[0];
                if (e.length === 2) return e.join(" and ");
                {
                    const t = e[e.length - 1];
                    return e.slice(0, -1).concat(`and ${t}`).join(", ")
                }
            }

            s(Zc, "sentence");

            function Jc(e) {
                return !!e.getAttribute("data-hovercard-url") && !!e.closest("[data-team-hovercards-enabled]")
            }

            s(Jc, "teamHovercardEnabled"), (0, d.N7)(".js-team-mention", function (e) {
                e.addEventListener("mouseenter", Gc)
            });

            function Yc() {
                const e = document.querySelector(".js-timeline-marker");
                return e != null ? e.getAttribute("data-last-modified") : null
            }

            s(Yc, "getTimelineLastModified");

            function Cr(e) {
                if (el(e) || Qc(e)) return;
                const t = Yc();
                t && e.headers.set("X-Timeline-Last-Modified", t)
            }

            s(Cr, "addTimelineLastModifiedHeader");

            function Qc(e) {
                return e.headers.get("X-PJAX") === "true"
            }

            s(Qc, "isPjax");

            function el(e) {
                let t;
                try {
                    t = new URL(e.url)
                } catch {
                    return !0
                }
                return t.host !== window.location.host
            }

            s(el, "isCrossDomain"), (0, C.AC)(".js-needs-timeline-marker-header", function (e, t, n) {
                Cr(n)
            }), (0, c.on)("deprecatedAjaxSend", "[data-remote]", function (e) {
                const {request: t} = e.detail;
                Cr(t)
            });
            const kr = 5e3, tl = ".js-comment-body img", nl = ".js-comment-body video";
            (0, Zt.Z)(function () {
                At()
            }), (0, d.N7)(".js-timeline-progressive-focus-container", function (e) {
                const t = Ct();
                if (!t || document.querySelector(".js-pull-discussion-timeline")) return;
                const o = document.getElementById(t);
                o && e.contains(o) && xn(o)
            });

            function At(e = !0) {
                const t = Ct();
                if (!t) return;
                const n = document.getElementById(t);
                if (n) xn(n); else {
                    if (ol(t)) return;
                    const o = document.querySelector("#js-timeline-progressive-loader");
                    o && e && qr(t, o)
                }
            }

            s(At, "focusOrLoadElement");

            function ol(e) {
                return rl(e) || xr(e, ".js-thread-hidden-comment-ids") || xr(e, ".js-review-hidden-comment-ids")
            }

            s(ol, "loadComments");

            function rl(e) {
                const t = Mr(e, ".js-comment-container");
                return t ? ((0, Jt.$)(t), !0) : !1
            }

            s(rl, "loadResolvedComments");

            function xr(e, t) {
                const n = Mr(e, t);
                return n ? (n.addEventListener("page:loaded", function () {
                    At()
                }), n.querySelector("button[type=submit]").click(), !0) : !1
            }

            s(xr, "loadHiddenComments");

            function Mr(e, t) {
                var n;
                const o = document.querySelectorAll(t);
                for (const r of o) {
                    const i = r.getAttribute("data-hidden-comment-ids");
                    if (i) {
                        const a = i.split(","), l = (n = e.match(/\d+/g)) == null ? void 0 : n[0];
                        if (l && a.includes(l)) return r
                    }
                }
                return null
            }

            s(Mr, "findCommentContainer"), (0, d.N7)(".js-inline-comments-container", function (e) {
                const t = Ct();
                if (!t) return;
                const n = document.getElementById(t);
                n && e.contains(n) && xn(n)
            }), (0, d.N7)("#js-discussions-timeline-anchor-loader", {
                constructor: HTMLElement, add: e => {
                    if (document.querySelector("#js-timeline-progressive-loader")) return;
                    const n = Ct();
                    if (!n) return;
                    document.getElementById(n) || qr(n, e)
                }
            });

            async function sl() {
                const e = document.querySelectorAll(nl), t = Array.from(e).map(n => new Promise(o => {
                    if (n.readyState >= n.HAVE_METADATA) o(n); else {
                        const r = setTimeout(() => o(n), kr), i = s(() => {
                            clearTimeout(r), o(n)
                        }, "done");
                        n.addEventListener("loadeddata", () => {
                            n.readyState >= n.HAVE_METADATA && i()
                        }), n.addEventListener("error", () => i())
                    }
                }));
                return Promise.all(t)
            }

            s(sl, "videosReady");

            async function il() {
                const e = document.querySelectorAll(tl), t = Array.from(e).map(n => {
                    new Promise(o => {
                        if (n.complete) o(n); else {
                            const r = setTimeout(() => o(n), kr), i = s(() => {
                                clearTimeout(r), o(n)
                            }, "done");
                            n.addEventListener("load", () => i()), n.addEventListener("error", () => i())
                        }
                    })
                });
                return Promise.all(t)
            }

            s(il, "imagesReady");

            async function al() {
                return Promise.all([sl(), il()])
            }

            s(al, "mediaLoaded");

            async function xn(e) {
                await al(), cl(e);
                const t = e.querySelector(`[href='#${e.id}']`);
                if (t) {
                    const n = t.getAttribute("data-turbo");
                    t.setAttribute("data-turbo", "false"), t.click(), n === null ? t.removeAttribute("data-turbo") : t.setAttribute("data-turbo", n)
                }
            }

            s(xn, "focusElement");

            async function qr(e, t) {
                if (!t) return;
                const n = t.getAttribute("data-timeline-item-src");
                if (!n) return;
                const o = new URL(n, window.location.origin), r = new URLSearchParams(o.search.slice(1));
                r.append("anchor", e), o.search = r.toString();
                let i;
                try {
                    i = await (0, pe.a)(document, o.toString())
                } catch {
                    return
                }
                const a = i.querySelector(".js-timeline-item");
                if (!a) return;
                const l = a.getAttribute("data-gid");
                if (!l) return;
                const y = document.querySelector(`.js-timeline-item[data-gid='${l}']`);
                if (y) y.replaceWith(a), At(!1); else {
                    const w = document.getElementById("js-progressive-timeline-item-container");
                    w && w.replaceWith(i), At(!1)
                }
            }

            s(qr, "loadElement");

            function cl(e) {
                const t = e.closest("details, .js-details-container");
                !t || (t.nodeName === "DETAILS" ? t.setAttribute("open", "open") : (0, Gt.jo)(t) || (0, Gt.Qp)(t))
            }

            s(cl, "expandDetailsIfPresent");

            function Ct() {
                return window.location.hash.slice(1)
            }

            s(Ct, "urlAnchor"), (0, d.N7)(".js-discussion", ll);

            function ll() {
                let e = new WeakSet;
                t(), document.addEventListener("pjax:end", t), document.addEventListener("turbo:load", t), (0, d.N7)(".js-timeline-item", n => {
                    n instanceof HTMLElement && (e.has(n) || (0, h.N)(n))
                });

                function t() {
                    e = new WeakSet(document.querySelectorAll(".js-timeline-item"))
                }

                s(t, "setExistingTimelineItems")
            }

            s(ll, "announceTimelineEvents");
            var Ye = u(82131);

            function Qe(e) {
                const {name: t, value: n} = e, o = {name: window.location.href};
                switch (t) {
                    case"CLS":
                        o.cls = n;
                        break;
                    case"FCP":
                        o.fcp = n;
                        break;
                    case"FID":
                        o.fid = n;
                        break;
                    case"LCP":
                        o.lcp = n;
                        break;
                    case"TTFB":
                        o.ttfb = n;
                        break
                }
                (0, he.b)({webVitalTimings: [o]}), ul(t, n)
            }

            s(Qe, "sendVitals");

            function ul(e, t) {
                const n = document.querySelector("#staff-bar-web-vitals"),
                    o = n == null ? void 0 : n.querySelector(`[data-metric=${e.toLowerCase()}]`);
                !o || (o.textContent = t.toPrecision(6))
            }

            s(ul, "updateStaffBar");

            function dl() {
                return !!(window.performance && window.performance.timing && window.performance.getEntriesByType)
            }

            s(dl, "isTimingSuppported");

            async function fl() {
                if (!dl()) return;
                await ye.C, await new Promise(n => setTimeout(n));
                const e = window.performance.getEntriesByType("resource");
                e.length && (0, he.b)({resourceTimings: e});
                const t = window.performance.getEntriesByType("navigation");
                t.length && (0, he.b)({navigationTimings: t})
            }

            s(fl, "sendTimingResults"), fl(), (0, Ye.kz)(Qe), (0, Ye.Y)(Qe), (0, Ye.Tx)(Qe), (0, Ye.Tb)(Qe), (0, Ye.CA)(Qe), (0, c.on)("click", ".js-toggler-container .js-toggler-target", function (e) {
                if (e.button !== 0) return;
                const t = e.currentTarget.closest(".js-toggler-container");
                t && t.classList.toggle("on")
            }), (0, C.AC)(".js-toggler-container", async (e, t) => {
                e.classList.remove("success", "error"), e.classList.add("loading");
                try {
                    await t.text(), e.classList.add("success")
                } catch {
                    e.classList.add("error")
                } finally {
                    e.classList.remove("loading")
                }
            }), async function () {
                var e;
                if ("serviceWorker" in navigator) {
                    await ye.x;
                    const t = (e = document.querySelector('link[rel="service-worker-src"]')) == null ? void 0 : e.href;
                    t ? navigator.serviceWorker.register(t, {scope: "/"}) : await ml()
                }
            }();

            async function ml() {
                let e = [];
                try {
                    e = await navigator.serviceWorker.getRegistrations()
                } catch (t) {
                    if (t.name === "SecurityError") return
                }
                for (const t of e) t.unregister()
            }

            if (s(ml, "unregisterAllServiceWorkers"), (0, U.c)("TURBO")) {
                (async () => {
                    const {
                            PageRenderer: t,
                            session: n,
                            navigator: o
                        } = await u.e("vendors-node_modules_manuelpuyol_turbo_dist_turbo_es2017-esm_js").then(u.bind(u, 74395)),
                        r = n.adapter;

                    function i() {
                        r.progressBar.setValue(0), r.progressBar.show()
                    }

                    s(i, "beginProgressBar");

                    function a() {
                        r.progressBar.setValue(1), r.progressBar.hide()
                    }

                    s(a, "completeProgressBar"), document.addEventListener("turbo:before-fetch-request", S => {
                        const q = S.target;
                        if ((q == null ? void 0 : q.tagName) === "TURBO-FRAME" && i(), (q == null ? void 0 : q.tagName) === "HTML") {
                            const $ = S;
                            $.detail.fetchOptions.headers["Turbo-Visit"] = "true"
                        }
                        const H = sr(S.detail.url.pathname);
                        if (H) {
                            const $ = new URLSearchParams(S.detail.url.search);
                            for (const [V, Q] of Object.entries(H)) Q && $.set(V, Q);
                            S.detail.url.search = $.toString()
                        }
                    }), document.addEventListener("turbo:frame-render", S => {
                        const q = S.target;
                        (q == null ? void 0 : q.tagName) === "TURBO-FRAME" && a()
                    }), document.addEventListener(ie.QE.START, i), document.addEventListener(ie.QE.END, a);
                    const l = Object.getOwnPropertyDescriptor(t.prototype, "reloadReason").get;
                    Object.defineProperty(t.prototype, "reloadReason", {
                        get() {
                            const S = l.call(this);
                            if (S.reason !== "tracked_element_mismatch") return S;
                            const q = Object.fromEntries(y(this.currentHeadSnapshot)), H = [];
                            for (const [$, V] of y(this.newHeadSnapshot)) q[$] !== V && H.push($.replace(/^x-/, "").replaceAll("-", "_"));
                            return {reason: `tracked_element_mismatch-${H.join("-")}`}
                        }
                    });

                    function* y(S) {
                        for (const q of Object.values(S.detailsByOuterHTML)) if (q.tracked) for (const H of q.elements) H instanceof HTMLMetaElement && H.getAttribute("http-equiv") && (yield[H.getAttribute("http-equiv") || "", H.getAttribute("content") || ""])
                    }

                    s(y, "getSnapshotSignatures");

                    function w(S) {
                        const q = history[S];
                        history[S] = function (H, $, V) {
                            var Q;

                            function Y(oe, le, ue) {
                                q.call(this, {...H, ...oe}, le, ue)
                            }

                            s(Y, "oldHistoryWithMergedState"), o.history.update(Y, new URL(V || location.href, location.href), (Q = H == null ? void 0 : H.turbo) == null ? void 0 : Q.restorationIdentifier)
                        }
                    }

                    s(w, "patchHistoryApi"), w("replaceState"), w("pushState")
                })();
                const e = s((t, n) => {
                    const o = new URL(t, window.location.origin), r = new URL(n, window.location.origin);
                    return Boolean(r.hash) && o.hash !== r.hash && o.host === r.host && o.pathname === r.pathname && o.search === r.search
                }, "isHashNavigation");
                document.addEventListener("turbo:click", function (t) {
                    if (!(t.target instanceof HTMLElement)) return;
                    const n = t.target.closest("[data-turbo-frame]");
                    n instanceof HTMLElement && t.target.setAttribute("data-turbo-frame", n.getAttribute("data-turbo-frame") || ""), t instanceof CustomEvent && e(location.href, t.detail.url) && t.preventDefault()
                }), document.addEventListener("turbo:before-render", t => {
                    if (!(t instanceof CustomEvent)) return;
                    const n = t.detail.newBody.ownerDocument.documentElement, o = document.documentElement;
                    for (const r of o.attributes) !n.hasAttribute(r.nodeName) && r.nodeName !== "aria-busy" && o.removeAttribute(r.nodeName);
                    for (const r of n.attributes) o.getAttribute(r.nodeName) !== r.nodeValue && o.setAttribute(r.nodeName, r.nodeValue)
                }), document.addEventListener("turbo:visit", ie.LD), document.addEventListener("turbo:render", ie.FP), document.addEventListener("beforeunload", ie.FP), document.addEventListener("turbo:load", t => {
                    Object.keys(t.detail.timing).length === 0 ? (0, ie.OE)() || (0, ie.Po)() ? (0, ie.Ys)() : (0, ie.F6)() : (0, ie.Xk)()
                }), document.addEventListener("turbo:before-visit", function (t) {
                    var n;
                    const o = (n = window.onbeforeunload) == null ? void 0 : n.call(window, t);
                    o && (confirm(o) ? window.onbeforeunload = null : t.preventDefault())
                }), document.addEventListener("turbo:reload", function (t) {
                    t instanceof CustomEvent && (0, ie.Ak)(t.detail.reason)
                }), document.addEventListener(ie.QE.SUCCESS, () => {
                    if (location.hash === "") return;
                    const t = document.createElement("a");
                    t.href = `#${location.hash.slice(1)}`, t.click()
                })
            }

            function hl() {
                if ("Intl" in window) try {
                    return new window.Intl.DateTimeFormat().resolvedOptions().timeZone
                } catch {
                }
            }

            s(hl, "timezone"), window.requestIdleCallback(() => {
                const e = hl();
                e && (0, Ve.d8)("tz", encodeURIComponent(e))
            });
            var J = u(90420), Rr = u(70112), pl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor,
                se = s((e, t, n, o) => {
                    for (var r = o > 1 ? void 0 : o ? gl(t, n) : t, i = e.length - 1, a; i >= 0; i--) (a = e[i]) && (r = (o ? a(t, n, r) : a(r)) || r);
                    return o && r && pl(t, n, r), r
                }, "__decorateClass"),
                bl = (e => (e.Initializing = "initializing", e.Unsupported = "unsupported", e.Ready = "ready", e.Waiting = "waiting", e.Error = "error", e.Submitting = "submitting", e))(bl || {});
            let ge = s(class extends HTMLElement {
                constructor() {
                    super(...arguments);
                    this.state = "initializing", this.json = "", this.autofocusWhenReady = !1, this.autoPrompt = !1, this.hasErrored = !1
                }

                connectedCallback() {
                    this.originalButtonText = this.button.textContent, this.setState((0, Rr.Zh)() ? "ready" : "unsupported"), this.autoPrompt && this.prompt(void 0, !0)
                }

                setState(e) {
                    this.button.textContent = this.hasErrored ? this.button.getAttribute("data-retry-message") : this.originalButtonText, this.button.disabled = !1, this.button.hidden = !1;
                    for (const t of this.messages) t.hidden = !0;
                    switch (e) {
                        case"initializing":
                            this.button.disabled = !0;
                            break;
                        case"unsupported":
                            this.button.disabled = !0, this.unsupportedMessage.hidden = !1;
                            break;
                        case"ready":
                            this.autofocusWhenReady && this.button.focus();
                            break;
                        case"waiting":
                            this.waitingMessage.hidden = !1, this.button.hidden = !0;
                            break;
                        case"error":
                            this.errorMessage.hidden = !1;
                            break;
                        case"submitting":
                            this.button.textContent = "Verifying\u2026", this.button.disabled = !0;
                            break;
                        default:
                            throw new Error("invalid state")
                    }
                    this.state = e
                }

                async prompt(e, t) {
                    e == null || e.preventDefault(), this.dispatchEvent(new CustomEvent("webauthn-get-prompt"));
                    try {
                        t || this.setState("waiting");
                        const n = JSON.parse(this.json), o = await (0, Rr.U2)(n);
                        this.setState("submitting");
                        const r = this.closest(".js-webauthn-form"), i = r.querySelector(".js-webauthn-response");
                        i.value = JSON.stringify(o), (0, L.Bt)(r)
                    } catch (n) {
                        if (!t) throw this.hasErrored = !0, this.setState("error"), n
                    }
                }
            }, "WebauthnGetElement");
            se([J.fA], ge.prototype, "button", 2), se([J.GO], ge.prototype, "messages", 2), se([J.fA], ge.prototype, "unsupportedMessage", 2), se([J.fA], ge.prototype, "waitingMessage", 2), se([J.fA], ge.prototype, "errorMessage", 2), se([J.Lj], ge.prototype, "json", 2), se([J.Lj], ge.prototype, "autofocusWhenReady", 2), se([J.Lj], ge.prototype, "autoPrompt", 2), ge = se([J.Ih], ge);
            var yl = (e => (e.Initializing = "initializing", e.ShowingForm = "showing-form", e.ShowingRevealer = "showing-revealer", e))(yl || {});
            let We = s(class extends HTMLElement {
                constructor() {
                    super(...arguments);
                    this.state = "showing-form"
                }

                connectedCallback() {
                    this.setState(this.state)
                }

                setState(e) {
                    switch (this.revealer.hidden = !0, this.form.hidden = !1, e) {
                        case"initializing":
                            break;
                        case"showing-form":
                            this.dispatchEvent(new CustomEvent("sudo-password-showing-form"));
                            break;
                        case"showing-revealer":
                            this.revealer.hidden = !1, this.form.hidden = !0;
                            break;
                        default:
                            throw new Error("invalid state")
                    }
                    this.state = e
                }

                reveal() {
                    this.setState("showing-form")
                }
            }, "SudoPasswordElement");
            se([J.Lj], We.prototype, "state", 2), se([J.fA], We.prototype, "revealer", 2), se([J.fA], We.prototype, "form", 2), se([J.fA], We.prototype, "passwordField", 2), We = se([J.Ih], We);
            let kt = s(class extends HTMLElement {
                connectedCallback() {
                    var e;
                    (e = this.webauthnGet) == null || e.addEventListener("webauthn-get-prompt", () => {
                        this.sudoPassword.setState("showing-revealer")
                    }), this.sudoPassword.addEventListener("sudo-password-showing-form", () => {
                        var t;
                        (t = this.webauthnGet) == null || t.setState("ready"), this.sudoPassword.passwordField.focus()
                    })
                }
            }, "SudoAuthElement");
            se([J.fA], kt.prototype, "webauthnGet", 2), se([J.fA], kt.prototype, "sudoPassword", 2), kt = se([J.Ih], kt);
            let Mn = 0;

            function vl() {
                if (!document.hasFocus()) return;
                const e = document.querySelector(".js-timeline-marker-form");
                e && e instanceof HTMLFormElement && (0, L.Bt)(e)
            }

            s(vl, "markThreadAsRead");
            const xt = "IntersectionObserver" in window ? new IntersectionObserver(function (e) {
                for (const t of e) t.isIntersecting && Pr(t.target)
            }, {root: null, rootMargin: "0px", threshold: 1}) : null;
            (0, d.N7)(".js-unread-item", {
                constructor: HTMLElement, add(e) {
                    Mn++, xt && xt.observe(e)
                }, remove(e) {
                    Mn--, xt && xt.unobserve(e), Mn === 0 && vl()
                }
            });

            function Pr(e) {
                e.classList.remove("js-unread-item", "unread-item")
            }

            s(Pr, "clearUnread"), (0, d.N7)(".js-discussion[data-channel-target]", {
                subscribe: e => (0, A.RB)(e, "socket:message", function (t) {
                    const n = t.target, o = t.detail.data;
                    if (n.getAttribute("data-channel-target") === o.gid) for (const r of document.querySelectorAll(".js-unread-item")) Pr(r)
                })
            });
            let Mt = 0;
            const _r = /^\(\d+\)\s+/;

            function Ir() {
                const e = Mt ? `(${Mt}) ` : "";
                document.title.match(_r) ? document.title = document.title.replace(_r, e) : document.title = `${e}${document.title}`
            }

            s(Ir, "updateTitle"), (0, d.N7)(".js-unread-item", {
                add() {
                    Mt++, Ir()
                }, remove() {
                    Mt--, Ir()
                }
            }), (0, d.N7)(".js-socket-channel.js-updatable-content", {
                subscribe: e => (0, A.RB)(e, "socket:message", function (t) {
                    const {gid: n, wait: o} = t.detail.data, r = t.target, i = n ? wl(r, n) : r;
                    i && setTimeout(Me.x0, o || 0, i)
                })
            });

            function wl(e, t) {
                if (e.getAttribute("data-gid") === t) return e;
                for (const n of e.querySelectorAll("[data-url][data-gid]")) if (n.getAttribute("data-gid") === t) return n;
                return null
            }

            s(wl, "findByGid");

            async function El() {
                if (!(!history.state || !history.state.staleRecords)) {
                    await ye.x;
                    for (const e in history.state.staleRecords) for (const t of document.querySelectorAll(`.js-updatable-content [data-url='${e}'], .js-updatable-content[data-url='${e}']`)) {
                        const n = history.state.staleRecords[e];
                        t instanceof HTMLElement && (0, Me.Of)(t, n, !0)
                    }
                    (0, E.lO)(null, "", location.href)
                }
            }

            s(El, "reapplyPreviouslyUpdatedContent"), window.addEventListener("pagehide", Me.z8);
            try {
                El()
            } catch {
            }
            (0, c.on)("upload:setup", ".js-upload-avatar-image", function (e) {
                const {form: t} = e.detail, n = e.currentTarget.getAttribute("data-alambic-organization"),
                    o = e.currentTarget.getAttribute("data-alambic-owner-type"),
                    r = e.currentTarget.getAttribute("data-alambic-owner-id");
                n && t.append("organization_id", n), o && t.append("owner_type", o), r && t.append("owner_id", r)
            }), (0, c.on)("upload:complete", ".js-upload-avatar-image", function (e) {
                const {attachment: t} = e.detail, n = `/settings/avatars/${t.id}`;
                (0, Se.W)({content: (0, pe.a)(document, n), detailsClass: "upload-avatar-details"})
            }), (0, c.on)("dialog:remove", ".upload-avatar-details", async function (e) {
                const o = `/settings/avatars/${e.currentTarget.querySelector("#avatar-crop-form").getAttribute("data-alambic-avatar-id")}?op=destroy`,
                    r = e.currentTarget.querySelector(".js-avatar-post-csrf").getAttribute("value"),
                    i = new Request(o, {
                        method: "POST",
                        headers: {"Scoped-CSRF-Token": r, "X-Requested-With": "XMLHttpRequest"}
                    });
                await self.fetch(i)
            });

            function qt() {
                if (document.querySelector(":target")) return;
                const e = (0, Cn.$z)(location.hash).toLowerCase(), t = (0, Cn.Q)(document, `user-content-${e}`);
                t && (0, rn.zT)(t)
            }

            s(qt, "hashchange"), window.addEventListener("hashchange", qt), document.addEventListener("pjax:success", qt), async function () {
                await ye.x, qt()
            }(), (0, c.on)("click", "a[href]", function (e) {
                const {currentTarget: t} = e;
                t instanceof HTMLAnchorElement && t.href === location.href && location.hash.length > 1 && setTimeout(function () {
                    e.defaultPrevented || qt()
                })
            });
            var vu = u(58462);

            async function Ll(e) {
                const t = e.currentTarget, {init: n} = await u.e("app_assets_modules_github_user-status-submit_ts").then(u.bind(u, 88898));
                n(t)
            }

            s(Ll, "user_status_loader_load"), (0, d.N7)(".js-user-status-container", {subscribe: e => (0, A.RB)(e, "click", Ll, {once: !0})});
            var Rt = u(10795);

            function jl(e, t) {
                const n = e.querySelector(".js-user-list-base");
                n && (n.textContent = t || n.getAttribute("data-generic-message"), n.hidden = !1)
            }

            s(jl, "setFlashError");

            function Dr(e, t) {
                const o = (t || e).querySelectorAll(".js-user-list-error");
                for (const a of o) a.hidden = !0;
                const r = t ? [t] : e.querySelectorAll(".errored.js-user-list-input-container");
                for (const a of r) a.classList.remove("errored");
                const i = e.querySelector(".js-user-list-base");
                i && (i.hidden = !0)
            }

            s(Dr, "resetValidation"), (0, C.AC)(".js-user-list-form", async function (e, t) {
                var n;
                Dr(e);
                const o = e.querySelector("[data-submitting-message]"), r = o == null ? void 0 : o.textContent;
                o && (o.textContent = o.getAttribute("data-submitting-message"), o.disabled = !0);
                for (const i of e.querySelectorAll(".js-user-list-input")) i.disabled = !0;
                try {
                    const i = await t.html();
                    (0, c.f)(e, "user-list-form:success", i.html)
                } catch (i) {
                    if (((n = i.response) == null ? void 0 : n.status) === 422) e.replaceWith(i.response.html); else {
                        jl(e), o && (r && (o.textContent = r), o.disabled = !1);
                        for (const a of e.querySelectorAll(".js-user-list-input")) a.disabled = !1
                    }
                }
            }), (0, c.on)("user-list-form:success", ".js-follow-list", e => {
                const t = e.detail, n = t instanceof DocumentFragment ? t.querySelector(".js-target-url") : null;
                (n == null ? void 0 : n.textContent) ? location.href = n.textContent : location.reload()
            });

            function Hr(e) {
                if (!(e.currentTarget instanceof HTMLElement)) return;
                const t = e.currentTarget.closest(".js-user-list-form"),
                    n = e.currentTarget.closest(".js-user-list-input-container");
                t && n && Dr(t, n)
            }

            s(Hr, "clearErrorsFromInput"), (0, j.q6)(".js-user-list-form input", Hr), (0, j.q6)(".js-user-list-form textarea", Hr), (0, c.on)("auto-check-error", ".js-user-list-form input", function (e) {
                const t = e.currentTarget.closest(".js-user-list-input-container"),
                    n = t == null ? void 0 : t.querySelector(".js-user-list-error");
                n && (n.hidden = !1)
            });

            function Sl(e) {
                var t;
                const n = new Map;
                for (const o of e) {
                    const r = (t = o.querySelector(".js-user-lists-create-trigger")) == null ? void 0 : t.getAttribute("data-repository-id");
                    if (r) {
                        const i = n.get(r);
                        i ? i.push(o) : n.set(r, [o])
                    }
                }
                return n
            }

            s(Sl, "groupRootsByRepositoryId");

            async function Tl(e, t, n) {
                const o = new FormData;
                o.set("authenticity_token", t);
                for (const a of n) o.append("repository_ids[]", a);
                const r = await fetch(e, {
                    method: "POST",
                    body: o,
                    headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                }), i = new Map;
                if (r.ok) {
                    const a = await r.json();
                    for (const l in a) i.set(l, (0, P.r)(document, a[l]))
                }
                return i
            }

            s(Tl, "requestMenuBatchRender");

            function Al(e, t) {
                for (const [n, o] of e.entries()) {
                    const r = t.get(n) || [];
                    for (const i of r) i.replaceWith(r.length === 1 ? o : o.cloneNode(!0))
                }
            }

            s(Al, "replaceUserListMenuRoots");

            async function Or() {
                var e;
                const t = document.querySelectorAll(".js-user-list-menu-content-root");
                if (t.length === 0) return;
                const n = t[0].getAttribute("data-batch-update-url");
                if (!n) return;
                const o = (e = t[0].querySelector(".js-user-list-batch-update-csrf")) == null ? void 0 : e.value;
                if (!o) return;
                const r = Sl(t), i = r.keys(), a = await Tl(n, o, i);
                a.size > 0 && Al(a, r)
            }

            s(Or, "updateAllUserListMenus");

            function Cl(e) {
                const t = new Promise((n, o) => {
                    e.addEventListener("user-list-menu-form:success", () => n()), e.addEventListener("user-list-menu-form:error", r => o(r))
                });
                return (0, L.Bt)(e), t
            }

            s(Cl, "requestUserListMenuFormSubmit");

            function kl(e) {
                const t = e.target;
                if (!(t instanceof HTMLDetailsElement) || t.hasAttribute("open")) return;
                const n = t.querySelector(".js-user-list-menu-form");
                n && (0, Rt.T)(n) && (0, L.Bt)(n);
                const o = t.querySelector(".js-user-list-create-trigger-text");
                o && (o.textContent = "")
            }

            s(kl, "submitUserListFormOnToggle"), (0, c.on)("toggle", ".js-user-list-menu", kl, {capture: !0}), (0, j.q6)(".js-user-lists-menu-filter", e => {
                const t = e.currentTarget, n = t.value.trim(), o = t.closest(".js-user-list-menu-content-root"),
                    r = o == null ? void 0 : o.querySelector(".js-user-list-create-trigger-text");
                !r || (r.textContent = n ? `"${n}"` : "")
            }), (0, C.AC)(".js-user-list-menu-form", async function (e, t) {
                let n;
                try {
                    n = await t.json()
                } catch (r) {
                    (0, T.v)(), (0, c.f)(e, "user-list-menu-form:error", r);
                    return
                }
                if (n.json.didStar) {
                    const r = e.closest(".js-toggler-container");
                    r && r.classList.add("on");
                    const i = n.json.starCount;
                    if (i) {
                        const a = e.closest(".js-social-container");
                        a && mr(a, i)
                    }
                }
                const o = e.closest(".js-user-list-menu-content-root[data-update-after-submit]");
                if (o) for (const r of e.querySelectorAll(".js-user-list-menu-item")) r.checked = r.defaultChecked;
                n.json.didCreate ? await Or() : o && await (0, Me.x0)(o), (0, c.f)(e, "user-list-menu-form:success")
            }), (0, c.on)("click", ".js-user-list-delete-confirmation-trigger", e => {
                const {currentTarget: t} = e, n = t.getAttribute("data-template-id");
                if (!n) return;
                const o = document.getElementById(n);
                if (!o || !(o instanceof HTMLTemplateElement)) return;
                const r = t.closest(".js-edit-user-list-dialog");
                r && (r.open = !1);
                const i = o.content.cloneNode(!0), a = o.getAttribute("data-labelledby");
                (0, Se.W)({content: i, labelledBy: a})
            }), (0, c.on)("click", ".js-user-lists-create-trigger", async function (e) {
                const {currentTarget: t} = e, n = document.querySelector(".js-user-list-create-dialog-template"),
                    o = e.currentTarget.getAttribute("data-repository-id"),
                    r = t.closest(".js-user-list-menu-content-root"),
                    i = r == null ? void 0 : r.querySelector(".js-user-lists-menu-filter"),
                    a = i == null ? void 0 : i.value.trim();
                if (!n || !(n instanceof HTMLTemplateElement) || !o) {
                    t instanceof HTMLButtonElement && (t.disabled = !0);
                    return
                }
                const l = n.getAttribute("data-label");
                if (r && (0, Rt.T)(r)) {
                    const S = r.querySelector(".js-user-list-menu-form");
                    S && await Cl(S)
                }
                const y = new lt.R(n, {repositoryId: o, placeholderName: a}),
                    w = await (0, Se.W)({content: y, label: l});
                w.addEventListener("user-list-form:success", async () => {
                    await Or();
                    const S = w.closest("details");
                    S && (S.open = !1)
                })
            }), (0, d.N7)("[data-warn-unsaved-changes]", {
                add(e) {
                    e.addEventListener("input", Pt), e.addEventListener("change", Pt), e.addEventListener("submit", et);
                    const t = e.closest("details-dialog");
                    t && (t.closest("details").addEventListener("toggle", Nr), t.addEventListener("details-dialog-close", Br))
                }, remove(e) {
                    e.removeEventListener("input", Pt), e.removeEventListener("change", Pt), e.removeEventListener("submit", et);
                    const t = e.closest("details-dialog");
                    t && (t.closest("details").removeEventListener("toggle", Nr), t.removeEventListener("details-dialog-close", Br), et())
                }
            });

            function Pt(e) {
                const t = e.currentTarget;
                (0, Rt.T)(t) ? xl(t) : et()
            }

            s(Pt, "prepareUnsavedChangesWarning");

            function xl(e) {
                const t = e.getAttribute("data-warn-unsaved-changes") || "Changes you made may not be saved.";
                window.onbeforeunload = function (n) {
                    return n.returnValue = t, t
                }
            }

            s(xl, "enableSaveChangesReminder");

            function et() {
                window.onbeforeunload = null
            }

            s(et, "disableSaveChangesReminder");

            function Nr({currentTarget: e}) {
                e.hasAttribute("open") || et()
            }

            s(Nr, "disableSaveChangesReminderOnClosedDialogs");

            function Br(e) {
                const t = e.currentTarget;
                if (!t.closest("details[open]")) return;
                let o = !0;
                const r = t.querySelectorAll("form[data-warn-unsaved-changes]");
                for (const i of r) if ((0, Rt.T)(i)) {
                    const a = i.getAttribute("data-warn-unsaved-changes");
                    o = confirm(a);
                    break
                }
                o || e.preventDefault()
            }

            s(Br, "promptOnDialogClosing"), (0, d.N7)(".will-transition-once", {
                constructor: HTMLElement,
                subscribe: e => (0, A.RB)(e, "transitionend", Ml)
            });

            function Ml(e) {
                e.target.classList.remove("will-transition-once")
            }

            s(Ml, "onTransitionEnd");

            async function ql(e) {
                const t = e.currentTarget, n = t.getAttribute("data-url");
                if (!n || Rl(t)) return;
                const o = t.getAttribute("data-id") || "", r = t.textContent,
                    i = document.querySelectorAll(`.js-issue-link[data-id='${o}']`);
                for (const a of i) a.removeAttribute("data-url");
                try {
                    const a = `${n}/title`, l = await fetch(a, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            Accept: "application/json"
                        }
                    });
                    if (!l.ok) {
                        const w = new Error, S = l.statusText ? ` ${l.statusText}` : "";
                        throw w.message = `HTTP ${l.status}${S}`, w
                    }
                    const y = await l.json();
                    $r(i, `${r}, ${y.title}`)
                } catch (a) {
                    const l = (a.response != null ? a.response.status : void 0) || 500, y = (() => {
                        switch (l) {
                            case 404:
                                return t.getAttribute("data-permission-text");
                            default:
                                return t.getAttribute("data-error-text")
                        }
                    })();
                    $r(i, y || "")
                }
            }

            s(ql, "issueLabel");

            function $r(e, t) {
                for (const n of e) n instanceof HTMLElement && (n.classList.add("tooltipped", "tooltipped-ne"), n.setAttribute("aria-label", t))
            }

            s($r, "setLabel");

            function Rl(e) {
                switch (e.getAttribute("data-hovercard-type")) {
                    case"issue":
                    case"pull_request":
                        return !!e.closest("[data-issue-and-pr-hovercards-enabled]");
                    case"discussion":
                        return !!e.closest("[data-discussion-hovercards-enabled]");
                    default:
                        return !1
                }
            }

            s(Rl, "isHovercardEnabled"), (0, d.N7)(".js-issue-link", {subscribe: e => (0, A.RB)(e, "mouseenter", ql)});
            var Pl = u(12085), Ie = u.n(Pl);

            function qn() {
                return [Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0)]
            }

            s(qn, "randomRGBColor");

            function tt(e, t) {
                const n = Ie().rgb.hsl(t);
                e.style.setProperty("--label-r", t[0].toString()), e.style.setProperty("--label-g", t[1].toString()), e.style.setProperty("--label-b", t[2].toString()), e.style.setProperty("--label-h", n[0].toString()), e.style.setProperty("--label-s", n[1].toString()), e.style.setProperty("--label-l", n[2].toString())
            }

            s(tt, "setColorSwatch");

            function Rn(e, t) {
                e.blur();
                const n = e.closest("form"), o = n.querySelector(".js-new-label-color-input");
                (0, L.Se)(o, `#${Ie().rgb.hex(t)}`);
                const r = n.querySelector(".js-new-label-color");
                tt(r, t)
            }

            s(Rn, "setInputColorFromButton");

            function _l(e, t) {
                e.closest(".js-label-error-container").classList.add("errored"), e.textContent = t, e.hidden = !1
            }

            s(_l, "addErrorToField");

            function Il(e) {
                e.closest(".js-label-error-container").classList.remove("errored"), e.hidden = !0
            }

            s(Il, "removeErrorFromField");

            function ze(e, t, n) {
                const o = t.querySelector(e);
                !o || (n ? _l(o, n[0]) : Il(o))
            }

            s(ze, "showOrHideLabelError");

            function Pn(e, t) {
                ze(".js-label-name-error", e, t.name), ze(".js-label-description-error", e, t.description), ze(".js-label-color-error", e, t.color)
            }

            s(Pn, "showLabelErrors");

            function De(e) {
                ze(".js-label-name-error", e, null), ze(".js-label-description-error", e, null), ze(".js-label-color-error", e, null)
            }

            s(De, "hideLabelErrors");

            function Dl(e, t, n, o, r) {
                const i = new URL(`${e}${encodeURIComponent(t)}`, window.location.origin),
                    a = new URLSearchParams(i.search.slice(1));
                return a.append("color", n), o && a.append("description", o), r && a.append("id", r), i.search = a.toString(), i.toString()
            }

            s(Dl, "labelPreviewUrl");

            function Hl(e) {
                let t = null;
                const n = e.querySelector(".js-new-label-description-input");
                return n instanceof HTMLInputElement && n.value.trim().length > 0 && (t = n.value.trim()), t
            }

            s(Hl, "labelDescriptionFrom");

            function Ol(e) {
                const t = e.querySelector(".js-new-label-color-input");
                return t.checkValidity() ? t.value.trim().replace(/^#/, "") : "ededed"
            }

            s(Ol, "labelColorFrom");

            function Nl(e, t) {
                let o = e.querySelector(".js-new-label-name-input").value.trim();
                return o.length < 1 && (o = t.getAttribute("data-default-name")), o
            }

            s(Nl, "labelNameFrom");

            async function Ke(e) {
                const t = e.closest(".js-label-preview-container");
                if (!t) return;
                const n = e.closest(".js-label-form"), o = n.querySelector(".js-new-label-error"),
                    r = n.getAttribute("data-label-id"), i = t.querySelector(".js-label-preview"), a = Nl(n, i);
                if (!n.checkValidity() && a !== "Label preview") return;
                const l = Ol(n), y = Hl(n), w = i.getAttribute("data-url-template"), S = Dl(w, a, l, y, r);
                if (t.hasAttribute("data-last-preview-url")) {
                    const H = t.getAttribute("data-last-preview-url");
                    if (S === H) return
                }
                let q;
                try {
                    q = await (0, pe.a)(document, S)
                } catch (H) {
                    const $ = await H.response.json();
                    Pn(n, $), o && (o.textContent = $.message, o.hidden = !1);
                    return
                }
                o && (o.textContent = "", o.hidden = !0), De(n), i.innerHTML = "", i.appendChild(q), t.setAttribute("data-last-preview-url", S)
            }

            s(Ke, "updateLabelPreview");

            function Bl(e) {
                Ke(e.target)
            }

            s(Bl, "onLabelFormInputChange");

            function Fr(e, t) {
                e.closest(".js-details-container").classList.toggle("is-empty", t)
            }

            s(Fr, "toggleBlankSlate");

            function Ur(e) {
                const t = document.querySelector(".js-labels-count"), o = Number(t.textContent) + e;
                t.textContent = o.toString();
                const r = document.querySelector(".js-labels-label");
                return r.textContent = r.getAttribute(o === 1 ? "data-singular-string" : "data-plural-string"), o
            }

            s(Ur, "updateCount"), (0, j.q6)(".js-label-filter-field", function (e) {
                const t = e.target, o = t.closest("details-menu").querySelector(".js-new-label-name");
                if (!o) return;
                const r = t.value.trim();
                o.textContent = r
            }), (0, c.on)("filterable:change", ".js-filterable-issue-labels", function (e) {
                const t = e.currentTarget.closest("details-menu"), n = t.querySelector(".js-add-label-button");
                if (!n) return;
                const r = e.detail.inputField.value.trim().toLowerCase();
                let i = !1;
                for (const a of t.querySelectorAll("input[data-label-name]")) if ((a.getAttribute("data-label-name") || "").toLowerCase() === r) {
                    i = !0;
                    break
                }
                n.hidden = r.length === 0 || i
            }), (0, j.ZG)(".js-new-label-color-input", function (e) {
                const n = e.closest("form").querySelector(".js-new-label-swatches");
                n.hidden = !1, e.addEventListener("blur", function () {
                    n.hidden = !0
                }, {once: !0})
            }), (0, j.q6)(".js-new-label-color-input", function (e) {
                const t = e.target;
                let n = t.value.trim();
                if (!(n.length < 1)) if (n.indexOf("#") !== 0 && (n = `#${n}`, t.value = n), t.checkValidity()) {
                    t.classList.remove("color-fg-danger");
                    const r = t.closest("form").querySelector(".js-new-label-color");
                    tt(r, Ie().hex.rgb(n))
                } else t.classList.add("color-fg-danger")
            }), (0, j.w4)("keyup", ".js-new-label-color-input", function (e) {
                const t = e.target;
                let n = t.value.trim();
                if (n.indexOf("#") !== 0 && (n = `#${n}`, t.value = n), t.checkValidity()) {
                    const i = t.closest("form").querySelector(".js-new-label-color");
                    tt(i, Ie().hex.rgb(n))
                }
                (0, c.f)(t, "change", !1);
                const o = t.closest("form");
                De(o)
            }), (0, j.w4)("keyup", ".js-new-label-description-input", function (e) {
                const n = e.target.form;
                De(n)
            }), (0, j.w4)("keyup", ".js-new-label-color-input", function (e) {
                const n = e.target.form;
                De(n)
            }), (0, c.on)("click", ".js-new-label-color", async function (e) {
                const t = e.currentTarget, n = qn();
                Rn(t, n), Ke(t)
            }), (0, c.on)("mousedown", ".js-new-label-color-swatch", function (e) {
                const t = e.currentTarget, n = t.getAttribute("data-color");
                Rn(t, Ie().hex.rgb(n)), Ke(t);
                const o = t.closest(".js-new-label-swatches");
                o.hidden = !0
            }), (0, c.on)("toggle", ".js-new-label-modal", function (e) {
                e.target.hasAttribute("open") && Wr(e.target)
            }, {capture: !0});

            async function Wr(e) {
                const t = e.querySelector(".js-new-label-name-input");
                if (!t) return;
                const n = e.querySelector(".js-new-label-color-input"), o = qn(), r = `#${Ie().rgb.hex(o)}`;
                n.value = r;
                const i = e.querySelector(".js-new-label-color");
                tt(i, o);
                const l = document.querySelector(".js-new-label-name").textContent;
                (0, L.Se)(t, l), (0, Nt.OD)(t), Ke(i)
            }

            s(Wr, "initLabelModal"), (0, C.AC)(".js-new-label-modal-form", async function (e, t) {
                const n = e.querySelector(".js-new-label-error");
                let o;
                try {
                    o = await t.html()
                } catch (y) {
                    const w = y.response.json;
                    n.textContent = w.message, n.hidden = !1
                }
                if (!o) return;
                n.hidden = !0, document.querySelector(".js-new-label-modal").removeAttribute("open");
                const r = document.querySelector(".js-issue-labels-menu-content"),
                    i = r.querySelector(".js-filterable-issue-labels"), a = o.html.querySelector("input");
                i.prepend(o.html), a && a.dispatchEvent(new Event("change", {bubbles: !0}));
                const l = r.querySelector(".js-label-filter-field");
                l.value = l.defaultValue, l.focus()
            }), (0, c.on)("click", ".js-edit-label-cancel", function (e) {
                const t = e.target.closest("form");
                De(t), t.reset();
                const n = t.querySelector(".js-new-label-color-input"), o = n.value,
                    r = t.querySelector(".js-new-label-color");
                tt(r, Ie().hex.rgb(o)), (0, Nt.Qc)(t), Ke(n);
                const i = e.currentTarget.closest(".js-labels-list-item");
                if (i) {
                    i.querySelector(".js-update-label").classList.add("d-none");
                    const l = i.querySelector(".js-label-preview");
                    l && (l.classList.add("d-none"), i.querySelector(".js-label-link").classList.remove("d-none"));
                    const y = i.querySelectorAll(".js-hide-on-label-edit");
                    for (const w of y) w.hidden = !w.hidden
                }
            }), (0, C.AC)(".js-update-label", async function (e, t) {
                let n;
                try {
                    n = await t.html()
                } catch (r) {
                    const i = r.response.json;
                    Pn(e, i);
                    return
                }
                De(e), e.closest(".js-labels-list-item").replaceWith(n.html)
            }), (0, C.AC)(".js-create-label", async function (e, t) {
                let n;
                try {
                    n = await t.html()
                } catch (a) {
                    const l = a.response.json;
                    Pn(e, l);
                    return
                }
                e.reset(), De(e), document.querySelector(".js-label-list").prepend(n.html), Ur(1), Fr(e, !1);
                const o = e.querySelector(".js-new-label-color"), r = qn();
                Rn(o, r), Ke(e.querySelector(".js-new-label-name-input")), (0, Nt.Qc)(e);
                const i = e.closest(".js-details-container");
                i instanceof HTMLElement && (0, Gt.Qp)(i)
            }), (0, c.on)("click", ".js-details-target-new-label", function () {
                document.querySelector(".js-create-label").querySelector(".js-new-label-name-input").focus()
            }), (0, c.on)("click", ".js-edit-label", function (e) {
                const t = e.currentTarget.closest(".js-labels-list-item"), n = t.querySelector(".js-update-label");
                n.classList.remove("d-none"), n.querySelector(".js-new-label-name-input").focus();
                const r = t.querySelector(".js-label-preview");
                r && (r.classList.remove("d-none"), t.querySelector(".js-label-link").classList.add("d-none"));
                const i = t.querySelectorAll(".js-hide-on-label-edit");
                for (const a of i) a.hidden = !a.hidden
            }), (0, C.AC)(".js-delete-label", async function (e, t) {
                const n = e.closest(".js-labels-list-item");
                n.querySelector(".js-label-delete-spinner").hidden = !1, await t.text();
                const o = Ur(-1);
                Fr(e, o === 0), n.remove()
            });
            const _t = (0, _.D)(Bl, 500);
            (0, c.on)("suggester:complete", ".js-new-label-name-input", _t), (0, j.q6)(".js-new-label-name-input", _t), (0, j.q6)(".js-new-label-description-input", _t), (0, j.q6)(".js-new-label-color-input", _t), (0, j.w4)("keypress", ".js-new-label-name-input", function (e) {
                const t = e.target, n = parseInt(t.getAttribute("data-maxlength"));
                (0, Ee.rq)(t.value) >= n && e.preventDefault()
            }), (0, c.on)("click", ".js-issues-label-select-menu-item", function (e) {
                !e.altKey && !e.shiftKey || (e.preventDefault(), e.stopPropagation(), e.altKey && (window.location.href = e.currentTarget.getAttribute("data-excluded-url")), e.shiftKey && (window.location.href = e.currentTarget.getAttribute("data-included-url")))
            }), (0, j.w4)("keydown", ".js-issues-label-select-menu-item", function (e) {
                if (e.key !== "Enter" || !e.altKey && !e.shiftKey) return;
                const t = e.currentTarget;
                e.preventDefault(), e.stopPropagation(), t instanceof HTMLAnchorElement && (e.altKey && (window.location.href = t.getAttribute("data-excluded-url")), e.shiftKey && (window.location.href = t.getAttribute("data-included-url")))
            }), (0, c.on)("click", ".js-open-label-creation-modal", async function (e) {
                e.stopImmediatePropagation();
                const t = await (0, Se.W)({
                    content: document.querySelector(".js-label-creation-template").content.cloneNode(!0),
                    detailsClass: "js-new-label-modal"
                });
                Wr(t)
            }, {capture: !0}), (0, c.on)("change", ".js-thread-notification-setting", _n), (0, c.on)("change", ".js-custom-thread-notification-option", _n), (0, c.on)("reset", ".js-custom-thread-settings-form", _n);

            function _n() {
                const e = document.querySelector(".js-reveal-custom-thread-settings").checked,
                    t = !document.querySelector(".js-custom-thread-notification-option:checked"),
                    n = document.querySelector(".js-custom-thread-settings"),
                    o = document.querySelector("[data-custom-option-required-text]"),
                    r = e && t ? o.getAttribute("data-custom-option-required-text") : "";
                o.setCustomValidity(r), n.hidden = !e
            }

            s(_n, "toggleEventSettings");
            var $l = Object.defineProperty, Fl = Object.getOwnPropertyDescriptor, zr = s((e, t, n, o) => {
                for (var r = o > 1 ? void 0 : o ? Fl(t, n) : t, i = e.length - 1, a; i >= 0; i--) (a = e[i]) && (r = (o ? a(t, n, r) : a(r)) || r);
                return o && r && $l(t, n, r), r
            }, "sidebar_widget_decorateClass");
            let In = s(class extends HTMLElement {
                get activeClass() {
                    return this.getAttribute("active-class") || "collapsible-sidebar-widget-active"
                }

                get loadingClass() {
                    return this.getAttribute("loading-class") || "collapsible-sidebar-widget-loading"
                }

                get url() {
                    return this.getAttribute("url") || ""
                }

                get isOpen() {
                    return this.hasAttribute("open")
                }

                set isOpen(e) {
                    e ? this.setAttribute("open", "") : this.removeAttribute("open")
                }

                onKeyDown(e) {
                    if (e.code === "Enter" || e.code === "Space") return e.preventDefault(), this.load()
                }

                onMouseDown(e) {
                    return e.preventDefault(), this.load()
                }

                load() {
                    return this.pendingRequest ? this.pendingRequest.abort() : this.collapsible.hasAttribute("loaded") ? this.isOpen ? this.setClose() : this.setOpen() : (this.setLoading(), this.updateCollapsible())
                }

                setLoading() {
                    this.classList.add(this.loadingClass), this.classList.remove(this.activeClass)
                }

                setOpen() {
                    this.classList.add(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !0
                }

                setClose() {
                    this.classList.remove(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !1
                }

                handleAbort() {
                    this.pendingRequest = null, this.setClose()
                }

                async updateCollapsible() {
                    var e;
                    try {
                        this.pendingRequest = new AbortController, this.pendingRequest.signal.addEventListener("abort", () => this.handleAbort());
                        const t = await fetch(this.url, {
                            signal: (e = this.pendingRequest) == null ? void 0 : e.signal,
                            headers: {Accept: "text/html", "X-Requested-With": "XMLHttpRequest"}
                        });
                        if (this.pendingRequest = null, !t.ok) return this.setClose();
                        const n = await t.text();
                        this.collapsible.innerHTML = n, this.collapsible.setAttribute("loaded", ""), this.setOpen()
                    } catch {
                        return this.pendingRequest = null, this.setClose()
                    }
                }
            }, "CollapsibleSidebarWidgetElement");
            zr([J.fA], In.prototype, "collapsible", 2), In = zr([J.Ih], In);
            var Ul = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, ve = s((e, t, n, o) => {
                for (var r = o > 1 ? void 0 : o ? Wl(t, n) : t, i = e.length - 1, a; i >= 0; i--) (a = e[i]) && (r = (o ? a(t, n, r) : a(r)) || r);
                return o && r && Ul(t, n, r), r
            }, "sidebar_memex_input_decorateClass");
            let be = s(class extends HTMLElement {
                constructor() {
                    super(...arguments);
                    this.url = "", this.csrf = "", this.instrument = "", this.column = 1
                }

                get isDisabled() {
                    var e;
                    return (e = this.read) == null ? void 0 : e.hasAttribute("disabled")
                }

                set hasErrored(e) {
                    e ? this.setAttribute("errored", "") : this.removeAttribute("errored")
                }

                set disabled(e) {
                    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                }

                get hasExpanded() {
                    return this.read.getAttribute("aria-expanded") === "true"
                }

                connectedCallback() {
                    var e, t;
                    this.disabled = (t = (e = this.read) == null ? void 0 : e.disabled) != null ? t : !0, this.querySelector("details") !== null && this.classList.toggle("no-pointer")
                }

                handleDetailsSelect(e) {
                    var t;
                    const n = e, o = e.target, r = (t = n.detail) == null ? void 0 : t.relatedTarget,
                        i = o.closest("details"), a = i == null ? void 0 : i.querySelector("[data-menu-button]");
                    if (r.getAttribute("aria-checked") === "true") {
                        r.setAttribute("aria-checked", "false"), e.preventDefault();
                        for (const l of this.inputs) if (r.contains(l)) {
                            this.updateCell(l.name, ""), (a == null ? void 0 : a.innerHTML) && (a.innerHTML = l.placeholder);
                            break
                        }
                        i == null || i.removeAttribute("open")
                    }
                }

                handleDetailsSelected(e) {
                    var t;
                    const o = (t = e.detail) == null ? void 0 : t.relatedTarget;
                    for (const r of this.inputs) if (o.contains(r)) {
                        this.updateCell(r.name, r.value);
                        break
                    }
                }

                mouseDownFocus(e) {
                    !this.isDisabled || this.onFocus(e)
                }

                keyDownFocus(e) {
                    (e.code === "Enter" || e.code === "Space") && this.read !== document.activeElement && this.onFocus(e)
                }

                onChange(e) {
                    var t, n;
                    e.target.getAttribute("type") !== "date" && this.updateCell((t = this.read) == null ? void 0 : t.name, (n = this.read) == null ? void 0 : n.value)
                }

                onFocus(e) {
                    e.preventDefault(), this.disabled = !1, this.read.disabled = !1, this.read.focus()
                }

                onBlur(e) {
                    var t, n;
                    if (this.hasExpanded) {
                        e.preventDefault();
                        return
                    }
                    e.target.getAttribute("type") === "date" && this.updateCell((t = this.read) == null ? void 0 : t.name, (n = this.read) == null ? void 0 : n.value), this.read.disabled = !0, this.disabled = !0
                }

                onKeyDown(e) {
                    if (e.code === "Enter" || e.code === "Tab") {
                        if (e.preventDefault(), e.stopPropagation(), this.hasExpanded) return;
                        this.read.blur()
                    }
                }

                async updateCell(e = "", t = "") {
                    const n = new FormData;
                    n.set(e, t), n.set("ui", this.instrument);
                    for (const r of this.parameters) n.set(r.name, r.value);
                    const o = Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC"
                    });
                    try {
                        if (this.write) {
                            const S = this.read.value, q = this.read.type === "date" && S ? o.format(Date.parse(S)) : S;
                            this.write.textContent = S ? q : this.read.placeholder
                        }
                        const r = await fetch(this.url, {
                            method: "PUT",
                            body: n,
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest",
                                "Scoped-CSRF-Token": `${this.csrf}`
                            }
                        });
                        if (!r.ok) throw new Error("connection error");
                        if (!this.write) return;
                        const l = (await r.json()).memexProjectItem.memexProjectColumnValues.find(S => S.memexProjectColumnId === Number(this.column)).value,
                            y = this.read.type === "date" ? Date.parse(l.value) : l.html,
                            w = this.read.type === "date" && y ? o.format(y) : y;
                        this.write.innerHTML = t ? w : this.read.placeholder
                    } catch {
                        this.hasErrored = !0
                    }
                }
            }, "SidebarMemexInputElement");
            ve([J.Lj], be.prototype, "url", 2), ve([J.Lj], be.prototype, "csrf", 2), ve([J.Lj], be.prototype, "instrument", 2), ve([J.Lj], be.prototype, "column", 2), ve([J.GO], be.prototype, "inputs", 2), ve([J.fA], be.prototype, "read", 2), ve([J.fA], be.prototype, "write", 2), ve([J.GO], be.prototype, "parameters", 2), be = ve([J.Ih], be);

            function nt(e, t = !1) {
                (t || !Gl(e)) && (e instanceof HTMLFormElement ? (0, L.Bt)(e) : Dt(e))
            }

            s(nt, "submitForm");

            function Kr(e) {
                const t = e.currentTarget,
                    n = t.closest(".js-issue-sidebar-form") || t.querySelector(".js-issue-sidebar-form");
                nt(n)
            }

            s(Kr, "submitOnMenuClose"), (0, c.on)("details-menu-selected", ".js-discussion-sidebar-menu", function (e) {
                const t = e.detail.relatedTarget, n = e.currentTarget, o = t.closest(".js-issue-sidebar-form"),
                    r = n.hasAttribute("data-multiple");
                if (t.hasAttribute("data-clear-assignees")) {
                    const i = n.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked');
                    for (const a of i) a.disabled = !1, a.checked = !1;
                    nt(o)
                } else r ? n.closest("details").addEventListener("toggle", Kr, {once: !0}) : nt(o)
            }, {capture: !0});

            function zl(e, t) {
                e.replaceWith((0, P.r)(document, t))
            }

            s(zl, "updateSidebar");

            function Vr(e) {
                const t = document.querySelector(`[data-menu-trigger="${e}"]`);
                t == null || t.focus()
            }

            s(Vr, "returnFocusToTrigger"), (0, C.AC)(".js-issue-sidebar-form", async function (e, t) {
                var n;
                const o = await t.html(), r = e.closest(".js-discussion-sidebar-item"),
                    i = (n = r == null ? void 0 : r.querySelector(".select-menu")) == null ? void 0 : n.getAttribute("id");
                r.replaceWith(o.html), i && Vr(i)
            }), (0, c.on)("click", "div.js-issue-sidebar-form .js-suggested-reviewer", function (e) {
                const t = e.currentTarget, n = t.closest(".js-issue-sidebar-form");
                Dt(n, "post", {name: t.name, value: t.value}), e.preventDefault()
            }), (0, c.on)("click", "div.js-issue-sidebar-form .js-issue-assign-self", function (e) {
                var t;
                const n = e.currentTarget, o = n.closest(".js-issue-sidebar-form");
                Dt(o, "post", {
                    name: n.name,
                    value: n.value
                }), n.remove(), (t = document.querySelector("form#new_issue .is-submit-button-value")) == null || t.remove(), e.preventDefault()
            }), (0, c.on)("click", ".js-issue-unassign-self", function (e) {
                const t = e.currentTarget.closest(".js-issue-sidebar-form");
                Dt(t, "delete"), e.preventDefault()
            }), (0, C.AC)(".js-pages-preview-toggle-form", async function (e, t) {
                const n = await t.json();
                e.querySelector("button.btn").textContent = n.json.new_button_value
            });

            function Kl(e, t) {
                const n = e.getAttribute("data-cache-name");
                return `${t}:sidebar:${n}`
            }

            s(Kl, "getCacheKey");

            function Vl(e, t, n) {
                const o = e.getAttribute("data-cache-name");
                if (!o) return;
                const r = [];
                for (const [a, l] of t.entries()) a.indexOf(o) !== -1 && r.push([a, l]);
                const i = r.filter(a => a[1] !== "");
                i.length > 0 ? sessionStorage.setItem(n, JSON.stringify(i)) : sessionStorage.removeItem(n)
            }

            s(Vl, "cacheValues");
            const It = new Set;

            function Xr() {
                It.clear()
            }

            s(Xr, "clearHasFired");

            async function Xl(e, t) {
                const n = e.getAttribute("data-cache-name"), o = sessionStorage.getItem(t);
                if (!n || !o || It.has(n)) return;
                It.add(n);
                const r = JSON.parse(o), i = [];
                for (const [a, l] of r) {
                    if (Object.prototype.toString.call(l) !== "[object String]") continue;
                    const y = document.createElement("input");
                    y.type = "hidden", y.value = l, y.name = a, e.appendChild(y), i.push(y)
                }
                try {
                    await Zr(e);
                    for (const a of i) a.remove()
                } catch {
                    It.delete(n)
                }
            }

            s(Xl, "restoreCachedValues");
            let Gr = !1;

            function Dn(e, t) {
                if (Gr) return;
                const n = Hn(e);
                Vl(e, n, t), Xr()
            }

            s(Dn, "cacheValuesOnHide"), (0, d.N7)("[data-cacher]", {
                add(e) {
                    const t = Kl(e, (0, xe.e)());
                    Xl(e, t), window.addEventListener("pagehide", () => Dn(e, t)), window.addEventListener("pjax:beforeReplace", () => Dn(e, t)), window.addEventListener("turbo:before-visit", () => Dn(e, t)), window.addEventListener("submit", n => {
                        n.defaultPrevented || (Gr = !0, setTimeout(() => {
                            for (const o of Object.keys(sessionStorage)) o.indexOf(t) !== -1 && (sessionStorage.removeItem(o), Xr())
                        }, 0))
                    }, {capture: !0})
                }
            });

            async function Dt(e, t = "post", n) {
                var o;
                await Zr(e, t, n);
                const r = e.closest(".js-discussion-sidebar-item"),
                    i = (o = r == null ? void 0 : r.querySelector(".select-menu")) == null ? void 0 : o.getAttribute("id");
                i && Vr(i)
            }

            s(Dt, "previewSubmit");

            async function Zr(e, t = "post", n) {
                const o = Hn(e);
                n && o.append(n.name, n.value);
                const r = e.getAttribute("data-url");
                if (!r) return;
                const i = e.querySelector(".js-data-url-csrf"), a = await fetch(r, {
                    method: t,
                    body: t === "delete" ? "" : o,
                    mode: "same-origin",
                    headers: {"Scoped-CSRF-Token": i.value, "X-Requested-With": "XMLHttpRequest"}
                });
                if (!a.ok) return;
                const l = await a.text();
                zl(e.closest(".js-discussion-sidebar-item"), l)
            }

            s(Zr, "requestPreview");

            function Gl(e) {
                const t = e.getAttribute("data-reviewers-team-size-check-url");
                if (!t) return !1;
                const n = [...document.querySelectorAll(".js-reviewer-team")].map(l => l.getAttribute("data-id")),
                    o = e instanceof HTMLFormElement ? new FormData(e) : Hn(e),
                    i = new URLSearchParams(o).getAll("reviewer_team_ids[]").filter(l => !n.includes(l));
                if (i.length === 0) return !1;
                const a = new URLSearchParams(i.map(l => ["reviewer_team_ids[]", l]));
                return Zl(e, `${t}?${a}`), !0
            }

            s(Gl, "reviewerTeamsCheckRequired");

            async function Zl(e, t) {
                const n = await fetch(t);
                if (!n.ok) return;
                const o = await n.text();
                if (o.match(/[^\w-]js-large-team[^\w-]/)) Jl(e, o); else {
                    nt(e, !0);

                }
            }

            s(Zl, "triggerTeamReviewerCheck");

            function Jl(e, t) {
                const n = e.querySelector(".js-large-teams-check-warning-container");
                for (; n.firstChild;) n.removeChild(n.firstChild);
                n.appendChild((0, P.r)(document, t));
                const o = n.querySelector("details");

                function r(i) {
                    if (i.target instanceof Element) {
                        if (o.open = !1, !i.target.classList.contains("js-large-teams-confirm-button")) {
                            const a = e.querySelectorAll("input[name='reviewer_team_ids[]']");
                            for (const l of a) n.querySelector(`.js-large-team[data-id='${l.value}']`) && (l.checked = !1)
                        }
                        nt(e, !0), i.preventDefault()
                    }
                }

                s(r, "dialogAction"), n.querySelector(".js-large-teams-confirm-button").addEventListener("click", r, {once: !0}), n.querySelector(".js-large-teams-cancel-button").addEventListener("click", r, {once: !0}), o.addEventListener("details-dialog-close", r, {once: !0}), o.open = !0
            }

            s(Jl, "showTeamReviewerConfirmationDialog"), (0, c.on)("click", "div.js-project-column-menu-container .js-project-column-menu-item button", async function (e) {
                const t = e.currentTarget;
                Yl(t);
                const n = t.getAttribute("data-url"), o = t.parentElement.querySelector(".js-data-url-csrf"),
                    r = t.getAttribute("data-card-id"), i = new FormData;
                if (i.append("card_id", r), i.append("use_automation_prioritization", "true"), e.preventDefault(), !(await fetch(n, {
                    method: "PUT",
                    mode: "same-origin",
                    body: i,
                    headers: {"Scoped-CSRF-Token": o.value, "X-Requested-With": "XMLHttpRequest"}
                })).ok) return;
                const l = document.activeElement, y = t.closest(".js-project-column-menu-dropdown");
                if (l && y.contains(l)) try {
                    l.blur()
                } catch {
                }
            });

            function Yl(e) {
                const n = e.closest(".js-project-column-menu-dropdown").querySelector(".js-project-column-menu-summary"),
                    o = e.getAttribute("data-column-name");
                n.textContent = o
            }

            s(Yl, "updateProjectColumnMenuSummary"), (0, c.on)("click", ".js-prompt-dismiss", function (e) {
                e.currentTarget.closest(".js-prompt").remove()
            });

            function Hn(e) {
                const t = e.closest("form");
                if (!t) return new FormData;
                const o = new FormData(t).entries(), r = new FormData;
                for (const [i, a] of o) t.contains(Ql(t, i, a.toString())) && r.append(i, a);
                return r
            }

            s(Hn, "scopedFormData");

            function Ql(e, t, n) {
                for (const o of e.elements) if ((o instanceof HTMLInputElement || o instanceof HTMLTextAreaElement || o instanceof HTMLButtonElement) && o.name === t && o.value === n) return o;
                return null
            }

            s(Ql, "findParam"), (0, c.on)("click", ".js-convert-to-draft", function (e) {
                const t = e.currentTarget.getAttribute("data-url"),
                    n = e.currentTarget.parentElement.querySelector(".js-data-url-csrf");
                fetch(t, {
                    method: "POST",
                    mode: "same-origin",
                    headers: {"Scoped-CSRF-Token": n.value, "X-Requested-With": "XMLHttpRequest"}
                })
            }), (0, c.on)("click", "div.js-restore-item", async function (e) {
                const t = e.currentTarget.getAttribute("data-url"), n = e.currentTarget.getAttribute("data-column"),
                    o = e.currentTarget.querySelector(".js-data-url-csrf"), r = new FormData;
                if (r.set("memexProjectItemIds[]", n), !(await fetch(t, {
                    method: "PUT",
                    mode: "same-origin",
                    body: r,
                    headers: {"Scoped-CSRF-Token": o.value, "X-Requested-With": "XMLHttpRequest"}
                })).ok) throw new Error("connection error");
                Kr(e)
            })
        }, 73301: (F, I, u) => {
            "use strict";
            u.d(I, {N: () => C, x: () => R});
            var T = u(75488);
            let c = null;
            (async function () {
                await T.x, k()
            })();

            function C(b) {
                R(d(b))
            }

            s(C, "announceFromElement");

            function R(b) {
                !c || (c.textContent = "", c.textContent = b)
            }

            s(R, "announce");

            function k() {
                c = document.createElement("div"), c.setAttribute("aria-live", "polite"), c.classList.add("sr-only"), document.body.append(c)
            }

            s(k, "createNoticeContainer");

            function d(b) {
                return (b.getAttribute("aria-label") || b.innerText || "").trim()
            }

            s(d, "getTextContent")
        }, 6007: (F, I, u) => {
            "use strict";
            u.d(I, {s: () => h});
            var T = u(90420), c = u(5638);

            class C {
                constructor(g = 50, v = 30) {
                    this.elements = [], this.timer = null, this.callbacks = [], this.timeout = g, this.limit = v, this.index = 0
                }

                push(g) {
                    const v = `item-${this.index++}`;
                    return this.timer && (window.clearTimeout(this.timer), this.timer = null), this.elements.length >= this.limit && this.flush(), this.timer = window.setTimeout(() => {
                        this.timer = null, this.flush()
                    }, this.timeout), this.elements.push([g, v]), v
                }

                onFlush(g) {
                    this.callbacks.push(g)
                }

                async flush() {
                    const g = this.elements.splice(0, this.limit);
                    g.length !== 0 && await Promise.all(this.callbacks.map(v => v(g)))
                }
            }

            s(C, "AutoFlushingQueue");

            class R {
                constructor(g, v) {
                    this.url = g, this.callbacks = new Map, this.autoFlushingQueue = new C, this.autoFlushingQueue.onFlush(async L => {
                        this.load(L)
                    }), this.validate = v
                }

                loadInBatch(g) {
                    const v = this.autoFlushingQueue.push(g);
                    return new Promise(L => this.callbacks.set(v, L))
                }

                async load(g) {
                    const v = new Map;
                    for (const [E, M] of g) v.set(M, E);
                    const L = new FormData;
                    L.set("_method", "GET");
                    for (const [E, M] of v.entries()) for (const x of M.inputs) L.append(`items[${E}][${x.name}]`, x.value);
                    const P = await fetch(this.url, {
                        method: "POST",
                        body: L,
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    });
                    if (P.ok) {
                        const E = await P.json();
                        if (!E || typeof E != "object" || Array.isArray(E)) throw new Error("Malformed batch response");
                        for (const M in E) {
                            const x = this.callbacks.get(M);
                            if (x) {
                                const j = E[M];
                                this.validate(j), x(j)
                            }
                        }
                    }
                }
            }

            s(R, "BatchLoader");
            var k = Object.defineProperty, d = Object.getOwnPropertyDescriptor, b = s((p, g, v, L) => {
                for (var P = L > 1 ? void 0 : L ? d(g, v) : g, E = p.length - 1, M; E >= 0; E--) (M = p[E]) && (P = (L ? M(g, v, P) : M(P)) || P);
                return L && P && k(g, v, P), P
            }, "__decorateClass");

            class h extends HTMLElement {
                get batchLoader() {
                    const g = this.getAttribute("data-url");
                    if (!g) throw new Error(`${this.tagName} element requires a data-url attribute`);
                    let v = this.batchLoaders.get(g);
                    return v || (v = new R(g, L => this.validate(L)), this.batchLoaders.set(g, v)), v
                }

                async connectedCallback() {
                    const g = await this.batchLoader.loadInBatch(this);
                    this.update(g)
                }
            }

            s(h, "BaseBatchDeferredContentElement");
            const m = new Map;
            let f = s(class extends h {
                constructor() {
                    super(...arguments);
                    this.batchLoaders = m
                }

                validate(p) {
                    if (typeof p != "string") throw new Error("Batch deferred content was not a string")
                }

                update(p) {
                    const g = (0, c.r)(document, p);
                    this.replaceWith(g)
                }
            }, "BatchDeferredContentElement");
            b([T.GO], f.prototype, "inputs", 2), f = b([T.Ih], f)
        }, 71771: () => {
            let F, I = !1;

            function u() {
                F = document.activeElement, document.body && document.body.classList.toggle("intent-mouse", I)
            }

            s(u, "setClass"), document.addEventListener("mousedown", function () {
                I = !0, F === document.activeElement && u()
            }, {capture: !0}), document.addEventListener("keydown", function () {
                I = !1
            }, {capture: !0}), document.addEventListener("focusin", u, {capture: !0})
        }, 24247: (F, I, u) => {
            "use strict";
            u.d(I, {OD: () => d, Qc: () => b, nz: () => k});
            var T = u(50320), c = u(43721);

            function C(h, m, f) {
                const p = f.closest(".js-characters-remaining-container");
                if (!p) return;
                const g = p.querySelector(".js-characters-remaining"), v = String(g.getAttribute("data-suffix")),
                    L = (0, T.rq)(h), P = m - L;
                P <= 20 ? (g.textContent = `${P} ${v}`, g.classList.toggle("color-fg-danger", P <= 5), g.hidden = !1) : g.hidden = !0
            }

            s(C, "showRemainingCharacterCount");

            function R(h) {
                return h.hasAttribute("data-maxlength") ? parseInt(h.getAttribute("data-maxlength") || "") : h.maxLength
            }

            s(R, "getFieldLimit");

            function k(h) {
                const m = R(h), f = (0, T.rq)(h.value);
                return m - f < 0
            }

            s(k, "hasExceededCharacterLimit");

            function d(h) {
                const m = R(h);
                C(h.value, m, h)
            }

            s(d, "updateInputRemainingCharacters");

            function b(h) {
                const m = h.querySelectorAll(".js-characters-remaining-container");
                for (const f of m) {
                    const p = f.querySelector(".js-characters-remaining-field");
                    d(p)
                }
            }

            s(b, "resetCharactersRemainingCounts"), (0, c.ZG)(".js-characters-remaining-field", function (h) {
                function m() {
                    (h instanceof HTMLInputElement || h instanceof HTMLTextAreaElement) && d(h)
                }

                s(m, "onInput"), m(), h.addEventListener("input", m), h.addEventListener("blur", () => {
                    h.removeEventListener("input", m)
                }, {once: !0})
            })
        }, 37542: (F, I, u) => {
            "use strict";
            u.d(I, {z: () => v});
            var T = u(59753), c = u(7732), C = u(66963), R = u(16246), k = u(10795), d = u(64463), b = u(65935),
                h = u(34692);
            let m = [];
            (0, d.N7)(".js-comment-header-actions-deferred-include-fragment", {
                subscribe: E => (0, R.RB)(E, "loadstart", () => {
                    const M = E.closest(".js-comment");
                    g(M)
                }, {capture: !1, once: !0})
            }), (0, d.N7)(".js-comment .contains-task-list", {
                add: E => {
                    const M = E.closest(".js-comment");
                    g(M)
                }
            }), (0, T.on)("click", ".js-comment-edit-button", function (E) {
                const M = E.currentTarget.closest(".js-comment");
                M.classList.add("is-comment-editing");
                const x = p(M);
                x ? x.addEventListener("include-fragment-replaced", () => f(M), {once: !0}) : f(M);
                const j = E.currentTarget.closest(".js-dropdown-details");
                j && j.removeAttribute("open")
            });

            function f(E) {
                E.querySelector(".js-write-tab").click();
                const M = E.querySelector(".js-comment-field");
                M.focus(), (0, T.f)(M, "change")
            }

            s(f, "focusEditForm");

            function p(E) {
                return E.querySelector(".js-comment-edit-form-deferred-include-fragment")
            }

            s(p, "findEditFormDeferredIncludeFragment");

            function g(E) {
                var M;
                (M = p(E)) == null || M.setAttribute("loading", "eager")
            }

            s(g, "loadEditFormDeferredIncludeFragment"), (0, T.on)("click", ".js-comment-hide-button", function (E) {
                const M = E.currentTarget.closest(".js-comment");
                P(M, !1);
                const x = M.querySelector(".js-minimize-comment");
                x && x.classList.remove("d-none");
                const j = E.currentTarget.closest(".js-dropdown-details");
                j && j.removeAttribute("open")
            }), (0, T.on)("click", ".js-comment-hide-minimize-form", function (E) {
                E.currentTarget.closest(".js-minimize-comment").classList.add("d-none")
            });

            function v(E) {
                const M = E.currentTarget.closest("form"), x = E.currentTarget.getAttribute("data-confirm-text");
                if ((0, k.T)(M) && !confirm(x)) return !1;
                for (const _ of M.querySelectorAll("input, textarea")) {
                    const A = _;
                    A.value = A.defaultValue, A.classList.contains("session-resumable-canceled") && (A.classList.add("js-session-resumable"), A.classList.remove("session-resumable-canceled"))
                }
                const j = E.currentTarget.closest(".js-comment");
                return j && j.classList.remove("is-comment-editing"), !0
            }

            s(v, "handleCommentCancelButtonClick"), (0, T.on)("click", ".js-comment-cancel-button", v), (0, T.on)("click", ".js-cancel-issue-edit", function (E) {
                const M = E.currentTarget.closest(".js-details-container");
                M.querySelector(".js-comment-form-error").hidden = !0
            }), (0, b.AC)(".js-comment-delete, .js-comment .js-comment-update, .js-issue-update, .js-comment-minimize, .js-comment-unminimize", function (E, M, x) {
                const j = E.closest(".js-comment");
                j.classList.add("is-comment-loading");
                const _ = j.getAttribute("data-body-version");
                _ && x.headers.set("X-Body-Version", _)
            }), (0, b.AC)(".js-comment .js-comment-update", async function (E, M) {
                let x;
                const j = E.closest(".js-comment"), _ = j.querySelector(".js-comment-update-error"),
                    A = j.querySelector(".js-comment-body-error");
                _ instanceof HTMLElement && (_.hidden = !0), A instanceof HTMLElement && (A.hidden = !0), m = [];
                try {
                    x = await M.json()
                } catch (W) {
                    if (W.response.status === 422) {
                        const U = JSON.parse(W.response.text);
                        if (U.errors) {
                            _ instanceof HTMLElement && (_.textContent = `There was an error posting your comment: ${U.errors.join(", ")}`, _.hidden = !1);
                            return
                        }
                    } else throw W
                }
                if (!x) return;
                const N = x.json;
                N.errors && N.errors.length > 0 && (m = N.errors, L(A));
                const X = j.querySelector(".js-comment-body");
                X && N.body && (X.innerHTML = N.body), j.setAttribute("data-body-version", N.newBodyVersion);
                const D = j.querySelector(".js-body-version");
                D instanceof HTMLInputElement && (D.value = N.newBodyVersion);
                const O = j.querySelector(".js-discussion-poll");
                O && N.poll && (O.innerHTML = N.poll);
                for (const W of j.querySelectorAll("input, textarea")) {
                    const U = W;
                    U.defaultValue = U.value
                }
                j.classList.remove("is-comment-stale", "is-comment-editing");
                const K = j.querySelector(".js-comment-edit-history");
                if (K) {
                    const W = await (0, C.a)(document, N.editUrl);
                    K.innerHTML = "", K.append(W)
                }
            }), (0, d.N7)(".js-comment-body-error", {
                add: E => {
                    m && m.length > 0 && L(E)
                }
            });

            function L(E) {
                const M = E.querySelector("ol");
                if (M) {
                    M.innerHTML = "";
                    const x = m.map(j => {
                        const _ = document.createElement("li");
                        return _.textContent = j, _
                    });
                    for (const j of x) M.appendChild(j)
                }
                E.hidden = !1
            }

            s(L, "showBodyErrors"), (0, b.AC)(".js-comment .js-comment-delete, .js-comment .js-comment-update, .js-comment-minimize, .js-comment-unminimize", async function (E, M) {
                const x = E.closest(".js-comment");
                try {
                    await M.text()
                } catch (j) {
                    if (j.response.status === 422) {
                        let _;
                        try {
                            _ = JSON.parse(j.response.text)
                        } catch {
                        }
                        _ && _.stale && x.classList.add("is-comment-stale")
                    } else throw j
                }
                x.classList.remove("is-comment-loading")
            });

            function P(E, M) {
                const x = E.querySelector(".js-comment-show-on-error");
                x && (x.hidden = !M);
                const j = E.querySelector(".js-comment-hide-on-error");
                j && (j.hidden = M)
            }

            s(P, "toggleMinimizeError"), (0, b.AC)(".js-timeline-comment-unminimize, .js-timeline-comment-minimize", async function (E, M) {
                const x = E.closest(".js-minimize-container");
                try {
                    const j = await M.html();
                    x.replaceWith(j.html)
                } catch {
                    P(x, !0)
                }
            }), (0, b.AC)(".js-discussion-comment-unminimize, .js-discussion-comment-minimize", async function (E, M) {
                const x = E.closest(".js-discussion-comment"), j = x.querySelector(".js-discussion-comment-error");
                j && (j.hidden = !0);
                try {
                    const _ = await M.html();
                    x.replaceWith(_.html)
                } catch (_) {
                    if (_.response.status >= 400 && _.response.status < 500) {
                        if (_.response.html) {
                            const A = _.response.html.querySelector(".js-discussion-comment").getAttribute("data-error");
                            j instanceof HTMLElement && (j.textContent = A, j.hidden = !1)
                        }
                    } else throw _
                }
            }), (0, b.AC)(".js-comment-delete", async function (E, M) {
                await M.json();
                let x = E.closest(".js-comment-delete-container");
                x || (x = E.closest(".js-comment-container") || E.closest(".js-line-comments"), x && x.querySelectorAll(".js-comment").length !== 1 && (x = E.closest(".js-comment")));
                const j = (x == null ? void 0 : x.closest(".js-comment-container")) || (x == null ? void 0 : x.closest(".js-line-comments"));
                if (x == null || x.remove(), j && j.querySelectorAll(".js-comment").length === 1) for (const _ of j.querySelectorAll(".js-delete-on-last-reply-deleted")) _.remove()
            }), (0, b.AC)(".js-issue-update", async function (E, M) {
                var x, j, _;
                const A = E.closest(".js-details-container"), N = A.querySelector(".js-comment-form-error");
                let X;
                try {
                    X = await M.json()
                } catch (O) {
                    N.textContent = ((_ = (j = (x = O.response) == null ? void 0 : x.json) == null ? void 0 : j.errors) == null ? void 0 : _[0]) || "Something went wrong. Please try again.", N.hidden = !1
                }
                if (!X) return;
                A.classList.remove("open"), N.hidden = !0;
                const D = X.json;
                if (D.issue_title != null) {
                    A.querySelector(".js-issue-title").textContent = D.issue_title;
                    const O = A.closest(".js-issues-results");
                    if (O) {
                        if (O.querySelector(".js-merge-pr.is-merging")) {
                            const U = O.querySelector(".js-merge-pull-request textarea");
                            U instanceof HTMLTextAreaElement && U.value === U.defaultValue && (U.value = U.defaultValue = D.issue_title)
                        } else if (O.querySelector(".js-merge-pr.is-squashing")) {
                            const U = O.querySelector(".js-merge-pull-request .js-merge-title");
                            U instanceof HTMLInputElement && U.value === U.defaultValue && (U.value = U.defaultValue = D.default_squash_commit_title)
                        }
                        const K = O.querySelector("button[value=merge]");
                        K && K.setAttribute("data-input-message-value", D.issue_title);
                        const W = O.querySelector("button[value=squash]");
                        W && W.setAttribute("data-input-title-value", D.default_squash_commit_title)
                    }
                }
                document.title = D.page_title;
                for (const O of E.elements) (O instanceof HTMLInputElement || O instanceof HTMLTextAreaElement) && (O.defaultValue = O.value)
            }), (0, b.AC)(".js-comment-minimize", async function (E, M) {
                await M.json();
                const x = E.closest(".js-comment"), j = x.querySelector(".js-minimize-comment");
                if (j && j.classList.contains("js-update-minimized-content")) {
                    const _ = E.querySelector("input[type=submit], button[type=submit]");
                    _ && _.classList.add("disabled");
                    const A = x.closest(".js-comment-container");
                    A && await (0, h.x0)(A)
                } else {
                    j && j.classList.add("d-none");
                    const _ = E.closest(".unminimized-comment");
                    _.classList.add("d-none"), _.classList.remove("js-comment");
                    const N = E.closest(".js-minimizable-comment-group").querySelector(".minimized-comment");
                    N && N.classList.remove("d-none"), N && N.classList.add("js-comment")
                }
            }), (0, b.AC)(".js-comment-unminimize", async function (E, M) {
                await M.json();
                const x = E.closest(".js-minimizable-comment-group"), j = x.querySelector(".unminimized-comment"),
                    _ = x.querySelector(".minimized-comment");
                if (j) j.classList.remove("d-none"), j.classList.add("js-comment"), _ && _.classList.add("d-none"), _ && _.classList.remove("js-comment"); else {
                    if (_) {
                        const N = _.querySelector(".timeline-comment-actions");
                        N && N.classList.add("d-none"), _.classList.remove("js-comment")
                    }
                    const A = x.closest(".js-comment-container");
                    await (0, h.x0)(A)
                }
            }), (0, T.on)("details-menu-select", ".js-comment-edit-history-menu", E => {
                const M = E.detail.relatedTarget.getAttribute("data-edit-history-url");
                if (!M) return;
                E.preventDefault();
                const x = (0, C.a)(document, M);
                (0, c.W)({content: x, dialogClass: "Box-overlay--wide"})
            }, {capture: !0})
        }, 40332: () => {
            document.addEventListener("click", function (F) {
                if (!(F.target instanceof Element)) return;
                const I = "a[data-confirm], input[type=submit][data-confirm], input[type=checkbox][data-confirm], button[data-confirm]",
                    u = F.target.closest(I);
                if (!u) return;
                const T = u.getAttribute("data-confirm");
                !T || u instanceof HTMLInputElement && u.hasAttribute("data-confirm-checked") && !u.checked || confirm(T) || (F.stopImmediatePropagation(), F.preventDefault())
            }, !0)
        }, 47458: (F, I, u) => {
            "use strict";
            u.d(I, {Z: () => R});
            var T = u(75488);
            const c = [];
            let C = 0;

            function R(m) {
                (async function () {
                    c.push(m), await T.x, k()
                })()
            }

            s(R, "hashChange"), R.clear = () => {
                c.length = C = 0
            };

            function k() {
                const m = C;
                C = c.length, d(c.slice(m), null, window.location.href)
            }

            s(k, "runRemainingHandlers");

            function d(m, f, p) {
                const g = window.location.hash.slice(1), v = g ? document.getElementById(g) : null,
                    L = {oldURL: f, newURL: p, target: v};
                for (const P of m) P.call(null, L)
            }

            s(d, "runHandlers");
            let b = window.location.href;
            window.addEventListener("popstate", function () {
                b = window.location.href
            }), window.addEventListener("hashchange", function (m) {
                const f = window.location.href;
                try {
                    d(c, m.oldURL || b, f)
                } finally {
                    b = f
                }
            });
            let h = null;
            document.addEventListener("pjax:start", function () {
                h = window.location.href
            }), document.addEventListener("pjax:end", function () {
                d(c, h, window.location.href)
            })
        }, 40669: (F, I, u) => {
            "use strict";
            u.d(I, {G: () => h});
            var T = u(43721), c = u(64463), C = u(59753);
            const R = ["input[pattern]", "input[required]", "textarea[required]", "input[data-required-change]", "textarea[data-required-change]", "input[data-required-value]", "textarea[data-required-value]"].join(",");

            function k(m) {
                const f = m.getAttribute("data-required-value"), p = m.getAttribute("data-required-value-prefix");
                if (m.value === f) m.setCustomValidity(""); else {
                    let g = f;
                    p && (g = p + g), m.setCustomValidity(g)
                }
            }

            s(k, "checkValidityForRequiredValueField"), (0, T.q6)("[data-required-value]", function (m) {
                const f = m.currentTarget;
                k(f)
            }), (0, C.on)("change", "[data-required-value]", function (m) {
                const f = m.currentTarget;
                k(f), h(f.form)
            }), (0, T.q6)("[data-required-trimmed]", function (m) {
                const f = m.currentTarget;
                f.value.trim() === "" ? f.setCustomValidity(f.getAttribute("data-required-trimmed")) : f.setCustomValidity("")
            }), (0, C.on)("change", "[data-required-trimmed]", function (m) {
                const f = m.currentTarget;
                f.value.trim() === "" ? f.setCustomValidity(f.getAttribute("data-required-trimmed")) : f.setCustomValidity(""), h(f.form)
            }), (0, T.ZG)(R, m => {
                let f = m.checkValidity();

                function p() {
                    const g = m.checkValidity();
                    g !== f && m.form && h(m.form), f = g
                }

                s(p, "inputHandler"), m.addEventListener("input", p), m.addEventListener("blur", s(function g() {
                    m.removeEventListener("input", p), m.removeEventListener("blur", g)
                }, "blurHandler"))
            });
            const d = new WeakMap;

            function b(m) {
                d.get(m) || (m.addEventListener("change", () => h(m)), d.set(m, !0))
            }

            s(b, "installHandlers");

            function h(m) {
                const f = m.checkValidity();
                for (const p of m.querySelectorAll("button[data-disable-invalid]")) p.disabled = !f
            }

            s(h, "validate"), (0, c.N7)("button[data-disable-invalid]", {
                constructor: HTMLButtonElement, initialize(m) {
                    const f = m.form;
                    f && (b(f), m.disabled = !f.checkValidity())
                }
            }), (0, c.N7)("input[data-required-change], textarea[data-required-change]", function (m) {
                const f = m, p = f.type === "radio" && f.form ? f.form.elements.namedItem(f.name).value : null;

                function g(v) {
                    const L = f.form;
                    if (v && f.type === "radio" && L && p) for (const P of L.elements.namedItem(f.name)) P instanceof HTMLInputElement && P.setCustomValidity(f.value === p ? "unchanged" : ""); else f.setCustomValidity(f.value === (p || f.defaultValue) ? "unchanged" : "")
                }

                s(g, "customValidity"), f.addEventListener("input", g), f.addEventListener("change", g), g(), f.form && h(f.form)
            }), document.addEventListener("reset", function (m) {
                if (m.target instanceof HTMLFormElement) {
                    const f = m.target;
                    setTimeout(() => h(f))
                }
            })
        }, 55199: () => {
            document.addEventListener("pjax:click", function (F) {
                if (window.onbeforeunload) return F.preventDefault()
            })
        }, 97605: (F, I, u) => {
            "use strict";
            u.d(I, {k: () => k});
            var T = u(16246), c = u(75488), C = u(64463), R = u(36997);
            (0, C.N7)(".js-responsive-underlinenav", {
                constructor: HTMLElement,
                subscribe: h => (k(h), (0, T.RB)(window, "resize", () => b(h)))
            });

            async function k(h) {
                await c.C, b(h)
            }

            s(k, "asyncCalculateVisibility");

            function d(h, m) {
                h.style.visibility = m ? "hidden" : "";
                const f = h.getAttribute("data-tab-item");
                if (f) {
                    const p = document.querySelector(`[data-menu-item=${f}]`);
                    p instanceof HTMLElement && (p.hidden = !m)
                }
            }

            s(d, "toggleItem");

            function b(h) {
                const m = h.querySelectorAll(".js-responsive-underlinenav-item"),
                    f = h.querySelector(".js-responsive-underlinenav-overflow"), p = (0, R.oE)(f, h);
                if (!p) return;
                let g = !1;
                for (const v of m) {
                    const L = (0, R.oE)(v, h);
                    if (L) {
                        const P = L.left + v.offsetWidth >= p.left;
                        d(v, P), g = g || P
                    }
                }
                f.style.visibility = g ? "" : "hidden"
            }

            s(b, "calculateVisibility")
        }, 88014: () => {
            document.addEventListener("pjax:end", function () {
                const F = document.querySelector('meta[name="selected-link"]'), I = F && F.getAttribute("value");
                if (!!I) for (const u of document.querySelectorAll(".js-sidenav-container-pjax .js-selected-navigation-item")) {
                    const T = (u.getAttribute("data-selected-links") || "").split(" ").indexOf(I) >= 0;
                    T ? u.setAttribute("aria-current", "page") : u.removeAttribute("aria-current"), u.classList.toggle("selected", T)
                }
            })
        }, 18883: () => {
            function F(T) {
                const c = document.querySelector(".js-stale-session-flash"),
                    C = c.querySelector(".js-stale-session-flash-signed-in"),
                    R = c.querySelector(".js-stale-session-flash-signed-out");
                c.hidden = !1, C.hidden = T === "false", R.hidden = T === "true", window.addEventListener("popstate", function (k) {
                    k.state && k.state.container != null && location.reload()
                }), document.addEventListener("submit", function (k) {
                    k.preventDefault()
                })
            }

            s(F, "sessionChanged");
            let I;
            if (typeof BroadcastChannel == "function") try {
                I = new BroadcastChannel("stale-session"), I.onmessage = T => {
                    typeof T.data == "string" && F(T.data)
                }
            } catch {
            }
            if (!I) {
                let T = !1;
                I = {
                    postMessage(c) {
                        T = !0;
                        try {
                            window.localStorage.setItem("logged-in", c)
                        } finally {
                            T = !1
                        }
                    }
                }, window.addEventListener("storage", function (c) {
                    if (!T && c.storageArea === window.localStorage && c.key === "logged-in") try {
                        (c.newValue === "true" || c.newValue === "false") && F(c.newValue)
                    } finally {
                        window.localStorage.removeItem(c.key)
                    }
                })
            }
            const u = document.querySelector(".js-stale-session-flash[data-signedin]");
            if (u) {
                const T = u.getAttribute("data-signedin") || "";
                I.postMessage(T)
            }
        }, 29935: (F, I, u) => {
            "use strict";
            var T = u(11793), c = u(59753), C = u(64463);

            class R {
                constructor(d) {
                    this.container = d.container, this.selections = d.selections, this.inputWrap = d.inputWrap, this.input = d.input, this.tagTemplate = d.tagTemplate, this.form = this.input.form, this.autoComplete = d.autoComplete, this.multiTagInput = d.multiTagInput
                }

                setup() {
                    this.container.addEventListener("click", d => {
                        d.target.closest(".js-remove") ? this.removeTag(d) : this.onFocus()
                    }), this.input.addEventListener("focus", this.onFocus.bind(this)), this.input.addEventListener("blur", this.onBlur.bind(this)), this.input.addEventListener("keydown", this.onKeyDown.bind(this)), this.form.addEventListener("submit", this.onSubmit.bind(this)), this.autoComplete.addEventListener("auto-complete-change", () => {
                        this.selectTag(this.autoComplete.value)
                    })
                }

                onFocus() {
                    this.inputWrap.classList.add("focus"), this.input !== document.activeElement && this.input.focus()
                }

                onBlur() {
                    this.inputWrap.classList.remove("focus"), this.autoComplete.open || this.onSubmit()
                }

                onSubmit() {
                    this.input.value && (this.selectTag(this.input.value), this.autoComplete.open = !1)
                }

                onKeyDown(d) {
                    switch ((0, T.EL)(d)) {
                        case"Backspace":
                            this.onBackspace();
                            break;
                        case"Enter":
                        case"Tab":
                            this.taggifyValueWhenSuggesterHidden(d);
                            break;
                        case",":
                        case" ":
                            this.taggifyValue(d);
                            break
                    }
                }

                taggifyValueWhenSuggesterHidden(d) {
                    !this.autoComplete.open && this.input.value && (d.preventDefault(), this.selectTag(this.input.value))
                }

                taggifyValue(d) {
                    this.input.value && (d.preventDefault(), this.selectTag(this.input.value), this.autoComplete.open = !1)
                }

                selectTag(d) {
                    const b = this.normalizeTag(d), h = this.selectedTags();
                    let m = !1;
                    for (let f = 0; f < b.length; f++) {
                        const p = b[f];
                        h.indexOf(p) < 0 && (this.selections.appendChild(this.templateTag(p)), m = !0)
                    }
                    m && (this.input.value = "", (0, c.f)(this.form, "tags:changed"))
                }

                removeTag(d) {
                    const b = d.target;
                    d.preventDefault(), b.closest(".js-tag-input-tag").remove(), (0, c.f)(this.form, "tags:changed")
                }

                templateTag(d) {
                    const b = this.tagTemplate.cloneNode(!0);
                    return b.querySelector("input").value = d, b.querySelector(".js-placeholder-tag-name").replaceWith(d), b.classList.remove("d-none", "js-template"), b
                }

                normalizeTag(d) {
                    const b = d.toLowerCase().trim();
                    return b ? this.multiTagInput ? b.split(/[\s,']+/) : [b.replace(/[\s,']+/g, "-")] : []
                }

                onBackspace() {
                    if (!this.input.value) {
                        const d = this.selections.querySelector("li:last-child .js-remove");
                        d instanceof HTMLElement && d.click()
                    }
                }

                selectedTags() {
                    const d = this.selections.querySelectorAll("input");
                    return Array.from(d).map(b => b.value).filter(b => b.length > 0)
                }
            }

            s(R, "TagInput"), (0, C.N7)(".js-tag-input-container", {
                constructor: HTMLElement, initialize(k) {
                    new R({
                        container: k,
                        inputWrap: k.querySelector(".js-tag-input-wrapper"),
                        input: k.querySelector('input[type="text"], input:not([type])'),
                        selections: k.querySelector(".js-tag-input-selected-tags"),
                        tagTemplate: k.querySelector(".js-template"),
                        autoComplete: k.querySelector("auto-complete"),
                        multiTagInput: !1
                    }).setup()
                }
            }), (0, C.N7)(".js-multi-tag-input-container", {
                constructor: HTMLElement, initialize(k) {
                    new R({
                        container: k,
                        inputWrap: k.querySelector(".js-tag-input-wrapper"),
                        input: k.querySelector('input[type="text"], input:not([type])'),
                        selections: k.querySelector(".js-tag-input-selected-tags"),
                        tagTemplate: k.querySelector(".js-template"),
                        autoComplete: k.querySelector("auto-complete"),
                        multiTagInput: !0
                    }).setup()
                }
            })
        }, 58462: () => {
            function F() {
                const u = document.createElement("div");
                return u.style.cssText = "-ms-user-select: element; user-select: contain;", u.style.getPropertyValue("-ms-user-select") === "element" || u.style.getPropertyValue("-ms-user-select") === "contain" || u.style.getPropertyValue("user-select") === "contain"
            }

            s(F, "supportsUserSelectContain");

            function I(u) {
                if (!(u.target instanceof Element)) return;
                const T = u.target.closest(".user-select-contain");
                if (!T) return;
                const c = window.getSelection();
                if (!c || !c.rangeCount || !c.rangeCount || c.type !== "Range") return;
                const C = c.getRangeAt(0).commonAncestorContainer;
                T.contains(C) || c.selectAllChildren(T)
            }

            s(I, "handleUserSelectContain"), F() || document.addEventListener("click", I)
        }, 6760: (F, I, u) => {
            "use strict";
            u.d(I, {Dw: () => k, G5: () => T, M9: () => b, n6: () => R});

            function T(g) {
                const v = g.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);
                if (v) if (v.length === 1) {
                    const L = d(v[0]);
                    return L ? Object.freeze({start: L, end: L}) : void 0
                } else if (v.length === 2) {
                    const L = d(v[0]), P = d(v[1]);
                    return !L || !P ? void 0 : f(Object.freeze({start: L, end: P}))
                } else else
            }

            s(T, "parseBlobRange");

            function c(g) {
                const {start: v, end: L} = f(g);
                return v.column != null && L.column != null ? `L${v.line}C${v.column}-L${L.line}C${L.column}` : v.line === L.line ? `L${v.line}` : `L${v.line}-L${L.line}`
            }

            s(c, "formatBlobRange");

            function C(g) {
                const v = g.match(/(file-.+?-)L\d+?/i);
                return v ? v[1] : ""
            }

            s(C, "parseAnchorPrefix");

            function R(g) {
                const v = T(g), L = C(g);
                return {blobRange: v, anchorPrefix: L}
            }

            s(R, "parseFileAnchor");

            function k({anchorPrefix: g, blobRange: v}) {
                return v ? `#${g}${c(v)}` : "#"
            }

            s(k, "formatBlobRangeAnchor");

            function d(g) {
                const v = g.match(/L(\d+)/), L = g.match(/C(\d+)/);
                return v ? Object.freeze({line: parseInt(v[1]), column: L ? parseInt(L[1]) : null}) : null
            }

            s(d, "parseBlobOffset");

            function b(g, v) {
                const [L, P] = h(g.start, !0, v), [E, M] = h(g.end, !1, v);
                if (!L || !E) return;
                let x = P, j = M;
                if (x === -1 && (x = 0), j === -1 && (j = E.childNodes.length), !L.ownerDocument) throw new Error("DOMRange needs to be inside document");
                const _ = L.ownerDocument.createRange();
                return _.setStart(L, x), _.setEnd(E, j), _
            }

            s(b, "DOMRangeFromBlob");

            function h(g, v, L) {
                const P = [null, 0], E = L(g.line);
                if (!E) return P;
                if (g.column == null) return [E, -1];
                let M = g.column - 1;
                const x = m(E);
                for (let j = 0; j < x.length; j++) {
                    const _ = x[j], A = M - (_.textContent || "").length;
                    if (A === 0) {
                        const N = x[j + 1];
                        return v && N ? [N, 0] : [_, M]
                    } else if (A < 0) return [_, M];
                    M = A
                }
                return P
            }

            s(h, "findRangeOffset");

            function m(g) {
                if (g.nodeType === Node.TEXT_NODE) return [g];
                if (!g.childNodes || !g.childNodes.length) return [];
                let v = [];
                for (const L of g.childNodes) v = v.concat(m(L));
                return v
            }

            s(m, "getAllTextNodes");

            function f(g) {
                const v = [g.start, g.end];
                return v.sort(p), v[0] === g.start && v[1] === g.end ? g : Object.freeze({start: v[0], end: v[1]})
            }

            s(f, "ascendingBlobRange");

            function p(g, v) {
                return g.line === v.line && g.column === v.column ? 0 : g.line === v.line && typeof g.column == "number" && typeof v.column == "number" ? g.column - v.column : g.line - v.line
            }

            s(p, "compareBlobOffsets")
        }, 68499: (F, I, u) => {
            "use strict";
            u.d(I, {P: () => C, g: () => R});
            var T = u(59753);
            const c = new WeakMap;

            function C(b) {
                return c.get(b)
            }

            s(C, "getCodeEditor");

            async function R(b) {
                return c.get(b) || k(await d(b, "codeEditor:ready"))
            }

            s(R, "getAsyncCodeEditor");

            function k(b) {
                if (!(b instanceof CustomEvent)) throw new Error("assert: event is not a CustomEvent");
                const h = b.detail.editor;
                if (!b.target) throw new Error("assert: event.target is null");
                return c.set(b.target, h), h
            }

            s(k, "onEditorFromEvent"), (0, T.on)("codeEditor:ready", ".js-code-editor", k);

            function d(b, h) {
                return new Promise(m => {
                    b.addEventListener(h, m, {once: !0})
                })
            }

            s(d, "nextEvent")
        }, 20215: (F, I, u) => {
            "use strict";
            u.d(I, {$1: () => c, d8: () => R, ej: () => T, kT: () => k});

            function T(d) {
                return c(d)[0]
            }

            s(T, "getCookie");

            function c(d) {
                const b = [];
                for (const h of C()) {
                    const [m, f] = h.trim().split("=");
                    d === m && typeof f != "undefined" && b.push({key: m, value: f})
                }
                return b
            }

            s(c, "getCookies");

            function C() {
                try {
                    return document.cookie.split(";")
                } catch {
                    return []
                }
            }

            s(C, "readCookies");

            function R(d, b, h = null, m = !1, f = "lax") {
                let p = document.domain;
                if (p == null) throw new Error("Unable to get document domain");
                p.endsWith(".github.com") && (p = "github.com");
                const g = location.protocol === "https:" ? "; secure" : "", v = h ? `; expires=${h}` : "";
                m === !1 && (p = `.${p}`);
                try {
                    document.cookie = `${d}=${b}; path=/; domain=${p}${v}${g}; samesite=${f}`
                } catch {
                }
            }

            s(R, "setCookie");

            function k(d, b = !1) {
                let h = document.domain;
                if (h == null) throw new Error("Unable to get document domain");
                h.endsWith(".github.com") && (h = "github.com");
                const m = new Date().getTime(), f = new Date(m - 1).toUTCString(),
                    p = location.protocol === "https:" ? "; secure" : "", g = `; expires=${f}`;
                b === !1 && (h = `.${h}`);
                try {
                    document.cookie = `${d}=''; path=/; domain=${h}${g}${p}`
                } catch {
                }
            }

            s(k, "deleteCookie")
        }, 36997: (F, I, u) => {
            "use strict";
            u.d(I, {VZ: () => c, _C: () => C, cv: () => T, oE: () => R});

            function T(b) {
                const h = b.getBoundingClientRect();
                return {top: h.top + window.pageYOffset, left: h.left + window.pageXOffset}
            }

            s(T, "offset");

            function c(b) {
                let h = b;
                const m = h.ownerDocument;
                if (!m || !h.offsetParent) return;
                const f = m.defaultView.HTMLElement;
                if (h !== m.body) {
                    for (; h !== m.body;) {
                        if (h.parentElement instanceof f) h = h.parentElement; else return;
                        const {position: p, overflowY: g, overflowX: v} = getComputedStyle(h);
                        if (p === "fixed" || g === "auto" || v === "auto" || g === "scroll" || v === "scroll") break
                    }
                    return h instanceof Document ? null : h
                }
            }

            s(c, "overflowParent");

            function C(b, h) {
                let m = h;
                const f = b.ownerDocument;
                if (!f) return;
                const p = f.documentElement;
                if (!p || b === p) return;
                const g = R(b, m);
                if (!g) return;
                m = g._container;
                const v = m === f.documentElement && f.defaultView ? {
                        top: f.defaultView.pageYOffset,
                        left: f.defaultView.pageXOffset
                    } : {top: m.scrollTop, left: m.scrollLeft}, L = g.top - v.top, P = g.left - v.left, E = m.clientHeight,
                    M = m.clientWidth, x = E - (L + b.offsetHeight), j = M - (P + b.offsetWidth);
                return {top: L, left: P, bottom: x, right: j, height: E, width: M}
            }

            s(C, "overflowOffset");

            function R(b, h) {
                let m = b;
                const f = m.ownerDocument;
                if (!f) return;
                const p = f.documentElement;
                if (!p) return;
                const g = f.defaultView.HTMLElement;
                let v = 0, L = 0;
                const P = m.offsetHeight, E = m.offsetWidth;
                for (; !(m === f.body || m === h);) if (v += m.offsetTop || 0, L += m.offsetLeft || 0, m.offsetParent instanceof g) m = m.offsetParent; else return;
                let M, x, j;
                if (!h || h === f || h === f.defaultView || h === f.documentElement || h === f.body) j = p, M = k(f.body, p), x = d(f.body, p); else if (h instanceof g) j = h, M = h.scrollHeight, x = h.scrollWidth; else return;
                const _ = M - (v + P), A = x - (L + E);
                return {top: v, left: L, bottom: _, right: A, _container: j}
            }

            s(R, "positionedOffset");

            function k(b, h) {
                return Math.max(b.scrollHeight, h.scrollHeight, b.offsetHeight, h.offsetHeight, h.clientHeight)
            }

            s(k, "getDocumentHeight");

            function d(b, h) {
                return Math.max(b.scrollWidth, h.scrollWidth, b.offsetWidth, h.offsetWidth, h.clientWidth)
            }

            s(d, "getDocumentWidth")
        }, 81302: (F, I, u) => {
            "use strict";
            u.d(I, {Dc: () => R, bP: () => b, g: () => d, gJ: () => T, rs: () => c});

            function T() {
                return Promise.resolve()
            }

            s(T, "microtask");

            function c() {
                return new Promise(window.requestAnimationFrame)
            }

            s(c, "animationFrame");

            async function C(h, m) {
                let f;
                const p = new Promise((g, v) => {
                    f = self.setTimeout(() => v(new Error("timeout")), h)
                });
                if (!m) return p;
                try {
                    await Promise.race([p, k(m)])
                } catch (g) {
                    throw self.clearTimeout(f), g
                }
            }

            s(C, "timeout");

            async function R(h, m) {
                let f;
                const p = new Promise(g => {
                    f = self.setTimeout(g, h)
                });
                if (!m) return p;
                try {
                    await Promise.race([p, k(m)])
                } catch (g) {
                    throw self.clearTimeout(f), g
                }
            }

            s(R, "wait");

            function k(h) {
                return new Promise((m, f) => {
                    const p = new Error("aborted");
                    p.name = "AbortError", h.aborted ? f(p) : h.addEventListener("abort", () => f(p))
                })
            }

            s(k, "whenAborted");

            function d(h) {
                const m = [];
                return function (f) {
                    m.push(f), m.length === 1 && queueMicrotask(() => {
                        const p = [...m];
                        m.length = 0, h(p)
                    })
                }
            }

            s(d, "taskQueue");

            async function b(h) {
                requestAnimationFrame(() => {
                    setTimeout(h)
                })
            }

            s(b, "afterNextPaint")
        }, 51012: (F, I, u) => {
            "use strict";
            u.d(I, {aJ: () => x, cI: () => P, eK: () => p});
            var T = u(71692), c = u(70290), C = u(82918), R = u(50232), k = u(28382), d = u(97261), b = u(46633);
            let h = !1, m = 0;
            const f = Date.now();

            function p(A, N = {}) {
                A && A.name !== "AbortError" && g(L(v(A), N))
            }

            s(p, "reportError");

            async function g(A) {
                var N, X;
                if (!_()) return;
                const D = (X = (N = document.head) == null ? void 0 : N.querySelector('meta[name="browser-errors-url"]')) == null ? void 0 : X.content;
                if (!!D) {
                    if (M(A.error.stacktrace)) {
                        h = !0;
                        return
                    }
                    m++;
                    try {
                        await fetch(D, {method: "post", body: JSON.stringify(A)})
                    } catch {
                    }
                }
            }

            s(g, "report");

            function v(A) {
                return {type: A.name, value: A.message, stacktrace: P(A)}
            }

            s(v, "formatError");

            function L(A, N = {}) {
                return Object.assign({
                    error: A,
                    sanitizedUrl: (0, d.S)() || window.location.href,
                    readyState: document.readyState,
                    referrer: (0, T.wP)(),
                    timeSinceLoad: Math.round(Date.now() - f),
                    user: x() || void 0,
                    turbo: (0, b.c)("TURBO")
                }, N)
            }

            s(L, "errorContext");

            function P(A) {
                return (0, k.Q)(A.stack || "").map(N => ({
                    filename: N.file || "",
                    function: String(N.methodName),
                    lineno: (N.lineNumber || 0).toString(),
                    colno: (N.column || 0).toString()
                }))
            }

            s(P, "stacktrace");
            const E = /(chrome|moz|safari)-extension:\/\//;

            function M(A) {
                return A.some(N => E.test(N.filename) || E.test(N.function))
            }

            s(M, "isExtensionError");

            function x() {
                var A, N;
                const X = (N = (A = document.head) == null ? void 0 : A.querySelector('meta[name="user-login"]')) == null ? void 0 : N.content;
                return X || `anonymous-${(0, C.b)()}`
            }

            s(x, "pageUser");
            let j = !1;
            window.addEventListener("pageshow", () => j = !1), window.addEventListener("pagehide", () => j = !0), document.addEventListener(T.QE.ERROR, A => {
                g(L({type: "SoftNavError", value: A.detail, stacktrace: P(new Error)}))
            });

            function _() {
                return !j && !h && m < 10 && (0, R.Gb)() && !(0, c.Z)(document)
            }

            s(_, "reportable"), typeof BroadcastChannel == "function" && new BroadcastChannel("shared-worker-error").addEventListener("message", N => {
                p(N.data.error)
            })
        }, 18654: (F, I, u) => {
            "use strict";
            u.d(I, {W: () => c});

            function* T(C, R) {
                for (const k of C) {
                    const d = R(k);
                    d != null && (yield d)
                }
            }

            s(T, "filterMap");

            function c(C, R, k) {
                return [...T(C, s(b => {
                    const h = R(b);
                    return h != null ? [b, h] : null
                }, "sortKey"))].sort((b, h) => k(b[1], h[1])).map(([b]) => b)
            }

            s(c, "filterSort")
        }, 18943: (F, I, u) => {
            "use strict";
            u.d(I, {EW: () => T, Qw: () => C, qu: () => k});

            function T(d, b) {
                let h = R(d, b);
                if (h && b.indexOf("/") === -1) {
                    const m = d.substring(d.lastIndexOf("/") + 1);
                    h += R(m, b)
                }
                return h
            }

            s(T, "fuzzyScore");

            function c(d) {
                const b = d.toLowerCase().split("");
                let h = "";
                for (let m = 0; m < b.length; m++) {
                    const p = b[m].replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
                    m === 0 ? h += `(.*)(${p})` : h += `([^${p}]*?)(${p})`
                }
                return new RegExp(`${h}(.*?)$`, "i")
            }

            s(c, "fuzzyRegexp");

            function C(d, b, h) {
                if (b) {
                    const m = d.innerHTML.trim().match(h || c(b));
                    if (!m) return;
                    let f = !1;
                    const p = [];
                    for (let g = 1; g < m.length; ++g) {
                        const v = m[g];
                        !v || (g % 2 === 0 ? f || (p.push("<mark>"), f = !0) : f && (p.push("</mark>"), f = !1), p.push(v))
                    }
                    d.innerHTML = p.join("")
                } else {
                    const m = d.innerHTML.trim(), f = m.replace(/<\/?mark>/g, "");
                    m !== f && (d.innerHTML = f)
                }
            }

            s(C, "fuzzyHighlightElement");

            function R(d, b) {
                let h = d;
                if (h === b) return 1;
                const m = h.length;
                let f = 0, p = 0;
                for (let P = 0; P < b.length; P++) {
                    const E = b[P], M = h.indexOf(E.toLowerCase()), x = h.indexOf(E.toUpperCase()), j = Math.min(M, x),
                        _ = j > -1 ? j : Math.max(M, x);
                    if (_ === -1) return 0;
                    f += .1, h[_] === E && (f += .1), _ === 0 && (f += .8, P === 0 && (p = 1)), h.charAt(_ - 1) === " " && (f += .8), h = h.substring(_ + 1, m)
                }
                const g = b.length, v = f / g;
                let L = (v * (g / m) + v) / 2;
                return p && L + .1 < 1 && (L += .1), L
            }

            s(R, "stringScore");

            function k(d, b) {
                return d.score > b.score ? -1 : d.score < b.score ? 1 : d.text < b.text ? -1 : d.text > b.text ? 1 : 0
            }

            s(k, "compare")
        }, 70462: (F, I, u) => {
            "use strict";
            u.d(I, {Z: () => m});
            var T = u(47142);
            const c = s((f, p, g) => {
                if (!(0, T.CD)(f, p)) return -1 / 0;
                const v = (0, T.Gs)(f, p);
                return v < g ? -1 / 0 : v
            }, "getScore"), C = s((f, p, g) => {
                f.innerHTML = "";
                let v = 0;
                for (const L of (0, T.m7)(p, g)) {
                    g.slice(v, L) !== "" && f.appendChild(document.createTextNode(g.slice(v, L))), v = L + 1;
                    const E = document.createElement("mark");
                    E.textContent = g[L], f.appendChild(E)
                }
                f.appendChild(document.createTextNode(g.slice(v)))
            }, "highlightElement"), R = new WeakMap, k = new WeakMap, d = new WeakMap, b = s(f => {
                if (!d.has(f) && f instanceof HTMLElement) {
                    const p = (f.getAttribute("data-value") || f.textContent || "").trim();
                    return d.set(f, p), p
                }
                return d.get(f) || ""
            }, "getTextCache");

            class h extends HTMLElement {
                static get observedAttributes() {
                    return ["value", "mark-selector", "min-score", "max-matches"]
                }

                get value() {
                    return this.getAttribute("value") || ""
                }

                set value(p) {
                    this.setAttribute("value", p)
                }

                get markSelector() {
                    return this.getAttribute("mark-selector") || ""
                }

                set markSelector(p) {
                    p ? this.setAttribute("mark-selector", p) : this.removeAttribute("mark-selector")
                }

                get minScore() {
                    return Number(this.getAttribute("min-score") || 0)
                }

                set minScore(p) {
                    Number.isNaN(p) || this.setAttribute("min-score", String(p))
                }

                get maxMatches() {
                    return Number(this.getAttribute("max-matches") || 1 / 0)
                }

                set maxMatches(p) {
                    Number.isNaN(p) || this.setAttribute("max-matches", String(p))
                }

                connectedCallback() {
                    const p = this.querySelector("ul");
                    if (!p) return;
                    const g = new Set(p.querySelectorAll("li")), v = this.querySelector("input");
                    v instanceof HTMLInputElement && v.addEventListener("input", () => {
                        this.value = v.value
                    });
                    const L = new MutationObserver(E => {
                        let M = !1;
                        for (const x of E) if (x.type === "childList" && x.addedNodes.length) {
                            for (const j of x.addedNodes) if (j instanceof HTMLLIElement && !g.has(j)) {
                                const _ = b(j);
                                M = M || (0, T.CD)(this.value, _), g.add(j)
                            }
                        }
                        M && this.sort()
                    });
                    L.observe(p, {childList: !0});
                    const P = {handler: L, items: g, lazyItems: new Map, timer: null};
                    k.set(this, P)
                }

                disconnectedCallback() {
                    const p = k.get(this);
                    p && (p.handler.disconnect(), k.delete(this))
                }

                addLazyItems(p, g) {
                    const v = k.get(this);
                    if (!v) return;
                    const {lazyItems: L} = v, {value: P} = this;
                    let E = !1;
                    for (const M of p) L.set(M, g), E = E || Boolean(P) && (0, T.CD)(P, M);
                    E && this.sort()
                }

                sort() {
                    const p = R.get(this);
                    p && (p.aborted = !0);
                    const g = {aborted: !1};
                    R.set(this, g);
                    const {minScore: v, markSelector: L, maxMatches: P, value: E} = this, M = k.get(this);
                    if (!M || !this.dispatchEvent(new CustomEvent("fuzzy-list-will-sort", {
                        cancelable: !0,
                        detail: E
                    }))) return;
                    const {items: x, lazyItems: j} = M, _ = this.hasAttribute("mark-selector"),
                        A = this.querySelector("ul");
                    if (!A) return;
                    const N = [];
                    if (E) {
                        for (const X of x) {
                            const D = b(X), O = c(E, D, v);
                            O !== -1 / 0 && N.push({item: X, score: O})
                        }
                        for (const [X, D] of j) {
                            const O = c(E, X, v);
                            O !== -1 / 0 && N.push({text: X, render: D, score: O})
                        }
                        N.sort((X, D) => D.score - X.score).splice(P)
                    } else {
                        let X = N.length;
                        for (const D of x) {
                            if (X >= P) break;
                            N.push({item: D, score: 1}), X += 1
                        }
                        for (const [D, O] of j) {
                            if (X >= P) break;
                            N.push({text: D, render: O, score: 1}), X += 1
                        }
                    }
                    requestAnimationFrame(() => {
                        if (g.aborted) return;
                        const X = A.querySelector('input[type="radio"]:checked');
                        A.innerHTML = "";
                        let D = 0;
                        const O = s(() => {
                            if (g.aborted) return;
                            const K = Math.min(N.length, D + 100), W = document.createDocumentFragment();
                            for (let ne = D; ne < K; ne += 1) {
                                const de = N[ne];
                                let ce = null;
                                if ("render" in de && "text" in de) {
                                    const {render: we, text: fe} = de;
                                    ce = we(fe), x.add(ce), d.set(ce, fe), j.delete(fe)
                                } else "item" in de && (ce = de.item);
                                ce instanceof HTMLElement && (_ && C(L && ce.querySelector(L) || ce, _ ? E : "", b(ce)), W.appendChild(ce))
                            }
                            D = K;
                            let U = !1;
                            if (X instanceof HTMLInputElement) for (const ne of W.querySelectorAll('input[type="radio"]:checked')) ne instanceof HTMLInputElement && ne.value !== X.value && (ne.checked = !1, U = !0);
                            if (A.appendChild(W), X && U && X.dispatchEvent(new Event("change", {bubbles: !0})), K < N.length) requestAnimationFrame(O); else {
                                A.hidden = N.length === 0;
                                const ne = this.querySelector("[data-fuzzy-list-show-on-empty]");
                                ne && (ne.hidden = N.length > 0), this.dispatchEvent(new CustomEvent("fuzzy-list-sorted", {detail: N.length}))
                            }
                        }, "nextBatch");
                        O()
                    })
                }

                attributeChangedCallback(p, g, v) {
                    if (g === v) return;
                    const L = k.get(this);
                    !L || (L.timer && window.clearTimeout(L.timer), L.timer = window.setTimeout(() => this.sort(), 100))
                }
            }

            s(h, "FuzzyListElement");
            const m = h;
            window.customElements.get("fuzzy-list") || (window.FuzzyListElement = h, window.customElements.define("fuzzy-list", h))
        }, 54412: (F, I, u) => {
            "use strict";
            u.d(I, {Y: () => b, q: () => h});
            var T = u(88149), c = u(86058);
            const C = "dimension_";
            let R;
            const k = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "scid"];
            try {
                const m = (0, T.n)("octolytics");
                delete m.baseContext, R = new c.R(m)
            } catch {
            }

            function d(m) {
                const f = (0, T.n)("octolytics").baseContext || {};
                if (f) {
                    delete f.app_id, delete f.event_url, delete f.host;
                    for (const v in f) v.startsWith(C) && (f[v.replace(C, "")] = f[v], delete f[v])
                }
                const p = document.querySelector("meta[name=visitor-payload]");
                if (p) {
                    const v = JSON.parse(atob(p.content));
                    Object.assign(f, v)
                }
                const g = new URLSearchParams(window.location.search);
                for (const [v, L] of g) k.includes(v.toLowerCase()) && (f[v] = L);
                return Object.assign(f, m)
            }

            s(d, "extendBaseContext");

            function b(m) {
                R == null || R.sendPageView(d(m))
            }

            s(b, "sendPageView");

            function h(m, f) {
                var p, g;
                const v = (g = (p = document.head) == null ? void 0 : p.querySelector('meta[name="current-catalog-service"]')) == null ? void 0 : g.content,
                    L = v ? {service: v} : {};
                for (const [P, E] of Object.entries(f)) E != null && (L[P] = `${E}`);
                R == null || R.sendEvent(m || "unknown", d(L))
            }

            s(h, "sendEvent")
        }, 91385: (F, I, u) => {
            "use strict";
            u.d(I, {$S: () => c, Fk: () => C, sz: () => R});
            var T = u(77552);

            function c(k, d, b) {
                const h = {
                    hydroEventPayload: k,
                    hydroEventHmac: d,
                    visitorPayload: "",
                    visitorHmac: "",
                    hydroClientContext: b
                }, m = document.querySelector("meta[name=visitor-payload]");
                m instanceof HTMLMetaElement && (h.visitorPayload = m.content);
                const f = document.querySelector("meta[name=visitor-hmac]") || "";
                f instanceof HTMLMetaElement && (h.visitorHmac = f.content), (0, T.b)(h, !0)
            }

            s(c, "sendData");

            function C(k) {
                const d = k.getAttribute("data-hydro-view") || "", b = k.getAttribute("data-hydro-view-hmac") || "",
                    h = k.getAttribute("data-hydro-client-context") || "";
                c(d, b, h)
            }

            s(C, "trackView");

            function R(k) {
                const d = k.getAttribute("data-hydro-click-payload") || "",
                    b = k.getAttribute("data-hydro-click-hmac") || "",
                    h = k.getAttribute("data-hydro-client-context") || "";
                c(d, b, h)
            }

            s(R, "sendHydroEvent")
        }, 86124: (F, I, u) => {
            "use strict";
            u.d(I, {vt: () => M, WF: () => E, DV: () => P, jW: () => A, Nc: () => p, $t: () => C});
            const T = {frequency: .6, recency: .4};

            function c(D, O) {
                return D.sort((K, W) => O(K) - O(W))
            }

            s(c, "sortBy");

            function C(D) {
                const O = k(D), K = d(D);
                return function (W) {
                    return R(O.get(W) || 0, K.get(W) || 0)
                }
            }

            s(C, "scorer");

            function R(D, O) {
                return D * T.frequency + O * T.recency
            }

            s(R, "score");

            function k(D) {
                const O = [...Object.values(D)].reduce((K, W) => K + W.visitCount, 0);
                return new Map(Object.keys(D).map(K => [K, D[K].visitCount / O]))
            }

            s(k, "frequencyMap");

            function d(D) {
                const O = c([...Object.keys(D)], W => D[W].lastVisitedAt), K = O.length;
                return new Map(O.map((W, U) => [W, (U + 1) / K]))
            }

            s(d, "recencyMap");
            const b = /^\/orgs\/([a-z0-9-]+)\/teams\/([\w-]+)/,
                h = [/^\/([^/]+)\/([^/]+)\/?$/, /^\/([^/]+)\/([^/]+)\/blob/, /^\/([^/]+)\/([^/]+)\/tree/, /^\/([^/]+)\/([^/]+)\/issues/, /^\/([^/]+)\/([^/]+)\/pulls?/, /^\/([^/]+)\/([^/]+)\/pulse/],
                m = [["organization", /^\/orgs\/([a-z0-9-]+)\/projects\/([0-9-]+)/], ["repository", /^\/([^/]+)\/([^/]+)\/projects\/([0-9-]+)/]],
                f = 100;

            function p(D) {
                const O = D.match(b);
                if (O) {
                    v(P(O[1], O[2]));
                    return
                }
                let K;
                for (let U = 0, ne = m.length; U < ne; U++) {
                    const [de, ce] = m[U];
                    if (K = D.match(ce), K) {
                        let we = null, fe = null;
                        switch (de) {
                            case"organization":
                                we = K[1], fe = K[2];
                                break;
                            case"repository":
                                we = `${K[1]}/${K[2]}`, fe = K[3];
                                break;
                            default:
                        }
                        we && fe && v(M(we, fe));
                        return
                    }
                }
                let W;
                for (let U = 0, ne = h.length; U < ne; U++) if (W = D.match(h[U]), W) {
                    v(E(W[1], W[2]));
                    return
                }
            }

            s(p, "logPageView");

            function g(D) {
                const O = Object.keys(D);
                if (O.length <= f) return D;
                const K = C(D), W = O.sort((U, ne) => K(ne) - K(U)).slice(0, f / 2);
                return Object.fromEntries(W.map(U => [U, D[U]]))
            }

            s(g, "limitedPageViews");

            function v(D) {
                const O = A(), K = L(), W = O[D] || {lastVisitedAt: K, visitCount: 0};
                W.visitCount += 1, W.lastVisitedAt = K, O[D] = W, _(g(O))
            }

            s(v, "logPageViewByKey");

            function L() {
                return Math.floor(Date.now() / 1e3)
            }

            s(L, "currentEpochTimeInSeconds");

            function P(D, O) {
                return `team:${D}/${O}`
            }

            s(P, "buildTeamKey");

            function E(D, O) {
                return `repository:${D}/${O}`
            }

            s(E, "buildRepositoryKey");

            function M(D, O) {
                return `project:${D}/${O}`
            }

            s(M, "buildProjectKey");
            const x = /^(team|repository|project):[^/]+\/[^/]+(\/([^/]+))?$/, j = "jump_to:page_views";

            function _(D) {
                N(j, JSON.stringify(D))
            }

            s(_, "setPageViewsMap");

            function A() {
                const D = X(j);
                if (!D) return {};
                let O;
                try {
                    O = JSON.parse(D)
                } catch {
                    return _({}), {}
                }
                const K = {};
                for (const W in O) W.match(x) && (K[W] = O[W]);
                return K
            }

            s(A, "getPageViewsMap");

            function N(D, O) {
                try {
                    window.localStorage.setItem(D, O)
                } catch {
                }
            }

            s(N, "setItem");

            function X(D) {
                try {
                    return window.localStorage.getItem(D)
                } catch {
                    return null
                }
            }

            s(X, "getItem")
        }, 12451: (F, I, u) => {
            "use strict";
            u.d(I, {a: () => T});

            function T(k, d) {
                const b = k.closest("[data-notification-id]");
                d.hasAttribute("data-status") && c(b, d.getAttribute("data-status")), d.hasAttribute("data-subscription-status") && C(b, d.getAttribute("data-subscription-status")), d.hasAttribute("data-starred-status") && R(b, d.getAttribute("data-starred-status"))
            }

            s(T, "updateNotificationStates");

            function c(k, d) {
                k.classList.toggle("notification-archived", d === "archived"), k.classList.toggle("notification-unread", d === "unread"), k.classList.toggle("notification-read", d === "read")
            }

            s(c, "toggleNotificationStatus");

            function C(k, d) {
                k.classList.toggle("notification-unsubscribed", d === "unsubscribed")
            }

            s(C, "toggleNotificationSubscriptionStatus");

            function R(k, d) {
                k.classList.toggle("notification-starred", d === "starred")
            }

            s(R, "toggleNotificationStarredStatus")
        }, 66703: (F, I, u) => {
            "use strict";
            u.d(I, {v: () => T});

            function T(c, C) {
                C.appendChild(c.extractContents()), c.insertNode(C)
            }

            s(T, "surroundContents")
        }, 14982: (F, I, u) => {
            "use strict";
            u.d(I, {e: () => T});

            function T(c) {
                const C = c || window.location,
                    R = document.head && document.head.querySelector("meta[name=session-resume-id]");
                return R instanceof HTMLMetaElement && R.content || C.pathname
            }

            s(T, "getPageID")
        }, 92929: (F, I, u) => {
            "use strict";
            u.d(I, {Z: () => f});
            var T = u(7732), c = u(66963), C = u(65935), R = u(66791);
            let k = !1;

            function d(p) {
                const g = new URL(p, window.location.origin), v = new URLSearchParams(g.search.slice(1));
                return v.set("webauthn-support", (0, R.T)()), g.search = v.toString(), g.toString()
            }

            s(d, "urlWithParams");

            async function b() {
                const p = document.querySelector("link[rel=sudo-modal]"), g = document.querySelector(".js-sudo-prompt");
                if (g instanceof HTMLTemplateElement) return g;
                if (p) {
                    const v = await (0, c.a)(document, d(p.href));
                    return document.body.appendChild(v), document.querySelector(".js-sudo-prompt")
                } else throw new Error("couldn't load sudo prompt")
            }

            s(b, "loadPromptTemplate");
            let h = !1;

            async function m() {
                if (k) return !1;
                k = !0, h = !1;
                const g = (await b()).content.cloneNode(!0), v = await (0, T.W)({content: g});
                return await new Promise(L => {
                    v.addEventListener("dialog:remove", function () {
                        k = !1, L()
                    }, {once: !0})
                }), h
            }

            s(m, "sudoPrompt"), (0, C.AC)(".js-sudo-form", async function (p, g) {
                try {
                    await g.text()
                } catch (v) {
                    if (!v.response) throw v;
                    let L;
                    switch (v.response.status) {
                        case 401:
                            L = "Incorrect password.";
                            break;
                        case 429:
                            L = "Too many password attempts. Please wait and try again later.";
                            break;
                        default:
                            L = "Failed to receive a response. Please try again later."
                    }
                    p.querySelector(".js-sudo-error").textContent = L, p.querySelector(".js-sudo-error").hidden = !1, p.querySelector(".js-sudo-password").value = "";
                    return
                }
                h = !0, p.closest("details").removeAttribute("open")
            });

            async function f() {
                const p = await fetch("/sessions/in_sudo", {
                    headers: {
                        accept: "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                });
                return p.ok && await p.text() === "true" ? !0 : m()
            }

            s(f, "triggerSudoPrompt")
        }, 50320: (F, I, u) => {
            "use strict";
            u.d(I, {Om: () => R, lp: () => c, rq: () => T, t4: () => C, yb: () => d});

            function T(b) {
                const h = "\u200D", m = b.split(h);
                let f = 0;
                for (const p of m) f += Array.from(p.split(/[\ufe00-\ufe0f]/).join("")).length;
                return f / m.length
            }

            s(T, "getUtf8StringLength");

            function c(b, h, m) {
                let f = b.value.substring(0, b.selectionEnd || 0), p = b.value.substring(b.selectionEnd || 0);
                return f = f.replace(h, m), p = p.replace(h, m), k(b, f + p, f.length), m
            }

            s(c, "replaceText");

            function C(b, h, m) {
                if (b.selectionStart === null || b.selectionEnd === null) return c(b, h, m);
                const f = b.value.substring(0, b.selectionStart), p = b.value.substring(b.selectionEnd);
                return k(b, f + m + p, f.length), m
            }

            s(C, "replaceSelection");

            function R(b, h, m = {}) {
                const f = b.selectionEnd || 0, p = b.value.substring(0, f), g = b.value.substring(f),
                    v = b.value === "" || p.match(/\n$/) ? "" : `
`, L = m.appendNewline ? `
` : "", P = v + h + L;
                b.value = p + P + g;
                const E = f + P.length;
                return b.selectionStart = E, b.selectionEnd = E, b.dispatchEvent(new CustomEvent("change", {
                    bubbles: !0,
                    cancelable: !1
                })), b.focus(), P
            }

            s(R, "insertText");

            function k(b, h, m) {
                b.value = h, b.selectionStart = m, b.selectionEnd = m, b.dispatchEvent(new CustomEvent("change", {
                    bubbles: !0,
                    cancelable: !1
                }))
            }

            s(k, "setTextareaValueAndCursor");

            function d(b, h) {
                const m = [...b], f = new TextEncoder, p = new Uint8Array(4);
                for (let g = 0; g < m.length; g++) {
                    const v = m[g], {written: L, read: P} = f.encodeInto(v, p);
                    if (!L || !P) return -1;
                    const E = L - P;
                    if (E !== 0 && (g < h && (h -= E), g >= h)) break
                }
                return h
            }

            s(d, "GetCharIndexFromBytePosition")
        }, 10174: (F, I, u) => {
            "use strict";
            u.d(I, {dY: () => h, iU: () => b, oq: () => d});
            const T = new WeakMap;

            function c(m) {
                const f = T.get(m);
                !f || (f.timer != null && clearTimeout(f.timer), f.timer = window.setTimeout(() => {
                    f.timer != null && (f.timer = null), f.inputed = !1, f.listener.call(null, m)
                }, f.wait))
            }

            s(c, "schedule");

            function C(m) {
                const f = m.currentTarget, p = T.get(f);
                !p || (p.keypressed = !0, p.timer != null && clearTimeout(p.timer))
            }

            s(C, "onKeydownInput");

            function R(m) {
                const f = m.currentTarget, p = T.get(f);
                !p || (p.keypressed = !1, p.inputed && c(f))
            }

            s(R, "onKeyupInput");

            function k(m) {
                const f = m.currentTarget, p = T.get(f);
                !p || (p.inputed = !0, p.keypressed || c(f))
            }

            s(k, "onInputInput");

            function d(m, f, p = {wait: null}) {
                T.set(m, {
                    keypressed: !1,
                    inputed: !1,
                    timer: void 0,
                    listener: f,
                    wait: p.wait != null ? p.wait : 100
                }), m.addEventListener("keydown", C), m.addEventListener("keyup", R), m.addEventListener("input", k)
            }

            s(d, "addThrottledInputEventListener");

            function b(m, f) {
                m.removeEventListener("keydown", C), m.removeEventListener("keyup", R), m.removeEventListener("input", k);
                const p = T.get(m);
                p && (p.timer != null && p.listener === f && clearTimeout(p.timer), T.delete(m))
            }

            s(b, "removeThrottledInputEventListener");

            function h(m) {
                const f = T.get(m);
                f && f.listener.call(null, m)
            }

            s(h, "dispatchThrottledInputEvent")
        }, 75343: (F, I, u) => {
            "use strict";
            u.d(I, {Z: () => c});

            function T(C) {
                return C.offsetWidth <= 0 && C.offsetHeight <= 0
            }

            s(T, "hidden");

            function c(C) {
                return !T(C)
            }

            s(c, "visible")
        }, 66791: (F, I, u) => {
            "use strict";
            u.d(I, {T: () => c, k: () => C});
            var T = u(70112);

            function c() {
                return (0, T.Zh)() ? "supported" : "unsupported"
            }

            s(c, "webauthnSupportLevel");

            async function C() {
                var R;
                return await ((R = window.PublicKeyCredential) == null ? void 0 : R.isUserVerifyingPlatformAuthenticatorAvailable()) ? "supported" : "unsupported"
            }

            s(C, "iuvpaaSupportLevel")
        }
    }, F => {
        var I = s(T => F(F.s = T), "__webpack_exec__");
        F.O(0, ["vendors-node_modules_selector-observer_dist_index_esm_js", "vendors-node_modules_delegated-events_dist_index_js-node_modules_github_details-dialog-elemen-63debe", "vendors-node_modules_lit-html_lit-html_js", "vendors-node_modules_github_remote-form_dist_index_js-node_modules_github_catalyst_lib_index_-87b1b3", "vendors-node_modules_github_mini-throttle_dist_index_js-node_modules_github_hotkey_dist_index-9f48bd", "vendors-node_modules_github_filter-input-element_dist_index_js-node_modules_github_remote-inp-c7e9ed", "vendors-node_modules_github_paste-markdown_dist_index_esm_js-node_modules_github_quote-select-df2537", "app_assets_modules_github_behaviors_pjax_ts", "app_assets_modules_github_behaviors_keyboard-shortcuts-helper_ts-app_assets_modules_github_be-af52ef", "app_assets_modules_github_behaviors_details_ts-app_assets_modules_github_behaviors_include-fr-a5a4c7"], () => I(92476));
        var u = F.O()
    }]);
})();

//# sourceMappingURL=behaviors-734d4d1c1db1.js.map