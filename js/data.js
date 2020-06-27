'use strict';
// МОДУЛЬ, КОТОРЫЙ СОЗДАЕТ ДАННЫЕ
(function () {
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

  var getRandomValue = window.util.getRandomValue;

  // массив из 25 объектов
  var posts = [];

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

  window.data = {
    posts: posts
  };
})();
