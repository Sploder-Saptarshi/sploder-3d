/* SPLODER.EnvModel - Environment model (sky color, etc.) */
    (SPLODER.EnvModel = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = null,
            t = 0,
            i = this;
        Object.defineProperty(this, "currentLevel", {
            get: function () {
                return t;
            },
            set: function (e) {
                o(e);
            },
        }),
            (this.init = function () {
                return (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++, (e = []), (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
            }),
            (this.initWithData = function (e) {
                this.init(), s(e);
            }),
            (this.setEnv = function (i, s) {
                (i = i || 0), e[t] || (e[t] = []), (e[t][i] = s);
            }),
            (this.getEnvs = function () {
                return e[t] || [];
            }),
            (this.hasEnv = function (i) {
                return e && e[t] && e[t][i];
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.serialize = function () {
                for (var t = [], i = 0; i < e.length; i++) t[i] = e[i] instanceof Array ? e[i].join(",") : "";
                return t.join("|");
            });
        var s = function (t) {
            for (var s = t.split("|"), o = 0; o < s.length; o++) e[o] = s[o] ? SPLODER.parseFloatArray(s[o].split(",")) : [];
            i.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CHANGE]);
        },
            o = function (e) {
                !isNaN(e) && e >= 0 && ((t = e), i.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CONTEXT_CHANGE, t]));
            };
        this.onAction = function (e) {
            if (e) {
                var t = e[0];
                switch (t) {
                    case SPLODER.ACTION_CHANGE:
                        switch ((console.log(e), e[2])) {
                            case SPLODER.EnvModel.PROPERTY_SKY_COLOR:
                                this.saveUndo();
                                var i = e[3],
                                    s = e[4] || 0;
                                this.setEnv(SPLODER.EnvModel.PROPERTY_SKY_COLOR, i.getHex(), s), this.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CHANGE, SPLODER.EnvModel.PROPERTY_SKY_COLOR, i]);
                        }
                }
            }
        };
    }),
    (SPLODER.EnvModel.ENVIRONMENT = -10),
    (SPLODER.EnvModel.PROPERTY_SKY_COLOR = 0),
