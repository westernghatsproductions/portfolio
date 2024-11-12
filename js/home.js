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
    if(data.length>4){
      data = data.slice(0,5)
    }
    let html = `
    <div class="container">
      <div class="text-center mx-auto my-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px">
        <h6 class="section-title bg-white text-center text-primary px-3">Our Projects</h6>
      </div>
      <div class="project-container">
        ${data
          .map(
            (item) => `
            <div class="project-items project-item-desktop">
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
                    }" title="${item.description}" frameborder="0"
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

            <div class="project-items project-item-mobile">
            <div class="project-title text-secondary " style="margin: 0px;">${
              item.film_name
            }</div>
              <div class="project-poster">
                <img src="${item.poster_url}" alt="${item.film_name}" />
              </div>
              <div class="">
                
                <div class="project-subtitle">${item.description}</div>
                <div class="youtube-trailer">
                  <iframe style="width: 100%; object-fit: contain;" height="340"
                    src="https://www.youtube.com/embed/${
                      item.trailer.split("v=")[1]?.split("&")[0]
                    }" title="${item.description}" frameborder="0"
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
              <div>
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
              </div>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="project-view-more" > 
      
      <a class="btn btn-primary rounded-pill py-3 px-5" href="project.html"
                >View more projects</a
              >
      </div>
    </div>`;

    container.innerHTML = html;
  }
  function setGallery(data) {
    const container = document.getElementById("gallery-section");
    if (!container) {
      console.error("Gallery section container not found!");
      return;
    }
    console.log(data);
    if (!data) {
      container.innerHTML = "";
      return;
    }

    let html = `
    <div class="container">
      <div class="text-center mx-auto my-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px">
        <h6 class="section-title bg-white text-center text-primary px-3">Our Gallery</h6>
      </div>
      <div class="portfolio-menu mt-2 mb-4">
        <ul>
          <li class="btn btn-outline-dark active" data-filter="*">All</li>
          ${data.categories
            .map(
              (category) =>
                `<li class="btn btn-outline-dark" data-filter=".${category.slug}">${category.name}</li>`
            )
            .join("")}
        </ul>
      </div>
      <div class="portfolio-item row">
        ${data.galleries
          .map(
            (item) => `
            <div class="item ${item.category.slug} col-lg-3 col-md-4 col-6 col-sm">
              <a href="${item.image_url}" class="fancylight popup-btn" data-fancybox-group="light">
                <img class="img-fluid" src="${item.image_url}" alt="" />
              </a>
            </div>
          `
          )
          .join("")}
      </div>
    </div>`;

    container.innerHTML = html;
    $(".portfolio-menu ul li").click(function () {
      $(".portfolio-menu ul li").removeClass("active");
      $(this).addClass("active");

      var selector = $(this).attr("data-filter");
      $(".portfolio-item").isotope({
        filter: selector,
      });
      return false;
    });
    $(document).ready(function () {
      var popup_btn = $(".popup-btn");
      popup_btn.magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });
  }
  function setServices(data) {
    const container = document.getElementById("service-section");
    if (!container) {
      console.error("Gallery section container not found!");
      return;
    }

    if (!data) {
      container.innerHTML = "";
      return;
    }

    let html = `
    <div class="container">
        <div
          class="text-center mx-auto my-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style="max-width: 600px"
        >
          <h6 class="section-title bg-white text-center text-primary px-3">
            What we offer
          </h6>
        </div>
        <div class="service-container">
        ${data
          .map(
            (item) =>
              `
        <article>
          <span class="material-symbols-outlined fill-primary">
            linked_services
          </span>
          <div class="service-title">${item.title}</div>
          <div class="service-description">
          ${item.description}
          </div>
        </article>
        `
          )
          .join("")}
        
        </div>
      </div>
      
      `;
    container.innerHTML = html;
  }
  function setAbout(data) {
    const container = document.getElementById("about-section");
    if (!container) {
      console.error("About section container not found!");
      return;
    }

    if (!data) {
      container.innerHTML = "";
      return;
    }

    let html = `
      <div class="container about-section">
        <div class="row g-5">
          <div class="  col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="img-border">
              <img class="img-fluid" src=${data.image_url} alt="" />
            </div>
          </div>
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="h-100">
              <h6 class="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <p class="mb-4">
              ${data.description}
              </p>
              <div class="d-flex align-items-center mb-4 pb-2">
                <img
                  class="flex-shrink-0 rounded-circle"
                  src=${data.founder_image_url}
                  alt=""
                  style="width: 50px; height: 50px; object-fit:cover;object-position:center"
                />
                <div class="ps-4">
                  <h6>${data.founder_name}</h6>
                  <small>${data.founder_designation}</small>
                </div>
              </div>
              <a class="btn btn-primary rounded-pill py-3 px-5" href="about.html"
                >Read More</a
              >
            </div>
          </div>
        </div>
      </div>
      
      `;
    container.innerHTML = html;
  }
  function setBanner(data) {
    const container = document.getElementById("banner-section");
    if (!container) {
      console.error("About section container not found!");
      return;
    }

    if (!data) {
      container.innerHTML = "";
      return;
    }
    let html = `
        <div id="header-carousel" class="carousel slide" data-bs-ride="carousel" >
      
        <div class="carousel-inner">
        ${data
          .map(
            (item, idx) => `
          <div class="carousel-item ${idx == 0 ? "active" : ""}">
            <img class="w-100" src=${
              item.image_url
            } alt="Image" style="object-fit:cover;" />
            <div class="carousel-caption">
              <div class="p-3 banner-text-container" style="max-width: 900px">
                <h4 class="text-white  text-uppercase mb-4 animated zoomIn">
                  ${item.title}
                </h4>
                <h1 class="display-1 text-white mb-0 animated zoomIn">
                  ${item.subtitle}
                </h1>
              </div>
            </div>
          </div>
          `
          )
          .join("")}
        </div>
        
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;
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
    console.log("hi");
    try {
      console.log("hi");
      const data = await getData("home");
      console.log(data);
      setBanner(data.banners);
      setAbout(data.about);
      setProject(data.projects);
      setServices(data.services);
      setGallery(data.galleries);
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
  console.log("nothing");
});

` <div class="carousel-indicators">
        ${data
          .map(
            (item, idx) => `
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          >
            <img class="img-fluid" src=${item.image} alt="Image" />
          </button>
          `
          )
          .join("")}
        </div>`;
// height: calc(100vh - 124px);
