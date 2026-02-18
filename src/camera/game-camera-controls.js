/* SPLODER.GameCameraControls - First-person camera controls */
    (SPLODER.GameCameraControls = function () {
        (this.camera = null),
            (this.model = null),
            (this.sceneModel = null),
            (this.domElement = null),
            (this.target = null),
            (this.quat = null),
            (this.enabled = !1),
            (this.movementSpeed = 0.5),
            (this.shiftKey = !1),
            (this.activeLook = !1),
            (this.verticalMin = 0),
            (this.verticalMax = Math.PI),
            (this.startMouseX = 0),
            (this.startMouseY = 0),
            (this.mouseX = 0),
            (this.mouseY = 0),
            (this.touchMoving = !1),
            (this.touchMoveStartX = 0),
            (this.touchMoveStartY = 0),
            (this.touchMoveX = 0),
            (this.touchMoveY = 0),
            (this.numTouches = 0),
            (this.startLat = 0),
            (this.startLon = 270),
            (this.lat = 0),
            (this.lon = 270),
            (this.phi = 1.82),
            (this.theta = -1.57),
            (this.moveForward = !1),
            (this.moveBackward = !1),
            (this.turnLeft = !1),
            (this.turnRight = !1),
            (this.strafeLeft = !1),
            (this.strafeRight = !1),
            (this.jump = !1),
            (this.jumping = !1),
            (this.lastJump = 0),
            (this.falling = !1),
            (this.fallVelocity = new THREE.Vector3(0, 0, 0)),
            (this.floating = !1),
            (this.viewHalfX = 0),
            (this.viewHalfY = 0),
            (this.canLockPointer = !1),
            (this.pointerLocked = !1),
            (this.prevPos = { x: 0, y: 0, z: 0 });
        var e = this;
        this.init = function (e, o, n, a) {
            (this.camera = e), (this.model = o), (this.sceneModel = n), (this.domElement = void 0 !== a ? a : document), this.domElement !== document && this.domElement.setAttribute("tabindex", "-1");
            var r = this.camera.position;
            return (
                (this.target = new THREE.Object3D()),
                (this.target.position.x = r.x),
                (this.target.position.y = r.y),
                (this.target.position.z = r.z - 2e3),
                (this.quat = new THREE.Quaternion().setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0))),
                (this.enabled = !0),
                t(),
                i(),
                s(),
                this
            );
        };
        var t = function () {
            e.domElement.addEventListener(
                "contextmenu",
                function (e) {
                    e.preventDefault();
                },
                !1
            ),
                e.domElement.addEventListener("mousedown", SPLODER.bind(e, e.onMouseDown), !1),
                e.domElement.addEventListener("mousemove", SPLODER.bind(e, e.onMouseMove), !1),
                e.domElement.addEventListener("mouseup", SPLODER.bind(e, e.onMouseUp), !1),
                e.domElement.addEventListener("mouseout", SPLODER.bind(e, e.onMouseUp), !1),
                e.domElement.addEventListener("touchstart", SPLODER.bind(e, e.onTouchStart), !1),
                e.domElement.addEventListener("touchmove", SPLODER.bind(e, e.onTouchMove), !1),
                e.domElement.addEventListener("touchend", SPLODER.bind(e, e.onTouchEnd), !1),
                document.addEventListener("pointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                document.addEventListener("mozpointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                document.addEventListener("webkitpointerlockchange", SPLODER.bind(e, e.onPointerChange, !1), !1),
                e.handleResize();
        },
            i = function () {
                Mousetrap.bind(
                    ["w", "a", "s", "d", "up", "down", "left", "right", "shift+w", "shift+a", "shift+s", "shift+d", "shift+up", "shift+down", "shift+left", "shift+right"],
                    function (t) {
                        if (t && e.enabled !== !1)
                            switch ((t.preventDefault(), (e.shiftKey = t.shiftKey), t.keyCode)) {
                                case 38:
                                case 87:
                                    e.moveForward = !0;
                                    break;
                                case 37:
                                case 65:
                                    t.shiftKey || e.pointerLocked ? (e.strafeLeft = !0) : (e.turnLeft = !0);
                                    break;
                                case 40:
                                case 83:
                                    e.moveBackward = !0;
                                    break;
                                case 39:
                                case 68:
                                    t.shiftKey || e.pointerLocked ? (e.strafeRight = !0) : (e.turnRight = !0);
                            }
                    },
                    "keydown"
                ),
                    Mousetrap.bind(
                        ["w", "a", "s", "d", "up", "down", "left", "right", "shift+w", "shift+a", "shift+s", "shift+d", "shift+up", "shift+down", "shift+left", "shift+right"],
                        function (t) {
                            if (e.enabled !== !1)
                                switch (t.keyCode) {
                                    case 38:
                                    case 87:
                                        e.moveForward = !1;
                                        break;
                                    case 37:
                                    case 65:
                                        e.turnLeft = e.strafeLeft = !1;
                                        break;
                                    case 40:
                                    case 83:
                                        e.moveBackward = !1;
                                        break;
                                    case 39:
                                    case 68:
                                        e.turnRight = e.strafeRight = !1;
                                }
                        },
                        "keyup"
                    ),
                    Mousetrap.bind(
                        ["space", "shift+space"],
                        function () {
                            e.enabled !== !1 && !e.jumping && !e.falling && Date.now() - e.lastJump > 1e3 && ((e.jump = !0), (e.lastJump = Date.now()));
                        },
                        "keydown"
                    ),
                    Mousetrap.bind(
                        "shift",
                        function () {
                            e.shiftKey = !0;
                        },
                        "keydown"
                    ),
                    Mousetrap.bind(
                        "shift",
                        function () {
                            e.shiftKey = !1;
                        },
                        "keyup"
                    );
            },
            s = function () {
                e.canLockPointer = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
            },
            o = function () {
                if (e.canLockPointer) {
                    var t = e.domElement;
                    e.pointerLocked || ((t.requestPointerLock = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock), t.requestPointerLock());
                }
            };
        (this.handleResize = function () {
            this.domElement === document ? ((this.viewHalfX = window.innerWidth / 2), (this.viewHalfY = window.innerHeight / 2)) : ((this.viewHalfX = this.domElement.offsetWidth / 2), (this.viewHalfY = this.domElement.offsetHeight / 2));
        }),
            (this.onMouseDown = function (e) {
                this.enabled !== !1 &&
                    (this.domElement !== document && (this.domElement.focus(), this.pointerLocked || o()),
                        (this.startMouseX = e.clientX),
                        (this.startMouseY = e.clientY),
                        (this.startLon = this.lon),
                        (this.startLat = this.lat),
                        (this.activeLook = !0));
            }),
            (this.onMouseUp = function (e) {
                this.enabled !== !1 && (e && (e.preventDefault(), e.stopPropagation()), (this.activeLook = !1));
            }),
            (this.onMouseMove = function (e) {
                if (this.enabled !== !1)
                    if (this.pointerLocked) {
                        var t = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                            i = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
                        (this.mouseX += 0.75 * t), (this.mouseY += 2 * i);
                    } else this.domElement === document ? ((this.mouseX = e.pageX), (this.mouseY = e.pageY)) : ((this.mouseX = e.clientX), (this.mouseY = e.clientY));
            }),
            (this.onPointerChange = function () {
                (this.pointerLocked = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || !1), console.log("pointer lock", this.pointerLocked);
            }),
            (this.onTouchStart = function (e) {
                this.numTouches = e.touches.length;
                for (var t = 0; t < e.touches.length; t++)
                    e.touches[t].clientX < this.viewHalfX
                        ? this.touchMoving ||
                        ((this.touchMoveStartX = e.clientX = e.touches[this.numTouches - 1].clientX),
                            (this.touchMoveStartY = e.clientY = e.touches[this.numTouches - 1].clientY),
                            (this.touchMoveX = this.touchMoveY = 0),
                            (this.touchMoving = !0))
                        : this.activeLook ||
                        ((this.startMouseX = this.mouseX = e.clientX = e.touches[this.numTouches - 1].clientX), (this.startMouseY = this.mouseY = e.clientY = e.touches[this.numTouches - 1].clientY), (this.activeLook = !0));
                (this.startLon = this.lon), (this.startLat = this.lat);
            }),
            (this.onTouchMove = function (e) {
                if (e.touches) {
                    if (e.touches.length < this.numTouches) return;
                    for (var t = 0; t < e.touches.length; t++)
                        e.touches[t].clientX < this.viewHalfX
                            ? ((this.touchMoveX = e.touches[t].clientX - this.touchMoveStartX),
                                (this.touchMoveY = e.touches[t].clientY - this.touchMoveStartY),
                                (this.moveForward = this.moveBackward = this.turnLeft = this.turnRight = !1),
                                this.touchMoveX > 36 ? (this.turnRight = !0) : this.touchMoveX < -36 && (this.turnLeft = !0),
                                this.touchMoveY < -10 ? (this.moveForward = !0) : this.touchMoveY > 10 && (this.moveBackward = !0))
                            : ((this.mouseX = e.touches[t].clientX), (this.mouseY = e.touches[t].clientY));
                }
                e.preventDefault();
            }),
            (this.onTouchEnd = function (e) {
                (this.touchMoving = this.activeLook = !1), (this.activeLook = !1);
                for (var t = 0; t < e.touches.length; t++) e.touches[t].clientX < this.viewHalfX ? (this.touchMoving = !0) : (this.activeLook = !0);
                this.touchMoving || ((this.moveForward = this.moveBackward = this.turnLeft = this.turnRight = !1), (this.touchMoveStartX = this.touchMoveStartY = 0 / 0), (this.touchMoveX = this.touchMoveY = 0 / 0)),
                    (this.numTouches = e.touches.length);
            }),
            (this.scroll = function (e, t) {
                if (this.enabled !== !1) {
                    (e = Math.max(-6, Math.min(6, e))), (t = Math.max(-6, Math.min(6, t)));
                    var i = this.camera.position.y;
                    this.shiftKey || this.pointerLocked || this.numTouches > 1
                        ? (this.camera.translateX(0 - e), this.camera.translateZ(0 - 0.4 * t))
                        : (this.target.lookAt(this.camera.position), this.target.translateX(0 - 16 * e), this.camera.translateZ(0 - 0.4 * t), this.updateRotations(), this.updateTarget()),
                        this.shiftKey || this.numTouches > 1 || (this.camera.position.y = i),
                        this.collisionCheck();
                }
            }),
            (this.collisionCheck = function () {
                ((this.jumping && this.fallVelocity.y > 0) || this.falling) && (this.camera.offsetBy(this.fallVelocity), (this.fallVelocity.y -= 3), (this.fallVelocity.y = Math.max(this.fallVelocity.y, -32)));
                var e = this.camera.destination;
                this.floating = SPLODER.GamePhysics.gravityStateCheck(this.model, e, !0);
                var t = SPLODER.GamePhysics.elevationCheck(this.model, e.y, e, 1, this.floating, !0);
                !this.floating && t instanceof Array ? t[1] > 4 && (this.falling = !0) : (this.falling = !1), (e = SPLODER.GamePhysics.collisionCheck(this.model, e, this.prevPos, this.floating, !0)), this.camera["goto"](e);
            }),
            (this.update = function (t, i) {
                if ((this.shiftKey || this.pointerLocked || (this.strafeRight && ((this.turnRight = !0), (this.strafeRight = !1)), this.strafeLeft && ((this.turnLeft = !0), (this.strafeLeft = !1))), this.enabled !== !1)) {
                    (this.prevPos.x = this.camera.destination.x), (this.prevPos.y = this.camera.destination.y), (this.prevPos.z = this.camera.destination.z), (t = Math.min(0.01, t));
                    var s = t * this.movementSpeed,
                        o = s;
                    (this.shiftKey || Math.abs(this.touchMoveY) > 46) && (o *= 2), this.floating && ((s *= 0.5), (o *= 0.5));
                    var n = this.camera.position.y;
                    if (!this.jumping)
                        if ((this.moveForward && this.camera.translateZ(0 - o), this.moveBackward && this.camera.translateZ(o), this.shiftKey || this.pointerLocked || this.numTouches > 1))
                            this.strafeLeft && this.camera.translateX(0 - 2 * s), this.strafeRight && this.camera.translateX(2 * s);
                        else if (this.turnLeft || this.turnRight) {
                            this.updateTarget(), this.target.lookAt(this.camera.position);
                            var a = 70 * s * (1 - this.camera.easeFactor);
                            this.target.translateX(this.turnLeft ? 0 - a : a), this.updateRotations(), this.updateTarget();
                        }
                    if (
                        ((this.activeLook || this.pointerLocked) &&
                            ((this.lon = ((this.mouseX - this.startMouseX) / this.viewHalfX) * 180),
                                (this.lon += this.startLon),
                                (this.lat = 85 * (0 - (this.mouseY - this.startMouseY) / this.viewHalfY)),
                                (this.lat += this.startLat),
                                (this.lat = Math.max(-85, Math.min(85, this.lat))),
                                (this.phi = THREE.Math.degToRad(90 - this.lat)),
                                (this.theta = THREE.Math.degToRad(this.lon)),
                                (this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax))),
                            !this.jump || this.jumping || this.falling || this.floating == SPLODER.GamePhysics.GRAVITY_SWIM)
                    )
                        this.falling
                            ? (this.updateTarget(), (i = !0))
                            : this.floating
                                ? (this.updateTarget(), (this.camera.strideOffset = 2 * Math.sin(Date.now() / 250) - 2), (this.camera.position.y += 0.1), (i = !0))
                                : (this.jumping || this.turnLeft || this.turnRight || this.strafeLeft || this.strafeRight || this.moveForward || this.moveBackward || this.activeLook || this.pointerLocked || this.touchMoving) &&
                                (this.jumping || this.falling || (this.camera.position.y = n),
                                    (this.strafeLeft || this.strafeRight || this.moveForward || this.moveBackward) && (this.jumping || (this.camera.strideOffset = 2 + 2 * Math.sin(Date.now() / 50))),
                                    this.updateTarget(),
                                    (i = !0));
                    else {
                        (this.jumping = this.falling = !0),
                            (this.fallVelocity.x = this.strafeLeft ? 5 : this.strafeRight ? -5 : 0),
                            (this.fallVelocity.y = this.floating ? 24 : 36),
                            (this.fallVelocity.z = this.moveBackward ? 5 : this.moveForward ? -5 : 0),
                            this.shiftKey && (this.fallVelocity.z *= 2);
                        var r = this.camera.rotation.clone();
                        Math.abs(r.z) > 1.57 && (r.y = Math.PI - r.y),
                            (r.x = r.z = 0),
                            this.fallVelocity.applyEuler(r),
                            console.log(this.fallVelocity),
                            (this.jump = !1),
                            setTimeout(function () {
                                e.jumping = !1;
                            }, 250),
                            (i = !0);
                    }
                    i && this.collisionCheck();
                }
            }),
            (this.reset = function () {
                this.camera.level();
            }),
            (this.onCameraChanged = function (e, t) {
                this.target.position.copy(t), this.updateRotations();
            }),
            (this.updateRotations = function () {
                var e = this.camera.position,
                    t = new THREE.Vector3();
                t.copy(e).sub(this.target.position),
                    t.applyQuaternion(this.quat),
                    (this.theta = Math.atan2(0 - t.z, 0 - t.x)),
                    (this.lon = THREE.Math.radToDeg(this.theta)),
                    (this.phi = Math.atan2(Math.sqrt(t.x * t.x + t.z * t.z), 0 - t.y)),
                    (this.lat = 0 - (THREE.Math.radToDeg(this.phi) - 90));
            }),
            (this.updateTarget = function () {
                var e = this.target.position,
                    t = this.camera.position;
                (this.phi -= 0.5 * Math.PI),
                    (this.phi *= 0.9),
                    (this.phi += 0.5 * Math.PI),
                    (e.x = t.x + 2e3 * Math.sin(this.phi) * Math.cos(this.theta)),
                    (e.y = t.y + 2e3 * Math.cos(this.phi)),
                    (e.z = t.z + 2e3 * Math.sin(this.phi) * Math.sin(this.theta)),
                    (this.camera.lastTargetRectId = ""),
                    this.camera.lookAt(e);
            });
    }),
