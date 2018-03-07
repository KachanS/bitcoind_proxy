'use strict';
const _ = require('lodash');
const Client = require('bitcoin-core');
const client = new Client({ network: 'regtest' });

exports.page = function (req, res) {

    res.json({
        result : true
    });

};
exports.info = function (req, res) {

    client.getInfo((error, help) => {
        res.json({
            result : true,
            help : help
        });
    });
    

};
