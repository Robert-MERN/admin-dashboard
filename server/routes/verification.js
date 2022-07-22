const jwt = require("jsonwebtoken");

// jwt secret
const JWT = "axenholidays@321abc"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, credentials) => {
            if (!err) {
                req.credentials = credentials
                next();
            } else {
                res.status(401).json({ error: true, message: "Your token is expired!" })
            }
        })
    } else {
        res.status(501).json({ error: true, message: "You aren't authenticated!" })
    }
}
const verifySuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.credentials.superAdmin) {
            next();
        } else {
            res.status(501).json({ error: true, message: "Only Super Admin is allowed!" })
        }
    });
};

const verifyAgent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.credentials.isAgent || req.credentials.superAdmin) {
            next();
        } else {
            res.status(501).json({ error: true, message: "you aren't allowed!" });
        }
    });
};


module.exports = { verifyAgent, verifySuperAdmin }