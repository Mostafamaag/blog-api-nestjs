import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { DatabaseModule } from 'src/database/database.module';
//import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({secret: 'secret', signOptions:{expiresIn : 3600}})
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
