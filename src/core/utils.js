/* SPLODER utility functions: attribs, easing, math, etc. */
        arguments.length && SPLODER.setButtonsState(arguments, !0);
    }),
    (SPLODER.disableButtons = function () {
        arguments.length && SPLODER.setButtonsState(arguments, !1);
    }),
    (SPLODER.setButtonsState = function (e, t) {
        for (var i = 0; i < e.length; i++) {
            var s = document.querySelector('[data-id="' + e[i] + '"]');
            if (s) {
                var o = s.classList;
                if (o) {
                    t ? o.remove("disabled") : o.add("disabled");
                    var n = s.parentNode.parentNode;
                    n && "LABEL" == n.nodeName && (t ? n.classList.remove("disabled") : n.classList.add("disabled"), "INPUT" == n.firstChild.nodeName && (n.firstChild.disabled = !t));
                }
            }
        }
    }),
    (SPLODER.buttonIsEnabled = function (e) {
        var t = document.querySelector('[data-id="' + e + '"]');
        return t ? !t.classList.contains("disabled") : !1;
    }),
    (SPLODER.hide = function (e) {
        for (var t = $$$(e), i = t.length; i--;) t[i].classList.add("hidden");
    }),
    (SPLODER.parseFloatArray = function (e) {
        if (e instanceof Array)
            for (var t = e.length; t--;) {
                var i = e[t],
                    s = parseFloat(i);
                e[t] = isNaN(s) ? i : s;
            }
        return e;
    }),
    (SPLODER.shallowCopyUniforms = function (e, t, i) {
        for (var s in t) e.hasOwnProperty(s) && (i && -1 != i.indexOf(s) ? (t[s] = e[s]) : (t[s].value = e[s].value));
    }),
    (SPLODER.setAttrib = function (e, t, i, s, o, n) {
        (s = s || 0), (o = o || 255), e.setAttrib(t, Math.min(o, Math.max(s, i)), n);
    }),
    (SPLODER.incrementAttrib = function (e, t, i, s, o, n) {
        var a = e.getAttrib(t, n);
        isNaN(a) && (a = Math.max(0, s)), isNaN(i) || (isNaN(s) && (s = -1e4), isNaN(o) && (o = 1e4), e.setAttrib(t, Math.max(s, Math.min(o, a + i)), n));
    }),
    (SPLODER.modAttrib = function (e, t, i, s, o) {
        var n = e.getAttrib(t, o);
        isNaN(n) && (n = 0), isNaN(s) && (s = 360), isNaN(i) || e.setAttrib(t, (n + i) % s, o);
    }),
    (SPLODER.toggleAttrib = function (e, t, i) {
        var s = e.getAttrib(t, i);
        e.setAttrib(t, 1 === parseInt(s) ? 0 : 1, i);
    }),
    (SPLODER.weightedValue = function (e) {
        e = e || 0;
        var t,
            i,
            s,
            o = 0;
        for (t = 1; t < arguments.length; t += 2) (i = arguments[t]), (s = arguments[t + 1]), (o += (i - 1) * s);
        return o + 1 + e;
    }),
    (SPLODER.lerp = function (e, t, i) {
        return (i = Math.max(0, Math.min(1, i))), e + (t - e) * i;
    }),
    (SPLODER.easeInQuad = function (e, t, i, s) {
        return (e /= s), i * e * e + t;
    }),
    (SPLODER.easeOutQuad = function (e, t, i, s) {
        return (e /= s), -i * e * (e - 2) + t;
    }),
    (SPLODER.easeInCubic = function (e, t, i, s) {
        return (e /= s), i * e * e * e + t;
    }),
    (SPLODER.easeOutCubic = function (e, t, i, s) {
        return (e /= s), e--, i * (e * e * e + 1) + t;
    }),
    (SPLODER.util = {}),
    (SPLODER.util.modulo = function (e, t) {
        return ((e % t) + t) % t;
    }),
    (SPLODER.util.zeroPad = function (e, t) {
        for (var i = e + ""; i.length < t;) i = "0" + i;
        return i;
    }),
    (SPLODER.util.isIE = function () {
        return -1 !== navigator.appVersion.indexOf("MSIE") || -1 !== navigator.appVersion.indexOf("Trident");
    }),
    (SPLODER.util.supports_html5_storage = function () {
        try {
            return "localStorage" in window && null !== window.localStorage;
        } catch (e) {
            return !1;
        }
    });
