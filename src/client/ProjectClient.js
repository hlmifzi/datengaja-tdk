import {
  clientGet,
  clientPost,
  clientDelete,
  clientPatch
} from './services/URLApi';

export const getProject = async () => {
  return await clientGet('project', {});
}

export const postProject = async (payload) => {
  return await clientPost('project/', payload)
}

export const deleteProject = async (params) => {
  return await clientDelete('project/', params)
}

export const updateProject = async (payload) => {
  return await clientPatch('project/', payload)
}
