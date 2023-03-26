import { createManyPublications } from './data.js';

function renderThumbnails() {
  // Контейнер для фотографий случайного пользователя
  const picturesContainer = document.querySelector('.pictures');

  // Шаблон изображения случайного пользователя + его содержимое
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const similarPictures = createManyPublications();
  const similarPicturesFragment = document.createDocumentFragment();

  similarPictures.forEach(({ url, description, comments, likes }) => {
    const clonePicture = pictureTemplate.cloneNode(true);

    clonePicture.querySelector('.picture__img').src = url;
    clonePicture.querySelector('.picture__img').alt = description;
    clonePicture.querySelector('.picture__comments').textContent = comments.length;
    clonePicture.querySelector('.picture__likes').textContent = likes;

    similarPicturesFragment.append(clonePicture);
  });

  picturesContainer.append(similarPicturesFragment);
}

export {renderThumbnails};
