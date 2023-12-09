const galleryWrapper = document.querySelector('.images-wrapper');
const loadMore = document.querySelector('.loadmore');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');


const apiKey = "C01F7PntYrUKN27W1guuG9lbP9Uqf5jORok8VNWgHAXukXZdJD4hcffx";
const perPage = 12;
let currentPage = 1;

const generateHTML = (images) => {
    galleryWrapper.innerHTML += images.map(image => 
        `
        <div class="image-card">
            <img class='grid-item grid-item-1' src='${image.src.original}' alt=''>
            <div class="download-button" onclick="downloadImages('${image.src.original}')">
              <a href="">Download</a>
              <i class="ri-download-cloud-fill"></i>
             </div>
        </div>
        `
    ).join("")
};

const getImages = (apiURL) => {
    fetch(apiURL, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.photos);
        generateHTML(data.photos);
    })
    .catch(error => {
        alert('Failed to load images Try again');
    });
};


const loadSearchImages = (e) => {
    console.log(e.target.value);
    let searchInput = e.target.value;
}

const searchImages = (e) => {
    if(searchInput.value === '') {
        alert('Please enter a search term');
    } else{
        currentPage = 1;
        galleryWrapper.innerHTML = '';
        getImages(`https://api.pexels.com/v1/search?query=${searchInput.value}&per_page=${perPage}&page=${currentPage}`)
        
    }
}

const loadMoreImages = () => {
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    if (searchInput.value !== '') {
        apiURL = `https://api.pexels.com/v1/search?query=${searchInput.value}&per_page=${perPage}&page=${currentPage}`;
        console.log('searching');
    }
    getImages(apiURL);
};

const downloadImages = (imgURL) => {
    fetch(imgURL).then(response => response.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert('Error downloading image. Please try again'));
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMore.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keyup', loadSearchImages);
searchButton.addEventListener('click', searchImages);


