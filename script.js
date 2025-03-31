

const accessKey = "vNqsZ6dKyeSQn5dpF5U69njlUoxB3727W1NpPEiYlpc";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach(result => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const downloadLink = document.createElement("a");
        downloadLink.href = result.urls.full; // Use the full image URL
        downloadLink.download = "image.jpg"; // Add a default filename
        downloadLink.innerText = "Download";
        downloadLink.classList.add("download-btn");

        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            downloadImage(result.urls.full);
        });

        imageContainer.appendChild(image);
        imageContainer.appendChild(downloadLink);
        searchResult.appendChild(imageContainer);
    });
    showMoreBtn.style.display = "block";
}

async function downloadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});


