const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

prisma.$use(async(params, next) => {
  // console.log(params.args.data, 'params')
  if (params.action === 'create' && params.model === 'Admins') {
    const { data } = params.args
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    params.args.data.password = hash
  }
  return next(params)
})

module.exports = prisma;
