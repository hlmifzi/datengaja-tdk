import axios from 'axios';

export const developmentHost = 'http://localhost:3010/';
export const productionHost = 'http://localhost:3010/';

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        'WithCredentials': true,
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",

        post: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            'WithCredentials': true,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        common: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            'WithCredentials': true,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
})

export const clientGet = async (endPoint, params = {}) => {
    try {
        let res = await ROOT_API.get(endPoint, params)
        return { data: res.data.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientPost = async (endPoint, body) => {
    try {
        let res = await ROOT_API.post(endPoint, body)
        return { data: res.data.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientDelete = async (endPoint) => {
    try {
        let res = await ROOT_API.delete(endPoint)
        return { data: res.data.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}


export const clientPatch = async (endPoint, body) => {
    try {
        let res = await ROOT_API.put(endPoint, body)
        return { data: res.data.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}