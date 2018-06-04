const async = require('async');


const BillingAccount = require('../models/billingAccount');
const Type = require('../models/type');
const errorHandler = require('../utilities/errorHandler');


exports.get_billingAccounts = function(req, res, next) {
  const query = BillingAccount.find().populate('expenses').populate('_type');
  query.sort( { created_at: -1 } );
  query.exec((err, billingAccounts) => {
   if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving billing accounts', next);
    if (!billingAccounts) {
      return errorHandler.handleAPIError(404, `billing Accounts not found`, next);
    }
    return res.json(billingAccounts);
  });
}

exports.get_billingAccount = function (req, res, next) {
  const idFind = req.params.id;
  const query = BillingAccount.findById(idFind).populate('expenses').populate('_type');
  query.exec((err, billingAccount) => {
   if (err) return errorHandler.handleAPIError(500, `Could not get the billingAccount with id: ${id}`, next);
    if (!billingAccount) {
      return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);
    }
    return res.json(billingAccount);
  });
}



/*
Create a BillingAccount
*/
exports.billingAccount_create_get = function(req, res, next) {
  async.parallel({
    types: function(callback) {
      Type.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { title: 'Create BillingAccount', types: results.types });
  });
}

exports.billingAccount_create_billingAccount = function(req, res, next) {
  if(!req.body || !req.body.title || !req.body.savings || !req.body._type) {
    return errorHandler.handleAPIError(400, `BillingAccount must have a title, synopsis, body and _type`, next);
  }

  const billingAccount = new BillingAccount(req.body);
  billingAccount.save((err, billingAccount) => {
    if (err) {
      //console.log("err", err); 
      return errorHandler.handleAPIError(500, `Could not save the new billingAccount`, next);
  }
    res.status(201).json(billingAccount);
    
  });
}

/*
Update a BillingAccount
*/
exports.billingAccount_update_get = function(req, res, next) {
  async.parallel({
    billingAccount: function(callback) {
      const id = req.params.billingAccountId;
      BillingAccount.findById(id, callback).populate('_type');
    },
    types: function(callback) {
      Type.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { billingAccount: results.billingAccount, types: results.types });
  });
}

exports.billingAccount_update_put = function(req, res, next) {
   if (!req.body || !req.body.title || !req.body.savings || !req.body._type) {
    return errorHandler.handleAPIError(400, `BillingAccount must have a title, synopsis, body and _type`, next);
  }

  const id = req.params.billingAccountId;

  BillingAccount.findByIdAndUpdate(id, {
    title: req.body.title,
    synopsis: req.body.synopsis,
    body: req.body.body,
    _type: req.body._type,
    user: req.body.user
  }, {new: true})
    .then(billingAccount => {
      if(!billingAccount) {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);
      }
      res.send(billingAccount);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not update billingAccount with id: ${id}`, next);
    });
}

/*
Delete a BillingAccount
*/
exports.billingAccount_delete_delete = function(req, res, next) {
  const id = req.params.billingAccountId;
  BillingAccount.findByIdAndRemove(id)
    .then(billingAccount => {
      if(!billingAccount) {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `BillingAccount width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete billingAccount with id: ${id}`, next);
    });
}

/*
Soft-delete a billingAccount
*/
exports.billingAccount_softdelete_patch = function(req, res, next) {
  const id = req.params.billingAccountId;

  BillingAccount.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(billingAccount => {
      if(!billingAccount) {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);
      }
      res.send(billingAccount);
    }).catch(err => {
      //console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete billingAccount with id: ${id}`, next);
    });
}

/*
Soft-undelete a billingAccount
*/
exports.billingAccount_softundelete_patch = function(req, res, next) {
  const id = req.params.billingAccountId;

  BillingAccount.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(billingAccount => {
      if(!billingAccount) {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);
      }
      res.send(billingAccount);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `BillingAccount not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete billingAccount with id: ${id}`, next);
    });
}