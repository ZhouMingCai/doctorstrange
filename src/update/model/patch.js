'use strict'

export default class extends think.model.base {
    init (...args) {
      super.init(...args);
      this.tableName = 'patch';
    }

    /**
     * 添加差分包信息
     * @method addInfo
     * @param  {[type]} data [description]
     * @author jimmy
     */
    async addInfo(data){
        return await this.add({
            state: 1,
            prev_id: data.prevId,
            cur_id: data.curId,
            bundle_id: data.bundleId,
            op_id: data.opId,
            path: data.path,
            server_url: data.serverUrl,
            app_id: data.appId,
        });
    }

    /**
     * 插入多条数据
     * @method addManyInfos
     * @param  {[type]}     datas [description]
     * @author jimmy
     */
    async addManyInfos(datas){
        return await this.addMany(datas);
    }

    /**
     * 根据当前版本号和最新版本号获取差分包信息
     * @method getPatchInfo
     * @param  {[type]}     curId  [description]
     * @param  {[type]}     prevId [description]
     * @return {[type]}            [description]
     * @author jimmy
     */
    async getPatchInfo(curId, prevId){
        return await this.where({
            cur_id: curId,
            prev_id: prevId,
            state: 1
        }).find();
    }

    /**
     * [getPatchbyId description]
     * @method getPatchbyId
     * @param  {[type]}     id [description]
     * @return {[type]}        [description]
     * @author jimmy
     */
    async getPatchbyId(id){
        return await this.where({
            id: id,
            state: 1
        }).find();
    }
}
