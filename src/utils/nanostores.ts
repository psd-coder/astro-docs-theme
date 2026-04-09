import { atom, effect, onMount, type ReadableAtom } from "nanostores";
import { debounce } from "es-toolkit";

export function createDebouncedStore<V>($atom: ReadableAtom<V>, delay: number): ReadableAtom<V> {
  const $debouncedAtom = atom($atom.get());
  const updateDebouncedValue = debounce((value: V) => $debouncedAtom.set(value), delay);

  onMount($atom, () => effect($atom, updateDebouncedValue));

  return $debouncedAtom;
}
