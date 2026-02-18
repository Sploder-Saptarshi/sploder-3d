/* PIXI RenderTexture patches */
"PIXI" in window &&
    ((PIXI.RenderTexture.prototype.renderToCanvas = function (e) {
        var t = this.renderer.gl,
            i = this.textureBuffer.width,
            s = this.textureBuffer.height,
            o = new Uint8Array(4 * i * s);
        t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer), t.readPixels(0, 0, i, s, t.RGBA, t.UNSIGNED_BYTE, o), t.bindFramebuffer(t.FRAMEBUFFER, null), e.resize(i, s);
        var n = e.context.getImageData(0, 0, i, s);
        return n.data.set(o), e.context.putImageData(n, 0, 0), e.canvas;
    }),
        (PIXI.RenderTexture.prototype.renderToDataTexture = function (e) {
            var t = this.renderer.gl,
                i = this.textureBuffer.width,
                s = this.textureBuffer.height,
                o = new Uint8Array(4 * i * s);
            t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer), t.readPixels(0, 0, i, s, t.RGBA, t.UNSIGNED_BYTE, o), t.bindFramebuffer(t.FRAMEBUFFER, null);
            var n = e.image;
            n && ((n.width = i), (n.height = s), (n.data = o));
        })),
