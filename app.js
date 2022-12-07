const mainEl = document.querySelector('main');
const content = document.querySelector('.content');
const containers = [...document.querySelectorAll('.text-container')];

//measure content translate
let current = 0;

//store current slide number
let slide = 0;
containers[slide].classList.add('active');

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

mainEl.addEventListener('touchstart', startTouch, { passive: false });
mainEl.addEventListener('touchend', endTouch, { passive: false });
mainEl.addEventListener('touchmove', moveTouch, { passive: false });

mainEl.addEventListener('mousedown', startMouseDown);
mainEl.addEventListener('mouseup', startMouseUp);
mainEl.addEventListener('mousewheel', wheelFunc, { passive: false });

//desktop

let canSwipe = true;
function wheelFunc(e) {
  //console.log(e.deltaY);
  if (canSwipe) {
    //scroll / swipe down
    if (e.deltaY > 50 && current !== -(window.innerHeight * 5)) {
      canSwipe = false;
      current -= window.innerHeight;
      slide++;
      previousSlide = slide - 1;
      containers[slide].classList.add('active');
      containers[previousSlide].classList.remove('active');
      content.style.transform = `translateY(${current}px)`;
      setTimeout(() => {
        canSwipe = true;
      }, 500);
    }

    //scroll / swipe up
    if (e.deltaY < 50 && current !== -0) {
      canSwipe = false;
      current += window.innerHeight;
      slide--;
      content.style.transform = `translateY(${current}px)`;
      const nextSlide = slide + 1;
      containers[nextSlide].classList.remove('active');
      containers[slide].classList.add('active');
      setTimeout(() => {
        canSwipe = true;
      }, 500);
    }
  }
}

let initialStart = 0;
let initialEnd = 0;

let initialY = 0;
let endY = 0;

function startMouseDown(e) {
  initialStart = Date.now();
  initialY = e.clientY;
}

function startMouseUp(e) {
  initialEnd = Date.now();
  endY = e.clientY;
  //console.log(initialEnd - initialStart);
  if (initialEnd - initialStart < 800) {
    swipe();
  }
}

//touch screens
function startTouch(e) {
  initialStart = Date.now();
  initialY = e.touches[0].clientY;
}

function endTouch(e) {
  initialEnd = Date.now();
  endY = e.changedTouches[0].clientY;
  if (initialEnd - initialStart < 800) {
    swipe();
  }
}

function swipe() {
  //swipe / drag up
  if (endY - initialY < -50) {
    if (current !== -(window.innerHeight * 5)) {
      current -= window.innerHeight;
      slide++;
      content.style.transform = `translateY(${current}px)`;
    }
  } else if (endY - initialY > 50) {
    if (current !== 0) {
      current += window.innerHeight;
      slide--;
    }
  }
  content.style.transform = `translateY(${current}px)`;
}

function moveTouch(e) {
  e.preventDefault();
}
