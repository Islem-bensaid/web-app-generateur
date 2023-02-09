import {EnvironmentDef} from './environment.def';
import { megaBytes } from '@shared/tools';

function getHost(hostServer: 'local-server' | 'test-server' | 'prod-server') {
  switch (hostServer) {
    case 'local-server':
      return 'http://127.0.0.1:4062';
    case 'test-server':
      return 'http://162.19.76.41:4062';
    case 'prod-server':
      return 'http://162.19.76.41:4062';
  }
}

export const environment: EnvironmentDef = {
  server: {
    hostSource: getHost('test-server'),
  },
  production: true,
  ToastDuration: 3000,
  Session: {
    expired: 1800, // sec
    timeout: 60, // sec
  },
  upload: {
    accept: 'image/*,.pdf,.doc,.docx',
    maxSize: megaBytes(10),
  },
  forgeProperties : {
    hostSource: 'https://developer.api.autodesk.com',
    cliendId: 'qJgm6Uro6BNnmq6ts0XAOSh6E1OtMRjM',
    client_secret: 'wO4AtPXLrmPR74bG'
  },
};
