/* SPLODER.ShaderLightMap - GPU-accelerated shader light map */
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
