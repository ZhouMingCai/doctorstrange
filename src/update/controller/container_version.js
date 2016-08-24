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
