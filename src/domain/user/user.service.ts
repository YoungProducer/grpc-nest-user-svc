import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { GetUserRequestDto } from './dto/get-user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({ email, username }: CreateUserRequestDto): Promise<void> {
    const userToCreate = this.userRepository.create({
      email,
      username,
    });

    await this.userRepository.save(userToCreate);
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
