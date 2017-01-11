'use strict';
let addZero =  (val) => {
    var num = parseFloat(val);
    return num < 10? '0' + num : num;
};
let date = (date) => {
    if(date == undefined) return;//防止undefine
    var weekday = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    // isNaN(date)? date =  date.replace(/-/g, '/') : null;

    var dateObj = new Date(date);
    var date2 = new Date(date);

    dateObj.getHours = () => {
        return addZero(date2.getHours())
    }
    dateObj.getMinutes = () => {
        return addZero(date2.getMinutes());
    }
    dateObj.getSeconds = () => {
        return addZero(date2.getSeconds());
    }
    dateObj.getMonth = () => {
        var month = parseInt(date2.getMonth())+1;
        return addZero(month);
    }
    dateObj.getDate = () => {
        return addZero(date2.getDate());
    }
    dateObj.getDayName = () => {
        return weekday[date2.getDay()];
    }
    dateObj.format = (format: String)=>{
        let result = format.replace(/y/, dateObj.getFullYear());
        result = result.replace(/m/, dateObj.getMonth());
        result = result.replace(/d/, dateObj.getDate());
        result = result.replace(/h/, dateObj.getHours());
        result = result.replace(/i/, dateObj.getMinutes());
        result = result.replace(/s/, dateObj.getSeconds());
        return result;
    }
    dateObj.isSameDay = (dateInfo: String) => {
        isNaN(dateInfo)? dateInfo =  dateInfo.replace(/-/g, '/') : null;
        let newDateTime = new Date(dateInfo).getTime();
        let oneDay = 1000 * 3600 * 24;
        return Math.floor(dateObj.getTime()/oneDay) == Math.floor(newDateTime/oneDay);
    }
    return dateObj;
};
module.exports = {
    formatPhone: (phone) => {
        if(phone == undefined){
          console.log('formatPhone()输入undefined');
          return;//防止undefined
        }
        var str = [];
        for(var i = 0; i < phone.length; i++){
            if(i == 2 || i == 6){
                str.push(phone[i] + ' ');
            }else{
                str.push(phone[i]);
            }
        }
        return str.join('');
    },
    date : date,
    isEmpty: (copy) => {
        return copy == '' || copy==null || copy==undefined || copy.trim().length<=0;
    },
    arrIsEmpty: (arr: Array) => {
        return !arr || typeof arr.length == 'undefined' || arr.length <= 0;
    }
};
