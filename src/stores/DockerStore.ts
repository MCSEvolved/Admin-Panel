import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosError } from 'axios'
import { getAuth } from "firebase/auth";

export interface DockerServiceRo {
    serviceName: string
    status: string
}

export interface DockerServiceDto {
    serviceName: string
    composeData: string
}

export const useDockerStore = defineStore('docker', () => {
    const services = ref<DockerServiceRo[]>([])

    const fetchAllServices = async () => {
        const res = await axios.get<DockerServiceRo[]>("https://api.mcsynergy.nl/admin-panel/docker/all", {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while fetching services.\n${error.response?.data.message}`)
        })
        if(res) services.value = res.data
    }

    const fetchServiceByName = async (name: string) => {
        const res = await axios.get<DockerServiceRo>(`https://api.mcsynergy.nl/admin-panel/docker/${name}`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while fetching service (name: ${name}).\n${error.response?.data.message}`)
        })
        if(!res) return;
        const index = services.value.findIndex((service) => service.serviceName === res.data.serviceName)
        if (index !== -1) services.value[index] = res.data
        else services.value.push(res.data)
        return res.data
    }

    const fetchLogs = async (name: string) => {
        const res = await axios.get<string>(`https://api.mcsynergy.nl/admin-panel/docker/${name}/logs`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while fetching logs (name: ${name}).\n${error.response?.data.message}`)
        })
        return res?.data
    }

    const createService = async (service: DockerServiceDto) => {
        await axios.post(`https://api.mcsynergy.nl/admin-panel/docker`, service, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while creating service.\n${error.response?.data.message}`)
        })
        await fetchAllServices()
    }

    const updateService = async (name: string, service: string) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}`, { service }, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while updating service.\n${error.response?.data.message}`)
        })
        await fetchServiceByName(name)
    }

    const deleteService = async (name: string) => {
        await axios.delete(`https://api.mcsynergy.nl/admin-panel/docker/${name}`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while deleting service.\n${error.response?.data.message}`)
        })
        await fetchAllServices()
    }

    const startService = async (name: string) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/start`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while starting service.\n${error.response?.data.message}`)
        })
        await fetchServiceByName(name)
    }

    const stopService = async (name: string) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/stop`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while stopping service.\n${error.response?.data.message}`)
        })
        await fetchServiceByName(name)
    }

    const restartService = async (name: string) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/restart`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while restarting service.\n${error.response?.data.message}`)
        })
        await fetchServiceByName(name)
    }

    const resetService = async (name: string) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/reset`, {
            headers: {Authorization: `Bearer ${getAuth().currentUser?.getIdToken(true)}`}
        })
        .catch((error: AxiosError<{message: string}>) => {
            if(error.response?.data.message === "failed to get claims") window.location.replace("https://mcsynergy.nl/login")
            else alert(`Something went wrong while resetting service.\n${error.response?.data.message}`)
        })
        await fetchServiceByName(name)
    }

    return {
        services,
        fetchAllServices,
        fetchServiceByName,
        fetchLogs,
        createService,
        updateService,
        deleteService,
        startService,
        stopService,
        restartService,
        resetService
    }

})
