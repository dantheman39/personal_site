document.getElementById("menuImage").addEventListener("click", function(e) {
	var navDiv = document.getElementById("navDiv");
	if (window.getComputedStyle(navDiv).visibility == 'hidden') {
		navDiv.style.visibility = "visible";
	} else {
		navDiv.style.visibility = "hidden";
	}
});
