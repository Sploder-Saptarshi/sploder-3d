/* SPLODER.Store - Base store class for items, selection, undo, serialize */
    (SPLODER.Store = function () {
        (this.id = 0),
            (this.items = null),
            (this.bounds = null),
            (this.duplicatedItems = null),
            (this.selection = null),
            (this.nextItemId = 1),
            (this.changed = null),
            (this.bookmarked = null),
            (this.ItemClass = SPLODER.Rect),
            (this.init = function () {
                return (
                    (this.id = SPLODER.Store._nextId),
                    SPLODER.Store._nextId++,
                    (this.items = []),
                    (this.bounds = { x: 0, y: 0, width: 0, height: 0, size: 0 }),
                    (this.duplicatedItems = []),
                    (this.selection = []),
                    (this.changed = new signals.Signal()),
                    (this.bookmarked = new signals.Signal()),
                    this
                );
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.addItem = function (e, t, i, s, o, n) {
                var a = new this.ItemClass(e, t, i, s, o);
                return (a.id = this.nextItemId), this.nextItemId++, this.items.push(a), SPLODER.ShapeUtils.sortByAreaDesc(this.items), n || this.updateBounds(), a;
            }),
            (this.updateBounds = function () {
                this.bounds = SPLODER.ShapeUtils.getBounds(this.items);
            }),
            (this.serialize = function (e) {
                var t = e ? !1 : !0;
                e = e || this.items;
                var i,
                    s = [],
                    o = this.selection,
                    n = [];
                for (i = e.length; i--;) s.unshift(e[i].serialize());
                if (t) for (i = o.length; i--;) n.unshift(o[i].id);
                return s.join("|").split("null").join("@") + "~" + n.join("|");
            }),
            (this.unserialize = function (levelString, t) {
                if (levelString) {
                    var i = [],
                        s = [];
                    if (((levelString = levelString.split("@").join("null")), levelString.indexOf("~") >= 0)) {
                        var o,
                            n = levelString.split("~"),
                            a = n[0].split("|"),
                            r = n[1].split("|");
                        for (o = 0; o < r.length; o++) r[o] = parseInt(r[o]);
                        if (a.length)
                            for (o = 0; o < a.length; o++) {
                                var h = new this.ItemClass();
                                h.unserialize(a[o]), isNaN(h.id) || (i.push(h), t || (this.nextItemId = Math.max(this.nextItemId, h.id)), r.length && r.indexOf(h.id) >= 0 && s.push(h));
                            }
                        if ((SPLODER.ShapeUtils.sortByAreaDesc(i), SPLODER.ShapeUtils.sortByAreaDesc(s), t)) return this.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE), i;
                        this.nextItemId++, (this.items = i), (this.selection = s), this.updateBounds(), this.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE);
                    }
                }
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                this.unserialize(e), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                this.unserialize(e), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.hasSelection = function (e) {
                return void 0 === e ? this.selection.length > 0 : this.selection.length == e;
            }),
            (this.selectionType = function () {
                var e = this.selection;
                if (0 == e.length) return -1;
                for (var t = e[0].type, i = e.length; i--;) if (e[i].type != t) return -2;
                return t;
            }),
            (this.deleteSelection = function () {
                for (var e, t = this.selection, i = this.items, s = t.length; s--;) (e = i.indexOf(t[s])), e >= 0 && i.splice(e, 1);
                (this.selection = []), this.updateBounds();
            }),
            (this.getItemById = function (e) {
                for (var t = this.items, i = t.length; i--;) if (t[i].id == e) return t[i];
                return null;
            }),
            (this.filterType = function (e, t) {
                if (void 0 != t && e !== t) {
                    if (t != SPLODER.Item.TYPE_FILTER_WALL_LIQUID) return !1;
                    if (e != SPLODER.Item.TYPE_WALL && e != SPLODER.Item.TYPE_LIQUID) return !1;
                }
                return !0;
            }),
            (this.getItemsUnderPoint = function (e, t, i, s, o, n, a) {
                (i = i || 0), (s = s || this.items);
                for (var r, h = s.length, l = o ? [] : null; h--;)
                    if (((r = s[h]), this.filterType(r.type, n)))
                        if ((r.type == SPLODER.Item.TYPE_ITEM || r.type == SPLODER.Item.TYPE_BIPED) && SPLODER.Geom.distanceBetweenSquared(e, t, r.x, r.y) <= 4) {
                            if (!o) return r;
                            l.push(r);
                        } else if (r.type == SPLODER.Item.TYPE_LIGHT && SPLODER.Geom.distanceBetweenSquared(e, t, r.x, r.y) <= 2) {
                            if (!o) return r;
                            l.push(r);
                        } else if (e >= r.x - i && t >= r.y - i && e <= r.x + r.width + i && t <= r.y + r.height + i) {
                            if (!o) return a ? [r].concat(SPLODER.ShapeUtils.getDescendants(r)) : r;
                            l.push(r);
                        }
                return l && (SPLODER.ShapeUtils.sortByAreaDesc(l), l.reverse()), l;
            }),
            (this.getItemUnderPoint = function (e, t, i, s, o) {
                return this.getItemsUnderPoint(e, t, i, null, !1, s, o);
            }),
            (this.selectionIsUnderPoint = function (e, t, i) {
                return this.getItemsUnderPoint(e, t, i, this.selection);
            }),
            (this.itemIsSelected = function (e, t) {
                return -1 !== this.selection.indexOf(e) ? (t ? 1 == this.selection.length : !0) : !1;
            }),
            (this.itemWithIdIsSelected = function (e, t) {
                var i = this.getItemById(e);
                return i ? this.itemIsSelected(i, t) : !1;
            }),
            (this.getItemsWithinRect = function (e, t, i, s, o, n) {
                n = n || this.items;
                for (var a, r = n.length, h = []; r--;) (a = n[r]), this.filterType(a.type, o) && e <= a.x && t <= a.y && e + i >= a.x + a.width && t + s >= a.y + a.height && h.push(a);
                return h;
            }),
            (this.getItemsIntersectingRect = function (e, t, i, s, o, n) {
                n = n || this.items;
                for (var a, r = n.length, h = []; r--;) (a = n[r]), this.filterType(a.type, o) && (a.x > e + i || a.x + a.width < e || a.y > t + s || a.y + a.height < t || h.push(a));
                return h;
            }),
            (this.getItemsByType = function (e) {
                for (var t, i = [], s = this.items.length; s--;) (t = this.items[s]), this.filterType(t.type, e) && i.unshift(t);
                return i;
            });
    }),
    (SPLODER.Store._nextId = 1),
    (SPLODER.Store.prototype.onAction = function (e) {
        console.log("ABSTRACT METHOD CALLED: OVERRIDE!", e);
    }),
    (SPLODER.Store.prototype.copySelectionAsClipboard = function () {
        var e = this.selection,
            t = { modelId: this.id, bounds: SPLODER.ShapeUtils.getBounds(e), data: "" };
        if (e.length) {
            for (var i = [], s = 0; s < e.length; s++) (item = e[s]), i.push(item.serialize());
            t.data = i.join("|");
        }
        return t;
    }),
    (SPLODER.Store.prototype.pasteSelectionFromClipboard = function (e, t) {
        if (e && e.modelId == this.id && e.data) {
            this.saveUndo();
            for (var i = e.data.split("|"), s = (this.selection = []), o = 0; o < i.length; o++) (item = this.addItem()), item.unserialize(i[o], !0), s.push(item);
            return this.updateBounds(), t !== !1 && s.length > 1 && SPLODER.ShapeUtils.sortByAreaDesc(s), this.changed.dispatch(SPLODER.ACTION_CLIPBOARD_PASTE, s), s;
        }
    }),
    (SPLODER.Store.LIGHT_COLOR_CHOICES = [16777215, 16764057, 16750950, 16724736, 16711935, 10040319, 13311, 52479, 65280]),
