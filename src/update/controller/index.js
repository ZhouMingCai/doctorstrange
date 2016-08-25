'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    return this.display();
    // await this.session('kkk', 'ddd')
    // this.redirect('/home/')
  }
}
