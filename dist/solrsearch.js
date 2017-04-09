'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = require('./resources/cores');
var API = require('./resources/api');

var Search = function Search() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Search);

    var host = options.host || "localhost";
    var port = options.port || 8983;
    var cores = options.cores || {};
    if (!Object.keys(cores).length) {
        throw new Error('Need to mention atleast one core');
    }
    for (var key in cores) {
        var value = cores[key];
        this[key] = new Core(value, new API(host, port));
    }
};

;
var commonCallback = function commonCallback(err, result) {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', JSON.stringify(err, null, 2));
    } else {
        console.log('\x1b[34m%s\x1b[0m', JSON.stringify(result, null, 2));
    }
    return;
};

try {
    var x = new Search({
        host: "35.154.13.189",
        cores: {
            global: "global",
            global2: "global2"
        }
    });
    //x.global.reload(commonCallback);
    //x.global.status(commonCallback);
    //x.global2.reload(commonCallback);
    //x.global2.status(commonCallback);
    x.global.schema.fields(commonCallback);
} catch (e) {
    console.log("ERROR");
    console.log(e.message);
}

/*
{
    result : 1/0,
    response : {},
    error: []
}*/