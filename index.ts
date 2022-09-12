import express, { Express, Request, Response } from 'express';

const EbayAuthToken = require('ebay-oauth-nodejs-client');
const crypto = require('crypto');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const config = require('./../config.js');

const app: Express = express();
const port = 3000;

const ebayAuthToken = new EbayAuthToken({
  clientId: config.PRODUCTION.clientId,
  clientSecret: config.PRODUCTION.clientSecret,
  redirectUri: config.PRODUCTION.redirectUri,
  // env: 'SANDBOX',
});

app.get('/dresses', async (req: Request, res: Response) => {
  const token = await ebayAuthToken.getApplicationToken('PRODUCTION');

  console.log('token', token);

  try {
    const response = await axios.get(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=63861&limit=200',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    res.send(response.data);
  } catch (e) {
    console.error(`Issue with get: ${e}`);
    res.send();
  }
});

app.post('/', (req: Request, res: Response) => {
  res.status(200).send();
});

app.get('/', async (req: Request, res: Response) => {
  const challengeCode = req.query.challenge_code;

  if (challengeCode) {
    try {
      const verificationToken = process.env.VERIFICATION_TOKEN;
      const endpoint = process.env.ENDPOINT;

      const hash = crypto.createHash('sha256');

      hash.update(challengeCode);
      hash.update(verificationToken);
      hash.update(endpoint);

      const responseHash = hash.digest('hex');

      const result = Buffer.from(responseHash).toString();

      res.status(200).send({
        challengeResponse: result,
      });
    } catch (e) {
      console.error(`Endpoint validation failure: ${e}`);
      res.status(500).send();
    }
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT || port}`);
});
