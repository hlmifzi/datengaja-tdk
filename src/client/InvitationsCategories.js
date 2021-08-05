import {
  clientGet,
  clientPost
} from './services/URLApi';

const URL = "invitationCategories"

export const getCategoriesByBuyerProductId = async (buyerProductId) => {
  return await clientGet(`${URL}/getAllByBuyerProductId/${buyerProductId}`);
}

export const getCategoriesByBuyerProductIdQty = async (buyerProductId) => {
  return await clientGet(`${URL}/getAllByBuyerProductIdQty/${buyerProductId}`);
}

export const postInvitationCategory = async (payload) => {
  return await clientPost(URL, payload)
}