export const BIM360_URI = {
  AUTHENTIFICATION: 'authentication/v1/authenticate',
  GET_HUB_ID: 'project/v1/hubs',
  GET_PROJECTS_LIST: 'project/v1/hubs/:hub_id/projects',
  GET_FOLDERS_LIST: 'project/v1/hubs/:hub_id/projects/:project_id/topFolders',
  GET_DOCUMENTS_LIST: 'data/v1/projects/:project_id/folders/:folder_id/contents',
  GET_DOCUMENTS_URN: 'data/v1/projects/:project_id/items/:item_id/versions',
}
