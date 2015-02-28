module.exports = function (window) {
    "use strict";

    var itagCore = require('itags.core')(window),
        itagName = 'i-parcel', // <-- define your own itag-name here
        DOCUMENT = window.document,
        ITSA = window.ITSA,
        Itag;

    if (!window.ITAGS[itagName]) {
        Itag = DOCUMENT.createItag(itagName, null, false); // not subclassable, only pseudoclassable
        itagCore.setContentVisibility(Itag, true);
        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
