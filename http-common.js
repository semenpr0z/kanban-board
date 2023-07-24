import axios from 'axios'

// const apiUrl = import.meta.env.VITE_API_URL;


export default axios.create({
    baseURL: `https://64a2a7a3b45881cc0ae57c6a.mockapi.io/`,
    headers: {
        'Content-Type': 'application/json'
    }
})