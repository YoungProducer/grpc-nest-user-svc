import { Controller, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'src/proto/user.pb';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { GetUserRequestDto } from './dto/get-user.request.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { BaseResponseDto } from 'grpc-nest-common';
import { userModuleErrorMessages } from './constants/error-messages';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  async createUser(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const res = await this.userService.create(dto);

    return plainToInstance(CreateUserResponseDto, res);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetUser')
  async getUser(dto: GetUserRequestDto): Promise<GetUserResponseDto> {
    const userEntity = await this.userService.getUser(dto);

    const baseRes: BaseResponseDto = {
      status: userEntity ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      error: userEntity ? null : userModuleErrorMessages.userNotFound(),
    };

    return plainToInstance(GetUserResponseDto, {
      ...userEntity,
      ...baseRes,
    });
  }
}
