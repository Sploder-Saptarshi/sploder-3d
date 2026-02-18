/* SPLODER.BipedItem - Held item for bipeds */
    (SPLODER.BipedItem = function () {
        var e, t, i, s;
        (this.initWithRectAndMaterial = function (e, o, n) {
            return (t = e), (i = o), (s = n), this;
        }),
            (this.build = function () {
                var o,
                    n = t.getAttrib(SPLODER.Biped.PROPERTY_HEIGHT) / 255 + 0.5,
                    a = t.getAttrib(SPLODER.Biped.PROPERTY_STRENGTH) / 128,
                    r = t.getAttrib(SPLODER.Biped.PROPERTY_GENDER) / 128;
                (o = SPLODER.ShapeUtils.getGeometryFromTexture(i.uniforms.textureMap.value.image, s, 3, 8)),
                    o &&
                    ((e = new THREE.Mesh(o, i)),
                        (e.rotation.x = 1.57),
                        (e.position.z = 11 * SPLODER.weightedValue(0, a, 0.35, r, -0.25)),
                        (e.position.y = 0 - 32 * SPLODER.weightedValue(0, n, 0.5) + 4),
                        (e.userData.rect = t),
                        (i.uniforms.noOverlap.value = 1),
                        (i.uniformsNeedUpdate = !0));
            }),
            Object.defineProperty(this, "mesh", {
                get: function () {
                    return e;
                },
            });
    }),
