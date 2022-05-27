const productController = require('../controllers/productAdvancedInfoController.js')
const router = require('express').Router()

router.post('/add',productController.addProductAdvancedInfo)

router.put('/:id',productController.updateProductAdvancedInfo)

router.get('/all',productController.getAllProductsAdvancedInfo)

router.get('/:id',productController.getOneProductAdvancedInfo)

router.delete('/:id',productController.deleteProductAdvancedInfo)

module.exports = router