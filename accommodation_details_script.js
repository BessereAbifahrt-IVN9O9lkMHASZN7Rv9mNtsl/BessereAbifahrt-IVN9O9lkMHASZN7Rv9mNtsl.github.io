const thumbnails = document.getElementById("other-images");
const imgs = thumbnails.getElementsByTagName("img");
const main = document.getElementById("main-image");

let current_image = -1;

for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];

    img.addEventListener("click", function () {
        set_main_image(i);
    });
}

set_main_image(0);

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
        if (current_image <= 0)
            main.style.left = Math.max(-10, Math.min(deltaX, 0)) + 'px';
        else if (current_image >= imgs.length - 1)
            main.style.left = Math.max(0, Math.min(deltaX, 10)) + 'px';
        else
            main.style.left = Math.max(-10, Math.min(deltaX, 10)) + 'px';
    }
});
main.addEventListener("touchend", evt => {
    evt.preventDefault();
    main.style.left = '0';
    if (moved && deltaX < -10 && current_image < imgs.length - 1) {
        set_main_image(current_image + 1);
    }
    if (moved && deltaX > 10 && current_image > 0) {
        set_main_image(current_image - 1);
    }
});

function set_main_image(i) {
    main.src = imgs[i].src;
    imgs[i].className += ' selected';
    if (current_image >= 0) {
        imgs[current_image].className = imgs[current_image].className.replaceAll('selected', '');
    }
    current_image = i;
}