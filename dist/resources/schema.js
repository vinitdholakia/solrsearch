"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorMessages = {};
errorMessages.viewfields = {
    title: "ERROR",
    message: "Error loading the schema",
    code: "SCHEMAERROR"
};
module.exports = function () {
    function Schema(api, core) {
        _classCallCheck(this, Schema);

        this.api = api;
        this.core = core;
        this.schemaurl = api.solrPath() + "/" + this.core + "/schema";
    }

    _createClass(Schema, [{
        key: "fields",

        /**
         * [fields get core field list]
         * @param  {Function} callback [returns a callback with err / result]
         * @return {[Callback]}            [description]
         */
        value: function fields(callback) {
            var url = this.schemaurl + "/fields?wt=json";
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (!!result.errors) {
                        var errObj = errorMessages.viewfields;
                        errObj.message = result.errors[0].errorMessages[0].trim();
                        return callback([errObj]);
                    };
                    if (!!result.fields) {
                        return callback(null, result.fields);
                    } else {
                        return callback([errorMessages.viewfields]);
                    }
                } else {
                    return callback([errorMessages.viewfields]);
                }
            };
            this.api.get({
                url: url
            }, callback);
        }
    }, {
        key: "add",
        value: function add() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];

            var url = this.schemaurl;
            if (!params.name || !params.type) {
                return callback([errorMessages.viewfields]);
            }
            var body = {};
            body["add-field"] = {};
            body["add-field"].name = params.name || null;
            body["add-field"].type = params.type || null;
            body["add-field"].stored = params.stored || false;
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (!!result) {
                        if (!!result.errors) {
                            var errObj = errorMessages.viewfields;
                            errObj.message = result.errors[0].errorMessages[0].trim();
                            return callback([errObj]);
                        }
                        return callback(null, result);
                    } else {
                        return callback([errorMessages.viewfields]);
                    }
                } else {
                    return callback([errorMessages.viewfields]);
                }
            };
            this.api.post({
                url: url,
                body: body
            }, apiResponse);
        }
    }, {
        key: "update",
        value: function update() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];

            var url = this.schemaurl;
            if (!params.name || !params.type) {
                return callback([errorMessages.viewfields]);
            }
            var body = {};
            body["replace-field"] = {};
            body["replace-field"].name = params.name || null;
            body["replace-field"].type = params.type || null;
            if (!!params.stored) {
                body["replace-field"].stored = params.stored || false;
            }
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (!!result) {
                        if (!!result.errors) {
                            var errObj = errorMessages.viewfields;
                            errObj.message = result.errors[0].errorMessages[0].trim();
                            return callback([errObj]);
                        }
                        return callback(null, result);
                    } else {
                        return callback([errorMessages.viewfields]);
                    }
                } else {
                    return callback([errorMessages.viewfields]);
                }
            };
            this.api.post({
                url: url,
                body: body
            }, apiResponse);
        }
    }, {
        key: "remove",
        value: function remove() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];

            var url = this.schemaurl;
            if (!params.name) {
                return callback([errorMessages.viewfields]);
            }
            var body = {};
            body["delete-field"] = {};
            body["delete-field"].name = params.name || null;
            var apiResponse = function apiResponse(err, result) {
                if (err) {
                    return callback(err);
                } else if (!!result) {
                    if (!!result) {
                        if (!!result.errors) {
                            var errObj = errorMessages.viewfields;
                            errObj.message = result.errors[0].errorMessages[0].trim();
                            return callback([errObj]);
                        }
                        return callback(null, result);
                    } else {
                        return callback([errorMessages.viewfields]);
                    }
                } else {
                    return callback([errorMessages.viewfields]);
                }
            };
            this.api.post({
                url: url,
                body: body
            }, apiResponse);
        }
    }]);

    return Schema;
}();