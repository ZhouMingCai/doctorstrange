'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
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
    // mysql: {
    //   host: '218.244.135.116',
    //   port: '3306',
    //   database: 'cnpm',
    //   user: 'sxc',
    //   password: '123456',
    //   prefix: 'think_',
    //   encoding: 'utf8'
    // },
  }
};
