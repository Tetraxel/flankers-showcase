
var bgLoaded1 = false, bgLoaded2 = false;
var lastBgId1 = 1, lastBgId2 = 1;
var nextBackground1 = "", nextBackground2 = "";
var background1 = document.getElementById("background1");
var background2 = document.getElementById("background2");
var argument = document.getElementsByClassName("switchText").item(0).firstChild;
var switchText = document.getElementsByClassName("switchText").item(0);
var switchText1 = document.getElementsByClassName("switchText-1").item(0);
var switchText2 = document.getElementsByClassName("switchText-2").item(0);
var switchTextState = 0;
var slideshow = document.getElementsByClassName("demo");
var slideshowText = ["Franchement, c'est énorme !",
    "Franchement, c'est énorme !",
    "On est là pour mettre des cathédrales",
    "Découvrez TousAntiChômeur"];
var slideshowId = 0;
var firstArgShown = false;
var slideshowDots = document.getElementsByClassName("slideshow_dot");


// load next background before it shows up
function loadNextBackground() {
    var img1 = new Image();
    img1.onload = function () {
        /*console.log("[OK] Next left background loaded : " + nextBackground1);*/
        bgLoaded1 = true;
    }
    nextBackground1 = randomBgUrl(1)
    img1.src = nextBackground1;

    var img2 = new Image();
    img2.onload = function () {
        /*console.log("[OK] Next right background loaded : " + nextBackground2);*/
        bgLoaded2 = true;
    }
    nextBackground2 = randomBgUrl(2)
    img2.src = nextBackground2;
}


// loop to change automatically the left and right background
function backgroundLoop() {
    // end image life
    background1.classList.add("out");
    background2.classList.add("out");

    // wait 2500ms to allow bg images to move outside screen
    setTimeout(function () {
        // assign new bg images
        var delay = background1.style.transitionDelay
        // we set to none to avoid the chrome transition between images
        background1.style.backgroundImage = "none"
        background2.style.backgroundImage = "none"
        setTimeout(function () {
            background1.style.backgroundImage = "url('" + nextBackground1 + "')";
            background2.style.backgroundImage = "url('" + nextBackground2 + "')";
            // background1.style.transitionDelay = delay

            // wait for the background to be loaded
            function waitBackgroundLoading() {
                if (bgLoaded1 && bgLoaded2) {
                    bgLoaded1 = false;
                    bgLoaded2 = false;
                    background1.classList.remove("out");
                    background2.classList.remove("out");
                    loadNextBackground();
                    setTimeout(backgroundLoop, 7000); // loop
                } else
                    setTimeout(waitBackgroundLoading, 200);
            }
            waitBackgroundLoading();
        }, 10);
    }, 1600);
}


// generate a random background image url
function randomBgUrl(id) {
    var url, randomNumber;
    if (id == 1) { //left
        do {
            randomNumber = (Math.floor(Math.random() * 6) + 1);
        }
        while (randomNumber == lastBgId1);
        lastBgId1 = randomNumber;
        url = "img/wip/bg1_" + randomNumber + ".png";
    } else if (id == 2) { //right
        do {
            randomNumber = (Math.floor(Math.random() * 7) + 1);
        }
        while (randomNumber == lastBgId2);
        lastBgId2 = randomNumber;
        url = "img/wip/bg2_" + randomNumber + ".png";
    }
    return url;
}




loadNextBackground();

setTimeout(function () {
    backgroundLoop();
}, 8000);






function switchTextOut() {
    if (switchTextState == 0) {
        textOut = switchText1;
        textIn = switchText2;
    }
    else {
        textOut = switchText2;
        textIn = switchText1;
    }
    if (slideshowId == 0) {
        switchText.classList.add("no-transition");
    }
    textOut.classList.add("up");
    textIn.classList.remove("down");
}

function switchTextIn() {
    if (switchTextState == 0)
        textOut = switchText1;
    else
        textOut = switchText2;
    if (slideshowId == 0) {
        switchText.classList.add("no-transition");
    }
    textOut.classList.add("down");
    textOut.classList.remove("up");
    textOut.textContent = slideshowText[(slideshowId + 2) % slideshow.length];
    switchTextState = (switchTextState + 1) % 2;
}

function slideshowLoop() {
    slideshow[slideshowId].classList.add("out");
    switchTextOut();
    for (i = 0; i < slideshowDots.length; i++) {
        slideshowDots[i].classList.remove("selected");
        if (slideshowId == slideshow.length - 1 && i + 1 == slideshowId)
            slideshowDots[0].classList.add("selected");
        else if (i == slideshowId)
            slideshowDots[i].classList.add("selected");
    }
    setTimeout(function () {
        // slideshow[slideshowId].style.display = "none";
        slideshow[slideshowId].classList.add("free");
        switchTextIn();
        slideshowId = (slideshowId + 1) % slideshow.length;
        // slideshow[slideshowId].style.display = "block";
        slideshow[slideshowId].classList.remove("free");
        slideshow[slideshowId].classList.remove("out");

        switchText.classList.remove("no-transition");

        setTimeout(function () {
            slideshowLoop();
        }, 3000);
    }, 500);
}


// each element except the first
for (i = 0; i < slideshow.length; i++) {
    // slideshow[i].style.display = "none";
    slideshow[i].classList.add("out");
    slideshow[i].classList.add("free");
}

switchText1.textContent = slideshowText[0];
switchText2.textContent = slideshowText[1];

setTimeout(function () {
    // slideshow[0].style.display = "block"
    slideshow[0].classList.remove("out");
    slideshow[0].classList.remove("free");
}, 2000);

setTimeout(function () {
    slideshowLoop();
}, 5000);





// Go down button
var scroll2_function = background2.addEventListener("scroll", function (event) {
    // GO DOWN ARROW - DISCOVER
    if (background2.scrollTop < 100) {
        document.getElementsByClassName("section_godown")[0].classList.remove("scrolled");
    } else {
        document.getElementsByClassName("section_godown")[0].classList.add("scrolled");
    }

});

