export const SIMILAR_PUBLICATIONS_COUNT = 25;
export const SIMILAR_COMMENTS_COUNT = 5;

export const COMMENT_DESCRIPTIONS = [
  'Посмотрите где я сегодня побывал!',
  'Мой кот',
  'Красивый закат',
];

export const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

export const COMMENT_NAMES = [
  'Виктор',
  'Григорий',
  'Илья',
  'Женя',
  'Алена',
];

// Количество комментариев в big-picture
export const COMMENTS_COUNT = 5;

// Хештег правила для form-edit.js
export const HASHTAG_MAX_COUNT = 5;
export const HASHTAG_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;
export const HASHTAG_ERROR_TEXT = 'Ошибка в указании хештега';

// Настройки масштабирования изображения в image-scaling.js
export const DEFAULT_SCALE = 100;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const SCALE_STEP = 25;

// Параметры эффектов для редактирования изображений
export const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

export const DEFAULT_EFFECT = EFFECTS[0];


// Отправление и получение данных с сервера
export const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
};
export const ErrorText = {
  GET_DATA: 'Ошибка загрузки данных. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму.',
};

// Количество фото в filter.js
export const NUMBER_OF_PHOTOS = 10;

// Задержка сообщения об ошибке в util.js
export const ERROR_MESSAGE_DELAY = 5000;
