'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var mainPinStartCoords = {
    x: window.domRef.mainPin.offsetLeft,
    y: window.domRef.mainPin.offsetTop
  };

  var startAddress = {
    x: mainPinStartCoords.x + MainPinSize.RADIUS,
    y: mainPinStartCoords.y + MainPinSize.RADIUS
  };

  var getMainPinLocation = function (height) {
    return {
      x: window.domRef.mainPin.offsetLeft + MainPinSize.RADIUS,
      y: window.domRef.mainPin.offsetTop + height
    };
  };

  var renderAddress = function (coords) {
    window.form.addressInput.value = coords.x + ', ' + coords.y;
  };

  var deactivatePage = function () {
    window.form.setLock(true);
    renderAddress(getMainPinLocation(MainPinSize.RADIUS));
    window.domRef.mainPin.addEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mainPin.addEventListener('keydown', onMainPinEnterPress);
    window.filter.deactivate();
  };

  var activatePage = function () {
    window.form.setLock(false);
    window.domRef.map.classList.remove(window.util.fade);
    window.form.newAdvert.classList.remove(window.util.disabled);
    renderAddress(getMainPinLocation(MainPinSize.HEIGHT));

    window.backend.load(window.pin.onDataLoad, window.pin.onDataLoadError);
  };

  var onMainPinMouseDown = function () {
    activatePage();
    window.domRef.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      activatePage();
      window.domRef.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
      window.domRef.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    }
  };

  var mainPinReset = function () {
    window.domRef.mainPin.style.left = mainPinStartCoords.x + 'px';
    window.domRef.mainPin.style.top = mainPinStartCoords.y + 'px';
  };

  deactivatePage();

  window.map = {
    MainPinSize: MainPinSize,
    renderAddress: renderAddress,
    getMainPinLocation: getMainPinLocation,
    deactivatePage: deactivatePage,
    mainPinReset: mainPinReset,
    startAddress: startAddress
  };
})();
