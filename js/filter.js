'use strict';

(function () {
  var PIN_COUNT = 5;

  var Prices = {
    MAX: 50000,
    MIN: 10000
  };

  var filterAdverts = document.querySelector('.map__filters');
  var typeSelector = filterAdverts.querySelector('#housing-type');
  var priceSelector = filterAdverts.querySelector('#housing-price');
  var roomsSelector = filterAdverts.querySelector('#housing-rooms');
  var guestsSelector = filterAdverts.querySelector('#housing-guests');
  var featuresField = filterAdverts.querySelector('#housing-features');
  var filterFormList = document.querySelectorAll('.map__filter, .map__checkbox');
  var featuresValue = [];

  var checkPrice = function (price) {
    if (price > Prices.MAX) {
      return 'high';
    }

    if (price < Prices.MIN) {
      return 'low';
    }

    return 'middle';
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
      || priceSelector.value === checkPrice(advert.offer.price);
  };

  var filterRooms = function (advert) {
    return roomsSelector.value === 'any'
      || +roomsSelector.value === advert.offer.rooms;
  };

  var filterGuests = function (advert) {
    return guestsSelector.value === 'any'
      || +guestsSelector.value === advert.offer.guests;
  };

  var filterFeatures = function (advert) {
    var advertFeatures = advert.offer.features;

    var filteredFetures = advertFeatures.filter(function (feature) {
      return featuresValue.includes(feature);
    });

    return featuresValue.length === filteredFetures.length;
  };

  var filterAdvert = function (advert) {
    return filterType(advert)
      && filterPrice(advert)
      && filterRooms(advert)
      && filterGuests(advert)
      && filterFeatures(advert);
  };

  var updateFilter = function () {
    var currentFeatures = featuresField.querySelectorAll('.map__checkbox:checked');

    featuresValue = [];

    currentFeatures.forEach(function (feature) {
      featuresValue.push(feature.value);
    });

    var filteredAdverts = window.pin.adverts
      .filter(filterAdvert)
      .slice(0, PIN_COUNT);

    window.pin.delete();
    window.pin.add(filteredAdverts);
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
