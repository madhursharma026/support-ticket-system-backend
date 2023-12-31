import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @Column({ nullable: true, default: '1' })
    category_status: boolean;

    @OneToMany(() => TicketEntity, (ticket) => ticket.category)
    category_id: TicketEntity[];

    @CreateDateColumn()
    createdAt: Date;
}

