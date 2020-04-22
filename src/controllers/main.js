'use strict';

const _ = require('lodash');
const md5 = require('md5');
const client = require('node-bitcoin-rpc');

const checkWd = function(alias, amount, address){
    let salt = md5(process.env.BC_SALT || 'NODE_SALT');
    return md5(JSON.stringify([alias, Math.round(amount*100000000), address, salt]));
}
client.init(process.env.BC_HOST, process.env.BC_PORT, process.env.BC_USERNAME, process.env.BC_PASSWORD);
client.setTimeout(parseInt(process.env.BC_TIMEOUT) || 1000);

exports.page = function (req, res) {

    res.json({
        result: true
    });

};
exports.balance = function (req, res) {
    if (req.query.alias) {
        let c = req.query.c ? parseInt(req.query.c) : 0;
        client.call('getbalance', [req.query.alias, c], function (err, r) {
            let result = true, error = null, data;
            if (err == null) {
                data = r
            } else {
                result = false;
                error = err
            }
            try {
                res.json({
                    result: result,
                    error: error,
                    data: data
                });
            } catch (e){
                console.log(e)
            }
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
        try {
            res.json({
                result: result,
                error: error,
                data: data
            });
        } catch (e){
            console.log(e)
        }
    });
    

};

exports.txs = function (req, res) {
    
    if (req.query.hasOwnProperty('count') && (isNaN(parseInt(req.query.count)) || req.query.count < 0)) {
        res.json({
            result: false,
            error: "Illegal count",
        });
        return;    
    }    
    
    if (req.query.hasOwnProperty('offset') && (isNaN(parseInt(req.query.offset)) || req.query.offset < 0)) {
        res.json({
            result: false,
            error: "Illegal offset",
        });
        return;    
    }    
    
    client.call('listtransactions', 
        [
            req.query.alias, 
            req.query.hasOwnProperty('count') ? req.query.count : null,  
            req.query.hasOwnProperty('offset')? req.query.offset : null], function (err, r) {
        let result = true, error = null, data;
        if (r instanceof Object) {
            result = false;
            error = r.error.message
        } else {
            data = r
        }
        try {
            res.json({
                result: result,
                error: error,
                data: data
            });
        } catch (e){
            console.log(e)
        }
    });
    

};

exports.movement = function (req, res) {
    let required = ['source', 'amount', 'target', 'check'];
    for(var i = 0; i < required.length; i++ ){
        if (!req.query.hasOwnProperty(required[i])) {
             res.json({
                result: false,
                error: required[i]+" is required",

            });
            return;
        }
    }
    
    if (isNaN(parseFloat(req.query.amount)) || req.query.amount <= 0) {
        res.json({
                result: false,
                error: "Illegal amount",
            });
        return;    
    }    
    
    if (checkWd(req.query.source, req.query.amount, req.query.target) != req.query.check) {
        res.json({
                result: false,
                error: "Illegal check",
            });
        return;    
    }

    client.call('move', [req.query.source, req.query.target, req.query.amount], function (err, r) {
        let result = true, error = null, data;
        if (r instanceof Object) {
            result = false;
            error = r.error.message
        } else {
            data = r
        }
        try {
            res.json({
                result: result,
                error: error,
                data: data
            });
        } catch (e){
            console.log(e)
        }
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
            try {
                res.json({
                    result: result,
                    error: error,
                    data: data
                });
            } catch (e){
                console.log(e)
            }
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
            try {
                res.json({
                    result: result,
                    error: error,
                    data: data
                });
            } catch (e){
                console.log(e)
            }
        });
    } else {
        res.json({
            result: false,
            error: "Alias is required",

        });
    }
};