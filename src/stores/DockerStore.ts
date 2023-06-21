import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios'

export interface DockerService {
    serviceName: string
    status: string
}

export interface DockerServiceDto {
    serviceName: string
    composeData: string
}

export const useDockerStore = defineStore('docker', () => {
    const services = ref<DockerService[]>([])

    const fetchAllServices = async () => {
        try {
            const {data} = await axios.get<DockerService[]>("https://api.mcsynergy.nl/admin-panel/docker/all")
            services.value = data
        } catch (error) {
            alert(`Something went wrong while fetching services.\n${error}`)
        }
    }

    const fetchServiceByName = async (name: string) => {
        try {
            const {data} = await axios.get<DockerService>(`https://api.mcsynergy.nl/admin-panel/docker/${name}`)
            const index = services.value.findIndex((service) => service.serviceName === data.serviceName)
            if(index !== -1) services.value[index] = data
            else services.value.push(data)
            return data
        } catch (error) {
            alert(`Something went wrong while fetching service (name: ${name}).\n${error}`)
        }
    }

    const createService = async (service: DockerServiceDto) => {
        try {
            await axios.post(`https://api.mcsynergy.nl/admin-panel/docker`, service)
            await fetchAllServices()
        } catch (error) {
            alert(`Something went wrong while creating service.\n${error}`)
        }
    }

    const updateService = async (name: string, service: string) => {
        try {
            await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}`, {composeData: service})
            await fetchServiceByName(name)
        } catch (error) {
            alert(`Something went wrong while updating service (name: ${name}).\n${error}`)
        }
    }

    const deleteService = async (name: string) => {
        try {
            await axios.delete(`https://api.mcsynergy.nl/admin-panel/docker/${name}`)
            services.value = services.value.filter(service => service.serviceName !== name)
        } catch (error) {
            alert(`Something went wrong while deleting service (name: ${name}).\n${error}`)
        }
    }

    const startService =async (name: string) => {
        try {
            await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/start`)
            const service = services.value.find(service => service.serviceName === name)
            if(service) service.status = "running(1)"
        } catch (error) {
            alert(`Something went wrong while starting service (name: ${name}).\n${error}`)
        }
    }

    const stopService =async (name: string) => {
        try {
            await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/stop`)
            const service = services.value.find(service => service.serviceName === name)
            if(service) service.status = "exited(1)"
        } catch (error) {
            alert(`Something went wrong while starting service (name: ${name}).\n${error}`)
        }
    }

    const restartService =async (name: string) => {
        try {
            await axios.patch(`https://api.mcsynergy.nl/admin-panel/docker/${name}/restart`)
            const service = services.value.find(service => service.serviceName === name)
            if(service) service.status = "running(1)"
        } catch (error) {
            alert(`Something went wrong while starting service (name: ${name}).\n${error}`)
        }
    }

    return {services, fetchAllServices, fetchServiceByName, createService, updateService, deleteService, startService, stopService, restartService}
})
