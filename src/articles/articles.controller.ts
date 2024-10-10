import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Role } from 'src/users/roles.eum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './decorators/roles.guard';


@Controller('articles')
export class ArticlesController {

    constructor(private readonly articleService: ArticlesService){}

    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    async getAllArticles(@GetUser() user: User): Promise<Article[]>{
        return this.articleService.getAllArticles(user);
    }

    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/:id')
    async getArticleById(@GetUser() user: User, @Param('id') id: string): Promise<Article>{
        return this.articleService.getArticleById(user, id);
    }

    @Roles(Role.USER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    async createArticle(@GetUser() user: User,@Body() createArticleDto: CreateArticleDto): Promise<Article>{
        return this.articleService.createArticle(user, createArticleDto);
    }

    @Roles(Role.USER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch('/:id')
    async updateArticle(@GetUser() user: User, @Param('id') id: string,@Body() updateArticleDto: UpdateArticleDto): Promise<Article>{
        return this.articleService.updateArticle(user, id, updateArticleDto);
    }

    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/:id')
    async delete(@GetUser() user: User, @Param('id') id: string): Promise<void>{
        return this.articleService.delete(user,id);
    }

}
