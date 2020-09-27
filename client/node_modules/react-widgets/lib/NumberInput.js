"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _canUseDOM = _interopRequireDefault(require("dom-helpers/canUseDOM"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _Input = _interopRequireDefault(require("./Input"));

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let isSign = val => (val || '').trim() === '-';

function isPaddedZeros(str, localizer) {
  let localeChar = localizer.decimalCharacter();
  let [_, decimals] = str.split(localeChar);
  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(str, localizer) {
  let localeChar = localizer.decimalCharacter();
  let lastIndex = str.length - 1;
  if (str.length < 1) return false;
  let char = str[lastIndex];
  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

class NumberPickerInput extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleBlur", event => {
      let str = this.state.stringValue;
      let number = this.parseNumber(str); // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing

      if (this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }

        this.props.onChange(number, event);
      }
    });

    _defineProperty(this, "handleChange", event => {
      let {
        value,
        onChange
      } = this.props;
      let stringValue = event.target.value,
          numberValue = this.parseNumber(stringValue);
      let isIntermediate = this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        this.setStringValue('');
        onChange(null, event);
        return;
      } // order here matters a lot


      if (isIntermediate) {
        this.setStringValue(stringValue);
      } else if (numberValue !== value) {
        onChange(numberValue, event);
      } else if (stringValue != this.state.stringValue) {
        this.setStringValue(stringValue);
      }
    });
  }

  getSnapshotBeforeUpdate({
    editing
  }) {
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      value,
      editing,
      localizer
    } = nextProps;
    let decimal = localizer.decimalCharacter();
    const stringValue = value == null || isNaN(value) ? '' : editing ? ('' + value).replace('.', decimal) : localizer.formatNumber(value
    /*, 'default'*/
    );
    if (prevState.lastValueFromProps !== stringValue) return {
      stringValue,
      lastValueFromProps: stringValue
    };
    return null;
  }

  componentDidUpdate(_, __, {
    reselectText
  }) {
    if (reselectText) (0, _reactDom.findDOMNode)(this).select();
  } // this intermediate state is for when one runs into
  // the decimal or are typing the number


  setStringValue(stringValue) {
    this.setState({
      stringValue
    });
  }

  isIntermediateValue(num, str) {
    let {
      localizer,
      min
    } = this.props;
    return !!(num < min || isSign(str) || isAtDelimiter(str, localizer) || isPaddedZeros(str, localizer));
  }

  isSelectingAllText() {
    const node = _canUseDOM.default && (0, _reactDom.findDOMNode)(this);
    return _canUseDOM.default && (0, _activeElement.default)() === node && node.selectionStart === 0 && node.selectionEnd === node.value.length;
  }

  parseNumber(strVal) {
    let {
      localizer,
      parse: userParse
    } = this.props;
    let delimChar = localizer.decimalCharacter();
    if (userParse) return userParse(strVal, localizer);
    strVal = strVal.replace(delimChar, '.');
    return parseFloat(strVal);
  }

  render() {
    let _this$props = this.props,
        {
      disabled,
      readOnly,
      placeholder,
      // eslint-disable-next-line react/prop-types
      innerRef,
      min,
      max,
      localizer: _,
      // eslint-disable-next-line no-unused-vars
      editing: __
    } = _this$props,
        props = _objectWithoutProperties(_this$props, ["disabled", "readOnly", "placeholder", "innerRef", "min", "max", "localizer", "editing"]);

    let value = this.state.stringValue;
    return /*#__PURE__*/_react.default.createElement(_Input.default, Object.assign({}, props, {
      ref: innerRef,
      className: "rw-widget-input",
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      "aria-valuenow": value
      /*HACK*/
      ,
      "aria-valuemin": isFinite(min) ? min : undefined,
      "aria-valuemax": isFinite(max) ? max : undefined,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  }

}

_defineProperty(NumberPickerInput, "defaultProps", {
  value: null,
  editing: false
});

_defineProperty(NumberPickerInput, "propTypes", {
  value: _propTypes.default.number,
  editing: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  localizer: _propTypes.default.object.isRequired,
  parse: _propTypes.default.func,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,
  onChange: _propTypes.default.func.isRequired
});

var _default = NumberPickerInput;
exports.default = _default;