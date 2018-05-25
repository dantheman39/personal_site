var TABS = (function() {

	// The cookie will save their last chosen
	// tab for a day, so that the same tab 
	// will be visible after a page refresh 
	// or change of language.
	var _tabCookieName = "driggs-home-tab";
	var _getCookie;
	var _setCookie;
	var changeTab;
	var setup;

	_getCookie = function(cookieName) {
		var name = cookieName + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var cookieArray = decodedCookie.split(";");
		var numCookies = cookieArray.length;
		var i;
		var c = null;
		for (i = 0; i < numCookies; i++) {
			c = cookieArray[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
			
		}
		return "";
	};

	_setCookie = function(cookieName, cookieVal, expiresDays) {
		var d = new Date();
		d.setTime(d.getTime() + (expiresDays * 24 * 60 * 80 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
	};

	changeTab = function(e) {
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

		_setCookie(_tabCookieName, tabToShow,1)
	
	};

	setup = function() {
		var tabLinks = document.getElementsByClassName("tabLinks");
		var numTabLinks = tabLinks.length;
		var i;
		var lastTab;
		var tabLink;
		for (i = 0; i < numTabLinks; i++) {
			tabLinks[i].addEventListener("click", TABS.changeTab);
		}

		// See if they had the tab cookie set
		lastTab = _getCookie(_tabCookieName);

		if (lastTab) {
			for (i = 0; i < numTabLinks; i++) {
				tabLink = tabLinks[i];
				if (tabLink.dataset.tabid === lastTab) {
					tabLink.click();
					return;
				}
			}
		} else {
			// Send a click message to the first tab so it's visible
			tabLinks[0].click();
		}
	};

	return {
		"setup": setup,
		"changeTab": changeTab,
	};
})();

TABS.setup();
