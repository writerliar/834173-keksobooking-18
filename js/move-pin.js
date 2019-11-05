'use strict';

(function () {
  window.domRef.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var renderNewAddress = function () {
      window.map.renderAddress(window.map.getMainPinLocation(window.map.MainPinSize.HEIGHT));
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      var yMainPinPosition = window.domRef.mainPin.offsetTop - shift.y;

      var xMainPinPosition = window.domRef.mainPin.offsetLeft - shift.x;

      if (yMainPinPosition < window.util.MapRect.TOP - window.map.MainPinSize.HEIGHT) {
        yMainPinPosition = window.util.MapRect.TOP - window.map.MainPinSize.HEIGHT;
      }

      if (yMainPinPosition > window.util.MapRect.BOTTOM - window.map.MainPinSize.HEIGHT) {
        yMainPinPosition = window.util.MapRect.BOTTOM - window.map.MainPinSize.HEIGHT;
      }

      if (xMainPinPosition < window.util.MapRect.LEFT - window.map.MainPinSize.RADIUS) {
        xMainPinPosition = window.util.MapRect.LEFT - window.map.MainPinSize.RADIUS;
      }

      if (xMainPinPosition > window.util.MapRect.RIGHT - window.map.MainPinSize.RADIUS) {
        xMainPinPosition = window.util.MapRect.RIGHT - window.map.MainPinSize.RADIUS;
      }

      window.domRef.mainPin.style.top = yMainPinPosition + 'px';

      window.domRef.mainPin.style.left = xMainPinPosition + 'px';

      renderNewAddress();
    };

    renderNewAddress();

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
