'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ФОРМОЙ РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ
(function () {
  var ESC_KEY = window.util.ESC_KEY;

  var upload = window.backend.upload;

  var main = document.querySelector('main');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var photoForm = uploadForm.querySelector('.img-upload__overlay');
  var photoFormCancel = uploadForm.querySelector('.img-upload__cancel');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');
  var descriptionInput = uploadForm.querySelector('.text__description');
  var scaleField = photoForm.querySelector('.img-upload__scale');
  var scaleValue = scaleField.querySelector('.scale__control--value');
  var imagePreview = photoForm.querySelector('.img-upload__preview');
  var effectLevel = photoForm.querySelector('.effect-level');

  var onFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY && hashtagInput !== document.activeElement && descriptionInput !== document.activeElement) {
      closeForm();
    }
  };

  var resetForm = function () {
    uploadForm.reset();
    scaleValue.value = '100%';
    imagePreview.style.transform = 'scale(1)';
    imagePreview.style.filter = '';
    imagePreview.className = imagePreview.className.replace(/\beffects__preview--.*\b/, '');
    effectLevel.classList.add('hidden');
  };

  var openForm = function () {
    photoForm.classList.remove('hidden');
    scaleValue.value = '100%';
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    photoForm.classList.add('hidden');
    resetForm();
    document.removeEventListener('keydown', onFormEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openForm();
  });

  photoFormCancel.addEventListener('click', function () {
    closeForm();
  });

  var createMessage = function (templateId, state) {
    var messageTemplate = document.querySelector(templateId).content.querySelector(state);
    var message = messageTemplate.cloneNode(true);
    var messageBtn = message.querySelector(state + '__button');
    var fragment = document.createDocumentFragment();

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
    // При успешной отправке форма закрывается
    // Все данные и фильтры приходят в исх сост
    // Показ сообщения об успешной отправке (в #success внутри template --> main)
    createMessage('#success', '.success');
  };

  var onError = function () {
    // Если данные, введённые в форму, не соответствуют ограничениям - форму невозможно отправить
    // при попытке отправить - неверно заполненные поля подсвечиваются красной рамкой
    // Показ сообщения об ошибке (в #error внутри template --> main)
    createMessage('#error', '.error');
  };

  uploadForm.addEventListener('submit', function (evt) {
    upload(new FormData(uploadForm), onSuccess, onError);
    evt.preventDefault();
    closeForm();
  });

  window.form = {
    uploadForm: uploadForm,
    photoForm: photoForm,
    hashtagInput: hashtagInput,
    scaleField: scaleField,
    scaleValue: scaleValue,
    imagePreview: imagePreview,
    effectLevel: effectLevel
  };
})();
