import axios from "axios"
import { getAuth } from "firebase/auth"

export const initAxios = () => {
    axios.interceptors.request.use(async (config) => {
        const token = await getAuth().currentUser?.getIdToken(true)
        config.headers.Authorization = token
        return config
    })

    axios.interceptors.response.use(response => response, error => {
        //@ts-ignore
        if(error.response?.data.message === "failed to get claims") window.location = "/login"
        else return error
    })
}