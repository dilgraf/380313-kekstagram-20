'use strict';
(function () {
  var TIMEOUT = 10000;
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';

  var getServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          onError('Неверный запрос');
          break;

        case 401:
          onError('Пользователь не авторизован');
          break;

        case 404:
          onError('Ничего не найдено');
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

  window.backend = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL_LOAD);
    getServerResponse(xhr, onSuccess, onError);
    xhr.send();
  };
})();
