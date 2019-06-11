import { client as redis, getAsync } from '../../';

export const getRandomEpisode = (seriesName) => {
  redis.set("seriesName", seriesName);
  return console.log(getAsync("seriesName").then(result => result));
}
