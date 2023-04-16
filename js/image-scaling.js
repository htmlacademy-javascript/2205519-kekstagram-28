import {DEFAULT_SCALE, MIN_SCALE, MAX_SCALE, SCALE_STEP} from './const.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageScaleInputElement = document.querySelector('.scale__control--value');
const smallerScaleButtonElement = document.querySelector('.scale__control--smaller');
const biggerScaleButtonElement = document.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  imageScaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(imageScaleInputElement.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(imageScaleInputElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

smallerScaleButtonElement.addEventListener('click', onSmallerButtonClick);
biggerScaleButtonElement.addEventListener('click', onBiggerButtonClick);

export const resetScale = () => scaleImage(DEFAULT_SCALE);
