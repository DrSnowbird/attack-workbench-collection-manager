'use strict';

const logger = require('./logger');

exports.bodyParser = function(err, req, res, next) {
    if (err.name === 'SyntaxError') {
        logger.warn('Unable to parse body, syntax error: ' + err.type);
        res.status(400).send('Syntax error.');
    }
    else {
        next(err);
    }
};

exports.requestValidation = function(err, req, res, next) {
    if (err.errors && err.errors.length >= 1 && (
        err.errors[0].errorCode === 'format.openapi.validation' ||
        err.errors[0].errorCode === 'type.openapi.validation' ||
        err.errors[0].errorCode === 'required.openapi.validation')) {
        logger.warn('Request failed validation');
        logger.info(JSON.stringify(err.errors));
        res.status(400).send('Invalid request.');
    }
    else {
        next(err);
    }
};

exports.catchAll = function(err, req, res, next) {
    // Handle a 404 not found
    if (err.status === 404) {
        return res.status(404).send('Not found');
    }

    logger.error('catch all: ' + err);
    return res.status(500).send('Server error.');
};
