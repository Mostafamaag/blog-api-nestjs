import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService{
    private articleRepository: Repository<Article>
    constructor (private readonly dataSource: DataSource){
        this.articleRepository = this.dataSource.getRepository(Article);
    }


    async createArticle(user: User, createArticleDto: CreateArticleDto): Promise<Article>{
        console.log(createArticleDto);
        const { title, content } = createArticleDto;
        const article  = this.articleRepository.create({title, content, user});
        await this.articleRepository.save(article);
        return article;
    }

    async updateArticle(user:User, id: string, updateArticleDto: UpdateArticleDto): Promise<Article>{
        const article = await this.getArticleById(user, id);
        console.log(article)
        const {title, content} = updateArticleDto
        
        if(title) article.title = title;
        if(content) article.content = content;
        await this.articleRepository.save(article);

        //await this.articleRepository.save({ id, ...updateArticleDto });
         
        return article;
    }


    async getAllArticles(user: User): Promise<Article[]>{
        const articles = await this.articleRepository.find({where:{user}});
        return articles;
    }

    async getArticleById(user:User, id: string): Promise<Article>{
        const article = await this.articleRepository.findOne({where:{id, user} });
        if(!article){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return article
    }


    async delete(user: User, id: string): Promise<void>{
        const article = await this.getArticleById(user, id);
        console.log(article);
        await this.articleRepository.remove(article);

    }
    
}
