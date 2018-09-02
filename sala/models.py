from django.db import models
from django.contrib.auth.models import User, Group

class Sala(models.Model):

    _STREAM = (
        ('MANY_TO_MANY', 'MANY_TO_MANY'),
        ('ONE_TO_MANY', 'ONE_TO_MANY'),

    )

    nome = models.CharField('Nome da Página', max_length=20, null=True, unique=True)
    # pagina = models.OneToOneField(Group, on_delete=models.CASCADE, null=True)
    usuarios = models.ManyToManyField(User, blank=True)
    # stream = models.CharField('Tipo da Comunicação', max_length=20, choices=_STREAM, default="None", blank=True, null=True)

    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    update_at = models.DateTimeField('Atualizado em', auto_now_add=True)
