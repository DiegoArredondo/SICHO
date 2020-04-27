from orator import Model
class Users(Model):
    __table__ = 'users'
    __primary_key__ = 'id'
    __hidden__ = ['password', 'created_at', 'updated_at']

class Subjects(Model):
    __table__ = 'subjects'
    __primary_key__ = 'id'
    __hidden__ = ['created_at', 'updated_at']

class Departments(Model):
    __table__ = 'departments'
    __primary_key__ = 'id'
    __hidden__ = ['created_at', 'updated_at']
