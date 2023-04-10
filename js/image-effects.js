import {EFFECTS, DEFAULT_EFFECT} from './const.js';


const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderWrapper.classList.remove('hidden');
};

const closeSlider = () => {
  sliderWrapper.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions(
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
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onUpdateSlider = () => {
  const sliderValue = slider.noUiSlider.get();

  if (isDefault()) {
    image.style.filter = DEFAULT_EFFECT.style;
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }

  effectLevel.value = sliderValue;
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

closeSlider();

effects.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onUpdateSlider);

export const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
