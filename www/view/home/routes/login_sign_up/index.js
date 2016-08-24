module.exports = {
  path: 'loginOrSiginUp/:tabValue',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/login_sign_up'))
    })
  }
}
