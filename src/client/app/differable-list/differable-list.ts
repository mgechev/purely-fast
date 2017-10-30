import { IterableChangeRecord } from '@angular/core';
import { List } from 'immutable';
import LinkedList from './linked-list';

const trackByIdentity = (index: number, item: any) => index;

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
  changes = new LinkedList<IterableChangeRecord<T>>();

  static fromArray<T>(arr: T[]): DifferableList<T> {
    const result = new DifferableList<T>(List<T>(arr));
    arr.forEach((item, idx) =>
      result.changes.add({
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
    result.changes.add({
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
    result.changes.add({
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
      result.changes.add({
        currentIndex: null,
        previousIndex: idx,
        item: prev,
        trackById: trackByIdentity
      });
    }
    result.changes.add({
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
    for (let i = idx; i < idx + len; i += 1) {
      result.changes.add({
        currentIndex: null,
        previousIndex: i,
        item: this.data.get(i),
        trackById: trackByIdentity
      });
    }

    // The items from the values array will be appended
    values.forEach((v, i) => {
      result.changes.add({
        currentIndex: idx + i,
        previousIndex: null,
        item: v,
        trackById: trackByIdentity
      });
    });

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
