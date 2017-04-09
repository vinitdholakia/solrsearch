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
    function Documents(api, core) {
        _classCallCheck(this, Documents);

        this.api = api;
        this.core = core;
        this.documenturl = api.solrPath() + "/" + this.core;
        this.selectquery = this.documenturl + "/select?wt=json";
    }

    _createClass(Documents, [{
        key: "query",
        value: function query(join) {
            var _this = this;

            if (!!join) {
                if (join.charAt(0) === '&') {
                    this.selectquery = this.selectquery + join;
                } else {
                    this.selectquery = this.selectquery + "&q=" + join;
                }
            }
            return {
                filter: function filter(fl) {
                    return _this.query("&fl=" + fl);
                },
                paginate: function paginate(start, limit) {
                    var append = "";
                    if (!!start) {
                        append = "&start=" + start;
                    }
                    if (!!limit) {
                        append = append + "&rows=" + limit;
                    }
                    return _this.query(append);
                },
                group: function group(field, limit) {
                    var append = "&group=true";
                    _this.groupedQuery = true;
                    if (!!field) {
                        append = append + "&group.field=" + field;
                    }
                    if (!!limit) {
                        append = append + "&group.limit=" + limit;
                    }
                    return _this.query(append);
                },
                end: function end(callback) {
                    var isGrouped = _this.groupedQuery;
                    var url = _this.selectquery;
                    _this.selectquery = _this.documenturl + "/select?wt=json";
                    _this.groupedQuery = false;
                    var apiResponse = function apiResponse(err, result) {
                        if (err) {
                            return callback(err);
                        } else if (!!result) {
                            if (!isGrouped && result.response.numFound > 0) {
                                return callback(null, result.response.docs);
                            } else if (!!isGrouped) {
                                return callback(null, result);
                            } else {
                                return callback(null, []);
                            }
                        } else {
                            return callback([errorMessages.viewfields]);
                        }
                    };
                    _this.api.get({
                        url: url
                    }, apiResponse);
                }
            };
        }
    }]);

    return Documents;
}();