from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from chatbot.script import conversation as cv

# Create your views here.
@login_required(login_url='/login/')
def index(request):
    return render(request, 'index.html')
@api_view(['POST'])
@login_required
def chat(request):
    user_msg = request.data['message']
 #   print(user_msg)
 #   print(request.data)
    reply = cv({'question':user_msg})
    response = reply['text']
#    print(response)
    return Response(response)

def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html', {
            'form': UserCreationForm
        })
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
                return HttpResponse('<body style="color: #fff; background-color: #1d1d1d"><h2>Registro exitoso <a href="/login/" style="color: skyblue;">iniciar sesión</a></h2></body>')
            except IntegrityError:
                return render(request, 'signup.html', {
            'form': UserCreationForm, 'error': 'El usuario ya existe'
        })
        return render(request, 'signup.html', {
            'form': UserCreationForm, 'error': 'Las contraseñas no coinciden'
        })
def signout(request):
    logout(request)
    return redirect('/')

def signin(request):
    if request.method == 'GET':  
        return render(request, 'signin.html', {
            'form': AuthenticationForm
        })
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user == None:
            return render(request, 'signin.html', {
            'form': AuthenticationForm, 'error': 'Usuario o contraseña incorrecto'
        })
        else:
            login(request, user)
            return redirect('index')
        