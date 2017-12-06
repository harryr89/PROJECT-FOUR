const router = require('express').Router();
const groups = require('../controllers/groups');
const users  = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const auth  = require('../controllers/auth');

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create);

router.route('/groups/:id')
  .get(groups.show)
  .put(secureRoute, groups.update)
  .delete(secureRoute, groups.delete);

router.route('/users')
  .get(users.index)
  .post(secureRoute, users.create);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
