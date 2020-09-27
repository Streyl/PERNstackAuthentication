"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _ = require("./_");

var _dates = _interopRequireDefault(require("./dates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function DecadeView(_ref) {
  let {
    focusedItem,
    disabled,
    onChange,
    value,
    localizer,
    min,
    max
  } = _ref,
      props = _objectWithoutProperties(_ref, ["focusedItem", "disabled", "onChange", "value", "localizer", "min", "max"]);

  const chunks = (0, _react.useMemo)(() => (0, _.chunk)(getDecadeYears(focusedItem), 4), [focusedItem]);
  return /*#__PURE__*/_react.default.createElement(_CalendarView.default, Object.assign({}, props, {
    focusedItem: focusedItem
  }), /*#__PURE__*/_react.default.createElement(_CalendarView.default.Body, null, chunks.map((row, rowIdx) => /*#__PURE__*/_react.default.createElement(_CalendarView.default.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let label = localizer.formatDate(date, 'year');
    return /*#__PURE__*/_react.default.createElement(_CalendarView.default.Cell, {
      key: colIdx,
      unit: "year",
      viewUnit: "decade",
      label: label,
      date: date,
      min: min,
      max: max,
      onChange: onChange,
      focusedItem: focusedItem,
      selected: value,
      disabled: disabled
    }, label);
  })))));
}

function getDecadeYears(_date) {
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let date = _dates.default.add(_dates.default.startOf(_date, 'decade'), -2, 'year');

  return days.map(() => date = _dates.default.add(date, 1, 'year'));
}

var _default = DecadeView;
exports.default = _default;