'use strict';

var PHOTO_QUANTITY = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 201;
var MAX_COMMENTS = 12;
var MIN_AVATAR_PHOTO = 1;
var MAX_AVATAR_PHOTO = 7;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Эмма', 'Джо', 'Том', 'Кэт', 'Элис', 'Кекс'];

// массив из 25 объектов
var posts = [];

// Отрисуйте сгенерированные DOM-элементы в блок .pictures
var similarPicturesElement = document.querySelector('.pictures');
// Найдем шаблон, который будем копировать
var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var fragment = document.createDocumentFragment();

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img');
var commentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = commentsList.querySelector('.social__comment');

// returns random number between min (incl) and max (exclud)
var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// comments - массив - список комментов, кол-во любое, генерируются случайным образом
// каждый объект включает в себя avatar, message, name
// avatar - random 1 <= i <= 6
// message - random from the massive
// name - random from the massive
var getComments = function (commentsQuantity) {
  var postComments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    postComments.push({
      avatar: 'img/avatar-' + getRandomValue(MIN_AVATAR_PHOTO, MAX_AVATAR_PHOTO) + '.svg',
      message: MESSAGES[getRandomValue(0, MESSAGES.length)],
      name: NAMES[getRandomValue(0, NAMES.length)]
    });
  }
  return postComments;
};

// Напишите функцию для создания массива из 25 сгенерированных JS-объектов
// каждый объект состоит из url, description, likes, comments
// url - 1 <= i <= 25, не повторяясь (не должно быть одинаковых номеров)
// likes - random 15 <= likes <= 200
// comments - random 0 <= comments <= 11
for (var j = 0; j < PHOTO_QUANTITY; j++) {
  posts.push({
    url: 'photos/' + (j + 1) + '.jpg',
    description: '',
    likes: getRandomValue(MIN_LIKES, MAX_LIKES),
    comments: getComments(getRandomValue(0, MAX_COMMENTS))
  });
}

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

// ПОЛНОЭКРАННЫЙ ПОКАЗ ФОТО
bigPicture.classList.remove('hidden');

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
renderBigPicture(posts[0]);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
