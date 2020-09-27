"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDropdownToggle;

var _WidgetHelpers = require("./WidgetHelpers");

function useDropdownToggle(isOpen, onToggle) {
  function open() {
    if (!isOpen) (0, _WidgetHelpers.notify)(onToggle, [true]);
  }

  function close() {
    if (isOpen) (0, _WidgetHelpers.notify)(onToggle, [false]);
  }

  function toggle() {
    if (isOpen) close();else open();
  }

  toggle.open = open;
  toggle.close = close;
  return toggle;
}