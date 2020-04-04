import Player from '../models/playerModel';

// add a player document
export const add = (req, res) => {
  new Player(req.body).save((error, createdPlayer) => {
    if (error) {
      res.json(error);
    }

    res.send(createdPlayer);
  });
};

// get all players
export const getAll = (req, res) => {
  Player.find({}, (error, players) => {
    if (error) {
      res.json(error);
    }

    res.send(players);
  });
};

// get a player by id
export const getById = (req, res) => {
  Player.findById(req.params.id, (error, player) => {
    if (error) {
      res.json(error);
    }

    res.send(player);
  });
};

// update a player
export const update = (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, (error, player) => {
    if (error) {
      res.json(error);
    }

    res.send(player);
  });
};

// delete a player
export const remove = (req, res) => {
  Player.remove({ _id: req.params.id }, (error, player) => {
    if (error) {
      res.json(error);
    }

    res.send('The player has been deleted');
  });
};
