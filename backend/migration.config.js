module.exports = {
  migrationFolder: "database/migrations",
  direction: "up",
  logFileName: "migrations.log",
  databaseUrl: process.env.DATABASE_URL,
};
