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
},{
  username: 'masterOne',
  email: '1@1.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'masterTwo',
  email: '2@2.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'reqOne',
  email: 'r1@r1.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'reqTwo',
  email: 'r2@r2.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'reqThreeMasterOne',
  email: 'r3@r3.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    console.log(`${users.length} users created!`);

    const groupData = [{
    //   name: 'test',
    //   createdBy: users[1],
    //   theme: 'film',
    //   destination: 'Hackney',
    //   members: [{
    //     status: 'pending',
    //     member: users[0]
    //   }],
    //   comments: [{
    //     content: 'this is a comment from seeds one',
    //     createdBy: users[1]
    //   }],
    //   // status: 'pending',
    //   //members: [userData[0]._id],
    //   date: new Date(2017, 11, 1, 19, 0)
    // },{
    //   name: 'test',
    //   theme: 'dance',
    //   destination: 'Clappham',
    //   members: [{
    //     status: 'accepted',
    //     member: users[1]
    //   }],
    //   comments: [{
    //     content: 'this is a comment from seeds two',
    //     createdBy: users[1]
    //   }],
    //   // status: 'pending',
    //   date: new Date(2017, 11, 1, 19, 0)
    // },{
      name: 'Film',
      createdBy: users[2],
      theme: 'Working out the plot',
      destination: 'Somewhere',
      image: 'https://static1.squarespace.com/static/55396962e4b053ce148cb1e1/t/57210fcab6aa60cca01f49fb/1461784525042/rolleiflex-brooklyn-film-camera.jpg?format=1500w',
      members: [{
        status: 'pending',
        member: users[4]
      }],
      comments: [{
        content: 'I like film',
        createdBy: users[2]
      }],
      // status: 'pending',
      //members: [userData[0]._id],
      date: new Date(2017, 11, 1, 19, 0)
    },{
      name: 'Festival',
      createdBy: users[3],
      theme: 'Having a great time',
      image: 'https://static1.squarespace.com/static/55396962e4b053ce148cb1e1/t/57210fcab6aa60cca01f49fb/1461784525042/rolleiflex-brooklyn-film-camera.jpg?format=1500w',
      destination: 'Oxford',
      members: [{
        status: 'pending',
        member: users[5]
      }],
      comments: [{
        content: 'This looks like fun',
        createdBy: users[3]
      }],
      // status: 'pending',
      date: new Date(2017, 11, 1, 19, 0)

    },{
      name: 'Music',
      createdBy: users[2],
      theme: 'having some fun',
      image: 'https://static1.squarespace.com/static/55396962e4b053ce148cb1e1/t/57210fcab6aa60cca01f49fb/1461784525042/rolleiflex-brooklyn-film-camera.jpg?format=1500w',
      destination: 'London',
      members: [{
        status: 'pending',
        member: users[4]
      }],
      comments: [{
        content: 'When is this event on?',
        createdBy: users[2]
      }],
      // status: 'pending',
      //members: [userData[0]._id],
      date: new Date(2017, 11, 1, 19, 0)
    },{
      name: 'Sport',
      createdBy: users[3],
      theme: 'Who wants to meet for some five a side',
      destination: 'Hackney',
      image: 'https://static1.squarespace.com/static/55396962e4b053ce148cb1e1/t/57210fcab6aa60cca01f49fb/1461784525042/rolleiflex-brooklyn-film-camera.jpg?format=1500w',
      members: [{
        status: 'pending',
        member: users[5]
      }],
      comments: [{
        content: 'this is a comment from seeds two',
        createdBy: users[3]
      }],
      // status: 'pending',
      date: new Date(2017, 11, 1, 19, 0)

    }];
    return Group.create(groupData);
  })
  .then(groups => console.log(`${groups.length} groups were created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
