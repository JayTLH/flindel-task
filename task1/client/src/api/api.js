// axios package used for api requests
import axios from 'axios';

// server url
const apiUrl = process.env.REACT_APP_SERVER || 'http://localhost:5000';

// function returns a promise based get request, passing along the transction id and date queries to the server
const getRequest = (query) => {
  return axios.get(`${apiUrl}/returns`, { params: query });
}

export { getRequest };