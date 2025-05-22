import L from "leaflet";

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
            alert(res.message);
          }
        })
        .catch(() => {
          this.view.render(name, []);
          this._initMap([]);
          this._bindClicks();
          alert("Terjadi kesalahan jaringan.");
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

    withLoc.forEach((s) => {
      const marker = L.marker([s.lat, s.lon]).addTo(map);

      const popupContent = `
      <div style="text-align:center; max-width:200px;">
        <strong>${s.name}</strong>
        <img 
          src="${s.photoUrl}" 
          alt="${s.description}" 
          style="width:100px; height:100px; object-fit:cover; margin:8px auto; border-radius:4px;"
        />
        <p style="margin:4px 0; font-size:0.9rem;">${s.description}</p>
        <p style="margin:4px 0; font-size:0.8rem; color:#555;">
          ${new Date(s.createdAt).toLocaleString()}
        </p>
        <a 
          href="#/story/${s.id}" 
          style="display:inline-block; margin-top:6px; font-size:0.9rem; color:#1D4ED8; text-decoration:underline;"
        >
          View Detail
        </a>
      </div>`;

      marker.bindPopup(popupContent);
      bounds.push([s.lat, s.lon]);
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}
