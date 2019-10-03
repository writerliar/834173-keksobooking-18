'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var getMainPinLocation = function (height) {
    return {
      x: window.domRef.mainPin.offsetLeft + MainPinSize.RADIUS,
      y: window.domRef.mainPin.offsetTop + height
    };
  };

  var renderAddress = function (coords) {
    window.domRef.addressInput.value = coords.x + ', ' + coords.y;
  };

  var deactivatePage = function () {
    window.form.setLock(true);
    renderAddress(getMainPinLocation(MainPinSize.RADIUS));
    window.domRef.mainPin.addEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  var activatePage = function () {
    window.form.setLock(false);
    window.domRef.map.classList.remove(window.util.fade);
    window.domRef.advertForm.classList.remove(window.util.disabled);
    renderAddress(getMainPinLocation(MainPinSize.HEIGHT));
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

  deactivatePage();
})();
