import axios from 'axios';
import logger from '../utils/logger';

export async function fetchCryptoData(symbol: string) {
    try {
        const response: any = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
        const data = response.data[symbol];
        return {
            symbol,
            price_usd: data.usd,
            market_cap_usd: data.usd_market_cap,
            percent_change_24h: data.usd_24h_change,
        };
    } catch (error) {
        logger.error(`Error fetching data for ${symbol}:`, error);
        return null;
    }
}