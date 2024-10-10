import { IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto{


    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    content: string

}