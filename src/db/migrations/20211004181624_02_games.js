
exports.up = function(knex) {
  return knex.schema.createTable("games", (table) => {
      table.increments("game_id").primary();
      table.string("name");
      table.string("url");
      table.string("img_src");
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("games");
};
