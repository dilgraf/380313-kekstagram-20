'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  // returns random number between min (incl) and max (exclud)
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomValue: getRandomValue
  };
})();
