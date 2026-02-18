/* $$ and $$$ DOM selector shortcuts */
var $$ = function () {
    return document.querySelector.apply(document, arguments);
},
    $$$ = function () {
        return document.querySelectorAll.apply(document, arguments);
