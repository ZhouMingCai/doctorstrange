'use strict';
import path from 'path'

export default class extends think.controller.base {
  /**
   * some base method in here
   */

   async __before() {
       this.__CLIENT_DATA__ = {};
       this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');
       let isLogin = await this.isLogin();
       let token = await this.session('__HOTUPDATE__');
       this.__CLIENT_DATA__.isLogin = isLogin;
       this.__CLIENT_DATA__.token = token;

       if (isLogin) {
           let user = await this.session('userInfo');
           this.__CLIENT_DATA__.username = user.name;
       }

       let oldDisplay = this.display;
       this.display = (...args) => {

         this.assign('__CLIENT_DATA__', encodeURIComponent(JSON.stringify(this.__CLIENT_DATA__)));
         oldDisplay.apply(this, args);
       }
   }


   async isLogin() {
     let user = await this.session('userInfo') || {};
     return !think.isEmpty(user);
   }

   getMsg(msg){
       switch (msg) {
         case 'USER_NOT_EXIST]':
             return '用户不存在!';
         case 'PASSWORD_ERROR':
             return '用户名或密码错误!';
         case 'exist' :
             return '用户已存在!';
       }
   }

   /**
    * 获取用户信息，带密码
    * @method getUserWithPassword
    * @return {[type]}            [description]
    * @author jimmy
    */
   async getUserWithPassword() {
       let isLogin = await this.isLogin();
       if (isLogin) {
           let user = await this.session('userInfo');
           return user;
       } else {
           return null;
       }
   }

   /**
    * 将session中的用户信息与数据库中的用户信息做对比，检查用户密码是否已经修改
    * @method checkUserPasswordChange
    * @return {[type]}                [description]
    * @author jimmy
    */
   async checkUserPasswordChange(){
       let isLogin = await this.isLogin();
       if (isLogin) {
           //获取用户信息并查询用户
           let userInfo = await this.getUserWithPassword();

           let userId = userInfo.id;

           let result = await this.model('user').selectUserById(userId);
           if(typeof result === 'string'){
               return result;
           } else {
               let r = userInfo.password == result.password;
               if (r) {
                   return true;
               } else {
                   //清楚session
                   await this.session('userInfo', null);
                   return false;
               }
           }
       } else {
           return 'USER_NOT_LOGIN';
       }
   }

   /**
    * 获取不带密码的用户信息
    * @method getUser
    * @return {[type]} [description]
    * @author jimmy
    */
   async getUser() {
       let isLogin = await this.isLogin();
       if (isLogin) {
           let user = await this.session('userInfo');
           console.log(user);
           let target = Object.assign({}, user);
           delete target.password;
           return target;
       } else {
           return null;
       }
   }

}
