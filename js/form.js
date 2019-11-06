'use strict';

(function () {
  var advertForm = document.querySelector('.ad-form');
  var advertFormParts = advertForm.querySelectorAll('fieldset');
  var addressInput = advertForm.querySelector('#address');
  var roomsSelect = advertForm.querySelector('#room_number');
  var capacitySelect = advertForm.querySelector('#capacity');
  var capacityList = capacitySelect.querySelectorAll('option');
  var timeinSelect = advertForm.querySelector('#timein');
  var timeoutSelect = advertForm.querySelector('#timeout');
  var typeSelect = advertForm.querySelector('#type');
  var priceInput = advertForm.querySelector('#price');
  var timeField = advertForm.querySelector('.ad-form__element--time');
  var advertFormResetButton = advertForm.querySelector('.ad-form__reset');

  var setFormLock = function (locked) {
    advertFormParts.forEach(locked ? window.util.setDisabled : window.util.unsetDisabled);
    advertForm.classList[locked ? 'add' : 'remove'](window.util.disabled);
  };

  var roomToCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var priceToType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var valueToIndex = {};

  var isNotSelected = function (options, list, select) {
    var selected = +list[select.selectedIndex].value;

    return options.indexOf(selected) === -1;
  };

  var rewriteValueToIndex = function (list) {
    list.forEach(function (option) {
      valueToIndex[option.value] = option.index;
    });
  };

  var getCriterionIndex = function (options) {
    return valueToIndex[Math.max.apply(null, options)];
  };

  var getRoomValue = function (idx) {
    return roomsSelect.options[idx].value;
  };

  var getTypeValue = function (idx) {
    return typeSelect.options[idx].value;
  };

  var syncCapacity = function (roomsQuantity) {
    var options = roomToCapacity[roomsQuantity];

    rewriteValueToIndex(capacityList);

    if (isNotSelected(options, capacityList, capacitySelect)) {
      capacitySelect.selectedIndex = getCriterionIndex(options);
    }

    capacityList.forEach(function (option) {
      var hasOption = options.indexOf(+option.value) > -1;
      (hasOption ? window.util.showElement : window.util.hideElement)(option);
    });
  };

  var syncTime = function (time) {
    timeoutSelect.value = time;
    timeinSelect.value = time;
  };

  var syncType = function (type) {
    var options = priceToType[type];

    priceInput.min = options;
    priceInput.placeholder = options;
  };

  var onRoomChange = function (evt) {
    syncCapacity(evt.target.value);
  };

  var onTypeChange = function (evt) {
    syncType(evt.target.value);
  };

  var onTimeChange = function (evt) {
    syncTime(evt.target.value);
  };

  roomsSelect.addEventListener('change', onRoomChange);
  syncCapacity(getRoomValue(roomsSelect.selectedIndex));

  typeSelect.addEventListener('change', onTypeChange);
  syncType(getTypeValue(typeSelect.selectedIndex));

  timeField.addEventListener('change', onTimeChange);

  var onResetClick = function () {
    window.map.deactivatePage();
    advertForm.reset();
    window.pin.delete();
    window.card.remove();
    window.map.mainPinReset();
    window.map.renderAddress(window.map.startAddress);
    window.domRef.map.classList.add(window.util.fade);
    window.filter.reset();
    syncCapacity(getRoomValue(roomsSelect.selectedIndex));
  };

  var onFormSend = function () {
    window.message.showSuccess();
    onResetClick();
  };

  var onFormSendError = function (message) {
    window.message.showError(message);
  };

  advertForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(advertForm);

    window.backend.send(formData, onFormSend, onFormSendError);
  });

  advertFormResetButton.addEventListener('click', onResetClick);

  window.form = {
    setLock: setFormLock,
    newAdvert: advertForm,
    addressInput: addressInput
  };
})();
