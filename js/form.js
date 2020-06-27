'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ФОРМОЙ РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ
(function () {
  var ESC_KEY = window.util.ESC_KEY;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var photoForm = uploadForm.querySelector('.img-upload__overlay');
  var photoFormCancel = uploadForm.querySelector('.img-upload__cancel');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');
  var descriptionInput = uploadForm.querySelector('.text__description');

  var onFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY && hashtagInput !== document.activeElement && descriptionInput !== document.activeElement) {
      closeForm();
    }
  };

  var openForm = function () {
    photoForm.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    photoForm.classList.add('hidden');
    // при закрытии формы сбрасываем значение поля выбора файла
    uploadForm.reset();
    document.removeEventListener('keydown', onFormEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openForm();
  });

  photoFormCancel.addEventListener('click', function () {
    closeForm();
  });

  window.form = {
    uploadForm: uploadForm,
    photoForm: photoForm,
    hashtagInput: hashtagInput
  };
})();
