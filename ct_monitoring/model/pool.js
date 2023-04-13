require("dotenv").config();

import mariadb from "mariadb";

let pool;

function createPool() {
  if (!pool) {
    pool = mariadb.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: process.env.DB_CONNECTION_LIMIT, // specify the maximum number of connections in the pool
    });
  }
  return pool;
}

function releaseConnection(connction) {
  if (pool && connction) {
    connection.relaes();
  }
}

module.exports = {
  createPool,
  releaseConnection,
};
