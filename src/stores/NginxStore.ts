import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios'

export interface NginxRule {
    id: number
    serviceName: string
    location: string
    port: number
    websocketsEnabled: boolean
}

export const useNginxStore = defineStore('nginx', () => {
    const rules = ref<NginxRule[]>([])

    rules.value = [
        {
            serviceName: "Filesyncer",
            location: "/filesyncer",
            port: 8469,
            websocketsEnabled: true,
            id: 0
        }
    ]


    for(let i = 0 ; i < 100 ; i++) {
        rules.value.push({
        serviceName: `Filesyncer_${i}`,
        location: "/filesyncer",
        port: Math.floor(Math.random()*3000 + 5000),
        websocketsEnabled: Math.random() > 0.5,
        id: i
    })
    }

    const fetchAllRules = async () => {
        try {
            const {data} = await axios.get<NginxRule[]>("https://api.mcsynergy.nl/admin-panel/nginx/all")
            rules.value = data
        } catch (error) {
            alert(`Something went wrong while fetching rules.\n${error}`)
        }
    }

    const fetchRuleById = async (id: number) => {
        try {
            const {data} = await axios.get<NginxRule>(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`)
            const index = rules.value.findIndex((rule) => rule.id === data.id)
            if(index !== -1) rules.value[index] = data
            else rules.value.push(data)
            return data
        } catch (error) {
            alert(`Something went wrong while fetching rule (id: ${id}).\n${error}`)
        }
    }

    const createRule = async (rule: NginxRule) => {
        try {
            const {data} = await axios.post<NginxRule>(`https://api.mcsynergy.nl/admin-panel/nginx`, rule)
            rules.value.push(rule)
            return data
        } catch (error) {
            alert(`Something went wrong while creating rule.\n${error}`)
        }
    }

    const updateRule = async (id: number, rule: NginxRule) => {
        try {
            const {data} = await axios.patch<NginxRule>(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`, rule)
            const index = rules.value.findIndex((rule) => rule.id === data.id)
            if(index !== -1) rules.value[index] = data
            return data
        } catch (error) {
            alert(`Something went wrong while updating rule (id: ${id}).\n${error}`)
        }
    }

    const deleteRule =async (id: number) => {
        try {
            const {data} = await axios.delete<boolean>(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`)
            if(data) {
                const index = rules.value.findIndex((rule) => rule.id === id)
                if(index !== -1) rules.value.splice(index, 1)
            }
            return data
        } catch (error) {
            alert(`Something went wrong while deleting rule (id: ${id}).\n${error}`)
        }
    }

    return {rules, fetchAllRules, fetchRuleById, createRule, updateRule, deleteRule}
})