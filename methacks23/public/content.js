// Blur images and add overlay
function blurImagesAndAddOverlay() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      const image = images[i];


        // Wrap the image with a container div
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        image.parentNode.insertBefore(imageContainer, image);
        imageContainer.appendChild(image);
    
        // Create the overlay elements
        const overlay = document.createElement("div");
        overlay.className = "overlay";
    
        const text = document.createElement("p");
        text.innerText = "Hidden by ZenSphere.";
        overlay.appendChild(text);
    
        const button = document.createElement("button");
        button.innerText = "Show Anyway";
        button.addEventListener("click", showImage.bind(null, imageContainer));
        overlay.appendChild(button);
    
        imageContainer.appendChild(overlay);
    
        // Blur the image
        image.style.filter = "blur(18px)";

    }
  }
  
  // Show image and remove overlay
function showImage(imageContainer) {
  const image = imageContainer.querySelector("img");
  image.style.filter = "none";
  
  const overlay = imageContainer.querySelector(".overlay");
  overlay.remove();
}

// Entry point
function init() {
  // loadModel();
  blurImagesAndAddOverlay();
}
// Wait for the page to load
  
window.addEventListener("load", init);
