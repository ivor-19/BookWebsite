import axios  from "axios";

// Set up Axios to include credentials (cookies) with every request
axios.defaults.withCredentials = true;

export default axios;