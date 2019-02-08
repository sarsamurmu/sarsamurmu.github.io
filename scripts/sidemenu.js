function toggleSideMenu() {
	sideMenu.classList.add("menu--animatable");	
	if(!sideMenu.classList.contains("menu--visible")) {		
		sideMenu.classList.add("menu--visible");
	} else {
		sideMenu.classList.remove('menu--visible');		
	}
	<!-- Disable Scrolling Body when Sidemenu is opened -->
	if(!body.classList.contains("lock")) {		
		body.classList.add("lock");
	} else {
		body.classList.remove('lock');		
	}
}

function startDim() {
  document.getElementById("dim-container").style.width = "100%";
  document.getElementById("dim-container").style.transition = "0s";
  dimmer.classList.add("menu--visible");
}

function endDim() {
  document.getElementById("dim-container").style.width = "0%";
  document.getElementById("dim-container").style.transitionDelay = "0.55s";
  dimmer.classList.remove("menu--visible");
toggleSideMenu();
}

function OnTransitionEnd() {
	sideMenu.classList.remove("menu--animatable");
}

var sideMenu = document.querySelector(".sidemenu");
var oppMenu = document.querySelector(".menu-icon");
var dimmer = document.querySelector(".dimmer");
var body = document.querySelector(".body");
var projecttext = document.querySelector(".projecttext");
sideMenu.addEventListener("transitionend", OnTransitionEnd, false);
projecttext.addEventListener("click", toggleSideMenu, false);
oppMenu.addEventListener("click", toggleSideMenu, false);
dimmer.addEventListener("click", toggleSideMenu, false);
function closeNav(){ endDim(); toggleSideMenu(); }
function openNav(){ startDim(); toggleSideMenu(); }
