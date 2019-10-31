'use strict';

(function () {
  var filterAdverts = document.querySelector('.map__filters');
  var typeSelector = filterAdverts.querySelector('#housing-type');
  var filterFormList = document.querySelectorAll('.map__filter, .map__checkbox');

  var PIN_COUNT = 5;

  var activateFilter = function () {
    filterFormList.forEach(window.util.resetDisabled);
  };

  var deactivateFilter = function () {
    filterFormList.forEach(window.util.setDisabled);
  };

  var getTypeValue = function () {
    return typeSelector.value;
  };

  var filterType = function (adverts) {
    if (getTypeValue() === 'any') {
      return adverts.slice(0, PIN_COUNT);
    } else {
      return adverts.filter(function (advert) {
        return advert.offer.type === getTypeValue();
      }).slice(0, PIN_COUNT);
    }
  };

  var onFilterChange = function () {
    var filteredAdverts = filterType(window.pin.adverts);

    window.pin.delete();
    window.pin.add(filteredAdverts);
  };

  filterAdverts.addEventListener('change', window.debounce(onFilterChange));

  window.filter = {
    activate: activateFilter,
    deactivate: deactivateFilter
  };
})();
