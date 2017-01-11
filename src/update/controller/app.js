'use strict';

import Base from './base.js';
import plist from 'plist';
import pngdefry from 'pngdefry';
import md5 from 'js-md5';
import fs from 'fs';
import path from 'path';
import {obj} from '../../tools';

let appIconPath = think.RESOURCE_PATH+'/static/appicon/';

// let BASE_URL = 'http://localhost:3002/static/appicon/';

let BASE_URL = 'http://doctorstrange.songxiaocai.org/static/appicon/';

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
          if (!obj.arrIsEmpty(dataList.data)) {
              dataList.data.map((item) => {
                  if (item.icon) {
                      item.icon = BASE_URL + item.icon;
                  } else {
                      item.icon = BASE_URL + 'default.png';
                  }
              })
          }
          this.success(dataList);
      }
    }


    async appexistAction(){
        let appBundleId = this.post('appBundleId');
        let platform = this.post('platform');
        let appFindResult = await this.model('app').getAppInfoByBundleIdAndPlatform(appBundleId, platform);
        this.success({
            exist: !obj.objIsEmpty(appFindResult)
        });

    }
    /**
     *
     */
    async addappAction(){
        let file = this.file('icon');
        let filepath = file.path;

        let appName = this.get('appName');
        let appBundleId = this.get('appBundleId');
        let description = this.get('description');
        let platform = this.get('platform');

        let appFindResult = await this.model('app').getAppInfoByBundleIdAndPlatform(appBundleId, platform);

        if (obj.objIsEmpty(appFindResult)) {
            md5(appName+appBundleId+platform);
            let hash = md5.create();
            let appKey = hash.hex();

            let iconName = appBundleId+platform+'.png';

            let destPath = path.join(appIconPath, iconName);

            fs.exists(appIconPath, (exists) => {
                if (!exists) {
                    think.mkdir(appIconPath);
                }
                fs.rename(filepath, destPath, async (err) => {
                  if (err) {
                      console.log(err);
                      if (result) {
                          this.fail({
                              errmsg: '添加失败！'
                          })
                      }
                  }
                  fs.stat(destPath, async (err, stats) => {
                    if (err) {
                        console.log(err);
                        if (result) {
                            this.fail({
                                errmsg: '添加失败！'
                            })
                        }
                    }
                    let appModel = this.model('app');
                    let user = await this.getUser();
                    let userId = user.id;
                    let insertData = {
                        app_name: appName,
                        bundle_id: appBundleId,
                        description: description,
                        owner_id: userId,
                        state:1,
                        platform: platform,
                        app_key: appKey,
                        icon: iconName,
                    }
                    let result = await appModel.transaction(async () => {
                        return await appModel.addApp(insertData);
                    });

                    if (result) {
                        this.success({
                            errmsg: '添加成功！'
                        })
                    }
                  });
            });


          });
      } else {
          this.fail({
              errmsg: '添加失败！该应用已存在！'
          })
      }

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
            if (!result.icon) {
                result.icon = BASE_URL + 'default.png';
            } else {
                result.icon = BASE_URL + result.icon;
            }
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
