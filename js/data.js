import {SIMILAR_PUBLICATIONS_COUNT, SIMILAR_COMMENTS_COUNT, COMMENT_DESCRIPTIONS, COMMENT_MESSAGES, COMMENT_NAMES} from './const.js';
import {getRandomPositiveInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const generatePhotoId = createIdGenerator();
const generatePhotoUrl = createIdGenerator(1, 25);
const generateCommentsId = createIdGenerator();


const createComment = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1 ,6)}.svg`,
  message: COMMENT_MESSAGES[getRandomPositiveInteger(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_NAMES[getRandomPositiveInteger(0, COMMENT_NAMES.length - 1)],
});


const createManyComments = () => Array.from({length: getRandomPositiveInteger(0, SIMILAR_COMMENTS_COUNT)}, createComment);

const createPublication = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(COMMENT_DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: createManyComments(),
});

const createManyPublications = () => Array.from({length: SIMILAR_PUBLICATIONS_COUNT}, createPublication);


export {createManyPublications};
