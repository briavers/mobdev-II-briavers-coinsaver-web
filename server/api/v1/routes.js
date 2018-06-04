const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();

/*
Controllers
*/
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const categoryController = require('./controllers/categoryController');
const subCategoryController = require('./controllers/subCategoryController');
const postController = require('./controllers/postController');


const billingAccountController = require('./controllers/billingAccountController');
const expenseController = require('./controllers/expenseController');
const loyaltyCardController = require('./controllers/loyaltyCardController');

/*
Routes
*/

/**
 * Everything for file upload 
 */
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'y' + new Date().getFullYear().toString() + 'm' + new Date().getMonth().toString() + 'd' + new Date().getDate().toString() + 'h' + new Date().getHours().toString() + 'm' + new Date().getMinutes().toString() + 's' + new Date().getSeconds().toString() + file.originalname)
  }
});


const fileFilter = (req, file, cb) =>
{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
    cb(null, true)
  }else{
    cb(new Error('we only accept jpeg and png'), false)
  }

}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 0.5

  },
   fileFilter: fileFilter
});



router.get('/blogs', blogController.get_blogs);
router.get('/blogs/:id', blogController.get_blog);
//router.get('/posts', auth.authenticateJwt(), postController.get_posts);// Securing the end-point to-do
router.get('/posts', postController.get_posts);
router.get('/posts/:postId', postController.get_post);
router.get('/posts/vm/create', postController.post_create_get);
router.post('/posts',postController.post_create_post);
router.get('/posts/:postId/update', postController.post_update_get);
router.put('/posts/:postId', postController.post_update_put);
router.delete('/posts/:postId', postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', postController.post_softundelete_patch);




/*
  auth 
*/

router.post('/signup', authController.user_create_post);
authRouter.post('/local', auth.authenticateLocal(), authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);


/*
  expenses 
*/
router.get('/expenses', expenseController.get_expenses);
router.get('/expenses/:id', expenseController.get_expense);
router.get('/expenses/vm/create', expenseController.expense_create_get);
router.post('/expenses', upload.single('expenseImage'), expenseController.expense_create_expense);
router.get('/expenses/:expenseId/update', expenseController.expense_update_get);
router.put('/expenses/:expenseId', expenseController.expense_update_put);
router.delete('/expenses/:expenseId', expenseController.expense_delete_delete);
router.patch('/expenses/:expenseId/softdelete', expenseController.expense_softdelete_patch);
router.patch('/expenses/:expenseId/softundelete', expenseController.expense_softundelete_patch);


/*
  loyalty Card
*/

router.get('/loyaltyCards', loyaltyCardController.get_loyaltyCards);
router.get('/loyaltyCards/:id', loyaltyCardController.get_loyaltyCard);
router.get('/loyaltyCards/vm/create', loyaltyCardController.loyaltyCard_create_get);
router.post('/loyaltyCards', loyaltyCardController.loyaltyCard_create_loyaltyCard);
router.get('/loyaltyCards/:loyaltyCardId/update', loyaltyCardController.loyaltyCard_update_get);
router.put('/loyaltyCards/:loyaltyCardId', loyaltyCardController.loyaltyCard_update_put);
router.delete('/loyaltyCards/:loyaltyCardId', loyaltyCardController.loyaltyCard_delete_delete);
router.patch('/loyaltyCards/:loyaltyCardId/softdelete', loyaltyCardController.loyaltyCard_softdelete_patch);
router.patch('/loyaltyCards/:loyaltyCardId/softundelete', loyaltyCardController.loyaltyCard_softundelete_patch);


/*
  billing accounts 
*/

router.get('/billingAccounts', billingAccountController.get_billingAccounts);
router.get('/billingAccounts/:id', billingAccountController.get_billingAccount);
router.get('/billingAccounts/vm/create', billingAccountController.billingAccount_create_get);
router.post('/billingAccounts', billingAccountController.billingAccount_create_billingAccount);
router.get('/billingAccounts/:billingAccountId/update', billingAccountController.billingAccount_update_get);
router.put('/billingAccounts/:billingAccountId', billingAccountController.billingAccount_update_put);
router.delete('/billingAccounts/:billingAccountId', billingAccountController.billingAccount_delete_delete);
router.patch('/billingAccounts/:billingAccountId/softdelete', billingAccountController.billingAccount_softdelete_patch);
router.patch('/billingAccounts/:billingAccountId/softundelete', billingAccountController.billingAccount_softundelete_patch);


/*
  categories 
*/
router.get('/categories', categoryController.get_categories);
router.get('/categories/:id', categoryController.get_category);
router.get('/categories/vm/create', categoryController.category_create_get);
router.post('/categories', categoryController.category_create_category);
router.get('/categories/:categoryId/update', categoryController.category_update_get);
router.put('/categories/:categoryId', categoryController.category_update_put);
router.delete('/categories/:categoryId', categoryController.category_delete_delete);
router.patch('/categories/:categoryId/softdelete', categoryController.category_softdelete_patch);
router.patch('/categories/:categoryId/softundelete', categoryController.category_softundelete_patch);


/*
  sub categories 
*/
router.get('/subCategories', subCategoryController.get_subCategories);
router.get('/subCategories/:id', subCategoryController.get_subCategory);
router.get('/subCategories/vm/create', subCategoryController.subCategory_create_get);
router.post('/subCategories', subCategoryController.subCategory_create_subCategory);
router.get('/subCategories/:subCategoryId/update', subCategoryController.subCategory_update_get);
router.put('/subCategories/:subCategoryId', subCategoryController.subCategory_update_put);
router.delete('/subCategories/:subCategoryId', subCategoryController.subCategory_delete_delete);
router.patch('/subCategories/:subCategoryId/softdelete', subCategoryController.subCategory_softdelete_patch);
router.patch('/subCategories/:subCategoryId/softundelete', subCategoryController.subCategory_softundelete_patch);



module.exports = router;