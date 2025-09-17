//your code here


const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

const images = ["img1", "img2", "img3", "img4", "img5"];


function generateImages() {
  container.innerHTML = "";
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  
  const duplicate = images[Math.floor(Math.random() * images.length)];
  let allImages = [...images, duplicate];

  
  allImages = allImages.sort(() => Math.random() - 0.5);

  allImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.setAttribute("data-img", cls);
    img.setAttribute("data-index", index);
    container.appendChild(img);
  });
}

let selected = [];

// 🔹 Handle image clicks
container.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const clicked = e.target;

    
    if (selected.some(sel => sel.index === clicked.dataset.index)) return;

    if (selected.length < 2) {
      clicked.classList.add("selected");
      selected.push({
        cls: clicked.dataset.img,
        index: clicked.dataset.index,
      });

      resetBtn.style.display = "inline-block";
    }

   
    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
});


resetBtn.addEventListener("click", () => {
  selected = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  generateImages();
});


verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected[0].cls === selected[1].cls) {
    message.textContent = "You are a human. Congratulations!";
    message.style.color = "green";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
    message.style.color = "red";
  }
});


generateImages();
