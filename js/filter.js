'use strict';

(function () {
  var PIN_COUNT = 5;

  var filterAdverts = document.querySelector('.map__filters');
  var typeSelector = filterAdverts.querySelector('#housing-type');
  var filterFormList = document.querySelectorAll('.map__filter, .map__checkbox');

  var activateFilter = function () {
    filterFormList.forEach(window.util.unsetDisabled);
  };

  var deactivateFilter = function () {
    filterFormList.forEach(window.util.setDisabled);
  };

  // var filterType = function (advert) {
  //   return typeSelector.value === 'any'
  //     || typeSelector.value === advert.offer.value;
  // };
  //
  // var filterAdvert = function (advert) {
  //   return filterType(advert);
  // };
  //
  // var updateFilter = function () {
  //   var filteredAdverts = window.pin.adverts
  //     .filter(filterAdvert())
  //     .slice(0, PIN_COUNT);
  //
  //   window.pin.delete();
  //   window.pin.add(filteredAdverts);
  // };

  var filterType = function (adverts) {
    if (typeSelector.value === 'any') {
      return adverts.slice(0, PIN_COUNT);
    } else {
      return adverts.filter(function (advert) {
        return advert.offer.type === typeSelector.value;
      }).slice(0, PIN_COUNT);
    }
  };

  var updateFilter = function () {
    var filteredAdverts = filterType(window.pin.adverts);

    window.pin.delete();
    window.pin.add(filteredAdverts);
  };

  var onFilterChange = function () {
    window.card.remove();

    updateFilter();
  };

  var onDebouncedFilterChange = window.debounce(onFilterChange);

  filterAdverts.addEventListener('change', onDebouncedFilterChange);

  window.filter = {
    activate: activateFilter,
    deactivate: deactivateFilter,
    update: updateFilter
  };
})();
