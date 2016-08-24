module.exports = {
  path: 'loginOrSiginUp/:tabValue',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./template/login_sign_up'))
    })
  }
}
