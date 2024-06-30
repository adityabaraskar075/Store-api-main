import Product from '../models/product'


const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Product.find({}).sort('-name')
    res.status(200).json({
        products,
        nbHits: products.length
    })
}


const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else{
        result = result.sort('createdAt')
    }

    if (fields) {
        const feildsList = fields.split(',').join(' ')
        result = result.select(feildsList)
    } 

    const products = await result

    res.status(200).json({
        products,
        nbHits: products.length
    })
}

export {
    getAllProductsStatic,
    getAllProducts
}