import os
db_config_local = {
    'development': {
        'driver': 'mysql',
        'database': 'sicho-itson',
        'host':'127.0.0.1',
        'user': 'root',
        'password': 'admin',
        'prefix': '',
        'charset':'utf8'
    }
}
db_config_production = {
    'development': {
        'driver': 'mysql',
        'database': 'sicho-itson',
        'user': 'root',
        'password': 'admin',
        'prefix': '',
        'unix_socket': '/cloudsql/sicho-272801:us-west2:sicho-itson',
        'charset':'utf8'
    }
}

if os.environ.get('FLASK_ENV',False)=='production':
    db_config = db_config_production
else:
    db_config = db_config_local
