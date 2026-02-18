/* SPLODER.SceneModel - 3D scene model with mesh building and management */
    (SPLODER.SceneModel = function () {
        (this.model = null),
            (this.shapes = null),
            (this.shapesById = null),
            (this.ceilingShapes = null),
            (this.tilesize = 32),
            (this.tilesizeHalf = 16),
            (this.scene = null),
            (this.renderer = null),
            (this.sceneMeshes = null),
            (this.sceneMeshesById = null),
            (this.sceneUniforms = null),
            (this.sceneUniformsById = null),
            (this.sceneMeshesCameraAligned = null),
            (this.light = null),
            (this.camera = null),
            (this.cameraDummy = null),
            (this.cameraAngle = null),
            (this.isDirty = !0),
            (this.assets = null),
            (this.lightMap = null),
            (this.emptyArray = []);
    }),
    (SPLODER.SceneModel.prototype.initWithModelsAndSize = function (e, t, i, s) {
        return (
            (this.model = e),
            (this.envModel = t),
            (this.assets = i),
            (this.tilesize = s || 32),
            (this.tilesizeHalf = 0.5 * this.tilesize),
            (this.shapesById = []),
            (this.sceneMeshes = []),
            (this.sceneMeshesById = []),
            (this.sceneUniforms = []),
            (this.sceneUniformsById = []),
            SPLODER.ShapeUtils.errorOccured.add(this.onError),
            this
        );
    }),
    (SPLODER.SceneModel.prototype.build = function (e) {
        var t;
        (this.renderer = e), (this.scene = new THREE.Scene()), (t = new THREE.PointLight(16777215, 1, 2560)), (t.position.y = 1152), this.scene.add(t);
        var i = this.envModel.getEnvs();
        i ? this.setSkyColor(null, i[SPLODER.EnvModel.PROPERTY_SKY_COLOR]) : console.log("ENVIRONMENT UNDEFINED");
    }),
    (SPLODER.SceneModel.prototype.watchModel = function () {
        this.model.changed.add(this.onModelChanged, this), this.envModel.changed.add(this.onEnvModelChanged, this), this.updateModel();
    }),
    (SPLODER.SceneModel.prototype.setAllUniforms = function (e, t) {
        for (var i = this.sceneUniforms, s = i.length; s--;) (u = i[s]), u && u.hasOwnProperty(e) && (u[e].value = t);
    }),
    (SPLODER.SceneModel.prototype.onModelChanged = function (e, t, i) {
        var s,
            o,
            n,
            a,
            r,
            h,
            l = this.sceneUniformsById,
            E = this.model.selection;
        if (e == SPLODER.ACTION_DESELECT) return void this.setAllUniforms("selected", 0);
        if ((e == SPLODER.ACTION_CONTEXT_CHANGE && (this.setDirty(), this.assets.setLightMapDirty()), t instanceof Array))
            switch (e) {
                case SPLODER.ACTION_SET_CURRENTSTATE:
                    if ((o = t.length)) for (; o--;) (n = t[o]), this.updateMeshPositionById(n.id), this.updateMeshTexturesById(n.id);
                    else this.setDirty();
                    console.log("state changed!");
                    break;
                case SPLODER.ACTION_SELECT_ALL:
                case SPLODER.ACTION_SELECT_ITEM:
                case SPLODER.ACTION_SELECT_POINT:
                case SPLODER.ACTION_SELECT_WINDOW:
                    for (this.setAllUniforms("selected", 0), o = t.length; o--;) if (((n = t[o]), (r = l[n.id]))) for (s = r.length; s--;) (a = r[s]), a && a.selected && (a.selected.value = 1);
                    break;
                case SPLODER.ACTION_TWEAK:
                    if (i < SPLODER.Item.PROPERTY_HEALTH) for (o = t.length, this.removeMeshesById(t); o--;) (n = t[o]), this.buildMesh(n);
                    else i == SPLODER.Item.PROPERTY_GRAVITY && this.updateMeshPositionById(t[0].id);
                    break;
                case SPLODER.ACTION_CHANGE:
                    for (o = t.length; o--;)
                        switch (((n = t[o]), (r = l[n.id]), i)) {
                            case SPLODER.Item.PROPERTY_FLOORDEPTH:
                            case SPLODER.Item.PROPERTY_CEILDEPTH:
                                n.type == SPLODER.Item.TYPE_WALL || n.type == SPLODER.Item.TYPE_PANEL || n.type == SPLODER.Item.TYPE_ITEM
                                    ? this.updateMeshPositionById(n.id)
                                    : n.type == SPLODER.Item.TYPE_PLATFORM
                                        ? this.updateRectMeshes(n, !0)
                                        : n.type == SPLODER.Item.TYPE_LIQUID && (this.updateMeshPositionById(n.id), this.updateVertexColorsIntersecting(n));
                            case SPLODER.Item.PROPERTY_LIGHTLEVEL:
                            case SPLODER.Item.PROPERTY_LIGHTEFFECT:
                            case SPLODER.Item.PROPERTY_COLOR:
                            case SPLODER.Item.PROPERTY_POWER:
                                this.assets.setLightMapDirty();
                                break;
                            case SPLODER.Item.PROPERTY_TOPLEFT:
                            case SPLODER.Item.PROPERTY_TOPRIGHT:
                            case SPLODER.Item.PROPERTY_BOTTOMRIGHT:
                            case SPLODER.Item.PROPERTY_BOTTOMLEFT:
                                if ((n.type == SPLODER.Item.TYPE_LIQUID && this.updateVertexColorsIntersecting(n), 1 == t.length && n.type > SPLODER.Item.TYPE_LIQUID)) return this.removeMeshesById(t), void this.buildMesh(n);
                                this.updateMeshesNear(E, !0);
                                break;
                            case SPLODER.Item.PROPERTY_FLOORTEXTURE:
                            case SPLODER.Item.PROPERTY_CEILTEXTURE:
                            case SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE:
                            case SPLODER.Item.PROPERTY_BOTTOMWALLCORNICETEXTURE:
                            case SPLODER.Item.PROPERTY_TOPWALLTEXTURE:
                            case SPLODER.Item.PROPERTY_TOPWALLCORNICETEXTURE:
                                if (!(n.type <= SPLODER.Item.TYPE_ITEM)) return this.removeMeshesById(t), void this.buildMesh(n);
                                this.updateMeshTexturesById(n.id), n.type == SPLODER.Item.TYPE_LIQUID && this.updateVertexColorsIntersecting(n);
                                break;
                            default:
                                this.setDirty();
                        }
                    break;
                case SPLODER.ACTION_SELECTION_MOVE:
                    if (1 == E.length) {
                        if (((h = E[0]), h.type == SPLODER.Item.TYPE_LIGHT)) return void this.assets.setLightMapDirty();
                        if (h.type > SPLODER.Item.TYPE_LIQUID) return this.removeMeshesById(h), void this.buildMesh(h);
                    }
                    for (this.updateMeshesNear(E, !0), s = E.length; s--;) (h = E[s]), h && h.type == SPLODER.Item.TYPE_LIQUID && this.updateVertexColorsIntersecting(h);
                    break;
                case SPLODER.ACTION_SELECTION_DELETE:
                    this.removeShapes(t), this.removeMeshesById(t), this.updateMeshesNear(t);
                    break;
                default:
                    this.setDirty();
            }
        else
            switch (e) {
                case SPLODER.ACTION_CREATE:
                    this.buildMesh(t), this.assets.setLightMapDirty();
                    break;
                case SPLODER.ACTION_CHANGE_COMPLETE:
                    t.type > SPLODER.Item.TYPE_LIQUID ? (this.removeMeshesById(t), this.buildMesh(t)) : this.updateMeshesNear([t]);
                    break;
                default:
                    this.setDirty();
            }
    }),
    (SPLODER.SceneModel.prototype.onEnvModelChanged = function () {
        console.log("ENV MODEL CHANGED", arguments);
        var e = this.envModel.getEnvs(),
            t = new THREE.Color();
        t.setHex(e[SPLODER.EnvModel.PROPERTY_SKY_COLOR]), this.setSkyColor(t);
    }),
    (SPLODER.SceneModel.prototype.setDirty = function () {
        this.isDirty = !0;
    }),
    (SPLODER.SceneModel.prototype.hasObjectWithId = function (e) {
        return null != this.sceneMeshesById[e];
    }),
    (SPLODER.SceneModel.prototype.getFloorLevel = function (e, t) {
        var i = this.tilesizeHalf,
            s = 0,
            o = this.model.getItemsUnderPoint(e, t, 0, null, !1, SPLODER.Item.TYPE_PLATFORM);
        o && (s = Math.max(s, o.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) * i));
        var n = this.model.getItemsUnderPoint(e, t, 0, null, !1, SPLODER.Item.TYPE_WALL);
        n && (s = Math.max(s, n.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) * i));
        var a = this.model.getItemsUnderPoint(e, t, 0, null, !1, SPLODER.Item.TYPE_LIQUID);
        return a && (s = Math.max(s, a.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) * i - a.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) * i)), o || n || !this.camera || (s = Math.floor(this.camera.position.y / i)), s;
    }),
    (SPLODER.SceneModel.prototype.removeMeshesById = function (e, t) {
        e instanceof Array || (e = [e]);
        var i,
            s = e.length,
            o = null;
        for (t && (o = []); s--;) {
            i = e[s].id;
            var n = this.sceneMeshesById[i];
            if (n) {
                for (var a, r, h = n.length; h--;)
                    (a = n[h]),
                        (a instanceof THREE.Group || a instanceof THREE.Mesh) &&
                        ((r = this.sceneMeshes.indexOf(a)),
                            -1 != r && this.sceneMeshes.splice(r, 1),
                            t && (a instanceof THREE.Mesh ? o.push(a.material) : a.userData.biped && (o = a.userData.biped.materials)),
                            this.scene.remove(a),
                            SPLODER.MeshUtils.destroyMesh(a, t));
                (this.sceneMeshesById[i] = null), (this.sceneUniformsById[i] = null);
            }
        }
        return o;
    }),
    (SPLODER.SceneModel.prototype.updateMeshPositionById = function (e, t) {
        var i,
            s,
            o,
            n = this.sceneMeshesById[e];
        if (((t = t || 0), n))
            for (i = 0; 2 > i; i++)
                if (((s = i), n[i])) {
                    if (((o = n[i].userData.rect), !t && o.type == SPLODER.Item.TYPE_PLATFORM && o.root != o)) return void this.updateMeshPositionById(o.root.id);
                    this.updateMeshPosition(n[i], o, s);
                }
        if (o && o.type <= SPLODER.Item.TYPE_PLATFORM && (i = o.numChildren)) for (var a = o.children; i--;) this.updateMeshPositionById(a[i].id, t + 1);
    }),
    (SPLODER.SceneModel.prototype.updateMeshPosition = function (e, t, i) {
        if (e && t) {
            var s,
                o,
                n = this.tilesize,
                a = this.tilesizeHalf,
                r = t.x,
                h = t.y,
                l = t.width,
                E = t.height,
                d = 0,
                R = t.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH),
                P = t.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH);
            switch (t.type) {
                case SPLODER.Item.TYPE_WALL:
                    i ? this.placeMesh(e, t, r * n, Math.max(P, R) * a, h * n, (90 * Math.PI) / 180, -1) : this.placeMesh(e, t, r * n, R * a, h * n, (90 * Math.PI) / 180);
                    break;
                case SPLODER.Item.TYPE_PLATFORM:
                    this.placeMesh(e, t, r * n, R * a, h * n, (90 * Math.PI) / 180);
                    break;
                case SPLODER.Item.TYPE_LIQUID:
                    i ? this.placeMesh(e, t, r * n + 0.5 * l * n, t.getAttrib(SPLODER.Item.PROPERTY_LIQUIDLEVEL) * a + 0.01, h * n + 0.5 * E * n, (-90 * Math.PI) / 180) : this.placeMesh(e, t, r * n, R * a, h * n, (90 * Math.PI) / 180);
                    break;
                case SPLODER.Item.TYPE_PANEL:
                    (s = e.geometry.parameters.width), (o = e.geometry.parameters.height), (d = 0), E > l && (d = 0.5 * Math.PI), this.placeMesh(e, t, r * n + 0.5 * l * n, R * a + 0.5 * o, h * n + 0.5 * E * n), (e.rotation.y = d);
                    break;
                case SPLODER.Item.TYPE_ITEM:
                    o = e.geometry.parameters.height;
                    var c = t.getAttrib(SPLODER.Item.PROPERTY_GRAVITY);
                    c ? this.placeMesh(e, t, r * n, this.getFloorLevel(r, h) + 0.5 * o, h * n) : this.placeMesh(e, t, r * n, R * a + 0.5 * o, h * n);
                    break;
                case SPLODER.Item.TYPE_BIPED:
                    this.placeMesh(e, t, r * n, this.getFloorLevel(r, h), h * n, 0, 1, (t.getAttrib(SPLODER.Item.PROPERTY_ROTATION) * Math.PI) / 180);
            }
        }
    }),
    (SPLODER.SceneModel.prototype.updateMeshTexturesById = function (e) {
        var t = this.sceneMeshesById[e];
        if (t) {
            var i = this.model.getItemById(e);
            if ((t[0] && this.setTextures(i, t[0].material), t[1] && this.setTextures(i, t[1].material), i && i.type <= SPLODER.Item.TYPE_LIQUID)) {
                var s = i.numChildren;
                if (s) for (var o = i.children; s--;) this.updateMeshTexturesById(o[s].id);
            }
        }
    }),
    (SPLODER.SceneModel.prototype.setVertexColors = function (e, t) {
        if (e && t && t.faces) {
            for (var i, s, o, n, a, r = t.faces.length, h = t.vertices, l = !1; r--;)
                (i = t.faces[r]),
                    (s = i.normal),
                    i.color.setRGB(0, 0, 0),
                    (o = (h[i.a].x + h[i.b].x + h[i.c].x) / 3 / 32),
                    (n = (h[i.a].y + h[i.b].y + h[i.c].y) / 3 / 32),
                    (o += e.x),
                    (n += e.y),
                    (a = this.model.getItemUnderPoint(o, n, 0, SPLODER.Item.TYPE_LIQUID)),
                    a && (i.color.setRGB(a.getAttrib(SPLODER.Item.PROPERTY_LIQUIDLEVEL), a.getAttrib(SPLODER.Item.PROPERTY_LIQUIDTYPE), 0), (l = !0));
            l && (t.colorsNeedUpdate = !0);
        }
    }),
    (SPLODER.SceneModel.prototype.setTextures = function (e, t) {
        if (e && t) {
            var i,
                s = t.uniforms,
                o = s.ceiling ? s.ceiling.value : 0;
            e.type != SPLODER.Item.TYPE_LIQUID || o || (i = SPLODER.SceneAssets.TYPE_WALLS);
            var n,
                a,
                r,
                h = this.assets.getTextureSet(e, i),
                l = [];
            switch (e.type) {
                case SPLODER.Item.TYPE_LIQUID:
                    if (o) {
                        s.textureSet.value = [e.getAttrib(SPLODER.Item.PROPERTY_LIQUIDTYPE), 0, 0];
                        break;
                    }
                case SPLODER.Item.TYPE_WALL:
                    if (o && e.getAttrib(SPLODER.Item.PROPERTY_CEIL_SKY)) return;
                case SPLODER.Item.TYPE_PLATFORM:
                    if (s.textureSet) {
                        for (s.textureSet.value = n = o ? h[1] : h[0], r = 0; 3 > r; r++) (a = n[r]), (l = l.concat(this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_WALLS, a)));
                        s.frames.value = l;
                    }
                    break;
                case SPLODER.Item.TYPE_PANEL:
                case SPLODER.Item.TYPE_ITEM:
                    for (n = h, s.textureSet.value = n, r = 0; 3 > r; r++) (a = n[r]), (l = l.concat(this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_ITEMS, a)));
                    s.frames.value = l;
            }
            s.hasOwnProperty("selected") && (s.selected.value = this.model.itemWithIdIsSelected(e.id) ? 1 : 0);
        }
    }),
    (SPLODER.SceneModel.prototype.buildMesh = function (e, t, i, s) {
        if (e) {
            if (e instanceof Array) return void console.log("RECT IS ARRAY", e);
            if (((s = s || this.emptyArray), null == t && (e.type < SPLODER.Item.TYPE_LIQUID || (e.type == SPLODER.Item.TYPE_LIQUID && !i)))) {
                var o = i ? this.ceilingShapes : this.shapes;
                if (o)
                    for (var n = o.length; n--;)
                        try {
                            if (o[n].userData.parentNode.id == e.id) {
                                t = o[n];
                                break;
                            }
                        } catch (a) {
                            console.log("error checking rectShape");
                        }
                if (null == t) return console.log("Error! Item shape not found for rect", e.id, i, this.shapes.length, this.ceilingShapes.length), void this.setDirty();
            }
            var r,
                h,
                l,
                E,
                d,
                R,
                P,
                c,
                u,
                O,
                L,
                S,
                T,
                D,
                m,
                f,
                p = this.tilesize,
                g = this.tilesizeHalf;
            (L = e.x), (S = e.y), (T = e.width), (D = e.height);
            var y = { bevelEnabled: !1 };
            switch (
            ((l = e.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (d = e.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH)), (E = e.getAttrib(SPLODER.Item.PROPERTY_CEIL_SKY)), (R = this.assets.getTextureSet(e)), (h = null), (c = null), e.type)
            ) {
                case SPLODER.Item.TYPE_WALL:
                    y.amount = 128 * g;
                    try {
                        r = new THREE.ExtrudeGeometry(t, y);
                    } catch (a) {
                        return void console.log(a.stack);
                    }
                    if (i && E) (P = this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_SKIES)), (c = P.uniforms);
                    else {
                        var I = i ? 1 : 0;
                        (P = s[I] instanceof THREE.ShaderMaterial ? s[I] : this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_WALLS)),
                            (c = P.uniforms),
                            c && c.ceiling && (c.ceiling.value = i ? 1 : 0),
                            this.setTextures(e, P),
                            this.setVertexColors(e, r);
                    }
                    (h = new THREE.Mesh(r, P)), this.updateMeshPosition(h, e, i);
                    break;
                case SPLODER.Item.TYPE_PLATFORM:
                    y.amount = Math.max(1, d) * g;
                    try {
                        r = new THREE.ExtrudeGeometry(t, y);
                    } catch (a) {
                        return void console.log(a.stack);
                    }
                    (P = s[0] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_WALLS)),
                        (c = P.uniforms),
                        (c.ceiling.value = 0),
                        this.setTextures(e, P),
                        this.setVertexColors(e, r),
                        (h = new THREE.Mesh(r, P)),
                        this.updateMeshPosition(h, e);
                    break;
                case SPLODER.Item.TYPE_LIQUID:
                    if (i) (r = new THREE.PlaneBufferGeometry(e.width * p, e.height * p, 1)), (P = s[0] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_LIQUIDS)), (c = P.uniforms), (c.ceiling.value = 1), this.setTextures(e, P);
                    else if (0 != e.getAttrib(SPLODER.Item.PROPERTY_LIQUID_HASFLOOR)) {
                        y.amount = 128 * g;
                        try {
                            r = new THREE.ExtrudeGeometry(t, y);
                        } catch (a) {
                            return void console.log(a.stack);
                        }
                        (P = this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_WALLS)), (c = P.uniforms), (c.ceiling.value = 0), this.setTextures(e, P), this.setVertexColors(e, r);
                    }
                    (h = new THREE.Mesh(r, P)), this.updateMeshPosition(h, e, i);
                    break;
                case SPLODER.Item.TYPE_PANEL:
                case SPLODER.Item.TYPE_ITEM:
                    if (
                        ((P = s[0] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_ITEMS)),
                            (c = P.uniforms),
                            (u = this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_ITEMS, R[0])),
                            (m = 3 * u[2] || 16),
                            (f = 3 * u[3] || 16),
                            e.type == SPLODER.Item.TYPE_PANEL)
                    ) {
                        var w = m / f;
                        (m = T >= D ? T : D), (f = m / w), (m *= p), (f *= p);
                    }
                    (r = new THREE.PlaneGeometry(m, f, 1)),
                        (c.nofollow.value = e.type == SPLODER.Item.TYPE_PANEL && T != D ? 1 : 0),
                        this.setTextures(e, P),
                        this.setVertexColors(e, r),
                        (h = new THREE.Mesh(r, P)),
                        this.updateMeshPosition(h, e);
                    break;
                case SPLODER.Item.TYPE_BIPED:
                    (P = s[0] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_BIPEDS)), (c = P.uniforms), (c.selected.value = this.model.itemWithIdIsSelected(e.id) ? 1 : 0);
                    var v = e.getAttrib(SPLODER.Biped.PROPERTY_ITEMFRAME_RIGHT),
                        _ = e.getAttrib(SPLODER.Biped.PROPERTY_ITEMFRAME_LEFT);
                    if (v >= 0) {
                        var M = s[1] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_BIPEDS);
                        this.assets.setAltTexture(M, SPLODER.SceneAssets.TYPE_ITEMS);
                        var A = this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_ITEMS, v);
                        M.uniforms.frames.value = A.concat(A, A);
                    }
                    if (_ >= 0) {
                        var N = s[2] || this.assets.getNewMaterial(SPLODER.SceneAssets.TYPE_BIPEDS);
                        this.assets.setAltTexture(N, SPLODER.SceneAssets.TYPE_ITEMS);
                        var x = this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_ITEMS, _);
                        N.uniforms.frames.value = x.concat(x, x);
                    }
                    (O = R[0]), (u = this.assets.getTextureFrames(SPLODER.SceneAssets.TYPE_BIPEDS, O));
                    var Y = new SPLODER.Biped().initWithRectAndMaterial(e, P, u[0] || 0, u[1] || 0);
                    Y.setItemMaterials(M, A, N, x), Y.build(), (h = Y.mesh);
                    var C = this;
                    Y.geometries.forEach(function (t) {
                        C.setVertexColors(e, t);
                    }),
                        this.updateMeshPosition(h, e);
            }
            h &&
                c &&
                (this.scene.add(h),
                    this.sceneMeshes.push(h),
                    this.sceneMeshesById[e.id] ? this.sceneMeshesById[e.id].push(h) : (this.sceneMeshesById[e.id] = [h]),
                    this.sceneUniforms.push(c),
                    this.sceneUniformsById[e.id] ? this.sceneUniformsById[e.id].push(c) : (this.sceneUniformsById[e.id] = [c]));
        }
    }),
    (SPLODER.SceneModel.prototype.placeMesh = function (e, t, i, s, o, n, a, r) {
        (e.userData.rect = t), e.position.set(i, s, o), isNaN(n) || (e.rotation.x = n), isNaN(r) || (e.rotation.y = r), isNaN(a) || (e.scale.z = a);
    }),
    (SPLODER.SceneModel.prototype.updateRectMeshes = function (e, t, i) {
        if (e instanceof SPLODER.Item) {
            var s = this.removeMeshesById([e], i);
            if ((this.buildMesh(e, null, !1, s), (e.type == SPLODER.Item.TYPE_LIQUID || (e.type == SPLODER.Item.TYPE_WALL && e.getAttrib(SPLODER.Item.PROPERTY_CEIL))) && this.buildMesh(e, null, !0, s), t && e.numChildren))
                for (var o = e.numChildren; o--;) this.updateRectMeshes(e.children[o], !0, i);
        }
    }),
    (SPLODER.SceneModel.prototype.removeShapes = function (e) {
        for (var t, i, s, o, n, a = [this.shapes, this.ceilingShapes], r = 2; r--;)
            if (((t = a[r]), t instanceof Array))
                for (s = e.length; s--;)
                    for (o = e[s], i = t.length; i--;) {
                        n = t[i];
                        try {
                            if (n.userData.parentNode.id == o.id) {
                                t.splice(i, 1);
                                break;
                            }
                        } catch (h) {
                            console.log("Error! Shape does not contain reference to rect.");
                        }
                    }
    }),
    (SPLODER.SceneModel.prototype.updateShapes = function (e) {
        var t;
        e
            ? (this.removeShapes(e),
                (t = SPLODER.ShapeUtils.getShapes(e, !1, this.tilesize, this.model.items)),
                (this.shapes = this.shapes.concat(t)),
                (this.ceilingShapes = this.ceilingShapes.concat(SPLODER.ShapeUtils.getShapes(e, !0, this.tilesize, this.model.items))))
            : (console.log("UPDATING SHAPES"), (t = this.shapes = SPLODER.ShapeUtils.getShapes(this.model.items, !1, this.tilesize)), (this.ceilingShapes = SPLODER.ShapeUtils.getShapes(this.model.items, !0, this.tilesize)));
        var i = this.shapes.length;
        for (this.shapesById = []; i--;) {
            var s = this.shapes[i];
            s && s.userData && s.userData.parentNode && (this.shapesById[s.userData.parentNode.id] = s[0]);
        }
        return t;
    }),
    (SPLODER.SceneModel.prototype.updateVertexColorsIntersecting = function (e) {
        if (e instanceof SPLODER.Item) {
            var t = this.model.getItemsIntersectingRect(e.x - 1, e.y - 1, e.width + 2, e.height + 2);
            if (t instanceof Array) {
                var i,
                    s = this;
                t.forEach(function (e) {
                    var t = s.sceneMeshesById[e.id];
                    t instanceof Array &&
                        t.length &&
                        (e.type == SPLODER.Item.TYPE_BIPED
                            ? ((i = t[0].userData.biped),
                                i.geometries.forEach(function (t) {
                                    s.setVertexColors(e, t);
                                }))
                            : s.setVertexColors(e, t[0].geometry));
                });
            }
        }
    }),
    (SPLODER.SceneModel.prototype.updateMeshesNear = function (e, t) {
        if (e instanceof Array) {
            if (e.length > 16 || e.length > 0.5 * this.model.items.length) return void this.setDirty();
            var i = SPLODER.ShapeUtils.getBounds(e);
            if (i) {
                var s = this.model.getItemsIntersectingRect(i.x - 8, i.y - 8, i.width + 16, i.height + 16);
                if (s && s.length) {
                    SPLODER.ShapeUtils.sortByAreaDesc(s), this.updateShapes(s), this.assets.setLightMapDirty();
                    for (var o = s.length; o--;) this.updateRectMeshes(s[o], !1, t);
                }
            }
        }
    }),
    (SPLODER.SceneModel.prototype.updateLightMap = function (e) {
        this.assets.updateLightMap(this.model, this.shapes, e);
    }),
    (SPLODER.SceneModel.prototype.setSkyColor = function (e, t) {
        e && !t && (t = e.getHex()), (this.scene.fog = new THREE.Fog(t, 1200, 2400)), this.renderer.setClearColor(t);
    }),
    (SPLODER.SceneModel.prototype.updateModel = function () {
        if (this.isDirty) {
            this.updateShapes();
            for (var e, t, i = this.scene.children.length; i--;)
                (t = this.scene.children[i]), t.hasOwnProperty("children") && t.children.length > 0 ? this.scene.remove(t) : t instanceof THREE.Mesh && (this.scene.remove(t), t.geometry.dispose());
            (this.sceneMeshes = []), (this.sceneMeshesById = []), (this.sceneUniforms = []), (this.sceneUniformsById = []);
            var s,
                o,
                n = this.shapes,
                a = this.ceilingShapes;
            for (e = n.length; e--;) (s = n[e]), (o = s.userData.parentNode), !o || o.width <= 0 || o.height <= 0 || this.buildMesh(o, s);
            for (e = a.length; e--;) (s = a[e]), (o = s.userData.parentNode), o.width <= 0 || o.height <= 0 || this.buildMesh(o, s, !0);
            for (e = n.length; e--;) (s = n[e]), (o = s.userData.parentNode), o && o.type == SPLODER.Item.TYPE_LIQUID && this.buildMesh(o, s, !0);
            var r = this.model.items;
            for (e = r.length; e--;) (o = r[e]), (o.type == SPLODER.Item.TYPE_ITEM || o.type == SPLODER.Item.TYPE_BIPED || o.type == SPLODER.Item.TYPE_PANEL) && this.buildMesh(o);
            (this.isDirty = !1), this.assets.forcedUpdateOnly || this.assets.setLightMapDirty();
        }
    }),
    (SPLODER.SceneModel.prototype.update = function () {
        this.isDirty && this.updateModel(), this.updateLightMap();
    }),
    (SPLODER.SceneModel.prototype.onError = function (e) {
        console.log("Triangulation error in rect", e.id);
    });
