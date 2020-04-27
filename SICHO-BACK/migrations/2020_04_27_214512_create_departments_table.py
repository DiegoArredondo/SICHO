from orator.migrations import Migration


class CreateDepartmentsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('departments') as table:
            table.integer('id')
            table.string('name')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('departments')
