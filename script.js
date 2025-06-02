const photoList = document.getElementById("photoList");
const photoDetails = document.getElementById("photoDetails");

// Load first 20 photo titles
async function loadPhotos() {
  try {
    const res = await fetch("/photos");
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const photos = await res.json();

    photoList.innerHTML = "";
    photos.forEach((photo) => {
      const li = document.createElement("li");
      li.textContent = photo.title;
      li.onclick = () => showDetails(photo.id);
      photoList.appendChild(li);
    });
  } catch (err) {
    photoList.innerHTML = `<li class="error">Error loading photos: ${err.message}</li>`;
  }
}

// Fetch and display details for a single photo
async function showDetails(id) {
  try {
    const res = await fetch(`/photos/${id}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const photo = await res.json();

    // Pretty-print all properties/values
    photoDetails.textContent = Object.entries(photo)
      .map(([key, val]) => `${key}: ${val}`)
      .join("\n");
  } catch (err) {
    photoDetails.textContent = `Error loading details: ${err.message}`;
  }
}

window.onload = loadPhotos;
