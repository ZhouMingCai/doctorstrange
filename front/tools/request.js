'use strict'

import 'whatwg-fetch';

module.exports = (url, params, success, error) => {

    return fetch(url, {
        method: 'post',
        headers: createHeaders(),
        body: JSON.stringify(params),
        redirect: 'follow',
        credentials: 'include'
    })
    .then(status)
    .then(json)
    .then((res) => {
        if (res.errno == 0) {
            success? success(res.data) : null;
        } else {
            error? error(res) : null;
        }
    })
    .catch((err) => {
        error? error(err) : null;
        console.log(err);
    });
}


 function status(response){
    if(response.status == 203){
            console.log('i am  in  203.......')
        // if(__STORE.getState().userReducer.sessionId){
        //     __STORE.dispatch({type : DO_LOGOUT});
        // }
    }else if(response.status != 200){
        console.log(response.status);
    } else if(response.status == 404) {
        console.log('not found');
    }
    return response;
}
//json转换
 function json(response){
    return response.json();
}

//创建请求头
 function createHeaders(isLoginHeader){
    var header = {
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type' : 'application/json'
    };
    // if(!isLoginHeader){
    //     header['Cookie'] = 'SESSION=' + __STORE.getState().userReducer.sessionId
    // }
    return header;
}
