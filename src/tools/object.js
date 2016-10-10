'use strict'

module.exports = {
    objIsEmpty: (obj) => {
        return obj == undefined || obj == null || Object.getOwnPropertyNames(obj).length <= 0;
    },
    arrIsEmpty: (arr) => {
        return arr == undefined || arr == null || typeof arr.length == undefined || arr.length <= 0;
    }
};
