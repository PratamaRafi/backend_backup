const prisma = require("../utils/prisma");

const FeedbackController = {
    async CreateFeedback(req,res,next){
        try {
            const vendor_id = req.params.vendor_id;
            const vendor = await prisma.vendors.findUnique({
                where: {
                  uid: vendor_id
                }
              });
              if (!vendor) return result.status(400).json(vendor);
            const result = await prisma.feedbacks.create({
                data: {
                    user_id: req.body.user_id,
                    email: req.body.email,
                    title: req.body.title,
                    content: req.body.content,
                    rating: req.body.rating,
                }
            });
            delete result.id;
            return res.status(201).json(result);
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = FeedbackController;