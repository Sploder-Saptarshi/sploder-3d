/* SPLODER.BipedPoses - Biped animation and pose system */
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
