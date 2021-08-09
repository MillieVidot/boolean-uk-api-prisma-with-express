const bookRouter = require("express").Router()

const {
  findAllBooks,
  findOneBook,
  createBook,
  deleteBook,
  updateOneBook,
  findByType,
} = require("./controller")

bookRouter.get("/", findAllBooks)

bookRouter.get("/:id", findOneBook)

bookRouter.post("/", createBook)

bookRouter.delete("/:id", deleteBook)

bookRouter.patch("/:id", updateOneBook)

bookRouter.get("/type/:type", findByType)

module.exports = bookRouter
