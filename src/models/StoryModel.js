export default class StoryModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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
