
exports.up = function(knex) {
    return knex.schema.alterTable('reservations', (table) => {
        // Rename the column from 'reservation_status' to 'status'
        table.renameColumn('reservation_status', 'status');
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable('reservations', (table) => {
        // Rename the column back to 'reservation_status'
        table.renameColumn('status', 'reservation_status');
      });
};
