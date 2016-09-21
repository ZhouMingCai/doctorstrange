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
          app_id: appId
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
            for (var variable in containerMap) {
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
          url: data.url
        });
    }
}
