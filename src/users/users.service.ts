import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private userRepository: Repository<User>;
    constructor(private dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    private async getUserById(id: string): Promise<User>{
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            throw new NotFoundException('User Not found!');
        }
        return user;
    }
   
    async createUser(createUserDto: CreateUserDto): Promise<void>{
        const { name, email, password } = createUserDto;
        const existingUser = this.userRepository.findOne({where: {email}});
        if(existingUser){
            throw new ConflictException("This user already exists, Try another one");
        }

        const salt = bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ name, email, password :hashedPassword });
        try{
            await this.userRepository.save(user);
        }
        catch(err){
            throw new InternalServerErrorException("Failed to create user, Please try again");
        }

    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void>{
        const { name, email, password } = updateUserDto;
        const user = await this.getUserById(id);
        
        let existingUser;
        if(email){
            existingUser = this.userRepository.findOne({where: {email}});
            if(existingUser){
                throw new ConflictException("This user already exists, Try another one");
            }
        }
        user.email = email;
        if(name) user.name = name;
        if(password){
            const salt = bcrypt.genSalt();
            const hashedPassword = bcrypt.hash(password, salt);
            user.password = hashedPassword;
            
        }
        try{
            await this.userRepository.save(user);
        }
        catch(err){
            throw new InternalServerErrorException("Failed to create user, Please try again");
        }
    }

    async deleteUser(id: string): Promise<void>{
        const user = await this.getUserById(id);
        await this.userRepository.remove(user);
    }

}
