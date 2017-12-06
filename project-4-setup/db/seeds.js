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

const groupData = {
  name: 'test',
  theme: 'film',
  destination: 'Hackney',
  date: new Date(2017, 11, 1, 19, 0)
};

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    console.log(`${users.length} users created!`);
    groupData.members = users;
    return Group.create(groupData);
  })
  .then(() => console.log('Group created!'))
  .catch(err => console.oog(err))
  .finally(() => mongoose.connection.close());
