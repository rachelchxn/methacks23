function blurImages() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      images[i].style.filter = "blur(8px)";
    }
  }
  
  // Create overlay elements
  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
  
    const text = document.createElement("p");
    text.innerText = "Hidden by ZenSphere";
    overlay.appendChild(text);
  
    const button = document.createElement("button");
    button.innerText = "Show Anyway";
    button.addEventListener("click", showImages);
    overlay.appendChild(button);
  
    document.body.appendChild(overlay);
  }
  
  // Show images and remove overlay
  function showImages() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      images[i].style.filter = "none";
    }
  
    const overlay = document.querySelector(".overlay");
    overlay.remove();
  }
  
  // Entry point
  function init() {
    blurImages();
    createOverlay();
  }
  
  // Wait for the page to load
  window.addEventListener("load", init);