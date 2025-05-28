from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContatoForm
from .models import Contato


def contato(request):
    if request.method == 'POST':
        form = ContatoForm(request.POST)
        if form.is_valid():
            # Salva no banco de dados
            contato_obj = form.save()
            
            # Opcionalmente, envia email
            try:
                assunto = f'Novo contato: {contato_obj.assunto}'
                mensagem = f'''
                Nome: {contato_obj.nome}
                Email: {contato_obj.email}
                Assunto: {contato_obj.assunto}
                
                Mensagem:
                {contato_obj.mensagem}
                '''
                
                # Descomente as linhas abaixo se quiser enviar email
                # send_mail(
                #     assunto,
                #     mensagem,
                #     settings.DEFAULT_FROM_EMAIL,
                #     ['jeffeson@exemplo.com'],  # Seu email
                #     fail_silently=False,
                # )
                
                messages.success(request, 'Mensagem enviada com sucesso! Entrarei em contato em breve.')
                return redirect('contato:contato')
                
            except Exception as e:
                messages.success(request, 'Mensagem salva com sucesso!')
                return redirect('contato:contato')
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = ContatoForm()
    
    return render(request, 'contato/contato.html', {'form': form})