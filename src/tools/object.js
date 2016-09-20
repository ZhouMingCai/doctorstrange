'use strict'

module.exports = {
    objIsEmpty: (obj) => {
        return obj == undefined || obj == null || Object.getOwnPropertyNames(obj).length <= 0;
    }
};
