"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorMessages = {};
errorMessages.coreerrors = {
    title: "ERROR",
    message: "Error loading the core",
    code: "COREERROR"
};
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
    }

    _createClass(Core, [{
        key: "status",
        value: function status(callback) {
            var instance = this;
            var url = this.coreurl + "?wt=json&action=STATUS&core=" + this.core;
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (!!result.errors) {
                        var errObj = errorMessages.coreerrors;
                        errObj.message = result.errors[0].errorMessages[0].trim();
                        return callback([errObj]);
                    };
                    var coreStatus = result.status[instance.core] || {};
                    if (!!Object.keys(coreStatus).length) {
                        return callback(null, result.status[instance.core]);
                    } else {
                        var _errObj = errorMessages.coreerrors;
                        _errObj.message = "Error fetching the core < " + instance.core + " >.The core may be down / doesn't exist.";
                        return callback([_errObj]);
                    }
                } else {
                    return callback([errorMessages.coreerrors]);
                }
            };
            this.api.get({
                url: url
            }, apiResponse);
        }
    }, {
        key: "reload",
        value: function reload(callback) {
            var instance = this;
            var url = this.coreurl + "?wt=json&action=RELOAD&core=" + this.core;
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (result.status == 400 || result.status == "400") {
                        var errObj = errorMessages.coreerrors;
                        errObj.message = "Core < " + instance.core + " > doesn't exist";
                        return callback([errObj]);
                    }
                    return callback(null, result);
                } else {
                    return callback([errorMessages.coreerrors]);
                }
            };
            this.api.get({
                url: url
            }, apiResponse);
        }
    }]);

    return Core;
}();