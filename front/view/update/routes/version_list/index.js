module.exports = {
  path: 'versionlist/:appId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./template/version_list'))
    })
  }
}
