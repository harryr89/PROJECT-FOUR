const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const User = require('../models/User');
const Group = require('../models/Group');

const userData = [{
  username: 'john',
  email: 'j@j.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'dave',
  email: 'd@d.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

const groupData = [{
  name: 'test',
  theme: 'film',
  destination: 'Hackney',
  members: [{
    status: 'accepted',
    member: '5a2eac53d7ea508570924bda'
  }],
  // status: 'pending',
  //members: [userData[0]._id],
  date: new Date(2017, 11, 1, 19, 0)
},{
  name: 'test',
  theme: 'dance',
  destination: 'Clappham',
  members: [{
    status: 'accepted',
    member: '5a2eac53d7ea508570924bda'
  }],
  // status: 'pending',
  date: new Date(2017, 11, 1, 19, 0)
}];

console.log(groupData);

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    console.log(`${users.length} users created!`);
    groupData.members = users;
    return Group.create(groupData);
  })
  .then(() => console.log('Group created!'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
