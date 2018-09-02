from django.contrib import admin
from .models import Sala

class SalaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'created_at', 'update_at']

    search_fields = (
        'nome',
    )

admin.site.register(Sala, SalaAdmin)
