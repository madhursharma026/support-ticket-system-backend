import { AuthEntity } from 'src/auth/entities/auth.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { TicketReplyEntity } from 'src/ticket-reply/entities/ticket-reply.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticket' })
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // category: string;

    @Column()
    title: string;

    @Column()
    priority: string;

    @Column()
    message: string;

    @Column({ nullable: true, default: 'open' })
    status: string;

    @Column({ nullable: true })
    ticket_id: string;

    @ManyToOne(() => AuthEntity, (user) => user.userId)
    @JoinColumn({ name: 'user_id' })
    user: AuthEntity;

    @OneToMany(() => TicketReplyEntity, (ticketReply) => ticketReply.ticket)
    ticketReplyId: TicketReplyEntity[];

    @Column()
    user_id: number;

    @ManyToOne(() => CategoryEntity, (category) => category.category_id)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity[];

    @Column()
    category_id: string;

    @CreateDateColumn()
    duration: Date;

    @CreateDateColumn()
    createdAt: Date;
}
