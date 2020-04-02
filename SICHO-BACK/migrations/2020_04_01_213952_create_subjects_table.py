from orator.migrations import Migration


class CreateSubjectsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('subjects') as table:
            table.increments('id')
            table.string('subjectName')
            table.string('classId')
            table.string('start')
            table.integer('durationMinutes')
            table.string('days')
            table.string('classroom')
            table.string('semester')
            table.string('user')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('subjects')
