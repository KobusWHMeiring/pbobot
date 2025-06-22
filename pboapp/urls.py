from django.urls import path
from . import views

app_name = 'pboapp'

urlpatterns = [
    path('structure-selector/', views.structure_selector_view, name='structure_selector'),
]