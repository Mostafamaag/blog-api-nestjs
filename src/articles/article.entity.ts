import { Exclude } from "class-transformer"
import { User } from "src/users/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Article{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    // Entity1 have one instance of Entity2
    // Entity2 have many instance of Entity1
    @ManyToOne((_article) => User, (user) => user.articles, {nullable: false})
    @Exclude({toPlainOnly: true})
    user: User

}