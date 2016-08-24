'use strict'

import {PasswordHash} from 'phpass';

export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = "user"
  }


  getEncryptPassword(password) {
    let passwordHash = new PasswordHash();
    let hash = passwordHash.hashPassword(password);

    return hash;
  }


  checkPassword(userInfo, password) {
    let passwordHash = new PasswordHash();

    return passwordHash.checkPassword(password, userInfo.password);
  }


  /**
   * 用户登录
   * @method login
   * @param  {[type]} usertext [description]
   * @param  {[type]} password [description]
   * @param  {[type]} ip       [description]
   * @return {[type]}          [description]
   * @author jimmy
   */
  async login(usertext, password, ip) {

    let user = await this.where({
      user_name: usertext,
      email: usertext,
      phone: usertext,
      _logic: 'OR'
    }).find();

    if (think.isEmpty(user)) {
      return 'USER_NOT_EXIST';
    }

    if (user.status > 0) {
      return 'USER_DENY';
    }

    // if (user.type < type) {
    //   return 'USER_NO_PERMISSION';
    // }

    if (!this.checkPassword(user, password)) {
      return 'PASSWORD_ERROR';
    }

    return user;
  }


  addUser(data, ip) {
    let encryptPassword = this.getEncryptPassword(data.password);

    let type = data.type || 0;

    return this.where({
      user_name: data.userName, email: data.email, _logic: 'OR'
    }).thenAdd({
      user_name: data.userName,
      email: data.email,
      phone: data.phone,
      password: encryptPassword,
      create_ip: ip,
      update_ip: ip,
    });
  }

  async updateUser(data, ip) {
    let info = await this.where({
      id: data.id
    }).find();

    if (think.isEmpty(info)) {
      return Promise.reject(new Error('USER_NOT_EXIST'));
    }

    let password = data.password;
    if (password) {
      password = this.getEncryptPassword(password)
    }

    let updateData = {};

    ['avatar', 'phone', 'level', 'type'].forEach((val, name) => {
      if (data[name]) {
        updateData[name] = val;
      }
    });

    if (think.isEmpty(updateData)) {
      return Promise.reject('DATA_EMPTY');
    }

    updateData.last_login_time = Date.now();
    updateData.last_login_ip = ip;

    return this.where({
      id: data.id
    }).update(updateData);
  }
}
