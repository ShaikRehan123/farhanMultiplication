function createRange(number: number) {
  const lastDigit = number % 10;
  const startingNumber = number - lastDigit + 1;
  const straightArray = [...Array(10).keys()].map((i) => startingNumber + i);
  const reverseArray = straightArray.slice().reverse();
  return { straightArray, reverseArray };
}

export { createRange };
