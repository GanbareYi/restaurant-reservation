
exports.up = function(knex) {
    return knex.schema.alterTable('reservations', (table) => {
        // Modify the column type to date
        table.date('reservation_date').alter();
        // Modify the column type to time
        table.time('reservation_time').alter();
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable('your_table', function (table) {
        // revert the change in the down migration
        table.string('reservation_date').alter();
        // revert the change in the down migration
        table.string('reservation_time').alter();
      });
};
