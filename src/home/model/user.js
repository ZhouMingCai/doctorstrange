'use strict'

import {PasswordHash} from 'phpass';

export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = 'user';
  }


  getEmptyUser(){
      return {
          id: '',
          user_name: '',
          password: '',
          email: '',
          phone: '',
          create_ip: '',
          update_ip: '',
          last_login_ip: '',
          create_time: '',
          update_time: '',
          last_login_time: '',
      }
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
    } else {
        //更新登录ip,以及最近登录时间
        let updateUser = this.getEmptyUser();
        updateUser.id = user.id;
        updateUser.last_login_ip = ip;
        updateUser.last_login_time = new Date();
        let result = await this.updateUser(updateUser);
        if (!result) {
            console.error('更新登录信息失败!');
        }
    }

    return user;
  }


  /**
   * 添加用户
   * @method addUser
   * @param  {[type]} data [description]
   * @param  {[type]} ip   [description]
   * @author jimmy
   */
  async addUser(data, ip) {
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

  /**
   * 更新用户
   * @method updateUser
   * @param  {[type]}   data [description]
   * @return {[type]}        [description]
   * @author jimmy
   */
  async updateUser(data) {
    let info = await this.where({
      id: data.id
    }).find();

    if (think.isEmpty(info)) {
        console.error('USER_NOT_EXIST');
        return false;
    }

    //如果有修改密码
    let password = data.password;
    if (password) {
      password = this.getEncryptPassword(password)
    }

    let updateData = {};
    //更新相应的内容
    ['email', 'phone', 'ip', 'password', 'last_login_ip', 'last_login_time'].forEach((val, name) => {
      if (data[val]) {
        updateData[val] = data[val];
      }
    });
    if (think.isEmpty(updateData)) {
        console.error('DATA_EMPTY')
      return false;
    }
    //更新更新时间
    updateData.update_time = new Date();
    //更新数据
    return await this.where({
      id: data.id
    }).update(updateData);
  }

    /**
    * 根据主键查询用户
    * @method selectUserById
    * @param  {[type]}       id [description]
    * @return {[type]}          [description]
    * @author jimmy
    */
    async selectUserById(id){
        let user = await this.where({
            id: id
        }).find();
        if (think.isEmpty(user)) {
            console.error('USER_NOT_EXIST');
            return 'USER_NOT_EXIST';
        } else {
            return user;
        }
    }
}
