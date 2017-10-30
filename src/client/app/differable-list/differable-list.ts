import { IterableChangeRecord } from '@angular/core';
import { List } from 'immutable';

const trackByIdentity = (index: number, item: any) => item;

class DifferableListIterator<T> implements Iterator<T> {
  private current = 0;

  constructor(private collection: DifferableList<T>) {}

  next(): IteratorResult<T> {
    if (this.current < this.collection.size) {
      return {
        done: false,
        value: this.collection.get(this.current++)
      };
    } else {
      return { done: true, value: null };
    }
  }
}

export class DifferableList<T> {
  /* @internal */
  changes: IterableChangeRecord<T>[] = [];

  static fromArray<T>(arr: T[]): DifferableList<T> {
    const result = new DifferableList<T>(List<T>(arr));
    arr.forEach((item, idx) =>
      result.changes.push({
        currentIndex: idx,
        previousIndex: null,
        item: item,
        trackById: trackByIdentity
      })
    );
    return result;
  }

  constructor(private data = List<T>([])) {}

  unshift(data: T) {
    const result = new DifferableList<T>(this.data.unshift(data));
    result.changes.push({
      currentIndex: 0,
      previousIndex: null,
      item: data,
      trackById: trackByIdentity
    });
    return result;
  }

  pop(): DifferableList<T> {
    const last = this.data.get(this.size - 1);
    const result = new DifferableList<T>(this.data.pop());
    result.changes.push({
      currentIndex: null,
      previousIndex: this.size - 1,
      item: last,
      trackById: trackByIdentity
    });
    return result;
  }

  set(idx: number, item: T) {
    const prev = this.data.get(idx);
    const result = new DifferableList<T>(this.data.set(idx, item));
    if (prev) {
      result.changes.push({
        currentIndex: null,
        previousIndex: idx,
        item: prev,
        trackById: trackByIdentity
      });
    }
    result.changes.push({
      currentIndex: idx,
      previousIndex: null,
      item: item,
      trackById: trackByIdentity
    });
    return result;
  }

  splice(idx: number, len: number, ...values: any[]): DifferableList<T> {
    const result = new DifferableList<T>(this.data.splice(idx, len, ...values) as List<T>);

    // Values from i, len will be removed
    for (let i = idx; i < len; i += 1) {
      result.changes.push({
        currentIndex: null,
        previousIndex: i,
        item: this.data.get(i),
        trackById: trackByIdentity
      });
    }

    // The items from the values array will be appended
    values.forEach((v, i) => {
      result.changes.push({
        currentIndex: idx + i,
        previousIndex: null,
        item: v,
        trackById: trackByIdentity
      });
    });

    const displacement = values.length - (len - idx);
    // The items after after len will change their index to i + values.length
    for (let i = len; i < this.data.size; i += 1) {
      result.changes.push({
        currentIndex: displacement + i,
        previousIndex: i,
        item: this.data.get(i),
        trackById: trackByIdentity
      });
    }

    return result;
  }

  get size() {
    return this.data.size;
  }

  get(idx: number) {
    return this.data.get(idx);
  }

  indexOf(item: T) {
    return this.data.indexOf(item);
  }

  [Symbol.iterator]() {
    return new DifferableListIterator<T>(this);
  }
}
