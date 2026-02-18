/* SPLODER.Item - Main game item class with properties and states */
    (SPLODER.Item = function (e, t, i, s, o, n) {
        SPLODER.Treenode.call(this), SPLODER.Rect.call(this, e, t, i, s, o);
        var a = t || 0,
            r = i || 0;
        (this.defaults = SPLODER.Item.defaultsByType[this.type]), (this.states = new SPLODER.States());
        var h = 0,
            l = this;
        Object.defineProperty(this, "x", {
            get: function () {
                var e = l.type;
                return e != SPLODER.Item.TYPE_PLATFORM && e != SPLODER.Item.TYPE_ITEM && e != SPLODER.Item.TYPE_BIPED ? a : a + l.getAttrib(SPLODER.Item.PROPERTY_OFFSET_X);
            },
            set: function (e) {
                if (!isNaN(e)) {
                    var t = l.type;
                    (t != SPLODER.Item.TYPE_PLATFORM && t != SPLODER.Item.TYPE_ITEM && t != SPLODER.Item.TYPE_BIPED) || 0 == l.currentState ? (a = e) : l.setAttrib(SPLODER.Item.PROPERTY_OFFSET_X, e - a);
                }
            },
        }),
            Object.defineProperty(this, "y", {
                get: function () {
                    var e = l.type;
                    return e != SPLODER.Item.TYPE_PLATFORM && e != SPLODER.Item.TYPE_ITEM && e != SPLODER.Item.TYPE_BIPED ? r : r + l.getAttrib(SPLODER.Item.PROPERTY_OFFSET_Y);
                },
                set: function (e) {
                    if (!isNaN(e)) {
                        var t = l.type;
                        (t != SPLODER.Item.TYPE_PLATFORM && t != SPLODER.Item.TYPE_ITEM && t != SPLODER.Item.TYPE_BIPED) || 0 == l.currentState ? (r = e) : l.setAttrib(SPLODER.Item.PROPERTY_OFFSET_Y, e - r);
                    }
                },
            }),
            Object.defineProperty(this, "baseX", {
                get: function () {
                    return a;
                },
            }),
            Object.defineProperty(this, "baseY", {
                get: function () {
                    return r;
                },
            }),
            Object.defineProperty(this, "currentState", {
                get: function () {
                    return l.type != SPLODER.Item.TYPE_PLATFORM || l.root == l ? h : l.root ? l.root.currentState : 0;
                },
                set: function (e) {
                    isNaN(e) || (l.type != SPLODER.Item.TYPE_PLATFORM || l.root == l ? (h = e) : l.root ? (l.root.currentState = e) : (h = 0));
                },
            }),
            (this.getAttrib = function (e, t) {
                return (
                    isNaN(t) && (t = this.currentState),
                    this.type != SPLODER.Item.TYPE_PLATFORM || this.root == this || (e != SPLODER.Item.PROPERTY_OFFSET_X && e != SPLODER.Item.PROPERTY_OFFSET_Y)
                        ? this.states.hasValue(e, t)
                            ? this.states.getValue(e, t)
                            : this.states.hasValue(e, 0)
                                ? this.states.getValue(e, 0)
                                : this.parentNode
                                    ? this.parentNode.getAttrib(e)
                                    : this.defaults && this.defaults.hasOwnProperty(e)
                                        ? this.defaults[e]
                                        : -1
                        : this.root.getAttrib(e)
                );
            }),
            (this.hasOwnAttrib = function (e, t) {
                return isNaN(t) && (t = this.currentState), this.states.hasValue(e, t) || this.states.hasValue(e, 0);
            }),
            (this.setAttrib = function (e, t, i) {
                isNaN(i) && (i = this.currentState), (null === t || t !== t) && (t = void 0), this.states.setValue(e, t, i);
            }),
            (this.clearAttrib = function (e, t) {
                isNaN(t) && (t = this.currentState), this.states.setValue(e, void 0, t);
            }),
            (this.getAttribs = function () {
                if (arguments && arguments.length > 0) {
                    for (var e = [], t = 0; t < arguments.length; t++) e.push(l.getAttrib(arguments[t]));
                    return e;
                }
            }),
            n ? this.states.initWithValues(n) : this.states.init(),
            (this.clone = function () {
                var e = new SPLODER.Item(this.type, this.baseX, this.baseY, this.width, this.height);
                return (e.id = this.id), e.states.unserialize(this.states.serialize()), e;
            }),
            (this.serialize = function () {
                return [this.id, this.type, this.baseX, this.baseY, this.width, this.height].join(",") + "," + this.states.serialize();
            }),
            (this.unserialize = function (e, t) {
                if (e) {
                    SPLODER.Rect.prototype.unserialize.call(this, e, t);
                    var i = e.split(","),
                        s = i.slice(6).join(",");
                    this.states.unserialize(s), (this.defaults = SPLODER.Item.defaultsByType[this.type]);
                }
            });
    }),
    (SPLODER.Item.prototype = Object.create(SPLODER.Rect.prototype)),
    (SPLODER.Item.prototype.constructor = SPLODER.Item),
    (SPLODER.Item.PROPERTY_TYPE = 0),
    (SPLODER.Item.TYPE_WALL = 0),
    (SPLODER.Item.TYPE_PLATFORM = 1),
    (SPLODER.Item.TYPE_LIQUID = 2),
    (SPLODER.Item.TYPE_PANEL = 3),
    (SPLODER.Item.TYPE_ITEM = 4),
    (SPLODER.Item.TYPE_BIPED = 5),
    (SPLODER.Item.TYPE_LIGHT = 6),
    (SPLODER.Item.TYPE_FILTER_WALL_LIQUID = 7),
    (SPLODER.Item.typeStrings = ["wall", "platform", "liquid", "panel", "item", "biped", "light"]),
    (SPLODER.Item.PROPERTY_ROTATION = 0),
    (SPLODER.Item.PROPERTY_FLOORDEPTH = 1),
    (SPLODER.Item.PROPERTY_CEILDEPTH = 2),
    (SPLODER.Item.PROPERTY_OFFSET_X = 3),
    (SPLODER.Item.PROPERTY_OFFSET_Y = 4),
    (SPLODER.Item.PROPERTY_TEXTURE1 = 5),
    (SPLODER.Item.PROPERTY_TEXTURE2 = 6),
    (SPLODER.Item.PROPERTY_TEXTURE3 = 7),
    (SPLODER.Item.PROPERTY_FLOORTEXTURE = 5),
    (SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE = 6),
    (SPLODER.Item.PROPERTY_BOTTOMWALLCORNICETEXTURE = 7),
    (SPLODER.Item.PROPERTY_CEILTEXTURE = 8),
    (SPLODER.Item.PROPERTY_TOPWALLTEXTURE = 9),
    (SPLODER.Item.PROPERTY_TOPWALLCORNICETEXTURE = 10),
    (SPLODER.Item.PROPERTY_LIGHTLEVEL = 11),
    (SPLODER.Item.PROPERTY_LIGHTEFFECT = 12),
    (SPLODER.Item.PROPERTY_LIQUIDLEVEL = 13),
    (SPLODER.Item.PROPERTY_LIQUIDTYPE = 14),
    (SPLODER.Item.PROPERTY_LIQUID_HASFLOOR = 17),
    (SPLODER.Item.PROPERTY_POWER = 11),
    (SPLODER.Item.PROPERTY_COLOR = 12),
    (SPLODER.Item.PROPERTY_CEIL = 15),
    (SPLODER.Item.PROPERTY_CEIL_SKY = 16),
    (SPLODER.Item.PROPERTY_HEALTH = 18),
    (SPLODER.Item.PROPERTY_STRENGTH = 19),
    (SPLODER.Item.PROPERTY_RANGE = 20),
    (SPLODER.Item.PROPERTY_ARMOR = 21),
    (SPLODER.Item.PROPERTY_SPEED = 22),
    (SPLODER.Item.PROPERTY_SCORE = 23),
    (SPLODER.Item.PROPERTY_SOLID = 24),
    (SPLODER.Item.PROPERTY_GRAVITY = 25),
    (SPLODER.Item.PROPERTY_AUTOCREATE = 26),
    (SPLODER.Item.PROPERTY_LIBRARY = 27),
    (SPLODER.Item.PROPERTY_TOPLEFT = 30),
    (SPLODER.Item.PROPERTY_TOPRIGHT = 31),
    (SPLODER.Item.PROPERTY_BOTTOMRIGHT = 32),
    (SPLODER.Item.PROPERTY_BOTTOMLEFT = 33),
    (SPLODER.Item.defaults = []),
    (SPLODER.Item.defaultsByType = []),
    (function (e) {
        (e.defaults[e.PROPERTY_ROTATION] = 0),
            (e.defaults[e.PROPERTY_FLOORDEPTH] = 64),
            (e.defaults[e.PROPERTY_CEILDEPTH] = 80),
            (e.defaults[e.PROPERTY_OFFSET_X] = 0),
            (e.defaults[e.PROPERTY_OFFSET_Y] = 0),
            (e.defaults[e.PROPERTY_LIGHTLEVEL] = 160),
            (e.defaults[e.PROPERTY_LIGHTEFFECT] = 0),
            (e.defaults[e.PROPERTY_FLOORTEXTURE] = 7),
            (e.defaults[e.PROPERTY_BOTTOMWALLTEXTURE] = 7),
            (e.defaults[e.PROPERTY_BOTTOMWALLCORNICETEXTURE] = -1),
            (e.defaults[e.PROPERTY_CEILTEXTURE] = -1),
            (e.defaults[e.PROPERTY_TOPWALLTEXTURE] = -1),
            (e.defaults[e.PROPERTY_TOPWALLCORNICETEXTURE] = -1),
            (e.defaults[e.PROPERTY_CEIL] = 1),
            (e.defaults[e.PROPERTY_CEIL_SKY] = 0),
            (e.defaults[e.PROPERTY_LIQUIDLEVEL] = 62),
            (e.defaults[e.PROPERTY_LIQUIDTYPE] = 0),
            (e.defaults[e.PROPERTY_LIQUID_HASFLOOR] = 1),
            (e.defaults[SPLODER.Item.PROPERTY_HEALTH] = 100),
            (e.defaults[SPLODER.Item.PROPERTY_STRENGTH] = 20),
            (e.defaults[SPLODER.Item.PROPERTY_RANGE] = 20),
            (e.defaults[SPLODER.Item.PROPERTY_ARMOR] = 0),
            (e.defaults[SPLODER.Item.PROPERTY_SPEED] = 10),
            (e.defaults[SPLODER.Item.PROPERTY_SCORE] = 10),
            (e.defaults[SPLODER.Item.PROPERTY_SOLID] = 1),
            (e.defaults[SPLODER.Item.PROPERTY_GRAVITY] = 1),
            (e.defaults[SPLODER.Item.PROPERTY_AUTOCREATE] = 1),
            (e.defaults[SPLODER.Item.PROPERTY_LIBRARY] = 0);
        for (var t = e.TYPE_WALL; t <= e.TYPE_LIGHT; t++) e.defaultsByType[t] = e.defaults.concat();
        (e.defaultsByType[e.TYPE_PLATFORM][e.PROPERTY_FLOORDEPTH] = 66),
            (e.defaultsByType[e.TYPE_PLATFORM][e.PROPERTY_CEILDEPTH] = 2),
            (e.defaultsByType[e.TYPE_LIQUID][e.PROPERTY_FLOORDEPTH] = 56),
            (e.defaultsByType[e.TYPE_LIQUID][e.PROPERTY_CEIL] = 0),
            (e.defaultsByType[e.TYPE_LIQUID][e.PROPERTY_FLOORTEXTURE] = 1),
            (e.defaultsByType[e.TYPE_PANEL][e.PROPERTY_TEXTURE1] = 70),
            (e.defaultsByType[e.TYPE_PANEL][e.PROPERTY_TEXTURE2] = -1),
            (e.defaultsByType[e.TYPE_PANEL][e.PROPERTY_TEXTURE3] = -1),
            (e.defaultsByType[e.TYPE_ITEM][e.PROPERTY_TEXTURE1] = 34),
            (e.defaultsByType[e.TYPE_ITEM][e.PROPERTY_TEXTURE2] = -1),
            (e.defaultsByType[e.TYPE_ITEM][e.PROPERTY_TEXTURE3] = -1),
            (e.defaultsByType[e.TYPE_LIGHT][e.PROPERTY_COLOR] = 0),
            (e.defaultsByType[e.TYPE_LIGHT][e.PROPERTY_POWER] = 20);
    })(SPLODER.Item),
