import {isEscapeKey} from './util.js';
import {HASHTAG_MAX_COUNT, HASHTAG_VALIDATION, HASHTAG_ERROR_TEXT} from './const.js';
import {resetScale} from './image-scaling.js';
import {resetEffects} from './image-effects.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const overlay = form.querySelector ('.img-upload__overlay');
const commentField = form.querySelector ('.text__description');
const hashtagsField = form.querySelector ('.text__hashtags');
const cancelButton = form.querySelector ('#upload-cancel');
const fileField = form.querySelector ('#upload-file');


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
    closeModal();
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileUploadChange);
cancelButton.addEventListener('click', onCancelButtonClick);
fileField.addEventListener ('change', onFormSubmit);
