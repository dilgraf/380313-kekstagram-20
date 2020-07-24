'use strict';
// МОДУЛЬ ДЛЯ ОТРИСОВКИ УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
(function () {
  var ESC_KEY = window.util.ESC_KEY;
  var ENTER_KEY = window.util.ENTER_KEY;
  var VISIBLE_COMMENTS_AMOUNT = 5;
  // var posts = window.data.posts;
  var similarPicturesElement = window.gallery.similarPicturesElement;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
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

  var showComments = function (allComments) {
    // удаляем из исх массива первые 5 комментов и сохраням их в visibleComments
    var visibleComments = allComments.splice(0, VISIBLE_COMMENTS_AMOUNT);
    var commentsFragment = fillCommentFragment(visibleComments);
    commentsList.appendChild(commentsFragment);
    socialCommentsCount.firstChild.textContent = commentsList.childNodes.length + ' из ';
  };

  var renderBigPicture = function (post) {
    bigPictureImg.querySelector('img').src = post.url;
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.comments-count').textContent = post.comments.length;
    bigPicture.querySelector('.social__caption').textContent = post.description;

    var userComments = post.comments.slice();

    if (userComments.length > VISIBLE_COMMENTS_AMOUNT) {
      commentsLoader.classList.remove('hidden');
    }

    if (userComments.length === 0) {
      socialCommentsCount.classList.add('hidden');
    }
    commentsList.innerHTML = '';
    showComments(userComments);

    var onLoaderBtnClick = function () {
      showComments(userComments);
      if (userComments.length === 0) {
        commentsLoader.removeEventListener('click', onLoaderBtnClick);
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', onLoaderBtnClick);
  };

  var showPicture = function (evt) {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    socialCommentsCount.classList.remove('hidden');

    var target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    if (!similarPicturesElement.contains(target)) {
      return;
    }

    var targetIndex = target.dataset.id;
    var userPosts = window.gallery.userPosts;
    renderBigPicture(userPosts[targetIndex]);
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
    var targetImgPicture = evt.target;
    if (targetImgPicture.classList.contains('picture__img')) {
      showPicture(evt);
      bigPictureCancelBtn.addEventListener('click', onPictureCloseBtnClick);
      document.addEventListener('keydown', onPictureEscPress);
    }
  };
  // clicking Enter btn on targeted picture
  var onPictureEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      showPicture(evt);
      bigPictureCancelBtn.addEventListener('click', onPictureCloseBtnClick);
      document.addEventListener('keydown', onPictureEscPress);
    }
  };

  similarPicturesElement.addEventListener('click', onPictureClick);
  similarPicturesElement.addEventListener('keydown', onPictureEnterPress);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
})();
