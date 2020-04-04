import Player from '../models/playerModel';

// add a player document
export const add = (req, res) => {
  var player = new Player(req.body);

  // since we are authenticated
  player.createdBy = req.userId;
  player.updatedBy = req.userId;

  player.save((error, createdPlayer) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(createdPlayer);
  });
};

// get all players
export const getAll = (req, res) => {
  Player.find({}, (error, players) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(players);
  });
};

// get a player by id
export const getById = (req, res) => {
  Player.findById(req.params.id, (error, player) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(player);
  });
};

// update a player
export const update = (req, res) => {
  var player = req.body;

  // since we are authenticated
  player.updatedBy = req.userId;

  // we use { new: true } to return the updated document instead of the original
  Player.findOneAndUpdate({ _id: req.params.id }, player, { new: true }, (error, updatedPlayer) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(updatedPlayer);
  });
};

// delete a player
export const remove = (req, res) => {
  Player.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) {
      return res.status(400).json(error);
    }

    if (!result.deletedCount) {
      return res.status(400).json({ message: 'No player was found', deletedCount: result.deletedCount });
    }

    if (result.deletedCount && result.deletedCount > 0) {
      return res.json({ message: 'The player has been deleted', deletedCount: result.deletedCount });
    }
  });
};
