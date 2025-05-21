export default class StoryDetailView {
  constructor(container) {
    this.container = container;
  }

  render(story) {
    this.container.innerHTML = `
    <div class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
      <button id="back-btn" class="mb-4 text-blue-600 hover:underline">
        ← Kembali
      </button>
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <img
          src="${story.photoUrl}"
          alt="${story.description}"
          class="w-full h-64 object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-medium mb-2">${story.name}</h2>
          <p class="text-gray-500 mb-4">
            ${new Date(story.createdAt).toLocaleString()}
          </p>
          <p class="mb-4">${story.description}</p>
          ${
            story.lat && story.lon
              ? `<p class="text-sm text-gray-600">
                  Lokasi: ${story.lat}, ${story.lon}
                </p>`
              : ""
          }
        </div>
      </div>
    </div>`;
  }

  bindBack(handler) {
    document.getElementById("back-btn").addEventListener("click", handler);
  }

  showError(msg) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <p class="text-red-500">${msg}</p>
      </div>`;
  }
}
