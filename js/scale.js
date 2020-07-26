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

  scaleDownBtn.addEventListener('click', onScaleDownBtnClick);
  scaleUpBtn.addEventListener('click', onScaleUpBtnClick);
})();
