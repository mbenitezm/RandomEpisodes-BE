import { getRandomEpisode as getRandom } from '../services';

export const getRandomEpisode = async (req, res) => {
  let episode = await getRandom(req.query.name);
  res.send(episode);
}
