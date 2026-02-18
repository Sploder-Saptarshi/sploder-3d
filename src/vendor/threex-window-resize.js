/* THREEx.WindowResize helper */
var THREEx = THREEx || {};
(THREEx.WindowResize = function (e, t) {
    var i = function () {
        e.setSize(window.innerWidth, window.innerHeight), (t.aspect = window.innerWidth / window.innerHeight), t.updateProjectionMatrix();
    };
    return (
        window.addEventListener("resize", i, !1),
        {
            stop: function () {
                window.removeEventListener("resize", i);
            },
        }
    );
}),
