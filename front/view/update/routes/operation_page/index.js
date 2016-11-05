module.exports = {
  path: 'operationpage/:appId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./template/operation_page'))
    })
  }
}
