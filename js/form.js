'use strict';

(function () {
  var setFormLock = function (locked) {
    window.domRef.advertFormParts.forEach(locked ? window.util.setDisabled : window.util.deleteDisabled);
    window.domRef.advertForm.classList[locked ? 'add' : 'remove'](window.util.disabled);
  };

  var roomToCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var capacityToIndex = {};

  window.domRef.capacityList.forEach(function (option) {
    capacityToIndex[option.value] = option.index;
  });

  var isNotSelected = function (options) {
    var selected = +window.domRef.capacityList[window.domRef.capacitySelect.selectedIndex].value;

    return options.indexOf(selected) === -1;
  };

  var getCapacityIndex = function (options) {
    return capacityToIndex[Math.max.apply(null, options)];
  };

  var getRoomValue = function (idx) {
    return window.domRef.roomsSelect.options[idx].value;
  };

  var syncCapacity = function (roomsQuantity) {
    var options = roomToCapacity[roomsQuantity];

    if (isNotSelected(options)) {
      window.domRef.capacitySelect.selectedIndex = getCapacityIndex(options);
    }

    window.domRef.capacityList.forEach(function (option) {
      var hasOption = options.indexOf(+option.value) > -1;
      (hasOption ? window.util.showElement : window.util.hideElement)(option);
    });
  };

  var onRoomChange = function (evt) {
    syncCapacity(evt.target.value);
  };

  window.domRef.roomsSelect.addEventListener('change', onRoomChange);

  syncCapacity(getRoomValue(window.domRef.roomsSelect.selectedIndex));

  window.form = {
    setLock: setFormLock
  };
})();
