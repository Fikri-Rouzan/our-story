import L from "leaflet";
import Swal from "sweetalert2";

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
          Swal.fire({
            icon: "error",
            title: "Failed to Load Story",
            text: res.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Unable to load story details. Please try again later",
        });
      });
  }

  _initMap(story) {
    if (story.lat == null || story.lon == null) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    );
    const streets = L.tileLayer(
      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`,
      { attribution: "&copy; MapTiler & OpenStreetMap contributors" }
    );
    const satellite = L.tileLayer(
      `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${apiKey}`,
      { attribution: "&copy; MapTiler & OpenStreetMap contributors" }
    );

    const map = L.map("map-container", {
      center: [story.lat, story.lon],
      zoom: 13,
      layers: [streets],
      maxBounds: [
        [-85, -360],
        [85, 360],
      ],
      maxBoundsViscosity: 1.0,
      worldCopyJump: true,
    });

    L.control
      .layers({
        MapTiler: streets,
        OpenStreetMap: osm,
        Satellite: satellite,
      })
      .addTo(map);

    const marker = L.marker([story.lat, story.lon]).addTo(map);

    const popupContent = `
      <strong class="block font-semibold text-sm">${story.name}</strong>
      <p class="text-xs text-gray-500">
        ${new Date(story.createdAt).toLocaleString()}
      </p>
      <p class="text-sm text-justify text-gray-700 line-clamp-2">
        ${story.description}
      </p>
    `;

    marker.bindPopup(popupContent).openPopup();
  }
}
