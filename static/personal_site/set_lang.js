var SET_LANG = (function() {

	var setup = function() {
		var i;
		var langChoices = document.getElementsByClassName("languageChoice");
		var numLangChoices = langChoices.length;

		for (i = 0; i < numLangChoices; i++) {
			langChoices[i].addEventListener("click", SET_LANG.setLang);
		}
	};

	var setLang = function(e) {
		// Submits to django's set_language view before
		// the redirect goes through
		var chosenLang = e.currentTarget.dataset.langcode;
		document.getElementsByName("language")[0].value = chosenLang;
		document.getElementById("chooseLangForm").submit();
	};	

	return {
		setup: setup,
		setLang: setLang
	};
})();

SET_LANG.setup();
