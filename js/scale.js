'use strict';

(function () {
  // МАСШТАБИРОВАНИЕ ИЗОБРАЖЕНИЯ
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var scaleField = window.form.scaleField;
  var scaleValue = window.form.scaleValue;
  var imagePreview = window.form.imagePreview;
  var scaleDownBtn = scaleField.querySelector('.scale__control--smaller');
  var scaleUpBtn = scaleField.querySelector('.scale__control--bigger');

  // - Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+»,
  // значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
  // - При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS,
  // который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
  var onScaleDownBtnClick = function () {
    var scale = parseInt(scaleValue.value, 10);

    var newScale = scale - SCALE_STEP >= MIN_SCALE ? newScale = scale - SCALE_STEP : MIN_SCALE;

    scaleValue.value = newScale + '%';
    imagePreview.style.transform = 'scale(' + newScale / 100 + ')';
  };

  var onScaleUpBtnClick = function () {
    var scale = parseInt(scaleValue.value, 10);

    var newScale = scale + SCALE_STEP <= MAX_SCALE ? newScale = scale + SCALE_STEP : MAX_SCALE;

    scaleValue.value = newScale + '%';
    imagePreview.style.transform = 'scale(' + newScale / 100 + ')';
  };

  // - При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
  scaleDownBtn.addEventListener('click', onScaleDownBtnClick);
  scaleUpBtn.addEventListener('click', onScaleUpBtnClick);

  window.scale = {
    imagePreview: imagePreview
  };
})();
