import {
  clientGet,
  clientPost,
  clientDelete,
  clientPatch
} from './services/URLApi';

export const getBuyerProducts = async (query) => {
  return await clientGet('buyerProducts', query);
}

export const getBuyerProductsClientName = async (bridegroom_call_name, bride_call_name) => {
  return await clientGet(`buyerProducts/${bridegroom_call_name}/${bride_call_name}`);
}

export const getInvitations = async (buyerProductId, query) => {
  return await clientGet(`invitations/getAllByBuyerProductId/${buyerProductId}`, query);
}

export const postBuyerProduct = async (payload) => {
  return await clientPost(`buyerProducts`, payload);
}

export const putBuyerProduct = async (buyerProductId, payload) => {
  return await clientPatch(`buyerProducts/${buyerProductId}`, payload);
}

export const getByID = async (buyerProductId) => {
  return await clientGet(`buyerProducts/${buyerProductId}`);
}
