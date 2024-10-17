document.addEventListener("DOMContentLoaded", function () {
  const backendUrl = "https://westernghats.pythonanywhere.com/api";

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
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
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
                  style="width: 50px; height: 50px"
                />
                <div class="ps-4">
                  <h6>${data.founder_name}</h6>
                  <small>${data.founder_designation}</small>
                </div>
              </div>
              <a class="btn btn-primary rounded-pill py-3 px-5" href=""
                >Read More</a
              >
            </div>
          </div>
        </div>
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
    try {
      const data = await getData("about");

      setAbout(data);
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
