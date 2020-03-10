const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if(!authorizationHeader) {
    return res.status(404).send('Something went wrong');
  }
  const [type, token] = authorizationHeader.split(' ');
  const user = await User.findOne({ token: token });
  if(type !== 'Token' || !user) {
    return res.status(404).send('Something went wrong');
  }
  req.currentUser = user;
  return next();
};