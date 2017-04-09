'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = require('./resources/cores');
var API = require('./resources/api');
var cores = {
    global: 'global',
    cm: 'CheckappMatrix'
};
module.exports = function Search() {
    var solr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Search);

    var host = solr.host || "localhost";
    var port = solr.port || 8983;
    for (var key in cores) {
        var value = cores[key];
        this[key] = new Core(value, new API(host, port));
    }
};
/*let commonCallback = (err, result) => {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', JSON.stringify(err, null, 2));
    } else {
        console.log('\x1b[34m%s\x1b[0m', JSON.stringify(result, null, 2));
    }
    //console.log(err, result);
    return;
};
var x = new Search();
x.global.documents.query("title:Ca*").filter('title,type2').paginate(0, 10).end(commonCallback);*/