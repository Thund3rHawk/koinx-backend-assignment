# Koinx-Backend-Assignment

## Overview

This project is a Node.js application that fetches cryptocurrency price data at regular intervals and provides APIs for statistical analysis. It uses Express.js for the API server, Prisma with MongoDB for data storage, and node-cron for scheduling regular data fetches.

## Features

- Fetches price data for Bitcoin, Matic, and Ethereum every 2 hours
- Stores historical price data in MongoDB
- Provides API endpoints for statistical analysis of price data

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Thund3rHawk/koinx-backend-assignment
   cd koinx-backend-assignment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables by creating a `.env` file in the root directory:
   ```
   PORT = 8080
   DATABASE_URL = "Enter your mongodb URL"
   ```

4. Generate Prisma client:
   ```
   npx prisma generate
   ```

5. Start the application:
   ```
   npm start
   ```

## API Endpoints

### POST /stats

Fetches the latest statistics for a specified cryptocurrency.

**Request Body:**
```json
{
  "coin": "bitcoin"
}
```

**Response:**
```json
{
  "price": 50000,
  "marketCap": 1000000000000,
  "24hChange": 2.5
}
```

### POST /deviation

Calculates the standard deviation of the price for the last 100 records of a specified cryptocurrency.

**Request Body:**
```json
{
  "coin": "bitcoin"
}
```

**Response:**
```json
{
  "deviation": 1234.56
}
```

## Error Handling

Both endpoints will return a 404 status code if no data is found for the specified cryptocurrency, or if an error occurs during the calculation.

## Background Jobs

The application runs a background job every 2 hours to fetch the latest price data for Bitcoin, Matic, and Ethereum. This ensures that the database always has up-to-date information for analysis.

## Development

To run the application in development mode with hot reloading:

```
npm run dev
```
