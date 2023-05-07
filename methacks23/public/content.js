let isModelLoading = false;
let model = null;
let results = [];
let visible = true;
const imageRef = document.createElement('img');

const loadModel = async () => {
  isModelLoading = true;
  try {
    const mobilenetModule = await import("@tensorflow-models/mobilenet");
    model = await mobilenetModule.load();
    isModelLoading = false;
  } catch (error) {
    console.log(error);
    isModelLoading = false;
  }
};


const identify = async (imageRef) => {
  const result = await model.classify(imageRef);
  results = result;
  let includesObj = false;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.className.includes('jersey')) {
      includesObj = true;
      break;
    }
  }
  if (includesObj) {
    return(false)
  } else {
    return(true)
  }
};

// Blur images and add overlay
function blurImagesAndAddOverlay() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // let show = identify(image)

      // if(!show) {
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
        image.style.filter = "blur(8px)";

      // }
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
async function init() {
  await loadModel();
  blurImagesAndAddOverlay();
}
  
  // Wait for the page to load
  
  window.addEventListener("load", init);
