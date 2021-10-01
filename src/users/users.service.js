const knex = require("../db/connection");

const reconnect = (token) => {
    return knex("users")
        .select("*")
        .where({ session: token })
        .first();
}
const read = (user) => {
    return knex("users")
        .select("*")
        .where({ username: user.username })
        .first();
}

const login = (user) => {
    return knex("users")
        .update({ session: user.session })
        .where({ username: user.username })
        .returning("*")
}
const create = (newUser) => {
    return knex("users")
        .insert(newUser)
        .returning("*")
}

module.exports = {
    create,
    read,
    reconnect,
    login,
}