var TABS = (function() {

	var changeTab = function(e) {
		var tabContent = document.getElementsByClassName("tabContent");
		var tabLinks = document.getElementsByClassName("tabLinks");
		var numTabs = tabContent.length;
		var numLinks = tabLinks.length;
		var tabToShow = e.currentTarget.dataset.tabid;
		var i;

		if (numLinks !== numTabs) {
			throw "There are a different number of tabs and links to those tabs";
		}

		for (i = 0; i < numTabs; i++) {
			tabContent[i].style.display = "none";
		}

		for (i = 0; i < numLinks; i++) {
			tabLinks[i].className = tabLinks[i].className.replace(" active", "");
		}
		
		document.getElementById(tabToShow).style.display = "block";
		e.currentTarget.className += " active";
	
	};

	var setup = function() {
		var tabLinks = document.getElementsByClassName("tabLinks");
		var numTabLinks = tabLinks.length;
		var i;
		for (i = 0; i < numTabLinks; i++) {
			tabLinks[i].addEventListener("click", TABS.changeTab);
		}
		// Send a click message to the first tab so it's visible
		document.getElementsByClassName("tabLinks")[0].click();
	};

	return {
		"setup": setup,
		"changeTab": changeTab 
	};
})();

TABS.setup();
