/* Stats.js - FPS/MS performance monitor */
var Stats = function () {
    var e = Date.now(),
        t = e,
        i = 0,
        s = 1 / 0,
        o = 0,
        n = 0,
        a = 1 / 0,
        r = 0,
        h = 0,
        l = 0,
        E = document.createElement("div");
    (E.id = "stats"),
        E.addEventListener(
            "mousedown",
            function (e) {
                e.preventDefault(), S(++l % 2);
            },
            !1
        ),
        (E.style.cssText = "width:80px;opacity:0.9;cursor:pointer");
    var d = document.createElement("div");
    (d.id = "fps"), (d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002"), E.appendChild(d);
    var R = document.createElement("div");
    (R.id = "fpsText"), (R.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"), (R.innerHTML = "FPS"), d.appendChild(R);
    var P = document.createElement("div");
    for (P.id = "fpsGraph", P.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", d.appendChild(P); 74 > P.children.length;) {
        var c = document.createElement("span");
        (c.style.cssText = "width:1px;height:30px;float:left;background-color:#113"), P.appendChild(c);
    }
    var u = document.createElement("div");
    (u.id = "ms"), (u.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"), E.appendChild(u);
    var O = document.createElement("div");
    (O.id = "msText"), (O.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"), (O.innerHTML = "MS"), u.appendChild(O);
    var L = document.createElement("div");
    for (L.id = "msGraph", L.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", u.appendChild(L); 74 > L.children.length;)
        (c = document.createElement("span")), (c.style.cssText = "width:1px;height:30px;float:left;background-color:#131"), L.appendChild(c);
    var S = function (e) {
        switch ((l = e)) {
            case 0:
                (d.style.display = "block"), (u.style.display = "none");
                break;
            case 1:
                (d.style.display = "none"), (u.style.display = "block");
        }
    };
    return {
        REVISION: 12,
        domElement: E,
        setMode: S,
        begin: function () {
            e = Date.now();
        },
        end: function () {
            var l = Date.now();
            (i = l - e), (s = Math.min(s, i)), (o = Math.max(o, i)), (O.textContent = i + " MS (" + s + "-" + o + ")");
            var E = Math.min(30, 30 - 30 * (i / 200));
            return (
                (L.appendChild(L.firstChild).style.height = E + "px"),
                h++,
                l > t + 1e3 &&
                ((n = Math.round((1e3 * h) / (l - t))),
                    (a = Math.min(a, n)),
                    (r = Math.max(r, n)),
                    (R.textContent = n + " FPS (" + a + "-" + r + ")"),
                    (E = Math.min(30, 30 - 30 * (n / 100))),
                    (P.appendChild(P.firstChild).style.height = E + "px"),
                    (t = l),
                    (h = 0)),
                l
            );
        },
        update: function () {
            e = this.end();
        },
    };
};
"object" == typeof module && (module.exports = Stats),
