export default class StoryDetailView {
  constructor(container) {
    this.container = container;
  }

  render(story) {
    this.container.innerHTML = `
      <main id="main-content" class="min-h-[calc(100vh-4rem-4rem)] py-6 overflow-auto bg-gray-100">
        <div class="max-w-4xl mx-auto px-4 space-y-6">

          <!-- Back Button -->
          <nav aria-label="Back navigation">
            <button
              id="back-btn"
              class="inline-flex items-center px-3 py-2 bg-primary text-white font-medium rounded hover:bg-secondary transition cursor-pointer"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Back
            </button>
          </nav>

          <!-- Story Card -->
          <article class="bg-white rounded-lg shadow overflow-hidden">
            <div class="md:flex">
              
              <!-- Story Image -->
              <div class="md:w-1/2">
                <img
                  src="${story.photoUrl}"
                  alt="Story photo by ${story.name}"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <div class="md:w-1/2 p-6 flex flex-col">
                <!-- Story author -->
                <h1 class="text-3xl font-bold flex items-center mb-2">
                  <i class="fas fa-user mr-2 text-gray-600"></i>
                  ${story.name}
                </h1>
                
                <!-- Story date -->
                <div class="flex items-center text-gray-500 mb-6 space-x-2">
                  <i class="fas fa-calendar-alt"></i>
                  <time datetime="${story.createdAt}">
                    ${new Date(story.createdAt).toLocaleString()}
                  </time>
                </div>
                
                <!-- Story description -->
                <p class="text-gray-700 flex-1">
                  ${story.description}
                </p>
              </div>
            </div>
          </article>

          <!-- Map -->
          <section
            role="region"
            aria-label="Story location map"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <h2 class="sr-only">Location Map</h2>
            <div id="map-container" class="w-full h-64"></div>
          </section>
        </div>
      </main>
    `;
  }

  bindBack(handler) {
    this.container
      .querySelector("#back-btn")
      ?.addEventListener("click", handler);
  }
}
