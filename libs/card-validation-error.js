"use strict";

class ValidationError extends Error {
    constructor(msg,code) {
        super(msg);
        this.code = code;
    }
}

module.exports = ValidationError;