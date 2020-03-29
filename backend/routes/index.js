import express from 'express';
let indexRouter = express.Router();

indexRouter.get('/', function (req, res) {
  res.send({
    name: 'MongoDB'
  });
});

export default indexRouter;
