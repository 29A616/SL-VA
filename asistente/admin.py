from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import ChatHistory
from .models import User  # Reemplaza MyUser con el nombre real de tu modelo de usuario personalizado

class ChatHistoryInline(admin.TabularInline):
    model = ChatHistory
    extra = 0
    readonly_fields = ("date", "user_message", "va_message",)

class CustomUserAdmin(UserAdmin):
    inlines = [ChatHistoryInline]

# Reemplaza MyUser con el nombre real de tu modelo de usuario personalizado
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)