from django.urls import path
from django.urls.conf import path, include
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('gettoken/<str:id>/<str:token>/', views.generate_token, name="token.generate"),
    path('process/<str:id>/<str:token>/', views.process_payment, name="payment.process"),

]