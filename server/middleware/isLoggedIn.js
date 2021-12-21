const User = require("../db/models/User")

const isLoggedIn = async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        req.user = user;
        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports = isLoggedIn