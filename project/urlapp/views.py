import json
from django.core import serializers
import django.views.generic as views

from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import UrlModel
from .tasks import update_url_statuses


@method_decorator(csrf_exempt, name='dispatch')
# @login_required(login_url='/')
class UrlListView(LoginRequiredMixin, views.ListView):
    model = UrlModel
    template_name = 'url_list.html'
    context_object_name = 'urls'
    login_url = '/'

    def post(self, req):
        new_url = req.POST.get('newUrl')
        UrlModel.objects.create(user=req.user, url=new_url)
        response_data = {'status': 200}
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@method_decorator(csrf_exempt, name='dispatch')
class UrlStatusChecker(views.View):
    def post(self, request):
        user = request.user
        update_url_statuses.delay(user.pk)

        response_data = {'status': 200}
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@method_decorator(csrf_exempt, name='dispatch')
class UserUrls(views.View):
    def post(self, req):
        user = req.user
        urls = user.urlmodel_set.all()
        qs_json = serializers.serialize('json', urls)
        return HttpResponse(qs_json, content_type='application/json')