/* SPLODER.Levels - Multi-level management */
    (SPLODER.Levels = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = null,
            t = this;
        (this.model = null), (this.envModel = null);
        var i = 0,
            s = 0,
            o = 1;
        Object.defineProperty(this, "currentLevel", {
            get: function () {
                return s;
            },
            set: function (e) {
                a(e);
            },
        }),
            (this.initWithModels = function (t, i) {
                return (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++, (e = []), (this.model = t), (this.envModel = i), (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
            }),
            (this.initWithModelAndData = function (e, t) {
                this.initWithModel(e), n(t);
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.getLevelNums = function () {
                return e.reduce(function (e, t, i) {
                    return t && t instanceof Array && e.push(i), e;
                }, []);
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                n(e, SPLODER.ACTION_UNDO), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                n(e, SPLODER.ACTION_REDO), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.serialize = function () {
                for (var t = [], n = 0; n < e.length; n++) t[n] = e[n] instanceof Array ? this.model.serialize(e[n]) : null;
                return console.log("SERIALIZING"), console.log(t), t.join("_#_") + "_#_" + i + "," + s + "," + o;
            });
        var n = function (i, n) {
            var r = i.split("_#_");
            e = [];
            for (var h = 0; h < r.length - 1; h++) console.log(h, r[h]), (e[h] = r[h] && r[h].length ? t.model.unserialize(r[h], !0) : h < r.length - 1 ? null : []);
            var l = SPLODER.parseFloatArray(r[r.length - 1].split(","));
            l.length && ((o = l[2]), (t.model.nextItemId = o = Math.max(t.model.nextItemId, o)), n == SPLODER.ACTION_UNDO ? a(l[0], !0) : a(l[1], !0)), console.log("current level", s, "max item id", o);
        },
            a = function (n, a) {
                if (s != n && !isNaN(n) && n >= 0) {
                    if (!e[n]) {
                        if (n != e.length) return;
                        e[n] = [];
                    }
                    a || (e[s] = t.model.items),
                        (o = Math.max(t.model.nextItemId, o)),
                        (t.model.selection = []),
                        (t.model.items = e[n]),
                        (i = s),
                        (s = t.envModel.currentLevel = n),
                        a || t.saveUndo(),
                        t.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE);
                }
            },
            r = function () {
                a(e.length), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
            },
            h = function () {
                if (e[s] instanceof Array && e[s].length > 0) {
                    var i = e[s].concat();
                    r(), (e[s] = t.model.items = i), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
                }
            },
            l = function () {
                if ((console.log("DELETING", e[s]), 0 != s && e[s] instanceof Array)) {
                    var i = s;
                    a(0), (e[i] = null), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
                }
            };
        this.onAction = function (e) {
            var t = e[0],
                i = e[1];
            switch (t) {
                case SPLODER.ACTION_SELECT_ITEM:
                    a(i);
                    break;
                case SPLODER.ACTION_SELECTION_DUPLICATE:
                    h();
                    break;
                case SPLODER.ACTION_SELECTION_DELETE:
                    l();
                    break;
                case SPLODER.ACTION_CREATE:
                    r();
            }
        };
    }),
