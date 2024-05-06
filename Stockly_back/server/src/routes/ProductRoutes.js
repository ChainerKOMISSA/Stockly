const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get('/', productController.getAllProducts);
router.get('/liquidation', productController.getLiquidation);
router.get('/rupture', productController.getRupture);
router.get('/countrupture', productController.getCountRupture);
router.get('/count', productController.getCountProd);
router.get('/:id',  productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProductById);
router.patch('/', productController.updateProductQuantityAfterOrder);
router.patch('/:id', productController.updateProductQuantityById);
router.delete('/:id', productController.deleteProductById);

module.exports = {productRouter : router };