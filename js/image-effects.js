import {EFFECTS, DEFAULT_EFFECT} from './const.js';


const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const effectSliderElement = document.querySelector('.effect-level__slider');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const effectDepthElement = document.querySelector('.effect-level__value');
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderWrapperElement.classList.remove('hidden');
};

const closeSlider = () => {
  sliderWrapperElement.classList.add('hidden');
};

const updateSlider = () => {
  effectSliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });

  if (isDefault()) {
    closeSlider();
  }
  openSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreviewElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onUpdateSlider = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();

  if (isDefault()) {
    imagePreviewElement.style.filter = DEFAULT_EFFECT.style;
  } else {
    imagePreviewElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }

  effectDepthElement.value = sliderValue;
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

closeSlider();

effectsElement.addEventListener('change', onEffectsChange);
effectSliderElement.noUiSlider.on('update', onUpdateSlider);

export const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
