

const express = require('express')
const app = express()

const tasks = require('./routers/tasks')

const connectDB = require('./db/connect')
require('dotenv').config()


const notFound = require('./middleware/not-found')
const asyncWrapper = require('./middleware/async-wrapper')
const errorHandlerMiddleware = require('./middleware/error-handler-middleware')


//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)
app.use(asyncWrapper)




const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to Port ${port}...`))
    } catch (error) {
        console.log(error)

    }
}


start()