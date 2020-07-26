'use strict';

(function () {
  var ESC_KEY = window.util.ESC_KEY;
  var main = document.querySelector('main');

  var createMessage = function (templateId, state, errorMessageText) {
    var messageTemplate = document.querySelector(templateId).content.querySelector(state);
    var message = messageTemplate.cloneNode(true);
    var messageTitle = message.querySelector(state + '__title');
    var messageBtn = message.querySelector(state + '__button');
    var fragment = document.createDocumentFragment();

    if (state === '.error') {
      messageTitle.textContent = errorMessageText;
    }

    fragment.appendChild(message);
    main.appendChild(fragment);
    var messagePopup = main.querySelector(state);

    messageBtn.addEventListener('click', function () {
      main.removeChild(messagePopup);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        main.removeChild(messagePopup);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target !== document.querySelector(state + '__inner')) {
        main.removeChild(messagePopup);
      }
    });
  };

  var onSuccess = function () {
    createMessage('#success', '.success');
  };

  var onError = function (errorMessageText) {
    createMessage('#error', '.error', errorMessageText);
  };

  window.message = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
