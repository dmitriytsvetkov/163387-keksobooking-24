const getRandomInteger = (minValue, maxValue) => {
  if (minValue < 0 || maxValue < 0) {
    throw new Error('Min or Max value must be greater or equals to 0');
  }
  if (maxValue <= minValue) {
    throw new Error('Min should be less than max');
  }
  return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
};

const getRandomFloat = (minValue, maxValue, precision) => {
  if (minValue < 0 || maxValue < 0) {
    throw new Error('Min or Max value must be greater or equals to 0');
  }
  if (maxValue <= minValue) {
    throw new Error('Min should be less than max');
  }
  return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomElementFromObject = (object) => {
  const keys = Object.keys(object);
  return keys[Math.floor(Math.random() * keys.length)];
};

const getRandomArray = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0],
);

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, getRandomElementFromObject};
