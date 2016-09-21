'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
import {jsbundlefinder, obj} from '../../tools';
import md5 from 'js-md5';

export default class extends Base {

  async indexAction(){
      this.display()
  }

  /**
   * 上传并添加js版本
   * @method uploadfileAction
   * @return {[type]}         [description]
   * @author jimmy
   */
  async uploadfileAction(){
    //这里的 key 需要和 form 表单里的 name 值保持一致
    let file = this.file('bundle');
    let filepath = file.path;

    let appId = this.get('appId');
    let jsMajor = this.get('jsMajor');
    let jsMinor = this.get('jsMinor');
    let jsPatch = this.get('jsPatch');
    let miniContainer = this.get('miniContainerId');
    try{
        let containerVersionInfo = await this.model('container_version').getVersionInfoById(miniContainer);
        if (containerVersionInfo) {

            let result = await this.model('version').getVersionInfoByVersionInfo(appId, jsMajor, jsMinor, jsPatch);
            if (obj.objIsEmpty(result)) {
                /**
                 * 获取app的bundleId
                 */
                let appBundleId = containerVersionInfo.bundle_id;
                let containerStr = containerVersionInfo.major + '.' + containerVersionInfo.minor + '.' + containerVersionInfo.patch;
                let timestamp = process.hrtime();
                let fileName = timestamp + appBundleId + containerStr + '-' + jsMajor + '.' + jsMinor + '.' + jsPatch;
                jsbundlefinder.getJsBundle(file, (err, data) => {
                    if (err) {
                        this.fail({
                            errmsg: '上传失败!'
                        })
                    } else {
                        /**
                         * 写入复制jsbunle文件
                         * @type {[type]}
                         */
                        let bundle = data.jsbundle;
                        let uploadPath = think.RESOURCE_PATH + '/bundle/'+appBundleId;
                        fs.exists(uploadPath, (exists) => {
                            if (!exists) {
                                think.mkdir(uploadPath);
                            }
                        });
                        fs.renameSync(bundle, uploadPath+'/'+fileName);

                        fs.exists(uploadPath+'/'+fileName, async (exists) => {
                            if (exists) {
                                //文件复制成功后向数据库里插入记录
                                let insertData = {
                                    appId: appId,
                                    miniContainerId: miniContainer,
                                    url: appBundleId+'/'+fileName,
                                    major: jsMajor,
                                    minor: jsMinor,
                                    patch: jsPatch,
                                    isRelative: 1,
                                    bundleId: appBundleId
                                }
                                let result = await this.model('version').addVersion(insertData);
                                if (result) {
                                    this.success({
                                        errmsg: '添加成功！'
                                    });
                                } else {
                                    this.fail({
                                        errmsg: '上传失败!'
                                    });
                                }

                            } else {
                                this.fail({
                                    errmsg: '上传失败!'
                                });
                            }
                        });
                    }
            });
            } else {
                this.fail({
                    errmsg: '该版本已存在!'
                })
            }
        }else {
            this.fail({
                errmsg: '上传失败!不能存在该最小兼容版本'
            })
        }
    } catch(err){
        console.log(err);
        this.fail({
            errmsg: '上传失败，请刷新后重新上传!'
        })
    }


  }

}
