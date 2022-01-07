const prisma = require("../utils/prisma");

const VendorBankController = {
    async CreateBank(req,res,next){
        try{
            const result = await prisma.vendor_bank.create({
                data: {
                    uid: req.body.uid,
                    alias: req.body.alias,
                    bank_name: req.body.bank_name,
                    account_number: req.body.account_number,
                    bank_username: req.body.bank_username,
                    is_default: req.body.is_default
                }
            });

            delete result.id;
            return res.status(201).json(result);
        } catch (error) {
            return next(error);
        }
    },
    async UpdateBank(req,res,next){
        try{
            const result = await prisma.vendor_bank.update({
                where: {
                    uid: req.params.vendor_id
                  },
                data: {
                    alias: req.body.alias,
                    bank_name: req.body.bank_name,
                    account_number: req.body.account_number,
                    bank_username: req.body.bank_username,
                    is_default: req.body.is_default
                }
            });
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    },
    async GetAllBank(req,res,next){
        try{
            const result = await prisma.vendor_bank.findMany({
                select: {
                    bank_name: true,
                    account_number: true,
                }
            });
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    },
    async GetVendorBank(req,res,next){
        const vendor_id = req.params.vendor_id;
        try{
            const result = await prisma.vendor_bank.findMany({
                where: {
                    uid: vendor_id
                  },
                select: {
                    bank_name: true,
                    account_number: true,
                }
            });
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    },
    async GetDetailBank(req,res,next){
        const vendor_id = req.params.vendor_id;
        try{
            const result = await prisma.vendor_bank.findMany({
                where: {
                    uid: vendor_id
                  },
                select: {
                    alias: true,
                    bank_name: true,
                    account_number: true,
                    bank_username: true,
                    is_default: true
                }
            });
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    },

    async DeleteBank(req, res, next) {
        try {
          const user = await prisma.vendor_bank.delete({
            where: {
              uid: req.params.vendor_id
            }
          });
          return res.status(200).json({ "uid": user.vendor_id });
        } catch (error) {
          return next(error);
        }
      },
};

module.exports = VendorBankController;