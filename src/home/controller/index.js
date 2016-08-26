'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let result = await this.checkUserPasswordChange();
    if (result === true) {
        this.redirect('/update/');
    } else if (result === false) {
        this.http.message = '密码已更改，请重新登录!';
        this.http.error=403.11;
        this.statusAction(403.11, this.http);
    } else if (typeof result === 'string') {
        if (result == 'USER_NOT_LOGIN') {
            this.display();
        } else {
            this.http.message = '用户不存在，或已经注销!';
            this.http.error=403.11;
            this.statusAction(403.11, this.http);
        }
    }
  }
}
