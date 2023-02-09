import { environment } from '@environments/environment';

export const ConstanteWs = {
  // ################################################
  // # Protocole HTTP
  // ################################################

  _CODE_GET: 'GET',
  _CODE_POST: 'POST',
  _CODE_PUT: 'PUT',
  _CODE_DELETE: 'DELETE',

  // ################################################
  // # SERVERS
  // ################################################

  _CODE_GURU_SERVER: environment.server.hostSource,
  _CODE_FORGE_SERVER: environment.forgeProperties.hostSource,

  // ################################################
  // # Microservice
  // ################################################

  _CODE_GATEWAY: '',
  _CODE_ADMINISTRATION: 'administration',
  _CODE_PRIMAVERA: 'primavera',
  _CODE_NOMENCLATURE: 'nomenclature',
  _CODE_APPLICATION: 'application',
  _CODE_GED: 'ged',
  _CODE_REPORT: 'reporting',




  // ################################################
  // # Ws
  // ################################################

  _CODE_WS_SUCCESS: '200',
  _CODE_WS_SUCCESS_WAIT_PERMISSION: '201',
  _CODE_WS_ACCOUNT_EXPIRED: '202',

  _CODE_WS_BAD_REQUEST: '400',
  _CODE_WS_UNAUTHORIZED: '401',
  _CODE_WS_NO_ACCESS: '403',
  _CODE_WS_URI_NOT_FOUND: '404',
  _CODE_WS_METHOD_NOT_ALLOWED: '405',

  _CODE_WS_LOGIN_EXISTS: '411',
  _CODE_WS_CODE_EXISTS: '413',

  _CODE_WS_ERROR_IN_METHOD: '420',
  _CODE_WS_ERROR_ALIAS_PARAM: '421',
  _CODE_WS_ERROR_NOT_EXISTS_ROW_DATA_BASE: '422',
  _CODE_WS_WRONG_PARAM: '423',
  _CODE_WS_ERROR_PROBLEM_DELETE: '424',
  _CODE_WS_ERROR_UNIQUE_CODE: '425',
  _CODE_WS_ERROR_SAVE_OR_UPDATE: '426',
  _CODE_WS_ERROR_DELETE_ROW: '427',

  _CODE_WS_USER_ERROR_AUTH: '461',
  _CODE_WS_PRB_IN_CONFIRM_PASSWORD: '462',

  _CODE_WS_ERROR_CONVERT: '499',
  _CODE_WS_ERROR: '500',



};
