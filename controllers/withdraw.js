const prisma = require("../utils/prisma");

const WithdrawController = {
    async CreateWithdraw(req,res,next){
        try{
            const result = await prisma.withdraw.create({
                data: {
                    vendor_id: req.body.vendor_id,
                    total: req.body.total,
                    bank: req.body.bank
                }
            });

            delete result.id;
            return res.status(201).json(result);
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = WithdrawController;