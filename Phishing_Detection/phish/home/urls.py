from django.urls import path

from django.conf.urls import url
from . import views


app_name = 'home'

urlpatterns = [
    path('', views.index, name='index'),
    path('detect',views.detect,name='detect'),
    path('how_work',views.how_work,name='how_work'),

]
