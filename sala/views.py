from .models import Sala
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


@csrf_exempt
def login(request):
    if request.method == 'GET':
        return render(request, 'sala/login.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_active:

                grupos = list(map(lambda x: x.name, user.groups.all())) if len(user.groups.all()) > 0 else ['indefinido']

                auth_login(request, user)
                request.session.set_expiry(3600)
                request.session['context'] = {
                    'salas': list(map(lambda x: x.nome, Sala.objects.filter(usuarios=user.id))),
                    'grupos': grupos,
                }

                if user.is_superuser and (grupos[0] == 'operador'):
                    return redirect('salaOperador')
                elif grupos[0] == 'reporter':
                    return redirect('salaReporter')
                elif grupos[0] == 'cinegrafista':
                    return redirect('salaCinegrafista')
                else:
                    auth_logout(request)
                    contexto = {'msg': 'Grupo do usuário indefinido ou você não é um administrador', 'username': username, 'password': password}
                    return render(request, "sala/login.html", contexto)

        else:
            contexto = {'msg': 'Acesso inválido', 'username': username, 'password': password}
            return render(request, "sala/login.html", contexto)


def salaReporter(request):
    if request.user.is_authenticated and request.user.groups.get().name == "reporter":
        return render(request, 'sala/salaReporter.html')
    else:
        auth_logout(request)
        return redirect('login')


def salaCinegrafista(request):
    if request.user.is_authenticated and request.user.groups.get().name == "cinegrafista":
        return render(request, 'sala/salaCinegrafista.html')
    else:
        auth_logout(request)
        return redirect('login')


def salaOperador(request):
    if request.user.is_authenticated and request.user.is_superuser and request.user.groups.get().name == "operador":
        return render(request, 'sala/salaOperador.html')
    else:
        auth_logout(request)
        return redirect('login')
