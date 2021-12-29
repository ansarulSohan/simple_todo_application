const { validateUser, User } = require('../../models/User');
const _ = require('lodash');

const router = require('express').Router();


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route  GET api/users
// @desc   Get all users
// @access Private

router.get('/', async (req, res) => {
  let searchParameters = {
    ...req.query
  };
  let users = await User.find(searchParameters);
  if(_.isEmpty(users)) {
    return res.status(404).send({
      message: 'No users found'
    });
  }
  res.status(200).send(_.pick(users, ['_id', 'name', 'email', 'isAdmin']));
})


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res) => {
  console.log(req.body);
  const result = validateUser(req.body);
  if(result.error) {
    return res.status(400).json({error: result.error.details[0].message});
  }

  const { name, email, password, isAdmin } = req.body;
  let user = new User({ name, email, password, isAdmin });
  user = await user.save();
  return res.status(200).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});


module.exports = router;