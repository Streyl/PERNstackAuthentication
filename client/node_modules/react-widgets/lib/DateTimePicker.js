"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _DateTimePickerInput = _interopRequireDefault(require("./DateTimePickerInput"));

var _Icon = require("./Icon");

var _Localization = require("./Localization");

var _Popup = _interopRequireDefault(require("./Popup"));

var _TimeInput = _interopRequireDefault(require("./TimeInput"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _dates = _interopRequireDefault(require("./dates"));

var _useDropdownToggle = _interopRequireDefault(require("./useDropdownToggle"));

var _useTabTrap = _interopRequireDefault(require("./useTabTrap"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _WidgetHelpers = require("./WidgetHelpers");

var _useEventCallback = _interopRequireDefault(require("@restart/hooks/useEventCallback"));

var _InputAddon = _interopRequireDefault(require("./InputAddon"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * @example ['openDateTime']
   */
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes.default.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes.default.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: _propTypes.default.number,

  /**
   * A formatting options used to display the date value. For more information about formats
   * visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['default', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
   */
  valueDisplayFormat: _propTypes.default.any,

  /**
   * A formatting options used while the date input has focus. Useful for showing a simpler format for inputing.
   * For more information about formats visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['edit', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
   */
  valueEditFormat: _propTypes.default.any,

  /**
   * Enable the time list component of the picker.
   */
  includeTime: _propTypes.default.bool,
  timePrecision: _propTypes.default.oneOf(['minutes', 'seconds', 'milliseconds']),
  timeInputProps: _propTypes.default.object,

  /** Specify the element used to render the calendar dropdown icon. */
  selectIcon: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: _propTypes.default.elementType,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: _propTypes.default.bool,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: _propTypes.default.bool,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.func]),

  /** @ignore */
  tabIndex: _propTypes.default.any,

  /** @ignore */
  'aria-labelledby': _propTypes.default.string,

  /** @ignore */
  'aria-describedby': _propTypes.default.string,

  /** @ignore */
  localizer: _propTypes.default.any,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  calendarProps: _propTypes.default.object,
  inputProps: _propTypes.default.object,
  messages: _propTypes.default.shape({
    dateButton: _propTypes.default.string,
    timeButton: _propTypes.default.string
  })
};

const defaultProps = _objectSpread(_objectSpread({}, _Calendar.default.defaultProps), {}, {
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  includeTime: true,
  selectIcon: _Icon.calendar,
  formats: {}
});

/**
 * ---
 * subtitle: DatePicker, TimePicker
 * localized: true
 * shortcuts:
 *   - { key: alt + down arrow, label:  open calendar or time }
 *   - { key: alt + up arrow, label: close calendar or time }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * @public
 * @extends Calendar
 */
const DateTimePicker = _react.default.forwardRef((uncontrolledProps, outerRef) => {
  const _useUncontrolled = (0, _uncontrollable.useUncontrolled)(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange'
  }),
        {
    id,
    value,
    onChange,
    onSelect,
    onToggle,
    onKeyDown,
    onKeyPress,
    onCurrentDateChange,
    inputProps,
    calendarProps,
    timeInputProps,
    autoFocus,
    tabIndex,
    disabled,
    readOnly,
    className,
    valueDisplayFormat,
    valueEditFormat,
    containerClassName,
    name,
    selectIcon,
    placeholder,
    includeTime,
    min,
    max,
    open,
    dropUp,
    parse,
    messages,
    formats,
    currentDate,
    popupTransition,
    timePrecision,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby
  } = _useUncontrolled,
        elementProps = _objectWithoutProperties(_useUncontrolled, ["id", "value", "onChange", "onSelect", "onToggle", "onKeyDown", "onKeyPress", "onCurrentDateChange", "inputProps", "calendarProps", "timeInputProps", "autoFocus", "tabIndex", "disabled", "readOnly", "className", "valueDisplayFormat", "valueEditFormat", "containerClassName", "name", "selectIcon", "placeholder", "includeTime", "min", "max", "open", "dropUp", "parse", "messages", "formats", "currentDate", "popupTransition", "timePrecision", "aria-labelledby", "aria-describedby"]);

  const localizer = (0, _Localization.useLocalizer)(messages, formats);
  const ref = (0, _react.useRef)(null);
  const calRef = (0, _react.useRef)(null);
  const tabTrap = (0, _useTabTrap.default)(calRef);
  const inputId = (0, _WidgetHelpers.useInstanceId)(id, '_input');
  const dateId = (0, _WidgetHelpers.useInstanceId)(id, '_date');
  const currentFormat = includeTime ? 'datetime' : 'date';
  const toggle = (0, _useDropdownToggle.default)(open, onToggle);
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, uncontrolledProps, {
    didHandle(focused) {
      if (!focused) {
        toggle.close();
        tabTrap.stop();
      } else if (open) {
        tabTrap.focus();
      }
    }

  });
  const dateParser = (0, _react.useCallback)(str => {
    var _localizer$parseDate, _ref;

    if (typeof parse == 'function') {
      var _parse;

      return (_parse = parse(str, localizer)) !== null && _parse !== void 0 ? _parse : null;
    }

    return (_localizer$parseDate = localizer.parseDate(str, (_ref = parse !== null && parse !== void 0 ? parse : valueEditFormat) !== null && _ref !== void 0 ? _ref : valueDisplayFormat)) !== null && _localizer$parseDate !== void 0 ? _localizer$parseDate : null;
  }, [localizer, parse, valueDisplayFormat, valueEditFormat]);
  /**
   * Handlers
   */

  const handleChange = (0, _useEventCallback.default)((date, str, constrain) => {
    if (readOnly || disabled) return;
    if (constrain) date = inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value //eslint-disable-line eqeqeq
        ) onChange(date, str);
      } else if (!_dates.default.eq(date, value)) {
        onChange(date, str);
      }
    }
  });
  const handleKeyDown = (0, _useEventCallback.default)(e => {
    if (readOnly) return;
    (0, _WidgetHelpers.notify)(onKeyDown, [e]);
    if (e.defaultPrevented) return;

    if (e.key === 'Escape' && open) {
      toggle.close();
    } else if (e.altKey) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        toggle.open();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        toggle.close();
      }
    }
  });
  const handleKeyPress = (0, _useEventCallback.default)(e => {
    (0, _WidgetHelpers.notify)(onKeyPress, [e]);
    if (e.defaultPrevented) return;
  });
  const handleDateSelect = (0, _useEventCallback.default)(date => {
    var _ref$current;

    let dateTime = _dates.default.merge(date, value, currentDate);

    let dateStr = formatDate(date);
    if (!includeTime) toggle.close();
    (0, _WidgetHelpers.notify)(onSelect, [dateTime, dateStr]);
    handleChange(dateTime, dateStr, true);
    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
  });
  const handleTimeChange = (0, _useEventCallback.default)(date => {
    handleChange(date, formatDate(date), true);
  });
  const handleCalendarClick = (0, _useEventCallback.default)(() => {
    if (readOnly || disabled) return; // this.focus()

    toggle();
  });

  const handleOpening = () => {
    tabTrap.start();
    requestAnimationFrame(() => {
      tabTrap.focus();
    });
  };

  const handleClosing = () => {
    tabTrap.stop();
    if (focused) focus();
  };
  /**
   * Methods
   */


  function focus() {
    var _calRef$current, _ref$current2;

    if (open) (_calRef$current = calRef.current) === null || _calRef$current === void 0 ? void 0 : _calRef$current.focus();else (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.focus();
  }

  function inRangeValue(value) {
    if (value == null) return value;
    return _dates.default.max(_dates.default.min(value, max), min);
  }

  function formatDate(date) {
    return date instanceof Date && !isNaN(date.getTime()) ? localizer.formatDate(date, currentFormat) : '';
  }

  (0, _react.useImperativeHandle)(outerRef, () => ({
    focus
  }));
  let shouldRenderList = (0, _WidgetHelpers.useFirstFocusedRender)(focused, open);
  let inputReadOnly = (inputProps === null || inputProps === void 0 ? void 0 : inputProps.readOnly) != null ? inputProps === null || inputProps === void 0 ? void 0 : inputProps.readOnly : readOnly;
  return /*#__PURE__*/_react.default.createElement(_Widget.default, Object.assign({}, elementProps, {
    open: !!open,
    dropUp: dropUp,
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    onKeyDown: handleKeyDown,
    onKeyPress: handleKeyPress
  }, focusEvents, {
    className: (0, _classnames.default)(className, 'rw-datetime-picker')
  }), /*#__PURE__*/_react.default.createElement(_WidgetPicker.default, {
    className: containerClassName
  }, /*#__PURE__*/_react.default.createElement(_DateTimePickerInput.default, Object.assign({}, inputProps, {
    id: inputId,
    ref: ref,
    role: "combobox",
    name: name,
    value: value,
    tabIndex: tabIndex,
    autoFocus: autoFocus,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: inputReadOnly,
    formatter: currentFormat,
    displayFormat: valueDisplayFormat,
    editFormat: valueEditFormat,
    editing: focused,
    localizer: localizer,
    parse: dateParser,
    onChange: handleChange,
    "aria-haspopup": true,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-expanded": !!open,
    "aria-owns": dateId
  })), /*#__PURE__*/_react.default.createElement(_InputAddon.default, {
    icon: selectIcon,
    label: localizer.messages.dateButton(),
    disabled: disabled || readOnly,
    onClick: handleCalendarClick
  })), !!shouldRenderList && /*#__PURE__*/_react.default.createElement(_Popup.default, {
    dropUp: dropUp,
    open: open,
    role: "dialog",
    ref: calRef,
    id: dateId,
    className: "rw-calendar-popup",
    transition: popupTransition,
    onEntering: handleOpening,
    onExited: handleClosing
  }, /*#__PURE__*/_react.default.createElement(_Calendar.default, Object.assign({
    min: min,
    max: max,
    bordered: false
  }, calendarProps, {
    tabIndex: -1,
    value: value,
    autoFocus: false,
    onChange: handleDateSelect,
    currentDate: currentDate,
    onCurrentDateChange: onCurrentDateChange,
    "aria-hidden": !open,
    "aria-live": "polite",
    "aria-labelledby": inputId
  })), includeTime && /*#__PURE__*/_react.default.createElement(_TimeInput.default, Object.assign({}, timeInputProps, {
    value: value,
    precision: timePrecision,
    onChange: handleTimeChange,
    datePart: currentDate
  }))));
});

DateTimePicker.displayName = 'DateTimePicker';
DateTimePicker.propTypes = propTypes;
DateTimePicker.defaultProps = defaultProps;
var _default = DateTimePicker;
exports.default = _default;