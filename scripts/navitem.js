window.onscroll = function() {myFunction()};

function myFunction() {
	<!-- The Project Element -->
  if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
    document.getElementById("navproject").className = "active";
  } else {
    document.getElementById("navproject").className = "";
  }
  <!-- The Home Element -->
  if (document.body.scrollTop > 520 || document.documentElement.scrollTop > 520) {
    document.getElementById("navhome").className = "";
  } else {
    document.getElementById("navhome").className = "active";
  }
}