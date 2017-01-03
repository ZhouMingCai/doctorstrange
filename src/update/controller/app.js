'use strict';

import Base from './base.js';
import plist from 'plist';
import pngdefry from 'pngdefry';

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
      if (result == 'USER_NOT_EXIST') {
          this.fail(result);
      } else {
          let dataList = await this.model('app').getAppListByUserId(id);
          this.success(dataList);
      }
    }

    async addappAction(){
        let file = this.file('icon');
        let filepath = file.path;

        let appId = this.get('appName');
        let jsMajor = this.get('appBundleId');
        let jsMinor = this.get('description');
        

    }

    /**
     * 根据appID获取app信息
     * @method getappinfobyid
     * @return {[type]}       [description]
     * @author jimmy
     */
    async getappinfobyidAction(){
        let isLogin = await this.isLogin();
        if (isLogin) {
            let appId = this.post('appId');
            let result = await this.model('app').getAppInfoById(appId);
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


    async transformpngandplistAction(){
        let appIcon = this.file('appIcon');
        let infoPlist = this.post('plist');

        this.success({
            msg: 'success'
        });
    }
}
