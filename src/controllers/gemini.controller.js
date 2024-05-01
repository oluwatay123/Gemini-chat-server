const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const generativeAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) 


exports.sendResponse = catchAsync(async(req, res, next) =>{
    try {

        const { history, message } = req.body


        if(!history && message){
            return next(new AppError("Please provide history and message", 400))
        }

        const model = generativeAI.getGenerativeModel({ model: "gemini-pro" })

        const chat = model.startChat({
            History: history
        })

        const msg = message

        const result = await chat.sendMessage(msg)

        const response = await result.response
        
        const text = response.text()

        res.status(200).json({
            success: true,
            message: "Response sent successfully",
            data: text
        })
    } catch (error) {

        return next(new AppError(error.message, 500))

    }
})

