import { client as redis, getAsync } from '../../';

export const getRandomEpisode = async (seriesName) => {
  redis.set("seriesName", seriesName);
  const episode = await getFromRedis(seriesName)
  return { episode };
}

const getFromRedis = (seriesName) => {
  return getAsync("seriesName");
}
