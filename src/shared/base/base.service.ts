import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export abstract class BaseService {
  constructor() {}

  public _throwNotFoundException(message) {
    throw new NotFoundException(message);
  }

  public _throwAlreadyExistException(message) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  public _throwUnprocessableEntityException(message) {
    throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
