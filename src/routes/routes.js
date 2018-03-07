'use strict';
let ctrl = require('../controllers/main.js');

module.exports = function(app) {
    app .route('/')
        .get(ctrl.page);
    app .route('/i')
        .get(ctrl.info);
};