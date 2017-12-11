const User = require('../models/user');

function userIndex(req, res, next){

  //if(req.file) req.body.image = req.file.filename;
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function userCreate(req, res, next){
  User
    .create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function userShow(req, res, next){
  User
    .findById(req.params.id)
    .populate('groups')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function userUpdate(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function userDelete(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: userIndex,
  create: userCreate,
  show: userShow,
  update: userUpdate,
  delete: userDelete
};
