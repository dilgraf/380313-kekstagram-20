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
var bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');

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

// ПОПАП С ЗАГРУЗКОЙ ФОТО И ЕГО РЕДАКТИРОВАНИЕМ
var ESC_KEY = 27;
var ENTER_KEY = 13;

var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var photoForm = uploadForm.querySelector('.img-upload__overlay');
var photoFormCancel = uploadForm.querySelector('.img-upload__cancel');

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY && hashtagInput !== document.activeElement && descriptionInput !== document.activeElement) {
    closeForm();
  }
};

var openForm = function () {
  photoForm.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};

var closeForm = function () {
  photoForm.classList.add('hidden');
  // при закрытии формы сбрасываем значение поля выбора файла
  uploadForm.reset();
  document.removeEventListener('keydown', onFormEscPress);
};

uploadFile.addEventListener('change', function () {
  openForm();
});

photoFormCancel.addEventListener('click', function () {
  closeForm();
});

// ЭФФЕКТЫ
var effectLevel = uploadForm.querySelector('.effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');

var onEffectLevelPinMouseUp = function (upEvt) {
  upEvt.preventDefault();
  document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
};

effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseUp);

// МАСШТАБИРОВАНИЕ ИЗОБРАЖЕНИЯ
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var scaleField = photoForm.querySelector('.img-upload__scale');
var scaleDownBtn = scaleField.querySelector('.scale__control--smaller');
var scaleUpBtn = scaleField.querySelector('.scale__control--bigger');
var scaleValue = scaleField.querySelector('.scale__control--value');
var imagePreview = photoForm.querySelector('.img-upload__preview');

// - Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+»,
// значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// - При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS,
// который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
var onScaleDownBtnClick = function () {
  var scale = parseInt(scaleValue.value, 10);

  var newScale = scale - SCALE_STEP >= MIN_SCALE ? newScale = scale - SCALE_STEP : MIN_SCALE;

  scaleValue.value = newScale + '%';
  imagePreview.style.transform = 'scale(' + newScale / 100 + ')';
};

var onScaleUpBtnClick = function () {
  var scale = parseInt(scaleValue.value, 10);

  var newScale = scale + SCALE_STEP <= MAX_SCALE ? newScale = scale + SCALE_STEP : MAX_SCALE;

  scaleValue.value = newScale + '%';
  imagePreview.style.transform = 'scale(' + newScale / 100 + ')';
};

// - При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
scaleDownBtn.addEventListener('click', onScaleDownBtnClick);
scaleUpBtn.addEventListener('click', onScaleUpBtnClick);

// ВАЛИДАЦИЯ ХЕШТЭГОВ
var MAX_HASHTAG_AMOUNT = 5;
var VALID_SYMBOL = /^[#A-Za-zА-ЯЁа-яё0-9]+/gi;
var hashtagInput = uploadForm.querySelector('.text__hashtags');
var descriptionInput = uploadForm.querySelector('.text__description');


// пушим все ошибки в один массив, без повторений
var addErrorMessage = function (message, messageArray) {
  if (messageArray.indexOf(message) === -1) {
    messageArray.push(message);
  }
};

// цикл, который будет проверять каждый хэштег на соотвествие
// если встречается ошибка -> setCustomValidity - выводим сообщение об ошибке
var createErrorMessages = function (hashtagsArray) {
  var errorMessages = [];

  if (hashtagsArray.length > MAX_HASHTAG_AMOUNT) {
    hashtagInput.setCustomValidity(addErrorMessage('Не больше ' + MAX_HASHTAG_AMOUNT + ' хэштегов', errorMessages));
  }

  for (var i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i];

    if (!hashtag.startsWith('#')) {
      hashtagInput.setCustomValidity(addErrorMessage('Хэштег должен начинаться с символа #', errorMessages));
    } else if (!hashtag.match(VALID_SYMBOL)) {
      hashtagInput.setCustomValidity(addErrorMessage('Хэштег может содержать только буквы и цифры', errorMessages));
    } else if (hashtag.length === 1) {
      hashtagInput.setCustomValidity(addErrorMessage('Хэштег не может быть пустым', errorMessages));
    } else if (hashtag.length > 20) {
      hashtagInput.setCustomValidity(addErrorMessage('Не больше 20 символов в хэштеге', errorMessages));
    }
  }

  return errorMessages;
};

var onValidate = function () {
  var hashtags = hashtagInput.value.toLowerCase().split(' ');
  var errorMessages = createErrorMessages(hashtags);

  if (errorMessages.length !== 0) {
    hashtagInput.setCustomValidity(errorMessages.join('. \n'));
    hashtagInput.style.border = '2px solid red';
  } else {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.border = '';
  }
};
hashtagInput.addEventListener('input', onValidate);

// КОММЕНТЫ
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к
// закрытию формы редактирования изображения
