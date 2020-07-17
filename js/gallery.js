'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ГАЛЕРЕЕЙ ИЗОБРАЖЕНИЙ
(function () {
  var load = window.backend.load;
  // Отрисуйте сгенерированные DOM-элементы в блок .pictures
  var similarPicturesElement = document.querySelector('.pictures');
  // Найдем шаблон, который будем копировать
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // отрисуем шаблон в элемент
  var renderPicture = function (post, id) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.dataset.id = id;

    return pictureElement;
  };

  var onSuccess = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(renderPicture(posts[i], i));
    }
    similarPicturesElement.appendChild(fragment);
    var userPosts = posts;

    window.gallery = {
      userPosts: userPosts
    };
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '18px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(onSuccess, onError);

  window.gallery = {
    similarPicturesElement: similarPicturesElement
  };
})();
