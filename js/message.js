'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

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

  var showSuccess = function () {
    var successMessage = successTemplate.cloneNode(true);

    window.domRef.mainContent.appendChild(successMessage);

    var deleteSuccessBlock = function () {
      window.util.removeElement(successMessage);
      document.removeEventListener('keydown', onSuccessEscapePress);
    };

    var onSuccessEscapePress = function (evt) {
      evt.preventDefault();
      window.util.isEscapeEvent(evt, deleteSuccessBlock);
    };

    document.addEventListener('keydown', onSuccessEscapePress);

    successMessage.addEventListener('click', deleteSuccessBlock);
  };

  window.message = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
