module.exports = function (window) {
    "use strict";

    var itagCore = require('itags.core')(window),
        itagName = 'i-parcel', // <-- define your own itag-name here
        microtemplate = require('micro-template').template,
        DOCUMENT = window.document,
        Itag;

    if (!window.ITAGS[itagName]) {
        Itag = DOCUMENT.defineItag(itagName, {
            init: function() {
                var element = this,
                    designNode = element.getItagContainer(),
                    template = designNode.getHTML();
                // when initializing: make sure NOT to overrule model-properties that already
                // might have been defined when modeldata was boundend. Therefore, use `defineWhenUndefined`
                // element.defineWhenUndefined('someprop', somevalue); // sets element.model.someprop = somevalue; when not defined yet
                //
                // we MUST avoid circular reference: we cannot accept `template` as a property-field --> we remove those.
                // Also, because < and > are escaped by text-nodes: we need to unescape them:
                template = template.replaceAll('template', '')
                                   .replaceAll('&lt;', '<')
                                   .replaceAll('&gt;', '>');
console.warn(template);
                element.defineWhenUndefined('template', template);
            },
            sync: function() {
                var element = this,
                    model = element.model;
                element.setHTML(microtemplate(model.template, model));
            }
        });
        itagCore.setContentVisibility(Itag, true);
        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};