'use strict';

import Base from './base.js';
import fs from 'fs';

let bundlePath = think.RESOURCE_PATH+'/bundle/';
let patchPath = think.RESOURCE_PATH+'/patch/';

export default class extends Base {

/**
 * 下载更新文件
 * @method indexAction
 * @return {[type]}    [description]
 * @author jimmy
 */
  async indexAction(){
      let version = this.post('version'); //获取客户端请求的文件
      if (!version) {
          version = this.get('version');
      }

      let patchId = this.post('patchId');
      if (!patchId) {
          patchId = this.get('patchId');
      }

      if (patchId) {
          console.log('patchId', patchId);
          let patchData = await this.model('patch').getPatchbyId(patchId);
          let patchFilePatch = patchPath+patchData.path;
          fs.exists(patchFilePatch, async (exists) => {
              if (!exists) {
                  this.fail('there is nothing');
              } else {
                  await this.increasePatchDownloadNum(patchId);
                  await this.increaseDownloadNum(patchData.cur_id);
                  this.download(patchFilePatch);//下载文件
              }
          });

      } else {
          if (version) {
              console.log('version', version);
              let versionData = await this.model('version').getVersionInfoByVersion(version);
              console.log('version+ '+version, versionData);
              let filePath = bundlePath + versionData.url;
              fs.exists(filePath, async (exists) => {
                  if (!exists) {
                      this.fail('there is nothing');
                  } else {
                      await this.increaseDownloadNum(versionData.id);
                      this.download(filePath);//下载文件
                  }
              });
          } else {
              this.fail('there is nothing');
          }

      }

  }

  /**
   * 通过文件路径下载bundle
   * @method downloadBundleByPath
   * @return {[type]}             [description]
   * @author jimmy
   */
  async downloadbundlebypathAction(){
      let path = this.get('path');
      let filePath = bundlePath + path;
      if (path) {
          fs.exists(filePath, async (exists) => {
              if (!exists) {
                  this.fail('there is nothing');
              } else {
                  this.download(filePath);//下载文件
              }
          });
      } else {
          this.fail('there is nothing');
      }
  }

  /**
   * 更新下载数据
   * @method increaseDownloadNum
   * @param  {[type]}            versionId [description]
   * @return {[type]}                      [description]
   * @author jimmy
   */
  async increaseDownloadNum(versionId){
      return await this.model('version').where({id: versionId}).increment('download_num', 1);
  }

  /**
   * 更新下载数据
   * @method increasePatchDownloadNum
   * @param  {[type]}                 patchId [description]
   * @return {[type]}                         [description]
   * @author jimmy
   */
  async increasePatchDownloadNum(patchId){
      return await this.model('patch').where({id: patchId}).increment('download_num', 1);
  }

}
