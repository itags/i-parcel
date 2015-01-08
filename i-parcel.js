// See for all prototypes: https://developer.mozilla.org/en-US/docs/Web/API
require('polyfill/polyfill-base.js');

module.exports = function (window) {

    "use strict";
    var itagsCore = require('itags.core')(window),
        Event = require('event-dom')(window);

    Event.after('click', function(e) {
        e.target.setAttr('value', 'I am clicked i-parcel-userdata!');
    }, 'i-parcel-userdata');

    itagsCore.defineParcel(
        'userdata',
        function() {
console.info('renderFunc i-parcel');
            this.setHTML('I am <b>'+this.getTagName()+'</b> '+this.dummy+' modeldata.b: '+this.getData('modeldata').b);
            this.after('dblclick', this.msg);
        },
        {
            init: function() {
                console.info('initFunc');
            },
            destroy: function() {
                console.info('destroyFunc');
            },
            dummy: 10,
            msg: function() {
                this.setAttr('value', 'I am double clicked!');
            }
        }
    );

};