'use strict';
(function () {
  var MAX_RANDOM_POSTS = 10;

  var getRandomValue = window.util.getRandomValue;
  var similarPicturesElement = window.gallery.similarPicturesElement;

  var imgFiltersSection = document.querySelector('.img-filters');

  imgFiltersSection.classList.remove('img-filters--inactive');

  var toggleFilterBtn = function (selectedBtn) {
    imgFiltersSection.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    selectedBtn.classList.add('img-filters__button--active');
  };

  var clearPicturesList = function () {
    similarPicturesElement.querySelectorAll('.picture').forEach(function (picture) {
      similarPicturesElement.removeChild(picture);
    });
  };

  // default sorting
  var getDefaultPosts = function (userPosts) {
    return userPosts;
  };

  // random sorting
  var getRandomPosts = function (userPosts) {
    var randomPosts = [];

    while (randomPosts.length < MAX_RANDOM_POSTS) {
      var i = getRandomValue(0, userPosts.length);

      if (randomPosts.indexOf(userPosts[i]) === -1) {
        randomPosts.push(userPosts[i]);
      }
    }

    return randomPosts;
  };

  // sort by most dicscussed
  var getDiscussedPosts = function (userPosts) {
    var userPostsCopy = userPosts.slice();

    userPostsCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    return userPostsCopy;
  };

  window.filter = {
    toggleFilterBtn: toggleFilterBtn,
    clearPicturesList: clearPicturesList,
    getDefaultPosts: getDefaultPosts,
    getRandomPosts: getRandomPosts,
    getDiscussedPosts: getDiscussedPosts
  };
})();
