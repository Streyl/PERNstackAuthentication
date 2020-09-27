"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFocusManager;

var _react = require("react");

var _useFocusManager = _interopRequireDefault(require("@restart/hooks/useFocusManager"));

var _useEventCallback = _interopRequireDefault(require("@restart/hooks/useEventCallback"));

var _useMounted = _interopRequireDefault(require("@restart/hooks/useMounted"));

var _matches = _interopRequireDefault(require("dom-helpers/matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isInDisabledFieldset = node => {
  return !!node && (0, _matches.default)(node, 'fieldset[disabled] *');
};

function useFocusManager(ref, props = {}, opts = {}) {
  const isMounted = (0, _useMounted.default)();
  const [focused, setFocus] = (0, _react.useState)(false);
  const isDisabled = (0, _useEventCallback.default)(() => props.disabled === true || isInDisabledFieldset(ref.current));
  const events = (0, _useFocusManager.default)(_objectSpread(_objectSpread({}, opts), {}, {
    isDisabled,
    onChange: focused => {
      if (isMounted()) setFocus(focused);
    },

    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur'];
      if (handler) handler(event); // @ts-ignore used by work

      if (opts.didHandle && !event.isWidgetDefaultPrevented) opts.didHandle(focused, event);
    }

  }));
  return [events, focused, setFocus];
}