const images = [...document.querySelectorAll('.img')];

function imageActive() {
  images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./img/${idx + 1}.jpg)`;
  });
}

imageActive();
