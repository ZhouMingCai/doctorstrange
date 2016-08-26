'use strict';

import Base from './base.js';
import revalidate from 'revalidator'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let isLogin = await this.isLogin();

    if (isLogin) {
        let user = await this.session('userInfo');
        
        return this.redirect('/');
    }
    //用户没有登录
    return this.displayError(404.1);
  }
}
