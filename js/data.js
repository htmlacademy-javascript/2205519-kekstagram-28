import {SIMILAR_PUBLICATIONS_COUNT, SIMILAR_COMMENTS_COUNT, DESCRIPTIONS, COMMENT_MESSAGES, COMMENT_NAMES} from './const.js';
import {getRandomPositiveInteger, createUniquePositiveRandomNumber, getRandomArrayElement, createIdGenerator} from './util.js';

const generatePhotoId = createIdGenerator();
const generatePhotoUrl = createUniquePositiveRandomNumber(1, 25);
const generateLikesCount = createUniquePositiveRandomNumber(15, 200);
const generateCommentsId = createIdGenerator();
const generateCommentsAvatar = createIdGenerator();


const createComment = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${generateCommentsAvatar()}.svg`,
  message: COMMENT_MESSAGES[getRandomPositiveInteger(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_NAMES[getRandomPositiveInteger(0, COMMENT_NAMES.length - 1)],
});


const createManyComments = () => Array.from({length: getRandomPositiveInteger(0, SIMILAR_COMMENTS_COUNT)}, createComment);

const createPublication = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikesCount(),
  comments: createManyComments(),
});

const createManyPublications = () => Array.from({length: SIMILAR_PUBLICATIONS_COUNT}, createPublication);


export {createManyPublications};
