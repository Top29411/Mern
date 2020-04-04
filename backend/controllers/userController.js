import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import User from '../models/userModel';

// create a new user and hash it's password (see userModel.js)
export const signUp = async (req, res) => {
  try {
    let user = await new User(req.body).save();
    if (user) {
      return res.json(user);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

// authenticate a user and return a token
export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // we check if the email and password are not null or empty
  if (!email || !password) {
    return res.status(400).json({ error: 'The email and password is mandatory' });
  }

  const user = await User.findOne({ email: email });
  // we check if a user exists with this email
  if (user) {
    bcrypt.compare(password, user.password, function (error, success) {
      // the input password and the hashed user password are a match
      if (success) {
        const now = moment();
        const nextWeek = now.add(7, 'days');

        const payload = {
          iat: now.unix(),
          exp: nextWeek.unix(),
          iss: user.id
        };

        let token = jwt.encode(payload, process.env.TOKEN_SECRET);
        res.json({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: `Bearer ${token}`,
          expiration: nextWeek.format('YYYY-MM-DD HH:mm:ss')
        });
      } else {
        return res.status(400).json({ error: 'The email and password combination is incorrect' });
      }
    });
  } else {
    return res.status(400).json({ error: 'We could not find any user with this email' });
  }
};
