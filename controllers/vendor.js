const prisma = require("../utils/prisma");

const VendorController = {
    async CreateVendor (req, res, next){
        try {
            const result = await prisma.vendors.create({
        data: {
          uid: req.body.uid,
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          is_verified: req.body.is_verified,
          vendor_role: req.body.vendor_role,
        //   rating: req.body.rating,
          birthdate: req.body.birthdate,
          google_maps_url: req.body.google_maps_url,
          str_number: req.body.str_number,
          str_issued_date: req.body.str_issued_date,
          alumni: req.body.alumni,
          price: req.body.price,
        //   total_patient: req.body.total_patient,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          address: req.body.address,
          speciality: req.body.speciality,
          lat: req.body.lat,
          long: req.body.long,
          days: req.body.days,
          ops_start_time: req.body.ops_start_time,
          ops_end_time: req.body.ops_end_time,
          duration: req.body.duration,
          rest: req.body.rest,
          total_poli: req.body.total_poli,
          image_url: req.body.image_url,
          province_id: req.body.province_id,
          city_id: req.body.city_id,
        }
      });

      delete result.id;
      return res.status(201).json(result);
        } catch (error) {
           return next(error); 
        }
    },
    async UpdateVendor (req, res, next){
        try {
            const result = await prisma.vendors.update({        
            where: {
                uid: req.params.vendor_id
              },
        data: {
          name: req.body.name,
          username: req.body.username,
          vendor_role: req.body.vendor_role,
          price: req.body.price,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          address: req.body.address,
          birthdate: req.body.birthdate,
          google_maps_url: req.body.google_maps_url,
          str_number: req.body.str_number,
          str_issued_date: req.body.str_issued_date,
          alumni: req.body.alumni,
          speciality: req.body.speciality,
          lat: req.body.lat,
          long: req.body.long,
        //   days: req.body.days,
        //   ops_start_time: req.body.ops_start_time,
        //   ops_end_time: req.body.ops_end_time,
        //   duration: req.body.duration,
        //   rest: req.body.rest,
          total_poli: req.body.total_poli,
          image_url: req.body.image_url,
          province_id: req.body.province_id,
          city_id: req.body.city_id,
        }
      });

      delete result.id;
      return res.status(200).json(result);
        } catch (error) {
           return next(error); 
        }
    },

    // async GetById(req,res,next){
    //     try {
    //         const vendor = await prisma.vendors.findMany({
    //             where: {
    //             uid: req.params.vendor_id
    //           },
    //             select: {
    //                 uid: true,
    //                 email: true,
    //                 name: true,
    //                 price: true,
    //                 rating: true,
    //                 days: true,
    //                 ops_start_time: true,
    //                 ops_end_time: true,
    //                 is_verified: true,
    //                 phone_number: true,
    //                 lat: true,
    //                 long: true,
    //                 address: true,
    //                 total_poli: true,
    //                 duration: true,
    //                 rest: true,
    //                 vendor_documents: true,
    //                 vendor_medtreats: true
    //             }
    //         });
    //          return res.json(vendor);
    //     } catch (error) {
    //         return next(error);
    //     }
    // },
    async GetAll(req,res,next){
        try {
            const averages = await prisma.feedbacks.groupBy({
                by: ["vendor_id"],
                _avg: {
                    rating: true
                },
                orderBy: {
                    entryId: "desc"
                }
            })
            const vendor = await prisma.vendors.findMany({
                select: {
                    uid: true,
                    email: true,
                    name: true,
                    price: true,
                    rating: true,
                    days: true,
                    speciality: true,
                    ops_start_time: true,
                    ops_end_time: true,
                    is_verified: true,
                    phone_number: true,
                    lat: true,
                    long: true,
                    address: true,
                    total_poli: true,
                    duration: true,
                    rest: true,
                    vendor_documents: true,
                    vendor_medtreats: true
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
    async GetBest(req,res,next){
        try {
            const vendor = await prisma.vendors.findMany({
                take: 3,
                orderBy: {
                    rating: 'desc',
                },
                select: {
                     uid: true,
                     email: true,
                     name: true,
                     speciality: true,
                     price: true,
                     rating: true,
                     days: true,
                     ops_start_time: true,
                     ops_end_time: true,
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
        async GetByRating(req,res,next){
        try {
            const vendor = await prisma.vendors.findMany({
                orderBy: {
                    rating: 'desc',
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
    async GetDetailById(req,res,next){
        try {
            const vendor = await prisma.vendors.findUnique({
                where: {
                uid: req.params.vendor_id
              },
                select: {
                        uid: true,
                        email: true,
                        name: true,
                        username: true,
                        is_verified: true,
                        vendor_role: true,
                        rating: true,
                        price: true,
                        total_patient: true,
                        phone_number: true,
                        profile_picture_url: true,
                        gender: true,
                        address: true,
                        speciality: true,
                        days: true,
                        ops_start_time: true,
                        ops_end_time: true,
                        duration: true,
                        rest: true,
                        total_poli: true,
                        image_url: true,
                        city_id:true,
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
    async GetDetailAll(req,res,next){
        try {
            const vendor = await prisma.vendors.findMany({
                select: {
                        uid: true,
                        email: true,
                        name: true,
                        username: true,
                        is_verified: true,
                        vendor_role: true,
                        rating: true,
                        price: true,
                        total_patient: true,
                        phone_number: true,
                        profile_picture_url: true,
                        gender: true,
                        address: true,
                        speciality: true,
                        days: true,
                        ops_start_time: true,
                        ops_end_time: true,
                        duration: true,
                        rest: true,
                        total_poli: true,
                        image_url: true,
                        city_id:true,
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
    async VendorFilter(req,res,next){
        const name = req.query.name;
        const speciality = req.query.speciality;
        const days = req.query.days;
        try {
            const vendor = await prisma.vendors.findMany({
                where: {
                    name: name,
                    speciality: speciality,
                    days: days
                },
                select: {
                        uid: true,
                        email: true,
                        name: true,
                        username: true,
                        is_verified: true,
                        vendor_role: true,
                        rating: true,
                        price: true,
                        total_patient: true,
                        phone_number: true,
                        profile_picture_url: true,
                        gender: true,
                        address: true,
                        speciality: true,
                        days: true,
                        ops_start_time: true,
                        ops_end_time: true,
                        duration: true,
                        rest: true,
                        total_poli: true,
                        image_url: true,
                        city_id:true,
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);                                                        
        }

    // if(speciality){
    //     try {
    //         const vendor = await prisma.vendors.findMany({
    //             where: {
    //                 speciality: speciality
    //             },
    //             select: {
    //                     uid: true,
    //                     email: true,
    //                     name: true,
    //                     username: true,
    //                     is_verified: true,
    //                     vendor_role: true,
    //                     rating: true,
    //                     price: true,
    //                     total_patient: true,
    //                     phone_number: true,
    //                     profile_picture_url: true,
    //                     gender: true,
    //                     address: true,
    //                     speciality: true,
    //                     days: true,
    //                     ops_start_time: true,
    //                     ops_end_time: true,
    //                     duration: true,
    //                     rest: true,
    //                     total_poli: true,
    //                     image_url: true,
    //                     city_id:true,
    //             }
    //         });
    //          return res.json(vendor);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // if(days){
    //     try {
    //         const vendor = await prisma.vendors.findMany({
    //             where: {
    //                 days: days
    //             },
    //             select: {
    //                     uid: true,
    //                     email: true,
    //                     name: true,
    //                     username: true,
    //                     is_verified: true,
    //                     vendor_role: true,
    //                     rating: true,
    //                     price: true,
    //                     total_patient: true,
    //                     phone_number: true,
    //                     profile_picture_url: true,
    //                     gender: true,
    //                     address: true,
    //                     speciality: true,
    //                     days: true,
    //                     ops_start_time: true,
    //                     ops_end_time: true,
    //                     duration: true,
    //                     rest: true,
    //                     total_poli: true,
    //                     image_url: true,
    //                     city_id:true,
    //             }
    //         });
    //          return res.json(vendor);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    },
    //     async GetByDay(req,res,next){
    //     const days = req.params.days;
    //     // console.log(days);
    //     try {
    //         const vendor = await prisma.vendors.findMany({
    //             where: {
    //                 days: days
    //             },
    //             select: {
    //                     uid: true,
    //                     email: true,
    //                     name: true,
    //                     username: true,
    //                     is_verified: true,
    //                     vendor_role: true,
    //                     rating: true,
    //                     price: true,
    //                     total_patient: true,
    //                     phone_number: true,
    //                     profile_picture_url: true,
    //                     gender: true,
    //                     address: true,
    //                     speciality: true,
    //                     days: true,
    //                     ops_start_time: true,
    //                     ops_end_time: true,
    //                     duration: true,
    //                     rest: true,
    //                     total_poli: true,
    //                     image_url: true,
    //                     city_id:true,
    //             }
    //         });
    //          return res.json(vendor);
    //     } catch (error) {
    //         return next(error);
    //     }
    // },
    //     async GetBySpec(req,res,next){
    //     const spec = req.params.spec;
    //     try {
    //         const vendor = await prisma.vendors.findMany({
    //             where: {
    //                 speciality: spec
    //             },
    //             select: {
    //                     uid: true,
    //                     email: true,
    //                     name: true,
    //                     username: true,
    //                     is_verified: true,
    //                     vendor_role: true,
    //                     rating: true,
    //                     price: true,
    //                     total_patient: true,
    //                     phone_number: true,
    //                     profile_picture_url: true,
    //                     gender: true,
    //                     address: true,
    //                     speciality: true,
    //                     days: true,
    //                     ops_start_time: true,
    //                     ops_end_time: true,
    //                     duration: true,
    //                     rest: true,
    //                     total_poli: true,
    //                     image_url: true,
    //                     city_id:true,
    //             }
    //         });
    //          return res.json(vendor);
    //     } catch (error) {
    //         return next(error);
    //     }
    // },
        async ScheduleBySpec(req,res,next){
        const spec = req.params.spec;
        try {
            const vendor = await prisma.vendors.findMany({
                where: {
                    speciality: spec
                },
                select: {
                        uid: true,
                        name: true,
                        is_verified: true,
                        vendor_role: true,
                        address: true,
                        speciality: true,
                        days: true,
                        ops_start_time: true,
                        ops_end_time: true,
                        duration: true,
                        rest: true,
                }
            });
             return res.json(vendor);
        } catch (error) {
            return next(error);
        }
    },
    async VerificationVendor (req, res, next) {
        try {
            const id = parseInt(req.params.id)
            const result = await prisma.vendors.update({
                where: {
                    id
                },
                data: {
                    is_verified: req.body.is_verified
                }
            })
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    },
    async CreateVendorFromCms (req, res, next){
        try {
            const result = await prisma.vendors.create({
                data: {
                    uid: req.body.uid,
                    email: req.body.email,
                    name: req.body.name,
                    username: req.body.username,
                    is_verified: req.body.is_verified,
                    vendor_role: req.body.vendor_role,
                    rating: req.body.rating,
                    birthdate: req.body.birthdate,
                    google_maps_url: req.body.google_maps_url,
                    str_number: req.body.str_number,
                    str_issued_date: req.body.str_issued_date,
                    alumni: req.body.alumni,
                    price: req.body.price,
                    total_patient: req.body.total_patient,
                    phone_number: req.body.phone_number,
                    profile_picture_url: req.body.profile_picture_url,
                    gender: req.body.gender,
                    address: req.body.address,
                    speciality: req.body.speciality,
                    lat: req.body.lat,
                    long: req.body.long,
                    days: req.body.days,
                    ops_start_time: req.body.ops_start_time,
                    ops_end_time: req.body.ops_end_time,
                    duration: req.body.duration,
                    rest: req.body.rest,
                    total_poli: req.body.total_poli,
                    image_url: req.body.image_url,
                    province_id: req.body.province_id,
                    city_id: req.body.city_id,
                }
            });
            delete result.id;
            return res.status(201).json(result);
        } catch (error) {
            return next(error); 
        }
    },
};

module.exports = VendorController;