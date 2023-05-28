"use strict";
(() => {
    var x = Object.defineProperty;
    var u = (_, L) => x(_, "name", {value: L, configurable: !0});
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([["notifications-global"], {
        63621: (_, L, g) => {
            g.d(L, {H: () => f, v: () => y});
            var s = g(59753);

            function y() {
                const l = document.getElementById("ajax-error-message");
                l && (l.hidden = !1)
            }

            u(y, "showGlobalError");

            function f() {
                const l = document.getElementById("ajax-error-message");
                l && (l.hidden = !0)
            }

            u(f, "hideGlobalError"), (0, s.on)("deprecatedAjaxError", "[data-remote]", function (l) {
                const b = l.detail, {error: A, text: D} = b;
                l.currentTarget === l.target && (A === "abort" || A === "canceled" || (/<html/.test(D) ? (y(), l.stopImmediatePropagation()) : setTimeout(function () {
                    l.defaultPrevented || y()
                }, 0)))
            }), (0, s.on)("deprecatedAjaxSend", "[data-remote]", function () {
                f()
            }), (0, s.on)("click", ".js-ajax-error-dismiss", function () {
                f()
            })
        }, 57654: (_, L, g) => {
            g.d(L, {Bt: () => b, DN: () => w, KL: () => p, Se: () => D, qC: () => k, sw: () => I});
            var s = g(59753), y = g(2077), f = g(63621);
            (0, s.on)("click", ".js-remote-submit-button", async function (a) {
                const h = a.currentTarget.form;
                a.preventDefault();
                let v;
                try {
                    v = await fetch(h.action, {
                        method: h.method,
                        body: new FormData(h),
                        headers: {Accept: "application/json", "X-Requested-With": "XMLHttpRequest"}
                    })
                } catch {
                }
                v && !v.ok && (0, f.v)()
            });

            function l(a, n, h) {
                return a.dispatchEvent(new CustomEvent(n, {bubbles: !0, cancelable: h}))
            }

            u(l, "fire");

            function b(a, n) {
                n && (A(a, n), (0, y.j)(n)), l(a, "submit", !0) && a.submit()
            }

            u(b, "requestSubmit");

            function A(a, n) {
                if (!(a instanceof HTMLFormElement)) throw new TypeError("The specified element is not of type HTMLFormElement.");
                if (!(n instanceof HTMLElement)) throw new TypeError("The specified element is not of type HTMLElement.");
                if (n.type !== "submit") throw new TypeError("The specified element is not a submit button.");
                if (!a || a !== n.form) throw new Error("The specified element is not owned by the form element.")
            }

            u(A, "checkButtonValidity");

            function D(a, n) {
                if (typeof n == "boolean") if (a instanceof HTMLInputElement) a.checked = n; else throw new TypeError("only checkboxes can be set to boolean value"); else {
                    if (a.type === "checkbox") throw new TypeError("checkbox can't be set to string value");
                    a.value = n
                }
                l(a, "change", !1)
            }

            u(D, "changeValue");

            function w(a, n) {
                for (const h in n) {
                    const v = n[h], C = a.elements.namedItem(h);
                    (C instanceof HTMLInputElement || C instanceof HTMLTextAreaElement) && (C.value = v)
                }
            }

            u(w, "fillFormValues");

            function I(a) {
                if (!(a instanceof HTMLElement)) return !1;
                const n = a.nodeName.toLowerCase(), h = (a.getAttribute("type") || "").toLowerCase();
                return n === "select" || n === "textarea" || n === "input" && h !== "submit" && h !== "reset" || a.isContentEditable
            }

            u(I, "isFormField");

            function c(a) {
                return new URLSearchParams(a)
            }

            u(c, "searchParamsFromFormData");

            function p(a, n) {
                const h = new URLSearchParams(a.search), v = c(n);
                for (const [C, T] of v) h.append(C, T);
                return h.toString()
            }

            u(p, "combineGetFormSearchParams");

            function k(a) {
                return c(new FormData(a)).toString()
            }

            u(k, "serialize")
        }, 2077: (_, L, g) => {
            g.d(L, {j: () => s, u: () => y});

            function s(f) {
                const l = f.closest("form");
                if (!(l instanceof HTMLFormElement)) return;
                let b = y(l);
                if (f.name) {
                    const A = f.matches("input[type=submit]") ? "Submit" : "", D = f.value || A;
                    b || (b = document.createElement("input"), b.type = "hidden", b.classList.add("is-submit-button-value"), l.prepend(b)), b.name = f.name, b.value = D
                } else b && b.remove()
            }

            u(s, "persistSubmitButtonValue");

            function y(f) {
                const l = f.querySelector("input.is-submit-button-value");
                return l instanceof HTMLInputElement ? l : null
            }

            u(y, "findPersistedSubmitButtonValue")
        }, 79157: (_, L, g) => {
            var s = g(90420), y = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = u((e, t, r, i) => {
                for (var o = i > 1 ? void 0 : i ? f(t, r) : t, d = e.length - 1, m; d >= 0; d--) (m = e[d]) && (o = (i ? m(t, r, o) : m(o)) || o);
                return i && o && y(t, r, o), o
            }, "__decorateClass");
            let b = u(class extends HTMLElement {
                constructor() {
                    super();
                    this.addEventListener("socket:message", this.update.bind(this))
                }

                update(e) {
                    const t = e.detail.data;
                    !this.link || !this.modifier || (this.link.setAttribute("aria-label", t.aria_label), this.link.setAttribute("data-ga-click", t.ga_click), this.modifier.setAttribute("class", t.span_class))
                }
            }, "NotificationIndicatorElement");
            l([s.fA], b.prototype, "link", 2), l([s.fA], b.prototype, "modifier", 2), b = l([s.Ih], b);
            var A = g(63621), D = g(57654), w = Object.defineProperty, I = Object.getOwnPropertyDescriptor,
                c = u((e, t, r, i) => {
                    for (var o = i > 1 ? void 0 : i ? I(t, r) : t, d = e.length - 1, m; d >= 0; d--) (m = e[d]) && (o = (i ? m(t, r, o) : m(o)) || o);
                    return i && o && w(t, r, o), o
                }, "notifications_list_subscription_form_element_decorateClass");
            let p = u(class extends HTMLElement {
                constructor() {
                    super(...arguments);
                    this.lastAppliedLabels = {}
                }

                connectedCallback() {
                    const e = this.querySelector(".js-label-subscriptions-load");
                    e == null || e.addEventListener("loadend", () => {
                        this.subscriptionsLabels.length > 0 && (this.updateCheckedState("custom"), this.updateMenuButtonCopy("custom"))
                    })
                }

                async submitCustomForm(e) {
                    await this.submitForm(e), this.closeMenu()
                }

                async submitForm(e) {
                    e.preventDefault(), (0, A.H)();
                    const t = e.currentTarget, r = new FormData(t), i = await self.fetch(t.action, {
                        method: t.method,
                        body: r,
                        headers: {"X-Requested-With": "XMLHttpRequest", Accept: "application/json"}
                    });
                    if (!i.ok) {
                        (0, A.v)();
                        return
                    }
                    const o = await i.json(), d = r.get("do");
                    typeof d == "string" && this.updateCheckedState(d), typeof d == "string" && this.updateMenuButtonCopy(d), this.updateSocialCount(o.count), this.applyInputsCheckedPropertiesToAttributesForNextFormReset()
                }

                updateMenuButtonCopy(e) {
                    this.unwatchButtonCopy.hidden = !(e === "subscribed" || e === "custom"), this.stopIgnoringButtonCopy.hidden = e !== "ignore", this.watchButtonCopy.hidden = !(e !== "subscribed" && e !== "custom" && e !== "ignore")
                }

                applyInputsCheckedPropertiesToAttributesForNextFormReset() {
                    for (const e of [...this.threadTypeCheckboxes]) e.toggleAttribute("checked", e.checked)
                }

                updateCheckedState(e) {
                    for (const t of this.subscriptionButtons) t.setAttribute("aria-checked", t.value === e ? "true" : "false");
                    if (e === "custom") this.customButton.setAttribute("aria-checked", "true"); else {
                        this.customButton.setAttribute("aria-checked", "false");
                        for (const t of [...this.threadTypeCheckboxes]) (0, D.Se)(t, !1);
                        if (this.subscriptionsContainer !== void 0) {
                            for (let t = 0; t < this.subscriptionsLabels.length; t++) this.subscriptionsLabels[t].remove();
                            this.subscriptionsSubtitle !== void 0 && this.subscriptionsSubtitle.toggleAttribute("hidden", !1), this.subscriptionsContainer.innerHTML = ""
                        }
                    }
                }

                updateSocialCount(e) {
                    this.socialCount && (this.socialCount.textContent = e, this.socialCount.setAttribute("aria-label", `${this.pluralizeUsers(e)} watching this repository`))
                }

                pluralizeUsers(e) {
                    return parseInt(e) === 1 ? "1 user is" : `${e} users are`
                }

                handleDialogLabelToggle(e) {
                    const t = e.detail.wasChecked, r = e.detail.toggledLabelId, i = e.detail.templateLabelElementClone;
                    if (t) {
                        for (let o = 0; o < this.subscriptionsLabels.length; o++) if (this.subscriptionsLabels[o].getAttribute("data-label-id") === r) {
                            this.subscriptionsLabels[o].remove();
                            break
                        }
                    } else i.removeAttribute("hidden"), i.setAttribute("data-targets", "notifications-list-subscription-form.subscriptionsLabels"), this.subscriptionsContainer.appendChild(i)
                }

                openCustomDialog(e) {
                    e.preventDefault(), e.stopPropagation(), this.menu.toggleAttribute("hidden", !0), this.enableApplyButtonAndCheckbox(), this.saveCurrentLabelsState(), this.customDialog.toggleAttribute("hidden", !1), setTimeout(() => {
                        var t;
                        (t = this.customDialog.querySelector("input[type=checkbox][autofocus]")) == null || t.focus()
                    }, 0)
                }

                enableApplyButtonAndCheckbox() {
                    this.customDialog.querySelectorAll('[data-type="label"]:not([hidden])').length > 0 && (this.customSubmit.removeAttribute("disabled"), this.threadTypeCheckboxes[0].checked = !0)
                }

                closeCustomDialog(e) {
                    e.preventDefault(), e.stopPropagation(), this.menu.toggleAttribute("hidden", !1), this.customDialog.toggleAttribute("hidden", !0), setTimeout(() => {
                        this.customButton.focus()
                    }, 0)
                }

                resetFilterLabelsDialog(e) {
                    e.preventDefault(), e.stopPropagation();
                    for (let t = 0; t < this.subscriptionsLabels.length; t++) {
                        const r = this.subscriptionsLabels[t].getAttribute("data-label-id");
                        for (let i = 0; i < this.dialogLabelItems.length; i++) if (this.dialogLabelItems[i].labelId === r) {
                            this.dialogLabelItems[i].setCheckedForDropdownLabel(!1);
                            break
                        }
                    }
                    for (let t = 0; t < Object.keys(this.lastAppliedLabels).length; t++) {
                        const r = Object.keys(this.lastAppliedLabels)[t];
                        for (let i = 0; i < this.dialogLabelItems.length; i++) if (this.dialogLabelItems[i].labelId === r) {
                            this.dialogLabelItems[i].setCheckedForDropdownLabel(!0);
                            break
                        }
                    }
                    this.subscriptionsContainer.replaceChildren(...Object.values(this.lastAppliedLabels)), this.closeFilterLabelsDialog(e)
                }

                openFilterLabelsDialog(e) {
                    e.preventDefault(), e.stopPropagation(), this.saveCurrentLabelsState(), this.customDialog.toggleAttribute("hidden", !0), this.filterLabelsDialog.toggleAttribute("hidden", !1), setTimeout(() => {
                        var t;
                        (t = this.filterLabelsDialog.querySelector("input[type=checkbox][autofocus]")) == null || t.focus()
                    }, 0)
                }

                closeFilterLabelsDialog(e) {
                    e.preventDefault(), e.stopPropagation(), this.menu.toggleAttribute("hidden", !0), this.customDialog.toggleAttribute("hidden", !1), this.filterLabelsDialog.toggleAttribute("hidden", !0)
                }

                applyFilterLabelsDialog(e) {
                    e.preventDefault(), e.stopPropagation(), this.saveCurrentLabelsState(), this.hideFilterSubtitle(), this.enableIssuesCheckbox(), this.closeFilterLabelsDialog(e)
                }

                enableIssuesCheckbox() {
                    const e = Object.keys(this.lastAppliedLabels).length > 0;
                    e && this.threadTypeCheckboxes.length > 0 && (this.threadTypeCheckboxes[0].checked = e), this.threadTypeCheckboxesUpdated()
                }

                hideFilterSubtitle() {
                    const e = Object.keys(this.lastAppliedLabels).length > 0;
                    this.subscriptionsSubtitle.toggleAttribute("hidden", e)
                }

                saveCurrentLabelsState() {
                    this.lastAppliedLabels = {}, this.labelInputs.innerHTML = "";
                    for (let e = 0; e < this.subscriptionsLabels.length; e++) {
                        const t = this.subscriptionsLabels[e].getAttribute("data-label-id");
                        t && (this.lastAppliedLabels[t] = this.subscriptionsLabels[e].cloneNode(!0), this.appendLabelToFormInput(t))
                    }
                }

                appendLabelToFormInput(e) {
                    const t = document.createElement("input");
                    t.setAttribute("type", "hidden"), t.setAttribute("name", "labels[]"), t.setAttribute("value", e), this.labelInputs.appendChild(t)
                }

                detailsToggled() {
                    this.menu.toggleAttribute("hidden", !1), this.customDialog.toggleAttribute("hidden", !0)
                }

                submitCustom(e) {
                    e.preventDefault(), this.details.toggleAttribute("open", !1)
                }

                threadTypeCheckboxesUpdated() {
                    const e = !this.threadTypeCheckboxes.some(t => t.checked);
                    this.customSubmit.disabled = e
                }

                closeMenu() {
                    this.details.toggleAttribute("open", !1)
                }
            }, "NotificationsListSubscriptionFormElement");
            c([s.fA], p.prototype, "details", 2), c([s.fA], p.prototype, "menu", 2), c([s.fA], p.prototype, "customButton", 2), c([s.fA], p.prototype, "customDialog", 2), c([s.fA], p.prototype, "filterLabelsDialog", 2), c([s.GO], p.prototype, "subscriptionButtons", 2), c([s.GO], p.prototype, "subscriptionsLabels", 2), c([s.fA], p.prototype, "labelInputs", 2), c([s.fA], p.prototype, "subscriptionsSubtitle", 2), c([s.fA], p.prototype, "socialCount", 2), c([s.fA], p.prototype, "unwatchButtonCopy", 2), c([s.fA], p.prototype, "stopIgnoringButtonCopy", 2), c([s.fA], p.prototype, "watchButtonCopy", 2), c([s.GO], p.prototype, "threadTypeCheckboxes", 2), c([s.fA], p.prototype, "customSubmit", 2), c([s.fA], p.prototype, "subscriptionsContainer", 2), c([s.GO], p.prototype, "dialogLabelItems", 2), p = c([s.Ih], p);
            var k = Object.defineProperty, a = Object.getOwnPropertyDescriptor, n = u((e, t, r, i) => {
                for (var o = i > 1 ? void 0 : i ? a(t, r) : t, d = e.length - 1, m; d >= 0; d--) (m = e[d]) && (o = (i ? m(t, r, o) : m(o)) || o);
                return i && o && k(t, r, o), o
            }, "notifications_team_subscription_form_element_decorateClass");
            let h = u(class extends HTMLElement {
                closeMenu() {
                    this.details.toggleAttribute("open", !1)
                }
            }, "NotificationsTeamSubscriptionFormElement");
            n([s.fA], h.prototype, "details", 2), h = n([s.Ih], h);
            var v = Object.defineProperty, C = Object.getOwnPropertyDescriptor, T = u((e, t, r, i) => {
                for (var o = i > 1 ? void 0 : i ? C(t, r) : t, d = e.length - 1, m; d >= 0; d--) (m = e[d]) && (o = (i ? m(t, r, o) : m(o)) || o);
                return i && o && v(t, r, o), o
            }, "notifications_subscriptions_dialog_label_item_decorateClass");
            let E = u(class extends HTMLElement {
                toggleDropdownLabel(e) {
                    if (e.preventDefault(), e.stopPropagation(), this.label) {
                        const t = this.label.getAttribute("aria-checked") === "true";
                        this.setCheckedForDropdownLabel(!t), this.dispatchEvent(new CustomEvent("notifications-dialog-label-toggled", {
                            detail: {
                                wasChecked: t,
                                toggledLabelId: this.labelId,
                                templateLabelElementClone: this.hiddenLabelTemplate.cloneNode(!0)
                            }, bubbles: !0
                        }))
                    }
                }

                setCheckedForDropdownLabel(e) {
                    this.label.setAttribute("aria-checked", e.toString())
                }
            }, "NotificationsDialogLabelItemElement");
            T([s.fA], E.prototype, "label", 2), T([s.fA], E.prototype, "hiddenLabelTemplate", 2), T([s.fA], E.prototype, "hiddenCheckboxInput", 2), T([s.Lj], E.prototype, "labelId", 2), E = T([s.Ih], E)
        }
    }, _ => {
        var L = u(s => _(_.s = s), "__webpack_exec__");
        _.O(0, ["vendors-node_modules_delegated-events_dist_index_js-node_modules_github_catalyst_lib_index_js-01c6c52"], () => L(79157));
        var g = _.O()
    }]);
})();

//# sourceMappingURL=notifications-global-cf887584e3c8.js.map