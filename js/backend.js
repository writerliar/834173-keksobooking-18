'use strict';

(function () {
  var Status = {
    OK: 200
  };

  var TIMEOUT = 10000;

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var RequestUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var request = createRequest(onSuccess, onError);

    request.open(RequestMethod.GET, RequestUrl.GET);
    request.send();
  };

  var send = function (data, onSuccess, onError) {
    var request = createRequest(onSuccess, onError);

    request.open(RequestMethod.POST, RequestUrl.POST);
    request.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
