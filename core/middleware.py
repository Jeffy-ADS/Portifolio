# core/middleware.py
from .models import Visitante
from django.utils.timezone import now

class RegistrarVisitasMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        path = request.path

        visitante = Visitante.objects.create(
            ip=ip,
            user_agent=user_agent,
            path=path
        )

        response = self.get_response(request)

        visitante.fim = now()
        visitante.save()

        return response
