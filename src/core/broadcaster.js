/* SPLODER.Broadcaster - Event broadcasting mixin */
    (SPLODER.Broadcaster = function () {
        this.hasOwnProperty("_listeners") || (this._listeners = []),
            this.hasOwnProperty("_callbacks") || (this._callbacks = []),
            (this.addListener = function (e, t, i) {
                this._listeners.push(e), this._callbacks.push(i && t ? this.bind(i, t) : t ? t : null);
            }),
            (this.bind = function (e, t) {
                return function () {
                    t.apply(e, arguments);
                };
            }),
            (this.removeListener = function (e) {
                for (var t = this._listeners.length; t--;) this._listeners[t] === e && (this._listeners.splice(t, 1), this._callbacks.splice(t, 1));
            }),
            (this.broadcast = function (e, t) {
                if (0 !== this._listeners.length)
                    for (var i, s = 0; s < this._listeners.length; s++)
                        (i = this._listeners[s]), "string" == typeof i ? (i !== e && "all" !== i) || null === this._callbacks[s] || (t && (t.type = e), this._callbacks[s](t)) : i[e] && i[e](t);
            }),
            this.mousedown ||
            (this.mousedown = function (e) {
                this.broadcast("mousedown", e);
            }),
            this.mousemove ||
            (this.mousemove = function (e) {
                this.broadcast("mousemove", e);
            }),
            this.mouseover ||
            (this.mouseover = function (e) {
                this.broadcast("mouseover", e);
            }),
            this.mouseup ||
            (this.mouseup = function (e) {
                this.broadcast("mouseup", e);
            }),
            this.mouseupoutside ||
            (this.mouseupoutside = function (e) {
                this.broadcast("mouseupoutside", e);
            }),
            this.mouseout ||
            (this.mouseout = function (e) {
                this.broadcast("mouseout", e);
            }),
            this.touchstart ||
            (this.touchstart = function (e) {
                this.broadcast("touchstart", e);
            }),
            this.touchmove ||
            (this.touchmove = function (e) {
                this.broadcast("touchmove", e);
            }),
            this.touchend ||
            (this.touchend = function (e) {
                this.broadcast("touchend", e);
            }),
            this.touchendoutside ||
            (this.touchendoutside = function (e) {
                this.broadcast("touchendoutside", e);
            });
    }),
