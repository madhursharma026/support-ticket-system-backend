import { Razorpay } from "./schema/razopay.schema";
import { RazorpayService } from "./razorpay.service";
import { CreateRazorpayArgs } from "./args/create.razorpay.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Razorpay)
export class RazorpayResolver {
    constructor(private readonly razorrpayService: RazorpayService) { }

    @Mutation(() => [Razorpay], { name: 'findPaymentHistory' })
    findPaymentHistory(@Args('id', { type: () => String }) id: string) {
        return this.razorrpayService.findPaymentHistory(id);
    }

    @Mutation(() => [Razorpay], { name: 'findTotalAmount' })
    findTotalAmount(@Args('id', { type: () => String }) id: string) {
        return this.razorrpayService.findTotalAmount(id);
    }

    @Mutation(returns => Razorpay, { name: 'createRazorpay' })
    createRazorpay(@Args('createRazorpayArgs') createRazorpayArgs: CreateRazorpayArgs) {
        return this.razorrpayService.createRazorpay(createRazorpayArgs);
    }
}

