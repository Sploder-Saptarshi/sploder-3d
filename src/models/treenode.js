/* SPLODER.Treenode - Tree node base class */
    (SPLODER.Treenode = function () {
        this.defaults = null;
        var e = this,
            t = null,
            i = [];
        (this.addChild = function (e) {
            var t = i.indexOf(e);
            -1 == t && (i.push(e), (e.parentNode = this));
        }),
            (this.removeChild = function (e) {
                var t = i.indexOf(e);
                -1 != t && i.splice(t, 1);
            }),
            (this.removeAllChildren = function () {
                for (var e, t = i.length; t--;) (e = i[t]), e.parentNode == this && (e.parentNode = null);
                i = [];
            }),
            Object.defineProperty(this, "numChildren", {
                get: function () {
                    return i.length;
                },
            }),
            Object.defineProperty(this, "children", {
                get: function () {
                    return i.concat();
                },
            }),
            Object.defineProperty(this, "parentNode", {
                get: function () {
                    return t;
                },
                set: function (i) {
                    t && t.removeChild(e), (t = i), t && t.addChild(this);
                },
            }),
            Object.defineProperty(this, "root", {
                get: function () {
                    return t ? t.root : e;
                },
            });
    }),
    (SPLODER.Treenode.applyAttribs = function (e, t) {
        if (t instanceof Array) for (var i = 0; i < t.length; i++) e.setAttrib(i, t[i]);
    }),
