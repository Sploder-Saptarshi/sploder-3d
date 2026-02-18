/* SPLODER.Simple2dGL - WebGL 2D renderer for lightmaps */
    (SPLODER.Simple2dGL = function () {
        var e, t, i, s, o, n, a, r;
        (this.init = function () {
            return (t = document.createElement("canvas")), (e = t.getContext("webgl")), e || (e = t.getContext("experimental-webgl")), this.resize(), h(), e.useProgram(r), E(), (i = 0), this;
        }),
            (this.updateNumLights = function (e) {
                i = e;
            });
        var h = function () {
            (o = document.getElementById("fragmentShader_shadows").innerHTML),
                (n = e.createShader(e.VERTEX_SHADER)),
                e.shaderSource(n, SPLODER.Simple2dGL.defaultVertexSrc.join("\n")),
                e.compileShader(n),
                (a = e.createShader(e.FRAGMENT_SHADER)),
                e.shaderSource(a, o),
                e.compileShader(a),
                (r = e.createProgram()),
                e.attachShader(r, n),
                e.attachShader(r, a),
                e.linkProgram(r);
        };
        this.resize = function (i, s) {
            (t.width = i || 128), (t.height = s || 128), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight);
        };
        var l = function (e, t, i, s, o) {
            var n = t,
                a = t + s,
                r = i,
                h = i + o;
            e.bufferData(e.ARRAY_BUFFER, new Float32Array([n, r, a, r, n, h, n, h, a, r, a, h]), e.STATIC_DRAW);
        },
            E = function () {
                var t = e.getAttribLocation(r, "aTextureCoord"),
                    i = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, i), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW), e.enableVertexAttribArray(t), e.vertexAttribPointer(t, 2, e.FLOAT, !1, 0, 0);
            };
        (this.render = function (o) {
            var n = e.getAttribLocation(r, "a_position"),
                a = e.createTexture();
            e.bindTexture(e.TEXTURE_2D, a),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, o);
            var h = e.getUniformLocation(r, "dimensions");
            e.uniform2f(h, t.width, t.height);
            var E = e.getUniformLocation(r, "numLights");
            e.uniform1f(E, i || 0), (s = e.createBuffer()), e.bindBuffer(e.ARRAY_BUFFER, s), e.enableVertexAttribArray(n), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0), l(e, 0, 0, o.width, o.height), e.drawArrays(e.TRIANGLES, 0, 6);
        }),
            (this.copyToDataTexture = function (i) {
                var s = t.width,
                    o = t.height,
                    n = new Uint8Array(4 * s * o),
                    a = e.createRenderbuffer();
                e.bindRenderbuffer(e.RENDERBUFFER, a), e.readPixels(0, 0, s, o, e.RGBA, e.UNSIGNED_BYTE, n), e.bindRenderbuffer(e.RENDERBUFFER, null);
                var r = i.image;
                r && ((r.width = s), (r.height = o), (r.data = n));
            });
    }),
    (SPLODER.Simple2dGL.defaultVertexSrc = [
        "attribute vec2 a_position;",
        "attribute vec2 aTextureCoord;",
        "uniform vec2 dimensions;",
        "varying vec2 vTextureCoord;",
        "void main() {",
        "vec2 zeroToOne = a_position / dimensions;",
        "vec2 zeroToTwo = zeroToOne * 2.0;",
        "vec2 clipSpace = zeroToTwo - 1.0;",
        "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
        "vTextureCoord = aTextureCoord;",
        "}",
    ]),
    (SPLODER.Simple2dGL.defaultFragmentSrc = [
        "precision highp float;",
        "uniform sampler2D uSampler;",
        "uniform vec2 dimensions;",
        "varying vec2 vTextureCoord;",
        "uniform float numLights;",
        "void main() {",
        "gl_FragColor = texture2D(uSampler, vTextureCoord);",
        "}",
    ]),
