import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @HttpCode(200)
    @Post('/login')
    async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{token: string}>{
        return this.authService.login(authCredentialsDto);
    }
    
    @Post('/signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<void>{
        return this.authService.signUp(createUserDto);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('/logout')
    // async logout(){
    //     return ''
    // }
}
