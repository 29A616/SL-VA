from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("api/chat/", views.chat, name='chat' ),
    path("signup/", views.signup, name='signup'),
    path("logout/", views.signout, name='logout'),
    path("login/", views.signin, name='login'),
]