'use strict';
// МОДУЛЬ ДЛЯ ОТРИСОВКИ УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
(function () {
  var ESC_KEY = window.util.ESC_KEY;
  var ENTER_KEY = window.util.ENTER_KEY;
  var posts = window.data.posts;
  var similarPicturesElement = window.gallery.similarPicturesElement;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('img').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var fillCommentFragment = function (array) {
    var commentFragment = document.createDocumentFragment();
    for (var k = 0; k < array.length; k++) {
      commentFragment.appendChild(renderComment(array[k]));
    }
    return commentFragment;
  };

  var showComments = function (commentsFragment) {
    commentsList.innerHTML = '';
    commentsList.appendChild(commentsFragment);
  };

  var renderBigPicture = function (post) {
    bigPictureImg.querySelector('img').src = post.url;
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.comments-count').textContent = post.comments.length;
    bigPicture.querySelector('.social__caption').textContent = post.description;

    var newComment = fillCommentFragment(post.comments);
    showComments(newComment);
  };

  var pictureImage = document .querySelectorAll('.picture__img');

  var showPicture = function (index) {
    bigPicture.classList.remove('hidden');
    renderBigPicture(posts[index]);
    document.querySelector('body').classList.add('modal-open');
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  var onPictureCloseBtnClick = function () {
    closePicture();
    bigPictureCancelBtn.removeEventListener('click', onPictureCloseBtnClick);
  };
  var onPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closePicture();
      document.removeEventListener('keydown', onPictureEscPress);
    }
  };

  // click on targeted picture
  var onPictureClick = function (evt) {
    for (var i = 0; i < pictureImage.length; i++) {
      if (evt.target === pictureImage[i]) {
        showPicture(i);
      }
    }
    bigPictureCancelBtn.addEventListener('click', onPictureCloseBtnClick);
    document.addEventListener('keydown', onPictureEscPress);
  };
  // clicking Enter btn on targeted picture
  var onPictureEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      for (var i = 0; i < pictureImage.length; i++) {
        if (evt.target === pictureImage[i]) {
          showPicture(i);
        }
      }
      bigPictureCancelBtn.addEventListener('click', onPictureCloseBtnClick);
      document.addEventListener('keydown', onPictureEscPress);
    }
  };

  similarPicturesElement.addEventListener('click', onPictureClick);
  similarPicturesElement.addEventListener('keydown', onPictureEnterPress);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
})();
