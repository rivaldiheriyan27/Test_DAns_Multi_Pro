const {User,Job} = require("../models/index")
const {encryptPassword , comparePassword} = require("../helpers/bcrypt")
const {signatureJwt,verifyJwt, secretKey} = require("../helpers/jwt")
const { Op } = require("sequelize");


class userController{
    static async login(req,res,next){
        try{
            const {username, password} = req.body;
            const user = await User.findOne({
                where:{
                    username:username,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });


            // Check data apakah ada usernya atau tidak
            if (!user) {
                throw {name :"Username or Password is invalid"};
            }

            const validatePassword = comparePassword(
                password,
                user.password
            )
            
            console.log(validatePassword, "ini validasi password")

            // Check data apakah passwordnya sudah sama atau tidak

            if (!validatePassword) {
                throw { name : `Email or Password is invalid`};
            }

            const payload = {
                id: user.id,
            };

            console.log(payload, " ini di login")

            const token = signatureJwt(payload,secretKey);
            console.log(token)

            res.status(200).json({
                statusCode:200,
                data:{
                    accesToken:token,
                    username:user.username
                }
            })
        }catch(err){
            next(err)
        }
    }

    static async register(req,res,next){
        try{
            const {username, password} = req.body

            let input = {
                username,
                password,
            }
            console.log(input, "ini data Register")

            const checkDataUser = await User.findOne({ 
                where:{
                    username:username,
                    deletedAt : {
                        [Op.is]: null
                    }
                }
            })

            if(checkDataUser){
                throw { name :"Username has been registered"}
            }

            const dataInputRegister = await User.create(input)

            const idToken = {
                id: dataInputRegister.id
            }

            let token = signatureJwt(idToken,secretKey)
            
            res.status(201).json({
            statusCode:201,
            data:{
                message: `new user with email ${dataInputRegister.username} has been successfully registered`,
                accesToken:token
            }
            });
        }catch(err){
            // console.log(err)
            next(err)
        }
    }

}

module.exports = {userController}