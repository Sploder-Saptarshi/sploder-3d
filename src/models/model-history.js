/* SPLODER.ModelHistory - Undo/redo history, clipboard, import/export */
    (SPLODER.ModelHistory = function () {
        var e = null,
            t = null,
            i = null,
            s = null,
            o = null,
            n = { data: "", modelId: 0 };
        (this.changed = new signals.Signal()),
            Object.defineProperty(this, "clipboardModelId", {
                get: function () {
                    return n.modelId;
                },
            }),
            Object.defineProperty(this, "hasUndos", {
                get: function () {
                    return t && t.length > 0;
                },
            }),
            Object.defineProperty(this, "hasRedos", {
                get: function () {
                    return i && i.length > 0;
                },
            }),
            (this.init = function () {
                return (
                    (e = []),
                    (t = []),
                    (s = []),
                    (i = []),
                    (o = []),
                    localStorage && localStorage.getItem("com.sploder.3deditor.history")
                        ? this.importHistory(localStorage.getItem("com.sploder.3deditor.history"))
                        : this["import"](
                            "==527,0,-18,-18,36,36,[[@,80]]|509,0,-16,-16,32,32,[[@,64,84,@,@,@,@,@,@,@,@,50,7]]|510,0,-7,-6,14,12,[[@,55],[@,68]]|526,2,-7,-6,14,12,[[@,60]]|532,0,-3,-6,6,9,[[@,63]]|521,0,-7,6,14,2,[[@,63]]|518,0,-7,-10,14,2,[[@,66]]|520,0,-7,8,14,2,[[@,66]]|524,0,-7,-8,14,2,[[@,63]]|517,0,9,-6,2,12,[[@,66]]|522,0,7,-6,2,12,[[@,63]]|523,0,-9,-6,2,12,[[@,63]]|519,0,-11,-6,2,12,[[@,66]]|514,0,7,-10,4,4,[[@,84]]|515,0,-11,6,4,4,[[@,84]]|516,0,7,6,4,4,[[@,84]]|511,0,-11,-10,4,4,[[@,84]]|512,5,13,0,0,0,[[@,72,@,@,@,34,35,36]]|513,6,0,0,0,0,[[@,64]]~==1,1,-46,-2,12,4,0,1,2,0,1,0,0,0,0,0|2,2,-28,-2,12,4,0,2,5,4,0,1,1,1,3,6,1,3,2|3,3,8,-4,12,4,0,1,11,0,1,0,2,2|6,3,0,9,12,4,0,0,3,0,0|4,4,-16,9,10,4,0,1,6,0,1,0,0,5,0,3,3|5,5,-7,-4,8,4,0,1,3,0,1,0,1,12,0,1,3|11,6,4,2,4,4,0,1,5,1,1,,,3~"
                        ),
                    this
                );
            }),
            (this.registerModel = function (t) {
                t.bookmarked.add(this.handleBookmark, this), (e[t.id] = t);
            }),
            (this.getModelById = function (t) {
                return e[t];
            }),
            (this.copyToClipboard = function () {
                for (var t, i = e.length; i--;) if (((t = e[i]), t && "hasSelection" in t && t.hasSelection())) return (n = t.copySelectionAsClipboard()), this.changed.dispatch(n.modelId), !0;
                return !1;
            }),
            (this.pasteFromClipboard = function (e) {
                if (n.modelId && n.data) {
                    var t = this.getModelById(n.modelId);
                    if (t) {
                        var i = t.pasteSelectionFromClipboard(n);exportHistory
                        if (i && e) {
                            var s = n.bounds.x + 0.5 * n.bounds.width,
                                o = n.bounds.y + 0.5 * n.bounds.height,
                                a = Math.floor(e.x - s),
                                r = Math.floor(e.y - o);
                            i.forEach(function (e) {
                                (e.x += a), (e.y += r);
                            });
                        }
                        return !0;
                    }
                }
                return !1;
            }),
            (this.handleBookmark = function (e) {
                this.saveUndo(e);
            }),
            (this.saveUndo = function (n) {
                var a = e[n];
                if (a) {
                    var r = a.serialize();
                    if (t.length && t[0] == r) return;
                    t.unshift(r), s.unshift(n), t.length > 24 && (t.pop(), s.pop()), (i = []), (o = []), this.changed.dispatch(n), localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                }
            }),
            (this.saveAll = function () {
                for (var t = 0; t < e.length; t++) this.saveUndo(t);
                console.log("SAVED ALL MODELS");
            }),
            (this.restoreUndo = function () {
                if (t.length && s.length) {
                    var n,
                        a = s[0],
                        r = e[a];
                    if (r) {
                        var h = r.serialize();
                        t[0] == h && (t.shift(), s.shift()),
                            t.length && s.length && (i.unshift(h), o.unshift(a), (n = t.shift()), (a = s.shift()), (r = e[a]), r && (r.restoreUndo(n), this.changed.dispatch(a))),
                            localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                    }
                }
            }),
            (this.redo = function () {
                if (i.length) {
                    var n = i.shift(),
                        a = o.shift(),
                        r = e[a];
                    if (r) {
                        var h = r.serialize();
                        t.unshift(h), s.unshift(a), r.redo(n), this.changed.dispatch(a), localStorage && localStorage.setItem("com.sploder.3deditor.history", this.exportHistory());
                    }
                }
            }),
            (this.restoreModelFromString = function (t, i) {
                var s = e[i];
                s && s.redo(t);
            }),
            (this["export"] = function () {
                for (var t = "", i = 0; i < e.length; i++) e[i] && (t += e[i].serialize()), i != e.length - 1 && (t += "==");
                return (t = t.split("NaN,").join(","));
            }),
            (this["import"] = function (t) {
                for (var i = t.split("=="), s = 0; s < e.length; s++) e[s] && i[s] && (console.log(e[s]), e[s].unserialize(i[s]));
            }),
            (this.exportHistory = function () {
                return (t.join("==") + "```" + s.join("==") + "```" + i.join("==") + "```" + o.join("==")).split("NaN,").join(",");
            }),
            (this.importHistory = function (e) {
                var n = e.split("```");
                (t = n[0].split("==")), (s = n[1].split("==")), SPLODER.parseFloatArray(s), (i = n[2].split("==")), (o = n[3].split("==")), SPLODER.parseFloatArray(o);
            }),
            (this.restore = function () {
                for (var e = [], i = 0; i < t.length; i++) {
                    var o = s[i];
                    -1 == e.indexOf(o) && (e.push(o), this.restoreModelFromString(t[i], s[i]));
                }
            });
    }),
