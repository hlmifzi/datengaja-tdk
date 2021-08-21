import {
  clientGet,
  clientPost,
  clientDelete,
  clientPatch
} from './services/URLApi';

const URL = "invitations"

export const getAllByBuyerProductId = async (buyerProductId) => {
  return await clientGet(`${URL}/getAllByBuyerProductId/${buyerProductId}`);
}

export const getInvitationById = async (id) => {
  return await clientGet(`${URL}/${id}`);
}

export const postInvitation = async (buyerProductId, payload) => {
  return await clientPost(`${URL}/${buyerProductId}`, payload);
}

export const putInvitation = async (id, payload) => {
  return await clientPatch(`${URL}/${id}`, payload);
}

export const deleteInvitation = async (id) => {
  return await clientDelete(`${URL}/${id}`);
}
