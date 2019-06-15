import { getEpisodeInfo } from './omdb.service';
import { saveSeries, getSeries, saveSeason, getSeason } from './redis.service';
export const getRandomEpisode = async (seriesName) => {
  //redis.set("seriesName", seriesName);
  const episode = await getEpisodeInfo(seriesName, 2, 3)
  //saveSeries(seriesName, 10);
  //saveSeason(seriesName, 5, 10);
  //const episode = await getSeason(seriesName, 8);
  return { episode };
}
