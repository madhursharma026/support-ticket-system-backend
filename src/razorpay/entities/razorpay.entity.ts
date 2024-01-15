import { AuthEntity } from 'src/auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'razorpay' })
export class RazorpayEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: string;

    @Column()
    amount: string;

    @ManyToOne(() => AuthEntity, (user) => user.user_id)
    @JoinColumn({ name: 'user_id' })
    user: AuthEntity[];

    @Column()
    user_id: string;

    @CreateDateColumn()
    createdAt: Date;
}

