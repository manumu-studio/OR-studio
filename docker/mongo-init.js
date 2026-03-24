// MongoDB initialization script — creates the or-studio database and dev user
// Runs once on first container start (via docker-entrypoint-initdb.d)

db = db.getSiblingDB('or-studio');

db.createUser({
  user: 'or_studio_dev',
  pwd: 'or_studio_dev_password',
  roles: [
    { role: 'readWrite', db: 'or-studio' },
  ],
});

// Create a marker collection so Payload finds a non-empty database
db.createCollection('_init');
db._init.insertOne({
  createdAt: new Date(),
  note: 'Docker init — database ready for Payload CMS',
});
