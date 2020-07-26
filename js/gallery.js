'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ГАЛЕРЕЕЙ ИЗОБРАЖЕНИЙ
(function () {
  var load = window.backend.load;
  var onError = window.message.onError;
  // Отрисуйте сгенерированные DOM-элементы в блок .pictures
  var similarPicturesElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // var userPosts = [];

  var renderPicture = function (post, id) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.dataset.id = id;

    return pictureElement;
  };

  var createPicturesList = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(renderPicture(posts[i], i));
    }
    similarPicturesElement.appendChild(fragment);
  };

  load(function (posts) {
    createPicturesList(posts);
    var userPosts = posts;
    var filteredPosts = userPosts.slice();
    window.gallery = {
      userPosts: userPosts,
      filteredPosts: filteredPosts
    };
  }, onError);

  window.gallery = {
    similarPicturesElement: similarPicturesElement,
    createPicturesList: createPicturesList
  };
})();
