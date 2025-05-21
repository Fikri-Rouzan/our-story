import L from "leaflet";

export default class StoryDetailPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init({ id }) {
    const token = localStorage.getItem("token");
    this.model
      .getStoryById(id, token)
      .then((res) => {
        if (!res.error) {
          this.view.render(res.story);
          this.view.bindBack(() => {
            location.hash = "/";
          });
          this._initMap(res.story);
        } else {
          this.view.showError(res.message);
        }
      })
      .catch(() => this.view.showError("Terjadi kesalahan jaringan."));
  }

  _initMap(story) {
    if (story.lat == null || story.lon == null) return;

    const map = L.map("map-container").setView([story.lat, story.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([story.lat, story.lon]).addTo(map);
    marker
      .bindPopup(
        `
      <strong>${story.name}</strong><br/>
      ${story.description}<br/>
      <em>${new Date(story.createdAt).toLocaleString()}</em>
    `
      )
      .openPopup();
  }
}
