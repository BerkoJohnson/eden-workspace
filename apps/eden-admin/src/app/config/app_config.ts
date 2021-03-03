export default () => ({
  app: {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.JWT_EXPIRES || '1d',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
