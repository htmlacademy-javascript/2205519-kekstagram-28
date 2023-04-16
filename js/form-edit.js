import {isEscapeKey} from './util.js';
import {HASHTAG_MAX_COUNT, HASHTAG_VALIDATION, HASHTAG_ERROR_TEXT} from './const.js';
import {resetScale} from './image-scaling.js';
import {resetEffects} from './image-effects.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector ('.img-upload__overlay');
const commentFieldElement = formElement.querySelector ('.text__description');
const hashtagsFieldElement = formElement.querySelector ('.text__hashtags');
const uploadButtonElement = formElement.querySelector('.img-upload__submit');
const cancelButtonElement = formElement.querySelector ('.img-upload__cancel');
const uploadInputElement = formElement.querySelector ('.img-upload__input');

const successCaseElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorCaseElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const openModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscape);
};

const closeModal = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscape);

  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

const ifTextFieldFocused = () =>
  document.activeElement === hashtagsFieldElement || document.activeElement === commentFieldElement;

function onDocumentEscape(evt) {
  if (isEscapeKey(evt) && !ifTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      closeModal();
    }
  }
}

const isValidHashtag = (tag) => HASHTAG_VALIDATION.test(tag);

const validateHashtagCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const isUniqueHashtag = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validateHashtagCount(tags) && isUniqueHashtag(tags) && tags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagsFieldElement,
  validateTags,
  HASHTAG_ERROR_TEXT,
);

const onFileUploadChange = () => {
  openModal();
};

const onCancelButtonClick = () => {
  closeModal();
};

// Разблокировка кнопки формы после получения ответа от сервера
const unblockUploadButton = () => {
  uploadButtonElement.disabled = false;
  uploadButtonElement.textContent = 'Опубликовать';
};

// Блокировка кнопки формы на время ожидания ответа сервера
const blockUploadButton = () => {
  uploadButtonElement.disabled = true;
  uploadButtonElement.textContent = 'Публикация...';
};

// Показ сообщения об успешной отправке
const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successCaseElement);
    } else {
      const successCaseClone = document.querySelector('.success');
      successCaseClone.classList.remove('hidden');
    }
  };
};
const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorCaseElement);
      successCaseElement.classList.remove('hidden');
    } else {
      const errorCaseClone = document.querySelector('.error');
      errorCaseClone.classList.remove('hidden');
    }
  };
};
const showFullErrorMessage = showErrorMessage();

// Скрыть показ успешной/ошибочной отправки
const hideModalMessage = () => {
  successCaseElement.classList.add('hidden');
  errorCaseElement.classList.add('hidden');
};

// Закрытие сообщения об успешной/ошибочной отправке при клике на body
const onBodyClick = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
    document.removeEventListener('click', onBodyClick);
  }
};

// Закрытие сообщения об успешной/ошибочной отправке при клике кнопку
const onCloseButtonClick = () => {
  hideModalMessage();
};

// Закрытие сообщения об успешной/ошибочной отправке при нажатии Esc
const onEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
    document.removeEventListener('keydown', onEscPress);
  }
};

// Отправка формы
const onFormSubmit = (cb) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockUploadButton();
      successButtonElement.addEventListener('click', onCloseButtonClick);
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
      await cb(new FormData(formElement));
      unblockUploadButton();
    }
  });
};


uploadInputElement.addEventListener('change', onFileUploadChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);

export {onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage};
