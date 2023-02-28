"use strict"

const {verifyJwt, secretKey} = require("../helpers/jwt")
const{ User } = require("../models")

const authentication = async(req,res,next)=>{
    try{
        const {access_token} = req.headers;

        if (!access_token) {
            throw { name: "InvalidToken" };
        }


        const payload = verifyJwt(access_token,secretKey)

        const {id} = payload;
        const user = await User.findByPk(id)
        if (!user) {
            throw { name: "InvalidToken" };
        }


        req.user = {
            id: user.id,
            role: user.role
        };
        next();
    }catch(err){
        const { name } = err;
        next(name);
    }
}

module.exports = authentication;
