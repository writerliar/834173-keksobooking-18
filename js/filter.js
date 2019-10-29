'use strict';

(function () {
  var filterAdverts = function (adverts) {
    var getTypeValue = function (idx) {
      return window.domRef.filterOfType.options[idx].value;
    };

    var typeOfHousing;
    var sameTypeOfHousing;

    window.domRef.filterOfType.addEventListener('change', function () {
      typeOfHousing = getTypeValue(window.domRef.filterOfType.selectedIndex);

      sameTypeOfHousing = adverts.filter(function (advert) {
        return advert.offer.type === typeOfHousing;
      });

      window.pin.addAdverts(sameTypeOfHousing);
      // console.log(typeOfHousing);
      // console.log(sameTypeOfHousing);
    });

    window.pin.addAdverts(adverts);
  };

  window.filter = {
    filterAdverts: filterAdverts
  };
})();
