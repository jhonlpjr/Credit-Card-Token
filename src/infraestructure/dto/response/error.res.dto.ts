import httpStatus from "http-status";

export class ErrorResponseDto extends Error {
  statusCode: number = httpStatus.BAD_REQUEST;
  body: string;
  headers?: object;
  constructor(body?: object, statusCode?: number, headers?: object) {
    super();
    this.statusCode = statusCode || httpStatus.BAD_REQUEST;
    this.body = JSON.stringify(body) || "{message: 'Error'}";
    this.headers = headers;
  }
}
