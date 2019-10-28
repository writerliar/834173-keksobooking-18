'use strict';

(function () {

  var showError = function (message) {
    var errorMessage = window.domRef.errorTemplate.cloneNode(true);

    window.domRef.mainContent.appendChild(errorMessage);

    var errorBlock = document.querySelector('.error');
    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = message;

    if (errorBlock) {
      var errorButton = errorBlock.querySelector('.error__button');

      var deleteErrorBlock = function () {
        window.util.deleteElement(errorBlock);
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

      errorBlock.addEventListener('click', function (evt) {
        if (evt.target !== errorText) {
          deleteErrorBlock();
        }
      });
    }

  };

  window.message = {
    showError: showError
  };
})();
