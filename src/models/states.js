/* SPLODER.States - Multi-state value storage */
    (SPLODER.States = function () {
        var e;
        (this.init = function () {
            return (e = [[]]), this;
        }),
            (this.initWithValues = function (e) {
                if ((this.init(), e instanceof Array)) for (var t = e.length; t--;) this.setValue(t, e[t], 0);
            }),
            (this.clearState = function (t) {
                e[t] = [];
            }),
            (this.hasState = function (t) {
                return isNaN(t) && (t = 0), e[t] instanceof Array && e[t].length;
            }),
            (this.hasFrame = function (t, i) {
                return t >= 0 && i >= 0 && e[i] instanceof Array && void 0 != e[i][t] ? !0 : !1;
            }),
            (this.hasFrames = function (t) {
                if (t >= 0) for (var i = 1; i < e.length; i++) if (e[i] instanceof Array && void 0 != e[i][t]) return !0;
                return !1;
            }),
            (this.offsetFrames = function (t, i) {
                if (t >= 0) for (var s = 1; s < e.length; s++) e[s] instanceof Array && !isNaN(e[s][t]) && (e[s][t] += i);
            }),
            (this.hasValue = function (t, i) {
                return isNaN(i) && (i = 0), e[i] instanceof Array ? void 0 != e[i][t] && null != e[i][t] : !1;
            }),
            (this.getValue = function (t, i) {
                return isNaN(i) && (i = 0), e[i] instanceof Array ? e[i][t] : null;
            }),
            (this.setValue = function (t, i, s) {
                isNaN(s) && (s = 0), e[s] || (e[s] = []), (e[s][t] = i);
            }),
            (this.serialize = function () {
                return JSON.stringify(e);
            }),
            (this.unserialize = function (t) {
                var i, s;
                try {
                    (i = JSON.parse(t)), i instanceof Array ? (e = i) : this.init();
                } catch (o) {
                    if ((console.log("JSON ERROR:", o), console.log(t), "string" == typeof t && (t = t.split(",")), t instanceof Array))
                        for (var n = 0; n < t.length; n++)
                            (s = t[n]), s && ("number" == typeof s ? this.setValue(n, s) : -1 != s.indexOf(".") ? this.setValue(n, parseFloat(s)) : isNaN(s) ? this.setValue(n, s) : this.setValue(n, parseInt(s)));
                }
            });
    }),
