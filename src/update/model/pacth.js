'use strict'

export default class extends think.model.base {
    init (...args) {
      super.init(...args);
      this.tableName = 'pacth';
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
            cur_id: data.currId,
            bundle_id: data.bundleId,
            op_id: data.opId,
            path: data.path,
            server_url: data.serverUrl,
            app_id: data.appId,
        });
    }

    aysnc getPatchInfo(){
        return await this.select()
    }
}
