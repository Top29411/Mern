import express from 'express';
let indexRouter = express.Router();

indexRouter.get('/', function (req, res) {
  res.json({
    HOST: process.env.HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    DATABASE: process.env.DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.PASSWORD,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    ಠ_ಠ: '😀😁😄',
    os: process.env.OS,
    architecture: process.env.PROCESSOR_ARCHITECTURE,
    nb_processors: process.env.NUMBER_OF_PROCESSORS,
    coputerName: process.env.COMPUTERNAME,
    username: process.env.username,
    lang: process.env.LANG,
    homePath: process.env.HOMEPATH,
    node: process.env.NODE
  });
});

export default indexRouter;
