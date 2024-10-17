document.addEventListener("DOMContentLoaded", function () {
  const backendUrl = "https://westernghats.pythonanywhere.com/api";
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
      const data = await getData("gallery");

      setGallery(data);
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
