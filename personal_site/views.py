#!/usr/bin/env python3
#-*- coding: utf-8 -*-

from django.shortcuts import render
#from personal_site_proj.settings import LANGUAGES
#from django.conf import settings


def home(request):

	return render(request, "index.html")

def contact(request):

	return render(request, "contact.html")
