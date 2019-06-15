import { client as redis, getAsync } from '../../';
import { REDIS_EXPIRY } from '../../config';

const notFoundResponse = {
  failed: true,
  message: "object not found on redis"
};

export const saveSeries = (seriesName, numberOfSeasons) => {
  redis.set(seriesName, JSON.stringify({ numberOfSeasons }), 'EX', REDIS_EXPIRY);
}

export const saveSeason = (seriesName, season, numberOfEpisodes) => {
  const key = `${seriesName}-${season}`;
  redis.set(key, JSON.stringify({ numberOfEpisodes }), 'EX', REDIS_EXPIRY);
}

export const saveEpisode = (seriesName, season, episode, info) => {
  const key = `${seriesName}-${season}-${episode}`;
  redis.set(key, JSON.stringify({ info }), 'EX', REDIS_EXPIRY);
}

export const getSeries = async (seriesName) => {
  const response = await getAsync(seriesName);
  if (!response) {
    return notFoundResponse;
  }

  const { numberOfSeasons } = JSON.parse(response);
  return { seriesName, numberOfSeasons };
}

export const getSeason = async (seriesName, season) => {
  const key = `${seriesName}-${season}`;
  const response = await getAsync(key);
  if (!response) {
    return notFoundResponse;
  }

  const { numberOfEpisodes } = JSON.parse(response);
  return { seriesName, season, numberOfEpisodes }
}

export const getEpisode = async (seriesName, season, episode) => {
  const key = `${seriesName}-${season}-${episode}`;
  const response = await getAsync(key);
  if (!response) {
    return notFoundResponse;
  }

  const { info } = JSON.stringify(response);
  return { seriesName, season, episode, info };
}
