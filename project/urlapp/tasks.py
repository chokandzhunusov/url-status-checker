import requests

from django.contrib.auth import get_user_model
from celery.decorators import task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

User = get_user_model()

@task()
def update_url_statuses(user_pk):
    user = User.objects.get(pk=user_pk)
    urls = user.urlmodel_set.all()

    for url in urls:
        r = requests.get(url.url)
        url.status = True if r.status_code == 200 else False
        url.save()
        logger.info(r.status_code)

    return


is_nice = True
state = "nice" if is_nice else "not nice"