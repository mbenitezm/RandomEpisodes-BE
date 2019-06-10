import express from 'express';
import { seriesRouter } from './routes/';

const api = express();
api.use('/series', seriesRouter);

export default api;
