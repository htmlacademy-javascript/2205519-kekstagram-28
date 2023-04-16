import {isEscapeKey} from './util.js';
import {COMMENTS_COUNT} from './const.js';


const bigPictureElement = document.querySelector('.big-picture');
const listCommentsElement = bigPictureElement.querySelector('.social__comments');
const listCopyElement = listCommentsElement.querySelector('li').cloneNode(true);
const bodyElement = document.querySelector('body');
const commentsCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
let allComments;
let commentsShow = 0;


const onEscapeButton = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    commentsShow = 0;
    allComments = [];
  }
};

const renderNewComments = (arrayComment) => {
  const commentFragment = document.createDocumentFragment();

  arrayComment.forEach(({ avatar, name, message }) => {
    const comment = listCopyElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentFragment.append(comment);
  });
  listCommentsElement.append(commentFragment);
};

const loadComments = () => {
  const nextComments = allComments.slice(commentsShow, commentsShow + COMMENTS_COUNT);
  commentsShow += nextComments.length;
  renderNewComments(nextComments);

  if (commentsShow >= allComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  commentsCountElement.innerHTML = `${commentsShow} из <span class="comments-count"> ${allComments.length}</span> комментариев`;
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  listCommentsElement.innerHTML = '';
  allComments = comments;
  loadComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  closeButtonElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscapeButton);
  commentsLoaderElement.removeEventListener('click', loadComments);
  allComments = [];
};

document.removeEventListener('keydown', (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
  }
});

export const openBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.addEventListener('click', loadComments);
  closeButtonElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscapeButton);

  renderBigPicture(picture);
};
