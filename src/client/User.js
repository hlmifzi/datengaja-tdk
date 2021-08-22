import {
  clientGet,
  clientPatch
} from './services/URLApi';

const URL = "user"

export const getUser = async (query) => {
  return await clientGet(`${URL}`, query);
}

export const updateUser = async (payload) => {
  return await clientPatch(`${URL}`, payload);
}

export const getUserByEmail = async (params) => {
  return await clientGet(`${URL}/getUserByEmail/${params}`);
}