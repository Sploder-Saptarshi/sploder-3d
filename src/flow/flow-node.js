/* SPLODER.FlowNode - Flow/logic node with constants and defaults */
    (SPLODER.FlowNode = function (e, t, i, s, o) {
        SPLODER.Rect.call(this, e, t, i, s, o), (this.flowId = 0), (this.verb = ""), (this.target = ""), (this.amount = 0), (this.operator = "");
        var n = [];
        (this.children = []),
            (this.childrenTerminal = []),
            (this.defaults = SPLODER.FlowNode.defaultsByType[this.type]),
            (this.addChild = function (e, t) {
                -1 == this.children.indexOf(e) && ((t = t || 0), this.children.push(e), this.childrenTerminal.push(t));
            }),
            (this.removeChild = function (e) {
                var t = this.children.indexOf(e);
                -1 != t && (this.children.splice(t, 1), this.childrenTerminal.splice(t, 1));
            }),
            (this.getAttrib = function (e) {
                return n ? (isNaN(n[e]) ? (this.defaults && !isNaN(this.defaults[e]) ? this.defaults[e] : 0) : n[e]) : -1;
            }),
            (this.setAttrib = function (e, t) {
                n && (n[e] = t);
            }),
            (this.getAttribs = function () {
                return n;
            }),
            (this.clone = function () {
                var e = new SPLODER.FlowNode(this.type, this.x, this.y, this.width, this.height);
                return (e.id = this.id), (e.flowId = this.flowId), e.init().unserialize(this.serialize());
            }),
            (this.serialize = function () {
                return SPLODER.Rect.prototype.serialize.call(this) + "," + [this.flowId, this.children.length].concat(this.children, this.childrenTerminal, n).join(",");
            }),
            (this.unserialize = function (e, t) {
                SPLODER.Rect.prototype.unserialize.call(this, e, t);
                for (var i = e.split(",").slice(6), s = i.length; s--;) i[s] = parseFloat(i[s]);
                this.flowId = i.shift();
                var o = i.shift();
                o ? ((this.children = i.slice(0, o)), (this.childrenTerminal = i.slice(o, o + o))) : ((this.children = []), (this.childrenTerminal = [])),
                    isNaN(this.flowId) && (this.flowId = 0),
                    (n = i.slice(2 * o) || []),
                    (this.defaults = SPLODER.FlowNode.defaultsByType[this.type]);
            }),
            (this.toString = function (e, t) {
                if (!e) return "no model found";
                t = t || 0;
                var i = [],
                    s = SPLODER.FlowNode.typeVerbStrings[this.type],
                    o = this.getAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE),
                    n = this.getAttrib(SPLODER.FlowNode.PROPERTY_OPERATOR),
                    a = this.getAttrib(SPLODER.FlowNode.PROPERTY_TARGET_TYPE),
                    r = this.getAttrib(SPLODER.FlowNode.PROPERTY_TARGET);
                this.type == SPLODER.FlowNode.TYPE_CONDITION && 5 >= o && (n = 0),
                    s && i.push(s),
                    o && i.push(SPLODER.FlowNode.subtypeStrings[this.type][o]),
                    n && i.push(SPLODER.FlowNode.operatorStrings[n]),
                    a && i.push(SPLODER.FlowNode.targetTypeStrings[a]),
                    a != SPLODER.FlowNode.TARGET_TYPE_NONE && void 0 !== r && (this.type == SPLODER.FlowNode.TYPE_ACTION && a == SPLODER.FlowNode.TARGET_TYPE_NUMBER && r >= 0 && (r = "+" + r), i.push(r));
                var h = i.concat();
                if (this.type == SPLODER.FlowNode.TYPE_LOOP) this.children.length && (i.push("FROM INSTRUCTION"), i.push('"' + e.getItemById(this.children[0]).toString(e, t + 999) + '"'));
                else if (24 > t)
                    for (var l = 0; l < this.children.length; l++) {
                        var E = "",
                            d = null,
                            R = "";
                        (E =
                            this.type == SPLODER.FlowNode.TYPE_TRIGGER
                                ? 0 == this.childrenTerminal[l]
                                    ? ", then with object A (self):"
                                    : ", then with object B:"
                                : 0 == this.childrenTerminal[l]
                                    ? ", then"
                                    : this.type == SPLODER.FlowNode.TYPE_TRIGGER
                                        ? ", then with B"
                                        : ", " + h.join(" ").split("IF ").join("OTHERWISE IF NOT (") + "), then"),
                            (d = e.getItemById(this.children[l])),
                            d && ((R = d.toString(e, t + 1)), R && (i.push(E), i.push(R)));
                    }
                return i.join(" ").split("  ").join(" ").split(" , ").join(", ");
            });
    }),
    (SPLODER.FlowNode._nextId = 1),
    (SPLODER.FlowNode.SCOPE_GAME = 0),
    (SPLODER.FlowNode.SCOPE_SECTOR = 1),
    (SPLODER.FlowNode.SCOPE_PANEL = 2),
    (SPLODER.FlowNode.SCOPE_ITEM = 3),
    (SPLODER.FlowNode.SCOPE_BIPED = 4),
    (SPLODER.FlowNode.TYPE_TRIGGER = 1),
    (SPLODER.FlowNode.TYPE_CONDITION = 2),
    (SPLODER.FlowNode.TYPE_ACTION = 3),
    (SPLODER.FlowNode.TYPE_CONTEXT = 4),
    (SPLODER.FlowNode.TYPE_DELAY = 5),
    (SPLODER.FlowNode.TYPE_LOOP = 6),
    (SPLODER.FlowNode.typeStrings = ["", "event", "condition", "action", "context", "delay", "loop"]),
    (SPLODER.FlowNode.PROPERTY_SUBTYPE = 0),
    (SPLODER.FlowNode.PROPERTY_OPERATOR = 1),
    (SPLODER.FlowNode.PROPERTY_TARGET_TYPE = 2),
    (SPLODER.FlowNode.PROPERTY_TARGET = 3),
    (SPLODER.FlowNode.TRIGGER_EVERYFRAME = 1),
    (SPLODER.FlowNode.TRIGGER_START = 2),
    (SPLODER.FlowNode.TRIGGER_COLLISION = 3),
    (SPLODER.FlowNode.TRIGGER_CRUSH = 4),
    (SPLODER.FlowNode.TRIGGER_ENTER = 5),
    (SPLODER.FlowNode.TRIGGER_EXIT = 6),
    (SPLODER.FlowNode.TRIGGER_EMPTY = 7),
    (SPLODER.FlowNode.TRIGGER_NEAR = 8),
    (SPLODER.FlowNode.TRIGGER_SEE = 9),
    (SPLODER.FlowNode.TRIGGER_TEXT = 10),
    (SPLODER.FlowNode.TRIGGER_STATE_CHANGED = 10),
    (SPLODER.FlowNode.TRIGGER_HEALTH_CHANGED = 11),
    (SPLODER.FlowNode.TRIGGER_PLAYER_SCORED = 12),
    (SPLODER.FlowNode.TRIGGER_ITEM_PICKED_UP = 13),
    (SPLODER.FlowNode.TRIGGER_ITEM_DESTROYED = 14),
    (SPLODER.FlowNode.CONDITION_TOUCHING = 1),
    (SPLODER.FlowNode.CONDITION_HAS = 2),
    (SPLODER.FlowNode.CONDITION_CONTAINS = 3),
    (SPLODER.FlowNode.CONDITION_TAG_MATCHES = 4),
    (SPLODER.FlowNode.CONDITION_STATE_MATCHES = 5),
    (SPLODER.FlowNode.CONDITION_PROPERTY_HEALTH = 6),
    (SPLODER.FlowNode.CONDITION_PROPERTY_STRENGTH = 7),
    (SPLODER.FlowNode.CONDITION_PROPERTY_RANGE = 8),
    (SPLODER.FlowNode.CONDITION_PROPERTY_ARMOR = 9),
    (SPLODER.FlowNode.CONDITION_PROPERTY_MEMORY = 10),
    (SPLODER.FlowNode.CONDITION_PROPERTY_SCORE = 11),
    (SPLODER.FlowNode.ACTION_GOTO_STATE = 1),
    (SPLODER.FlowNode.ACTION_ALLOW = 2),
    (SPLODER.FlowNode.ACTION_DISALLOW = 3),
    (SPLODER.FlowNode.ACTION_CHANGE_PROPERTY_HEALTH = 4),
    (SPLODER.FlowNode.ACTION_CHANGE_PROPERTY_STRENGTH = 5),
    (SPLODER.FlowNode.ACTION_CHANGE_PROPERTY_RANGE = 6),
    (SPLODER.FlowNode.ACTION_CHANGE_PROPERTY_ARMOR = 7),
    (SPLODER.FlowNode.ACTION_CHANGE_PROPERTY_MEMORY = 8),
    (SPLODER.FlowNode.ACTION_SPAWN_ITEM = 9),
    (SPLODER.FlowNode.ACTION_TELEPORT = 10),
    (SPLODER.FlowNode.ACTION_PICKUP = 11),
    (SPLODER.FlowNode.ACTION_DROP = 12),
    (SPLODER.FlowNode.ACTION_SHOW_TEXT = 13),
    (SPLODER.FlowNode.ACTION_SOLID_OFF = 14),
    (SPLODER.FlowNode.ACTION_SOLID_ON = 15),
    (SPLODER.FlowNode.ACTION_DESTROY = 16),
    (SPLODER.FlowNode.ACTION_LOSE_GAME = 17),
    (SPLODER.FlowNode.ACTION_WIN_GAME = 18),
    (SPLODER.FlowNode.ACTION_FOLLOW = 19),
    (SPLODER.FlowNode.ACTION_ATTACK = 20),
    (SPLODER.FlowNode.ACTION_FLEE = 21),
    (SPLODER.FlowNode.ACTION_GUARD = 22),
    (SPLODER.FlowNode.CONTEXT_SUBJECT = 1),
    (SPLODER.FlowNode.DELAY_WAIT = 1),
    (SPLODER.FlowNode.LOOP_REPEAT = 1),
    (SPLODER.FlowNode.OPERATOR_NONE = 0),
    (SPLODER.FlowNode.OPERATOR_EQUALS = 1),
    (SPLODER.FlowNode.OPERATOR_NOTEQUALS = 2),
    (SPLODER.FlowNode.OPERATOR_GREATERTHAN = 3),
    (SPLODER.FlowNode.OPERATOR_LESSTHAN = 4),
    (SPLODER.FlowNode.TARGET_TYPE_NONE = 0),
    (SPLODER.FlowNode.TARGET_TYPE_NUMBER = 1),
    (SPLODER.FlowNode.TARGET_TYPE_STATE = 2),
    (SPLODER.FlowNode.TARGET_TYPE_TAG = 3),
    (SPLODER.FlowNode.TARGET_TYPE_TEXT = 4),
    (SPLODER.FlowNode.TAG_ANY = 0),
    (SPLODER.FlowNode.TAG_PLAYER = -1),
    (SPLODER.FlowNode.TAG_GROUP_GOOD = -2),
    (SPLODER.FlowNode.TAG_GROUP_BAD = -3),
    (SPLODER.FlowNode.rectWidths = [12, 12, 12, 12, 10, 8, 4]),
    (SPLODER.FlowNode.typeVerbStrings = ["", "ON", "IF", "", "", "", "REPEAT"]),
    (SPLODER.FlowNode.subtypeStrings = [
        [""],
        ["", "frame", "start", "collision", "crush", "enter sector", "exit sector", "sector empty", "near", "see", "text button", "state changed", "health changed", "player scored", "item picked up", "item destroyed"],
        ["", "tagged", "state is", "picked up", "contains", "touching", "health", "strength", "range", "armor", "memory", "score"],
        [
            "",
            "goto",
            "allow",
            "disallow",
            "health",
            "strength",
            "range",
            "armor",
            "memory",
            "spawn item",
            "teleport to",
            "pick up",
            "drop",
            "show text",
            "solid off",
            "solid on",
            "self-destruct",
            "lose game",
            "win game",
            "follow",
            "attack",
            "flee",
            "guard",
        ],
        ["", "TELL A", "TELL B", "TELL"],
        ["", "WAIT"],
        ["", "LOOP"],
    ]),
    (SPLODER.FlowNode.subtypeTargetTypes = (function () {
        var e = SPLODER.FlowNode.TARGET_TYPE_NONE,
            t = SPLODER.FlowNode.TARGET_TYPE_NUMBER,
            i = SPLODER.FlowNode.TARGET_TYPE_STATE,
            s = SPLODER.FlowNode.TARGET_TYPE_TAG,
            o = SPLODER.FlowNode.TARGET_TYPE_TEXT;
        return [[e], [e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e], [e, s, i, s, s, s, t, t, t, t, t, t], [e, i, e, e, t, t, t, t, t, s, s, s, s, o, e, e, e, e, e, s, s, s, s], [e, e, e, s], [e, t], [e, t]];
    })()),
    (SPLODER.FlowNode.triggerTerminals = [0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 1]),
    (SPLODER.FlowNode.triggerTypesByScope = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    ]),
    (SPLODER.FlowNode.actionTypesByScope = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    ]),
    (SPLODER.FlowNode.operatorStrings = ["", "equal to", "not equal to", "greater than", "less than"]),
    (SPLODER.FlowNode.operatorSymbols = ["", "==", "!=", ">", "<"]),
    (SPLODER.FlowNode.targetTypeStrings = ["", "", "state", "tag"]),
    (SPLODER.FlowNode.tagStrings = ["any", "player", "good group", "evil group"]),
    (SPLODER.FlowNode.defaults = []),
    (SPLODER.FlowNode.defaultsByType = []),
    (function (e) {
        (e.defaults[e.PROPERTY_SUBTYPE] = 1), (e.defaults[e.PROPERTY_OPERATOR] = SPLODER.FlowNode.OPERATOR_NONE), (e.defaults[e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_NUMBER), (e.defaults[e.PROPERTY_TARGET] = 1);
        for (var t = e.TYPE_TRIGGER; t <= e.TYPE_LOOP; t++) e.defaultsByType[t] = e.defaults.concat();
        (e.defaultsByType[e.TYPE_TRIGGER][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.CONDITION_TOUCHING),
            (e.defaultsByType[e.TYPE_TRIGGER][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_NONE),
            (e.defaultsByType[e.TYPE_TRIGGER][e.PROPERTY_TARGET] = 0),
            (e.defaultsByType[e.TYPE_CONDITION][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.CONDITION_TOUCHING),
            (e.defaultsByType[e.TYPE_CONDITION][e.PROPERTY_OPERATOR] = SPLODER.FlowNode.OPERATOR_EQUALS),
            (e.defaultsByType[e.TYPE_CONDITION][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_TAG),
            (e.defaultsByType[e.TYPE_CONDITION][e.PROPERTY_TARGET] = SPLODER.FlowNode.TAG_ANY),
            (e.defaultsByType[e.TYPE_ACTION][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.ACTION_GOTO_STATE),
            (e.defaultsByType[e.TYPE_ACTION][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_STATE),
            (e.defaultsByType[e.TYPE_ACTION][e.PROPERTY_TARGET] = 1),
            (e.defaultsByType[e.TYPE_CONTEXT][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.CONTEXT_SUBJECT),
            (e.defaultsByType[e.TYPE_CONTEXT][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_TAG),
            (e.defaultsByType[e.TYPE_CONTEXT][e.PROPERTY_TARGET] = SPLODER.FlowNode.TAG_PLAYER),
            (e.defaultsByType[e.TYPE_DELAY][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.DELAY_WAIT),
            (e.defaultsByType[e.TYPE_DELAY][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_NUMBER),
            (e.defaultsByType[e.TYPE_DELAY][e.PROPERTY_TARGET] = 3),
            (e.defaultsByType[e.TYPE_LOOP][e.PROPERTY_SUBTYPE] = SPLODER.FlowNode.LOOP_REPEAT),
            (e.defaultsByType[e.TYPE_LOOP][e.PROPERTY_TARGET_TYPE] = SPLODER.FlowNode.TARGET_TYPE_NUMBER),
            (e.defaultsByType[e.TYPE_LOOP][e.PROPERTY_TARGET] = 0);
    })(SPLODER.FlowNode),
