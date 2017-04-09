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
            global2: "global2",
            lab: "pathlabinfo"
        }
    });

    var toAdd = {
        "id": "2b8510a0-154f-11e7-bd60-bdd108b2d212",
        "accountid": "db55c340-154f-11e7-bd60-bdd108b2d21d",
        "labname": "Sanjeevani 2 Laboratory",
        "labtype": "PATHOLOGY",
        "accreditation": "[]",
        "advancebooking": "true",
        "homecollection": "true",
        "timeslots": "{}",
        "contact": "{\"mobile\":\"02228445675\"}",
        "city": "Mumbai",
        "location": "19.18449,72.852792",
        "locality": "Off Rani Sati Marg, Malad East",
        "address": "Bhavani Chambers, Kedarmal Road,Off Rani Sati Marg, Malad East,,,Mumbai,Maharashtra,400097,India",
        "is_active": "1"
    };
    var toAddAlso = {
        "id": "2b8510a0-154f-11e7-bd60-bdd108b2d213",
        "accountid": "db55c340-154f-11e7-bd60-bdd108b2d21d",
        "labname": "Sanjeevani 2 Laboratory",
        "labtype": "PATHOLOGY",
        "accreditation": "[]",
        "advancebooking": "true",
        "homecollection": "true",
        "timeslots": "{}",
        "contact": "{\"mobile\":\"02228445675\"}",
        "city": "Mumbai",
        "location": "19.18449,72.852792",
        "locality": "Off Rani Sati Marg, Malad East",
        "address": "Bhavani Chambers, Kedarmal Road,Off Rani Sati Marg, Malad East,,,Mumbai,Maharashtra,400097,India",
        "is_active": "1"
    };

    //x.lab.documents.add([toAdd,toAddAlso], commonCallback);
    //x.lab.documents.delete('id:2b8510a0-154f-11e7-bd60-bdd108b2d21*', commonCallback);
    //x.lab.documents.query('labtype:PATHOLOGY').filter('labtype').end(commonCallback);
    //x.lab.schema.fields(commonCallback);
    x.lab.documents.update({
        accreditation: "[{\"type\":\"CAP\"}]"
    }, "*:*", commonCallback);
} catch (e) {
    //console.log("ERROR")
    console.log(e.message);
}

/*
{
    result : 1/0,
    response : {},
    error: []
}*/