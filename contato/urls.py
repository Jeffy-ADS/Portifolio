from django.urls import path
from .views import contato

app_name = 'contato'

urlpatterns = [
    path('contato/', contato, name='contato'),
]