import jwt from 'jwt-simple';
import moment from 'moment';
import User from '../models/userModel';

export const ensureIsAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ Status: 'Unauthorized', Error: 'Token is missing' });
  }

  // Authorization: 'Bearer <token>'
  const token = req.headers.authorization.split(' ')[1];

  let payload;
  // {
  //    iat: '1586026814' (2020-04-04 21:00:14)
  //    exp: '1586631614' (2020-04-11 21:00:14)
  //    iss: '5e88a915d19ab23300b01942' (user._id)
  // }
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json({ Status: 'Unauthorized', Error: 'Invalid token' });
  }

  // we check if the token is not expired
  if (payload.exp < moment().unix()) {
    return res.status(401).json({ Status: 'Unauthorized', Error: 'Token is expired' });
  }

  // the token is valid
  const userId = payload.iss;
  try {
    const user = await User.findById(userId);
    if (user) {
      req.userId = userId;
      next();
    } else {
      return res.status(404).json({ Status: 'NotFound', Error: 'We could not find a user with this Id' });
    }
  } catch (error) {
    return res.status(500).json({ Status: 'InternalServerError', Error: 'An error occured while trying to authorize your request' });
  }
};
