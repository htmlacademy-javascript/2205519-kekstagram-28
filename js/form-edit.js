import {isEscapeKey} from './util.js';
import {HASHTAG_MAX_COUNT, HASHTAG_VALIDATION, HASHTAG_ERROR_TEXT} from './const.js';
import {resetScale} from './image-scaling.js';
import {resetEffects} from './image-effects.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector ('.img-upload__overlay');
const commentField = form.querySelector ('.text__description');
const hashtagsField = form.querySelector ('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const cancelButton = form.querySelector ('.img-upload__cancel');
const fileField = form.querySelector ('.img-upload__input');

const successCase = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorCase = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscape);
};

const closeModal = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscape);

  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

const ifTextFieldFocused = () =>
  document.activeElement === hashtagsField || document.activeElement === commentField;

function onDocumentEscape(evt) {
  if (isEscapeKey(evt) && !ifTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      closeModal();
    }
  }
}

const validHashtag = (tag) => HASHTAG_VALIDATION.test(tag);

const validHashtagCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const uniqueHashtag = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validHashtagCount(tags) && uniqueHashtag(tags) && tags.every(validHashtag);
};

pristine.addValidator(
  hashtagsField,
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
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Блокировка кнопки формы на время ожидания ответа сервера
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

// Показ сообщения об успешной отправке
const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successCase);
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
      document.body.append(errorCase);
    } else {
      const errorCaseClone = document.querySelector('.error');
      errorCaseClone.classList.remove('hidden');
    }
  };
};
const showFullErrorMessage = showErrorMessage();

// Скрыть показ успешной/ошибочной отправки
const hideModalMessage = () => {
  successCase.classList.add('hidden');
  errorCase.classList.add('hidden');
};

// Закрытие сообщения об успешной/ошибочной отправке при клике на body
const closeModalMessageWithClickOnBody = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
};

// Закрытие сообщения об успешной/ошибочной отправке при клике кнопку
const closeModalMessageWithClickOnButton = () => {
  hideModalMessage();
};

// Закрытие сообщения об успешной/ошибочной отправке при нажатии Esc
const closeModalMessageWithPressEsc = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
  }
};

// Отправка формы
const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      successButton.addEventListener('click', closeModalMessageWithClickOnButton);
      errorButton.addEventListener('click', closeModalMessageWithClickOnButton);
      document.addEventListener('keydown', closeModalMessageWithPressEsc);
      document.addEventListener('click', closeModalMessageWithClickOnBody);
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};


fileField.addEventListener('change', onFileUploadChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage};
