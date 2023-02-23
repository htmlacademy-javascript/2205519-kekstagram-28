const checkString = (string, length) => console.log(string.length <= length);
checkString('проверяемая строка', 20);
checkString('проверяемая строка', 18);
checkString('проверяемая строка', 10);


const isPalindrome = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');

  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));


const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
};

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));
console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));


const myPadStart = (string, minLength, pad) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }
  return result;
};

console.log(myPadStart('1', 2, '0'));
console.log(myPadStart('1', 4, '0'));
console.log(myPadStart('q', 4, 'werty'));
console.log(myPadStart('q', 4, 'we'));
console.log(myPadStart('qwerty', 4, '0'));
