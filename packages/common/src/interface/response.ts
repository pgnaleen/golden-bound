export interface IResponse {
  status: {
    statusCode: number;
    message?: string;
  };
  data?: object | object[] | string;
}