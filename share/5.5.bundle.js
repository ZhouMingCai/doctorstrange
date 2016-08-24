exports.ids = [5];
exports.modules = {

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _login_sign_up = __webpack_require__(126);

	var _login_sign_up2 = _interopRequireDefault(_login_sign_up);

	var _Tabs = __webpack_require__(127);

	var _FontIcon = __webpack_require__(52);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _assignmentInd = __webpack_require__(134);

	var _assignmentInd2 = _interopRequireDefault(_assignmentInd);

	var _input = __webpack_require__(135);

	var _input2 = _interopRequireDefault(_input);

	var _colors = __webpack_require__(4);

	var _RaisedButton = __webpack_require__(72);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _components = __webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	module.exports = function (_Component) {
	    _inherits(LoginSignUp, _Component);

	    function LoginSignUp(props) {
	        _classCallCheck(this, LoginSignUp);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginSignUp).call(this, props));

	        _this.state = {
	            selectValue: props.params.tabValue || 'signUp',
	            userName: '', //用户名
	            password: '', //密码
	            email: '', //邮箱
	            phone: '', //联系电话
	            comfirmPass: '' };
	        _this.timeout = 0;
	        return _this;
	    }

	    _createClass(LoginSignUp, [{
	        key: '_onchangeTab',
	        value: function _onchangeTab(value) {
	            if (value == 'signUp' || value == 'login') {
	                this.setState({
	                    selectValue: value
	                });
	            }
	        }
	    }, {
	        key: '_onTextChange',
	        value: function _onTextChange(element, res) {
	            var _this2 = this;

	            clearTimeout(this.timeout);
	            this.timeout = setTimeout(function () {

	                switch (element) {
	                    case 'userName':
	                        _this2.setState({
	                            userName: res
	                        });
	                        break;
	                    case 'email':
	                        _this2.setState({
	                            email: res
	                        });
	                        break;
	                    case 'password':
	                        _this2.setState({
	                            password: res
	                        });
	                        break;
	                    case 'comfirmPass':
	                        _this2.setState({
	                            comfirmPass: res
	                        });
	                        break;
	                    case 'phone':
	                        _this2.setState({
	                            phone: res
	                        });
	                        break;
	                }
	            }, 500);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            return _react2.default.createElement(
	                'div',
	                { style: _login_sign_up2.default.container },
	                _react2.default.createElement(
	                    'div',
	                    { style: _login_sign_up2.default.inputContainer },
	                    _react2.default.createElement(
	                        _Tabs.Tabs,
	                        {
	                            tabItemContainerStyle: _login_sign_up2.default.tabItemContainerStyle,
	                            onChange: function onChange(value) {
	                                return _this3._onchangeTab(value);
	                            },
	                            value: this.state.selectValue
	                        },
	                        _react2.default.createElement(
	                            _Tabs.Tab,
	                            {
	                                label: '注册',
	                                value: 'signUp',
	                                style: _login_sign_up2.default.tab,
	                                icon: _react2.default.createElement(
	                                    'div',
	                                    null,
	                                    _react2.default.createElement(_assignmentInd2.default, {
	                                        color: this.state.selectValue == 'signUp' ? _colors.green900 : '#4BB25F',
	                                        hoverColor: _colors.green900
	                                    })
	                                )
	                            },
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '用户名',
	                                hintText: '请输入用户名',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'text',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('userName', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '邮箱',
	                                hintText: '请输入您的常用邮箱',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'email',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('email', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '联系电话',
	                                hintText: '请输入您的联系电话',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('phone', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '密码',
	                                hintText: '请输入您的登录密码',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'password',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('password', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '确认密码',
	                                hintText: '请输入您的登录密码',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'password',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('comfirmPass', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(
	                                'div',
	                                { style: _login_sign_up2.default.btnContainer },
	                                _react2.default.createElement(_RaisedButton2.default, { label: '确认注册', style: _login_sign_up2.default.submitBtn, secondary: true })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            _Tabs.Tab,
	                            {
	                                label: '登录',
	                                value: 'login',
	                                style: _login_sign_up2.default.tab,
	                                icon: _react2.default.createElement(
	                                    'div',
	                                    null,
	                                    _react2.default.createElement(_input2.default, {
	                                        color: this.state.selectValue == 'login' ? _colors.green900 : '#4BB25F',
	                                        hoverColor: _colors.green900
	                                    })
	                                )
	                            },
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '用户名',
	                                hintText: '请输入用户名、邮箱或手机号码',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'text',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('userName', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(_components.TextField, {
	                                style: _login_sign_up2.default.input,
	                                floatingLabelText: '密码',
	                                hintText: '请输入您的登录密码',
	                                floatingLabelStyle: _login_sign_up2.default.floatingLabelStyle,
	                                floatingLabelFocusStyle: _login_sign_up2.default.floatingLabelFocusStyle,
	                                underlineFocusStyle: _login_sign_up2.default.underlineStyle,
	                                type: 'password',
	                                onChange: function onChange(event, res) {
	                                    return _this3._onTextChange('password', res);
	                                }
	                            }),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(
	                                'div',
	                                { style: _login_sign_up2.default.btnContainer },
	                                _react2.default.createElement(_RaisedButton2.default, { label: '登录', style: _login_sign_up2.default.submitBtn, secondary: true })
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return LoginSignUp;
	}(_react.Component);

/***/ },

/***/ 126:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        flex: 1,
	        textAlign: 'center'
	    },
	    inputContainer: {
	        textAlign: 'center',
	        display: 'inline-block',
	        background: '#88D3BF',
	        opacity: 0.8,
	        marginTop: 100
	    },
	    label: {
	        fontSize: 25,
	        color: 'white'
	    },
	    errorStyle: {
	        color: '#347462'
	    },
	    underlineStyle: {
	        borderColor: '#347462'
	    },
	    floatingLabelStyle: {
	        color: '#347462'
	    },
	    floatingLabelFocusStyle: {
	        color: '#347462'
	    },
	    input: {
	        marginLeft: 100,
	        marginRight: 100
	    },
	    tabItemContainerStyle: {
	        background: '#F0E248'
	    },
	    tab: {
	        color: '#288E3A'
	    },
	    submitBtn: {
	        flex: 1
	    },
	    btnContainer: {
	        textAlign: 'center',
	        padding: 10,
	        marginTop: 20
	    }

	};

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.Tabs = exports.Tab = undefined;

	var _Tab2 = __webpack_require__(128);

	var _Tab3 = _interopRequireDefault(_Tab2);

	var _Tabs2 = __webpack_require__(129);

	var _Tabs3 = _interopRequireDefault(_Tabs2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.Tab = _Tab3.default;
	exports.Tabs = _Tabs3.default;
	exports.default = _Tabs3.default;

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _simpleAssign = __webpack_require__(22);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _EnhancedButton = __webpack_require__(35);

	var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function getStyles(props, context) {
	  var tabs = context.muiTheme.tabs;

	  return {
	    root: {
	      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
	      fontWeight: 500,
	      fontSize: 14,
	      width: props.width,
	      textTransform: 'uppercase',
	      padding: 0
	    },
	    button: {
	      display: 'flex',
	      flexDirection: 'column',
	      alignItems: 'center',
	      justifyContent: 'center',
	      height: props.label && props.icon ? 72 : 48
	    }
	  };
	}

	var Tab = function (_Component) {
	  _inherits(Tab, _Component);

	  function Tab() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Tab);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tab)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTap = function (event) {
	      if (_this.props.onTouchTap) {
	        _this.props.onTouchTap(_this.props.value, event, _this);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Tab, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var icon = _props.icon;
	      var index = _props.index;
	      var onActive = _props.onActive;
	      var onTouchTap = _props.onTouchTap;
	      var selected = _props.selected;
	      var label = _props.label;
	      var style = _props.style;
	      var value = _props.value;
	      var width = _props.width;

	      var other = _objectWithoutProperties(_props, ['icon', 'index', 'onActive', 'onTouchTap', 'selected', 'label', 'style', 'value', 'width']);

	      var styles = getStyles(this.props, this.context);

	      var iconElement = void 0;
	      if (icon && _react2.default.isValidElement(icon)) {
	        var iconProps = {
	          style: {
	            fontSize: 24,
	            color: styles.root.color,
	            marginBottom: label ? 5 : 0
	          }
	        };
	        // If it's svg icon set color via props
	        if (icon.type.muiName !== 'FontIcon') {
	          iconProps.color = styles.root.color;
	        }
	        iconElement = _react2.default.cloneElement(icon, iconProps);
	      }

	      var rippleOpacity = 0.3;
	      var rippleColor = this.context.muiTheme.tabs.selectedTextColor;

	      return _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
	        style: (0, _simpleAssign2.default)(styles.root, style),
	        focusRippleColor: rippleColor,
	        touchRippleColor: rippleColor,
	        focusRippleOpacity: rippleOpacity,
	        touchRippleOpacity: rippleOpacity,
	        onTouchTap: this.handleTouchTap
	      }), _react2.default.createElement('div', { style: styles.button }, iconElement, label));
	    }
	  }]);

	  return Tab;
	}(_react.Component);

	Tab.muiName = 'Tab';
	Tab.propTypes = {
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
	   */
	  icon: _react.PropTypes.node,
	  /**
	   * @ignore
	   */
	  index: _react.PropTypes.any,
	  /**
	   * Sets the text value of the tab item to the string specified.
	   */
	  label: _react.PropTypes.node,
	  /**
	   * Fired when the active tab changes by touch or tap.
	   * Use this event to specify any functionality when an active tab changes.
	   * For example - we are using this to route to home when the third tab becomes active.
	   * This function will always recieve the active tab as it\'s first argument.
	   */
	  onActive: _react.PropTypes.func,
	  /**
	   * @ignore
	   * This property is overriden by the Tabs component.
	   */
	  onTouchTap: _react.PropTypes.func,
	  /**
	   * @ignore
	   * Defines if the current tab is selected or not.
	   * The Tabs component is responsible for setting this property.
	   */
	  selected: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * If value prop passed to Tabs component, this value prop is also required.
	   * It assigns a value to the tab so that it can be selected by the Tabs.
	   */
	  value: _react.PropTypes.any,
	  /**
	   * @ignore
	   * This property is overriden by the Tabs component.
	   */
	  width: _react.PropTypes.string
	};
	Tab.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = Tab;

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _simpleAssign = __webpack_require__(22);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(41);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _TabTemplate = __webpack_require__(130);

	var _TabTemplate2 = _interopRequireDefault(_TabTemplate);

	var _InkBar = __webpack_require__(131);

	var _InkBar2 = _interopRequireDefault(_InkBar);

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function getStyles(props, context) {
	  var tabs = context.muiTheme.tabs;

	  return {
	    tabItemContainer: {
	      width: '100%',
	      backgroundColor: tabs.backgroundColor,
	      whiteSpace: 'nowrap'
	    }
	  };
	}

	var Tabs = function (_Component) {
	  _inherits(Tabs, _Component);

	  function Tabs() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Tabs);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tabs)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { selectedIndex: 0 }, _this.handleTabTouchTap = function (value, event, tab) {
	      var valueLink = _this.getValueLink(_this.props);
	      var index = tab.props.index;

	      if (valueLink.value && valueLink.value !== value || _this.state.selectedIndex !== index) {
	        valueLink.requestChange(value, event, tab);
	      }

	      _this.setState({ selectedIndex: index });

	      if (tab.props.onActive) {
	        tab.props.onActive(tab);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Tabs, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var valueLink = this.getValueLink(this.props);
	      var initialIndex = this.props.initialSelectedIndex;

	      this.setState({
	        selectedIndex: valueLink.value !== undefined ? this.getSelectedIndex(this.props) : initialIndex < this.getTabCount() ? initialIndex : 0
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps, nextContext) {
	      var valueLink = this.getValueLink(newProps);
	      var newState = {
	        muiTheme: nextContext.muiTheme || this.context.muiTheme
	      };

	      if (valueLink.value !== undefined) {
	        newState.selectedIndex = this.getSelectedIndex(newProps);
	      }

	      this.setState(newState);
	    }
	  }, {
	    key: 'getEvenWidth',
	    value: function getEvenWidth() {
	      return parseInt(window.getComputedStyle(_reactDom2.default.findDOMNode(this)).getPropertyValue('width'), 10);
	    }
	  }, {
	    key: 'getTabs',
	    value: function getTabs() {
	      var tabs = [];
	      _react2.default.Children.forEach(this.props.children, function (tab) {
	        if (_react2.default.isValidElement(tab)) {
	          tabs.push(tab);
	        }
	      });
	      return tabs;
	    }
	  }, {
	    key: 'getTabCount',
	    value: function getTabCount() {
	      return this.getTabs().length;
	    }

	    // Do not use outside of this component, it will be removed once valueLink is deprecated

	  }, {
	    key: 'getValueLink',
	    value: function getValueLink(props) {
	      return props.valueLink || {
	        value: props.value,
	        requestChange: props.onChange
	      };
	    }
	  }, {
	    key: 'getSelectedIndex',
	    value: function getSelectedIndex(props) {
	      var valueLink = this.getValueLink(props);
	      var selectedIndex = -1;

	      this.getTabs().forEach(function (tab, index) {
	        if (valueLink.value === tab.props.value) {
	          selectedIndex = index;
	        }
	      });

	      return selectedIndex;
	    }
	  }, {
	    key: 'getSelected',
	    value: function getSelected(tab, index) {
	      var valueLink = this.getValueLink(this.props);
	      return valueLink.value ? valueLink.value === tab.props.value : this.state.selectedIndex === index;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var contentContainerClassName = _props.contentContainerClassName;
	      var contentContainerStyle = _props.contentContainerStyle;
	      var initialSelectedIndex = _props.initialSelectedIndex;
	      var inkBarStyle = _props.inkBarStyle;
	      var style = _props.style;
	      var tabItemContainerStyle = _props.tabItemContainerStyle;
	      var tabTemplate = _props.tabTemplate;

	      var other = _objectWithoutProperties(_props, ['contentContainerClassName', 'contentContainerStyle', 'initialSelectedIndex', 'inkBarStyle', 'style', 'tabItemContainerStyle', 'tabTemplate']);

	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);
	      var valueLink = this.getValueLink(this.props);
	      var tabValue = valueLink.value;
	      var tabContent = [];
	      var width = 100 / this.getTabCount();

	      var tabs = this.getTabs().map(function (tab, index) {
	        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(tab.type && tab.type.muiName === 'Tab', 'Tabs only accepts Tab Components as children.\n        Found ' + (tab.type.muiName || tab.type) + ' as child number ' + (index + 1) + ' of Tabs') : void 0;

	        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!tabValue || tab.props.value !== undefined, 'Tabs value prop has been passed, but Tab ' + index + '\n        does not have a value prop. Needs value if Tabs is going\n        to be a controlled component.') : void 0;

	        tabContent.push(tab.props.children ? _react2.default.createElement(tabTemplate || _TabTemplate2.default, {
	          key: index,
	          selected: _this2.getSelected(tab, index)
	        }, tab.props.children) : undefined);

	        return _react2.default.cloneElement(tab, {
	          key: index,
	          index: index,
	          selected: _this2.getSelected(tab, index),
	          width: width + '%',
	          onTouchTap: _this2.handleTabTouchTap
	        });
	      });

	      var inkBar = this.state.selectedIndex !== -1 ? _react2.default.createElement(_InkBar2.default, {
	        left: width * this.state.selectedIndex + '%',
	        width: width + '%',
	        style: inkBarStyle
	      }) : null;

	      var inkBarContainerWidth = tabItemContainerStyle ? tabItemContainerStyle.width : '100%';

	      return _react2.default.createElement('div', _extends({}, other, {
	        style: prepareStyles((0, _simpleAssign2.default)({}, style))
	      }), _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)(styles.tabItemContainer, tabItemContainerStyle)) }, tabs), _react2.default.createElement('div', { style: { width: inkBarContainerWidth } }, inkBar), _react2.default.createElement('div', {
	        style: prepareStyles((0, _simpleAssign2.default)({}, contentContainerStyle)),
	        className: contentContainerClassName
	      }, tabContent));
	    }
	  }]);

	  return Tabs;
	}(_react.Component);

	Tabs.propTypes = {
	  /**
	   * Should be used to pass `Tab` components.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * The css class name of the content's container.
	   */
	  contentContainerClassName: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the content's container.
	   */
	  contentContainerStyle: _react.PropTypes.object,
	  /**
	   * Specify initial visible tab index.
	   * If `initialSelectedIndex` is set but larger than the total amount of specified tabs,
	   * `initialSelectedIndex` will revert back to default.
	   * If `initialSlectedIndex` is set to any negative value, no tab will be selected intially.
	   */
	  initialSelectedIndex: _react.PropTypes.number,
	  /**
	   * Override the inline-styles of the InkBar.
	   */
	  inkBarStyle: _react.PropTypes.object,
	  /**
	   * Called when the selected value change.
	   */
	  onChange: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the tab-labels container.
	   */
	  tabItemContainerStyle: _react.PropTypes.object,
	  /**
	   * Override the default tab template used to wrap the content of each tab element.
	   */
	  tabTemplate: _react.PropTypes.func,
	  /**
	   * Makes Tabs controllable and selects the tab whose value prop matches this prop.
	   */
	  value: _react.PropTypes.any
	};
	Tabs.defaultProps = {
	  initialSelectedIndex: 0,
	  onChange: function onChange() {}
	};
	Tabs.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = Tabs;

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var TabTemplate = function (_Component) {
	  _inherits(TabTemplate, _Component);

	  function TabTemplate() {
	    _classCallCheck(this, TabTemplate);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TabTemplate).apply(this, arguments));
	  }

	  _createClass(TabTemplate, [{
	    key: 'render',
	    value: function render() {
	      var styles = {
	        width: '100%',
	        position: 'relative',
	        textAlign: 'initial'
	      };

	      if (!this.props.selected) {
	        styles.height = 0;
	        styles.overflow = 'hidden';
	      }

	      return _react2.default.createElement('div', { style: styles }, this.props.children);
	    }
	  }]);

	  return TabTemplate;
	}(_react.Component);

	TabTemplate.propTypes = {
	  children: _react.PropTypes.node,
	  selected: _react.PropTypes.bool
	};
	exports.default = TabTemplate;

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _simpleAssign = __webpack_require__(22);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _transitions = __webpack_require__(26);

	var _transitions2 = _interopRequireDefault(_transitions);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function getStyles(props, context) {
	  var inkBar = context.muiTheme.inkBar;

	  return {
	    root: {
	      left: props.left,
	      width: props.width,
	      bottom: 0,
	      display: 'block',
	      backgroundColor: props.color || inkBar.backgroundColor,
	      height: 2,
	      marginTop: -2,
	      position: 'relative',
	      transition: _transitions2.default.easeOut('1s', 'left')
	    }
	  };
	}

	var InkBar = function (_Component) {
	  _inherits(InkBar, _Component);

	  function InkBar() {
	    _classCallCheck(this, InkBar);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(InkBar).apply(this, arguments));
	  }

	  _createClass(InkBar, [{
	    key: 'render',
	    value: function render() {
	      var style = this.props.style;
	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);

	      return _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) });
	    }
	  }]);

	  return InkBar;
	}(_react.Component);

	InkBar.propTypes = {
	  color: _react.PropTypes.string,
	  left: _react.PropTypes.string.isRequired,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  width: _react.PropTypes.string.isRequired
	};
	InkBar.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = InkBar;

/***/ },

/***/ 134:
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/assignment-ind");

/***/ },

/***/ 135:
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/input");

/***/ },

/***/ 141:
/***/ function(module, exports) {

	module.exports = require("components");

/***/ }

};;