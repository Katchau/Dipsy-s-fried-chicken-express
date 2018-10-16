var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const SALT_ROUND = 10;
const secretPath = path.join(__dirname, '..', 'config.js');

function createToken(obj) {
    return jwt.sign(obj, require(secretPath).secret, {
        expiresInMinutes: 1440
    });
}

function verifyToken(req) {
    var token = req.body.token || req.query.token;
    if (token !== undefined && token !== '' && token !== null) {
        try {
            var decoded = jwt.verify(token, require(secretPath).secret);
            if(decoded.id === undefined){
                console.error('Invalid token!')
                return false;
            }
            // req.body.userId = decoded.id;
            return decoded.id;
        } catch (err) {
            return false;
        }
    } else return false;
}

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(SALT_ROUND);
    return bcrypt.hashSync(password, salt);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
module.exports.hashPassword = hashPassword;
module.exports.checkPassword = checkPassword;