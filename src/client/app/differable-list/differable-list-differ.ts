import { IterableChangeRecord, IterableDiffer, IterableChanges, NgIterable } from '@angular/core';
import { DifferableList } from './differable-list';

export class DifferableListDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
  private _data: DifferableList<V>;

  forEachItem(fn: (record: IterableChangeRecord<V>) => void) {
    for (let i = 0; i < this._data.size; i += 1) {
      fn(this._data.changes[i]);
    }
  }

  forEachOperation(
    fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void
  ) {
    const changes = this._data.changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      fn(record, record.previousIndex, record.currentIndex);
    }
  }

  forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void) {
    // Do nothing
  }

  forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._data.changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      if (record.previousIndex === null) {
        fn(record);
      }
    }
  }

  forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._data.changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      if (record.previousIndex !== null && record.previousIndex !== record.currentIndex) {
        fn(record);
      }
    }
  }

  forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._data.changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      if (record.currentIndex === null) {
        fn(record);
      }
    }
  }

  forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void) {
    // for (let i = 0; i < this._changes.length; i += 1) {
    //   const record = this._changes[i];
    //   fn(record);
    // }
  }

  diff(collection: NgIterable<V>): DifferableListDiffer<V> | null {
    if (this.check()) {
      return this;
    } else {
      return null;
    }
  }

  onDestroy() {
    // Do nothing
  }

  check(): boolean {
    this._reset();
    return this.isDirty;
  }

  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty(): boolean {
    return this._data.changes.length > 0;
  }

  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      this._data.changes = [];
    }
  }
}
