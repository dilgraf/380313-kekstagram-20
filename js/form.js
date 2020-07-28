'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ФОРМОЙ РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ
(function () {
  var ESC_KEY = window.util.ESC_KEY;

  var upload = window.backend.upload;
  var onSuccess = window.message.onSuccess;
  var onError = window.message.onError;

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
    effectLevel.classList.add('hidden');
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

  uploadForm.addEventListener('submit', function (evt) {
    upload(new FormData(uploadForm), onSuccess, onError);
    evt.preventDefault();
    closeForm();
  });

  window.form = {
    photoForm: photoForm,
    hashtagInput: hashtagInput,
    scaleField: scaleField,
    scaleValue: scaleValue,
    imagePreview: imagePreview,
    effectLevel: effectLevel
  };
})();
