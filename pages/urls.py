from django.urls import path
from .views import HomePageView

app_name = 'pages'

urlpatterns = [
    path('', HomePageView, name='home'),
]