/* SPLODER.MeshUtils - Mesh geometry and UV utilities */
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
