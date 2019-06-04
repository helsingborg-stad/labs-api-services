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

const remove = (service_id) => Services()
  .where('service_id', service_id)
  .del();

const report = async (entity) => {
  const { service_name, service_level, service_status, service_path } = entity;
  const insert = Services()
    .insert(entity)
    .toString();

  const update = client
    .raw(
      '`updated_at` = now(), `service_name` = ?, `service_level` = ?, `service_status` = ?, `service_path` = ?',
      [service_name, service_level, service_status, service_path]
    )
    .toString();

  return client.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);
}

module.exports = {
  reset,
  query,
  remove,
  report,
};
