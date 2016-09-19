'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
import AppBundleInfo from 'app-bundle-info';

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

    AppBundleInfo.autodetect(file.path,function(err,bundleInfo){
        bundleInfo.loadInfo(function(err,information){
            console.log('info', bundleInfo);
            if (bundleInfo.type == 'ios') {
                assert.equal(bundleInfo.getIdentifier(), information.CFBundleIdentifier)
                assert.equal(bundleInfo.getName(), information.CFBundleDisplayName || information.CFBundleName)
                assert.equal(bundleInfo.getVersionName(), information.CFBundleShortVersionString)
                assert.equal(bundleInfo.getVersionCode(), information.CFBundleVersion)
            } else if (bundleInfo.type == 'android') {
                assert.equal(bundleInfo.getIdentifier(), information.package)
                assert.equal(bundleInfo.getName(), information.package) // TODO: get application icon name
                assert.equal(bundleInfo.getVersionName(), information.versionName)
                assert.equal(bundleInfo.getVersionCode(), information.versionCode)
            }

        });
    });
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
