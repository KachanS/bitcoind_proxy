'use strict';
const _ = require('lodash');
var client = new bitcoin.Client({
  host: 'localhost',
});

exports.page = function (req, res) {

    res.json({
        result : true
    });

};
