export const API_BASE_URL = 'https://serv.amazingmarvin.com/api';
export const PORT = 8080
export const UNASSIGNED_PARENT_ID = 'unassigned'
export enum MarvinEndpoint {
  ADD_TASK = `${API_BASE_URL}/addTask`,
  MARK_DONE = `${API_BASE_URL}/markDone`,
}
