import axios from "axios";

const client = axios.create({
  baseURL: "https://conduit.productionready.io/api",
});

export const setAuthToken = (token: string) => {
  client.defaults.headers = { Authorization: `Token ${token}` };
};

export default client;
