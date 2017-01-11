'use strict'

export default class extends think.model.base {
    init (...args) {
      super.init(...args);
      this.tableName = 'app';
    }

    /**
     * 根据用户id获取app列表
     * @method getAppListByUserId
     * @param  {[type]}           userId     [description]
     * @param  {Number}           [page=0]   [description]
     * @param  {Number}           [limit=10] [description]
     * @return {[type]}                      [description]
     * @author jimmy
     */
    async getAppListByUserId(userId, page = 0, limit = 10){
        return await this.page(page, limit).where({
          owner_id: userId,
          state: 1
        }).countSelect();
    }

    /**
     * 根据appid获取app信息
     * @method getAppInfoById
     * @param  {[type]}       appId [description]
     * @return {[type]}             [description]
     * @author jimmy
     */
    async getAppInfoById(appId){
        return await this.where({
            id: appId,
            state: 1
        }).find();
    }

    /**
     * [data 插入的数据]
     * @type {[type]}
     */
    async addApp(data){
        return await this.add(data);
    }

    /**
     *
     */
    async getAppInfoByBundleIdAndPlatform(bundleId, platform){
        return await this.where({
            bundle_id: bundleId,
            platform: platform,
            state: 1
        }).find();
    }
}
