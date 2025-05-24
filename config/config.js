require("dotenv").config();

const environments  = {
  development: {
    db: {
      url:
        process.env.DATABASE_URL ||
        "postgres://localhost:5432/military_assets_dev",
    },
    jwtSecret: process.env.JWT_SECRET || "dev-secret",
    port: process.env.PORT || 5000,
  },
  test: {
    db: {
      url:
        process.env.TEST_DATABASE_URL ||
        "postgres://localhost:5432/military_assets_test",
    },
    jwtSecret: "test-secret",
    port: 5001,
  },
  production: {
    db: {
      url: process.env.DATABASE_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 5000,
  },
};


const env = process.env.NODE_ENV || 'development';
module.exports = environments[env];