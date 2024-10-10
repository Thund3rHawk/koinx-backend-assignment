import express from 'express'
import { CoinDeviation, fetchCryptoStats } from '../controller';

const router = express.Router()

router.post('/stats', fetchCryptoStats);
router.post('/deviation', CoinDeviation);

export default router