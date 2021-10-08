const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./games.service")

const list = async (req, res) => {
    const games = await service.list();
    res.status(201).json({ data: games })
}
const read = async (req, res) => {
    const game_id = req.params.id;
    const game = await service.read(game_id);
    res.status(201).json({ data: game })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)]
}