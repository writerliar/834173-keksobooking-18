'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var mainContent = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var filterContainer = map.querySelector('.map__filters-container');

  window.domRef = {
    map: map,
    pinAdvertTemplate: pinAdvertTemplate,
    pinContainer: pinContainer,
    mainPin: mainPin,
    mainContent: mainContent,
    filterContainer: filterContainer
  };
})();
