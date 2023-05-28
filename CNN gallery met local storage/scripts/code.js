// Declare and initialize the currentIndex variable to 0
let currentIndex = 0;

// Function to set up the initial state of the application
const setup = () => {

    // Get the thumbnail list element
    const thumbnailList = document.querySelector("#thumbnail-list");


    // Loop through the galleryData to generate thumbnail images
    for (let i = 0; i < galleryData.length; i++) {
        // Get the image description for the current index
        const imageDescription = galleryData[i];

        // Create the HTML for the thumbnail image with data-index attribute
        const html = `<img src="${imageDescription.urlThumb}" data-index="${i}" class="thumbnail">`;

        // Append the thumbnail image to the thumbnail list
        thumbnailList.insertAdjacentHTML("beforeend", html);
    }


    // Add a click event listener to the thumbnail list to handle thumbnail selection
    thumbnailList.addEventListener("click", selectThumbnail);


    // Get the right navigation arrow element
    const navRight = document.querySelector("#image-nav-right");


    // Add a click event listener to the right navigation arrow
    navRight.addEventListener("click", navigateRight);


    // Get the left navigation arrow element
    const navLeft = document.querySelector("#image-nav-left");


    // Add a click event listener to the left navigation arrow
    navLeft.addEventListener("click", navigateLeft);


    // Get the element for displaying the total number of thumbnails
    const numThumbs = document.querySelector("#numThumbs");


    // Set the text content of the numThumbs element to the total number of thumbnails
    numThumbs.textContent = galleryData.length;


    // Check if the currentIndex is stored in localStorage
    if (localStorage.getItem("currentIndex")) {
        // Retrieve the currentIndex from localStorage and parse it as an integer
        currentIndex = parseInt(localStorage.getItem("currentIndex"));
    }


    // Call the updateUI function to reflect the current state on page load
    updateUI();
};

// Function to handle thumbnail selection
const selectThumbnail = (event) => {

    // Get the selected thumbnail's index from the data-index attribute
    const indexAsText = event.target.getAttribute("data-index");


    // Convert the index from string to number
    const index = Number.parseInt(indexAsText, 10);


    // Update the currentIndex with the selected index
    currentIndex = index;


    // Call the updateUI function to reflect the current state
    updateUI();


    // Store the updated currentIndex in localStorage
    localStorage.setItem("currentIndex", currentIndex.toString());
};

// Function to update the UI based on the current index
const updateUI = () => {

    // Get the image description for the current index
    const imageDescription = galleryData[currentIndex];


    // Get the URL of the full-size image
    const urlFull = imageDescription.urlFull;


    // Set the source of the big image to the URL of the full-size image
    const imgBig = document.querySelector(".image-navigator>img");
    imgBig.setAttribute("src", urlFull);


    // Get the counter element for displaying the current index
    const counter = document.querySelector("#counter");


    // Set the text content of the counter element to the current index + 1
    counter.textContent = currentIndex + 1;


    // Get the element for displaying the copyright
    const txtCopyright = document.querySelector("#copyright");


    // Set the text content of the copyright element to the current image's copyright
    txtCopyright.textContent = imageDescription.copyright;


    // Get the element for displaying the description
    const txtDescription = document.querySelector("#description");


    // Set the HTML content of the description element to the current image's description
    txtDescription.innerHTML = imageDescription.description;


    // Get all thumbnail images in the thumbnail list
    const thumbnailList = document.querySelectorAll("#thumbnail-list>img");


    // Iterate over each thumbnail image
    for (let i = 0; i < thumbnailList.length; i++) {
        const img = thumbnailList[i];


        // Get the data-index attribute value of the current thumbnail
        const dataIndexAsText = img.getAttribute("data-index");


        // Convert the data-index value from string to number
        const index = Number.parseInt(dataIndexAsText, 10);


        // Add or remove the "activeThumbnail" class based on the current index
        if (index === currentIndex) {
            img.classList.add("activeThumbnail");
        } else {
            img.classList.remove("activeThumbnail");
        }
    }

};

// Function to navigate to the previous image
const navigateLeft = (event) => {

    // Decrement the currentIndex
    currentIndex--;


    // Wrap around to the last image if currentIndex goes below 0
    if (currentIndex < 0) {
        currentIndex = galleryData.length - 1;
    }

    
    // Update the UI after navigating
    updateUI();


    // Prevent navigation to href="#"
    event.preventDefault();


    // Store the updated currentIndex in localStorage
    localStorage.setItem("currentIndex", currentIndex.toString());

};

// Function to navigate to the next image
const navigateRight = (event) => {

    // Increment the currentIndex
    currentIndex++;


    // Wrap around to the first image if currentIndex exceeds the array length
    if (currentIndex > galleryData.length - 1) {
        currentIndex = 0;
    }


    // Update the UI after navigating
    updateUI();


    // Prevent navigation to href="#"
    event.preventDefault();


    // Store the updated currentIndex in localStorage
    localStorage.setItem("currentIndex", currentIndex.toString());

};

// Add a load event listener to execute the setup function when the page loads
window.addEventListener("load", setup);

