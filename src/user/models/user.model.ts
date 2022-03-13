import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ModelOptions, Prop } from '@typegoose/typegoose';
import { IsEmail, IsUrl } from 'class-validator';

import { toJSON } from '../../utils';
import { ApiProperty } from '@nestjs/swagger';

export const UserCollection = 'users';

export interface User extends Base {}

@ModelOptions({
  options: { customName: 'User' },
  schemaOptions: {
    collection: UserCollection,
    toJSON,
  },
})
export class User extends TimeStamps {
  /** Имя пользователя */
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иванов Иван Иванович',
  })
  @Prop({ type: String, required: true })
  name: string;

  /** Фотография пользователя */
  @ApiProperty({
    description: 'Фотография пользователя',
    example:
      'data:image/svg+xml;base64,PHN2ZyBmaWxsPSdub25lJyB3aWR0aD0nNDhweCcgaGVpZ2h0PSc0OHB4JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9JyM3NzcnIGZpbGwtb3BhY2l0eT0nLjQnIGQ9J00wIDBoNDh2NDhIMHonLz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGNsaXAtcnVsZT0nZXZlbm9kZCcgZD0nTTIzLjgxOSAxMS42NDNjLTEuODQ1IDAtMy40My41ODctNC41MTEgMS45MjctMS4wMzYgMS4yODQtMS40NTIgMy4wNy0xLjQ1MiA1LjE1NiAwIDQuMzg3IDIuOSA3LjM4NCA1Ljk2MyA3LjM4NCAzLjA2MiAwIDUuOTYzLTIuOTk3IDUuOTYzLTcuMzg0IDAtMi4wODUtLjQxNi0zLjg3MS0xLjQ1Mi01LjE1NS0xLjA4LTEuMzQtMi42NjYtMS45MjgtNC41MTEtMS45MjhaTTE0LjM0IDM0LjA2OGMuNDI1LjUyMiAyLjM5IDIuMjc1IDkuNjYgMi4yNzVzOS4yMzYtMS43NTMgOS42Ni0yLjI3NWEuNDM0LjQzNCAwIDAgMCAuMDkyLS4zMmMtLjA5MS0uOTk0LS45ODQtNS44NzQtOS43NTItNS44NzQtOC43NjcgMC05LjY2IDQuODgtOS43NSA1Ljg3NC0uMDExLjExNy4wMTYuMjI5LjA5LjMyWicgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScuNicvPjwvc3ZnPg==',
  })
  @Prop({
    type: String,
    default:
      'data:image/svg+xml;base64,PHN2ZyBmaWxsPSdub25lJyB3aWR0aD0nNDhweCcgaGVpZ2h0PSc0OHB4JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9JyM3NzcnIGZpbGwtb3BhY2l0eT0nLjQnIGQ9J00wIDBoNDh2NDhIMHonLz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGNsaXAtcnVsZT0nZXZlbm9kZCcgZD0nTTIzLjgxOSAxMS42NDNjLTEuODQ1IDAtMy40My41ODctNC41MTEgMS45MjctMS4wMzYgMS4yODQtMS40NTIgMy4wNy0xLjQ1MiA1LjE1NiAwIDQuMzg3IDIuOSA3LjM4NCA1Ljk2MyA3LjM4NCAzLjA2MiAwIDUuOTYzLTIuOTk3IDUuOTYzLTcuMzg0IDAtMi4wODUtLjQxNi0zLjg3MS0xLjQ1Mi01LjE1NS0xLjA4LTEuMzQtMi42NjYtMS45MjgtNC41MTEtMS45MjhaTTE0LjM0IDM0LjA2OGMuNDI1LjUyMiAyLjM5IDIuMjc1IDkuNjYgMi4yNzVzOS4yMzYtMS43NTMgOS42Ni0yLjI3NWEuNDM0LjQzNCAwIDAgMCAuMDkyLS4zMmMtLjA5MS0uOTk0LS45ODQtNS44NzQtOS43NTItNS44NzQtOC43NjcgMC05LjY2IDQuODgtOS43NSA1Ljg3NC0uMDExLjExNy4wMTYuMjI5LjA5LjMyWicgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScuNicvPjwvc3ZnPg==',
  })
  @IsUrl()
  photo: string;

  /** Электронная почта */
  @ApiProperty({ description: 'Электронная почта', example: 'root@email.com' })
  @Prop({ type: String, unique: true, required: true })
  @IsEmail()
  email: string;

  /** Захэшированный пароль */
  @Prop({ type: String, required: true, select: false })
  hashedPassword: string;
}
