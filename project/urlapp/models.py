from django.db import models
from django.contrib.auth.models import User


class UrlModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField(max_length=155)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Url'
        verbose_name_plural = 'Urls'

    def __str__(self):
        return self.url
