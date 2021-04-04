import { clientGet, clientPost } from './services/URLApi';

export const getAnalytic = async () => {
    return await clientGet('analytic')
}

export const postProject = async (payload) => {
    return await clientPost('members/registration', payload)
}
