/* Custom THREE.PlaneBufferGeometry and THREE.PlaneGeometry with flip parameter */
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
