'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index action
   * @return {Promise} []
   */
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var username, password, email, phone, ip, userModal, status;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              username = this.post('userName');
              password = this.post('password');
              email = this.post('email');
              phone = this.post('phone');
              ip = this.http.ip();
              userModal = this.model('user');
              _context.next = 8;
              return userModal.addUser({
                userName: username,
                email: email,
                password: password,
                phone: phone
              }, ip);

            case 8:
              status = _context.sent;

              if (!(status.type == 'exist')) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', this.fail('用户已存在'));

            case 13:
              if (!(status.type !== 'add')) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', this.fail('ACCOUNT_ERROR'));

            case 15:
              return _context.abrupt('return', this.success(status));

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.addAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var username, password, email, ip, userModal, status;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              username = this.post('username');
              password = this.post('password');
              email = this.post('email');
              ip = this.http.ip();
              userModal = this.model('admin/user');
              _context2.next = 7;
              return userModal.addUser({
                username: username,
                email: email,
                password: password,
                type: 0
              }, ip);

            case 7:
              status = _context2.sent;

              if (!(status.type == 'exist')) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', this.fail('USER_EXIST'));

            case 12:
              if (!(status.type !== 'add')) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', this.fail('ACCOUNT_ERROR'));

            case 14:
              return _context2.abrupt('return', this.success(status));

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function addAction() {
      return _ref2.apply(this, arguments);
    }

    return addAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=register.js.map