export default class SavedView {
  constructor(container) {
    this.container = container;
  }

  render(stories = []) {
    this.container.innerHTML = `
      <main id="main-content" role="main"
            class="min-h-[calc(100vh-4rem-4rem)] p-4 overflow-auto bg-gray-100 py-6">

        <!-- Back Button -->
        <nav aria-label="Back navigation">
          <button id="back-btn"
                  class="inline-flex items-center px-3 py-2 bg-primary text-white
                         font-medium rounded hover:bg-secondary transition cursor-pointer mb-6">
            <i class="fas fa-arrow-left mr-2"></i>
            Back
          </button>
        </nav>

        <!-- Title -->
        <h1 class="text-3xl text-primary font-bold mb-6">Your Bookmarks</h1>

        <!-- Map -->
        <div id="saved-map" class="w-full h-64 mb-8 rounded-lg shadow"></div>

        <!-- Saved Stories -->
        <div id="stories-grid"
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          ${stories
            .map((story) => {
              const date = new Date(story.createdAt);
              return `
              <div class="story-card bg-white rounded-lg shadow
                          transform transition-transform duration-300
                          hover:-translate-y-1 hover:shadow-lg
                          flex flex-col h-full overflow-hidden">
                
                <!-- Story image -->
                <img
                  src="${story.photoUrl}"
                  alt="Photo by ${story.name}: ${story.description}"
                  class="w-full h-48 object-cover"
                />

                <div class="p-4 flex flex-col flex-1">
                  <!-- Story author -->
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-user text-gray-600"></i>
                    <h2 class="font-semibold text-lg">${story.name}</h2>
                  </div>

                  <!-- Story date -->
                  <div class="flex items-center text-sm text-gray-500 mt-2">
                    <i class="fas fa-calendar-days mr-1"></i>
                    <span>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span>
                  </div>

                  <!-- Story description -->
                  <p class="text-sm text-gray-700 mt-3 mb-5 text-justify line-clamp-4">
                    ${story.description}
                  </p>

                  <div class="mt-auto flex items-center justify-between">
                    <!-- View details -->
                    <a
                      href="#/story/${story.id}"
                      class="inline-flex items-center px-3 py-2 bg-primary text-white
                             font-medium rounded hover:bg-secondary transition max-w-max"
                    >
                      View Details
                      <i class="fas fa-arrow-right ml-2"></i>
                    </a>

                    <!-- Delete button -->
                    <button
                      type="button"
                      data-id="${story.id}"
                      class="delete-btn text-gray-500 hover:text-red-600 focus:outline-none cursor-pointer"
                      aria-label="Delete saved story"
                    >
                      <i class="fas fa-trash fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </main>
    `;
  }

  bindBack(handler) {
    this.container
      .querySelector("#back-btn")
      .addEventListener("click", handler);
  }

  bindDeleteButtons(handler) {
    this.container
      .querySelector("#stories-grid")
      .addEventListener("click", (e) => {
        const btn = e.target.closest(".delete-btn");
        if (!btn) return;
        handler(btn.dataset.id);
      });
  }
}
