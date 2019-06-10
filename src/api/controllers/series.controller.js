import { getRandomEpisode as getRandom } from '../services';

export const getRandomEpisode = (req, res) => {
  res.send(getRandom(req.query.name));
}
