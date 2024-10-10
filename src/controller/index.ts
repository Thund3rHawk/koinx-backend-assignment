import { Request, Response } from "express";
import { fetchCryptoData } from "../services/cryptoService";
import { asyncHandler } from "../utils/asyncHandler";
import { calculateStandardDeviation } from "../jobs/fetchAndStore";

export const fetchCryptoStats = asyncHandler(async (req: Request, res: Response) => {
    const { coin } = req.body;
    try {
        const data = await fetchCryptoData(coin);
        res.send({
            'price': data?.price_usd,
            'marketCap': data?.market_cap_usd,
            '24hChange': data?.percent_change_24h
        });
    } catch (error) {
        res.send('Data fetching error: ' + error);
    }
})

export const CoinDeviation = asyncHandler(async (req, res) => {
    const { coin } = req.body;
    try {
        const deviation = await calculateStandardDeviation(coin)
        res.send({
            'deviation': deviation
        });
    } catch (error) {
        res.send ('Calcultion deviation error: '+ error);
    }
})