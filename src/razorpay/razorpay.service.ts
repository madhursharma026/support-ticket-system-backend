import { Repository } from 'typeorm';
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RazorpayEntity } from './entities/razorpay.entity';
import { CreateRazorpayArgs } from './args/create.razorpay.args';

@Injectable()
export class RazorpayService {
  constructor(@InjectRepository(RazorpayEntity) public readonly razorpayRepo: Repository<RazorpayEntity>) { }

  async findPaymentHistory(id: string) {
    if (!id) throw new ConflictException('No ID Found');
    let paymentDetails = await this.razorpayRepo.find({ where: { user_id: id }, relations: ['user'] });
    if (paymentDetails === null) {
      throw new ConflictException(`No ticket exists with ${id}`);
    } else {
      return paymentDetails
    }
  }

  async findTotalAmount(id: string) {
    if (!id) throw new ConflictException('No ID Found');
    let paymentDetails = await this.razorpayRepo.find({ where: { user_id: id }, relations: ['user'], select: ['amount'] });
    if (paymentDetails === null) {
      throw new ConflictException(`No payment exists with user id ${id}`);
    } else {
      return paymentDetails
    }
  }

  async findAllUserAmount() {
    let paymentDetails = await this.razorpayRepo.find({ relations: ['user'] });
    if (paymentDetails === null) {
      throw new ConflictException(`No Transaction exists`);
    } else {
      return paymentDetails
    }
  }

  async createRazorpay(createRazorpayArgs: CreateRazorpayArgs): Promise<RazorpayEntity> {
    let razorpay: RazorpayEntity = new RazorpayEntity();
    razorpay.order_id = createRazorpayArgs.order_id
    razorpay.amount = createRazorpayArgs.amount
    razorpay.user_id = createRazorpayArgs.user_id
    let razorpaySave = await this.razorpayRepo.save(razorpay);
    return await this.razorpayRepo.findOne({ where: { id: razorpaySave.id }, relations: ['user'] })
  }
}
