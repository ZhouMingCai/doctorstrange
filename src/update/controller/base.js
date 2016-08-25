'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */

   async isLogin() {
     let user = await this.session('userInfo') || {};
     return !think.isEmpty(user);
   }
}
