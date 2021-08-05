import {
  clientGet,
  clientPost,
  clientDelete,
  clientPatch
} from './services/URLApi';

export const getBuyerProducts = async () => {
  return await clientGet('buyerProducts');
}

export const getBuyerProductsClientName = async (bridegroom_call_name, bride_call_name) => {
  return await clientGet(`buyerProducts/${bridegroom_call_name}/${bride_call_name}`);
}

export const getInvitations = async (buyerProductId) => {
  return await clientGet(`invitations/getAllByBuyerProductId/${buyerProductId}`);
}

export const postBuyerProduct = async (payload) => {
  return await clientPost(`buyerProducts`, payload);
}
