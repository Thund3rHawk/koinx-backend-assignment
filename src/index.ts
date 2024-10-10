import express from 'express'
import cron from 'node-cron';
import router from './routes';
import { fetchAndStoreData, scheduleFetchCryptoJob } from './jobs/fetchAndStore';
import logger from './utils/logger';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', router);
async function init() {
    try {
        await fetchAndStoreData() 
        scheduleFetchCryptoJob(cron)
        logger.info('Cron job scheduled to run every 2 hours')
    } catch (error) {
        logger.error('Error initializing:', error)
    }
}

init()

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})