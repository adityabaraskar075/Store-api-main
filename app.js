import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler'
import notFound from './middleware/not-found'
import { PORT, DB_URL } from './config/index'
import connectDB from './db/connect'
import routes from './routes/products'
import 'express-async-errors'

// async errors


const app = express()


// inbuilt middlewares
app.use(express.json())

// routes
app.use('/api/v1/products', routes)

// middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)


// Listening on port 

const start = async () => {
    try {
        // Connect DB
        await connectDB(DB_URL)
        app.listen(PORT, () => {
            console.log(`Server listening on port : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()