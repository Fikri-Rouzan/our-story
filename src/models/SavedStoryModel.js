import { dbPromise } from "../utils/db.js";

export default class SavedStoryModel {
  async save(story) {
    const db = await dbPromise;
    return db.put("savedStories", story);
  }

  async getAll() {
    const db = await dbPromise;
    return db.getAll("savedStories");
  }

  async delete(id) {
    const db = await dbPromise;
    return db.delete("savedStories", id);
  }

  async exists(id) {
    const db = await dbPromise;
    const s = await db.get("savedStories", id);
    return !!s;
  }
}
