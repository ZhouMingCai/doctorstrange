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

var _revalidator = require('revalidator');

var _revalidator2 = _interopRequireDefault(_revalidator);

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
      var isLogin;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.isLogin();

            case 2:
              isLogin = _context.sent;

              if (!isLogin) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', this.redirect('/'));

            case 5:
              return _context.abrupt('return', this.display(this.templateFile));

            case 6:
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

  _class.prototype.mainAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var isLogin, email, password, validate, ip, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.isLogin();

            case 2:
              isLogin = _context2.sent;

              if (isLogin) {
                _context2.next = 20;
                break;
              }

              email = this.post('email');
              password = this.post('password');
              validate = _revalidator2.default.validate({
                email: email,
                password: password
              }, {
                properties: {
                  email: {
                    required: true,
                    format: 'email',
                    type: 'string',
                    description: '用户名错误'
                  },
                  password: {
                    required: true,
                    pattern: /\w{2,10}/,
                    type: 'string',
                    description: '密码错误'
                  }
                }
              });

              if (validate.valid) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', this.fail('PASSWORD_ERROR'));

            case 9:
              ip = this.ip();
              _context2.next = 12;
              return this.model('admin/user').signin(email, password, ip);

            case 12:
              result = _context2.sent;

              if (!(typeof result === 'string')) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt('return', this.fail(result));

            case 15:
              _context2.next = 17;
              return this.session('userInfo', result);

            case 17:

              if (this.isAjax()) {
                this.success({
                  status: 'ok'
                });
              } else {
                this.redirect('/');
              }
              _context2.next = 21;
              break;

            case 20:
              if (this.isAjax()) {
                this.success({
                  status: 'ok'
                });
              } else {
                this.redirect('/');
              }

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function mainAction() {
      return _ref2.apply(this, arguments);
    }

    return mainAction;
  }();

  _class.prototype.logoutAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var isLogin;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.isLogin();

            case 2:
              isLogin = _context3.sent;

              if (!isLogin) {
                _context3.next = 9;
                break;
              }

              _context3.next = 6;
              return this.session('userInfo', null);

            case 6:

              if (this.isAjax()) {
                this.success({
                  status: 'ok'
                });
              } else {
                this.redirect('/');
              }
              _context3.next = 10;
              break;

            case 9:
              if (this.isAjax()) {
                this.success({
                  status: 'ok'
                });
              } else {
                this.redirect('/');
              }

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function logoutAction() {
      return _ref3.apply(this, arguments);
    }

    return logoutAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=login.js.map