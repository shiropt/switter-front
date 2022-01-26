import axios from 'axios'

export default axios.create({
  baseURL: `http://ec2-18-177-67-187.ap-northeast-1.compute.amazonaws.com:3030/`,
  // baseURL: `http://localhost:3030/`,
})
