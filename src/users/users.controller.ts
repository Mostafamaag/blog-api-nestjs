import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/articles/decorators/roles.guard';
import { Roles } from 'src/articles/decorators/roles.decorator';
import { Role } from './roles.eum';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto);
    }


    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('update/:id')
    async updateUser(@Param('id') id: string,@Body() updateUserDto: UpdateUserDto): Promise<void>{
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<void>{
        return this.usersService.deleteUser(id);
    }
    

}
