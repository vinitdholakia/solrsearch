"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorMessages = {};
errorMessages.norequestinfo = {
    title: "ERROR",
    message: "Error Making the request",
    code: "APIERROR"
};
var request = require('superagent');
module.exports = function () {
    function API(host, port) {
        _classCallCheck(this, API);

        this.host = host;
        this.port = port;
    }

    _createClass(API, [{
        key: "solrPath",
        value: function solrPath() {
            return this.host + ":" + this.port + "/solr";
        }
    }, {
        key: "get",
        value: function get() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var url = args[0].url || null;
            var query = args[0].query || {};
            var headers = args[0].headers || {};
            var callback = args[1] || null;
            try {
                if (!url) {
                    return callback([errorMessages.norequestinfo]);
                }
                var restResponse = function restResponse(err, res) {
                    var response = JSON.parse(res.text);
                    if (response.responseHeader.status === 0 || response.responseHeader.status === 200) {
                        return callback(null, response);
                    } else {
                        return callback(response);
                    }
                };
                request.get(url).set('Content-Type', 'application/json').query(query).set(headers || {}).set("Host", this.host).end(restResponse);
            } catch (e) {
                callback([errorMessages.norequestinfo]);
            }
        }
    }, {
        key: "post",
        value: function post() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var url = args[0].url || null;
            var query = args[0].query || {};
            var headers = args[0].headers || {};
            var body = args[0].body || {};
            var callback = args[1] || null;
            try {
                if (!url) {
                    return callback([errorMessages.norequestinfo]);
                }
                var restResponse = function restResponse(err, res) {
                    var response = JSON.parse(res.text);
                    if (response.responseHeader.status === 0 || response.responseHeader.status === 200) {
                        return callback(null, response);
                    } else {
                        return callback(response);
                    }
                };
                request.post(url).set('Content-Type', 'application/json').query(query).set(headers || {}).set("Host", this.host).send(body || {}).end(restResponse);
            } catch (e) {
                callback([errorMessages.norequestinfo]);
            }
        }
    }]);

    return API;
}();