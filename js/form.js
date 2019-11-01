'use strict';

(function () {
  var advertForm = document.querySelector('.ad-form');
  var advertFormParts = advertForm.querySelectorAll('fieldset');

  var addressInput = advertForm.querySelector('#address');
  var roomsSelect = advertForm.querySelector('#room_number');
  var capacitySelect = advertForm.querySelector('#capacity');
  var capacityList = capacitySelect.querySelectorAll('option');

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

  var capacityToIndex = {};

  capacityList.forEach(function (option) {
    capacityToIndex[option.value] = option.index;
  });

  var isNotSelected = function (options) {
    var selected = +capacityList[capacitySelect.selectedIndex].value;

    return options.indexOf(selected) === -1;
  };

  var getCapacityIndex = function (options) {
    return capacityToIndex[Math.max.apply(null, options)];
  };

  var getRoomValue = function (idx) {
    return roomsSelect.options[idx].value;
  };

  var syncCapacity = function (roomsQuantity) {
    var options = roomToCapacity[roomsQuantity];

    if (isNotSelected(options)) {
      capacitySelect.selectedIndex = getCapacityIndex(options);
    }

    capacityList.forEach(function (option) {
      var hasOption = options.indexOf(+option.value) > -1;
      (hasOption ? window.util.showElement : window.util.hideElement)(option);
    });
  };

  var onRoomChange = function (evt) {
    syncCapacity(evt.target.value);
  };

  roomsSelect.addEventListener('change', onRoomChange);

  syncCapacity(getRoomValue(roomsSelect.selectedIndex));

  window.form = {
    setLock: setFormLock,
    newAdvert: advertForm,
    addressInput: addressInput
  };
})();
