'use strict';
(function () {
  var MAX_RANDOM_POSTS = 10;

  var getRandomValue = window.util.getRandomValue;
  var similarPicturesElement = window.gallery.similarPicturesElement;
  var createPicturesList = window.gallery.createPicturesList;

  // покажите блок img-filters
  var imgFiltersSection = document.querySelector('.img-filters');
  imgFiltersSection.classList.remove('img-filters--inactive');

  var filterDefault = imgFiltersSection.querySelector('#filter-default');
  var filterRandom = imgFiltersSection.querySelector('#filter-random');
  var filterDiscussed = imgFiltersSection.querySelector('#filter-discussed');

  var toggleFilterBtn = function (selectedBtn) {
    imgFiltersSection.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    selectedBtn.classList.add('img-filters__button--active');
  };

  var clearPicturesList = function () {
    similarPicturesElement.querySelectorAll('.picture').forEach(function (picture) {
      similarPicturesElement.removeChild(picture);
    });
  };

  // СОРТИРОВКА
  // по умолчанию - фото в изнач порядке
  var getDefaultPosts = function (userPosts) {
    createPicturesList(userPosts);
  };

  // случайные - 10 рандомных, не повтор
  var getRandomPosts = function (userPosts) {
    var randomPosts = [];
    while (randomPosts.length <= MAX_RANDOM_POSTS) {
      var i = getRandomValue(0, userPosts.length);
      if (randomPosts.indexOf(userPosts[i]) === -1) {
        randomPosts.push(userPosts[i]);
      }
    }

    createPicturesList(randomPosts);
  };

  // обсуждаемые - в порядке убывания комментов
  var getDiscussedPosts = function (userPosts) {
    var userPostsCopy = userPosts.slice();
    userPostsCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    createPicturesList(userPostsCopy);
  };

  var onFilterBtnClick = function (evt) {
    window.debounce(function () {
      var userPosts = window.gallery.userPosts;
      var target = evt.target.closest('.img-filters__button');
      if (!target) {
        return;
      }

      toggleFilterBtn(target);
      clearPicturesList();

      switch (target) {
        case filterDefault:
          getDefaultPosts(userPosts);
          break;
        case filterRandom:
          getRandomPosts(userPosts);
          break;
        case filterDiscussed:
          getDiscussedPosts(userPosts);
          break;
        default:
          getDefaultPosts(userPosts);
      }
    });
  };

  imgFiltersSection.addEventListener('click', onFilterBtnClick);
})();
