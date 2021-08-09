const dbClient = require("../../utils/dbClient")

function findAllBooks(req, res) {
  dbClient.book
    .findMany()
    .then(result => {
      res.json({ result })
    })
    .catch(res.json({ error: "There was an error getting all books" }))
}

function findOneBook(req, res) {
  const id = Number(req.params.id)
  dbClient.book
    .findUnique({
      where: {
        id: id,
      },
    })
    .then(result => {
      res.json({ result })
    })
    .catch(error => res.json({ error: `User id:${id} does not exist` }))
}

async function createBook(req, res) {
  const newBook = req.body
  try {
    const validatedBook = {
      ...newBook,
      publicationdate: new Date(newBook.publicationdate).toISOString(),
    }
    const book = await dbClient.book.create({ data: validatedBook })
    res.json({ data: book })
  } catch (error) {
    if (error.message) {
      res.json({ msg: error.message })
    }
  }
}

async function deleteBook(req, res) {
  const id = Number(req.params.id)

  try {
    dbClient.book.findUnique({
      where: {
        id: id,
      },
    })
    await dbClient.book.delete({
      where: {
        id: id,
      },
    })
    res.json({ msg: `Book id:${id} has been deleted` })
  } catch (error) {
    if (error.message) {
      res.json({ msg: error.message })
    }
  }
}

async function updateOneBook(req, res) {
  const id = Number(req.params.id)
  const changes = { ...req.body }

  try {
    const bookToUpdate = await dbClient.book.findUnique({
      where: {
        id: id,
      },
    })
    const amended = { ...bookToUpdate, ...changes }
    const updatedBook = await dbClient.book.update({
      where: {
        id: id,
      },
      data: {
        ...amended,
      },
    })
    res.json({ updatedBook: updatedBook })
  } catch (error) {
    res.json({ msg: error.message })
  }
}

// function findByType(req, res) {
//   const type = req.params.type
//   dbClient.book
//     .findMany({
//       where: {
//         type: {
//           equals: type,
//           mode: "insensitive",
//         },
//       },
//     })
//     .then(result => res.json({ data: result }))
//     .catch(error => res.json({ error: `Book type:${type} does not exist` }))
// }

function findByType(req, res) {
  const type = req.params.type
  const topic = req.query.topic

  if (topic) {
    dbClient.book
      .findMany({
        where: {
          type: {
            equals: type,
            mode: "insensitive",
          },
          topic: {
            equals: topic,
            mode: "insensitive",
          },
        },
      })
      .then(result => res.json({ data: result }))
      .catch(error =>
        res.json({
          error: `Book type:${type} with topic: ${topic} does not exist`,
        })
      )
  } else {
    dbClient.book
      .findMany({
        where: {
          type: {
            equals: type,
            mode: "insensitive",
          },
        },
      })
      .then(result => res.json({ data: result }))
      .catch(error => res.json({ error: `Book type:${type} does not exist` }))
  }
}

// async function getBookByType(req, res) {
//   const type = req.params.type;
//   const topic = req.query.topic;

//   console.log(type);
//   console.log(topic);

//   try {
//     if (topic) {
//       const books = await dbClient.book.findUnique({
//         where: {
//           type: type,
//           topic: topic,
//         },
//       });
//       res.json({ filtered_by_topic: books });
//     } else {
//       const books = await dbClient.book.findUnique({
//         where: {
//           type: type,
//         },
//       });
//       res.json({ filtered_by_type: books });
//     }
//   } catch (error) {
//     res.json((error) => error.message);
//   }
// }

module.exports = {
  findAllBooks,
  findOneBook,
  createBook,
  deleteBook,
  updateOneBook,
  findByType,
}
