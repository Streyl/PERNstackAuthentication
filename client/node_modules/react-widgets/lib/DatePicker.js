"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateTimePicker = _interopRequireDefault(require("./DateTimePicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DatePicker extends _react.default.Component {
  constructor(props, context) {
    super(props, context);

    _defineProperty(this, "toggleState", void 0);

    _defineProperty(this, "handleToggle", open => {
      this.toggleState = !!open;
      if (this.props.onToggle) this.props.onToggle(this.toggleState);else this.forceUpdate();
    });

    this.toggleState = props.defaultOpen;
  }

  render() {
    let {
      open
    } = this.props;
    open = open === undefined ? this.toggleState : open;
    return /*#__PURE__*/_react.default.createElement(_DateTimePicker.default, Object.assign({}, this.props, {
      open: open,
      includeTime: false,
      onToggle: this.handleToggle
    }));
  }

}

_defineProperty(DatePicker, "propTypes", {
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  onToggle: _propTypes.default.func
});

var _default = DatePicker;
exports.default = _default;