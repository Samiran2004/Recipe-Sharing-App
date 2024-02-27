const jwt = require('jsonwebtoken');

const validator = function (req, res, next) {
    let token;
    const requestHeader = req.headers.Authorization || req.headers.authorization
    if (requestHeader && requestHeader.startsWith("Bearer")) {
        token = requestHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decod) {
            if (err) {
                res.status(400).send({
                    status: "Failed",
                    message: "Unauthorize token"
                });
            } else {
                req.user = decod;
                next();
            }
        })
    } else {
        res.status(404).send({
            status: "Failed",
            message: "Token not found."
        });
    }
}

module.exports = validator;