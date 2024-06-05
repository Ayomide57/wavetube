const express = require('express');
const axios = require('axios');
const cors = require('cors')

const apiKey = process.env.NEXT_PUBLIC_APILLON_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_APILLON_API_SECRET;



const apillonAuthAPI = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  //timeout: 10000,
  headers: {
    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
  }
});

const cors1 = cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Allow specific HTTP methods
});



const app = express();

app.use(express.json())

app.use(
    cors({
      origin: 'https://api.apillon.io/',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      optionsSuccessStatus: 200,
    })
);


app.get('/session-token', async (req, res) => {
  const response = await apillonAuthAPI.get('/session-token');
  res.json(response.data);
})

app.post('/verify-login', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

  const token = req.body.token;
  const response = await apillonAuthAPI.post(`/verify-login`, { token });
  res.json(response.data);
})

const port = 4000;
app.listen(port, () => {
  console.log(`Apillon OAuth backend listening on port ${port}`);
})