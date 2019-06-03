const up = async (db) => {
  await db.schema.createTable('services', (t) => {
    t.increments('id').unsigned().primary();
    t.string('service_id').notNull();
    t.dateTime('created_at').notNull().defaultsTo(db.fn.now());
    t.dateTime('updated_at').notNull().defaultsTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    // indices
    t.unique('service_id');
  });
};

const down = async (db) => {
  await db.schema.dropTableIfExists('services');
};

module.exports = {
  up,
  down,
};
