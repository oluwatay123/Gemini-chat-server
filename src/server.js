const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const gemini = require('./routes/gemi.route')



app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*',
  credentials: true,
}));

app.use(express.json())

app.use('/gemini', gemini)


app.get("/", (req, res) => {
  res.status(200).send({
      success: true,
      data: `Server Live${process.env.PORT === "production" ? "" : ` - ${process.env.PORT}`}`,
  });
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('app is on Port ' + port)
})
