const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get('/', productController.getAllProducts);
router.get('/liquidation', productController.getLiquidation);
router.get('/rupture', productController.getRupture);
router.post('/', productController.createProduct);
router.get('/:id',  productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = {productRouter : router };