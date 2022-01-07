const prisma = require("../utils/prisma")

const ArticlesController = {
  async CreateArticle (req, res, next) {
    try {
      const result = await prisma.articles.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          species_id: req.body.species_id,
          image_url: req.body.image_url,
          is_active: req.body.is_active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
      return res.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  },
  async GetArticles (req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          image_url: true,
          species: {
            select: {
              id: true,
              name: true,
            }
          },
          is_active: true,
          created_at: true,
          updated_at: true
        }
      })
      return res.status(201).json(articles)
    } catch (error) {
      return next(error)
    }
  },
  async getActiveArticle(req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        where: {
          is_active: true
        }
      })
      return res.status(200).json(articles)
    } catch (error) {
      return next(error)
    }
  }, 
  async UpdateArticle(req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const update = await prisma.articles.update({
        where: {
          id
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          species_id: req.body.species_id,
          image_url: req.body.image_url,
          is_active: req.body.is_active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
      return res.status(200).json(update)
    } catch (error) {
      return next(error)
    }
  },
  async VerificationArticle(req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const result = await prisma.articles.update({
        where: { id },
        data: {
          is_active: req.body.is_active
        }
      })
      return res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = ArticlesController