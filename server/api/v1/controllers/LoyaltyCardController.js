const async = require('async');

const LoyaltyCard = require('../models/loyaltyCard');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

/*
Get all loyaltyCards
*/
exports.get_loyaltyCards = function(req, res, next) {
  const query = LoyaltyCard.find()
  query.sort( { created_at: -1 } );
  query.exec((err, loyaltyCards) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving loyaltyCards', next);
    if (!loyaltyCards) {
      return errorHandler.handleAPIError(404, `LoyaltyCards not found`, next);
    }
    return res.json(loyaltyCards);
  });
}

/*
Get a certain loyaltyCard
*/
exports.get_loyaltyCard = function(req, res, next) {
  const id = req.params.loyaltyCardId;
  const query = LoyaltyCard.findById(id)
  query.exec((err, loyaltyCard) => {
    if (err) return errorHandler.handleAPIError(500, `Could not get the loyaltyCard with id: ${id}`, next);
    if (!loyaltyCard) {
      return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);
    }
    return res.json(loyaltyCard);
  });
}

/*
Create a LoyaltyCard
*/
exports.loyaltyCard_create_get = function(req, res, next) {
  async.parallel({
    categories: function(callback) {
      Category.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { title: 'Create LoyaltyCard', categories: results.categories });
  });
}

exports.loyaltyCard_create_loyaltyCard = function(req, res, next) {
  if(!req.body || !req.body.storeImg || !req.body.code) {
    return errorHandler.handleAPIError(400, `LoyaltyCard must have a title, synopsis, body and _category`, next);
  }

  const loyaltyCard = new LoyaltyCard(req.body);
  loyaltyCard.save((err, loyaltyCard) => {
    //console.log(err)
    if (err) return errorHandler.handleAPIError(500, `Could not save the new loyaltyCard`, next);
    res.status(201).json(loyaltyCard);
  });
}

/*
Update a LoyaltyCard
*/
exports.loyaltyCard_update_get = function(req, res, next) {
  async.parallel({
    loyaltyCard: function(callback) {
      const id = req.params.loyaltyCardId;
      LoyaltyCard.findById(id, callback).populate('_category');
    },
    categories: function(callback) {
      Category.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { loyaltyCard: results.loyaltyCard, categories: results.categories });
  });
}

exports.loyaltyCard_update_put = function(req, res, next) {
  if (!req.body || !req.body.storeImg || !req.body.code) {
    return errorHandler.handleAPIError(400, `LoyaltyCard must have a title, synopsis, body and _category`, next);
  }

  const id = req.params.loyaltyCardId;

  LoyaltyCard.findByIdAndUpdate(id, {
    storeImg: req.body.storeImg,
    code: req.body.code,
    user: req.body.user
   
  }, {new: true})
    .then(loyaltyCard => {
      if(!loyaltyCard) {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);
      }
      res.send(loyaltyCard);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not update loyaltyCard with id: ${id}`, next);
    });
}

/*
Delete a LoyaltyCard
*/
exports.loyaltyCard_delete_delete = function(req, res, next) {
  const id = req.params.loyaltyCardId;
  LoyaltyCard.findByIdAndRemove(id)
    .then(loyaltyCard => {
      if(!loyaltyCard) {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `LoyaltyCard width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete loyaltyCard with id: ${id}`, next);
    });
}

/*
Soft-delete a loyaltyCard
*/
exports.loyaltyCard_softdelete_patch = function(req, res, next) {
  const id = req.params.loyaltyCardId;

  LoyaltyCard.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(loyaltyCard => {
      if(!loyaltyCard) {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);
      }
      res.send(loyaltyCard);
    }).catch(err => {
      //console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete loyaltyCard with id: ${id}`, next);
    });
}

/*
Soft-undelete a loyaltyCard
*/
exports.loyaltyCard_softundelete_patch = function(req, res, next) {
  const id = req.params.loyaltyCardId;

  LoyaltyCard.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(loyaltyCard => {
      if(!loyaltyCard) {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);
      }
      res.send(loyaltyCard);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `LoyaltyCard not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete loyaltyCard with id: ${id}`, next);
    });
}