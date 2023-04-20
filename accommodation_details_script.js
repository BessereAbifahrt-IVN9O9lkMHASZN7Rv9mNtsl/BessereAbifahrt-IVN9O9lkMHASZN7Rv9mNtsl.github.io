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

