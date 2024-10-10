import { Article } from "src/articles/article.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './roles.eum';

// enum Role {
//     ADMIN = 'admin',
//     USE = 'user'
// }

@Entity()
export class User {
    
    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string

    //@Column({ unique: true })
    @Column()
    email: string

    @Column()
    password: string

    @Column({type:'enum', enum:Role, default: Role.USER})
    role: Role


    @OneToMany((_user) => Article, (article) => article.user)
    articles: Article[];
}

