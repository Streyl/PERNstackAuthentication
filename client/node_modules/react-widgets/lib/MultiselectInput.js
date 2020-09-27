"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const propTypes = {
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  maxLength: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
};

const MultiselectInput = _react.default.forwardRef((_ref, ref) => {
  let {
    disabled,
    readOnly
  } = _ref,
      props = _objectWithoutProperties(_ref, ["disabled", "readOnly"]);

  let size = Math.max(String(props.value || props.placeholder || '').length, 1) + 1;
  return /*#__PURE__*/_react.default.createElement("input", Object.assign({}, props, {
    size: size,
    ref: ref,
    autoComplete: "off",
    className: "rw-multiselect-input",
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    disabled: disabled,
    readOnly: readOnly
  }));
});

MultiselectInput.displayName = 'MultiselectInput';
MultiselectInput.propTypes = propTypes;
var _default = MultiselectInput;
exports.default = _default;