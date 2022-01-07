const prisma = require("../utils/prisma");
var moment = require('moment'); // require

const ConsulController = {
    // CREATE CONSUL BY USER
    async CreateConsul(req,res,next){
        try{
            const result = await prisma.consultations.create({
                data: {
                    uid: req.body.uid,
                    user_id: req.body.user_id,
                    pet_id: req.body.pet_id,
                    vendor_id: req.body.vendor_id,
                    chat_room_id: req.body.chat_room_id,
                    vendor_role: req.body.vendor_role,
                    diagnose: req.body.diagnose,
                    prerequisite: req.body.prerequisite,
                    date: req.body.date,
                    time_start: req.body.time_start,
                    time_end: req.body.time_end,
                    order_status: req.body.order_status,
                    reject_reason: req.body.reject_reason,
                    total_payment: req.body.total_payment,
                    payment_image_url: req.body.payment_image_url,
                    rating: req.body.rating,
                    comment: req.body.comment,
                    user_bank_id: req.body.user_bank_id,
                    vendor_bank_id: req.body.vendor_bank_id,
                    user_address_id: req.body.user_address_id
                }
            });

            delete result.id;
            return res.status(201).json(result);
        } catch (error) {
            return next(error);
        }
    },
    // GET DONE TODAY
    async GetTodayDone(req,res,next){
        // const order = req.params.order;
        const vendor_id = req.params.vendor_id;
        var today =  moment().format(moment.HTML5_FMT.DATE).toString();
        // if (!vendor) return res.status(404).json("Vendor ID of " + vendor + " not found");
        // const vendor = req.params.vendor;
        // if(order){
        //     console.log(order);
        // } else{
        //     console.log("not found");
        // }
try {
      const status = await prisma.consultations.findMany({
        where: {
            vendor_id: vendor_id,
            order_status: "0", //STATUS DONE
            date: today
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    user_detail_pet_id: true,
                    created_at: true,
                    date: true,
                    time_start: true,
                    time_end: true,
                    order_status: true
        }
      });
      console.log(status, 'status')
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },
    // UPDATE STATUS APPROVE OR REJECT
    async UpdateStatus(req,res,next){
        // const order = req.params.order;
        const consul_id = req.params.consul_id;
        try {
            const update = await prisma.consultations.update({
                    where: {
                        uid: consul_id
                    },
                    data: {
                        order_status: req.body.order_status,
                        reject_reason: req.body.reject_reason
                    }
            });

            return res.status(200).json(update);
            } catch (error) {
            return next(error);
            }
    },
    
        // GET CONSUL TODAY
    async GetTodayAll(req,res,next){
        // const order = req.params.order;
        // const vendor = req.params.vendor;
        var today =  moment().format(moment.HTML5_FMT.DATE).toString();
        console.log(today);
      try {
      const status = await prisma.consultations.findMany({
        where: {
            date: today
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    user_detail_pet_id: true,
                    created_at: true,
                    date: true,
                    time_start: true,
                    time_end: true,
                    order_status: true
        }
      });
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },

    async GetByDate (req,res,next){
      const vendor_id = req.params.vendor_id;
      const day = req.body.day
        try {
           const status = await prisma.consultations.findMany({
        where: {
            vendor_id: vendor_id,
            date: day
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    user_detail_pet_id: true,
                    created_at: true,
                    date: true,
                    time_start: true,
                    time_end: true,
                    order_status: true
        }
      });
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },
    
    async GetDetailConsul (req,res,next){
      const consul_id = req.params.consul_id;
        try {
           const status = await prisma.consultations.findMany({
        where: {
            uid: consul_id
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    pet_id: true,
                    created_at: true,
                    date: true,
                    diagnose: true,
                    prerequisite: true
        }
      });
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },
    async GetDetailPayment (req,res,next){
      const consul_id = req.params.consul_id;
        try {
           const status = await prisma.consultations.findMany({
        where: {
            uid: consul_id
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    user_detail_pet_id: true,
                    total_payment: true,
                    created_at: true,
                    updated_at: true,
                    date: true
        }
      });
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },
    async GetnotDone(req,res,next){
        // const order = req.params.order;
        const vendor_id = req.params.vendor_id;
try {
      const status = await prisma.consultations.findMany({
        where: {
            OR:[
                {order_status: "1"},
                {order_status: "2"},
                {order_status: "4"},
                {order_status: "5"},
            ],
            vendor_id: vendor_id
        },
        select: {
                    id: true,
                    uid: true,
                    vendor_id: true,
                    user_id: true,
                    user_detail_pet_id: true,
                    created_at: true,
                    updated_at: true,
                    date: true,
                    time_start: true,
                    time_end: true,
                    order_status: true
        }
      });
            return res.json(status);
        } catch (error) {
            return next(error);
        }
    },

};


module.exports = ConsulController;