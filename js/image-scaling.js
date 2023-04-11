import {DEFAULT_SCALE, MIN_SCALE, MAX_SCALE, SCALE_STEP} from './const.js';

const image = document.querySelector('.img-upload__preview img');
const imageScaleInput = document.querySelector('.scale__control--value');
const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  imageScaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(imageScaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(imageScaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

smallerScaleButton.addEventListener('click', onSmallerButtonClick);
biggerScaleButton.addEventListener('click', onBiggerButtonClick);

export const resetScale = () => scaleImage(DEFAULT_SCALE);
