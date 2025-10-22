const express = require('express')
const cors = require('cors');
const ShotnerController = require('./controller/ShortnerController');
require('dotenv').config();
const promClient = require('prom-client');
const collectDefaultMetrics = promClient.collectDefaultMetrics;
require('./helpers/cron')


port = process.env.PORT


collectDefaultMetrics();


const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status']
});

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.get('/ping', (req, res) => {
  res.send('pong')
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', promClient.register.contentType);
  res.send(await promClient.register.metrics());
});

app.post('/', ShotnerController.shouterURL);
app.get('/:shortcode', ShotnerController.redirect)


app.listen(port);