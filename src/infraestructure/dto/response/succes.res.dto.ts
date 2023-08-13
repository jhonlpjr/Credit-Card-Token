import httpStatus from "http-status";
import { IResponse } from "./response.interface";

export class SuccessResponseDto implements IResponse {
  statusCode: number = httpStatus.OK;
  body: string;
  headers?: object;
  constructor(body?: object, statusCode?: number, headers?: object) {
    this.statusCode = statusCode || httpStatus.OK;
    this.body = JSON.stringify(body) || "{message: 'succes'}";
    this.headers = headers;
  }
}
