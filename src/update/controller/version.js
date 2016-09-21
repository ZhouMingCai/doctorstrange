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
      //从数据库查询数据
      let data = await this.model('version').where({
          bundle_id: bundleId,
      }).order({
          id: 'DESC',
      }).select();

      let result = null;

      if (data && data.length > 0) {
          //获取原生app版本信息
          let containerVersion = await this.model('container_version').getVersionInfoById(data[0].min_container_version_id);
          if (!containerVersion || containerVersion.length <= 0) {
              this.fail({
                  errorMessage: '无该记录',
              });
          }
          result = this.formatVersion(data[0], containerVersion);

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
   * 格式化版本
   * @method formatVersion
   * @param  {[type]}      version          [description]
   * @param  {[type]}      containerVersion [description]
   * @return {[type]}                       [description]
   * @author jimmy
   */
  formatVersion(version, containerVersion){
      return {
          version: version.major.toString()+'.'+ version.minor.toString() +'.'+ version.patch.toString(),
          minContainerVersion: containerVersion.major.toString()+'.'+ containerVersion.minor.toString()+'.'+ containerVersion.patch,
          url: {
              url: version.url,
              isRelative: version.is_relative == 1,
          }
      }
  }
}
