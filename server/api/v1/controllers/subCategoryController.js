const async = require('async');

const SubCategory = require('../models/subCategory');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

/*
Get all subCategories
*/
exports.get_subCategories = function(req, res, next) {
  const query = SubCategory.find().populate('_category');
  query.sort( { created_at: -1 } );
  query.exec((err, subCategories) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving subCategories', next);
    if (!subCategories) {
      return errorHandler.handleAPIError(404, `SubCategories not found`, next);
    }
    return res.json(subCategories);
  });
}

/*
Get a certain subCategory
*/
exports.get_subCategory = function(req, res, next) {
  const id = req.params.subCategoryId;
  const query = SubCategory.findById(id).populate('_category');
  query.exec((err, subCategory) => {
    if (err) return errorHandler.handleAPIError(500, `Could not get the subCategory with id: ${id}`, next);
    if (!subCategory) {
      return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);
    }
    return res.json(subCategory);
  });
}

/*
Create a SubCategory
*/
exports.subCategory_create_get = function(req, res, next) {
  async.parallel({
    categories: function(callback) {
      Category.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { title: 'Create SubCategory', categories: results.categories });
  });
}

exports.subCategory_create_subCategory = function(req, res, next) {
  if(!req.body || !req.body.title || !req.body.description || !req.body._category) {
    return errorHandler.handleAPIError(400, `SubCategory must have a title, synopsis, body and _category`, next);
  }

  const subCategory = new SubCategory(req.body);
  subCategory.save((err, subCategory) => {
    if (err) return errorHandler.handleAPIError(500, `Could not save the new subCategory`, next);
    res.status(201).json(subCategory);
  });
}

/*
Update a SubCategory
*/
exports.subCategory_update_get = function(req, res, next) {
  async.parallel({
    subCategory: function(callback) {
      const id = req.params.subCategoryId;
      SubCategory.findById(id, callback).populate('_category');
    },
    categories: function(callback) {
      Category.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { subCategory: results.subCategory, categories: results.categories });
  });
}

exports.subCategory_update_put = function(req, res, next) {
   if (!req.body || !req.body.title || !req.body.description || !req.body._category) {
    return errorHandler.handleAPIError(400, `SubCategory must have a title, synopsis, body and _category`, next);
  }

  const id = req.params.subCategoryId;

  SubCategory.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
    _category: req.body._category,
  }, {new: true})
    .then(subCategory => {
      if(!subCategory) {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);
      }
      res.send(subCategory);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not update subCategory with id: ${id}`, next);
    });
}

/*
Delete a SubCategory
*/
exports.subCategory_delete_delete = function(req, res, next) {
  const id = req.params.subCategoryId;
  SubCategory.findByIdAndRemove(id)
    .then(subCategory => {
      if(!subCategory) {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `SubCategory width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete subCategory with id: ${id}`, next);
    });
}

/*
Soft-delete a subCategory
*/
exports.subCategory_softdelete_patch = function(req, res, next) {
  const id = req.params.subCategoryId;

  SubCategory.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(subCategory => {
      if(!subCategory) {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);
      }
      res.send(subCategory);
    }).catch(err => {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete subCategory with id: ${id}`, next);
    });
}

/*
Soft-undelete a subCategory
*/
exports.subCategory_softundelete_patch = function(req, res, next) {
  const id = req.params.subCategoryId;

  SubCategory.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(subCategory => {
      if(!subCategory) {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);
      }
      res.send(subCategory);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `SubCategory not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete subCategory with id: ${id}`, next);
    });
}