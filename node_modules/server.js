const PORT = 5000;

const express = require('express');
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
// to process the env api key 
require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

const generativeAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) 

app.post('/gemini', async (req, res) => {
    req.body.history
    req.body.message
    const model = generativeAI.getGenerativeModel({ model: "gemini-pro" })

    const chat = model.startChat({
        History: req.body.history
    })

    const msg = req.body.message

    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    res.send(text)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})