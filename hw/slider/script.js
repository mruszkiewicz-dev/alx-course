const images = [
  {
    file: "https://coffee.alexflipnote.dev/3cfO-GuqZOU_coffee.jpg",
  },
  {
    file: "https://coffee.alexflipnote.dev/4L5BOd5Uo2s_coffee.jpg",
  },
  {
    file: "https://coffee.alexflipnote.dev/f4uQZUjBlxs_coffee.jpg",
  },
  {
    file: "https://coffee.alexflipnote.dev/w1LQI2jdmkE_coffee.png",
  },
  {
    file: "https://coffee.alexflipnote.dev/WXMBNIFUN_U_coffee.jpg",
  },
  {
    file: "https://coffee.alexflipnote.dev/2ac7UaLOzMU_coffee.jpg",
  },
];

let counter = 0;
const imageElement = document.getElementById("image");

const nextImage = () => {
  counter++;
  console.log(counter, images.length);
  if (images.length <= counter) {
    counter = 0;
  }
  return imageElement.setAttribute("src", images[counter].file);
};

const prevImage = () => {
  counter--;
  console.log(counter, images.length);
  if (counter < 0) {
    counter = images.length - 1;
  }
  return imageElement.setAttribute("src", images[counter].file);
};

const firstImage = () => {
  if (imageElement) {
    imageElement.setAttribute("src", images[0].file);
  }
};

document.addEventListener("DOMContentLoaded", firstImage);
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);
