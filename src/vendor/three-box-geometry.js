/* Custom THREE.BoxGeometry with flip and taper parameters */
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
