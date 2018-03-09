'use strict';

const _ = require('lodash');
const client = require('node-bitcoin-rpc');

client.init(process.env.host, process.env.port, process.env.username, process.env.password);

exports.page = function (req, res) {

    res.json({
        result: true
    });

};
exports.balance = function (req, res) {
    if (req.alias) {
        client.call('getbalance', [req.alias], function (err, r) {
            let result = true, error = null, data;
            if (err == null) {
                data = r
            } else {
                result = false;
                error = err
            }
            res.json({
                result: result,
                error: error,
                data: data
            });
        });
    } else {
        res.json({
            result: false,
            error: "Alias is required",

        });
    }

};

exports.accountAddress = function (req, res) {
    if (req.alias) {
        client.call('getaccountaddress', [req.alias], function (err, r) {
            let result = true, error = null, data;
            if (err == null) {
                data = r
            } else {
                result = false;
                error = err
            }
            res.json({
                result: result,
                error: error,
                data: data
            });
        });
    } else {
        res.json({
            result: false,
            error: "Alias is required",

        });
    }
};