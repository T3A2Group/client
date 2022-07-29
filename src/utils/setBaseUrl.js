import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://staging-tasmania-resort.herokuapp.com/'
});

export default backend