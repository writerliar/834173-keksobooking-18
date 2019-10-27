'use strict';

(function () {

  var deleteError = function () {

    var errorBlock = document.querySelector('.error');

    if (errorBlock) {
      var errorButton = errorBlock.querySelector('.error__button');
      var errorText = errorBlock.querySelector('.error__message');

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

  window.error = {
    deleteError: deleteError
  };
})();
