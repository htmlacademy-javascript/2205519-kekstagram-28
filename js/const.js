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

// Задержка отображения фотографий
export const RENDER_PHOTOS_DELAY = 500;

