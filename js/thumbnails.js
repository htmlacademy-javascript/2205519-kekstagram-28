// Контейнер для фотографий случайного пользователя
const picturesContainer = document.querySelector('.pictures');

// Шаблон изображения случайного пользователя + его содержимое
const thumbnailPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnailPicture = ({ url, description, comments, likes, id }) => {
  const thumbnailPicture = thumbnailPictureTemplate.cloneNode(true);

  thumbnailPicture.querySelector('.picture__img').src = url;
  thumbnailPicture.querySelector('.picture__img').alt = description;
  thumbnailPicture.querySelector('.picture__likes').textContent = likes;
  thumbnailPicture.querySelector('.picture__comments').textContent = comments.length;
  thumbnailPicture.dataset.thumbnailId = id;

  return thumbnailPicture;
};

const renderThumbnailPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailPicture = createThumbnailPicture(picture);
    fragment.append(thumbnailPicture);
  });
  picturesContainer.append(fragment);
};

export {renderThumbnailPictures, picturesContainer};
