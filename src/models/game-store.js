/* SPLODER.GameStore - Game-specific item store extending Store */
    (SPLODER.GameStore = function () {
        SPLODER.Store.call(this);
        var e = 0;
        Object.defineProperty(this, "level", {
            get: function () {
                return e;
            },
            set: function (t) {
                isNaN(t) || (e = t);
            },
        }),
            (this.ItemClass = SPLODER.Item),
            (this.addItem = function (e, t, i, s, o, n, a) {
                var r = new SPLODER.Item(e, t, i, s, o, n);
                return (r.id = this.nextItemId), this.nextItemId++, this.items.push(r), SPLODER.ShapeUtils.sortByAreaDesc(this.items), a || this.updateBounds(), r;
            }),
            (this.onAction = function (e) {
                var t = e[0];
                t >= SPLODER.ACTION_CREATE && (this.changed.dispatch(t, -1), SPLODER.ShapeUtils.buildTree(this.items));
            });
    }),
    (SPLODER.GameStore.prototype = Object.create(SPLODER.Store.prototype)),
    (SPLODER.GameStore.prototype.constructor = SPLODER.GameStore),
