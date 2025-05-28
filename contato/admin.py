from django.contrib import admin
from .models import Contato


@admin.register(Contato)
class ContatoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'email', 'assunto', 'data_envio', 'lida']
    list_filter = ['lida', 'data_envio']
    search_fields = ['nome', 'email', 'assunto']
    readonly_fields = ['data_envio']
    list_editable = ['lida']
    
    fieldsets = (
        ('Informações do Contato', {
            'fields': ('nome', 'email')
        }),
        ('Mensagem', {
            'fields': ('assunto', 'mensagem')
        }),
        ('Status', {
            'fields': ('data_envio', 'lida')
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editando um objeto existente
            return self.readonly_fields + ['nome', 'email', 'assunto', 'mensagem']
        return self.readonly_fields