const productController = require('../controllers/productController.js')
const router = require('express').Router()

router.get('/all',productController.getAllProducts)

router.get('/:id',productController.getOneProduct)

//router.put('/:id',productController.updateProduct)

//router.delete('/:id',productController.deleteProduct)

module.exports = router