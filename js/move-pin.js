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

      window.domRef.mainPin.style.top = (window.domRef.mainPin.offsetTop - shift.y) + 'px';
      window.domRef.mainPin.style.left = (window.domRef.mainPin.offsetLeft - shift.x) + 'px';

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
