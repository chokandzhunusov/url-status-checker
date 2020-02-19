from django.urls import path

from urlapp.views import UrlListView, UrlStatusChecker, UserUrls

urlpatterns = [
    path('', view=UrlListView.as_view(), name='url_view'),
    path('url_checker/', view=UrlStatusChecker.as_view(), name='url_status_checker'),
    path('user_urls/', view=UserUrls.as_view(), name='user_urls')
]