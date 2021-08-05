import {
  clientGet,
} from './services/URLApi';

const URL = "dashboard"

export const getAttendStatus = async (buyerProductId) => {
  return await clientGet(`${URL}/getQty/${buyerProductId}`);
}