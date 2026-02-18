/* SPLODER.TagModel - Tag assignment model */
    (SPLODER.TagModel = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = [],
            t = this,
            i = 7;
        (this.init = function () {
            (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++;
            for (var t = 0 - i; 64 >= t; t++) e[t + i] = [];
            return (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
        }),
            (this.initWithData = function (e) {
                this.init(), s(e);
            }),
            (this.setTag = function (t, s, o) {
                isNaN(t) ||
                    isNaN(s) ||
                    (o
                        ? -1 == e[t + i].indexOf(s) && (e[t + i].push(s), this.changed.dispatch(SPLODER.ACTION_CHANGE, t, s))
                        : -1 != e[t + i].indexOf(s) && (e[t + i].splice(e[t + i].indexOf(s), 1), this.changed.dispatch(SPLODER.ACTION_CHANGE, t, s)));
            }),
            (this.getTags = function (t) {
                return e.reduce(function (e, s, o) {
                    return -1 != s.indexOf(t) && e.push(o - i), e;
                }, []);
            }),
            (this.hasTag = function (t, s) {
                return !isNaN(t) && !isNaN(s) && -1 != e[t + i].indexOf(s);
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
                for (var t = [], s = 0 - i; 64 >= s; s++) t[s + i] = e[s + i].join(",");
                return t.join("|");
            });
        var s = function (s) {
            for (var o = s.split("|"), n = 0 - i; 64 >= n; n++) e[n + i] = o[n + i] ? SPLODER.parseFloatArray(o[n + i].split(",")) : [];
            t.changed.dispatch(SPLODER.ACTION_CHANGE);
        };
        this.onAction = function (e) {
            if (e) {
                var t = e[0];
                switch (t) {
                    case SPLODER.ACTION_CHANGE:
                        var i = e[1],
                            s = e[2],
                            o = e[3];
                        this.setTag(s, i, o), this.saveUndo();
                }
            }
        };
    }),
