'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = require('./schema');
var Documents = require('./documents');
module.exports = function () {
    function Core(corename, api) {
        _classCallCheck(this, Core);

        this.api = api;
        this.core = corename;
        this.schema = new Schema(api, this.core);
        this.documents = new Documents(api, this.core);
        this.coreurl = api.solrPath() + "/admin/cores";
        this.collectionurl = api.solrPath() + "/admin/collections";
    }

    _createClass(Core, [{
        key: 'status',
        value: function status(callback) {
            var instance = this;
            var url = this.coreurl + "?wt=json&action=STATUS&core=" + this.core;
            this.api.get({
                url: url
            }, callback);
        }
    }, {
        key: 'reload',
        value: function reload(callback) {
            var instance = this;
            var url = this.coreurl + "?wt=json&action=RELOAD&core=" + this.core;
            this.api.get({
                url: url
            }, callback);
        }
    }, {
        key: 'load',
        value: function load(callback) {
            var instance = this;
            var url = this.collectionurl + "?wt=json&action=CREATE&name=" + this.core + "&name=" + this.core + "&config=solrconfig.xml&schema=schema.xml&dataDir=data";;
            this.api.get({
                url: url
            }, callback);
        }
    }]);

    return Core;
}();