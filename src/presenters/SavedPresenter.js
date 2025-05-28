import L from "leaflet";
import Swal from "sweetalert2";
import SavedStoryModel from "../models/SavedStoryModel.js";
import SavedView from "../views/SavedView.js";

export default class SavedPresenter {
  constructor(container, router) {
    this.container = container;
    this.router = router;
    this.model = new SavedStoryModel();
    this.view = new SavedView(container);
    this.stories = [];
  }

  async init() {
    this.stories = await this.model.getAll();

    this.view.render(this.stories);

    this.view.bindBack(() => {
      location.hash = "/";
    });

    this.view.bindDeleteButtons((id) => this._confirmDelete(id));

    this._initMap(this.stories);
  }

  async _confirmDelete(id) {
    const result = await Swal.fire({
      title: "Are You Sure You Want to Remove This Bookmark?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await this.model.delete(id);

      await Swal.fire({
        icon: "success",
        title: "Bookmark Removed!",
        text: "This story has been removed from your bookmarks",
        timer: 1500,
        showConfirmButton: false,
      });

      this.init();
    }
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

    const map = L.map("saved-map", {
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
