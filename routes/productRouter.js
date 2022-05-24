const productController = require('../controllers/productController.js')
const router = require('express').Router()

router.post('/addproduct',productController.addProduct)

router.get('/allproduct',productController.getallProducts)

router.get('/:id',productController.getOneProducts)

router.put('/:id',productController.updateProducts)

router.delete('/:id',productController.deleteProducts)

module.exports = router