'use strict';

import Base from './base.js';

let bundlePath = think.RESOURCE_PATH+'/bundle/';

export default class extends Base {

/**
 * 下载更新文件
 * @method indexAction
 * @return {[type]}    [description]
 * @author jimmy
 */
  async indexAction(){
      let pathParam = this.post('path'); //获取客户端请求的文件
      let filePath = bundlePath + pathParam;
      this.download(filePath);//下载文件
  }

}
