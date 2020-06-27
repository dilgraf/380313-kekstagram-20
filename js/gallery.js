'use strict';
// МОДУЛЬ, КОТОРЫЙ РАБОТАЕТ С ГАЛЕРЕЕЙ ИЗОБРАЖЕНИЙ
(function () {
  var posts = window.data.posts;

  // Отрисуйте сгенерированные DOM-элементы в блок .pictures
  var similarPicturesElement = document.querySelector('.pictures');
  // Найдем шаблон, который будем копировать
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var fragment = document.createDocumentFragment();

  // отрисуем шаблон в элемент
  var renderPicture = function (post) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;

    return pictureElement;
  };

  var fillFragment = function (array) {
    for (var k = 0; k < array.length; k++) {
      fragment.appendChild(renderPicture(array[k]));
    }
  };
  fillFragment(posts);

  similarPicturesElement.appendChild(fragment);

  window.gallery = {
    similarPicturesElement: similarPicturesElement
  };
})();
