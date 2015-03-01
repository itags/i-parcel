module.exports = function (window) {
    "use strict";

    var itagCore = require('itags.core')(window),
        itagName = 'i-parcel', // <-- define your own itag-name here
        DOCUMENT = window.document,
        ITSA = window.ITSA,
        Itag;

    if (!window.ITAGS[itagName]) {
        Itag = DOCUMENT.createItag(itagName, {
            init: {
                var element = this,
                    designNode = element.getItagContainer(),
                    content = designNode.getHTML();
                // when initializing: make sure NOT to overrule model-properties that already
                // might have been defined when modeldata was boundend. Therefore, use `defineWhenUndefined`
                // element.defineWhenUndefined('someprop', somevalue); // sets element.model.someprop = somevalue; when not defined yet
                element.defineWhenUndefined('content', content);
            },
            sync: function() {
                var element = this;
                element.setHTML(element.model.content);
            }
        });
        itagCore.setContentVisibility(Itag, true);
        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
