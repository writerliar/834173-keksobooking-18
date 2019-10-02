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
    ENTER: 'Enter'
  };

  var showElement = function (element) {
    element.classList.remove(Style.HIDE);
  };

  var hideElement = function (element) {
    element.classList.add(Style.HIDE);
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArray = function (array) {
    var newArray = [];
    var newLength = getRandomNumber(0, array.length);

    for (var i = 0; i < newLength; i++) {
      newArray.push(array[i]);
    }

    return newArray;
  };

  var getLocation = function () {
    return {
      x: getRandomNumber(MapRect.LEFT, MapRect.RIGHT),
      y: getRandomNumber(MapRect.TOP, MapRect.BOTTOM)
    };
  };

  var setDisabled = function (element) {
    element.disabled = true;
  };

  var deleteDisabled = function (element) {
    element.disabled = false;
  };

  window.util = {
    Style: Style,
    showElement: showElement,
    hideElement: hideElement,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    getRandomNumber: getRandomNumber,
    // getRandomFeatures: getRandomFeatures,
    getLocation: getLocation,
    KeyboardKey: KeyboardKey,
    setDisabled: setDisabled,
    deleteDisabled: deleteDisabled
  };
})();
