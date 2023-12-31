import { RazorpayEntity } from 'src/razorpay/entities/razorpay.entity';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    emailAddress: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true, default: 'user' })
    userPosition: string;

    @OneToMany(() => TicketEntity, (ticket) => ticket.user)
    userId: TicketEntity[];

    @OneToMany(() => TicketEntity, (ticket) => ticket.user)
    replied_by: TicketEntity[];

    @OneToMany(() => RazorpayEntity, (razopay) => razopay.user_id)
    user_id: RazorpayEntity[];

    @CreateDateColumn()
    createdAt: Date;
}

