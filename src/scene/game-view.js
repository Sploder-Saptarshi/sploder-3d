/* SPLODER.GameView - 3D game view with rendering and interaction */
    (SPLODER.GameView = function () {
        (this.domElement = null),
            (this.renderer = null),
            (this.model = null),
            (this.envModel = null),
            (this.sceneAssets = null),
            (this.loadComplete = null),
            (this.selected = null),
            (this.selectedMeshId = null),
            (this.shiftKey = !1),
            (this.width = 0),
            (this.height = 0),
            (this.tilesize = 32),
            (this.tilesizeHalf = 16),
            (this.sceneModel = null),
            (this.pixelRatio = null),
            (this.sceneMeshesCameraAligned = null),
            (this.camera = null),
            (this.cameraDummy = null),
            (this.cameraAngle = null),
            (this.camControls = null),
            (this.raycaster = null),
            (this.mouse = null),
            (this.isDirty = !0),
            (this.ready = !1);
        var e = !0,
            t = this;
        Object.defineProperty(this, "autoCamera", {
            get: function () {
                return e;
            },
            set: function (i) {
                this.selected.dispatch([SPLODER.ACTION_DESELECT]), (e = i ? !0 : !1), (t.camControls.autoTracking = e);
            },
        });
    }),
    (SPLODER.GameView.prototype.initWithModelsAndSize = function (e, t, i, s, o, n) {
        return (
            (this.model = e),
            (this.envModel = t),
            (this.width = i),
            (this.height = s),
            (this.tilesize = o || 32),
            (this.tilesizeHalf = 0.5 * this.tilesize),
            (this.pixelRatio = n || 1),
            (this.selected = new signals.Signal()),
            (this.raycaster = new THREE.Raycaster()),
            (this.mouse = new THREE.Vector2()),
            (this.sceneAssets = new SPLODER.SceneAssets().init(this.tilesize, this.pixelRatio)),
            (this.loadComplete = new signals.Signal()),
            this
        );
    }),
    (SPLODER.GameView.prototype.setSize = function (e, t) {
        (this.width = e), (this.height = t), (this.camera.aspect = e / t), this.camera.updateProjectionMatrix();
    }),
    (SPLODER.GameView.prototype.build = function (e, t) {
        (this.domElement = e),
            (this.renderer = t),
            (this.camera = new SPLODER.GameCamera(90, this.width / this.height, 10, 2400)),
            (this.cameraAngle = new THREE.Vector3()),
            (this.sceneMeshesCameraAligned = []),
            this.sceneAssets.prepared.addOnce(this.onAssetsPrepared, this),
            this.sceneAssets.load();
    }),
    (SPLODER.GameView.prototype.onAssetsPrepared = function () {
        this.sceneAssets.assignUniformValue("cameraAngle", this.cameraAngle), this.buildScene(), this.loadComplete.dispatch(!0), (this.sceneAssets.forcedUpdateOnly = !1), this.sceneModel.updateLightMap(!0);
    }),
    (SPLODER.GameView.prototype.buildScene = function () {
        (this.sceneModel = new SPLODER.SceneModel().initWithModelsAndSize(this.model, this.envModel, this.sceneAssets, this.tilesize)),
            this.sceneModel.build(this.renderer),
            this.sceneModel.watchModel(),
            this.camera.setModel(this.model, this.tilesize),
            this.camera.setPosition(0, 72 * this.tilesizeHalf, 10 * this.tilesize),
            this.camera.setTarget(0, 76 * this.tilesizeHalf, 10 * this.tilesize - 2e3),
            (this.camera.easeFactor = 0.25);
        var e = this.sceneModel.scene;
        e.add(this.camera), (this.cameraDummy = new THREE.Camera()), e.add(this.cameraDummy);
        var t = (this.camControls = new SPLODER.GameCameraControls().init(this.camera, this.model, this.sceneModel, this.domElement));
        (t.lookSpeed = 0.1),
            (t.movementSpeed = 800),
            (t.noFly = !0),
            (t.lookVertical = !0),
            (t.constrainVertical = !0),
            (t.verticalMin = 0.7),
            (t.verticalMax = 2.2),
            this.camera.changed.add(t.onCameraChanged, t),
            (this.ready = !0),
            t.collisionCheck(),
            this.updatePreview(),
            this.model.changed.add(this.onModelChanged, this);
    }),
    (SPLODER.GameView.prototype.onMouseDown = function (e) {
        (this.mouse.x = e.offsetX), (this.mouse.y = e.offsetY);
    }),
    (SPLODER.GameView.prototype.onMouseUp = function (e) {
        if (Math.abs(this.mouse.x - e.offsetX) + Math.abs(this.mouse.y - e.offsetY) < 10) {
            var t = new THREE.Vector2();
            (t.x = (this.mouse.x / this.width) * 2 - 1), (t.y = -((this.mouse.y / this.height) * 2) + 1), this.raycaster.setFromCamera(t, this.camera);
            for (var i = this.raycaster.intersectObjects(this.sceneModel.scene.children, !0), s = 0; s < i.length; s++)
                if (i[s].hasOwnProperty("object") && i[s].object instanceof THREE.Mesh) {
                    var o,
                        n = i[s].object;
                    if (n.userData.hasOwnProperty("rect")) {
                        if (((o = n.userData.rect), !this.model.itemWithIdIsSelected(o.id, !0))) return (this.selectedMeshId = n.uuid), void this.selected.dispatch([SPLODER.ACTION_SELECT_ITEM, o]);
                        break;
                    }
                }
            this.selected.dispatch([SPLODER.ACTION_DESELECT]);
        }
    }),
    (SPLODER.GameView.prototype.scroll = function (e, t) {
        this.camControls.scroll(e, t);
    }),
    (SPLODER.GameView.prototype.setDirty = function () {
        this.isDirty = !0;
    }),
    (SPLODER.GameView.prototype.onModelChanged = function (e, t, i) {
        if (this.sceneModel) {
            this.isDirty = !0;
            var s = (this.model.selection.length, this.tilesize),
                o = this.tilesizeHalf;
            if (this.autoCamera && !(e >= SPLODER.ACTION_SELECTION_DUPLICATE && e <= SPLODER.ACTION_CLIPBOARD_PASTE)) {
                if (t instanceof Array)
                    if (1 == t.length) t = t[0];
                    else if (t.length) {
                        var n = SPLODER.ShapeUtils.getBounds(this.model.selection);
                        n && this.camera.setTarget((n.x + 0.5 * n.width) * s, n.depth * o + 2 * s, (n.y + 0.5 * n.height) * s);
                    }
                if (e == SPLODER.ACTION_CREATE && t instanceof SPLODER.Item && t.type == SPLODER.Item.TYPE_ITEM && !this.sceneModel.hasObjectWithId(t.id)) {
                    var a = this,
                        r = arguments;
                    setTimeout(function () {
                        a.onModelChanged.apply(a, r);
                    }, 100);
                }
                var h = this.sceneModel.sceneMeshesById;
                if (t instanceof SPLODER.Item && h[t.id])
                    if (SPLODER.Geom.pointWithinRect(this.camera.position.x, this.camera.position.z, t, this.tilesize));
                    else {
                        var l = h[t.id];
                        if (!l) return;
                        var E;
                        if ((this.selectedMeshId && (l[1] && l[1].uuid == this.selectedMeshId ? (E = l[1]) : l[0] && l[0].uuid == this.selectedMeshId && (E = l[0])), !E)) {
                            var d = 0;
                            (i == SPLODER.Item.PROPERTY_CEILDEPTH ||
                                i == SPLODER.Item.PROPERTY_CEILTEXTURE ||
                                i == SPLODER.Item.PROPERTY_CEIL_SKY ||
                                i == SPLODER.Item.PROPERTY_TOPWALLTEXTURE ||
                                i == SPLODER.Item.PROPERTY_TOPWALLCORNICETEXTURE) &&
                                (d = 1),
                                t.type == SPLODER.Item.TYPE_LIQUID && i != SPLODER.Item.PROPERTY_CEILTEXTURE && i != SPLODER.Item.PROPERTY_FLOORTEXTURE && (d = d ? 0 : 1),
                                (E = h[t.id][d]);
                        }
                        E && this.camControls.focusOn(E);
                    }
                (this.selectedMeshId = null), this.setDirty();
            }
        }
    }),
    (SPLODER.GameView.prototype.updatePreview = function () {
        this.ready && (this.isDirty = !1);
    }),
    (SPLODER.GameView.prototype.update = function (e) {
        if (this.ready) {
            var t = this.sceneModel.isDirty;
            this.sceneModel.update(), (this.isDirty || t) && this.updatePreview();
            var s = this.cameraAngle;
            (s.x = 0),
                (s.y = 0),
                (s.z = 1),
                (s.x = 1),
                (s.y = 0),
                (s.z = 0.1),
                s.normalize(),
                s.applyQuaternion(this.camera.quaternion),
                s.z < -1 && (s.z += 2),
                (s.x = Math.atan(s.x) / Math.PI),
                (s.y = Math.acos(s.y) / Math.PI),
                (s.z = Math.asin(s.z) / Math.PI),
                this.camControls.update(e, t),
                this.sceneAssets.setTime((Date.now() / 1e3) % 8),
                this.camera.update();
            var o,
                n = this.sceneMeshesCameraAligned;
            for (i = 0; i < n.length; i++) (o = n[i]), this.cameraDummy.position.copy(this.camera.position), (this.cameraDummy.position.y = o.position.y);
            this.testLiquidMask && (this.camera.alignMaskObject(this.testLiquidMask, -24), (this.testLiquidMask.position.y = Math.min(960, this.camera.position.y)), (this.testLiquidMask.visible = this.camera.position.y <= 1088));
        }
    }),
    (SPLODER.GameView.prototype.render = function (e) {
        e.render(this.sceneModel.scene, this.camera), (this.isDirty = !1);
    }),
