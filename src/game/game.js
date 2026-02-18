/* SPLODER.Game - Top-level game controller */
    (SPLODER.Game = function () {
        SPLODER.Broadcaster.call(this),
            (this.model = null),
            (this.dispatcher = null),
            (this.levels = null),
            (this.levelsDispatcher = null),
            (this.envModel = null),
            (this.envDispatcher = null),
            (this.tagModel = null),
            (this.tagDispatcher = null),
            (this.flowModel = null),
            (this.flowDispatcher = null),
            (this.width = 0),
            (this.height = 0),
            (this.container = null),
            (this.stage3d = null),
            (this.renderer3d = null),
            (this.pixelRatio = null),
            (this.stats = null),
            (this.clock = null),
            (this.gameView = null),
            (this.history = null),
            (this.destroyed = !1);
    }),
    (SPLODER.Game.prototype.initWithSize = function (e, t) {
        (this.model = new SPLODER.GameStore().init()), (this.envModel = new SPLODER.EnvModel().init()), (this.levels = new SPLODER.Levels().initWithModels(this.model, this.envModel));
        var i = (this.width = Math.max(640, Math.min(800, window.innerWidth))),
            s = (this.height = Math.max(480, Math.min(600, window.innerHeight)));
        s >= 768 && this.bottomPanelTab && (panelHeight -= 270),
            (this.tilesize = e),
            (this.pixelRatio = t || 1),
            (this.dispatcher = new signals.Signal()),
            this.model.registerWithDispatcher(this.dispatcher),
            this.dispatcher.add(this.onModelChanged, this),
            this.model.changed.add(this.onModelChanged, this),
            (this.levelsDispatcher = new signals.Signal()),
            this.levels.registerWithDispatcher(this.levelsDispatcher),
            this.levels.changed.add(this.onLevelsChanged, this),
            (this.envDispatcher = new signals.Signal()),
            this.envModel.registerWithDispatcher(this.envDispatcher),
            this.envModel.changed.add(this.onEnvModelChanged, this),
            (this.gameView = new SPLODER.GameView().initWithModelsAndSize(this.model, this.envModel, i, s, 32, this.pixelRatio)),
            this.gameView.selected.add(this.onPreviewSelect, this),
            (this.tagModel = new SPLODER.TagModel().init()),
            (this.tagDispatcher = new signals.Signal()),
            this.tagModel.registerWithDispatcher(this.tagDispatcher),
            (this.flowModel = new SPLODER.FlowStore().init()),
            (this.flowDispatcher = new signals.Signal()),
            this.flowModel.registerWithDispatcher(this.flowDispatcher),
            (this.history = new SPLODER.ModelHistory().init()),
            this.history.registerModel(this.model),
            this.history.registerModel(this.levels),
            this.history.registerModel(this.flowModel),
            this.history.registerModel(this.tagModel),
            this.history.registerModel(this.envModel),
            window.addEventListener("mouseup", SPLODER.bind(this, this.onMouseUp), !1),
            window.addEventListener("keyup", SPLODER.bind(this, this.onMouseUp), !1),
            window.addEventListener("touchend", SPLODER.bind(this, this.onMouseUp), !1);
    }),
    (SPLODER.Game.prototype.build = function (e) {
        this.container = document.getElementById(e);
        var t = (this.width = Math.max(640, Math.min(800, window.innerWidth))),
            i = (this.height = Math.max(480, Math.min(600, window.innerHeight))),
            s = Math.floor(0.5 * t),
            o = Math.floor(i) - 96;
        if ((i >= 768 && this.bottomPanelTab && (o -= 270), this.container)) {
            var n = this,
                a = function (e) {
                    e = window.event || e;
                    var t = null,
                        i = null;
                    "wheelDeltaX" in e ? ((t = 0.25 * e.wheelDeltaX), (i = 0.25 * e.wheelDeltaY)) : "deltaX" in e && ((t = 0 - 0.25 * e.deltaX), (i = 0 - 0.25 * e.deltaY)), n.scroll(t, i, e);
                },
                r = this.container;
            "addEventListener" in r ? (r.addEventListener("mousewheel", a, !1), r.addEventListener("wheel", a, !1)) : r.attachEvent("onmousewheel", a);
            var h = document.getElementById("gameview");
            this.clock = new THREE.Clock();
            var l = (this.renderer3d = new THREE.WebGLRenderer({ premultipliedAlpha: !1, antialias: !1, alpha: !1, overdraw: 1 }));
            (h.style.cursor = "cell"),
                (l.premultipliedAlpha = !0),
                (l.sortObjects = !1),
                l.setPixelRatio(this.pixelRatio),
                l.setSize(s, o),
                l.setClearColor(0, 1),
                (this.stage3d = l.domElement),
                h.appendChild(this.stage3d),
                this.gameView.loadComplete.addOnce(this.onLoadComplete, this),
                this.gameView.build(this.stage3d, l),
                "addEventListener" in r ? (h.addEventListener("mousewheel", a, !1), h.addEventListener("wheel", a, !1)) : h.attachEvent("onmousewheel", a),
                l.domElement.addEventListener("mouseup", SPLODER.bind(this.gameView, this.gameView.onMouseUp), !1),
                l.domElement.addEventListener("mousedown", SPLODER.bind(this.gameView, this.gameView.onMouseDown), !1);
            var E = (this.stats = new Stats());
            E.setMode(0), (E.domElement.style.position = "absolute"), (E.domElement.style.left = "0"), (E.domElement.style.top = "0"), document.body.appendChild(E.domElement), this.onResize(!0);
        }
    }),
    (SPLODER.Game.prototype.onResize = function (e) {
        console.log("RESIZE CALLED", window.orientation, e);
        var t = (this.width = Math.max(640, Math.min(800, window.innerWidth))),
            i = (this.height = Math.max(480, Math.min(600, window.innerHeight)));
        this.renderer3d.setPixelRatio(this.pixelRatio), this.renderer3d.setSize(t, i);
        var s = this;
        e &&
            setTimeout(function () {
                s.onResize();
            }, 1e3);
    }),
    (SPLODER.Game.prototype.start = function () {
        if (!this.started) {
            this.gameView.sceneAssets.forcedUpdateOnly = !1;
            var e = this,
                t = function () {
                    if (!e.destroyed) {
                        requestAnimationFrame(t), e.stats && e.stats.begin();
                        var i = e.gameView;
                        i && i.ready && (i.update(e.clock.getDelta()), i.render(e.renderer3d), e.stats && e.stats.end());
                    }
                };
            this.updateButtonStates(),
                window.addEventListener("resize", SPLODER.bind(this, this.onResize), !1),
                window.addEventListener("orientationchange", SPLODER.bind(this, this.onResize), !1),
                window.scrollTo(0, 1),
                (this.started = !0),
                requestAnimationFrame(t);
        }
    }),
    (SPLODER.Game.prototype.scroll = function (e, t, i) {
        if (i && i.target && i.target.parentNode) {
            var s = i.target.parentNode.id;
            switch (s) {
                case "gameview":
                    this.gameView.scroll(e, t), i.preventDefault();
            }
        }
    }),
    (SPLODER.Game.prototype.onLoadComplete = function () {
        console.log("ASSETS LOAD COMPLETE"), this.dispatcher.dispatch("loadComplete");
    }),
    (SPLODER.Game.prototype.onModelChanged = function () { }),
    (SPLODER.Game.prototype.onLevelsChanged = function (e) {
        (e == SPLODER.ACTION_CONTEXT_CHANGE || e == SPLODER.ACTION_CHANGE) && (this.gameView.setDirty(), this.gameView.sceneModel && this.gameView.sceneModel.setDirty());
    }),
    (SPLODER.Game.prototype.onEnvModelChanged = function (e) {
        e && this.envDispatcher.dispatch(e);
    }),
    (SPLODER.Game.prototype.onPreviewSelect = function (e) {
        this.dispatcher.dispatch(e);
    }),
    (SPLODER.Game.prototype.onMouseUp = function () { }),
    (SPLODER.Game.prototype.updateButtonStates = function (e) {
        var t;
        e instanceof Array && (t = e[0]);
    }),
    (SPLODER.Game.prototype.onButtonPress = function (e, t) {
        if (!(void 0 == e || (t && t.classList.contains("disabled")))) {
            var i = e.split("-")[0],
                s = e.split("-")[1];
            switch ((void 0 == s && ((s = i), (i = "")), console.log(i, s), i)) {
                default:
                    switch (s) {
                        case "fullscreen":
                            var o = document.body;
                            o.requestFullscreen ? o.requestFullscreen() : o.msRequestFullscreen ? o.msRequestFullscreen() : o.mozRequestFullScreen ? o.mozRequestFullScreen() : o.webkitRequestFullscreen && o.webkitRequestFullscreen(),
                                document.body.classList.add("fullscreen");
                            break;
                        case "exitfullscreen":
                            document.exitFullscreen
                                ? document.exitFullscreen()
                                : document.msExitFullscreen
                                    ? document.msExitFullscreen()
                                    : document.mozCancelFullScreen
                                        ? document.mozCancelFullScreen()
                                        : document.webkitExitFullscreen && document.webkitExitFullscreen(),
                                document.body.classList.remove("fullscreen");
                    }
            }
        }
    });
