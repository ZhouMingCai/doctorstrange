'use strict';

import Base from './base.js';

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
          let patchData = await this.model('patch').getPatchbyId(patchId);
          let patchFilePatch = patchPath+patchData.path;
          await this.increasePatchDownloadNum(patchId);
          await this.increaseDownloadNum(patchData.cur_id);
          this.download(patchFilePatch);//下载文件
      } else {
          let versionData = await this.model('version').getVersionInfoByVersion(version);
          let filePath = bundlePath + versionData.url;
          await this.increaseDownloadNum(versionData.id);
          this.download(filePath);//下载文件
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
