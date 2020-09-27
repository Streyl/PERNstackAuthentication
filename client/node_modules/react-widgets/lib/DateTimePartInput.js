"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const padStart = (value, len, padding) => {
  let str = String(value !== null && value !== void 0 ? value : '');

  while (str.length < len) str = padding + str;

  return str;
};

const DateTimePartInput = _react.default.forwardRef((_ref, ref) => {
  let {
    value,
    valueText = String(value !== null && value !== void 0 ? value : ''),
    pad,
    placeholder,
    min,
    max,
    emptyChar
  } = _ref,
      props = _objectWithoutProperties(_ref, ["value", "valueText", "pad", "placeholder", "min", "max", "emptyChar"]);

  return /*#__PURE__*/_react.default.createElement("input", Object.assign({}, props, {
    ref: ref,
    "data-focusable": true,
    autoComplete: "off",
    role: "spinbutton",
    "aria-valuenow": value !== null && value !== void 0 ? value : void 0,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuetext": valueText,
    "aria-disabled": props.disabled || props.readOnly,
    "arai-placeholder": placeholder,
    placeholder: placeholder,
    className: "rw-time-part-input",
    value: placeholder && !value ? '' : padStart(value, pad || 0, value == null ? emptyChar : '0')
  }));
});

var _default = DateTimePartInput;
exports.default = _default;