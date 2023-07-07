"use strict";

let audioElement;

// Function to play the audio file
function playAudio(file) {
  // Create a new audio element if it doesn't exist
  if (!audioElement) {
    audioElement = new Audio();
  }

  // Set the source file and play the audio
  audioElement.src = file;
  audioElement.play();
}

// Function to stop the audio
function stopAudio() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}
// Function to play the audio file on hover
function playAudioOnHover(file) {
  // Create a new audio element if it doesn't exist
  if (!audioElement) {
    audioElement = new Audio();
  }

  // Set the source file and play the audio
  audioElement.src = file;
  audioElement.play();
}

document.addEventListener("DOMContentLoaded", function () {
  // Get all the genre images
  const genreImages = document.querySelectorAll(".genre-image");
  // Get all the decade images
  const decadeImages = document.querySelectorAll(".decade-image");

  // Initialize click counters
  let genreClickCount = 0;
  let decadeClickCount = 0;

  // Retrieve the saved genre votes, decade votes, and individual votes from local storage
  let genreVotes = JSON.parse(localStorage.getItem("genreVotes")) || {};
  let decadeVotes = JSON.parse(localStorage.getItem("decadeVotes")) || {};
  let individualVotes =
    JSON.parse(localStorage.getItem("individualVotes")) || {};

  // Add click event listeners to each genre image
  genreImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Check if the name input field is empty
      const name = document.getElementById("nameInput").value;
      if (!name) {
        alert("Please enter your name before making a selection.");
        return;
      }

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

      // Add the genre to genreVotes object and increase the vote count
      const genre = this.dataset.genre;
      genreVotes[genre] = (genreVotes[genre] || 0) + 1;

      // Add the individual vote to the person's votes
      individualVotes[name] = individualVotes[name] || {};
      individualVotes[name].genre = individualVotes[name].genre || [];
      individualVotes[name].genre.push(genre);

      // Check if the click count reaches 3
      if (genreClickCount === 3) {
        // Add a delay before hiding the genre images
        setTimeout(function () {
          // Hide genre images
          genreImages.forEach((image) => {
            image.style.display = "none";
          });

          // Show decade images
          decadeImages.forEach((image) => {
            image.style.display = "inline-block";
          });
        }, 500);
      }

      // Save the genre votes, decade votes, individual votes, and the person's name to local storage
      saveToLocalStorage();
    });

    genreImages.forEach((image) => {
      image.addEventListener("mouseenter", function () {
        const name = document.getElementById("nameInput").value;
        if (!name) {
          return; // Do nothing if the name is not entered
        }

        const file = this.dataset.file;
        if (file) {
          playAudioOnHover(file);
        }
      });

      // Add mouseleave event listeners to stop the audio on mouse leave
      image.addEventListener("mouseleave", function () {
        stopAudio();
      });
    });
  });
  // Add click event listeners to each decade image
  decadeImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Check if the name input field is empty
      const name = document.getElementById("nameInput").value;
      if (!name) {
        alert("Please enter your name before making a selection.");
        return;
      }

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

      // Add the decade to decadeVotes object and increase the vote count
      const decade = this.dataset.decade;
      decadeVotes[decade] = (decadeVotes[decade] || 0) + 1;

      // Add the individual vote to the person's votes
      individualVotes[name] = individualVotes[name] || {};
      individualVotes[name].decade = individualVotes[name].decade || [];
      individualVotes[name].decade.push(decade);

      // Check if the click count reaches 3
      if (decadeClickCount === 3) {
        // Disable further clicks on all decade images
        decadeImages.forEach((image) => {
          image.style.pointerEvents = "none";
        });

        // Show the refresh button
        document.getElementById("refreshButton").style.display = "block";
      }

      // Save the genre votes, decade votes, individual votes, and the person's name to local storage
      saveToLocalStorage();
    });
  });

  // Save the genre votes, decade votes, individual votes, and the person's name to local storage
  function saveToLocalStorage() {
    const votes = {
      genreVotes: genreVotes,
      decadeVotes: decadeVotes,
      individualVotes: individualVotes,
    };
    localStorage.setItem("genreVotes", JSON.stringify(genreVotes));
    localStorage.setItem("decadeVotes", JSON.stringify(decadeVotes));
    localStorage.setItem("individualVotes", JSON.stringify(individualVotes));
    localStorage.setItem("votes", JSON.stringify(votes));
  }
});

// Retrieve the votes data from local storage
const votes = JSON.parse(localStorage.getItem("votes")) || {};
const genreVotes = votes.genreVotes || {};
const decadeVotes = votes.decadeVotes || {};

// Generate a table for genre votes
const genreTable = document.createElement("table");
genreTable.innerHTML = "<tr><th>Genre</th><th>Votes</th></tr>";
genreTable.style.fontFamily = "Bebas Neue";
genreTable.style.fontSize = "2rem";
genreTable.style.lineHeight = "1.2";

for (const genre in genreVotes) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${genre}</td><td>${genreVotes[genre]}</td>`;
  genreTable.appendChild(row);
}

// Append the genre table to the container element
const genreTableContainer = document.getElementById("genreTableContainer");
genreTableContainer.appendChild(genreTable);

// Generate a pie chart for genre votes
const genreChartLabels = Object.keys(genreVotes);
const genreChartVotes = Object.values(genreVotes);

const genreChartCanvas = document.getElementById("genreChartCanvas");
new Chart(genreChartCanvas, {
  type: "pie",
  data: {
    labels: genreChartLabels,
    datasets: [
      {
        data: genreChartVotes,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#3CB371",
          "#FFA500",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#3CB371",
          "#FFA500",
        ],
      },
    ],
  },
});

// Generate a table for decade votes
const decadeTable = document.createElement("table");
decadeTable.innerHTML = "<tr><th>Decade</th><th> </th><th>Votes</th></tr>";
decadeTable.style.fontFamily = "Bebas Neue";
decadeTable.style.fontSize = "2rem";
decadeTable.style.lineHeight = "1.2";

for (const decade in decadeVotes) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${decade}</td><td>${decadeVotes[decade]}</td>`;
  decadeTable.appendChild(row);
}

// Append the decade table to the container element
const decadeTableContainer = document.getElementById("decadeTableContainer");
decadeTableContainer.appendChild(decadeTable);

// Generate a pie chart for decade votes
const decadeChartLabels = Object.keys(decadeVotes);
const decadeChartVotes = Object.values(decadeVotes);

const decadeChartCanvas = document.getElementById("decadeChartCanvas");
new Chart(decadeChartCanvas, {
  type: "pie",
  data: {
    labels: decadeChartLabels,
    datasets: [
      {
        data: decadeChartVotes,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#3CB371",
          "#FFA500",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#3CB371",
          "#FFA500",
        ],
      },
    ],
  },
});

// Create the refresh button element
const refreshButton = document.createElement("button");
refreshButton.id = "refreshButton";
refreshButton.textContent = "Vote Again";

// Append the refresh button to the appropriate container or element on the voting page
const votingPageContainer = document.getElementById("votingPageContainer");
if (votingPageContainer) {
  votingPageContainer.appendChild(refreshButton);
}

// Attach a click event listener to the refresh button
refreshButton.addEventListener("click", function () {
  location.href = location.href;
});
// Call the function to attach the event listener after the refresh button is created
attachRefreshButtonListener();
