var layout, layoutDesktop, login, internalTracking, campaign;
(function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
})(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) {
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
                return
            }
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"),
            i = new n.validator(t,this[0]),
            n.data(this[0], "validator", i),
            i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
                n(t.target).attr("formnovalidate") !== undefined && (i.cancelSubmit = !0)
            }),
            this.submit(function(t) {
                function r() {
                    var u, r;
                    return i.settings.submitHandler ? (i.submitButton && (u = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)),
                    r = i.settings.submitHandler.call(i, i.currentForm, t),
                    i.submitButton && u.remove(),
                    r !== undefined) ? r : !1 : !0
                }
                return (i.settings.debug && t.preventDefault(),
                i.cancelSubmit) ? (i.cancelSubmit = !1,
                r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                !1) : r() : (i.focusInvalid(),
                !1)
            })),
            i)
        },
        valid: function() {
            var t, i;
            return n(this[0]).is("form") ? t = this.validate().form() : (t = !0,
            i = n(this[0].form).validate(),
            this.each(function() {
                t = i.element(this) && t
            })),
            t
        },
        removeAttrs: function(t) {
            var i = {}
              , r = this;
            return n.each(t.split(/\s/), function(n, t) {
                i[t] = r.attr(t);
                r.removeAttr(t)
            }),
            i
        },
        rules: function(t, i) {
            var r = this[0], e, s, f, u, o, h;
            if (t) {
                e = n.data(r.form, "validator").settings;
                s = e.rules;
                f = n.validator.staticRules(r);
                switch (t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i));
                    delete f.messages;
                    s[r.name] = f;
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove":
                    return i ? (h = {},
                    n.each(i.split(/\s/), function(t, i) {
                        h[i] = f[i];
                        delete f[i];
                        i === "required" && n(r).removeAttr("aria-required")
                    }),
                    h) : (delete s[r.name],
                    f)
                }
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r),
            u.required && (o = u.required,
            delete u.required,
            u = n.extend({
                required: o
            }, u),
            n(r).attr("aria-required", "true")),
            u.remote && (o = u.remote,
            delete u.remote,
            u = n.extend(u, {
                remote: o
            })),
            u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    }
    ;
    n.validator.format = function(t, i) {
        return arguments.length === 1 ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t),
            n.validator.format.apply(this, i)
        }
         : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)),
        i.constructor !== Array && (i = [i]),
        n.each(i, function(n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}","g"), function() {
                return i
            })
        }),
        t)
    }
    ;
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass),
                this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(n, t) {
                (t.which !== 9 || this.elementValue(n) !== "") && (n.name in this.submitted || n === this.lastElement) && this.element(n)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                t.type === "radio" ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                t.type === "radio" ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var r = n.data(this[0].form, "validator")
                      , u = "on" + t.type.replace(/^validate/, "")
                      , i = r.settings;
                    i[u] && !this.is(i.ignore) && i[u].call(r, this[0], t)
                }
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var r = this.groups = {}, t;
                n.each(this.settings.groups, function(t, i) {
                    typeof i == "string" && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", i).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", i);
                this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(),
                n.extend(this.submitted, this.errorMap),
                this.invalid = n.extend({}, this.errorMap),
                this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]),
                this.showErrors(),
                this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++)
                    this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                var u = this.clean(t)
                  , i = this.validationTargetFor(u)
                  , r = !0;
                return this.lastElement = i,
                i === undefined ? delete this.invalid[u.name] : (this.prepareElement(i),
                this.currentElements = n(i),
                r = this.check(i) !== !1,
                r ? delete this.invalid[i.name] : this.invalid[i.name] = !0),
                n(t).attr("aria-invalid", !r),
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                r
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t)
                        this.errorList.push({
                            message: t[i],
                            element: this.findByName(i)[0]
                        });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null ;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var t = 0;
                for (var i in n)
                    t++;
                return t
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length === 1 && t
            },
            elements: function() {
                var t = this
                  , i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    return (!this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                    this.name in i || !t.objectLength(n(this).rules())) ? !1 : (i[this.name] = !0,
                    !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var i, u = n(t), r = t.type;
                return r === "radio" || r === "checkbox" ? n("input[name='" + t.name + "']:checked").val() : r === "number" && typeof t.validity != "undefined" ? t.validity.badInput ? !1 : u.val() : (i = u.val(),
                typeof i == "string") ? i.replace(/\r/g, "") : i
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var i = n(t).rules(), s = n.map(i, function(n, t) {
                    return t
                }).length, e = !1, h = this.elementValue(t), r, u, f;
                for (u in i) {
                    f = {
                        method: u,
                        parameters: i[u]
                    };
                    try {
                        if (r = n.validator.methods[u].call(this, h, t, f.parameters),
                        r === "dependency-mismatch" && s === 1) {
                            e = !0;
                            continue
                        }
                        if (e = !1,
                        r === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return
                        }
                        if (!r)
                            return this.formatAndAdd(t, f),
                            !1
                    } catch (o) {
                        this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + f.method + "' method.", o);
                        throw o;
                    }
                }
                if (!e)
                    return this.objectLength(i) && this.successList.push(t),
                    !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; n < arguments.length; n++)
                    if (arguments[n] !== undefined)
                        return arguments[n];
                return undefined
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || undefined, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method)
                  , u = /\$?\{(\d+)\}/g;
                typeof r == "function" ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t,
                    method: i.method
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))),
                n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++)
                    t = this.errorList[n],
                    this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass),
                    this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                this.settings.success)
                    for (n = 0; this.successList[n]; n++)
                        this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0,
                    i = this.validElements(); i[n]; n++)
                        this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var u, o, e, r = this.errorsFor(t), s = this.idOrName(t), f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", s + "-error").addClass(this.settings.errorClass).html(i || ""),
                u = r,
                this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement(u, n(t)) : u.insertAfter(t),
                r.is("label") ? r.attr("for", s) : r.parents("label[for='" + s + "']").length === 0 && (e = r.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"),
                f ? f.match(new RegExp("\\b" + e + "\\b")) || (f += " " + e) : f = e,
                n(t).attr("aria-describedby", f),
                o = this.groups[t.name],
                o && n.each(this.groups, function(t, i) {
                    i === o && n("[name='" + t + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                })));
                !i && this.settings.success && (r.text(""),
                typeof this.settings.success == "string" ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var r = this.idOrName(t)
                  , u = n(t).attr("aria-describedby")
                  , i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + u.replace(/\s+/g, ", #")),
                this.errors().filter(i)
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)),
                n(t).not(this.settings.ignore)[0]
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                case "select":
                    return n("option:selected", i).length;
                case "input":
                    if (this.checkable(i))
                        return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++,
                this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (n(this.currentForm).submit(),
                this.formSubmitted = !1) : !i && this.pendingRequest === 0 && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]),
                this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null ,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !1
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {}
              , r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }),
            i
        },
        attributeRules: function(t) {
            var u = {}, e = n(t), f = t.getAttribute("type"), r, i;
            for (r in n.validator.methods)
                r === "required" ? (i = t.getAttribute(r),
                i === "" && (i = !0),
                i = !!i) : i = e.attr(r),
                /min|max/.test(r) && (f === null  || /number|range|text/.test(f)) && (i = Number(i)),
                i || i === 0 ? u[r] = i : f === r && f !== "range" && (u[r] = !0);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength,
            u
        },
        dataRules: function(t) {
            var i, r, u = {}, f = n(t);
            for (i in n.validator.methods)
                r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()),
                r !== undefined && (u[i] = r);
            return u
        },
        staticRules: function(t) {
            var i = {}
              , r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}),
            i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) {
                    delete t[r];
                    return
                }
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                    case "string":
                        f = !!n(u.depends, i.form).length;
                        break;
                    case "function":
                        f = u.depends.call(i, i)
                    }
                    f ? t[r] = u.param !== undefined ? u.param : !0 : delete t[r]
                }
            }),
            n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }),
            n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }),
            n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : typeof t[this] == "string" && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                t[this] = [Number(i[0]), Number(i[1])]))
            }),
            n.validator.autoCreateRanges && (t.min != null  && t.max != null  && (t.range = [t.min, t.max],
            delete t.min,
            delete t.max),
            t.minlength != null  && t.maxlength != null  && (t.rangelength = [t.minlength, t.maxlength],
            delete t.minlength,
            delete t.maxlength)),
            t
        },
        normalizeRule: function(t) {
            if (typeof t == "string") {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = r !== undefined ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i))
                    return "dependency-mismatch";
                if (i.nodeName.toLowerCase() === "select") {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString())
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                if (this.optional(t))
                    return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n))
                    return !1;
                var f = 0, i = 0, u = !1, r, e;
                if (n = n.replace(/\D/g, ""),
                n.length < 13 || n.length > 19)
                    return !1;
                for (r = n.length - 1; r >= 0; r--)
                    e = n.charAt(r),
                    i = parseInt(e, 10),
                    u && (i *= 2) > 9 && (i -= 9),
                    f += i,
                    u = !u;
                return f % 10 == 0
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u <= r
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r[0] && u <= r[1]
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || n <= i
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    n(i).valid()
                }),
                t === u.val()
            },
            remote: function(t, i, r) {
                if (this.optional(i))
                    return "dependency-mismatch";
                var f = this.previousValue(i), u, e;
                return (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                f.originalMessage = this.settings.messages[i.name].remote,
                this.settings.messages[i.name].remote = f.message,
                r = typeof r == "string" && {
                    url: r
                } || r,
                f.old === t) ? f.valid : (f.old = t,
                u = this,
                this.startRequest(i),
                e = {},
                e[i.name] = t,
                n.ajax(n.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    context: u.currentForm,
                    success: function(r) {
                        var o = r === !0 || r === "true", s, e, h;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        o ? (h = u.formSubmitted,
                        u.prepareElement(i),
                        u.formSubmitted = h,
                        u.successList.push(i),
                        delete u.invalid[i.name],
                        u.showErrors()) : (s = {},
                        e = r || u.defaultMessage(i, "remote"),
                        s[i.name] = f.message = n.isFunction(e) ? e(t) : e,
                        u.invalid[i.name] = !0,
                        u.showErrors(s));
                        f.valid = o;
                        u.stopRequest(i, o)
                    }
                }, r)),
                "pending")
            }
        }
    });
    n.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    }
    ;
    var t = {}, i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        n.mode === "abort" && (t[u] && t[u].abort(),
        t[u] = r)
    }) : (i = n.ajax,
    n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode
          , u = ("port" in r ? r : n.ajaxSettings).port;
        return f === "abort" ? (t[u] && t[u].abort(),
        t[u] = i.apply(this, arguments),
        t[u]) : i.apply(this, arguments)
    }
    );
    n.extend(n.fn, {
        validateDelegate: function(t, i, r) {
            return this.bind(i, function(i) {
                var u = n(i.target);
                if (u.is(t))
                    return r.apply(u, arguments)
            })
        }
    })
}),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }
    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }
    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }
    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }
    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)),
        n
    }
    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']")
          , u = r.attr("data-valmsg-replace")
          , e = u ? n.parseJSON(u) !== !1 : null ;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(),
        t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }
    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]")
          , r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(),
        u.addClass("validation-summary-errors").removeClass("validation-summary-valid"),
        n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }
    function a(t) {
        var i = t.data("unobtrusiveContainer")
          , r = i.attr("data-valmsg-replace")
          , u = r ? n.parseJSON(r) : null ;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"),
        t.removeData("unobtrusiveContainer"),
        u && i.empty())
    }
    function v() {
        var t = n(this)
          , i = "__jquery_unobtrusive_validation_form_reset";
        if (!t.data(i)) {
            t.data(i, !0);
            try {
                t.data("validator").resetForm()
            } finally {
                t.removeData(i)
            }
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    }
    function s(t) {
        var i = n(t)
          , f = i.data(u)
          , s = n.proxy(v, t)
          , e = r.unobtrusive.options || {}
          , o = function(i, r) {
            var u = e[i];
            u && n.isFunction(u) && u.apply(t, r)
        }
        ;
        return f || (f = {
            options: {
                errorClass: e.errorClass || "input-validation-error",
                errorElement: e.errorElement || "span",
                errorPlacement: function() {
                    c.apply(t, arguments);
                    o("errorPlacement", arguments)
                },
                invalidHandler: function() {
                    l.apply(t, arguments);
                    o("invalidHandler", arguments)
                },
                messages: {},
                rules: {},
                success: function() {
                    a.apply(t, arguments);
                    o("success", arguments)
                }
            },
            attachValidation: function() {
                i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
            },
            validate: function() {
                return i.validate(),
                i.valid()
            }
        },
        i.data(u, f)),
        f
    }
    var r = n.validator, t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t), f = u.parents("form")[0], r, e, o;
            f && (r = s(f),
            r.options.rules[t.name] = e = {},
            r.options.messages[t.name] = o = {},
            n.each(this.adapters, function() {
                var i = "data-val-" + this.name
                  , r = u.attr(i)
                  , s = {};
                r !== undefined && (i += "-",
                n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }),
                this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }),
            n.extend(e, {
                __dummy__: !0
            }),
            i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t)
              , u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
            i.find("[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            });
            u.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function(n, t, i) {
        return i || (i = t,
        t = []),
        this.push({
            name: n,
            params: t,
            adapt: i
        }),
        this
    }
    ;
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    }
    ;
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min
              , e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    }
    ;
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    }
    ;
    r.addMethod("__dummy__", function() {
        return !0
    });
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n),
        r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g),
        r = r && r.length >= i),
        r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"),
    t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name)
          , u = t.params.other
          , s = o(u, r)
          , h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
            url: t.params.url,
            type: t.params.type || "GET",
            data: {}
        }
          , u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                var i = n(t.form).find(":input").filter("[name='" + f(s) + "']");
                return i.is(":checkbox") ? i.filter(":checked").val() || i.filter(":hidden").val() || "" : i.is(":radio") ? i.filter(":checked").val() || "" : i.val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery);
$.validator && (jQuery.validator.addMethod("requiretrue", function(n, t) {
    return $(t).attr("checked")
}),
jQuery.validator.unobtrusive.adapters.add("requiretrue", ["param"], function(n) {
    n.rules.requiretrue = n.params.param;
    n.messages.requiretrue = n.message
}),
jQuery.validator.addMethod("requirechecked", function(n, t) {
    return $(t).prop("checked")
}),
jQuery.validator.unobtrusive.adapters.add("requirechecked", ["param"], function(n) {
    n.rules.requirechecked = n.params.param;
    n.messages.requirechecked = n.message
}),
jQuery.validator.addMethod("requireacceptterms", function(n, t, i) {
    var r = $(t).attr("checked");
    return r ? $("#" + i).removeClass("field-validation-error") : $("#" + i).addClass("field-validation-error"),
    r
}),
jQuery.validator.unobtrusive.adapters.add("requireacceptterms", ["param"], function(n) {
    n.rules.requireacceptterms = n.params.param;
    n.messages.requireacceptterms = n.message
}),
jQuery.validator.addMethod("requiredifferent", function(n, t, i) {
    return n == i ? !1 : !0
}),
jQuery.validator.unobtrusive.adapters.add("requiredifferent", ["param"], function(n) {
    n.rules.requiredifferent = n.params.param;
    n.messages.requiredifferent = n.message
}),
$.validator.addMethod("date", function(n, t) {
    if (this.optional(t))
        return !0;
    var i = !0;
    try {
        $.datepicker.parseDate("dd/mm/yy", n)
    } catch (r) {
        i = !1
    }
    return i
}),
$.validator.addMethod("datetime", function(n, t) {
    if (this.optional(t))
        return !0;
    var i = !0;
    try {
        $.datepicker.parseDate("dd/mm/yy", n)
    } catch (r) {
        i = !1
    }
    return i
}),
jQuery.validator.addMethod("dynamicvalidate", function(n, t, i) {
    return typeof common != "undefined" ? common.ExecuteFunctionByName(i) : !0
}),
jQuery.validator.unobtrusive.adapters.add("dynamicvalidate", ["functionname"], function(n) {
    n.rules.dynamicvalidate = n.params.functionname;
    n.messages.dynamicvalidate = n.message
})),
function(n) {
    if (typeof define == "function" && define.amd)
        define(n);
    else if (typeof exports == "object")
        module.exports = n();
    else {
        var i = window.Cookies
          , t = window.Cookies = n(window.jQuery);
        t.noConflict = function() {
            return window.Cookies = i,
            t
        }
    }
}(function() {
    function n() {
        for (var n = 0, r = {}, t, i; n < arguments.length; n++) {
            t = arguments[n];
            for (i in t)
                r[i] = t[i]
        }
        return r
    }
    function t(i) {
        function r(t, u, f) {
            var o, s;
            if (arguments.length > 1) {
                f = n({
                    path: "/"
                }, r.defaults, f);
                typeof f.expires == "number" && (s = new Date,
                s.setMilliseconds(s.getMilliseconds() + f.expires * 864e5),
                f.expires = s);
                try {
                    o = JSON.stringify(u);
                    /^[\{\[]/.test(o) && (u = o)
                } catch (y) {}
                return u = encodeURIComponent(String(u)),
                u = u.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                t = encodeURIComponent(String(t)),
                t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent),
                t = t.replace(/[\(\)]/g, escape),
                document.cookie = [t, "=", u, f.expires && "; expires=" + f.expires.toUTCString(), f.path && "; path=" + f.path, f.domain && "; domain=" + f.domain, f.secure ? "; secure" : ""].join("")
            }
            t || (o = {});
            for (var l = document.cookie ? document.cookie.split("; ") : [], a = /(%[0-9A-Z]{2})+/g, h = 0; h < l.length; h++) {
                var v = l[h].split("=")
                  , c = v[0].replace(a, decodeURIComponent)
                  , e = v.slice(1).join("=");
                if (e.charAt(0) === '"' && (e = e.slice(1, -1)),
                e = i && i(e, c) || e.replace(a, decodeURIComponent),
                this.json)
                    try {
                        e = JSON.parse(e)
                    } catch (y) {}
                if (t === c) {
                    o = e;
                    break
                }
                t || (o[c] = e)
            }
            return o
        }
        return r.get = r.set = r,
        r.getJSON = function() {
            return r.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        r.defaults = {},
        r.remove = function(t, i) {
            r(t, "", n(i, {
                expires: -1
            }))
        }
        ,
        r.withConverter = t,
        r
    }
    return t()
}),
function(n, t) {
    var i = document.createElement("div").style;
    n.support.boxSizing = ("boxSizing" in i || "MozBoxSizing" in i) && (document.documentMode === t || document.documentMode > 7);
    n.fn.emPx = function() {
        for (var r = n(this).first(), u, f, i, t; r.length; ) {
            if (i = r.css("font-size") || "",
            u = i.match(/px|em|%/)[0],
            i = i.replace(/px|em|%/, "") * 1,
            u === "%")
                t = t * (i / 100);
            else if (u === "em")
                t = t * i;
            else if (u === "px")
                break;
            r = r.parent()
        }
        return console.log(f + " " + t + " " + f * t),
        f * t
    }
    ;
    n.fn.boxSizing = function() {
        var i, t, r;
        if (!n.support.boxSizing)
            return (i = this,
            t = n.Deferred(),
            n.support.boxSizing) ? (t.resolveWith(i),
            t) : (r = function(r) {
                var u = n(r), s = n.Deferred(), f = {}, o, e;
                return n.each(["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"], function(n, t) {
                    var i = u.get(0).currentStyle[t] || "";
                    i && /px/.test(i) ? i = Number(i.replace("px", "")) : i && /em/.test(i) ? i = i.replace("em", "") * u.emPx() : i && /%/.test(i) && (i = u.parent()[/width/i.test(t) ? "width" : "height"]() * (i.replace("%", "") / 100));
                    f[t] = typeof i == "number" ? i : null 
                }),
                o = u.width(),
                e = u.outerWidth(),
                f.minWidth && e < f.minWidth ? u.css("width", f.minWidth) : f.maxWidth && e > f.maxWidth ? u.css("width", f.maxWidth) : f.width && o != e && u.css("width", o - (e - o)),
                setTimeout(function() {
                    var r = u.height()
                      , n = u.outerHeight();
                    f.minHeight && n < f.minHeight ? u.css("height", f.minHeight) : f.maxHeight && n > f.maxHeight ? u.css("height", f.maxHeight) : f.height && r != n && u.css("height", r - (n - r));
                    t.notifyWith(i, u, f, {
                        width: o,
                        outerWidth: e,
                        height: r,
                        outerHeight: n,
                        final: u.css("height")
                    });
                    s.resolve();
                    u.get(0) == i.last().get(0) && t.resolveWith(i)
                }, 0),
                u.data("origStyles", {}),
                s
            }
            ,
            this.each(function() {
                if (this.nodeName != "IMG" || this.complete)
                    t.then(r(this));
                else
                    n(this).on("load", function() {
                        t.then(r(this))
                    })
            }),
            t.promise())
    }
    ;
    n.fn.boxSizing.defaults = {}
}(jQuery),
function() {
    "use strict";
    function n(n) {
        function o(o, s) {
            var rt, ut, p = o == window, c = s && s.message !== undefined ? s.message : undefined, g, k, d, tt, nt, w, b, it, ft, et, ot;
            if (s = n.extend({}, n.blockUI.defaults, s || {}),
            !s.ignoreIfBlocked || !n(o).data("blockUI.isBlocked")) {
                if (s.overlayCSS = n.extend({}, n.blockUI.defaults.overlayCSS, s.overlayCSS || {}),
                rt = n.extend({}, n.blockUI.defaults.css, s.css || {}),
                s.onOverlayClick && (s.overlayCSS.cursor = "pointer"),
                ut = n.extend({}, n.blockUI.defaults.themedCSS, s.themedCSS || {}),
                c = c === undefined ? s.message : c,
                p && t && u(window, {
                    fadeOut: 0
                }),
                c && typeof c != "string" && (c.parentNode || c.jquery) && (g = c.jquery ? c[0] : c,
                k = {},
                n(o).data("blockUI.history", k),
                k.el = g,
                k.parent = g.parentNode,
                k.display = g.style.display,
                k.position = g.style.position,
                k.parent && k.parent.removeChild(g)),
                n(o).data("blockUI.onUnblock", s.onUnblock),
                d = s.baseZ,
                tt = e || s.forceIframe ? n('<iframe class="blockUI" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + s.iframeSrc + '"><\/iframe>') : n('<div class="blockUI" style="display:none"><\/div>'),
                nt = s.theme ? n('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + d++ + ';display:none"><\/div>') : n('<div class="blockUI blockOverlay" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"><\/div>'),
                s.theme && p ? (b = '<div class="blockUI ' + s.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:fixed">',
                s.title && (b += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (s.title || "&nbsp;") + "<\/div>"),
                b += '<div class="ui-widget-content ui-dialog-content"><\/div>',
                b += "<\/div>") : s.theme ? (b = '<div class="blockUI ' + s.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:absolute">',
                s.title && (b += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (s.title || "&nbsp;") + "<\/div>"),
                b += '<div class="ui-widget-content ui-dialog-content"><\/div>',
                b += "<\/div>") : b = p ? '<div class="blockUI ' + s.blockMsgClass + ' blockPage" style="z-index:' + (d + 10) + ';display:none;position:fixed"><\/div>' : '<div class="blockUI ' + s.blockMsgClass + ' blockElement" style="z-index:' + (d + 10) + ';display:none;position:absolute"><\/div>',
                w = n(b),
                c && (s.theme ? (w.css(ut),
                w.addClass("ui-widget-content")) : w.css(rt)),
                s.theme || nt.css(s.overlayCSS),
                nt.css("position", p ? "fixed" : "absolute"),
                (e || s.forceIframe) && tt.css("opacity", 0),
                it = [tt, nt, w],
                ft = p ? n("body") : n(o),
                n.each(it, function() {
                    this.appendTo(ft)
                }),
                s.theme && s.draggable && n.fn.draggable && w.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                }),
                et = y && (!n.support.boxModel || n("object,embed", p ? null  : o).length > 0),
                a || et) {
                    if (p && s.allowBodyStretch && n.support.boxModel && n("html,body").css("height", "100%"),
                    (a || !n.support.boxModel) && !p)
                        var st = r(o, "borderTopWidth")
                          , ht = r(o, "borderLeftWidth")
                          , ct = st ? "(0 - " + st + ")" : 0
                          , lt = ht ? "(0 - " + ht + ")" : 0;
                    n.each(it, function(n, t) {
                        var i = t[0].style, r, u;
                        i.position = "absolute";
                        n < 2 ? (p ? i.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + s.quirksmodeOffsetHack + ') + "px"') : i.setExpression("height", 'this.parentNode.offsetHeight + "px"'),
                        p ? i.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : i.setExpression("width", 'this.parentNode.offsetWidth + "px"'),
                        lt && i.setExpression("left", lt),
                        ct && i.setExpression("top", ct)) : s.centerY ? (p && i.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
                        i.marginTop = 0) : !s.centerY && p && (r = s.css && s.css.top ? parseInt(s.css.top, 10) : 0,
                        u = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + r + ') + "px"',
                        i.setExpression("top", u))
                    })
                }
                if (c && (s.theme ? w.find(".ui-widget-content").append(c) : w.append(c),
                (c.jquery || c.nodeType) && n(c).show()),
                (e || s.forceIframe) && s.showOverlay && tt.show(),
                s.fadeIn) {
                    var at = s.onBlock ? s.onBlock : f
                      , vt = s.showOverlay && !c ? at : f
                      , yt = c ? at : f;
                    s.showOverlay && nt._fadeIn(s.fadeIn, vt);
                    c && w._fadeIn(s.fadeIn, yt)
                } else
                    s.showOverlay && nt.show(),
                    c && w.show(),
                    s.onBlock && s.onBlock();
                h(1, o, s);
                p ? (t = w[0],
                i = n(s.focusableElements, t),
                s.focusInput && setTimeout(l, 20)) : v(w[0], s.centerX, s.centerY);
                s.timeout && (ot = setTimeout(function() {
                    p ? n.unblockUI(s) : n(o).unblock(s)
                }, s.timeout),
                n(o).data("blockUI.timeout", ot))
            }
        }
        function u(r, u) {
            var o, c = r == window, e = n(r), l = e.data("blockUI.history"), a = e.data("blockUI.timeout"), f;
            a && (clearTimeout(a),
            e.removeData("blockUI.timeout"));
            u = n.extend({}, n.blockUI.defaults, u || {});
            h(0, r, u);
            u.onUnblock === null  && (u.onUnblock = e.data("blockUI.onUnblock"),
            e.removeData("blockUI.onUnblock"));
            f = c ? n("body").children().filter(".blockUI").add("body > .blockUI") : e.find(">.blockUI");
            u.cursorReset && (f.length > 1 && (f[1].style.cursor = u.cursorReset),
            f.length > 2 && (f[2].style.cursor = u.cursorReset));
            c && (t = i = null );
            u.fadeOut ? (o = f.length,
            f.stop().fadeOut(u.fadeOut, function() {
                --o == 0 && s(f, l, u, r)
            })) : s(f, l, u, r)
        }
        function s(t, i, r, u) {
            var f = n(u);
            if (!f.data("blockUI.isBlocked")) {
                if (t.each(function() {
                    this.parentNode && this.parentNode.removeChild(this)
                }),
                i && i.el && (i.el.style.display = i.display,
                i.el.style.position = i.position,
                i.parent && i.parent.appendChild(i.el),
                f.removeData("blockUI.history")),
                f.data("blockUI.static") && f.css("position", "static"),
                typeof r.onUnblock == "function")
                    r.onUnblock(u, r);
                var e = n(document.body)
                  , o = e.width()
                  , s = e[0].style.width;
                e.width(o - 1).width(o);
                e[0].style.width = s
            }
        }
        function h(i, r, u) {
            var f = r == window, o = n(r), e;
            (i || (!f || t) && (f || o.data("blockUI.isBlocked"))) && (o.data("blockUI.isBlocked", i),
            f && u.bindEvents && (!i || u.showOverlay)) && (e = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove",
            i ? n(document).bind(e, u, c) : n(document).unbind(e, c))
        }
        function c(r) {
            var u, f;
            if (r.type === "keydown" && r.keyCode && r.keyCode == 9 && t && r.data.constrainTabKey) {
                var e = i
                  , s = !r.shiftKey && r.target === e[e.length - 1]
                  , o = r.shiftKey && r.target === e[0];
                if (s || o)
                    return setTimeout(function() {
                        l(o)
                    }, 10),
                    !1
            }
            return (u = r.data,
            f = n(r.target),
            f.hasClass("blockOverlay") && u.onOverlayClick && u.onOverlayClick(),
            f.parents("div." + u.blockMsgClass).length > 0) ? !0 : f.parents().children().filter("div.blockUI").length === 0
        }
        function l(n) {
            if (i) {
                var t = i[n === !0 ? i.length - 1 : 0];
                t && t.focus()
            }
        }
        function v(n, t, i) {
            var u = n.parentNode
              , f = n.style
              , e = (u.offsetWidth - n.offsetWidth) / 2 - r(u, "borderLeftWidth")
              , o = (u.offsetHeight - n.offsetHeight) / 2 - r(u, "borderTopWidth");
            t && (f.left = e > 0 ? e + "px" : "0");
            i && (f.top = o > 0 ? o + "px" : "0")
        }
        function r(t, i) {
            return parseInt(n.css(t, i), 10) || 0
        }
        var t, i;
        n.fn._fadeIn = n.fn.fadeIn;
        var f = n.noop || function() {}
          , e = /MSIE/.test(navigator.userAgent)
          , a = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent)
          , p = document.documentMode || 0
          , y = n.isFunction(document.createElement("div").style.setExpression);
        n.blockUI = function(n) {
            o(window, n)
        }
        ;
        n.unblockUI = function(n) {
            u(window, n)
        }
        ;
        n.growlUI = function(t, i, r, u) {
            var f = n('<div class="growlUI"><\/div>'), e, o;
            t && f.append("<h1>" + t + "<\/h1>");
            i && f.append("<h2>" + i + "<\/h2>");
            r === undefined && (r = 3e3);
            e = function(t) {
                t = t || {};
                n.blockUI({
                    message: f,
                    fadeIn: typeof t.fadeIn != "undefined" ? t.fadeIn : 700,
                    fadeOut: typeof t.fadeOut != "undefined" ? t.fadeOut : 1e3,
                    timeout: typeof t.timeout != "undefined" ? t.timeout : r,
                    centerY: !1,
                    showOverlay: !1,
                    onUnblock: u,
                    css: n.blockUI.defaults.growlCSS
                })
            }
            ;
            e();
            o = f.css("opacity");
            f.mouseover(function() {
                e({
                    fadeIn: 0,
                    timeout: 3e4
                });
                var t = n(".blockMsg");
                t.stop();
                t.fadeTo(300, 1)
            }).mouseout(function() {
                n(".blockMsg").fadeOut(1e3)
            })
        }
        ;
        n.fn.block = function(t) {
            if (this[0] === window)
                return n.blockUI(t),
                this;
            var i = n.extend({}, n.blockUI.defaults, t || {});
            return this.each(function() {
                var t = n(this);
                i.ignoreIfBlocked && t.data("blockUI.isBlocked") || t.unblock({
                    fadeOut: 0
                })
            }),
            this.each(function() {
                n.css(this, "position") == "static" && (this.style.position = "relative",
                n(this).data("blockUI.static", !0));
                this.style.zoom = 1;
                o(this, t)
            })
        }
        ;
        n.fn.unblock = function(t) {
            return this[0] === window ? (n.unblockUI(t),
            this) : this.each(function() {
                u(this, t)
            })
        }
        ;
        n.blockUI.version = 2.65;
        n.blockUI.defaults = {
            message: "<h1>Please wait...<\/h1>",
            title: null ,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: .6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: .6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null ,
            onUnblock: null ,
            onOverlayClick: null ,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        };
        t = null ;
        i = []
    }
    typeof define == "function" && define.amd && define.amd.jQuery ? define(["jquery"], n) : n(jQuery)
}(),
function(n) {
    var t = {}
      , r = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null ,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null ,
        buildPager: null ,
        pagerCustom: null ,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null ,
        prevSelector: null ,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null ,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    n.fn.bxSlider = function(u) {
        var f, e;
        if (this.length == 0)
            return this;
        if (this.length > 1)
            return this.each(function() {
                n(this).bxSlider(u)
            }),
            this;
        f = {};
        e = this;
        t.el = this;
        var w = n(window).width()
          , b = n(window).height()
          , k = function() {
            f.settings = n.extend({}, r, u);
            f.settings.slideWidth = parseInt(f.settings.slideWidth);
            f.children = e.children(f.settings.slideSelector);
            f.children.length < f.settings.minSlides && (f.settings.minSlides = f.children.length);
            f.children.length < f.settings.maxSlides && (f.settings.maxSlides = f.children.length);
            f.settings.randomStart && (f.settings.startSlide = Math.floor(Math.random() * f.children.length));
            f.active = {
                index: f.settings.startSlide
            };
            f.carousel = f.settings.minSlides > 1 || f.settings.maxSlides > 1;
            f.carousel && (f.settings.preloadImages = "all");
            f.minThreshold = f.settings.minSlides * f.settings.slideWidth + (f.settings.minSlides - 1) * f.settings.slideMargin;
            f.maxThreshold = f.settings.maxSlides * f.settings.slideWidth + (f.settings.maxSlides - 1) * f.settings.slideMargin;
            f.working = !1;
            f.controls = {};
            f.interval = null ;
            f.animProp = f.settings.mode == "vertical" ? "top" : "left";
            f.usingCSS = f.settings.useCSS && f.settings.mode != "fade" && function() {
                var i = document.createElement("div")
                  , n = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var t in n)
                    if (i.style[n[t]] !== undefined)
                        return f.cssPrefix = n[t].replace("Perspective", "").toLowerCase(),
                        f.animProp = "-" + f.cssPrefix + "-transform",
                        !0;
                return !1
            }();
            f.settings.mode == "vertical" && (f.settings.maxSlides = f.settings.minSlides);
            e.data("origStyle", e.attr("style"));
            e.children(f.settings.slideSelector).each(function() {
                n(this).data("origStyle", n(this).attr("style"))
            });
            ft()
        }
          , ft = function() {
            var i, t;
            e.wrap('<div class="' + f.settings.wrapperClass + '"><div class="bx-viewport"><\/div><\/div>');
            f.viewport = e.parent();
            f.loader = n('<div class="bx-loading" />');
            f.viewport.prepend(f.loader);
            e.css({
                width: f.settings.mode == "horizontal" ? f.children.length * 100 + 215 + "%" : "auto",
                position: "relative"
            });
            f.usingCSS && f.settings.easing ? e.css("-" + f.cssPrefix + "-transition-timing-function", f.settings.easing) : f.settings.easing || (f.settings.easing = "swing");
            i = h();
            f.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            });
            f.viewport.parent().css({
                maxWidth: st()
            });
            f.settings.pager || f.viewport.parent().css({
                margin: "0 auto 0px"
            });
            f.children.css({
                float: f.settings.mode == "horizontal" ? "left" : "none",
                listStyle: "none",
                position: "relative"
            });
            f.children.css("width", d());
            f.settings.mode == "horizontal" && f.settings.slideMargin > 0 && f.children.css("marginRight", f.settings.slideMargin);
            f.settings.mode == "vertical" && f.settings.slideMargin > 0 && f.children.css("marginBottom", f.settings.slideMargin);
            f.settings.mode == "fade" && (f.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }),
            f.children.eq(f.settings.startSlide).css({
                zIndex: f.settings.slideZIndex,
                display: "block"
            }));
            f.controls.el = n('<div class="bx-controls" />');
            f.settings.captions && at();
            f.active.last = f.settings.startSlide == o() - 1;
            f.settings.video && e.fitVids();
            t = f.children.eq(f.settings.startSlide);
            f.settings.preloadImages == "all" && (t = f.children);
            f.settings.ticker ? f.settings.pager = !1 : (f.settings.pager && ht(),
            f.settings.controls && ct(),
            f.settings.auto && f.settings.autoControls && lt(),
            (f.settings.controls || f.settings.autoControls || f.settings.pager) && f.viewport.after(f.controls.el));
            et(t, ot)
        }
          , et = function(t, i) {
            var r = t.find("img, iframe").length, u;
            if (r == 0) {
                i();
                return
            }
            u = 0;
            t.find("img, iframe").each(function() {
                n(this).one("load", function() {
                    ++u == r && i()
                }).each(function() {
                    this.complete && n(this).load()
                })
            });
            setTimeout(function() {
                u != r && i()
            }, 5e3)
        }
          , ot = function() {
            if (f.settings.infiniteLoop && f.settings.mode != "fade" && !f.settings.ticker) {
                var t = f.settings.mode == "vertical" ? f.settings.minSlides : f.settings.maxSlides
                  , i = f.children.slice(0, t).clone().addClass("bx-clone")
                  , r = f.children.slice(-t).clone().addClass("bx-clone");
                e.append(i).prepend(r)
            }
            f.loader.remove();
            g();
            f.settings.mode == "vertical" && (f.settings.adaptiveHeight = !0);
            f.viewport.height(l());
            e.redrawSlider();
            f.settings.onSliderLoad(f.active.index);
            f.initialized = !0;
            f.settings.responsive && n(window).bind("resize", ut);
            f.settings.auto && f.settings.autoStart && (o() > 1 || f.settings.autoSlideForOnePage) && kt();
            f.settings.ticker && dt();
            f.settings.pager && v(f.settings.startSlide);
            f.settings.controls && tt();
            f.settings.touchEnabled && !f.settings.ticker && gt()
        }
          , l = function() {
            var r = 0, t = n(), u;
            if (f.settings.mode == "vertical" || f.settings.adaptiveHeight)
                if (f.carousel)
                    for (u = f.settings.moveSlides == 1 ? f.active.index : f.active.index * c(),
                    t = f.children.eq(u),
                    i = 1; i <= f.settings.maxSlides - 1; i++)
                        t = u + i >= f.children.length ? t.add(f.children.eq(i - 1)) : t.add(f.children.eq(u + i));
                else
                    t = f.children.eq(f.active.index);
            else
                t = f.children;
            return f.settings.mode == "vertical" ? (t.each(function() {
                r += n(this).outerHeight()
            }),
            f.settings.slideMargin > 0 && (r += f.settings.slideMargin * (f.settings.minSlides - 1))) : r = Math.max.apply(Math, t.map(function() {
                return n(this).outerHeight(!1)
            }).get()),
            f.viewport.css("box-sizing") == "border-box" ? r += parseFloat(f.viewport.css("padding-top")) + parseFloat(f.viewport.css("padding-bottom")) + parseFloat(f.viewport.css("border-top-width")) + parseFloat(f.viewport.css("border-bottom-width")) : f.viewport.css("box-sizing") == "padding-box" && (r += parseFloat(f.viewport.css("padding-top")) + parseFloat(f.viewport.css("padding-bottom"))),
            r
        }
          , st = function() {
            var n = "100%";
            return f.settings.slideWidth > 0 && (n = f.settings.mode == "horizontal" ? f.settings.maxSlides * f.settings.slideWidth + (f.settings.maxSlides - 1) * f.settings.slideMargin : f.settings.slideWidth),
            n
        }
          , d = function() {
            var t = f.settings.slideWidth
              , n = f.viewport.width();
            return f.settings.slideWidth == 0 || f.settings.slideWidth > n && !f.carousel || f.settings.mode == "vertical" ? t = n : f.settings.maxSlides > 1 && f.settings.mode == "horizontal" && (n > f.maxThreshold || n < f.minThreshold && (t = (n - f.settings.slideMargin * (f.settings.minSlides - 1)) / f.settings.minSlides)),
            t
        }
          , h = function() {
            var n = 1, t;
            return f.settings.mode == "horizontal" && f.settings.slideWidth > 0 ? f.viewport.width() < f.minThreshold ? n = f.settings.minSlides : f.viewport.width() > f.maxThreshold ? n = f.settings.maxSlides : (t = f.children.first().width() + f.settings.slideMargin,
            n = Math.floor((f.viewport.width() + f.settings.slideMargin) / t)) : f.settings.mode == "vertical" && (n = f.settings.minSlides),
            n
        }
          , o = function() {
            var n = 0, t, i;
            if (f.settings.moveSlides > 0)
                if (f.settings.infiniteLoop)
                    n = Math.ceil(f.children.length / c());
                else
                    for (t = 0,
                    i = 0; t < f.children.length; )
                        ++n,
                        t = i + h(),
                        i += f.settings.moveSlides <= h() ? f.settings.moveSlides : h();
            else
                n = Math.ceil(f.children.length / h());
            return n
        }
          , c = function() {
            return f.settings.moveSlides > 0 && f.settings.moveSlides <= h() ? f.settings.moveSlides : h()
        }
          , g = function() {
            var t, i, n;
            f.children.length > f.settings.maxSlides && f.active.last && !f.settings.infiniteLoop ? f.settings.mode == "horizontal" ? (t = f.children.last(),
            n = t.position(),
            s(-(n.left - (f.viewport.width() - t.outerWidth())), "reset", 0)) : f.settings.mode == "vertical" && (i = f.children.length - f.settings.minSlides,
            n = f.children.eq(i).position(),
            s(-n.top, "reset", 0)) : (n = f.children.eq(f.active.index * c()).position(),
            f.active.index == o() - 1 && (f.active.last = !0),
            n != undefined && (f.settings.mode == "horizontal" ? s(-n.left, "reset", 0) : f.settings.mode == "vertical" && s(-n.top, "reset", 0)))
        }
          , s = function(n, t, i, r) {
            var u, o;
            f.usingCSS ? (u = f.settings.mode == "vertical" ? "translate3d(0, " + n + "px, 0)" : "translate3d(" + n + "px, 0, 0)",
            e.css("-" + f.cssPrefix + "-transition-duration", i / 1e3 + "s"),
            t == "slide" ? (e.css(f.animProp, u),
            e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                y()
            })) : t == "reset" ? e.css(f.animProp, u) : t == "ticker" && (e.css("-" + f.cssPrefix + "-transition-timing-function", "linear"),
            e.css(f.animProp, u),
            e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                s(r.resetValue, "reset", 0);
                a()
            }))) : (o = {},
            o[f.animProp] = n,
            t == "slide" ? e.animate(o, i, f.settings.easing, function() {
                y()
            }) : t == "reset" ? e.css(f.animProp, n) : t == "ticker" && e.animate(o, speed, "linear", function() {
                s(r.resetValue, "reset", 0);
                a()
            }))
        }
          , nt = function() {
            for (var i, r = "", u = o(), t = 0; t < u; t++)
                i = "",
                f.settings.buildPager && n.isFunction(f.settings.buildPager) ? (i = f.settings.buildPager(t),
                f.pagerEl.addClass("bx-custom-pager")) : (i = t + 1,
                f.pagerEl.addClass("bx-default-pager")),
                r += '<div class="bx-pager-item"><a href="" data-slide-index="' + t + '" class="bx-pager-link">' + i + "<\/a><\/div>";
            f.pagerEl.html(r)
        }
          , ht = function() {
            f.settings.pagerCustom ? f.pagerEl = n(f.settings.pagerCustom) : (f.pagerEl = n('<div class="bx-pager" />'),
            f.settings.pagerSelector ? n(f.settings.pagerSelector).html(f.pagerEl) : f.controls.el.addClass("bx-has-pager").append(f.pagerEl),
            nt());
            f.pagerEl.on("click", "a", bt)
        }
          , ct = function() {
            f.controls.next = n('<a class="bx-next" href="">' + f.settings.nextText + "<\/a>");
            f.controls.prev = n('<a class="bx-prev" href="">' + f.settings.prevText + "<\/a>");
            f.controls.next.bind("click", vt);
            f.controls.prev.bind("click", yt);
            f.settings.nextSelector && n(f.settings.nextSelector).append(f.controls.next);
            f.settings.prevSelector && n(f.settings.prevSelector).append(f.controls.prev);
            f.settings.nextSelector || f.settings.prevSelector || (f.controls.directionEl = n('<div class="bx-controls-direction" />'),
            f.controls.directionEl.append(f.controls.prev).append(f.controls.next),
            f.controls.el.addClass("bx-has-controls-direction").append(f.controls.directionEl))
        }
          , lt = function() {
            f.controls.start = n('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + f.settings.startText + "<\/a><\/div>");
            f.controls.stop = n('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + f.settings.stopText + "<\/a><\/div>");
            f.controls.autoEl = n('<div class="bx-controls-auto" />');
            f.controls.autoEl.on("click", ".bx-start", pt);
            f.controls.autoEl.on("click", ".bx-stop", wt);
            f.settings.autoControlsCombine ? f.controls.autoEl.append(f.controls.start) : f.controls.autoEl.append(f.controls.start).append(f.controls.stop);
            f.settings.autoControlsSelector ? n(f.settings.autoControlsSelector).html(f.controls.autoEl) : f.controls.el.addClass("bx-has-controls-auto").append(f.controls.autoEl);
            p(f.settings.autoStart ? "stop" : "start")
        }
          , at = function() {
            f.children.each(function() {
                var t = n(this).find("img:first").attr("title");
                t != undefined && ("" + t).length && n(this).append('<div class="bx-caption"><span>' + t + "<\/span><\/div>")
            })
        }
          , vt = function(n) {
            f.settings.auto;
            e.goToNextSlide();
            n.preventDefault()
        }
          , yt = function(n) {
            f.settings.auto;
            e.goToPrevSlide();
            n.preventDefault()
        }
          , pt = function(n) {
            e.startAuto();
            n.preventDefault()
        }
          , wt = function(n) {
            e.stopAuto();
            n.preventDefault()
        }
          , bt = function(t) {
            var i, r;
            f.settings.auto && e.stopAuto();
            i = n(t.currentTarget);
            i.attr("data-slide-index") !== undefined && (r = parseInt(i.attr("data-slide-index")),
            r != f.active.index && e.goToSlide(r),
            t.preventDefault())
        }
          , v = function(t) {
            var i = f.children.length;
            if (f.settings.pagerType == "short") {
                f.settings.maxSlides > 1 && (i = Math.ceil(f.children.length / f.settings.maxSlides));
                f.pagerEl.html(t + 1 + f.settings.pagerShortSeparator + i);
                return
            }
            f.pagerEl.find("a").removeClass("active");
            f.pagerEl.each(function(i, r) {
                n(r).find("a").eq(t).addClass("active")
            })
        }
          , y = function() {
            if (f.settings.infiniteLoop) {
                var n = "";
                f.active.index == 0 ? n = f.children.eq(0).position() : f.active.index == o() - 1 && f.carousel ? n = f.children.eq((o() - 1) * c()).position() : f.active.index == f.children.length - 1 && (n = f.children.eq(f.children.length - 1).position());
                n && (f.settings.mode == "horizontal" ? s(-n.left, "reset", 0) : f.settings.mode == "vertical" && s(-n.top, "reset", 0))
            }
            f.working = !1;
            f.settings.onSlideAfter(f.children.eq(f.active.index), f.oldIndex, f.active.index)
        }
          , p = function(n) {
            f.settings.autoControlsCombine ? f.controls.autoEl.html(f.controls[n]) : (f.controls.autoEl.find("a").removeClass("active"),
            f.controls.autoEl.find("a:not(.bx-" + n + ")").addClass("active"))
        }
          , tt = function() {
            o() == 1 ? (f.controls.prev.addClass("disabled"),
            f.controls.next.addClass("disabled")) : !f.settings.infiniteLoop && f.settings.hideControlOnEnd && (f.active.index == 0 ? (f.controls.prev.addClass("disabled"),
            f.controls.next.removeClass("disabled")) : f.active.index == o() - 1 ? (f.controls.next.addClass("disabled"),
            f.controls.prev.removeClass("disabled")) : (f.controls.prev.removeClass("disabled"),
            f.controls.next.removeClass("disabled")))
        }
          , kt = function() {
            if (f.settings.autoDelay > 0)
                var n = setTimeout(e.startAuto, f.settings.autoDelay);
            else
                e.startAuto();
            f.settings.autoHover && e.hover(function() {
                f.interval && (e.stopAuto(!0),
                f.autoPaused = !0)
            }, function() {
                f.autoPaused && (e.startAuto(!0),
                f.autoPaused = null )
            })
        }
          , dt = function() {
            var i = 0, t;
            f.settings.autoDirection == "next" ? e.append(f.children.clone().addClass("bx-clone")) : (e.prepend(f.children.clone().addClass("bx-clone")),
            t = f.children.first().position(),
            i = f.settings.mode == "horizontal" ? -t.left : -t.top);
            s(i, "reset", 0);
            f.settings.pager = !1;
            f.settings.controls = !1;
            f.settings.autoControls = !1;
            f.settings.tickerHover && !f.usingCSS && f.viewport.hover(function() {
                e.stop()
            }, function() {
                var t = 0;
                f.children.each(function() {
                    t += f.settings.mode == "horizontal" ? n(this).outerWidth(!0) : n(this).outerHeight(!0)
                });
                var i = f.settings.speed / t
                  , r = f.settings.mode == "horizontal" ? "left" : "top"
                  , u = i * (t - Math.abs(parseInt(e.css(r))));
                a(u)
            });
            a()
        }
          , a = function(n) {
            var t, i;
            speed = n ? n : f.settings.speed;
            t = {
                left: 0,
                top: 0
            };
            i = {
                left: 0,
                top: 0
            };
            f.settings.autoDirection == "next" ? t = e.find(".bx-clone").first().position() : i = f.children.first().position();
            var r = f.settings.mode == "horizontal" ? -t.left : -t.top
              , u = f.settings.mode == "horizontal" ? -i.left : -i.top
              , o = {
                resetValue: u
            };
            s(r, "ticker", speed, o)
        }
          , gt = function() {
            f.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            f.viewport.bind("touchstart", ni)
        }
          , ni = function(n) {
            if (e.stopAuto(),
            f.working)
                n.preventDefault();
            else {
                f.touch.originalPos = e.position();
                var t = n.originalEvent;
                f.touch.start.x = t.changedTouches[0].pageX;
                f.touch.start.y = t.changedTouches[0].pageY;
                f.viewport.bind("touchmove", it);
                f.viewport.bind("touchend", rt)
            }
        }
          , it = function(n) {
            var t = n.originalEvent, u = Math.abs(t.changedTouches[0].pageX - f.touch.start.x), e = Math.abs(t.changedTouches[0].pageY - f.touch.start.y), i, r;
            u * 3 > e && f.settings.preventDefaultSwipeX ? n.preventDefault() : e * 3 > u && f.settings.preventDefaultSwipeY && n.preventDefault();
            f.settings.mode != "fade" && f.settings.oneToOneTouch && (i = 0,
            f.settings.mode == "horizontal" ? (r = t.changedTouches[0].pageX - f.touch.start.x,
            i = f.touch.originalPos.left + r) : (r = t.changedTouches[0].pageY - f.touch.start.y,
            i = f.touch.originalPos.top + r),
            s(i, "reset", 0))
        }
          , rt = function(n) {
            var r, i, t;
            f.viewport.unbind("touchmove", it);
            r = n.originalEvent;
            i = 0;
            f.touch.end.x = r.changedTouches[0].pageX;
            f.touch.end.y = r.changedTouches[0].pageY;
            f.settings.mode == "fade" ? (t = Math.abs(f.touch.start.x - f.touch.end.x),
            t >= f.settings.swipeThreshold && (f.touch.start.x > f.touch.end.x ? e.goToNextSlide() : e.goToPrevSlide())) : (t = 0,
            f.settings.mode == "horizontal" ? (t = f.touch.end.x - f.touch.start.x,
            i = f.touch.originalPos.left) : (t = f.touch.end.y - f.touch.start.y,
            i = f.touch.originalPos.top),
            !f.settings.infiniteLoop && (f.active.index == 0 && t > 0 || f.active.last && t < 0) ? s(i, "reset", 200) : Math.abs(t) >= f.settings.swipeThreshold ? t < 0 ? e.goToNextSlide() : e.goToPrevSlide() : s(i, "reset", 200));
            e.startAuto();
            f.viewport.unbind("touchend", rt)
        }
          , ut = function() {
            if (f.initialized) {
                var t = n(window).width()
                  , i = n(window).height();
                (w != t || b != i) && (w = t,
                b = i,
                e.redrawSlider(),
                f.settings.onSliderResize.call(e, f.active.index))
            }
        }
        ;
        return e.goToSlide = function(t, i) {
            var h, r, a, p, u, w, b;
            if (!f.working && f.active.index != t) {
                f.working = !0;
                f.oldIndex = f.active.index;
                f.active.index = t < 0 ? o() - 1 : t >= o() ? 0 : t;
                f.settings.onSlideBefore(f.children.eq(f.active.index), f.oldIndex, f.active.index);
                if (i == "next")
                    f.settings.onSlideNext(f.children.eq(f.active.index), f.oldIndex, f.active.index);
                else if (i == "prev")
                    f.settings.onSlidePrev(f.children.eq(f.active.index), f.oldIndex, f.active.index);
                f.active.last = f.active.index >= o() - 1;
                f.settings.pager && v(f.active.index);
                f.settings.controls && tt();
                f.settings.mode == "fade" ? (f.settings.adaptiveHeight && f.viewport.height() != l() && f.viewport.animate({
                    height: l()
                }, f.settings.adaptiveHeightSpeed),
                f.children.filter(":visible").fadeOut(f.settings.speed).css({
                    zIndex: 0
                }),
                f.children.eq(f.active.index).css("zIndex", f.settings.slideZIndex + 1).fadeIn(f.settings.speed, function() {
                    n(this).css("zIndex", f.settings.slideZIndex);
                    y()
                })) : (f.settings.adaptiveHeight && f.viewport.height() != l() && f.viewport.animate({
                    height: l()
                }, f.settings.adaptiveHeightSpeed),
                h = 0,
                r = {
                    left: 0,
                    top: 0
                },
                !f.settings.infiniteLoop && f.carousel && f.active.last ? f.settings.mode == "horizontal" ? (u = f.children.eq(f.children.length - 1),
                r = u.position(),
                h = f.viewport.width() - u.outerWidth()) : (a = f.children.length - f.settings.minSlides,
                r = f.children.eq(a).position()) : f.carousel && f.active.last && i == "prev" ? (p = f.settings.moveSlides == 1 ? f.settings.maxSlides - c() : (o() - 1) * c() - (f.children.length - f.settings.maxSlides),
                u = e.children(".bx-clone").eq(p),
                r = u.position()) : i == "next" && f.active.index == 0 ? (r = e.find("> .bx-clone").eq(f.settings.maxSlides).position(),
                f.active.last = !1) : t >= 0 && (w = t * c(),
                r = f.children.eq(w).position()),
                "undefined" != typeof r && (b = f.settings.mode == "horizontal" ? -(r.left - h) : -r.top,
                s(b, "slide", f.settings.speed)))
            }
        }
        ,
        e.goToNextSlide = function() {
            if (f.settings.infiniteLoop || !f.active.last) {
                var n = parseInt(f.active.index) + 1;
                e.goToSlide(n, "next")
            }
        }
        ,
        e.goToPrevSlide = function() {
            if (f.settings.infiniteLoop || f.active.index != 0) {
                var n = parseInt(f.active.index) - 1;
                e.goToSlide(n, "prev")
            }
        }
        ,
        e.startAuto = function(n) {
            f.interval || (f.interval = setInterval(function() {
                f.working || (f.settings.autoDirection == "next" ? e.goToNextSlide() : e.goToPrevSlide())
            }, f.settings.pause),
            f.settings.autoControls && n != !0 && p("stop"))
        }
        ,
        e.stopAuto = function(n) {
            f.interval && (clearInterval(f.interval),
            f.interval = null ,
            f.settings.autoControls && n != !0 && p("start"))
        }
        ,
        e.getCurrentSlide = function() {
            return f.active.index
        }
        ,
        e.getCurrentSlideElement = function() {
            return f.children.eq(f.active.index)
        }
        ,
        e.getSlideCount = function() {
            return f.children.length
        }
        ,
        e.redrawSlider = function() {
            f.children.add(e.find(".bx-clone")).width(d());
            f.viewport.css("height", l());
            f.settings.ticker || g();
            f.active.last && (f.active.index = o() - 1);
            f.active.index >= o() && (f.active.last = !0);
            f.settings.pager && !f.settings.pagerCustom && (nt(),
            v(f.active.index))
        }
        ,
        e.destroySlider = function() {
            f.initialized && (f.initialized = !1,
            n(".bx-clone", this).remove(),
            f.children.each(function() {
                n(this).data("origStyle") != undefined ? n(this).attr("style", n(this).data("origStyle")) : n(this).removeAttr("style")
            }),
            n(this).data("origStyle") != undefined ? this.attr("style", n(this).data("origStyle")) : n(this).removeAttr("style"),
            n(this).unwrap().unwrap(),
            f.controls.el && f.controls.el.remove(),
            f.controls.next && f.controls.next.remove(),
            f.controls.prev && f.controls.prev.remove(),
            f.pagerEl && f.settings.controls && f.pagerEl.remove(),
            n(".bx-caption", this).remove(),
            f.controls.autoEl && f.controls.autoEl.remove(),
            clearInterval(f.interval),
            f.settings.responsive && n(window).unbind("resize", ut))
        }
        ,
        e.reloadSlider = function(n) {
            n != undefined && (u = n);
            e.destroySlider();
            k()
        }
        ,
        k(),
        this
    }
}(jQuery),
function(n) {
    n.fn.numeric = function(t, i) {
        typeof t == "boolean" && (t = {
            decimal: t,
            negative: !0,
            decimalPlaces: -1
        });
        t = t || {};
        typeof t.negative == "undefined" && (t.negative = !0);
        var r = t.decimal === !1 ? "" : t.decimal || "."
          , u = t.negative === !0 ? !0 : !1
          , f = typeof t.decimalPlaces == "undefined" ? -1 : t.decimalPlaces;
        return i = typeof i == "function" ? i : function() {}
        ,
        this.data("numeric.decimal", r).data("numeric.negative", u).data("numeric.callback", i).data("numeric.decimalPlaces", f).keypress(n.fn.numeric.keypress).keyup(n.fn.numeric.keyup).blur(n.fn.numeric.blur)
    }
    ;
    n.fn.numeric.keypress = function(t) {
        var u = n.data(this, "numeric.decimal"), s = n.data(this, "numeric.negative"), o = n.data(this, "numeric.decimalPlaces"), i = t.charCode ? t.charCode : t.keyCode ? t.keyCode : 0, r, f, e;
        if (i == 13 && this.nodeName.toLowerCase() == "input")
            return !0;
        if (i == 13)
            return !1;
        if ((r = !1,
        t.ctrlKey && i == 97 || t.ctrlKey && i == 65) || t.ctrlKey && i == 120 || t.ctrlKey && i == 88 || t.ctrlKey && i == 99 || t.ctrlKey && i == 67 || t.ctrlKey && i == 122 || t.ctrlKey && i == 90 || t.ctrlKey && i == 118 || t.ctrlKey && i == 86 || t.shiftKey && i == 45)
            return !0;
        if (i < 48 || i > 57) {
            if (f = n(this).val(),
            n.inArray("-", f.split("")) !== 0 && s && i == 45 && (f.length === 0 || parseInt(n.fn.getSelectionStart(this), 10) === 0))
                return !0;
            u && i == u.charCodeAt(0) && n.inArray(u, f.split("")) != -1 && (r = !1);
            i != 8 && i != 9 && i != 13 && i != 35 && i != 36 && i != 37 && i != 39 && i != 46 ? r = !1 : typeof t.charCode != "undefined" && (t.keyCode == t.which && t.which !== 0 ? (r = !0,
            t.which == 46 && (r = !1)) : t.keyCode !== 0 && t.charCode === 0 && t.which === 0 && (r = !0));
            u && i == u.charCodeAt(0) && (r = n.inArray(u, f.split("")) == -1 ? !0 : !1)
        } else
            r = !0,
            u && o > 0 && (e = n.inArray(u, n(this).val().split("")),
            e >= 0 && n(this).val().length > e + o && (r = !1));
        return r
    }
    ;
    n.fn.numeric.keyup = function() {
        var t = n(this).val(), h, c, i, e, l, s, a, u, y, f;
        if (t && t.length > 0) {
            var v = n.fn.getSelectionStart(this)
              , o = n.fn.getSelectionEnd(this)
              , r = n.data(this, "numeric.decimal")
              , w = n.data(this, "numeric.negative")
              , p = n.data(this, "numeric.decimalPlaces");
            for (r !== "" && r !== null  && (f = n.inArray(r, t.split("")),
            f === 0 && (this.value = "0" + t,
            v++,
            o++),
            f == 1 && t.charAt(0) == "-" && (this.value = "-0" + t.substring(1),
            v++,
            o++),
            t = this.value),
            h = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", r],
            c = t.length,
            i = c - 1; i >= 0; i--) {
                for (e = t.charAt(i),
                i !== 0 && e == "-" ? t = t.substring(0, i) + t.substring(i + 1) : i !== 0 || w || e != "-" || (t = t.substring(1)),
                l = !1,
                s = 0; s < h.length; s++)
                    if (e == h[s]) {
                        l = !0;
                        break
                    }
                l && e != " " || (t = t.substring(0, i) + t.substring(i + 1))
            }
            if (a = n.inArray(r, t.split("")),
            a > 0)
                for (u = c - 1; u > a; u--)
                    y = t.charAt(u),
                    y == r && (t = t.substring(0, u) + t.substring(u + 1));
            r && p > 0 && (f = n.inArray(r, t.split("")),
            f >= 0 && (t = t.substring(0, f + p + 1),
            o = Math.min(t.length, o)));
            this.value = t;
            n.fn.setSelection(this, [v, o])
        }
    }
    ;
    n.fn.numeric.blur = function() {
        var r = n.data(this, "numeric.decimal"), u = n.data(this, "numeric.callback"), f = n.data(this, "numeric.negative"), t = this.value, i;
        t !== "" && (i = new RegExp(f ? "-?" : "^\\d+$|^\\d*" + r + "\\d+$"),
        i.exec(t) || u.apply(this))
    }
    ;
    n.fn.removeNumeric = function() {
        return this.data("numeric.decimal", null ).data("numeric.negative", null ).data("numeric.callback", null ).data("numeric.decimalPlaces", null ).unbind("keypress", n.fn.numeric.keypress).unbind("keyup", n.fn.numeric.keyup).unbind("blur", n.fn.numeric.blur)
    }
    ;
    n.fn.getSelectionStart = function(n) {
        if (n.type === "number")
            return undefined;
        if (n.createTextRange && document.selection) {
            var t = document.selection.createRange().duplicate();
            return (t.moveEnd("character", n.value.length),
            t.text == "") ? n.value.length : Math.max(0, n.value.lastIndexOf(t.text))
        }
        try {
            return n.selectionStart
        } catch (i) {
            return 0
        }
    }
    ;
    n.fn.getSelectionEnd = function(n) {
        if (n.type === "number")
            return undefined;
        if (n.createTextRange && document.selection) {
            var t = document.selection.createRange().duplicate();
            return t.moveStart("character", -n.value.length),
            t.text.length
        }
        return n.selectionEnd
    }
    ;
    n.fn.setSelection = function(n, t) {
        if (typeof t == "number" && (t = [t, t]),
        t && t.constructor == Array && t.length == 2)
            if (n.type === "number")
                n.focus();
            else if (n.createTextRange) {
                var i = n.createTextRange();
                i.collapse(!0);
                i.moveStart("character", t[0]);
                i.moveEnd("character", t[1] - t[0]);
                i.select()
            } else {
                n.focus();
                try {
                    n.setSelectionRange && n.setSelectionRange(t[0], t[1])
                } catch (r) {}
            }
    }
}(jQuery),
function(n) {
    function f(f, e, o) {
        var c, h, l, s, v, a, p, w, y;
        if (e <= 1)
            return !1;
        for (c = n('<ul class="pages"><\/ul>'),
        c.append(t("first", f, e, o)).append(t("pre", f, e, o)),
        h = 1,
        l = i.endPoint,
        f > 4 && (h = f - 2,
        l = f + 2),
        l > e && (h = e - 4,
        l = e),
        h < 1 && (h = 1),
        s = h; s <= l; s++)
            v = u(),
            s != 1 ? v.p = s : delete v.p,
            a = r(n.param(v)),
            a != "" && (a = "?" + a),
            p = window.location.protocol + "//" + window.location.host + window.location.pathname + a,
            w = s,
            s == f ? (y = n('<li class="page-number">' + s + "<\/li>"),
            y.addClass("pgCurrent")) : y = n('<li class="page-number"><a href="' + p + '">' + s + "<\/a><\/li>"),
            y.appendTo(c);
        return c.append(t("next", f, e, o)).append(t("end", f, e, o)),
        c
    }
    function t(t, i, f, e) {
        var o = 1, s = "", l, c, a, h;
        switch (t) {
        case "first":
            o = 1;
            s = "pgPre_end";
            break;
        case "pre":
            o = i - 1;
            s = "pgPre";
            break;
        case "next":
            o = i + 1;
            s = "pgNext";
            break;
        case "end":
            o = f;
            s = "pgNext_end"
        }
        return l = u(),
        o != 1 ? l.p = o : delete l.p,
        c = r(n.param(l)),
        c != "" && (c = "?" + c),
        a = window.location.protocol + "//" + window.location.host + window.location.pathname + c,
        h = s == "pgPre_end" || s == "pgNext_end" ? n('<li class="' + s + '"><a href="' + a + '"><span style="color:#fff;font-size:1px">' + o + "<\/span><\/a><\/li>") : o <= 0 || o > f ? n('<li class="' + s + '"><a><\/a><\/li>') : n('<li class="' + s + '"><a href="' + a + '"><span style="color:#fff;font-size:1px">' + o + "<\/span><\/a><\/li>"),
        t == "first" || t == "pre" ? i <= 1 ? h.addClass("pgEmpty") : h.click(function() {
            e(o)
        }) : i >= f ? h.addClass("pgEmpty") : h.click(function() {
            e(o)
        }),
        h
    }
    function r(n) {
        return n.replace(/\+/g, " ").replace(/(\%3A)/g, ":").replace(/(\%2C)/g, ",").replace(/(\%2F)/g, "/").replace(/(\%7C)/g, "|")
    }
    function u() {
        for (var t = {}, r = location.search.substring(1), n, i = /([^&=]+)=([^&]*)/g; n = i.exec(r); )
            t[decodeURIComponent(n[1])] = decodeURIComponent(n[2]).replace(/\+/g, " ");
        return t
    }
    var i;
    n.fn.pager = function(t) {
        return i = n.extend({}, n.fn.pager.defaults, t),
        this.each(function() {
            n(this).empty().append(f(parseInt(t.pagenumber), parseInt(t.pagecount), t.buttonClickCallback));
            n(".pages li").mouseover(function() {
                document.body.style.cursor = "pointer"
            }).mouseout(function() {
                document.body.style.cursor = "auto"
            })
        })
    }
    ;
    n.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1,
        endPoint: 5
    }
}(jQuery),
function(n, t, i) {
    function r() {
        return t.innerHeight || n(window).height()
    }
    function f() {
        var n = []
          , t = 0;
        for (var i in u)
            n.push(i),
            t++;
        return n[parseInt(Math.random() * t, 10)]
    }
    function e() {
        var r = n(i).width() <= n(t).width()
          , u = n(i).height() <= n(t).height()
          , f = r && u;
        r && n("body").css("overflow-x", "hidden");
        u && n("body").css("overflow-y", "hidden");
        f && n("body").css("overflow", "hidden")
    }
    function o(t) {
        var i = n(this)
          , s = t.direction.toLowerCase() === "random" ? f() : t.direction
          , r = n.extend(t.tween, u[s](i))
          , h = "position,left,top,bottom,right,width,height,paddingTop,paddingRight,paddingBottom,paddingLeft,marginTop,marginRight,marginBottom,marginLeft,zIndex,overflow,clip,display"
          , o = n(i.clone()).removeAttr("id").attr("id", "replaced-element-" + +new Date).css(function() {
            var n = h.split(",")
              , t = n.length;
            for (styles = {}; t--; )
                styles[n[t]] = i.css(n[t]);
            return styles
        }());
        e();
        n(i).css({
            left: r.left ? i.offset().left : null ,
            top: r.top ? i.offset().top : null ,
            position: "absolute",
            zIndex: 999,
            width: i.outerWidth(),
            height: i.outerHeight()
        }).animate(r, t.duration, function() {
            i.remove()
        }).filter(function() {
            return !!t.retainSpace
        }).before(n(o).css("opacity", 0));
        t.retainSpace && typeof t.retainSpace == "object" && n(o).animate(t.retainSpace, t.duration, function() {
            n(this).remove()
        })
    }
    var u = {
        top: function(n) {
            return {
                top: 0 - n.height(),
                left: n.offset().left
            }
        },
        topLeft: function(n) {
            return {
                top: 0 - n.height(),
                left: 0 - n.width() / 2
            }
        },
        topRight: function(i) {
            return {
                top: 0 - i.height(),
                left: n(t).width() + i.width() / 2
            }
        },
        left: function(n) {
            return {
                top: n.offset().top,
                left: 0 - n.width()
            }
        },
        right: function(i) {
            return {
                top: i.offset().top,
                left: n(t).width() + i.width()
            }
        },
        btmLeft: function(n) {
            return {
                top: r() + n.height(),
                left: 0 - n.width() / 2
            }
        },
        btmRight: function(n) {
            return {
                top: r() + n.height(),
                left: r() + n.width() / 2
            }
        },
        btm: function(n) {
            return {
                top: r(),
                left: n.offset().left
            }
        }
    };
    n.fn.flyOffPage = function(t) {
        var i = n.extend({
            direction: "random",
            tween: {},
            retainSpace: !0,
            duration: 500
        }, t);
        return this.each(function() {
            o.call(this, i)
        })
    }
}(jQuery, window, document),
function(n) {
    function i(n) {
        return typeof n == "object" ? n : {
            top: n,
            left: n
        }
    }
    var t = n.scrollTo = function(t, i, r) {
        n(window).scrollTo(t, i, r)
    }
    ;
    t.defaults = {
        axis: "xy",
        duration: parseFloat(n.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    };
    t.window = function() {
        return n(window)._scrollable()
    }
    ;
    n.fn._scrollable = function() {
        return this.map(function() {
            var t = this, r = !t.nodeName || n.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1, i;
            return r ? (i = (t.contentWindow || t).document || t.ownerDocument || t,
            /webkit/i.test(navigator.userAgent) || i.compatMode == "BackCompat" ? i.body : i.documentElement) : t
        })
    }
    ;
    n.fn.scrollTo = function(r, u, f) {
        return typeof u == "object" && (f = u,
        u = 0),
        typeof f == "function" && (f = {
            onAfter: f
        }),
        r == "max" && (r = 9e9),
        f = n.extend({}, t.defaults, f),
        u = u || f.duration,
        f.queue = f.queue && f.axis.length > 1,
        f.queue && (u /= 2),
        f.offset = i(f.offset),
        f.over = i(f.over),
        this._scrollable().each(function() {
            function l(n) {
                h.animate(o, u, f.easing, n && function() {
                    n.call(this, r, f)
                }
                )
            }
            if (r != null ) {
                var s = this, h = n(s), e = r, c, o = {}, a = h.is("html,body");
                switch (typeof e) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                        e = i(e);
                        break
                    }
                    if (e = n(e, this),
                    !e.length)
                        return;
                case "object":
                    (e.is || e.style) && (c = (e = n(e)).offset())
                }
                n.each(f.axis.split(""), function(n, i) {
                    var y = i == "x" ? "Left" : "Top", u = y.toLowerCase(), r = "scroll" + y, p = s[r], w = t.max(s, i), v;
                    c ? (o[r] = c[u] + (a ? 0 : p - h.offset()[u]),
                    f.margin && (o[r] -= parseInt(e.css("margin" + y)) || 0,
                    o[r] -= parseInt(e.css("border" + y + "Width")) || 0),
                    o[r] += f.offset[u] || 0,
                    f.over[u] && (o[r] += e[i == "x" ? "width" : "height"]() * f.over[u])) : (v = e[u],
                    o[r] = v.slice && v.slice(-1) == "%" ? parseFloat(v) / 100 * w : v);
                    f.limit && /^\d+$/.test(o[r]) && (o[r] = o[r] <= 0 ? 0 : Math.min(o[r], w));
                    !n && f.queue && (p != o[r] && l(f.onAfterFirst),
                    delete o[r])
                });
                l(f.onAfter)
            }
        }).end()
    }
    ;
    t.max = function(t, i) {
        var r = i == "x" ? "Width" : "Height"
          , u = "scroll" + r;
        if (!n(t).is("html,body"))
            return t[u] - n(t)[r.toLowerCase()]();
        var f = "client" + r
          , e = t.ownerDocument.documentElement
          , o = t.ownerDocument.body;
        return Math.max(e[u], o[u]) - Math.min(e[f], o[f])
    }
}(jQuery);
var ValueTypes = {
    OrderPaymentMethod: {
        TienMat: 0,
        ATM: 1,
        CreditCard: 2,
        ChuyenKhoan: 3,
        MoMo: 4
    },
    VoucherStatus: {
        Pending: 0,
        Printed: 1,
        Activated: 2,
        Deleted: 3,
        Return: 4,
        Expired: 5
    },
    SortTypeEnum: {
        BestSeller: 0,
        Newest: 1
    },
    CungMuaConstants: {
        CITY_VOUCHER_COOKIE: "VoucherCityId"
    },
    Cookies: {
        HistoryUrls: "HistoryUrls",
        LoginUrlPattern: "/dang-nhap?ReturnUrl="
    }
}
  , Resources = {
    Common: {
        Error: {
            ConnectionOrSyntaxError: "Lỗi đường truyền hoặc lỗi cú pháp.",
            ErrorWhenAction: "Lỗi xảy ra trong quá trình thao tác. Vui lòng liên hệ Admin để biết thêm chi tiết.",
            ForeignKeyConstraintsWhenDelete: "Item này đang được sử dụng trong hệ thống, bạn không thể xóa nó."
        },
        ConfirmDelete: "Bạn có chắc muốn xóa mục này không?",
        ConfirmAction: "Bạn có chắc muốn thực hiện hành động này không?",
        ConfirmActionTitle: "Xác Nhận Thao Tác",
        Notification: "Thông báo"
    },
    Payment: {}
}
  , common = function() {
    function t(n) {
        if (n && (typeof n == "string" || n instanceof String)) {
            var t = '<div class="popup_brand  ui-dialog-content ui-widget-content" style="display: block; width: 50%; min-height: 100px; max-height: none; height: auto;"><div class="popup_brand_top"><img src="' + mySettings.ApplicationPath + 'content/images/logo_cungmua.png" width="163" height="34"><\/div><div class="popup_co"><div style = "font-size: 16px;text-align: center;">' + n + '<\/div><div style="text-align: center;margin-top: 15px;"><img src="' + mySettings.ApplicationPath + 'content/images/ajax-loader-progressbar.gif" width="128" height="15"><\/div><\/div><\/div>';
            $.blockUI({
                message: t
            });
            $(".blockUI.blockMsg.blockPage").attr("style", "");
            $(".blockUI.blockMsg.blockPage").attr("style", "z-index: 9991;position: fixed;top: 40%;left: 28%;border-top-left-radius: 0;border-top-right-radius: 0;")
        } else
            $.blockUI({
                message: '<div class="blockUI-waiting"><\/div>'
            }),
            $(".blockUI.blockMsg.blockPage").attr("style", ""),
            $(".blockUI.blockMsg.blockPage").attr("style", "z-index: 9991;position: fixed;top: 40%;left: 40%;border-top-left-radius: 0;border-top-right-radius: 0;")
    }
    function i(n) {
        if (n && (typeof n == "string" || n instanceof String)) {
            var t = '<div class="popup_brand_m  ui-dialog-content ui-widget-content" style="display: block; width: 95%; min-height: 100px; max-height: none; height: auto;"><div class="popup_brand_m_top1"><img src="' + mySettings.ApplicationPath + 'content/images/logo_cungmua.png" width="140" height="29"><\/div><div class="popup_co1_m"><div style = "font-size: 15px;text-align: center;">' + n + '<\/div><div style="text-align: center;margin-top: 15px;"><img src="' + mySettings.ApplicationPath + 'content/images/ajax-loader-progressbar.gif" width="128" height="15"><\/div><\/div><\/div>';
            $.blockUI({
                message: t
            });
            $(".blockUI.blockMsg.blockPage").attr("style", "");
            $(".blockUI.blockMsg.blockPage").attr("style", "z-index: 9991;position: fixed;top: 40%;left: 0%;border-top-left-radius: 0;border-top-right-radius: 0;")
        } else
            $.blockUI({
                message: '<div class="blockUI-waiting"><\/div>'
            }),
            $(".blockUI.blockMsg.blockPage").attr("style", ""),
            $(".blockUI.blockMsg.blockPage").attr("style", "z-index: 9991;position: fixed;top: 40%;left: 30%;border-top-left-radius: 0;border-top-right-radius: 0;")
    }
    function r(n) {
        f(n).removeClass("validation-summary-errors").addClass("validation-summary-valid")
    }
    function u(n) {
        var i = n.find(".input-validation-error"), t;
        i.removeClass("input-validation-error").addClass("valid");
        t = n.find(".field-validation-error");
        t.removeClass("field-validation-error").addClass("field-validation-valid")
    }
    function f(n) {
        var t = n.find(".validation-summary-errors, .validation-summary-valid");
        return t.length || (t = $('<div class="validation-summary-errors"><span><\/span><ul><\/ul><\/div>').prependTo(n)),
        t
    }
    function n(n) {
        return n == "" ? n : (n = n + "",
        o(e(n)))
    }
    function e(n) {
        return n == "" ? n : n.replace(/^\s+/, "")
    }
    function o(n) {
        return n == "" ? n : n.replace(/\s+$/, "")
    }
    return {
        ResetForm: function(n) {
            n[0].reset();
            r(n);
            u(n)
        },
        OpenPage: function(n, t, i) {
            var r = (window.screen.width - t) / 2
              , u = (window.screen.height - i) / 2;
            window.open(n, null , "directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no,width=" + t + ",height=" + i + ",top=" + u + ",left=" + r, null )
        },
        BlockUI: function(n) {
            $(".blockUI.blockOverlay").length == 0 && (mySettings.IsMobileDevice ? i(n) : t(n))
        },
        UnblockUI: function() {
            $.unblockUI()
        },
        Block: function(n) {
            n = n.indexOf("#") >= 0 ? n : "#" + n;
            $(n).block({
                message: ""
            });
            $(".blockUI.blockMsg.blockElement").attr("style", "");
            $(".blockUI.blockMsg.blockElement").attr("style", "z-index: 1011;position: absolute;padding: 0px; margin: 0px; top: 40%;left: 43%;")
        },
        Unblock: function(n) {
            n = n.indexOf("#") >= 0 ? n : "#" + n;
            $(n).unblock()
        },
        ConfirmAction: function(n, t) {
            n.data("action", t);
            n.dialog("close")
        },
        Confirm: function(n) {
            return common.KillKeyBoard(),
            mySettings.IsMobileDevice ? commonMobile.Confirm(n) : commonDesktop.Confirm(n)
        },
        Alert: function(n) {
            var t;
            return common.KillKeyBoard(),
            t = mySettings.IsMobileDevice ? commonMobile.Alert(n) : commonDesktop.Alert(n),
            setTimeout(function() {
                t.dialog("option", "position", {
                    my: "center",
                    at: "center",
                    of: window
                })
            }, 10),
            t
        },
        OpenDialog: function(n) {
            return common.KillKeyBoard(),
            mySettings.IsMobileDevice ? commonMobile.OpenDialog(n) : commonDesktop.OpenDialog(n)
        },
        IsMobile: function(n) {
            return /(^(09)\d{8}$)|(^(01)\d{9}$)/.test(n)
        },
        IsValidEmail: function(n) {
            return /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(n)
        },
        IsDate: function(n, t) {
            var i, e, u, f, r;
            return (t === undefined && (t = "/"),
            i = n.split(t),
            i.length !== 3) ? !1 : (u = i[0] - 1,
            f = i[1] - 0,
            r = i[2] - 0,
            r < 1e3 || r > 3e3) ? !1 : (e = new Date(r,u,f).getTime(),
            i = new Date,
            i.setTime(e),
            i.getFullYear() !== r || i.getMonth() !== u || i.getDate() !== f) ? !1 : !0
        },
        IsUrlValid: function(n) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
        },
        IsValidCreditCard2: function(n, t) {
            var r, u, i, f;
            if (n == "Visa" ? r = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/ : n == "MC" ? r = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/ : n == "Disc" ? r = /^6011-?\d{4}-?\d{4}-?\d{4}$/ : n == "AmEx" ? r = /^3[4,7]\d{13}$/ : n == "Diners" && (r = /^3[0,6,8]\d{12}$/),
            !r.test(t))
                return !1;
            for (t = t.split("-").join(""),
            u = 0,
            i = 2 - t.length % 2; i <= t.length; i += 2)
                u += parseInt(t.charAt(i - 1));
            for (i = t.length % 2 + 1; i < t.length; i += 2)
                f = parseInt(t.charAt(i - 1)) * 2,
                u += f < 10 ? f : f - 9;
            return u % 10 == 0 ? !0 : !1
        },
        IsValidCreditCard: function(n) {
            var i, f;
            if (!n || /[^0-9-\s]+/.test(n))
                return !1;
            var u = 0
              , t = 0
              , r = !1;
            for (n = n.replace(/\D/g, ""),
            i = n.length - 1; i >= 0; i--)
                f = n.charAt(i),
                t = parseInt(f, 10),
                r && (t *= 2) > 9 && (t -= 9),
                u += t,
                r = !r;
            return u % 10 == 0
        },
        KillKeyBoard: function() {
            if (mySettings.IsMobileDevice || mySettings.IsTablet)
                try {
                    document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ? $(document.activeElement).blur() : $("input:focus, textarea:focus, select:focus").blur()
                } catch (n) {}
        },
        GoToByScroll: function(n) {
            $("html,body").animate({
                scrollTop: $(n).offset().top
            }, "slow")
        },
        CMDecodeURIComponent: function(n) {
            return n.replace(/\+/g, " ").replace(/(\%3A)/g, ":").replace(/(\%2C)/g, ",").replace(/(\%2F)/g, "/").replace(/(\%7C)/g, "|")
        },
        SetQueryString: function(n, t, i) {
            var r = new RegExp("([?&])" + t + "=.*?(&|$)","i")
              , u = n.indexOf("?") !== -1 ? "&" : "?";
            return n.match(r) ? n.replace(r, "$1" + t + "=" + i + "$2") : n + u + t + "=" + i
        },
        FormatCurrency: function(t, i, r, u) {
            var f, e, o, s;
            if (!t)
                return "0";
            for (r = r || !0,
            u = u || !0,
            i = i || "vi-vn",
            t = t.toString().replace(/\$|\,/g, ""),
            isNaN(t) && (t = "0"),
            f = t == (t = Math.abs(t)),
            t = Math.floor(t * 100 + .50000000001),
            e = t % 100,
            t = Math.floor(t / 100).toString(),
            e < 10 && (e = "0" + e),
            o = 0; o < Math.floor((t.length - (1 + o)) / 3); o++)
                switch (n(i.toLowerCase())) {
                case "en-us":
                    t = t.substring(0, t.length - (4 * o + 3)) + "," + t.substring(t.length - (4 * o + 3));
                    break;
                case "vi-vn":
                    t = t.substring(0, t.length - (4 * o + 3)) + "." + t.substring(t.length - (4 * o + 3))
                }
            s = "0";
            switch (n(i.toLowerCase())) {
            case "en-us":
                s = u ? r == !1 ? (f ? "" : "-") + t + "." + e : (f ? "" : "-") + t : r == !1 ? (f ? "" : "-") + "$" + t + "." + e : (f ? "" : "-") + "$" + t;
                break;
            case "vi-vn":
                s = u ? r == !1 ? (f ? "" : "-") + t + "," + e : (f ? "" : "-") + t : r == !1 ? (f ? "" : "-") + t + "," + e + "đ" : (f ? "" : "-") + t + "đ"
            }
            return s
        },
        ClearUnicodeForTextbox: function(t) {
            var r = $(t), i;
            return r.length > 0 ? (i = r.val(),
            i = n(i),
            i = i.replace(/\s+/g, " "),
            i = i.replace(/\s/g, "-"),
            i = i.replace(/[^0-9a-zA-Z\-\_áàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựđíìỉĩịéèẻẽẹêếềểễệýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰĐÍÌỈĨỊÉÈẺẼẸÊẾỀỂỄỆÝỲỶỸỴ]/g, ""),
            i.replace(/-+/g, "-")) : ""
        },
        GetQueryStringValue: function(n) {
            for (var i, u = window.location.search.substring(1), r = u.split("&"), t = 0; t < r.length; t++)
                if (i = r[t].split("="),
                i[0] == n)
                    return i[1];
            return ""
        },
        ScrollToTop: function() {
            $("html, body").animate({
                scrollTop: 0
            }, 0)
        },
        DisplayTimeWithTwoNumber: function(n) {
            return n < 10 ? "0" + n : n
        },
        GetValueByQueryString: function(n) {
            n = n || "";
            n = n.toLowerCase().replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var i = new RegExp("[\\?&]" + n + "=([^&#]*)")
              , t = i.exec(location.search.toLowerCase());
            return t === null  ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
        },
        GetTimeSpan: function(n, t) {
            var i = Math.abs(n.getTime() - t.getTime()) / 1e3, f = Math.floor(i / 86400), r, u, e;
            return i -= f * 86400,
            r = Math.floor(i / 3600) % 24,
            i -= r * 3600,
            u = Math.floor(i / 60) % 60,
            i -= u * 60,
            e = i % 60,
            {
                totalDays: f,
                totalHours: r,
                totalMinutes: u,
                totalSeconds: e
            }
        },
        GetCookie: function(n) {
            return Cookies.get(n)
        },
        GetJsonCookie: function(n) {
            return Cookies.getJSON(n)
        },
        SetCookie: function(n, t, i) {
            i = i || {
                expires: 1,
                path: "/"
            };
            i.path = i.path || "/";
            Cookies.set(n, t, i)
        },
        DeleteCookie: function(n) {
            Cookies.remove(n, {
                path: "/"
            })
        },
        GetHistoryUrls: function() {
            var n = Cookies.getJSON(ValueTypes.Cookies.HistoryUrls);
            return n || []
        },
        ProcessHistoryUrls: function() {
            try {
                var n = common.GetHistoryUrls()
                  , t = location.href;
                $("#iconBack").length == 0 && t.indexOf(ValueTypes.Cookies.LoginUrlPattern) == -1 ? (n = [],
                n.push(t)) : t != n[n.length - 1] && n.push(t);
                common.SetHistoryUrls(n)
            } catch (i) {}
        },
        SetHistoryUrls: function(n) {
            Cookies.set(ValueTypes.Cookies.HistoryUrls, n, {
                expires: 1,
                path: "/"
            })
        },
        GoBack: function(n) {
            var u = !1, t = Cookies.getJSON(ValueTypes.Cookies.HistoryUrls), i, r;
            if (t && t.length) {
                if (t.length == 1)
                    return common.SetHistoryUrls([]),
                    window.location = mySettings.ApplicationPath,
                    !1;
                i = t.splice(t.length - 2, 2);
                common.SetHistoryUrls(t);
                r = i[0];
                n && i[0].indexOf(ValueTypes.Cookies.LoginUrlPattern) != -1 && mySettings.IsAuthenticated === !0 && (r = mySettings.ApplicationPath + "checkout/gio-hang");
                window.location = r;
                u = !0
            }
            return u || parent.history.back(),
            !1
        },
        GoBackInCheckout: function() {
            $("#wrapperAddress").css("display") == "none" || $("#ID").val() == "" ? common.GoBack(!0) : (common.ScrollToTop(),
            checkout.comebackCheckoutPage())
        },
        ReplaceHistoryUrls: function(n, t) {
            for (var r = common.GetHistoryUrls(), u = r.length, i = 0; i < u; i++)
                if (r[i] == n) {
                    r[i] = t;
                    break
                }
            common.SetHistoryUrls(r)
        },
        SendTrackingEvent: function(n, t, i, r) {
            window.ga === undefined ? r && (window.location = r) : ga("send", "event", n, t, i, {
                hitCallback: function() {
                    r && (window.location = r)
                }
            })
        },
        SendTrackingMenu: function(n, t) {
            common.SendTrackingEvent("MainMenu", "Click", n, t)
        },
        ParseUnobtrusiveForm: function(n) {
            $(n).removeData("validator");
            $.validator.unobtrusive.parse($(n))
        },
        ExecuteFunctionByName: function(n, t) {
            var i;
            t = t || window;
            var u = [].slice.call(arguments).splice(2)
              , r = n.split(".")
              , f = r.pop()
              , e = r.length;
            for (i = 0; i < e; i++)
                t = t[r[i]];
            return t[f].apply(this, u)
        },
        ParseHtmlLinkForMobile: function(n, t) {
            var i, r, u;
            return (t === "ios" || t === "android") && (i = "",
            t === "android" ? i = 'href="intent://www.cungmua.com/openmyapp?id=' : t === "ios" && (i = 'href="CungMua://?id='),
            r = n.match(/href=['|"][0-9a-zA-Z-/]+_p/g),
            $.each(r, function(t, r) {
                n = n.replace(r, i)
            }),
            u = n.match(/\d+\.html["|']/g),
            $.each(u, function(t, i) {
                var r = i.replace(".html", "").replace("'", '"');
                n = n.replace(i, r)
            })),
            n
        },
        ParseHtmlDataForMobile: function(n) {
            var t = common.GetValueByQueryString("device");
            return t ? common.ParseHtmlLinkForMobile(n, t) : n
        }
    }
}()
  , commonDesktop = function() {
    return {
        CurrentConfirmDialog: null ,
        Confirm: function(n) {
            var i = n.message || "Bạn có muốn thực hiện hành động này không?"
              , r = n.resizable != null  ? n.resizable : !1
              , u = n.width || 400
              , f = n.height || "auto"
              , e = n.cssClass || "txt_center"
              , o = '<div class="popup_brand"><div class="popup_brand_top"><span class="logo_pop"><\/span><\/div><div class="popup_co"><p class="' + e + '">' + i + '<\/p><p class="list_btn_pop"><button type="button" onclick=\'common.ConfirmAction($(this).parents(".popup_brand"), "ok");\' class="btn_brand" >Đồng ý<\/button><button type="button" onclick=\'common.ConfirmAction($(this).parents(".popup_brand"), "cancel");\' class="btn_grey">Bỏ qua<\/button><\/p><\/div><\/div>'
              , t = $(o).dialog({
                resizable: r,
                width: u,
                height: f,
                modal: !0,
                create: function() {
                    $("body").css({
                        overflow: "hidden"
                    })
                },
                beforeClose: function() {
                    $("body").css({
                        overflow: "visible"
                    })
                },
                close: function() {
                    var i = $(this).data("action");
                    t.dialog("destroy");
                    $(this).remove();
                    i == "ok" && n.okCallback && n.okCallback();
                    i == "cancel" && n.cancelCallback && n.cancelCallback()
                },
                open: function(n) {
                    $(n.target).dialog("widget").css({
                        position: "fixed"
                    }).position({
                        my: "center",
                        at: "center",
                        of: window
                    })
                }
            });
            return $(".ui-widget-overlay").click(function() {
                t.dialog("close")
            }),
            commonDesktop.CurrentConfirmDialog = t,
            t
        },
        CurrentAlertDialog: null ,
        Alert: function(n) {
            n instanceof Object || (n = {
                message: n
            });
            var i = n.resizable != null  ? n.resizable : !1
              , r = n.width || 400
              , u = n.height || "auto"
              , f = n.cssClass || "txt_center"
              , e = '<div class="popup_brand"><div class="popup_brand_top"><span class="logo_pop"><\/span><\/div><div class="popup_co"><p class="' + f + '">' + n.message + '<\/p><p class="list_btn_pop"><button type="button" class="btn_brand" onclick=\'$(this).parents(".popup_brand").dialog("close");\'>Đồng ý<\/button><\/p><\/div><\/div>'
              , t = $(e).dialog({
                resizable: i,
                width: r,
                height: u,
                modal: !0,
                create: function() {
                    $("body").css({
                        overflow: "hidden"
                    })
                },
                beforeClose: function() {
                    $("body").css({
                        overflow: "visible"
                    })
                },
                close: function() {
                    t.dialog("destroy");
                    $(this).remove();
                    n.okCallback && n.okCallback()
                },
                open: function(n) {
                    $(n.target).dialog("widget").css({
                        position: "fixed"
                    }).position({
                        my: "center",
                        at: "center",
                        of: window
                    })
                }
            });
            return $(".ui-widget-overlay").click(function() {
                t.dialog("close")
            }),
            commonDesktop.CurrentAlertDialog = t,
            t
        },
        CurrentOpenDialog: null ,
        OpenDialog: function(n) {
            var r, i;
            n instanceof Object || (n = {
                message: n
            });
            var e = n.resizable != null  ? n.resizable : !1
              , o = n.width || "auto"
              , s = n.height || "auto"
              , h = n.modal != null  ? n.modal : !0
              , u = n.showBrand != null  ? n.showBrand : !0
              , c = n.closeWhenClickOut != null  ? n.closeWhenClickOut : !0
              , f = n.title ? n.title : undefined
              , l = n.contentDiv || "popup_co"
              , t = "";
            return u && (t += '<div class="popup_brand">',
            t += f ? '<div class="popup_brand_top title_L">' + f + "<\/div>" : '<div class="popup_brand_top"><span class="logo_pop"><\/span><\/div>'),
            t += '<div class="' + l + '">',
            t += n.message,
            u && (t += "<\/div>"),
            t += "<\/div>",
            r = {
                resizable: e,
                width: o,
                height: s,
                modal: h,
                create: function() {
                    $("body").css({
                        overflow: "hidden"
                    })
                },
                beforeClose: function() {
                    $("body").css({
                        overflow: "visible"
                    })
                },
                close: function() {
                    i.dialog("destroy");
                    $(this).remove();
                    n.closeCallback && n.closeCallback()
                },
                open: function(t) {
                    n.openCallback && n.openCallback($(this));
                    var r = $(t.target)
                      , i = r.find("form");
                    i.length && (i.removeData("validator"),
                    $.validator.unobtrusive.parse(i));
                    r.dialog("widget").css({
                        position: "fixed"
                    }).position({
                        my: "center",
                        at: "center",
                        of: window
                    })
                }
            },
            n.position && (r.position = n.position),
            i = $(t).dialog(r),
            c && $(".ui-widget-overlay").click(function() {
                i.dialog("close")
            }),
            window.mySettings && window.mySettings.IsTablet && common.KillKeyBoard(),
            commonDesktop.CurrentOpenDialog = i,
            i
        }
    }
}();
$(function() {
    if (mySettings.IsTablet)
        $(window).on("orientationchange", function() {
            setTimeout(function() {
                commonDesktop.CurrentOpenDialog && (commonDesktop.CurrentOpenDialog.dialog("widget").position({
                    my: "center",
                    at: "center",
                    of: window
                }),
                common.KillKeyBoard());
                commonDesktop.CurrentAlertDialog && commonDesktop.CurrentAlertDialog.dialog("widget").position({
                    my: "center",
                    at: "center",
                    of: window
                });
                commonDesktop.CurrentConfirmDialog && commonDesktop.CurrentConfirmDialog.dialog("widget").position({
                    my: "center",
                    at: "center",
                    of: window
                })
            }, 800)
        })
});
$(function() {
    $("#frmSearch").submit(function(n) {
        var i, t;
        (n.preventDefault(),
        i = $.trim($("#search").val()),
        i.length !== 0) && (t = common.ClearUnicodeForTextbox("#search"),
        window.ga === undefined ? window.location = mySettings.ApplicationPath + "tim-kiem/" + encodeURIComponent(t) + ".html" : ga("send", "event", "Search", "Enter", t, {
            hitCallback: function() {
                window.location = mySettings.ApplicationPath + "tim-kiem/" + encodeURIComponent(t) + ".html"
            }
        }))
    })
});
layout = function() {
    return {
        SubscribeEmail: function(n, t) {
            var r = "Lỗi khi tải dữ liệu, vui lòng thử lại."
              , i = $.trim($("#txtSubscribeEmail").val());
            if ($.trim(i) == "") {
                $("#errorSubscribeEmail").html("Vui lòng nhập email");
                $("#txtSubscribeEmail").addClass("input-validation-error");
                $("#txtSubscribeEmail").focus();
                return
            }
            if (!common.IsValidEmail(i)) {
                $("#errorSubscribeEmail").html("Email không hợp lệ");
                $("#txtSubscribeEmail").addClass("input-validation-error");
                $("#txtSubscribeEmail").focus();
                return
            }
            $.post(mySettings.ApplicationPath + "Shared/Subscribe", {
                email: i,
                gender: t,
                cityId: n,
                isSendEmail: !1
            }).done(function(n) {
                n.success ? (common.Alert({
                    message: "Vui lòng kiểm tra email " + i + " để hoàn tất đăng ký và nhận ngay <b>QUÀ CỰC HOT<\/b>. Nếu không thấy bạn vui lòng kiểm tra trong hộp thư rác"
                }),
                $("#errorSubscribeEmail").hide(),
                $("#txtSubscribeEmail").removeClass("input-validation-error"),
                n.existingEmail || layout.InternalTrackingForSubscribe(i, 2)) : common.Alert({
                    message: "Yêu cầu đang được xử lý. Vui lòng đợi."
                })
            }).error(function() {
                common.Alert({
                    message: r
                })
            });
            facebookMarketing.subscribleEmail()
        },
        InternalTrackingForSubscribe: function(n, t) {
            if (typeof internalTracking != "undefined") {
                var i = {
                    isLead: !0,
                    email: n,
                    isNewUser: !1,
                    isOrder: !1,
                    isNewSession: !1
                };
                typeof t != "undefined" && t != null  && (i.leadInPlace = t);
                internalTracking.initUserCatogory(i);
                internalTracking.run()
            }
        },
        ToggleQuestions: function() {
            $("h4.title_item1").click(function() {
                var n = $(this);
                n.toggleClass("active");
                n.next("div").slideToggle()
            })
        }
    }
}();
layoutDesktop = function() {
    function u(n) {
        t ? n < layoutDesktop.MainHeaderTop && ($("#mainHeader").removeClass("scroll_fixed"),
        $("#divSearch").switchClass("search1", "search", 0),
        $("#cartTopHeader").html("<div id='cartTop'>" + $("#cartTopScroll").html() + "<\/div>"),
        t = !1) : n >= layoutDesktop.MainHeaderTop && ($("#mainHeader").addClass("scroll_fixed"),
        $("#cartTopHeader").html(""),
        t = !0)
    }
    function f(t) {
        !n && t > 100 ? ($(".top_control").fadeIn(),
        n = !0) : n && t <= 100 && ($(".top_control").fadeOut(),
        n = !1)
    }
    function i() {
        var t = $.trim($("#search").val()), n;
        t.length !== 0 && (n = common.ClearUnicodeForTextbox("#search"),
        window.ga === undefined ? window.location = mySettings.ApplicationPath + "tim-kiem/" + encodeURIComponent(n) + ".html" : ga("send", "event", "Search", "Click", n, {
            hitCallback: function() {
                window.location = mySettings.ApplicationPath + "tim-kiem/" + encodeURIComponent(n) + ".html"
            }
        }))
    }
    function e() {
        var n = !1, i = mySettings.SessionID, t = common.GetJsonCookie("smartBannerCookie"), r, u;
        t ? (r = t.SessionId,
        u = t.IsClosed,
        r === i ? u || (n = !0) : n = !0) : n = !0;
        n && ($("#smartTopBanner").show(),
        common.SetCookie("smartBannerCookie", {
            SessionId: i,
            IsClosed: !1
        }))
    }
    function r() {
        layoutDesktop.MainHeaderTop = $(".header_main").offset().top
    }
    function o() {
        $.get(mySettings.ApplicationPath + "Shared/GetHeaderTopBanner", {}).done(function(n) {
            $("#bannerTopContainer").html(n);
            setTimeout(function() {
                e();
                r()
            })
        })
    }
    function s() {
        for (var i = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n)
            window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(n) {
            var t = (new Date).getTime()
              , r = Math.max(0, 16 - (t - i))
              , u = window.setTimeout(function() {
                n(t + r)
            }, r);
            return i = t + r,
            u
        }
        );
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
            clearTimeout(n)
        }
        )
    }
    var t = !1
      , n = !1;
    return {
        MainHeaderTop: 0,
        Init: function(n) {
            s();
            $("*").boxSizing();
            n && $("#mainHeader").removeClass().addClass(n);
            var t = $("#divSearch");
            t.length && ($(".header_main").click(function() {
                $("#divSearch").attr("class") == "search1" && $("#divSearch").switchClass("search1", "search", 100)
            }),
            $("#frmSearch").submit(function() {
                i()
            }),
            $("#divSearch").click(function(n) {
                n.stopPropagation()
            }));
            layoutDesktop.ScrollFunction();
            window.Common_FlashSale_EndDate && $.fnCMCountDown({
                untilDate: window.Common_FlashSale_EndDate
            });
            o()
        },
        ClickHeaderSearch: function() {
            var t = $(window).scrollTop()
              , n = $("#divSearch")
              , r = $(window).width();
            return (t > 10 || r <= 1020) && n.attr("class") === "search" ? (n.switchClass("search", "search1", 100),
            !1) : (i(),
            !0)
        },
        HandleOnScrolling: function() {
            var n = $(window).scrollTop(), t;
            typeof premium == "undefined" ? (typeof homePage != "undefined" && homePage.UpdateLayoutHomePage(n),
            u(n),
            f(n)) : (t = $("#premiumContainer").offset().top - 70,
            n > t ? $(".index_bar_premium1").addClass("fix_pre1") : $(".index_bar_premium1").removeClass("fix_pre1"))
        },
        ScrollFunction: function() {
            $(window).on("scroll", function() {
                window.requestAnimationFrame(layoutDesktop.HandleOnScrolling)
            })
        },
        CloseTopHeaderBanner: function(n) {
            var u, t, i;
            n === 1 && ($("#smartTopBanner").hide(),
            u = mySettings.SessionID,
            common.SetCookie("smartBannerCookie", {
                SessionId: u,
                IsClosed: !0
            }));
            n === 2 ? ($("#campaignTopBanner").hide(),
            t = common.GetJsonCookie("campaign_promotion_code"),
            t.IsClosed = !0,
            common.SetCookie("campaign_promotion_code", t)) : n === 3 && ($("#eventBannerTop").hide(),
            i = common.GetJsonCookie("event_banner_top"),
            i.IsClosed = !0,
            common.SetCookie("event_banner_top", i));
            r()
        },
        AmazonOffetTop: 0,
        UpdatePositionFormOrderAmazon: function(n) {
            if (!mySettings.IsMobileDevice && $(".american_L").length) {
                var t = $("#amazonRightCol");
                n > layoutDesktop.AmazonOffetTop && n <= $(".index_footer").offset().top - t.height() - 115 ? (t.addClass("fixed_right"),
                t.css("top", "20px")) : (t.removeClass("fixed_right"),
                t.css("top", ""))
            }
        }
    }
}();
!function(n, t, i, r, u, f, e) {
    n.fbq || (u = n.fbq = function() {
        u.callMethod ? u.callMethod.apply(u, arguments) : u.queue.push(arguments)
    }
    ,
    n._fbq || (n._fbq = u),
    u.push = u,
    u.loaded = !0,
    u.version = "2.0",
    u.queue = [],
    f = t.createElement(i),
    f.async = !0,
    f.src = r,
    e = t.getElementsByTagName(i)[0],
    e.parentNode.insertBefore(f, e))
}(window, document, "script", "//connect.facebook.net/en_US/fbevents.js");
fbq("init", "733399463406671");
fbq("track", "PageView");
var facebookMarketing = function() {
    return {
        productDetail: function(n) {
            fbq("track", "ViewContent", {
                content_name: n.content_name,
                content_category: n.content_category,
                content_ids: [n.content_ids],
                content_type: "product",
                value: n.value,
                currency: "VND"
            })
        },
        cartPage: function(n) {
            fbq("track", "AddToCart", {
                content_name: "Shopping Cart",
                content_ids: n.content_ids,
                content_type: "product",
                value: n.value,
                currency: "VND"
            })
        },
        paymentSuccess: function(n) {
            fbq("track", "Purchase", {
                content_ids: n.content_ids,
                content_type: "product",
                value: n.value,
                currency: "VND"
            })
        },
        searchPage: function() {
            fbq("track", "Search")
        },
        paymentInfoPage: function() {
            fbq("track", "AddPaymentInfo")
        },
        subscribleEmail: function() {
            fbq("track", "Lead")
        },
        subscribleEmailConfirmSuccess: function() {
            fbq("track", "CompleteRegistration")
        }
    }
}()
  , antsMarketing = function() {
    return {
        init: function() {
            $.ajax({
                url: "//e.anthill.vn/delivery-ants/conversion.js",
                dataType: "script",
                timeout: 5e3
            }).done(function(n) {
                $.globalEval(n);
                ants_analytic = ants_analytic || [];
                ants_analytic.push({
                    conversionId: "aaccaee3"
                });
                cmEvents.publish("ants_analytic_loaded", ants_analytic)
            })
        },
        productDetail: function(n) {
            try {
                ants_analytic.conversion({
                    conversionId: "aaccaee3",
                    customParams: [{
                        ecomm_prodid: n.content_ids,
                        ecomm_pagetype: "product",
                        ecomm_quantity: 1,
                        ecomm_totalvalue: n.value
                    }]
                })
            } catch (t) {
                console.log(t)
            }
        },
        cartPage: function(n) {
            try {
                ants_analytic.conversion({
                    conversionId: "aaccaee3",
                    customParams: n
                })
            } catch (t) {
                console.log(t)
            }
        },
        paymentSuccess: function(n) {
            try {
                ants_analytic.conversion({
                    conversionId: "aaccaee3",
                    customParams: n
                })
            } catch (t) {
                console.log(t)
            }
        }
    }
}()
  , shellService = function() {
    function n(n, t) {
        var r = $.Deferred(), i = {
            type: "POST",
            dataType: "json"
        }, u;
        return i = $.extend({}, i, n),
        u = mySettings.ApplicationPath || "/",
        i.url = u + n.url,
        i.url = i.url.replace("//", "/"),
        n.isPostForm ? (i.data = t,
        i.contentType = "application/x-www-form-urlencoded; charset=UTF-8") : (i.data = i.type === "POST" ? JSON.stringify(t) : t,
        i.contentType = "application/json; charset=utf-8"),
        $.ajax(i).done(function(n) {
            r.resolve(n)
        }).fail(function(n) {
            r.reject(n)
        }),
        r.promise()
    }
    return {
        ExecutePostAction: function(t, i) {
            var r = {
                url: t
            };
            return n(r, i)
        },
        ExecuteGetAction: function(t, i) {
            var r = {
                url: t,
                type: "GET"
            };
            return n(r, i)
        },
        ExecuteGetHtmlAction: function(t, i) {
            var r = {
                url: t,
                type: "GET",
                dataType: "html"
            };
            return n(r, i)
        },
        ExecutePostFormAction: function(t, i) {
            var r = {
                url: t,
                isPostForm: !0
            };
            return n(r, i)
        }
    }
}()
  , cmEvents = function() {
    var n = {}
      , t = n.hasOwnProperty;
    return {
        subscribe: function(i, r) {
            t.call(n, i) || (n[i] = []);
            var u = n[i].push(r) - 1;
            return {
                remove: function() {
                    delete n[i][u]
                }
            }
        },
        publish: function(i, r) {
            t.call(n, i) && n[i].forEach(function(n) {
                n(r != undefined ? r : {})
            })
        }
    }
}()
  , cart = function() {
    function n() {
        $(".selectUpdateQTY").on("change", function() {
            var n = $(this).val()
              , i = $(this).attr("dataid")
              , r = $(this).attr("datapage")
              , u = r == "cart";
            return t(i, n, u),
            !1
        })
    }
    function t(n, t, i) {
        n > 0 && t > 0 && $.post(mySettings.ApplicationPath + "Payment/JsonUpdateQuantity", {
            id: n,
            quantity: t,
            isCartPage: i
        }).done(function(n) {
            n = n || {};
            n.success && (i ? ($("#cartPage").html(n.HtmlCart),
            $("#cartTop").html(n.HtmlCartMenuTop)) : $("#divCartPayment").html(n.HtmlPaymentCart))
        }).error(function() {
            common.Alert("Lỗi khi cập nhật số lượng, vui lòng thử lại.")
        })
    }
    return {
        removeFromCart: function(n, t) {
            n = Number(n);
            n > 0 && $.post(window.mySettings.ApplicationPath + "Payment/RemoveFromCart", {
                id: n,
                page: t
            }).done(function(n) {
                n = n || {};
                console.log(n);
                n.Success && (t == "Checkout" && n.TotalItems == 0 ? location.reload() : (n.CartPartialView && $("#cartPage").html(n.CartPartialView),
                n.CheckoutPartialView && $("#step1CartListContainer").html(n.CheckoutPartialView),
                n.ShoppingCartPartialView && ($("#cartTop").html(n.ShoppingCartPartialView),
                $("#cartTopScroll").html(n.ShoppingCartPartialView)),
                n.SummaryOrderPartialView && ($("#summaryOrder").html(n.SummaryOrderPartialView),
                setTimeout(function() {
                    $("#spanTotalPay").text() === "0đ" && ($("#wrapperNoPaymentMethod").show(),
                    $("#wrapperHavePaymentMethod").hide())
                }, 1))))
            }).error(function() {
                common.Alert("Lỗi khi xóa sản phẩm, vui lòng thử lại.")
            })
        },
        registerChangeQuantity: function() {
            n()
        },
        cartPaging: function(n, t) {
            var r = Number($("#cart_PageIndex").val(), 0), f = Number($("#cart_TotalPage").val(), 0), u, i;
            if (n) {
                for (r--,
                r = r < 1 ? 1 : r,
                u = t * (r - 1) + 1,
                i = u + t; i < u + t * 2; i++)
                    $("#cart_li_" + i).hide();
                for (i = u; i < u + t; i++)
                    $("#cart_li_" + i).show()
            } else {
                for (r++,
                r = r > f ? f : r,
                u = t * (r - 1),
                i = u; i > u - t; i--)
                    $("#cart_li_" + i).hide();
                for (i = u; i < u + t; i++)
                    $("#cart_li_" + (i + 1)).show()
            }
            $('[data-id="cart_pagertext"]').html(r + "/" + f);
            $("#cart_PageIndex").val(r)
        }
    }
}();
$(function() {
    mySettings.IsMobileDevice && $("#birthdayText").length > 0 && $("#birthdayText").attr("data-val-date", "Ngày sinh không hợp lệ").datepicker({
        dateFormat: "dd/mm/yy",
        defaultDate: "1/1/1984",
        changeMonth: !0,
        changeYear: !0,
        yearRange: "-80:-10"
    })
});
login = function() {
    function n(n) {
        n.session && FB.logout()
    }
    return {
        GoogleLogin: function() {
            var n = 400
              , t = 600
              , i = (window.screen.height - n) / 2
              , r = (window.screen.height - t) / 2
              , u = window.open(mySettings.ApplicationPath + "Customer/GetTime?provider=Google&startUrl=" + window.location, "", "status=0,toolbar=0,width=" + t + ",height=" + n + ",top=" + i + ",left=" + r)
        },
        FacebookLogin: function() {
            var n = 800
              , t = 600
              , i = (window.screen.height - t) / 2
              , r = (window.screen.height - n) / 2
              , u = window.open(mySettings.ApplicationPath + "Customer/GetTime?provider=Facebook&startUrl=" + window.location, "", "status=0,toolbar=0,width=" + n + ",height=" + t + ",top=" + i + ",left=" + r)
        },
        YahooLogin: function() {
            var n = 400
              , t = 600
              , i = (window.screen.height - n) / 2
              , r = (window.screen.height - t) / 2
              , u = window.open(mySettings.ApplicationPath + "Customer/GetTime?provider=Yahoo&startUrl=" + window.location, "", "status=0,toolbar=0,width=" + t + ",height=" + n + ",top=" + i + ",left=" + r)
        },
        FacebookConnectMySite: function(n) {
            document.location = mySettings.ApplicationPath + "Customer/FacebookLogin?&uid=" + n.userID + "&token=" + n.accessToken + "&returnUrl=" + window.location
        },
        Logout: function() {
            FB.getLoginStatus(n)
        },
        PresetCustomer: function() {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: "@(LiuLoConfiguration.Facebook.AppId)",
                    status: !0,
                    cookie: !0,
                    xfbml: !0,
                    oauth: !0
                })
            }
            ,
            function() {
                var n = document.createElement("script");
                n.type = "text/javascript";
                n.src = document.location.protocol + "//connect.facebook.net/en_US/all.js";
                n.async = !0;
                document.getElementById("fb-root").appendChild(n)
            }()
        },
        ShowRegisterAlert: function() {
            var n = common.OpenDialog({
                message: $("#divRegisterAlert").html(),
                width: 450
            })
        },
        SwitchLoginOrRegister: function(n) {
            switch (n) {
            case "loginTab":
                $(".login").show();
                $(".register").hide();
                $("#Email").focus();
                $("#loginTab").removeClass();
                $("#loginTab").addClass("actived");
                $("#registerTab").removeClass();
                break;
            case "registerTab":
                $(".register").show();
                $(".login").hide();
                $("#RegisterEmail").focus();
                $("#registerTab").removeClass();
                $("#registerTab").addClass("actived");
                $("#loginTab").removeClass();
                break;
            default:
                $(".login").show();
                $(".register").hide();
                $("#Email").focus();
                $("#loginTab").removeClass();
                $("#loginTab").addClass("actived");
                $("#registerTab").removeClass()
            }
            $(".validation-summary-errors").switchClass("validation-summary-errors", "validation-summary-valid", 0)
        }
    }
}(),
function(n) {
    n.fn.cmcountdown = function(t) {
        return this.each(function() {
            function f(n, t, u, f) {
                n > 0 && (t = n * 24 + t);
                var e = new Date;
                e >= i.untilDate ? i.endText != "" && i.txtDisplayer && i.txtDisplayer.html(i.endText) : i.noStyle ? i.displayDay ? t >= 24 ? (t = t - 24 * n,
                r.html(common.DisplayTimeWithTwoNumber(n) + " ngày " + common.DisplayTimeWithTwoNumber(t) + ":" + common.DisplayTimeWithTwoNumber(u) + ":" + common.DisplayTimeWithTwoNumber(f))) : r.html(common.DisplayTimeWithTwoNumber(t) + ":" + common.DisplayTimeWithTwoNumber(u) + ":" + common.DisplayTimeWithTwoNumber(f)) : r.html(common.DisplayTimeWithTwoNumber(t) + ":" + common.DisplayTimeWithTwoNumber(u) + ":" + common.DisplayTimeWithTwoNumber(f)) : (i.countdownSelectors.day.length != 0 && (n == 0 ? i.countdownSelectors.day.hide() : i.countdownSelectors.day.html(common.DisplayTimeWithTwoNumber(n))),
                i.countdownSelectors.hour.html(common.DisplayTimeWithTwoNumber(t)),
                i.countdownSelectors.minute.html(common.DisplayTimeWithTwoNumber(u)),
                i.countdownSelectors.second.html(common.DisplayTimeWithTwoNumber(f)))
            }
            function e() {
                var n = new Date, t;
                n = new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds());
                n >= i.untilDate ? (f(0, 0, 0, 0),
                u && clearInterval(u)) : (t = common.GetTimeSpan(i.untilDate, n),
                f(t.totalDays, t.totalHours, t.totalMinutes, t.totalSeconds))
            }
            var r = n(this), i, u;
            t = t || {};
            i = {
                untilDate: new Date,
                noStyle: !0,
                displayDay: !1,
                endText: "",
                txtDisplayer: null ,
                countdownSelectors: {
                    day: r.find(".day"),
                    hour: r.find(".hour"),
                    minute: r.find(".minute"),
                    second: r.find(".second")
                }
            };
            i = n.extend(!0, {}, i, t);
            e();
            u = setInterval(function() {
                e()
            }, 1e3)
        })
    }
    ;
    n.fn.showmap = function(t) {
        "use strict";
        var s, r, f, e;
        if (typeof t != "undefined" && t && t.locations && t.locations.length != 0) {
            for (s = {
                zoom: 12,
                icon: {
                    url: "",
                    width: 0,
                    height: 0
                }
            },
            t = n.extend(!0, {}, s, t),
            f = 0; f < t.locations.length; f++)
                if (e = t.locations[f],
                typeof e.center != "undefined" && e.center === !0) {
                    r = e;
                    break
                }
            typeof r == "undefined" && (r = t.locations[0]);
            var i = new google.maps.Map(document.getElementById(this.attr("id")),{
                zoom: t.zoom,
                center: new google.maps.LatLng(r.lat,r.lon),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }), c = new google.maps.MarkerImage(t.icon.url,null ,null ,null ,new google.maps.Size(t.icon.width,t.icon.height)), h = new google.maps.InfoWindow, o, u;
            n.each(t.locations, function(n, t) {
                o = new google.maps.Marker({
                    position: new google.maps.LatLng(t.lat,t.lon),
                    map: i,
                    icon: c
                });
                google.maps.event.addListener(i, "zoom_changed", function() {
                    u = i.getZoom()
                });
                google.maps.event.addListener(o, "dblclick", function() {
                    u = i.getZoom() + 1;
                    u == 20 && (u = 10);
                    i.setZoom(u)
                });
                google.maps.event.addListener(o, "click", function(n) {
                    return function() {
                        typeof t.name != "undefined" && t.name && (h.setContent(t.name),
                        h.open(i, n))
                    }
                }(o))
            })
        }
    }
}(jQuery),
function(n) {
    function f(n, t, i, u) {
        n > 0 && (t = n * 24 + t);
        r.html(common.DisplayTimeWithTwoNumber(t) + ":" + common.DisplayTimeWithTwoNumber(i) + ":" + common.DisplayTimeWithTwoNumber(u))
    }
    function u() {
        var n = new Date, r;
        n = new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds());
        n >= t.untilDate ? (f(0, 0, 0, 0),
        i && clearInterval(i)) : (r = common.GetTimeSpan(t.untilDate, n),
        f(r.totalDays, r.totalHours, r.totalMinutes, r.totalSeconds))
    }
    var i, r, t;
    n.fnCMCountDown = function(f) {
        if (f = f || {},
        t = f,
        t.selector = t.selector || ".countdown",
        n.fnCMCountDown_update(),
        r.length !== 0) {
            if (typeof t.untilDate == "undefined" || !(t.untilDate instanceof Date))
                throw new Error("untilDate attribute isn't valid");
            i = setInterval(function() {
                u()
            }, 1e3);
            u()
        }
    }
    ;
    n.fnCMCountDown_update = function() {
        i || (i = setInterval(function() {
            u()
        }, 1e3));
        t && (r = n("body").find(t.selector))
    }
}(jQuery),
function(n, t, i) {
    n.fn.lazy = function(r) {
        function o(i) {
            typeof i != "boolean" && (i = !1);
            e.each(function() {
                var r = n(this), o = this.tagName.toLowerCase(), e, c;
                if ((a(r) || i) && r.attr(u.attribute) && (o == "img" && r.attr(u.attribute) != r.attr("src") || o != "img" && r.attr(u.attribute) != r.css("background-image")) && !r.data("loaded") && (r.is(":visible") || !u.visibleOnly)) {
                    e = n(new Image);
                    ++s;
                    u.onError ? e.error(function() {
                        f(u.onError, r);
                        h()
                    }) : e.error(function() {
                        h()
                    });
                    c = !0;
                    e.one("load", function() {
                        var n = function() {
                            if (c) {
                                t.setTimeout(n, 100);
                                return
                            }
                            r.hide();
                            o == "img" ? r.attr("src", e.attr("src")) : r.css("background-image", "url(" + e.attr("src") + ")");
                            r[u.effect](u.effectTime);
                            u.removeAttribute && r.removeAttr(u.attribute);
                            f(u.afterLoad, r);
                            e.unbind("load");
                            e.remove();
                            h()
                        }
                        ;
                        n()
                    });
                    f(u.beforeLoad, r);
                    e.attr("src", r.attr(u.attribute));
                    f(u.onLoad, r);
                    c = !1;
                    e.complete && e.load();
                    r.data("loaded", !0)
                }
            });
            e = n(e).filter(function() {
                return !n(this).data("loaded")
            })
        }
        function c() {
            u.delay >= 0 && setTimeout(function() {
                o(!0)
            }, u.delay);
            (u.delay < 0 || u.combined) && (o(!1),
            n(u.appendScroll).bind("scroll", l(u.throttle, o)),
            n(u.appendScroll).bind("resize", l(u.throttle, o)))
        }
        function a(n) {
            var t = i.documentElement.scrollTop ? i.documentElement.scrollTop : i.body.scrollTop;
            return t + v() + u.threshold > n.offset().top + n.height()
        }
        function v() {
            return t.innerHeight ? t.innerHeight : i.documentElement && i.documentElement.clientHeight ? i.documentElement.clientHeight : i.body && i.body.clientHeight ? i.body.clientHeight : i.body && i.body.offsetHeight ? i.body.offsetHeight : u.fallbackHeight
        }
        function l(n, t) {
            function f() {
                function f() {
                    r = +new Date;
                    t.apply()
                }
                var e = +new Date - r;
                i && clearTimeout(i);
                e > n || !u.enableThrottle ? f() : i = setTimeout(f, n - e)
            }
            var i, r = 0;
            return f
        }
        function h() {
            --s;
            e.size() || s || f(u.onFinishedAll, null )
        }
        function f(n, t) {
            n && (t !== null  ? n(t) : n())
        }
        var u = {
            bind: "load",
            threshold: 500,
            fallbackHeight: 2e3,
            visibleOnly: !0,
            appendScroll: t,
            delay: -1,
            combined: !1,
            attribute: "data-src",
            removeAttribute: !0,
            effect: "show",
            effectTime: 0,
            enableThrottle: !1,
            throttle: 250,
            beforeLoad: null ,
            onLoad: null ,
            afterLoad: null ,
            onError: null ,
            onFinishedAll: null 
        }, e, s;
        return r && n.extend(u, r),
        e = this,
        s = 0,
        u.bind == "load" ? n(t).load(c) : u.bind == "event" && c(),
        u.onError && e.bind("error", function() {
            f(u.onError, n(this))
        }),
        this
    }
    ;
    n.fn.Lazy = n.fn.lazy
}(jQuery, window, document);
internalTracking = function() {
    function u(n) {
        return n.toLowerCase() == "popup" ? "popup" : n.split("_")[1]
    }
    function f() {
        for (var r, f, t = {}, i = ["source", "medium", "campaign", "content", "url", "type"], o = window.location.search.substring(1), e = o.split("&"), n = 0; n < e.length; n++)
            r = e[n].split("="),
            f = u(r[0]),
            i.indexOf(f) !== -1 && (t[f] = decodeURIComponent(r[1]));
        for (n = 0; n < i.length; n++)
            t[i[n]] = t[i[n]] || "";
        return t
    }
    function t(t) {
        window._gacmc = t;
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            url: n.apiTrackingUrl,
            data: JSON.stringify(_gacmc),
            success: function() {},
            error: function(n) {
                console.log(n)
            }
        })
    }
    function e() {
        var t = common.GetJsonCookie(n.cmctrackingconversionCookieName);
        return typeof t != "undefined" ? t : {}
    }
    function r() {
        var t = common.GetJsonCookie(n.cmctrackingCookieName), i, u, r;
        return typeof t != "undefined" && t != null  ? (i = common.GetJsonCookie(n.campaignPopupCookieName),
        i ? t.popup = i.Value : (u = common.GetJsonCookie(n.defaultPopupCookieName),
        u && (t.popup = n.defaultPopupCookieName)),
        typeof n.leadInPlace != "undefined" ? t.leadInPlace = n.leadInPlace : n.isNewUser ? t.leadInPlace = 4 : (r = common.GetCookie(n.campaign6SCookieName),
        r && r == "1" && (t.leadInPlace = 5,
        common.DeleteCookie(n.campaign6SCookieName))),
        t) : e()
    }
    function o(n, t) {
        for (var i in n)
            if (n.hasOwnProperty(i) && n[i] !== t[i])
                return !1;
        return !0
    }
    function i(t) {
        var u, i, r;
        if (t = t || {},
        t.CreatedDate = new Date,
        t.source != "direct") {
            common.SetCookie(n.cmctrackingconversionCookieName, t, n.expiring);
            return
        }
        if (u = common.GetJsonCookie(n.cmctrackingconversionCookieName),
        !u || !u.CreatedDate) {
            common.SetCookie(n.cmctrackingconversionCookieName, t, n.expiring);
            return
        }
        (i = u.CreatedDate,
        i = new Date(i),
        r = new Date,
        r.setDate(r.getDate()),
        i.getDate() !== r.getDate() || i.getMonth() !== r.getMonth() || i.getFullYear() !== r.getFullYear()) && common.SetCookie(n.cmctrackingconversionCookieName, t, n.expiring)
    }
    window._gacmc = window._gacmc || {};
    var n = {
        cmctrackingCookieName: "cmctracking",
        cmctrackingconversionCookieName: "cmctrackingconversion",
        campaignPopupCookieName: "campaign_popup",
        defaultPopupCookieName: "default_popup",
        campaign6SCookieName: "campaign_6s",
        expiring: {
            expires: 3,
            path: "/"
        },
        apiTrackingUrl: "",
        ownerUrl: ""
    };
    return {
        initUserCatogory: function(t) {
            $.extend(!0, n, t)
        },
        run: function() {
            var u, e;
            (n.isNewSession && document.referrer.indexOf(n.ownerUrl) === -1 || window.location.search.indexOf("utm_source") !== -1) && function() {
                var r, t = f(), e, u;
                t.source || (e = document.referrer,
                t.source = e === "" ? "direct" : "organic");
                u = common.GetJsonCookie(n.cmctrackingCookieName);
                u ? o(u, t) ? (r = common.GetJsonCookie(n.cmctrackingconversionCookieName),
                r ? i(t) : common.SetCookie(n.cmctrackingCookieName, u, n.expiring)) : i(t) : (r = common.GetJsonCookie(n.cmctrackingconversionCookieName),
                r ? (common.SetCookie(n.cmctrackingCookieName, r, n.expiring),
                i(t)) : common.SetCookie(n.cmctrackingCookieName, t, n.expiring))
            }();
            n.isLead ? (u = r(),
            u = u || {},
            u.email = n.email,
            u.usercategory = "0",
            u.newsletterStatus = 1,
            t(u)) : n.isNewUser ? (u = r(),
            u = u || {},
            u.userId = n.userId,
            u.usercategory = "1",
            u.email = n.email,
            u.newsletterStatus = n.isNewsletter ? 1 : 0,
            t(u)) : n.isOrder && (e = common.GetJsonCookie(n.cmctrackingconversionCookieName),
            e || (e = common.GetJsonCookie(n.cmctrackingCookieName)),
            e = e || {},
            e.userId = n.userId,
            e.usercategory = "2",
            e.orderId = n.orderId,
            t(e))
        },
        trackingToServer: function(n) {
            t(n)
        }
    }
}(),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    if (n.support.cors || !n.ajaxTransport || !window.XDomainRequest)
        return n;
    var t = /^(https?:)?\/\//i
      , i = /^get|post$/i
      , r = new RegExp("^(//|" + location.protocol + ")","i");
    return n.ajaxTransport("* text html xml json", function(u, f) {
        if (u.crossDomain && u.async && i.test(u.type) && t.test(u.url) && r.test(u.url)) {
            var e = null ;
            return {
                send: function(t, i) {
                    var o = ""
                      , r = (f.dataType || "").toLowerCase();
                    e = new XDomainRequest;
                    /^\d+$/.test(f.timeout) && (e.timeout = f.timeout);
                    e.ontimeout = function() {
                        i(500, "timeout")
                    }
                    ;
                    e.onload = function() {
                        var o = "Content-Length: " + e.responseText.length + "\r\nContent-Type: " + e.contentType, u = {
                            code: 200,
                            message: "success"
                        }, f = {
                            text: e.responseText
                        }, t;
                        try {
                            if (r === "html" || /text\/html/i.test(e.contentType))
                                f.html = e.responseText;
                            else if (r === "json" || r !== "text" && /\/json/i.test(e.contentType))
                                try {
                                    f.json = n.parseJSON(e.responseText)
                                } catch (h) {
                                    u.code = 500;
                                    u.message = "parseerror"
                                }
                            else if (r === "xml" || r !== "text" && /\/xml/i.test(e.contentType)) {
                                t = new ActiveXObject("Microsoft.XMLDOM");
                                t.async = !1;
                                try {
                                    t.loadXML(e.responseText)
                                } catch (h) {
                                    t = undefined
                                }
                                if (!t || !t.documentElement || t.getElementsByTagName("parsererror").length) {
                                    u.code = 500;
                                    u.message = "parseerror";
                                    throw "Invalid XML: " + e.responseText;
                                }
                                f.xml = t
                            }
                        } catch (s) {
                            throw s;
                        } finally {
                            i(u.code, u.message, f, o)
                        }
                    }
                    ;
                    e.onprogress = function() {}
                    ;
                    e.onerror = function() {
                        i(500, "error", {
                            text: e.responseText
                        })
                    }
                    ;
                    f.data && (o = n.type(f.data) === "string" ? f.data : n.param(f.data));
                    e.open(u.type, u.url);
                    e.send(o)
                },
                abort: function() {
                    e && e.abort()
                }
            }
        }
    }),
    n
});
Array.prototype.indexOf || (Array.prototype.indexOf = function(n) {
    var i = this.length >>> 0
      , t = Number(arguments[1]) || 0;
    for (t = t < 0 ? Math.ceil(t) : Math.floor(t),
    t < 0 && (t += i); t < i; t++)
        if (t in this && this[t] === n)
            return t;
    return -1
}
);
campaign = function() {
    function u(t) {
        common.SetCookie(n.defaultPopupCookieName, {
            Value: 1,
            IsUsed: t
        }, {
            expires: mySettings.ExpiredPopup
        })
    }
    function e() {
        i === n.campaignPopupCookieName ? common.SetCookie(n.campaignPopupCookieName, {
            Value: t.Value,
            IsUsed: !0
        }) : i === n.defaultPopupCookieName && u(!0)
    }
    function f(t) {
        shellService.ExecuteGetAction("Campaign/GetBannerForCampaign", {
            campaignValue: t
        }).then(function(u) {
            u.IsSuccess && (i = t == n.defaultPopupCookieName ? n.defaultPopupCookieName : n.campaignPopupCookieName,
            common.SendTrackingEvent("Campaign_Popup", "Open", t),
            r = common.OpenDialog({
                message: u.Html,
                showBrand: !1,
                closeCallback: e,
                width: "auto",
                modal: !0
            }),
            window.mySettings.IsOpeningPopup = !0)
        }).fail(function() {
            common.Alert("Có lỗi xảy ra, vui lòng thử lại.")
        })
    }
    function o() {
        shellService.ExecuteGetAction("Campaign/GetCampaignRightCorner", {}).then(function(n) {
            n.IsSuccess && $("#containerCampaignRightCorner").html(n.Html)
        }).fail(function() {
            common.Alert("Có lỗi xảy ra, vui lòng thử lại.")
        })
    }
    var r, t, i, n = {
        campaignPopupCookieName: "campaign_popup",
        defaultPopupCookieName: "default_popup",
        rightCornerCookieName: "right_corner"
    };
    return {
        Init: function() {
            var r, e, s, h, i, c;
            if (!window.mySettings.IsAuthenticated && (r = common.GetCookie("is_email_registerred"),
            r != "1")) {
                if (e = common.GetQueryStringValue("utm_source"),
                s = common.GetQueryStringValue("utm_campaign"),
                e == "email" && s != "acquisition") {
                    common.SetCookie("is_email_registerred", 1, {
                        expires: 3650
                    });
                    return
                }
                (h = common.GetQueryStringValue("popup"),
                h != "0") && (t = common.GetJsonCookie(n.campaignPopupCookieName),
                i = common.GetJsonCookie(n.defaultPopupCookieName),
                t || i && i.IsUsed != !1 ? t && !t.IsUsed ? f(t.Value) : window.mySettings.IsDetailPage && (t && t.IsUsed || i && i.IsUsed) && (c = common.GetCookie("right_corner"),
                c || o()) : (i && i.IsUsed != !1 || f(n.defaultPopupCookieName),
                i || u(!1)))
            }
        },
        SubcriberCampaign: function(t, u) {
            var f = $("#campaignEmail").val(), e;
            if ($.trim(f) === "") {
                $("#emailCampaignError").html("Vui lòng nhập email");
                $("#emailCampaignError").show();
                $("#campaignEmail").addClass("input-validation-error");
                $("#campaignEmail").focus();
                return
            }
            if (!common.IsValidEmail(f)) {
                $("#emailCampaignError").html("Email không hợp lệ");
                $("#emailCampaignError").show();
                $("#campaignEmail").addClass("input-validation-error");
                $("#campaignEmail").focus();
                return
            }
            common.BlockUI();
            e = common.GetValueByQueryString("loc");
            shellService.ExecutePostAction("Campaign/SubcriberCampaign", {
                email: f,
                gender: t,
                location: e
            }).then(function(e) {
                if (common.UnblockUI(),
                e.success)
                    if (e.existingEmail)
                        $("#emailCampaignError").html("Email này đã được đăng ký, <a href='/thong-tin-tai-khoan'>click vào đây<\/a> để quản lý"),
                        $("#emailCampaignError").show(),
                        $("#campaignEmail").addClass("input-validation-error"),
                        $("#campaignEmail").focus();
                    else {
                        r ? r.dialog("close") : ($("#rightCornerPopup").remove(),
                        campaign.CloseRightCornerPopup());
                        common.Alert("Vui lòng kiểm tra email " + f + " để nhận ngay QUÀ CỰC HOT. Nếu không thấy bạn vui lòng kiểm tra trong hộp thư rác");
                        $("#emailCampaignError").hide();
                        $("#campaignEmail").removeClass("input-validation-error");
                        u ? layout.InternalTrackingForSubscribe(f, u) : layout.InternalTrackingForSubscribe(f, i == "default_popup" || i == "campaign_popup" ? 1 : null );
                        var o = ""
                          , s = /[\?\&]popup=[^&]+/i.exec(window.location);
                        s && s.length > 0 ? o = s[0].substring(7) + "|" : i == n.defaultPopupCookieName ? o = "default_popup|" : u == 3 && (o = "right_corner_popup|");
                        common.SendTrackingEvent("Campaign_Popup", "Subscribe", o + t)
                    }
                else
                    common.Alert("Có lỗi xảy ra, vui lòng thử lại.")
            }).fail(function() {
                common.UnblockUI();
                common.Alert("Có lỗi xảy ra, vui lòng thử lại.")
            })
        },
        CloseRightCornerPopup: function() {
            common.SetCookie(n.rightCornerCookieName, 1, {
                expires: mySettings.ExpiredPopup
            })
        }
    }
}()
