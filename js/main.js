function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createUniquePositiveRandomNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max); // eslint-disable-line
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const SIMILAR_PUBLICATIONS_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 5;

const generatePhotoId = createUniquePositiveRandomNumber(1, 25);
const generatePhotoUrl = createUniquePositiveRandomNumber(1, 25);
const generateLikesCount = createUniquePositiveRandomNumber(15, 200);
const generateCommentsId = createUniquePositiveRandomNumber(1, 6);
const generateCommentsAvatar = createUniquePositiveRandomNumber(1, 6);

const DESCRIPTIONS = [
  'Посмотрите где я сегодня побывал!',
  'Мой кот',
  'Красивый закат',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Виктор',
  'Григорий',
  'Илья',
  'Женя',
  'Алена',
];

const createComment = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${generateCommentsAvatar()}.svg`,
  message: COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_NAMES[getRandomInteger(0, COMMENT_NAMES.length - 1)],
});

const similarComments = Array.from({length: SIMILAR_COMMENTS_COUNT}, createComment);

const createPublication = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikesCount(),
  comments: similarComments[getRandomInteger(0, similarComments.length - 1)],
});

const similarPublications = Array.from({length: SIMILAR_PUBLICATIONS_COUNT}, createPublication);

console.log(similarPublications); // eslint-disable-line

