export default class StoryModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAllStories(token, page = 1, size = 10, location = 0) {
    const params = new URLSearchParams({ page, size, location });

    return fetch(`${this.baseUrl}/stories?${params}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  }

  getStoryById(id, token) {
    return fetch(`${this.baseUrl}/stories/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  }

  addStory({ description, photo, lat, lon }, token) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat) formData.append("lat", lat);
    if (lon) formData.append("lon", lon);

    return fetch(`${this.baseUrl}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((res) => res.json());
  }

  addStoryGuest({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat) formData.append("lat", lat);
    if (lon) formData.append("lon", lon);

    return fetch(`${this.baseUrl}/stories/guest`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  }
}
