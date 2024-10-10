import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{

    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService

    ) {}

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{token: string}> {
        const { email, password } = authCredentialsDto;
        const user = await this.dataSource.getRepository(User).findOne({ where : { email } });
        if(!user){
            throw new NotFoundException("User Not found!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const payload = {userId: user.id};
            const accessToken = await this.jwtService.signAsync(payload);
            return { token: accessToken };
        }
        throw new UnauthorizedException("Please check your login credentials");

    }

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        const { name, email, password } = createUserDto;
        console.log(createUserDto);
        const existingUser = await this.dataSource.getRepository(User).findOne({ where: { email } });

        // we already handled this case in database layer
        // so we can remove it to reduce this database request
        if(existingUser){
            throw new ConflictException("This user already exists, Try another one");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User(
            name,
            email,
            hashedPassword
        );

        try{
            await this.dataSource.getRepository(User).save(user);
        }
        catch(err){
            console.log(err);
            throw new InternalServerErrorException("Failed to create user, Please try again");
        }
    }


}
