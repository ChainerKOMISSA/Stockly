const router = require('express').Router()
const categoryController = require('../controllers/CategoryController')

router.get( '/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategoryById);
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = { categoryRouter: router };