/* SPLODER.Geom - 2D geometry utility functions */
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
