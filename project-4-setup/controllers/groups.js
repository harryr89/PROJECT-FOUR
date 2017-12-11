const Group = require('../models/group');

function groupIndex(req, res, next){

  //if(req.file) req.body.image = req.file.filename;

  Group
    .find()
    .populate('members')
    .exec()
    .then(groups => {
      res.status(200).json(groups);
      console.log(groups);
    })
    .catch(next);
}

function groupCreate(req, res, next){
  req.body.createdBy = req.currentUser;
  req.body.members.push(req.currentUser);

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

function makeRequest(req, res, next){
  Group
    .findById(req.params.id)

    .then( group => {
      group.members.push({ member: req.currentUser });
      console.log(group);
      return group.save;
    })
    .then( group => res.json(group))
    .catch(next);
}

function acceptRequest(req, res, next){
  Group.findById(req.prarms.id)
    .then( group => {
      const member = group.members.id( req.params.memberId );
      member.status = 'accepted';
      return group.save();
    })
    .then( group => res.json(group))
    .catch(next);
}

function declineRequest(req, res, next){
  Group.findById( req.params.id )
    .then( group => {
      const member = group.members.id( req.params.memberId );
      member.remove();
      return group.save();
    })
    .then( group => res.json(group))
    .catch(next);
}

module.exports = {
  index: groupIndex,
  create: groupCreate,
  show: groupShow,
  update: groupUpdate,
  delete: groupDelete,
  make: makeRequest,
  accept: acceptRequest,
  decline: declineRequest
};
