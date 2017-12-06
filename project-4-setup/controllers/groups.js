const Group = require('../models/group');

function groupIndex(req, res, next){

  //if(req.file) req.body.image = req.file.filename;

  Group
    .find()
    .exec()
    .then(groups => res.json(groups))
    .catch(next);
}

function groupCreate(req, res, next){
  Group
    .create(req.body)
    .then(group => res.json(group))
    .catch(next);
}

function groupShow(req, res, next){
  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      res.json(group);
    })
    .catch(next);
}

function groupUpdate(req, res, next){

  //if(req.file) req.body.image = req.file.filename;

  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      group = Object.assign(group, req.body);
      return group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

function groupDelete(req, res, next){
  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      return group.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: groupIndex,
  create: groupCreate,
  show: groupShow,
  update: groupUpdate,
  delete: groupDelete
};
