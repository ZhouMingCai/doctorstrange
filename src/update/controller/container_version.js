'use strict';

import Base from './base.js';


export default class extends Base {

  async indexAction(){
      let data = {
          major: '1',
          minor: '0',
          patch: '0',
      };
      let result = await this.model('container_version').add(data);
      this.success(result);
  }

  async addAction(){
      let data = {
          major: '1',
          minor: '0',
          patch: '0',
      };
      let result = await this.model('container_version').add(data);
      this.success(result);
  }

  /**
   * 获取原生版本列表
   * @method getversionlistbyappidAction
   * @return {[type]}                    [description]
   * @author jimmy
   */
  async getversionlistbyappidAction(){
      let appId = this.post('appId');

      let result = await this.model('container_version').getVersionListByAppId(appId);
      if (result && typeof result.length != undefined) {
          result.map((item) => {
              item['version_str']=item.major + '.' + item.minor + '.' + item.patch;
          });

          this.success(result);
      } else {
          this.fail(result);
      }

  }

  /**
   * 获取当前所有版本
   * @method selectallversionAction
   * @return {[type]}               [description]
   * @author jimmy
   */
  async selectallversionAction(){

      let data = await this.model('container_version').select();
      this.success(data);
  }

  /**
   * 获取当前最新版本号
   * @method selectlatestAction
   * @return {[type]}           [description]
   * @author jimmy
   */
  async selectlatestAction(){
      let data = await this.model('container_version').order({
          id: 'DESC',
      }).select();

      let result = null;
      if (data && data.length > 0) {
          result = data[0];
      }

      this.success(result);
  }
}
