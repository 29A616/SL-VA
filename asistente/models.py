from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ChatHistory(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user_history')
    date = models.DateTimeField(auto_now_add=True)
    user_message = models.TextField()
    va_message = models.TextField()
    
    def __str__(self):
        return self.user_id.username