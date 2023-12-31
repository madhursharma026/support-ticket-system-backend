import { AuthEntity } from 'src/auth/entities/auth.entity';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticket-reply' })
export class TicketReplyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => TicketEntity, (ticket) => ticket.ticketReplyId)
    @JoinColumn({ name: 'ticket_id' })
    ticket: TicketEntity;

    @Column()
    ticket_id: number;

    @ManyToOne(() => AuthEntity, (repliedUser) => repliedUser.replied_by)
    @JoinColumn({ name: 'replied_by_id' })
    replied_by: AuthEntity;
    
    @Column()
    replied_by_id: number;

    @CreateDateColumn()
    createdAt: Date;
}
