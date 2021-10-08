const knex = require("../db/connection");

const getAll = () => {
    return knex("users").select("*")
}
const reconnect = (token) => {
    return knex("users")
        .select("username", "session")
        .where({ session: token })
        .first();
}
const read = (user) => {
    return knex("users")
        .select("username", "session")
        .where({ username: user.username })
        .first();
}

const login = (user) => {
    return knex("users")
        .update({ session: user.session })
        .where({ username: user.username })
        .returning("username", "session")
}
const create = (newUser) => {
    return knex("users")
        .insert(newUser)
        .returning("username", "session")
}

module.exports = {
    create,
    read,
    reconnect,
    login,
    getAll,
}