# Generated by Django 2.0.7 on 2018-08-29 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
        ('sala', '0005_auto_20180829_1436'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sala',
            name='nome',
        ),
        migrations.AddField(
            model_name='sala',
            name='grupo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.Group'),
        ),
    ]
