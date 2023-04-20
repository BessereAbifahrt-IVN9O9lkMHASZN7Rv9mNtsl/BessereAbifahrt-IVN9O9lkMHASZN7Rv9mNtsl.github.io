const thumbnails = document.getElementById("other-images");
const imgs = thumbnails.getElementsByTagName("img");
const main = document.getElementById("main-image");

let current_image = 0;

for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];

    img.addEventListener("click", function () {
        main.src = this.src;
        current_image = i;
    });
}

let time;
let moved = false;
let startX = 0;
let startY = 0;
let deltaX = 0;
let deltaY = 0;
main.addEventListener("touchstart", evt => {
    time = evt.timeStamp;
    const obj = evt.changedTouches[0];
    startX = obj.clientX;
    startY = obj.clientY;
    moved = false;
});
main.addEventListener("touchmove", evt => {
    const obj = evt.changedTouches[0];
    deltaX = obj.clientX - startX;
    deltaY = obj.clientY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY) || moved) {
        evt.preventDefault();
        moved = true;
        main.style.left = deltaX + 'px';
    }
});
main.addEventListener("touchend", evt => {
    evt.preventDefault();
    main.style.left = '0';
    if (moved && deltaX < -100 && current_image < imgs.length - 1) {
        current_image++;
        main.src = imgs[current_image].src;
    }
    if (moved && deltaX > 100 && current_image > 0) {
        current_image--;
        main.src = imgs[current_image].src;
    }
});