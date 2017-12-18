const Group = require('../models/group');

function groupIndex(req, res, next){

  //if(req.group) req.body.image = req.file.filename;

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
    .populate('members.member comments.createdBy')
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

function groupRequestCreate(req, res, next){
  Group
    .findById(req.params.id)
    .then( group => {
      group.members.push({ member: req.currentUser });
      console.log(req.currentUser);
      return group.save();
    })
    .then(group => res.json(group))
    .catch(next);
}

function groupRequestAccept(req, res, next){
  Group.findById(req.params.id)
    .then( group => {
      const member = group.members.id( req.params.memberId );
      member.status = 'accepted';
      return group.save();
    })
    .then( group => res.json(group))
    .catch(next);
}

function groupRequestReject(req, res, next){
  Group.findById( req.params.id )
    .then( group => {
      const member = group.members.id( req.params.memberId );
      member.remove();
      return group.save();
    })
    .then( group => res.json(group))
    .catch(next);
}

function commentsCreate(req, res, next) {

  Group
    .findById(req.params.id)
    .exec()
    .then(group => {
      if(!group) return res.notFound();

      req.body.createdBy = req.currentUser;

      const comment = group.comments.create(req.body);
      group.comments.push(comment);
      return group.save();
      // return res.status(200).json({ file });
    })
    .then(group => Group.populate(group, { path: 'messages.createdBy' }))
    .then(group => {
      const comment = group.comments[group.comments.length -1];
      return res.status(201).json(comment);
    })
    .catch(next);
}

function commentsDelete(req, res, next){
  Group
    .findById(req.params.id)
    .exec()
    .then(group => {
      if (!group) return res.notFound();
      const comment = group.comments.id(req.params.commentId);
      comment.remove();
      group.save();
      return res.status(200).json({message: 'comment was successfully deleted'});
    })
    .catch(next);
}

module.exports = {
  index: groupIndex,
  create: groupCreate,
  show: groupShow,
  update: groupUpdate,
  delete: groupDelete,
  requestCreate: groupRequestCreate,
  requestAccept: groupRequestAccept,
  requestReject: groupRequestReject,
  createComment: commentsCreate,
  deleteComment: commentsDelete
};
