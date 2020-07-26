'use strict';
(function () {
  var TIMEOUT = 10000;
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var getServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          onError('Сервер не смог обработать запрс');
          break;

        case StatusCode.FORBIDDEN:
          onError('Доступ запрещен');
          break;

        case StatusCode.NOT_FOUND:
          onError('Запрашиваемая страница не найдена, проверьте правильность написания адреса');
          break;

        case StatusCode.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;

        default:
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
  };

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LOAD);
    getServerResponse(xhr, onSuccess, onError);
    xhr.send();
  };

  var uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL_UPLOAD);
    getServerResponse(xhr, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData
  };
})();
