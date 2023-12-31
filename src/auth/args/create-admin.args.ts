import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateAdminArgs {
    @Field({ nullable: false })
    emailAddress: string;

    @Field({ nullable: false })
    password: string;

    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: false })
    userPosition: string;
}

