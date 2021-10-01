const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./users.service");

const validateReturn = async (req, res, next) => {
    const { token } = req.query;
    const user = await service.reconnect(token);
    if (!user) {
        return next({
            status: 400,
            message: "Not logged in"
        })
    }
    res.locals.user = user;
    return next();
}

const validateUser = async (req, res, next) => {
    const user = req.body.data;
    const userCheck = await service.read(user);

    if (!userCheck) {
        return next({
            status: 400,
            message: "Incorrect username or password"
        })
    }
    if (userCheck.password !== req.body.data.password) {
        return next({
            status: 400,
            message: "Incorrect username or password"
        })
    }
    res.locals.user = user;
    return next();
}

const login = async (req, res) => {
    const { user } = res.locals;
    const success = await service.login(user);
    return res.status(200).json({ data: success[0] });
    
}

const startSession = (req, res) => {
    return res.status(200).json({ data: res.locals.user })
}

const create = async (req, res) => {
    const user = {
        ...req.body.data,
    }
    const newUser = await service.create(user);
    return res.status(201).json({ data: newUser[0] })
}

module.exports = {
    getGamer: [asyncErrorBoundary(validateReturn), startSession],
    create: asyncErrorBoundary(create),
    read: [asyncErrorBoundary(validateUser), asyncErrorBoundary(login), startSession],
}