"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Combobox = _interopRequireDefault(require("./Combobox"));

var _uncontrollable = require("uncontrollable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Autocomplete(props) {
  const [open, onToggle] = (0, _uncontrollable.useUncontrolledProp)(props.open, props.defaultOpen, props.onToggle);
  const [value, onChange] = (0, _uncontrollable.useUncontrolledProp)(props.value, props.defaultValue, props.onChange);

  const handleChange = (value, meta) => {
    onChange(value, meta);

    if (!value && open) {
      onToggle(false);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Combobox.default, Object.assign({}, props, {
    hideCaret: true,
    hideEmptyPopup: true,
    value: value,
    onChange: handleChange,
    open: open,
    onToggle: onToggle
  }));
}

var _default = Autocomplete;
exports.default = _default;