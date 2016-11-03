'use strict';

import Base from './base.js';
import {obj} from '../../tools';

export default class extends Base {

  async indexAction(){
      let data = {
          major: '1',
          minor: '0',
          patch: '0',
          url: '/index.ios.bundle',
          is_relative: true,
          min_container_version_id: '1'
      };
      let result = await this.model('version').add(data);
      this.success(result);
  }

  /**
   * 获取当前app的所有版本号
   * @method getversionlistpageAction
   * @return {[type]}                 [description]
   * @author jimmy
   */
  async getversionlistpageAction(){
      let isLogin = await this.isLogin();
      if (isLogin) {
          let appId = this.post('appId');
          let pageNum = this.post('pageNum');
          let limit = this.post('limit');

          let result = await this.model('version').getVersionListPageByAppId(appId, pageNum, limit);
          this.success(result);
      } else {
          return this.redirect('/');
      }
  }
  /**
   * 获取当前所有版本
   * @method selectallversionAction
   * @return {[type]}               [description]
   * @author jimmy
   */
  async selectallversionAction(){

      let data = await this.model('version').select();
      this.success(data);
  }

  /**
   * 获取当前最新版本号
   * @method selectlatestAction
   * @return {[type]}           [description]
   * @author jimmy
   */
  async selectlatestAction(){
      //获取应用bundleId
      let bundleId = this.get('bundleId');
      //获取设备版本ID
      let prevVersionId = this.get('versionId');
      //获取设备版本号
      let prevVersion = this.get('version');
      //从数据库查询当前最新版本
      //
      //1.5.6版本后热更新增加了增量更新等大改动，为了避免客户端出错，在此对该版本进行特殊处理，待稳定后将此代码删除

      if (prevVersion === '1.5.6' || !prevVersion) {
          this.fail({
              errorMessage: '无该记录',
          });
      }


      //will desprate

      let data = await this.model('version').where({
          bundle_id: bundleId,
      }).order({
          id: 'DESC',
      }).select();

      let prevVersionData = await this.model('version').getVersionInfoByVersion(prevVersion);
      let result = null;

      if (data && data.length > 0 && prevVersionData) {
          //获取原生app版本信息
          let containerVersion = await this.model('container_version').getVersionInfoById(data[0].min_container_version_id);
          if (!containerVersion || containerVersion.length <= 0) {
              this.fail({
                  errorMessage: '无该记录',
              });
          }

          //如果存在版本号
          if (prevVersionData.id) {
              let patch = await this.model('patch').getPatchInfo(data[0].id, prevVersionData.id);
              if (!obj.objIsEmpty(patch)) {
                  result = this.formatVersion(data[0], containerVersion, patch);
              } else {
                  result = this.formatVersion(data[0], containerVersion);
              }
          } else {
              result = this.formatVersion(data[0], containerVersion);
          }

      } else {
          this.fail({
              errorMessage: '无该记录',
          });
      }
      //返回结果
      this.json(result);
  }

  /**
   * 查询当前的js版本号是否存在
   * @method isversionexistAction
   * @return {[type]}             [description]
   * @author jimmy
   */
  async isversionexistAction(){
      let appId = this.post('appId');
      let major = this.post('major');
      let minor = this.post('minor');
      let patch = this.post('patch');

      let result = await this.model('version').getVersionInfoByVersionInfo(appId, major, minor, patch);

      if (obj.objIsEmpty(result)) {
          this.success(false);
      } else {
          this.success(true);
      }

  }

  /**
   * [formatVersion description]
   * @method formatVersion
   * @param  {[type]}      version          [description]
   * @param  {[type]}      containerVersion [description]
   * @param  {[type]}      patch            [description]
   * @return {[type]}                       [description]
   * @author jimmy
   */
  formatVersion(version, containerVersion, patch){

      let versionData = {
          version: version.major.toString()+'.'+ version.minor.toString() +'.'+ version.patch.toString(),
          minContainerVersion: containerVersion.major.toString()+'.'+ containerVersion.minor.toString()+'.'+ containerVersion.patch,
          versionId: version.id,
          isRelative: version.is_relative == 1,
      };

      patch && patch.id? versionData['patchId']=patch.id:null;
      version.server_url? versionData['serverUrl']=version.server_url : null;
      version.description? versionData['description'] : null;

      return versionData;
  }
}
