document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiry-form");
  const backendUrl = "https://westernghats.pythonanywhere.com/api/contact/";

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally.

    const formData = new FormData(event.target); // Collect form data.
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Form Data:", data); // Debugging

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON data to backend.
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Provide feedback to the user.
      alert("Your message has been sent successfully!");
      form.reset(); // Clear the form after successful submission.
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send your message. Please try again later.");
    }
  });
});
var spinner = function () {
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);
};
spinner();
