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
            await axios.post(`https://api.mcsynergy.nl/admin-panel/nginx`, rule)
            await fetchAllRules()
        } catch (error) {
            alert(`Something went wrong while creating rule.\n${error}`)
        }
    }

    const updateRule = async (id: number, rule: NginxRule) => {
        try {
            await axios.patch(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`, rule)
            await fetchRuleById(id)
        } catch (error) {
            alert(`Something went wrong while updating rule (id: ${id}).\n${error}`)
        }
    }

    const deleteRule =async (id: number) => {
        try {
            await axios.delete(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`)
            rules.value = rules.value.filter(rule => rule.id !== id)
        } catch (error) {
            alert(`Something went wrong while deleting rule (id: ${id}).\n${error}`)
        }
    }

    return {rules, fetchAllRules, fetchRuleById, createRule, updateRule, deleteRule}
})
