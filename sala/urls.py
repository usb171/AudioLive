from django.urls import path
from .views import login, salaReporter, salaOperador, salaCinegrafista

urlpatterns = [
    path('', login, name='login'),
    path('salaReporter', salaReporter, name='salaReporter'),
    path('salaOperador', salaOperador, name='salaOperador'),
    path('salaCinegrafista', salaCinegrafista, name='salaCinegrafista'),

]
