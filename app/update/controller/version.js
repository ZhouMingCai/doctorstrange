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

    _class.prototype.indexAction = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var data, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            data = {
                                major: '1',
                                minor: '0',
                                patch: '0',
                                url: '/index.ios.bundle',
                                is_relative: true,
                                min_container_version_id: '1'
                            };
                            _context.next = 3;
                            return this.model('version').add(data);

                        case 3:
                            result = _context.sent;

                            this.success(result);

                        case 5:
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
            var data, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            data = {
                                major: '1',
                                minor: '0',
                                patch: '0',
                                url: '/index.ios.bundle',
                                is_relative: true,
                                min_container_version_id: '1'
                            };
                            _context2.next = 3;
                            return this.model('version').add(data);

                        case 3:
                            result = _context2.sent;

                            this.success(result);

                        case 5:
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

    /**
     * 获取当前所有版本
     * @method selectallversionAction
     * @return {[type]}               [description]
     * @author jimmy
     */


    _class.prototype.selectallversionAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var data;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model('version').select();

                        case 2:
                            data = _context3.sent;

                            this.success(data);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function selectallversionAction() {
            return _ref3.apply(this, arguments);
        }

        return selectallversionAction;
    }();

    /**
     * 获取当前最新版本号
     * @method selectlatestAction
     * @return {[type]}           [description]
     * @author jimmy
     */


    _class.prototype.selectlatestAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var bundleId, data, result, containerVersion;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            //获取应用bundleId
                            bundleId = this.get('bundleId');
                            //从数据库查询数据

                            _context4.next = 3;
                            return this.model('version').where({
                                bundle_id: bundleId
                            }).order({
                                id: 'DESC'
                            }).select();

                        case 3:
                            data = _context4.sent;
                            result = null;

                            if (!(data && data.length > 0)) {
                                _context4.next = 13;
                                break;
                            }

                            _context4.next = 8;
                            return this.model('container_version').where({
                                id: data[0].min_container_version_id
                            }).select();

                        case 8:
                            containerVersion = _context4.sent;


                            if (!containerVersion || containerVersion.length <= 0) {
                                this.fail({
                                    errorMessage: '无该记录'
                                });
                            }
                            result = this.formatVersion(data[0], containerVersion[0]);

                            _context4.next = 14;
                            break;

                        case 13:
                            this.fail({
                                errorMessage: '无该记录'
                            });

                        case 14:
                            //返回结果
                            this.json(result);

                        case 15:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function selectlatestAction() {
            return _ref4.apply(this, arguments);
        }

        return selectlatestAction;
    }();

    /**
     * 格式化版本
     * @method formatVersion
     * @param  {[type]}      version          [description]
     * @param  {[type]}      containerVersion [description]
     * @return {[type]}                       [description]
     * @author jimmy
     */


    _class.prototype.formatVersion = function formatVersion(version, containerVersion) {
        return {
            version: version.major.toString() + '.' + version.minor.toString() + '.' + version.patch.toString(),
            minContainerVersion: containerVersion.major.toString() + '.' + containerVersion.minor.toString() + '.' + containerVersion.patch,
            url: {
                url: version.url,
                isRelative: version.is_relative == 1
            }
        };
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=version.js.map