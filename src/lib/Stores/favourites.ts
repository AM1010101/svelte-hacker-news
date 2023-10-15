import { writable } from 'svelte/store';

interface FavouriteStore {
  subscribe: any;
  add: (number: number) => void;
  remove: (number: number) => void;
  reset: () => void;
}

//get the data from local storage
let data = [];
if (typeof window !== 'undefined') {
  data = JSON.parse(localStorage.storable || '[]');
}

function createFavourite(): FavouriteStore {
  const { subscribe, set, update } = writable<number[]>(data || []);

  return {
    subscribe,
    add: (number: number) =>
      update((list: number[]) => {
        if (!list.includes(number)) {
          console.log(list);
          localStorage.storable = JSON.stringify([...list, number]);
          return [...list, number];
        }
        console.log('already in list');
        return list;
      }),
    remove: (number: number) =>
      update((list: number[]) => {
        const index = list.indexOf(number);
        if (index !== -1) {
          localStorage.storable = JSON.stringify([
            ...list.slice(0, index),
            ...list.slice(index + 1),
          ]);
          list.splice(index, 1);
        }
        return list;
      }),
    reset: () => set([]),
  };
}

export const favourites: FavouriteStore = createFavourite();
