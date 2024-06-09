import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_APILLON_API_KEY2;
const apiSecret = process.env.NEXT_PUBLIC_APILLON_API_SECRET2;

const apillonAuthAPI = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  //timeout: 10000,
  headers: {
    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
  }
});
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const apillonAuthAPI2 = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  //timeout: 10000,
  withXSRFToken: true,
  headers: {
    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  }
});


export { apillonAuthAPI, apillonAuthAPI2 };