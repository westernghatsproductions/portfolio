document.addEventListener("DOMContentLoaded", function () {
  const backendUrl = "https://westernghats.pythonanywhere.com/api";

  function setProject(data) {
    const container = document.getElementById("project-section");
    if (!container) {
      console.error("Project section container not found!");
      return;
    }

    if (!data || !Array.isArray(data)) {
      container.innerHTML = "";
      return;
    }

    let html = `
    <div class="container">
    
      <div class="project-container">
        ${data
          .map(
            (item) => `
            <div class="project-items">
              <div class="project-poster">
                <img src="${item.poster_url}" alt="${item.film_name}" />
                <div class="poster-description">
                  <div>Duration: ${item.duration}</div>
                  <div>Release on: ${item.release_on}</div>
                  <div>Language: ${item.languages}</div>
                </div>
                <div class="poster-buttons">
                  ${item.stream_platform
                    .map(
                      (platform) => `
                      <a class="btn btn-primary rounded-pill py-3 px-5" href="${platform.url}">
                        <i class="fas fa-video"></i> ${platform.text}
                      </a>
                    `
                    )
                    .join("")}
                </div>
              </div>
              <div class="">
                <div class="project-title text-secondary">${
                  item.film_name
                }</div>
                <div class="project-subtitle">${item.description}</div>
                <div class="youtube-trailer">
                  <iframe style="width: 100%; object-fit: contain;" height="340"
                    src="https://www.youtube.com/embed/${
                      item.trailer.split("v=")[1]?.split("&")[0]
                    }" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                  </iframe>
                </div>
                <div class="project-description">
                  <div class="project-description-item">
                    ${item.contributors
                      .map(
                        (contributor) =>
                          `<p>${contributor.role}: ${contributor.name}</p>`
                      )
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>`;

    container.innerHTML = html;
  }
  async function getData(suffix) {
    try {
      const response = await fetch(`${backendUrl}/${suffix}/`);
      console.log("response is ", response);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json(); // Parse the response as JSON
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  async function setData() {
    try {
      const data = await getData("projects");

      setProject(data);
      var spinner = function () {
        setTimeout(function () {
          if ($("#spinner").length > 0) {
            $("#spinner").removeClass("show");
          }
        }, 1);
      };
      spinner();
    } catch (error) {
      console.log(error);
    }
  }
  setData();
});
