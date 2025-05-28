import { openDB } from "idb";

export const dbPromise = openDB("story-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("savedStories")) {
      db.createObjectStore("savedStories", { keyPath: "id" });
    }
  },
});
