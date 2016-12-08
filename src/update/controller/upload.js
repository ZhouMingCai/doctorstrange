'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
import {jsbundlefinder, obj} from '../../tools';
import md5 from 'js-md5';
import bsdiff from 'node-bsdiff';

let bundlePath = think.RESOURCE_PATH+'/bundle/';

export default class extends Base {

  async indexAction(){
      this.display()
  }

  // /**
  //  * 上传并添加js版本
  //  * @method uploadfileAction
  //  * @return {[type]}         [description]
  //  * @author jimmy
  //  */
  // async uploadfileAction(){
  //   //这里的 key 需要和 form 表单里的 name 值保持一致
  //   let file = this.file('bundle');
  //   let filepath = file.path;
  //
  //   let appId = this.get('appId');
  //   let jsMajor = this.get('jsMajor');
  //   let jsMinor = this.get('jsMinor');
  //   let jsPatch = this.get('jsPatch');
  //   let miniContainer = this.get('miniContainerId');
  //   try{
  //       let containerVersionInfo = await this.model('container_version').getVersionInfoById(miniContainer);
  //       if (containerVersionInfo) {
  //
  //           let result = await this.model('version').getVersionInfoByVersionInfo(appId, jsMajor, jsMinor, jsPatch);
  //           if (obj.objIsEmpty(result)) {
  //               /**
  //                * 获取app的bundleId
  //                */
  //               let appBundleId = containerVersionInfo.bundle_id;
  //               let containerStr = containerVersionInfo.major + '.' + containerVersionInfo.minor + '.' + containerVersionInfo.patch;
  //               let timestamp = process.hrtime();
  //               let fileName = timestamp + appBundleId + containerStr + '-' + jsMajor + '.' + jsMinor + '.' + jsPatch;
  //               jsbundlefinder.getJsBundle(file, (err, data) => {
  //                   if (err) {
  //                       this.fail({
  //                           errmsg: '上传失败!'
  //                       })
  //                   } else {
  //                       /**
  //                        * 写入复制jsbunle文件
  //                        * @type {[type]}
  //                        */
  //                       let bundle = data.jsbundle;
  //                       let uploadPath = think.RESOURCE_PATH + '/bundle/'+appBundleId;
  //                       fs.exists(uploadPath, (exists) => {
  //                           if (!exists) {
  //                               think.mkdir(uploadPath);
  //                           }
  //                       });
  //                       fs.renameSync(bundle, uploadPath+'/'+fileName);
  //
  //                       fs.exists(uploadPath+'/'+fileName, async (exists) => {
  //                           if (exists) {
  //                               //文件复制成功后向数据库里插入记录
  //                               let insertData = {
  //                                   appId: appId,
  //                                   miniContainerId: miniContainer,
  //                                   url: appBundleId+'/'+fileName,
  //                                   major: jsMajor,
  //                                   minor: jsMinor,
  //                                   patch: jsPatch,
  //                                   isRelative: 1,
  //                                   bundleId: appBundleId
  //                               }
  //                               let versionModel = this.model('version');
  //
  //                               let result = await versionModel.transaction(async () => {
  //                                   return await versionModel.addVersion(insertData);
  //                               });
  //
  //                               if (result) {
  //                                   let ret1 = await this.diffPatch(result, appId);
  //                                   if (ret1) {
  //                                       this.success({
  //                                           errmsg: '添加成功！'
  //                                       });
  //                                   } else {
  //                                       this.fail({
  //                                           errmsg: '生成差分包失败!'
  //                                       });
  //                                   }
  //                               } else {
  //                                   this.fail({
  //                                       errmsg: '上传失败!'
  //                                   });
  //                               }
  //
  //                           } else {
  //                               this.fail({
  //                                   errmsg: '上传失败!'
  //                               });
  //                           }
  //                       });
  //                   }
  //           });
  //           } else {
  //               this.fail({
  //                   errmsg: '该版本已存在!'
  //               })
  //           }
  //       }else {
  //           this.fail({
  //               errmsg: '上传失败!不能存在该最小兼容版本'
  //           })
  //       }
  //   } catch(err){
  //       console.log(err);
  //       this.fail({
  //           errmsg: '上传失败，请刷新后重新上传!'
  //       })
  //   }
  //
  //
  // }

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
    let description = this.get('description');

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
                        // fs.renameSync(bundle, uploadPath+'/'+fileName);
                        fs.writeFileSync(uploadPath+'/'+fileName+'.zip', data);

                        fs.exists(uploadPath+'/'+fileName+'.zip', async (exists) => {
                            if (exists) {
                                //文件复制成功后向数据库里插入记录
                                let insertData = {
                                    appId: appId,
                                    miniContainerId: miniContainer,
                                    url: appBundleId+'/'+fileName+'.zip',
                                    major: jsMajor,
                                    minor: jsMinor,
                                    patch: jsPatch,
                                    isRelative: 1,
                                    bundleId: appBundleId,
                                    description: description
                                }

                                let versionModel = this.model('version');

                                let result = await versionModel.transaction(async () => {
                                    return await versionModel.addVersion(insertData);
                                });

                                await this.increaseContainerUpdateNum(miniContainer);

                                if (result) {
                                    let ret1 = await this.diffPatch(result, appId);

                                    if (ret1) {
                                        this.success({
                                            errmsg: '添加成功！'
                                        });
                                    } else {
                                        this.fail({
                                            errmsg: '生成差分包失败!'
                                        });
                                    }
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

  /**
   * 根据当前上传的bundle与之前所有的bundle进行对比，得到差分包
   * @method diffPatch
   * @param  {[type]}  currId [description]
   * @param  {[type]}  appId  [description]
   * @return {[type]}         [description]
   * @author jimmy
   */
  async diffPatch(curId, appId){
      //获取当前版本的文件信息
      let currVersionInfo = await this.model('version').getVersionInfoById(curId);

      let curBundlePath = bundlePath+currVersionInfo.url;

      fs.readFile(curBundlePath, async (err, data) => {
          if (err) {
              console.log(err);
              return false;
          } else {
              //获取该app之前版本的所有bundle
              let prevVersions = await this.model('version').getVersionListByAppId(appId);
              let insertDatas = [];
              if (!obj.arrIsEmpty(prevVersions)) {
                  let tempBundlePath = '';
                  prevVersions.map((item) => {
                      if (item.id == curId) {
                          return;
                      }
                      tempBundlePath = bundlePath+item.url;
                      try{
                          let bundleData = fs.readFileSync(tempBundlePath);
                          //生成差分包
                          let patch = bsdiff.diff(bundleData, data);
                          //将生成的查分数据保存下来
                          let uploadPath = think.RESOURCE_PATH + '/patch/'+item.bundle_id+'/';
                          fs.exists(uploadPath, (exists) => {
                              if (!exists) {
                                  think.mkdir(uploadPath);
                              }
                          });

                          let fileName = this.formatPatchName(item, currVersionInfo);

                          try{
                              fs.writeFileSync(uploadPath+'/'+fileName, patch);
                          }catch(err){
                              console.log(err);
                              return false;
                          };
                          let exists = fs.existsSync(uploadPath+'/'+fileName);
                          if (exists) {
                              //文件复制成功后向数据库里插入记录
                              let insertData = {
                                  app_id: appId,
                                  path: item.bundle_id+'/'+fileName,
                                  prev_id: item.id,
                                  cur_id: curId,
                                  isRelative: 1,
                                  bundle_id: item.bundle_id,
                              }

                              insertDatas.push(insertData);

                          } else {
                              return false;
                          }
                      }catch(err){
                          console.log(err);
                          return false;
                      };
                  });

                  if (!obj.arrIsEmpty(insertDatas)) {
                      let patchModel = this.model('patch');
                      let result = await patchModel.transaction(async () => {
                          return await patchModel.addManyInfos(insertDatas);
                      });
                      if (!result) {
                          console.log(result);
                          return false;
                      } else {
                          return true;
                      }
                  }
              }
          }
      });

      return true;
  }


  /**
   * 格式化文件名字
   * @method formatPatchName
   * @param  {[type]}        prevVersion [description]
   * @param  {[type]}        curVersion  [description]
   * @return {[type]}                    [description]
   * @author jimmy
   */
  formatPatchName(prevVersion, curVersion){
      let timestamp = process.hrtime();
      let name = timestamp+prevVersion.major+'.'+prevVersion.minor+'.'+prevVersion.patch+'-'+curVersion.major+'.'+curVersion.minor+'.'+curVersion.patch;
      return name;
  }

  /**
   * 更新原生更新版本数
   * @method increasePatchDownloadNum
   * @param  {[type]}                 patchId [description]
   * @return {[type]}                         [description]
   * @author jimmy
   */
  async increaseContainerUpdateNum(containerId){
      return await this.model('container_version').where({id: containerId}).increment('update_num', 1);
  }
}
