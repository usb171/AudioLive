# Generated by Django 2.0.7 on 2018-08-29 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sala', '0009_auto_20180829_1634'),
    ]

    operations = [
        migrations.AddField(
            model_name='sala',
            name='nome',
            field=models.CharField(max_length=20, null=True, unique=True, verbose_name='Nome'),
        ),
    ]