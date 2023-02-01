import axios from 'axios'
const baseURL = 'https://go-farmmy-api-rywu.onrender.com/api'
export const apiHelper = axios.create({
  baseURL
})

