import axios from "axios"


const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

export const AppApiRequest = {
    getScores: (sbd: string) => {
        return axios.get(`${baseUrl}/scores/${sbd}`).then(res => res.data)
    },

    getStatistics: (subject: string) => {
        return axios.get(`${baseUrl}/reports/${subject}`).then(res => res.data)
    },

    getTop10ByGroup: (group: string) => {
        return axios.get(`${baseUrl}/reports/${group}`).then(res => res.data)
    }
}