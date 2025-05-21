import L from "leaflet";

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
    <main id="main-content" role="main" class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
      <section aria-labelledby="add-story-title"
               class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <header>
          <h1 id="add-story-title"
              class="text-2xl font-semibold mb-4 text-center">
            Add New Story
          </h1>
        </header>
        <form id="form-add-story">
          <fieldset class="space-y-4">
            <legend class="sr-only">Add New Story Form</legend>

            <div>
              <label for="description" class="block mb-1">Description</label>
              <textarea id="description" name="description" required
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                rows="3"></textarea>
            </div>

            <div class="flex space-x-2">
              <button type="button" id="btn-camera"
                      class="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300 transition">
                Use Camera
              </button>
              <button type="button" id="btn-upload"
                      class="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300 transition">
                Upload Photo
              </button>
            </div>

            <div id="camera-container" class="hidden">
              <video id="video" autoplay playsinline
                     class="w-full h-48 bg-black rounded"></video>
              <button type="button" id="btn-capture"
                      class="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Take Snapshot
              </button>
            </div>

            <figure id="preview-container" class="hidden">
              <img id="preview" alt="Preview foto story"
                   class="w-full h-48 object-cover rounded mb-2"/>
              <figcaption class="sr-only">Preview hasil foto yang diambil</figcaption>
              <button type="button" id="btn-retake"
                      class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
                Retake
              </button>
            </figure>

            <div id="upload-container">
              <label for="photo-upload" class="block mb-1">Upload Photo</label>
              <input id="photo-upload" name="photo" type="file" accept="image/*"
                     class="w-full focus:outline-none"/>
            </div>

            <div>
              <label for="map-add" class="block mb-1">Select Location</label>
              <div id="map-add" role="region" aria-label="Map untuk memilih lokasi"
                   class="w-full h-48 rounded shadow"></div>
            </div>

            <input id="lat" name="lat" type="hidden"/>
            <input id="lon" name="lon" type="hidden"/>

            <button type="submit" id="btn-submit"
                    class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
              Submit
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  `;
  }

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
    this.latInput = this.container.querySelector("#lat");
    this.lonInput = this.container.querySelector("#lon");
  }

  bindUIActions() {
    this.btnCamera.addEventListener("click", () => this._startCamera());
    this.btnUpload.addEventListener("click", () => this._selectUpload());
    this.btnCapture.addEventListener("click", () => this._capturePhoto());
    this.btnRetake.addEventListener("click", () => this._retakePhoto());
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
      .catch(() => alert("Tidak dapat mengakses kamera."));
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
    canvas.getContext("2d").drawImage(this.video, 0, 0);
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
    this.map = L.map("map-add").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.latInput.value = lat;
      this.lonInput.value = lng;
      if (this.marker) this.map.removeLayer(this.marker);
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
