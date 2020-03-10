const {randomBytes} = require('crypto'),
  jwt = require("jsonwebtoken"),
  argon2 = require('argon2'),
  User = require('../models/User');

module.exports = class authService {
  constructor() { }

  async signUp(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = randomBytes(32);
        const hashPassword = await argon2.hash(password, { salt });
        const token = this.createJwt({ username: username });

        const user = await User.create({
          username: username,
          password: hashPassword,
          token: token
        });

        resolve({
          user: {
            username: user.username
          },
          token
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ username });
        if(!user) {
          reject('Username or password not found');
        }
        const correctPassword = await argon2.verify(user.password, password);
        if(!correctPassword) {
          reject('Username or password not found');
        }
        const token = this.createJwt(user);
        await User.update({ username }, {
          token: token
        });

        resolve({
          user: {
            username: username
          },
          token
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  createJwt(user) {
    return jwt.sign({
      data: {
        username: user.username
      }
    }, 'AswQas4Rta_1', {expiresIn: '12h'})
  }
};