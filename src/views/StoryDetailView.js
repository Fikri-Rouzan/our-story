export default class StoryDetailView {
  constructor(container) {
    this.container = container;
  }

  render(story) {
    this.container.innerHTML = `
    <main id="main-content" class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
      <nav aria-label="Navigasi balik" class="mb-4">
        <button id="back-btn" class="text-blue-600 hover:underline">
          ← Kembali
        </button>
      </nav>

      <article class="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <header class="p-6 space-y-2">
          <h1 class="text-2xl font-medium">${story.name}</h1>
          <time datetime="${story.createdAt}" class="text-gray-500 block">
            ${new Date(story.createdAt).toLocaleString()}
          </time>
        </header>

        <figure>
          <img
            src="${story.photoUrl}"
            alt="Foto story oleh ${story.name}: ${story.description}"
            class="w-full h-64 object-cover"
          />
          <figcaption class="p-6 text-gray-700">
            ${story.description}
          </figcaption>
        </figure>
      </article>

      <section id="detail-map"
               role="region"
               aria-label="Peta lokasi story"
               class="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div id="map-container" class="w-full h-64"></div>
      </section>
    </main>`;
  }

  bindBack(handler) {
    this.container
      .querySelector("#back-btn")
      .addEventListener("click", handler);
  }

  showError(msg) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <p class="text-red-500">${msg}</p>
      </div>`;
  }
}
