'use strict';

(function () {
  var errorMessage = window.domRef.errorTemplate.cloneNode(true);

  var errorBlock = document.querySelector('.error');

  //клик на кнопку закрывает окно
  // и нажание на эскапе
  // и на произвольную область

  window.error = {
    addError: errorMessage
  }
})();
