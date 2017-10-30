import {
  IterableChangeRecord,
  IterableDiffer,
  IterableChanges,
  NgIterable,
  TrackByFunction,
  IterableDifferFactory,
  Injectable
} from '@angular/core';
import { DifferableList } from './differable-list';

@Injectable()
export class DifferableListDifferFactory<V> implements IterableDifferFactory {
  supports(objects: any): boolean {
    return objects instanceof DifferableList;
  }

  create(trackByFn?: TrackByFunction<V>): IterableDiffer<V> {
    return new DifferableListDiffer<V>();
  }
}

export class DifferableListDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
  private _data: DifferableList<V>;
  private _changes: IterableChangeRecord<V>[] = [];

  forEachItem(fn: (record: IterableChangeRecord<V>) => void) {
    for (let i = 0; i < this._data.size; i += 1) {
      fn(this._changes[i]);
    }
  }

  forEachOperation(
    fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void
  ) {
    const changes = this._changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      fn(record, record.previousIndex, record.currentIndex);
    }
  }

  forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void) {
    // Do nothing
  }

  forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      if (record.previousIndex === null) {
        fn(record);
      }
    }
  }

  forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._changes;
    for (let i = 0; i < changes.length; i += 1) {
      const record = changes[i];
      if (record.previousIndex !== null && record.previousIndex !== record.currentIndex) {
        fn(record);
      }
    }
  }

  forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    const changes = this._changes;
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
    this._data = collection as DifferableList<V>;
    const changes = this._data.changes;
    this._changes = changes;
    if (changes.length > 0) {
      this._data.changes = [];
      return this;
    } else {
      return null;
    }
  }
}
