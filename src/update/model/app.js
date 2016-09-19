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
          owner_id: userId
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
            id: appId
        }).find();
    }
}
