const jwt = require("jsonwebtoken")
const secretKey = "hai"

function signatureJwt(payload,key){
    return jwt.sign(payload,key)
}

function verifyJwt(token,key){
    return jwt.verify(token,key)
}

module.exports = {
    signatureJwt,verifyJwt,secretKey
}