export default class HomeView {
  constructor(container) {
    this.container = container;
  }

  render(userName, stories = []) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem-4rem)] p-4 overflow-auto">
        <!-- Welcome -->
        <h1 class="text-3xl text-primary font-bold mb-6">Welcome, ${userName}!</h1>

        <!-- Map -->
        <div id="map" class="w-full h-64 mb-8 rounded-lg shadow"></div>

        <!-- Stories -->
        <div
          id="stories-grid"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          ${stories
            .map((story) => {
              const date = new Date(story.createdAt);
              return `
                <div
                  data-id="${story.id}"
                  class="story-card bg-white rounded-lg shadow transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full overflow-hidden"
                >
                  <!-- Story image -->
                  <img
                    src="${story.photoUrl}"
                    alt="Story photo by ${story.name}: ${story.description}"
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
                    <p
                      class="text-sm text-gray-700 mt-3 mb-5 text-justify line-clamp-4"
                    >
                      ${story.description}
                    </p>

                    <div class="mt-auto flex items-center justify-between">
                      <!-- View details -->
                      <a
                        href="#/story/${story.id}"
                        class="mt-auto self-start inline-flex items-center px-3 py-2 bg-primary text-white font-medium rounded hover:bg-secondary transition max-w-max"
                      >
                        View Details
                        <i class="fas fa-arrow-right ml-2"></i>
                      </a>

                      <!-- Save button -->
                      <button
                        type="button"
                        data-id="${story.id}"
                        class="save-btn text-gray-500 hover:text-primary focus:outline-none cursor-pointer"
                        aria-label="Save story"
                      >
                      <i class="fas fa-bookmark fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  bindSaveButtons(handler) {
    const grid = this.container.querySelector("#stories-grid");
    grid.addEventListener("click", (event) => {
      const btn = event.target.closest(".save-btn");
      if (btn) handler(btn.dataset.id);
    });
  }

  highlightSavedStories(savedIds = []) {
    savedIds.forEach((id) => {
      const btn = this.container.querySelector(`.save-btn[data-id="${id}"]`);
      if (btn) {
        btn.classList.add("text-primary");
        btn.classList.remove("text-gray-500");
      }
    });
  }

  updateSaveButton(id, isSaved) {
    const btn = this.container.querySelector(`.save-btn[data-id="${id}"]`);
    if (!btn) return;
    if (isSaved) {
      btn.classList.add("text-primary");
      btn.classList.remove("text-gray-500");
    } else {
      btn.classList.add("text-gray-500");
      btn.classList.remove("text-primary");
    }
  }
}
