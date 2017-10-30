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
import LinkedList from './linked-list';

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
  private _changes: LinkedList<IterableChangeRecord<V>>;

  forEachItem(fn: (record: IterableChangeRecord<V>) => void) {
    let fst = this._changes.firstNode;
    while (fst) {
      fn(fst.element);
      fst = fst.next;
    }
  }

  forEachOperation(
    fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void
  ) {
    let fst = this._changes.firstNode;
    while (fst) {
      fn(fst.element, fst.element.previousIndex, fst.element.currentIndex);
      fst = fst.next;
    }
  }

  forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void) {
    // Do nothing
  }

  forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void) {
    let fst = this._changes.firstNode;
    while (fst) {
      const record = fst.element;
      if (record.previousIndex === null) {
        fn(record);
      }
      fst = fst.next;
    }
  }

  forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    let fst = this._changes.firstNode;
    while (fst) {
      const record = fst.element;
      if (record.previousIndex !== null && record.previousIndex !== record.currentIndex) {
        fn(record);
      }
      fst = fst.next;
    }
  }

  forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void) {
    let fst = this._changes.firstNode;
    while (fst) {
      const record = fst.element;
      if (record.currentIndex === null) {
        fn(record);
      }
      fst = fst.next;
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
    if (changes.size() > 0) {
      this._data.changes = new LinkedList<IterableChangeRecord<V>>();
      return this;
    } else {
      return null;
    }
  }
}
