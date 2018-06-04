const async = require('async');

const Expense = require('../models/expense');
const SubCategory = require('../models/subCategory');
const BillingAccount = require('../models/billingAccount');
const errorHandler = require('../utilities/errorHandler');

/*
Get all expenses
*/
exports.get_expenses = function(req, res, next) {
  const query = Expense.find().populate('_subCategory').populate('_billingAccount');
  query.sort( { created_at: -1 } );
  query.exec((err, expenses) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving expenses', next);
    if (!expenses) {
      return errorHandler.handleAPIError(404, `Expenses not found`, next);
    }
    return res.json(expenses);
  });
}

/*
Get a certain expense
*/
exports.get_expense = function(req, res, next) {
  const id = req.params.expenseId;
  const query = Expense.findById(id).populate('_subCategory').populate('_billingAccount');
  query.exec((err, expense) => {
    //console.log(err)
    if (err) return errorHandler.handleAPIError(500, `Could not get the expense with id: ${id}`, next);
    if (!expense) {
      return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);
    }
    return res.json(expense);
  });
}

/*
Create a Expense
*/
exports.expense_create_get = function(req, res, next) {

  async.parallel({
    subCategories: function(callback) {

      SubCategory.find(callback).sort( { created_at: -1} );
    },
    billingAccounts: function(callback) {
      BillingAccount.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    
    if (err) { return next(err); }

    res.json( { title: 'Create Expense', subCategories: results.subCategories, billingAccounts: results.billingAccounts });
  });
}


/**
 * Everything for file upload 
 */
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

exports.expense_create_expense = function(req, res, next) {
  //console.log("req.file");
  //console.log(req.file);
  //console.log("req.body");
  //console.log(req.body);

  if (!req.body || !req.body.title || !req.body.amount || !req.body.description || !req.body._subCategory || !req.body._billingAccount) {
    return errorHandler.handleAPIError(400, `Expense must have a title, amount, body and _category`, next);
  }
  let expenseImgPath = req.file? req.file.path : undefined
  const newBody = {
    title: req.body.title,
    amount: req.body.amount,
    description: req.body.description,
    _subCategorie: req.body._subCategory,
    _billingAccount: req.body._billingAccount,
    expenseImage: expenseImgPath,
    user: req.body.user

  }
  const expense = new Expense(newBody);
  expense.save((err, expense) => {
    //console.log('this is the expense', expense)
    //console.log('this is the error', err)
    if (err) return errorHandler.handleAPIError(500, `Could not save the new expense`, 'err', err, next);
    //console.log("err")
    //console.log(err)
    res.status(201).json(expense);
  });
}







/*
Update a Expense
*/
exports.expense_update_get = function(req, res, next) {
  async.parallel({
    expense: function(callback) {
      const id = req.params.expenseId;
      Expense.findById(id, callback).populate('_subCategory').populate('_billingAccount');
    },
    subCategories: function(callback) {
      SubCategory.find(callback).sort( { created_at: -1} );
    },
    billingAccounts: function(callback) {
      BillingAccount.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { expense: results.expense, subCategories: results.subCategories, billingAccounts: results.billingAccounts });

  });
}

exports.expense_update_put = function(req, res, next) {
  if (!req.body || !req.body.title || !req.body.amount || !req.body.description || !req.body._subCategory || !req.body._billingAccount) {
    return errorHandler.handleAPIError(400, `Expense must have a title, amount, body and _category`, next);
  }

  const id = req.params.expenseId;

  Expense.findByIdAndUpdate(id, {
    title: req.body.title,
    amount: req.body.amount,
    body: req.body.body,
    _subCategory: req.body._subCategory,
    _billingAccount: req.body._billingAccount,
  }, {new: true})
    .then(expense => {
      if(!expense) {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);
      }
      res.send(expense);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not update expense with id: ${id}`, next);
    });
}

/*
Delete a Expense
*/
exports.expense_delete_delete = function(req, res, next) {
  const id = req.params.expenseId;
  Expense.findByIdAndRemove(id)
    .then(expense => {
      if(!expense) {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `Expense width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete expense with id: ${id}`, next);
    });
}

/*
Soft-delete a expense
*/
exports.expense_softdelete_patch = function(req, res, next) {
  const id = req.params.expenseId;

  Expense.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(expense => {
      if(!expense) {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);
      }
      res.send(expense);
    }).catch(err => {
      //console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete expense with id: ${id}`, next);
    });
}

/*
Soft-undelete a expense
*/
exports.expense_softundelete_patch = function(req, res, next) {
  const id = req.params.expenseId;

  Expense.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(expense => {
      if(!expense) {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);
      }
      res.send(expense);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Expense not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete expense with id: ${id}`, next);
    });
}