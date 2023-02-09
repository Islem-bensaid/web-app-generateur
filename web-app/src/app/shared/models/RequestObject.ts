export interface RequestObject {
  uri: string;
  params: {
    body: object;
    query: object;
    path: object;
    formData: object;
  };
  microservice: string;
  method: 'GET' | 'DELETE' | 'POST' | 'PUT';
  server: string;
  speCase: string;
}
