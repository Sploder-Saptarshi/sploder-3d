/* SPLODER bind, button, and DOM utility functions */
    (SPLODER._documentConnected = !1),
    (SPLODER._holdInterval = 0),
    (SPLODER.bind = function (e, t) {
        return function () {
            t.apply(e, arguments);
        };
    }),
    (SPLODER.bindWithFuncRef = function (e, t, i) {
        var s = function () {
            t.call(e, arguments[0], s, i);
        };
        return s;
    }),
    (SPLODER.bindInteractions = function (e, t, i, s, o) {
        e &&
            t &&
            ((e.interactive = !0),
                (e.buttonMode = !0),
                i && (e.mousedown = e.touchstart = SPLODER.bind(t, i)),
                s && (e.mousemove = e.touchmove = SPLODER.bind(t, s)),
                o && (e.mouseup = e.mouseupoutside = e.touchend = e.touchendoutside = SPLODER.bind(t, o)));
    }),
    (SPLODER.connectButtons = function (e, t, i, s, o) {
        t = t || document;
        var n,
            a,
            r = t.getElementsByTagName("a");
        if (i) {
            for (a = 0; a < r.length; a++) (n = r.item(a)), SPLODER._connectButton(e, n, i, s, o);
            if (!SPLODER._documentConnected) {
                if (s)
                    for (a = 0; a < document.forms.length; a++)
                        document.forms[a].onchange = function (t) {
                            s.call(e, t.target);
                        };
                var h = function () {
                    clearInterval(SPLODER._holdInterval);
                };
                document.addEventListener("mouseup", h), document.addEventListener("touchend", h), (SPLODER._documentConnected = !0);
            }
        }
    }),
    (SPLODER._connectButton = function (e, t, i, s, o) {
        var n,
            a,
            r = !1,
            h = function (t) {
                !a && t && i.call(e, t.target.dataset.id, t.target, t.target.dataset.value, t), (a = !1);
            },
            l = function (e) {
                clearInterval(SPLODER._holdInterval),
                    (n = Date.now()),
                    (r = !0),
                    (SPLODER._holdInterval = setInterval(function () {
                        E.call(null, e);
                    }, 125));
            },
            E = function (t) {
                t && t.target && Date.now() - n > 500 && (i.call(e, t.target.dataset.id, t.target, t.target.dataset.value, t), (a = !0));
            },
            d = function (i) {
                if ((clearInterval(SPLODER._holdInterval), r && i.target.parentNode == t && ((r = !1), o))) {
                    var s = i.target;
                    o.call(e, s.dataset.id, s, s.dataset.value, i);
                }
            };
        t.onclick || ((t.onclick = h), t.addEventListener("mousedown", l), t.addEventListener("mouseout", d), t.addEventListener("mouseup", d), t.addEventListener("touchstart", l), t.addEventListener("touchend", d));
    }),
    (SPLODER.clearClassListById = function (e) {
        var t = document.getElementById(e);
        t && (t.className = "");
    }),
    (SPLODER.getClassListById = function (e) {
        return SPLODER.getClassList(document.getElementById(e));
    }),
    (SPLODER.hasClass = function (e, t) {
        var i = SPLODER.getClassListById(e);
        return i ? i.contains(t) : void 0;
    }),
    (SPLODER.setClass = function (e, t, i) {
        var s = SPLODER.getClassListById(e);
        s && (i ? s.remove(t) : s.add(t));
    }),
    (SPLODER.getClassList = function (e) {
        return e ? e.classList : void 0;
    }),
    (SPLODER.enableButtons = function () {
