#!/usr/bin/env python3
#-*- coding: UTF-8 -*-

from django.test import TestCase
from django.core.urlresolvers import reverse
from django.utils.translation import activate, get_language
from django.conf import settings

class UrlTests(TestCase):

	def test_uses_index_template(self):

		# A tuple of tuples, first is
		# langauge code
		for language in settings.LANGUAGES:
			langCode = language[0]
			activate(langCode)
			response = self.client.get(reverse("home"))
			self.assertTemplateUsed(response, "index.html")

	def test_change_language(self):

		for language in settings.LANGUAGES:
			langCode = language[0]
			activate(langCode)

			# Currently not providing the "next" value to the form, 
			# because Django will return a 302 redirecting to the 
			# current page. Adding "follow" argument to follow this
			# redirect
			response = self.client.post(reverse("set_language"), 
									{"language": langCode}, follow=True)
			self.assertEqual(response.status_code, 200)
			newLang = response["Content-Language"]
			self.assertEqual(newLang, langCode, msg="The language was supposed to be set to \"{0}\", but \"Content-Language\" header is returning \"{1}\"".format(langCode, newLang))	
