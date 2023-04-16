import {openBigPicture} from './big-picture.js';
import {renderThumbnailPictures, picturesContainerElement} from './thumbnails.js';

export const renderPictures = (pictures) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPicture) {
      return;
    }
    const picture = pictures.find (
      (item) => item.id === +thumbnailPicture.dataset.thumbnailId
    );
    openBigPicture(picture);
  });
  renderThumbnailPictures(pictures);
};

