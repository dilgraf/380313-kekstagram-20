'use strict';

(function () {
  var ESC_KEY = window.util.ESC_KEY;
  var main = document.querySelector('main');
  var messagePopup;

  var closeMessage = function () {
    main.removeChild(messagePopup);
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onMessageOutsideCLick);
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closeMessage();
    }
  };

  var onMessageOutsideCLick = function (evt) {
    if (evt.target.classList.contains(/\b.*__inner\b/) === false || evt.target.classList.contains(/\b.*__button\b/)) {
      closeMessage();
    }
  };

  var createMessage = function (templateId, state, errorMessageText) {
    var messageTemplate = document.querySelector(templateId).content.querySelector(state);
    var message = messageTemplate.cloneNode(true);
    var messageTitle = message.querySelector(state + '__title');
    var fragment = document.createDocumentFragment();

    if (state === '.error') {
      messageTitle.textContent = errorMessageText;
    }

    fragment.appendChild(message);
    main.appendChild(fragment);
    messagePopup = main.querySelector(state);

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageOutsideCLick);
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
