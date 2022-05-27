const productController = require('../controllers/productBasicInfoController.js')
const router = require('express').Router()

router.post('/add',productController.addProductBasicInfo)

router.get('/all',productController.getAllProductsBasicInfo)

router.get('/:id',productController.getOneProductBasicInfo)

router.put('/:id',productController.updateProductBasicInfo)

router.delete('/:id',productController.deleteProductBasicInfo)

module.exports = router