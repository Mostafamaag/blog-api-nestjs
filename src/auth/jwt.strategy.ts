import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { DataSource } from "typeorm";
import {JwtPayload } from "jsonwebtoken"
import { User } from "src/users/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor
    (
        private readonly dataSource: DataSource,
        private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('JWT_SECRET')
        });
    }

    // overwrite this method
    // passport adds the return value to every request
    async validate(payload: JwtPayload): Promise<User>{
       const { userId } = payload;
       const user = await this.dataSource.getRepository(User).findOne({where:{ id: userId}});
       if(!user){
            throw new UnauthorizedException();
       }
       return user;
    }
    
}