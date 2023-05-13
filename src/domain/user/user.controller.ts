import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'src/proto/user.pb';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { GetUserRequestDto } from './dto/get-user.request.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { plainToInstance } from 'class-transformer';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  async createUser(dto: CreateUserRequestDto): Promise<void> {
    await this.userService.create(dto);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetUser')
  async getUser(dto: GetUserRequestDto): Promise<GetUserResponseDto> {
    const userEntity = await this.userService.getUser(dto);

    return plainToInstance(GetUserResponseDto, userEntity);
  }
}
