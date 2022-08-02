import axios from 'axios';

const deploy_preview_hostname_regex = /^deploy-preview-(\d+)--tasmania-resort.netlify.app$/;

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : window.location.hostname.match(deploy_preview_hostname_regex) ? 'https://staging-tasmania-resort.herokuapp.com/' : 'https://tasmania-resort.herokuapp.com/';

const tasResApi = axios.create({
  baseURL: API_URL
});

export default tasResApi