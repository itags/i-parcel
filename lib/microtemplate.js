/**
 * Based on:
 * https://github.com/cho45/micro-template.js
 * (c) cho45 http://cho45.github.com/mit-license
 */
// "use strict";

var cache = {},
    templateFn;

templateFn = function(template, data) {
    var me = arguments.callee;
    if (!cache[template]) {
        cache[template] = (function () {
            "use strict";
            var name, line, body, func, map, escapeHTML, Fn;
            name = 'templateFn(template)';
            line = 1;
            body = (
                "try { " +
                    (me.variable ?  "var " + me.variable + " = this.stash;" : "with (this.stash) { ") +
                        "this.ret += '"  +
                        template.replace(/<%/g, '\x11').replace(/%>/g, '\x13') // if you want other tag, just edit this line
                                .replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27')
                                .replace(/^\s*|\s*$/g, '')
                                .replace(/\n/g, function () {
                                    return "';\nthis.line = " + (++line) + "; this.ret += '\\n";
                                 })
                                .replace(/\x11=raw(.+?)\x13/g, "' + ($1) + '")
                                .replace(/\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '")
                                .replace(/\x11(.+?)\x13/g, "'; $1; this.ret += '") +
                        "'; " + (me.variable ? "" : "}") + "return this.ret;" +
                "} catch (e) { throw 'TemplateError: ' + e + ' (on " + name + "' + ' line ' + this.line + ')'; } " +
                "//@ sourceURL=" + name + "\n" // source map
            ).replace(/this\.ret \+= '';/g, '');
            // work arround sjhint:
            Fn = Function;
            func = new Fn(body);
            map  = { '&' : '&amp;', '<' : '&lt;', '>' : '&gt;', '\x22' : '&#x22;', '\x27' : '&#x27;' };
            escapeHTML = function (template) {
                return (''+template).replace(/[&<>\'\"]/g, function (_) {
                    return map[_];
                });
            };
            return function (stash) {
                return func.call(me.context = {
                    escapeHTML: escapeHTML,
                    line: 1,
                    ret : '',
                    stash: stash
                });
            };
        })();
    }
    return data ? cache[template](data) : cache[template];
};

module.exports = templateFn;