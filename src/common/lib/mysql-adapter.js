"use strict";

const BaseMysql = require("think-model-mysql2");
const ThinkMysql = require("think-mysql");

const NON_CONNECTION_KEYS = new Set([
  "handle",
  "prefix",
  "type",
  "parser",
  "cache",
  "name"
]);

function sanitizeConfig(config = {}) {
  const connection = {};
  for (const key in config) {
    if (NON_CONNECTION_KEYS.has(key)) {
      continue;
    }
    const value = config[key];
    if (value !== undefined) {
      connection[key] = value;
    }
  }
  if (config.charset && !connection.charset) {
    connection.charset = config.charset;
  }
  if (config.encoding && !connection.charset) {
    connection.charset = config.encoding;
  }
  return connection;
}

class Query extends BaseMysql.Query {
  socket(sql) {
    const baseConfig = sanitizeConfig(this.config);
    if (sql && this.config.parser) {
      const parsed = this.config.parser(sql) || {};
      return ThinkMysql.getInstance(Object.assign({}, baseConfig, parsed));
    }
    if (!this._sanitizedSocket) {
      this._sanitizedSocket = ThinkMysql.getInstance(baseConfig);
    }
    return this._sanitizedSocket;
  }
}

class MysqlAdapter extends BaseMysql {}

MysqlAdapter.Query = Query;
MysqlAdapter.Schema = BaseMysql.Schema;
MysqlAdapter.Parser = BaseMysql.Parser;

module.exports = MysqlAdapter;
