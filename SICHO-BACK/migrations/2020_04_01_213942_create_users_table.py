from orator.migrations import Migration


class CreateUsersTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('users') as table:
            table.string('id')
            table.string('firstName')
            table.string('lastName')
            table.string('honorific')
            table.integer('department')
            table.string('email')
            table.string('telephone')
            table.string('extension')
            table.string('scheduleToProgram')
            table.string('password')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('users')
