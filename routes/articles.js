const express = require("express")

const {
  CreateArticle,
  GetArticles,
  UpdateArticle,
  getActiveArticle,
  VerificationArticle
} = require("../controllers/articles")

const router = express.Router()

router.post("/article", CreateArticle)
router.get("/article", GetArticles)
router.put("/article/:id", UpdateArticle)
router.get("/article/active", getActiveArticle)
router.patch("/article/verification/:id", VerificationArticle)

module.exports = {
  routes: router
}