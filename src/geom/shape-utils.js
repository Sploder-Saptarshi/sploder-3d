/* SPLODER.ShapeUtils - Shape building, grid filling, triangulation */
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
