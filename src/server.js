const express = require("express")
const morgan = require("morgan")

// import router
const bookRouter = require("./resources/books/router")

const app = express()

//middleware
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.use("/books", bookRouter)

//catch all route
app.use("*", (req, res) => {
  res.json({ msg: "ok" })
})

// start server
const port = 4000

app.listen(port, () => {
  console.log(`I'm listening to port: ${port}`)
})
