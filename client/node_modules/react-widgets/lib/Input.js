"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Input = _react.default.forwardRef((_ref, ref) => {
  let {
    className,
    disabled,
    readOnly,
    value,
    tabIndex,
    type = 'text',
    component: Component = 'input'
  } = _ref,
      props = _objectWithoutProperties(_ref, ["className", "disabled", "readOnly", "value", "tabIndex", "type", "component"]);

  return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, props, {
    ref: ref,
    type: type,
    tabIndex: tabIndex || 0,
    autoComplete: "off",
    disabled: disabled,
    readOnly: readOnly,
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    value: value == null ? '' : value,
    className: (0, _classnames.default)(className, 'rw-input')
  }));
});

Input.displayName = 'Input';
Input.propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  component: _propTypes.default.any
};
var _default = Input;
exports.default = _default;