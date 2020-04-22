'use strict';
let ctrl = require('../controllers/main.js');

module.exports = function(app) {
    app .route('/')
        .get(ctrl.page);
    app .route('/a')
        .get(ctrl.accountAddress);
    app .route('/n')
        .get(ctrl.accountNewAddress);
    app .route('/b')
        .get(ctrl.balance);
    app .route('/w')
        .get(ctrl.withdrawal);
    app .route('/m')
        .get(ctrl.movement);
    app .route('/t')
        .get(ctrl.txs);
};