export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
