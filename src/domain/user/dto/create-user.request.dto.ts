import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserRequest } from 'src/proto/user.pb';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
