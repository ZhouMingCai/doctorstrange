'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let isLogin = await this.isLogin();
    if (isLogin) {
        return this.redirect('/update/')
    } else {
        this.display();
    }
  }
}
