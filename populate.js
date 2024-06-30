import Product from "./models/product";
import { DB_URL } from "./config";
import connectDB from "./db/connect";
import jsonProducts from './products.json'


const start = async () => {
    try {
        await connectDB(DB_URL)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()