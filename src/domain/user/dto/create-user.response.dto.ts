import { Exclude, Expose } from 'class-transformer';
import { CreateUserResponse } from 'src/proto/user.pb';

@Exclude()
export class CreateUserResponseDto implements CreateUserResponse {
  @Expose()
  status: number;

  @Expose()
  error: string | null;
}
