function openSideMenu() {
	sideMenu.classList.add("menu--animatable");	
	sideMenu.classList.add("menu--visible");
  body.classList.add("lock");
 document.getElementById("dim-container").style.width = "100%";
  document.getElementById("dim-container").style.transition = "0s";
  dimmer.classList.add("menu--visible");
}

function closeSideMenu() {
	sideMenu.classList.add("menu--animatable");	
	sideMenu.classList.remove("menu--visible");
  body.classList.remove("lock");
 document.getElementById("dim-container").style.width = "0%";
  document.getElementById("dim-container").style.transitionDelay = "0.55s";
  dimmer.classList.remove("menu--visible");
}

function OnTransitionEnd() {
	sideMenu.classList.remove("menu--animatable");
}

var sideMenu = document.querySelector(".sidemenu");
var oppMenu = document.querySelector(".menu-icon");
var dimmer = document.querySelector(".dimmer");
var body = document.querySelector(".body");
sideMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", openSideMenu, false);dimmer.addEventListener("click", closeSideMenu, false);
