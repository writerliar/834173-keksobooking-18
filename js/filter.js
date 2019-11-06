'use strict';

(function () {
  var PIN_COUNT = 5;

  var filterAdverts = document.querySelector('.map__filters');
  var typeSelector = filterAdverts.querySelector('#housing-type');
  var priceSelector = filterAdverts.querySelector('#housing-price');
  var roomsSelector = filterAdverts.querySelector('#housing-rooms');
  var filterFormList = document.querySelectorAll('.map__filter, .map__checkbox');

  var convertLevelToPrice = function (price) {
    if (price > 50000) {
      return 'high';
    }

    if (price < 10000) {
      return 'low';
    }

    if (price >= 10000 || price <= 50000) {
      return 'middle';
    }
  };

  var activateFilter = function () {
    filterFormList.forEach(window.util.unsetDisabled);
  };

  var deactivateFilter = function () {
    filterFormList.forEach(window.util.setDisabled);
  };

  var filterType = function (advert) {
    return typeSelector.value === 'any'
      || typeSelector.value === advert.offer.type;
  };

  var filterPrice = function (advert) {
    return priceSelector.value === 'any'
      || priceSelector.value === convertLevelToPrice(advert.offer.price);
  };

  // var filterRooms = function (advert) {
  //   return roomsSelector.value === 'any'
  //   ||  roomsSelector.value === advert.offer.rooms;
  // };

  var filterAdvert = function (advert) {
    return filterType(advert)
      && filterPrice(advert);
      // && filterRooms(advert);
  };

  var updateFilter = function () {
    var filteredAdverts = window.pin.adverts
      .filter(filterAdvert)
      .slice(0, PIN_COUNT);

    window.pin.delete();
    window.pin.add(filteredAdverts);

    console.log(window.pin.adverts.filter(filterAdvert));
  };

  var onFilterChange = function () {
    window.card.remove();

    updateFilter();
  };

  var onDebouncedFilterChange = window.debounce(onFilterChange);

  filterAdverts.addEventListener('change', onDebouncedFilterChange);

  var resetFilters = function () {
    filterAdverts.reset();
  };

  window.filter = {
    activate: activateFilter,
    deactivate: deactivateFilter,
    update: updateFilter,
    reset: resetFilters
  };
})();
