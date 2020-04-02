from orator import Model
class Users(Model):
    __table__ = 'users'
    __primary_key__ = 'id'
    __hidden__ = ['password']

class Subjects(Model):
    __table__ = 'subjects'
    __primary_key__ = 'id'
