// Get all the genre images
const genreImages = document.querySelectorAll(".genre-image");
// Get all the decade images
const decadeImages = document.querySelectorAll(".decade-image");

// Initialize click counters
let genreClickCount = 0;
let decadeClickCount = 0;

// Add click event listeners to each genre image
genreImages.forEach((image) => {
  image.addEventListener("click", function () {
    // Check if the image has already been clicked or if the limit has been reached
    if (this.classList.contains("clicked") || genreClickCount >= 3) {
      return; // Do nothing if already clicked or limit reached
    }

    // Add 'clicked' class to the image
    this.classList.add("clicked");

    // Add 'selected' class to the image
    this.classList.add("selected");

    // Increase the genre click count
    genreClickCount++;

    // Check if the click count reaches 3
    if (genreClickCount === 3) {
      // Hide genre images
      genreImages.forEach((image) => {
        image.style.display = "none";
      });

      // Show decade images
      decadeImages.forEach((image) => {
        image.style.display = "inline-block";
      });
    }
  });
});

// Add click event listeners to each decade image
decadeImages.forEach((image) => {
  image.addEventListener("click", function () {
    // Check if the image has already been clicked or if the limit has been reached
    if (this.classList.contains("clicked") || decadeClickCount >= 3) {
      return; // Do nothing if already clicked or limit reached
    }

    // Add 'clicked' class to the image
    this.classList.add("clicked");

    // Add 'selected' class to the image
    this.classList.add("selected");

    // Increase the decade click count
    decadeClickCount++;

    // Check if the click count reaches 3
    if (decadeClickCount === 3) {
      // Disable further clicks on all decade images
      decadeImages.forEach((image) => {
        image.style.pointerEvents = "none";
      });

      // Display a confirmation message
      displayConfirmationMessage();
    }
  });
});

// Function to display the confirmation message
function displayConfirmationMessage() {
  const confirmationMessage = document.createElement("p");
  confirmationMessage.textContent = "Thank you for voting!";
  confirmationMessage.style.fontWeight = "bold";
  confirmationMessage.style.marginTop = "10px";

  document.body.appendChild(confirmationMessage);
}

// Get the submit button
const submitBtn = document.getElementById("submitBtn");

// Add click event listener to the submit button
submitBtn.addEventListener("click", function () {
  // Get the selected genres
  const selectedGenres = Array.from(
    document.querySelectorAll(".genre-image.selected")
  ).map((image) => image.dataset.genre);

  // Get the selected decades
  const selectedDecades = Array.from(
    document.querySelectorAll(".decade-image.selected")
  ).map((image) => image.dataset.decade);

  // Save the selected genres and decades to local storage
  localStorage.setItem("favoriteGenres", JSON.stringify(selectedGenres));
  localStorage.setItem("favoriteDecades", JSON.stringify(selectedDecades));

  // Display a confirmation message or perform any additional actions
  alert("Thank you for voting!");
});
