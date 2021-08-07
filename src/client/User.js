import {
  clientGet,
} from './services/URLApi';

const URL = "user"

export const getUser = async (query) => {
  return await clientGet(`${URL}`, query);
}