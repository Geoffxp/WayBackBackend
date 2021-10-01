
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("username");
        table.string("password");
        table.string("session");
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
