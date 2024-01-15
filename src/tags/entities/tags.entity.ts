import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class TagsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag_name: string;

    @Column()
    tag_description: string;

    @CreateDateColumn()
    createdAt: Date;
}
