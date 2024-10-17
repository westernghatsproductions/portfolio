document.addEventListener("DOMContentLoaded", function () {
  const backendUrl = "https://westernghats.pythonanywhere.com/api";

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
      const data = await getData("services");
      setServices(data);
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
