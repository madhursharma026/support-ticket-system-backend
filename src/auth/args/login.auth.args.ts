import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class LoginUserArgs {
    @Field({ nullable: false })
    emailAddress: string;

    @Field({ nullable: false })
    password: string;
}

