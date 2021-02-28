import axios from 'axios';

// ADD tokens and headers here
const axs = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 3000,
});

export default axs;