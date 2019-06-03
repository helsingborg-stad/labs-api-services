const { client, extractQueryParts } = require('../../db/db.client');

const TABLE_NAME = 'services';
const Services = () => client(TABLE_NAME);

const reset = () => Services()
  .truncate();

const query = async (params = {}) => {
  const { where, limit } = extractQueryParts(params);

  return Services()
    .select()
    .where(where)
    .limit(limit || 10);
};

const create = entity => Services()
  .insert(entity);

const report = async (entity) => {
  const { service_id } = entity;

  return client.raw(
    'INSERT INTO ?? (`service_id`) values (?) ON DUPLICATE KEY UPDATE `updated_at` = now()',
    [TABLE_NAME, service_id],
  );
}

module.exports = {
  reset,
  query,
  create,
  report,
};
