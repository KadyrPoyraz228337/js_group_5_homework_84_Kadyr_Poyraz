const express = require('express'),
  router = express.Router(),
  AuthService = require('../service/auth');

router.post('/', async (req, res) => {
  try {
    const
      username = req.body.username,
      password = req.body.password;

    if (!username || !password) return res.status(404).send({error: 'Username or password not found'});

    const authService = new AuthService;
    const {user, token} = await authService.signUp(username, password);

    res.send({user, token})
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const
      username = req.body.username,
      password = req.body.password;

    const authService = new AuthService;
    const {user, token} = await authService.login(username, password);

    res.send({user, token});
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;