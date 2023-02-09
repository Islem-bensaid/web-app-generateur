export interface EnvironmentDef {
  production: boolean;
  server: {
    hostSource: string;
  };
  upload: {
    accept: string;
    maxSize: number;
  };
  ToastDuration: number,
  Session: {
    expired: number;
    timeout: number;
  };
  forgeProperties : {
    hostSource: string,
    cliendId: string,
    client_secret: string
  };
}
