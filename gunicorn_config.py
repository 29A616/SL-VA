#import multiprocessing

bind = "0.0.0.0:8000"  # La dirección y el puerto en los que se ejecutará Gunicorn
workers = 2  # Cantidad de trabajadores
chdir = "/"  # Ruta al directorio raíz de tu proyecto Django
module = "Maya.wsgi"  # Módulo WSGI de tu proyecto
