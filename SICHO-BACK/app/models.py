from orator import Model
class User(Model):
    __table__ = 'users'
    __primary_key__ = 'id'
    __hidden__ = ['password']

