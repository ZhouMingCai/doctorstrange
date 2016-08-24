'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _phpass = require('phpass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
  (0, _inherits3.default)(_class, _think$model$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
  }

  _class.prototype.init = function init() {
    var _think$model$base$pro;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_think$model$base$pro = _think$model$base.prototype.init).call.apply(_think$model$base$pro, [this].concat(args));
    this.tableName = "user";
  };

  _class.prototype.getEncryptPassword = function getEncryptPassword(password) {
    var passwordHash = new _phpass.PasswordHash();
    var hash = passwordHash.hashPassword(password);

    return hash;
  };

  _class.prototype.checkPassword = function checkPassword(userInfo, password) {
    var passwordHash = new _phpass.PasswordHash();

    return passwordHash.checkPassword(password, userInfo.password);
  };

  /**
   * 用户登录
   * @method login
   * @param  {[type]} usertext [description]
   * @param  {[type]} password [description]
   * @param  {[type]} ip       [description]
   * @return {[type]}          [description]
   * @author jimmy
   */


  _class.prototype.login = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(usertext, password, ip) {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.where({
                user_name: usertext,
                email: usertext,
                phone: usertext,
                _logic: 'OR'
              }).find();

            case 2:
              user = _context.sent;

              if (!think.isEmpty(user)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', 'USER_NOT_EXIST');

            case 5:
              if (!(user.status > 0)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', 'USER_DENY');

            case 7:
              if (this.checkPassword(user, password)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', 'PASSWORD_ERROR');

            case 9:
              return _context.abrupt('return', user);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return login;
  }();

  _class.prototype.addUser = function addUser(data, ip) {
    var encryptPassword = this.getEncryptPassword(data.password);

    var type = data.type || 0;

    return this.where({
      user_name: data.userName, email: data.email, _logic: 'OR'
    }).thenAdd({
      user_name: data.userName,
      email: data.email,
      phone: data.phone,
      password: encryptPassword,
      create_ip: ip,
      update_ip: ip
    });
  };

  _class.prototype.updateUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data, ip) {
      var info, password, updateData;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.where({
                id: data.id
              }).find();

            case 2:
              info = _context2.sent;

              if (!think.isEmpty(info)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', _promise2.default.reject(new Error('USER_NOT_EXIST')));

            case 5:
              password = data.password;

              if (password) {
                password = this.getEncryptPassword(password);
              }

              updateData = {};


              ['avatar', 'phone', 'level', 'type'].forEach(function (val, name) {
                if (data[name]) {
                  updateData[name] = val;
                }
              });

              if (!think.isEmpty(updateData)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('return', _promise2.default.reject('DATA_EMPTY'));

            case 11:

              updateData.last_login_time = Date.now();
              updateData.last_login_ip = ip;

              return _context2.abrupt('return', this.where({
                id: data.id
              }).update(updateData));

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateUser(_x4, _x5) {
      return _ref2.apply(this, arguments);
    }

    return updateUser;
  }();

  return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=user.js.map