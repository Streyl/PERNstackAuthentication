"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "elementType", {
  enumerable: true,
  get: function () {
    return _elementType.default;
  }
});
exports.message = exports.accessor = exports.disabled = exports.dateFormat = exports.numberFormat = void 0;

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _createChainableTypeChecker = _interopRequireDefault(require("prop-types-extra/lib/utils/createChainableTypeChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const numberFormat = (0, _createChainableTypeChecker.default)((props, ...args) => props.localizer ? props.localizer.numberPropType(props, ...args) : null);
exports.numberFormat = numberFormat;
const dateFormat = (0, _createChainableTypeChecker.default)((props, ...args) => props.localizer ? props.localizer.datePropType(props, ...args) : null);
exports.dateFormat = dateFormat;
let disabled = (0, _createChainableTypeChecker.default)((...args) => PropTypes.bool(...args));
exports.disabled = disabled;
{
  ;
  disabled.acceptsArray = PropTypes.oneOfType([disabled, PropTypes.array]);
}
const accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
exports.accessor = accessor;
const message = PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]);
exports.message = message;