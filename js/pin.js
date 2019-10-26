'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25
  };

  var renderAdvert = function (advert) {
    var pin = window.domRef.pinAdvertTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;
    pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
    pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';

    return pin;
  };

  var addAdverts = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      fragment.appendChild(renderAdvert(advert));
    });

    window.domRef.pinContainer.appendChild(fragment);
  };

  var onDataLoadError = function (message) {
    window.domRef.mainContent.appendChild(window.error.addError);

    var errorText = document.querySelector('.error__message');

    errorText.textContent = message;

    window.error.deleteError();
  };

  var onDataLoad = function (adverts) {
    addAdverts(adverts);
    window.domRef.filterFormList.forEach(window.util.deleteDisabled);
  };

  window.pin = {
    onDataLoadError: onDataLoadError,
    onDataLoad: onDataLoad
  };
})();
