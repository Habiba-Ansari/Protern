const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".explore__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".job__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".offer__card", {
  ...scrollRevealOption,
  interval: 500,
});


var swiper = new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});




// Get the dropdown button
var dropdownButton = document.querySelector('.dropdown-nav');

// Get the dropdown menu
var dropdownMenu = document.querySelector('.dropdown-menu');

// Add a flag to check if the mouse is over the dropdown menu or button
var isMouseOverDropdown = false;

// Add an event listener to the dropdown button
dropdownButton.addEventListener('mouseover', function() {
  isMouseOverDropdown = true;
  // Show the dropdown menu
  dropdownMenu.classList.add('show');
});

// Add an event listener to the dropdown button
dropdownButton.addEventListener('mouseout', function() {
  setTimeout(function() {
    if (!isMouseOverDropdown) {
      // Hide the dropdown menu
      dropdownMenu.classList.remove('show');
    }
  }, 500);
});

// Add an event listener to the dropdown menu
dropdownMenu.addEventListener('mouseover', function() {
  isMouseOverDropdown = true;
});

// Add an event listener to the dropdown menu
dropdownMenu.addEventListener('mouseout', function() {
  isMouseOverDropdown = false;
  setTimeout(function() {
    if (!isMouseOverDropdown) {
      // Hide the dropdown menu
      dropdownMenu.classList.remove('show');
    }
  }, 500);
});