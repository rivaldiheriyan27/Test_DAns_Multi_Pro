const {User,Job} = require("../models/index")

class jobController {
    static async readAllJob(req,res,next){
        try{
            const {filterbyDescription, filterbyLocation, filterbyFulltime} = req.query;

            const limit = size ? +size : 5;
            const offset = page ? (+page - 1) * limit : 0;

            let option = {
                limit,
                offset,
                order: [["id", "ASC"]],
                where: {},
            };

            if (filterbyLocation) {
                option.where.location = {
                  [Op.iLike]: `%${filterbyLocation}%`,
                };
            }

            if (filterbyFulltime) {
                option.where.location = {
                    [Op.is]: true, 
                };
            }

            if (filterbyDescription) {
                option.where.description = {
                    [Op.iLike]: `%${filterbyDescription}%`,
                };
            }


            const data = await Job.findAndCountAll(option);
            const { count: totalJob, rows: job } = data;
            const currentPage = page ? +page : 1;
            const totalPages = Math.ceil(totalJob / option.limit);
            res.status(200).json({
                statusCode: 200,
                data: {
                    currentPage,
                    totalPages,
                    totalJob,
                    job,
                },
            });
        }catch(err){
            next(err)
        }
    }

    static async readJobById(req,res,next){
        try{
            const{readJobById} = req.params
            console.log(readJobById)

            
            const dataJob = await Job.findByPk(readJobById,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                },
            })
            console.log(dataJob)

            if(!dataJob){
                throw { name : "Not Found The Job"}
            }

            // console.log(dataBook)
            res.status(200).json({
                statuscode:200,
                data:dataJob
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {jobController}