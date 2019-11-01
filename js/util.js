'use strict';

(function () {
  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630
  };

  var Style = {
    HIDE: 'hidden',
    DISABLED: 'ad-form--disabled',
    FADE: 'map--faded'
  };

  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Esc',
    ESCAPE_IE: 'Escape',
  };

  var ESCAPE_KEYS = [
    KeyboardKey.ESCAPE,
    KeyboardKey.ESCAPE_IE,
  ];

  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
  };

  var isEscapeKey = function (evt) {
    return ESCAPE_KEYS.indexOf(evt.key) > -1;
  };

  var showElement = function (element) {
    element.classList.remove(Style.HIDE);
  };

  var hideElement = function (element) {
    element.classList.add(Style.HIDE);
  };

  var removeElement = function (element) {
    if (element) {
      element.remove();
    }
  };

  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var isEscapeEvent = function (evt, action) {
    if (isEscapeKey(evt)) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (isEnterKey(evt)) {
      action();
    }
  };

  window.util = {
    MapRect: MapRect,
    disabled: Style.DISABLED,
    fade: Style.FADE,
    showElement: showElement,
    hideElement: hideElement,
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    isEnterKey: isEnterKey,
    isEscapeKey: isEscapeKey,
    isEscapeEvent: isEscapeEvent,
    isEnterEvent: isEnterEvent,
    removeElement: removeElement
  };
})();
