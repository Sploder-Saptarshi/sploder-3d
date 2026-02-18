"PIXI" in window &&
    ((PIXI.RenderTexture.prototype.renderToCanvas = function (e) {
        var t = this.renderer.gl,
            i = this.textureBuffer.width,
            s = this.textureBuffer.height,
            o = new Uint8Array(4 * i * s);
        t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer), t.readPixels(0, 0, i, s, t.RGBA, t.UNSIGNED_BYTE, o), t.bindFramebuffer(t.FRAMEBUFFER, null), e.resize(i, s);
        var n = e.context.getImageData(0, 0, i, s);
        return n.data.set(o), e.context.putImageData(n, 0, 0), e.canvas;
    }),
        (PIXI.RenderTexture.prototype.renderToDataTexture = function (e) {
            var t = this.renderer.gl,
                i = this.textureBuffer.width,
                s = this.textureBuffer.height,
                o = new Uint8Array(4 * i * s);
            t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer), t.readPixels(0, 0, i, s, t.RGBA, t.UNSIGNED_BYTE, o), t.bindFramebuffer(t.FRAMEBUFFER, null);
            var n = e.image;
            n && ((n.width = i), (n.height = s), (n.data = o));
        })),

    (THREE.BoxGeometry = function (e, t, i, s, o, n, a, r) {
        function h(e, t, i, s, o, n, r, h) {
            var E,
                d,
                R,
                P = l.widthSegments,
                c = l.heightSegments,
                u = o / 2,
                O = n / 2,
                L = l.vertices.length;
            ("x" === e && "y" === t) || ("y" === e && "x" === t)
                ? (E = "z")
                : ("x" === e && "z" === t) || ("z" === e && "x" === t)
                    ? ((E = "y"), (c = l.depthSegments))
                    : (("z" === e && "y" === t) || ("y" === e && "z" === t)) && ((E = "x"), (P = l.depthSegments));
            var S = P + 1,
                T = c + 1,
                D = o / P,
                m = n / c,
                f = new THREE.Vector3();
            for (f[E] = r > 0 ? 1 : -1, R = 0; T > R; R++)
                for (d = 0; S > d; d++) {
                    var p = new THREE.Vector3();
                    (p[e] = (d * D - u) * i), (p[t] = (R * m - O) * s), (p[E] = r), l.vertices.push(p);
                }
            for (R = 0; c > R; R++)
                for (d = 0; P > d; d++) {
                    var g,
                        y = d + S * R,
                        I = d + S * (R + 1),
                        w = d + 1 + S * (R + 1),
                        v = d + 1 + S * R,
                        _ = new THREE.Vector2(d / P, 1 - R / c),
                        M = new THREE.Vector2(d / P, 1 - (R + 1) / c),
                        A = new THREE.Vector2((d + 1) / P, 1 - (R + 1) / c),
                        N = new THREE.Vector2((d + 1) / P, 1 - R / c),
                        x = (0 == d && 2 == P) || (1 == P && i * s == -1);
                    a && (x = !x),
                        (g = x ? new THREE.Face3(y + L, I + L, w + L) : new THREE.Face3(y + L, I + L, v + L)),
                        g.normal.copy(f),
                        g.vertexNormals.push(f.clone(), f.clone(), f.clone()),
                        (g.materialIndex = h),
                        l.faces.push(g),
                        l.faceVertexUvs[0].push(x ? [_, M, A] : [_, M, N]),
                        (g = x ? new THREE.Face3(y + L, w + L, v + L) : new THREE.Face3(I + L, w + L, v + L)),
                        g.normal.copy(f),
                        g.vertexNormals.push(f.clone(), f.clone(), f.clone()),
                        (g.materialIndex = h),
                        l.faces.push(g),
                        l.faceVertexUvs[0].push(x ? [_.clone(), A.clone(), N] : [M.clone(), A, N.clone()]);
                }
        }
        THREE.Geometry.call(this),
            (a = a || !1),
            (this.type = "BoxGeometry"),
            (this.parameters = { width: e, height: t, depth: i, widthSegments: s, heightSegments: o, depthSegments: n }),
            (this.widthSegments = s || 1),
            (this.heightSegments = o || 1),
            (this.depthSegments = n || 1),
            (r = r || 0);
        var l = this,
            E = e / 2,
            d = t / 2,
            R = i / 2;
        if ((h("z", "y", -1, -1, i, t, E, 0), h("z", "y", 1, -1, i, t, -E, 1), h("x", "z", 1, 1, e, i, d, 2), h("x", "z", 1, -1, e, i, -d, 3), h("x", "y", 1, -1, e, t, R, 4), h("x", "y", -1, -1, e, t, -R, 5), this.mergeVertices(), 0 != r))
            for (var P, c, u = this.vertices.length, O = (r / t) * 0.5; u--;) (P = this.vertices[u]), (c = P.y / t), (P.x *= 1 + O * c), (P.z *= 1 + O * c);
    }),
    (THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry),

    (THREE.PlaneBufferGeometry = function (e, t, i, s, o) {
        THREE.BufferGeometry.call(this), (this.type = "PlaneBufferGeometry"), (this.parameters = { width: e, height: t, widthSegments: i, heightSegments: s });
        for (var n = e / 2, a = t / 2, r = i || 1, h = s || 1, l = r + 1, E = h + 1, d = e / r, R = t / h, P = new Float32Array(l * E * 3), c = new Float32Array(l * E * 3), u = new Float32Array(l * E * 2), O = 0, L = 0, S = 0; E > S; S++)
            for (var T = S * R - a, D = 0; l > D; D++) {
                var m = D * d - n;
                (P[O] = m), (P[O + 1] = -T), (c[O + 2] = 1), (u[L] = D / r), (u[L + 1] = 1 - S / h), (O += 3), (L += 2);
            }
        O = 0;
        for (var f = new (P.length / 3 > 65535 ? Uint32Array : Uint16Array)(r * h * 6), S = 0; h > S; S++)
            for (var D = 0; r > D; D++) {
                var p = D + l * S,
                    g = D + l * (S + 1),
                    y = D + 1 + l * (S + 1),
                    I = D + 1 + l * S,
                    w = 0 == D && 2 == r;
                o && (w = !w), w ? ((f[O] = p), (f[O + 1] = g), (f[O + 2] = I), (f[O + 3] = g), (f[O + 4] = y), (f[O + 5] = I)) : ((f[O] = p), (f[O + 1] = g), (f[O + 2] = y), (f[O + 3] = p), (f[O + 4] = y), (f[O + 5] = I)), (O += 6);
            }
        this.addAttribute("index", new THREE.BufferAttribute(f, 1)),
            this.addAttribute("position", new THREE.BufferAttribute(P, 3)),
            this.addAttribute("normal", new THREE.BufferAttribute(c, 3)),
            this.addAttribute("uv", new THREE.BufferAttribute(u, 2));
    }),
    (THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype)),
    (THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry),
    (THREE.PlaneGeometry = function (e, t, i, s) {
        THREE.Geometry.call(this), (this.type = "PlaneGeometry"), (this.parameters = { width: e, height: t, widthSegments: i, heightSegments: s }), this.fromBufferGeometry(new THREE.PlaneBufferGeometry(e, t, i, s));
    }),
    (THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry);

var THREEx = THREEx || {};
(THREEx.WindowResize = function (e, t) {
    var i = function () {
        e.setSize(window.innerWidth, window.innerHeight), (t.aspect = window.innerWidth / window.innerHeight), t.updateProjectionMatrix();
    };
    return (
        window.addEventListener("resize", i, !1),
        {
            stop: function () {
                window.removeEventListener("resize", i);
            },
        }
    );
}),

    window.SPLODER || (window.SPLODER = {}),
    (SPLODER.ACTION_DEFAULT = 0),
    (SPLODER.ACTION_DESELECT = 1),
    (SPLODER.ACTION_SELECT_POINT = 2),
    (SPLODER.ACTION_SELECT_ITEM = 3),
    (SPLODER.ACTION_SELECT_WINDOW = 4),
    (SPLODER.ACTION_SELECT_ALL = 5),
    (SPLODER.ACTION_SELECTION_START = 6),
    (SPLODER.ACTION_SELECTION_MOVE = 7),
    (SPLODER.ACTION_SELECTION_DUPLICATE = 8),
    (SPLODER.ACTION_SELECTION_MIRROR_H = 9),
    (SPLODER.ACTION_SELECTION_MIRROR_V = 10),
    (SPLODER.ACTION_SELECTION_ROTATE = 11),
    (SPLODER.ACTION_SELECTION_RELEASE = 12),
    (SPLODER.ACTION_SELECTION_DELETE = 13),
    (SPLODER.ACTION_CLIPBOARD_COPY = 14),
    (SPLODER.ACTION_CLIPBOARD_PASTE = 15),
    (SPLODER.ACTION_CREATE = 16),
    (SPLODER.ACTION_TWEAK = 17),
    (SPLODER.ACTION_CHANGE = 18),
    (SPLODER.ACTION_CHANGE_COMPLETE = 19),
    (SPLODER.ACTION_SET_CURRENTSTATE = 20),
    (SPLODER.ACTION_CLEAR_STATE = 21),
    (SPLODER.ACTION_CLEAR_PROPERTY = 22),
    (SPLODER.ACTION_UNDO = 23),
    (SPLODER.ACTION_REDO = 24),
    (SPLODER.ACTION_CONNECT = 25),
    (SPLODER.ACTION_DISCONNECT = 26),
    (SPLODER.ACTION_CONTEXT_CHANGE = 27),
    (SPLODER.ACTION_RETURNED_ERROR = 32),

    (SPLODER._documentConnected = !1),
    (SPLODER._holdInterval = 0),
    (SPLODER.bind = function (e, t) {
        return function () {
            t.apply(e, arguments);
        };
    }),
    (SPLODER.bindWithFuncRef = function (e, t, i) {
        var s = function () {
            t.call(e, arguments[0], s, i);
        };
        return s;
    }),
    (SPLODER.bindInteractions = function (e, t, i, s, o) {
        e &&
            t &&
            ((e.interactive = !0),
                (e.buttonMode = !0),
                i && (e.mousedown = e.touchstart = SPLODER.bind(t, i)),
                s && (e.mousemove = e.touchmove = SPLODER.bind(t, s)),
                o && (e.mouseup = e.mouseupoutside = e.touchend = e.touchendoutside = SPLODER.bind(t, o)));
    }),
    (SPLODER.connectButtons = function (e, t, i, s, o) {
        t = t || document;
        var n,
            a,
            r = t.getElementsByTagName("a");
        if (i) {
            for (a = 0; a < r.length; a++) (n = r.item(a)), SPLODER._connectButton(e, n, i, s, o);
            if (!SPLODER._documentConnected) {
                if (s)
                    for (a = 0; a < document.forms.length; a++)
                        document.forms[a].onchange = function (t) {
                            s.call(e, t.target);
                        };
                var h = function () {
                    clearInterval(SPLODER._holdInterval);
                };
                document.addEventListener("mouseup", h), document.addEventListener("touchend", h), (SPLODER._documentConnected = !0);
            }
        }
    }),
    (SPLODER._connectButton = function (e, t, i, s, o) {
        var n,
            a,
            r = !1,
            h = function (t) {
                !a && t && i.call(e, t.target.dataset.id, t.target, t.target.dataset.value, t), (a = !1);
            },
            l = function (e) {
                clearInterval(SPLODER._holdInterval),
                    (n = Date.now()),
                    (r = !0),
                    (SPLODER._holdInterval = setInterval(function () {
                        E.call(null, e);
                    }, 125));
            },
            E = function (t) {
                t && t.target && Date.now() - n > 500 && (i.call(e, t.target.dataset.id, t.target, t.target.dataset.value, t), (a = !0));
            },
            d = function (i) {
                if ((clearInterval(SPLODER._holdInterval), r && i.target.parentNode == t && ((r = !1), o))) {
                    var s = i.target;
                    o.call(e, s.dataset.id, s, s.dataset.value, i);
                }
            };
        t.onclick || ((t.onclick = h), t.addEventListener("mousedown", l), t.addEventListener("mouseout", d), t.addEventListener("mouseup", d), t.addEventListener("touchstart", l), t.addEventListener("touchend", d));
    }),
    (SPLODER.clearClassListById = function (e) {
        var t = document.getElementById(e);
        t && (t.className = "");
    }),
    (SPLODER.getClassListById = function (e) {
        return SPLODER.getClassList(document.getElementById(e));
    }),
    (SPLODER.hasClass = function (e, t) {
        var i = SPLODER.getClassListById(e);
        return i ? i.contains(t) : void 0;
    }),
    (SPLODER.setClass = function (e, t, i) {
        var s = SPLODER.getClassListById(e);
        s && (i ? s.remove(t) : s.add(t));
    }),
    (SPLODER.getClassList = function (e) {
        return e ? e.classList : void 0;
    }),
    (SPLODER.enableButtons = function () {

        arguments.length && SPLODER.setButtonsState(arguments, !0);
    }),
    (SPLODER.disableButtons = function () {
        arguments.length && SPLODER.setButtonsState(arguments, !1);
    }),
    (SPLODER.setButtonsState = function (e, t) {
        for (var i = 0; i < e.length; i++) {
            var s = document.querySelector('[data-id="' + e[i] + '"]');
            if (s) {
                var o = s.classList;
                if (o) {
                    t ? o.remove("disabled") : o.add("disabled");
                    var n = s.parentNode.parentNode;
                    n && "LABEL" == n.nodeName && (t ? n.classList.remove("disabled") : n.classList.add("disabled"), "INPUT" == n.firstChild.nodeName && (n.firstChild.disabled = !t));
                }
            }
        }
    }),
    (SPLODER.buttonIsEnabled = function (e) {
        var t = document.querySelector('[data-id="' + e + '"]');
        return t ? !t.classList.contains("disabled") : !1;
    }),
    (SPLODER.hide = function (e) {
        for (var t = $$$(e), i = t.length; i--;) t[i].classList.add("hidden");
    }),
    (SPLODER.parseFloatArray = function (e) {
        if (e instanceof Array)
            for (var t = e.length; t--;) {
                var i = e[t],
                    s = parseFloat(i);
                e[t] = isNaN(s) ? i : s;
            }
        return e;
    }),
    (SPLODER.shallowCopyUniforms = function (e, t, i) {
        for (var s in t) e.hasOwnProperty(s) && (i && -1 != i.indexOf(s) ? (t[s] = e[s]) : (t[s].value = e[s].value));
    }),
    (SPLODER.setAttrib = function (e, t, i, s, o, n) {
        (s = s || 0), (o = o || 255), e.setAttrib(t, Math.min(o, Math.max(s, i)), n);
    }),
    (SPLODER.incrementAttrib = function (e, t, i, s, o, n) {
        var a = e.getAttrib(t, n);
        isNaN(a) && (a = Math.max(0, s)), isNaN(i) || (isNaN(s) && (s = -1e4), isNaN(o) && (o = 1e4), e.setAttrib(t, Math.max(s, Math.min(o, a + i)), n));
    }),
    (SPLODER.modAttrib = function (e, t, i, s, o) {
        var n = e.getAttrib(t, o);
        isNaN(n) && (n = 0), isNaN(s) && (s = 360), isNaN(i) || e.setAttrib(t, (n + i) % s, o);
    }),
    (SPLODER.toggleAttrib = function (e, t, i) {
        var s = e.getAttrib(t, i);
        e.setAttrib(t, 1 === parseInt(s) ? 0 : 1, i);
    }),
    (SPLODER.weightedValue = function (e) {
        e = e || 0;
        var t,
            i,
            s,
            o = 0;
        for (t = 1; t < arguments.length; t += 2) (i = arguments[t]), (s = arguments[t + 1]), (o += (i - 1) * s);
        return o + 1 + e;
    }),
    (SPLODER.lerp = function (e, t, i) {
        return (i = Math.max(0, Math.min(1, i))), e + (t - e) * i;
    }),
    (SPLODER.easeInQuad = function (e, t, i, s) {
        return (e /= s), i * e * e + t;
    }),
    (SPLODER.easeOutQuad = function (e, t, i, s) {
        return (e /= s), -i * e * (e - 2) + t;
    }),
    (SPLODER.easeInCubic = function (e, t, i, s) {
        return (e /= s), i * e * e * e + t;
    }),
    (SPLODER.easeOutCubic = function (e, t, i, s) {
        return (e /= s), e--, i * (e * e * e + 1) + t;
    }),
    (SPLODER.util = {}),
    (SPLODER.util.modulo = function (e, t) {
        return ((e % t) + t) % t;
    }),
    (SPLODER.util.zeroPad = function (e, t) {
        for (var i = e + ""; i.length < t;) i = "0" + i;
        return i;
    }),
    (SPLODER.util.isIE = function () {
        return -1 !== navigator.appVersion.indexOf("MSIE") || -1 !== navigator.appVersion.indexOf("Trident");
    }),
    (SPLODER.util.supports_html5_storage = function () {
        try {
            return "localStorage" in window && null !== window.localStorage;
        } catch (e) {
            return !1;
        }
    });

var $$ = function () {
    return document.querySelector.apply(document, arguments);
},
    $$$ = function () {
        return document.querySelectorAll.apply(document, arguments);

    };
(SPLODER.AtlasLoader = function (e) {
    THREE.Loader.call(this, e), (this.withCredentials = !1);
}),
    (SPLODER.AtlasLoader.prototype = Object.create(THREE.Loader.prototype)),
    (SPLODER.AtlasLoader.prototype.constructor = SPLODER.AtlasLoader),
    (SPLODER.AtlasLoader.prototype.load = function (e, t, i, s, o, n) {
        var a = new XMLHttpRequest(),
            r = 0;
        (a.onreadystatechange = function () {
            if (a.readyState === a.DONE)
                if (200 === a.status || 0 === a.status) {
                    if (a.responseText) {
                        var h = JSON.parse(a.responseText),
                            l = h.metadata;
                        i && i(h, l, n);
                    } else THREE.error("SPLODER.AtlasLoader: " + t + " seems to be unreachable or the file is empty."), o && o(a.status, n);
                    e.onLoadComplete();
                } else THREE.error("SPLODER.AtlasLoader: Couldn't load " + t + " (" + a.status + ")"), o && o(a.status);
            else
                a.readyState === a.LOADING
                    ? s && (0 === r && (r = a.getResponseHeader("Content-Length")), s({ total: r, loaded: a.responseText.length, data: n }))
                    : a.readyState === a.HEADERS_RECEIVED && void 0 !== s && (r = a.getResponseHeader("Content-Length"));
        }),
            a.open("GET", t, !0),
            (a.withCredentials = this.withCredentials),
            a.send(null);
    }),
    (SPLODER.Geom = {}),

    (SPLODER.Geom.pointWithinRect = function (e, t, i, s) {
        return (s = s || 1), e >= i.x * s && t >= i.y * s && e <= (i.x + i.width) * s && t <= (i.y + i.height) * s;
    }),
    (SPLODER.Geom.distanceBetweenXY = function (e, t) {
        var i = e.x - t.x,
            s = e.y - t.y;
        return Math.sqrt(i * i + s * s);
    }),
    (SPLODER.Geom.distanceBetweenXZ = function (e, t) {
        return Math.sqrt(SPLODER.Geom.distanceBetweenSquaredXZ(e, t));
    }),
    (SPLODER.Geom.distanceBetween = function (e, t, i, s) {
        return Math.sqrt(SPLODER.Geom.distanceBetweenSquared(e, t, i, s));
    }),
    (SPLODER.Geom.distanceBetweenSquared = function (e, t, i, s) {
        var o = i - e,
            n = s - t;
        return o * o + n * n;
    }),
    (SPLODER.Geom.distanceBetweenSquaredXZ = function (e, t) {
        var i = e.x - t.x,
            s = e.z - t.z;
        return i * i + s * s;
    }),
    (SPLODER.Geom.angleBetween = function (e, t, i, s) {
        return Math.atan2(s - t, i - e);
    }),
    (SPLODER.Geom.closestPtPointSegment = function (e, t, i) {
        var s = i.clone().sub(t),
            o = e.clone().sub(t).dot(s);
        return (o /= s.dot(s)), t.clone().add(s.multiplyScalar(o));
    }),
    (SPLODER.Geom.ccw = function (e, t, i, s, o, n) {
        return (n - t) * (i - e) > (s - t) * (o - e);
    }),
    (SPLODER.Geom.lineIntersectsLine = function (e, t, i, s, o, n, a, r) {
        var h = SPLODER.Geom.ccw;
        return h(e, t, o, n, a, r) != h(i, s, o, n, a, r) && h(e, t, i, s, o, n) != h(e, t, i, s, a, r);
    }),
    (SPLODER.Geom.lineLineIntersect = function (e, t, i, s, o, n, a, r) {
        var h, l, E, d;
        (h = i - e), (l = s - t), (E = a - o), (d = r - n);
        var R, P;
        if (((R = (-l * (e - o) + h * (t - n)) / (-E * l + h * d)), (P = (E * (t - n) - d * (e - o)) / (-E * l + h * d)), R >= 0 && 1 >= R && P >= 0 && 1 >= P)) {
            var c = e + P * h,
                u = t + P * l;
            return { x: c, y: u };
        }
        return !1;
    }),
    (SPLODER.Geom.lineSide = function (e, t, i, s, o, n) {
        return (e - i) * (n - s) - (t - s) * (o - i) > 0 ? 1 : -1;
    }),
    (SPLODER.Geom.rectIntersectsLine = function (e, t, i, s, o, n) {
        var a = e.x,
            r = e.y,
            h = a + e.width,
            l = r + e.height;
        if ((a > t && a > s) || (r > i && r > o)) return !1;
        if ((t > h && s > h) || (i > l && o > l)) return !1;
        var E = SPLODER.Geom.lineIntersectsLine,
            d = SPLODER.Geom.lineSide,
            R = [];
        return (
            E(t, i, s, o, a, r, h, r) && (isNaN(n) || d(t, i, a, r, h, r) == n) && R.push(SPLODER.Geom.lineLineIntersect(t, i, s, o, a, r, h, r)),
            E(t, i, s, o, h, r, h, l) && (isNaN(n) || d(t, i, h, r, h, l) == n) && R.push(SPLODER.Geom.lineLineIntersect(t, i, s, o, h, r, h, l)),
            E(t, i, s, o, h, l, a, l) && (isNaN(n) || d(t, i, h, l, a, l) == n) && R.push(SPLODER.Geom.lineLineIntersect(t, i, s, o, h, l, a, l)),
            E(t, i, s, o, a, l, a, r) && (isNaN(n) || d(t, i, a, l, a, r) == n) && R.push(SPLODER.Geom.lineLineIntersect(t, i, s, o, a, l, a, r)),
            R
        );
    }),
    (SPLODER.Geom.gridPointsAlongLine = function (e, t, i, s) {
        for (var o = [], n = Math.abs(i - e), a = i > e ? 1 : -1, r = Math.abs(s - t), h = s > t ? 1 : -1, l = (n > r ? n : -r) / 2, E = 0; ;) {
            if ((o.push(e), o.push(t), e === i && t === s)) break;
            var d = l;
            if ((d > -n && ((l -= r), (e += a)), r > d && ((l += n), (t += h)), E++, E > 512)) {
                console.log(o);
                break;
            }
        }
        return o;
    }),
    (SPLODER.Geom.resolvePenetrationCircleRect = function (e, t, i, s) {
        var o = e.x,
            n = e.y,
            a = o - t,
            r = n - t,
            h = o + t,
            l = n + t;
        s = s || 1;
        var E = i.x * s,
            d = i.y * s,
            R = E + i.width * s,
            P = d + i.height * s,
            c = 0.5 * (E + R),
            u = 0.5 * (d + P);
        if (a > R || r > P || E > h || d > l) return !1;
        R > o && P > n && o > E && n > d && (console.log("INSIDE"), Math.abs(c - o) > Math.abs(u - n) ? (o = e.x = o > c ? R + t : E - t) : (n = e.y = n > u ? P + t : d - t));
        var O, L;
        return o >= E && R >= o
            ? ((e.y = u >= n ? d - t : P + t), !0)
            : n >= d && P >= n
                ? ((e.x = c >= o ? E - t : R + t), !0)
                : (E > o && d > n
                    ? ((O = SPLODER.Geom.distanceBetween(o, n, E, d)), (L = SPLODER.Geom.angleBetween(o, n, E, d)))
                    : o > R && d > n
                        ? ((O = SPLODER.Geom.distanceBetween(o, n, R, d)), (L = SPLODER.Geom.angleBetween(o, n, R, d)))
                        : o > R && n > P
                            ? ((O = SPLODER.Geom.distanceBetween(o, n, R, P)), (L = SPLODER.Geom.angleBetween(o, n, R, P)))
                            : ((O = SPLODER.Geom.distanceBetween(o, n, E, P)), (L = SPLODER.Geom.angleBetween(o, n, E, P))),
                    0 > L && (L += 2 * Math.PI),
                    t > O ? ((O -= t), (e.x += O * Math.cos(L)), (e.y += O * Math.sin(L)), !0) : !1);
    }),
    (SPLODER.Geom.polygonArea = function (e) {
        for (var t = 0, i = 0; i < e.length; i += 2) (j = (i + 2) % e.length), (t += e[i] * e[j + 1]), (t -= e[j] * e[i + 1]);
        return t / 2;
    }),
    (SPLODER.Geom.polygonIsClockwise = function (e) {
        return SPLODER.Geom.polygonArea(e) > 0;
    }),
    (SPLODER.Geom.polygonIsClosed = function (e) {
        return e.length >= 6 && e[0] == e[e.length - 2] && e[1] == e[e.length - 1];
    }),
    (SPLODER.Geom.closePolygon = function (e) {
        e.length >= 4 && !SPLODER.Geom.polygonIsClosed(e) && e.push(e[0], e[1]);
    }),

    (SPLODER.ShapeUtils = {}),
    (SPLODER.ShapeUtils.errorOccured = new signals.Signal()),
    (SPLODER.ShapeUtils._compare = function (e, t) {
        var i = e.area(),
            s = t.area();
        return s > i ? 1 : i > s ? -1 : e.type > t.type ? 1 : e.type < t.type ? -1 : 0;
    }),
    (SPLODER.ShapeUtils.sortByAreaDesc = function (e) {
        e instanceof Array && e.sort(SPLODER.ShapeUtils._compare);
    }),
    (SPLODER.ShapeUtils.getBounds = function (e) {
        if (e instanceof Array) {
            var t = e.length,
                i = { x: 0, y: 0, width: 0, height: 0, size: 0, depth: 0 };
            if (t) {
                for (var s, o = 1e4, n = 1e4, a = -1e4, r = -1e4, h = 0; t--;)
                    (s = e[t]), s instanceof SPLODER.Item && ((o = Math.min(o, s.x)), (n = Math.min(n, s.y)), (a = Math.max(a, s.x + s.width)), (r = Math.max(r, s.y + s.height)), (h += s.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)));
                (h /= e.length), (i.x = o), (i.y = n), (i.width = a - o), (i.height = r - n), (i.size = Math.max(0 - o, 0 - n, a, r)), (i.depth = h);
            }
            return i;
        }
    }),
    (SPLODER.ShapeUtils.scaleRect = function (e, t) {
        (e.x *= t), (e.y *= t), (e.width *= t), (e.height *= t);
    }),
    (SPLODER.ShapeUtils.getFilledGrid = function (e, t) {
        var i,
            s,
            o,
            n,
            a,
            r,
            h = [],
            l = e.width + 2,
            E = e.height + 2;
        for (r = l * E; r--;) (s = r % l), (o = Math.floor(r / l)), h.unshift(0 == s || s == l - 1 || 0 == o || o == E - 1 ? -1 : 0);
        for (r = t.length; r--;) for (i = t[r], o = 0; o < i.height; o++) for (s = 0; s < i.width; s++) (n = i.x - e.x + s + 1), (a = i.y - e.y + o + 1), (h[a * l + n] = -1);
        var d = function (e, t, i, s, o, n) {
            if ((n || (n = []), !(n[t * l + e] > 0 || 0 > e || 0 > t || e > l - 1 || t > E - 1))) {
                n[t * l + e] = 1;
                var a = "g" == i ? h[t * l + e] > 0 : h[t * l + e] == i;
                a &&
                    ((h[t * l + e] = s),
                        d(e, t - 1, i, s, o, n),
                        d(e + 1, t, i, s, o, n),
                        d(e, t + 1, i, s, o, n),
                        d(e - 1, t, i, s, o, n),
                        o && (d(e - 1, t - 1, i, s, o, n), d(e + 1, t - 1, i, s, o, n), d(e - 1, t + 1, i, s, o, n), d(e + 1, t + 1, i, s, o, n)));
            }
        };
        d(0, 0, -1, 1, !0);
        for (var R, P = 2, c = 2; -1 != h.indexOf(0);) (R = h.indexOf(0)), (s = R % l), (o = Math.floor(R / l)), d(s, o, 0, c), c++, P++;
        for (c = -2; -1 != h.indexOf(-1);) (R = h.indexOf(-1)), (s = R % l), (o = Math.floor(R / l)), d(s, o, -1, c), c--;
        var u = h.concat();
        d(0, 0, "g", 0), (r = h.length);
        for (var O = !1; r--;)
            if (h[r] > 0) {
                if (((O = !0), !(16 > l || 16 > E))) break;
                u[r] = -2;
            }
        if (((h = u), O && (console.log("PROBABLE TRIANGULATION ERROR"), SPLODER.ShapeUtils.errorOccured.dispatch(e), l >= 16 && E >= 16))) {
            var L = Math.floor(h.indexOf(-2) / l) * l,
                S = L + Math.floor(l / 2);
            if (L >= 0) for (L += l, S += l, r = L; S > r; r++) 2 == h[r] && (h[r] = P);
        }
        return { grid: h, w: l };
    }),
    (SPLODER.ShapeUtils.getSegments = function (e, t, i, s) {
        var o,
            n,
            a,
            r = [],
            h = 0,
            l = 0;
        s = s || 0;
        var E = 0,
            d = 2 * e.length;
        if ((t && ((h = t.x - 1), (l = t.y - 1), (s = t.width + 2)), (o = e.indexOf(i)), -1 != o)) {
            (n = o % s), (a = Math.floor(o / s));
            var R = function (t, i, o, P, c) {
                if (((c = c || 1), E++, !(E >= d))) {
                    if (void 0 === P) return void R(t + 1, i, o, 1, 1);
                    if (t == n && i == a) return void r.push(h + t, l + i);
                    var u = function (e, t) {
                        return t * s + e;
                    };
                    switch (P) {
                        case 0:
                            if (e[u(t, i - 1)] != o) return r.push(h + t, l + i), void R(t + 1, i, o, 1);
                            if (e[u(t - 1, i - 1)] != o) return void R(t, i - 1, o, 0, c + 1);
                            e[u(t - 1, i)] != o && (r.push(h + t, l + i), R(t - 1, i, o, 3));
                            break;
                        case 1:
                            if (e[u(t, i)] != o) return r.push(h + t, l + i), void R(t, i + 1, o, 2);
                            if (e[u(t, i - 1)] != o) return void R(t + 1, i, o, 1, c + 1);
                            e[u(t - 1, i - 1)] != o && (r.push(h + t, l + i), R(t, i - 1, o, 0));
                            break;
                        case 2:
                            if (e[u(t - 1, i)] != o) return r.push(h + t, l + i), void R(t - 1, i, o, 3);
                            if (e[u(t, i)] != o) return void R(t, i + 1, o, 2, c + 1);
                            e[u(t, i - 1)] != o && (r.push(h + t, l + i), R(t + 1, i, o, 1));
                            break;
                        case 3:
                            if (e[u(t - 1, i - 1)] != o) return r.push(h + t, l + i), void R(t, i - 1, o, 0);
                            if (e[u(t - 1, i)] != o) return void R(t - 1, i, o, 3, c + 1);
                            e[u(t, i)] != o && (r.push(h + t, l + i), R(t, i + 1, o, 2));
                    }
                }
            };
            R(n, a, i);
        }
        return r;
    }),
    (SPLODER.ShapeUtils.getCoordsFromSegments = function (e, t, i, s, o) {
        if (!e) return e;
        (e = e.concat()), (o = o || 0);
        var n,
            a,
            r,
            h,
            l,
            E,
            d = [],
            R = 0.001,
            P = [];
        for (a = e.length; a >= 0;) {
            for (n = e.length; n >= 0;) n != a && e[n] == e[a] && e[n + 1] == e[a + 1] && P.unshift(a), (n -= 2);
            a -= 2;
        }
        n = P.length;
        for (var c; n--;)
            (c = P[n]),
                c > 0 && c < e.length - 1
                    ? ((r = e[c]),
                        (h = e[c + 1]),
                        (l = (e[c - 2] + r + e[c + 2]) / 3 - r),
                        (E = (e[c - 1] + h + e[c + 3]) / 3 - h),
                        0 > l ? (0 > E ? ((e[c + 1] -= R), e.splice(c + 2, 0, r - R, h)) : ((e[c] -= R), e.splice(c + 2, 0, r, h + R))) : 0 > E ? ((e[c] += R), e.splice(c + 2, 0, r, h - R)) : ((e[c + 1] += R), e.splice(c + 2, 0, r + R, h)))
                    : console.log("ERROR: UNHANDLED TRACE CONDITION. END POINT OF POLY IS DUPE!");
        var u,
            O = s == SPLODER.Geom.polygonIsClockwise(e);
        for (n = 0; n < e.length; n += 2) (r = e[n]), (h = e[n + 1]), (u = O ? d.unshift : d.push), u.call(d, r * i, h * i);
        if ((SPLODER.Geom.closePolygon(d), 0 != o)) {
            var L = 1e4,
                S = -1e4,
                T = 1e4,
                D = -1e4;
            for (n = 0; n < d.length; n += 2) (r = d[n]), (h = d[n + 1]), (L = Math.min(L, r)), (S = Math.max(S, r)), (T = Math.min(T, h)), (D = Math.max(D, h));
            for (n = 0; n < d.length; n += 2) (r = d[n]), (h = d[n + 1]), r == L ? (d[n] -= o) : r == S && (d[n] += o), h == T ? (d[n + 1] -= o) : h == D && (d[n + 1] += o);
        }
        return d;
    }),
    (SPLODER.ShapeUtils.buildTree = function (e) {
        var t, i, s, o, n;
        SPLODER.ShapeUtils.sortByAreaDesc(e);
        var a = [[], [], []];
        for (t = e.length; t--;) (o = e[t]), o.removeAllChildren(), (o.parentNode = null), o.type < 3 && (a[o.type].unshift(o), 2 == o.type && 1 == o.getAttrib(SPLODER.Item.PROPERTY_LIQUID_HASFLOOR) && a[0].unshift(o));
        for (s = 0; 3 > s; s++)
            for (e = a[s], i = e.length; i--;)
                if (((o = e[i]), i > 0))
                    for (t = i; t--;)
                        if (((n = e[t]), n.baseX <= o.baseX && n.baseY <= o.baseY && n.baseX + n.width >= o.baseX + o.width && n.baseY + n.height >= o.baseY + o.height)) {
                            n.addChild(o);
                            break;
                        }
    }),
    (SPLODER.ShapeUtils.getDescendants = function (e) {
        var t = function (e) {
            for (var i = [], s = e.children, o = 0; o < s.length; o++) i = i.concat(t(s[o]));
            return (i = i.concat(s));
        },
            i = t(e);
        return SPLODER.ShapeUtils.sortByAreaDesc(i), i;
    }),
    (SPLODER.ShapeUtils.getShapes = function (e, t, i, s) {
        var o, n, a, r, h, l;
        (s = s || e), SPLODER.ShapeUtils.buildTree(s);
        var E = [[], [], []];
        o = e.length;
        for (
            var d = function (e) {
                if (!e) return !1;
                if (e.getAttrib(SPLODER.Item.PROPERTY_CEIL)) return !0;
                if (e.children) for (var t = e.children.length; t--;) if (d(e.children[t])) return !0;
            };
            o--;

        )
            (r = e[o]), (!t || r.getAttrib(SPLODER.Item.PROPERTY_CEIL) || d(r)) && r.type < 3 && ((t && r.type != SPLODER.Item.TYPE_WALL) || E[r.type].unshift(r));
        var R = [];
        for (perimSegments = [], holeSegments = [], a = 0; 3 > a; a++) {
            (e = E[a]), (n = e.length);
            for (var P, c, u, O, L, S, T, D, m; n--;) {
                if (((h = e[n]), (S = h.x * i), (T = h.y * i), (l = h.children), t))
                    for (o = l.length; o--;)
                        if (l[o].getAttrib(SPLODER.Item.PROPERTY_CEIL) || d(l[o])) {
                            if (0 == a && l[o].type == SPLODER.Item.TYPE_LIQUID) {
                                var f = l[o];
                                l.splice(o, 1);
                                for (var p = 0; p < f.children.length; p++) d(f.children[p]) && (l = l.concat(f.children[p]));
                            }
                        } else l.splice(o, 1);
                var g = new THREE.Path(),
                    y = 0;
                if (((c = null), l)) {
                    for (P = SPLODER.ShapeUtils.getFilledGrid(h, l), c = P.grid, u = c.w, O = 2; -1 != c.indexOf(O);) {
                        if (((L = SPLODER.ShapeUtils.getSegments(c, h, O, u)), L.length && ((D = SPLODER.ShapeUtils.getCoordsFromSegments(L, !0, i)), D.length)))
                            for (perimSegments.push(D), g.moveTo(D[0] - S, D[1] - T), o = 2; o < D.length; o += 2) g.lineTo(D[o] - S, D[o + 1] - T), y++;
                        O++;
                    }
                    for (O = -2; -1 != c.indexOf(O);) {
                        if (((L = SPLODER.ShapeUtils.getSegments(c, h, O, u)), L.length && ((D = SPLODER.ShapeUtils.getCoordsFromSegments(L, !1, i, !0, -0.001)), D.length)))
                            for (holeSegments.push(D), g.moveTo(D[0] - S, D[1] - T), o = 2; o < D.length; o += 2) g.lineTo(D[o] - S, D[o + 1] - T), y++;
                        O--;
                    }
                } else for (D = [0, 0, h.width * i, 0, h.width * i, h.height * i, 0, h.height * i, 0, 0], g.moveTo(D[0], D[1]), o = 2; o < D.length; o += 2) g.lineTo(D[o], D[o + 1]);
                (m = g.toShapes(!0, !1)), (m.userData = { parentNode: h, grid: c }), R.push(m);
            }
        }
        return R;
    }),
    (SPLODER.ShapeUtils.getPaddedGrid = function (e, t, i, s) {
        for (var o, n, a = [], r = 2 * s, h = 0; i + r > h; h++) for (var l = 0; t + r > l; l++) (o = h * (i + r) + l), (n = (h - s) * i + (l - s)), (a[o] = s > l || s > h || l >= t + s || h >= i + s ? 0 : e[n]);
        return a;
    }),
    (SPLODER.ShapeUtils.getGeometryFromTexture = function (e, t, i, s) {
        var o,
            n,
            a,
            r = t[1],
            h = t[0],
            l = t[2],
            E = t[3];
        (i = i || 1), (s = s || i);
        var d = document.createElement("canvas");
        (d.width = l + 2), (d.height = E + 2);
        var R = d.getContext("2d");
        R.drawImage(e, h, r, l, E, 1, 1, d.width - 2, d.height - 2), (l += 2), (E += 2);
        var P = [],
            c = R.getImageData(0, 0, l, E),
            u = c.data,
            O = 0,
            L = 0,
            S = 1e4,
            T = 1e4;
        for (n = 0; E > n; n++) for (o = 0; l > o; o++) (a = n * l + o), u[4 * a + 3] > 0.5 ? ((P[a] = 1), (O = Math.min(o, O)), (S = Math.max(o, S)), (L = Math.min(n, L)), (T = Math.max(n, T))) : (P[a] = 0);
        var D = 0.5 * l * i,
            m = 0.5 * E * i,
            f = SPLODER.ShapeUtils.getSegments(P, null, 1, l);
        if (f.length) {
            var p = SPLODER.ShapeUtils.getCoordsFromSegments(f, !0, i, !0, 0.01);
            if (p.length) {
                var g = new THREE.Path();
                g.moveTo(p[0] - D, 0 - p[1] + m);
                for (var y = 2; y < p.length; y += 2) g.lineTo(p[y] - D, 0 - p[y + 1] + m);
            }
        }
        var I = g.toShapes(!0, !0),
            w = { bevelEnabled: !1, amount: s };
        try {
            var v = new THREE.ExtrudeGeometry(I, w);
            return SPLODER.MeshUtils.applyVoxelMapping(v, l - 2, E - 2, i, O, L, S - O, T - L), v;
        } catch (_) {
            console.log(_.stack);
        }
    }),

    (SPLODER.MeshUtils = {}),
    (SPLODER.MeshUtils.getPlaneGeometry = function (e, t, i, s, o, n, a, r) {
        (n = n || 1), (a = a || 1);
        var h = new THREE.PlaneGeometry(e, t, n, a, r);
        return (i = i || 0), (s = s || 0), (o = o || 0), h.applyMatrix(new THREE.Matrix4().makeTranslation(i, s, o)), h;
    }),
    (SPLODER.MeshUtils.getBoxGeometry = function (e, t, i, s, o, n, a, r, h, l, E) {
        (a = a || 1), (r = r || 1), (h = h || 1);
        var d = new THREE.BoxGeometry(e, t, i, a, r, h, l, E);
        return (s = s || 0), (o = o || 0), (n = n || 0), d.applyMatrix(new THREE.Matrix4().makeTranslation(s, o, n)), d;
    }),
    (SPLODER.MeshUtils.transformUVs = function (e, t, i, s, o, n, a, r, h, l, E, d, R, P, c, u, O, L, S, T) {
        (t = t || 0), (i = i || 0);
        var D,
            m,
            f,
            p,
            g,
            y,
            I,
            w,
            v,
            _,
            M,
            A = e.faceVertexUvs;
        for (g = A.length; g--;)
            for (w = A[g], y = w.length; y--;)
                for (
                    v = w[y],
                    _ = e.faces[y],
                    D = s,
                    m = o,
                    f = n,
                    p = a,
                    _.normal.y > 0 || (_.normal.y < 0 && T)
                        ? ((D = u), (m = O), (f = L), (p = S))
                        : _.normal.y < 0
                            ? ((D = s), (m = o + a - 1), (f = n), (p = 1))
                            : _.normal.x < 0
                                ? ((D = d), (m = R), (f = P), (p = c))
                                : _.normal.x > 0
                                    ? ((D = d + P), (m = R), (f = 0 - P), (p = c))
                                    : _.normal.z < 0 && ((D = r), (m = h), (f = l), (p = E)),
                    D += 0.01,
                    m += 0.01,
                    f > 0 ? (f -= 0.02) : ((f += 0.02), (D -= 0.02)),
                    p -= 0.02,
                    I = v.length;
                    I--;

                ) {
                    M = v[I];
                    var N = M.x,
                        x = 1 - M.y;
                    (M.x = t + D + f * N), (M.y = i + m + p * x), (M.x /= 16), (M.y /= 16), (M.y = 1 - M.y);
                }
        e.uvsNeedUpdate = !0;
    }),
    (SPLODER.MeshUtils.applyVoxelMapping = function (e, t, i, s) {
        e.computeBoundingBox();
        var o,
            n,
            a,
            r,
            h,
            l,
            E,
            d,
            R,
            P = e.faceVertexUvs;
        o = P.length;
        for (var c = ["a", "b", "c"]; o--;)
            for (r = P[o], n = r.length; n--;)
                for (h = r[n], l = e.faces[n], R = l.normal, a = h.length; a--;) {
                    (E = e.vertices[l[c[a]]]), (d = h[a]);
                    var u = E.x + t * s * 0.5,
                        O = E.y + i * s * 0.5;
                    (u /= t * s), (O /= i * s), R.x < 0 ? (u += 0.001) : R.x > 0 && (u -= 0.001), R.y < 0 ? (O += 0.001) : R.y > 0 && (O -= 0.001), (d.x = u), (d.y = O);
                }
        e.uvsNeedUpdate = !0;
    }),
    (SPLODER.MeshUtils.offsetUVsRecursive = function (e, t, i) {
        var s, o, n, a, r, h;
        if (i instanceof THREE.Mesh) {
            var l = i.geometry.faceVertexUvs;
            for (n = l.length; n--;) for (a = l[n], o = a.length; o--;) for (r = a[o], s = r.length; s--;) (h = r[s]), (h.x *= 16), (h.y = 1 - h.y), (h.y *= 16), (h.x += e), (h.y += t), (h.x /= 16), (h.y /= 16), (h.y = 1 - h.y);
            i.geometry.uvsNeedUpdate = !0;
        }
        if (i.children) for (s = i.children.length; s--;) SPLODER.MeshUtils.offsetUVsRecursive(e, t, i.children[s]);
    }),
    (SPLODER.MeshUtils.destroyMesh = function (e, t) {
        if (e instanceof THREE.Group || e instanceof THREE.Mesh) {
            if (e.children) for (var i, s = e.children.length; s--;) (i = e.children[s]), e.remove(i), SPLODER.MeshUtils.destroyMesh(i, t);
            if ((e.userData && e.userData.biped && e.userData.biped.destroy(), e instanceof THREE.Mesh)) {
                e.geometry.dispose(), (e.geometry = null);
                var o = e.material;
                t || ((o.defines = o.uniforms = o.defaultAttributeValues = o.vertexShader = o.fragmentShader = null), e.material.dispose()), (e.material = null);
            }
        }
    }),

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

    (SPLODER.States = function () {
        var e;
        (this.init = function () {
            return (e = [[]]), this;
        }),
            (this.initWithValues = function (e) {
                if ((this.init(), e instanceof Array)) for (var t = e.length; t--;) this.setValue(t, e[t], 0);
            }),
            (this.clearState = function (t) {
                e[t] = [];
            }),
            (this.hasState = function (t) {
                return isNaN(t) && (t = 0), e[t] instanceof Array && e[t].length;
            }),
            (this.hasFrame = function (t, i) {
                return t >= 0 && i >= 0 && e[i] instanceof Array && void 0 != e[i][t] ? !0 : !1;
            }),
            (this.hasFrames = function (t) {
                if (t >= 0) for (var i = 1; i < e.length; i++) if (e[i] instanceof Array && void 0 != e[i][t]) return !0;
                return !1;
            }),
            (this.offsetFrames = function (t, i) {
                if (t >= 0) for (var s = 1; s < e.length; s++) e[s] instanceof Array && !isNaN(e[s][t]) && (e[s][t] += i);
            }),
            (this.hasValue = function (t, i) {
                return isNaN(i) && (i = 0), e[i] instanceof Array ? void 0 != e[i][t] && null != e[i][t] : !1;
            }),
            (this.getValue = function (t, i) {
                return isNaN(i) && (i = 0), e[i] instanceof Array ? e[i][t] : null;
            }),
            (this.setValue = function (t, i, s) {
                isNaN(s) && (s = 0), e[s] || (e[s] = []), (e[s][t] = i);
            }),
            (this.serialize = function () {
                return JSON.stringify(e);
            }),
            (this.unserialize = function (t) {
                var i, s;
                try {
                    (i = JSON.parse(t)), i instanceof Array ? (e = i) : this.init();
                } catch (o) {
                    if ((console.log("JSON ERROR:", o), console.log(t), "string" == typeof t && (t = t.split(",")), t instanceof Array))
                        for (var n = 0; n < t.length; n++)
                            (s = t[n]), s && ("number" == typeof s ? this.setValue(n, s) : -1 != s.indexOf(".") ? this.setValue(n, parseFloat(s)) : isNaN(s) ? this.setValue(n, s) : this.setValue(n, parseInt(s)));
                }
            });
    }),

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

    (SPLODER.BipedPoses = function () {
        var e,
            t,
            i,
            s,
            o,
            n,
            a,
            r,
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
            f = {},
            p = {},
            g = this;
        this.initWithElements = function (f, p, I, w, v, _, M, A, N, x, Y, C, b, V) {
            (e = f),
                (t = p),
                (i = I),
                (s = w),
                (o = v),
                (n = o.children[0]),
                (a = _),
                (r = M),
                (h = A),
                (l = r.children[0]),
                (E = h.children[0]),
                (d = N),
                (R = x),
                (P = d.children[0]),
                (c = R.children[0]),
                (u = Y),
                (O = C),
                (L = b),
                (S = V),
                y(),
                (T = ""),
                (D = 0);
            var U = f.currentState;
            return (
                (m = setInterval(function () {
                    if (U != f.currentState) {
                        var e = ["idle", "walk", "attack", "defend", "ouch", "die", "push", "dance", "shrug", "facepalm", "sit", "watch"];
                        (U = f.currentState), U < e.length && g.pose(e[U]);
                    }
                    g.update();
                }, 10)),
                this
            );
        };
        var y = function (e) {
            e || (e = t), (f[e.uuid] = e.rotation.clone()), (p[e.uuid] = e.position.clone()), e.children.forEach(y);
        },
            I = function (e) {
                e || (e = t), e.rotation.copy(f[e.uuid]), e.position.copy(p[e.uuid]), e.children.forEach(I);
            };
        (this.pose = function (e) {
            e != T && ((T = e), (D = Date.now()));
        }),
            (this.update = function (m) {
                I();
                var p,
                    y,
                    w,
                    v,
                    _,
                    M,
                    A,
                    N,
                    x,
                    Y = Date.now() - D,
                    C = e.getAttrib(SPLODER.Biped.PROPERTY_BEASTLY) / 255,
                    b = e.getAttrib(SPLODER.Biped.PROPERTY_GENDER) / 128,
                    V = 2 - b,
                    U = e.getAttrib(SPLODER.Biped.PROPERTY_HEIGHT) / 800 + 0.3,
                    F = e.getAttrib(SPLODER.Biped.PROPERTY_WEIGHT) / 400 + 0.5;
                switch (T) {
                    case "run":
                        (p = Y / 50), (y = Math.sin(p)), (w = Math.cos(p));
                    case "walk":
                        p || ((p = Y / 150), (y = Math.sin(p)), (w = Math.cos(p))),
                            (i.rotation.x += -0.2),
                            (i.rotation.z += 0.05 * y * b),
                            (s.rotation.x += 0.1 + 0.1 * y),
                            (s.rotation.z += 0 - 0.05 * y * b),
                            (h.position.y -= Math.min(0, 8 * w)),
                            (r.position.y += Math.max(0, 8 * w)),
                            (h.rotation.x += 0.2 + 0.35 * y * F),
                            (r.rotation.x += 0.2 - 0.35 * y * F),
                            (E.rotation.x += 0.5 - h.rotation.x - f[E.uuid].x),
                            (l.rotation.x += 0.5 - r.rotation.x - f[l.uuid].x),
                            (u.rotation.x += -0.2 - 0.1 * y),
                            (O.rotation.x += -0.2 - 0.1 * y),
                            (M = 1),
                            (A = 1),
                            L && (M *= 0.5),
                            S && (A *= 0.25),
                            (d.rotation.x += -0.2 + 0.35 * y * A),
                            (d.rotation.z += Math.abs(0.15 * w) * b),
                            (R.rotation.x += -0.2 - 0.35 * y * M),
                            (R.rotation.z += 0 - Math.abs(0.15 * w) * b),
                            (P.rotation.x += -0.75 + h.rotation.x * A),
                            (c.rotation.x += -0.75 + r.rotation.x * M),
                            L && (c.rotation.y -= 0.35),
                            S && ((P.rotation.z -= 0.75), (P.rotation.y += 0.35 - 0.3 * y)),
                            (n.rotation.y += 0 - 0.25 * Math.sin(0.25 * p)),
                            (n.rotation.x -= 0.1 + 0.1 * y),
                            (n.rotation.z += 0.05 * y * b * 2),
                            a.emote(":)");
                        break;
                    case "idle":
                        (p = Y / 500),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (i.rotation.z += 0.03 * y * b),
                            (s.rotation.z += 0 - 0.03 * y * b),
                            (n.rotation.z -= 0 - 0.03 * y * b),
                            (r.rotation.z -= 0.03 * y * b),
                            (h.rotation.z -= 0.03 * y * b),
                            (d.rotation.z += 0.03 * y * b),
                            (R.rotation.z += 0.03 * y * b),
                            (P.rotation.x -= 0.2),
                            (c.rotation.x -= 0.2),
                            (i.rotation.x += 0.03 * y * V - y * C * 0.05),
                            (s.rotation.x += 0 - 0.03 * y * V + y * C * 0.1),
                            (n.rotation.x -= 0 - 0.03 * y * V + y * C * 0.1),
                            (r.rotation.x -= (-0.03 + 0.03 * y) * V + y * C * 0.05),
                            (h.rotation.x -= (-0.03 + 0.03 * y) * V + y * C * 0.05),
                            (r.rotation.z += y * C * 0.05),
                            (h.rotation.z -= y * C * 0.05),
                            (l.rotation.x -= 0.03 * y * V - y * C * 0.2),
                            (E.rotation.x -= 0.03 * y * V - y * C * 0.2),
                            (t.position.y -= y * C * 2),
                            (d.rotation.x += 0.03 * y * V),
                            (R.rotation.x += 0.03 * y * V),
                            (P.rotation.x -= 0.2 * V),
                            (c.rotation.x -= 0.2 * V),
                            S && ((d.rotation.x -= 0.5 + 0.2 * y), (P.rotation.z -= 0.95), (P.rotation.y = 0.25 + 0.05 * y)),
                            a.emote(":|");
                        break;
                    case "attack":
                        (_ = 1),
                            Y > 400 && (_ -= 0.01 * (Y - 400)),
                            (p = (Y + 250) / 150),
                            (p -= Math.sin(p)),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (s.rotation.y -= 0.8 * y * _),
                            (s.rotation.z += 0.2 * y * _),
                            (t.rotation.y += 0.2 * (-1.57 + w) * _),
                            (o.rotation.y -= 0.2 * (-1.57 + w) * _),
                            L
                                ? ((R.rotation.z += 1.25 * w * _), (R.rotation.x -= (1.57 - 1.57 * w) * _), (c.rotation.x += 0.65 * w * _))
                                : ((R.rotation.z += 0.5 * w), (R.rotation.y -= y), (R.rotation.x += 1 * y), (c.rotation.x -= 0.95 + 1 * y)),
                            S ? ((d.rotation.x -= 0.5 + 0.2 * y), (d.rotation.y += 0.8 * y * _), (P.rotation.z -= 0.95), (P.rotation.x -= 0.25), (P.rotation.y += 0.35)) : (d.rotation.x -= 1 * y),
                            a.emote(">:("),
                            Y > 500 && g.pose("idle");
                        break;
                    case "defend":
                        (_ = 1),
                            Y > 900 && (_ -= 0.01 * (Y - 900)),
                            (N = 2 - C),
                            (p = Math.min(250, Y) / 150),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (s.rotation.y -= 0.4 * y * _ * N),
                            (s.rotation.x -= 0.2 * y * _ * N),
                            (o.rotation.x -= 0.75 * y * _),
                            (n.rotation.x += 0.75 * y * _),
                            (n.position.z -= 8 * y * _),
                            (n.position.y -= 8 * y * _),
                            (R.position.z += 8 * y * _ * N),
                            (R.rotation.x -= 0.75 * y * _ * N),
                            (R.rotation.y += 0.75 * y * _ * N),
                            (R.rotation.z += 0.5 * y * _ * N),
                            (c.rotation.x -= 0.75 * y * _),
                            (c.rotation.y -= 0.5 * y * _),
                            (d.rotation.x -= 1 * y * _ * N),
                            (d.rotation.y -= 1.5 * y * _ * N),
                            (P.rotation.x -= 0.75 * y * _),
                            (P.rotation.y += 2.5 * y * _),
                            (h.rotation.x += 0.25 * y * _),
                            (E.rotation.x -= 0.25 * y * _),
                            (r.rotation.x -= 0.15 * y * _),
                            (l.rotation.x += 0.15 * y * _),
                            L && (R.rotation.y += C),
                            S && (d.rotation.y -= C),
                            a.emote("=O"),
                            Y > 1e3 && g.pose("idle");
                        break;
                    case "watch":
                        (p = Y / 100), (y = Math.sin(p)), (w = Math.cos(p));
                        var G = t.parent.rotation.y;
                        G < 2 * Math.PI && (G += 2 * Math.PI),
                            (n.rotation.x -= 0 - 0.03 * y),
                            (n.rotation.y = 0 - G - 0.5 * Math.PI - SPLODER.Geom.angleBetween(editor.previewArea.camera.position.x, editor.previewArea.camera.position.z, t.parent.position.x, t.parent.position.z)),
                            n.rotation.y < 0 - Math.PI && (n.rotation.y += 2 * Math.PI),
                            (n.rotation.y = Math.max(-1, Math.min(1, n.rotation.y)));
                        break;
                    case "ouch":
                        (_ = 1),
                            Y > 300 && (_ -= 0.01 * (Y - 300)),
                            (p = Y / 100),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (s.rotation.x -= 0.4 * y * _),
                            (t.rotation.x -= 0.4 * y * _ * C),
                            (t.rotation.z += 0.4 * y * _),
                            (t.position.y += 32 * y * _),
                            (o.rotation.x += 0.75 * y * _),
                            (n.rotation.x -= 0.5 * y * _),
                            (n.position.z -= 16 * y * _),
                            (n.position.y -= 8 * y * _),
                            (h.rotation.z -= 1 * y * _),
                            (r.rotation.z += 1 * y * _),
                            (M = _),
                            (A = _),
                            (R.rotation.z -= 2 * y * M),
                            (d.rotation.z += 2 * y * A),
                            (R.position.x += 8 * y * _),
                            (d.position.x -= 8 * y * _),
                            a.emote("o_o"),
                            Y > 400 && (a.emote(":|"), g.pose("idle"));
                        break;
                    case "sit":
                        (p = 1.5),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (N = 1.5 - 0.4 * C),
                            (x = 2 - C),
                            (t.position.y -= 56),
                            (i.rotation.x -= 0.3 * y * N),
                            (s.rotation.x += 0.1 * y * x),
                            (h.rotation.x -= 0.8 * y * N),
                            (r.rotation.x -= 0.8 * y * N),
                            (E.rotation.x += 0.5 * y * N),
                            (l.rotation.x += 0.5 * y * N);
                        break;
                    case "die":
                        if (
                            ((p = SPLODER.easeInCubic(Y, 0, 1, 1e3)),
                                (y = Math.sin(Math.min(125, Y) / 125)),
                                (t.rotation.z = 0.5 * y),
                                (t.rotation.y += SPLODER.easeOutCubic(Math.min(500, Y), 0, 6.28318, 500)),
                                (t.rotation.x = SPLODER.lerp(t.rotation.x, 0 - 0.5 * Math.PI, 2 * p)),
                                (t.position.y -= SPLODER.lerp(0, 160 * U, 2 * p)),
                                (i.position.z *= 1 - Math.min(1, p)),
                                (s.position.z *= 1 - Math.min(1, p)),
                                (h.rotation.x = SPLODER.lerp(h.rotation.x, 0 - 0.5 * Math.PI, 2 * p)),
                                (r.rotation.x = SPLODER.lerp(r.rotation.x, 0 - 0.5 * Math.PI, 2 * p)),
                                (h.rotation.z = 0 - 0.5 * y),
                                (r.rotation.z = y),
                                (R.rotation.z = 0 - y),
                                (R.rotation.x = SPLODER.lerp(R.rotation.x, 0 - 0.5 * Math.PI, 2 * p)),
                                (d.rotation.z = y),
                                (d.rotation.x = SPLODER.lerp(d.rotation.x, 0 - 0.5 * Math.PI, 2 * p)),
                                a.emote("(O"),
                                Y > 1e3)
                        ) {
                            p = SPLODER.easeInCubic(Math.min(500, Y - 1e3), 0, 1, 500);
                            var z = function (e, t) {
                                if (((t = t || 0), !(t > 3))) {
                                    t > 0 && ((e.rotation.x *= 1 - p), (e.rotation.y *= 1 - p), 2 >= t && (e.position.z -= 6 * p));
                                    for (var i = e.children.length; i--;) z(e.children[i], t + 1);
                                }
                            };
                            z(t);
                        }
                        break;
                    case "push":
                        (p = SPLODER.easeInQuad(Y, 0, 1, 125)),
                            (y = Math.sin(Math.min(200, Y) / 70)),
                            (h.rotation.x = 0 - y),
                            (r.rotation.x = 0.5 - 1.5 * y),
                            (E.rotation.x = y),
                            (l.rotation.x = y),
                            (i.rotation.x = 0 - 0.25 * y),
                            (s.rotation.x = 0.25 * y),
                            (t.position.y -= 16 * y),
                            (t.rotation.x += 0.1 * Math.min(1, p)),
                            (R.rotation.x = SPLODER.lerp(R.rotation.x, 0 - 0.55 * Math.PI, p)),
                            (R.rotation.z = SPLODER.lerp(R.rotation.z, 0.125 * Math.PI, p)),
                            (c.rotation.x = -2 + Math.min(2, p)),
                            (d.rotation.x = SPLODER.lerp(d.rotation.x, 0 - 0.55 * Math.PI, p)),
                            (d.rotation.z = SPLODER.lerp(d.rotation.z, 0 - 0.125 * Math.PI, p)),
                            (P.rotation.x = -2 + Math.min(2, p)),
                            a.emote(">:("),
                            Y > 750 && (a.emote(":|"), g.pose("idle"));
                        break;
                    case "dance":
                        (p = Y / 250),
                            (y = Math.sin(p)),
                            (v = Math.sin(2 * p)),
                            (w = Math.cos(p)),
                            (i.rotation.z = 0.2 * y),
                            (s.rotation.z = 0.2 * w),
                            (o.rotation.z = 0 - 0.2 * w),
                            (o.rotation.x = 0 - 0.2 * v),
                            (n.rotation.x = 0.2 * v - 0.5 * C),
                            (n.position.z -= 4 * v),
                            (r.rotation.z = 0 - 0.2 * y),
                            (h.rotation.z = 0 - 0.2 * y),
                            (d.rotation.y = -0.5),
                            (R.rotation.y = 0.5),
                            (d.position.y += 4 - 8 * y),
                            (R.position.y += 4 + 8 * y),
                            (P.rotation.x = -1.57),
                            (c.rotation.x = -1.57),
                            L && ((c.rotation.y -= 0.5), (R.rotation.y -= C)),
                            S && ((P.rotation.y += 0.5), (d.rotation.y += C)),
                            a.emote("=D");
                        break;
                    case "shrug":
                        (p = Y / 250),
                            (y = Math.sin(p)),
                            (w = Math.cos(p)),
                            (n.position.y -= 4 * y),
                            (d.rotation.y = 0.5 * y),
                            (R.rotation.y = 0 - 0.5 * y),
                            (d.position.y += 8 * y),
                            (R.position.y += 8 * y),
                            (P.rotation.x += 0 - y),
                            (c.rotation.x += 0 - y),
                            a.emote("//-_-"),
                            Y > 750 && (a.emote(":|"), g.pose("idle"));
                        break;
                    case "facepalm":
                        2e3 > Y ? ((p = SPLODER.easeOutQuad(Math.min(Y, 1e3), 0, 1e3, 750)), a.emote("//-_-")) : ((p = 500 - SPLODER.easeOutQuad(Math.min(Y, 2500) - 2e3, 0, 500, 500)), a.emote(":|")),
                            (p = Math.min(2, p / 400)),
                            (y = Math.sin(p)),
                            (v = 2e3 > Y ? Math.sin(Y / 150) : 0),
                            (w = Math.cos(p)),
                            (n.rotation.x += 0.5 * y),
                            (n.rotation.y += 0.25 * v),
                            (s.rotation.x += 0.25 * y),
                            (d.rotation.x = 0 - 1.57 * y),
                            (R.rotation.x = 0 - 1.57 * y),
                            (d.rotation.y = -0.5 + 0.85 * w),
                            (R.rotation.y = 0.5 - 0.85 * w),
                            (P.rotation.x += 0 - y),
                            (c.rotation.x += 0 - y),
                            L && ((c.rotation.x += 0.5 * y), (c.rotation.y -= 2 * y)),
                            S && ((P.rotation.x += 0.5 * y), (P.rotation.y += 2 * y)),
                            Y > 3e3 && (a.emote(":|"), g.pose("idle"));
                }
            }),
            (this.destroy = function () {
                clearInterval(m), (m = null);
            });
    }),

    (SPLODER.BipedFace = function () {
        var e,
            t,
            i,
            s,
            o,
            n,
            a,
            r,
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
            m = this;
        this.initWithRectAndMaterial = function (n, a, r, h) {
            return (e = n), (t = a), (i = r || 0), (s = h || 0), (o = new THREE.Group()), (o.userData.face = this), this;
        };
        var f = function (i, s, o, n, a, r, h) {
            var l = SPLODER.MeshUtils.getPlaneGeometry(i, s, o, n, a, r, h),
                E = new THREE.Mesh(l, t);
            return (E.userData.rect = e), E;
        };
        this.build = function () {
            var t,
                g = e.getAttrib(SPLODER.Biped.PROPERTY_BEASTLY) / 128;
            (n = f(12, 12)),
                (t = n.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 44, 19, 4, 4),
                o.add(n),
                (a = f(12, 12)),
                (t = a.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 32, 19, 4, 4),
                o.add(a),
                (r = f(6, 6)),
                (t = r.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 44, 23, 4, 4),
                n.add(r),
                (h = f(6, 6)),
                (t = h.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 32, 23, 4, 4),
                a.add(h),
                (l = f(14, 14, 0, -7)),
                (t = l.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 40, 29, 3, 2.5),
                n.add(l),
                (E = f(14, 14, 0, -7)),
                (t = E.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 40, 29, 3, 2.5),
                a.add(E),
                (d = f(14, 2, 0, -1, 0)),
                (t = d.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 43, 30, 5, 2),
                (d.rotation.x = (100 * Math.PI) / 180),
                (d.position.y = -14),
                (d.position.z = 2),
                l.add(d),
                (d = d.clone()),
                (d.rotation.y = Math.PI),
                l.add(d),
                (R = f(14, 2, 0, -1, 0)),
                (t = R.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 43, 30, 5, 2),
                (R.rotation.x = (100 * Math.PI) / 180),
                (R.position.y = -14),
                (R.position.z = 2),
                E.add(R),
                (R = R.clone()),
                (R.rotation.y = Math.PI),
                E.add(R),
                (P = f(14 + SPLODER.weightedValue(0, g, 2), 4 + SPLODER.weightedValue(0, g, 2))),
                (t = P.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 44, 27, 4, 2),
                n.add(P),
                (c = f(14 + SPLODER.weightedValue(0, g, 2), 4 + SPLODER.weightedValue(0, g, 2))),
                (t = c.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 40, 27, 4, 2),
                a.add(c),
                (u = new THREE.Group()),
                (u.position.y = -16),
                o.add(u),
                (L = f(16, 2, 0, 0, 0, 8, 1)),
                (t = L.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 32, 27, 8, 1),
                (L.position.z = 0.1),
                u.add(L),
                (S = f(16, 2, 0, -1, 0, 8, 1)),
                (t = S.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 32, 27.5, 8, 3),
                u.add(S),
                (O = f(8, 4, 0, -2, 0)),
                (t = O.geometry),
                SPLODER.MeshUtils.transformUVs(t, i, s, 32, 31, 8, 1),
                u.add(O),
                (O.visible = !1),
                p();
            var y = [":|", ":)", ";)", ":]", ":P", "(O", ":(", "-_-", ">:(", "^-^", ">:)", ":'(", "o_O", ":/", "=O", ":D", "XD", ":)"],
                I = y[0];
            (T = setInterval(function () {
                I = y[Math.floor(Math.random() * y.length)];
            }, 750)),
                (D = setInterval(function () {
                    m.emote(I);
                }, 10));
        };
        var p = function () {
            var t = e.getAttrib(SPLODER.Biped.PROPERTY_GENDER) / 128,
                i = e.getAttrib(SPLODER.Biped.PROPERTY_BEASTLY) / 128,
                s = e.getAttrib(SPLODER.Biped.PROPERTY_STRENGTH) / 128;
            (n.position.x = 8 + SPLODER.weightedValue(0, t, 0.5)),
                (n.position.y = 0),
                (n.position.y -= 2 * SPLODER.weightedValue(-0.5, i, 1)),
                (n.rotation.z = 0.1 * SPLODER.weightedValue(-0.5, i, 1)),
                n.scale.set(1, 1, 1),
                n.scale.multiplyScalar(SPLODER.weightedValue(0, t, 0.125)),
                (a.position.x = -8 - SPLODER.weightedValue(0, t, 0.5)),
                (a.position.y = 0),
                (a.position.y -= 2 * SPLODER.weightedValue(-0.5, i, 1)),
                (a.rotation.z = -0.1 * SPLODER.weightedValue(-0.5, i, 1)),
                a.scale.set(1, 1, 1),
                a.scale.multiplyScalar(SPLODER.weightedValue(0, t, 0.125)),
                r.position.set(0, -2, 0.1),
                h.position.set(0, -2, 0.1),
                l.position.set(0, 7, 0.2),
                (l.scale.y = 0.25),
                E.position.set(0, 7, 0.2),
                (E.scale.y = 0.25),
                (P.position.y = 8 - 2 * SPLODER.weightedValue(-2, i, 1)),
                (P.position.z = 0.3),
                P.scale.set(1, 1, 1),
                (P.rotation.z = 0),
                (c.position.y = 8 - 2 * SPLODER.weightedValue(-2, i, 1)),
                (c.position.z = 0.3),
                c.scale.set(1, 1, 1),
                (c.rotation.z = 0),
                (u.position.y = -16 + Math.max(0, SPLODER.weightedValue(0, s, -2))),
                (u.scale.y = 1),
                (u.scale.x = SPLODER.weightedValue(0.25, i, 0.5)),
                (L.position.y = 2),
                (S.position.y = 2);
            var o = function (e, t) {
                e.y = t > 8 ? -2 : 0;
            };
            L.geometry.vertices.map(o, null, 0),
                (L.geometry.verticesNeedUpdate = !0),
                S.geometry.vertices.map(o, null, 6),
                (S.geometry.verticesNeedUpdate = !0),
                (O.position.y = 1),
                (O.position.z = 0.1),
                (O.rotation.x = 0.25 * -Math.PI),
                (O.visible = !1);
        };
        (this.emote = function (e) {
            var t,
                i,
                s = 1.5,
                o = !0;
            switch ((p(), e)) {
                case ":)":
                case "=)":
                    (t = function (e, t) {
                        (e.y = Math.sin(0.2 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z);
                    break;
                case "^-^":
                case "^_^":
                case "^^":
                    (P.position.y += 2), (c.position.y += 2), (r.position.y += 2), (h.position.y += 2), (l.scale.y = E.scale.y = 0.4), (u.position.y += 2), (u.scale.x = 2);
                    break;
                case ":]":
                case "O:)":
                    (t = function (e, t) {
                        (e.y = Math.abs(e.x) > 2 ? 2 * Math.sin(0.2 * e.x - 1.57) + 1.5 : 0), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y -= 1),
                        (c.position.y -= 1),
                        (r.position.y = 1),
                        (h.position.y = 1),
                        (l.scale.y = E.scale.y = 0.4),
                        (u.scale.x = 2);
                    break;
                case ":(":
                    (t = function (e, t) {
                        (s = 2), (e.y = Math.sin(0.2 * e.x + 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = 0.4),
                        (P.rotation.z = 0 - c.rotation.z);
                    break;
                case ":'(":
                case ":'-(":
                    (t = function (e, t) {
                        (e.y = Math.abs(e.x) > 2 ? 0 - 3 * Math.sin(0.2 * e.x - 1.57) - 2 : 0), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (a.rotation.z = 0.4),
                        (n.rotation.z = 0 - a.rotation.z),
                        (c.rotation.z = 0.3),
                        (P.rotation.z = 0 - c.rotation.z),
                        (n.scale.y = a.scale.y = 0.5),
                        (u.position.y += 2),
                        (P.scale.y = c.scale.y = 1.5),
                        (l.scale.y = E.scale.y = 1);
                    break;
                case "<O":
                case "(O":
                    (t = function (e, t) {
                        (s = 2), o ? (e.y = Math.sin(0.2 * e.x + 1.57) * s + (8 >= t ? 2 : 0)) : ((i = Math.abs(6 * Math.sin(Date.now() / 100))), (e.y = t > 8 ? i - 4 : Math.sin(0.2 * e.x + 1.57) * s + 1));
                    }),
                        (a.rotation.z = 0.4),
                        (n.rotation.z = 0 - a.rotation.z),
                        (n.scale.y = a.scale.y = 0.5),
                        (P.scale.y = c.scale.y = 1.5),
                        (l.scale.y = E.scale.y = 1);
                    break;
                case ">:(":
                case ">:[":
                    (t = function (e, t) {
                        (s = 2), (e.y = Math.sin(0.2 * e.x + 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (u.scale.x *= 1.25),
                        (n.scale.y *= 0.85),
                        (a.scale.y *= 0.85),
                        (c.rotation.z = -0.4),
                        (P.rotation.z = 0 - c.rotation.z);
                    break;
                case ">:)":
                    (t = function (e, t) {
                        (e.y = Math.abs(e.x) > 2 ? 2 * Math.sin(0.2 * e.x - 1.57) + 1.5 : 0), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (u.scale.x = 2),
                        (u.position.y += 2),
                        (n.scale.y *= 0.85),
                        (a.scale.y *= 0.85),
                        (c.rotation.z = -0.4),
                        (P.rotation.z = 0 - c.rotation.z);
                    break;
                case "-_-":
                case "-__-":
                case "-___-":
                    (t = function (e, t) {
                        (s = 1), (e.y = Math.cos(0.4 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (r.position.y = -1),
                        (h.position.y = -1),
                        (c.rotation.z = -0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y -= 1),
                        (c.position.y -= 1),
                        (l.scale.y = E.scale.y = 0.6),
                        (u.scale.x *= 0.5);
                    break;
                case "//-_-":
                    (t = function (e, t) {
                        (s = 1), (e.y = Math.cos(0.4 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = -0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y -= 2),
                        (c.position.y -= 2),
                        (l.scale.y = E.scale.y = 1),
                        (u.scale.x *= 1.5);
                    break;
                case "o_O":
                case "O_o":
                case "o_o":
                    (t = function (e, t) {
                        (e.y = -5), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (u.scale.x = 0.25),
                        (u.position.y += 4),
                        n.scale.multiplyScalar(1.1),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y += 2),
                        (c.position.y += 2),
                        (l.scale.y = E.scale.y = 0.1);
                    break;
                case ":O":
                case ":o":
                case ":-O":
                case "=O":
                    (t = function (e, t) {
                        !o && t > 8 && (e.y = 0 - (0.5 * i + 6));
                    }),
                        (u.scale.x = 0.75),
                        n.scale.multiplyScalar(1.1),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y += 2),
                        (c.position.y += 2),
                        (l.scale.y = E.scale.y = 0.1);
                    break;
                case ":D":
                case "=D":
                    (t = function (e, t) {
                        (i = Math.max(i, 4)), (e.y = Math.sin(0.2 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2), (O.position.y = 3 - i);
                    }),
                        (a.rotation.z = 0.1),
                        (n.rotation.z = 0 - a.rotation.z),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z);
                    break;
                case "XD":
                    (t = function (e, t) {
                        (i = Math.max(i, 4)), (e.y = Math.sin(0.2 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (a.rotation.z = 0.1),
                        (n.rotation.z = 0 - a.rotation.z),
                        (c.rotation.z = 0.3),
                        (P.rotation.z = 0 - c.rotation.z),
                        (n.scale.y = a.scale.y = 0.5),
                        (P.scale.y = c.scale.y = 1.5),
                        (l.scale.y = E.scale.y = 1),
                        (u.scale.x = 1.5);
                    break;
                case ";)":
                    (t = function (e, t) {
                        (i = 0), (e.y = Math.cos(0.5 * e.x + 1.2) * s * 0.5 + 0.2 * e.x + (t > 8 ? 0 - (i + 2) : 0));
                    }),
                        (a.rotation.z = 0.1),
                        (n.rotation.z = 0 - a.rotation.z),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (n.scale.y = 0.5),
                        (P.scale.y = 1.5),
                        (l.scale.y = 1);
                    break;
                case ":P":
                    (t = function (e, t) {
                        (i = 0), Math.abs(e.x) > 2 && (e.y = Math.sin(0.2 * e.x - 1.57) + 1 + (t > 8 ? 0 - (i + 2) : 0));
                    }),
                        (a.rotation.z = 0.1),
                        (n.rotation.z = 0 - a.rotation.z),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (O.visible = !0);
                    break;
                case ":/":
                    (t = function (e, t) {
                        (e.y = Math.cos(0.4 * e.x - 1.57) * s), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = -0.1),
                        (P.rotation.z = 0 - c.rotation.z),
                        (P.position.y += 2),
                        (c.position.y -= 1),
                        (l.scale.y = E.scale.y = 0.4);
                    break;
                default:
                    (t = function (e, t) {
                        (e.y = 0), t > 8 && (e.y -= o ? 2 : i + 2);
                    }),
                        (c.rotation.z = 0.1),
                        (P.rotation.z = 0 - c.rotation.z);
            }
            t && ((i = Math.abs(6 * Math.sin(Date.now() / 100))), L.geometry.vertices.map(t, null, 0), (L.geometry.verticesNeedUpdate = !0), (o = !1), S.geometry.vertices.map(t, null, 6 + i), (S.geometry.verticesNeedUpdate = !0));
        }),
            (this.destroy = function () {
                clearInterval(T), clearInterval(D), (T = D = null);
            }),
            Object.defineProperty(this, "mesh", {
                get: function () {
                    return o;
                },
            });
    }),

    (SPLODER.BipedItem = function () {
        var e, t, i, s;
        (this.initWithRectAndMaterial = function (e, o, n) {
            return (t = e), (i = o), (s = n), this;
        }),
            (this.build = function () {
                var o,
                    n = t.getAttrib(SPLODER.Biped.PROPERTY_HEIGHT) / 255 + 0.5,
                    a = t.getAttrib(SPLODER.Biped.PROPERTY_STRENGTH) / 128,
                    r = t.getAttrib(SPLODER.Biped.PROPERTY_GENDER) / 128;
                (o = SPLODER.ShapeUtils.getGeometryFromTexture(i.uniforms.textureMap.value.image, s, 3, 8)),
                    o &&
                    ((e = new THREE.Mesh(o, i)),
                        (e.rotation.x = 1.57),
                        (e.position.z = 11 * SPLODER.weightedValue(0, a, 0.35, r, -0.25)),
                        (e.position.y = 0 - 32 * SPLODER.weightedValue(0, n, 0.5) + 4),
                        (e.userData.rect = t),
                        (i.uniforms.noOverlap.value = 1),
                        (i.uniformsNeedUpdate = !0));
            }),
            Object.defineProperty(this, "mesh", {
                get: function () {
                    return e;
                },
            });
    }),

    (SPLODER.Biped = function () {
        var e, t, i, s, o, n, a, r, h, l, E, d, R, P, c, u, O, L, S, T, D, m, f, p, g, y, I, w, v, _, M, A, N, x, Y, C, b, V, U;
        (this.poses = null),
            (this.initWithRectAndMaterial = function (i, s, h, l) {
                return (e = i), (t = s), (o = h || 0), (n = l || 0), (a = new THREE.Group()), (a.userData.biped = this), (r = new THREE.Group()), (r.userData.biped = this), a.add(r), (V = []), (U = [s]), this;
            }),
            (this.setItemMaterials = function (e, t, o, n) {
                (s = e), (x = t), (i = o), (N = n), U.push(s, i);
            });
        var F = function (i, s, o, n, a, r, h, l) {
            var E = SPLODER.MeshUtils.getPlaneGeometry(i, s, o, n, a, r, h, l),
                d = new THREE.Mesh(E, t);
            return (d.userData.rect = e), d;
        },
            G = function (i, s, o, n, a, r, h, l, E, d, R) {
                var P = SPLODER.MeshUtils.getBoxGeometry(i, s, o, n, a, r, h, l, E, d, R),
                    c = new THREE.Mesh(P, t);
                return (c.userData.rect = e), c;
            };
        this.build = function () {
            var U,
                z,
                B = e.getAttrib(SPLODER.Biped.PROPERTY_HEIGHT) / 255 + 0.5,
                H = e.getAttrib(SPLODER.Biped.PROPERTY_WEIGHT) / 255 + 0.5,
                k = e.getAttrib(SPLODER.Biped.PROPERTY_STRENGTH) / 128,
                X = e.getAttrib(SPLODER.Biped.PROPERTY_GENDER) / 128,
                W = e.getAttrib(SPLODER.Biped.PROPERTY_HEADSIZE) / 128,
                j = e.getAttrib(SPLODER.Biped.PROPERTY_HEADTHICK) / 128,
                Q = e.getAttrib(SPLODER.Biped.PROPERTY_BEASTLY) / 128;
            (r.position.y = 96 * SPLODER.weightedValue(0, B, 0.5)),
                (b = F(80 * SPLODER.weightedValue(0, H, 0.5), 48 * SPLODER.weightedValue(0, H, 0.5, k, 0.25))),
                (b.material = new THREE.MeshBasicMaterial({ color: 0, transparent: !0, opacity: 0.2 })),
                (b.position.y = 4),
                (b.rotation.x = 0 - 0.5 * Math.PI),
                a.add(b),
                (b = b.clone()),
                (b.material = new THREE.MeshBasicMaterial({ color: 0, transparent: !0, opacity: 0.1 })),
                b.scale.multiplyScalar(1.5),
                (b.position.y = 3),
                a.add(b),
                (h = G(60 * SPLODER.weightedValue(0, H, 0.5), 32 * SPLODER.weightedValue(0, B, 0.5), 32 * SPLODER.weightedValue(0, H, 0.5, k, 0.25), 0, -16 * SPLODER.weightedValue(0, B, 0.5), 0, 2, 1, 1)),
                (z = h.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 3, 19, 10, 5, 19, 19, 10, 5, 3, 19, 1, 5, 3, 19, 1, 1),
                (U[0].x -= 4 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[1].x -= 4 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[4].x += 4 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[5].x += 4 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[1].y += 8 * SPLODER.weightedValue(0, B, 0.5)),
                (U[4].y += 8 * SPLODER.weightedValue(0, B, 0.5)),
                (U[8].y += 8 * SPLODER.weightedValue(0, B, 0.5)),
                (U[1].z += 4),
                (U[4].z += 4),
                (U[8].z += 4),
                (U[3].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[11].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[6].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[0].z += 64 * SPLODER.weightedValue(-0.9, H, 0.25) - 4 * Q),
                (U[5].z += 64 * SPLODER.weightedValue(-0.9, H, 0.25) - 4 * Q),
                (U[9].z += 64 * SPLODER.weightedValue(-0.9, H, 0.25) - 4 * Q),
                (U[2].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[7].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[10].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[2].x += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[7].x -= 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[3].x += 8 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[6].x -= 9 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (h.rotation.x -= 0.1 * SPLODER.weightedValue(-0.5, Q, 1)),
                (h.position.z -= 12 * SPLODER.weightedValue(-0.5, Q, 1)),
                r.add(h),
                (l = G(68 * SPLODER.weightedValue(0, H, 0.5), 48 * SPLODER.weightedValue(0, B, 0.5), 32 * SPLODER.weightedValue(0, H, 0.5, k, 0.25), 0, 24 * SPLODER.weightedValue(0, B, 0.5), 0, 2, 2, 1)),
                (z = l.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 3, 11, 10, 8, 19, 11, 10, 8, 3, 11, 1, 8, 3, 11, 10, 1),
                (U[2].z += 5 + 2 * SPLODER.weightedValue(0, X, 0.5)),
                (U[9].z += 5 + 2 * SPLODER.weightedValue(0, X, 0.5)),
                (U[16].z += 5 * SPLODER.weightedValue(0, X, 0.5)),
                (U[17].z -= 0),
                (U[2].z += 5 * SPLODER.weightedValue(0, H, 1)),
                (U[9].z += 5 * SPLODER.weightedValue(0, H, 1)),
                (U[16].z += 5 * SPLODER.weightedValue(0, H, 1)),
                (U[0].x -= 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[1].x -= 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[2].x -= 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[3].x -= 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[6].x += 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[7].x += 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[8].x += 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[9].x += 0 - 3 * SPLODER.weightedValue(-0.75, k, 1, H, 0.25)),
                (U[4].x -= 8 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[5].x -= 8 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[10].x += 8 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[11].x += 8 - 8 * SPLODER.weightedValue(-1, H, 1)),
                (U[4].z += 80 * SPLODER.weightedValue(-0.9, H, 0.25)),
                (U[14].z += 80 * SPLODER.weightedValue(-0.9, H, 0.25)),
                (U[11].z += 80 * SPLODER.weightedValue(-0.9, H, 0.25)),
                (U[4].y += Math.min(0, 80 * SPLODER.weightedValue(-0.9, Q, 0.25))),
                (U[14].y += Math.min(0, 80 * SPLODER.weightedValue(-0.9, Q, 0.25))),
                (U[11].y += Math.min(0, 80 * SPLODER.weightedValue(-0.9, Q, 0.25))),
                (l.rotation.x += 0.3 * SPLODER.weightedValue(-0.5, Q, 1)),
                (l.position.z -= 12 * SPLODER.weightedValue(-0.5, Q, 1)),
                r.add(l),
                (E = G(32 * SPLODER.weightedValue(0, H, 0.8), 24 * SPLODER.weightedValue(0, B, 0.5), 18 * SPLODER.weightedValue(0, H, 0.8), 0, 12 * SPLODER.weightedValue(0, B, 0.5), 0)),
                (E.position.y += 42 * SPLODER.weightedValue(0, B, 0.5)),
                SPLODER.MeshUtils.transformUVs(E.geometry, o, n, 6, 10, 4, 1, 22, 10, 4, 1, 6, 10, 4, 1, 6, 10, 1, 1),
                (E.rotation.x += 0.3 * SPLODER.weightedValue(-0.5, Q, 1)),
                l.add(E),
                (d = G(42 * SPLODER.weightedValue(0, H, 0.25), 48 * SPLODER.weightedValue(0, j, 0.25), 42 * SPLODER.weightedValue(0, H, 0.25), 0, 24 * SPLODER.weightedValue(0, j, 0.25), 4, 1, 1, 1, !1, 0 - SPLODER.weightedValue(0, k, 16))),
                (d.position.y += 12 * SPLODER.weightedValue(0, B, 0.5, j, 0.5)),
                (d.position.z += 12 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (d.rotation.x -= 0.6 * SPLODER.weightedValue(-0.5, Q, 1)),
                0.25 > Q && (d.rotation.x -= 0.25 - SPLODER.weightedValue(0, Q, 1)),
                SPLODER.MeshUtils.transformUVs(d.geometry, o, n, 4, 1, 8, 9, 20, 1, 8, 9, 36, 1, 8, 9, 36, 11, 8, 8),
                d.scale.multiplyScalar(0.25 + SPLODER.weightedValue(0, W, 0.25)),
                E.add(d),
                (R = G(42 * SPLODER.weightedValue(0, H, 0.25), 8 * SPLODER.weightedValue(0, j, 0.25), 1, 0, 4 * SPLODER.weightedValue(0, j, 0.25), 0, 1, 1, 1, !1)),
                SPLODER.MeshUtils.transformUVs(R.geometry, o, n, 4, 0, 8, 1, 20, 0, 8, 1, 0, 0, 0, 0, 0, 0, 0, 0),
                (R.position.y += 48 * SPLODER.weightedValue(0, j, 0.25)),
                (R.position.z += 18 * SPLODER.weightedValue(0, H, 0.25)),
                d.add(R),
                (P = G(24, 48 * SPLODER.weightedValue(0, j, 0.25), 2, 33 * SPLODER.weightedValue(0, H, 0.25) - 1, 24 * SPLODER.weightedValue(0, j, 0.25), 0, 1, 1, 1, !0)),
                SPLODER.MeshUtils.transformUVs(P.geometry, o, n, 12, 1, 4, 9, 16, 1, -4, 9, 0, 0, 0, 0, 0, 0, 0, 0),
                d.add(P),
                (c = G(24, 48 * SPLODER.weightedValue(0, j, 0.25), 2, -33 * SPLODER.weightedValue(0, H, 0.25) + 1, 24 * SPLODER.weightedValue(0, j, 0.25), 0)),
                SPLODER.MeshUtils.transformUVs(c.geometry, o, n, 0, 1, 4, 9, 4, 1, -4, 9, 0, 0, 0, 0, 0, 0, 0, 0),
                d.add(c),
                (u = G(1, 48 * SPLODER.weightedValue(0, j, 0.25), 24, 0, 24 * SPLODER.weightedValue(0, j, 0.25), -29 * SPLODER.weightedValue(0, H, 0.25))),
                SPLODER.MeshUtils.transformUVs(u.geometry, o, n, 0, 0, 0, 0, 0, 0, 0, 0, 32, 1, 4, 9, 0, 0, 0, 0),
                d.add(u),
                (O = new SPLODER.BipedFace().initWithRectAndMaterial(e, t, o, n)),
                O.build(),
                (O.mesh.position.z = 26.2 * Math.max(0.75, SPLODER.weightedValue(0, H, 0.25, j, 0.0125))),
                (O.mesh.position.y = 24 * SPLODER.weightedValue(0, j, 0.25, k, 0.125)),
                (O.mesh.rotation.x = 0 - SPLODER.weightedValue(-1, k, 0.08)),
                (O.mesh.scale.y = 1 * SPLODER.weightedValue(0, j, 0.25)),
                d.add(O.mesh),
                (f = G(50 * SPLODER.weightedValue(0, H, 0.25), 64 * SPLODER.weightedValue(0, j, 0.25), 44 * SPLODER.weightedValue(0, H, 0.25), 0, 20 * SPLODER.weightedValue(0, j, 0.25), 0, 1, 2, 1, !1, 0 - SPLODER.weightedValue(0, k, 24))),
                (z = f.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(f.geometry, o, n, 36, 19, 8, 8, 36, 19, 1, 8, 36, 19, 0.9, 8, 36, 19, 8, 1),
                (U[2].y -= 20),
                (U[3].y -= 20),
                (U[8].y -= 20),
                (U[9].y -= 20),
                (U[2].z -= 8),
                (U[9].z -= 8),
                (U[4].z -= 20),
                (U[5].z += 20),
                (U[10].z += 20),
                (U[11].z -= 20),
                d.add(f),
                (p = F(96 * SPLODER.weightedValue(0, H, 0.5), 84 * SPLODER.weightedValue(0, B, 0.5), 0, 42 * SPLODER.weightedValue(0, B, 0.5), 0)),
                SPLODER.MeshUtils.transformUVs(p.geometry, o, n, 64, 5, -16, 14),
                (p.position.z -= 20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25)),
                (p.rotation.x = 0 - (15 * Math.PI) / 180),
                l.add(p),
                (p = F(96 * SPLODER.weightedValue(0, H, 0.5), 84 * SPLODER.weightedValue(0, B, 0.5), 0, 42 * SPLODER.weightedValue(0, B, 0.5), 0)),
                (p.rotation.x = 0 - (15 * Math.PI) / 180),
                (p.position.z -= 20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25)),
                (p.rotation.y = Math.PI),
                SPLODER.MeshUtils.transformUVs(p.geometry, o, n, 48, 5, 16, 14),
                l.add(p),
                (g = F(96 * SPLODER.weightedValue(0, H, 0.5), 72 * SPLODER.weightedValue(0, B, 0.5), 0, -36 * SPLODER.weightedValue(0, B, 0.5), 0, 2, 1)),
                (z = g.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(g.geometry, o, n, 64, 19, -16, 12),
                (U[5].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[4].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[3].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[5].x += 16 * SPLODER.weightedValue(0, H, 0.5)),
                (U[3].x -= 16 * SPLODER.weightedValue(0, H, 0.5)),
                (g.position.z -= 20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25)),
                (g.rotation.x = (18 * Math.PI) / 180 - SPLODER.weightedValue(-0.9, Q, 0.5)),
                l.add(g),
                (y = g),
                (g = F(96 * SPLODER.weightedValue(0, H, 0.5), 72 * SPLODER.weightedValue(0, B, 0.5), 0, -36 * SPLODER.weightedValue(0, B, 0.5), 0, 2, 1)),
                (z = g.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(g.geometry, o, n, 48, 19, 16, 12),
                (U[5].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[4].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[3].y -= 16 * SPLODER.weightedValue(0, B, 1)),
                (U[5].x += 16 * SPLODER.weightedValue(0, H, 0.5)),
                (U[3].x -= 16 * SPLODER.weightedValue(0, H, 0.5)),
                (g.rotation.x = (18 * Math.PI) / 180 - SPLODER.weightedValue(-0.9, Q, 0.5)),
                (g.position.z -= 20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25)),
                (g.position.y += 0.5),
                (g.rotation.y = Math.PI),
                l.add(g),
                (L = G(
                    20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25),
                    40 * SPLODER.weightedValue(0, B, 0.5),
                    20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25),
                    0,
                    -16 * SPLODER.weightedValue(0, B, 0.5),
                    0,
                    1,
                    1,
                    1,
                    !0,
                    SPLODER.weightedValue(0, H, 64)
                )),
                (z = L.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 9, 24, 4, 4, 19, 24, 4, 4, 9, 24, 1, 4, 9, 24, 1, 1),
                (U[2].z -= 2),
                (U[7].z -= 2),
                (L.position.x += 14 * SPLODER.weightedValue(0, H, 0.25)),
                (L.position.y -= 28 * SPLODER.weightedValue(0, B, 0.5)),
                (L.rotation.x -= 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                (L.rotation.z += 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                (L.rotation.y += 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                h.add(L),
                (T = G(22 * SPLODER.weightedValue(0, H, 0.25, k, 0.25), 32 * SPLODER.weightedValue(0, B, 0.5), 20 * SPLODER.weightedValue(0, H, 0.25, k, 0.25), 0, -16 * SPLODER.weightedValue(0, B, 0.5), 0, 1, 3, 1, !0)),
                (z = T.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 9, 28, 4, 4, 19, 28, 4, 4, 9, 28, 1, 4, 9, 28, 1, 1),
                (U[0].y += 10),
                (U[9].y += 10),
                (U[4].y += 5),
                (U[6].y += 5),
                (U[13].y += 5),
                (U[15].y += 5),
                (U[4].z += 10),
                (U[6].z += 10),
                (U[13].z += 10),
                (U[15].z += 10),
                (T.position.y = -36 * SPLODER.weightedValue(0, B, 0.5)),
                (T.rotation.x += 0.4 * SPLODER.weightedValue(0, Q, 1)),
                L.add(T),
                (S = G(
                    20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25),
                    40 * SPLODER.weightedValue(0, B, 0.5),
                    20 * SPLODER.weightedValue(0, H, 0.5, k, 0.25),
                    0,
                    -16 * SPLODER.weightedValue(0, B, 0.5),
                    0,
                    1,
                    1,
                    1,
                    !1,
                    SPLODER.weightedValue(0, H, 64)
                )),
                (z = S.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 3, 24, 4, 4, 25, 24, 4, 4, 3, 24, 1, 4, 3, 24, 1, 1),
                (U[2].z -= 2),
                (U[7].z -= 2),
                (S.position.x -= 14 * SPLODER.weightedValue(0, H, 0.25)),
                (S.position.y -= 28 * SPLODER.weightedValue(0, B, 0.5)),
                (S.rotation.y -= 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                (S.rotation.z -= 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                (S.rotation.x -= 0.2 * SPLODER.weightedValue(0, Q, 1) * Math.min(1, H)),
                h.add(S),
                (D = G(22 * SPLODER.weightedValue(0, H, 0.25, k, 0.25), 32 * SPLODER.weightedValue(0, B, 0.5), 20 * SPLODER.weightedValue(0, H, 0.25, k, 0.25), 0, -16 * SPLODER.weightedValue(0, B, 0.5), 0, 1, 3, 1)),
                (z = D.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 3, 28, 4, 4, 25, 28, 4, 4, 3, 28, 1, 4, 3, 28, 1, 1),
                (U[0].y += 10),
                (U[9].y += 10),
                (U[4].y += 5),
                (U[6].y += 5),
                (U[13].y += 5),
                (U[15].y += 5),
                (U[4].z += 10),
                (U[6].z += 10),
                (U[13].z += 10),
                (U[15].z += 10),
                (D.position.y = -36 * SPLODER.weightedValue(0, B, 0.5)),
                (D.rotation.x += 0.4 * SPLODER.weightedValue(0, Q, 1)),
                S.add(D),
                (m = G(60 * SPLODER.weightedValue(0, H, 0.5), 48 * SPLODER.weightedValue(0, B, 0.5), 32 * SPLODER.weightedValue(0, H, 0.5, k, 0.25), 0, -24 * SPLODER.weightedValue(0, B, 0.5), 0, 3)),
                (z = m.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 7, 24, 2, 6, 23, 24, 2, 6, 7, 24, 1, 6, 7, 24, 1, 1),
                (U[2].x += 6 * SPLODER.weightedValue(0, X, 0.25)),
                (U[3].x += 6 * SPLODER.weightedValue(0, X, 0.25)),
                (U[6].x -= 6 * SPLODER.weightedValue(0, X, 0.25)),
                (U[7].x -= 6 * SPLODER.weightedValue(0, X, 0.25)),
                (U[1].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[4].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[8].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[9].z -= 12 * SPLODER.weightedValue(-0.5, H, 0.5)),
                (U[3].z -= 24 * SPLODER.weightedValue(0, X, 0.25)),
                (U[6].z -= 24 * SPLODER.weightedValue(0, X, 0.25)),
                (U[14].z -= 24 * SPLODER.weightedValue(0, X, 0.25)),
                (U[15].z -= 24 * SPLODER.weightedValue(0, X, 0.25)),
                (U[12].z += 16 * SPLODER.weightedValue(0, X, 0.25)),
                (U[13].z += 16 * SPLODER.weightedValue(0, X, 0.25)),
                (U[2].z += 8 * SPLODER.weightedValue(0, X, 0.25)),
                (U[7].z += 8 * SPLODER.weightedValue(0, X, 0.25)),
                (U[0].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[5].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[10].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[11].z += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[0].x += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[5].x -= 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[2].x += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[7].x -= 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[1].x += 8 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[4].x -= 8 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[3].x += 8 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[6].x -= 8 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[3].y += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[6].y += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[14].y += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (U[15].y += 16 * SPLODER.weightedValue(-0.5, Q, 0.5)),
                (m.position.y = -32 * SPLODER.weightedValue(0, B, 0.5)),
                h.add(m),
                (I = G(
                    16 * SPLODER.weightedValue(0, k, 0.35),
                    42 * SPLODER.weightedValue(0, B, 0.5),
                    20 * SPLODER.weightedValue(0, k, 0.35, X, -0.25),
                    0,
                    -20 * SPLODER.weightedValue(0, B, 0.5),
                    0,
                    1,
                    1,
                    1,
                    !0,
                    Math.max(0, SPLODER.weightedValue(0, k, 24))
                )),
                (z = I.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 13, 11, 3, 7, 16, 11, 3, 7, 15, 11, 1, 7, 15, 11, 1, 1),
                (U[4].y += 5),
                (U[5].y += 5),
                (U[3].z += 5 * SPLODER.weightedValue(0, k, 0.35, X, -0.25)),
                (U[6].z += 5 * SPLODER.weightedValue(0, k, 0.35, X, -0.25)),
                (I.position.x = 40 * SPLODER.weightedValue(0, H, 0.5) + SPLODER.weightedValue(0, k, 4)),
                (I.position.y += 42 * SPLODER.weightedValue(0, B, 0.5)),
                (I.rotation.z += 0.2 * SPLODER.weightedValue(0, Q, 1)),
                (I.rotation.x -= 0.4 * SPLODER.weightedValue(0, Q, 1)),
                l.add(I),
                (w = G(
                    16 * SPLODER.weightedValue(0, k, 0.35),
                    42 * SPLODER.weightedValue(0, B, 0.5),
                    20 * SPLODER.weightedValue(0, k, 0.35, X, -0.25),
                    0,
                    -20 * SPLODER.weightedValue(0, B, 0.5),
                    0,
                    1,
                    1,
                    1,
                    !1,
                    Math.max(0, SPLODER.weightedValue(0, k, 24))
                )),
                (z = w.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 0, 11, 3, 7, 29, 11, 3, 7, 0, 11, 1, 7, 0, 11, 1, 1),
                (U[0].y += 5),
                (U[1].y += 5),
                (U[3].z += 5 * SPLODER.weightedValue(0, k, 0.35, X, -0.25)),
                (U[6].z += 5 * SPLODER.weightedValue(0, k, 0.35, X, -0.25)),
                (w.position.x = -40 * SPLODER.weightedValue(0, H, 0.5) - SPLODER.weightedValue(0, k, 4)),
                (w.position.y += 42 * SPLODER.weightedValue(0, B, 0.5)),
                (w.rotation.z -= 0.2 * SPLODER.weightedValue(0, Q, 1)),
                (w.rotation.x -= 0.4 * SPLODER.weightedValue(0, Q, 1)),
                l.add(w),
                (v = G(18 * SPLODER.weightedValue(0, k, 0.35), 42 * SPLODER.weightedValue(0, B, 0.5), 22 * SPLODER.weightedValue(0, k, 0.35, X, -0.25), 0, -21 * SPLODER.weightedValue(0, B, 0.5), 0, 1, 4, 1, !0)),
                (z = v.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 13, 18, 3, 6, 16, 18, 3, 6, 15, 18, 1, 6, 15, 18, 1, 1),
                (U[1].y += 10),
                (U[10].y += 10),
                (U[4].x -= 3),
                (U[4].z -= 3),
                (U[5].x -= 3),
                (U[5].z += 3),
                (U[14].x += 3),
                (U[14].z += 3),
                (U[15].x += 3),
                (U[15].z -= 3),
                (U[8].x -= 3),
                (U[8].z -= 3),
                (U[9].x -= 3),
                (U[9].z += 3),
                (U[18].x += 3),
                (U[18].z += 3),
                (U[19].x += 3),
                (U[19].z -= 3),
                (v.position.y = -40 * SPLODER.weightedValue(0, B, 0.5)),
                (v.rotation.z -= 0.2 * SPLODER.weightedValue(0, Q, 1)),
                (v.rotation.x -= 0.2 * SPLODER.weightedValue(0, Q, 1)),
                I.add(v),
                i && N && ((M = new SPLODER.BipedItem().initWithRectAndMaterial(e, i, N)), M.build(), (M.mesh.rotation.y = 1.57), (M.mesh.position.x += 8), v.add(M.mesh)),
                (_ = G(18 * SPLODER.weightedValue(0, k, 0.35), 42 * SPLODER.weightedValue(0, B, 0.5), 22 * SPLODER.weightedValue(0, k, 0.35, X, -0.25), 0, -21 * SPLODER.weightedValue(0, B, 0.5), 0, 1, 4, 1)),
                (z = _.geometry),
                (U = z.vertices),
                SPLODER.MeshUtils.transformUVs(z, o, n, 0, 18, 3, 6, 29, 18, 3, 6, 0, 18, 1, 6, 0, 18, 1, 1),
                (U[1].y += 10),
                (U[10].y += 10),
                (U[4].x -= 3),
                (U[4].z -= 3),
                (U[5].x -= 3),
                (U[5].z += 3),
                (U[14].x += 3),
                (U[14].z += 3),
                (U[15].x += 3),
                (U[15].z -= 3),
                (U[8].x -= 3),
                (U[8].z -= 3),
                (U[9].x -= 3),
                (U[9].z += 3),
                (U[18].x += 3),
                (U[18].z += 3),
                (U[19].x += 3),
                (U[19].z -= 3),
                (_.position.y = -40 * SPLODER.weightedValue(0, B, 0.5)),
                (_.rotation.z += 0.2 * SPLODER.weightedValue(0, Q, 1)),
                (_.rotation.x -= 0.2 * SPLODER.weightedValue(0, Q, 1)),
                w.add(_),
                (Y = F(21 * SPLODER.weightedValue(0, k, 0.35, X, -0.25), 22 * SPLODER.weightedValue(0, B, 0.5), 0, 11 * SPLODER.weightedValue(0, B, 0.5), 0)),
                (Y.position.y -= 53.25 * SPLODER.weightedValue(0, B, 0.5)),
                (Y.position.x += 8.75 * SPLODER.weightedValue(0, k, 0.35)),
                (Y.rotation.y = 0.5 * Math.PI),
                SPLODER.MeshUtils.transformUVs(Y.geometry, o, n, 13, 24, 5, 5),
                v.add(Y),
                (Y = Y.clone()),
                (Y.rotation.y = 0.5 * -Math.PI),
                v.add(Y),
                (C = F(21 * SPLODER.weightedValue(0, k, 0.35, X, -0.25), 22 * SPLODER.weightedValue(0, B, 0.5), 0, 11 * SPLODER.weightedValue(0, B, 0.5), 0)),
                (C.position.y -= 53.25 * SPLODER.weightedValue(0, B, 0.5)),
                (C.position.x -= 8.75 * SPLODER.weightedValue(0, k, 0.35)),
                (C.rotation.y = 0.5 * -Math.PI),
                SPLODER.MeshUtils.transformUVs(C.geometry, o, n, 13, 24, 5, 5),
                _.add(C),
                (C = C.clone()),
                (C.rotation.y = 0.5 * Math.PI),
                _.add(C),
                s && x && ((A = new SPLODER.BipedItem().initWithRectAndMaterial(e, s, x)), A.build(), _.add(A.mesh)),
                (z = h.geometry),
                (U = z.vertices),
                (U[0].x -= 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[1].x -= 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[4].x += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[5].x += 4 * SPLODER.weightedValue(-1, X, 1)),
                (z = l.geometry),
                (U = z.vertices),
                (U[4].x -= 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[5].x -= 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[10].x += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[11].x += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[2].y += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[9].y += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[2].z += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[9].z += 4 * SPLODER.weightedValue(-1, X, 1)),
                (U[0].y -= 4 * SPLODER.weightedValue(-0.5, X, 1)),
                (U[1].y -= 4 * SPLODER.weightedValue(-0.5, X, 1)),
                (U[6].y -= 4 * SPLODER.weightedValue(-0.5, X, 1)),
                (U[7].y -= 4 * SPLODER.weightedValue(-0.5, X, 1)),
                (U[0].z -= 4 * SPLODER.weightedValue(-1, X, 1, H, 0.5)),
                (U[1].z += 4 * SPLODER.weightedValue(-1, X, 1, H, 0.5)),
                (U[6].z += 4 * SPLODER.weightedValue(-1, X, 1, H, 0.5)),
                (U[7].z -= 4 * SPLODER.weightedValue(-1, X, 1, H, 0.5)),
                (I.position.y -= 4 * SPLODER.weightedValue(-0.5, X, 1)),
                (w.position.y -= 4 * SPLODER.weightedValue(-0.5, X, 1));
            var q = function (e) {
                V.push(e.geometry);
                for (var t = e.children.length; t--;) q(e.children[t]);
            };
            q(r), (this.poses = new SPLODER.BipedPoses().initWithElements(e, r, h, l, E, O, L, S, I, w, g, y, A, M));
        };
        var z = function (e, t, i) {
            (i = i || r), SPLODER.MeshUtils.offsetUVsRecursive(e, t, i);
        };
        (this.destroy = function () {
            O && (O.destroy(), (O = null)), this.poses && (this.poses.destroy(), (this.poses = null));
        }),
            Object.defineProperty(this, "skinX", {
                get: function () {
                    return o;
                },
                set: function (e) {
                    if (!isNaN(e)) {
                        var t = e - o;
                        z(t, 0), (o = e);
                    }
                },
            }),
            Object.defineProperty(this, "skinY", {
                get: function () {
                    return n;
                },
                set: function (e) {
                    if (!isNaN(e)) {
                        var t = e - n;
                        z(0, t), (n = e);
                    }
                },
            }),
            Object.defineProperty(this, "mesh", {
                get: function () {
                    return a;
                },
            }),
            Object.defineProperty(this, "itemLeft", {
                get: function () {
                    return M;
                },
            }),
            Object.defineProperty(this, "itemRight", {
                get: function () {
                    return A;
                },
            }),
            Object.defineProperty(this, "geometries", {
                get: function () {
                    return V;
                },
            }),
            Object.defineProperty(this, "materials", {
                get: function () {
                    return U;
                },
            });
    }),
    (SPLODER.Biped.PROPERTY_SKIN = 5),
    (SPLODER.Biped.PROPERTY_HEIGHT = 6),
    (SPLODER.Biped.PROPERTY_WEIGHT = 7),
    (SPLODER.Biped.PROPERTY_STRENGTH = 8),
    (SPLODER.Biped.PROPERTY_GENDER = 9),
    (SPLODER.Biped.PROPERTY_HEADSIZE = 10),
    (SPLODER.Biped.PROPERTY_HEADTHICK = 11),
    (SPLODER.Biped.PROPERTY_BEASTLY = 12),
    (SPLODER.Biped.PROPERTY_ITEMFRAME_RIGHT = 13),
    (SPLODER.Biped.PROPERTY_ITEMFRAME_LEFT = 14),
    (function (e, t) {
        (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_SKIN] = 0),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_HEIGHT] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_WEIGHT] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_STRENGTH] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_GENDER] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_HEADSIZE] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_HEADTHICK] = 128),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_BEASTLY] = 64),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_ITEMFRAME_RIGHT] = -1),
            (e.defaultsByType[e.TYPE_BIPED][t.PROPERTY_ITEMFRAME_LEFT] = -1);
    })(SPLODER.Item, SPLODER.Biped),

    (SPLODER.ImageMap = function () {
        var e = 0;
        (this.canvas = null), (this.context = null);
        var t, i, s, o;
        this.initWithDefaultValue = function (t) {
            return (e = t), (this.canvas = document.createElement("canvas")), (this.context = this.canvas.getContext("2d")), this;
        };
        var n = function (e) {
            return e--, (e |= e >> 1), (e |= e >> 2), (e |= e >> 4), (e |= e >> 8), (e |= e >> 16), ++e;
        },
            a = function (e, o, n, a, r) {
                var h, l, E, d, R, P, c;
                for (r = r || 0, E = o.x - t, d = o.y - i, R = E + o.width, P = d + o.height, l = d; P > l; l++)
                    for (h = E; R > h; h++) (c = l * s + h), (c *= 4), (n[c] = Math.min(255, Math.max(0, 10 * a))), (n[c + 1] = Math.min(255, Math.max(0, r))), (n[c + 2] = 0), (n[c + 3] = 255);
            },
            r = function (e, t, i) {
                if (e) {
                    var s = e.items.concat();
                    s.reverse();
                    for (var o, n, r, h = e.items.length; h--;)
                        (o = s[h]),
                            o.type == SPLODER.Item.TYPE_WALL &&
                            ((r = o.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)),
                                (n = o.getAttrib(SPLODER.Item.PROPERTY_CEIL) ? o.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) : 128),
                                a(i, o, t, Math.max(0, n - r), o.getAttrib(SPLODER.Item.PROPERTY_LIGHTLEVEL) + o.getAttrib(SPLODER.Item.PROPERTY_LIGHTEFFECT)));
                }
            };
        (this.getData = function (e, t, i, s) {
            return (s = s || 0), this.context.getImageData(e, t, 1, 1).data[s];
        }),
            (this.updateBounds = function (e, a) {
                var r = e.bounds;
                (t = r.x - a), (i = r.y - a), (s = Math.min(2048, n(r.width + 2 * a))), (o = Math.min(2048, n(r.height + 2 * a)));
            }),
            (this.update = function (a, h, l) {
                l = l || 0;
                var E = a.bounds;
                (t = E.x - l), (i = E.y - l), (s = this.canvas.width = Math.min(2048, n(E.width + 2 * l))), (o = this.canvas.height = Math.min(2048, n(E.height + 2 * l)));
                var d = this.canvas.getContext("2d");
                d.clearRect(0, 0, s, o);
                var R = new THREE.Color(16776960);
                R.multiplyScalar(e / 255), (d.fillStyle = "#" + R.getHexString()), d.fillRect(0, 0, s, o);
                var P,
                    c,
                    u,
                    O,
                    L = d.getImageData(0, 0, s, o),
                    S = L.data;
                if ((r(a, S, l), l > 0 && (d.fillRect(0, 0, l, o), d.fillRect(0, 0, s, l), d.fillRect(s - l, 0, l, o), d.fillRect(0, o - l, s, l)), h)) {
                    var T = h.length;
                    for (O = 0, u = 0; o > u; u++) {
                        for (c = 0; 12 > c; c++) (P = u * s + c), (P *= 4), T > O && (S[P + 2] = h[O]), O++;
                        if (O >= T) break;
                    }
                }
                T > O && console.log("WARNING: All lights could not fit into space"), d.putImageData(L, 0, 0);
            });
    }),

    (SPLODER.Store = function () {
        (this.id = 0),
            (this.items = null),
            (this.bounds = null),
            (this.duplicatedItems = null),
            (this.selection = null),
            (this.nextItemId = 1),
            (this.changed = null),
            (this.bookmarked = null),
            (this.ItemClass = SPLODER.Rect),
            (this.init = function () {
                return (
                    (this.id = SPLODER.Store._nextId),
                    SPLODER.Store._nextId++,
                    (this.items = []),
                    (this.bounds = { x: 0, y: 0, width: 0, height: 0, size: 0 }),
                    (this.duplicatedItems = []),
                    (this.selection = []),
                    (this.changed = new signals.Signal()),
                    (this.bookmarked = new signals.Signal()),
                    this
                );
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.addItem = function (e, t, i, s, o, n) {
                var a = new this.ItemClass(e, t, i, s, o);
                return (a.id = this.nextItemId), this.nextItemId++, this.items.push(a), SPLODER.ShapeUtils.sortByAreaDesc(this.items), n || this.updateBounds(), a;
            }),
            (this.updateBounds = function () {
                this.bounds = SPLODER.ShapeUtils.getBounds(this.items);
            }),
            (this.serialize = function (e) {
                var t = e ? !1 : !0;
                e = e || this.items;
                var i,
                    s = [],
                    o = this.selection,
                    n = [];
                for (i = e.length; i--;) s.unshift(e[i].serialize());
                if (t) for (i = o.length; i--;) n.unshift(o[i].id);
                return s.join("|").split("null").join("@") + "~" + n.join("|");
            }),
            (this.unserialize = function (levelString, t) {
                if (levelString) {
                    var i = [],
                        s = [];
                    if (((levelString = levelString.split("@").join("null")), levelString.indexOf("~") >= 0)) {
                        var o,
                            n = levelString.split("~"),
                            a = n[0].split("|"),
                            r = n[1].split("|");
                        for (o = 0; o < r.length; o++) r[o] = parseInt(r[o]);
                        if (a.length)
                            for (o = 0; o < a.length; o++) {
                                var h = new this.ItemClass();
                                h.unserialize(a[o]), isNaN(h.id) || (i.push(h), t || (this.nextItemId = Math.max(this.nextItemId, h.id)), r.length && r.indexOf(h.id) >= 0 && s.push(h));
                            }
                        if ((SPLODER.ShapeUtils.sortByAreaDesc(i), SPLODER.ShapeUtils.sortByAreaDesc(s), t)) return this.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE), i;
                        this.nextItemId++, (this.items = i), (this.selection = s), this.updateBounds(), this.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE);
                    }
                }
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                this.unserialize(e), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                this.unserialize(e), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.hasSelection = function (e) {
                return void 0 === e ? this.selection.length > 0 : this.selection.length == e;
            }),
            (this.selectionType = function () {
                var e = this.selection;
                if (0 == e.length) return -1;
                for (var t = e[0].type, i = e.length; i--;) if (e[i].type != t) return -2;
                return t;
            }),
            (this.deleteSelection = function () {
                for (var e, t = this.selection, i = this.items, s = t.length; s--;) (e = i.indexOf(t[s])), e >= 0 && i.splice(e, 1);
                (this.selection = []), this.updateBounds();
            }),
            (this.getItemById = function (e) {
                for (var t = this.items, i = t.length; i--;) if (t[i].id == e) return t[i];
                return null;
            }),
            (this.filterType = function (e, t) {
                if (void 0 != t && e !== t) {
                    if (t != SPLODER.Item.TYPE_FILTER_WALL_LIQUID) return !1;
                    if (e != SPLODER.Item.TYPE_WALL && e != SPLODER.Item.TYPE_LIQUID) return !1;
                }
                return !0;
            }),
            (this.getItemsUnderPoint = function (e, t, i, s, o, n, a) {
                (i = i || 0), (s = s || this.items);
                for (var r, h = s.length, l = o ? [] : null; h--;)
                    if (((r = s[h]), this.filterType(r.type, n)))
                        if ((r.type == SPLODER.Item.TYPE_ITEM || r.type == SPLODER.Item.TYPE_BIPED) && SPLODER.Geom.distanceBetweenSquared(e, t, r.x, r.y) <= 4) {
                            if (!o) return r;
                            l.push(r);
                        } else if (r.type == SPLODER.Item.TYPE_LIGHT && SPLODER.Geom.distanceBetweenSquared(e, t, r.x, r.y) <= 2) {
                            if (!o) return r;
                            l.push(r);
                        } else if (e >= r.x - i && t >= r.y - i && e <= r.x + r.width + i && t <= r.y + r.height + i) {
                            if (!o) return a ? [r].concat(SPLODER.ShapeUtils.getDescendants(r)) : r;
                            l.push(r);
                        }
                return l && (SPLODER.ShapeUtils.sortByAreaDesc(l), l.reverse()), l;
            }),
            (this.getItemUnderPoint = function (e, t, i, s, o) {
                return this.getItemsUnderPoint(e, t, i, null, !1, s, o);
            }),
            (this.selectionIsUnderPoint = function (e, t, i) {
                return this.getItemsUnderPoint(e, t, i, this.selection);
            }),
            (this.itemIsSelected = function (e, t) {
                return -1 !== this.selection.indexOf(e) ? (t ? 1 == this.selection.length : !0) : !1;
            }),
            (this.itemWithIdIsSelected = function (e, t) {
                var i = this.getItemById(e);
                return i ? this.itemIsSelected(i, t) : !1;
            }),
            (this.getItemsWithinRect = function (e, t, i, s, o, n) {
                n = n || this.items;
                for (var a, r = n.length, h = []; r--;) (a = n[r]), this.filterType(a.type, o) && e <= a.x && t <= a.y && e + i >= a.x + a.width && t + s >= a.y + a.height && h.push(a);
                return h;
            }),
            (this.getItemsIntersectingRect = function (e, t, i, s, o, n) {
                n = n || this.items;
                for (var a, r = n.length, h = []; r--;) (a = n[r]), this.filterType(a.type, o) && (a.x > e + i || a.x + a.width < e || a.y > t + s || a.y + a.height < t || h.push(a));
                return h;
            }),
            (this.getItemsByType = function (e) {
                for (var t, i = [], s = this.items.length; s--;) (t = this.items[s]), this.filterType(t.type, e) && i.unshift(t);
                return i;
            });
    }),
    (SPLODER.Store._nextId = 1),
    (SPLODER.Store.prototype.onAction = function (e) {
        console.log("ABSTRACT METHOD CALLED: OVERRIDE!", e);
    }),
    (SPLODER.Store.prototype.copySelectionAsClipboard = function () {
        var e = this.selection,
            t = { modelId: this.id, bounds: SPLODER.ShapeUtils.getBounds(e), data: "" };
        if (e.length) {
            for (var i = [], s = 0; s < e.length; s++) (item = e[s]), i.push(item.serialize());
            t.data = i.join("|");
        }
        return t;
    }),
    (SPLODER.Store.prototype.pasteSelectionFromClipboard = function (e, t) {
        if (e && e.modelId == this.id && e.data) {
            this.saveUndo();
            for (var i = e.data.split("|"), s = (this.selection = []), o = 0; o < i.length; o++) (item = this.addItem()), item.unserialize(i[o], !0), s.push(item);
            return this.updateBounds(), t !== !1 && s.length > 1 && SPLODER.ShapeUtils.sortByAreaDesc(s), this.changed.dispatch(SPLODER.ACTION_CLIPBOARD_PASTE, s), s;
        }
    }),
    (SPLODER.Store.LIGHT_COLOR_CHOICES = [16777215, 16764057, 16750950, 16724736, 16711935, 10040319, 13311, 52479, 65280]),

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

    (SPLODER.Levels = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = null,
            t = this;
        (this.model = null), (this.envModel = null);
        var i = 0,
            s = 0,
            o = 1;
        Object.defineProperty(this, "currentLevel", {
            get: function () {
                return s;
            },
            set: function (e) {
                a(e);
            },
        }),
            (this.initWithModels = function (t, i) {
                return (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++, (e = []), (this.model = t), (this.envModel = i), (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
            }),
            (this.initWithModelAndData = function (e, t) {
                this.initWithModel(e), n(t);
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.getLevelNums = function () {
                return e.reduce(function (e, t, i) {
                    return t && t instanceof Array && e.push(i), e;
                }, []);
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                n(e, SPLODER.ACTION_UNDO), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                n(e, SPLODER.ACTION_REDO), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.serialize = function () {
                for (var t = [], n = 0; n < e.length; n++) t[n] = e[n] instanceof Array ? this.model.serialize(e[n]) : null;
                return console.log("SERIALIZING"), console.log(t), t.join("_#_") + "_#_" + i + "," + s + "," + o;
            });
        var n = function (i, n) {
            var r = i.split("_#_");
            e = [];
            for (var h = 0; h < r.length - 1; h++) console.log(h, r[h]), (e[h] = r[h] && r[h].length ? t.model.unserialize(r[h], !0) : h < r.length - 1 ? null : []);
            var l = SPLODER.parseFloatArray(r[r.length - 1].split(","));
            l.length && ((o = l[2]), (t.model.nextItemId = o = Math.max(t.model.nextItemId, o)), n == SPLODER.ACTION_UNDO ? a(l[0], !0) : a(l[1], !0)), console.log("current level", s, "max item id", o);
        },
            a = function (n, a) {
                if (s != n && !isNaN(n) && n >= 0) {
                    if (!e[n]) {
                        if (n != e.length) return;
                        e[n] = [];
                    }
                    a || (e[s] = t.model.items),
                        (o = Math.max(t.model.nextItemId, o)),
                        (t.model.selection = []),
                        (t.model.items = e[n]),
                        (i = s),
                        (s = t.envModel.currentLevel = n),
                        a || t.saveUndo(),
                        t.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE);
                }
            },
            r = function () {
                a(e.length), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
            },
            h = function () {
                if (e[s] instanceof Array && e[s].length > 0) {
                    var i = e[s].concat();
                    r(), (e[s] = t.model.items = i), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
                }
            },
            l = function () {
                if ((console.log("DELETING", e[s]), 0 != s && e[s] instanceof Array)) {
                    var i = s;
                    a(0), (e[i] = null), t.saveUndo(), t.changed.dispatch(SPLODER.ACTION_CHANGE);
                }
            };
        this.onAction = function (e) {
            var t = e[0],
                i = e[1];
            switch (t) {
                case SPLODER.ACTION_SELECT_ITEM:
                    a(i);
                    break;
                case SPLODER.ACTION_SELECTION_DUPLICATE:
                    h();
                    break;
                case SPLODER.ACTION_SELECTION_DELETE:
                    l();
                    break;
                case SPLODER.ACTION_CREATE:
                    r();
            }
        };
    }),

    (SPLODER.EnvModel = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = null,
            t = 0,
            i = this;
        Object.defineProperty(this, "currentLevel", {
            get: function () {
                return t;
            },
            set: function (e) {
                o(e);
            },
        }),
            (this.init = function () {
                return (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++, (e = []), (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
            }),
            (this.initWithData = function (e) {
                this.init(), s(e);
            }),
            (this.setEnv = function (i, s) {
                (i = i || 0), e[t] || (e[t] = []), (e[t][i] = s);
            }),
            (this.getEnvs = function () {
                return e[t] || [];
            }),
            (this.hasEnv = function (i) {
                return e && e[t] && e[t][i];
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.serialize = function () {
                for (var t = [], i = 0; i < e.length; i++) t[i] = e[i] instanceof Array ? e[i].join(",") : "";
                return t.join("|");
            });
        var s = function (t) {
            for (var s = t.split("|"), o = 0; o < s.length; o++) e[o] = s[o] ? SPLODER.parseFloatArray(s[o].split(",")) : [];
            i.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CHANGE]);
        },
            o = function (e) {
                !isNaN(e) && e >= 0 && ((t = e), i.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CONTEXT_CHANGE, t]));
            };
        this.onAction = function (e) {
            if (e) {
                var t = e[0];
                switch (t) {
                    case SPLODER.ACTION_CHANGE:
                        switch ((console.log(e), e[2])) {
                            case SPLODER.EnvModel.PROPERTY_SKY_COLOR:
                                this.saveUndo();
                                var i = e[3],
                                    s = e[4] || 0;
                                this.setEnv(SPLODER.EnvModel.PROPERTY_SKY_COLOR, i.getHex(), s), this.changed.dispatch([SPLODER.EnvModel.ENVIRONMENT, SPLODER.ACTION_CHANGE, SPLODER.EnvModel.PROPERTY_SKY_COLOR, i]);
                        }
                }
            }
        };
    }),
    (SPLODER.EnvModel.ENVIRONMENT = -10),
    (SPLODER.EnvModel.PROPERTY_SKY_COLOR = 0),

    (SPLODER.ModelHistory = function () {
        var e = null,
            t = null,
            i = null,
            s = null,
            o = null,
            n = { data: "", modelId: 0 };
        (this.changed = new signals.Signal()),
            Object.defineProperty(this, "clipboardModelId", {
                get: function () {
                    return n.modelId;
                },
            }),
            Object.defineProperty(this, "hasUndos", {
                get: function () {
                    return t && t.length > 0;
                },
            }),
            Object.defineProperty(this, "hasRedos", {
                get: function () {
                    return i && i.length > 0;
                },
            }),
            (this.init = function () {
                return (
                    (e = []),
                    (t = []),
                    (s = []),
                    (i = []),
                    (o = []),
                    localStorage && localStorage.getItem("com.sploder.3deditor.history")
                        ? this.importHistory(localStorage.getItem("com.sploder.3deditor.history"))
                        : this["import"](
                            "==527,0,-18,-18,36,36,[[@,80]]|509,0,-16,-16,32,32,[[@,64,84,@,@,@,@,@,@,@,@,50,7]]|510,0,-7,-6,14,12,[[@,55],[@,68]]|526,2,-7,-6,14,12,[[@,60]]|532,0,-3,-6,6,9,[[@,63]]|521,0,-7,6,14,2,[[@,63]]|518,0,-7,-10,14,2,[[@,66]]|520,0,-7,8,14,2,[[@,66]]|524,0,-7,-8,14,2,[[@,63]]|517,0,9,-6,2,12,[[@,66]]|522,0,7,-6,2,12,[[@,63]]|523,0,-9,-6,2,12,[[@,63]]|519,0,-11,-6,2,12,[[@,66]]|514,0,7,-10,4,4,[[@,84]]|515,0,-11,6,4,4,[[@,84]]|516,0,7,6,4,4,[[@,84]]|511,0,-11,-10,4,4,[[@,84]]|512,5,13,0,0,0,[[@,72,@,@,@,34,35,36]]|513,6,0,0,0,0,[[@,64]]~==1,1,-46,-2,12,4,0,1,2,0,1,0,0,0,0,0|2,2,-28,-2,12,4,0,2,5,4,0,1,1,1,3,6,1,3,2|3,3,8,-4,12,4,0,1,11,0,1,0,2,2|6,3,0,9,12,4,0,0,3,0,0|4,4,-16,9,10,4,0,1,6,0,1,0,0,5,0,3,3|5,5,-7,-4,8,4,0,1,3,0,1,0,1,12,0,1,3|11,6,4,2,4,4,0,1,5,1,1,,,3~"
                        ),
                    this
                );
            }),
            (this.registerModel = function (t) {
                t.bookmarked.add(this.handleBookmark, this), (e[t.id] = t);
            }),
            (this.getModelById = function (t) {
                return e[t];
            }),
            (this.copyToClipboard = function () {
                for (var t, i = e.length; i--;) if (((t = e[i]), t && "hasSelection" in t && t.hasSelection())) return (n = t.copySelectionAsClipboard()), this.changed.dispatch(n.modelId), !0;
                return !1;
            }),
            (this.pasteFromClipboard = function (e) {
                if (n.modelId && n.data) {
                    var t = this.getModelById(n.modelId);
                    if (t) {
                        var i = t.pasteSelectionFromClipboard(n);exportHistory
                        if (i && e) {
                            var s = n.bounds.x + 0.5 * n.bounds.width,
                                o = n.bounds.y + 0.5 * n.bounds.height,
                                a = Math.floor(e.x - s),
                                r = Math.floor(e.y - o);
                            i.forEach(function (e) {
                                (e.x += a), (e.y += r);
                            });
                        }
                        return !0;
                    }
                }
                return !1;
            }),
            (this.handleBookmark = function (e) {
                this.saveUndo(e);
            }),
            (this.saveUndo = function (n) {
                var a = e[n];
                if (a) {
                    var r = a.serialize();
                    if (t.length && t[0] == r) return;
                    t.unshift(r), s.unshift(n), t.length > 24 && (t.pop(), s.pop()), (i = []), (o = []), this.changed.dispatch(n), localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                }
            }),
            (this.saveAll = function () {
                for (var t = 0; t < e.length; t++) this.saveUndo(t);
                console.log("SAVED ALL MODELS");
            }),
            (this.restoreUndo = function () {
                if (t.length && s.length) {
                    var n,
                        a = s[0],
                        r = e[a];
                    if (r) {
                        var h = r.serialize();
                        t[0] == h && (t.shift(), s.shift()),
                            t.length && s.length && (i.unshift(h), o.unshift(a), (n = t.shift()), (a = s.shift()), (r = e[a]), r && (r.restoreUndo(n), this.changed.dispatch(a))),
                            localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                    }
                }
            }),
            (this.redo = function () {
                if (i.length) {
                    var n = i.shift(),
                        a = o.shift(),
                        r = e[a];
                    if (r) {
                        var h = r.serialize();
                        t.unshift(h), s.unshift(a), r.redo(n), this.changed.dispatch(a), localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                    }
                }
            }),
            (this.restoreModelFromString = function (t, i) {
                var s = e[i];
                s && s.redo(t);
            }),
            (this["export"] = function () {
                for (var t = "", i = 0; i < e.length; i++) e[i] && (t += e[i].serialize()), i != e.length - 1 && (t += "==");
                return (t = t.split("NaN,").join(","));
            }),
            (this["import"] = function (t) {
                for (var i = t.split("=="), s = 0; s < e.length; s++) e[s] && i[s] && (console.log(e[s]), e[s].unserialize(i[s]));
            }),
            (this.exportHistory = function () {
                return (t.join("==") + "```" + s.join("==") + "```" + i.join("==") + "```" + o.join("==")).split("NaN,").join(",");
            }),
            (this.importHistory = function (e) {
                var n = e.split("```");
                (t = n[0].split("==")), (s = n[1].split("==")), SPLODER.parseFloatArray(s), (i = n[2].split("==")), (o = n[3].split("==")), SPLODER.parseFloatArray(o);
            }),
            (this.restore = function () {
                for (var e = [], i = 0; i < t.length; i++) {
                    var o = s[i];
                    -1 == e.indexOf(o) && (e.push(o), this.restoreModelFromString(t[i], s[i]));
                }
            });
    }),

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

    (SPLODER.FlowStore = function () {
        SPLODER.Store.call(this);
        var e = this,
            t = 0;
        Object.defineProperty(this, "flowId", {
            get: function () {
                return t;
            },
            set: function (i) {
                isNaN(i) || ((t = i), (e.selection = []), e.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE));
            },
        }),
            (this.ItemClass = SPLODER.FlowNode),
            (this.getItemsUnderPoint = function (e, t, i, s, o, n) {
                (i = i || 0), (s = s || this.items);
                for (var a, r = s.length, h = o ? [] : null; r--;)
                    if (((a = s[r]), (void 0 == n || a.type === n) && a.flowId == this.flowId && e >= a.x - i && t >= a.y - i && e <= a.x + a.width + i && t <= a.y + a.height + i)) {
                        if (!o) return a;
                        h.push(a);
                    }
                return h;
            }),
            (this.onAction = function (e) {
                if (e) {
                    var t,
                        i,
                        s,
                        o,
                        n,
                        a,
                        r,
                        h,
                        l,
                        E,
                        d,
                        R,
                        P,
                        c = e[0];
                    switch (c) {
                        case SPLODER.ACTION_DESELECT:
                            this.selection.length && (this.saveUndo(), (this.selection = []), this.changed.dispatch(c));
                            break;
                        case SPLODER.ACTION_SELECT_POINT:
                            (i = e[1]), (s = e[2]);
                            var u = e[3],
                                O = e[4],
                                L = this.getItemUnderPoint(i, s, 0, null, O);
                            if (((o = this.selection), L && L.length > 1)) return this.saveUndo(), (this.selection = L), void this.changed.dispatch(c, this.selection);
                            if ((r = L)) {
                                var S = 5;
                                if (i - r.x > S && s - r.y > S && r.x + r.width - i > S && r.y + r.height - s > S)
                                    return this.itemIsSelected(r) && (this.saveUndo(), (this.selection = [])), void this.changed.dispatch(SPLODER.ACTION_DESELECT);
                            }
                            u
                                ? r && !this.itemIsSelected(r)
                                    ? (this.saveUndo(), o.push(r), SPLODER.ShapeUtils.sortByAreaDesc(o))
                                    : r || (o.length && (this.saveUndo(), (this.selection = [])))
                                : r && !this.itemIsSelected(r)
                                    ? (this.saveUndo(), (this.selection = [r]))
                                    : o.length && (this.saveUndo(), (this.selection = [])),
                                this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECT_ITEM:
                            e[1] instanceof SPLODER.Item && ((this.selection = [this.getItemById(e[1].id)]), this.changed.dispatch(c, this.selection));
                            break;
                        case SPLODER.ACTION_SELECT_WINDOW:
                            (r = e[1]), (this.selection = this.getItemsIntersectingRect(r.x, r.y, r.width, r.height)), SPLODER.ShapeUtils.sortByAreaDesc(this.selection), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECT_ALL:
                            this.saveUndo(), (this.selection = this.items.concat()), SPLODER.ShapeUtils.sortByAreaDesc(this.selection), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_START:
                            this.saveUndo();
                            break;
                        case SPLODER.ACTION_SELECTION_MOVE:
                            for (t = this.selection.length; t--;) (this.selection[t].x += e[1]), (this.selection[t].y += e[2]);
                            this.updateBounds(), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_DUPLICATE:
                            for (this.saveUndo(), o = this.selection, this.selection = [], n = this.duplicatedItems = [], t = o.length; t--;)
                                (h = o[t]), (l = this.addItem()), l.unserialize(h.serialize(), !0), (l.flowId = this.flowId), n.unshift(h), this.selection.unshift(l);
                            SPLODER.FlowStore.remapNodeConnections(n, this.selection), this.updateBounds(), this.changed.dispatch(c, this.selection);
                            break;
                        case SPLODER.ACTION_SELECTION_RELEASE:
                            if (((o = this.selection.concat()), (n = this.duplicatedItems), o.length && n.length && o[0].x == n[0].x && o[0].y == n[0].y && o[0].width == n[0].width && o[0].height == n[0].height))
                                return this.saveUndo(), this.deleteSelection(), (this.duplicatedItems = []), void this.changed.dispatch(SPLODER.ACTION_SELECTION_DELETE, o);
                            n.length && this.changed.dispatch(c, o), (this.duplicatedItems = []);
                            break;
                        case SPLODER.ACTION_SELECTION_DELETE:
                            this.selection.length && ((o = this.selection.concat()), this.saveUndo(), this.deleteSelection(), this.changed.dispatch(c, o));
                            break;
                        case SPLODER.ACTION_CREATE:
                            this.saveUndo(), (E = e[1]), (d = e[2]), (R = e[3]), (P = e[4]), (i = e[5]), (s = e[6]), (l = this.addItem(E, i, s, e[7], e[8])), (l.flowId = this.flowId);
                            var T = SPLODER.FlowNode.subtypeTargetTypes[E][d];
                            l.setAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE, d),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_OPERATOR, R),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET_TYPE, T),
                                l.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET, P),
                                (this.selection = [l]),
                                this.changed.dispatch(c, this.selection[0]);
                            break;
                        case SPLODER.ACTION_CHANGE:
                            a = e[1];
                            var D = e[2],
                                m = e[3];
                            for (-1 == a ? (o = this.selection) : ((r = this.getItemById(a)), (o = [r])), t = 0; t < o.length; t++) {
                                r = o[t];
                                var d = r.getAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE),
                                    T = SPLODER.FlowNode.subtypeTargetTypes[r.type][d];
                                switch (D) {
                                    case SPLODER.FlowNode.PROPERTY_SUBTYPE:
                                        var f = SPLODER.FlowNode.subtypeStrings[r.type].length - 1;
                                        SPLODER.incrementAttrib(r, D, m, 1, f, 0),
                                            (d = r.getAttrib(SPLODER.FlowNode.PROPERTY_SUBTYPE)),
                                            (T = SPLODER.FlowNode.subtypeTargetTypes[r.type][d]),
                                            isNaN(T) || r.setAttrib(SPLODER.FlowNode.PROPERTY_TARGET_TYPE, T);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_OPERATOR:
                                        r.type == SPLODER.FlowNode.TYPE_CONDITION && SPLODER.incrementAttrib(r, D, m, 0, 4, 0);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_TARGET_TYPE:
                                        SPLODER.incrementAttrib(r, D, m, 0, 3, 0);
                                        break;
                                    case SPLODER.FlowNode.PROPERTY_TARGET:
                                        var p = 0;
                                        T == SPLODER.FlowNode.TARGET_TYPE_TAG ? (p = -7) : T == SPLODER.FlowNode.TARGET_TYPE_STATE && (p = 1),
                                            r.type == SPLODER.FlowNode.TYPE_ACTION && T == SPLODER.FlowNode.TARGET_TYPE_NUMBER && (p = -99),
                                            SPLODER.incrementAttrib(r, D, m, p, 99, 0);
                                }
                            }
                            this.updateBounds(), this.changed.dispatch(c, o, D);
                            break;
                        case SPLODER.ACTION_CHANGE_COMPLETE:
                            (a = e[1]), (r = this.getItemById(a)), this.changed.dispatch(c, r);
                            break;
                        case SPLODER.ACTION_CONNECT:
                            var g = this.getItemById(e[1]),
                                y = this.getItemById(e[2]);
                            g && y && g.addChild(y.id, e[3]), this.changed.dispatch(c, g);
                            break;
                        case SPLODER.ACTION_DISCONNECT:
                            r = this.getItemById(e[1]);
                            var I = e[2];
                            if (r)
                                if (2 == I) for (t = this.items.length; t--;) this.items[t].removeChild(r.id);
                                else for (t = r.children.length; t--;) r.childrenTerminal[t] == I && r.removeChild(r.children[t]);
                            this.changed.dispatch(c, r);
                    }
                }
            });
    }),
    (SPLODER.FlowStore.prototype = Object.create(SPLODER.Store.prototype)),
    (SPLODER.FlowStore.prototype.constructor = SPLODER.FlowStore),
    (SPLODER.FlowStore.remapNodeConnections = function (e, t) {
        if (t && e)
            for (
                var i,
                s,
                o,
                n,
                a = e.length,
                r = function (e, t) {
                    for (var i = e.length; i--;) if (e[i] && e[i].id == t) return i;
                    return -1;
                };
                a--;

            )
                if (e[a] && t[a] && ((i = e[a]), (s = t[a]), i && s && i.children.length))
                    for (o = i.children.length; o--;) (n = r(e, i.children[o])), -1 != n && (console.log("remapping node child id", s.children[o], t[n].id), (s.children[o] = t[n].id));
    }),
    (SPLODER.FlowStore.prototype.pasteSelectionFromClipboard = function (e) {
        if (e && e.data) {
            var t,
                i = e.data.split("|"),
                s = [];
            for (t = 0; t < i.length; t++) (item = this.addItem()), item.unserialize(i[t]), s.push(item);
            var o = SPLODER.Store.prototype.pasteSelectionFromClipboard.apply(this, arguments);
            for (t = o.length; t--;) (o[t].flowId = this.flowId), (o[t].x += 1), (o[t].y += 1);
            SPLODER.FlowStore.remapNodeConnections(s, o);
        }
    }),

    (SPLODER.TagModel = function () {
        (this.id = null), (this.changed = null), (this.bookmarked = null);
        var e = [],
            t = this,
            i = 7;
        (this.init = function () {
            (this.id = SPLODER.Store._nextId), SPLODER.Store._nextId++;
            for (var t = 0 - i; 64 >= t; t++) e[t + i] = [];
            return (this.changed = new signals.Signal()), (this.bookmarked = new signals.Signal()), this;
        }),
            (this.initWithData = function (e) {
                this.init(), s(e);
            }),
            (this.setTag = function (t, s, o) {
                isNaN(t) ||
                    isNaN(s) ||
                    (o
                        ? -1 == e[t + i].indexOf(s) && (e[t + i].push(s), this.changed.dispatch(SPLODER.ACTION_CHANGE, t, s))
                        : -1 != e[t + i].indexOf(s) && (e[t + i].splice(e[t + i].indexOf(s), 1), this.changed.dispatch(SPLODER.ACTION_CHANGE, t, s)));
            }),
            (this.getTags = function (t) {
                return e.reduce(function (e, s, o) {
                    return -1 != s.indexOf(t) && e.push(o - i), e;
                }, []);
            }),
            (this.hasTag = function (t, s) {
                return !isNaN(t) && !isNaN(s) && -1 != e[t + i].indexOf(s);
            }),
            (this.registerWithDispatcher = function (e) {
                e && e.add(this.onAction, this);
            }),
            (this.saveUndo = function () {
                this.bookmarked.dispatch(this.id);
            }),
            (this.restoreUndo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_UNDO);
            }),
            (this.redo = function (e) {
                s(e), this.changed.dispatch(SPLODER.ACTION_REDO);
            }),
            (this.serialize = function () {
                for (var t = [], s = 0 - i; 64 >= s; s++) t[s + i] = e[s + i].join(",");
                return t.join("|");
            });
        var s = function (s) {
            for (var o = s.split("|"), n = 0 - i; 64 >= n; n++) e[n + i] = o[n + i] ? SPLODER.parseFloatArray(o[n + i].split(",")) : [];
            t.changed.dispatch(SPLODER.ACTION_CHANGE);
        };
        this.onAction = function (e) {
            if (e) {
                var t = e[0];
                switch (t) {
                    case SPLODER.ACTION_CHANGE:
                        var i = e[1],
                            s = e[2],
                            o = e[3];
                        this.setTag(s, i, o), this.saveUndo();
                }
            }
        };
    }),

    (SPLODER.GamePhysics = {}),
    (SPLODER.GamePhysics.bufferA = []),
    (SPLODER.GamePhysics.rayCast2d = function (e, t, i, s, o, n) {
        for (var a, r, h, l = t.x / s, E = t.y / s, d = i.x / s, R = i.y / s, P = Math.min(l, d), c = Math.min(E, R), u = Math.abs(l - d), O = Math.abs(E - R), L = e.getItemsIntersectingRect(P, c, u, O), S = [], T = L.length, D = !1; T--;)
            if (((a = L[T]), (!o || a.type == o) && (r = SPLODER.Geom.rectIntersectsLine(a, l, E, d, R))))
                for (var m = 0; m < r.length; m++) (h = r[m]), S.push({ rect: a, pt: h, dist: Math.floor(10 * SPLODER.Geom.distanceBetween(l, E, h.x, h.y)) / 10, area: a.area() }), n && a == n && (D = !0);
        if (
            (S.sort(function (e, t) {
                return e.dist > t.dist ? 1 : e.dist < t.dist ? -1 : e.area > t.area ? -1 : e.area < t.area ? 1 : 0;
            }),
                n && D)
        )
            for (T = S.length; T--;)
                if (S[T].rect == n) {
                    S.splice(T + 1, S.length - T);
                    break;
                }
        return S;
    }),
    (SPLODER.GamePhysics.rayCast3d = function (e, t, i, s, o, n) {
        var a = { x: t.x, y: t.z },
            r = { x: i.x, y: i.z };
        s = s || 32;
        for (var h, l, E, d, R, P = SPLODER.GamePhysics.rayCast2d(e, a, r, s, o, n), c = new THREE.Vector3(), u = SPLODER.Geom.distanceBetweenXZ(t, i), O = [], L = 0; L < P.length; L++)
            (h = P[L]),
                c.copy(t),
                c.lerp(i, (h.dist * s) / u),
                (E = c.y / (0.5 * s)),
                (l = h.rect),
                (d = l.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)),
                (R = l.getAttrib(SPLODER.Item.PROPERTY_CEIL) ? l.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) : 128),
                ((l.type == SPLODER.Item.TYPE_WALL && (d >= E || E >= R)) || (l.type == SPLODER.Item.TYPE_LIQUID && d >= E) || (l.type == SPLODER.Item.TYPE_PLATFORM && E > d && R > E)) && O.push(h);
        return O;
    }),
    (SPLODER.GamePhysics.rayCast3db = function (e, t, i, s) {
        s = s || 32;
        var o,
            n,
            a,
            r = { x: t.x / s, y: t.z / s },
            h = { x: i.x / s, y: i.z / s },
            l = SPLODER.Geom.gridPointsAlongLine(Math.floor(r.x), Math.floor(r.y), Math.floor(h.x), Math.floor(h.y)),
            E = e.getItemsIntersectingRect(Math.min(r.x, h.x), Math.min(r.y, h.y), Math.abs(h.x - r.x), Math.abs(h.y - r.y)),
            d = new THREE.Vector3(),
            R = SPLODER.Geom.distanceBetweenXZ(t, i),
            P = [],
            c = 0.5,
            u = 0.5;
        r.x > h.x && (c = -0.5), r.y > h.y && (u = -0.5);
        for (var O = 0; O < l.length; O += 2) {
            (o = { x: l[O], y: l[O + 1] }), (a = SPLODER.Geom.distanceBetween(r.x, r.y, o.x + 0.5, o.y + 0.5)), d.copy(t), d.lerp(i, (a * s) / R), (n = d.y / (0.5 * s));
            var L = SPLODER.GamePhysics.checkHitAtGridPoint(o.x, o.y, n, E);
            L && L.length && P.push({ rect: L[0], pt: o, dist: a, area: L[0].area(), offsetX: c, offsetY: u });
        }
        return P;
    }),
    (SPLODER.GamePhysics.checkHitAtGridPoint = function (e, t, i, s) {
        var o,
            n,
            a,
            r,
            h,
            l = [];
        if (s) {
            SPLODER.ShapeUtils.sortByAreaDesc(s);
            for (var E, d = s.length; d--;)
                if (((E = s[d]), !(E.x > e || E.x + E.width <= e || E.y > t || E.y + E.height <= t)))
                    switch (((o = E.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (n = E.getAttrib(SPLODER.Item.PROPERTY_CEIL) ? E.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) : 128), E.type)) {
                        case SPLODER.Item.TYPE_WALL:
                            !a && (o >= i || i >= n) && l.push(E), (a = !0);
                            break;
                        case SPLODER.Item.TYPE_PLATFORM:
                            !r && i > o && n > i && l.push(E), (r = !0);
                            break;
                        case SPLODER.Item.TYPE_LIQUID:
                            !h && E.getAttrib(SPLODER.Item.PROPERTY_LIQUID_HASFLOOR) && o >= i && l.push(E), (h = !0);
                    }
        }
        return l;
    }),
    (SPLODER.GamePhysics.pointInWallCheck = function (e, t) {
        var i = t.y / 16,
            s = e.getItemsUnderPoint(Math.floor(t.x / 32) + 0.5, Math.floor(t.z / 32) + 0.5, 0, !1, !1, SPLODER.Item.TYPE_WALL);
        return s && (s.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) > i - 1 || s.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) < i + 1);
    }),
    (SPLODER.GamePhysics.gravityStateCheck = function (e, t, i) {
        var s = 16,
            o = e.getItemsUnderPoint(t.x / 32, t.z / 32, 0, e.items, !1, SPLODER.Item.TYPE_LIQUID);
        if (o) {
            var n = o.getAttrib(SPLODER.Item.PROPERTY_LIQUIDLEVEL);
            if (t.y - 2 * s <= n * s) return i && t.y - 8 <= n * s && (t.y += 1), SPLODER.GamePhysics.GRAVITY_SWIM;
            if (t.y - 3 * s <= n * s) return SPLODER.GamePhysics.GRAVITY_FLOAT;
        }
        return SPLODER.GamePhysics.GRAVITY_STANDARD;
    }),
    (SPLODER.GamePhysics.GRAVITY_STANDARD = 0),
    (SPLODER.GamePhysics.GRAVITY_FLOAT = 1),
    (SPLODER.GamePhysics.GRAVITY_SWIM = 2),
    (SPLODER.GamePhysics.elevationCheck = function (e, t, i, s, o, n) {
        var a,
            r,
            h,
            l,
            E,
            d,
            R = i.clone().divideScalar(32),
            P = 16,
            c = e.getItemsIntersectingRect(R.x - s - 1, R.z - s - 1, 2 * s + 2, 2 * s + 2);
        SPLODER.ShapeUtils.sortByAreaDesc(c);
        var u = [e.getItemsUnderPoint(R.x, R.z, 0, c, !1, SPLODER.Item.TYPE_PLATFORM)];
        s > 0 &&
            u.push(
                e.getItemsUnderPoint(R.x + s, R.z + s, 0, c, !1, SPLODER.Item.TYPE_PLATFORM),
                e.getItemsUnderPoint(R.x + s, R.z - s, 0, c, !1, SPLODER.Item.TYPE_PLATFORM),
                e.getItemsUnderPoint(R.x - s, R.z + s, 0, c, !1, SPLODER.Item.TYPE_PLATFORM),
                e.getItemsUnderPoint(R.x - s, R.z - s, 0, c, !1, SPLODER.Item.TYPE_PLATFORM)
            );
        var O = [];
        if (u)
            for (d = u.length; d--;)
                (h = u[d]),
                    h &&
                    ((l = h.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) * P),
                        (E = h.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) * P),
                        t >= l - P ? O.push({ rect: h, f: l, c: 128 * P }) : l - E - P >= t && O.push({ rect: h, f: 0, c: E }));
        var L = [e.getItemsUnderPoint(R.x, R.z, 0, c, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID)];
        if (
            (s > 0 &&
                L.push(
                    e.getItemsUnderPoint(R.x + s, R.z + s, 0, c, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID),
                    e.getItemsUnderPoint(R.x + s, R.z - s, 0, c, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID),
                    e.getItemsUnderPoint(R.x - s, R.z + s, 0, c, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID),
                    e.getItemsUnderPoint(R.x - s, R.z - s, 0, c, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID)
                ),
                L)
        )
            for (d = L.length; d--;)
                if ((h = L[d])) {
                    if (((l = h.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) * P), (E = h.getAttrib(SPLODER.Item.PROPERTY_CEIL) ? h.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) * P : 1e4), h.type == SPLODER.Item.TYPE_LIQUID)) {
                        if (!h.getAttrib(SPLODER.Item.PROPERTY_LIQUID_HASFLOOR)) continue;
                        E = 1e4;
                    }
                    O.push({ rect: h, f: l, c: E });
                }
        if (!O.length) return [-1e3, i.y + 1e3, !1];
        if (
            (O.sort(function (e, t) {
                return e.f > t.f ? -1 : e.f < t.f ? 1 : 0;
            }),
                (a = O[0].f),
                O.sort(function (e, t) {
                    return e.c > t.c ? 1 : e.c < t.c ? -1 : 0;
                }),
                (r = O[0].c),
                a > r)
        )
            return -1;
        if (o) return t >= a + 6 * P && r - 3 * P > t ? t : Math.min(a + 10 * P, Math.max(r - 3 * P, a + 0.5 * (r - a)));
        var S = Math.max(a, Math.min(Math.max(a + 10 * P, i.y), r - 3 * P));
        if (!o && S > a + 10 * P) {
            var T = S - (a + 10 * P);
            if (n) {
                var D = S >= r - 3 * P;
                D && (i.y = r - 3 * P);
                var m = SPLODER.GamePhysics.bufferA;
                return (m[0] = a + 10 * P), (m[1] = T), (m[2] = D), m;
            }
        }
        return n && (i.y = S), S;
    }),
    (SPLODER.GamePhysics._getCollisionRect = function (e, t, i, s) {
        var o, n, a, r;
        return (o = i), (n = s), (a = 1), (r = 1), i < t.x ? ((o -= 3), (a += 3)) : i > t.x && (a += 3), s < t.y ? ((n -= 3), (r += 3)) : s > t.y && (r += 3), { type: e.type, id: e.id, x: o, y: n, width: a, height: r };
    }),
    (SPLODER.GamePhysics.collisionCheck = function (e, t, i, s, o) {
        var n,
            a,
            r = t,
            h = r.y / 16,
            l = { x: Math.floor(r.x / 32), y: Math.floor(r.z / 32) },
            E = { x: r.x / 32, y: r.z / 32 },
            d = { x: r.x / 32, y: r.z / 32 },
            R = e.getItemsIntersectingRect(l.x - 2, l.y - 2, 4, 4);
        SPLODER.ShapeUtils.sortByAreaDesc(R);
        var P,
            c,
            u,
            O,
            L,
            S,
            T,
            D = [];
        for (
            c = e.getItemsUnderPoint(l.x + 0.5, l.y + 0.5, 0, R, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID),
            c && ((n = c.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (a = c.type != SPLODER.Item.TYPE_LIQUID ? c.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) : 1e3), (n > h - 1 || h + 1 > a) && (T = c)),
            S = l.y - 2;
            S <= l.y + 2;
            S++
        )
            for (L = l.x - 2; L <= l.x + 2; L++)
                (c = e.getItemsUnderPoint(L + 0.5, S + 0.5, 0, R, !1, SPLODER.Item.TYPE_FILTER_WALL_LIQUID)),
                    (n = 0),
                    (a = 256),
                    c &&
                    ((n = c.type != SPLODER.Item.TYPE_LIQUID || c.getAttrib(SPLODER.Item.PROPERTY_LIQUID_HASFLOOR) ? c.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH) : -1e3),
                        (a = c.type != SPLODER.Item.TYPE_LIQUID && c.getAttrib(SPLODER.Item.PROPERTY_CEIL) ? c.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH) : 256)),
                    (L != l.x || S != l.y) &&
                    (c && (n > h - 2 || h + 1 > a) && c != T
                        ? D.push(SPLODER.GamePhysics._getCollisionRect(c, l, L, S))
                        : ((c = e.getItemsUnderPoint(L + 0.5, S + 0.5, 0, R, !1, SPLODER.Item.TYPE_PLATFORM)),
                            c && ((n = c.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (a = n - c.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH))),
                            c && n > h + 2 && h + 2 > a
                                ? D.push(SPLODER.GamePhysics._getCollisionRect(c, l, L, S))
                                : ((c = e.getItemsUnderPoint(L + 0.5, S + 0.5, 0, R, !1, SPLODER.Item.TYPE_PANEL)),
                                    c &&
                                    ((n = c.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)),
                                        (a = c.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH)),
                                        (u = n),
                                        h + 1 > u && u + Math.max(2 * c.width, 2 * c.height) > h - 6 && D.push(SPLODER.GamePhysics._getCollisionRect(c, l, L, S))))));
        for (P = D.length; P--;) if (((c = D[P]), (O = SPLODER.Geom.resolvePenetrationCircleRect(E, 2, c, 1)), !o && O)) return !0;
        if (!o) return !1;
        var m = { x: 0 / 0, y: r.y, z: 0 / 0 };
        return Math.abs(E.x - d.x) > 1.5 || Math.abs(E.y - d.y) > 1.5 ? (console.log("POP POP!", d.x, c, E.x, i.x / 32), (m.x = i.x), (m.y = i.y), (m.z = i.z), m) : (E.x != d.x && (m.x = 32 * E.x), E.y != d.y && (m.z = 32 * E.y), m);
    }),

    (SPLODER.Simple2dGL = function () {
        var e, t, i, s, o, n, a, r;
        (this.init = function () {
            return (t = document.createElement("canvas")), (e = t.getContext("webgl")), e || (e = t.getContext("experimental-webgl")), this.resize(), h(), e.useProgram(r), E(), (i = 0), this;
        }),
            (this.updateNumLights = function (e) {
                i = e;
            });
        var h = function () {
            (o = document.getElementById("fragmentShader_shadows").innerHTML),
                (n = e.createShader(e.VERTEX_SHADER)),
                e.shaderSource(n, SPLODER.Simple2dGL.defaultVertexSrc.join("\n")),
                e.compileShader(n),
                (a = e.createShader(e.FRAGMENT_SHADER)),
                e.shaderSource(a, o),
                e.compileShader(a),
                (r = e.createProgram()),
                e.attachShader(r, n),
                e.attachShader(r, a),
                e.linkProgram(r);
        };
        this.resize = function (i, s) {
            (t.width = i || 128), (t.height = s || 128), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight);
        };
        var l = function (e, t, i, s, o) {
            var n = t,
                a = t + s,
                r = i,
                h = i + o;
            e.bufferData(e.ARRAY_BUFFER, new Float32Array([n, r, a, r, n, h, n, h, a, r, a, h]), e.STATIC_DRAW);
        },
            E = function () {
                var t = e.getAttribLocation(r, "aTextureCoord"),
                    i = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, i), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW), e.enableVertexAttribArray(t), e.vertexAttribPointer(t, 2, e.FLOAT, !1, 0, 0);
            };
        (this.render = function (o) {
            var n = e.getAttribLocation(r, "a_position"),
                a = e.createTexture();
            e.bindTexture(e.TEXTURE_2D, a),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, o);
            var h = e.getUniformLocation(r, "dimensions");
            e.uniform2f(h, t.width, t.height);
            var E = e.getUniformLocation(r, "numLights");
            e.uniform1f(E, i || 0), (s = e.createBuffer()), e.bindBuffer(e.ARRAY_BUFFER, s), e.enableVertexAttribArray(n), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0), l(e, 0, 0, o.width, o.height), e.drawArrays(e.TRIANGLES, 0, 6);
        }),
            (this.copyToDataTexture = function (i) {
                var s = t.width,
                    o = t.height,
                    n = new Uint8Array(4 * s * o),
                    a = e.createRenderbuffer();
                e.bindRenderbuffer(e.RENDERBUFFER, a), e.readPixels(0, 0, s, o, e.RGBA, e.UNSIGNED_BYTE, n), e.bindRenderbuffer(e.RENDERBUFFER, null);
                var r = i.image;
                r && ((r.width = s), (r.height = o), (r.data = n));
            });
    }),
    (SPLODER.Simple2dGL.defaultVertexSrc = [
        "attribute vec2 a_position;",
        "attribute vec2 aTextureCoord;",
        "uniform vec2 dimensions;",
        "varying vec2 vTextureCoord;",
        "void main() {",
        "vec2 zeroToOne = a_position / dimensions;",
        "vec2 zeroToTwo = zeroToOne * 2.0;",
        "vec2 clipSpace = zeroToTwo - 1.0;",
        "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
        "vTextureCoord = aTextureCoord;",
        "}",
    ]),
    (SPLODER.Simple2dGL.defaultFragmentSrc = [
        "precision highp float;",
        "uniform sampler2D uSampler;",
        "uniform vec2 dimensions;",
        "varying vec2 vTextureCoord;",
        "uniform float numLights;",
        "void main() {",
        "gl_FragColor = texture2D(uSampler, vTextureCoord);",
        "}",
    ]),

    (SPLODER.LightMap = function () {
        var e, t, i, s;
        this.init = function () {
            return (
                (e = new SPLODER.ImageMap().initWithDefaultValue(160)),
                (i = new THREE.Vector4(-16, -16, 32, 32)),
                (t = new THREE.DataTexture(null, 32, 32, THREE.RGBAFormat, THREE.UnsignedByteType)),
                (t.minFilter = t.magFilter = THREE.NearestFilter),
                this
            );
        };
        var o = function (e, t, i) {
            return Math.pow(Math.max(0, 1 - i / e), t + 1);
        },
            n = function (e) {
                var t,
                    i,
                    o,
                    n,
                    a = e.bounds.x - 1,
                    r = e.bounds.y - 1,
                    h = e.getItemsByType(SPLODER.Item.TYPE_LIGHT);
                for (s = [], t = 0; t < h.length; t++) {
                    (i = h[t]), (s[t] = { x: i.x - a, y: i.y - r, color: new THREE.Color(SPLODER.Store.LIGHT_COLOR_CHOICES[i.getAttrib(SPLODER.Item.PROPERTY_COLOR)]), power: i.getAttrib(SPLODER.Item.PROPERTY_POWER) / 255, space: 16 });
                    var l = e.getItemUnderPoint(i.x, i.y, 0, SPLODER.Item.TYPE_WALL);
                    l && ((o = l.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (n = l.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH)), (i.space = Math.max(0, n - o)));
                }
            },
            a = function (e) {
                return e--, (e |= e >> 1), (e |= e >> 2), (e |= e >> 4), (e |= e >> 8), (e |= e >> 16), ++e;
            },
            r = function (r) {
                n(r);
                var l,
                    E,
                    d = r.bounds,
                    R = a(d.width + 2),
                    P = a(d.height + 2);
                (i.x = d.x - 1), (i.y = d.y - 1), (i.z = R), (i.w = P), (t.image.width = R), (t.image.height = P), (t.image.data = E = new Uint8Array(R * P * 4));
                var c = e.canvas,
                    u = c.width,
                    O = c.height;
                console.log(R, P);
                for (var L, S, T, D, m, f, p, g = new THREE.Color(), y = new THREE.Color(), I = new THREE.Color(), w = new THREE.Color(), v = 0; O > v; v++)
                    for (var _ = 0; u > _; _++) {
                        for (L = 4 * (v * u + _), S = 4 * (v * R + _), g.setHex(0), l = 0; l < s.length; l++)
                            if (((T = s[l]), (D = T.color), (m = SPLODER.Geom.distanceBetween(T.x, T.y, _, v)), 64 > m)) {
                                I.setRGB(1, 1, 1);
                                var M = 100 / (T.power * T.power * 1e3);
                                (p = o(80, M, m) * (1 + 5 * T.power)),
                                    I.multiplyScalar(p),
                                    (f = Math.max(0, Math.min(1, h(T.x, T.y, _, v) / Math.max(16 * T.space, 1)))),
                                    w.copy(I),
                                    w.multiplyScalar(f),
                                    D.r > D.b ? y.setRGB(1, 0.7, 0.5) : D.r < D.b ? y.setRGB(0.5, 0.7, 1) : y.setRGB(1, 1, 1),
                                    w.multiply(D),
                                    w.multiply(y),
                                    g.add(w),
                                    (g.r = Math.max(0, Math.min(1, g.r))),
                                    (g.g = Math.max(0, Math.min(1, g.g))),
                                    (g.b = Math.max(0, Math.min(1, g.b)));
                            }
                        (E[S] = Math.floor(255 * g.r)), (E[S + 1] = Math.floor(255 * g.g)), (E[S + 2] = Math.floor(255 * g.b)), (E[S + 3] = e.getData(_, v, 1, 1));
                    }
                t.needsUpdate = !0;
            },
            h = function (t, i, s, o) {
                for (var n, a = SPLODER.Geom.gridPointsAlongLine(t, i, s, o), r = 128, h = 0; h < a.length; h += 2) if (((n = e.getData(a[h], a[h + 1], 1, 0)), n >= 0 && (r = Math.min(r, n)), 0 == r)) return 0;
                return r;
            };
        (this.update = function (t, i) {
            t && i && (e.updateBounds(t, 1), n(t), e.update(t, null, 1), r(t));
        }),
            Object.defineProperty(this, "texture", {
                get: function () {
                    return t;
                },
            }),
            Object.defineProperty(this, "size", {
                get: function () {
                    return i;
                },
            });
    }),

    (SPLODER.ShaderLightMap = function () {
        var e, t, i, s, o, n, a;
        this.init = function () {
            return (
                (e = new SPLODER.ImageMap().initWithDefaultValue(160)),
                (i = new THREE.Vector4(-16, -16, 32, 32)),
                (t = new THREE.DataTexture(null, 32, 32)),
                (t.minFilter = t.magFilter = THREE.NearestFilter),
                (a = new SPLODER.Simple2dGL().init()),
                (o = [0, 0, new THREE.Color(0), 100, 0, 12, new THREE.Color(16711680), 70, 12, 0, new THREE.Color(65280), 70]),
                this
            );
        };
        var r = function (e) {
            var t,
                i,
                s,
                r,
                h,
                l,
                E,
                d,
                R,
                P,
                c,
                u,
                O = e.bounds.x - 1,
                L = e.bounds.y - 1,
                S = e.getItemsByType(SPLODER.Item.TYPE_LIGHT);
            if (S) for (u = [], t = S.length; t--;) (s = S[t]), (r = SPLODER.Store.LIGHT_COLOR_CHOICES[s.getAttrib(SPLODER.Item.PROPERTY_COLOR)]), u.unshift(s.x, s.y, new THREE.Color(r), s.getAttrib(SPLODER.Item.PROPERTY_POWER));
            else u = o;
            for (a.updateNumLights(u.length / 4), n = [], t = 0; t < u.length; t += 4) {
                (h = u[t] - O + 1024), (l = u[t + 1] - L + 1024), (E = u[t + 2]), (d = u[t + 3]), (R = 16);
                var T = e.getItemUnderPoint(u[t], u[t + 1], 0, SPLODER.Item.TYPE_WALL);
                T && ((P = T.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH)), (c = T.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH)), (R = Math.max(0, c - P))),
                    (i = 3 * t),
                    (n[i] = (h >> 8) & 255),
                    (n[i + 1] = 255 & h),
                    (n[i + 2] = R),
                    (n[i + 3] = 255),
                    (n[i + 4] = (l >> 8) & 255),
                    (n[i + 5] = 255 & l),
                    (n[i + 6] = d),
                    (n[i + 7] = 255),
                    (n[i + 8] = Math.floor(255 * E.r)),
                    (n[i + 9] = Math.floor(255 * E.g)),
                    (n[i + 10] = Math.floor(255 * E.b)),
                    (n[i + 11] = 255);
            }
        },
            h = function (e) {
                return e--, (e |= e >> 1), (e |= e >> 2), (e |= e >> 4), (e |= e >> 8), (e |= e >> 16), ++e;
            },
            l = function (o) {
                s || r(o);
                var n = o.bounds,
                    l = h(n.width + 2),
                    E = h(n.height + 2);
                (i.x = n.x - 1), (i.y = n.y - 1), (i.z = l), (i.w = E), a.resize(e.canvas.width, e.canvas.height), a.render(e.canvas), a.copyToDataTexture(t), (t.needsUpdate = !0);
            };
        (this.update = function (t) {
            t && (r(t), e.update(t, n, 1), l(t));
        }),
            Object.defineProperty(this, "texture", {
                get: function () {
                    return t;
                },
            }),
            Object.defineProperty(this, "size", {
                get: function () {
                    return i;
                },
            });
    }),

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

    (SPLODER.GameCamera = function (e, t, i, s) {
        THREE.PerspectiveCamera.call(this, e, t, i, s), (this.easeFactor = 0.1);
        var o = 1;
        (this.model = null), (this.tilesize = null), (this.tilesizeHalf = null), (this.changed = new signals.Signal()), (this.completed = new signals.Signal()), (this.idle = !0), (this.strideOffset = 0);
        var n = new THREE.Camera();
        n.position.copy(this.position);
        var a = new THREE.Vector3(),
            r = this.position.clone().setZ(this.position.z - 2e3);
        a.copy(r);
        var h = new THREE.Vector3(),
            l = new THREE.Vector3(),
            E = new THREE.Vector3(),
            d = new THREE.Vector3(),
            R = this,
            P = THREE.PerspectiveCamera.prototype;
        (this.setModel = function (e, t) {
            (this.model = e), (this.tilesize = t || 32), (this.tilesizeHalf = 0.5 * this.tilesize);
        }),
            (this.setPosition = function (e, t, i) {
                isNaN(e) || (this.position.setX(e), n.position.setX(e)), isNaN(t) || (this.position.setY(t), n.position.setY(t)), isNaN(i) || (this.position.setZ(i), n.position.setZ(i));
            }),
            (this.gotoPosition = function (e, t, i) {
                isNaN(e) || n.position.setX(e), isNaN(t) || n.position.setY(t), isNaN(i) || n.position.setZ(i), n.lookAt(r);
            }),
            (this.offsetBy = function (e) {
                e instanceof THREE.Vector3 && (n.position.add(e), r.add(e)), n.lookAt(r);
            }),
            (this["goto"] = function (e, t) {
                e && (this.gotoPosition(e.x, e.y, e.z), n.lookAt(r), isNaN(t) || n.translateZ(t));
            }),
            (this.translateTo = function (e, t, i) {
                var s = new THREE.Vector3(e - n.position.x, t - n.position.y, i - n.position.z);
                isNaN(s.x) && (s.x = 0), isNaN(s.y) && (s.y = 0), isNaN(s.y) && (s.z = 0), n.position.add(s), r.add(s), n.lookAt(r);
            }),
            (this.setTarget = function (e, t, i) {
                isNaN(e) || r.setX(e), isNaN(t) || r.setY(t), isNaN(i) || r.setZ(i), n.lookAt(r);
            }),
            (this.lookAt = function (e) {
                (r = e.clone()), n.lookAt(r);
            }),
            (this.level = function () {
                (r.y = n.position.y), n.lookAt(r);
            }),
            (this.setZoom = function (e) {
                n.zoom = e;
            }),
            (this.translateX = function (e) {
                n.translateX(e);
            }),
            (this.translateY = function (e) {
                n.translateY(e);
            }),
            (this.translateZ = function (e) {
                n.translateZ(e);
            }),
            (this.getEyeLevel = function (e) {
                var t = this.orbitMode || this.flyMode,
                    i = n.position.y;
                return SPLODER.Physics.elevationCheck(this.model, i, e, 0, t, !1);
            }),
            (this.update = function () {
                E.copy(this.position).sub(n.position), d.copy(r).sub(a);
                var e = E.lengthSq(),
                    t = d.lengthSq();
                if (e > o || t > o) {
                    this.idle = !1;
                    var i = this.easeFactor,
                        s = 2 * this.easeFactor;
                    this.position.lerp(n.position, i),
                        a.lerp(r, s),
                        P.lookAt.call(this, a),
                        (this.position.y += this.strideOffset),
                        (this.position.y = Math.max(-1e3, Math.min(2048, this.position.y))),
                        h.copy(this.position),
                        l.copy(a),
                        this.changed.dispatch(h, l);
                } else this.idle || (h.copy(this.position), l.copy(a), (this.idle = !0), this.completed.dispatch(h, l));
            }),
            Object.defineProperty(this, "destination", {
                get: function () {
                    return n.position.clone();
                },
            }),
            Object.defineProperty(this, "targetDestination", {
                get: function () {
                    return r.clone();
                },
            }),
            Object.defineProperty(this, "source", {
                get: function () {
                    return R.position.clone();
                },
            }),
            Object.defineProperty(this, "target", {
                get: function () {
                    return r.clone();
                },
            }),
            (this.alignMaskObject = function (e, t) {
                (t = t || -32), e.position.copy(a), (e.position.y = this.position.y), e.lookAt(this.position), e.position.copy(this.position), e.translateZ(t);
            });
    }),
    (SPLODER.GameCamera.prototype = Object.create(THREE.PerspectiveCamera.prototype)),
    (SPLODER.GameCamera.prototype.constructor = SPLODER.GameCamera),

    (SPLODER.GameCameraControls = function () {
        (this.camera = null),
            (this.model = null),
            (this.sceneModel = null),
            (this.domElement = null),
            (this.target = null),
            (this.quat = null),
            (this.enabled = !1),
            (this.movementSpeed = 0.5),
            (this.shiftKey = !1),
            (this.activeLook = !1),
            (this.verticalMin = 0),
            (this.verticalMax = Math.PI),
            (this.startMouseX = 0),
            (this.startMouseY = 0),
            (this.mouseX = 0),
            (this.mouseY = 0),
            (this.touchMoving = !1),
            (this.touchMoveStartX = 0),
            (this.touchMoveStartY = 0),
            (this.touchMoveX = 0),
            (this.touchMoveY = 0),
            (this.numTouches = 0),
            (this.startLat = 0),
            (this.startLon = 270),
            (this.lat = 0),
            (this.lon = 270),
            (this.phi = 1.82),
            (this.theta = -1.57),
            (this.moveForward = !1),
            (this.moveBackward = !1),
            (this.turnLeft = !1),
            (this.turnRight = !1),
            (this.strafeLeft = !1),
            (this.strafeRight = !1),
            (this.jump = !1),
            (this.jumping = !1),
            (this.lastJump = 0),
            (this.falling = !1),
            (this.fallVelocity = new THREE.Vector3(0, 0, 0)),
            (this.floating = !1),
            (this.viewHalfX = 0),
            (this.viewHalfY = 0),
            (this.canLockPointer = !1),
            (this.pointerLocked = !1),
            (this.prevPos = { x: 0, y: 0, z: 0 });
        var e = this;
        this.init = function (e, o, n, a) {
            (this.camera = e), (this.model = o), (this.sceneModel = n), (this.domElement = void 0 !== a ? a : document), this.domElement !== document && this.domElement.setAttribute("tabindex", "-1");
            var r = this.camera.position;
            return (
                (this.target = new THREE.Object3D()),
                (this.target.position.x = r.x),
                (this.target.position.y = r.y),
                (this.target.position.z = r.z - 2e3),
                (this.quat = new THREE.Quaternion().setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0))),
                (this.enabled = !0),
                t(),
                i(),
                s(),
                this
            );
        };
        var t = function () {
            e.domElement.addEventListener(
                "contextmenu",
                function (e) {
                    e.preventDefault();
                },
                !1
            ),
                e.domElement.addEventListener("mousedown", SPLODER.bind(e, e.onMouseDown), !1),
                e.domElement.addEventListener("mousemove", SPLODER.bind(e, e.onMouseMove), !1),
                e.domElement.addEventListener("mouseup", SPLODER.bind(e, e.onMouseUp), !1),
                e.domElement.addEventListener("mouseout", SPLODER.bind(e, e.onMouseUp), !1),
                e.domElement.addEventListener("touchstart", SPLODER.bind(e, e.onTouchStart), !1),
                e.domElement.addEventListener("touchmove", SPLODER.bind(e, e.onTouchMove), !1),
                e.domElement.addEventListener("touchend", SPLODER.bind(e, e.onTouchEnd), !1),
                document.addEventListener("pointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                document.addEventListener("mozpointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                document.addEventListener("webkitpointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                e.handleResize();
        },
            i = function () {
                Mousetrap.bind(
                    ["w", "a", "s", "d", "up", "down", "left", "right", "shift+w", "shift+a", "shift+s", "shift+d", "shift+up", "shift+down", "shift+left", "shift+right"],
                    function (t) {
                        if (t && e.enabled !== !1)
                            switch ((t.preventDefault(), (e.shiftKey = t.shiftKey), t.keyCode)) {
                                case 38:
                                case 87:
                                    e.moveForward = !0;
                                    break;
                                case 37:
                                case 65:
                                    t.shiftKey || e.pointerLocked ? (e.strafeLeft = !0) : (e.turnLeft = !0);
                                    break;
                                case 40:
                                case 83:
                                    e.moveBackward = !0;
                                    break;
                                case 39:
                                case 68:
                                    t.shiftKey || e.pointerLocked ? (e.strafeRight = !0) : (e.turnRight = !0);
                            }
                    },
                    "keydown"
                ),
                    Mousetrap.bind(
                        ["w", "a", "s", "d", "up", "down", "left", "right", "shift+w", "shift+a", "shift+s", "shift+d", "shift+up", "shift+down", "shift+left", "shift+right"],
                        function (t) {
                            if (e.enabled !== !1)
                                switch (t.keyCode) {
                                    case 38:
                                    case 87:
                                        e.moveForward = !1;
                                        break;
                                    case 37:
                                    case 65:
                                        e.turnLeft = e.strafeLeft = !1;
                                        break;
                                    case 40:
                                    case 83:
                                        e.moveBackward = !1;
                                        break;
                                    case 39:
                                    case 68:
                                        e.turnRight = e.strafeRight = !1;
                                }
                        },
                        "keyup"
                    ),
                    Mousetrap.bind(
                        ["space", "shift+space"],
                        function () {
                            e.enabled !== !1 && !e.jumping && !e.falling && Date.now() - e.lastJump > 1e3 && ((e.jump = !0), (e.lastJump = Date.now()));
                        },
                        "keydown"
                    ),
                    Mousetrap.bind(
                        "shift",
                        function () {
                            e.shiftKey = !0;
                        },
                        "keydown"
                    ),
                    Mousetrap.bind(
                        "shift",
                        function () {
                            e.shiftKey = !1;
                        },
                        "keyup"
                    );
            },
            s = function () {
                e.canLockPointer = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
            },
            o = function () {
                if (e.canLockPointer) {
                    var t = e.domElement;
                    e.pointerLocked || ((t.requestPointerLock = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock), t.requestPointerLock());
                }
            };
        (this.handleResize = function () {
            this.domElement === document ? ((this.viewHalfX = window.innerWidth / 2), (this.viewHalfY = window.innerHeight / 2)) : ((this.viewHalfX = this.domElement.offsetWidth / 2), (this.viewHalfY = this.domElement.offsetHeight / 2));
        }),
            (this.onMouseDown = function (e) {
                this.enabled !== !1 &&
                    (this.domElement !== document && (this.domElement.focus(), this.pointerLocked || o()),
                        (this.startMouseX = e.clientX),
                        (this.startMouseY = e.clientY),
                        (this.startLon = this.lon),
                        (this.startLat = this.lat),
                        (this.activeLook = !0));
            }),
            (this.onMouseUp = function (e) {
                this.enabled !== !1 && (e && (e.preventDefault(), e.stopPropagation()), (this.activeLook = !1));
            }),
            (this.onMouseMove = function (e) {
                if (this.enabled !== !1)
                    if (this.pointerLocked) {
                        var t = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                            i = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
                        (this.mouseX += 0.75 * t), (this.mouseY += 2 * i);
                    } else this.domElement === document ? ((this.mouseX = e.pageX), (this.mouseY = e.pageY)) : ((this.mouseX = e.clientX), (this.mouseY = e.clientY));
            }),
            (this.onPointerChange = function () {
                (this.pointerLocked = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || !1), console.log("pointer lock", this.pointerLocked);
            }),
            (this.onTouchStart = function (e) {
                this.numTouches = e.touches.length;
                for (var t = 0; t < e.touches.length; t++)
                    e.touches[t].clientX < this.viewHalfX
                        ? this.touchMoving ||
                        ((this.touchMoveStartX = e.clientX = e.touches[this.numTouches - 1].clientX),
                            (this.touchMoveStartY = e.clientY = e.touches[this.numTouches - 1].clientY),
                            (this.touchMoveX = this.touchMoveY = 0),
                            (this.touchMoving = !0))
                        : this.activeLook ||
                        ((this.startMouseX = this.mouseX = e.clientX = e.touches[this.numTouches - 1].clientX), (this.startMouseY = this.mouseY = e.clientY = e.touches[this.numTouches - 1].clientY), (this.activeLook = !0));
                (this.startLon = this.lon), (this.startLat = this.lat);
            }),
            (this.onTouchMove = function (e) {
                if (e.touches) {
                    if (e.touches.length < this.numTouches) return;
                    for (var t = 0; t < e.touches.length; t++)
                        e.touches[t].clientX < this.viewHalfX
                            ? ((this.touchMoveX = e.touches[t].clientX - this.touchMoveStartX),
                                (this.touchMoveY = e.touches[t].clientY - this.touchMoveStartY),
                                (this.moveForward = this.moveBackward = this.turnLeft = this.turnRight = !1),
                                this.touchMoveX > 36 ? (this.turnRight = !0) : this.touchMoveX < -36 && (this.turnLeft = !0),
                                this.touchMoveY < -10 ? (this.moveForward = !0) : this.touchMoveY > 10 && (this.moveBackward = !0))
                            : ((this.mouseX = e.touches[t].clientX), (this.mouseY = e.touches[t].clientY));
                }
                e.preventDefault();
            }),
            (this.onTouchEnd = function (e) {
                (this.touchMoving = this.activeLook = !1), (this.activeLook = !1);
                for (var t = 0; t < e.touches.length; t++) e.touches[t].clientX < this.viewHalfX ? (this.touchMoving = !0) : (this.activeLook = !0);
                this.touchMoving || ((this.moveForward = this.moveBackward = this.turnLeft = this.turnRight = !1), (this.touchMoveStartX = this.touchMoveStartY = 0 / 0), (this.touchMoveX = this.touchMoveY = 0 / 0)),
                    (this.numTouches = e.touches.length);
            }),
            (this.scroll = function (e, t) {
                if (this.enabled !== !1) {
                    (e = Math.max(-6, Math.min(6, e))), (t = Math.max(-6, Math.min(6, t)));
                    var i = this.camera.position.y;
                    this.shiftKey || this.pointerLocked || this.numTouches > 1
                        ? (this.camera.translateX(0 - e), this.camera.translateZ(0 - 0.4 * t))
                        : (this.target.lookAt(this.camera.position), this.target.translateX(0 - 16 * e), this.camera.translateZ(0 - 0.4 * t), this.updateRotations(), this.updateTarget()),
                        this.shiftKey || this.numTouches > 1 || (this.camera.position.y = i),
                        this.collisionCheck();
                }
            }),
            (this.collisionCheck = function () {
                ((this.jumping && this.fallVelocity.y > 0) || this.falling) && (this.camera.offsetBy(this.fallVelocity), (this.fallVelocity.y -= 3), (this.fallVelocity.y = Math.max(this.fallVelocity.y, -32)));
                var e = this.camera.destination;
                this.floating = SPLODER.GamePhysics.gravityStateCheck(this.model, e, !0);
                var t = SPLODER.GamePhysics.elevationCheck(this.model, e.y, e, 1, this.floating, !0);
                !this.floating && t instanceof Array ? t[1] > 4 && (this.falling = !0) : (this.falling = !1), (e = SPLODER.GamePhysics.collisionCheck(this.model, e, this.prevPos, this.floating, !0)), this.camera["goto"](e);
            }),
            (this.update = function (t, i) {
                if ((this.shiftKey || this.pointerLocked || (this.strafeRight && ((this.turnRight = !0), (this.strafeRight = !1)), this.strafeLeft && ((this.turnLeft = !0), (this.strafeLeft = !1))), this.enabled !== !1)) {
                    (this.prevPos.x = this.camera.destination.x), (this.prevPos.y = this.camera.destination.y), (this.prevPos.z = this.camera.destination.z), (t = Math.min(0.01, t));
                    var s = t * this.movementSpeed,
                        o = s;
                    (this.shiftKey || Math.abs(this.touchMoveY) > 46) && (o *= 2), this.floating && ((s *= 0.5), (o *= 0.5));
                    var n = this.camera.position.y;
                    if (!this.jumping)
                        if ((this.moveForward && this.camera.translateZ(0 - o), this.moveBackward && this.camera.translateZ(o), this.shiftKey || this.pointerLocked || this.numTouches > 1))
                            this.strafeLeft && this.camera.translateX(0 - 2 * s), this.strafeRight && this.camera.translateX(2 * s);
                        else if (this.turnLeft || this.turnRight) {
                            this.updateTarget(), this.target.lookAt(this.camera.position);
                            var a = 70 * s * (1 - this.camera.easeFactor);
                            this.target.translateX(this.turnLeft ? 0 - a : a), this.updateRotations(), this.updateTarget();
                        }
                    if (
                        ((this.activeLook || this.pointerLocked) &&
                            ((this.lon = ((this.mouseX - this.startMouseX) / this.viewHalfX) * 180),
                                (this.lon += this.startLon),
                                (this.lat = 85 * (0 - (this.mouseY - this.startMouseY) / this.viewHalfY)),
                                (this.lat += this.startLat),
                                (this.lat = Math.max(-85, Math.min(85, this.lat))),
                                (this.phi = THREE.Math.degToRad(90 - this.lat)),
                                (this.theta = THREE.Math.degToRad(this.lon)),
                                (this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax))),
                            !this.jump || this.jumping || this.falling || this.floating == SPLODER.GamePhysics.GRAVITY_SWIM)
                    )
                        this.falling
                            ? (this.updateTarget(), (i = !0))
                            : this.floating
                                ? (this.updateTarget(), (this.camera.strideOffset = 2 * Math.sin(Date.now() / 250) - 2), (this.camera.position.y += 0.1), (i = !0))
                                : (this.jumping || this.turnLeft || this.turnRight || this.strafeLeft || this.strafeRight || this.moveForward || this.moveBackward || this.activeLook || this.pointerLocked || this.touchMoving) &&
                                (this.jumping || this.falling || (this.camera.position.y = n),
                                    (this.strafeLeft || this.strafeRight || this.moveForward || this.moveBackward) && (this.jumping || (this.camera.strideOffset = 2 + 2 * Math.sin(Date.now() / 50))),
                                    this.updateTarget(),
                                    (i = !0));
                    else {
                        (this.jumping = this.falling = !0),
                            (this.fallVelocity.x = this.strafeLeft ? 5 : this.strafeRight ? -5 : 0),
                            (this.fallVelocity.y = this.floating ? 24 : 36),
                            (this.fallVelocity.z = this.moveBackward ? 5 : this.moveForward ? -5 : 0),
                            this.shiftKey && (this.fallVelocity.z *= 2);
                        var r = this.camera.rotation.clone();
                        Math.abs(r.z) > 1.57 && (r.y = Math.PI - r.y),
                            (r.x = r.z = 0),
                            this.fallVelocity.applyEuler(r),
                            console.log(this.fallVelocity),
                            (this.jump = !1),
                            setTimeout(function () {
                                e.jumping = !1;
                            }, 250),
                            (i = !0);
                    }
                    i && this.collisionCheck();
                }
            }),
            (this.reset = function () {
                this.camera.level();
            }),
            (this.onCameraChanged = function (e, t) {
                this.target.position.copy(t), this.updateRotations();
            }),
            (this.updateRotations = function () {
                var e = this.camera.position,
                    t = new THREE.Vector3();
                t.copy(e).sub(this.target.position),
                    t.applyQuaternion(this.quat),
                    (this.theta = Math.atan2(0 - t.z, 0 - t.x)),
                    (this.lon = THREE.Math.radToDeg(this.theta)),
                    (this.phi = Math.atan2(Math.sqrt(t.x * t.x + t.z * t.z), 0 - t.y)),
                    (this.lat = 0 - (THREE.Math.radToDeg(this.phi) - 90));
            }),
            (this.updateTarget = function () {
                var e = this.target.position,
                    t = this.camera.position;
                (this.phi -= 0.5 * Math.PI),
                    (this.phi *= 0.9),
                    (this.phi += 0.5 * Math.PI),
                    (e.x = t.x + 2e3 * Math.sin(this.phi) * Math.cos(this.theta)),
                    (e.y = t.y + 2e3 * Math.cos(this.phi)),
                    (e.z = t.z + 2e3 * Math.sin(this.phi) * Math.sin(this.theta)),
                    (this.camera.lastTargetRectId = ""),
                    this.camera.lookAt(e);
            });
    }),

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

var perimSegments,
    holeSegments,
    game = new SPLODER.Game();
document.body.onload = function () {
    console.log("DOCUMENT LOADED");
    var e = window.screen.width >= 1280 ? 1 : 0.5;
    game.initWithSize(16, e),
        game.build("game_container"),
        game.start(),
        game.dispatcher.addOnce(function (e) {
            "loadComplete" == e &&
                (console.log("GAMEMAIN: ASSETS LOAD COMPLETED!"),
                    game.model.unserialize(
                        "118,0,-51,7,28,25,[[@,75,73,@,@,@,@,@,@,@,@,20]]|216,0,21,7,28,25,[[@,75,73,@,@,46,9,@,@,@,@,20]]|215,0,21,-26,27,25,[[@,75,73,@,@,75,72,@,@,@,@,20]]|32,0,-51,-26,27,25,[[@,75,73,@,@,@,@,@,@,@,@,20]]|33,0,-50,-23,25,21,[[@,68,87]]|213,0,22,-23,25,21,[[@,68,97]]|117,0,-49,10,25,21,[[@,68,87]]|214,0,23,10,25,21,[[@,68,87]]|294,0,-23,-5,18,22,[[@,33,@,@,@,@,@,@,@,@,@,@,@,@,@,0]]|61,0,-4,-16,9,44,[[@,83,83,@,@,79,70,@,@,@,@,10,@,@,@,1]]|212,0,68,-16,9,44,[[@,83,83,@,@,10,@,@,10,10,@,@,@,@,@,1]]|140,0,-4,-15,8,42,[[@,64,103,@,@,78,@,@,@,@,@,10,3]]|253,0,5,-22,14,22,[[@,46,46,@,@,24,44,@,@,@,@,10]]|287,0,-59,32,36,8,[[@,91,91]]|211,0,48,-16,20,11,[[@,80,80,@,@,17,44,@,@,@,@,240,1]]|52,0,-24,-16,20,11,[[@,80,80,@,@,78,70,@,@,@,@,240,1]]|210,0,49,17,19,11,[[@,80,80,@,@,17,44,@,@,@,@,240,1]]|116,0,-23,17,19,11,[[@,80,80,@,@,78,71,@,@,@,@,240,1]]|209,0,48,-15,20,9,[[@,64,85,@,@,@,@,@,@,@,@,150,1]]|51,0,-24,-15,20,9,[[@,64,85,@,@,@,@,@,@,@,@,80,3]]|208,0,49,18,19,9,[[@,64,85,@,@,@,@,@,@,@,@,150,1]]|115,0,-23,18,19,9,[[@,82,103,@,@,@,@,@,@,@,@,90,3]]|276,0,-59,11,8,21,[[@,91,91]]|295,2,-21,-3,12,14,[[@,4,@,@,@,@,@,@,@,@,@,@,@,31]]|206,2,30,15,12,12,[[@,60,@,@,@,@,@,@,@,@,@,@,@,66,1,@,@,1],@,[@,@,@,@,@,@,@,@,@,@,@,@,@,60]]|114,2,-42,15,12,12,[[@,60,@,@,@,@,@,@,@,@,@,@,@,66,0,@,@,1],@,[@,@,@,@,@,@,@,@,@,@,@,@,@,60]]|257,0,-16,-22,21,6,[[@,46,46,@,@,24,44,@,@,@,@,10]]|274,0,-57,13,6,19,[[@,63,99]]|204,0,68,13,8,14,[[@,64,85,@,@,@,@,@,@,@,@,150,4]]|205,0,29,-1,14,8,[[@,79,79,@,@,@,@,@,@,@,@,10]]|121,0,-43,-1,14,8,[[@,79,79,@,@,@,@,@,@,@,@,10]]|268,0,-23,28,9,12,[[@,91,91]]|48,2,-50,-19,12,9,[[@,55,@,@,@,@,@,@,@,@,@,@,@,66,2,@,@,1],@,[@,@,@,@,@,@,@,@,@,@,@,@,@,60]]|203,0,30,-1,12,8,[[@,68,93]]|120,0,-42,-1,12,8,[[@,68,83]]|207,2,22,-18,12,8,[[@,55,@,@,@,@,@,@,@,@,@,@,@,66,0,@,@,1],@,[@,@,@,@,@,@,@,@,@,@,@,@,@,60]]|286,0,-59,40,43,2,[[@,73,73,@,@,@,@,@,@,@,@,@,@,@,@,@,1]]|202,0,68,-15,8,10,[[@,64,85,@,@,@,@,@,@,@,@,150,6]]|252,0,12,-16,5,15,[[@,34,50]]|267,0,-23,28,7,10,[[@,79,111]]|131,0,-67,1,16,4,[[@,60,79,@,@,@,@,@,@,@,@,10]]|201,0,5,1,16,4,[[@,60,79,@,@,@,@,@,@,@,@,10]]|256,0,5,-21,12,5,[[@,34,51]]|273,0,-57,32,10,6,[[@,63,99]]|249,0,-4,20,8,7,[[@,82,103]]|231,0,15,12,6,9,[[@,83,83,@,@,18,18,@,@,@,@,10,3]]|290,1,-4,8,9,6,[[@,64,@,@,@,78],@,[@,@,@,33,-7]]|110,0,-40,17,7,7,[[@,57,90,@,@,@,@,@,@,@,@,150,@,@,@,@,1]]|107,1,-49,24,7,7,[[@,75],@,[@,@,@,77,-24]]|289,0,-4,8,8,6,[[@,34]]|196,0,68,-5,8,6,[[@,64,85,@,@,@,@,@,@,@,@,150,4]]|246,0,-4,-6,8,6,[[@,34]]|198,0,68,1,8,6,[[@,64,85,@,@,@,@,@,@,@,@,150,5]]|197,0,68,7,8,6,[[@,64,85,@,@,@,@,@,@,@,@,150,6]]|298,2,-29,-1,6,8,[[@,0,@,@,@,@,@,@,@,@,@,@,@,3,2,@,@,0]]|187,1,24,-9,7,6,[[@,73,1,@,@,87,87],@,[@,78]]|293,0,5,7,5,8,[[@,83,83,@,@,79,70,@,@,@,@,10,2,@,@,1]]|45,0,-43,-26,13,3,[[@,68,83]]|217,3,-43,-26,13,3,[[@,68,@,@,@,71]]|195,0,30,7,12,3,[[@,68,93]]|271,0,-41,32,6,6,[[@,67,99]]|112,0,-42,7,12,3,[[@,68,83]]|269,0,-29,32,6,6,[[@,75,111]]|272,0,-47,32,6,6,[[@,63,99]]|270,0,-35,32,6,6,[[@,71,111]]|200,0,33,18,6,6,[[@,57,101,@,@,53,@,@,@,@,@,50,8,@,@,@,0]]|65,1,-42,-19,4,9,[[@,75],@,[@,@,@,71,16]]|230,0,16,13,5,7,[[@,71,83]]|251,0,5,-6,7,5,[[@,34,51]]|132,0,-67,5,16,2,[[@,75,75,@,@,@,@,@,@,@,@,10]]|248,0,-4,16,8,4,[[@,76,103]]|134,0,-67,-1,16,2,[[@,75,75,@,@,@,@,@,@,@,@,10]]|193,0,5,5,16,2,[[@,75,75,@,@,@,@,@,@,@,@,10]]|191,0,29,-26,13,2,[[@,68]]|12,0,-46,-9,5,5,[[@,65,81]]|264,0,-15,-21,5,5,[[@,58,79]]|9,0,-32,-20,5,5,[[@,83,83,@,@,10,@,@,10,10,@,@,@,@,@,1]]|292,0,5,8,4,6,[[@,34]]|188,0,67,-5,1,22,[[@,80,80,@,@,17,44,@,@,@,@,240,1]]|123,0,-5,-5,1,22,[[@,80,80,@,@,17,44,@,@,@,@,240,1]]|68,1,-50,-13,2,11,[[@,76,4],@,[@,78]]|234,3,18,11,2,11,[[@,60,@,@,@,5,6,7]]|105,1,-49,10,7,3,[[@,76,4],@,[@,78]]|254,3,-11,-26,9,2,[[@,42,@,@,@,5,6,7]]|192,0,5,0,16,1,[[@,75,75,@,@,@,@,@,@,@,@,10]]|130,0,-51,-1,2,8,[[@,62,79,@,@,@,@,@,@,@,@,10]]|129,0,-49,-1,2,8,[[@,64,83,@,@,@,@,@,@,@,@,10]]|183,0,21,-1,2,8,[[@,62,79,@,@,@,@,@,@,@,@,10]]|184,0,23,-1,2,8,[[@,64,83,@,@,@,@,@,@,@,@,10]]|182,0,27,-1,2,8,[[@,68,83,@,@,@,@,@,@,@,@,10]]|127,0,-47,-1,2,8,[[@,66,83,@,@,@,@,@,@,@,@,10]]|181,0,25,-1,2,8,[[@,66,83,@,@,@,@,@,@,@,@,10]]|135,0,-69,-1,2,8,[[@,75,75,@,@,@,@,@,@,@,@,10]]|125,0,-45,-1,2,8,[[@,68,83,@,@,@,@,@,@,@,@,10]]|219,3,-5,1,4,4,[[@,75,@,@,@,4,5,6]]|218,3,1,-13,4,4,[[@,75,@,@,@,4,5,6]]|220,3,1,24,4,4,[[@,93,@,@,@,4,5,6]]|263,0,-10,-21,3,5,[[@,54,79]]|260,0,-4,-21,3,5,[[@,46,67]]|261,0,-7,-21,3,5,[[@,50,71]]|259,0,-1,-21,3,5,[[@,42,63]]|258,0,2,-21,3,5,[[@,38,59]]|180,0,21,13,2,7,[[@,71,83,@,@,@,@,@,@,@,@,@,3]]|103,0,-51,13,2,7,[[@,71,83]]|179,0,30,-2,12,1,[[@,68,93]]|47,0,-42,-2,12,1,[[@,68,83]]|171,0,21,-22,1,12,[[@,71,83]]|242,3,-9,-17,6,2,[[@,56,@,@,@,49]]|178,0,42,20,2,5,[[@,66,100,@,@,@,@,@,@,@,@,@,@,@,@,0]]|111,0,-30,20,2,5,[[@,66,100,@,@,@,@,@,@,@,@,@,@,@,@,0]]|241,3,-5,6,2,5,[[@,69,@,@,@,48]]|175,1,70,20,4,2,[[@,86,2,@,@,59,53],@,[@,78]]|173,1,70,-12,4,2,[[@,86,2,@,@,59,53],@,[@,78]]|176,1,70,-3,4,2,[[@,86,2,@,@,59,53],@,[@,78]]|174,1,70,3,4,2,[[@,86,2,@,@,59,53],@,[@,78]]|177,1,70,9,4,2,[[@,86,2,@,@,59,53],@,[@,78]]|170,0,47,-14,1,7,[[@,66,83]]|172,0,48,19,1,7,[[@,66,83]]|44,0,-25,-14,1,7,[[@,66,83]]|46,0,-51,-19,1,6,[[@,71,83]]|104,0,-22,27,6,1,[[@,82,96]]|229,3,-51,-19,1,6,[[@,71,@,@,@,71]]|227,3,21,-16,1,6,[[@,71,@,@,@,71]]|228,3,21,-22,1,6,[[@,71,@,@,@,71]]|281,0,-39,38,2,2,[[@,83,95]]|282,0,-33,38,2,2,[[@,87,99]]|291,0,-5,9,1,4,[[@,34,51,@,@,@,@,@,@,@,@,10]]|283,0,-27,38,2,2,[[@,91,103]]|262,0,-15,-16,4,1,[[@,60,81,@,@,@,@,@,@,@,@,10]]|167,0,75,16,1,4,[[@,76,82,@,@,@,@,@,@,@,@,@,@,@,@,0],@,[@,80]]|279,0,-51,38,2,2,[[@,75,87]]|168,0,34,-12,2,2,[[@,82,82,@,@,@,45,@,@,@,@,@,@,@,@,1],@,[@,80]]|185,0,4,1,1,4,[[@,62,76,@,@,@,@,@,@,@,@,10]]|169,0,29,1,1,4,[[@,68,79,@,@,@,@,@,@,@,@,10]]|250,0,4,9,1,4,[[@,34,76,@,@,@,@,@,@,@,@,10]]|280,0,-57,38,2,2,[[@,75,87]]|285,0,19,-2,2,2,[[@,75,75,@,@,@,@,@,@,@,@,10]]|277,0,-45,38,2,2,[[@,79,91]]|288,0,-21,38,2,2,[[@,95,107]]|124,0,-43,1,1,4,[[@,68,79,@,@,@,@,@,@,@,@,10]]|296,0,4,-5,1,4,[[@,34,76,@,@,@,@,@,@,@,@,10]]|10,0,-33,-10,2,2,[[@,82,82,@,@,@,@,@,@,@,@,@,@,@,@,1],@,[@,80]]|59,0,-9,-15,3,1,[[@,72,72]]|97,0,-8,26,3,1,[[@,72,72]]|157,0,58,18,3,1,[[@,72,72]]|102,0,-8,18,3,1,[[@,72,72]]|60,0,-15,-7,3,1,[[@,72,72]]|98,0,-20,18,3,1,[[@,72,72]]|161,0,64,26,3,1,[[@,72,72]]|163,0,63,-7,3,1,[[@,72,72]]|109,0,-43,24,1,3,[[@,83,83,@,@,10,@,@,10,10,@,@,@,@,@,1]]|57,0,-9,-7,3,1,[[@,72,72]]|101,0,-14,18,3,1,[[@,72,72]]|165,0,52,26,3,1,[[@,72,72]]|100,0,-14,26,3,1,[[@,72,72]]|53,0,-21,-7,3,1,[[@,72,72]]|156,0,58,26,3,1,[[@,72,72]]|158,0,29,24,1,3,[[@,83,83,@,@,10,@,@,10,10,@,@,@,@,@,1]]|159,0,51,-15,3,1,[[@,72,72]]|160,0,51,-7,3,1,[[@,72,72]]|162,0,57,-15,3,1,[[@,72,72]]|54,0,-21,-15,3,1,[[@,72,72]]|155,0,64,18,3,1,[[@,72,72]]|164,0,57,-7,3,1,[[@,72,72]]|166,0,52,18,3,1,[[@,72,72]]|266,0,-8,-22,2,1,[[@,58,66,@,@,@,@,@,@,@,@,10]]|237,0,29,-8,1,1,[[@,72,82,@,@,82,82,@,@,@,@,@,@,@,@,0],@,[@,80]]|239,0,29,-5,1,1,[[@,72,82,@,@,82,82,@,@,@,@,@,@,@,@,0],@,[@,80]]|236,0,25,-8,1,1,[[@,72,82,@,@,82,82,@,@,@,@,@,@,@,@,0],@,[@,80]]|238,0,25,-5,1,1,[[@,72,82,@,@,82,82,@,@,@,@,@,@,@,@,0],@,[@,80]]|235,4,72,7,0,0,[[@,77,@,@,@,@,35,36,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,0]]|154,4,72,-6,0,0,[[@,77,@,@,@,@,35,36,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,@,0]]|64,4,-44,-6,0,0,[[@,68]]|150,5,37,-19,0,0,[[0,68,@,@,@,1,100,30,100,252,100,178,7,@,@],@,@,[],@,@,@,@,@,@,[],[]]|62,5,-13,-11,0,0,[[-180,64,@,@,@,2,181,@,127,@,183,163,201,55,56,@,@,75,57,56,60,71],[],[@,@,@,43,16],[],@,@,@,@,@,@,@,[]]|63,5,-36,-18,0,0,[[0,68,@,@,@,@,100,@,100,@,100,178,216,69,50],@,@,[],@,@,@,@,@,@,[],[]]|153,5,60,22,0,0,[[-90,64,@,@,@,3,181,@,127,@,183,163,201,@,@,@,@,75,57,56,60,71],[],[@,@,@,-30,-17],[],@,@,@,@,@,@,@,[]]|95,5,-12,22,0,0,[[-270,64,@,@,@,2,181,@,127,@,183,163,201,55,56,@,@,75,57,56,60,71],[],[@,@,@,42,-17],[],@,@,@,@,@,@,@,[]]|151,5,59,-11,0,0,[[-90,64,@,@,@,3,181,@,127,@,183,163,201,@,@,@,@,75,57,56,60,71],[],[@,@,@,-29,16],[],@,@,@,@,@,@,@,[]]|152,5,35,27,0,0,[[-180,68,@,@,@,@,100,@,100,@,100,178,216,69,49],@,@,[],@,@,@,@,@,@,[],[]]|94,5,-35,15,0,0,[[-180,68,@,@,@,@,100,@,100,@,100,178,216,69,51],@,@,[],@,@,@,@,@,@,[],[]]|91,6,-45,-17,0,0,[[@,@,@,@,@,@,@,@,@,@,@,35,3]]|226,6,10,18,0,0,[[]]|222,6,-3,3,0,0,[[@,@,@,@,@,@,@,@,@,@,@,@,2]]|148,6,29,-15,0,0,[[@,@,@,@,@,@,@,@,@,@,@,35,0]]|225,6,10,-25,0,0,[[]]|221,6,2,25,0,0,[[@,@,@,@,@,@,@,@,@,@,@,@,2]]|265,6,-7,-20,0,0,[[@,@,@,@,@,@,@,@,@,@,@,15,7]]|297,6,-14,5,0,0,[[@,@,@,@,@,@,@,@,@,@,@,75]]|147,6,32,35,0,0,[[@,@,@,@,@,@,@,@,@,@,@,55,7]]|223,6,3,-11,0,0,[[@,@,@,@,@,@,@,@,@,@,@,15,2]]|232,6,18,16,0,0,[[@,@,@,@,@,@,@,@,@,@,@,40,3]]|149,6,36,20,0,0,[[@,@,@,@,@,@,@,@,@,@,@,30,8]]|88,6,-36,16,0,0,[[@,@,@,@,@,@,@,@,@,@,@,55,7]]|92,6,-40,35,0,0,[[@,@,@,@,@,@,@,@,@,@,@,55,7]]~"
                    ));
        });
};
