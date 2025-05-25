import L from "leaflet";
import Swal from "sweetalert2";

export default class HomePresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    const name = localStorage.getItem("name") || "Guest";
    const token = localStorage.getItem("token");

    if (!token) {
      this.view.render(name, []);
      this._bindClicks();
      this._initMap([]);
    } else {
      this.model
        .getAllStories(token)
        .then((res) => {
          if (!res.error) {
            this.view.render(name, res.listStory);
            this._initMap(res.listStory);
            this._bindClicks();
          } else {
            this.view.render(name, []);
            this._initMap([]);
            this._bindClicks();
            Swal.fire({
              icon: "error",
              title: "Something Went Wrong",
              text: res.message,
            });
          }
        })
        .catch(() => {
          this.view.render(name, []);
          this._initMap([]);
          this._bindClicks();
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please try again later",
          });
        });
    }
  }

  _bindClicks() {
    this.view.bindCardClicks((id) => {
      location.hash = `/story/${id}`;
    });
  }

  _initMap(stories) {
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

    const map = L.map("map", {
      center: [0, 0],
      zoom: 2,
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

    const withLoc = stories.filter((s) => s.lat != null && s.lon != null);
    const bounds = [];

    withLoc.forEach((story) => {
      const marker = L.marker([story.lat, story.lon]).addTo(map);

      const popupContent = `
        <div class="max-w-40">
          <!-- Story author -->
          <strong class="block font-semibold text-sm">
            ${story.name}
          </strong>

          <!-- Story date -->
          <p class="text-xs text-gray-500">
            ${new Date(story.createdAt).toLocaleString()}
          </p>

          <!-- Story image -->
          <img
            src="${story.photoUrl}"
            alt="${story.description}"
            class="w-28 h-28 object-cover rounded-lg mx-auto"
          />

          <!-- Story description -->
          <p class="text-sm text-justify text-gray-700 line-clamp-2">
            ${story.description}
          </p>

          <!-- View Details -->
          <a
            href="#/story/${story.id}"
            class="inline-block text-sm text-primary underline hover:text-secondary"
          >
            View Details
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      bounds.push([story.lat, story.lon]);
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}
