/* SPLODER.FlowStore - Flow node store extending Store */
    (SPLODER.FlowStore = function () {
        SPLODER.Store.call(this);
        var e = this,
            t = 0;
        Object.defineProperty(this, "flowId", {
            get: function () {
                return t;
            },
            set: function (i) {
                isNaN(i) || ((t = i), (e.selection = []), e.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE));
            },
        }),
            (this.ItemClass = SPLODER.FlowNode),
            (this.getItemsUnderPoint = function (e, t, i, s, o, n) {
                (i = i || 0), (s = s || this.items);
                for (var a, r = s.length, h = o ? [] : null; r--;)
                    if (((a = s[r]), (void 0 == n || a.type === n) && a.flowId == this.flowId && e >= a.x - i && t >= a.y - i && e <= a.x + a.width + i && t <= a.y + a.height + i)) {
                        if (!o) return a;
                        h.push(a);
                    }
                return h;
            }),
            (this.onAction = function (e) {
                if (e) {
                    var t,
                        i,
                        s,
                        o,
                        n,
                        a,
                        r,
                        h,
                        l,
                        E,
                        d,
                        R,
                        P,
                        c = e[0];
                    switch (c) {
                        case SPLODER.ACTION_DESELECT:
                            this.selection.length && (this.saveUndo(), (this.selection = []), this.changed.dispatch(c));
                            break;
                        case SPLODER.ACTION_SELECT_POINT:
                            (i = e[1]), (s = e[2]);
                            var u = e[3],
                                O = e[4],
                                L = this.getItemUnderPoint(i, s, 0, null, O);
                            if (((o = this.selection), L && L.length > 1)) return this.saveUndo(), (this.selection = L), void this.changed.dispatch(c, this.selection);
                            if ((r = L)) {
                                var S = 5;
                                if (i - r.x > S && s - r.y > S && r.x + r.width - i > S && r.y + r.height - s > S)
                                    return this.itemIsSelected(r) && (this.saveUndo(), (this.selection = [])), void this.changed.dispatch(SPLODER.ACTION_DESELECT);
                            }
                            u
                                ? r && !this.itemIsSelected(r)
                                    ? (this.saveUndo(), o.push(r), SPLODER.ShapeUtils.sortByAreaDesc(o))
                                    : r || (o.length && (this.saveUndo(), (this.selection = [])))
                                : r && !this.itemIsSelected(r)
                                    ? (this.saveUndo(), (this.selection = [r]))
                                    : o.length && (this.saveUndo(), (this.selection = [])),
                                this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECT_ITEM:
                            e[1] instanceof SPLODER.Item && ((this.selection = [this.getItemById(e[1].id)]), this.changed.dispatch(c, this.selection));
                            break;
                        case SPLODER.ACTION_SELECT_WINDOW:
                            (r = e[1]), (this.selection = this.getItemsIntersectingRect(r.x, r.y, r.width, r.height)), SPLODER.ShapeUtils.sortByAreaDesc(this.selection), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECT_ALL:
                            this.saveUndo(), (this.selection = this.items.concat()), SPLODER.ShapeUtils.sortByAreaDesc(this.selection), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_START:
                            this.saveUndo();
                            break;
                        case SPLODER.ACTION_SELECTION_MOVE:
                            for (t = this.selection.length; t--;) (this.selection[t].x += e[1]), (this.selection[t].y += e[2]);
                            this.updateBounds(), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_DUPLICATE:
                            for (this.saveUndo(), o = this.selection, this.selection = [], n = this.duplicatedItems = [], t = o.length; t--;)
                                (h = o[t]), (l = this.addItem()), l.unserialize(h.serialize(), !0), (l.flowId = this.flowId), n.unshift(h), this.selection.unshift(l);
                            SPLODER.FlowStore.remapNodeConnections(n, this.selection), this.updateBounds(), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_RELEASE:
                            if (((o = this.selection.concat()), (n = this.duplicatedItems), o.length && n.length && o[0].x == n[0].x && o[0].y == n[0].y && o[0].width == n[0].width && o[0].height == n[0].height))
                                return this.saveUndo(), this.deleteSelection(), (this.duplicatedItems = []), void this.changed.dispatch(SPLODER.ACTION_SELECTION_DELETE, o);
                            n.length && this.changed.dispatch(c, o), (this.duplicatedItems = []);
                            break;
                        case SPLODER.ACTION_SELECTION_DELETE:
                            this.selection.length && ((o = this.selection.concat()), this.saveUndo(), this.deleteSelection(), this.changed.dispatch(c, o));
                            break;
                        case SPLODER.ACTION_CREATE:
                            this.saveUndo(), (E = e[1]), (d = e[2]), (R = e[3]), (P = e[4]), (i = e[5]), (s = e[6]), (l = this.addItem(E, i, s, e[7], e[8])), (l.flowId = this.flowId);
                            var T = SPLODER.FlowNode.subtypeTargetTypes[E][d];
                            l.setAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE, d),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_OPERATOR, R),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET_TYPE, T),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET, P),
                                (this.selection = [l]),
                                this.changed.dispatch(c, this.selection[0]);
                            break;
                        case SPLODER.ACTION_CHANGE:
                            a = e[1];
                            var D = e[2],
                                m = e[3];
                            for (-1 == a ? (o = this.selection) : ((r = this.getItemById(a)), (o = [r])), t = 0; t < o.length; t++) {
                                r = o[t];
                                var d = r.getAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE),
                                    T = SPLODER.FlowNode.subtypeTargetTypes[r.type][d];
                                switch (D) {
                                    case SPLODER.FlowNode.PROPERTY_SUBTYPE:
                                        var f = SPLODER.FlowNode.subtypeStrings[r.type].length - 1;
                                        SPLODER.incrementAttrib(r, D, m, 1, f, 0),
                                            (d = r.getAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE)),
                                            (T = SPLODER.FlowNode.subtypeTargetTypes[r.type][d]),
                                            isNaN(T) || r.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET_TYPE, T);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_OPERATOR:
                                        r.type == SPLODER.FlowNode.TYPE_CONDITION && SPLODER.incrementAttrib(r, D, m, 0, 4, 0);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_TARGET_TYPE:
                                        SPLODER.incrementAttrib(r, D, m, 0, 3, 0);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_TARGET:
                                        var p = 0;
                                        T == SPLODER.FlowNode.TARGET_TYPE_TAG ? (p = -7) : T == SPLODER.FlowNode.TARGET_TYPE_STATE && (p = 1),
                                            r.type == SPLODER.FlowNode.TYPE_ACTION && T == SPLODER.FlowNode.TARGET_TYPE_NUMBER && (p = -99),
                                            SPLODER.incrementAttrib(r, D, m, p, 99, 0);
                                }
                            }
                            this.updateBounds(), this.changed.dispatch(c, o, D);
                            break;
                        case SPLODER.ACTION_CHANGE_COMPLETE:
                            (a = e[1]), (r = this.getItemById(a)), this.changed.dispatch(c, r);
                            break;
                        case SPLODER.ACTION_CONNECT:
                            var g = this.getItemById(e[1]),
                                y = this.getItemById(e[2]);
                            g && y && g.addChild(y.id, e[3]), this.changed.dispatch(c, g);
                            break;
                        case SPLODER.ACTION_DISCONNECT:
                            r = this.getItemById(e[1]);
                            var I = e[2];
                            if (r)
                                if (2 == I) for (t = this.items.length; t--;) this.items[t].removeChild(r.id);
                                else for (t = r.children.length; t--;) r.childrenTerminal[t] == I && r.removeChild(r.children[t]);
                            this.changed.dispatch(c, r);
                    }
                }
            });
    }),
    (SPLODER.FlowStore.prototype = Object.create(SPLODER.Store.prototype)),
    (SPLODER.FlowStore.prototype.constructor = SPLODER.FlowStore),
    (SPLODER.FlowStore.remapNodeConnections = function (e, t) {
        if (t && e)
            for (
                var i,
                s,
                o,
                n,
                a = e.length,
                r = function (e, t) {
                    for (var i = e.length; i--;) if (e[i] && e[i].id == t) return i;
                    return -1;
                };
                a--;

            )
                if (e[a] && t[a] && ((i = e[a]), (s = t[a]), i && s && i.children.length))
                    for (o = i.children.length; o--;) (n = r(e, i.children[o])), -1 != n && (console.log("remapping node child id", s.children[o], t[n].id), (s.children[o] = t[n].id));
    }),
    (SPLODER.FlowStore.prototype.pasteSelectionFromClipboard = function (e) {
        if (e && e.data) {
            var t,
                i = e.data.split("|"),
                s = [];
            for (t = 0; t < i.length; t++) (item = this.addItem()), item.unserialize(i[t]), s.push(item);
            var o = SPLODER.Store.prototype.pasteSelectionFromClipboard.apply(this, arguments);
            for (t = o.length; t--;) (o[t].flowId = this.flowId), (o[t].x += 1), (o[t].y += 1);
            SPLODER.FlowStore.remapNodeConnections(s, o);
        }
    }),
