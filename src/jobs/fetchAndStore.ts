import prisma from '../db';
import { fetchCryptoData } from '../services/cryptoService';
import logger from '../utils/logger';

export async function fetchAndStoreData() {
    const symbols = ['bitcoin', 'matic-network', 'ethereum'];
    for (const symbol of symbols) {
        const data = await fetchCryptoData(symbol);
        if (data) {
            await prisma.cryptoData.create({
                data: {
                    coin: data.symbol,
                    price_usd: data.price_usd,
                    market_cap_usd: data.market_cap_usd,
                    percent_change_24h: data.percent_change_24h
                }
            })
        }
        console.log(data);
    }
}

export async function calculateStandardDeviation(coin: string): Promise<number | null> {
    try {
      const data = await prisma.cryptoData.findMany({
        where: {
            coin: coin
        },
        orderBy: { updatedAt: 'desc' },
        take: 100,
        select: { price_usd: true },
      })
  
      if (data.length === 0) {
        return null
      }
      
      const prices = data.map(item => item.price_usd) 
      
      const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length
      const squaredDifferences = prices.map(price => Math.pow(price - mean, 2))
      const variance = squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) / prices.length
      const standardDeviation = Math.sqrt(variance)
  
      return Number(standardDeviation.toFixed(2))
    } catch (error) {
      logger.error(`Error calculating standard deviation for ${coin}:`, error)
      return null
    }
  }
  

export function scheduleFetchCryptoJob(cron: any) {
    cron.schedule('0 */2 * * *', () => {
        logger.info('Running cryptocurrency data fetch job');
        fetchAndStoreData();
    });
}

