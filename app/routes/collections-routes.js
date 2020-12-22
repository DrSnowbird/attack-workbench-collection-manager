'use strict';

const express = require('express');
const collectionsController = require('../controllers/collections-controller');

const router = express.Router();

router.route('/collections')
    .get(collectionsController.retrieveAll)
    .post(collectionsController.import)

router.route('/collections/remote')
    .get(collectionsController.retrieveByUrl)

module.exports = router;
