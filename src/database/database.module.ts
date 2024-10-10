import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({  //provide global providers
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          port: configService.get('DB_PORT'),
          host:configService.get('DB_HOST'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,  // allow self-signed SSL certificates
          },
        }
      },

    }),
  ],
  providers: [DatabaseService],
  //exports: [DatabaseModule]
})
export class DatabaseModule { }
