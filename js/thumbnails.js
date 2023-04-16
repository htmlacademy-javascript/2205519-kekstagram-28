// Контейнер для фотографий случайного пользователя
const picturesContainerElement = document.querySelector('.pictures');

// Шаблон изображения случайного пользователя + его содержимое
const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnailPicture = ({ url, description, comments, likes, id }) => {
  const thumbnailPicture = thumbnailTemplateElement.cloneNode(true);

  thumbnailPicture.querySelector('.picture__img').src = url;
  thumbnailPicture.querySelector('.picture__img').alt = description;
  thumbnailPicture.querySelector('.picture__likes').textContent = likes;
  thumbnailPicture.querySelector('.picture__comments').textContent = comments.length;
  thumbnailPicture.dataset.thumbnailId = id;

  return thumbnailPicture;
};

const renderThumbnailPictures = (pictures) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailPicture = createThumbnailPicture(picture);
    fragment.append(thumbnailPicture);
  });
  picturesContainerElement.append(fragment);
};

export {renderThumbnailPictures, picturesContainerElement};
