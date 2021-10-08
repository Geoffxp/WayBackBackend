const knex = require("../db/connection");

const list = () => {
    return knex("games").select("*")
}

const read = (game_id) => {
    return knex("games")
        .select("*")
        .where({ "game_id": game_id})
        .first()
}

module.exports = {
    list,
    read,
}