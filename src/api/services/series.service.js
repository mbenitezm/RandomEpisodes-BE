import { client as redis, getAsync } from '../../';
import { getEpisodeInfo } from './omdb.service';

export const getRandomEpisode = async (seriesName) => {
  //redis.set("seriesName", seriesName);
  const episode = await getEpisodeInfo(seriesName, 2, 3)
  return { episode };
}

const getFromRedis = (seriesName) => {
  return getAsync("seriesName");
}
