const mainEl = document.querySelector('main');
const content = document.querySelector('.content');
const images = [...document.querySelectorAll('.img')];
images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./img/${idx + 1}.jpg)`;
  image.addEventListener('click', () => {
    image.classList.toggle('active');
  });
});

//measure content translate
let current = 0;

//store current slide number
let slide = 0;

//set app height to the window.innerHeight because vh doesn't work the same way on mobile
//https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9

const doc = document.documentElement;
const appHeight = () => {
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  current = -slide * window.innerHeight;
  content.style.transform = `translateY(${current}px)`;
};
window.addEventListener('resize', appHeight);
appHeight();

// mainEl.addEventListener('touchstart', startTouch);
// mainEl.addEventListener('touchend', endTouch);
// mainEl.addEventListener('touchmove', moveTouch);

// mainEl.addEventListener('mousedown', startMouseDown);
// mainEl.addEventListener('mouseup', startMouseUp);
mainEl.addEventListener('mousewheel', wheelFunc);

//desktop

let canSwipe = true;
function wheelFunc(e) {
  console.log(e.deltaY);
  if (canSwipe) {
    //scroll / swipe up
    if (e.deltaY > 50 && current !== -(window.innerHeight * 5)) {
      canSwipe = false;
      current -= window.innerHeight;
      slide++;
      content.style.transform = `translateY(${current}px)`;
      setTimeout(() => {
        canSwipe = true;
      }, 500);
    }

    //scroll / swipe down
    if (e.deltaY < 50 && current !== -0) {
      canSwipe = false;
      current += window.innerHeight;
      slide--;
      content.style.transform = `translateY(${current}px)`;
      setTimeout(() => {
        canSwipe = true;
      }, 500);
    }
  }
}
