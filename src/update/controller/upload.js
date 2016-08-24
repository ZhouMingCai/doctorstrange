'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';

export default class extends Base {

  async indexAction(){
      this.display()
  }

  async uploadfileAction(){
      //这里的 key 需要和 form 表单里的 name 值保持一致
    var file = this.file('bundle');
    var filepath = file.path;
    //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
    var uploadPath = think.RESOURCE_PATH + '/bundle';
    think.mkdir(uploadPath);
    var basename = file.fieldName;
    fs.renameSync(filepath, uploadPath + '/' + basename);

    file.path = uploadPath + '/' + basename;

    if(think.isFile(file.path)){
        this.success({
            name: basename
        });
    }else{
        this.fail({
            errmsg: '上传失败!'
        })
    }


  }

}
