/* SPLODER.BipedFace - Biped face mesh and emotion system */
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
