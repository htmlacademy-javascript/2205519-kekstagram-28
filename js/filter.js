import {NUMBER_OF_PHOTOS} from './const.js';

const imgFilters = document.querySelector('.img-filters');
const defaultFilterButton = imgFilters.querySelector('#filter-default');
const discussedFilterButton = imgFilters.querySelector('#filter-discussed');
const randomFilterButton = imgFilters.querySelector('#filter-random');


const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const shuffleThumbnails = () => Math.random() - 0.5;

const compareThumbnails = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

export const initFilterListeners = (photos, showThumbnails) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos);
    setActiveFilter(evt.target);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos
      .slice()
      .sort(shuffleThumbnails)
      .slice(0, NUMBER_OF_PHOTOS));
    setActiveFilter(evt.target);
  });

  discussedFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos
      .slice()
      .sort(compareThumbnails));
    setActiveFilter(evt.target);
  });
};
