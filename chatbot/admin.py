from django.contrib import admin
from .models import ChatHistory

class ctrladmin(admin.ModelAdmin):
    readonly_fields = ("date","user_message","va_message","user_id",)

# Register your models here.
admin.site.register(ChatHistory, ctrladmin)