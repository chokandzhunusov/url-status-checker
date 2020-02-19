from django.contrib import admin

from .models import UrlModel


class UrlAdmin(admin.ModelAdmin):
    fields = ('user', 'url', 'status')


admin.site.register(UrlModel, UrlAdmin)
