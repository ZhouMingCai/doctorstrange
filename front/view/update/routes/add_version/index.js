module.exports = {
  path: './addVersion',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AddVersion'))
    })
  }
}
