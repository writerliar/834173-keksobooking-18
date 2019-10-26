'use strict';

(function () {
  var errorMessage = window.domRef.errorTemplate.cloneNode(true);

  var deleteError = function () {

    var errorBlock = document.querySelector('.error');

    if (errorBlock) {
      var deleteErrorBlock = function () {
        window.util.deleteElement(errorBlock);
      };

      var errorButton = errorBlock.querySelector('.error__button');

      errorButton.addEventListener('click', function () {
        deleteErrorBlock();
      });

      var onDeleteEscapePress = function (evt) {
        window.util.isEscapeEvent(evt, deleteErrorBlock);
      };

      document.addEventListener('keydown', onDeleteEscapePress);

      var errorText = errorBlock.querySelector('.error__message');

      errorBlock.addEventListener('click', function (evt) {
        if (evt.target !== errorText) {
          deleteErrorBlock();
        }
      });
    }

  };

  window.error = {
    addError: errorMessage,
    deleteError: deleteError
  };
})();
