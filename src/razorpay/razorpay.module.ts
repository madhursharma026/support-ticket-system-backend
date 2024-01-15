import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RazorpayService } from "./razorpay.service";
import { RazorpayResolver } from "./razorpay.resolver";
import { RazorpayEntity } from "./entities/razorpay.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RazorpayEntity])],
    controllers: [],
    providers: [RazorpayService, RazorpayResolver],
})

export class RazorpayModule { }
