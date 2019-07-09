import { getSeriesInfo, getSeasonInfo, getEpisodeInfo } from './omdb.service';
import { saveSeries, getSeries, saveSeason, getSeason, saveEpisode, getEpisode } from './redis.service';

export const getRandomEpisode = async (seriesName) => {
  const series = await get(seriesName);
  return series;
}

// Ver por que falla el primer request
const get = async (seriesName) => {
  let series = getSeries(seriesName);
  if (series.failed) {
    series = getSeriesInfo(seriesName);
  }

  if (!series.failed) {
    saveSeries(seriesName, series.totalSeasons);
  }

  return series;
};
