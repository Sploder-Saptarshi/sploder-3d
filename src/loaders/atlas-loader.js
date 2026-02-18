/* SPLODER.AtlasLoader - JSON atlas loader extending THREE.Loader */
    };
(SPLODER.AtlasLoader = function (e) {
    THREE.Loader.call(this, e), (this.withCredentials = !1);
}),
    (SPLODER.AtlasLoader.prototype = Object.create(THREE.Loader.prototype)),
    (SPLODER.AtlasLoader.prototype.constructor = SPLODER.AtlasLoader),
    (SPLODER.AtlasLoader.prototype.load = function (e, t, i, s, o, n) {
        var a = new XMLHttpRequest(),
            r = 0;
        (a.onreadystatechange = function () {
            if (a.readyState === a.DONE)
                if (200 === a.status || 0 === a.status) {
                    if (a.responseText) {
                        var h = JSON.parse(a.responseText),
                            l = h.metadata;
                        i && i(h, l, n);
                    } else THREE.error("SPLODER.AtlasLoader: " + t + " seems to be unreachable or the file is empty."), o && o(a.status, n);
                    e.onLoadComplete();
                } else THREE.error("SPLODER.AtlasLoader: Couldn't load " + t + " (" + a.status + ")"), o && o(a.status);
            else
                a.readyState === a.LOADING
                    ? s && (0 === r && (r = a.getResponseHeader("Content-Length")), s({ total: r, loaded: a.responseText.length, data: n }))
                    : a.readyState === a.HEADERS_RECEIVED && void 0 !== s && (r = a.getResponseHeader("Content-Length"));
        }),
            a.open("GET", t, !0),
            (a.withCredentials = this.withCredentials),
            a.send(null);
    }),
    (SPLODER.Geom = {}),
