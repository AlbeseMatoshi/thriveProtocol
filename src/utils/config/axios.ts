import axios from 'axios'

const env = import.meta.env

export const baseAPI = axios.create({
    baseURL: env.VITE_API_BASE_URL,
})
