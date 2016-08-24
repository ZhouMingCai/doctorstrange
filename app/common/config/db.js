'use strict';
/**
 * db config
 * @type {Object}
 */

exports.__esModule = true;
exports.default = {
  type: 'mysql',
  adapter: {
    mysql: {
      host: 'songxiaocai.mysql.rds.aliyuncs.com',
      port: '3306',
      database: 'cnpm',
      user: 'cnpm',
      password: 'S_x_c_2015',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {}
  }
};
//# sourceMappingURL=db.js.map