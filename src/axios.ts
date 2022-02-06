import axios from 'axios'

export default axios.create({
  baseURL: `http://www.switter-prd.net:3030/`,
  // baseURL: `http://localhost:3030/`,
})
