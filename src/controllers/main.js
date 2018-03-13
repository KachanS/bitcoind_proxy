'use strict';

const _ = require('lodash');
const md5 = require('md5');
const client = require('node-bitcoin-rpc');

const checkWd = function(alias, amount, address){
    let salt = md5(process.env.BC_SALT || 'NODE_SALT');
    return md5(JSON.stringify([alias, amount, address, salt]));
}
client.init(process.env.BC_HOST, process.env.BC_PORT, process.env.BC_USERNAME, process.env.BC_PASSWORD);

exports.page = function (req, res) {

    res.json({
        result: true
    });

};
exports.balance = function (req, res) {
    if (req.query.alias) {
        client.call('getbalance', [req.query.alias, 0], function (err, r) {
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

exports.withdrawal = function (req, res) {
    let required = ['alias', 'amount', 'address', 'check'];
    for(var i = 0; i < required.length; i++ ){
        if (!req.query.hasOwnProperty(required[i])) {
             res.json({
                result: false,
                error: required[i]+" is required",

            });
            return;
        }
    }
    
    if (isNaN(parseFloat(req.query.amount)) || req.query.amount < 0) {
        res.json({
                result: false,
                error: "Illegal amount",
            });
        return;    
    }    
    
    if (checkWd(req.query.alias, req.query.amount, req.query.address) != req.query.check) {
        res.json({
                result: false,
                error: "Illegal check",
            });
        return;    
    }

    client.call('sendfrom', [req.query.alias, req.query.address, req.query.amount], function (err, r) {
        let result = true, error = null, data;
        if (r instanceof Object) {
            result = false;
            error = r.error.message
        } else {
            data = r
        }
        
        res.json({
            result: result,
            error: error,
            data: data
        });
    });
    

};

exports.accountAddress = function (req, res) {
    if (req.query.alias) {
        client.call('getaccountaddress', [req.query.alias], function (err, r) {
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

exports.accountNewAddress = function (req, res) {
    if (req.query.alias) {
        client.call('getnewaddress', [req.query.alias], function (err, r) {
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