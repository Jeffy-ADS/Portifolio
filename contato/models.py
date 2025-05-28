from django.db import models
from django.utils import timezone


class Contato(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome')
    email = models.EmailField(verbose_name='Email')
    assunto = models.CharField(max_length=200, verbose_name='Assunto')
    mensagem = models.TextField(verbose_name='Mensagem')
    data_envio = models.DateTimeField(default=timezone.now, verbose_name='Data de Envio')
    lida = models.BooleanField(default=False, verbose_name='Mensagem Lida')
    
    class Meta:
        verbose_name = 'Contato'
        verbose_name_plural = 'Contatos'
        ordering = ['-data_envio']
    
    def __str__(self):
        return f'{self.nome} - {self.assunto}'