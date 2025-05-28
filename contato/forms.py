from django import forms
from .models import Contato


class ContatoForm(forms.ModelForm):
    class Meta:
        model = Contato
        fields = ['nome', 'email', 'assunto', 'mensagem']
        widgets = {
            'nome': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Digite seu nome completo'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Digite seu email'
            }),
            'assunto': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Digite o assunto da mensagem'
            }),
            'mensagem': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Digite sua mensagem...',
                'rows': 5
            }),
        }
    
    def clean_nome(self):
        nome = self.cleaned_data.get('nome')
        if len(nome) < 2:
            raise forms.ValidationError('O nome deve ter pelo menos 2 caracteres.')
        return nome
    
    def clean_mensagem(self):
        mensagem = self.cleaned_data.get('mensagem')
        if len(mensagem) < 10:
            raise forms.ValidationError('A mensagem deve ter pelo menos 10 caracteres.')
        return mensagem