window.onscroll = function() {
  myFunction()
}

function myFunction() {
  if (changeLabel) {
    // The Project Element
    if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
      document.getElementById("navproject").className = "active";
    } else {
      document.getElementById("navproject").className = "";
    }
    // The Home Element
    if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
      document.getElementById("navhome").className = "";
    } else {
      document.getElementById("navhome").className = "active";
    }
  }
}

var sideMenu = document.querySelector(".sidemenu");
var oppMenu = document.querySelector(".menu-icon");
var dimmer = document.querySelector(".dimmer");
var body = document.querySelector("body");

function openSideMenu() {
  sideMenu.classList.add("visible");
  body.classList.add("lock");
  dimmer.classList.add("visible");
}

function closeSideMenu() {
  sideMenu.classList.remove("visible");
  body.classList.remove("lock");
  dimmer.classList.remove("visible");
}

oppMenu.addEventListener("click", openSideMenu, false);
dimmer.addEventListener("click", closeSideMenu, false);
