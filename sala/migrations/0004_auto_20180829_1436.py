# Generated by Django 2.0.7 on 2018-08-29 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sala', '0003_sala_stream'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sala',
            name='stream',
            field=models.CharField(blank=True, choices=[('MANY_TO_MANY', 'MANY_TO_MANY'), ('ONE_TO_MANY', 'ONE_TO_MANY')], default='None', max_length=10, null=True, verbose_name='Stream'),
        ),
    ]
