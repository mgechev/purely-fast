import { Pipe, PipeTransform } from '@angular/core';

const memoize = require('lodash.memoize');

const fibonacci = memoize((num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
});

@Pipe({ name: 'format', pure: true })
export class FormatPipe implements PipeTransform {
  transform(num: number) {
    return fibonacci(num);
  }
}
