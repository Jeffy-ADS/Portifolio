# core/admin.py
from django.contrib import admin
from .models import Visitante

@admin.register(Visitante)
class VisitanteAdmin(admin.ModelAdmin):
    list_display = ['ip', 'path', 'inicio', 'fim', 'tempo_total']
    readonly_fields = ['ip', 'user_agent', 'path', 'inicio', 'fim']
