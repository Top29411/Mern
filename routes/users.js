import express from 'express';
let usersRouter = express.Router();

usersRouter.get('/', function (req, res, next) {
  res.send({
    name: 'MongoDB/users'
  });
});

export default usersRouter;
