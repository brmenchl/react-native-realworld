import axios from 'axios';

const client = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

export default client;
