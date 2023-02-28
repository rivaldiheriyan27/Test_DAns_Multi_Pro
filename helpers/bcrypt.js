const bcrypt = require("bcryptjs")

function encryptPassword(password) {
    return bcrypt.hashSync(password)
}

function comparePassword(password,hashedPassword){
    return bcrypt.compare(password,hashedPassword)
}

module.exports = {encryptPassword , comparePassword}