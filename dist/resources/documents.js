"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Documents(api, core) {
        _classCallCheck(this, Documents);

        this.api = api;
        this.core = core;
        this.documenturl = api.solrPath() + "/" + this.core;
        this.selectquery = this.documenturl + "/select?wt=json";
        this.addquery = this.documenturl + "/update?commit=true";
        this.deletequery = this.documenturl + "/update?stream.body=<delete><query><DELETEQUERY></query></delete>&commit=true";
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
                sort: function sort(field, type) {
                    type = type || 'asc';
                    var append = "&sort=" + field + " " + type;
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
                custom: function custom(obj) {
                    var append = "";
                    for (var key in obj) {
                        var value = obj[key];
                        append = "&" + key + "=" + value;
                    }
                    return _this.query(append);
                },
                end: function end(callback) {
                    var url = _this.selectquery;
                    _this.selectquery = _this.documenturl + "/select?wt=json";
                    _this.api.get({
                        url: url
                    }, callback);
                }
            };
        }
    }, {
        key: "add",
        value: function add() {
            var _ref;

            var callback = (_ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref]);
            var docs = (arguments.length <= 0 ? undefined : arguments[0]) || null;
            if ((typeof docs === "undefined" ? "undefined" : _typeof(docs)) === "object" && Array.isArray(docs) && docs.length > 0) {
                var url = this.addquery;
                this.api.post({
                    url: url,
                    body: docs
                }, callback);
            } else {
                throw new Error("Need to add atleast one document");
                return;
            }
        }
    }, {
        key: "update",
        value: function update() {
            var _ref2,
                _this2 = this;

            var callback = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
            var query = (arguments.length <= 1 ? undefined : arguments[1]) || null;
            var doc = (arguments.length <= 0 ? undefined : arguments[0]) || null;
            if (typeof query !== 'string') {
                throw new Error("Need to mention the query to update.");
                return;
            }
            var lastResult = null;
            var _index = 0;
            var loopArray = function loopArray(arr) {
                var proceed = function proceed() {
                    _index++;
                    if (_index < arr.length) {
                        loopArray(arr);
                    } else {
                        _index = 0;
                        return callback(null, lastResult);
                    }
                };
                var docToUpdate = {
                    id: arr[_index].id
                };
                for (var key in doc) {
                    var value = doc[key];
                    docToUpdate[key] = { set: value || null };
                }
                _this2.add([docToUpdate], function (err, result) {
                    if (err) {
                        return callback(err);
                    } else {
                        lastResult = result;
                        proceed();
                    }
                });
            };
            var updateAllDocs = function updateAllDocs(err, result) {
                if (err) {
                    return callback(err);
                } else {
                    if (!!result.response) {
                        if (!!result.response.docs) {
                            loopArray(result.response.docs);
                        } else {
                            return callback(null, result);
                        }
                    } else {
                        return callback(null, result);
                    }
                }
            };
            if ((typeof doc === "undefined" ? "undefined" : _typeof(doc)) === "object" && Object.keys(doc).length > 0) {
                this.query(query).end(function (err, result) {
                    if (err) {
                        return callback(err);
                    } else {
                        if (!!result.response) {
                            if (!!result.response.numFound) {
                                _this2.query(query).paginate(0, result.response.numFound).end(updateAllDocs);
                            } else {
                                return callback(null, result);
                            }
                        } else {
                            return callback(null, result);
                        }
                    }
                });
            } else {
                throw new Error("To update you need to mention the updated fields");
                return;
            }
        }
    }, {
        key: "delete",
        value: function _delete() {
            var _ref3;

            var callback = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
            var query = (arguments.length <= 0 ? undefined : arguments[0]) || null;
            if (query === "*:*") {
                throw new Error("We recommend to use .clear() to delete all data from the collection");
                return;
            } else {
                var url = this.deletequery.split('<DELETEQUERY>').join(query);
                this.api.get({
                    url: url
                }, callback);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            var _ref4;

            var callback = (_ref4 = arguments.length - 1, arguments.length <= _ref4 ? undefined : arguments[_ref4]);
            var url = this.deletequery.split('<DELETEQUERY>').join('*:*');
            this.api.get({
                url: url
            }, callback);
        }
    }]);

    return Documents;
}();