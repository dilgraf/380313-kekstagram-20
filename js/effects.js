'use strict';
// МОДУЛЬ ДЛЯ ОТРИСОВКИ МИНИАТЮРЫ
(function () {
  var EFFECT_MIN = 0;
  var EFFECT_MAX = 100;
  var CHROME_MAX = 1;
  var SEPIA_MAX = 1;
  var MARVIN_MAX = 100;
  var PHOBOS_MAX = 3;
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;

  var photoForm = window.form.photoForm;
  var imagePreview = window.form.imagePreview;
  var effectLevel = window.form.effectLevel;

  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectsList = photoForm.querySelector('.effects__list');
  var effectRadioButton = effectsList.querySelectorAll('.effects__radio');
  // var effectRadioButtons = effectsList.querySelectorAll('.effects__radio');

  // По умолчанию должен быть выбран эффект «ОРИГИНАЛ».

  // ЭФФЕКТЫ

  // Для эффекта «ОРИГИНАЛ» стили filter удаляются
  var setDefaultFilter = function () {
    imagePreview.className = imagePreview.className.replace(/\beffects__preview--.*\b/, '');

    imagePreview.style.filter = '';
    effectLevelPin.style.left = EFFECT_MAX + '%';
    effectLevelDepth.style.width = EFFECT_MAX + '%';
    effectLevelValue.value = EFFECT_MAX;
  };

  var changeFilter = function (evt) {
    var targetFilter = evt.target.value;
    effectLevel.classList.remove('hidden');
    setDefaultFilter();
    imagePreview.classList.add('effects__preview--' + targetFilter);
    if (targetFilter === 'none') {
      effectLevel.classList.add('hidden');
      imagePreview.style.filter = '';
    }
  };

  effectsList.addEventListener('change', changeFilter); // or effectRadioButtons.addEventListener ??

  var getEffectValue = function (effectMin, effectMax) {
    return ((effectLevelValue.value * (effectMax - effectMin) / 100) + effectMin);
  };

  var applyStyles = function () {
    if (effectRadioButton[1].checked) {
      imagePreview.style.filter = 'grayscale(' + getEffectValue(EFFECT_MIN, CHROME_MAX) + ')';
    } else if (effectRadioButton[2].checked) {
      imagePreview.style.filter = 'sepia(' + getEffectValue(EFFECT_MIN, SEPIA_MAX) + ')';
    } else if (effectRadioButton[3].checked) {
      imagePreview.style.filter = 'invert(' + getEffectValue(EFFECT_MIN, MARVIN_MAX) + '%)';
    } else if (effectRadioButton[4].checked) {
      imagePreview.style.filter = 'blur(' + getEffectValue(EFFECT_MIN, PHOBOS_MAX) + 'px)';
    } else if (effectRadioButton[5].checked) {
      imagePreview.style.filter = 'brightness(' + getEffectValue(HEAT_MIN, HEAT_MAX) + ')';
    }
  };

  var onEffectLevelPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
  };

  effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseUp);

  // ИЗМЕНЕНИЕ НАСЫЩЕННОСТИ ЭФФЕКТА
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      // moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinPositionX = effectLevelPin.offsetLeft - shift.x;

      var minEffectValue = effectLevelLine.offsetLeft - effectLevelPin.offsetWidth;
      if (pinPositionX < minEffectValue) {
        pinPositionX = minEffectValue;
      }

      var maxEffectValue = effectLevelLine.offsetLeft + effectLevelLine.offsetWidth - effectLevelPin.offsetWidth;
      if (pinPositionX > maxEffectValue) {
        pinPositionX = maxEffectValue;
      }

      if (pinPositionX > 0 || pinPositionX < effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = pinPositionX + 'px';

        var effectValuePercentage = Math.floor((pinPositionX / effectLevelLine.offsetWidth) * 100);
        effectLevelValue.value = effectValuePercentage;

        effectLevelDepth.style.width = effectValuePercentage + '%';

        applyStyles();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
