from orator.migrations import Migration


class CreateSubjectsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('subjects') as table:
            table.string('id')
            table.string('name')
            table.string('start')
            table.integer('durationMinutes')
            table.string('days')\
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('subjects')
