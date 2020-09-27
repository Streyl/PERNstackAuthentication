"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _SlideDownTransition = _interopRequireDefault(require("./SlideDownTransition"));

var _PropTypes = require("./PropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const StaticContainer = _react.default.memo(({
  children
}) => children, (_, {
  shouldUpdate
}) => !shouldUpdate);

const defaultProps = {
  open: false,
  transition: _SlideDownTransition.default
};
const propTypes = {
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  transition: _PropTypes.elementType,
  role: _propTypes.default.string,
  id: _propTypes.default.string
};

const Popup = _react.default.forwardRef((_ref, ref) => {
  let {
    className,
    dropUp,
    open,
    role,
    id,
    transition,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["className", "dropUp", "open", "role", "id", "transition", "children"]);

  const Transition = transition;
  return /*#__PURE__*/_react.default.createElement(Transition, Object.assign({}, props, {
    in: open,
    dropUp: dropUp,
    timeout: undefined
    /**hack*/
    ,
    className: (0, _classnames.default)('rw-popup-container', className)
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: "rw-popup",
    ref: ref,
    role: role
  }, /*#__PURE__*/_react.default.createElement(StaticContainer, {
    shouldUpdate: open
  }, children)));
});

Popup.displayName = 'Popup';
Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;
var _default = Popup;
exports.default = _default;