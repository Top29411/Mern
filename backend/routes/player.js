import express from 'express';
import { add, getAll, getById, remove, update } from '../controllers/playerController';
import { ensureIsAuthenticated } from '../helpers/authenticationGuard';
let playerRouter = express.Router();

// we protect the POST, PUT and DELETE methods
playerRouter.post('/', ensureIsAuthenticated, add);
playerRouter.get('/', getAll);
playerRouter.get('/:id', getById);
playerRouter.put('/:id', ensureIsAuthenticated, update);
playerRouter.delete('/:id', ensureIsAuthenticated, remove);

export default playerRouter;
