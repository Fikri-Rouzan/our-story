import L from "leaflet";
import Swal from "sweetalert2";

export default class AddStoryView {
  constructor(container) {
    this.container = container;
    this.stream = null;
    this.capturedBlob = null;
    this.map = null;
    this.marker = null;
  }

  render() {
    this.container.innerHTML = `
      <main id="main-content" role="main"
            class="min-h-[calc(100vh-4rem-4rem)] bg-gray-100 overflow-auto py-6">
        <div class="max-w-2xl mx-auto px-4 space-y-6">

          <!-- Back Button -->
          <nav aria-label="Back navigation">
            <button id="back-btn"
                    class="inline-flex items-center px-3 py-2 bg-primary text-white
                           font-medium rounded hover:bg-secondary transition cursor-pointer">
              <i class="fas fa-arrow-left mr-2"></i>
              Back
            </button>
          </nav>

          <!-- Form Card -->
          <section aria-labelledby="add-story-title"
                   class="bg-white rounded-lg shadow p-6 space-y-6">
            <h1 id="add-story-title"
                class="text-2xl font-semibold text-center">
              Create New Story
            </h1>

            <form id="form-add-story" class="space-y-4">
              <!-- Description -->
              <div>
                <label for="description" class="block mb-1 font-medium">
                  Story Description
                </label>
                <textarea id="description" name="description" required
                  placeholder="Enter your description..."
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  rows="4"></textarea>
              </div>

              <!-- Photo -->
              <div class="grid grid-cols-2 gap-2">
                <!-- Upload Button -->
                <button type="button" id="btn-upload"
                        class="w-full flex items-center justify-center space-x-2
                               bg-primary text-white py-2 rounded transition cursor-pointer">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Select Photo</span>
                </button>
                <!-- Camera Button -->
                <button type="button" id="btn-camera"
                        class="w-full flex items-center justify-center space-x-2
                               bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition cursor-pointer">
                  <i class="fas fa-camera"></i>
                  <span>Take Photo</span>
                </button>
              </div>

              <!-- Camera Preview -->
              <div id="camera-container" class="hidden space-y-2">
                <video id="video" autoplay playsinline
                       class="w-full h-full bg-black rounded"></video>
                <button type="button" id="btn-capture"
                        class="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition flex items-center justify-center space-x-2 cursor-pointer">
                  <i class="fas fa-camera-retro"></i>
                  <span>Capture Photo</span>
                </button>
              </div>

              <!-- Snapshot Preview -->
              <figure id="preview-container" class="hidden space-y-2">
                <img id="preview" alt="Photo preview"
                     class="w-full h-full object-cover rounded"/>
                <button type="button" id="btn-retake"
                        class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition flex items-center justify-center space-x-2 cursor-pointer">
                  <i class="fas fa-redo"></i>
                  <span>Retake Photo</span>
                </button>
              </figure>

              <!-- Upload -->
              <div id="upload-container"
                   class="border-2 border-dashed border-gray-300 rounded-lg h-60
                          flex flex-col items-center justify-center text-gray-500
                          cursor-pointer transition hover:border-primary hover:bg-primary/10">
                <i class="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                <p class="font-medium">Upload Photo</p>
                <p class="text-sm text-gray-400">Drag & drop or click to upload photo</p>
                <input id="photo-upload" name="photo" type="file" accept="image/*"
                       class="hidden"/>
              </div>
              <!-- Upload Feedback -->
              <div id="upload-feedback" class="mt-2 text-sm text-gray-600 flex items-center space-x-2"></div>

              <!-- Map -->
              <div>
                <label for="map-add" class="block mb-1 font-medium">
                  Choose Location
                </label>
                <div id="map-add"
                     role="region"
                     aria-label="Map for selecting location"
                     class="w-full h-64 rounded shadow"></div>
              </div>

              <input id="lat" name="lat" type="hidden"/>
              <input id="lon" name="lon" type="hidden"/>

              <!-- Submit -->
              <button type="submit" id="btn-submit"
                      class="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition flex items-center justify-center space-x-2 cursor-pointer mt-2">
                <i class="fas fa-paper-plane"></i>
                <span>Post Story</span>
              </button>
            </form>
          </section>
        </div>
      </main>`;
  }

  bindBack(handler) {
    this.container
      .querySelector("#back-btn")
      .addEventListener("click", handler);
  }

  // DOM elements
  _initElements() {
    this.form = this.container.querySelector("#form-add-story");
    this.btnCamera = this.container.querySelector("#btn-camera");
    this.btnUpload = this.container.querySelector("#btn-upload");
    this.cameraContainer = this.container.querySelector("#camera-container");
    this.video = this.container.querySelector("#video");
    this.btnCapture = this.container.querySelector("#btn-capture");
    this.previewContainer = this.container.querySelector("#preview-container");
    this.preview = this.container.querySelector("#preview");
    this.btnRetake = this.container.querySelector("#btn-retake");
    this.uploadContainer = this.container.querySelector("#upload-container");
    this.photoUpload = this.container.querySelector("#photo-upload");
    this.uploadFeedback = this.container.querySelector("#upload-feedback");
    this.latInput = this.container.querySelector("#lat");
    this.lonInput = this.container.querySelector("#lon");
  }

  // Bind UI events
  bindUIActions() {
    // Toggle between upload and camera
    this.btnUpload.addEventListener("click", () => {
      this._setMode("upload");
      this._selectUpload();
    });
    this.btnCamera.addEventListener("click", () => {
      this._setMode("camera");
      this._startCamera();
    });

    // File upload
    this.uploadContainer.addEventListener("click", () =>
      this.photoUpload.click()
    );
    this.uploadContainer.addEventListener("dragover", (e) =>
      e.preventDefault()
    );
    this.uploadContainer.addEventListener("dragenter", (e) => {
      e.preventDefault();
      this.uploadContainer.classList.add("border-primary", "bg-primary/10");
    });
    this.uploadContainer.addEventListener("dragleave", (e) => {
      e.preventDefault();
      this.uploadContainer.classList.remove("border-primary", "bg-primary/10");
    });
    this.uploadContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      this.uploadContainer.classList.remove("border-primary", "bg-primary/10");
      const files = e.dataTransfer.files;
      if (files.length) {
        this.photoUpload.files = files;
        this._showUploadFeedback();
      }
    });
    this.photoUpload.addEventListener("change", () =>
      this._showUploadFeedback()
    );
    this.uploadFeedback.addEventListener("click", (e) => {
      if (e.target.closest("#clear-upload")) this._clearUploadFeedback();
    });

    // Camera
    this.btnCapture.addEventListener("click", () => this._capturePhoto());
    this.btnRetake.addEventListener("click", () => this._retakePhoto());
  }

  _setMode(mode) {
    const activeClasses = ["bg-primary", "text-white", "hover:bg-secondary"];
    const inactiveClasses = [
      "bg-gray-200",
      "text-gray-700",
      "hover:bg-gray-300",
    ];
    if (mode === "upload") {
      this.btnUpload.classList.add(...activeClasses);
      this.btnUpload.classList.remove(...inactiveClasses);
      this.btnCamera.classList.add(...inactiveClasses);
      this.btnCamera.classList.remove(...activeClasses);
    } else {
      this.btnCamera.classList.add(...activeClasses);
      this.btnCamera.classList.remove(...inactiveClasses);
      this.btnUpload.classList.add(...inactiveClasses);
      this.btnUpload.classList.remove(...activeClasses);
    }
  }

  _showUploadFeedback() {
    const file = this.photoUpload.files[0];
    if (file) {
      this.uploadFeedback.innerHTML = `
        <span class="truncate">${file.name}</span>
        <button type="button" id="clear-upload" aria-label="Remove selected file"
                class="text-gray-500 hover:text-red-600 focus:outline-none cursor-pointer">
          <i class="fas fa-trash"></i>
        </button>
      `;
    } else {
      this.uploadFeedback.textContent = "";
    }
  }

  _clearUploadFeedback() {
    this.photoUpload.value = "";
    this.uploadFeedback.textContent = "";
  }

  _startCamera() {
    this._stopCamera();
    this.cameraContainer.classList.remove("hidden");
    this.uploadContainer.classList.add("hidden");
    this.previewContainer.classList.add("hidden");

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        this.video.srcObject = stream;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Unable to Access Camera",
          text: "Cannot access the camera. Please make sure permission has been granted and that your device has a camera",
        });
      });
  }

  _stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
  }

  _selectUpload() {
    this._stopCamera();
    this.cameraContainer.classList.add("hidden");
    this.previewContainer.classList.add("hidden");
    this.uploadContainer.classList.remove("hidden");
  }

  _capturePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.video, 0, 0);

    canvas.toBlob((blob) => {
      this.capturedBlob = blob;
      this.preview.src = URL.createObjectURL(blob);
      this.previewContainer.classList.remove("hidden");
      this.cameraContainer.classList.add("hidden");
      this.uploadContainer.classList.add("hidden");
      this._stopCamera();
    }, "image/jpeg");
  }

  _retakePhoto() {
    this.capturedBlob = null;
    this.preview.src = "";
    this.previewContainer.classList.add("hidden");
    this._startCamera();
  }

  initMap() {
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

    this.map = L.map("map-add", {
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
      .addTo(this.map);

    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.latInput.value = lat;
      this.lonInput.value = lng;

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
    });
  }

  bindSubmit(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const description = this.container
        .querySelector("#description")
        .value.trim();
      let photo;
      if (this.capturedBlob) {
        photo = new File([this.capturedBlob], "photo.jpg", {
          type: this.capturedBlob.type,
        });
      } else {
        photo = this.photoUpload.files[0];
      }
      const lat = this.latInput.value;
      const lon = this.lonInput.value;

      handler({ description, photo, lat, lon });
    });
  }
}
