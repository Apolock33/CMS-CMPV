module.exports = ({ env }) => ({
  host: env('HOST', '129.121.45.182'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://129.121.45.182:1337/admin'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
