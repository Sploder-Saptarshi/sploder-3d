/* SPLODER.Rect - Rectangle base class */
    (SPLODER.Rect = function (e, t, i, s, o) {
        (this.id = null), (this.type = e || 0), (this.x = t || 0), (this.y = i || 0), (this.width = s || 0), (this.height = o || 0);
        var n = this;
        Object.defineProperty(this, "area", {
            value: function () {
                return n.type >= 4 ? 0 : n.width * n.height;
            },
            writable: !1,
        }),
            (this.clone = function () {
                var e = new SPLODER.Rect(this.type, this.x, this.y, this.width, this.height);
                return (e.id = this.id), e;
            });
    }),
    (SPLODER.Rect.prototype.serialize = function () {
        return [this.id, this.type, this.x, this.y, this.width, this.height].join(",");
    }),
    (SPLODER.Rect.prototype.unserialize = function (e, t, i) {
        if (e) {
            var s = ["id", "type", "x", "y", "width", "height"];
            i && (s = s.concat(i));
            for (var o = e.split(","), n = 0; n < o.length; n++) s[n] && ((0 == n && t) || (this[s[n]] = parseInt(o[n])));
        }
    }),
