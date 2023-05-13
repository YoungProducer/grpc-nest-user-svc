import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { GetUserRequestDto } from './dto/get-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({
    email,
    username,
  }: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const userToCreate = this.userRepository.create({
      email,
      username,
    });

    await this.userRepository.save(userToCreate);

    return {
      status: 201,
      error: null,
    };
  }

  async getUser(dto: GetUserRequestDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        ...dto,
      },
    });

    return user;
  }
}
