'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var advertForm = document.querySelector('.ad-form');
  var advertFormParts = advertForm.querySelectorAll('fieldset');
  var filterFormList = map.querySelectorAll('.map__filter, .map__checkbox');
  var addressInput = advertForm.querySelector('#address');
  var roomsSelect = advertForm.querySelector('#room_number');
  var capacitySelect = advertForm.querySelector('#capacity');
  var capacityList = capacitySelect.querySelectorAll('option');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainContent = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var filterAdverts = map.querySelector('.map__filters');
  var filterOfType = filterAdverts.querySelector('#housing-type');
  var filterOfTypeList = filterOfType.querySelectorAll('option');
  var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filterContainer = map.querySelector('.map__filters-container');

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
    capacityList: capacityList,
    errorTemplate: errorTemplate,
    mainContent: mainContent,
    filterOfType: filterOfType,
    filterOfTypeList: filterOfTypeList,
    pinCardTemplate: pinCardTemplate,
    filterContainer: filterContainer
  };
})();
