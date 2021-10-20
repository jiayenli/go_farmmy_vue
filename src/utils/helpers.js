import axios from 'axios'
const baseURL = 'https://go-farmmy-demo.herokuapp.com/api'
export const apiHelper = axios.create({
  baseURL
})

