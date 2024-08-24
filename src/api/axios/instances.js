import axios from 'axios';

const iranLocations = axios.create({
  baseURL: 'https://iran-locations-api.ir/api/v1/fa/',
});

export { iranLocations };
