/* SPLODER.GamePhysics - Raycasting, collision, elevation, gravity */
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
