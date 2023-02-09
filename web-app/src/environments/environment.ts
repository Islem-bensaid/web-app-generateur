// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
import {EnvironmentDef} from './environment.def';
import { megaBytes } from '@shared/tools';

function getHost(hostServer: 'local-server' | 'test-server' | 'prod-server') {
  switch (hostServer) {
    case 'local-server':
      return 'http://127.0.0.1:8062';
    case 'test-server':
      return 'http://162.19.76.41:4062';
    case 'prod-server':
      return 'http://162.19.76.41:4062';
  }
}


export const environment: EnvironmentDef = {
  server: {
    hostSource: getHost('local-server'),
  },
  production: false,
  ToastDuration: 3000, // en milliseconds
  Session: {
    expired: 1800, // sec 1800
    timeout: 60, // sec
  },
  upload: {
    accept: 'image/*,.pdf,.doc,.docx',
    maxSize: megaBytes(5),
  },
  forgeProperties : {
    hostSource: 'https://developer.api.autodesk.com',
    // cliendId: 'UHe6wa2SYG9nsIRhbCTImXdMQvHZUFYA',
    // client_secret: 'pRXdGcMahFM5Gdiz'
    cliendId: 'cUrB77VHsSmeiDoMIF6gkiyB4lnexZll',
    client_secret: 'MgTV6yfMpjx15bG9'
  },
};
