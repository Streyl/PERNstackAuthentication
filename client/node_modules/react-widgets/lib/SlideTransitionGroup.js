"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _transitionEnd = _interopRequireDefault(require("dom-helpers/transitionEnd"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DirectionPropType = _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']);

const prefix = 'rw-calendar-transition';
const active = `${prefix}-active`;
const next = `${prefix}-next`;
const prev = `${prefix}-prev`;

const clone = (el, cls) => el && _react.default.cloneElement(el, {
  className: (0, _classnames.default)(el.props.className, prefix, cls)
});

class SlideTransitionGroup extends _react.default.Component {
  constructor(args) {
    super(args);

    _defineProperty(this, "isTransitioning", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "current", void 0);

    _defineProperty(this, "flush", void 0);

    _defineProperty(this, "prev", void 0);

    _defineProperty(this, "handleTransitionEnd", hadFocus => {
      this.isTransitioning = false;
      let current = this.container.current.lastChild;
      if (this.props.onTransitionEnd) this.props.onTransitionEnd(current, hadFocus);
    });

    this.current = this.props.children;
    this.container = _react.default.createRef();
    this.state = {
      prevClasses: '',
      currentClasses: ''
    };
  }

  componentDidUpdate() {
    if (!this.flush || this.isTransitioning) return;
    this.flush = false;
    this.isTransitioning = true;
    let previous = this.container.current.firstChild;
    const hadFocus = document.activeElement && previous.contains(document.activeElement);
    this.setState({
      prevClasses: '',
      currentClasses: next
    }, () => {
      let current = this.container.current.lastChild;
      current.clientHeight; // eslint-disable-line

      this.setState({
        prevClasses: prev,
        currentClasses: (0, _classnames.default)(next, active)
      }, () => {
        (0, _transitionEnd.default)(current, () => {
          this.prev = null;

          if (this.current.key !== this.props.children.key) {
            this.current = this.props.children;
          }

          this.setState({
            prevClasses: '',
            currentClasses: ''
          }, () => this.handleTransitionEnd(hadFocus));
        });
      });
    });
  }

  render() {
    let _this$props = this.props,
        {
      direction,
      children,
      onTransitionEnd: _
    } = _this$props,
        props = _objectWithoutProperties(_this$props, ["direction", "children", "onTransitionEnd"]);

    if (!this.isTransitioning) {
      if (this.current.key !== children.key) {
        this.prev = this.current;
        this.flush = true;
      }

      this.current = children;
    }

    let {
      prevClasses,
      currentClasses
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, props, {
      ref: this.container,
      className: (0, _classnames.default)(`${prefix}-group`, `${prefix}-${direction}`)
    }), clone(this.prev, prevClasses), clone(this.current, currentClasses));
  }

}

_defineProperty(SlideTransitionGroup, "defaultProps", {
  direction: 'left'
});

_defineProperty(SlideTransitionGroup, "propTypes", {
  direction: DirectionPropType,
  onTransitionEnd: _propTypes.default.func
});

var _default = SlideTransitionGroup;
exports.default = _default;