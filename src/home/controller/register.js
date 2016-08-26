'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
      let username = this.post('userName');
      let password = this.post('password');
      let email = this.post('email');
      let phone = this.post('phone');
      let ip = this.http.ip();

      let userModal = this.model('user');

      let status = await userModal.addUser({
        userName: username,
        email: email,
        password: password,
        phone: phone,
      }, ip);

      if (status.type == 'exist') {
        return this.fail(this.getMsg(status.type));
      }
      else if (status.type !== 'add') {
        return this.fail('ACCOUNT_ERROR');
      }

      return this.success(status);
  }
}
