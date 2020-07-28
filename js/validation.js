'use strict';

(function () {
  // ВАЛИДАЦИЯ ХЕШТЭГОВ
  var MAX_HASHTAG_AMOUNT = 5;
  var VALID_SYMBOL = /^[#A-Za-zА-ЯЁа-яё0-9]+/gi;
  var EMPTY_HASHTAG_LENGTH = 1;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagInput = window.form.hashtagInput;

  // пушим все ошибки в один массив, без повторений
  var addErrorMessage = function (message, messageArray) {
    if (messageArray.indexOf(message) === -1) {
      messageArray.push(message);
    }
  };

  // цикл, который будет проверять каждый хэштег на соотвествие
  // если встречается ошибка -> setCustomValidity - выводим сообщение об ошибке
  var createErrorMessages = function (hashtagsArray) {
    var errorMessages = [];

    if (hashtagsArray.length > MAX_HASHTAG_AMOUNT) {
      hashtagInput.setCustomValidity(addErrorMessage('Не больше ' + MAX_HASHTAG_AMOUNT + ' хэштегов', errorMessages));
    }

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hashtag = hashtagsArray[i];

      if (!hashtag.startsWith('#')) {
        hashtagInput.setCustomValidity(addErrorMessage('Хэштег должен начинаться с символа #', errorMessages));
      } else if (!hashtag.match(VALID_SYMBOL)) {
        hashtagInput.setCustomValidity(addErrorMessage('Хэштег может содержать только буквы и цифры', errorMessages));
      } else if (hashtag.length === EMPTY_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(addErrorMessage('Хэштег не может быть пустым', errorMessages));
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(addErrorMessage('Не больше 20 символов в хэштеге', errorMessages));
      }
    }

    return errorMessages;
  };

  var onHashtagInput = function () {
    var hashtags = hashtagInput.value.toLowerCase().split(' ');
    var errorMessages = createErrorMessages(hashtags);

    if (errorMessages.length !== 0) {
      hashtagInput.setCustomValidity(errorMessages.join('. \n'));
      hashtagInput.style.border = '2px solid red';
    } else {
      hashtagInput.setCustomValidity('');
      hashtagInput.style.border = '';
    }
  };
  hashtagInput.addEventListener('input', onHashtagInput);
})();
