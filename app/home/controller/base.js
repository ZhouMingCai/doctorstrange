'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * some base method in here
   */

  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var isLogin, token, user, oldDisplay;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.__CLIENT_DATA__ = {};
              this.templateFile = _path2.default.join(__dirname, '../../../view/home/index_index.html');
              _context.next = 4;
              return this.isLogin();

            case 4:
              isLogin = _context.sent;
              _context.next = 7;
              return this.session('__HOTUPDATE__');

            case 7:
              token = _context.sent;

              this.__CLIENT_DATA__.isLogin = isLogin;
              this.__CLIENT_DATA__.token = token;

              if (!isLogin) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return this.session('userInfo');

            case 13:
              user = _context.sent;

              this.__CLIENT_DATA__.username = user.name;

            case 15:
              oldDisplay = this.display;

              this.display = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this2.assign('__CLIENT_DATA__', encodeURIComponent((0, _stringify2.default)(_this2.__CLIENT_DATA__)));
                oldDisplay.apply(_this2, args);
              };

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();

  _class.prototype.isLogin = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var user;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.session('userInfo');

            case 2:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 5;
                break;
              }

              _context2.t0 = {};

            case 5:
              user = _context2.t0;
              return _context2.abrupt('return', !think.isEmpty(user));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function isLogin() {
      return _ref2.apply(this, arguments);
    }

    return isLogin;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map