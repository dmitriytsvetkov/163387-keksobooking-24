const randomFloatBetween = (minValue,maxValue,precision) => {
  if (minValue || maxValue < 0) {
    return;
  }
  if (maxValue <= minValue) {
    return;
  }
  return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
};

randomFloatBetween(0, 1, 2);
