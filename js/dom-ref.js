'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var advertForm = document.querySelector('.ad-form');
  var advertFormParts = advertForm.querySelectorAll('fieldset');
  var filterFormList = map.querySelectorAll('.map__filter, .map__checkbox');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = advertForm.querySelector('#address');
  var roomsSelect = advertForm.querySelector('#room_number');
  var capacitySelect = advertForm.querySelector('#capacity');
  var capacityList = capacitySelect.querySelectorAll('option');

  window.domRef = {
    map: map,
    pinAdvertTemplate: pinAdvertTemplate,
    pinContainer: pinContainer,
    advertForm: advertForm,
    advertFormParts: advertFormParts,
    filterFormList: filterFormList,
    mainPin: mainPin,
    addressInput: addressInput,
    roomsSelect: roomsSelect,
    capacitySelect: capacitySelect,
    capacityList: capacityList
  };
})();
