import { Router } from 'express';
import { getRandomEpisode } from '../controllers/';

export const seriesRouter = Router();

seriesRouter.get('/random', getRandomEpisode);
