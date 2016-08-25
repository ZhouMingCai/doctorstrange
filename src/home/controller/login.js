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
      return this.redirect('/');
    }

    return this.display(this.templateFile);
  }

  async loginAction() {
    let isLogin = await this.isLogin();
    if (!isLogin) {
      let userName = this.post('userName');
      let password = this.post('password');
      let validate = revalidate.validate({
        userName: userName,
        password: password
      }, {
        properties: {
          userName: {
            required: true,
            pattern: /^[A-Za-z0-9]+$/,
            type: 'string',
            description: '用户名错误'
          },
          password: {
            required: true,
            pattern: /^.*[^\s]+.*$/,
            type: 'string',
            description: '密码错误'
          }
        }
      });

      if (!validate.valid) {
        return this.fail('PASSWORD_ERROR');
      }

      let ip = this.ip();
      let result = await this.model('user').login(userName, password, ip);

      if (typeof result === 'string') {
        return this.fail(getMsg(result));
      }

      await this.session('userInfo', result);
        this.success({
          status: 'ok'
        });
    }
    else {
        this.success({
          status: 'ok'
        });
    }
  }

  async logoutAction () {
    let isLogin = await this.isLogin();

    if (isLogin) {
      await this.session('userInfo', null);

      if (this.isAjax()) {
        this.success({
          status: 'ok'
        })
      }
      else {
        this.redirect('/');
      }
    }
    else {
    //   if (this.isAjax()) {
    //     this.success({
    //       status: 'ok'
    //     })
    //   }
    //   else {
        this.redirect('/');
    //   }
    }
  }


  getMsg(msg){
      switch (msg) {
        case 'USER_NOT_EXIST]':
            return '用户不存在!';
        case 'PASSWORD_ERROR':
            return '用户名或密码错误!';
      }
  }
}
