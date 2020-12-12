import axios from 'axios';

export const developmentHost = 'https://stagging-api-kta.pks.id/api';
export const productionHost = 'https://stagging-api-kta.pks.id/api';

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

    }
})

export const clientGet = async (endPoint, params) => {
    try {
        let res = await ROOT_API.get(endPoint, params)
        return { data: res.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientPost = async (endPoint, body) => {
    try {
        let res = await ROOT_API.post(endPoint, body)
        return { data: res.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientDelete = async (endPoint, params) => {
    try {
        let res = await ROOT_API.delete(endPoint, params)
        return { data: res.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}


export const clientPatch = async (endPoint, body) => {
    try {
        let res = await ROOT_API.patch(endPoint, body)
        return { data: res.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}