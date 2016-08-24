module.exports = {
  path: '/update/upload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/app'))
    })
  }
}
