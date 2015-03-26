module.exports = function (window) {
    "use strict";

    require('./css/i-parcel.css');

    var itagCore = require('itags.core')(window),
        itagName = 'i-parcel', // <-- define your own itag-name here
        microtemplate = require('./lib/microtemplate.js'),
        DOCUMENT = window.document,
        Itag;

    if (!window.ITAGS[itagName]) {
        Itag = DOCUMENT.defineItag(itagName, {
            init: function() {
                var element = this,
                    designNode = element.getItagContainer(),
                    template = designNode.getHTML(null, true);
                // when initializing: make sure NOT to overrule model-properties that already
                // might have been defined when modeldata was boundend. Therefore, use `defineWhenUndefined`
                // element.defineWhenUndefined('someprop', somevalue); // sets element.model.someprop = somevalue; when not defined yet
                //
                // we MUST avoid circular reference: we cannot accept `template` as a property-field --> we remove those.
                // Also, because < and > are escaped by text-nodes: we need to unescape them:
                template = template.replaceAll('template', '')
                                   .replaceAll('&lt;', '<')
                                   .replaceAll('&gt;', '>');
                element.defineWhenUndefined('template', template);
            },
            sync: function() {
                var element = this,
                    model = element.model,
                    template = model.template;
                if (template.indexOf('<%')!==-1) {
                    element.setHTML(microtemplate(template, model));
                }
                else if (/{\S+}/.test(template)) {
                    element.setHTML(template.substitute(model));
                }
                else {
                    element.setHTML(template);
                }
            }
        });
        itagCore.setContentVisibility(Itag, true);
        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};