"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _List = _interopRequireWildcard(require("./List"));

var _FocusListContext = require("./FocusListContext");

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _ = require("./_");

var _Accessors = require("./Accessors");

var _WidgetHelpers = require("./WidgetHelpers");

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _Widget = require("./Widget");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const propTypes = {
  data: _propTypes.default.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  onSelect: _propTypes.default.func,
  onMove: _propTypes.default.func,
  onHoverOption: _propTypes.default.func,
  optionComponent: _propTypes.default.elementType,
  renderItem: _propTypes.default.func,
  renderGroup: _propTypes.default.func,
  focusedItem: _propTypes.default.any,
  selectedItem: _propTypes.default.any,
  searchTerm: _propTypes.default.string,
  disabled: CustomPropTypes.disabled.acceptsArray,
  messages: _propTypes.default.shape({
    emptyList: _propTypes.default.func.isRequired
  })
};

const Listbox = _react.default.forwardRef(function Listbox(_ref, _outerRef) {
  let {
    defaultValue,
    value: propsValue,
    onChange: propsOnChange,
    textField,
    dataKey,
    data,
    onKeyDown,
    disabled,
    readOnly,
    onBlur,
    onFocus,
    multiple
  } = _ref,
      props = _objectWithoutProperties(_ref, ["defaultValue", "value", "onChange", "textField", "dataKey", "data", "onKeyDown", "disabled", "readOnly", "onBlur", "onFocus", "multiple"]);

  const [value, onChange] = (0, _uncontrollable.useUncontrolledProp)(propsValue, defaultValue, propsOnChange);
  const accessors = (0, _Accessors.useAccessors)(textField, dataKey);
  const dataItems = (0, _react.useMemo)(() => (0, _.makeArray)(value, multiple).map(item => accessors.findOrSelf(data, item)), [value, multiple, accessors, data]);
  const ref = (0, _react.useRef)(null);
  const lastItemRef = (0, _react.useRef)(dataItems[dataItems.length - 1]);
  const list = (0, _FocusListContext.useFocusList)({
    scope: ref,
    anchorItem: lastItemRef.current
  });
  const isDisabled = disabled === true;

  const handleChange = (dataItem, meta) => {
    if (isDisabled || readOnly) return;
    lastItemRef.current = meta.dataItem;
    onChange(dataItem, meta);
  };

  const handleSelect = (0, _List.useHandleSelect)(!!multiple, dataItems, handleChange);
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, {
    disabled: isDisabled,
    onBlur,
    onFocus
  }, {
    didHandle(focused) {
      if (!focused) {
        list.focus(undefined);
      } else {
        focus({
          preventScroll: true
        });
      }
    }

  });

  function focus(opts) {
    if (ref.current) ref.current.focus(opts);
  }

  const handleKeyDown = e => {
    if (isDisabled || readOnly) return;
    let {
      key,
      shiftKey
    } = e;
    (0, _WidgetHelpers.notify)(onKeyDown, [e]);
    if (e.defaultPrevented) return;

    if (key === 'End' && !shiftKey) {
      e.preventDefault();
      list.focus(list.last());
    } else if (key === 'Home' && !shiftKey) {
      e.preventDefault();
      list.focus(list.first());
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      if (list.getFocused()) handleSelect(list.getFocused(), e);
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      list.focus(list.next());
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      list.focus(list.prev());
    }
  };

  const widgetProps = (0, _Widget.useWidgetProps)({
    focused,
    readOnly,
    disabled: isDisabled,
    className: (0, _classnames.default)(props.className, 'rw-listbox rw-widget-input rw-widget')
  });
  return /*#__PURE__*/_react.default.createElement(_FocusListContext.FocusListContext.Provider, {
    value: list.context
  }, /*#__PURE__*/_react.default.createElement(_List.default, Object.assign({}, props, widgetProps, {
    disabled: disabled,
    tabIndex: isDisabled ? -1 : 0,
    data: data,
    elementRef: ref,
    value: dataItems,
    multiple: multiple,
    accessors: accessors
  }, focusEvents, {
    onChange: handleChange,
    onKeyDown: handleKeyDown
  })));
});

Listbox.displayName = 'Listbox';
Listbox.propTypes = propTypes;
var _default = Listbox;
exports.default = _default;