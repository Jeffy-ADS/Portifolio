# core/model.py
from django.db import models

class Visitante(models.Model):
    ip = models.GenericIPAddressField()
    user_agent = models.TextField()
    path = models.CharField(max_length=255)
    inicio = models.DateTimeField(auto_now_add=True)
    fim = models.DateTimeField(null=True, blank=True)

    def tempo_total(self):
        if self.fim:
            return self.fim - self.inicio
        return None

    def __str__(self):
        return f'{self.ip} em {self.path}'
