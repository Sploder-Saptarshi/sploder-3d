/* SPLODER.GameCamera - Perspective camera with easing and targeting */
    (SPLODER.GameCamera = function (e, t, i, s) {
        THREE.PerspectiveCamera.call(this, e, t, i, s), (this.easeFactor = 0.1);
        var o = 1;
        (this.model = null), (this.tilesize = null), (this.tilesizeHalf = null), (this.changed = new signals.Signal()), (this.completed = new signals.Signal()), (this.idle = !0), (this.strideOffset = 0);
        var n = new THREE.Camera();
        n.position.copy(this.position);
        var a = new THREE.Vector3(),
            r = this.position.clone().setZ(this.position.z - 2e3);
        a.copy(r);
        var h = new THREE.Vector3(),
            l = new THREE.Vector3(),
            E = new THREE.Vector3(),
            d = new THREE.Vector3(),
            R = this,
            P = THREE.PerspectiveCamera.prototype;
        (this.setModel = function (e, t) {
            (this.model = e), (this.tilesize = t || 32), (this.tilesizeHalf = 0.5 * this.tilesize);
        }),
            (this.setPosition = function (e, t, i) {
                isNaN(e) || (this.position.setX(e), n.position.setX(e)), isNaN(t) || (this.position.setY(t), n.position.setY(t)), isNaN(i) || (this.position.setZ(i), n.position.setZ(i));
            }),
            (this.gotoPosition = function (e, t, i) {
                isNaN(e) || n.position.setX(e), isNaN(t) || n.position.setY(t), isNaN(i) || n.position.setZ(i), n.lookAt(r);
            }),
            (this.offsetBy = function (e) {
                e instanceof THREE.Vector3 && (n.position.add(e), r.add(e)), n.lookAt(r);
            }),
            (this["goto"] = function (e, t) {
                e && (this.gotoPosition(e.x, e.y, e.z), n.lookAt(r), isNaN(t) || n.translateZ(t));
            }),
            (this.translateTo = function (e, t, i) {
                var s = new THREE.Vector3(e - n.position.x, t - n.position.y, i - n.position.z);
                isNaN(s.x) && (s.x = 0), isNaN(s.y) && (s.y = 0), isNaN(s.y) && (s.z = 0), n.position.add(s), r.add(s), n.lookAt(r);
            }),
            (this.setTarget = function (e, t, i) {
                isNaN(e) || r.setX(e), isNaN(t) || r.setY(t), isNaN(i) || r.setZ(i), n.lookAt(r);
            }),
            (this.lookAt = function (e) {
                (r = e.clone()), n.lookAt(r);
            }),
            (this.level = function () {
                (r.y = n.position.y), n.lookAt(r);
            }),
            (this.setZoom = function (e) {
                n.zoom = e;
            }),
            (this.translateX = function (e) {
                n.translateX(e);
            }),
            (this.translateY = function (e) {
                n.translateY(e);
            }),
            (this.translateZ = function (e) {
                n.translateZ(e);
            }),
            (this.getEyeLevel = function (e) {
                var t = this.orbitMode || this.flyMode,
                    i = n.position.y;
                return SPLODER.Physics.elevationCheck(this.model, i, e, 0, t, !1);
            }),
            (this.update = function () {
                E.copy(this.position).sub(n.position), d.copy(r).sub(a);
                var e = E.lengthSq(),
                    t = d.lengthSq();
                if (e > o || t > o) {
                    this.idle = !1;
                    var i = this.easeFactor,
                        s = 2 * this.easeFactor;
                    this.position.lerp(n.position, i),
                        a.lerp(r, s),
                        P.lookAt.call(this, a),
                        (this.position.y += this.strideOffset),
                        (this.position.y = Math.max(-1e3, Math.min(2048, this.position.y))),
                        h.copy(this.position),
                        l.copy(a),
                        this.changed.dispatch(h, l);
                } else this.idle || (h.copy(this.position), l.copy(a), (this.idle = !0), this.completed.dispatch(h, l));
            }),
            Object.defineProperty(this, "destination", {
                get: function () {
                    return n.position.clone();
                },
            }),
            Object.defineProperty(this, "targetDestination", {
                get: function () {
                    return r.clone();
                },
            }),
            Object.defineProperty(this, "source", {
                get: function () {
                    return R.position.clone();
                },
            }),
            Object.defineProperty(this, "target", {
                get: function () {
                    return r.clone();
                },
            }),
            (this.alignMaskObject = function (e, t) {
                (t = t || -32), e.position.copy(a), (e.position.y = this.position.y), e.lookAt(this.position), e.position.copy(this.position), e.translateZ(t);
            });
    }),
    (SPLODER.GameCamera.prototype = Object.create(THREE.PerspectiveCamera.prototype)),
    (SPLODER.GameCamera.prototype.constructor = SPLODER.GameCamera),
