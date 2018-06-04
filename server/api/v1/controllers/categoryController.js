const async = require('async');

const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const errorHandler = require('../utilities/errorHandler');

/*
Get all categories
*/
exports.get_categories = function(req, res, next) {
  const query = Category.find().populate('_subCategory');
  query.sort( { created_at: -1 } );
  query.exec((err, categories) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving categories', next);
    if (!categories) {
      return errorHandler.handleAPIError(404, `Categories not found`, next);
    }
    return res.json(categories);
  });
}

/*
Get a certain category
*/
exports.get_category = function(req, res, next) {
  const id = req.params.categoryId;
  const query = Category.findById(id).populate('_subCategory');
  query.exec((err, category) => {
    if (err) return errorHandler.handleAPIError(500, `Could not get the category with id: ${id}`, next);
    if (!category) {
      return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
    }
    return res.json(category);
  });
}

/*
Create a Category
*/
exports.category_create_get = function(req, res, next) {
  async.parallel({
    categories: function(callback) {
      SubCategory.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { title: 'Create Category', categories: results.categories });
  });
}

exports.category_create_category = function(req, res, next) {
  if(!req.body || !req.body.title || !req.body.description) {
    console.log(req.body);
    return errorHandler.handleAPIError(400, `Category must have a title`, next);

  }

  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) return errorHandler.handleAPIError(500, `Could not save the new category`, next);
    res.status(201).json(category);
  });
}

/*
Update a Category
*/
exports.category_update_get = function(req, res, next) {
  async.parallel({
    category: function(callback) {
      const id = req.params.categoryId;
      Category.findById(id, callback).populate('_subCategory');
    },
    categories: function(callback) {
      SubCategory.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { category: results.category, categories: results.categories });
  });
}

exports.category_update_put = function(req, res, next) {
  if(!req.body || !req.body.title || !req.body.description) {
    return errorHandler.handleAPIError(400, `Category must have a title, description, body and _subCategory`, next);
  }

  const id = req.params.categoryId;

  Category.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,

  }, {new: true})
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.send(category);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not update category with id: ${id}`, next);
    });
}

/*
Delete a Category
*/
exports.category_delete_delete = function(req, res, next) {
  const id = req.params.categoryId;
  Category.findByIdAndRemove(id)
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `Category width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete category with id: ${id}`, next);
    });
}

/*
Soft-delete a category
*/
exports.category_softdelete_patch = function(req, res, next) {
  const id = req.params.categoryId;

  Category.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.send(category);
    }).catch(err => {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete category with id: ${id}`, next);
    });
}

/*
Soft-undelete a category
*/
exports.category_softundelete_patch = function(req, res, next) {
  const id = req.params.categoryId;

  Category.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.send(category);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete category with id: ${id}`, next);
    });
}