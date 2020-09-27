"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberLocalizer = exports.DateLocalizer = void 0;

var _dates = _interopRequireDefault(require("./dates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// assumes both are supported or none
let supportStyles = false;
new Intl.DateTimeFormat(undefined, {
  // @ts-ignore
  get dateStyle() {
    supportStyles = true;
  }

});
const dateShort = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
};
const timeShort = {
  hour: 'numeric',
  minute: 'numeric'
};
/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */

class IntlDateLocalizer {
  constructor({
    culture = undefined,
    firstOfWeek = 0
  } = {}) {
    _defineProperty(this, "culture", void 0);

    _defineProperty(this, "firstOfWeek", void 0);

    _defineProperty(this, "date", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "datetime", void 0);

    _defineProperty(this, "header", void 0);

    _defineProperty(this, "footer", void 0);

    _defineProperty(this, "weekday", void 0);

    _defineProperty(this, "dayOfMonth", void 0);

    _defineProperty(this, "month", void 0);

    _defineProperty(this, "year", void 0);

    _defineProperty(this, "decade", void 0);

    _defineProperty(this, "century", void 0);

    this.culture = culture;

    this.firstOfWeek = () => firstOfWeek;

    function normalizeFormat(date, format) {
      return typeof format === 'function' ? format(date, culture) : date.toLocaleString(culture, format);
    }

    const formats = {
      date: Intl.DateTimeFormat(culture, supportStyles ? {
        dateStyle: 'short'
      } : dateShort).format,
      time: Intl.DateTimeFormat(culture, supportStyles ? {
        timeStyle: 'short'
      } : timeShort).format,
      datetime: Intl.DateTimeFormat(culture, supportStyles ? {
        dateStyle: 'short',
        timeStyle: 'short'
      } : _objectSpread(_objectSpread({}, dateShort), timeShort)).format,
      header: Intl.DateTimeFormat(culture, {
        month: 'short',
        year: 'numeric'
      }).format,
      weekday: Intl.DateTimeFormat(culture, {
        weekday: 'narrow'
      }).format,
      dayOfMonth: Intl.DateTimeFormat(culture, {
        day: '2-digit'
      }).format,
      month: Intl.DateTimeFormat(culture, {
        month: 'short'
      }).format,
      year: Intl.DateTimeFormat(culture, {
        year: 'numeric'
      }).format,
      decade: date => `${this.year(date)} - ${this.year(_dates.default.endOf(date, 'decade'))}`,
      century: date => `${this.year(date)} - ${this.year(_dates.default.endOf(date, 'century'))}`
    };
    Object.keys(formats).forEach(key => {
      this[key] = (date, format) => format ? normalizeFormat(date, format) : formats[key](date);
    });
  }

  toFormattedParts(date, format = {
    dateStyle: 'short',
    timeStyle: 'short'
  }) {
    return Intl.DateTimeFormat(this.culture, format).formatToParts(date).filter(p => p.type !== 'timeZoneName');
  }

  parse(value) {
    return new Date(value);
  }

}

exports.DateLocalizer = IntlDateLocalizer;

class IntlNumberLocalizer {
  constructor({
    culture = undefined
  } = {}) {
    var _$toLocaleString$m;

    _defineProperty(this, "culture", void 0);

    _defineProperty(this, "decimalCharacter", void 0);

    _defineProperty(this, "format", void 0);

    this.culture = culture;
    const decimal = 'formatToParts' in Intl.NumberFormat(culture) ? Intl.NumberFormat(culture).formatToParts(1.1)[1].value : ((_$toLocaleString$m = 1.1.toLocaleString(culture).match(/[^\d]/)) === null || _$toLocaleString$m === void 0 ? void 0 : _$toLocaleString$m[0]) || '.';
    const formatter = Intl.NumberFormat(culture, {
      maximumFractionDigits: 0
    }).format;

    this.decimalCharacter = () => decimal;

    this.format = (num, format) => {
      if (format) {
        return typeof format === 'function' ? format(num, culture) : num.toLocaleString(culture, format);
      }

      return formatter(num);
    };
  }

  parse(value) {
    return parseFloat(value.replace(this.decimalCharacter(), '.'));
  }

}

exports.NumberLocalizer = IntlNumberLocalizer;