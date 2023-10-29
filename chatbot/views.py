from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from chatbot.script import conversation as cv

# Create your views here.
def index(request):
    return render(request, 'index.html')
@api_view(['POST'])
def chat(request):
    user_msg = request.data['message']
#    print(user_msg)
    reply = cv({'question':user_msg})
    response = reply['text']
#    print(response)
    return Response(response)
