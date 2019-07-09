import axios from 'axios';
import { notFoundResponse, apiErrorResponse } from '../helpers/responses';
import { OMDB_API_KEY as API_KEY } from '../../config';

export const getSeriesInfo = async (seriesName) => {
  const url = getUrl({ seriesName });
  const data = await fetchData(url);
  return data;
}

export const getSeasonInfo = async (seriesName, season ) => {
  const url = getUrl({ seriesName, season });
  const data = await fetchData(url);
  return data;
}

export const getEpisodeInfo = async (seriesName, season, episode) => {
  const url = getUrl({ seriesName, season, episode });
  const data = await fetchData(url);
  return data;
}

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    if (data.Response === 'False' || data.Type != "series") {
      return notFoundResponse;
    }

    return data;
  } catch(error) {
    return apiErrorResponse;
  }
}

const getUrl = ({ seriesName, season, episode }) => {
  let baseUrl = `http://www.omdbapi.com/?apiKey=${API_KEY}&t=${seriesName}&plot=full`;

  if (season) {
    baseUrl += `&season=${season}`;
  }

  if (episode) {
    baseUrl += `&episode=${episode}`;
  }

  return baseUrl;
}
