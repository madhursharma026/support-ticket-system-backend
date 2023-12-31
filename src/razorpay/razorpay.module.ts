import { Module } from "@nestjs/common";
import { RazorpayService } from "./razorpay.service";
import { RazorpayResolver } from "./razorpay.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RazorpayEntity } from "./entities/razorpay.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RazorpayEntity])],
    controllers: [],
    providers: [RazorpayService, RazorpayResolver],
})

export class RazorpayModule { }
