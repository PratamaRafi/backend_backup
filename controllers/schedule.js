const prisma = require("../utils/prisma");
var moment = require('moment'); // require

const ScheduleController = {
    async CreateSchedule(req,res,next){
      const id = req.params.id;
        try {
            const schedule = await prisma.schedule.create({
              where:{
                uid: id
              },
                data: {
                    time_start: req.body.time_start,
                    time_end: req.body.time_end,
                    day_start: req.body.day_start,
                    day_end: req.body.day_end,
                    homecare_customer_limit: req.body.homecare_customer_limit,
                    price: req.body.price
                }
            });
            delete schedule.id;
            return res.status(201).json(schedule);
        } catch (error) {
            return next(error);
        }
    },
    
    async GetScheduleByid(req,res,next){
        const vendor = req.params.vendor;
        try {
            const Getschedule = await prisma.schedule.findMany({
              where: {
                uid: vendor
              },
                select: {
                    uid: true,
                    time_start: true,
                    time_end: true,
                    day_start: true,
                    day_end: true,
                    homecare_customer_limit: true,
                    price: true
                }
            });
            return res.status(200).json(Getschedule);
        } catch (error) {
            return next(error);
        }
    },
    
    async UpdateSchedule(req,res,next){
      const id = req.params.id;
        try {
            const update = await prisma.schedule.update({
              where: {
                id: id
              },
                data: {
                    uid: req.body.uid,
                    time_start: req.body.time_start,
                    time_end: req.body.time_end,
                    day_start: req.body.day_start,
                    day_end: req.body.day_end,
                    homecare_customer_limit: req.body.homecare_customer_limit,
                    price: req.body.price
                }
            });
            return res.status(200).json(update);
        } catch (error) {
            return next(error);
        }
    },
    
    
}

module.exports = ScheduleController;