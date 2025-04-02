import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CurrencyTypes } from '../../stripe/enums/intent-currency.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  paymentId: string; 

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: CurrencyTypes })
  currency: CurrencyTypes;

  @Column({ default: 'pending' })
  status: string; 

  @Column({ nullable: true })
  stripeId?: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column()
  productName: string;

  @Column({ type: 'text' })
  productDescription: string;

  @Column()
  productImage: string;
}