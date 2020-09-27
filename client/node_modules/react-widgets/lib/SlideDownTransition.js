"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _css = _interopRequireDefault(require("dom-helpers/css"));

var _height = _interopRequireDefault(require("dom-helpers/height"));

var _transitionEnd = _interopRequireDefault(require("dom-helpers/transitionEnd"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const transitionClasses = {
  [_Transition.ENTERING]: 'rw-slide-transition-entering',
  [_Transition.EXITING]: 'rw-slide-transition-exiting',
  [_Transition.EXITED]: 'rw-slide-transition-exited'
};

class SlideDownTransition extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setContainerHeight", elem => {
      elem.style.height = this.getHeight(elem) + 'px';
    });

    _defineProperty(this, "clearContainerHeight", elem => {
      elem.style.height = '';
    });

    _defineProperty(this, "handleEntered", elem => {
      this.clearContainerHeight(elem);
      if (this.props.onEntered) this.props.onEntered();
    });

    _defineProperty(this, "handleEntering", () => {
      if (this.props.onEntering) this.props.onEntering();
    });

    _defineProperty(this, "handleExit", elem => {
      this.setContainerHeight(elem);
      if (this.props.onExit) this.props.onExit();
    });

    _defineProperty(this, "handleExited", elem => {
      this.clearContainerHeight(elem);
      if (this.props.onExited) this.props.onExited();
    });

    _defineProperty(this, "handleTransitionEnd", (el, done) => {
      (0, _transitionEnd.default)(el.firstChild, done);
    });
  }

  getHeight(container) {
    let content = container.firstChild;
    let margin = parseInt((0, _css.default)(content, 'margin-top'), 10) + parseInt((0, _css.default)(content, 'margin-bottom'), 10);
    let old = container.style.display;
    let height;
    container.style.display = 'block';
    height = ((0, _height.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  }

  render() {
    const {
      children,
      className,
      dropUp
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_Transition.default, {
      appear: true,
      in: this.props.in,
      onEnter: this.setContainerHeight,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered,
      onExit: this.handleExit,
      onExited: this.handleExited,
      addEndListener: this.handleTransitionEnd,
      timeout: undefined
      /*hack*/

    }, (status, innerProps) => /*#__PURE__*/_react.default.createElement("div", Object.assign({}, innerProps, {
      className: (0, _classnames.default)(className, dropUp && 'rw-dropup', transitionClasses[status])
    }), _react.default.cloneElement(children, {
      className: (0, _classnames.default)('rw-slide-transition', children.props.className)
    })));
  }

}

_defineProperty(SlideDownTransition, "propTypes", {
  in: _propTypes.default.bool.isRequired,
  innerClassName: _propTypes.default.string,
  dropUp: _propTypes.default.bool,
  onExit: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func
});

var _default = SlideDownTransition;
exports.default = _default;