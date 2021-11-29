const hamburgerMenuIcon = document.querySelector(".icon1");
const closeMenuIcon = document.querySelector(".icon2");
const navigationMenu = document.querySelector(".header__nav-desktop");
const overall = document.querySelector(".overall");
const backThisProjectBtn = document.querySelector(".back");

const modalCloseIcon = document.querySelector(".modal-close-icon");

const modal = document.querySelector(".modal");
const modalCompleted = document.querySelector(".modal__completed");

const bookmarkIcon = document.querySelector(".bookmark__icon");
const bookmarkName = document.querySelector(".bookmark__name");

const statsTotalBacked = document.querySelector(".stats__main2"); //89k
const statsTotalSum = document.querySelector(".stats__total"); // 100k
const statsTotalBackers = document.querySelector(".stats__main__backers"); // 5007
const bar = document.querySelector(".bar");

const projectSection = document.querySelector(".project");

const alertSection = document.querySelector(".alert");

const modalLeftElements = document.querySelectorAll(".modal__item__number");
const projectLeftElements = document.querySelectorAll(".project__item__number");

let dataArray = [101, 64, 0];

// EVOKING FUNCTIONS

progressBarChange();
populateTheDom();

// FUNCTION PARADISE

// Storing project amount to an array

function populateTheDom() {
  projectLeftElements.forEach((el, i) => {
    el.innerHTML = dataArray[i];
  });
  modalLeftElements.forEach((el, i) => {
    el.innerHTML = dataArray[i];
  });
}

function updateTheArray() {
  modalLeftElements.forEach((el, i) => {
    dataArray[i] = parseInt(el.innerHTML);
  });
}

// PROGRESS BAR

function progressBarChange() {
  bar.style.width = `${
    (parseInt(statsTotalBacked.innerText) / parseInt(statsTotalSum.innerText)) *
    100
  }%`;
}

function showModal() {
  modal.classList.add("visible");
  overall.classList.add("visible");
}

function hideModal() {
  modal.classList.remove("visible");
  overall.classList.remove("visible");
}

function increaseTheStats(closestInputValue) {
  statsTotalBacked.innerText =
    parseInt(statsTotalBacked.innerText) + closestInputValue;

  statsTotalBackers.innerText = parseInt(statsTotalBackers.innerText) + 1;
}

function resetChecked() {
  modal
    .querySelectorAll(".modal__item--clicked")
    .forEach((item) => item.classList.remove("clicked"));

  // HERE UNCHECK RADIO BUTTONS

  modal.querySelectorAll(".modal__item").forEach((item) => {
    item.querySelector('input[type = "radio"]').checked = false;
    item.querySelector('input[type = "number"]').value = item.querySelector(
      'input[type = "number"]'
    ).min;
  });
}

function showAlert() {
  alertSection.classList.add("visible");
  overall.classList.add("visible");
  alertSection.addEventListener("click", (e) => {
    if (e.target.matches(".btn")) {
      alertSection.classList.remove("visible");
    }
  });
}

function styleWhenBooked() {
  bookmarkName.innerText = "Bookmarked";
  bookmarkName.style.color = "#3cb4ac";
  document.querySelector(".svg-circle").style.fill = "#3cb4ac";
  document.querySelector(".svg-path").style.fill = "#eee";
}

function styleWhenNotBooked() {
  bookmarkName.innerText = "Bookmark";
  bookmarkName.style.color = "#a3a3a3";
  document.querySelector(".svg-circle").style.fill = "#2F2F2F";
  document.querySelector(".svg-path").style.fill = "#B1B1B1";
}

// FUNCTION PARADISE END

// EVENT LISTENERS

hamburgerMenuIcon.addEventListener("click", () => {
  navigationMenu.classList.add("visible");
  overall.classList.add("visible");
  hamburgerMenuIcon.src = "./images/icon-close-menu.svg";
});

navigationMenu.addEventListener("click", (e) => {
  if (!e.target.matches(".link")) return;
  navigationMenu.classList.remove("visible");
  overall.classList.remove("visible");
  hamburgerMenuIcon.src = "./images/icon-hamburger.svg";
});

overall.addEventListener("click", () => {
  navigationMenu.classList.remove("visible");
  hideModal();
  hamburgerMenuIcon.src = "./images/icon-hamburger.svg";
});

backThisProjectBtn.addEventListener("click", showModal);

modalCloseIcon.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    // Select closest input value

    const closestInputValue = parseInt(
      e.target.closest(".modal__item-wrap").querySelector(".modal__item-input")
        .value
    );

    // CHECK IF VALUE IS VALID (more that 0)

    if (isNaN(closestInputValue)) {
      // VALUE IS NOT VALID
      showAlert();
      resetChecked();
    } else {
      // VALUE IS VALID
      // INCREASE THE STATS
      increaseTheStats(closestInputValue);
      progressBarChange();
      resetChecked();
      // CLOSE THE MODAL SHOW COMPLETED

      // ??????
      modal.classList.remove("visible");
      modalCompleted.classList.add("visible");
      // ??????

      ////LEFT NUMBERS PART

      const theTarget = e.target
        .closest(".modal__item")
        .querySelector(".modal__item__number");

      if (!theTarget) return;

      if (parseInt(theTarget.innerHTML) === 0) {
        disableTheOption(theTarget);
      } else {
        theTarget.innerText = parseInt(theTarget.innerHTML) - 1;

        updateTheArray();
        populateTheDom();
      }
    }
  }
});

// FINAL ROUND

function disableTheOption(target) {
  target.closest(".modal__item").classList.add("modal__item--passive");
  target
    .closest(".modal__item")
    .querySelector('input[type = "radio"]').disabled = true;
}

// FINAL ROUND END

modalCompleted.addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    overall.classList.remove("visible");
    modalCompleted.classList.remove("visible");
  }
});

modal.addEventListener("click", (e) => {
  if (!e.target.matches(".radio")) return;

  modal
    .querySelectorAll(".modal__item--clicked")
    .forEach((item) => item.classList.remove("clicked"));

  e.target
    .closest(".modal__item")
    .querySelector(".modal__item--clicked")
    .classList.add("clicked");
});

// BOOKMARK SCRIPT START

// LOCAL STORAGE DEFAULT
if (!localStorage.getItem("Bookmark")) {
  localStorage.setItem("Bookmark", "false");
} else {
  if (JSON.parse(localStorage.getItem("Bookmark"))) {
    styleWhenBooked();
  } else {
    styleWhenNotBooked();
  }
}

bookmarkIcon.addEventListener("click", () => {
  if (!JSON.parse(localStorage.getItem("Bookmark"))) {
    localStorage.setItem("Bookmark", "true");
    styleWhenBooked();
  } else {
    localStorage.setItem("Bookmark", "false");
    styleWhenNotBooked();
  }
});

// BOOKMARK SCRIPT END

// LEFT AMOUNT SCRIPT START

projectSection.addEventListener("click", (e) => {
  if (!e.target.matches(".btn__active")) return;
  showModal();
});

// LEFT AMOUNT SCRIPT END
