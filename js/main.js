navvisible = false;
document.getElementById("hamburger").addEventListener("click", () => {
    if (navvisible) {
        document.getElementById("navlist").style.maxHeight = "0";
        navvisible = false;
    } else {
        document.getElementById("navlist").style.maxHeight = "100vh";
        navvisible = true;
    }
});

// Scroll
function scrollTo(element) {
    window.scroll({
        behavior: "smooth",
        left: 0,
        top: element.offsetTop - 70,
    });
}
document.querySelectorAll(".scroll").forEach((element) => {
    element.addEventListener("click", () => {
        if (navvisible) {
            document.getElementById("navlist").style.maxHeight = "0";
            navvisible = false;
        }
        target_id = element.getAttribute("data-scroll");
        scrollTo(document.getElementById(target_id));
    });
});

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    // document.body.appendChild(css);
};

// Image Gallery
images = document.querySelectorAll(".images img");
n_images = images.length;
let dot, dots;
dots = document.createElement("div");
dots.classList.add("dots");
for (let i = 0; i < n_images; i++) {
    dot = document.createElement("div");
    dot.classList.add("dot");
    if (i == 0) {
        dot.classList.add("highlighted");
    }
    dots.appendChild(dot);
}
document.querySelector(".gallery-container").appendChild(dots);
left_btn = document.getElementById("left");
right_btn = document.getElementById("right");
dom_dots = document.querySelectorAll(".dot");
current_img = 1;
left_btn.addEventListener("click", prevImage);
right_btn.addEventListener("click", nextImage);
function prevImage() {
    if (current_img === 1) {
        setImage(n_images);
    } else {
        setImage(current_img - 1);
    }
}
function nextImage() {
    console.log(current_img + "  " + n_images);
    if (current_img === n_images) {
        setImage(1);
    } else {
        setImage(current_img + 1);
    }
}
function setImage(img_num) {
    images[current_img - 1].classList.remove("visible");
    dom_dots[current_img - 1].classList.remove("highlighted");
    images[img_num - 1].classList.add("visible");
    dom_dots[img_num - 1].classList.add("highlighted");
    current_img = img_num;
}
dom_dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
        setImage(i + 1);
    });
});
setInterval(() => {
    nextImage();
}, 7000);
