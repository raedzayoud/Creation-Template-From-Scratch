let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// settings box

let gearIcon = document.querySelector(".toggle-settings .fa-gear");

gearIcon.onclick = function () {
  // toggle ajoute si absent, enlève si présent
  gearIcon.classList.toggle("fa-spin");

  document.querySelector(".setting-box").classList.toggle("open");
};

// settings box

// get DataColor

const colorLi = document.querySelectorAll(".color-list li");

console.log(colorLi);

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);

    HandleActive(e);
  });
});

let backgroundImage = false;
let backgroundInterval;

const randomBackEl = document.querySelectorAll(".option-box .random span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundImage = true;
      randomiseImgs();
    } else {
      backgroundImage = false;
      clearInterval(backgroundInterval);
    }
  });
});

function HandleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

function randomiseImgs() {
  // landing page background

  let landingPage = document.querySelector(".landing-page");

  let imageList = ["image1.jpg", "image2.jpg", "image3.jpg"];

  if (backgroundImage == true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imageList.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + imageList[randomNumber] + '")';
    }, 1000);
  }
}

randomiseImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

// remove the popup
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// select all Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all Links

const allLinks = document.querySelectorAll(".links a");

function goToSomeneWhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

goToSomeneWhere(allBullets);
goToSomeneWhere(allLinks);

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let butlletnav = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_options");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    butlletnav.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    butlletnav.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      butlletnav.style.display = "block";
      localStorage.setItem("bullets_options", "block");
    } else {
      butlletnav.style.display = "none";
      localStorage.setItem("bullets_options", "none");
    }
    HandleActive(e);
  });
});

document.querySelector(".setting-box .reset-option").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// toggle-menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});

links.onclick = function (e) {
  e.stopPropagation();
};
