import express from 'express';
import redis from 'redis';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import api from './api';
import { promisify } from 'util';

export const app = express();
export const client = redis.createClient();
export const getAsync = promisify(client.get).bind(client);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api);

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log("Error " + err)
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`)
});
