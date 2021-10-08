const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./users.service");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function token() {
    return new Date().getTime().toString(36);
}

const validateCreate = async (req, res, next) => {
    const users = await service.getAll();
    let { username, password } = req.body.data;
    username = username.toLowerCase();

    for (let user of users) {
        if (user.username === username) {
            return next({
                status: 405,
                message: "Username is taken"
            });
        }
    }

    if (!username || !password) {
        return next({
            status: 405,
            message: "Missing fields"
        });
    }

    return next();
}
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
    let user = req.body.data;
    user = {
        ...user,
        username: user.username.toLowerCase()
    }
    const userCheck = await service.read(user);

    if (!userCheck) {
        return next({
            status: 400,
            message: "Incorrect username or password"
        })
    }
    if (bcrypt.compare(user.password, userCheck.password, (err, result) => {
        try {
            return result;
        } catch {
            console.error("failed attempt")
        }
    })) {
        return next({
            status: 400,
            message: "Incorrect username or password"
        })
    }
    return next();
}

const login = async (req, res) => {
    bcrypt.hash(req.body.data.password, saltRounds, async (err, hash) => {
        const user = {
            username: req.body.data.username.toLowerCase(),
            password: hash,
            session: token(),
        }
        try {
            await service.login(user);
            return res.status(201).json({ data: user.session });
        } catch {
            console.error(err);
            return err.message;
        }
    });
    
}

const startSession = (req, res) => {
    return res.status(200).json({ data: res.locals.user })
}

const create = async (req, res) => {
    bcrypt.hash(req.body.data.password, saltRounds, async (err, hash) => {
        const user = {
            username: req.body.data.username.toLowerCase(),
            password: hash,
            session: token(),
        }
        try {
            await service.create(user);
            return res.status(201).json({ data: user.session });
        } catch {
            console.error(err);
            return err.message;
        }
    });
    
}

module.exports = {
    getGamer: [asyncErrorBoundary(validateReturn), startSession],
    create: [asyncErrorBoundary(validateCreate), asyncErrorBoundary(create)],
    read: [asyncErrorBoundary(validateUser), asyncErrorBoundary(login)],
}