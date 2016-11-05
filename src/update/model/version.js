'use strict'

export default class extends think.model.base {
    init (...args) {
      super.init(...args);
      this.tableName = 'version';
    }

    /**
     * 分页查询版本信息
     * @method getVersionListPageByAppId
     * @param  {[type]}                  appId [description]
     * @return {[type]}                        [description]
     * @author jimmy
     */
    async getVersionListPageByAppId(appId,  page = 0, limit = 10 ){
        let result = await this.page(page, limit).where({
          app_id: appId,
          state: 1
      }).order('id DESC').countSelect();

        /**
         * 查询兼容的原生版本号信息
         * @method if
         * @param  {[type]} result [description]
         * @return {[type]}        [description]
         * @author jimmy
         */
        if (result && typeof result.data.length !== undefined && result.data.length > 0) {
            let containerMap = {};

            result.data.map((item) => {
                let id = item.min_container_version_id;
                item['version_str'] = item.major+'.'+item.minor+'.'+item.patch;
                containerMap[id] = id;
            });

            let ids = [];
            for (let variable in containerMap) {
                if (containerMap.hasOwnProperty(variable)) {
                    ids.push(variable);
                }
            }

            let items = await this.model('container_version').getContainerIdByIds(ids);

            items.map((item) => {
                containerMap[item.id] = {
                    version_str: item.major+'.'+item.minor+'.'+item.patch,
                    create_time: item.create_time,
                };
            })

            result.data.map((item) => {
                item['min_container_version'] = containerMap[item.min_container_version_id];
            })
        }

        return result;

    }

    /**
     * 根据条件查询版本号
     * @method getVersionInfoByVersionInfo
     * @param  {[type]}                    appId           [description]
     * @param  {[type]}                    major           [description]
     * @param  {[type]}                    minor           [description]
     * @param  {[type]}                    patch           [description]
     * @return {[type]}                                    [description]
     * @author jimmy
     */
    async getVersionInfoByVersionInfo(appId, major, minor, patch){
        return await this.where({
            app_id: appId,
            major: major,
            minor: minor,
            patch: patch,
            state: 1
        }).find();
    }

    /**
     * 添加js版本号
     * @method addVersion
     * @param  {[type]}   data [description]
     * @author jimmy
     */
    async addVersion(data){
        return await this.add({
          app_id: data.appId,
          min_container_version_id: data.miniContainerId,
          major: data.major,
          minor: data.minor,
          patch: data.patch,
          bundle_id: data.bundleId,
          is_relative: data.isRelative,
          url: data.url,
          state: 1,
          description: data.description,
        });
    }

    /**
     * 如果使用增量更新还是需要定时对不必要的版本进行清除
     * @method deleteVersion
     * @param  {[type]}      id [description]
     * @return {[type]}         [description]
     * @author jimmy
     */
    async deleteVersion(id){
        return await this.update(
            {state: 0},
            {where: {id: id}}
        )
    }

    /**
     * 获取版本列表
     * @method getVersionListByAppId
     * @param  {[type]}              appId [description]
     * @return {[type]}                    [description]
     * @author jimmy
     */
    async getVersionListByAppId(appId){
        return await this.where({
            app_id: appId,
            state: 1
        }).select();
    }

    /**
     * 根据id获取版本信息
     * @method getVersionInfoById
     * @param  {[type]}           id [description]
     * @return {[type]}              [description]
     * @author jimmy
     */
    async getVersionInfoById(id){
        return await this.where({
            id: id
        }).find();
    }

    /**
     * 获取版本信息
     * @method getVersionInfoByVersion
     * @param  {[type]}                versionInfo [description]
     * @return {[type]}                            [description]
     * @author jimmy
     */
    async getVersionInfoByVersion(versionInfo){
        if (versionInfo) {
            let numStrArr = versionInfo.split('.');
            if (numStrArr.length == 3) {
                let major = numStrArr[0];
                let minor = numStrArr[1];
                let patch = numStrArr[2];

                return await this.where({
                    major: major,
                    minor: minor,
                    patch: patch,
                    state: 1,
                }).find();
            } else {
                return false;
            }
        }

    }

}
