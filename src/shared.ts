export function peek<T>(item: T) {
  console.log(item);
  return item;
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}

export function sumReduce(previousValue: number, currentValue: number) {
  return previousValue + currentValue;
}
