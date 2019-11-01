'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showError = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);

    window.domRef.mainContent.appendChild(errorMessage);

    var errorText = errorMessage.querySelector('.error__message');

    errorText.textContent = message;

    var errorButton = errorMessage.querySelector('.error__button');

    var deleteErrorBlock = function () {
      window.util.removeElement(errorMessage);
      document.removeEventListener('keydown', onErrorEscapePress);
    };

    var onErrorEscapePress = function (evt) {
      evt.preventDefault();
      window.util.isEscapeEvent(evt, deleteErrorBlock);
    };

    var onErrorButtonClick = function (evt) {
      evt.preventDefault();
      deleteErrorBlock();
    };

    errorButton.addEventListener('click', onErrorButtonClick);

    document.addEventListener('keydown', onErrorEscapePress);

    errorMessage.addEventListener('click', function (evt) {
      if (evt.target !== errorText) {
        deleteErrorBlock();
      }
    });

  };

  window.message = {
    showError: showError
  };
})();
