/* SPLODER.SceneAssets - Asset loading, materials, textures */
    (SPLODER.SceneAssets = function () {
        var e = null,
            t = 16,
            i = 1,
            s = null,
            o = null,
            n = {},
            a = [],
            r = [],
            h = [],
            l = [],
            E = [],
            d = 0,
            R = 0,
            P = 0,
            c = 0,
            u = !0,
            O = this;
        (this.prepared = null), (this.forcedUpdateOnly = !0);
        var L = function () {
            var t,
                o,
                d,
                R,
                P = n;
            for (
                P.time = { type: "f", value: 0 },
                P.lightMap = { type: "t", value: s.texture },
                P.lightMapSize = { type: "v4", value: s.size },
                P.cameraAngle = { type: "v3", value: new THREE.Vector3() },
                P.pixelRatio = { type: "f", value: i },
                P.lights = { type: "fv", value: [] },
                t = 0;
                96 > t;
                t++
            )
                P.lights.value.push(0);
            for (R = e.types, t = 0; t < R.length; t++)
                if ("shader" == e.materials[t]) {
                    (a[t] = document.getElementById("vertexShader_" + R[t]).innerHTML),
                        (r[t] = document.getElementById("fragmentShader_" + R[t]).innerHTML),
                        (h[t] = THREE.UniformsUtils.merge([THREE.UniformsLib.fog])),
                        l[t] && ((d = l[t]), (h[t].textureMap = { type: "t", value: d }), (h[t].textureMapSize = { type: "v2", value: new THREE.Vector2(d.image.width, d.image.height) }));
                    var c,
                        u = e.types[t],
                        O = e.uniformsKeys[u];
                    for (o = 0; o < O.length; o++)
                        if (((c = O[o]), -1 != e.globalUniformsKeys.indexOf(c))) h[t][c] = P[c];
                        else
                            switch (c) {
                                case "textureSet":
                                    h[t].textureSet = { type: "fv1", value: [1, 1, 1] };
                                    break;
                                case "frames":
                                    h[t].frames = { type: "fv1", value: [0, 0, 16, 16, 0, 0, 16, 16, 0, 0, 16, 16] };
                                    break;
                                case "selected":
                                case "ceiling":
                                case "nofollow":
                                case "noOverlap":
                                case "spherical":
                                    h[t][c] = { type: "1i", value: 0 };
                            }
                    E[t] = new THREE.ShaderMaterial({ uniforms: h[t], vertexShader: a[t], fragmentShader: r[t], fog: !0, side: e.side[t], vertexColors: e.colors[t], transparent: e.transparent[t] });
                } else
                    "basic" == e.materials[t] &&
                        (E[t] = new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, side: THREE.DoubleSide, color: 255, transparent: e.transparent[t], depthWrite: e.depth[t], depthTest: e.depth[t] }));
        },
            S = function () {
                R++, R == d && (L(), O.prepared.dispatch(!0));
            },
            T = function () {
                for (var i, o, n = e.maps, a = 0; a < n.length; a++)
                    (i = n[a]),
                        i &&
                        (d++,
                            (o = l[a] = THREE.ImageUtils.loadTexture(i.src, null, SPLODER.bind(O, S))),
                            (o.wrapS = i.wrapS),
                            (o.wrapT = i.wrapT),
                            (o.magFilter = i.magFilter),
                            (o.minFilter = i.minFilter),
                            i.repeat && o.repeat.set(1 / t, 1 / t));
                s = new SPLODER.ShaderLightMap().init();
            },
            D = function (e, t, i) {
                (o[i] = e.frames), c++, c == P && T();
            },
            m = function () {
                for (var t, i, s = e.atlases, o = 0; o < s.length; o++) (t = s[o]), t && (P++, (i = new SPLODER.AtlasLoader()), i.load(i, s[o], SPLODER.bind(this, D), null, null, o));
            };
        (this.init = function (e, s) {
            return (t = e), (i = s), (o = []), (this.prepared = new signals.Signal()), this;
        }),
            (this.load = function () {
                var t = document.getElementById("assets_manifest").innerHTML;
                (e = JSON.parse(t)), m();
            }),
            (this.setLightMapDirty = function () {
                u = !0;
            }),
            (this.updateLightMap = function (e, t, i) {
                if ((!this.forcedUpdateOnly || i) && u) {
                    s.update(e, t);
                    for (var o = 0; o < E.length; o++) E[o].needsUpdate = !0;
                    u = !1;
                }
            }),
            (this.assignUniformValue = function (e, t) {
                n[e] && (n[e].value = t);
            }),
            (this.getNewMaterial = function (t) {
                var i = E[t],
                    s = i.clone();
                return i instanceof THREE.ShaderMaterial && SPLODER.shallowCopyUniforms(h[t], s.uniforms, e.globalUniformsKeys), s;
            }),
            (this.setAltTexture = function (e, t) {
                h[t] && ((e.uniforms.textureMap = h[t].textureMap), (e.uniforms.textureMapSize = h[t].textureMapSize));
            }),
            (this.getSpritesheetTexture = function (e) {
                return l[e];
            }),
            (this.getTextureFrames = function (e, t) {
                return o[e] ? o[e][Math.min(t, o[e].length - 1)] : void 0;
            }),
            (this.getTextureSet = function (e, t) {
                switch ((void 0 === t && (t = e.type), t)) {
                    case SPLODER.Item.TYPE_WALL:
                    case SPLODER.Item.TYPE_PLATFORM:
                        var i = e.getAttribs(SPLODER.Item.PROPERTY_FLOORTEXTURE, SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE, SPLODER.Item.PROPERTY_BOTTOMWALLCORNICETEXTURE),
                            s = e.getAttribs(SPLODER.Item.PROPERTY_CEILTEXTURE, SPLODER.Item.PROPERTY_TOPWALLTEXTURE, SPLODER.Item.PROPERTY_TOPWALLCORNICETEXTURE);
                        return -1 == i[2] && (i[2] = i[1]), -1 == s[0] && (s[0] = i[0]), -1 == s[1] && (s[1] = i[1]), -1 == s[2] && (s[2] = s[1]), [i, s];
                    case SPLODER.Item.TYPE_PANEL:
                    case SPLODER.Item.TYPE_ITEM:
                        var o = e.getAttribs(SPLODER.Item.PROPERTY_TEXTURE1, SPLODER.Item.PROPERTY_TEXTURE2, SPLODER.Item.PROPERTY_TEXTURE3);
                        return -1 == o[1] && (o[1] = o[0]), -1 == o[2] && (o[2] = o[0]), o;
                    case SPLODER.Item.TYPE_BIPED:
                        return [e.getAttribs(SPLODER.Item.PROPERTY_TEXTURE1)];
                }
            }),
            (this.getTotalTextures = function (e) {
                return o[e] ? o[e].length : 0;
            }),
            (this.setTime = function (e) {
                n.time.value = e;
            });
    }),
    (SPLODER.SceneAssets.TYPE_WALLS = 0),
    (SPLODER.SceneAssets.TYPE_LIQUIDS = 1),
    (SPLODER.SceneAssets.TYPE_PANELS = 2),
    (SPLODER.SceneAssets.TYPE_SKIES = 3),
    (SPLODER.SceneAssets.TYPE_ITEMS = 4),
    (SPLODER.SceneAssets.TYPE_BIPEDS = 5),
    (SPLODER.SceneAssets.TYPE_LIQUIDMASK = 6),
    (SPLODER.SceneAssets.itemTypeMap = [0, 0, 1, 2, 4, 5]),
