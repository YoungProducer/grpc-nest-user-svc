import { Exclude, Expose } from 'class-transformer';
import { GetUserResponse } from 'src/proto/user.pb';

@Exclude()
export class GetUserResponseDto implements GetUserResponse {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  status: number;

  @Expose()
  error: string | null;
}
