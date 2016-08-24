module.exports = {
  path: 'addApp',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AddApp'))
    })
  }
}
