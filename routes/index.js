import express from 'express';
let indexRouter = express.Router();

indexRouter.get('/', function (req, res, next) {
  res.send({
    name: 'MongoDB'
  });
});

export default indexRouter;
