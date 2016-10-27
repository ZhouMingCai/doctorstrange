'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * 获取用户app列表
     * @method indexAction
     * @return {[type]}    [description]
     * @author jimmy
     */
    async indexAction(){
      let user = await this.getUser();
      let id = user.id;
      let result = await this.model('home/user').selectUserById(id);
      console.log('ssss',result);
      console.log('ssss',id);
      if (result == 'USER_NOT_EXIST') {
          this.fail(result);
      } else {
          console.log(id);
          let dataList = await this.model('app').getAppListByUserId(id);
          console.log(dataList);
          this.success(dataList);
      }
    }

    /**
     * 根据appID获取app信息
     * @method getappinfobyid
     * @return {[type]}       [description]
     * @author jimmy
     */
    async getappinfobyid(){
        let isLogin = await this.isLogin();
        if (isLogin) {
            let appId = this.post('appId');
            let result = this.model('app').getAppInfoById(appId);
            if (result) {
                this.success(result);
            } else {
                this.fail('NOT_EXIST');
            }
        } else {
            this.redirect('/');
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
