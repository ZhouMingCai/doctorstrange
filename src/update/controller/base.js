'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */

   async isLogin() {
     let user = await this.session('userInfo') || {};
     return !think.isEmpty(user);
   }

   async getUser() {
       let isLogin = await this.isLogin();
       if (isLogin) {
           let user = await this.session('userInfo');
           let target = Object.assign({}, user);
           delete target.password;
           return target;
       } else {
           return null;
       }
   }
}
