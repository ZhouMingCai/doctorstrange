module.exports = {
  path: 'addVersion/:appId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./template/addversion'))
    })
  }
}
