/* SPLODER.ImageMap - Canvas-based image/light data map */
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
